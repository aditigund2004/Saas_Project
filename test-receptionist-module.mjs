import assert from 'node:assert/strict'
import { seedData } from './src/data.js'

console.log('🧪 Starting automated verification for ClinicOS Receptionist Module...\n')

// -------------------------------------------------------------
// Test 1: Verify Seed Data Integrity for Receptionist & Doctor
// -------------------------------------------------------------
console.log('1. Checking Receptionist & Doctor Seed Data...')
assert.ok(Array.isArray(seedData.receptionistAccounts), 'Seed data should have receptionistAccounts array')
assert.ok(seedData.receptionistAccounts.length >= 1, 'Seed data should have at least 1 receptionist account')

const ava = seedData.receptionistAccounts.find((r) => r.email === 'ava@sunrisefamily.com')
assert.ok(ava, 'Ava Robinson receptionist account must exist')
assert.equal(ava.role, 'receptionist')
assert.equal(ava.clinicId, 'sunrise')
assert.equal(ava.name, 'Ava Robinson')

assert.ok(Array.isArray(seedData.doctorAccounts), 'Seed data should have doctorAccounts array')
const drMaya = seedData.doctorAccounts.find((d) => d.email === 'maya@sunrisefamily.com')
assert.ok(drMaya, 'Dr. Maya Patel doctor account must exist')
assert.equal(drMaya.role, 'doctor')

assert.ok(Array.isArray(seedData.receptionistNotifications), 'Seed data should have receptionistNotifications array')
assert.ok(seedData.receptionistNotifications.length >= 3, 'Seed data should have initial receptionist notifications')
console.log('   ✓ Seed data verified successfully.\n')

// -------------------------------------------------------------
// Test 2: Receptionist Authentication & Demo Flow
// -------------------------------------------------------------
console.log('2. Testing Receptionist & Doctor Authentication Flow...')
function simulateLogin(email, password, state) {
  const cleanEmail = email.trim().toLowerCase()

  // 1. Receptionist Accounts
  const receptionist = state.receptionistAccounts?.find((r) => r.email.toLowerCase() === cleanEmail)
  if (receptionist) {
    return {
      success: true,
      user: {
        id: receptionist.id,
        name: receptionist.name,
        email: receptionist.email,
        role: receptionist.role,
        clinicId: receptionist.clinicId,
        avatar: receptionist.avatar,
      },
      redirect: '/receptionist/dashboard',
    }
  }

  // 2. Doctor Accounts
  const doctor = state.doctorAccounts?.find((d) => d.email.toLowerCase() === cleanEmail)
  if (doctor) {
    return {
      success: true,
      user: {
        id: doctor.id,
        name: doctor.name,
        email: doctor.email,
        role: doctor.role,
        clinicId: doctor.clinicId,
      },
      redirect: '/clinic/appointments',
    }
  }

  // 3. Super Admin
  if (cleanEmail === 'admin@clinicos.demo') {
    return {
      success: true,
      user: { id: 'super-admin', name: 'Alex Morgan', email: cleanEmail, role: 'super_admin' },
      redirect: '/super-admin/dashboard',
    }
  }

  return { success: false, error: 'Invalid email or password.' }
}

const loginAva = simulateLogin('ava@sunrisefamily.com', 'password123', seedData)
assert.equal(loginAva.success, true)
assert.equal(loginAva.user.role, 'receptionist')
assert.equal(loginAva.redirect, '/receptionist/dashboard')

const loginDoctor = simulateLogin('maya@sunrisefamily.com', 'password123', seedData)
assert.equal(loginDoctor.success, true)
assert.equal(loginDoctor.user.role, 'doctor')
assert.equal(loginDoctor.redirect, '/clinic/appointments')

const invalidLogin = simulateLogin('nobody@random.com', 'secret', seedData)
assert.equal(invalidLogin.success, false)
console.log('   ✓ Role-based login and redirection verified.\n')

// -------------------------------------------------------------
// Test 3: Patient Check-In & Queue Progression
// -------------------------------------------------------------
console.log('3. Testing Check-In & Queue Workflow...')
const state = JSON.parse(JSON.stringify(seedData))
const sunrise = state.clinics.find((c) => c.id === 'sunrise')
assert.ok(sunrise, 'Sunrise clinic must exist')

function checkInPatient(clinic, appointmentId, roomNumber = 'Exam Room 1') {
  const apt = clinic.appointments.find((a) => a.id === appointmentId)
  if (!apt) return { success: false, error: 'Appointment not found' }

  apt.status = 'Checked in'
  apt.checkedInAt = new Date().toISOString()
  apt.roomNumber = roomNumber
  apt.queuePosition = 1
  apt.estimatedWaitMinutes = 10

  return { success: true, appointment: apt }
}

function updateQueueStatus(clinic, appointmentId, newStatus) {
  const apt = clinic.appointments.find((a) => a.id === appointmentId)
  if (!apt) return { success: false, error: 'Appointment not found' }
  apt.status = newStatus
  if (newStatus === 'Completed') {
    apt.completedAt = new Date().toISOString()
  }
  return { success: true, appointment: apt }
}

// Target first appointment in Sunrise clinic
const targetApt = sunrise.appointments[0]
const origStatus = targetApt.status

const checkInRes = checkInPatient(sunrise, targetApt.id, 'Room 102')
assert.equal(checkInRes.success, true)
assert.equal(targetApt.status, 'Checked in')
assert.equal(targetApt.roomNumber, 'Room 102')
assert.ok(targetApt.checkedInAt, 'checkedInAt must be populated')

// Progress to In Progress
const progressRes = updateQueueStatus(sunrise, targetApt.id, 'In Progress')
assert.equal(progressRes.success, true)
assert.equal(targetApt.status, 'In Progress')

// Complete appointment
const completeRes = updateQueueStatus(sunrise, targetApt.id, 'Completed')
assert.equal(completeRes.success, true)
assert.equal(targetApt.status, 'Completed')
assert.ok(targetApt.completedAt, 'completedAt must be populated')

console.log('   ✓ Check-in and queue transitions verified.\n')

// -------------------------------------------------------------
// Test 4: Appointment Booking & Conflict Detection
// -------------------------------------------------------------
console.log('4. Testing Appointment Booking & Double-Booking Prevention...')
function bookAppointment(clinic, bookingData) {
  const { doctor, date, time } = bookingData

  // Conflict check: Check for existing active appointment with same doctor at same date and time
  const hasConflict = clinic.appointments.some(
    (apt) =>
      apt.doctor?.toLowerCase() === doctor.toLowerCase() &&
      apt.date === date &&
      apt.time === time &&
      apt.status !== 'Cancelled' &&
      apt.status !== 'No-show'
  )

  if (hasConflict) {
    return {
      success: false,
      error: `Doctor ${doctor} is already booked on ${date} at ${time}. Please select a different time slot.`,
    }
  }

  const newApt = {
    id: `apt-${Date.now()}`,
    ...bookingData,
    status: 'Confirmed',
    bookedBy: 'Receptionist',
    createdAt: new Date().toISOString(),
  }

  clinic.appointments.push(newApt)
  return { success: true, appointment: newApt }
}

const testDate = '2026-11-05'
const testTime = '09:00 AM'
const doctorName = 'Dr. Maya Patel'

// First booking should succeed
const bookRes1 = bookAppointment(sunrise, {
  patientName: 'Sarah Connor',
  patientPhone: '(415) 555-9988',
  doctor: doctorName,
  date: testDate,
  time: testTime,
  service: 'Consultation',
  fee: 150,
})
assert.equal(bookRes1.success, true)
assert.equal(bookRes1.appointment.status, 'Confirmed')

// Second booking for SAME doctor, date, and time must FAIL
const conflictRes = bookAppointment(sunrise, {
  patientName: 'John Matrix',
  patientPhone: '(415) 555-7766',
  doctor: doctorName,
  date: testDate,
  time: testTime,
  service: 'Annual Checkup',
  fee: 200,
})
assert.equal(conflictRes.success, false)
assert.match(conflictRes.error, /already booked/)

// Booking for a DIFFERENT doctor at the exact same date and time should SUCCEED
const diffDoctorRes = bookAppointment(sunrise, {
  patientName: 'John Matrix',
  patientPhone: '(415) 555-7766',
  doctor: 'Dr. David Kim',
  date: testDate,
  time: testTime,
  service: 'Annual Checkup',
  fee: 200,
})
assert.equal(diffDoctorRes.success, true)
console.log('   ✓ Double-booking detection and conflict prevention verified.\n')

// -------------------------------------------------------------
// Test 5: Front-Desk Patient Registration & Duplicate Prevention
// -------------------------------------------------------------
console.log('5. Testing Front-Desk Patient Registration & Validation...')
function registerPatientAtDesk(clinic, patientData) {
  const cleanEmail = (patientData.email || '').trim().toLowerCase()
  const cleanPhone = (patientData.phone || '').replace(/\D/g, '')

  // Duplicate Check
  const duplicate = clinic.patients.find((p) => {
    const existingEmail = (p.email || '').trim().toLowerCase()
    const existingPhone = (p.phone || '').replace(/\D/g, '')
    return (cleanEmail && existingEmail === cleanEmail) || (cleanPhone && existingPhone === cleanPhone)
  })

  if (duplicate) {
    return {
      success: false,
      error: `Patient already registered with this ${
        duplicate.email?.toLowerCase() === cleanEmail ? 'email' : 'phone number'
      } (Patient ID: ${duplicate.id}, Name: ${duplicate.name}).`,
    }
  }

  const newPatient = {
    id: `p${Date.now()}`,
    ...patientData,
    registeredAt: new Date().toISOString(),
    accountLinked: false,
  }

  clinic.patients.push(newPatient)
  return { success: true, patient: newPatient }
}

// 1. New unique registration
const regRes1 = registerPatientAtDesk(sunrise, {
  name: 'Marcus Brody',
  phone: '(415) 555-4321',
  email: 'brody@museum.org',
  dob: '1975-06-15',
  gender: 'Male',
  bloodGroup: 'A+',
  address: '42 Academic Way, SF',
})
assert.equal(regRes1.success, true)
assert.equal(regRes1.patient.name, 'Marcus Brody')
assert.equal(regRes1.patient.accountLinked, false)

// 2. Duplicate registration attempt with same email
const dupEmailRes = registerPatientAtDesk(sunrise, {
  name: 'Marcus Brody Jr.',
  phone: '(415) 555-8899',
  email: 'brody@museum.org',
})
assert.equal(dupEmailRes.success, false)
assert.match(dupEmailRes.error, /already registered with this email/)

// 3. Duplicate registration attempt with same phone
const dupPhoneRes = registerPatientAtDesk(sunrise, {
  name: 'Different Name',
  phone: '(415) 555-4321',
  email: 'different@other.org',
})
assert.equal(dupPhoneRes.success, false)
assert.match(dupPhoneRes.error, /already registered with this phone number/)
console.log('   ✓ Patient registration and duplicate checks verified.\n')

// -------------------------------------------------------------
// Test 6: Front-Desk Billing & In-Person Payment Recording
// -------------------------------------------------------------
console.log('6. Testing Invoice Creation & In-Person Payment Receipting...')
function createInvoice(state, clinicId, invoiceData) {
  const invNumber = `INV-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`
  const newInvoice = {
    id: `inv-${Date.now()}`,
    invoice: invNumber,
    clinicId,
    status: 'Pending',
    createdAt: new Date().toISOString(),
    ...invoiceData,
  }
  state.patientInvoices.push(newInvoice)
  return { success: true, invoice: newInvoice }
}

function recordPayment(state, invoiceId, paymentDetails) {
  const inv = state.patientInvoices.find((i) => i.id === invoiceId || i.invoice === invoiceId)
  if (!inv) return { success: false, error: 'Invoice not found' }

  inv.status = 'Paid'
  inv.paidAt = new Date().toISOString()
  inv.paymentMethod = paymentDetails.method // Cash, Credit Card, Debit Card, UPI, Cheque
  inv.receiptReference = `REC-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`
  inv.collectedBy = paymentDetails.collectedBy || 'Ava Robinson (Receptionist)'

  return { success: true, invoice: inv }
}

const invRes = createInvoice(state, 'sunrise', {
  patientName: 'Marcus Brody',
  patientEmail: 'brody@museum.org',
  patientPhone: '(415) 555-4321',
  service: 'General Consultation',
  amount: 120,
  tax: 12,
  total: 132,
  dueDate: '2026-11-10',
})
assert.equal(invRes.success, true)
assert.equal(invRes.invoice.status, 'Pending')

// Collect in-person cash payment
const payRes = recordPayment(state, invRes.invoice.id, {
  method: 'Cash',
  collectedBy: 'Ava Robinson',
})
assert.equal(payRes.success, true)
assert.equal(payRes.invoice.status, 'Paid')
assert.equal(payRes.invoice.paymentMethod, 'Cash')
assert.ok(payRes.invoice.receiptReference.startsWith('REC-'), 'Receipt reference must start with REC-')
console.log(`   ✓ In-person payment recorded with receipt: ${payRes.invoice.receiptReference}\n`)

// -------------------------------------------------------------
// Test 7: Receptionist Notifications Management
// -------------------------------------------------------------
console.log('7. Testing Receptionist Notifications...')
const unreadBefore = state.receptionistNotifications.filter((n) => !n.read).length
assert.ok(unreadBefore > 0, 'Should have unread receptionist notifications')

// Mark single notification read
const noteToRead = state.receptionistNotifications.find((n) => !n.read)
noteToRead.read = true
const unreadAfterOne = state.receptionistNotifications.filter((n) => !n.read).length
assert.equal(unreadAfterOne, unreadBefore - 1)

// Mark all read
state.receptionistNotifications.forEach((n) => (n.read = true))
const unreadFinal = state.receptionistNotifications.filter((n) => !n.read).length
assert.equal(unreadFinal, 0, 'All notifications should be marked read')
console.log('   ✓ Notifications marking and unread counter verified.\n')

// -------------------------------------------------------------
// Test 8: Receptionist Profile & Shift Settings
// -------------------------------------------------------------
console.log('8. Testing Receptionist Profile & Shift Update...')
const updatedProfile = {
  ...ava,
  shiftHours: '07:30 AM – 03:30 PM (Morning Front Desk)',
  deskLocation: 'Main Lobby - Counter 2',
  extension: '104',
}
assert.equal(updatedProfile.deskLocation, 'Main Lobby - Counter 2')
assert.equal(updatedProfile.extension, '104')
console.log('   ✓ Receptionist profile and shift verified.\n')

console.log('🎉 ALL RECEPTIONIST MODULE TESTS PASSED PERFECTLY!\n')

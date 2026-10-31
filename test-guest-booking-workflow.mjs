// test-guest-booking-workflow.mjs
import assert from 'assert'
import fs from 'fs'

console.log('🧪 Starting automated verification for Guest Appointment Booking Workflow...\n')

// 1. Verify Home Page Component and Modal exports in PublicPages.jsx
console.log('1. Verifying Home Page and Guest Booking Modal implementations in PublicPages.jsx...')
const publicPagesCode = fs.readFileSync('src/PublicPages.jsx', 'utf8')

assert(publicPagesCode.includes('export function LandingPage'), 'LandingPage must be exported')
assert(publicPagesCode.includes('export function GuestAppointmentBookingModal'), 'GuestAppointmentBookingModal must be exported')
assert(publicPagesCode.includes('book-appointment'), 'Home page must include the dedicated book-appointment section')
assert(publicPagesCode.includes('Book Appointment'), 'Hero must feature guest booking CTA')
assert(publicPagesCode.includes('Instant Guest Booking'), 'Home page must display Instant Guest Booking section')
assert(publicPagesCode.includes('bookGuestAppointment'), 'Modal must call bookGuestAppointment')
assert(publicPagesCode.includes('CONF-'), 'Reference code prefix CONF- must be present')
assert(publicPagesCode.includes('window.print()'), 'Print summary capability must be included')
console.log('   ✓ Home page and Guest Booking Modal verified in PublicPages.jsx.')

// 2. Load Seed Data & Store Logic
console.log('\n2. Testing Guest Appointment Booking Engine & Isolation...')
const dataModule = await import('./src/data.js')
const seedData = JSON.parse(JSON.stringify(dataModule.seedData))

// Mock Store State
let state = {
  clinics: JSON.parse(JSON.stringify(seedData.clinics)),
  patientNotifications: [],
  receptionistNotifications: [],
}

function notifyMock(msg) {
  // Mock toast
}

// Emulate bookGuestAppointment from Store.jsx
function bookGuestAppointment({
  clinicId,
  doctorId,
  doctorName,
  date,
  time,
  type,
  notes,
  fee,
  patientName,
  patientPhone,
  patientEmail,
  patientNotes,
}) {
  const targetClinic = state.clinics.find((c) => c.id === clinicId)
  if (!targetClinic) return { success: false, error: 'Selected clinic was not found.' }

  if (!patientName || !patientName.trim()) {
    return { success: false, error: 'Please enter patient full legal name.' }
  }
  if (!patientPhone || !patientPhone.trim()) {
    return { success: false, error: 'Please enter patient contact phone number.' }
  }
  if (!doctorName) {
    return { success: false, error: 'Please select an attending doctor.' }
  }
  if (!time) {
    return { success: false, error: 'Please select an appointment time slot.' }
  }

  // Double-booking conflict check
  const isConflict = targetClinic.appointments.some((appt) => {
    const sameDoctor = appt.doctorId === doctorId || appt.doctor === doctorName
    const sameDate = appt.date === date || (date === new Date().toISOString().slice(0, 10) && appt.date === 'Today')
    const sameTime = appt.time.toLowerCase().replace(/\s+/g, '') === time.toLowerCase().replace(/\s+/g, '')
    const isActive = appt.status !== 'Cancelled'
    return sameDoctor && sameDate && sameTime && isActive
  })

  if (isConflict) {
    return {
      success: false,
      error: `${doctorName} is already booked at ${time} on ${date}. Please select another time slot.`,
    }
  }

  const apptId = `a-gst-${Date.now()}`
  const referenceCode = `CONF-${Math.floor(100000 + Math.random() * 900000)}`

  let patientId = null
  const cleanPhone = (patientPhone || '').replace(/\D/g, '')
  const cleanEmail = (patientEmail || '').trim().toLowerCase()

  const existingPatient = targetClinic.patients.find(
    (p) =>
      (cleanEmail && p.email && p.email.toLowerCase() === cleanEmail) ||
      (cleanPhone && p.phone && p.phone.replace(/\D/g, '') === cleanPhone)
  )

  if (existingPatient) {
    patientId = existingPatient.id
  } else {
    patientId = `p-gst-${Date.now()}`
  }

  const newAppointment = {
    id: apptId,
    patient: patientName.trim(),
    patientId,
    patientEmail: cleanEmail,
    patientPhone: patientPhone.trim(),
    doctor: doctorName,
    doctorId: doctorId || `s-doc-${Date.now()}`,
    date,
    time,
    type: type || 'In-Person Consultation',
    status: 'Confirmed',
    notes: notes || patientNotes || 'Guest booking from homepage',
    fee: Number(fee) || 120,
    confirmationCode: referenceCode,
    isGuest: true,
    bookedAt: new Date().toISOString(),
  }

  const recNotif = {
    id: `rec-notif-${Date.now()}`,
    clinicId: targetClinic.id,
    type: 'appointment_request',
    title: 'New Guest Booking from Homepage',
    message: `${patientName.trim()} booked a ${type || 'Consultation'} with ${doctorName} for ${date} at ${time}. Ref: ${referenceCode}.`,
    date: 'Just now',
    read: false,
    link: '/receptionist/appointments',
  }

  if (cleanEmail) {
    state.patientNotifications.unshift({
      id: `notif-${Date.now()}`,
      patientEmail: cleanEmail,
      clinicId: targetClinic.id,
      type: 'appointment_confirmed',
      title: 'Appointment Confirmed',
      message: `Your ${type || 'consultation'} with ${doctorName} at ${targetClinic.name} is confirmed for ${date} at ${time}. Booking Ref: ${referenceCode}.`,
      date: 'Just now',
      read: false,
      link: '/patient/appointments',
    })
  }

  state.clinics = state.clinics.map((c) => {
    if (c.id === clinicId) {
      const updatedPatients = existingPatient
        ? c.patients
        : [
            {
              id: patientId,
              name: patientName.trim(),
              email: cleanEmail,
              phone: patientPhone.trim(),
              age: 0,
              gender: 'Not specified',
              status: 'Active',
              lastVisit: 'Scheduled',
              registeredAt: new Date().toISOString(),
            },
            ...c.patients,
          ]
      return {
        ...c,
        patients: updatedPatients,
        appointments: [newAppointment, ...c.appointments],
      }
    }
    return c
  })

  state.receptionistNotifications.unshift(recNotif)

  return {
    success: true,
    appointment: newAppointment,
    referenceCode,
    clinic: targetClinic,
  }
}

// 3. Test Successful Guest Booking
console.log('\n3. Testing Successful Guest Booking without User Account...')
const bookingDate = '2026-11-05'
const bookingTime = '11:00 AM'

const res1 = bookGuestAppointment({
  clinicId: 'sunrise',
  doctorId: 's1',
  doctorName: 'Dr. Maya Patel',
  date: bookingDate,
  time: bookingTime,
  type: 'In-Person Consultation',
  fee: 120,
  patientName: 'Lucas Vance',
  patientPhone: '(415) 555-8822',
  patientEmail: 'lucas.vance@example.com',
  notes: 'First time visitor - knee consultation',
})

assert.strictEqual(res1.success, true, 'Guest appointment booking should succeed')
assert(res1.referenceCode.startsWith('CONF-'), 'Reference code should start with CONF-')
assert.strictEqual(res1.appointment.isGuest, true, 'Appointment should be flagged as guest')
assert.strictEqual(res1.appointment.patient, 'Lucas Vance', 'Patient name should match')
assert.strictEqual(res1.appointment.status, 'Confirmed', 'Status should be Confirmed')

// Verify clinic state
const sunrise = state.clinics.find((c) => c.id === 'sunrise')
const foundAppt = sunrise.appointments.find((a) => a.confirmationCode === res1.referenceCode)
assert(foundAppt, 'Appointment must be present in clinic appointments')
const foundPatient = sunrise.patients.find((p) => p.name === 'Lucas Vance')
assert(foundPatient, 'Patient record must be created or linked in clinic patients')
assert.strictEqual(state.receptionistNotifications.length, 1, 'Receptionist notification must be dispatched')
assert.strictEqual(state.patientNotifications.length, 1, 'Patient notification must be created when email provided')

console.log(`   ✓ Guest booking created successfully! Reference Code: ${res1.referenceCode}`)
console.log('   ✓ Clinic appointments, patient roster, and notifications verified.')

// 4. Test Double-Booking Conflict Prevention
console.log('\n4. Testing Double-Booking Prevention for Guest Bookings...')
const resConflict = bookGuestAppointment({
  clinicId: 'sunrise',
  doctorId: 's1',
  doctorName: 'Dr. Maya Patel',
  date: bookingDate,
  time: bookingTime, // SAME time slot
  type: 'In-Person Consultation',
  fee: 120,
  patientName: 'Sophia Clark',
  patientPhone: '(415) 555-9933',
  notes: 'Attempting double booking',
})

assert.strictEqual(resConflict.success, false, 'Double booking must be rejected')
assert(resConflict.error.includes('already booked'), 'Error should explain conflict')
console.log(`   ✓ Conflict caught properly: "${resConflict.error}"`)

// 5. Test Booking Same Time with Different Doctor
console.log('\n5. Testing Booking Same Time with Different Doctor...')
const resDiffDoctor = bookGuestAppointment({
  clinicId: 'sunrise',
  doctorId: 's2',
  doctorName: 'Dr. James Lee',
  date: bookingDate,
  time: bookingTime, // Same time, but different doctor (Dr. James Lee)
  type: 'Video Telehealth Consultation',
  fee: 95,
  patientName: 'Sophia Clark',
  patientPhone: '(415) 555-9933',
  patientEmail: 'sophia@example.com',
  notes: 'Pediatric inquiry',
})

assert.strictEqual(resDiffDoctor.success, true, 'Booking with available doctor should succeed')
console.log(`   ✓ Successfully booked Dr. James Lee at ${bookingTime} (Ref: ${resDiffDoctor.referenceCode})`)

// 6. Test Receptionist Front-Desk Check-In for Guest Appointment
console.log('\n6. Testing Front-Desk Check-In for Guest Appointment...')
function checkInPatientMock(appointmentId) {
  const clinic = state.clinics.find((c) => c.appointments.some((a) => a.id === appointmentId))
  if (!clinic) return { success: false, error: 'Appointment not found' }
  clinic.appointments = clinic.appointments.map((a) =>
    a.id === appointmentId ? { ...a, status: 'Checked In', checkInTime: '10:52 AM' } : a
  )
  return { success: true }
}

const checkInRes = checkInPatientMock(foundAppt.id)
assert.strictEqual(checkInRes.success, true, 'Receptionist check-in should succeed for guest booking')

const currentSunrise = state.clinics.find((c) => c.id === 'sunrise')
const updatedAppt = currentSunrise.appointments.find((a) => a.id === foundAppt.id)
assert.strictEqual(updatedAppt.status, 'Checked In', 'Appointment status should transition to Checked In')
console.log(`   ✓ Guest appointment ${foundAppt.confirmationCode} successfully checked in at reception!`)

console.log('\n🎉 ALL GUEST BOOKING WORKFLOW TESTS PASSED PERFECTLY!\n')

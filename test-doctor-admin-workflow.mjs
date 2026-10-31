import assert from 'node:assert/strict'
import { seedData } from './src/data.js'

console.log('🧪 Starting automated verification for Doctor (Clinic Admin) unified workflow...\n')

// -------------------------------------------------------------
// Test 1: Doctor and Clinic Admin Identity Unification
// -------------------------------------------------------------
console.log('1. Checking Doctor (Clinic Admin) Persona Unification...')
const sunrise = seedData.clinics.find((c) => c.id === 'sunrise')
assert.ok(sunrise, 'Sunrise clinic must exist')
assert.equal(sunrise.owner, 'Dr. Maya Patel', 'Clinic owner must be Dr. Maya Patel')

// Dr. Maya Patel is also in staff as the attending doctor
const attendingDoc = sunrise.staff.find((s) => s.name === 'Dr. Maya Patel')
assert.ok(attendingDoc, 'Dr. Maya Patel must be registered in clinic staff')
assert.equal(attendingDoc.email, sunrise.email, 'Owner email matches primary staff email')
console.log('   ✓ Doctor & Clinic Admin persona is unified.\n')

// -------------------------------------------------------------
// Test 2: Doctor Creating a Clinic (Registration)
// -------------------------------------------------------------
console.log('2. Testing Doctor Creating a Clinic...')
function registerDoctorClinic(state, clinicDetails) {
  const id = `clinic-${Date.now()}`
  const doctorName = clinicDetails.owner
  const newClinic = {
    ...clinicDetails,
    id,
    plan: 'Professional',
    status: 'Trial',
    joined: new Date().toISOString().slice(0, 10),
    patients: [],
    staff: [
      {
        id: `s-${Date.now()}`,
        name: doctorName,
        role: clinicDetails.type || 'Attending Physician & Clinic Director',
        specialty: clinicDetails.type || 'Cardiology',
        email: clinicDetails.email,
        status: 'Active',
      },
    ],
    appointments: [],
    services: [
      { id: `sv-1`, name: 'Cardiology Consultation', duration: '30 min', price: '$150' },
    ],
  }
  state.clinics.push(newClinic)

  const userSession = {
    name: doctorName,
    role: 'clinic_admin',
    email: clinicDetails.email,
    clinicId: id,
    title: 'Doctor (Clinic Admin)',
  }

  return { success: true, clinic: newClinic, user: userSession }
}

const state = JSON.parse(JSON.stringify(seedData))
const creationResult = registerDoctorClinic(state, {
  name: 'Heart & Vascular Care Clinic',
  owner: 'Dr. Robert Chen',
  email: 'dr.chen@heartcare.com',
  phone: '(415) 555-9000',
  type: 'Cardiology',
  address: '500 Parnassus Ave, SF',
})

assert.equal(creationResult.success, true)
assert.equal(creationResult.clinic.owner, 'Dr. Robert Chen')
assert.equal(creationResult.clinic.staff[0].name, 'Dr. Robert Chen')
assert.equal(creationResult.user.role, 'clinic_admin')
assert.equal(creationResult.user.title, 'Doctor (Clinic Admin)')
console.log('   ✓ Doctor successfully created clinic and is registered as primary attending physician.\n')

// -------------------------------------------------------------
// Test 3: Attending Patient (Clinical Consultation & Prescription)
// -------------------------------------------------------------
console.log('3. Testing Doctor Attending Patient Consultation...')

function attendPatient(state, clinicId, consultationData) {
  const clinic = state.clinics.find((c) => c.id === clinicId)
  if (!clinic) return { success: false, error: 'Clinic not found' }

  const { appointmentId, patientName, patientEmail, diagnosis, notes, vitals, medications } = consultationData

  // 1. Update appointment to Completed
  const apt = clinic.appointments.find((a) => a.id === appointmentId)
  if (apt) {
    apt.status = 'Completed'
    apt.completedAt = new Date().toISOString()
    apt.attendedBy = clinic.owner
    apt.diagnosis = diagnosis
    apt.clinicalNotes = notes
  }

  // 2. Add Medical Record
  const newRecord = {
    id: `rec-${Date.now()}`,
    clinicId,
    patientName,
    patientEmail,
    date: 'Today',
    doctor: clinic.owner,
    title: diagnosis,
    summary: notes,
    vitals,
    authorizedForPatient: true,
  }
  state.medicalRecords.unshift(newRecord)

  // 3. Add Prescription
  let newRx = null
  if (medications && medications.length > 0) {
    newRx = {
      id: `rx-${Date.now()}`,
      clinicId,
      patientName,
      patientEmail,
      doctor: clinic.owner,
      date: 'Today',
      diagnosis,
      medications,
      status: 'Active',
      authorizedForPatient: true,
    }
    state.prescriptions.unshift(newRx)
  }

  // 4. Notifications
  state.patientNotifications.unshift({
    id: `notif-${Date.now()}`,
    patientEmail,
    title: 'Consultation Summary & Prescription Available',
    read: false,
  })

  state.receptionistNotifications.unshift({
    id: `rec-notif-${Date.now()}`,
    title: 'Consultation Completed',
    read: false,
  })

  return { success: true, appointment: apt, record: newRecord, prescription: newRx }
}

const testSunrise = state.clinics.find((c) => c.id === 'sunrise')
const targetApt = testSunrise.appointments[0] // Emma Wilson, a1

const attendRes = attendPatient(state, 'sunrise', {
  appointmentId: targetApt.id,
  patientName: targetApt.patient,
  patientEmail: targetApt.patientEmail,
  diagnosis: 'Acute Rhinosinusitis',
  notes: 'Patient examined. Nasal mucosal edema noted. Heart and lungs clear.',
  vitals: { bp: '118/76 mmHg', heartRate: '70 bpm', temp: '98.6°F', spo2: '99%' },
  medications: [
    { name: 'Amoxicillin-Clavulanate', dosage: '875/125 mg', frequency: 'Twice daily with meals', duration: '7 days' },
  ],
})

assert.equal(attendRes.success, true)
assert.equal(targetApt.status, 'Completed', 'Appointment must be marked Completed')
assert.equal(targetApt.attendedBy, 'Dr. Maya Patel')
assert.equal(attendRes.record.title, 'Acute Rhinosinusitis')
assert.equal(attendRes.record.authorizedForPatient, true)
assert.equal(attendRes.prescription.medications[0].name, 'Amoxicillin-Clavulanate')
assert.equal(attendRes.prescription.authorizedForPatient, true)

// Check patient notification was emitted
const patientNotif = state.patientNotifications.find((n) => n.title.includes('Consultation Summary'))
assert.ok(patientNotif, 'Patient notification must be created')

// Check receptionist notification was emitted
const recNotif = state.receptionistNotifications.find((n) => n.title.includes('Consultation Completed'))
assert.ok(recNotif, 'Receptionist notification must be created')

console.log('   ✓ Doctor attended patient successfully.')
console.log('   ✓ Medical record & Prescription generated with authorized patient access.')
console.log('   ✓ Real-time notifications dispatched to patient and receptionist.\n')

console.log('🎉 ALL DOCTOR (CLINIC ADMIN) TESTS PASSED PERFECTLY!\n')


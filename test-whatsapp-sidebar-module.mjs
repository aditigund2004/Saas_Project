import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import {
  sanitizePhoneNumber,
  buildWhatsAppUrl,
  getBookingConfirmationTemplate,
  getAppointmentReminderTemplate,
  getRescheduledAppointmentTemplate,
  getCancelledAppointmentTemplate,
  WHATSAPP_STATUSES,
} from './src/whatsapp.js'

console.log('--- Testing WhatsApp & Role-Based Navigation Modules ---')

// 1. Test Navigation arrays in components.jsx
const componentsContent = fs.readFileSync(path.resolve('./src/components.jsx'), 'utf8')

// Verify receptionistNavigation items
const expectedReceptionistItems = [
  { label: 'Dashboard', to: '/receptionist/dashboard' },
  { label: 'Patients', to: '/receptionist/patients' },
  { label: 'Appointments', to: '/receptionist/appointments' },
  { label: 'Appointment Booking', to: '/receptionist/book-appointment' },
  { label: 'Check-in / Patient Queue', to: '/receptionist/queue' },
  { label: 'Doctor Availability', to: '/receptionist/doctors' },
  { label: 'WhatsApp Messages', to: '/receptionist/whatsapp' },
  { label: 'Billing', to: '/receptionist/billing' },
  { label: 'Notifications', to: '/receptionist/notifications' },
  { label: 'Profile / Settings', to: '/receptionist/profile' },
]

for (const item of expectedReceptionistItems) {
  assert(
    componentsContent.includes(item.label) && componentsContent.includes(item.to),
    `receptionistNavigation missing item: ${item.label} (${item.to})`
  )
}
console.log('✓ Verified all 10 Receptionist navigation items and paths')

// Verify doctorNavigation items
const expectedDoctorItems = [
  { label: 'Dashboard', to: '/clinic/dashboard' },
  { label: 'My Appointments', to: '/clinic/appointments' },
  { label: 'Patient Records', to: '/clinic/patients' },
  { label: 'Consultation Notes', to: '/clinic/notes' },
  { label: 'Appointment History', to: '/clinic/history' },
  { label: 'Availability / Schedule', to: '/clinic/schedule' },
  { label: 'Notifications', to: '/clinic/notifications' },
  { label: 'Profile / Settings', to: '/clinic/settings' },
]

for (const item of expectedDoctorItems) {
  assert(
    componentsContent.includes(item.label) && componentsContent.includes(item.to),
    `doctorNavigation missing item: ${item.label} (${item.to})`
  )
}
console.log('✓ Verified all 8 Doctor navigation items and paths')

// Verify patientNavigation items
const expectedPatientItems = [
  { label: 'Dashboard', to: '/patient/dashboard' },
  { label: 'Book Appointment', to: '/patient/book-appointment' },
  { label: 'My Appointments', to: '/patient/appointments' },
  { label: 'My Medical Records', to: '/patient/medical-records' },
  { label: 'Prescriptions', to: '/patient/prescriptions' },
  { label: 'WhatsApp Messages', to: '/patient/whatsapp' },
  { label: 'Billing / Payments', to: '/patient/billing' },
  { label: 'Notifications', to: '/patient/notifications' },
  { label: 'Profile / Settings', to: '/patient/profile' },
]

for (const item of expectedPatientItems) {
  assert(
    componentsContent.includes(item.label) && componentsContent.includes(item.to),
    `patientNavigation missing item: ${item.label} (${item.to})`
  )
}
console.log('✓ Verified all Patient navigation items (including WhatsApp Messages) and paths')

// 2. Test Route registrations in App.jsx
const appContent = fs.readFileSync(path.resolve('./src/App.jsx'), 'utf8')
assert(appContent.includes('/clinic/notes'), 'App.jsx missing route /clinic/notes')
assert(appContent.includes('/clinic/history'), 'App.jsx missing route /clinic/history')
assert(appContent.includes('/clinic/schedule'), 'App.jsx missing route /clinic/schedule')
assert(appContent.includes('/clinic/notifications'), 'App.jsx missing route /clinic/notifications')
assert(appContent.includes('/receptionist/whatsapp'), 'App.jsx missing route /receptionist/whatsapp')
assert(appContent.includes('/patient/whatsapp'), 'App.jsx missing route /patient/whatsapp')
assert(appContent.includes('DoctorProtectedRoute'), 'App.jsx missing DoctorProtectedRoute')
console.log('✓ Verified all new Doctor, Receptionist, and Patient WhatsApp routes and route protection in App.jsx')

// 3. Test WhatsApp statuses & templates
assert.equal(WHATSAPP_STATUSES.DRAFT, 'Draft')
assert.equal(WHATSAPP_STATUSES.READY, 'Ready to Send')
assert.equal(WHATSAPP_STATUSES.OPENED, 'Opened in WhatsApp')
console.log('✓ Verified WHATSAPP_STATUSES enum constants')

const sampleParams = {
  patientName: 'Sarah Jenkins',
  clinicName: 'Sunrise Health Clinic',
  clinicLocation: 'Austin, TX',
  clinicPhone: '+1-512-555-0199',
  doctorName: 'Dr. Marcus Vance',
  doctorSpecialty: 'Cardiology',
  date: '2026-11-04',
  time: '10:30 AM',
  consultationType: 'In-Person',
  referenceCode: 'BK-99881',
}

const confirmationMsg = getBookingConfirmationTemplate(sampleParams)
assert(confirmationMsg.includes('Sarah Jenkins'))
assert(confirmationMsg.includes('Sunrise Health Clinic'))
assert(confirmationMsg.includes('Dr. Marcus Vance (Cardiology)'))
assert(confirmationMsg.includes('BK-99881'))
assert(confirmationMsg.includes('10:30 AM'))
assert(confirmationMsg.includes('Austin, TX'))

const reminderMsg = getAppointmentReminderTemplate(sampleParams)
assert(reminderMsg.includes('Sarah Jenkins'))
assert(reminderMsg.includes('appointment reminder'))
assert(reminderMsg.includes('BK-99881'))

const rescheduleMsg = getRescheduledAppointmentTemplate({ ...sampleParams, oldDate: '2026-11-02', oldTime: '09:00 AM' })
assert(rescheduleMsg.includes('rescheduled'))
assert(rescheduleMsg.includes('BK-99881'))

const cancelMsg = getCancelledAppointmentTemplate({ ...sampleParams, reason: 'Patient requested' })
assert(cancelMsg.includes('cancelled'))
assert(cancelMsg.includes('BK-99881'))
console.log('✓ Verified all 4 WhatsApp message templates generate structured, personalized content')

// 4. Test WhatsApp URL builder
const waRes = buildWhatsAppUrl('+1 (512) 555-0199', confirmationMsg)
assert(waRes.success)
assert(waRes.url.startsWith('https://wa.me/15125550199?text='))
assert(waRes.url.includes(encodeURIComponent('Sarah Jenkins')))
console.log('✓ Verified WhatsApp URL formatting and phone sanitization')

// 5. Test seed data
const dataContent = fs.readFileSync(path.resolve('./src/data.js'), 'utf8')
assert(dataContent.includes('whatsappMessages:'), 'data.js missing whatsappMessages key')
assert(dataContent.includes('Ready to Send'), 'data.js missing Ready to Send demo status')
assert(dataContent.includes('Opened in WhatsApp'), 'data.js missing Opened in WhatsApp demo status')
console.log('✓ Verified data.js contains initial whatsappMessages seed data')

console.log('\nALL WHATSAPP & ROLE-BASED SIDEBAR TESTS PASSED SUCCESSFULLY! 🚀')

// test-whatsapp-integration.mjs
import assert from 'assert'
import fs from 'fs'

console.log('🧪 Starting automated verification for WhatsApp Messaging & Notifications in ClinicOS...\n')

// 1. Load WhatsApp utilities
console.log('1. Testing Phone Normalization and Validation...')
const whatsappModule = await import('./src/whatsapp.js')
const {
  sanitizeWhatsAppPhone,
  buildWhatsAppUrl,
  getBookingConfirmationTemplate,
  getAppointmentReminderTemplate,
  getAppointmentCancellationTemplate,
  getAppointmentRescheduledTemplate,
  getAppointmentPatientPhone,
} = whatsappModule

// Test 1a: US numbers with formatting
const phone1 = sanitizeWhatsAppPhone('+1 (415) 555-0123')
assert.strictEqual(phone1.valid, true, 'Phone +1 (415) 555-0123 should be valid')
assert.strictEqual(phone1.formatted, '14155550123', 'Should strip + and symbols')

// Test 1b: 10-digit raw number (defaults to country code 1)
const phone2 = sanitizeWhatsAppPhone('4155550123')
assert.strictEqual(phone2.valid, true, '10-digit number should be valid')
assert.strictEqual(phone2.formatted, '14155550123', 'Should prepend default country code 1')

// Test 1c: International number (e.g. UK +44)
const phone3 = sanitizeWhatsAppPhone('+44 7911 123456')
assert.strictEqual(phone3.valid, true, 'International UK number should be valid')
assert.strictEqual(phone3.formatted, '447911123456', 'Should strip spaces and +')

// Test 1d: Invalid numbers
const invalidPhone1 = sanitizeWhatsAppPhone('12345')
assert.strictEqual(invalidPhone1.valid, false, 'Short phone must be invalid')
assert(invalidPhone1.error.length > 0, 'Error message must be provided')

const invalidPhone2 = sanitizeWhatsAppPhone('')
assert.strictEqual(invalidPhone2.valid, false, 'Empty phone must be invalid')

console.log('   ✓ Phone normalization and validation passed.')

// 2. Testing Click-to-chat URL Construction
console.log('\n2. Testing WhatsApp Click-to-Chat URL Generation...')
const testMsg = 'Hello Emma Wilson, your appointment is confirmed!'
const urlRes = buildWhatsAppUrl('(415) 555-0123', testMsg)

assert.strictEqual(urlRes.success, true, 'buildWhatsAppUrl should succeed')
assert(urlRes.url.startsWith('https://wa.me/14155550123?text='), 'URL should use official wa.me format')
assert(urlRes.url.includes(encodeURIComponent('Emma Wilson')), 'URL must encode message properly')
assert(!urlRes.url.includes('+1'), 'Phone in URL must not contain +')
assert(!urlRes.url.includes('('), 'Phone in URL must not contain brackets')
console.log('   ✓ Official wa.me URL format and URL-encoding verified.')

// 3. Testing Message Templates
console.log('\n3. Testing WhatsApp Message Templates...')

// 3a. Booking Confirmation Template
const confirmMsg = getBookingConfirmationTemplate({
  patientName: 'Emma Wilson',
  referenceCode: 'CONF-892144',
  clinicName: 'Sunrise Family Clinic',
  clinicPhone: '+1 (415) 555-0184',
  doctorName: 'Dr. Maya Patel',
  consultationType: 'In-Person Consultation',
  date: '2026-11-05',
  time: '10:00 AM',
})
assert(confirmMsg.includes('Emma Wilson'), 'Confirmation must include patient name')
assert(confirmMsg.includes('CONF-892144'), 'Confirmation must include reference code')
assert(confirmMsg.includes('Sunrise Family Clinic'), 'Confirmation must include clinic name')
assert(confirmMsg.includes('Dr. Maya Patel'), 'Confirmation must include doctor name')
assert(confirmMsg.includes('10:00 AM'), 'Confirmation must include time')
console.log('   ✓ Booking Confirmation template verified.')

// 3b. Appointment Reminder Template
const reminderMsg = getAppointmentReminderTemplate({
  patientName: 'Noah Thompson',
  referenceCode: 'CONF-112233',
  clinicName: 'Sunrise Family Clinic',
  clinicPhone: '+1 (415) 555-0184',
  clinicAddress: '2418 Cedar Avenue, San Francisco, CA',
  doctorName: 'Dr. James Lee',
  date: 'Today',
  time: '11:15 AM',
  consultationType: 'Pediatric Follow-up',
})
assert(reminderMsg.includes('Noah Thompson'), 'Reminder must include patient name')
assert(reminderMsg.includes('reminder'), 'Reminder must mention appointment reminder')
assert(reminderMsg.includes('2418 Cedar Avenue'), 'Reminder must include clinic location')
assert(reminderMsg.includes('11:15 AM'), 'Reminder must include time')
console.log('   ✓ Appointment Reminder template verified.')

// 3c. Cancellation Template
const cancelMsg = getAppointmentCancellationTemplate({
  patientName: 'Lucas Vance',
  referenceCode: 'CONF-445566',
  clinicName: 'Sunrise Family Clinic',
  clinicPhone: '+1 (415) 555-0184',
  doctorName: 'Dr. Maya Patel',
  date: '2026-11-08',
  time: '02:00 PM',
  reason: 'Doctor unavailable / Emergency surgery',
})
assert(cancelMsg.includes('cancelled'), 'Cancellation must mention cancelled')
assert(cancelMsg.includes('Emergency surgery'), 'Cancellation must include reason')
assert(cancelMsg.includes('CONF-445566'), 'Cancellation must include reference code')
console.log('   ✓ Appointment Cancellation template verified.')

// 3d. Rescheduled Template
const rescheduleMsg = getAppointmentRescheduledTemplate({
  patientName: 'Lucas Vance',
  referenceCode: 'CONF-445566',
  clinicName: 'Sunrise Family Clinic',
  clinicPhone: '+1 (415) 555-0184',
  doctorName: 'Dr. Maya Patel',
  newDate: '2026-11-09',
  newTime: '03:30 PM',
  consultationType: 'In-Person Consultation',
})
assert(rescheduleMsg.includes('rescheduled'), 'Reschedule must mention rescheduled')
assert(rescheduleMsg.includes('2026-11-09'), 'Reschedule must include new date')
assert(rescheduleMsg.includes('03:30 PM'), 'Reschedule must include new time')
console.log('   ✓ Appointment Rescheduled template verified.')

// 4. Testing Guest Booking Flow Integration
console.log('\n4. Testing Guest Booking Flow with WhatsApp Confirmation...')
const publicPagesCode = fs.readFileSync('src/PublicPages.jsx', 'utf8')
assert(publicPagesCode.includes('handleWhatsAppConfirm'), 'PublicPages must include handleWhatsAppConfirm')
assert(publicPagesCode.includes('Confirm via WhatsApp'), 'PublicPages must render Confirm via WhatsApp button')
assert(publicPagesCode.includes('WhatsAppIcon'), 'PublicPages must render WhatsAppIcon')
console.log('   ✓ Guest booking confirmation button and handler verified.')

// 5. Testing Receptionist Module WhatsApp Integration
console.log('\n5. Testing Receptionist Module WhatsApp Integration...')
const receptionistCode = fs.readFileSync('src/ReceptionistPages.jsx', 'utf8')
assert(receptionistCode.includes('Send WhatsApp Reminder'), 'Receptionist appointments must include Send WhatsApp Reminder')
assert(receptionistCode.includes('Notify Patient'), 'Receptionist appointments must include Notify Patient')
assert(receptionistCode.includes('rescheduledNoticeAppt'), 'Reschedule notification state must be present')
assert(receptionistCode.includes('cancelledNoticeAppt'), 'Cancel notification state must be present')
assert(receptionistCode.includes('reminderAppt'), 'Reminder modal state must be present')
console.log('   ✓ Receptionist appointments view WhatsApp actions verified.')

// 6. Testing Patient Phone Lookup
console.log('\n6. Testing Phone Resolution from Appointment and Patients Directory...')
const clinicPatients = [
  { id: 'p1', name: 'Emma Wilson', phone: '(415) 555-0123' },
  { id: 'p2', name: 'Noah Thompson', phone: '(415) 555-0141' },
]

// From appointment directly
const apptWithPhone = { patient: 'Guest Patient', patientPhone: '14155559999' }
assert.strictEqual(getAppointmentPatientPhone(apptWithPhone, clinicPatients), '14155559999')

// From patient roster match
const apptFromRoster = { patient: 'Emma Wilson', patientId: 'p1' }
assert.strictEqual(getAppointmentPatientPhone(apptFromRoster, clinicPatients), '(415) 555-0123')
console.log('   ✓ Patient phone resolution verified.')

console.log('\n🎉 ALL WHATSAPP INTEGRATION TESTS PASSED PERFECTLY!\n')

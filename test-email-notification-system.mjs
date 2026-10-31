// test-email-notification-system.mjs
import assert from 'node:assert/strict'
import {
  interpolatePlaceholders,
  buildHtmlEmail,
  initialEmailTemplates,
  initialEmailNotifications,
} from './src/emails.js'
import { seedData } from './src/data.js'

console.log('--- STARTING CLINICOS EMAIL NOTIFICATION SYSTEM TESTS ---')

// 1. Verify 45 Predefined Templates
console.log('\n[1] Verifying 45 Predefined Email Templates Across 5 Categories...')
assert.equal(initialEmailTemplates.length, 45, 'Must contain exactly 45 email templates')

const saasTemplates = initialEmailTemplates.filter((t) => t.category === 'saas_admin')
const clinicTemplates = initialEmailTemplates.filter((t) => t.category === 'clinic_admin')
const docTemplates = initialEmailTemplates.filter((t) => t.category === 'doctor')
const recTemplates = initialEmailTemplates.filter((t) => t.category === 'receptionist')
const patientTemplates = initialEmailTemplates.filter((t) => t.category === 'patient')

assert.equal(saasTemplates.length, 10, 'SaaS Admin must have 10 templates')
assert.equal(clinicTemplates.length, 10, 'Clinic Admin must have 10 templates')
assert.equal(docTemplates.length, 7, 'Doctor must have 7 templates')
assert.equal(recTemplates.length, 6, 'Receptionist must have 6 templates')
assert.equal(patientTemplates.length, 12, 'Patient must have 12 templates')

console.log(`✓ Verified categories: SaaS (${saasTemplates.length}), Clinic (${clinicTemplates.length}), Doctor (${docTemplates.length}), Receptionist (${recTemplates.length}), Patient (${patientTemplates.length})`)

// Check specific required keys
const requiredKeys = [
  // SaaS Admin (10)
  'saas_clinic_created', 'saas_plan_purchased', 'saas_plan_upgraded', 'saas_plan_updated', 'saas_plan_downgraded',
  'saas_renewal_reminder', 'saas_subscription_cancelled', 'saas_payment_success', 'saas_payment_failed', 'saas_clinic_updated',
  // Clinic Admin (10)
  'clinic_doctor_created', 'clinic_receptionist_created', 'clinic_patient_created', 'clinic_doctor_updated', 'clinic_receptionist_updated',
  'clinic_patient_updated', 'clinic_appointment_booked', 'clinic_appointment_rescheduled', 'clinic_appointment_cancelled', 'clinic_payment_received',
  // Doctor (7)
  'doctor_account_created', 'doctor_profile_updated', 'doctor_appointment_assigned', 'doctor_appointment_rescheduled',
  'doctor_appointment_cancelled', 'doctor_appointment_reminder', 'doctor_patient_details_available',
  // Receptionist (6)
  'receptionist_account_created', 'receptionist_profile_updated', 'receptionist_patient_registered',
  'receptionist_appointment_booked', 'receptionist_appointment_updated', 'receptionist_billing_updated',
  // Patient (12)
  'patient_account_created', 'patient_profile_updated', 'patient_appointment_confirmation', 'patient_appointment_reminder',
  'patient_appointment_rescheduled', 'patient_appointment_cancelled', 'patient_prescription_available', 'patient_medicine_order_placed',
  'patient_medicine_order_accepted', 'patient_medicine_order_out_for_delivery', 'patient_medicine_order_delivered', 'patient_payment_receipt',
]

for (const key of requiredKeys) {
  const found = initialEmailTemplates.find((t) => t.key === key)
  assert.ok(found, `Required template key "${key}" must exist`)
  assert.ok(found.subject, `Template "${key}" must have a non-empty subject`)
  assert.ok(found.body || found.bodyText, `Template "${key}" must have non-empty body text`)
  assert.ok(Array.isArray(found.placeholders), `Template "${key}" must define placeholders array`)
}
console.log('✓ All 45 required template keys present and properly configured.')

// 2. Verify Dynamic Placeholder Replacement
console.log('\n[2] Verifying Dynamic Placeholder Interpolation...')
const sampleText = 'Hello {name}, your appointment at {clinic_name} on {date} at {time} with {doctor_name} is confirmed. Ref: {reference_code}'
const interpolated = interpolatePlaceholders(sampleText, {
  name: 'John Doe',
  clinic_name: 'Metro Care Center',
  date: 'Nov 04, 2026',
  time: '2:30 PM',
  doctor_name: 'Dr. Patel',
  reference_code: 'REF-9988',
})
assert.equal(interpolated, 'Hello John Doe, your appointment at Metro Care Center on Nov 04, 2026 at 2:30 PM with Dr. Patel is confirmed. Ref: REF-9988')
console.log('✓ Placeholder interpolation successfully replaced all tags.')

// 3. Verify HTML Email Document Generation
console.log('\n[3] Verifying HTML Email Template Document Generation...')
const html = buildHtmlEmail({
  title: 'Appointment Confirmed',
  recipientName: 'Emma Wilson',
  subject: 'Your Visit Confirmation',
  headline: 'Appointment Confirmed!',
  bodyText: 'We are pleased to confirm your appointment at Metro Care Center.',
  details: [
    { label: 'Doctor', value: 'Dr. Sarah Jenkins' },
    { label: 'Date & Time', value: 'Nov 02, 2026 · 10:30 AM' },
    { label: 'Reference Code', value: 'CONF-839201' },
    { label: 'Fee', value: '₹120.00' },
  ],
  actionText: 'View in Portal',
  actionUrl: '/patient/appointments',
  clinicName: 'Metro Care Center',
})

assert.ok(html.includes('<!DOCTYPE html>'), 'HTML output must have DOCTYPE')
assert.ok(html.includes('ClinicOS Healthcare SaaS'), 'HTML output must include ClinicOS branding')
assert.ok(html.includes('Metro Care Center'), 'HTML output must contain clinic name')
assert.ok(html.includes('Dr. Sarah Jenkins'), 'HTML output must render detail values')
assert.ok(html.includes('₹120.00'), 'HTML output must render INR currency value')
assert.ok(html.includes('View in Portal'), 'HTML output must include CTA button')
console.log('✓ HTML Email compiled with ClinicOS layout, responsive table, and CTA button.')

// 4. Verify Seed Data includes emailTemplates and emailNotifications
console.log('\n[4] Verifying Seed Data Integration...')
assert.ok(Array.isArray(seedData.emailTemplates), 'seedData must contain emailTemplates')
assert.equal(seedData.emailTemplates.length, 45, 'seedData must have 45 initial templates')
assert.ok(Array.isArray(seedData.emailNotifications), 'seedData must contain emailNotifications')
assert.ok(seedData.emailNotifications.length > 0, 'seedData must have initial notification records')
console.log(`✓ seedData initialized with ${seedData.emailTemplates.length} templates and ${seedData.emailNotifications.length} notification logs.`)

// 5. Verify Template Compilation Across All 45 Templates
console.log('\n[5] Verifying Full HTML Compilation of all 45 templates...')
for (const tmpl of initialEmailTemplates) {
  const sampleData = {
    name: 'Test User',
    email: 'test@example.com',
    clinic_name: 'Sunrise Family Clinic',
    clinic_address: '2418 Cedar Ave',
    clinic_phone: '+1 555-0184',
    doctor_name: 'Dr. Maya Patel',
    patient_name: 'Emma Wilson',
    plan_name: 'Professional',
    billing_cycle: 'Monthly',
    amount: '₹2,499.00',
    fee: '₹120.00',
    date: 'Nov 04, 2026',
    time: '10:00 AM',
    reference_code: 'REF-12345',
    order_id: 'ORD-999',
    pharmacy_name: 'City Meds',
  }
  const renderedSub = interpolatePlaceholders(tmpl.subject, sampleData)
  const renderedHead = interpolatePlaceholders(tmpl.headline, sampleData)
  const renderedBody = interpolatePlaceholders(tmpl.body || tmpl.bodyText || '', sampleData)
  const renderedHtml = buildHtmlEmail({
    title: renderedHead || renderedSub,
    subject: renderedSub,
    headline: renderedHead,
    recipientName: sampleData.name,
    bodyText: renderedBody,
    details: (tmpl.detailsTemplate || []).map((d) => ({
      label: interpolatePlaceholders(d.label, sampleData),
      value: interpolatePlaceholders(d.value, sampleData),
    })),
    clinicName: sampleData.clinic_name,
  })
  assert.ok(renderedHtml.length > 100, `Template ${tmpl.key} must produce non-empty HTML`)
  assert.ok(!renderedHtml.includes('undefined'), `Template ${tmpl.key} HTML must not contain "undefined"`)
}
console.log('✓ All 45 templates compile into clean HTML emails with zero errors.')

// 6. Verify Email Notification Structure & Placeholders in Seed Notifications
console.log('\n[6] Verifying Email Notification Log Structure...')
for (const notif of seedData.emailNotifications) {
  assert.ok(notif.id, 'Notification must have unique id')
  assert.ok(notif.recipientEmail, 'Notification must have recipientEmail')
  assert.ok(notif.recipientName, 'Notification must have recipientName')
  assert.ok(notif.userRole, 'Notification must specify userRole')
  assert.ok(notif.subject, 'Notification must have subject')
  assert.ok(notif.htmlContent, 'Notification must contain compiled htmlContent')
  assert.ok(['Sent', 'Queued', 'Draft', 'Failed'].includes(notif.status), 'Notification must have valid status')
}
console.log('✓ All initial notification logs have valid structure, statuses, and HTML payloads.')

console.log('\n--- ALL EMAIL NOTIFICATION SYSTEM TESTS PASSED SUCCESSFULLY! ---')

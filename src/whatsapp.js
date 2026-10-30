// src/whatsapp.js
// WhatsApp click-to-chat utilities, phone normalization, and message templates for ClinicOS.
import React from 'react'

/**
 * Standard crisp WhatsApp Icon SVG component.
 * Uses pure React.createElement so this module works seamlessly in both Node and Vite.
 */
export function WhatsAppIcon({ size = 16, className = '' }) {
  return React.createElement(
    'svg',
    {
      width: size,
      height: size,
      viewBox: '0 0 24 24',
      fill: 'currentColor',
      className,
      'aria-hidden': 'true',
    },
    React.createElement('path', {
      d: 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z',
    })
  )
}

/**
 * Normalizes and validates a phone number for the WhatsApp click-to-chat API.
 * Format requirement: country code + digits, no "+", spaces, dashes, or brackets.
 * e.g. "+1 (415) 555-0123" -> "14155550123"
 */
export function sanitizeWhatsAppPhone(phone, defaultCountryCode = '1') {
  if (!phone || typeof phone !== 'string') {
    return { valid: false, error: 'Phone number is required.', formatted: '' }
  }
  const digits = phone.replace(/\D/g, '')
  if (!digits || digits.length < 7) {
    return { valid: false, error: 'Phone number is too short or invalid.', formatted: '' }
  }
  if (digits.length === 10) {
    // 10-digit standard number (e.g. US/Canada): prepend default country code
    return { valid: true, formatted: `${defaultCountryCode}${digits}`, error: '' }
  }
  if (digits.length >= 11 && digits.length <= 15) {
    return { valid: true, formatted: digits, error: '' }
  }
  return {
    valid: false,
    error: 'Phone number format is not recognized. Please provide a valid country code and number.',
    formatted: '',
  }
}

/**
 * Builds the official WhatsApp click-to-chat URL:
 * https://wa.me/PHONE_NUMBER?text=ENCODED_MESSAGE
 */
export function buildWhatsAppUrl(phone, message, defaultCountryCode = '1') {
  const check = sanitizeWhatsAppPhone(phone, defaultCountryCode)
  if (!check.valid) {
    return { success: false, error: check.error, url: '', formattedPhone: '' }
  }
  const encodedText = encodeURIComponent(message.trim())
  return {
    success: true,
    url: `https://wa.me/${check.formatted}?text=${encodedText}`,
    formattedPhone: check.formatted,
    error: '',
  }
}

/**
 * Opens WhatsApp Web or WhatsApp Desktop / Mobile in a new tab.
 */
export function openWhatsAppChat(phone, message, defaultCountryCode = '1') {
  const res = buildWhatsAppUrl(phone, message, defaultCountryCode)
  if (!res.success) {
    return res
  }
  if (typeof window !== 'undefined' && window.open) {
    window.open(res.url, '_blank', 'noopener,noreferrer')
  }
  return res
}

/**
 * Resolves a patient's phone number from either the appointment record or clinic patients directory.
 */
export function getAppointmentPatientPhone(appointment, clinicPatients = []) {
  if (appointment?.patientPhone) return appointment.patientPhone
  const match = (clinicPatients || []).find(
    (p) =>
      p.id === appointment?.patientId ||
      (p.name && appointment?.patient && p.name.toLowerCase() === appointment.patient.toLowerCase())
  )
  return match?.phone || ''
}

// ==========================================
// WhatsApp Message Templates & Statuses
// ==========================================

export const WHATSAPP_STATUSES = {
  DRAFT: 'Draft',
  READY: 'Ready to Send',
  OPENED: 'Opened in WhatsApp',
}

export function getBookingConfirmationTemplate({
  patientName,
  referenceCode,
  clinicName,
  clinicLocation,
  clinicAddress,
  clinicPhone,
  doctorName,
  doctorSpecialty,
  consultationType,
  date,
  time,
}) {
  const doctorDisplay = doctorSpecialty ? `${doctorName || 'Attending Physician'} (${doctorSpecialty})` : doctorName || 'Attending Physician'
  const location = clinicLocation || clinicAddress
  const locationLine = location ? `Location: ${location}\n` : ''
  const contactText = clinicPhone ? `Contact ${clinicPhone} if you need to reschedule.` : 'Contact the clinic if you need to reschedule.'

  return `Hello ${patientName || 'Patient'}, your appointment at ${clinicName || 'City Care Clinic'} is confirmed.

Doctor: ${doctorDisplay}
Date: ${date || 'Today'}
Time: ${time || 'Scheduled Time'}
Consultation: ${consultationType || 'In-Person'}
Booking Reference: ${referenceCode || 'CONF-PENDING'}
${locationLine}Please arrive 10 minutes early. ${contactText} Thank you!`
}

export function getAppointmentReminderTemplate({
  patientName,
  referenceCode,
  clinicName,
  clinicPhone,
  clinicAddress,
  doctorName,
  date,
  time,
  consultationType,
}) {
  return `Hello ${patientName || 'Patient'}, this is an appointment reminder from ${clinicName || 'our clinic'}.

Appointment Reference: ${referenceCode || 'N/A'}
Doctor: ${doctorName || 'Attending Physician'}
Date: ${date || 'Today'}
Time: ${time || 'Scheduled Time'}
Consultation: ${consultationType || 'In-Person Consultation'}
${clinicAddress ? `Location: ${clinicAddress}\n` : ''}
Please arrive 10 minutes prior to your scheduled time. For questions or assistance, contact ${clinicPhone || 'our reception'}.

Thank you,
${clinicName || 'ClinicOS'}`
}

export function getAppointmentCancellationTemplate({
  patientName,
  referenceCode,
  clinicName,
  clinicPhone,
  doctorName,
  date,
  time,
  reason,
}) {
  return `Hello ${patientName || 'Patient'}, your appointment at ${clinicName || 'our clinic'} has been cancelled.

Appointment Reference: ${referenceCode || 'N/A'}
Doctor: ${doctorName || 'Attending Physician'}
Scheduled Date: ${date || 'N/A'}
Scheduled Time: ${time || 'N/A'}
Reason: ${reason || 'Administrative update'}

If you would like to reschedule or have questions, please contact ${clinicPhone || 'our reception desk'}.

Thank you,
${clinicName || 'ClinicOS'}`
}

// Aliases for convenience across modules
export const getCancelledAppointmentTemplate = getAppointmentCancellationTemplate

export function getAppointmentRescheduledTemplate({
  patientName,
  referenceCode,
  clinicName,
  clinicPhone,
  clinicAddress,
  doctorName,
  newDate,
  newTime,
  date,
  time,
  consultationType,
}) {
  const effectiveDate = newDate || date || 'N/A'
  const effectiveTime = newTime || time || 'N/A'
  return `Hello ${patientName || 'Patient'}, your appointment at ${clinicName || 'our clinic'} has been rescheduled.

Appointment Reference: ${referenceCode || 'N/A'}
Doctor: ${doctorName || 'Attending Physician'}
New Date: ${effectiveDate}
New Time: ${effectiveTime}
Consultation: ${consultationType || 'In-Person Consultation'}
${clinicAddress ? `Location: ${clinicAddress}\n` : ''}
Please contact ${clinicPhone || 'our reception desk'} if this time does not work for you.

Thank you,
${clinicName || 'ClinicOS'}`
}

export const getRescheduledAppointmentTemplate = getAppointmentRescheduledTemplate
export const sanitizePhoneNumber = (phone, defaultCountryCode) => sanitizeWhatsAppPhone(phone, defaultCountryCode).formatted

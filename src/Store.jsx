import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { seedData } from './data'
import {
  getBookingConfirmationTemplate,
  getAppointmentReminderTemplate,
  getAppointmentCancellationTemplate,
  getAppointmentRescheduledTemplate,
  sanitizeWhatsAppPhone,
} from './whatsapp'
import {
  interpolatePlaceholders,
  buildHtmlEmail,
  initialEmailTemplates,
  initialEmailNotifications,
} from './emails'
import { themes, getThemeById, DEFAULT_THEME_ID } from './themeConfig'

const StoreContext = createContext(null)
const STORAGE_KEY = 'clinicflow-demo-v1'
const SESSION_KEY = 'clinicos-user-session-v1'

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (!saved) return seedData
    const parsed = JSON.parse(saved)
    return {
      ...seedData,
      ...parsed,
      clinics: (parsed.clinics?.length ? parsed.clinics : seedData.clinics).map((c) => ({
        ...c,
        theme: c.theme || DEFAULT_THEME_ID,
        allowDoctorThemeCustomization: c.allowDoctorThemeCustomization !== false,
      })),
      prescriptions: parsed.prescriptions?.length ? parsed.prescriptions : seedData.prescriptions,
      medicalRecords: parsed.medicalRecords?.length ? parsed.medicalRecords : seedData.medicalRecords,
      patientInvoices: parsed.patientInvoices?.length ? parsed.patientInvoices : seedData.patientInvoices,
      patientNotifications: parsed.patientNotifications?.length ? parsed.patientNotifications : seedData.patientNotifications,
      patientAccounts: parsed.patientAccounts?.length ? parsed.patientAccounts : seedData.patientAccounts,
      receptionistAccounts: parsed.receptionistAccounts?.length ? parsed.receptionistAccounts : seedData.receptionistAccounts,
      doctorAccounts: parsed.doctorAccounts?.length ? parsed.doctorAccounts : seedData.doctorAccounts,
      doctorNotifications: parsed.doctorNotifications?.length ? parsed.doctorNotifications : seedData.doctorNotifications,
      receptionistNotifications: parsed.receptionistNotifications?.length ? parsed.receptionistNotifications : seedData.receptionistNotifications,
      whatsappMessages: parsed.whatsappMessages?.length ? parsed.whatsappMessages : seedData.whatsappMessages,
      pharmacies: parsed.pharmacies?.length ? parsed.pharmacies : seedData.pharmacies,
      medicineOrders: parsed.medicineOrders?.length ? parsed.medicineOrders : seedData.medicineOrders,
      patientUploadedPrescriptions: parsed.patientUploadedPrescriptions?.length ? parsed.patientUploadedPrescriptions : seedData.patientUploadedPrescriptions,
      emailTemplates: parsed.emailTemplates?.length ? parsed.emailTemplates : seedData.emailTemplates,
      emailNotifications: parsed.emailNotifications?.length ? parsed.emailNotifications : seedData.emailNotifications,
      diseaseCategories: parsed.diseaseCategories?.length ? parsed.diseaseCategories : seedData.diseaseCategories,
      articles: parsed.articles?.length ? parsed.articles : seedData.articles,
    }
  } catch (error) {
    console.error('Unable to load saved demo data:', error)
    return seedData
  }
}

function loadSession() {
  try {
    const saved = localStorage.getItem(SESSION_KEY)
    return saved ? JSON.parse(saved) : null
  } catch (error) {
    console.error('Unable to load user session:', error)
    return null
  }
}

export function AppProvider({ children }) {
  const [data, setData] = useState(loadState)
  const [currentUser, setCurrentUser] = useState(loadSession)
  const [toast, setToast] = useState('')
  const [previewThemeId, setPreviewThemeId] = useState(null)
  const activeClinic = data.clinics.find((clinic) => clinic.id === data.activeClinicId) || data.clinics[0]

  const setClinicTheme = (clinicId, themeId) => {
    const themeObj = getThemeById(themeId)
    setData((current) => ({
      ...current,
      clinics: current.clinics.map((clinic) =>
        clinic.id === clinicId ? { ...clinic, theme: themeId } : clinic
      ),
    }))
    setPreviewThemeId(null)
    const targetClinic = data.clinics.find((c) => c.id === clinicId) || activeClinic
    notify(`${themeObj.name} theme applied successfully across ${targetClinic.name}.`)
  }

  const resetClinicTheme = (clinicId) => {
    setData((current) => ({
      ...current,
      clinics: current.clinics.map((clinic) =>
        clinic.id === clinicId ? { ...clinic, theme: DEFAULT_THEME_ID } : clinic
      ),
    }))
    setPreviewThemeId(null)
    notify('Theme reset to default Medical Blue.')
  }

  const setDoctorThemePermission = (clinicId, allow) => {
    setData((current) => ({
      ...current,
      clinics: current.clinics.map((clinic) =>
        clinic.id === clinicId ? { ...clinic, allowDoctorThemeCustomization: allow } : clinic
      ),
    }))
    notify(
      allow
        ? 'Doctor theme customization enabled for this clinic.'
        : 'Doctor theme customization restricted to Clinic Administrators.'
    )
  }

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  }, [data])

  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(SESSION_KEY, JSON.stringify(currentUser))
    } else {
      localStorage.removeItem(SESSION_KEY)
    }
  }, [currentUser])

  useEffect(() => {
    if (!toast) return undefined
    const timer = window.setTimeout(() => setToast(''), 3500)
    return () => window.clearTimeout(timer)
  }, [toast])

  const notify = (msg) => setToast(msg)

  // Auth functions
  const loginUser = (user) => {
    setCurrentUser(user)
    notify(`Signed in as ${user.name}`)
    return user
  }

  const logoutUser = () => {
    setCurrentUser(null)
    notify('Signed out successfully')
  }

  const loginDemoPatient = () => {
    const patientAccount = data.patientAccounts?.[0] || {
      id: 'pt-acc-1',
      patientId: 'p1',
      name: 'Emma Wilson',
      email: 'emma.wilson@email.com',
      phone: '(415) 555-0123',
      clinicId: 'sunrise',
      role: 'patient',
      dob: '1992-04-15',
      gender: 'Female',
      address: '742 Evergreen Terrace, San Francisco, CA',
      emergencyContact: 'Mark Wilson · (415) 555-0199',
    }
    setCurrentUser(patientAccount)
    notify(`Entered Patient Demo as ${patientAccount.name}`)
    return patientAccount
  }

  const loginDemoReceptionist = () => {
    const receptionist = data.receptionistAccounts?.[0] || {
      id: 'rec-acc-1',
      staffId: 's4',
      name: 'Ava Robinson',
      email: 'ava@sunrisefamily.com',
      phone: '+1 (415) 555-0184',
      role: 'receptionist',
      clinicId: 'sunrise',
      clinicName: 'Sunrise Family Clinic',
      shift: 'Monday – Friday · 08:00 AM – 04:30 PM',
    }
    setCurrentUser(receptionist)
    notify(`Entered Receptionist Demo as ${receptionist.name}`)
    return receptionist
  }

  const loginDemoDoctor = () => {
    const doctor = data.doctorAccounts?.[0] || {
      id: 'doc-acc-1',
      staffId: 's1',
      name: 'Dr. Maya Patel',
      email: 'maya@sunrisefamily.com',
      phone: '+1 (415) 555-0184',
      role: 'clinic_admin',
      title: 'Doctor & Clinic Admin',
      clinicId: 'sunrise',
      clinicName: 'Sunrise Family Clinic',
      specialty: 'Family Medicine',
    }
    const docAdmin = {
      ...doctor,
      role: 'clinic_admin',
      title: 'Doctor & Clinic Admin',
    }
    setCurrentUser(docAdmin)
    notify(`Entered Doctor (Clinic Admin) Demo as ${docAdmin.name}`)
    return docAdmin
  }

  const loginDemoDoctorAdmin = loginDemoDoctor
  const loginDemoClinicAdmin = loginDemoDoctor

  // Patient Registration with duplicate prevention & account linking
  const registerPatientAccount = ({ name, email, phone, dob, password, clinicId = 'sunrise', gender = 'Prefer not to say', address = '' }) => {
    const cleanEmail = email.trim().toLowerCase()
    const cleanPhone = phone.trim()

    // 1. Check if patient already has a login account
    const existingAccount = data.patientAccounts?.find((acc) => acc.email.toLowerCase() === cleanEmail)
    if (existingAccount) {
      return { success: false, error: 'An account with this email address already exists. Please sign in instead.' }
    }

    // 2. Check if a clinic has already registered this patient (Account Linking / Identity Verification)
    let linkedClinicId = clinicId
    let linkedPatientId = null
    let linkedClinicName = ''
    let isLinked = false

    for (const clinic of data.clinics) {
      const match = clinic.patients.find(
        (p) => (p.email && p.email.toLowerCase() === cleanEmail) || (p.phone && p.phone.replace(/\D/g, '') === cleanPhone.replace(/\D/g, ''))
      )
      if (match) {
        linkedClinicId = clinic.id
        linkedPatientId = match.id
        linkedClinicName = clinic.name
        isLinked = true
        break
      }
    }

    // 3. If no existing patient record in any clinic, create a new one in the target clinic
    if (!linkedPatientId) {
      linkedPatientId = `p${Date.now()}`
      const newClinicPatient = {
        id: linkedPatientId,
        name: name.trim(),
        email: cleanEmail,
        phone: cleanPhone,
        dob: dob || '',
        age: dob ? Math.max(1, new Date().getFullYear() - new Date(dob).getFullYear()) : 30,
        gender,
        status: 'Active',
        lastVisit: 'New patient',
        address: address || '',
      }

      setData((current) => ({
        ...current,
        clinics: current.clinics.map((clinic) =>
          clinic.id === linkedClinicId
            ? { ...clinic, patients: [newClinicPatient, ...clinic.patients] }
            : clinic
        ),
      }))
    }

    // 4. Create the patient account
    const newAccount = {
      id: `pt-acc-${Date.now()}`,
      patientId: linkedPatientId,
      name: name.trim(),
      email: cleanEmail,
      phone: cleanPhone,
      clinicId: linkedClinicId,
      role: 'patient',
      dob: dob || '',
      gender,
      address: address || '',
      joinedDate: new Date().toISOString().slice(0, 10),
    }

    // 5. Welcome notification
    const welcomeNotif = {
      id: `notif-${Date.now()}`,
      patientEmail: cleanEmail,
      type: 'account_created',
      title: 'Welcome to ClinicOS',
      message: isLinked
        ? `Your account was successfully linked to your existing clinical records at ${linkedClinicName}.`
        : 'Your patient portal is ready. You can now book appointments, view records, and pay invoices.',
      date: 'Just now',
      read: false,
      link: '/patient/dashboard',
    }

    // Automated Email Notification: Patient Account Welcome
    const welcomeEmail = createEmailRecord('patient_account_created', {
      recipientEmail: cleanEmail,
      recipientName: cleanName,
      userRole: 'patient',
      clinicId: linkedClinicId || activeClinic.id,
      clinicName: linkedClinicName || activeClinic.name,
      dynamicData: {
        name: cleanName,
        email: cleanEmail,
        clinic_name: linkedClinicName || activeClinic.name,
        login_link: '/login?portal=patient',
      },
    })

    setData((current) => ({
      ...current,
      patientAccounts: [newAccount, ...(current.patientAccounts || [])],
      patientNotifications: [welcomeNotif, ...(current.patientNotifications || [])],
      emailNotifications: [welcomeEmail, ...(current.emailNotifications || [])].filter(Boolean),
    }))

    setCurrentUser(newAccount)
    notify(isLinked ? `Account created and linked to your records at ${linkedClinicName}!` : 'Account created successfully! Welcome to ClinicOS.')
    return { success: true, linked: isLinked, clinicName: linkedClinicName, account: newAccount }
  }

  // =========================================================================
  // Centralized Email Notifications & Templates Management Engine
  // =========================================================================

  const createEmailRecord = (templateKey, {
    recipientEmail,
    recipientName,
    userRole,
    clinicId,
    clinicName,
    dynamicData = {},
    status = 'Sent',
  } = {}) => {
    const templates = data.emailTemplates || initialEmailTemplates
    const tmpl = templates.find((t) => t.key === templateKey) || templates[0]
    if (!tmpl) return null

    const isEnabled = tmpl.enabled !== false
    const finalStatus = !isEnabled ? 'Draft' : status

    const nowStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    const resolvedClinicName = clinicName || dynamicData.clinic_name || activeClinic?.name || 'ClinicOS Healthcare'
    const resolvedRecipientName = recipientName || dynamicData.name || dynamicData.patient_name || 'Valued User'
    const resolvedEmail = recipientEmail || dynamicData.email || 'user@example.com'

    const interpolatedSubject = interpolatePlaceholders(tmpl.subject, {
      ...dynamicData,
      clinic_name: resolvedClinicName,
      name: resolvedRecipientName,
      email: resolvedEmail,
      date: dynamicData.date || nowStr,
    })

    const interpolatedHeadline = interpolatePlaceholders(tmpl.headline || '', {
      ...dynamicData,
      clinic_name: resolvedClinicName,
      name: resolvedRecipientName,
    })

    const interpolatedBody = interpolatePlaceholders(tmpl.bodyText || '', {
      ...dynamicData,
      clinic_name: resolvedClinicName,
      name: resolvedRecipientName,
      email: resolvedEmail,
      date: dynamicData.date || nowStr,
    })

    const details = (tmpl.detailsTemplate || []).map((d) => ({
      label: d.label,
      value: dynamicData[d.key] !== undefined ? String(dynamicData[d.key]) : (dynamicData[d.label] !== undefined ? String(dynamicData[d.label]) : (d.value || 'N/A')),
    }))

    return {
      id: `em-log-${Date.now()}-${Math.floor(100 + Math.random() * 900)}`,
      templateId: tmpl.id,
      templateKey: tmpl.key,
      recipientName: resolvedRecipientName,
      recipientEmail: resolvedEmail,
      userRole: userRole || tmpl.role || 'patient',
      clinicId: clinicId || dynamicData.clinic_id || activeClinic?.id || '',
      clinicName: resolvedClinicName,
      subject: interpolatedSubject,
      headline: interpolatedHeadline,
      bodyText: interpolatedBody,
      details,
      actionText: tmpl.actionText || 'Open ClinicOS',
      actionUrl: tmpl.actionUrl || '/',
      status: finalStatus,
      event: tmpl.name,
      triggeredAt: nowStr,
      sentAt: finalStatus === 'Sent' ? nowStr : null,
      customHtml: null,
    }
  }

  const sendEmailNotification = ({
    templateKey,
    templateId,
    recipientEmail,
    recipientName,
    userRole,
    clinicId,
    clinicName,
    dynamicData = {},
    status = 'Sent',
  }) => {
    const templates = data.emailTemplates || initialEmailTemplates
    const tmpl = templates.find((t) => (templateKey ? t.key === templateKey : t.id === templateId)) || templates[0]
    if (!tmpl) return { success: false, error: 'Email template not found.' }

    const emailRecord = createEmailRecord(tmpl.key, {
      recipientEmail,
      recipientName,
      userRole,
      clinicId,
      clinicName,
      dynamicData,
      status,
    })

    if (!emailRecord) return { success: false, error: 'Could not create email record.' }

    setData((current) => ({
      ...current,
      emailNotifications: [emailRecord, ...(current.emailNotifications || [])],
    }))

    notify(`Notification "${emailRecord.subject}" queued & sent!`)
    return { success: true, email: emailRecord }
  }

  const addEmailTemplate = (templateData) => {
    const newId = `tmpl-${Date.now()}`
    const newTmpl = {
      id: newId,
      key: templateData.key || `custom_${Date.now()}`,
      name: templateData.name || 'Custom Email Template',
      category: templateData.category || 'SaaS Admin',
      role: templateData.role || 'patient',
      subject: templateData.subject || 'Notice from ClinicOS',
      preheader: templateData.preheader || '',
      headline: templateData.headline || templateData.name,
      bodyText: templateData.bodyText || '',
      placeholders: templateData.placeholders || ['{name}', '{clinic_name}', '{date}'],
      detailsTemplate: templateData.detailsTemplate || [],
      actionText: templateData.actionText || 'View Details',
      actionUrl: templateData.actionUrl || '/',
      enabled: templateData.enabled !== false,
      createdAt: new Date().toISOString().slice(0, 10),
    }

    setData((current) => ({
      ...current,
      emailTemplates: [newTmpl, ...(current.emailTemplates || [])],
    }))

    notify(`Template "${newTmpl.name}" created successfully!`)
    return { success: true, template: newTmpl }
  }

  const updateEmailTemplate = (id, updates) => {
    setData((current) => ({
      ...current,
      emailTemplates: (current.emailTemplates || []).map((t) => (t.id === id ? { ...t, ...updates } : t)),
    }))
    notify('Email template updated successfully!')
    return { success: true }
  }

  const toggleEmailTemplate = (id) => {
    let newStatus = true
    setData((current) => ({
      ...current,
      emailTemplates: (current.emailTemplates || []).map((t) => {
        if (t.id === id) {
          newStatus = !t.enabled
          return { ...t, enabled: newStatus }
        }
        return t
      }),
    }))
    notify(`Template ${newStatus ? 'enabled' : 'disabled'}.`)
    return { success: true, enabled: newStatus }
  }

  const deleteEmailTemplate = (id) => {
    setData((current) => ({
      ...current,
      emailTemplates: (current.emailTemplates || []).filter((t) => t.id !== id),
    }))
    notify('Email template removed.')
    return { success: true }
  }

  const updateEmailNotificationStatus = (id, newStatus) => {
    const nowStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    setData((current) => ({
      ...current,
      emailNotifications: (current.emailNotifications || []).map((em) =>
        em.id === id
          ? {
              ...em,
              status: newStatus,
              sentAt: newStatus === 'Sent' ? nowStr : em.sentAt,
            }
          : em
      ),
    }))
    notify(`Email status marked as "${newStatus}".`)
    return { success: true }
  }

  const resendEmailNotification = (id) => {
    const found = (data.emailNotifications || []).find((em) => em.id === id)
    if (!found) return { success: false, error: 'Email record not found.' }
    const nowStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    setData((current) => ({
      ...current,
      emailNotifications: (current.emailNotifications || []).map((em) =>
        em.id === id
          ? { ...em, status: 'Sent', sentAt: nowStr }
          : em
      ),
    }))
    notify(`Email re-sent to ${found.recipientEmail}!`)
    return { success: true }
  }

  // Patient Appointment Booking with Double-Booking Prevention
  const bookPatientAppointment = ({ clinicId, doctorId, doctorName, date, time, type, notes, fee }) => {
    const targetClinic = data.clinics.find((c) => c.id === clinicId)
    if (!targetClinic) return { success: false, error: 'Selected clinic was not found.' }

    // Double booking check: Check if doctor already has an active appointment at that date & time
    const isConflict = targetClinic.appointments.some((appt) => {
      const sameDoctor = appt.doctorId === doctorId || appt.doctor === doctorName
      const sameDate = appt.date === date || (date === new Date().toISOString().slice(0, 10) && appt.date === 'Today')
      const sameTime = appt.time.toLowerCase().replace(/\s+/g, '') === time.toLowerCase().replace(/\s+/g, '')
      const isActive = appt.status !== 'Cancelled'
      return sameDoctor && sameDate && sameTime && isActive
    })

    if (isConflict) {
      return { success: false, error: `${doctorName} is already booked at ${time} on ${date}. Please choose another time slot.` }
    }

    const apptId = `a${Date.now()}`
    const newAppointment = {
      id: apptId,
      patient: currentUser?.name || 'Emma Wilson',
      patientId: currentUser?.patientId || 'p1',
      patientEmail: currentUser?.email || 'emma.wilson@email.com',
      doctor: doctorName,
      doctorId,
      date,
      time,
      type: type || 'In-Clinic Consultation',
      status: 'Confirmed',
      notes: notes || '',
      fee: fee || 120,
    }

    const notif = {
      id: `notif-${Date.now()}`,
      patientEmail: currentUser?.email || 'emma.wilson@email.com',
      type: 'appointment_confirmed',
      title: 'Appointment Confirmed',
      message: `Your ${type || 'consultation'} with ${doctorName} on ${date} at ${time} at ${targetClinic.name} is confirmed.`,
      date: 'Just now',
      read: false,
      link: '/patient/appointments',
    }

    // Automated Email: Patient Appointment Confirmation
    const ptEmail = createEmailRecord('patient_appointment_confirmation', {
      recipientEmail: currentUser?.email || 'emma.wilson@email.com',
      recipientName: currentUser?.name || 'Emma Wilson',
      userRole: 'patient',
      clinicId,
      clinicName: targetClinic.name,
      dynamicData: {
        name: currentUser?.name || 'Emma Wilson',
        doctor_name: doctorName,
        clinic_name: targetClinic.name,
        clinic_address: targetClinic.address,
        date,
        time,
        consultation_type: type || 'In-Clinic Consultation',
        reference_code: newAppointment.id,
        fee: `₹${fee || 120}.00`,
      },
    })

    // Automated Email: Doctor Appointment Assigned
    const docEmail = createEmailRecord('doctor_appointment_assigned', {
      recipientEmail: targetClinic.staff.find((s) => s.id === doctorId)?.email || 'doctor@sunrisefamily.com',
      recipientName: doctorName,
      userRole: 'doctor',
      clinicId,
      clinicName: targetClinic.name,
      dynamicData: {
        name: doctorName,
        patient_name: currentUser?.name || 'Emma Wilson',
        date,
        time,
        consultation_type: type || 'In-Clinic Consultation',
        reason: notes || 'Booked online via patient portal',
        reference_code: newAppointment.id,
      },
    })

    setData((current) => ({
      ...current,
      clinics: current.clinics.map((c) =>
        c.id === clinicId
          ? { ...c, appointments: [newAppointment, ...c.appointments] }
          : c
      ),
      patientNotifications: [notif, ...(current.patientNotifications || [])],
      emailNotifications: [ptEmail, docEmail, ...(current.emailNotifications || [])].filter(Boolean),
    }))

    notify(`Appointment confirmed with ${doctorName} for ${date} at ${time}!`)
    return { success: true, appointment: newAppointment }
  }

  // Guest Appointment Booking from Home Page (No account required)
  const bookGuestAppointment = ({
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
  }) => {
    const targetClinic = data.clinics.find((c) => c.id === clinicId)
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

    // Double-booking conflict check: Check if doctor is already booked at that date and time
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

    // Check if patient already exists in this clinic by phone or email
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

    // Receptionist Notification
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

    // Patient Notification (if email provided)
    const newPatientNotifs = [...(data.patientNotifications || [])]
    if (cleanEmail) {
      newPatientNotifs.unshift({
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

    // Pre-filled WhatsApp confirmation message
    const waText = getBookingConfirmationTemplate({
      patientName: patientName.trim(),
      referenceCode,
      clinicName: targetClinic.name,
      clinicLocation: targetClinic.address,
      clinicPhone: targetClinic.phone,
      doctorName,
      consultationType: type || 'In-Person Consultation',
      date,
      time,
    })

    const waMsg = {
      id: `wa-msg-${Date.now()}`,
      clinicId: targetClinic.id,
      appointmentId: apptId,
      patientName: patientName.trim(),
      patientPhone: patientPhone.trim(),
      formattedPhone: sanitizeWhatsAppPhone(patientPhone.trim()).formatted,
      doctorName,
      referenceCode,
      type: 'Confirmation',
      status: 'Ready to Send',
      date,
      time,
      consultationType: type || 'In-Person Consultation',
      text: waText,
      createdAt: 'Just now',
      openedAt: null,
    }

    // Automated Emails for Guest Booking
    const ptEmail = cleanEmail
      ? createEmailRecord('patient_appointment_confirmation', {
          recipientEmail: cleanEmail,
          recipientName: patientName.trim(),
          userRole: 'patient',
          clinicId: targetClinic.id,
          clinicName: targetClinic.name,
          dynamicData: {
            name: patientName.trim(),
            doctor_name: doctorName,
            clinic_name: targetClinic.name,
            clinic_address: targetClinic.address,
            date,
            time,
            consultation_type: type || 'In-Person Consultation',
            reference_code: referenceCode,
            fee: `₹${fee || 120}.00`,
          },
        })
      : null

    const docEmail = createEmailRecord('doctor_appointment_assigned', {
      recipientEmail: targetClinic.staff?.find((s) => s.id === doctorId || s.name === doctorName)?.email || 'doctor@sunrisefamily.com',
      recipientName: doctorName,
      userRole: 'doctor',
      clinicId: targetClinic.id,
      clinicName: targetClinic.name,
      dynamicData: {
        name: doctorName,
        patient_name: patientName.trim(),
        date,
        time,
        consultation_type: type || 'In-Person Consultation',
        reason: notes || patientNotes || 'Guest booking from homepage',
        reference_code: referenceCode,
      },
    })

    const clinicEmail = createEmailRecord('clinic_appointment_booked', {
      recipientEmail: targetClinic.email || 'contact@sunrisefamily.com',
      recipientName: targetClinic.name,
      userRole: 'clinic_admin',
      clinicId: targetClinic.id,
      clinicName: targetClinic.name,
      dynamicData: {
        name: targetClinic.name,
        patient_name: patientName.trim(),
        doctor_name: doctorName,
        date,
        time,
        consultation_type: type || 'In-Person Consultation',
        reference_code: referenceCode,
      },
    })

    setData((current) => ({
      ...current,
      clinics: current.clinics.map((c) => {
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
      }),
      patientNotifications: newPatientNotifs,
      receptionistNotifications: [recNotif, ...(current.receptionistNotifications || [])],
      whatsappMessages: [waMsg, ...(current.whatsappMessages || [])],
      emailNotifications: [ptEmail, docEmail, clinicEmail, ...(current.emailNotifications || [])].filter(Boolean),
    }))

    notify(`Appointment confirmed! Booking Reference: ${referenceCode}`)
    return {
      success: true,
      appointment: newAppointment,
      referenceCode,
      clinic: targetClinic,
    }
  }

  // Cancel Appointment
  const cancelPatientAppointment = (appointmentId, reason = 'Cancelled by patient') => {
    let apptFound = null
    let clinicFound = null

    for (const c of data.clinics) {
      const match = c.appointments.find((a) => a.id === appointmentId)
      if (match) {
        apptFound = match
        clinicFound = c
        break
      }
    }

    if (!apptFound) return { success: false, error: 'Appointment not found.' }

    const notif = {
      id: `notif-${Date.now()}`,
      patientEmail: apptFound.patientEmail || currentUser?.email,
      type: 'appointment_cancelled',
      title: 'Appointment Cancelled',
      message: `Your appointment with ${apptFound.doctor} scheduled for ${apptFound.date} has been cancelled.`,
      date: 'Just now',
      read: false,
      link: '/patient/appointments',
    }

    const patientPhone = apptFound.patientPhone || clinicFound.patients.find((p) => p.id === apptFound.patientId)?.phone || ''
    const waText = getAppointmentCancellationTemplate({
      patientName: apptFound.patient,
      referenceCode: apptFound.confirmationCode || apptFound.id,
      clinicName: clinicFound.name,
      clinicPhone: clinicFound.phone,
      doctorName: apptFound.doctor,
      date: apptFound.date,
      time: apptFound.time,
      reason,
    })
    const waCancelMsg = {
      id: `wa-msg-${Date.now()}`,
      clinicId: clinicFound.id,
      appointmentId: apptFound.id,
      patientName: apptFound.patient,
      patientPhone,
      formattedPhone: sanitizeWhatsAppPhone(patientPhone).formatted,
      doctorName: apptFound.doctor,
      referenceCode: apptFound.confirmationCode || apptFound.id,
      type: 'Cancellation',
      status: 'Ready to Send',
      date: apptFound.date,
      time: apptFound.time,
      consultationType: apptFound.type,
      text: waText,
      createdAt: 'Just now',
      openedAt: null,
    }

    // Automated Emails: Cancellation
    const ptCancelEmail = apptFound.patientEmail
      ? createEmailRecord('patient_appointment_cancelled', {
          recipientEmail: apptFound.patientEmail,
          recipientName: apptFound.patient,
          userRole: 'patient',
          clinicId: clinicFound.id,
          clinicName: clinicFound.name,
          dynamicData: {
            name: apptFound.patient,
            doctor_name: apptFound.doctor,
            clinic_name: clinicFound.name,
            clinic_phone: clinicFound.phone,
            date: apptFound.date,
            time: apptFound.time,
            reason,
            reference_code: apptFound.confirmationCode || apptFound.id,
          },
        })
      : null

    const docCancelEmail = createEmailRecord('doctor_appointment_cancelled', {
      recipientEmail: clinicFound.staff?.find((s) => s.name === apptFound.doctor || s.id === apptFound.doctorId)?.email || 'doctor@clinic.com',
      recipientName: apptFound.doctor,
      userRole: 'doctor',
      clinicId: clinicFound.id,
      clinicName: clinicFound.name,
      dynamicData: {
        name: apptFound.doctor,
        patient_name: apptFound.patient,
        date: apptFound.date,
        time: apptFound.time,
        reason,
        reference_code: apptFound.confirmationCode || apptFound.id,
      },
    })

    const clinicCancelEmail = createEmailRecord('clinic_appointment_cancelled', {
      recipientEmail: clinicFound.email || 'contact@clinic.com',
      recipientName: clinicFound.name,
      userRole: 'clinic_admin',
      clinicId: clinicFound.id,
      clinicName: clinicFound.name,
      dynamicData: {
        name: clinicFound.name,
        patient_name: apptFound.patient,
        doctor_name: apptFound.doctor,
        date: apptFound.date,
        time: apptFound.time,
        reason,
        reference_code: apptFound.confirmationCode || apptFound.id,
      },
    })

    setData((current) => ({
      ...current,
      clinics: current.clinics.map((c) =>
        c.id === clinicFound.id
          ? {
              ...c,
              appointments: c.appointments.map((a) =>
                a.id === appointmentId ? { ...a, status: 'Cancelled', cancellationReason: reason } : a
              ),
            }
          : c
      ),
      patientNotifications: [notif, ...(current.patientNotifications || [])],
      whatsappMessages: [waCancelMsg, ...(current.whatsappMessages || [])],
      emailNotifications: [ptCancelEmail, docCancelEmail, clinicCancelEmail, ...(current.emailNotifications || [])].filter(Boolean),
    }))

    notify('Appointment has been cancelled.')
    return { success: true }
  }

  // Reschedule Appointment
  const reschedulePatientAppointment = (appointmentId, newDate, newTime) => {
    let apptFound = null
    let clinicFound = null

    for (const c of data.clinics) {
      const match = c.appointments.find((a) => a.id === appointmentId)
      if (match) {
        apptFound = match
        clinicFound = c
        break
      }
    }

    if (!apptFound) return { success: false, error: 'Appointment not found.' }

    // Double booking check for doctor
    const isConflict = clinicFound.appointments.some((appt) => {
      if (appt.id === appointmentId) return false
      const sameDoctor = appt.doctorId === apptFound.doctorId || appt.doctor === apptFound.doctor
      const sameDate = appt.date === newDate
      const sameTime = appt.time.toLowerCase().replace(/\s+/g, '') === newTime.toLowerCase().replace(/\s+/g, '')
      const isActive = appt.status !== 'Cancelled'
      return sameDoctor && sameDate && sameTime && isActive
    })

    if (isConflict) {
      return { success: false, error: `${apptFound.doctor} is already booked at ${newTime} on ${newDate}. Please choose another time.` }
    }

    const notif = {
      id: `notif-${Date.now()}`,
      patientEmail: apptFound.patientEmail || currentUser?.email,
      type: 'appointment_rescheduled',
      title: 'Appointment Rescheduled',
      message: `Your appointment with ${apptFound.doctor} has been rescheduled to ${newDate} at ${newTime}.`,
      date: 'Just now',
      read: false,
      link: '/patient/appointments',
    }

    const patientPhone = apptFound.patientPhone || clinicFound.patients.find((p) => p.id === apptFound.patientId)?.phone || ''
    const waText = getAppointmentRescheduledTemplate({
      patientName: apptFound.patient,
      referenceCode: apptFound.confirmationCode || apptFound.id,
      clinicName: clinicFound.name,
      clinicPhone: clinicFound.phone,
      clinicAddress: clinicFound.address,
      doctorName: apptFound.doctor,
      newDate,
      newTime,
      consultationType: apptFound.type,
    })
    const waRescheduleMsg = {
      id: `wa-msg-${Date.now()}`,
      clinicId: clinicFound.id,
      appointmentId: apptFound.id,
      patientName: apptFound.patient,
      patientPhone,
      formattedPhone: sanitizeWhatsAppPhone(patientPhone).formatted,
      doctorName: apptFound.doctor,
      referenceCode: apptFound.confirmationCode || apptFound.id,
      type: 'Rescheduled',
      status: 'Ready to Send',
      date: newDate,
      time: newTime,
      consultationType: apptFound.type,
      text: waText,
      createdAt: 'Just now',
      openedAt: null,
    }

    // Automated Emails: Rescheduled
    const ptReschedEmail = apptFound.patientEmail
      ? createEmailRecord('patient_appointment_rescheduled', {
          recipientEmail: apptFound.patientEmail,
          recipientName: apptFound.patient,
          userRole: 'patient',
          clinicId: clinicFound.id,
          clinicName: clinicFound.name,
          dynamicData: {
            name: apptFound.patient,
            doctor_name: apptFound.doctor,
            clinic_name: clinicFound.name,
            clinic_phone: clinicFound.phone,
            date: newDate,
            time: newTime,
            consultation_type: apptFound.type,
            reference_code: apptFound.confirmationCode || apptFound.id,
          },
        })
      : null

    const docReschedEmail = createEmailRecord('doctor_appointment_rescheduled', {
      recipientEmail: clinicFound.staff?.find((s) => s.name === apptFound.doctor || s.id === apptFound.doctorId)?.email || 'doctor@clinic.com',
      recipientName: apptFound.doctor,
      userRole: 'doctor',
      clinicId: clinicFound.id,
      clinicName: clinicFound.name,
      dynamicData: {
        name: apptFound.doctor,
        patient_name: apptFound.patient,
        date: newDate,
        time: newTime,
        consultation_type: apptFound.type,
        reference_code: apptFound.confirmationCode || apptFound.id,
      },
    })

    const clinicReschedEmail = createEmailRecord('clinic_appointment_rescheduled', {
      recipientEmail: clinicFound.email || 'contact@clinic.com',
      recipientName: clinicFound.name,
      userRole: 'clinic_admin',
      clinicId: clinicFound.id,
      clinicName: clinicFound.name,
      dynamicData: {
        name: clinicFound.name,
        patient_name: apptFound.patient,
        doctor_name: apptFound.doctor,
        date: newDate,
        time: newTime,
        consultation_type: apptFound.type,
        reference_code: apptFound.confirmationCode || apptFound.id,
      },
    })

    setData((current) => ({
      ...current,
      clinics: current.clinics.map((c) =>
        c.id === clinicFound.id
          ? {
              ...c,
              appointments: c.appointments.map((a) =>
                a.id === appointmentId ? { ...a, date: newDate, time: newTime, status: 'Confirmed' } : a
              ),
            }
          : c
      ),
      patientNotifications: [notif, ...(current.patientNotifications || [])],
      whatsappMessages: [waRescheduleMsg, ...(current.whatsappMessages || [])],
      emailNotifications: [ptReschedEmail, docReschedEmail, clinicReschedEmail, ...(current.emailNotifications || [])].filter(Boolean),
    }))

    notify(`Appointment rescheduled to ${newDate} at ${newTime}.`)
    return { success: true }
  }

  // Pay Patient Invoice
  const payPatientInvoice = (invoiceId, paymentMethod = 'Credit Card (ending •• 4242)') => {
    const invoice = data.patientInvoices?.find((inv) => inv.id === invoiceId)
    if (!invoice) return { success: false, error: 'Invoice not found.' }
    if (invoice.paymentStatus === 'Paid') return { success: false, error: 'Invoice is already paid.' }

    const paidAtStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    const txnId = `TXN-${Math.floor(100000 + Math.random() * 900000)}`

    const notif = {
      id: `notif-${Date.now()}`,
      patientEmail: invoice.patientEmail || currentUser?.email,
      type: 'payment_confirmed',
      title: 'Payment Received',
      message: `Payment of ₹${invoice.totalAmount}.00 for invoice ${invoice.id} was processed successfully. Receipt is available.`,
      date: 'Just now',
      read: false,
      link: '/patient/billing',
    }

    // Automated Emails: Payment Receipt
    const ptPayEmail = (invoice.patientEmail || currentUser?.email)
      ? createEmailRecord('patient_payment_receipt', {
          recipientEmail: invoice.patientEmail || currentUser?.email,
          recipientName: invoice.patientName || currentUser?.name || 'Valued Patient',
          userRole: 'patient',
          clinicId: invoice.clinicId,
          clinicName: invoice.clinicName,
          dynamicData: {
            name: invoice.patientName || currentUser?.name || 'Valued Patient',
            amount: `₹${invoice.totalAmount}.00`,
            date: paidAtStr,
            payment_method: paymentMethod,
            transaction_id: txnId,
            reference_code: invoice.id,
            clinic_name: invoice.clinicName || 'Clinic Care',
          },
        })
      : null

    const clinicPayEmail = createEmailRecord('clinic_payment_received', {
      recipientEmail: 'billing@clinic.com',
      recipientName: invoice.clinicName || 'Clinic Admin',
      userRole: 'clinic_admin',
      clinicId: invoice.clinicId,
      clinicName: invoice.clinicName,
      dynamicData: {
        name: invoice.clinicName || 'Clinic Admin',
        patient_name: invoice.patientName || 'Patient',
        amount: `₹${invoice.totalAmount}.00`,
        date: paidAtStr,
        transaction_id: txnId,
        invoice_number: invoice.id,
      },
    })

    setData((current) => ({
      ...current,
      patientInvoices: current.patientInvoices.map((inv) =>
        inv.id === invoiceId
          ? {
              ...inv,
              paymentStatus: 'Paid',
              amountPaid: inv.totalAmount,
              outstandingBalance: 0,
              paidAt: paidAtStr,
              paymentMethod,
              transactionId: txnId,
            }
          : inv
      ),
      patientNotifications: [notif, ...(current.patientNotifications || [])],
      emailNotifications: [ptPayEmail, clinicPayEmail, ...(current.emailNotifications || [])].filter(Boolean),
    }))

    notify(`Payment of ₹${invoice.totalAmount}.00 verified and completed!`)
    return { success: true, transactionId: txnId }
  }

  // Notification actions
  const markNotificationRead = (notifId) => {
    setData((current) => ({
      ...current,
      patientNotifications: (current.patientNotifications || []).map((n) =>
        n.id === notifId ? { ...n, read: true } : n
      ),
    }))
  }

  const markAllNotificationsRead = (patientEmail) => {
    setData((current) => ({
      ...current,
      patientNotifications: (current.patientNotifications || []).map((n) =>
        !patientEmail || n.patientEmail?.toLowerCase() === patientEmail.toLowerCase()
          ? { ...n, read: true }
          : n
      ),
    }))
    notify('All notifications marked as read.')
  }

  // Update Patient Profile
  const updatePatientProfile = (patch) => {
    if (!currentUser) return

    const updatedUser = { ...currentUser, ...patch }
    setCurrentUser(updatedUser)

    // Sync in patientAccounts
    setData((current) => ({
      ...current,
      patientAccounts: (current.patientAccounts || []).map((acc) =>
        acc.id === currentUser.id || acc.email?.toLowerCase() === currentUser.email?.toLowerCase()
          ? { ...acc, ...patch }
          : acc
      ),
      clinics: current.clinics.map((clinic) => ({
        ...clinic,
        patients: clinic.patients.map((p) =>
          p.id === currentUser.patientId || p.email?.toLowerCase() === currentUser.email?.toLowerCase()
            ? { ...p, ...patch, name: patch.name || p.name }
            : p
        ),
      })),
    }))

    notify('Patient profile updated successfully.')
  }

  // ==========================================
  // Receptionist Specific Actions
  // ==========================================

  // Check In Patient
  const checkInPatient = (appointmentId) => {
    const nowTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    let apptFound = null
    let targetClinic = null

    for (const clinic of data.clinics) {
      const match = clinic.appointments.find((a) => a.id === appointmentId)
      if (match) {
        apptFound = match
        targetClinic = clinic
        break
      }
    }

    if (!apptFound) return { success: false, error: 'Appointment not found' }

    const notif = {
      id: `rec-notif-${Date.now()}`,
      clinicId: targetClinic.id,
      type: 'check_in',
      title: 'Patient Checked In',
      message: `${apptFound.patient} has arrived and checked in for their ${apptFound.time} visit with ${apptFound.doctor}.`,
      date: 'Just now',
      read: false,
      link: '/receptionist/queue',
    }

    const docNotif = {
      id: `doc-notif-${Date.now()}`,
      clinicId: targetClinic.id,
      doctorId: apptFound.doctorId,
      doctorName: apptFound.doctor,
      type: 'check_in',
      title: 'Patient Arrived & Waiting',
      message: `${apptFound.patient} has checked in for the ${apptFound.time} consultation and is waiting in queue.`,
      date: 'Just now',
      read: false,
      link: '/clinic/appointments',
    }

    setData((current) => ({
      ...current,
      clinics: current.clinics.map((c) =>
        c.id === targetClinic.id
          ? {
              ...c,
              appointments: c.appointments.map((a) =>
                a.id === appointmentId
                  ? {
                      ...a,
                      status: 'Checked in',
                      checkedInAt: nowTime,
                      waitingSince: Date.now(),
                    }
                  : a
              ),
            }
          : c
      ),
      receptionistNotifications: [notif, ...(current.receptionistNotifications || [])],
      doctorNotifications: [docNotif, ...(current.doctorNotifications || [])],
    }))

    notify(`${apptFound.patient} checked in and added to waiting queue!`)
    return { success: true }
  }

  // Update Queue / Appointment Status (e.g. Waiting -> In Progress -> Completed / No-show)
  const updateAppointmentQueueStatus = (appointmentId, newStatus) => {
    let apptFound = null
    let targetClinic = null

    for (const clinic of data.clinics) {
      const match = clinic.appointments.find((a) => a.id === appointmentId)
      if (match) {
        apptFound = match
        targetClinic = clinic
        break
      }
    }

    if (!apptFound) return { success: false, error: 'Appointment not found' }

    setData((current) => ({
      ...current,
      clinics: current.clinics.map((c) =>
        c.id === targetClinic.id
          ? {
              ...c,
              appointments: c.appointments.map((a) =>
                a.id === appointmentId
                  ? {
                      ...a,
                      status: newStatus,
                      ...(newStatus === 'In Progress' ? { inProgressAt: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) } : {}),
                      ...(newStatus === 'Completed' ? { completedAt: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) } : {})
                    }
                  : a
              ),
            }
          : c
      ),
    }))

    notify(`Appointment status updated to "${newStatus}".`)
    return { success: true }
  }

  // Receptionist Register Patient
  const receptionistRegisterPatient = ({ name, email, phone, dob, gender, address, emergencyContact, clinicId }) => {
    const targetClinicId = clinicId || currentUser?.clinicId || activeClinic.id
    const cleanName = name.trim()
    const cleanEmail = email ? email.trim().toLowerCase() : ''
    const cleanPhone = phone.trim()

    const clinic = data.clinics.find((c) => c.id === targetClinicId) || activeClinic

    // Duplicate prevention check
    const isDuplicate = clinic.patients.some(
      (p) =>
        (cleanEmail && p.email && p.email.toLowerCase() === cleanEmail) ||
        (p.phone && p.phone.replace(/\D/g, '') === cleanPhone.replace(/\D/g, ''))
    )

    if (isDuplicate) {
      return { success: false, error: 'A patient with this email or mobile phone number already exists in this clinic.' }
    }

    const newPatientId = `p${Date.now()}`
    const age = dob ? Math.max(1, new Date().getFullYear() - new Date(dob).getFullYear()) : 30
    const newPatient = {
      id: newPatientId,
      name: cleanName,
      email: cleanEmail,
      phone: cleanPhone,
      dob: dob || '',
      age,
      gender: gender || 'Female',
      address: address || '',
      emergencyContact: emergencyContact || '',
      status: 'Active',
      lastVisit: 'New patient',
    }

    const notif = {
      id: `rec-notif-${Date.now()}`,
      clinicId: targetClinicId,
      type: 'patient_registered',
      title: 'New Patient Registered',
      message: `${cleanName} registered at front desk. Record ID: ${newPatientId}.`,
      date: 'Just now',
      read: false,
      link: '/receptionist/patients',
    }

    const recRegEmail = createEmailRecord('receptionist_patient_registered', {
      recipientEmail: currentUser?.email || 'reception@clinic.com',
      recipientName: currentUser?.name || 'Front Desk Staff',
      userRole: 'receptionist',
      clinicId: targetClinicId,
      clinicName: clinic.name,
      dynamicData: {
        name: currentUser?.name || 'Front Desk Staff',
        patient_name: cleanName,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        reference_code: newPatientId,
        clinic_name: clinic.name,
      },
    })

    const clinicPtCreatedEmail = createEmailRecord('clinic_patient_created', {
      recipientEmail: clinic.email || 'admin@clinic.com',
      recipientName: clinic.name,
      userRole: 'clinic_admin',
      clinicId: targetClinicId,
      clinicName: clinic.name,
      dynamicData: {
        name: clinic.name,
        patient_name: cleanName,
        email: cleanEmail || 'N/A',
        phone: cleanPhone,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      },
    })

    const ptWelcomeEmail = cleanEmail
      ? createEmailRecord('patient_account_created', {
          recipientEmail: cleanEmail,
          recipientName: cleanName,
          userRole: 'patient',
          clinicId: targetClinicId,
          clinicName: clinic.name,
          dynamicData: {
            name: cleanName,
            email: cleanEmail,
            clinic_name: clinic.name,
            login_link: '/login',
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          },
        })
      : null

    setData((current) => ({
      ...current,
      clinics: current.clinics.map((c) =>
        c.id === targetClinicId ? { ...c, patients: [newPatient, ...c.patients] } : c
      ),
      receptionistNotifications: [notif, ...(current.receptionistNotifications || [])],
      emailNotifications: [recRegEmail, clinicPtCreatedEmail, ptWelcomeEmail, ...(current.emailNotifications || [])].filter(Boolean),
    }))

    notify(`Patient ${cleanName} registered successfully!`)
    return { success: true, patient: newPatient }
  }

  // Receptionist Edit Patient
  const receptionistUpdatePatient = (patientId, patch, clinicId) => {
    const targetClinicId = clinicId || currentUser?.clinicId || activeClinic.id
    setData((current) => ({
      ...current,
      clinics: current.clinics.map((c) =>
        c.id === targetClinicId
          ? {
              ...c,
              patients: c.patients.map((p) => (p.id === patientId ? { ...p, ...patch } : p)),
            }
          : c
      ),
    }))
    notify('Patient details updated successfully.')
  }

  // Receptionist Book Appointment with Double-Booking check
  const receptionistBookAppointment = ({ patientId, patientName, patientEmail, doctorId, doctorName, date, time, type, fee, notes, clinicId }) => {
    const targetClinicId = clinicId || currentUser?.clinicId || activeClinic.id
    const targetClinic = data.clinics.find((c) => c.id === targetClinicId) || activeClinic

    // Double booking check: Check if doctor already has an active appointment at that date & time
    const isConflict = targetClinic.appointments.some((appt) => {
      const sameDoctor = appt.doctorId === doctorId || appt.doctor === doctorName
      const sameDate = appt.date === date || (date === new Date().toISOString().slice(0, 10) && appt.date === 'Today')
      const sameTime = appt.time.toLowerCase().replace(/\s+/g, '') === time.toLowerCase().replace(/\s+/g, '')
      const isActive = appt.status !== 'Cancelled' && appt.status !== 'No-show'
      return sameDoctor && sameDate && sameTime && isActive
    })

    if (isConflict) {
      return { success: false, error: `${doctorName} is already booked at ${time} on ${date}. Please select an alternate time slot.` }
    }

    const matchedPatient = targetClinic.patients.find((p) => p.id === patientId || p.name === patientName)
    const patientPhone = matchedPatient?.phone || ''

    const apptId = `a${Date.now()}`
    const newAppointment = {
      id: apptId,
      patient: patientName,
      patientId: patientId || 'p1',
      patientEmail: patientEmail || matchedPatient?.email || '',
      patientPhone,
      doctor: doctorName,
      doctorId,
      date,
      time,
      type: type || 'In-person Consultation',
      status: 'Confirmed',
      notes: notes || '',
      fee: fee || 120,
    }

    const waText = getBookingConfirmationTemplate({
      patientName,
      referenceCode: apptId,
      clinicName: targetClinic.name,
      clinicLocation: targetClinic.address,
      clinicPhone: targetClinic.phone,
      doctorName,
      consultationType: type || 'In-person Consultation',
      date,
      time,
    })

    const waMsg = {
      id: `wa-msg-${Date.now()}`,
      clinicId: targetClinicId,
      appointmentId: apptId,
      patientName,
      patientPhone,
      formattedPhone: sanitizeWhatsAppPhone(patientPhone).formatted,
      doctorName,
      referenceCode: apptId,
      type: 'Confirmation',
      status: 'Ready to Send',
      date,
      time,
      consultationType: type || 'In-person Consultation',
      text: waText,
      createdAt: 'Just now',
      openedAt: null,
    }

    const notif = {
      id: `rec-notif-${Date.now()}`,
      clinicId: targetClinicId,
      type: 'appointment_booked',
      title: 'Appointment Scheduled',
      message: `Front-desk scheduled ${patientName} with ${doctorName} on ${date} at ${time}.`,
      date: 'Just now',
      read: false,
      link: '/receptionist/appointments',
    }

    const ptEmail = newAppointment.patientEmail
      ? createEmailRecord('patient_appointment_confirmation', {
          recipientEmail: newAppointment.patientEmail,
          recipientName: patientName,
          userRole: 'patient',
          clinicId: targetClinicId,
          clinicName: targetClinic.name,
          dynamicData: {
            name: patientName,
            doctor_name: doctorName,
            clinic_name: targetClinic.name,
            clinic_address: targetClinic.address,
            date,
            time,
            consultation_type: type || 'In-person Consultation',
            reference_code: apptId,
            fee: `₹${fee || 120}.00`,
          },
        })
      : null

    const docEmail = createEmailRecord('doctor_appointment_assigned', {
      recipientEmail: targetClinic.staff?.find((s) => s.id === doctorId || s.name === doctorName)?.email || 'doctor@sunrisefamily.com',
      recipientName: doctorName,
      userRole: 'doctor',
      clinicId: targetClinicId,
      clinicName: targetClinic.name,
      dynamicData: {
        name: doctorName,
        patient_name: patientName,
        date,
        time,
        consultation_type: type || 'In-person Consultation',
        reason: notes || 'Front desk scheduling',
        reference_code: apptId,
      },
    })

    const recEmail = createEmailRecord('receptionist_appointment_booked', {
      recipientEmail: currentUser?.email || 'frontdesk@sunrisefamily.com',
      recipientName: currentUser?.name || 'Front Desk Staff',
      userRole: 'receptionist',
      clinicId: targetClinicId,
      clinicName: targetClinic.name,
      dynamicData: {
        name: currentUser?.name || 'Front Desk Staff',
        patient_name: patientName,
        doctor_name: doctorName,
        date,
        time,
        reference_code: apptId,
        clinic_name: targetClinic.name,
      },
    })

    const clinicEmail = createEmailRecord('clinic_appointment_booked', {
      recipientEmail: targetClinic.email || 'contact@sunrisefamily.com',
      recipientName: targetClinic.name,
      userRole: 'clinic_admin',
      clinicId: targetClinicId,
      clinicName: targetClinic.name,
      dynamicData: {
        name: targetClinic.name,
        patient_name: patientName,
        doctor_name: doctorName,
        date,
        time,
        consultation_type: type || 'In-person Consultation',
        reference_code: apptId,
      },
    })

    const docBookingNotif = {
      id: `doc-notif-${Date.now()}`,
      clinicId: targetClinicId,
      doctorId,
      doctorName,
      type: 'booking',
      title: 'New Appointment Booked',
      message: `${patientName} booked an appointment with ${doctorName} for ${date} at ${time}.`,
      date: 'Just now',
      read: false,
      link: '/clinic/appointments',
    }

    setData((current) => ({
      ...current,
      clinics: current.clinics.map((c) =>
        c.id === targetClinicId
          ? { ...c, appointments: [newAppointment, ...c.appointments] }
          : c
      ),
      receptionistNotifications: [notif, ...(current.receptionistNotifications || [])],
      doctorNotifications: [docBookingNotif, ...(current.doctorNotifications || [])],
      whatsappMessages: [waMsg, ...(current.whatsappMessages || [])],
      emailNotifications: [ptEmail, docEmail, recEmail, clinicEmail, ...(current.emailNotifications || [])].filter(Boolean),
    }))

    notify(`Appointment confirmed with ${doctorName} for ${date} at ${time}!`)
    return { success: true, appointment: newAppointment }
  }

  // Receptionist Create Invoice
  const receptionistCreateInvoice = ({ patientId, patientName, patientEmail, clinicId, items, discount = 0, tax = 0 }) => {
    const targetClinic = data.clinics.find((c) => c.id === (clinicId || currentUser?.clinicId || activeClinic.id)) || activeClinic
    const subtotal = items.reduce((sum, item) => sum + (Number(item.total) || (Number(item.quantity) * Number(item.unitPrice))), 0)
    const totalAmount = Math.max(0, subtotal - Number(discount) + Number(tax))
    const invoiceId = `INV-REC-${Date.now().toString().slice(-6)}`

    const newInvoice = {
      id: invoiceId,
      clinicId: targetClinic.id,
      clinicName: targetClinic.name,
      patientId: patientId || 'p1',
      patientEmail: patientEmail || '',
      patientName,
      date: 'Today',
      dueDate: 'Nov 15, 2026',
      items,
      subtotal,
      discount: Number(discount),
      tax: Number(tax),
      totalAmount,
      amountPaid: 0,
      outstandingBalance: totalAmount,
      paymentStatus: 'Pending',
      paymentMethod: null,
      paidAt: null,
      transactionId: null,
    }

    const notif = {
      id: `rec-notif-${Date.now()}`,
      clinicId: targetClinic.id,
      type: 'invoice_generated',
      title: 'New Invoice Issued',
      message: `Invoice ${invoiceId} for ₹${totalAmount}.00 generated for ${patientName}.`,
      date: 'Just now',
      read: false,
      link: '/receptionist/billing',
    }

    setData((current) => ({
      ...current,
      patientInvoices: [newInvoice, ...(current.patientInvoices || [])],
      receptionistNotifications: [notif, ...(current.receptionistNotifications || [])],
    }))

    notify(`Invoice ${invoiceId} created for ${patientName}!`)
    return { success: true, invoice: newInvoice }
  }

  // Receptionist Record In-Person / Offline Payment
  const receptionistRecordPayment = (invoiceId, paymentMethod, amountPaid) => {
    const inv = (data.patientInvoices || []).find((i) => i.id === invoiceId)
    if (!inv) return { success: false, error: 'Invoice not found.' }

    const paidAmount = Number(amountPaid)
    if (isNaN(paidAmount) || paidAmount <= 0) {
      return { success: false, error: 'Please enter a valid positive payment amount.' }
    }

    const newAmountPaid = (inv.amountPaid || 0) + paidAmount
    const newBalance = Math.max(0, inv.totalAmount - newAmountPaid)
    const newStatus = newBalance === 0 ? 'Paid' : 'Partial'
    const txnId = `RCPT-${Math.floor(100000 + Math.random() * 900000)}`
    const paidDateStr = new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) + ' · ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })

    const notif = {
      id: `rec-notif-${Date.now()}`,
      clinicId: inv.clinicId,
      type: 'payment_recorded',
      title: 'Front-Desk Payment Recorded',
      message: `Recorded payment of ₹${paidAmount}.00 for ${inv.patientName} (${inv.id}). Method: ${paymentMethod}.`,
      date: 'Just now',
      read: false,
      link: '/receptionist/billing',
    }

    const ptPayEmail = inv.patientEmail
      ? createEmailRecord('patient_payment_receipt', {
          recipientEmail: inv.patientEmail,
          recipientName: inv.patientName,
          userRole: 'patient',
          clinicId: inv.clinicId,
          clinicName: inv.clinicName,
          dynamicData: {
            name: inv.patientName,
            amount: `₹${paidAmount}.00`,
            date: paidDateStr,
            payment_method: paymentMethod,
            transaction_id: txnId,
            reference_code: inv.id,
            clinic_name: inv.clinicName || 'Clinic Care',
          },
        })
      : null

    const recBillEmail = createEmailRecord('receptionist_billing_updated', {
      recipientEmail: currentUser?.email || 'frontdesk@clinic.com',
      recipientName: currentUser?.name || 'Front Desk Staff',
      userRole: 'receptionist',
      clinicId: inv.clinicId,
      clinicName: inv.clinicName,
      dynamicData: {
        name: currentUser?.name || 'Front Desk Staff',
        patient_name: inv.patientName,
        amount: `₹${paidAmount}.00`,
        invoice_number: inv.id,
        status: newStatus,
        date: paidDateStr,
      },
    })

    const clinicPayEmail = createEmailRecord('clinic_payment_received', {
      recipientEmail: 'admin@clinic.com',
      recipientName: inv.clinicName || 'Clinic Admin',
      userRole: 'clinic_admin',
      clinicId: inv.clinicId,
      clinicName: inv.clinicName,
      dynamicData: {
        name: inv.clinicName || 'Clinic Admin',
        patient_name: inv.patientName,
        amount: `₹${paidAmount}.00`,
        date: paidDateStr,
        transaction_id: txnId,
        invoice_number: inv.id,
      },
    })

    setData((current) => ({
      ...current,
      patientInvoices: current.patientInvoices.map((i) =>
        i.id === invoiceId
          ? {
              ...i,
              amountPaid: newAmountPaid,
              outstandingBalance: newBalance,
              paymentStatus: newStatus,
              paidAt: paidDateStr,
              paymentMethod,
              transactionId: txnId,
            }
          : i
      ),
      receptionistNotifications: [notif, ...(current.receptionistNotifications || [])],
      emailNotifications: [ptPayEmail, recBillEmail, clinicPayEmail, ...(current.emailNotifications || [])].filter(Boolean),
    }))

    notify(`Payment of ₹${paidAmount}.00 recorded. Receipt: ${txnId}`)
    return { success: true, transactionId: txnId }
  }

  // Receptionist Notifications Actions
  const markReceptionistNotificationRead = (notifId) => {
    setData((current) => ({
      ...current,
      receptionistNotifications: (current.receptionistNotifications || []).map((n) =>
        n.id === notifId ? { ...n, read: true } : n
      ),
    }))
  }

  const markAllReceptionistNotificationsRead = () => {
    setData((current) => ({
      ...current,
      receptionistNotifications: (current.receptionistNotifications || []).map((n) => ({ ...n, read: true })),
    }))
    notify('All front-desk notifications marked as read.')
  }

  // Doctor Notifications
  const markDoctorNotificationRead = (notifId) => {
    setData((current) => ({
      ...current,
      doctorNotifications: (current.doctorNotifications || []).map((n) =>
        n.id === notifId ? { ...n, read: true } : n
      ),
    }))
  }

  const markAllDoctorNotificationsRead = () => {
    setData((current) => ({
      ...current,
      doctorNotifications: (current.doctorNotifications || []).map((n) => ({ ...n, read: true })),
    }))
    notify('All doctor notifications marked as read.')
  }

  // Update Receptionist Profile
  const updateReceptionistProfile = (patch) => {
    if (!currentUser) return
    const updatedUser = { ...currentUser, ...patch }
    setCurrentUser(updatedUser)

    setData((current) => ({
      ...current,
      receptionistAccounts: (current.receptionistAccounts || []).map((acc) =>
        acc.id === currentUser.id ? { ...acc, ...patch } : acc
      ),
    }))
    notify('Receptionist profile updated successfully.')
  }

  // ==========================================
  // Doctor & Clinic Admin Consultation Actions
  // ==========================================
  const attendPatientConsultation = ({
    appointmentId,
    patientId,
    patientName,
    patientEmail,
    diagnosis,
    notes,
    vitals = {},
    medications = [],
    instructions = '',
    followUp = '',
    authorizedForPatient = true,
  }) => {
    const targetClinic = activeClinic
    let apptFound = null

    setData((current) => {
      const updatedClinics = current.clinics.map((clinic) => {
        if (clinic.id === targetClinic.id) {
          const updatedAppointments = clinic.appointments.map((apt) => {
            if (apt.id === appointmentId) {
              apptFound = {
                ...apt,
                status: 'Completed',
                completedAt: new Date().toISOString(),
                attendedBy: currentUser?.name || clinic.owner || 'Dr. Maya Patel',
                clinicalNotes: notes,
                diagnosis,
              }
              return apptFound
            }
            return apt
          })
          return { ...clinic, appointments: updatedAppointments }
        }
        return clinic
      })

      const doctorName = currentUser?.name || targetClinic.owner || 'Dr. Maya Patel'
      const doctorRole = currentUser?.specialty || 'Family Medicine & Attending Physician'
      const pName = patientName || apptFound?.patient || 'Patient'
      const pEmail = patientEmail || apptFound?.patientEmail || ''
      const pId = patientId || apptFound?.patientId || 'p1'

      // New Medical Record
      const newRecord = {
        id: `rec-${Date.now()}`,
        clinicId: targetClinic.id,
        clinicName: targetClinic.name,
        patientId: pId,
        patientEmail: pEmail,
        patientName: pName,
        date: 'Today',
        doctor: doctorName,
        doctorRole,
        type: 'Consultation Note',
        title: diagnosis || 'Clinical Consultation',
        summary: notes || 'Clinical consultation conducted. Vitals recorded and patient advised.',
        vitals: {
          bp: vitals.bp || '120/80 mmHg',
          heartRate: vitals.heartRate || '74 bpm',
          temp: vitals.temp || '98.6°F',
          weight: vitals.weight || '68 kg',
          spo2: vitals.spo2 || '99%',
        },
        allergies: [],
        immunizations: [],
        labResults: [],
        authorizedForPatient: !!authorizedForPatient,
      }

      // New Prescription if medications prescribed
      const newPrescriptions = [...(current.prescriptions || [])]
      if (medications && medications.length > 0) {
        const newRx = {
          id: `rx-${Date.now()}`,
          clinicId: targetClinic.id,
          clinicName: targetClinic.name,
          patientId: pId,
          patientEmail: pEmail,
          patientName: pName,
          doctor: doctorName,
          doctorRole,
          date: 'Today',
          diagnosis: diagnosis || 'Consultation assessment',
          medications: medications.map((m) => ({
            name: m.name,
            dosage: m.dosage || 'Standard dose',
            form: m.form || 'Tablet',
            frequency: m.frequency || 'Once daily',
            duration: m.duration || '7 days',
            instructions: m.instructions || 'Take as directed by doctor.',
          })),
          instructions: instructions || followUp || 'Take medications as prescribed. Contact clinic if symptoms persist.',
          refills: 1,
          status: 'Active',
          authorizedForPatient: !!authorizedForPatient,
        }
        newPrescriptions.unshift(newRx)
      }

      // Patient Notification
      const newPatientNotifs = [...(current.patientNotifications || [])]
      if (pEmail) {
        newPatientNotifs.unshift({
          id: `notif-${Date.now()}`,
          patientEmail: pEmail,
          clinicId: targetClinic.id,
          type: 'prescription',
          title: 'Consultation Summary & Prescription Available',
          message: `${doctorName} completed your visit for "${diagnosis || 'Consultation'}". Consultation summary and prescription are now available.`,
          date: 'Just now',
          read: false,
          link: '/patient/prescriptions',
        })
      }

      // Receptionist Notification
      const newRecNotifs = [...(current.receptionistNotifications || [])]
      newRecNotifs.unshift({
        id: `rec-notif-${Date.now()}`,
        clinicId: targetClinic.id,
        type: 'appointment_update',
        title: 'Consultation Completed',
        message: `${doctorName} completed attending ${pName}. Patient is ready for checkout / billing.`,
        date: 'Just now',
        read: false,
        link: '/receptionist/queue',
      })

      // Doctor Notification
      const newDocNotifs = [...(current.doctorNotifications || [])]
      newDocNotifs.unshift({
        id: `doc-notif-${Date.now()}`,
        clinicId: targetClinic.id,
        type: 'consultation',
        title: 'Consultation Completed',
        message: `Consultation completed for ${pName} ("${diagnosis || 'Clinical Consultation'}"). Medical record and prescription saved.`,
        date: 'Just now',
        read: false,
        link: '/clinic/notes',
      })

      // Automated Email: Patient Prescription Available
      let rxEmail = null
      if (pEmail && medications && medications.length > 0) {
        rxEmail = createEmailRecord('patient_prescription_available', {
          recipientEmail: pEmail,
          recipientName: pName,
          userRole: 'patient',
          clinicId: targetClinic.id,
          clinicName: targetClinic.name,
          dynamicData: {
            name: pName,
            doctor_name: doctorName,
            clinic_name: targetClinic.name,
            medications_count: String(medications.length),
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            instructions: instructions || followUp || 'Take medications as prescribed.',
          },
        })
      }

      return {
        ...current,
        clinics: updatedClinics,
        medicalRecords: [newRecord, ...(current.medicalRecords || [])],
        prescriptions: newPrescriptions,
        patientNotifications: newPatientNotifs,
        receptionistNotifications: newRecNotifs,
        doctorNotifications: newDocNotifs,
        emailNotifications: [rxEmail, ...(current.emailNotifications || [])].filter(Boolean),
      }
    })

    notify(`Consultation completed for ${patientName || 'patient'}! Records and prescriptions updated.`)
    return { success: true }
  }

  // ==========================================
  // WhatsApp Message Tracking Actions
  // ==========================================
  const recordWhatsAppMessage = ({
    clinicId,
    appointmentId,
    patientName,
    patientPhone,
    doctorName,
    doctorSpecialty,
    referenceCode,
    type = 'Confirmation',
    status = 'Ready to Send',
    date,
    time,
    consultationType,
    text,
  }) => {
    const cleanPhone = sanitizeWhatsAppPhone(patientPhone)
    const newMsg = {
      id: `wa-msg-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      clinicId: clinicId || activeClinic.id,
      appointmentId: appointmentId || '',
      patientName: patientName || 'Patient',
      patientPhone: patientPhone || '',
      formattedPhone: cleanPhone.formatted || '',
      doctorName: doctorName || 'Attending Physician',
      doctorSpecialty: doctorSpecialty || '',
      referenceCode: referenceCode || `CONF-${Math.floor(100000 + Math.random() * 900000)}`,
      type: type || 'General',
      status: status || 'Ready to Send',
      date: date || 'Today',
      time: time || 'Scheduled Time',
      consultationType: consultationType || 'In-Person',
      text: text || '',
      createdAt: 'Just now',
      openedAt: status === 'Opened in WhatsApp' ? 'Just now' : null,
    }

    setData((current) => ({
      ...current,
      whatsappMessages: [newMsg, ...(current.whatsappMessages || [])],
    }))

    return newMsg
  }

  const updateWhatsAppMessage = (id, updates) => {
    setData((current) => ({
      ...current,
      whatsappMessages: (current.whatsappMessages || []).map((msg) =>
        msg.id === id ? { ...msg, ...updates } : msg
      ),
    }))
  }

  const markWhatsAppMessageOpened = (id) => {
    setData((current) => ({
      ...current,
      whatsappMessages: (current.whatsappMessages || []).map((msg) =>
        msg.id === id
          ? {
              ...msg,
              status: 'Opened in WhatsApp',
              openedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            }
          : msg
      ),
    }))
  }

  const deleteWhatsAppMessage = (id) => {
    setData((current) => ({
      ...current,
      whatsappMessages: (current.whatsappMessages || []).filter((msg) => msg.id !== id),
    }))
    notify('Message record deleted')
  }

  // ==========================================
  // Medicine Store & Pharmacy Ordering Actions
  // ==========================================
  const placeMedicineOrder = ({
    pharmacyId,
    items,
    deliveryAddress,
    contactPhone,
    paymentMethod = 'Online Payment',
    prescriptionId,
    prescriptionDiagnosis,
    doctorName,
  }) => {
    if (!items || items.length === 0) {
      return { success: false, error: 'Your medicine cart is empty.' }
    }
    if (!deliveryAddress || !deliveryAddress.trim()) {
      return { success: false, error: 'Please enter a valid home delivery address.' }
    }

    const pharmacy = (data.pharmacies || []).find((p) => p.id === pharmacyId) || (data.pharmacies || [])[0]
    if (!pharmacy) {
      return { success: false, error: 'Selected pharmacy is unavailable.' }
    }

    // Verify prescription requirement: if any cart item requires prescription, a prescription must be provided
    const hasRxItem = items.some((item) => item.requiresPrescription)
    if (hasRxItem && !prescriptionId) {
      return {
        success: false,
        error: 'One or more items require a doctor prescription. Please select an eligible prescription or upload one to proceed.',
      }
    }

    const subtotal = items.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)
    const deliveryCharge = subtotal >= (pharmacy.freeDeliveryThreshold || 35) ? 0 : (pharmacy.deliveryCharge || 3.5)
    const discount = subtotal >= 50 ? 5 : 0
    const totalAmount = Number((subtotal + deliveryCharge - discount).toFixed(2))

    const orderId = `ORD-MED-${Math.floor(100000 + Math.random() * 900000)}`
    const nowTime = 'Just now'

    const newOrder = {
      id: orderId,
      clinicId: pharmacy.clinicId || activeClinic.id,
      pharmacyId: pharmacy.id,
      pharmacyName: pharmacy.name,
      pharmacyPhone: pharmacy.phone,
      pharmacyAddress: pharmacy.address,
      patientId: currentUser?.patientId || 'p1',
      patientName: currentUser?.name || 'Emma Wilson',
      patientEmail: currentUser?.email || 'emma.wilson@email.com',
      patientPhone: contactPhone || currentUser?.phone || '(415) 555-0123',
      deliveryAddress: deliveryAddress.trim(),
      orderDate: nowTime,
      prescriptionId: prescriptionId || null,
      prescriptionDiagnosis: prescriptionDiagnosis || 'Doctor Authorized Medication',
      doctorName: doctorName || 'Attending Physician',
      prescriptionVerified: Boolean(prescriptionId),
      status: 'Order Placed',
      items,
      subtotal,
      deliveryCharge,
      discount,
      totalAmount,
      paymentMethod,
      paymentStatus: paymentMethod.toLowerCase().includes('cash') ? 'Pending (COD)' : 'Paid (Simulated)',
      estimatedDeliveryTime: pharmacy.estimatedDeliveryTime || '30–45 mins',
      trackingTimeline: [
        {
          status: 'Order Placed',
          timestamp: nowTime,
          note: prescriptionId
            ? `Order submitted with prescription ref ${prescriptionId}`
            : 'Order submitted for home delivery',
        },
      ],
    }

    // Deduct stock in pharmacy inventory
    const updatedPharmacies = (data.pharmacies || []).map((ph) => {
      if (ph.id === pharmacy.id) {
        return {
          ...ph,
          inventory: ph.inventory.map((inv) => {
            const orderedItem = items.find((it) => it.id === inv.id || it.medicineId === inv.id || it.name === inv.name)
            if (orderedItem) {
              const newCount = Math.max(0, inv.stockCount - orderedItem.quantity)
              return { ...inv, stockCount: newCount, inStock: newCount > 0 }
            }
            return inv
          }),
        }
      }
      return ph
    })

    // Patient notification
    const patientNotif = {
      id: `notif-${Date.now()}`,
      patientEmail: currentUser?.email || 'emma.wilson@email.com',
      type: 'medicine_order',
      title: 'Medicine Order Placed',
      message: `Your medicine order ${orderId} (₹${totalAmount}) has been placed with ${pharmacy.name}. Estimated delivery: ${pharmacy.estimatedDeliveryTime}.`,
      date: 'Just now',
      read: false,
      link: '/patient/medicine-store',
    }

    // Clinic notification
    const clinicNotif = {
      id: `rec-notif-${Date.now()}`,
      clinicId: pharmacy.clinicId || activeClinic.id,
      type: 'medicine_order',
      title: 'New Pharmacy Order Received',
      message: `Order ${orderId} from ${currentUser?.name || 'Patient'} (₹${totalAmount}) is awaiting preparation.`,
      date: 'Just now',
      read: false,
      link: '/clinic/pharmacy',
    }

    // WhatsApp Message
    const waText = `Hello ${newOrder.patientName}, your medicine order from ${pharmacy.name} has been placed!\n\nOrder Ref: ${orderId}\nTotal: ₹${totalAmount}\nDelivery to: ${deliveryAddress}\nEstimated Delivery: ${pharmacy.estimatedDeliveryTime}\nPayment: ${paymentMethod}\n\nTrack your delivery in the ClinicOS Medicine Store.`
    const waMsg = {
      id: `wa-msg-${Date.now()}`,
      clinicId: pharmacy.clinicId || activeClinic.id,
      patientName: newOrder.patientName,
      patientEmail: newOrder.patientEmail,
      patientPhone: newOrder.patientPhone,
      doctorName: doctorName || 'Pharmacy Dispenser',
      referenceCode: orderId,
      type: 'Medicine Order',
      status: 'Ready to Send',
      date: 'Today',
      time: 'Now',
      consultationType: 'Pharmacy Home Delivery',
      text: waText,
      createdAt: 'Just now',
      openedAt: null,
    }

    const medOrderEmail = createEmailRecord('patient_medicine_order_placed', {
      recipientEmail: newOrder.patientEmail,
      recipientName: newOrder.patientName,
      userRole: 'patient',
      clinicId: pharmacy.clinicId || activeClinic.id,
      clinicName: pharmacy.name,
      dynamicData: {
        name: newOrder.patientName,
        order_id: orderId,
        pharmacy_name: pharmacy.name,
        total_amount: `₹${totalAmount}`,
        delivery_address: deliveryAddress,
        estimated_delivery: pharmacy.estimatedDeliveryTime,
      },
    })

    setData((current) => ({
      ...current,
      pharmacies: updatedPharmacies,
      medicineOrders: [newOrder, ...(current.medicineOrders || [])],
      patientNotifications: [patientNotif, ...(current.patientNotifications || [])],
      receptionistNotifications: [clinicNotif, ...(current.receptionistNotifications || [])],
      whatsappMessages: [waMsg, ...(current.whatsappMessages || [])],
      emailNotifications: [medOrderEmail, ...(current.emailNotifications || [])].filter(Boolean),
    }))

    notify(`Medicine Order ${orderId} placed successfully!`)
    return { success: true, order: newOrder }
  }

  const updateMedicineOrderStatus = (orderId, newStatus, note = '') => {
    const validStatuses = [
      'Order Placed',
      'Pharmacy Accepted',
      'Preparing Order',
      'Out for Delivery',
      'Delivered',
      'Cancelled',
    ]
    if (!validStatuses.includes(newStatus)) {
      return { success: false, error: 'Invalid order status.' }
    }

    let updatedOrder = null
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

    setData((current) => {
      const orders = (current.medicineOrders || []).map((o) => {
        if (o.id === orderId) {
          const defaultNotes = {
            'Pharmacy Accepted': 'Pharmacy reviewed and accepted the prescription order.',
            'Preparing Order': 'Medicines are being picked, quality checked, and packaged.',
            'Out for Delivery': 'Delivery courier has picked up the package and is on the way.',
            'Delivered': 'Order was successfully handed over to the patient.',
            'Cancelled': note || 'Order was cancelled by the pharmacy or patient.',
          }
          const stepNote = note || defaultNotes[newStatus] || `Status updated to ${newStatus}`
          const newTimeline = [...(o.trackingTimeline || []), { status: newStatus, timestamp, note: stepNote }]
          updatedOrder = {
            ...o,
            status: newStatus,
            trackingTimeline: newTimeline,
            paymentStatus: newStatus === 'Delivered' && o.paymentStatus.includes('Pending') ? 'Paid (Cash Collected)' : o.paymentStatus,
          }
          return updatedOrder
        }
        return o
      })

      const statusNotif = updatedOrder
        ? [
            {
              id: `notif-${Date.now()}`,
              patientEmail: updatedOrder.patientEmail,
              type: 'medicine_order_status',
              title: `Medicine Order ${newStatus}`,
              message: `Your medicine order ${orderId} is now ${newStatus}. ${note || ''}`,
              date: 'Just now',
              read: false,
              link: '/patient/medicine-store',
            },
            ...(current.patientNotifications || []),
          ]
        : current.patientNotifications

      let statusEmail = null
      if (updatedOrder && updatedOrder.patientEmail) {
        if (newStatus === 'Pharmacy Accepted') {
          statusEmail = createEmailRecord('patient_medicine_order_accepted', {
            recipientEmail: updatedOrder.patientEmail,
            recipientName: updatedOrder.patientName,
            userRole: 'patient',
            clinicId: updatedOrder.clinicId,
            clinicName: updatedOrder.pharmacyName,
            dynamicData: {
              name: updatedOrder.patientName,
              order_id: updatedOrder.id,
              pharmacy_name: updatedOrder.pharmacyName,
              date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
              estimated_delivery: updatedOrder.estimatedDeliveryTime || '1–2 hours',
            },
          })
        } else if (newStatus === 'Out for Delivery') {
          statusEmail = createEmailRecord('patient_medicine_order_out_for_delivery', {
            recipientEmail: updatedOrder.patientEmail,
            recipientName: updatedOrder.patientName,
            userRole: 'patient',
            clinicId: updatedOrder.clinicId,
            clinicName: updatedOrder.pharmacyName,
            dynamicData: {
              name: updatedOrder.patientName,
              order_id: updatedOrder.id,
              pharmacy_name: updatedOrder.pharmacyName,
              delivery_address: updatedOrder.deliveryAddress,
              estimated_time: '30 minutes',
            },
          })
        } else if (newStatus === 'Delivered') {
          statusEmail = createEmailRecord('patient_medicine_order_delivered', {
            recipientEmail: updatedOrder.patientEmail,
            recipientName: updatedOrder.patientName,
            userRole: 'patient',
            clinicId: updatedOrder.clinicId,
            clinicName: updatedOrder.pharmacyName,
            dynamicData: {
              name: updatedOrder.patientName,
              order_id: updatedOrder.id,
              pharmacy_name: updatedOrder.pharmacyName,
              delivery_date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            },
          })
        }
      }

      return {
        ...current,
        medicineOrders: orders,
        patientNotifications: statusNotif,
        emailNotifications: [statusEmail, ...(current.emailNotifications || [])].filter(Boolean),
      }
    })

    notify(`Order ${orderId} marked as ${newStatus}`)
    return { success: true, order: updatedOrder }
  }

  const uploadPatientPrescription = ({
    doctorName,
    clinicName,
    diagnosis,
    medications,
    instructions,
    fileName,
  }) => {
    if (!medications || medications.length === 0) {
      return { success: false, error: 'Please enter at least one prescribed medicine.' }
    }

    const rxId = `RX-UP-${Math.floor(1000 + Math.random() * 9000)}`
    const newRx = {
      id: rxId,
      clinicId: activeClinic.id,
      clinicName: clinicName || activeClinic.name,
      patientId: currentUser?.patientId || 'p1',
      patientEmail: currentUser?.email || 'emma.wilson@email.com',
      patientName: currentUser?.name || 'Emma Wilson',
      doctor: doctorName || 'External Licensed Physician',
      doctorRole: 'External Physician / Uploaded Rx',
      date: 'Today',
      diagnosis: diagnosis || 'Patient Uploaded Prescription',
      medications,
      instructions: instructions || 'Take strictly as instructed by your prescribing doctor.',
      refills: 1,
      status: 'Active',
      authorizedForPatient: true,
      isUploaded: true,
      fileName: fileName || 'prescription-upload.pdf',
    }

    setData((current) => ({
      ...current,
      prescriptions: [newRx, ...(current.prescriptions || [])],
      patientUploadedPrescriptions: [newRx, ...(current.patientUploadedPrescriptions || [])],
    }))

    notify(`Prescription ${rxId} uploaded and added to your care profile!`)
    return { success: true, prescription: newRx }
  }

  const updatePharmacyProfile = (pharmacyId, updates) => {
    setData((current) => ({
      ...current,
      pharmacies: (current.pharmacies || []).map((p) =>
        p.id === pharmacyId ? { ...p, ...updates } : p
      ),
    }))
    notify('Pharmacy profile and delivery settings updated.')
    return { success: true }
  }

  const updateMedicineInventory = (pharmacyId, medicineId, updates) => {
    setData((current) => ({
      ...current,
      pharmacies: (current.pharmacies || []).map((p) => {
        if (p.id === pharmacyId) {
          return {
            ...p,
            inventory: p.inventory.map((m) =>
              m.id === medicineId ? { ...m, ...updates } : m
            ),
          }
        }
        return p
      }),
    }))
    notify('Medicine inventory updated.')
    return { success: true }
  }

  const addMedicineToInventory = (pharmacyId, newMedicine) => {
    const medId = `med-${Date.now()}`
    const medItem = {
      id: medId,
      name: newMedicine.name,
      dosage: newMedicine.dosage || 'Standard',
      form: newMedicine.form || 'Tablet',
      packageSize: newMedicine.packageSize || '1 Pack',
      unitPrice: Number(newMedicine.unitPrice || 10),
      inStock: newMedicine.inStock !== false,
      stockCount: Number(newMedicine.stockCount || 50),
      requiresPrescription: Boolean(newMedicine.requiresPrescription),
      category: newMedicine.category || 'General',
      description: newMedicine.description || '',
    }

    setData((current) => ({
      ...current,
      pharmacies: (current.pharmacies || []).map((p) =>
        p.id === pharmacyId
          ? { ...p, inventory: [medItem, ...p.inventory] }
          : p
      ),
    }))
    notify(`Added ${medItem.name} to pharmacy inventory.`)
    return { success: true, medicine: medItem }
  }

  // Place Prescription Upload Order (Choose medical store -> upload image/pdf -> medical store confirms & delivers)
  const placePrescriptionUploadOrder = ({
    pharmacyId,
    prescriptionFileName,
    prescriptionFileType = 'image',
    prescriptionFileData = null,
    prescriptionFileSize = null,
    patientNotes = '',
    deliveryAddress,
    contactPhone,
    paymentMethod = 'Cash on Delivery (COD)',
    estimatedTotal = 35.00,
    medicinesRequested = '',
  }) => {
    if (!deliveryAddress || !deliveryAddress.trim()) {
      return { success: false, error: 'Please enter a valid home delivery address.' }
    }
    if (!prescriptionFileName && !prescriptionFileData) {
      return { success: false, error: 'Please upload an image or PDF of your prescription.' }
    }

    const pharmacy =
      (data.pharmacies || []).find((p) => p.id === pharmacyId) ||
      (data.pharmacies || [])[0]
    if (!pharmacy) {
      return { success: false, error: 'Selected medical store is unavailable.' }
    }

    const orderId = `ORD-MED-${Math.floor(100000 + Math.random() * 900000)}`
    const nowTime = `Today · ${new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`
    const subtotal = Number(estimatedTotal) || 35.00
    const deliveryCharge = subtotal >= (pharmacy.freeDeliveryThreshold || 35) ? 0.00 : (pharmacy.deliveryCharge || 3.50)
    const discount = 0.00
    const totalAmount = Number((subtotal + deliveryCharge - discount).toFixed(2))

    // Determine type: 'pdf' or 'image'
    const isPdf =
      prescriptionFileType === 'pdf' ||
      prescriptionFileName?.toLowerCase().endsWith('.pdf') ||
      (typeof prescriptionFileData === 'string' && prescriptionFileData.startsWith('data:application/pdf'))
    const fileType = isPdf ? 'pdf' : 'image'

    const newOrder = {
      id: orderId,
      clinicId: pharmacy.clinicId || activeClinic.id,
      pharmacyId: pharmacy.id,
      pharmacyName: pharmacy.name,
      pharmacyPhone: pharmacy.phone,
      pharmacyAddress: pharmacy.address,
      patientId: currentUser?.patientId || 'p1',
      patientName: currentUser?.name || 'Emma Wilson',
      patientEmail: currentUser?.email || 'emma.wilson@email.com',
      patientPhone: contactPhone || currentUser?.phone || '(415) 555-0123',
      deliveryAddress: deliveryAddress.trim(),
      orderDate: nowTime,
      orderType: 'Prescription Upload',
      prescriptionFileName: prescriptionFileName || (isPdf ? 'doctor_rx.pdf' : 'prescription_scan.jpg'),
      prescriptionFileType: fileType,
      prescriptionFileData: prescriptionFileData || null,
      prescriptionFileSize: prescriptionFileSize || null,
      patientNotes: patientNotes ? patientNotes.trim() : '',
      prescriptionVerified: false,
      status: 'Order Placed',
      items: [
        {
          medicineId: `med-rx-upload-${Date.now()}`,
          name: medicinesRequested ? medicinesRequested.trim() : 'Prescribed Medicines as per Uploaded Rx',
          dosage: 'As per uploaded prescription',
          form: isPdf ? 'PDF Prescription' : 'Image Scan Prescription',
          packageSize: 'Full Prescribed Course',
          quantity: 1,
          unitPrice: subtotal,
          total: subtotal,
          requiresPrescription: true,
        },
      ],
      subtotal,
      deliveryCharge,
      discount,
      totalAmount,
      paymentMethod,
      paymentStatus: paymentMethod.toLowerCase().includes('cash') ? 'Pending (COD on Arrival)' : 'Paid (Simulated)',
      estimatedDeliveryTime: pharmacy.estimatedDeliveryTime || '30–45 mins upon store confirmation',
      trackingTimeline: [
        {
          status: 'Order Placed',
          timestamp: nowTime,
          note: `Prescription ${fileType.toUpperCase()} uploaded by patient. Awaiting medical store verification & confirmation.`,
        },
      ],
    }

    // Notifications
    const patientNotif = {
      id: `notif-${Date.now()}`,
      patientEmail: currentUser?.email || 'emma.wilson@email.com',
      type: 'medicine_order',
      title: 'Prescription Order Placed',
      message: `Prescription uploaded to ${pharmacy.name}. Order ${orderId} is awaiting medical store verification & confirmation before delivery.`,
      date: 'Just now',
      read: false,
      link: '/patient/medicine-store?tab=orders',
    }

    const clinicNotif = {
      id: `rec-notif-${Date.now()}`,
      clinicId: pharmacy.clinicId || activeClinic.id,
      type: 'medicine_order',
      title: 'New Prescription Verification Pending',
      message: `${newOrder.patientName} uploaded a prescription (${fileType.toUpperCase()}) for home delivery at ${pharmacy.name}. Please inspect and confirm.`,
      date: 'Just now',
      read: false,
      link: '/clinic/pharmacy',
    }

    const waText = `Hello ${newOrder.patientName}, your prescription has been submitted to ${pharmacy.name} for home delivery!\n\nOrder Ref: ${orderId}\nAttached File: ${newOrder.prescriptionFileName}\nDelivery Address: ${deliveryAddress}\nPayment: ${paymentMethod}\nStatus: Awaiting Medical Store Verification\n\nThe medical store will verify your prescription and confirm delivery shortly.`
    const waMsg = {
      id: `wa-msg-${Date.now()}`,
      clinicId: pharmacy.clinicId || activeClinic.id,
      patientName: newOrder.patientName,
      patientEmail: newOrder.patientEmail,
      patientPhone: newOrder.patientPhone,
      doctorName: 'Medical Store Pharmacist',
      referenceCode: orderId,
      type: 'Prescription Order',
      status: 'Ready to Send',
      date: 'Today',
      time: 'Now',
      consultationType: 'Prescription Home Delivery',
      text: waText,
      createdAt: 'Just now',
      openedAt: null,
    }

    const medOrderEmail = createEmailRecord('patient_medicine_order_placed', {
      recipientEmail: newOrder.patientEmail,
      recipientName: newOrder.patientName,
      userRole: 'patient',
      clinicId: pharmacy.clinicId || activeClinic.id,
      clinicName: pharmacy.name,
      dynamicData: {
        name: newOrder.patientName,
        order_id: orderId,
        pharmacy_name: pharmacy.name,
        total_amount: `₹${totalAmount}`,
        delivery_address: deliveryAddress,
        estimated_delivery: pharmacy.estimatedDeliveryTime || '30–45 mins upon store confirmation',
      },
    })

    setData((current) => ({
      ...current,
      medicineOrders: [newOrder, ...(current.medicineOrders || [])],
      patientNotifications: [patientNotif, ...(current.patientNotifications || [])],
      receptionistNotifications: [clinicNotif, ...(current.receptionistNotifications || [])],
      whatsappMessages: [waMsg, ...(current.whatsappMessages || [])],
      emailNotifications: [medOrderEmail, ...(current.emailNotifications || [])].filter(Boolean),
    }))

    notify(`Prescription submitted to ${pharmacy.name}! Awaiting medical store confirmation.`)
    return { success: true, order: newOrder }
  }

  // Medical store verifies uploaded prescription and confirms order for delivery
  const confirmPrescriptionOrderByStore = (orderId, note = '') => {
    let updatedOrder = null
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

    setData((current) => {
      const orders = (current.medicineOrders || []).map((o) => {
        if (o.id === orderId) {
          const defaultNote = 'Medical store verified prescription (Image/PDF). Order confirmed for delivery!'
          const stepNote = note || defaultNote
          const newTimeline = [
            ...(o.trackingTimeline || []),
            { status: 'Pharmacy Accepted', timestamp, note: stepNote },
          ]
          updatedOrder = {
            ...o,
            prescriptionVerified: true,
            status: 'Pharmacy Accepted',
            verifiedBy: currentUser?.name || 'Licensed Pharmacist',
            verifiedAt: timestamp,
            trackingTimeline: newTimeline,
          }
          return updatedOrder
        }
        return o
      })

      const statusNotif = updatedOrder
        ? [
            {
              id: `notif-${Date.now()}`,
              patientEmail: updatedOrder.patientEmail,
              type: 'prescription_verified',
              title: 'Prescription Verified & Order Confirmed! 🎉',
              message: `${updatedOrder.pharmacyName} verified your prescription for order ${orderId}. Your medicines are now confirmed for preparation & home delivery!`,
              date: 'Just now',
              read: false,
              link: '/patient/medicine-store?tab=orders',
            },
            ...(current.patientNotifications || []),
          ]
        : current.patientNotifications

      let confirmedEmail = null
      if (updatedOrder && updatedOrder.patientEmail) {
        confirmedEmail = createEmailRecord('patient_medicine_order_accepted', {
          recipientEmail: updatedOrder.patientEmail,
          recipientName: updatedOrder.patientName,
          userRole: 'patient',
          clinicId: updatedOrder.clinicId,
          clinicName: updatedOrder.pharmacyName,
          dynamicData: {
            name: updatedOrder.patientName,
            order_id: updatedOrder.id,
            pharmacy_name: updatedOrder.pharmacyName,
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            estimated_delivery: updatedOrder.estimatedDeliveryTime || '30–45 mins',
          },
        })
      }

      return {
        ...current,
        medicineOrders: orders,
        patientNotifications: statusNotif,
        emailNotifications: [confirmedEmail, ...(current.emailNotifications || [])].filter(Boolean),
      }
    })

    if (!updatedOrder) {
      return { success: false, error: 'Order not found.' }
    }

    notify(`Prescription verified! Order ${orderId} confirmed for delivery.`)
    return { success: true, order: updatedOrder }
  }

  // =========================================================================
  // Disease Awareness & Health Library Management
  // =========================================================================

  const addArticle = (articleInput) => {
    const isDoctor = currentUser?.role === 'doctor' && currentUser?.role !== 'clinic_admin'
    const newId = `art-${Date.now()}`
    const rawSlug = articleInput.slug || articleInput.title || 'disease-guide'
    const slug = rawSlug
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    const newArticle = {
      id: newId,
      slug,
      title: articleInput.title?.trim() || 'Untitled Disease Guide',
      category: articleInput.category || 'Lifestyle and Nutrition',
      shortDescription: articleInput.shortDescription?.trim() || '',
      readTime: articleInput.readTime || '5 min read',
      updatedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      author: articleInput.author || {
        name: currentUser?.name || 'Dr. Maya Patel',
        role: currentUser?.title || currentUser?.role || 'Attending Physician',
        initials: (currentUser?.name || 'Dr. Patel').split(' ').map((n) => n[0]).join('').slice(0, 2),
        clinicId: activeClinic?.id || 'sunrise',
      },
      reviewedBy: articleInput.reviewedBy || (isDoctor ? null : {
        name: activeClinic?.owner || 'Dr. Maya Patel',
        title: 'Clinic Medical Director, MD',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      }),
      status: articleInput.status || (isDoctor ? 'Under Review' : 'Published'),
      featured: Boolean(articleInput.featured),
      views: 0,
      diagramType: articleInput.diagramType || 'overview',
      commonSymptoms: Array.isArray(articleInput.commonSymptoms)
        ? articleInput.commonSymptoms
        : (articleInput.commonSymptoms || '').split(',').map((s) => s.trim()).filter(Boolean),
      preventionHighlights: Array.isArray(articleInput.preventionHighlights)
        ? articleInput.preventionHighlights
        : (articleInput.preventionHighlights || '').split('\n').map((s) => s.trim()).filter(Boolean),
      overview: articleInput.overview || '',
      causes: Array.isArray(articleInput.causes)
        ? articleInput.causes
        : (articleInput.causes || '').split('\n').map((s) => s.trim()).filter(Boolean),
      symptoms: articleInput.symptoms || { early: [], common: [], warningSigns: [] },
      riskFactors: Array.isArray(articleInput.riskFactors)
        ? articleInput.riskFactors
        : (articleInput.riskFactors || '').split('\n').map((s) => s.trim()).filter(Boolean),
      typesAndStages: articleInput.typesAndStages || [],
      diagnosis: articleInput.diagnosis || [],
      treatment: articleInput.treatment || [],
      prevention: Array.isArray(articleInput.prevention)
        ? articleInput.prevention
        : (articleInput.prevention || '').split('\n').map((s) => s.trim()).filter(Boolean),
      dietAndLifestyle: Array.isArray(articleInput.dietAndLifestyle)
        ? articleInput.dietAndLifestyle
        : (articleInput.dietAndLifestyle || '').split('\n').map((s) => s.trim()).filter(Boolean),
      whenToConsult: Array.isArray(articleInput.whenToConsult)
        ? articleInput.whenToConsult
        : (articleInput.whenToConsult || '').split('\n').map((s) => s.trim()).filter(Boolean),
      faqs: articleInput.faqs || [],
      disclaimer:
        articleInput.disclaimer ||
        'The clinical information provided here is strictly educational and does not constitute individual medical diagnosis or treatment advice. Consult a licensed physician for personal care.',
      clinicId: activeClinic?.id || 'sunrise',
    }

    setData((current) => ({
      ...current,
      articles: [newArticle, ...(current.articles || [])],
    }))

    if (newArticle.status === 'Under Review') {
      notify('Article submitted to Clinic Admin for editorial review.')
    } else {
      notify('Health article published successfully!')
    }
    return newArticle
  }

  const updateArticle = (articleId, updates) => {
    let updatedObj = null
    setData((current) => {
      const articles = (current.articles || []).map((art) => {
        if (art.id === articleId) {
          updatedObj = {
            ...art,
            ...updates,
            updatedAt: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          }
          return updatedObj
        }
        return art
      })
      return { ...current, articles }
    })
    notify('Health article updated successfully.')
    return updatedObj
  }

  const deleteArticle = (articleId) => {
    setData((current) => ({
      ...current,
      articles: (current.articles || []).filter((art) => art.id !== articleId),
    }))
    notify('Article removed from Health Library.')
  }

  const archiveArticle = (articleId) => {
    updateArticle(articleId, { status: 'Archived' })
    notify('Article moved to archive.')
  }

  const approveArticle = (articleId, reviewerName) => {
    updateArticle(articleId, {
      status: 'Published',
      reviewedBy: {
        name: reviewerName || activeClinic?.owner || 'Dr. Maya Patel',
        title: 'Clinic Medical Director, MD',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      },
      adminFeedback: null,
    })
    notify('Article approved and published to Health Library!')
  }

  const rejectArticle = (articleId, feedback) => {
    updateArticle(articleId, {
      status: 'Rejected',
      adminFeedback: feedback || 'Please refine the diagnosis and symptom sections before resubmitting.',
    })
    notify('Article returned to author with feedback.')
  }

  const addDiseaseCategory = (newCategory) => {
    const trimmed = (newCategory || '').trim()
    if (!trimmed) return
    setData((current) => {
      const existing = current.diseaseCategories || []
      if (existing.some((c) => c.toLowerCase() === trimmed.toLowerCase())) {
        return current
      }
      return {
        ...current,
        diseaseCategories: [...existing, trimmed],
      }
    })
    notify(`Added category: ${trimmed}`)
  }

  const incrementArticleViews = (slug) => {
    setData((current) => ({
      ...current,
      articles: (current.articles || []).map((art) => (art.slug === slug ? { ...art, views: (art.views || 0) + 1 } : art)),
    }))
  }

  const value = useMemo(
    () => ({
      data,
      activeClinic,
      currentUser,
      toast,
      notify,
      addArticle,
      updateArticle,
      deleteArticle,
      archiveArticle,
      approveArticle,
      rejectArticle,
      addDiseaseCategory,
      incrementArticleViews,
      loginUser,
      logoutUser,
      loginDemoPatient,
      loginDemoReceptionist,
      loginDemoDoctor,
      loginDemoDoctorAdmin,
      loginDemoClinicAdmin,
      attendPatientConsultation,
      registerPatientAccount,
      bookPatientAppointment,
      bookGuestAppointment,
      cancelPatientAppointment,
      reschedulePatientAppointment,
      recordWhatsAppMessage,
      updateWhatsAppMessage,
      markWhatsAppMessageOpened,
      deleteWhatsAppMessage,
      payPatientInvoice,
      markNotificationRead,
      markAllNotificationsRead,
      updatePatientProfile,
      checkInPatient,
      updateAppointmentQueueStatus,
      receptionistRegisterPatient,
      receptionistUpdatePatient,
      receptionistBookAppointment,
      receptionistCreateInvoice,
      receptionistRecordPayment,
      markReceptionistNotificationRead,
      markAllReceptionistNotificationsRead,
      markDoctorNotificationRead,
      markAllDoctorNotificationsRead,
      updateReceptionistProfile,
      placeMedicineOrder,
      placePrescriptionUploadOrder,
      confirmPrescriptionOrderByStore,
      updateMedicineOrderStatus,
      uploadPatientPrescription,
      updatePharmacyProfile,
      updateMedicineInventory,
      addMedicineToInventory,
      sendEmailNotification,
      addEmailTemplate,
      updateEmailTemplate,
      toggleEmailTemplate,
      deleteEmailTemplate,
      updateEmailNotificationStatus,
      resendEmailNotification,
      createEmailRecord,
      setActiveClinic: (id) => setData((current) => ({ ...current, activeClinicId: id })),
      addClinic: (clinic) => {
        const saasClinicCreatedEmail = createEmailRecord('saas_clinic_created', {
          recipientEmail: 'admin@clinicos.health',
          recipientName: 'SaaS Super Admin',
          userRole: 'saas_admin',
          clinicId: clinic.id,
          clinicName: clinic.name,
          dynamicData: {
            name: 'Super Admin',
            clinic_name: clinic.name,
            owner_name: clinic.owner || 'Clinic Owner',
            plan_name: clinic.plan || 'Standard Care',
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          },
        })
        const saasPlanEmail = createEmailRecord('saas_plan_purchased', {
          recipientEmail: 'admin@clinicos.health',
          recipientName: 'SaaS Super Admin',
          userRole: 'saas_admin',
          clinicId: clinic.id,
          clinicName: clinic.name,
          dynamicData: {
            name: 'Super Admin',
            clinic_name: clinic.name,
            plan_name: clinic.plan || 'Standard Care',
            billing_cycle: 'Monthly',
            amount: '₹3,999/mo',
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          },
        })
        setData((current) => ({
          ...current,
          clinics: [...current.clinics, clinic],
          emailNotifications: [saasClinicCreatedEmail, saasPlanEmail, ...(current.emailNotifications || [])].filter(Boolean),
        }))
      },
      updateClinic: (id, patch) => {
        const clinic = data.clinics.find((c) => c.id === id)
        const saasClinicUpdatedEmail = createEmailRecord('saas_clinic_updated', {
          recipientEmail: 'admin@clinicos.health',
          recipientName: 'SaaS Super Admin',
          userRole: 'saas_admin',
          clinicId: id,
          clinicName: patch.name || clinic?.name || 'Clinic',
          dynamicData: {
            name: 'Super Admin',
            clinic_name: patch.name || clinic?.name || 'Clinic',
            updated_fields: Object.keys(patch).join(', '),
            date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
          },
        })
        setData((current) => ({
          ...current,
          clinics: current.clinics.map((clinic) => (clinic.id === id ? { ...clinic, ...patch } : clinic)),
          emailNotifications: [saasClinicUpdatedEmail, ...(current.emailNotifications || [])].filter(Boolean),
        }))
      },
      addPlan: (plan) => setData((current) => ({ ...current, plans: [...current.plans, plan] })),
      updatePlan: (id, patch) =>
        setData((current) => ({
          ...current,
          plans: current.plans.map((plan) => (plan.id === id ? { ...plan, ...patch } : plan)).filter((plan) => !plan.archived),
        })),
      addPatient: (patient) =>
        setData((current) => ({
          ...current,
          clinics: current.clinics.map((clinic) =>
            clinic.id === current.activeClinicId
              ? { ...clinic, patients: [{ ...patient, id: `p${Date.now()}` }, ...clinic.patients] }
              : clinic
          ),
        })),
      updatePatient: (id, patch) =>
        setData((current) => ({
          ...current,
          clinics: current.clinics.map((clinic) =>
            clinic.id === current.activeClinicId
              ? { ...clinic, patients: clinic.patients.map((patient) => (patient.id === id ? { ...patient, ...patch } : patient)) }
              : clinic
          ),
        })),
      addAppointment: (appointment) =>
        setData((current) => ({
          ...current,
          clinics: current.clinics.map((clinic) =>
            clinic.id === current.activeClinicId
              ? { ...clinic, appointments: [{ ...appointment, id: `a${Date.now()}` }, ...clinic.appointments] }
              : clinic
          ),
        })),
      addStaff: (staff) => {
        const activeClinicTarget = data.clinics.find((c) => c.id === data.activeClinicId) || activeClinic
        let staffEmail = null
        let clinicStaffEmail = null
        const isDoc = staff.role === 'Doctor' || (staff.specialty && !staff.role?.toLowerCase().includes('reception'))
        if (isDoc) {
          staffEmail = createEmailRecord('doctor_account_created', {
            recipientEmail: staff.email || 'doctor@clinic.com',
            recipientName: staff.name,
            userRole: 'doctor',
            clinicId: activeClinicTarget?.id,
            clinicName: activeClinicTarget?.name,
            dynamicData: {
              name: staff.name,
              clinic_name: activeClinicTarget?.name,
              role: staff.role || staff.specialty || 'Doctor',
              login_link: '/login',
            },
          })
          clinicStaffEmail = createEmailRecord('clinic_doctor_created', {
            recipientEmail: activeClinicTarget?.email || 'admin@clinic.com',
            recipientName: activeClinicTarget?.name || 'Clinic Admin',
            userRole: 'clinic_admin',
            clinicId: activeClinicTarget?.id,
            clinicName: activeClinicTarget?.name,
            dynamicData: {
              name: activeClinicTarget?.name,
              doctor_name: staff.name,
              specialty: staff.specialty || 'General Medicine',
              date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            },
          })
        } else {
          staffEmail = createEmailRecord('receptionist_account_created', {
            recipientEmail: staff.email || 'reception@clinic.com',
            recipientName: staff.name,
            userRole: 'receptionist',
            clinicId: activeClinicTarget?.id,
            clinicName: activeClinicTarget?.name,
            dynamicData: {
              name: staff.name,
              clinic_name: activeClinicTarget?.name,
              shift: 'Full-Time Front Desk',
              login_link: '/login',
            },
          })
          clinicStaffEmail = createEmailRecord('clinic_receptionist_created', {
            recipientEmail: activeClinicTarget?.email || 'admin@clinic.com',
            recipientName: activeClinicTarget?.name || 'Clinic Admin',
            userRole: 'clinic_admin',
            clinicId: activeClinicTarget?.id,
            clinicName: activeClinicTarget?.name,
            dynamicData: {
              name: activeClinicTarget?.name,
              receptionist_name: staff.name,
              date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            },
          })
        }
        setData((current) => ({
          ...current,
          clinics: current.clinics.map((clinic) =>
            clinic.id === current.activeClinicId
              ? {
                  ...clinic,
                  staff: [
                    {
                      ...staff,
                      id: `s${Date.now()}`,
                      initials: staff.name
                        .split(' ')
                        .map((word) => word[0])
                        .join('')
                        .slice(0, 2),
                    },
                    ...clinic.staff,
                  ],
                }
              : clinic
          ),
          emailNotifications: [staffEmail, clinicStaffEmail, ...(current.emailNotifications || [])].filter(Boolean),
        }))
      },
      updateStaff: (id, patch) =>
        setData((current) => ({
          ...current,
          clinics: current.clinics.map((clinic) =>
            clinic.id === current.activeClinicId
              ? { ...clinic, staff: clinic.staff.map((staff) => (staff.id === id ? { ...staff, ...patch } : staff)) }
              : clinic
          ),
        })),
      addService: (service) =>
        setData((current) => ({
          ...current,
          clinics: current.clinics.map((clinic) =>
            clinic.id === current.activeClinicId
              ? { ...clinic, services: [{ ...service, id: `sv${Date.now()}` }, ...clinic.services] }
              : clinic
          ),
        })),
      updateService: (id, patch) =>
        setData((current) => ({
          ...current,
          clinics: current.clinics.map((clinic) =>
            clinic.id === current.activeClinicId
              ? { ...clinic, services: clinic.services.map((service) => (service.id === id ? { ...service, ...patch } : service)) }
              : clinic
          ),
        })),
      removeService: (id) =>
        setData((current) => ({
          ...current,
          clinics: current.clinics.map((clinic) =>
            clinic.id === current.activeClinicId
              ? { ...clinic, services: clinic.services.filter((service) => service.id !== id) }
              : clinic
          ),
        })),
      themes,
      previewThemeId,
      setPreviewThemeId,
      setClinicTheme,
      resetClinicTheme,
      setDoctorThemePermission,
      activeTheme: getThemeById(previewThemeId || activeClinic?.theme || DEFAULT_THEME_ID),
      clearDemo: () => {
        localStorage.removeItem(STORAGE_KEY)
        localStorage.removeItem(SESSION_KEY)
        setData(seedData)
        setCurrentUser(null)
      },
    }),
    [data, activeClinic, currentUser, toast, previewThemeId]
  )

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const context = useContext(StoreContext)
  if (!context) throw new Error('useStore must be used inside AppProvider')
  return context
}

import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import {
  Activity, AlertCircle, ArrowLeft, ArrowRight, ArrowUpRight, BookOpen, Building2, CalendarCheck2,
  CalendarPlus, Check, CheckCircle2, ChevronRight, Clock, Copy, HeartPulse, Info, Lock,
  Mail, MapPin, Menu, Phone, Printer, ShieldCheck, Stethoscope, Trash2, User, UserCheck,
  Users, Video, X,
} from 'lucide-react'
import { useStore } from './Store'
import { Badge, Modal } from './components'
import { WhatsAppIcon, openWhatsAppChat, getBookingConfirmationTemplate } from './whatsapp'
import { HealthLibrarySection } from './HealthLibraryPages'

const benefits = [
  { icon: CalendarCheck2, title: 'A calmer schedule', text: 'Appointments, reminders, and availability all in one clear view.' },
  { icon: Users, title: 'Care that feels personal', text: 'Every patient detail and visit history, right where your team needs it.' },
  { icon: HeartPulse, title: 'A healthier practice', text: 'Simple reports help you understand what’s working and what’s next.' },
]

export function GuestAppointmentBookingModal({ initialClinicId = null, onClose }) {
  const { data, bookGuestAppointment } = useStore()
  const clinics = data?.clinics || []

  const [step, setStep] = useState(initialClinicId ? 2 : 1)
  const [selectedClinicId, setSelectedClinicId] = useState(initialClinicId || clinics[0]?.id || '')
  const [clinicQuery, setClinicQuery] = useState('')
  const [selectedDoctorId, setSelectedDoctorId] = useState('')
  const [consultationType, setConsultationType] = useState('In-Person Consultation')

  const todayStr = new Date().toISOString().slice(0, 10)
  const [appointmentDate, setAppointmentDate] = useState(todayStr)
  const [appointmentTime, setAppointmentTime] = useState('')

  const [patientName, setPatientName] = useState('')
  const [patientPhone, setPatientPhone] = useState('')
  const [patientEmail, setPatientEmail] = useState('')
  const [reason, setReason] = useState('General Consultation')
  const [notes, setNotes] = useState('')

  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [bookingResult, setBookingResult] = useState(null)
  const [copiedCode, setCopiedCode] = useState(false)
  const [whatsappError, setWhatsappError] = useState('')
  const [whatsappOpened, setWhatsappOpened] = useState(false)

  // Current selected clinic
  const selectedClinic = clinics.find((c) => c.id === selectedClinicId) || clinics[0]

  // Available doctors at selected clinic
  const clinicDoctors = (selectedClinic?.staff || []).filter(
    (s) => !s.role?.toLowerCase().includes('receptionist') && (s.consultationFee > 0 || s.name.startsWith('Dr.') || s.role?.toLowerCase().includes('medicine') || s.role?.toLowerCase().includes('pediatric'))
  )
  const availableDoctors = clinicDoctors.length > 0 ? clinicDoctors : [
    {
      id: `doc-${selectedClinic?.id || 'main'}`,
      name: selectedClinic?.owner || 'Dr. Maya Patel',
      role: 'Family Medicine & Attending Physician',
      specialty: 'Family Medicine',
      consultationFee: 120,
      initials: 'MP',
      bio: 'Lead physician providing comprehensive primary healthcare and medical consultations.',
      languages: ['English', 'Spanish'],
    }
  ]

  // Current selected doctor
  const selectedDoctor = availableDoctors.find((d) => d.id === selectedDoctorId) || availableDoctors[0]

  // Filtered clinics for step 1
  const filteredClinics = clinics.filter((c) => {
    const q = clinicQuery.toLowerCase().trim()
    if (!q) return true
    return (
      c.name.toLowerCase().includes(q) ||
      (c.address && c.address.toLowerCase().includes(q)) ||
      (c.services && c.services.some((s) => (s.name || s).toLowerCase().includes(q)))
    )
  })

  // Time slots
  const TIME_SLOTS = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
    '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
    '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'
  ]

  // Check if slot is booked
  const isSlotBooked = (slot) => {
    if (!selectedClinic || !selectedDoctor) return false
    const appts = selectedClinic.appointments || []
    return appts.some((appt) => {
      const sameDoc = appt.doctorId === selectedDoctor.id || appt.doctor === selectedDoctor.name
      const sameDate = appt.date === appointmentDate || (appointmentDate === todayStr && appt.date === 'Today')
      const sameTime = appt.time.toLowerCase().replace(/\s+/g, '') === slot.toLowerCase().replace(/\s+/g, '')
      const isActive = appt.status !== 'Cancelled' && appt.status !== 'No-show'
      return sameDoc && sameDate && sameTime && isActive
    })
  }

  // Quick date offsets
  const setQuickDate = (offsetDays) => {
    const d = new Date()
    d.setDate(d.getDate() + offsetDays)
    setAppointmentDate(d.toISOString().slice(0, 10))
    setAppointmentTime('')
  }

  // Proceed to review
  const handleProceedToReview = () => {
    setError('')
    if (!patientName.trim()) {
      setError('Please enter your full legal name.')
      return
    }
    if (!patientPhone.trim()) {
      setError('Please provide a contact phone number for your appointment confirmation.')
      return
    }
    setStep(5)
  }

  // Confirm booking
  const handleConfirmBooking = () => {
    setError('')
    setIsSubmitting(true)

    const result = bookGuestAppointment({
      clinicId: selectedClinic.id,
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      date: appointmentDate,
      time: appointmentTime,
      type: consultationType,
      fee: selectedDoctor.consultationFee || 120,
      patientName,
      patientPhone,
      patientEmail,
      patientNotes: notes,
      notes: reason + (notes ? ` - ${notes}` : ''),
    })

    setIsSubmitting(false)

    if (result.success) {
      setBookingResult(result)
      setStep(6)
    } else {
      setError(result.error || 'Failed to complete appointment booking. Please choose another time slot.')
    }
  }

  const copyReferenceCode = () => {
    if (bookingResult?.referenceCode) {
      navigator.clipboard.writeText(bookingResult.referenceCode)
      setCopiedCode(true)
      setTimeout(() => setCopiedCode(false), 2500)
    }
  }

  const resetBooking = () => {
    setStep(1)
    setSelectedClinicId(clinics[0]?.id || '')
    setSelectedDoctorId('')
    setAppointmentDate(todayStr)
    setAppointmentTime('')
    setPatientName('')
    setPatientPhone('')
    setPatientEmail('')
    setNotes('')
    setError('')
    setBookingResult(null)
    setWhatsappError('')
    setWhatsappOpened(false)
  }

  const handleWhatsAppConfirm = () => {
    setWhatsappError('')
    const message = getBookingConfirmationTemplate({
      patientName,
      referenceCode: bookingResult?.referenceCode,
      clinicName: bookingResult?.clinic?.name || selectedClinic.name,
      clinicPhone: bookingResult?.clinic?.phone || selectedClinic.phone,
      doctorName: selectedDoctor.name,
      consultationType,
      date: appointmentDate,
      time: appointmentTime,
    })

    const res = openWhatsAppChat(patientPhone, message)
    if (!res.success) {
      setWhatsappError(res.error || 'Please enter a valid phone number to confirm via WhatsApp.')
    } else {
      setWhatsappOpened(true)
    }
  }

  const stepLabels = [
    { num: 1, label: 'Select Clinic' },
    { num: 2, label: 'Select Doctor' },
    { num: 3, label: 'Date & Time' },
    { num: 4, label: 'Patient Info' },
    { num: 5, label: 'Review' },
  ]

  return (
    <Modal
      title={step === 6 ? 'Booking Confirmation' : 'Guest Appointment Booking '}
      onClose={onClose}
      wide={true}
    >
      {/* Progress Steps (1 to 5) */}
      {step < 6 && (
        <div className="mb-6 border-b border-slate-100 pb-4">
          <div className="hidden sm:flex items-center justify-between">
            {stepLabels.map((s, idx) => {
              const isActive = step === s.num
              const isPast = step > s.num
              return (
                <div key={s.num} className="flex items-center gap-2">
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold transition ${
                      isPast
                        ? 'bg-emerald-500 text-white'
                        : isActive
                        ? 'bg-blue-600 text-white ring-4 ring-blue-100'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {isPast ? '✓' : s.num}
                  </span>
                  <span
                    className={`text-xs font-medium ${
                      isActive ? 'font-semibold text-slate-800' : isPast ? 'text-slate-600' : 'text-slate-400'
                    }`}
                  >
                    {s.label}
                  </span>
                  {idx < stepLabels.length - 1 && (
                    <span className="mx-2 text-slate-200">―</span>
                  )}
                </div>
              )
            })}
          </div>
          {/* Mobile step bar */}
          <div className="flex sm:hidden items-center justify-between text-xs text-slate-500">
            <span>Step {step} of 5: <b>{stepLabels[step - 1]?.label}</b></span>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <span key={i} className={`h-1.5 w-5 rounded-full ${i <= step ? 'bg-blue-600' : 'bg-slate-200'}`} />
              ))}
            </div>
          </div>
        </div>
      )}

      {error && (
        <div className="mb-4 flex items-center gap-2 rounded-xl bg-rose-50 p-3 text-xs text-rose-700">
          <AlertCircle size={15} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Step 1: Clinic Selection */}
      {step === 1 && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold text-slate-800">Choose a clinic</h3>
              <p className="text-xs text-slate-500">Select one of our partner clinics offering guest bookings.</p>
            </div>
            <input
              type="text"
              placeholder="Search by clinic name, city, service..."
              value={clinicQuery}
              onChange={(e) => setClinicQuery(e.target.value)}
              className="form-input !py-1.5 !text-xs sm:w-64"
            />
          </div>

          <div className="grid gap-3 sm:grid-cols-2 max-h-[380px] overflow-y-auto pr-1">
            {filteredClinics.map((clinic) => {
              const isSelected = selectedClinicId === clinic.id
              const doctorsList = (clinic.staff || []).filter(
                (s) => !s.role?.toLowerCase().includes('receptionist') && (s.consultationFee > 0 || s.name.startsWith('Dr.'))
              )
              return (
                <div
                  key={clinic.id}
                  onClick={() => setSelectedClinicId(clinic.id)}
                  className={`cursor-pointer rounded-xl border p-4 transition text-left flex flex-col justify-between ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/50 shadow-sm ring-2 ring-blue-500/20'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`flex h-8 w-8 items-center justify-center rounded-lg ${isSelected ? 'bg-blue-600 text-white' : 'bg-blue-50 text-blue-600'}`}>
                          <Building2 size={16} />
                        </span>
                        <div>
                          <b className="text-xs text-slate-800 block">{clinic.name}</b>
                          <span className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                            <MapPin size={11} className="shrink-0" /> {clinic.address || 'Medical Suite'}
                          </span>
                        </div>
                      </div>
                      {isSelected && <span className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white text-[10px]">✓</span>}
                    </div>

                    <div className="mt-3 space-y-1 text-[11px] text-slate-600 border-t border-slate-100 pt-2">
                      <div className="flex items-center gap-1.5">
                        <Phone size={11} className="text-slate-400" /> {clinic.phone}
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Stethoscope size={11} className="text-blue-600" />
                        <span>{doctorsList.length} Doctors available</span>
                      </div>
                    </div>

                    <div className="mt-2 flex flex-wrap gap-1">
                      {(clinic.services || []).slice(0, 2).map((srv, idx) => (
                        <span key={idx} className="rounded bg-white border border-slate-100 px-1.5 py-0.5 text-[9px] text-slate-600 font-medium">
                          {srv.name || srv}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="flex justify-end pt-3 border-t border-slate-100">
            <button
              onClick={() => {
                if (!selectedClinicId) {
                  setError('Please select a clinic to proceed.')
                  return
                }
                setError('')
                setStep(2)
              }}
              className="btn btn-primary !px-5 !py-2.5 text-xs font-semibold flex items-center gap-1.5"
            >
              Continue to Select Doctor <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Step 2: Doctor Selection */}
      {step === 2 && (
        <div className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-blue-600">Selected Clinic</span>
              <h3 className="text-sm font-semibold text-slate-800">{selectedClinic.name}</h3>
              <p className="text-[11px] text-slate-500">{selectedClinic.address}</p>
            </div>
            <button
              onClick={() => setStep(1)}
              className="btn btn-ghost !px-2.5 !py-1 text-xs text-blue-600 font-medium flex items-center gap-1"
            >
              <ArrowLeft size={13} /> Change Clinic
            </button>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-800">Select an attending doctor</h4>
            <p className="text-[11px] text-slate-500">Only verified practitioners at {selectedClinic.name} are shown.</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 max-h-[380px] overflow-y-auto pr-1">
            {availableDoctors.map((doc) => {
              const isSelected = (selectedDoctorId || availableDoctors[0]?.id) === doc.id
              return (
                <div
                  key={doc.id}
                  onClick={() => setSelectedDoctorId(doc.id)}
                  className={`cursor-pointer rounded-xl border p-4 transition flex flex-col justify-between ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50/50 shadow-sm ring-2 ring-blue-500/20'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50/50'
                  }`}
                >
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className={`flex h-9 w-9 items-center justify-center rounded-xl font-bold text-xs ${isSelected ? 'bg-blue-600 text-white' : 'bg-blue-100 text-blue-700'}`}>
                          {doc.initials || doc.name.split(' ').map((w) => w[0]).join('').slice(0, 2)}
                        </span>
                        <div>
                          <b className="text-xs text-slate-800 block">{doc.name}</b>
                          <span className="text-[11px] text-blue-600 font-medium block">{doc.specialty || doc.role}</span>
                        </div>
                      </div>
                      <span className="font-bold text-xs text-slate-800 bg-white border border-slate-100 px-2 py-0.5 rounded-full">
                        ${doc.consultationFee || 120}
                      </span>
                    </div>

                    {doc.bio && (
                      <p className="mt-2.5 text-[11px] text-slate-500 line-clamp-2 leading-relaxed">
                        {doc.bio}
                      </p>
                    )}

                    <div className="mt-3 flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-100 pt-2">
                      <span>Experience: {doc.experience || '8+ years'}</span>
                      <span>Languages: {(doc.languages || ['English']).join(', ')}</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <button
              onClick={() => setStep(1)}
              className="btn btn-secondary !px-4 !py-2 text-xs flex items-center gap-1.5"
            >
              <ArrowLeft size={13} /> Back
            </button>
            <button
              onClick={() => {
                if (!selectedDoctor) {
                  setError('Please select a doctor to proceed.')
                  return
                }
                setError('')
                setStep(3)
              }}
              className="btn btn-primary !px-5 !py-2.5 text-xs font-semibold flex items-center gap-1.5"
            >
              Continue to Schedule <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Appointment Scheduling (Mode, Date, Time) */}
      {step === 3 && (
        <div className="space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-[10px] uppercase font-bold tracking-wider text-blue-600">Doctor & Clinic</span>
              <h3 className="text-xs font-semibold text-slate-800">{selectedDoctor.name} · {selectedClinic.name}</h3>
            </div>
            <button
              onClick={() => setStep(2)}
              className="btn btn-ghost !px-2.5 !py-1 text-xs text-blue-600 font-medium flex items-center gap-1"
            >
              <ArrowLeft size={13} /> Change Doctor
            </button>
          </div>

          {/* Consultation Type */}
          <div>
            <label className="text-xs font-semibold text-slate-800 block mb-2">Choose consultation type</label>
            <div className="grid grid-cols-2 gap-3">
              <div
                onClick={() => setConsultationType('In-Person Consultation')}
                className={`cursor-pointer rounded-xl border p-3.5 transition flex items-start gap-3 ${
                  consultationType === 'In-Person Consultation'
                    ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <span className={`p-2 rounded-lg ${consultationType === 'In-Person Consultation' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  <Building2 size={16} />
                </span>
                <div>
                  <b className="text-xs block text-slate-800">In-Person Consultation</b>
                  <p className="text-[11px] text-slate-500 mt-0.5">Visit clinic in person at {selectedClinic.address}</p>
                </div>
              </div>

              <div
                onClick={() => setConsultationType('Video Telehealth Consultation')}
                className={`cursor-pointer rounded-xl border p-3.5 transition flex items-start gap-3 ${
                  consultationType === 'Video Telehealth Consultation'
                    ? 'border-blue-600 bg-blue-50/50 ring-2 ring-blue-500/20'
                    : 'border-slate-200 hover:border-slate-300'
                }`}
              >
                <span className={`p-2 rounded-lg ${consultationType === 'Video Telehealth Consultation' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                  <Video size={16} />
                </span>
                <div>
                  <b className="text-xs block text-slate-800">Video Consultation</b>
                  <p className="text-[11px] text-slate-500 mt-0.5">Join high-definition telehealth call from your phone/PC</p>
                </div>
              </div>
            </div>
          </div>

          {/* Date Picker */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-800">Select Date</label>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setQuickDate(0)}
                  className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold border ${
                    appointmentDate === todayStr ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  Today
                </button>
                <button
                  type="button"
                  onClick={() => setQuickDate(1)}
                  className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold border bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                >
                  Tomorrow
                </button>
                <button
                  type="button"
                  onClick={() => setQuickDate(2)}
                  className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold border bg-white text-slate-600 border-slate-200 hover:bg-slate-50"
                >
                  In 2 Days
                </button>
              </div>
            </div>
            <input
              type="date"
              min={todayStr}
              value={appointmentDate}
              onChange={(e) => {
                setAppointmentDate(e.target.value)
                setAppointmentTime('')
              }}
              className="form-input !text-xs !py-2"
            />
          </div>

          {/* Available Time Slots */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold text-slate-800">Available time slots</label>
              <span className="text-[10px] text-slate-400">Doctor availability checked automatically</span>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
              {TIME_SLOTS.map((slot) => {
                const booked = isSlotBooked(slot)
                const isSelected = appointmentTime === slot
                return (
                  <button
                    key={slot}
                    type="button"
                    disabled={booked}
                    onClick={() => {
                      setAppointmentTime(slot)
                      setError('')
                    }}
                    className={`rounded-lg py-2.5 px-2 text-xs font-semibold transition border flex flex-col items-center justify-center gap-0.5 ${
                      booked
                        ? 'border-slate-200 bg-slate-50 text-slate-300 cursor-not-allowed opacity-60'
                        : isSelected
                        ? 'border-blue-600 bg-blue-600 text-white shadow-sm'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-blue-400 hover:bg-blue-50/50'
                    }`}
                  >
                    <span>{slot}</span>
                    <span className="text-[9px] font-normal">
                      {booked ? 'Booked' : isSelected ? 'Selected' : 'Available'}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <button
              onClick={() => setStep(2)}
              className="btn btn-secondary !px-4 !py-2 text-xs flex items-center gap-1.5"
            >
              <ArrowLeft size={13} /> Back
            </button>
            <button
              onClick={() => {
                if (!appointmentTime) {
                  setError('Please select an available time slot for your appointment.')
                  return
                }
                setError('')
                setStep(4)
              }}
              className="btn btn-primary !px-5 !py-2.5 text-xs font-semibold flex items-center gap-1.5"
            >
              Continue to Patient Info <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Step 4: Patient Info (No Account Required) */}
      {step === 4 && (
        <div className="space-y-4">
          <div className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-3.5 flex items-start gap-2.5">
            <ShieldCheck size={18} className="text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <b className="text-xs text-emerald-900 block">No Account or Registration Required</b>
              <p className="text-[11px] text-emerald-700 mt-0.5">
                We only need your contact details so the clinic can confirm your booking and issue your appointment reference code.
              </p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold text-slate-800 block mb-1">
                Full Name <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g. Sarah Jenkins"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                className="form-input !text-xs !py-2"
                required
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-800 block mb-1">
                Mobile Phone <span className="text-rose-500">*</span>
              </label>
              <input
                type="tel"
                placeholder="e.g. (415) 555-0149"
                value={patientPhone}
                onChange={(e) => setPatientPhone(e.target.value)}
                className="form-input !text-xs !py-2"
                required
              />
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="text-xs font-semibold text-slate-800 block mb-1">
                Email Address <span className="text-slate-400 font-normal">(Optional for receipt & reminders)</span>
              </label>
              <input
                type="email"
                placeholder="e.g. sarah.j@example.com"
                value={patientEmail}
                onChange={(e) => setPatientEmail(e.target.value)}
                className="form-input !text-xs !py-2"
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-800 block mb-1">Reason for Visit</label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                className="form-input !text-xs !py-2"
              >
                <option value="General Consultation">General Consultation</option>
                <option value="Annual Wellness Exam">Annual Wellness Exam</option>
                <option value="Flu, Cold or Fever Symptoms">Flu, Cold or Fever Symptoms</option>
                <option value="Pediatric Checkup">Pediatric Checkup</option>
                <option value="Prescription Refill">Prescription Refill</option>
                <option value="Chronic Condition Follow-up">Chronic Condition Follow-up</option>
                <option value="Specialist Consultation">Specialist Consultation</option>
                <option value="Other Medical Concern">Other Medical Concern</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-800 block mb-1">
              Additional Notes or Symptoms <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <textarea
              rows={2}
              placeholder="Describe any current symptoms, allergies, or questions for Dr. Maya Patel..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="form-input !text-xs !py-2"
            />
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <button
              onClick={() => setStep(3)}
              className="btn btn-secondary !px-4 !py-2 text-xs flex items-center gap-1.5"
            >
              <ArrowLeft size={13} /> Back
            </button>
            <button
              onClick={handleProceedToReview}
              className="btn btn-primary !px-5 !py-2.5 text-xs font-semibold flex items-center gap-1.5"
            >
              Review Appointment <ArrowRight size={14} />
            </button>
          </div>
        </div>
      )}

      {/* Step 5: Review & Confirm */}
      {step === 5 && (
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold text-slate-800">Review your appointment details</h3>
            <p className="text-xs text-slate-500">Please verify your booking details before confirming.</p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 space-y-3.5 text-xs">
            <div className="grid grid-cols-2 gap-3 pb-3 border-b border-slate-200/70">
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Clinic</span>
                <b className="text-slate-800 block text-xs mt-0.5">{selectedClinic.name}</b>
                <span className="text-[11px] text-slate-500">{selectedClinic.address}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Attending Doctor</span>
                <b className="text-slate-800 block text-xs mt-0.5">{selectedDoctor.name}</b>
                <span className="text-[11px] text-blue-600">{selectedDoctor.specialty || selectedDoctor.role}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pb-3 border-b border-slate-200/70">
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Date & Time</span>
                <b className="text-slate-800 block text-xs mt-0.5">{appointmentDate} · {appointmentTime}</b>
                <span className="text-[11px] text-emerald-600 font-medium">Slot guaranteed</span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Consultation Type</span>
                <b className="text-slate-800 block text-xs mt-0.5">{consultationType}</b>
                <span className="text-[11px] text-slate-500">
                  {consultationType.includes('Video') ? 'HD Telehealth' : 'In-clinic front desk check-in'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pb-3 border-b border-slate-200/70">
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Patient Details</span>
                <b className="text-slate-800 block text-xs mt-0.5">{patientName}</b>
                <span className="text-[11px] text-slate-500">{patientPhone}{patientEmail ? ` · ${patientEmail}` : ''}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Reason for Visit</span>
                <span className="text-slate-700 block text-xs mt-0.5">{reason}</span>
                {notes && <span className="text-[11px] text-slate-400 italic">"{notes}"</span>}
              </div>
            </div>

            <div className="flex items-center justify-between pt-1">
              <div>
                <span className="text-[10px] font-bold uppercase text-slate-400 block">Consultation Fee</span>
                <span className="text-[11px] text-slate-500">No prepayment required · Pay at clinic or after visit</span>
              </div>
              <div className="text-right">
                <span className="brand-font text-lg font-bold text-slate-900">₹{selectedDoctor.consultationFee || 120}</span>
              </div>
            </div>
          </div>

          <div className="text-[11px] text-slate-400 flex items-center gap-1.5">
            <Check size={13} className="text-emerald-500" />
            <span>By confirming, you agree to the clinic's standard appointment and cancellation guidelines.</span>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setStep(4)}
              className="btn btn-secondary !px-4 !py-2 text-xs flex items-center gap-1.5"
            >
              <ArrowLeft size={13} /> Back
            </button>
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleConfirmBooking}
              className="btn btn-primary !px-6 !py-2.5 text-xs font-semibold flex items-center gap-2 shadow-sm"
            >
              {isSubmitting ? (
                <span>Confirming Booking...</span>
              ) : (
                <>
                  <CheckCircle2 size={15} /> Confirm & Book Appointment
                </>
              )}
            </button>
          </div>
        </div>
      )}

      {/* Step 6: Booking Confirmation */}
      {step === 6 && bookingResult && (
        <div className="space-y-5 text-center py-2">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
            <CheckCircle2 size={32} />
          </div>

          <div>
            <h3 className="brand-font text-xl font-bold text-slate-800 sm:text-2xl">Appointment Confirmed!</h3>
            <p className="mt-1 text-xs text-slate-500">
              Your appointment is booked and scheduled directly on the clinic's front-desk calendar.
            </p>
          </div>

          {/* Reference Code Card */}
          <div className="mx-auto max-w-md rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50/60 p-4">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700">Booking Reference Code (CONF-XXXXXX)</span>
            <div className="mt-1 flex items-center justify-center gap-3">
              <span className="font-mono text-2xl font-extrabold text-blue-800 tracking-wider">
                {bookingResult.referenceCode}
              </span>
              <button
                type="button"
                onClick={copyReferenceCode}
                className="btn btn-secondary !px-2.5 !py-1 text-[11px] flex items-center gap-1 font-semibold"
                aria-label="Copy reference code"
              >
                <Copy size={12} /> {copiedCode ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <p className="mt-1.5 text-[10px] text-blue-600">
              Save this code or take a screenshot to present at reception.
            </p>
          </div>

          {/* Summary Breakdown */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 text-left text-xs space-y-2.5 max-w-lg mx-auto">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-slate-400">Clinic:</span>
              <b className="text-slate-800">{bookingResult.clinic?.name || selectedClinic.name}</b>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-slate-400">Doctor:</span>
              <b className="text-slate-800">{selectedDoctor.name} ({selectedDoctor.specialty || selectedDoctor.role})</b>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-slate-400">Date & Time:</span>
              <b className="text-slate-800">{appointmentDate} at {appointmentTime}</b>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-slate-400">Consultation Type:</span>
              <b className="text-slate-800">{consultationType}</b>
            </div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-100">
              <span className="text-slate-400">Patient:</span>
              <b className="text-slate-800">{patientName} ({patientPhone})</b>
            </div>
            <div className="flex items-center justify-between pt-1">
              <span className="text-slate-400">Consultation Fee:</span>
              <b className="text-emerald-700 font-bold">₹{selectedDoctor.consultationFee || 120}</b>
            </div>
          </div>

          {/* Practical Next Steps */}
          <div className="rounded-xl bg-slate-50 border border-slate-100 p-3.5 text-left text-xs max-w-lg mx-auto space-y-1.5">
            <b className="text-slate-700 block">What happens next?</b>
            {consultationType.includes('Video') ? (
              <p className="text-[11px] text-slate-500 leading-relaxed">
                • A secure video room link has been allocated for your visit.<br />
                • Check your phone/email before {appointmentTime} to join the consultation room.<br />
                • Have your current medication list or questions ready for Dr. Maya Patel.
              </p>
            ) : (
              <p className="text-[11px] text-slate-500 leading-relaxed">
                • Please arrive at {bookingResult.clinic?.address || selectedClinic.address} 10 minutes before your slot.<br />
                • Show reference code <b>{bookingResult.referenceCode}</b> at the front desk for instant check-in.<br />
                • Bring a valid government photo ID and your insurance card if applicable.
              </p>
            )}
          </div>

          {whatsappError && (
            <div className="mx-auto max-w-lg rounded-xl bg-rose-50 border border-rose-200 p-2.5 text-xs text-rose-700 flex items-center gap-2 text-left">
              <AlertCircle size={15} className="shrink-0 text-rose-600" />
              <span>{whatsappError}</span>
            </div>
          )}

          {whatsappOpened && (
            <div className="mx-auto max-w-lg rounded-xl bg-emerald-50 border border-emerald-200 p-2 text-[11px] text-emerald-800 flex items-center justify-center gap-1.5">
              <Check size={13} className="text-emerald-600" />
              <span>WhatsApp click-to-chat opened in a new tab with your pre-filled appointment confirmation.</span>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleWhatsAppConfirm}
              className="btn !bg-[#25D366] hover:!bg-[#20bd5a] text-white !px-4 !py-2 text-xs font-semibold flex items-center gap-1.5 shadow-sm"
              title="Open WhatsApp with pre-filled appointment confirmation"
            >
              <WhatsAppIcon size={15} /> Confirm via WhatsApp
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="btn btn-secondary !px-4 !py-2 text-xs flex items-center gap-1.5"
            >
              <Printer size={13} /> Print Summary
            </button>
            <button
              type="button"
              onClick={resetBooking}
              className="btn btn-secondary !px-4 !py-2 text-xs flex items-center gap-1.5"
            >
              <CalendarPlus size={13} /> Book Another Appointment
            </button>
            <button
              type="button"
              onClick={onClose}
              className="btn btn-primary !px-5 !py-2 text-xs font-semibold"
            >
              Done & Close
            </button>
          </div>
          <p className="text-[10px] text-slate-400">
            Clicking "Confirm via WhatsApp" opens WhatsApp with pre-filled details. Please review and send directly in WhatsApp.
          </p>
        </div>
      )}
    </Modal>
  )
}

export function LandingPage() {
  const [menu, setMenu] = useState(false)
  const [bookingModalOpen, setBookingModalOpen] = useState(false)
  const [selectedClinicId, setSelectedClinicId] = useState(null)
  const { data } = useStore()

  const openBookingForClinic = (clinicId) => {
    setSelectedClinicId(clinicId)
    setBookingModalOpen(true)
  }

  const openGeneralBooking = () => {
    setSelectedClinicId(null)
    setBookingModalOpen(true)
  }

  return <div className="min-h-screen bg-white text-slate-800">
    <header className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
      <Link to="/" className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white"><Stethoscope size={19} /></span>
        <span className="brand-font text-lg font-extrabold">Clinic<span className="text-blue-600">OS</span></span>
      </Link>
      <button className="btn-ghost md:hidden" onClick={() => setMenu(!menu)} aria-label="Toggle menu"><Menu size={19} /></button>
      <nav className={`${menu ? 'absolute left-0 right-0 top-[72px] z-20 flex flex-col border-y bg-white p-5 shadow-lg' : 'hidden'} items-center gap-6 text-xs font-medium text-slate-600 md:static md:flex md:flex-row md:border-0 md:bg-transparent md:p-0 md:shadow-none`}>
        <a href="#book-appointment" className="hover:text-blue-600 flex items-center gap-1 font-semibold text-blue-600">
          <CalendarPlus size={14} /> Book Appointment
        </a>
        <a href="#health-library" className="hover:text-blue-600 flex items-center gap-1 font-semibold text-slate-700">
          <BookOpen size={14} /> Health Library
        </a>
        <Link to="/features" className="hover:text-blue-600">Features</Link>
        <Link to="/pricing" className="hover:text-blue-600">Pricing</Link>
        <a href="#about" className="hover:text-blue-600">About us</a>
        <Link to="/login" className="hover:text-blue-600">Log in</Link>
        {/* <button
          onClick={openGeneralBooking}
          className="btn btn-secondary !px-3.5 !py-2 text-xs font-semibold flex items-center gap-1.5"
        >
          <CalendarPlus size={14} className="text-blue-600" /> Book Online
        </button> */}
        <Link to="/register" className="btn btn-primary !px-4 !py-2.5">Start free trial <ArrowRight size={14} /></Link>
      </nav>
    </header>
    <main>
      <section className="relative overflow-hidden bg-[#f4f8ff]">
        <div className="pointer-events-none absolute -right-16 -top-20 h-96 w-96 rounded-full bg-blue-100/70 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 left-0 h-72 w-72 rounded-full bg-emerald-100/50 blur-3xl" />
        <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 sm:px-8 sm:py-24 lg:grid-cols-[1.05fr_.95fr] lg:py-28">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-3 py-1.5 text-[10px] font-semibold text-blue-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> Made for independent healthcare & modern patients
            </div>
            <h1 className="brand-font max-w-xl text-4xl font-extrabold leading-[1.12] tracking-tight text-slate-900 sm:text-5xl lg:text-[56px]">
              Care for your patients.<br />
              <span className="text-blue-600">Connected for everyone.</span>
            </h1>
            <p className="mt-6 max-w-lg text-sm leading-7 text-slate-500 sm:text-base">
              The modern healthcare SaaS bringing platform admins, clinic operators, healthcare providers, and patients into a unified care experience.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={openGeneralBooking}
                className="btn btn-primary !px-5 !py-3 flex items-center gap-2 shadow-sm font-semibold"
              >
                <CalendarPlus size={16} /> Book Appointment 
              </button>
              <Link to="/register" className="btn btn-secondary !px-5 !py-3">Start your 14-day free trial <ArrowRight size={15} /></Link>
              <Link to="/login" className="btn btn-ghost !px-5 !py-3">Explore the demo</Link>
            </div>
            <div className="mt-6 flex items-center gap-2 text-[11px] text-slate-400">
              <Check size={13} className="text-emerald-500" /> Instant confirmation <span className="px-1">·</span> No registration required <span className="px-1">·</span> Choose your doctor
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-[520px]">
            <div className="absolute -left-6 top-12 z-10 hidden rounded-xl border border-slate-100 bg-white p-3.5 shadow-lg sm:block">
              <div className="text-[10px] text-slate-400">Today’s appointments</div>
              <div className="mt-1 text-xl font-bold text-slate-800">26 <span className="text-[10px] font-medium text-emerald-600">↑ 12%</span></div>
            </div>
            <div className="absolute -bottom-5 -right-4 z-10 hidden rounded-xl border border-slate-100 bg-white p-3.5 shadow-lg sm:block">
              <div className="flex items-center gap-2">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-600"><HeartPulse size={15} /></span>
                <div>
                  <div className="text-[10px] text-slate-400">Patient satisfaction</div>
                  <div className="text-sm font-bold text-slate-800">4.9 <span className="text-amber-400">★★★★★</span></div>
                </div>
              </div>
            </div>
            <div className="rounded-2xl border border-blue-100 bg-white p-4 shadow-[0_25px_80px_-25px_rgba(38,89,170,.22)] sm:p-6">
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-blue-600"><Stethoscope size={17} /></div>
                  <div><b className="block text-xs">Sunrise Family Clinic</b><span className="text-[10px] text-slate-400">Monday, October 26</span></div>
                </div>
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
              </div>
              <div className="my-5 grid grid-cols-3 gap-2">
                <MiniMetric title="Patients" value="1,284" color="blue" />
                <MiniMetric title="Appointments" value="26" color="green" />
                <MiniMetric title="Revenue" value="₹2,840" color="purple" />
              </div>
              <div className="flex items-center justify-between">
                <div><b className="text-xs">Upcoming appointments</b><span className="ml-2 text-[10px] text-slate-400">View all →</span></div>
                <span className="text-[10px] text-slate-400">Today</span>
              </div>
              <div className="mt-3 space-y-2">
                {[
                  ['09:00', 'Emma Wilson', 'Annual checkup'],
                  ['10:30', 'Noah Thompson', 'Follow-up visit'],
                  ['11:15', 'Olivia Martinez', 'Consultation'],
                ].map(([time, name, type], index) => (
                  <div key={name} className="flex items-center gap-3 rounded-lg bg-slate-50/80 p-2.5">
                    <span className="text-[10px] font-semibold text-blue-700">{time}</span>
                    <span className={`flex h-7 w-7 items-center justify-center rounded-full text-[9px] font-bold ${index === 1 ? 'bg-violet-100 text-violet-700' : 'bg-blue-100 text-blue-700'}`}>
                      {name.split(' ').map((word) => word[0]).join('')}
                    </span>
                    <div className="flex-1"><b className="block text-[10px] text-slate-700">{name}</b><span className="text-[9px] text-slate-400">{type}</span></div>
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Instant Guest Appointment Booking Section */}
      <section id="book-appointment" className="mx-auto max-w-7xl px-5 py-14 sm:px-8 border-b border-slate-100">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1 text-[11px] font-semibold text-blue-700">
              <CalendarPlus size={13} /> Instant Guest Booking
            </div>
            <h2 className="brand-font mt-2 text-2xl font-bold tracking-tight text-slate-800 sm:text-3xl">
              Book a clinic visit or telehealth consultation
            </h2>
            <p className="mt-1 text-xs text-slate-500 sm:text-sm">
              Schedule directly with our partner practices without creating an account or logging in.
            </p>
          </div>
          <button
            onClick={openGeneralBooking}
            className="btn btn-primary !px-4 !py-2.5 text-xs font-semibold flex items-center gap-2 self-start md:self-auto"
          >
            <CalendarPlus size={15} /> Open Booking Portal
          </button>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {(data?.clinics || []).map((clinic) => {
            const doctors = (clinic.staff || []).filter(
              (s) => !s.role?.toLowerCase().includes('receptionist') && (s.consultationFee > 0 || s.name.startsWith('Dr.'))
            )
            return (
              <div key={clinic.id} className="card p-5 flex flex-col justify-between border-slate-200/90 hover:shadow-md transition">
                <div>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 font-bold text-sm">
                        <Building2 size={20} />
                      </span>
                      <div>
                        <h3 className="font-bold text-slate-800 text-sm">{clinic.name}</h3>
                        <span className="flex items-center gap-1 text-[11px] text-slate-400 mt-0.5">
                          <MapPin size={12} className="text-slate-400 shrink-0" /> {clinic.address || 'Medical Plaza'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                    <div className="flex items-center gap-1.5 text-xs text-slate-600">
                      <Phone size={13} className="text-slate-400" /> {clinic.phone}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs text-slate-600">
                      <Stethoscope size={13} className="text-blue-600" />
                      <span className="font-medium text-slate-700">{doctors.length} Doctors available</span>
                    </div>
                    <div className="text-[11px] text-slate-500 font-medium truncate">
                      {doctors.map((d) => d.name).join(' · ')}
                    </div>
                  </div>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {(clinic.services || []).slice(0, 3).map((srv, idx) => (
                      <span key={idx} className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] text-slate-600">
                        {srv.name || srv}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100">
                  <button
                    onClick={() => openBookingForClinic(clinic.id)}
                    className="btn btn-outline w-full !py-2 text-xs flex items-center justify-center gap-1.5 font-semibold text-blue-600 hover:bg-blue-50 hover:border-blue-300"
                  >
                    <CalendarPlus size={14} /> Book with {clinic.name.split(' ')[0]}
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Disease Awareness & Health Library Section */}
      <HealthLibrarySection onOpenBooking={openGeneralBooking} />

      <section className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="text-center">
          <p className="text-[10px] font-bold uppercase tracking-[.15em] text-blue-600">Everything in one place</p>
          <h2 className="brand-font mt-3 text-3xl font-bold tracking-tight text-slate-800">More care. Less busywork.</h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500">The everyday tools you need to run a thoughtful, modern clinic—with a seamless portal for your patients.</p>
        </div>
        <div id="features" className="mt-10 grid gap-4 md:grid-cols-3">
          {benefits.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl border border-slate-100 p-6 transition hover:-translate-y-1 hover:shadow-lg">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600"><Icon size={21} /></span>
              <h3 className="mt-5 text-sm font-semibold">{title}</h3>
              <p className="mt-2 text-xs leading-6 text-slate-500">{text}</p>
            </div>
          ))}
        </div>
      </section>
      <section id="about" className="bg-[#f4f8ff] px-5 py-14 text-center sm:px-8">
        <ShieldCheck size={29} className="mx-auto text-blue-600" />
        <h2 className="brand-font mt-4 text-2xl font-bold text-slate-800">Your practice deserves a better flow.</h2>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-500">Join independent practices and patients enjoying modern, transparent healthcare operations.</p>
        <Link to="/register" className="btn btn-primary mt-6">Find your flow <ArrowRight size={14} /></Link>
      </section>
    </main>
    <footer className="flex flex-wrap items-center justify-between gap-4 px-6 py-6 text-[10px] text-slate-400 sm:px-10">
      <Link to="/" className="brand-font font-extrabold text-slate-700">Clinic<span className="text-blue-600">OS</span></Link>
      <span>© 2026 ClinicOS Healthcare SaaS. Made for better care.</span>
      <div className="flex gap-4">
        <Link to="/health-library">Health Library</Link>
        <Link to="/pricing">Pricing</Link>
        <Link to="/login">Demo portals</Link>
        <Link to="/patient/register">Patient register</Link>
        <a href="mailto:support@clinicos.demo">Contact</a>
      </div>
    </footer>

    {bookingModalOpen && (
      <GuestAppointmentBookingModal
        initialClinicId={selectedClinicId}
        onClose={() => {
          setBookingModalOpen(false)
          setSelectedClinicId(null)
        }}
      />
    )}
  </div>
}

export function LoginPage() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const { data, loginDemoPatient, loginDemoReceptionist, loginDemoDoctor, loginUser, notify } = useStore()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const redirectUrl = searchParams.get('redirect')

  const handleSuperAdminDemo = () => {
    loginUser({ name: 'Alex Morgan', role: 'super_admin', email: 'alex@clinicos.demo' })
    navigate('/super-admin/dashboard')
  }

  const handleDoctorAdminDemo = () => {
    loginDemoDoctor()
    navigate('/clinic/dashboard')
  }

  const handleReceptionistDemo = () => {
    loginDemoReceptionist()
    navigate(redirectUrl || '/receptionist/dashboard')
  }

  const handlePatientDemo = () => {
    loginDemoPatient()
    navigate(redirectUrl || '/patient/dashboard')
  }

  const handleEmailSubmit = (event) => {
    event.preventDefault()
    setError('')

    const cleanEmail = email.trim().toLowerCase()

    // 1. Check if email belongs to a patient account
    const patientAccount = (data.patientAccounts || []).find(
      (p) => p.email.toLowerCase() === cleanEmail
    )
    if (patientAccount) {
      loginUser(patientAccount)
      navigate(redirectUrl || '/patient/dashboard')
      return
    }

    // 2. Check if email belongs to a receptionist account
    const recAccount = (data.receptionistAccounts || []).find(
      (r) => r.email.toLowerCase() === cleanEmail
    )
    if (recAccount) {
      loginUser(recAccount)
      navigate(redirectUrl || '/receptionist/dashboard')
      return
    }

    // 3. Check if email belongs to doctor / clinic admin account
    const docAccount = (data.doctorAccounts || []).find(
      (d) => d.email.toLowerCase() === cleanEmail
    )
    if (docAccount) {
      loginUser({ ...docAccount, role: 'clinic_admin', title: 'Doctor (Clinic Admin)' })
      navigate('/clinic/dashboard')
      return
    }

    // 4. Check if email belongs to a clinic patient without registered account
    for (const clinic of data.clinics) {
      const clinicPatient = clinic.patients.find(
        (p) => p.email && p.email.toLowerCase() === cleanEmail
      )
      if (clinicPatient) {
        const linkedAccount = {
          id: `pt-acc-${Date.now()}`,
          patientId: clinicPatient.id,
          name: clinicPatient.name,
          email: clinicPatient.email,
          phone: clinicPatient.phone,
          clinicId: clinic.id,
          role: 'patient',
          dob: clinicPatient.dob || '',
          gender: clinicPatient.gender || '',
          address: clinicPatient.address || '',
        }
        loginUser(linkedAccount)
        notify(`Welcome back, ${clinicPatient.name}! Linked to ${clinic.name}.`)
        navigate(redirectUrl || '/patient/dashboard')
        return
      }
    }

    // 5. Check if email belongs to clinic staff or clinic admin
    for (const clinic of data.clinics) {
      if (clinic.email.toLowerCase() === cleanEmail) {
        loginUser({ name: clinic.owner, role: 'clinic_admin', email: cleanEmail, clinicId: clinic.id, title: 'Doctor (Clinic Admin)' })
        navigate('/clinic/dashboard')
        return
      }
      const staffMember = clinic.staff.find((s) => s.email.toLowerCase() === cleanEmail)
      if (staffMember) {
        const isReception = staffMember.role.toLowerCase().includes('reception')
        const role = isReception ? 'receptionist' : 'clinic_admin'
        loginUser({ name: staffMember.name, role, email: cleanEmail, clinicId: clinic.id, title: isReception ? 'Receptionist' : 'Doctor (Clinic Admin)' })
        if (isReception) navigate(redirectUrl || '/receptionist/dashboard')
        else navigate('/clinic/dashboard')
        return
      }
    }

    // 6. Check for Super Admin
    if (cleanEmail.includes('super') || cleanEmail.includes('admin@clinicos')) {
      loginUser({ name: 'Alex Morgan', role: 'super_admin', email: cleanEmail })
      navigate('/super-admin/dashboard')
      return
    }

    // If demo password provided or unrecognized user
    if (password.length >= 6) {
      setError('Account not found for this email. Please verify credentials or select a demo workspace above.')
    } else {
      setError('Please provide a valid password (minimum 6 characters).')
    }
  }

  return (
    <AuthShell title="Welcome back" description="Choose a workspace to explore or sign in with your credentials.">
      {/* Demo Workspaces Section */}
      <div className="mb-4 rounded-xl border border-slate-100 bg-slate-50/90 p-4">
        <div className="mb-1 flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            Choose a workspace to explore
          </span>
          <span className="rounded bg-blue-100/70 px-1.5 py-0.5 text-[9px] font-bold uppercase text-blue-700">
            Demo Sandbox
          </span>
        </div>
        <p className="mb-3 text-[10px] text-slate-400">
          Instant preview environments with pre-loaded clinical, administrative, and patient data.
        </p>

        <div className="space-y-2">
          {/* 1. Super Admin */}
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-lg border border-slate-200 bg-white p-2.5 text-left transition hover:border-violet-300 hover:shadow-sm"
            onClick={handleSuperAdminDemo}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
              <ShieldCheck size={17} />
            </span>
            <span className="flex-1 min-w-0">
              <b className="block text-xs text-slate-700 truncate">Super Admin</b>
              <span className="text-[10px] text-slate-400 truncate block">Manage clinics, subscriptions & billing</span>
            </span>
            <ArrowUpRight size={14} className="text-slate-400" />
          </button>

          {/* 2. Doctor (Clinic Admin) */}
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-lg border border-blue-200 bg-blue-50/40 p-2.5 text-left transition hover:border-blue-400 hover:bg-blue-50 hover:shadow-sm"
            onClick={handleDoctorAdminDemo}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
              <Stethoscope size={17} />
            </span>
            <span className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <b className="block text-xs text-slate-800 truncate">Doctor (Clinic Admin)</b>
                <span className="rounded bg-blue-100 px-1.5 py-0.5 text-[8px] font-bold uppercase text-blue-700">Practice Owner</span>
              </div>
              <span className="text-[10px] text-slate-500 truncate block">Create clinic, manage operations & attend to patients</span>
            </span>
            <ArrowUpRight size={14} className="text-blue-600" />
          </button>

          {/* 3. Receptionist */}
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-lg border border-teal-200 bg-teal-50/40 p-2.5 text-left transition hover:border-teal-400 hover:bg-teal-50 hover:shadow-sm"
            onClick={handleReceptionistDemo}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-100 text-teal-700">
              <UserCheck size={17} />
            </span>
            <span className="flex-1 min-w-0">
              <b className="block text-xs text-slate-800 truncate">Receptionist</b>
              <span className="text-[10px] text-slate-500 truncate block">Manage front-desk, registration, queue & billing</span>
            </span>
            <ArrowUpRight size={14} className="text-teal-600" />
          </button>

          {/* 4. Patient */}
          <button
            type="button"
            className="flex w-full items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50/40 p-2.5 text-left transition hover:border-emerald-400 hover:bg-emerald-50 hover:shadow-sm"
            onClick={handlePatientDemo}
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
              <HeartPulse size={17} />
            </span>
            <span className="flex-1 min-w-0">
              <b className="block text-xs text-slate-800 truncate">Patient portal</b>
              <span className="text-[10px] text-slate-500 truncate block">Manage personal visits, prescriptions & bills</span>
            </span>
            <ArrowUpRight size={14} className="text-emerald-600" />
          </button>
        </div>
      </div>

      <div className="relative my-4 text-center text-[10px] text-slate-400">
        <span className="bg-white px-3 font-medium uppercase tracking-wider text-slate-400">OR SIGN IN WITH EMAIL</span>
        <div className="absolute inset-x-0 top-1/2 -z-10 h-px bg-slate-100" />
      </div>

      {error && (
        <div className="mb-3 flex items-start gap-2 rounded-lg bg-rose-50 p-2.5 text-xs text-rose-700">
          <AlertCircle size={15} className="mt-0.5 shrink-0 text-rose-600" />
          <div>{error}</div>
        </div>
      )}

      {/* Production & Registered User Sign In Form */}
      <form className="space-y-3" onSubmit={handleEmailSubmit}>
        <AuthField
          label="Email address"
          type="email"
          placeholder="you@email.com (e.g. ava@sunrisefamily.com)"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <AuthField
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <div className="flex justify-end">
          <Link className="text-[10px] font-medium text-blue-600 hover:underline" to="/forgot-password">
            Forgot password?
          </Link>
        </div>
        <button className="btn btn-primary w-full !py-2.5" type="submit">
          Sign in to account <ArrowRight size={14} />
        </button>
      </form>

      {/* Account Links */}
      <div className="mt-5 space-y-2 border-t border-slate-100 pt-4 text-center text-[11px] text-slate-500">
        <div>
          Are you a patient?{' '}
          <Link className="font-semibold text-emerald-600 hover:underline" to="/patient/register">
            Create a Patient Account
          </Link>
        </div>
        <div>
          Running a medical clinic?{' '}
          <Link className="font-semibold text-blue-600 hover:underline" to="/register">
            Start your clinic free trial
          </Link>
        </div>
      </div>
    </AuthShell>
  )
}

export function PatientRegisterPage() {
  const { data, registerPatientAccount } = useStore()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    dob: '',
    clinicId: 'sunrise',
    password: '',
    confirmPassword: '',
    consent: false,
  })

  const [errors, setErrors] = useState({})
  const [linkingResult, setLinkingResult] = useState(null)
  const [submitting, setSubmitting] = useState(false)

  const validate = () => {
    const errs = {}
    if (!form.name.trim() || form.name.trim().length < 2) {
      errs.name = 'Please provide your full legal name.'
    }
    if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      errs.email = 'Please enter a valid email address.'
    }
    if (!form.phone.trim() || form.phone.trim().replace(/\D/g, '').length < 10) {
      errs.phone = 'Please provide a valid 10-digit mobile number.'
    }
    if (!form.password || form.password.length < 8) {
      errs.password = 'Password must be at least 8 characters long.'
    }
    if (form.password !== form.confirmPassword) {
      errs.confirmPassword = 'Passwords do not match.'
    }
    if (!form.consent) {
      errs.consent = 'You must accept the terms of service and patient privacy notice.'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    if (!validate()) return

    setSubmitting(true)
    const result = registerPatientAccount({
      name: form.name,
      email: form.email,
      phone: form.phone,
      dob: form.dob,
      clinicId: form.clinicId,
      password: form.password,
    })

    if (!result.success) {
      setErrors({ form: result.error })
      setSubmitting(false)
      return
    }

    setLinkingResult(result)
    setTimeout(() => {
      navigate('/patient/dashboard')
    }, 2000)
  }

  return (
    <AuthShell
      title="Patient Registration"
      description="Create your patient portal account to manage appointments, prescriptions, and health records."
      wide
    >
      {linkingResult ? (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/80 p-5 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
            <CheckCircle2 size={24} />
          </div>
          <h2 className="mt-3 text-base font-bold text-emerald-900">Registration Complete</h2>
          {linkingResult.linked ? (
            <p className="mt-1 text-xs text-emerald-800">
              Identity verified! We located an existing clinical record for you at <b>{linkingResult.clinicName}</b> and securely linked your patient chart.
            </p>
          ) : (
            <p className="mt-1 text-xs text-emerald-800">
              Your patient account has been created. Redirecting to your personal health dashboard...
            </p>
          )}
        </div>
      ) : (
        <form className="space-y-4" onSubmit={handleSubmit}>
          {errors.form && (
            <div className="flex items-start gap-2 rounded-lg bg-rose-50 p-3 text-xs text-rose-700">
              <AlertCircle size={16} className="mt-0.5 shrink-0 text-rose-600" />
              <div>{errors.form}</div>
            </div>
          )}

          <div className="rounded-lg border border-blue-100 bg-blue-50/60 p-3 text-[11px] text-blue-800 flex items-start gap-2">
            <Info size={16} className="mt-0.5 shrink-0 text-blue-600" />
            <div>
              <b>Existing Clinic Patients:</b> If your clinic has already registered you, use the same email or mobile number you gave the clinic. Our system will securely link your records without creating duplicates.
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <AuthField
                label="Full name *"
                placeholder="e.g. Jordan Lee"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
              />
              {errors.name && <p className="mt-1 text-[10px] text-rose-600">{errors.name}</p>}
            </div>
            <div>
              <AuthField
                label="Date of birth"
                type="date"
                value={form.dob}
                onChange={(e) => setForm({ ...form, dob: e.target.value })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <AuthField
                label="Email address *"
                type="email"
                placeholder="you@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
              />
              {errors.email && <p className="mt-1 text-[10px] text-rose-600">{errors.email}</p>}
            </div>
            <div>
              <AuthField
                label="Mobile phone number *"
                placeholder="(555) 000-0000"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                required
              />
              {errors.phone && <p className="mt-1 text-[10px] text-rose-600">{errors.phone}</p>}
            </div>
          </div>

          <label className="block">
            <span className="mb-1.5 block text-[10px] font-semibold text-slate-600">Primary clinic</span>
            <select
              className="form-input !py-2 !text-xs"
              value={form.clinicId}
              onChange={(e) => setForm({ ...form, clinicId: e.target.value })}
            >
              {data.clinics.map((clinic) => (
                <option key={clinic.id} value={clinic.id}>
                  {clinic.name} — {clinic.address}
                </option>
              ))}
            </select>
            <span className="mt-1 block text-[9px] text-slate-400">
              You can still book appointments across other clinics on the platform.
            </span>
          </label>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <AuthField
                label="Create password *"
                type="password"
                placeholder="At least 8 characters"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
              />
              {errors.password && <p className="mt-1 text-[10px] text-rose-600">{errors.password}</p>}
            </div>
            <div>
              <AuthField
                label="Confirm password *"
                type="password"
                placeholder="Re-enter password"
                value={form.confirmPassword}
                onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                required
              />
              {errors.confirmPassword && <p className="mt-1 text-[10px] text-rose-600">{errors.confirmPassword}</p>}
            </div>
          </div>

          <label className="flex items-start gap-2 py-1 text-[10px] leading-relaxed text-slate-500">
            <input
              type="checkbox"
              checked={form.consent}
              onChange={(e) => setForm({ ...form, consent: e.target.checked })}
              className="mt-0.5 accent-emerald-600"
            />
            <span>
              I consent to the ClinicOS Terms of Service and Patient Privacy Notice, including secure electronic storage and transmission of medical communications.
            </span>
          </label>
          {errors.consent && <p className="text-[10px] text-rose-600">{errors.consent}</p>}

          <button
            className="btn btn-primary w-full !bg-emerald-600 hover:!bg-emerald-700 !py-2.5"
            type="submit"
            disabled={submitting}
          >
            {submitting ? 'Creating account...' : 'Complete Patient Registration'} <ArrowRight size={14} />
          </button>

          <p className="mt-4 text-center text-[10px] text-slate-400">
            Already have an account?{' '}
            <Link to="/login" className="font-semibold text-blue-600 hover:underline">
              Sign in
            </Link>
          </p>
        </form>
      )}
    </AuthShell>
  )
}

export function RegisterPage() {
  const [step, setStep] = useState(1)
  const [clinicDetails, setClinicDetails] = useState(null)
  const [plan, setPlan] = useState('Professional')
  const { data, addClinic, setActiveClinic, notify, loginUser } = useStore()
  const navigate = useNavigate()
  const steps = ['Your clinic', 'Choose a plan', 'Review & start']

  function continueClinic(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    setClinicDetails({
      name: form.get('clinic').trim(),
      owner: form.get('owner').trim(),
      email: form.get('email'),
      phone: form.get('phone'),
      address: form.get('address'),
      clinicType: form.get('type'),
    })
    setStep(2)
  }

  function finish() {
    const id = `clinic-${Date.now()}`
    const doctorName = clinicDetails.owner || 'Dr. Maya Patel'
    const clinic = {
      ...clinicDetails,
      id,
      plan,
      status: 'Trial',
      joined: new Date().toISOString().slice(0, 10),
      renewal: '2026-11-09',
      accent: '#edf2ff',
      initials: clinicDetails.name.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase(),
      patients: [],
      staff: [
        {
          id: `s-${Date.now()}`,
          name: doctorName,
          role: clinicDetails.clinicType || 'Doctor & Clinic Director',
          specialty: clinicDetails.clinicType || 'General Practice',
          email: clinicDetails.email,
          status: 'Active',
          initials: doctorName.split(' ').map((part) => part[0]).join('').slice(0, 2).toUpperCase(),
          bio: `Doctor and clinic administrator at ${clinicDetails.name}.`,
          consultationFee: 120,
          experience: '10+ years',
          languages: ['English'],
        },
      ],
      appointments: [],
      services: [
        { id: `sv-${Date.now()}-1`, name: 'General Consultation', duration: '30 min', price: '₹120', status: 'Active', description: 'Clinical examination and care planning.' },
        { id: `sv-${Date.now()}-2`, name: 'Follow-up Visit', duration: '15 min', price: '₹75', status: 'Active', description: 'Progress review and prescription refill.' },
      ],
    }
    addClinic(clinic)
    setActiveClinic(id)
    loginUser({
      name: doctorName,
      role: 'clinic_admin',
      email: clinicDetails.email,
      clinicId: id,
      title: 'Doctor (Clinic Admin)',
    })
    notify(`Welcome, ${doctorName}! Your clinic is created and ready to attend patients.`)
    navigate('/clinic/dashboard')
  }

  return (
    <AuthShell
      title="Doctor & Clinic Setup"
      description="Create your clinic workspace as the attending doctor and clinic administrator."
      wide
    >
      <div className="mb-6 flex items-center">
        {steps.map((label, index) => (
          <div key={label} className="flex flex-1 items-center last:flex-none">
            <div className={`flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold ${step >= index + 1 ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-400'}`}>
              {step > index + 1 ? <Check size={14} /> : index + 1}
            </div>
            <span className={`ml-2 hidden text-[10px] sm:block ${step >= index + 1 ? 'font-semibold text-slate-700' : 'text-slate-400'}`}>
              {label}
            </span>
            {index < steps.length - 1 && (
              <div className={`mx-3 h-px flex-1 ${step > index + 1 ? 'bg-blue-300' : 'bg-slate-200'}`} />
            )}
          </div>
        ))}
      </div>

      {step === 1 && (
        <form className="space-y-3" onSubmit={continueClinic}>
          <div className="grid grid-cols-2 gap-3">
            <AuthField label="Clinic name" name="clinic" placeholder="Sunrise Family Clinic" required />
            <AuthField label="Medical specialty / practice" name="type" placeholder="Family Medicine" required />
          </div>
          <AuthField label="Doctor name / Practice owner" name="owner" placeholder="Dr. Maya Patel" required />
          <div className="grid grid-cols-2 gap-3">
            <AuthField label="Email address" name="email" type="email" placeholder="you@clinic.com" required />
            <AuthField label="Phone number" name="phone" placeholder="(555) 000-0000" required />
          </div>
          <AuthField label="Clinic address" name="address" placeholder="Street, city, state" required />
          <AuthField label="Create password" name="password" type="password" placeholder="At least 8 characters" required />
          <label className="flex items-start gap-2 py-1 text-[10px] leading-relaxed text-slate-500">
            <input type="checkbox" required className="mt-0.5 accent-blue-600" />
            I agree to the terms of service and privacy policy.
          </label>
          <button className="btn btn-primary w-full !py-2.5" type="submit">
            Continue <ArrowRight size={14} />
          </button>
        </form>
      )}

      {step === 2 && (
        <div>
          <p className="mb-4 text-xs leading-5 text-slate-500">
            Choose the plan that feels right. You can change it anytime, and you won't be charged during your 14-day trial.
          </p>
          <div className="space-y-2">
            {data.plans.map((item) => (
              <button
                key={item.id}
                onClick={() => setPlan(item.name)}
                className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left ${plan === item.name ? 'border-blue-400 bg-blue-50/60 ring-2 ring-blue-100' : 'border-slate-200 hover:border-slate-300'}`}
              >
                <span className={`flex h-4 w-4 items-center justify-center rounded-full border ${plan === item.name ? 'border-blue-600 bg-blue-600 text-white' : 'border-slate-300'}`}>
                  {plan === item.name && <Check size={10} />}
                </span>
                <span className="flex-1">
                  <b className="block text-xs text-slate-700">{item.name}</b>
                  <span className="text-[10px] text-slate-400">{item.clinics} · {item.staff} · {item.patients}</span>
                </span>
                <b className="text-sm text-slate-700">₹{item.price}<small className="text-[9px] font-normal text-slate-400">/mo</small></b>
              </button>
            ))}
          </div>
          <div className="mt-5 flex gap-2">
            <button className="btn btn-secondary flex-1" onClick={() => setStep(1)}>Back</button>
            <button className="btn btn-primary flex-1" onClick={() => setStep(3)}>Continue <ArrowRight size={14} /></button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div>
          <div className="mb-4 rounded-xl bg-emerald-50 p-4">
            <span className="flex items-center gap-2 text-xs font-semibold text-emerald-800">
              <Check size={15} /> Your 14-day free trial is ready
            </span>
            <p className="mt-1 text-[10px] leading-relaxed text-emerald-700">
              No payment details needed. Explore every feature and decide when you’re ready.
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 p-4">
            <div className="flex justify-between">
              <span className="text-xs text-slate-500">Clinic</span>
              <b className="text-xs text-slate-700">{clinicDetails?.name}</b>
            </div>
            <div className="mt-3 flex justify-between border-t border-slate-100 pt-3">
              <span className="text-xs text-slate-500">Selected plan</span>
              <b className="text-xs text-slate-700">{plan}</b>
            </div>
            <div className="mt-3 flex justify-between border-t border-slate-100 pt-3">
              <span className="text-xs text-slate-500">Today</span>
              <b className="text-xs text-slate-700">₹0.00</b>
            </div>
          </div>
          <div className="mt-5 flex gap-2">
            <button className="btn btn-secondary flex-1" onClick={() => setStep(2)}>Back</button>
            <button className="btn btn-primary flex-1" onClick={finish}>Open my clinic <ArrowRight size={14} /></button>
          </div>
        </div>
      )}

      <p className="mt-5 text-center text-[10px] text-slate-400">
        Already have an account? <Link to="/login" className="font-semibold text-blue-600">Log in</Link>
      </p>
    </AuthShell>
  )
}

export function PricingPage() {
  const { data } = useStore()
  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <PublicHeader />
      <main className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="text-center">
          <span className="text-[10px] font-bold uppercase tracking-[.14em] text-blue-600">Simple, transparent pricing</span>
          <h1 className="brand-font mt-3 text-4xl font-extrabold tracking-tight text-slate-800">A plan for every practice.</h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500">Start with the essentials and find the right room to grow. Every plan includes a 14-day free trial.</p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {data.plans.map((plan) => (
            <div key={plan.id} className={`rounded-2xl border bg-white p-6 ${plan.popular ? 'border-blue-400 shadow-lg shadow-blue-100' : 'border-slate-200'}`}>
              <h2 className="font-semibold text-slate-800">
                {plan.name}
                {plan.popular && <span className="ml-2 rounded-full bg-blue-50 px-2 py-1 text-[9px] text-blue-700">POPULAR</span>}
              </h2>
              <p className="mt-2 min-h-10 text-xs leading-5 text-slate-500">{plan.description}</p>
              <div className="mt-5 text-4xl font-bold">₹{plan.price}<span className="text-xs font-normal text-slate-400"> / month</span></div>
              <div className="mt-1 text-[10px] text-slate-400">₹{plan.yearly} billed yearly</div>
              <Link to="/register" className={`btn mt-5 w-full ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}>
                Start free trial <ArrowRight size={14} />
              </Link>
              <div className="my-5 border-t border-slate-100 pt-4 text-[10px] font-bold uppercase tracking-wide text-slate-400">What’s included</div>
              <ul className="space-y-3">
                {[plan.clinics, plan.staff, plan.patients, ...plan.features].map((feature) => (
                  <li key={feature} className="flex gap-2 text-xs text-slate-600">
                    <Check size={14} className="text-emerald-500" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-8 text-center text-xs text-slate-400">
          Need a custom plan? <a href="mailto:sales@clinicos.demo" className="font-semibold text-blue-600">Talk to our team</a>
        </div>
      </main>
    </div>
  )
}

export function FeaturesPage() {
  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <PublicHeader />
      <main className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="text-center">
          <span className="text-[10px] font-bold uppercase tracking-[.14em] text-blue-600">ClinicOS features</span>
          <h1 className="brand-font mt-3 text-4xl font-extrabold tracking-tight text-slate-800">The everyday details, made easier.</h1>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-500">Thoughtful tools for the moments that make up a better clinic day for providers and patients alike.</p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {benefits.map(({ icon: Icon, title, text }) => (
            <div key={title} className="rounded-2xl border border-slate-100 bg-white p-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600"><Icon size={21} /></span>
              <h2 className="mt-5 text-sm font-semibold">{title}</h2>
              <p className="mt-2 text-xs leading-6 text-slate-500">{text}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-100 bg-white p-6">
            <h2 className="text-sm font-semibold text-slate-800">Built around your team</h2>
            <p className="mt-2 text-xs leading-6 text-slate-500">Manage provider schedules, clinic services, and team roles in one shared workspace. Each clinic keeps its own patient and operational data.</p>
          </div>
          <div className="rounded-2xl border border-slate-100 bg-white p-6">
            <h2 className="text-sm font-semibold text-slate-800">Dedicated patient portal</h2>
            <p className="mt-2 text-xs leading-6 text-slate-500">Empower patients to book appointments, review verified prescriptions, access permitted medical records, and pay invoices online without administrative phone tag.</p>
          </div>
        </div>
        <div className="mt-9 text-center">
          <Link to="/register" className="btn btn-primary">Start your free trial <ArrowRight size={14} /></Link>
        </div>
      </main>
    </div>
  )
}

export function ForgotPasswordPage() {
  const [sent, setSent] = useState(false)
  const [email, setEmail] = useState('')

  return (
    <AuthShell
      title={sent ? 'Check your inbox' : 'Reset your password'}
      description={
        sent
          ? `If an account exists for ${email}, password recovery instructions have been sent.`
          : 'Enter your registered email address and we will send you a password recovery link.'
      }
    >
      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault()
          setSent(true)
        }}
      >
        <AuthField
          label="Email address"
          type="email"
          placeholder="you@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className="btn btn-primary w-full" type="submit">
          {sent ? 'Send another link' : 'Send reset link'}
        </button>
      </form>
      <div className="mt-5 text-center text-xs">
        <Link className="font-semibold text-blue-600 hover:underline" to="/login">
          ← Back to sign in
        </Link>
      </div>
    </AuthShell>
  )
}

function AuthShell({ title, description, children, wide = false }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f5f8fc] px-4 py-8">
      <div className={`w-full rounded-2xl border border-slate-100 bg-white p-6 shadow-[0_12px_60px_-32px_rgba(35,67,116,.22)] sm:p-8 ${wide ? 'max-w-[560px]' : 'max-w-[440px]'}`}>
        <Link to="/" className="mb-7 flex items-center justify-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white"><Stethoscope size={18} /></span>
          <span className="brand-font text-lg font-extrabold">Clinic<span className="text-blue-600">OS</span></span>
        </Link>
        <h1 className="brand-font text-center text-2xl font-bold text-slate-800">{title}</h1>
        <p className="mb-6 mt-1.5 text-center text-xs text-slate-400">{description}</p>
        {children}
        <div className="mt-6 border-t border-slate-100 pt-4 text-center text-[9px] text-slate-400">
          By continuing, you agree to our Terms of Service and Patient Privacy Notice.
        </div>
      </div>
    </div>
  )
}

function AuthField({ label, name, type = 'text', placeholder, required = false, value, onChange, minLength }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[10px] font-semibold text-slate-600">{label}</span>
      <input
        className="form-input !py-2.5 !text-xs"
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        minLength={minLength || (type === 'password' ? 8 : undefined)}
      />
    </label>
  )
}

function PublicHeader() {
  return (
    <header className="flex items-center justify-between border-b border-slate-100 bg-white px-5 py-4 sm:px-8">
      <Link to="/" className="brand-font text-lg font-extrabold">Clinic<span className="text-blue-600">OS</span></Link>
      <nav className="flex items-center gap-4 text-xs">
        <Link className="text-slate-500 hover:text-blue-600" to="/features">Features</Link>
        <Link className="text-slate-500 hover:text-blue-600" to="/pricing">Pricing</Link>
        <Link className="text-slate-500 hover:text-blue-600" to="/login">Log in</Link>
        <Link to="/register" className="btn btn-primary !py-2">Get started</Link>
      </nav>
    </header>
  )
}

function MiniMetric({ title, value, color }) {
  const colors = { blue: 'text-blue-700 bg-blue-50', green: 'text-emerald-700 bg-emerald-50', purple: 'text-violet-700 bg-violet-50' }
  return (
    <div className={`rounded-lg p-2.5 ${colors[color]}`}>
      <span className="block text-[9px] opacity-70">{title}</span>
      <b className="mt-1 block text-sm">{value}</b>
    </div>
  )
}

import { useMemo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import {
  Activity, AlertCircle, ArrowRight, ArrowUpRight, Bell, CalendarCheck2,
  CalendarDays, CalendarPlus, Check, CheckCircle2, ChevronRight, Clock, Clock3, Copy,
  CreditCard, Download, ExternalLink, FileCheck, FileText, Filter,
  HeartPulse, Info, Lock, MapPin, MessageSquare, Phone, Plus, Printer,
  Receipt, Search, Send, ShieldCheck, Stethoscope, Trash2, User, UserCheck, UserPlus, Users, X,
} from 'lucide-react'
import { useStore } from './Store'
import { Badge, DataTable, Modal, PageHeading, Panel, PrimaryButton, StatCard } from './components'
import {
  WhatsAppIcon,
  openWhatsAppChat,
  getAppointmentPatientPhone,
  getBookingConfirmationTemplate,
  getAppointmentReminderTemplate,
  getAppointmentCancellationTemplate,
  getAppointmentRescheduledTemplate,
  sanitizeWhatsAppPhone,
  buildWhatsAppUrl,
  WHATSAPP_STATUSES,
} from './whatsapp'

// ==========================================
// 1. RECEPTIONIST DASHBOARD
// ==========================================
export function ReceptionistDashboard() {
  const { activeClinic, currentUser, data, checkInPatient } = useStore()
  const navigate = useNavigate()

  const clinic = activeClinic || data.clinics[0]
  const todayDateStr = 'Today'

  // Appointments for active clinic
  const clinicAppointments = useMemo(() => {
    return clinic.appointments || []
  }, [clinic])

  const todayAppointments = useMemo(() => {
    return clinicAppointments.filter((a) => a.date === todayDateStr || a.date === 'Today')
  }, [clinicAppointments])

  const checkedInToday = todayAppointments.filter((a) => a.status === 'Checked in')
  const waitingPatients = todayAppointments.filter((a) => a.status === 'Checked in' || a.status === 'Waiting')
  const completedToday = todayAppointments.filter((a) => a.status === 'Completed')
  const cancelledToday = todayAppointments.filter((a) => a.status === 'Cancelled')
  const pendingRequests = todayAppointments.filter((a) => a.status === 'Scheduled' || a.status === 'Requested')

  // Invoices for active clinic
  const clinicInvoices = useMemo(() => {
    return (data.patientInvoices || []).filter(
      (inv) => inv.clinicId === clinic.id || inv.clinicName === clinic.name
    )
  }, [data.patientInvoices, clinic])

  const unpaidInvoices = clinicInvoices.filter((inv) => inv.paymentStatus !== 'Paid')
  const totalBalanceDue = unpaidInvoices.reduce((sum, inv) => sum + (inv.outstandingBalance || 0), 0)

  // Receptionist notifications for active clinic
  const receptionistNotifications = useMemo(() => {
    return (data.receptionistNotifications || []).filter(
      (n) => !n.clinicId || n.clinicId === clinic.id
    )
  }, [data.receptionistNotifications, clinic])

  const recentPatients = useMemo(() => {
    return (clinic.patients || []).slice(0, 5)
  }, [clinic])

  return (
    <div className="content-wrap">
      <PageHeading
        eyebrow="Front Desk Workspace · Reception Operations"
        title={`Good day, ${currentUser?.name?.split(' ')[0] || 'Ava'} 👋`}
        description={`Receptionist operations and patient check-in queue for ${clinic.name}.`}
        action={
          <div className="flex gap-2">
            <button
              onClick={() => navigate('/receptionist/patients/new')}
              className="btn btn-secondary !text-xs"
            >
              <UserPlus size={14} /> Register Patient
            </button>
            <button
              onClick={() => navigate('/receptionist/book-appointment')}
              className="btn btn-primary !bg-teal-600 hover:!bg-teal-700 !text-xs"
            >
              <CalendarPlus size={14} /> Book Appointment
            </button>
          </div>
        }
      />

      {/* Summary Metrics Row */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-6">
        <StatCard
          label="Today's visits"
          value={todayAppointments.length}
          icon={CalendarDays}
          tone="blue"
          detail="Total scheduled"
        />
        <StatCard
          label="Checked in"
          value={checkedInToday.length}
          icon={UserCheck}
          tone="green"
          detail="Arrived at clinic"
        />
        <StatCard
          label="Waiting queue"
          value={waitingPatients.length}
          icon={Clock}
          tone="teal"
          detail="Awaiting doctor"
        />
        <StatCard
          label="Completed"
          value={completedToday.length}
          icon={CheckCircle2}
          tone="purple"
          detail="Visits finished"
        />
        <StatCard
          label="Pending requests"
          value={pendingRequests.length}
          icon={Activity}
          tone="orange"
          detail="To be checked in"
        />
        <StatCard
          label="Outstanding bills"
          value={`₹${totalBalanceDue}`}
          icon={CreditCard}
          tone="rose"
          detail={`${unpaidInvoices.length} pending`}
        />
      </div>

      {/* Quick Actions Bar */}
      <div className="mb-6 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
        <div className="mb-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Front Desk Quick Actions
        </div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-7">
          <button
            onClick={() => navigate('/receptionist/patients/new')}
            className="flex flex-col items-center justify-center gap-2 rounded-xl border border-slate-100 bg-slate-50/70 p-3 text-center transition hover:border-teal-200 hover:bg-teal-50/50"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-100 text-teal-700">
              <UserPlus size={17} />
            </span>
            <span className="text-xs font-semibold text-slate-700">Register Patient</span>
          </button>

          <button
            onClick={() => navigate('/receptionist/patients')}
            className="flex flex-col items-center justify-center gap-2 rounded-xl border border-slate-100 bg-slate-50/70 p-3 text-center transition hover:border-blue-200 hover:bg-blue-50/50"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
              <Search size={17} />
            </span>
            <span className="text-xs font-semibold text-slate-700">Search Patient</span>
          </button>

          <button
            onClick={() => navigate('/receptionist/book-appointment')}
            className="flex flex-col items-center justify-center gap-2 rounded-xl border border-slate-100 bg-slate-50/70 p-3 text-center transition hover:border-emerald-200 hover:bg-emerald-50/50"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
              <CalendarPlus size={17} />
            </span>
            <span className="text-xs font-semibold text-slate-700">Book Visit</span>
          </button>

          <button
            onClick={() => navigate('/receptionist/appointments')}
            className="flex flex-col items-center justify-center gap-2 rounded-xl border border-slate-100 bg-slate-50/70 p-3 text-center transition hover:border-indigo-200 hover:bg-indigo-50/50"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-100 text-indigo-700">
              <CalendarDays size={17} />
            </span>
            <span className="text-xs font-semibold text-slate-700">Appointments</span>
          </button>

          <button
            onClick={() => navigate('/receptionist/queue')}
            className="flex flex-col items-center justify-center gap-2 rounded-xl border border-slate-100 bg-slate-50/70 p-3 text-center transition hover:border-amber-200 hover:bg-amber-50/50"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
              <UserCheck size={17} />
            </span>
            <span className="text-xs font-semibold text-slate-700">Check In / Queue</span>
          </button>

          <button
            onClick={() => navigate('/receptionist/billing')}
            className="flex flex-col items-center justify-center gap-2 rounded-xl border border-slate-100 bg-slate-50/70 p-3 text-center transition hover:border-purple-200 hover:bg-purple-50/50"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-purple-100 text-purple-700">
              <Receipt size={17} />
            </span>
            <span className="text-xs font-semibold text-slate-700">View Billing</span>
          </button>

          <button
            onClick={() => navigate('/receptionist/notifications')}
            className="flex flex-col items-center justify-center gap-2 rounded-xl border border-slate-100 bg-slate-50/70 p-3 text-center transition hover:border-slate-300 hover:bg-slate-100"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-200 text-slate-700">
              <Bell size={17} />
            </span>
            <span className="text-xs font-semibold text-slate-700">Notifications</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Today's Appointments & Waiting Queue Snapshot */}
      <div className="mb-6 grid grid-cols-1 gap-5 xl:grid-cols-[1.5fr_1fr]">
        {/* Today's Schedule */}
        <Panel
          title="Today's Appointment Schedule"
          subtitle={`${todayAppointments.length} visits scheduled for today`}
          action={
            <Link to="/receptionist/appointments" className="text-xs font-semibold text-blue-600 hover:underline">
              All appointments →
            </Link>
          }
        >
          {todayAppointments.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {todayAppointments.slice(0, 5).map((appt) => (
                <div key={appt.id} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <div className="min-w-[65px] rounded-lg bg-blue-50 px-2 py-1.5 text-center text-xs font-bold text-blue-700">
                      {appt.time}
                    </div>
                    <div>
                      <b className="block text-xs text-slate-800">{appt.patient}</b>
                      <span className="text-[10px] text-slate-400">
                        {appt.doctor} · {appt.type}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Badge>{appt.status}</Badge>
                    {appt.status !== 'Checked in' && appt.status !== 'Completed' && appt.status !== 'Cancelled' && (
                      <button
                        onClick={() => checkInPatient(appt.id)}
                        className="btn btn-secondary !py-1 !px-2.5 !text-[11px] font-semibold text-teal-700 hover:bg-teal-50"
                      >
                        <UserCheck size={12} /> Check In
                      </button>
                    )}
                    {appt.status !== 'Cancelled' && (
                      <button
                        type="button"
                        onClick={() => {
                          const phone = getAppointmentPatientPhone(appt, clinic.patients)
                          const msg = getAppointmentReminderTemplate({
                            patientName: appt.patient,
                            referenceCode: appt.confirmationCode || appt.id,
                            clinicName: clinic.name,
                            clinicPhone: clinic.phone,
                            clinicAddress: clinic.address,
                            doctorName: appt.doctor,
                            date: appt.date,
                            time: appt.time,
                            consultationType: appt.type,
                          })
                          openWhatsAppChat(phone, msg)
                        }}
                        className="btn btn-ghost !p-1.5 text-slate-500 hover:text-emerald-600 hover:bg-emerald-50"
                        title="Send WhatsApp reminder"
                      >
                        <WhatsAppIcon size={14} className="text-[#25D366]" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-10 text-center text-xs text-slate-400">
              No appointments scheduled for today.
            </div>
          )}
        </Panel>

        {/* Current Waiting Queue */}
        <Panel
          title="Live Waiting Room Queue"
          subtitle={`${waitingPatients.length} patients currently in waiting area`}
          action={
            <Link to="/receptionist/queue" className="text-xs font-semibold text-teal-700 hover:underline">
              Manage queue →
            </Link>
          }
        >
          {waitingPatients.length > 0 ? (
            <div className="space-y-2.5">
              {waitingPatients.map((patient, index) => (
                <div key={patient.id} className="flex items-center justify-between rounded-xl border border-teal-100 bg-teal-50/40 p-3 text-xs">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-7 w-7 items-center justify-center rounded-full bg-teal-600 text-[11px] font-bold text-white">
                      #{index + 1}
                    </span>
                    <div>
                      <b className="text-slate-800">{patient.patient}</b>
                      <div className="text-[10px] text-slate-500">
                        Waiting for {patient.doctor} · Arrived {patient.checkedInAt || patient.time}
                      </div>
                    </div>
                  </div>
                  <Badge tone="teal">{patient.status}</Badge>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-10 text-center text-xs text-slate-400">
              <CheckCircle2 size={24} className="mx-auto text-emerald-400 mb-2" />
              Waiting room is clear. No patients currently waiting.
            </div>
          )}
        </Panel>
      </div>

      {/* Second Row: Recently Registered Patients + Front-Desk Updates */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.2fr_1.3fr]">
        {/* Recently Registered Patients */}
        <Panel
          title="Recently Registered Patients"
          subtitle="Latest additions to clinic patient directory"
          action={
            <Link to="/receptionist/patients" className="text-xs font-semibold text-blue-600 hover:underline">
              View all patients →
            </Link>
          }
        >
          <div className="space-y-2.5">
            {recentPatients.map((p) => (
              <div key={p.id} className="flex items-center justify-between rounded-lg border border-slate-100 p-2.5 text-xs">
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-[10px] font-bold text-blue-700">
                    {p.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                  </span>
                  <div>
                    <b className="text-slate-800">{p.name}</b>
                    <div className="text-[10px] text-slate-400">{p.email || p.phone}</div>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">{p.age} yrs · {p.gender}</span>
                  <Badge tone={p.status === 'Active' ? 'green' : 'gray'}>{p.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </Panel>

        {/* Front-Desk Operational Updates */}
        <Panel
          title="Recent Operational Updates"
          subtitle="Front desk activity and alerts"
          action={
            <Link to="/receptionist/notifications" className="text-xs font-semibold text-blue-600 hover:underline">
              Inbox ({receptionistNotifications.filter((n) => !n.read).length}) →
            </Link>
          }
        >
          {receptionistNotifications.length > 0 ? (
            <div className="space-y-2.5">
              {receptionistNotifications.slice(0, 4).map((notif) => (
                <div
                  key={notif.id}
                  className={`flex gap-3 rounded-lg border p-2.5 text-xs transition ${notif.read ? 'border-slate-100 bg-white' : 'border-teal-100 bg-teal-50/30'}`}
                >
                  <span className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs ${notif.read ? 'bg-slate-100 text-slate-500' : 'bg-teal-100 text-teal-700'}`}>
                    <Bell size={13} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <b className="text-xs text-slate-800">{notif.title}</b>
                      <span className="text-[9px] text-slate-400">{notif.date}</span>
                    </div>
                    <p className="mt-0.5 text-[11px] text-slate-600 leading-relaxed">{notif.message}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-slate-400">
              No recent notifications.
            </div>
          )}
        </Panel>
      </div>
    </div>
  )
}

// ==========================================
// 2. RECEPTIONIST PATIENT MANAGEMENT
// ==========================================
export function ReceptionistPatientsPage() {
  const { activeClinic, receptionistUpdatePatient, notify } = useStore()
  const navigate = useNavigate()

  const [selectedPatient, setSelectedPatient] = useState(null)
  const [editingPatient, setEditingPatient] = useState(null)

  const patients = activeClinic.patients || []

  const rows = patients.map((item) => ({
    ...item,
    patient: (
      <button
        onClick={() => setSelectedPatient(item)}
        className="flex items-center gap-2.5 text-left hover:text-blue-600"
      >
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-[10px] font-bold text-blue-700">
          {item.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
        </span>
        <div>
          <b className="block text-xs font-semibold text-slate-800">{item.name}</b>
          <span className="text-[10px] text-slate-400">ID: {item.id}</span>
        </div>
      </button>
    ),
    contact: (
      <div>
        <div className="text-xs text-slate-700">{item.phone}</div>
        <div className="text-[10px] text-slate-400">{item.email || 'No email on file'}</div>
      </div>
    ),
    demographics: `${item.age} yrs · ${item.gender}`,
    lastVisit: item.lastVisit,
    status: <Badge>{item.status}</Badge>,
    actions: (
      <div className="flex gap-2">
        <button
          onClick={() => setEditingPatient(item)}
          className="text-xs font-semibold text-blue-600 hover:underline"
        >
          Edit
        </button>
        <button
          onClick={() => navigate(`/receptionist/book-appointment?patientId=${item.id}&patientName=${encodeURIComponent(item.name)}`)}
          className="btn btn-secondary !py-0.5 !px-2 !text-[10px] text-teal-700"
        >
          Book
        </button>
      </div>
    ),
  }))

  const handleEditSubmit = (e) => {
    e.preventDefault()
    if (!editingPatient) return
    const form = new FormData(e.currentTarget)
    receptionistUpdatePatient(editingPatient.id, {
      name: form.get('name').trim(),
      phone: form.get('phone').trim(),
      email: form.get('email').trim(),
      age: Number(form.get('age')) || editingPatient.age,
      gender: form.get('gender'),
      address: form.get('address'),
      emergencyContact: form.get('emergencyContact'),
      status: form.get('status'),
    })
    setEditingPatient(null)
  }

  return (
    <div className="content-wrap">
      <PageHeading
        eyebrow="Patient Directory"
        title="Patient Management"
        description={`Manage active patient records, contact information, and appointments for ${activeClinic.name}.`}
        action={
          <PrimaryButton onClick={() => navigate('/receptionist/patients/new')} icon={UserPlus}>
            Register New Patient
          </PrimaryButton>
        }
      />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Total Clinic Patients" value={patients.length} icon={Users} tone="blue" />
        <StatCard
          label="Active Patient Records"
          value={patients.filter((p) => p.status === 'Active').length}
          icon={CheckCircle2}
          tone="green"
        />
        <StatCard
          label="New Registrations"
          value={patients.filter((p) => p.lastVisit === 'New patient').length || '1'}
          icon={UserPlus}
          tone="teal"
          detail="Recent additions"
        />
      </div>

      <Panel title="Patient Records" subtitle="Search by patient name, ID, phone number, or email">
        <DataTable
          columns={[
            { key: 'patient', label: 'Patient Name & ID' },
            { key: 'contact', label: 'Contact' },
            { key: 'demographics', label: 'Age & Gender' },
            { key: 'lastVisit', label: 'Last Visit' },
            { key: 'status', label: 'Status' },
            { key: 'actions', label: 'Actions' },
          ]}
          rows={rows}
          searchPlaceholder="Search patients by name, ID, phone, email..."
        />
      </Panel>

      {/* Patient Detail Modal */}
      {selectedPatient && (
        <Modal title="Patient Chart Profile" onClose={() => setSelectedPatient(null)}>
          <div className="space-y-4 text-xs">
            <div className="text-center pb-2 border-b border-slate-100">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-base font-bold text-blue-700">
                {selectedPatient.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
              </div>
              <h3 className="mt-2 text-sm font-bold text-slate-800">{selectedPatient.name}</h3>
              <p className="text-[11px] text-slate-400">ID: {selectedPatient.id} · {activeClinic.name}</p>
            </div>

            <div className="grid grid-cols-2 gap-3 border-b border-slate-100 pb-3">
              <div>
                <span className="text-[10px] text-slate-400">Phone:</span>
                <b className="block text-slate-700">{selectedPatient.phone}</b>
              </div>
              <div>
                <span className="text-[10px] text-slate-400">Email:</span>
                <b className="block text-slate-700">{selectedPatient.email || 'None'}</b>
              </div>
              <div>
                <span className="text-[10px] text-slate-400">Age & Gender:</span>
                <b className="block text-slate-700">{selectedPatient.age} yrs · {selectedPatient.gender}</b>
              </div>
              <div>
                <span className="text-[10px] text-slate-400">Emergency Contact:</span>
                <b className="block text-slate-700">{selectedPatient.emergencyContact || 'None listed'}</b>
              </div>
            </div>

            <div>
              <span className="text-[10px] text-slate-400">Home Address:</span>
              <p className="text-slate-700 font-medium">{selectedPatient.address || 'Address not recorded'}</p>
            </div>

            {/* Patient Appointment History */}
            <div>
              <b className="block text-slate-700 mb-1.5">Appointment History at {activeClinic.name}</b>
              <div className="space-y-1.5">
                {activeClinic.appointments
                  .filter((a) => a.patient === selectedPatient.name || a.patientId === selectedPatient.id)
                  .map((a) => (
                    <div key={a.id} className="flex justify-between rounded-lg bg-slate-50 p-2 text-[11px]">
                      <span>{a.date} · {a.time} ({a.doctor})</span>
                      <Badge>{a.status}</Badge>
                    </div>
                  ))}
              </div>
            </div>

            <div className="flex justify-end gap-2 border-t border-slate-100 pt-3">
              <button
                className="btn btn-secondary"
                onClick={() => {
                  setEditingPatient(selectedPatient)
                  setSelectedPatient(null)
                }}
              >
                Edit Demographics
              </button>
              <button
                className="btn btn-primary !bg-teal-600 hover:!bg-teal-700"
                onClick={() => {
                  navigate(`/receptionist/book-appointment?patientId=${selectedPatient.id}&patientName=${encodeURIComponent(selectedPatient.name)}`)
                }}
              >
                Book Appointment
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* Edit Patient Demographic Details Modal */}
      {editingPatient && (
        <Modal title={`Edit Patient: ${editingPatient.name}`} onClose={() => setEditingPatient(null)}>
          <form className="space-y-4 text-xs" onSubmit={handleEditSubmit}>
            <div className="rounded-md bg-amber-50 p-2.5 text-[11px] text-amber-800">
              <span className="font-semibold">Front-Desk Notice:</span> Receptionists may update patient contact and demographic information. Passwords, clinical diagnoses, and prescriptions cannot be altered.
            </div>

            <label className="block">
              <span className="mb-1 block font-semibold text-slate-600">Full Name</span>
              <input
                type="text"
                name="name"
                defaultValue={editingPatient.name}
                className="form-input !text-xs"
                required
              />
            </label>

            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="mb-1 block font-semibold text-slate-600">Phone Number</span>
                <input
                  type="text"
                  name="phone"
                  defaultValue={editingPatient.phone}
                  className="form-input !text-xs"
                  required
                />
              </label>
              <label className="block">
                <span className="mb-1 block font-semibold text-slate-600">Email Address</span>
                <input
                  type="email"
                  name="email"
                  defaultValue={editingPatient.email}
                  className="form-input !text-xs"
                />
              </label>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="mb-1 block font-semibold text-slate-600">Age</span>
                <input
                  type="number"
                  name="age"
                  defaultValue={editingPatient.age}
                  className="form-input !text-xs"
                />
              </label>
              <label className="block">
                <span className="mb-1 block font-semibold text-slate-600">Gender</span>
                <select
                  name="gender"
                  defaultValue={editingPatient.gender}
                  className="form-input !text-xs"
                >
                  <option>Female</option>
                  <option>Male</option>
                  <option>Non-binary</option>
                  <option>Prefer not to say</option>
                </select>
              </label>
            </div>

            <label className="block">
              <span className="mb-1 block font-semibold text-slate-600">Home Address</span>
              <input
                type="text"
                name="address"
                defaultValue={editingPatient.address}
                className="form-input !text-xs"
              />
            </label>

            <label className="block">
              <span className="mb-1 block font-semibold text-slate-600">Emergency Contact</span>
              <input
                type="text"
                name="emergencyContact"
                defaultValue={editingPatient.emergencyContact}
                placeholder="Name · Phone"
                className="form-input !text-xs"
              />
            </label>

            <label className="block">
              <span className="mb-1 block font-semibold text-slate-600">Account Status</span>
              <select name="status" defaultValue={editingPatient.status} className="form-input !text-xs">
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </label>

            <div className="flex justify-end gap-2 border-t border-slate-100 pt-3">
              <button type="button" className="btn btn-secondary" onClick={() => setEditingPatient(null)}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}

// ==========================================
// 3. RECEPTIONIST REGISTER NEW PATIENT
// ==========================================
export function ReceptionistNewPatientPage() {
  const { activeClinic, receptionistRegisterPatient } = useStore()
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    dob: '',
    gender: 'Female',
    address: '',
    emergencyContact: '',
    consent: false,
  })

  const [error, setError] = useState('')
  const [successPatient, setSuccessPatient] = useState(null)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!form.name.trim() || form.name.trim().length < 2) {
      setError('Please provide patient full name.')
      return
    }
    if (!form.phone.trim() || form.phone.trim().replace(/\D/g, '').length < 10) {
      setError('Please enter a valid 10-digit mobile phone number.')
      return
    }
    if (!form.consent) {
      setError('Patient must acknowledge the medical consent and privacy notice.')
      return
    }

    const result = receptionistRegisterPatient({
      ...form,
      clinicId: activeClinic.id,
    })

    if (!result.success) {
      setError(result.error)
      return
    }

    setSuccessPatient(result.patient)
  }

  if (successPatient) {
    return (
      <div className="content-wrap max-w-xl">
        <div className="card p-8 text-center shadow-lg">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <CheckCircle2 size={32} />
          </div>
          <h2 className="brand-font mt-3 text-xl font-bold text-slate-800">
            Patient Registered Successfully
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            A new medical record has been opened at {activeClinic.name}. Record ID: <b>{successPatient.id}</b>
          </p>

          <div className="my-5 rounded-xl border border-slate-100 bg-slate-50 p-4 text-left text-xs space-y-1.5">
            <div>Patient Name: <b>{successPatient.name}</b></div>
            <div>Phone: <b>{successPatient.phone}</b></div>
            <div>Email: <b>{successPatient.email || 'None on file'}</b></div>
            <div>Age & Gender: <b>{successPatient.age} yrs · {successPatient.gender}</b></div>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => navigate(`/receptionist/book-appointment?patientId=${successPatient.id}&patientName=${encodeURIComponent(successPatient.name)}`)}
              className="btn btn-primary !bg-teal-600 hover:!bg-teal-700"
            >
              <CalendarPlus size={14} /> Book Appointment Now
            </button>
            <button
              onClick={() => navigate('/receptionist/patients')}
              className="btn btn-secondary"
            >
              Return to Patient Directory
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="content-wrap max-w-3xl">
      <PageHeading
        eyebrow="Front Desk Onboarding"
        title="Register New Patient"
        description={`Create a new official patient record for ${activeClinic.name}. Duplicate records by phone or email are automatically prevented.`}
      />

      {error && (
        <div className="mb-5 flex items-start gap-2 rounded-xl bg-rose-50 p-3.5 text-xs text-rose-700 border border-rose-200">
          <AlertCircle size={16} className="mt-0.5 shrink-0 text-rose-600" />
          <div>{error}</div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="card p-6 space-y-5">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-xs font-semibold text-slate-700">Full Legal Name *</span>
            <input
              type="text"
              placeholder="e.g. Jordan Lee"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="form-input !text-xs"
              required
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-xs font-semibold text-slate-700">Mobile Phone Number *</span>
            <input
              type="text"
              placeholder="(555) 000-0000"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="form-input !text-xs"
              required
            />
          </label>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-xs font-semibold text-slate-700">Email Address (optional)</span>
            <input
              type="email"
              placeholder="patient@email.com"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="form-input !text-xs"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-xs font-semibold text-slate-700">Date of Birth</span>
            <input
              type="date"
              value={form.dob}
              onChange={(e) => setForm({ ...form, dob: e.target.value })}
              className="form-input !text-xs"
            />
          </label>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-xs font-semibold text-slate-700">Gender</span>
            <select
              value={form.gender}
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
              className="form-input !text-xs"
            >
              <option>Female</option>
              <option>Male</option>
              <option>Non-binary</option>
              <option>Prefer not to say</option>
            </select>
          </label>

          <label className="block">
            <span className="mb-1 block text-xs font-semibold text-slate-700">Emergency Contact</span>
            <input
              type="text"
              placeholder="Name · (555) 000-0000"
              value={form.emergencyContact}
              onChange={(e) => setForm({ ...form, emergencyContact: e.target.value })}
              className="form-input !text-xs"
            />
          </label>
        </div>

        <label className="block">
          <span className="mb-1 block text-xs font-semibold text-slate-700">Residential Address</span>
          <input
            type="text"
            placeholder="Street Address, City, State, ZIP"
            value={form.address}
            onChange={(e) => setForm({ ...form, address: e.target.value })}
            className="form-input !text-xs"
          />
        </label>

        <label className="flex items-start gap-2.5 rounded-lg bg-slate-50 p-3 text-xs text-slate-600">
          <input
            type="checkbox"
            checked={form.consent}
            onChange={(e) => setForm({ ...form, consent: e.target.checked })}
            className="mt-0.5 accent-teal-600"
            required
          />
          <span>
            Patient has reviewed and verbally accepted the ClinicOS Clinical Consent, Treatment Authorization, and Notice of Privacy Practices.
          </span>
        </label>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/receptionist/patients')}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary !bg-teal-600 hover:!bg-teal-700">
            <UserPlus size={15} /> Complete Registration
          </button>
        </div>
      </form>
    </div>
  )
}

// ==========================================
// 4. RECEPTIONIST APPOINTMENT MANAGEMENT
// ==========================================
export function ReceptionistAppointmentsPage() {
  const {
    activeClinic,
    cancelPatientAppointment,
    reschedulePatientAppointment,
    checkInPatient,
    updateAppointmentQueueStatus,
    recordWhatsAppMessage,
    markWhatsAppMessageOpened,
  } = useStore()
  const navigate = useNavigate()

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [doctorFilter, setDoctorFilter] = useState('All')
  const [dateFilter, setDateFilter] = useState('All')

  const [reschedulingAppt, setReschedulingAppt] = useState(null)
  const [cancellingAppt, setCancellingAppt] = useState(null)
  const [newDate, setNewDate] = useState('Tomorrow')
  const [newTime, setNewTime] = useState('10:00 AM')
  const [cancelReason, setCancelReason] = useState('Patient requested cancellation')

  // WhatsApp Dialog States
  const [confirmationAppt, setConfirmationAppt] = useState(null)
  const [confirmationPhone, setConfirmationPhone] = useState('')
  const [confirmationError, setConfirmationError] = useState('')

  const [reminderAppt, setReminderAppt] = useState(null)
  const [reminderPhone, setReminderPhone] = useState('')
  const [reminderError, setReminderError] = useState('')

  const [rescheduledNoticeAppt, setRescheduledNoticeAppt] = useState(null)
  const [rescheduleNoticePhone, setRescheduleNoticePhone] = useState('')
  const [rescheduleNoticeError, setRescheduleNoticeError] = useState('')

  const [cancelledNoticeAppt, setCancelledNoticeAppt] = useState(null)
  const [cancelNoticePhone, setCancelNoticePhone] = useState('')
  const [cancelNoticeError, setCancelNoticeError] = useState('')

  const [notifyAppt, setNotifyAppt] = useState(null)
  const [notifyPhone, setNotifyPhone] = useState('')
  const [notifyCustomMessage, setNotifyCustomMessage] = useState('')
  const [notifyError, setNotifyError] = useState('')

  const appointments = activeClinic.appointments || []
  const doctors = activeClinic.staff.filter((s) => s.role.toLowerCase().includes('dr.'))

  const filtered = appointments.filter((appt) => {
    const matchesSearch =
      appt.patient?.toLowerCase().includes(search.toLowerCase()) ||
      appt.doctor?.toLowerCase().includes(search.toLowerCase()) ||
      appt.id?.toLowerCase().includes(search.toLowerCase())

    const matchesStatus = statusFilter === 'All' || appt.status === statusFilter
    const matchesDoctor = doctorFilter === 'All' || appt.doctor === doctorFilter
    const matchesDate = dateFilter === 'All' || appt.date === dateFilter

    return matchesSearch && matchesStatus && matchesDoctor && matchesDate
  })

  const handleOpenConfirmation = (appt) => {
    const phone = getAppointmentPatientPhone(appt, activeClinic.patients)
    setConfirmationPhone(phone)
    setConfirmationError('')
    setConfirmationAppt(appt)
  }

  const handleOpenReminder = (appt) => {
    const phone = getAppointmentPatientPhone(appt, activeClinic.patients)
    setReminderPhone(phone)
    setReminderError('')
    setReminderAppt(appt)
  }

  const handleOpenNotify = (appt) => {
    const phone = getAppointmentPatientPhone(appt, activeClinic.patients)
    setNotifyPhone(phone)
    setNotifyError('')
    setNotifyCustomMessage(
      `Hello ${appt.patient}, this is ${activeClinic.name} reaching out regarding your appointment with ${appt.doctor}.`
    )
    setNotifyAppt(appt)
  }

  const handleRescheduleSubmit = (e) => {
    e.preventDefault()
    if (!reschedulingAppt) return
    const res = reschedulePatientAppointment(reschedulingAppt.id, newDate, newTime)
    if (!res.success) {
      alert(res.error)
      return
    }
    const phone = getAppointmentPatientPhone(reschedulingAppt, activeClinic.patients)
    const apptData = { ...reschedulingAppt, date: newDate, time: newTime }
    setReschedulingAppt(null)
    setRescheduleNoticePhone(phone)
    setRescheduleNoticeError('')
    setRescheduledNoticeAppt({
      appointment: apptData,
      oldDate: reschedulingAppt.date,
      oldTime: reschedulingAppt.time,
      newDate,
      newTime,
    })
  }

  const handleCancelSubmit = (e) => {
    e.preventDefault()
    if (!cancellingAppt) return
    const res = cancelPatientAppointment(cancellingAppt.id, cancelReason)
    if (res && res.success === false) {
      alert(res.error)
      return
    }
    const phone = getAppointmentPatientPhone(cancellingAppt, activeClinic.patients)
    const apptData = { ...cancellingAppt }
    setCancellingAppt(null)
    setCancelNoticePhone(phone)
    setCancelNoticeError('')
    setCancelledNoticeAppt({
      appointment: apptData,
      reason: cancelReason,
    })
  }

  return (
    <div className="content-wrap">
      <PageHeading
        eyebrow="Schedule Coordination"
        title="Appointments Management"
        description={`Manage bookings, verify doctor availability, and adjust schedules for ${activeClinic.name}.`}
        action={
          <PrimaryButton onClick={() => navigate('/receptionist/book-appointment')} icon={CalendarPlus}>
            Book Appointment
          </PrimaryButton>
        }
      />

      {/* Filters Bar */}
      <div className="mb-6 card p-4 space-y-3">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by patient, doctor, ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-input !pl-8 !py-1.5 !text-xs"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="form-input !py-1.5 !text-xs"
          >
            <option value="All">All Statuses</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Checked in">Checked in</option>
            <option value="Waiting">Waiting</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
            <option value="No-show">No-show</option>
          </select>

          <select
            value={doctorFilter}
            onChange={(e) => setDoctorFilter(e.target.value)}
            className="form-input !py-1.5 !text-xs"
          >
            <option value="All">All Providers</option>
            {doctors.map((d) => (
              <option key={d.id} value={d.name}>{d.name}</option>
            ))}
          </select>

          <select
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="form-input !py-1.5 !text-xs"
          >
            <option value="All">All Dates</option>
            <option value="Today">Today</option>
            <option value="Tomorrow">Tomorrow</option>
          </select>
        </div>
      </div>

      {/* Appointments List */}
      <Panel title="Appointments Schedule" subtitle={`${filtered.length} appointments match filters`}>
        {filtered.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {filtered.map((appt) => (
              <div key={appt.id} className="flex flex-wrap items-center justify-between gap-4 py-3.5 first:pt-0 last:pb-0">
                <div className="flex items-center gap-3 min-w-[200px]">
                  <div className="min-w-[68px] rounded-lg bg-blue-50 px-2 py-1.5 text-center text-xs font-bold text-blue-700">
                    {appt.time}
                  </div>
                  <div>
                    <b className="block text-xs text-slate-800">{appt.patient}</b>
                    <span className="text-[10px] text-slate-400">
                      {appt.doctor} · {appt.date} · {appt.type}
                    </span>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <Badge>{appt.status}</Badge>

                  {/* Actions depending on status */}
                  {appt.status !== 'Checked in' && appt.status !== 'Completed' && appt.status !== 'Cancelled' && (
                    <button
                      onClick={() => checkInPatient(appt.id)}
                      className="btn btn-secondary !py-1 !text-xs text-teal-700 hover:bg-teal-50"
                    >
                      <UserCheck size={12} /> Check In
                    </button>
                  )}

                  {appt.status === 'Checked in' && (
                    <button
                      onClick={() => updateAppointmentQueueStatus(appt.id, 'In Progress')}
                      className="btn btn-secondary !py-1 !text-xs text-indigo-700 hover:bg-indigo-50"
                    >
                      Send to Doctor
                    </button>
                  )}

                  {/* 1. WhatsApp Confirmation Button */}
                  <button
                    type="button"
                    onClick={() => handleOpenConfirmation(appt)}
                    className="btn btn-secondary !py-1 !text-xs text-blue-700 hover:bg-blue-50 border-blue-200"
                    title="Send WhatsApp appointment confirmation to patient"
                  >
                    <WhatsAppIcon size={12} className="text-[#25D366]" /> Send WhatsApp Confirmation
                  </button>

                  {/* 2. WhatsApp Reminder Button */}
                  {appt.status !== 'Cancelled' && appt.status !== 'Completed' && (
                    <button
                      type="button"
                      onClick={() => handleOpenReminder(appt)}
                      className="btn btn-secondary !py-1 !text-xs text-emerald-700 hover:bg-emerald-50 border-emerald-200"
                      title="Send WhatsApp appointment reminder to patient"
                    >
                      <WhatsAppIcon size={12} className="text-[#25D366]" /> Send WhatsApp Reminder
                    </button>
                  )}

                  {/* 3. Send Rescheduling Message Button */}
                  <button
                    type="button"
                    onClick={() => {
                      const phone = getAppointmentPatientPhone(appt, activeClinic.patients)
                      setRescheduleNoticePhone(phone)
                      setRescheduleNoticeError('')
                      setRescheduledNoticeAppt({
                        appointment: appt,
                        newDate: appt.date,
                        newTime: appt.time,
                      })
                    }}
                    className="btn btn-ghost !py-1 !text-xs text-teal-700 hover:bg-teal-50"
                    title="Send WhatsApp rescheduling update to patient"
                  >
                    <WhatsAppIcon size={12} className="text-[#25D366]" /> Send Rescheduling Message
                  </button>

                  {/* 4. Send Cancellation Message Button */}
                  {appt.status === 'Cancelled' ? (
                    <button
                      type="button"
                      onClick={() => {
                        const phone = getAppointmentPatientPhone(appt, activeClinic.patients)
                        setCancelNoticePhone(phone)
                        setCancelNoticeError('')
                        setCancelledNoticeAppt({
                          appointment: appt,
                          reason: appt.cancellationReason || 'Patient requested cancellation',
                        })
                      }}
                      className="btn btn-ghost !py-1 !text-xs text-rose-600 hover:bg-rose-50"
                      title="Send WhatsApp cancellation notice to patient"
                    >
                      <WhatsAppIcon size={12} className="text-[#25D366]" /> Send Cancellation Message
                    </button>
                  ) : null}

                  {/* Notify Patient Button */}
                  <button
                    type="button"
                    onClick={() => handleOpenNotify(appt)}
                    className="btn btn-ghost !py-1 !text-xs text-slate-600 hover:text-emerald-700 hover:bg-emerald-50"
                    title="Notify patient via WhatsApp"
                  >
                    <WhatsAppIcon size={12} className="text-[#25D366]" /> Notify Patient
                  </button>

                  {appt.status !== 'Cancelled' && appt.status !== 'Completed' && (
                    <button
                      onClick={() => setReschedulingAppt(appt)}
                      className="btn btn-secondary !py-1 !text-xs"
                    >
                      Reschedule
                    </button>
                  )}

                  {appt.status !== 'Cancelled' && appt.status !== 'Completed' && (
                    <button
                      onClick={() => setCancellingAppt(appt)}
                      className="btn btn-ghost !py-1 !text-xs text-rose-600 hover:bg-rose-50"
                    >
                      Cancel
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-xs text-slate-400">
            No appointments found matching your criteria.
          </div>
        )}
      </Panel>

      {/* Reschedule Modal */}
      {reschedulingAppt && (
        <Modal title={`Reschedule: ${reschedulingAppt.patient}`} onClose={() => setReschedulingAppt(null)}>
          <form className="space-y-4 text-xs" onSubmit={handleRescheduleSubmit}>
            <div className="rounded-lg bg-blue-50 p-3 text-blue-800">
              Current visit: <b>{reschedulingAppt.doctor}</b> on <b>{reschedulingAppt.date} at {reschedulingAppt.time}</b>
            </div>

            <label className="block">
              <span className="mb-1 block font-semibold text-slate-600">New Date</span>
              <select
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                className="form-input !text-xs"
              >
                <option value="Today">Today</option>
                <option value="Tomorrow">Tomorrow</option>
                <option value="Oct 28, 2026">Oct 28, 2026</option>
                <option value="Oct 29, 2026">Oct 29, 2026</option>
                <option value="Oct 30, 2026">Oct 30, 2026</option>
              </select>
            </label>

            <label className="block">
              <span className="mb-1 block font-semibold text-slate-600">Available Time Slot</span>
              <select
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                className="form-input !text-xs"
              >
                {['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:15 AM', '01:30 PM', '02:00 PM', '03:00 PM', '04:00 PM'].map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </label>

            <div className="flex justify-end gap-2 border-t border-slate-100 pt-3">
              <button type="button" className="btn btn-secondary" onClick={() => setReschedulingAppt(null)}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Confirm Reschedule
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Cancel Modal */}
      {cancellingAppt && (
        <Modal title="Cancel Appointment" onClose={() => setCancellingAppt(null)}>
          <form className="space-y-4 text-xs" onSubmit={handleCancelSubmit}>
            <div className="rounded-lg bg-rose-50 p-3 text-rose-800">
              Cancel visit for <b>{cancellingAppt.patient}</b> with <b>{cancellingAppt.doctor}</b>?
            </div>

            <label className="block">
              <span className="mb-1 block font-semibold text-slate-600">Cancellation Reason</span>
              <select
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="form-input !text-xs"
              >
                <option>Patient called to cancel</option>
                <option>Doctor unavailable / Rescheduling needed</option>
                <option>Patient failed to show</option>
                <option>Duplicate booking</option>
                <option>Other administrative reason</option>
              </select>
            </label>

            <div className="flex justify-end gap-2 border-t border-slate-100 pt-3">
              <button type="button" className="btn btn-secondary" onClick={() => setCancellingAppt(null)}>
                Keep Appointment
              </button>
              <button type="submit" className="btn btn-primary !bg-rose-600 hover:!bg-rose-700">
                Confirm Cancellation
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* WhatsApp Confirmation Modal */}
      {confirmationAppt && (
        <Modal
          title={`Send WhatsApp Confirmation: ${confirmationAppt.patient}`}
          onClose={() => setConfirmationAppt(null)}
        >
          <div className="space-y-4 text-xs">
            <div className="rounded-lg bg-blue-50 border border-blue-100 p-3 text-blue-900 flex items-start gap-2.5">
              <WhatsAppIcon size={18} className="text-[#25D366] shrink-0 mt-0.5" />
              <div>
                <b className="block">WhatsApp Booking Confirmation</b>
                <p className="mt-0.5 text-[11px] text-blue-700">
                  Review and open WhatsApp with verified appointment confirmation details.
                </p>
              </div>
            </div>

            {confirmationError && (
              <div className="rounded-lg bg-rose-50 border border-rose-200 p-2 text-rose-700 flex items-center gap-2">
                <AlertCircle size={14} className="shrink-0" />
                <span>{confirmationError}</span>
              </div>
            )}

            <div>
              <label className="mb-1 block font-semibold text-slate-700">
                Patient Phone Number <span className="text-slate-400 font-normal">(with country code)</span>
              </label>
              <input
                type="tel"
                value={confirmationPhone}
                onChange={(e) => {
                  setConfirmationPhone(e.target.value)
                  setConfirmationError('')
                }}
                placeholder="e.g. 14155550123"
                className="form-input !text-xs !py-2"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                Validated automatically for WhatsApp click-to-chat.
              </span>
            </div>

            <div>
              <label className="mb-1 block font-semibold text-slate-700">Confirmation Message Preview</label>
              <pre className="whitespace-pre-wrap rounded-lg bg-slate-50 border border-slate-200 p-3 text-[11px] font-sans text-slate-700 leading-relaxed max-h-48 overflow-y-auto">
                {getBookingConfirmationTemplate({
                  patientName: confirmationAppt.patient,
                  referenceCode: confirmationAppt.confirmationCode || confirmationAppt.id,
                  clinicName: activeClinic.name,
                  clinicLocation: activeClinic.address,
                  clinicPhone: activeClinic.phone,
                  doctorName: confirmationAppt.doctor,
                  consultationType: confirmationAppt.type,
                  date: confirmationAppt.date,
                  time: confirmationAppt.time,
                })}
              </pre>
            </div>

            <div className="rounded-lg bg-emerald-50 p-2.5 text-[10px] text-emerald-800 border border-emerald-200">
              <b>Status Tracker:</b> Opening WhatsApp will set this message status to <b>Opened in WhatsApp</b> in your message center.
            </div>

            <div className="flex justify-end gap-2 border-t border-slate-100 pt-3">
              <button type="button" className="btn btn-secondary" onClick={() => setConfirmationAppt(null)}>
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  const msg = getBookingConfirmationTemplate({
                    patientName: confirmationAppt.patient,
                    referenceCode: confirmationAppt.confirmationCode || confirmationAppt.id,
                    clinicName: activeClinic.name,
                    clinicLocation: activeClinic.address,
                    clinicPhone: activeClinic.phone,
                    doctorName: confirmationAppt.doctor,
                    consultationType: confirmationAppt.type,
                    date: confirmationAppt.date,
                    time: confirmationAppt.time,
                  })
                  const res = openWhatsAppChat(confirmationPhone, msg)
                  if (!res.success) {
                    setConfirmationError(res.error || 'Please enter a valid phone number.')
                  } else {
                    recordWhatsAppMessage({
                      clinicId: activeClinic.id,
                      appointmentId: confirmationAppt.id,
                      patientName: confirmationAppt.patient,
                      patientPhone: confirmationPhone,
                      doctorName: confirmationAppt.doctor,
                      referenceCode: confirmationAppt.confirmationCode || confirmationAppt.id,
                      type: 'Confirmation',
                      status: 'Opened in WhatsApp',
                      date: confirmationAppt.date,
                      time: confirmationAppt.time,
                      consultationType: confirmationAppt.type,
                      text: msg,
                    })
                    setConfirmationAppt(null)
                  }
                }}
                className="btn !bg-[#25D366] hover:!bg-[#20bd5a] text-white flex items-center gap-1.5 font-semibold"
              >
                <WhatsAppIcon size={14} /> Open WhatsApp to Send
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* WhatsApp Reminder Modal */}
      {reminderAppt && (
        <Modal
          title={`Send WhatsApp Reminder: ${reminderAppt.patient}`}
          onClose={() => setReminderAppt(null)}
        >
          <div className="space-y-4 text-xs">
            <div className="rounded-lg bg-emerald-50 border border-emerald-100 p-3 text-emerald-900 flex items-start gap-2.5">
              <WhatsAppIcon size={18} className="text-[#25D366] shrink-0 mt-0.5" />
              <div>
                <b className="block">WhatsApp Appointment Reminder</b>
                <p className="mt-0.5 text-[11px] text-emerald-700">
                  Review and open WhatsApp with pre-filled appointment reminder details.
                </p>
              </div>
            </div>

            {reminderError && (
              <div className="rounded-lg bg-rose-50 border border-rose-200 p-2 text-rose-700 flex items-center gap-2">
                <AlertCircle size={14} className="shrink-0" />
                <span>{reminderError}</span>
              </div>
            )}

            <div>
              <label className="mb-1 block font-semibold text-slate-700">
                Patient Phone Number <span className="text-slate-400 font-normal">(with country code)</span>
              </label>
              <input
                type="tel"
                value={reminderPhone}
                onChange={(e) => {
                  setReminderPhone(e.target.value)
                  setReminderError('')
                }}
                placeholder="e.g. 14155550123 or (415) 555-0123"
                className="form-input !text-xs !py-2"
              />
              <span className="text-[10px] text-slate-400 mt-1 block">
                Phone formatted automatically for WhatsApp click-to-chat.
              </span>
            </div>

            <div>
              <label className="mb-1 block font-semibold text-slate-700">Message Preview</label>
              <pre className="whitespace-pre-wrap rounded-lg bg-slate-50 border border-slate-200 p-3 text-[11px] font-sans text-slate-700 leading-relaxed max-h-48 overflow-y-auto">
                {getAppointmentReminderTemplate({
                  patientName: reminderAppt.patient,
                  referenceCode: reminderAppt.confirmationCode || reminderAppt.id,
                  clinicName: activeClinic.name,
                  clinicPhone: activeClinic.phone,
                  clinicAddress: activeClinic.address,
                  doctorName: reminderAppt.doctor,
                  date: reminderAppt.date,
                  time: reminderAppt.time,
                  consultationType: reminderAppt.type,
                })}
              </pre>
            </div>

            <div className="rounded-lg bg-amber-50 p-2.5 text-[10px] text-amber-800 border border-amber-200">
              <b>Transparency Notice:</b> Clicking opens WhatsApp Web or the WhatsApp app with this pre-filled message. Message is sent directly from your WhatsApp account.
            </div>

            <div className="flex justify-end gap-2 border-t border-slate-100 pt-3">
              <button type="button" className="btn btn-secondary" onClick={() => setReminderAppt(null)}>
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  const msg = getAppointmentReminderTemplate({
                    patientName: reminderAppt.patient,
                    referenceCode: reminderAppt.confirmationCode || reminderAppt.id,
                    clinicName: activeClinic.name,
                    clinicPhone: activeClinic.phone,
                    clinicAddress: activeClinic.address,
                    doctorName: reminderAppt.doctor,
                    date: reminderAppt.date,
                    time: reminderAppt.time,
                    consultationType: reminderAppt.type,
                  })
                  const res = openWhatsAppChat(reminderPhone, msg)
                  if (!res.success) {
                    setReminderError(res.error || 'Please enter a valid phone number.')
                  } else {
                    recordWhatsAppMessage({
                      clinicId: activeClinic.id,
                      appointmentId: reminderAppt.id,
                      patientName: reminderAppt.patient,
                      patientPhone: reminderPhone,
                      doctorName: reminderAppt.doctor,
                      referenceCode: reminderAppt.confirmationCode || reminderAppt.id,
                      type: 'Reminder',
                      status: 'Opened in WhatsApp',
                      date: reminderAppt.date,
                      time: reminderAppt.time,
                      consultationType: reminderAppt.type,
                      text: msg,
                    })
                    setReminderAppt(null)
                  }
                }}
                className="btn !bg-[#25D366] hover:!bg-[#20bd5a] text-white flex items-center gap-1.5 font-semibold"
              >
                <WhatsAppIcon size={14} /> Open WhatsApp to Send
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* WhatsApp Reschedule Notice Modal */}
      {rescheduledNoticeAppt && (
        <Modal
          title="Appointment Rescheduled — Send WhatsApp Update"
          onClose={() => setRescheduledNoticeAppt(null)}
        >
          <div className="space-y-4 text-xs">
            <div className="rounded-lg bg-blue-50 border border-blue-100 p-3 text-blue-900">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={16} className="text-blue-600" />
                <b className="text-xs">Schedule updated in ClinicOS!</b>
              </div>
              <p className="mt-1 text-[11px] text-blue-700">
                Appointment for <b>{rescheduledNoticeAppt.appointment.patient}</b> has been rescheduled to{' '}
                <b>{rescheduledNoticeAppt.newDate} at {rescheduledNoticeAppt.newTime}</b>.
              </p>
            </div>

            {rescheduleNoticeError && (
              <div className="rounded-lg bg-rose-50 border border-rose-200 p-2 text-rose-700 flex items-center gap-2">
                <AlertCircle size={14} className="shrink-0" />
                <span>{rescheduleNoticeError}</span>
              </div>
            )}

            <div>
              <label className="mb-1 block font-semibold text-slate-700">
                Patient Phone Number <span className="text-slate-400 font-normal">(with country code)</span>
              </label>
              <input
                type="tel"
                value={rescheduleNoticePhone}
                onChange={(e) => {
                  setRescheduleNoticePhone(e.target.value)
                  setRescheduleNoticeError('')
                }}
                placeholder="e.g. 14155550123"
                className="form-input !text-xs !py-2"
              />
            </div>

            <div>
              <label className="mb-1 block font-semibold text-slate-700">Rescheduling Message Preview</label>
              <pre className="whitespace-pre-wrap rounded-lg bg-slate-50 border border-slate-200 p-3 text-[11px] font-sans text-slate-700 leading-relaxed max-h-44 overflow-y-auto">
                {getAppointmentRescheduledTemplate({
                  patientName: rescheduledNoticeAppt.appointment.patient,
                  referenceCode: rescheduledNoticeAppt.appointment.confirmationCode || rescheduledNoticeAppt.appointment.id,
                  clinicName: activeClinic.name,
                  clinicPhone: activeClinic.phone,
                  clinicAddress: activeClinic.address,
                  doctorName: rescheduledNoticeAppt.appointment.doctor,
                  newDate: rescheduledNoticeAppt.newDate,
                  newTime: rescheduledNoticeAppt.newTime,
                  consultationType: rescheduledNoticeAppt.appointment.type,
                })}
              </pre>
            </div>

            <div className="flex justify-between items-center border-t border-slate-100 pt-3">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setRescheduledNoticeAppt(null)}
              >
                Skip / Close
              </button>
              <button
                type="button"
                onClick={() => {
                  const msg = getAppointmentRescheduledTemplate({
                    patientName: rescheduledNoticeAppt.appointment.patient,
                    referenceCode: rescheduledNoticeAppt.appointment.confirmationCode || rescheduledNoticeAppt.appointment.id,
                    clinicName: activeClinic.name,
                    clinicPhone: activeClinic.phone,
                    clinicAddress: activeClinic.address,
                    doctorName: rescheduledNoticeAppt.appointment.doctor,
                    newDate: rescheduledNoticeAppt.newDate,
                    newTime: rescheduledNoticeAppt.newTime,
                    consultationType: rescheduledNoticeAppt.appointment.type,
                  })
                  const res = openWhatsAppChat(rescheduleNoticePhone, msg)
                  if (!res.success) {
                    setRescheduleNoticeError(res.error || 'Please enter a valid phone number.')
                  } else {
                    recordWhatsAppMessage({
                      clinicId: activeClinic.id,
                      appointmentId: rescheduledNoticeAppt.appointment.id,
                      patientName: rescheduledNoticeAppt.appointment.patient,
                      patientPhone: rescheduleNoticePhone,
                      doctorName: rescheduledNoticeAppt.appointment.doctor,
                      referenceCode: rescheduledNoticeAppt.appointment.confirmationCode || rescheduledNoticeAppt.appointment.id,
                      type: 'Rescheduled',
                      status: 'Opened in WhatsApp',
                      date: rescheduledNoticeAppt.newDate,
                      time: rescheduledNoticeAppt.newTime,
                      consultationType: rescheduledNoticeAppt.appointment.type,
                      text: msg,
                    })
                    setRescheduledNoticeAppt(null)
                  }
                }}
                className="btn !bg-[#25D366] hover:!bg-[#20bd5a] text-white flex items-center gap-1.5 font-semibold"
              >
                <WhatsAppIcon size={14} /> Send WhatsApp Update
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* WhatsApp Cancellation Notice Modal */}
      {cancelledNoticeAppt && (
        <Modal
          title="Appointment Cancelled — Send WhatsApp Notice"
          onClose={() => setCancelledNoticeAppt(null)}
        >
          <div className="space-y-4 text-xs">
            <div className="rounded-lg bg-rose-50 border border-rose-100 p-3 text-rose-900">
              <div className="flex items-center gap-2">
                <AlertCircle size={16} className="text-rose-600" />
                <b className="text-xs">Appointment cancelled in ClinicOS.</b>
              </div>
              <p className="mt-1 text-[11px] text-rose-700">
                Visit for <b>{cancelledNoticeAppt.appointment.patient}</b> with{' '}
                <b>{cancelledNoticeAppt.appointment.doctor}</b> was cancelled. Reason: {cancelledNoticeAppt.reason}.
              </p>
            </div>

            {cancelNoticeError && (
              <div className="rounded-lg bg-rose-50 border border-rose-200 p-2 text-rose-700 flex items-center gap-2">
                <AlertCircle size={14} className="shrink-0" />
                <span>{cancelNoticeError}</span>
              </div>
            )}

            <div>
              <label className="mb-1 block font-semibold text-slate-700">
                Patient Phone Number <span className="text-slate-400 font-normal">(with country code)</span>
              </label>
              <input
                type="tel"
                value={cancelNoticePhone}
                onChange={(e) => {
                  setCancelNoticePhone(e.target.value)
                  setCancelNoticeError('')
                }}
                placeholder="e.g. 14155550123"
                className="form-input !text-xs !py-2"
              />
            </div>

            <div>
              <label className="mb-1 block font-semibold text-slate-700">Cancellation Message Preview</label>
              <pre className="whitespace-pre-wrap rounded-lg bg-slate-50 border border-slate-200 p-3 text-[11px] font-sans text-slate-700 leading-relaxed max-h-44 overflow-y-auto">
                {getAppointmentCancellationTemplate({
                  patientName: cancelledNoticeAppt.appointment.patient,
                  referenceCode: cancelledNoticeAppt.appointment.confirmationCode || cancelledNoticeAppt.appointment.id,
                  clinicName: activeClinic.name,
                  clinicPhone: activeClinic.phone,
                  doctorName: cancelledNoticeAppt.appointment.doctor,
                  date: cancelledNoticeAppt.appointment.date,
                  time: cancelledNoticeAppt.appointment.time,
                  reason: cancelledNoticeAppt.reason,
                })}
              </pre>
            </div>

            <div className="flex justify-between items-center border-t border-slate-100 pt-3">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setCancelledNoticeAppt(null)}
              >
                Skip / Close
              </button>
              <button
                type="button"
                onClick={() => {
                  const msg = getAppointmentCancellationTemplate({
                    patientName: cancelledNoticeAppt.appointment.patient,
                    referenceCode: cancelledNoticeAppt.appointment.confirmationCode || cancelledNoticeAppt.appointment.id,
                    clinicName: activeClinic.name,
                    clinicPhone: activeClinic.phone,
                    doctorName: cancelledNoticeAppt.appointment.doctor,
                    date: cancelledNoticeAppt.appointment.date,
                    time: cancelledNoticeAppt.appointment.time,
                    reason: cancelledNoticeAppt.reason,
                  })
                  const res = openWhatsAppChat(cancelNoticePhone, msg)
                  if (!res.success) {
                    setCancelNoticeError(res.error || 'Please enter a valid phone number.')
                  } else {
                    recordWhatsAppMessage({
                      clinicId: activeClinic.id,
                      appointmentId: cancelledNoticeAppt.appointment.id,
                      patientName: cancelledNoticeAppt.appointment.patient,
                      patientPhone: cancelNoticePhone,
                      doctorName: cancelledNoticeAppt.appointment.doctor,
                      referenceCode: cancelledNoticeAppt.appointment.confirmationCode || cancelledNoticeAppt.appointment.id,
                      type: 'Cancellation',
                      status: 'Opened in WhatsApp',
                      date: cancelledNoticeAppt.appointment.date,
                      time: cancelledNoticeAppt.appointment.time,
                      consultationType: cancelledNoticeAppt.appointment.type,
                      text: msg,
                    })
                    setCancelledNoticeAppt(null)
                  }
                }}
                className="btn !bg-[#25D366] hover:!bg-[#20bd5a] text-white flex items-center gap-1.5 font-semibold"
              >
                <WhatsAppIcon size={14} /> Send WhatsApp Notice
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* WhatsApp Notify Patient Modal */}
      {notifyAppt && (
        <Modal title={`Notify Patient: ${notifyAppt.patient}`} onClose={() => setNotifyAppt(null)}>
          <div className="space-y-4 text-xs">
            <div className="rounded-lg bg-emerald-50 border border-emerald-100 p-3 text-emerald-900 flex items-start gap-2.5">
              <WhatsAppIcon size={18} className="text-[#25D366] shrink-0 mt-0.5" />
              <div>
                <b className="block">Direct WhatsApp Notification</b>
                <p className="mt-0.5 text-[11px] text-emerald-700">
                  Send a direct message or care instructions to {notifyAppt.patient}.
                </p>
              </div>
            </div>

            {notifyError && (
              <div className="rounded-lg bg-rose-50 border border-rose-200 p-2 text-rose-700 flex items-center gap-2">
                <AlertCircle size={14} className="shrink-0" />
                <span>{notifyError}</span>
              </div>
            )}

            <div>
              <label className="mb-1 block font-semibold text-slate-700">Recipient Phone Number</label>
              <input
                type="tel"
                value={notifyPhone}
                onChange={(e) => {
                  setNotifyPhone(e.target.value)
                  setNotifyError('')
                }}
                className="form-input !text-xs !py-2"
              />
            </div>

            <div>
              <label className="mb-1 block font-semibold text-slate-700">Message Content</label>
              <textarea
                rows={4}
                value={notifyCustomMessage}
                onChange={(e) => setNotifyCustomMessage(e.target.value)}
                className="form-input !text-xs !py-2"
                placeholder="Type message to patient..."
              />
            </div>

            <div className="flex justify-end gap-2 border-t border-slate-100 pt-3">
              <button type="button" className="btn btn-secondary" onClick={() => setNotifyAppt(null)}>
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!notifyCustomMessage.trim()) {
                    setNotifyError('Please enter a message to send.')
                    return
                  }
                  const res = openWhatsAppChat(notifyPhone, notifyCustomMessage)
                  if (!res.success) {
                    setNotifyError(res.error || 'Please enter a valid phone number.')
                  } else {
                    setNotifyAppt(null)
                  }
                }}
                className="btn !bg-[#25D366] hover:!bg-[#20bd5a] text-white flex items-center gap-1.5 font-semibold"
              >
                <WhatsAppIcon size={14} /> Open WhatsApp
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

// ==========================================
// 5. RECEPTIONIST BOOK APPOINTMENT WIZARD
// ==========================================
export function ReceptionistBookAppointmentPage() {
  const { activeClinic, data, receptionistBookAppointment } = useStore()
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const defaultPatientId = searchParams.get('patientId')
  const defaultPatientName = searchParams.get('patientName')

  const [patientId, setPatientId] = useState(defaultPatientId || activeClinic.patients[0]?.id || '')
  const [serviceId, setServiceId] = useState(activeClinic.services[0]?.id || '')
  const [doctorId, setDoctorId] = useState(activeClinic.staff.find((s) => s.role.includes('Dr.'))?.id || '')
  const [type, setType] = useState('In-person Consultation')
  const [date, setDate] = useState('Tomorrow')
  const [time, setTime] = useState('10:00 AM')
  const [notes, setNotes] = useState('')

  const [error, setError] = useState('')
  const [confirmedBooking, setConfirmedBooking] = useState(null)

  const selectedPatient = activeClinic.patients.find((p) => p.id === patientId) || activeClinic.patients[0]
  const selectedDoctor = activeClinic.staff.find((s) => s.id === doctorId)
  const selectedService = activeClinic.services.find((s) => s.id === serviceId)

  const fee = selectedDoctor?.consultationFee || (selectedService ? Number(selectedService.price.replace(/[$₹]/g, '')) : 120)

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:15 AM',
    '01:30 PM', '02:00 PM', '02:45 PM', '03:30 PM', '04:15 PM',
  ]

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!selectedPatient) {
      setError('Please select a registered patient.')
      return
    }
    if (!selectedDoctor) {
      setError('Please select a healthcare provider.')
      return
    }

    const result = receptionistBookAppointment({
      patientId: selectedPatient.id,
      patientName: selectedPatient.name,
      patientEmail: selectedPatient.email,
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      date,
      time,
      type,
      fee,
      notes,
      clinicId: activeClinic.id,
    })

    if (!result.success) {
      setError(result.error)
      return
    }

    setConfirmedBooking(result.appointment)
  }

  if (confirmedBooking) {
    return (
      <div className="content-wrap max-w-2xl">
        <div className="card p-8 text-center shadow-lg">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <CheckCircle2 size={32} />
          </div>
          <h2 className="brand-font mt-3 text-xl font-bold text-slate-800">
            Appointment Booked Successfully
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            Reference: <b>{confirmedBooking.id}</b> · {activeClinic.name}
          </p>

          <div className="my-5 rounded-xl border border-slate-100 bg-slate-50 p-4 text-left text-xs space-y-2">
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-500">Patient:</span>
              <b className="text-slate-800">{confirmedBooking.patient}</b>
            </div>
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-500">Provider:</span>
              <b className="text-slate-800">{confirmedBooking.doctor}</b>
            </div>
            <div className="flex justify-between border-b border-slate-200 pb-2">
              <span className="text-slate-500">Scheduled:</span>
              <b className="text-slate-800">{confirmedBooking.date} at {confirmedBooking.time}</b>
            </div>
            <div className="flex justify-between pt-1">
              <span className="text-slate-500">Consultation Fee:</span>
              <b className="text-slate-800">₹{confirmedBooking.fee}.00</b>
            </div>
          </div>

          {/* WhatsApp Confirmation Action Card */}
          <div className="my-5 rounded-xl border border-emerald-100 bg-emerald-50/70 p-4 text-left">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <WhatsAppIcon size={18} className="text-[#25D366]" />
                <span className="text-xs font-bold text-slate-800">Send WhatsApp Confirmation</span>
              </div>
              <span className="rounded bg-emerald-100 px-2 py-0.5 text-[9px] font-bold text-emerald-800">
                Ready to Send
              </span>
            </div>
            <p className="mt-1 text-[11px] text-slate-600">
              Dispatch a pre-filled confirmation message with clinic details, doctor name, and booking reference directly to the patient's WhatsApp.
            </p>
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={() => {
                  const phone = selectedPatient?.phone || confirmedBooking.patientPhone || ''
                  const message = getBookingConfirmationTemplate({
                    patientName: confirmedBooking.patient,
                    referenceCode: confirmedBooking.id,
                    clinicName: activeClinic.name,
                    clinicLocation: activeClinic.address,
                    clinicPhone: activeClinic.phone,
                    doctorName: confirmedBooking.doctor,
                    consultationType: confirmedBooking.type,
                    date: confirmedBooking.date,
                    time: confirmedBooking.time,
                  })
                  openWhatsAppChat(phone, message)
                }}
                className="btn btn-secondary !border-emerald-300 !bg-white !text-emerald-700 hover:!bg-emerald-50 flex items-center gap-1.5 !py-1.5 text-xs font-semibold"
              >
                <WhatsAppIcon size={14} className="text-[#25D366]" /> Open WhatsApp to Confirm
              </button>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => navigate('/receptionist/appointments')}
              className="btn btn-primary !bg-teal-600 hover:!bg-teal-700"
            >
              View in Appointments List
            </button>
            <button
              onClick={() => navigate('/receptionist/queue')}
              className="btn btn-secondary"
            >
              View Waiting Queue
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="content-wrap max-w-3xl">
      <PageHeading
        eyebrow="Front Desk Scheduler"
        title="Book Appointment"
        description={`Schedule patient visits for ${activeClinic.name} with real-time double-booking prevention.`}
      />

      {error && (
        <div className="mb-5 flex items-start gap-2 rounded-xl bg-rose-50 p-3.5 text-xs text-rose-700 border border-rose-200">
          <AlertCircle size={16} className="mt-0.5 shrink-0 text-rose-600" />
          <div>{error}</div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="card p-6 space-y-5 text-xs">
        {/* Step 1: Patient Selection */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <span className="font-semibold text-slate-700">1. Select Patient *</span>
            <Link to="/receptionist/patients/new" className="text-[11px] font-semibold text-blue-600 hover:underline">
              + Register New Patient
            </Link>
          </div>
          <select
            value={patientId}
            onChange={(e) => setPatientId(e.target.value)}
            className="form-input !text-xs"
            required
          >
            {activeClinic.patients.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.phone}) — {p.id}
              </option>
            ))}
          </select>
        </div>

        {/* Step 2: Service & Doctor */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1 block font-semibold text-slate-700">2. Select Service</span>
            <select
              value={serviceId}
              onChange={(e) => setServiceId(e.target.value)}
              className="form-input !text-xs"
            >
              {activeClinic.services.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name} ({s.duration} · {s.price})
                </option>
              ))}
            </select>
          </label>

          <label className="block">
            <span className="mb-1 block font-semibold text-slate-700">3. Select Doctor *</span>
            <select
              value={doctorId}
              onChange={(e) => setDoctorId(e.target.value)}
              className="form-input !text-xs"
              required
            >
              {activeClinic.staff
                .filter((s) => s.role.toLowerCase().includes('dr.'))
                .map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.name} — {d.specialty || d.role} (${d.consultationFee || 120})
                  </option>
                ))}
            </select>
          </label>
        </div>

        {/* Step 3: Consultation Type */}
        <div>
          <span className="mb-2 block font-semibold text-slate-700">4. Consultation Type</span>
          <div className="grid grid-cols-3 gap-2">
            {['In-person Consultation', 'Video Telehealth', 'Home Visit'].map((t) => (
              <button
                type="button"
                key={t}
                onClick={() => setType(t)}
                className={`rounded-lg border p-2 text-center transition ${type === t ? 'border-teal-600 bg-teal-50 text-teal-800 font-semibold ring-2 ring-teal-100' : 'border-slate-200'}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Step 4: Date & Slot */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1 block font-semibold text-slate-700">5. Select Date</span>
            <select
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="form-input !text-xs"
            >
              <option value="Today">Today</option>
              <option value="Tomorrow">Tomorrow</option>
              <option value="Oct 28, 2026">Wednesday, Oct 28</option>
              <option value="Oct 29, 2026">Thursday, Oct 29</option>
              <option value="Oct 30, 2026">Friday, Oct 30</option>
            </select>
          </label>

          <div>
            <span className="mb-1 block font-semibold text-slate-700">6. Available Slot</span>
            <select
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="form-input !text-xs"
            >
              {timeSlots.map((slot) => (
                <option key={slot} value={slot}>{slot}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Step 5: Notes */}
        <label className="block">
          <span className="mb-1 block font-semibold text-slate-700">Notes / Reason for visit</span>
          <input
            type="text"
            placeholder="e.g. Follow-up consultation, routine checkup, ear pain..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="form-input !text-xs"
          />
        </label>

        {/* Fee preview */}
        <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 flex justify-between items-center text-xs">
          <div>
            <span className="text-slate-500">Applicable Consultation Fee:</span>
            <div className="text-[10px] text-slate-400">Payable at clinic or online via patient portal</div>
          </div>
          <b className="text-base text-slate-800">₹{fee}.00</b>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => navigate('/receptionist/appointments')}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary !bg-teal-600 hover:!bg-teal-700">
            <CalendarCheck2 size={15} /> Confirm Appointment
          </button>
        </div>
      </form>
    </div>
  )
}

// ==========================================
// 6. PATIENT CHECK-IN & WAITING QUEUE
// ==========================================
export function ReceptionistQueuePage() {
  const { activeClinic, checkInPatient, updateAppointmentQueueStatus } = useStore()
  const [filterDoctor, setFilterDoctor] = useState('All')
  const [filterStatus, setFilterStatus] = useState('All')

  const appointments = activeClinic.appointments || []
  const todayAppointments = appointments.filter((a) => a.date === 'Today' || a.date === 'today')

  const doctors = activeClinic.staff.filter((s) => s.role.toLowerCase().includes('dr.'))

  const queueList = todayAppointments.filter((a) => {
    const matchesDoc = filterDoctor === 'All' || a.doctor === filterDoctor
    const matchesStatus = filterStatus === 'All' || a.status === filterStatus
    return matchesDoc && matchesStatus
  })

  const waitingCount = todayAppointments.filter((a) => a.status === 'Checked in' || a.status === 'Waiting').length
  const inProgressCount = todayAppointments.filter((a) => a.status === 'In Progress').length
  const completedCount = todayAppointments.filter((a) => a.status === 'Completed').length

  return (
    <div className="content-wrap">
      <PageHeading
        eyebrow="Front Desk Queue Management"
        title="Check-In & Waiting Queue"
        description={`Live patient arrival, check-in, and waiting queue tracking for ${activeClinic.name}.`}
      />

      {/* Metrics Row */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-4">
        <StatCard label="Today's Appointments" value={todayAppointments.length} icon={CalendarDays} tone="blue" />
        <StatCard label="Currently Waiting" value={waitingCount} icon={Clock} tone="teal" detail="In reception lounge" />
        <StatCard label="With Doctor Now" value={inProgressCount} icon={Stethoscope} tone="purple" detail="In consultation" />
        <StatCard label="Completed Today" value={completedCount} icon={CheckCircle2} tone="green" />
      </div>

      {/* Queue Filter Bar */}
      <div className="mb-6 card p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3 text-xs">
          <label className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-600">Provider:</span>
            <select
              value={filterDoctor}
              onChange={(e) => setFilterDoctor(e.target.value)}
              className="form-input !py-1 !text-xs !w-auto"
            >
              <option value="All">All Providers</option>
              {doctors.map((d) => (
                <option key={d.id} value={d.name}>{d.name}</option>
              ))}
            </select>
          </label>

          <label className="flex items-center gap-1.5">
            <span className="font-semibold text-slate-600">Status:</span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="form-input !py-1 !text-xs !w-auto"
            >
              <option value="All">All Statuses</option>
              <option value="Scheduled">Scheduled</option>
              <option value="Checked in">Checked in / Waiting</option>
              <option value="In Progress">In Progress</option>
              <option value="Completed">Completed</option>
              <option value="No-show">No-show</option>
            </select>
          </label>
        </div>

        <span className="text-xs text-slate-400">
          {queueList.length} patient(s) in queue view
        </span>
      </div>

      {/* Queue Items */}
      <Panel title="Today's Patient Queue" subtitle="Arrival and consultation status for today">
        {queueList.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {queueList.map((item, index) => (
              <div key={item.id} className="flex flex-wrap items-center justify-between gap-4 py-3.5 first:pt-0 last:pb-0">
                <div className="flex items-center gap-3 min-w-[220px]">
                  <span className={`flex h-8 w-8 items-center justify-center rounded-lg text-xs font-bold ${item.status === 'Checked in' || item.status === 'Waiting' ? 'bg-teal-600 text-white' : item.status === 'In Progress' ? 'bg-indigo-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                    #{index + 1}
                  </span>
                  <div>
                    <b className="text-xs text-slate-800">{item.patient}</b>
                    <div className="text-[10px] text-slate-400">
                      Ref: {item.id} · Scheduled {item.time} · {item.type}
                    </div>
                  </div>
                </div>

                <div className="text-xs text-slate-600 min-w-[140px]">
                  <span className="text-[10px] text-slate-400 block">Attending Doctor:</span>
                  <b>{item.doctor}</b>
                </div>

                <div className="text-xs text-slate-600 min-w-[110px]">
                  <span className="text-[10px] text-slate-400 block">Check-in time:</span>
                  <span>{item.checkedInAt || 'Not checked in yet'}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Badge>{item.status}</Badge>

                  {/* Actions depending on state */}
                  {item.status !== 'Checked in' && item.status !== 'Waiting' && item.status !== 'In Progress' && item.status !== 'Completed' && item.status !== 'Cancelled' && (
                    <button
                      onClick={() => checkInPatient(item.id)}
                      className="btn btn-primary !bg-teal-600 hover:!bg-teal-700 !py-1 !text-xs"
                    >
                      <UserCheck size={13} /> Check In
                    </button>
                  )}

                  {(item.status === 'Checked in' || item.status === 'Waiting') && (
                    <button
                      onClick={() => updateAppointmentQueueStatus(item.id, 'In Progress')}
                      className="btn btn-secondary !py-1 !text-xs text-indigo-700 hover:bg-indigo-50 font-semibold"
                    >
                      Send to Doctor
                    </button>
                  )}

                  {item.status === 'In Progress' && (
                    <button
                      onClick={() => updateAppointmentQueueStatus(item.id, 'Completed')}
                      className="btn btn-secondary !py-1 !text-xs text-emerald-700 hover:bg-emerald-50 font-semibold"
                    >
                      <Check size={13} /> Mark Completed
                    </button>
                  )}

                  {item.status !== 'Completed' && item.status !== 'Cancelled' && item.status !== 'No-show' && (
                    <button
                      onClick={() => updateAppointmentQueueStatus(item.id, 'No-show')}
                      className="btn btn-ghost !py-1 !text-xs text-rose-600 hover:bg-rose-50"
                    >
                      No-show
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-xs text-slate-400">
            No appointments found in the queue matching selected filters.
          </div>
        )}
      </Panel>
    </div>
  )
}

// ==========================================
// 7. DOCTOR AVAILABILITY DIRECTORY
// ==========================================
export function ReceptionistDoctorsPage() {
  const { activeClinic } = useStore()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [specialtyFilter, setSpecialtyFilter] = useState('All')

  const doctors = activeClinic.staff.filter(
    (s) => s.role.toLowerCase().includes('dr.') || s.specialty
  )

  const appointments = activeClinic.appointments || []

  const specialties = ['All', 'Family Medicine', 'Pediatrics', 'Internal Medicine', 'Cardiology', 'Integrative Medicine', 'Dermatology']

  const filtered = doctors.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(search.toLowerCase()) ||
      doc.specialty?.toLowerCase().includes(search.toLowerCase()) ||
      doc.role?.toLowerCase().includes(search.toLowerCase())

    const matchesSpecialty = specialtyFilter === 'All' || doc.specialty?.toLowerCase().includes(specialtyFilter.toLowerCase())
    return matchesSearch && matchesSpecialty
  })

  return (
    <div className="content-wrap">
      <PageHeading
        eyebrow="Clinical Staff Scheduling"
        title="Doctor Availability & Roster"
        description={`Working schedules, fees, and appointment load for healthcare providers at ${activeClinic.name}.`}
      />

      {/* Filter Bar */}
      <div className="mb-6 card p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search doctors by name or specialty..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-input !pl-8 !py-1.5 !text-xs !w-64"
            />
          </div>

          <select
            value={specialtyFilter}
            onChange={(e) => setSpecialtyFilter(e.target.value)}
            className="form-input !py-1.5 !text-xs !w-auto"
          >
            {specialties.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>

        <span className="text-xs text-slate-400">{filtered.length} doctors found</span>
      </div>

      {/* Doctors Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
        {filtered.map((doc) => {
          const docAppointmentsToday = appointments.filter(
            (a) => (a.doctorId === doc.id || a.doctor === doc.name) && (a.date === 'Today' || a.date === 'today') && a.status !== 'Cancelled'
          )
          return (
            <div key={doc.id} className="card p-5 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-xs font-bold text-indigo-700">
                    {doc.initials}
                  </span>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800">{doc.name}</h3>
                    <div className="text-xs font-medium text-emerald-700">{doc.specialty || doc.role}</div>
                  </div>
                </div>
                <Badge tone="green">{doc.status}</Badge>
              </div>

              <div className="space-y-1.5 rounded-lg bg-slate-50 p-3 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-400">Clinic Working Hours:</span>
                  <b className="text-slate-700">09:00 AM – 05:00 PM</b>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Consultation Fee:</span>
                  <b className="text-slate-800">₹{doc.consultationFee || 120}.00</b>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Today's Patient Load:</span>
                  <b className="text-blue-700">{docAppointmentsToday.length} visit(s) scheduled</b>
                </div>
              </div>

              <p className="text-[11px] text-slate-500 leading-relaxed line-clamp-2">
                {doc.bio || 'Attending physician providing comprehensive patient consultations and care plans.'}
              </p>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[10px] text-slate-400">Languages: {(doc.languages || ['English']).join(', ')}</span>
                <button
                  onClick={() => navigate(`/receptionist/book-appointment?doctorId=${doc.id}`)}
                  className="btn btn-secondary !py-1 !text-xs font-semibold text-teal-700"
                >
                  <CalendarPlus size={13} /> Book Slot
                </button>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ==========================================
// 8. RECEPTIONIST BILLING & INVOICES
// ==========================================
export function ReceptionistBillingPage() {
  const { activeClinic, data, receptionistCreateInvoice, receptionistRecordPayment } = useStore()
  const [activeInvoiceModal, setActiveInvoiceModal] = useState(null)
  const [createInvoiceModal, setCreateInvoiceModal] = useState(false)
  const [recordPaymentModal, setRecordPaymentModal] = useState(null)

  // Payment form state
  const [paymentAmount, setPaymentAmount] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('Front-Desk Card (POS)')

  // Create invoice form state
  const [invoicePatientId, setInvoicePatientId] = useState(activeClinic.patients[0]?.id || '')
  const [invoiceServiceId, setInvoiceServiceId] = useState(activeClinic.services[0]?.id || '')
  const [discountAmount, setDiscountAmount] = useState('0')

  const invoices = useMemo(() => {
    return (data.patientInvoices || []).filter(
      (inv) => inv.clinicId === activeClinic.id || inv.clinicName === activeClinic.name
    )
  }, [data.patientInvoices, activeClinic])

  const totalBilled = invoices.reduce((sum, inv) => sum + (inv.totalAmount || 0), 0)
  const totalCollected = invoices.reduce((sum, inv) => sum + (inv.amountPaid || 0), 0)
  const totalPending = invoices.reduce((sum, inv) => sum + (inv.outstandingBalance || 0), 0)

  const handleCreateInvoiceSubmit = (e) => {
    e.preventDefault()
    const patient = activeClinic.patients.find((p) => p.id === invoicePatientId) || activeClinic.patients[0]
    const service = activeClinic.services.find((s) => s.id === invoiceServiceId) || activeClinic.services[0]
    const servicePrice = Number(service.price.replace(/[$₹]/g, '')) || 120

    receptionistCreateInvoice({
      patientId: patient.id,
      patientName: patient.name,
      patientEmail: patient.email,
      clinicId: activeClinic.id,
      items: [
        { description: service.name, quantity: 1, unitPrice: servicePrice, total: servicePrice },
      ],
      discount: Number(discountAmount) || 0,
      tax: 0,
    })

    setCreateInvoiceModal(false)
  }

  const handlePaymentSubmit = (e) => {
    e.preventDefault()
    if (!recordPaymentModal) return

    const res = receptionistRecordPayment(recordPaymentModal.id, paymentMethod, paymentAmount)
    if (!res.success) {
      alert(res.error)
      return
    }
    setRecordPaymentModal(null)
    setPaymentAmount('')
  }

  return (
    <div className="content-wrap">
      <PageHeading
        eyebrow="Front Desk Cashier & Finance"
        title="Billing & Invoices"
        description={`Generate service bills, record in-person patient payments, and issue official receipts for ${activeClinic.name}.`}
        action={
          <PrimaryButton onClick={() => setCreateInvoiceModal(true)} icon={Plus}>
            Generate New Invoice
          </PrimaryButton>
        }
      />

      {/* Metrics Row */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Total Invoiced" value={`₹${totalBilled}.00`} icon={CreditCard} tone="blue" />
        <StatCard label="Payments Collected" value={`₹${totalCollected}.00`} icon={CheckCircle2} tone="green" />
        <StatCard label="Outstanding Balance" value={`₹${totalPending}.00`} icon={Receipt} tone="orange" detail="Pending patient collection" />
      </div>

      {/* Invoices List */}
      <Panel title="Clinic Invoices" subtitle="Itemized bills issued to patients">
        <DataTable
          columns={[
            {
              key: 'id',
              label: 'Invoice #',
              render: (value, row) => (
                <button
                  onClick={() => setActiveInvoiceModal(row)}
                  className="font-bold text-blue-700 hover:underline"
                >
                  {value}
                </button>
              ),
            },
            { key: 'patientName', label: 'Patient Name' },
            { key: 'date', label: 'Invoice Date' },
            {
              key: 'totalAmount',
              label: 'Total',
              render: (v) => <b>₹${v}.00</b>,
            },
            {
              key: 'amountPaid',
              label: 'Paid',
              render: (v) => <span className="text-emerald-700 font-medium">₹${v}.00</span>,
            },
            {
              key: 'outstandingBalance',
              label: 'Balance',
              render: (v) => <b className={v > 0 ? 'text-amber-700' : 'text-slate-400'}>₹${v}.00</b>,
            },
            {
              key: 'paymentStatus',
              label: 'Status',
              render: (v) => <Badge tone={v === 'Paid' ? 'green' : 'amber'}>{v}</Badge>,
            },
            {
              key: 'actions',
              label: 'Actions',
              render: (_, row) => (
                <div className="flex gap-2">
                  <button
                    onClick={() => setActiveInvoiceModal(row)}
                    className="btn btn-secondary !py-1 !text-[11px]"
                  >
                    View Receipt
                  </button>
                  {row.paymentStatus !== 'Paid' && (
                    <button
                      onClick={() => {
                        setRecordPaymentModal(row)
                        setPaymentAmount(String(row.outstandingBalance))
                      }}
                      className="btn btn-primary !bg-teal-600 hover:!bg-teal-700 !py-1 !text-[11px]"
                    >
                      Record Payment
                    </button>
                  )}
                </div>
              ),
            },
          ]}
          rows={invoices}
          searchPlaceholder="Search invoices by number or patient name..."
        />
      </Panel>

      {/* Generate Invoice Modal */}
      {createInvoiceModal && (
        <Modal title="Generate Clinic Invoice" onClose={() => setCreateInvoiceModal(false)}>
          <form className="space-y-4 text-xs" onSubmit={handleCreateInvoiceSubmit}>
            <label className="block">
              <span className="mb-1 block font-semibold text-slate-700">Patient</span>
              <select
                value={invoicePatientId}
                onChange={(e) => setInvoicePatientId(e.target.value)}
                className="form-input !text-xs"
                required
              >
                {activeClinic.patients.map((p) => (
                  <option key={p.id} value={p.id}>{p.name} ({p.phone})</option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-1 block font-semibold text-slate-700">Service / Treatment</span>
              <select
                value={invoiceServiceId}
                onChange={(e) => setInvoiceServiceId(e.target.value)}
                className="form-input !text-xs"
                required
              >
                {activeClinic.services.map((s) => (
                  <option key={s.id} value={s.id}>{s.name} — {s.price}</option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="mb-1 block font-semibold text-slate-700">Discount ($)</span>
              <input
                type="number"
                min="0"
                value={discountAmount}
                onChange={(e) => setDiscountAmount(e.target.value)}
                className="form-input !text-xs"
                placeholder="0"
              />
            </label>

            <div className="flex justify-end gap-2 border-t border-slate-100 pt-3">
              <button type="button" className="btn btn-secondary" onClick={() => setCreateInvoiceModal(false)}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary !bg-teal-600 hover:!bg-teal-700">
                Generate Invoice
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Record In-Person Payment Modal */}
      {recordPaymentModal && (
        <Modal title={`Record Payment: ${recordPaymentModal.id}`} onClose={() => setRecordPaymentModal(null)}>
          <form className="space-y-4 text-xs" onSubmit={handlePaymentSubmit}>
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-3 space-y-1">
              <div>Patient: <b>{recordPaymentModal.patientName}</b></div>
              <div>Total Invoice: <b>₹${recordPaymentModal.totalAmount}.00</b></div>
              <div className="text-amber-800 font-bold">Outstanding Balance: ₹${recordPaymentModal.outstandingBalance}.00</div>
            </div>

            <label className="block">
              <span className="mb-1 block font-semibold text-slate-700">Payment Amount (₹)</span>
              <input
                type="number"
                step="any"
                min="1"
                max={recordPaymentModal.outstandingBalance}
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                className="form-input !text-xs"
                required
              />
            </label>

            <label className="block">
              <span className="mb-1 block font-semibold text-slate-700">Payment Method</span>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="form-input !text-xs"
              >
                <option>Front-Desk Card (POS Terminal)</option>
                <option>Cash (Front Desk)</option>
                <option>Insurance Co-Pay</option>
                <option>Bank Transfer / Cheque</option>
              </select>
            </label>

            <div className="flex justify-end gap-2 border-t border-slate-100 pt-3">
              <button type="button" className="btn btn-secondary" onClick={() => setRecordPaymentModal(null)}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary !bg-teal-600 hover:!bg-teal-700">
                Confirm & Record Payment
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* View Invoice Modal */}
      {activeInvoiceModal && (
        <Modal title={`Invoice Details · ${activeInvoiceModal.id}`} onClose={() => setActiveInvoiceModal(null)} wide>
          <div className="p-2 space-y-4 text-xs text-slate-800">
            <div className="flex items-start justify-between border-b border-slate-200 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900">{activeInvoiceModal.clinicName}</h3>
                <span className="text-[10px] text-slate-400">Official Patient Billing Receipt</span>
              </div>
              <div className="text-right">
                <Badge tone={activeInvoiceModal.paymentStatus === 'Paid' ? 'green' : 'amber'}>
                  {activeInvoiceModal.paymentStatus}
                </Badge>
                <div className="text-[10px] text-slate-400 mt-0.5">Date: {activeInvoiceModal.date}</div>
              </div>
            </div>

            <div>
              <b className="mb-1.5 block font-semibold text-slate-700">Billed to:</b>
              <div className="rounded-lg bg-slate-50 p-2.5">
                <div>Patient Name: <b>{activeInvoiceModal.patientName}</b></div>
                <div className="text-[10px] text-slate-400">Patient ID: {activeInvoiceModal.patientId}</div>
              </div>
            </div>

            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-200 text-[10px] uppercase text-slate-400">
                  <th className="pb-1.5">Description</th>
                  <th className="pb-1.5 text-center">Qty</th>
                  <th className="pb-1.5 text-right">Price</th>
                  <th className="pb-1.5 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(activeInvoiceModal.items || []).map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-2">{item.description}</td>
                    <td className="py-2 text-center">{item.quantity}</td>
                    <td className="py-2 text-right">₹{item.unitPrice}.00</td>
                    <td className="py-2 text-right">₹{item.total}.00</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="border-t border-slate-200 pt-3 space-y-1 text-right">
              <div className="flex justify-between">
                <span>Total Amount:</span>
                <b>₹{activeInvoiceModal.totalAmount}.00</b>
              </div>
              <div className="flex justify-between text-emerald-700">
                <span>Amount Paid:</span>
                <b>₹{activeInvoiceModal.amountPaid}.00</b>
              </div>
              <div className="flex justify-between font-bold text-amber-800">
                <span>Outstanding Balance:</span>
                <b>₹{activeInvoiceModal.outstandingBalance}.00</b>
              </div>
            </div>

            {activeInvoiceModal.transactionId && (
              <div className="rounded-lg bg-slate-50 p-2.5 text-[11px] text-slate-600">
                <span>Receipt Ref: <b>{activeInvoiceModal.transactionId}</b></span>
                <span className="ml-3">Method: <b>{activeInvoiceModal.paymentMethod}</b></span>
                <span className="ml-3">Recorded: <b>{activeInvoiceModal.paidAt}</b></span>
              </div>
            )}

            <div className="flex justify-end gap-2 border-t border-slate-100 pt-3">
              <button className="btn btn-secondary" onClick={() => window.print()}>
                <Printer size={13} /> Print Receipt
              </button>
              <button className="btn btn-primary" onClick={() => setActiveInvoiceModal(null)}>
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

// ==========================================
// 9. RECEPTIONIST NOTIFICATIONS
// ==========================================
export function ReceptionistNotificationsPage() {
  const { data, markReceptionistNotificationRead, markAllReceptionistNotificationsRead, activeClinic } = useStore()
  const navigate = useNavigate()
  const [filter, setFilter] = useState('All')

  const notifications = useMemo(() => {
    return (data.receptionistNotifications || []).filter(
      (n) => !n.clinicId || n.clinicId === activeClinic.id
    )
  }, [data.receptionistNotifications, activeClinic])

  const filtered = filter === 'Unread' ? notifications.filter((n) => !n.read) : notifications

  return (
    <div className="content-wrap">
      <PageHeading
        eyebrow="Front Desk Communications"
        title="Reception Notifications"
        description={`Operational alerts, patient check-ins, and schedule updates for ${activeClinic.name}.`}
        action={
          <button
            onClick={markAllReceptionistNotificationsRead}
            className="btn btn-secondary !text-xs"
          >
            <Check size={14} /> Mark All as Read
          </button>
        }
      />

      <div className="mb-4 flex gap-2 border-b border-slate-200 pb-2">
        {['All', 'Unread'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${filter === f ? 'bg-blue-600 text-white' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            {f} {f === 'Unread' ? `(${notifications.filter((n) => !n.read).length})` : `(${notifications.length})`}
          </button>
        ))}
      </div>

      {filtered.length > 0 ? (
        <div className="space-y-3">
          {filtered.map((notif) => (
            <div
              key={notif.id}
              onClick={() => {
                markReceptionistNotificationRead(notif.id)
                if (notif.link) navigate(notif.link)
              }}
              className={`flex items-start gap-4 rounded-xl border p-4 transition cursor-pointer hover:shadow-sm ${notif.read ? 'border-slate-100 bg-white' : 'border-teal-200 bg-teal-50/40'}`}
            >
              <span className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${notif.read ? 'bg-slate-100 text-slate-500' : 'bg-teal-600 text-white'}`}>
                {notif.type?.includes('check_in') ? (
                  <UserCheck size={16} />
                ) : notif.type?.includes('patient') ? (
                  <UserPlus size={16} />
                ) : notif.type?.includes('payment') ? (
                  <Receipt size={16} />
                ) : (
                  <Bell size={16} />
                )}
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-xs font-bold text-slate-800">{notif.title}</h4>
                  <span className="text-[10px] text-slate-400">{notif.date}</span>
                </div>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed">{notif.message}</p>
                {notif.link && (
                  <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-teal-700">
                    Open section <ChevronRight size={12} />
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card py-16 text-center">
          <Bell size={28} className="mx-auto text-slate-300" />
          <h3 className="mt-3 text-sm font-semibold text-slate-700">No notifications</h3>
          <p className="mt-1 text-xs text-slate-400">Front desk is all caught up!</p>
        </div>
      )}
    </div>
  )
}

// ==========================================
// 10. RECEPTIONIST PROFILE
// ==========================================
export function ReceptionistProfilePage() {
  const { currentUser, activeClinic, updateReceptionistProfile } = useStore()

  const [form, setForm] = useState({
    name: currentUser?.name || 'Ava Robinson',
    email: currentUser?.email || 'ava@sunrisefamily.com',
    phone: currentUser?.phone || '+1 (415) 555-0184',
    shift: currentUser?.shift || 'Monday – Friday · 08:00 AM – 04:30 PM',
  })

  const [checkInAlerts, setCheckInAlerts] = useState(true)
  const [scheduleAlerts, setScheduleAlerts] = useState(true)

  const handleSubmit = (e) => {
    e.preventDefault()
    updateReceptionistProfile(form)
  }

  return (
    <div className="content-wrap max-w-4xl">
      <PageHeading
        eyebrow="Staff Directory"
        title="Receptionist Profile & Preferences"
        description="View your active staff credentials, front-desk shift assignments, and operational alert preferences."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
        <Panel title="Personal & Contact Details" subtitle="Permitted front-desk coordinator details">
          <form className="space-y-4 text-xs" onSubmit={handleSubmit}>
            <div className="rounded-md bg-blue-50 p-2.5 text-[11px] text-blue-800">
              <b>Role Enforcement:</b> Receptionist role and clinic memberships are managed by Clinic Administrators. You can update your contact phone and personal preferences below.
            </div>

            <label className="block">
              <span className="mb-1 block font-semibold text-slate-600">Full Name</span>
              <input
                type="text"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="form-input !text-xs"
                required
              />
            </label>

            <div className="grid grid-cols-2 gap-3">
              <label className="block">
                <span className="mb-1 block font-semibold text-slate-600">Work Email</span>
                <input
                  type="email"
                  value={form.email}
                  disabled
                  className="form-input !text-xs !bg-slate-50 text-slate-500"
                />
              </label>

              <label className="block">
                <span className="mb-1 block font-semibold text-slate-600">Contact Phone</span>
                <input
                  type="text"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="form-input !text-xs"
                  required
                />
              </label>
            </div>

            <label className="block">
              <span className="mb-1 block font-semibold text-slate-600">Assigned Shift Schedule</span>
              <input
                type="text"
                value={form.shift}
                onChange={(e) => setForm({ ...form, shift: e.target.value })}
                className="form-input !text-xs"
              />
            </label>

            <div className="pt-2">
              <button type="submit" className="btn btn-primary !bg-teal-600 hover:!bg-teal-700">
                Save Profile Updates
              </button>
            </div>
          </form>
        </Panel>

        <div className="space-y-6">
          <Panel title="Assigned Clinic Branch" subtitle="Authorized workspace access">
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-3.5 text-xs space-y-1.5">
              <div className="flex justify-between items-center">
                <b className="text-slate-800">{activeClinic.name}</b>
                <Badge tone="green">Active Branch</Badge>
              </div>
              <div className="text-slate-500">{activeClinic.address}</div>
              <div className="text-slate-400 text-[10px]">Clinic Owner: {activeClinic.owner}</div>
            </div>
          </Panel>

          <Panel title="Notification Alerts" subtitle="Operational sound and banner settings">
            <div className="space-y-3 text-xs">
              <label className="flex items-center justify-between">
                <span>Patient arrival / check-in sounds</span>
                <input
                  type="checkbox"
                  checked={checkInAlerts}
                  onChange={(e) => setCheckInAlerts(e.target.checked)}
                  className="accent-teal-600"
                />
              </label>
              <label className="flex items-center justify-between">
                <span>Doctor schedule adjustment alerts</span>
                <input
                  type="checkbox"
                  checked={scheduleAlerts}
                  onChange={(e) => setScheduleAlerts(e.target.checked)}
                  className="accent-teal-600"
                />
              </label>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  )
}

// ==========================================
// 8. RECEPTIONIST WHATSAPP MESSAGING CENTER
// ==========================================
export function ReceptionistWhatsAppPage() {
  const {
    activeClinic,
    data,
    recordWhatsAppMessage,
    updateWhatsAppMessage,
    markWhatsAppMessageOpened,
    deleteWhatsAppMessage,
    notify,
  } = useStore()
  const navigate = useNavigate()

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All')

  // Composer Modal State
  const [composerOpen, setComposerOpen] = useState(false)
  const [composerPatientId, setComposerPatientId] = useState('')
  const [composerPatientName, setComposerPatientName] = useState('')
  const [composerPhone, setComposerPhone] = useState('')
  const [composerDoctorName, setComposerDoctorName] = useState(
    activeClinic.staff.find((s) => s.role.includes('Dr.'))?.name || activeClinic.owner || 'Dr. Maya Patel'
  )
  const [composerType, setComposerType] = useState('Confirmation')
  const [composerText, setComposerText] = useState('')
  const [composerError, setComposerError] = useState('')

  // Preview Modal State
  const [previewMsg, setPreviewMsg] = useState(null)
  const [previewPhone, setPreviewPhone] = useState('')
  const [previewError, setPreviewError] = useState('')
  const [previewCopied, setPreviewCopied] = useState(false)

  const messages = (data.whatsappMessages || []).filter(
    (m) => !m.clinicId || m.clinicId === activeClinic.id
  )

  const openedCount = messages.filter((m) => m.status === 'Opened in WhatsApp').length
  const readyCount = messages.filter((m) => m.status === 'Ready to Send').length
  const draftCount = messages.filter((m) => m.status === 'Draft').length

  const filtered = messages.filter((m) => {
    const q = search.toLowerCase().trim()
    const matchesSearch =
      !q ||
      m.patientName?.toLowerCase().includes(q) ||
      m.patientPhone?.toLowerCase().includes(q) ||
      m.doctorName?.toLowerCase().includes(q) ||
      m.referenceCode?.toLowerCase().includes(q) ||
      m.text?.toLowerCase().includes(q)

    const matchesStatus = statusFilter === 'All' || m.status === statusFilter
    const matchesType = typeFilter === 'All' || m.type === typeFilter

    return matchesSearch && matchesStatus && matchesType
  })

  // Open Composer with default template
  const handleOpenComposer = () => {
    const firstPatient = activeClinic.patients[0]
    setComposerPatientId(firstPatient?.id || '')
    setComposerPatientName(firstPatient?.name || '')
    setComposerPhone(firstPatient?.phone || '')
    setComposerType('Confirmation')
    setComposerError('')

    const initialText = getBookingConfirmationTemplate({
      patientName: firstPatient?.name || 'Patient',
      referenceCode: `CONF-${Math.floor(100000 + Math.random() * 900000)}`,
      clinicName: activeClinic.name,
      clinicLocation: activeClinic.address,
      clinicPhone: activeClinic.phone,
      doctorName: composerDoctorName,
      consultationType: 'In-Person Consultation',
      date: 'Today',
      time: '10:00 AM',
    })
    setComposerText(initialText)
    setComposerOpen(true)
  }

  // Handle template switch in composer
  const handleTemplateChange = (newType, patient, doc) => {
    setComposerType(newType)
    const pName = patient?.name || composerPatientName || 'Patient'
    const dName = doc || composerDoctorName

    let text = ''
    if (newType === 'Confirmation') {
      text = getBookingConfirmationTemplate({
        patientName: pName,
        referenceCode: `CONF-${Math.floor(100000 + Math.random() * 900000)}`,
        clinicName: activeClinic.name,
        clinicLocation: activeClinic.address,
        clinicPhone: activeClinic.phone,
        doctorName: dName,
        consultationType: 'In-Person Consultation',
        date: 'Today',
        time: '10:00 AM',
      })
    } else if (newType === 'Reminder') {
      text = getAppointmentReminderTemplate({
        patientName: pName,
        referenceCode: `CONF-${Math.floor(100000 + Math.random() * 900000)}`,
        clinicName: activeClinic.name,
        clinicPhone: activeClinic.phone,
        clinicAddress: activeClinic.address,
        doctorName: dName,
        date: 'Today',
        time: '10:00 AM',
        consultationType: 'In-Person Consultation',
      })
    } else if (newType === 'Rescheduled') {
      text = getAppointmentRescheduledTemplate({
        patientName: pName,
        referenceCode: `CONF-${Math.floor(100000 + Math.random() * 900000)}`,
        clinicName: activeClinic.name,
        clinicPhone: activeClinic.phone,
        clinicAddress: activeClinic.address,
        doctorName: dName,
        newDate: 'Tomorrow',
        newTime: '11:15 AM',
        consultationType: 'In-Person Consultation',
      })
    } else if (newType === 'Cancellation') {
      text = getAppointmentCancellationTemplate({
        patientName: pName,
        referenceCode: `CONF-${Math.floor(100000 + Math.random() * 900000)}`,
        clinicName: activeClinic.name,
        clinicPhone: activeClinic.phone,
        doctorName: dName,
        date: 'Today',
        time: '10:00 AM',
        reason: 'Patient requested cancellation',
      })
    } else {
      text = `Hello ${pName}, this is ${activeClinic.name} reaching out regarding your upcoming care. Please contact us if you need any assistance.`
    }
    setComposerText(text)
  }

  const handleComposerSubmit = (targetStatus) => {
    setComposerError('')
    if (!composerPhone.trim()) {
      setComposerError('Please provide a valid patient phone number.')
      return
    }

    const check = sanitizeWhatsAppPhone(composerPhone)
    if (!check.valid) {
      setComposerError(check.error)
      return
    }

    if (!composerText.trim()) {
      setComposerError('Please enter message text.')
      return
    }

    const newMsg = recordWhatsAppMessage({
      clinicId: activeClinic.id,
      patientName: composerPatientName.trim() || 'Patient',
      patientPhone: composerPhone.trim(),
      doctorName: composerDoctorName,
      referenceCode: `CONF-${Math.floor(100000 + Math.random() * 900000)}`,
      type: composerType,
      status: targetStatus === 'open' ? 'Opened in WhatsApp' : targetStatus === 'ready' ? 'Ready to Send' : 'Draft',
      text: composerText.trim(),
    })

    if (targetStatus === 'open') {
      openWhatsAppChat(composerPhone, composerText)
      notify('WhatsApp click-to-chat opened in new tab.')
    } else if (targetStatus === 'ready') {
      notify('WhatsApp message prepared and marked as Ready to Send.')
    } else {
      notify('WhatsApp draft saved successfully.')
    }

    setComposerOpen(false)
  }

  const handleOpenPreview = (msg) => {
    setPreviewMsg(msg)
    setPreviewPhone(msg.patientPhone || '')
    setPreviewError('')
    setPreviewCopied(false)
  }

  const handleLaunchFromPreview = () => {
    if (!previewMsg) return
    const res = openWhatsAppChat(previewPhone, previewMsg.text)
    if (!res.success) {
      setPreviewError(res.error || 'Invalid phone number.')
      return
    }
    markWhatsAppMessageOpened(previewMsg.id)
    notify('Opened in WhatsApp! Status updated to Opened in WhatsApp.')
    setPreviewMsg(null)
  }

  return (
    <div className="content-wrap">
      <PageHeading
        eyebrow="Patient Communications"
        title="WhatsApp Messaging Center"
        description="Preview, prepare, and dispatch appointment confirmations, reminders, and schedule updates directly to patients via WhatsApp."
        action={
          <PrimaryButton icon={MessageSquare} onClick={handleOpenComposer}>
            Compose WhatsApp Message
          </PrimaryButton>
        }
      />

      {/* Metrics Row */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-4">
        <StatCard label="Total Prepared" value={messages.length} icon={WhatsAppIcon} tone="teal" />
        <StatCard label="Opened in WhatsApp" value={openedCount} icon={CheckCircle2} tone="green" />
        <StatCard label="Ready to Send" value={readyCount} icon={Clock3} tone="blue" />
        <StatCard label="Drafts" value={draftCount} icon={FileText} tone="orange" />
      </div>

      {/* Filter and Search Bar */}
      <div className="mb-6 card p-4 space-y-3">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-4">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by patient, phone, doctor, ref..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-input !pl-8 !py-1.5 !text-xs"
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="form-input !py-1.5 !text-xs"
          >
            <option value="All">All Statuses ({messages.length})</option>
            <option value="Ready to Send">Ready to Send ({readyCount})</option>
            <option value="Opened in WhatsApp">Opened in WhatsApp ({openedCount})</option>
            <option value="Draft">Drafts ({draftCount})</option>
          </select>

          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="form-input !py-1.5 !text-xs"
          >
            <option value="All">All Message Types</option>
            <option value="Confirmation">Booking Confirmation</option>
            <option value="Reminder">Appointment Reminder</option>
            <option value="Rescheduled">Rescheduling Update</option>
            <option value="Cancellation">Cancellation Notice</option>
            <option value="General">General Practice Notice</option>
          </select>

          <div className="flex items-center justify-end text-xs text-slate-400">
            {filtered.length} messages found
          </div>
        </div>
      </div>

      {/* Messages Table */}
      <Panel
        title="WhatsApp Dispatch Queue"
        subtitle="Manage and track patient messaging status"
      >
        {filtered.length > 0 ? (
          <div className="divide-y divide-slate-100">
            {filtered.map((msg) => {
              const statusPill =
                msg.status === 'Opened in WhatsApp' ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[10px] font-semibold text-emerald-700">
                    <Check size={11} className="text-emerald-600" /> Opened in WhatsApp
                  </span>
                ) : msg.status === 'Ready to Send' ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-semibold text-blue-700">
                    <Clock size={11} className="text-blue-600" /> Ready to Send
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-[10px] font-semibold text-slate-600">
                    Draft
                  </span>
                )

              return (
                <div key={msg.id} className="flex flex-wrap items-center justify-between gap-4 py-3.5 first:pt-0 last:pb-0">
                  <div className="flex items-center gap-3 min-w-[220px]">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 font-bold shrink-0">
                      <WhatsAppIcon size={18} className="text-[#25D366]" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <b className="text-xs text-slate-800">{msg.patientName}</b>
                        <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[9px] font-semibold text-slate-600">
                          {msg.type}
                        </span>
                      </div>
                      <span className="text-[10px] text-slate-400">
                        {msg.patientPhone} · Ref: {msg.referenceCode || 'N/A'} · Dr: {msg.doctorName}
                      </span>
                    </div>
                  </div>

                  <div className="max-w-md hidden md:block text-[11px] text-slate-500 truncate">
                    {msg.text}
                  </div>

                  <div className="flex items-center gap-2">
                    {statusPill}

                    <button
                      type="button"
                      onClick={() => handleOpenPreview(msg)}
                      className="btn btn-secondary !py-1 !px-2.5 !text-xs flex items-center gap-1 font-semibold text-emerald-700 hover:bg-emerald-50 border-emerald-200"
                    >
                      <WhatsAppIcon size={12} className="text-[#25D366]" /> Preview & Open
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        deleteWhatsAppMessage(msg.id)
                      }}
                      className="btn btn-ghost !p-1.5 text-slate-400 hover:text-rose-600"
                      title="Delete record"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <div className="py-12 text-center text-xs text-slate-400">
            No WhatsApp messages found matching your criteria.
          </div>
        )}
      </Panel>

      {/* Integration Notice Banner */}
      <div className="mt-8 rounded-2xl border border-blue-100 bg-blue-50/60 p-5 text-xs text-blue-900 space-y-2">
        <div className="flex items-center gap-2">
          <Info size={16} className="text-blue-600" />
          <b className="text-sm">WhatsApp Integration Architecture & Transparency Notice</b>
        </div>
        <p className="text-[11px] leading-relaxed text-blue-800">
          • <b>Frontend Click-to-Chat:</b> ClinicOS prepares and formats messages according to WhatsApp's standard click-to-chat API (<code>https://wa.me/&lt;phone&gt;?text=&lt;encoded&gt;</code>). Clicking launches WhatsApp Web or WhatsApp Desktop in a new tab for human review before sending.
        </p>
        <p className="text-[11px] leading-relaxed text-blue-800">
          • <b>Status Tracking:</b> Messages transition from <b>Draft</b> to <b>Ready to Send</b> and <b>Opened in WhatsApp</b>. We explicitly distinguish between prepared links and delivered messages to avoid misleading delivery claims.
        </p>
        <p className="text-[11px] leading-relaxed text-blue-800">
          • <b>Official WhatsApp Business API:</b> For automated background message dispatching, delivery receipts, and webhook status callbacks, connect a verified WhatsApp Business Platform account via backend credentials.
        </p>
      </div>

      {/* Composer Modal */}
      {composerOpen && (
        <Modal title="Compose WhatsApp Message" onClose={() => setComposerOpen(false)} wide>
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block font-semibold text-slate-700">Select Registered Patient</label>
                <select
                  value={composerPatientId}
                  onChange={(e) => {
                    const sel = activeClinic.patients.find((p) => p.id === e.target.value)
                    setComposerPatientId(e.target.value)
                    if (sel) {
                      setComposerPatientName(sel.name)
                      setComposerPhone(sel.phone)
                      handleTemplateChange(composerType, sel, composerDoctorName)
                    }
                  }}
                  className="form-input !text-xs !py-1.5"
                >
                  <option value="">-- Choose patient or enter custom below --</option>
                  {activeClinic.patients.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} ({p.phone})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block font-semibold text-slate-700">Attending Doctor</label>
                <select
                  value={composerDoctorName}
                  onChange={(e) => {
                    setComposerDoctorName(e.target.value)
                    const sel = activeClinic.patients.find((p) => p.id === composerPatientId)
                    handleTemplateChange(composerType, sel, e.target.value)
                  }}
                  className="form-input !text-xs !py-1.5"
                >
                  {activeClinic.staff
                    .filter((s) => s.role.includes('Dr.') || s.consultationFee > 0)
                    .map((s) => (
                      <option key={s.id} value={s.name}>
                        {s.name} ({s.specialty || s.role})
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <div>
                <label className="mb-1 block font-semibold text-slate-700">Patient Full Name *</label>
                <input
                  type="text"
                  value={composerPatientName}
                  onChange={(e) => setComposerPatientName(e.target.value)}
                  placeholder="e.g. Emma Wilson"
                  className="form-input !text-xs !py-1.5"
                  required
                />
              </div>

              <div>
                <label className="mb-1 block font-semibold text-slate-700">
                  Recipient Phone Number * <span className="text-slate-400 font-normal">(with country code)</span>
                </label>
                <input
                  type="tel"
                  value={composerPhone}
                  onChange={(e) => {
                    setComposerPhone(e.target.value)
                    setComposerError('')
                  }}
                  placeholder="e.g. 14155550123"
                  className="form-input !text-xs !py-1.5"
                  required
                />
              </div>
            </div>

            {/* Template Selector */}
            <div>
              <span className="mb-1.5 block font-semibold text-slate-700">Message Template Preset</span>
              <div className="flex flex-wrap gap-2">
                {['Confirmation', 'Reminder', 'Rescheduled', 'Cancellation', 'General'].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => {
                      const sel = activeClinic.patients.find((p) => p.id === composerPatientId)
                      handleTemplateChange(t, sel, composerDoctorName)
                    }}
                    className={`rounded-lg px-2.5 py-1 text-xs font-semibold transition ${
                      composerType === t
                        ? 'bg-emerald-600 text-white'
                        : 'border border-slate-200 bg-white text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    {t === 'Confirmation' ? 'Booking Confirmation' : t === 'Reminder' ? 'Visit Reminder' : t === 'Rescheduled' ? 'Rescheduled' : t === 'Cancellation' ? 'Cancellation' : 'General Notice'}
                  </button>
                ))}
              </div>
            </div>

            {composerError && (
              <div className="rounded-lg bg-rose-50 border border-rose-200 p-2 text-rose-700 flex items-center gap-2">
                <AlertCircle size={14} className="shrink-0" />
                <span>{composerError}</span>
              </div>
            )}

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-semibold text-slate-700">Message Content (Editable)</label>
                <span className="text-[10px] text-slate-400">{composerText.length} characters</span>
              </div>
              <textarea
                rows={6}
                value={composerText}
                onChange={(e) => setComposerText(e.target.value)}
                className="form-input !text-xs !py-2 font-sans"
              />
            </div>

            <div className="flex flex-wrap justify-between items-center gap-2 border-t border-slate-100 pt-3">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setComposerOpen(false)}
              >
                Cancel
              </button>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleComposerSubmit('draft')}
                  className="btn btn-secondary !py-1.5 text-xs"
                >
                  Save as Draft
                </button>
                <button
                  type="button"
                  onClick={() => handleComposerSubmit('ready')}
                  className="btn btn-secondary !py-1.5 text-xs text-blue-700 border-blue-200 hover:bg-blue-50"
                >
                  Save as Ready to Send
                </button>
                <button
                  type="button"
                  onClick={() => handleComposerSubmit('open')}
                  className="btn !bg-[#25D366] hover:!bg-[#20bd5a] text-white flex items-center gap-1.5 font-semibold !py-1.5 text-xs"
                >
                  <WhatsAppIcon size={14} /> Open in WhatsApp
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Message Preview Modal */}
      {previewMsg && (
        <Modal title={`WhatsApp Message: ${previewMsg.patientName}`} onClose={() => setPreviewMsg(null)}>
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div>
                <b className="text-slate-800">{previewMsg.patientName}</b>
                <span className="text-slate-400 text-[10px] block">
                  Created {previewMsg.createdAt} · {previewMsg.type}
                </span>
              </div>
              <Badge tone={previewMsg.status === 'Opened in WhatsApp' ? 'green' : previewMsg.status === 'Ready to Send' ? 'blue' : 'gray'}>
                {previewMsg.status}
              </Badge>
            </div>

            {previewError && (
              <div className="rounded-lg bg-rose-50 border border-rose-200 p-2 text-rose-700 flex items-center gap-2">
                <AlertCircle size={14} className="shrink-0" />
                <span>{previewError}</span>
              </div>
            )}

            <div>
              <label className="mb-1 block font-semibold text-slate-700">Recipient Mobile Phone</label>
              <input
                type="tel"
                value={previewPhone}
                onChange={(e) => {
                  setPreviewPhone(e.target.value)
                  setPreviewError('')
                }}
                className="form-input !text-xs !py-1.5"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="font-semibold text-slate-700">Formatted Message</label>
                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(previewMsg.text)
                    setPreviewCopied(true)
                    setTimeout(() => setPreviewCopied(false), 2000)
                  }}
                  className="text-[10px] font-semibold text-blue-600 flex items-center gap-1"
                >
                  <Copy size={11} /> {previewCopied ? 'Copied!' : 'Copy Text'}
                </button>
              </div>
              <pre className="whitespace-pre-wrap rounded-lg bg-slate-50 border border-slate-200 p-3 text-[11px] font-sans text-slate-700 leading-relaxed max-h-52 overflow-y-auto">
                {previewMsg.text}
              </pre>
            </div>

            <div className="flex justify-between items-center border-t border-slate-100 pt-3">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setPreviewMsg(null)}
              >
                Close
              </button>

              <button
                type="button"
                onClick={handleLaunchFromPreview}
                className="btn !bg-[#25D366] hover:!bg-[#20bd5a] text-white flex items-center gap-1.5 font-semibold"
              >
                <WhatsAppIcon size={14} /> Open in WhatsApp
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}


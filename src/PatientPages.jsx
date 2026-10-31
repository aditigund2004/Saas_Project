import { useMemo, useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import {
  Activity, AlertCircle, AlertTriangle, ArrowRight, ArrowUpRight, Bell, CalendarCheck2,
  CalendarDays, CalendarPlus, Check, CheckCircle2, ChevronRight, Clock,
  CreditCard, Download, ExternalLink, Eye, FileCheck, FileText, Filter,
  HeartPulse, Info, Lock, MapPin, MessageSquare, Minus, PackageCheck, Phone, Pill, Plus, Printer,
  Search, ShieldCheck, ShoppingBag, ShoppingCart, Sparkles, Stethoscope, Store, Trash2, Truck, UploadCloud, User, Users, X,
} from 'lucide-react'
import { useStore } from './Store'
import { Badge, DataTable, Modal, PageHeading, Panel, PrimaryButton, StatCard } from './components'
import {
  WhatsAppIcon,
  sanitizeWhatsAppPhone,
  buildWhatsAppUrl,
  openWhatsAppChat,
  getBookingConfirmationTemplate,
  getAppointmentReminderTemplate,
  getAppointmentRescheduledTemplate,
  getAppointmentCancellationTemplate,
} from './whatsapp'

// ==========================================
// 1. PATIENT DASHBOARD
// ==========================================
export function PatientDashboard() {
  const { currentUser, data } = useStore()
  const navigate = useNavigate()

  const patientEmail = currentUser?.email?.toLowerCase() || 'emma.wilson@email.com'
  const firstName = (currentUser?.name || 'Emma Wilson').split(' ')[0]

  // Filter patient's appointments across all clinics
  const patientAppointments = useMemo(() => {
    const list = []
    for (const clinic of data.clinics) {
      for (const appt of clinic.appointments) {
        if (
          (appt.patientEmail && appt.patientEmail.toLowerCase() === patientEmail) ||
          (appt.patientId && appt.patientId === currentUser?.patientId) ||
          appt.patient?.toLowerCase() === currentUser?.name?.toLowerCase()
        ) {
          list.push({ ...appt, clinicName: clinic.name, clinicAddress: clinic.address })
        }
      }
    }
    return list
  }, [data.clinics, patientEmail, currentUser])

  const upcomingAppointments = patientAppointments.filter(
    (a) => a.status === 'Confirmed' || a.status === 'Scheduled' || a.status === 'Checked in'
  )

  const recentHistory = patientAppointments.filter(
    (a) => a.status === 'Completed' || a.status === 'Cancelled'
  )

  // Filter patient's prescriptions
  const patientPrescriptions = useMemo(() => {
    return (data.prescriptions || []).filter(
      (p) =>
        (!p.patientEmail || p.patientEmail.toLowerCase() === patientEmail) &&
        p.authorizedForPatient !== false
    )
  }, [data.prescriptions, patientEmail])

  // Active medicine delivery tracker for dashboard
  const activeDelivery = useMemo(() => {
    return (data.medicineOrders || []).find(
      (o) =>
        (!o.patientEmail || o.patientEmail.toLowerCase() === patientEmail) &&
        o.status !== 'Delivered' &&
        o.status !== 'Cancelled'
    )
  }, [data.medicineOrders, patientEmail])

  // Filter patient's invoices
  const patientInvoices = useMemo(() => {
    return (data.patientInvoices || []).filter(
      (inv) => !inv.patientEmail || inv.patientEmail.toLowerCase() === patientEmail
    )
  }, [data.patientInvoices, patientEmail])

  const unpaidInvoices = patientInvoices.filter((inv) => inv.paymentStatus !== 'Paid')
  const totalBalanceDue = unpaidInvoices.reduce((sum, inv) => sum + (inv.outstandingBalance || 0), 0)

  // Filter patient's unread notifications
  const patientNotifications = useMemo(() => {
    return (data.patientNotifications || []).filter(
      (n) => !n.patientEmail || n.patientEmail.toLowerCase() === patientEmail
    )
  }, [data.patientNotifications, patientEmail])

  const nextAppointment = upcomingAppointments[0]

  return (
    <div className="content-wrap">
      <PageHeading
        eyebrow="Patient Portal · Personal Care Overview"
        title={`Welcome back, ${firstName} 👋`}
        description="Review your upcoming visits, active prescriptions, authorized medical records, and account balances in one place."
        action={
          <button
            className="btn btn-primary !bg-emerald-600 hover:!bg-emerald-700"
            onClick={() => navigate('/patient/book-appointment')}
          >
            <CalendarPlus size={15} /> Book Appointment
          </button>
        }
      />

      {/* Metric Cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Upcoming visits"
          value={upcomingAppointments.length}
          icon={CalendarCheck2}
          tone="green"
          detail={nextAppointment ? `Next: ${nextAppointment.date} · ${nextAppointment.time}` : 'No upcoming visits'}
        />
        <StatCard
          label="Active prescriptions"
          value={patientPrescriptions.filter((p) => p.status === 'Active').length}
          icon={Pill}
          tone="blue"
          detail="Authorized by your doctor"
        />
        <StatCard
          label="Outstanding balance"
          value={`₹${totalBalanceDue}.00`}
          icon={CreditCard}
          tone={totalBalanceDue > 0 ? 'orange' : 'purple'}
          detail={totalBalanceDue > 0 ? `${unpaidInvoices.length} invoice(s) pending payment` : 'All bills settled in full'}
        />
        <StatCard
          label="Unread updates"
          value={patientNotifications.filter((n) => !n.read).length}
          icon={Bell}
          tone="purple"
          detail="Clinical & billing alerts"
        />
      </div>

      {/* Quick Action Navigation Buttons */}
      <div className="mb-6 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
        <div className="mb-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">Quick Actions</div>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-6">
          <button
            onClick={() => navigate('/patient/book-appointment')}
            className="flex flex-col items-center justify-center gap-2 rounded-xl border border-slate-100 bg-slate-50/70 p-3 text-center transition hover:border-emerald-200 hover:bg-emerald-50/50"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-100 text-emerald-700">
              <CalendarPlus size={17} />
            </span>
            <span className="text-xs font-semibold text-slate-700">Book Visit</span>
          </button>

          <button
            onClick={() => navigate('/patient/appointments')}
            className="flex flex-col items-center justify-center gap-2 rounded-xl border border-slate-100 bg-slate-50/70 p-3 text-center transition hover:border-blue-200 hover:bg-blue-50/50"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
              <CalendarDays size={17} />
            </span>
            <span className="text-xs font-semibold text-slate-700">My Visits</span>
          </button>

          <button
            onClick={() => navigate('/patient/prescriptions')}
            className="flex flex-col items-center justify-center gap-2 rounded-xl border border-slate-100 bg-slate-50/70 p-3 text-center transition hover:border-violet-200 hover:bg-violet-50/50"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-100 text-violet-700">
              <Pill size={17} />
            </span>
            <span className="text-xs font-semibold text-slate-700">Prescriptions</span>
          </button>

          <button
            onClick={() => navigate('/patient/medicine-store')}
            className="flex flex-col items-center justify-center gap-2 rounded-xl border border-emerald-100 bg-emerald-50/50 p-3 text-center transition hover:border-emerald-300 hover:bg-emerald-100/60"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-600 text-white shadow-sm">
              <ShoppingBag size={17} />
            </span>
            <span className="text-xs font-bold text-emerald-900">Medicine Store</span>
          </button>

          <button
            onClick={() => navigate('/patient/billing')}
            className="flex flex-col items-center justify-center gap-2 rounded-xl border border-slate-100 bg-slate-50/70 p-3 text-center transition hover:border-amber-200 hover:bg-amber-50/50"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
              <CreditCard size={17} />
            </span>
            <span className="text-xs font-semibold text-slate-700">My Bills</span>
          </button>

          <button
            onClick={() => navigate('/patient/profile')}
            className="flex flex-col items-center justify-center gap-2 rounded-xl border border-slate-100 bg-slate-50/70 p-3 text-center transition hover:border-slate-300 hover:bg-slate-100"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-200 text-slate-700">
              <User size={17} />
            </span>
            <span className="text-xs font-semibold text-slate-700">Edit Profile</span>
          </button>
        </div>
      </div>

      {/* Active Medicine Delivery Banner */}
      {activeDelivery && (
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-emerald-200 bg-gradient-to-r from-emerald-50 via-teal-50 to-blue-50 p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-200">
              <Truck size={20} className="animate-pulse" />
            </span>
            <div>
              <div className="flex items-center gap-2">
                <b className="text-xs font-bold text-slate-800">Pharmacy Delivery in Progress</b>
                <Badge tone={activeDelivery.status === 'Out for Delivery' ? 'green' : 'blue'}>
                  {activeDelivery.status}
                </Badge>
              </div>
              <p className="mt-0.5 text-[11px] text-slate-600">
                Order <span className="font-mono font-semibold text-slate-700">{activeDelivery.id}</span> from {activeDelivery.pharmacyName} · Estimated: <b>{activeDelivery.estimatedDeliveryTime}</b>
              </p>
            </div>
          </div>
          <button
            onClick={() => navigate('/patient/medicine-store?tab=orders')}
            className="btn !bg-emerald-600 hover:!bg-emerald-700 text-white !py-1.5 !text-xs font-semibold flex items-center gap-1.5"
          >
            Track Delivery Live →
          </button>
        </div>
      )}

      {/* Main Grid: Next Appointment + Prescriptions */}
      <div className="mb-6 grid grid-cols-1 gap-5 xl:grid-cols-[1.5fr_1fr]">
        {/* Next Appointment Card */}
        <Panel
          title="Next upcoming appointment"
          subtitle="Your scheduled healthcare session"
          action={
            <Link to="/patient/appointments" className="text-xs font-semibold text-blue-600 hover:underline">
              View all visits →
            </Link>
          }
        >
          {nextAppointment ? (
            <div className="rounded-xl border border-emerald-100 bg-gradient-to-br from-emerald-50/40 to-blue-50/30 p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md shadow-emerald-200">
                    <Stethoscope size={22} />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-800">{nextAppointment.doctor}</h3>
                    <p className="text-xs text-slate-500">{nextAppointment.clinicName}</p>
                  </div>
                </div>
                <Badge tone="green">{nextAppointment.status}</Badge>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 border-y border-slate-100 py-3 text-xs sm:grid-cols-3">
                <div>
                  <span className="block text-[10px] text-slate-400">Date</span>
                  <b className="text-slate-700">{nextAppointment.date}</b>
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400">Time</span>
                  <b className="text-slate-700">{nextAppointment.time}</b>
                </div>
                <div>
                  <span className="block text-[10px] text-slate-400">Visit Type</span>
                  <b className="text-slate-700">{nextAppointment.type}</b>
                </div>
              </div>

              {nextAppointment.notes && (
                <div className="mt-3 text-xs text-slate-600">
                  <span className="font-semibold text-slate-700">Reason for visit: </span>
                  {nextAppointment.notes}
                </div>
              )}

              <div className="mt-4 flex flex-wrap gap-2">
                <button
                  onClick={() => navigate('/patient/appointments')}
                  className="btn btn-secondary !py-1.5 !text-xs"
                >
                  Manage / Reschedule
                </button>
                <button
                  onClick={() => window.print()}
                  className="btn btn-ghost !py-1.5 !text-xs text-slate-500"
                >
                  <Printer size={13} /> Print Visit Slip
                </button>
              </div>
            </div>
          ) : (
            <div className="py-12 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                <CalendarDays size={20} />
              </div>
              <h3 className="mt-3 text-xs font-semibold text-slate-700">No upcoming appointments scheduled</h3>
              <p className="mt-1 text-[11px] text-slate-400">Need to consult with a doctor? Book a time that works for you.</p>
              <button
                onClick={() => navigate('/patient/book-appointment')}
                className="btn btn-primary !bg-emerald-600 mt-4 !py-2 !text-xs"
              >
                Book an Appointment
              </button>
            </div>
          )}
        </Panel>

        {/* Outstanding Invoices & Payment Card */}
        <Panel
          title="Account balance & billing"
          subtitle="Direct clinic invoices and payments"
          action={
            <Link to="/patient/billing" className="text-xs font-semibold text-blue-600 hover:underline">
              Billing details →
            </Link>
          }
        >
          {totalBalanceDue > 0 ? (
            <div className="space-y-4">
              <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-amber-900">Payment Due</span>
                  <Badge tone="amber">Pending</Badge>
                </div>
                <div className="mt-2 text-2xl font-bold text-slate-800">₹{totalBalanceDue}.00</div>
                <p className="mt-1 text-[11px] text-amber-800">
                  You have {unpaidInvoices.length} outstanding invoice(s). Pay securely online without clinic wait times.
                </p>
                <button
                  onClick={() => navigate('/patient/billing')}
                  className="btn btn-primary !bg-amber-600 hover:!bg-amber-700 mt-3 w-full !py-2"
                >
                  <CreditCard size={14} /> Pay Balance Online
                </button>
              </div>

              <div className="space-y-2">
                {unpaidInvoices.map((inv) => (
                  <div key={inv.id} className="flex items-center justify-between rounded-lg border border-slate-100 p-2.5 text-xs">
                    <div>
                      <b className="text-slate-700">{inv.id}</b>
                      <div className="text-[10px] text-slate-400">{inv.clinicName} · Due {inv.dueDate}</div>
                    </div>
                    <b className="text-slate-800">₹{inv.outstandingBalance}.00</b>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="py-8 text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                <Check size={18} />
              </div>
              <h3 className="mt-2 text-xs font-semibold text-slate-700">Account is fully paid</h3>
              <p className="mt-1 text-[11px] text-slate-400">You have no unpaid bills or overdue invoices.</p>
              <Link to="/patient/billing" className="btn btn-secondary mt-3 !py-1.5 !text-xs">
                View Past Receipts
              </Link>
            </div>
          )}
        </Panel>
      </div>

      {/* Second Row: Active Prescriptions + Recent Notifications */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.4fr_1fr]">
        {/* Prescriptions Snapshot */}
        <Panel
          title="Active prescriptions"
          subtitle="Current medications prescribed by your healthcare providers"
          action={
            <Link to="/patient/prescriptions" className="text-xs font-semibold text-blue-600 hover:underline">
              View all ({patientPrescriptions.length}) →
            </Link>
          }
        >
          {patientPrescriptions.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {patientPrescriptions.slice(0, 3).map((rx) => (
                <div key={rx.id} className="py-3 first:pt-0 last:pb-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <b className="text-xs text-slate-800">{rx.diagnosis}</b>
                      <div className="mt-0.5 text-[10px] text-slate-400">
                        {rx.doctor} · {rx.clinicName} · Issued {rx.date}
                      </div>
                    </div>
                    <Badge tone={rx.status === 'Active' ? 'green' : 'gray'}>{rx.status}</Badge>
                  </div>
                  <div className="mt-2 space-y-1">
                    {rx.medications.map((med) => (
                      <div key={med.name} className="flex items-center gap-2 rounded-md bg-slate-50 px-2.5 py-1.5 text-[11px] text-slate-700">
                        <Pill size={12} className="text-blue-600" />
                        <span className="font-semibold">{med.name} ({med.dosage})</span>
                        <span className="text-slate-400">— {med.frequency}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
              <div className="pt-3">
                <button
                  onClick={() => navigate('/patient/medicine-store')}
                  className="btn !bg-emerald-50 hover:!bg-emerald-100 text-emerald-800 border border-emerald-200 w-full !py-2 !text-xs font-semibold flex items-center justify-center gap-2"
                >
                  <ShoppingBag size={14} className="text-emerald-600" /> Reorder Prescriptions via Pharmacy Home Delivery →
                </button>
              </div>
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-slate-400">
              No active prescriptions on file.
            </div>
          )}
        </Panel>

        {/* Notifications Snapshot */}
        <Panel
          title="Recent updates"
          subtitle="Care notifications and alerts"
          action={
            <Link to="/patient/notifications" className="text-xs font-semibold text-blue-600 hover:underline">
              Open inbox →
            </Link>
          }
        >
          {patientNotifications.length > 0 ? (
            <div className="space-y-3">
              {patientNotifications.slice(0, 4).map((notif) => (
                <div
                  key={notif.id}
                  className={`flex gap-3 rounded-lg border p-2.5 transition ${notif.read ? 'border-slate-100 bg-white' : 'border-blue-100 bg-blue-50/40'}`}
                >
                  <span className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs ${notif.read ? 'bg-slate-100 text-slate-500' : 'bg-blue-100 text-blue-700'}`}>
                    <Bell size={13} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between">
                      <b className="text-xs text-slate-700">{notif.title}</b>
                      <span className="text-[9px] text-slate-400">{notif.date}</span>
                    </div>
                    <p className="mt-0.5 text-[11px] leading-relaxed text-slate-500">{notif.message}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center text-xs text-slate-400">
              You are all caught up! No new notifications.
            </div>
          )}
        </Panel>
      </div>
    </div>
  )
}

// ==========================================
// 2. PATIENT APPOINTMENTS PAGE
// ==========================================
export function PatientAppointmentsPage() {
  const { currentUser, data, cancelPatientAppointment, reschedulePatientAppointment, notify } = useStore()
  const navigate = useNavigate()

  const [tab, setTab] = useState('Upcoming')
  const [reschedulingAppt, setReschedulingAppt] = useState(null)
  const [cancellingAppt, setCancellingAppt] = useState(null)
  const [detailAppt, setDetailAppt] = useState(null)

  const [newDate, setNewDate] = useState('Tomorrow')
  const [newTime, setNewTime] = useState('02:00 PM')
  const [cancelReason, setCancelReason] = useState('Schedule conflict')

  const patientEmail = currentUser?.email?.toLowerCase() || 'emma.wilson@email.com'

  const allAppointments = useMemo(() => {
    const list = []
    for (const clinic of data.clinics) {
      for (const appt of clinic.appointments) {
        if (
          (appt.patientEmail && appt.patientEmail.toLowerCase() === patientEmail) ||
          (appt.patientId && appt.patientId === currentUser?.patientId) ||
          appt.patient?.toLowerCase() === currentUser?.name?.toLowerCase()
        ) {
          list.push({ ...appt, clinicId: clinic.id, clinicName: clinic.name, clinicAddress: clinic.address, clinicPhone: clinic.phone })
        }
      }
    }
    return list
  }, [data.clinics, patientEmail, currentUser])

  const upcoming = allAppointments.filter((a) => a.status === 'Confirmed' || a.status === 'Scheduled' || a.status === 'Checked in')
  const history = allAppointments.filter((a) => a.status === 'Completed')
  const cancelled = allAppointments.filter((a) => a.status === 'Cancelled')

  const displayedList = tab === 'Upcoming' ? upcoming : tab === 'History' ? history : cancelled

  const handleRescheduleSubmit = (e) => {
    e.preventDefault()
    if (!reschedulingAppt) return
    const res = reschedulePatientAppointment(reschedulingAppt.id, newDate, newTime)
    if (!res.success) {
      alert(res.error)
      return
    }
    setReschedulingAppt(null)
  }

  const handleCancelSubmit = (e) => {
    e.preventDefault()
    if (!cancellingAppt) return
    cancelPatientAppointment(cancellingAppt.id, cancelReason)
    setCancellingAppt(null)
  }

  return (
    <div className="content-wrap">
      <PageHeading
        eyebrow="Care Schedule"
        title="My Appointments"
        description="View your past and scheduled visits, reschedule dates, or book a new medical consultation."
        action={
          <PrimaryButton onClick={() => navigate('/patient/book-appointment')} icon={CalendarPlus}>
            Book Appointment
          </PrimaryButton>
        }
      />

      {/* Tabs */}
      <div className="mb-6 flex gap-2 border-b border-slate-200 pb-2">
        {['Upcoming', 'History', 'Cancelled'].map((item) => (
          <button
            key={item}
            onClick={() => setTab(item)}
            className={`rounded-lg px-4 py-2 text-xs font-semibold transition ${tab === item ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
          >
            {item} ({item === 'Upcoming' ? upcoming.length : item === 'History' ? history.length : cancelled.length})
          </button>
        ))}
      </div>

      {displayedList.length > 0 ? (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {displayedList.map((appt) => (
            <div key={appt.id} className="card p-5 transition hover:shadow-md">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <Badge tone={appt.status === 'Confirmed' ? 'green' : appt.status === 'Cancelled' ? 'rose' : 'blue'}>
                    {appt.status}
                  </Badge>
                  <h3 className="mt-2 text-sm font-bold text-slate-800">{appt.doctor}</h3>
                  <div className="text-xs text-slate-500">{appt.clinicName}</div>
                </div>
                <div className="rounded-lg bg-slate-50 px-2.5 py-1.5 text-right">
                  <div className="text-xs font-bold text-blue-700">{appt.time}</div>
                  <div className="text-[10px] text-slate-400">{appt.date}</div>
                </div>
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2 rounded-lg bg-slate-50 p-2.5 text-xs">
                <div>
                  <span className="text-[10px] text-slate-400">Consultation Type:</span>
                  <div className="font-medium text-slate-700">{appt.type}</div>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400">Estimated Fee:</span>
                  <div className="font-medium text-slate-700">₹{appt.fee || 120}.00</div>
                </div>
              </div>

              {appt.notes && (
                <div className="mt-3 text-[11px] text-slate-500">
                  <span className="font-semibold text-slate-600">Notes: </span>
                  {appt.notes}
                </div>
              )}

              {appt.cancellationReason && (
                <div className="mt-2 text-[11px] text-rose-600">
                  <span className="font-semibold">Reason for cancellation: </span>
                  {appt.cancellationReason}
                </div>
              )}

              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      const msg = getBookingConfirmationTemplate({
                        patientName: appt.patient,
                        referenceCode: appt.confirmationCode || appt.id,
                        clinicName: appt.clinicName,
                        clinicLocation: appt.clinicAddress,
                        clinicPhone: appt.clinicPhone,
                        doctorName: appt.doctor,
                        consultationType: appt.type,
                        date: appt.date,
                        time: appt.time,
                      })
                      openWhatsAppChat(appt.clinicPhone || currentUser?.phone, msg)
                    }}
                    className="btn btn-ghost !py-1 !text-[11px] text-emerald-700 hover:bg-emerald-50 flex items-center gap-1 font-semibold"
                    title="Open appointment in WhatsApp"
                  >
                    <WhatsAppIcon size={13} className="text-[#25D366]" /> WhatsApp
                  </button>
                  <button
                    onClick={() => setDetailAppt(appt)}
                    className="text-xs font-semibold text-blue-600 hover:underline"
                  >
                    View clinic details
                  </button>
                </div>

                {tab === 'Upcoming' && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => setReschedulingAppt(appt)}
                      className="btn btn-secondary !py-1 !text-[11px]"
                    >
                      Reschedule
                    </button>
                    <button
                      onClick={() => setCancellingAppt(appt)}
                      className="btn btn-ghost !py-1 !text-[11px] text-rose-600 hover:bg-rose-50"
                    >
                      Cancel
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card py-16 text-center">
          <CalendarDays size={28} className="mx-auto text-slate-300" />
          <h3 className="mt-3 text-sm font-semibold text-slate-700">No {tab.toLowerCase()} visits</h3>
          <p className="mt-1 text-xs text-slate-400">
            {tab === 'Upcoming'
              ? 'You do not have any appointments lined up. Ready to see a doctor?'
              : `No appointments found under ${tab.toLowerCase()}.`}
          </p>
          {tab === 'Upcoming' && (
            <button
              onClick={() => navigate('/patient/book-appointment')}
              className="btn btn-primary !bg-emerald-600 mt-4"
            >
              Book an Appointment
            </button>
          )}
        </div>
      )}

      {/* Reschedule Modal */}
      {reschedulingAppt && (
        <Modal title={`Reschedule with ${reschedulingAppt.doctor}`} onClose={() => setReschedulingAppt(null)}>
          <form className="space-y-4" onSubmit={handleRescheduleSubmit}>
            <div className="rounded-lg bg-blue-50 p-3 text-xs text-blue-800">
              Current schedule: <b>{reschedulingAppt.date}</b> at <b>{reschedulingAppt.time}</b> ({reschedulingAppt.clinicName})
            </div>

            <label className="block">
              <span className="mb-1 block text-xs font-semibold text-slate-600">Select New Date</span>
              <input
                type="text"
                className="form-input !text-xs"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                placeholder="e.g. Tomorrow or 2026-10-30"
                required
              />
            </label>

            <label className="block">
              <span className="mb-1 block text-xs font-semibold text-slate-600">Select Available Time</span>
              <select
                className="form-input !text-xs"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
              >
                {['09:00 AM', '09:30 AM', '10:30 AM', '11:15 AM', '01:30 PM', '02:00 PM', '03:00 PM', '04:00 PM'].map(
                  (slot) => (
                    <option key={slot} value={slot}>
                      {slot}
                    </option>
                  )
                )}
              </select>
            </label>

            <p className="text-[10px] text-slate-400">
              Availability is verified against {reschedulingAppt.doctor}’s clinic schedule.
            </p>

            <div className="flex justify-end gap-2 pt-2">
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
          <form className="space-y-4" onSubmit={handleCancelSubmit}>
            <div className="rounded-lg bg-rose-50 p-3 text-xs text-rose-800">
              Are you sure you want to cancel your appointment with <b>{cancellingAppt.doctor}</b> on <b>{cancellingAppt.date} at {cancellingAppt.time}</b>?
            </div>

            <label className="block">
              <span className="mb-1 block text-xs font-semibold text-slate-600">Reason for cancellation</span>
              <select
                className="form-input !text-xs"
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
              >
                <option>Schedule conflict</option>
                <option>Feeling better / Resolved</option>
                <option>Doctor recommended alternate date</option>
                <option>Prefer another provider</option>
                <option>Other personal reason</option>
              </select>
            </label>

            <div className="flex justify-end gap-2 pt-2">
              <button type="button" className="btn btn-secondary" onClick={() => setCancellingAppt(null)}>
                Keep Appointment
              </button>
              <button type="submit" className="btn btn-primary !bg-rose-600 hover:!bg-rose-700">
                Yes, Cancel Appointment
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Detail Modal */}
      {detailAppt && (
        <Modal title="Appointment & Clinic Details" onClose={() => setDetailAppt(null)}>
          <div className="space-y-4 text-xs">
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <b className="text-sm text-slate-800">{detailAppt.clinicName}</b>
              <div className="mt-1 text-slate-500 flex items-center gap-1">
                <MapPin size={13} /> {detailAppt.clinicAddress}
              </div>
              <div className="mt-1 text-slate-500 flex items-center gap-1">
                <Phone size={13} /> {detailAppt.clinicPhone}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 border-y border-slate-100 py-3">
              <div>
                <span className="text-[10px] text-slate-400">Doctor</span>
                <b className="block text-slate-700">{detailAppt.doctor}</b>
              </div>
              <div>
                <span className="text-[10px] text-slate-400">Consultation Date</span>
                <b className="block text-slate-700">{detailAppt.date} · {detailAppt.time}</b>
              </div>
              <div>
                <span className="text-[10px] text-slate-400">Type</span>
                <b className="block text-slate-700">{detailAppt.type}</b>
              </div>
              <div>
                <span className="text-[10px] text-slate-400">Status</span>
                <b className="block text-slate-700">{detailAppt.status}</b>
              </div>
            </div>

            <div className="rounded-lg bg-emerald-50 p-3 text-emerald-800">
              <b className="block">Preparation instructions:</b>
              <p className="mt-1 text-[11px] leading-relaxed">
                Please arrive 10 minutes prior to your scheduled time. Bring a government ID and your insurance or digital payment card.
              </p>
            </div>

            <div className="flex justify-end gap-2">
              <button className="btn btn-secondary" onClick={() => window.print()}>
                <Printer size={13} /> Print
              </button>
              <button className="btn btn-primary" onClick={() => setDetailAppt(null)}>
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
// 3. BOOK APPOINTMENT PAGE
// ==========================================
export function PatientBookAppointmentPage() {
  const { data, bookPatientAppointment, currentUser } = useStore()
  const navigate = useNavigate()

  const [selectedClinicId, setSelectedClinicId] = useState(data.clinics[0]?.id || 'sunrise')
  const [specialtyFilter, setSpecialtyFilter] = useState('All')
  const [selectedDoctorId, setSelectedDoctorId] = useState('')
  const [selectedType, setSelectedType] = useState('In-Clinic Consultation')
  const [selectedDate, setSelectedDate] = useState('Tomorrow')
  const [selectedTime, setSelectedTime] = useState('10:00 AM')
  const [notes, setNotes] = useState('')

  const [bookingConfirmed, setBookingConfirmed] = useState(null)
  const [errorMessage, setErrorMessage] = useState('')

  const activeClinic = data.clinics.find((c) => c.id === selectedClinicId) || data.clinics[0]

  // Filter published doctors for this clinic
  const doctors = useMemo(() => {
    return activeClinic.staff.filter((s) => s.role.toLowerCase().includes('dr.') || s.specialty)
  }, [activeClinic])

  const filteredDoctors = useMemo(() => {
    if (specialtyFilter === 'All') return doctors
    return doctors.filter(
      (d) =>
        d.specialty?.toLowerCase().includes(specialtyFilter.toLowerCase()) ||
        d.role?.toLowerCase().includes(specialtyFilter.toLowerCase())
    )
  }, [doctors, specialtyFilter])

  const selectedDoctor = doctors.find((d) => d.id === selectedDoctorId) || filteredDoctors[0]

  const specialties = ['All', 'Family Medicine', 'Pediatrics', 'Internal Medicine', 'Cardiology', 'Integrative Medicine', 'Dermatology']

  const timeSlots = [
    '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:15 AM',
    '01:30 PM', '02:00 PM', '02:45 PM', '03:30 PM', '04:15 PM',
  ]

  const handleBooking = (e) => {
    e.preventDefault()
    setErrorMessage('')

    if (!selectedDoctor) {
      setErrorMessage('Please select a healthcare provider.')
      return
    }

    const fee = selectedDoctor.consultationFee || 120

    const result = bookPatientAppointment({
      clinicId: activeClinic.id,
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      date: selectedDate,
      time: selectedTime,
      type: selectedType,
      notes,
      fee,
    })

    if (!result.success) {
      setErrorMessage(result.error)
      return
    }

    setBookingConfirmed({
      appointment: result.appointment,
      doctor: selectedDoctor,
      clinic: activeClinic,
    })
  }

  if (bookingConfirmed) {
    return (
      <div className="content-wrap max-w-2xl">
        <div className="card p-8 text-center shadow-lg">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <CheckCircle2 size={36} />
          </div>
          <span className="mt-4 inline-block rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-bold text-emerald-700">
            Booking Confirmed
          </span>
          <h1 className="brand-font mt-2 text-2xl font-bold text-slate-800">
            You are scheduled with {bookingConfirmed.doctor.name}
          </h1>
          <p className="mt-1 text-xs text-slate-500">
            A confirmation notification has been sent to your account and added to the clinic's master schedule.
          </p>

          <div className="my-6 rounded-xl border border-slate-100 bg-slate-50 p-5 text-left text-xs">
            <div className="grid grid-cols-2 gap-3 border-b border-slate-200 pb-3">
              <div>
                <span className="text-[10px] text-slate-400">Clinic</span>
                <b className="block text-slate-700">{bookingConfirmed.clinic.name}</b>
                <span className="text-[10px] text-slate-500">{bookingConfirmed.clinic.address}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400">Doctor</span>
                <b className="block text-slate-700">{bookingConfirmed.doctor.name}</b>
                <span className="text-[10px] text-slate-500">{bookingConfirmed.doctor.role}</span>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-3">
              <div>
                <span className="text-[10px] text-slate-400">Date</span>
                <b className="block text-slate-700">{bookingConfirmed.appointment.date}</b>
              </div>
              <div>
                <span className="text-[10px] text-slate-400">Time</span>
                <b className="block text-slate-700">{bookingConfirmed.appointment.time}</b>
              </div>
              <div>
                <span className="text-[10px] text-slate-400">Consultation Fee</span>
                <b className="block text-slate-700">₹{bookingConfirmed.appointment.fee}.00</b>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-3">
            <button
              onClick={() => {
                const message = getBookingConfirmationTemplate({
                  patientName: currentUser?.name || 'Patient',
                  referenceCode: bookingConfirmed.appointment.id,
                  clinicName: activeClinic.name,
                  clinicLocation: activeClinic.address,
                  clinicPhone: activeClinic.phone,
                  doctorName: bookingConfirmed.doctor.name,
                  doctorSpecialty: bookingConfirmed.doctor.role,
                  consultationType: bookingConfirmed.appointment.type,
                  date: bookingConfirmed.appointment.date,
                  time: bookingConfirmed.appointment.time,
                })
                openWhatsAppChat(currentUser?.phone || activeClinic.phone, message)
              }}
              className="btn !bg-[#25D366] hover:!bg-[#20bd5a] text-white flex items-center gap-2 font-semibold"
            >
              <WhatsAppIcon size={16} /> Confirm via WhatsApp
            </button>
            <button onClick={() => navigate('/patient/appointments')} className="btn btn-primary !bg-emerald-600">
              View in My Appointments
            </button>
            <button onClick={() => navigate('/patient/whatsapp')} className="btn btn-secondary">
              WhatsApp Messages →
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="content-wrap">
      <PageHeading
        eyebrow="Schedule Care"
        title="Find a Doctor & Book Appointment"
        description="Select a clinic location, browse qualified physicians, and reserve an available appointment slot."
      />

      {errorMessage && (
        <div className="mb-5 flex items-start gap-2 rounded-xl bg-rose-50 p-4 text-xs text-rose-700 border border-rose-200">
          <AlertCircle size={17} className="mt-0.5 shrink-0 text-rose-600" />
          <div>{errorMessage}</div>
        </div>
      )}

      <form onSubmit={handleBooking} className="grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-6">
          {/* Step 1: Clinic Selection */}
          <Panel title="1. Select Clinic" subtitle="Choose from published clinic locations">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {data.clinics.map((clinic) => (
                <button
                  type="button"
                  key={clinic.id}
                  onClick={() => {
                    setSelectedClinicId(clinic.id)
                    setSelectedDoctorId('')
                  }}
                  className={`rounded-xl border p-3.5 text-left transition ${selectedClinicId === clinic.id ? 'border-emerald-500 bg-emerald-50/50 ring-2 ring-emerald-100' : 'border-slate-200 hover:border-slate-300'}`}
                >
                  <b className="block text-xs text-slate-800">{clinic.name}</b>
                  <span className="mt-1 block text-[10px] text-slate-500 truncate">{clinic.address}</span>
                  <span className="mt-2 inline-block rounded bg-white px-2 py-0.5 text-[9px] font-semibold text-slate-600 border border-slate-100">
                    {clinic.staff.length} Providers
                  </span>
                </button>
              ))}
            </div>
          </Panel>

          {/* Step 2: Doctor & Specialty Filter */}
          <Panel
            title="2. Choose Healthcare Provider"
            subtitle={`Showing providers at ${activeClinic.name}`}
            action={
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Filter size={13} />
                <select
                  value={specialtyFilter}
                  onChange={(e) => setSpecialtyFilter(e.target.value)}
                  className="form-input !py-1 !text-xs !w-auto"
                >
                  {specialties.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            }
          >
            <div className="space-y-3">
              {filteredDoctors.map((doc) => {
                const isSelected = selectedDoctor?.id === doc.id
                return (
                  <button
                    type="button"
                    key={doc.id}
                    onClick={() => setSelectedDoctorId(doc.id)}
                    className={`flex w-full items-start gap-3 rounded-xl border p-3.5 text-left transition ${isSelected ? 'border-emerald-500 bg-emerald-50/40 ring-2 ring-emerald-100' : 'border-slate-200 hover:border-slate-300'}`}
                  >
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-xs font-bold text-indigo-700">
                      {doc.initials}
                    </span>
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center justify-between gap-1">
                        <b className="text-xs text-slate-800">{doc.name}</b>
                        <span className="text-xs font-bold text-slate-700">₹{doc.consultationFee || 120}.00</span>
                      </div>
                      <div className="text-[11px] font-medium text-emerald-700">{doc.role || doc.specialty}</div>
                      <p className="mt-1 text-[11px] text-slate-500 line-clamp-2">{doc.bio || 'Dedicated healthcare practitioner with extensive clinical experience.'}</p>
                      <div className="mt-2 flex gap-2 text-[10px] text-slate-400">
                        <span>Exp: {doc.experience || '8+ years'}</span>
                        <span>·</span>
                        <span>Languages: {(doc.languages || ['English']).join(', ')}</span>
                      </div>
                    </div>
                  </button>
                )
              })}

              {!filteredDoctors.length && (
                <div className="py-6 text-center text-xs text-slate-400">
                  No providers found for specialty "{specialtyFilter}" at this clinic.
                </div>
              )}
            </div>
          </Panel>

          {/* Step 3: Visit Type & Notes */}
          <Panel title="3. Visit Details" subtitle="How would you like to receive care?">
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                { title: 'In-Clinic Consultation', desc: 'Visit clinic location in person', icon: Stethoscope },
                { title: 'Video Telehealth', desc: 'Encrypted HD video consultation', icon: ExternalLink },
                { title: 'Home Visit', desc: 'Provider visits your residence', icon: MapPin },
              ].map(({ title, desc, icon: Icon }) => (
                <button
                  type="button"
                  key={title}
                  onClick={() => setSelectedType(title)}
                  className={`rounded-xl border p-3 text-left transition ${selectedType === title ? 'border-emerald-500 bg-emerald-50/50 ring-2 ring-emerald-100' : 'border-slate-200 hover:border-slate-300'}`}
                >
                  <Icon size={16} className={selectedType === title ? 'text-emerald-700' : 'text-slate-400'} />
                  <b className="mt-2 block text-xs text-slate-800">{title}</b>
                  <span className="text-[10px] text-slate-400">{desc}</span>
                </button>
              ))}
            </div>

            <label className="mt-4 block">
              <span className="mb-1 block text-xs font-semibold text-slate-600">Reason for visit / symptoms notes</span>
              <textarea
                className="form-input !text-xs"
                rows={3}
                placeholder="Briefly describe your symptoms, concern, or visit purpose for the doctor..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </label>
          </Panel>
        </div>

        {/* Step 4: Schedule Picker & Fee Summary (Right column) */}
        <div className="space-y-6">
          <Panel title="4. Date & Available Time Slot" subtitle="Real-time availability checking">
            <label className="block mb-4">
              <span className="mb-1 block text-xs font-semibold text-slate-600">Date</span>
              <select
                className="form-input !text-xs"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              >
                <option value="Today">Today (Oct 26, 2026)</option>
                <option value="Tomorrow">Tomorrow (Oct 27, 2026)</option>
                <option value="Oct 28, 2026">Wednesday, Oct 28, 2026</option>
                <option value="Oct 29, 2026">Thursday, Oct 29, 2026</option>
                <option value="Oct 30, 2026">Friday, Oct 30, 2026</option>
                <option value="Nov 02, 2026">Monday, Nov 02, 2026</option>
              </select>
            </label>

            <div>
              <span className="mb-2 block text-xs font-semibold text-slate-600">Available Time Slots</span>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-2">
                {timeSlots.map((slot) => {
                  const isSelected = selectedTime === slot
                  return (
                    <button
                      type="button"
                      key={slot}
                      onClick={() => setSelectedTime(slot)}
                      className={`rounded-lg border py-2 text-center text-xs font-semibold transition ${isSelected ? 'border-emerald-600 bg-emerald-600 text-white' : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300'}`}
                    >
                      {slot}
                    </button>
                  )
                })}
              </div>
            </div>
          </Panel>

          {/* Summary & Confirm Card */}
          <div className="card p-5">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">Booking Summary</h3>
            <div className="mt-3 space-y-2 text-xs">
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">Provider:</span>
                <b className="text-slate-800">{selectedDoctor?.name || 'Please select'}</b>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">Clinic:</span>
                <b className="text-slate-800">{activeClinic.name}</b>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">Schedule:</span>
                <b className="text-slate-800">{selectedDate} at {selectedTime}</b>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">Consultation fee:</span>
                <b className="text-slate-800">₹{selectedDoctor?.consultationFee || 120}.00</b>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-500">Platform booking fee:</span>
                <span className="font-semibold text-emerald-600">₹0.00 (Waived)</span>
              </div>
              <div className="flex justify-between pt-1 text-sm">
                <span className="font-bold text-slate-800">Total payable:</span>
                <b className="text-emerald-700">₹{selectedDoctor?.consultationFee || 120}.00</b>
              </div>
            </div>

            <p className="mt-3 text-[10px] text-slate-400 leading-relaxed">
              No charge today. Payment is settled through the patient billing portal or at the clinic upon arrival.
            </p>

            <button
              type="submit"
              className="btn btn-primary !bg-emerald-600 hover:!bg-emerald-700 mt-4 w-full !py-3"
            >
              <CalendarCheck2 size={16} /> Confirm & Book Appointment
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

// ==========================================
// 4. PATIENT PRESCRIPTIONS PAGE
// ==========================================
export function PatientPrescriptionsPage() {
  const { currentUser, data } = useStore()
  const [filter, setFilter] = useState('All')
  const [activeRxModal, setActiveRxModal] = useState(null)

  const patientEmail = currentUser?.email?.toLowerCase() || 'emma.wilson@email.com'

  const prescriptions = useMemo(() => {
    return (data.prescriptions || []).filter(
      (p) =>
        (!p.patientEmail || p.patientEmail.toLowerCase() === patientEmail) &&
        p.authorizedForPatient !== false
    )
  }, [data.prescriptions, patientEmail])

  const filtered = filter === 'All' ? prescriptions : prescriptions.filter((p) => p.status === filter)

  return (
    <div className="content-wrap">
      <PageHeading
        eyebrow="Medications & Care Plans"
        title="My Prescriptions"
        description="Official prescriptions authorized and issued by your attending licensed physicians."
        action={
          <div className="flex gap-2">
            {['All', 'Active', 'Completed'].map((tab) => (
              <button
                key={tab}
                onClick={() => setFilter(tab)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition ${filter === tab ? 'bg-blue-600 text-white' : 'border border-slate-200 bg-white text-slate-600'}`}
              >
                {tab}
              </button>
            ))}
          </div>
        }
      />

      {/* Verified Notice */}
      <div className="mb-6 flex items-start gap-2.5 rounded-xl border border-blue-100 bg-blue-50/70 p-3.5 text-xs text-blue-900">
        <ShieldCheck size={18} className="mt-0.5 shrink-0 text-blue-600" />
        <div className="leading-relaxed">
          <b>Official Electronic Prescriptions:</b> These records represent prescriptions issued and verified by licensed physicians. In accordance with medical regulatory standards, patients cannot alter or self-approve prescriptions. Contact your clinic for questions or refill requests.
        </div>
      </div>

      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {filtered.map((rx) => (
            <div key={rx.id} className="card p-5 transition hover:shadow-md">
              <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    Prescription {rx.id}
                  </span>
                  <h3 className="mt-0.5 text-sm font-bold text-slate-800">{rx.diagnosis}</h3>
                  <div className="text-xs text-slate-500">
                    {rx.doctor} ({rx.doctorRole || 'Physician'}) · {rx.clinicName}
                  </div>
                </div>
                <Badge tone={rx.status === 'Active' ? 'green' : 'gray'}>{rx.status}</Badge>
              </div>

              {/* Medications List */}
              <div className="mt-4 space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Prescribed Medications
                </span>
                {rx.medications.map((med) => (
                  <div key={med.name} className="rounded-lg border border-slate-100 bg-slate-50/80 p-3 text-xs">
                    <div className="flex items-center justify-between">
                      <b className="text-slate-800 flex items-center gap-1.5">
                        <Pill size={14} className="text-blue-600" />
                        {med.name}
                      </b>
                      <span className="font-semibold text-slate-600">{med.dosage}</span>
                    </div>
                    <div className="mt-1 text-[11px] text-slate-500">
                      <span>Schedule: {med.frequency}</span> · <span>Duration: {med.duration}</span>
                    </div>
                    {med.instructions && (
                      <div className="mt-1.5 text-[10px] text-slate-600 italic">
                        "{med.instructions}"
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Follow-up notes */}
              {rx.instructions && (
                <div className="mt-3 rounded-md bg-amber-50/60 p-2.5 text-[11px] text-amber-900">
                  <span className="font-semibold">Doctor's Advice: </span>
                  {rx.instructions}
                </div>
              )}

              <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3 text-xs">
                <span className="text-slate-400">Issued on {rx.date}</span>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => navigate(`/patient/medicine-store?rxId=${rx.id}`)}
                    className="btn !bg-emerald-600 hover:!bg-emerald-700 text-white !py-1 !text-xs font-semibold flex items-center gap-1.5"
                  >
                    <ShoppingBag size={13} /> Reorder Medicines
                  </button>
                  <button
                    onClick={() => setActiveRxModal(rx)}
                    className="btn btn-secondary !py-1 !text-xs font-semibold text-blue-700"
                  >
                    <FileText size={13} /> View Official Rx Pad
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="card py-16 text-center">
          <Pill size={28} className="mx-auto text-slate-300" />
          <h3 className="mt-3 text-sm font-semibold text-slate-700">No prescriptions found</h3>
          <p className="mt-1 text-xs text-slate-400">No prescriptions match the selected status.</p>
        </div>
      )}

      {/* Official Rx Pad Printable Modal */}
      {activeRxModal && (
        <Modal title={`Official Prescription · ${activeRxModal.id}`} onClose={() => setActiveRxModal(null)} wide>
          <div className="p-2 space-y-5 text-slate-800">
            {/* Header */}
            <div className="flex items-center justify-between border-b-2 border-slate-800 pb-4">
              <div>
                <h2 className="brand-font text-lg font-extrabold text-blue-900">{activeRxModal.clinicName}</h2>
                <div className="text-xs text-slate-500">Digital Health Network · Electronic Prescription Document</div>
              </div>
              <div className="text-right text-xs">
                <b className="block text-slate-800">{activeRxModal.doctor}</b>
                <span className="text-slate-500">{activeRxModal.doctorRole || 'Licensed Attending Physician'}</span>
                <div className="text-[10px] text-slate-400">Date: {activeRxModal.date}</div>
              </div>
            </div>

            {/* Patient Header */}
            <div className="grid grid-cols-2 gap-3 rounded-lg bg-slate-50 p-3 text-xs sm:grid-cols-3">
              <div>
                <span className="text-[10px] text-slate-400">Patient Name:</span>
                <b className="block text-slate-800">{currentUser?.name || activeRxModal.patientName}</b>
              </div>
              <div>
                <span className="text-[10px] text-slate-400">Patient ID:</span>
                <b className="block text-slate-800">{currentUser?.patientId || 'p1'}</b>
              </div>
              <div>
                <span className="text-[10px] text-slate-400">Clinical Diagnosis:</span>
                <b className="block text-slate-800">{activeRxModal.diagnosis}</b>
              </div>
            </div>

            {/* Rx Symbol & Medication Table */}
            <div>
              <div className="mb-2 text-xl font-bold font-serif text-blue-800">℞</div>
              <div className="space-y-3">
                {activeRxModal.medications.map((med, index) => (
                  <div key={med.name} className="border-b border-slate-100 pb-3">
                    <div className="flex justify-between font-bold text-sm text-slate-800">
                      <span>{index + 1}. {med.name}</span>
                      <span>{med.dosage}</span>
                    </div>
                    <div className="mt-1 text-xs text-slate-600">
                      <b>Sig / Frequency:</b> {med.frequency} · <b>Duration:</b> {med.duration}
                    </div>
                    {med.instructions && (
                      <div className="text-[11px] text-slate-500 italic">
                        Directions: {med.instructions}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {activeRxModal.instructions && (
              <div className="rounded-lg bg-slate-50 p-3 text-xs text-slate-700">
                <b>Care Instructions:</b> {activeRxModal.instructions}
              </div>
            )}

            {/* Doctor Signature Block */}
            <div className="flex items-end justify-between border-t border-slate-200 pt-6">
              <div className="text-[10px] text-slate-400">
                Verified Electronic Healthcare Record · ClinicOS Verified
              </div>
              <div className="text-center">
                <div className="font-serif italic text-sm text-slate-700">{activeRxModal.doctor}</div>
                <div className="h-0.5 w-36 bg-slate-400 mt-1" />
                <span className="text-[10px] text-slate-400">Physician Digital Signature</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-3">
              <button
                className="btn !bg-emerald-600 hover:!bg-emerald-700 text-white flex items-center gap-1.5 font-semibold text-xs"
                onClick={() => {
                  const targetId = activeRxModal.id
                  setActiveRxModal(null)
                  navigate(`/patient/medicine-store?rxId=${targetId}`)
                }}
              >
                <ShoppingBag size={14} /> Buy Prescribed Medicines for Home Delivery
              </button>
              <div className="flex gap-2">
                <button className="btn btn-secondary text-xs" onClick={() => window.print()}>
                  <Printer size={14} /> Print Prescription
                </button>
                <button className="btn btn-primary text-xs" onClick={() => setActiveRxModal(null)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

// ==========================================
// 5. PATIENT MEDICAL RECORDS PAGE
// ==========================================
export function PatientMedicalRecordsPage() {
  const { currentUser, data } = useStore()
  const [selectedRecord, setSelectedRecord] = useState(null)

  const patientEmail = currentUser?.email?.toLowerCase() || 'emma.wilson@email.com'

  const records = useMemo(() => {
    return (data.medicalRecords || []).filter(
      (r) =>
        (!r.patientEmail || r.patientEmail.toLowerCase() === patientEmail) &&
        r.authorizedForPatient !== false
    )
  }, [data.medicalRecords, patientEmail])

  const latestRecord = records[0]

  return (
    <div className="content-wrap">
      <PageHeading
        eyebrow="Clinical Chart"
        title="Medical Records"
        description="View your authorized diagnostic summaries, clinical vitals history, and immunizations."
      />

      {/* Tenant Isolation & HIPAA Notice */}
      <div className="mb-6 flex items-start gap-2.5 rounded-xl border border-emerald-100 bg-emerald-50/70 p-3.5 text-xs text-emerald-900">
        <Lock size={17} className="mt-0.5 shrink-0 text-emerald-600" />
        <div className="leading-relaxed">
          <b>Tenant Isolated & Authorized Medical Chart:</b> Under HIPAA and ClinicOS clinical role segregation policies, you are only shown records authorized for patient release by your attending healthcare team. Unreleased internal clinical notes and records from unassociated clinics are strictly secluded.
        </div>
      </div>

      {/* Vitals Summary Card */}
      {latestRecord?.vitals && (
        <div className="mb-6 card p-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Latest Vitals & Biometrics
              </h3>
              <p className="text-xs text-slate-500">Recorded on {latestRecord.date} by {latestRecord.doctor}</p>
            </div>
            <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-[10px] font-semibold text-emerald-700">
              Normal Range
            </span>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-5">
            <div className="rounded-xl bg-slate-50 p-3 text-center">
              <span className="text-[10px] text-slate-400">Blood Pressure</span>
              <b className="mt-1 block text-sm text-slate-800">{latestRecord.vitals.bp}</b>
            </div>
            <div className="rounded-xl bg-slate-50 p-3 text-center">
              <span className="text-[10px] text-slate-400">Heart Rate</span>
              <b className="mt-1 block text-sm text-slate-800">{latestRecord.vitals.heartRate}</b>
            </div>
            <div className="rounded-xl bg-slate-50 p-3 text-center">
              <span className="text-[10px] text-slate-400">Oxygen (SpO2)</span>
              <b className="mt-1 block text-sm text-slate-800">{latestRecord.vitals.spo2 || '99%'}</b>
            </div>
            <div className="rounded-xl bg-slate-50 p-3 text-center">
              <span className="text-[10px] text-slate-400">Temperature</span>
              <b className="mt-1 block text-sm text-slate-800">{latestRecord.vitals.temp}</b>
            </div>
            <div className="rounded-xl bg-slate-50 p-3 text-center">
              <span className="text-[10px] text-slate-400">Weight & Height</span>
              <b className="mt-1 block text-sm text-slate-800">{latestRecord.vitals.weight} · {latestRecord.vitals.height}</b>
            </div>
          </div>
        </div>
      )}

      {/* Main Records List */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.5fr_1fr]">
        <Panel title="Authorized Clinical Summaries" subtitle="Official consultation notes released to your portal">
          {records.length > 0 ? (
            <div className="divide-y divide-slate-100">
              {records.map((rec) => (
                <div key={rec.id} className="py-4 first:pt-0 last:pb-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-600">
                        {rec.type}
                      </span>
                      <h4 className="mt-0.5 text-sm font-bold text-slate-800">{rec.title}</h4>
                      <div className="text-xs text-slate-400">{rec.doctor} · {rec.clinicName} · {rec.date}</div>
                    </div>
                    <Badge tone="green">Authorized</Badge>
                  </div>
                  <p className="mt-2 text-xs leading-relaxed text-slate-600">{rec.summary}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <button
                      onClick={() => setSelectedRecord(rec)}
                      className="text-xs font-semibold text-blue-600 hover:underline"
                    >
                      View full chart record →
                    </button>
                    <button
                      onClick={() => window.print()}
                      className="btn btn-ghost !py-1 !text-[11px] text-slate-400"
                    >
                      <Download size={13} /> Export PDF
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-xs text-slate-400">
              No authorized clinical notes available yet.
            </div>
          )}
        </Panel>

        {/* Immunizations & Allergies Column */}
        <div className="space-y-6">
          {/* Allergies Card */}
          <Panel title="Documented Allergies" subtitle="Critical patient safety records">
            <div className="space-y-2">
              {(latestRecord?.allergies || ['Penicillin (Mild urticaria/rash)', 'Latex (Contact dermatitis)']).map((alg) => (
                <div key={alg} className="flex items-center gap-2 rounded-lg bg-rose-50 p-2.5 text-xs text-rose-800">
                  <AlertCircle size={14} className="shrink-0 text-rose-600" />
                  <span>{alg}</span>
                </div>
              ))}
            </div>
          </Panel>

          {/* Immunization Records */}
          <Panel title="Immunization History" subtitle="Verified vaccination logs">
            <div className="space-y-2.5">
              {(latestRecord?.immunizations || [
                { vaccine: 'Influenza (Quadrivalent)', date: 'Oct 21, 2026', provider: 'Sunrise Family Clinic' },
                { vaccine: 'Tdap Booster', date: 'May 10, 2022', provider: 'Bay Area Health' },
              ]).map((imm) => (
                <div key={imm.vaccine} className="flex items-center justify-between rounded-lg border border-slate-100 p-2.5 text-xs">
                  <div>
                    <b className="text-slate-700">{imm.vaccine}</b>
                    <div className="text-[10px] text-slate-400">{imm.provider}</div>
                  </div>
                  <span className="text-[11px] font-semibold text-slate-600">{imm.date}</span>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>

      {/* Record Detail Modal */}
      {selectedRecord && (
        <Modal title={selectedRecord.title} onClose={() => setSelectedRecord(null)}>
          <div className="space-y-4 text-xs">
            <div className="flex justify-between border-b border-slate-100 pb-2 text-slate-500">
              <span>Physician: <b>{selectedRecord.doctor}</b></span>
              <span>Date: <b>{selectedRecord.date}</b></span>
            </div>

            <div>
              <b className="text-slate-700">Clinical Assessment & Summary</b>
              <p className="mt-1 leading-relaxed text-slate-600">{selectedRecord.summary}</p>
            </div>

            {selectedRecord.vitals && (
              <div>
                <b className="text-slate-700">Vitals Recorded</b>
                <div className="mt-2 grid grid-cols-2 gap-2 rounded-lg bg-slate-50 p-3">
                  <div>BP: {selectedRecord.vitals.bp}</div>
                  <div>Heart Rate: {selectedRecord.vitals.heartRate}</div>
                  <div>Temp: {selectedRecord.vitals.temp}</div>
                  <div>Weight: {selectedRecord.vitals.weight}</div>
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2">
              <button className="btn btn-secondary" onClick={() => window.print()}>
                <Printer size={14} /> Print Summary
              </button>
              <button className="btn btn-primary" onClick={() => setSelectedRecord(null)}>
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
// 6. PATIENT BILLING & PAYMENTS PAGE
// ==========================================
export function PatientBillingPage() {
  const { currentUser, data, payPatientInvoice, notify } = useStore()
  const [activeInvoiceModal, setActiveInvoiceModal] = useState(null)
  const [payingInvoice, setPayingInvoice] = useState(null)

  const [paymentMethod, setPaymentMethod] = useState('Credit Card (ending •• 4242)')
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242')
  const [processingPayment, setProcessingPayment] = useState(false)

  const patientEmail = currentUser?.email?.toLowerCase() || 'emma.wilson@email.com'

  const invoices = useMemo(() => {
    return (data.patientInvoices || []).filter(
      (inv) => !inv.patientEmail || inv.patientEmail.toLowerCase() === patientEmail
    )
  }, [data.patientInvoices, patientEmail])

  const totalBilled = invoices.reduce((sum, inv) => sum + (inv.totalAmount || 0), 0)
  const totalPaid = invoices.reduce((sum, inv) => sum + (inv.amountPaid || 0), 0)
  const totalOutstanding = invoices.reduce((sum, inv) => sum + (inv.outstandingBalance || 0), 0)

  const handlePaymentSubmit = (e) => {
    e.preventDefault()
    if (!payingInvoice) return
    setProcessingPayment(true)

    // Simulate verified payment gateway processing
    setTimeout(() => {
      const res = payPatientInvoice(payingInvoice.id, paymentMethod)
      setProcessingPayment(false)
      if (res.success) {
        setPayingInvoice(null)
      } else {
        alert(res.error)
      }
    }, 1200)
  }

  return (
    <div className="content-wrap">
      <PageHeading
        eyebrow="Finances & Receipts"
        title="Billing & Payments"
        description="Review itemized invoices, download official receipts, and pay outstanding balances securely online."
      />

      {/* Metrics Row */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Total Billed" value={`₹${totalBilled}.00`} icon={CreditCard} tone="blue" />
        <StatCard label="Total Paid" value={`₹${totalPaid}.00`} icon={CheckCircle2} tone="green" />
        <StatCard
          label="Outstanding Balance"
          value={`₹${totalOutstanding}.00`}
          icon={CreditCard}
          tone={totalOutstanding > 0 ? 'orange' : 'purple'}
          detail={totalOutstanding > 0 ? 'Payment required' : 'All accounts settled'}
        />
      </div>

      {/* Regulatory / Security Notice */}
      <div className="mb-6 flex items-start gap-2.5 rounded-xl border border-slate-200 bg-slate-50 p-3 text-xs text-slate-600">
        <Lock size={16} className="mt-0.5 shrink-0 text-slate-500" />
        <div>
          <b>Verified Payment Gateway:</b> Invoices and fees are itemized directly from clinic records. In accordance with PCI-DSS and clinic billing rules, patients cannot manually edit invoice totals. Payments are credited only after real-time provider authorization.
        </div>
      </div>

      {/* Invoices Table */}
      <Panel title="Patient Invoices" subtitle="Itemized medical bills issued to your account">
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
            { key: 'clinicName', label: 'Clinic' },
            { key: 'date', label: 'Invoice Date' },
            { key: 'dueDate', label: 'Due Date' },
            {
              key: 'totalAmount',
              label: 'Total',
              render: (value) => <b>₹${value}.00</b>,
            },
            {
              key: 'amountPaid',
              label: 'Paid',
              render: (value) => <span className="text-emerald-700">₹${value}.00</span>,
            },
            {
              key: 'outstandingBalance',
              label: 'Balance',
              render: (value) => <b className={value > 0 ? 'text-amber-700' : 'text-slate-400'}>₹${value}.00</b>,
            },
            {
              key: 'paymentStatus',
              label: 'Status',
              render: (value) => (
                <Badge tone={value === 'Paid' ? 'green' : 'amber'}>{value}</Badge>
              ),
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
                      onClick={() => setPayingInvoice(row)}
                      className="btn btn-primary !bg-emerald-600 hover:!bg-emerald-700 !py-1 !text-[11px]"
                    >
                      Pay Online
                    </button>
                  )}
                </div>
              ),
            },
          ]}
          rows={invoices}
          searchPlaceholder="Search invoices by number or clinic..."
        />
      </Panel>

      {/* Pay Online Modal */}
      {payingInvoice && (
        <Modal title={`Pay Invoice ${payingInvoice.id}`} onClose={() => setPayingInvoice(null)}>
          <form className="space-y-4" onSubmit={handlePaymentSubmit}>
            <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500">Payable to:</span>
                <b className="text-slate-800">{payingInvoice.clinicName}</b>
              </div>
              <div className="mt-2 flex justify-between text-xs">
                <span className="text-slate-500">Invoice Reference:</span>
                <b className="text-slate-800">{payingInvoice.id}</b>
              </div>
              <div className="mt-3 flex justify-between border-t border-slate-200 pt-3 text-sm">
                <span className="font-bold text-slate-800">Amount Due:</span>
                <b className="text-lg text-emerald-700">₹{payingInvoice.outstandingBalance}.00</b>
              </div>
            </div>

            <div className="space-y-3">
              <span className="block text-xs font-semibold text-slate-700">Payment Method</span>
              <div className="grid grid-cols-2 gap-2">
                {[
                  'Credit Card (ending •• 4242)',
                  'Apple Pay / Google Pay',
                ].map((method) => (
                  <button
                    type="button"
                    key={method}
                    onClick={() => setPaymentMethod(method)}
                    className={`rounded-lg border p-2.5 text-left text-xs font-medium transition ${paymentMethod === method ? 'border-emerald-600 bg-emerald-50 text-emerald-800 ring-2 ring-emerald-100' : 'border-slate-200'}`}
                  >
                    {method}
                  </button>
                ))}
              </div>

              <label className="block">
                <span className="mb-1 block text-xs font-medium text-slate-600">Card number</span>
                <input
                  type="text"
                  className="form-input !text-xs"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  required
                />
              </label>

              <div className="grid grid-cols-2 gap-3">
                <label className="block">
                  <span className="mb-1 block text-xs font-medium text-slate-600">Expiry (MM/YY)</span>
                  <input type="text" className="form-input !text-xs" defaultValue="12/28" required />
                </label>
                <label className="block">
                  <span className="mb-1 block text-xs font-medium text-slate-600">CVC</span>
                  <input type="text" className="form-input !text-xs" defaultValue="•••" required />
                </label>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                className="btn btn-secondary"
                disabled={processingPayment}
                onClick={() => setPayingInvoice(null)}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={processingPayment}
                className="btn btn-primary !bg-emerald-600 hover:!bg-emerald-700"
              >
                {processingPayment ? 'Authorizing Payment...' : `Authorize & Pay ₹${payingInvoice.outstandingBalance}.00`}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Invoice / Receipt View Modal */}
      {activeInvoiceModal && (
        <Modal title={`Invoice Details · ${activeInvoiceModal.id}`} onClose={() => setActiveInvoiceModal(null)} wide>
          <div className="p-2 space-y-5 text-xs text-slate-800">
            <div className="flex items-start justify-between border-b border-slate-200 pb-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">{activeInvoiceModal.clinicName}</h3>
                <span className="text-[10px] text-slate-400">Official Clinic Billing Receipt</span>
              </div>
              <div className="text-right">
                <Badge tone={activeInvoiceModal.paymentStatus === 'Paid' ? 'green' : 'amber'}>
                  {activeInvoiceModal.paymentStatus}
                </Badge>
                <div className="mt-1 text-[11px] text-slate-500">Date: {activeInvoiceModal.date}</div>
              </div>
            </div>

            {/* Itemized Table */}
            <div>
              <b className="mb-2 block text-xs text-slate-700">Itemized Charges</b>
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-slate-200 text-[10px] uppercase text-slate-400">
                    <th className="pb-2">Description</th>
                    <th className="pb-2 text-center">Qty</th>
                    <th className="pb-2 text-right">Price</th>
                    <th className="pb-2 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {(activeInvoiceModal.items || []).map((item, idx) => (
                    <tr key={idx}>
                      <td className="py-2.5 font-medium">{item.description}</td>
                      <td className="py-2.5 text-center">{item.quantity}</td>
                      <td className="py-2.5 text-right">₹{item.unitPrice}.00</td>
                      <td className="py-2.5 text-right">₹{item.total}.00</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Calculations */}
            <div className="border-t border-slate-200 pt-3 space-y-1.5 text-right">
              <div className="flex justify-between">
                <span className="text-slate-500">Subtotal:</span>
                <span>₹{activeInvoiceModal.subtotal || activeInvoiceModal.totalAmount}.00</span>
              </div>
              {activeInvoiceModal.discount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Insurance / Courtesy Discount:</span>
                  <span>-₹{activeInvoiceModal.discount}.00</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-sm text-slate-900 pt-1 border-t border-slate-100">
                <span>Total Amount:</span>
                <span>₹{activeInvoiceModal.totalAmount}.00</span>
              </div>
              <div className="flex justify-between text-emerald-800">
                <span>Amount Paid:</span>
                <span>₹{activeInvoiceModal.amountPaid}.00</span>
              </div>
              <div className="flex justify-between font-bold text-amber-800">
                <span>Outstanding Balance:</span>
                <span>₹{activeInvoiceModal.outstandingBalance}.00</span>
              </div>
            </div>

            {activeInvoiceModal.transactionId && (
              <div className="rounded-lg bg-slate-50 p-3 text-[11px] text-slate-600">
                <span>Payment Reference: <b>{activeInvoiceModal.transactionId}</b></span>
                <span className="ml-3">Method: <b>{activeInvoiceModal.paymentMethod}</b></span>
                <span className="ml-3">Settled: <b>{activeInvoiceModal.paidAt}</b></span>
              </div>
            )}

            <div className="flex justify-end gap-2 border-t border-slate-100 pt-3">
              <button className="btn btn-secondary" onClick={() => window.print()}>
                <Printer size={13} /> Print Invoice Receipt
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
// 7. PATIENT NOTIFICATIONS PAGE
// ==========================================
export function PatientNotificationsPage() {
  const { currentUser, data, markNotificationRead, markAllNotificationsRead } = useStore()
  const navigate = useNavigate()
  const [filter, setFilter] = useState('All')

  const patientEmail = currentUser?.email?.toLowerCase() || 'emma.wilson@email.com'

  const notifications = useMemo(() => {
    return (data.patientNotifications || []).filter(
      (n) => !n.patientEmail || n.patientEmail.toLowerCase() === patientEmail
    )
  }, [data.patientNotifications, patientEmail])

  const filtered = filter === 'Unread' ? notifications.filter((n) => !n.read) : notifications

  return (
    <div className="content-wrap">
      <PageHeading
        eyebrow="Communications"
        title="Notifications"
        description="Stay informed about appointment updates, prescription status, and clinic announcements."
        action={
          <div className="flex gap-2">
            <button
              onClick={() => markAllNotificationsRead(patientEmail)}
              className="btn btn-secondary !text-xs"
            >
              <Check size={14} /> Mark All as Read
            </button>
          </div>
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
                markNotificationRead(notif.id)
                if (notif.link) navigate(notif.link)
              }}
              className={`flex items-start gap-4 rounded-xl border p-4 transition cursor-pointer hover:shadow-sm ${notif.read ? 'border-slate-100 bg-white' : 'border-blue-200 bg-blue-50/50'}`}
            >
              <span className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${notif.read ? 'bg-slate-100 text-slate-500' : 'bg-blue-600 text-white'}`}>
                {notif.type?.includes('appointment') ? (
                  <CalendarCheck2 size={16} />
                ) : notif.type?.includes('prescription') ? (
                  <Pill size={16} />
                ) : notif.type?.includes('invoice') || notif.type?.includes('payment') ? (
                  <CreditCard size={16} />
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
                  <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600">
                    View details <ChevronRight size={12} />
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
          <p className="mt-1 text-xs text-slate-400">You are completely up to date.</p>
        </div>
      )}
    </div>
  )
}

// ==========================================
// 8. PATIENT PROFILE PAGE
// ==========================================
export function PatientProfilePage() {
  const { currentUser, data, updatePatientProfile } = useStore()

  const [form, setForm] = useState({
    name: currentUser?.name || 'Emma Wilson',
    email: currentUser?.email || 'emma.wilson@email.com',
    phone: currentUser?.phone || '(415) 555-0123',
    dob: currentUser?.dob || '1992-04-15',
    gender: currentUser?.gender || 'Female',
    address: currentUser?.address || '742 Evergreen Terrace, San Francisco, CA',
    emergencyContact: currentUser?.emergencyContact || 'Mark Wilson · (415) 555-0199',
  })

  const [emailNotifs, setEmailNotifs] = useState(true)
  const [smsNotifs, setSmsNotifs] = useState(true)

  const handleSubmit = (e) => {
    e.preventDefault()
    updatePatientProfile(form)
  }

  return (
    <div className="content-wrap">
      <PageHeading
        eyebrow="Account Settings"
        title="My Profile & Preferences"
        description="Manage your contact details, emergency contacts, and notification settings."
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.6fr_1fr]">
        {/* Profile Form */}
        <Panel title="Personal Information" subtitle="Update your official patient profile records">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-slate-600">Full Name</span>
                <input
                  type="text"
                  className="form-input !text-xs"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </label>

              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-slate-600">Date of Birth</span>
                <input
                  type="date"
                  className="form-input !text-xs"
                  value={form.dob}
                  onChange={(e) => setForm({ ...form, dob: e.target.value })}
                />
              </label>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-slate-600">Email Address</span>
                <input
                  type="email"
                  className="form-input !text-xs !bg-slate-50"
                  value={form.email}
                  disabled
                />
                <span className="mt-0.5 block text-[9px] text-slate-400">Account primary identifier</span>
              </label>

              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-slate-600">Mobile Phone</span>
                <input
                  type="text"
                  className="form-input !text-xs"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  required
                />
              </label>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-slate-600">Gender</span>
                <select
                  className="form-input !text-xs"
                  value={form.gender}
                  onChange={(e) => setForm({ ...form, gender: e.target.value })}
                >
                  <option>Female</option>
                  <option>Male</option>
                  <option>Non-binary</option>
                  <option>Prefer not to say</option>
                </select>
              </label>

              <label className="block">
                <span className="mb-1 block text-xs font-semibold text-slate-600">Emergency Contact</span>
                <input
                  type="text"
                  className="form-input !text-xs"
                  value={form.emergencyContact}
                  onChange={(e) => setForm({ ...form, emergencyContact: e.target.value })}
                  placeholder="e.g. Mark Wilson (415) 555-0199"
                />
              </label>
            </div>

            <label className="block">
              <span className="mb-1 block text-xs font-semibold text-slate-600">Home Address</span>
              <input
                type="text"
                className="form-input !text-xs"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
            </label>

            <div className="pt-2">
              <button type="submit" className="btn btn-primary">
                Save Profile Changes
              </button>
            </div>
          </form>
        </Panel>

        {/* Linked Clinics & Preferences Column */}
        <div className="space-y-6">
          {/* Notification Preferences */}
          <Panel title="Care & Notification Preferences" subtitle="Control appointment and billing alerts">
            <div className="space-y-3 text-xs">
              <label className="flex items-center justify-between">
                <span>Email appointment reminders</span>
                <input
                  type="checkbox"
                  checked={emailNotifs}
                  onChange={(e) => setEmailNotifs(e.target.checked)}
                  className="accent-blue-600"
                />
              </label>
              <label className="flex items-center justify-between">
                <span>SMS visit updates</span>
                <input
                  type="checkbox"
                  checked={smsNotifs}
                  onChange={(e) => setSmsNotifs(e.target.checked)}
                  className="accent-blue-600"
                />
              </label>
              <label className="flex items-center justify-between">
                <span>Prescription availability alerts</span>
                <input type="checkbox" defaultChecked className="accent-blue-600" />
              </label>
            </div>
          </Panel>

          {/* Linked Clinics */}
          <Panel title="Associated Clinics" subtitle="Clinics holding your active medical records">
            <div className="space-y-3">
              {data.clinics.map((clinic) => (
                <div key={clinic.id} className="rounded-lg border border-slate-100 p-3 text-xs">
                  <div className="flex items-center justify-between">
                    <b className="text-slate-800">{clinic.name}</b>
                    <Badge tone="green">Connected</Badge>
                  </div>
                  <div className="mt-1 text-[11px] text-slate-500">{clinic.address}</div>
                  <div className="mt-1 text-[10px] text-slate-400">{clinic.phone}</div>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  )
}

// ==========================================
// 9. PATIENT WHATSAPP MESSAGING CENTER
// ==========================================
export function PatientWhatsAppPage() {
  const { currentUser, data, activeClinic, recordWhatsAppMessage, markWhatsAppMessageOpened, notify } = useStore()
  const navigate = useNavigate()

  const patientEmail = currentUser?.email?.toLowerCase() || 'emma.wilson@email.com'
  const patientName = currentUser?.name || 'Emma Wilson'
  const patientPhone = currentUser?.phone || '+1 (415) 555-0123'

  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')
  const [typeFilter, setTypeFilter] = useState('All')

  // Preview Modal
  const [previewMsg, setPreviewMsg] = useState(null)
  const [copied, setCopied] = useState(false)

  // Direct Inquiry / Chat Modal
  const [inquiryModalOpen, setInquiryModalOpen] = useState(false)
  const [inquiryClinicId, setInquiryClinicId] = useState(activeClinic?.id || data.clinics[0]?.id || '')
  const [inquiryTopic, setInquiryTopic] = useState('Appointment Question')
  const [inquiryText, setInquiryText] = useState('')
  const [inquiryError, setInquiryError] = useState('')

  const selectedInquiryClinic = data.clinics.find((c) => c.id === inquiryClinicId) || activeClinic || data.clinics[0]

  // Filter messages belonging to this patient
  const patientMessages = useMemo(() => {
    const list = (data.whatsappMessages || []).filter((m) => {
      if (m.patientEmail && m.patientEmail.toLowerCase() === patientEmail) return true
      if (m.patientName && m.patientName.toLowerCase() === patientName.toLowerCase()) return true
      if (patientPhone && m.patientPhone && m.patientPhone.replace(/\D/g, '') === patientPhone.replace(/\D/g, '')) return true
      const matchesAppt = data.clinics.some((c) =>
        c.appointments.some(
          (a) =>
            (a.id === m.referenceCode || a.confirmationCode === m.referenceCode || a.id === m.appointmentId) &&
            ((a.patientEmail && a.patientEmail.toLowerCase() === patientEmail) ||
             (a.patient && a.patient.toLowerCase() === patientName.toLowerCase()))
        )
      )
      return matchesAppt
    })
    return list
  }, [data.whatsappMessages, data.clinics, patientEmail, patientName, patientPhone])

  const readyCount = patientMessages.filter((m) => m.status === 'Ready to Send').length
  const openedCount = patientMessages.filter((m) => m.status === 'Opened in WhatsApp').length

  const filtered = patientMessages.filter((m) => {
    const q = search.toLowerCase().trim()
    const matchesSearch =
      !q ||
      m.doctorName?.toLowerCase().includes(q) ||
      m.referenceCode?.toLowerCase().includes(q) ||
      m.type?.toLowerCase().includes(q) ||
      m.text?.toLowerCase().includes(q)

    const matchesStatus = statusFilter === 'All' || m.status === statusFilter
    const matchesType = typeFilter === 'All' || m.type === typeFilter
    return matchesSearch && matchesStatus && matchesType
  })

  const handleOpenWhatsApp = (msg) => {
    const clinic = data.clinics.find((c) => c.id === msg.clinicId) || activeClinic
    const targetPhone = clinic?.phone || msg.patientPhone || patientPhone
    const res = openWhatsAppChat(targetPhone, msg.text)
    if (res.success) {
      markWhatsAppMessageOpened(msg.id)
      notify('WhatsApp chat opened in new tab.')
    } else {
      alert(res.error || 'Could not open WhatsApp.')
    }
  }

  const handleSendInquiry = (e) => {
    e.preventDefault()
    setInquiryError('')
    if (!inquiryText.trim()) {
      setInquiryError('Please enter your message or question for the clinic.')
      return
    }

    const clinic = selectedInquiryClinic
    const composedMessage = `Hello ${clinic.name},\n\nI am ${patientName} (Phone: ${patientPhone}, Email: ${patientEmail}).\n\nTopic: ${inquiryTopic}\nMessage: ${inquiryText.trim()}\n\nPlease reply when available. Thank you!`

    const res = openWhatsAppChat(clinic.phone, composedMessage)
    if (!res.success) {
      setInquiryError(res.error || 'Unable to open WhatsApp for the clinic phone number.')
      return
    }

    recordWhatsAppMessage({
      clinicId: clinic.id,
      patientName,
      patientEmail,
      patientPhone,
      doctorName: clinic.owner || 'Clinic Front Desk',
      referenceCode: `INQ-${Math.floor(100000 + Math.random() * 900000)}`,
      type: 'Inquiry',
      status: 'Opened in WhatsApp',
      date: 'Today',
      time: 'Now',
      consultationType: inquiryTopic,
      text: composedMessage,
    })

    setInquiryModalOpen(false)
    setInquiryText('')
    notify('Inquiry opened in WhatsApp and logged in your messages.')
  }

  const handleDirectClinicChat = (clinic) => {
    const defaultGreeting = `Hello ${clinic.name} reception, I am ${patientName}. I have a question regarding my clinic care.`
    const res = openWhatsAppChat(clinic.phone, defaultGreeting)
    if (res.success) {
      notify(`Opened WhatsApp chat with ${clinic.name}.`)
    }
  }

  return (
    <div className="content-wrap">
      <PageHeading
        eyebrow="Patient Care Communication"
        title="WhatsApp Messages & Updates"
        description="View your clinic appointment confirmations, visit reminders, and chat directly with your clinic reception desk via WhatsApp."
        action={
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleDirectClinicChat(activeClinic || data.clinics[0])}
              className="btn !bg-[#25D366] hover:!bg-[#20bd5a] text-white flex items-center gap-2 font-semibold"
            >
              <WhatsAppIcon size={16} /> Chat with Front Desk
            </button>
            <PrimaryButton onClick={() => setInquiryModalOpen(true)} icon={MessageSquare}>
              Send Inquiry
            </PrimaryButton>
          </div>
        }
      />

      {/* Metrics Row */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Messages"
          value={patientMessages.length}
          tone="green"
          detail="Confirmations & reminders on file"
        />
        <StatCard
          label="Ready to Send"
          value={readyCount}
          tone="blue"
          detail="Pending dispatch to WhatsApp"
        />
        <StatCard
          label="Opened in WhatsApp"
          value={openedCount}
          tone="teal"
          detail="Dispatched via click-to-chat"
        />
        <div className="card p-5 flex flex-col justify-between">
          <div>
            <div className="text-[12px] font-medium text-slate-500">Primary Clinic Front Desk</div>
            <div className="mt-1 text-sm font-bold text-slate-800">{activeClinic.name}</div>
            <div className="mt-0.5 text-xs text-slate-500">{activeClinic.phone}</div>
          </div>
          <button
            onClick={() => handleDirectClinicChat(activeClinic)}
            className="mt-3 btn btn-secondary !py-1.5 !text-xs text-emerald-700 flex items-center justify-center gap-1.5 font-semibold"
          >
            <WhatsAppIcon size={14} className="text-[#25D366]" /> Chat on WhatsApp
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="mb-6 card p-4 flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search messages, reference code, doctor..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-input !pl-8 !py-1.5 !text-xs !w-64"
            />
          </div>

          <div className="flex items-center gap-1 text-xs text-slate-500">
            <span className="text-[11px] font-medium">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="form-input !py-1.5 !text-xs !w-auto"
            >
              <option value="All">All Statuses</option>
              <option value="Ready to Send">Ready to Send</option>
              <option value="Opened in WhatsApp">Opened in WhatsApp</option>
              <option value="Draft">Draft</option>
            </select>
          </div>

          <div className="flex items-center gap-1 text-xs text-slate-500">
            <span className="text-[11px] font-medium">Type:</span>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="form-input !py-1.5 !text-xs !w-auto"
            >
              <option value="All">All Types</option>
              <option value="Confirmation">Confirmation</option>
              <option value="Reminder">Reminder</option>
              <option value="Rescheduled">Rescheduled</option>
              <option value="Cancellation">Cancellation</option>
              <option value="Inquiry">Inquiry</option>
            </select>
          </div>
        </div>

        <span className="text-xs text-slate-400">{filtered.length} message(s)</span>
      </div>

      {/* Messages List */}
      {filtered.length > 0 ? (
        <div className="space-y-4">
          {filtered.map((msg) => {
            const clinic = data.clinics.find((c) => c.id === msg.clinicId) || activeClinic
            return (
              <div key={msg.id} className="card p-5 transition hover:shadow-sm">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                      <WhatsAppIcon size={20} className="text-[#25D366]" />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-sm font-bold text-slate-800">{msg.type} Update</span>
                        <Badge
                          tone={
                            msg.type === 'Confirmation'
                              ? 'green'
                              : msg.type === 'Reminder'
                              ? 'blue'
                              : msg.type === 'Rescheduled'
                              ? 'amber'
                              : 'rose'
                          }
                        >
                          {msg.type}
                        </Badge>
                        <Badge tone={msg.status === 'Opened in WhatsApp' ? 'green' : msg.status === 'Ready to Send' ? 'blue' : 'gray'}>
                          {msg.status}
                        </Badge>
                      </div>
                      <div className="mt-1 text-xs text-slate-500">
                        {clinic.name} · Ref: <b className="font-mono text-slate-700">{msg.referenceCode}</b>
                        {msg.doctorName && ` · Attending: ${msg.doctorName}`}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setPreviewMsg(msg)}
                      className="btn btn-secondary !py-1.5 !text-xs"
                    >
                      View Details
                    </button>
                    <button
                      onClick={() => handleOpenWhatsApp(msg)}
                      className="btn !bg-[#25D366] hover:!bg-[#20bd5a] text-white !py-1.5 !text-xs flex items-center gap-1.5 font-semibold"
                    >
                      <WhatsAppIcon size={14} /> Open WhatsApp
                    </button>
                  </div>
                </div>

                <div className="mt-3 rounded-lg bg-slate-50 p-3 text-xs font-sans text-slate-700 border border-slate-100 whitespace-pre-wrap leading-relaxed max-h-32 overflow-hidden text-ellipsis">
                  {msg.text}
                </div>

                <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-400 border-t border-slate-100 pt-2.5">
                  <span>Created: {msg.createdAt || 'Recent'}</span>
                  {msg.openedAt && <span>Opened: {msg.openedAt}</span>}
                </div>
              </div>
            )
          })}
        </div>
      ) : (
        <div className="card py-16 text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
            <WhatsAppIcon size={32} className="text-[#25D366]" />
          </div>
          <h3 className="mt-3 text-sm font-semibold text-slate-800">No WhatsApp messages found</h3>
          <p className="mt-1 text-xs text-slate-400 max-w-md mx-auto">
            {search || statusFilter !== 'All' || typeFilter !== 'All'
              ? 'No records match your active search filters. Try clearing your search.'
              : 'When you book an appointment or receive care updates, your WhatsApp notifications will appear here.'}
          </p>
          <div className="mt-5 flex justify-center gap-3">
            <button
              onClick={() => handleDirectClinicChat(activeClinic || data.clinics[0])}
              className="btn !bg-[#25D366] hover:!bg-[#20bd5a] text-white flex items-center gap-2"
            >
              <WhatsAppIcon size={16} /> Chat with Front Desk
            </button>
            <button onClick={() => navigate('/patient/book-appointment')} className="btn btn-secondary">
              Book an Appointment
            </button>
          </div>
        </div>
      )}

      {/* Connected Clinics Direct Chat Panel */}
      <div className="mt-8">
        <Panel
          title="Direct WhatsApp Communication Channels"
          subtitle="Instant front-desk contacts for your healthcare providers"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {data.clinics.map((clinic) => (
              <div key={clinic.id} className="rounded-xl border border-slate-200 p-4 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <b className="text-xs text-slate-800">{clinic.name}</b>
                    <span className="flex h-2 w-2 rounded-full bg-emerald-500" />
                  </div>
                  <div className="mt-1 text-[11px] text-slate-500">{clinic.address}</div>
                  <div className="mt-2 text-xs font-mono font-semibold text-slate-700">{clinic.phone}</div>
                </div>
                <button
                  onClick={() => handleDirectClinicChat(clinic)}
                  className="mt-4 btn !bg-emerald-50 hover:!bg-emerald-100 text-emerald-800 border border-emerald-200 !py-1.5 !text-xs flex items-center justify-center gap-2 font-semibold"
                >
                  <WhatsAppIcon size={14} className="text-[#25D366]" /> Open WhatsApp Chat
                </button>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* Preview Message Modal */}
      {previewMsg && (
        <Modal title={`WhatsApp Message: ${previewMsg.referenceCode}`} onClose={() => setPreviewMsg(null)}>
          <div className="space-y-4 text-xs">
            <div className="flex items-center justify-between rounded-lg bg-emerald-50 border border-emerald-100 p-3 text-emerald-900">
              <div className="flex items-center gap-2">
                <WhatsAppIcon size={18} className="text-[#25D366]" />
                <b>{previewMsg.type} Message</b>
              </div>
              <Badge tone={previewMsg.status === 'Opened in WhatsApp' ? 'green' : 'blue'}>
                {previewMsg.status}
              </Badge>
            </div>

            <div>
              <label className="mb-1 block font-semibold text-slate-700">Full Message Body</label>
              <pre className="whitespace-pre-wrap rounded-lg bg-slate-50 border border-slate-200 p-3.5 text-xs font-sans text-slate-700 leading-relaxed max-h-60 overflow-y-auto">
                {previewMsg.text}
              </pre>
            </div>

            <div className="rounded-lg bg-amber-50 p-2.5 text-[10px] text-amber-800 border border-amber-200">
              <b>Transparency Notice:</b> Clicking "Open in WhatsApp" uses WhatsApp click-to-chat to launch WhatsApp Web or the mobile app with this message pre-filled.
            </div>

            <div className="flex items-center justify-between border-t border-slate-100 pt-3">
              <button
                type="button"
                onClick={() => {
                  navigator.clipboard?.writeText(previewMsg.text)
                  setCopied(true)
                  setTimeout(() => setCopied(false), 2000)
                }}
                className="btn btn-secondary !py-1.5 !text-xs"
              >
                {copied ? '✓ Copied' : 'Copy Message Text'}
              </button>
              <div className="flex gap-2">
                <button type="button" className="btn btn-ghost" onClick={() => setPreviewMsg(null)}>
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    handleOpenWhatsApp(previewMsg)
                    setPreviewMsg(null)
                  }}
                  className="btn !bg-[#25D366] hover:!bg-[#20bd5a] text-white flex items-center gap-1.5 font-semibold"
                >
                  <WhatsAppIcon size={14} /> Open in WhatsApp
                </button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Inquiry Modal */}
      {inquiryModalOpen && (
        <Modal title="Send Inquiry via WhatsApp" onClose={() => setInquiryModalOpen(false)}>
          <form onSubmit={handleSendInquiry} className="space-y-4 text-xs">
            <div className="rounded-lg bg-emerald-50 border border-emerald-100 p-3 text-emerald-900 flex items-start gap-2.5">
              <WhatsAppIcon size={18} className="text-[#25D366] shrink-0 mt-0.5" />
              <div>
                <b className="block">Contact Clinic Front Desk</b>
                <p className="mt-0.5 text-[11px] text-emerald-700">
                  Compose a question or care inquiry to send directly to your clinic reception desk on WhatsApp.
                </p>
              </div>
            </div>

            {inquiryError && (
              <div className="rounded-lg bg-rose-50 border border-rose-200 p-2.5 text-rose-700 flex items-center gap-2">
                <AlertCircle size={14} className="shrink-0" />
                <span>{inquiryError}</span>
              </div>
            )}

            <div>
              <label className="mb-1 block font-semibold text-slate-700">Select Clinic</label>
              <select
                value={inquiryClinicId}
                onChange={(e) => setInquiryClinicId(e.target.value)}
                className="form-input !text-xs !py-2"
              >
                {data.clinics.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name} ({c.phone})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-1 block font-semibold text-slate-700">Inquiry Topic</label>
              <select
                value={inquiryTopic}
                onChange={(e) => setInquiryTopic(e.target.value)}
                className="form-input !text-xs !py-2"
              >
                <option value="Appointment Question">Appointment Question / Reschedule Request</option>
                <option value="Prescription Refill Inquiry">Prescription Refill Inquiry</option>
                <option value="Billing & Invoice Query">Billing & Invoice Query</option>
                <option value="Pre-visit Preparation / Fasting">Pre-visit Preparation / Fasting</option>
                <option value="General Health Question">General Clinic Question</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block font-semibold text-slate-700">Your Message / Question</label>
              <textarea
                rows={4}
                value={inquiryText}
                onChange={(e) => setInquiryText(e.target.value)}
                placeholder="Type your question or request here..."
                className="form-input !text-xs !py-2"
              />
            </div>

            <div className="flex justify-end gap-2 border-t border-slate-100 pt-3">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => setInquiryModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn !bg-[#25D366] hover:!bg-[#20bd5a] text-white flex items-center gap-1.5 font-semibold"
              >
                <WhatsAppIcon size={14} /> Open in WhatsApp
              </button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}

// ==========================================
// 10. PATIENT MEDICINE STORE & HOME DELIVERY
// ==========================================
export function PatientMedicineStorePage({ defaultTab }) {
  const {
    currentUser,
    data,
    activeClinic,
    placeMedicineOrder,
    placePrescriptionUploadOrder,
    confirmPrescriptionOrderByStore,
    uploadPatientPrescription,
    updateMedicineOrderStatus,
    notify,
  } = useStore()
  const navigate = useNavigate()
  const [searchParams, setSearchParams] = useSearchParams()

  const initialTab = searchParams.get('tab') || defaultTab || 'catalog'
  const [activeTab, setActiveTab] = useState(initialTab) // 'catalog' | 'pharmacies' | 'orders'
  const [selectedPharmacyId, setSelectedPharmacyId] = useState(
    data.pharmacies?.[0]?.id || 'pharma-1'
  )
  const [search, setSearch] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')

  // Cart state
  const [cart, setCart] = useState([])
  const [cartOpen, setCartOpen] = useState(false)
  const [deliveryAddress, setDeliveryAddress] = useState(
    currentUser?.address || '742 Evergreen Terrace, San Francisco, CA'
  )
  const [contactPhone, setContactPhone] = useState(
    currentUser?.phone || '(415) 555-0123'
  )
  const [paymentMethod, setPaymentMethod] = useState('Online Payment (Credit / Debit Card)')
  const [checkoutError, setCheckoutError] = useState('')
  const [isPlacingOrder, setIsPlacingOrder] = useState(false)
  const [orderConfirmed, setOrderConfirmed] = useState(null)

  // Choose Medical Store & Upload Prescription Modal State
  const [chooseMedicalModalOpen, setChooseMedicalModalOpen] = useState(false)
  const [targetMedicalStoreId, setTargetMedicalStoreId] = useState(
    data.pharmacies?.[0]?.id || 'pharma-1'
  )
  const [uploadedRxName, setUploadedRxName] = useState('dr_maya_patel_rx.jpg')
  const [uploadedRxType, setUploadedRxType] = useState('image') // 'image' | 'pdf'
  const [uploadedRxDataUrl, setUploadedRxDataUrl] = useState(null)
  const [uploadedRxSize, setUploadedRxSize] = useState('320 KB')
  const [patientRxNotes, setPatientRxNotes] = useState('')
  const [rxDeliveryAddress, setRxDeliveryAddress] = useState(
    currentUser?.address || '742 Evergreen Terrace, San Francisco, CA'
  )
  const [rxContactPhone, setRxContactPhone] = useState(
    currentUser?.phone || '(415) 555-0123'
  )
  const [rxPaymentMethod, setRxPaymentMethod] = useState('Cash on Delivery (COD)')
  const [rxOrderError, setRxOrderError] = useState('')
  const [isSubmittingRxOrder, setIsSubmittingRxOrder] = useState(false)

  // View uploaded prescription modal
  const [viewPrescriptionModalOrder, setViewPrescriptionModalOrder] = useState(null)

  // Upload Prescription to Profile Modal State
  const [uploadModalOpen, setUploadModalOpen] = useState(false)
  const [uploadDoctor, setUploadDoctor] = useState('')
  const [uploadClinic, setUploadClinic] = useState('')
  const [uploadDiagnosis, setUploadDiagnosis] = useState('')
  const [uploadMedName, setUploadMedName] = useState('')
  const [uploadMedDosage, setUploadMedDosage] = useState('10 mg')
  const [uploadMedForm, setUploadMedForm] = useState('Tablet')
  const [uploadMedFrequency, setUploadMedFrequency] = useState('Once daily')
  const [uploadMedDuration, setUploadMedDuration] = useState('14 days')
  const [uploadAdvice, setUploadAdvice] = useState('')
  const [uploadFileName, setUploadFileName] = useState('doctor_prescription_scan.pdf')
  const [uploadError, setUploadError] = useState('')

  // Medicine quantities state for reorder cards
  const [reorderQuantities, setReorderQuantities] = useState({})

  const patientEmail = currentUser?.email?.toLowerCase() || 'emma.wilson@email.com'

  // Selected pharmacy object
  const selectedPharmacy = useMemo(() => {
    return (
      (data.pharmacies || []).find((p) => p.id === selectedPharmacyId) ||
      (data.pharmacies || [])[0]
    )
  }, [data.pharmacies, selectedPharmacyId])

  // Patient prescriptions
  const patientPrescriptions = useMemo(() => {
    return (data.prescriptions || []).filter(
      (p) =>
        (!p.patientEmail || p.patientEmail.toLowerCase() === patientEmail) &&
        p.authorizedForPatient !== false
    )
  }, [data.prescriptions, patientEmail])

  // Extract all prescribed medications for the patient
  const prescribedMedList = useMemo(() => {
    const list = []
    for (const rx of patientPrescriptions) {
      for (const med of rx.medications || []) {
        // match with pharmacy inventory to find price & stock
        const invMatch = selectedPharmacy?.inventory?.find(
          (inv) => inv.name.toLowerCase().includes(med.name.toLowerCase()) || med.name.toLowerCase().includes(inv.name.toLowerCase())
        )
        list.push({
          prescriptionId: rx.id,
          prescriptionDiagnosis: rx.diagnosis,
          doctorName: rx.doctor,
          doctorRole: rx.doctorRole,
          prescriptionDate: rx.date,
          prescriptionStatus: rx.status,
          refills: rx.refills,
          instructions: med.instructions || rx.instructions,
          name: med.name,
          dosage: med.dosage,
          form: med.form || 'Tablet',
          frequency: med.frequency,
          duration: med.duration || 'Course duration',
          // inventory metadata
          inventoryId: invMatch?.id || `inv-${med.name.replace(/\s+/g, '-').toLowerCase()}`,
          unitPrice: invMatch ? invMatch.unitPrice : 14.50,
          packageSize: invMatch?.packageSize || `${med.duration ? med.duration + ' supply' : '30 Units pack'}`,
          inStock: invMatch ? invMatch.inStock : true,
          stockCount: invMatch ? invMatch.stockCount : 25,
          requiresPrescription: true,
          category: invMatch?.category || 'Prescribed Care',
          isDiscontinued: invMatch ? !invMatch.inStock && invMatch.stockCount === 0 : false,
        })
      }
    }
    return list
  }, [patientPrescriptions, selectedPharmacy])

  // OTC and available inventory from selected pharmacy
  const pharmacyInventory = useMemo(() => {
    return selectedPharmacy?.inventory || []
  }, [selectedPharmacy])

  // Patient's medicine orders
  const patientOrders = useMemo(() => {
    return (data.medicineOrders || []).filter(
      (o) => !o.patientEmail || o.patientEmail.toLowerCase() === patientEmail
    )
  }, [data.medicineOrders, patientEmail])

  // Cart calculations
  const cartSubtotal = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0)
  }, [cart])

  const freeDeliveryThreshold = selectedPharmacy?.freeDeliveryThreshold || 35.00
  const deliveryCharge = cartSubtotal >= freeDeliveryThreshold ? 0.00 : (selectedPharmacy?.deliveryCharge || 3.50)
  const discount = cartSubtotal >= 50 ? 5.00 : 0.00
  const cartTotal = Number((cartSubtotal + deliveryCharge - discount).toFixed(2))

  // Handle adding prescribed medicine to cart
  const handleAddPrescribedToCart = (prescribedItem) => {
    if (!prescribedItem.inStock) {
      notify('This medicine is currently out of stock at the selected pharmacy.')
      return
    }

    const qty = reorderQuantities[prescribedItem.name] || 1
    const existingIndex = cart.findIndex((item) => item.name === prescribedItem.name)

    if (existingIndex >= 0) {
      setCart((current) =>
        current.map((item, idx) =>
          idx === existingIndex ? { ...item, quantity: item.quantity + qty } : item
        )
      )
    } else {
      const newItem = {
        id: `cart-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        medicineId: prescribedItem.inventoryId,
        name: prescribedItem.name,
        dosage: prescribedItem.dosage,
        form: prescribedItem.form,
        packageSize: prescribedItem.packageSize,
        unitPrice: prescribedItem.unitPrice,
        quantity: qty,
        requiresPrescription: true,
        prescriptionId: prescribedItem.prescriptionId,
        prescriptionDiagnosis: prescribedItem.prescriptionDiagnosis,
        doctorName: prescribedItem.doctorName,
      }
      setCart((current) => [...current, newItem])
    }

    notify(`Added ${prescribedItem.name} (${qty} pack) to cart.`)
    setCartOpen(true)
  }

  // Handle adding general OTC medicine to cart
  const handleAddOtcToCart = (otcItem) => {
    if (!otcItem.inStock) {
      notify('This item is currently out of stock.')
      return
    }

    const existingIndex = cart.findIndex((item) => item.name === otcItem.name)
    if (existingIndex >= 0) {
      setCart((current) =>
        current.map((item, idx) =>
          idx === existingIndex ? { ...item, quantity: item.quantity + 1 } : item
        )
      )
    } else {
      const newItem = {
        id: `cart-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
        medicineId: otcItem.id,
        name: otcItem.name,
        dosage: otcItem.dosage,
        form: otcItem.form,
        packageSize: otcItem.packageSize,
        unitPrice: otcItem.unitPrice,
        quantity: 1,
        requiresPrescription: false,
        prescriptionId: null,
      }
      setCart((current) => [...current, newItem])
    }

    notify(`Added ${otcItem.name} to cart.`)
    setCartOpen(true)
  }

  const updateCartQuantity = (itemIndex, change) => {
    setCart((current) =>
      current
        .map((item, idx) => {
          if (idx === itemIndex) {
            const newQty = item.quantity + change
            return newQty > 0 ? { ...item, quantity: newQty } : null
          }
          return item
        })
        .filter(Boolean)
    )
  }

  const removeCartItem = (itemIndex) => {
    setCart((current) => current.filter((_, idx) => idx !== itemIndex))
  }

  // Place order
  const handleCheckoutSubmit = (e) => {
    e.preventDefault()
    setCheckoutError('')

    if (!cart.length) {
      setCheckoutError('Your shopping cart is empty.')
      return
    }
    if (!deliveryAddress.trim()) {
      setCheckoutError('Please enter a valid home delivery address.')
      return
    }
    if (!contactPhone.trim()) {
      setCheckoutError('Please enter your contact phone number.')
      return
    }

    // Prescription validation: If any cart item requires Rx, must have attached prescription
    const rxItemWithoutPrescription = cart.find(
      (item) => item.requiresPrescription && !item.prescriptionId
    )
    if (rxItemWithoutPrescription) {
      setCheckoutError(
        `"${rxItemWithoutPrescription.name}" requires a valid doctor prescription. Please reorder from your prescriptions or upload a prescription.`
      )
      return
    }

    // Minimum order check
    const minOrder = selectedPharmacy?.minOrderAmount || 10
    if (cartSubtotal < minOrder) {
      setCheckoutError(
        `Minimum order amount for ${selectedPharmacy.name} is ₹${Number(minOrder).toFixed(2)}. Please add more items.`
      )
      return
    }

    setIsPlacingOrder(true)

    // Primary attached prescription
    const primaryRxItem = cart.find((item) => item.prescriptionId)

    const res = placeMedicineOrder({
      pharmacyId: selectedPharmacy.id,
      items: cart,
      deliveryAddress,
      contactPhone,
      paymentMethod,
      prescriptionId: primaryRxItem ? primaryRxItem.prescriptionId : null,
      prescriptionDiagnosis: primaryRxItem ? primaryRxItem.prescriptionDiagnosis : null,
      doctorName: primaryRxItem ? primaryRxItem.doctorName : null,
    })

    setIsPlacingOrder(false)

    if (res.success) {
      setCart([])
      setCartOpen(false)
      setOrderConfirmed(res.order)
      notify('Your medicine order has been placed successfully!')
    } else {
      setCheckoutError(res.error || 'Failed to place order. Please try again.')
    }
  }

  // Handle uploading prescription
  const handleUploadSubmit = (e) => {
    e.preventDefault()
    setUploadError('')

    if (!uploadMedName.trim()) {
      setUploadError('Please specify the prescribed medicine name.')
      return
    }

    const meds = [
      {
        name: uploadMedName.trim(),
        dosage: uploadMedDosage.trim() || '10 mg',
        form: uploadMedForm || 'Tablet',
        frequency: uploadMedFrequency || 'Once daily',
        duration: uploadMedDuration || '14 days',
        instructions: uploadAdvice || 'Take as advised by prescribing doctor.',
      },
    ]

    const res = uploadPatientPrescription({
      doctorName: uploadDoctor.trim() || 'External Licensed Physician',
      clinicName: uploadClinic.trim() || 'Community Medical Center',
      diagnosis: uploadDiagnosis.trim() || 'Consultation Assessment',
      medications: meds,
      instructions: uploadAdvice || 'Follow dosage instructions carefully.',
      fileName: uploadFileName || 'prescription-document.pdf',
    })

    if (res.success) {
      setUploadModalOpen(false)
      setUploadDoctor('')
      setUploadClinic('')
      setUploadDiagnosis('')
      setUploadMedName('')
      setUploadAdvice('')
      notify('Prescription uploaded! You can now reorder these medicines for delivery.')
    } else {
      setUploadError(res.error || 'Failed to upload prescription.')
    }
  }

  // Handle file selection / drop for prescription upload
  const handlePrescriptionFileUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const isPdf = file.type === 'application/pdf' || file.name.toLowerCase().endsWith('.pdf')
    setUploadedRxName(file.name)
    setUploadedRxType(isPdf ? 'pdf' : 'image')
    setUploadedRxSize(`${(file.size / 1024).toFixed(1)} KB`)

    const reader = new FileReader()
    reader.onload = (event) => {
      setUploadedRxDataUrl(event.target.result)
    }
    reader.readAsDataURL(file)
  }

  // Handle direct "Choose Medical Store & Upload Prescription" order submission
  const handleChooseMedicalUploadOrderSubmit = (e) => {
    e.preventDefault()
    setRxOrderError('')
    if (!uploadedRxName && !uploadedRxDataUrl) {
      setRxOrderError('Please select or upload an image or PDF of your prescription.')
      return
    }
    if (!rxDeliveryAddress.trim()) {
      setRxOrderError('Please provide a valid home delivery address.')
      return
    }
    if (!rxContactPhone.trim()) {
      setRxOrderError('Please provide a valid contact phone number.')
      return
    }

    setIsSubmittingRxOrder(true)
    const res = placePrescriptionUploadOrder({
      pharmacyId: targetMedicalStoreId || selectedPharmacyId,
      prescriptionFileName: uploadedRxName,
      prescriptionFileType: uploadedRxType,
      prescriptionFileData: uploadedRxDataUrl,
      prescriptionFileSize: uploadedRxSize,
      patientNotes: patientRxNotes,
      deliveryAddress: rxDeliveryAddress,
      contactPhone: rxContactPhone,
      paymentMethod: rxPaymentMethod,
      estimatedTotal: 35.00,
      medicinesRequested: patientRxNotes ? `Prescribed Medicines (${patientRxNotes.slice(0, 35)}...)` : 'Medicines as per Uploaded Prescription',
    })
    setIsSubmittingRxOrder(false)

    if (res.success) {
      setChooseMedicalModalOpen(false)
      setOrderConfirmed(res.order)
      notify('Prescription order submitted to medical store! Awaiting store verification & confirmation.')
    } else {
      setRxOrderError(res.error || 'Failed to submit prescription order.')
    }
  }

  // Filtered prescribed items for search
  const filteredPrescribedMeds = useMemo(() => {
    return prescribedMedList.filter((med) => {
      const q = search.toLowerCase().trim()
      const matchesSearch =
        !q ||
        med.name.toLowerCase().includes(q) ||
        med.prescriptionDiagnosis.toLowerCase().includes(q) ||
        med.doctorName.toLowerCase().includes(q) ||
        med.category.toLowerCase().includes(q)

      const matchesCategory =
        categoryFilter === 'All' ||
        categoryFilter === 'Prescribed For You' ||
        med.category.toLowerCase().includes(categoryFilter.toLowerCase())

      return matchesSearch && matchesCategory
    })
  }, [prescribedMedList, search, categoryFilter])

  // Filtered OTC items
  const filteredOtcMeds = useMemo(() => {
    return pharmacyInventory.filter((med) => {
      if (med.requiresPrescription) return false
      const q = search.toLowerCase().trim()
      const matchesSearch =
        !q ||
        med.name.toLowerCase().includes(q) ||
        med.category.toLowerCase().includes(q) ||
        med.description?.toLowerCase().includes(q)

      const matchesCategory =
        categoryFilter === 'All' ||
        med.category.toLowerCase().includes(categoryFilter.toLowerCase())

      return matchesSearch && matchesCategory
    })
  }, [pharmacyInventory, search, categoryFilter])

  // Filtered pharmacies
  const filteredPharmacies = useMemo(() => {
    return (data.pharmacies || []).filter((ph) => {
      const q = search.toLowerCase().trim()
      return (
        !q ||
        ph.name.toLowerCase().includes(q) ||
        ph.address.toLowerCase().includes(q) ||
        ph.status.toLowerCase().includes(q)
      )
    })
  }, [data.pharmacies, search])

  return (
    <div className="content-wrap">
      <PageHeading
        eyebrow="Pharmacy Home Delivery & Reorders"
        title="Medicine Store"
        description="Reorder medicines based on your verified doctor prescriptions, choose a local pharmacy for fast home delivery, and track delivery progress in real time."
        action={
          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setTargetMedicalStoreId(selectedPharmacyId)
                setChooseMedicalModalOpen(true)
              }}
              className="btn !bg-blue-600 hover:!bg-blue-700 text-white !py-2 !text-xs font-bold flex items-center gap-1.5 shadow-sm"
            >
              <FileText size={14} /> Upload Prescription & Order
            </button>
            <button
              onClick={() => setUploadModalOpen(true)}
              className="btn btn-secondary !py-2 !text-xs font-semibold flex items-center gap-1.5"
            >
              <UploadCloud size={14} className="text-blue-600" /> Add to Profile
            </button>
            <button
              onClick={() => setCartOpen(true)}
              className="btn !bg-emerald-600 hover:!bg-emerald-700 text-white !py-2 !text-xs font-semibold flex items-center gap-2 shadow-sm"
            >
              <ShoppingCart size={15} />
              <span>Cart</span>
              {cart.length > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-white text-emerald-800 text-[10px] font-bold px-1">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        }
      />

      {/* Direct Prescription Ordering Hero Banner */}
      <div className="mb-6 card p-5 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-blue-500/30 px-3 py-1 text-[11px] font-semibold text-blue-200 border border-blue-400/30 mb-2">
              <Sparkles size={12} className="text-amber-300" /> Direct Medical Store Delivery Workflow
            </div>
            <h2 className="text-base font-bold tracking-tight text-white">
              Choose Medical Store & Upload Prescription (Image or PDF)
            </h2>
            <p className="mt-1 text-xs text-blue-200/90 leading-relaxed">
              Upload your paper prescription photo or PDF directly to your chosen medical store. The licensed pharmacist will inspect your prescription, confirm the medications, and dispatch fast home delivery!
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => {
                setTargetMedicalStoreId(selectedPharmacyId)
                setChooseMedicalModalOpen(true)
              }}
              className="btn !bg-emerald-500 hover:!bg-emerald-600 text-white !py-2.5 !px-5 !text-xs font-bold flex items-center gap-2 shadow-lg shadow-emerald-950/40"
            >
              <UploadCloud size={16} /> Choose Store & Upload Rx
            </button>
            <button
              onClick={() => setActiveTab('pharmacies')}
              className="btn !bg-white/10 hover:!bg-white/20 text-white !py-2.5 !px-4 !text-xs font-semibold backdrop-blur"
            >
              View All Medical Stores →
            </button>
          </div>
        </div>
      </div>

      {/* Selected Pharmacy Quick Bar */}
      <div className="mb-6 card p-4 flex flex-wrap items-center justify-between gap-3 bg-gradient-to-r from-emerald-50/70 via-white to-blue-50/40 border border-emerald-100">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-xl shadow-md shadow-emerald-200">
            {selectedPharmacy.logo || '🏥'}
          </span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Selected Home Delivery Pharmacy</span>
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold text-emerald-800">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
                {selectedPharmacy.status}
              </span>
            </div>
            <h3 className="text-sm font-bold text-slate-800">{selectedPharmacy.name}</h3>
            <p className="text-[11px] text-slate-500">
              {selectedPharmacy.distance} · {selectedPharmacy.address} · Phone: {selectedPharmacy.phone}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs">
          <div className="text-right">
            <span className="block text-[10px] text-slate-400">Est. Delivery Speed</span>
            <b className="text-slate-700 flex items-center gap-1 font-semibold">
              <Truck size={13} className="text-emerald-600" /> {selectedPharmacy.estimatedDeliveryTime}
            </b>
          </div>
          <div className="text-right border-l border-slate-200 pl-4">
            <span className="block text-[10px] text-slate-400">Delivery Fee</span>
            <b className="text-slate-800">
              ${selectedPharmacy.deliveryCharge?.toFixed(2)}{' '}
              <span className="text-[10px] font-normal text-emerald-600">
                (Free over ${selectedPharmacy.freeDeliveryThreshold?.toFixed(0)})
              </span>
            </b>
          </div>
          <button
            onClick={() => setActiveTab('pharmacies')}
            className="btn btn-secondary !py-1.5 !text-xs text-blue-700 font-semibold"
          >
            Change Pharmacy →
          </button>
        </div>
      </div>

      {/* Main Navigation Tabs */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-2">
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('catalog')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition ${
              activeTab === 'catalog'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Pill size={14} /> Prescriptions & Medicines
          </button>
          <button
            onClick={() => setActiveTab('pharmacies')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition ${
              activeTab === 'pharmacies'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Store size={14} /> Pharmacies ({data.pharmacies?.length || 3})
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition ${
              activeTab === 'orders'
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <PackageCheck size={14} /> My Medicine Orders ({patientOrders.length})
          </button>
        </div>

        {activeTab === 'catalog' && (
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search medicines, symptoms, Rx..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="form-input !pl-8 !py-1.5 !text-xs !w-56"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="form-input !py-1.5 !text-xs !w-auto"
            >
              <option value="All">All Categories</option>
              <option value="Prescribed For You">Prescribed For You</option>
              <option value="Allergy & Respiratory">Allergy & Respiratory</option>
              <option value="Antibiotics">Antibiotics</option>
              <option value="Pain & Fever (OTC)">Pain & Fever (OTC)</option>
              <option value="Daily Wellness & Vitamins">Daily Wellness & Vitamins</option>
            </select>
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* TAB 1: PRESCRIPTIONS & MEDICINE CATALOG                   */}
      {/* ========================================================= */}
      {activeTab === 'catalog' && (
        <div className="space-y-8">
          {/* Section A: Prescribed Medicines Reordering */}
          {(categoryFilter === 'All' || categoryFilter === 'Prescribed For You' || categoryFilter === 'Allergy & Respiratory' || categoryFilter === 'Antibiotics') && (
            <div>
              <div className="mb-4 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-100 text-blue-700">
                      <ShieldCheck size={14} />
                    </span>
                    <h2 className="text-sm font-bold text-slate-800">
                      Reorder Prescribed Medicines
                    </h2>
                  </div>
                  <p className="text-[11px] text-slate-500 mt-0.5">
                    Authorized medicines from your clinical prescriptions ready for direct home delivery.
                  </p>
                </div>
                <button
                  onClick={() => setUploadModalOpen(true)}
                  className="text-xs font-semibold text-blue-600 hover:underline flex items-center gap-1"
                >
                  <Plus size={13} /> Upload additional prescription
                </button>
              </div>

              {filteredPrescribedMeds.length > 0 ? (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {filteredPrescribedMeds.map((med) => {
                    const currentQty = reorderQuantities[med.name] || 1
                    return (
                      <div
                        key={`${med.prescriptionId}-${med.name}`}
                        className={`card p-5 flex flex-col justify-between transition hover:shadow-md ${
                          med.isDiscontinued ? 'opacity-70 bg-slate-50/70 border-dashed' : ''
                        }`}
                      >
                        <div>
                          {/* Header: Rx Tag and Status */}
                          <div className="flex items-start justify-between gap-2">
                            <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-[10px] font-bold text-blue-700 border border-blue-100">
                              <ShieldCheck size={11} /> Verified Rx {med.prescriptionId}
                            </span>
                            {med.isDiscontinued ? (
                              <Badge tone="rose">Out of Stock</Badge>
                            ) : med.inStock ? (
                              <Badge tone="green">In Stock</Badge>
                            ) : (
                              <Badge tone="rose">Out of Stock</Badge>
                            )}
                          </div>

                          {/* Medicine Name and Strength */}
                          <h3 className="mt-2 text-sm font-bold text-slate-800">{med.name}</h3>
                          <div className="text-xs font-semibold text-slate-600">
                            {med.dosage} · <span className="font-normal text-slate-500">{med.form}</span>
                          </div>

                          {/* Prescribed Dosage and Instructions */}
                          <div className="mt-3 rounded-lg bg-slate-50 p-2.5 text-xs space-y-1 border border-slate-100">
                            <div className="flex justify-between text-[11px]">
                              <span className="text-slate-400">Schedule:</span>
                              <b className="text-slate-700">{med.frequency}</b>
                            </div>
                            <div className="flex justify-between text-[11px]">
                              <span className="text-slate-400">Prescribed Course:</span>
                              <b className="text-slate-700">{med.duration}</b>
                            </div>
                            <div className="flex justify-between text-[11px]">
                              <span className="text-slate-400">Prescribing Doctor:</span>
                              <span className="text-slate-700 font-medium">{med.doctorName}</span>
                            </div>
                          </div>

                          {med.instructions && (
                            <p className="mt-2 text-[10px] text-slate-500 italic line-clamp-2">
                              "{med.instructions}"
                            </p>
                          )}
                        </div>

                        {/* Price, Quantity, and Reorder Action */}
                        <div className="mt-4 pt-3 border-t border-slate-100">
                          {med.isDiscontinued ? (
                            <div className="rounded-lg bg-rose-50 p-2 text-[11px] text-rose-700 flex items-start gap-1.5">
                              <AlertTriangle size={13} className="shrink-0 mt-0.5" />
                              <span>Currently out of stock. Please consult your physician for an authorized therapeutic alternative.</span>
                            </div>
                          ) : (
                            <div>
                              <div className="flex items-center justify-between mb-3">
                                <div>
                                  <span className="text-[10px] text-slate-400">Price per pack:</span>
                                  <div className="text-sm font-bold text-slate-800">₹{med.unitPrice.toFixed(2)}</div>
                                </div>
                                <div className="flex items-center gap-1 border border-slate-200 rounded-lg bg-white p-0.5">
                                  <button
                                    onClick={() =>
                                      setReorderQuantities((prev) => ({
                                        ...prev,
                                        [med.name]: Math.max(1, (prev[med.name] || 1) - 1),
                                      }))
                                    }
                                    className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded"
                                    aria-label="Decrease quantity"
                                  >
                                    <Minus size={12} />
                                  </button>
                                  <span className="w-6 text-center text-xs font-semibold text-slate-700">
                                    {currentQty}
                                  </span>
                                  <button
                                    onClick={() =>
                                      setReorderQuantities((prev) => ({
                                        ...prev,
                                        [med.name]: Math.min(5, (prev[med.name] || 1) + 1),
                                      }))
                                    }
                                    className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded"
                                    aria-label="Increase quantity"
                                  >
                                    <Plus size={12} />
                                  </button>
                                </div>
                              </div>

                              <button
                                onClick={() => handleAddPrescribedToCart(med)}
                                className="btn !bg-emerald-600 hover:!bg-emerald-700 text-white w-full !py-2 !text-xs font-semibold flex items-center justify-center gap-1.5 shadow-sm"
                              >
                                <ShoppingBag size={14} /> Buy Again / Reorder
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
              ) : (
                <div className="card p-8 text-center text-xs text-slate-400">
                  No prescribed medicines found matching your search.
                </div>
              )}
            </div>
          )}

          {/* Section B: Available Non-Prescription (OTC) & Daily Wellness */}
          {(categoryFilter === 'All' || categoryFilter !== 'Prescribed For You') && filteredOtcMeds.length > 0 && (
            <div>
              <div className="mb-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-100 text-emerald-700">
                    <Sparkles size={14} />
                  </span>
                  <h2 className="text-sm font-bold text-slate-800">
                    Over-the-Counter & Supportive Care
                  </h2>
                </div>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Non-prescription essentials, immune support, and sinus kits you can add to your delivery.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {filteredOtcMeds.map((otc) => (
                  <div key={otc.id} className="card p-4 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <span className="rounded bg-slate-100 px-2 py-0.5 text-[9px] font-semibold text-slate-600">
                          {otc.category}
                        </span>
                        <span className="text-[10px] text-emerald-600 font-semibold">No Rx Required</span>
                      </div>
                      <h4 className="mt-2 text-xs font-bold text-slate-800">{otc.name}</h4>
                      <div className="text-[11px] text-slate-500">{otc.dosage} · {otc.packageSize}</div>
                      <p className="mt-2 text-[10px] text-slate-400 line-clamp-2">{otc.description}</p>
                    </div>

                    <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                      <div className="text-sm font-bold text-slate-800">₹{otc.unitPrice.toFixed(2)}</div>
                      <button
                        onClick={() => handleAddOtcToCart(otc)}
                        className="btn btn-secondary !py-1.5 !text-xs font-semibold text-emerald-700 hover:bg-emerald-50 flex items-center gap-1"
                      >
                        <Plus size={13} /> Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Section C: Unavailable / Discontinued Medicines Warning Banner */}
          <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-4 text-xs text-amber-900 flex items-start gap-3">
            <AlertCircle size={18} className="shrink-0 mt-0.5 text-amber-600" />
            <div className="leading-relaxed">
              <b>Prescription Compliance & Discontinued Formulations:</b> ClinicOS guarantees that prescription-only medicines are strictly dispensed upon physician verification. Discontinued, expired, or out-of-stock medications are tagged in real-time. If your medication has run out and has 0 remaining refills, please book a quick follow-up consultation with your attending doctor.
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: PHARMACIES WITH HOME DELIVERY                      */}
      {/* ========================================================= */}
      {activeTab === 'pharmacies' && (
        <div className="space-y-6">
          <div>
            <h2 className="text-sm font-bold text-slate-800">Verified Local Pharmacies with Home Delivery</h2>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Select your preferred pharmacy based on medicine inventory availability, delivery fee, and arrival time.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
            {filteredPharmacies.map((ph) => {
              const isSelected = selectedPharmacyId === ph.id
              const availableInStockCount = (ph.inventory || []).filter((i) => i.inStock).length

              return (
                <div
                  key={ph.id}
                  className={`card p-5 flex flex-col justify-between transition ${
                    isSelected ? 'ring-2 ring-emerald-500 border-emerald-500 bg-emerald-50/20' : 'hover:shadow-md'
                  }`}
                >
                  <div>
                    {/* Header: Logo, Name, Rating */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-2xl shadow-sm">
                          {ph.logo || '🏥'}
                        </span>
                        <div>
                          <h3 className="text-sm font-bold text-slate-800">{ph.name}</h3>
                          <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-0.5">
                            <span className="font-semibold text-amber-600">★ {ph.rating}</span>
                            <span>({ph.reviewsCount} reviews)</span>
                          </div>
                        </div>
                      </div>
                      {isSelected ? (
                        <span className="rounded-full bg-emerald-600 text-white px-2.5 py-0.5 text-[10px] font-bold">
                          Active
                        </span>
                      ) : (
                        <Badge tone="green">{ph.status}</Badge>
                      )}
                    </div>

                    {/* Location & Contact */}
                    <div className="mt-4 space-y-1.5 text-xs border-y border-slate-100 py-3">
                      <div className="flex items-start gap-1.5 text-slate-600">
                        <MapPin size={13} className="shrink-0 mt-0.5 text-slate-400" />
                        <span>{ph.address} ({ph.distance})</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-600">
                        <Phone size={13} className="shrink-0 text-slate-400" />
                        <span>{ph.phone}</span>
                      </div>
                    </div>

                    {/* Delivery Details Grid */}
                    <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                      <div className="rounded-lg bg-slate-50 p-2">
                        <span className="block text-[10px] text-slate-400">Est. Delivery Speed</span>
                        <b className="text-slate-800 flex items-center gap-1">
                          <Truck size={12} className="text-emerald-600" /> {ph.estimatedDeliveryTime}
                        </b>
                      </div>
                      <div className="rounded-lg bg-slate-50 p-2">
                        <span className="block text-[10px] text-slate-400">Delivery Fee</span>
                        <b className="text-slate-800">₹{ph.deliveryCharge.toFixed(2)}</b>
                      </div>
                      <div className="rounded-lg bg-slate-50 p-2">
                        <span className="block text-[10px] text-slate-400">Free Delivery Over</span>
                        <b className="text-emerald-700">₹{ph.freeDeliveryThreshold.toFixed(0)}</b>
                      </div>
                      <div className="rounded-lg bg-slate-50 p-2">
                        <span className="block text-[10px] text-slate-400">Min. Order</span>
                        <b className="text-slate-800">₹{ph.minOrderAmount.toFixed(0)}</b>
                      </div>
                    </div>

                    {/* Payment methods available */}
                    <div className="mt-3 flex items-center gap-2 text-[10px] text-slate-500">
                      <span>Payment:</span>
                      {ph.acceptsOnline && <span className="rounded bg-slate-100 px-1.5 py-0.5">Online Card</span>}
                      {ph.acceptsCod && <span className="rounded bg-slate-100 px-1.5 py-0.5">Cash on Delivery</span>}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-5 pt-3 border-t border-slate-100 space-y-2">
                    <button
                      onClick={() => {
                        setTargetMedicalStoreId(ph.id)
                        setSelectedPharmacyId(ph.id)
                        setChooseMedicalModalOpen(true)
                      }}
                      className="w-full btn !bg-blue-600 hover:!bg-blue-700 text-white !py-2 !text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <UploadCloud size={14} /> Upload Prescription & Order Here
                    </button>
                    <button
                      onClick={() => {
                        setSelectedPharmacyId(ph.id)
                        notify(`Selected ${ph.name} for home delivery.`)
                        setActiveTab('catalog')
                      }}
                      className={`w-full btn !py-1.5 !text-xs font-semibold flex items-center justify-center gap-1.5 ${
                        isSelected
                          ? 'btn-secondary text-emerald-800'
                          : 'btn-secondary text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      {isSelected ? (
                        <>
                          <Check size={14} /> Selected Medical Store (Catalog)
                        </>
                      ) : (
                        'Browse Medicine Catalog'
                      )}
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 3: MY MEDICINE ORDERS & LIVE TRACKING                 */}
      {/* ========================================================= */}
      {activeTab === 'orders' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-sm font-bold text-slate-800">My Medicine Orders & Delivery Tracking</h2>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Monitor preparation, dispatch, and live delivery status for your home delivered prescriptions.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('catalog')}
              className="btn btn-secondary !py-1.5 !text-xs text-emerald-800 font-semibold flex items-center gap-1"
            >
              <Plus size={13} /> Order More Medicines
            </button>
          </div>

          {patientOrders.length > 0 ? (
            <div className="space-y-6">
              {patientOrders.map((order) => {
                const statuses = [
                  'Order Placed',
                  'Pharmacy Accepted',
                  'Preparing Order',
                  'Out for Delivery',
                  'Delivered',
                ]
                const currentStatusIdx = statuses.indexOf(order.status)
                const isCancelled = order.status === 'Cancelled'

                return (
                  <div key={order.id} className="card p-6 space-y-5">
                    {/* Order Header */}
                    <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-blue-700">{order.id}</span>
                          <Badge
                            tone={
                              order.status === 'Delivered'
                                ? 'green'
                                : order.status === 'Out for Delivery'
                                ? 'green'
                                : order.status === 'Cancelled'
                                ? 'rose'
                                : 'blue'
                            }
                          >
                            {order.status}
                          </Badge>
                          {order.prescriptionId && (
                            <span className="rounded bg-blue-50 px-2 py-0.5 text-[9px] font-semibold text-blue-700 border border-blue-100">
                              Rx: {order.prescriptionId}
                            </span>
                          )}
                          {(order.orderType === 'Prescription Upload' || order.prescriptionFileName) && (
                            <span className="inline-flex items-center gap-1 rounded bg-indigo-50 px-2 py-0.5 text-[9px] font-bold text-indigo-700 border border-indigo-200">
                              <FileText size={10} /> Uploaded Rx ({order.prescriptionFileType === 'pdf' ? 'PDF' : 'Image'})
                            </span>
                          )}
                          {order.prescriptionVerified && (
                            <span className="inline-flex items-center gap-1 rounded bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-700 border border-emerald-200">
                              <Check size={10} /> Verified by Store
                            </span>
                          )}
                        </div>
                        <h3 className="mt-1 text-sm font-bold text-slate-800">
                          {order.pharmacyName}
                        </h3>
                        <p className="text-[11px] text-slate-500">
                          Ordered on {order.orderDate} · Delivery Address: <b>{order.deliveryAddress}</b>
                        </p>
                      </div>

                      <div className="text-right">
                        <div className="text-base font-extrabold text-slate-800">
                          ${order.totalAmount.toFixed(2)}
                        </div>
                        <div className="text-[10px] text-slate-400">
                          {order.paymentMethod} · <b className="text-emerald-700">{order.paymentStatus}</b>
                        </div>
                        <div className="mt-1 text-xs font-semibold text-slate-600 flex items-center justify-end gap-1">
                          <Truck size={13} className="text-emerald-600" />
                          <span>{order.estimatedDeliveryTime}</span>
                        </div>
                      </div>
                    </div>

                    {/* Prescription Verification Status Banner for Uploaded Orders */}
                    {(order.orderType === 'Prescription Upload' || order.prescriptionFileName) && (
                      <div>
                        {!order.prescriptionVerified && order.status === 'Order Placed' ? (
                          <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs text-amber-900">
                            <div className="flex items-start gap-2.5">
                              <Clock size={16} className="text-amber-600 shrink-0 mt-0.5" />
                              <div>
                                <b className="block font-bold">Awaiting Medical Store Verification & Confirmation</b>
                                <p className="mt-0.5 text-[11px] text-amber-800 leading-relaxed">
                                  The pharmacist at <b>{order.pharmacyName}</b> is inspecting your uploaded prescription ({order.prescriptionFileName}). Once confirmed, order packaging & delivery will begin immediately.
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={() => setViewPrescriptionModalOrder(order)}
                              className="btn btn-secondary !py-1 !px-2.5 !text-xs font-semibold shrink-0 text-amber-900 flex items-center gap-1 bg-white hover:bg-amber-100/50 shadow-sm"
                            >
                              <Eye size={12} /> View Uploaded Rx
                            </button>
                          </div>
                        ) : order.prescriptionVerified ? (
                          <div className="rounded-xl border border-emerald-200 bg-emerald-50/80 p-3 flex flex-wrap items-center justify-between gap-3 text-xs text-emerald-900">
                            <div className="flex items-center gap-2">
                              <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                              <span>
                                <b>Prescription Verified & Confirmed!</b> Inspected by {order.verifiedBy || 'Medical Store Pharmacist'}.
                              </span>
                            </div>
                            <button
                              onClick={() => setViewPrescriptionModalOrder(order)}
                              className="text-[11px] font-semibold text-emerald-800 hover:underline flex items-center gap-1"
                            >
                              <Eye size={12} /> View Rx Document
                            </button>
                          </div>
                        ) : null}
                      </div>
                    )}

                    {/* Step-by-Step Delivery Progress Tracker */}
                    {!isCancelled ? (
                      <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
                        <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-3">
                          Live Delivery Tracking
                        </h4>
                        <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-4">
                          {statuses.map((step, idx) => {
                            const isCompleted = currentStatusIdx >= idx
                            const isCurrent = currentStatusIdx === idx
                            return (
                              <div key={step} className="flex-1 flex md:flex-col items-center gap-2 relative">
                                <div
                                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold transition ${
                                    isCompleted
                                      ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
                                      : 'bg-slate-200 text-slate-500'
                                  } ${isCurrent ? 'ring-4 ring-emerald-100' : ''}`}
                                >
                                  {isCompleted ? <Check size={14} /> : idx + 1}
                                </div>
                                <div className="text-left md:text-center">
                                  <div
                                    className={`text-xs font-semibold ${
                                      isCurrent
                                        ? 'text-emerald-800 font-bold'
                                        : isCompleted
                                        ? 'text-slate-800'
                                        : 'text-slate-400'
                                    }`}
                                  >
                                    {step}
                                  </div>
                                  {isCurrent && (
                                    <span className="text-[9px] text-emerald-600 font-medium animate-pulse">
                                      In progress
                                    </span>
                                  )}
                                </div>
                              </div>
                            )
                          })}
                        </div>

                        {/* Recent Tracking Timeline Notes */}
                        {order.trackingTimeline && order.trackingTimeline.length > 0 && (
                          <div className="mt-4 border-t border-slate-200 pt-3 text-[11px] text-slate-600 space-y-1">
                            {order.trackingTimeline.map((item, tIdx) => (
                              <div key={tIdx} className="flex items-center gap-2">
                                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                                <span className="font-mono text-slate-400">{item.timestamp}</span>
                                <b>{item.status}:</b>
                                <span className="text-slate-500">{item.note}</span>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="rounded-xl bg-rose-50 p-4 border border-rose-200 text-xs text-rose-800">
                        <b>Order Cancelled:</b> This medicine delivery order was cancelled. Any online payment has been refunded to your original payment method.
                      </div>
                    )}

                    {/* Ordered Items Table */}
                    <div className="space-y-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Prescribed Medicines in this Order
                      </span>
                      <div className="divide-y divide-slate-100 rounded-lg border border-slate-100">
                        {order.items.map((item, itemIdx) => (
                          <div
                            key={itemIdx}
                            className="flex items-center justify-between p-2.5 text-xs"
                          >
                            <div className="flex items-center gap-2">
                              <Pill size={14} className="text-blue-600" />
                              <div>
                                <b className="text-slate-800">{item.name}</b>
                                <span className="text-slate-400 ml-1.5">({item.dosage} · {item.form})</span>
                                {item.requiresPrescription && (
                                  <span className="ml-2 rounded bg-blue-50 px-1.5 py-0.5 text-[9px] font-semibold text-blue-700">
                                    Rx Verified
                                  </span>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              <span className="text-slate-500">{item.quantity} × ₹{item.unitPrice.toFixed(2)}</span>
                              <b className="text-slate-800 ml-3">₹{(item.unitPrice * item.quantity).toFixed(2)}</b>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Actions Row */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span>Pharmacy Help Desk: <b>{order.pharmacyPhone}</b></span>
                      </div>
                      <div className="flex items-center gap-2">
                        {order.status === 'Order Placed' && (
                          <button
                            onClick={() => {
                              if (confirm('Are you sure you want to cancel this medicine order?')) {
                                updateMedicineOrderStatus(order.id, 'Cancelled', 'Cancelled by patient request.')
                              }
                            }}
                            className="btn btn-ghost !py-1 !text-xs text-rose-600 hover:bg-rose-50"
                          >
                            Cancel Order
                          </button>
                        )}
                        {(order.orderType === 'Prescription Upload' || order.prescriptionFileName) && (
                          <button
                            onClick={() => setViewPrescriptionModalOrder(order)}
                            className="btn btn-secondary !py-1 !text-xs font-semibold text-indigo-700 flex items-center gap-1"
                          >
                            <Eye size={13} /> View Prescription
                          </button>
                        )}
                        <button
                          onClick={() => {
                            const waText = `Hello ${order.pharmacyName}, I am inquiring about my medicine delivery order ${order.id} for ${order.patientName}. Current status is ${order.status}.`
                            openWhatsAppChat(order.pharmacyPhone, waText)
                          }}
                          className="btn !bg-[#25D366] hover:!bg-[#20bd5a] text-white !py-1 !text-xs flex items-center gap-1.5 font-semibold"
                        >
                          <WhatsAppIcon size={14} /> WhatsApp Pharmacy
                        </button>
                        <button
                          onClick={() => window.print()}
                          className="btn btn-secondary !py-1 !text-xs font-semibold text-slate-600"
                        >
                          <Printer size={13} /> Order Receipt
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="card py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
                <Truck size={28} />
              </div>
              <h3 className="mt-3 text-sm font-semibold text-slate-800">No medicine orders placed yet</h3>
              <p className="mt-1 text-xs text-slate-400 max-w-sm mx-auto">
                Need your prescribed medicines? Reorder from your authorized doctor prescriptions and get home delivery in 30–45 minutes.
              </p>
              <button
                onClick={() => setActiveTab('catalog')}
                className="btn !bg-emerald-600 hover:!bg-emerald-700 text-white mt-4 !py-2 !text-xs font-semibold"
              >
                Browse & Reorder Prescriptions
              </button>
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* SHOPPING CART & CHECKOUT SLIDEOVER / MODAL                */}
      {/* ========================================================= */}
      {cartOpen && (
        <Modal title="Medicine Shopping Cart & Home Delivery" onClose={() => setCartOpen(false)} wide>
          <div className="space-y-5 text-xs">
            {/* Pharmacy Notice */}
            <div className="rounded-xl border border-emerald-100 bg-emerald-50/70 p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-xl">{selectedPharmacy.logo || '🏥'}</span>
                <div>
                  <b className="text-xs text-slate-800">{selectedPharmacy.name}</b>
                  <div className="text-[10px] text-slate-500">
                    Delivering to your doorstep · Estimated: <b>{selectedPharmacy.estimatedDeliveryTime}</b>
                  </div>
                </div>
              </div>
              <button
                onClick={() => {
                  setCartOpen(false)
                  setActiveTab('pharmacies')
                }}
                className="text-[11px] font-semibold text-blue-600 hover:underline"
              >
                Change Pharmacy
              </button>
            </div>

            {checkoutError && (
              <div className="rounded-lg border border-rose-200 bg-rose-50 p-3 text-rose-700 flex items-center gap-2">
                <AlertCircle size={15} className="shrink-0" />
                <span>{checkoutError}</span>
              </div>
            )}

            {/* Cart Items List */}
            {cart.length > 0 ? (
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  Items to Dispense ({cart.length})
                </span>
                <div className="divide-y divide-slate-100 rounded-xl border border-slate-200 max-h-56 overflow-y-auto">
                  {cart.map((item, idx) => (
                    <div key={item.id} className="p-3 flex items-center justify-between gap-3">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <b className="text-xs text-slate-800">{item.name}</b>
                          {item.requiresPrescription ? (
                            <span className="inline-flex items-center gap-0.5 rounded bg-blue-50 px-1.5 py-0.5 text-[9px] font-bold text-blue-700 border border-blue-100">
                              <ShieldCheck size={10} /> Rx: {item.prescriptionId}
                            </span>
                          ) : (
                            <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[9px] font-medium text-slate-600">
                              OTC
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {item.dosage} · ${item.unitPrice.toFixed(2)} each
                        </div>
                      </div>

                      {/* Quantity Controller */}
                      <div className="flex items-center gap-1 border border-slate-200 rounded-lg p-0.5">
                        <button
                          onClick={() => updateCartQuantity(idx, -1)}
                          className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded"
                          aria-label="Decrease quantity"
                        >
                          <Minus size={11} />
                        </button>
                        <span className="w-5 text-center text-xs font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateCartQuantity(idx, 1)}
                          className="p-1 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded"
                          aria-label="Increase quantity"
                        >
                          <Plus size={11} />
                        </button>
                      </div>

                      {/* Item Total */}
                      <div className="text-right w-16">
                        <b className="text-xs text-slate-800">
                          ${(item.unitPrice * item.quantity).toFixed(2)}
                        </b>
                      </div>

                      {/* Remove */}
                      <button
                        onClick={() => removeCartItem(idx)}
                        className="text-slate-400 hover:text-rose-600 p-1"
                        title="Remove item"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="py-8 text-center text-slate-400">
                Your medicine cart is empty. Please select prescribed medicines to purchase.
              </div>
            )}

            {/* Delivery Address & Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-slate-100 pt-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Home Delivery Address
                </label>
                <input
                  type="text"
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="Enter full street address and city"
                  className="form-input !text-xs !py-2"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Contact Phone Number
                </label>
                <input
                  type="tel"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  placeholder="e.g. (415) 555-0123"
                  className="form-input !text-xs !py-2"
                />
              </div>
            </div>

            {/* Payment Method Selector */}
            <div className="border-t border-slate-100 pt-3">
              <label className="block font-semibold text-slate-700 mb-2">Select Payment Method</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('Online Payment (Credit / Debit Card)')}
                  className={`rounded-xl border p-3 text-left transition flex items-center justify-between ${
                    paymentMethod.includes('Online')
                      ? 'border-emerald-500 bg-emerald-50/50 ring-2 ring-emerald-100'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div>
                    <b className="block text-xs text-slate-800">Online Payment</b>
                    <span className="text-[10px] text-slate-500">Credit / Debit Card (Simulated TXN)</span>
                  </div>
                  <CreditCard size={18} className={paymentMethod.includes('Online') ? 'text-emerald-700' : 'text-slate-400'} />
                </button>

                <button
                  type="button"
                  disabled={!selectedPharmacy.acceptsCod}
                  onClick={() => setPaymentMethod('Cash on Delivery (COD)')}
                  className={`rounded-xl border p-3 text-left transition flex items-center justify-between ${
                    paymentMethod.includes('Cash')
                      ? 'border-emerald-500 bg-emerald-50/50 ring-2 ring-emerald-100'
                      : 'border-slate-200 hover:border-slate-300'
                  } ${!selectedPharmacy.acceptsCod ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <div>
                    <b className="block text-xs text-slate-800">Cash on Delivery (COD)</b>
                    <span className="text-[10px] text-slate-500">
                      {selectedPharmacy.acceptsCod ? 'Pay cash to delivery courier' : 'Not supported by pharmacy'}
                    </span>
                  </div>
                  <Truck size={18} className={paymentMethod.includes('Cash') ? 'text-emerald-700' : 'text-slate-400'} />
                </button>
              </div>
            </div>

            {/* Bill Summary Breakdown */}
            <div className="rounded-xl bg-slate-50 p-4 space-y-2 border border-slate-100">
              <div className="flex justify-between text-slate-600">
                <span>Medicines Subtotal:</span>
                <b>₹{cartSubtotal.toFixed(2)}</b>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Home Delivery Fee:</span>
                {deliveryCharge === 0 ? (
                  <b className="text-emerald-700">FREE (Order &gt; ₹{freeDeliveryThreshold.toFixed(0)})</b>
                ) : (
                  <b>₹{deliveryCharge.toFixed(2)}</b>
                )}
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Care Loyalty Discount:</span>
                  <b>-₹{discount.toFixed(2)}</b>
                </div>
              )}
              <div className="flex justify-between border-t border-slate-200 pt-2 text-sm font-bold text-slate-800">
                <span>Final Payable Amount:</span>
                <span className="text-emerald-700">₹{cartTotal.toFixed(2)}</span>
              </div>
            </div>

            {/* Order Confirmation Footer */}
            <div className="flex items-center justify-between border-t border-slate-100 pt-3">
              <button
                type="button"
                onClick={() => setCartOpen(false)}
                className="btn btn-secondary !py-2 !text-xs font-semibold"
              >
                Continue Shopping
              </button>
              <button
                type="button"
                disabled={!cart.length || isPlacingOrder}
                onClick={handleCheckoutSubmit}
                className="btn !bg-emerald-600 hover:!bg-emerald-700 text-white !py-2.5 !px-5 !text-xs font-bold flex items-center gap-2 shadow-md disabled:opacity-50"
              >
                {isPlacingOrder ? (
                  'Processing...'
                ) : (
                  <>
                    <PackageCheck size={16} /> Place Medicine Order (${cartTotal.toFixed(2)})
                  </>
                )}
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* ========================================================= */}
      {/* UPLOAD PRESCRIPTION MODAL                                 */}
      {/* ========================================================= */}
      {uploadModalOpen && (
        <Modal title="Upload Doctor Prescription" onClose={() => setUploadModalOpen(false)}>
          <form onSubmit={handleUploadSubmit} className="space-y-4 text-xs">
            <div className="rounded-xl border border-blue-100 bg-blue-50/70 p-3 text-blue-900 flex items-start gap-2.5">
              <ShieldCheck size={18} className="shrink-0 mt-0.5 text-blue-600" />
              <div>
                <b className="block">Add External Valid Prescription</b>
                <p className="mt-0.5 text-[11px] text-blue-700 leading-relaxed">
                  Have a prescription issued by another licensed clinic or hospital? Upload it here so our partner pharmacies can verify and deliver your medications.
                </p>
              </div>
            </div>

            {uploadError && (
              <div className="rounded-lg border border-rose-200 bg-rose-50 p-2.5 text-rose-700 flex items-center gap-2">
                <AlertCircle size={14} className="shrink-0" />
                <span>{uploadError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Prescribing Doctor's Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Robert Chen"
                  value={uploadDoctor}
                  onChange={(e) => setUploadDoctor(e.target.value)}
                  className="form-input !text-xs !py-2"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Clinic / Hospital Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bay Medical Center"
                  value={uploadClinic}
                  onChange={(e) => setUploadClinic(e.target.value)}
                  className="form-input !text-xs !py-2"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Diagnosis / Indication</label>
              <input
                type="text"
                placeholder="e.g. Acute Sinusitis, Hypertension, Asthma"
                value={uploadDiagnosis}
                onChange={(e) => setUploadDiagnosis(e.target.value)}
                className="form-input !text-xs !py-2"
              />
            </div>

            {/* Prescribed Medicine Input */}
            <div className="rounded-xl border border-slate-200 p-3 space-y-3 bg-slate-50/50">
              <span className="block text-[11px] font-bold text-slate-700">Prescribed Medicine Details</span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <label className="block text-[10px] text-slate-500 mb-0.5">Medicine Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Amoxicillin, Montelukast"
                    value={uploadMedName}
                    onChange={(e) => setUploadMedName(e.target.value)}
                    className="form-input !text-xs !py-1.5"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-500 mb-0.5">Dosage / Strength</label>
                  <input
                    type="text"
                    placeholder="e.g. 500 mg, 10 mg"
                    value={uploadMedDosage}
                    onChange={(e) => setUploadMedDosage(e.target.value)}
                    className="form-input !text-xs !py-1.5"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div>
                  <label className="block text-[10px] text-slate-500 mb-0.5">Form</label>
                  <select
                    value={uploadMedForm}
                    onChange={(e) => setUploadMedForm(e.target.value)}
                    className="form-input !text-xs !py-1.5"
                  >
                    <option value="Tablet">Tablet</option>
                    <option value="Capsule">Capsule</option>
                    <option value="Syrup / Liquid">Syrup / Liquid</option>
                    <option value="Nasal Spray">Nasal Spray</option>
                    <option value="Inhaler">Inhaler</option>
                    <option value="Ointment">Ointment</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] text-slate-500 mb-0.5">Frequency</label>
                  <input
                    type="text"
                    placeholder="e.g. Twice daily"
                    value={uploadMedFrequency}
                    onChange={(e) => setUploadMedFrequency(e.target.value)}
                    className="form-input !text-xs !py-1.5"
                  />
                </div>
                <div>
                  <label className="block text-[10px] text-slate-500 mb-0.5">Course Duration</label>
                  <input
                    type="text"
                    placeholder="e.g. 10 days"
                    value={uploadMedDuration}
                    onChange={(e) => setUploadMedDuration(e.target.value)}
                    className="form-input !text-xs !py-1.5"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Prescription Scan / Document</label>
              <div className="flex items-center gap-3 rounded-lg border border-dashed border-slate-300 p-3 bg-white">
                <UploadCloud size={20} className="text-blue-600 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-slate-700 truncate">{uploadFileName}</div>
                  <div className="text-[10px] text-slate-400">PDF, JPG, PNG accepted (Max 10MB)</div>
                </div>
                <button
                  type="button"
                  onClick={() => setUploadFileName(`Rx_Document_${Date.now().toString().slice(-4)}.pdf`)}
                  className="btn btn-secondary !py-1 !text-[11px]"
                >
                  Choose File
                </button>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Doctor's Instructions & Notes</label>
              <textarea
                rows={2}
                placeholder="e.g. Take with food, finish complete antibiotic course"
                value={uploadAdvice}
                onChange={(e) => setUploadAdvice(e.target.value)}
                className="form-input !text-xs !py-1.5"
              />
            </div>

            <div className="flex justify-end gap-2 border-t border-slate-100 pt-3">
              <button
                type="button"
                onClick={() => setUploadModalOpen(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn !bg-blue-600 hover:!bg-blue-700 text-white font-semibold flex items-center gap-1.5"
              >
                <Check size={14} /> Submit & Add Prescription
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* ========================================================= */}
      {/* ORDER PLACED CONFIRMATION SUCCESS MODAL                   */}
      {/* ========================================================= */}
      {orderConfirmed && (
        <Modal title="Medicine Order Placed Successfully! 🎉" onClose={() => setOrderConfirmed(null)}>
          <div className="space-y-4 text-xs text-center p-2">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 shadow-lg shadow-emerald-200">
              <PackageCheck size={32} />
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">
                Order Confirmed
              </span>
              <h3 className="text-base font-extrabold text-slate-800 mt-0.5">
                {orderConfirmed.id}
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Your order has been submitted to <b>{orderConfirmed.pharmacyName}</b>.
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4 text-left space-y-2 border border-slate-100">
              <div className="flex justify-between">
                <span className="text-slate-400">Estimated Delivery:</span>
                <b className="text-emerald-700">{orderConfirmed.estimatedDeliveryTime}</b>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Delivery Address:</span>
                <span className="font-semibold text-slate-700">{orderConfirmed.deliveryAddress}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Payment Status:</span>
                <b className="text-slate-800">{orderConfirmed.paymentStatus}</b>
              </div>
              <div className="flex justify-between border-t border-slate-200 pt-2 font-bold text-slate-800">
                <span>Total Amount:</span>
                <span className="text-emerald-700">₹{orderConfirmed.totalAmount.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-3 pt-2">
              <button
                onClick={() => {
                  const waText = `Hello, my medicine order ${orderConfirmed.id} is confirmed at ${orderConfirmed.pharmacyName}. Delivery address: ${orderConfirmed.deliveryAddress}.`
                  openWhatsAppChat(orderConfirmed.pharmacyPhone, waText)
                }}
                className="btn !bg-[#25D366] hover:!bg-[#20bd5a] text-white flex items-center gap-1.5 font-semibold"
              >
                <WhatsAppIcon size={15} /> Confirm via WhatsApp
              </button>
              <button
                onClick={() => {
                  setOrderConfirmed(null)
                  setActiveTab('orders')
                }}
                className="btn !bg-emerald-600 hover:!bg-emerald-700 text-white font-semibold"
              >
                Track Delivery Live →
              </button>
            </div>
          </div>
        </Modal>
      )}

      {/* ========================================================= */}
      {/* MODAL: CHOOSE MEDICAL STORE & UPLOAD PRESCRIPTION          */}
      {/* ========================================================= */}
      {chooseMedicalModalOpen && (
        <Modal
          title="Choose Medical Store & Upload Prescription for Home Delivery"
          onClose={() => setChooseMedicalModalOpen(false)}
          wide
        >
          <form onSubmit={handleChooseMedicalUploadOrderSubmit} className="space-y-5 text-xs">
            {/* Step 1: Choose Medical Store */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-bold text-slate-800">
                  Step 1: Choose Medical Store (Pharmacy)
                </label>
                <span className="text-[11px] text-slate-400">
                  Select nearest store for fastest delivery
                </span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {(data.pharmacies || []).map((ph) => {
                  const isStoreSelected = targetMedicalStoreId === ph.id
                  return (
                    <div
                      key={ph.id}
                      onClick={() => setTargetMedicalStoreId(ph.id)}
                      className={`cursor-pointer rounded-xl border p-3.5 transition flex flex-col justify-between ${
                        isStoreSelected
                          ? 'border-blue-600 bg-blue-50/40 ring-2 ring-blue-500 shadow-sm'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-2xl">{ph.logo || '🏥'}</span>
                          {isStoreSelected ? (
                            <span className="rounded-full bg-blue-600 text-white px-2 py-0.5 text-[9px] font-bold">
                              Selected Store
                            </span>
                          ) : (
                            <span className="text-[10px] text-emerald-700 font-semibold">{ph.status}</span>
                          )}
                        </div>
                        <h4 className="mt-2 text-xs font-bold text-slate-800 leading-snug">{ph.name}</h4>
                        <p className="mt-0.5 text-[10px] text-slate-500 line-clamp-1">{ph.address}</p>
                      </div>

                      <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-600">
                        <span className="flex items-center gap-1">
                          <Truck size={11} className="text-emerald-600" /> {ph.estimatedDeliveryTime}
                        </span>
                        <b>Fee: ₹{ph.deliveryCharge.toFixed(2)}</b>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Step 2: Upload Prescription (Image or PDF) */}
            <div className="border-t border-slate-100 pt-4 space-y-3">
              <div className="flex items-center justify-between">
                <label className="block text-xs font-bold text-slate-800">
                  Step 2: Upload Prescription (Image or PDF) *
                </label>
                <span className="text-[10px] text-slate-400">Supported: JPG, PNG, WEBP, PDF</span>
              </div>

              {/* Upload Drop Zone / Input */}
              <div className="rounded-xl border-2 border-dashed border-blue-200 bg-blue-50/30 p-4 text-center hover:bg-blue-50/50 transition">
                <input
                  type="file"
                  id="prescription-file-input"
                  accept="image/jpeg,image/png,image/webp,application/pdf"
                  onChange={handlePrescriptionFileUpload}
                  className="hidden"
                />
                <label htmlFor="prescription-file-input" className="cursor-pointer block">
                  <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-blue-100 text-blue-600 mb-2">
                    <UploadCloud size={22} />
                  </div>
                  <div className="text-xs font-bold text-slate-800">
                    Click to browse or drop prescription file here
                  </div>
                  <div className="text-[10px] text-slate-500 mt-0.5">
                    Upload camera photo of paper prescription or digital PDF
                  </div>
                </label>

                {/* Sample Prescriptions Quick Picker */}
                <div className="mt-3 pt-3 border-t border-blue-100 flex flex-wrap items-center justify-center gap-2 text-[10px]">
                  <span className="text-slate-500 font-medium">Or use sample test prescription:</span>
                  <button
                    type="button"
                    onClick={() => {
                      setUploadedRxName('dr_maya_patel_rx.jpg')
                      setUploadedRxType('image')
                      setUploadedRxSize('320 KB')
                      setUploadedRxDataUrl(null)
                      notify('Sample prescription image selected!')
                    }}
                    className={`rounded px-2 py-0.5 border font-semibold ${
                      uploadedRxName === 'dr_maya_patel_rx.jpg'
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    📷 Sample 1: Dr. Maya Patel Rx (.jpg)
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setUploadedRxName('bay_medical_amoxicillin_rx.pdf')
                      setUploadedRxType('pdf')
                      setUploadedRxSize('540 KB')
                      setUploadedRxDataUrl(null)
                      notify('Sample prescription PDF selected!')
                    }}
                    className={`rounded px-2 py-0.5 border font-semibold ${
                      uploadedRxName === 'bay_medical_amoxicillin_rx.pdf'
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                    }`}
                  >
                    📄 Sample 2: Bay Medical Rx (.pdf)
                  </button>
                </div>
              </div>

              {/* Uploaded File Preview Card */}
              {uploadedRxName && (
                <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-700 font-bold text-sm">
                      {uploadedRxType === 'pdf' ? 'PDF' : 'IMG'}
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-slate-800 text-xs truncate">{uploadedRxName}</div>
                      <div className="text-[10px] text-slate-500">
                        {uploadedRxType === 'pdf' ? 'Prescription Document' : 'Prescription Image Scan'} · {uploadedRxSize || 'Ready'}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-emerald-100 text-emerald-800 px-2 py-0.5 text-[10px] font-bold flex items-center gap-1">
                      <Check size={11} /> Attached
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setUploadedRxName('')
                        setUploadedRxDataUrl(null)
                      }}
                      className="text-slate-400 hover:text-rose-600 p-1"
                      title="Remove file"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              )}

              {/* Image Live Preview if loaded */}
              {uploadedRxDataUrl && uploadedRxType === 'image' && (
                <div className="p-2 border rounded-xl bg-white text-center">
                  <span className="text-[10px] text-slate-400 block mb-1">Live Image Preview:</span>
                  <img
                    src={uploadedRxDataUrl}
                    alt="Prescription Preview"
                    className="max-h-48 mx-auto rounded-lg object-contain shadow-sm border border-slate-100"
                  />
                </div>
              )}

              {/* Patient Instructions / Notes */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                  Patient Notes / Medicine Instructions for Medical Store (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Please deliver full 1-month course, contact before delivery"
                  value={patientRxNotes}
                  onChange={(e) => setPatientRxNotes(e.target.value)}
                  className="form-input !text-xs !py-2"
                />
              </div>
            </div>

            {/* Step 3: Delivery Details & Payment */}
            <div className="border-t border-slate-100 pt-4 space-y-3">
              <label className="block text-xs font-bold text-slate-800">
                Step 3: Delivery Address & Payment Method
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Home Delivery Address *
                  </label>
                  <input
                    type="text"
                    required
                    value={rxDeliveryAddress}
                    onChange={(e) => setRxDeliveryAddress(e.target.value)}
                    placeholder="Enter complete street address and city"
                    className="form-input !text-xs !py-2"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                    Contact Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={rxContactPhone}
                    onChange={(e) => setRxContactPhone(e.target.value)}
                    placeholder="e.g. (415) 555-0123"
                    className="form-input !text-xs !py-2"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1.5">
                  Payment Method
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRxPaymentMethod('Cash on Delivery (COD)')}
                    className={`rounded-xl border p-2.5 text-left transition flex items-center justify-between ${
                      rxPaymentMethod.includes('Cash')
                        ? 'border-emerald-500 bg-emerald-50/50 ring-2 ring-emerald-100'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <b className="block text-xs text-slate-800">Cash on Delivery (COD)</b>
                      <span className="text-[10px] text-slate-500">Pay cash upon delivery verification</span>
                    </div>
                    <Truck size={16} className={rxPaymentMethod.includes('Cash') ? 'text-emerald-700' : 'text-slate-400'} />
                  </button>

                  <button
                    type="button"
                    onClick={() => setRxPaymentMethod('Online Payment (Credit / Debit Card)')}
                    className={`rounded-xl border p-2.5 text-left transition flex items-center justify-between ${
                      rxPaymentMethod.includes('Online')
                        ? 'border-emerald-500 bg-emerald-50/50 ring-2 ring-emerald-100'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <b className="block text-xs text-slate-800">Online Payment</b>
                      <span className="text-[10px] text-slate-500">Card payment simulated</span>
                    </div>
                    <CreditCard size={16} className={rxPaymentMethod.includes('Online') ? 'text-emerald-700' : 'text-slate-400'} />
                  </button>
                </div>
              </div>
            </div>

            {/* Error banner if any */}
            {rxOrderError && (
              <div className="rounded-lg border border-rose-200 bg-rose-50 p-2.5 text-rose-700 flex items-center gap-2">
                <AlertCircle size={14} className="shrink-0" />
                <span>{rxOrderError}</span>
              </div>
            )}

            {/* Note on Medical Store Confirmation & Delivery */}
            <div className="rounded-xl bg-blue-50 p-3 text-blue-900 text-[11px] flex items-start gap-2 border border-blue-100">
              <ShieldCheck size={16} className="text-blue-600 shrink-0 mt-0.5" />
              <div className="leading-relaxed">
                <b>Medical Store Fulfillment Process:</b> Upon submitting, the selected medical store will inspect your prescription image or PDF, confirm that all medications match the doctor's directions, and prepare them for home delivery.
              </div>
            </div>

            {/* Modal Actions */}
            <div className="flex items-center justify-end gap-2 border-t border-slate-100 pt-3">
              <button
                type="button"
                onClick={() => setChooseMedicalModalOpen(false)}
                className="btn btn-secondary !py-2 !text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmittingRxOrder}
                className="btn !bg-emerald-600 hover:!bg-emerald-700 text-white !py-2.5 !px-5 !text-xs font-bold flex items-center gap-2 shadow-md disabled:opacity-50"
              >
                {isSubmittingRxOrder ? (
                  'Submitting to Medical Store...'
                ) : (
                  <>
                    <PackageCheck size={16} /> Send Prescription to Medical Store for Delivery
                  </>
                )}
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* ========================================================= */}
      {/* MODAL: VIEW UPLOADED PRESCRIPTION (PATIENT VIEW)          */}
      {/* ========================================================= */}
      {viewPrescriptionModalOrder && (
        <Modal
          title={`Prescription Document — ${viewPrescriptionModalOrder.id}`}
          onClose={() => setViewPrescriptionModalOrder(null)}
          wide
        >
          <div className="space-y-4 text-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-800">
                  {viewPrescriptionModalOrder.prescriptionFileName}
                </h3>
                <p className="text-[11px] text-slate-500">
                  Uploaded for {viewPrescriptionModalOrder.pharmacyName} · {viewPrescriptionModalOrder.orderDate}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  tone={
                    viewPrescriptionModalOrder.prescriptionVerified
                      ? 'green'
                      : 'blue'
                  }
                >
                  {viewPrescriptionModalOrder.prescriptionVerified
                    ? 'Prescription Verified'
                    : 'Verification Pending'}
                </Badge>
              </div>
            </div>

            {/* Visual Prescription Viewer */}
            {viewPrescriptionModalOrder.prescriptionFileData && viewPrescriptionModalOrder.prescriptionFileType === 'image' ? (
              <div className="p-3 bg-slate-100 rounded-xl text-center border">
                <img
                  src={viewPrescriptionModalOrder.prescriptionFileData}
                  alt="Uploaded Prescription"
                  className="max-h-[450px] mx-auto rounded-lg object-contain shadow-md"
                />
              </div>
            ) : (
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm space-y-4 font-sans">
                {/* Simulated Authentic Prescription Document */}
                <div className="flex items-start justify-between border-b-2 border-blue-600 pb-3">
                  <div>
                    <h2 className="text-base font-extrabold text-blue-900 tracking-tight">SUNRISE HEALTH MEDICAL CENTER</h2>
                    <p className="text-[11px] text-slate-600 font-medium">Department of Clinical Medicine & Family Practice</p>
                    <p className="text-[10px] text-slate-400">2418 Cedar Avenue, San Francisco, CA · Ph: (415) 555-0184</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-serif font-black text-blue-700">℞</span>
                    <div className="text-[10px] text-slate-500 mt-0.5">License: #CA-MED-849201</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-[11px] border-b border-slate-100 pb-3">
                  <div>
                    <span className="text-slate-400">Patient Name:</span>
                    <b className="ml-2 text-slate-800">{viewPrescriptionModalOrder.patientName}</b>
                  </div>
                  <div>
                    <span className="text-slate-400">Date Issued:</span>
                    <b className="ml-2 text-slate-800">{viewPrescriptionModalOrder.orderDate}</b>
                  </div>
                  <div>
                    <span className="text-slate-400">Prescribing Physician:</span>
                    <b className="ml-2 text-slate-800">Dr. Maya Patel, MD (Attending Physician)</b>
                  </div>
                  <div>
                    <span className="text-slate-400">Clinical Diagnosis:</span>
                    <b className="ml-2 text-slate-800">Seasonal Allergic Rhinitis & Bronchial Irritation</b>
                  </div>
                </div>

                <div className="space-y-3 py-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                    Authorized Medications & Dispensing Schedule
                  </span>
                  <div className="rounded-lg bg-slate-50 p-3.5 space-y-2 border border-slate-100">
                    <div className="flex items-start justify-between">
                      <div>
                        <b className="text-xs text-slate-800">1. Cetirizine Hydrochloride 10 mg Tablet</b>
                        <p className="text-[11px] text-slate-600">Sig: Take 1 tablet orally once daily at bedtime for 14 days.</p>
                      </div>
                      <span className="rounded bg-blue-100 text-blue-800 px-2 py-0.5 text-[9px] font-bold">Qty: 14</span>
                    </div>
                    <div className="border-t border-slate-200/60 pt-2 flex items-start justify-between">
                      <div>
                        <b className="text-xs text-slate-800">2. Fluticasone Propionate Nasal Spray 50 mcg</b>
                        <p className="text-[11px] text-slate-600">Sig: 1 spray in each nostril once daily every morning.</p>
                      </div>
                      <span className="rounded bg-blue-100 text-blue-800 px-2 py-0.5 text-[9px] font-bold">Qty: 1 Bottle</span>
                    </div>
                  </div>
                </div>

                {viewPrescriptionModalOrder.patientNotes && (
                  <div className="rounded-lg bg-amber-50 p-2.5 text-[11px] text-amber-900 border border-amber-100">
                    <b>Patient Note for Medical Store:</b> "{viewPrescriptionModalOrder.patientNotes}"
                  </div>
                )}

                <div className="flex items-end justify-between border-t border-slate-100 pt-4">
                  <div className="text-[10px] text-slate-400 space-y-0.5">
                    <div>Document Ref: {viewPrescriptionModalOrder.prescriptionFileName}</div>
                    <div>Security Seal: SHA256-AUTHENTICATED-RX</div>
                  </div>
                  <div className="text-right">
                    <div className="font-serif italic text-blue-900 font-bold text-sm">Dr. Maya Patel, MD</div>
                    <div className="text-[9px] text-slate-400 border-t border-slate-300 pt-0.5 mt-0.5">Authorized Signature</div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end gap-2 border-t border-slate-100 pt-3">
              <button
                type="button"
                onClick={() => setViewPrescriptionModalOrder(null)}
                className="btn btn-secondary !py-1.5 !text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}


import { useState, useMemo } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import {
  Activity, Bell, AlertCircle, AlertTriangle, ArrowRight, CalendarCheck2, CalendarPlus, Check, CheckCircle2, ChevronRight, Clock3, CreditCard,
  Download, Eye, FileText, HeartPulse, MapPin, Moon, PackageCheck, Palette, Phone, Pill, Plus, RefreshCw, Search, ShieldAlert, ShieldCheck, ShoppingBag, Sliders, Sparkles, Stethoscope, Store, Sun, Trash2, Truck, User, Users, Wallet, X,
} from 'lucide-react'
import {
  Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer,
  Tooltip, XAxis, YAxis,
} from 'recharts'
import { useStore } from './Store'
import { Badge, DataTable, Modal, PageHeading, Panel, PrimaryButton, StatCard } from './components'
import { revenueData } from './data'
import { themes, getThemeById, DEFAULT_THEME_ID } from './themeConfig'

const money = (value) => `₹${Number(value).toLocaleString()}`

function TrendChart({ data = revenueData, dataKey = 'revenue', color, height = 250, moneyValue = true }) {
  const { activeTheme } = useStore()
  const chartColor = color || activeTheme?.colors?.primary || '#3478f6'
  return (
    <ResponsiveContainer width="100%" height={height}>
      <AreaChart data={data} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="clinicRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={chartColor} stopOpacity={0.18} />
            <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid stroke="#eef2f7" strokeDasharray="4 5" vertical={false} />
        <XAxis dataKey="month" axisLine={false} tickLine={false} />
        <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => (moneyValue ? `₹${value / 1000}k` : value)} />
        <Tooltip formatter={(value) => (moneyValue ? money(value) : value)} contentStyle={{ border: '1px solid #e8edf3', borderRadius: 10, fontSize: 12 }} />
        <Area type="monotone" dataKey={dataKey} stroke={chartColor} strokeWidth={2.5} fill="url(#clinicRevenue)" />
      </AreaChart>
    </ResponsiveContainer>
  )
}

// -------------------------------------------------------------
// Doctor & Clinic Admin Clinical Consultation Modal ("Attend Patient")
// -------------------------------------------------------------
export function AttendConsultationModal({ appointment, patient, onClose }) {
  const { attendPatientConsultation, activeClinic, currentUser, notify } = useStore()

  const targetPatient =
    patient ||
    activeClinic.patients.find((p) => p.name === appointment?.patient || p.id === appointment?.patientId) || {
      name: appointment?.patient || 'Patient',
      email: appointment?.patientEmail || '',
      phone: appointment?.patientPhone || '',
      age: 34,
      gender: 'Female',
    }

  const [vitals, setVitals] = useState({
    bp: '120/80',
    heartRate: '72',
    temp: '98.6',
    spo2: '99',
    weight: '68',
  })

  const [diagnosis, setDiagnosis] = useState(
    appointment?.type?.includes('Allergy')
      ? 'Seasonal Allergic Rhinitis & Sinus Congestion'
      : appointment?.type?.includes('Checkup') || appointment?.type?.includes('Wellness')
      ? 'Routine Preventive Wellness Assessment'
      : appointment?.notes || 'Clinical Outpatient Consultation'
  )

  const [notes, setNotes] = useState(
    appointment?.notes
      ? `Patient presented for: ${appointment.notes}. Physical examination completed. Heart sounds normal, clear breath sounds bilaterally.`
      : 'Patient presented for clinical evaluation. Vitals recorded within normal clinical parameters. Patient counseled on treatment.'
  )

  const [medications, setMedications] = useState([
    {
      name: 'Amoxicillin Trihydrate',
      dosage: '500 mg',
      form: 'Capsule',
      frequency: 'Every 8 hours with meals',
      duration: '7 days',
      instructions: 'Complete full course. Take with full glass of water.',
    },
  ])

  const [followUp, setFollowUp] = useState('Follow up in 2 weeks or sooner if fever or acute symptoms develop.')
  const [authorized, setAuthorized] = useState(true)

  const addMedication = () => {
    setMedications([
      ...medications,
      {
        name: '',
        dosage: '10 mg',
        form: 'Tablet',
        frequency: 'Once daily at bedtime',
        duration: '10 days',
        instructions: 'Take after meals',
      },
    ])
  }

  const removeMedication = (index) => {
    setMedications(medications.filter((_, i) => i !== index))
  }

  const updateMedication = (index, field, val) => {
    const updated = [...medications]
    updated[index][field] = val
    setMedications(updated)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!diagnosis.trim()) {
      notify('Please enter a clinical diagnosis')
      return
    }

    const filteredMeds = medications.filter((m) => m.name.trim() !== '')

    attendPatientConsultation({
      appointmentId: appointment?.id,
      patientId: targetPatient.id,
      patientName: targetPatient.name,
      patientEmail: targetPatient.email || appointment?.patientEmail,
      diagnosis: diagnosis.trim(),
      notes: notes.trim(),
      vitals: {
        bp: `${vitals.bp} mmHg`,
        heartRate: `${vitals.heartRate} bpm`,
        temp: `${vitals.temp}°F`,
        spo2: `${vitals.spo2}%`,
        weight: `${vitals.weight} kg`,
      },
      medications: filteredMeds,
      instructions: followUp.trim(),
      followUp: followUp.trim(),
      authorizedForPatient: authorized,
    })

    onClose()
  }

  return (
    <Modal title={`Attend Patient: ${targetPatient.name}`} onClose={onClose} wide>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Attending Header Banner */}
        <div className="rounded-xl border border-blue-100 bg-blue-50/70 p-3.5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700">Attending Physician</span>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="font-semibold text-slate-800 text-sm">
                  {currentUser?.name || activeClinic.owner || 'Dr. Maya Patel'}
                </span>
                <span className="rounded bg-blue-200/60 px-1.5 py-0.5 text-[9px] font-bold text-blue-800">
                  Doctor & Clinic Admin
                </span>
              </div>
            </div>
            <div className="text-right text-[11px] text-slate-500">
              <div>Patient: <b className="text-slate-700">{targetPatient.name}</b> {targetPatient.age ? `(${targetPatient.age}y · ${targetPatient.gender || 'Patient'})` : ''}</div>
              <div className="mt-0.5 text-blue-700 font-medium">Slot: {appointment?.time || 'Walk-in / Immediate Consultation'}</div>
            </div>
          </div>
        </div>

        {/* Section 1: Vitals */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-2">
            Patient Vitals & Clinical Pre-Check
          </label>
          <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
            <div>
              <span className="block text-[10px] text-slate-500 font-medium mb-1">Blood Pressure</span>
              <input
                className="form-input !py-1.5 !text-xs"
                placeholder="120/80"
                value={vitals.bp}
                onChange={(e) => setVitals({ ...vitals, bp: e.target.value })}
              />
            </div>
            <div>
              <span className="block text-[10px] text-slate-500 font-medium mb-1">Heart Rate (bpm)</span>
              <input
                className="form-input !py-1.5 !text-xs"
                placeholder="72"
                value={vitals.heartRate}
                onChange={(e) => setVitals({ ...vitals, heartRate: e.target.value })}
              />
            </div>
            <div>
              <span className="block text-[10px] text-slate-500 font-medium mb-1">Temperature (°F)</span>
              <input
                className="form-input !py-1.5 !text-xs"
                placeholder="98.6"
                value={vitals.temp}
                onChange={(e) => setVitals({ ...vitals, temp: e.target.value })}
              />
            </div>
            <div>
              <span className="block text-[10px] text-slate-500 font-medium mb-1">Oxygen SpO2 (%)</span>
              <input
                className="form-input !py-1.5 !text-xs"
                placeholder="99"
                value={vitals.spo2}
                onChange={(e) => setVitals({ ...vitals, spo2: e.target.value })}
              />
            </div>
            <div>
              <span className="block text-[10px] text-slate-500 font-medium mb-1">Weight (kg)</span>
              <input
                className="form-input !py-1.5 !text-xs"
                placeholder="68"
                value={vitals.weight}
                onChange={(e) => setVitals({ ...vitals, weight: e.target.value })}
              />
            </div>
          </div>
        </div>

        {/* Section 2: Clinical Assessment & Diagnosis */}
        <div className="space-y-3">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Primary Diagnosis *
            </label>
            <input
              className="form-input !text-xs"
              placeholder="e.g. Acute Pharyngitis, Seasonal Allergic Rhinitis, Hypertension Follow-up"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
              Doctor's Clinical Notes & Observations
            </label>
            <textarea
              className="form-input !text-xs min-h-[68px]"
              placeholder="Record chief complaint, clinical examination findings, symptom duration, and medical advice..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
            />
          </div>
        </div>

        {/* Section 3: Prescriptions & Medications */}
        <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-3.5">
          <div className="flex items-center justify-between mb-2.5">
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800">
              <Pill size={15} className="text-blue-600" /> Prescribe Medications (Rx)
            </div>
            <button
              type="button"
              className="text-[11px] font-semibold text-blue-600 hover:text-blue-800 flex items-center gap-1"
              onClick={addMedication}
            >
              <Plus size={13} /> Add Medicine
            </button>
          </div>

          <div className="space-y-2.5">
            {medications.map((med, index) => (
              <div key={index} className="rounded-lg border border-slate-200 bg-white p-2.5 space-y-2">
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <input
                      className="form-input !py-1.5 !text-xs font-semibold"
                      placeholder="Medication name (e.g. Amoxicillin, Paracetamol)"
                      value={med.name}
                      onChange={(e) => updateMedication(index, 'name', e.target.value)}
                    />
                  </div>
                  <div className="w-28">
                    <input
                      className="form-input !py-1.5 !text-xs"
                      placeholder="Dosage (500mg)"
                      value={med.dosage}
                      onChange={(e) => updateMedication(index, 'dosage', e.target.value)}
                    />
                  </div>
                  <div className="w-24">
                    <select
                      className="form-input !py-1.5 !text-xs"
                      value={med.form}
                      onChange={(e) => updateMedication(index, 'form', e.target.value)}
                    >
                      <option>Tablet</option>
                      <option>Capsule</option>
                      <option>Syrup</option>
                      <option>Nasal Spray</option>
                      <option>Inhaler</option>
                      <option>Ointment</option>
                      <option>Injection</option>
                    </select>
                  </div>
                  {medications.length > 1 && (
                    <button
                      type="button"
                      className="text-slate-400 hover:text-rose-600 p-1"
                      onClick={() => removeMedication(index)}
                      aria-label="Remove medication"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <input
                    className="form-input !py-1.5 !text-[11px]"
                    placeholder="Frequency (e.g. Twice daily)"
                    value={med.frequency}
                    onChange={(e) => updateMedication(index, 'frequency', e.target.value)}
                  />
                  <input
                    className="form-input !py-1.5 !text-[11px]"
                    placeholder="Duration (e.g. 7 days)"
                    value={med.duration}
                    onChange={(e) => updateMedication(index, 'duration', e.target.value)}
                  />
                  <input
                    className="form-input !py-1.5 !text-[11px]"
                    placeholder="Special instructions (e.g. Take with food)"
                    value={med.instructions}
                    onChange={(e) => updateMedication(index, 'instructions', e.target.value)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Care Plan & Portal Authorization */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1">
            Doctor's Advice & Follow-Up Instructions
          </label>
          <input
            className="form-input !text-xs"
            placeholder="e.g. Rest, increase fluid intake, follow up in 2 weeks"
            value={followUp}
            onChange={(e) => setFollowUp(e.target.value)}
          />
        </div>

        <label className="flex items-start gap-2 rounded-lg border border-emerald-100 bg-emerald-50/70 p-2.5 text-xs text-emerald-900 cursor-pointer">
          <input
            type="checkbox"
            className="mt-0.5 accent-emerald-600"
            checked={authorized}
            onChange={(e) => setAuthorized(e.target.checked)}
          />
          <span>
            <b>Authorize Patient Access</b> — Instantly release this consultation summary and prescription to the patient's personal portal (`/patient/prescriptions` & `/patient/medical-records`).
          </span>
        </label>

        {/* Footer Actions */}
        <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
          <button type="button" className="btn btn-secondary" onClick={onClose}>
            Cancel
          </button>
          <PrimaryButton type="submit" icon={Stethoscope}>
            Complete Consultation & Issue Rx
          </PrimaryButton>
        </div>
      </form>
    </Modal>
  )
}

// -------------------------------------------------------------
// Clinic Dashboard (Doctor & Clinic Admin)
// -------------------------------------------------------------
export function ClinicDashboard() {
  const { activeClinic } = useStore()
  const clinic = activeClinic
  const appointments = clinic.appointments.filter((item) => item.date === 'Today')
  const [attendingAppointment, setAttendingAppointment] = useState(null)

  const statusData = [
    { name: 'Confirmed', value: 42, color: '#3478f6' },
    { name: 'Completed', value: 34, color: '#45b88b' },
    { name: 'Scheduled', value: 18, color: '#f3b64a' },
    { name: 'Cancelled', value: 6, color: '#ef7782' },
  ]

  return (
    <div className="content-wrap">
      <PageHeading
        eyebrow="Monday, October 26, 2026"
        title={`Good morning, ${clinic.owner} 👋`}
        description={`Practice owner & attending physician dashboard for ${clinic.name}.`}
        action={
          <button className="btn btn-secondary" onClick={() => window.print()}>
            <Download size={14} /> Export
          </button>
        }
      />
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total patients"
          value={clinic.id === 'sunrise' ? '1,284' : (clinic.patients.length * 214).toLocaleString()}
          change="+8.2%"
          icon={Users}
          tone="blue"
          detail="vs. last month"
        />
        <StatCard
          label="Today's appointments"
          value={appointments.length + 8}
          change="+4.5%"
          icon={CalendarCheck2}
          tone="green"
          detail="Active patient care queue"
        />
        <StatCard
          label="Completed visits"
          value={clinic.appointments.filter((a) => a.status === 'Completed').length || 18}
          change="+12.4%"
          icon={Check}
          tone="purple"
          detail="Consultations attended"
        />
        <StatCard label="Today's revenue" value="₹2,840" change="+6.1%" icon={Wallet} tone="orange" detail="vs. ₹2,678 yesterday" />
      </div>

      <div className="mb-6 grid grid-cols-1 gap-5 xl:grid-cols-[1.65fr_1fr]">
        <Panel
          title="Appointment overview"
          subtitle="Visit activity over the last 6 months"
          action={
            <select className="form-input !w-auto !py-1.5 !text-[11px]" aria-label="Appointment period">
              <option>Last 6 months</option>
              <option>Last 30 days</option>
              <option>This year</option>
            </select>
          }
        >
          <TrendChart data={revenueData.map((item) => ({ ...item, revenue: item.patients }))} dataKey="revenue" color="#3378f6" moneyValue={false} />
        </Panel>
        <Panel title="Appointment status" subtitle="Today's appointment breakdown">
          <div className="flex items-center justify-center">
            <div className="relative h-[180px] w-[210px]">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={statusData} dataKey="value" innerRadius={55} outerRadius={78} paddingAngle={4} stroke="none">
                    {statusData.map((item) => (
                      <Cell key={item.name} fill={item.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold text-slate-800">26</span>
                <span className="text-[10px] text-slate-400">appointments</span>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {statusData.map((item) => (
              <div key={item.name} className="flex items-center gap-2 text-[11px] text-slate-500">
                <i className="h-2 w-2 rounded-full" style={{ background: item.color }} />
                {item.name}
                <b className="ml-auto text-slate-700">{item.value}%</b>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.5fr_1fr]">
        <Panel
          title="Upcoming appointments to attend"
          subtitle="Your clinical schedule for today"
          action={
            <a href="/clinic/appointments" className="text-[11px] font-semibold text-blue-600">
              View full schedule →
            </a>
          }
        >
          <div className="divide-y divide-slate-50">
            {appointments.slice(0, 5).map((item) => (
              <div key={item.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
                <div className="min-w-[68px] rounded-lg bg-blue-50 px-2 py-2 text-center text-[11px] font-semibold text-blue-700">
                  {item.time}
                </div>
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-indigo-50 text-[11px] font-bold text-indigo-700">
                  {item.patient.split(' ').map((part) => part[0]).join('')}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-xs font-semibold text-slate-700">{item.patient}</div>
                  <div className="mt-0.5 text-[10px] text-slate-400">
                    {item.doctor} · {item.type}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge>{item.status}</Badge>
                  {item.status !== 'Completed' && item.status !== 'Cancelled' ? (
                    <button
                      className="btn btn-primary !py-1 !px-2.5 !text-[11px] inline-flex items-center gap-1.5 shadow-sm"
                      onClick={() => setAttendingAppointment(item)}
                    >
                      <Stethoscope size={13} /> Attend
                    </button>
                  ) : item.status === 'Completed' ? (
                    <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                      <Check size={13} /> Attended
                    </span>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </Panel>

        <Panel title="Practice snapshot" subtitle="A quick look at your clinic">
          <div className="space-y-4">
            {[
              ['Active patients', clinic.patients.length, 'bg-blue-500', Math.min(100, clinic.patients.length * 12)],
              ['Care team', clinic.staff.length, 'bg-violet-500', Math.min(100, clinic.staff.length * 20)],
              ['Services offered', clinic.services.length, 'bg-emerald-500', Math.min(100, clinic.services.length * 18)],
            ].map(([label, value, color, width]) => (
              <div key={label}>
                <div className="mb-2 flex justify-between text-[11px]">
                  <span className="text-slate-500">{label}</span>
                  <b className="text-slate-700">{value}</b>
                </div>
                <div className="h-1.5 rounded-full bg-slate-100">
                  <div className={`h-1.5 rounded-full ${color}`} style={{ width: `${width}%` }} />
                </div>
              </div>
            ))}
            <div className="rounded-lg bg-emerald-50 px-3 py-2.5 text-[11px] leading-relaxed text-emerald-800">
              <HeartPulse className="mr-1 inline" size={14} /> Practice running smoothly. Ready to attend patients and manage clinic care.
            </div>
          </div>
        </Panel>
      </div>

      {attendingAppointment && (
        <AttendConsultationModal
          appointment={attendingAppointment}
          onClose={() => setAttendingAppointment(null)}
        />
      )}
    </div>
  )
}

// -------------------------------------------------------------
// Patients Directory (Doctor & Clinic Admin)
// -------------------------------------------------------------
export function PatientsPage() {
  const { activeClinic, addPatient, updatePatient, notify, data } = useStore()
  const [open, setOpen] = useState(false)
  const [patient, setPatient] = useState(null)
  const [editing, setEditing] = useState(null)
  const [attendingPatient, setAttendingPatient] = useState(null)

  const rows = activeClinic.patients.map((item) => ({
    ...item,
    patient: item.name,
    contact: (
      <div>
        <div>{item.email}</div>
        <div className="mt-0.5 text-[10px] text-slate-400">{item.phone}</div>
      </div>
    ),
    age: `${item.age} · ${item.gender}`,
    lastVisit: item.lastVisit,
    status: <Badge>{item.status}</Badge>,
  }))

  function submit(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const name = form.get('name').trim()
    if (!name) return
    const values = {
      name,
      email: form.get('email'),
      phone: form.get('phone'),
      age: Number(form.get('age')) || 0,
      gender: form.get('gender'),
      status: editing?.status || 'Active',
      lastVisit: editing?.lastVisit || 'New patient',
    }
    if (editing) updatePatient(editing.id, values)
    else addPatient(values)
    setOpen(false)
    setEditing(null)
    notify(editing ? 'Patient record updated' : 'Patient added to this clinic')
  }

  // Find previous records for selected patient modal
  const patientRecords = patient
    ? (data.medicalRecords || []).filter((r) => r.patientId === patient.id || r.patientName === patient.name)
    : []
  const patientPrescriptions = patient
    ? (data.prescriptions || []).filter((p) => p.patientId === patient.id || p.patientName === patient.name)
    : []

  return (
    <div className="content-wrap">
      <PageHeading
        eyebrow="Care directory"
        title="Patients"
        description="Manage patient records, view clinical histories, and attend visits."
        action={<PrimaryButton onClick={() => setOpen(true)}>Add patient</PrimaryButton>}
      />
      <div className="mb-5 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard label="Total patients" value={activeClinic.patients.length} icon={Users} tone="blue" />
        <StatCard label="Active patients" value={activeClinic.patients.filter((p) => p.status === 'Active').length} icon={Activity} tone="green" />
        <StatCard label="New this month" value="42" icon={Plus} tone="purple" />
        <StatCard label="Avg. visits / patient" value="3.6" icon={CalendarCheck2} tone="orange" />
      </div>
      <Panel title="All patients" subtitle="Patient records for your current clinic">
        <DataTable
          columns={[
            {
              key: 'patient',
              label: 'Patient',
              render: (_, row) => (
                <button
                  className="flex items-center gap-2.5 text-left"
                  onClick={() => setPatient(activeClinic.patients.find((item) => item.id === row.id))}
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-50 text-[10px] font-bold text-blue-700">
                    {row.name.split(' ').map((part) => part[0]).join('')}
                  </span>
                  <span className="font-semibold text-slate-700">{row.name}</span>
                </button>
              ),
            },
            { key: 'contact', label: 'Contact' },
            { key: 'age', label: 'Age · gender' },
            { key: 'lastVisit', label: 'Last visit' },
            { key: 'status', label: 'Status' },
            {
              key: 'attend',
              label: 'Action',
              render: (_, row) => (
                <div className="flex items-center gap-2">
                  <button
                    className="btn btn-primary !py-1 !px-2 !text-[11px] inline-flex items-center gap-1"
                    onClick={() => {
                      setAttendingPatient(row)
                    }}
                  >
                    <Stethoscope size={12} /> Attend
                  </button>
                  <button
                    className="text-[11px] font-semibold text-blue-600 hover:underline"
                    onClick={() => {
                      setEditing(activeClinic.patients.find((item) => item.id === row.id))
                      setOpen(true)
                    }}
                  >
                    Edit
                  </button>
                </div>
              ),
            },
          ]}
          rows={rows}
          searchPlaceholder="Search by name, email, phone..."
        />
      </Panel>

      {open && (
        <Modal
          title={editing ? 'Edit patient' : 'Add a patient'}
          onClose={() => {
            setOpen(false)
            setEditing(null)
          }}
        >
          <form className="space-y-4" onSubmit={submit}>
            <Field label="Full name" name="name" placeholder="e.g. Jordan Lee" defaultValue={editing?.name} required />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Email address" name="email" type="email" placeholder="patient@email.com" defaultValue={editing?.email} required />
              <Field label="Phone number" name="phone" placeholder="(555) 000-0000" defaultValue={editing?.phone} required />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Age" name="age" type="number" placeholder="34" defaultValue={editing?.age} />
              <label className="block">
                <span className="mb-1.5 block text-[11px] font-medium text-slate-600">Gender</span>
                <select className="form-input !text-xs" name="gender" defaultValue={editing?.gender || 'Female'}>
                  <option>Female</option>
                  <option>Male</option>
                  <option>Non-binary</option>
                  <option>Prefer not to say</option>
                </select>
              </label>
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setOpen(false)
                  setEditing(null)
                }}
              >
                Cancel
              </button>
              <PrimaryButton type="submit" icon={null}>
                {editing ? 'Save changes' : 'Save patient'}
              </PrimaryButton>
            </div>
          </form>
        </Modal>
      )}

      {patient && (
        <Modal title="Patient Clinical Profile" onClose={() => setPatient(null)} wide>
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 text-base font-bold text-indigo-700">
                {patient.name.split(' ').map((part) => part[0]).join('')}
              </div>
              <div>
                <h3 className="font-semibold text-slate-800 text-sm">{patient.name}</h3>
                <p className="text-xs text-slate-400">{patient.email} · {patient.phone}</p>
              </div>
            </div>
            <button
              className="btn btn-primary !py-1.5 !px-3 !text-xs inline-flex items-center gap-1.5"
              onClick={() => {
                const target = patient
                setPatient(null)
                setAttendingPatient(target)
              }}
            >
              <Stethoscope size={14} /> Start Consultation
            </button>
          </div>

          <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-3">
            <Detail label="Age & Gender" value={`${patient.age} · ${patient.gender}`} />
            <Detail label="Last visit" value={patient.lastVisit} />
            <Detail label="Status" value={patient.status} />
            <Detail label="Emergency" value={patient.emergencyContact || 'None on file'} />
          </div>

          {/* Clinical Records Section */}
          <div className="mt-4 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              Clinical Records & Notes ({patientRecords.length})
            </h4>
            {patientRecords.length > 0 ? (
              <div className="space-y-2">
                {patientRecords.map((rec) => (
                  <div key={rec.id} className="rounded-lg border border-slate-200 bg-slate-50/60 p-3 text-xs">
                    <div className="flex justify-between font-semibold text-slate-800">
                      <span>{rec.title}</span>
                      <span className="text-[10px] text-slate-400">{rec.date} · {rec.doctor}</span>
                    </div>
                    <p className="mt-1 text-slate-600">{rec.summary}</p>
                    {rec.vitals && (
                      <div className="mt-2 flex flex-wrap gap-2 text-[10px] text-slate-500">
                        <span className="rounded bg-white px-1.5 py-0.5 border border-slate-200">BP: {rec.vitals.bp}</span>
                        <span className="rounded bg-white px-1.5 py-0.5 border border-slate-200">HR: {rec.vitals.heartRate}</span>
                        <span className="rounded bg-white px-1.5 py-0.5 border border-slate-200">Temp: {rec.vitals.temp}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-lg bg-slate-50 p-3 text-xs text-slate-400">
                No past medical consultation notes found for this patient. Click "Start Consultation" to attend.
              </div>
            )}

            {/* Prescriptions Section */}
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 pt-2">
              Prescriptions Issued ({patientPrescriptions.length})
            </h4>
            {patientPrescriptions.length > 0 ? (
              <div className="space-y-2">
                {patientPrescriptions.map((rx) => (
                  <div key={rx.id} className="rounded-lg border border-blue-100 bg-blue-50/40 p-3 text-xs">
                    <div className="flex justify-between font-semibold text-blue-900">
                      <span>Diagnosis: {rx.diagnosis}</span>
                      <span className="text-[10px] text-blue-700">{rx.date} · {rx.doctor}</span>
                    </div>
                    <div className="mt-1 space-y-1">
                      {rx.medications.map((m, idx) => (
                        <div key={idx} className="text-slate-700 font-medium">
                          • {m.name} ({m.dosage}) — {m.frequency} for {m.duration}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-lg bg-slate-50 p-3 text-xs text-slate-400">
                No active prescriptions issued yet.
              </div>
            )}
          </div>
        </Modal>
      )}

      {attendingPatient && (
        <AttendConsultationModal
          patient={attendingPatient}
          appointment={{
            patient: attendingPatient.name,
            patientId: attendingPatient.id,
            patientEmail: attendingPatient.email,
            type: 'In-Clinic Consultation',
            time: 'Immediate',
          }}
          onClose={() => setAttendingPatient(null)}
        />
      )}
    </div>
  )
}

// -------------------------------------------------------------
// Appointments Schedule (Doctor & Clinic Admin)
// -------------------------------------------------------------
export function AppointmentsPage() {
  const { activeClinic, addAppointment, notify } = useStore()
  const [view, setView] = useState('Day')
  const [open, setOpen] = useState(false)
  const [attendingAppointment, setAttendingAppointment] = useState(null)

  function submit(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const selectedDate = form.get('date')
    addAppointment({
      patient: form.get('patient'),
      doctor: form.get('doctor'),
      date: selectedDate === '2026-10-26' ? 'Today' : selectedDate,
      time: form.get('time'),
      type: form.get('type'),
      status: 'Scheduled',
    })
    setOpen(false)
    notify('Appointment scheduled')
  }

  const rows = activeClinic.appointments.map((item) => ({
    ...item,
    appointment: (
      <div>
        <b className="font-semibold text-slate-700">{item.patient}</b>
        <div className="text-[10px] text-slate-400">{item.type}</div>
      </div>
    ),
    time: (
      <div className="font-semibold text-slate-700">
        {item.time}
        <div className="text-[10px] font-normal text-slate-400">{item.date}</div>
      </div>
    ),
    status: <Badge>{item.status}</Badge>,
    action:
      item.status !== 'Completed' && item.status !== 'Cancelled' ? (
        <button
          className="btn btn-primary !py-1 !px-2.5 !text-[11px] inline-flex items-center gap-1 shadow-sm"
          onClick={() => setAttendingAppointment(item)}
        >
          <Stethoscope size={12} /> Attend
        </button>
      ) : item.status === 'Completed' ? (
        <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
          <Check size={12} /> Attended
        </span>
      ) : (
        <span className="text-[10px] text-slate-400">Cancelled</span>
      ),
  }))

  return (
    <div className="content-wrap">
      <PageHeading
        eyebrow="Your schedule"
        title="Appointments"
        description="Plan visits, attend patients, and keep your clinical day on track."
        action={
          <PrimaryButton icon={CalendarPlus} onClick={() => setOpen(true)}>
            New appointment
          </PrimaryButton>
        }
      />
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-3">
        <div className="flex items-center gap-2">
          <button className="btn btn-secondary !px-2.5 !py-2">
            <span className="text-slate-500">‹</span>
          </button>
          <span className="text-xs font-semibold text-slate-700">October 26, 2026</span>
          <button className="btn btn-secondary !px-2.5 !py-2">
            <span className="text-slate-500">›</span>
          </button>
          <button className="btn btn-secondary !py-2 !text-[11px]">Today</button>
        </div>
        <div className="flex rounded-lg bg-slate-100 p-1">
          {['Day', 'Week', 'Month', 'List'].map((item) => (
            <button
              key={item}
              className={`rounded-md px-3 py-1.5 text-[11px] ${view === item ? 'bg-white font-semibold text-blue-700 shadow-sm' : 'text-slate-500'}`}
              onClick={() => setView(item)}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      {view === 'List' ? (
        <Panel title="Appointment list" subtitle="All scheduled visits with clinical actions">
          <DataTable
            columns={[
              { key: 'appointment', label: 'Patient' },
              { key: 'doctor', label: 'Provider' },
              { key: 'time', label: 'Date & time' },
              { key: 'status', label: 'Status' },
              { key: 'action', label: 'Clinical care' },
            ]}
            rows={rows}
          />
        </Panel>
      ) : (
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.5fr_1fr]">
          <Panel title={`${view} calendar`} subtitle="Monday, October 26">
            <div className="overflow-x-auto">
              <div
                className={`min-w-[620px] ${view === 'Day' ? 'grid grid-cols-[72px_1fr]' : 'grid grid-cols-[60px_repeat(5,minmax(96px,1fr))]'}`}
              >
                {view === 'Day' ? (
                  <>
                    <div className="space-y-0">
                      {['09 AM', '10 AM', '11 AM', '12 PM', '01 PM', '02 PM', '03 PM'].map((hour) => (
                        <div key={hour} className="h-[68px] border-t border-slate-100 pt-2 text-[10px] text-slate-400">
                          {hour}
                        </div>
                      ))}
                    </div>
                    <div>
                      {['09 AM', '10 AM', '11 AM', '12 PM', '01 PM', '02 PM', '03 PM'].map((hour, index) => {
                        const appt = activeClinic.appointments[index % activeClinic.appointments.length]
                        return (
                          <div key={hour} className="relative h-[68px] border-t border-slate-100">
                            {appt && index < 4 && (
                              <div className="absolute left-1 right-2 top-2 flex items-center justify-between rounded-r-md border-l-[3px] border-blue-500 bg-blue-50 px-2 py-1.5 text-[10px]">
                                <div>
                                  <b className="block text-blue-800">{appt.patient}</b>
                                  <span className="text-blue-700/70">{appt.doctor}</span>
                                </div>
                                {appt.status !== 'Completed' && (
                                  <button
                                    className="rounded bg-blue-600 px-2 py-1 text-[9px] font-bold text-white hover:bg-blue-700"
                                    onClick={() => setAttendingAppointment(appt)}
                                  >
                                    Attend
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </>
                ) : (
                  <>
                    <div className="pt-2">
                      {['9 AM', '10 AM', '11 AM', '12 PM', '1 PM'].map((hour) => (
                        <div key={hour} className="h-[68px] border-t border-slate-100 pt-2 text-[10px] text-slate-400">
                          {hour}
                        </div>
                      ))}
                    </div>
                    {['Mon 26', 'Tue 27', 'Wed 28', 'Thu 29', 'Fri 30'].map((day, index) => (
                      <div key={day}>
                        <div className="pb-3 text-center text-[10px] font-semibold text-slate-500">{day}</div>
                        {['9 AM', '10 AM', '11 AM', '12 PM', '1 PM'].map((hour, row) => (
                          <div key={hour} className="h-[68px] border-t border-l border-slate-100 p-1">
                            {index === 0 && row < activeClinic.appointments.length && (
                              <div className="rounded bg-blue-50 p-1.5 text-[9px] text-blue-700">
                                {activeClinic.appointments[row].patient}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          </Panel>
          <Panel title="Today's visits" subtitle={`${activeClinic.appointments.filter((item) => item.date === 'Today').length} appointments scheduled`}>
            <div className="space-y-3">
              {activeClinic.appointments
                .filter((item) => item.date === 'Today')
                .map((item) => (
                  <div key={item.id} className="flex gap-3 rounded-lg border border-slate-100 p-3">
                    <div className="min-w-[58px] pt-0.5 text-[11px] font-semibold text-blue-700">{item.time}</div>
                    <div className="min-w-0 flex-1 border-l-2 border-blue-200 pl-3">
                      <div className="text-xs font-semibold text-slate-700">{item.patient}</div>
                      <div className="mt-1 text-[10px] text-slate-400">
                        {item.doctor} · {item.type}
                      </div>
                      <div className="mt-2 flex items-center justify-between">
                        <Badge>{item.status}</Badge>
                        {item.status !== 'Completed' && item.status !== 'Cancelled' ? (
                          <button
                            className="btn btn-primary !py-1 !px-2.5 !text-[11px] inline-flex items-center gap-1 shadow-sm"
                            onClick={() => setAttendingAppointment(item)}
                          >
                            <Stethoscope size={12} /> Attend
                          </button>
                        ) : item.status === 'Completed' ? (
                          <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                            <Check size={12} /> Attended
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </Panel>
        </div>
      )}

      {open && (
        <Modal title="Schedule an appointment" onClose={() => setOpen(false)}>
          <form className="space-y-4" onSubmit={submit}>
            <label className="block">
              <span className="mb-1.5 block text-[11px] font-medium text-slate-600">Patient</span>
              <select className="form-input !text-xs" name="patient" required>
                {activeClinic.patients.map((patient) => (
                  <option key={patient.id}>{patient.name}</option>
                ))}
              </select>
            </label>
            <label className="block">
              <span className="mb-1.5 block text-[11px] font-medium text-slate-600">Doctor</span>
              <select className="form-input !text-xs" name="doctor" required>
                {activeClinic.staff
                  .filter((person) => person.role.toLowerCase().includes('dr.') || person.name.toLowerCase().includes('dr.'))
                  .map((person) => (
                    <option key={person.id}>{person.name}</option>
                  ))}
              </select>
            </label>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Date" name="date" type="date" defaultValue="2026-10-26" required />
              <Field label="Start time" name="time" type="time" required />
            </div>
            <Field label="Appointment type" name="type" placeholder="e.g. Annual checkup" required />
            <div className="flex justify-end gap-2">
              <button type="button" className="btn btn-secondary" onClick={() => setOpen(false)}>
                Cancel
              </button>
              <PrimaryButton type="submit" icon={null}>
                Schedule visit
              </PrimaryButton>
            </div>
          </form>
        </Modal>
      )}

      {attendingAppointment && (
        <AttendConsultationModal
          appointment={attendingAppointment}
          onClose={() => setAttendingAppointment(null)}
        />
      )}
    </div>
  )
}

// -------------------------------------------------------------
// Staff & Providers
// -------------------------------------------------------------
export function StaffPage() {
  const { activeClinic, addStaff, updateStaff, notify } = useStore()
  const [open, setOpen] = useState(false)

  function submit(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    addStaff({ name: form.get('name'), role: form.get('role'), email: form.get('email'), status: 'Active' })
    setOpen(false)
    notify('Team member added')
  }

  return (
    <div className="content-wrap">
      <PageHeading
        eyebrow="Your care team"
        title="Doctors & staff"
        description="Keep your clinical providers and front-desk team organized."
        action={<PrimaryButton onClick={() => setOpen(true)}>Add team member</PrimaryButton>}
      />
      <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Team members" value={activeClinic.staff.length} icon={Users} tone="blue" />
        <StatCard
          label="Providers & Doctors"
          value={activeClinic.staff.filter((person) => person.role.includes('Dr.') || person.name.includes('Dr.')).length}
          icon={Stethoscope}
          tone="purple"
        />
        <StatCard label="Available today" value={activeClinic.staff.length} icon={CalendarCheck2} tone="green" />
      </div>
      <Panel title="Your team" subtitle="Manage clinic staff profiles">
        <DataTable
          columns={[
            {
              key: 'name',
              label: 'Team member',
              render: (_, row) => (
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-violet-50 text-[10px] font-bold text-violet-700">
                    {row.initials}
                  </span>
                  <div>
                    <b className="font-semibold text-slate-700 block">{row.name}</b>
                    {row.name === activeClinic.owner && (
                      <span className="text-[9px] font-bold uppercase text-blue-600 bg-blue-50 px-1 rounded">
                        Clinic Owner & Attending Doctor
                      </span>
                    )}
                  </div>
                </div>
              ),
            },
            { key: 'role', label: 'Role / specialty' },
            { key: 'email', label: 'Email' },
            { key: 'status', label: 'Status', render: (value) => <Badge>{value}</Badge> },
            {
              key: 'action',
              label: '',
              render: (_, row) => (
                <button
                  className="text-[10px] font-semibold text-blue-600"
                  onClick={() => {
                    updateStaff(row.id, { status: row.status === 'Active' ? 'Inactive' : 'Active' })
                    notify(row.status === 'Active' ? 'Team member deactivated' : 'Team member reactivated')
                  }}
                >
                  {row.status === 'Active' ? 'Deactivate' : 'Reactivate'}
                </button>
              ),
            },
          ]}
          rows={activeClinic.staff}
        />
      </Panel>
      {open && (
        <Modal title="Add team member" onClose={() => setOpen(false)}>
          <form className="space-y-4" onSubmit={submit}>
            <Field label="Full name" name="name" placeholder="Dr. Alex Morgan" required />
            <Field label="Email" name="email" type="email" placeholder="alex@clinic.com" required />
            <Field label="Role / specialty" name="role" placeholder="Family medicine" required />
            <label className="block text-[11px] text-slate-500">
              Availability schedule
              <div className="mt-2 rounded-lg bg-slate-50 p-3 text-xs">
                Monday – Friday <span className="float-right font-medium">9:00 AM – 5:00 PM</span>
              </div>
            </label>
            <div className="flex justify-end gap-2">
              <button type="button" className="btn btn-secondary" onClick={() => setOpen(false)}>
                Cancel
              </button>
              <PrimaryButton type="submit" icon={null}>
                Add member
              </PrimaryButton>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}

// -------------------------------------------------------------
// Services Page
// -------------------------------------------------------------
export function ServicesPage() {
  const { activeClinic, addService, updateService, removeService, notify } = useStore()
  const [open, setOpen] = useState(false)
  const [editing, setEditing] = useState(null)

  function submit(event) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const service = {
      name: form.get('name'),
      duration: `${form.get('duration')} min`,
      price: `₹${form.get('price')}`,
      status: editing?.status || 'Active',
    }
    if (editing) updateService(editing.id, service)
    else addService(service)
    setOpen(false)
    setEditing(null)
    notify(editing ? 'Service updated' : 'Service added to your clinic')
  }

  return (
    <div className="content-wrap">
      <PageHeading
        eyebrow="Care catalog"
        title="Services"
        description="Manage the treatments and consultation services your clinic offers to patients."
        action={<PrimaryButton onClick={() => setOpen(true)}>Add service</PrimaryButton>}
      />
      <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Active services" value={activeClinic.services.length} icon={Activity} tone="blue" />
        <StatCard label="Average appointment" value="34 min" icon={Clock3} tone="purple" />
        <StatCard label="Average service price" value="₹148" icon={CreditCard} tone="green" />
      </div>
      <Panel title="Clinic services" subtitle="Services currently available for booking">
        <DataTable
          columns={[
            { key: 'name', label: 'Service', render: (value) => <b className="font-semibold text-slate-700">{value}</b> },
            { key: 'duration', label: 'Duration' },
            { key: 'price', label: 'Price' },
            { key: 'status', label: 'Status', render: (value) => <Badge>{value}</Badge> },
            {
              key: 'actions',
              label: '',
              render: (_, row) => (
                <div className="flex gap-3">
                  <button
                    className="text-[11px] font-semibold text-blue-600"
                    onClick={() => {
                      setEditing(row)
                      setOpen(true)
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="text-[11px] font-medium text-rose-500"
                    onClick={() => {
                      if (window.confirm(`Remove ${row.name}?`)) {
                        removeService(row.id)
                        notify(`${row.name} removed`)
                      }
                    }}
                  >
                    Remove
                  </button>
                </div>
              ),
            },
          ]}
          rows={activeClinic.services}
        />
      </Panel>
      {open && (
        <Modal title={editing ? 'Edit service' : 'Create a service'} onClose={() => { setOpen(false); setEditing(null) }}>
          <form className="space-y-4" onSubmit={submit}>
            <Field label="Service name" name="name" placeholder="e.g. General consultation" defaultValue={editing?.name} required />
            <Field label="Description" name="description" placeholder="A brief overview for patients" />
            <div className="grid grid-cols-2 gap-3">
              <Field
                label="Duration (minutes)"
                name="duration"
                type="number"
                placeholder="30"
                defaultValue={editing ? Number.parseInt(editing.duration, 10) : undefined}
                required
              />
              <Field
                label="Price (₹)"
                name="price"
                type="number"
                placeholder="120"
                defaultValue={editing ? Number.parseFloat(editing.price.replace(/[$₹]/g, '')) : undefined}
                required
              />
            </div>
            <div className="flex justify-end gap-2">
              <button type="button" className="btn btn-secondary" onClick={() => { setOpen(false); setEditing(null) }}>
                Cancel
              </button>
              <PrimaryButton type="submit" icon={null}>
                {editing ? 'Save changes' : 'Save service'}
              </PrimaryButton>
            </div>
          </form>
        </Modal>
      )}
    </div>
  )
}

// -------------------------------------------------------------
// Clinic Tools (Subscription, Settings, Billing, Reports)
// -------------------------------------------------------------
export function ClinicToolsPage({ page }) {
  const { activeClinic, data, updateClinic, notify } = useStore()

  if (page === 'subscription') {
    const currentPlan = data.plans.find((plan) => plan.name === activeClinic.plan) || data.plans[0]
    return (
      <div className="content-wrap">
        <PageHeading
          eyebrow="Your membership"
          title="Clinic subscription"
          description="A clear view of your plan, included tools, and billing."
          action={<Badge>{activeClinic.status}</Badge>}
        />
        <div className="mb-5 grid grid-cols-1 gap-5 lg:grid-cols-[1.1fr_1fr]">
          <section className="card overflow-hidden">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-6 text-white">
              <div className="text-[11px] font-semibold uppercase tracking-[.1em] text-blue-100">Current plan</div>
              <div className="mt-2 flex items-end justify-between">
                <div>
                  <h2 className="brand-font text-3xl font-bold">{currentPlan.name}</h2>
                  <p className="mt-1 text-xs text-blue-100">{activeClinic.name}</p>
                </div>
                <div className="text-right">
                  <span className="text-3xl font-bold">₹{currentPlan.price}</span>
                  <span className="text-xs text-blue-100"> / month</span>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div className="mb-4 flex justify-between text-xs">
                <span className="font-semibold text-slate-700">Included in your plan</span>
                <span className="text-slate-400">Renews {activeClinic.renewal}</span>
              </div>
              <div className="space-y-3">
                {[currentPlan.clinics, currentPlan.staff, currentPlan.patients, ...currentPlan.features].map((item) => (
                  <div key={item} className="flex items-center gap-2 text-xs text-slate-600">
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                      <Check size={12} />
                    </span>
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </section>
          <Panel title="Usage at a glance" subtitle="You're making great use of your plan">
            <Usage
              label="Patient records"
              current={activeClinic.patients.length}
              max={currentPlan.name === 'Starter' ? 500 : currentPlan.name === 'Professional' ? 5000 : 10000}
            />
            <Usage
              label="Team members"
              current={activeClinic.staff.length}
              max={currentPlan.name === 'Starter' ? 3 : currentPlan.name === 'Professional' ? 15 : 100}
            />
            <div className="mt-5 rounded-lg bg-amber-50 p-3 text-[11px] leading-relaxed text-amber-800">
              Need more room to grow? Compare plans and find the right fit for your practice.
            </div>
          </Panel>
        </div>
        <h2 className="mb-4 text-sm font-semibold text-slate-800">Plans built for your next chapter</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {data.plans.map((plan) => (
            <div
              key={plan.id}
              className={`card p-5 ${plan.name === currentPlan.name ? 'border-blue-300 ring-2 ring-blue-100' : ''}`}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-800">{plan.name}</h3>
                {plan.name === currentPlan.name && <Badge>Current plan</Badge>}
              </div>
              <div className="mt-4 text-2xl font-bold text-slate-800">
                ${plan.price}
                <span className="text-xs font-normal text-slate-400"> / month</span>
              </div>
              <p className="mt-2 min-h-10 text-[11px] leading-relaxed text-slate-500">{plan.description}</p>
              <ul className="my-4 space-y-2">
                {[plan.clinics, plan.staff, plan.patients, ...plan.features].map((feature) => (
                  <li key={feature} className="flex gap-2 text-[11px] text-slate-600">
                    <Check size={13} className="text-emerald-500" />
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                className={plan.name === currentPlan.name ? 'btn btn-secondary w-full' : 'btn btn-primary w-full'}
                onClick={() => {
                  if (plan.name !== currentPlan.name && window.confirm(`Change your plan to ${plan.name}?`)) {
                    updateClinic(activeClinic.id, { plan: plan.name })
                    notify(`Your clinic plan is now ${plan.name}`)
                  }
                }}
              >
                {plan.name === currentPlan.name ? 'Your current plan' : `Choose ${plan.name}`}
              </button>
            </div>
          ))}
        </div>
        <div className="mt-5 flex justify-end">
          <button
            className="text-[11px] text-rose-500"
            onClick={() => {
              if (window.confirm('Cancel this clinic subscription?')) {
                updateClinic(activeClinic.id, { status: 'Cancelled' })
                notify('Subscription cancelled')
              }
            }}
          >
            Cancel subscription
          </button>
        </div>
      </div>
    )
  }

  if (page === 'settings') {
    return (
      <div className="content-wrap">
        <PageHeading
          eyebrow="Practice preferences"
          title="Clinic settings"
          description="Keep your clinic profile, operating hours, and doctor preferences up to date."
        />
        <div className="w-full space-y-6">
          <Panel title="Clinic profile" subtitle="Your clinic's public-facing and physician details">
            <form
              className="space-y-5"
              onSubmit={(event) => {
                event.preventDefault()
                const form = new FormData(event.currentTarget)
                updateClinic(activeClinic.id, {
                  name: form.get('clinic'),
                  email: form.get('email'),
                  phone: form.get('phone'),
                  address: form.get('address'),
                })
                notify('Clinic profile saved')
              }}
            >
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Clinic name" name="clinic" defaultValue={activeClinic.name} required />
                <Field label="Email" name="email" type="email" defaultValue={activeClinic.email} required />
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Phone" name="phone" defaultValue={activeClinic.phone} />
                <Field label="Address" name="address" defaultValue={activeClinic.address} />
              </div>
              <div>
                <span className="mb-2 block text-xs font-medium text-slate-600">Working hours</span>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 rounded-xl bg-slate-50 p-3.5 text-xs text-slate-600 border border-slate-100">
                  <b className="font-semibold text-slate-800">Monday – Friday</b>
                  <span className="text-slate-500">Opening: 09:00 AM</span>
                  <span className="text-slate-500">Closing: 05:00 PM</span>
                </div>
              </div>
              <div className="pt-2">
                <button className="btn btn-primary" type="submit">
                  Save changes
                </button>
              </div>
            </form>
          </Panel>

          <Panel title="Appearance & Branding" subtitle="Configure color palettes and dashboard styling">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-slate-100 bg-slate-50/50 p-5">
              <div className="flex items-center gap-3.5">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100 text-blue-600 shrink-0">
                  <Palette size={22} />
                </div>
                <div>
                  <div className="text-sm font-bold text-slate-800">
                    Active Theme: {getThemeById(activeClinic.theme || DEFAULT_THEME_ID).name}
                  </div>
                  <div className="text-xs text-slate-500 mt-0.5">
                    Customize color tokens, dark mode, and clinical aesthetics across your workspace.
                  </div>
                </div>
              </div>
              <Link
                to="/clinic/appearance"
                className="btn btn-primary !py-2.5 !px-5 !text-xs font-bold shrink-0 flex items-center gap-2"
              >
                <Palette size={15} /> Open Theme Customizer
              </Link>
            </div>
          </Panel>
        </div>
      </div>
    )
  }

  if (page === 'billing') {
    return (
      <div className="content-wrap">
        <PageHeading
          eyebrow="Clinic finances"
          title="Billing & payments"
          description="Track revenue, patient invoices, and expenses for your clinic."
          action={
            <button className="btn btn-secondary" onClick={() => window.print()}>
              <Download size={14} /> Export
            </button>
          }
        />
        <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <StatCard label="Total revenue" value="₹38,420" change="+9.4%" icon={Wallet} tone="green" />
          <StatCard label="Payments received" value="₹34,180" icon={CreditCard} tone="blue" />
          <StatCard label="Pending payments" value="₹4,240" icon={Clock3} tone="orange" />
          <StatCard label="Monthly expenses" value="₹12,680" icon={Activity} tone="purple" />
        </div>
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.4fr_1fr]">
          <Panel title="Revenue & expenses" subtitle="Monthly financial overview">
            <TrendChart />
          </Panel>
          <Panel title="Recent patient invoices" subtitle="Mock clinic billing records">
            <DataTable
              columns={[
                { key: 'invoice', label: 'Invoice' },
                { key: 'patient', label: 'Patient' },
                { key: 'amount', label: 'Amount' },
                { key: 'status', label: 'Status' },
              ]}
              rows={[
                { invoice: 'CL-1048', patient: activeClinic.patients[0]?.name, amount: '₹180.00', status: 'Paid' },
                { invoice: 'CL-1047', patient: activeClinic.patients[1]?.name, amount: '₹120.00', status: 'Pending' },
                { invoice: 'CL-1046', patient: activeClinic.patients[2]?.name, amount: '₹95.00', status: 'Paid' },
              ]}
            />
          </Panel>
        </div>
      </div>
    )
  }

  if (page === 'reports') {
    return (
      <div className="content-wrap">
        <PageHeading
          eyebrow="Practice insights"
          title="Reports"
          description="A simple overview of your patient, appointment, and revenue trends."
          action={
            <select className="form-input !w-auto !text-xs" aria-label="Report date range">
              <option>Last 6 months</option>
              <option>This month</option>
              <option>This year</option>
            </select>
          }
        />
        <div className="mb-5 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard label="Patient growth" value="+18.6%" change="+2.3%" icon={Users} tone="blue" />
          <StatCard label="Visit completion" value="92.4%" icon={CalendarCheck2} tone="green" />
          <StatCard label="Revenue growth" value="+12.8%" icon={Wallet} tone="purple" />
        </div>
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
          <Panel title="Patient growth" subtitle="New patient registrations by month">
            <TrendChart data={revenueData.map((item) => ({ ...item, revenue: item.patients }))} dataKey="revenue" moneyValue={false} />
          </Panel>
          <Panel title="Revenue trends" subtitle="Collected revenue, INR (₹)">
            <TrendChart />
          </Panel>
          <Panel title="Appointment volume" subtitle="Completed visits each month">
            <ResponsiveContainer width="100%" height={230}>
              <BarChart data={revenueData}>
                <CartesianGrid stroke="#eef2f7" vertical={false} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} />
                <Tooltip />
                <Bar dataKey="patients" fill="#8b9cf6" radius={[5, 5, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Panel>
          <Panel title="Top services" subtitle="Most booked by patients">
            <div className="space-y-4">
              {activeClinic.services.slice(0, 4).map((service, index) => (
                <div key={service.id} className="flex items-center gap-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-xs font-bold text-blue-700">
                    0{index + 1}
                  </span>
                  <div className="flex-1 text-xs font-medium text-slate-600">
                    {service.name}
                    <div className="mt-1 h-1.5 rounded-full bg-slate-100">
                      <div className="h-1.5 rounded-full bg-blue-500" style={{ width: `${82 - index * 14}%` }} />
                    </div>
                  </div>
                  <b className="text-xs text-slate-700">{84 - index * 13}</b>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    )
  }

  return null
}

// -------------------------------------------------------------
// Patient Detail Page
// -------------------------------------------------------------
export function PatientDetailPage() {
  const { patientId } = useParams()
  const { activeClinic, data } = useStore()
  const [attending, setAttending] = useState(false)
  const patient = activeClinic.patients.find((item) => item.id === patientId)

  if (!patient) {
    return (
      <div className="content-wrap">
        <PageHeading title="Patient not found" />
        <a href="/clinic/patients" className="text-sm text-blue-600">
          Return to patients
        </a>
      </div>
    )
  }

  const patientRecords = (data.medicalRecords || []).filter(
    (r) => r.patientId === patient.id || r.patientName === patient.name
  )
  const patientPrescriptions = (data.prescriptions || []).filter(
    (p) => p.patientId === patient.id || p.patientName === patient.name
  )

  return (
    <div className="content-wrap">
      <PageHeading
        eyebrow="Patient record"
        title={patient.name}
        description="A clear, connected view of this patient's clinical care and consultations."
        action={
          <PrimaryButton icon={Stethoscope} onClick={() => setAttending(true)}>
            Start Consultation / Attend
          </PrimaryButton>
        }
      />
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-[1fr_1.5fr]">
        <Panel title="Contact & Demographics">
          <Detail label="Email" value={patient.email} />
          <Detail label="Phone" value={patient.phone} />
          <Detail label="Age" value={`${patient.age} years`} />
          <Detail label="Gender" value={patient.gender} />
          <Detail label="Status" value={patient.status} />
          <Detail label="Emergency" value={patient.emergencyContact || 'None on file'} />
        </Panel>

        <div className="space-y-5">
          <Panel title="Medical History & Consultations" subtitle="Clinical notes issued by attending physicians">
            {patientRecords.length > 0 ? (
              <div className="space-y-3">
                {patientRecords.map((r) => (
                  <div key={r.id} className="rounded-lg border border-slate-200 bg-slate-50/70 p-3 text-xs">
                    <div className="flex justify-between font-semibold text-slate-800">
                      <span>{r.title}</span>
                      <span className="text-[10px] text-slate-400">{r.date} · {r.doctor}</span>
                    </div>
                    <p className="mt-1 text-slate-600">{r.summary}</p>
                    {r.vitals && (
                      <div className="mt-2 flex flex-wrap gap-2 text-[10px]">
                        <span className="rounded bg-white px-1.5 py-0.5 border border-slate-200">BP: {r.vitals.bp}</span>
                        <span className="rounded bg-white px-1.5 py-0.5 border border-slate-200">HR: {r.vitals.heartRate}</span>
                        <span className="rounded bg-white px-1.5 py-0.5 border border-slate-200">SpO2: {r.vitals.spo2}</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="rounded-lg bg-slate-50 p-4 text-xs text-slate-500">
                No past medical history recorded. Click "Start Consultation / Attend" above to examine this patient.
              </div>
            )}
          </Panel>

          <Panel title="Active Prescriptions" subtitle="Medications issued to patient">
            {patientPrescriptions.length > 0 ? (
              <div className="space-y-2">
                {patientPrescriptions.map((rx) => (
                  <div key={rx.id} className="rounded-lg border border-blue-100 bg-blue-50/50 p-3 text-xs">
                    <div className="flex justify-between font-semibold text-blue-900">
                      <span>{rx.diagnosis}</span>
                      <span className="text-[10px] text-blue-700">{rx.date}</span>
                    </div>
                    <div className="mt-1 space-y-1">
                      {rx.medications.map((m, i) => (
                        <div key={i} className="text-slate-700">
                          • <b>{m.name}</b> {m.dosage} ({m.form}) — {m.frequency} for {m.duration}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-xs text-slate-400">No active medications on record.</div>
            )}
          </Panel>
        </div>
      </div>

      {attending && (
        <AttendConsultationModal
          patient={patient}
          appointment={{
            patient: patient.name,
            patientId: patient.id,
            patientEmail: patient.email,
            type: 'In-Clinic Consultation',
            time: 'Immediate',
          }}
          onClose={() => setAttending(false)}
        />
      )}
    </div>
  )
}

function Field({ label, name, type = 'text', placeholder, required = false, defaultValue }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-[11px] font-medium text-slate-600">{label}</span>
      <input
        className="form-input !text-xs"
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        defaultValue={defaultValue}
      />
    </label>
  )
}

function Detail({ label, value }) {
  return (
    <div className="mb-3 flex justify-between gap-2 border-b border-slate-50 pb-2 text-xs">
      <span className="text-slate-400">{label}</span>
      <span className="text-right font-medium text-slate-700">{value}</span>
    </div>
  )
}

function Usage({ label, current, max }) {
  const percent = Math.min(100, Math.round((current / max) * 100))
  return (
    <div className="mb-5">
      <div className="mb-2 flex justify-between text-[11px]">
        <span className="text-slate-500">{label}</span>
        <b className="text-slate-700">
          {current.toLocaleString()} / {max.toLocaleString()}
        </b>
      </div>
      <div className="h-2 rounded-full bg-slate-100">
        <div className={`h-2 rounded-full ${percent > 80 ? 'bg-amber-500' : 'bg-blue-500'}`} style={{ width: `${percent}%` }} />
      </div>
    </div>
  )
}

// ==========================================
// Doctor Module: 1. Consultation Notes Page
// ==========================================
export function DoctorConsultationNotesPage() {
  const { activeClinic, data, currentUser, notify } = useStore()
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('All')
  const [selectedRecord, setSelectedRecord] = useState(null)
  const [attendModalOpen, setAttendModalOpen] = useState(false)

  const records = (data.medicalRecords || []).filter(
    (r) => !r.clinicId || r.clinicId === activeClinic.id || r.clinicName === activeClinic.name
  )

  const filtered = records.filter((r) => {
    const matchesSearch =
      r.patientName?.toLowerCase().includes(search.toLowerCase()) ||
      r.title?.toLowerCase().includes(search.toLowerCase()) ||
      r.summary?.toLowerCase().includes(search.toLowerCase())
    const matchesType = typeFilter === 'All' || r.type === typeFilter
    return matchesSearch && matchesType
  })

  return (
    <div className="content-wrap">
      <PageHeading
        eyebrow="Clinical Documentation"
        title="Consultation Notes & Clinical Records"
        description="Comprehensive SOAP notes, patient diagnostic summaries, vitals, and physician treatment plans."
        action={
          <PrimaryButton icon={Stethoscope} onClick={() => setAttendModalOpen(true)}>
            New Consultation / Attend
          </PrimaryButton>
        }
      />

      {/* Metrics Row */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-4">
        <StatCard label="Total Notes Recorded" value={records.length} icon={FileText} tone="blue" />
        <StatCard label="Attended This Week" value="18 visits" icon={CalendarCheck2} tone="green" />
        <StatCard label="Active Prescriptions" value={(data.prescriptions || []).length} icon={Pill} tone="purple" />
        <StatCard label="Primary Care Patients" value={activeClinic.patients.length} icon={Users} tone="teal" />
      </div>

      {/* Filter and Search Bar */}
      <div className="mb-6 card p-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by patient, diagnosis, notes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-input !pl-8 !py-1.5 !text-xs"
            />
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="form-input !py-1.5 !text-xs"
          >
            <option value="All">All Record Types</option>
            <option value="Consultation Note">Consultation Notes</option>
            <option value="Clinical Examination">Clinical Examinations</option>
            <option value="Follow-up">Follow-up Notes</option>
          </select>
          <div className="flex items-center justify-end text-xs text-slate-400">
            Showing {filtered.length} of {records.length} records
          </div>
        </div>
      </div>

      {/* Notes List */}
      <Panel title="Patient Consultation History" subtitle="Documented clinical encounters and prescribed therapies">
        {filtered.length > 0 ? (
          <div className="space-y-4">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm hover:border-blue-200 transition"
              >
                <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <b className="text-sm font-bold text-slate-800">{item.title}</b>
                      <span className="rounded bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700">
                        {item.type || 'Consultation Note'}
                      </span>
                    </div>
                    <div className="mt-1 flex items-center gap-2 text-xs text-slate-500">
                      <User size={13} className="text-slate-400" />
                      <span className="font-semibold text-slate-700">{item.patientName}</span>
                      <span>·</span>
                      <span>{item.date}</span>
                      <span>·</span>
                      <span className="text-slate-400">{item.doctor || currentUser?.name}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => setSelectedRecord(item)}
                    className="btn btn-secondary !py-1 !px-2.5 !text-xs"
                  >
                    View Full Chart
                  </button>
                </div>

                <p className="mt-3 text-xs leading-relaxed text-slate-600">
                  {item.summary}
                </p>

                {item.vitals && (
                  <div className="mt-3 flex flex-wrap gap-2 pt-2 border-t border-slate-50 text-[11px]">
                    <span className="rounded-md bg-slate-50 border border-slate-100 px-2 py-1 text-slate-600">
                      BP: <b>{item.vitals.bp || '120/80'}</b>
                    </span>
                    <span className="rounded-md bg-slate-50 border border-slate-100 px-2 py-1 text-slate-600">
                      Heart Rate: <b>{item.vitals.heartRate || '72 bpm'}</b>
                    </span>
                    <span className="rounded-md bg-slate-50 border border-slate-100 px-2 py-1 text-slate-600">
                      SpO2: <b>{item.vitals.spo2 || '99%'}</b>
                    </span>
                    <span className="rounded-md bg-slate-50 border border-slate-100 px-2 py-1 text-slate-600">
                      Temp: <b>{item.vitals.temp || '98.6°F'}</b>
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="py-12 text-center text-xs text-slate-400">
            No clinical notes found matching your search.
          </div>
        )}
      </Panel>

      {/* Record Detail Modal */}
      {selectedRecord && (
        <Modal title={`Clinical Record: ${selectedRecord.patientName}`} onClose={() => setSelectedRecord(null)}>
          <div className="space-y-4 text-xs">
            <div className="flex justify-between border-b border-slate-100 pb-3">
              <div>
                <b className="text-sm text-slate-800">{selectedRecord.title}</b>
                <p className="text-[11px] text-slate-400">{selectedRecord.date} · Attending: {selectedRecord.doctor}</p>
              </div>
              <Badge>{selectedRecord.type || 'Consultation'}</Badge>
            </div>

            <div className="rounded-lg bg-slate-50 p-3">
              <span className="mb-1 block font-semibold text-slate-700">Clinical Assessment & Summary</span>
              <p className="text-slate-600 leading-relaxed">{selectedRecord.summary}</p>
            </div>

            {selectedRecord.vitals && (
              <div>
                <span className="mb-2 block font-semibold text-slate-700">Recorded Vitals</span>
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                  <div className="rounded border border-slate-100 p-2 text-center">
                    <span className="block text-[10px] text-slate-400">Blood Pressure</span>
                    <b className="text-slate-800">{selectedRecord.vitals.bp}</b>
                  </div>
                  <div className="rounded border border-slate-100 p-2 text-center">
                    <span className="block text-[10px] text-slate-400">Heart Rate</span>
                    <b className="text-slate-800">{selectedRecord.vitals.heartRate}</b>
                  </div>
                  <div className="rounded border border-slate-100 p-2 text-center">
                    <span className="block text-[10px] text-slate-400">Oxygen (SpO2)</span>
                    <b className="text-slate-800">{selectedRecord.vitals.spo2}</b>
                  </div>
                  <div className="rounded border border-slate-100 p-2 text-center">
                    <span className="block text-[10px] text-slate-400">Temperature</span>
                    <b className="text-slate-800">{selectedRecord.vitals.temp}</b>
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-end pt-3 border-t border-slate-100">
              <button className="btn btn-secondary" onClick={() => setSelectedRecord(null)}>
                Close Chart
              </button>
            </div>
          </div>
        </Modal>
      )}

      {attendModalOpen && (
        <AttendConsultationModal
          onClose={() => setAttendModalOpen(false)}
        />
      )}
    </div>
  )
}

// ==========================================
// Doctor Module: 2. Appointment History Page
// ==========================================
export function DoctorAppointmentHistoryPage() {
  const { activeClinic } = useStore()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const appointments = activeClinic.appointments || []

  const filtered = appointments.filter((appt) => {
    const matchesSearch =
      appt.patient?.toLowerCase().includes(search.toLowerCase()) ||
      appt.doctor?.toLowerCase().includes(search.toLowerCase()) ||
      appt.id?.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'All' || appt.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="content-wrap">
      <PageHeading
        eyebrow="Clinical Archives"
        title="Appointment History & Outcomes"
        description="Comprehensive log of completed, attended, and historical patient encounters."
      />

      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Total Encounters Logged" value={appointments.length} icon={CalendarCheck2} tone="blue" />
        <StatCard
          label="Completed Visits"
          value={appointments.filter((a) => a.status === 'Completed').length}
          icon={Check}
          tone="green"
        />
        <StatCard
          label="Cancelled / Rescheduled"
          value={appointments.filter((a) => a.status === 'Cancelled').length}
          icon={Clock3}
          tone="orange"
        />
      </div>

      <div className="mb-6 card p-4">
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by patient, ID, doctor..."
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
            <option value="All">All Visit Statuses</option>
            <option value="Completed">Completed</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Cancelled">Cancelled</option>
            <option value="No-show">No-show</option>
          </select>
          <div className="flex items-center justify-end text-xs text-slate-400">
            {filtered.length} appointment records found
          </div>
        </div>
      </div>

      <Panel title="Historical Consultations">
        <DataTable
          columns={[
            {
              key: 'patient',
              label: 'Patient',
              render: (value, row) => (
                <div>
                  <b className="block text-slate-800">{value}</b>
                  <span className="text-[10px] text-slate-400">{row.id} · {row.type}</span>
                </div>
              ),
            },
            {
              key: 'date',
              label: 'Date & Time',
              render: (value, row) => (
                <div className="text-xs">
                  <div>{value}</div>
                  <div className="text-[10px] text-slate-400">{row.time}</div>
                </div>
              ),
            },
            { key: 'doctor', label: 'Attending Doctor' },
            {
              key: 'fee',
              label: 'Consultation Fee',
              render: (val) => <span className="font-semibold text-slate-700">₹{val || 120}.00</span>,
            },
            {
              key: 'status',
              label: 'Status',
              render: (value) => <Badge>{value}</Badge>,
            },
          ]}
          rows={filtered}
        />
      </Panel>
    </div>
  )
}

// ==========================================
// Doctor Module: 3. Availability & Schedule Page
// ==========================================
export function DoctorSchedulePage() {
  const { activeClinic, notify } = useStore()
  const [telehealthEnabled, setTelehealthEnabled] = useState(true)
  const [walkInsEnabled, setWalkInsEnabled] = useState(true)
  const [slotDuration, setSlotDuration] = useState('30')
  const [bufferTime, setBufferTime] = useState('10')

  const scheduleDays = [
    { day: 'Monday', hours: '08:30 AM – 05:00 PM', slots: 16, status: 'Open' },
    { day: 'Tuesday', hours: '08:30 AM – 05:00 PM', slots: 16, status: 'Open' },
    { day: 'Wednesday', hours: '08:30 AM – 05:00 PM', slots: 16, status: 'Open' },
    { day: 'Thursday', hours: '08:30 AM – 05:00 PM', slots: 16, status: 'Open' },
    { day: 'Friday', hours: '08:30 AM – 04:30 PM', slots: 14, status: 'Open' },
    { day: 'Saturday', hours: '09:00 AM – 01:00 PM', slots: 8, status: 'Priority Walk-ins' },
    { day: 'Sunday', hours: 'Closed', slots: 0, status: 'Off Duty' },
  ]

  return (
    <div className="content-wrap">
      <PageHeading
        eyebrow="Practice Operations"
        title="Doctor Availability & Schedule"
        description="Configure weekly clinical operating hours, consultation slot lengths, and telehealth availability."
        action={
          <button
            className="btn btn-primary"
            onClick={() => notify('Physician schedule configuration saved.')}
          >
            Save Schedule Preferences
          </button>
        }
      />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.5fr_1fr]">
        <div className="space-y-6">
          <Panel title="Weekly Clinical Hours" subtitle="Regular working hours for patient consultations">
            <div className="divide-y divide-slate-100">
              {scheduleDays.map((item) => (
                <div key={item.day} className="flex items-center justify-between py-3">
                  <div>
                    <b className="block text-xs text-slate-800">{item.day}</b>
                    <span className="text-[11px] text-slate-500">{item.hours}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-slate-400">{item.slots} slots</span>
                    <Badge tone={item.status === 'Open' ? 'green' : item.status === 'Off Duty' ? 'gray' : 'blue'}>
                      {item.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          <Panel title="Appointment Duration & Pacing" subtitle="Controls pacing between patients">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <label className="block text-xs">
                <span className="mb-1 block font-semibold text-slate-700">Default Slot Duration</span>
                <select
                  value={slotDuration}
                  onChange={(e) => setSlotDuration(e.target.value)}
                  className="form-input !text-xs"
                >
                  <option value="15">15 Minutes (Brief follow-up)</option>
                  <option value="30">30 Minutes (Standard consultation)</option>
                  <option value="45">45 Minutes (Comprehensive physical)</option>
                  <option value="60">60 Minutes (Initial intake)</option>
                </select>
              </label>

              <label className="block text-xs">
                <span className="mb-1 block font-semibold text-slate-700">Buffer Between Visits</span>
                <select
                  value={bufferTime}
                  onChange={(e) => setBufferTime(e.target.value)}
                  className="form-input !text-xs"
                >
                  <option value="0">No buffer</option>
                  <option value="5">5 Minutes</option>
                  <option value="10">10 Minutes (Recommended)</option>
                  <option value="15">15 Minutes</option>
                </select>
              </label>
            </div>
          </Panel>
        </div>

        <div className="space-y-6">
          <Panel title="Consultation Channels" subtitle="Enable or pause specific consultation modes">
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-3.5">
                <div>
                  <b className="block text-slate-800">Telehealth Video Visits</b>
                  <p className="text-[11px] text-slate-500">Allow patients to book remote video consultations.</p>
                </div>
                <input
                  type="checkbox"
                  checked={telehealthEnabled}
                  onChange={(e) => setTelehealthEnabled(e.target.checked)}
                  className="h-4 w-4 accent-blue-600 rounded"
                />
              </div>

              <div className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 p-3.5">
                <div>
                  <b className="block text-slate-800">Front-Desk Walk-Ins</b>
                  <p className="text-[11px] text-slate-500">Allow receptionist to queue immediate walk-ins.</p>
                </div>
                <input
                  type="checkbox"
                  checked={walkInsEnabled}
                  onChange={(e) => setWalkInsEnabled(e.target.checked)}
                  className="h-4 w-4 accent-blue-600 rounded"
                />
              </div>
            </div>
          </Panel>

          <Panel title="Primary Practice Location" subtitle="Attending clinic organization">
            <div className="text-xs space-y-2">
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-400">Clinic:</span>
                <b className="text-slate-800">{activeClinic.name}</b>
              </div>
              <div className="flex justify-between border-b border-slate-100 pb-2">
                <span className="text-slate-400">Address:</span>
                <span className="text-slate-700">{activeClinic.address}</span>
              </div>
              <div className="flex justify-between pt-1">
                <span className="text-slate-400">Practice Phone:</span>
                <span className="text-slate-700">{activeClinic.phone}</span>
              </div>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  )
}

// ==========================================
// Doctor Module: 4. Notifications Page
// ==========================================
export function DoctorNotificationsPage() {
  const { data, activeClinic, markDoctorNotificationRead, markAllDoctorNotificationsRead } = useStore()
  const navigate = useNavigate()
  const [filter, setFilter] = useState('All')

  const doctorNotifs = useMemo(() => {
    return (data.doctorNotifications || []).filter(
      (n) => !n.clinicId || n.clinicId === activeClinic?.id
    )
  }, [data.doctorNotifications, activeClinic])

  const filtered = doctorNotifs.filter((n) => {
    if (filter === 'Unread') return !n.read
    return true
  })

  return (
    <div className="content-wrap">
      <PageHeading
        eyebrow="Clinical Alerts"
        title="Doctor Notifications"
        description="Real-time alerts for patient arrivals, newly scheduled visits, and prescription updates."
        action={
          <button
            className="btn btn-secondary text-xs flex items-center gap-1.5"
            onClick={markAllDoctorNotificationsRead}
          >
            <Check size={14} /> Mark all as read
          </button>
        }
      />

      <div className="mb-6 flex gap-2">
        <button
          onClick={() => setFilter('All')}
          className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${
            filter === 'All' ? 'bg-blue-600 text-white' : 'border border-slate-200 bg-white text-slate-600'
          }`}
        >
          All Notifications ({doctorNotifs.length})
        </button>
        <button
          onClick={() => setFilter('Unread')}
          className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${
            filter === 'Unread' ? 'bg-blue-600 text-white' : 'border border-slate-200 bg-white text-slate-600'
          }`}
        >
          Unread ({doctorNotifs.filter((n) => !n.read).length})
        </button>
      </div>

      <Panel title="Recent Notifications">
        <div className="divide-y divide-slate-100">
          {filtered.length === 0 ? (
            <div className="py-12 text-center text-xs text-slate-400">
              <Bell size={24} className="mx-auto mb-2 text-slate-300" />
              {filter === 'Unread' ? 'No unread notifications.' : 'No notifications found. You’re all caught up!'}
            </div>
          ) : (
            filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  markDoctorNotificationRead(item.id)
                  if (item.link) navigate(item.link)
                }}
                className={`flex items-start gap-3 py-3.5 px-3 rounded-xl transition cursor-pointer hover:bg-slate-50/80 ${
                  item.read ? 'bg-white' : 'bg-blue-50/40 border border-blue-100'
                }`}
              >
                <span className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs ${
                  item.read ? 'bg-slate-100 text-slate-500' : 'bg-blue-600 text-white'
                }`}>
                  <Bell size={13} />
                </span>
                <div className="flex-1 text-xs min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <b className={`font-semibold ${item.read ? 'text-slate-700' : 'text-blue-900 font-bold'}`}>
                      {item.title}
                    </b>
                    <span className="text-[10px] text-slate-400">{item.date}</span>
                  </div>
                  <p className="mt-1 text-slate-600 leading-relaxed">{item.message}</p>
                  {item.link && (
                    <span className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600">
                      Open details <ChevronRight size={11} />
                    </span>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </Panel>
    </div>
  )
}

// ==========================================
// Clinic Admin / Doctor Module: 5. Pharmacy Management
// ==========================================
export function ClinicPharmacyPage() {
  const {
    activeClinic,
    data,
    confirmPrescriptionOrderByStore,
    updateMedicineOrderStatus,
    updatePharmacyProfile,
    updateMedicineInventory,
    addMedicineToInventory,
    notify,
  } = useStore()
  const navigate = useNavigate()

  const [tab, setTab] = useState('orders') // 'orders' | 'inventory' | 'profile'
  const [orderStatusFilter, setOrderStatusFilter] = useState('All')
  const [search, setSearch] = useState('')

  // Inspect Prescription Modal State
  const [inspectPrescriptionModalOrder, setInspectPrescriptionModalOrder] = useState(null)

  // Add Medicine Modal State
  const [addMedOpen, setAddMedOpen] = useState(false)
  const [newMedName, setNewMedName] = useState('')
  const [newMedDosage, setNewMedDosage] = useState('10 mg')
  const [newMedForm, setNewMedForm] = useState('Tablet')
  const [newMedCategory, setNewMedCategory] = useState('Allergy & Respiratory')
  const [newMedPrice, setNewMedPrice] = useState('14.50')
  const [newMedStock, setNewMedStock] = useState('50')
  const [newMedRequiresRx, setNewMedRequiresRx] = useState(true)
  const [newMedDescription, setNewMedDescription] = useState('')

  // Active Pharmacy for this clinic tenant
  const clinicPharmacy = useMemo(() => {
    return (
      (data.pharmacies || []).find((p) => p.clinicId === activeClinic?.id) ||
      (data.pharmacies || [])[0]
    )
  }, [data.pharmacies, activeClinic])

  // Profile edit state
  const [profileName, setProfileName] = useState(clinicPharmacy?.name || '')
  const [profilePhone, setProfilePhone] = useState(clinicPharmacy?.phone || '')
  const [profileAddress, setProfileAddress] = useState(clinicPharmacy?.address || '')
  const [profileDeliveryCharge, setProfileDeliveryCharge] = useState(
    clinicPharmacy?.deliveryCharge?.toString() || '3.50'
  )
  const [profileThreshold, setProfileThreshold] = useState(
    clinicPharmacy?.freeDeliveryThreshold?.toString() || '35.00'
  )
  const [profileMinOrder, setProfileMinOrder] = useState(
    clinicPharmacy?.minOrderAmount?.toString() || '10.00'
  )
  const [profileDeliveryTime, setProfileDeliveryTime] = useState(
    clinicPharmacy?.estimatedDeliveryTime || '30–45 mins'
  )
  const [profileIsOpen, setProfileIsOpen] = useState(clinicPharmacy?.isOpen !== false)

  // Orders for this clinic/pharmacy tenant
  const clinicOrders = useMemo(() => {
    return (data.medicineOrders || []).filter(
      (o) => !o.clinicId || o.clinicId === activeClinic?.id || o.pharmacyId === clinicPharmacy?.id
    )
  }, [data.medicineOrders, activeClinic, clinicPharmacy])

  const filteredOrders = useMemo(() => {
    return clinicOrders.filter((o) => {
      const q = search.toLowerCase().trim()
      const matchesSearch =
        !q ||
        o.id.toLowerCase().includes(q) ||
        o.patientName?.toLowerCase().includes(q) ||
        o.prescriptionId?.toLowerCase().includes(q)

      const matchesStatus = orderStatusFilter === 'All' || o.status === orderStatusFilter
      return matchesSearch && matchesStatus
    })
  }, [clinicOrders, search, orderStatusFilter])

  // Inventory items
  const inventoryList = useMemo(() => {
    return (clinicPharmacy?.inventory || []).filter((item) => {
      const q = search.toLowerCase().trim()
      return (
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.dosage.toLowerCase().includes(q)
      )
    })
  }, [clinicPharmacy, search])

  const handleProfileSave = (e) => {
    e.preventDefault()
    if (!clinicPharmacy) return
    updatePharmacyProfile(clinicPharmacy.id, {
      name: profileName,
      phone: profilePhone,
      address: profileAddress,
      deliveryCharge: Number(profileDeliveryCharge) || 3.5,
      freeDeliveryThreshold: Number(profileThreshold) || 35,
      minOrderAmount: Number(profileMinOrder) || 10,
      estimatedDeliveryTime: profileDeliveryTime,
      isOpen: profileIsOpen,
      status: profileIsOpen ? 'Open / Delivering' : 'Temporarily Closed',
    })
  }

  const handleAddMedicineSubmit = (e) => {
    e.preventDefault()
    if (!newMedName.trim() || !clinicPharmacy) return

    addMedicineToInventory(clinicPharmacy.id, {
      name: newMedName.trim(),
      dosage: newMedDosage.trim(),
      form: newMedForm,
      category: newMedCategory,
      unitPrice: Number(newMedPrice) || 10,
      stockCount: Number(newMedStock) || 50,
      requiresPrescription: newMedRequiresRx,
      description: newMedDescription.trim(),
    })

    setAddMedOpen(false)
    setNewMedName('')
    setNewMedDescription('')
  }

  return (
    <div className="content-wrap">
      <PageHeading
        eyebrow="Pharmacy Operations"
        title="Pharmacy & Medicine Management"
        description={`Manage prescription verification, fulfillment, stock levels, and home delivery settings for ${activeClinic.name}.`}
        action={
          <div className="flex gap-2">
            <button
              onClick={() => setAddMedOpen(true)}
              className="btn !bg-emerald-600 hover:!bg-emerald-700 text-white !py-2 !text-xs font-semibold flex items-center gap-1.5 shadow-sm"
            >
              <Plus size={14} /> Add Medicine
            </button>
          </div>
        }
      />

      {/* Metric Cards Row */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Total Orders"
          value={clinicOrders.length}
          tone="green"
          detail={`${clinicOrders.filter((o) => o.status === 'Out for Delivery').length} out for delivery`}
        />
        <StatCard
          label="Awaiting Prep"
          value={clinicOrders.filter((o) => o.status === 'Order Placed' || o.status === 'Pharmacy Accepted').length}
          tone="blue"
          detail="Pending packaging"
        />
        <StatCard
          label="Inventory Items"
          value={clinicPharmacy?.inventory?.length || 0}
          tone="teal"
          detail={`${(clinicPharmacy?.inventory || []).filter((i) => i.inStock).length} in stock`}
        />
        <div className="card p-5 flex flex-col justify-between">
          <div>
            <div className="text-[12px] font-medium text-slate-500">Store Status</div>
            <div className="mt-1 flex items-center gap-2">
              <span className={`h-2.5 w-2.5 rounded-full ${clinicPharmacy?.isOpen !== false ? 'bg-emerald-500 animate-ping' : 'bg-rose-500'}`} />
              <b className="text-sm font-bold text-slate-800">{clinicPharmacy?.status || 'Open / Delivering'}</b>
            </div>
            <div className="mt-0.5 text-xs text-slate-500">Speed: {clinicPharmacy?.estimatedDeliveryTime}</div>
          </div>
          <button
            onClick={() => setTab('profile')}
            className="mt-3 btn btn-secondary !py-1 !text-xs font-semibold text-blue-700"
          >
            Adjust Delivery Settings →
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-2">
        <div className="flex gap-2">
          <button
            onClick={() => setTab('orders')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition ${
              tab === 'orders' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <PackageCheck size={14} /> Orders & Dispensing ({clinicOrders.length})
          </button>
          <button
            onClick={() => setTab('inventory')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition ${
              tab === 'inventory' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Pill size={14} /> Medicine Inventory & Pricing ({clinicPharmacy?.inventory?.length || 0})
          </button>
          <button
            onClick={() => setTab('profile')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-semibold transition ${
              tab === 'profile' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Store size={14} /> Pharmacy Profile & Delivery Settings
          </button>
        </div>

        {tab !== 'profile' && (
          <div className="flex items-center gap-2">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder={tab === 'orders' ? 'Search orders, patient, ref...' : 'Search medicine name...'}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="form-input !pl-8 !py-1.5 !text-xs !w-56"
              />
            </div>
            {tab === 'orders' && (
              <select
                value={orderStatusFilter}
                onChange={(e) => setOrderStatusFilter(e.target.value)}
                className="form-input !py-1.5 !text-xs !w-auto"
              >
                <option value="All">All Statuses</option>
                <option value="Order Placed">Order Placed</option>
                <option value="Pharmacy Accepted">Pharmacy Accepted</option>
                <option value="Preparing Order">Preparing Order</option>
                <option value="Out for Delivery">Out for Delivery</option>
                <option value="Delivered">Delivered</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            )}
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* TAB 1: ORDERS & DISPENSING QUEUE                          */}
      {/* ========================================================= */}
      {tab === 'orders' && (
        <div className="space-y-4">
          {filteredOrders.length > 0 ? (
            <div className="space-y-4">
              {filteredOrders.map((order) => {
                const isRxUpload = order.orderType === 'Prescription Upload' || Boolean(order.prescriptionFileName)

                return (
                  <div key={order.id} className="card p-5 space-y-4">
                    <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 pb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-bold text-blue-700">{order.id}</span>
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
                            <span className="inline-flex items-center gap-1 rounded bg-blue-50 px-2 py-0.5 text-[9px] font-bold text-blue-700 border border-blue-100">
                              <ShieldCheck size={10} /> Verified Rx: {order.prescriptionId}
                            </span>
                          )}
                          {isRxUpload && (
                            <span className="inline-flex items-center gap-1 rounded bg-indigo-50 px-2 py-0.5 text-[9px] font-bold text-indigo-700 border border-indigo-200">
                              <FileText size={10} /> Uploaded Rx ({order.prescriptionFileType === 'pdf' ? 'PDF' : 'Image'})
                            </span>
                          )}
                          {order.prescriptionVerified ? (
                            <span className="inline-flex items-center gap-1 rounded bg-emerald-50 px-2 py-0.5 text-[9px] font-bold text-emerald-700 border border-emerald-200">
                              <Check size={10} /> Prescription Verified
                            </span>
                          ) : isRxUpload ? (
                            <span className="inline-flex items-center gap-1 rounded bg-amber-50 px-2 py-0.5 text-[9px] font-bold text-amber-800 border border-amber-200 animate-pulse">
                              <Clock3 size={10} /> Rx Verification Pending
                            </span>
                          ) : null}
                        </div>
                        <h3 className="mt-1 text-sm font-bold text-slate-800">
                          Patient: {order.patientName}
                        </h3>
                        <p className="text-[11px] text-slate-500">
                          Phone: {order.patientPhone} · Address: <b>{order.deliveryAddress}</b>
                        </p>
                      </div>

                      <div className="text-right text-xs">
                        <div className="text-sm font-bold text-slate-800">₹{order.totalAmount.toFixed(2)}</div>
                        <div className="text-[10px] text-slate-400">
                          {order.paymentMethod} · <b className="text-emerald-700">{order.paymentStatus}</b>
                        </div>
                        <span className="text-[10px] text-slate-400">{order.orderDate}</span>
                      </div>
                    </div>

                    {/* Uploaded Prescription Strip for Store Inspection */}
                    {isRxUpload && (
                      <div className="rounded-xl border border-indigo-100 bg-indigo-50/50 p-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-600 text-white font-bold text-xs shadow-sm">
                            {order.prescriptionFileType === 'pdf' ? 'PDF' : 'IMG'}
                          </div>
                          <div>
                            <div className="font-bold text-slate-800 flex items-center gap-2">
                              <span>{order.prescriptionFileName}</span>
                              {order.patientNotes && (
                                <span className="text-[11px] font-normal text-slate-500 italic">
                                  · "{order.patientNotes}"
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-slate-500 mt-0.5">
                              Uploaded Prescription Document · {order.prescriptionVerified ? `Verified by ${order.verifiedBy || 'Store Pharmacist'}` : 'Inspect prescription to confirm before preparation'}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => setInspectPrescriptionModalOrder(order)}
                            className="btn btn-secondary !py-1.5 !text-xs font-semibold text-blue-700 flex items-center gap-1.5 shadow-sm"
                          >
                            <Eye size={13} /> Inspect Prescription
                          </button>
                          {order.status === 'Order Placed' && !order.prescriptionVerified && (
                            <button
                              type="button"
                              onClick={() => confirmPrescriptionOrderByStore(order.id, 'Medical store pharmacist verified prescription and confirmed order for home delivery.')}
                              className="btn !bg-emerald-600 hover:!bg-emerald-700 text-white !py-1.5 !text-xs font-bold flex items-center gap-1.5 shadow-sm"
                            >
                              <Check size={14} /> Verify & Confirm Order
                            </button>
                          )}
                        </div>
                      </div>
                    )}

                    {/* Items List */}
                    <div className="rounded-lg bg-slate-50 p-3 text-xs space-y-1.5 border border-slate-100">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                        Prescribed Medicines to Pack
                      </span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                        {order.items.map((it, idx) => (
                          <div key={idx} className="flex items-center justify-between bg-white p-2 rounded border border-slate-100">
                            <div>
                              <b>{it.name}</b> <span className="text-slate-500">({it.dosage})</span>
                            </div>
                            <span className="font-semibold text-slate-700">{it.quantity} pack(s)</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Order Advancement Actions */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                      <div className="text-[11px] text-slate-500">
                        Est. Delivery: <b>{order.estimatedDeliveryTime}</b>
                      </div>

                      <div className="flex items-center gap-2">
                        {order.status === 'Order Placed' && (
                          <>
                            {isRxUpload && !order.prescriptionVerified ? (
                              <button
                                onClick={() => confirmPrescriptionOrderByStore(order.id, 'Medical store verified prescription (image/PDF) and confirmed order for delivery.')}
                                className="btn !bg-emerald-600 hover:!bg-emerald-700 text-white !py-1.5 !text-xs font-bold flex items-center gap-1.5 shadow-sm"
                              >
                                <Check size={14} /> Verify Prescription & Confirm Order
                              </button>
                            ) : (
                              <button
                                onClick={() => updateMedicineOrderStatus(order.id, 'Pharmacy Accepted')}
                                className="btn !bg-emerald-600 hover:!bg-emerald-700 text-white !py-1.5 !text-xs font-semibold flex items-center gap-1"
                              >
                                <Check size={13} /> Accept Order
                              </button>
                            )}
                            <button
                              onClick={() => {
                                const reason = prompt('Reason for cancelling / rejecting this order:', 'Item temporarily unavailable')
                                if (reason) updateMedicineOrderStatus(order.id, 'Cancelled', reason)
                              }}
                              className="btn btn-ghost !py-1.5 !text-xs text-rose-600 hover:bg-rose-50"
                            >
                              Reject Order
                            </button>
                          </>
                        )}

                        {order.status === 'Pharmacy Accepted' && (
                          <button
                            onClick={() => updateMedicineOrderStatus(order.id, 'Preparing Order')}
                            className="btn !bg-blue-600 hover:!bg-blue-700 text-white !py-1.5 !text-xs font-semibold flex items-center gap-1"
                          >
                            <PackageCheck size={13} /> Start Preparing & Packaging
                          </button>
                        )}

                        {order.status === 'Preparing Order' && (
                          <button
                            onClick={() => updateMedicineOrderStatus(order.id, 'Out for Delivery')}
                            className="btn !bg-emerald-600 hover:!bg-emerald-700 text-white !py-1.5 !text-xs font-semibold flex items-center gap-1"
                          >
                            <Truck size={13} /> Dispatch with Courier (Out for Delivery)
                          </button>
                        )}

                        {order.status === 'Out for Delivery' && (
                          <button
                            onClick={() => updateMedicineOrderStatus(order.id, 'Delivered')}
                            className="btn !bg-emerald-700 hover:!bg-emerald-800 text-white !py-1.5 !text-xs font-semibold flex items-center gap-1"
                          >
                            <Check size={13} /> Confirm Delivered
                          </button>
                        )}

                        {order.status === 'Delivered' && (
                          <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1">
                            <Check size={14} /> Completed & Delivered
                          </span>
                        )}

                        {order.status === 'Cancelled' && (
                          <span className="text-xs font-semibold text-rose-600">
                            Order Cancelled
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="card py-16 text-center text-xs text-slate-400">
              No pharmacy orders found matching the filter.
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: INVENTORY & MEDICINE PRICING                      */}
      {/* ========================================================= */}
      {tab === 'inventory' && (
        <div className="card p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-800">Medicine Inventory List</h3>
              <p className="text-[11px] text-slate-400">
                Adjust retail prices, available stock counts, and stock status in real time.
              </p>
            </div>
            <button
              onClick={() => setAddMedOpen(true)}
              className="btn btn-secondary !py-1.5 !text-xs text-emerald-800 font-semibold flex items-center gap-1"
            >
              <Plus size={13} /> Add New Medicine
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="pb-2">Medicine Details</th>
                  <th className="pb-2">Category</th>
                  <th className="pb-2">Rx Status</th>
                  <th className="pb-2">Price (₹)</th>
                  <th className="pb-2">Stock Count</th>
                  <th className="pb-2">Availability</th>
                  <th className="pb-2 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {inventoryList.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-50/50">
                    <td className="py-3">
                      <b className="block text-slate-800">{item.name}</b>
                      <span className="text-[10px] text-slate-400">{item.dosage} · {item.form}</span>
                    </td>
                    <td className="py-3 text-slate-600">{item.category}</td>
                    <td className="py-3">
                      {item.requiresPrescription ? (
                        <span className="rounded bg-blue-50 px-2 py-0.5 text-[9px] font-bold text-blue-700">
                          Rx Required
                        </span>
                      ) : (
                        <span className="rounded bg-slate-100 px-2 py-0.5 text-[9px] font-semibold text-slate-600">
                          OTC
                        </span>
                      )}
                    </td>
                    <td className="py-3 font-semibold text-slate-800">
                      ₹{item.unitPrice.toFixed(2)}
                    </td>
                    <td className="py-3 font-mono">{item.stockCount} units</td>
                    <td className="py-3">
                      {item.inStock ? (
                        <Badge tone="green">In Stock</Badge>
                      ) : (
                        <Badge tone="rose">Out of Stock</Badge>
                      )}
                    </td>
                    <td className="py-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => {
                            const newPrice = prompt(`Update unit price for ${item.name}:`, item.unitPrice)
                            if (newPrice && !isNaN(Number(newPrice))) {
                              updateMedicineInventory(clinicPharmacy.id, item.id, {
                                unitPrice: Number(newPrice),
                              })
                            }
                          }}
                          className="btn btn-secondary !py-1 !px-2 !text-[11px]"
                        >
                          Edit Price
                        </button>
                        <button
                          onClick={() => {
                            updateMedicineInventory(clinicPharmacy.id, item.id, {
                              inStock: !item.inStock,
                              stockCount: !item.inStock ? 50 : 0,
                            })
                          }}
                          className={`btn !py-1 !px-2 !text-[11px] font-semibold ${
                            item.inStock ? 'text-rose-600 hover:bg-rose-50' : 'text-emerald-700 hover:bg-emerald-50'
                          }`}
                        >
                          {item.inStock ? 'Mark Out of Stock' : 'Mark In Stock'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 3: PHARMACY PROFILE & DELIVERY SETTINGS               */}
      {/* ========================================================= */}
      {tab === 'profile' && (
        <div className="card p-6 max-w-2xl">
          <h3 className="text-sm font-bold text-slate-800 mb-1">
            Pharmacy Profile & Delivery Settings
          </h3>
          <p className="text-[11px] text-slate-500 mb-6">
            Configure store contact information, operating schedule, and delivery fees visible to patients in the Medicine Store.
          </p>

          <form onSubmit={handleProfileSave} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Pharmacy Name</label>
              <input
                type="text"
                value={profileName}
                onChange={(e) => setProfileName(e.target.value)}
                className="form-input !text-xs !py-2"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Contact Phone</label>
                <input
                  type="tel"
                  value={profilePhone}
                  onChange={(e) => setProfilePhone(e.target.value)}
                  className="form-input !text-xs !py-2"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Estimated Delivery Time</label>
                <input
                  type="text"
                  value={profileDeliveryTime}
                  onChange={(e) => setProfileDeliveryTime(e.target.value)}
                  placeholder="e.g. 30–45 mins"
                  className="form-input !text-xs !py-2"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Store Address</label>
              <input
                type="text"
                value={profileAddress}
                onChange={(e) => setProfileAddress(e.target.value)}
                className="form-input !text-xs !py-2"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Delivery Charge (₹)</label>
                <input
                  type="number"
                  step="0.5"
                  value={profileDeliveryCharge}
                  onChange={(e) => setProfileDeliveryCharge(e.target.value)}
                  className="form-input !text-xs !py-2"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Free Delivery Threshold (₹)</label>
                <input
                  type="number"
                  step="1"
                  value={profileThreshold}
                  onChange={(e) => setProfileThreshold(e.target.value)}
                  className="form-input !text-xs !py-2"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Minimum Order Amount (₹)</label>
                <input
                  type="number"
                  step="1"
                  value={profileMinOrder}
                  onChange={(e) => setProfileMinOrder(e.target.value)}
                  className="form-input !text-xs !py-2"
                  required
                />
              </div>
            </div>

            <div className="pt-2">
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700">
                <input
                  type="checkbox"
                  checked={profileIsOpen}
                  onChange={(e) => setProfileIsOpen(e.target.checked)}
                  className="accent-emerald-600 rounded"
                />
                <span>Store is Open & Accepting Home Delivery Orders</span>
              </label>
            </div>

            <div className="pt-4 border-t border-slate-100 flex justify-end">
              <button
                type="submit"
                className="btn !bg-emerald-600 hover:!bg-emerald-700 text-white !py-2.5 !px-6 !text-xs font-bold shadow-sm"
              >
                Save Settings
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Modal: Add New Medicine to Inventory */}
      {addMedOpen && (
        <Modal title="Add Medicine to Pharmacy Inventory" onClose={() => setAddMedOpen(false)}>
          <form onSubmit={handleAddMedicineSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Medicine Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Montelukast Sodium, Ciprofloxacin"
                value={newMedName}
                onChange={(e) => setNewMedName(e.target.value)}
                className="form-input !text-xs !py-2"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Dosage / Strength</label>
                <input
                  type="text"
                  placeholder="e.g. 10 mg, 500 mg"
                  value={newMedDosage}
                  onChange={(e) => setNewMedDosage(e.target.value)}
                  className="form-input !text-xs !py-2"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Form</label>
                <select
                  value={newMedForm}
                  onChange={(e) => setNewMedForm(e.target.value)}
                  className="form-input !text-xs !py-2"
                >
                  <option value="Tablet">Tablet</option>
                  <option value="Capsule">Capsule</option>
                  <option value="Nasal Spray">Nasal Spray</option>
                  <option value="Syrup">Syrup</option>
                  <option value="Softgel">Softgel</option>
                  <option value="Kit">Kit / Device</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Category</label>
                <select
                  value={newMedCategory}
                  onChange={(e) => setNewMedCategory(e.target.value)}
                  className="form-input !text-xs !py-2"
                >
                  <option value="Allergy & Respiratory">Allergy & Respiratory</option>
                  <option value="Antibiotics">Antibiotics</option>
                  <option value="Cough & Cold">Cough & Cold</option>
                  <option value="Pain & Fever (OTC)">Pain & Fever (OTC)</option>
                  <option value="Daily Wellness & Vitamins">Daily Wellness & Vitamins</option>
                </select>
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Price (₹)</label>
                <input
                  type="number"
                  step="0.25"
                  value={newMedPrice}
                  onChange={(e) => setNewMedPrice(e.target.value)}
                  className="form-input !text-xs !py-2"
                  required
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Stock Units</label>
                <input
                  type="number"
                  value={newMedStock}
                  onChange={(e) => setNewMedStock(e.target.value)}
                  className="form-input !text-xs !py-2"
                  required
                />
              </div>
            </div>

            <div>
              <label className="flex items-center gap-2 font-semibold text-slate-700">
                <input
                  type="checkbox"
                  checked={newMedRequiresRx}
                  onChange={(e) => setNewMedRequiresRx(e.target.checked)}
                  className="accent-blue-600 rounded"
                />
                <span>Requires Doctor Prescription (Rx Only)</span>
              </label>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Description / Indications</label>
              <textarea
                rows={2}
                placeholder="Clinical usage and instructions..."
                value={newMedDescription}
                onChange={(e) => setNewMedDescription(e.target.value)}
                className="form-input !text-xs !py-2"
              />
            </div>

            <div className="flex justify-end gap-2 border-t border-slate-100 pt-3">
              <button
                type="button"
                onClick={() => setAddMedOpen(false)}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn !bg-emerald-600 hover:!bg-emerald-700 text-white font-semibold"
              >
                Add to Inventory
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Modal: Inspect Uploaded Prescription (Medical Store View) */}
      {inspectPrescriptionModalOrder && (
        <Modal
          title={`Prescription Inspection — Order ${inspectPrescriptionModalOrder.id}`}
          onClose={() => setInspectPrescriptionModalOrder(null)}
          wide
        >
          <div className="space-y-4 text-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-800">
                  {inspectPrescriptionModalOrder.prescriptionFileName}
                </h3>
                <p className="text-[11px] text-slate-500">
                  Uploaded by {inspectPrescriptionModalOrder.patientName} · Phone: {inspectPrescriptionModalOrder.patientPhone}
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  tone={
                    inspectPrescriptionModalOrder.prescriptionVerified
                      ? 'green'
                      : 'blue'
                  }
                >
                  {inspectPrescriptionModalOrder.prescriptionVerified
                    ? 'Prescription Verified'
                    : 'Verification Required'}
                </Badge>
              </div>
            </div>

            {/* Patient & Delivery Info Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 rounded-xl bg-slate-50 p-3 border border-slate-100 text-[11px]">
              <div>
                <span className="text-slate-400 block">Patient Name:</span>
                <b className="text-slate-800">{inspectPrescriptionModalOrder.patientName}</b>
              </div>
              <div>
                <span className="text-slate-400 block">Delivery Address:</span>
                <b className="text-slate-800">{inspectPrescriptionModalOrder.deliveryAddress}</b>
              </div>
              <div>
                <span className="text-slate-400 block">Payment Mode:</span>
                <b className="text-slate-800">{inspectPrescriptionModalOrder.paymentMethod}</b>
              </div>
            </div>

            {inspectPrescriptionModalOrder.patientNotes && (
              <div className="rounded-lg bg-amber-50 p-2.5 text-[11px] text-amber-900 border border-amber-100">
                <b>Patient's Note:</b> "{inspectPrescriptionModalOrder.patientNotes}"
              </div>
            )}

            {/* Visual Prescription Viewer */}
            {inspectPrescriptionModalOrder.prescriptionFileData && inspectPrescriptionModalOrder.prescriptionFileType === 'image' ? (
              <div className="p-3 bg-slate-100 rounded-xl text-center border">
                <img
                  src={inspectPrescriptionModalOrder.prescriptionFileData}
                  alt="Uploaded Prescription"
                  className="max-h-[420px] mx-auto rounded-lg object-contain shadow-md"
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
                    <b className="ml-2 text-slate-800">{inspectPrescriptionModalOrder.patientName}</b>
                  </div>
                  <div>
                    <span className="text-slate-400">Date Issued:</span>
                    <b className="ml-2 text-slate-800">{inspectPrescriptionModalOrder.orderDate}</b>
                  </div>
                  <div>
                    <span className="text-slate-400">Prescribing Physician:</span>
                    <b className="ml-2 text-slate-800">Dr. Maya Patel, MD (Attending Physician)</b>
                  </div>
                  <div>
                    <span className="text-slate-400">Clinical Diagnosis:</span>
                    <b className="ml-2 text-slate-800">Seasonal Allergic Rhinitis & Respiratory Care</b>
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

                <div className="flex items-end justify-between border-t border-slate-100 pt-4">
                  <div className="text-[10px] text-slate-400 space-y-0.5">
                    <div>Document Ref: {inspectPrescriptionModalOrder.prescriptionFileName}</div>
                    <div>File Format: {inspectPrescriptionModalOrder.prescriptionFileType?.toUpperCase() || 'DOCUMENT'}</div>
                    <div>Status: {inspectPrescriptionModalOrder.prescriptionVerified ? 'VERIFIED BY PHARMACIST' : 'PENDING PHARMACIST VERIFICATION'}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-serif italic text-blue-900 font-bold text-sm">Dr. Maya Patel, MD</div>
                    <div className="text-[9px] text-slate-400 border-t border-slate-300 pt-0.5 mt-0.5">Authorized Signature</div>
                  </div>
                </div>
              </div>
            )}

            {/* Modal Actions */}
            <div className="flex items-center justify-between border-t border-slate-100 pt-3">
              <div className="text-[11px] text-slate-500">
                {inspectPrescriptionModalOrder.prescriptionVerified ? (
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <Check size={14} /> Verified on {inspectPrescriptionModalOrder.verifiedAt || 'Today'} by {inspectPrescriptionModalOrder.verifiedBy || 'Store Pharmacist'}
                  </span>
                ) : (
                  <span className="text-amber-800 font-medium">
                    Please inspect medications before approving order for delivery.
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setInspectPrescriptionModalOrder(null)}
                  className="btn btn-secondary !py-1.5 !text-xs font-semibold"
                >
                  Close
                </button>
                {!inspectPrescriptionModalOrder.prescriptionVerified && (
                  <button
                    type="button"
                    onClick={() => {
                      confirmPrescriptionOrderByStore(
                        inspectPrescriptionModalOrder.id,
                        'Prescription inspected and verified by store pharmacist. Order confirmed for packaging and delivery.'
                      )
                      setInspectPrescriptionModalOrder(null)
                    }}
                    className="btn !bg-emerald-600 hover:!bg-emerald-700 text-white !py-1.5 !px-4 !text-xs font-bold flex items-center gap-1.5 shadow-sm"
                  >
                    <Check size={14} /> Verify Prescription & Confirm Order
                  </button>
                )}
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}

// -------------------------------------------------------------
// Website Theme Customization Module
// -------------------------------------------------------------
export function ClinicThemeSettingsPage() {
  const {
    activeClinic,
    currentUser,
    themes,
    previewThemeId,
    setPreviewThemeId,
    setClinicTheme,
    resetClinicTheme,
    setDoctorThemePermission,
    notify,
  } = useStore()

  const [doctorConfirmTheme, setDoctorConfirmTheme] = useState(null)
  const [detailModalTheme, setDetailModalTheme] = useState(null)

  const isClinicAdmin =
    currentUser?.role === 'clinic_admin' ||
    currentUser?.role === 'admin' ||
    !currentUser?.role ||
    currentUser?.title?.toLowerCase().includes('admin')

  const isDoctor = currentUser?.role === 'doctor' && !isClinicAdmin
  const allowDoctorCustomization = activeClinic.allowDoctorThemeCustomization !== false
  const canApply = isClinicAdmin || allowDoctorCustomization

  const currentActiveThemeId = activeClinic.theme || DEFAULT_THEME_ID
  const currentTheme = getThemeById(currentActiveThemeId)

  const handleApplyTheme = (theme) => {
    if (!canApply) {
      notify('Theme customization is restricted to Clinic Administrators.')
      return
    }

    if (isDoctor) {
      // Prompt doctor with the shared clinic explanation
      setDoctorConfirmTheme(theme)
    } else {
      setClinicTheme(activeClinic.id, theme.id)
    }
  }

  return (
    <div className="content-wrap space-y-6">
      {/* Page Heading with Reset Action */}
      <PageHeading
        eyebrow="Workspace Appearance & Branding"
        title="Theme Customization"
        description="Select and apply a professionally designed healthcare theme for your clinic. Changes update the visual appearance across the Clinic Admin, Doctor, Receptionist, and Patient modules."
        action={
          <div className="flex flex-wrap items-center gap-2">
            {previewThemeId && (
              <button
                type="button"
                onClick={() => setPreviewThemeId(null)}
                className="btn btn-secondary !py-2 !text-xs font-semibold"
              >
                Exit Live Preview
              </button>
            )}
            <button
              type="button"
              onClick={() => resetClinicTheme(activeClinic.id)}
              className="btn btn-secondary !py-2 !text-xs font-semibold text-slate-700 hover:text-blue-600 flex items-center gap-1.5"
              title="Reset this clinic to the default Medical Blue theme"
            >
              <RefreshCw size={14} /> Reset to Default Theme
            </button>
          </div>
        }
      />

      {/* Clinic Workspace & Permission Banner */}
      <div className="card p-5 border-l-4 border-l-blue-600 bg-gradient-to-r from-white to-slate-50/50">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-100 text-blue-700">
                <Palette size={14} />
              </span>
              <h2 className="text-sm font-bold text-slate-800">
                Active Workspace: <span className="text-blue-600">{activeClinic.name}</span>
              </h2>
              <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10px] font-bold text-emerald-800">
                Current Theme: {currentTheme.name}
              </span>
            </div>
            <p className="mt-1.5 text-xs text-slate-500 max-w-2xl">
              Themes are stored separately per clinic and automatically restored upon login and page refresh.
              Other clinics on ClinicOS and the SaaS Super Admin platform remain completely isolated.
            </p>
          </div>

          {/* Clinic Admin: Doctor Customization Permission Toggle */}
          {isClinicAdmin && (
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-white p-3 shadow-sm">
              <div>
                <div className="text-xs font-semibold text-slate-700">Doctor Customization</div>
                <div className="text-[10px] text-slate-400">Allow doctors to apply themes</div>
              </div>
              <button
                type="button"
                onClick={() => setDoctorThemePermission(activeClinic.id, !allowDoctorCustomization)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${
                  allowDoctorCustomization ? 'bg-blue-600' : 'bg-slate-300'
                }`}
                aria-label="Toggle doctor theme customization permission"
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    allowDoctorCustomization ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          )}
        </div>

        {/* Doctor Notice Banner */}
        {isDoctor && (
          <div className="mt-4 rounded-lg bg-amber-50/90 border border-amber-200 p-3 text-xs text-amber-900 flex items-start gap-2.5">
            <AlertTriangle size={16} className="text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Attending Physician Notice:</span>{' '}
              {allowDoctorCustomization ? (
                <span>
                  You have authorized doctor access to customize this clinic's workspace theme. Any theme you apply will be
                  shared across the entire clinic for all doctors, front-desk receptionists, and patients.
                </span>
              ) : (
                <span>
                  Theme customization has been restricted to Clinic Administrators by clinic policy. You can preview all
                  themes below, but permanent theme changes must be made by a Clinic Administrator.
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Live Preview Mode Active Banner */}
      {previewThemeId && (
        <div className="card p-4 bg-amber-500/10 border-amber-300 flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-medium text-amber-900">
            <Eye size={16} className="text-amber-700" />
            <span>
              Now Previewing: <strong>{getThemeById(previewThemeId).name}</strong>. The entire interface is currently showing this theme.
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => handleApplyTheme(getThemeById(previewThemeId))}
              disabled={!canApply}
              className="btn btn-primary !py-1.5 !px-3 !text-xs font-bold"
            >
              Apply This Theme
            </button>
            <button
              type="button"
              onClick={() => setPreviewThemeId(null)}
              className="btn btn-secondary !py-1.5 !px-3 !text-xs"
            >
              Exit Preview
            </button>
          </div>
        </div>
      )}

      {/* Available Themes Section */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-800">Available Clinic Themes</h3>
            <p className="text-xs text-slate-400">Choose from six professionally designed clinical palettes.</p>
          </div>
          <span className="text-xs font-semibold text-slate-500">{themes.length} Themes Available</span>
        </div>

        {/* 6 Theme Preview Cards Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {themes.map((theme) => {
            const isActive = currentActiveThemeId === theme.id
            const isPreviewing = previewThemeId === theme.id

            return (
              <div
                key={theme.id}
                className={`card relative flex flex-col overflow-hidden transition-all duration-200 ${
                  isActive
                    ? 'ring-2 ring-blue-600 shadow-md border-blue-200'
                    : isPreviewing
                    ? 'ring-2 ring-amber-500 shadow-md'
                    : 'hover:shadow-md hover:border-slate-300'
                }`}
              >
                {/* Active or Preview Badge */}
                {isActive && (
                  <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-blue-600 px-2.5 py-0.5 text-[10px] font-bold text-white shadow-sm">
                    <Check size={11} strokeWidth={3} /> Active Theme
                  </span>
                )}
                {isPreviewing && !isActive && (
                  <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-amber-500 px-2.5 py-0.5 text-[10px] font-bold text-white shadow-sm">
                    <Eye size={11} /> Previewing
                  </span>
                )}

                {/* Theme Header */}
                <div className="p-5 pb-4">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                    {theme.category}
                  </div>
                  <h4 className="text-base font-bold text-slate-800 flex items-center gap-2">
                    {theme.name}
                    {theme.isDark && <Moon size={13} className="text-slate-400" />}
                  </h4>
                  <p className="mt-1 text-xs text-slate-500 min-h-[36px]">{theme.tagline}</p>
                </div>

                {/* Color Palette Indicators */}
                <div className="px-5 py-3 border-y border-slate-100 bg-slate-50/60">
                  <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2">
                    Color Palette Tokens
                  </div>
                  <div className="flex items-center gap-2">
                    {theme.swatches.map((swatch, idx) => (
                      <div key={idx} className="group relative flex-1 text-center">
                        <div
                          className="h-7 w-full rounded-md shadow-inner border border-black/10 transition-transform group-hover:scale-105"
                          style={{ backgroundColor: swatch.hex }}
                          title={`${swatch.label} (${swatch.hex})`}
                        />
                        <span className="block mt-1 text-[9px] font-mono text-slate-400 truncate">
                          {swatch.hex}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Interactive Sample Component Preview Sandbox */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-2.5">
                      Sample Dashboard Components
                    </div>
                    <div
                      className="rounded-xl border p-3.5 space-y-3"
                      style={{
                        backgroundColor: theme.colors.background,
                        borderColor: theme.colors.cardBorder,
                      }}
                    >
                      {/* Mini Topbar and Nav Item */}
                      <div
                        className="rounded-lg p-2 flex items-center justify-between border"
                        style={{
                          backgroundColor: theme.colors.cardBg,
                          borderColor: theme.colors.cardBorder,
                        }}
                      >
                        <div className="flex items-center gap-1.5">
                          <span
                            className="h-2 w-2 rounded-full"
                            style={{ backgroundColor: theme.colors.primary }}
                          />
                          <span
                            className="text-[11px] font-bold"
                            style={{ color: theme.colors.textMain }}
                          >
                            ClinicOS · Dashboard
                          </span>
                        </div>
                        <span
                          className="rounded px-1.5 py-0.5 text-[9px] font-bold"
                          style={{
                            backgroundColor: theme.colors.primaryLight,
                            color: theme.colors.primary,
                          }}
                        >
                          Active
                        </span>
                      </div>

                      {/* Mini Stat Card */}
                      <div
                        className="rounded-lg p-2.5 border flex items-center justify-between"
                        style={{
                          backgroundColor: theme.colors.cardBg,
                          borderColor: theme.colors.cardBorder,
                        }}
                      >
                        <div>
                          <span
                            className="text-[10px] block"
                            style={{ color: theme.colors.textMuted }}
                          >
                            Patients Today
                          </span>
                          <span
                            className="text-sm font-bold block mt-0.5"
                            style={{ color: theme.colors.textMain }}
                          >
                            48 Visits
                          </span>
                        </div>
                        <div
                          className="h-7 w-7 rounded-lg flex items-center justify-center font-bold text-xs"
                          style={{
                            backgroundColor: theme.colors.primaryLight,
                            color: theme.colors.primary,
                          }}
                        >
                          +12%
                        </div>
                      </div>

                      {/* Mini Button Samples */}
                      <div className="flex items-center gap-2 pt-1">
                        <span
                          className="flex-1 rounded-md py-1 px-2 text-center text-[10px] font-bold shadow-sm"
                          style={{
                            backgroundColor: theme.colors.primary,
                            color: theme.isDark ? '#0b0f19' : '#ffffff',
                          }}
                        >
                          Primary
                        </span>
                        <span
                          className="flex-1 rounded-md py-1 px-2 text-center text-[10px] font-medium border"
                          style={{
                            backgroundColor: theme.colors.cardBg,
                            borderColor: theme.colors.cardBorder,
                            color: theme.colors.textMain,
                          }}
                        >
                          Secondary
                        </span>
                        <span
                          className="text-[10px] font-semibold px-1"
                          style={{ color: theme.colors.primary }}
                        >
                          Ghost
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Theme Actions */}
                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => setPreviewThemeId(theme.id)}
                      className="btn btn-secondary !py-2 !px-3 !text-xs font-semibold flex items-center gap-1 text-slate-700 hover:text-blue-600"
                    >
                      <Eye size={13} /> {isPreviewing ? 'Preview Active' : 'Live Preview'}
                    </button>

                    {isActive ? (
                      <button
                        type="button"
                        disabled
                        className="btn !bg-emerald-50 !text-emerald-700 !border-emerald-200 !py-2 !px-4 !text-xs font-bold cursor-default flex items-center gap-1"
                      >
                        <Check size={13} strokeWidth={3} /> Currently Active
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleApplyTheme(theme)}
                        disabled={!canApply}
                        className={`btn btn-primary !py-2 !px-4 !text-xs font-bold ${
                          !canApply ? '!opacity-50 !cursor-not-allowed' : ''
                        }`}
                        title={
                          !canApply
                            ? 'Admin permission required to change clinic theme'
                            : `Apply ${theme.name} theme to ${activeClinic.name}`
                        }
                      >
                        {canApply ? 'Apply Theme' : 'Admin Required'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Multi-Tenant Scope & System Assurance Card */}
      <div className="card p-5 bg-slate-50/80 border-slate-200 text-xs text-slate-600 space-y-2">
        <div className="font-bold text-slate-800 text-sm flex items-center gap-2">
          <ShieldCheck size={17} className="text-emerald-600" />
          Enterprise Healthcare Multi-Tenant Theme Isolation
        </div>
        <p className="leading-relaxed">
          Theme customization in ClinicOS operates strictly on a per-clinic basis. Applying a theme to{' '}
          <strong>{activeClinic.name}</strong> instantly cascades across all associated views:
          <span className="font-semibold text-slate-700"> Clinic Admin, Doctor, Receptionist Front Desk, and Patient Portal</span>.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-[11px]">
          <div className="rounded-lg bg-white p-3 border border-slate-200">
            <span className="font-bold text-slate-800 block">SaaS Platform Isolation</span>
            <span className="text-slate-500">Super Admin dashboards retain their independent platform theme.</span>
          </div>
          <div className="rounded-lg bg-white p-3 border border-slate-200">
            <span className="font-bold text-slate-800 block">Persistence Across Logins</span>
            <span className="text-slate-500">Clinic themes persist in localStorage and reload automatically after refresh.</span>
          </div>
          <div className="rounded-lg bg-white p-3 border border-slate-200">
            <span className="font-bold text-slate-800 block">Clinical Contrast & Legibility</span>
            <span className="text-slate-500">Each theme adheres to WCAG accessibility and medical record clarity guidelines.</span>
          </div>
        </div>
      </div>

      {/* Doctor Shared Clinic Theme Confirmation Modal */}
      {doctorConfirmTheme && (
        <Modal
          title="Confirm Shared Clinic Theme Change"
          onClose={() => setDoctorConfirmTheme(null)}
        >
          <div className="space-y-4 text-xs">
            <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 text-amber-900 flex items-start gap-3">
              <AlertTriangle size={20} className="text-amber-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-sm">Notice for Attending Physicians</h4>
                <p className="mt-1 leading-relaxed">
                  You are about to apply the <strong>{doctorConfirmTheme.name}</strong> theme to{' '}
                  <strong>{activeClinic.name}</strong>.
                </p>
                <p className="mt-1.5 font-medium text-amber-800">
                  Because this clinic shares a unified visual workspace, this theme change will update the appearance
                  for <strong>all doctors, front-desk receptionists, and registered patients</strong> belonging to {activeClinic.name}.
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <div className="text-[11px] font-bold text-slate-700 mb-2">New Theme Highlights:</div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div
                    className="h-4 w-4 rounded-full shadow-sm"
                    style={{ backgroundColor: doctorConfirmTheme.colors.primary }}
                  />
                  <span className="font-semibold text-slate-800">{doctorConfirmTheme.name}</span>
                </div>
                <span className="text-slate-400">·</span>
                <span className="text-slate-500">{doctorConfirmTheme.tagline}</span>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setDoctorConfirmTheme(null)}
                className="btn btn-secondary !py-2 !px-4 text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setClinicTheme(activeClinic.id, doctorConfirmTheme.id)
                  setDoctorConfirmTheme(null)
                }}
                className="btn btn-primary !py-2 !px-4 text-xs font-bold"
              >
                Confirm & Apply for Entire Clinic
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}


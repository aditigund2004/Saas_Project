import React, { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import {
  Calendar,
  Clock,
  User,
  CheckCircle2,
  AlertTriangle,
  Building2,
  Stethoscope,
  ArrowRight,
  MessageSquare
} from 'lucide-react';

export function ReceptionNewAppointmentPage() {
  const navigate = useNavigate();
  const {
    activeClinic = {},
    activeBranch = {},
    doctors = [],
    patients = [],
    appointments = [],
    createAppointment,
    openWhatsAppModal,
    showToast
  } = useApp();

  const [searchParams] = useSearchParams();
  const preselectedId = searchParams.get('patientId');

  const [step, setStep] = useState(1);
  const [patientMode, setPatientMode] = useState('existing'); // 'existing' | 'new'

  // Form Fields
  const [selectedPatientId, setSelectedPatientId] = useState(() => {
    if (preselectedId) {
      const match = patients.find((p) => p.id === preselectedId || p.patientIdNumber === preselectedId);
      if (match) return match.id;
    }
    return patients[0]?.id || '';
  });
  const [newPatientName, setNewPatientName] = useState('');
  const [newPatientPhone, setNewPatientPhone] = useState('');

  const clinicDoctors = doctors.filter((d) => d.clinicId === activeClinic?.id);
  const [selectedDoctorId, setSelectedDoctorId] = useState(clinicDoctors[0]?.id || '');
  const [selectedServiceId, setSelectedServiceId] = useState(activeClinic?.services?.[0]?.id || '');
  const [appointmentDate, setAppointmentDate] = useState('2026-10-24');
  const [appointmentTime, setAppointmentTime] = useState('11:30 AM');
  const [notes, setNotes] = useState('');
  const [bookedApt, setBookedApt] = useState(null);

  const currentDoctor = clinicDoctors.find((d) => d.id === selectedDoctorId) || clinicDoctors[0];
  const currentService = activeClinic?.services?.find((s) => s.id === selectedServiceId) || activeClinic?.services?.[0];
  const existingPatient = patients.find((p) => p.id === selectedPatientId) || patients[0];

  const conflictAppointment = appointments.find(
    (a) =>
      a.doctorId === currentDoctor?.id &&
      a.date === appointmentDate &&
      a.time === appointmentTime &&
      !['Cancelled', 'No-show'].includes(a.status)
  );

  const handleBooking = (e) => {
    e.preventDefault();
    if (!currentDoctor) {
      showToast('Please select a valid doctor.', 'error');
      return;
    }
    if (conflictAppointment) {
      showToast(`Conflict: Dr. ${currentDoctor.name} is already booked at ${appointmentTime} on ${appointmentDate}.`, 'error');
      return;
    }

    const patientName = patientMode === 'existing' ? existingPatient?.name : newPatientName;
    const patientPhone = patientMode === 'existing' ? existingPatient?.phone : newPatientPhone;
    const patientId = patientMode === 'existing' ? existingPatient?.patientIdNumber : `PT-${Math.floor(1060 + Math.random() * 400)}`;

    const newApt = createAppointment({
      clinicId: activeClinic?.id,
      branchId: activeBranch?.id,
      doctorId: currentDoctor.id,
      doctorName: currentDoctor.name,
      patientId,
      patientName,
      patientPhone,
      patientEmail: 'patient@demo.io',
      serviceId: currentService?.id,
      serviceName: currentService?.name,
      date: appointmentDate,
      time: appointmentTime,
      status: 'Confirmed',
      notes
    });

    setBookedApt(newApt);
    setStep(3); // Result confirmation
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="pb-2 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2">
          <Link to="/reception/appointments" className="text-xs text-blue-600 dark:text-blue-400 hover:underline font-semibold">
            ← Appointments List
          </Link>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Reception Desk</span>
        </div>
        <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight mt-1">Book New Appointment</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Fast front desk reservation with real-time schedule conflict guard.</p>
      </div>

      {step === 1 && (
        <Card className="p-6 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Step 1: Patient Selection</h2>
            <div className="flex items-center rounded-xl bg-slate-100 dark:bg-slate-800 p-1 text-xs">
              <button
                type="button"
                onClick={() => setPatientMode('existing')}
                className={`px-3 py-1.5 rounded-lg font-semibold cursor-pointer transition-all ${
                  patientMode === 'existing' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                Existing Patient
              </button>
              <button
                type="button"
                onClick={() => setPatientMode('new')}
                className={`px-3 py-1.5 rounded-lg font-semibold cursor-pointer transition-all ${
                  patientMode === 'new' ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs' : 'text-slate-500 dark:text-slate-400'
                }`}
              >
                New Patient
              </button>
            </div>
          </div>

          {patientMode === 'existing' ? (
            <div className="space-y-2 text-sm">
              <label className="block font-semibold text-slate-700 dark:text-slate-300">Choose Patient from Directory</label>
              <select
                value={selectedPatientId}
                onChange={(e) => setSelectedPatientId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 font-medium"
              >
                {patients.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} ({p.patientIdNumber}) · {p.phone}
                  </option>
                ))}
              </select>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Full Name *</label>
                <input
                  required
                  type="text"
                  value={newPatientName}
                  onChange={(e) => setNewPatientName(e.target.value)}
                  placeholder="Patient Name"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Mobile / WhatsApp *</label>
                <input
                  required
                  type="tel"
                  value={newPatientPhone}
                  onChange={(e) => setNewPatientPhone(e.target.value)}
                  placeholder="+91 98000 00000"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm"
                />
              </div>
            </div>
          )}

          <div className="pt-2 flex justify-end">
            <Button variant="primary" size="md" onClick={() => setStep(2)}>
              Proceed to Slot & Doctor <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </div>
        </Card>
      )}

      {step === 2 && (
        <Card className="p-6 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-5">
          <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Step 2: Doctor, Service & Slot Details</h2>
          </div>

          <form onSubmit={handleBooking} className="space-y-4 text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Doctor *</label>
                <select
                  value={selectedDoctorId}
                  onChange={(e) => setSelectedDoctorId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-medium"
                >
                  {clinicDoctors.map((d) => (
                    <option key={d.id} value={d.id}>{d.name} ({d.specialty})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Service / Procedure *</label>
                <select
                  value={selectedServiceId}
                  onChange={(e) => setSelectedServiceId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-medium"
                >
                  {activeClinic?.services?.map((s) => (
                    <option key={s.id} value={s.id}>{s.name} (₹{s.fee})</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Appointment Date *</label>
                <input
                  type="date"
                  value={appointmentDate}
                  onChange={(e) => setAppointmentDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Time Slot *</label>
                <select
                  value={appointmentTime}
                  onChange={(e) => setAppointmentTime(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm font-medium"
                >
                  {['09:30 AM', '10:30 AM', '11:30 AM', '02:00 PM', '03:30 PM', '04:30 PM', '05:30 PM'].map((t) => {
                    const isBooked = appointments.some(
                      (a) =>
                        a.doctorId === currentDoctor?.id &&
                        a.date === appointmentDate &&
                        a.time === t &&
                        !['Cancelled', 'No-show'].includes(a.status)
                    );
                    return (
                      <option key={t} value={t} disabled={isBooked}>
                        {t} {isBooked ? '— Booked (Unavailable)' : ''}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            {/* Schedule Conflict Alert */}
            {conflictAppointment && (
              <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-900 text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
                <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-sm">Schedule Conflict Detected</p>
                  <p className="text-xs text-amber-800 dark:text-amber-300 mt-0.5">
                    Dr. {currentDoctor?.name} is already booked at {appointmentTime} on {appointmentDate} for patient {conflictAppointment.patientName}. Please select an open time slot.
                  </p>
                </div>
              </div>
            )}

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Visit Reason / Clinical Note</label>
              <textarea
                rows={2}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Optional visit note..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm"
              />
            </div>

            <div className="pt-3 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
              <Button variant="outline" size="sm" onClick={() => setStep(1)}>
                ← Back
              </Button>
              <Button variant="primary" size="md" type="submit" disabled={Boolean(conflictAppointment)}>
                {conflictAppointment ? 'Slot Unavailable' : 'Confirm & Schedule Appointment'}
              </Button>
            </div>
          </form>
        </Card>
      )}

      {step === 3 && bookedApt && (
        <Card className="p-8 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-center space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-9 h-9" />
          </div>
          <h2 className="text-2xl font-black text-slate-900 dark:text-white">Appointment Confirmed!</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Reference code <strong className="font-mono text-slate-800 dark:text-slate-200 font-bold">{bookedApt.referenceNumber}</strong> created on {activeBranch?.name}.
          </p>

          <div className="pt-2">
            <Button
              variant="whatsapp"
              size="sm"
              icon={MessageSquare}
              onClick={() =>
                openWhatsAppModal({
                  patient_name: bookedApt.patientName,
                  clinic_name: activeClinic?.name || 'Clinic',
                  appointment_date: bookedApt.date,
                  appointment_time: bookedApt.time,
                  doctor_name: bookedApt.doctorName,
                  appointment_reference: bookedApt.referenceNumber,
                  clinic_phone: activeClinic?.phone || ''
                })
              }
            >
              Preview WhatsApp Confirmation
            </Button>
          </div>

          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-center gap-3">
            <Button variant="outline" size="sm" onClick={() => setStep(1)}>
              Book Another
            </Button>
            <Link to="/reception/appointments">
              <Button variant="primary" size="sm">
                View in Schedule
              </Button>
            </Link>
          </div>
        </Card>
      )}
    </div>
  );
}

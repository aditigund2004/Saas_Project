import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  CheckCircle2,
  Building2,
  Stethoscope,
  ArrowRight,
  ShieldCheck,
  MessageSquare,
  AlertCircle
} from 'lucide-react';

export function GuestBookingPage() {
  const [searchParams] = useSearchParams();
  const { clinics, doctors, appointments, createAppointment, openWhatsAppModal, showToast } = useApp();

  const initialClinicId = searchParams.get('clinic') || clinics[0].id;
  const initialDoctorId = searchParams.get('doctor') || '';
  const initialServiceId = searchParams.get('service') || '';

  const [step, setStep] = useState(1);
  const [selectedClinicId, setSelectedClinicId] = useState(initialClinicId);
  const [selectedBranchId, setSelectedBranchId] = useState('');
  const [selectedServiceId, setSelectedServiceId] = useState(initialServiceId);
  const [selectedDoctorId, setSelectedDoctorId] = useState(initialDoctorId);
  const [appointmentDate, setAppointmentDate] = useState('2026-10-24');
  const [appointmentTime, setAppointmentTime] = useState('10:30 AM');
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [completedAppointment, setCompletedAppointment] = useState(null);

  const selectedClinic = clinics.find((c) => c.id === selectedClinicId) || clinics[0];
  const availableBranches = selectedClinic.branches;
  const currentBranch = availableBranches.find((b) => b.id === selectedBranchId) || availableBranches[0];

  const availableDoctors = doctors.filter((d) => d.clinicId === selectedClinic.id);
  const currentDoctor = availableDoctors.find((d) => d.id === selectedDoctorId) || availableDoctors[0];

  const availableServices = selectedClinic.services;
  const currentService = availableServices.find((s) => s.id === selectedServiceId) || availableServices[0];

  const timeSlots = [
    '09:30 AM',
    '10:30 AM',
    '11:30 AM',
    '02:00 PM',
    '03:30 PM',
    '04:30 PM',
    '05:30 PM'
  ];

  const isSlotBooked = (time) => {
    return appointments.some(
      (a) =>
        a.doctorId === currentDoctor?.id &&
        a.date === appointmentDate &&
        a.time === time &&
        !['Cancelled', 'No-show'].includes(a.status)
    );
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (isSlotBooked(appointmentTime)) {
      showToast(`Conflict: ${appointmentTime} on ${appointmentDate} has already been reserved. Please choose another time.`, 'error');
      setStep(3);
      return;
    }

    const newApt = createAppointment({
      clinicId: selectedClinic.id,
      branchId: currentBranch.id,
      doctorId: currentDoctor.id,
      doctorName: currentDoctor.name,
      patientId: `pt-guest-${Date.now().toString().slice(-4)}`,
      patientName,
      patientPhone,
      patientEmail,
      serviceId: currentService.id,
      serviceName: currentService.name,
      date: appointmentDate,
      time: appointmentTime,
      status: 'Requested',
      notes,
      isWalkIn: false
    });

    if (!newApt) return;
    setCompletedAppointment(newApt);
    setStep(5);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Online Patient Portal</span>
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
          Book an Appointment
        </h1>
        <p className="text-xs text-slate-500">
          Guest booking available. No account creation required.
        </p>
      </div>

      {/* Progress Steps Indicator */}
      <div className="flex items-center justify-between max-w-xl mx-auto text-xs font-medium">
        {[
          { num: 1, label: 'Clinic' },
          { num: 2, label: 'Service' },
          { num: 3, label: 'Doctor & Slot' },
          { num: 4, label: 'Your Details' }
        ].map((s) => (
          <div key={s.num} className="flex items-center gap-2">
            <span
              className={`w-7 h-7 rounded-full flex items-center justify-center font-bold text-xs ${
                step >= s.num ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-500'
              }`}
            >
              {s.num}
            </span>
            <span className={`hidden sm:inline ${step >= s.num ? 'text-slate-900 font-semibold' : 'text-slate-400'}`}>
              {s.label}
            </span>
          </div>
        ))}
      </div>

      {/* Step 1: Select Clinic and Branch */}
      {step === 1 && (
        <Card className="p-6 sm:p-8 border-slate-200 space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-slate-900">1. Select Clinic & Location</h2>
            <p className="text-xs text-slate-500">Choose the specialty clinic you would like to visit.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {clinics.map((c) => (
              <div
                key={c.id}
                onClick={() => {
                  setSelectedClinicId(c.id);
                  setSelectedBranchId(c.branches[0].id);
                }}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  selectedClinicId === c.id
                    ? 'border-blue-600 bg-blue-50/50 shadow-xs ring-1 ring-blue-500'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">{c.name}</h3>
                  <Badge variant="Active">{c.specialty}</Badge>
                </div>
                <p className="text-xs text-slate-500 mt-1">{c.city} · {c.address}</p>
                <p className="text-[11px] text-blue-700 font-medium mt-2">{c.operatingHours}</p>
              </div>
            ))}
          </div>

          {/* Branch Picker */}
          {availableBranches.length > 1 && (
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <label className="block text-xs font-semibold text-slate-700">Choose Branch Location</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {availableBranches.map((b) => (
                  <button
                    key={b.id}
                    type="button"
                    onClick={() => setSelectedBranchId(b.id)}
                    className={`p-3 rounded-xl border text-left text-xs transition-all cursor-pointer ${
                      currentBranch.id === b.id
                        ? 'border-blue-600 bg-blue-50 text-blue-900 font-semibold'
                        : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="font-bold">{b.name}</div>
                    <div className="text-[10px] text-slate-500">{b.address}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="pt-4 flex justify-end">
            <Button variant="primary" size="md" onClick={() => setStep(2)}>
              Continue to Services <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </Card>
      )}

      {/* Step 2: Select Service */}
      {step === 2 && (
        <Card className="p-6 sm:p-8 border-slate-200 space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-slate-900">2. Select Consultation or Procedure</h2>
            <p className="text-xs text-slate-500">Pick from {selectedClinic.name}’s service catalog.</p>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {availableServices.map((srv) => (
              <div
                key={srv.id}
                onClick={() => setSelectedServiceId(srv.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  (selectedServiceId || availableServices[0].id) === srv.id
                    ? 'border-blue-600 bg-blue-50/50 shadow-xs ring-1 ring-blue-500'
                    : 'border-slate-200 hover:bg-slate-50'
                }`}
              >
                <div>
                  <h3 className="text-sm font-bold text-slate-900">{srv.name}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">{srv.description}</p>
                  <p className="text-[11px] text-slate-400 mt-1">Duration: {srv.durationMinutes} minutes</p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-base font-bold text-slate-900">
                    ₹{srv.fee.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-4 flex items-center justify-between">
            <Button variant="outline" size="md" onClick={() => setStep(1)}>
              ← Back
            </Button>
            <Button variant="primary" size="md" onClick={() => setStep(3)}>
              Continue to Doctor & Slot <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </Card>
      )}

      {/* Step 3: Select Doctor and Slot */}
      {step === 3 && (
        <Card className="p-6 sm:p-8 border-slate-200 space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-slate-900">3. Select Doctor & Schedule Slot</h2>
            <p className="text-xs text-slate-500">Pick an available specialist and consultation time.</p>
          </div>

          {/* Doctors */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-slate-700">Choose Doctor</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {availableDoctors.map((doc) => (
                <div
                  key={doc.id}
                  onClick={() => setSelectedDoctorId(doc.id)}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center gap-3 ${
                    (selectedDoctorId || availableDoctors[0].id) === doc.id
                      ? 'border-blue-600 bg-blue-50/50 shadow-xs ring-1 ring-blue-500'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <img
                    src={doc.avatar}
                    alt={doc.name}
                    className="w-12 h-12 rounded-xl object-cover border border-slate-200"
                  />
                  <div>
                    <h3 className="text-xs font-bold text-slate-900">{doc.name}</h3>
                    <p className="text-[11px] text-blue-700 font-medium">{doc.specialty}</p>
                    <p className="text-[10px] text-slate-500">Fee: ₹{doc.consultationFee.toLocaleString('en-IN')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Date and Times */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Appointment Date</label>
              <input
                type="date"
                min="2026-10-23"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Select Time Slot</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {timeSlots.map((time) => {
                  const booked = isSlotBooked(time);
                  return (
                    <button
                      key={time}
                      type="button"
                      disabled={booked}
                      onClick={() => !booked && setAppointmentTime(time)}
                      className={`py-2 px-1 rounded-xl text-xs font-semibold text-center border transition-all ${
                        booked
                          ? 'bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed line-through'
                          : appointmentTime === time
                          ? 'bg-blue-600 text-white border-blue-600 shadow-xs cursor-pointer'
                          : 'border-slate-200 hover:bg-slate-50 text-slate-700 cursor-pointer'
                      }`}
                    >
                      {time} {booked ? '(Booked)' : ''}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between">
            <Button variant="outline" size="md" onClick={() => setStep(2)}>
              ← Back
            </Button>
            <Button
              variant="primary"
              size="md"
              disabled={isSlotBooked(appointmentTime)}
              onClick={() => {
                if (isSlotBooked(appointmentTime)) {
                  showToast('Selected time slot is already booked. Please choose an open slot.', 'error');
                  return;
                }
                setStep(4);
              }}
            >
              Enter Contact Details <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </div>
        </Card>
      )}

      {/* Step 4: Patient Details */}
      {step === 4 && (
        <Card className="p-6 sm:p-8 border-slate-200 space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-slate-900">4. Patient Information</h2>
            <p className="text-xs text-slate-500">We will send appointment confirmation and WhatsApp notifications to this number.</p>
          </div>

          <form onSubmit={handleBookingSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name *</label>
                <input
                  required
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  placeholder="e.g. Aarav Patel"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Phone Number (with WhatsApp) *</label>
                <input
                  required
                  type="tel"
                  value={patientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address (Optional)</label>
                <input
                  type="email"
                  value={patientEmail}
                  onChange={(e) => setPatientEmail(e.target.value)}
                  placeholder="patient@example.demo"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1">Symptoms or Notes for the Doctor</label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Briefly describe your symptoms or reason for visit..."
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>
            </div>

            {/* Booking Summary Box */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-500">Clinic:</span>
                <span className="font-semibold text-slate-900">{selectedClinic.name} ({currentBranch.name})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Doctor:</span>
                <span className="font-semibold text-slate-900">{currentDoctor.name} ({currentDoctor.specialty})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Service:</span>
                <span className="font-semibold text-slate-900">{currentService.name} (₹{currentService.fee})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Scheduled:</span>
                <span className="font-semibold text-blue-700">{appointmentDate} at {appointmentTime}</span>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <Button variant="outline" size="md" onClick={() => setStep(3)}>
                ← Back
              </Button>
              <Button variant="primary" size="md" type="submit">
                Confirm Guest Booking <CheckCircle2 className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Step 5: Booking Confirmation Success */}
      {step === 5 && completedAppointment && (
        <Card className="p-8 sm:p-10 border-slate-200 text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider">
              Booking Requested Successfully
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
              You’re All Set, {patientName.split(' ')[0]}!
            </h2>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Your appointment request has been submitted to {selectedClinic.name}. The front desk has allocated reference number:
            </p>
            <div className="inline-block px-4 py-1.5 bg-slate-100 text-slate-800 rounded-xl font-mono font-bold text-sm border border-slate-200">
              {completedAppointment.referenceNumber}
            </div>
          </div>

          {/* Details breakdown */}
          <div className="max-w-md mx-auto p-4 rounded-2xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2">
            <div className="flex justify-between">
              <span className="text-slate-500">Doctor:</span>
              <span className="font-semibold text-slate-900">{currentDoctor.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Service:</span>
              <span className="font-semibold text-slate-900">{currentService.name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Date & Time:</span>
              <span className="font-semibold text-blue-700">{appointmentDate} at {appointmentTime}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Location:</span>
              <span className="font-semibold text-slate-900">{currentBranch.name}, {selectedClinic.city}</span>
            </div>
          </div>

          {/* WhatsApp Simulator Button */}
          <div className="pt-2">
            <Button
              variant="whatsapp"
              size="md"
              icon={MessageSquare}
              onClick={() =>
                openWhatsAppModal({
                  patient_name: patientName,
                  clinic_name: selectedClinic.name,
                  appointment_date: appointmentDate,
                  appointment_time: appointmentTime,
                  doctor_name: currentDoctor.name,
                  appointment_reference: completedAppointment.referenceNumber,
                  clinic_phone: selectedClinic.phone
                })
              }
            >
              Preview WhatsApp Confirmation Message
            </Button>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-center gap-4">
            <Link to="/patient/dashboard">
              <Button variant="outline" size="sm">
                View in Patient Portal
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setStep(1);
                setPatientName('');
                setPatientPhone('');
                setCompletedAppointment(null);
              }}
            >
              Book Another Visit
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}


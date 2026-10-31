import React, { useState } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Shield,
  MessageSquare,
  AlertCircle,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { getDefaultWebsiteSettings } from '../website-builder/websiteBuilderDefaults';

export function ClinicPublicBookingPage() {
  const { clinicSlug } = useParams();
  const [searchParams] = useSearchParams();
  const { clinics, doctors, appointments, createAppointment, openWhatsAppModal, showToast } = useApp();

  const clinic = clinics.find((c) => c.slug === clinicSlug || c.id === clinicSlug) || clinics[0];
  const settings = clinic.websiteSettings || getDefaultWebsiteSettings(clinic);
  const primaryColor = settings.primaryColor || '#2563eb';

  const initialDoctorId = searchParams.get('doctor') || '';
  const initialServiceId = searchParams.get('service') || '';

  const clinicDoctors = doctors.filter((d) => d.clinicId === clinic.id);
  const clinicServices = clinic.services || [];
  const defaultBranch = clinic.branches?.[0] || { id: 'branch-main', name: 'Main Practice' };

  // 6-step Wizard State
  const [step, setStep] = useState(1);
  const [selectedDoctorId, setSelectedDoctorId] = useState(initialDoctorId || (clinicDoctors[0]?.id ?? ''));
  const [selectedServiceId, setSelectedServiceId] = useState(initialServiceId || (clinicServices[0]?.id ?? ''));
  const [appointmentDate, setAppointmentDate] = useState('2026-10-28');
  const [appointmentTime, setAppointmentTime] = useState('10:30 AM');
  const [patientName, setPatientName] = useState('');
  const [patientPhone, setPatientPhone] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [notes, setNotes] = useState('');
  const [completedBooking, setCompletedBooking] = useState(null);
  const [formErrors, setFormErrors] = useState({});

  const currentDoctor = clinicDoctors.find((d) => d.id === selectedDoctorId) || clinicDoctors[0];
  const currentService = clinicServices.find((s) => s.id === selectedServiceId) || clinicServices[0];

  const availableSlots = [
    '09:00 AM',
    '09:45 AM',
    '10:30 AM',
    '11:15 AM',
    '12:00 PM',
    '02:30 PM',
    '03:15 PM',
    '04:00 PM',
    '05:00 PM',
    '06:00 PM'
  ];

  // Conflict detection against active bookings for this doctor & date
  const isSlotBooked = (time) => {
    return appointments.some(
      (a) =>
        a.clinicId === clinic.id &&
        a.doctorId === currentDoctor?.id &&
        a.date === appointmentDate &&
        a.time === time &&
        !['Cancelled', 'No-show'].includes(a.status)
    );
  };

  const validatePatientForm = () => {
    const errs = {};
    if (!patientName.trim()) errs.patientName = 'Full name is required';
    if (!patientPhone.trim() || patientPhone.length < 10) errs.patientPhone = 'Valid 10-digit mobile number required';
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleStep4Next = (e) => {
    e.preventDefault();
    if (validatePatientForm()) {
      setStep(5); // Review step
    }
  };

  const handleFinalConfirmBooking = () => {
    if (isSlotBooked(appointmentTime)) {
      showToast(`Conflict: ${appointmentTime} on ${appointmentDate} has already been reserved for Dr. ${currentDoctor.name}. Please choose another slot.`, 'error');
      setStep(3);
      return;
    }

    // Call centralized createAppointment in AppContext!
    const newApt = createAppointment({
      clinicId: clinic.id,
      clinicName: clinic.name,
      branchId: defaultBranch.id,
      branchName: defaultBranch.name,
      doctorId: currentDoctor.id,
      doctorName: currentDoctor.name,
      patientId: `pt-${Date.now().toString().slice(-5)}`,
      patientName,
      patientPhone,
      patientEmail: patientEmail || `${patientName.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
      serviceId: currentService.id,
      serviceName: currentService.name,
      date: appointmentDate,
      time: appointmentTime,
      type: 'General Consultation',
      status: 'Requested',
      notes: notes || 'Booked through public clinic website portal',
      isWalkIn: false,
      fee: currentService?.fee || currentDoctor?.consultationFee || 600
    });

    if (newApt) {
      setCompletedBooking(newApt);
      setStep(6); // Step 6: Confirmation screen
      showToast(`Appointment booked successfully! Ref: ${newApt.referenceNumber}`, 'success');
    }
  };

  const stepLabels = [
    '1. Doctor & Service',
    '2. Date',
    '3. Time Slot',
    '4. Patient Info',
    '5. Review',
    '6. Confirmed'
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Title Header */}
      <div className="text-center space-y-2">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
          Online Appointment Booking Wizard
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
          Book a Consultation at {clinic.name}
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          No advance payment required. Choose your slot, enter patient details, and receive instant confirmation.
        </p>
        <p className="text-xs text-blue-600 dark:text-blue-400">
          Already a patient?{' '}
          <Link to={`/clinic/${clinic.slug}/signin`} className="font-bold underline">
            Sign In to Patient Portal
          </Link>{' '}
          or{' '}
          <Link to={`/clinic/${clinic.slug}/register`} className="font-bold underline">
            Register for Quick Access
          </Link>
        </p>

      </div>

      {/* 6-Step Stepper Progress Bar */}
      <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 overflow-x-auto text-xs font-medium">
        {stepLabels.map((lbl, idx) => {
          const num = idx + 1;
          const isDone = step > num;
          const isCurrent = step === num;
          return (
            <div key={num} className="flex items-center gap-2 whitespace-nowrap px-1">
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                  isDone
                    ? 'bg-emerald-500 text-white'
                    : isCurrent
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-200 dark:bg-slate-800 text-slate-500'
                }`}
              >
                {isDone ? '✓' : num}
              </span>
              <span className={`hidden sm:inline ${isCurrent ? 'font-bold text-slate-900 dark:text-white' : 'text-slate-400'}`}>
                {lbl.split('. ')[1]}
              </span>
            </div>
          );
        })}
      </div>

      {/* Step 1: Select Doctor & Service */}
      {step === 1 && (
        <Card className="p-6 sm:p-8 border-slate-200 dark:border-slate-800 space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Step 1: Select Doctor & Consultation Treatment
            </h2>
            <p className="text-xs text-slate-500">
              Pick your primary consultant and the service needed.
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                Choose Doctor Specialist:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {clinicDoctors.map((doc) => (
                  <div
                    key={doc.id}
                    onClick={() => setSelectedDoctorId(doc.id)}
                    className={`p-4 rounded-2xl border-2 flex items-center gap-3 transition-all cursor-pointer ${
                      selectedDoctorId === doc.id
                        ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 shadow-xs'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <img
                      src={doc.avatar}
                      alt={doc.name}
                      className="w-12 h-12 rounded-xl object-cover shrink-0"
                    />
                    <div className="min-w-0">
                      <h3 className="text-xs font-bold text-slate-900 dark:text-white truncate">{doc.name}</h3>
                      <p className="text-[11px] text-blue-600 dark:text-blue-400 font-medium truncate">{doc.specialty}</p>
                      <p className="text-[10px] text-slate-500 font-mono mt-0.5">Fee: ₹{doc.consultationFee}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-2">
                Choose Service / Procedure:
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {clinicServices.map((srv) => (
                  <div
                    key={srv.id}
                    onClick={() => setSelectedServiceId(srv.id)}
                    className={`p-3.5 rounded-xl border-2 transition-all cursor-pointer ${
                      selectedServiceId === srv.id
                        ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 shadow-xs'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">{srv.name}</h4>
                      <span className="text-xs font-bold text-blue-600 dark:text-blue-400">₹{srv.fee}</span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-0.5">{srv.durationMinutes || 30} mins · {srv.category}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <Button
              variant="primary"
              size="md"
              onClick={() => setStep(2)}
              className="text-xs font-bold text-white"
              style={{ backgroundColor: primaryColor }}
            >
              Continue to Select Date <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </div>
        </Card>
      )}

      {/* Step 2: Select Date */}
      {step === 2 && (
        <Card className="p-6 sm:p-8 border-slate-200 dark:border-slate-800 space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">
              Step 2: Select Consultation Date
            </h2>
            <p className="text-xs text-slate-500">
              Consulting with <span className="font-semibold text-slate-800 dark:text-white">{currentDoctor?.name}</span>
            </p>
          </div>

          <div className="space-y-4 max-w-sm">
            <label className="block text-xs font-bold text-slate-700 dark:text-[#CBD5E1]">

              Appointment Date:
            </label>
            <input
              type="date"
              value={appointmentDate}
              min="2026-10-27"
              onChange={(e) => setAppointmentDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-[#263B59] bg-slate-50 dark:bg-[#0B1628] text-sm font-semibold text-slate-900 dark:text-[#F1F5F9] focus:ring-2 focus:ring-[#3B82F6]"
            />
            <p className="text-[11px] text-slate-500 dark:text-[#94A3B8]">

              Clinic working days: {currentDoctor?.availableDays?.join(', ') || 'Monday through Saturday'}.
            </p>
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-slate-200 dark:border-[#263B59]">
            <Button variant="outline" size="md" onClick={() => setStep(1)} className="text-xs border-slate-200 dark:border-[#263B59] text-slate-700 dark:text-[#CBD5E1] hover:text-slate-900 dark:hover:text-[#F1F5F9]">

              <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Back
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={() => setStep(3)}
              className="text-xs font-bold text-white"
              style={{ backgroundColor: primaryColor }}
            >
              Pick Time Slot <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </div>
        </Card>
      )}

      {/* Step 3: Select Available Time Slot */}
      {step === 3 && (
        <Card className="p-6 sm:p-8 border-slate-200 dark:border-[#263B59] bg-white dark:bg-[#111E33] space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-slate-900 dark:text-[#F1F5F9]">
              Step 3: Select an Available Slot
            </h2>
            <p className="text-xs text-slate-500 dark:text-[#94A3B8]">
              Date: <span className="font-semibold text-slate-900 dark:text-[#F1F5F9]">{appointmentDate}</span> · Doctor:{' '}
              <span className="font-semibold text-slate-900 dark:text-[#F1F5F9]">{currentDoctor?.name}</span>

            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {availableSlots.map((slot) => {
              const booked = isSlotBooked(slot);
              const isSelected = appointmentTime === slot;
              return (
                <button
                  key={slot}
                  disabled={booked}
                  onClick={() => setAppointmentTime(slot)}
                  className={`p-3 rounded-xl text-xs font-bold border transition-all text-center flex flex-col items-center justify-center gap-1 ${
                    booked
                      ? 'bg-slate-100 dark:bg-[#0D1729]/50 text-slate-400 dark:text-[#94A3B8] border-slate-200 dark:border-[#263B59] cursor-not-allowed opacity-40'
                      : isSelected
                      ? 'bg-blue-600 dark:bg-[#3B82F6] text-white border-blue-600 dark:border-[#3B82F6] shadow-md ring-2 ring-blue-500/30 dark:ring-[#3B82F6]/30'
                      : 'bg-slate-50 dark:bg-[#0B1628] text-slate-700 dark:text-[#CBD5E1] border-slate-200 dark:border-[#263B59] hover:border-blue-500 dark:hover:border-[#3B82F6] hover:text-blue-600 dark:hover:text-[#F1F5F9] cursor-pointer'

                  }`}
                >
                  <Clock className="w-3.5 h-3.5" />
                  <span>{slot}</span>
                  <span className="text-[9px] font-normal uppercase tracking-wider">
                    {booked ? 'Reserved' : isSelected ? 'Selected' : 'Available'}
                  </span>
                </button>
              );
            })}
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-slate-200 dark:border-[#263B59]">
            <Button variant="outline" size="md" onClick={() => setStep(2)} className="text-xs border-slate-200 dark:border-[#263B59] text-slate-700 dark:text-[#CBD5E1] hover:text-slate-900 dark:hover:text-[#F1F5F9]">

              <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Back
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={() => setStep(4)}
              className="text-xs font-bold text-white"
              style={{ backgroundColor: primaryColor }}
            >
              Enter Patient Details <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
            </Button>
          </div>
        </Card>
      )}

      {/* Step 4: Enter Patient Details */}
      {step === 4 && (
        <Card className="p-6 sm:p-8 border-slate-200 dark:border-[#263B59] bg-white dark:bg-[#111E33] space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-slate-900 dark:text-[#F1F5F9]">
              Step 4: Patient Information
            </h2>
            <p className="text-xs text-slate-500 dark:text-[#94A3B8]">

              Provide your details so the clinic front-desk can confirm and prepare your file.
            </p>
          </div>

          <form onSubmit={handleStep4Next} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-[#CBD5E1] mb-1">

                Patient Full Name *
              </label>
              <input
                type="text"
                required
                value={patientName}
                placeholder="e.g. Ramesh Kulkarni"
                onChange={(e) => setPatientName(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-[#263B59] bg-slate-50 dark:bg-[#0B1628] text-slate-900 dark:text-[#F1F5F9] placeholder-slate-400 dark:placeholder-[#94A3B8] text-xs focus:ring-2 focus:ring-[#3B82F6]"

              />
              {formErrors.patientName && (
                <p className="text-rose-500 text-[10px] mt-1">{formErrors.patientName}</p>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-[#CBD5E1] mb-1">

                  Mobile Phone (for WhatsApp Confirmation) *
                </label>
                <input
                  type="tel"
                  required
                  value={patientPhone}
                  placeholder="+91 98220 12345"
                  onChange={(e) => setPatientPhone(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-[#263B59] bg-slate-50 dark:bg-[#0B1628] text-slate-900 dark:text-[#F1F5F9] placeholder-slate-400 dark:placeholder-[#94A3B8] text-xs focus:ring-2 focus:ring-[#3B82F6]"

                />
                {formErrors.patientPhone && (
                  <p className="text-rose-500 text-[10px] mt-1">{formErrors.patientPhone}</p>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-[#CBD5E1] mb-1">

                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  value={patientEmail}
                  placeholder="name@example.com"
                  onChange={(e) => setPatientEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-[#263B59] bg-slate-50 dark:bg-[#0B1628] text-slate-900 dark:text-[#F1F5F9] placeholder-slate-400 dark:placeholder-[#94A3B8] text-xs focus:ring-2 focus:ring-[#3B82F6]"

                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-[#CBD5E1] mb-1">

                Reason for Visit / Symptoms
              </label>
              <textarea
                rows={2}
                value={notes}
                placeholder="Briefly describe what you would like the doctor to look into..."
                onChange={(e) => setNotes(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-[#263B59] bg-slate-50 dark:bg-[#0B1628] text-slate-900 dark:text-[#F1F5F9] placeholder-slate-400 dark:placeholder-[#94A3B8] text-xs focus:ring-2 focus:ring-[#3B82F6]"
              />
            </div>

            <div className="pt-4 flex items-center justify-between border-t border-slate-200 dark:border-[#263B59]">
              <Button variant="outline" size="md" type="button" onClick={() => setStep(3)} className="text-xs border-slate-200 dark:border-[#263B59] text-slate-700 dark:text-[#CBD5E1] hover:text-slate-900 dark:hover:text-[#F1F5F9]">

                <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Back
              </Button>
              <Button
                variant="primary"
                size="md"
                type="submit"
                className="text-xs font-bold text-white"
                style={{ backgroundColor: primaryColor }}
              >
                Review Booking <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </div>
          </form>
        </Card>
      )}

      {/* Step 5: Review Booking Summary */}
      {step === 5 && (
        <Card className="p-6 sm:p-8 border-slate-200 dark:border-[#263B59] bg-white dark:bg-[#111E33] space-y-6">
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-slate-900 dark:text-[#F1F5F9]">
              Step 5: Review Appointment Summary
            </h2>
            <p className="text-xs text-slate-500 dark:text-[#94A3B8]">

              Please double check your consultation details before finalizing.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-50 dark:bg-[#0D1729] border border-slate-200 dark:border-[#263B59] space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4 border-b border-slate-200 dark:border-[#263B59]">
              <div>
                <span className="text-[10px] text-slate-500 dark:text-[#94A3B8] uppercase font-bold tracking-wider block">Clinic & Location</span>
                <span className="font-bold text-slate-900 dark:text-[#F1F5F9] text-sm">{clinic.name}</span>
                <p className="text-slate-600 dark:text-[#CBD5E1] text-[11px] mt-0.5">{clinic.address}, {clinic.city}</p>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 dark:text-[#94A3B8] uppercase font-bold tracking-wider block">Doctor Specialist</span>
                <span className="font-bold text-slate-900 dark:text-[#F1F5F9] text-sm">{currentDoctor?.name}</span>
                <p className="text-blue-600 dark:text-[#22D3EE] text-[11px] font-medium mt-0.5">{currentDoctor?.specialty}</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-4 border-b border-slate-200 dark:border-[#263B59]">
              <div>
                <span className="text-[10px] text-slate-500 dark:text-[#94A3B8] uppercase font-bold tracking-wider block">Date</span>
                <span className="font-semibold text-slate-900 dark:text-[#F1F5F9]">{appointmentDate}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 dark:text-[#94A3B8] uppercase font-bold tracking-wider block">Slot Time</span>
                <span className="font-semibold text-blue-600 dark:text-[#22D3EE]">{appointmentTime}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 dark:text-[#94A3B8] uppercase font-bold tracking-wider block">Pay at Clinic</span>
                <span className="font-extrabold text-blue-600 dark:text-[#22D3EE] text-sm">

                  ₹{currentService?.fee || currentDoctor?.consultationFee || 600}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <span className="text-[10px] text-slate-500 dark:text-[#94A3B8] uppercase font-bold tracking-wider block">Patient Name</span>
                <span className="font-semibold text-slate-900 dark:text-[#F1F5F9]">{patientName}</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 dark:text-[#94A3B8] uppercase font-bold tracking-wider block">Mobile / WhatsApp</span>
                <span className="font-semibold text-slate-900 dark:text-[#F1F5F9]">{patientPhone}</span>

              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-[11px] text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>Zero advance payment needed. Consultation fee is paid directly at the clinic desk upon arrival.</span>
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-slate-200 dark:border-[#263B59]">
            <Button variant="outline" size="md" onClick={() => setStep(4)} className="text-xs border-slate-200 dark:border-[#263B59] text-slate-700 dark:text-[#CBD5E1] hover:text-slate-900 dark:hover:text-[#F1F5F9]">

              <ArrowLeft className="w-3.5 h-3.5 mr-1.5" /> Edit Details
            </Button>
            <Button
              variant="primary"
              size="lg"
              onClick={handleFinalConfirmBooking}
              className="text-xs font-bold text-white shadow-lg"
              style={{ backgroundColor: primaryColor }}
            >
              Confirm Appointment Now ✓
            </Button>
          </div>
        </Card>
      )}

      {/* Step 6: Confirmation Screen */}
      {step === 6 && completedBooking && (
        <Card className="p-8 sm:p-10 border-slate-200 dark:border-[#263B59] bg-white dark:bg-[#111E33] text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center mx-auto shadow-md">

            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
              Booking Reserved Successfully
            </span>
            <h2 className="text-2xl font-extrabold text-slate-900 dark:text-[#F1F5F9]">
              We look forward to seeing you, {patientName}!
            </h2>
            <p className="text-xs text-slate-600 dark:text-[#CBD5E1]">

              Your consultation has been registered in the clinic's reception queue.
            </p>
          </div>

          {/* Reference Card */}
          <div className="max-w-md mx-auto p-5 rounded-2xl bg-slate-50 dark:bg-[#0D1729] border border-slate-200 dark:border-[#263B59] text-left text-xs space-y-3">
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-[#263B59] pb-2">
              <span className="text-slate-500 dark:text-[#94A3B8] font-medium">Booking Reference</span>
              <span className="font-mono font-extrabold text-blue-600 dark:text-[#22D3EE] text-sm">

                {completedBooking.referenceNumber}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-[#94A3B8]">Doctor</span>
              <span className="font-bold text-slate-900 dark:text-[#F1F5F9]">{completedBooking.doctorName}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-[#94A3B8]">Date & Time</span>
              <span className="font-bold text-slate-900 dark:text-[#F1F5F9]">

                {completedBooking.date} at {completedBooking.time}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-slate-500 dark:text-[#94A3B8]">Consultation Fee</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400">₹{completedBooking.fee || 600} (Pay at clinic)</span>

            </div>
          </div>

          {/* Simulated WhatsApp Confirmation Preview */}
          <div className="max-w-md mx-auto p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-left text-xs space-y-2">
            <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold">
              <MessageSquare className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>Automated WhatsApp Confirmation Simulated</span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-[#CBD5E1]">
              An SMS & WhatsApp reminder with clinic address and token directions has been dispatched to{' '}
              <span className="font-mono font-semibold text-slate-900 dark:text-[#F1F5F9]">{patientPhone}</span>.
            </p>
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
            <Link to="/app/dashboard">
              <Button variant="primary" size="md" className="text-xs font-bold">
                View in Clinic Dashboard →
              </Button>
            </Link>
            <Link to="/app/frontdesk/appointments">
              <Button variant="outline" size="md" className="text-xs font-semibold">
                View Front Desk Queue →

              </Button>
            </Link>
            <Link to={`/clinic/${clinic.slug}`}>
              <Button variant="ghost" size="md" className="text-xs">
                Back to Clinic Homepage
              </Button>
            </Link>
          </div>
        </Card>
      )}
    </div>
  );
}


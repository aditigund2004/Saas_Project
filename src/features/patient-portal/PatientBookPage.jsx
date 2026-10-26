import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import {
  Calendar,
  Clock,
  Stethoscope,
  Building2,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  AlertTriangle,
  Info,
  ShieldCheck,
  Star,
  MapPin,
  User,
  Phone,
  Mail,
  Check
} from 'lucide-react';

export function PatientBookPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {
    clinics,
    doctors,
    currentUser,
    submitBookingRequest,
    getAvailableSlotsForDoctor,
    showToast,
    formatCurrency
  } = useApp();
<<<<<<< HEAD
=======
  const publicClinics = clinics.filter(
    (clinic) =>
      clinic.approvalStatus !== 'Pending' &&
      clinic.approvalStatus !== 'Rejected' &&
      clinic.status !== 'Pending'
  );
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf

  // Wizard Step State (1 to 6)
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
<<<<<<< HEAD
  const initialClinicId = searchParams.get('clinicId') || clinics[0]?.id || '';
  const initialDoctorId = searchParams.get('doctorId') || '';
=======
  const requestedClinicId = searchParams.get('clinicId');
  const initialClinicId = publicClinics.some((clinic) => clinic.id === requestedClinicId)
    ? requestedClinicId
    : publicClinics[0]?.id || '';
  const requestedDoctorId = searchParams.get('doctorId');
  const initialDoctorId = doctors.some(
    (doctor) => doctor.id === requestedDoctorId && doctor.clinicId === initialClinicId
  )
    ? requestedDoctorId
    : '';
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
  const initialServiceId = searchParams.get('serviceId') || '';

  const [selectedClinicId, setSelectedClinicId] = useState(initialClinicId);
  const [selectedDoctorId, setSelectedDoctorId] = useState(initialDoctorId);
  const [selectedServiceId, setSelectedServiceId] = useState(initialServiceId);
  const [consultationType, setConsultationType] = useState('First Consultation');

  // Preferred Date & Time
  const tomorrowStr = new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const [preferredDate, setPreferredDate] = useState(tomorrowStr);
  const [preferredTime, setPreferredTime] = useState('10:30 AM');

  // Alternative Preferences (Section E)
  const [secondPreferredDate, setSecondPreferredDate] = useState('');
  const [preferredTimeOfDay, setPreferredTimeOfDay] = useState('Morning');
  const [patientNote, setPatientNote] = useState('');

  // Patient Synthetic Details
  const [patientName, setPatientName] = useState(currentUser?.name || 'Aarav Patel');
  const [patientPhone, setPatientPhone] = useState(currentUser?.phone || '+91 98765 43210');
  const [patientEmail, setPatientEmail] = useState(currentUser?.email || 'aarav.patel@example.demo');
  const [isNewPatient, setIsNewPatient] = useState(false);
  const [agreedToPolicy, setAgreedToPolicy] = useState(true);

  // Submission Result Modal
  const [submittedRequest, setSubmittedRequest] = useState(null);

  // Derived Objects
<<<<<<< HEAD
  const selectedClinic = clinics.find((c) => c.id === selectedClinicId) || clinics[0];
  const clinicDoctors = doctors.filter((d) => d.clinicId === selectedClinicId);
=======
  const selectedClinic = publicClinics.find((c) => c.id === selectedClinicId) || publicClinics[0];
  const clinicDoctors = doctors.filter((d) => d.clinicId === selectedClinic?.id);
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
  const selectedDoctor = clinicDoctors.find((d) => d.id === selectedDoctorId) || clinicDoctors[0];
  const selectedService = selectedClinic?.services?.find((s) => s.id === selectedServiceId) || selectedClinic?.services?.[0];

  // Auto-advance if URL parameters provided
  useEffect(() => {
    if (initialClinicId && initialDoctorId) {
      setSelectedClinicId(initialClinicId);
      setSelectedDoctorId(initialDoctorId);
      setCurrentStep(3);
    } else if (initialClinicId) {
      setSelectedClinicId(initialClinicId);
      setCurrentStep(2);
    }
  }, [initialClinicId, initialDoctorId]);

  // When clinic changes, reset doctor and service
  const handleClinicChange = (clinicId) => {
    setSelectedClinicId(clinicId);
    const docs = doctors.filter((d) => d.clinicId === clinicId);
    setSelectedDoctorId(docs[0]?.id || '');
<<<<<<< HEAD
    const cln = clinics.find((c) => c.id === clinicId);
=======
    const cln = publicClinics.find((c) => c.id === clinicId);
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
    setSelectedServiceId(cln?.services?.[0]?.id || '');
  };

  // Available slots for selected doctor & date
  const availableSlots = selectedDoctor
<<<<<<< HEAD
    ? getAvailableSlotsForDoctor(selectedClinicId, selectedDoctor.id, preferredDate)
=======
    ? getAvailableSlotsForDoctor(selectedClinic.id, selectedDoctor.id, preferredDate)
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
    : [];

  const handleNext = () => {
    if (currentStep === 1 && !selectedClinicId) {
      showToast('Please select a clinic to proceed.', 'error');
      return;
    }
    if (currentStep === 2 && !selectedDoctorId) {
      showToast('Please select a doctor to proceed.', 'error');
      return;
    }
    if (currentStep === 3 && !selectedServiceId) {
      showToast('Please select a clinical service.', 'error');
      return;
    }
    if (currentStep === 4 && (!preferredDate || !preferredTime)) {
      showToast('Please select your preferred date and time.', 'error');
      return;
    }
    if (currentStep === 5) {
      if (!patientName || !patientPhone) {
        showToast('Please enter patient name and contact number.', 'error');
        return;
      }
      if (!agreedToPolicy) {
        showToast('Please agree to the clinic booking policy.', 'error');
        return;
      }
    }
    setCurrentStep((prev) => Math.min(prev + 1, 6));
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmitBookingRequest = (e) => {
    e.preventDefault();

    const request = submitBookingRequest({
      clinicId: selectedClinic.id,
      clinicName: selectedClinic.name,
      branchId: selectedClinic.branches[0]?.id || 'branch-main',
      branchName: selectedClinic.branches[0]?.name || 'Main Center',
      doctorId: selectedDoctor.id,
      doctorName: selectedDoctor.name,
      serviceId: selectedService?.id || 'srv-1',
      serviceName: selectedService?.name || 'General Consultation',
      consultationFee: selectedService?.fee || selectedDoctor.consultationFee,
      consultationType,
      preferredDate,
      preferredTime,
<<<<<<< HEAD
      patientId: 'pt-1041',
=======
      patientId: currentUser.id,
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
      patientName,
      patientPhone,
      patientEmail,
      isNewPatient,
      notes: patientNote,
      patientAlternativePreferences: {
        secondPreferredDate,
        preferredTimeOfDay,
        noteForReceptionist: patientNote
      }
    });

    setSubmittedRequest(request);
  };

  const steps = [
    { num: 1, title: 'Clinic' },
    { num: 2, title: 'Doctor' },
    { num: 3, title: 'Service' },
    { num: 4, title: 'Date & Time' },
    { num: 5, title: 'Patient Info' },
    { num: 6, title: 'Review & Submit' }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2">
            <Link to="/patient/appointments" className="text-xs text-blue-600 hover:underline flex items-center gap-1 font-semibold">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to My Appointments
            </Link>
          </div>
          <h1 className="text-2xl font-black text-slate-900 mt-1 tracking-tight">
            Appointment Request Wizard
          </h1>
          <p className="text-xs text-slate-500">
            Submit a booking request. Our clinic receptionist verifies schedule availability before finalizing your appointment.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/patient/appointments/requests">
            <Button variant="outline" size="sm">
              View Active Requests &rarr;
            </Button>
          </Link>
        </div>
      </div>

      {/* Step Progress Tracker */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-2xs">
        <div className="flex items-center justify-between overflow-x-auto gap-2">
          {steps.map((s, idx) => {
            const isCompleted = currentStep > s.num;
            const isCurrent = currentStep === s.num;

            return (
              <React.Fragment key={s.num}>
                <div
                  onClick={() => isCompleted && setCurrentStep(s.num)}
                  className={`flex items-center gap-2 cursor-pointer transition-all ${
                    isCurrent
                      ? 'text-blue-600 font-bold'
                      : isCompleted
                      ? 'text-slate-700 hover:text-blue-600'
                      : 'text-slate-400 opacity-60'
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isCurrent
                        ? 'bg-blue-600 text-white shadow-xs'
                        : isCompleted
                        ? 'bg-blue-100 text-blue-700'
                        : 'bg-slate-100 text-slate-400'
                    }`}
                  >
                    {isCompleted ? <Check className="w-3.5 h-3.5" /> : s.num}
                  </span>
                  <span className="text-xs whitespace-nowrap">{s.title}</span>
                </div>
                {idx < steps.length - 1 && (
                  <div className={`hidden sm:block flex-1 h-0.5 ${isCompleted ? 'bg-blue-200' : 'bg-slate-100'}`} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Wizard Form Container */}
      <Card className="p-6 border-slate-200 shadow-xs">
        {/* Step 1: Choose Clinic */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-base font-black text-slate-900">Step 1: Select a Participating Clinic</h2>
              <p className="text-xs text-slate-500">
                Choose one of the 5 accredited demonstration clinics on the ClinicOS platform.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
<<<<<<< HEAD
              {clinics.map((clinic) => {
=======
              {publicClinics.map((clinic) => {
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
                const isSelected = selectedClinicId === clinic.id;

                return (
                  <div
                    key={clinic.id}
                    onClick={() => handleClinicChange(clinic.id)}
                    className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-500/20 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="text-2xl">{clinic.logo || '🏥'}</span>
                        <div>
                          <h3 className="font-bold text-slate-900 text-xs">{clinic.name}</h3>
                          <span className="text-[10px] text-blue-700 font-bold uppercase font-mono">
                            {clinic.specialty}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                        <Star className="w-3 h-3 fill-amber-400" />
                        <span>{clinic.rating || 4.9}</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-slate-600 line-clamp-2 mt-2 leading-relaxed">
                      {clinic.description}
                    </p>

                    <div className="flex items-center justify-between text-[11px] text-slate-500 pt-3 mt-3 border-t border-slate-100">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-blue-600" />
                        {clinic.city}
                      </span>
                      <span className="font-mono font-bold text-slate-800">
                        {clinic.consultationFeeRange || '₹500 - ₹1,200'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Choose Doctor */}
        {currentStep === 2 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-base font-black text-slate-900">Step 2: Choose Consulting Doctor</h2>
              <p className="text-xs text-slate-500">
                Physicians currently practicing at <strong>{selectedClinic.name}</strong> ({selectedClinic.city}).
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {clinicDoctors.map((doc) => {
                const isSelected = selectedDoctorId === doc.id;

                return (
                  <div
                    key={doc.id}
                    onClick={() => setSelectedDoctorId(doc.id)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/70 ring-2 ring-blue-500/20 shadow-xs'
                        : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={doc.avatar}
                        alt={doc.name}
                        className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-200"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-slate-900 text-xs truncate">{doc.name}</h3>
                        <p className="text-[11px] text-blue-700 font-semibold truncate">{doc.specialty}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5 truncate">{doc.qualifications}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-[11px] bg-slate-50 p-2 rounded-lg mt-3">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Experience</span>
                        <span className="font-semibold text-slate-900">{doc.experienceYears} Years</span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">Fee</span>
                        <span className="font-bold font-mono text-blue-700">₹{doc.consultationFee}</span>
                      </div>
                    </div>

                    <p className="text-[10px] text-slate-500 mt-2 truncate">
                      Days: {doc.availableDays?.join(', ')}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 3: Choose Service & Consultation Type */}
        {currentStep === 3 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-base font-black text-slate-900">Step 3: Clinical Service & Consultation Mode</h2>
              <p className="text-xs text-slate-500">
                Select from services supported by Dr. {selectedDoctor?.name} at {selectedClinic?.name}.
              </p>
            </div>

            {/* Consultation Type Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Consultation Type
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { id: 'First Consultation', label: 'First Consultation', desc: 'Initial clinical assessment & diagnostics' },
                  { id: 'Follow-up Consultation', label: 'Follow-up Consultation', desc: 'Review of existing treatment / lab reports' },
                  { id: 'In-person Appointment', label: 'In-Person Procedure / Visit', desc: 'Physical hands-on examination or therapy' }
                ].map((type) => (
                  <button
                    key={type.id}
                    type="button"
                    onClick={() => setConsultationType(type.id)}
                    className={`p-3 rounded-xl border text-left transition-all ${
                      consultationType === type.id
                        ? 'border-blue-600 bg-blue-50/80 ring-1 ring-blue-600 text-blue-950 shadow-2xs'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <div className="font-bold text-xs">{type.label}</div>
                    <div className="text-[10px] text-slate-500 mt-0.5">{type.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Services List */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider">
                Available Clinic Services
              </label>
              <div className="space-y-2">
                {selectedClinic?.services?.map((srv) => {
                  const isSelected = selectedServiceId === srv.id;

                  return (
                    <div
                      key={srv.id}
                      onClick={() => setSelectedServiceId(srv.id)}
                      className={`p-3.5 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/70 ring-1 ring-blue-500 shadow-2xs'
                          : 'border-slate-200 hover:border-slate-300 bg-white'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-slate-900 text-xs">{srv.name}</h4>
                          <span className="px-2 py-0.2 rounded bg-slate-100 text-slate-600 font-mono text-[10px]">
                            {srv.durationMinutes} mins
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-500">{srv.description}</p>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-sm font-bold font-mono text-slate-900">
                          ₹{srv.fee.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Preferred Date & Time */}
        {currentStep === 4 && (
          <div className="space-y-5">
            <div>
              <h2 className="text-base font-black text-slate-900">Step 4: Select Preferred Date & Time Slot</h2>
              <p className="text-xs text-slate-500">
                Operating Hours: <strong>{selectedClinic?.operatingHours}</strong> (Clinic-Local Time).
              </p>
            </div>

            {/* Explanatory Banner (Section E) */}
            <div className="p-3 rounded-xl bg-blue-50/80 border border-blue-200 text-blue-950 text-xs flex items-start gap-2.5">
              <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <strong>Appointment Request Verification:</strong> You are submitting a requested slot. The clinic receptionist will cross-check the doctor's live emergency rota and confirm or offer an alternative.
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Preferred Date *</label>
                <input
                  type="date"
                  min={new Date().toISOString().slice(0, 10)}
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Alternative Preferred Date (Optional)
                </label>
                <input
                  type="date"
                  min={new Date().toISOString().slice(0, 10)}
                  value={secondPreferredDate}
                  onChange={(e) => setSecondPreferredDate(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none font-mono"
                />
              </div>
            </div>

            {/* Time Slot Picker */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700">
                Select Preferred Slot (30 mins duration) *
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {availableSlots.map((slot) => {
                  const isSelected = preferredTime === slot.time;

                  return (
                    <button
                      key={slot.time}
                      type="button"
                      disabled={!slot.available}
                      onClick={() => setPreferredTime(slot.time)}
                      className={`p-2.5 rounded-lg text-xs font-mono font-bold text-center border transition-all ${
                        !slot.available
                          ? 'border-slate-200 bg-slate-100 text-slate-400 cursor-not-allowed line-through'
                          : isSelected
                          ? 'border-blue-600 bg-blue-600 text-white shadow-2xs'
                          : 'border-slate-200 bg-white hover:border-blue-400 text-slate-700'
                      }`}
                      title={slot.reason || 'Slot available'}
                    >
                      {slot.time}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time of Day Preference & Notes */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Flexible Timing Preference
                </label>
                <select
                  value={preferredTimeOfDay}
                  onChange={(e) => setPreferredTimeOfDay(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 text-xs bg-white focus:ring-2 focus:ring-blue-600 focus:outline-none"
                >
                  <option value="Morning">Morning (09:00 AM - 12:00 PM)</option>
                  <option value="Afternoon">Afternoon (12:00 PM - 04:00 PM)</option>
                  <option value="Evening">Evening (04:00 PM - 08:00 PM)</option>
                  <option value="Flexible">Fully Flexible — Any available slot</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Short Note for Clinic Receptionist
                </label>
                <input
                  type="text"
                  placeholder="e.g. Prefers after 11 AM due to travel from Indiranagar"
                  value={patientNote}
                  onChange={(e) => setPatientNote(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Patient Details */}
        {currentStep === 5 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-base font-black text-slate-900">Step 5: Patient Details & Verification</h2>
              <p className="text-xs text-slate-500">
                Synthetic demonstration details for appointment coordination.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Patient Full Name *</label>
                <input
                  type="text"
                  required
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Mobile Number *</label>
                <input
                  type="text"
                  required
                  value={patientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                  className="w-full p-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Email Address</label>
              <input
                type="email"
                value={patientEmail}
                onChange={(e) => setPatientEmail(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-600 focus:outline-none font-mono"
              />
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isNewPatient}
                  onChange={(e) => setIsNewPatient(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-xs font-semibold text-slate-800">
                  First visit to this clinic (Requires brief 5-min intake check at reception)
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer pt-1 border-t border-slate-200">
                <input
                  type="checkbox"
                  checked={agreedToPolicy}
                  onChange={(e) => setAgreedToPolicy(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-xs text-slate-700">
                  I agree to the clinic booking policy: <em>"{selectedClinic?.bookingPolicy}"</em>
                </span>
              </label>
            </div>
          </div>
        )}

        {/* Step 6: Review & Submit */}
        {currentStep === 6 && (
          <form onSubmit={handleSubmitBookingRequest} className="space-y-5">
            <div>
              <h2 className="text-base font-black text-slate-900">Step 6: Review & Submit Booking Request</h2>
              <p className="text-xs text-slate-500">
                Verify your appointment request summary before dispatching to the clinic reception queue.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3 text-xs">
              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="text-slate-500 font-medium">Selected Clinic:</span>
                <span className="font-bold text-slate-900 flex items-center gap-1.5">
                  <span>{selectedClinic?.logo}</span>
                  {selectedClinic?.name} ({selectedClinic?.city})
                </span>
              </div>

              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="text-slate-500 font-medium">Consulting Doctor:</span>
                <span className="font-bold text-blue-700">{selectedDoctor?.name} ({selectedDoctor?.specialty})</span>
              </div>

              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="text-slate-500 font-medium">Service & Type:</span>
                <span className="font-semibold text-slate-900">
                  {selectedService?.name} · <span className="text-blue-600">{consultationType}</span>
                </span>
              </div>

              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="text-slate-500 font-medium">Preferred Slot:</span>
                <span className="font-mono font-bold text-slate-900 text-sm">
                  {preferredDate} at {preferredTime}
                </span>
              </div>

              {secondPreferredDate && (
                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <span className="text-slate-500 font-medium">Alternative Date Preference:</span>
                  <span className="font-mono text-slate-700">{secondPreferredDate} ({preferredTimeOfDay})</span>
                </div>
              )}

              <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                <span className="text-slate-500 font-medium">Patient Details:</span>
                <span className="text-slate-800">{patientName} ({patientPhone})</span>
              </div>

              <div className="flex justify-between items-center pt-1 font-mono">
                <span className="font-sans font-bold text-slate-700">Consultation Tariff:</span>
                <span className="text-base font-extrabold text-blue-700">
                  {formatCurrency(selectedService?.fee || selectedDoctor?.consultationFee || 600)}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>
                <strong>Notice:</strong> Submitting will create a pending request for reception verification. You will receive a simulated notification once confirmed.
              </span>
            </div>

            {/* Submit Action */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-200">
              <Button variant="outline" type="button" onClick={handleBack}>
                &larr; Back
              </Button>
              <Button variant="primary" type="submit" size="md" icon={CheckCircle2}>
                Submit Booking Request &rarr;
              </Button>
            </div>
          </form>
        )}

        {/* Wizard Footer Nav Buttons (for steps 1-5) */}
        {currentStep < 6 && (
          <div className="flex items-center justify-between pt-5 mt-5 border-t border-slate-200">
            {currentStep > 1 ? (
              <Button variant="outline" size="sm" onClick={handleBack}>
                &larr; Previous Step
              </Button>
            ) : (
              <div />
            )}

            <Button variant="primary" size="sm" onClick={handleNext}>
              Continue to Step {currentStep + 1} &rarr;
            </Button>
          </div>
        )}
      </Card>

      {/* Booking Request Submitted Confirmation Modal */}
      <Modal
        isOpen={!!submittedRequest}
        onClose={() => {
          setSubmittedRequest(null);
          navigate('/patient/appointments/requests');
        }}
        title="Booking Request Submitted Successfully"
      >
        {submittedRequest && (
          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-2 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-600 text-white mx-auto flex items-center justify-center font-bold text-xl shadow-xs">
                ✓
              </div>
              <h3 className="font-extrabold text-slate-900 text-sm">
                Request {submittedRequest.requestId} Received!
              </h3>
              <p className="text-[11px] text-emerald-800">
                The clinic receptionist at <strong>{submittedRequest.clinicName}</strong> has been notified and will verify the slot availability.
              </p>
            </div>

            <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1.5 font-mono text-[11px]">
              <div className="flex justify-between">
                <span className="text-slate-500 font-sans">Request ID:</span>
                <span className="font-bold text-slate-900">{submittedRequest.requestId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-sans">Doctor:</span>
                <span className="text-blue-700">{submittedRequest.doctorName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-sans">Requested Slot:</span>
                <span className="text-slate-900">{submittedRequest.requestedDate} at {submittedRequest.requestedTime}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-sans">Initial Status:</span>
                <span className="px-2 py-0.5 rounded bg-amber-100 text-amber-800 font-bold text-[10px]">
                  Pending Clinic Confirmation
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSubmittedRequest(null);
                  navigate('/patient/appointments');
                }}
              >
                Go to Appointments
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  setSubmittedRequest(null);
                  navigate('/patient/appointments/requests');
                }}
              >
                Track in My Requests &rarr;
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}

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

  // Wizard Step State (1 to 6)
  const [currentStep, setCurrentStep] = useState(1);

  // Form State
  const initialClinicId = searchParams.get('clinicId') || clinics[0]?.id || '';
  const initialDoctorId = searchParams.get('doctorId') || '';
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
  const selectedClinic = clinics.find((c) => c.id === selectedClinicId) || clinics[0];
  const clinicDoctors = doctors.filter((d) => d.clinicId === selectedClinicId);
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
    const cln = clinics.find((c) => c.id === clinicId);
    setSelectedServiceId(cln?.services?.[0]?.id || '');
  };

  // Available slots for selected doctor & date
  const availableSlots = selectedDoctor
    ? getAvailableSlotsForDoctor(selectedClinicId, selectedDoctor.id, preferredDate)
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
      patientId: 'pt-1041',
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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link to="/patient/appointments" className="text-xs text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 font-semibold">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to My Appointments
            </Link>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 mt-1 tracking-tight">
            Appointment Request Wizard
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">

            Submit a booking request. Our clinic receptionist verifies schedule availability before finalizing your appointment.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/patient/appointments/requests">
            <Button variant="outline" size="md">

              View Active Requests &rarr;
            </Button>
          </Link>
        </div>
      </div>

      {/* Step Progress Tracker */}
      <div className="bg-white dark:bg-slate-900/90 p-4 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between overflow-x-auto gap-3">

          {steps.map((s, idx) => {
            const isCompleted = currentStep > s.num;
            const isCurrent = currentStep === s.num;

            return (
              <React.Fragment key={s.num}>
                <div
                  onClick={() => isCompleted && setCurrentStep(s.num)}
                  className={`flex items-center gap-2.5 cursor-pointer transition-all ${
                    isCurrent
                      ? 'text-blue-600 dark:text-blue-400 font-bold'
                      : isCompleted
                      ? 'text-slate-700 dark:text-slate-300 hover:text-blue-600'
                      : 'text-slate-400 dark:text-slate-600 opacity-60'
                  }`}
                >
                  <span
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                      isCurrent
                        ? 'bg-blue-600 text-white shadow-sm'
                        : isCompleted
                        ? 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-400'
                    }`}
                  >
                    {isCompleted ? <Check className="w-4 h-4" /> : s.num}
                  </span>
                  <span className="text-xs sm:text-sm whitespace-nowrap">{s.title}</span>
                </div>
                {idx < steps.length - 1 && (
                  <div className={`hidden sm:block flex-1 h-0.5 ${isCompleted ? 'bg-blue-300 dark:bg-blue-700' : 'bg-slate-100 dark:bg-slate-800'}`} />

                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* Wizard Form Container */}
      <Card className="p-6 sm:p-7 border-slate-200 dark:border-slate-800 dark:bg-slate-900/90 shadow-sm">

        {/* Step 1: Choose Clinic */}
        {currentStep === 1 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-slate-100">Step 1: Select a Participating Clinic</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">

                Choose one of the 5 accredited demonstration clinics on the ClinicOS platform.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pt-2">
              {clinics.map((clinic) => {
                const isSelected = selectedClinicId === clinic.id;

                return (
                  <div
                    key={clinic.id}
                    onClick={() => handleClinicChange(clinic.id)}
                    className={`p-4 rounded-xl border text-left cursor-pointer transition-all ${
                      isSelected
                        ? 'border-blue-600 dark:border-blue-500 bg-blue-50/70 dark:bg-blue-950/40 ring-2 ring-blue-500/20 shadow-xs'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-950/60 hover:bg-slate-50/50 dark:hover:bg-slate-800/50'

                    }`}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex items-center gap-2.5">
                        <span className="text-2xl">{clinic.logo || '🏥'}</span>
                        <div>
                          <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm">{clinic.name}</h3>
                          <span className="text-xs text-blue-700 dark:text-blue-400 font-bold uppercase font-mono">

                            {clinic.specialty}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />

                        <span>{clinic.rating || 4.9}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 mt-2 leading-relaxed">
                      {clinic.description}
                    </p>

                    <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 pt-3 mt-3 border-t border-slate-100 dark:border-slate-800">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                        {clinic.city}
                      </span>
                      <span className="font-mono font-bold text-slate-800 dark:text-slate-200">

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
              <h2 className="text-base font-extrabold text-slate-900 dark:text-slate-100">Step 2: Choose Consulting Doctor</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Physicians currently practicing at <strong className="text-slate-800 dark:text-slate-200">{selectedClinic.name}</strong> ({selectedClinic.city}).

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
                        ? 'border-blue-600 dark:border-blue-500 bg-blue-50/70 dark:bg-blue-950/40 ring-2 ring-blue-500/20 shadow-xs'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-950/60 hover:bg-slate-50/50 dark:hover:bg-slate-800/50'

                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={doc.avatar}
                        alt={doc.name}
                        className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-200 dark:border-slate-700"
                      />
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-slate-900 dark:text-slate-100 text-sm truncate">{doc.name}</h3>
                        <p className="text-xs text-blue-700 dark:text-blue-400 font-semibold truncate">{doc.specialty}</p>
                        <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5 truncate">{doc.qualifications}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-xs bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800 mt-3">
                      <div>
                        <span className="text-xs text-slate-400 dark:text-slate-500 uppercase font-bold block">Experience</span>
                        <span className="font-semibold text-slate-900 dark:text-slate-100">{doc.experienceYears} Years</span>
                      </div>
                      <div>
                        <span className="text-xs text-slate-400 dark:text-slate-500 uppercase font-bold block">Fee</span>
                        <span className="font-bold font-mono text-blue-700 dark:text-blue-400">₹{doc.consultationFee}</span>
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 truncate">

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
              <h2 className="text-base font-extrabold text-slate-900 dark:text-slate-100">Step 3: Clinical Service & Consultation Mode</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">

                Select from services supported by Dr. {selectedDoctor?.name} at {selectedClinic?.name}.
              </p>
            </div>

            {/* Consultation Type Selector */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">

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
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      consultationType === type.id
                        ? 'border-blue-600 dark:border-blue-500 bg-blue-50/80 dark:bg-blue-950/40 ring-1 ring-blue-600 text-blue-950 dark:text-blue-200 shadow-sm'
                        : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950/60 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <div className="font-bold text-sm">{type.label}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400 mt-1">{type.desc}</div>

                  </button>
                ))}
              </div>
            </div>

            {/* Services List */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                Available Clinic Services
              </label>
              <div className="space-y-2.5">

                {selectedClinic?.services?.map((srv) => {
                  const isSelected = selectedServiceId === srv.id;

                  return (
                    <div
                      key={srv.id}
                      onClick={() => setSelectedServiceId(srv.id)}
                      className={`p-4 rounded-xl border flex items-center justify-between gap-3 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-blue-600 dark:border-blue-500 bg-blue-50/70 dark:bg-blue-950/40 ring-1 ring-blue-500 shadow-sm'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-white dark:bg-slate-950/60 hover:bg-slate-50/50 dark:hover:bg-slate-800/40'

                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-slate-900 dark:text-slate-100 text-sm">{srv.name}</h4>
                          <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-mono text-xs">
                            {srv.durationMinutes} mins
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{srv.description}</p>
                      </div>

                      <div className="text-right shrink-0">
                        <span className="text-base font-bold font-mono text-slate-900 dark:text-slate-100">

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
              <h2 className="text-base font-extrabold text-slate-900 dark:text-slate-100">Step 4: Select Preferred Date & Time Slot</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">

                Operating Hours: <strong>{selectedClinic?.operatingHours}</strong> (Clinic-Local Time).
              </p>
            </div>

            {/* Explanatory Banner */}
            <div className="p-3.5 rounded-xl bg-blue-50/80 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 text-blue-950 dark:text-blue-200 text-xs flex items-start gap-2.5">
              <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />

              <div>
                <strong>Appointment Request Verification:</strong> You are submitting a requested slot. The clinic receptionist will cross-check the doctor's live emergency rota and confirm or offer an alternative.
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Preferred Date *</label>

                <input
                  type="date"
                  min={new Date().toISOString().slice(0, 10)}
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 dark:text-slate-100 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none font-mono"

                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">

                  Alternative Preferred Date (Optional)
                </label>
                <input
                  type="date"
                  min={new Date().toISOString().slice(0, 10)}
                  value={secondPreferredDate}
                  onChange={(e) => setSecondPreferredDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 dark:text-slate-100 text-sm focus:ring-2 focus:ring-blue-600 focus:outline-none font-mono"

                />
              </div>
            </div>

            {/* Time Slot Picker */}
            <div className="space-y-2">
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">

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
                      className={`p-2.5 rounded-xl text-xs font-mono font-bold text-center border transition-all ${
                        !slot.available
                          ? 'border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800/40 text-slate-400 dark:text-slate-600 cursor-not-allowed line-through'
                          : isSelected
                          ? 'border-blue-600 bg-blue-600 text-white shadow-sm'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 hover:border-blue-400 dark:hover:border-blue-500 text-slate-700 dark:text-slate-200'

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
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">

                  Flexible Timing Preference
                </label>
                <select
                  value={preferredTimeOfDay}
                  onChange={(e) => setPreferredTimeOfDay(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-sm bg-white dark:bg-slate-950 dark:text-slate-100 focus:ring-2 focus:ring-blue-600 focus:outline-none"

                >
                  <option value="Morning">Morning (09:00 AM - 12:00 PM)</option>
                  <option value="Afternoon">Afternoon (12:00 PM - 04:00 PM)</option>
                  <option value="Evening">Evening (04:00 PM - 08:00 PM)</option>
                  <option value="Flexible">Fully Flexible — Any available slot</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">

                  Short Note for Clinic Receptionist
                </label>
                <input
                  type="text"
                  placeholder="e.g. Prefers after 11 AM due to travel from Indiranagar"
                  value={patientNote}
                  onChange={(e) => setPatientNote(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-sm bg-white dark:bg-slate-950 dark:text-slate-100 focus:ring-2 focus:ring-blue-600 focus:outline-none"

                />
              </div>
            </div>
          </div>
        )}

        {/* Step 5: Patient Details */}
        {currentStep === 5 && (
          <div className="space-y-4">
            <div>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-slate-100">Step 5: Patient Details & Verification</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">

                Synthetic demonstration details for appointment coordination.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Patient Full Name *</label>

                <input
                  type="text"
                  required
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-sm bg-white dark:bg-slate-950 dark:text-slate-100 focus:ring-2 focus:ring-blue-600 focus:outline-none"

                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Contact Mobile Number *</label>

                <input
                  type="text"
                  required
                  value={patientPhone}
                  onChange={(e) => setPatientPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-sm bg-white dark:bg-slate-950 dark:text-slate-100 focus:ring-2 focus:ring-blue-600 focus:outline-none font-mono"

                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Email Address</label>

              <input
                type="email"
                value={patientEmail}
                onChange={(e) => setPatientEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-sm bg-white dark:bg-slate-950 dark:text-slate-100 focus:ring-2 focus:ring-blue-600 focus:outline-none font-mono"
              />
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2.5">
              <label className="flex items-center gap-2.5 cursor-pointer">

                <input
                  type="checkbox"
                  checked={isNewPatient}
                  onChange={(e) => setIsNewPatient(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">

                  First visit to this clinic (Requires brief 5-min intake check at reception)
                </span>
              </label>

              <label className="flex items-center gap-2.5 cursor-pointer pt-2 border-t border-slate-200 dark:border-slate-700">

                <input
                  type="checkbox"
                  checked={agreedToPolicy}
                  onChange={(e) => setAgreedToPolicy(e.target.checked)}
                  className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-xs text-slate-700 dark:text-slate-300">

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
              <h2 className="text-base font-extrabold text-slate-900 dark:text-slate-100">Step 6: Review & Submit Booking Request</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">

                Verify your appointment request summary before dispatching to the clinic reception queue.
              </p>
            </div>

            <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-3.5 text-sm">
              <div className="flex justify-between items-center pb-2.5 border-b border-slate-200 dark:border-slate-700">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Selected Clinic:</span>
                <span className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">

                  <span>{selectedClinic?.logo}</span>
                  {selectedClinic?.name} ({selectedClinic?.city})
                </span>
              </div>

              <div className="flex justify-between items-center pb-2.5 border-b border-slate-200 dark:border-slate-700">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Consulting Doctor:</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">{selectedDoctor?.name} ({selectedDoctor?.specialty})</span>
              </div>

              <div className="flex justify-between items-center pb-2.5 border-b border-slate-200 dark:border-slate-700">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Service & Type:</span>
                <span className="font-semibold text-slate-900 dark:text-slate-100">
                  {selectedService?.name} · <span className="text-blue-600 dark:text-blue-400">{consultationType}</span>
                </span>
              </div>

              <div className="flex justify-between items-center pb-2.5 border-b border-slate-200 dark:border-slate-700">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Preferred Slot:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-slate-100 text-base">

                  {preferredDate} at {preferredTime}
                </span>
              </div>

              {secondPreferredDate && (
                <div className="flex justify-between items-center pb-2.5 border-b border-slate-200 dark:border-slate-700">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Alternative Date Preference:</span>
                  <span className="font-mono text-slate-700 dark:text-slate-300">{secondPreferredDate} ({preferredTimeOfDay})</span>
                </div>
              )}

              <div className="flex justify-between items-center pb-2.5 border-b border-slate-200 dark:border-slate-700">
                <span className="text-slate-500 dark:text-slate-400 font-medium">Patient Details:</span>
                <span className="text-slate-800 dark:text-slate-200">{patientName} ({patientPhone})</span>
              </div>

              <div className="flex justify-between items-center pt-1 font-mono">
                <span className="font-sans font-bold text-slate-700 dark:text-slate-300">Consultation Tariff:</span>
                <span className="text-lg font-extrabold text-blue-600 dark:text-blue-400">

                  {formatCurrency(selectedService?.fee || selectedDoctor?.consultationFee || 600)}
                </span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs flex items-center gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />

              <span>
                <strong>Notice:</strong> Submitting will create a pending request for reception verification. You will receive a simulated notification once confirmed.
              </span>
            </div>

            {/* Submit Action */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-800">
              <Button variant="outline" type="button" onClick={handleBack}>
                &larr; Back
              </Button>
              <Button variant="primary" type="submit" size="md" icon={CheckCircle2} className="shadow-md shadow-blue-500/20 font-bold">

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
          <div className="space-y-4 text-sm">
            <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200 space-y-2 text-center">
              <div className="w-12 h-12 rounded-full bg-emerald-600 text-white mx-auto flex items-center justify-center font-bold text-xl shadow-sm">
                ✓
              </div>
              <h3 className="font-extrabold text-slate-900 dark:text-slate-100 text-base">
                Request {submittedRequest.requestId} Received!
              </h3>
              <p className="text-xs text-emerald-800 dark:text-emerald-300">

                The clinic receptionist at <strong>{submittedRequest.clinicName}</strong> has been notified and will verify the slot availability.
              </p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2 font-mono text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-slate-400 font-sans">Request ID:</span>
                <span className="font-bold text-slate-900 dark:text-slate-100">{submittedRequest.requestId}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-slate-400 font-sans">Doctor:</span>
                <span className="text-blue-600 dark:text-blue-400 font-semibold">{submittedRequest.doctorName}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-slate-400 font-sans">Requested Slot:</span>
                <span className="text-slate-900 dark:text-slate-100">{submittedRequest.requestedDate} at {submittedRequest.requestedTime}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-slate-500 dark:text-slate-400 font-sans">Initial Status:</span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/50 text-amber-800 dark:text-amber-300 font-bold text-xs border border-amber-200 dark:border-amber-800">

                  Pending Clinic Confirmation
                </span>
              </div>
            </div>

            <div className="flex justify-end gap-2.5 pt-2">

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
                className="font-bold shadow-md shadow-blue-500/20"

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

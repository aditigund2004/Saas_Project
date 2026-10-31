<<<<<<< HEAD
import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
=======
import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
>>>>>>> origin/main
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
  Clock,
  UserCheck,
  CheckCircle2,
  Printer,
  AlertCircle,
  Stethoscope,
  Sparkles,
<<<<<<< HEAD
  Phone
=======
  Phone,
  UserPlus,
  QrCode,
  Search,
  Check,
  X,
  History,
  ShieldCheck
>>>>>>> origin/main
} from 'lucide-react';

export function ReceptionWalkInsPage() {
  const {
    activeClinic,
    activeBranch,
    doctors,
    appointments,
<<<<<<< HEAD
=======
    patients = [],
>>>>>>> origin/main
    createAppointment,
    createPatient,
    showToast
  } = useApp();

  const [walkInName, setWalkInName] = useState('');
  const [walkInPhone, setWalkInPhone] = useState('');
<<<<<<< HEAD
  const [selectedDoctorId, setSelectedDoctorId] = useState(doctors[0]?.id || '');
  const [selectedServiceId, setSelectedServiceId] = useState(activeClinic.services[0]?.id || '');
  const [chiefComplaint, setChiefComplaint] = useState('');
  const [issuedTicket, setIssuedTicket] = useState(null);

  const clinicDoctors = doctors.filter((d) => d.clinicId === activeClinic.id);
  const currentDoctor = clinicDoctors.find((d) => d.id === selectedDoctorId) || clinicDoctors[0];
  const currentService = activeClinic.services.find((s) => s.id === selectedServiceId) || activeClinic.services[0];

  const walkInList = appointments.filter(
    (a) =>
      (a.clinicId === activeClinic.id || !a.clinicId) &&
=======
  const [selectedExistingPatient, setSelectedExistingPatient] = useState(null);
  const [selectedDoctorId, setSelectedDoctorId] = useState(doctors[0]?.id || '');
  const [selectedServiceId, setSelectedServiceId] = useState(activeClinic?.services?.[0]?.id || '');
  const [chiefComplaint, setChiefComplaint] = useState('');
  const [issuedTicket, setIssuedTicket] = useState(null);
  const [showSlipModal, setShowSlipModal] = useState(false);

  const clinicDoctors = doctors.filter((d) => !d.clinicId || d.clinicId === activeClinic?.id);
  const currentDoctor = clinicDoctors.find((d) => d.id === selectedDoctorId) || clinicDoctors[0];
  const servicesList = activeClinic?.services || [
    { id: 'srv-1', name: 'General Consultation', fee: 800 },
    { id: 'srv-2', name: 'Dental Evaluation', fee: 900 }
  ];
  const currentService = servicesList.find((s) => s.id === selectedServiceId) || servicesList[0];

  const quickComplaintPresets = [
    'Acute Fever & Body Aches',
    'Severe Toothache & Sensitivity',
    'Routine Check-up / Review',
    'BP & Blood Sugar Monitoring',
    'Stomach Ache & Nausea',
    'Wound Dressing & Injection',
    'Cough & Throat Infection'
  ];

  // Real-time lookup for returning patients by phone (digits only) or partial name
  const matchedPatients = useMemo(() => {
    if (!walkInPhone && !walkInName) return [];
    if (selectedExistingPatient) return [];
    const cleanPhone = walkInPhone.replace(/\D/g, '');
    const cleanName = walkInName.trim().toLowerCase();

    if (cleanPhone.length < 3 && cleanName.length < 2) return [];

    return patients.filter((p) => {
      const pDigits = (p.phone || '').replace(/\D/g, '');
      const phoneMatch = cleanPhone.length >= 3 && pDigits.includes(cleanPhone);
      const nameMatch = cleanName.length >= 2 && (p.name || '').toLowerCase().includes(cleanName);
      return phoneMatch || nameMatch;
    }).slice(0, 3);
  }, [patients, walkInPhone, walkInName, selectedExistingPatient]);

  const handleSelectExistingPatient = (patient) => {
    setSelectedExistingPatient(patient);
    setWalkInName(patient.name);
    setWalkInPhone(patient.phone);
    showToast(`Linked to existing patient record ${patient.patientIdNumber} (${patient.name})`);
  };

  const handleClearSelectedPatient = () => {
    setSelectedExistingPatient(null);
    setWalkInName('');
    setWalkInPhone('');
  };

  const walkInList = appointments.filter(
    (a) =>
      (!a.clinicId || a.clinicId === activeClinic?.id) &&
>>>>>>> origin/main
      (a.isWalkIn || a.queueNumber?.startsWith('#W-') || a.time?.toLowerCase().includes('immediate'))
  );

  const handleWalkInSubmit = (e) => {
    e.preventDefault();
    const tokenSeq = Math.floor(100 + Math.random() * 899);
    const queueNumber = `#W-${tokenSeq}`;

<<<<<<< HEAD
    // Auto-create patient record
    const patient = createPatient({
      name: walkInName,
      phone: walkInPhone,
      email: `${walkInName.toLowerCase().replace(/\s+/g, '.')}@walkin.demo`,
      gender: 'Other',
      dob: '1995-01-01',
      address: activeClinic.city
    });

    // Create checked-in appointment with queue token
    const apt = createAppointment({
      clinicId: activeClinic.id,
      branchId: activeBranch.id,
      doctorId: currentDoctor.id,
      doctorName: currentDoctor.name,
      patientId: patient.patientIdNumber,
      patientName: walkInName,
      patientPhone: walkInPhone,
      patientEmail: patient.email,
      serviceId: currentService.id,
      serviceName: currentService.name,
      date: '2026-10-23',
      time: 'Immediate / Next',
      status: 'Checked In',
      queueNumber,
      notes: chiefComplaint,
      isWalkIn: true
    });

    setIssuedTicket({
      token: queueNumber,
      patientName: walkInName,
      doctorName: currentDoctor.name,
      serviceName: currentService.name,
      timeIssued: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    showToast(`Walk-in queue token ${queueNumber} issued! Patient placed in waiting lounge.`);
    setWalkInName('');
    setWalkInPhone('');
=======
    let targetPatientId = selectedExistingPatient?.patientIdNumber || selectedExistingPatient?.id;
    let targetPatientEmail = selectedExistingPatient?.email;

    // If new patient, auto-register patient profile
    if (!selectedExistingPatient) {
      const newPatient = createPatient({
        name: walkInName,
        phone: walkInPhone,
        email: `${walkInName.toLowerCase().replace(/\s+/g, '.')}@walkin.demo`,
        gender: 'Other',
        dob: '1995-01-01',
        address: activeClinic?.city || 'Pune'
      });
      targetPatientId = newPatient.patientIdNumber;
      targetPatientEmail = newPatient.email;
    }

    // Create checked-in appointment with queue token
    createAppointment({
      clinicId: activeClinic?.id || 'clinic-citycare',
      branchId: activeBranch?.id || 'branch-1',
      doctorId: currentDoctor?.id || 'doc-1',
      doctorName: currentDoctor?.name || 'Dr. Arvind Rao',
      patientId: targetPatientId,
      patientName: walkInName,
      patientPhone: walkInPhone,
      patientEmail: targetPatientEmail,
      serviceId: currentService?.id || 'srv-1',
      serviceName: currentService?.name || 'Consultation',
      date: new Date().toISOString().slice(0, 10),
      time: 'Immediate / Next',
      status: 'Checked In',
      queueNumber,
      notes: chiefComplaint || 'Walk-in express token',
      isWalkIn: true
    });

    const ticketData = {
      token: queueNumber,
      patientName: walkInName,
      patientId: targetPatientId,
      doctorName: currentDoctor?.name || 'Dr. Arvind Rao',
      serviceName: currentService?.name || 'Consultation',
      serviceFee: currentService?.fee || 800,
      notes: chiefComplaint,
      timeIssued: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      dateIssued: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
      estimatedWaitMins: Math.max(5, walkInList.length * 12)
    };

    setIssuedTicket(ticketData);
    setShowSlipModal(true);

    showToast(`Walk-in queue token ${queueNumber} issued! Patient seated in waiting room.`);
    setWalkInName('');
    setWalkInPhone('');
    setSelectedExistingPatient(null);
>>>>>>> origin/main
    setChiefComplaint('');
  };

  return (
<<<<<<< HEAD
    <div className="max-w-5xl space-y-6">
      <div>
        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Front Desk Express Counter</span>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">Walk-In Patient Check-In & Token Issuer</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Rapidly register patients who arrive in-person without prior online booking. Issues instant queue token.
        </p>
=======
    <div className="max-w-6xl space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            Front Desk Express Counter
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">
            Walk-In Patient Check-In & Token Issuer
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Rapidly register in-person patients in under 30 seconds. Automatically matches returning patient records to prevent duplicates and prints 80mm thermal queue slips.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="teal" size="sm">
            {walkInList.length} Walk-Ins Today
          </Badge>
        </div>
>>>>>>> origin/main
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Walk-in Form */}
        <div className="lg:col-span-7">
          <Card className="p-6 border-slate-200 dark:border-slate-800 dark:bg-slate-900/90 shadow-sm space-y-5">
<<<<<<< HEAD
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">30-Second Express Walk-In Registration</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">Creates patient profile and immediately registers to waiting lounge</p>
              </div>
            </div>

            <form onSubmit={handleWalkInSubmit} className="space-y-4 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Patient Full Name *</label>
=======
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                  <Clock className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                    30-Second Express Walk-In Registration
                  </h2>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    Enter mobile number first to instantly retrieve existing medical record
                  </p>
                </div>
              </div>

              {selectedExistingPatient && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                  <Check className="w-3 h-3" /> Returning Patient
                </span>
              )}
            </div>

            <form onSubmit={handleWalkInSubmit} className="space-y-4 text-xs">
              {/* Returning Patient Found Banner */}
              {selectedExistingPatient ? (
                <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800/80 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <History className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                    <div>
                      <span className="font-bold text-emerald-900 dark:text-emerald-200 text-xs">
                        Linked: {selectedExistingPatient.name} ({selectedExistingPatient.patientIdNumber})
                      </span>
                      <p className="text-[11px] text-emerald-700 dark:text-emerald-400">
                        Past medical record linked · Blood: {selectedExistingPatient.bloodGroup || 'O+'} · {selectedExistingPatient.gender}
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleClearSelectedPatient}
                    className="p-1 rounded-lg text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 cursor-pointer text-[11px] font-semibold"
                  >
                    Change
                  </button>
                </div>
              ) : null}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Mobile / Phone with live match */}
                <div className="sm:col-span-2 space-y-1">
                  <label className="block font-semibold text-slate-700 dark:text-slate-300">
                    Mobile / WhatsApp Number *
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      required
                      type="tel"
                      value={walkInPhone}
                      onChange={(e) => setWalkInPhone(e.target.value)}
                      placeholder="+91 98000 00000"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 text-xs focus:ring-2 focus:ring-blue-500 font-mono"
                    />
                  </div>

                  {/* Matching returning patients pill chips */}
                  {matchedPatients.length > 0 && (
                    <div className="pt-2 p-2.5 rounded-xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/50 space-y-1.5">
                      <div className="flex items-center gap-1.5 text-[11px] font-bold text-blue-900 dark:text-blue-300">
                        <UserCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                        <span>Matching Existing Patients in Directory (Click to auto-fill):</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {matchedPatients.map((p) => (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => handleSelectExistingPatient(p)}
                            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-semibold bg-white dark:bg-slate-900 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-300 dark:border-blue-800 text-blue-950 dark:text-blue-200 shadow-xs cursor-pointer transition-colors"
                          >
                            <span>{p.name}</span>
                            <span className="font-mono text-[10px] text-blue-600 dark:text-blue-400">({p.patientIdNumber})</span>
                            <span className="text-emerald-600 font-bold">↵ Use</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Patient Full Name */}
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Patient Full Name *
                  </label>
>>>>>>> origin/main
                  <input
                    required
                    type="text"
                    value={walkInName}
                    onChange={(e) => setWalkInName(e.target.value)}
                    placeholder="Enter walk-in patient name..."
<<<<<<< HEAD
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 text-sm focus:ring-2 focus:ring-blue-500 font-medium"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Mobile / WhatsApp Number *</label>
                  <input
                    required
                    type="tel"
                    value={walkInPhone}
                    onChange={(e) => setWalkInPhone(e.target.value)}
                    placeholder="+91 98000 00000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 text-sm focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Assign Doctor *</label>
                  <select
                    value={selectedDoctorId}
                    onChange={(e) => setSelectedDoctorId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 text-sm focus:ring-2 focus:ring-blue-500"
                  >
                    {clinicDoctors.map((d) => (
                      <option key={d.id} value={d.id}>{d.name} ({d.specialty})</option>
=======
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 text-xs focus:ring-2 focus:ring-blue-500 font-medium"
                  />
                </div>

                {/* Assign Doctor */}
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Assign Doctor *
                  </label>
                  <select
                    value={selectedDoctorId}
                    onChange={(e) => setSelectedDoctorId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 text-xs focus:ring-2 focus:ring-blue-500"
                  >
                    {clinicDoctors.map((d) => (
                      <option key={d.id} value={d.id}>
                        {d.name} ({d.specialty})
                      </option>
>>>>>>> origin/main
                    ))}
                  </select>
                </div>

<<<<<<< HEAD
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Service / Reason *</label>
                  <select
                    value={selectedServiceId}
                    onChange={(e) => setSelectedServiceId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 text-sm focus:ring-2 focus:ring-blue-500"
                  >
                    {activeClinic.services.map((s) => (
                      <option key={s.id} value={s.id}>{s.name} (₹{s.fee})</option>
=======
                {/* Service / Consultation Fee */}
                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Service & Tariff *
                  </label>
                  <select
                    value={selectedServiceId}
                    onChange={(e) => setSelectedServiceId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 text-xs focus:ring-2 focus:ring-blue-500"
                  >
                    {servicesList.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.name} (₹{s.fee})
                      </option>
>>>>>>> origin/main
                    ))}
                  </select>
                </div>
              </div>

<<<<<<< HEAD
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Chief Complaint / Symptoms</label>
=======
              {/* Chief Complaint & Quick Chips */}
              <div className="space-y-2">
                <label className="block font-semibold text-slate-700 dark:text-slate-300">
                  Chief Complaint / Symptoms
                </label>
                <div className="flex flex-wrap gap-1.5 pb-1">
                  {quickComplaintPresets.map((chip) => (
                    <button
                      key={chip}
                      type="button"
                      onClick={() => setChiefComplaint((prev) => (prev ? `${prev}, ${chip}` : chip))}
                      className="px-2 py-1 rounded-md text-[10px] font-semibold bg-slate-100 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-blue-950/60 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 transition-colors cursor-pointer"
                    >
                      + {chip}
                    </button>
                  ))}
                </div>
>>>>>>> origin/main
                <textarea
                  rows={2}
                  value={chiefComplaint}
                  onChange={(e) => setChiefComplaint(e.target.value)}
                  placeholder="e.g. Toothache since yesterday; acute pain..."
<<<<<<< HEAD
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 text-sm focus:ring-2 focus:ring-blue-500"
=======
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 text-xs focus:ring-2 focus:ring-blue-500"
>>>>>>> origin/main
                />
              </div>

              <Button
                variant="primary"
                size="md"
                type="submit"
<<<<<<< HEAD
                className="w-full font-bold shadow-md shadow-blue-500/20"
              >
                Issue Token & Seat in Waiting Room
=======
                className="w-full font-bold shadow-md shadow-blue-500/20 py-2.5 text-xs"
              >
                Issue Token & Seat Patient in Waiting Lounge
>>>>>>> origin/main
              </Button>
            </form>
          </Card>
        </div>

<<<<<<< HEAD
        {/* Issued Queue Ticket Display */}
        <div className="lg:col-span-5 space-y-4">
          {issuedTicket ? (
            <Card className="p-6 border-blue-400 dark:border-blue-600/50 bg-blue-50/50 dark:bg-blue-950/20 text-center space-y-4 shadow-lg">
              <span className="text-xs uppercase font-bold text-blue-700 dark:text-blue-400 tracking-wider">
                Current Issued Queue Ticket
              </span>
              <div className="py-2">
                <span className="text-4xl font-extrabold text-blue-900 dark:text-blue-300 font-mono tracking-tight">
                  {issuedTicket.token}
                </span>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Issued at {issuedTicket.timeIssued}</p>
              </div>

              <div className="p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-blue-200 dark:border-blue-900/60 text-sm text-left space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 dark:text-slate-400">Patient:</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100">{issuedTicket.patientName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 dark:text-slate-400">Doctor:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{issuedTicket.doctorName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 dark:text-slate-400">Service:</span>
                  <span className="text-slate-700 dark:text-slate-300 font-medium">{issuedTicket.serviceName}</span>
=======
        {/* Issued Queue Ticket Display / Thermal Card */}
        <div className="lg:col-span-5 space-y-4">
          {issuedTicket ? (
            <Card className="p-5 border-blue-300 dark:border-blue-700/60 bg-blue-50/40 dark:bg-blue-950/20 text-center space-y-4 shadow-lg">
              <div className="flex items-center justify-between border-b border-blue-200 dark:border-blue-900/60 pb-2">
                <span className="text-[11px] uppercase font-bold text-blue-700 dark:text-blue-400 tracking-wider">
                  Active Walk-in Token
                </span>
                <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400">
                  {issuedTicket.timeIssued}
                </span>
              </div>

              <div className="py-2">
                <span className="text-4xl sm:text-5xl font-black text-blue-950 dark:text-blue-200 font-mono tracking-tight">
                  {issuedTicket.token}
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                  Estimated Wait: ~{issuedTicket.estimatedWaitMins} mins
                </p>
              </div>

              {/* 80mm Slip Preview in Card */}
              <div className="p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-xs text-left space-y-2 font-mono">
                <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
                  <span className="text-slate-400">Patient:</span>
                  <span className="font-bold text-slate-900 dark:text-white">{issuedTicket.patientName}</span>
                </div>
                <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
                  <span className="text-slate-400">Patient ID:</span>
                  <span className="text-blue-700 dark:text-blue-400 font-semibold">{issuedTicket.patientId}</span>
                </div>
                <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
                  <span className="text-slate-400">Doctor:</span>
                  <span className="font-semibold">{issuedTicket.doctorName}</span>
                </div>
                <div className="flex justify-between items-center text-slate-700 dark:text-slate-300">
                  <span className="text-slate-400">Service:</span>
                  <span>{issuedTicket.serviceName} (₹{issuedTicket.serviceFee})</span>
>>>>>>> origin/main
                </div>
              </div>

              <div className="flex items-center justify-center gap-2 pt-1">
<<<<<<< HEAD
                <Button variant="outline" size="sm" icon={Printer} onClick={() => window.print()}>
                  Print Thermal Ticket
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setIssuedTicket(null)}>
                  Clear
=======
                <Button
                  variant="primary"
                  size="sm"
                  icon={Printer}
                  onClick={() => setShowSlipModal(true)}
                  className="font-bold text-xs"
                >
                  View 80mm Thermal Slip
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setIssuedTicket(null)} className="text-xs">
                  Dismiss
>>>>>>> origin/main
                </Button>
              </div>
            </Card>
          ) : (
            <Card className="p-8 border-dashed border-slate-300 dark:border-slate-800 dark:bg-slate-900/40 text-center space-y-3 text-slate-400 dark:text-slate-500">
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
                <Clock className="w-6 h-6" />
              </div>
<<<<<<< HEAD
              <p className="font-semibold text-slate-700 dark:text-slate-300 text-sm">No active walk-in ticket selected</p>
              <p className="text-xs max-w-xs mx-auto">Complete the form to register a walk-in patient and issue a thermal queue slip.</p>
            </Card>
          )}

          {/* Architecture note */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 space-y-1.5">
            <p className="font-bold text-slate-700 dark:text-slate-300">Offline-Ready Architecture Specification</p>
            <p className="leading-relaxed">
              Designed for future client-side service worker synchronization. In intermittent connectivity, walk-in tokens queue in memory and reconcile with backend authoritative IDs upon network reconnect.
=======
              <p className="font-semibold text-slate-700 dark:text-slate-300 text-sm">
                No active walk-in ticket selected
              </p>
              <p className="text-xs max-w-xs mx-auto">
                Complete the registration form to issue an instant queue ticket and print an 80mm POS thermal receipt.
              </p>
            </Card>
          )}

          {/* Quick tip box */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-300">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Duplicate Record Prevention Active</span>
            </div>
            <p className="leading-relaxed text-[11px]">
              Entering a mobile number checks the database for prior consultations. If a match exists, clicking "Use" links the patient's existing history, preventing split electronic medical records.
>>>>>>> origin/main
            </p>
          </div>
        </div>
      </div>

<<<<<<< HEAD
=======
      {/* 80mm Thermal Slip Modal */}
      {showSlipModal && issuedTicket && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fade-in"
          onClick={() => setShowSlipModal(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white text-slate-900 rounded-2xl shadow-2xl max-w-sm w-full p-6 border border-slate-200 space-y-4"
          >
            {/* Modal Controls */}
            <div className="flex items-center justify-between pb-2 border-b border-slate-200 no-print">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                80mm Thermal Slip Preview
              </span>
              <button
                type="button"
                onClick={() => setShowSlipModal(false)}
                className="p-1 rounded-md text-slate-400 hover:text-slate-700"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Printable 80mm Slip */}
            <div className="thermal-receipt p-4 bg-white rounded-lg border border-dashed border-slate-400 font-mono text-center text-xs space-y-3">
              <div>
                <h3 className="font-black text-sm uppercase tracking-tight text-slate-900">
                  {activeClinic?.name || 'CityCare Family Clinic'}
                </h3>
                <p className="text-[10px] text-slate-600">{activeClinic?.address || '14 Central Health Arcade, FC Road, Pune'}</p>
                <p className="text-[10px] text-slate-600">Ph: {activeClinic?.phone || '+91 98220 12345'}</p>
              </div>

              <div className="border-t border-b border-dashed border-slate-400 py-3">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">Queue Token Number</span>
                <span className="text-4xl font-black text-slate-950 tracking-tighter block mt-0.5">
                  {issuedTicket.token}
                </span>
                <span className="text-[10px] text-slate-500 block mt-1">
                  Est. Wait: ~{issuedTicket.estimatedWaitMins} mins · {issuedTicket.timeIssued}
                </span>
              </div>

              <div className="text-left text-[11px] space-y-1 py-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Patient:</span>
                  <span className="font-bold">{issuedTicket.patientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Patient ID:</span>
                  <span className="font-semibold">{issuedTicket.patientId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Doctor:</span>
                  <span className="font-bold">{issuedTicket.doctorName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Service:</span>
                  <span>{issuedTicket.serviceName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Consult Fee:</span>
                  <span className="font-bold">₹{issuedTicket.serviceFee}</span>
                </div>
              </div>

              {/* Simulated QR Code for Live Smartphone Queue Tracker */}
              <div className="pt-2 border-t border-dashed border-slate-300 flex flex-col items-center gap-1.5">
                <div className="w-16 h-16 bg-slate-900 p-1.5 rounded-lg text-white flex items-center justify-center">
                  <QrCode className="w-12 h-12" />
                </div>
                <p className="text-[9.5px] text-slate-600 leading-tight">
                  Scan QR with camera to track live waiting queue on your smartphone
                </p>
                <p className="text-[9px] text-slate-400 italic">
                  Thank you for visiting. Please be seated in lounge.
                </p>
              </div>
            </div>

            {/* Print button */}
            <div className="flex items-center gap-2 pt-2 no-print">
              <Button
                variant="primary"
                size="sm"
                icon={Printer}
                onClick={() => window.print()}
                className="w-full font-bold text-xs"
              >
                Print 80mm Slip
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSlipModal(false)}
                className="text-xs"
              >
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

>>>>>>> origin/main
      {/* Today's Walk-in Queue Roster Table */}
      <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Today's Walk-In Queue & Token Roster ({walkInList.length})
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
<<<<<<< HEAD
              Live token stream of in-person patients queued at front reception desk
=======
              Live token stream of in-person patients registered at front reception desk
>>>>>>> origin/main
            </p>
          </div>
          <Badge variant="teal" size="sm">Front Desk Live Stream</Badge>
        </div>

        <Card className="overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="px-3.5 py-3 text-center w-12 font-semibold">#</th>
                  <th className="px-4 py-3">Queue Token</th>
                  <th className="px-4 py-3">Patient & Contact</th>
                  <th className="px-4 py-3">Attending Physician</th>
                  <th className="px-4 py-3">Service & Tariff</th>
                  <th className="px-4 py-3">Registered Slot</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {walkInList.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-8 text-center text-slate-400 dark:text-slate-500">
                      No walk-in tokens issued yet today. Complete the registration form above to issue tokens.
                    </td>
                  </tr>
                ) : (
                  walkInList.map((apt, idx) => (
                    <tr key={apt.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="px-3.5 py-3 text-center font-mono font-medium text-slate-400 dark:text-slate-500 text-xs">
                        {idx + 1}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="font-mono font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-md border border-blue-200 dark:border-blue-900">
<<<<<<< HEAD
                          {apt.queueNumber || '#W-101'}
=======
                          {apt.queueNumber || `#W-${100 + idx}`}
>>>>>>> origin/main
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="font-bold text-slate-900 dark:text-white">{apt.patientName}</div>
<<<<<<< HEAD
                        <div className="text-[11px] text-slate-400 dark:text-slate-500">{apt.patientPhone}</div>
=======
                        <div className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">{apt.patientPhone}</div>
>>>>>>> origin/main
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap font-medium text-slate-700 dark:text-slate-300">
                        {apt.doctorName || 'Dr. Arvind Rao'}
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-medium text-slate-800 dark:text-slate-200">{apt.serviceName}</div>
                        {apt.notes && (
                          <div className="text-[11px] text-slate-400 dark:text-slate-500 italic truncate max-w-xs">
                            {apt.notes}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap font-mono text-[11px] text-slate-500 dark:text-slate-400">
                        {apt.time || 'Immediate'}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <Badge
                          variant={
                            apt.status === 'Completed' ? 'success' :
                            apt.status === 'In Progress' ? 'warning' : 'teal'
                          }
                          size="sm"
                        >
                          {apt.status || 'Checked In'}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <Button
                          variant="outline"
                          size="sm"
                          icon={Printer}
                          className="text-xs h-7 px-2.5"
                          onClick={() => {
                            setIssuedTicket({
<<<<<<< HEAD
                              token: apt.queueNumber || '#W-101',
                              patientName: apt.patientName,
                              doctorName: apt.doctorName || 'Dr. Arvind Rao',
                              serviceName: apt.serviceName,
                              timeIssued: '10:30 AM'
                            });
                            window.print();
=======
                              token: apt.queueNumber || `#W-${100 + idx}`,
                              patientName: apt.patientName,
                              patientId: apt.patientId || 'PT-1041',
                              doctorName: apt.doctorName || 'Dr. Arvind Rao',
                              serviceName: apt.serviceName || 'Consultation',
                              serviceFee: 800,
                              notes: apt.notes,
                              timeIssued: '10:30 AM',
                              dateIssued: new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }),
                              estimatedWaitMins: 15
                            });
                            setShowSlipModal(true);
>>>>>>> origin/main
                          }}
                        >
                          Slip
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
<<<<<<< HEAD

=======
>>>>>>> origin/main

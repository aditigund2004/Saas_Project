import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

import {
  Stethoscope,
  Save,
  CheckCircle2,
  Plus,
  Trash2,
  Clock,
  Sparkles,
  User,
  AlertTriangle,
  History,

  FileText,
  Calendar,
  ArrowLeft,
  QrCode,
  Receipt,
  Printer
} from 'lucide-react';

export function DoctorConsultationPage() {
  const { appointmentId } = useParams();
  const navigate = useNavigate();

  const {
    appointments,
    patients,
    currentUser,
    activeClinic,
    saveEncounterDraft,
    finalizeEncounter,
    encounters,
    prescriptions,
    invoices,
    createInvoice,
    updateAppointmentStatus,
    openPrescriptionModal,
    showToast
  } = useApp();

  // Find target appointment or default to first waiting
  const targetAppointment = appointmentId
    ? appointments.find((a) => a.id === appointmentId)
    : appointments.find((a) => a.status === 'Checked In' || a.status === 'Patient Checked In' || a.status === 'In Progress' || a.status === 'In Consultation') || appointments[0];

  const targetPatient = patients.find((p) => p.id === targetAppointment?.patientId) || patients[0];

  // Mark appointment as in consultation when opened
  useEffect(() => {
    if (targetAppointment && ['Confirmed', 'Checked In', 'Patient Checked In'].includes(targetAppointment.status)) {
      updateAppointmentStatus(targetAppointment.id, 'In Consultation');
    }
  }, [targetAppointment?.id]);

  // Existing encounter if draft or finalized
  const existingEncounter = encounters.find((e) => e.appointmentId === targetAppointment?.id);

  // Form State
  const [presentingComplaint, setPresentingComplaint] = useState(
    existingEncounter?.chiefComplaint || targetAppointment?.notes || 'Severe pain in right lower molar for past 3 days. Sensitive to cold and hot liquids.'
  );

  const [vitals, setVitals] = useState(
    existingEncounter?.vitals || {
      bp: '124/82 mmHg',
      pulse: '76 bpm',
      temp: '98.6 °F',
      spO2: '99%',
      weight: '68 kg'
    }
  );

  const [clinicalFindings, setClinicalFindings] = useState(
    existingEncounter?.clinicalFindings || 'Deep disto-occlusal caries on tooth #46. Tender to percussion. Vitality cold response lingering.'
  );

  const [diagnosis, setDiagnosis] = useState(
    existingEncounter?.diagnosis || 'Acute Irreversible Pulpitis of #46 with Symptomatic Apical Periodontitis'
  );

  const [treatmentPlan, setTreatmentPlan] = useState(
    existingEncounter?.treatmentPlan || 'Single-visit Endodontic Therapy (RCT) under Local Anesthesia followed by Core Buildup and Full Zirconia Crown.'
  );

  const [followUpDate, setFollowUpDate] = useState(
    existingEncounter?.followUpDate || '2026-10-30'
  );

  const [isFinalized, setIsFinalized] = useState(
    existingEncounter ? !existingEncounter.isDraft : false
  );

  // Medication Composer State
  const defaultMedications = existingEncounter?.medications || [
    {
      id: 'med-1',
      name: 'Amoxicillin + Clavulanic Acid (Augmentin)',
      strength: '625 mg',
      dosage: '1 Tab',
      route: 'Oral, after meals',
      frequency: 'Twice a day (1-0-1)',
      duration: '5 days',

      quantity: '10 Tablets',
      instructions: 'Complete full course. Avoid skipping doses.'
    },
    {
      id: 'med-2',
      name: 'Ketorolac Tromethamine (Ketorol-DT)',
      strength: '10 mg',
      dosage: '1 Tab',
      route: 'Oral, dispersible in water',
      frequency: 'Thrice daily SOS (1-0-1)',
      duration: '3 days',

      quantity: '6 Tablets',
      instructions: 'Take strictly after meals for severe pain relief only.'
    }
  ];

  const [medications, setMedications] = useState(defaultMedications);


  const handleAddMedication = () => {
    const newMed = {
      id: `med-${Date.now()}`,
      name: '',
      strength: '500 mg',
      dosage: '1 Tablet',
      route: 'Oral, after meals',
      frequency: 'Twice daily (1-0-1)',
      duration: '5 days',
      quantity: '10',
      instructions: 'Take with warm water.'

    };
    setMedications([...medications, newMed]);
  };


  const handleRemoveMedication = (id) => {
    setMedications(medications.filter((m) => m.id !== id));
  };

  const handleMedChange = (id, field, value) => {
    setMedications(
      medications.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  const applyDrugPreset = (presetName) => {
    if (presetName === 'paracetamol') {
      setMedications([
        ...medications,
        {
          id: `med-${Date.now()}`,
          name: 'Paracetamol (Dolo 650)',
          strength: '650 mg',
          dosage: '1 Tab',
          route: 'Oral, after food',
          frequency: 'Thrice a day (1-1-1)',
          duration: '3 days',
          quantity: '9 Tablets',
          instructions: 'Take for mild pain or body fever.'
        }
      ]);
      showToast('Paracetamol 650mg added to composer.');
    } else if (presetName === 'pantoprazole') {
      setMedications([
        ...medications,
        {
          id: `med-${Date.now()}`,
          name: 'Pantoprazole Gastro-Resistant (Pan-40)',
          strength: '40 mg',
          dosage: '1 Tab',
          route: 'Oral, empty stomach',
          frequency: 'Once daily morning (1-0-0)',
          duration: '5 days',
          quantity: '5 Tablets',
          instructions: 'Take 30 minutes before breakfast.'
        }
      ]);
      showToast('Pantoprazole 40mg added to composer.');
    }
  };

  // Actions
  const handleSaveDraft = (e) => {
    e.preventDefault();

    const payload = {
      appointmentId: targetAppointment?.id || 'apt-manual',
      patientId: targetPatient.id,
      patientName: targetPatient.name,
      patientAgeGender: `${targetPatient.gender}, DOB: ${targetPatient.dob}`,
      doctorId: currentUser.id,
      doctorName: currentUser.name || 'Dr. Arvind Rao, MDS',
      chiefComplaint: presentingComplaint,
      vitals,
      clinicalFindings,
      diagnosis,
      treatmentPlan,
      medications,
      followUpDate,
      notes: 'Draft clinical encounter saved by attending doctor.'
    };
    saveEncounterDraft(payload);
    setIsFinalized(false);
  };

  const handleFinalize = (e) => {

    e.preventDefault();
    if (!diagnosis.trim()) {
      showToast('Please enter an assessment / diagnosis before finalization.', 'error');
      return;
    }

    const payload = {
      appointmentId: targetAppointment?.id || 'apt-manual',
      patientId: targetPatient.id,
      patientName: targetPatient.name,
      patientAgeGender: `${targetPatient.gender}, DOB: ${targetPatient.dob}`,
      doctorId: currentUser.id,
      doctorName: currentUser.name || 'Dr. Arvind Rao, MDS',
      chiefComplaint: presentingComplaint,
      vitals,
      clinicalFindings,
      diagnosis,
      treatmentPlan,
      medications,
      followUpDate,
      notes: 'Finalized and digitally signed for clinic record.'
    };
    finalizeEncounter(payload);
    setIsFinalized(true);


    // Automatically generate OPD invoice for this completed encounter if not already issued
    const hasInvoice = invoices.some(
      (i) => i.appointmentId === targetAppointment?.id || (i.patientName === targetPatient?.name && i.date === new Date().toISOString().slice(0, 10))
    );
    if (!hasInvoice) {
      createInvoice({
        clinicId: activeClinic?.id || 'clinic-citycare',
        patientId: targetPatient.patientIdNumber || targetPatient.id,
        patientName: targetPatient.name,
        patientPhone: targetPatient.phone,
        appointmentId: targetAppointment?.id,
        date: new Date().toISOString().slice(0, 10),
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
        items: [
          {
            id: `item-${Date.now()}`,
            description: `Clinical Consultation (${targetAppointment?.serviceName || 'General OPD'})`,
            quantity: 1,
            unitPrice: targetAppointment?.fee || 800,
            total: targetAppointment?.fee || 800
          }
        ],
        subtotal: targetAppointment?.fee || 800,
        discount: 0,
        tax: 0,
        totalAmount: targetAppointment?.fee || 800,
        amountPaid: 0,
        status: 'Issued',
        paymentMethod: 'Unpaid'
      });
      showToast('Encounter finalized! E-Prescription issued and OPD Invoice generated.');

    }
  };

  // Find issued prescription for this patient if already finalized
  const issuedRx = prescriptions.find((p) => p.patientName === targetPatient?.name);

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Top Header & Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <Link to="/doctor/dashboard">

            <Button variant="secondary" size="sm" className="px-2">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
                Clinical Consultation & Rx Composer
              </h1>
              {isFinalized ? (
                <Badge variant="success" size="sm" className="flex items-center gap-1 font-bold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Finalized & Issued
                </Badge>
              ) : (
                <Badge variant="warning" size="sm" className="flex items-center gap-1 font-bold">
                  <Clock className="w-3.5 h-3.5" /> Active Draft
                </Badge>
              )}
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Encounter for {targetPatient?.name} · Ref: {targetAppointment?.referenceNumber || 'APT-2601'}

            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {!isFinalized && (
            <Button variant="secondary" size="sm" onClick={handleSaveDraft} type="button">
              <Save className="w-3.5 h-3.5 mr-1 text-slate-600 dark:text-slate-300" />
              Save Draft
            </Button>
          )}
          {isFinalized && (
            <>
              {issuedRx && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => openPrescriptionModal(issuedRx)}
                  type="button"
                >
                  <Printer className="w-3.5 h-3.5 mr-1 text-slate-600 dark:text-slate-300" />
                  Print Rx
                </Button>
              )}
              <Link to="/clinic/finance/invoices">
                <Button variant="outline" size="sm">
                  <Receipt className="w-3.5 h-3.5 mr-1 text-slate-600 dark:text-slate-300" />
                  OPD Invoice
                </Button>
              </Link>
            </>
          )}
          <Button
            variant="primary"
            size="sm"
            onClick={handleFinalize}
            className={isFinalized ? 'bg-emerald-700 hover:bg-emerald-800' : 'bg-blue-600 hover:bg-blue-700'}
            type="button"
          >
            <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
            {isFinalized ? 'Re-Finalize Encounter' : 'Finalize & Issue Rx & Invoice'}

          </Button>
        </div>
      </div>

      {/* Demo Watermark Banner */}
      <div className="p-3 bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 rounded-xl text-xs text-amber-900 dark:text-amber-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
          <span>
            <strong>Synthetic Demonstration Record:</strong> Simulated clinical workflow for ClinicOS SaaS evaluation. Never use for actual medical diagnoses or treatments.
          </span>
        </div>
        <span className="font-mono text-[10px] text-amber-800 dark:text-amber-300 uppercase font-bold">
          DEMO MODE
        </span>
      </div>

      {/* Patient Demographic Summary Strip */}
      <Card className="p-4 border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/50">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block">Patient Name</span>
            <span className="font-bold text-slate-900 dark:text-white">{targetPatient?.name}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block">Patient ID / Gender</span>
            <span className="font-medium text-slate-700 dark:text-slate-300">{targetPatient?.patientIdNumber} · {targetPatient?.gender}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block">Blood Group</span>
            <span className="font-bold text-rose-700 dark:text-rose-400">{targetPatient?.bloodGroup || 'O +ve'}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block">Known Allergies</span>
            <span className="font-bold text-amber-700 dark:text-amber-300 bg-amber-100/70 dark:bg-amber-950/40 px-1.5 py-0.5 rounded text-[11px] inline-block">
              {targetPatient?.allergies?.join(', ') || 'Sulfa Drugs'}
            </span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block">Phone</span>
            <span className="text-slate-700 dark:text-slate-300 font-mono">{targetPatient?.phone}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block">Attending Clinician</span>
            <span className="font-semibold text-blue-800 dark:text-blue-400">{currentUser?.name || 'Dr. Arvind Rao'}</span>

          </div>
        </div>
      </Card>

      {/* Main Consultation Form */}
      <form onSubmit={handleFinalize} className="space-y-6">

        {/* Vitals Bar */}
        <Card className="p-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
          <span className="text-xs font-bold text-slate-800 dark:text-white uppercase tracking-wider flex items-center gap-1.5">
            <Stethoscope className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            Patient Clinical Vitals
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-1">
            <div>
              <label className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">Blood Pressure</label>
              <input
                type="text"
                value={vitals.bp}
                onChange={(e) => setVitals({ ...vitals, bp: e.target.value })}
                placeholder="120/80 mmHg"
                className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono font-medium focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">Pulse Rate</label>
              <input
                type="text"
                value={vitals.pulse}
                onChange={(e) => setVitals({ ...vitals, pulse: e.target.value })}
                placeholder="72 bpm"
                className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono font-medium focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">Temperature</label>
              <input
                type="text"
                value={vitals.temp}
                onChange={(e) => setVitals({ ...vitals, temp: e.target.value })}
                placeholder="98.6 °F"
                className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono font-medium focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">SpO2</label>
              <input
                type="text"
                value={vitals.spO2}
                onChange={(e) => setVitals({ ...vitals, spO2: e.target.value })}
                placeholder="99%"
                className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono font-medium focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">Body Weight</label>
              <input
                type="text"
                value={vitals.weight}
                onChange={(e) => setVitals({ ...vitals, weight: e.target.value })}
                placeholder="68 kg"
                className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-mono font-medium focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </Card>

        {/* Complaints, Findings & Diagnosis */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <label className="text-xs font-bold text-slate-800 dark:text-white">Presenting Chief Complaints *</label>

            <textarea
              required
              rows={3}
              value={presentingComplaint}
              onChange={(e) => setPresentingComplaint(e.target.value)}
              placeholder="Record chief complaints in patient's words..."

              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </Card>

          <Card className="p-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <label className="text-xs font-bold text-slate-800 dark:text-white">Clinical Examination & Findings</label>

            <textarea
              rows={3}
              value={clinicalFindings}
              onChange={(e) => setClinicalFindings(e.target.value)}
              placeholder="Objective findings, oral inspection, percussion..."

              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </Card>
        </div>

        {/* Assessment, Diagnosis & Treatment Plan */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <label className="text-xs font-bold text-slate-800 dark:text-white">Clinical Diagnosis / ICD Description *</label>

            <input
              required
              type="text"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              placeholder="e.g. Acute Irreversible Pulpitis of #46"
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-semibold text-blue-900 dark:text-blue-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <span className="text-[10px] text-slate-400 dark:text-slate-500">Required for prescription generator and patient summary</span>
          </Card>

          <Card className="p-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <label className="text-xs font-bold text-slate-800 dark:text-white">Treatment Plan & Procedures</label>

            <input
              type="text"
              value={treatmentPlan}
              onChange={(e) => setTreatmentPlan(e.target.value)}
              placeholder="e.g. RCT single sitting under LA, core buildup"
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <span className="text-[10px] text-slate-400 dark:text-slate-500">Summarizes proposed clinical interventions</span>
          </Card>
        </div>


        {/* Prescription Composer Section */}
        <Card className="p-5 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Digital Prescription Composer
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Prescribe medications with dosage, frequency, route, and specific patient instructions.
              </p>
            </div>

            {/* Quick Presets */}
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] text-slate-400 dark:text-slate-500 font-semibold">Quick Presets:</span>
              <button
                type="button"
                onClick={() => applyDrugPreset('paracetamol')}
                className="text-[11px] px-2 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-md cursor-pointer font-medium"
              >
                + Dolo 650
              </button>
              <button
                type="button"
                onClick={() => applyDrugPreset('pantoprazole')}
                className="text-[11px] px-2 py-1 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-md cursor-pointer font-medium"
              >
                + Pan 40
              </button>
            </div>
          </div>

          {/* Medication Rows */}
          <div className="space-y-3">
            {medications.map((med, index) => (
              <div
                key={med.id}
                className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-blue-300 dark:hover:border-blue-600 transition-colors space-y-2.5 shadow-xs"
              >
                <div className="flex items-center justify-between gap-2">
                  <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 font-bold text-[10px] flex items-center justify-center">
                    {index + 1}
                  </span>
                  <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2">
                    <input
                      type="text"
                      value={med.name}
                      onChange={(e) => handleMedChange(med.id, 'name', e.target.value)}
                      placeholder="Medication Name (e.g. Augmentin)"
                      className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 font-bold text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      value={med.strength}
                      onChange={(e) => handleMedChange(med.id, 'strength', e.target.value)}
                      placeholder="Strength (e.g. 625 mg)"
                      className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      value={med.dosage}
                      onChange={(e) => handleMedChange(med.id, 'dosage', e.target.value)}
                      placeholder="Dosage (e.g. 1 Tablet)"
                      className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveMedication(med.id)}
                    className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                    title="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
                  <div>
                    <label className="text-[10px] text-slate-400 dark:text-slate-500 block font-medium">Frequency</label>
                    <input
                      type="text"
                      value={med.frequency}
                      onChange={(e) => handleMedChange(med.id, 'frequency', e.target.value)}
                      placeholder="Twice a day (1-0-1)"
                      className="w-full text-[11px] px-2 py-1 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 dark:text-slate-500 block font-medium">Duration</label>
                    <input
                      type="text"
                      value={med.duration}
                      onChange={(e) => handleMedChange(med.id, 'duration', e.target.value)}
                      placeholder="5 days"
                      className="w-full text-[11px] px-2 py-1 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 dark:text-slate-500 block font-medium">Route / Timing</label>
                    <input
                      type="text"
                      value={med.route}
                      onChange={(e) => handleMedChange(med.id, 'route', e.target.value)}
                      placeholder="Oral, after meals"
                      className="w-full text-[11px] px-2 py-1 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 dark:text-slate-500 block font-medium">Quantity</label>
                    <input
                      type="text"
                      value={med.quantity}
                      onChange={(e) => handleMedChange(med.id, 'quantity', e.target.value)}
                      placeholder="10 Tablets"
                      className="w-full text-[11px] px-2 py-1 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100"
                    />
                  </div>
                </div>

                <div>
                  <input
                    type="text"
                    value={med.instructions}
                    onChange={(e) => handleMedChange(med.id, 'instructions', e.target.value)}
                    placeholder="Specific patient instructions (e.g. Swallow whole with water, avoid alcohol)..."
                    className="w-full text-[11px] px-2.5 py-1 rounded-md border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 italic"
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 flex justify-start">

            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleAddMedication}
              className="text-xs"

            >
              <Plus className="w-3.5 h-3.5 mr-1" />
              Add Medication Row
            </Button>
          </div>
        </Card>

        {/* Follow-up Date & Bottom Actions */}
        <Card className="p-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <div>
              <label className="text-xs font-bold text-slate-800 dark:text-white block">Scheduled Review / Follow-Up Date</label>

              <input
                type="date"
                value={followUpDate}
                onChange={(e) => setFollowUpDate(e.target.value)}
                className="text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-medium text-slate-800 dark:text-slate-200 mt-1 focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            {!isFinalized && (
              <Button variant="secondary" size="md" onClick={handleSaveDraft} type="button">
                <Save className="w-4 h-4 mr-1 text-slate-600 dark:text-slate-300" />
                Save Draft
              </Button>
            )}
            <Button
              variant="primary"
              size="md"
              type="submit"
              className={isFinalized ? 'bg-emerald-700 hover:bg-emerald-800' : 'bg-blue-600 hover:bg-blue-700 font-bold'}
            >
              <CheckCircle2 className="w-4 h-4 mr-1.5" />
              {isFinalized ? 'Consultation Finalized' : 'Finalize Demonstration Record'}

            </Button>
          </div>
        </Card>
      </form>

      {/* Finalized Record Preview with QR Badge */}
      {isFinalized && issuedRx && (
        <Card className="p-5 border-2 border-emerald-400 dark:border-emerald-800 bg-emerald-50/40 dark:bg-emerald-950/20 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-emerald-200 dark:border-emerald-900/50 pb-2">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h3 className="font-bold text-sm text-emerald-950 dark:text-emerald-100">
                Official Digital Prescription Issued ({issuedRx.prescriptionNumber})
              </h3>
            </div>
            <Link to={`/verify-prescription/${issuedRx.verificationId}`} target="_blank">
              <Button variant="secondary" size="sm" className="bg-white dark:bg-slate-900 text-emerald-800 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800 text-xs">
                <QrCode className="w-3.5 h-3.5 mr-1" />
                Verify QR Code Authenticity
              </Button>
            </Link>
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-300">
            This digital record has been cryptographically generated in the simulated clinic vault. The patient can access it via the ClinicOS Patient Portal or pharmacy QR scan.
          </p>
        </Card>
      )}
    </div>
  );
}



import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import {
  Stethoscope,
  Save,
  CheckCircle2,
  Plus,
  Trash2,
  Copy,
  Clock,
  Sparkles,
  AlertTriangle,
  FileText,
  Calendar,
  ArrowLeft,
  QrCode,
  Receipt,
  Printer,
  Search,
  Check,
  AlertCircle
} from 'lucide-react';
import {
  INDIAN_DRUG_FORMULARY,
  CLINICAL_CONDITION_TEMPLATES,
  FREQUENCY_CHIPS,
  DURATION_CHIPS,
  ROUTE_TIMING_CHIPS
} from './clinicalPrescriptionData';
import { VoiceDictationButton } from '../../components/medical/VoiceDictationButton';
import { PrescriptionSafetyAlerts } from '../../components/medical/PrescriptionSafetyAlerts';
import { checkPrescriptionSafety } from '../../services/prescriptionSafetyService';

export function DoctorConsultationPage() {
  const { appointmentId } = useParams();
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
      name: 'Augmentin 625 (Amoxicillin + Clavulanic Acid)',
      strength: '625 mg',
      dosage: '1 Tablet',
      route: 'Oral, after meals',
      frequency: 'Twice daily (1-0-1)',
      duration: '5 Days',
      quantity: '10 Tablets',
      instructions: 'Complete full course. Avoid skipping doses.'
    },
    {
      id: 'med-2',
      name: 'Ketorol-DT (Ketorolac Tromethamine)',
      strength: '10 mg',
      dosage: '1 Tablet',
      route: 'Oral, dispersible in water',
      frequency: 'Thrice daily SOS (1-1-1)',
      duration: '3 Days',
      quantity: '6 Tablets',
      instructions: 'Take strictly after meals for severe pain relief only.'
    }
  ];

  const [medications, setMedications] = useState(defaultMedications);

  // Active searching drug state for autocomplete dropdown
  const [activeSearchMedIndex, setActiveSearchMedIndex] = useState(null);
  const [drugSearchQuery, setDrugSearchQuery] = useState('');

  // Finalize confirmation modal
  const [isFinalizeModalOpen, setIsFinalizeModalOpen] = useState(false);
  const [clinicalOverride, setClinicalOverride] = useState(false);
  const [overrideReason, setOverrideReason] = useState('');

  const patientAllergiesText = (targetPatient?.allergies || []).join(', ');
  const safetyAnalysis = checkPrescriptionSafety(medications, patientAllergiesText);

  // Add a blank medication row
  const handleAddMedication = () => {
    const newMed = {
      id: `med-${Date.now()}`,
      name: '',
      strength: '500 mg',
      dosage: '1 Tablet',
      route: 'Oral, after meals',
      frequency: 'Twice daily (1-0-1)',
      duration: '5 Days',
      quantity: '10 Tablets',
      instructions: 'Take with warm water after food.'
    };
    setMedications([...medications, newMed]);
  };

  // Duplicate an existing medication row
  const handleDuplicateMedication = (med) => {
    const copy = {
      ...med,
      id: `med-${Date.now()}`
    };
    setMedications([...medications, copy]);
    showToast(`Duplicated ${med.name || 'medication'}.`, 'info');
  };

  const handleRemoveMedication = (id) => {
    setMedications(medications.filter((m) => m.id !== id));
  };

  const handleMedChange = (id, field, value) => {
    setMedications(
      medications.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  // Select item from Indian formulary drop-down
  const handleSelectFormularyDrug = (index, drug) => {
    const updated = [...medications];
    updated[index] = {
      ...updated[index],
      name: drug.name,
      strength: drug.strength,
      dosage: drug.dosage,
      route: drug.route,
      frequency: drug.frequency,
      duration: drug.duration,
      quantity: drug.quantity,
      instructions: drug.instructions
    };
    setMedications(updated);
    setActiveSearchMedIndex(null);
    setDrugSearchQuery('');
    showToast(`Applied ${drug.name} with standard Indian dosage presets.`, 'success');
  };

  // 1-Click Order Set Template Applicator
  const handleApplyClinicalTemplate = (tpl) => {
    setPresentingComplaint(tpl.chiefComplaint);
    setClinicalFindings(tpl.clinicalFindings);
    setDiagnosis(tpl.diagnosis);
    setTreatmentPlan(tpl.treatmentPlan);

    // Calculate follow-up date
    const d = new Date();
    d.setDate(d.getDate() + (tpl.followUpDays || 5));
    setFollowUpDate(d.toISOString().slice(0, 10));

    // Pre-populate medication rows
    const stampedMeds = tpl.medications.map((m, idx) => ({
      ...m,
      id: `med-${Date.now()}-${idx}`
    }));
    setMedications(stampedMeds);

    showToast(`Loaded clinical order set: "${tpl.label}"`, 'success');
  };

  // Allergy cross-check engine
  const patientAllergies = (targetPatient?.allergies || []).map((a) => a.toLowerCase());
  const detectedAllergyConflicts = medications
    .map((med) => {
      const medLower = (med.name || '').toLowerCase();
      const matchedFormulary = INDIAN_DRUG_FORMULARY.find((f) =>
        f.name.toLowerCase().includes(medLower) || medLower.includes(f.genericName.toLowerCase())
      );
      const risks = matchedFormulary?.allergiesRisk || [];
      const conflict = risks.find((r) => patientAllergies.some((pa) => pa.includes(r) || r.includes(pa)));
      if (conflict) {
        return { medName: med.name, conflictWith: conflict };
      }
      return null;
    })
    .filter(Boolean);

  // Actions
  const handleSaveDraft = (e) => {
    e?.preventDefault();
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
    showToast('Consultation draft saved successfully.', 'info');
  };

  const handleOpenFinalizeModal = (e) => {
    e.preventDefault();
    if (!diagnosis.trim()) {
      showToast('Please enter an assessment / diagnosis before finalization.', 'error');
      return;
    }
    if (safetyAnalysis.hasCritical && !clinicalOverride) {
      showToast('Critical prescription safety alerts flagged. Please review alerts or log an override reason.', 'warning');
      return;
    }
    setIsFinalizeModalOpen(true);
  };

  const handleConfirmFinalize = () => {
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
    setIsFinalizeModalOpen(false);

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
      showToast('Encounter finalized! E-Prescription issued and OPD Invoice generated.', 'success');
    }
  };

  // Find issued prescription for this patient if already finalized
  const issuedRx = prescriptions.find((p) => p.patientName === targetPatient?.name);

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-12">
      {/* Top Header & Navigation */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <Link to="/clinic/appointments">
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
              Encounter for {targetPatient?.name} · Ref: {targetAppointment?.referenceNumber || 'APT-2601'} · Token: {targetAppointment?.queueNumber || '#Q-1'}
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
            onClick={handleOpenFinalizeModal}
            className={isFinalized ? 'bg-emerald-700 hover:bg-emerald-800' : 'bg-blue-600 hover:bg-blue-700 font-bold'}
            type="button"
          >
            <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
            {isFinalized ? 'Re-Finalize Encounter' : 'Finalize & Issue Rx'}
          </Button>
        </div>
      </div>

      {/* Patient Demographic & Allergy Alert Strip */}
      <Card className="p-4 border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block">Patient Name</span>
            <span className="font-bold text-slate-900 dark:text-white text-sm">{targetPatient?.name}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block">Patient ID / Gender</span>
            <span className="font-semibold text-slate-700 dark:text-slate-300 font-mono">{targetPatient?.patientIdNumber} · {targetPatient?.gender}</span>
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block">Blood Group</span>
            <span className="font-black text-rose-600 dark:text-rose-400">{targetPatient?.bloodGroup || 'O +ve'}</span>
          </div>
          <div className="lg:col-span-2">
            <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block">Documented Drug Allergies</span>
            {targetPatient?.allergies && targetPatient.allergies.length > 0 ? (
              <span className="font-bold text-amber-800 dark:text-amber-200 bg-amber-100/80 dark:bg-amber-950/60 px-2 py-0.5 rounded text-[11px] inline-flex items-center gap-1 border border-amber-300 dark:border-amber-800">
                <AlertCircle className="w-3 h-3 text-amber-600" />
                {targetPatient.allergies.join(', ')}
              </span>
            ) : (
              <span className="text-slate-500 dark:text-slate-400 italic text-[11px]">No known drug allergies reported</span>
            )}
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block">Attending Doctor</span>
            <span className="font-semibold text-blue-700 dark:text-blue-400">{currentUser?.name || 'Dr. Arvind Rao'}</span>
          </div>
        </div>
      </Card>

      {/* Cross-Check Allergy Conflict Warning Banner */}
      {detectedAllergyConflicts.length > 0 && (
        <div className="p-3.5 bg-rose-50 dark:bg-rose-950/50 border-2 border-rose-400 dark:border-rose-800 rounded-xl text-xs text-rose-900 dark:text-rose-200 flex items-start gap-2.5 animate-pulse">
          <AlertTriangle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-extrabold text-rose-700 dark:text-rose-300 block uppercase tracking-wide">
              Critical Clinical Drug Allergy Warning!
            </span>
            <p className="mt-0.5">
              Prescription includes medications with potential cross-reactivity for this patient's documented allergies:
            </p>
            <ul className="list-disc list-inside mt-1 font-bold">
              {detectedAllergyConflicts.map((c, i) => (
                <li key={i}>
                  <strong>{c.medName}</strong> (Contraindicated or precautions required for known allergy to {c.conflictWith})
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* 1-Click Clinical Order Set Templates */}
      <Card className="p-4 border-blue-100 dark:border-blue-900/40 bg-blue-50/40 dark:bg-blue-950/20 space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold text-blue-900 dark:text-blue-300 flex items-center gap-1.5 uppercase tracking-wide">
            <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            1-Click Clinical Condition Order Sets (OPD Speed-Pills)
          </span>
          <span className="text-[10px] text-slate-500 dark:text-slate-400">Click to auto-populate complaint, findings, diagnosis & medications</span>
        </div>
        <div className="flex flex-wrap items-center gap-2 pt-1">
          {CLINICAL_CONDITION_TEMPLATES.map((tpl) => (
            <button
              key={tpl.id}
              type="button"
              onClick={() => handleApplyClinicalTemplate(tpl)}
              className="text-xs px-3 py-1.5 rounded-xl border border-blue-200 dark:border-blue-800 bg-white dark:bg-slate-800 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 dark:hover:text-white transition-all cursor-pointer font-semibold shadow-2xs"
            >
              {tpl.label}
            </button>
          ))}
        </div>
      </Card>

      {/* Main Consultation Form */}
      <form onSubmit={handleOpenFinalizeModal} className="space-y-6">
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

        {/* Complaints & Clinical Examination */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 dark:text-white">Presenting Chief Complaints *</label>
              <VoiceDictationButton
                fieldName="Chief Complaints"
                onTranscript={(text) => setPresentingComplaint((prev) => (prev ? `${prev} ${text}` : text))}
              />
            </div>
            <textarea
              required
              rows={3}
              value={presentingComplaint}
              onChange={(e) => setPresentingComplaint(e.target.value)}
              placeholder="Record chief complaints in patient's words (or use voice dictation)..."
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </Card>

          <Card className="p-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 dark:text-white">Clinical Examination & Findings</label>
              <VoiceDictationButton
                fieldName="Clinical Findings"
                onTranscript={(text) => setClinicalFindings((prev) => (prev ? `${prev} ${text}` : text))}
              />
            </div>
            <textarea
              rows={3}
              value={clinicalFindings}
              onChange={(e) => setClinicalFindings(e.target.value)}
              placeholder="Objective findings, oral inspection, chest auscultation..."
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </Card>
        </div>

        {/* Assessment, Diagnosis & Treatment Plan */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="p-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <label className="text-xs font-bold text-slate-800 dark:text-white">Clinical Diagnosis / Assessment *</label>
            <input
              required
              type="text"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              placeholder="e.g. Acute Irreversible Pulpitis of #46"
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 font-bold text-blue-900 dark:text-blue-400 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <span className="text-[10px] text-slate-400 dark:text-slate-500">Prints on the official prescription header</span>
          </Card>

          <Card className="p-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-800 dark:text-white">Treatment Plan & Procedures</label>
              <VoiceDictationButton
                fieldName="Treatment Plan"
                onTranscript={(text) => setTreatmentPlan((prev) => (prev ? `${prev} ${text}` : text))}
              />
            </div>
            <input
              type="text"
              value={treatmentPlan}
              onChange={(e) => setTreatmentPlan(e.target.value)}
              placeholder="e.g. RCT single sitting under LA, core buildup & crown"
              className="w-full text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <span className="text-[10px] text-slate-400 dark:text-slate-500">Summarizes clinical procedures performed</span>
          </Card>
        </div>

        {/* Prescription Safety Alerts (Clinical Decision Support) */}
        <PrescriptionSafetyAlerts
          warnings={safetyAnalysis.warnings}
          patientName={targetPatient?.name}
          onOverride={(reason) => {
            setClinicalOverride(true);
            setOverrideReason(reason);
            showToast('Clinical override authorized and logged.', 'info');
          }}
          isOverridden={clinicalOverride}
          overrideReason={overrideReason}
        />

        {/* Prescription Composer Section */}
        <Card className="p-5 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-800 pb-3">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Digital Prescription Composer (Fast Chip Select)
              </h3>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                Prescribe medications with 1-click dosage, frequency presets (1-0-1), duration, and allergy monitoring.
              </p>
            </div>

            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={handleAddMedication}
              className="text-xs shrink-0"
            >
              <Plus className="w-3.5 h-3.5 mr-1" />
              Add Medication Row
            </Button>
          </div>

          {/* Medication Rows */}
          <div className="space-y-4">
            {medications.map((med, index) => {
              const searchFilteredFormulary = drugSearchQuery
                ? INDIAN_DRUG_FORMULARY.filter(
                    (d) =>
                      d.name.toLowerCase().includes(drugSearchQuery.toLowerCase()) ||
                      d.genericName.toLowerCase().includes(drugSearchQuery.toLowerCase())
                  )
                : INDIAN_DRUG_FORMULARY.slice(0, 8);

              return (
                <div
                  key={med.id}
                  className="p-4 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/90 hover:border-blue-300 dark:hover:border-blue-600 transition-colors space-y-3 shadow-xs"
                >
                  {/* Top Bar: Row #, Searchable Drug Input, Strength, Dosage, Row Actions */}
                  <div className="flex items-start justify-between gap-2">
                    <span className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 font-bold text-[11px] flex items-center justify-center shrink-0 mt-1">
                      {index + 1}
                    </span>

                    <div className="flex-1 grid grid-cols-1 sm:grid-cols-12 gap-2 relative">
                      {/* Drug Name with auto-suggest dropdown */}
                      <div className="sm:col-span-6 relative">
                        <div className="relative">
                          <input
                            type="text"
                            value={med.name}
                            onFocus={() => {
                              setActiveSearchMedIndex(index);
                              setDrugSearchQuery(med.name || '');
                            }}
                            onChange={(e) => {
                              handleMedChange(med.id, 'name', e.target.value);
                              setDrugSearchQuery(e.target.value);
                            }}
                            placeholder="Type drug name or search formulary (e.g. Augmentin, Dolo, Pan-D)..."
                            className="w-full text-xs font-bold px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
                          />
                          <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                        </div>

                        {/* Autocomplete Formulary Dropdown */}
                        {activeSearchMedIndex === index && (
                          <div className="absolute left-0 right-0 top-full mt-1 bg-white dark:bg-slate-900 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 z-50 max-h-56 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800 text-xs">
                            <div className="p-2 bg-slate-50 dark:bg-slate-800/60 font-semibold text-[10px] text-slate-400 uppercase tracking-wider flex items-center justify-between">
                              <span>Select from Indian Drug Formulary</span>
                              <button
                                type="button"
                                onClick={() => setActiveSearchMedIndex(null)}
                                className="text-slate-400 hover:text-slate-600 dark:hover:text-white font-bold"
                              >
                                Close ✕
                              </button>
                            </div>
                            {searchFilteredFormulary.length === 0 ? (
                              <div className="p-3 text-slate-400 text-center italic">
                                No exact match in formulary. Custom entry will be used.
                              </div>
                            ) : (
                              searchFilteredFormulary.map((f) => (
                                <button
                                  key={f.id}
                                  type="button"
                                  onClick={() => handleSelectFormularyDrug(index, f)}
                                  className="w-full text-left p-2.5 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors flex items-center justify-between group"
                                >
                                  <div>
                                    <div className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                                      {f.name}
                                    </div>
                                    <div className="text-[10px] text-slate-500 dark:text-slate-400">
                                      {f.genericName} · {f.category}
                                    </div>
                                  </div>
                                  <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                                    {f.frequency.split(' ')[0]}
                                  </span>
                                </button>
                              ))
                            )}
                          </div>
                        )}
                      </div>

                      {/* Strength */}
                      <div className="sm:col-span-3">
                        <input
                          type="text"
                          value={med.strength}
                          onChange={(e) => handleMedChange(med.id, 'strength', e.target.value)}
                          placeholder="Strength (e.g. 625 mg)"
                          className="w-full text-xs px-2.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      {/* Dosage Form */}
                      <div className="sm:col-span-3">
                        <input
                          type="text"
                          value={med.dosage}
                          onChange={(e) => handleMedChange(med.id, 'dosage', e.target.value)}
                          placeholder="Dosage (e.g. 1 Tablet)"
                          className="w-full text-xs px-2.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>

                    {/* Actions: Duplicate & Remove */}
                    <div className="flex items-center gap-1 shrink-0 mt-1">
                      <button
                        type="button"
                        onClick={() => handleDuplicateMedication(med)}
                        className="text-slate-400 hover:text-blue-600 p-1.5 rounded-lg hover:bg-blue-50 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                        title="Duplicate this drug line"
                      >
                        <Copy className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveMedication(med.id)}
                        className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                        title="Remove drug line"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Quick-Select Frequency Chips */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1 text-[11px]">
                    <span className="font-semibold text-slate-400 dark:text-slate-500 mr-1 text-[10px] uppercase">
                      Freq:
                    </span>
                    {FREQUENCY_CHIPS.map((chip) => {
                      const isSelected = med.frequency === chip.text || med.frequency.includes(chip.code);
                      return (
                        <button
                          key={chip.code}
                          type="button"
                          onClick={() => handleMedChange(med.id, 'frequency', chip.text)}
                          className={`px-2 py-0.5 rounded-md font-mono text-[10px] transition-colors cursor-pointer font-bold ${
                            isSelected
                              ? 'bg-blue-600 text-white shadow-2xs'
                              : 'bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                          }`}
                        >
                          {chip.code}
                        </button>
                      );
                    })}
                  </div>

                  {/* Quick-Select Duration Chips */}
                  <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                    <span className="font-semibold text-slate-400 dark:text-slate-500 mr-1 text-[10px] uppercase">
                      Dur:
                    </span>
                    {DURATION_CHIPS.map((dur) => {
                      const isSelected = med.duration === dur;
                      return (
                        <button
                          key={dur}
                          type="button"
                          onClick={() => handleMedChange(med.id, 'duration', dur)}
                          className={`px-2 py-0.5 rounded-md text-[10px] transition-colors cursor-pointer font-semibold ${
                            isSelected
                              ? 'bg-emerald-600 text-white shadow-2xs'
                              : 'bg-slate-100 dark:bg-slate-700/60 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                          }`}
                        >
                          {dur}
                        </button>
                      );
                    })}
                  </div>

                  {/* Route & Specific Instructions */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                    <div className="space-y-1">
                      <input
                        type="text"
                        value={med.route}
                        onChange={(e) => handleMedChange(med.id, 'route', e.target.value)}
                        placeholder="Route / Timing (e.g. Oral, after meals)"
                        className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200"
                      />
                      <div className="flex flex-wrap gap-1 text-[10px]">
                        {ROUTE_TIMING_CHIPS.slice(0, 3).map((r) => (
                          <button
                            key={r}
                            type="button"
                            onClick={() => handleMedChange(med.id, 'route', r)}
                            className="text-[9px] text-slate-500 dark:text-slate-400 hover:text-blue-600 bg-slate-50 dark:bg-slate-900/60 px-1.5 py-0.5 rounded border border-slate-200/60 dark:border-slate-700 cursor-pointer"
                          >
                            {r.split(',')[1] || r}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-1">
                      <input
                        type="text"
                        value={med.instructions}
                        onChange={(e) => handleMedChange(med.id, 'instructions', e.target.value)}
                        placeholder="Special patient instructions (e.g. Swallow whole, avoid alcohol)..."
                        className="w-full text-xs px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 italic"
                      />
                      <div className="flex justify-between items-center text-[10px] text-slate-400">
                        <span>Dispense Qty:</span>
                        <input
                          type="text"
                          value={med.quantity}
                          onChange={(e) => handleMedChange(med.id, 'quantity', e.target.value)}
                          placeholder="e.g. 10 Tablets"
                          className="w-24 text-[10px] px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-right font-medium"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Scheduled Follow-Up Date & Bottom Actions */}
        <Card className="p-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <div>
              <label className="text-xs font-bold text-slate-800 dark:text-white block">
                Scheduled Review / Follow-Up Date
              </label>
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
              className={isFinalized ? 'bg-emerald-700 hover:bg-emerald-800 font-bold' : 'bg-blue-600 hover:bg-blue-700 font-bold'}
            >
              <CheckCircle2 className="w-4 h-4 mr-1.5" />
              {isFinalized ? 'Consultation Finalized' : 'Finalize & Issue Rx & Invoice'}
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

      {/* Explicit Finalize Confirmation Modal */}
      {isFinalizeModalOpen && (
        <Modal
          isOpen={isFinalizeModalOpen}
          onClose={() => setIsFinalizeModalOpen(false)}
          title="Review & Finalize Clinical Consultation"
          size="lg"
        >
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-blue-50 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-800">
              <span className="font-bold text-blue-900 dark:text-blue-200 block text-sm">
                Confirm Clinical Encounter for {targetPatient?.name}
              </span>
              <p className="text-slate-600 dark:text-slate-300 mt-1">
                Finalizing will lock this clinical consultation, digitally sign the e-prescription, issue an OPD billing invoice, and update the patient's record.
              </p>
            </div>

            <div className="space-y-2 border border-slate-200 dark:border-slate-700 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40">
              <div className="flex justify-between">
                <span className="font-semibold text-slate-500">Diagnosis:</span>
                <span className="font-bold text-slate-900 dark:text-white">{diagnosis}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-slate-500">Medications Count:</span>
                <span className="font-bold text-slate-900 dark:text-white">{medications.length} Prescribed Drug(s)</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-slate-500">Follow-Up Date:</span>
                <span className="font-bold text-blue-600 dark:text-blue-400">{followUpDate}</span>
              </div>
            </div>

            {detectedAllergyConflicts.length > 0 && (
              <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-300 text-amber-800 dark:text-amber-200 flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Clinician override confirmed for documented allergy warnings.</span>
              </div>
            )}

            <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsFinalizeModalOpen(false)}
              >
                Back to Edit
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleConfirmFinalize}
                className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold"
              >
                <Check className="w-3.5 h-3.5 mr-1" />
                Confirm & Sign Encounter
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

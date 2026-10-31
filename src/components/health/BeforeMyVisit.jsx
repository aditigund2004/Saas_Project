import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import {
  FileText,
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Printer,
  Sparkles,
  Stethoscope,
  ChevronRight,
  ChevronLeft,
  Heart,
  Save,
  HelpCircle,
  Plus,
  Trash2,
  Activity,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AnatomyExplorer } from './AnatomyExplorer';

export function BeforeMyVisit({ appointmentId = 'apt-101', onComplete }) {
  const {
    visitBriefs,
    saveVisitBrief,
    appointments,
    currentUser,
    activeClinic,
    showToast,
    isPatientFriendlyMode
  } = useApp();

  const targetApt = appointments.find((a) => a.id === appointmentId) || appointments[0];
  const existingBrief = visitBriefs[appointmentId] || visitBriefs['apt-101'] || null;

  // Multi-step: 1 = Reason & Symptoms, 2 = Anatomy Map, 3 = Meds & Allergies, 4 = Questions & Review
  const [currentStep, setCurrentStep] = useState(1);

  // Form states initialized with existing brief or sensible defaults
  const [reasonForVisit, setReasonForVisit] = useState(
    existingBrief?.reasonForVisit || targetApt?.notes || 'Follow-up for mild blood pressure reading and evening heart flutter after workouts'
  );
  const [selectedBodyRegion, setSelectedBodyRegion] = useState(existingBrief?.selectedBodyRegion || 'chest');
  const [anatomyAnnotations, setAnatomyAnnotations] = useState(
    existingBrief?.anatomyAnnotations || {
      chest: {
        region: 'chest',
        regionName: 'Chest & Cardiovascular',
        notes: 'Occasional flutter after evening brisk walk, lasts ~10 mins',
        severity: 'Moderate',
        duration: '5 days'
      }
    }
  );

  const [currentMedications, setCurrentMedications] = useState(
    existingBrief?.currentMedications || [
      { name: 'Telmisartan', dose: '20mg', frequency: 'Once daily (Morning)' },
      { name: 'Vitamin D3', dose: '60,000 IU', frequency: 'Weekly once (Sunday)' }
    ]
  );
  const [newMedName, setNewMedName] = useState('');
  const [newMedDose, setNewMedDose] = useState('');

  const [knownAllergies, setKnownAllergies] = useState(
    existingBrief?.knownAllergies || ['Penicillin (Hives & itching)', 'Sulfa drugs (Skin rash)']
  );
  const [newAllergy, setNewAllergy] = useState('');

  const [medicalHistory, setMedicalHistory] = useState(
    existingBrief?.medicalHistory || 'Mild essential hypertension (controlled). Non-smoker. Regular walker.'
  );

  const [patientQuestions, setPatientQuestions] = useState(
    existingBrief?.patientQuestions || [
      'Is my current blood pressure reading within the target range for my age group?',
      'Can I continue high-intensity cardio exercises or should I stay with brisk walking?',
      'Do I need to repeat my 2D Echocardiogram or lipid profile this quarter?'
    ]
  );
  const [newQuestion, setNewQuestion] = useState('');

  const [additionalNotes, setAdditionalNotes] = useState(
    existingBrief?.additionalNotes || 'I had slight indigestion after heavy meals last weekend, but resolved with antacids.'
  );

  const [isSubmitted, setIsSubmitted] = useState(existingBrief?.status === 'Submitted');

  const handleAddMed = () => {
    if (!newMedName.trim()) return;
    setCurrentMedications((prev) => [
      ...prev,
      { name: newMedName, dose: newMedDose || 'As directed', frequency: 'Daily' }
    ]);
    setNewMedName('');
    setNewMedDose('');
  };

  const handleRemoveMed = (index) => {
    setCurrentMedications((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddAllergy = () => {
    if (!newAllergy.trim()) return;
    setKnownAllergies((prev) => [...prev, newAllergy.trim()]);
    setNewAllergy('');
  };

  const handleRemoveAllergy = (index) => {
    setKnownAllergies((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAddQuestion = () => {
    if (!newQuestion.trim()) return;
    setPatientQuestions((prev) => [...prev, newQuestion.trim()]);
    setNewQuestion('');
  };

  const handleRemoveQuestion = (index) => {
    setPatientQuestions((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSaveAnnotation = (regionKey, data) => {
    setAnatomyAnnotations((prev) => ({
      ...prev,
      [regionKey]: data
    }));
    showToast(`Added note for ${data.regionName}`);
  };

  const handleSaveDraft = () => {
    const brief = {
      appointmentId: targetApt?.id || 'apt-101',
      patientId: currentUser?.id || 'pt-1041',
      patientName: currentUser?.name || 'Aarav Patel',
      doctorName: targetApt?.doctorName || 'Dr. Aarav Mehta',
      appointmentDate: targetApt?.date || '2026-10-27',
      appointmentTime: targetApt?.time || '10:30 AM',
      status: 'Draft',
      reasonForVisit,
      selectedBodyRegion,
      anatomyAnnotations,
      currentMedications,
      knownAllergies,
      medicalHistory,
      patientQuestions,
      additionalNotes
    };
    saveVisitBrief(brief);
    showToast('Draft saved successfully! You can resume anytime.');
  };

  const handleSubmitBrief = () => {
    const brief = {
      appointmentId: targetApt?.id || 'apt-101',
      patientId: currentUser?.id || 'pt-1041',
      patientName: currentUser?.name || 'Aarav Patel',
      doctorName: targetApt?.doctorName || 'Dr. Aarav Mehta',
      appointmentDate: targetApt?.date || '2026-10-27',
      appointmentTime: targetApt?.time || '10:30 AM',
      status: 'Submitted',
      reasonForVisit,
      selectedBodyRegion,
      anatomyAnnotations,
      currentMedications,
      knownAllergies,
      medicalHistory,
      patientQuestions,
      additionalNotes
    };
    saveVisitBrief(brief);
    setIsSubmitted(true);
    showToast('Visit Brief submitted! Doctor Dr. Aarav Mehta will review it prior to consultation.');
    if (onComplete) onComplete(brief);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-3xl shadow-md relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-blue-200" />
              Pre-Consultation Preparation Workspace
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Before My Visit: Brief My Doctor
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 max-w-xl mt-1">
              Share your symptoms, questions, and medication list in advance so Dr.{' '}
              {targetApt?.doctorName || 'Aarav Mehta'} can give you an ultra-focused consultation.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-center">
            {isSubmitted ? (
              <Badge variant="success" size="lg" className="bg-emerald-500 text-white font-bold py-1.5 px-3">
                <CheckCircle2 className="w-4 h-4 mr-1" /> Brief Shared With Doctor
              </Badge>
            ) : (
              <Badge variant="warning" size="lg" className="bg-amber-400 text-slate-900 font-bold py-1.5 px-3">
                Preparation In Progress
              </Badge>
            )}
            <Button
              variant="outline"
              size="sm"
              onClick={() => window.print()}
              className="bg-white/10 hover:bg-white/20 text-white border-white/30 text-xs font-bold"
            >
              <Printer className="w-3.5 h-3.5 mr-1" /> Print Brief
            </Button>
          </div>
        </div>
      </div>

      {/* Appointment Context Strip */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
            <Stethoscope className="w-5 h-5" />
          </div>
          <div>
            <span className="font-extrabold text-slate-900 dark:text-white block">
              Dr. {targetApt?.doctorName || 'Aarav Mehta'} · {targetApt?.serviceName || 'General Consultation'}
            </span>
            <span className="text-slate-500 dark:text-slate-400">
              {activeClinic?.name || 'CityCare Family Clinic'} · {targetApt?.date || '2026-10-27'} at {targetApt?.time || '10:30 AM'}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleSaveDraft} className="text-xs font-bold">
            <Save className="w-3.5 h-3.5 mr-1" /> Save Draft
          </Button>
        </div>
      </div>

      {/* Multi-Step Wizard Tabs */}
      <div className="grid grid-cols-4 gap-2 text-center">
        {[
          { step: 1, label: '1. Reason & Symptoms' },
          { step: 2, label: '2. Body Map' },
          { step: 3, label: '3. Meds & Allergies' },
          { step: 4, label: '4. Questions & Submit' }
        ].map((s) => (
          <button
            key={s.step}
            type="button"
            onClick={() => setCurrentStep(s.step)}
            className={`p-3 rounded-2xl text-xs font-bold transition-all duration-150 border cursor-pointer ${
              currentStep === s.step
                ? 'bg-blue-600 text-white border-blue-600 shadow-md shadow-blue-500/20 scale-[1.02]'
                : currentStep > s.step
                ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                : 'bg-white dark:bg-slate-900 text-slate-500 border-slate-200 dark:border-slate-800 hover:border-blue-300 hover:text-slate-700'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {/* Step Content */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm">
        {/* STEP 1: REASON & SYMPTOMS */}
        {currentStep === 1 && (
          <div className="space-y-5">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                Primary Reason for Today's Visit
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Tell your doctor what is bothering you most so they can address it first.
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Main Reason / Complaint *
              </label>
              <textarea
                rows={3}
                value={reasonForVisit}
                onChange={(e) => setReasonForVisit(e.target.value)}
                placeholder="e.g., Routine blood pressure follow-up and occasional flutter in my chest after evening workouts."
                className="w-full text-xs p-3.5 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-hidden"
              />
            </div>

            <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50">
              <h4 className="text-xs font-bold text-blue-900 dark:text-blue-300 mb-2 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4" /> Quick Symptom Suggestions
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  'Blood pressure check & refill',
                  'Post-workout flutter / palpitations',
                  'Frequent morning headaches',
                  'Chest tightness / acidity after food',
                  'General fatigue / sleep disruption'
                ].map((sug, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setReasonForVisit(sug)}
                    className="text-xs px-3 py-1 rounded-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-400 cursor-pointer"
                  >
                    + {sug}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Relevant Past Medical History
              </label>
              <input
                type="text"
                value={medicalHistory}
                onChange={(e) => setMedicalHistory(e.target.value)}
                placeholder="e.g., Mild hypertension, seasonal allergies, non-smoker"
                className="w-full text-xs p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <div className="flex justify-end pt-4">
              <Button
                variant="primary"
                size="md"
                onClick={() => setCurrentStep(2)}
                className="font-bold shadow-sm"
              >
                Continue to Body Map <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 2: ANATOMY MAP */}
        {currentStep === 2 && (
          <div className="space-y-5">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                Interactive Body Map (Pinpoint Your Discomfort)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Click on the anatomy diagram to indicate where you feel any ache, tightness, or symptoms.
              </p>
            </div>

            <AnatomyExplorer
              mode="patient"
              selectedRegion={selectedBodyRegion}
              onSelectRegion={setSelectedBodyRegion}
              annotations={anatomyAnnotations}
              onSaveAnnotation={handleSaveAnnotation}
            />

            <div className="flex justify-between items-center pt-4">
              <Button variant="outline" size="md" onClick={() => setCurrentStep(1)} className="font-bold">
                <ChevronLeft className="w-4 h-4 mr-1" /> Back
              </Button>
              <Button variant="primary" size="md" onClick={() => setCurrentStep(3)} className="font-bold">
                Continue to Medications <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 3: MEDICATIONS & ALLERGIES */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                Current Medications & Known Allergies
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Crucial for prescription safety: prevents accidental drug interactions or allergic reactions.
              </p>
            </div>

            {/* Medications List */}
            <div className="space-y-3">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider block">
                Medicines you are currently taking ({currentMedications.length})
              </span>
              <div className="space-y-2">
                {currentMedications.map((m, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs"
                  >
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white">{m.name}</span>
                      <span className="text-slate-500 ml-2">({m.dose} — {m.frequency})</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveMed(idx)}
                      className="text-slate-400 hover:text-rose-500 p-1 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add Med Inline */}
              <div className="flex gap-2 pt-1">
                <input
                  type="text"
                  placeholder="Medicine name (e.g., Telmisartan)"
                  value={newMedName}
                  onChange={(e) => setNewMedName(e.target.value)}
                  className="flex-1 text-xs p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
                <input
                  type="text"
                  placeholder="Dosage (e.g., 20mg daily)"
                  value={newMedDose}
                  onChange={(e) => setNewMedDose(e.target.value)}
                  className="w-36 text-xs p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
                <Button variant="outline" size="sm" onClick={handleAddMed} className="font-bold">
                  <Plus className="w-4 h-4 mr-1" /> Add
                </Button>
              </div>
            </div>

            {/* Known Allergies */}
            <div className="space-y-3 pt-3 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs font-bold text-rose-600 dark:text-rose-400 uppercase tracking-wider block flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4" /> Known Drug or Food Allergies ({knownAllergies.length})
              </span>
              <div className="flex flex-wrap gap-2">
                {knownAllergies.map((al, idx) => (
                  <div
                    key={idx}
                    className="px-3 py-1.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900 text-xs font-semibold flex items-center gap-2"
                  >
                    <span>{al}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveAllergy(idx)}
                      className="hover:text-rose-900 cursor-pointer"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add allergy (e.g., Sulfa drugs, Peanuts, Latex)"
                  value={newAllergy}
                  onChange={(e) => setNewAllergy(e.target.value)}
                  className="flex-1 text-xs p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
                <Button variant="outline" size="sm" onClick={handleAddAllergy} className="font-bold">
                  <Plus className="w-4 h-4 mr-1" /> Add
                </Button>
              </div>
            </div>

            <div className="flex justify-between items-center pt-4">
              <Button variant="outline" size="md" onClick={() => setCurrentStep(2)} className="font-bold">
                <ChevronLeft className="w-4 h-4 mr-1" /> Back
              </Button>
              <Button variant="primary" size="md" onClick={() => setCurrentStep(4)} className="font-bold">
                Continue to Questions <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          </div>
        )}

        {/* STEP 4: QUESTIONS & SUBMIT */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                Questions You Want to Ask Dr. {targetApt?.doctorName || 'Aarav Mehta'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Never leave a clinic wondering what you forgot to ask. Your questions will appear directly in the doctor's 60-second briefing screen.
              </p>
            </div>

            {/* Questions List */}
            <div className="space-y-2">
              {patientQuestions.map((q, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 text-xs flex items-start justify-between gap-3"
                >
                  <div className="flex items-start gap-2">
                    <span className="w-5 h-5 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                      Q{idx + 1}
                    </span>
                    <p className="font-semibold text-slate-900 dark:text-white">{q}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveQuestion(idx)}
                    className="text-slate-400 hover:text-rose-500 p-1 cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Type your question here (e.g., Should I monitor my heart rate during morning runs?)"
                value={newQuestion}
                onChange={(e) => setNewQuestion(e.target.value)}
                className="flex-1 text-xs p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
              <Button variant="outline" size="sm" onClick={handleAddQuestion} className="font-bold">
                <Plus className="w-4 h-4 mr-1" /> Add Question
              </Button>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Any Additional Lifestyle Notes
              </label>
              <textarea
                rows={2}
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                placeholder="Sleep patterns, diet changes, vitamins, or recent stressors..."
                className="w-full text-xs p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            {/* Submission Preview Card */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span className="text-xs font-bold text-slate-900 dark:text-white">
                  Visit Brief Ready for Transmission
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                When you click "Submit Visit Brief to Doctor", this packet is immediately synchronized with Dr. {targetApt?.doctorName || 'Aarav Mehta'}'s clinical workspace and queue dashboard.
              </p>
            </div>

            <div className="flex justify-between items-center pt-4">
              <Button variant="outline" size="md" onClick={() => setCurrentStep(3)} className="font-bold">
                <ChevronLeft className="w-4 h-4 mr-1" /> Back
              </Button>
              <div className="flex gap-2">
                <Button variant="outline" size="md" onClick={handleSaveDraft} className="font-bold">
                  <Save className="w-4 h-4 mr-1" /> Save Draft
                </Button>
                <Button variant="primary" size="md" onClick={handleSubmitBrief} className="font-bold shadow-md shadow-blue-500/20">
                  <CheckCircle2 className="w-4 h-4 mr-1" /> Submit Visit Brief to Doctor
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


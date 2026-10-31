import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import {
  FileText,
  Pill,
  Clock,
  ShieldAlert,
  Send,
  AlertCircle,
  HelpCircle,
  Stethoscope
} from 'lucide-react';

const RX_CLARIFICATION_REASONS = [
  'Dosage Timing & Food Interaction Advice',
  'Mild Side Effect or Gastric Discomfort Concern',
  'Generic Drug Availability & Brand Substitution',
  'Clarification on Course Completion / Duration',
  'Pre-Existing Medication or Allergy Compatibility',
  'Other Clinical Prescription Inquiry'
];

export function PrescriptionClarificationModal({ isOpen, onClose, prescription, preselectedMedicine }) {
  const navigate = useNavigate();
  const { createPatientQuery } = useApp();

  const [selectedMedicine, setSelectedMedicine] = useState(
    preselectedMedicine || prescription?.medications?.[0]?.name || 'General Prescription Inquiry'
  );
  const [reason, setReason] = useState(RX_CLARIFICATION_REASONS[0]);
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !prescription) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);

    const fullMessage = `[Prescription Clarification for #${prescription.prescriptionNumber} | Attending Doctor: ${prescription.doctorName}]\n\nMedication Inquired: ${selectedMedicine}\nReason: ${reason}\n\nPatient Query:\n${message.trim()}`;

    const newQuery = createPatientQuery({
      category: 'Prescription Clarification',
      relatedEntityId: prescription.id,
      relatedEntityLabel: `Prescription #${prescription.prescriptionNumber} (${prescription.doctorName})`,
      subject: `Prescription Query: ${selectedMedicine} - ${reason}`,
      message: fullMessage,
      urgency: 'Prompt Clinical Review'
    });

    setIsSubmitting(false);
    onClose();

    navigate(`/patient/queries?selected=${newQuery.id}`);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
            <Stethoscope className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100">
              Request Prescription Clarification
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Direct clinical inquiry to your prescribing doctor
            </p>
          </div>
        </div>
      }
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        {/* Prescription Reference Card */}
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-850/60 border border-slate-200 dark:border-slate-800 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-900 dark:text-slate-100 font-mono">
              Prescription #{prescription.prescriptionNumber}
            </span>
            <span className="font-semibold text-blue-600 dark:text-blue-400">
              {prescription.doctorName}
            </span>
          </div>
          <p className="text-[11px] text-slate-600 dark:text-slate-400">
            <strong>Diagnosis:</strong> {prescription.diagnosis || 'Clinical Consultation'} · <strong>Issued:</strong> {prescription.date}
          </p>
        </div>

        {/* Response-Time Expectation Alert */}
        <div className="p-3 rounded-xl bg-teal-50/80 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-900/50 flex items-start gap-2.5 text-teal-950 dark:text-teal-200">
          <Clock className="w-4 h-4 text-teal-600 dark:text-teal-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5 text-xs">
            <p className="font-bold">Expected Clinical Response Time</p>
            <p className="text-[11px] text-teal-850 dark:text-teal-300 leading-relaxed">
              Attending physicians or duty clinical officers typically review and reply to prescription clarifications <strong>within 2 to 4 business hours</strong> (Monday to Saturday, 09:00 AM – 07:00 PM).
            </p>
          </div>
        </div>

        {/* Medicine Selector */}
        {prescription.medications && prescription.medications.length > 0 && (
          <div>
            <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider text-[11px]">
              Specific Prescribed Medication
            </label>
            <select
              value={selectedMedicine}
              onChange={(e) => setSelectedMedicine(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 text-xs font-semibold focus:ring-2 focus:ring-teal-500"
            >
              <option value="All Prescribed Medications (General)">All Medications on this Prescription</option>
              {prescription.medications.map((m) => (
                <option key={m.id || m.name} value={m.name}>
                  {m.name} ({m.dosage || 'Prescribed dose'})
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Clarification Type */}
        <div>
          <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider text-[11px]">
            Inquiry Category *
          </label>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 text-xs font-semibold focus:ring-2 focus:ring-teal-500"
          >
            {RX_CLARIFICATION_REASONS.map((r) => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        {/* Detailed Question */}
        <div>
          <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider text-[11px]">
            Your Question for the Attending Doctor *
          </label>
          <textarea
            required
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type your question regarding dose timing, dietary instructions, mild side effects, or drug interactions..."
            className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 text-xs leading-relaxed focus:ring-2 focus:ring-teal-500"
          />
        </div>

        {/* Emergency Safety Protocol Banner */}
        <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/30 border border-rose-300 dark:border-rose-900/60 text-rose-900 dark:text-rose-200 flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 text-rose-600 dark:text-rose-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5 text-[11px] leading-relaxed">
            <p className="font-bold">Severe Symptoms Emergency Protocol</p>
            <p className="text-rose-800 dark:text-rose-300">
              If you are experiencing acute facial or throat swelling, difficulty breathing, chest tightness, or severe hives, <strong>STOP</strong> taking the medication and immediately call <strong>112 / 108</strong> or go to the nearest emergency room. Online queries are strictly for non-emergency inquiries.
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
          <Button variant="outline" size="sm" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            type="submit"
            icon={Send}
            disabled={isSubmitting || !message.trim()}
            className="bg-teal-600 hover:bg-teal-700 text-white font-bold shadow-xs"
          >
            Send to Attending Doctor &rarr;
          </Button>
        </div>
      </form>
    </Modal>
  );
}


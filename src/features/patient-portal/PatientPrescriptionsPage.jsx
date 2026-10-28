import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { FileText, Printer, ShieldCheck, Sparkles, X, CheckCircle2, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { DemoPatientSwitcher } from '../../components/patient/DemoPatientSwitcher';

export function PatientPrescriptionsPage() {
  const { prescriptions, openPrescriptionModal, currentUser, activePatientId, patients = [] } = useApp();
  const [selectedRxForExplanation, setSelectedRxForExplanation] = useState(null);

  const activePatient =
    patients.find((p) => p.id === activePatientId || p.patientIdNumber === activePatientId) ||
    patients.find((p) => p.name === currentUser?.name) ||
    patients[0];

  // Show user's prescriptions or fallback if none
  const myPrescriptions = prescriptions.filter(
    (p) =>
      p.patientId === activePatient?.id ||
      p.patientId === activePatient?.patientIdNumber ||
      p.patientName === activePatient?.name
  );
  const displayPrescriptions = myPrescriptions;

  return (
    <div className="space-y-6">
      <DemoPatientSwitcher />

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="text-xs font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-900/60 uppercase tracking-wider">
            Health Vault
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mt-1">My Digital Prescriptions</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Official prescriptions signed by your consulting doctors, verified via tamper-evident QR codes.
          </p>
        </div>
      </div>

      <Card className="border-slate-200 dark:border-slate-800 dark:bg-slate-900/90 shadow-sm overflow-hidden">
        <CardHeader
          title={`Issued Prescriptions (${displayPrescriptions.length})`}
          subtitle="Click to view full medication schedules, instructions, or print A4 copy"
        />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 uppercase text-xs font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-4 text-center w-12">#</th>
                <th className="p-4">Prescription #</th>
                <th className="p-4">Doctor & Date</th>
                <th className="p-4">Diagnosis</th>
                <th className="p-4">Medications</th>
                <th className="p-4">QR Authenticity</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {displayPrescriptions.map((rx, idx) => (
                <tr key={rx.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="p-4 text-center font-mono font-medium text-slate-400 dark:text-slate-500 text-xs">
                    {idx + 1}
                  </td>
                  <td className="p-4 font-mono font-bold text-blue-700 dark:text-blue-400">{rx.prescriptionNumber}</td>
                  <td className="p-4">
                    <div className="font-bold text-slate-900 dark:text-slate-100">{rx.doctorName}</div>
                    <div className="text-xs text-slate-400 dark:text-slate-500 font-mono">{rx.date}</div>
                  </td>
                  <td className="p-4 text-slate-700 dark:text-slate-300 font-medium max-w-xs">{rx.diagnosis}</td>
                  <td className="p-4 text-slate-600 dark:text-slate-400 font-semibold">{rx.medications?.length} Prescribed</td>
                  <td className="p-4">
                    <Link
                      to={`/verify-prescription/${rx.verificationId}`}
                      target="_blank"
                      className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-blue-800 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-1 rounded-lg border border-blue-200 dark:border-blue-900/60 hover:bg-blue-100 dark:hover:bg-blue-900/60"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                      <span>{rx.verificationId}</span>
                    </Link>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setSelectedRxForExplanation(rx)}
                        className="text-xs bg-indigo-50 dark:bg-indigo-950/40 text-indigo-800 dark:text-indigo-300 border-indigo-200 dark:border-indigo-900 hover:bg-indigo-100 font-semibold"
                        title="Translate prescription instructions to everyday language"
                      >
                        <Sparkles className="w-3.5 h-3.5 mr-1 text-indigo-600 dark:text-indigo-400" />
                        AI Guide
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openPrescriptionModal(rx)}
                      >
                        <Printer className="w-3.5 h-3.5 mr-1" />
                        View / Print
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Patient-friendly explanation modal */}
      {selectedRxForExplanation && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs cursor-pointer"
          onClick={() => setSelectedRxForExplanation(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 w-full max-w-lg p-6 space-y-4 cursor-default"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-slate-100">Patient-Friendly Medication Guide</h3>
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-mono">Prescription: {selectedRxForExplanation.prescriptionNumber}</p>
                </div>
              </div>
              <button onClick={() => setSelectedRxForExplanation(null)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 rounded-xl text-xs text-indigo-900 dark:text-indigo-200">
              💡 <strong>Plain English Translation:</strong> Here is how and when to safely take each medication as prescribed by <strong>{selectedRxForExplanation.doctorName}</strong>.
            </div>

            <div className="space-y-3 max-h-[350px] overflow-y-auto">
              {selectedRxForExplanation.medications.map((med, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-slate-100">{med.name}</span>
                    <Badge variant="teal" size="sm">{med.dosage || '1 Dose'}</Badge>
                  </div>
                  <div className="text-slate-700 dark:text-slate-300 text-xs">
                    <strong>Schedule:</strong> {med.frequency} · <strong>Duration:</strong> {med.duration}
                  </div>
                  <div className="text-slate-600 dark:text-slate-400 italic text-xs">
                    <strong>Timing:</strong> {med.route}
                  </div>
                  {med.instructions && (
                    <div className="p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300">
                      ⚠️ <strong>Special Instruction:</strong> {med.instructions}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-100 dark:border-slate-800">
              <Button variant="secondary" size="sm" onClick={() => setSelectedRxForExplanation(null)}>
                Close Guide
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Printer, ShieldCheck, Sparkles, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { belongsToCurrentPatient } from './patientDataAccess';

export function PatientPrescriptionsPage() {
  const { prescriptions, openPrescriptionModal, currentUser } = useApp();
  const [selectedRxForExplanation, setSelectedRxForExplanation] = useState(null);

  const myPrescriptions = prescriptions.filter((prescription) =>
    belongsToCurrentPatient(prescription, currentUser)
  );
  const displayPrescriptions = myPrescriptions;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200 uppercase tracking-wide">
            Health Vault
          </span>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight mt-1">My Digital Prescriptions</h1>
          <p className="text-xs text-slate-500">
            Official prescriptions signed by your consulting doctors, verified via tamper-evident QR codes
          </p>
        </div>
      </div>

      <Card>
        <CardHeader
          title={`Issued Prescriptions (${displayPrescriptions.length})`}
          subtitle="Click to view full medication schedules, instructions, or print A4 copy"
        />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3.5">Prescription #</th>
                <th className="p-3.5">Doctor & Date</th>
                <th className="p-3.5">Diagnosis</th>
                <th className="p-3.5">Medications</th>
                <th className="p-3.5">QR Authenticity</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {displayPrescriptions.length === 0 ? (
                <tr>
                  <td className="p-6 text-center text-slate-500" colSpan={6}>
                    No prescriptions are linked to this account yet.
                  </td>
                </tr>
              ) : displayPrescriptions.map((rx) => (
                <tr key={rx.id} className="hover:bg-slate-50/50">
                  <td className="p-3.5 font-mono font-bold text-slate-900">{rx.prescriptionNumber}</td>
                  <td className="p-3.5">
                    <div className="font-bold text-slate-900">{rx.doctorName}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{rx.date}</div>
                  </td>
                  <td className="p-3.5 text-slate-700 font-medium max-w-xs">{rx.diagnosis}</td>
                  <td className="p-3.5 text-slate-600 font-semibold">{rx.medications?.length} Prescribed</td>
                  <td className="p-3.5">
                    <Link
                      to={`/verify-prescription/${rx.verificationId}`}
                      target="_blank"
                      className="inline-flex items-center gap-1 font-mono text-[11px] text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 hover:bg-blue-100"
                    >
                      <ShieldCheck className="w-3 h-3 text-blue-600" />
                      <span>{rx.verificationId}</span>
                    </Link>
                  </td>
                  <td className="p-3.5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => setSelectedRxForExplanation(rx)}
                        className="text-xs bg-indigo-50 text-indigo-800 border-indigo-200 hover:bg-indigo-100"
                        title="Translate prescription instructions to everyday language"
                      >
                        <Sparkles className="w-3 h-3 mr-1 text-indigo-600" />
                        AI Explanation
                      </Button>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => openPrescriptionModal(rx)}
                        className="text-xs"
                      >
                        <Printer className="w-3 h-3 mr-1" />
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900">Patient-Friendly Medication Guide</h3>
                  <p className="text-[10px] text-slate-400 font-mono">Prescription: {selectedRxForExplanation.prescriptionNumber}</p>
                </div>
              </div>
              <button onClick={() => setSelectedRxForExplanation(null)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-2.5 bg-indigo-50/70 border border-indigo-100 rounded-xl text-xs text-indigo-900">
              💡 <strong>Plain English Translation:</strong> Here is how and when to safely take each medication as prescribed by <strong>{selectedRxForExplanation.doctorName}</strong>.
            </div>

            <div className="space-y-3 max-h-[350px] overflow-y-auto">
              {selectedRxForExplanation.medications.map((med, idx) => (
                <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-1.5 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 text-sm">{med.name}</span>
                    <Badge variant="teal" size="sm">{med.dosage || '1 Dose'}</Badge>
                  </div>
                  <div className="text-slate-700">
                    <strong>Schedule:</strong> {med.frequency} · <strong>Duration:</strong> {med.duration}
                  </div>
                  <div className="text-slate-600 italic">
                    <strong>Timing:</strong> {med.route}
                  </div>
                  {med.instructions && (
                    <div className="p-2 rounded-lg bg-white border border-slate-200 text-[11px] text-slate-700">
                      ⚠️ <strong>Special Instruction:</strong> {med.instructions}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-end pt-2 border-t border-slate-100">
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

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { TablePagination } from '../../components/ui/Table';
import { FileText, Printer, ShieldCheck, Sparkles, X, CheckCircle2, Clock, Pill, Info, ArrowRight, HelpCircle, MessageSquare, ShoppingBag } from 'lucide-react';
import { Link } from 'react-router-dom';
import { MedicineInfoModal } from './MedicineInfoModal';
import { PrescriptionClarificationModal } from './PrescriptionClarificationModal';

export function PatientPrescriptionsPage() {
  const { prescriptions, openPrescriptionModal, currentUser, createRemindersFromPrescription, medicationReminders = [] } = useApp();
  const [selectedRxForExplanation, setSelectedRxForExplanation] = useState(null);
  const [selectedMedicineForInfo, setSelectedMedicineForInfo] = useState(null);
  const [clarificationModalRx, setClarificationModalRx] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 8;

  // Show user's prescriptions or fallback to first 3 demo prescriptions
  const myPrescriptions = prescriptions.filter(
    (p) => p.patientName === currentUser?.name || p.patientId === 'pt-1041' || p.patientId === 'pt-1042'
  );
  const displayPrescriptions = myPrescriptions.length > 0 ? myPrescriptions : prescriptions.slice(0, 3);

  return (
    <div className="space-y-6">

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
        <div className="flex flex-wrap items-center gap-2.5">
          <Link to="/patient/pharmacy">
            <Button variant="primary" size="md" icon={ShoppingBag} className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-md shadow-emerald-500/20">
              Buy Medicines Online &rarr;
            </Button>
          </Link>
          <Link to="/patient/queries?category=Prescription%20Clarification">
            <Button variant="outline" size="md" icon={HelpCircle} className="font-semibold text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800 hover:bg-purple-50 dark:hover:bg-purple-950/40">
              Ask Doctor
            </Button>
          </Link>
          <Link to="/patient/reminders">
            <Button variant="primary" size="md" icon={Clock} className="bg-teal-600 hover:bg-teal-700 text-white font-bold shadow-md shadow-teal-500/20">
              Dosing Reminders & Adherence &rarr;
            </Button>
          </Link>
        </div>
      </div>

      {/* Medication Reminder Callout Banner */}
      <div className="p-4 rounded-2xl bg-teal-50/80 dark:bg-teal-950/30 border border-teal-200 dark:border-teal-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs shadow-2xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-teal-100 dark:bg-teal-900/50 text-teal-700 dark:text-teal-300 flex items-center justify-center font-bold shrink-0">
            <Pill className="w-5 h-5" />
          </div>
          <div>
            <p className="font-bold text-slate-900 dark:text-slate-100 text-sm">
              Prescription Dosing Reminders & Adherence Tracker
            </p>
            <p className="text-slate-600 dark:text-slate-400 mt-0.5">
              Receive automated WhatsApp alerts for your prescribed medications, track daily intake, and access drug monographs.
            </p>
          </div>
        </div>
        <Link to="/patient/reminders" className="shrink-0">
          <Button variant="secondary" size="sm" icon={Clock} className="font-bold text-teal-800 dark:text-teal-300">
            Manage Reminders ({medicationReminders.length}) &rarr;
          </Button>
        </Link>
      </div>

      <Card className="border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xs overflow-hidden">

        <CardHeader
          title={`Issued Prescriptions (${displayPrescriptions.length})`}
          subtitle="Click to view full medication schedules, instructions, or print A4 copy"
        />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-950 text-slate-500 dark:text-slate-400 uppercase text-[11px] font-semibold border-b border-slate-200 dark:border-slate-800 tracking-wider">
              <tr>
                <th className="px-4 py-3 sm:px-5">Prescription #</th>
                <th className="px-4 py-3 sm:px-5">Doctor & Date</th>
                <th className="px-4 py-3 sm:px-5">Diagnosis</th>
                <th className="px-4 py-3 sm:px-5 text-center">Medications</th>
                <th className="px-4 py-3 sm:px-5">QR Authenticity</th>
                <th className="px-4 py-3 sm:px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-200">
              {displayPrescriptions.length === 0 ? (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-slate-400 dark:text-slate-500 text-sm">
                    <div className="max-w-xs mx-auto space-y-1">
                      <p className="font-semibold text-slate-700 dark:text-slate-300">No prescriptions on file</p>
                      <p className="text-xs">Your consultation prescriptions will appear here.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                displayPrescriptions
                  .slice((currentPage - 1) * pageSize, currentPage * pageSize)
                  .map((rx) => (
                    <tr key={rx.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-4 py-3.5 sm:px-5 font-mono font-bold text-blue-600 dark:text-blue-400 text-xs">{rx.prescriptionNumber}</td>
                      <td className="px-4 py-3.5 sm:px-5">
                        <div className="font-semibold text-slate-900 dark:text-slate-100">{rx.doctorName}</div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">{rx.date}</div>
                      </td>
                      <td className="px-4 py-3.5 sm:px-5 text-slate-700 dark:text-slate-300 font-medium max-w-xs truncate" title={rx.diagnosis}>
                        {rx.diagnosis}
                      </td>
                      <td className="px-4 py-3.5 sm:px-5 text-center font-mono font-semibold text-slate-700 dark:text-slate-300 tabular-nums">
                        {rx.medications?.length || 0}
                      </td>
                      <td className="px-4 py-3.5 sm:px-5">
                        <Link
                          to={`/verify-prescription/${rx.verificationId}`}
                          target="_blank"
                          className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-1 rounded-lg border border-blue-200 dark:border-blue-900/60 hover:bg-blue-100 dark:hover:bg-blue-900/60"
                        >
                          <ShieldCheck className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                          <span>{rx.verificationId}</span>
                        </Link>
                      </td>
                      <td className="px-4 py-3.5 sm:px-5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <Link to="/patient/pharmacy">
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-emerald-700 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 font-bold"
                              title="Purchase prescribed medicines online from the clinic pharmacy"
                            >
                              <ShoppingBag className="w-3.5 h-3.5 mr-1 text-emerald-600" />
                              Buy Medicines
                            </Button>
                          </Link>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setClarificationModalRx(rx)}
                            className="text-purple-700 dark:text-purple-300 hover:bg-purple-50 dark:hover:bg-purple-950/40 text-xs"
                            title="Send non-emergency prescription clarification to attending doctor (2-4h response)"
                          >
                            <HelpCircle className="w-3.5 h-3.5 mr-1 text-purple-600 dark:text-purple-400" />
                            Ask Doctor
                          </Button>
                          <Link to="/patient/reminders">
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-teal-700 dark:text-teal-400 border-teal-300 dark:border-teal-800 hover:bg-teal-50 dark:hover:bg-teal-950/40"
                              title="Set or view automated dosage reminders"
                            >
                              <Clock className="w-3.5 h-3.5 mr-1" />
                              Reminders
                            </Button>
                          </Link>
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => setSelectedRxForExplanation(rx)}
                            className="bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300 border-indigo-200 dark:border-indigo-900/60 hover:bg-indigo-100"
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
                            Print
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
              )}
            </tbody>
          </table>
        </div>
        {displayPrescriptions.length > pageSize && (
          <TablePagination
            currentPage={currentPage}
            totalPages={Math.ceil(displayPrescriptions.length / pageSize)}
            totalItems={displayPrescriptions.length}
            pageSize={pageSize}
            onPageChange={setCurrentPage}
          />
        )}

      </Card>

      {/* Patient-friendly explanation modal */}
      {selectedRxForExplanation && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 dark:bg-[#080F1E]/80 backdrop-blur-xs cursor-pointer"

          onClick={() => setSelectedRxForExplanation(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-[#111E33] rounded-3xl shadow-2xl border border-slate-200 dark:border-[#263B59] w-full max-w-lg p-6 space-y-4 cursor-default text-slate-900 dark:text-[#F1F5F9]"
          >
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-[#263B59] pb-3">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-indigo-950/80 text-indigo-300 flex items-center justify-center font-bold border border-indigo-800">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">Patient-Friendly Medication Guide</h3>
                  <p className="text-xs text-slate-500 dark:text-[#94A3B8] font-mono">Prescription: {selectedRxForExplanation.prescriptionNumber}</p>
                </div>
              </div>
              <button onClick={() => setSelectedRxForExplanation(null)} className="text-slate-400 dark:text-[#94A3B8] hover:text-slate-700 dark:hover:text-white cursor-pointer">

                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-3 bg-blue-50 dark:bg-[#172640] border border-blue-200 dark:border-[#263B59] rounded-xl text-xs text-blue-900 dark:text-[#22D3EE]">

              💡 <strong>Plain English Translation:</strong> Here is how and when to safely take each medication as prescribed by <strong>{selectedRxForExplanation.doctorName}</strong>.
            </div>

            <div className="space-y-3 max-h-[350px] overflow-y-auto">
              {selectedRxForExplanation.medications.map((med, idx) => (
                <div key={idx} className="p-4 rounded-xl border border-slate-200 dark:border-[#263B59] bg-slate-50 dark:bg-[#0D1729] space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white">{med.name}</span>
                    <Badge variant="teal" size="sm">{med.dosage || '1 Dose'}</Badge>
                  </div>
                  <div className="text-slate-700 dark:text-[#CBD5E1] text-xs">
                    <strong>Schedule:</strong> {med.frequency} · <strong>Duration:</strong> {med.duration}
                  </div>
                  <div className="text-slate-500 dark:text-[#94A3B8] italic text-xs">
                    <strong>Timing:</strong> {med.route}
                  </div>
                  {med.instructions && (
                    <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-[#172640] border border-amber-200 dark:border-[#263B59] text-xs text-amber-900 dark:text-[#CBD5E1]">
                      ⚠️ <strong>Special Instruction:</strong> {med.instructions}
                    </div>
                  )}

                  <div className="pt-2 flex items-center justify-between border-t border-slate-200 dark:border-[#263B59] text-xs">
                    <button
                      type="button"
                      onClick={() => setSelectedMedicineForInfo({
                        name: med.name,
                        dosage: med.dosage,
                        doctorName: selectedRxForExplanation.doctorName
                      })}
                      className="text-blue-600 dark:text-blue-400 hover:underline font-semibold flex items-center gap-1 cursor-pointer"
                    >
                      <Info className="w-3.5 h-3.5" /> Full Drug Monograph
                    </button>
                    <Link
                      to="/patient/reminders"
                      className="text-teal-600 dark:text-teal-400 hover:underline font-semibold flex items-center gap-1"
                    >
                      <Clock className="w-3.5 h-3.5" /> Set Dosing Reminder &rarr;
                    </Link>
                  </div>

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

      {/* Drug Information Monograph Modal */}
      <MedicineInfoModal
        isOpen={!!selectedMedicineForInfo}
        onClose={() => setSelectedMedicineForInfo(null)}
        medicineName={selectedMedicineForInfo?.name}
        prescribedDosage={selectedMedicineForInfo?.dosage}
        doctorName={selectedMedicineForInfo?.doctorName}
      />

      {/* Prescription Clarification Modal */}
      <PrescriptionClarificationModal
        isOpen={!!clarificationModalRx}
        onClose={() => setClarificationModalRx(null)}
        prescription={clarificationModalRx}
      />

    </div>
  );
}

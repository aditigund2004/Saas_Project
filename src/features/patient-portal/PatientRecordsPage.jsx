import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import {
  FileText,
  Calendar,
  Stethoscope,
  Download,
  ExternalLink,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Activity,
  AlertCircle,
  Users
} from 'lucide-react';
import { Link } from 'react-router-dom';

export function PatientRecordsPage() {
  const { encounters, appointments, currentUser, familyMembers = [], activeClinic, showToast } = useApp();
  const [selectedEncounter, setSelectedEncounter] = useState(null);

  const myFamily = familyMembers.filter(
    (m) => m.primaryPatientId === 'pt-1041' || m.primaryPatientId === currentUser?.id
  );


  // Filter records strictly for current patient
  const patientAppointments = appointments.filter(
    (a) => a.patientName === currentUser?.name || a.patientId === 'pt-1041'
  );

  const patientEncounters = encounters.filter(
    (e) => e.patientName === currentUser?.name || e.patientId === 'pt-1041'
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Health Records</span>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">My Clinical Visit Summaries</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Authorized consultation records, clinical diagnoses, and recorded vitals from your clinic visits.
          </p>
        </div>

        <Link to="/patient/appointments/book">
          <Button variant="primary" size="md" className="shadow-md shadow-blue-500/20 font-bold">
            + Schedule New Consultation
          </Button>
        </Link>

      </div>

      {/* Security Privacy Notice */}
      <div className="p-4 sm:p-5 rounded-2xl bg-blue-50/80 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
        <div className="text-xs text-blue-950 dark:text-blue-200">
          <p className="font-bold text-sm">Confidential Health Partition</p>
          <p className="text-blue-800 dark:text-blue-300 text-xs mt-0.5">
            Your medical records are strictly partitioned. In this prototype, only your verified patient encounters ({currentUser?.name}) are displayed.
          </p>
        </div>
      </div>

      {/* Dependent Family Health Link */}
      <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-900/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 text-indigo-700 dark:text-indigo-300 flex items-center justify-center shrink-0">
            <Users className="w-4 h-4" />
          </div>
          <div>
            <p className="font-bold text-slate-900 dark:text-slate-100">
              Family Member Health Records
            </p>
            <p className="text-slate-500 dark:text-slate-400">
              You are managing records for <strong>{myFamily.length}</strong> family {myFamily.length === 1 ? 'member' : 'members'} ({myFamily.map((f) => `${f.name} - ${f.relationship}`).join(', ')}).
            </p>
          </div>
        </div>
        <Link
          to="/patient/family"
          className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold whitespace-nowrap self-start sm:self-center transition-colors shadow-xs"
        >
          Manage Family Records ({myFamily.length}/4) &rarr;
        </Link>
      </div>

      {/* Clinical Encounters List */}
      <div className="space-y-4">
        {patientEncounters.length === 0 ? (
          <Card className="p-12 text-center border-slate-200 dark:border-slate-800 dark:bg-slate-900/60">
            <FileText className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3" />
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">No Finalized Visit Summaries</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
              Your attending doctor will publish your clinical visit summary upon completing your scheduled consultation.
            </p>
          </Card>
        ) : (
          patientEncounters.map((enc) => (

            <Card key={enc.id} className="p-5 sm:p-6 border-slate-200 dark:border-slate-800 dark:bg-slate-900/90 hover:border-blue-300 dark:hover:border-blue-500/50 transition-all shadow-sm">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 dark:text-slate-100 text-base">{enc.doctorName}</h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {activeClinic.name} · Encounter Ref: <span className="font-mono">{enc.id}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-mono text-slate-600 dark:text-slate-400 font-medium">
                    📅 {enc.createdAt ? new Date(enc.createdAt).toISOString().slice(0, 10) : '2026-10-23'}
                  </span>
                  <Badge variant="Completed">Finalized & Signed</Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 text-xs">
                <div>
                  <span className="text-xs uppercase font-bold text-slate-400 dark:text-slate-500 block">Chief Complaint</span>
                  <p className="text-slate-800 dark:text-slate-200 font-medium mt-1 text-sm">{enc.chiefComplaint}</p>
                </div>

                <div>
                  <span className="text-xs uppercase font-bold text-slate-400 dark:text-slate-500 block">Diagnosis / Assessment</span>
                  <p className="text-blue-700 dark:text-blue-400 font-bold mt-1 text-sm">{enc.diagnosis}</p>
                </div>

                <div>
                  <span className="text-xs uppercase font-bold text-slate-400 dark:text-slate-500 block">Recorded Vitals</span>
                  <p className="text-slate-600 dark:text-slate-300 mt-1 font-mono text-xs">
                    BP: {enc.vitals?.bp || '120/80'} · Pulse: {enc.vitals?.pulse || '72 bpm'}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  Follow-up due: <strong className="text-slate-700 dark:text-slate-300">{enc.followUpDate || 'None required'}</strong>
                </span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedEncounter(enc)}
                  >
                    View Full Clinical Summary
                  </Button>
                  <Button
                    variant="primary"
                    size="sm"
                    icon={Download}
                    onClick={() => showToast('Simulated summary PDF downloaded.')}
                    className="shadow-sm"
                  >
                    Download PDF
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>


      {/* Clinical Summary Detail Modal */}
      {selectedEncounter && (
        <Modal
          isOpen={!!selectedEncounter}
          onClose={() => setSelectedEncounter(null)}
          title={`Clinical Encounter: ${selectedEncounter.diagnosis}`}
          size="lg"
        >
          <div className="space-y-4 text-sm">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800 grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-xs uppercase font-bold text-slate-400 dark:text-slate-500">Consulting Clinician</span>
                <p className="font-bold text-slate-900 dark:text-slate-100 text-sm">{selectedEncounter.doctorName}</p>
              </div>
              <div>
                <span className="text-xs uppercase font-bold text-slate-400 dark:text-slate-500">Issuing Clinic</span>
                <p className="font-bold text-slate-900 dark:text-slate-100 text-sm">{activeClinic.name}</p>
              </div>
              <div>
                <span className="text-xs uppercase font-bold text-slate-400 dark:text-slate-500">Patient</span>
                <p className="font-bold text-slate-900 dark:text-slate-100 text-sm">{selectedEncounter.patientName}</p>
              </div>
              <div>
                <span className="text-xs uppercase font-bold text-slate-400 dark:text-slate-500">Next Follow-Up</span>
                <p className="font-bold text-slate-900 dark:text-slate-100 text-sm">{selectedEncounter.followUpDate || 'As needed'}</p>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-1.5 text-xs uppercase tracking-wider">Clinical Findings & Assessment</h4>
              <p className="p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
                {selectedEncounter.clinicalFindings || 'No remarkable findings recorded during initial exam.'}
              </p>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-1.5 text-xs uppercase tracking-wider">Recommended Treatment Plan</h4>
              <p className="p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 leading-relaxed text-sm">
                {selectedEncounter.treatmentPlan || 'Follow prescribed medication and return for progress review.'}
              </p>
            </div>

            {selectedEncounter.medications?.length > 0 && (
              <div>
                <h4 className="font-bold text-slate-900 dark:text-slate-100 mb-2 text-xs uppercase tracking-wider">Prescribed Medications</h4>
                <div className="space-y-2">
                  {selectedEncounter.medications.map((m, idx) => (
                    <div key={idx} className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-slate-900 dark:text-slate-100 text-sm">{m.name} ({m.strength})</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">{m.dosage} · {m.frequency} · {m.duration}</p>
                      </div>
                      <span className="text-xs font-semibold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-0.5 rounded-full border border-blue-200/50 dark:border-blue-900/50">
                        {m.instructions}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2.5">
              <Button variant="outline" size="sm" onClick={() => setSelectedEncounter(null)}>
                Close
              </Button>
              <Link to="/patient/prescriptions">
                <Button variant="primary" size="sm">
                  View Prescription Copy
                </Button>
              </Link>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}


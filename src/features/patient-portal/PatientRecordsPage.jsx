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
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
<<<<<<< HEAD
=======
import { belongsToCurrentPatient } from './patientDataAccess';
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf

export function PatientRecordsPage() {
  const { encounters, appointments, currentUser, activeClinic, showToast } = useApp();
  const [selectedEncounter, setSelectedEncounter] = useState(null);

<<<<<<< HEAD
  // Filter records strictly for current patient
  const patientAppointments = appointments.filter(
    (a) => a.patientName === currentUser?.name || a.patientId === 'pt-1041'
  );

  const patientEncounters = encounters.filter(
    (e) => e.patientName === currentUser?.name || e.patientId === 'pt-1041'
=======
  const patientAppointments = appointments.filter((appointment) =>
    belongsToCurrentPatient(appointment, currentUser)
  );
  const patientEncounters = encounters.filter((encounter) =>
    belongsToCurrentPatient(encounter, currentUser)
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Health Records</span>
          <h1 className="text-2xl font-extrabold text-slate-900">My Clinical Visit Summaries</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Authorized consultation records, clinical diagnoses, and recorded vitals from your clinic visits.
          </p>
        </div>

        <Link to="/patient/appointments/book">
          <Button variant="primary" size="sm">
            + Schedule New Consultation
          </Button>
        </Link>
      </div>

      {/* Security Privacy Notice */}
      <div className="p-4 rounded-2xl bg-blue-50 border border-blue-200 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
        <div className="text-xs text-blue-900">
          <p className="font-bold">Confidential Health Partition</p>
          <p className="text-blue-800 text-[11px] mt-0.5">
            Your medical records are strictly partitioned. In this prototype, only your verified patient encounters ({currentUser?.name}) are displayed.
          </p>
        </div>
      </div>

      {/* Clinical Encounters List */}
      <div className="space-y-4">
        {patientEncounters.length === 0 ? (
          <Card className="p-12 text-center border-slate-200">
            <FileText className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-sm font-bold text-slate-800">No Finalized Visit Summaries</h3>
            <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
              Your attending doctor will publish your clinical visit summary upon completing your scheduled consultation.
            </p>
          </Card>
        ) : (
          patientEncounters.map((enc) => (
            <Card key={enc.id} className="p-5 border-slate-200 hover:border-blue-300 transition-all">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                    <Stethoscope className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{enc.doctorName}</h3>
                    <p className="text-xs text-slate-500">
                      {activeClinic.name} · Encounter Ref: <span className="font-mono">{enc.id}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono text-slate-600">
                    📅 {enc.createdAt ? new Date(enc.createdAt).toISOString().slice(0, 10) : '2026-10-23'}
                  </span>
                  <Badge variant="Completed">Finalized & Signed</Badge>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-3 text-xs">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Chief Complaint</span>
                  <p className="text-slate-800 font-medium mt-0.5">{enc.chiefComplaint}</p>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Diagnosis / Assessment</span>
                  <p className="text-blue-900 font-bold mt-0.5">{enc.diagnosis}</p>
                </div>

                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Recorded Vitals</span>
                  <p className="text-slate-600 mt-0.5">
                    BP: {enc.vitals?.bp || '120/80'} · Pulse: {enc.vitals?.pulse || '72 bpm'}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-medium">
                  Follow-up due: <strong>{enc.followUpDate || 'None required'}</strong>
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
          <div className="space-y-4 text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 grid grid-cols-2 gap-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Consulting Clinician</span>
                <p className="font-bold text-slate-900">{selectedEncounter.doctorName}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Issuing Clinic</span>
                <p className="font-bold text-slate-900">{activeClinic.name}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Patient</span>
                <p className="font-bold text-slate-900">{selectedEncounter.patientName}</p>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400">Next Follow-Up</span>
                <p className="font-bold text-slate-900">{selectedEncounter.followUpDate || 'As needed'}</p>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-1">Clinical Findings & Assessment</h4>
              <p className="p-3 bg-white rounded-lg border border-slate-200 text-slate-700 leading-relaxed">
                {selectedEncounter.clinicalFindings || 'No remarkable findings recorded during initial exam.'}
              </p>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-1">Recommended Treatment Plan</h4>
              <p className="p-3 bg-white rounded-lg border border-slate-200 text-slate-700 leading-relaxed">
                {selectedEncounter.treatmentPlan || 'Follow prescribed medication and return for progress review.'}
              </p>
            </div>

            {selectedEncounter.medications?.length > 0 && (
              <div>
                <h4 className="font-bold text-slate-900 mb-2">Prescribed Medications</h4>
                <div className="space-y-2">
                  {selectedEncounter.medications.map((m, idx) => (
                    <div key={idx} className="p-2.5 rounded-lg border border-slate-200 flex items-center justify-between">
                      <div>
                        <p className="font-bold text-slate-900">{m.name} ({m.strength})</p>
                        <p className="text-[11px] text-slate-500">{m.dosage} · {m.frequency} · {m.duration}</p>
                      </div>
                      <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                        {m.instructions}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-3 border-t border-slate-100 flex justify-end gap-2">
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
<<<<<<< HEAD

=======
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf

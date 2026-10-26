import React from 'react';
import { useApp } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Clock, UserCheck, Stethoscope, Play, AlertCircle, Phone, ArrowRight } from 'lucide-react';

export function ClinicQueuePage() {
  const { appointments, activeClinic, updateAppointmentStatus, showToast } = useApp();

  const todayStr = '2026-10-23';
  const todayApts = appointments.filter((a) => a.clinicId === activeClinic.id && a.date === todayStr);

  const waitingQueue = todayApts.filter((a) => a.status === 'Checked In');
  const inProgress = todayApts.filter((a) => a.status === 'In Progress');
  const completed = todayApts.filter((a) => a.status === 'Completed');

  const handleCallPatient = (apt) => {
    updateAppointmentStatus(apt.id, 'In Progress');
    showToast(`Called token ${apt.queueNumber} (${apt.patientName}) into operatory!`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200 uppercase tracking-wide">
              OPD Flow Monitor
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Live Patient Waiting Queue</h1>
          <p className="text-xs text-slate-500">
            Real-time multi-operatory token tracking, waiting time indicators, and room call-in controls
          </p>
        </div>
      </div>

      {/* Metric Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 border-blue-200 bg-blue-50/50">
          <div className="flex items-center justify-between text-blue-800 mb-1">
            <span className="text-xs font-bold uppercase">Currently Waiting</span>
            <Clock className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-3xl font-black text-blue-950">{waitingQueue.length} Patients</div>
          <p className="text-[11px] text-blue-700 mt-1">Average wait time: 14 mins</p>
        </Card>

        <Card className="p-4 border-amber-200 bg-amber-50/50">
          <div className="flex items-center justify-between text-amber-800 mb-1">
            <span className="text-xs font-bold uppercase">In Consultations</span>
            <Play className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-3xl font-black text-amber-950">{inProgress.length} Operatories</div>
          <p className="text-[11px] text-amber-700 mt-1">Active doctor consultations</p>
        </Card>

        <Card className="p-4 border-emerald-200 bg-emerald-50/50">
          <div className="flex items-center justify-between text-emerald-800 mb-1">
            <span className="text-xs font-bold uppercase">Completed Today</span>
            <UserCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-black text-emerald-950">{completed.length} Consultations</div>
          <p className="text-[11px] text-emerald-700 mt-1">Prescriptions issued and bills settled</p>
        </Card>
      </div>

      {/* Live Waiting Queue Table */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-600" />
          Queue Progression (Checked-In Order)
        </h3>

        <Card className="overflow-hidden border-slate-200">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">Token #</th>
                  <th className="px-4 py-3">Patient Name</th>
                  <th className="px-4 py-3">Assigned Doctor</th>
                  <th className="px-4 py-3">Scheduled Slot</th>
                  <th className="px-4 py-3">Procedure</th>
                  <th className="px-4 py-3">Queue Status</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {waitingQueue.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-4 py-8 text-center text-slate-400">
                      No patients currently waiting in the OPD queue.
                    </td>
                  </tr>
                ) : (
                  waitingQueue.map((apt, idx) => (
                    <tr key={apt.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 font-mono font-bold text-blue-700 text-sm">
                        {apt.queueNumber || `#Q-${idx + 1}`}
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-bold text-slate-900">{apt.patientName}</div>
                        <div className="text-[11px] text-slate-400 font-mono">{apt.patientPhone}</div>
                      </td>
                      <td className="px-4 py-3 font-semibold text-slate-800">
                        {apt.doctorName}
                      </td>
                      <td className="px-4 py-3 font-mono text-slate-600">
                        {apt.time}
                      </td>
                      <td className="px-4 py-3 text-slate-700">
                        {apt.serviceName}
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="teal" size="sm">Waiting (Pos {idx + 1})</Badge>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleCallPatient(apt)}
                          className="h-7 text-xs bg-blue-600 hover:bg-blue-700"
                        >
                          <Play className="w-3 h-3 mr-1 fill-current" />
                          Call Patient In
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


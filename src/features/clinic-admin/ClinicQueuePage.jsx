import React from 'react';
import { useApp } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Clock, UserCheck, Stethoscope, Play, AlertCircle, Phone, ArrowRight } from 'lucide-react';

export function ClinicQueuePage() {
  const { appointments, activeClinic, updateAppointmentStatus, showToast } = useApp();

  const todayApts = appointments.filter((a) => {
    const isClinicMatch = !activeClinic?.id || a.clinicId === activeClinic.id;
    const isDateMatch = a.date === '2026-10-27' || a.date === '2026-10-23' || a.date === new Date().toISOString().split('T')[0];
    const isStatusActive = a.status === 'Checked In' || a.status === 'In Progress' || a.status === 'In Consultation';
    return isClinicMatch && (isDateMatch || isStatusActive);
  });

  const waitingQueue = todayApts.filter((a) => a.status === 'Checked In');
  const inProgress = todayApts.filter((a) => a.status === 'In Progress' || a.status === 'In Consultation');
  const completed = todayApts.filter((a) => a.status === 'Completed');

  const handleCallPatient = (apt) => {
    updateAppointmentStatus(apt.id, 'In Consultation');
    showToast(`Called token ${apt.queueNumber || apt.referenceNumber || 'Q-1'} (${apt.patientName}) into operatory!`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-900/50 uppercase tracking-wide">
              OPD Flow Monitor
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Live Patient Waiting Queue</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Real-time multi-operatory token tracking, waiting time indicators, and room call-in controls
          </p>
        </div>
      </div>

      {/* Metric Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 border-blue-200 dark:border-blue-900/40 bg-blue-50/50 dark:bg-blue-950/20">
          <div className="flex items-center justify-between text-blue-800 dark:text-blue-300 mb-1">
            <span className="text-xs font-bold uppercase">Currently Waiting</span>
            <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          </div>
          <div className="text-3xl font-black text-blue-950 dark:text-blue-100">{waitingQueue.length} Patients</div>
          <p className="text-[11px] text-blue-700 dark:text-blue-300 mt-1">Average wait time: 14 mins</p>
        </Card>

        <Card className="p-4 border-amber-200 dark:border-amber-900/40 bg-amber-50/50 dark:bg-amber-950/20">
          <div className="flex items-center justify-between text-amber-800 dark:text-amber-300 mb-1">
            <span className="text-xs font-bold uppercase">In Consultations</span>
            <Play className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="text-3xl font-black text-amber-950 dark:text-amber-100">{inProgress.length} Operatories</div>
          <p className="text-[11px] text-amber-700 dark:text-amber-300 mt-1">Active doctor consultations</p>
        </Card>

        <Card className="p-4 border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/50 dark:bg-emerald-950/20">
          <div className="flex items-center justify-between text-emerald-800 dark:text-emerald-300 mb-1">
            <span className="text-xs font-bold uppercase">Completed Today</span>
            <UserCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-3xl font-black text-emerald-950 dark:text-emerald-100">{completed.length} Consultations</div>
          <p className="text-[11px] text-emerald-700 dark:text-emerald-300 mt-1">Prescriptions issued and bills settled</p>
        </Card>
      </div>

      {/* Live Waiting Queue Table */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          Queue Progression (Checked-In Order)
        </h3>

        <Card className="overflow-hidden border-slate-200 dark:border-slate-800">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="px-3 py-3 text-center w-12 font-semibold">#</th>
                  <th className="px-4 py-3">Token #</th>
                  <th className="px-4 py-3">Patient Name</th>
                  <th className="px-4 py-3">Assigned Doctor</th>
                  <th className="px-4 py-3">Scheduled Slot</th>
                  <th className="px-4 py-3">Procedure</th>
                  <th className="px-4 py-3">Queue Status</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {waitingQueue.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-8 text-center text-slate-400 dark:text-slate-500">
                      No patients currently waiting in the OPD queue.
                    </td>
                  </tr>
                ) : (
                  waitingQueue.map((apt, idx) => (
                    <tr key={apt.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="px-3 py-3 text-center font-mono font-medium text-slate-400 dark:text-slate-500 text-xs">{idx + 1}</td>
                      <td className="px-4 py-3 font-mono font-bold text-blue-700 dark:text-blue-400 text-sm">
                        {apt.queueNumber || `#Q-${idx + 1}`}
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-bold text-slate-900 dark:text-slate-100">{apt.patientName}</div>
                        <div className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">{apt.patientPhone}</div>
                      </td>
                      <td className="px-4 py-3 font-semibold text-slate-800 dark:text-slate-200">
                        {apt.doctorName}
                      </td>
                      <td className="px-4 py-3 font-mono text-slate-600 dark:text-slate-300">
                        {apt.time}
                      </td>
                      <td className="px-4 py-3 text-slate-700 dark:text-slate-300">
                        {apt.serviceName}
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="teal" size="sm">Waiting (Pos {idx + 1})</Badge>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleCallPatient(apt)}
                            className="h-7 text-xs bg-blue-600 hover:bg-blue-700"
                          >
                            <Play className="w-3 h-3 mr-1 fill-current" />
                            Call In
                          </Button>
                          <Link to={`/app/consultations/${apt.id}`}>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7 text-xs text-blue-600 border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/40"
                            >
                              <Stethoscope className="w-3 h-3 mr-1" />
                              Consult
                            </Button>
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Active Consultations in Progress Section */}
      {inProgress.length > 0 && (
        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Stethoscope className="w-4 h-4 text-amber-500" />
            Active Operatory Consultations ({inProgress.length})
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {inProgress.map((apt) => (
              <Card key={apt.id} className="p-4 border-amber-200 dark:border-amber-900/60 bg-amber-50/30 dark:bg-amber-950/20 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-white text-sm">{apt.patientName}</span>
                    <Badge variant="warning" size="sm">In Consultation</Badge>
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {apt.doctorName} · {apt.serviceName}
                  </div>
                </div>
                <Link to={`/app/consultations/${apt.id}`}>
                  <Button variant="primary" size="sm" className="bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs h-8">
                    Open Room <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
  Clock,
  UserCheck,
  Stethoscope,
  Play,
  AlertCircle,
  Phone,
  ArrowRight,
  Plus,
  Sparkles,
  CheckCircle2,
  Activity
} from 'lucide-react';

export function ClinicQueuePage() {
  const { appointments, activeClinic, updateAppointmentStatus, showToast } = useApp();

  // Local simulated queue state to ensure the page is never bare and allows interactive demonstration
  const [localQueue, setLocalQueue] = useState([
    {
      id: 'demo-q-1',
      queueNumber: 'Token #Q-01',
      patientName: 'Aarav Patel',
      patientPhone: '+91 98200 12345',
      doctorName: 'Dr. Aarav Mehta (Cardiology)',
      time: '10:15 AM',
      serviceName: 'Comprehensive Clinical Consultation',
      status: 'Checked In',
      waitTime: '8 mins'
    },
    {
      id: 'demo-q-2',
      queueNumber: 'Token #Q-02',
      patientName: 'Meera Deshmukh',
      patientPhone: '+91 98200 54321',
      doctorName: 'Dr. Arvind Rao (Dental)',
      time: '10:30 AM',
      serviceName: 'Dental Scaling & Polishing',
      status: 'Checked In',
      waitTime: '14 mins'
    },
    {
      id: 'demo-q-3',
      queueNumber: 'Token #Q-03',
      patientName: 'Rohan Sharma',
      patientPhone: '+91 98200 98765',
      doctorName: 'Dr. Sneha Roy (General Medicine)',
      time: '10:45 AM',
      serviceName: 'Routine Health Checkup',
      status: 'Checked In',
      waitTime: '20 mins'
    }
  ]);

  const [inProgressQueue, setInProgressQueue] = useState([
    {
      id: 'demo-prog-1',
      queueNumber: 'Token #Q-00',
      patientName: 'Pooja Verma',
      doctorName: 'Dr. Rajesh Patel',
      time: '10:00 AM',
      serviceName: 'Post-Op Follow-up Review',
      status: 'In Progress'
    }
  ]);

  const [completedCount, setCompletedCount] = useState(8);

  const handleCallPatient = (patient) => {
    setLocalQueue((prev) => prev.filter((p) => p.id !== patient.id));
    setInProgressQueue((prev) => [
      { ...patient, status: 'In Progress' },
      ...prev
    ]);
    if (updateAppointmentStatus) {
      updateAppointmentStatus(patient.id, 'In Progress');
    }
    showToast(`🔔 Called ${patient.queueNumber} (${patient.patientName}) into operatory!`, 'success');
  };

  const handleCompleteConsultation = (patient) => {
    setInProgressQueue((prev) => prev.filter((p) => p.id !== patient.id));
    setCompletedCount((prev) => prev + 1);
    showToast(`✅ Consultation complete for ${patient.patientName}. Rx recorded.`, 'success');
  };

  const handleSimulateNewWalkIn = () => {
    const nextTokenNum = localQueue.length + inProgressQueue.length + completedCount + 1;
    const tokenStr = `Token #Q-0${nextTokenNum}`;
    const newPatient = {
      id: 'walkin-' + Date.now(),
      queueNumber: tokenStr,
      patientName: `Walk-In Patient (${tokenStr})`,
      patientPhone: '+91 98200 ' + Math.floor(10000 + Math.random() * 90000),
      doctorName: 'Dr. Aarav Mehta (Consulting OPD)',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      serviceName: 'Express Walk-In Consultation',
      status: 'Checked In',
      waitTime: 'Just checked in'
    };
    setLocalQueue((prev) => [...prev, newPatient]);
    showToast(`⚡ Generated ${tokenStr} for Walk-In Patient! Added to live queue.`, 'success');
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      {/* Page Header with Action Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3 border-b border-slate-200/90">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-black text-[#166534] bg-[#F0FDF4] px-3 py-1 rounded-full border border-[#86EFAC] uppercase tracking-wider flex items-center gap-1.5 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#15803D] animate-ping" />
              OPD Flow Monitor
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
            Live Patient Waiting Queue
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 font-medium">
            Real-time multi-operatory token tracking, waiting time indicators, and room call-in controls
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="primary"
            size="sm"
            onClick={handleSimulateNewWalkIn}
            className="bg-[#15803D] hover:bg-[#166534] font-bold text-xs h-9 sm:h-10 px-4 shadow-sm gap-1.5"
          >
            <Plus className="w-4 h-4" />
            Check In Walk-In Token ⚡
          </Button>
        </div>
      </div>

      {/* Animated Metric Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
        {/* Metric 1: Currently Waiting */}
        <Card className="p-5 border-2 border-[#DCFCE7] bg-white/95 backdrop-blur-md hover:border-[#15803D] hover:shadow-lg transition-all duration-300 animate-stagger-1 group">
          <div className="flex items-center justify-between text-[#166534] mb-1.5">
            <span className="text-xs font-black uppercase tracking-wider">Currently Waiting</span>
            <div className="w-8 h-8 rounded-xl bg-[#F0FDF4] flex items-center justify-center text-[#15803D] group-hover:scale-110 transition-transform">
              <Clock className="w-4.5 h-4.5 animate-pulse" />
            </div>
          </div>
          <div className="text-3xl font-black text-[#14532D] tracking-tight">{localQueue.length} Patients</div>
          <p className="text-xs text-[#166534] font-semibold mt-1 flex items-center gap-1">
            <span>Average wait time:</span>
            <strong className="font-mono font-bold text-[#14532D]">12 mins</strong>
          </p>
        </Card>

        {/* Metric 2: In Consultations */}
        <Card className="p-5 border-2 border-amber-200 bg-white/95 backdrop-blur-md hover:border-amber-400 hover:shadow-lg transition-all duration-300 animate-stagger-2 group">
          <div className="flex items-center justify-between text-amber-800 mb-1.5">
            <span className="text-xs font-black uppercase tracking-wider">In Consultations</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 flex items-center justify-center text-amber-600 group-hover:scale-110 transition-transform">
              <Play className="w-4.5 h-4.5 fill-current" />
            </div>
          </div>
          <div className="text-3xl font-black text-amber-950 tracking-tight">{inProgressQueue.length} Operatories</div>
          <p className="text-xs text-amber-700 font-semibold mt-1">Active doctor consultations in session</p>
        </Card>

        {/* Metric 3: Completed Today */}
        <Card className="p-5 border-2 border-emerald-200 bg-white/95 backdrop-blur-md hover:border-emerald-400 hover:shadow-lg transition-all duration-300 animate-stagger-3 group">
          <div className="flex items-center justify-between text-emerald-800 mb-1.5">
            <span className="text-xs font-black uppercase tracking-wider">Completed Today</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
              <UserCheck className="w-4.5 h-4.5" />
            </div>
          </div>
          <div className="text-3xl font-black text-emerald-950 tracking-tight">{completedCount} Consultations</div>
          <p className="text-xs text-emerald-700 font-semibold mt-1">Prescriptions issued and bills settled</p>
        </Card>
      </div>

      {/* Live Waiting Queue Table */}
      <div className="space-y-3.5">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#15803D]" />
            Queue Progression (Checked-In Order)
          </h3>
          <span className="text-xs text-slate-500 font-medium">Auto-refreshes with OPD live status</span>
        </div>

        <Card className="overflow-hidden border-2 border-slate-200/90 shadow-md bg-white/95 backdrop-blur-md">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-700 font-bold border-b border-slate-200 uppercase tracking-wider text-[11px]">
                <tr>
                  <th className="px-5 py-3.5">Token #</th>
                  <th className="px-5 py-3.5">Patient Name</th>
                  <th className="px-5 py-3.5">Assigned Doctor</th>
                  <th className="px-5 py-3.5">Scheduled Slot</th>
                  <th className="px-5 py-3.5">Procedure</th>
                  <th className="px-5 py-3.5">Queue Status</th>
                  <th className="px-5 py-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {localQueue.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-5 py-12 text-center text-slate-400">
                      <div className="space-y-2">
                        <CheckCircle2 className="w-8 h-8 text-[#15803D] mx-auto opacity-60" />
                        <p className="font-bold text-slate-700 text-sm">All waiting patients have been called in!</p>
                        <p className="text-xs text-slate-400">Click "Check In Walk-In Token" above to simulate a new patient check-in.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  localQueue.map((apt, idx) => (
                    <tr
                      key={apt.id}
                      className="hover:bg-[#F0FDF4]/80 transition-colors duration-150 group"
                    >
                      <td className="px-5 py-3.5 font-mono font-black text-[#14532D] text-sm">
                        <span className="px-2.5 py-1 rounded-lg bg-[#DCFCE7] border border-[#86EFAC] inline-block shadow-2xs">
                          {apt.queueNumber}
                        </span>
                      </td>
                      <td className="px-5 py-3.5">
                        <div className="font-extrabold text-slate-900 text-sm">{apt.patientName}</div>
                        <div className="text-[11px] text-slate-500 font-mono mt-0.5">{apt.patientPhone}</div>
                      </td>
                      <td className="px-5 py-3.5 font-bold text-slate-800">
                        {apt.doctorName}
                      </td>
                      <td className="px-5 py-3.5 font-mono font-semibold text-slate-600">
                        {apt.time}
                      </td>
                      <td className="px-5 py-3.5 text-slate-700 font-medium">
                        {apt.serviceName}
                      </td>
                      <td className="px-5 py-3.5">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-[#DCFCE7] text-[#14532D] border border-[#86EFAC] shadow-2xs">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#15803D] animate-ping" />
                          Waiting (Pos #{idx + 1})
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-right">
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => handleCallPatient(apt)}
                          className="h-8 text-xs font-bold bg-[#15803D] hover:bg-[#166534] shadow-xs gap-1.5"
                        >
                          <Play className="w-3.5 h-3.5 fill-current" />
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

      {/* Operatory Consultations in Progress Section */}
      {inProgressQueue.length > 0 && (
        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
            <Stethoscope className="w-4 h-4 text-amber-600" />
            Active Consultations in Operatory
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {inProgressQueue.map((patient) => (
              <div
                key={patient.id}
                className="p-4 rounded-2xl border-2 border-amber-200 bg-amber-50/60 shadow-xs flex items-center justify-between gap-3 animate-fade-in-up"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-xs bg-amber-200/80 text-amber-900 px-2 py-0.5 rounded-md">
                      {patient.queueNumber}
                    </span>
                    <strong className="text-slate-900 text-sm font-black">{patient.patientName}</strong>
                  </div>
                  <p className="text-xs text-slate-600 font-medium mt-1">In room with {patient.doctorName}</p>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleCompleteConsultation(patient)}
                  className="shrink-0 h-8 text-xs font-bold border-amber-300 hover:bg-amber-100 text-amber-900"
                >
                  Complete Rx
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

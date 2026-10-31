import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import {
  Users,
  CheckCircle2,
  Clock,
  Printer,
  Sparkles,
  AlertTriangle,
  Receipt,
  FileText,
  Save,
  ShieldCheck,
  Calendar,
  CheckSquare,
  Square
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function HandoverWorkspace() {
  const { handoverData, updateHandoverTask, updateHandoverNotes, showToast } = useApp();

  const [notes, setNotes] = useState(handoverData?.shiftNotes || '');

  const checklist = handoverData?.checklist || [];
  const pendingPatients = handoverData?.pendingPatients || [];

  const handleSaveNotes = () => {
    updateHandoverNotes(notes);
  };

  const handleToggleTask = (taskId, currentVal) => {
    updateHandoverTask(taskId, !currentVal);
    showToast('Handover checklist item updated');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-700 text-white p-6 rounded-3xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold mb-2">
            <Clock className="w-3.5 h-3.5 text-blue-200" />
            Shift Transition & Duty Log
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            End-of-Day Shift Handover
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 max-w-xl mt-1">
            Reconcile daily cash collections, unresolved patient inquiries, and pending clinical reports before handing keys to the incoming receptionist shift.
          </p>
        </div>

        <Button
          variant="outline"
          size="md"
          onClick={() => window.print()}
          className="bg-white/10 hover:bg-white/20 text-white border-white/30 text-xs font-bold self-start md:self-center"
        >
          <Printer className="w-4 h-4 mr-1.5" /> Print Shift Dossier
        </Button>
      </div>

      {/* Shift Metadata Strip */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div>
          <span className="text-slate-400 text-[10px] uppercase font-bold block">Outgoing Staff</span>
          <span className="font-extrabold text-slate-900 dark:text-white">{handoverData?.outgoingStaff}</span>
        </div>
        <div>
          <span className="text-slate-400 text-[10px] uppercase font-bold block">Incoming Staff</span>
          <span className="font-extrabold text-blue-600 dark:text-blue-400">{handoverData?.incomingStaff}</span>
        </div>
        <div>
          <span className="text-slate-400 text-[10px] uppercase font-bold block">Shift Type</span>
          <span className="font-bold text-slate-800 dark:text-slate-200">{handoverData?.shiftType}</span>
        </div>
        <div>
          <span className="text-slate-400 text-[10px] uppercase font-bold block">Total Day Check-Ins</span>
          <span className="font-black text-emerald-600 dark:text-emerald-400 text-sm">{handoverData?.totalCheckIns} Patients</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Handover Checklist & Pending Patients */}
        <div className="lg:col-span-7 space-y-5">
          {/* Shift Checklist */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                Operational Handover Checklist
              </h3>
              <Badge variant="primary" size="sm">
                {checklist.filter((c) => c.completed).length} of {checklist.length} Verified
              </Badge>
            </div>

            <div className="space-y-2 text-xs">
              {checklist.map((task) => (
                <div
                  key={task.id}
                  onClick={() => handleToggleTask(task.id, task.completed)}
                  className={`p-3.5 rounded-2xl border transition-all flex items-start gap-3 cursor-pointer ${
                    task.completed
                      ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800 text-emerald-950 dark:text-emerald-100'
                      : 'bg-white dark:bg-slate-850 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-blue-400'
                  }`}
                >
                  {task.completed ? (
                    <CheckSquare className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <Square className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                  )}
                  <span className={`font-medium ${task.completed ? 'line-through opacity-80' : ''}`}>
                    {task.task}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Patients Transition */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <h4 className="font-extrabold text-slate-900 dark:text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Users className="w-4 h-4 text-amber-500" /> Pending In-Flight Patients Handed Over
            </h4>
            <div className="space-y-2 text-xs">
              {pendingPatients.map((p, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 flex justify-between items-center"
                >
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">{p.name} ({p.time})</span>
                    <span className="text-[11px] text-slate-500">{p.doctor} · {p.notes}</span>
                  </div>
                  <Badge variant="warning" size="sm">
                    {p.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Editable Shift Notes */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
              Shift Transfer Notes & Cash Ledger
            </h3>
            <p className="text-xs text-slate-500">
              Crucial operational observations, courier pickups, and cash balance reconciliations for the incoming shift.
            </p>

            <textarea
              rows={8}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Record cash balance, pending courier packages, or doctor availability adjustments..."
              className="w-full text-xs p-3.5 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-hidden"
            />
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
            <span className="text-[11px] text-slate-400">Autosaves locally</span>
            <Button variant="primary" size="sm" onClick={handleSaveNotes} className="font-bold">
              <Save className="w-3.5 h-3.5 mr-1" /> Save Shift Notes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}


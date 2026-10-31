import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import {
  Users,
  Stethoscope,
  Clock,
  Sparkles,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Building2,
  RefreshCw
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function QueueBalancer() {
  const { doctors = [], appointments = [], showToast } = useApp();

  const [doctorQueues, setDoctorQueues] = useState([
    {
      doctorId: 'doc-aarav',
      doctorName: 'Dr. Aarav Mehta',
      specialty: 'Family Medicine & Cardiology',
      room: 'Chamber 101',
      activeQueueCount: 4,
      avgMinsPerPatient: 18,
      estimatedWaitMins: 42,
      pressureStatus: 'High Pressure',
      pressureColor: 'rose',
      currentlyServing: 'Kavita Joshi'
    },
    {
      doctorId: 'doc-rohan',
      doctorName: 'Dr. Rohan Deshmukh',
      specialty: 'Cardiovascular Specialist',
      room: 'Chamber 102',
      activeQueueCount: 2,
      avgMinsPerPatient: 22,
      estimatedWaitMins: 24,
      pressureStatus: 'Moderate',
      pressureColor: 'blue',
      currentlyServing: 'Rajesh Malhotra'
    },
    {
      doctorId: 'doc-sneha',
      doctorName: 'Dr. Sneha Joshi',
      specialty: 'Internal Medicine & Women Health',
      room: 'Chamber 103',
      activeQueueCount: 1,
      avgMinsPerPatient: 15,
      estimatedWaitMins: 10,
      pressureStatus: 'Light / Fast',
      pressureColor: 'emerald',
      currentlyServing: 'Sunita Patel'
    }
  ]);

  const handleRebalanceSlot = (sourceDoc, targetDoc) => {
    setDoctorQueues((prev) =>
      prev.map((d) => {
        if (d.doctorId === sourceDoc) {
          return {
            ...d,
            activeQueueCount: Math.max(1, d.activeQueueCount - 1),
            estimatedWaitMins: Math.max(10, d.estimatedWaitMins - 18)
          };
        }
        if (d.doctorId === targetDoc) {
          return {
            ...d,
            activeQueueCount: d.activeQueueCount + 1,
            estimatedWaitMins: d.estimatedWaitMins + 16
          };
        }
        return d;
      })
    );
    showToast('Rebalanced queue slot: Patient redirected to available chamber');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-700 text-white p-6 rounded-3xl shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold mb-2">
              <Users className="w-3.5 h-3.5 text-blue-200" />
              Real-Time Workload Leveling
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Smart Queue Balancer
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 max-w-xl mt-1">
              Analyze wait times across consulting chambers and redirect walk-ins or flexible follow-ups to balance clinic throughput.
            </p>
          </div>

          <Badge variant="success" size="lg" className="bg-white/20 text-white border-white/30 font-bold px-3 py-1.5 self-start sm:self-center">
            3 Chambers Active
          </Badge>
        </div>
      </div>

      {/* Doctor Chambers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {doctorQueues.map((doc) => {
          const isHigh = doc.pressureStatus === 'High Pressure';
          const isLight = doc.pressureStatus === 'Light / Fast';

          return (
            <div
              key={doc.doctorId}
              className={`p-6 rounded-3xl border-2 transition-all space-y-5 bg-white dark:bg-slate-900 ${
                isHigh
                  ? 'border-rose-400 dark:border-rose-800/80 shadow-md ring-2 ring-rose-400/20'
                  : isLight
                  ? 'border-emerald-400 dark:border-emerald-800/80'
                  : 'border-slate-200 dark:border-slate-800 shadow-xs'
              }`}
            >
              <div className="flex items-center justify-between">
                <Badge
                  variant={isHigh ? 'warning' : isLight ? 'success' : 'primary'}
                  size="sm"
                  className={isHigh ? 'bg-rose-500 text-white font-bold' : ''}
                >
                  {doc.pressureStatus}
                </Badge>
                <span className="text-[11px] font-bold text-slate-400">{doc.room}</span>
              </div>

              <div>
                <h3 className="font-black text-slate-900 dark:text-white text-base">
                  {doc.doctorName}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">{doc.specialty}</p>
              </div>

              {/* Stats Box */}
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Waiting Patients:</span>
                  <span className="font-extrabold text-slate-900 dark:text-white">
                    {doc.activeQueueCount} in lounge
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Estimated Wait:</span>
                  <span
                    className={`font-black ${
                      isHigh ? 'text-rose-600 dark:text-rose-400' : 'text-slate-900 dark:text-white'
                    }`}
                  >
                    ~{doc.estimatedWaitMins} Mins
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Currently in Chamber:</span>
                  <span className="font-bold text-blue-600 dark:text-blue-400">{doc.currentlyServing}</span>
                </div>
              </div>

              {/* Action */}
              {isHigh ? (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleRebalanceSlot('doc-aarav', 'doc-sneha')}
                  className="w-full text-xs font-bold text-rose-600 border-rose-300 hover:bg-rose-50"
                >
                  Transfer 1 Slot to Dr. Sneha →
                </Button>
              ) : isLight ? (
                <div className="text-center p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 text-xs font-bold">
                  ✓ Available to absorb walk-ins
                </div>
              ) : (
                <div className="text-center p-2 text-xs text-slate-400 font-semibold">
                  Operating at optimal pace
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}


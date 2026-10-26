import React from 'react';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { StatCard } from '../../components/ui/StatCard';
import { Button } from '../../components/ui/Button';
import { Users, Clock, CheckCircle, Calendar, Download } from 'lucide-react';

export function ReceptionReportsPage() {
  const { appointments, activeBranch, showToast } = useApp();

  const branchAppointments = appointments.filter((a) => !activeBranch || a.branchId === activeBranch.id);
  const walkInsCount = branchAppointments.filter((a) => a.isWalkIn).length;
  const onlineCount = branchAppointments.filter((a) => !a.isWalkIn).length;
  const completedCount = branchAppointments.filter((a) => a.status === 'Completed').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Shift Summary</span>
          <h1 className="text-2xl font-extrabold text-slate-900">Reception Operational Log</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Daily throughput report for walk-in arrivals, online confirmations, and wait time averages.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          icon={Download}
          onClick={() => showToast('Daily reception shift summary exported.')}
        >
          Export Shift Summary
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Express Walk-Ins"
          value={walkInsCount.toString()}
          change="Arrived at desk directly"
          trend="up"
          icon={Clock}
          color="teal"
          subtitle="Tokens issued without booking"
        />
        <StatCard
          title="Scheduled Online Bookings"
          value={onlineCount.toString()}
          change="Portal & WhatsApp leads"
          trend="up"
          icon={Calendar}
          color="blue"
          subtitle="Pre-allocated consultation slots"
        />
        <StatCard
          title="Total Consultations Resolved"
          value={completedCount.toString()}
          change="Patients checked out"
          trend="up"
          icon={CheckCircle}
          color="emerald"
          subtitle="Completed today on this branch"
        />
      </div>

      <Card>
        <CardHeader
          title="Reception Shift Highlights"
          subtitle="Key front-desk performance observations"
        />
        <CardContent className="space-y-3 text-xs text-slate-600">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between">
            <span>Average Patient Waiting Time:</span>
            <span className="font-bold text-slate-900">8.5 Minutes</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between">
            <span>WhatsApp Confirmations Dispatched:</span>
            <span className="font-bold text-blue-800">100% of Verified Numbers</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex justify-between">
            <span>Duplicate Patients Detected & Prevented:</span>
            <span className="font-bold text-slate-900">4 Instances</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


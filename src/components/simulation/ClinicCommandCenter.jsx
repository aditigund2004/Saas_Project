import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import {
  Activity,
  Users,
  Building2,
  Stethoscope,
  Package,
  Clock,
  Sparkles,
  AlertTriangle,
  CheckCircle2,
  Tv,
  DoorOpen,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function ClinicCommandCenter() {
  const {
    activeClinic,
    appointments = [],
    clinicRooms = [],
    inventory = [],
    doctors = []
  } = useApp();

  const activeWaiting = appointments.filter(
    (a) => a.status === 'Checked In' || a.status === 'Patient Checked In'
  );
  const inConsultation = appointments.filter(
    (a) => a.status === 'In Progress' || a.status === 'In Consultation'
  );
  const lowStockItems = inventory.filter((i) => i.quantity <= (i.minStock || 10));

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-blue-500/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-bold mb-2">
            <Activity className="w-3.5 h-3.5 text-blue-400" />
            Executive Facility Spatial Cockpit
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Clinic Command Center
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 max-w-2xl mt-1">
            Real-time unified facility radar: live queue flow, chamber occupancy, physician status, and critical supply alerts for {activeClinic?.name || 'CityCare Practice'}.
          </p>
        </div>

        <Badge variant="success" size="lg" className="bg-emerald-500/20 text-emerald-300 border-emerald-400/30 font-bold px-3 py-1.5 self-start md:self-center">
          Operations Synchronized ✓
        </Badge>
      </div>

      {/* Spatial 3-Section Command Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* SECTION 1: Chambers & Doctors Spatial Grid (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-extrabold text-slate-900 dark:text-white text-base flex items-center gap-2">
                <DoorOpen className="w-5 h-5 text-blue-600" /> Clinical Chambers & Physician Roster
              </h3>
              <span className="text-xs text-slate-400 font-bold">
                {clinicRooms.filter((r) => r.status === 'Occupied').length} / {clinicRooms.length} Active
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {clinicRooms.map((room) => {
                const isOccupied = room.status === 'Occupied';
                const isAvailable = room.status === 'Available';

                return (
                  <div
                    key={room.id}
                    className={`p-4 rounded-2xl border transition-all text-xs space-y-2 ${
                      isOccupied
                        ? 'bg-amber-50/50 dark:bg-amber-950/20 border-amber-300 dark:border-amber-800'
                        : isAvailable
                        ? 'bg-emerald-50/50 dark:bg-emerald-950/20 border-emerald-300 dark:border-emerald-800'
                        : 'bg-slate-50 dark:bg-slate-850 border-slate-200 dark:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 dark:text-white">{room.name}</span>
                      <Badge variant={isOccupied ? 'warning' : isAvailable ? 'success' : 'neutral'} size="sm">
                        {room.status}
                      </Badge>
                    </div>

                    <div className="text-[11px] text-slate-500">
                      Doctor: <strong className="text-slate-800 dark:text-slate-200">{room.doctorAssigned || 'On Duty'}</strong>
                    </div>

                    <div className="p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[11px]">
                      {isOccupied ? (
                        <span className="text-amber-800 dark:text-amber-200 font-semibold">
                          Consulting: {room.currentPatient || 'Active Patient'}
                        </span>
                      ) : (
                        <span className="text-emerald-700 dark:text-emerald-300 font-semibold">
                          Chamber ready for next queue token
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Real-time Inflow Queue */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-slate-900 dark:text-white text-sm flex items-center gap-2">
                <Users className="w-4 h-4 text-emerald-500" /> Waiting Lounge Patient Queue ({activeWaiting.length})
              </h4>
              <span className="text-xs text-blue-600 dark:text-blue-400 font-bold">
                Avg wait: ~14 mins
              </span>
            </div>

            <div className="space-y-2 text-xs">
              {activeWaiting.length === 0 ? (
                <div className="p-4 text-center text-slate-400 italic">No patients currently in waiting lounge</div>
              ) : (
                activeWaiting.map((apt) => (
                  <div
                    key={apt.id}
                    className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 flex items-center justify-between"
                  >
                    <div>
                      <span className="font-bold text-slate-900 dark:text-white">{apt.patientName}</span>
                      <span className="text-slate-400 text-[11px] ml-2">Token {apt.queueNumber || '#12'}</span>
                      <div className="text-[10px] text-slate-500">Dr. {apt.doctorName} · {apt.serviceName}</div>
                    </div>
                    <Badge variant="primary" size="sm">Waiting</Badge>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* SECTION 2: Inventory & Urgent Alerts Sidebar (5 cols) */}
        <div className="lg:col-span-5 space-y-5">
          {/* Quick Facility Metrics */}
          <div className="grid grid-cols-2 gap-3 text-center">
            <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Today's Visits</span>
              <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                {appointments.length}
              </div>
            </div>
            <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">In Chamber</span>
              <div className="text-2xl font-black text-emerald-600 dark:text-emerald-400 mt-1">
                {inConsultation.length}
              </div>
            </div>
          </div>

          {/* Supply & Low Stock Radar */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-slate-900 dark:text-white text-xs uppercase tracking-wider flex items-center gap-1.5">
                <Package className="w-4 h-4 text-rose-500" /> Critical Supply Alerts ({lowStockItems.length})
              </h4>
              <Badge variant="warning" size="sm">Action</Badge>
            </div>

            <div className="space-y-2 text-xs">
              {lowStockItems.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  className="p-3 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900 flex justify-between items-center"
                >
                  <div>
                    <span className="font-bold text-slate-900 dark:text-white block">{item.name}</span>
                    <span className="text-[10px] text-slate-500">{item.category}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-black text-rose-600 block">{item.quantity} Left</span>
                    <span className="text-[9px] text-slate-400">Min: {item.minStock || 10}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Today's Front Desk Action Directives */}
          <div className="p-5 rounded-3xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900 space-y-2 text-xs">
            <span className="font-extrabold text-blue-900 dark:text-blue-200 text-xs uppercase tracking-wider block">
              Operational Priority Directives
            </span>
            <ul className="space-y-1.5 text-slate-700 dark:text-slate-300">
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Chamber 101 running on time. Next walk-in slot opens at 01:45 PM.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span>Courier pickup scheduled for 03:00 PM for external histopathology.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}


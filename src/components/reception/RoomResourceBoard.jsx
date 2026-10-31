import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import {
  Building2,
  CheckCircle2,
  Clock,
  Sparkles,
  AlertTriangle,
  Stethoscope,
  RefreshCw,
  Wrench,
  ShieldCheck,
  DoorOpen
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function RoomResourceBoard() {
  const { clinicRooms = [], updateRoomStatus } = useApp();

  const handleStatusChange = (roomId, newStatus) => {
    updateRoomStatus(roomId, newStatus);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Available':
        return <Badge variant="success" size="sm">Available / Ready</Badge>;
      case 'Occupied':
        return <Badge variant="warning" size="sm" className="bg-amber-500 text-white">In Use / Occupied</Badge>;
      case 'Cleaning':
        return <Badge variant="primary" size="sm" className="bg-blue-600 text-white">Sanitization In Progress</Badge>;
      default:
        return <Badge variant="neutral" size="sm">Maintenance</Badge>;
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-700 text-white p-6 rounded-3xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold mb-2">
            <Building2 className="w-3.5 h-3.5 text-blue-200" />
            Clinic Spatial & Chamber Operations
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Room & Resource Board
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 max-w-xl mt-1">
            Real-time occupancy status, diagnostic equipment readiness, and sanitization cycles across all clinic examination chambers.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs font-bold self-start md:self-center">
          <Badge variant="success" size="lg" className="bg-white/20 text-white border-white/30 px-3 py-1.5">
            {clinicRooms.filter((r) => r.status === 'Available').length} Rooms Ready
          </Badge>
        </div>
      </div>

      {/* Room Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {clinicRooms.map((room) => {
          const isAvailable = room.status === 'Available';
          const isOccupied = room.status === 'Occupied';
          const isCleaning = room.status === 'Cleaning';

          return (
            <div
              key={room.id}
              className={`p-6 rounded-3xl border-2 transition-all space-y-4 bg-white dark:bg-slate-900 ${
                isOccupied
                  ? 'border-amber-300 dark:border-amber-800 shadow-xs'
                  : isAvailable
                  ? 'border-emerald-300 dark:border-emerald-800'
                  : 'border-blue-300 dark:border-blue-800'
              }`}
            >
              <div className="flex items-center justify-between">
                {getStatusBadge(room.status)}
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  {room.type}
                </span>
              </div>

              <div>
                <h3 className="font-black text-slate-900 dark:text-white text-base">
                  {room.name}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Assigned: <strong>{room.doctorAssigned || 'Rotating Physician'}</strong>
                </p>
              </div>

              {/* Occupancy or Sanitization status */}
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
                {isOccupied ? (
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Current Patient</span>
                    <span className="font-bold text-slate-900 dark:text-white">{room.currentPatient || 'Active Consultation'}</span>
                  </div>
                ) : (
                  <div>
                    <span className="text-slate-400 text-[10px] uppercase font-bold block">Last Sanitized</span>
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">{room.sanitizedAt}</span>
                  </div>
                )}
              </div>

              {/* Equipment Tags */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                  Verified Equipment
                </span>
                <div className="flex flex-wrap gap-1">
                  {room.equipment.map((eq, i) => (
                    <span
                      key={i}
                      className="text-[10px] px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                    >
                      {eq}
                    </span>
                  ))}
                </div>
              </div>

              {/* Quick Status Toggles */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex gap-1.5">
                <button
                  type="button"
                  onClick={() => handleStatusChange(room.id, 'Available')}
                  className={`flex-1 py-1.5 rounded-xl text-[10px] font-bold transition-all cursor-pointer border ${
                    isAvailable
                      ? 'bg-emerald-600 text-white border-emerald-600'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  Ready
                </button>
                <button
                  type="button"
                  onClick={() => handleStatusChange(room.id, 'Occupied')}
                  className={`flex-1 py-1.5 rounded-xl text-[10px] font-bold transition-all cursor-pointer border ${
                    isOccupied
                      ? 'bg-amber-500 text-white border-amber-500'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  In Use
                </button>
                <button
                  type="button"
                  onClick={() => handleStatusChange(room.id, 'Cleaning')}
                  className={`flex-1 py-1.5 rounded-xl text-[10px] font-bold transition-all cursor-pointer border ${
                    isCleaning
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
                  }`}
                >
                  Sanitize
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}


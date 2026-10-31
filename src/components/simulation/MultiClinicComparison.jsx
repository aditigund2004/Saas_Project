import React from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import {
  Building2,
  TrendingUp,
  Users,
  CreditCard,
  Sparkles,
  BarChart3,
  Stethoscope,
  Star,
  Clock
} from 'lucide-react';
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { INITIAL_CLINIC_BASELINES } from '../../demo-data/clinicSimulationData';

export function MultiClinicComparison() {
  const clinics = [
    {
      id: 'clinic-citycare',
      name: 'CityCare Family Clinic',
      specialty: 'General & Family Medicine',
      doctors: 4,
      monthlyAppointments: 1140,
      activePatients: 840,
      doctorUtilization: 74,
      avgWaitTime: 14,
      subscriptionPlan: 'Professional',
      mrr: 6999,
      satisfaction: 4.8
    },
    {
      id: 'clinic-heartwell',
      name: 'HeartWell Cardiology Centre',
      specialty: 'Cardiovascular Specialty',
      doctors: 3,
      monthlyAppointments: 720,
      activePatients: 510,
      doctorUtilization: 82,
      avgWaitTime: 22,
      subscriptionPlan: 'Enterprise',
      mrr: 14999,
      satisfaction: 4.9
    },
    {
      id: 'clinic-brightsmile',
      name: 'BrightSmile Dental Studio',
      specialty: 'Orthodontics & Dental',
      doctors: 3,
      monthlyAppointments: 580,
      activePatients: 420,
      doctorUtilization: 69,
      avgWaitTime: 11,
      subscriptionPlan: 'Growth',
      mrr: 4499,
      satisfaction: 4.7
    }
  ];

  const chartData = clinics.map((c) => ({
    name: c.name.split(' ')[0],
    Appointments: c.monthlyAppointments,
    Patients: c.activePatients,
    Utilization: c.doctorUtilization
  }));

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-blue-500/20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-bold mb-2">
              <BarChart3 className="w-3.5 h-3.5 text-blue-400" />
              Cross-Tenant Portfolio Analytics
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Multi-Clinic Operational Comparison
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 max-w-2xl mt-1">
              Compare patient volume, physician chamber utilization, wait times, and subscription MRR across registered tenant clinics.
            </p>
          </div>

          <Badge variant="primary" size="lg" className="bg-white/20 text-white border-white/30 font-bold px-3 py-1.5 self-start md:self-center">
            {clinics.length} Facilities Monitored
          </Badge>
        </div>
      </div>

      {/* Recharts Bar Chart */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div>
          <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
            Tenant Volume & Clinical Footfall Comparison
          </h3>
          <p className="text-xs text-slate-500">
            Monthly completed consultations vs registered active patient cohorts.
          </p>
        </div>

        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-slate-200 dark:text-slate-800" />
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip
                contentStyle={{ borderRadius: 12, fontSize: 12, backgroundColor: '#0f172a', color: '#fff' }}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="Appointments" name="Monthly Appointments" fill="#3b82f6" radius={[6, 6, 0, 0]} />
              <Bar dataKey="Patients" name="Active Patients" fill="#10b981" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 font-bold uppercase tracking-wider text-[10px]">
              <th className="p-3">Clinic Facility</th>
              <th className="p-3">Doctors</th>
              <th className="p-3">Doctor Util.</th>
              <th className="p-3">Avg Wait</th>
              <th className="p-3">Plan / MRR</th>
              <th className="p-3">Satisfaction</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {clinics.map((c) => (
              <tr key={c.id} className="hover:bg-slate-50 dark:hover:bg-slate-850/50">
                <td className="p-3">
                  <div className="font-extrabold text-slate-900 dark:text-white text-sm">{c.name}</div>
                  <div className="text-[11px] text-slate-500">{c.specialty}</div>
                </td>
                <td className="p-3 font-semibold text-slate-800 dark:text-slate-200">
                  {c.doctors} Doctors
                </td>
                <td className="p-3">
                  <Badge variant={c.doctorUtilization > 80 ? 'warning' : 'success'} size="sm">
                    {c.doctorUtilization}%
                  </Badge>
                </td>
                <td className="p-3 font-bold text-slate-800 dark:text-slate-200">
                  ~{c.avgWaitTime} Mins
                </td>
                <td className="p-3">
                  <div className="font-bold text-slate-900 dark:text-white">{c.subscriptionPlan}</div>
                  <div className="text-[10px] text-emerald-600 font-semibold">₹{c.mrr.toLocaleString()}/mo</div>
                </td>
                <td className="p-3">
                  <span className="font-extrabold text-amber-500 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-current" /> {c.satisfaction}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}


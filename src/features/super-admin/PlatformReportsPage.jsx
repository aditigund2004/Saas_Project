import React from 'react';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { StatCard } from '../../components/ui/StatCard';
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { TrendingUp, Users, Building2, Sparkles } from 'lucide-react';

export function PlatformReportsPage() {
  const conversionData = [
    { name: 'Completed Free Trials', value: 34, color: '#0d9488' },
    { name: 'Converted to Paid Plan', value: 28, color: '#2563eb' },
    { name: 'Churned / Inactive', value: 6, color: '#f43f5e' }
  ];

  const specialtyDistribution = [
    { specialty: 'Dental', clinics: 12 },
    { specialty: 'Orthopedics', clinics: 6 },
    { specialty: 'Dermatology', clinics: 5 },
    { specialty: 'Pediatrics', clinics: 3 },
    { specialty: 'Nursing Homes', clinics: 2 }
  ];

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">Business Intelligence</span>
        <h1 className="text-2xl font-extrabold text-slate-900">Platform Analytics & Growth Reports</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Illustrative platform metrics for clinic registrations, 14-day trial-to-paid conversions, and specialty adoption.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          title="Trial Conversion Rate"
          value="82.3%"
          change="+4.1% vs Q2"
          trend="up"
          icon={Sparkles}
          color="teal"
          subtitle="Clinics adopting paid plans after 14-day trial"
        />
        <StatCard
          title="Average Revenue Per Clinic"
          value="₹6,415"
          change="Blended monthly ARPU"
          trend="up"
          icon={TrendingUp}
          color="emerald"
          subtitle="Across Starter, Pro, and Enterprise"
        />
        <StatCard
          title="Active Clinic Branches"
          value="42"
          change="1.5 branches per clinic avg"
          trend="up"
          icon={Building2}
          color="indigo"
          subtitle="Multi-branch deployments"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Specialty Distribution Bar Chart */}
        <Card>
          <CardHeader
            title="Clinic Distribution by Medical Specialty"
            subtitle="Dental and Orthopedics lead initial commercial adoption"
          />
          <CardContent>
            <div className="h-64 w-full pt-4">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={specialtyDistribution}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="specialty" axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11 }} />
                  <Tooltip
                    formatter={(v) => [`${v} Clinics`, 'Count']}
                    contentStyle={{ borderRadius: '12px', fontSize: '12px' }}
                  />
                  <Bar dataKey="clinics" fill="#0d9488" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Conversion Funnel */}
        <Card>
          <CardHeader
            title="14-Day Trial Funnel Health"
            subtitle="Conversion performance across demo cohorts"
          />
          <CardContent className="space-y-4">
            <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-100 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-blue-900">Total Trial Signups (All-time)</p>
                <p className="text-[11px] text-blue-700">Self-serve 14-day onboarding initiated</p>
              </div>
              <span className="text-xl font-extrabold text-blue-900">34 Clinics</span>
            </div>

            <div className="p-4 bg-blue-50/60 rounded-xl border border-blue-100 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-blue-900">Paid Plan Conversions</p>
                <p className="text-[11px] text-blue-700">Converted within 14 days of free trial</p>
              </div>
              <span className="text-xl font-extrabold text-blue-900">28 Clinics (82%)</span>
            </div>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
              <div>
                <p className="font-bold text-slate-800">Average Front-Desk Walk-Ins Logged</p>
                <p className="text-[11px] text-slate-500">Per active clinic practice each day</p>
              </div>
              <span className="text-xl font-extrabold text-slate-800">18.4 Visits</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


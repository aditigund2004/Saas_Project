import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
<<<<<<< HEAD
import { useTheme } from '../../../context/ThemeContext';
=======
>>>>>>> origin/main
import { ClinicFinanceNav } from './ClinicFinanceNav';
import { Card, CardHeader } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import {
  BarChart3,
  Download,
  Printer,
  TrendingUp,
  Percent,
  Stethoscope,
  DollarSign,
  Activity,
  Layers,
  Sparkles,
  Info
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

export function ClinicReportsFinancePage() {
  const {
<<<<<<< HEAD
    doctors = [],
    invoices = [],
    expenses = [],
=======
    doctors,
    invoices,
    expenses,
>>>>>>> origin/main
    showToast,
    formatCurrency,
    activeClinic
  } = useApp();
<<<<<<< HEAD
  const { isDark } = useTheme();
=======
>>>>>>> origin/main

  const [dateRange, setDateRange] = useState('October 2026 (MTD)');

  // Practice Profit & Loss Calculation
  const grossCollections = 432000;
  const directConsumablesCost = 84500;
  const doctorRemuneration = 142000;
  const clinicOverhead = 63700; // Rent, utilities, bio-waste, ClinicOS software license (₹4,999)
  const totalPracticeExpenses = directConsumablesCost + doctorRemuneration + clinicOverhead;
  const netPracticeProfit = grossCollections - totalPracticeExpenses;
  const operatingMarginPercent = ((netPracticeProfit / grossCollections) * 100).toFixed(1);

  // Doctor Tariff & Contribution Matrix
  const doctorContributions = [
    {
      id: 'doc-1',
      name: 'Dr. Rajesh Sharma',
      specialty: 'Internal Medicine & Diabetology',
      consultations: 74,
      grossBillings: 125000,
      doctorSharePercent: 65,
      doctorShareAmount: 81250,
      clinicRetainedAmount: 43750
    },
    {
      id: 'doc-2',
      name: 'Dr. Priya Patel',
      specialty: 'Dentistry & Endodontics',
      consultations: 42,
      grossBillings: 189000,
      doctorSharePercent: 60,
      doctorShareAmount: 113400,
      clinicRetainedAmount: 75600
    },
    {
      id: 'doc-3',
      name: 'Dr. Sunita Nair',
      specialty: 'Pediatrics',
      consultations: 58,
      grossBillings: 88000,
      doctorSharePercent: 70,
      doctorShareAmount: 61600,
      clinicRetainedAmount: 26400
    },
    {
      id: 'doc-4',
      name: 'Dr. Amit Deshmukh',
      specialty: 'Orthopedics & Joint Care',
      consultations: 31,
      grossBillings: 83000,
      doctorSharePercent: 65,
      doctorShareAmount: 53950,
      clinicRetainedAmount: 29050
    }
  ];

  // Procedure Profitability Analysis
  const procedureProfitability = [
    {
      procedure: 'Root Canal Treatment (Molar)',
      department: 'Dentistry',
      tariff: 5500,
      consumablesCost: 950,
      doctorFee: 2750,
      netClinicMargin: 1800,
      marginPercent: 32.7
    },
    {
      procedure: 'Ultrasonic Dental Scaling & Polish',
      department: 'Dentistry',
      tariff: 1800,
      consumablesCost: 220,
      doctorFee: 900,
      netClinicMargin: 680,
      marginPercent: 37.8
    },
    {
      procedure: 'Intra-articular Knee Injection',
      department: 'Orthopedics',
      tariff: 3200,
      consumablesCost: 750,
      doctorFee: 1600,
      netClinicMargin: 850,
      marginPercent: 26.6
    },
    {
      procedure: 'Specialist OPD Consultation',
      department: 'General OPD',
      tariff: 800,
      consumablesCost: 40,
      doctorFee: 520,
      netClinicMargin: 240,
      marginPercent: 30.0
    },
    {
      procedure: 'Pediatric Immunization Package',
      department: 'Pediatrics',
      tariff: 2200,
      consumablesCost: 1100,
      doctorFee: 660,
      netClinicMargin: 440,
      marginPercent: 20.0
    }
  ];

  // Chart data: Monthly comparison
  const monthlyProfitabilityTrend = [
    { month: 'Jun', revenue: 380000, costs: 260000, profit: 120000 },
    { month: 'Jul', revenue: 410000, costs: 275000, profit: 135000 },
    { month: 'Aug', revenue: 395000, costs: 270000, profit: 125000 },
    { month: 'Sep', revenue: 425000, costs: 285000, profit: 140000 },
    { month: 'Oct (MTD)', revenue: 432000, costs: 290200, profit: 141800 }
  ];

  return (
    <div className="space-y-6">
      {/* Scope Navigation */}
      <ClinicFinanceNav />

      {/* Page Header */}
<<<<<<< HEAD
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Practice Economics & Analytics</span>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Profitability & Doctor Tariffs</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
=======
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Practice Economics & Analytics</span>
          <h1 className="text-2xl font-extrabold text-slate-900">Profitability & Doctor Tariffs</h1>
          <p className="text-xs text-slate-500 mt-0.5">
>>>>>>> origin/main
            Doctor tariff shares, service unit economics, and clinic operating margin statement.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
<<<<<<< HEAD
            onClick={() => showToast('Printing clinical P&L summary report...')}
          >
            <Printer className="w-4 h-4 mr-1.5" />
=======
            icon={Printer}
            onClick={() => showToast('Printing clinical P&L summary report...')}
          >
>>>>>>> origin/main
            Print P&L
          </Button>
          <Button
            variant="primary"
            size="sm"
<<<<<<< HEAD
            onClick={() => showToast('Downloading complete financial breakdown CSV...')}
          >
            <Download className="w-4 h-4 mr-1.5" />
=======
            icon={Download}
            onClick={() => showToast('Downloading complete financial breakdown CSV...')}
          >
>>>>>>> origin/main
            Export Financial Pack
          </Button>
        </div>
      </div>

      {/* P&L Waterfall Card */}
<<<<<<< HEAD
      <Card className="p-5 bg-gradient-to-br from-white to-blue-50/40 dark:from-slate-900 dark:to-slate-900/60 border-blue-200 dark:border-blue-900">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <h2 className="text-base font-black text-slate-900 dark:text-white">
              Practice Operating Profit Statement ({dateRange})
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
=======
      <Card className="p-5 bg-gradient-to-br from-white to-blue-50/40 border-blue-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-base font-black text-slate-900">
              Practice Operating Profit Statement ({dateRange})
            </h2>
            <p className="text-xs text-slate-500">
>>>>>>> origin/main
              Formula: Gross Collections – (Direct Consumables + Doctor Share + Facility & Software Overhead)
            </p>
          </div>
          <div className="flex items-center gap-2">
<<<<<<< HEAD
            <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 font-bold font-mono text-xs border border-emerald-200 dark:border-emerald-800">
=======
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold font-mono text-xs">
>>>>>>> origin/main
              Operating Margin: {operatingMarginPercent}%
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 pt-4 text-xs">
          <div>
<<<<<<< HEAD
            <span className="text-slate-500 dark:text-slate-400 block font-medium">1. Gross Collections</span>
            <span className="text-xl font-black font-mono text-slate-900 dark:text-white mt-1 block tabular-nums">
              {formatCurrency(grossCollections)}
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500">100% of receipts</span>
          </div>

          <div>
            <span className="text-slate-500 dark:text-slate-400 block font-medium">2. Consumables & Labs</span>
            <span className="text-xl font-black font-mono text-red-600 dark:text-red-400 mt-1 block tabular-nums">
              -{formatCurrency(directConsumablesCost)}
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500">19.5% direct cost</span>
          </div>

          <div>
            <span className="text-slate-500 dark:text-slate-400 block font-medium">3. Doctor Tariffs Share</span>
            <span className="text-xl font-black font-mono text-red-600 dark:text-red-400 mt-1 block tabular-nums">
              -{formatCurrency(doctorRemuneration)}
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500">32.8% clinical payroll</span>
          </div>

          <div>
            <span className="text-slate-500 dark:text-slate-400 block font-medium">4. Clinic Overhead & SaaS</span>
            <span className="text-xl font-black font-mono text-red-600 dark:text-red-400 mt-1 block tabular-nums">
              -{formatCurrency(clinicOverhead)}
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500">Includes ClinicOS license</span>
          </div>

          <div className="col-span-2 sm:col-span-1 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
            <span className="text-emerald-800 dark:text-emerald-300 font-bold block">5. Net Practice Profit</span>
            <span className="text-xl font-black font-mono text-emerald-700 dark:text-emerald-400 mt-1 block tabular-nums">
              {formatCurrency(netPracticeProfit)}
            </span>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">{operatingMarginPercent}% retained</span>
=======
            <span className="text-slate-500 block font-medium">1. Gross Collections</span>
            <span className="text-xl font-black font-mono text-slate-900 mt-1 block">
              {formatCurrency(grossCollections)}
            </span>
            <span className="text-[10px] text-slate-400">100% of receipts</span>
          </div>

          <div>
            <span className="text-slate-500 block font-medium">2. Consumables & Labs</span>
            <span className="text-xl font-black font-mono text-red-600 mt-1 block">
              -{formatCurrency(directConsumablesCost)}
            </span>
            <span className="text-[10px] text-slate-400">19.5% direct cost</span>
          </div>

          <div>
            <span className="text-slate-500 block font-medium">3. Doctor Tariffs Share</span>
            <span className="text-xl font-black font-mono text-red-600 mt-1 block">
              -{formatCurrency(doctorRemuneration)}
            </span>
            <span className="text-[10px] text-slate-400">32.8% clinical payroll</span>
          </div>

          <div>
            <span className="text-slate-500 block font-medium">4. Clinic Overhead & SaaS</span>
            <span className="text-xl font-black font-mono text-red-600 mt-1 block">
              -{formatCurrency(clinicOverhead)}
            </span>
            <span className="text-[10px] text-slate-400">Includes ClinicOS subscription</span>
          </div>

          <div className="col-span-2 sm:col-span-1 p-3 rounded-xl bg-emerald-50 border border-emerald-200">
            <span className="text-emerald-800 font-bold block">5. Net Practice Profit</span>
            <span className="text-xl font-black font-mono text-emerald-700 mt-1 block">
              {formatCurrency(netPracticeProfit)}
            </span>
            <span className="text-[10px] text-emerald-600 font-semibold">{operatingMarginPercent}% retained margin</span>
>>>>>>> origin/main
          </div>
        </div>
      </Card>

      {/* Chart: Historical Margin Trend */}
<<<<<<< HEAD
      <Card className="border-slate-200 dark:border-slate-800">
=======
      <Card>
>>>>>>> origin/main
        <CardHeader
          title="Revenue vs Operating Costs & Retained Profit (Last 5 Months)"
          subtitle="Monitoring consistency in practice overhead and retained profit"
        />
        <div className="p-4 pt-0">
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyProfitabilityTrend} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
<<<<<<< HEAD
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? '#1F2937' : '#E2E8F0'} />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: isDark ? '#94A3B8' : '#64748B' }} stroke={isDark ? '#374151' : '#CBD5E1'} />
                <YAxis tick={{ fontSize: 11, fill: isDark ? '#94A3B8' : '#64748B' }} stroke={isDark ? '#374151' : '#CBD5E1'} tickFormatter={(v) => `₹${v / 1000}k`} />
=======
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748B' }} stroke="#CBD5E1" />
                <YAxis tick={{ fontSize: 11, fill: '#64748B' }} stroke="#CBD5E1" tickFormatter={(v) => `₹${v / 1000}k`} />
>>>>>>> origin/main
                <Tooltip
                  formatter={(val, name) => [
                    `₹${Number(val).toLocaleString('en-IN')}`,
                    name === 'revenue' ? 'Gross Revenue' : name === 'costs' ? 'Operating Costs' : 'Retained Profit'
                  ]}
<<<<<<< HEAD
                  contentStyle={{
                    backgroundColor: isDark ? '#111827' : '#0F172A',
                    borderColor: isDark ? '#1F2937' : '#334155',
                    color: '#F8FAFC',
                    borderRadius: '8px',
                    fontSize: '12px'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px', color: isDark ? '#94A3B8' : '#64748B' }} />
                <Bar dataKey="revenue" name="Gross Collections" fill="#2563EB" radius={[4, 4, 0, 0]} />
                <Bar dataKey="costs" name="Total Operational Costs" fill={isDark ? '#475569' : '#94A3B8'} radius={[4, 4, 0, 0]} />
=======
                  contentStyle={{ backgroundColor: '#0F172A', color: '#F8FAFC', borderRadius: '8px', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
                <Bar dataKey="revenue" name="Gross Collections" fill="#2563EB" radius={[4, 4, 0, 0]} />
                <Bar dataKey="costs" name="Total Operational Costs" fill="#94A3B8" radius={[4, 4, 0, 0]} />
>>>>>>> origin/main
                <Bar dataKey="profit" name="Net Retained Profit" fill="#16A34A" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>

      {/* Doctor Tariff & Share Ledger */}
<<<<<<< HEAD
      <Card padding="none" className="border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Doctor Tariffs & Share Ledger</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
=======
      <Card padding="none">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Doctor Tariffs & Share Ledger</h3>
            <p className="text-xs text-slate-500">
>>>>>>> origin/main
              Contracted revenue splits between visiting/consultant doctors and the clinical practice
            </p>
          </div>
          <Button
            variant="outline"
            size="xs"
<<<<<<< HEAD
            onClick={() => showToast('Exporting doctor tariff reconciliation statement...')}
          >
            <Download className="w-3.5 h-3.5 mr-1" />
=======
            icon={Download}
            onClick={() => showToast('Exporting doctor tariff reconciliation statement...')}
          >
>>>>>>> origin/main
            Export Tariff Sheet
          </Button>
        </div>

        <div className="overflow-x-auto">
<<<<<<< HEAD
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 uppercase text-xs font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-3.5 text-center w-12 font-semibold">#</th>
=======
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-semibold border-b border-slate-200">
              <tr>
>>>>>>> origin/main
                <th className="p-3.5">Doctor Name & Specialty</th>
                <th className="p-3.5 text-center">Consultations</th>
                <th className="p-3.5">Gross Billings</th>
                <th className="p-3.5">Contract Split</th>
                <th className="p-3.5">Doctor Payout</th>
                <th className="p-3.5">Clinic Retained</th>
                <th className="p-3.5 text-right">Settlement</th>
              </tr>
            </thead>
<<<<<<< HEAD
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {doctorContributions.map((doc, idx) => (
                <tr key={doc.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="p-3.5 text-center font-mono font-medium text-slate-400 dark:text-slate-500 text-xs">{idx + 1}</td>
                  <td className="p-3.5">
                    <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                      <Stethoscope className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                      {doc.name}
                    </div>
                    <div className="text-xs text-slate-400 dark:text-slate-500">{doc.specialty}</div>
                  </td>
                  <td className="p-3.5 text-center font-mono font-semibold text-slate-700 dark:text-slate-300">
                    {doc.consultations}
                  </td>
                  <td className="p-3.5 font-mono font-bold text-slate-900 dark:text-white tabular-nums">
                    {formatCurrency(doc.grossBillings)}
                  </td>
                  <td className="p-3.5">
                    <span className="px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-mono text-xs font-bold border border-blue-200 dark:border-blue-800">
                      {doc.doctorSharePercent}% / {100 - doc.doctorSharePercent}%
                    </span>
                  </td>
                  <td className="p-3.5 font-mono font-bold text-purple-700 dark:text-purple-400 tabular-nums">
                    {formatCurrency(doc.doctorShareAmount)}
                  </td>
                  <td className="p-3.5 font-mono font-bold text-emerald-700 dark:text-emerald-400 tabular-nums">
                    {formatCurrency(doc.clinicRetainedAmount)}
                  </td>
                  <td className="p-3.5 text-right">
                    <Badge variant="success" size="sm">Reconciled</Badge>
=======
            <tbody className="divide-y divide-slate-100">
              {doctorContributions.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-3.5">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <Stethoscope className="w-3.5 h-3.5 text-blue-600" />
                      {doc.name}
                    </div>
                    <div className="text-[10px] text-slate-400">{doc.specialty}</div>
                  </td>
                  <td className="p-3.5 text-center font-mono font-semibold text-slate-700">
                    {doc.consultations}
                  </td>
                  <td className="p-3.5 font-mono font-bold text-slate-900">
                    {formatCurrency(doc.grossBillings)}
                  </td>
                  <td className="p-3.5">
                    <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-mono text-[10px] font-bold">
                      {doc.doctorSharePercent}% / {100 - doc.doctorSharePercent}%
                    </span>
                  </td>
                  <td className="p-3.5 font-mono font-bold text-purple-700">
                    {formatCurrency(doc.doctorShareAmount)}
                  </td>
                  <td className="p-3.5 font-mono font-bold text-emerald-700">
                    {formatCurrency(doc.clinicRetainedAmount)}
                  </td>
                  <td className="p-3.5 text-right">
                    <Badge variant="success">Reconciled</Badge>
>>>>>>> origin/main
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Service Unit Economics & Margin */}
<<<<<<< HEAD
      <Card padding="none" className="border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Service Unit Economics & Profitability</h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
=======
      <Card padding="none">
        <div className="p-4 border-b border-slate-200">
          <h3 className="text-sm font-bold text-slate-900">Service Unit Economics & Profitability</h3>
          <p className="text-xs text-slate-500">
>>>>>>> origin/main
            Per-procedure margin analysis after consumable deduction and clinical provider remuneration
          </p>
        </div>

        <div className="overflow-x-auto">
<<<<<<< HEAD
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 uppercase text-xs font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-3.5 text-center w-12 font-semibold">#</th>
=======
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-semibold border-b border-slate-200">
              <tr>
>>>>>>> origin/main
                <th className="p-3.5">Clinical Service / Procedure</th>
                <th className="p-3.5">Department</th>
                <th className="p-3.5">Standard Tariff</th>
                <th className="p-3.5">Direct Consumables</th>
                <th className="p-3.5">Doctor Fee</th>
                <th className="p-3.5">Net Clinic Margin</th>
                <th className="p-3.5 text-right">Margin %</th>
              </tr>
            </thead>
<<<<<<< HEAD
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {procedureProfitability.map((p, idx) => (
                <tr key={idx} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="p-3.5 text-center font-mono font-medium text-slate-400 dark:text-slate-500 text-xs">{idx + 1}</td>
                  <td className="p-3.5 font-semibold text-slate-900 dark:text-white">{p.procedure}</td>
                  <td className="p-3.5 text-slate-600 dark:text-slate-300">{p.department}</td>
                  <td className="p-3.5 font-mono font-bold text-slate-900 dark:text-white tabular-nums">{formatCurrency(p.tariff)}</td>
                  <td className="p-3.5 font-mono text-red-600 dark:text-red-400 tabular-nums">-{formatCurrency(p.consumablesCost)}</td>
                  <td className="p-3.5 font-mono text-slate-600 dark:text-slate-400 tabular-nums">-{formatCurrency(p.doctorFee)}</td>
                  <td className="p-3.5 font-mono font-bold text-emerald-700 dark:text-emerald-400 tabular-nums">+{formatCurrency(p.netClinicMargin)}</td>
                  <td className="p-3.5 text-right font-mono font-bold text-slate-900 dark:text-white">
                    <span className="px-2.5 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-xs border border-emerald-200 dark:border-emerald-800">
=======
            <tbody className="divide-y divide-slate-100">
              {procedureProfitability.map((p, idx) => (
                <tr key={idx} className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-3.5 font-semibold text-slate-900">{p.procedure}</td>
                  <td className="p-3.5 text-slate-600">{p.department}</td>
                  <td className="p-3.5 font-mono font-bold text-slate-900">{formatCurrency(p.tariff)}</td>
                  <td className="p-3.5 font-mono text-red-600">-{formatCurrency(p.consumablesCost)}</td>
                  <td className="p-3.5 font-mono text-slate-600">-{formatCurrency(p.doctorFee)}</td>
                  <td className="p-3.5 font-mono font-bold text-emerald-700">+{formatCurrency(p.netClinicMargin)}</td>
                  <td className="p-3.5 text-right font-mono font-bold text-slate-900">
                    <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 text-[10px]">
>>>>>>> origin/main
                      {p.marginPercent}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
<<<<<<< HEAD
=======

>>>>>>> origin/main

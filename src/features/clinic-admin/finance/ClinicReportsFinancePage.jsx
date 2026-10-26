import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
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
    doctors,
    invoices,
    expenses,
    showToast,
    formatCurrency,
    activeClinic
  } = useApp();

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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#15803D] uppercase tracking-wider">Practice Economics & Analytics</span>
          <h1 className="text-2xl font-extrabold text-slate-900">Profitability & Doctor Tariffs</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Doctor tariff shares, service unit economics, and clinic operating margin statement.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={Printer}
            onClick={() => showToast('Printing clinical P&L summary report...')}
          >
            Print P&L
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={Download}
            onClick={() => showToast('Downloading complete financial breakdown CSV...')}
          >
            Export Financial Pack
          </Button>
        </div>
      </div>

      {/* P&L Waterfall Card */}
      <Card className="p-5 bg-gradient-to-br from-white to-blue-50/40 border-blue-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-4">
          <div>
            <h2 className="text-base font-black text-slate-900">
              Practice Operating Profit Statement ({dateRange})
            </h2>
            <p className="text-xs text-slate-500">
              Formula: Gross Collections – (Direct Consumables + Doctor Share + Facility & Software Overhead)
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 font-bold font-mono text-xs">
              Operating Margin: {operatingMarginPercent}%
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 pt-4 text-xs">
          <div>
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
          </div>
        </div>
      </Card>

      {/* Chart: Historical Margin Trend */}
      <Card>
        <CardHeader
          title="Revenue vs Operating Costs & Retained Profit (Last 5 Months)"
          subtitle="Monitoring consistency in practice overhead and retained profit"
        />
        <div className="p-4 pt-0">
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyProfitabilityTrend} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#64748B' }} stroke="#CBD5E1" />
                <YAxis tick={{ fontSize: 11, fill: '#64748B' }} stroke="#CBD5E1" tickFormatter={(v) => `₹${v / 1000}k`} />
                <Tooltip
                  formatter={(val, name) => [
                    `₹${Number(val).toLocaleString('en-IN')}`,
                    name === 'revenue' ? 'Gross Revenue' : name === 'costs' ? 'Operating Costs' : 'Retained Profit'
                  ]}
                  contentStyle={{ backgroundColor: '#0F172A', color: '#F8FAFC', borderRadius: '8px', fontSize: '12px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '8px' }} />
                <Bar dataKey="revenue" name="Gross Collections" fill="#2563EB" radius={[4, 4, 0, 0]} />
                <Bar dataKey="costs" name="Total Operational Costs" fill="#94A3B8" radius={[4, 4, 0, 0]} />
                <Bar dataKey="profit" name="Net Retained Profit" fill="#16A34A" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Card>

      {/* Doctor Tariff & Share Ledger */}
      <Card padding="none">
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Doctor Tariffs & Share Ledger</h3>
            <p className="text-xs text-slate-500">
              Contracted revenue splits between visiting/consultant doctors and the clinical practice
            </p>
          </div>
          <Button
            variant="outline"
            size="xs"
            icon={Download}
            onClick={() => showToast('Exporting doctor tariff reconciliation statement...')}
          >
            Export Tariff Sheet
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3.5">Doctor Name & Specialty</th>
                <th className="p-3.5 text-center">Consultations</th>
                <th className="p-3.5">Gross Billings</th>
                <th className="p-3.5">Contract Split</th>
                <th className="p-3.5">Doctor Payout</th>
                <th className="p-3.5">Clinic Retained</th>
                <th className="p-3.5 text-right">Settlement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {doctorContributions.map((doc) => (
                <tr key={doc.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="p-3.5">
                    <div className="font-bold text-slate-900 flex items-center gap-1.5">
                      <Stethoscope className="w-3.5 h-3.5 text-[#15803D]" />
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
                    <span className="px-2 py-0.5 rounded bg-blue-50 text-[#166534] font-mono text-[10px] font-bold">
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Service Unit Economics & Margin */}
      <Card padding="none">
        <div className="p-4 border-b border-slate-200">
          <h3 className="text-sm font-bold text-slate-900">Service Unit Economics & Profitability</h3>
          <p className="text-xs text-slate-500">
            Per-procedure margin analysis after consumable deduction and clinical provider remuneration
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3.5">Clinical Service / Procedure</th>
                <th className="p-3.5">Department</th>
                <th className="p-3.5">Standard Tariff</th>
                <th className="p-3.5">Direct Consumables</th>
                <th className="p-3.5">Doctor Fee</th>
                <th className="p-3.5">Net Clinic Margin</th>
                <th className="p-3.5 text-right">Margin %</th>
              </tr>
            </thead>
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


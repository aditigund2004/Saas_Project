import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { SaaSFinanceNav } from './SaaSFinanceNav';
import { Card, CardHeader } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import {
  BarChart3,
  Download,
  Calendar,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  PieChart,
  FileSpreadsheet
} from 'lucide-react';

export function SaaSReportsPage() {
  const { clinics, plans, saasInvoices, formatCurrency, showToast } = useApp();
  const [reportRange, setReportRange] = useState('YTD');

  const activeClinics = clinics.filter((c) => c.status === 'Active' && !c.isTrial);
  const totalMRR = activeClinics.reduce((acc, c) => {
    const p = plans.find((plan) => plan.id === c.subscriptionPlanId);
    return acc + (p?.monthlyPrice || 4999);
  }, 0);

  const cohortData = [
    { cohort: 'May 2026', signups: 8, retainedM1: '100%', retainedM3: '88%', retainedM6: '88%', expansionRate: '+12%' },
    { cohort: 'Jun 2026', signups: 10, retainedM1: '100%', retainedM3: '90%', retainedM6: '90%', expansionRate: '+15%' },
    { cohort: 'Jul 2026', signups: 12, retainedM1: '100%', retainedM3: '92%', retainedM6: '92%', expansionRate: '+18%' },
    { cohort: 'Aug 2026', signups: 14, retainedM1: '100%', retainedM3: '93%', retainedM6: 'N/A', expansionRate: '+20%' },
    { cohort: 'Sep 2026', signups: 16, retainedM1: '100%', retainedM3: '94%', retainedM6: 'N/A', expansionRate: '+22%' },
    { cohort: 'Oct 2026', signups: 18, retainedM1: '100%', retainedM3: 'N/A', retainedM6: 'N/A', expansionRate: '+25%' }
  ];

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['Cohort,Signups,M1 Retention,M3 Retention,M6 Retention,Expansion Rate']
        .concat(
          cohortData.map(
            (c) =>
              `"${c.cohort}",${c.signups},"${c.retainedM1}","${c.retainedM3}","${c.retainedM6}","${c.expansionRate}"`
          )
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `clinicos_saas_cohort_retention_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('SaaS retention & reports CSV exported.');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Financial Intelligence</span>
          <h1 className="text-2xl font-extrabold text-slate-900">SaaS Growth & Cohort Retention Reports</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Documented customer retention matrices, net revenue retention (NRR), and renewal performance indicators.
          </p>
        </div>

        <Button variant="outline" size="sm" icon={Download} onClick={handleExportCSV}>
          Export Cohort Report (.CSV)
        </Button>
      </div>

      <SaaSFinanceNav />

      {/* Metric Calculation Definitions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4 border-slate-200">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Net Revenue Retention</span>
          <div className="text-2xl font-extrabold text-blue-700 mt-1">118.4% NRR</div>
          <p className="text-[10px] text-slate-500 mt-0.5">
            Formula: (Starting MRR + Expansion - Churn - Contraction) / Starting MRR
          </p>
        </Card>

        <Card className="p-4 border-slate-200">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Customer Lifetime Value</span>
          <div className="text-2xl font-extrabold text-slate-900 font-mono mt-1">₹1,94,400</div>
          <p className="text-[10px] text-slate-500 mt-0.5">
            Formula: ARPU (₹4,860/mo) / Monthly Churn Rate (2.5%)
          </p>
        </Card>

        <Card className="p-4 border-slate-200">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Customer Acquisition Cost</span>
          <div className="text-2xl font-extrabold text-slate-900 font-mono mt-1">₹18,200</div>
          <p className="text-[10px] text-slate-500 mt-0.5">
            Formula: (Sales + Onboarding + Cloud trial costs) / New Clinics
          </p>
        </Card>

        <Card className="p-4 border-slate-200">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">LTV to CAC Ratio</span>
          <div className="text-2xl font-extrabold text-emerald-600 mt-1">10.6 : 1</div>
          <p className="text-[10px] text-emerald-600 font-semibold mt-0.5">
            Healthy unit economics (&gt; 3.0 : 1 target)
          </p>
        </Card>
      </div>

      {/* Cohort Retention Table */}
      <Card>
        <CardHeader
          title="Tenant Cohort Retention Matrix (2026)"
          subtitle="Percentage of clinic organizations retained at Month 1, Month 3, and Month 6 after signup"
        />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3.5">Signup Cohort</th>
                <th className="p-3.5">Clinics Onboarded</th>
                <th className="p-3.5">Month 1 Retention</th>
                <th className="p-3.5">Month 3 Retention</th>
                <th className="p-3.5">Month 6 Retention</th>
                <th className="p-3.5">Expansion Rate</th>
                <th className="p-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
              {cohortData.map((c, i) => (
                <tr key={i} className="hover:bg-slate-50/50">
                  <td className="p-3.5 font-bold font-sans text-slate-900">{c.cohort}</td>
                  <td className="p-3.5 font-sans font-semibold text-slate-800">{c.signups} Clinics</td>
                  <td className="p-3.5 text-blue-700 font-bold">{c.retainedM1}</td>
                  <td className="p-3.5 text-blue-700 font-bold">{c.retainedM3}</td>
                  <td className="p-3.5 text-blue-700 font-bold">{c.retainedM6}</td>
                  <td className="p-3.5 text-emerald-600 font-bold">{c.expansionRate}</td>
                  <td className="p-3.5 font-sans">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-blue-50 text-blue-700 border border-blue-200">
                      Active Cohort
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


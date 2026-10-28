import React, { useState } from 'react';
import { useReferral } from '../../../context/ReferralContext';
import { ReferralNav } from './ReferralNav';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { StatCard } from '../../../components/ui/StatCard';
import { Modal } from '../../../components/ui/Modal';
import { formatINR, exportToCSV, getReferralStatusBadge } from './referralUtils';
import {
  Users,
  Building2,
  TrendingUp,
  Percent,
  Wallet,
  Clock,
  CheckCircle2,
  CreditCard,
  Plus,
  Key,
  Download,
  ArrowUpRight,
  Sparkles,
  ShieldAlert
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

export function ReferralDashboardPage() {
  const {
    stats,
    affiliates,
    referrals,
    monthlyAnalytics,
    addAffiliate,
    createReferralCode
  } = useReferral();

  const [isAddAffiliateOpen, setIsAddAffiliateOpen] = useState(false);
  const [isCreateCodeOpen, setIsCreateCodeOpen] = useState(false);

  // Form states for Quick Add Affiliate
  const [newAffName, setNewAffName] = useState('');
  const [newAffCompany, setNewAffCompany] = useState('');
  const [newAffEmail, setNewAffEmail] = useState('');
  const [newAffPhone, setNewAffPhone] = useState('');
  const [newAffType, setNewAffType] = useState('Healthcare Consultant');
  const [newAffCode, setNewAffCode] = useState('');

  // Form states for Quick Create Code
  const [codeAffId, setCodeAffId] = useState(affiliates[0]?.id || '');
  const [codeCustom, setCodeCustom] = useState('');
  const [codeLimit, setCodeLimit] = useState(50);
  const [codeExpiry, setCodeExpiry] = useState('');

  const handleAddAffiliateSubmit = (e) => {
    e.preventDefault();
    if (!newAffName || !newAffEmail) return;
    addAffiliate({
      name: newAffName,
      company: newAffCompany || newAffName,
      email: newAffEmail,
      phone: newAffPhone,
      partnerType: newAffType,
      referralCode: newAffCode
    });
    setNewAffName('');
    setNewAffCompany('');
    setNewAffEmail('');
    setNewAffPhone('');
    setNewAffCode('');
    setIsAddAffiliateOpen(false);
  };

  const handleCreateCodeSubmit = (e) => {
    e.preventDefault();
    if (!codeAffId) return;
    createReferralCode({
      affiliateId: codeAffId,
      code: codeCustom,
      usageLimit: codeLimit,
      expiryDate: codeExpiry
    });
    setCodeCustom('');
    setIsCreateCodeOpen(false);
  };

  const handleExportSummaryCSV = () => {
    const summaryRows = [
      { metric: 'Total Affiliates', value: stats.totalAffiliates },
      { metric: 'Active Affiliates', value: stats.activeAffiliates },
      { metric: 'Total Referred Hospitals', value: stats.totalReferredHospitals },
      { metric: 'Converted Hospitals', value: stats.convertedHospitals },
      { metric: 'Conversion Rate', value: `${stats.conversionRate}%` },
      { metric: 'Eligible Referral Revenue', value: stats.eligibleReferralRevenue },
      { metric: 'Total Commission Earned', value: stats.totalCommissionEarned },
      { metric: 'Pending Commission', value: stats.pendingCommission },
      { metric: 'Approved Commission', value: stats.approvedCommission },
      { metric: 'Total Paid Commission', value: stats.totalPaidCommission }
    ];

    exportToCSV(
      'ClinicOS_Referral_KPI_Summary',
      summaryRows,
      [
        { label: 'Executive Metric', key: 'metric' },
        { label: 'Calculated Value', key: 'value' }
      ]
    );
  };

  // Top 4 Affiliates by Revenue
  const topAffiliates = [...affiliates]
    .sort((a, b) => b.totalCommissionEarned - a.totalCommissionEarned)
    .slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            Commercial Partnerships
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Referral & Affiliate Cockpit
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real-time partner attribution, B2B hospital conversions, accrued commission liabilities, and payout performance.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            icon={Download}
            onClick={handleExportSummaryCSV}
          >
            Export Summary (.CSV)
          </Button>

          <Button
            variant="secondary"
            size="sm"
            icon={Key}
            onClick={() => setIsCreateCodeOpen(true)}
          >
            Generate Code
          </Button>

          <Button
            variant="primary"
            size="sm"
            icon={Plus}
            onClick={() => setIsAddAffiliateOpen(true)}
          >
            Add Affiliate
          </Button>
        </div>
      </div>

      <ReferralNav />

      {/* 10 Polished Metric Cards (Responsive Grid) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5 sm:gap-4">
        <StatCard
          title="Total Affiliates"
          value={stats.totalAffiliates}
          change="+2 this month"
          trend="up"
          icon={Users}
          color="blue"
          subtitle="Registered partner entities"
        />
        <StatCard
          title="Active Affiliates"
          value={stats.activeAffiliates}
          change={`${Math.round((stats.activeAffiliates / (stats.totalAffiliates || 1)) * 100)}% active`}
          trend="up"
          icon={CheckCircle2}
          color="emerald"
          subtitle="Currently generating leads"
        />
        <StatCard
          title="Referred Hospitals"
          value={stats.totalReferredHospitals}
          change="+5 QTD"
          trend="up"
          icon={Building2}
          color="indigo"
          subtitle="Total hospital signups tracked"
        />
        <StatCard
          title="Converted Hospitals"
          value={stats.convertedHospitals}
          change="Paid subscriptions"
          trend="up"
          icon={ArrowUpRight}
          color="emerald"
          subtitle="Active paying SaaS tenants"
        />
        <StatCard
          title="Conversion Rate"
          value={`${stats.conversionRate}%`}
          change="Lead-to-paid ratio"
          trend={stats.conversionRate >= 50 ? 'up' : 'down'}
          icon={Percent}
          color="purple"
          subtitle="Industry benchmark: 35%"
        />
        <StatCard
          title="Attributed Revenue"
          value={formatINR(stats.eligibleReferralRevenue)}
          change="Annual Contract Value"
          trend="up"
          icon={TrendingUp}
          color="blue"
          subtitle="ARR from referred clinics"
        />
        <StatCard
          title="Total Commission Earned"
          value={formatINR(stats.totalCommissionEarned)}
          change="Lifetime accrued"
          trend="up"
          icon={Wallet}
          color="indigo"
          subtitle="All affiliate earnings"
        />
        <StatCard
          title="Pending Commission"
          value={formatINR(stats.pendingCommission)}
          change="Needs review"
          trend="down"
          icon={Clock}
          color="amber"
          subtitle="In verification queue"
        />
        <StatCard
          title="Approved Commission"
          value={formatINR(stats.approvedCommission)}
          change="Ready to disburse"
          trend="up"
          icon={CheckCircle2}
          color="emerald"
          subtitle="Validated in Ledger"
        />
        <StatCard
          title="Total Paid Commission"
          value={formatINR(stats.totalPaidCommission)}
          change="Settled payouts"
          trend="up"
          icon={CreditCard}
          color="slate"
          subtitle="Disbursed via NEFT/UPI"
        />
      </div>

      {/* Charts Section: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Monthly Referral Registrations & Conversions */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Monthly Referral Registrations & Conversions
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Hospital lead volume vs paid subscription activations
              </p>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              Bi-Monthly Trend
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyAnalytics} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    color: '#f8fafc',
                    borderRadius: '0.75rem',
                    fontSize: '12px'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Bar dataKey="registered" name="Hospitals Registered" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="converted" name="Converted Paid" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Chart 2: Monthly Commission Earnings vs Attributed Revenue */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Monthly Commission Earnings & Revenue (₹)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Attributed subscription ARR vs affiliate payout liabilities
              </p>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
              Avg 16.4% CAC
            </span>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyAnalytics} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                  </linearGradient>
                  <linearGradient id="colorComm" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis
                  tick={{ fontSize: 11 }}
                  tickFormatter={(val) => `₹${(val / 1000).toFixed(0)}k`}
                />
                <Tooltip
                  formatter={(value) => formatINR(value)}
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    color: '#f8fafc',
                    borderRadius: '0.75rem',
                    fontSize: '12px'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
                <Area type="monotone" dataKey="revenue" name="Attributed Revenue" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
                <Area type="monotone" dataKey="commission" name="Commission Cost" stroke="#10b981" strokeWidth={2} fillOpacity={1} fill="url(#colorComm)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Top Performing Affiliates & Recent Referral Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left (1 col): Top Performing Affiliates */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <span>Top-Performing Partners</span>
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Ranked by verified hospital conversions
              </p>
            </div>
          </div>

          <div className="space-y-3.5 mt-4">
            {topAffiliates.map((aff, idx) => (
              <div
                key={aff.id}
                className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200/80 dark:border-slate-800 flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950/80 text-blue-700 dark:text-blue-300 font-bold text-xs flex items-center justify-center shrink-0">
                    #{idx + 1}
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white truncate">
                      {aff.name}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                      {aff.partnerType} • {aff.referralCode}
                    </p>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <div className="text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400">
                    {formatINR(aff.totalCommissionEarned)}
                  </div>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400">
                    {aff.convertedHospitalsCount} converted
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Right (2 cols): Recent Referral Activity Table */}
        <Card className="p-5 lg:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Recent Hospital Referral Activity
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Latest signups, trial progress, and conversion milestones
              </p>
            </div>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              Showing {referrals.slice(0, 5).length} latest records
            </span>
          </div>

          <div className="overflow-x-auto mt-2">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-100/70 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 uppercase tracking-wider font-semibold border-b border-slate-200 dark:border-slate-700">
                <tr>
                  <th className="py-2.5 px-3">Hospital / Clinic</th>
                  <th className="py-2.5 px-3">Partner & Code</th>
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Plan & Amount</th>
                  <th className="py-2.5 px-3">Commission</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {referrals.slice(0, 5).map((r) => (
                  <tr key={r.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-2.5 px-3">
                      <div className="font-bold text-slate-900 dark:text-white truncate max-w-[180px]">
                        {r.hospitalName}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        {r.city}
                      </div>
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="font-medium text-slate-900 dark:text-slate-200 truncate max-w-[140px]">
                        {r.affiliateName}
                      </div>
                      <code className="text-[10px] text-blue-600 dark:text-blue-400 font-mono">
                        {r.referralCode}
                      </code>
                    </td>
                    <td className="py-2.5 px-3 whitespace-nowrap text-slate-600 dark:text-slate-300">
                      {r.registrationDate}
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="font-medium text-slate-800 dark:text-slate-200 truncate max-w-[140px]">
                        {r.subscriptionPlan}
                      </div>
                      <span className="text-[11px] text-slate-500">
                        {formatINR(r.subscriptionAmount)}
                      </span>
                    </td>
                    <td className="py-2.5 px-3 font-semibold text-emerald-600 dark:text-emerald-400">
                      {formatINR(r.commissionAmount)}
                    </td>
                    <td className="py-2.5 px-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-semibold border ${getReferralStatusBadge(r.referralStatus)}`}>
                        <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
                        <span>{r.referralStatus}</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Modal: Quick Add Affiliate */}
      <Modal
        isOpen={isAddAffiliateOpen}
        onClose={() => setIsAddAffiliateOpen(false)}
        title="Add New Affiliate Partner"
        size="md"
      >
        <form onSubmit={handleAddAffiliateSubmit} className="space-y-4">
          <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 text-xs border border-blue-200 dark:border-blue-900">
            Enrolling an affiliate creates an automated referral tracking link and provisioned code.
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Affiliate / Contact Name *
            </label>
            <input
              type="text"
              required
              value={newAffName}
              onChange={(e) => setNewAffName(e.target.value)}
              placeholder="e.g. Dr. Priya Sharma"
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Company / Organization
              </label>
              <input
                type="text"
                value={newAffCompany}
                onChange={(e) => setNewAffCompany(e.target.value)}
                placeholder="e.g. HealthBridge Advisory"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Partner Type *
              </label>
              <select
                value={newAffType}
                onChange={(e) => setNewAffType(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Healthcare Consultant">Healthcare Consultant</option>
                <option value="Hospital">Hospital</option>
                <option value="Affiliate Partner">Affiliate Partner</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={newAffEmail}
                onChange={(e) => setNewAffEmail(e.target.value)}
                placeholder="priya@consulting.in"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={newAffPhone}
                onChange={(e) => setNewAffPhone(e.target.value)}
                placeholder="+91 98765 43210"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Custom Referral Code (Optional)
            </label>
            <input
              type="text"
              value={newAffCode}
              onChange={(e) => setNewAffCode(e.target.value)}
              placeholder="e.g. PRIYA-HEALTH (leave blank to auto-generate)"
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white uppercase focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-200 dark:border-slate-800">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAddAffiliateOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Enroll Affiliate
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal: Quick Generate Code */}
      <Modal
        isOpen={isCreateCodeOpen}
        onClose={() => setIsCreateCodeOpen(false)}
        title="Generate Referral Campaign Code"
        size="md"
      >
        <form onSubmit={handleCreateCodeSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Select Affiliate Partner *
            </label>
            <select
              value={codeAffId}
              onChange={(e) => setCodeAffId(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {affiliates.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name} ({a.partnerType})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Code Identifier *
            </label>
            <input
              type="text"
              required
              value={codeCustom}
              onChange={(e) => setCodeCustom(e.target.value)}
              placeholder="e.g. BOMBAY-MEDICA-2026"
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white uppercase font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Usage Limit
              </label>
              <input
                type="number"
                min="1"
                max="1000"
                value={codeLimit}
                onChange={(e) => setCodeLimit(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Expiry Date
              </label>
              <input
                type="date"
                value={codeExpiry}
                onChange={(e) => setCodeExpiry(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-200 dark:border-slate-800">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsCreateCodeOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Generate & Activate Code
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

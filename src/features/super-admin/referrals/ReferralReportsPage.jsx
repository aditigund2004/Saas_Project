import React, { useState, useMemo } from 'react';
import { useReferral } from '../../../context/ReferralContext';
import { ReferralNav } from './ReferralNav';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { StatCard } from '../../../components/ui/StatCard';
import { formatINR, exportToCSV, getReferralStatusBadge } from './referralUtils';
import {
  BarChart3,
  TrendingUp,
  Percent,
  Wallet,
  Building2,
  Download,
  Calendar,
  Users,
  PieChart as PieIcon,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

export function ReferralReportsPage() {
  const {
    affiliates,
    referrals,
    commissionLedger,
    monthlyAnalytics,
    stats
  } = useReferral();

  // Filters
  const [selectedAffiliateId, setSelectedAffiliateId] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [timeframe, setTimeframe] = useState('All');

  // Filtered referrals
  const filteredReferrals = useMemo(() => {
    return referrals.filter((r) => {
      const matchAff = selectedAffiliateId === 'All' || r.affiliateId === selectedAffiliateId;
      const matchStatus = statusFilter === 'All' || r.referralStatus === statusFilter;
      return matchAff && matchStatus;
    });
  }, [referrals, selectedAffiliateId, statusFilter]);

  // Affiliate Conversion Rates Chart Data
  const affiliateConversionData = useMemo(() => {
    return affiliates.map((a) => {
      const rate = a.referredHospitalsCount > 0
        ? Math.round((a.convertedHospitalsCount / a.referredHospitalsCount) * 100)
        : 0;
      return {
        name: a.name.split(' ')[0] + ' ' + (a.name.split(' ')[1] || ''),
        referred: a.referredHospitalsCount,
        converted: a.convertedHospitalsCount,
        conversionRate: rate,
        commission: a.totalCommissionEarned
      };
    });
  }, [affiliates]);

  // Status Distribution Pie Data
  const statusDistributionData = useMemo(() => {
    const counts = {};
    referrals.forEach((r) => {
      counts[r.referralStatus] = (counts[r.referralStatus] || 0) + 1;
    });
    return Object.keys(counts).map((key) => ({
      name: key,
      value: counts[key]
    }));
  }, [referrals]);

  const PIE_COLORS = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

  const handleExportFullReport = () => {
    exportToCSV(
      'ClinicOS_Referral_Analytics_Report',
      filteredReferrals,
      [
        { label: 'Referral ID', key: 'id' },
        { label: 'Hospital Name', key: 'hospitalName' },
        { label: 'City', key: 'city' },
        { label: 'Affiliate', key: 'affiliateName' },
        { label: 'Code', key: 'referralCode' },
        { label: 'Subscription Plan', key: 'subscriptionPlan' },
        { label: 'Attributed ARR (INR)', key: 'subscriptionAmount' },
        { label: 'Commission Liability (INR)', key: 'commissionAmount' },
        { label: 'Status', key: 'referralStatus' },
        { label: 'Registration Date', key: 'registrationDate' }
      ]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            Business Intelligence
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Referral & Affiliate Analytics
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Cohort performance, acquisition cost efficiency, partner conversion yields, and contract ARR attribution.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          icon={Download}
          onClick={handleExportFullReport}
        >
          Export Analytics (.CSV)
        </Button>
      </div>

      <ReferralNav />

      {/* Filter Bar */}
      <Card className="p-4">
        <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex flex-wrap items-center gap-2">
            <div>
              <span className="text-slate-400 font-semibold mr-1.5">Partner:</span>
              <select
                value={selectedAffiliateId}
                onChange={(e) => setSelectedAffiliateId(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
              >
                <option value="All">All Partners ({affiliates.length})</option>
                {affiliates.map((a) => (
                  <option key={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <span className="text-slate-400 font-semibold mr-1.5">Lifecycle:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none"
              >
                <option value="All">All Statuses</option>
                <option value="Converted">Converted</option>
                <option value="Trial">Trial</option>
                <option value="Registered">Registered</option>
                <option value="Rejected">Rejected</option>
              </select>
            </div>
          </div>

          <span className="text-slate-500 dark:text-slate-400 font-mono">
            Attributed Active Volume: <strong>{filteredReferrals.length}</strong> hospitals
          </span>
        </div>
      </Card>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          title="Attributed ARR"
          value={formatINR(stats.eligibleReferralRevenue)}
          change="SaaS Contract Value"
          trend="up"
          icon={TrendingUp}
          color="blue"
          subtitle="Annual revenue from partners"
        />
        <StatCard
          title="Blended Partner CAC"
          value={
            stats.convertedHospitals > 0
              ? formatINR(Math.round(stats.totalCommissionEarned / stats.convertedHospitals))
              : '₹0'
          }
          change="Cost per converted hospital"
          trend="up"
          icon={Wallet}
          color="emerald"
          subtitle="Total commission ÷ converted"
        />
        <StatCard
          title="Conversion Efficiency"
          value={`${stats.conversionRate}%`}
          change="Lead-to-paid ratio"
          trend="up"
          icon={Percent}
          color="indigo"
          subtitle="National healthcare median: 38%"
        />
        <StatCard
          title="Total Paid Commission"
          value={formatINR(stats.totalPaidCommission)}
          change={`${Math.round((stats.totalPaidCommission / (stats.totalCommissionEarned || 1)) * 100)}% settled`}
          trend="up"
          icon={CheckCircle2}
          color="slate"
          subtitle="Disbursed partner liabilities"
        />
      </div>

      {/* Row 1: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Conversion Rate by Partner */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Partner Conversion Rate Comparison (%)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Percentage of referred hospitals successfully converted to paid subscriptions
              </p>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={affiliateConversionData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
                <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} domain={[0, 100]} tickFormatter={(v) => `${v}%`} />
                <Tooltip
                  formatter={(val) => `${val}%`}
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    color: '#f8fafc',
                    borderRadius: '0.75rem',
                    fontSize: '12px'
                  }}
                />
                <Bar dataKey="conversionRate" name="Conversion Rate (%)" fill="#6366f1" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Chart 2: Referral Lifecycle Distribution */}
        <Card className="p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Referral Pipeline Status Distribution
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Proportion of hospitals across lifecycle stages
              </p>
            </div>
          </div>

          <div className="h-72 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={95}
                  paddingAngle={4}
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                  {statusDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    color: '#f8fafc',
                    borderRadius: '0.75rem',
                    fontSize: '12px'
                  }}
                />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Row 2: Monthly Trends & Top Performing Summary */}
      <Card className="p-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              SaaS Subscription ARR Attributed to Referrals vs Commission Cost
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Contract value generated vs compensation disbursed over past 6 months
            </p>
          </div>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyAnalytics} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.15} />
              <XAxis dataKey="month" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
              <Tooltip
                formatter={(val) => formatINR(val)}
                contentStyle={{
                  backgroundColor: '#0f172a',
                  borderColor: '#334155',
                  color: '#f8fafc',
                  borderRadius: '0.75rem',
                  fontSize: '12px'
                }}
              />
              <Legend wrapperStyle={{ fontSize: '12px', paddingTop: '10px' }} />
              <Area type="monotone" dataKey="revenue" name="Attributed Subscription Revenue" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} strokeWidth={2} />
              <Area type="monotone" dataKey="commission" name="Commission Cost" stroke="#10b981" fill="#10b981" fillOpacity={0.3} strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}

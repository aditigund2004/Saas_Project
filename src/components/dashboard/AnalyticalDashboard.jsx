import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Activity,
  ArrowUpRight,
  Calendar,
  Filter,
  Download,
  CreditCard,
  Zap,
  MoreVertical,
  CheckCircle2
} from 'lucide-react';

// ==========================================
// 1. Framer Motion Animation Variants
// ==========================================
const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 28 
  },
  show: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 20,
      mass: 0.8
    }
  }
};

// ==========================================
// 2. Reusable Metric / KPI Card Component
// ==========================================
export const MetricCard = ({ 
  title, 
  value, 
  change, 
  isPositive, 
  period = 'vs last month', 
  icon: Icon,
  sparklineData = [35, 45, 40, 60, 55, 75, 70, 90]
}) => {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ 
        y: -4, 
        transition: { duration: 0.2, ease: 'easeOut' } 
      }}
      className="group relative overflow-hidden rounded-2xl bg-[#0F172A]/90 p-5 sm:p-6 border border-slate-800/80 shadow-lg shadow-black/20 hover:border-slate-700 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 backdrop-blur-md"
    >
      {/* Subtle top ambient glow gradient */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      {/* Header: Title & Icon */}
      <div className="flex items-center justify-between gap-2">
        <span className="text-xs sm:text-sm font-medium tracking-wide text-slate-400">
          {title}
        </span>
        <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-slate-800/80 text-blue-400 border border-slate-700/50 group-hover:bg-blue-500/10 group-hover:text-blue-300 transition-colors">
          <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
        </div>
      </div>

      {/* Value & Trend */}
      <div className="mt-4 flex items-baseline justify-between gap-2">
        <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
          {value}
        </h3>
        <div className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-semibold ${
          isPositive 
            ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
            : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
        }`}>
          {isPositive ? (
            <TrendingUp className="h-3.5 w-3.5" />
          ) : (
            <TrendingDown className="h-3.5 w-3.5" />
          )}
          <span>{change}</span>
        </div>
      </div>

      {/* Footer / Sparkline preview */}
      <div className="mt-4 flex items-center justify-between border-t border-slate-800/60 pt-3">
        <span className="text-[11px] sm:text-xs text-slate-400">
          {period}
        </span>
        {/* Responsive Mini SVG Sparkline */}
        <div className="h-6 w-20">
          <svg className="h-full w-full overflow-visible" viewBox="0 0 100 30">
            <polyline
              fill="none"
              stroke={isPositive ? '#10B981' : '#F43F5E'}
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={sparklineData
                .map((val, idx) => `${(idx / (sparklineData.length - 1)) * 100},${30 - (val / 100) * 26}`)
                .join(' ')}
            />
          </svg>
        </div>
      </div>
    </motion.div>
  );
};

// ==========================================
// 3. Analytics Chart Card Component
// ==========================================
export const ChartCard = ({ 
  title, 
  subtitle, 
  action, 
  children, 
  className = '' 
}) => {
  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ 
        y: -4, 
        transition: { duration: 0.2, ease: 'easeOut' } 
      }}
      className={`group relative overflow-hidden rounded-2xl bg-[#0F172A]/90 p-5 sm:p-6 border border-slate-800/80 shadow-lg shadow-black/20 hover:border-slate-700 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-300 backdrop-blur-md ${className}`}
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent" />
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
        <div>
          <h4 className="text-base sm:text-lg font-bold text-white tracking-tight">
            {title}
          </h4>
          {subtitle && (
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              {subtitle}
            </p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>

      {/* Chart Canvas / Body Container */}
      <div className="relative w-full">
        {children}
      </div>
    </motion.div>
  );
};

// ==========================================
// 4. Main Dashboard Layout Component
// ==========================================
export default function AnalyticalDashboard() {
  const [timeRange, setTimeRange] = useState('7d');

  // Sample analytical KPI metrics
  const stats = [
    {
      title: 'Total Revenue',
      value: '$128,430.00',
      change: '+14.2%',
      isPositive: true,
      period: 'vs last 30 days',
      icon: DollarSign,
      sparkline: [30, 40, 35, 60, 50, 75, 80, 95]
    },
    {
      title: 'Active Patients / Users',
      value: '24,512',
      change: '+8.4%',
      isPositive: true,
      period: 'vs last 30 days',
      icon: Users,
      sparkline: [40, 45, 55, 50, 65, 70, 78, 88]
    },
    {
      title: 'Avg. Consultation Time',
      value: '18m 42s',
      change: '-3.1%',
      isPositive: false,
      period: 'vs last 30 days',
      icon: Activity,
      sparkline: [75, 70, 65, 60, 62, 58, 55, 50]
    },
    {
      title: 'Conversion Rate',
      value: '4.82%',
      change: '+1.6%',
      isPositive: true,
      period: 'vs last 30 days',
      icon: Zap,
      sparkline: [20, 25, 30, 40, 42, 45, 48, 52]
    }
  ];

  // Placeholder weekly traffic volume dataset
  const weeklyData = [
    { day: 'Mon', revenue: 65, consultations: 42 },
    { day: 'Tue', revenue: 80, consultations: 55 },
    { day: 'Wed', revenue: 95, consultations: 68 },
    { day: 'Thu', revenue: 70, consultations: 50 },
    { day: 'Fri', revenue: 110, consultations: 85 },
    { day: 'Sat', revenue: 85, consultations: 60 },
    { day: 'Sun', revenue: 60, consultations: 38 }
  ];

  // Recent activity logs
  const recentActivities = [
    {
      id: 'tx-1',
      title: 'Dr. Sarah Mitchell signed consultation summary',
      time: '12 minutes ago',
      type: 'completed',
      tag: 'Clinical'
    },
    {
      id: 'tx-2',
      title: 'Annual Comprehensive Care Package billed ($890)',
      time: '45 minutes ago',
      type: 'financial',
      tag: 'Billing'
    },
    {
      id: 'tx-3',
      title: 'Telehealth high-concurrency node autoscaled',
      time: '2 hours ago',
      type: 'system',
      tag: 'System'
    },
    {
      id: 'tx-4',
      title: 'Pharmacy prescription batch processed (#RX-894)',
      time: '3 hours ago',
      type: 'completed',
      tag: 'Pharmacy'
    }
  ];

  return (
    <div className="min-h-screen bg-[#080F1E] text-slate-100 p-4 sm:p-6 lg:p-8 font-sans selection:bg-blue-500/20 selection:text-blue-300">
      {/* Maximum Width Shell */}
      <div className="mx-auto max-w-7xl">
        
        {/* Top App Bar / Dashboard Header */}
        <motion.div 
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800/80 pb-6"
        >
          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs uppercase font-mono tracking-widest text-blue-400 font-semibold">
                Live Analytics Feed
              </span>
            </div>
            <h1 className="mt-1 text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              Executive Healthcare Dashboard
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-400">
              Real-time telemetry, revenue velocity, and patient clinical volume.
            </p>
          </div>

          {/* Quick Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Filter Pill */}
            <div className="inline-flex rounded-xl bg-slate-900/90 p-1 border border-slate-800 text-xs">
              {['24h', '7d', '30d', 'Quarter'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setTimeRange(tab)}
                  className={`rounded-lg px-3 py-1.5 font-medium transition-all ${
                    timeRange === tab
                      ? 'bg-blue-600 text-white shadow-xs font-semibold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <button className="flex items-center gap-1.5 rounded-xl border border-slate-800 bg-slate-900/80 px-3.5 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white transition-colors">
              <Download className="h-3.5 w-3.5" />
              <span className="hidden sm:inline">Export Report</span>
            </button>
          </div>
        </motion.div>

        {/* Staggered Motion Container */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="space-y-6"
        >
          {/* Row 1: KPI Statistics Grid (Responsive 1 -> 2 -> 4 cols) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat) => (
              <MetricCard
                key={stat.title}
                title={stat.title}
                value={stat.value}
                change={stat.change}
                isPositive={stat.isPositive}
                period={stat.period}
                icon={stat.icon}
                sparklineData={stat.sparkline}
              />
            ))}
          </div>

          {/* Row 2: Analytical Visualizations (2 Cols on Large, Stacked on Mobile) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Dynamic Chart (Takes 2 columns on lg) */}
            <ChartCard
              title="Revenue & Volume Trajectory"
              subtitle="Comparison across weekly appointment cohorts"
              className="lg:col-span-2"
              action={
                <div className="flex items-center gap-2">
                  <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                    <span className="h-2 w-2 rounded-full bg-blue-500" /> Revenue
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-slate-400">
                    <span className="h-2 w-2 rounded-full bg-cyan-400" /> Cohorts
                  </span>
                </div>
              }
            >
              {/* Interactive Bar Visualization Container */}
              <div className="h-64 sm:h-72 w-full pt-4 flex flex-col justify-end">
                <div className="grid grid-cols-7 gap-2 sm:gap-4 h-full items-end pb-6">
                  {weeklyData.map((item) => (
                    <div key={item.day} className="flex flex-col items-center gap-2 h-full justify-end group/bar">
                      <div className="w-full flex items-end justify-center gap-1 sm:gap-1.5 h-full">
                        {/* Revenue Bar */}
                        <div
                          style={{ height: `${item.revenue}%` }}
                          className="w-full max-w-[18px] sm:max-w-[24px] rounded-t-md bg-gradient-to-t from-blue-600 to-blue-400 group-hover/bar:brightness-125 transition-all duration-300 relative"
                        >
                          <div className="opacity-0 group-hover/bar:opacity-100 transition-opacity absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[10px] px-1.5 py-0.5 rounded border border-slate-700 pointer-events-none whitespace-nowrap z-10 shadow-lg">
                            ${item.revenue}k
                          </div>
                        </div>
                        {/* Consultation Bar */}
                        <div
                          style={{ height: `${item.consultations}%` }}
                          className="w-full max-w-[18px] sm:max-w-[24px] rounded-t-md bg-gradient-to-t from-cyan-600 to-cyan-400 group-hover/bar:brightness-125 transition-all duration-300"
                        />
                      </div>
                      <span className="text-[11px] sm:text-xs font-medium text-slate-400 group-hover/bar:text-white transition-colors">
                        {item.day}
                      </span>
                    </div>
                  ))}
                </div>
                {/* Horizontal baseline */}
                <div className="h-px w-full bg-slate-800" />
              </div>
            </ChartCard>

            {/* Side Card: Channel / Category Breakdown */}
            <ChartCard
              title="Service Distribution"
              subtitle="Departmental utilization breakdown"
              action={
                <button className="text-slate-400 hover:text-white transition-colors">
                  <MoreVertical className="h-4 w-4" />
                </button>
              }
            >
              <div className="space-y-4 pt-2">
                {[
                  { name: 'Cardiology & Internal', percent: 42, color: 'bg-blue-500', value: '$53,940' },
                  { name: 'Diagnostic Imaging / Labs', percent: 28, color: 'bg-cyan-400', value: '$35,960' },
                  { name: 'General Outpatient', percent: 18, color: 'bg-emerald-400', value: '$23,117' },
                  { name: 'Emergency & Urgent', percent: 12, color: 'bg-amber-400', value: '$15,413' }
                ].map((dept) => (
                  <div key={dept.name} className="space-y-1.5">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-slate-300">{dept.name}</span>
                      <span className="text-white font-semibold">{dept.value}</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-slate-800">
                      <div
                        className={`h-full rounded-full ${dept.color} transition-all duration-500`}
                        style={{ width: `${dept.percent}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Summary Pill */}
              <div className="mt-6 rounded-xl bg-slate-900/60 p-3.5 border border-slate-800 flex items-center justify-between">
                <div>
                  <span className="text-[11px] text-slate-400 block">Overall Target</span>
                  <span className="text-sm font-bold text-emerald-400">92.4% Achieved</span>
                </div>
                <ArrowUpRight className="h-4 w-4 text-emerald-400" />
              </div>
            </ChartCard>
          </div>

          {/* Row 3: Live Feed & Telemetry (2 Col Table / 1 Col Status Cards) */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Live Operational Events */}
            <ChartCard
              title="Recent Clinical & System Events"
              subtitle="Audit log of state modifications in the last 4 hours"
              className="lg:col-span-2"
              action={
                <span className="inline-flex items-center gap-1 text-xs text-blue-400 hover:underline cursor-pointer font-medium">
                  View full logs &rarr;
                </span>
              }
            >
              <div className="divide-y divide-slate-800/80">
                {recentActivities.map((act) => (
                  <div key={act.id} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0 gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-8 w-8 rounded-lg bg-slate-800 flex items-center justify-center shrink-0 text-slate-300">
                        <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-medium text-slate-200 truncate">
                          {act.title}
                        </p>
                        <p className="text-[11px] text-slate-400 mt-0.5">
                          {act.time}
                        </p>
                      </div>
                    </div>
                    <span className="shrink-0 text-[10px] sm:text-xs font-mono uppercase px-2 py-0.5 rounded-full bg-slate-800/90 text-slate-300 border border-slate-700">
                      {act.tag}
                    </span>
                  </div>
                ))}
              </div>
            </ChartCard>

            {/* Health Infrastructure Telemetry */}
            <ChartCard
              title="Platform Telemetry"
              subtitle="Edge latency & worker status"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-xs text-slate-300">API Response Time</span>
                  <span className="text-xs font-mono text-emerald-400 font-bold">28ms (Optimal)</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-xs text-slate-300">Database Read Replicas</span>
                  <span className="text-xs font-mono text-blue-400 font-bold">4 / 4 Healthy</span>
                </div>
                <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900/60 border border-slate-800">
                  <span className="text-xs text-slate-300">Sync Pipeline Throughput</span>
                  <span className="text-xs font-mono text-cyan-400 font-bold">1,820 req/s</span>
                </div>
              </div>
            </ChartCard>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

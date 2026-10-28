import React from 'react';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import {
  Mail,
  Zap,
  Send,
  AlertCircle,
  Sparkles,
  Play,
  RotateCcw,
  Eye,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  ArrowRight
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';

export function EmailDashboardTab({
  templates,
  triggers,
  campaigns,
  logs,
  onOpenSimulator,
  onOpenPreview,
  onRetryLog,
  onNavigateTab
}) {
  const totalTemplates = templates.length;
  const activeTemplates = templates.filter((t) => t.status === 'active').length;
  const enabledTriggers = triggers.filter((t) => t.enabled).length;
  const completedCampaigns = campaigns.filter((c) => c.status === 'completed').length;
  const deliveredCount = logs.filter((l) => l.status === 'delivered').length;
  const failedCount = logs.filter((l) => l.status === 'failed').length;
  const skippedCount = logs.filter((l) => l.status === 'skipped').length;

  // Chart data for simulated volume
  const chartData = [
    { date: 'Oct 20', delivered: 12, failed: 1, skipped: 0 },
    { date: 'Oct 21', delivered: 18, failed: 0, skipped: 1 },
    { date: 'Oct 22', delivered: 25, failed: 2, skipped: 0 },
    { date: 'Oct 23', delivered: 31, failed: 1, skipped: 2 },
    { date: 'Oct 24', delivered: 42, failed: 0, skipped: 1 },
    { date: 'Oct 25', delivered: 38, failed: 2, skipped: 0 },
    { date: 'Oct 26', delivered: deliveredCount > 0 ? deliveredCount : 24, failed: failedCount, skipped: skippedCount }
  ];

  return (
    <div className="space-y-6">
      {/* Simulation Notice Banner */}
<<<<<<< HEAD
      <div className="p-4 rounded-xl bg-blue-50/90 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm text-blue-900 dark:text-blue-200 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-600 text-white shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-slate-900 dark:text-white">Prototype Notification Engine Active:</span>{' '}
            <span className="text-slate-700 dark:text-slate-300">
=======
      <div className="p-3.5 rounded-xl bg-blue-50/80 border border-blue-200/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-blue-900">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-blue-600 text-white shrink-0">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <span className="font-bold text-slate-900">Prototype Notification Engine Active:</span>{' '}
            <span className="text-slate-700">
>>>>>>> origin/main
              This module simulates real-world SaaS email triggers, templating, and audience campaigns with client-side persistence. No actual external emails are transmitted.
            </span>
          </div>
        </div>

        <Button
          variant="secondary"
          size="sm"
          icon={Play}
          onClick={onOpenSimulator}
          className="shrink-0 font-semibold"
        >
          Run Event Simulator
        </Button>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Metric 1 */}
<<<<<<< HEAD
        <Card className="p-5 border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Email Templates
            </span>
            <span className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-900/40 text-blue-600 dark:text-blue-400">
              <Mail className="w-5 h-5" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 dark:text-white font-mono tabular-nums">
              {totalTemplates}
            </span>
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
              {activeTemplates} Active
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
=======
        <Card className="p-4 border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Email Templates
            </span>
            <span className="p-2 rounded-xl bg-blue-50 text-blue-600">
              <Mail className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
              {totalTemplates}
            </span>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              {activeTemplates} Active
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
>>>>>>> origin/main
            Across 5 functional healthcare categories
          </p>
        </Card>

        {/* Metric 2 */}
<<<<<<< HEAD
        <Card className="p-5 border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Automated Triggers
            </span>
            <span className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-900/40 text-amber-600 dark:text-amber-400">
              <Zap className="w-5 h-5" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 dark:text-white font-mono tabular-nums">
              {enabledTriggers} / {triggers.length}
            </span>
            <span className="text-xs font-semibold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded-md border border-blue-200 dark:border-blue-800">
              100% Mapped
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
=======
        <Card className="p-4 border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Automated Triggers
            </span>
            <span className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <Zap className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
              {enabledTriggers} / {triggers.length}
            </span>
            <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
              100% Mapped
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
>>>>>>> origin/main
            Hospital, billing & doctor lifecycle hooks
          </p>
        </Card>

        {/* Metric 3 */}
<<<<<<< HEAD
        <Card className="p-5 border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Simulated Dispatched
            </span>
            <span className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400">
              <Send className="w-5 h-5" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 dark:text-white font-mono tabular-nums">
              {deliveredCount}
            </span>
            <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-800">
              Delivered
            </span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
=======
        <Card className="p-4 border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Simulated Dispatched
            </span>
            <span className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <Send className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
              {deliveredCount}
            </span>
            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
              Delivered
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">
>>>>>>> origin/main
            Automations & broadcast campaigns combined
          </p>
        </Card>

        {/* Metric 4 */}
<<<<<<< HEAD
        <Card className="p-5 border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Failures & Skipped
            </span>
            <span className="p-2.5 rounded-xl bg-rose-50 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400">
              <AlertCircle className="w-5 h-5" />
            </span>
          </div>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 dark:text-white font-mono tabular-nums">
              {failedCount + skippedCount}
            </span>
            {failedCount > 0 ? (
              <span className="text-xs font-semibold text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-2 py-0.5 rounded-md border border-rose-200 dark:border-rose-800">
                {failedCount} Retryable
              </span>
            ) : (
              <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
=======
        <Card className="p-4 border-slate-200/90 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
              Failures & Skipped
            </span>
            <span className="p-2 rounded-xl bg-rose-50 text-rose-600">
              <AlertCircle className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
              {failedCount + skippedCount}
            </span>
            {failedCount > 0 ? (
              <span className="text-xs font-semibold text-rose-700 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
                {failedCount} Retryable
              </span>
            ) : (
              <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
>>>>>>> origin/main
                All Clean
              </span>
            )}
          </div>
<<<<<<< HEAD
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
=======
          <p className="text-[11px] text-slate-500 mt-1">
>>>>>>> origin/main
            Simulated network timeouts & disabled triggers
          </p>
        </Card>
      </div>

      {/* Main Grid: Volume Chart + Event Triggers Quick Launch */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Simulated Delivery Volume */}
<<<<<<< HEAD
        <Card className="p-5 lg:col-span-2 border-slate-200 dark:border-slate-800 dark:bg-slate-900 space-y-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Simulated Notification Throughput (7 Days)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Live volume breakdown across automated lifecycle events and product campaigns.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Delivered
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-rose-600 dark:text-rose-400 font-semibold">
=======
        <Card className="p-5 lg:col-span-2 border-slate-200/90 space-y-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Simulated Notification Throughput (7 Days)
              </h3>
              <p className="text-xs text-slate-500">
                Live volume breakdown across automated lifecycle events and product campaigns.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[11px] text-emerald-700 font-semibold">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                Delivered
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] text-rose-600 font-semibold">
>>>>>>> origin/main
                <span className="w-2 h-2 rounded-full bg-rose-500" />
                Failed
              </span>
            </div>
          </div>

<<<<<<< HEAD
          <div className="h-60 w-full pt-2">
=======
          <div className="h-56 w-full pt-2">
>>>>>>> origin/main
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="emailDeliveryGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
<<<<<<< HEAD
                <CartesianGrid strokeDasharray="3 3" stroke="#94a3b8" strokeOpacity={0.2} vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 12, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderRadius: '10px', border: '1px solid #334155', color: '#fff', fontSize: '12px' }}
=======
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11, fill: '#64748b' }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ backgroundColor: '#ffffff', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '12px' }}
>>>>>>> origin/main
                />
                <Area
                  type="monotone"
                  dataKey="delivered"
                  stroke="#2563eb"
<<<<<<< HEAD
                  strokeWidth={2.5}
=======
                  strokeWidth={2}
>>>>>>> origin/main
                  fillOpacity={1}
                  fill="url(#emailDeliveryGradient)"
                  name="Simulated Delivered"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Quick Lifecycle Simulator Panel */}
<<<<<<< HEAD
        <Card className="p-5 border-slate-200 dark:border-slate-800 dark:bg-slate-900 space-y-4 shadow-sm flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Zap className="w-4 h-4 text-amber-500" />
                Instant Event Test Bench
              </h3>
              <Badge variant="outline" className="text-xs">Interactive</Badge>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
=======
        <Card className="p-5 border-slate-200/90 space-y-4 shadow-2xs flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-amber-500" />
                Instant Event Test Bench
              </h3>
              <Badge variant="outline" className="text-[10px]">Interactive</Badge>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">
>>>>>>> origin/main
              Trigger instant simulated events to test variable injection, trigger filters, and activity logging.
            </p>

            <div className="space-y-2 pt-1">
              <button
                type="button"
                onClick={() => onOpenSimulator('subscription.activated')}
<<<<<<< HEAD
                className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-600 hover:bg-blue-50/60 dark:hover:bg-blue-950/40 transition-all text-left flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <span className="block text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    💳 Subscription Activated
                  </span>
                  <span className="block text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Fires purchase confirmation to clinic admin
                  </span>
                </div>
                <Play className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
=======
                className="w-full p-2.5 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50/60 transition-all text-left flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <span className="block text-xs font-bold text-slate-800 group-hover:text-blue-700">
                    💳 Subscription Activated
                  </span>
                  <span className="block text-[10px] text-slate-500">
                    Fires purchase confirmation to clinic admin
                  </span>
                </div>
                <Play className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600" />
>>>>>>> origin/main
              </button>

              <button
                type="button"
                onClick={() => onOpenSimulator('payment.failed')}
<<<<<<< HEAD
                className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-rose-400 dark:hover:border-rose-600 hover:bg-rose-50/60 dark:hover:bg-rose-950/40 transition-all text-left flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <span className="block text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-rose-600 dark:group-hover:text-rose-400">
                    ⚠️ Payment Failure Alert
                  </span>
                  <span className="block text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Tests urgent payment recovery workflow
                  </span>
                </div>
                <Play className="w-4 h-4 text-slate-400 group-hover:text-rose-600" />
=======
                className="w-full p-2.5 rounded-lg border border-slate-200 hover:border-rose-300 hover:bg-rose-50/60 transition-all text-left flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <span className="block text-xs font-bold text-slate-800 group-hover:text-rose-700">
                    ⚠️ Payment Failure Alert
                  </span>
                  <span className="block text-[10px] text-slate-500">
                    Tests urgent payment recovery workflow
                  </span>
                </div>
                <Play className="w-3.5 h-3.5 text-slate-400 group-hover:text-rose-600" />
>>>>>>> origin/main
              </button>

              <button
                type="button"
                onClick={() => onOpenSimulator('doctor.invited')}
<<<<<<< HEAD
                className="w-full p-3 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-600 hover:bg-blue-50/60 dark:hover:bg-blue-950/40 transition-all text-left flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <span className="block text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    👨‍⚕️ New Doctor Invited
                  </span>
                  <span className="block text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    Sends doctor portal setup credentials
                  </span>
                </div>
                <Play className="w-4 h-4 text-slate-400 group-hover:text-blue-600" />
=======
                className="w-full p-2.5 rounded-lg border border-slate-200 hover:border-blue-300 hover:bg-blue-50/60 transition-all text-left flex items-center justify-between group cursor-pointer"
              >
                <div>
                  <span className="block text-xs font-bold text-slate-800 group-hover:text-blue-700">
                    👨‍⚕️ New Doctor Invited
                  </span>
                  <span className="block text-[10px] text-slate-500">
                    Sends doctor portal setup credentials
                  </span>
                </div>
                <Play className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600" />
>>>>>>> origin/main
              </button>
            </div>
          </div>

          <Button
            variant="outline"
            size="sm"
            className="w-full justify-center text-xs font-semibold"
            onClick={onOpenSimulator}
          >
            Open Advanced Event Simulator ➔
          </Button>
        </Card>
      </div>

      {/* Recent Activity Table */}
<<<<<<< HEAD
      <Card className="border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Recent Email Notification Activity
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
=======
      <Card className="border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="p-4 sm:p-5 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Recent Email Notification Activity
            </h3>
            <p className="text-xs text-slate-500">
>>>>>>> origin/main
              Chronological log of simulated trigger dispatches and recipient outcomes.
            </p>
          </div>
          <button
            type="button"
            onClick={() => onNavigateTab('logs')}
<<<<<<< HEAD
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
          >
            <span>View All Activity Logs ({logs.length})</span>
            <ArrowRight className="w-4 h-4" />
=======
            className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
          >
            <span>View All Activity Logs ({logs.length})</span>
            <ArrowRight className="w-3.5 h-3.5" />
>>>>>>> origin/main
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
<<<<<<< HEAD
              <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                <th className="py-3 px-3 text-center w-12">#</th>
=======
              <tr className="bg-slate-50 border-b border-slate-200/80 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
>>>>>>> origin/main
                <th className="py-3 px-4">Email Subject & Recipient</th>
                <th className="py-3 px-4">Event Trigger</th>
                <th className="py-3 px-4">Source</th>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
<<<<<<< HEAD
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {logs.slice(0, 6).map((log, idx) => {
=======
            <tbody className="divide-y divide-slate-100">
              {logs.slice(0, 6).map((log) => {
>>>>>>> origin/main
                const isDelivered = log.status === 'delivered';
                const isFailed = log.status === 'failed';
                const isSkipped = log.status === 'skipped';

                return (
<<<<<<< HEAD
                  <tr key={log.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="py-3.5 px-3 text-center font-mono font-medium text-slate-400 dark:text-slate-500 text-xs">{idx + 1}</td>
                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900 dark:text-white max-w-sm truncate" title={log.subject}>
                        {log.subject}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5 mt-0.5">
                        <span className="font-medium text-slate-700 dark:text-slate-300">{log.recipientName}</span>
=======
                  <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900 max-w-sm truncate" title={log.subject}>
                        {log.subject}
                      </div>
                      <div className="text-[11px] text-slate-500 flex items-center gap-1.5 mt-0.5">
                        <span>{log.recipientName}</span>
>>>>>>> origin/main
                        <span>•</span>
                        <span className="font-mono">{log.recipientEmail}</span>
                      </div>
                    </td>

<<<<<<< HEAD
                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-xs font-semibold">
                        {log.eventKey}
                      </span>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{log.clinicName}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="capitalize text-slate-700 dark:text-slate-300 font-medium text-xs">
=======
                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[10px] font-semibold">
                        {log.eventKey}
                      </span>
                      <div className="text-[10px] text-slate-500 mt-0.5">{log.clinicName}</div>
                    </td>

                    <td className="py-3 px-4">
                      <span className="capitalize text-slate-700 font-medium">
>>>>>>> origin/main
                        {log.source.replace('_', ' ')}
                      </span>
                    </td>

<<<<<<< HEAD
                    <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400 font-mono text-xs whitespace-nowrap">
=======
                    <td className="py-3 px-4 text-slate-500 font-mono text-[11px] whitespace-nowrap">
>>>>>>> origin/main
                      {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} •{' '}
                      {new Date(log.timestamp).toLocaleDateString([], { month: 'short', day: 'numeric' })}
                    </td>

<<<<<<< HEAD
                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {isDelivered && (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
=======
                    <td className="py-3 px-4 whitespace-nowrap">
                      {isDelivered && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
>>>>>>> origin/main
                          Delivered (Simulated)
                        </span>
                      )}
                      {isFailed && (
<<<<<<< HEAD
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-400 border border-rose-200 dark:border-rose-800" title={log.errorReason}>
                          <XCircle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
=======
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-800 border border-rose-200" title={log.errorReason}>
                          <XCircle className="w-3 h-3 text-rose-600" />
>>>>>>> origin/main
                          Failed
                        </span>
                      )}
                      {isSkipped && (
<<<<<<< HEAD
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-400 border border-amber-200 dark:border-amber-800" title={log.errorReason}>
                          <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
=======
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200" title={log.errorReason}>
                          <AlertTriangle className="w-3 h-3 text-amber-600" />
>>>>>>> origin/main
                          Skipped
                        </span>
                      )}
                    </td>

<<<<<<< HEAD
                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
=======
                    <td className="py-3 px-4 text-right whitespace-nowrap">
>>>>>>> origin/main
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => onOpenPreview(log)}
<<<<<<< HEAD
                          className="p-1.5 rounded text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
=======
                          className="p-1 rounded text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-colors"
>>>>>>> origin/main
                          title="Preview Rendered Email"
                        >
                          <Eye className="w-4 h-4" />
                        </button>

                        {isFailed && (
                          <button
                            type="button"
                            onClick={() => onRetryLog(log.id)}
<<<<<<< HEAD
                            className="p-1.5 rounded text-slate-400 hover:text-emerald-600 dark:hover:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
=======
                            className="p-1 rounded text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
>>>>>>> origin/main
                            title="Retry Simulation"
                          >
                            <RotateCcw className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

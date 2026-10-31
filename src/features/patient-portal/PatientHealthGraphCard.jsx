import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import { Card, CardHeader } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import {
  Activity,
  Heart,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  Info,
  Scale,
  Sparkles,
  ArrowUpRight
} from 'lucide-react';
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine
} from 'recharts';

const HEALTH_HISTORY_6M = [
  {
    period: 'May 2026',
    shortPeriod: 'May',
    overallScore: 85,
    systolic: 128,
    diastolic: 84,
    heartRate: 78,
    weight: 69.5,
    bmi: 22.9,
    spO2: 98,
    status: 'Good',
    notes: 'Baseline routine health audit'
  },
  {
    period: 'Jun 2026',
    shortPeriod: 'Jun',
    overallScore: 86,
    systolic: 126,
    diastolic: 82,
    heartRate: 76,
    weight: 69.1,
    bmi: 22.8,
    spO2: 99,
    status: 'Good',
    notes: 'Annual metabolic profile normal'
  },
  {
    period: 'Jul 2026',
    shortPeriod: 'Jul',
    overallScore: 88,
    systolic: 124,
    diastolic: 80,
    heartRate: 75,
    weight: 68.8,
    bmi: 22.7,
    spO2: 99,
    status: 'Optimal',
    notes: 'Preventive dental prophylaxis completed'
  },
  {
    period: 'Aug 2026',
    shortPeriod: 'Aug',
    overallScore: 84,
    systolic: 128,
    diastolic: 84,
    heartRate: 79,
    weight: 68.9,
    bmi: 22.7,
    spO2: 98,
    status: 'Monitored',
    notes: 'Transient tooth sensitivity recorded'
  },
  {
    period: 'Sep 2026',
    shortPeriod: 'Sep',
    overallScore: 89,
    systolic: 122,
    diastolic: 80,
    heartRate: 74,
    weight: 68.4,
    bmi: 22.5,
    spO2: 99,
    status: 'Optimal',
    notes: 'Cardiovascular parameters stable'
  },
  {
    period: 'Oct 2026',
    shortPeriod: 'Oct',
    overallScore: 93,
    systolic: 120,
    diastolic: 78,
    heartRate: 72,
    weight: 68.0,
    bmi: 22.4,
    spO2: 99,
    status: 'Optimal',
    notes: 'Post-consultation recovery, all vitals optimal'
  }
];

const HEALTH_HISTORY_30D = [
  {
    period: '03 Oct',
    shortPeriod: 'W1',
    overallScore: 88,
    systolic: 124,
    diastolic: 82,
    heartRate: 76,
    weight: 68.5,
    bmi: 22.6,
    spO2: 98,
    status: 'Optimal',
    notes: 'Weekly vitals check-in'
  },
  {
    period: '10 Oct',
    shortPeriod: 'W2',
    overallScore: 89,
    systolic: 122,
    diastolic: 80,
    heartRate: 75,
    weight: 68.3,
    bmi: 22.5,
    spO2: 99,
    status: 'Optimal',
    notes: 'Pre-procedure baseline vitals'
  },
  {
    period: '17 Oct',
    shortPeriod: 'W3',
    overallScore: 91,
    systolic: 122,
    diastolic: 80,
    heartRate: 73,
    weight: 68.1,
    bmi: 22.4,
    spO2: 99,
    status: 'Optimal',
    notes: 'Post-procedure stabilization'
  },
  {
    period: '24 Oct',
    shortPeriod: 'W4',
    overallScore: 93,
    systolic: 120,
    diastolic: 78,
    heartRate: 72,
    weight: 68.0,
    bmi: 22.4,
    spO2: 99,
    status: 'Optimal',
    notes: 'Optimal vital indices confirmed'
  }
];

export function PatientHealthGraphCard({ latestVitals, doctorName }) {
  const { isDark } = useTheme();
  const [activeMetric, setActiveMetric] = useState('overall'); // 'overall' | 'bp' | 'heart' | 'weight'
  const [timeRange, setTimeRange] = useState('6M'); // '6M' | '30D'

  const chartData = timeRange === '6M' ? HEALTH_HISTORY_6M : HEALTH_HISTORY_30D;
  const currentEntry = chartData[chartData.length - 1];

  const gridColor = isDark ? '#1e293b' : '#f1f5f9';
  const axisColor = isDark ? '#94a3b8' : '#64748b';

  // Custom chart tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || !payload.length) return null;
    const data = payload[0].payload;

    return (
      <div className="bg-white/95 dark:bg-slate-900/95 backdrop-blur-md p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xl text-xs space-y-1.5 min-w-[200px]">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-1.5">
          <span className="font-bold text-slate-900 dark:text-white text-sm">{data.period}</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
            {data.status}
          </span>
        </div>

        {activeMetric === 'overall' && (
          <div className="space-y-1 pt-1">
            <div className="flex justify-between items-center">
              <span className="text-slate-500 dark:text-slate-400">Health Index:</span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                {data.overallScore} / 100
              </span>
            </div>
            <div className="flex justify-between items-center text-[11px] text-slate-500 dark:text-slate-400">
              <span>Blood Pressure:</span>
              <span className="font-mono">{data.systolic}/{data.diastolic} mmHg</span>
            </div>
            <div className="flex justify-between items-center text-[11px] text-slate-500 dark:text-slate-400">
              <span>Resting Heart Rate:</span>
              <span className="font-mono">{data.heartRate} bpm</span>
            </div>
          </div>
        )}

        {activeMetric === 'bp' && (
          <div className="space-y-1 pt-1">
            <div className="flex justify-between items-center text-blue-600 dark:text-blue-400 font-semibold">
              <span>Systolic:</span>
              <span className="font-mono font-bold">{data.systolic} mmHg</span>
            </div>
            <div className="flex justify-between items-center text-cyan-600 dark:text-cyan-400 font-semibold">
              <span>Diastolic:</span>
              <span className="font-mono font-bold">{data.diastolic} mmHg</span>
            </div>
            <div className="text-[10px] text-slate-400 dark:text-slate-500 pt-1 border-t border-slate-100 dark:border-slate-800">
              Target: &lt; 120/80 mmHg (AHA Guideline)
            </div>
          </div>
        )}

        {activeMetric === 'heart' && (
          <div className="space-y-1 pt-1">
            <div className="flex justify-between items-center text-rose-600 dark:text-rose-400 font-bold">
              <span>Resting Heart Rate:</span>
              <span className="font-mono text-sm">{data.heartRate} bpm</span>
            </div>
            <div className="flex justify-between items-center text-slate-500 dark:text-slate-400 text-[11px]">
              <span>Blood Oxygen (SpO2):</span>
              <span className="font-mono font-semibold">{data.spO2}%</span>
            </div>
          </div>
        )}

        {activeMetric === 'weight' && (
          <div className="space-y-1 pt-1">
            <div className="flex justify-between items-center text-indigo-600 dark:text-indigo-400 font-bold">
              <span>Body Weight:</span>
              <span className="font-mono text-sm">{data.weight} kg</span>
            </div>
            <div className="flex justify-between items-center text-slate-500 dark:text-slate-400 text-[11px]">
              <span>BMI Score:</span>
              <span className="font-mono font-semibold">{data.bmi} (Normal)</span>
            </div>
          </div>
        )}

        {data.notes && (
          <p className="text-[11px] text-slate-500 dark:text-slate-400 italic pt-1 border-t border-slate-100 dark:border-slate-800">
            "{data.notes}"
          </p>
        )}
      </div>
    );
  };

  return (
    <Card className="rounded-3xl border-white/60 dark:border-white/10 bg-white/75 dark:bg-slate-900/75 backdrop-blur-xl shadow-lg shadow-slate-200/50 dark:shadow-slate-950/50 overflow-hidden">
      <CardHeader
        title={
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <span className="text-base sm:text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                Overall Health & Vital Trends
              </span>
              <span className="ml-2.5 inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                <Sparkles className="w-3 h-3" /> Optimal Status
              </span>
            </div>
          </div>
        }
        subtitle="Longitudinal biometric progression, vitals stability, and health score from clinical visits"
        action={
          <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-lg">
            <button
              onClick={() => setTimeRange('6M')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                timeRange === '6M'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              6 Months
            </button>
            <button
              onClick={() => setTimeRange('30D')}
              className={`px-2.5 py-1 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                timeRange === '30D'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              30 Days
            </button>
          </div>
        }
      />

      {/* Quick Biometrics Scorecards */}
      <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Card 1: Overall Health Index */}
          <button
            onClick={() => setActiveMetric('overall')}
            className={`relative overflow-hidden p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer backdrop-blur-xl ${
              activeMetric === 'overall'
                ? 'bg-white/90 dark:bg-slate-900/90 border-emerald-400 dark:border-emerald-500 shadow-md ring-2 ring-emerald-500/30'
                : 'bg-white/60 dark:bg-slate-900/60 border-white/60 dark:border-white/10 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-white/80'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-teal-500/5 to-transparent pointer-events-none" />
            <div className="relative z-10 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-semibold mb-1">
              <span>Health Index</span>
              <TrendingUp className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="relative z-10 text-xl sm:text-2xl font-black text-slate-900 dark:text-white tabular-nums">
              {currentEntry.overallScore} <span className="text-xs font-normal text-slate-400">/ 100</span>
            </div>
            <div className="relative z-10 text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold mt-1 flex items-center gap-1">
              <span>+4 pts</span>
              <span className="text-slate-400 font-normal">· Optimal Wellness</span>
            </div>
          </button>

          {/* Card 2: Blood Pressure */}
          <button
            onClick={() => setActiveMetric('bp')}
            className={`relative overflow-hidden p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer backdrop-blur-xl ${
              activeMetric === 'bp'
                ? 'bg-white/90 dark:bg-slate-900/90 border-blue-400 dark:border-blue-500 shadow-md ring-2 ring-blue-500/30'
                : 'bg-white/60 dark:bg-slate-900/60 border-white/60 dark:border-white/10 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-white/80'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-transparent pointer-events-none" />
            <div className="relative z-10 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-semibold mb-1">
              <span>Blood Pressure</span>
              <Activity className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="relative z-10 text-xl sm:text-2xl font-black text-slate-900 dark:text-white tabular-nums">
              {currentEntry.systolic}/{currentEntry.diastolic} <span className="text-xs font-normal text-slate-400">mmHg</span>
            </div>
            <div className="relative z-10 text-[11px] text-blue-700 dark:text-blue-400 font-semibold mt-1">
              Normal arterial pressure
            </div>
          </button>

          {/* Card 3: Resting Heart Rate */}
          <button
            onClick={() => setActiveMetric('heart')}
            className={`relative overflow-hidden p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer backdrop-blur-xl ${
              activeMetric === 'heart'
                ? 'bg-white/90 dark:bg-slate-900/90 border-rose-400 dark:border-rose-500 shadow-md ring-2 ring-rose-500/30'
                : 'bg-white/60 dark:bg-slate-900/60 border-white/60 dark:border-white/10 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-white/80'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 via-pink-500/5 to-transparent pointer-events-none" />
            <div className="relative z-10 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-semibold mb-1">
              <span>Resting Pulse</span>
              <Heart className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
            </div>
            <div className="relative z-10 text-xl sm:text-2xl font-black text-slate-900 dark:text-white tabular-nums">
              {currentEntry.heartRate} <span className="text-xs font-normal text-slate-400">bpm</span>
            </div>
            <div className="relative z-10 text-[11px] text-rose-700 dark:text-rose-400 font-semibold mt-1">
              SpO2 {currentEntry.spO2}% · Normal Rhythm
            </div>
          </button>

          {/* Card 4: Weight & BMI */}
          <button
            onClick={() => setActiveMetric('weight')}
            className={`relative overflow-hidden p-4 rounded-2xl border text-left transition-all duration-300 cursor-pointer backdrop-blur-xl ${
              activeMetric === 'weight'
                ? 'bg-white/90 dark:bg-slate-900/90 border-indigo-400 dark:border-indigo-500 shadow-md ring-2 ring-indigo-500/30'
                : 'bg-white/60 dark:bg-slate-900/60 border-white/60 dark:border-white/10 hover:border-slate-300 dark:hover:border-slate-700 hover:bg-white/80'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent pointer-events-none" />
            <div className="relative z-10 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-semibold mb-1">
              <span>Weight & BMI</span>
              <Scale className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div className="relative z-10 text-xl sm:text-2xl font-black text-slate-900 dark:text-white tabular-nums">
              {currentEntry.weight} <span className="text-xs font-normal text-slate-400">kg</span>
            </div>
            <div className="relative z-10 text-[11px] text-indigo-700 dark:text-indigo-400 font-semibold mt-1">
              BMI {currentEntry.bmi} · Healthy Range
            </div>
          </button>
        </div>
      </div>

      {/* Chart Visualization Area */}
      <div className="p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              {activeMetric === 'overall' && 'Overall Health Progression Index'}
              {activeMetric === 'bp' && 'Blood Pressure Trajectory (Systolic vs Diastolic)'}
              {activeMetric === 'heart' && 'Resting Heart Rate & Pulse Stability'}
              {activeMetric === 'weight' && 'Body Weight & Mass Index Curve'}
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500">· Evaluated monthly</span>
          </div>

          <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
            {activeMetric === 'overall' && (
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                Wellness Score (0-100)
              </span>
            )}
            {activeMetric === 'bp' && (
              <>
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  Systolic (mmHg)
                </span>
                <span className="flex items-center gap-1.5 font-medium">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-500" />
                  Diastolic (mmHg)
                </span>
              </>
            )}
            {activeMetric === 'heart' && (
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                Pulse (BPM)
              </span>
            )}
            {activeMetric === 'weight' && (
              <span className="flex items-center gap-1.5 font-medium">
                <span className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                Weight (kg)
              </span>
            )}
          </div>
        </div>

        <div className="h-64 sm:h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            {activeMetric === 'overall' ? (
              <AreaChart data={chartData} margin={{ top: 10, right: 12, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="healthScoreGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                <XAxis
                  dataKey={timeRange === '6M' ? 'shortPeriod' : 'period'}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: axisColor }}
                />
                <YAxis
                  domain={[70, 100]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: axisColor }}
                />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine
                  y={85}
                  stroke="#10B981"
                  strokeDasharray="4 4"
                  strokeOpacity={0.6}
                  label={{ value: 'Optimal Benchmark', fill: '#10B981', fontSize: 10, position: 'insideTopLeft' }}
                />
                <Area
                  type="monotone"
                  dataKey="overallScore"
                  stroke="#10B981"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#healthScoreGrad)"
                  activeDot={{ r: 6, fill: '#10B981', stroke: '#ffffff', strokeWidth: 2 }}
                />
              </AreaChart>
            ) : activeMetric === 'bp' ? (
              <LineChart data={chartData} margin={{ top: 10, right: 12, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                <XAxis
                  dataKey={timeRange === '6M' ? 'shortPeriod' : 'period'}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: axisColor }}
                />
                <YAxis
                  domain={[60, 140]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: axisColor }}
                />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine
                  y={120}
                  stroke="#3B82F6"
                  strokeDasharray="4 4"
                  strokeOpacity={0.5}
                  label={{ value: 'Target Systolic (<120)', fill: '#3B82F6', fontSize: 10, position: 'insideTopLeft' }}
                />
                <ReferenceLine
                  y={80}
                  stroke="#06B6D4"
                  strokeDasharray="4 4"
                  strokeOpacity={0.5}
                  label={{ value: 'Target Diastolic (<80)', fill: '#06B6D4', fontSize: 10, position: 'insideBottomLeft' }}
                />
                <Line
                  type="monotone"
                  dataKey="systolic"
                  stroke="#3B82F6"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: '#3B82F6' }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="diastolic"
                  stroke="#06B6D4"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: '#06B6D4' }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            ) : activeMetric === 'heart' ? (
              <AreaChart data={chartData} margin={{ top: 10, right: 12, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="heartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#F43F5E" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#F43F5E" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                <XAxis
                  dataKey={timeRange === '6M' ? 'shortPeriod' : 'period'}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: axisColor }}
                />
                <YAxis
                  domain={[60, 95]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: axisColor }}
                />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine
                  y={75}
                  stroke="#F43F5E"
                  strokeDasharray="4 4"
                  strokeOpacity={0.5}
                  label={{ value: 'Normal Rest Heart Rate (60-80)', fill: '#F43F5E', fontSize: 10, position: 'insideTopLeft' }}
                />
                <Area
                  type="monotone"
                  dataKey="heartRate"
                  stroke="#F43F5E"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#heartGrad)"
                  activeDot={{ r: 6, fill: '#F43F5E', stroke: '#ffffff', strokeWidth: 2 }}
                />
              </AreaChart>
            ) : (
              <LineChart data={chartData} margin={{ top: 10, right: 12, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                <XAxis
                  dataKey={timeRange === '6M' ? 'shortPeriod' : 'period'}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: axisColor }}
                />
                <YAxis
                  domain={[66, 72]}
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 11, fill: axisColor }}
                />
                <Tooltip content={<CustomTooltip />} />
                <Line
                  type="monotone"
                  dataKey="weight"
                  stroke="#6366F1"
                  strokeWidth={2.5}
                  dot={{ r: 4, fill: '#6366F1' }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            )}
          </ResponsiveContainer>
        </div>

        {/* Doctor Clinical Assessment Banner */}
        <div className="mt-4 p-3.5 sm:p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 flex items-center justify-center shrink-0 font-bold mt-0.5">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="font-bold text-slate-900 dark:text-white">
                Clinical Vitals Assessment {doctorName ? `by ${doctorName}` : 'by Attending Physician'}
              </p>
              <p className="text-slate-600 dark:text-slate-400 mt-0.5 leading-relaxed">
                "Vitals and biometrics demonstrate healthy recovery and normal arterial tension. Keep up your active hydration routine and schedule your next 6-month preventive review."
              </p>
            </div>
          </div>

          <Link
            to="/patient/records"
            className="inline-flex items-center gap-1 font-semibold text-blue-600 dark:text-blue-400 hover:underline shrink-0 text-xs"
          >
            Full Health Records <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </Card>
  );
}


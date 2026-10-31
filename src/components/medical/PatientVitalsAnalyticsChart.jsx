import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  AreaChart,
  Area
} from 'recharts';
import { Activity, Heart, Thermometer, Wind, AlertCircle, Info, Calendar } from 'lucide-react';
import { Card } from '../ui/Card';

// Rich historical demo vitals for the patient
const MOCK_HISTORICAL_VITALS = [
  { date: '2026-05-10', systolic: 122, diastolic: 80, heartRate: 72, temperature: 98.4, spO2: 99 },
  { date: '2026-06-18', systolic: 128, diastolic: 84, heartRate: 78, temperature: 98.6, spO2: 98 },
  { date: '2026-07-25', systolic: 135, diastolic: 88, heartRate: 84, temperature: 99.1, spO2: 97, notes: 'Mild fever & elevated BP' },
  { date: '2026-08-30', systolic: 126, diastolic: 82, heartRate: 75, temperature: 98.5, spO2: 99 },
  { date: '2026-09-15', systolic: 120, diastolic: 78, heartRate: 70, temperature: 98.6, spO2: 99 },
  { date: '2026-10-02', systolic: 132, diastolic: 86, heartRate: 82, temperature: 98.7, spO2: 98 },
  { date: '2026-10-23', systolic: 124, diastolic: 82, heartRate: 76, temperature: 98.6, spO2: 99, notes: 'Current consultation visit' }
];

export function PatientVitalsAnalyticsChart({
  vitalsHistory = MOCK_HISTORICAL_VITALS,
  patientName = 'Patient'
}) {
  const [selectedMetric, setSelectedMetric] = useState('bp'); // 'bp' | 'heartRate' | 'temperature' | 'spO2'
  const [timeRange, setTimeRange] = useState('all'); // '7d' | '30d' | 'all'

  // Filter vitals by time range
  const filteredData = useMemo(() => {
    if (timeRange === '7d') return vitalsHistory.slice(-2);
    if (timeRange === '30d') return vitalsHistory.slice(-4);
    return vitalsHistory;
  }, [vitalsHistory, timeRange]);

  const latest = vitalsHistory[vitalsHistory.length - 1] || vitalsHistory[0];

  // Abnormal checks
  const isBpElevated = latest.systolic >= 130 || latest.diastolic >= 85;
  const isPulseAbnormal = latest.heartRate < 60 || latest.heartRate > 100;
  const isSpO2Low = latest.spO2 < 95;
  const isTempFever = latest.temperature >= 99.5;

  return (
    <Card className="p-5 sm:p-6 space-y-6 border-slate-200 dark:border-slate-800">
      {/* Header and Telemetry Summary */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              Clinical Telemetry & EHR
            </span>
          </div>
          <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
            Patient Vitals & Health Analytics
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Historical trends across blood pressure, cardiac pulse, body temperature, and oxygen saturation.
          </p>
        </div>

        {/* Range Selector */}
        <div className="flex items-center rounded-xl bg-slate-100 dark:bg-slate-800 p-1 text-xs">
          {[
            { id: '7d', label: 'Last 7 Days' },
            { id: '30d', label: 'Last 30 Days' },
            { id: 'all', label: 'All History' }
          ].map((r) => (
            <button
              key={r.id}
              onClick={() => setTimeRange(r.id)}
              className={`px-3 py-1 rounded-lg font-medium transition-all ${
                timeRange === r.id
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 font-bold shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      {/* Metric Quick Stats Badges */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {/* Blood Pressure Card */}
        <div
          onClick={() => setSelectedMetric('bp')}
          className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
            selectedMetric === 'bp'
              ? 'border-blue-500 bg-blue-50/50 dark:bg-blue-950/30 ring-2 ring-blue-500/20'
              : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Blood Pressure</span>
            <Activity className="w-4 h-4 text-blue-600" />
          </div>
          <div className="text-lg font-mono font-extrabold text-slate-900 dark:text-white mt-1">
            {latest.systolic}/{latest.diastolic}{' '}
            <span className="text-[10px] font-normal text-slate-400">mmHg</span>
          </div>
          <div className="flex items-center space-x-1 mt-1 text-[10px]">
            {isBpElevated ? (
              <span className="text-amber-600 dark:text-amber-400 font-bold flex items-center gap-0.5">
                <AlertCircle className="w-3 h-3" /> Pre-hypertension
              </span>
            ) : (
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Normal Range</span>
            )}
          </div>
        </div>

        {/* Heart Rate Card */}
        <div
          onClick={() => setSelectedMetric('heartRate')}
          className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
            selectedMetric === 'heartRate'
              ? 'border-rose-500 bg-rose-50/50 dark:bg-rose-950/30 ring-2 ring-rose-500/20'
              : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Heart Rate</span>
            <Heart className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-lg font-mono font-extrabold text-slate-900 dark:text-white mt-1">
            {latest.heartRate}{' '}
            <span className="text-[10px] font-normal text-slate-400">bpm</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-1">
            Normal: 60–100 bpm
          </div>
        </div>

        {/* Temperature Card */}
        <div
          onClick={() => setSelectedMetric('temperature')}
          className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
            selectedMetric === 'temperature'
              ? 'border-amber-500 bg-amber-50/50 dark:bg-amber-950/30 ring-2 ring-amber-500/20'
              : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">Temperature</span>
            <Thermometer className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-lg font-mono font-extrabold text-slate-900 dark:text-white mt-1">
            {latest.temperature}°{' '}
            <span className="text-[10px] font-normal text-slate-400">F</span>
          </div>
          <div className="text-[10px] text-slate-500 mt-1">
            Normal: 97.8°–99.0°F
          </div>
        </div>

        {/* Oxygen Saturation Card */}
        <div
          onClick={() => setSelectedMetric('spO2')}
          className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
            selectedMetric === 'spO2'
              ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/30 ring-2 ring-emerald-500/20'
              : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">SpO2 Oxygen</span>
            <Wind className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-lg font-mono font-extrabold text-slate-900 dark:text-white mt-1">
            {latest.spO2}%
          </div>
          <div className="text-[10px] text-slate-500 mt-1">
            Optimal: &gt; 95%
          </div>
        </div>
      </div>

      {/* Main Interactive Recharts Graph */}
      <div className="h-64 sm:h-72 w-full pt-2">
        <ResponsiveContainer width="100%" height="100%">
          {selectedMetric === 'bp' ? (
            <LineChart data={filteredData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.6} />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis domain={[60, 160]} tick={{ fontSize: 11 }} unit=" mmHg" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  color: '#fff',
                  borderRadius: '12px',
                  fontSize: '12px',
                  border: 'none'
                }}
              />
              <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
              <ReferenceLine y={120} stroke="#22c55e" strokeDasharray="4 4" label={{ value: 'Normal Systolic (120)', position: 'insideTopLeft', fill: '#16a34a', fontSize: 10 }} />
              <ReferenceLine y={80} stroke="#22c55e" strokeDasharray="4 4" label={{ value: 'Normal Diastolic (80)', position: 'insideBottomLeft', fill: '#16a34a', fontSize: 10 }} />
              <Line type="monotone" dataKey="systolic" name="Systolic BP" stroke="#2563eb" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              <Line type="monotone" dataKey="diastolic" name="Diastolic BP" stroke="#0ea5e9" strokeWidth={2} dot={{ r: 3 }} />
            </LineChart>
          ) : selectedMetric === 'heartRate' ? (
            <AreaChart data={filteredData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.6} />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis domain={[50, 120]} tick={{ fontSize: 11 }} unit=" bpm" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  color: '#fff',
                  borderRadius: '12px',
                  fontSize: '12px',
                  border: 'none'
                }}
              />
              <ReferenceLine y={100} stroke="#ef4444" strokeDasharray="3 3" label={{ value: 'Tachycardia Threshold (100)', fill: '#dc2626', fontSize: 10 }} />
              <Area type="monotone" dataKey="heartRate" name="Heart Rate (Pulse)" stroke="#e11d48" fill="#ffe4e6" fillOpacity={0.6} strokeWidth={2.5} dot={{ r: 4 }} />
            </AreaChart>
          ) : selectedMetric === 'temperature' ? (
            <LineChart data={filteredData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.6} />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis domain={[96, 103]} tick={{ fontSize: 11 }} unit="°F" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  color: '#fff',
                  borderRadius: '12px',
                  fontSize: '12px',
                  border: 'none'
                }}
              />
              <ReferenceLine y={98.6} stroke="#16a34a" strokeDasharray="4 4" label={{ value: 'Baseline (98.6°F)', fill: '#16a34a', fontSize: 10 }} />
              <ReferenceLine y={100.4} stroke="#dc2626" strokeDasharray="3 3" label={{ value: 'Pyrexia Fever (100.4°F)', fill: '#dc2626', fontSize: 10 }} />
              <Line type="monotone" dataKey="temperature" name="Body Temperature (°F)" stroke="#d97706" strokeWidth={2.5} dot={{ r: 4 }} />
            </LineChart>
          ) : (
            <AreaChart data={filteredData} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.6} />
              <XAxis dataKey="date" tick={{ fontSize: 11 }} />
              <YAxis domain={[90, 100]} tick={{ fontSize: 11 }} unit="%" />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#0f172a',
                  color: '#fff',
                  borderRadius: '12px',
                  fontSize: '12px',
                  border: 'none'
                }}
              />
              <ReferenceLine y={95} stroke="#ef4444" strokeDasharray="3 3" label={{ value: 'Minimum Healthy SpO2 (95%)', fill: '#dc2626', fontSize: 10 }} />
              <Area type="monotone" dataKey="spO2" name="Blood Oxygen SpO2" stroke="#059669" fill="#d1fae5" fillOpacity={0.6} strokeWidth={2.5} dot={{ r: 4 }} />
            </AreaChart>
          )}
        </ResponsiveContainer>
      </div>

      {/* Clinical Disclaimer */}
      <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-start space-x-2">
        <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <span>
          <strong>Clinical Note:</strong> Reference lines are standard general population physiological ranges and do not constitute individual medical interpretation. Consult your attending clinician for tailored diagnostic evaluation.
        </span>
      </div>
    </Card>
  );
}

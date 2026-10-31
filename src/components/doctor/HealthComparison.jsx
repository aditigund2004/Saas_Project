import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import {
  Heart,
  TrendingDown,
  TrendingUp,
  Calendar,
  Activity,
  Save,
  Clock,
  ShieldCheck,
  Stethoscope,
  Filter
} from 'lucide-react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import { DEMO_LONGITUDINAL_VITALS } from '../../demo-data/clinicalComparisonData';
import { useApp } from '../../context/AppContext';

export function HealthComparison({ patientId = 'pt-1041' }) {
  const { showToast } = useApp();
  const [selectedMetric, setSelectedMetric] = useState('bp'); // 'bp' | 'pulse' | 'weight' | 'sugar'
  const [doctorObservation, setDoctorObservation] = useState(
    'Patient demonstrates positive therapeutic response to Telmisartan 20mg and dietary sodium restriction. Systolic BP decreased by 14 mmHg over 5 months. Resting heart rate normalized to 72 bpm.'
  );

  const initialVitals = DEMO_LONGITUDINAL_VITALS[0];
  const currentVitals = DEMO_LONGITUDINAL_VITALS[DEMO_LONGITUDINAL_VITALS.length - 1];

  // Deltas
  const systolicDelta = currentVitals.bpSystolic - initialVitals.bpSystolic; // -14
  const pulseDelta = currentVitals.pulse - initialVitals.pulse; // -12
  const weightDelta = (currentVitals.weight - initialVitals.weight).toFixed(1); // -2.7

  const handleSaveObservation = () => {
    showToast('Longitudinal clinical observation recorded in patient file');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
          Longitudinal Clinical Analytics
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Patient Health Change Detector
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Compare multi-month clinical measurements across consultations to assess treatment efficacy and vital sign stability.
        </p>
      </div>

      {/* Delta Comparison Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Blood Pressure Delta */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Systolic BP Trend
            </span>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <TrendingDown className="w-3.5 h-3.5" /> {systolicDelta} mmHg
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900 dark:text-white">
              {currentVitals.bpSystolic}/{currentVitals.bpDiastolic}
            </span>
            <span className="text-xs text-slate-400 line-through">
              {initialVitals.bpSystolic}/{initialVitals.bpDiastolic}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 pt-1">
            Baseline (May 15) vs Current (Oct 27)
          </p>
        </div>

        {/* Resting Heart Rate Delta */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Resting Pulse Trend
            </span>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <TrendingDown className="w-3.5 h-3.5" /> {pulseDelta} bpm
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900 dark:text-white">
              {currentVitals.pulse} bpm
            </span>
            <span className="text-xs text-slate-400 line-through">
              {initialVitals.pulse} bpm
            </span>
          </div>
          <p className="text-[11px] text-slate-500 pt-1">
            Resting tachycardia resolved
          </p>
        </div>

        {/* Weight Delta */}
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Body Mass Trajectory
            </span>
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <TrendingDown className="w-3.5 h-3.5" /> {weightDelta} kg
            </span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-slate-900 dark:text-white">
              {currentVitals.weight} kg
            </span>
            <span className="text-xs text-slate-400 line-through">
              {initialVitals.weight} kg
            </span>
          </div>
          <p className="text-[11px] text-slate-500 pt-1">
            Gradual, sustainable lifestyle weight drop
          </p>
        </div>
      </div>

      {/* Recharts Longitudinal Chart */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
              Longitudinal Measurement Curves (May – Oct 2026)
            </h3>
            <p className="text-xs text-slate-500">
              Verified clinician measurements recorded during official consultations.
            </p>
          </div>

          <div className="flex items-center gap-1.5">
            {[
              { id: 'bp', label: 'Blood Pressure' },
              { id: 'pulse', label: 'Resting Pulse' },
              { id: 'weight', label: 'Body Weight' }
            ].map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setSelectedMetric(m.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedMetric === m.id
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </div>

        <div className="h-64 w-full pt-2">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={DEMO_LONGITUDINAL_VITALS}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-slate-200 dark:text-slate-800" />
              <XAxis dataKey="timestamp" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} domain={['dataMin - 10', 'dataMax + 10']} />
              <Tooltip
                contentStyle={{ borderRadius: 12, fontSize: 12, backgroundColor: '#0f172a', color: '#fff' }}
              />
              <Legend wrapperStyle={{ fontSize: 12 }} />

              {selectedMetric === 'bp' && (
                <>
                  <Line
                    type="monotone"
                    dataKey="bpSystolic"
                    name="Systolic BP (mmHg)"
                    stroke="#ef4444"
                    strokeWidth={2.5}
                    activeDot={{ r: 6 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="bpDiastolic"
                    name="Diastolic BP (mmHg)"
                    stroke="#3b82f6"
                    strokeWidth={2.5}
                  />
                </>
              )}

              {selectedMetric === 'pulse' && (
                <Line
                  type="monotone"
                  dataKey="pulse"
                  name="Resting Heart Rate (bpm)"
                  stroke="#10b981"
                  strokeWidth={2.5}
                  activeDot={{ r: 6 }}
                />
              )}

              {selectedMetric === 'weight' && (
                <Line
                  type="monotone"
                  dataKey="weight"
                  name="Weight (kg)"
                  stroke="#8b5cf6"
                  strokeWidth={2.5}
                  activeDot={{ r: 6 }}
                />
              )}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Doctor Longitudinal Clinical Observation Note */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
        <label className="block text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
          Attending Physician Longitudinal Assessment
        </label>
        <textarea
          rows={3}
          value={doctorObservation}
          onChange={(e) => setDoctorObservation(e.target.value)}
          placeholder="Document clinical interpretation of longitudinal changes..."
          className="w-full text-xs p-3.5 rounded-2xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-hidden"
        />

        <div className="flex justify-between items-center pt-2">
          <span className="text-[11px] text-slate-400">
            Recorded in patient's electronic medical record (EMR)
          </span>
          <Button variant="primary" size="sm" onClick={handleSaveObservation} className="font-bold">
            <Save className="w-3.5 h-3.5 mr-1" /> Save Longitudinal Observation
          </Button>
        </div>
      </div>

      {/* Safety Notice */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          <span className="font-bold text-slate-900 dark:text-white block">
            Clinical Data Visualization Notice
          </span>
          This screen plots authorized historical clinical encounters to facilitate physician longitudinal assessment. It does not automatically compute risk stratifications or suggest diagnoses.
        </div>
      </div>
    </div>
  );
}


import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import {
  Heart,
  Moon,
  BatteryCharging,
  Sparkles,
  Calendar,
  Plus,
  CheckCircle2,
  AlertCircle,
  TrendingUp,
  Smile,
  ShieldCheck
} from 'lucide-react';
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { useApp } from '../../context/AppContext';

export function RecoveryJournal() {
  const { showToast, isPatientFriendlyMode } = useApp();

  const [energyLevel, setEnergyLevel] = useState(8);
  const [sleepHours, setSleepHours] = useState(7.5);
  const [symptomSeverity, setSymptomSeverity] = useState('Minimal');
  const [journalNotes, setJournalNotes] = useState('');

  const [weeklyRecoveryData, setWeeklyRecoveryData] = useState([
    { day: 'Mon', energy: 6, sleep: 6.5, score: 62 },
    { day: 'Tue', dayLabel: 'Tue', energy: 7, sleep: 7.0, score: 70 },
    { day: 'Wed', dayLabel: 'Wed', energy: 7, sleep: 7.5, score: 75 },
    { day: 'Thu', dayLabel: 'Thu', energy: 8, sleep: 8.0, score: 82 },
    { day: 'Fri', dayLabel: 'Fri', energy: 7, sleep: 7.0, score: 78 },
    { day: 'Sat', dayLabel: 'Sat', energy: 9, sleep: 8.5, score: 90 },
    { day: 'Sun', dayLabel: 'Today', energy: 8, sleep: 7.5, score: 85 }
  ]);

  const [recentEntries, setRecentEntries] = useState([
    {
      date: 'Today, 08:30 AM',
      energy: 8,
      sleep: '7.5 hrs',
      symptoms: 'Minimal evening flutter. Feeling light after breakfast.',
      milestone: 'Walked 7,000 steps without exertional fatigue'
    },
    {
      date: 'Yesterday, 09:00 AM',
      energy: 9,
      sleep: '8.5 hrs',
      symptoms: 'Zero palpitations. Deep sleep recorded.',
      milestone: 'No headache or tension'
    },
    {
      date: '25-Oct-2026',
      energy: 7,
      sleep: '7.0 hrs',
      symptoms: 'Mild post-meal acidity resolved with warm water.',
      milestone: 'Consistent morning meditation routine'
    }
  ]);

  const handleSaveEntry = (e) => {
    e.preventDefault();
    const newEntry = {
      date: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      energy: energyLevel,
      sleep: `${sleepHours} hrs`,
      symptoms: journalNotes || 'Routine check-in logged',
      milestone: energyLevel >= 8 ? 'High vitality day' : 'Steady recovery maintained'
    };
    setRecentEntries([newEntry, ...recentEntries]);
    setJournalNotes('');
    showToast('Recovery log saved successfully!');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
          Daily Self-Reported Wellness Log
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Patient Recovery Journal
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Monitor your day-to-day vitality, sleep duration, and post-consultation recovery trajectory.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Logging Form */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
            Log Today's Recovery Vitals
          </h3>

          <form onSubmit={handleSaveEntry} className="space-y-4 text-xs">
            {/* Energy Slider */}
            <div>
              <div className="flex justify-between font-bold mb-1">
                <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <BatteryCharging className="w-4 h-4 text-emerald-500" /> Self-Reported Vitality & Energy
                </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-extrabold text-sm">
                  {energyLevel} / 10
                </span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={energyLevel}
                onChange={(e) => setEnergyLevel(Number(e.target.value))}
                className="w-full accent-emerald-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>1 - Exhausted</span>
                <span>5 - Moderate</span>
                <span>10 - Peak Vitality</span>
              </div>
            </div>

            {/* Sleep Slider */}
            <div>
              <div className="flex justify-between font-bold mb-1">
                <span className="text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                  <Moon className="w-4 h-4 text-indigo-500" /> Sleep Duration Last Night
                </span>
                <span className="text-indigo-600 dark:text-indigo-400 font-extrabold text-sm">
                  {sleepHours} Hours
                </span>
              </div>
              <input
                type="range"
                min="4"
                max="12"
                step="0.5"
                value={sleepHours}
                onChange={(e) => setSleepHours(Number(e.target.value))}
                className="w-full accent-indigo-500 cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-400">
                <span>4h - Poor Sleep</span>
                <span>7.5h - Optimal</span>
                <span>12h - Extended</span>
              </div>
            </div>

            {/* Symptom Severity */}
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Symptom Intensity Today
              </label>
              <select
                value={symptomSeverity}
                onChange={(e) => setSymptomSeverity(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white font-medium"
              >
                <option value="None">None (Completely symptom-free)</option>
                <option value="Minimal">Minimal (Subtle, does not bother me)</option>
                <option value="Moderate">Moderate (Noticeable discomfort)</option>
                <option value="Severe">Severe (Impacts daily routine)</option>
              </select>
            </div>

            {/* Notes */}
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Personal Notes & Observations
              </label>
              <textarea
                rows={3}
                value={journalNotes}
                onChange={(e) => setJournalNotes(e.target.value)}
                placeholder="e.g., Felt energetic during morning walk. Heart flutter was negligible..."
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <Button variant="primary" size="md" type="submit" className="w-full font-bold shadow-xs">
              <CheckCircle2 className="w-4 h-4 mr-1.5" /> Save Recovery Check-In
            </Button>
          </form>
        </div>

        {/* Right Weekly Recharts Analytics */}
        <div className="lg:col-span-7 space-y-5">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
                  Weekly Recovery Index Trajectory
                </h3>
                <p className="text-xs text-slate-500">
                  Calculated composite wellness score based on self-reported vitality and sleep consistency.
                </p>
              </div>
              <Badge variant="success" size="md">
                Upward Trend (+14%)
              </Badge>
            </div>

            <div className="h-56 w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyRecoveryData}>
                  <defs>
                    <linearGradient id="recoveryGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="day" tick={{ fontSize: 11 }} />
                  <YAxis domain={[40, 100]} tick={{ fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ borderRadius: 12, fontSize: 12, backgroundColor: '#0f172a', color: '#fff' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="#10b981"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#recoveryGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Recent Journal History */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <h4 className="font-extrabold text-slate-900 dark:text-white text-sm uppercase tracking-wider text-xs">
              Recent Recovery Log Entries ({recentEntries.length})
            </h4>

            <div className="space-y-2.5">
              {recentEntries.map((item, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-850 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900 dark:text-white">{item.date}</span>
                    <div className="flex items-center gap-2">
                      <Badge variant="primary" size="sm">
                        Energy: {item.energy}/10
                      </Badge>
                      <Badge variant="outline" size="sm">
                        Sleep: {item.sleep}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-xs">{item.symptoms}</p>
                  <div className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 pt-0.5">
                    <Sparkles className="w-3 h-3" /> {item.milestone}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Safety Notice */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          <span className="font-bold text-slate-900 dark:text-white block">
            Self-Reported Tracking Only
          </span>
          This Recovery Journal is for personal self-monitoring and doctor review during appointments. It does not automatically interpret symptoms, alert emergency services, or compute clinical diagnoses.
        </div>
      </div>
    </div>
  );
}


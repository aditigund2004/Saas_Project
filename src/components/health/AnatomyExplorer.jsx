import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import {
  Activity,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
  Layers,
  Sparkles,
  Stethoscope
} from 'lucide-react';

/**
 * Interactive Anatomy Explorer Component
 * Renders an interactive anatomical body map for both:
 * 1) Patient mode: select pain/symptom location, severity, duration
 * 2) Doctor mode: record examination findings and targeted observations
 */
export function AnatomyExplorer({
  mode = 'patient', // 'patient' | 'doctor'
  selectedRegion,
  onSelectRegion,
  annotations = {},
  onSaveAnnotation,
  readOnly = false
}) {
  const [internalSelected, setInternalSelected] = useState(selectedRegion || 'chest');
  const activeRegion = selectedRegion || internalSelected;

  const [symptomText, setSymptomText] = useState('');
  const [severity, setSeverity] = useState('Moderate');
  const [duration, setDuration] = useState('3-5 days');

  const regionConfigs = {
    head: {
      name: 'Head & Neck',
      subtext: 'Cranium, temples, sinuses, cervical spine',
      commonSymptoms: ['Tension Headache', 'Sinus Pressure', 'Migraine with Aura', 'Cervical Stiffness'],
      color: '#3b82f6'
    },
    chest: {
      name: 'Chest & Cardiovascular',
      subtext: 'Heart, sternum, pericardium, lungs',
      commonSymptoms: ['Palpitations / Flutter', 'Substernal Tightness', 'Exertional Breathlessness', 'Acid Reflux'],
      color: '#ef4444'
    },
    abdomen: {
      name: 'Abdomen & Gastrointestinal',
      subtext: 'Epigastrium, right upper quadrant, lower quadrant',
      commonSymptoms: ['Epigastric Bloating', 'Post-meal Cramping', 'Right Quadrant Discomfort', 'Nausea'],
      color: '#f59e0b'
    },
    back: {
      name: 'Spine & Lumbar Back',
      subtext: 'Thoracic, lumbar spine, sacroiliac',
      commonSymptoms: ['Lower Lumbar Ache', 'Radiating Sciatica', 'Muscle Spasm', 'Posture Strain'],
      color: '#8b5cf6'
    },
    arms: {
      name: 'Shoulders & Upper Limbs',
      subtext: 'Deltoid, rotator cuff, elbows, wrists',
      commonSymptoms: ['Shoulder Impingement', 'Lateral Epicondylitis', 'Wrist Joint Ache', 'Tingling in Fingers'],
      color: '#10b981'
    },
    legs: {
      name: 'Hips, Knees & Lower Limbs',
      subtext: 'Quadriceps, patella, calves, ankles',
      commonSymptoms: ['Patellar Tendon Soreness', 'Calf Cramp', 'Ankle Edema', 'Shin Splints'],
      color: '#06b6d4'
    }
  };

  const handleRegionClick = (regionKey) => {
    setInternalSelected(regionKey);
    if (onSelectRegion) {
      onSelectRegion(regionKey);
    }
  };

  const handleAddAnnotation = () => {
    if (!symptomText.trim()) return;
    if (onSaveAnnotation) {
      onSaveAnnotation(activeRegion, {
        region: activeRegion,
        regionName: regionConfigs[activeRegion]?.name,
        notes: symptomText,
        severity,
        duration,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      });
    }
    setSymptomText('');
  };

  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
              {mode === 'doctor' ? <Stethoscope className="w-4 h-4" /> : <Activity className="w-4 h-4" />}
            </div>
            <div>
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                {mode === 'doctor' ? 'Clinical Anatomical Examination Map' : 'Interactive Body Symptom Locator'}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {mode === 'doctor'
                  ? 'Target anatomical systems to document physical exam observations and palpations.'
                  : 'Click on the body map to highlight where you feel discomfort or symptoms.'}
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant={mode === 'doctor' ? 'primary' : 'success'} size="sm">
            {mode === 'doctor' ? 'Doctor Clinical View' : 'Patient Symptom Mode'}
          </Badge>
          <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
            Demonstration Aid
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 pt-5">
        {/* Interactive SVG Body Graphic (Left) */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950/50 p-6 rounded-2xl border border-slate-100 dark:border-slate-800/80 relative">
          <div className="text-[11px] font-semibold text-slate-400 mb-2 uppercase tracking-wider">
            Click any region to select
          </div>

          <svg
            viewBox="0 0 220 380"
            className="w-48 sm:w-56 h-auto drop-shadow-sm select-none"
            aria-label="Human anatomy outline"
          >
            <defs>
              <linearGradient id="body-base" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#e2e8f0" />
                <stop offset="100%" stopColor="#cbd5e1" />
              </linearGradient>
            </defs>

            {/* HEAD */}
            <g
              onClick={() => handleRegionClick('head')}
              className="cursor-pointer transition-transform hover:scale-105 origin-top"
            >
              <circle
                cx="110"
                cy="42"
                r="26"
                className={`transition-colors duration-200 ${
                  activeRegion === 'head'
                    ? 'fill-blue-500 stroke-blue-600 stroke-2'
                    : 'fill-slate-200 dark:fill-slate-700 hover:fill-blue-200 dark:hover:fill-blue-900/40'
                }`}
              />
              <text x="110" y="46" textAnchor="middle" className="text-[9px] font-bold fill-slate-700 dark:fill-slate-200 pointer-events-none">
                Head
              </text>
            </g>

            {/* NECK */}
            <rect x="104" y="68" width="12" height="14" rx="2" className="fill-slate-300 dark:fill-slate-600" />

            {/* CHEST */}
            <g
              onClick={() => handleRegionClick('chest')}
              className="cursor-pointer transition-transform hover:scale-102"
            >
              <path
                d="M 75 82 Q 110 75 145 82 L 140 140 Q 110 148 80 140 Z"
                className={`transition-colors duration-200 ${
                  activeRegion === 'chest'
                    ? 'fill-rose-500 stroke-rose-600 stroke-2'
                    : 'fill-slate-200 dark:fill-slate-700 hover:fill-rose-200 dark:hover:fill-rose-900/40'
                }`}
              />
              <text x="110" y="115" textAnchor="middle" className="text-[10px] font-bold fill-slate-700 dark:fill-slate-200 pointer-events-none">
                Chest
              </text>
            </g>

            {/* ABDOMEN */}
            <g
              onClick={() => handleRegionClick('abdomen')}
              className="cursor-pointer transition-transform hover:scale-102"
            >
              <path
                d="M 80 142 Q 110 148 140 142 L 136 195 Q 110 204 84 195 Z"
                className={`transition-colors duration-200 ${
                  activeRegion === 'abdomen'
                    ? 'fill-amber-500 stroke-amber-600 stroke-2'
                    : 'fill-slate-200 dark:fill-slate-700 hover:fill-amber-200 dark:hover:fill-amber-900/40'
                }`}
              />
              <text x="110" y="172" textAnchor="middle" className="text-[10px] font-bold fill-slate-700 dark:fill-slate-200 pointer-events-none">
                Abdomen
              </text>
            </g>

            {/* ARMS LEFT & RIGHT */}
            <g
              onClick={() => handleRegionClick('arms')}
              className="cursor-pointer transition-transform hover:scale-102"
            >
              {/* Left arm */}
              <path
                d="M 72 85 L 48 160 Q 42 175 44 195 L 56 193 L 64 150 L 76 96 Z"
                className={`transition-colors duration-200 ${
                  activeRegion === 'arms'
                    ? 'fill-emerald-500 stroke-emerald-600 stroke-2'
                    : 'fill-slate-200 dark:fill-slate-700 hover:fill-emerald-200 dark:hover:fill-emerald-900/40'
                }`}
              />
              {/* Right arm */}
              <path
                d="M 148 85 L 172 160 Q 178 175 176 195 L 164 193 L 156 150 L 144 96 Z"
                className={`transition-colors duration-200 ${
                  activeRegion === 'arms'
                    ? 'fill-emerald-500 stroke-emerald-600 stroke-2'
                    : 'fill-slate-200 dark:fill-slate-700 hover:fill-emerald-200 dark:hover:fill-emerald-900/40'
                }`}
              />
              <text x="44" y="130" textAnchor="middle" className="text-[8px] font-bold fill-slate-600 dark:fill-slate-300 pointer-events-none">
                Arm
              </text>
              <text x="176" y="130" textAnchor="middle" className="text-[8px] font-bold fill-slate-600 dark:fill-slate-300 pointer-events-none">
                Arm
              </text>
            </g>

            {/* BACK / SPINE BUTTON TOGGLE */}
            <g
              onClick={() => handleRegionClick('back')}
              className="cursor-pointer transition-transform hover:scale-105"
            >
              <rect
                x="88"
                y="200"
                width="44"
                height="18"
                rx="9"
                className={`transition-colors duration-200 ${
                  activeRegion === 'back'
                    ? 'fill-purple-600 stroke-purple-700 stroke-2'
                    : 'fill-slate-300 dark:fill-slate-700 hover:fill-purple-300'
                }`}
              />
              <text x="110" y="212" textAnchor="middle" className="text-[8px] font-extrabold fill-white pointer-events-none">
                Spine / Back
              </text>
            </g>

            {/* LEGS */}
            <g
              onClick={() => handleRegionClick('legs')}
              className="cursor-pointer transition-transform hover:scale-102"
            >
              {/* Left leg */}
              <path
                d="M 85 220 L 80 300 Q 78 330 76 360 L 92 360 L 102 300 L 105 222 Z"
                className={`transition-colors duration-200 ${
                  activeRegion === 'legs'
                    ? 'fill-cyan-500 stroke-cyan-600 stroke-2'
                    : 'fill-slate-200 dark:fill-slate-700 hover:fill-cyan-200 dark:hover:fill-cyan-900/40'
                }`}
              />
              {/* Right leg */}
              <path
                d="M 135 220 L 140 300 Q 142 330 144 360 L 128 360 L 118 300 L 115 222 Z"
                className={`transition-colors duration-200 ${
                  activeRegion === 'legs'
                    ? 'fill-cyan-500 stroke-cyan-600 stroke-2'
                    : 'fill-slate-200 dark:fill-slate-700 hover:fill-cyan-200 dark:hover:fill-cyan-900/40'
                }`}
              />
              <text x="90" y="280" textAnchor="middle" className="text-[9px] font-bold fill-slate-700 dark:fill-slate-200 pointer-events-none">
                Leg
              </text>
              <text x="130" y="280" textAnchor="middle" className="text-[9px] font-bold fill-slate-700 dark:fill-slate-200 pointer-events-none">
                Leg
              </text>
            </g>
          </svg>

          {/* Quick pills */}
          <div className="flex flex-wrap gap-1.5 justify-center mt-4">
            {Object.keys(regionConfigs).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => handleRegionClick(key)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all cursor-pointer ${
                  activeRegion === key
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-blue-300'
                }`}
              >
                {regionConfigs[key].name.split('&')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Region Detail & Symptom Input (Right) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-4 rounded-xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  Active Region
                </span>
                <h4 className="text-lg font-extrabold text-slate-900 dark:text-white">
                  {regionConfigs[activeRegion]?.name}
                </h4>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                  {regionConfigs[activeRegion]?.subtext}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full flex items-center justify-center font-black text-white" style={{ backgroundColor: regionConfigs[activeRegion]?.color }}>
                {activeRegion[0].toUpperCase()}
              </div>
            </div>

            {/* Quick symptom presets */}
            <div className="mt-3">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                Suggested common descriptions:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {regionConfigs[activeRegion]?.commonSymptoms.map((sym, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSymptomText(sym)}
                    className="text-xs px-2.5 py-1 rounded-md bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:border-blue-400 cursor-pointer"
                  >
                    + {sym}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {!readOnly && (
            <div className="space-y-3 p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                {mode === 'doctor' ? 'Clinical Examination Findings / Palpation Notes' : 'Describe What You Are Feeling Here'}
              </label>
              <textarea
                rows={3}
                value={symptomText}
                onChange={(e) => setSymptomText(e.target.value)}
                placeholder={
                  mode === 'doctor'
                    ? 'e.g., S1/S2 heard normal, no murmurs. Mild epigastric tenderness on deep palpation.'
                    : 'e.g., Mild tightness in the evening after brisk walking. Lasts for 15-20 minutes.'
                }
                className="w-full text-xs p-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 outline-hidden"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                    Intensity / Severity
                  </label>
                  <select
                    value={severity}
                    onChange={(e) => setSeverity(e.target.value)}
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="Mild (Noticeable but does not disrupt activity)">Mild (Grade 1)</option>
                    <option value="Moderate (Interferes with focus or sleep)">Moderate (Grade 2)</option>
                    <option value="Severe (Persistent or acute pain)">Severe (Grade 3)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-slate-600 dark:text-slate-400 mb-1">
                    Duration
                  </label>
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full text-xs p-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="Just started today">Just started today</option>
                    <option value="2-3 days">2-3 days</option>
                    <option value="1-2 weeks">1-2 weeks</option>
                    <option value="Over a month (Chronic)">Over a month (Chronic)</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <Button
                  variant="primary"
                  size="sm"
                  onClick={handleAddAnnotation}
                  disabled={!symptomText.trim()}
                  className="font-bold shadow-xs"
                >
                  Save to {mode === 'doctor' ? 'Clinical Note' : 'Visit Brief'}
                </Button>
              </div>
            </div>
          )}

          {/* Existing Saved Annotations for this session */}
          {annotations && Object.keys(annotations).length > 0 && (
            <div className="space-y-2 pt-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Recorded Anatomical Observations ({Object.keys(annotations).length})
              </span>
              <div className="space-y-2 max-h-40 overflow-y-auto pr-1">
                {Object.entries(annotations).map(([regKey, item]) => (
                  <div
                    key={regKey}
                    className="p-2.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 flex items-start justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-blue-500" />
                        {item.regionName || regKey}
                        <span className="text-[10px] text-slate-400 font-normal">({item.severity})</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 text-[11px] mt-0.5">{item.notes}</p>
                    </div>
                    <Badge variant="neutral" size="sm">
                      {item.duration}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


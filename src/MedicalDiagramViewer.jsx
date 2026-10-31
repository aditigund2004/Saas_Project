import React from 'react'
import {
  Activity, AlertTriangle, ArrowRight, CheckCircle2, ChevronRight, Droplets,
  Heart, HeartPulse, Info, Shield, ShieldCheck, Sparkles, Stethoscope, Thermometer,
} from 'lucide-react'

export function MedicalDiagramViewer({ diagramType, title }) {
  switch (diagramType) {
    case 'glycemic_pathway':
      return (
        <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50/60 to-indigo-50/40 p-5 sm:p-6 my-6">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-blue-100/80">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600 text-white">
                <Activity size={15} />
              </span>
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Clinical Pathway: Blood Glucose & Insulin Dynamics
              </h4>
            </div>
            <span className="text-[10px] font-semibold text-blue-700 bg-blue-100/70 px-2.5 py-0.5 rounded-full">
              Endocrine Mechanism
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-center">
            <div className="bg-white rounded-xl p-4 border border-blue-100 shadow-sm">
              <div className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 mb-1">Normal Range</div>
              <div className="text-lg font-extrabold text-slate-800">70 – 99 mg/dL</div>
              <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">
                Pancreatic beta cells produce pulsatile insulin. Glucose enters myocytes & hepatocytes efficiently for energy.
              </p>
            </div>

            <div className="bg-white rounded-xl p-4 border border-amber-200 shadow-sm relative">
              <div className="text-[10px] font-bold uppercase tracking-wider text-amber-600 mb-1">Prediabetes</div>
              <div className="text-lg font-extrabold text-amber-700">100 – 125 mg/dL</div>
              <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">
                Peripheral insulin resistance begins. Pancreas compensates with hyperinsulinemia; high risk of progression.
              </p>
            </div>

            <div className="bg-white rounded-xl p-4 border border-rose-200 shadow-sm">
              <div className="text-[10px] font-bold uppercase tracking-wider text-rose-600 mb-1">Diabetes Mellitus</div>
              <div className="text-lg font-extrabold text-rose-700">≥ 126 mg/dL (Fasting)</div>
              <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed">
                Beta-cell decompensation. Chronic hyperglycemia produces microvascular damage and glycation of tissue proteins.
              </p>
            </div>
          </div>
        </div>
      )

    case 'blood_pressure_spectrum':
      return (
        <div className="rounded-2xl border border-blue-100 bg-gradient-to-br from-slate-50 to-blue-50/30 p-5 sm:p-6 my-6">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-slate-200/80">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-500 text-white">
                <HeartPulse size={15} />
              </span>
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                AHA/ACC Blood Pressure Classification Spectrum
              </h4>
            </div>
            <span className="text-[10px] font-semibold text-slate-600 bg-slate-200/70 px-2.5 py-0.5 rounded-full">
              Hemodynamic Stages
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900">
              <div className="font-bold flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" /> Normal BP
              </div>
              <div className="font-mono font-bold text-emerald-800">&lt; 120 / &lt; 80 mmHg</div>
              <div className="text-[11px] text-emerald-700 hidden sm:block">Minimal cardiovascular risk</div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900">
              <div className="font-bold flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500" /> Elevated BP
              </div>
              <div className="font-mono font-bold text-amber-800">120–129 / &lt; 80 mmHg</div>
              <div className="text-[11px] text-amber-700 hidden sm:block">Lifestyle modifications indicated</div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-orange-50 border border-orange-200 text-orange-900">
              <div className="font-bold flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-orange-500" /> Stage 1 Hypertension
              </div>
              <div className="font-mono font-bold text-orange-800">130–139 / 80–89 mmHg</div>
              <div className="text-[11px] text-orange-700 hidden sm:block">Clinical ASCVD risk assessment + Rx</div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-900">
              <div className="font-bold flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500" /> Stage 2 Hypertension
              </div>
              <div className="font-mono font-bold text-rose-800">≥ 140 / ≥ 90 mmHg</div>
              <div className="text-[11px] text-rose-700 hidden sm:block">Dual agent pharmacotherapy indicated</div>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-rose-600 text-white font-medium shadow-sm">
              <div className="font-bold flex items-center gap-2">
                <AlertTriangle size={14} className="text-amber-300" /> Hypertensive Crisis
              </div>
              <div className="font-mono font-bold">&gt; 180 and/or &gt; 120 mmHg</div>
              <div className="text-[11px] text-rose-100 hidden sm:block">Immediate emergency medical care required</div>
            </div>
          </div>
        </div>
      )

    case 'coronary_stenosis':
      return (
        <div className="rounded-2xl border border-red-100 bg-gradient-to-br from-red-50/50 to-orange-50/40 p-5 sm:p-6 my-6">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-red-100">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-red-600 text-white">
                <Heart size={15} />
              </span>
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Coronary Atherosclerosis Progression & Ischemic Thresholds
              </h4>
            </div>
            <span className="text-[10px] font-semibold text-red-700 bg-red-100/70 px-2.5 py-0.5 rounded-full">
              Cardiovascular Pathology
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-center">
            <div className="bg-white rounded-xl p-3.5 border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Phase 1</span>
              <div className="text-xs font-bold text-slate-800 mt-1">Normal Intima</div>
              <p className="text-[10px] text-slate-500 mt-1">Healthy endothelial lining with laminar blood flow.</p>
            </div>
            <div className="bg-white rounded-xl p-3.5 border border-amber-200">
              <span className="text-[10px] font-bold text-amber-600 uppercase">Phase 2</span>
              <div className="text-xs font-bold text-slate-800 mt-1">Fatty Streak</div>
              <p className="text-[10px] text-slate-500 mt-1">Subendothelial oxidized LDL-C accumulation & foam cells.</p>
            </div>
            <div className="bg-white rounded-xl p-3.5 border border-orange-200">
              <span className="text-[10px] font-bold text-orange-600 uppercase">Phase 3 (&gt;70% Stenosis)</span>
              <div className="text-xs font-bold text-slate-800 mt-1">Stable Angina</div>
              <p className="text-[10px] text-slate-500 mt-1">Flow limitation under exertion; myocardial oxygen deficit.</p>
            </div>
            <div className="bg-white rounded-xl p-3.5 border border-red-300 bg-red-50/30">
              <span className="text-[10px] font-bold text-red-600 uppercase">Phase 4 (Rupture)</span>
              <div className="text-xs font-bold text-red-700 mt-1">Myocardial Infarction</div>
              <p className="text-[10px] text-slate-500 mt-1">Plaque rupture triggers acute thrombotic occlusion.</p>
            </div>
          </div>
        </div>
      )

    case 'airway_bronchospasm':
      return (
        <div className="rounded-2xl border border-cyan-100 bg-gradient-to-br from-cyan-50/40 to-blue-50/40 p-5 sm:p-6 my-6">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-cyan-100">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-cyan-600 text-white">
                <Activity size={15} />
              </span>
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                Bronchial Cross-Section: Normal vs Asthmatic Airway
              </h4>
            </div>
            <span className="text-[10px] font-semibold text-cyan-700 bg-cyan-100/70 px-2.5 py-0.5 rounded-full">
              Pulmonary Mechanics
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-4 border border-emerald-200">
              <div className="flex items-center gap-2 mb-2">
                <span className="h-3 w-3 rounded-full bg-emerald-500" />
                <h5 className="font-bold text-xs text-slate-800">Healthy Bronchial Tube</h5>
              </div>
              <ul className="text-[11px] text-slate-600 space-y-1.5 list-disc pl-4">
                <li>Relaxed bronchial smooth muscle ring around airway.</li>
                <li>Normal thin mucosal lining with clear, open lumen.</li>
                <li>Unrestricted expiratory airflow with normal FEV1/FVC ratio.</li>
              </ul>
            </div>

            <div className="bg-white rounded-xl p-4 border border-rose-200">
              <div className="flex items-center gap-2 mb-2">
                <span className="h-3 w-3 rounded-full bg-rose-500" />
                <h5 className="font-bold text-xs text-slate-800">Asthmatic Attack Airway</h5>
              </div>
              <ul className="text-[11px] text-slate-600 space-y-1.5 list-disc pl-4">
                <li>Contracted, hyperresponsive smooth muscle constriction.</li>
                <li>Thickened, edematous inflammatory mucosa.</li>
                <li>Tenacious mucus plugging leading to audible expiratory wheeze.</li>
              </ul>
            </div>
          </div>
        </div>
      )

    case 'migraine_phases':
      return (
        <div className="rounded-2xl border border-purple-100 bg-gradient-to-br from-purple-50/50 to-indigo-50/40 p-5 sm:p-6 my-6">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-purple-100">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-purple-600 text-white">
                <Sparkles size={15} />
              </span>
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                The 4 Distinct Chronological Phases of a Migraine Attack
              </h4>
            </div>
            <span className="text-[10px] font-semibold text-purple-700 bg-purple-100/70 px-2.5 py-0.5 rounded-full">
              Neurovascular Timeline
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-center">
            <div className="bg-white rounded-xl p-3.5 border border-purple-100 shadow-sm">
              <span className="text-[10px] font-bold text-purple-600 uppercase">Phase 1: Prodrome</span>
              <div className="text-xs font-bold text-slate-800 mt-1">24–48 Hours Prior</div>
              <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                Hypothalamic activation: frequent yawning, neck stiffness, food cravings, mood lability.
              </p>
            </div>

            <div className="bg-white rounded-xl p-3.5 border border-purple-200 shadow-sm">
              <span className="text-[10px] font-bold text-purple-700 uppercase">Phase 2: Aura</span>
              <div className="text-xs font-bold text-slate-800 mt-1">5–60 Minutes Prior</div>
              <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                Cortical spreading depression: scintillating scotoma (zigzag lights), visual field defects, sensory tingling.
              </p>
            </div>

            <div className="bg-white rounded-xl p-3.5 border border-rose-200 shadow-sm">
              <span className="text-[10px] font-bold text-rose-600 uppercase">Phase 3: Attack</span>
              <div className="text-xs font-bold text-slate-800 mt-1">4–72 Hours Duration</div>
              <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                Trigeminovascular activation: severe unilateral throbbing pain, photophobia, phonophobia, nausea.
              </p>
            </div>

            <div className="bg-white rounded-xl p-3.5 border border-indigo-100 shadow-sm">
              <span className="text-[10px] font-bold text-indigo-600 uppercase">Phase 4: Postdrome</span>
              <div className="text-xs font-bold text-slate-800 mt-1">24–48 Hours After</div>
              <p className="text-[11px] text-slate-500 mt-1 leading-snug">
                "Migraine Hangover": mental exhaustion, cognitive sluggishness, scalp tenderness.
              </p>
            </div>
          </div>
        </div>
      )

    case 'gfr_stages':
      return (
        <div className="rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50/40 to-teal-50/40 p-5 sm:p-6 my-6">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-emerald-100">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-teal-600 text-white">
                <Activity size={15} />
              </span>
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                KDIGO Chronic Kidney Disease Staging (eGFR mL/min/1.73m²)
              </h4>
            </div>
            <span className="text-[10px] font-semibold text-teal-700 bg-teal-100/70 px-2.5 py-0.5 rounded-full">
              Renal Filtration Index
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 text-center text-xs">
            <div className="bg-white rounded-xl p-3 border border-emerald-200">
              <div className="font-bold text-emerald-700">Stage 1</div>
              <div className="font-mono text-xs font-semibold text-slate-800 mt-0.5">eGFR ≥ 90</div>
              <p className="text-[10px] text-slate-500 mt-1">Normal or high with kidney damage marker.</p>
            </div>
            <div className="bg-white rounded-xl p-3 border border-emerald-100">
              <div className="font-bold text-emerald-600">Stage 2</div>
              <div className="font-mono text-xs font-semibold text-slate-800 mt-0.5">eGFR 60–89</div>
              <p className="text-[10px] text-slate-500 mt-1">Mild reduction; prevent progression.</p>
            </div>
            <div className="bg-white rounded-xl p-3 border border-amber-200">
              <div className="font-bold text-amber-700">Stage 3</div>
              <div className="font-mono text-xs font-semibold text-slate-800 mt-0.5">eGFR 30–59</div>
              <p className="text-[10px] text-slate-500 mt-1">Moderate reduction; complications emerge.</p>
            </div>
            <div className="bg-white rounded-xl p-3 border border-orange-200">
              <div className="font-bold text-orange-700">Stage 4</div>
              <div className="font-mono text-xs font-semibold text-slate-800 mt-0.5">eGFR 15–29</div>
              <p className="text-[10px] text-slate-500 mt-1">Severe loss; prepare for dialysis/transplant.</p>
            </div>
            <div className="bg-white rounded-xl p-3 border border-rose-300 bg-rose-50/50">
              <div className="font-bold text-rose-700">Stage 5</div>
              <div className="font-mono text-xs font-semibold text-slate-800 mt-0.5">eGFR &lt; 15</div>
              <p className="text-[10px] text-slate-500 mt-1">Kidney failure (ESRD); renal replacement.</p>
            </div>
          </div>
        </div>
      )

    default:
      return (
        <div className="rounded-xl border border-blue-100 bg-blue-50/40 p-4 my-5 flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-600 text-white shrink-0">
            <Stethoscope size={18} />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-800">Medically Reviewed Clinical Profile</div>
            <div className="text-[11px] text-slate-500">
              Educational reference based on standard international medical practice and clinical evidence.
            </div>
          </div>
        </div>
      )
  }
}


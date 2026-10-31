import React, { useState } from 'react';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import {
  Cpu,
  RotateCcw,
  TrendingDown,
  AlertTriangle,
  CheckCircle2,
  Users,
  Building2,
  Clock,
  Layers,
  Activity,
  Sliders,
  ShieldCheck
} from 'lucide-react';
import {
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';
import {
  INITIAL_CLINIC_BASELINES,
  SIMULATION_SCENARIOS,
  calculateSimulationOutcome
} from '../../demo-data/clinicSimulationData';
import { useApp } from '../../context/AppContext';

export function ClinicDigitalTwin() {
  const { showToast } = useApp();

  const [selectedClinicKey, setSelectedClinicKey] = useState('clinic-citycare');
  const baseline = INITIAL_CLINIC_BASELINES[selectedClinicKey];

  const [selectedScenarioId, setSelectedScenarioId] = useState(SIMULATION_SCENARIOS[0].id);

  // Simulation custom editable parameter adjustments
  const [doctorDelta, setDoctorDelta] = useState(SIMULATION_SCENARIOS[0].doctorDelta);
  const [patientDelta, setPatientDelta] = useState(SIMULATION_SCENARIOS[0].patientDelta);
  const [durationDeltaMins, setDurationDeltaMins] = useState(SIMULATION_SCENARIOS[0].durationDeltaMins);
  const [roomDelta, setRoomDelta] = useState(SIMULATION_SCENARIOS[0].roomDelta);
  const [demandMultiplier, setDemandMultiplier] = useState(SIMULATION_SCENARIOS[0].demandMultiplier);

  const [simulationRan, setSimulationRan] = useState(true);

  const handleSelectScenario = (sc) => {
    setSelectedScenarioId(sc.id);
    setDoctorDelta(sc.doctorDelta);
    setPatientDelta(sc.patientDelta);
    setDurationDeltaMins(sc.durationDeltaMins);
    setRoomDelta(sc.roomDelta);
    setDemandMultiplier(sc.demandMultiplier);
    setSimulationRan(true);
    showToast(`Loaded scenario: "${sc.name}"`);
  };

  const handleReset = () => {
    setDoctorDelta(0);
    setPatientDelta(0);
    setDurationDeltaMins(0);
    setRoomDelta(0);
    setDemandMultiplier(1.0);
    setSelectedScenarioId('');
    setSimulationRan(true);
    showToast('Digital twin reset to normal operating baseline');
  };

  const outcome = calculateSimulationOutcome(baseline, {
    doctorDelta,
    patientDelta,
    durationDeltaMins,
    roomDelta,
    demandMultiplier
  });

  // Recharts comparison data
  const comparisonData = [
    {
      metric: 'Wait Time (Mins)',
      Baseline: baseline.baselineQueueWaitMins,
      Simulated: outcome.estimatedWaitMins
    },
    {
      metric: 'Doctor Util (%)',
      Baseline: baseline.baselineDoctorUtilizationPercent,
      Simulated: outcome.doctorUtilization
    },
    {
      metric: 'Room Util (%)',
      Baseline: baseline.baselineRoomOccupancyPercent,
      Simulated: outcome.roomOccupancy
    },
    {
      metric: 'Daily Throughput',
      Baseline: baseline.baselineDailyCompleted,
      Simulated: outcome.completedPatients
    }
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-indigo-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-blue-500/20 relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30 text-xs font-bold mb-2">
              <Cpu className="w-3.5 h-3.5 text-blue-400" />
              SaaS Operational Modeling Engine
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
              Clinic Digital Twin: What-If Simulation Lab
            </h1>
            <p className="text-xs sm:text-sm text-blue-100 max-w-2xl mt-1">
              Stress-test hypothetical clinic disruptions (physician absences, patient walk-in surges, chamber closures) to anticipate bottlenecks and evaluate queue resilience.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-center">
            <Button
              variant="outline"
              size="sm"
              onClick={handleReset}
              className="bg-white/10 hover:bg-white/20 text-white border-white/20 text-xs font-bold"
            >
              <RotateCcw className="w-3.5 h-3.5 mr-1" /> Reset Baseline
            </Button>
          </div>
        </div>
      </div>

      {/* Target Clinic Selector */}
      <div className="flex flex-wrap gap-2 items-center">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mr-1">
          Select Target Facility:
        </span>
        {Object.entries(INITIAL_CLINIC_BASELINES).map(([k, c]) => (
          <button
            key={k}
            type="button"
            onClick={() => {
              setSelectedClinicKey(k);
              showToast(`Simulation switched to ${c.name}`);
            }}
            className={`px-4 py-2 rounded-2xl text-xs font-bold transition-all border cursor-pointer ${
              selectedClinicKey === k
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-blue-300'
            }`}
          >
            {c.name}
          </button>
        ))}
      </div>

      {/* Presets Scenario Strip */}
      <div className="space-y-2">
        <span className="text-xs font-extrabold uppercase tracking-wider text-slate-400 block">
          One-Click Stress Scenarios
        </span>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
          {SIMULATION_SCENARIOS.map((sc) => (
            <button
              key={sc.id}
              type="button"
              onClick={() => handleSelectScenario(sc)}
              className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                selectedScenarioId === sc.id
                  ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-500 shadow-xs ring-2 ring-blue-400/20'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-blue-300'
              }`}
            >
              <div>
                <span className="font-extrabold text-xs text-slate-900 dark:text-white block leading-snug">
                  {sc.name}
                </span>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                  {sc.description}
                </p>
              </div>
              <span className="text-[10px] text-blue-600 dark:text-blue-400 font-bold mt-2 block">
                {selectedScenarioId === sc.id ? 'Active Scenario ✓' : 'Simulate →'}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Simulation Workbench (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Interactive Parametric Sliders */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-5">
          <div>
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
              Hypothetical Operational Parameters
            </h3>
            <p className="text-xs text-slate-500">
              Adjust variables to test elasticity of clinic resources.
            </p>
          </div>

          {/* Doctor Count Delta */}
          <div>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span className="text-slate-700 dark:text-slate-300">Active Consulting Doctors</span>
              <span className="text-blue-600 dark:text-blue-400">
                {outcome.effectiveDoctors} Doctors ({doctorDelta >= 0 ? `+${doctorDelta}` : doctorDelta})
              </span>
            </div>
            <input
              type="range"
              min="-2"
              max="4"
              value={doctorDelta}
              onChange={(e) => setDoctorDelta(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>-2 (Absence)</span>
              <span>Baseline ({baseline.activeDoctors})</span>
              <span>+4 (Locum Support)</span>
            </div>
          </div>

          {/* Patient Demand Multiplier / Delta */}
          <div>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span className="text-slate-700 dark:text-slate-300">Patient Volume / Walk-In Delta</span>
              <span className="text-blue-600 dark:text-blue-400">
                {outcome.totalPatients} Patients ({patientDelta >= 0 ? `+${patientDelta}` : patientDelta})
              </span>
            </div>
            <input
              type="range"
              min="-15"
              max="35"
              step="5"
              value={patientDelta}
              onChange={(e) => setPatientDelta(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>-15 (Quiet)</span>
              <span>Baseline ({baseline.dailyScheduledPatients})</span>
              <span>+35 (Surge)</span>
            </div>
          </div>

          {/* Consultation Duration Delta */}
          <div>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span className="text-slate-700 dark:text-slate-300">Average Consultation Duration</span>
              <span className="text-blue-600 dark:text-blue-400">
                {outcome.effectiveDuration} Mins ({durationDeltaMins >= 0 ? `+${durationDeltaMins}` : durationDeltaMins}m)
              </span>
            </div>
            <input
              type="range"
              min="-6"
              max="15"
              step="2"
              value={durationDeltaMins}
              onChange={(e) => setDurationDeltaMins(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>-6m (Quick Triage)</span>
              <span>Baseline ({baseline.avgConsultationMins}m)</span>
              <span>+15m (Complex)</span>
            </div>
          </div>

          {/* Consultation Chambers Online */}
          <div>
            <div className="flex justify-between text-xs font-bold mb-1">
              <span className="text-slate-700 dark:text-slate-300">Consultation Rooms Available</span>
              <span className="text-blue-600 dark:text-blue-400">
                {outcome.effectiveRooms} Rooms ({roomDelta >= 0 ? `+${roomDelta}` : roomDelta})
              </span>
            </div>
            <input
              type="range"
              min="-3"
              max="3"
              value={roomDelta}
              onChange={(e) => setRoomDelta(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>-3 (Renovations)</span>
              <span>Baseline ({baseline.consultationRooms})</span>
              <span>+3 (Expanded)</span>
            </div>
          </div>
        </div>

        {/* Right Column: Simulated Outcomes & Recharts Comparison */}
        <div className="lg:col-span-7 space-y-5">
          {/* Stress Index Header Card */}
          <div
            className={`p-5 rounded-3xl border-2 transition-all ${
              outcome.pressureScore > 85
                ? 'bg-rose-50/70 dark:bg-rose-950/40 border-rose-500 text-rose-950 dark:text-rose-100'
                : outcome.pressureScore > 70
                ? 'bg-amber-50/70 dark:bg-amber-950/40 border-amber-400 text-amber-950 dark:text-amber-100'
                : 'bg-emerald-50/70 dark:bg-emerald-950/40 border-emerald-400 text-emerald-950 dark:text-emerald-100'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-extrabold uppercase tracking-wider">
                Simulated Clinic Pressure Index
              </span>
              <Badge
                variant={outcome.pressureScore > 85 ? 'warning' : 'success'}
                size="md"
                className={outcome.pressureScore > 85 ? 'bg-rose-600 text-white' : ''}
              >
                {outcome.pressureCategory}
              </Badge>
            </div>
            <div className="text-3xl sm:text-4xl font-black">
              {outcome.pressureScore} / 100
            </div>
            <p className="text-xs font-medium mt-1">
              Estimated average queue wait will shift by{' '}
              <strong>{outcome.waitDeltaMins >= 0 ? `+${outcome.waitDeltaMins}` : outcome.waitDeltaMins} mins</strong>{' '}
              (Simulated wait: ~{outcome.estimatedWaitMins} mins vs baseline {baseline.baselineQueueWaitMins} mins).
            </p>
          </div>

          {/* Before & After Recharts Bar Comparison */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm space-y-3">
            <h4 className="font-extrabold text-slate-900 dark:text-white text-xs uppercase tracking-wider">
              Before vs After Simulation Comparison
            </h4>

            <div className="h-56 w-full pt-1">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={comparisonData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="currentColor" className="text-slate-200 dark:text-slate-800" />
                  <XAxis dataKey="metric" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip
                    contentStyle={{ borderRadius: 12, fontSize: 12, backgroundColor: '#0f172a', color: '#fff' }}
                  />
                  <Legend wrapperStyle={{ fontSize: 12 }} />
                  <Bar dataKey="Baseline" fill="#94a3b8" radius={[6, 6, 0, 0]} />
                  <Bar
                    dataKey="Simulated"
                    fill={outcome.pressureScore > 80 ? '#ef4444' : '#3b82f6'}
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Operational Impact Cards */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Doctor Utilization</span>
              <div className="text-xl font-black text-slate-900 dark:text-white mt-0.5">
                {outcome.doctorUtilization}%
              </div>
              <span className="text-[10px] text-slate-500">
                {outcome.utilizationDelta >= 0 ? `+${outcome.utilizationDelta}%` : `${outcome.utilizationDelta}%`} vs baseline
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xs">
              <span className="text-[10px] text-slate-400 uppercase font-bold block">Unserviced Overflow</span>
              <div className="text-xl font-black text-rose-500 mt-0.5">
                {outcome.unservicedOverflow} Patients
              </div>
              <span className="text-[10px] text-slate-500">
                {outcome.unservicedOverflow > 0 ? 'Requires slot deferrals' : 'Zero unserviced spillover'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Safety Notice */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          <span className="font-bold text-slate-900 dark:text-white block">
            Mathematical Queueing Approximation Engine
          </span>
          This Digital Twin simulator calculates deterministic outcomes using M/M/c queueing theory heuristics and synthetic operational baselines. It is designed for strategic executive capacity planning and does not represent an automated real-time facility controller.
        </div>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import {
  Sparkles,
  Clock,
  User,
  Activity,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  Info,
  TrendingUp,
  Sliders,
  RotateCcw
} from 'lucide-react';

/**
 * Reusable AI Dynamic Duration Badge & Card Component
 * Showcases AI-calculated appointment length based on Reason for Visit,
 * Patient Complexity, and Doctor's Historical Pace.
 */
export function AIDurationBadge({
  durationDetails,
  calculatedMinutes,
  onDurationChange,
  startTime = '',
  variant = 'card', // 'card' | 'badge' | 'compact'
  className = ''
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (!durationDetails) return null;

  const {
    baseMinutes,
    matchedReason,
    complexityMinutes,
    complexityAdjustments = [],
    complexityTier,
    doctorPaceProfile,
    doctorPaceMinutes,
    doctorPaceFactor,
    confidenceScore,
    timeSavedVsRigid
  } = durationDetails;

  const effectiveMinutes = calculatedMinutes || durationDetails.calculatedMinutes;
  const isManuallyAdjusted = calculatedMinutes && calculatedMinutes !== durationDetails.calculatedMinutes;

  // Format dynamic end time if startTime provided
  let timeSpanLabel = '';
  if (startTime) {
    const [timePart, modifier] = startTime.trim().split(' ');
    let [hours, minutes] = timePart.split(':').map(Number);
    if (modifier === 'PM' && hours < 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;

    const totalEndMinutes = hours * 60 + minutes + effectiveMinutes;
    let endHours = Math.floor(totalEndMinutes / 60) % 24;
    const endMinutes = totalEndMinutes % 60;
    const endModifier = endHours >= 12 ? 'PM' : 'AM';
    if (endHours > 12) endHours -= 12;
    if (endHours === 0) endHours = 12;

    const paddedEndM = endMinutes < 10 ? `0${endMinutes}` : endMinutes;
    const paddedEndH = endHours < 10 ? `0${endHours}` : endHours;
    timeSpanLabel = `${startTime} → ${paddedEndH}:${paddedEndM} ${endModifier}`;
  }

  // 1. Compact Pill Variant
  if (variant === 'compact') {
    return (
      <span
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 shadow-2xs ${className}`}
        title={`AI Dynamic Duration: ${effectiveMinutes} mins (${matchedReason?.label || 'General'})`}
      >
        <Sparkles className="w-3.5 h-3.5 text-indigo-500 animate-pulse" />
        <span className="font-mono font-bold">{effectiveMinutes}m</span>
        <span className="text-[10px] opacity-80">AI Slot</span>
      </span>
    );
  }

  // 2. Inline Badge Variant
  if (variant === 'badge') {
    return (
      <div className={`inline-flex items-center gap-2 p-2 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-indigo-200/80 dark:border-indigo-900/60 shadow-xs ${className}`}>
        <div className="w-7 h-7 rounded-xl bg-gradient-to-br from-indigo-500 to-blue-600 text-white flex items-center justify-center shadow-2xs">
          <Sparkles className="w-3.5 h-3.5" />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-slate-900 dark:text-slate-100 font-mono">
              {effectiveMinutes} Mins
            </span>
            <span className="text-[10px] font-semibold px-1.5 py-0.2 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
              AI Tailored
            </span>
          </div>
          {timeSpanLabel && (
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">
              {timeSpanLabel}
            </p>
          )}
        </div>
      </div>
    );
  }

  // 3. Full Featured Frosted Card Variant
  return (
    <div
      className={`relative overflow-hidden rounded-3xl p-4 sm:p-5 transition-all duration-300 bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl backdrop-saturate-150 border border-indigo-200/90 dark:border-indigo-900/60 shadow-lg shadow-indigo-500/5 ring-1 ring-inset ring-white/60 dark:ring-white/10 ${className}`}
    >
      {/* Ambient gradient top highlight */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 pointer-events-none" />

      {/* Main Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 text-white flex items-center justify-center shadow-md shadow-indigo-500/20 shrink-0">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                AI Dynamic Appointment Duration
              </h4>
              <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                {confidenceScore}% Optimal Fit
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Tailored session length replacing fixed 15/30m calendar blocks
            </p>
          </div>
        </div>

        {/* Duration Display & Quick Toggles */}
        <div className="flex items-center gap-2 self-end sm:self-center">
          <div className="px-3.5 py-1.5 rounded-2xl bg-blue-50/80 dark:bg-blue-950/60 border border-blue-200/80 dark:border-blue-900/60 text-right">
            <div className="flex items-baseline gap-1 justify-end">
              <span className="text-lg font-black text-blue-700 dark:text-blue-300 font-mono leading-none">
                {effectiveMinutes}
              </span>
              <span className="text-xs font-bold text-blue-600 dark:text-blue-400">mins</span>
            </div>
            {timeSpanLabel && (
              <span className="text-[10px] font-mono text-slate-500 dark:text-slate-400 block mt-0.5">
                {timeSpanLabel}
              </span>
            )}
          </div>

          {onDurationChange && (
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => onDurationChange(Math.max(10, effectiveMinutes - 5))}
                className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center justify-center transition-colors cursor-pointer"
                title="Decrease 5 minutes"
              >
                -5
              </button>
              <button
                type="button"
                onClick={() => onDurationChange(Math.min(60, effectiveMinutes + 5))}
                className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs flex items-center justify-center transition-colors cursor-pointer"
                title="Increase 5 minutes"
              >
                +5
              </button>
              {isManuallyAdjusted && (
                <button
                  type="button"
                  onClick={() => onDurationChange(durationDetails.calculatedMinutes)}
                  className="p-1 rounded-lg text-slate-400 hover:text-blue-600 dark:hover:text-blue-400"
                  title="Reset to AI calculated duration"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* 3-Pillar Breakdown Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 my-3 text-xs">
        {/* Pillar 1: Reason Baseline */}
        <div className="p-2.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
              <Clock className="w-3 h-3 text-blue-500" />
              1. Visit Reason
            </span>
            <span className="font-mono font-bold text-slate-700 dark:text-slate-300">{baseMinutes}m</span>
          </div>
          <p className="font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">
            {matchedReason?.label || 'General Consultation'}
          </p>
          <span className="text-[10px] text-slate-400 dark:text-slate-500">
            Baseline clinical requirement
          </span>
        </div>

        {/* Pillar 2: Patient Complexity */}
        <div className="p-2.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
              <User className="w-3 h-3 text-amber-500" />
              2. Complexity
            </span>
            <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
              +{complexityMinutes}m
            </span>
          </div>
          <p className="font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">
            {complexityTier} Complexity Tier
          </p>
          <span className="text-[10px] text-slate-400 dark:text-slate-500">
            {complexityAdjustments.length} dynamic patient factors
          </span>
        </div>

        {/* Pillar 3: Doctor Historical Pace */}
        <div className="p-2.5 rounded-2xl bg-slate-50/80 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-800">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
              <Activity className="w-3 h-3 text-purple-500" />
              3. Doctor Pace
            </span>
            <span className="font-mono font-bold text-purple-600 dark:text-purple-400">
              {doctorPaceFactor}x
            </span>
          </div>
          <p className="font-semibold text-slate-800 dark:text-slate-200 line-clamp-1">
            {doctorPaceProfile?.doctorName}
          </p>
          <span className="text-[10px] text-slate-400 dark:text-slate-500">
            {doctorPaceProfile?.paceCategory}
          </span>
        </div>
      </div>

      {/* Efficiency Insight Pill */}
      <div className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/50 text-xs">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
          <span className="text-indigo-950 dark:text-indigo-200 font-medium">
            {timeSavedVsRigid}
          </span>
        </div>

        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 flex items-center gap-0.5 shrink-0 cursor-pointer"
        >
          <span>{isExpanded ? 'Hide Factors' : 'View Factors'}</span>
          {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Expandable Clinical Details */}
      {isExpanded && (
        <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2 text-xs animate-fade-in">
          <h5 className="font-bold text-slate-800 dark:text-slate-200 text-[11px] uppercase tracking-wider">
            Clinical AI Reasoning & Factor Breakdown
          </h5>

          {complexityAdjustments.length > 0 ? (
            <div className="space-y-1.5">
              {complexityAdjustments.map((adj, i) => (
                <div
                  key={i}
                  className="flex items-start justify-between gap-2 p-2 rounded-lg bg-slate-50 dark:bg-slate-800/40 border border-slate-200/50 dark:border-slate-800"
                >
                  <div>
                    <span className="font-semibold text-slate-800 dark:text-slate-200 block">
                      {adj.factor}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      {adj.reason}
                    </span>
                  </div>
                  <span className="font-mono font-bold text-amber-600 dark:text-amber-400 shrink-0">
                    +{adj.adjustment}m
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-slate-500 dark:text-slate-400 text-xs">
              Standard uncomplicated baseline patient profile.
            </p>
          )}

          {/* Doctor Pace Details */}
          <div className="p-2 rounded-lg bg-purple-50/50 dark:bg-purple-950/30 border border-purple-100 dark:border-purple-900/40 text-[11px] text-slate-600 dark:text-slate-300">
            <strong>Historical Pace Metric:</strong> {doctorPaceProfile?.description}{' '}
            <span className="text-purple-700 dark:text-purple-300 font-semibold">
              (Derived from {doctorPaceProfile?.historicalConsults || 350} historical consultations · {doctorPaceProfile?.punctualityRate || '95%'} on-time rate)
            </span>
          </div>
        </div>
      )}
    </div>
  );
}


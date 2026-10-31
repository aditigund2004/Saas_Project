import React from 'react';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
  Pill,
  ShieldAlert,
  AlertTriangle,
  Info,
  Clock,
  Utensils,
  AlertCircle,
  HelpCircle,
  ShieldCheck,
  Package,
  Heart,
  X
} from 'lucide-react';
import { getMedicineInfo } from '../../demo-data/medicineData';

export function MedicineInfoModal({ isOpen, onClose, medicineName, prescribedDosage, doctorName }) {
  if (!isOpen || !medicineName) return null;

  const info = getMedicineInfo(medicineName);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400 flex items-center justify-center font-bold">
            <Pill className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100">
              Clinical Drug Information & Safety Monograph
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Verified clinical reference for patient understanding
            </p>
          </div>
        </div>
      }
      size="lg"
    >
      <div className="space-y-4 max-h-[75vh] overflow-y-auto pr-1 text-xs">
        {/* Medicine Main Header Card */}
        <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 space-y-2.5">
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-teal-700 dark:text-teal-400 bg-teal-100 dark:bg-teal-950/60 px-2.5 py-0.5 rounded-full border border-teal-200 dark:border-teal-900/60 font-mono">
                {info.drugClass}
              </span>
              <h2 className="text-lg font-black text-slate-900 dark:text-slate-100 mt-1">
                {info.name}
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-300 font-mono mt-0.5">
                Generic Composition: <strong className="text-slate-900 dark:text-slate-100">{info.genericName}</strong>
              </p>
            </div>
            {prescribedDosage && (
              <div className="sm:text-right shrink-0">
                <span className="text-[10px] uppercase font-bold text-slate-400 dark:text-slate-500 block">
                  Your Prescribed Dose
                </span>
                <span className="text-sm font-extrabold font-mono text-blue-600 dark:text-blue-400">
                  {prescribedDosage}
                </span>
                {doctorName && (
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                    Prescribed by {doctorName}
                  </span>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Clinical Dosage Protection Notice */}
        <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800/80 text-amber-900 dark:text-amber-200 flex items-start gap-2.5">
          <ShieldAlert className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <p className="font-bold">Prescribed Dosage is Protected for Medical Safety</p>
            <p className="text-[11px] text-amber-800 dark:text-amber-300 leading-relaxed">
              Your medication dose is calculated and legally authorized by your prescribing physician. Clinipulse strictly prevents automatic or unauthorized patient modifications to prescribed doses. If you feel your dose needs adjustment or are experiencing side effects, please contact your prescribing doctor.
            </p>
          </div>
        </div>

        {/* Clinical Purpose & Indication */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1.5">
          <div className="flex items-center gap-1.5 text-slate-900 dark:text-slate-100 font-bold">
            <Info className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>Therapeutic Purpose & What It Treats</span>
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            {info.purpose}
          </p>
        </div>

        {/* How to take & Dietary Instructions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
            <div className="flex items-center gap-1.5 text-slate-900 dark:text-slate-100 font-bold">
              <Clock className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span>How to Take</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {info.howToTake}
            </p>
          </div>

          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-1">
            <div className="flex items-center gap-1.5 text-slate-900 dark:text-slate-100 font-bold">
              <Utensils className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
              <span>Food & Beverage Advice</span>
            </div>
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
              {info.foodInstructions}
            </p>
          </div>
        </div>

        {/* Critical Missed Dose Protocol */}
        <div className="p-3.5 rounded-xl bg-blue-50/80 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-blue-950 dark:text-blue-200 space-y-1">
          <div className="flex items-center gap-1.5 font-bold">
            <AlertCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>What to Do if You Miss a Scheduled Dose</span>
          </div>
          <p className="text-[11px] text-blue-800 dark:text-blue-300 leading-relaxed">
            {info.missedDoseGuidance}
          </p>
        </div>

        {/* Side Effects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <span className="font-bold text-slate-900 dark:text-slate-100 block">
              Common, Mild Side Effects
            </span>
            <ul className="space-y-1.5 list-disc list-inside text-slate-600 dark:text-slate-300">
              {info.commonSideEffects.map((se, idx) => (
                <li key={idx} className="leading-relaxed">{se}</li>
              ))}
            </ul>
          </div>

          <div className="p-3.5 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50/40 dark:bg-rose-950/20 space-y-2">
            <span className="font-bold text-rose-900 dark:text-rose-200 block">
              ⚠️ Urgent Warnings / Discontinue If:
            </span>
            <ul className="space-y-1.5 list-disc list-inside text-rose-800 dark:text-rose-300">
              {info.seriousSideEffects.map((se, idx) => (
                <li key={idx} className="leading-relaxed">{se}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Key Warnings & Storage */}
        <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-850/40 space-y-2">
          <span className="font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-teal-600 dark:text-teal-400" />
            Prescription Safety & Storage Recommendations
          </span>
          <div className="space-y-1.5 text-slate-600 dark:text-slate-300">
            {info.warnings.map((w, idx) => (
              <p key={idx} className="flex items-start gap-1.5">
                <span className="text-teal-600 font-bold">•</span>
                <span>{w}</span>
              </p>
            ))}
            <div className="pt-2 border-t border-slate-200 dark:border-slate-800 flex items-center gap-2 text-slate-500 dark:text-slate-400">
              <Package className="w-3.5 h-3.5" />
              <span><strong>Storage:</strong> {info.storage}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <span className="text-[11px] text-slate-400 dark:text-slate-500">
          Source: Clinipulse Clinical Pharmacy Monograph Library
        </span>
        <Button variant="outline" size="sm" onClick={onClose}>
          Close Guide
        </Button>
      </div>
    </Modal>
  );
}


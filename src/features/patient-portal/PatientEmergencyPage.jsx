import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import {
  Phone,
  PhoneCall,
  ShieldAlert,
  AlertTriangle,
  HeartPulse,
  Building2,
  Printer,
  Activity
} from 'lucide-react';
import {
  NATIONAL_EMERGENCY_HELPLINES,
  RAPID_TRIAGE_PROTOCOLS
} from '../../demo-data/emergencyData';

export function PatientEmergencyPage() {
  const { currentUser, activeClinic, showToast } = useApp();
  const [selectedProtocol, setSelectedProtocol] = useState(null);
  const [sosTriggered, setSosTriggered] = useState(false);

  // Patient emergency data
  const emergencyMedical = {
    bloodGroup: 'B+',
    allergies: ['Penicillin / Amoxicillin', 'Sulfa drugs'],
    chronicConditions: ['Mild Hypertension (Stage 1)'],
    currentMedications: ['Telmisartan 40mg (Morning OD)'],
    organDonor: true,
    emergencyContact: {
      name: 'Sunita Patel',
      relationship: 'Spouse',
      phone: '+91 98765 43219'
    },
    primaryHospital: 'Lilavati Hospital & Research Centre, Bandra West'
  };

  const handleTriggerSOS = () => {
    setSosTriggered(true);
    showToast(
      `🚨 Emergency alert dispatched to ${activeClinic?.name} Emergency Desk & emergency contact (${emergencyMedical.emergencyContact.name}).`,
      'error'
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Alert */}
      <div className="p-5 rounded-3xl bg-linear-to-r from-red-600 via-rose-700 to-red-800 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-5 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-64 h-64 bg-white/5 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/20 text-white border border-white/30">
            <span className="w-2 h-2 rounded-full bg-amber-300 animate-ping" />
            <span>24/7 Rapid Medical Helpline & SOS Response</span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black tracking-tight">
            Emergency Medical Helplines & Rapid Triage
          </h1>

          <p className="text-xs sm:text-sm text-red-100 leading-relaxed">
            In severe life-threatening emergencies, do not wait for email or portal responses. Immediately call <strong>108 / 112</strong> or your clinic emergency direct line.
          </p>
        </div>

        {/* 1-Click Clinic SOS Dispatch Button */}
        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <a
            href="tel:108"
            className="px-5 py-3 rounded-2xl bg-white text-red-700 hover:bg-red-50 font-black text-sm shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap"
          >
            <PhoneCall className="w-4 h-4 animate-bounce text-red-600" />
            <span>Call 108 Ambulance</span>
          </a>

          <button
            onClick={handleTriggerSOS}
            className={`px-4 py-3 rounded-2xl border-2 font-black text-xs shadow-lg flex items-center justify-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              sosTriggered
                ? 'bg-emerald-600 text-white border-emerald-400'
                : 'bg-red-950/60 hover:bg-red-950 text-white border-white/40'
            }`}
          >
            <ShieldAlert className="w-4 h-4 text-amber-300" />
            <span>{sosTriggered ? '✓ SOS Alert Dispatched' : 'Alert Clinic Emergency Desk'}</span>
          </button>
        </div>
      </div>

      {/* Direct Clinic Emergency Contact Banner */}
      <Card className="p-5 border-amber-200 dark:border-[#263B59] bg-amber-50/70 dark:bg-[#172640] shadow-md">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-amber-500 text-white flex items-center justify-center shrink-0 shadow-md">
              <Building2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300 uppercase tracking-wider block">
                Primary Assigned Healthcare Facility
              </span>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-[#F1F5F9]">
                {activeClinic?.name} — 24/7 Emergency Counter
              </h2>
              <p className="text-xs text-slate-600 dark:text-[#CBD5E1] mt-0.5">
                📍 {activeClinic?.address}, {activeClinic?.city} · Operating Hours: {activeClinic?.operatingHours}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <a
              href={`tel:${activeClinic?.phone || '+919820011223'}`}
              className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shadow-md flex items-center gap-2"
            >
              <Phone className="w-4 h-4" />
              <span>Call Clinic Desk: {activeClinic?.phone || '+91 98200 11223'}</span>
            </a>
          </div>
        </div>
      </Card>

      {/* Grid: 24/7 National Emergency Helplines */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-extrabold text-slate-900 dark:text-[#F1F5F9] flex items-center gap-2">
            <Phone className="w-4 h-4 text-red-500" />
            <span>24/7 National Emergency Hotlines</span>
          </h2>
          <span className="text-xs text-slate-500 dark:text-[#94A3B8] font-semibold">Toll-Free Across All Telecom Operators</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {NATIONAL_EMERGENCY_HELPLINES.map((hl) => (
            <Card
              key={hl.id}
              className="p-5 border-slate-200 dark:border-[#263B59] bg-white dark:bg-[#111E33] flex flex-col justify-between hover:border-red-500 hover:shadow-md transition-all space-y-3"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-500 dark:text-[#94A3B8] uppercase tracking-wider">
                    {hl.category}
                  </span>
                  {hl.badge && (
                    <span className="px-2 py-0.5 rounded text-[9px] font-bold bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-300 border border-red-200 dark:border-red-800">
                      {hl.badge}
                    </span>
                  )}
                </div>

                <div className="text-2xl font-black font-mono text-red-600 dark:text-red-400 tracking-tight">
                  {hl.number}
                </div>

                <h3 className="text-xs font-bold text-slate-900 dark:text-[#F1F5F9]">
                  {hl.name}
                </h3>

                <p className="text-[11px] text-slate-600 dark:text-[#CBD5E1] leading-relaxed">
                  {hl.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-200 dark:border-[#263B59] flex items-center justify-between">
                <span className="text-[10px] text-slate-500 dark:text-[#94A3B8] font-medium">🕒 {hl.availableHours}</span>
                <a
                  href={`tel:${hl.number.replace(/\D/g, '')}`}
                  className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white font-bold text-xs flex items-center gap-1 shadow-2xs"
                >
                  <PhoneCall className="w-3 h-3" />
                  <span>Call Now</span>
                </a>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Two-Column: Rapid Triage Protocols & Digital SOS Medical Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Rapid First-Aid Triage Protocols */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-[#F1F5F9] flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-500 dark:text-blue-400" />
              <span>Rapid First-Aid Triage Protocols</span>
            </h2>
            <span className="text-xs text-slate-500 dark:text-[#94A3B8]">Click for immediate steps</span>
          </div>

          <div className="space-y-3">
            {RAPID_TRIAGE_PROTOCOLS.map((protocol) => (
              <Card
                key={protocol.id}
                onClick={() => setSelectedProtocol(protocol)}
                className="p-4 border-slate-200 dark:border-[#263B59] bg-white dark:bg-[#111E33] hover:border-blue-500 dark:hover:border-blue-400 transition-all cursor-pointer shadow-2xs space-y-2 group"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-red-50 dark:bg-red-950 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 flex items-center justify-center shrink-0">
                      <HeartPulse className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-[#F1F5F9] group-hover:text-blue-600 dark:group-hover:text-blue-300 transition-colors">
                        {protocol.title}
                      </h3>
                      <span className="text-[10px] font-bold text-red-600 dark:text-red-400 uppercase tracking-wide">
                        {protocol.urgency}
                      </span>
                    </div>
                  </div>

                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-slate-100 dark:bg-[#172640] text-slate-700 dark:text-[#CBD5E1] border border-slate-200 dark:border-[#263B59]">
                    Call: {protocol.helplineToCall}
                  </span>
                </div>

                <p className="text-xs text-slate-600 dark:text-[#CBD5E1] leading-relaxed">
                  {protocol.summary}
                </p>

                <div className="pt-1 flex items-center justify-between text-[11px] text-blue-600 dark:text-[#22D3EE] font-semibold">
                  <span>View Step-by-Step Action Protocol &rarr;</span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Right Column: Live SOS Digital Medical ID Dossier */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-extrabold text-slate-900 dark:text-[#F1F5F9] flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-500 dark:text-rose-400" />
              <span>Patient SOS Medical ID</span>
            </h2>
            <button
              onClick={() => window.print()}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" /> Print A4 SOS
            </button>
          </div>

          <Card className="p-6 border-slate-200 dark:border-[#263B59] bg-white dark:bg-[#111E33] text-slate-900 dark:text-[#F1F5F9] shadow-xl space-y-4 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-600/10 rounded-full blur-2xl pointer-events-none" />

            {/* Header */}
            <div className="flex items-center justify-between border-b border-slate-200 dark:border-[#263B59] pb-3">
              <div className="flex items-center gap-2">
                <span className="w-7 h-7 rounded-lg bg-red-600 text-white font-black text-xs flex items-center justify-center">
                  SOS
                </span>
                <div>
                  <span className="font-black text-xs tracking-wider block text-slate-900 dark:text-[#F1F5F9]">EMERGENCY MEDICAL CARD</span>
                  <span className="text-[10px] text-slate-500 dark:text-[#94A3B8] font-mono">Patient ID: PT-1041</span>
                </div>
              </div>
              <div className="px-2.5 py-1 rounded-lg bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 font-black text-sm font-mono">
                {emergencyMedical.bloodGroup}
              </div>
            </div>

            {/* Patient Name */}
            <div>
              <span className="text-[10px] font-bold uppercase text-slate-500 dark:text-[#94A3B8] tracking-wider block">Patient</span>
              <span className="text-base font-extrabold text-slate-900 dark:text-white block mt-0.5">{currentUser?.name || 'Aarav Patel'}</span>
              <span className="text-xs text-slate-600 dark:text-[#CBD5E1] font-mono">{currentUser?.phone || '+91 98765 43210'}</span>
            </div>

            {/* Emergency Contact */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0D1729] border border-slate-200 dark:border-[#263B59] space-y-1">
              <span className="text-[10px] font-bold text-red-600 dark:text-red-400 uppercase tracking-wider block">
                Primary Emergency Contact
              </span>
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900 dark:text-white text-xs">{emergencyMedical.emergencyContact.name}</span>
                <span className="text-[10px] text-slate-700 dark:text-[#CBD5E1] bg-slate-200 dark:bg-[#172640] border border-slate-300 dark:border-[#263B59] px-2 py-0.5 rounded">
                  {emergencyMedical.emergencyContact.relationship}
                </span>
              </div>
              <a
                href={`tel:${emergencyMedical.emergencyContact.phone}`}
                className="text-emerald-600 dark:text-emerald-400 font-mono font-bold text-xs hover:underline flex items-center gap-1 pt-1"
              >
                <Phone className="w-3 h-3" /> {emergencyMedical.emergencyContact.phone}
              </a>
            </div>

            {/* Severe Allergies Warning Box */}
            <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-200 text-xs space-y-1">
              <div className="flex items-center gap-1.5 text-rose-600 dark:text-rose-400 font-black uppercase text-[10px]">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600 dark:text-rose-400" />
                <span>Critical Drug Allergies</span>
              </div>
              <p className="font-semibold text-rose-900 dark:text-rose-100">
                {emergencyMedical.allergies.join(', ')} (Anaphylaxis Risk)
              </p>
            </div>

            {/* Conditions & Hospital */}
            <div className="space-y-1.5 text-[11px] text-slate-600 dark:text-[#CBD5E1] pt-1">
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-[#94A3B8]">Baseline Condition:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{emergencyMedical.chronicConditions[0]}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-[#94A3B8]">Active Medication:</span>
                <span className="font-semibold text-slate-900 dark:text-white">{emergencyMedical.currentMedications[0]}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 dark:text-[#94A3B8]">Preferred Hospital:</span>
                <span className="font-semibold text-slate-900 dark:text-white truncate max-w-[200px]">{emergencyMedical.primaryHospital}</span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* PROTOCOL STEP-BY-STEP MODAL */}
      {selectedProtocol && (
        <Modal
          isOpen={!!selectedProtocol}
          onClose={() => setSelectedProtocol(null)}
          title={`Emergency Action Protocol: ${selectedProtocol.title}`}
          size="md"
        >
          <div className="space-y-5 text-xs">
            <div className="p-3.5 rounded-2xl bg-red-50 dark:bg-red-950/70 border border-red-200 dark:border-red-800/80 flex items-center justify-between">
              <div>
                <span className="font-bold text-red-800 dark:text-red-200 block text-sm">
                  {selectedProtocol.urgency}
                </span>
                <p className="text-[11px] text-red-700 dark:text-red-300">
                  Follow these steps immediately while an ambulance is in transit.
                </p>
              </div>
              <a
                href={`tel:${selectedProtocol.helplineToCall.split(' ')[0]}`}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-black text-xs shadow-md flex items-center gap-1 shrink-0"
              >
                <PhoneCall className="w-3.5 h-3.5" /> Call {selectedProtocol.helplineToCall}
              </a>
            </div>

            <div className="space-y-2">
              <span className="font-bold text-slate-900 dark:text-[#F1F5F9] uppercase tracking-wider text-[11px] block">
                Immediate Action Steps
              </span>
              <div className="space-y-2">
                {selectedProtocol.immediateActions.map((step, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#172640] border border-slate-200 dark:border-[#263B59] flex items-start gap-3 shadow-xs"
                  >
                    <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-extrabold text-xs flex items-center justify-center shrink-0 shadow-sm mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-slate-800 dark:text-white font-medium leading-relaxed text-xs">
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 space-y-1.5">
              <span className="font-bold text-amber-800 dark:text-amber-300 uppercase tracking-wider text-[10px] flex items-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" /> WHAT NOT TO DO (Avoid Harm)
              </span>
              <ul className="space-y-1 pl-4 list-disc text-amber-900 dark:text-amber-200 text-[11px]">
                {selectedProtocol.doNotDo.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="pt-2 flex justify-end">
              <Button variant="secondary" size="sm" onClick={() => setSelectedProtocol(null)}>
                Close Protocol
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

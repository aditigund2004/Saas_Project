import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import {
  ShieldCheck,
  Lock,
  Eye,
  Clock,
  Download,
  AlertCircle,
  FileText,
  UserCheck,
  CheckCircle2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function DataTransparencyCenter() {
  const { showToast } = useApp();

  const [shareForResearch, setShareForResearch] = useState(false);
  const [pharmacyNetworkSync, setPharmacyNetworkSync] = useState(true);
  const [emergencyOverride, setEmergencyOverride] = useState(true);

  const demoAccessLogs = [
    {
      id: 'acc-1',
      actor: 'Dr. Aarav Mehta',
      role: 'Attending Physician',
      timestamp: 'Today, 10:28 AM',
      category: 'Consultation Briefing Access',
      reason: 'Reviewing Before My Visit Brief & Past Encounter Diagnoses'
    },
    {
      id: 'acc-2',
      actor: 'Priya Sharma',
      role: 'Reception Desk Cashier',
      timestamp: 'Today, 10:14 AM',
      category: 'Front Desk Check-in',
      reason: 'Verified active appointment status & confirmed insurance demographic details'
    },
    {
      id: 'acc-3',
      actor: 'Dr. Neha Verma',
      role: 'Pathologist',
      timestamp: '2026-10-20, 11:15 AM',
      category: 'Diagnostic Result Authorization',
      reason: 'Uploaded and digitally countersigned Lipid & Metabolic Panel reports'
    },
    {
      id: 'acc-4',
      actor: 'MedPlus Pharmacy API (Simulated)',
      role: 'Dispensing Partner',
      timestamp: '2026-10-15, 05:02 PM',
      category: 'Prescription QR Verification',
      reason: 'Verified tamper-evident cryptographic hash for Telmisartan prescription refill'
    }
  ];

  const handleExportAudit = () => {
    showToast('Downloaded synthetic access audit ledger (JSON format)');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div>
        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
          Privacy & Patient Data Governance
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Medical Data Transparency Center
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Inspect every staff access event, authorize pharmacy data sharing, and retain full sovereignty over your electronic health record.
        </p>
      </div>

      {/* Consent Controls Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-500" /> Pharmacy Network Sync
            </span>
            <input
              type="checkbox"
              checked={pharmacyNetworkSync}
              onChange={(e) => setPharmacyNetworkSync(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded cursor-pointer"
            />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Permits verified partner pharmacies to scan your digital prescription QR code for tamper-free dispensing.
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
              <Lock className="w-4 h-4 text-blue-500" /> Emergency ER Override
            </span>
            <input
              type="checkbox"
              checked={emergencyOverride}
              onChange={(e) => setEmergencyOverride(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded cursor-pointer"
            />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Allows licensed emergency triage physicians to access critical allergy and blood group data if you are unresponsive.
          </p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-slate-900 dark:text-white flex items-center gap-1.5">
              <Eye className="w-4 h-4 text-purple-500" /> Anonymized Research
            </span>
            <input
              type="checkbox"
              checked={shareForResearch}
              onChange={(e) => setShareForResearch(e.target.checked)}
              className="w-4 h-4 text-blue-600 rounded cursor-pointer"
            />
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Contributes de-identified, non-traceable health statistics to clinical epidemiology studies.
          </p>
        </div>
      </div>

      {/* Access History Log Table */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="font-extrabold text-slate-900 dark:text-white text-base">
              Authorized Record Access History
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Complete audit trail of clinic personnel who viewed or updated your medical record.
            </p>
          </div>

          <Button variant="outline" size="sm" onClick={handleExportAudit} className="font-bold text-xs">
            <Download className="w-3.5 h-3.5 mr-1" /> Export Access Ledger
          </Button>
        </div>

        <div className="space-y-3">
          {demoAccessLogs.map((log) => (
            <div
              key={log.id}
              className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-850 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-0.5">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-slate-900 dark:text-white">{log.actor}</span>
                  <Badge variant="primary" size="sm">
                    {log.role}
                  </Badge>
                  <span className="text-[10px] text-slate-400 font-semibold">{log.timestamp}</span>
                </div>
                <div className="font-bold text-blue-600 dark:text-blue-400 text-[11px] pt-0.5">
                  {log.category}
                </div>
                <p className="text-slate-600 dark:text-slate-300 text-xs">{log.reason}</p>
              </div>

              <div className="shrink-0 flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-bold text-[11px]">
                <CheckCircle2 className="w-3.5 h-3.5" /> Verified Staff Token
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Safety Notice */}
      <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          <span className="font-bold text-slate-900 dark:text-white block">
            Prototype Security Demonstration Notice
          </span>
          All access logs and consent preferences displayed in this interface are generated client-side for demonstration and educational review. This prototype does not claim legal regulatory compliance or certified statutory cryptographic storage.
        </div>
      </div>
    </div>
  );
}


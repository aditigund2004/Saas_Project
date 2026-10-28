import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { verificationService } from '../../services/verificationService';
import { ShieldCheck, ShieldAlert } from 'lucide-react';

import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';

export function PrescriptionVerificationPage() {
  const { verificationId } = useParams();
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState(null);

  useEffect(() => {
    async function check() {
      setLoading(true);
      const data = await verificationService.verifyPrescription(verificationId || 'demo');
      setResult(data);
      setLoading(false);
    }
    check();
  }, [verificationId]);

  if (loading) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
        <p className="text-xs text-slate-500 dark:text-slate-400">Querying prescription verification registry...</p>

      </div>
    );
  }

  const isAuthentic = result?.status === 'Authentic';

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 sm:py-12 space-y-6 transition-colors">
      {/* Top Brand Banner */}
      <div className="text-center space-y-2">
        <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
          Official Digital Verification Authority
        </span>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Prescription Authenticity Check
        </h1>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Scanned Verification Token:{' '}
          <code className="font-mono text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-800">
            {verificationId}
          </code>

        </p>
      </div>

      {/* Verification Result Card */}
      <Card className="p-6 sm:p-8 border-slate-200 dark:border-slate-800 shadow-md space-y-6">
        {/* Status Badge */}
        <div className="flex flex-col items-center text-center space-y-3 pb-6 border-b border-slate-100 dark:border-slate-800">
          {isAuthentic ? (
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <ShieldCheck className="w-10 h-10" />
            </div>
          ) : (
            <div className="w-16 h-16 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">

              <ShieldAlert className="w-10 h-10" />
            </div>
          )}

          <div>
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                isAuthentic
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800'
                  : 'bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
              }`}
            >
              Verification Status: {result?.status}
            </span>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              Prescription Ref: <strong className="font-mono text-slate-900 dark:text-white">{result?.prescriptionNumber}</strong>

            </p>
          </div>
        </div>

        {/* Verified Parameters */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1">
            <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-semibold">Issuing Healthcare Facility</span>
            <p className="font-bold text-slate-900 dark:text-white text-sm">{result?.clinicName}</p>
            <p className="text-slate-500 dark:text-slate-400">Location: {result?.clinicCity}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1">
            <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-semibold">Authorized Doctor</span>
            <p className="font-bold text-slate-900 dark:text-white text-sm">{result?.doctorName}</p>
            <p className="text-slate-500 dark:text-slate-400">Council Reg: {result?.doctorRegistration}</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1">
            <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-semibold">Date of Issuance</span>
            <p className="font-bold text-slate-900 dark:text-white text-sm">{result?.dateIssued}</p>
            <p className="text-slate-500 dark:text-slate-400">Official Clinical Record Timestamp</p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-1">
            <span className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-semibold">Scheduled Follow-Up</span>
            <p className="font-bold text-slate-900 dark:text-white text-sm">{result?.followUpDate || 'As advised'}</p>
            <p className="text-slate-500 dark:text-slate-400">Follow-up appointment window</p>

          </div>
        </div>

        {/* Privacy Guard Notice */}
        <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-xs text-blue-900 dark:text-blue-300 space-y-1.5">
          <p className="font-semibold flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
            Healthcare Privacy Safeguard
          </p>
          <p className="text-blue-850 dark:text-blue-300 leading-relaxed text-[11px]">

            In compliance with patient confidentiality standards, specific medical diagnosis notes, full clinical histories, and prescription dosages are deliberately withheld from public QR scanning views. Only verified healthcare practitioners and the authenticated patient may access complete clinical documentation.
          </p>
        </div>

        {/* Demo Mode Notice */}
        <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 text-xs text-amber-850 dark:text-amber-300 space-y-1">
          <p className="font-semibold">Sample Verification Demo Mode</p>
          <p className="text-[11px] text-amber-700 dark:text-amber-400 leading-relaxed">
            {result?.verificationNotice}

          </p>
        </div>

        {/* Bottom Actions */}
        <div className="pt-2 flex flex-wrap items-center justify-between gap-3 text-xs">
          <Link to="/" className="text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 font-medium">

            ← Return to Public Home
          </Link>
          <Link to="/clinics">
            <Button variant="outline" size="sm">
              Explore Connected Clinics
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}


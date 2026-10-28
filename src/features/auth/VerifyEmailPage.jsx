import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { AuthLayout } from './AuthLayout';
import { Button } from '../../components/ui/Button';
import {
  Mail,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  RefreshCw,
  AlertTriangle
} from 'lucide-react';

export function VerifyEmailPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { user, verifyEmail, isLoading } = useAuth();

  const emailParam = searchParams.get('email') || user?.email || 'patient@example.demo';
  const tokenParam = searchParams.get('token') || user?.verificationToken || 'demo_tok_78219';

  const [verified, setVerified] = useState(user?.isDemoVerified || false);
  const [error, setError] = useState('');

  const handleVerify = async () => {
    setError('');
    const res = await verifyEmail(tokenParam || emailParam);
    if (res.success) {
      setVerified(true);
      // Wait 700ms and navigate to patient onboarding

      setTimeout(() => {
        navigate('/onboarding/patient');
      }, 700);
    } else {
      setError(res.error || 'Simulated verification failed.');
    }
  };

  return (
    <AuthLayout
      title="Verify Your Demo Account"
      subtitle="Complete simulated email verification to activate your patient profile."
      badgeText="Simulated Account Verification"
    >
      <div className="space-y-6">
        {/* Prototype Verification Watermark */}
        <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 rounded-2xl flex items-start gap-3 text-xs text-amber-900 dark:text-amber-300">
          <AlertTriangle className="w-5 h-5 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold block text-amber-950 dark:text-amber-200">Simulated Verification Environment:</span>

            <span>
              ClinicOS operates without live email relays or SMS gateways in this prototype. No real verification email was sent to your inbox. Use the demonstration action below to mark your account as verified.
            </span>
          </div>
        </div>

        {/* Envelope Display */}
        <div className="p-6 rounded-2xl bg-blue-50/50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/60 text-center space-y-3">

          <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center mx-auto shadow-md">
            <Mail className="w-7 h-7" />
          </div>
          <div>
            <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Verification Dispatched To:
            </div>
            <div className="text-sm font-bold text-slate-900 dark:text-white mt-0.5 font-mono">{emailParam}</div>
          </div>
          <div className="text-xs text-slate-500 dark:text-slate-400">
            Simulated Token: <span className="font-mono bg-white dark:bg-slate-900 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200">{tokenParam}</span>

          </div>
        </div>

        {error && (
          <p className="text-xs text-red-600 dark:text-red-400 font-semibold text-center">{error}</p>

        )}

        {/* Action Button */}
        {verified ? (
          <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 rounded-2xl text-center space-y-2 animate-in fade-in">
            <div className="flex items-center justify-center gap-1.5 text-emerald-800 dark:text-emerald-300 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <span>Demo Email Verified Successfully!</span>
            </div>
            <p className="text-xs text-emerald-700 dark:text-emerald-400">Redirecting you to the patient onboarding wizard...</p>

          </div>
        ) : (
          <div className="space-y-2">
            <Button
              type="button"
              variant="primary"
              size="md"
              className="w-full justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 shadow-sm text-sm"
              onClick={handleVerify}
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Activating Account...
                </span>
              ) : (
                <span className="flex items-center gap-1.5">
                  Complete Demonstration Verification <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>

            <Link
              to="/onboarding/patient"
              className="block text-center text-xs text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white underline pt-1"

            >
              Skip verification for now and proceed &rarr;
            </Link>
          </div>
        )}
      </div>
    </AuthLayout>
  );
}


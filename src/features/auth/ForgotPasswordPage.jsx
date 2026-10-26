import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { AuthLayout } from './AuthLayout';
import { Button } from '../../components/ui/Button';
import { Mail, CheckCircle2, AlertCircle, ArrowLeft, ArrowRight, ShieldAlert } from 'lucide-react';

export function ForgotPasswordPage() {
  const { requestPasswordReset, isLoading } = useAuth();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState('');

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim()) {
      setError('Please enter your account email address.');
      return;
    }
    if (!emailRegex.test(email.trim())) {
      setError('Please provide a valid email format.');
      return;
    }

    const res = await requestPasswordReset(email.trim());
    setConfirmationMessage(res.message);
    setSubmitted(true);
  };

  return (
    <AuthLayout
      title="Reset Account Password"
      subtitle="Enter your registered email to receive simulated password recovery instructions."
      badgeText="Simulated Recovery Service"
    >
      {submitted ? (
        <div className="space-y-5 animate-in fade-in">
          <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 space-y-3">
            <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Simulated Recovery Dispatched</span>
            </div>
            <p className="text-xs text-emerald-800 leading-relaxed">
              {confirmationMessage}
            </p>
          </div>

          <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl text-[11px] text-slate-600 space-y-1">
            <span className="font-bold text-slate-800 block">Demonstration Notice:</span>
            <span>
              In this frontend prototype, passwords are not stored in live production databases. All seeded test accounts can be accessed directly via the Demo Access Hub or standard demo passwords.
            </span>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <Link to="/login" className="w-full sm:w-auto flex-1">
              <Button variant="primary" size="md" className="w-full justify-center bg-blue-600 hover:bg-blue-700 font-bold">
                Return to Sign In <ArrowRight className="w-4 h-4 ml-1" />
              </Button>
            </Link>
            <Link to="/demo-access" className="w-full sm:w-auto">
              <Button variant="outline" size="md" className="w-full">
                Demo Access Hub
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-xs text-red-800 flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
              <div className="flex-1 leading-relaxed">
                <span className="font-bold">Invalid Entry:</span> {error}
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-[13px] font-semibold text-[#1E293B] block">
              Registered Account Email <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (error) setError('');
                }}
                placeholder="name@domain.com"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E2E8F0] text-sm text-[#1E293B] bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <p className="text-[12px] text-[#64748B]">
              We will generate a simulated password recovery token for this address.
            </p>
          </div>

          <Button
            type="submit"
            variant="primary"
            size="md"
            className="w-full justify-center bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 shadow-sm text-sm"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Dispatching Simulated Link...
              </span>
            ) : (
              <span>Send Simulated Reset Instructions</span>
            )}
          </Button>

          <div className="text-center pt-2">
            <Link to="/login" className="text-xs font-semibold text-blue-600 hover:underline inline-flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Return to Login
            </Link>
          </div>
        </form>
      )}
    </AuthLayout>
  );
}


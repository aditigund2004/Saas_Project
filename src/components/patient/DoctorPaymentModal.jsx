import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { Badge } from '../ui/Badge';
import {
  CreditCard,
  QrCode,
  Building,
  CheckCircle2,
  Copy,
  Clock,
  ShieldCheck,
  Stethoscope,
  Calendar,
  Lock,
  ArrowRight,
  ExternalLink,
  Receipt
} from 'lucide-react';

export function DoctorPaymentModal({ isOpen, onClose, appointment, onSuccess }) {
  const { payDoctorConsultationFee, formatCurrency, showToast } = useApp();

  const [activeTab, setActiveTab] = useState('upi'); // 'upi' | 'card' | 'netbanking' | 'desk'
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(null);
  const [copiedUpi, setCopiedUpi] = useState(false);

  // Card form state
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');

  // Net banking state
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setIsProcessing(false);
      setPaymentSuccess(null);
      setCopiedUpi(false);
      setCardNumber('4532 •••• •••• 8821');
      setCardExpiry('08/29');
      setCardCvv('721');
      setCardName(appointment?.patientName || 'Aarav Patel');
    }
  }, [isOpen, appointment]);

  if (!appointment) return null;

  const fee = Number(appointment.consultationFee) || 600;
  const upiId = `clinicos.${(appointment.doctorName || 'doctor').toLowerCase().replace(/[^a-z]/g, '')}@icici`;

  const handleCopyUpi = () => {
    navigator.clipboard?.writeText(upiId);
    setCopiedUpi(true);
    showToast('Clinic UPI ID copied to clipboard!');
    setTimeout(() => setCopiedUpi(false), 2500);
  };

  const handleProcessPayment = (methodLabel) => {
    setIsProcessing(true);
    const txnRef = `TXN-${Date.now().toString().slice(-8)}`;

    setTimeout(() => {
      const res = payDoctorConsultationFee(appointment.id, methodLabel, txnRef);
      setIsProcessing(false);
      if (res && res.success) {
        setPaymentSuccess({
          receiptNumber: res.receipt.receiptNumber,
          transactionRef: txnRef,
          amount: fee,
          method: methodLabel
        });
        if (onSuccess) onSuccess(res);
      }
    }, 700);
  };

  const banks = [
    { name: 'HDFC Bank', code: 'HDFC' },
    { name: 'State Bank of India', code: 'SBI' },
    { name: 'ICICI Bank', code: 'ICICI' },
    { name: 'Axis Bank', code: 'AXIS' },
    { name: 'Kotak Mahindra', code: 'KOTAK' }
  ];

  return (
    <Modal
      isOpen={isOpen}
      onClose={isProcessing ? () => {} : onClose}
      title={paymentSuccess ? 'Payment Successful' : `Pay Doctor Consultation Fee: ₹${fee.toLocaleString('en-IN')}`}
      size="lg"
    >
      {paymentSuccess ? (
        <div className="py-4 px-2 space-y-6 text-center">
          <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center border-2 border-emerald-500 shadow-md">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div className="space-y-1">
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              Consultation Fee Settled!
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Payment of <strong className="text-emerald-600 dark:text-emerald-400">₹{fee.toLocaleString('en-IN')}</strong> confirmed for Dr. {appointment.doctorName}.
            </p>
          </div>

          {/* Payment Proof Card */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-left text-xs space-y-2.5">
            <div className="flex justify-between items-center pb-2 border-b border-slate-200 dark:border-slate-700">
              <span className="text-slate-500 dark:text-slate-400">Official Receipt #:</span>
              <span className="font-mono font-bold text-blue-600 dark:text-blue-400 text-sm">
                {paymentSuccess.receiptNumber}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-slate-400">Transaction Reference:</span>
              <span className="font-mono font-semibold text-slate-800 dark:text-slate-200">
                {paymentSuccess.transactionRef}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-slate-400">Settlement Method:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {paymentSuccess.method}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-slate-400">Appointment Ref:</span>
              <span className="font-mono text-slate-800 dark:text-slate-200">
                {appointment.referenceNumber || appointment.requestId}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-slate-400">Clinic / Doctor:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {appointment.clinicName} (Dr. {appointment.doctorName})
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 pt-2">
            <Button
              variant="outline"
              size="md"
              icon={Receipt}
              onClick={() => {
                onClose();
                window.location.hash = '#/patient/receipts';
              }}
            >
              View In Receipts Ledger
            </Button>
            <Button
              variant="primary"
              size="md"
              className="font-bold bg-blue-600 hover:bg-blue-700"
              onClick={onClose}
            >
              Done & Return
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-5 text-sm">
          {/* Doctor & Appointment Summary Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-50/80 via-indigo-50/40 to-white dark:from-blue-950/40 dark:via-slate-900 dark:to-indigo-950/30 border border-blue-200/80 dark:border-blue-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md shadow-blue-500/20">
                <Stethoscope className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-slate-900 dark:text-white text-base">
                    Dr. {appointment.doctorName}
                  </span>
                  <Badge variant="purple" size="sm">
                    {appointment.serviceName || 'OPD Consult'}
                  </Badge>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-0.5">
                  <span>{appointment.clinicName}</span>
                  <span>•</span>
                  <span className="font-mono text-slate-700 dark:text-slate-300">
                    📅 {appointment.confirmedDate || appointment.date} at {appointment.confirmedTime || appointment.time}
                  </span>
                </div>
              </div>
            </div>

            <div className="sm:text-right shrink-0">
              <span className="text-[11px] uppercase tracking-wider text-slate-400 font-bold block">
                Total Fee
              </span>
              <span className="text-2xl font-black text-blue-600 dark:text-blue-400 font-mono">
                ₹{fee.toLocaleString('en-IN')}
              </span>
            </div>
          </div>

          {/* Payment Method Selector Tabs */}
          <div className="flex rounded-xl bg-slate-100 dark:bg-slate-800/80 p-1 gap-1">
            <button
              type="button"
              onClick={() => setActiveTab('upi')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'upi'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <QrCode className="w-3.5 h-3.5" />
              UPI / QR Code
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('card')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'card'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <CreditCard className="w-3.5 h-3.5" />
              Cards (RuPay / Visa)
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('netbanking')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'netbanking'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Building className="w-3.5 h-3.5" />
              Net Banking
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('desk')}
              className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                activeTab === 'desk'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              Pay at Clinic
            </button>
          </div>

          {/* Tab 1: UPI / Dynamic QR Code */}
          {activeTab === 'upi' && (
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-center flex flex-col items-center">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                  Scan Dynamic Indian UPI QR Code
                </span>

                {/* Styled SVG QR Graphic */}
                <div className="p-3 bg-white rounded-2xl border-2 border-slate-900/10 shadow-md inline-block">
                  <svg
                    className="w-44 h-44 text-slate-900"
                    viewBox="0 0 100 100"
                    fill="currentColor"
                  >
                    {/* Corner Position Targets */}
                    <rect x="5" y="5" width="26" height="26" rx="4" fill="#0F172A" />
                    <rect x="9" y="9" width="18" height="18" rx="2" fill="#FFFFFF" />
                    <rect x="13" y="13" width="10" height="10" rx="1" fill="#2563EB" />

                    <rect x="69" y="5" width="26" height="26" rx="4" fill="#0F172A" />
                    <rect x="73" y="9" width="18" height="18" rx="2" fill="#FFFFFF" />
                    <rect x="77" y="13" width="10" height="10" rx="1" fill="#2563EB" />

                    <rect x="5" y="69" width="26" height="26" rx="4" fill="#0F172A" />
                    <rect x="9" y="73" width="18" height="18" rx="2" fill="#FFFFFF" />
                    <rect x="13" y="77" width="10" height="10" rx="1" fill="#2563EB" />

                    {/* QR Matrix Bits Simulation */}
                    <rect x="36" y="8" width="6" height="6" />
                    <rect x="46" y="8" width="6" height="6" />
                    <rect x="56" y="14" width="6" height="6" />
                    <rect x="36" y="22" width="6" height="6" />
                    <rect x="50" y="26" width="6" height="6" />

                    <rect x="8" y="38" width="6" height="6" />
                    <rect x="20" y="44" width="6" height="6" />
                    <rect x="8" y="54" width="6" height="6" />

                    <rect x="72" y="38" width="6" height="6" />
                    <rect x="84" y="44" width="6" height="6" />
                    <rect x="76" y="56" width="6" height="6" />

                    {/* Central Stethoscope / Logo Marker */}
                    <circle cx="50" cy="50" r="14" fill="#2563EB" />
                    <circle cx="50" cy="50" r="11" fill="#FFFFFF" />
                    <text
                      x="50"
                      y="54"
                      textAnchor="middle"
                      fontSize="9"
                      fontWeight="bold"
                      fill="#2563EB"
                    >
                      ₹
                    </text>

                    <rect x="38" y="68" width="6" height="6" />
                    <rect x="48" y="74" width="6" height="6" />
                    <rect x="58" y="82" width="6" height="6" />
                    <rect x="70" y="72" width="6" height="6" />
                    <rect x="84" y="80" width="6" height="6" />
                  </svg>
                </div>

                <div className="flex items-center gap-2 mt-3 text-xs text-slate-500">
                  <span>Supported UPI apps:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">
                    Google Pay · PhonePe · Paytm · BHIM · CRED
                  </span>
                </div>

                {/* Copy UPI ID Pill */}
                <div className="mt-3 flex items-center gap-2 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 font-mono text-xs">
                  <span className="text-slate-400">Doctor UPI ID:</span>
                  <span className="font-bold text-slate-800 dark:text-slate-200">{upiId}</span>
                  <button
                    type="button"
                    onClick={handleCopyUpi}
                    className="ml-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 cursor-pointer"
                  >
                    {copiedUpi ? (
                      <span className="text-emerald-600 font-bold">Copied!</span>
                    ) : (
                      <Copy className="w-3.5 h-3.5" />
                    )}
                  </button>
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                className="w-full font-bold shadow-md shadow-blue-500/20 bg-emerald-600 hover:bg-emerald-700 text-white"
                disabled={isProcessing}
                onClick={() => handleProcessPayment('UPI / QR Scan')}
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Verifying UPI Bank Settlement...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4" />
                    I Have Paid ₹{fee.toLocaleString('en-IN')} via UPI &rarr;
                  </span>
                )}
              </Button>
            </div>
          )}

          {/* Tab 2: Credit / Debit Card */}
          {activeTab === 'card' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Card Number (RuPay, Visa, MasterCard)
                  </label>
                  <input
                    type="text"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    placeholder="4532 0000 0000 8821"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      Valid Thru (MM/YY)
                    </label>
                    <input
                      type="text"
                      value={cardExpiry}
                      onChange={(e) => setCardExpiry(e.target.value)}
                      placeholder="08/29"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                      CVV / Security Code
                    </label>
                    <input
                      type="password"
                      maxLength={4}
                      value={cardCvv}
                      onChange={(e) => setCardCvv(e.target.value)}
                      placeholder="•••"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 font-mono text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Cardholder Full Name
                  </label>
                  <input
                    type="text"
                    value={cardName}
                    onChange={(e) => setCardName(e.target.value)}
                    placeholder="Aarav Patel"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                className="w-full font-bold bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isProcessing}
                onClick={() => handleProcessPayment('Credit / Debit Card')}
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Authorizing Card Payment...
                  </span>
                ) : (
                  <span>Pay ₹{fee.toLocaleString('en-IN')} with Card &rarr;</span>
                )}
              </Button>
            </div>
          )}

          {/* Tab 3: Net Banking */}
          {activeTab === 'netbanking' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                  Select Participating Indian Bank
                </span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {banks.map((b) => (
                    <label
                      key={b.code}
                      onClick={() => setSelectedBank(b.name)}
                      className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                        selectedBank === b.name
                          ? 'border-blue-500 bg-blue-50/60 dark:bg-blue-950/40 text-blue-900 dark:text-blue-100 font-bold'
                          : 'border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span>{b.name}</span>
                      <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                        {b.code}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                className="w-full font-bold bg-blue-600 hover:bg-blue-700 text-white"
                disabled={isProcessing}
                onClick={() => handleProcessPayment(`Net Banking (${selectedBank})`)}
              >
                {isProcessing ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Connecting to {selectedBank}...
                  </span>
                ) : (
                  <span>Proceed to {selectedBank} &rarr;</span>
                )}
              </Button>
            </div>
          )}

          {/* Tab 4: Pay at Clinic Front Desk */}
          {activeTab === 'desk' && (
            <div className="p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 space-y-3">
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="font-extrabold text-amber-950 dark:text-amber-200 text-sm">
                    Settle Consultation Fee at Clinic Reception
                  </h4>
                  <p className="text-xs text-amber-900/80 dark:text-amber-300/80 mt-1 leading-relaxed">
                    You can pay the ₹{fee.toLocaleString('en-IN')} consultation fee in cash, UPI, or card when you arrive at {appointment.clinicName} for your token check-in.
                  </p>
                </div>
              </div>

              <Button
                variant="outline"
                size="md"
                className="w-full font-bold border-amber-300 dark:border-amber-700 text-amber-950 dark:text-amber-200 bg-white/80 dark:bg-slate-900"
                onClick={onClose}
              >
                Confirm: I Will Pay at Clinic Front Desk
              </Button>
            </div>
          )}

          {/* Security Assurance Badge */}
          <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 dark:text-slate-500 pt-1">
            <Lock className="w-3.5 h-3.5 text-emerald-600" />
            <span>256-bit Encrypted Settlement · Instant Doctor Ledger Synchronization</span>
          </div>
        </div>
      )}
    </Modal>
  );
}


import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useReferral } from '../../context/ReferralContext';
import { useTheme } from '../../context/ThemeContext';
import {
  Share2,
  Copy,
  Check,
  ExternalLink,
  PlusCircle,
  CreditCard,
  Users,
  CheckCircle2,
  Clock,
  AlertCircle,
  ArrowUpRight,
  Send,
  Wallet,
  ShieldCheck,
  Stethoscope,
  ChevronRight,
  X,
  Search,
  Download,
  Sparkles,
  Building2,
  Calendar,
  Phone,
  Mail,
  Receipt,
  Gift,
  HelpCircle
} from 'lucide-react';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { StatCard } from '../../components/ui/StatCard';
import { formatINR, copyToClipboard, exportToCSV } from '../super-admin/referrals/referralUtils';

export function ClinicReferralsPage() {
  const { currentUser, showToast } = useApp() || {};
  const {
    affiliates = [],
    referrals = [],
    commissionLedger = [],
    payouts = [],
    addReferral,
    requestPayout,
    advanceReferralStage
  } = useReferral();
  const { isDark } = useTheme();

  // Find the doctor's affiliate profile (Default to Dr. Aarav Mehta AFF-100)
  const doctorAffiliate = useMemo(() => {
    // 1. Match by email or ID if current user matches
    if (currentUser?.email) {
      const match = affiliates.find(
        (a) => a.email?.toLowerCase() === currentUser.email?.toLowerCase()
      );
      if (match) return match;
    }
    // 2. Default to Dr. Aarav Mehta (AFF-100)
    return (
      affiliates.find((a) => a.id === 'AFF-100') ||
      affiliates[0] || {
        id: 'AFF-100',
        name: 'Dr. Aarav Mehta, MBBS, MD',
        company: 'CityCare Family Clinic',
        partnerType: 'Hospital',
        email: 'aarav.mehta@citycare.demo',
        phone: '+91 98201 11223',
        referralCode: 'CITYCARE-MEHTA',
        status: 'Active',
        joinedDate: '2026-01-10',
        referredHospitalsCount: 7,
        convertedHospitalsCount: 5,
        totalCommissionEarned: 58500,
        paidCommission: 45000,
        pendingCommission: 13500,
        availableBalance: 13500,
        payoutMethod: 'Bank Transfer (NEFT/IMPS)',
        bankDetails: {
          accountHolder: 'Dr. Aarav Mehta',
          bankName: 'HDFC Bank Ltd',
          accountNumber: '50100492810012',
          ifscCode: 'HDFC0000240',
          upiId: 'dr.aarav@hdfcbank'
        }
      }
    );
  }, [affiliates, currentUser]);

  // Doctor's personal referrals
  const myReferrals = useMemo(() => {
    return referrals.filter(
      (r) =>
        r.affiliateId === doctorAffiliate.id ||
        r.referralCode === doctorAffiliate.referralCode
    );
  }, [referrals, doctorAffiliate]);

  // Doctor's commission ledger entries
  const myLedger = useMemo(() => {
    return commissionLedger.filter(
      (l) =>
        l.affiliateId === doctorAffiliate.id ||
        l.affiliateName?.includes('Aarav Mehta')
    );
  }, [commissionLedger, doctorAffiliate]);

  // Doctor's payout records
  const myPayouts = useMemo(() => {
    return payouts.filter(
      (p) =>
        p.affiliateId === doctorAffiliate.id ||
        p.affiliateName?.includes('Aarav Mehta')
    );
  }, [payouts, doctorAffiliate]);

  // Dynamic calculated statistics
  const doctorStats = useMemo(() => {
    const totalReferred = myReferrals.length;
    const converted = myReferrals.filter((r) => r.referralStatus === 'Converted').length;
    const trial = myReferrals.filter((r) => r.referralStatus === 'Trial').length;
    const convRate = totalReferred > 0 ? Math.round((converted / totalReferred) * 100) : 0;

    const totalEarned = myLedger
      .filter((l) => l.status === 'Paid' || l.status === 'Approved' || l.status === 'Pending')
      .reduce((sum, l) => sum + (Number(l.commissionAmount) || 0), 0) || doctorAffiliate.totalCommissionEarned;

    const availableBal = doctorAffiliate.availableBalance;
    const pendingComm = myLedger
      .filter((l) => l.status === 'Pending')
      .reduce((sum, l) => sum + (Number(l.commissionAmount) || 0), 0) || doctorAffiliate.pendingCommission;

    const paidOut = doctorAffiliate.paidCommission;

    return {
      totalReferred,
      converted,
      trial,
      convRate,
      totalEarned,
      availableBal,
      pendingComm,
      paidOut
    };
  }, [myReferrals, myLedger, doctorAffiliate]);

  // Active Tab state
  const [activeTab, setActiveTab] = useState('referrals'); // 'referrals' | 'ledger' | 'payouts' | 'clinical'
  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Modals & Drawers
  const [isReferModalOpen, setIsReferModalOpen] = useState(false);
  const [isPayoutModalOpen, setIsPayoutModalOpen] = useState(false);
  const [selectedTimelineReferral, setSelectedTimelineReferral] = useState(null);
  const [isPatientReferModalOpen, setIsPatientReferModalOpen] = useState(false);

  // Form States: New Referral Modal
  const [newReferralForm, setNewReferralForm] = useState({
    hospitalName: '',
    contactPerson: '',
    hospitalEmail: '',
    phone: '',
    city: 'Pune, Maharashtra',
    subscriptionPlan: 'Professional Multi-Specialty',
    notes: ''
  });

  // Form States: Payout Modal
  const [payoutForm, setPayoutForm] = useState({
    amount: doctorAffiliate.availableBalance > 0 ? String(doctorAffiliate.availableBalance) : '5000',
    paymentMethod: 'Bank Transfer (NEFT/IMPS)',
    notes: 'Doctor referral incentive payout'
  });

  // Patient Clinical Referral State (Doctor to Doctor peer consult)
  const [patientReferrals, setPatientReferrals] = useState([
    {
      id: 'PT-REF-101',
      patientName: 'Aarav Patel (34M)',
      specialty: 'Cardiology',
      targetDoctor: 'Dr. Rohan Deshmukh',
      hospital: 'MetroHealth Heart Institute',
      reason: 'Post-op cardiac clearance & echocardiography evaluation',
      urgency: 'High Priority',
      status: 'Appointment Booked',
      date: '2026-10-22'
    },
    {
      id: 'PT-REF-102',
      patientName: 'Meera Deshpande (28F)',
      specialty: 'Dermatology & Cosmetology',
      targetDoctor: 'Dr. Maya Sharma',
      hospital: 'Aura Skin & Laser Center',
      reason: 'Chronic eczema evaluation & patch test recommendation',
      urgency: 'Routine',
      status: 'Consultation Completed',
      date: '2026-10-18'
    },
    {
      id: 'PT-REF-103',
      patientName: 'Kabir Joshi (6M)',
      specialty: 'Pediatrics',
      targetDoctor: 'Dr. Arvind Rao',
      hospital: 'LittleStars Child Wellness Clinic',
      reason: 'Recurrent bronchospasm & pediatric pulmonology workup',
      urgency: 'Normal',
      status: 'Awaiting Slot',
      date: '2026-10-24'
    }
  ]);

  const [patientReferForm, setPatientReferForm] = useState({
    patientName: '',
    specialty: 'Cardiology',
    targetDoctor: 'Dr. Rohan Deshmukh',
    hospital: 'MetroHealth Heart Institute',
    reason: '',
    urgency: 'Routine'
  });

  // Referral URL
  const referralUrl = `https://clinicos.app/register/clinic?ref=${doctorAffiliate.referralCode}`;

  const handleCopyCode = async () => {
    const success = await copyToClipboard(doctorAffiliate.referralCode);
    if (success) {
      setCopiedCode(true);
      if (showToast) showToast('Doctor referral code copied to clipboard!', 'success');
      setTimeout(() => setCopiedCode(false), 2500);
    }
  };

  const handleCopyLink = async () => {
    const success = await copyToClipboard(referralUrl);
    if (success) {
      setCopiedLink(true);
      if (showToast) showToast('Shareable referral link copied to clipboard!', 'success');
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  // Submit New Referral
  const handleSubmitReferral = (e) => {
    e.preventDefault();
    if (!newReferralForm.hospitalName || !newReferralForm.hospitalEmail) {
      if (showToast) showToast('Please enter clinic name and email address.', 'error');
      return;
    }

    addReferral({
      affiliateId: doctorAffiliate.id,
      hospitalName: newReferralForm.hospitalName,
      contactPerson: newReferralForm.contactPerson || 'Medical Director',
      hospitalEmail: newReferralForm.hospitalEmail,
      city: newReferralForm.city,
      subscriptionPlan: newReferralForm.subscriptionPlan,
      notes: newReferralForm.notes
    });

    setIsReferModalOpen(false);
    setNewReferralForm({
      hospitalName: '',
      contactPerson: '',
      hospitalEmail: '',
      phone: '',
      city: 'Pune, Maharashtra',
      subscriptionPlan: 'Professional Multi-Specialty',
      notes: ''
    });
  };

  // Submit Payout Request
  const handleSubmitPayout = (e) => {
    e.preventDefault();
    const amountNum = Number(payoutForm.amount);
    if (!amountNum || amountNum <= 0) {
      if (showToast) showToast('Please enter a valid payout amount.', 'error');
      return;
    }
    if (amountNum > doctorAffiliate.availableBalance) {
      if (showToast)
        showToast(
          `Amount exceeds your available balance of ${formatINR(doctorAffiliate.availableBalance)}.`,
          'error'
        );
      return;
    }

    requestPayout({
      affiliateId: doctorAffiliate.id,
      amount: amountNum,
      paymentMethod: payoutForm.paymentMethod,
      notes: payoutForm.notes
    });

    setIsPayoutModalOpen(false);
  };

  // Submit Clinical Patient Referral
  const handleSubmitPatientReferral = (e) => {
    e.preventDefault();
    if (!patientReferForm.patientName || !patientReferForm.reason) {
      if (showToast) showToast('Please provide patient name and reason for referral.', 'error');
      return;
    }

    const newRecord = {
      id: `PT-REF-${104 + patientReferrals.length}`,
      patientName: patientReferForm.patientName,
      specialty: patientReferForm.specialty,
      targetDoctor: patientReferForm.targetDoctor,
      hospital: patientReferForm.hospital,
      reason: patientReferForm.reason,
      urgency: patientReferForm.urgency,
      status: 'Appointment Booked',
      date: new Date().toISOString().split('T')[0]
    };

    setPatientReferrals([newRecord, ...patientReferrals]);
    setIsPatientReferModalOpen(false);
    setPatientReferForm({
      patientName: '',
      specialty: 'Cardiology',
      targetDoctor: 'Dr. Rohan Deshmukh',
      hospital: 'MetroHealth Heart Institute',
      reason: '',
      urgency: 'Routine'
    });
    if (showToast) showToast(`Patient referral dispatched to ${newRecord.targetDoctor}!`, 'success');
  };

  // Filtered referrals list
  const filteredReferrals = useMemo(() => {
    return myReferrals.filter((r) => {
      const matchSearch =
        !searchQuery ||
        r.hospitalName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.contactPerson?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.city?.toLowerCase().includes(searchQuery.toLowerCase());

      const matchStatus = statusFilter === 'ALL' || r.referralStatus === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [myReferrals, searchQuery, statusFilter]);

  // Export CSV
  const handleExportReferrals = () => {
    const headers = [
      'Referral ID',
      'Hospital Name',
      'Contact Person',
      'Email',
      'City',
      'Registration Date',
      'Plan',
      'Subscription Amount',
      'Commission Amount',
      'Status'
    ];
    const rows = filteredReferrals.map((r) => [
      r.id,
      r.hospitalName,
      r.contactPerson,
      r.hospitalEmail,
      r.city,
      r.registrationDate,
      r.subscriptionPlan,
      r.subscriptionAmount,
      r.commissionAmount,
      r.referralStatus
    ]);
    exportToCSV(`Doctor_Referrals_${doctorAffiliate.referralCode}.csv`, rows, headers);
    if (showToast) showToast('Doctor referral dataset exported to CSV.', 'success');
  };

  const handleExportLedger = () => {
    const headers = ['Transaction ID', 'Hospital', 'Plan', 'Eligible Amount', 'Commission', 'Date', 'Status'];
    const rows = myLedger.map((l) => [
      l.transactionId,
      l.hospitalName,
      l.subscriptionPlan,
      l.paymentAmount,
      l.commissionAmount,
      l.transactionDate,
      l.status
    ]);
    exportToCSV(`Doctor_Commission_Ledger_${doctorAffiliate.referralCode}.csv`, rows, headers);
    if (showToast) showToast('Commission ledger exported to CSV.', 'success');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Top Breadcrumb & Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 mb-1">
            <Link to="/clinic/dashboard" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Clinic Workspace
            </Link>
            <ChevronRight className="w-3.5 h-3.5" />
            <span className="text-slate-900 dark:text-white">Doctor Referral & Partner Hub</span>
          </div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              Doctor Referral & Partner Hub
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700 dark:bg-blue-950/70 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              Doctor Network Tier
            </span>
          </div>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
            Refer fellow clinics, peer physicians, and track recurring 15% partner commission with transparent direct payouts.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 shrink-0 flex-wrap">
          <Button
            onClick={() => setIsPayoutModalOpen(true)}
            variant="outline"
            className="flex items-center gap-2 border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/40"
          >
            <Wallet className="w-4 h-4" />
            <span>Request Payout ({formatINR(doctorAffiliate.availableBalance)})</span>
          </Button>

          <Button
            onClick={() => setIsReferModalOpen(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white shadow-xs"
          >
            <PlusCircle className="w-4 h-4" />
            <span>+ Refer a Colleague / Clinic</span>
          </Button>
        </div>
      </div>

      {/* Doctor Referral Credentials Card */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-700 via-indigo-700 to-blue-900 text-white p-6 shadow-xl border border-blue-600/40">
        <div className="absolute -right-8 -top-8 w-48 h-48 bg-white/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute right-12 bottom-0 w-32 h-32 bg-indigo-400/10 rounded-full blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          {/* Doctor Info */}
          <div className="space-y-2 max-w-xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wider bg-white/20 text-white backdrop-blur-xs">
                Official Physician Partner
              </span>
              <span className="flex items-center gap-1 text-xs text-blue-200">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                Verified Doctor ID: {doctorAffiliate.id}
              </span>
            </div>
            <h2 className="text-xl md:text-2xl font-black tracking-tight text-white">
              {doctorAffiliate.name}
            </h2>
            <p className="text-sm text-blue-100">
              {doctorAffiliate.company} &bull; Practice Partner since {doctorAffiliate.joinedDate} &bull; 15% Recurring SaaS Conversion Incentive
            </p>
          </div>

          {/* Quick Copy Boxes */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Referral Code Box */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 flex items-center justify-between gap-4">
              <div>
                <span className="block text-[11px] font-semibold uppercase tracking-wider text-blue-200">
                  Your Doctor Code
                </span>
                <span className="text-lg font-black tracking-wider text-white font-mono">
                  {doctorAffiliate.referralCode}
                </span>
              </div>
              <button
                type="button"
                onClick={handleCopyCode}
                className="p-2.5 rounded-lg bg-white/20 hover:bg-white/30 text-white transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold"
                title="Copy doctor referral code"
              >
                {copiedCode ? <Check className="w-4 h-4 text-emerald-300" /> : <Copy className="w-4 h-4" />}
                <span>{copiedCode ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Direct Share Link Box */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-xl p-3 flex items-center justify-between gap-4">
              <div>
                <span className="block text-[11px] font-semibold uppercase tracking-wider text-blue-200">
                  Direct Colleague Invite Link
                </span>
                <span className="text-xs font-mono text-blue-100 truncate max-w-[160px] sm:max-w-[200px] block">
                  {referralUrl}
                </span>
              </div>
              <button
                type="button"
                onClick={handleCopyLink}
                className="p-2.5 rounded-lg bg-white text-blue-900 hover:bg-blue-50 transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold shadow-xs"
                title="Copy invite URL"
              >
                {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4 text-blue-700" />}
                <span>{copiedLink ? 'Link Copied!' : 'Share Link'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Quick Social / Direct Share Bar */}
        <div className="relative z-10 mt-5 pt-4 border-t border-white/15 flex flex-wrap items-center justify-between gap-3 text-xs text-blue-100">
          <div className="flex items-center gap-2">
            <Gift className="w-4 h-4 text-amber-300" />
            <span>
              Colleagues signing up with your link receive a <strong>14-Day Full Access Trial + Free OPD Onboarding</strong>.
            </span>
          </div>
          <div className="flex items-center gap-3">
            <a
              href={`https://wa.me/?text=${encodeURIComponent(
                `Hello Doctor! I recommend using ClinicOS for seamless clinic OPD management, digital prescriptions, and WhatsApp reminders. Join via my referral link: ${referralUrl}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-semibold transition-colors shadow-2xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Share on WhatsApp</span>
            </a>
            <a
              href={`mailto:?subject=${encodeURIComponent(
                'Recommendation: Modern Clinic Operating System (ClinicOS)'
              )}&body=${encodeURIComponent(
                `Dear Doctor,\n\nI have been using ClinicOS at our clinic for patient management, e-prescriptions, and appointment queues. It has streamlined our practice significantly.\n\nYou can explore it with a 14-day full feature trial through my referral link below:\n${referralUrl}\n\nBest regards,\n${doctorAffiliate.name}`
              )}`}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/20 hover:bg-white/30 text-white font-semibold transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Send Email Invite</span>
            </a>
          </div>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Referred Clinics"
          value={doctorStats.totalReferred}
          subtitle={`${doctorStats.converted} converted • ${doctorStats.trial} in trial`}
          icon={Building2}
          color="blue"
        />

        <StatCard
          title="Conversion Rate"
          value={`${doctorStats.convRate}%`}
          subtitle="Peer recommendation conversion"
          icon={CheckCircle2}
          color="emerald"
        />

        <StatCard
          title="Total Commission Earned"
          value={formatINR(doctorStats.totalEarned)}
          subtitle="Cumulative 15% partner earnings"
          icon={Receipt}
          color="indigo"
        />

        <StatCard
          title="Available Balance"
          value={formatINR(doctorStats.availableBal)}
          subtitle={`${formatINR(doctorStats.pendingComm)} pending clearance`}
          icon={Wallet}
          color="amber"
        />
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('referrals')}
          className={`pb-3 px-4 text-sm font-semibold flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'referrals'
              ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Building2 className="w-4 h-4" />
          <span>My Referred Clinics ({myReferrals.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('ledger')}
          className={`pb-3 px-4 text-sm font-semibold flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'ledger'
              ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Receipt className="w-4 h-4" />
          <span>Commission Ledger ({myLedger.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('payouts')}
          className={`pb-3 px-4 text-sm font-semibold flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'payouts'
              ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <CreditCard className="w-4 h-4" />
          <span>Payout Disbursements ({myPayouts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('clinical')}
          className={`pb-3 px-4 text-sm font-semibold flex items-center gap-2 border-b-2 transition-all cursor-pointer whitespace-nowrap ${
            activeTab === 'clinical'
              ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Stethoscope className="w-4 h-4" />
          <span>Specialist Patient Referrals ({patientReferrals.length})</span>
        </button>
      </div>

      {/* Tab 1: My Referred Clinics */}
      {activeTab === 'referrals' && (
        <Card>
          <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Referred Hospitals & Healthcare Centers
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Track onboarding milestones and simulated subscription conversions for each clinic.
              </p>
            </div>

            <div className="flex items-center gap-2.5 flex-wrap">
              {/* Search */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search clinic or doctor..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 pr-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Status Filter */}
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="ALL">All Statuses ({myReferrals.length})</option>
                <option value="Converted">Converted</option>
                <option value="Trial">Trial</option>
                <option value="Registered">Registered</option>
              </select>

              {/* Export */}
              <Button
                variant="outline"
                size="sm"
                onClick={handleExportReferrals}
                className="flex items-center gap-1.5 text-xs"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export CSV</span>
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/75 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400">
                    <th className="py-3 px-4 font-bold"># Referral ID</th>
                    <th className="py-3 px-4 font-bold">Hospital / Clinic</th>
                    <th className="py-3 px-4 font-bold">Contact Person</th>
                    <th className="py-3 px-4 font-bold">City</th>
                    <th className="py-3 px-4 font-bold">Registration Date</th>
                    <th className="py-3 px-4 font-bold">Subscription Plan</th>
                    <th className="py-3 px-4 font-bold">Commission (15%)</th>
                    <th className="py-3 px-4 font-bold">Status</th>
                    <th className="py-3 px-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredReferrals.length === 0 ? (
                    <tr>
                      <td colSpan={9} className="py-8 text-center text-slate-400">
                        No clinics match the current search or filters. Click &quot;+ Refer a Colleague / Clinic&quot; to invite one!
                      </td>
                    </tr>
                  ) : (
                    filteredReferrals.map((ref) => {
                      const isConverted = ref.referralStatus === 'Converted';
                      const isTrial = ref.referralStatus === 'Trial';
                      return (
                        <tr
                          key={ref.id}
                          className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                        >
                          <td className="py-3 px-4 font-mono font-bold text-slate-900 dark:text-white">
                            {ref.id}
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-bold text-slate-900 dark:text-white">
                              {ref.hospitalName}
                            </div>
                            <div className="text-[11px] text-slate-400">{ref.hospitalEmail}</div>
                          </td>
                          <td className="py-3 px-4 text-slate-700 dark:text-slate-300 font-medium">
                            {ref.contactPerson}
                          </td>
                          <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                            {ref.city}
                          </td>
                          <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                            {ref.registrationDate}
                          </td>
                          <td className="py-3 px-4">
                            <span className="font-semibold text-slate-800 dark:text-slate-200">
                              {ref.subscriptionPlan}
                            </span>
                            <span className="block text-[10px] text-slate-400">
                              {formatINR(ref.subscriptionAmount)}/yr
                            </span>
                          </td>
                          <td className="py-3 px-4 font-bold text-emerald-600 dark:text-emerald-400">
                            {formatINR(ref.commissionAmount)}
                          </td>
                          <td className="py-3 px-4">
                            <Badge
                              variant={
                                isConverted ? 'success' : isTrial ? 'warning' : 'secondary'
                              }
                            >
                              {ref.referralStatus}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button
                              type="button"
                              onClick={() => setSelectedTimelineReferral(ref)}
                              className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 dark:bg-blue-950/60 dark:text-blue-300 dark:hover:bg-blue-900/60 transition-colors cursor-pointer"
                            >
                              View Journey
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tab 2: My Commission Ledger */}
      {activeTab === 'ledger' && (
        <Card>
          <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Physician Commission Ledger & Settlement History
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                15% SaaS recurring commission accrued from referred healthcare clinic subscriptions.
              </p>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleExportLedger}
              className="flex items-center gap-1.5 text-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Ledger CSV</span>
            </Button>
          </CardHeader>

          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/75 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400">
                    <th className="py-3 px-4 font-bold">Transaction ID</th>
                    <th className="py-3 px-4 font-bold">Referred Clinic</th>
                    <th className="py-3 px-4 font-bold">Subscription Plan</th>
                    <th className="py-3 px-4 font-bold">Eligible SaaS Amount</th>
                    <th className="py-3 px-4 font-bold">Commission (15%)</th>
                    <th className="py-3 px-4 font-bold">Transaction Date</th>
                    <th className="py-3 px-4 font-bold">Status</th>
                    <th className="py-3 px-4 font-bold">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {myLedger.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-slate-400">
                        No commission entries recorded yet.
                      </td>
                    </tr>
                  ) : (
                    myLedger.map((tx) => {
                      const isPaid = tx.status === 'Paid';
                      const isApproved = tx.status === 'Approved';
                      const isPending = tx.status === 'Pending';
                      return (
                        <tr
                          key={tx.transactionId}
                          className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                        >
                          <td className="py-3 px-4 font-mono font-bold text-slate-900 dark:text-white">
                            {tx.transactionId}
                          </td>
                          <td className="py-3 px-4 font-semibold text-slate-800 dark:text-slate-200">
                            {tx.hospitalName}
                          </td>
                          <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                            {tx.subscriptionPlan}
                          </td>
                          <td className="py-3 px-4 font-medium text-slate-700 dark:text-slate-300">
                            {formatINR(tx.paymentAmount)}
                          </td>
                          <td className="py-3 px-4 font-bold text-emerald-600 dark:text-emerald-400">
                            {formatINR(tx.commissionAmount)}
                          </td>
                          <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                            {tx.transactionDate}
                          </td>
                          <td className="py-3 px-4">
                            <Badge
                              variant={
                                isPaid ? 'success' : isApproved ? 'primary' : isPending ? 'warning' : 'secondary'
                              }
                            >
                              {tx.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-slate-400 text-[11px] max-w-xs truncate">
                            {tx.notes || 'Routine affiliate recurring commission'}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tab 3: My Payout Requests & History */}
      {activeTab === 'payouts' && (
        <Card>
          <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Disbursement & Payout Requests
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Direct NEFT / IMPS and UPI bank transfers processed by Super Admin finance desk.
              </p>
            </div>

            <Button
              onClick={() => setIsPayoutModalOpen(true)}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs"
            >
              <Wallet className="w-3.5 h-3.5" />
              <span>Request New Payout</span>
            </Button>
          </CardHeader>

          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/75 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400">
                    <th className="py-3 px-4 font-bold">Payout ID</th>
                    <th className="py-3 px-4 font-bold">Requested Amount</th>
                    <th className="py-3 px-4 font-bold">Payment Method</th>
                    <th className="py-3 px-4 font-bold">Account / UPI</th>
                    <th className="py-3 px-4 font-bold">Request Date</th>
                    <th className="py-3 px-4 font-bold">Status</th>
                    <th className="py-3 px-4 font-bold">UTR / Payment Ref</th>
                    <th className="py-3 px-4 font-bold">Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {myPayouts.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-slate-400">
                        No payout requests submitted yet. Available balance: {formatINR(doctorAffiliate.availableBalance)}.
                      </td>
                    </tr>
                  ) : (
                    myPayouts.map((p) => {
                      const isPaid = p.payoutStatus === 'Paid';
                      const isPending = p.payoutStatus === 'Pending';
                      const isApproved = p.payoutStatus === 'Approved';
                      return (
                        <tr
                          key={p.id}
                          className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                        >
                          <td className="py-3 px-4 font-mono font-bold text-slate-900 dark:text-white">
                            {p.id}
                          </td>
                          <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                            {formatINR(p.requestedAmount)}
                          </td>
                          <td className="py-3 px-4 text-slate-700 dark:text-slate-300">
                            {p.paymentMethod}
                          </td>
                          <td className="py-3 px-4 font-mono text-[11px] text-slate-500">
                            {p.accountDetails}
                          </td>
                          <td className="py-3 px-4 text-slate-500 dark:text-slate-400">
                            {p.requestDate}
                          </td>
                          <td className="py-3 px-4">
                            <Badge
                              variant={
                                isPaid ? 'success' : isApproved ? 'primary' : isPending ? 'warning' : 'danger'
                              }
                            >
                              {p.payoutStatus}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 font-mono text-[11px] text-blue-600 dark:text-blue-400">
                            {p.paymentReference}
                          </td>
                          <td className="py-3 px-4 text-slate-400 text-[11px]">
                            {p.notes || '-'}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Tab 4: Specialist Clinical Patient Referrals (Doctor to Doctor) */}
      {activeTab === 'clinical' && (
        <Card>
          <CardHeader className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-3">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Inter-Specialist Patient Cross-Referrals
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Refer clinic patients seamlessly to specialist peers across the ClinicOS healthcare network.
              </p>
            </div>

            <Button
              onClick={() => setIsPatientReferModalOpen(true)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-xs"
            >
              <Stethoscope className="w-3.5 h-3.5" />
              <span>+ New Patient Cross-Referral</span>
            </Button>
          </CardHeader>

          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50/75 dark:bg-slate-900/50 text-slate-600 dark:text-slate-400">
                    <th className="py-3 px-4 font-bold">Referral Ref</th>
                    <th className="py-3 px-4 font-bold">Patient Name</th>
                    <th className="py-3 px-4 font-bold">Specialty Required</th>
                    <th className="py-3 px-4 font-bold">Consulting Specialist</th>
                    <th className="py-3 px-4 font-bold">Target Center</th>
                    <th className="py-3 px-4 font-bold">Clinical Reason</th>
                    <th className="py-3 px-4 font-bold">Urgency</th>
                    <th className="py-3 px-4 font-bold">Status</th>
                    <th className="py-3 px-4 font-bold">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {patientReferrals.map((pr) => (
                    <tr
                      key={pr.id}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="py-3 px-4 font-mono font-bold text-slate-900 dark:text-white">
                        {pr.id}
                      </td>
                      <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                        {pr.patientName}
                      </td>
                      <td className="py-3 px-4">
                        <span className="px-2 py-0.5 rounded-md font-semibold bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300">
                          {pr.specialty}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-medium text-slate-800 dark:text-slate-200">
                        {pr.targetDoctor}
                      </td>
                      <td className="py-3 px-4 text-slate-500">
                        {pr.hospital}
                      </td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-300 max-w-xs truncate">
                        {pr.reason}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            pr.urgency === 'High Priority'
                              ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300'
                              : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                          }`}
                        >
                          {pr.urgency}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant={pr.status === 'Consultation Completed' ? 'success' : 'primary'}>
                          {pr.status}
                        </Badge>
                      </td>
                      <td className="py-3 px-4 text-slate-500">{pr.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* MODAL 1: Refer a Colleague / Clinic */}
      {isReferModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-blue-600" />
                  Refer a Colleague Clinic or Hospital
                </h3>
                <p className="text-xs text-slate-500">
                  Sends an official peer recommendation tagged with code &quot;{doctorAffiliate.referralCode}&quot;.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsReferModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitReferral} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Clinic / Hospital Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Multispecialty Hospital"
                  value={newReferralForm.hospitalName}
                  onChange={(e) =>
                    setNewReferralForm({ ...newReferralForm, hospitalName: e.target.value })
                  }
                  className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Contact Doctor / Administrator
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Dr. Rajesh Gupta"
                    value={newReferralForm.contactPerson}
                    onChange={(e) =>
                      setNewReferralForm({ ...newReferralForm, contactPerson: e.target.value })
                    }
                    className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    City / Location
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Pune, Maharashtra"
                    value={newReferralForm.city}
                    onChange={(e) =>
                      setNewReferralForm({ ...newReferralForm, city: e.target.value })
                    }
                    className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Doctor Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. dr.gupta@apexhealth.demo"
                    value={newReferralForm.hospitalEmail}
                    onChange={(e) =>
                      setNewReferralForm({ ...newReferralForm, hospitalEmail: e.target.value })
                    }
                    className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Phone (Optional)
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. +91 98220 33445"
                    value={newReferralForm.phone}
                    onChange={(e) =>
                      setNewReferralForm({ ...newReferralForm, phone: e.target.value })
                    }
                    className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Recommended Subscription Tier
                </label>
                <select
                  value={newReferralForm.subscriptionPlan}
                  onChange={(e) =>
                    setNewReferralForm({ ...newReferralForm, subscriptionPlan: e.target.value })
                  }
                  className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Starter OPD Clinic">Starter OPD Clinic (₹29,990/yr • ₹4,498 Commission)</option>
                  <option value="Professional Multi-Specialty">Professional Multi-Specialty (₹69,990/yr • ₹10,498 Commission)</option>
                  <option value="Enterprise Health System">Enterprise Health System (₹1,49,990/yr • ₹22,498 Commission)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Personal Recommendation Note
                </label>
                <textarea
                  rows={2}
                  placeholder="e.g. We have been using ClinicOS for the past 6 months for OPD scheduling and WhatsApp reminders..."
                  value={newReferralForm.notes}
                  onChange={(e) =>
                    setNewReferralForm({ ...newReferralForm, notes: e.target.value })
                  }
                  className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsReferModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Send Peer Referral</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Request Payout */}
      {isPayoutModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Wallet className="w-5 h-5 text-emerald-600" />
                  Request Incentive Withdrawal
                </h3>
                <p className="text-xs text-slate-500">
                  Available for withdrawal: <strong className="text-emerald-600">{formatINR(doctorAffiliate.availableBalance)}</strong>
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsPayoutModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitPayout} className="space-y-3.5">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    Withdrawal Amount (₹) *
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setPayoutForm({
                        ...payoutForm,
                        amount: String(doctorAffiliate.availableBalance)
                      })
                    }
                    className="text-xs text-blue-600 hover:underline font-bold cursor-pointer"
                  >
                    Withdraw All ({formatINR(doctorAffiliate.availableBalance)})
                  </button>
                </div>
                <input
                  type="number"
                  min="500"
                  max={doctorAffiliate.availableBalance}
                  required
                  value={payoutForm.amount}
                  onChange={(e) => setPayoutForm({ ...payoutForm, amount: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Preferred Payout Method
                </label>
                <select
                  value={payoutForm.paymentMethod}
                  onChange={(e) =>
                    setPayoutForm({ ...payoutForm, paymentMethod: e.target.value })
                  }
                  className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="Bank Transfer (NEFT/IMPS)">Direct Bank Transfer (NEFT/IMPS)</option>
                  <option value="UPI">Instant UPI Transfer</option>
                </select>
              </div>

              {/* Destination Details Preview */}
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs space-y-1">
                <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Disbursement Destination:
                </span>
                {payoutForm.paymentMethod === 'UPI' ? (
                  <div className="font-mono text-emerald-600 dark:text-emerald-400">
                    UPI ID: {doctorAffiliate.bankDetails?.upiId || 'dr.aarav@hdfcbank'}
                  </div>
                ) : (
                  <div>
                    <div>{doctorAffiliate.bankDetails?.bankName} &bull; A/C ...{doctorAffiliate.bankDetails?.accountNumber?.slice(-6)}</div>
                    <div className="text-slate-400 font-mono">IFSC: {doctorAffiliate.bankDetails?.ifscCode}</div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Note / Reference (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Q3 Doctor referral disbursement"
                  value={payoutForm.notes}
                  onChange={(e) => setPayoutForm({ ...payoutForm, notes: e.target.value })}
                  className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsPayoutModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={doctorAffiliate.availableBalance <= 0}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white flex items-center gap-2"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Submit Payout Request</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: Referral Timeline Drawer */}
      {selectedTimelineReferral && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-xl w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
                    {selectedTimelineReferral.id}
                  </span>
                  <Badge
                    variant={
                      selectedTimelineReferral.referralStatus === 'Converted'
                        ? 'success'
                        : selectedTimelineReferral.referralStatus === 'Trial'
                        ? 'warning'
                        : 'secondary'
                    }
                  >
                    {selectedTimelineReferral.referralStatus}
                  </Badge>
                </div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-1">
                  {selectedTimelineReferral.hospitalName}
                </h3>
                <p className="text-xs text-slate-500">
                  {selectedTimelineReferral.city} &bull; Contact: {selectedTimelineReferral.contactPerson}
                </p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedTimelineReferral(null)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Plan & Commission Summary */}
            <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs">
              <div>
                <span className="text-slate-400 block font-medium">Subscription Tier:</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {selectedTimelineReferral.subscriptionPlan}
                </span>
                <span className="block text-[11px] text-slate-500">
                  Annual Fee: {formatINR(selectedTimelineReferral.subscriptionAmount)}
                </span>
              </div>
              <div>
                <span className="text-slate-400 block font-medium">Physician Commission (15%):</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400 text-sm">
                  {formatINR(selectedTimelineReferral.commissionAmount)}
                </span>
                <span className="block text-[11px] text-slate-500">
                  Code: {selectedTimelineReferral.referralCode}
                </span>
              </div>
            </div>

            {/* Timeline Milestones */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
                Lifecycle & Onboarding Milestones
              </h4>
              <div className="space-y-4 relative pl-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-blue-200 dark:before:bg-blue-900">
                {selectedTimelineReferral.timeline?.map((step) => (
                  <div key={step.step} className="relative">
                    <div className="absolute -left-6 top-0.5 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold shadow-xs">
                      {step.step}
                    </div>
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {step.title}
                        </span>
                        <span className="text-[10px] text-slate-400 font-mono">{step.date}</span>
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Advance Timeline Simulator Action */}
            {selectedTimelineReferral.timeline?.length < 7 && (
              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-500">
                  Step {selectedTimelineReferral.timeline?.length} of 7 completed
                </span>
                <Button
                  size="sm"
                  onClick={() => {
                    advanceReferralStage(selectedTimelineReferral.id);
                    // Update local copy
                    setSelectedTimelineReferral((prev) => {
                      const updated = referrals.find((r) => r.id === prev.id);
                      return updated || prev;
                    });
                  }}
                  className="bg-blue-600 hover:bg-blue-700 text-white text-xs flex items-center gap-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Simulate Next Stage</span>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* MODAL 4: New Patient Cross-Referral */}
      {isPatientReferModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Stethoscope className="w-5 h-5 text-blue-600" />
                  Specialist Patient Cross-Referral
                </h3>
                <p className="text-xs text-slate-500">
                  Refer a clinic patient to an affiliated specialist peer.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsPatientReferModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmitPatientReferral} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Patient Name & Demographics *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Kulkarni (48M)"
                  value={patientReferForm.patientName}
                  onChange={(e) =>
                    setPatientReferForm({ ...patientReferForm, patientName: e.target.value })
                  }
                  className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Specialty Required
                  </label>
                  <select
                    value={patientReferForm.specialty}
                    onChange={(e) => {
                      const sp = e.target.value;
                      let doc = 'Dr. Rohan Deshmukh';
                      let hosp = 'MetroHealth Heart Institute';
                      if (sp === 'Dermatology & Cosmetology') {
                        doc = 'Dr. Maya Sharma';
                        hosp = 'Aura Skin & Laser Center';
                      } else if (sp === 'Pediatrics') {
                        doc = 'Dr. Arvind Rao';
                        hosp = 'LittleStars Child Wellness Clinic';
                      }
                      setPatientReferForm({
                        ...patientReferForm,
                        specialty: sp,
                        targetDoctor: doc,
                        hospital: hosp
                      });
                    }}
                    className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Cardiology">Cardiology</option>
                    <option value="Dermatology & Cosmetology">Dermatology & Cosmetology</option>
                    <option value="Pediatrics">Pediatrics</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Target Specialist
                  </label>
                  <input
                    type="text"
                    readOnly
                    value={`${patientReferForm.targetDoctor} (${patientReferForm.hospital})`}
                    className="w-full px-3 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Clinical Diagnosis & Reason *
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="e.g. Uncontrolled hypertension with resting ECG changes; recommend 2D echo workup."
                  value={patientReferForm.reason}
                  onChange={(e) =>
                    setPatientReferForm({ ...patientReferForm, reason: e.target.value })
                  }
                  className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Urgency Level
                </label>
                <select
                  value={patientReferForm.urgency}
                  onChange={(e) =>
                    setPatientReferForm({ ...patientReferForm, urgency: e.target.value })
                  }
                  className="w-full px-3 py-2 text-sm rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Routine">Routine (Within 7-10 days)</option>
                  <option value="Normal">Normal (Within 2-3 days)</option>
                  <option value="High Priority">High Priority (Urgent OPD Slot)</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2.5">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsPatientReferModalOpen(false)}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Dispatch Clinical Referral</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

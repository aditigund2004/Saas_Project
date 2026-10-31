import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import {
  Package,
  Sparkles,
  Search,
  CheckCircle2,
  Clock,
  Calendar,
  AlertCircle,
  Heart,
  Activity,
  User,
  Users,
  ShieldCheck,
  ChevronRight,
  FileText,
  CreditCard,
  Building2,
  Stethoscope,
  Info,
  ArrowRight,
  MessageSquare,
  Flame,
  Filter
} from 'lucide-react';
import {
  DEMO_HEALTH_PACKAGES,
  HEALTH_PACKAGE_CATEGORIES,
  searchPackages
} from '../../demo-data/packagesData';

export function PatientPackagesPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const {
    currentUser,
    familyMembers = [],
    clinics = [],
    doctors = [],
    createAppointment,
    openWhatsAppModal,
    showToast,
    formatCurrency
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Packages');
  const [detailModalPackage, setDetailModalPackage] = useState(null);
  const [bookingModalPackage, setBookingModalPackage] = useState(null);

  // Auto-open modal if package query param is passed
  useEffect(() => {
    const pkgId = searchParams.get('pkg');
    if (pkgId) {
      const match = DEMO_HEALTH_PACKAGES.find((p) => p.id === pkgId);
      if (match) {
        setBookingModalPackage(match);
      }
    }
    const detailsId = searchParams.get('details');
    if (detailsId) {
      const match = DEMO_HEALTH_PACKAGES.find((p) => p.id === detailsId);
      if (match) {
        setDetailModalPackage(match);
      }
    }
    const memberId = searchParams.get('memberId');
    if (memberId) {
      setBookingTarget(memberId);
    }
  }, [searchParams]);

  // Booking Form State
  const [bookingTarget, setBookingTarget] = useState('self');
  const [bookingDate, setBookingDate] = useState(() => {
    const d = new Date(Date.now() + 24 * 60 * 60 * 1000);
    return d.toISOString().slice(0, 10);
  });
  const [bookingTime, setBookingTime] = useState('08:30 AM');
  const [selectedBranchId, setSelectedBranchId] = useState('branch-citycare-main');
  const [paymentMode, setPaymentMode] = useState('pay_at_clinic');
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  const myFamily = familyMembers.filter(
    (m) => m.primaryPatientId === 'pt-1041' || m.primaryPatientId === currentUser?.id
  );

  const filteredPackages = searchPackages(searchQuery, selectedCategory);

  const handleOpenBooking = (pkg) => {
    setBookingModalPackage(pkg);
    setConfirmedBooking(null);
  };

  const handleConfirmPackageBooking = (e) => {
    e.preventDefault();
    if (!bookingModalPackage) return;

    const chosenMember = bookingTarget !== 'self' ? myFamily.find((m) => m.id === bookingTarget) : null;
    const targetPatientName = chosenMember ? chosenMember.name : (currentUser?.name || 'Aarav Patel');
    const targetPatientPhone = chosenMember?.phone || currentUser?.phone || '+91 98765 43210';
    const targetPatientId = chosenMember ? chosenMember.id : (currentUser?.id || 'pt-1041');

    const assignedClinic = clinics[0] || { id: 'clinic-citycare', name: 'CityCare Family Clinic' };
    const assignedDoctor = doctors.find((d) => d.clinicId === assignedClinic.id) || doctors[0] || {
      id: 'doc-aarav-mehta',
      name: 'Dr. Aarav Mehta'
    };

    const newApt = createAppointment({
      clinicId: assignedClinic.id,
      clinicName: assignedClinic.name,
      branchId: selectedBranchId,
      doctorId: assignedDoctor.id,
      doctorName: assignedDoctor.name,
      patientId: targetPatientId,
      patientName: targetPatientName,
      patientPhone: targetPatientPhone,
      patientEmail: currentUser?.email || 'patient@demo.io',
      serviceId: bookingModalPackage.id,
      serviceName: bookingModalPackage.name,
      consultationFee: bookingModalPackage.price,
      consultationType: 'Preventive Health Checkup',
      date: bookingDate,
      time: bookingTime,
      durationMinutes: bookingModalPackage.durationMinutes,
      isHealthPackage: true,
      packageName: bookingModalPackage.name,
      packageParametersCount: bookingModalPackage.parametersCount,
      bookingFor: bookingTarget === 'self' ? 'Self' : (chosenMember?.relationship || 'Family Member'),
      relationship: chosenMember?.relationship || 'Self',
      paymentMode,
      paymentStatus: paymentMode === 'pay_now_simulated' ? 'Paid' : 'Pending Counter Collection',
      status: 'Confirmed',
      notes: `Booked ${bookingModalPackage.name} (${bookingModalPackage.parametersCount} tests). ${bookingModalPackage.fastingNote}`
    });

    if (newApt) {
      setConfirmedBooking({
        ...newApt,
        pkg: bookingModalPackage,
        patientName: targetPatientName,
        relationship: chosenMember?.relationship || 'Self'
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-800 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-pulse" />
              Preventive Healthcare & Diagnostics
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Health Checkup Packages
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl">
            NABL-accredited full-body diagnostic panels with same-day digital reports, complete organ function screens, and senior physician consultations.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/patient/family">
            <Button variant="outline" size="sm" className="text-xs">
              <Users className="w-3.5 h-3.5 mr-1 text-purple-600 dark:text-purple-400" />
              Book for Family ({myFamily.length}/4)
            </Button>
          </Link>
          <Link to="/patient/appointments">
            <Button variant="secondary" size="sm" className="text-xs">
              <Calendar className="w-3.5 h-3.5 mr-1" />
              My Bookings
            </Button>
          </Link>
        </div>
      </div>

      {/* Feature Highlights Banner */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
        <div className="p-3 rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 flex items-center gap-2.5 shadow-2xs">
          <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 font-bold">
            🧪
          </div>
          <div>
            <strong className="block text-slate-900 dark:text-slate-100">70+ Biomarkers</strong>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">NABL certified lab panels</span>
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 flex items-center gap-2.5 shadow-2xs">
          <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 font-bold">
            ⚡
          </div>
          <div>
            <strong className="block text-slate-900 dark:text-slate-100">Same-Day Reports</strong>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Verified digital PDF in 6 hrs</span>
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 flex items-center gap-2.5 shadow-2xs">
          <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0 font-bold">
            🩺
          </div>
          <div>
            <strong className="block text-slate-900 dark:text-slate-100">Doctor Included</strong>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Physical exam & diet consult</span>
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-md border border-slate-200/80 dark:border-slate-800 flex items-center gap-2.5 shadow-2xs">
          <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 font-bold">
            💰
          </div>
          <div>
            <strong className="block text-slate-900 dark:text-slate-100">Up to 46% Off</strong>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Bundled preventative pricing</span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search checkup packages by name, test (e.g. ECG, HbA1c, Liver, Full Body)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {HEALTH_PACKAGE_CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/80 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3-Column Responsive Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredPackages.map((pkg) => {
          return (
            <Card
              key={pkg.id}
              hover
              className="flex flex-col justify-between p-5 sm:p-6 transition-all duration-300 relative group"
            >
              {/* Ambient Glow Aura */}
              <div className="absolute top-0 right-0 -mr-16 -mt-16 w-36 h-36 rounded-full bg-blue-500/10 dark:bg-blue-500/15 blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

              <div>
                {/* Header Tag / Badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-900/60 font-mono">
                    {pkg.category}
                  </span>
                  {pkg.badge && (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500 text-white border border-amber-600 flex items-center gap-1 shadow-xs">
                      <Flame className="w-3 h-3 text-white fill-white" />
                      {pkg.badge}
                    </span>
                  )}
                </div>

                {/* Package Name & Tagline */}
                <h3 className="text-base sm:text-lg font-black text-[#172033] dark:text-[#F1F5F9] tracking-tight leading-snug group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {pkg.name}
                </h3>
                <p className="text-xs text-[#64748B] dark:text-[#94A3B8] mt-1 line-clamp-2 leading-relaxed">
                  {pkg.tagline}
                </p>

                {/* Pricing Block */}
                <div className="mt-4 p-3 rounded-2xl bg-[#F8FAFF] dark:bg-slate-800/50 border border-[#E2E8F0] dark:border-slate-800 flex items-baseline justify-between">
                  <div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl font-black text-[#172033] dark:text-[#F1F5F9] font-mono">
                        {formatCurrency(pkg.price)}
                      </span>
                      <span className="text-xs text-[#94A3B8] line-through font-mono">
                        {formatCurrency(pkg.originalPrice)}
                      </span>
                    </div>
                    <span className="text-[10px] font-bold text-[#059669] dark:text-emerald-400 block mt-0.5">
                      Save {formatCurrency(pkg.savingsAmount)} ({pkg.savingsPercentage}% Off)
                    </span>
                  </div>

                  <div className="text-right">
                    <span className="inline-block px-2.5 py-1 rounded-xl bg-blue-600 text-white font-mono font-bold text-xs shadow-2xs">
                      {pkg.parametersCount} Tests
                    </span>
                  </div>
                </div>

                {/* Key Inclusions Highlights */}
                <div className="mt-4 space-y-2 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-700 dark:text-slate-300 font-semibold">
                    <Activity className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                    <span>Included Organ & Health Profiles:</span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {pkg.inclusions.slice(0, 4).map((inc, i) => (
                      <span
                        key={i}
                        className="text-[11px] px-2 py-0.5 rounded-lg bg-[#F1F5F9] dark:bg-slate-800 text-[#334155] dark:text-slate-300 border border-slate-200/80 dark:border-slate-700/60 font-medium"
                      >
                        {inc.category.split('(')[0].trim()}
                      </span>
                    ))}
                    {pkg.inclusions.length > 4 && (
                      <span className="text-[11px] px-2 py-0.5 rounded-lg bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 font-semibold">
                        +{pkg.inclusions.length - 4} more
                      </span>
                    )}
                  </div>
                </div>

                {/* Logistics & Timing Pills */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 grid grid-cols-2 gap-2 text-[11px] text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                    <span>{pkg.fastingHours}h Fasting Req.</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{pkg.reportTurnaround}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setDetailModalPackage(pkg)}
                  className="text-xs font-semibold"
                >
                  View Details
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => handleOpenBooking(pkg)}
                  className="text-xs font-bold shadow-md shadow-blue-500/20"
                >
                  Book Package &rarr;
                </Button>
              </div>
            </Card>
          );
        })}
      </div>

      {filteredPackages.length === 0 && (
        <Card className="p-12 text-center text-slate-500 dark:text-slate-400">
          <Package className="w-12 h-12 mx-auto mb-2 text-slate-300 dark:text-slate-600" />
          <h3 className="font-bold text-base text-slate-800 dark:text-slate-200">No Packages Match Your Search</h3>
          <p className="text-xs mt-1">Try clearing your search query or picking "All Packages".</p>
          <div className="pt-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All Packages');
              }}
            >
              Reset Filters
            </Button>
          </div>
        </Card>
      )}

      {/* Package Detail Modal */}
      {detailModalPackage && (
        <Modal
          isOpen={!!detailModalPackage}
          onClose={() => setDetailModalPackage(null)}
          title={`${detailModalPackage.name}`}
          size="lg"
        >
          <div className="space-y-5 text-xs sm:text-sm">
            {/* Top Overview & Pricing Banner */}
            <div className="p-4 sm:p-5 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-slate-800/90 dark:to-blue-950/40 border border-blue-200/80 dark:border-blue-900/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300 font-mono block">
                  {detailModalPackage.category} · {detailModalPackage.parametersCount} Tests Included
                </span>
                <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 max-w-md">
                  {detailModalPackage.overview}
                </p>
              </div>

              <div className="text-left sm:text-right shrink-0">
                <div className="flex items-baseline gap-2 sm:justify-end">
                  <span className="text-2xl font-black text-blue-700 dark:text-blue-400 font-mono">
                    {formatCurrency(detailModalPackage.price)}
                  </span>
                  <span className="text-xs text-slate-400 line-through font-mono">
                    {formatCurrency(detailModalPackage.originalPrice)}
                  </span>
                </div>
                <span className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 block mt-0.5">
                  Save {formatCurrency(detailModalPackage.savingsAmount)} ({detailModalPackage.savingsPercentage}% Off)
                </span>
              </div>
            </div>

            {/* Preparation & Instructions Callout */}
            <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-xs space-y-1">
              <strong className="block font-bold flex items-center gap-1.5">
                <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                Preparation & Fasting Guidelines:
              </strong>
              <ul className="list-disc pl-5 space-y-0.5 text-[11px] text-amber-850 dark:text-amber-300">
                {detailModalPackage.preparationInstructions.map((inst, i) => (
                  <li key={i}>{inst}</li>
                ))}
              </ul>
            </div>

            {/* Inclusions Accordion / Sections */}
            <div className="space-y-3">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                <Activity className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Detailed Diagnostic Inclusions ({detailModalPackage.parametersCount} Parameters)
              </h4>

              <div className="space-y-2 max-h-[340px] overflow-y-auto pr-1">
                {detailModalPackage.inclusions.map((sec, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 space-y-1.5"
                  >
                    <div className="flex items-center justify-between text-xs font-bold text-slate-900 dark:text-slate-100">
                      <span>{sec.category}</span>
                      <span className="font-mono text-blue-600 dark:text-blue-400">{sec.count} tests</span>
                    </div>
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[11px] text-slate-600 dark:text-slate-300 pt-1">
                      {sec.tests.map((test, ti) => (
                        <li key={ti} className="flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                          <span>{test}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Footer Actions */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-2.5">
              <Button variant="outline" size="sm" onClick={() => setDetailModalPackage(null)}>
                Close
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={() => {
                  const p = detailModalPackage;
                  setDetailModalPackage(null);
                  handleOpenBooking(p);
                }}
                className="font-bold shadow-md shadow-blue-500/20"
              >
                Proceed to Book ({formatCurrency(detailModalPackage.price)}) &rarr;
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Booking Health Package Modal */}
      {bookingModalPackage && (
        <Modal
          isOpen={!!bookingModalPackage}
          onClose={() => setBookingModalPackage(null)}
          title={`Book: ${bookingModalPackage.name}`}
          size="md"
        >
          {!confirmedBooking ? (
            <form onSubmit={handleConfirmPackageBooking} className="space-y-4 text-xs sm:text-sm">
              <div className="p-3 rounded-xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-xs text-blue-950 dark:text-blue-200 flex items-center justify-between">
                <div>
                  <span className="font-bold block">{bookingModalPackage.name}</span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    {bookingModalPackage.parametersCount} tests · {bookingModalPackage.durationLabel}
                  </span>
                </div>
                <span className="text-base font-black font-mono text-blue-700 dark:text-blue-400">
                  {formatCurrency(bookingModalPackage.price)}
                </span>
              </div>

              {/* Who is this package for? (Myself or Family Member) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Who is this checkup for?
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setBookingTarget('self')}
                    className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                      bookingTarget === 'self'
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/50 text-blue-900 dark:text-blue-200 ring-2 ring-blue-500/20 font-bold'
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span className="block text-xs">Myself</span>
                    <span className="text-[10px] text-slate-400 font-normal">Primary Account</span>
                  </button>

                  {myFamily.map((mem) => (
                    <button
                      key={mem.id}
                      type="button"
                      onClick={() => setBookingTarget(mem.id)}
                      className={`p-2.5 rounded-xl border text-left transition-all cursor-pointer ${
                        bookingTarget === mem.id
                          ? 'border-purple-600 bg-purple-50 dark:bg-purple-950/50 text-purple-900 dark:text-purple-200 ring-2 ring-purple-500/20 font-bold'
                          : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      <span className="block text-xs truncate">{mem.name}</span>
                      <span className="text-[10px] text-purple-600 dark:text-purple-400 font-semibold">{mem.relationship}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Date & Time selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Checkup Date *
                  </label>
                  <input
                    type="date"
                    required
                    min={new Date().toISOString().slice(0, 10)}
                    value={bookingDate}
                    onChange={(e) => setBookingDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Morning Fasting Slot *
                  </label>
                  <select
                    value={bookingTime}
                    onChange={(e) => setBookingTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs"
                  >
                    <option value="08:00 AM">08:00 AM (Early Fasting Slot)</option>
                    <option value="08:30 AM">08:30 AM (Recommended)</option>
                    <option value="09:00 AM">09:00 AM</option>
                    <option value="09:30 AM">09:30 AM</option>
                    <option value="10:00 AM">10:00 AM</option>
                    <option value="10:30 AM">10:30 AM (Last Morning Fasting Slot)</option>
                  </select>
                </div>
              </div>

              {/* Branch */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Select Clinic Branch
                </label>
                <select
                  value={selectedBranchId}
                  onChange={(e) => setSelectedBranchId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs"
                >
                  <option value="branch-citycare-main">CityCare FC Road Main Hospital & Pathology Center</option>
                  <option value="branch-citycare-kothrud">CityCare Kothrud Diagnostic Center</option>
                </select>
              </div>

              {/* Payment Mode */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Payment Mode
                </label>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setPaymentMode('pay_at_clinic')}
                    className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                      paymentMode === 'pay_at_clinic'
                        ? 'border-blue-600 bg-blue-50 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 font-bold'
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span>Pay at Clinic Counter</span>
                    <span className="block text-[10px] text-slate-400 font-normal">UPI, Card, or Cash on visit</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMode('pay_now_simulated')}
                    className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                      paymentMode === 'pay_now_simulated'
                        ? 'border-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-900 dark:text-emerald-200 font-bold'
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span>Prepay Online (Simulated)</span>
                    <span className="block text-[10px] text-slate-400 font-normal">Instant digital receipt</span>
                  </button>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <Button variant="outline" size="sm" type="button" onClick={() => setBookingModalPackage(null)}>
                  Cancel
                </Button>
                <Button variant="primary" size="md" type="submit" className="font-bold shadow-md shadow-blue-500/20">
                  Confirm Checkup Booking &rarr;
                </Button>
              </div>
            </form>
          ) : (
            /* Confirmation Success State */
            <div className="text-center space-y-4 py-2">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-9 h-9" />
              </div>

              <div>
                <h3 className="text-xl font-black text-slate-900 dark:text-white">Checkup Package Booked!</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                  Reference code: <strong className="font-mono text-blue-600 dark:text-blue-400">{confirmedBooking.referenceNumber}</strong>
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-xs text-left space-y-2">
                <div className="flex justify-between items-center pb-1.5 border-b border-slate-200 dark:border-slate-700">
                  <span className="text-slate-500 dark:text-slate-400">Package:</span>
                  <strong className="text-slate-900 dark:text-white">{confirmedBooking.pkg?.name}</strong>
                </div>
                <div className="flex justify-between items-center pb-1.5 border-b border-slate-200 dark:border-slate-700">
                  <span className="text-slate-500 dark:text-slate-400">Patient:</span>
                  <strong className="text-slate-900 dark:text-white">
                    {confirmedBooking.patientName} {confirmedBooking.relationship !== 'Self' ? `(${confirmedBooking.relationship})` : ''}
                  </strong>
                </div>
                <div className="flex justify-between items-center pb-1.5 border-b border-slate-200 dark:border-slate-700">
                  <span className="text-slate-500 dark:text-slate-400">Date & Slot:</span>
                  <strong className="font-mono text-blue-600 dark:text-blue-400">
                    {confirmedBooking.date} at {confirmedBooking.time}
                  </strong>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 dark:text-slate-400">Total Tariff:</span>
                  <strong className="text-sm font-mono text-slate-900 dark:text-white">
                    {formatCurrency(confirmedBooking.consultationFee)}
                  </strong>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-[11px] text-amber-900 dark:text-amber-200 text-left">
                ⚠️ <strong>Fasting Reminder:</strong> Please remember to maintain 10-12 hours overnight fasting before your {confirmedBooking.time} checkup. Water is allowed.
              </div>

              <div className="pt-2 flex flex-col sm:flex-row justify-center gap-2">
                <Button
                  variant="whatsapp"
                  size="sm"
                  onClick={() =>
                    openWhatsAppModal({
                      patient_name: confirmedBooking.patientName,
                      clinic_name: 'CityCare Family Clinic & Diagnostics',
                      appointment_date: confirmedBooking.date,
                      appointment_time: confirmedBooking.time,
                      doctor_name: `Health Checkup (${confirmedBooking.pkg?.name})`,
                      appointment_reference: confirmedBooking.referenceNumber,
                      clinic_phone: '+91 98220 11223'
                    })
                  }
                  className="text-xs"
                >
                  <MessageSquare className="w-3.5 h-3.5 mr-1" /> WhatsApp Preparation Slip
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    setBookingModalPackage(null);
                    setConfirmedBooking(null);
                  }}
                  className="text-xs"
                >
                  Done
                </Button>
              </div>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
}

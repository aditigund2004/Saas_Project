import React from 'react';
import { Outlet, useParams, Link, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Calendar,
  Shield,
<<<<<<< HEAD
  ExternalLink,
  ChevronRight,
  Menu,
  X,
  Sparkles,
  User,
  LogIn,
  UserPlus
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { FontSizeSwitcher } from '../../components/ui/FontSizeSwitcher';
import { ThemeSwitcher } from '../../components/ui/ThemeSwitcher';
=======
  ChevronRight,
  Menu,
  X,
  User,
  UserPlus,
  UserCheck,
  Stethoscope,
  ArrowUp,
  Lock,
  Award
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
>>>>>>> origin/main
import { getDefaultWebsiteSettings } from '../website-builder/websiteBuilderDefaults';

export function PublicClinicLayout() {
  const { clinicSlug } = useParams();
<<<<<<< HEAD
  const { clinics, currentRole } = useApp();
=======
  const { clinics } = useApp();
>>>>>>> origin/main
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const clinic = clinics.find((c) => c.slug === clinicSlug || c.id === clinicSlug) || clinics[0];
  const settings = clinic.websiteSettings || getDefaultWebsiteSettings(clinic);

  const primaryColor = settings.primaryColor || '#2563eb';
  const isMinimal = settings.template === 'minimal';
  const isPremium = settings.template === 'premium';

  const navLinks = [
    { name: 'Overview', path: `/clinic/${clinic.slug}` },
    { name: 'About Practice', path: `/clinic/${clinic.slug}/about` },
    { name: 'Doctors Roster', path: `/clinic/${clinic.slug}/doctors` },
    { name: 'Services & Fees', path: `/clinic/${clinic.slug}/services` },
<<<<<<< HEAD
    { name: 'Pharmacy Store', path: `/clinic/${clinic.slug}/pharmacy` },
    { name: 'Health Education', path: `/clinic/${clinic.slug}/education` },
    { name: 'Emergency Helpline', path: `/clinic/${clinic.slug}/emergency` },
=======
>>>>>>> origin/main
    { name: 'Hours & Contact', path: `/clinic/${clinic.slug}/contact` }
  ];

  const isActive = (path) => {
    if (path === `/clinic/${clinic.slug}`) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div
<<<<<<< HEAD
      className="min-h-screen flex flex-col bg-[#F4F7FC] dark:bg-[#080F1E] text-slate-900 dark:text-[#F1F5F9] transition-colors"
=======
      className={`min-h-screen flex flex-col ${
        isPremium
          ? 'bg-slate-950 text-slate-100'
          : isMinimal
          ? 'bg-stone-50 text-stone-900'
          : 'bg-white text-slate-900'
      }`}
>>>>>>> origin/main
      style={{
        fontFamily:
          settings.fontFamily === 'Playfair Display'
            ? 'serif'
            : settings.fontFamily === 'Outfit'
            ? 'sans-serif'
            : 'inherit'
      }}
    >
      {/* Top Clinical Announcement Bar */}
<<<<<<< HEAD
      <div className="px-4 py-2 text-xs border-b bg-white dark:bg-[#0D1729] border-slate-200 dark:border-[#263B59] text-slate-600 dark:text-[#CBD5E1]">
=======
      <div
        className={`px-4 py-2 text-xs border-b ${
          isPremium
            ? 'bg-slate-900 border-slate-800 text-slate-300'
            : isMinimal
            ? 'bg-stone-100 border-stone-200 text-stone-700'
            : 'bg-slate-50 border-slate-200 text-slate-600'
        }`}
      >
>>>>>>> origin/main
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1.5 font-medium">
              <MapPin className="w-3.5 h-3.5 text-blue-500" />
              {clinic.locality ? `${clinic.locality}, ` : ''}{clinic.city}
            </span>
            <span className="hidden sm:flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-500" />
              {clinic.operatingHours}
            </span>
<<<<<<< HEAD
            <Link
              to={`/clinic/${clinic.slug}/emergency`}
              className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-red-600 text-white hover:bg-red-700 flex items-center gap-1 shadow-2xs"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
              <span>Emergency 24/7 (108 / 112)</span>
            </Link>
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <span className="font-semibold flex items-center gap-1">
=======
          </div>

          <div className="flex items-center gap-3 text-[11px] flex-wrap">
            <span className="font-semibold flex items-center gap-1 text-slate-700 dark:text-slate-300">
>>>>>>> origin/main
              <Phone className="w-3.5 h-3.5 text-emerald-500" />
              {clinic.phone}
            </span>
            <span className="hidden md:inline text-slate-300 dark:text-slate-700">|</span>
<<<<<<< HEAD
            {currentRole === 'patient' ? (
              <Link
                to="/patient/dashboard"
                className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
              >
                <User className="w-3.5 h-3.5" />
                <span>My Patient Portal →</span>
              </Link>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to={`/clinic/${clinic.slug}/signin`}
                  className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                >
                  <LogIn className="w-3 h-3" />
                  <span>Patient Sign In</span>
                </Link>
                <span className="text-slate-300 dark:text-slate-700">•</span>
                <Link
                  to={`/clinic/${clinic.slug}/register`}
                  className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                >
                  <UserPlus className="w-3 h-3" />
                  <span>Register</span>
                </Link>
              </div>
            )}
            <span className="hidden md:inline text-slate-300 dark:text-slate-700">|</span>
            <Link
              to="/clinic/dashboard"
              className="text-[11px] font-medium text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:underline flex items-center gap-1"
            >
              Doctor Workspace Portal →
            </Link>
            <span className="hidden sm:inline text-slate-300 dark:text-slate-700">|</span>
            <div className="hidden sm:flex items-center gap-2">
              <FontSizeSwitcher variant="dropdown" />
              <ThemeSwitcher variant="segmented" />
            </div>
=======
            <Link
              to="/login/receptionist"
              className="font-medium text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 transition-colors"
            >
              <UserCheck className="w-3.5 h-3.5 text-blue-500" />
              <span>Front Desk Sign In</span>
            </Link>
            <span className="hidden md:inline text-slate-300 dark:text-slate-700">|</span>
            <Link
              to="/login/doctor"
              className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <Stethoscope className="w-3.5 h-3.5" />
              <span>Doctor Portal →</span>
            </Link>
>>>>>>> origin/main
          </div>
        </div>
      </div>

      {/* Main Clinic Header */}
<<<<<<< HEAD
      <header className="sticky top-0 z-40 backdrop-blur-md border-b bg-white/95 dark:bg-[#080F1E]/95 border-slate-200 dark:border-[#263B59]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Clinic Logo & Brand */}
            <Link to={`/clinic/${clinic.slug}`} className="flex items-center gap-3 group shrink-0">
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center text-white font-extrabold text-lg shadow-md group-hover:scale-105 transition-transform shrink-0"
=======
      <header
        className={`sticky top-0 z-40 backdrop-blur-md border-b ${
          isPremium
            ? 'bg-slate-950/95 border-slate-800'
            : isMinimal
            ? 'bg-stone-50/95 border-stone-200'
            : 'bg-white/95 border-slate-200'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Clinic Logo & Brand */}
            <Link to={`/clinic/${clinic.slug}`} className="flex items-center gap-3 group">
              <div
                className="w-11 h-11 rounded-2xl flex items-center justify-center text-white font-extrabold text-lg shadow-md group-hover:scale-105 transition-transform"
>>>>>>> origin/main
                style={{ backgroundColor: primaryColor }}
              >
                {clinic.logo && clinic.logo.length <= 2 ? clinic.logo : clinic.name.charAt(0)}
              </div>
<<<<<<< HEAD
              <div className="min-w-0">
                <h1 className="text-base sm:text-lg font-extrabold tracking-tight block leading-tight truncate text-slate-900 dark:text-[#F1F5F9]">
                  {clinic.name}
                </h1>
                <p className="text-xs text-slate-500 dark:text-[#94A3B8] font-medium truncate">
=======
              <div>
                <h1 className="text-base sm:text-lg font-extrabold tracking-tight block leading-tight">
                  {clinic.name}
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
>>>>>>> origin/main
                  {clinic.specialty} Practice · Verified Healthcare
                </p>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
<<<<<<< HEAD
            <nav className="hidden lg:flex items-center gap-1 min-w-0">
=======
            <nav className="hidden lg:flex items-center gap-1">
>>>>>>> origin/main
              {navLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
<<<<<<< HEAD
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap ${
                    isActive(item.path)
                      ? 'bg-blue-50 text-blue-700 dark:bg-[#172640] dark:text-[#22D3EE] font-bold border border-blue-200 dark:border-[#263B59]'
                      : 'text-slate-600 dark:text-[#CBD5E1] hover:text-slate-900 dark:hover:text-[#F1F5F9] hover:bg-slate-100 dark:hover:bg-[#172640]/50'
=======
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive(item.path)
                      ? isPremium
                        ? 'bg-slate-800 text-white font-bold'
                        : 'bg-slate-100 text-blue-600 font-bold'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
>>>>>>> origin/main
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* CTAs */}
<<<<<<< HEAD
            <div className="hidden sm:flex items-center gap-2.5 shrink-0">
              {currentRole === 'patient' ? (
                <Link to="/patient/dashboard">
                  <Button
                    variant="outline"
                    size="md"
                    className="font-bold text-xs border-emerald-500/60 text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 flex items-center gap-1.5"
                  >
                    <User className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
                    <span>My Patient Portal</span>
                  </Button>
                </Link>
              ) : (
                <div className="flex items-center gap-1.5">
                  <Link to={`/clinic/${clinic.slug}/signin`}>
                    <Button
                      variant="outline"
                      size="md"
                      className="font-bold text-xs border-slate-200 dark:border-[#263B59] bg-white dark:bg-[#111E33] hover:bg-slate-50 dark:hover:bg-[#172640] text-slate-800 dark:text-[#F1F5F9] flex items-center gap-1.5"
                    >
                      <LogIn className="w-3.5 h-3.5 text-blue-600 dark:text-[#3B82F6]" />
                      <span>Sign In</span>
                    </Button>
                  </Link>
                  <Link to={`/clinic/${clinic.slug}/register`}>
                    <Button
                      variant="outline"
                      size="md"
                      className="font-bold text-xs border-blue-200 dark:border-[#3B82F6]/60 bg-blue-50 dark:bg-[#172640] text-blue-700 dark:text-[#22D3EE] hover:bg-blue-100 dark:hover:bg-[#172640]/80 flex items-center gap-1.5"
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      <span>Register</span>
                    </Button>
                  </Link>
                </div>
              )}
=======
            <div className="hidden sm:flex items-center gap-2">
              <Link
                to="/login/patient"
                className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  isPremium
                    ? 'text-slate-300 hover:text-white hover:bg-slate-800'
                    : 'text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <User className="w-3.5 h-3.5 text-slate-400" />
                <span>Patient Sign In</span>
              </Link>
              <Link
                to="/register/patient"
                className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  isPremium
                    ? 'text-blue-400 bg-blue-950/60 hover:bg-blue-900/60 border border-blue-800'
                    : 'text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200 dark:border-blue-800'
                }`}
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Patient Registration</span>
              </Link>
>>>>>>> origin/main
              <Link to={`/clinic/${clinic.slug}/book-appointment`}>
                <Button
                  variant="primary"
                  size="md"
                  className="font-bold text-xs shadow-md text-white"
                  style={{ backgroundColor: primaryColor }}
                >
                  <Calendar className="w-3.5 h-3.5 mr-1.5" />
                  Book Appointment
                </Button>
              </Link>
            </div>

            {/* Mobile menu trigger */}
            <div className="lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu drawer */}
        {mobileMenuOpen && (
<<<<<<< HEAD
          <div className="lg:hidden px-4 pt-2 pb-6 space-y-2 border-b bg-white dark:bg-[#0D1729] border-slate-200 dark:border-[#263B59]">
=======
          <div
            className={`lg:hidden px-4 pt-2 pb-6 space-y-2 border-b ${
              isPremium ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
>>>>>>> origin/main
            {navLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3.5 py-2 rounded-xl text-xs font-semibold ${
                  isActive(item.path)
<<<<<<< HEAD
                    ? 'bg-blue-50 text-blue-700 dark:bg-[#172640] dark:text-[#22D3EE] font-bold'
                    : 'text-slate-700 dark:text-[#CBD5E1] hover:bg-slate-100 dark:hover:bg-[#172640]'
=======
                    ? 'bg-blue-50 text-blue-600 font-bold'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50'
>>>>>>> origin/main
                }`}
              >
                {item.name}
              </Link>
            ))}
<<<<<<< HEAD
            <div className="pt-3 border-t border-slate-200 dark:border-[#263B59] space-y-2">
              <Link
                to={`/clinic/${clinic.slug}/signin`}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-800 dark:text-[#F1F5F9] bg-slate-50 dark:bg-[#111E33] border border-slate-200 dark:border-[#263B59]"
              >
                <LogIn className="w-4 h-4 text-blue-600 dark:text-[#3B82F6]" />
                <span>Patient Sign In</span>
              </Link>
              <Link
                to={`/clinic/${clinic.slug}/register`}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold text-blue-700 dark:text-[#22D3EE] bg-blue-50 dark:bg-[#172640] border border-blue-200 dark:border-[#263B59]"
              >
                <UserPlus className="w-4 h-4 text-blue-600 dark:text-[#22D3EE]" />
                <span>Register Patient Account</span>
              </Link>
              <Link
                to="/patient/dashboard"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800"
              >
                <User className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Go to Patient Portal</span>
              </Link>
              <div className="pt-2 flex items-center justify-between px-1">
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Theme:</span>
                <ThemeSwitcher variant="segmented" />
              </div>
              <div className="pt-1 flex items-center justify-between px-1">
                <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">Text Size:</span>
                <FontSizeSwitcher variant="segmented" />
              </div>
              <div className="pt-1">
                <Link
                  to={`/clinic/${clinic.slug}/book-appointment`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Button
                    variant="primary"
                    size="md"
                    className="w-full font-bold text-xs shadow-md text-white"
                    style={{ backgroundColor: primaryColor }}
                  >
                    Book Appointment
                  </Button>
                </Link>
              </div>
=======
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
              <Link
                to="/login/patient"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-100 bg-slate-100 dark:bg-slate-800"
              >
                <User className="w-4 h-4 text-slate-500" />
                <span>Patient Sign In</span>
              </Link>
              <Link
                to="/register/patient"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800"
              >
                <UserPlus className="w-4 h-4" />
                <span>Patient Registration</span>
              </Link>
              <Link
                to="/login/receptionist"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full flex items-center justify-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
              >
                <UserCheck className="w-4 h-4 text-blue-500" />
                <span>Front Desk Sign In</span>
              </Link>
              <Link
                to={`/clinic/${clinic.slug}/book-appointment`}
                onClick={() => setMobileMenuOpen(false)}
                className="block pt-1"
              >
                <Button
                  variant="primary"
                  size="md"
                  className="w-full font-bold text-xs shadow-md text-white justify-center"
                  style={{ backgroundColor: primaryColor }}
                >
                  <Calendar className="w-3.5 h-3.5 mr-1.5" />
                  Book Appointment
                </Button>
              </Link>
>>>>>>> origin/main
            </div>
          </div>
        )}
      </header>

      {/* Main Page Slot */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Dedicated Patient-Facing Footer */}
<<<<<<< HEAD
      <footer className="mt-16 border-t bg-white dark:bg-[#0D1729] border-slate-200 dark:border-[#263B59] text-slate-600 dark:text-[#CBD5E1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3 md:col-span-2">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-sm"
=======
      <footer className="mt-16 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-slate-300 border-t border-slate-800 shadow-2xl relative overflow-hidden">
        {/* Subtle top ambient accent line */}
        <div
          className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-blue-500/70 to-transparent pointer-events-none"
          style={{
            background: `linear-gradient(to right, transparent, ${primaryColor}, transparent)`
          }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-12 gap-8 lg:gap-10">
            {/* 1. Clinic Branding & Accreditations (4 cols) */}
            <div className="space-y-4 md:col-span-4">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center text-white font-extrabold text-base shadow-md ring-2 ring-white/10 shrink-0"
>>>>>>> origin/main
                  style={{ backgroundColor: primaryColor }}
                >
                  {clinic.logo && clinic.logo.length <= 2 ? clinic.logo : clinic.name.charAt(0)}
                </div>
<<<<<<< HEAD
                <span className="text-base font-bold text-slate-900 dark:text-white">{clinic.name}</span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md leading-relaxed">
                {clinic.tagline}
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Verified Private Healthcare Practice · Operating with standard hygiene & sterilisation</span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <h3 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">Contact & Hours</h3>
              <p className="text-slate-600 dark:text-slate-400">📍 {clinic.address}, {clinic.city}</p>
              <p className="text-slate-600 dark:text-slate-400">📞 {clinic.phone}</p>
              <p className="text-slate-600 dark:text-slate-400">✉️ {clinic.email}</p>
              <p className="text-slate-600 dark:text-slate-400">🕒 {clinic.operatingHours}</p>
            </div>

            <div className="space-y-2 text-xs">
              <h3 className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">Quick Actions</h3>
              <ul className="space-y-1.5">
                <li>
                  <Link to={`/clinic/${clinic.slug}/signin`} className="text-emerald-600 dark:text-emerald-400 hover:underline font-semibold flex items-center gap-1">
                    <User className="w-3 h-3" /> Patient Portal Sign In
                  </Link>
                </li>
                <li>
                  <Link to={`/clinic/${clinic.slug}/register`} className="text-blue-600 dark:text-blue-400 hover:underline font-semibold flex items-center gap-1">
                    <UserPlus className="w-3 h-3" /> New Patient Registration
                  </Link>
                </li>
                <li>
                  <Link to={`/clinic/${clinic.slug}/book-appointment`} className="text-blue-600 dark:text-slate-300 hover:underline">
                    Book Consultation Slot →
                  </Link>
                </li>
                <li>
                  <Link to={`/clinic/${clinic.slug}/doctors`} className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
=======
                <div>
                  <span className="text-lg font-extrabold text-white tracking-tight block">
                    {clinic.name}
                  </span>
                  <span className="inline-block px-2 py-0.2 rounded-full text-[10px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/30">
                    {clinic.specialty} Practice
                  </span>
                </div>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                {clinic.tagline || clinic.description || 'Providing compassionate, evidence-based outpatient consultations and verified digital healthcare.'}
              </p>

              <div className="space-y-2 pt-1">
                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-800/70 border border-slate-700/60 text-xs text-slate-300">
                  <Shield className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="text-[11px] font-medium leading-tight">
                    Verified Healthcare Practice · Standards & Sterilisation Adherence
                  </span>
                </div>

                <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-800/70 border border-slate-700/60 text-xs text-slate-300">
                  <Award className="w-4 h-4 text-amber-400 shrink-0" />
                  <span className="text-[11px] font-medium leading-tight">
                    Tamper-Evident QR Digital Prescriptions & WhatsApp Alerts
                  </span>
                </div>
              </div>
            </div>

            {/* 2. Contact & Timings (3 cols) */}
            <div className="space-y-3 md:col-span-3">
              <h3 className="font-extrabold text-white text-xs uppercase tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-3.5 rounded-full bg-blue-500" />
                Contact & Timings
              </h3>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-start gap-2.5 text-slate-300">
                  <MapPin className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                  <span className="leading-snug">
                    {clinic.locality ? `${clinic.locality}, ` : ''}{clinic.address}, {clinic.city}
                  </span>
                </div>

                <div className="flex items-center gap-2.5">
                  <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                  <a
                    href={`tel:${clinic.phone}`}
                    className="text-white hover:text-emerald-400 font-bold transition-colors"
                  >
                    {clinic.phone}
                  </a>
                </div>

                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                  <a
                    href={`mailto:${clinic.email}`}
                    className="text-slate-300 hover:text-sky-300 transition-colors truncate"
                  >
                    {clinic.email}
                  </a>
                </div>

                <div className="flex items-start gap-2.5 text-slate-300 pt-1">
                  <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="block font-medium">{clinic.operatingHours}</span>
                    <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-bold mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Accepting Appointments Online
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Quick Navigation (2 cols) */}
            <div className="space-y-3 md:col-span-2">
              <h3 className="font-extrabold text-white text-xs uppercase tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-3.5 rounded-full bg-emerald-500" />
                Quick Links
              </h3>

              <ul className="space-y-2 text-xs">
                <li>
                  <Link
                    to={`/clinic/${clinic.slug}/book-appointment`}
                    className="inline-flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-bold transition-colors"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book Appointment →</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/clinic/${clinic.slug}/about`}
                    className="text-slate-300 hover:text-white transition-colors block py-0.5"
                  >
                    About Practice
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/clinic/${clinic.slug}/doctors`}
                    className="text-slate-300 hover:text-white transition-colors block py-0.5"
                  >
>>>>>>> origin/main
                    Our Doctor Specialists
                  </Link>
                </li>
                <li>
<<<<<<< HEAD
                  <Link to={`/clinic/${clinic.slug}/services`} className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
                    Treatment Catalog & Pricing
                  </Link>
                </li>
                <li>
                  <Link to={`/clinic/${clinic.slug}/pharmacy`} className="text-teal-600 dark:text-teal-400 hover:underline">
                    Pharmacy & Buy Medicines Online →
                  </Link>
                </li>
                <li>
                  <Link to={`/clinic/${clinic.slug}/education`} className="text-indigo-600 dark:text-indigo-400 hover:underline">
                    Health Education & Clinical Guides
                  </Link>
                </li>
                <li>
                  <Link to={`/clinic/${clinic.slug}/emergency`} className="text-rose-600 dark:text-rose-400 hover:underline font-bold flex items-center gap-1">
                    Emergency Helpline (24/7) · 108 / 112
                  </Link>
                </li>
                <li>
                  <Link to="/patient/dashboard" className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
                    Patient Workspace Direct Access
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-slate-500 hover:text-slate-700 dark:hover:text-slate-400 text-[11px] block pt-2">
                    Clinic powered by ClinicOS Healthcare SaaS
=======
                  <Link
                    to={`/clinic/${clinic.slug}/services`}
                    className="text-slate-300 hover:text-white transition-colors block py-0.5"
                  >
                    Treatments & Fees
                  </Link>
                </li>
                <li>
                  <Link
                    to={`/clinic/${clinic.slug}/contact`}
                    className="text-slate-300 hover:text-white transition-colors block py-0.5"
                  >
                    Hours & Location Map
>>>>>>> origin/main
                  </Link>
                </li>
              </ul>
            </div>
<<<<<<< HEAD
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 text-center text-[11px] text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>© 2026 {clinic.name}. All patient rights reserved.</span>
            <span>Simulated Healthcare SaaS Demonstration Frontend</span>
=======

            {/* 4. Portals & Logins (3 cols) */}
            <div className="space-y-3 md:col-span-3">
              <h3 className="font-extrabold text-white text-xs uppercase tracking-wider flex items-center gap-2">
                <span className="w-1.5 h-3.5 rounded-full bg-purple-500" />
                Portals & Access
              </h3>

              <div className="space-y-2">
                <Link
                  to="/login/patient"
                  className="flex items-center justify-between p-2.5 rounded-xl bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/40 text-blue-200 hover:text-white text-xs font-bold transition-colors group"
                >
                  <span className="flex items-center gap-2">
                    <User className="w-3.5 h-3.5 text-blue-400" />
                    Patient Sign In
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-blue-400 group-hover:translate-x-0.5 transition-transform" />
                </Link>

                <Link
                  to="/register/patient"
                  className="flex items-center justify-between p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 text-slate-300 hover:text-white text-xs transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <UserPlus className="w-3.5 h-3.5 text-emerald-400" />
                    New Patient Registration
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                </Link>

                <Link
                  to="/login/receptionist"
                  className="flex items-center justify-between p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 text-slate-300 hover:text-white text-xs transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                    Front Desk Reception
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                </Link>

                <Link
                  to="/login/doctor"
                  className="flex items-center justify-between p-2 rounded-xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 text-slate-300 hover:text-white text-xs transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <Stethoscope className="w-3.5 h-3.5 text-purple-400" />
                    Doctor Workspace Login
                  </span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-500" />
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Divider Row with Security & Back to Top */}
          <div className="mt-12 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>© 2026 {clinic.name}. All patient medical rights reserved.</span>
            </div>

            <div className="flex items-center gap-4 text-[11px] text-slate-400">
              <span className="hidden md:inline text-slate-500">
                256-Bit SSL Secured · HIPAA & ABDM Compliant Architecture
              </span>
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="flex items-center gap-1 text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 transition-colors cursor-pointer"
              >
                <span>Back to Top</span>
                <ArrowUp className="w-3 h-3 text-blue-400" />
              </button>
            </div>
>>>>>>> origin/main
          </div>
        </div>
      </footer>
    </div>
  );
}


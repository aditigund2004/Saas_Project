import React from 'react';
import { Outlet, useParams, Link, useLocation } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Phone,
  MapPin,
  Clock,
  Calendar,
  Shield,
  ChevronDown,
  Menu,
  X,
  User,
  LogIn,
  UserPlus,
  LayoutDashboard,
  Building2,
  Users,
  Briefcase,
  ShoppingBag,
  BookOpen,
  PhoneCall,
  ExternalLink
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { FontSizeSwitcher } from '../../components/ui/FontSizeSwitcher';
import { ThemeSwitcher } from '../../components/ui/ThemeSwitcher';
import { LanguageSwitcher } from '../../components/ui/LanguageSwitcher';

import { getDefaultWebsiteSettings } from '../website-builder/websiteBuilderDefaults';

export function PublicClinicLayout() {
  const { clinicSlug } = useParams();
  const { clinics, currentRole } = useApp();

  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [moreMenuOpen, setMoreMenuOpen] = React.useState(false);
  const moreMenuRef = React.useRef(null);

  const clinic = clinics.find((c) => c.slug === clinicSlug || c.id === clinicSlug) || clinics[0];
  const settings = clinic.websiteSettings || getDefaultWebsiteSettings(clinic);

  const primaryColor = settings.primaryColor || '#2563eb';

  // Close "More" dropdown when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (moreMenuRef.current && !moreMenuRef.current.contains(event.target)) {
        setMoreMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const primaryNavLinks = [
    { name: 'Overview', shortName: 'Overview', path: `/clinic/${clinic.slug}`, icon: LayoutDashboard },
    { name: 'About Practice', shortName: 'About', path: `/clinic/${clinic.slug}/about`, icon: Building2 },
    { name: 'Doctors Roster', shortName: 'Doctors', path: `/clinic/${clinic.slug}/doctors`, icon: Users },
    { name: 'Services & Fees', shortName: 'Services', path: `/clinic/${clinic.slug}/services`, icon: Briefcase },
    { name: 'Pharmacy Store', shortName: 'Pharmacy', path: `/clinic/${clinic.slug}/pharmacy`, icon: ShoppingBag }
  ];

  const secondaryNavLinks = [
    { name: 'Health Education', shortName: 'Education', path: `/clinic/${clinic.slug}/education`, icon: BookOpen },
    { name: 'Emergency Helpline', shortName: 'Helpline', path: `/clinic/${clinic.slug}/emergency`, isEmergency: true, icon: PhoneCall },
    { name: 'Hours & Contact', shortName: 'Contact', path: `/clinic/${clinic.slug}/contact`, icon: Clock }
  ];

  const allNavLinks = [...primaryNavLinks, ...secondaryNavLinks];

  const isActive = (path) => {
    if (path === `/clinic/${clinic.slug}`) {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const isSecondaryActive = secondaryNavLinks.some((item) => isActive(item.path));

  return (
    <div
      className="min-h-screen flex flex-col bg-[#F4F7FC] dark:bg-[#080F1E] text-slate-900 dark:text-[#F1F5F9] transition-colors"
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
      <div className="px-4 py-2 text-xs border-b bg-white dark:bg-[#0D1729] border-slate-200 dark:border-[#263B59] text-slate-600 dark:text-[#CBD5E1]">
        <div className="max-w-[1720px] mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 text-[11px]">
            <span className="flex items-center gap-1.5 font-medium">
              <MapPin className="w-3.5 h-3.5 text-blue-500" />
              {clinic.locality ? `${clinic.locality}, ` : ''}{clinic.city}
            </span>
            <span className="hidden sm:flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-500" />
              {clinic.operatingHours}
            </span>
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
              <Phone className="w-3.5 h-3.5 text-emerald-500" />
              {clinic.phone}
            </span>
            <span className="hidden md:inline text-slate-300 dark:text-slate-700">|</span>
            {currentRole === 'patient' ? (
              <Link
                to="/patient/dashboard"
                title="My Patient Portal"
                className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 hover:underline flex items-center gap-1"
              >
                <User className="w-3.5 h-3.5 shrink-0" />
                <span className="hidden md:inline">My Patient Portal →</span>
              </Link>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to={`/clinic/${clinic.slug}/signin`}
                  title="Patient Sign In"
                  className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                >
                  <LogIn className="w-3.5 h-3.5 shrink-0" />
                  <span className="hidden md:inline">Patient Sign In</span>
                </Link>
                <span className="text-slate-300 dark:text-slate-700 hidden md:inline">•</span>
                <Link
                  to={`/clinic/${clinic.slug}/register`}
                  title="Register Patient Account"
                  className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                >
                  <UserPlus className="w-3.5 h-3.5 shrink-0" />
                  <span className="hidden md:inline">Register</span>
                </Link>
              </div>
            )}
            <span className="hidden md:inline text-slate-300 dark:text-slate-700">|</span>
            <Link
              to="/clinic/dashboard"
              title="Doctor Workspace Portal"
              className="text-[11px] font-medium text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:underline flex items-center gap-1"
            >
              <ExternalLink className="w-3.5 h-3.5 md:hidden text-slate-400" />
              <span className="hidden md:inline">Doctor Workspace Portal →</span>
            </Link>
            <span className="hidden sm:inline text-slate-300 dark:text-slate-700">|</span>
            <div className="hidden sm:flex items-center gap-2">
              <FontSizeSwitcher variant="dropdown" />
              <ThemeSwitcher variant="segmented" />
            </div>
          </div>
        </div>
      </div>

      {/* Main Clinic Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md border-b bg-white/95 dark:bg-[#080F1E]/95 border-slate-200 dark:border-[#263B59]">
        <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4 h-20">
            {/* Left Section: Clinic Logo & Brand + Navigation Menu Links */}
            <div className="flex items-center gap-4 xl:gap-8 min-w-0 flex-1">
              {/* Clinic Logo & Brand */}
              <Link to={`/clinic/${clinic.slug}`} className="flex items-center gap-3 group shrink-0">
                <div
                  className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center text-white font-extrabold text-lg shadow-md group-hover:scale-105 transition-transform shrink-0"
                  style={{ backgroundColor: primaryColor }}
                >
                  {clinic.logo && clinic.logo.length <= 2 ? clinic.logo : clinic.name.charAt(0)}
                </div>
                <div className="min-w-0 max-w-[170px] sm:max-w-[220px]">
                  <h1 className="text-sm sm:text-base font-extrabold tracking-tight block leading-tight truncate text-slate-900 dark:text-[#F1F5F9]">
                    {clinic.name}
                  </h1>
                  <p className="text-[11px] text-slate-500 dark:text-[#94A3B8] font-medium truncate">
                    {clinic.specialty} Practice · Verified Healthcare
                  </p>
                </div>
              </Link>

              {/* Desktop Navigation Links positioned cleanly on the left */}
              <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 min-w-0">
                {primaryNavLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      title={item.name}
                      className={`px-2.5 py-2 xl:px-3 rounded-xl text-xs font-semibold transition-all whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                        isActive(item.path)
                          ? 'bg-blue-50 text-blue-700 dark:bg-[#172640] dark:text-[#22D3EE] font-bold border border-blue-200 dark:border-[#263B59]'
                          : 'text-slate-600 dark:text-[#CBD5E1] hover:text-slate-900 dark:hover:text-[#F1F5F9] hover:bg-slate-100 dark:hover:bg-[#172640]/50'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <span className="hidden xl:inline">{item.name}</span>
                      <span className="hidden lg:inline xl:hidden">{item.shortName}</span>
                    </Link>
                  );
                })}

                {/* Secondary navigation items rendered inline on 2xl+ displays */}
                {secondaryNavLinks.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      title={item.name}
                      className={`hidden 2xl:inline-flex px-3 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap shrink-0 items-center gap-1.5 ${
                        isActive(item.path)
                          ? 'bg-blue-50 text-blue-700 dark:bg-[#172640] dark:text-[#22D3EE] font-bold border border-blue-200 dark:border-[#263B59]'
                          : 'text-slate-600 dark:text-[#CBD5E1] hover:text-slate-900 dark:hover:text-[#F1F5F9] hover:bg-slate-100 dark:hover:bg-[#172640]/50'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}

                {/* "More" dropdown for viewports between lg and 2xl */}
                <div className="relative 2xl:hidden" ref={moreMenuRef}>
                  <button
                    type="button"
                    onClick={() => setMoreMenuOpen(!moreMenuOpen)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all whitespace-nowrap flex items-center gap-1 shrink-0 ${
                      isSecondaryActive
                        ? 'bg-blue-50 text-blue-700 dark:bg-[#172640] dark:text-[#22D3EE] font-bold border border-blue-200 dark:border-[#263B59]'
                        : 'text-slate-600 dark:text-[#CBD5E1] hover:text-slate-900 dark:hover:text-[#F1F5F9] hover:bg-slate-100 dark:hover:bg-[#172640]/50'
                    }`}
                  >
                    <span>More</span>
                    <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${moreMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {moreMenuOpen && (
                    <div className="absolute left-0 top-full mt-2 w-56 py-1.5 rounded-2xl bg-white dark:bg-[#111E33] border border-slate-200 dark:border-[#263B59] shadow-xl z-50">
                      {secondaryNavLinks.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setMoreMenuOpen(false)}
                          className={`flex items-center justify-between px-3.5 py-2.5 text-xs font-semibold transition-colors ${
                            isActive(item.path)
                              ? 'bg-blue-50 text-blue-700 dark:bg-[#172640] dark:text-[#22D3EE] font-bold'
                              : 'text-slate-700 dark:text-[#CBD5E1] hover:bg-slate-100 dark:hover:bg-[#172640]/60 hover:text-slate-900 dark:hover:text-white'
                          }`}
                        >
                          <span>{item.name}</span>
                          {item.isEmergency && (
                            <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-red-600 text-white">
                              24/7
                            </span>
                          )}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </nav>
            </div>

            {/* Right Section: Action Buttons pinned to far right */}
            <div className="flex items-center gap-1.5 sm:gap-2 xl:gap-2.5 shrink-0 ml-auto">
              {/* Action CTAs: On small resolution devices only icons are displayed */}
              <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
                {currentRole === 'patient' ? (
                  <Link to="/patient/dashboard">
                    <Button
                      variant="outline"
                      size="md"
                      title="My Patient Portal"
                      className="font-bold text-xs border-emerald-500/60 text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 flex items-center gap-1.5 whitespace-nowrap px-2.5 sm:px-3.5"
                    >
                      <User className="w-4 h-4 text-emerald-500 dark:text-emerald-400 shrink-0" />
                      <span className="hidden md:inline">My Patient Portal</span>
                    </Button>
                  </Link>
                ) : (
                  <div className="flex items-center gap-1 sm:gap-1.5">
                    <Link to={`/clinic/${clinic.slug}/signin`}>
                      <Button
                        variant="outline"
                        size="md"
                        title="Patient Sign In"
                        className="font-bold text-xs border-slate-200 dark:border-[#263B59] bg-white dark:bg-[#111E33] hover:bg-slate-50 dark:hover:bg-[#172640] text-slate-800 dark:text-[#F1F5F9] flex items-center gap-1.5 whitespace-nowrap px-2.5 sm:px-3.5"
                      >
                        <LogIn className="w-3.5 h-3.5 text-blue-600 dark:text-[#3B82F6] shrink-0" />
                        <span className="hidden md:inline">Sign In</span>
                      </Button>
                    </Link>
                    <Link to={`/clinic/${clinic.slug}/register`}>
                      <Button
                        variant="outline"
                        size="md"
                        title="Register Patient Account"
                        className="font-bold text-xs border-blue-200 dark:border-[#3B82F6]/60 bg-blue-50 dark:bg-[#172640] text-blue-700 dark:text-[#22D3EE] hover:bg-blue-100 dark:hover:bg-[#172640]/80 flex items-center gap-1.5 whitespace-nowrap px-2.5 sm:px-3.5"
                      >
                        <UserPlus className="w-3.5 h-3.5 shrink-0" />
                        <span className="hidden md:inline">Register</span>
                      </Button>
                    </Link>
                  </div>
                )}

                <Link to={`/clinic/${clinic.slug}/book-appointment`}>
                  <Button
                    variant="primary"
                    size="md"
                    title="Book Appointment"
                    className="font-bold text-xs shadow-md text-white whitespace-nowrap flex items-center gap-1.5 px-2.5 sm:px-3.5"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <Calendar className="w-3.5 h-3.5 shrink-0" />
                    <span className="hidden sm:inline">Book Appointment</span>
                  </Button>
                </Link>
              </div>

              {/* Mobile menu trigger */}
              <div className="lg:hidden shrink-0">
                <button
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  aria-label="Toggle navigation menu"
                  className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
                >
                  {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden px-4 pt-2 pb-6 space-y-2 border-b bg-white dark:bg-[#0D1729] border-slate-200 dark:border-[#263B59]">
            {allNavLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold ${
                  isActive(item.path)
                    ? 'bg-blue-50 text-blue-700 dark:bg-[#172640] dark:text-[#22D3EE] font-bold'
                    : 'text-slate-700 dark:text-[#CBD5E1] hover:bg-slate-100 dark:hover:bg-[#172640]'
                }`}
              >
                <span>{item.name}</span>
                {item.isEmergency && (
                  <span className="px-1.5 py-0.5 rounded text-[9px] font-black uppercase tracking-wider bg-red-600 text-white">
                    24/7
                  </span>
                )}
              </Link>
            ))}
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
            </div>
          </div>
        )}
      </header>

      {/* Main Page Slot */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Dedicated Patient-Facing Footer */}
      <footer className="mt-16 border-t bg-white dark:bg-[#0D1729] border-slate-200 dark:border-[#263B59] text-slate-600 dark:text-[#CBD5E1]">
        <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3 md:col-span-2">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: primaryColor }}
                >
                  {clinic.logo && clinic.logo.length <= 2 ? clinic.logo : clinic.name.charAt(0)}
                </div>
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
                    Our Doctor Specialists
                  </Link>
                </li>
                <li>
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
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 text-center text-[11px] text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>© 2026 {clinic.name}. All patient rights reserved.</span>
            <span>Simulated Healthcare SaaS Demonstration Frontend</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

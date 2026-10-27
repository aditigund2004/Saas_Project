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
  ExternalLink,
  ChevronRight,
  Menu,
  X,
  Sparkles
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { getDefaultWebsiteSettings } from '../website-builder/websiteBuilderDefaults';

export function PublicClinicLayout() {
  const { clinicSlug } = useParams();
  const { clinics } = useApp();
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
      className={`min-h-screen flex flex-col ${
        isPremium
          ? 'bg-slate-950 text-slate-100'
          : isMinimal
          ? 'bg-stone-50 text-stone-900'
          : 'bg-white text-slate-900'
      }`}
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
      <div
        className={`px-4 py-2 text-xs border-b ${
          isPremium
            ? 'bg-slate-900 border-slate-800 text-slate-300'
            : isMinimal
            ? 'bg-stone-100 border-stone-200 text-stone-700'
            : 'bg-slate-50 border-slate-200 text-slate-600'
        }`}
      >
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
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <span className="font-semibold flex items-center gap-1">
              <Phone className="w-3.5 h-3.5 text-emerald-500" />
              {clinic.phone}
            </span>
            <span className="hidden md:inline text-slate-300">|</span>
            <Link
              to="/app/dashboard"
              className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              Doctor Workspace Portal →
            </Link>
          </div>
        </div>
      </div>

      {/* Main Clinic Header */}
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
                style={{ backgroundColor: primaryColor }}
              >
                {clinic.logo && clinic.logo.length <= 2 ? clinic.logo : clinic.name.charAt(0)}
              </div>
              <div>
                <h1 className="text-base sm:text-lg font-extrabold tracking-tight block leading-tight">
                  {clinic.name}
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {clinic.specialty} Practice · Verified Healthcare
                </p>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all ${
                    isActive(item.path)
                      ? isPremium
                        ? 'bg-slate-800 text-white font-bold'
                        : 'bg-slate-100 text-blue-600 font-bold'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* CTAs */}
            <div className="hidden sm:flex items-center gap-3">
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
          <div
            className={`lg:hidden px-4 pt-2 pb-6 space-y-2 border-b ${
              isPremium ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}
          >
            {navLinks.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3.5 py-2 rounded-xl text-xs font-semibold ${
                  isActive(item.path)
                    ? 'bg-blue-50 text-blue-600 font-bold'
                    : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-2">
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
        )}
      </header>

      {/* Main Page Slot */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Dedicated Patient-Facing Footer */}
      <footer
        className={`mt-16 border-t ${
          isPremium
            ? 'bg-slate-950 border-slate-800 text-slate-400'
            : isMinimal
            ? 'bg-stone-100 border-stone-200 text-stone-600'
            : 'bg-slate-900 border-slate-800 text-slate-400'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-3 md:col-span-2">
              <div className="flex items-center gap-2.5">
                <div
                  className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-bold text-sm"
                  style={{ backgroundColor: primaryColor }}
                >
                  {clinic.logo && clinic.logo.length <= 2 ? clinic.logo : clinic.name.charAt(0)}
                </div>
                <span className="text-base font-bold text-white">{clinic.name}</span>
              </div>
              <p className="text-xs text-slate-400 max-w-md leading-relaxed">
                {clinic.tagline}
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-400 pt-1">
                <Shield className="w-3.5 h-3.5 text-emerald-400" />
                <span>Verified Private Healthcare Practice · Operating with standard hygiene & sterilisation</span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Contact & Hours</h3>
              <p className="text-slate-400">📍 {clinic.address}, {clinic.city}</p>
              <p className="text-slate-400">📞 {clinic.phone}</p>
              <p className="text-slate-400">✉️ {clinic.email}</p>
              <p className="text-slate-400">🕒 {clinic.operatingHours}</p>
            </div>

            <div className="space-y-2 text-xs">
              <h3 className="font-bold text-white uppercase tracking-wider text-[11px]">Quick Actions</h3>
              <ul className="space-y-1.5">
                <li>
                  <Link to={`/clinic/${clinic.slug}/book-appointment`} className="text-blue-400 hover:underline">
                    Book Consultation Slot →
                  </Link>
                </li>
                <li>
                  <Link to={`/clinic/${clinic.slug}/doctors`} className="text-slate-400 hover:text-white">
                    Our Doctor Specialists
                  </Link>
                </li>
                <li>
                  <Link to={`/clinic/${clinic.slug}/services`} className="text-slate-400 hover:text-white">
                    Treatment Catalog & Pricing
                  </Link>
                </li>
                <li>
                  <Link to="/" className="text-slate-500 hover:text-slate-400 text-[11px] block pt-3">
                    Clinic powered by ClinicOS Healthcare SaaS
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-slate-800 text-center text-[11px] text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>© 2026 {clinic.name}. All patient rights reserved.</span>
            <span>Simulated Healthcare SaaS Demonstration Frontend</span>
          </div>
        </div>
      </footer>
    </div>
  );
}


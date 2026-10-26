import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, Menu, X, ArrowRight, Sparkles, Building2 } from 'lucide-react';
import { Button } from '../ui/Button';

export function PublicHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Features', path: '/features' },
    { name: 'Solutions', path: '/solutions' },
    { name: 'Connected Clinics', path: '/clinics' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'FAQ', path: '/faq' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' }
  ];

  const isActive = (path) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };

  return (
    <header
      className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#E2E8F0] shadow-xs w-full max-w-full transition-shadow duration-200"
      style={{ position: 'sticky', top: 0, zIndex: 50 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20 gap-3 sm:gap-4">
          {/* Brand Logo - Bold, High-Context & Well Aligned */}
          <Link to="/" className="flex items-center gap-3 group shrink-0">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#15803D] flex items-center justify-center text-white shadow-md shadow-green-700/25 group-hover:scale-105 group-hover:bg-[#166534] transition-all shrink-0">
              <Activity className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl sm:text-2xl font-black tracking-tight text-slate-950 group-hover:text-[#15803D] transition-colors block leading-tight">
                Clinic<span className="text-[#15803D]">OS</span>
              </span>
              <span className="block text-[11px] sm:text-xs uppercase font-extrabold text-[#166534] tracking-wider">
                Healthcare SaaS
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links — Larger Font Size & Comfortable Padding */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                aria-current={isActive(link.path) ? 'page' : undefined}
                className={`px-3 py-2 xl:px-4 xl:py-2.5 rounded-xl text-xs xl:text-sm font-bold transition-all whitespace-nowrap ${
                  isActive(link.path)
                    ? 'text-[#166534] bg-[#DCFCE7] font-extrabold shadow-2xs'
                    : 'text-slate-700 hover:text-slate-950 hover:bg-slate-100/90'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTAs - Aligned Height (h-11 sm:h-12) & Generous Padding */}
          <div className="hidden md:flex items-center gap-2.5 xl:gap-3.5 shrink-0">
            <Link
              to="/register/clinic"
              className="hidden 2xl:inline-flex items-center gap-2 px-3.5 py-2 text-xs font-black text-[#166534] bg-[#DCFCE7] hover:bg-emerald-100 border border-[#86EFAC] rounded-xl transition-all shadow-2xs whitespace-nowrap"
            >
              <Building2 className="w-4 h-4 text-[#15803D]" />
              <span>Register Clinic</span>
            </Link>
            <Link
              to="/demo-access"
              className="px-3 py-2 xl:px-3.5 xl:py-2 text-xs font-extrabold text-amber-900 bg-amber-50 hover:bg-amber-100 border border-amber-300 rounded-full transition-all flex items-center gap-1.5 shadow-2xs whitespace-nowrap"
            >
              <Sparkles className="w-4 h-4 text-amber-600 animate-pulse" />
              <span>Demo Accounts</span>
            </Link>
            <Link
              to="/login"
              className="px-3 py-2 xl:px-4 xl:py-2 text-xs xl:text-sm font-bold text-slate-800 hover:text-[#15803D] transition-colors whitespace-nowrap"
            >
              Sign In
            </Link>
            <Link to="/signup">
              <Button
                variant="primary"
                size="md"
                className="font-extrabold text-xs xl:text-sm px-4.5 py-2.5 rounded-xl shadow-md shadow-green-700/25 hover:shadow-lg hover:shadow-green-700/35 hover:scale-102 transition-all whitespace-nowrap"
              >
                Create Account
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="flex lg:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="h-11 w-11 flex items-center justify-center rounded-xl text-slate-700 hover:text-slate-950 hover:bg-slate-100 border border-[#E2E8F0] cursor-pointer transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E2E8F0] bg-white px-4 pt-4 pb-6 space-y-3 animate-fade-in shadow-xl">
          <div className="grid grid-cols-2 gap-2 pb-3.5 border-b border-slate-100">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`p-2.5 rounded-xl text-xs sm:text-sm font-bold ${
                  isActive(link.path)
                    ? 'text-[#166534] bg-[#DCFCE7]'
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="pt-2 flex flex-col gap-2.5">
            <Link
              to="/register/clinic"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 text-xs sm:text-sm font-extrabold text-[#166534] bg-[#DCFCE7] border border-[#86EFAC] rounded-xl flex items-center justify-center gap-2"
            >
              <Building2 className="w-4 h-4 text-[#15803D]" />
              <span>Register New Clinic (14-Day Free Trial)</span>
            </Link>
            <Link
              to="/demo-access"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 text-xs sm:text-sm font-bold text-amber-900 bg-amber-50 border border-amber-200 rounded-xl"
            >
              Demo Accounts Hub
            </Link>
            <div className="grid grid-cols-2 gap-2.5">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-2.5 text-xs sm:text-sm font-bold border border-[#E2E8F0] rounded-xl hover:bg-slate-50"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="text-center py-2.5 text-xs sm:text-sm font-extrabold bg-[#15803D] text-white rounded-xl shadow-xs hover:bg-[#166534]"
              >
                Create Account
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

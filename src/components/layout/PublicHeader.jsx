import React, { useState } from 'react';
<<<<<<< HEAD
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Activity,
  Menu,
  X,
  ArrowRight,
  Sun,
  Moon,
  User,
  Stethoscope,
  ExternalLink
} from 'lucide-react';
import { Button } from '../ui/Button';
import { useTheme } from '../../context/ThemeContext';
=======
import { Link, useLocation } from 'react-router-dom';
import { Activity, Menu, X, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '../ui/Button';
>>>>>>> origin/main

export function PublicHeader() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
<<<<<<< HEAD
  const navigate = useNavigate();
  const { isDark, toggleTheme } = useTheme();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'How it works', path: '/#how-it-works' },
    { name: 'Sample Clinic', path: '/clinic/citycare-family-clinic' },
    { name: 'Pricing', path: '/pricing' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' }
  ];

  const handleNavClick = (e, path) => {
    if (path === '/') {
      if (location.pathname === '/' && !location.hash) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (location.pathname === '/') {
        e.preventDefault();
        window.history.pushState(null, '', '/');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else if (path === '/#how-it-works') {
      if (location.pathname === '/') {
        e.preventDefault();
        window.history.pushState(null, '', '/#how-it-works');
        const el = document.getElementById('how-it-works');
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    }
    setMobileMenuOpen(false);
  };

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/' && (!location.hash || location.hash === '#top');
    }
    if (path === '/#how-it-works') {
      return location.pathname === '/' && location.hash === '#how-it-works';
    }
    if (path.startsWith('/clinic/')) {
      return location.pathname.startsWith('/clinic/');
    }
    return location.pathname === path;
  };

  return (
    <header className="sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200/90 dark:border-slate-800 transition-colors">
      <div className="max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Brand Logo: ClinicOS */}
          <Link
            to="/"
            onClick={(e) => handleNavClick(e, '/')}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white font-extrabold text-base shadow-xs group-hover:bg-blue-700 transition-colors">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Clinic<span className="text-blue-600 dark:text-blue-400">OS</span>
              </span>
              <span className="block text-[10px] uppercase font-semibold text-slate-400 dark:text-slate-500 tracking-wider">
                Healthcare SaaS Platform
=======

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
    <header className="public-header sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-18">
          {/* Brand Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-xs group-hover:bg-blue-700 transition-colors">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">
                Clinic<span className="text-blue-600">OS</span>
              </span>
              <span className="block text-[10px] uppercase font-semibold text-slate-400 tracking-wider">
                Healthcare SaaS
>>>>>>> origin/main
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
<<<<<<< HEAD
            {navLinks.map((link) => {
              const active = isActive(link.path);
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={(e) => handleNavClick(e, link.path)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                    active
                      ? 'text-blue-700 dark:text-blue-300 bg-blue-50/90 dark:bg-blue-950/60 shadow-2xs font-bold border border-blue-200/80 dark:border-blue-800/80'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="hidden md:flex items-center gap-2.5">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800 transition-colors cursor-pointer"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* Doctor / Owner Login */}
            <Link
              to="/login/doctor"
              className="px-3.5 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-600 rounded-xl transition-all flex items-center gap-1.5 shadow-2xs bg-white dark:bg-slate-850"
            >
              <User className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Doctor / Owner Login</span>
            </Link>

            {/* Start Free Trial (kept as it is with animated pulse glow & shimmer) */}
            <Link to="/onboarding">
              <Button
                variant="primary"
                size="sm"
                className="font-bold text-xs bg-blue-600 hover:bg-blue-700 text-white shadow-md btn-animated-primary px-4 py-2"
              >
                Start Free Trial →
=======
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                  isActive(link.path)
                    ? 'text-blue-700 bg-blue-50/80 font-semibold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* CTAs */}
          <div className="hidden md:flex items-center gap-2.5">
            <Link
              to="/demo-access"
              className="px-2.5 py-1.5 text-xs font-semibold text-amber-800 bg-amber-50 hover:bg-amber-100 border border-amber-200 rounded-lg transition-colors flex items-center gap-1"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Demo Accounts
            </Link>
            <Link
              to="/login"
              className="px-3.5 py-2 text-xs font-semibold text-slate-700 hover:text-blue-700 transition-colors"
            >
              Sign In
            </Link>
            <Link to="/signup">
              <Button variant="primary" size="sm" className="font-semibold text-xs">
                Create Account
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
>>>>>>> origin/main
              </Button>
            </Link>
          </div>

<<<<<<< HEAD
          {/* Mobile Menu & Theme Toggle */}
          <div className="flex md:hidden items-center gap-1.5">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-800 transition-colors cursor-pointer"
              aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
=======
          {/* Mobile menu button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 cursor-pointer"
>>>>>>> origin/main
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

<<<<<<< HEAD
      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-2 pb-6 space-y-2 animate-fade-in text-slate-800 dark:text-slate-200">
=======
      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-slate-200 bg-white px-4 pt-2 pb-6 space-y-2 animate-fade-in">
>>>>>>> origin/main
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
<<<<<<< HEAD
              onClick={(e) => handleNavClick(e, link.path)}
              className={`block px-3.5 py-2 rounded-lg text-xs font-semibold ${
                isActive(link.path)
                  ? 'text-blue-700 dark:text-blue-300 bg-blue-50 dark:bg-blue-950/60 font-bold'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
=======
              onClick={() => setMobileMenuOpen(false)}
              className={`block px-3 py-2 rounded-lg text-xs font-medium ${
                isActive(link.path) ? 'text-blue-700 bg-blue-50 font-semibold' : 'text-slate-700 hover:bg-slate-50'
>>>>>>> origin/main
              }`}
            >
              {link.name}
            </Link>
          ))}
<<<<<<< HEAD
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
            <Link
              to="/login/doctor"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-xs font-bold text-slate-700 dark:text-slate-200 text-center border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-center gap-1.5"
            >
              <User className="w-3.5 h-3.5 text-blue-600" />
              <span>Doctor / Owner Login</span>
            </Link>
            <Link
              to="/onboarding"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Button variant="primary" size="md" className="w-full text-xs font-bold bg-blue-600 text-white btn-animated-primary">
                Start Free Trial →
=======
          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            <Link
              to="/demo-access"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-xs font-semibold text-amber-800 bg-amber-50 rounded-lg text-center"
            >
              ✨ Demo Accounts
            </Link>
            <Link
              to="/login"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 rounded-lg text-center"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center"
            >
              <Button variant="primary" size="sm" className="w-full text-xs font-semibold">
                Create Patient Account
>>>>>>> origin/main
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

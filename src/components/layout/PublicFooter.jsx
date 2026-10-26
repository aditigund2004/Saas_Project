import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, ShieldCheck } from 'lucide-react';

export function PublicFooter() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center text-white font-black text-base shadow-xs">
                <Activity className="w-4 h-4" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Clinic<span className="text-blue-400">OS</span>
              </span>
            </Link>
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm leading-relaxed">
              Run your clinic smarter. Spend less time on paperwork. Manage appointments, patient queue tokens, digital prescriptions, inventory restock, billing, and follow-ups from one unified SaaS platform.
            </p>
            <div className="flex items-center gap-2 text-xs text-blue-400 font-medium bg-blue-950/60 border border-blue-900/60 px-3 py-1.5 rounded-lg w-fit">
              <ShieldCheck className="w-4 h-4 text-blue-400" />
              <span>Multi-Tenant Architecture · Built for Private Clinics</span>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li><Link to="/features" className="hover:text-white transition-colors">Features Explorer</Link></li>
              <li><Link to="/solutions" className="hover:text-white transition-colors">Specialty Solutions</Link></li>
              <li><Link to="/clinics" className="hover:text-white transition-colors">Connected Clinics</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing & Plans</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">Frequently Asked Questions</Link></li>
              <li><Link to="/book-appointment" className="hover:text-white transition-colors">Guest Appointment</Link></li>
            </ul>
          </div>

          {/* Solutions by Clinic */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Solutions</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li><Link to="/solutions" className="hover:text-white transition-colors">Family Medicine</Link></li>
              <li><Link to="/solutions" className="hover:text-white transition-colors">Cardiology Clinics</Link></li>
              <li><Link to="/solutions" className="hover:text-white transition-colors">Dental Studios</Link></li>
              <li><Link to="/solutions" className="hover:text-white transition-colors">Dermatology Care</Link></li>
              <li><Link to="/solutions" className="hover:text-white transition-colors">Orthopedic Practice</Link></li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Company & Legal</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Notice</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/demo-access" className="hover:text-white transition-colors">Demo Accounts</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ClinicOS Healthcare SaaS Platform. Interactive Frontend Prototype.</p>
          <div className="flex items-center gap-4 flex-wrap">
            <span>Synthetic Demonstration Data</span>
            <span>•</span>
            <Link to="/verify-prescription/v_88f91a27" className="hover:text-slate-400">Sample QR Verification</Link>
            <span>•</span>
            <Link to="/privacy" className="hover:text-slate-400">Privacy</Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-slate-400">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

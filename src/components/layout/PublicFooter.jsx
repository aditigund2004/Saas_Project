import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, ShieldCheck } from 'lucide-react';

export function PublicFooter() {
  return (
    <footer className="bg-slate-950 text-slate-200 pt-20 pb-14 border-t-2 border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b-2 border-slate-800">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-5">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#15803D] flex items-center justify-center text-white font-black text-lg shadow-md shadow-green-700/25">
                <Activity className="w-5 h-5 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Clinic<span className="text-emerald-400">OS</span>
              </span>
            </Link>
            <p className="text-sm text-slate-300 max-w-sm leading-relaxed font-normal">
              Run your clinic smarter. Spend less time on paperwork. Manage appointments, patient queue tokens, digital prescriptions, inventory restock, billing, and follow-ups from one unified SaaS platform.
            </p>
            <div className="flex items-center gap-2.5 text-xs font-bold text-emerald-300 bg-emerald-950/80 border border-emerald-800/80 px-3.5 py-2 rounded-xl w-fit">
              <ShieldCheck className="w-4.5 h-4.5 text-emerald-400" />
              <span>Multi-Tenant Architecture · Built for Healthcare Practices</span>
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider mb-5">Platform</h4>
            <ul className="space-y-3 text-sm font-semibold">
              <li><Link to="/features" className="text-slate-300 hover:text-white transition-colors">Features Explorer</Link></li>
              <li><Link to="/solutions" className="text-slate-300 hover:text-white transition-colors">Specialty Solutions</Link></li>
              <li><Link to="/clinics" className="text-slate-300 hover:text-white transition-colors">Connected Clinics</Link></li>
              <li><Link to="/pricing" className="text-slate-300 hover:text-white transition-colors">Pricing & Plans</Link></li>
              <li><Link to="/faq" className="text-slate-300 hover:text-white transition-colors">Frequently Asked Questions</Link></li>
              <li><Link to="/book-appointment" className="text-slate-300 hover:text-white transition-colors">Guest Appointment</Link></li>
            </ul>
          </div>

          {/* Solutions by Clinic */}
          <div>
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider mb-5">Solutions</h4>
            <ul className="space-y-3 text-sm font-semibold">
              <li><Link to="/solutions" className="text-slate-300 hover:text-white transition-colors">Family Medicine</Link></li>
              <li><Link to="/solutions" className="text-slate-300 hover:text-white transition-colors">Cardiology Clinics</Link></li>
              <li><Link to="/solutions" className="text-slate-300 hover:text-white transition-colors">Dental Studios</Link></li>
              <li><Link to="/solutions" className="text-slate-300 hover:text-white transition-colors">Dermatology Care</Link></li>
              <li><Link to="/solutions" className="text-slate-300 hover:text-white transition-colors">Orthopedic Practice</Link></li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider mb-5">Company & Legal</h4>
            <ul className="space-y-3 text-sm font-semibold">
              <li><Link to="/about" className="text-slate-300 hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-slate-300 hover:text-white transition-colors">Contact Support</Link></li>
              <li><Link to="/privacy" className="text-slate-300 hover:text-white transition-colors">Privacy Notice</Link></li>
              <li><Link to="/terms" className="text-slate-300 hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/demo-access" className="text-slate-300 hover:text-white transition-colors">Demo Accounts</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold text-slate-400">
          <p>© {new Date().getFullYear()} ClinicOS Healthcare SaaS Platform. Interactive Frontend Prototype.</p>
          <div className="flex items-center gap-4 flex-wrap">
            <span>Synthetic Demonstration Data</span>
            <span>•</span>
            <Link to="/verify-prescription/v_88f91a27" className="hover:text-white transition-colors">Sample QR Verification</Link>
            <span>•</span>
            <Link to="/privacy" className="hover:text-white transition-colors">Privacy</Link>
            <span>•</span>
            <Link to="/terms" className="hover:text-white transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

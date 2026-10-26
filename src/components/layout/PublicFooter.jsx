import React from 'react';
import { Link } from 'react-router-dom';
import { Activity, ShieldCheck, HeartHandshake, PhoneCall, Mail } from 'lucide-react';

export function PublicFooter() {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-500 flex items-center justify-center text-white font-black text-lg">
                <Activity className="w-5 h-5" />
              </div>
              <span className="text-xl font-black tracking-tight text-white">
                Clinic<span className="text-blue-400">OS</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Run your clinic smarter. Spend less time on paperwork. Manage appointments, patient queue tokens, digital prescriptions, inventory restock, billing, and follow-ups from one unified SaaS platform.
            </p>
            <div className="flex items-center gap-2 text-xs text-blue-400 font-medium bg-blue-950/60 border border-blue-800/60 px-3 py-1.5 rounded-lg w-fit">
              <ShieldCheck className="w-4 h-4" />
              Multi-Tenant Architecture · Built for Private Clinics
            </div>
          </div>

          {/* Platform Links */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Platform</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/features" className="hover:text-white transition-colors">Features Explorer</Link></li>
              <li><Link to="/solutions" className="hover:text-white transition-colors">Specialty Solutions</Link></li>
              <li><Link to="/clinics" className="hover:text-white transition-colors">Connected Clinics</Link></li>
              <li><Link to="/pricing" className="hover:text-white transition-colors">Pricing & 14-Day Trial</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">Frequently Asked Questions</Link></li>
              <li><Link to="/book-appointment" className="hover:text-white transition-colors">Guest Appointment</Link></li>
            </ul>
          </div>

          {/* Solutions by Clinic */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Solutions</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/solutions#dental" className="hover:text-white transition-colors">Dental Clinics</Link></li>
              <li><Link to="/solutions#orthopedic" className="hover:text-white transition-colors">Orthopedic Clinics</Link></li>
              <li><Link to="/solutions#dermatology" className="hover:text-white transition-colors">Dermatology Clinics</Link></li>
              <li><Link to="/solutions#pediatrics" className="hover:text-white transition-colors">Pediatrics Hubs</Link></li>
              <li><Link to="/solutions#nursing-home" className="hover:text-white transition-colors">10–30 Bed Nursing Homes</Link></li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-4">Company & Legal</h4>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Support</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Notice</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
              <li><Link to="/login" className="hover:text-white transition-colors">Demo Login</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} ClinicOS Healthcare SaaS Platform. Interactive Frontend Prototype.</p>
          <div className="flex items-center gap-6">
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

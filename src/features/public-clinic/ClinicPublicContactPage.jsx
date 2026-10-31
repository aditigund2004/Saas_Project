import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
  Building2
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { getDefaultWebsiteSettings } from '../website-builder/websiteBuilderDefaults';

export function ClinicPublicContactPage() {
  const { clinicSlug } = useParams();
  const { clinics, showToast } = useApp();

  const clinic = clinics.find((c) => c.slug === clinicSlug || c.id === clinicSlug) || clinics[0];
  const settings = clinic.websiteSettings || getDefaultWebsiteSettings(clinic);
  const primaryColor = settings.primaryColor || '#2563eb';

  const [senderName, setSenderName] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [senderMessage, setSenderMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!senderName || !senderPhone) {
      showToast('Please fill out name and contact phone.', 'error');
      return;
    }
    setSubmitted(true);
    showToast(`Thank you ${senderName}! Your message has been sent to the clinic desk.`, 'success');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-2xl mx-auto space-y-3">
<<<<<<< HEAD
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-[#22D3EE]">
          Reach Our Clinic
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-[#F1F5F9]">
          Hours & Contact Information
        </h1>
        <p className="text-sm text-slate-600 dark:text-[#94A3B8]">
=======
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
          Reach Our Clinic
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Hours & Contact Information
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
>>>>>>> origin/main
          Have a query before your appointment? Our front desk team is available to assist you.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Contact Details Cards */}
        <div className="lg:col-span-5 space-y-6">
<<<<<<< HEAD
          <Card className="p-6 border-slate-200 dark:border-[#263B59] bg-white dark:bg-[#111E33] space-y-4 shadow-xs">
            <h2 className="text-base font-bold text-slate-900 dark:text-[#F1F5F9]">
=======
          <Card className="p-6 border-slate-200 dark:border-slate-800 space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
>>>>>>> origin/main
              Clinic Contact Desk
            </h2>

            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-3">
<<<<<<< HEAD
                <MapPin className="w-4 h-4 text-blue-600 dark:text-[#3B82F6] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 dark:text-[#F1F5F9] block">Physical Location</span>
                  <p className="text-slate-600 dark:text-[#CBD5E1]">{clinic.address}</p>
                  <p className="text-slate-500 dark:text-[#94A3B8]">{clinic.locality ? `${clinic.locality}, ` : ''}{clinic.city}</p>
=======
                <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">Physical Location</span>
                  <p className="text-slate-500">{clinic.address}</p>
                  <p className="text-slate-500">{clinic.locality ? `${clinic.locality}, ` : ''}{clinic.city}</p>
>>>>>>> origin/main
                </div>
              </div>

              <div className="flex items-start gap-3">
<<<<<<< HEAD
                <Phone className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 dark:text-[#F1F5F9] block">Reception Telephone</span>
                  <p className="text-slate-600 dark:text-[#CBD5E1]">{clinic.phone}</p>
=======
                <Phone className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">Reception Telephone</span>
                  <p className="text-slate-500">{clinic.phone}</p>
>>>>>>> origin/main
                </div>
              </div>

              <div className="flex items-start gap-3">
<<<<<<< HEAD
                <Mail className="w-4 h-4 text-blue-600 dark:text-[#3B82F6] shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 dark:text-[#F1F5F9] block">Official Email</span>
                  <p className="text-slate-600 dark:text-[#CBD5E1]">{clinic.email}</p>
=======
                <Mail className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">Official Email</span>
                  <p className="text-slate-500">{clinic.email}</p>
>>>>>>> origin/main
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div>
<<<<<<< HEAD
                  <span className="font-bold text-slate-900 dark:text-[#F1F5F9] block">Consultation Timings</span>
                  <p className="text-slate-600 dark:text-[#CBD5E1]">{clinic.operatingHours}</p>
=======
                  <span className="font-bold text-slate-900 dark:text-white block">Consultation Timings</span>
                  <p className="text-slate-500">{clinic.operatingHours}</p>
>>>>>>> origin/main
                </div>
              </div>
            </div>
          </Card>

          {/* Location Map Placeholder Card */}
<<<<<<< HEAD
          <Card className="overflow-hidden border-slate-200 dark:border-[#263B59] bg-white dark:bg-[#111E33] shadow-xs">
            <div className="h-48 bg-slate-50 dark:bg-[#0D1729] relative flex items-center justify-center text-center p-4">
              <div className="space-y-1">
                <Building2 className="w-8 h-8 text-blue-600 dark:text-[#3B82F6] mx-auto opacity-70" />
                <span className="text-xs font-bold text-slate-900 dark:text-[#F1F5F9] block">
                  {clinic.name} Location Map
                </span>
                <span className="text-[11px] text-slate-500 dark:text-[#94A3B8]">
=======
          <Card className="overflow-hidden border-slate-200 dark:border-slate-800">
            <div className="h-48 bg-slate-100 dark:bg-slate-800 relative flex items-center justify-center text-center p-4">
              <div className="space-y-1">
                <Building2 className="w-8 h-8 text-blue-600 mx-auto opacity-70" />
                <span className="text-xs font-bold text-slate-800 dark:text-white block">
                  {clinic.name} Location Map
                </span>
                <span className="text-[11px] text-slate-500">
>>>>>>> origin/main
                  {clinic.locality || clinic.city} Landmark Center
                </span>
              </div>
            </div>
<<<<<<< HEAD
            <div className="p-3 bg-slate-100/70 dark:bg-[#0B1628] text-[11px] text-slate-500 dark:text-[#94A3B8] text-center border-t border-slate-200 dark:border-[#263B59]">
=======
            <div className="p-3 bg-slate-50 dark:bg-slate-800/40 text-[11px] text-slate-500 text-center border-t border-slate-100 dark:border-slate-800">
>>>>>>> origin/main
              Validated GPS coordinates stored in clinic registry.
            </div>
          </Card>
        </div>

        {/* Right Column: Contact Message Form */}
        <div className="lg:col-span-7">
<<<<<<< HEAD
          <Card className="p-6 sm:p-8 border-slate-200 dark:border-[#263B59] bg-white dark:bg-[#111E33] space-y-5 shadow-xs">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-slate-900 dark:text-[#F1F5F9]">
                Send an Inquiry to Front Desk
              </h2>
              <p className="text-xs text-slate-500 dark:text-[#94A3B8]">
=======
          <Card className="p-6 sm:p-8 border-slate-200 dark:border-slate-800 space-y-5">
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Send an Inquiry to Front Desk
              </h2>
              <p className="text-xs text-slate-500">
>>>>>>> origin/main
                Typically answered within 1–2 hours during clinic working hours.
              </p>
            </div>

            {submitted ? (
<<<<<<< HEAD
              <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 dark:text-emerald-400 mx-auto" />
                <h3 className="text-sm font-bold text-emerald-800 dark:text-emerald-200">
=======
              <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h3 className="text-sm font-bold text-emerald-900 dark:text-emerald-200">
>>>>>>> origin/main
                  Message Dispatched!
                </h3>
                <p className="text-xs text-emerald-700 dark:text-emerald-300">
                  Our front-desk coordinator will reach out to you at {senderPhone}.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSubmitted(false)}
<<<<<<< HEAD
                  className="text-xs mt-2 border-slate-200 dark:border-[#263B59] text-slate-700 dark:text-[#CBD5E1]"
=======
                  className="text-xs mt-2"
>>>>>>> origin/main
                >
                  Send Another Message
                </Button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div>
<<<<<<< HEAD
                  <label className="block text-xs font-bold text-slate-700 dark:text-[#CBD5E1] mb-1">
=======
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
>>>>>>> origin/main
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={senderName}
                    placeholder="e.g. Ananya Sen"
                    onChange={(e) => setSenderName(e.target.value)}
<<<<<<< HEAD
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-[#263B59] bg-white dark:bg-[#0B1628] text-slate-900 dark:text-[#F1F5F9] placeholder-slate-400 dark:placeholder-[#94A3B8] text-xs focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#3B82F6]"
=======
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-500"
>>>>>>> origin/main
                  />
                </div>

                <div>
<<<<<<< HEAD
                  <label className="block text-xs font-bold text-slate-700 dark:text-[#CBD5E1] mb-1">
=======
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
>>>>>>> origin/main
                    Contact Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={senderPhone}
                    placeholder="+91 98765 43210"
                    onChange={(e) => setSenderPhone(e.target.value)}
<<<<<<< HEAD
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-[#263B59] bg-white dark:bg-[#0B1628] text-slate-900 dark:text-[#F1F5F9] placeholder-slate-400 dark:placeholder-[#94A3B8] text-xs focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#3B82F6]"
=======
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-500"
>>>>>>> origin/main
                  />
                </div>

                <div>
<<<<<<< HEAD
                  <label className="block text-xs font-bold text-slate-700 dark:text-[#CBD5E1] mb-1">
=======
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
>>>>>>> origin/main
                    Your Question / Message *
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={senderMessage}
                    placeholder="Ask about consultation slots, lab reports, or procedure guidelines..."
                    onChange={(e) => setSenderMessage(e.target.value)}
<<<<<<< HEAD
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-[#263B59] bg-white dark:bg-[#0B1628] text-slate-900 dark:text-[#F1F5F9] placeholder-slate-400 dark:placeholder-[#94A3B8] text-xs focus:ring-2 focus:ring-blue-500 dark:focus:ring-[#3B82F6]"
=======
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-500"
>>>>>>> origin/main
                  />
                </div>

                <div className="pt-2">
                  <Button
                    variant="primary"
                    size="md"
                    type="submit"
                    className="font-bold text-xs text-white shadow-xs"
                    style={{ backgroundColor: primaryColor }}
                  >
                    <Send className="w-3.5 h-3.5 mr-1.5" />
                    Send Inquiry
                  </Button>
                </div>
              </form>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}


import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Calendar,
  Phone,
  Shield,
  Star,
  CheckCircle2,
  ArrowRight,
  Award,
  Sparkles,
  Zap
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { getDefaultWebsiteSettings } from '../website-builder/websiteBuilderDefaults';

export function ClinicPublicHomePage() {
  const { clinicSlug } = useParams();
  const { clinics, doctors } = useApp();

  const clinic = clinics.find((c) => c.slug === clinicSlug || c.id === clinicSlug) || clinics[0];
  const settings = clinic.websiteSettings || getDefaultWebsiteSettings(clinic);
  const clinicDoctors = doctors.filter((d) => d.clinicId === clinic.id);
  const clinicServices = clinic.services || [];

  const primaryColor = settings.primaryColor || '#2563eb';
  const secondaryColor = settings.secondaryColor || '#0ea5e9';
  const isMinimal = settings.template === 'minimal';
  const isPremium = settings.template === 'premium';

  return (
    <div className="space-y-16 pb-16 transition-colors">
      {/* 1. Hero Section with Medical Atmosphere */}
      <section
        className={`relative overflow-hidden py-16 sm:py-24 px-4 sm:px-6 lg:px-8 border-b ${
          isPremium
            ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white border-slate-800'
            : isMinimal
            ? 'bg-gradient-to-b from-stone-50 via-white to-stone-50/60 border-stone-200 text-stone-900'
            : 'bg-gradient-to-b from-blue-50/70 via-slate-50/40 to-white dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 border-slate-200 dark:border-slate-800'
        }`}
      >
        {/* Ambient background glow accents */}
        <div
          className="absolute -top-24 -left-24 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
          style={{ backgroundColor: primaryColor }}
        />
        <div
          className="absolute top-1/2 -right-24 w-96 h-96 rounded-full blur-3xl opacity-15 pointer-events-none"
          style={{ backgroundColor: secondaryColor }}
        />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          <div className="lg:col-span-7 space-y-6">
            {/* Telemetry Status Chip */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-bold bg-white/90 dark:bg-slate-900/90 shadow-2xs border border-slate-200/90 dark:border-slate-700/80 backdrop-blur-xs">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse ring-4 ring-emerald-500/20" />
              <span className="text-slate-800 dark:text-slate-200">
                Accepting New Patients Today · {clinic.specialty} Practice · Verified OPD
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.12] text-slate-900 dark:text-white">
              {settings.heroHeading}
            </h1>

            {/* Subheading */}
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              {settings.heroSubheading}
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link to={`/clinic/${clinic.slug}/book-appointment`}>
                <Button
                  variant="primary"
                  size="lg"
                  className="font-extrabold text-sm shadow-xl text-white hover:scale-[1.02] active:scale-[0.99] transition-all flex items-center gap-2 px-6 py-3.5 rounded-2xl"
                  style={{ backgroundColor: primaryColor }}
                >
                  <Calendar className="w-4 h-4" />
                  <span>{settings.heroCtaText}</span>
                  <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </Link>

              <Link to={`/clinic/${clinic.slug}/services`}>
                <Button
                  variant="outline"
                  size="lg"
                  className="text-sm font-bold bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-700 hover:border-blue-400 px-5 py-3.5 rounded-2xl backdrop-blur-xs"
                >
                  View Treatments & Fees
                </Button>
              </Link>

              {clinic.phone && (
                <a
                  href={`tel:${clinic.phone}`}
                  className="px-4 py-3 rounded-2xl text-xs font-bold text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-2 transition-colors"
                >
                  <Phone className="w-4 h-4 text-emerald-500" />
                  <span>Call {clinic.phone}</span>
                </a>
              )}
            </div>

            {/* Reassurance Micro-Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-200/60 dark:border-slate-800">
              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shadow-2xs backdrop-blur-xs">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <CheckCircle2 className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">
                  Instant WhatsApp Booking Alerts
                </span>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shadow-2xs backdrop-blur-xs">
                <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Shield className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">
                  Zero Double-Booking Guarantee
                </span>
              </div>

              <div className="flex items-center gap-2.5 p-3 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200/80 dark:border-slate-800 shadow-2xs backdrop-blur-xs">
                <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200 leading-tight">
                  Verified Digital Prescriptions
                </span>
              </div>
            </div>
          </div>

          {/* Right Hero Image Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 aspect-4/3 group">
              <img
                src={settings.bannerImage || clinic.image}
                alt={clinic.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />

              {/* Floating Top Pill */}
              <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-slate-900/85 text-white backdrop-blur-md border border-white/20 text-[11px] font-bold flex items-center gap-1.5 shadow-lg">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>15-Min Avg Waiting Time</span>
              </div>

              {/* Bottom Doctor & Verification Pill */}
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border border-white/20 shadow-xl flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1.5 text-amber-500 text-xs font-black">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                    <span>{clinic.rating || '4.9'}</span>
                    <span className="text-slate-500 font-medium">({clinic.reviewsCount || 178} Verified Reviews)</span>
                  </div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white mt-1">
                    {clinic.ownerName || 'Dr. Medical Director'}
                  </p>
                </div>
                <span className="px-3 py-1 rounded-xl text-[10px] font-extrabold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  Verified Practice
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Custom Notice Banner (if enabled) */}
      {settings.customNotice && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-4 rounded-2xl bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-blue-500/10 border border-blue-500/20 flex items-center gap-3 text-xs text-blue-900 dark:text-blue-200 shadow-2xs">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
            <span className="font-semibold">{settings.customNotice}</span>
          </div>
        </section>
      )}

      {/* 3. Why Patients Choose Us Trust Cards */}
      {settings.showWhyChooseUs && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span
              className="text-xs font-extrabold uppercase tracking-wider block"
              style={{ color: primaryColor }}
            >
              Patient Care Standards
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              Why Patients Choose {clinic.name}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {(settings.whyChooseUs || []).map((w, idx) => (
              <Card
                key={idx}
                className="p-5 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3 hover:shadow-lg hover:-translate-y-0.5 transition-all relative overflow-hidden group rounded-2xl"
              >
                <div
                  className="w-10 h-10 rounded-2xl flex items-center justify-center text-white text-xs font-extrabold shadow-sm group-hover:scale-105 transition-transform"
                  style={{ backgroundColor: primaryColor }}
                >
                  0{idx + 1}
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {w.title}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  {w.description}
                </p>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* 4. Consultation Services & Fees Menu */}
      {settings.showServices && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <span
                className="text-xs font-extrabold uppercase tracking-wider block"
                style={{ color: primaryColor }}
              >
                Transparent Healthcare
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                Consultation Services & Pricing
              </h2>
            </div>
            <Link to={`/clinic/${clinic.slug}/services`}>
              <Button variant="outline" size="sm" className="text-xs font-bold">
                View All {clinicServices.length} Services →
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {clinicServices.slice(0, 6).map((srv) => (
              <Card
                key={srv.id}
                className="p-5 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between space-y-4 hover:border-blue-400 dark:hover:border-blue-600 transition-all hover:shadow-md rounded-2xl"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 uppercase tracking-wider">
                      {srv.category || 'Consultation'}
                    </span>
                    <span className="text-xs font-mono text-slate-500 font-semibold">
                      🕒 {srv.durationMinutes || 30} mins
                    </span>
                  </div>
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                    {srv.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                    {srv.description || 'Clinical consultation, vitals evaluation, and digital prescription issuance.'}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold block">Consultation Fee</span>
                    <span className="text-lg font-black text-blue-600 dark:text-blue-400 font-mono">
                      ₹{srv.fee}
                    </span>
                  </div>
                  <Link to={`/clinic/${clinic.slug}/book-appointment?service=${srv.id}`}>
                    <Button
                      variant="primary"
                      size="sm"
                      className="text-xs font-bold text-white shadow-xs"
                      style={{ backgroundColor: primaryColor }}
                    >
                      Book Slot
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* 5. Doctor Profiles Roster */}
      {settings.showDoctors && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <span
                className="text-xs font-extrabold uppercase tracking-wider block"
                style={{ color: primaryColor }}
              >
                Medical Leadership
              </span>
              <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
                Consult With Our Specialists
              </h2>
            </div>
            <Link to={`/clinic/${clinic.slug}/doctors`}>
              <Button variant="outline" size="sm" className="text-xs font-bold">
                Meet Entire Team →
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clinicDoctors.map((doc) => (
              <Card
                key={doc.id}
                className="p-5 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col justify-between space-y-4 hover:shadow-lg transition-all rounded-2xl"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={doc.avatar}
                    alt={doc.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-100 dark:border-slate-700 shadow-xs shrink-0"
                  />
                  <div className="min-w-0">
                    <h3 className="text-base font-extrabold text-slate-900 dark:text-white truncate">
                      {doc.name}
                    </h3>
                    <p
                      className="text-xs font-bold truncate"
                      style={{ color: primaryColor }}
                    >
                      {doc.specialty}
                    </p>
                    <p className="text-[11px] text-slate-500 font-mono mt-0.5 truncate">
                      {doc.qualifications}
                    </p>
                    <span className="inline-block mt-1 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                      {doc.experienceYears}+ Yrs Clinical Exp
                    </span>
                  </div>
                </div>

                <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1.5 bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">Working Slot:</span>
                    <span className="font-bold text-slate-900 dark:text-white">{doc.workingHours}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500">Consultation Fee:</span>
                    <span className="font-extrabold text-blue-600 dark:text-blue-400 font-mono">
                      ₹{doc.consultationFee}
                    </span>
                  </div>
                </div>

                <Link to={`/clinic/${clinic.slug}/book-appointment?doctor=${doc.id}`}>
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full font-bold text-xs text-white shadow-xs"
                    style={{ backgroundColor: primaryColor }}
                  >
                    Book with {doc.name.split(' ')[1] || doc.name}
                  </Button>
                </Link>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* 6. Patient Testimonials */}
      {settings.showTestimonials && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span
              className="text-xs font-extrabold uppercase tracking-wider block"
              style={{ color: primaryColor }}
            >
              Verified Feedback
            </span>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              Patient Testimonials & Reviews
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {(settings.testimonials || []).map((t, idx) => (
              <Card
                key={idx}
                className="p-5 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3 flex flex-col justify-between rounded-2xl hover:shadow-md transition-shadow"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-1 text-amber-500 text-sm">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        className={`w-3.5 h-3.5 ${
                          s <= (t.rating || 5)
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-300 dark:text-slate-700'
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
                    "{t.feedback}"
                  </p>
                </div>
                <div className="pt-2.5 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px]">
                  <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    {t.patientName}
                  </span>
                  <span className="text-slate-400 font-mono">{t.date}</span>
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* 7. Bottom Appointment CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="rounded-3xl p-8 sm:p-12 text-white shadow-2xl relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6"
          style={{
            background: `linear-gradient(135deg, ${primaryColor}, ${secondaryColor})`
          }}
        >
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Ready to visit {clinic.name}?
            </h2>
            <p className="text-xs sm:text-sm text-white/95 leading-relaxed">
              Book your consultation online in under 60 seconds. Choose your preferred doctor and slot, and receive instant WhatsApp reminders.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link to={`/clinic/${clinic.slug}/book-appointment`}>
              <button className="px-6 py-3.5 rounded-2xl bg-white text-slate-900 font-extrabold text-sm shadow-xl hover:bg-slate-100 hover:scale-105 transition-all cursor-pointer whitespace-nowrap">
                Book Online Now →
              </button>
            </Link>
            {clinic.phone && (
              <a
                href={`tel:${clinic.phone}`}
                className="px-5 py-3.5 rounded-2xl bg-white/15 hover:bg-white/25 border border-white/25 text-white font-bold text-xs backdrop-blur-xs transition-colors"
              >
                Call {clinic.phone}
              </a>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  Shield,
  Star,
  CheckCircle2,
  ArrowRight,
  Stethoscope,
  Award,
  Users,
  MessageSquare,
  Sparkles
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
  const isMinimal = settings.template === 'minimal';
  const isPremium = settings.template === 'premium';

  return (
    <div className="space-y-16 pb-12">
      {/* 1. Hero Section */}
      <section
        className={`relative overflow-hidden py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b ${
          isPremium
            ? 'bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 text-white border-slate-800'
            : isMinimal
            ? 'bg-stone-100/70 border-stone-200 text-stone-900'
            : 'bg-gradient-to-r from-blue-50/70 via-indigo-50/40 to-white border-slate-200'
        }`}
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white/80 dark:bg-slate-900/80 shadow-xs border border-slate-200/80 dark:border-slate-800">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-slate-800 dark:text-slate-200">
                Accepting New Patients Today · {clinic.specialty}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.15]">
              {settings.heroHeading}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              {settings.heroSubheading}
            </p>

            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link to={`/clinic/${clinic.slug}/book-appointment`}>
                <Button
                  variant="primary"
                  size="lg"
                  className="font-bold text-sm shadow-lg text-white"
                  style={{ backgroundColor: primaryColor }}
                >
                  <Calendar className="w-4 h-4 mr-2" />
                  {settings.heroCtaText}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to={`/clinic/${clinic.slug}/services`}>
                <Button variant="outline" size="lg" className="text-sm font-semibold">
                  View Treatments & Fees
                </Button>
              </Link>
            </div>

            {/* Quick Reassurance Pill Row */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-600 dark:text-slate-400 border-t border-slate-200/60 dark:border-slate-800">
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Instant WhatsApp Confirmation</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Zero Double-Booking Guarantee</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                <span>Verified Digital Prescriptions</span>
              </div>
            </div>
          </div>

          {/* Right Hero Image Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white dark:border-slate-800 aspect-4/3">
              <img
                src={settings.bannerImage || clinic.image}
                alt={clinic.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border border-white/20 shadow-lg flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1 text-amber-500 text-xs font-bold">
                    ★ {clinic.rating} ({clinic.reviewsCount} Patient Reviews)
                  </div>
                  <p className="text-xs font-bold text-slate-900 dark:text-white mt-0.5">
                    {clinic.ownerName}
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-xl text-[10px] font-bold uppercase bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                  Verified Practice
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Custom Notice if defined */}
      {settings.customNotice && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 flex items-center gap-3 text-xs text-blue-900 dark:text-blue-200">
            <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
            <span className="font-medium">{settings.customNotice}</span>
          </div>
        </section>
      )}

      {/* 3. Why Choose Us Trust Cards */}
      {settings.showWhyChooseUs && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Patient Care Standards
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Why Patients Choose {clinic.name}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {settings.whyChooseUs.map((w, idx) => (
              <Card
                key={idx}
                className="p-5 border-slate-200 dark:border-slate-800 space-y-2 hover:shadow-md transition-shadow"
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold shadow-xs"
                  style={{ backgroundColor: primaryColor }}
                >
                  {idx + 1}
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white pt-1">
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

      {/* 4. Featured Services Menu */}
      {settings.showServices && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Transparent Healthcare
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Services & Consultation Fees
              </h2>
            </div>
            <Link to={`/clinic/${clinic.slug}/services`}>
              <Button variant="outline" size="sm" className="text-xs">
                View All {clinicServices.length} Services →
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {clinicServices.slice(0, 6).map((srv) => (
              <Card
                key={srv.id}
                className="p-5 border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4 hover:border-blue-400 transition-colors"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      {srv.category}
                    </span>
                    <span className="text-xs font-mono text-slate-500">
                      🕒 {srv.durationMinutes || 30} mins
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {srv.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                    {srv.description || 'Clinical assessment, patient counselling, and personalized prescription protocol.'}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Consultation Fee</span>
                    <span className="text-base font-extrabold text-blue-600 dark:text-blue-400">
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
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                Medical Leadership
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Consult With Our Specialists
              </h2>
            </div>
            <Link to={`/clinic/${clinic.slug}/doctors`}>
              <Button variant="outline" size="sm" className="text-xs">
                Meet Entire Team →
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clinicDoctors.map((doc) => (
              <Card
                key={doc.id}
                className="p-5 border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-4"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={doc.avatar}
                    alt={doc.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-100 dark:border-slate-700 shadow-xs shrink-0"
                  />
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-slate-900 dark:text-white truncate">
                      {doc.name}
                    </h3>
                    <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 truncate">
                      {doc.specialty}
                    </p>
                    <p className="text-[11px] text-slate-500 font-mono mt-0.5 truncate">
                      {doc.qualifications}
                    </p>
                    <span className="inline-block mt-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded">
                      {doc.experienceYears}+ Yrs Clinical Exp
                    </span>
                  </div>
                </div>

                <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1 bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl">
                  <div className="flex items-center justify-between text-[11px]">
                    <span>Consultation Slot:</span>
                    <span className="font-semibold text-slate-900 dark:text-white">{doc.workingHours}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span>Consultation Fee:</span>
                    <span className="font-bold text-blue-600 dark:text-blue-400">₹{doc.consultationFee}</span>
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
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
              Verified Feedback
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Patient Testimonials
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {settings.testimonials.map((t, idx) => (
              <Card
                key={idx}
                className="p-5 border-slate-200 dark:border-slate-800 space-y-3 flex flex-col justify-between"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-1 text-amber-500 text-sm">
                    {'★'.repeat(t.rating)}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed italic">
                    "{t.feedback}"
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px]">
                  <span className="font-bold text-slate-900 dark:text-white">{t.patientName}</span>
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
          style={{ backgroundColor: primaryColor }}
        >
          <div className="space-y-2 max-w-xl text-center md:text-left">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Ready to visit {clinic.name}?
            </h2>
            <p className="text-xs sm:text-sm text-white/90 leading-relaxed">
              Book your consultation online in under 60 seconds. Choose your preferred doctor and slot, and receive instant WhatsApp reminders.
            </p>
          </div>

          <Link to={`/clinic/${clinic.slug}/book-appointment`}>
            <button className="px-6 py-3 rounded-2xl bg-white text-slate-900 font-extrabold text-sm shadow-xl hover:bg-slate-100 transition-all cursor-pointer whitespace-nowrap">
              Book Online Now →
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
}


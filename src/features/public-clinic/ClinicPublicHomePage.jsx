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
  Sparkles,
  User,
  LogIn,
  UserPlus,
  FileText,
  ShoppingBag,
  BookOpen,
  PhoneCall,
  ShieldAlert,
  Pill

} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { getDefaultWebsiteSettings } from '../website-builder/websiteBuilderDefaults';
import { HEALTH_ARTICLES } from '../../demo-data/healthEducationData';
import { DEMO_PHARMACY_CATALOG } from '../../demo-data/pharmacyCatalog';


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
      <section className="relative overflow-hidden py-14 sm:py-20 px-4 sm:px-6 lg:px-8 border-b bg-gradient-to-br from-[#F4F7FC] via-white to-[#EFF6FF] dark:from-[#080F1E] dark:via-[#0D1729] dark:to-[#172640] text-slate-900 dark:text-[#F1F5F9] border-slate-200 dark:border-[#263B59] transition-colors">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white dark:bg-[#111E33] shadow-xs border border-slate-200 dark:border-[#263B59]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-slate-700 dark:text-[#CBD5E1]">
                Accepting New Patients Today · {clinic.specialty}
              </span>
            </div>

            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-[1.15] text-slate-900 dark:text-[#F1F5F9]">
              {settings.heroHeading}
            </h1>

            <p className="text-base sm:text-lg text-slate-600 dark:text-[#CBD5E1] max-w-2xl leading-relaxed">
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
                <Button variant="outline" size="lg" className="text-sm font-semibold border-slate-300 dark:border-[#263B59] text-slate-700 dark:text-[#CBD5E1] hover:text-slate-900 dark:hover:text-[#F1F5F9] hover:bg-slate-100 dark:hover:bg-[#172640]">
                  View Treatments & Fees
                </Button>
              </Link>
            </div>

            {/* Quick Reassurance Pill Row */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-600 dark:text-[#CBD5E1] border-t border-slate-200 dark:border-[#263B59]">
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                <span>Instant WhatsApp Confirmation</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                <span>Zero Double-Booking Guarantee</span>
              </div>
              <div className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 dark:text-emerald-400" />
                <span>Verified Digital Prescriptions</span>

              </div>
            </div>
          </div>

          {/* Right Hero Image Card */}
          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-slate-200 dark:border-[#263B59] aspect-4/3">
              <img
                src={settings.bannerImage || clinic.image}
                alt={clinic.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 dark:from-[#080F1E]/90 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-white/95 dark:bg-[#111E33]/90 backdrop-blur-md border border-slate-200 dark:border-[#263B59] shadow-lg flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-1 text-amber-500 dark:text-amber-400 text-xs font-bold">
                    ★ {clinic.rating} ({clinic.reviewsCount} Patient Reviews)
                  </div>
                  <p className="text-xs font-bold text-slate-900 dark:text-[#F1F5F9] mt-0.5">
                    {clinic.ownerName}
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-xl text-[10px] font-bold uppercase bg-cyan-50 dark:bg-[#172640] border border-cyan-200 dark:border-[#263B59] text-cyan-800 dark:text-[#22D3EE]">

                  Verified Practice
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Patient Portal & Digital Access Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl p-6 sm:p-8 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white shadow-xl border border-blue-700/50 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-300 border border-blue-400/30">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Digital Health Records & Patient Services</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Patient Portal for {clinic.name}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Sign in to view your digital prescriptions, lab reports, invoices, and schedule direct consultations with your specialists. New to our clinic? Register in seconds to create your health profile and access the patient portal.
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-2 text-xs text-slate-300">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Verified Prescriptions</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Live Queue Token</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Invoices & Receipts</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row lg:flex-col gap-3 shrink-0">
            <Link to={`/clinic/${clinic.slug}/signin`}>
              <Button
                variant="primary"
                size="md"
                className="w-full font-bold text-xs shadow-lg text-white bg-blue-600 hover:bg-blue-500 flex items-center justify-center gap-2 py-3 px-6 cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In to Patient Portal</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
            <Link to={`/clinic/${clinic.slug}/register`}>
              <Button
                variant="outline"
                size="md"
                className="w-full font-bold text-xs text-white border-white/30 hover:bg-white/10 flex items-center justify-center gap-2 py-3 px-6 cursor-pointer"
              >
                <UserPlus className="w-4 h-4" />
                <span>Create Patient Account</span>
              </Button>
            </Link>
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
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-[#22D3EE]">
              Patient Care Standards
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-[#F1F5F9]">

              Why Patients Choose {clinic.name}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {settings.whyChooseUs.map((w, idx) => (
              <Card
                key={idx}
                className="p-5 border-slate-200 dark:border-[#263B59] bg-white dark:bg-[#111E33] space-y-2 hover:border-blue-400 dark:hover:border-[#3B82F6] hover:shadow-md transition-all"
              >
                <div
                  className="w-9 h-9 rounded-xl flex items-center justify-center text-white text-xs font-bold shadow-xs"
                  style={{ backgroundColor: primaryColor }}
                >
                  {idx + 1}
                </div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-[#F1F5F9] pt-1">
                  {w.title}
                </h3>
                <p className="text-xs text-slate-600 dark:text-[#CBD5E1] leading-relaxed">

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
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-[#263B59] pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-[#22D3EE]">
                Transparent Healthcare
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-[#F1F5F9]">
                Services & Consultation Fees
              </h2>
            </div>
            <Link to={`/clinic/${clinic.slug}/services`}>
              <Button variant="outline" size="sm" className="text-xs border-slate-200 dark:border-[#263B59] text-slate-700 dark:text-[#CBD5E1] hover:text-slate-900 dark:hover:text-[#F1F5F9]">

                View All {clinicServices.length} Services →
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {clinicServices.slice(0, 6).map((srv) => (
              <Card
                key={srv.id}
                className="p-5 border-slate-200 dark:border-[#263B59] bg-white dark:bg-[#111E33] flex flex-col justify-between space-y-4 hover:border-blue-400 dark:hover:border-[#3B82F6] transition-colors"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-[#94A3B8]">
                      {srv.category}
                    </span>
                    <span className="text-xs font-mono text-slate-600 dark:text-[#CBD5E1]">
                      🕒 {srv.durationMinutes || 30} mins
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-[#F1F5F9]">
                    {srv.name}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-[#CBD5E1] line-clamp-2">
                    {srv.description || 'Clinical assessment, patient counselling, and personalized prescription protocol.'}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200 dark:border-[#263B59] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-500 dark:text-[#94A3B8] block">Consultation Fee</span>
                    <span className="text-base font-extrabold text-blue-600 dark:text-[#22D3EE]">

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
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-[#263B59] pb-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-[#22D3EE]">
                Medical Leadership
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-[#F1F5F9]">
                Consult With Our Specialists
              </h2>
            </div>
            <Link to={`/clinic/${clinic.slug}/doctors`}>
              <Button variant="outline" size="sm" className="text-xs border-slate-200 dark:border-[#263B59] text-slate-700 dark:text-[#CBD5E1] hover:text-slate-900 dark:hover:text-[#F1F5F9]">
                Meet Entire Team →
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clinicDoctors.map((doc) => (
              <Card
                key={doc.id}
                className="p-5 border-slate-200 dark:border-[#263B59] bg-white dark:bg-[#111E33] flex flex-col justify-between space-y-4 shadow-2xs hover:border-blue-400 dark:hover:border-[#3B82F6] transition-colors"
              >
                <div className="flex items-start gap-4">
                  <img
                    src={doc.avatar}
                    alt={doc.name}
                    className="w-16 h-16 rounded-2xl object-cover border-2 border-slate-200 dark:border-[#263B59] shadow-xs shrink-0"
                  />
                  <div className="min-w-0">
                    <h3 className="text-base font-bold text-slate-900 dark:text-[#F1F5F9] truncate">
                      {doc.name}
                    </h3>
                    <p className="text-xs font-semibold text-blue-600 dark:text-[#22D3EE] truncate">
                      {doc.specialty}
                    </p>
                    <p className="text-[11px] text-slate-500 dark:text-[#94A3B8] font-mono mt-0.5 truncate">
                      {doc.qualifications}
                    </p>
                    <span className="inline-block mt-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 dark:text-emerald-300 dark:bg-emerald-950/60 dark:border-emerald-800 px-2 py-0.5 rounded">
                      {doc.experienceYears}+ Yrs Clinical Exp
                    </span>
                  </div>
                </div>

                <div className="text-xs text-slate-700 dark:text-[#CBD5E1] space-y-1 bg-slate-50 dark:bg-[#0D1729] border border-slate-200 dark:border-[#263B59] p-3 rounded-xl">
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 dark:text-[#94A3B8]">Consultation Slot:</span>
                    <span className="font-semibold text-slate-900 dark:text-[#F1F5F9]">{doc.workingHours}</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="text-slate-500 dark:text-[#94A3B8]">Consultation Fee:</span>
                    <span className="font-bold text-blue-600 dark:text-[#22D3EE]">₹{doc.consultationFee}</span>
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
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-[#22D3EE]">
              Verified Feedback
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-[#F1F5F9]">
              Patient Testimonials

            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {settings.testimonials.map((t, idx) => (
              <Card
                key={idx}
                className="p-5 border-slate-200 dark:border-[#263B59] bg-white dark:bg-[#111E33] space-y-3 flex flex-col justify-between shadow-2xs"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-1 text-amber-400 text-sm">
                    {'★'.repeat(t.rating)}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-[#CBD5E1] leading-relaxed italic">
                    "{t.feedback}"
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-100 dark:border-[#263B59] flex items-center justify-between text-[11px]">
                  <span className="font-bold text-slate-900 dark:text-[#F1F5F9]">{t.patientName}</span>
                  <span className="text-slate-400 dark:text-[#94A3B8] font-mono">{t.date}</span>

                </div>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* Pharmacy & Medicine Purchase Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-[#263B59] pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400 flex items-center gap-1.5">
              <ShoppingBag className="w-3.5 h-3.5" /> Direct Clinic Fulfillment
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-[#F1F5F9]">
              Order Prescribed Medicines Online
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-[#94A3B8] mt-1">
              Purchase genuine medications certified by our licensed clinic pharmacy with door delivery or counter pickup.
            </p>
          </div>
          <Link to={`/clinic/${clinic.slug}/pharmacy`}>
            <Button variant="outline" size="sm" className="text-xs font-bold text-teal-700 dark:text-teal-300 border-teal-300 dark:border-teal-800 bg-teal-50 dark:bg-[#111E33]">
              Browse All Pharmacy ({DEMO_PHARMACY_CATALOG.length} Medicines) →
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {DEMO_PHARMACY_CATALOG.slice(0, 4).map((med) => (
            <Card
              key={med.id}
              className="border-slate-200 dark:border-[#263B59] bg-white dark:bg-[#111E33] flex flex-col justify-between overflow-hidden shadow-2xs group hover:border-teal-400 transition-all"
            >
              <div>
                <div className="relative aspect-16/10 bg-slate-100 dark:bg-[#0B1628] overflow-hidden">
                  <img src={med.image} alt={med.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-900/80 dark:bg-[#080F1E]/90 text-white dark:text-[#F1F5F9]">
                    {med.form}
                  </span>
                  <span className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500 text-slate-950">
                    {med.discountPercent}% OFF
                  </span>
                </div>
                <div className="p-4 space-y-1.5">
                  <span className="text-[10px] font-mono font-semibold text-teal-600 dark:text-[#22D3EE] block">{med.genericName}</span>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-[#F1F5F9] line-clamp-1">{med.name}</h3>
                  <p className="text-xs text-slate-600 dark:text-[#CBD5E1] line-clamp-2">{med.description}</p>
                </div>
              </div>
              <div className="p-4 pt-3 border-t border-slate-100 dark:border-[#263B59] flex items-center justify-between bg-slate-50 dark:bg-[#0D1729]">
                <div>
                  <span className="text-base font-extrabold text-slate-900 dark:text-[#F1F5F9]">₹{med.price}</span>
                  <span className="text-xs text-slate-400 dark:text-[#94A3B8] line-through ml-1.5">₹{med.mrp}</span>
                </div>
                <Link to={`/clinic/${clinic.slug}/pharmacy`}>
                  <Button variant="primary" size="sm" className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs">
                    Buy Medicine
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Health Education Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-slate-200 dark:border-[#263B59] pb-4">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5" /> Doctor-Authored Education
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-[#F1F5F9]">
              Patient Health & Wellness Guides
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-[#94A3B8] mt-1">
              Read actionable medical guides on hypertension, medication adherence, oral health, and diabetes control.
            </p>
          </div>
          <Link to={`/clinic/${clinic.slug}/education`}>
            <Button variant="outline" size="sm" className="text-xs font-bold text-indigo-700 dark:text-indigo-300 border-indigo-300 dark:border-indigo-800 bg-indigo-50 dark:bg-[#111E33]">
              View All Health Guides ({HEALTH_ARTICLES.length}) →
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {HEALTH_ARTICLES.slice(0, 3).map((art) => (
            <Card
              key={art.id}
              className="border-slate-200 dark:border-[#263B59] bg-white dark:bg-[#111E33] flex flex-col justify-between overflow-hidden shadow-2xs group hover:border-indigo-400 transition-all"
            >
              <div>
                <div className="relative aspect-16/9 bg-slate-100 dark:bg-[#0B1628] overflow-hidden">
                  <img src={art.coverImage} alt={art.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded text-[10px] font-bold uppercase bg-slate-900/80 dark:bg-[#080F1E]/90 text-white dark:text-[#F1F5F9]">
                    {art.category}
                  </span>
                </div>
                <div className="p-5 space-y-2">
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 dark:text-[#94A3B8] font-mono">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{art.readTime}</span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 dark:text-[#F1F5F9] line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-[#3B82F6] transition-colors">
                    {art.title}
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-[#CBD5E1] line-clamp-3 leading-relaxed">
                    {art.summary}
                  </p>
                </div>
              </div>
              <div className="p-4 pt-3 border-t border-slate-100 dark:border-[#263B59] flex items-center justify-between bg-slate-50 dark:bg-[#0D1729]">
                <span className="text-xs text-slate-500 dark:text-[#94A3B8] font-medium">By {art.doctorAuthor.name}</span>
                <Link to={`/clinic/${clinic.slug}/education`}>
                  <span className="text-xs font-bold text-blue-600 dark:text-[#22D3EE] hover:underline flex items-center gap-0.5">
                    Read Guide &rarr;
                  </span>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Emergency Helpline Section Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 rounded-3xl bg-linear-to-r from-red-600 via-rose-700 to-red-800 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6 relative overflow-hidden">
          <div className="space-y-2.5 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-white/20 text-white border border-white/30">
              <span className="w-2 h-2 rounded-full bg-amber-300 animate-ping" />
              <span>24/7 Rapid Medical Helpline & SOS Directory</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight">
              Medical Emergency at {clinic.name}?
            </h2>
            <p className="text-xs sm:text-sm text-red-100 leading-relaxed">
              For acute chest pain, severe trauma, stroke symptoms, or allergic shock, call <strong>108 / 112</strong> or contact our direct 24/7 clinic emergency desk at <strong>{clinic.phone}</strong>.
            </p>
            <div className="flex flex-wrap items-center gap-4 text-xs font-bold text-red-100 pt-1">
              <span>🚑 108 Ambulance</span>
              <span>•</span>
              <span>🚨 112 Unified SOS</span>
              <span>•</span>
              <span>🩸 104 Blood Bank</span>
              <span>•</span>
              <span>🧪 1800-11-6117 Poison Info</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href="tel:108"
              className="px-5 py-3 rounded-2xl bg-white text-red-700 hover:bg-red-50 font-black text-sm shadow-lg flex items-center justify-center gap-2 cursor-pointer"
            >
              <PhoneCall className="w-4 h-4 animate-bounce text-red-600" />
              <span>Call 108 Now</span>
            </a>
            <Link to={`/clinic/${clinic.slug}/emergency`}>
              <Button
                variant="outline"
                size="md"
                className="w-full text-white border-white/40 hover:bg-white/10 font-bold text-xs py-3 px-5"
              >
                <span>View Emergency Triage & Protocols →</span>
              </Button>
            </Link>
          </div>
        </div>
      </section>


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



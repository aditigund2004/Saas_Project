import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Globe,
  Palette,
  Layout,
  Type,
  Eye,
  CheckCircle2,
  Clock,
  Sparkles,
  ExternalLink,
  Save,
  RotateCcw,
  Smartphone,
  Tablet,
  Monitor,
  Building2,
  Stethoscope,
  Users,
  MessageSquare,
  Award,
  Calendar,
  AlertCircle,
  Image as ImageIcon,
  Check,
  ChevronRight,
  Shield,
  Phone,
  MapPin,
  Star
} from 'lucide-react';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
  TEMPLATE_METADATA,
  COLOR_PRESETS,
  FONT_OPTIONS,
  SAMPLE_HERO_IMAGES,
  getDefaultWebsiteSettings
} from './websiteBuilderDefaults';

export function WebsiteBuilderPage() {
  const { clinics, activeClinicId, activeClinic, updateClinicWebsite, publishClinicWebsite, unpublishClinicWebsite, saveClinicWebsiteDraft, doctors } = useApp();

  const currentClinic = activeClinic || clinics[0];
  const settings = currentClinic?.websiteSettings || getDefaultWebsiteSettings(currentClinic);

  const [activeSection, setActiveSection] = useState('hero');
  const [viewport, setViewport] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);

  // Local draft state for live responsive feedback
  const [formData, setFormData] = useState({ ...settings });

  // Handle local change & sync to context
  const handleFieldChange = (key, value) => {
    const updated = { ...formData, [key]: value };
    setFormData(updated);
    updateClinicWebsite(currentClinic.id, { [key]: value });
  };

  const handleTemplateChange = (tmpl) => {
    handleFieldChange('template', tmpl);
  };

  const handleSaveDraft = () => {
    saveClinicWebsiteDraft(currentClinic.id, formData);
  };

  const handleConfirmPublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      publishClinicWebsite(currentClinic.id);
      setIsPublishing(false);
      setShowPublishModal(false);
    }, 600);
  };

  const clinicDoctors = doctors.filter((d) => d.clinicId === currentClinic.id);
  const clinicServices = currentClinic.services || [];

  const getStatusBadge = () => {
    const st = formData.status;
    if (st === 'published') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          Live & Published
        </span>
      );
    }
    if (st === 'changes_pending') {
      return (
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
          Unpublished Changes
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
        <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
        Draft Mode
      </span>
    );
  };

  const sectionsList = [
    { id: 'hero', label: 'Hero Banner', icon: Sparkles, desc: 'Headline, tagline & primary CTA' },
    { id: 'template', label: 'Template & Theme', icon: Layout, desc: 'Visual archetype & styling' },
    { id: 'about', label: 'About Practice', icon: Building2, desc: 'Clinic story & credentials' },
    { id: 'services', label: 'Services Menu', icon: Stethoscope, desc: 'Consultation offerings' },
    { id: 'doctors', label: 'Doctors Roster', icon: Users, desc: 'Profiles & booking triggers' },
    { id: 'why_us', label: 'Why Choose Us', icon: Award, desc: 'Key trust propositions' },
    { id: 'testimonials', label: 'Patient Reviews', icon: MessageSquare, desc: 'Social proof & ratings' },
    { id: 'contact', label: 'Hours & Contact', icon: Calendar, desc: 'Timings, phone & address' }
  ];

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] bg-slate-100 dark:bg-slate-950 overflow-hidden">
      {/* Top Action Header Bar */}
      <header className="h-16 px-4 sm:px-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0 z-30">
        <div className="flex items-center gap-3">
          <Link
            to="/app/dashboard"
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-white flex items-center gap-1"
          >
            ← Dashboard
          </Link>
          <div className="h-4 w-px bg-slate-200 dark:bg-slate-800" />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-sm font-bold text-slate-900 dark:text-white">
                {currentClinic.name} Website Builder
              </h1>
              {getStatusBadge()}
            </div>
            <p className="text-[11px] text-slate-500 font-mono">
              clinicos.in/{currentClinic.slug}
            </p>
          </div>
        </div>

        {/* Viewport Toggles (Center) */}
        <div className="hidden md:flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setViewport('desktop')}
            className={`p-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
              viewport === 'desktop'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
            title="Desktop View (1440px+)"
          >
            <Monitor className="w-3.5 h-3.5" />
            <span className="hidden lg:inline text-[11px]">Desktop</span>
          </button>
          <button
            onClick={() => setViewport('tablet')}
            className={`p-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
              viewport === 'tablet'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
            title="Tablet View (768px)"
          >
            <Tablet className="w-3.5 h-3.5" />
            <span className="hidden lg:inline text-[11px]">Tablet</span>
          </button>
          <button
            onClick={() => setViewport('mobile')}
            className={`p-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer ${
              viewport === 'mobile'
                ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
            title="Mobile View (375px)"
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span className="hidden lg:inline text-[11px]">Mobile</span>
          </button>
        </div>

        {/* Actions (Right) */}
        <div className="flex items-center gap-2">
          <Link
            to={`/clinic/${currentClinic.slug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:inline-flex"
          >
            <Button variant="outline" size="sm" className="text-xs">
              <Eye className="w-3.5 h-3.5 mr-1" />
              Live Site
              <ExternalLink className="w-3 h-3 ml-1 text-slate-400" />
            </Button>
          </Link>

          <Button
            variant="ghost"
            size="sm"
            onClick={handleSaveDraft}
            className="text-xs text-slate-600 dark:text-slate-300"
          >
            <Save className="w-3.5 h-3.5 mr-1" />
            Save Draft
          </Button>

          {formData.status === 'published' ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => unpublishClinicWebsite(currentClinic.id)}
              className="text-xs text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 border-rose-200 dark:border-rose-900"
            >
              Unpublish
            </Button>
          ) : null}

          <Button
            variant="primary"
            size="sm"
            onClick={() => setShowPublishModal(true)}
            className="text-xs bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-xs"
          >
            <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
            Publish Website
          </Button>
        </div>
      </header>

      {/* Main 3-Column Studio Workspace */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel: Sections Navigation */}
        <aside className="w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col shrink-0 overflow-y-auto">
          <div className="p-3 border-b border-slate-100 dark:border-slate-800">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              Website Sections & Content
            </span>
          </div>
          <nav className="p-2 space-y-1">
            {sectionsList.map((sec) => {
              const Icon = sec.icon;
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveSection(sec.id)}
                  className={`w-full text-left px-3 py-2.5 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-bold border border-blue-200/80 dark:border-blue-800/80 shadow-xs'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 font-medium'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'}`} />
                    <div className="truncate text-left">
                      <div className="text-xs">{sec.label}</div>
                      <div className="text-[10px] text-slate-400 font-normal truncate">{sec.desc}</div>
                    </div>
                  </div>
                  <ChevronRight className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-blue-600' : 'text-slate-300'}`} />
                </button>
              );
            })}
          </nav>

          <div className="mt-auto p-3 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 text-xs">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] font-bold text-slate-700 dark:text-slate-300">Active Template</span>
              <span className="text-[10px] uppercase font-bold text-blue-600 bg-blue-50 dark:bg-blue-950 px-1.5 py-0.5 rounded">
                {formData.template}
              </span>
            </div>
            <p className="text-[10px] text-slate-500">
              {TEMPLATE_METADATA[formData.template]?.name}
            </p>
          </div>
        </aside>

        {/* Center Panel: Live Website Preview with Interactive Viewport Frame */}
        <main className="flex-1 bg-slate-200/70 dark:bg-slate-950 p-4 sm:p-6 overflow-y-auto flex items-start justify-center">
          <div
            className={`transition-all duration-300 bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-300/80 dark:border-slate-800 overflow-hidden flex flex-col ${
              viewport === 'desktop'
                ? 'w-full max-w-5xl'
                : viewport === 'tablet'
                ? 'w-[768px]'
                : 'w-[375px]'
            }`}
          >
            {/* Mock Browser Frame Chrome */}
            <div className="bg-slate-100 dark:bg-slate-800 px-3 py-2 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs text-slate-500 select-none">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              </div>
              <div className="bg-white dark:bg-slate-900 px-3 py-1 rounded-md text-[11px] font-mono text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 max-w-sm truncate">
                <Shield className="w-3 h-3 text-emerald-500" />
                https://clinicos.in/{currentClinic.slug}
              </div>
              <div className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                {viewport}
              </div>
            </div>

            {/* Live Rendered Clinic Website Container */}
            <div
              className="overflow-y-auto max-h-[calc(100vh-12rem)] scroll-smooth"
              style={{
                fontFamily:
                  formData.fontFamily === 'Playfair Display'
                    ? 'serif'
                    : formData.fontFamily === 'Outfit'
                    ? 'sans-serif'
                    : 'inherit'
              }}
            >
              {/* Mini Clinic Navigation */}
              <nav className="sticky top-0 z-20 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md px-6 py-3.5 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-white text-xs font-bold shadow-xs"
                    style={{ backgroundColor: formData.primaryColor }}
                  >
                    {currentClinic.name.charAt(0)}
                  </div>
                  <div>
                    <span className="text-sm font-bold text-slate-900 dark:text-white block leading-tight">
                      {currentClinic.name}
                    </span>
                    <span className="text-[10px] text-slate-400">{currentClinic.specialty} Practice</span>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-4 text-xs font-medium text-slate-600 dark:text-slate-300">
                  <span>Home</span>
                  <span>About</span>
                  <span>Doctors</span>
                  <span>Services</span>
                  <span>Contact</span>
                </div>

                <button
                  className="px-3 py-1.5 rounded-lg text-xs font-bold text-white shadow-xs cursor-pointer"
                  style={{ backgroundColor: formData.primaryColor }}
                >
                  {formData.heroCtaText}
                </button>
              </nav>

              {/* Template Render: Modern, Minimal, or Premium */}
              {formData.template === 'premium' ? (
                /* Premium Specialist Template */
                <div className="bg-slate-950 text-white">
                  <div className="relative py-16 px-6 sm:px-12 bg-gradient-to-br from-slate-950 via-slate-900 to-blue-950 overflow-hidden border-b border-slate-800">
                    <div className="relative z-10 max-w-2xl space-y-4">
                      <span className="px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider bg-amber-400/20 text-amber-300 border border-amber-400/30">
                        {currentClinic.specialty} Center of Excellence
                      </span>
                      <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight text-white">
                        {formData.heroHeading}
                      </h1>
                      <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                        {formData.heroSubheading}
                      </p>
                      <div className="pt-2 flex flex-wrap items-center gap-3">
                        <button
                          className="px-5 py-2.5 rounded-xl font-bold text-xs text-slate-900 bg-amber-400 hover:bg-amber-300 shadow-lg cursor-pointer"
                        >
                          {formData.heroCtaText} →
                        </button>
                        <span className="text-xs text-slate-400">
                          ⭐ {currentClinic.rating} · ({currentClinic.reviewsCount} Patient Reviews)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : formData.template === 'minimal' ? (
                /* Minimal Editorial Template */
                <div className="bg-stone-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
                  <div className="py-16 px-6 sm:px-12 border-b border-stone-200 dark:border-slate-800 space-y-4 max-w-3xl">
                    <span className="text-xs font-mono uppercase tracking-widest text-teal-700 dark:text-teal-400">
                      Private Clinical Practice
                    </span>
                    <h1 className="text-2xl sm:text-4xl font-serif font-normal tracking-tight text-slate-900 dark:text-white leading-tight">
                      {formData.heroHeading}
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                      {formData.heroSubheading}
                    </p>
                    <div className="pt-2">
                      <button
                        className="px-5 py-2 rounded-lg text-xs font-medium text-white shadow-xs cursor-pointer"
                        style={{ backgroundColor: formData.primaryColor }}
                      >
                        {formData.heroCtaText}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                /* Modern Medical Template (Default) */
                <div className="bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100">
                  <div className="relative py-12 px-6 sm:px-10 bg-gradient-to-r from-blue-50/60 via-indigo-50/40 to-white dark:from-slate-900 dark:via-blue-950/20 dark:to-slate-900 border-b border-slate-100 dark:border-slate-800">
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                      <div className="md:col-span-7 space-y-4">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                          <span>Accepting New Patient Appointments</span>
                        </div>
                        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                          {formData.heroHeading}
                        </h1>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                          {formData.heroSubheading}
                        </p>
                        <div className="pt-1 flex items-center gap-3">
                          <button
                            className="px-4 py-2 rounded-xl text-xs font-bold text-white shadow-md cursor-pointer"
                            style={{ backgroundColor: formData.primaryColor }}
                          >
                            {formData.heroCtaText} →
                          </button>
                          <span className="text-[11px] text-slate-500">
                            📍 {currentClinic.address}, {currentClinic.city}
                          </span>
                        </div>
                      </div>
                      <div className="md:col-span-5 hidden sm:block">
                        <div className="rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 aspect-video relative">
                          <img
                            src={formData.bannerImage}
                            alt="Clinic"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-lg bg-black/70 backdrop-blur-xs text-white text-[10px] font-mono">
                            ★ {currentClinic.rating} Verified Rating
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* About Section */}
              <div className="p-6 sm:p-10 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
                <div className="max-w-2xl space-y-3">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-blue-600 dark:text-blue-400">
                    Clinical Overview
                  </span>
                  <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                    {formData.aboutTitle}
                  </h2>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    {formData.aboutText}
                  </p>
                  <div className="grid grid-cols-2 gap-2 pt-2">
                    {formData.aboutValues.map((val, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-[11px] text-slate-700 dark:text-slate-300">
                        <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                        <span>{val}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Services Section Preview */}
              {formData.showServices && (
                <div className="p-6 sm:p-10 border-b border-slate-100 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-950/50">
                  <div className="mb-4">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-blue-600 dark:text-blue-400">
                      Medical Specializations
                    </span>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                      Featured Services & Procedures
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {clinicServices.slice(0, 4).map((srv) => (
                      <div
                        key={srv.id}
                        className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 flex items-start justify-between"
                      >
                        <div>
                          <h3 className="text-xs font-bold text-slate-900 dark:text-white">{srv.name}</h3>
                          <p className="text-[10px] text-slate-500 mt-0.5">{srv.durationMinutes || 30} mins · {srv.category}</p>
                          <p className="text-xs font-bold text-blue-600 dark:text-blue-400 mt-2">₹{srv.fee}</p>
                        </div>
                        <button
                          className="px-2.5 py-1 rounded-lg text-[10px] font-semibold text-white shadow-2xs"
                          style={{ backgroundColor: formData.primaryColor }}
                        >
                          Book Slot
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Doctors Roster Preview */}
              {formData.showDoctors && (
                <div className="p-6 sm:p-10 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <div className="mb-4">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-blue-600 dark:text-blue-400">
                      Our Medical Team
                    </span>
                    <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                      Consulting Doctors & Specialists
                    </h2>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {clinicDoctors.slice(0, 2).map((doc) => (
                      <div
                        key={doc.id}
                        className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/80 dark:border-slate-800 flex items-center gap-3"
                      >
                        <img
                          src={doc.avatar}
                          alt={doc.name}
                          className="w-12 h-12 rounded-full object-cover border-2 border-white dark:border-slate-700 shrink-0"
                        />
                        <div className="min-w-0 flex-1">
                          <h3 className="text-xs font-bold text-slate-900 dark:text-white truncate">{doc.name}</h3>
                          <p className="text-[10px] text-blue-600 dark:text-blue-400 font-medium truncate">{doc.specialty}</p>
                          <p className="text-[10px] text-slate-400 font-mono">Fee: ₹{doc.consultationFee}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Why Choose Us Preview */}
              {formData.showWhyChooseUs && (
                <div className="p-6 sm:p-10 border-b border-slate-100 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-950/40">
                  <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-3">Why Patients Choose Us</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {formData.whyChooseUs.map((w, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-800">
                        <div className="text-xs font-bold text-slate-800 dark:text-slate-200">{w.title}</div>
                        <div className="text-[10px] text-slate-500 mt-1">{w.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Testimonials Preview */}
              {formData.showTestimonials && (
                <div className="p-6 sm:p-10 border-b border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900">
                  <h2 className="text-sm font-bold text-slate-900 dark:text-white mb-3">Patient Experiences</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {formData.testimonials.slice(0, 2).map((t, idx) => (
                      <div key={idx} className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800">
                        <div className="flex items-center gap-1 text-amber-400 text-xs mb-1">
                          {'★'.repeat(t.rating)}
                        </div>
                        <p className="text-[11px] text-slate-600 dark:text-slate-300 italic">"{t.feedback}"</p>
                        <p className="text-[10px] font-bold text-slate-800 dark:text-slate-200 mt-2">— {t.patientName}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Mini Footer Preview */}
              <footer className="p-6 bg-slate-950 text-white text-xs">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div>
                    <span className="font-bold block text-sm">{currentClinic.name}</span>
                    <span className="text-[10px] text-slate-400">
                      {currentClinic.address}, {currentClinic.city} · Ph: {currentClinic.phone}
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-500">
                    Powered by ClinicOS Healthcare SaaS
                  </div>
                </div>
              </footer>
            </div>
          </div>
        </main>

        {/* Right Panel: Selected Section Property Editor */}
        <aside className="w-80 bg-white dark:bg-slate-900 border-l border-slate-200 dark:border-slate-800 p-4 overflow-y-auto shrink-0 space-y-5">
          <div className="pb-3 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              {sectionsList.find((s) => s.id === activeSection)?.label} Settings
            </span>
            <span className="text-[10px] text-blue-600 bg-blue-50 dark:bg-blue-950 px-2 py-0.5 rounded font-mono">
              Live Sync
            </span>
          </div>

          {/* 1. Hero Banner Editor */}
          {activeSection === 'hero' && (
            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Main Headline
                </label>
                <textarea
                  rows={2}
                  value={formData.heroHeading}
                  onChange={(e) => handleFieldChange('heroHeading', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Subheading Description
                </label>
                <textarea
                  rows={3}
                  value={formData.heroSubheading}
                  onChange={(e) => handleFieldChange('heroSubheading', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                  CTA Button Label
                </label>
                <input
                  type="text"
                  value={formData.heroCtaText}
                  onChange={(e) => handleFieldChange('heroCtaText', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Hero Image Preset
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {SAMPLE_HERO_IMAGES.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => handleFieldChange('bannerImage', img)}
                      className={`relative rounded-lg overflow-hidden border-2 aspect-video cursor-pointer ${
                        formData.bannerImage === img ? 'border-blue-600 ring-2 ring-blue-500/30' : 'border-transparent'
                      }`}
                    >
                      <img src={img} alt="Hero" className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 2. Template & Styling Editor */}
          {activeSection === 'template' && (
            <div className="space-y-5 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Website Template
                </label>
                <div className="space-y-2">
                  {Object.entries(TEMPLATE_METADATA).map(([key, meta]) => (
                    <div
                      key={key}
                      onClick={() => handleTemplateChange(key)}
                      className={`p-3 rounded-xl border-2 transition-all cursor-pointer ${
                        formData.template === key
                          ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/40 shadow-xs'
                          : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-bold text-xs text-slate-900 dark:text-white">{meta.name}</span>
                        <span className="text-[10px] font-semibold text-blue-600 bg-blue-100 dark:bg-blue-950 px-1.5 py-0.5 rounded">
                          {meta.badge}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 mb-2">{meta.description}</p>
                      <div className="text-[9px] text-slate-400 font-mono">Best for: {meta.recommendedFor}</div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-2">
                  Color Scheme Palette
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {COLOR_PRESETS.map((p) => (
                    <button
                      key={p.name}
                      onClick={() => {
                        handleFieldChange('primaryColor', p.primary);
                        handleFieldChange('secondaryColor', p.secondary);
                      }}
                      className={`p-2 rounded-xl border text-left flex items-center gap-2 cursor-pointer ${
                        formData.primaryColor === p.primary ? 'border-blue-600 ring-2 ring-blue-500/20' : 'border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      <span className="w-5 h-5 rounded-full shrink-0 shadow-2xs" style={{ backgroundColor: p.primary }} />
                      <span className="text-[11px] font-medium text-slate-700 dark:text-slate-200 truncate">{p.name}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Typography Font
                </label>
                <select
                  value={formData.fontFamily}
                  onChange={(e) => handleFieldChange('fontFamily', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                >
                  {FONT_OPTIONS.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          )}

          {/* 3. About Section Editor */}
          {activeSection === 'about' && (
            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                  About Section Title
                </label>
                <input
                  type="text"
                  value={formData.aboutTitle}
                  onChange={(e) => handleFieldChange('aboutTitle', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Clinical Overview Story
                </label>
                <textarea
                  rows={4}
                  value={formData.aboutText}
                  onChange={(e) => handleFieldChange('aboutText', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                />
              </div>
            </div>
          )}

          {/* 4. Services Menu Editor */}
          {activeSection === 'services' && (
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-slate-800 dark:text-slate-200">Display Services Section</span>
                <input
                  type="checkbox"
                  checked={formData.showServices}
                  onChange={(e) => handleFieldChange('showServices', e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
              </div>
              <p className="text-[11px] text-slate-500">
                Services and consultation charges are automatically populated from your clinic services catalog.
              </p>
              <Link to="/app/services">
                <Button variant="outline" size="sm" className="w-full text-xs mt-2">
                  Edit Services in Catalog →
                </Button>
              </Link>
            </div>
          )}

          {/* 5. Doctors Section Editor */}
          {activeSection === 'doctors' && (
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-slate-800 dark:text-slate-200">Display Doctors Roster</span>
                <input
                  type="checkbox"
                  checked={formData.showDoctors}
                  onChange={(e) => handleFieldChange('showDoctors', e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
              </div>
              <p className="text-[11px] text-slate-500">
                Doctor cards show qualifications, profile photos, and immediate booking triggers.
              </p>
              <Link to="/app/doctors">
                <Button variant="outline" size="sm" className="w-full text-xs mt-2">
                  Manage Doctor Profiles →
                </Button>
              </Link>
            </div>
          )}

          {/* 6. Why Choose Us Editor */}
          {activeSection === 'why_us' && (
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-slate-800 dark:text-slate-200">Show Trust Cards</span>
                <input
                  type="checkbox"
                  checked={formData.showWhyChooseUs}
                  onChange={(e) => handleFieldChange('showWhyChooseUs', e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
              </div>
              <div className="space-y-3">
                {formData.whyChooseUs.map((w, i) => (
                  <div key={i} className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1">
                    <input
                      type="text"
                      value={w.title}
                      onChange={(e) => {
                        const updated = [...formData.whyChooseUs];
                        updated[i].title = e.target.value;
                        handleFieldChange('whyChooseUs', updated);
                      }}
                      className="w-full font-bold text-xs bg-transparent border-b border-slate-200 pb-1"
                    />
                    <textarea
                      rows={2}
                      value={w.description}
                      onChange={(e) => {
                        const updated = [...formData.whyChooseUs];
                        updated[i].description = e.target.value;
                        handleFieldChange('whyChooseUs', updated);
                      }}
                      className="w-full text-[11px] text-slate-500 bg-transparent"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 7. Testimonials Editor */}
          {activeSection === 'testimonials' && (
            <div className="space-y-4 text-xs">
              <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <span className="font-bold text-slate-800 dark:text-slate-200">Show Patient Reviews</span>
                <input
                  type="checkbox"
                  checked={formData.showTestimonials}
                  onChange={(e) => handleFieldChange('showTestimonials', e.target.checked)}
                  className="w-4 h-4 text-blue-600 rounded"
                />
              </div>
              <p className="text-[11px] text-slate-500">
                Display curated patient feedback and verified star ratings to build community trust.
              </p>
            </div>
          )}

          {/* 8. Hours & Contact */}
          {activeSection === 'contact' && (
            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Custom Notice / Walk-In Policy
                </label>
                <textarea
                  rows={2}
                  value={formData.customNotice || ''}
                  onChange={(e) => handleFieldChange('customNotice', e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Operating Hours (from Clinic Settings)
                </label>
                <input
                  type="text"
                  readOnly
                  value={currentClinic.operatingHours}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-500"
                />
              </div>
              <div>
                <label className="block text-[11px] font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Clinic Phone
                </label>
                <input
                  type="text"
                  readOnly
                  value={currentClinic.phone}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-xs text-slate-500"
                />
              </div>
            </div>
          )}
        </aside>
      </div>

      {/* Confirmation Publish Modal */}
      {showPublishModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 border border-slate-200 dark:border-slate-800 shadow-2xl space-y-5">
            <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <Globe className="w-6 h-6" />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Publish Website for {currentClinic.name}?
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Your clinic website will immediately become publicly accessible at{' '}
                <span className="font-mono font-bold text-blue-600">clinicos.in/{currentClinic.slug}</span>.
                Patients will be able to discover your doctors, review services, and book appointments 24/7.
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-[11px] space-y-1.5">
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                <span>Selected Template</span>
                <span className="font-bold text-slate-900 dark:text-white">{TEMPLATE_METADATA[formData.template]?.name}</span>
              </div>
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                <span>Services Included</span>
                <span className="font-bold text-slate-900 dark:text-white">{clinicServices.length} offerings</span>
              </div>
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                <span>Doctors Listed</span>
                <span className="font-bold text-slate-900 dark:text-white">{clinicDoctors.length} doctors</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <Button
                variant="outline"
                size="md"
                onClick={() => setShowPublishModal(false)}
                className="flex-1 text-xs"
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="md"
                onClick={handleConfirmPublish}
                disabled={isPublishing}
                className="flex-1 text-xs bg-blue-600 hover:bg-blue-700 text-white font-bold"
              >
                {isPublishing ? 'Publishing...' : 'Confirm & Publish'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


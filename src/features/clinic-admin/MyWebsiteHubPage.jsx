<<<<<<< HEAD
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
=======
import React, { useState, useMemo, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
>>>>>>> origin/main
import {
  Globe,
  Palette,
  ExternalLink,
  Copy,
  Check,
  Eye,
<<<<<<< HEAD
  Sliders,
  Sparkles,
  Smartphone,
  Monitor,
  Share2,
  CheckCircle2,
  ArrowRight,
  RefreshCw,
  Layers,
  Settings,
  ShieldCheck
} from 'lucide-react';
import { TEMPLATE_METADATA } from '../website-builder/websiteBuilderDefaults';

export function MyWebsiteHubPage() {
  const { activeClinic, updateClinicWebsite, showToast } = useApp();

  const [copied, setCopied] = useState(false);
  const [previewDevice, setPreviewDevice] = useState('desktop');
  const [selectedTheme, setSelectedTheme] = useState(activeClinic?.websiteSettings?.template || 'modern');
  const [sections, setSections] = useState({
    hero: true,
    services: true,
    doctors: true,
    timings: true,
    reviews: true,
    faq: true,
    bookingForm: true
  });

  const clinicSlug = activeClinic?.slug || 'citycare-family-clinic';
  const websiteUrl = `clinicos.in/${clinicSlug}`;
  const fullWebUrl = `/clinic/${clinicSlug}`;

=======
  EyeOff,
  Sparkles,
  Smartphone,
  Tablet,
  Monitor,
  Share2,
  CheckCircle2,
  Layers,
  Plus,
  Trash2,
  Edit3,
  Building2,
  Stethoscope,
  Award,
  Star,
  AlertCircle,
  X,
  RefreshCw,
  FolderPlus
} from 'lucide-react';
import {
  TEMPLATE_METADATA,
  COLOR_PRESETS,
  getDefaultWebsiteSettings
} from '../website-builder/websiteBuilderDefaults';
import { MEDICAL_TEMPLATES, STOCK_CLINIC_PHOTOS } from '../website-builder/medicalTemplates';

export function MyWebsiteHubPage() {
  const {
    activeClinic,
    updateClinic,
    updateClinicWebsite,
    publishClinicWebsite,
    showToast
  } = useApp();

  const clinic = activeClinic;
  const clinicId = clinic?.id || 'clinic-citycare';
  const clinicSlug = clinic?.slug || 'citycare-family-clinic';
  const websiteUrl = `clinicos.in/${clinicSlug}`;
  const fullWebUrl = `/clinic/${clinicSlug}`;

  // Current website settings
  const settings = clinic?.websiteSettings || getDefaultWebsiteSettings(clinic);

  // Top level active tab for doctor
  const [activeTab, setActiveTab] = useState('templates'); // 'templates' | 'hero' | 'about' | 'services' | 'reviews' | 'sections'
  const [previewDevice, setPreviewDevice] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'
  const [copied, setCopied] = useState(false);
  const [previewKey, setPreviewKey] = useState(1);
  const iframeRef = useRef(null);

  // Template browser state
  const [templateFilter, setTemplateFilter] = useState('ALL');
  const [previewingTemplate, setPreviewingTemplate] = useState(null);
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [templateToApply, setTemplateToApply] = useState(null);
  const [applyServicesToo, setApplyServicesToo] = useState(true);

  // Custom Saved Templates from LocalStorage
  const [customTemplates, setCustomTemplates] = useState(() => {
    try {
      const saved = localStorage.getItem('clinicos_custom_templates');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isSaveTemplateModalOpen, setIsSaveTemplateModalOpen] = useState(false);
  const [newTemplateName, setNewTemplateName] = useState('');
  const [newTemplateCategory, setNewTemplateCategory] = useState(clinic?.specialty || 'General Medicine');

  // Service Management Modals
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [serviceFormData, setServiceFormData] = useState({
    name: '',
    fee: 800,
    durationMinutes: 30,
    category: 'Consultation',
    description: ''
  });

  // Testimonial Management Modals
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [editingReviewIndex, setEditingReviewIndex] = useState(null);
  const [reviewFormData, setReviewFormData] = useState({
    patientName: '',
    rating: 5,
    feedback: '',
    date: 'Recent'
  });

  // Delete Confirmation Modals
  const [deleteConfirmation, setDeleteConfirmation] = useState(null); // { type: 'service' | 'review' | 'template' | 'value', id: any, title: string }

  // New About Value input
  const [newValueInput, setNewValueInput] = useState('');

  // Combine built-in templates with custom saved templates
  const allTemplates = useMemo(() => {
    return [...customTemplates, ...MEDICAL_TEMPLATES];
  }, [customTemplates]);

  const filteredTemplates = useMemo(() => {
    if (templateFilter === 'ALL') return allTemplates;
    if (templateFilter === 'CUSTOM') return allTemplates.filter((t) => t.isCustom);
    return allTemplates.filter(
      (t) => t.specialtyCategory?.toLowerCase() === templateFilter.toLowerCase()
    );
  }, [allTemplates, templateFilter]);

  // Handle URL Copy
>>>>>>> origin/main
  const handleCopyLink = () => {
    navigator.clipboard?.writeText?.(`https://${websiteUrl}`);
    setCopied(true);
    showToast('Website link copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

<<<<<<< HEAD
  const handleToggleSection = (key) => {
    setSections((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      showToast(`Updated section visibility: ${key.toUpperCase()}`);
      return next;
    });
  };

  const handleThemeChange = (themeId) => {
    setSelectedTheme(themeId);
    if (updateClinicWebsite) {
      updateClinicWebsite({ template: themeId });
    }
    showToast(`Switched theme to ${TEMPLATE_METADATA[themeId]?.name || themeId}`);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto transition-colors">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              Patient Discovery & Online Presence
            </span>
            <span className="text-xs text-slate-300 dark:text-slate-600">•</span>
            <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Live & Published
            </span>
          </div>
=======
  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(
      `Book your consultation online with ${clinic?.name || 'our clinic'}: https://${websiteUrl}`
    );
    window.open(`https://wa.me/?text=${text}`, '_blank');
  };

  const handleReloadPreview = () => {
    setPreviewKey((k) => k + 1);
    showToast('Refreshed live website preview', 'info');
  };

  // Update Settings Helper
  const handleUpdateSetting = (updates) => {
    updateClinicWebsite(clinicId, updates);
    setPreviewKey((k) => k + 1);
  };

  // Apply a template
  const handleConfirmApplyTemplate = () => {
    if (!templateToApply) return;

    const updates = {
      template: templateToApply.archetype || 'modern',
      primaryColor: templateToApply.previewColor || '#2563eb',
      secondaryColor: templateToApply.secondaryColor || '#0ea5e9',
      heroHeading: templateToApply.heroHeading,
      heroSubheading: templateToApply.heroSubheading,
      heroCtaText: templateToApply.heroCtaText || 'Book an Appointment',
      bannerImage: templateToApply.bannerImage,
      aboutTitle: templateToApply.aboutTitle,
      aboutText: templateToApply.aboutText,
      aboutValues: templateToApply.aboutValues || settings.aboutValues,
      customNotice: templateToApply.customNotice || '',
      whyChooseUs: templateToApply.whyChooseUs || settings.whyChooseUs,
      testimonials: templateToApply.testimonials || settings.testimonials,
      status: 'published'
    };

    updateClinicWebsite(clinicId, updates);

    // If requested, also replace clinic services with recommended services
    if (applyServicesToo && templateToApply.suggestedServices && templateToApply.suggestedServices.length > 0) {
      updateClinic(clinicId, {
        services: templateToApply.suggestedServices
      });
    }

    setIsApplyModalOpen(false);
    setTemplateToApply(null);
    setPreviewKey((k) => k + 1);
    showToast(`✨ Template "${templateToApply.name}" applied successfully! Website is live.`, 'success');
  };

  // Save current design as custom template
  const handleSaveAsTemplate = (e) => {
    e.preventDefault();
    if (!newTemplateName.trim()) {
      showToast('Please provide a name for your custom template', 'error');
      return;
    }

    const customTmpl = {
      id: `custom-${Date.now()}`,
      name: newTemplateName.trim(),
      specialtyCategory: newTemplateCategory,
      archetype: settings.template || 'modern',
      badge: 'Custom Template',
      tagline: settings.heroSubheading?.slice(0, 70) + '...',
      previewColor: settings.primaryColor || '#2563eb',
      secondaryColor: settings.secondaryColor || '#0ea5e9',
      heroHeading: settings.heroHeading,
      heroSubheading: settings.heroSubheading,
      heroCtaText: settings.heroCtaText,
      bannerImage: settings.bannerImage,
      aboutTitle: settings.aboutTitle,
      aboutText: settings.aboutText,
      aboutValues: [...(settings.aboutValues || [])],
      customNotice: settings.customNotice || '',
      whyChooseUs: [...(settings.whyChooseUs || [])],
      testimonials: [...(settings.testimonials || [])],
      suggestedServices: [...(clinic?.services || [])],
      isCustom: true,
      savedAt: new Date().toISOString()
    };

    const nextCustom = [customTmpl, ...customTemplates];
    setCustomTemplates(nextCustom);
    localStorage.setItem('clinicos_custom_templates', JSON.stringify(nextCustom));

    setIsSaveTemplateModalOpen(false);
    setNewTemplateName('');
    showToast(`🎉 Custom template "${customTmpl.name}" saved! You can re-apply or delete it anytime.`, 'success');
  };

  // Delete Custom Template
  const handleDeleteCustomTemplate = (tmplId) => {
    const nextCustom = customTemplates.filter((t) => t.id !== tmplId);
    setCustomTemplates(nextCustom);
    localStorage.setItem('clinicos_custom_templates', JSON.stringify(nextCustom));
    setDeleteConfirmation(null);
    showToast('Custom template deleted successfully.', 'info');
  };

  // Service Management Actions
  const handleOpenAddService = () => {
    setEditingService(null);
    setServiceFormData({
      name: '',
      fee: 800,
      durationMinutes: 30,
      category: 'Consultation',
      description: ''
    });
    setIsServiceModalOpen(true);
  };

  const handleOpenEditService = (srv) => {
    setEditingService(srv);
    setServiceFormData({
      name: srv.name,
      fee: srv.fee,
      durationMinutes: srv.durationMinutes || 30,
      category: srv.category || 'Consultation',
      description: srv.description || ''
    });
    setIsServiceModalOpen(true);
  };

  const handleSaveService = (e) => {
    e.preventDefault();
    if (!serviceFormData.name.trim()) {
      showToast('Please enter a service name', 'error');
      return;
    }

    const currentServices = clinic?.services || [];
    let updatedServices = [];

    if (editingService) {
      updatedServices = currentServices.map((s) =>
        s.id === editingService.id
          ? {
              ...s,
              ...serviceFormData,
              fee: Number(serviceFormData.fee) || 500,
              durationMinutes: Number(serviceFormData.durationMinutes) || 30
            }
          : s
      );
      showToast(`Service "${serviceFormData.name}" updated!`, 'success');
    } else {
      const newSrv = {
        id: `srv-${Date.now().toString().slice(-4)}`,
        ...serviceFormData,
        fee: Number(serviceFormData.fee) || 500,
        durationMinutes: Number(serviceFormData.durationMinutes) || 30
      };
      updatedServices = [...currentServices, newSrv];
      showToast(`New service "${serviceFormData.name}" added to clinic menu!`, 'success');
    }

    updateClinic(clinicId, { services: updatedServices });
    setIsServiceModalOpen(false);
    setPreviewKey((k) => k + 1);
  };

  const handleDeleteService = (srvId) => {
    const currentServices = clinic?.services || [];
    const updatedServices = currentServices.filter((s) => s.id !== srvId);
    updateClinic(clinicId, { services: updatedServices });
    setDeleteConfirmation(null);
    setPreviewKey((k) => k + 1);
    showToast('Service deleted from clinic website.', 'info');
  };

  // Testimonial Management Actions
  const handleOpenAddReview = () => {
    setEditingReviewIndex(null);
    setReviewFormData({
      patientName: '',
      rating: 5,
      feedback: '',
      date: 'Recent'
    });
    setIsReviewModalOpen(true);
  };

  const handleOpenEditReview = (t, idx) => {
    setEditingReviewIndex(idx);
    setReviewFormData({
      patientName: t.patientName,
      rating: t.rating || 5,
      feedback: t.feedback,
      date: t.date || 'Recent'
    });
    setIsReviewModalOpen(true);
  };

  const handleSaveReview = (e) => {
    e.preventDefault();
    if (!reviewFormData.patientName.trim() || !reviewFormData.feedback.trim()) {
      showToast('Please fill in patient name and review comment', 'error');
      return;
    }

    const currentList = [...(settings.testimonials || [])];
    if (editingReviewIndex !== null) {
      currentList[editingReviewIndex] = {
        ...reviewFormData,
        rating: Number(reviewFormData.rating) || 5
      };
      showToast('Patient review updated!', 'success');
    } else {
      currentList.unshift({
        ...reviewFormData,
        rating: Number(reviewFormData.rating) || 5
      });
      showToast('New patient review added to live website!', 'success');
    }

    handleUpdateSetting({ testimonials: currentList });
    setIsReviewModalOpen(false);
  };

  const handleDeleteReview = (index) => {
    const currentList = [...(settings.testimonials || [])];
    currentList.splice(index, 1);
    handleUpdateSetting({ testimonials: currentList });
    setDeleteConfirmation(null);
    showToast('Patient review removed from website.', 'info');
  };

  // About Values add/delete
  const handleAddValue = (e) => {
    e.preventDefault();
    if (!newValueInput.trim()) return;
    const current = [...(settings.aboutValues || [])];
    current.push(newValueInput.trim());
    handleUpdateSetting({ aboutValues: current });
    setNewValueInput('');
    showToast('Added clinical value point!', 'success');
  };

  const handleDeleteValue = (idx) => {
    const current = [...(settings.aboutValues || [])];
    current.splice(idx, 1);
    handleUpdateSetting({ aboutValues: current });
    showToast('Removed value point.', 'info');
  };

  // Urgent Notice clear
  const handleClearNotice = () => {
    handleUpdateSetting({ customNotice: '' });
    showToast('Announcement banner cleared and hidden.', 'info');
  };

  // Publish button
  const handlePublishLive = () => {
    publishClinicWebsite(clinicId);
    setPreviewKey((k) => k + 1);
    showToast('🚀 Website changes published live! Patients can see your latest updates.', 'success');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto transition-colors pb-12">
      {/* Top Header & Fast Live Link Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              Patient Discovery & Clinic Website
            </span>
            <span className="text-xs text-slate-300 dark:text-slate-600">•</span>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1.5 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Live & Patient Ready
            </span>
            <span className="text-xs text-slate-400 font-mono hidden sm:inline">
              (Theme: {TEMPLATE_METADATA[settings.template]?.name || 'Modern Clinic'})
            </span>
          </div>

>>>>>>> origin/main
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
            My Clinic Website
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
<<<<<<< HEAD
            Manage your patient-facing website, change themes, toggle sections, and launch the visual builder.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Link to="/app/website-builder">
            <Button
              variant="primary"
              size="md"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md btn-animated-primary flex items-center gap-2"
            >
              <Palette className="w-4 h-4" />
              <span>Customize Website (Builder)</span>
              <ArrowRight className="w-3.5 h-3.5 ml-0.5" />
            </Button>
          </Link>
=======
            Designed for busy doctors. Choose ready-to-use medical templates, easily edit your text, manage fees, and preview live in real time.
          </p>
        </div>

        {/* Top Actions: Publish & Live Site */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            variant="primary"
            size="md"
            onClick={handlePublishLive}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Publish Live Changes</span>
          </Button>

>>>>>>> origin/main
          <a
            href={fullWebUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-600 shadow-2xs flex items-center gap-1.5 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
            <span>Open Live Site ↗</span>
          </a>
        </div>
      </div>

<<<<<<< HEAD
      {/* Website Domain & Share Card */}
      <Card className="p-5 sm:p-6 bg-gradient-to-r from-blue-50/70 via-indigo-50/30 to-white dark:from-slate-900 dark:via-blue-950/20 dark:to-slate-900 border-blue-200/90 dark:border-blue-900/60 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Published Web Address
            </span>
            <div className="flex items-center gap-2">
=======
      {/* Published Domain & Sharing Banner Card */}
      <Card className="p-4 sm:p-5 bg-gradient-to-r from-blue-50/80 via-indigo-50/40 to-white dark:from-slate-900 dark:via-blue-950/20 dark:to-slate-900 border-blue-200/90 dark:border-blue-900/60 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">
                Your Official Patient-Facing Website Link
              </span>
            </div>
            <div className="flex items-center gap-2.5">
>>>>>>> origin/main
              <span className="text-base sm:text-lg font-mono font-bold text-slate-900 dark:text-white">
                https://{websiteUrl}
              </span>
              <button
                onClick={handleCopyLink}
<<<<<<< HEAD
                className="p-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 shadow-2xs transition-colors cursor-pointer"
                title="Copy URL"
=======
                className="p-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-600 hover:text-blue-600 dark:hover:text-blue-400 shadow-2xs transition-colors cursor-pointer"
                title="Copy website link"
>>>>>>> origin/main
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
<<<<<<< HEAD
              Share this link with your patients on WhatsApp, Instagram bio, or Google Business profile.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyLink}
              className="px-4 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 shadow-xs flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Share URL'}</span>
            </button>
            <Link to="/app/website-builder">
              <button className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs flex items-center gap-1.5 cursor-pointer">
                <Sliders className="w-3.5 h-3.5" />
                <span>Edit Content</span>
              </button>
            </Link>
=======
              Share this on WhatsApp with patients or add it to your Google Business Profile and Instagram bio.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <button
              onClick={handleShareWhatsApp}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 text-white shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share on WhatsApp</span>
            </button>
            <button
              onClick={() => setIsSaveTemplateModalOpen(true)}
              className="px-3.5 py-2 rounded-xl text-xs font-bold bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 shadow-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <FolderPlus className="w-3.5 h-3.5 text-blue-600" />
              <span>Save As My Template</span>
            </button>
>>>>>>> origin/main
          </div>
        </div>
      </Card>

<<<<<<< HEAD
      {/* Grid: Theme Switcher & Section Toggles */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Quick Theme Chooser & Section Controls */}
        <div className="lg:col-span-5 space-y-6">
          {/* Themes Card */}
          <Card className="p-5 border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">Active Design Theme</h3>
                <p className="text-xs text-slate-500">Pick from pre-built medical aesthetics</p>
              </div>
              <Sparkles className="w-4 h-4 text-blue-600" />
            </div>

            <div className="space-y-2.5">
              {Object.entries(TEMPLATE_METADATA).map(([key, t]) => {
                const isSelected = selectedTheme === key;
                return (
                  <div
                    key={key}
                    onClick={() => handleThemeChange(key)}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/70 dark:bg-blue-950/40 ring-1 ring-blue-500 shadow-xs'
                        : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-xs text-slate-900 dark:text-white">{t.name}</span>
                        {isSelected && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-600 text-white">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">{t.description}</p>
                    </div>
                    <div
                      className="w-5 h-5 rounded-full border border-slate-300 dark:border-slate-600 flex items-center justify-center shrink-0"
                      style={{ backgroundColor: t.previewColor }}
                    />
                  </div>
                );
              })}
            </div>
          </Card>

          {/* Section Toggles */}
          <Card className="p-5 border-slate-200 dark:border-slate-800 space-y-4">
            <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Website Sections Visibility</h3>
              <p className="text-xs text-slate-500">Toggle sections visible on your public website</p>
            </div>

            <div className="space-y-2 text-xs">
              {[
                { id: 'hero', label: 'Hero Banner & Doctor Introduction' },
                { id: 'services', label: 'Consultation Services & Pricing' },
                { id: 'doctors', label: 'Medical Team & Qualifications' },
                { id: 'timings', label: 'Daily Timings & Location Map' },
                { id: 'reviews', label: 'Verified Patient Reviews & Ratings' },
                { id: 'faq', label: 'Frequently Asked Questions' },
                { id: 'bookingForm', label: 'Instant Online Booking Widget' }
              ].map((s) => (
                <label
                  key={s.id}
                  className="flex items-center justify-between p-2.5 rounded-xl border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
                >
                  <span className="font-medium text-slate-700 dark:text-slate-300">{s.label}</span>
                  <input
                    type="checkbox"
                    checked={sections[s.id]}
                    onChange={() => handleToggleSection(s.id)}
                    className="w-4 h-4 text-blue-600 rounded-sm focus:ring-blue-500 cursor-pointer"
                  />
                </label>
              ))}
            </div>
          </Card>
        </div>

        {/* Right: Live Interactive Viewport Preview */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">Live Website Preview</span>
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
              <button
                onClick={() => setPreviewDevice('desktop')}
                className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
=======
      {/* Main Split Grid: Doctor's Easy Editor (Left) & Real-Time Viewport Preview (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Easy No-Code Editor Tabs (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Friendly Navigation Tab Buttons */}
          <div className="bg-slate-100 dark:bg-slate-800/80 p-1.5 rounded-2xl flex items-center gap-1 overflow-x-auto border border-slate-200 dark:border-slate-700/60 shadow-2xs">
            {[
              { id: 'templates', label: 'Ready Templates', icon: Palette, badge: allTemplates.length },
              { id: 'hero', label: 'Hero & Banner', icon: Sparkles },
              { id: 'about', label: 'About Practice', icon: Building2 },
              { id: 'services', label: 'Services & Fees', icon: Stethoscope, badge: clinic?.services?.length || 0 },
              { id: 'reviews', label: 'Reviews & Trust', icon: Star, badge: settings.testimonials?.length || 0 },
              { id: 'sections', label: 'Visibility Controls', icon: Layers }
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs ring-1 ring-slate-200 dark:ring-slate-700'
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200/60 dark:hover:bg-slate-700/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{tab.label}</span>
                  {tab.badge !== undefined && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                        isActive
                          ? 'bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300'
                          : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {tab.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* ========================================================================= */}
          {/* TAB 1: READY-MADE SPECIALTY TEMPLATES */}
          {/* ========================================================================= */}
          {activeTab === 'templates' && (
            <div className="space-y-4">
              <Card className="p-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-blue-600" />
                      One-Click Specialty Medical Templates
                    </h3>
                    <p className="text-xs text-slate-500">
                      Pre-written medical headlines, curated color palettes, trust points, and services tailored to your practice.
                    </p>
                  </div>

                  <button
                    onClick={() => setIsSaveTemplateModalOpen(true)}
                    className="px-3 py-1.5 rounded-xl text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 hover:bg-blue-100 flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Save My Design</span>
                  </button>
                </div>

                {/* Filter Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
                  {[
                    { id: 'ALL', label: 'All Specialties' },
                    { id: 'General Medicine', label: 'General Medicine' },
                    { id: 'Dentistry', label: 'Dentistry' },
                    { id: 'Pediatrics', label: 'Pediatrics' },
                    { id: 'Dermatology', label: 'Dermatology' },
                    { id: 'Orthopedics', label: 'Orthopedics' },
                    { id: 'Cardiology', label: 'Cardiology' },
                    { id: 'Ayurveda', label: 'Ayurveda' },
                    { id: 'Multi-Specialty', label: 'Multi-Specialty' },
                    { id: 'CUSTOM', label: '⭐ Saved Templates' }
                  ].map((f) => (
                    <button
                      key={f.id}
                      onClick={() => setTemplateFilter(f.id)}
                      className={`px-2.5 py-1 rounded-lg font-medium whitespace-nowrap cursor-pointer transition-colors ${
                        templateFilter === f.id
                          ? 'bg-blue-600 text-white shadow-2xs font-bold'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                      }`}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </Card>

              {/* Template Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredTemplates.map((tmpl) => {
                  const isCurrentTheme =
                    settings.heroHeading === tmpl.heroHeading &&
                    settings.primaryColor === tmpl.previewColor;

                  return (
                    <Card
                      key={tmpl.id}
                      className={`p-4 border transition-all flex flex-col justify-between space-y-3 relative group ${
                        isCurrentTheme
                          ? 'border-blue-600 bg-blue-50/40 dark:bg-blue-950/20 ring-2 ring-blue-500 shadow-sm'
                          : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    >
                      <div className="space-y-2">
                        {/* Header Badges */}
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200/80 dark:border-slate-700">
                            {tmpl.specialtyCategory}
                          </span>
                          <div className="flex items-center gap-1.5">
                            {tmpl.isCustom ? (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                                My Template
                              </span>
                            ) : (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                                {tmpl.badge}
                              </span>
                            )}
                            <div
                              className="w-4 h-4 rounded-full border border-white dark:border-slate-800 shadow-2xs"
                              style={{ backgroundColor: tmpl.previewColor }}
                              title={`Theme color: ${tmpl.previewColor}`}
                            />
                          </div>
                        </div>

                        {/* Title & Tagline */}
                        <div>
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                            {tmpl.name}
                          </h4>
                          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                            "{tmpl.heroHeading}"
                          </p>
                        </div>

                        {/* Feature Highlights Pills */}
                        <div className="flex items-center gap-2 text-[11px] text-slate-600 dark:text-slate-300 pt-1">
                          <span className="flex items-center gap-1">
                            <Stethoscope className="w-3 h-3 text-blue-500" />
                            {tmpl.suggestedServices?.length || 4} Services
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Award className="w-3 h-3 text-emerald-500" />
                            Trust Badges
                          </span>
                        </div>
                      </div>

                      {/* Card Actions */}
                      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                        <button
                          onClick={() => setPreviewingTemplate(tmpl)}
                          className="px-2.5 py-1.5 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 flex items-center gap-1 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>Preview</span>
                        </button>

                        <div className="flex items-center gap-1.5">
                          {tmpl.isCustom && (
                            <button
                              onClick={() =>
                                setDeleteConfirmation({
                                  type: 'template',
                                  id: tmpl.id,
                                  title: `Custom Template: "${tmpl.name}"`
                                })
                              }
                              className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 cursor-pointer"
                              title="Delete this custom template"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}

                          <Button
                            variant={isCurrentTheme ? 'outline' : 'primary'}
                            size="xs"
                            onClick={() => {
                              setTemplateToApply(tmpl);
                              setIsApplyModalOpen(true);
                            }}
                            className={
                              isCurrentTheme
                                ? 'border-emerald-500 text-emerald-700 dark:text-emerald-300 font-bold'
                                : 'bg-blue-600 hover:bg-blue-700 text-white font-bold'
                            }
                          >
                            {isCurrentTheme ? (
                              <span className="flex items-center gap-1">
                                <Check className="w-3.5 h-3.5 text-emerald-600" /> Applied
                              </span>
                            ) : (
                              <span>Apply Template</span>
                            )}
                          </Button>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 2: HERO BANNER & APPEARANCE */}
          {/* ========================================================================= */}
          {activeTab === 'hero' && (
            <Card className="p-5 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-5">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-600" />
                  Hero Headline & Clinic Banner
                </h3>
                <p className="text-xs text-slate-500">
                  This is the first impression patients see when they visit your website link.
                </p>
              </div>

              {/* Main Headline */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Primary Website Headline
                </label>
                <input
                  type="text"
                  value={settings.heroHeading || ''}
                  onChange={(e) => handleUpdateSetting({ heroHeading: e.target.value })}
                  placeholder="e.g. Exceptional General Medicine Care for You and Your Family"
                  className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-blue-500 bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
                <span className="text-[11px] text-slate-400">
                  Keep it clear and welcoming so patients know your primary medical specialty.
                </span>
              </div>

              {/* Subheading */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Subheading & Patient Reassurance
                </label>
                <textarea
                  rows={2}
                  value={settings.heroSubheading || ''}
                  onChange={(e) => handleUpdateSetting({ heroSubheading: e.target.value })}
                  placeholder="e.g. Same-day appointments, verified digital prescriptions, and zero waiting room hassle."
                  className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-blue-500 bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white resize-none"
                />
              </div>

              {/* CTA Button Label */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Booking Button Text
                </label>
                <input
                  type="text"
                  value={settings.heroCtaText || 'Book an Appointment'}
                  onChange={(e) => handleUpdateSetting({ heroCtaText: e.target.value })}
                  placeholder="Book an Appointment"
                  className="w-full sm:w-1/2 px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-blue-500 bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              {/* Urgent Announcement / Notice Banner */}
              <div className="p-4 rounded-2xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-amber-600" />
                    <span className="text-xs font-bold text-amber-900 dark:text-amber-200">
                      Emergency / Urgent Notice Banner (Top of Site)
                    </span>
                  </div>
                  {settings.customNotice && (
                    <button
                      onClick={handleClearNotice}
                      className="text-[11px] text-rose-600 hover:text-rose-700 font-bold cursor-pointer"
                    >
                      Clear Notice
                    </button>
                  )}
                </div>
                <input
                  type="text"
                  value={settings.customNotice || ''}
                  onChange={(e) => handleUpdateSetting({ customNotice: e.target.value })}
                  placeholder="e.g. Walk-ins welcome between 9:00 AM - 1:00 PM. Evening slots available."
                  className="w-full px-3 py-2 text-xs border border-amber-200 dark:border-amber-900/60 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-amber-500"
                />
                <p className="text-[11px] text-amber-700 dark:text-amber-400">
                  Leave blank to hide the announcement banner on your website.
                </p>
              </div>

              {/* Theme Color Presets */}
              <div className="space-y-2">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Website Color Palette
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {COLOR_PRESETS.map((c) => {
                    const isSelected = settings.primaryColor === c.primary;
                    return (
                      <button
                        key={c.name}
                        onClick={() =>
                          handleUpdateSetting({
                            primaryColor: c.primary,
                            secondaryColor: c.secondary
                          })
                        }
                        className={`p-2.5 rounded-xl border flex items-center justify-between text-xs font-bold transition-all cursor-pointer ${
                          isSelected
                            ? 'border-blue-600 bg-blue-50/60 dark:bg-blue-950/40 ring-1 ring-blue-500'
                            : 'border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50'
                        }`}
                      >
                        <span className="text-slate-800 dark:text-slate-200">{c.name}</span>
                        <div
                          className="w-4 h-4 rounded-full border border-white dark:border-slate-700 shadow-2xs"
                          style={{ backgroundColor: c.primary }}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* 1-Click Stock Medical Photos */}
              <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                    Clinic Banner Photo (Click to Change)
                  </label>
                  <span className="text-[11px] text-blue-600">Preset High-Res Medical Photos</span>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-4 gap-2">
                  {STOCK_CLINIC_PHOTOS.map((photo) => {
                    const isSelected = settings.bannerImage === photo.url;
                    return (
                      <div
                        key={photo.id}
                        onClick={() => handleUpdateSetting({ bannerImage: photo.url })}
                        className={`group relative rounded-xl overflow-hidden aspect-video border-2 transition-all cursor-pointer shadow-2xs ${
                          isSelected
                            ? 'border-blue-600 ring-2 ring-blue-500 scale-[1.02]'
                            : 'border-slate-200 dark:border-slate-700 hover:border-blue-400'
                        }`}
                      >
                        <img
                          src={photo.url}
                          alt={photo.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                        />
                        {isSelected && (
                          <div className="absolute top-1 right-1 w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-xs">
                            <Check className="w-3 h-3" />
                          </div>
                        )}
                        <span className="absolute bottom-0 inset-x-0 bg-slate-950/70 text-white text-[9px] p-1 truncate text-center">
                          {photo.category}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Custom Photo URL */}
                <div className="pt-2">
                  <input
                    type="url"
                    value={settings.bannerImage || ''}
                    onChange={(e) => handleUpdateSetting({ bannerImage: e.target.value })}
                    placeholder="Or paste your own custom clinic photo URL..."
                    className="w-full px-3 py-1.5 text-xs border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>
            </Card>
          )}

          {/* ========================================================================= */}
          {/* TAB 3: ABOUT PRACTICE & DOCTOR */}
          {/* ========================================================================= */}
          {activeTab === 'about' && (
            <Card className="p-5 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-5">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Building2 className="w-4 h-4 text-blue-600" />
                  About Practice & Doctor Bio
                </h3>
                <p className="text-xs text-slate-500">
                  Introduce your clinical expertise, hospital affiliations, and practice philosophy.
                </p>
              </div>

              {/* About Headline */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  About Section Title
                </label>
                <input
                  type="text"
                  value={settings.aboutTitle || ''}
                  onChange={(e) => handleUpdateSetting({ aboutTitle: e.target.value })}
                  placeholder="e.g. Trusted Family Healthcare in Deccan Gymkhana"
                  className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-blue-500 bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              {/* Story & Philosophy */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                  Practice Story & Clinical Background
                </label>
                <textarea
                  rows={4}
                  value={settings.aboutText || ''}
                  onChange={(e) => handleUpdateSetting({ aboutText: e.target.value })}
                  placeholder="Describe your clinic's commitment, qualifications, and patient care values..."
                  className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl focus:outline-blue-500 bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white leading-relaxed"
                />
              </div>

              {/* Values & Clinical Standards */}
              <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      Clinical Highlights & Standards
                    </label>
                    <span className="text-[11px] text-slate-400">Displayed as trust badges on your about page</span>
                  </div>
                </div>

                {/* Values Pills */}
                <div className="flex flex-wrap gap-2">
                  {(settings.aboutValues || []).map((val, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold bg-blue-50 dark:bg-blue-950/50 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-900"
                    >
                      <span>{val}</span>
                      <button
                        onClick={() => handleDeleteValue(idx)}
                        className="text-blue-400 hover:text-rose-600 cursor-pointer ml-1"
                        title="Delete this point"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>

                {/* Add Value Form */}
                <form onSubmit={handleAddValue} className="flex gap-2">
                  <input
                    type="text"
                    value={newValueInput}
                    onChange={(e) => setNewValueInput(e.target.value)}
                    placeholder="e.g. Wheelchair Accessible Facility..."
                    className="flex-1 px-3 py-1.5 text-xs border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                  <Button type="submit" variant="outline" size="xs" className="font-bold flex items-center gap-1">
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </Button>
                </form>
              </div>
            </Card>
          )}

          {/* ========================================================================= */}
          {/* TAB 4: CONSULTATION SERVICES & FEES */}
          {/* ========================================================================= */}
          {activeTab === 'services' && (
            <Card className="p-5 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
              <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Stethoscope className="w-4 h-4 text-blue-600" />
                    Consultation Services & Pricing Menu
                  </h3>
                  <p className="text-xs text-slate-500">
                    Patients can view transparent fees and select these services when booking appointments.
                  </p>
                </div>

                <Button
                  variant="primary"
                  size="xs"
                  onClick={handleOpenAddService}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Service</span>
                </Button>
              </div>

              {/* Services List Table */}
              {(!clinic?.services || clinic.services.length === 0) ? (
                <div className="p-8 text-center text-slate-400 text-xs">
                  No consultation services configured yet. Click "Add Service" to create one.
                </div>
              ) : (
                <div className="divide-y divide-slate-100 dark:divide-slate-800">
                  {clinic.services.map((srv) => (
                    <div
                      key={srv.id}
                      className="py-3 flex items-center justify-between gap-3 group hover:bg-slate-50/60 dark:hover:bg-slate-800/40 px-2 rounded-xl transition-colors"
                    >
                      <div className="space-y-0.5 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-xs text-slate-900 dark:text-white truncate">
                            {srv.name}
                          </span>
                          <span className="text-[10px] px-2 py-0.2 rounded-full font-bold bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                            {srv.category || 'Consultation'}
                          </span>
                          <span className="text-[11px] text-slate-400 font-mono">
                            🕒 {srv.durationMinutes || 30}m
                          </span>
                        </div>
                        {srv.description && (
                          <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-md">
                            {srv.description}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-sm font-extrabold text-blue-600 dark:text-blue-400 font-mono">
                          ₹{srv.fee}
                        </span>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleOpenEditService(srv)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 cursor-pointer"
                            title="Edit Service"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() =>
                              setDeleteConfirmation({
                                type: 'service',
                                id: srv.id,
                                title: `Service: "${srv.name}"`
                              })
                            }
                            className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 cursor-pointer"
                            title="Delete Service"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          )}

          {/* ========================================================================= */}
          {/* TAB 5: PATIENT REVIEWS & TRUST BADGES */}
          {/* ========================================================================= */}
          {activeTab === 'reviews' && (
            <div className="space-y-4">
              {/* Trust Badges Section */}
              <Card className="p-5 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
                <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Award className="w-4 h-4 text-emerald-600" />
                    "Why Choose Us" Trust Propositions
                  </h3>
                  <p className="text-xs text-slate-500">
                    These 4 badges build immediate patient confidence on your website homepage.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {(settings.whyChooseUs || []).map((w, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          #{idx + 1} {w.title}
                        </span>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                        {w.description}
                      </p>
                    </div>
                  ))}
                </div>
              </Card>

              {/* Patient Testimonials Section */}
              <Card className="p-5 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-400" />
                      Patient Testimonials & Reviews
                    </h3>
                    <p className="text-xs text-slate-500">
                      Manage genuine patient quotes highlighted on your public clinic website.
                    </p>
                  </div>

                  <Button
                    variant="primary"
                    size="xs"
                    onClick={handleOpenAddReview}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Review</span>
                  </Button>
                </div>

                <div className="space-y-3">
                  {(settings.testimonials || []).map((t, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/40 dark:bg-slate-800/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-slate-900 dark:text-white">
                            {t.patientName}
                          </span>
                          <div className="flex text-amber-400 text-xs">
                            {'★'.repeat(t.rating || 5)}
                          </div>
                          <span className="text-[10px] text-slate-400 font-mono">({t.date})</span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-300 italic line-clamp-2">
                          "{t.feedback}"
                        </p>
                      </div>

                      <div className="flex items-center gap-1 shrink-0 self-end sm:self-center">
                        <button
                          onClick={() => handleOpenEditReview(t, idx)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 cursor-pointer"
                          title="Edit Review"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() =>
                            setDeleteConfirmation({
                              type: 'review',
                              id: idx,
                              title: `Review by "${t.patientName}"`
                            })
                          }
                          className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 cursor-pointer"
                          title="Delete Review"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          )}

          {/* ========================================================================= */}
          {/* TAB 6: SECTION VISIBILITY CONTROLS */}
          {/* ========================================================================= */}
          {activeTab === 'sections' && (
            <Card className="p-5 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
              <div className="border-b border-slate-100 dark:border-slate-800 pb-3">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Layers className="w-4 h-4 text-blue-600" />
                  Website Section Visibility Controls
                </h3>
                <p className="text-xs text-slate-500">
                  Turn sections on or off with a single click. Unchecked sections will be hidden from patients.
                </p>
              </div>

              <div className="space-y-2.5">
                {[
                  {
                    key: 'showServices',
                    label: 'Consultation Services & Price Menu',
                    desc: 'Displays your list of procedures and consultation fees.'
                  },
                  {
                    key: 'showDoctors',
                    label: 'Doctors Roster & Qualifications',
                    desc: 'Showcases doctor photos, experience, and direct booking triggers.'
                  },
                  {
                    key: 'showWhyChooseUs',
                    label: 'Why Choose Us Trust Cards',
                    desc: 'Highlights key clinical standards and zero-conflict guarantees.'
                  },
                  {
                    key: 'showTestimonials',
                    label: 'Patient Testimonials & Star Ratings',
                    desc: 'Quotes from satisfied patients demonstrating clinic quality.'
                  },
                  {
                    key: 'showFaq',
                    label: 'Frequently Asked Questions (FAQ)',
                    desc: 'Answers questions about parking, insurance, and slot cancellations.'
                  },
                  {
                    key: 'showContactMap',
                    label: 'Clinic Hours & Map Directions',
                    desc: 'Displays daily operating hours, phone, and locality coordinates.'
                  }
                ].map((s) => {
                  const isVisible = settings[s.key] !== false;
                  return (
                    <label
                      key={s.key}
                      className={`flex items-center justify-between p-3.5 rounded-2xl border transition-all cursor-pointer ${
                        isVisible
                          ? 'border-blue-200 dark:border-blue-900/60 bg-blue-50/30 dark:bg-blue-950/20'
                          : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 opacity-70'
                      }`}
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-xs text-slate-900 dark:text-white">
                            {s.label}
                          </span>
                          {isVisible ? (
                            <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 flex items-center gap-1">
                              <Eye className="w-3 h-3" /> Visible
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold px-2 py-0.2 rounded-full bg-slate-200 text-slate-700 dark:bg-slate-700 dark:text-slate-300 flex items-center gap-1">
                              <EyeOff className="w-3 h-3" /> Hidden
                            </span>
                          )}
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400">{s.desc}</p>
                      </div>

                      <input
                        type="checkbox"
                        checked={isVisible}
                        onChange={(e) => handleUpdateSetting({ [s.key]: e.target.checked })}
                        className="w-4 h-4 text-blue-600 rounded-sm focus:ring-blue-500 cursor-pointer"
                      />
                    </label>
                  );
                })}
              </div>
            </Card>
          )}
        </div>

        {/* Right Column: Real-Time Live Viewport Preview (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Live Interactive Preview
              </span>
              <button
                onClick={handleReloadPreview}
                className="p-1 rounded text-slate-400 hover:text-blue-600 cursor-pointer"
                title="Refresh preview"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Viewport Device Controls */}
            <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200/80 dark:border-slate-700">
              <button
                onClick={() => setPreviewDevice('desktop')}
                className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
>>>>>>> origin/main
                  previewDevice === 'desktop'
                    ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
<<<<<<< HEAD
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Desktop</span>
              </button>
              <button
                onClick={() => setPreviewDevice('mobile')}
                className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
=======
                title="Desktop View"
              >
                <Monitor className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Desktop</span>
              </button>
              <button
                onClick={() => setPreviewDevice('tablet')}
                className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
                  previewDevice === 'tablet'
                    ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
                title="Tablet View"
              >
                <Tablet className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Tablet</span>
              </button>
              <button
                onClick={() => setPreviewDevice('mobile')}
                className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
>>>>>>> origin/main
                  previewDevice === 'mobile'
                    ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
<<<<<<< HEAD
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile</span>
=======
                title="Mobile Phone View"
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Mobile</span>
>>>>>>> origin/main
              </button>
            </div>
          </div>

<<<<<<< HEAD
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-900 p-3 sm:p-4 shadow-xl">
            <div className="flex items-center gap-2 pb-3 px-2 border-b border-slate-800 text-[11px] text-slate-400">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              <span className="ml-2 font-mono text-slate-400 truncate">https://{websiteUrl}</span>
            </div>

            <div className={`mx-auto transition-all duration-300 pt-3 ${previewDevice === 'mobile' ? 'max-w-sm' : 'w-full'}`}>
              <div className="rounded-2xl overflow-hidden bg-white dark:bg-slate-950 border border-slate-700/60 aspect-[16/10] sm:aspect-[16/9] shadow-inner relative">
                <iframe
=======
          {/* Browser Shell Mockup */}
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800 bg-slate-900 p-3 sm:p-4 shadow-xl">
            {/* Browser top pill row */}
            <div className="flex items-center justify-between pb-3 px-2 border-b border-slate-800 text-[11px] text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
              </div>
              <div className="font-mono text-[10px] text-slate-400 bg-slate-800/80 px-3 py-0.5 rounded-full truncate max-w-[220px]">
                https://{websiteUrl}
              </div>
              <a
                href={fullWebUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-0.5"
                title="Open in new window"
              >
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Frame container with responsive width animation */}
            <div
              className={`mx-auto transition-all duration-300 pt-3 ${
                previewDevice === 'mobile'
                  ? 'max-w-[320px]'
                  : previewDevice === 'tablet'
                  ? 'max-w-[480px]'
                  : 'w-full'
              }`}
            >
              <div className="rounded-2xl overflow-hidden bg-white dark:bg-slate-950 border border-slate-700/60 aspect-[9/16] sm:aspect-[10/14] shadow-inner relative">
                <iframe
                  key={previewKey}
                  ref={iframeRef}
>>>>>>> origin/main
                  src={fullWebUrl}
                  title="Live Clinic Website Preview"
                  className="w-full h-full border-0 select-none pointer-events-auto"
                />
              </div>
            </div>
<<<<<<< HEAD
          </div>
        </div>
      </div>
    </div>
  );
}

=======

            {/* Preview helper footer */}
            <div className="pt-3 flex items-center justify-between text-[11px] text-slate-400 px-2">
              <span className="flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-blue-400" />
                Updates automatically as you edit
              </span>
              <a
                href={fullWebUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline font-semibold"
              >
                Full Screen ↗
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL: PREVIEW TEMPLATE DETAILS */}
      {/* ========================================================================= */}
      <Modal
        isOpen={Boolean(previewingTemplate)}
        onClose={() => setPreviewingTemplate(null)}
        title={previewingTemplate ? `Template Preview: ${previewingTemplate.name}` : ''}
        size="lg"
      >
        {previewingTemplate && (
          <div className="space-y-5">
            {/* Template Header Card */}
            <div
              className="p-5 rounded-2xl text-white shadow-lg space-y-2"
              style={{ backgroundColor: previewingTemplate.previewColor }}
            >
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/20 text-white uppercase tracking-wider">
                  {previewingTemplate.specialtyCategory}
                </span>
                <span className="text-xs font-bold text-white/90">
                  {previewingTemplate.badge}
                </span>
              </div>
              <h3 className="text-xl font-extrabold">{previewingTemplate.heroHeading}</h3>
              <p className="text-xs text-white/90 leading-relaxed">
                {previewingTemplate.heroSubheading}
              </p>
            </div>

            {/* Sample Announcement */}
            {previewingTemplate.customNotice && (
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-xs text-amber-800 dark:text-amber-200 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>{previewingTemplate.customNotice}</span>
              </div>
            )}

            {/* Sample Services Included */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Included Consultation Services & Pricing
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {(previewingTemplate.suggestedServices || []).map((srv, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="font-bold text-slate-900 dark:text-white">{srv.name}</div>
                      <div className="text-[10px] text-slate-400">🕒 {srv.durationMinutes} mins</div>
                    </div>
                    <span className="font-bold text-blue-600 font-mono">₹{srv.fee}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Points */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Pre-configured Trust Badges
              </span>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {(previewingTemplate.whyChooseUs || []).map((w, idx) => (
                  <div
                    key={idx}
                    className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 flex items-center gap-1.5"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span className="truncate font-medium">{w.title}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setPreviewingTemplate(null)}>
                Close Preview
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  const tmpl = previewingTemplate;
                  setPreviewingTemplate(null);
                  setTemplateToApply(tmpl);
                  setIsApplyModalOpen(true);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold"
              >
                Apply This Template
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* ========================================================================= */}
      {/* MODAL: CONFIRM APPLY TEMPLATE */}
      {/* ========================================================================= */}
      <Modal
        isOpen={isApplyModalOpen && Boolean(templateToApply)}
        onClose={() => {
          setIsApplyModalOpen(false);
          setTemplateToApply(null);
        }}
        title="Apply Website Template"
        size="md"
      >
        {templateToApply && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 space-y-1">
              <div className="text-xs font-bold text-blue-900 dark:text-blue-300">
                You are applying: {templateToApply.name}
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-400">
                This will update your clinic website headline, colors, about story, trust badges, and banner.
              </p>
            </div>

            {/* Option to also update clinic services */}
            <label className="flex items-start gap-3 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 cursor-pointer">
              <input
                type="checkbox"
                checked={applyServicesToo}
                onChange={(e) => setApplyServicesToo(e.target.checked)}
                className="mt-0.5 w-4 h-4 text-blue-600 rounded-sm focus:ring-blue-500 cursor-pointer"
              />
              <div className="space-y-0.5">
                <span className="font-bold text-xs text-slate-900 dark:text-white block">
                  Also load recommended consultation services & fees
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400 block leading-relaxed">
                  Recommended for doctors setting up a new specialty practice (loads {templateToApply.suggestedServices?.length || 4} sample services with standard prices).
                </span>
              </div>
            </label>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setIsApplyModalOpen(false);
                  setTemplateToApply(null);
                }}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={handleConfirmApplyTemplate}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold"
              >
                Confirm & Apply
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* ========================================================================= */}
      {/* MODAL: SAVE AS CUSTOM TEMPLATE */}
      {/* ========================================================================= */}
      <Modal
        isOpen={isSaveTemplateModalOpen}
        onClose={() => setIsSaveTemplateModalOpen(false)}
        title="Save Current Website as Template"
        size="md"
      >
        <form onSubmit={handleSaveAsTemplate} className="space-y-4">
          <p className="text-xs text-slate-500">
            Save your current headline, banner, colors, services, and trust points as a reusable template. You can re-apply or delete it anytime.
          </p>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Template Name
            </label>
            <input
              type="text"
              required
              value={newTemplateName}
              onChange={(e) => setNewTemplateName(e.target.value)}
              placeholder="e.g. My Monsoon Health Camp Design"
              className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Specialty Category
            </label>
            <select
              value={newTemplateCategory}
              onChange={(e) => setNewTemplateCategory(e.target.value)}
              className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white"
            >
              <option value="General Medicine">General Medicine</option>
              <option value="Dentistry">Dentistry</option>
              <option value="Pediatrics">Pediatrics</option>
              <option value="Dermatology">Dermatology</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Ayurveda">Ayurveda</option>
              <option value="Multi-Specialty">Multi-Specialty</option>
            </select>
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setIsSaveTemplateModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" className="bg-blue-600 font-bold text-white">
              Save Template
            </Button>
          </div>
        </form>
      </Modal>

      {/* ========================================================================= */}
      {/* MODAL: ADD / EDIT SERVICE */}
      {/* ========================================================================= */}
      <Modal
        isOpen={isServiceModalOpen}
        onClose={() => setIsServiceModalOpen(false)}
        title={editingService ? 'Edit Consultation Service' : 'Add New Consultation Service'}
        size="md"
      >
        <form onSubmit={handleSaveService} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Service / Procedure Name
            </label>
            <input
              type="text"
              required
              value={serviceFormData.name}
              onChange={(e) => setServiceFormData({ ...serviceFormData, name: e.target.value })}
              placeholder="e.g. Comprehensive General Consultation"
              className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Consultation Fee (₹)
              </label>
              <input
                type="number"
                min="0"
                step="50"
                required
                value={serviceFormData.fee}
                onChange={(e) => setServiceFormData({ ...serviceFormData, fee: e.target.value })}
                className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Duration (Minutes)
              </label>
              <select
                value={serviceFormData.durationMinutes}
                onChange={(e) => setServiceFormData({ ...serviceFormData, durationMinutes: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                <option value={15}>15 Minutes</option>
                <option value={20}>20 Minutes</option>
                <option value={30}>30 Minutes</option>
                <option value={45}>45 Minutes</option>
                <option value={60}>60 Minutes</option>
              </select>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Category
            </label>
            <input
              type="text"
              value={serviceFormData.category}
              onChange={(e) => setServiceFormData({ ...serviceFormData, category: e.target.value })}
              placeholder="e.g. Primary Care, Health Check, Dental Scan"
              className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Brief Description
            </label>
            <textarea
              rows={2}
              value={serviceFormData.description}
              onChange={(e) => setServiceFormData({ ...serviceFormData, description: e.target.value })}
              placeholder="What is included in this consultation or procedure..."
              className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsServiceModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" className="bg-blue-600 font-bold text-white">
              {editingService ? 'Save Changes' : 'Create Service'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* ========================================================================= */}
      {/* MODAL: ADD / EDIT TESTIMONIAL */}
      {/* ========================================================================= */}
      <Modal
        isOpen={isReviewModalOpen}
        onClose={() => setIsReviewModalOpen(false)}
        title={editingReviewIndex !== null ? 'Edit Patient Testimonial' : 'Add Patient Testimonial'}
        size="md"
      >
        <form onSubmit={handleSaveReview} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Patient Name
            </label>
            <input
              type="text"
              required
              value={reviewFormData.patientName}
              onChange={(e) => setReviewFormData({ ...reviewFormData, patientName: e.target.value })}
              placeholder="e.g. Aarav Patel"
              className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Star Rating
              </label>
              <select
                value={reviewFormData.rating}
                onChange={(e) => setReviewFormData({ ...reviewFormData, rating: Number(e.target.value) })}
                className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white"
              >
                <option value={5}>★★★★★ (5 Stars)</option>
                <option value={4}>★★★★☆ (4 Stars)</option>
                <option value={3}>★★★☆☆ (3 Stars)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                Date Display
              </label>
              <input
                type="text"
                value={reviewFormData.date}
                onChange={(e) => setReviewFormData({ ...reviewFormData, date: e.target.value })}
                placeholder="e.g. 1 week ago"
                className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300">
              Patient Feedback Comment
            </label>
            <textarea
              rows={3}
              required
              value={reviewFormData.feedback}
              onChange={(e) => setReviewFormData({ ...reviewFormData, feedback: e.target.value })}
              placeholder="Describe the patient's positive experience..."
              className="w-full px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white"
            />
          </div>

          <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-2">
            <Button type="button" variant="outline" size="sm" onClick={() => setIsReviewModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm" className="bg-blue-600 font-bold text-white">
              {editingReviewIndex !== null ? 'Save Changes' : 'Add Testimonial'}
            </Button>
          </div>
        </form>
      </Modal>

      {/* ========================================================================= */}
      {/* MODAL: DELETE CONFIRMATION */}
      {/* ========================================================================= */}
      <Modal
        isOpen={Boolean(deleteConfirmation)}
        onClose={() => setDeleteConfirmation(null)}
        title="Confirm Deletion"
        size="sm"
      >
        {deleteConfirmation && (
          <div className="space-y-4">
            <p className="text-xs text-slate-600 dark:text-slate-300">
              Are you sure you want to delete <strong>{deleteConfirmation.title}</strong>? This action will remove it from your live clinic website.
            </p>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setDeleteConfirmation(null)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  if (deleteConfirmation.type === 'service') {
                    handleDeleteService(deleteConfirmation.id);
                  } else if (deleteConfirmation.type === 'review') {
                    handleDeleteReview(deleteConfirmation.id);
                  } else if (deleteConfirmation.type === 'template') {
                    handleDeleteCustomTemplate(deleteConfirmation.id);
                  }
                }}
                className="bg-rose-600 hover:bg-rose-700 text-white font-bold"
              >
                Delete Now
              </Button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
>>>>>>> origin/main

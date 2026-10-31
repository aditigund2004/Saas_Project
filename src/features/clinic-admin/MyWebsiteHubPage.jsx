import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

import {
  Globe,
  Palette,
  ExternalLink,
  Copy,
  Check,
  Eye,
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


  const handleCopyLink = () => {
    navigator.clipboard?.writeText?.(`https://${websiteUrl}`);
    setCopied(true);
    showToast('Website link copied to clipboard!', 'success');
    setTimeout(() => setCopied(false), 2000);
  };

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

          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
            My Clinic Website
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
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

      {/* Website Domain & Share Card */}
      <Card className="p-5 sm:p-6 bg-gradient-to-r from-blue-50/70 via-indigo-50/30 to-white dark:from-slate-900 dark:via-blue-950/20 dark:to-slate-900 border-blue-200/90 dark:border-blue-900/60 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Published Web Address
            </span>
            <div className="flex items-center gap-2">

              <span className="text-base sm:text-lg font-mono font-bold text-slate-900 dark:text-white">
                https://{websiteUrl}
              </span>
              <button
                onClick={handleCopyLink}
                className="p-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 shadow-2xs transition-colors cursor-pointer"
                title="Copy URL"

              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
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

          </div>
        </div>
      </Card>

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

                  previewDevice === 'desktop'
                    ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" />
                <span>Desktop</span>
              </button>
              <button
                onClick={() => setPreviewDevice('mobile')}
                className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${

                  previewDevice === 'mobile'
                    ? 'bg-white dark:bg-slate-700 text-blue-600 shadow-xs'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>Mobile</span>

              </button>
            </div>
          </div>

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

                  src={fullWebUrl}
                  title="Live Clinic Website Preview"
                  className="w-full h-full border-0 select-none pointer-events-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}



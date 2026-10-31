import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Award,
  Building2,
  Clock,
  MapPin,
  Heart
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { getDefaultWebsiteSettings } from '../website-builder/websiteBuilderDefaults';

export function ClinicPublicAboutPage() {
  const { clinicSlug } = useParams();
  const { clinics } = useApp();

  const clinic = clinics.find((c) => c.slug === clinicSlug || c.id === clinicSlug) || clinics[0];
  const settings = clinic.websiteSettings || getDefaultWebsiteSettings(clinic);
  const primaryColor = settings.primaryColor || '#2563eb';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Page Title Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
          About Our Practice
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          {settings.aboutTitle}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Delivering trusted outpatient healthcare, personalized clinical consultations, and transparent treatment plans in {clinic.city}.
        </p>
      </div>

      {/* Main Story & Values Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7 space-y-5 text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Our Medical Mission & Philosophy
          </h2>
          <p>
            {settings.aboutText}
          </p>
          <p>
            Founded and directed by <strong>{clinic.ownerName}</strong>, our practice is designed around patient dignity, zero unnecessary waiting room delays, and rigorous infection control protocols. We leverage digital prescriptions, synchronized slot scheduling, and direct WhatsApp communication to ensure continuity of care.
          </p>

          <div className="space-y-3 pt-3">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Core Clinical Principles
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {settings.aboutValues.map((v, i) => (
                <div key={i} className="flex items-center gap-2 text-xs text-slate-800 dark:text-slate-200">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                  <span>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-3xl overflow-hidden shadow-xl border-4 border-white dark:border-slate-800 aspect-4/3 relative">
            <img
              src={clinic.image}
              alt={clinic.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-white text-xs space-y-1">
              <span className="font-bold block">{clinic.name}</span>
              <span className="text-[11px] text-slate-300">📍 {clinic.address}, {clinic.city}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Facilities & Amenities */}
      <div className="space-y-6 pt-6 border-t border-slate-200 dark:border-slate-800">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
            Clinical Infrastructure
          </span>
          <h2 className="text-2xl font-bold tracking-tight">
            Facilities & Patient Amenities
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {settings.facilities.map((fac, i) => (
            <Card key={i} className="p-5 border-slate-200 dark:border-slate-800 space-y-2">
              <Building2 className="w-5 h-5 text-blue-600" />
              <h3 className="text-xs font-bold text-slate-900 dark:text-white pt-1">{fac}</h3>
              <p className="text-[11px] text-slate-500">
                Maintained to international outpatient safety standards with daily sterilization logs.
              </p>
            </Card>
          ))}
        </div>
      </div>

      {/* Booking CTA */}
      <div className="text-center pt-8">
        <Link to={`/clinic/${clinic.slug}/book-appointment`}>
          <Button
            variant="primary"
            size="lg"
            className="font-bold text-sm text-white shadow-lg"
            style={{ backgroundColor: primaryColor }}
          >
            <Calendar className="w-4 h-4 mr-2" />
            Schedule an In-Person Consultation
          </Button>
        </Link>
      </div>
    </div>
  );
}


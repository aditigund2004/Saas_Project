import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Stethoscope,
  Calendar,
  Clock,
  CheckCircle2,
  Filter,
  ArrowRight
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { getDefaultWebsiteSettings } from '../website-builder/websiteBuilderDefaults';

export function ClinicPublicServicesPage() {
  const { clinicSlug } = useParams();
  const { clinics } = useApp();

  const clinic = clinics.find((c) => c.slug === clinicSlug || c.id === clinicSlug) || clinics[0];
  const settings = clinic.websiteSettings || getDefaultWebsiteSettings(clinic);
  const primaryColor = settings.primaryColor || '#2563eb';

  const [selectedCategory, setSelectedCategory] = useState('All');

  const services = clinic.services || [];
  const categories = ['All', ...new Set(services.map((s) => s.category).filter(Boolean))];

  const filteredServices =
    selectedCategory === 'All'
      ? services
      : services.filter((s) => s.category === selectedCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
          Transparent Care Menu
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Clinical Treatments & Services
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Clear procedural durations, standardized pricing, and board-certified practitioner care with zero hidden costs.
        </p>
      </div>

      {/* Category Filter Pills */}
      {categories.length > 2 && (
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all cursor-pointer whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredServices.map((srv) => (
          <Card
            key={srv.id}
            className="p-6 border-slate-200 dark:border-slate-800 flex flex-col justify-between space-y-5 hover:border-blue-400 transition-colors"
          >
            <div className="space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                  {srv.category || 'Clinical Consultation'}
                </span>
                <span className="text-slate-500 font-mono flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-slate-400" />
                  {srv.durationMinutes || 30} mins
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {srv.name}
              </h3>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                {srv.description ||
                  'Complete clinical diagnosis, vitals check, prescription formulation, and post-consultation advice.'}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold block">
                  Consultation Fee
                </span>
                <span className="text-xl font-extrabold text-blue-600 dark:text-blue-400">
                  ₹{srv.fee}
                </span>
              </div>

              <Link to={`/clinic/${clinic.slug}/book-appointment?service=${srv.id}`}>
                <Button
                  variant="primary"
                  size="md"
                  className="font-bold text-xs text-white shadow-xs"
                  style={{ backgroundColor: primaryColor }}
                >
                  Book Slot
                  <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}


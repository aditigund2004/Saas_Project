import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Stethoscope,
  Calendar,
  Clock,
  Award,
  Phone,
  Mail,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';
import { Button } from '../../components/ui/Button';
import { Card } from '../../components/ui/Card';
import { getDefaultWebsiteSettings } from '../website-builder/websiteBuilderDefaults';

export function ClinicPublicDoctorsPage() {
  const { clinicSlug } = useParams();
  const { clinics, doctors } = useApp();

  const clinic = clinics.find((c) => c.slug === clinicSlug || c.id === clinicSlug) || clinics[0];
  const settings = clinic.websiteSettings || getDefaultWebsiteSettings(clinic);
  const clinicDoctors = doctors.filter((d) => d.clinicId === clinic.id);
  const primaryColor = settings.primaryColor || '#2563eb';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Title */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
          Medical Roster
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          Consulting Specialists at {clinic.name}
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          Board-certified medical practitioners dedicated to empathetic, evidence-backed patient outcomes.
        </p>
      </div>

      {/* Doctor Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {clinicDoctors.map((doc) => (
          <Card
            key={doc.id}
            className="overflow-hidden border-slate-200 dark:border-slate-800 flex flex-col justify-between hover:shadow-lg transition-all"
          >
            <div>
              {/* Doctor Headshot Header */}
              <div className="p-6 bg-slate-50 dark:bg-slate-800/40 border-b border-slate-100 dark:border-slate-800 flex items-center gap-4">
                <img
                  src={doc.avatar}
                  alt={doc.name}
                  className="w-20 h-20 rounded-2xl object-cover border-2 border-white dark:border-slate-700 shadow-sm shrink-0"
                />
                <div className="min-w-0">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 inline-block mb-1">
                    {doc.specialty}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 dark:text-white truncate">
                    {doc.name}
                  </h3>
                  <p className="text-xs text-slate-500 font-mono truncate">
                    {doc.qualifications}
                  </p>
                  <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-0.5">
                    ★ {doc.experienceYears}+ Years Clinical Experience
                  </p>
                </div>
              </div>

              {/* Doctor Details */}
              <div className="p-6 space-y-4 text-xs">
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      Consultation Hours:
                    </span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {doc.workingHours}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      Available Days:
                    </span>
                    <span className="font-semibold text-slate-900 dark:text-white">
                      {doc.availableDays ? doc.availableDays.join(', ') : 'Mon - Sat'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                    <span className="flex items-center gap-1.5">
                      <Award className="w-3.5 h-3.5 text-slate-400" />
                      Medical Reg No:
                    </span>
                    <span className="font-mono text-slate-900 dark:text-white font-medium">
                      {doc.registrationNumber || 'MCI-88492'}
                    </span>
                  </div>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 flex items-center justify-between">
                  <span className="text-xs text-slate-500">First Consultation Fee</span>
                  <span className="text-base font-extrabold text-blue-600 dark:text-blue-400">
                    ₹{doc.consultationFee}
                  </span>
                </div>
              </div>
            </div>

            {/* Bottom Book Button */}
            <div className="p-6 pt-0">
              <Link to={`/clinic/${clinic.slug}/book-appointment?doctor=${doc.id}`}>
                <Button
                  variant="primary"
                  size="md"
                  className="w-full font-bold text-xs text-white shadow-md"
                  style={{ backgroundColor: primaryColor }}
                >
                  <Calendar className="w-3.5 h-3.5 mr-1.5" />
                  Book Slot with {doc.name.split(' ')[1] || doc.name}
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


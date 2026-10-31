import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
  Stethoscope,
  Building2,
  Calendar,
  Clock,
  Star,
  ShieldCheck,
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Award,
  DollarSign
} from 'lucide-react';

export function PatientDoctorDetailPage() {
  const { doctorId } = useParams();
  const { doctors, clinics } = useApp();
  const navigate = useNavigate();

  const doctor = doctors.find((d) => d.id === doctorId) || doctors[0];
  const clinic = clinics.find((c) => c.id === doctor?.clinicId);

  if (!doctor) {
    return (
      <div className="p-8 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Doctor Profile Not Found</h2>
        <Link to="/patient/doctors">
          <Button variant="outline" size="sm">
            &larr; Return to Doctors Directory
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs">
        <Link to="/patient/doctors" className="text-blue-600 hover:underline flex items-center gap-1 font-semibold">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Doctors Directory
        </Link>
        <span className="text-slate-300">/</span>
        <span className="text-slate-500">{doctor.name}</span>
      </div>

      {/* Hero Profile Card */}
      <Card className="p-6 sm:p-7 border-slate-200 dark:border-slate-800 dark:bg-slate-900/90 shadow-sm">
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <img
            src={doctor.avatar}
            alt={doctor.name}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-blue-100 dark:border-blue-900 shadow-sm shrink-0"
          />

          <div className="flex-1 min-w-0 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">{doctor.name}</h1>
                <p className="text-sm font-bold text-blue-600 dark:text-blue-400 mt-0.5">{doctor.specialty}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{doctor.qualifications}</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="flex items-center gap-1.5 text-amber-500 font-bold text-base justify-end">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span>{doctor.rating || 4.9}</span>
                  </div>
                  <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">
                    {doctor.reviewsCount || 110}+ Verified Reviews
                  </span>
                </div>

                <Link to={`/patient/appointments/book?clinicId=${doctor.clinicId}&doctorId=${doctor.id}`}>
                  <Button variant="primary" size="md" icon={Calendar} className="shadow-md shadow-blue-500/20 font-bold">
                    Book Consultation
                  </Button>
                </Link>
              </div>
            </div>

            {/* Quick Metadata Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium">
                Reg No: <strong className="font-mono">{doctor.registrationNumber || 'MMC-2012-08819'}</strong>
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 font-semibold border border-emerald-200/50 dark:border-emerald-900/50">
                {doctor.experienceYears} Years Clinical Experience
              </span>
              <span className="px-3 py-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-400 font-bold font-mono border border-blue-200/50 dark:border-blue-900/50">
                Fee: ₹{doctor.consultationFee}
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Main Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Bio, Clinical Focus, Schedule */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="border-slate-200 dark:border-slate-800 dark:bg-slate-900/90 shadow-sm">
            <CardHeader
              title="Doctor Biography & Clinical Focus"
              subtitle="Medical training, procedural expertise, and clinical approach"
            />
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              {doctor.bio}
            </p>

            <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-800 grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-xs uppercase font-bold text-slate-400 dark:text-slate-500 block">Typical Slot Duration</span>
                <span className="font-bold text-slate-900 dark:text-slate-100 font-mono mt-1 text-sm block">
                  {doctor.appointmentDurationMinutes || 30} Minutes
                </span>
              </div>
              <div>
                <span className="text-xs uppercase font-bold text-slate-400 dark:text-slate-500 block">Consultation Mode</span>
                <span className="font-bold text-slate-900 dark:text-slate-100 mt-1 text-sm block">
                  In-Person Clinic Consultation
                </span>
              </div>
            </div>
          </Card>

          {/* Clinical Working Hours */}
          <Card className="border-slate-200 dark:border-slate-800 dark:bg-slate-900/90 shadow-sm">
            <CardHeader
              title="Availability Schedule"
              subtitle="Standard clinical consultation timings"
            />
            <div className="space-y-3.5 text-sm">
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 dark:text-slate-100 block">Consulting Days:</span>
                  <span className="text-blue-600 dark:text-blue-400 font-semibold">{doctor.availableDays?.join(', ')}</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-slate-900 dark:text-slate-100 block">Working Hours:</span>
                  <span className="font-mono text-slate-600 dark:text-slate-400">{doctor.workingHours}</span>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-blue-50/80 dark:bg-blue-950/30 text-blue-950 dark:text-blue-200 text-xs flex items-center gap-2.5 border border-blue-200 dark:border-blue-900/50">
                <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
                <span>
                  Exact slots are verified by the clinic receptionist to prevent double-booking and accommodate hospital rounds.
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column (1 Col): Practicing Clinic Details */}
        <div className="space-y-6">
          <Card padding="none" className="border-slate-200 dark:border-slate-800 dark:bg-slate-900/90 shadow-sm overflow-hidden">
            <div className="p-4 sm:p-5 border-b border-slate-200 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100">Practicing Clinic</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Official clinic affiliation</p>
            </div>

            {clinic && (
              <div className="p-4 sm:p-5 space-y-3.5 text-sm">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{clinic.logo || '🏥'}</span>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-slate-100 text-base">{clinic.name}</h4>
                    <p className="text-xs text-blue-600 dark:text-blue-400 font-semibold">{clinic.specialty}</p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                  {clinic.description}
                </p>

                <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-400">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                    <span>{clinic.address}, {clinic.city}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="font-mono">{clinic.phone}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link to={`/patient/clinics/${clinic.id}`}>
                    <Button variant="outline" size="sm" className="w-full text-xs font-medium">
                      View Clinic Profile &rarr;
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </Card>

          {/* Direct Booking Card */}
          <Card className="p-5 bg-gradient-to-br from-blue-600 to-blue-700 text-white space-y-3.5 shadow-md">
            <h3 className="font-bold text-base">Ready for an Appointment?</h3>
            <p className="text-xs text-blue-100 leading-relaxed">
              Submit your preferred date and time. Our receptionist will verify the slot and notify you immediately.
            </p>
            <Link to={`/patient/appointments/book?clinicId=${doctor.clinicId}&doctorId=${doctor.id}`}>
              <Button variant="secondary" size="md" className="w-full text-xs font-bold bg-white text-blue-700 hover:bg-blue-50 shadow-sm">
                Start Booking Request &rarr;
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}


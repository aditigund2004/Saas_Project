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
      <Card className="p-6 border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row items-start gap-5">
          <img
            src={doctor.avatar}
            alt={doctor.name}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl object-cover border-2 border-blue-100 shadow-xs shrink-0"
          />

          <div className="flex-1 min-w-0 space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h1 className="text-2xl font-black text-slate-900 tracking-tight">{doctor.name}</h1>
                <p className="text-xs font-bold text-blue-700">{doctor.specialty}</p>
                <p className="text-xs text-slate-500 mt-0.5">{doctor.qualifications}</p>
              </div>

              <div className="flex items-center gap-3">
                <div className="text-right">
                  <div className="flex items-center gap-1 text-amber-500 font-bold text-sm justify-end">
                    <Star className="w-4 h-4 fill-amber-400" />
                    <span>{doctor.rating || 4.9}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {doctor.reviewsCount || 110}+ Verified Reviews
                  </span>
                </div>

                <Link to={`/patient/appointments/book?clinicId=${doctor.clinicId}&doctorId=${doctor.id}`}>
                  <Button variant="primary" size="md" icon={Calendar}>
                    Book Consultation
                  </Button>
                </Link>
              </div>
            </div>

            {/* Quick Metadata Badges */}
            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 font-medium">
                Reg No: <strong className="font-mono">{doctor.registrationNumber || 'MMC-2012-08819'}</strong>
              </span>
              <span className="px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 font-medium">
                {doctor.experienceYears} Years Clinical Experience
              </span>
              <span className="px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 font-bold font-mono">
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
          <Card>
            <CardHeader
              title="Doctor Biography & Clinical Focus"
              subtitle="Medical training, procedural expertise, and clinical approach"
            />
            <p className="text-xs text-slate-600 leading-relaxed">
              {doctor.bio}
            </p>

            <div className="mt-4 pt-4 border-t border-slate-100 grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Typical Slot Duration</span>
                <span className="font-bold text-slate-900 font-mono mt-0.5 block">
                  {doctor.appointmentDurationMinutes || 30} Minutes
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Consultation Mode</span>
                <span className="font-bold text-slate-900 mt-0.5 block">
                  In-Person Clinic Consultation
                </span>
              </div>
            </div>
          </Card>

          {/* Clinical Working Hours */}
          <Card>
            <CardHeader
              title="Availability Schedule"
              subtitle="Standard clinical consultation timings"
            />
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block">Consulting Days:</span>
                  <span className="text-blue-700 font-semibold">{doctor.availableDays?.join(', ')}</span>
                </div>
                <div className="text-right">
                  <span className="font-bold text-slate-900 block">Working Hours:</span>
                  <span className="font-mono text-slate-600">{doctor.workingHours}</span>
                </div>
              </div>

              <div className="p-3 rounded-lg bg-blue-50 text-blue-900 text-xs flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-600 shrink-0" />
                <span>
                  Exact slots are verified by the clinic receptionist to prevent double-booking and accommodate hospital rounds.
                </span>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column (1 Col): Practicing Clinic Details */}
        <div className="space-y-6">
          <Card padding="none">
            <div className="p-4 border-b border-slate-200">
              <h3 className="text-sm font-bold text-slate-900">Practicing Clinic</h3>
              <p className="text-xs text-slate-500">Official clinic affiliation</p>
            </div>

            {clinic && (
              <div className="p-4 space-y-3 text-xs">
                <div className="flex items-center gap-2">
                  <span className="text-xl">{clinic.logo || '🏥'}</span>
                  <div>
                    <h4 className="font-bold text-slate-900">{clinic.name}</h4>
                    <p className="text-[11px] text-blue-700 font-medium">{clinic.specialty}</p>
                  </div>
                </div>

                <p className="text-[11px] text-slate-600 line-clamp-2">
                  {clinic.description}
                </p>

                <div className="space-y-1.5 pt-2 border-t border-slate-100 text-[11px] text-slate-600">
                  <div className="flex items-start gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                    <span>{clinic.address}, {clinic.city}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="font-mono">{clinic.phone}</span>
                  </div>
                </div>

                <div className="pt-2">
                  <Link to={`/patient/clinics/${clinic.id}`}>
                    <Button variant="outline" size="xs" className="w-full text-xs">
                      View Clinic Profile &rarr;
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </Card>

          {/* Direct Booking Card */}
          <Card className="p-4 bg-gradient-to-br from-blue-600 to-blue-700 text-white space-y-3">
            <h3 className="font-bold text-base">Ready for an Appointment?</h3>
            <p className="text-xs text-blue-100">
              Submit your preferred date and time. Our receptionist will verify the slot and notify you immediately.
            </p>
            <Link to={`/patient/appointments/book?clinicId=${doctor.clinicId}&doctorId=${doctor.id}`}>
              <Button variant="secondary" size="md" className="w-full text-xs font-bold bg-white text-blue-700 hover:bg-blue-50">
                Start Booking Request &rarr;
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
}


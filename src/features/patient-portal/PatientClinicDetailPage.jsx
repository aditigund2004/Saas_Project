import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
  Building2,
  MapPin,
  Clock,
  Phone,
  Mail,
  Star,
  Calendar,
  Stethoscope,
  ShieldCheck,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Info,
  DollarSign
} from 'lucide-react';

export function PatientClinicDetailPage() {
  const { clinicId } = useParams();
  const { clinics, doctors } = useApp();
  const navigate = useNavigate();

  const clinic = clinics.find((c) => c.id === clinicId) || clinics[0];
  const clinicDoctors = doctors.filter((d) => d.clinicId === clinic.id);

  if (!clinic) {
    return (
      <div className="p-8 text-center space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Clinic Profile Not Found</h2>
        <Link to="/patient/clinics">
          <Button variant="outline" size="sm">
            &larr; Return to Clinics Directory
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs">
        <Link to="/patient/clinics" className="text-blue-600 hover:underline flex items-center gap-1 font-semibold">
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Clinics Network
        </Link>
        <span className="text-slate-300">/</span>
        <span className="text-slate-500">{clinic.name}</span>
      </div>

      {/* Hero Banner Card */}
      <Card padding="none" className="overflow-hidden border-slate-200 shadow-xs">
        <div className="relative h-48 md:h-64 w-full bg-slate-900 overflow-hidden">
          <img
            src={clinic.image}
            alt={clinic.name}
            className="w-full h-full object-cover opacity-80"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          <div className="absolute bottom-5 left-5 right-5 text-white flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-2xl">{clinic.logo || '🏥'}</span>
                <span className="px-2.5 py-0.5 rounded-md bg-blue-600 text-white font-mono text-[11px] font-bold uppercase">
                  {clinic.specialty}
                </span>
                <span className="px-2.5 py-0.5 rounded-md bg-white/20 backdrop-blur-xs text-white text-[11px] font-medium">
                  Accredited Healthcare Provider
                </span>
              </div>
              <h1 className="text-2xl md:text-3xl font-black tracking-tight">{clinic.name}</h1>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl">{clinic.tagline}</p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <div className="text-right bg-slate-900/80 backdrop-blur-xs p-2.5 rounded-xl border border-white/10">
                <div className="flex items-center gap-1 text-amber-400 font-bold text-sm justify-end">
                  <Star className="w-4 h-4 fill-amber-400" />
                  <span>{clinic.rating || 4.9}</span>
                </div>
                <div className="text-[10px] text-slate-400 font-medium">
                  {clinic.reviewsCount || 150}+ Verified Patient Reviews
                </div>
              </div>

              <Link to={`/patient/appointments/book?clinicId=${clinic.id}`}>
                <Button variant="primary" size="md" icon={Calendar} className="shadow-md">
                  Request Appointment
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Info Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 p-4 bg-white border-t border-slate-100 text-xs">
          <div className="flex items-start gap-2 text-slate-600">
            <MapPin className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-900 block">Location</span>
              <span>{clinic.address}, {clinic.city}</span>
            </div>
          </div>

          <div className="flex items-start gap-2 text-slate-600">
            <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-900 block">Clinical Working Hours</span>
              <span className="font-mono">{clinic.operatingHours}</span>
            </div>
          </div>

          <div className="flex items-start gap-2 text-slate-600">
            <Phone className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-900 block">Clinic Reception</span>
              <span className="font-mono">{clinic.phone}</span>
            </div>
          </div>

          <div className="flex items-start gap-2 text-slate-600">
            <DollarSign className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-900 block">Tariff Range</span>
              <span className="font-mono font-bold text-slate-900">{clinic.consultationFeeRange || '₹500 - ₹1,200'}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Two-Column Layout: Overview & Services vs Doctors */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 Cols): Description, Services, Policies, Reviews */}
        <div className="lg:col-span-2 space-y-6">
          {/* About Clinic */}
          <Card>
            <CardHeader
              title="About the Practice"
              subtitle="Clinical expertise, standards, and patient care philosophies"
            />
            <p className="text-xs text-slate-600 leading-relaxed mb-4">
              {clinic.description}
            </p>

            <div className="space-y-1.5">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Primary Medical Specialties
              </span>
              <div className="flex flex-wrap gap-1.5">
                {(clinic.specialties || [clinic.specialty]).map((s) => (
                  <span
                    key={s}
                    className="px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 text-xs font-semibold"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Booking Policy Callout */}
            <div className="mt-4 p-3 rounded-xl bg-blue-50/80 border border-blue-200 text-blue-950 text-xs flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div>
                <strong className="block text-slate-900">Clinic Appointment Policy:</strong>
                <span className="text-slate-600 text-[11px]">{clinic.bookingPolicy}</span>
              </div>
            </div>
          </Card>

          {/* Clinical Services & Consultation Tariffs */}
          <Card padding="none">
            <div className="p-4 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900">Clinical Services & Tariffs</h3>
                <p className="text-xs text-slate-500">Available consultation and procedure packages</p>
              </div>
              <span className="text-xs font-mono font-semibold text-slate-500">
                {clinic.services?.length || 0} Listed Services
              </span>
            </div>

            <div className="divide-y divide-slate-100">
              {clinic.services?.map((srv) => (
                <div key={srv.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-50/60 transition-colors">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-slate-900 text-xs">{srv.name}</h4>
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-600 text-[10px] font-mono">
                        {srv.durationMinutes} mins
                      </span>
                      <span className="px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[10px] font-semibold">
                        {srv.category}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500">{srv.description}</p>
                  </div>

                  <div className="flex items-center gap-3 shrink-0 justify-between sm:justify-end">
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block font-semibold">Consultation Fee</span>
                      <span className="text-sm font-bold font-mono text-slate-900">
                        ₹{srv.fee.toLocaleString('en-IN')}
                      </span>
                    </div>

                    <Link to={`/patient/appointments/book?clinicId=${clinic.id}&serviceId=${srv.id}`}>
                      <Button variant="outline" size="xs" icon={Calendar}>
                        Select & Book
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Patient Reviews */}
          <Card>
            <CardHeader
              title={`Patient Reviews & Feedback (${clinic.reviewsCount || 100}+)`}
              subtitle="Verified patient testimonials from recent clinic visits"
            />
            <div className="space-y-3">
              {(clinic.sampleReviews || [
                { patientName: 'Aarav Patel', rating: 5, comment: 'Very professional reception staff and doctors who listen patiently.', date: '2026-10-18' },
                { patientName: 'Meera Deshmukh', rating: 5, comment: 'Clean modern facility with minimal waiting times.', date: '2026-10-12' }
              ]).map((rev, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-100 space-y-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{rev.patientName}</span>
                    <div className="flex items-center gap-1 text-amber-500">
                      {[...Array(rev.rating || 5)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400 text-amber-400" />
                      ))}
                      <span className="text-slate-400 font-mono text-[10px] ml-1">{rev.date}</span>
                    </div>
                  </div>
                  <p className="text-slate-600 text-[11px]">{rev.comment}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column (1 Col): Doctors Practicing Here */}
        <div className="space-y-6">
          <Card padding="none">
            <div className="p-4 border-b border-slate-200">
              <h3 className="text-sm font-bold text-slate-900">Consulting Physicians</h3>
              <p className="text-xs text-slate-500">Authorized medical practitioners at this clinic</p>
            </div>

            <div className="divide-y divide-slate-100">
              {clinicDoctors.map((doc) => (
                <div key={doc.id} className="p-4 space-y-3 hover:bg-slate-50/60 transition-colors text-xs">
                  <div className="flex items-start gap-3">
                    <img
                      src={doc.avatar}
                      alt={doc.name}
                      className="w-12 h-12 rounded-xl object-cover shrink-0 border border-slate-200"
                    />
                    <div className="min-w-0 flex-1">
                      <h4 className="font-bold text-slate-900 truncate">{doc.name}</h4>
                      <p className="text-[11px] text-blue-700 font-semibold truncate">{doc.specialty}</p>
                      <p className="text-[10px] text-slate-400 mt-0.5 truncate">{doc.qualifications}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-600 bg-slate-50 p-2 rounded-lg">
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-bold">Experience</span>
                      <span className="font-medium text-slate-900">{doc.experienceYears} Years</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-400 block uppercase font-bold">Consultation Fee</span>
                      <span className="font-bold font-mono text-blue-700">₹{doc.consultationFee}</span>
                    </div>
                  </div>

                  <div className="text-[10px] text-slate-500">
                    <span className="font-semibold text-slate-700">Available Days: </span>
                    <span>{doc.availableDays?.join(', ') || 'Mon - Sat'}</span>
                  </div>

                  <div className="flex items-center gap-2 pt-1">
                    <Link to={`/patient/doctors/${doc.id}`} className="flex-1">
                      <Button variant="ghost" size="xs" className="w-full text-xs">
                        Profile
                      </Button>
                    </Link>
                    <Link to={`/patient/appointments/book?clinicId=${clinic.id}&doctorId=${doc.id}`} className="flex-1">
                      <Button variant="primary" size="xs" className="w-full text-xs" icon={Calendar}>
                        Book Slot
                      </Button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Quick Help Box */}
          <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 space-y-2">
            <span className="font-bold text-slate-900 block flex items-center gap-1.5">
              <Info className="w-4 h-4 text-blue-600" /> Need Help Choosing?
            </span>
            <p className="text-[11px]">
              You can contact the front desk at <strong className="text-slate-900 font-mono">{clinic.phone}</strong> for urgent enquiries, or submit a flexible booking request online.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


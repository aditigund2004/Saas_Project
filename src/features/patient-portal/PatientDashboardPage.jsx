import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';

import {
  Calendar,
  FileText,
  Receipt,
  PlusCircle,
  Clock,
  Printer,
  ShieldAlert,
  Users,
  Plus,
  ArrowRight,
  Pill,
  CheckCircle2,
  XCircle,
  Lock,
  MessageSquare,
  Package,
  Sparkles,
  HeartPulse
} from 'lucide-react';
import { StatCard } from '../../components/ui/StatCard';
import { PatientHealthGraphCard } from './PatientHealthGraphCard';
import { PatientEmergencyModal } from './PatientEmergencyModal';
import { DEMO_HEALTH_PACKAGES } from '../../demo-data/packagesData';

const MAX_FAMILY_MEMBERS = 4;

const RELATIONSHIP_COLORS = {
  Wife: 'bg-purple-100 text-purple-700 dark:bg-purple-900/40 dark:text-purple-300 border-purple-200 dark:border-purple-800',
  Mother: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300 border-amber-200 dark:border-amber-800',
  Father: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
  Son: 'bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300 border-blue-200 dark:border-blue-800',
  Daughter: 'bg-pink-100 text-pink-700 dark:bg-pink-900/40 dark:text-pink-300 border-pink-200 dark:border-pink-800'
};

function calculateAge(dob) {
  if (!dob) return null;
  const birth = new Date(dob);
  const now = new Date();
  let age = now.getFullYear() - birth.getFullYear();
  const m = now.getMonth() - birth.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < birth.getDate())) {
    age--;
  }
  return age;
}

export function PatientDashboardPage() {
  const {
    currentUser,

    patients = [],
    appointments = [],
    prescriptions = [],
    invoices = [],
    encounters = [],
    familyMembers = [],
    doseLogs = [],
    patientQueries = [],
    markDoseTaken,
    markDoseMissed,
    openPrescriptionModal
  } = useApp();

  const [isEmergencyModalOpen, setIsEmergencyModalOpen] = useState(false);

  // Patient security boundary: filter strictly by current patient (Aarav Patel in demo)
  const currentPatient =
    patients.find((p) => p.name === currentUser?.name || p.id === 'pt-1041' || p.patientIdNumber === 'PT-1041') ||
    patients[0];

  const myQueries = patientQueries.filter(
    (q) => q.patientId === 'pt-1041' || q.patientId === currentUser?.id
  );
  const unresolvedQueriesCount = myQueries.filter((q) => q.status !== 'Resolved').length;

  const myDoses = doseLogs.filter(
    (d) => d.patientId === 'pt-1041' || d.patientId === currentUser?.id
  );
  const takenDosesCount = myDoses.filter((d) => d.status === 'taken').length;

  // Family members managed by current patient
  const myFamily = familyMembers.filter(
    (m) => m.primaryPatientId === 'pt-1041' || m.primaryPatientId === currentUser?.id
  );
  const myAppointments = appointments.filter(
    (a) => a.patientName === currentUser?.name || a.patientId === 'pt-1041' || !a.patientId
  );
  const myPrescriptions = prescriptions.filter(
    (p) => p.patientName === currentUser?.name || p.patientId === 'pt-1041' || p.patientId === 'PT-1041'
  );
  const myInvoices = invoices.filter(
    (i) => i.patientName === currentUser?.name || i.patientId === 'pt-1041'
  );
  const myEncounters = encounters.filter(
    (e) => e.patientName === currentUser?.name || e.patientId === 'pt-1041' || e.patientId === 'pt-1042'
  );
  const latestEncounter = myEncounters[0];

  const actionRequiredProposals = myAppointments.filter(
    (a) => a.status === 'Alternative Slot Proposed' || a.status === 'Awaiting Patient Response'
  );
  const pendingRequests = myAppointments.filter(
    (a) => a.status === 'Pending Clinic Confirmation'
  );
  const upcoming = myAppointments.filter(
    (a) => ['Confirmed', 'Patient Checked In', 'Checked In', 'In Consultation', 'In Progress'].includes(a.status)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            Patient Health Dashboard
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mt-1">
            Welcome back, {currentUser?.name || 'Aarav'}
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Discover specialized clinic networks, manage booking requests, and access tamper-evident digital prescriptions.

          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => setIsEmergencyModalOpen(true)}
            className="px-3.5 py-2 rounded-xl border border-rose-200 dark:border-rose-900/60 bg-rose-50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-300 hover:bg-rose-100 dark:hover:bg-rose-900/60 text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shadow-xs"
          >
            <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
            <ShieldAlert className="w-4 h-4 text-rose-600 dark:text-rose-400" />
            <span>Emergency SOS Card</span>
          </button>
          <Link to="/patient/queries">
            <Button variant="outline" size="md" icon={MessageSquare} className="font-semibold text-slate-700 dark:text-slate-200">
              Ask Clinic Desk
            </Button>
          </Link>
          <Link to="/patient/clinics">
            <Button variant="outline" size="md">
              Explore Clinics
            </Button>
          </Link>
          <Link to="/patient/appointments/book">
            <Button variant="primary" size="md" icon={PlusCircle} className="shadow-md shadow-blue-500/20">
              Book Consultation

            </Button>
          </Link>
        </div>
      </div>

      {/* Action Required Banner for Alternative Proposals */}
      {actionRequiredProposals.length > 0 && (
        <div className="p-4 sm:p-5 bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-900/50 text-amber-800 dark:text-amber-300 flex items-center justify-center shrink-0">
              <Clock className="w-5 h-5 text-amber-700 dark:text-amber-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-amber-900 dark:text-amber-200 bg-amber-200 dark:bg-amber-900/60 px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                  Action Required
                </span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-mono">
                  {actionRequiredProposals[0].requestId || actionRequiredProposals[0].referenceNumber}
                </span>
              </div>
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 mt-1">
                Alternative Appointment Slot Proposed
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-0.5">
                <strong>{actionRequiredProposals[0].clinicName}</strong> proposed a new slot for Dr. {actionRequiredProposals[0].doctorName}. Please accept or decline to proceed.
              </p>
            </div>
          </div>
          <Link to="/patient/appointments/requests">
            <Button variant="primary" size="md" className="bg-amber-600 hover:bg-amber-700 text-white font-semibold whitespace-nowrap shadow-sm">
              Review Proposal ({actionRequiredProposals.length}) &rarr;

            </Button>
          </Link>
        </div>
      )}

      {/* Pending Review Notice if any pending without proposal */}
      {actionRequiredProposals.length === 0 && pendingRequests.length > 0 && (
        <div className="p-4 bg-blue-50/80 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 rounded-2xl flex items-center justify-between text-sm text-blue-950 dark:text-blue-200">
          <div className="flex items-center gap-3">
            <Clock className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />
            <span>
              You have <strong>{pendingRequests.length} booking request(s)</strong> awaiting clinic receptionist availability verification.
            </span>
          </div>
          <Link to="/patient/appointments/requests" className="font-semibold underline hover:text-blue-700 dark:hover:text-blue-300 shrink-0 ml-3">
            Track Status &rarr;
          </Link>
        </div>
      )}

      {/* Quick stats (3 col per row grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Link to="/patient/appointments" className="block group">
          <StatCard
            title="Upcoming Appointments"
            value={upcoming.length.toString()}
            change={upcoming.length > 0 ? 'Active consultation' : 'None scheduled'}
            trend="up"
            icon={Calendar}
            color="blue"
            subtitle="Confirmed bookings"
          />
        </Link>
        <Link to="/patient/prescriptions" className="block group">
          <StatCard
            title="Digital Prescriptions"
            value={myPrescriptions.length.toString()}
            change="QR verified documents"
            trend="up"
            icon={FileText}
            color="emerald"
            subtitle="Signed by your doctor"
          />
        </Link>
        <Link to="/patient/reminders" className="block group">
          <StatCard
            title="Daily Dosing Reminders"
            value={`${takenDosesCount}/${myDoses.length || 0}`}
            change={myDoses.filter((d) => d.status === 'pending').length > 0 ? `${myDoses.filter((d) => d.status === 'pending').length} dose(s) pending today` : 'All doses logged'}
            trend="up"
            icon={Pill}
            color="teal"
            subtitle="Adherence & WhatsApp alerts"
          />
        </Link>
        <Link to="/patient/bills" className="block group">
          <StatCard
            title="Paid Receipts & Bills"
            value={myInvoices.length.toString()}
            change="Available for download"
            trend="up"
            icon={Receipt}
            color="indigo"
            subtitle="Procedures & treatments"
          />
        </Link>
        <Link to="/patient/queries" className="block group">
          <StatCard
            title="Clinic Inquiries"
            value={myQueries.length.toString()}
            change={unresolvedQueriesCount > 0 ? `${unresolvedQueriesCount} pending staff reply` : 'All resolved'}
            trend="up"
            icon={MessageSquare}
            color="amber"
            subtitle="Bill & Rx clarifications"
          />
        </Link>
        <Link to="/patient/family" className="block group">
          <StatCard
            title="Family Health Circle"
            value={`${myFamily.length} / ${MAX_FAMILY_MEMBERS}`}
            change={myFamily.length >= MAX_FAMILY_MEMBERS ? 'Full quota reached' : `${MAX_FAMILY_MEMBERS - myFamily.length} slot available`}
            trend="up"
            icon={Users}
            color="purple"
            subtitle="Dependent medical records"
          />
        </Link>
      </div>

      {/* Overall Health & Vitals Graph Widget */}
      <PatientHealthGraphCard
        latestVitals={latestEncounter?.vitals}
        doctorName={latestEncounter?.doctorName}
      />

      {/* Featured Preventive Health Packages (3 col per row grid) */}
      <Card className="rounded-3xl border-slate-200 dark:border-[#263B59] bg-white dark:bg-[#111E33] shadow-sm dark:shadow-lg dark:shadow-black/20 overflow-hidden">
        <CardHeader
          title={
            <div className="flex items-center gap-2">
              <Package className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <span>Preventive Health Packages</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                Recommended
              </span>
            </div>
          }
          subtitle="Comprehensive diagnostic screenings, fasting lab panels, and doctor consultations for early risk detection"
          action={
            <Link
              to="/patient/packages"
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 hover:underline"
            >
              Explore All Packages (6) →
            </Link>
          }
        />
        <div className="p-4 sm:p-5 pt-0 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {DEMO_HEALTH_PACKAGES.slice(0, 3).map((pkg) => {
              const discountPercent = pkg.savingsPercentage || Math.round(((pkg.originalPrice - pkg.price) / pkg.originalPrice) * 100);
              const inclusionsList = pkg.inclusions || [];
              return (
                <div
                  key={pkg.id}
                  className="relative overflow-hidden p-5 rounded-3xl border border-[#E2E8F0] dark:border-[#263B59] bg-white dark:bg-[#172640] shadow-xs hover:shadow-md dark:shadow-md dark:hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-indigo-500/5 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/50 dark:ring-white/10 pointer-events-none" />

                  <div className="relative z-10 space-y-3">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-800">
                        {pkg.category}
                      </span>
                      {(pkg.badge || pkg.popular) && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-500 text-white shadow-xs">
                          <Sparkles className="w-3 h-3" /> {pkg.badge || 'Most Popular'}
                        </span>
                      )}
                    </div>

                    <div>
                      <h4 className="font-extrabold text-base text-[#172033] dark:text-[#F1F5F9] group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {pkg.name}
                      </h4>
                      <p className="text-xs text-[#64748B] dark:text-[#94A3B8] line-clamp-2 mt-1">
                        {pkg.shortDescription || pkg.tagline}
                      </p>
                    </div>

                    {/* Tests & Fasting Chips */}
                    <div className="flex flex-wrap items-center gap-1.5 text-[11px]">
                      <span className="font-bold text-[#334155] dark:text-slate-200 px-2 py-0.5 rounded-md bg-[#F1F5F9] dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                        {pkg.parametersCount || 50} Lab Tests
                      </span>
                      <span className="text-[#475569] dark:text-slate-300 px-2 py-0.5 rounded-md bg-[#F1F5F9] dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                        {pkg.fastingHours > 0 ? `${pkg.fastingHours}h Fasting` : 'No Fasting'}
                      </span>
                      {pkg.doctorSpecialtyConsult && (
                        <span className="text-[#047857] dark:text-emerald-400 font-semibold px-2 py-0.5 rounded-md bg-[#D1FAE5] dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800">
                          + Physician Review
                        </span>
                      )}
                    </div>

                    {/* Organ Categories Preview */}
                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                        Included Test Profiles
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {inclusionsList.slice(0, 3).map((inc, i) => (
                          <span
                            key={i}
                            className="text-[11px] text-[#334155] dark:text-slate-300 bg-[#F1F5F9] dark:bg-slate-800/60 px-2 py-0.5 rounded-md border border-slate-200/80 dark:border-slate-800"
                          >
                            {inc.category ? inc.category.split('(')[0].trim() : 'Lab Panel'} ({inc.tests?.length || 0})
                          </span>
                        ))}
                        {inclusionsList.length > 3 && (
                          <span className="text-[11px] text-blue-600 dark:text-blue-400 font-medium px-1 py-0.5">
                            +{inclusionsList.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Pricing and Action */}
                  <div className="relative z-10 pt-4 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-xl font-black text-[#172033] dark:text-[#F1F5F9]">
                          ₹{pkg.price.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-[#94A3B8] line-through">
                          ₹{pkg.originalPrice.toLocaleString('en-IN')}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-[#059669] dark:text-emerald-400">
                        Save {discountPercent}% today
                      </span>
                    </div>

                    <Link to={`/patient/packages?pkg=${pkg.id}`}>
                      <Button variant="primary" size="sm" className="bg-[#2563EB] hover:bg-blue-700 text-white shadow-xs text-xs">
                        Book Checkup
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-3.5 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              <HeartPulse className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />
              <span className="text-slate-700 dark:text-slate-300">
                All packages include a <strong>tamper-evident QR diagnostic report</strong>, home sample pickup, and optional physician consultation.
              </span>
            </div>
            <Link
              to="/patient/packages"
              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 shrink-0 flex items-center gap-1 hover:underline"
            >
              Browse All 6 Health Packages &rarr;
            </Link>
          </div>
        </div>
      </Card>

      {/* Family Health Circle & Dependent Records Widget */}
      <Card className="rounded-3xl border-slate-200 dark:border-[#263B59] bg-white dark:bg-[#111E33] shadow-sm dark:shadow-lg dark:shadow-black/20 overflow-hidden">
        <CardHeader
          title={
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              <span>Family Health Circle</span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 font-mono">
                {myFamily.length} / {MAX_FAMILY_MEMBERS} Slots
              </span>
            </div>
          }
          subtitle="Manage health records, appointments, and prescriptions for your dependents (Mother, Father, Son, Daughter, Wife)"
          action={
            <Link
              to="/patient/family"
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 flex items-center gap-1 hover:underline"
            >
              Manage Records ({myFamily.length}/4) →
            </Link>
          }
        />
        <div className="p-4 sm:p-5 pt-0 space-y-4">
          {/* Quota Progress Bar */}
          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <div className="w-24 sm:w-32 bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-indigo-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${(myFamily.length / MAX_FAMILY_MEMBERS) * 100}%` }}
                />
              </div>
              <span className="font-semibold text-slate-700 dark:text-slate-300">
                <strong className="text-indigo-600 dark:text-indigo-400">{myFamily.length} of {MAX_FAMILY_MEMBERS}</strong> family member slots used
              </span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] text-slate-400 dark:text-slate-500">
                Allowed: Mother, Father, Son, Daughter, Wife
              </span>
              {myFamily.length < MAX_FAMILY_MEMBERS && (
                <Link
                  to="/patient/family"
                  className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:underline"
                >
                  + Add Member
                </Link>
              )}
            </div>
          </div>

          {/* Family Members Grid (3 col per row grid) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {myFamily.map((member) => {
              const age = calculateAge(member.dob);
              const relColor = RELATIONSHIP_COLORS[member.relationship] || 'bg-slate-100 text-slate-700';
              const recordsCount = member.records?.length || member.recordsCount || 0;

              return (
                <div
                  key={member.id}
                  className="relative overflow-hidden p-4 rounded-3xl border border-slate-200 dark:border-[#263B59] bg-white dark:bg-[#172640] shadow-sm hover:shadow-md dark:shadow-md dark:hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between space-y-3 group"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent pointer-events-none" />
                  <div className="absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/50 dark:ring-white/10 pointer-events-none" />

                  <div className="relative z-10">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 truncate">
                          {member.name}
                        </h4>
                        <div className="flex items-center gap-1.5 mt-1">
                          <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${relColor}`}>
                            {member.relationship}
                          </span>
                          {age && (
                            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                              {age} yrs
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="text-[11px] font-mono font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 px-1.5 py-0.5 rounded border border-rose-200 dark:border-rose-900/50 shrink-0">
                        {member.bloodGroup || 'O+'}
                      </span>
                    </div>

                    <div className="mt-2.5 pt-2 border-t border-slate-100/80 dark:border-slate-800/80 text-[11px] text-slate-500 dark:text-slate-400 space-y-1">
                      <div className="flex items-center justify-between">
                        <span>Medical Records:</span>
                        <span className="font-bold font-mono text-slate-800 dark:text-slate-200">
                          {recordsCount} {recordsCount === 1 ? 'record' : 'records'}
                        </span>
                      </div>
                      {member.chronicConditions && member.chronicConditions.length > 0 ? (
                        <p className="truncate text-amber-600 dark:text-amber-400 font-medium">
                          ⚠️ {member.chronicConditions[0]}
                        </p>
                      ) : (
                        <p className="text-emerald-600 dark:text-emerald-400 font-medium truncate">
                          ✓ Routine preventive checkups
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="relative z-10 pt-2 border-t border-slate-100/80 dark:border-slate-800/80 flex items-center justify-between gap-1.5 text-xs">
                    <Link
                      to="/patient/family"
                      className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-indigo-400 flex items-center gap-1"
                    >
                      <FileText className="w-3 h-3" /> Records
                    </Link>
                    <Link
                      to={`/patient/appointments/book?forMember=${encodeURIComponent(member.name)}&memberRel=${encodeURIComponent(member.relationship)}`}
                      className="text-[11px] font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 flex items-center gap-1"
                    >
                      <Calendar className="w-3 h-3" /> Book Visit
                    </Link>
                  </div>
                </div>
              );
            })}

            {/* Available Slot / Add Placeholder if < 4 */}
            {myFamily.length < MAX_FAMILY_MEMBERS && (
              <Link
                to="/patient/family"
                className="relative overflow-hidden p-4 rounded-3xl border-2 border-dashed border-indigo-200/80 dark:border-indigo-800/60 bg-indigo-50/30 dark:bg-indigo-950/20 backdrop-blur-xl hover:border-indigo-400 dark:hover:border-indigo-500 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/40 hover:-translate-y-1 shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col items-center justify-center text-center group cursor-pointer"
              >
                <div className="w-9 h-9 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-base group-hover:scale-110 transition-transform mb-1.5">
                  <Plus className="w-4 h-4" />
                </div>
                <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  Add Family Member
                </p>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
                  Slot {myFamily.length + 1} of {MAX_FAMILY_MEMBERS} available
                </p>
              </Link>
            )}
          </div>
        </div>
      </Card>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Next Scheduled Visit Card */}
        <div className="lg:col-span-7 space-y-4">
          <Card className="rounded-3xl border-slate-200 dark:border-[#263B59] bg-white dark:bg-[#111E33] shadow-sm dark:shadow-lg dark:shadow-black/20 overflow-hidden">
            <CardHeader
              title="Upcoming Consultations"
              subtitle="Visits scheduled with your healthcare practitioners"
              action={
                <Link to="/patient/appointments" className="text-sm text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                  View All ({myAppointments.length}) →
                </Link>
              }
            />
            <div className="p-4 sm:p-5 space-y-3">
              {upcoming.length === 0 ? (
                <div className="text-center py-10 text-sm text-slate-400 dark:text-slate-500 space-y-3">
                  <p>You have no active appointments scheduled right now.</p>
                  <Link to="/patient/appointments/book">
                    <Button variant="primary" size="md">
                      Schedule a Visit
                    </Button>
                  </Link>
                </div>
              ) : (
                upcoming.map((apt) => (
                  <div
                    key={apt.id}
                    className="relative overflow-hidden p-4 rounded-2xl border border-slate-200 dark:border-[#263B59] bg-white dark:bg-[#172640] shadow-xs hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 space-y-2 text-sm group"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/8 to-transparent pointer-events-none" />
                    <div className="relative z-10 flex items-center justify-between">
                      <span className="font-bold text-slate-900 dark:text-slate-100 text-base">{apt.serviceName}</span>
                      <Badge variant={apt.status}>{apt.status}</Badge>
                    </div>
                    <div className="text-slate-600 dark:text-slate-300 space-y-1">
                      <p>👨‍⚕️ <strong>{apt.doctorName}</strong></p>
                      <p>🕒 <strong className="tabular-nums font-semibold">{apt.date} at {apt.time}</strong></p>
                      <p className="text-xs text-slate-400 dark:text-slate-500 font-mono">Ref: {apt.referenceNumber}</p>

                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>

        {/* Right Column: Medication Adherence & Latest Digital Prescription */}
        <div className="lg:col-span-5 space-y-4">
          {/* Today's Medication Dosing Widget */}
          <Card className="rounded-3xl border-slate-200 dark:border-[#263B59] bg-white dark:bg-[#111E33] shadow-sm dark:shadow-lg dark:shadow-black/20 overflow-hidden">
            <CardHeader
              title={
                <div className="flex items-center gap-2">
                  <Pill className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                  <span>Today's Prescribed Doses</span>
                  <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded-full bg-teal-50 dark:bg-teal-950/60 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800">
                    {takenDosesCount}/{myDoses.length} Taken
                  </span>
                </div>
              }
              subtitle="Doctor prescribed regimens · Daily tracking"
              action={
                <Link to="/patient/reminders" className="text-xs text-teal-600 dark:text-teal-400 font-bold hover:underline">
                  Full Regimen →
                </Link>
              }
            />
            <div className="p-4 sm:p-5 pt-0 space-y-2.5">
              {myDoses.length === 0 ? (
                <p className="text-sm text-slate-400 dark:text-slate-500 text-center py-6">
                  No medications scheduled for today.
                </p>
              ) : (
                myDoses.slice(0, 3).map((dose) => {
                  const isTaken = dose.status === 'taken';
                  const isMissed = dose.status === 'missed';
                  const isPending = dose.status === 'pending';

                  return (
                    <div
                      key={dose.id}
                      className={`relative overflow-hidden p-3.5 rounded-2xl border text-xs flex items-center justify-between gap-3 transition-all duration-300 backdrop-blur-md ${
                        isTaken
                          ? 'border-emerald-200/80 dark:border-emerald-900/40 bg-emerald-50/40 dark:bg-emerald-950/20 shadow-xs'
                          : isMissed
                          ? 'border-rose-200/80 dark:border-rose-900/40 bg-rose-50/40 dark:bg-rose-950/20 shadow-xs'
                          : 'border-slate-200 dark:border-[#263B59] bg-white dark:bg-[#172640] shadow-xs'
                      }`}
                    >
                      <div className="space-y-0.5 min-w-0">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono font-bold text-[11px] text-blue-600 dark:text-blue-400">
                            {dose.scheduledTime}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            ({dose.timeOfDay})
                          </span>
                        </div>
                        <h5 className="font-bold text-slate-900 dark:text-slate-100 truncate">
                          {dose.medicationName}
                        </h5>
                        <span className="text-[11px] font-mono text-slate-500 dark:text-slate-400 block">
                          🔒 Prescribed Dose: {dose.dosage}
                        </span>
                      </div>

                      <div className="shrink-0 flex items-center gap-1.5">
                        {isPending && (
                          <>
                            <button
                              type="button"
                              onClick={() => markDoseMissed(dose.id)}
                              className="px-2 py-1 rounded text-[11px] font-semibold text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 cursor-pointer"
                              title="Mark Missed"
                            >
                              Missed
                            </button>
                            <button
                              type="button"
                              onClick={() => markDoseTaken(dose.id)}
                              className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 shadow-xs cursor-pointer"
                            >
                              <CheckCircle2 className="w-3 h-3" /> Take
                            </button>
                          </>
                        )}
                        {isTaken && (
                          <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 font-bold text-[10px] border border-emerald-200 dark:border-emerald-900/50">
                            ✓ Taken {dose.takenAt ? `(${dose.takenAt})` : ''}
                          </span>
                        )}
                        {isMissed && (
                          <span className="px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/50 text-rose-800 dark:text-rose-300 font-bold text-[10px] border border-rose-200 dark:border-rose-900/50">
                            ✕ Missed

                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}

              <div className="pt-2 text-center border-t border-slate-100 dark:border-slate-800">
                <Link
                  to="/patient/reminders"
                  className="text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline inline-flex items-center gap-1"
                >
                  Manage Reminders & Adherence Hub &rarr;
                </Link>
              </div>
            </div>
          </Card>

          {/* Latest Digital Prescription Card */}
          <Card className="rounded-3xl border-slate-200 dark:border-[#263B59] bg-white dark:bg-[#111E33] shadow-sm dark:shadow-lg dark:shadow-black/20 overflow-hidden">
            <CardHeader
              title="Latest Digital Prescription"
              subtitle="Tamper-evident medical document"
            />
            <div className="p-4 sm:p-5 space-y-3">
              {myPrescriptions.length === 0 ? (
                <p className="text-sm text-slate-400 dark:text-slate-500 text-center py-8">No prescriptions on record.</p>

              ) : (
                myPrescriptions.slice(0, 2).map((rx) => (
                  <div
                    key={rx.id}
                    className="p-4 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/40 dark:bg-blue-950/20 text-sm space-y-2.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-blue-900 dark:text-blue-300">{rx.prescriptionNumber}</span>
                      <span className="text-xs font-semibold text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/50 px-2 py-0.5 rounded-md">
                        QR Verified
                      </span>
                    </div>
                    <p className="font-semibold text-slate-800 dark:text-slate-200">Diagnosis: {rx.diagnosis}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Doctor: {rx.doctorName} · {rx.date}</p>

                    <div className="pt-2 flex items-center justify-between border-t border-blue-100 dark:border-blue-900/40">
                      <Link
                        to={`/verify-prescription/${rx.verificationId}`}
                        target="_blank"
                        className="text-xs text-blue-600 dark:text-blue-400 underline font-semibold"
                      >
                        Verify Authenticity
                      </Link>
                      <Button
                        variant="outline"
                        size="sm"
                        icon={Printer}
                        onClick={() => openPrescriptionModal(rx)}
                      >
                        View & Print

                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Emergency Medical SOS Modal */}
      <PatientEmergencyModal
        isOpen={isEmergencyModalOpen}
        onClose={() => setIsEmergencyModalOpen(false)}
        patient={currentPatient}

      />
    </div>
  );
}

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { useTheme } from '../../context/ThemeContext';
<<<<<<< HEAD
import { FontSizeSwitcher } from '../../components/ui/FontSizeSwitcher';
=======
>>>>>>> origin/main
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
<<<<<<< HEAD
=======
import { useDashboardLayout } from '../../hooks/useDashboardLayout';
import { CustomizableDashboardHeader } from '../../components/dashboard/CustomizableDashboardHeader';
>>>>>>> origin/main
import {
  Calendar,
  Users,
  CheckCircle2,
  Receipt,
  PlusCircle,
  ArrowRight,
  Package,
  Star,
  Zap,
  AlertTriangle,
  Search,
  Headphones,
  Sparkles,
  Bell,
  Sun,
  Moon,
  ExternalLink,
  ChevronDown,
  FileText,
  UserPlus,
  Award,
  Clock,
  Filter,
  Check,
  Phone,
  MessageSquare,
  ShieldCheck,
  X
} from 'lucide-react';

export function ClinicDashboardPage() {
  const {
    activeClinic = {},
    activeBranch = {},
    appointments = [],
    addAppointment,
    patients = [],
    addPatient,
    currentUser,
    openPrescriptionModal,
    openWhatsAppModal,
    showToast
  } = useApp();
  const { isDark, toggleTheme } = useTheme();
  const navigate = useNavigate();

<<<<<<< HEAD
=======
  const { widgets, toggleWidget, moveWidget, resetToDefault, isWidgetVisible } =
    useDashboardLayout('doctor_admin');

>>>>>>> origin/main
  // Tab & Filter States
  const [activeTab, setActiveTab] = useState('today'); // 'today' | 'upcoming' | 'all'
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedDateFilter, setSelectedDateFilter] = useState('any');

  // Quick Action Modals
  const [isBookModalOpen, setIsBookModalOpen] = useState(false);
  const [isAddPatientModalOpen, setIsAddPatientModalOpen] = useState(false);
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);

  // Form states for modals
  const [newPatientForm, setNewPatientForm] = useState({
    name: '',
    phone: '',
    email: '',
    age: '',
    gender: 'Male'
  });

  const [newBookingForm, setNewBookingForm] = useState({
    patientName: '',
    phone: '',
    service: 'General Consultation',
    time: '10:30 AM',
    date: '2026-10-27',
    doctor: activeClinic?.ownerName || 'Dr. Siddharth Sen'
  });

  const [certForm, setCertForm] = useState({
    patientName: '',
    type: 'Medical Fitness Certificate',
    diagnosis: 'General Checkup & Physical Fitness',
    restDays: 3
  });

  // Doctor & Clinic display
  const doctorDisplayName =
    currentUser?.name?.replace(/^(Dr\.|Doctor)\s*/i, '') ||
    activeClinic?.ownerName?.replace(/^(Dr\.|Doctor)\s*/i, '') ||
    'Nikhilesh';

  const specialty = activeClinic?.specialty || 'Neurology';
  const clinicSlug = activeClinic?.slug || 'nikhilesh';
  const websiteUrl = `clinicos.in/${clinicSlug}`;

  // Time & Greeting
  const todayFormatted = 'Tuesday, 27 October 2026';
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? 'Good morning' : currentHour < 18 ? 'Good afternoon' : 'Good evening';

  // Appointment counts
  const todayAppointments = appointments.filter((a) => a.date === '2026-10-27' || a.date === '2026-10-23');
  const upcomingAppointments = appointments.filter((a) => a.status === 'Confirmed' || a.status === 'Scheduled');

  const displayedAppointments =
    activeTab === 'today'
      ? todayAppointments
      : activeTab === 'upcoming'
      ? upcomingAppointments
      : appointments;

  const filteredAppointments = displayedAppointments.filter((a) => {
    const matchSearch =
      !searchQuery ||
      a.patientName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.patientPhone?.includes(searchQuery);
    const matchStatus = statusFilter === 'all' || a.status?.toLowerCase() === statusFilter.toLowerCase();
    return matchSearch && matchStatus;
  });

  // Handlers for Quick Action Modals
  const handleCreatePatient = (e) => {
    e.preventDefault();
    if (!newPatientForm.name.trim()) return;

    if (addPatient) {
      addPatient({
        name: newPatientForm.name,
        phone: newPatientForm.phone || '+91 98000 12345',
        email: newPatientForm.email || 'patient@demo.health',
        age: Number(newPatientForm.age) || 30,
        gender: newPatientForm.gender
      });
    }

    showToast(`Patient ${newPatientForm.name} registered successfully!`, 'success');
    setIsAddPatientModalOpen(false);
    setNewPatientForm({ name: '', phone: '', email: '', age: '', gender: 'Male' });
  };

  const handleCreateBooking = (e) => {
    e.preventDefault();
    if (!newBookingForm.patientName.trim()) return;

    if (addAppointment) {
      addAppointment({
        patientName: newBookingForm.patientName,
        patientPhone: newBookingForm.phone || '+91 98000 54321',
        serviceName: newBookingForm.service,
        date: newBookingForm.date,
        time: newBookingForm.time,
        doctorName: newBookingForm.doctor,
        status: 'Confirmed'
      });
    }

    showToast(`Appointment confirmed for ${newBookingForm.patientName}!`, 'success');
    setIsBookModalOpen(false);
    setNewBookingForm({
      patientName: '',
      phone: '',
      service: 'General Consultation',
      time: '10:30 AM',
      date: '2026-10-27',
      doctor: activeClinic?.ownerName || 'Dr. Siddharth Sen'
    });
  };

  const handleIssueCert = (e) => {
    e.preventDefault();
    showToast(`Issued ${certForm.type} for ${certForm.patientName || 'Patient'}`, 'success');
    setIsCertModalOpen(false);
    navigate('/clinic/certificates');
  };

  return (
    <div className="space-y-6 max-w-[1720px] mx-auto transition-colors">
      {/* 1. Header Greeting & Top Utility Controls */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        {/* Left: Greeting & Current Date */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span>{greeting}, {doctorDisplayName}</span>
            <span className="text-xl">👋</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 font-medium mt-0.5">
            {todayFormatted}
          </p>
        </div>

        {/* Right: Support, Ask AI, Search, Theme & Live Website Pill */}
        <div className="flex flex-wrap items-center gap-2.5">
<<<<<<< HEAD
=======
          {/* Customizable Dashboard Layout Manager */}
          <CustomizableDashboardHeader
            widgets={widgets}
            onToggleWidget={toggleWidget}
            onMoveWidget={moveWidget}
            onResetLayout={resetToDefault}
          />

>>>>>>> origin/main
          {/* Support Button */}
          <Link to="/clinic/support">
            <button className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-850 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs flex items-center gap-1.5 transition-colors cursor-pointer">
              <Headphones className="w-3.5 h-3.5 text-slate-500" />
              <span>Support</span>
            </button>
          </Link>

          {/* Ask AI Button */}
          <button
            onClick={() => setIsAiModalOpen(true)}
            className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-850 hover:bg-slate-50 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>Ask AI</span>
          </button>

          {/* Search Box */}
          <div className="relative min-w-[200px] sm:min-w-[240px]">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search patients, appointments..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-850 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-2xs"
            />
          </div>

          {/* Notifications */}
          <Link to="/clinic/appointments">
            <button className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700 shadow-2xs transition-colors cursor-pointer relative">
              <Bell className="w-4 h-4" />
              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 absolute top-1.5 right-1.5" />
            </button>
          </Link>

<<<<<<< HEAD
          {/* Font Size Selector */}
          <FontSizeSwitcher variant="dropdown" />

=======
>>>>>>> origin/main
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-700 shadow-2xs transition-colors cursor-pointer"
            aria-label="Toggle Dark Mode"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* Live Clinic URL Pill */}
          <a
            href={`/clinic/${clinicSlug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-xl text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50/70 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/40 border border-blue-200 dark:border-blue-800 shadow-2xs flex items-center gap-1.5 transition-colors"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
            <span className="font-mono text-[11px] truncate max-w-[150px]">{websiteUrl}</span>
            <ExternalLink className="w-3 h-3 text-blue-500 ml-0.5" />
          </a>
        </div>
      </div>

      {/* 2. Top Alert Banners */}
      <div className="space-y-3">
        {/* Banner 1: Trial Active Banner */}
        <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/20 border border-amber-200/90 dark:border-amber-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-amber-100 dark:bg-amber-900/60 text-amber-700 dark:text-amber-400 flex items-center justify-center shrink-0 shadow-2xs">
              <Zap className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                Trial Active · 7 days left
              </h4>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">
                Upgrade now to keep all features after trial ends
              </p>
            </div>
          </div>

          <Link to="/checkout?plan=professional" className="shrink-0">
            <Button
              variant="primary"
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs flex items-center gap-1.5 btn-animated-primary"
            >
              <span>👑 Upgrade</span>
            </Button>
          </Link>
        </div>

        {/* Banner 2: Unverified Profile Banner */}
        <div className="p-4 rounded-2xl bg-orange-50/70 dark:bg-orange-950/20 border border-orange-200/90 dark:border-orange-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-orange-100 dark:bg-orange-900/60 text-orange-700 dark:text-orange-400 flex items-center justify-center shrink-0 shadow-2xs">
              <AlertTriangle className="w-4 h-4" />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                Your profile is unverified
              </h4>
              <p className="text-[11px] text-slate-600 dark:text-slate-400 max-w-3xl leading-relaxed">
                To get your profile verified, upload your medical registration certificate. Your website shows an "Unverified" badge until ClinicOS verifies it. Activate any paid plan once to upload and submit.
              </p>
            </div>
          </div>

          <Link to="/clinic/subscription" className="shrink-0">
            <Button
              variant="primary"
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs px-4 py-2 rounded-xl shadow-xs flex items-center gap-1.5"
            >
              <span>👑 Activate Plan</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* 3. 4 KPI Stat Cards Row (Exact Match to Reference Colors & Badges) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Vibrant Royal Blue Card */}
        <div className="p-5 rounded-2xl bg-blue-600 text-white shadow-sm flex flex-col justify-between space-y-4 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-xs flex items-center justify-center text-white">
              <Calendar className="w-5 h-5" />
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-blue-100">
              TODAY'S APPOINTMENTS
            </span>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black tracking-tight">
              {todayAppointments.length}
            </div>
            <div className="text-xs text-blue-100/90 font-medium mt-1">
              ↑ 0 more than yesterday
            </div>
          </div>
        </div>

        {/* Card 2: Deep Teal Card */}
        <div className="p-5 rounded-2xl bg-[#0c7c8c] text-white shadow-sm flex flex-col justify-between space-y-4 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-white/15 backdrop-blur-xs flex items-center justify-center text-white">
              <Users className="w-5 h-5" />
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-teal-100">
              TOTAL PATIENTS
            </span>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black tracking-tight">
              {patients.length || 0}
            </div>
            <div className="text-xs text-teal-100/90 font-medium mt-1">
              ↑ 0 this week
            </div>
          </div>
        </div>

        {/* Card 3: White Card - Revenue */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center font-bold text-lg">
              ₹
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500">
              THIS MONTH REVENUE
            </span>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              ₹0
            </div>
            <div className="text-xs text-emerald-600 dark:text-emerald-400 font-medium mt-1">
              ↑ 0% vs last month
            </div>
          </div>
        </div>

        {/* Card 4: White Card - Rating */}
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-xl bg-yellow-50 dark:bg-yellow-950/50 text-yellow-500 flex items-center justify-center">
              <Star className="w-5 h-5 fill-current" />
            </div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-slate-400 dark:text-slate-500">
              AVERAGE RATING
            </span>
          </div>
          <div>
            <div className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
              0
            </div>
            <div className="text-xs text-slate-400 font-medium mt-1">
              0 total reviews
            </div>
          </div>
        </div>
      </div>

      {/* 4. Main Two-Column Content Layout (Left ~66% / Right ~34%) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column: Appointments List with Filter Bar */}
        <div className="lg:col-span-8 space-y-4">
          <Card className="p-5 sm:p-6 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 shadow-xs space-y-5">
            {/* Tabs Row: Today (0), Upcoming (0), All (0) + Right "+ New" Button */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-6 text-xs font-bold">
                <button
                  onClick={() => setActiveTab('today')}
                  className={`pb-3 -mb-3 transition-colors cursor-pointer relative ${
                    activeTab === 'today'
                      ? 'text-blue-600 dark:text-blue-400 font-bold border-b-2 border-blue-600'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Today ({todayAppointments.length})
                </button>
                <button
                  onClick={() => setActiveTab('upcoming')}
                  className={`pb-3 -mb-3 transition-colors cursor-pointer relative ${
                    activeTab === 'upcoming'
                      ? 'text-blue-600 dark:text-blue-400 font-bold border-b-2 border-blue-600'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  Upcoming ({upcomingAppointments.length})
                </button>
                <button
                  onClick={() => setActiveTab('all')}
                  className={`pb-3 -mb-3 transition-colors cursor-pointer relative ${
                    activeTab === 'all'
                      ? 'text-blue-600 dark:text-blue-400 font-bold border-b-2 border-blue-600'
                      : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  All ({appointments.length})
                </button>
              </div>

              {/* + New Button */}
              <button
                onClick={() => setIsBookModalOpen(true)}
                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 flex items-center gap-1 cursor-pointer"
              >
                <span>+ New</span>
              </button>
            </div>

            {/* Filter Controls Bar */}
            <div className="flex flex-wrap items-center gap-2.5 text-xs">
              {/* Date Filter */}
              <div className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 flex items-center gap-1.5 shadow-2xs">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <select
                  value={selectedDateFilter}
                  onChange={(e) => setSelectedDateFilter(e.target.value)}
                  className="bg-transparent border-0 text-xs font-semibold focus:outline-none cursor-pointer"
                >
                  <option value="any">Any date</option>
                  <option value="today">Today only</option>
                  <option value="tomorrow">Tomorrow</option>
                </select>
              </div>

              {/* Clinic Filter */}
              <div className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 flex items-center gap-1.5 shadow-2xs">
                <select className="bg-transparent border-0 text-xs font-semibold focus:outline-none cursor-pointer">
                  <option>All clinics</option>
                  <option>{activeClinic?.name || 'Main Clinic'}</option>
                </select>
              </div>

              {/* Status Filter */}
              <div className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-700 dark:text-slate-300 flex items-center gap-1.5 shadow-2xs">
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="bg-transparent border-0 text-xs font-semibold focus:outline-none cursor-pointer"
                >
                  <option value="all">All status</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="checked in">Checked In</option>
                  <option value="completed">Completed</option>
                </select>
              </div>

              {/* Search Name / Phone */}
              <div className="relative flex-1 min-w-[140px]">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search name / phone"
                  className="w-full px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-2xs"
                />
              </div>
            </div>

            {/* Appointment Content Area / Empty State */}
            {filteredAppointments.length === 0 ? (
              <div className="py-20 text-center space-y-3">
                <p className="text-sm font-semibold text-slate-400 dark:text-slate-500">
                  No appointments today
                </p>
                <div>
                  <button
                    onClick={() => setIsBookModalOpen(true)}
                    className="px-4 py-2 rounded-xl text-xs font-bold bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 hover:bg-blue-100 border border-blue-200 dark:border-blue-800 transition-colors cursor-pointer"
                  >
                    + Book your first appointment
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-2.5">
                {filteredAppointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800/80 hover:border-blue-400 dark:hover:border-blue-600 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-2xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-bold text-xs flex items-center justify-center shrink-0">
                        {apt.patientName?.[0] || 'P'}
                      </div>
                      <div>
                        <div className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-2">
                          <span>{apt.patientName}</span>
                          <span className="text-[10px] text-slate-400 font-mono">
                            {apt.time || '10:30 AM'}
                          </span>
                        </div>
                        <div className="text-[11px] text-slate-500 dark:text-slate-400">
                          {apt.serviceName || 'Consultation'} · {apt.doctorName || 'Dr. Siddharth'}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                        {apt.status || 'Confirmed'}
                      </span>
                      <button
                        onClick={() => openPrescriptionModal?.({ patientName: apt.patientName })}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-blue-600 text-white hover:bg-blue-700 cursor-pointer shadow-2xs"
                      >
                        Prescribe
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </Card>
        </div>

        {/* Right Column: Weekly Overview & Quick Actions */}
        <div className="lg:col-span-4 space-y-6">
          {/* 1. Weekly Overview Card */}
          <Card className="p-5 sm:p-6 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 shadow-xs space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">Weekly Overview</h3>
              <p className="text-xs text-slate-400">Appointments per day</p>
            </div>

            <div>
              <div className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
                {todayAppointments.length}
              </div>
              <div className="text-xs text-slate-400 font-medium mt-0.5">
                ↑ 0% vs last week
              </div>
            </div>

            {/* Mini Weekday Bars: M T W T F S S */}
            <div className="pt-2 space-y-2">
              <div className="grid grid-cols-7 gap-1.5 items-end h-16 pt-2">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, idx) => {
                  const isToday = idx === 1; // Tuesday
                  return (
                    <div key={idx} className="flex flex-col items-center gap-1.5 h-full justify-end">
                      <div
                        className={`w-full rounded-sm transition-all ${
                          isToday
                            ? 'bg-blue-600 h-8 shadow-xs'
                            : 'bg-slate-100 dark:bg-slate-800 h-2'
                        }`}
                      />
                      <span className="text-[10px] font-semibold text-slate-400">{day}</span>
                    </div>
                  );
                })}
              </div>
              <div className="text-center text-[11px] text-slate-400 pt-1">
                Today: {todayAppointments.length} appts
              </div>
            </div>
          </Card>

          {/* 2. QUICK ACTIONS Card (Exact 4 Stacked Action Buttons) */}
          <Card className="p-5 sm:p-6 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-850 shadow-xs space-y-3.5">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              QUICK ACTIONS
            </span>

            <div className="space-y-2.5">
              {/* Action 1: New Prescription */}
              <button
                onClick={() => openPrescriptionModal?.({ patientName: 'Rahul Sharma' })}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 hover:border-blue-400 dark:hover:border-blue-600 text-left flex items-center gap-3 transition-all shadow-2xs cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
                  <FileText className="w-4 h-4" />
                </div>
                <span className="font-bold text-xs text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  New Prescription
                </span>
              </button>

              {/* Action 2: Book Appointment */}
              <button
                onClick={() => setIsBookModalOpen(true)}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 hover:border-blue-400 dark:hover:border-blue-600 text-left flex items-center gap-3 transition-all shadow-2xs cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0">
                  <Calendar className="w-4 h-4" />
                </div>
                <span className="font-bold text-xs text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  Book Appointment
                </span>
              </button>

              {/* Action 3: Add Patient */}
              <button
                onClick={() => setIsAddPatientModalOpen(true)}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 hover:border-blue-400 dark:hover:border-blue-600 text-left flex items-center gap-3 transition-all shadow-2xs cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                  <UserPlus className="w-4 h-4" />
                </div>
                <span className="font-bold text-xs text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  Add Patient
                </span>
              </button>

              {/* Action 4: Generate Certificate */}
              <button
                onClick={() => setIsCertModalOpen(true)}
                className="w-full p-3 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-750 hover:border-blue-400 dark:hover:border-blue-600 text-left flex items-center gap-3 transition-all shadow-2xs cursor-pointer group"
              >
                <div className="w-8 h-8 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <span className="font-bold text-xs text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  Generate Certificate
                </span>
              </button>
            </div>
          </Card>
        </div>
      </div>

      {/* MODAL 1: Book Appointment Modal */}
      {isBookModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Book Clinic Appointment</h3>
              </div>
              <button
                onClick={() => setIsBookModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateBooking} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Patient Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ramesh Verma"
                  value={newBookingForm.patientName}
                  onChange={(e) => setNewBookingForm({ ...newBookingForm, patientName: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Mobile Phone (WhatsApp) *</label>
                <input
                  type="tel"
                  required
                  placeholder="+91 98200 12345"
                  value={newBookingForm.phone}
                  onChange={(e) => setNewBookingForm({ ...newBookingForm, phone: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Date</label>
                  <input
                    type="date"
                    value={newBookingForm.date}
                    onChange={(e) => setNewBookingForm({ ...newBookingForm, date: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Time Slot</label>
                  <input
                    type="text"
                    value={newBookingForm.time}
                    onChange={(e) => setNewBookingForm({ ...newBookingForm, time: e.target.value })}
                    placeholder="10:30 AM"
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Consultation Service</label>
                <select
                  value={newBookingForm.service}
                  onChange={(e) => setNewBookingForm({ ...newBookingForm, service: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-500"
                >
                  <option value="General Consultation">General Consultation (₹600)</option>
                  <option value="Specialist Follow-Up">Specialist Follow-Up (₹400)</option>
                  <option value="Teleconsultation">Teleconsultation Video (₹500)</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
                <Button variant="ghost" size="sm" type="button" onClick={() => setIsBookModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit" className="bg-blue-600 text-white font-bold">
                  Confirm Booking
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: Add Patient Modal */}
      {isAddPatientModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <UserPlus className="w-5 h-5 text-indigo-600" />
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Register New Patient</h3>
              </div>
              <button
                onClick={() => setIsAddPatientModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreatePatient} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Ananya Sen"
                  value={newPatientForm.name}
                  onChange={(e) => setNewPatientForm({ ...newPatientForm, name: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Mobile Phone *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98000 12345"
                    value={newPatientForm.phone}
                    onChange={(e) => setNewPatientForm({ ...newPatientForm, phone: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Age</label>
                  <input
                    type="number"
                    placeholder="28"
                    value={newPatientForm.age}
                    onChange={(e) => setNewPatientForm({ ...newPatientForm, age: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="patient@gmail.com"
                  value={newPatientForm.email}
                  onChange={(e) => setNewPatientForm({ ...newPatientForm, email: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
                <Button variant="ghost" size="sm" type="button" onClick={() => setIsAddPatientModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit" className="bg-indigo-600 text-white font-bold">
                  Save Patient Record
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: Generate Certificate Modal */}
      {isCertModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-emerald-600" />
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">Issue Medical Certificate</h3>
              </div>
              <button
                onClick={() => setIsCertModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleIssueCert} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Certificate Type</label>
                <select
                  value={certForm.type}
                  onChange={(e) => setCertForm({ ...certForm, type: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Medical Fitness Certificate">Medical Fitness Certificate</option>
                  <option value="Medical Sick Leave Certificate">Medical Sick Leave Certificate</option>
                  <option value="Recovery Certificate">Recovery Certificate</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Patient Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul Sharma"
                  value={certForm.patientName}
                  onChange={(e) => setCertForm({ ...certForm, patientName: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Diagnosis / Reason</label>
                <input
                  type="text"
                  value={certForm.diagnosis}
                  onChange={(e) => setCertForm({ ...certForm, diagnosis: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
                <Button variant="ghost" size="sm" type="button" onClick={() => setIsCertModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit" className="bg-emerald-600 text-white font-bold">
                  Generate & View Certificate →
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: Ask AI Assistant */}
      {isAiModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 dark:border-slate-800 space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-sm text-slate-900 dark:text-white">ClinicOS Clinical AI Assistant</h3>
              </div>
              <button
                onClick={() => setIsAiModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 text-xs text-blue-900 dark:text-blue-300 space-y-2">
              <p className="font-bold">I can assist you with:</p>
              <ul className="list-disc list-inside space-y-1 text-[11px] text-blue-800 dark:text-blue-200">
                <li>Drafting prescription dosage and drug contraindication checks</li>
                <li>Summarizing today's clinical patient schedule</li>
                <li>Generating patient WhatsApp follow-up reminders</li>
                <li>Analyzing clinic revenue trends and slot utilization</li>
              </ul>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
              <Button variant="primary" size="sm" onClick={() => setIsAiModalOpen(false)} className="bg-blue-600 text-white font-bold">
                Close Assistant
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

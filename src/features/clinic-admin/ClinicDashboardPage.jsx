import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import {
  Calendar,
  Users,
  CheckCircle2,
  Receipt,
  FileText,
  PlusCircle,
  ArrowRight,
  Package,
  MessageSquareHeart,
  Star
} from 'lucide-react';
import { StatCard } from '../../components/ui/StatCard';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import {
  AreaChart,
  Area,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export function ClinicDashboardPage() {
  const {
    activeClinic = {},
    activeBranch = {},
    appointments = [],
    updateAppointmentStatus,
    openPrescriptionModal,
    prescriptions = [],
    inventory = [],
    openWhatsAppModal,
    doctors = [],
    receptionists = [],
    feedbacks = []
  } = useApp();

  const clinicDoctors = doctors.filter((d) => d.clinicId === activeClinic?.id);
  const clinicReceptionists = receptionists.filter((r) => r.clinicId === activeClinic?.id);
  const clinicFeedbacks = feedbacks.filter((f) => f.clinicId === activeClinic?.id);
  const avgFeedbackScore = clinicFeedbacks.length > 0
    ? (clinicFeedbacks.reduce((a, c) => a + c.rating, 0) / clinicFeedbacks.length).toFixed(1)
    : '5.0';

  const todayStr = '2026-10-23';
  const branchAppointments = appointments.filter(
    (a) => a.clinicId === activeClinic?.id && a.branchId === activeBranch?.id
  );
  const todaysAppointments = branchAppointments.filter((a) => a.date === todayStr);

  const checkedInCount = todaysAppointments.filter((a) => a.status === 'Checked In').length;
  const inProgressCount = todaysAppointments.filter((a) => a.status === 'In Progress').length;
  const completedCount = branchAppointments.filter((a) => a.status === 'Completed').length;
  const lowStockItems = inventory.filter((i) => i.currentStock <= i.minStockLevel);

  const weeklyTrend = [
    { day: 'Mon', count: 14, revenue: 18500 },
    { day: 'Tue', count: 18, revenue: 24200 },
    { day: 'Wed', count: 16, revenue: 21800 },
    { day: 'Thu', count: 20, revenue: 29500 },
    { day: 'Fri', count: 19, revenue: 26000 },
    { day: 'Today', count: 15, revenue: 22400 }
  ];

  return (
    <div className="space-y-6">
      {/* Clinic Workspace Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">
              {activeClinic?.specialty} Practice Cockpit
            </span>
            <span className="text-xs text-slate-300">•</span>
            <span className="text-xs text-slate-600 font-medium">{activeBranch?.name}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            {activeClinic?.name}
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Today: Friday, 23 October 2026 · <span className="tabular-nums">{todaysAppointments.length}</span> Appointments scheduled on current branch
          </p>
        </div>

        {/* Quick actions */}
        <div className="flex flex-wrap items-center gap-2">
          <Link to="/clinic/prescriptions/new">
            <Button variant="primary" size="sm" icon={PlusCircle}>
              Write Prescription
            </Button>
          </Link>
          <Link to="/clinic/appointments">
            <Button variant="outline" size="sm" icon={Calendar}>
              Calendar Schedule
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Today's Appointments"
          value={todaysAppointments.length.toString()}
          change={`${checkedInCount} Checked In, ${inProgressCount} In Chair`}
          trend="up"
          icon={Calendar}
          color="blue"
          subtitle={`At ${activeBranch?.code || 'Main'}`}
        />
        <StatCard
          title="Completed Consultations"
          value={completedCount.toString()}
          change="This Month"
          trend="up"
          icon={CheckCircle2}
          color="emerald"
          subtitle="Patient visits resolved"
        />
        <StatCard
          title="Branch Revenue"
          value="₹1,42,800"
          change="+12.4% vs last week"
          trend="up"
          icon={Receipt}
          color="indigo"
          subtitle="Procedures & Consultations"
        />
        <StatCard
          title="Clinical Inventory Alerts"
          value={lowStockItems.length.toString()}
          change={lowStockItems.length > 0 ? 'Restock Required' : 'Optimal'}
          trend={lowStockItems.length > 0 ? 'down' : 'up'}
          icon={Package}
          color={lowStockItems.length > 0 ? 'amber' : 'slate'}
          subtitle="Items below minimum stock"
        />
      </div>

      {/* Main Grid: Live Queue & Revenue Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Today's Live Queue & Actions */}
        <div className="lg:col-span-7">
          <Card className="h-full">
            <CardHeader
              title="Today's Patient Schedule & Queue"
              subtitle={`Active appointments at ${activeBranch?.name}`}
              action={
                <Link to="/clinic/appointments" className="text-sm text-blue-600 font-semibold hover:underline">
                  View Full Calendar →
                </Link>
              }
            />
            <div className="p-4 sm:p-5 space-y-3">
              {todaysAppointments.length === 0 ? (
                <p className="text-sm text-slate-400 py-6 text-center">No appointments scheduled for today on this branch.</p>
              ) : (
                todaysAppointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="p-3.5 sm:p-4 rounded-xl border border-slate-200/90 bg-white hover:border-slate-300 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-sm"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-slate-900 text-base">{apt.patientName}</span>
                        <span className="font-mono text-slate-500 text-xs font-medium">({apt.patientId})</span>
                        <Badge variant={apt.status}>{apt.status}</Badge>
                      </div>
                      <p className="text-slate-600">
                        🕒 <strong className="tabular-nums font-semibold">{apt.time}</strong> · {apt.serviceName}
                      </p>
                      <p className="text-xs text-blue-700 font-semibold">Doctor: {apt.doctorName}</p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      {apt.status === 'Checked In' && (
                        <Button
                          variant="primary"
                          size="sm"
                          onClick={() => updateAppointmentStatus(apt.id, 'In Progress')}
                        >
                          Start Visit
                        </Button>
                      )}
                      {apt.status === 'In Progress' && (
                        <Button
                          variant="success"
                          size="sm"
                          onClick={() => updateAppointmentStatus(apt.id, 'Completed')}
                        >
                          Complete Visit
                        </Button>
                      )}
                      {apt.status === 'Requested' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateAppointmentStatus(apt.id, 'Confirmed')}
                        >
                          Confirm
                        </Button>
                      )}
                      <button
                        onClick={() =>
                          openWhatsAppModal({
                            patient_name: apt.patientName,
                            clinic_name: activeClinic?.name || 'Clinic',
                            appointment_date: apt.date,
                            appointment_time: apt.time,
                            doctor_name: apt.doctorName,
                            appointment_reference: apt.referenceNumber,
                            clinic_phone: activeClinic?.phone || ''
                          })
                        }
                        className="px-3 py-1.5 rounded-lg text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 text-xs font-semibold transition-colors cursor-pointer"
                        title="Dispatch WhatsApp Notification"
                      >
                        WhatsApp
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>

        {/* Weekly Revenue & Activity Trend */}
        <div className="lg:col-span-5">
          <Card className="h-full">
            <CardHeader
              title="Weekly Procedure Revenue"
              subtitle="7-day financial and attendance trend"
            />
            <CardContent>
              <div className="h-60 w-full pt-2">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={weeklyTrend}>
                    <defs>
                      <linearGradient id="clinicRev" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563EB" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12 }} />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fontSize: 12 }}
                      tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
                    />
                    <Tooltip
                      formatter={(v) => [`₹${Number(v).toLocaleString('en-IN')}`, 'Revenue']}
                      contentStyle={{ borderRadius: '12px', fontSize: '13px', borderColor: '#e2e8f0' }}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#2563EB"
                      strokeWidth={2.5}
                      fillOpacity={1}
                      fill="url(#clinicRev)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Recent Signed Prescriptions list */}
              <div className="pt-4 border-t border-slate-100 space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-semibold text-slate-800">Latest Signed Prescriptions</span>
                  <Link to="/clinic/prescriptions" className="text-blue-600 hover:underline font-medium">
                    View All ({prescriptions.length})
                  </Link>
                </div>
                {prescriptions.slice(0, 2).map((rx) => (
                  <div
                    key={rx.id}
                    onClick={() => openPrescriptionModal(rx)}
                    className="p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer flex items-center justify-between text-sm transition-colors"
                  >
                    <div>
                      <p className="font-semibold text-slate-900">{rx.patientName}</p>
                      <p className="text-xs text-slate-500 font-mono">{rx.prescriptionNumber} · {rx.date}</p>
                    </div>
                    <span className="text-xs text-blue-700 font-semibold bg-blue-50 px-2.5 py-1 rounded-md border border-blue-200">
                      QR Verified
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Staff Management & Patient Quality Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Staff Management Quick Card */}
        <Card className="p-5 sm:p-6 bg-white space-y-4 h-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base tracking-tight">Clinic Staff Roster</h3>
                <p className="text-xs sm:text-sm text-slate-500">Practitioners & Receptionists</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Link to="/clinic/doctors">
                <Button variant="outline" size="sm">
                  Doctors ({clinicDoctors.length})
                </Button>
              </Link>
              <Link to="/clinic/receptionists">
                <Button variant="outline" size="sm">
                  Receptionists ({clinicReceptionists.length})
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <Link
              to="/clinic/doctors"
              className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-slate-100/70 transition-colors block"
            >
              <span className="text-xs text-slate-500 uppercase font-semibold block">Consulting Clinicians</span>
              <p className="font-bold text-slate-800 text-base mt-1 tabular-nums">{clinicDoctors.length} Doctors</p>
              <span className="text-xs text-blue-600 font-semibold">Manage Rosters & Fees →</span>
            </Link>
            <Link
              to="/clinic/receptionists"
              className="p-3.5 rounded-xl border border-slate-100 bg-slate-50/70 hover:bg-slate-100/70 transition-colors block"
            >
              <span className="text-xs text-slate-500 uppercase font-semibold block">Front-Desk Team</span>
              <p className="font-bold text-slate-800 text-base mt-1 tabular-nums">{clinicReceptionists.length} Receptionists</p>
              <span className="text-xs text-blue-600 font-semibold">Manage Shifts & Permissions →</span>
            </Link>
          </div>
        </Card>

        {/* Patient Feedback Quality Quick Card */}
        <Card className="p-5 sm:p-6 bg-white space-y-4 h-full">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
                <MessageSquareHeart className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base tracking-tight">Patient Quality & Reviews</h3>
                <p className="text-xs sm:text-sm text-slate-500">Satisfaction Ratings & Comments</p>
              </div>
            </div>
            <Link to="/clinic/feedback">
              <Button variant="outline" size="sm" icon={ArrowRight}>
                View Inbox ({clinicFeedbacks.length})
              </Button>
            </Link>
          </div>

          <div className="flex items-center justify-between p-4 rounded-xl bg-amber-50/50 border border-amber-100 text-sm">
            <div className="flex items-center gap-3">
              <div className="flex items-center text-amber-500">
                <Star className="w-6 h-6 fill-amber-400 text-amber-400" />
              </div>
              <div>
                <span className="font-bold text-slate-900 text-base tabular-nums">{avgFeedbackScore} / 5.0 Stars</span>
                <p className="text-xs text-amber-800 tabular-nums">Across {clinicFeedbacks.length} verified patient ratings</p>
              </div>
            </div>
            <span className="text-xs bg-white px-2.5 py-1 rounded-lg border border-amber-200 text-amber-900 font-bold tabular-nums">
              {clinicFeedbacks.filter((f) => f.status === 'New').length} New Unread
            </span>
          </div>
        </Card>
      </div>
    </div>
  );
}

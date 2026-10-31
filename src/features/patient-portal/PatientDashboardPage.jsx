import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { StatCard } from '../../components/ui/StatCard';
import { DemoPatientSwitcher } from '../../components/patient/DemoPatientSwitcher';
import { DoctorPaymentModal } from '../../components/patient/DoctorPaymentModal';
import {
  Calendar,
  FileText,
  Receipt,
  PlusCircle,
  Clock,
  Printer,
  CreditCard,
  MessageSquareHeart,
  Star,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Video,
  Languages
} from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

export function PatientDashboardPage() {
  const { language, setLanguage, t } = useLanguage();
  const {
    currentUser,
    activePatientId,
    patients = [],
    appointments = [],
    prescriptions = [],
    invoices = [],
    receipts = [],
    feedbacks = [],
    openPrescriptionModal,
    formatCurrency
  } = useApp();

  const [paymentModalApt, setPaymentModalApt] = useState(null);

  const activePatient =
    patients.find((p) => p.id === activePatientId || p.patientIdNumber === activePatientId) ||
    patients.find((p) => p.name === currentUser?.name) ||
    patients[0];

  // Strictly filter for the active demo patient
  const myAppointments = appointments.filter(
    (a) =>
      a.patientId === activePatient?.id ||
      a.patientId === activePatient?.patientIdNumber ||
      a.patientName === activePatient?.name
  );

  const myPrescriptions = prescriptions.filter(
    (p) =>
      p.patientId === activePatient?.id ||
      p.patientId === activePatient?.patientIdNumber ||
      p.patientName === activePatient?.name
  );

  const myInvoices = invoices.filter(
    (i) =>
      i.patientId === activePatient?.id ||
      i.patientId === activePatient?.patientIdNumber ||
      i.patientName === activePatient?.name
  );

  const myReceipts = receipts.filter(
    (r) =>
      r.patientId === activePatient?.id ||
      r.patientId === activePatient?.patientIdNumber ||
      r.patientName === activePatient?.name
  );

  const myFeedbacks = feedbacks.filter(
    (f) =>
      f.patientId === activePatient?.id ||
      f.patientName === activePatient?.name
  );

  // Completed appointments that need feedback
  const completedAppointments = myAppointments.filter((a) => a.status === 'Completed');
  const appointmentsAwaitingFeedback = completedAppointments.filter(
    (a) => !myFeedbacks.some((f) => f.appointmentId === a.id)
  );

  // Outstanding balance across invoices + unpaid consultation fees
  const totalInvoiceDues = myInvoices.reduce((sum, inv) => {
    const paid = Number(inv.amountPaid) || 0;
    const balance = Math.max(0, (Number(inv.totalAmount) || 0) - paid);
    return sum + balance;
  }, 0);

  const totalUnpaidAppointmentFees = myAppointments
    .filter((a) => a.paymentStatus !== 'Paid' && a.status !== 'Cancelled' && a.status !== 'Rejected')
    .reduce((sum, a) => {
      const hasInvoice = myInvoices.some((i) => i.appointmentId === a.id || i.referenceNumber === a.referenceNumber);
      return hasInvoice ? sum : sum + (Number(a.consultationFee) || 600);
    }, 0);

  const totalOutstandingBalance = totalInvoiceDues + totalUnpaidAppointmentFees;

  const upcoming = myAppointments.filter((a) =>
    ['Confirmed', 'Patient Checked In', 'Checked In', 'In Consultation', 'In Progress'].includes(a.status)
  );

  const nextAppointment = upcoming[0] || null;

  return (
    <div className="space-y-6">
      {/* 1. Patient Identity Simulation Switcher */}
      <DemoPatientSwitcher />

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            Patient Care Hub
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mt-1">
            Welcome, {activePatient?.name || 'Aarav'} 👋
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Access your consultation timeline, digital prescriptions, invoices, and verified settlement receipts.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Multilingual Selector (English / Hindi / Marathi) */}
          <div className="flex items-center space-x-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold">
            <Languages className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 ml-1.5 mr-0.5" />
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                language === 'en'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs font-bold'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setLanguage('hi')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                language === 'hi'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs font-bold'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              हिंदी
            </button>
            <button
              type="button"
              onClick={() => setLanguage('mr')}
              className={`px-2.5 py-1 rounded-lg transition-all ${
                language === 'mr'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs font-bold'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              मराठी
            </button>
          </div>

          <Link to="/patient/virtual-consulting">
            <Button variant="outline" size="md" className="font-bold flex items-center gap-1.5 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800">
              <Video className="w-4 h-4" />
              <span>Connect Virtually</span>
            </Button>
          </Link>
          <Link to="/patient/appointments/book">
            <Button variant="primary" size="md" icon={PlusCircle} className="shadow-md shadow-blue-500/20 font-bold">
              {t('nav.book', 'Book Appointment')}
            </Button>
          </Link>
        </div>
      </div>

      {/* 2. Feedback Request Banner for Completed Visits */}
      {appointmentsAwaitingFeedback.length > 0 && (
        <div className="p-4 sm:p-5 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/40 dark:to-orange-950/30 border border-amber-300 dark:border-amber-800 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
          <div className="flex items-start gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 text-amber-800 dark:text-amber-300 flex items-center justify-center shrink-0 border border-amber-400/30">
              <Star className="w-5 h-5 text-amber-600 dark:text-amber-400 fill-amber-500" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-extrabold text-amber-900 dark:text-amber-200 bg-amber-200 dark:bg-amber-900/60 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Patient Experience Feedback
                </span>
                <span className="text-xs text-amber-700 dark:text-amber-400 font-mono">
                  Ref: {appointmentsAwaitingFeedback[0].referenceNumber}
                </span>
              </div>
              <h2 className="text-base font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                How was your visit with Dr. {appointmentsAwaitingFeedback[0].doctorName}?
              </h2>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                Your consultation on {appointmentsAwaitingFeedback[0].date} was completed. Share your ratings and comments to help our clinic maintain high clinical standards.
              </p>
            </div>
          </div>
          <Link to={`/patient/feedback?appointment=${appointmentsAwaitingFeedback[0].id}`}>
            <Button variant="primary" size="sm" className="bg-amber-600 hover:bg-amber-700 text-white font-bold whitespace-nowrap shadow-sm">
              <Star className="w-3.5 h-3.5 mr-1.5 fill-white" />
              Rate Visit (1–5 Stars) &rarr;
            </Button>
          </Link>
        </div>
      )}

      {/* 3. Top 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Upcoming Visits"
          value={upcoming.length.toString()}
          change={upcoming.length > 0 ? `${upcoming[0].date}` : 'No active visits'}
          trend="up"
          icon={Calendar}
          color="blue"
          subtitle="Confirmed consults"
        />
        <StatCard
          title="Prescriptions"
          value={myPrescriptions.length.toString()}
          change="Tamper-evident QR"
          trend="up"
          icon={FileText}
          color="emerald"
          subtitle="Medical vault records"
        />
        <StatCard
          title="Outstanding Due"
          value={formatCurrency(totalOutstandingBalance)}
          change={totalOutstandingBalance > 0 ? 'Payable at clinic' : 'Fully settled'}
          trend={totalOutstandingBalance > 0 ? 'down' : 'up'}
          icon={CreditCard}
          color={totalOutstandingBalance > 0 ? 'amber' : 'green'}
          subtitle="Pending invoice dues"
        />
        <StatCard
          title="Settled Receipts"
          value={myReceipts.length.toString()}
          change="Available to print"
          trend="up"
          icon={Receipt}
          color="indigo"
          subtitle="Official OPD receipts"
        />
      </div>

      {/* 4. Next Appointment Spotlight Card */}
      {nextAppointment && (
        <Card className="p-5 border-blue-200 dark:border-blue-900/60 bg-gradient-to-r from-blue-50/80 via-white to-indigo-50/60 dark:from-blue-950/30 dark:via-slate-900 dark:to-indigo-950/20 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center font-bold text-xl shadow-md shadow-blue-500/20 shrink-0">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-blue-700 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/50 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Next Consultation
                  </span>
                  <Badge variant={nextAppointment.status}>{nextAppointment.status}</Badge>
                </div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white mt-1">
                  {nextAppointment.serviceName || 'Consultation'} with Dr. {nextAppointment.doctorName}
                </h3>
                <div className="flex items-center gap-4 text-xs text-slate-600 dark:text-slate-300 mt-1 flex-wrap">
                  <span className="font-semibold text-slate-900 dark:text-white">
                    📅 {nextAppointment.date}
                  </span>
                  <span className="font-semibold text-slate-900 dark:text-white">
                    ⏰ {nextAppointment.time}
                  </span>
                  <span className="font-mono text-slate-400">
                    Ref: {nextAppointment.referenceNumber}
                  </span>
                  <span className="font-bold text-blue-600 dark:text-blue-400 font-mono">
                    Fee: ₹{(Number(nextAppointment.consultationFee) || 600).toLocaleString('en-IN')}
                  </span>
                  {nextAppointment.paymentStatus === 'Paid' ? (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800">
                      <CheckCircle2 className="w-3 h-3" /> Fee Paid
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
                      <Clock className="w-3 h-3" /> Fee Due
                    </span>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2.5">
              {nextAppointment.paymentStatus !== 'Paid' && (
                <Button
                  variant="primary"
                  size="sm"
                  icon={CreditCard}
                  onClick={() => setPaymentModalApt(nextAppointment)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold shadow-sm"
                >
                  Pay Fee (₹{(Number(nextAppointment.consultationFee) || 600).toLocaleString('en-IN')})
                </Button>
              )}
              <Link to="/patient/appointments">
                <Button variant="outline" size="sm">
                  Manage Visit
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      )}

      {/* 5. Main 2-Column Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Recent Appointments & Outstanding Invoices */}
        <div className="lg:col-span-7 space-y-6">
          {/* Recent Appointments */}
          <Card className="border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm overflow-hidden">
            <CardHeader
              title={`Recent Appointments (${myAppointments.length})`}
              subtitle="Full appointment lifecycle history"
              action={
                <Link to="/patient/appointments" className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline">
                  View All &rarr;
                </Link>
              }
            />
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {myAppointments.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-400">
                  No appointments found for this patient.
                </div>
              ) : (
                myAppointments.slice(0, 4).map((apt) => (
                  <div key={apt.id} className="p-4 flex items-center justify-between gap-3 text-xs hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 dark:text-white">{apt.serviceName}</span>
                        <Badge variant={apt.status} size="sm">{apt.status}</Badge>
                      </div>
                      <div className="text-slate-500 dark:text-slate-400">
                        Dr. {apt.doctorName} · <span className="font-mono">{apt.date} at {apt.time}</span>
                      </div>
                    </div>
                    <div className="text-right flex items-center justify-end gap-2">
                      <div className="text-right">
                        <div className="font-mono font-bold text-slate-800 dark:text-slate-200">
                          ₹{(Number(apt.consultationFee) || 600).toLocaleString('en-IN')}
                        </div>
                        {apt.paymentStatus === 'Paid' ? (
                          <span className="text-[10px] font-bold text-emerald-600 block">✓ Paid</span>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setPaymentModalApt(apt)}
                            className="text-[10px] font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer block"
                          >
                            Pay Fee &rarr;
                          </button>
                        )}
                      </div>
                      {apt.status === 'Completed' && (
                        <Link to={`/patient/feedback?appointment=${apt.id}`}>
                          <Button variant="outline" size="sm" className="text-[11px] font-semibold text-amber-700 border-amber-300 dark:border-amber-800 bg-amber-50/50 hover:bg-amber-100">
                            <Star className="w-3 h-3 mr-1 fill-amber-500" />
                            Feedback
                          </Button>
                        </Link>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>

          {/* Invoices & Dues */}
          <Card className="border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm overflow-hidden">
            <CardHeader
              title="Recent Clinical Invoices"
              subtitle="Itemized billing breakdown and dues"
              action={
                <Link to="/patient/invoices" className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline">
                  View Invoices &rarr;
                </Link>
              }
            />
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {myInvoices.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-400">
                  No billing invoices issued yet.
                </div>
              ) : (
                myInvoices.slice(0, 3).map((inv) => {
                  const paid = Number(inv.amountPaid) || 0;
                  const balance = Math.max(0, (Number(inv.totalAmount) || 0) - paid);
                  return (
                    <div key={inv.id} className="p-4 flex items-center justify-between gap-3 text-xs hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono font-bold text-blue-600 dark:text-blue-400">{inv.invoiceNumber}</span>
                          <Badge variant={inv.status === 'Paid' ? 'success' : inv.status === 'Partially Paid' ? 'warning' : 'default'} size="sm">
                            {inv.status}
                          </Badge>
                        </div>
                        <div className="text-slate-500 text-[11px] mt-0.5">
                          {inv.items?.[0]?.description || 'Consultation'} · {inv.date}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-mono font-bold text-slate-900 dark:text-white">
                          {formatCurrency(inv.totalAmount)}
                        </div>
                        {balance > 0 ? (
                          <span className="text-[11px] font-mono text-amber-600 font-semibold">
                            Due: {formatCurrency(balance)}
                          </span>
                        ) : (
                          <span className="text-[11px] font-mono text-emerald-600 font-semibold">
                            Paid in Full
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </Card>
        </div>

        {/* Right Column: Recent Prescriptions & Receipts */}
        <div className="lg:col-span-5 space-y-6">
          {/* Recent Prescriptions */}
          <Card className="border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm overflow-hidden">
            <CardHeader
              title="Recent Prescriptions"
              subtitle="Tamper-evident medical regimens"
              action={
                <Link to="/patient/prescriptions" className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline">
                  View Prescriptions &rarr;
                </Link>
              }
            />
            <div className="p-4 space-y-3">
              {myPrescriptions.length === 0 ? (
                <div className="text-center py-8 text-xs text-slate-400">
                  No active prescriptions on record.
                </div>
              ) : (
                myPrescriptions.slice(0, 2).map((rx) => (
                  <div
                    key={rx.id}
                    className="p-3.5 rounded-xl border border-blue-200 dark:border-blue-900/60 bg-blue-50/40 dark:bg-blue-950/20 text-xs space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-blue-900 dark:text-blue-300">
                        {rx.prescriptionNumber}
                      </span>
                      <span className="text-[10px] font-semibold text-blue-700 bg-blue-100 dark:bg-blue-900/60 px-2 py-0.5 rounded">
                        QR Verified
                      </span>
                    </div>
                    <p className="font-bold text-slate-800 dark:text-slate-200">
                      Diagnosis: {rx.diagnosis}
                    </p>
                    <p className="text-[11px] text-slate-500">
                      Dr. {rx.doctorName} · {rx.date}
                    </p>
                    <div className="pt-2 flex justify-end">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openPrescriptionModal(rx)}
                        className="text-[11px]"
                      >
                        <Printer className="w-3 h-3 mr-1" />
                        View / Print
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>

          {/* Recent Receipts */}
          <Card className="border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm overflow-hidden">
            <CardHeader
              title="Settlement Receipts"
              subtitle="Authorized proof of payments"
              action={
                <Link to="/patient/receipts" className="text-xs text-blue-600 dark:text-blue-400 font-bold hover:underline">
                  View Receipts &rarr;
                </Link>
              }
            />
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {myReceipts.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-400">
                  No receipts recorded for this patient.
                </div>
              ) : (
                myReceipts.slice(0, 3).map((rcp) => (
                  <div key={rcp.id} className="p-3.5 flex items-center justify-between gap-2 text-xs">
                    <div>
                      <div className="font-mono font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                        <Receipt className="w-3.5 h-3.5 text-blue-600" />
                        <span>{rcp.receiptNumber}</span>
                      </div>
                      <div className="text-[11px] text-slate-500 font-mono mt-0.5">
                        {rcp.date} · {rcp.paymentMethod}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-bold text-emerald-600">
                        {formatCurrency(rcp.amount)}
                      </div>
                      <Badge variant="success" size="sm">
                        {rcp.status}
                      </Badge>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>
      </div>

      {/* Doctor Consultation Fee Payment Gateway Modal */}
      <DoctorPaymentModal
        isOpen={!!paymentModalApt}
        onClose={() => setPaymentModalApt(null)}
        appointment={paymentModalApt}
      />
    </div>
  );
}

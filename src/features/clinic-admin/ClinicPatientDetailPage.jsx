import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
  User,
  Phone,
  Mail,
  Calendar,
  FileText,
  Receipt,
  HeartPulse,
  PlusCircle,
  ArrowRight,
  ExternalLink,
  ShieldAlert
} from 'lucide-react';

export function ClinicPatientDetailPage() {
  const { patientId } = useParams();
  const {
    patients,
    appointments,
    prescriptions,
    invoices,
    openPrescriptionModal,
    activeClinic
  } = useApp();

  const patient = patients.find((p) => p.id === patientId || p.patientIdNumber === patientId) || patients[0];
  const patientAppointments = appointments.filter((a) => a.patientId === patient.id || a.patientName === patient.name);
  const patientPrescriptions = prescriptions.filter((p) => p.patientId === patient.id || p.patientName === patient.name);
  const patientInvoices = invoices.filter((i) => i.patientId === patient.id || i.patientName === patient.name);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Link to="/clinic/patients" className="text-xs text-blue-600 hover:underline">
              ← Back to Patient Directory
            </Link>
            <span className="text-slate-300">•</span>
            <span className="text-xs font-mono font-bold text-blue-800">{patient.patientIdNumber}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mt-1">
            {patient.name}
          </h1>
          <p className="text-xs text-slate-500">
            Registered on {patient.registeredAt} · Status: {patient.status}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link to={`/clinic/prescriptions/new?patient=${patient.id}`}>
            <Button variant="primary" size="sm" icon={PlusCircle}>
              Write Prescription
            </Button>
          </Link>
          <Link to={`/clinic/appointments?patient=${patient.id}`}>
            <Button variant="outline" size="sm" icon={Calendar}>
              Book Visit
            </Button>
          </Link>
        </div>
      </div>

      {/* Patient Dossier Overview Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-4 space-y-6">
          <Card className="p-6 border-slate-200 space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Demographics</h3>
            <div className="space-y-2.5 text-xs text-slate-600">
              <div className="flex justify-between">
                <span className="text-slate-400">Gender / DOB:</span>
                <span className="font-semibold text-slate-800">{patient.gender} · {patient.dob}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Blood Group:</span>
                <span className="font-bold text-slate-900">{patient.bloodGroup || 'Not Tested'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Phone:</span>
                <span className="font-semibold text-slate-800">{patient.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Email:</span>
                <span className="font-semibold text-slate-800">{patient.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Emergency Contact:</span>
                <span className="text-slate-700 text-[11px] text-right">{patient.emergencyContact || '—'}</span>
              </div>
              <div className="pt-2 border-t border-slate-100">
                <span className="text-slate-400 block mb-0.5">Address:</span>
                <p className="text-slate-700">{patient.address || 'Local Clinic Resident'}</p>
              </div>
            </div>
          </Card>

          {/* Allergy Alert Card */}
          {patient.allergies && patient.allergies.length > 0 && (
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-900 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold">
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                <span>Known Drug Allergies Warning</span>
              </div>
              <div className="flex flex-wrap gap-1 pt-1">
                {patient.allergies.map((all) => (
                  <span key={all} className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold text-[10px]">
                    {all}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Medical History */}
          <Card className="p-6 border-slate-200 space-y-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Medical Notes</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              {patient.medicalHistory || 'No pre-existing clinical disorders on record.'}
            </p>
          </Card>
        </div>

        {/* Right Columns: Past Consultations, Prescriptions, Invoices */}
        <div className="lg:col-span-8 space-y-6">
          {/* Consultations History */}
          <Card>
            <CardHeader
              title="Appointment & Consultation History"
              subtitle={`Logged appointments for ${patient.name}`}
            />
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3.5">Date</th>
                    <th className="p-3.5">Doctor</th>
                    <th className="p-3.5">Service</th>
                    <th className="p-3.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {patientAppointments.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="p-4 text-center text-slate-400">No visits on record.</td>
                    </tr>
                  ) : (
                    patientAppointments.map((apt) => (
                      <tr key={apt.id}>
                        <td className="p-3.5 font-mono font-semibold text-slate-900">
                          {apt.date} ({apt.time})
                        </td>
                        <td className="p-3.5 text-slate-800">{apt.doctorName}</td>
                        <td className="p-3.5 text-slate-600">{apt.serviceName}</td>
                        <td className="p-3.5">
                          <Badge variant={apt.status}>{apt.status}</Badge>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>

          {/* Digital Prescriptions Archive */}
          <Card>
            <CardHeader
              title="Prescription Documents (with QR Verification)"
              subtitle="Signed digital prescriptions issued to this patient"
            />
            <div className="p-4 space-y-3">
              {patientPrescriptions.length === 0 ? (
                <p className="text-xs text-slate-400 text-center py-4">No prescriptions issued yet for this patient.</p>
              ) : (
                patientPrescriptions.map((rx) => (
                  <div
                    key={rx.id}
                    className="p-3.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-slate-900">{rx.prescriptionNumber}</span>
                        <span className="text-[10px] text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 font-semibold">
                          QR Verified
                        </span>
                      </div>
                      <p className="text-slate-600 mt-1">Diagnosis: {rx.diagnosis}</p>
                      <p className="text-[10px] text-slate-400">Doctor: {rx.doctorName} · Date: {rx.date}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => openPrescriptionModal(rx)}
                      >
                        Print / View PDF
                      </Button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>

          {/* Invoices */}
          <Card>
            <CardHeader
              title="Billing Invoices & Receipts"
              subtitle="Procedure charges and payment statuses"
            />
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-3.5">Invoice #</th>
                    <th className="p-3.5">Date</th>
                    <th className="p-3.5">Amount</th>
                    <th className="p-3.5">Paid</th>
                    <th className="p-3.5">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {patientInvoices.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-4 text-center text-slate-400">No invoices recorded yet.</td>
                    </tr>
                  ) : (
                    patientInvoices.map((inv) => (
                      <tr key={inv.id}>
                        <td className="p-3.5 font-mono font-bold text-slate-900">{inv.invoiceNumber}</td>
                        <td className="p-3.5 text-slate-600">{inv.date}</td>
                        <td className="p-3.5 font-bold font-mono text-slate-900">₹{inv.totalAmount.toLocaleString('en-IN')}</td>
                        <td className="p-3.5 font-mono text-blue-700">₹{inv.amountPaid.toLocaleString('en-IN')}</td>
                        <td className="p-3.5">
                          <Badge variant={inv.status}>{inv.status}</Badge>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}


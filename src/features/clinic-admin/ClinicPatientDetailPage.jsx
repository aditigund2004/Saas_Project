<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
=======
import React from 'react';
>>>>>>> origin/main
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
<<<<<<< HEAD
import { Modal } from '../../components/ui/Modal';
=======
>>>>>>> origin/main
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
<<<<<<< HEAD
  ShieldAlert,
  Edit,
  Save
=======
  ShieldAlert
>>>>>>> origin/main
} from 'lucide-react';

export function ClinicPatientDetailPage() {
  const { patientId } = useParams();
  const {
    patients,
<<<<<<< HEAD
    updatePatient,
=======
>>>>>>> origin/main
    appointments,
    prescriptions,
    invoices,
    openPrescriptionModal,
    activeClinic
  } = useApp();

<<<<<<< HEAD
  const patient = patients.find((p) => p.id === patientId || p.patientIdNumber === patientId) || patients[0];
  const patientAppointments = appointments.filter((a) => a.patientId === patient?.id || a.patientName === patient?.name);
  const patientPrescriptions = prescriptions.filter((p) => p.patientId === patient?.id || p.patientName === patient?.name);
  const patientInvoices = invoices.filter((i) => i.patientId === patient?.id || i.patientName === patient?.name);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    name: '',
    phone: '',
    email: '',
    dob: '',
    gender: 'Male',
    bloodGroup: 'B+',
    allergies: '',
    emergencyContact: '',
    address: ''
  });

  useEffect(() => {
    if (patient) {
      setEditForm({
        name: patient.name || '',
        phone: patient.phone || '',
        email: patient.email || '',
        dob: patient.dob || '',
        gender: patient.gender || 'Male',
        bloodGroup: patient.bloodGroup || 'B+',
        allergies: Array.isArray(patient.allergies) ? patient.allergies.join(', ') : (patient.allergies || ''),
        emergencyContact: patient.emergencyContact || '',
        address: patient.address || ''
      });
    }
  }, [patient]);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    updatePatient(patient.id, {
      ...editForm,
      allergies: editForm.allergies ? editForm.allergies.split(',').map((a) => a.trim()) : []
    });
    setIsEditModalOpen(false);
  };
=======
  const clinicPatients = patients.filter((p) => p.clinicId === activeClinic?.id);
  const patient = clinicPatients.find((p) => p.id === patientId || p.patientIdNumber === patientId) || clinicPatients[0];
  const patientAppointments = appointments.filter(
    (a) =>
      a.clinicId === activeClinic?.id &&
      (a.patientId === patient?.id || a.patientName === patient?.name)
  );
  const patientPrescriptions = prescriptions.filter(
    (rx) => patient && (rx.patientId === patient.id || rx.patientName === patient.name)
  );
  const patientInvoices = invoices.filter(
    (i) => patient && (i.patientId === patient.id || i.patientName === patient.name)
  );

  if (!patient) {
    return (
      <div className="space-y-3">
        <Link to="/clinic/patients" className="text-xs text-blue-600 hover:underline">
          ← Back to Patient Directory
        </Link>
        <p className="text-xs text-slate-500">This patient is not registered at your clinic.</p>
      </div>
    );
  }
>>>>>>> origin/main

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
<<<<<<< HEAD
            <Link to="/clinic/patients" className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
              ← Back to Patient Directory
            </Link>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="text-xs font-mono font-bold text-blue-800 dark:text-blue-400">{patient.patientIdNumber}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            {patient.name}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
=======
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
>>>>>>> origin/main
            Registered on {patient.registeredAt} · Status: {patient.status}
          </p>
        </div>

        <div className="flex items-center gap-2">
<<<<<<< HEAD
          <Button
            variant="outline"
            size="sm"
            icon={Edit}
            onClick={() => setIsEditModalOpen(true)}
          >
            Edit Profile
          </Button>
=======
>>>>>>> origin/main
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
<<<<<<< HEAD
          <Card className="p-6 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Demographics</h3>
            <div className="space-y-2.5 text-xs text-slate-600 dark:text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400 dark:text-slate-500">Gender / DOB:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{patient.gender} · {patient.dob}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 dark:text-slate-500">Blood Group:</span>
                <span className="font-bold text-slate-900 dark:text-white">{patient.bloodGroup || 'Not Tested'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 dark:text-slate-500">Phone:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{patient.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 dark:text-slate-500">Email:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{patient.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400 dark:text-slate-500">Emergency Contact:</span>
                <span className="text-slate-700 dark:text-slate-300 text-[11px] text-right">{patient.emergencyContact || '—'}</span>
              </div>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
                <span className="text-slate-400 dark:text-slate-500 block mb-0.5">Address:</span>
                <p className="text-slate-700 dark:text-slate-300">{patient.address || 'Local Clinic Resident'}</p>
=======
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
>>>>>>> origin/main
              </div>
            </div>
          </Card>

          {/* Allergy Alert Card */}
          {patient.allergies && patient.allergies.length > 0 && (
<<<<<<< HEAD
            <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 text-xs text-rose-900 dark:text-rose-200 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold">
                <ShieldAlert className="w-4 h-4 text-rose-600 dark:text-rose-400" />
=======
            <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-900 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold">
                <ShieldAlert className="w-4 h-4 text-rose-600" />
>>>>>>> origin/main
                <span>Known Drug Allergies Warning</span>
              </div>
              <div className="flex flex-wrap gap-1 pt-1">
                {patient.allergies.map((all) => (
<<<<<<< HEAD
                  <span key={all} className="px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-900/50 text-rose-800 dark:text-rose-300 font-bold text-[10px]">
=======
                  <span key={all} className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-bold text-[10px]">
>>>>>>> origin/main
                    {all}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Medical History */}
<<<<<<< HEAD
          <Card className="p-6 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Medical Notes</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
=======
          <Card className="p-6 border-slate-200 space-y-2">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Medical Notes</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
>>>>>>> origin/main
              {patient.medicalHistory || 'No pre-existing clinical disorders on record.'}
            </p>
          </Card>
        </div>

        {/* Right Columns: Past Consultations, Prescriptions, Invoices */}
        <div className="lg:col-span-8 space-y-6">
          {/* Consultations History */}
<<<<<<< HEAD
          <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
=======
          <Card>
>>>>>>> origin/main
            <CardHeader
              title="Appointment & Consultation History"
              subtitle={`Logged appointments for ${patient.name}`}
            />
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
<<<<<<< HEAD
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 uppercase text-[10px] font-semibold border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="p-3.5 text-center w-12">#</th>
=======
                <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-semibold border-b border-slate-200">
                  <tr>
>>>>>>> origin/main
                    <th className="p-3.5">Date</th>
                    <th className="p-3.5">Doctor</th>
                    <th className="p-3.5">Service</th>
                    <th className="p-3.5">Status</th>
                  </tr>
                </thead>
<<<<<<< HEAD
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {patientAppointments.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="p-4 text-center text-slate-400 dark:text-slate-500">No visits on record.</td>
                    </tr>
                  ) : (
                    patientAppointments.map((apt, idx) => (
                      <tr key={apt.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="p-3.5 text-center font-mono font-medium text-slate-400 dark:text-slate-500 text-xs">{idx + 1}</td>
                        <td className="p-3.5 font-mono font-semibold text-slate-900 dark:text-white">
                          {apt.date} ({apt.time})
                        </td>
                        <td className="p-3.5 text-slate-800 dark:text-slate-200">{apt.doctorName}</td>
                        <td className="p-3.5 text-slate-600 dark:text-slate-300">{apt.serviceName}</td>
=======
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
>>>>>>> origin/main
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
<<<<<<< HEAD
          <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
=======
          <Card>
>>>>>>> origin/main
            <CardHeader
              title="Prescription Documents (with QR Verification)"
              subtitle="Signed digital prescriptions issued to this patient"
            />
            <div className="p-4 space-y-3">
              {patientPrescriptions.length === 0 ? (
<<<<<<< HEAD
                <p className="text-xs text-slate-400 dark:text-slate-500 text-center py-4">No prescriptions issued yet for this patient.</p>
=======
                <p className="text-xs text-slate-400 text-center py-4">No prescriptions issued yet for this patient.</p>
>>>>>>> origin/main
              ) : (
                patientPrescriptions.map((rx) => (
                  <div
                    key={rx.id}
<<<<<<< HEAD
                    className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors flex items-center justify-between text-xs"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-slate-900 dark:text-white">{rx.prescriptionNumber}</span>
                        <span className="text-[10px] text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-900/50 font-semibold">
                          QR Verified
                        </span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-300 mt-1">Diagnosis: {rx.diagnosis}</p>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500">Doctor: {rx.doctorName} · Date: {rx.date}</p>
=======
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
>>>>>>> origin/main
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
<<<<<<< HEAD
          <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
=======
          <Card>
>>>>>>> origin/main
            <CardHeader
              title="Billing Invoices & Receipts"
              subtitle="Procedure charges and payment statuses"
            />
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
<<<<<<< HEAD
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 uppercase text-[10px] font-semibold border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="p-3.5 text-center w-12">#</th>
=======
                <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-semibold border-b border-slate-200">
                  <tr>
>>>>>>> origin/main
                    <th className="p-3.5">Invoice #</th>
                    <th className="p-3.5">Date</th>
                    <th className="p-3.5">Amount</th>
                    <th className="p-3.5">Paid</th>
                    <th className="p-3.5">Status</th>
                  </tr>
                </thead>
<<<<<<< HEAD
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {patientInvoices.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-4 text-center text-slate-400 dark:text-slate-500">No invoices recorded yet.</td>
                    </tr>
                  ) : (
                    patientInvoices.map((inv, idx) => (
                      <tr key={inv.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                        <td className="p-3.5 text-center font-mono font-medium text-slate-400 dark:text-slate-500 text-xs">{idx + 1}</td>
                        <td className="p-3.5 font-mono font-bold text-slate-900 dark:text-white">{inv.invoiceNumber}</td>
                        <td className="p-3.5 text-slate-600 dark:text-slate-300">{inv.date}</td>
                        <td className="p-3.5 font-bold font-mono text-slate-900 dark:text-white">₹{inv.totalAmount.toLocaleString('en-IN')}</td>
                        <td className="p-3.5 font-mono text-blue-700 dark:text-blue-400">₹{inv.amountPaid.toLocaleString('en-IN')}</td>
=======
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
>>>>>>> origin/main
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
<<<<<<< HEAD

      {/* Edit Profile Modal */}
      {isEditModalOpen && (
        <Modal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          title={`Edit Patient Profile: ${patient.name}`}
          size="md"
        >
          <form onSubmit={handleEditSubmit} className="space-y-4 text-xs text-slate-800 dark:text-slate-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold mb-1">Full Name *</label>
                <input
                  required
                  type="text"
                  value={editForm.name}
                  onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Phone Number *</label>
                <input
                  required
                  type="tel"
                  value={editForm.phone}
                  onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 text-xs font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Email Address</label>
                <input
                  type="email"
                  value={editForm.email}
                  onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={editForm.dob}
                  onChange={(e) => setEditForm({ ...editForm, dob: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Gender</label>
                <select
                  value={editForm.gender}
                  onChange={(e) => setEditForm({ ...editForm, gender: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 text-xs"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Blood Group</label>
                <select
                  value={editForm.bloodGroup}
                  onChange={(e) => setEditForm({ ...editForm, bloodGroup: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 text-xs font-bold"
                >
                  {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map((bg) => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">Documented Drug Allergies</label>
              <input
                type="text"
                value={editForm.allergies}
                onChange={(e) => setEditForm({ ...editForm, allergies: e.target.value })}
                placeholder="Comma separated: Penicillin, Sulfa, Aspirin..."
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 text-xs text-rose-700 dark:text-rose-400 font-semibold"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">Emergency Contact Person & Phone</label>
              <input
                type="text"
                value={editForm.emergencyContact}
                onChange={(e) => setEditForm({ ...editForm, emergencyContact: e.target.value })}
                placeholder="e.g. Ramesh Patel (Brother) - +91 98000 12345"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 text-xs"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1">Address</label>
              <input
                type="text"
                value={editForm.address}
                onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 text-xs"
              />
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
              <Button variant="outline" size="sm" type="button" onClick={() => setIsEditModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" type="submit" icon={Save}>
                Save Changes
              </Button>
            </div>
          </form>
        </Modal>
      )}
=======
>>>>>>> origin/main
    </div>
  );
}


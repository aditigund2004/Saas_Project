import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
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
  ShieldAlert,
  Edit,
  Save
} from 'lucide-react';

export function ClinicPatientDetailPage() {
  const { patientId } = useParams();
  const {
    patients,
    updatePatient,
    appointments,
    prescriptions,
    invoices,
    openPrescriptionModal,
    activeClinic
  } = useApp();

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

  // Diagnostic Lab Scans & Document Vault State
  const defaultDocs = [
    {
      id: 'doc-1',
      title: 'Complete Blood Count (CBC) & ESR Profile',
      category: 'Pathology',
      date: '2026-10-18',
      lab: 'Metropolis Healthcare Diagnostic Lab',
      fileSize: '1.4 MB PDF',
      status: 'Normal',
      notes: 'Hb: 14.2 g/dL, WBC: 7,400 /mcL, Platelets: 2.8 Lakh, ESR: 12 mm/hr. All values within normal biological ranges.'
    },
    {
      id: 'doc-2',
      title: 'Full Mouth Digital OPG Panoramic X-Ray',
      category: 'Radiology',
      date: '2026-10-21',
      lab: 'CityCare In-House Digital Radiography',
      fileSize: '3.8 MB DICOM/JPG',
      status: 'Abnormal',
      notes: 'Deep periapical radiolucency noted around apex of root #46 with symptomatic pulpitis. Canal curvature: 18 deg.'
    },
    {
      id: 'doc-3',
      title: 'Fasting Blood Glucose & Glycated HbA1c',
      category: 'Pathology',
      date: '2026-10-10',
      lab: 'Dr. Lal PathLabs',
      fileSize: '820 KB PDF',
      status: 'Borderline',
      notes: 'HbA1c: 6.8% (Borderline pre-diabetic). Fasting blood glucose: 114 mg/dL. Advised dietary control and carbohydrate reduction.'
    }
  ];

  const [labDocs, setLabDocs] = useState(() => {
    try {
      const saved = localStorage.getItem(`clinicos_docs_${patient?.id || 'demo'}`);
      return saved ? JSON.parse(saved) : defaultDocs;
    } catch {
      return defaultDocs;
    }
  });

  const [docCategoryFilter, setDocCategoryFilter] = useState('All');
  const [isUploadDocOpen, setIsUploadDocOpen] = useState(false);
  const [viewingDoc, setViewingDoc] = useState(null);

  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadCategory, setUploadCategory] = useState('Pathology');
  const [uploadLab, setUploadLab] = useState('Metropolis Healthcare');
  const [uploadNotes, setUploadNotes] = useState('');
  const [uploadDate, setUploadDate] = useState(new Date().toISOString().slice(0, 10));

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

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
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
            Registered on {patient.registeredAt} · Status: {patient.status}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={Edit}
            onClick={() => setIsEditModalOpen(true)}
          >
            Edit Profile
          </Button>
          <Button
            variant="outline"
            size="sm"
            icon={FileUp}
            onClick={() => setIsUploadDocOpen(true)}
          >
            Upload Lab Scan
          </Button>
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
              </div>
            </div>
          </Card>

          {/* Allergy Alert Card */}
          {patient.allergies && patient.allergies.length > 0 && (
            <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/40 text-xs text-rose-900 dark:text-rose-200 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold">
                <ShieldAlert className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                <span>Known Drug Allergies Warning</span>
              </div>
              <div className="flex flex-wrap gap-1 pt-1">
                {patient.allergies.map((all) => (
                  <span key={all} className="px-2 py-0.5 rounded-full bg-rose-100 dark:bg-rose-900/50 text-rose-800 dark:text-rose-300 font-bold text-[10px]">
                    {all}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Medical History */}
          <Card className="p-6 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-2">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">Medical Notes</h3>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {patient.medicalHistory || 'No pre-existing clinical disorders on record.'}
            </p>
          </Card>
        </div>

        {/* Right Columns: Past Consultations, Prescriptions, Invoices */}
        <div className="lg:col-span-8 space-y-6">
          {/* Consultations History */}
          <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <CardHeader
              title="Appointment & Consultation History"
              subtitle={`Logged appointments for ${patient.name}`}
            />
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 uppercase text-[10px] font-semibold border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="p-3.5 text-center w-12">#</th>
                    <th className="p-3.5">Date</th>
                    <th className="p-3.5">Doctor</th>
                    <th className="p-3.5">Service</th>
                    <th className="p-3.5">Status</th>
                  </tr>
                </thead>
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

          {/* Dedicated Lab Reports, Scans & Diagnostics Vault */}
          <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-sm">
            <div className="p-4 sm:p-5 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <FlaskConical className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                  Diagnostic Reports, Scans & Pathology Vault ({filteredDocs.length})
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Digital X-rays, blood profiles, MRI/CT scans, and external investigations
                </p>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg text-[11px] font-semibold">
                  {['All', 'Pathology', 'Radiology'].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setDocCategoryFilter(cat)}
                      className={`px-2.5 py-1 rounded-md transition-colors cursor-pointer ${
                        docCategoryFilter === cat
                          ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 shadow-xs'
                          : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                <Button
                  variant="primary"
                  size="sm"
                  icon={FileUp}
                  onClick={() => setIsUploadDocOpen(true)}
                  className="text-xs h-7 px-2.5 bg-purple-600 hover:bg-purple-700"
                >
                  Upload Scan
                </Button>
              </div>
            </div>

            <div className="p-4 space-y-3">
              {filteredDocs.length === 0 ? (
                <div className="p-6 text-center text-slate-400 dark:text-slate-500 text-xs">
                  No diagnostic records found in this category. Click "Upload Scan" to attach patient tests.
                </div>
              ) : (
                filteredDocs.map((doc) => (
                  <div
                    key={doc.id}
                    className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 dark:text-white text-xs">{doc.title}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                          doc.category === 'Radiology'
                            ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800'
                            : 'bg-purple-50 dark:bg-purple-950 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800'
                        }`}>
                          {doc.category}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 dark:text-slate-500">
                          {doc.fileSize}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        Lab: <span className="font-semibold text-slate-700 dark:text-slate-300">{doc.lab}</span> · Sample Date: {doc.date}
                      </p>
                      <p className="text-[11px] text-slate-600 dark:text-slate-300 italic truncate max-w-lg">
                        {doc.notes}
                      </p>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Button
                        variant="outline"
                        size="sm"
                        icon={Eye}
                        onClick={() => setViewingDoc(doc)}
                        className="text-xs h-7 px-2.5"
                      >
                        Inspect
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        icon={Download}
                        onClick={() => showToast(`Downloading diagnostic document: ${doc.title}.pdf`)}
                        className="text-xs h-7 px-2"
                      >
                        PDF
                      </Button>
                      <button
                        type="button"
                        onClick={() => handleDeleteDoc(doc.id)}
                        className="p-1 rounded-md text-slate-400 hover:text-rose-600 cursor-pointer"
                        title="Remove Document"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>

          {/* Digital Prescriptions Archive */}
          <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <CardHeader
              title="Prescription Documents (with QR Verification)"
              subtitle="Signed digital prescriptions issued to this patient"
            />
            <div className="p-4 space-y-3">
              {patientPrescriptions.length === 0 ? (
                <p className="text-xs text-slate-400 dark:text-slate-500 text-center py-4">No prescriptions issued yet for this patient.</p>
              ) : (
                patientPrescriptions.map((rx) => (
                  <div
                    key={rx.id}
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
          <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <CardHeader
              title="Billing Invoices & Receipts"
              subtitle="Procedure charges and payment statuses"
            />
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 uppercase text-[10px] font-semibold border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="p-3.5 text-center w-12">#</th>
                    <th className="p-3.5">Invoice #</th>
                    <th className="p-3.5">Date</th>
                    <th className="p-3.5">Amount</th>
                    <th className="p-3.5">Paid</th>
                    <th className="p-3.5">Status</th>
                  </tr>
                </thead>
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

      {/* Upload Diagnostic Report Modal */}
      {isUploadDocOpen && (
        <Modal
          isOpen={isUploadDocOpen}
          onClose={() => setIsUploadDocOpen(false)}
          title={`Upload Diagnostic Lab Scan: ${patient.name}`}
          size="md"
        >
          <form onSubmit={handleUploadDoc} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                Investigation / Scan Name *
              </label>
              <input
                required
                type="text"
                value={uploadTitle}
                onChange={(e) => setUploadTitle(e.target.value)}
                placeholder="e.g. Dental IOPA Radiograph #46 / Ultrasound Pelvis"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                  Category *
                </label>
                <select
                  value={uploadCategory}
                  onChange={(e) => setUploadCategory(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs focus:ring-2 focus:ring-purple-500"
                >
                  <option value="Pathology">Blood / Pathology</option>
                  <option value="Radiology">Digital X-Ray / OPG</option>
                  <option value="Imaging">USG / CT / MRI</option>
                  <option value="Prescription">External Rx Scan</option>
                </select>
              </div>

              <div>
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                  Sample / Test Date
                </label>
                <input
                  type="date"
                  value={uploadDate}
                  onChange={(e) => setUploadDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                Diagnostic Center / Laboratory
              </label>
              <input
                type="text"
                value={uploadLab}
                onChange={(e) => setUploadLab(e.target.value)}
                placeholder="e.g. Metropolis Healthcare / Dr. Lal PathLabs"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
              />
            </div>

            {/* Simulated Drag & Drop Zone */}
            <div className="p-6 border-2 border-dashed border-purple-300 dark:border-purple-800 rounded-xl bg-purple-50/30 dark:bg-purple-950/20 text-center space-y-2">
              <FileUp className="w-8 h-8 text-purple-600 dark:text-purple-400 mx-auto" />
              <p className="font-semibold text-slate-800 dark:text-slate-200">
                Drag and drop PDF reports or DICOM/JPEG scans here
              </p>
              <p className="text-[10px] text-slate-400">
                Supports PDF, DICOM, PNG, JPEG up to 25MB per file
              </p>
            </div>

            <div>
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">
                Clinician Observations & Impression
              </label>
              <textarea
                rows={2}
                value={uploadNotes}
                onChange={(e) => setUploadNotes(e.target.value)}
                placeholder="Key diagnostic findings for medical history..."
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" type="button" onClick={() => setIsUploadDocOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit" className="bg-purple-600 hover:bg-purple-700 font-bold">
                Save to Patient Vault
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Inspect Diagnostic Document Viewer Modal */}
      {viewingDoc && (
        <Modal
          isOpen={!!viewingDoc}
          onClose={() => setViewingDoc(null)}
          title={`Diagnostic Document: ${viewingDoc.title}`}
          size="lg"
        >
          <div className="space-y-4 text-xs text-slate-800 dark:text-slate-200">
            <div className="p-4 bg-slate-100 dark:bg-slate-800/80 rounded-xl flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 dark:text-white text-sm block">{viewingDoc.title}</span>
                <span className="text-slate-500 dark:text-slate-400">
                  {viewingDoc.lab} · {viewingDoc.date} · {viewingDoc.fileSize}
                </span>
              </div>
              <Badge variant={viewingDoc.status === 'Normal' ? 'success' : 'warning'} size="sm">
                {viewingDoc.status}
              </Badge>
            </div>

            {/* Document Preview Sheet */}
            <div className="p-6 bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 space-y-4 min-h-60 flex flex-col justify-center text-center">
              <div className="w-16 h-16 rounded-2xl bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 flex items-center justify-center mx-auto">
                <FlaskConical className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white text-sm">
                  Official Medical Laboratory Report Preview
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-1">
                  Verified pathology findings for patient {patient.name} ({patient.patientIdNumber})
                </p>
              </div>

              <div className="p-4 bg-slate-50 dark:bg-slate-900 rounded-lg text-left text-xs font-mono border border-slate-200 dark:border-slate-800 space-y-1">
                <span className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Clinician Summary Findings:</span>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed font-sans">{viewingDoc.notes}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2">
              <Button
                variant="outline"
                size="sm"
                icon={Download}
                onClick={() => showToast(`Downloading ${viewingDoc.title}.pdf`)}
              >
                Download Original PDF
              </Button>
              <Button variant="secondary" size="sm" onClick={() => setViewingDoc(null)}>
                Close Preview
              </Button>
            </div>
          </div>
        </Modal>
      )}

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
    </div>
  );
}

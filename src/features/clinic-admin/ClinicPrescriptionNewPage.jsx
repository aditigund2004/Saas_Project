import React, { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { QRCodeBadge } from '../../components/ui/QRCodeBadge';
import {
  Plus,
  Trash2,
  Printer,
  Save,
  CheckCircle2,
  AlertCircle,
  FileText,
  ShieldCheck,
  Eye,
  Edit3
} from 'lucide-react';

export function ClinicPrescriptionNewPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    activeClinic,
    activeBranch,
    patients,
    doctors,
    createPrescription,
    openPrescriptionModal,
    showToast
  } = useApp();

  const patientQueryId = searchParams.get('patient') || '';
  const preselectedPatient = patients.find((p) => p.id === patientQueryId) || patients[0];


  const clinicDoctors = doctors.filter((d) => d.clinicId === activeClinic.id);
  const currentDoctor = clinicDoctors[0] || doctors[0];

  const [selectedPatientId, setSelectedPatientId] = useState(preselectedPatient?.id || '');
  const [selectedDoctorId, setSelectedDoctorId] = useState(currentDoctor?.id || '');
  const [consultationDate, setConsultationDate] = useState('2026-10-23');
  const [diagnosis, setDiagnosis] = useState('');
  const [bp, setBp] = useState('120/80');
  const [pulse, setPulse] = useState('72');
  const [temp, setTemp] = useState('98.6');
  const [weight, setWeight] = useState('68');
  const [additionalAdvice, setAdditionalAdvice] = useState('');
  const [followUpDate, setFollowUpDate] = useState('2026-10-30');

  // Dynamic Medications list
  const [medications, setMedications] = useState([
    {
      id: 'med-row-1',
      name: 'Amoxicillin + Potassium Clavulanate (625mg)',
      dosage: '1 tablet',
      frequency: 'Twice daily (1-0-1)',
      duration: '5 days',
      route: 'Oral, after meals',
      instructions: 'Complete full antibiotic course. Take with plenty of water.'
    },
    {
      id: 'med-row-2',
      name: 'Aceclofenac 100mg + Paracetamol 325mg',
      dosage: '1 tablet',
      frequency: 'SOS as needed for pain (max twice daily)',
      duration: '3 days',
      route: 'Oral, after food',
      instructions: 'Do not take on an empty stomach.'
    }
  ]);

  const [activeTab, setActiveTab] = useState('editor'); // 'editor' | 'preview'

  const activePatient = patients.find((p) => p.id === selectedPatientId) || patients[0];

  const activeDoctor = doctors.find((d) => d.id === selectedDoctorId) || currentDoctor;

  const handleAddMedication = () => {
    setMedications([
      ...medications,
      {
        id: `med-row-${Date.now()}`,
        name: '',
        dosage: '1 tab',
        frequency: 'Twice daily (1-0-1)',
        duration: '5 days',
        route: 'Oral',
        instructions: 'After food'
      }
    ]);
  };

  const handleRemoveMedication = (id) => {
    if (medications.length <= 1) {
      showToast('Prescription must contain at least one medication row.', 'warning');
      return;
    }
    setMedications(medications.filter((m) => m.id !== id));
  };

  const handleMedicationChange = (id, field, value) => {
    setMedications(
      medications.map((m) => (m.id === id ? { ...m, [field]: value } : m))
    );
  };

  const handleSavePrescription = (andPrint = false) => {
    if (!diagnosis.trim()) {
      showToast('Please enter a clinical diagnosis or assessment.', 'warning');
      return;
    }

    const newRx = createPrescription({
      clinicId: activeClinic.id,
      branchId: activeBranch.id,
      doctorId: activeDoctor.id,
      doctorName: activeDoctor.name,
      doctorRegistration: activeDoctor.registrationNumber,
      patientId: activePatient.patientIdNumber,
      patientName: activePatient.name,
      patientAgeGender: `${activePatient.gender} · DOB: ${activePatient.dob}`,
      date: consultationDate,
      diagnosis,
      vitals: { bp, pulse, temp: `${temp}°F`, weight: `${weight} kg` },
      medications: medications.filter((m) => m.name.trim().length > 0),
      additionalInstructions: additionalAdvice,
      followUpDate,
      status: 'Active'
    });

    if (andPrint) {
      openPrescriptionModal(newRx);
    }
    navigate('/clinic/prescriptions');
  };

  return (
    <div className="space-y-6">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Link to="/clinic/prescriptions" className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
              ← Prescriptions List
            </Link>
            <span className="text-slate-300 dark:text-slate-700">•</span>
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Consultation Workspace</span>
          </div>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            Generate Digital Prescription
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">

            Official A4 medical document with structured medications and verifiable QR hash.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Switch tab buttons */}
          <div className="flex items-center rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-1 text-xs">

            <button
              type="button"
              onClick={() => setActiveTab('editor')}
              className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'editor' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-600 dark:text-slate-400'

              }`}
            >
              <Edit3 className="w-3.5 h-3.5" />
              Editor
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('preview')}
              className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 cursor-pointer ${
                activeTab === 'preview' ? 'bg-blue-600 text-white font-semibold' : 'text-slate-600 dark:text-slate-400'

              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              A4 Preview
            </button>
          </div>

          <Button
            variant="outline"
            size="sm"
            icon={Printer}
            onClick={() => handleSavePrescription(true)}
          >
            Save & Print
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={Save}
            onClick={() => handleSavePrescription(false)}
          >
            Save Prescription
          </Button>
        </div>
      </div>

      {/* Editor View */}
      {activeTab === 'editor' && (
        <div className="space-y-6">
          {/* Section 1: Patient and Doctor Details */}
          <Card className="p-6 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">

              1. Patient & Practitioner Selection
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Select Patient *</label>
                <select
                  value={selectedPatientId}
                  onChange={(e) => setSelectedPatientId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-blue-500"
                >
                  {patients.map((p) => (

                    <option key={p.id} value={p.id}>
                      {p.name} ({p.patientIdNumber})
                    </option>
                  ))}
                </select>
                {activePatient?.allergies && activePatient.allergies.length > 0 && (
                  <p className="text-[11px] text-rose-600 dark:text-rose-400 font-semibold mt-1">

                    ⚠ Allergies: {activePatient.allergies.join(', ')}
                  </p>
                )}
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Prescribing Doctor *</label>
                <select
                  value={selectedDoctorId}
                  onChange={(e) => setSelectedDoctorId(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-blue-500"

                >
                  {clinicDoctors.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} ({d.specialty})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Consultation Date</label>

                <input
                  type="date"
                  value={consultationDate}
                  onChange={(e) => setConsultationDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-blue-500"

                />
              </div>
            </div>

            {/* Vitals */}
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase mb-2">Patient Vitals</span>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                <div>
                  <label className="block text-slate-500 dark:text-slate-400 text-[10px]">Blood Pressure</label>

                  <input
                    type="text"
                    value={bp}
                    onChange={(e) => setBp(e.target.value)}
                    placeholder="120/80"
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 dark:text-slate-400 text-[10px]">Pulse (bpm)</label>

                  <input
                    type="text"
                    value={pulse}
                    onChange={(e) => setPulse(e.target.value)}
                    placeholder="72"
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 dark:text-slate-400 text-[10px]">Temperature (°F)</label>

                  <input
                    type="text"
                    value={temp}
                    onChange={(e) => setTemp(e.target.value)}
                    placeholder="98.6"
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-slate-500 dark:text-slate-400 text-[10px]">Body Weight (kg)</label>

                  <input
                    type="text"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="68"
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs"

                  />
                </div>
              </div>
            </div>
          </Card>

          {/* Section 2: Clinical Assessment */}
          <Card className="p-6 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">

              2. Clinical Assessment & Diagnosis *
            </h3>
            <textarea
              rows={2}
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
              placeholder="e.g. Acute periapical abscess #46; Severe cold sensitivity on molar..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-blue-500 font-medium"

            />
          </Card>

          {/* Section 3: Medication Rows Builder */}
          <Card className="p-6 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
                  <span className="text-lg font-serif font-bold text-blue-800 dark:text-blue-400">℞</span>
                  <span>3. Prescribed Medications & Dosages</span>
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">Add rows for drugs, strengths, administration routes, and schedules.</p>

              </div>

              <Button variant="outline" size="sm" icon={Plus} onClick={handleAddMedication}>
                Add Drug Row
              </Button>
            </div>

            <div className="space-y-3">
              {medications.map((med, index) => (
                <div
                  key={med.id}
                  className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 space-y-2 text-xs"
                >
                  <div className="flex items-center justify-between pb-1 border-b border-slate-200 dark:border-slate-800">
                    <span className="font-bold text-slate-700 dark:text-slate-200">Medication #{index + 1}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveMedication(med.id)}
                      className="text-rose-600 dark:text-rose-400 hover:text-rose-700 flex items-center gap-1 font-semibold text-[11px] cursor-pointer"

                    >
                      <Trash2 className="w-3 h-3" /> Remove
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-2">
                    <div className="sm:col-span-5">
                      <label className="block text-[10px] text-slate-500 dark:text-slate-400 font-semibold mb-0.5">Drug Name & Strength *</label>

                      <input
                        type="text"
                        value={med.name}
                        onChange={(e) => handleMedicationChange(med.id, 'name', e.target.value)}
                        placeholder="e.g. Tab Augmentin 625mg"
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 font-medium"

                      />
                    </div>

                    <div className="sm:col-span-3">
                      <label className="block text-[10px] text-slate-500 dark:text-slate-400 font-semibold mb-0.5">Dosage / Frequency</label>

                      <input
                        type="text"
                        value={med.frequency}
                        onChange={(e) => handleMedicationChange(med.id, 'frequency', e.target.value)}
                        placeholder="1-0-1 Twice Daily"
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"

                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[10px] text-slate-500 dark:text-slate-400 font-semibold mb-0.5">Duration</label>

                      <input
                        type="text"
                        value={med.duration}
                        onChange={(e) => handleMedicationChange(med.id, 'duration', e.target.value)}
                        placeholder="5 days"
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"

                      />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-[10px] text-slate-500 dark:text-slate-400 font-semibold mb-0.5">Route</label>

                      <input
                        type="text"
                        value={med.route}
                        onChange={(e) => handleMedicationChange(med.id, 'route', e.target.value)}
                        placeholder="Oral / Topical"
                        className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"

                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[10px] text-slate-500 dark:text-slate-400 font-semibold mb-0.5">Patient Instructions</label>

                    <input
                      type="text"
                      value={med.instructions}
                      onChange={(e) => handleMedicationChange(med.id, 'instructions', e.target.value)}
                      placeholder="e.g. Immediately after food; Rinse thoroughly"
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"

                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Section 4: Follow-up and Advice */}
          <Card className="p-6 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-4">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">

              4. Patient Advice & Scheduled Follow-Up
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">General Dietary Advice / Precautions</label>

                <textarea
                  rows={2}
                  value={additionalAdvice}
                  onChange={(e) => setAdditionalAdvice(e.target.value)}
                  placeholder="e.g. Warm saline rinses 3x daily; Avoid hard foods on left side..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs"

                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Review / Next Follow-Up Date</label>

                <input
                  type="date"
                  value={followUpDate}
                  onChange={(e) => setFollowUpDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs"
                />
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">

                  A front-desk follow-up task and WhatsApp reminder will be triggered on this date.
                </p>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* Preview View */}
      {activeTab === 'preview' && (
        <Card className="p-8 border-slate-300 bg-white max-w-4xl mx-auto space-y-6">
          <div className="flex items-start justify-between pb-6 border-b-2 border-blue-700">
            <div>
              <h2 className="text-xl font-bold text-slate-900">{activeClinic.name}</h2>
              <p className="text-xs text-blue-700 font-semibold">{activeClinic.tagline}</p>
              <p className="text-xs text-slate-500 mt-1">{activeBranch.address}, {activeClinic.city}</p>
              <p className="text-xs text-slate-500">Phone: {activeClinic.phone} · Reg. No: CLN-2024-MH-9912</p>
            </div>
            <div className="text-right">
              <span className="inline-block px-3 py-1 bg-blue-50 text-blue-800 text-xs font-bold uppercase rounded border border-blue-200">
                Official Prescription
              </span>
              <p className="text-xs font-mono text-slate-500 mt-1">Date: {consultationDate}</p>
              <p className="text-xs font-mono font-semibold text-slate-800">REF: RX-PREVIEW</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 py-3 border-b border-slate-200 text-xs">
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">Doctor</p>
              <p className="font-bold text-slate-900 text-sm">{activeDoctor.name}</p>
              <p className="text-slate-600 font-mono">Reg: {activeDoctor.registrationNumber}</p>
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase">Patient</p>
              <p className="font-bold text-slate-900 text-sm">{activePatient.name}</p>
              <p className="text-slate-600">ID: {activePatient.patientIdNumber} · BP: {bp} · Pulse: {pulse} bpm</p>
            </div>
          </div>

          <div className="py-2 text-xs">
            <span className="font-bold text-slate-700">Clinical Diagnosis:</span>
            <p className="font-semibold text-slate-900 mt-0.5">{diagnosis || 'None entered yet'}</p>
          </div>

          {/* Rx Medication Table */}
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-serif font-bold text-blue-800">℞</span>
              <span className="text-xs font-bold text-slate-600 uppercase">Medications</span>
            </div>

            <table className="w-full text-left text-xs border border-slate-200 rounded-lg">
              <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] font-bold border-b border-slate-200">
                <tr>
                  <th className="p-2">#</th>
                  <th className="p-2">Drug & Strength</th>
                  <th className="p-2">Dosage & Frequency</th>
                  <th className="p-2">Duration</th>
                  <th className="p-2">Instructions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {medications.map((m, i) => (
                  <tr key={m.id}>
                    <td className="p-2 font-mono text-slate-400">{i + 1}</td>
                    <td className="p-2 font-bold text-slate-900">{m.name || 'Unnamed medication'}</td>
                    <td className="p-2 text-slate-700 font-mono">{m.frequency}</td>
                    <td className="p-2 text-slate-700">{m.duration}</td>
                    <td className="p-2 text-slate-600 text-[11px]">{m.instructions}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {additionalAdvice && (
            <div className="pt-2 text-xs text-slate-700 border-t border-slate-100">
              <span className="font-bold">Advice & Precautions:</span> {additionalAdvice}
            </div>
          )}

          {/* Footer with QR Code and Signature */}
          <div className="pt-6 border-t-2 border-slate-200 flex items-end justify-between">
            <div className="flex items-center gap-4">
              <QRCodeBadge verificationId="v_sample_preview" referenceNumber="RX-PREVIEW" size={85} />
              <div className="text-[11px] text-slate-500 max-w-xs">
                <p className="font-bold text-slate-700">Verifiable Prescription</p>
                <p>Opaque cryptographic hash. No private clinical notes in QR payload.</p>
              </div>
            </div>

            <div className="text-right space-y-2">
              <div className="font-serif italic text-base text-slate-700">
                {activeDoctor.name}
              </div>
              <div className="w-40 border-b border-slate-400 ml-auto" />
              <p className="text-xs font-bold text-slate-900">{activeDoctor.name}</p>
              <p className="text-[10px] text-slate-400">Authorized Digital Medical Signature</p>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}


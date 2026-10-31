import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { FontSizeSwitcher } from '../../components/ui/FontSizeSwitcher';
import {
  User,
  Phone,
  Mail,
  ShieldAlert,
  HeartPulse,
  Save,
  AlertTriangle,
  Heart,
  ShieldCheck,
  Building2,
  FileText,
  Printer,
  CheckCircle2,
  Lock,
  Plus,
  Trash2,
  ALargeSmall
} from 'lucide-react';

const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const RELATIONSHIPS = ['Spouse', 'Parent', 'Child', 'Sibling', 'Legal Guardian', 'Partner', 'Friend', 'Caregiver'];

export function PatientProfilePage() {
  const { currentUser, patients, updatePatient, showToast } = useApp();

  const currentPatient =
    patients?.find((p) => p.name === currentUser?.name || p.id === 'pt-1041' || p.patientIdNumber === 'PT-1041') ||
    patients?.[0] || {
      id: 'pt-1041',
      name: 'Aarav Patel',
      phone: '+91 98765 43210',
      email: 'aarav.patel@example.demo',
      dob: '1992-06-14',
      gender: 'Male',
      bloodGroup: 'B+',
      allergies: ['Penicillin', 'Sulfa drugs'],
      address: '402 Sunrise Heights, Bandra West, Mumbai',
      emergencyContact: 'Sunita Patel (Spouse) - +91 98765 43219',
      emergencyContactDetails: {
        name: 'Sunita Patel',
        relationship: 'Spouse',
        phone: '+91 98765 43219',
        alternatePhone: '+91 98765 43220',
        email: 'sunita.patel@example.demo',
        address: '402 Sunrise Heights, Bandra West, Mumbai',
        isAuthorizedToMakeDecisions: true
      },
      emergencyMedicalDetails: {
        bloodGroup: 'B+',
        allergies: ['Penicillin', 'Sulfa drugs'],
        chronicConditions: ['Mild Hypertension'],
        currentMedications: ['Telmisartan 20mg (Morning OD)', 'Multivitamin'],
        organDonor: true,
        primaryHospital: 'Lilavati Hospital & Research Centre, Bandra West',
        insuranceProvider: 'Star Health & Allied Insurance',
        policyNumber: 'SH-POL-2024-88910',
        specialInstructions: 'Allergic to penicillin class antibiotics; substitute with Macrolides or Clindamycin in emergency.'
      }
    };

  const contactData = currentPatient.emergencyContactDetails || {
    name: 'Sunita Patel',
    relationship: 'Spouse',
    phone: '+91 98765 43219',
    alternatePhone: '+91 98765 43220',
    email: 'sunita.patel@example.demo',
    address: currentPatient.address || '402 Sunrise Heights, Bandra West, Mumbai',
    isAuthorizedToMakeDecisions: true
  };

  const medicalData = currentPatient.emergencyMedicalDetails || {
    bloodGroup: currentPatient.bloodGroup || 'B+',
    allergies: currentPatient.allergies || ['Penicillin', 'Sulfa drugs'],
    chronicConditions: ['Mild Hypertension'],
    currentMedications: ['Telmisartan 20mg (Morning OD)'],
    organDonor: true,
    primaryHospital: 'Lilavati Hospital & Research Centre, Bandra West',
    insuranceProvider: 'Star Health & Allied Insurance',
    policyNumber: 'SH-POL-2024-88910',
    specialInstructions: 'Allergic to penicillin class antibiotics; substitute with Macrolides or Clindamycin.'
  };

  const [form, setForm] = useState({
    name: currentPatient.name || 'Aarav Patel',
    phone: currentPatient.phone || '+91 98765 43210',
    email: currentPatient.email || 'aarav.patel@example.demo',
    dob: currentPatient.dob || '1992-06-14',
    gender: currentPatient.gender || 'Male',
    address: currentPatient.address || '402 Sunrise Heights, Bandra West, Mumbai',

    // Emergency Contact Fields
    emergencyContactName: contactData.name || '',
    emergencyRelationship: contactData.relationship || 'Spouse',
    emergencyPhone: contactData.phone || '',
    emergencyAltPhone: contactData.alternatePhone || '',
    emergencyEmail: contactData.email || '',
    isAuthorizedToMakeDecisions: contactData.isAuthorizedToMakeDecisions ?? true,

    // Emergency Medical Details Fields
    bloodGroup: medicalData.bloodGroup || currentPatient.bloodGroup || 'B+',
    allergies: Array.isArray(medicalData.allergies) ? medicalData.allergies.join(', ') : (currentPatient.allergies?.join(', ') || 'Penicillin, Sulfa drugs'),
    chronicConditions: Array.isArray(medicalData.chronicConditions) ? medicalData.chronicConditions.join(', ') : 'Mild Hypertension',
    currentMedications: Array.isArray(medicalData.currentMedications) ? medicalData.currentMedications.join(', ') : 'Telmisartan 20mg (Morning OD)',
    organDonor: medicalData.organDonor ?? true,
    primaryHospital: medicalData.primaryHospital || 'Lilavati Hospital & Research Centre, Bandra West',
    insuranceProvider: medicalData.insuranceProvider || 'Star Health & Allied Insurance',
    policyNumber: medicalData.policyNumber || 'SH-POL-2024-88910',
    specialInstructions: medicalData.specialInstructions || 'Allergic to penicillin class antibiotics; substitute with Macrolides or Clindamycin.'
  });

  const handleSave = (e) => {
    e.preventDefault();

    const allergiesArray = form.allergies
      .split(',')
      .map((a) => a.trim())
      .filter(Boolean);

    const conditionsArray = form.chronicConditions
      .split(',')
      .map((c) => c.trim())
      .filter(Boolean);

    const medicationsArray = form.currentMedications
      .split(',')
      .map((m) => m.trim())
      .filter(Boolean);

    const updatedEmergencyContact = `${form.emergencyContactName} (${form.emergencyRelationship}) - ${form.emergencyPhone}`;

    const updatedPatientData = {
      name: form.name,
      phone: form.phone,
      email: form.email,
      dob: form.dob,
      gender: form.gender,
      address: form.address,
      bloodGroup: form.bloodGroup,
      allergies: allergiesArray,
      emergencyContact: updatedEmergencyContact,
      emergencyContactDetails: {
        name: form.emergencyContactName,
        relationship: form.emergencyRelationship,
        phone: form.emergencyPhone,
        alternatePhone: form.emergencyAltPhone,
        email: form.emergencyEmail,
        address: form.address,
        isAuthorizedToMakeDecisions: form.isAuthorizedToMakeDecisions
      },
      emergencyMedicalDetails: {
        bloodGroup: form.bloodGroup,
        allergies: allergiesArray,
        chronicConditions: conditionsArray,
        currentMedications: medicationsArray,
        organDonor: form.organDonor,
        primaryHospital: form.primaryHospital,
        insuranceProvider: form.insuranceProvider,
        policyNumber: form.policyNumber,
        specialInstructions: form.specialInstructions
      }
    };

    if (updatePatient) {
      updatePatient(currentPatient.id, updatedPatientData);
    } else {
      showToast('Emergency contact and profile details updated successfully!');
    }
  };

  const handlePrintCard = () => {
    window.print();
  };

  return (
    <div className="max-w-5xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-2.5 py-0.5 rounded-full border border-rose-200 dark:border-rose-900/60 uppercase tracking-wide">
              Critical Care Readiness
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Patient Emergency Contact & Health Details
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Emergency contact designation, life-saving biometric flags, and verified digital medical alert card.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          icon={Printer}
          onClick={handlePrintCard}
          className="font-semibold text-xs no-print"
        >
          Print Emergency Card
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Form: Personal, Emergency Contact & Medical Details */}
        <div className="lg:col-span-8 space-y-6">
          <form onSubmit={handleSave} className="space-y-6">
            {/* Section 1: Emergency Contact Designation */}
            <Card className="border-rose-200 dark:border-rose-900/60 dark:bg-slate-900 shadow-sm overflow-hidden">
              <div className="p-4 sm:p-5 bg-rose-50/70 dark:bg-rose-950/30 border-b border-rose-100 dark:border-rose-900/40 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300 flex items-center justify-center font-bold">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900 dark:text-white">
                      Primary Emergency Contact
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Authorized individual reached by EMS or triage staff in an urgent scenario
                    </p>
                  </div>
                </div>
                <Badge variant="danger" size="sm">SOS Contact</Badge>
              </div>

              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Contact Full Name *
                    </label>
                    <input
                      required
                      type="text"
                      value={form.emergencyContactName}
                      onChange={(e) => setForm({ ...form, emergencyContactName: e.target.value })}
                      placeholder="e.g. Sunita Patel"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 text-xs focus:ring-2 focus:ring-rose-500 font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Relationship *
                    </label>
                    <select
                      value={form.emergencyRelationship}
                      onChange={(e) => setForm({ ...form, emergencyRelationship: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 text-xs focus:ring-2 focus:ring-rose-500 font-semibold"
                    >
                      {RELATIONSHIPS.map((rel) => (
                        <option key={rel} value={rel}>{rel}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Primary Emergency Phone *
                    </label>
                    <input
                      required
                      type="tel"
                      value={form.emergencyPhone}
                      onChange={(e) => setForm({ ...form, emergencyPhone: e.target.value })}
                      placeholder="+91 98765 43219"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 text-xs focus:ring-2 focus:ring-rose-500 font-mono font-bold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Secondary / Alternate Phone
                    </label>
                    <input
                      type="tel"
                      value={form.emergencyAltPhone}
                      onChange={(e) => setForm({ ...form, emergencyAltPhone: e.target.value })}
                      placeholder="+91 98765 43220 (Optional)"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 text-xs focus:ring-2 focus:ring-rose-500 font-mono"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <label className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.isAuthorizedToMakeDecisions}
                      onChange={(e) => setForm({ ...form, isAuthorizedToMakeDecisions: e.target.checked })}
                      className="mt-0.5 rounded text-rose-600 focus:ring-rose-500"
                    />
                    <div className="text-xs">
                      <span className="font-bold text-slate-800 dark:text-slate-200 block">
                        Medical Proxy Authorization
                      </span>
                      <span className="text-slate-500 dark:text-slate-400">
                        Designate this contact to make clinical decisions and consent to emergency treatment if I am incapacitated.
                      </span>
                    </div>
                  </label>
                </div>
              </CardContent>
            </Card>

            {/* Section 2: Emergency Medical & Life-Saving Details */}
            <Card className="border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm overflow-hidden">
              <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-300 flex items-center justify-center font-bold">
                    <HeartPulse className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900 dark:text-white">
                      Critical Emergency Medical Details
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Blood compatibility, severe allergies, baseline chronic ailments, and hospital preference
                    </p>
                  </div>
                </div>
              </div>

              <CardContent className="space-y-4 text-xs">
                {/* Blood Group Picker */}
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Blood Group *
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {BLOOD_GROUPS.map((bg) => (
                      <button
                        key={bg}
                        type="button"
                        onClick={() => setForm({ ...form, bloodGroup: bg })}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                          form.bloodGroup === bg
                            ? 'bg-rose-600 text-white shadow-sm ring-2 ring-rose-500/20'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                        }`}
                      >
                        {bg}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Allergies Warning */}
                <div>
                  <label className="block font-bold text-rose-700 dark:text-rose-400 mb-1 flex items-center gap-1.5">
                    <AlertTriangle className="w-3.5 h-3.5" />
                    Documented Drug & Substance Allergies (Comma separated) *
                  </label>
                  <input
                    type="text"
                    value={form.allergies}
                    onChange={(e) => setForm({ ...form, allergies: e.target.value })}
                    placeholder="e.g. Penicillin, Sulfa drugs, Latex"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-rose-300 dark:border-rose-900/60 bg-rose-50/40 dark:bg-rose-950/20 text-rose-900 dark:text-rose-200 font-semibold text-xs focus:ring-2 focus:ring-rose-500"
                  />
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-1">
                    Emergency triage will immediately cross-verify prescriptions against this list.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Chronic Medical Conditions
                    </label>
                    <input
                      type="text"
                      value={form.chronicConditions}
                      onChange={(e) => setForm({ ...form, chronicConditions: e.target.value })}
                      placeholder="e.g. Hypertension, Asthma, Type 2 Diabetes"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 text-xs focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Current Regular Medications
                    </label>
                    <input
                      type="text"
                      value={form.currentMedications}
                      onChange={(e) => setForm({ ...form, currentMedications: e.target.value })}
                      placeholder="e.g. Telmisartan 20mg, Inhaler PRN"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 text-xs focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Preferred Emergency Hospital / Trauma Facility
                    </label>
                    <input
                      type="text"
                      value={form.primaryHospital}
                      onChange={(e) => setForm({ ...form, primaryHospital: e.target.value })}
                      placeholder="e.g. Lilavati Hospital & Research Centre"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 text-xs focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Health Insurance / TPA Policy Number
                    </label>
                    <input
                      type="text"
                      value={form.policyNumber}
                      onChange={(e) => setForm({ ...form, policyNumber: e.target.value })}
                      placeholder="e.g. SH-POL-2024-88910"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 text-xs font-mono focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Emergency Clinical Directives & Precautions
                  </label>
                  <textarea
                    rows={2}
                    value={form.specialInstructions}
                    onChange={(e) => setForm({ ...form, specialInstructions: e.target.value })}
                    placeholder="Specific clinical guidance for paramedics or emergency doctors (e.g. penicillin allergy precautions, pacemaker present, advance directives)"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 text-xs focus:ring-2 focus:ring-blue-500 leading-relaxed"
                  />
                </div>

                <div className="pt-1 flex items-center justify-between border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-700 dark:text-slate-300">Registered Organ Donor:</span>
                    <Badge variant={form.organDonor ? 'success' : 'default'} size="sm">
                      {form.organDonor ? 'Yes (Registered Donor)' : 'No'}
                    </Badge>
                  </div>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, organDonor: !form.organDonor })}
                    className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                  >
                    Toggle Status
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Section 3: Personal Demographics & Contact */}
            <Card className="border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm overflow-hidden">
              <CardHeader
                title="Personal Identity & Demographics"
                subtitle="Your legal identification profile used for billing and digital prescriptions"
              />
              <CardContent className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Full Legal Name
                    </label>
                    <input
                      required
                      type="text"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 text-xs focus:ring-2 focus:ring-blue-500 font-semibold"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Mobile / WhatsApp Number
                    </label>
                    <input
                      required
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 text-xs font-mono font-semibold focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 text-xs focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      value={form.dob}
                      onChange={(e) => setForm({ ...form, dob: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 text-xs font-mono focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                    Permanent Residential Address
                  </label>
                  <input
                    type="text"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 text-xs focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Display & Text Legibility Preference */}
            <Card className="border-slate-200 dark:border-slate-800 shadow-xs">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold">
                    <ALargeSmall className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-base font-bold text-slate-900 dark:text-white">
                      Display, Text Size & Legibility
                    </h2>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Customize how content, appointments, and prescriptions are rendered on your screen.
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <span className="block text-xs font-bold text-slate-700 dark:text-slate-300">
                      Reading Text Size
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      Select Small (15px), Medium (17px - Standard), or Large (19.5px - High Readability).
                    </span>
                  </div>
                  <FontSizeSwitcher variant="segmented" />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end gap-3 pt-2">
              <Button
                variant="primary"
                size="md"
                type="submit"
                icon={Save}
                className="font-bold shadow-md shadow-blue-500/20 px-6"
              >
                Save Emergency & Profile Details
              </Button>
            </div>
          </form>
        </div>

        {/* Right Column: Live SOS Digital Medical ID Card Preview */}
        <div className="lg:col-span-4 space-y-4">
          <div className="sticky top-6 space-y-4">
            <h2 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              Emergency Medical ID Card (Preview)
            </h2>

            {/* Physical Medical ID Card Representation */}
            <div className="p-5 rounded-2xl bg-linear-to-br from-slate-900 to-slate-800 text-white shadow-xl border border-slate-700 space-y-4 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-rose-600/10 rounded-full blur-2xl pointer-events-none" />

              {/* Card Header */}
              <div className="flex items-start justify-between border-b border-slate-700/80 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-rose-600 flex items-center justify-center font-black text-xs text-white shadow-sm">
                    SOS
                  </div>
                  <div>
                    <h3 className="font-black text-sm tracking-tight leading-none text-white">EMERGENCY MEDICAL ID</h3>
                    <span className="text-[10px] text-slate-400 font-mono">ID: {currentPatient.patientIdNumber || 'PT-1041'}</span>
                  </div>
                </div>

                <div className="px-2.5 py-1 rounded-lg bg-rose-500/20 border border-rose-500/40 text-rose-300 font-black text-xs tabular-nums">
                  {form.bloodGroup}
                </div>
              </div>

              {/* Patient Name */}
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Patient Name</span>
                <span className="text-base font-black text-white block mt-0.5">{form.name}</span>
                <span className="text-xs text-slate-300 font-mono">{form.phone}</span>
              </div>

              {/* Emergency Contact */}
              <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700 text-xs space-y-1">
                <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block">
                  Primary Emergency Contact
                </span>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">{form.emergencyContactName || 'None Listed'}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-700 text-slate-300 font-semibold">
                    {form.emergencyRelationship}
                  </span>
                </div>
                <a
                  href={`tel:${form.emergencyPhone}`}
                  className="inline-flex items-center gap-1 font-mono text-emerald-400 font-bold text-xs hover:underline mt-0.5"
                >
                  <Phone className="w-3 h-3" /> {form.emergencyPhone || '—'}
                </a>
              </div>

              {/* Critical Flags */}
              <div className="space-y-2 text-xs">
                {form.allergies && (
                  <div>
                    <span className="text-[10px] uppercase font-bold text-rose-400 block tracking-wider">Allergies Warning</span>
                    <p className="text-xs font-semibold text-rose-200 mt-0.5">{form.allergies}</p>
                  </div>
                )}

                {form.chronicConditions && (
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Conditions</span>
                    <p className="text-xs text-slate-300 mt-0.5">{form.chronicConditions}</p>
                  </div>
                )}

                {form.primaryHospital && (
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Emergency Facility</span>
                    <p className="text-xs text-slate-300 mt-0.5 truncate">{form.primaryHospital}</p>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="pt-2 border-t border-slate-700/80 flex items-center justify-between text-[10px] text-slate-400">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Clinipulse Verified
                </span>
                <span>Organ Donor: {form.organDonor ? 'YES' : 'NO'}</span>
              </div>
            </div>

            {/* Quick Card Features Helper */}
            <div className="p-4 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-xs text-blue-950 dark:text-blue-200 space-y-1.5">
              <div className="flex items-center gap-2 font-bold">
                <Lock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Paramedic & Hospital Accessibility</span>
              </div>
              <p className="text-blue-800 dark:text-blue-300 leading-relaxed text-[11px]">
                Your emergency contact and blood group are synced across attending doctors and hospital triage desks for rapid verification during an acute medical event.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

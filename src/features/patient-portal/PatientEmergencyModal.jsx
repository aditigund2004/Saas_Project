import React from 'react';
import { Link } from 'react-router-dom';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
  Phone,
  ShieldAlert,
  AlertTriangle,
  Heart,
  ShieldCheck,
  Building2,
  Printer,
  Edit,
  ExternalLink
} from 'lucide-react';

export function PatientEmergencyModal({ isOpen, onClose, patient }) {
  if (!patient) return null;

  const contact = patient.emergencyContactDetails || {
    name: patient.emergencyContact?.split(' - ')[0] || 'Sunita Patel (Spouse)',
    relationship: 'Spouse',
    phone: '+91 98765 43219',
    alternatePhone: '+91 98765 43220',
    email: 'sunita.patel@example.demo',
    isAuthorizedToMakeDecisions: true
  };

  const medical = patient.emergencyMedicalDetails || {
    bloodGroup: patient.bloodGroup || 'B+',
    allergies: patient.allergies || ['Penicillin', 'Sulfa drugs'],
    chronicConditions: ['Mild Hypertension'],
    currentMedications: ['Telmisartan 20mg (Morning OD)'],
    organDonor: true,
    primaryHospital: 'Lilavati Hospital & Research Centre, Bandra West',
    insuranceProvider: 'Star Health & Allied Insurance',
    policyNumber: 'SH-POL-2024-88910',
    specialInstructions: 'Allergic to penicillin class antibiotics; substitute with Macrolides or Clindamycin in emergency.'
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Patient Emergency Medical ID & SOS Dossier"
      size="md"
    >
      <div className="space-y-4 text-xs">
        {/* Physical SOS Card Layout */}
        <div className="p-5 rounded-2xl bg-linear-to-br from-slate-900 to-slate-800 text-white shadow-xl border border-slate-700 space-y-3.5 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-28 h-28 bg-rose-600/15 rounded-full blur-2xl pointer-events-none" />

          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-700/80 pb-2.5">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md bg-rose-600 text-white font-black text-xs">
                SOS
              </span>
              <div>
                <span className="font-black text-xs uppercase tracking-wider text-white block">Emergency Medical ID</span>
                <span className="text-[10px] text-slate-400 font-mono">ID: {patient.patientIdNumber || 'PT-1041'}</span>
              </div>
            </div>

            <div className="px-2.5 py-1 rounded-lg bg-rose-500/20 border border-rose-500/40 text-rose-300 font-black text-xs tabular-nums">
              {medical.bloodGroup || patient.bloodGroup || 'B+'}
            </div>
          </div>

          {/* Patient Details */}
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 block tracking-wider">Patient Name</span>
            <span className="text-base font-black text-white block mt-0.5">{patient.name}</span>
            <span className="text-xs text-slate-300 font-mono">{patient.phone}</span>
          </div>

          {/* Emergency Contact */}
          <div className="p-3 rounded-xl bg-slate-800/90 border border-slate-700 space-y-1.5">
            <span className="text-[10px] font-bold text-rose-400 uppercase tracking-wider block">
              Designated Emergency Contact
            </span>
            <div className="flex items-center justify-between">
              <span className="font-bold text-white text-sm">{contact.name}</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-700 text-slate-300 font-semibold">
                {contact.relationship}
              </span>
            </div>

            <div className="pt-1 flex items-center justify-between">
              <a
                href={`tel:${contact.phone}`}
                className="inline-flex items-center gap-1.5 font-mono text-emerald-400 font-bold text-xs hover:underline"
              >
                <Phone className="w-3.5 h-3.5" /> {contact.phone}
              </a>
              {contact.alternatePhone && (
                <span className="text-[11px] text-slate-400 font-mono">Alt: {contact.alternatePhone}</span>
              )}
            </div>
          </div>

          {/* Allergies Warning */}
          {medical.allergies && medical.allergies.length > 0 && (
            <div className="space-y-1">
              <span className="text-[10px] uppercase font-bold text-rose-400 block tracking-wider">
                Critical Drug Allergies
              </span>
              <div className="flex flex-wrap gap-1">
                {(Array.isArray(medical.allergies) ? medical.allergies : [medical.allergies]).map((all) => (
                  <span
                    key={all}
                    className="px-2 py-0.5 rounded-full bg-rose-900/60 border border-rose-700 text-rose-200 font-bold text-[10px]"
                  >
                    {all}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Emergency Instructions */}
          {medical.specialInstructions && (
            <div className="p-2.5 rounded-xl bg-slate-800/60 border border-slate-700 text-[11px] text-slate-300 space-y-0.5">
              <span className="font-bold text-amber-300 block">Emergency Directive:</span>
              <p className="leading-relaxed">{medical.specialInstructions}</p>
            </div>
          )}

          {/* Card Footer */}
          <div className="pt-2 border-t border-slate-700/80 flex items-center justify-between text-[10px] text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              Verified Digital Healthcare Profile
            </span>
            <span>Organ Donor: {medical.organDonor ? 'YES' : 'NO'}</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
          <Link
            to="/patient/profile"
            onClick={onClose}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            <Edit className="w-3.5 h-3.5" />
            Edit Emergency Contact & Details
          </Link>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" icon={Printer} onClick={handlePrint}>
              Print Card
            </Button>
            <Button variant="secondary" size="sm" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}


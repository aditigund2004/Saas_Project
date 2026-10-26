import React from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { QRCodeBadge } from '../ui/QRCodeBadge';
import { Printer, Download, ExternalLink, ShieldCheck, FileCheck, Stethoscope } from 'lucide-react';
import { Link } from 'react-router-dom';

export function PrescriptionModal() {
  const { prescriptionModal, closePrescriptionModal, showToast, activeClinic } = useApp();

  if (!prescriptionModal.isOpen || !prescriptionModal.prescription) return null;

  const rx = prescriptionModal.prescription;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = () => {
    showToast(`Downloading prescription document: ${rx.prescriptionNumber}.pdf`);
  };

  return (
    <Modal isOpen={prescriptionModal.isOpen} onClose={closePrescriptionModal} title="Digital Prescription Document" size="xl">
      <div className="space-y-4">
        {/* Actions bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200 no-print">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-[#15803D] border border-blue-200">
              Ref: {rx.prescriptionNumber}
            </span>
            <span className="text-xs text-slate-500 font-mono">ID: {rx.verificationId}</span>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" icon={Printer} onClick={handlePrint}>
              Print A4
            </Button>
            <Button variant="primary" size="sm" icon={Download} onClick={handleDownloadPdf}>
              Download PDF
            </Button>
          </div>
        </div>

        {/* Printable Prescription Document Area */}
        <div className="prescription-paper bg-white p-6 sm:p-8 rounded-2xl border border-slate-300 shadow-sm text-slate-900 font-sans">
          {/* Header */}
          <div className="flex items-start justify-between pb-6 border-b-2 border-[#15803D]">
            <div>
              <h2 className="text-xl font-bold tracking-tight text-slate-900">{activeClinic.name}</h2>
              <p className="text-xs font-medium text-[#15803D]">{activeClinic.tagline}</p>
              <p className="text-xs text-slate-500 mt-1 max-w-md">{activeClinic.address}, {activeClinic.city}</p>
              <p className="text-xs text-slate-500">Phone: {activeClinic.phone} · Reg. No: CLN-2024-MH-9912</p>
            </div>
            <div className="text-right">
              <span className="inline-block px-3 py-1 bg-[#F0FDF4] text-[#166534] text-xs font-bold uppercase tracking-wider rounded border border-[#DCFCE7]">
                Official Prescription
              </span>
              <p className="text-xs font-mono text-slate-500 mt-1">Date: {rx.date}</p>
              <p className="text-xs font-mono font-semibold text-slate-700">{rx.prescriptionNumber}</p>
            </div>
          </div>

          {/* Doctor & Patient Info Bar */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4 border-b border-slate-200 text-xs">
            <div className="space-y-1">
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Consulting Practitioner</p>
              <p className="text-sm font-bold text-slate-900">{rx.doctorName}</p>
              <p className="text-slate-600">Reg. Council No: <span className="font-mono">{rx.doctorRegistration || 'MDC-2012-08819'}</span></p>
              <p className="text-slate-500">{activeClinic.specialty} Department</p>
            </div>
            <div className="space-y-1 md:border-l md:border-slate-200 md:pl-4">
              <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">Patient Identification</p>
              <p className="text-sm font-bold text-slate-900">{rx.patientName}</p>
              <p className="text-slate-600">Age / Gender: {rx.patientAgeGender || 'Adult'} · ID: <span className="font-mono">{rx.patientId}</span></p>
              {rx.vitals && (
                <p className="text-[11px] text-slate-500 font-mono">
                  BP: {rx.vitals.bp || '120/80'} | Pulse: {rx.vitals.pulse || '74'} | Temp: {rx.vitals.temp || '98.6°F'}
                </p>
              )}
            </div>
          </div>

          {/* Clinical Assessment */}
          <div className="py-4 border-b border-slate-200 text-xs">
            <span className="font-semibold text-slate-700 uppercase tracking-wider text-[11px]">Clinical Assessment / Diagnosis:</span>
            <p className="mt-1 text-sm font-semibold text-slate-900">{rx.diagnosis || 'Clinical evaluation completed.'}</p>
          </div>

          {/* Prescription Symbol & Medication Table */}
          <div className="py-4 space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-serif font-bold text-blue-800">℞</span>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Prescribed Medications</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-slate-200 rounded-lg overflow-hidden">
                <thead className="bg-slate-50 text-slate-700 uppercase text-[10px] font-semibold border-b border-slate-200">
                  <tr>
                    <th className="p-2.5">#</th>
                    <th className="p-2.5">Medication & Strength</th>
                    <th className="p-2.5">Dosage / Frequency</th>
                    <th className="p-2.5">Duration</th>
                    <th className="p-2.5">Instructions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {rx.medications?.map((med, idx) => (
                    <tr key={med.id || idx} className="hover:bg-slate-50/50">
                      <td className="p-2.5 text-slate-400 font-mono">{idx + 1}</td>
                      <td className="p-2.5 font-semibold text-slate-900">{med.name}</td>
                      <td className="p-2.5 text-slate-700 font-mono">{med.dosage} ({med.frequency})</td>
                      <td className="p-2.5 text-slate-700 font-medium">{med.duration}</td>
                      <td className="p-2.5 text-slate-600 text-[11px]">{med.instructions}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Advice & Instructions */}
          {rx.additionalInstructions && (
            <div className="py-3 border-t border-slate-200 text-xs space-y-1">
              <p className="font-semibold text-slate-700">General Advice & Dietary Precautions:</p>
              <p className="text-slate-600 leading-relaxed">{rx.additionalInstructions}</p>
            </div>
          )}

          {/* Footer with Signature and QR Code */}
          <div className="pt-6 mt-4 border-t-2 border-slate-200 flex flex-col sm:flex-row items-end justify-between gap-6">
            <div className="flex items-center gap-4">
              <QRCodeBadge
                verificationId={rx.verificationId}
                referenceNumber={rx.prescriptionNumber}
                size={95}
                showLink={false}
              />
              <div className="text-[11px] text-slate-500 max-w-xs space-y-1">
                <p className="font-semibold text-slate-700">Digital Authenticity Verification</p>
                <p>Scan this QR code with any mobile camera to verify prescription validity on the official portal.</p>
                <Link
                  to={`/verify-prescription/${rx.verificationId}`}
                  target="_blank"
                  className="inline-flex items-center gap-1 text-blue-600 hover:text-[#15803D] font-medium text-xs no-print"
                >
                  Verify Portal Link <ExternalLink className="w-3 h-3" />
                </Link>
              </div>
            </div>

            <div className="text-right space-y-2">
              <div className="font-serif italic text-base text-slate-700 tracking-wider">
                Dr. Arvind Rao
              </div>
              <div className="w-44 border-b border-slate-400 ml-auto" />
              <p className="text-xs font-semibold text-slate-900">{rx.doctorName}</p>
              <p className="text-[11px] text-slate-500">Authorized Digital Medical Signature</p>
              {rx.followUpDate && (
                <p className="text-[11px] font-semibold text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 inline-block">
                  Next Follow-Up: {rx.followUpDate}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Footer info note */}
        <div className="text-center text-xs text-slate-400 no-print">
          Prescription document rendered in accordance with digital healthcare standards. No patient credentials or confidential notes are exposed in public verification QR hashes.
        </div>
      </div>
    </Modal>
  );
}


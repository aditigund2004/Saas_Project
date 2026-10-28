import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { QRCodeBadge } from '../../components/ui/QRCodeBadge';
import { Printer, Download, ExternalLink, ArrowRight } from 'lucide-react';

export function ClinicPrescriptionDetailPage() {
  const { prescriptionId } = useParams();
  const { prescriptions, activeClinic, showToast } = useApp();

  const rx = prescriptions.find((p) => p.id === prescriptionId || p.prescriptionNumber === prescriptionId) || prescriptions[0];

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    showToast(`Downloading prescription PDF: ${rx.prescriptionNumber}.pdf`);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Actions header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print">
        <div>
<<<<<<< HEAD
          <Link to="/clinic/prescriptions" className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
            ← Back to Prescriptions
          </Link>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
            Prescription #{rx.prescriptionNumber}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">Issued on {rx.date} for {rx.patientName}</p>
=======
          <Link to="/clinic/prescriptions" className="text-xs text-blue-600 hover:underline">
            ← Back to Prescriptions
          </Link>
          <h1 className="text-2xl font-extrabold text-slate-900 mt-1">
            Prescription #{rx.prescriptionNumber}
          </h1>
          <p className="text-xs text-slate-500">Issued on {rx.date} for {rx.patientName}</p>
>>>>>>> origin/main
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" icon={Printer} onClick={handlePrint}>
            Print A4 Document
          </Button>
          <Button variant="primary" size="sm" icon={Download} onClick={handleDownload}>
            Download PDF
          </Button>
        </div>
      </div>

      {/* Printable Paper Document */}
      <Card className="prescription-paper p-8 sm:p-10 border-slate-300 bg-white space-y-6 shadow-sm">
        <div className="flex items-start justify-between pb-6 border-b-2 border-blue-700">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">{activeClinic.name}</h2>
            <p className="text-xs text-blue-700 font-semibold">{activeClinic.tagline}</p>
            <p className="text-xs text-slate-500 mt-1">{activeClinic.address}, {activeClinic.city}</p>
            <p className="text-xs text-slate-500">Phone: {activeClinic.phone} · Reg: CLN-2024-MH-9912</p>
          </div>
          <div className="text-right">
            <span className="inline-block px-3 py-1 bg-blue-50 text-blue-800 text-xs font-bold uppercase rounded border border-blue-200">
              Official Prescription
            </span>
            <p className="text-xs font-mono text-slate-500 mt-1">Date: {rx.date}</p>
            <p className="text-xs font-mono font-semibold text-slate-800">{rx.prescriptionNumber}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 py-3 border-b border-slate-200 text-xs">
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Consulting Practitioner</p>
            <p className="font-bold text-slate-900 text-sm">{rx.doctorName}</p>
            <p className="text-slate-600 font-mono">Reg. No: {rx.doctorRegistration}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Patient Information</p>
            <p className="font-bold text-slate-900 text-sm">{rx.patientName}</p>
            <p className="text-slate-600">ID: {rx.patientId} · {rx.patientAgeGender}</p>
            {rx.vitals && (
              <p className="text-[11px] text-slate-500 font-mono">
                BP: {rx.vitals.bp || '120/80'} | Pulse: {rx.vitals.pulse || '72'} | Temp: {rx.vitals.temp || '98.6°F'}
              </p>
            )}
          </div>
        </div>

        <div className="py-2 text-xs">
          <span className="font-bold text-slate-700">Clinical Diagnosis:</span>
          <p className="font-semibold text-slate-900 mt-0.5">{rx.diagnosis}</p>
        </div>

        {/* Rx Medication Table */}
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-2xl font-serif font-bold text-blue-800">℞</span>
            <span className="text-xs font-bold text-slate-600 uppercase">Prescribed Medications</span>
          </div>

          <table className="w-full text-left text-xs border border-slate-200 rounded-lg">
            <thead className="bg-slate-50 text-slate-600 uppercase text-[10px] font-bold border-b border-slate-200">
              <tr>
                <th className="p-2.5">#</th>
                <th className="p-2.5">Medication & Strength</th>
                <th className="p-2.5">Dosage / Frequency</th>
                <th className="p-2.5">Duration</th>
                <th className="p-2.5">Instructions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rx.medications?.map((m, i) => (
                <tr key={m.id || i}>
                  <td className="p-2.5 font-mono text-slate-400">{i + 1}</td>
                  <td className="p-2.5 font-bold text-slate-900">{m.name}</td>
                  <td className="p-2.5 text-slate-700 font-mono">{m.dosage} ({m.frequency})</td>
                  <td className="p-2.5 text-slate-700">{m.duration}</td>
                  <td className="p-2.5 text-slate-600 text-[11px]">{m.instructions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {rx.additionalInstructions && (
          <div className="pt-2 text-xs text-slate-700 border-t border-slate-100">
            <span className="font-bold">Advice & Precautions:</span> {rx.additionalInstructions}
          </div>
        )}

        {/* Footer with QR Code and Signature */}
        <div className="pt-6 border-t-2 border-slate-200 flex items-end justify-between">
          <div className="flex items-center gap-4">
            <QRCodeBadge verificationId={rx.verificationId} referenceNumber={rx.prescriptionNumber} size={90} />
            <div className="text-[11px] text-slate-500 max-w-xs">
              <p className="font-bold text-slate-700">Scan to Verify Authenticity</p>
              <p>Pharmacies may scan this QR code or visit the public verification portal.</p>
              <Link to={`/verify-prescription/${rx.verificationId}`} target="_blank" className="text-blue-600 font-semibold hover:underline inline-flex items-center gap-1 mt-1 no-print">
                Verification Portal <ExternalLink className="w-3 h-3" />
              </Link>
            </div>
          </div>

          <div className="text-right space-y-2">
            <div className="font-serif italic text-base text-slate-700">
              {rx.doctorName}
            </div>
            <div className="w-40 border-b border-slate-400 ml-auto" />
            <p className="text-xs font-bold text-slate-900">{rx.doctorName}</p>
            <p className="text-[10px] text-slate-400">Authorized Digital Medical Signature</p>
            {rx.followUpDate && (
              <p className="text-[11px] font-semibold text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 inline-block">
                Next Follow-Up: {rx.followUpDate}
              </p>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}


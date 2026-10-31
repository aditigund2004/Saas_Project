import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
  Award,
  FileText,
  Printer,
  Download,
  CheckCircle2,
  Calendar,
  User,
  Building2,
  Stethoscope,
  QrCode,
  ShieldCheck,
  PlusCircle,
  Clock
} from 'lucide-react';

export function CertificatesPage() {
  const { activeClinic, currentUser, patients = [], showToast } = useApp();

  const [certificateType, setCertificateType] = useState('Medical Fitness Certificate');
  const [patientName, setPatientName] = useState(patients[0]?.name || 'Rahul Sharma');
  const [patientAge, setPatientAge] = useState('32');
  const [patientGender, setPatientGender] = useState('Male');
  const [diagnosis, setDiagnosis] = useState('Acute upper respiratory infection, recovered');
  const [restDays, setRestDays] = useState('3');
  const [issueDate, setIssueDate] = useState('2026-10-27');
  const [certId, setCertId] = useState(`CERT-${Date.now().toString().slice(-6)}`);

  const doctorName = currentUser?.name || 'Dr. Siddharth Sen, MD';
  const clinicName = activeClinic?.name || 'CityCare Family Clinic';

  const handlePrint = () => {
    window.print();
    showToast('Certificate sent to system print dialog.', 'info');
  };

  const handleGenerateNew = () => {
    const newId = `CERT-${Date.now().toString().slice(-6)}`;
    setCertId(newId);
    showToast(`Generated new certificate token: ${newId}`, 'success');
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto transition-colors">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            Clinical Documentation
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
            Medical Certificates
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Issue verified digital medical fitness, sick leave, and recovery certificates with verifiable QR tokens.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handlePrint} className="flex items-center gap-1.5">
            <Printer className="w-4 h-4" />
            <span>Print Certificate</span>
          </Button>
          <Button variant="primary" size="sm" onClick={handleGenerateNew} className="bg-blue-600 text-white flex items-center gap-1.5">
            <PlusCircle className="w-4 h-4" />
            <span>New Certificate</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Form Settings */}
        <div className="lg:col-span-5 space-y-4">
          <Card className="p-5 border-slate-200 dark:border-slate-800 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2">
              Certificate Details
            </h3>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Certificate Type
                </label>
                <select
                  value={certificateType}
                  onChange={(e) => setCertificateType(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Medical Fitness Certificate">Medical Fitness Certificate</option>
                  <option value="Medical Sick Leave Certificate">Medical Sick Leave Certificate</option>
                  <option value="Recovery & Return-to-Work Certificate">Recovery & Return-to-Work Certificate</option>
                  <option value="General Clinical Referral Note">General Clinical Referral Note</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Patient Full Name
                </label>
                <input
                  type="text"
                  value={patientName}
                  onChange={(e) => setPatientName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Age</label>
                  <input
                    type="text"
                    value={patientAge}
                    onChange={(e) => setPatientAge(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Gender</label>
                  <select
                    value={patientGender}
                    onChange={(e) => setPatientGender(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Clinical Diagnosis / Reason
                </label>
                <input
                  type="text"
                  value={diagnosis}
                  onChange={(e) => setDiagnosis(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {certificateType.includes('Leave') && (
                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Recommended Rest Period (Days)
                  </label>
                  <input
                    type="number"
                    value={restDays}
                    onChange={(e) => setRestDays(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              )}

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Date of Examination</label>
                <input
                  type="date"
                  value={issueDate}
                  onChange={(e) => setIssueDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </Card>
        </div>

        {/* Live Printable Certificate Canvas */}
        <div className="lg:col-span-7">
          <Card className="p-8 sm:p-12 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-xl space-y-6 relative overflow-hidden">
            {/* Authenticity Watermark */}
            <div className="absolute right-4 top-4 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-[10px] font-bold text-emerald-700 dark:text-emerald-300 flex items-center gap-1.5 shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Verified Certificate</span>
            </div>

            {/* Letterhead */}
            <div className="border-b-2 border-slate-900 dark:border-slate-700 pb-4 text-center space-y-1">
              <h2 className="text-xl font-black text-slate-900 dark:text-white tracking-tight uppercase">
                {clinicName}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                {activeClinic?.address || '101 Healthcare Boulevard'}, {activeClinic?.city || 'Mumbai'} · Tel: {activeClinic?.phone || '+91 98000 12345'}
              </p>
              <div className="pt-1 text-xs font-semibold text-blue-600">
                Reg No: {activeClinic?.registrationNumber || 'MH-MED-2024-8901'}
              </div>
            </div>

            {/* Certificate Title */}
            <div className="text-center pt-2">
              <span className="text-base font-extrabold text-slate-900 dark:text-white uppercase tracking-wider underline underline-offset-8 decoration-blue-500">
                {certificateType}
              </span>
              <div className="text-[11px] font-mono text-slate-400 mt-2">
                Reference ID: {certId} · Date: {issueDate}
              </div>
            </div>

            {/* Certificate Body Text */}
            <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-serif pt-4">
              <p>
                This is to certify that I have clinically examined{' '}
                <strong className="font-sans font-bold text-slate-900 dark:text-white">{patientName}</strong>,{' '}
                aged <strong>{patientAge} years</strong>, <strong>{patientGender}</strong>, residing in {activeClinic?.city || 'Mumbai'}.
              </p>
              <p>
                Based on diagnostic observation and clinical history, the patient has been diagnosed with{' '}
                <strong className="font-sans font-bold text-blue-700 dark:text-blue-400 underline decoration-blue-300">
                  {diagnosis}
                </strong>.
              </p>
              {certificateType.includes('Leave') ? (
                <p>
                  In my professional medical opinion, the patient was incapacitated and advised complete medical rest for{' '}
                  <strong className="font-sans font-bold">{restDays} days</strong> with effect from <strong>{issueDate}</strong>.
                </p>
              ) : (
                <p>
                  The patient is currently in satisfactory general physical health and medically certified as fit to resume normal daily and professional responsibilities.
                </p>
              )}
            </div>

            {/* Signature & QR Code Authenticity Section */}
            <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex items-end justify-between">
              <div className="flex items-center gap-3">
                <div className="w-16 h-16 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center p-1 shadow-2xs">
                  <QrCode className="w-10 h-10 text-slate-800 dark:text-slate-200" />
                  <span className="text-[8px] font-mono text-slate-400">Scan to Verify</span>
                </div>
                <div className="text-[10px] text-slate-400 space-y-0.5">
                  <div className="font-bold text-slate-700 dark:text-slate-300">ClinicOS Digital Seal</div>
                  <div>Digitally verified against SaaS registry</div>
                </div>
              </div>

              <div className="text-right space-y-1">
                <div className="font-serif italic text-base text-blue-700 dark:text-blue-400 font-bold">
                  {doctorName}
                </div>
                <div className="w-36 h-[1px] bg-slate-400 ml-auto" />
                <div className="text-xs font-bold text-slate-900 dark:text-white">Authorized Signatory</div>
                <div className="text-[10px] text-slate-400">Medical Council Reg. Active</div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}


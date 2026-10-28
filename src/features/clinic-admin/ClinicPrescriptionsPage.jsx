import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { FileText, PlusCircle, Printer, ExternalLink, ShieldCheck } from 'lucide-react';

export function ClinicPrescriptionsPage() {
  const { prescriptions, openPrescriptionModal, activeClinic } = useApp();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
<<<<<<< HEAD
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Clinical Documentation</span>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Digital Prescriptions Archive</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
=======
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Clinical Documentation</span>
          <h1 className="text-2xl font-extrabold text-slate-900">Digital Prescriptions Archive</h1>
          <p className="text-xs text-slate-500 mt-0.5">
>>>>>>> origin/main
            Tamper-evident digital prescriptions with cryptographic QR code verification and print-ready PDF export.
          </p>
        </div>

        <Link to="/clinic/prescriptions/new">
          <Button variant="primary" size="sm" icon={PlusCircle}>
            + Create New Prescription
          </Button>
        </Link>
      </div>

<<<<<<< HEAD
      <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
=======
      <Card>
>>>>>>> origin/main
        <CardHeader
          title={`Issued Prescriptions (${prescriptions.length})`}
          subtitle={`Clinical documents issued by doctors at ${activeClinic.name}`}
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
                <th className="p-3.5">Prescription #</th>
                <th className="p-3.5">Patient Details</th>
                <th className="p-3.5">Doctor & Date</th>
                <th className="p-3.5">Clinical Diagnosis</th>
                <th className="p-3.5">Medications Count</th>
                <th className="p-3.5">QR Verification</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
<<<<<<< HEAD
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {prescriptions.map((rx, idx) => (
                <tr key={rx.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="p-3.5 text-center font-mono font-medium text-slate-400 dark:text-slate-500 text-xs">{idx + 1}</td>
                  <td className="p-3.5 font-mono font-bold text-slate-900 dark:text-white">{rx.prescriptionNumber}</td>
                  <td className="p-3.5">
                    <div className="font-bold text-slate-900 dark:text-slate-100">{rx.patientName}</div>
                    <div className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">{rx.patientId}</div>
                  </td>
                  <td className="p-3.5">
                    <div className="font-medium text-slate-800 dark:text-slate-200">{rx.doctorName}</div>
                    <div className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">{rx.date}</div>
                  </td>
                  <td className="p-3.5 font-medium text-slate-700 dark:text-slate-300 max-w-xs truncate">
                    {rx.diagnosis}
                  </td>
                  <td className="p-3.5 font-semibold text-slate-700 dark:text-slate-300">
=======
            <tbody className="divide-y divide-slate-100">
              {prescriptions.map((rx) => (
                <tr key={rx.id} className="hover:bg-slate-50/50">
                  <td className="p-3.5 font-mono font-bold text-slate-900">{rx.prescriptionNumber}</td>
                  <td className="p-3.5">
                    <div className="font-bold text-slate-900">{rx.patientName}</div>
                    <div className="text-[10px] text-slate-400 font-mono">{rx.patientId}</div>
                  </td>
                  <td className="p-3.5">
                    <div className="font-medium text-slate-800">{rx.doctorName}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{rx.date}</div>
                  </td>
                  <td className="p-3.5 font-medium text-slate-700 max-w-xs truncate">
                    {rx.diagnosis}
                  </td>
                  <td className="p-3.5 font-semibold text-slate-700">
>>>>>>> origin/main
                    {rx.medications?.length || 0} Prescribed Drugs
                  </td>
                  <td className="p-3.5">
                    <Link
                      to={`/verify-prescription/${rx.verificationId}`}
                      target="_blank"
<<<<<<< HEAD
                      className="inline-flex items-center gap-1 font-mono text-[11px] text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2 py-0.5 rounded border border-blue-200 dark:border-blue-900/50 hover:bg-blue-100 dark:hover:bg-blue-900/60"
                    >
                      <ShieldCheck className="w-3 h-3 text-blue-600 dark:text-blue-400" />
=======
                      className="inline-flex items-center gap-1 font-mono text-[11px] text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 hover:bg-blue-100"
                    >
                      <ShieldCheck className="w-3 h-3 text-blue-600" />
>>>>>>> origin/main
                      <span>{rx.verificationId}</span>
                    </Link>
                  </td>
                  <td className="p-3.5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        variant="outline"
                        size="sm"
                        icon={Printer}
                        onClick={() => openPrescriptionModal(rx)}
                      >
                        Print / PDF
                      </Button>
                      <Link to={`/clinic/prescriptions/${rx.id}`}>
                        <Button variant="ghost" size="sm">
                          Details
                        </Button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}


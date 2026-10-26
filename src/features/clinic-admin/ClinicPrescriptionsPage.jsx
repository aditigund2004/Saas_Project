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
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Clinical Documentation</span>
          <h1 className="text-2xl font-extrabold text-slate-900">Digital Prescriptions Archive</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Tamper-evident digital prescriptions with cryptographic QR code verification and print-ready PDF export.
          </p>
        </div>

        <Link to="/clinic/prescriptions/new">
          <Button variant="primary" size="sm" icon={PlusCircle}>
            + Create New Prescription
          </Button>
        </Link>
      </div>

      <Card>
        <CardHeader
          title={`Issued Prescriptions (${prescriptions.length})`}
          subtitle={`Clinical documents issued by doctors at ${activeClinic.name}`}
        />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3.5">Prescription #</th>
                <th className="p-3.5">Patient Details</th>
                <th className="p-3.5">Doctor & Date</th>
                <th className="p-3.5">Clinical Diagnosis</th>
                <th className="p-3.5">Medications Count</th>
                <th className="p-3.5">QR Verification</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
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
                    {rx.medications?.length || 0} Prescribed Drugs
                  </td>
                  <td className="p-3.5">
                    <Link
                      to={`/verify-prescription/${rx.verificationId}`}
                      target="_blank"
                      className="inline-flex items-center gap-1 font-mono text-[11px] text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200 hover:bg-blue-100"
                    >
                      <ShieldCheck className="w-3 h-3 text-blue-600" />
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


import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { FileText, Search, Plus, QrCode, Eye, Printer, Calendar } from 'lucide-react';

export function DoctorPrescriptionsPage() {
  const { prescriptions, openPrescriptionModal, activeClinic } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRxs = prescriptions.filter(
    (rx) =>
      rx.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rx.prescriptionNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rx.diagnosis.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-800">
              Prescription Archives
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Prescriptions Issued</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Digitally signed clinical prescriptions with tamper-evident QR verification tokens
          </p>
        </div>

        <Link to="/doctor/consultation">
          <Button variant="primary" size="sm">
            <Plus className="w-3.5 h-3.5 mr-1.5" />
            Issue New Prescription
          </Button>
        </Link>
      </div>

      {/* Search Bar */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-3" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by patient name, Rx number (e.g. RX-2026-8812), or diagnosis..."
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      {/* Table */}
      <Card className="overflow-hidden border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-3 py-3 text-center w-12 font-semibold">#</th>
                <th className="px-4 py-3">Prescription #</th>
                <th className="px-4 py-3">Patient</th>
                <th className="px-4 py-3">Date Issued</th>
                <th className="px-4 py-3">Diagnosis</th>
                <th className="px-4 py-3">Drugs Count</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredRxs.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-slate-400 dark:text-slate-500">
                    No matching prescriptions found.
                  </td>
                </tr>
              ) : (
                filteredRxs.map((rx, idx) => (
                  <tr key={rx.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-3 py-3 text-center font-mono font-medium text-slate-400 dark:text-slate-500 text-xs">{idx + 1}</td>
                    <td className="px-4 py-3 font-mono font-bold text-blue-700 dark:text-blue-400">
                      {rx.prescriptionNumber}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-bold text-slate-900 dark:text-white">{rx.patientName}</div>
                      <div className="text-xs text-slate-400 dark:text-slate-500">{rx.patientAgeGender}</div>
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-300 font-mono">
                      {rx.date}
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-200 max-w-xs truncate">
                      {rx.diagnosis}
                    </td>
                    <td className="px-4 py-3 font-semibold text-slate-700 dark:text-slate-300">
                      {rx.medications.length} Medications
                    </td>
                    <td className="px-4 py-3">
                      <Badge variant="success" size="sm">Valid & Active</Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => openPrescriptionModal(rx)}
                          className="h-7 text-xs"
                        >
                          <Eye className="w-3.5 h-3.5 mr-1" />
                          View
                        </Button>
                        <Link to={`/verify-prescription/${rx.verificationId}`} target="_blank">
                          <Button variant="ghost" size="sm" className="h-7 text-xs text-blue-700 dark:text-blue-400" title="QR Verification Link">
                            <QrCode className="w-3.5 h-3.5" />
                          </Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

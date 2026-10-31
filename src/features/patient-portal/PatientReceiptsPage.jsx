import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { DemoPatientSwitcher } from '../../components/patient/DemoPatientSwitcher';
import {
  Receipt,
  Printer,
  Download,
  Search,
  CheckCircle2,
  Calendar,
  CreditCard,
  Building,
  FileText,
  User,
  ShieldCheck,
  Clock
} from 'lucide-react';

export function PatientReceiptsPage() {
  const {
    receipts = [],
    currentUser,
    activePatientId,
    patients = [],
    activeClinic,
    formatCurrency,
    showToast
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReceipt, setSelectedReceipt] = useState(null);

  const activePatient =
    patients.find((p) => p.id === activePatientId || p.patientIdNumber === activePatientId) ||
    patients.find((p) => p.name === currentUser?.name) ||
    patients[0];

  // Strictly filter receipts for the active patient
  const myReceipts = receipts.filter(
    (r) =>
      r.patientId === activePatient?.id ||
      r.patientId === activePatient?.patientIdNumber ||
      r.patientName === activePatient?.name
  );

  const displayReceipts = myReceipts.length > 0 ? myReceipts : receipts.filter((r) => r.patientName === 'Aarav Patel');

  const filtered = displayReceipts.filter((rcp) => {
    return (
      rcp.receiptNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rcp.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      rcp.paymentMethod.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const totalPaid = displayReceipts.reduce((sum, r) => sum + (Number(r.amount) || 0), 0);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Demo Patient Identity Switcher */}
      <DemoPatientSwitcher />

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="text-xs font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-900/60 uppercase tracking-wider">
            Settlement Receipts
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight mt-1">
            My Payment Receipts
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Official cash and digital settlement receipts for tax reimbursements, corporate insurance claims, and OPD records.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            onClick={() => showToast('Exporting receipts ledger as PDF statement...')}
          >
            <Download className="w-4 h-4 mr-1.5" />
            Download Summary
          </Button>
        </div>
      </div>

      {/* Summary KPI Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 border-slate-200 dark:border-slate-800 dark:bg-slate-900">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Recorded Receipts</div>
          <div className="text-2xl font-black text-slate-900 dark:text-white mt-1">
            {displayReceipts.length}
          </div>
          <p className="text-xs text-slate-400 mt-0.5">Linked to authorized clinic transactions</p>
        </Card>

        <Card className="p-4 border-blue-200 dark:border-blue-900/40 bg-blue-50/40 dark:bg-blue-950/20">
          <div className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider">Total Settled Amount</div>
          <div className="text-2xl font-black text-blue-950 dark:text-blue-100 mt-1">
            {formatCurrency(totalPaid)}
          </div>
          <p className="text-xs text-blue-700/80 dark:text-blue-400/80 mt-0.5">All verified settlements</p>
        </Card>

        <Card className="p-4 border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/40 dark:bg-emerald-950/20">
          <div className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider">Verification Status</div>
          <div className="text-2xl font-black text-emerald-950 dark:text-emerald-100 mt-1 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
            <span>Authenticated</span>
          </div>
          <p className="text-xs text-emerald-700/80 dark:text-emerald-400/80 mt-0.5">Tamper-evident audit trail</p>
        </Card>
      </div>

      {/* Filter and Table */}
      <Card className="border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by receipt or invoice #..."
              className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-950 text-xs focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="text-xs font-semibold text-slate-500">
            Showing {filtered.length} of {displayReceipts.length} receipts
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-3 text-center w-12">#</th>
                <th className="p-3">Receipt Number</th>
                <th className="p-3">Date & Time</th>
                <th className="p-3">Linked Invoice</th>
                <th className="p-3">Payment Method</th>
                <th className="p-3">Amount Paid</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-400">
                    No receipts recorded for this patient yet. Once a payment is registered against an invoice, official receipts appear here.
                  </td>
                </tr>
              ) : (
                filtered.map((rcp, idx) => (
                  <tr key={rcp.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 text-center font-mono text-slate-400">{idx + 1}</td>
                    <td className="p-3 font-mono font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                      <Receipt className="w-3.5 h-3.5 text-blue-500" />
                      <span>{rcp.receiptNumber}</span>
                    </td>
                    <td className="p-3 font-mono text-slate-600 dark:text-slate-400">
                      <div>{rcp.date}</div>
                      {rcp.time && <div className="text-[10px] text-slate-400">{rcp.time}</div>}
                    </td>
                    <td className="p-3 font-mono text-slate-700 dark:text-slate-300 font-medium">
                      {rcp.invoiceNumber}
                    </td>
                    <td className="p-3 text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                      <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                      <span>{rcp.paymentMethod}</span>
                    </td>
                    <td className="p-3 font-bold font-mono text-emerald-600 dark:text-emerald-400 text-sm">
                      {formatCurrency(rcp.amount)}
                    </td>
                    <td className="p-3">
                      <Badge variant="success" size="sm" className="font-bold">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        {rcp.status}
                      </Badge>
                    </td>
                    <td className="p-3 text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedReceipt(rcp)}
                        className="text-xs"
                      >
                        <Printer className="w-3.5 h-3.5 mr-1" />
                        Print Receipt
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Official Printable Receipt Modal */}
      {selectedReceipt && (
        <Modal
          isOpen={!!selectedReceipt}
          onClose={() => setSelectedReceipt(null)}
          title="Official Clinic Payment Receipt"
          size="md"
        >
          <div className="space-y-5 text-slate-800 dark:text-slate-200">
            {/* Printable Receipt Canvas */}
            <div
              id="printable-receipt"
              className="p-6 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm space-y-5 print:border-none print:shadow-none"
            >
              {/* Header Letterhead */}
              <div className="flex items-start justify-between pb-4 border-b-2 border-slate-200 dark:border-slate-800">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-black flex items-center justify-center text-sm">
                      +
                    </div>
                    <div>
                      <h2 className="text-lg font-black text-slate-900 dark:text-white leading-tight">
                        {selectedReceipt.clinicName || activeClinic?.name || 'CityCare Family Practice'}
                      </h2>
                      <p className="text-[11px] text-slate-500">
                        {activeClinic?.address || '104 Healthcare Boulevard, Bandra West, Mumbai'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="inline-block px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200">
                    OFFICIAL OPD RECEIPT
                  </span>
                  <div className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200 mt-1">
                    {selectedReceipt.receiptNumber}
                  </div>
                </div>
              </div>

              {/* Patient & Payment Details */}
              <div className="grid grid-cols-2 gap-4 text-xs py-2">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Received From</span>
                  <span className="font-bold text-slate-900 dark:text-white text-sm">
                    {selectedReceipt.patientName}
                  </span>
                  <span className="block text-slate-500 font-mono text-[11px]">
                    ID: {selectedReceipt.patientId}
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Date & Time</span>
                  <span className="font-semibold text-slate-900 dark:text-white font-mono">
                    {selectedReceipt.date} {selectedReceipt.time && `· ${selectedReceipt.time}`}
                  </span>
                  <span className="block text-slate-500 font-mono text-[11px]">
                    Ref: {selectedReceipt.paymentReference}
                  </span>
                </div>
              </div>

              {/* Settlement Line Item Box */}
              <div className="rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 dark:bg-slate-800/60 font-semibold text-slate-600 dark:text-slate-300 border-b border-slate-200 dark:border-slate-800">
                    <tr>
                      <th className="p-3">Payment For / Description</th>
                      <th className="p-3">Linked Invoice</th>
                      <th className="p-3 text-right">Amount Paid</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="p-3 font-medium text-slate-800 dark:text-slate-200">
                        {selectedReceipt.notes || 'Outpatient Consultation & Clinical Settlement'}
                      </td>
                      <td className="p-3 font-mono text-slate-600 dark:text-slate-400">
                        {selectedReceipt.invoiceNumber}
                      </td>
                      <td className="p-3 text-right font-mono font-bold text-emerald-600 text-sm">
                        {formatCurrency(selectedReceipt.amount)}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Payment Summary */}
              <div className="grid grid-cols-2 gap-4 pt-2 text-xs border-t border-slate-100 dark:border-slate-800">
                <div>
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Payment Method</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">
                    {selectedReceipt.paymentMethod}
                  </span>
                  {selectedReceipt.transactionRef && (
                    <span className="block text-slate-400 font-mono text-[10px]">
                      Txn: {selectedReceipt.transactionRef}
                    </span>
                  )}
                </div>

                <div className="text-right">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Total Settled</span>
                  <span className="text-lg font-black text-slate-900 dark:text-white font-mono">
                    {formatCurrency(selectedReceipt.amount)}
                  </span>
                </div>
              </div>

              {/* Footer Authenticity Seal */}
              <div className="pt-4 border-t border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500">
                <div className="flex items-center gap-1 text-slate-400">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Computer-generated clinic receipt · No signature required</span>
                </div>
                <div className="text-right font-medium text-slate-600 dark:text-slate-400">
                  Issued by: {selectedReceipt.issuedBy || 'Clinic Front Desk'}
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={() => setSelectedReceipt(null)}>
                Close
              </Button>
              <Button variant="primary" size="sm" onClick={handlePrint}>
                <Printer className="w-3.5 h-3.5 mr-1.5" />
                Print / Save PDF
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}


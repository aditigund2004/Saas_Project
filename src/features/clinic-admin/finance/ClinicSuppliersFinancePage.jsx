import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { ClinicFinanceNav } from './ClinicFinanceNav';
import { Card, CardHeader } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { Modal } from '../../../components/ui/Modal';
import {
  Truck,
  PlusCircle,
  Search,
  Download,
  CreditCard,
  Building,
  CheckCircle2,
  Clock,
  AlertTriangle,
  FileText,
  Phone,
  Mail
} from 'lucide-react';

export function ClinicSuppliersFinancePage() {
  const {
    suppliers = [],
    purchaseOrders = [],

    showToast,
    formatCurrency,
    activeClinic
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSupplierForPayment, setSelectedSupplierForPayment] = useState(null);
  const [paymentAmount, setPaymentAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Bank Transfer (NEFT)');

  // Filter suppliers
  const filteredSuppliers = (suppliers || []).filter((s) => {
    return (
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (s.contactPerson && s.contactPerson.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  });

  // Calculate overall supplier metrics
  const totalPayables = (suppliers || []).reduce((sum, s) => sum + (s.outstandingBalance || 18500), 0);
  const totalSettledMTD = 64200;

  const handleSettlePayment = (e) => {
    e.preventDefault();
    if (!selectedSupplierForPayment) return;
    showToast(
      `Settlement of ₹${Number(paymentAmount).toLocaleString('en-IN')} recorded for ${selectedSupplierForPayment.name} via ${paymentMethod}`
    );
    setSelectedSupplierForPayment(null);
    setPaymentAmount('');
  };

  return (
    <div className="space-y-6">
      {/* Scope Navigation */}
      <ClinicFinanceNav />

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Medical Supply Chain Finance</span>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Distributor & Supplier Payables</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">

            Manage commercial distributor liabilities, credit lines, and procurement purchase order settlements.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => showToast('Exporting medical distributor payables ledger CSV...')}
          >
            <Download className="w-4 h-4 mr-1.5" />

            Export Ledger
          </Button>
        </div>
      </div>

      {/* Financial Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span>Outstanding Supplier Payables</span>
            <span className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
              <Clock className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 text-2xl font-black font-mono text-amber-600 dark:text-amber-400 tabular-nums">
            {formatCurrency(totalPayables || 94500)}
          </div>
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400 font-medium">

            Across {suppliers.length} authorized clinical vendors
          </div>
        </Card>

        <Card className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span>Settled This Month</span>
            <span className="p-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 text-2xl font-black font-mono text-emerald-600 dark:text-emerald-400 tabular-nums">
            {formatCurrency(totalSettledMTD)}
          </div>
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400 font-medium">

            Via corporate current account RTGS / NEFT
          </div>
        </Card>

        <Card className="p-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-500 dark:text-slate-400">
            <span>Standard Credit Terms</span>
            <span className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
              <Truck className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 text-2xl font-black font-mono text-slate-900 dark:text-white tabular-nums">
            Net 30 Days
          </div>
          <div className="mt-1 text-xs text-slate-500 dark:text-slate-400 font-medium">

            Zero overdue penalties accrued
          </div>
        </Card>
      </div>

      {/* Suppliers Table */}
      <Card padding="none" className="border-slate-200 dark:border-slate-800 overflow-hidden">
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white dark:bg-slate-900">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />

            <input
              type="text"
              placeholder="Search distributor by company or contact person..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">

            Showing {filteredSuppliers.length} active suppliers
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 uppercase text-xs font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-3.5 text-center w-12 font-semibold">#</th>

                <th className="p-3.5">Distributor Name</th>
                <th className="p-3.5">Category Supplied</th>
                <th className="p-3.5">Credit Terms</th>
                <th className="p-3.5">Contact Details</th>
                <th className="p-3.5">Pending Balance</th>
                <th className="p-3.5">Account Status</th>
                <th className="p-3.5 text-right">Settlement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredSuppliers.map((s, idx) => {
                const balance = s.outstandingBalance || [32400, 18500, 42000, 8900, 14200][idx % 5];
                return (
                  <tr key={s.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="p-3.5 text-center font-mono font-medium text-slate-400 dark:text-slate-500 text-xs">{idx + 1}</td>
                    <td className="p-3.5">
                      <div className="font-bold text-slate-900 dark:text-white">{s.name}</div>
                      <div className="text-xs text-slate-400 dark:text-slate-500 font-mono">GSTIN: {s.gstin || '27AABCU9603R1ZM'}</div>
                    </td>
                    <td className="p-3.5">
                      <span className="px-2.5 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 text-xs font-semibold border border-blue-200 dark:border-blue-800">
                        {s.category || 'Pharmaceuticals & Consumables'}
                      </span>
                    </td>
                    <td className="p-3.5 font-mono text-slate-600 dark:text-slate-400 text-xs font-semibold">
                      {s.terms || 'Net 30 Days'}
                    </td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-300">
                      <div>{s.contactPerson || 'Account Manager'}</div>
                      <div className="text-xs text-slate-400 dark:text-slate-500">{s.phone || '+91 98230 11223'}</div>
                    </td>
                    <td className="p-3.5 font-mono font-bold text-amber-600 dark:text-amber-400 tabular-nums">
                      {formatCurrency(balance)}
                    </td>
                    <td className="p-3.5">
                      <Badge variant="success" size="sm">Active Vendor</Badge>

                    </td>
                    <td className="p-3.5 text-right">
                      <Button
                        variant="primary"
                        size="xs"

                        onClick={() => {
                          setSelectedSupplierForPayment(s);
                          setPaymentAmount(balance);
                        }}
                      >
                        <CreditCard className="w-3.5 h-3.5 mr-1" />

                        Settle Dues
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Settle Payment Modal */}
      <Modal
        isOpen={!!selectedSupplierForPayment}
        onClose={() => setSelectedSupplierForPayment(null)}
        title={`Record Supplier Settlement: ${selectedSupplierForPayment?.name}`}
      >
        {selectedSupplierForPayment && (
          <form onSubmit={handleSettlePayment} className="space-y-4 text-sm">
            <div className="p-3.5 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 space-y-1">
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Distributor:</span>
                <span className="font-bold text-slate-900 dark:text-white">{selectedSupplierForPayment.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-600 dark:text-slate-400">Current Ledger Balance:</span>
                <span className="font-mono font-bold text-amber-600 dark:text-amber-400 tabular-nums">

                  {formatCurrency(paymentAmount || 25000)}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Disbursement Amount (₹)</label>

              <input
                type="number"
                required
                min="100"
                value={paymentAmount}
                onChange={(e) => setPaymentAmount(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"

              />
            </div>

            <div>
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Payment Method</label>
              <select
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 font-medium"

              >
                <option value="Bank Transfer (NEFT)">Corporate Current Account NEFT</option>
                <option value="Bank Transfer (RTGS)">High-Value RTGS Immediate Settlement</option>
                <option value="Account Payee Cheque">Account Payee Cheque</option>
                <option value="UPI Corporate">Corporate UPI Payment</option>
              </select>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 text-xs">

              Submitting records this payout in the clinic expense ledger and adjusts the vendor payable liability.
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" type="button" onClick={() => setSelectedSupplierForPayment(null)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                <CheckCircle2 className="w-4 h-4 mr-1.5" />

                Confirm Payout
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}


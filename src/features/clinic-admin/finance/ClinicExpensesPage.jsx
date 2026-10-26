import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { ClinicFinanceNav } from './ClinicFinanceNav';
import { Card, CardHeader } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { Modal } from '../../../components/ui/Modal';
import {
  Wallet,
  PlusCircle,
  Search,
  Filter,
  Download,
  Building,
  CheckCircle,
  AlertCircle,
  FileText,
  DollarSign,
  Tag,
  Sparkles
} from 'lucide-react';

export function ClinicExpensesPage() {
  const {
    expenses,
    createClinicExpense,
    showToast,
    formatCurrency,
    activeClinic
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isNewExpenseOpen, setIsNewExpenseOpen] = useState(false);

  // Form State
  const [vendor, setVendor] = useState('CleanWaste Bio-Medical Solutions');
  const [category, setCategory] = useState('Biomedical Waste');
  const [amount, setAmount] = useState(4800);
  const [description, setDescription] = useState('Yellow bag hazardous bio-waste collection and incineration fee');
  const [paymentMethod, setPaymentMethod] = useState('Bank Transfer');

  const filteredExpenses = expenses.filter((e) => {
    const matchesSearch =
      (e.vendor && e.vendor.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (e.description && e.description.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory = selectedCategory === 'All' || e.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalExpenseAmount = expenses.reduce((sum, e) => sum + (Number(e.amount) || 0), 0);

  // Calculate category totals
  const categoriesList = [
    'Consumables',
    'Biomedical Waste',
    'Facility Rent',
    'Utilities',
    'Equipment AMC',
    'Software License',
    'Staff Welfare'
  ];

  const handleCreateExpense = (e) => {
    e.preventDefault();
    createClinicExpense({
      vendor,
      category,
      amount: Number(amount),
      description,
      date: new Date().toISOString().slice(0, 10),
      paymentMethod
    });
    setIsNewExpenseOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Scope Navigation */}
      <ClinicFinanceNav />

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Practice Overhead & Payables</span>
          <h1 className="text-2xl font-extrabold text-slate-900">Clinic Operational Expenses</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Log medical consumables, equipment maintenance AMCs, biomedical hazardous waste disposal, facility rent, and ClinicOS SaaS licensing.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={Download}
            onClick={() => showToast('Exporting practice operational expense ledger CSV...')}
          >
            Export Expenses
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={PlusCircle}
            onClick={() => setIsNewExpenseOpen(true)}
          >
            Record Practice Expense
          </Button>
        </div>
      </div>

      {/* Category Breakdown Metric Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
        {categoriesList.map((cat) => {
          const catSum = expenses
            .filter((e) => e.category === cat)
            .reduce((sum, e) => sum + (Number(e.amount) || 0), 0);

          const isSelected = selectedCategory === cat;

          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(isSelected ? 'All' : cat)}
              className={`p-3 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'bg-blue-600 text-white border-blue-600 shadow-xs'
                  : 'bg-white border-slate-200 hover:border-blue-300'
              }`}
            >
              <div className={`text-[10px] font-semibold uppercase truncate ${isSelected ? 'text-blue-100' : 'text-slate-500'}`}>
                {cat}
              </div>
              <div className={`text-base font-extrabold font-mono mt-1 ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                {formatCurrency(catSum)}
              </div>
            </button>
          );
        })}
      </div>

      {/* Expenses Table Card */}
      <Card padding="none">
        <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white">
          <div className="relative flex-1 max-w-sm">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by vendor, memo or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-semibold">Total Expenses MTD:</span>
            <span className="font-mono font-bold text-red-600 text-sm">{formatCurrency(totalExpenseAmount)}</span>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3.5">Vendor / Payee</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Description</th>
                <th className="p-3.5">Date</th>
                <th className="p-3.5">Payment Method</th>
                <th className="p-3.5">Amount</th>
                <th className="p-3.5">Voucher Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredExpenses.length === 0 ? (
                <tr>
                  <td colSpan={7} className="p-8 text-center text-slate-400">
                    No expense records found.
                  </td>
                </tr>
              ) : (
                filteredExpenses.map((exp) => {
                  const isSoftware = exp.category === 'Software License';
                  return (
                    <tr key={exp.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="p-3.5">
                        <div className="font-bold text-slate-900 flex items-center gap-1.5">
                          {exp.vendor || 'Clinic Landlord'}
                          {isSoftware && (
                            <span className="p-0.5 rounded bg-blue-100 text-blue-700">
                              <Sparkles className="w-3 h-3" />
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="p-3.5">
                        <span
                          className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                            isSoftware
                              ? 'bg-blue-50 text-blue-700 border border-blue-200'
                              : 'bg-slate-100 text-slate-700'
                          }`}
                        >
                          {exp.category}
                        </span>
                      </td>
                      <td className="p-3.5 max-w-[260px]">
                        <div className="truncate text-slate-700">{exp.description}</div>
                      </td>
                      <td className="p-3.5 text-slate-500 font-mono text-[11px]">{exp.date}</td>
                      <td className="p-3.5 text-slate-600 font-medium">{exp.paymentMethod || 'Bank Transfer'}</td>
                      <td className="p-3.5 font-mono font-bold text-red-600 text-sm">
                        {formatCurrency(exp.amount)}
                      </td>
                      <td className="p-3.5">
                        <Badge variant="success">Disbursed</Badge>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* New Expense Modal */}
      <Modal
        isOpen={isNewExpenseOpen}
        onClose={() => setIsNewExpenseOpen(false)}
        title="Record Practice Operating Expense"
      >
        <form onSubmit={handleCreateExpense} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">Vendor / Payee</label>
            <input
              type="text"
              required
              value={vendor}
              onChange={(e) => setVendor(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="e.g. Apex Medical Consumables, Pune BioHazard Waste Ltd"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Expense Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
              >
                <option value="Consumables">Medical Consumables & PPE</option>
                <option value="Biomedical Waste">Biomedical Waste Disposal</option>
                <option value="Facility Rent">Facility Rent</option>
                <option value="Utilities">Utilities & High-Speed WiFi</option>
                <option value="Equipment AMC">Equipment AMC & Servicing</option>
                <option value="Software License">Software License (ClinicOS SaaS)</option>
                <option value="Staff Welfare">Staff Welfare</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Amount (₹)</label>
              <input
                type="number"
                required
                min="50"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Description / Memo</label>
            <textarea
              rows={2}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="Detailed memorandum of expense items..."
            />
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Payment Method</label>
            <select
              value={paymentMethod}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
            >
              <option value="Bank Transfer">Bank Transfer (NEFT / IMPS)</option>
              <option value="Cheque">Corporate Current Account Cheque</option>
              <option value="UPI / QR">Practice Business UPI</option>
              <option value="Corporate Card">Corporate Debit Card</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" type="button" onClick={() => setIsNewExpenseOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Expense Voucher
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}


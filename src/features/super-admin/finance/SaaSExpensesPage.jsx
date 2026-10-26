import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { SaaSFinanceNav } from './SaaSFinanceNav';
import { Card, CardHeader } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Badge } from '../../../components/ui/Badge';
import { Modal } from '../../../components/ui/Modal';
import {
  DollarSign,
  Search,
  Filter,
  Download,
  PlusCircle,
  ShieldCheck,
  Server,
  Cpu,
  Layers
} from 'lucide-react';

export function SaaSExpensesPage() {
  const { saasExpenses, addSaaSExpense, formatCurrency, showToast } = useApp();
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form State
  const [category, setCategory] = useState('Cloud Infrastructure');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('2026-10-24');

  const filteredExpenses = saasExpenses.filter((e) => {
    const matchesSearch =
      e.description.toLowerCase().includes(search.toLowerCase()) ||
      e.category.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || e.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const totalExpenseAmount = filteredExpenses.reduce((acc, e) => acc + e.amount, 0);

  const handleCreateExpense = (e) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) {
      showToast('Please enter a valid amount.', 'error');
      return;
    }

    addSaaSExpense({
      category,
      description,
      amount: Number(amount),
      date
    });

    setIsModalOpen(false);
    setDescription('');
    setAmount('');
  };

  const handleExportCSV = () => {
    const csvContent =
      'data:text/csv;charset=utf-8,' +
      ['Category,Description,Date,Amount,Payment Status']
        .concat(
          filteredExpenses.map(
            (e) => `"${e.category}","${e.description}","${e.date}",${e.amount},"${e.paymentStatus}"`
          )
        )
        .join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `clinicos_saas_company_expenses_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Company operating expenses CSV exported.');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Operating Expenditures</span>
          <h1 className="text-2xl font-extrabold text-slate-900">SaaS Company Operating Expenses</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Cloud infrastructure, API vendor buffers, compliance audits, and SaaS tooling costs (strictly separate from clinic clinical costs).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" icon={Download} onClick={handleExportCSV}>
            Export Expenses CSV
          </Button>
          <Button variant="primary" size="sm" icon={PlusCircle} onClick={() => setIsModalOpen(true)}>
            + Record Company Expense
          </Button>
        </div>
      </div>

      <SaaSFinanceNav />

      {/* Scope Disclaimer Callout */}
      <div className="p-3.5 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-700 flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-slate-600 shrink-0" />
        <span>
          <strong>Corporate Overhead Distinction:</strong> These expenditures represent ClinicOS platform engineering, AWS hosting, and compliance retainers. They do not represent clinic inventory, clinic nurse salaries, or facility rent.
        </span>
      </div>

      {/* Filter and Search */}
      <Card className="p-4 border-slate-200">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search expenses by vendor, description, or tooling service..."
              className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="sm:col-span-4">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white font-medium text-slate-700"
            >
              <option value="All">All Categories</option>
              <option value="Cloud Infrastructure">Cloud Infrastructure (AWS)</option>
              <option value="SaaS Tooling">SaaS Tooling (Datadog/Sentry)</option>
              <option value="Regulatory & Legal">Regulatory & Legal (HIPAA Audit)</option>
              <option value="Engineering & Ops">Engineering & Ops (WhatsApp/Twilio)</option>
              <option value="Payment Gateway Reserve">Payment Gateway Reserve (Razorpay)</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Table */}
      <Card>
        <CardHeader
          title={`Platform Operating Ledger (${filteredExpenses.length})`}
          subtitle={`Total Period Operating Outflow: ${formatCurrency(totalExpenseAmount)}`}
        />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Description & Vendor Details</th>
                <th className="p-3.5">Expense Date</th>
                <th className="p-3.5">Amount</th>
                <th className="p-3.5">Payment Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
              {filteredExpenses.map((exp) => (
                <tr key={exp.id} className="hover:bg-slate-50/50">
                  <td className="p-3.5 font-sans font-bold text-slate-900">{exp.category}</td>
                  <td className="p-3.5 font-sans text-slate-700 max-w-sm">{exp.description}</td>
                  <td className="p-3.5 text-slate-500">{exp.date}</td>
                  <td className="p-3.5 font-bold text-slate-900">{formatCurrency(exp.amount)}</td>
                  <td className="p-3.5 font-sans">
                    <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      {exp.paymentStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Create Expense Modal */}
      {isModalOpen && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Record SaaS Company Operating Expense"
          size="md"
        >
          <form onSubmit={handleCreateExpense} className="space-y-4 text-xs">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Expense Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs bg-white font-medium"
              >
                <option value="Cloud Infrastructure">Cloud Infrastructure (AWS Mumbai)</option>
                <option value="SaaS Tooling">SaaS Tooling (Datadog, Postmark, Sentry)</option>
                <option value="Regulatory & Legal">Regulatory & Legal (HIPAA / ISO)</option>
                <option value="Engineering & Ops">Engineering & Ops (Meta WhatsApp / Twilio)</option>
                <option value="Payment Gateway Reserve">Payment Gateway Reserve (Razorpay)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Amount (INR) *</label>
                <input
                  required
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g. 24000"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono font-bold"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">Expense Date *</label>
                <input
                  required
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Description & Vendor Details *
              </label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description, vendor invoice reference, or service scope..."
                className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" type="submit">
                Record Operating Expense
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}


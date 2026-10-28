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
    showToast('Company operating expenses CSV exported.', 'success');

  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Operating Expenditures</span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">SaaS Company Operating Expenses</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">

            Cloud infrastructure, API vendor buffers, compliance audits, and SaaS tooling costs (strictly separate from clinic clinical costs).
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" icon={Download} onClick={handleExportCSV}>
            Export Expenses CSV
          </Button>
          <Button variant="primary" size="sm" icon={PlusCircle} onClick={() => setIsModalOpen(true)}>
            Record Company Expense

          </Button>
        </div>
      </div>

      <SaaSFinanceNav />

      {/* Scope Disclaimer Callout */}
      <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-sm text-slate-700 dark:text-slate-300 flex items-center gap-3">
        <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0" />

        <span>
          <strong>Corporate Overhead Distinction:</strong> These expenditures represent ClinicOS platform engineering, AWS hosting, and compliance retainers. They do not represent clinic inventory, clinic nurse salaries, or facility rent.
        </span>
      </div>

      {/* Filter and Search */}
      <Card className="p-4 border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search expenses by vendor, description, or tooling service..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder:text-slate-400"

            />
          </div>

          <div className="sm:col-span-4">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white dark:bg-slate-950 font-medium text-slate-700 dark:text-slate-200"

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
      <Card className="border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm">

        <CardHeader
          title={`Platform Operating Ledger (${filteredExpenses.length})`}
          subtitle={`Total Period Operating Outflow: ${formatCurrency(totalExpenseAmount)}`}
        />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 uppercase text-xs font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-4 text-center w-12 font-bold">#</th>
                <th className="p-4">Category</th>
                <th className="p-4">Description & Vendor Details</th>
                <th className="p-4">Expense Date</th>
                <th className="p-4">Amount</th>
                <th className="p-4">Payment Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 font-mono text-xs">
              {filteredExpenses.map((exp, idx) => (
                <tr key={exp.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="p-4 text-center font-mono font-medium text-slate-400 dark:text-slate-500 text-xs">{idx + 1}</td>
                  <td className="p-4 font-sans font-bold text-slate-900 dark:text-white text-sm">{exp.category}</td>
                  <td className="p-4 font-sans text-slate-700 dark:text-slate-300 max-w-sm text-sm">{exp.description}</td>
                  <td className="p-4 text-slate-500 dark:text-slate-400">{exp.date}</td>
                  <td className="p-4 font-bold text-slate-900 dark:text-white text-sm">{formatCurrency(exp.amount)}</td>
                  <td className="p-4 font-sans">
                    <span className="inline-block px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">

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
          <form onSubmit={handleCreateExpense} className="space-y-4 text-sm">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">Expense Category *</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"

              >
                <option value="Cloud Infrastructure">Cloud Infrastructure (AWS Mumbai)</option>
                <option value="SaaS Tooling">SaaS Tooling (Datadog, Postmark, Sentry)</option>
                <option value="Regulatory & Legal">Regulatory & Legal (HIPAA / ISO)</option>
                <option value="Engineering & Ops">Engineering & Ops (Meta WhatsApp / Twilio)</option>
                <option value="Payment Gateway Reserve">Payment Gateway Reserve (Razorpay)</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">Amount (INR) *</label>

                <input
                  required
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g. 24000"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm font-mono font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"

                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">Expense Date *</label>

                <input
                  required
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"

                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">

                Description & Vendor Details *
              </label>
              <textarea
                required
                rows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter description, vendor invoice reference, or service scope..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">

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


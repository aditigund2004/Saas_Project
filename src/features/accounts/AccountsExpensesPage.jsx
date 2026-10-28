import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { CreditCard, Plus, Search, Calendar, DollarSign, X } from 'lucide-react';

export function AccountsExpensesPage() {
  const { expenses, addExpense, formatCurrency } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const [newExp, setNewExp] = useState({
    description: '',
    category: 'Supplies',
    amount: 2500,
    vendorName: '',
    paymentMethod: 'Bank Transfer / NEFT'
  });

  const categories = ['Supplies', 'Rent', 'Salaries', 'Utilities', 'Equipment', 'Maintenance', 'Marketing'];

  const filteredExpenses = expenses.filter((e) =>
    e.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.vendorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    e.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = (e) => {
    e.preventDefault();
    addExpense({
      ...newExp,
      amount: Number(newExp.amount),
      date: new Date().toISOString().slice(0, 10)
    });
    setModalOpen(false);
    setNewExp({
      description: '',
      category: 'Supplies',
      amount: 2500,
      vendorName: '',
      paymentMethod: 'Bank Transfer / NEFT'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-bold text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/60 px-2.5 py-1 rounded-full border border-rose-200 dark:border-rose-800 uppercase tracking-wide">
              Operational Expenditures
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Clinic Operational Expenses</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">

            Track overhead costs, surgical materials, clinic rent, staff salaries, and vendor disbursements
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={() => setModalOpen(true)} className="font-semibold shadow-sm">
          <Plus className="w-4 h-4 mr-1.5" />

          Record Clinic Expense
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />

        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by vendor, expense description, or category..."
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
        />
      </div>

      <Card className="overflow-hidden border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 font-bold border-b border-slate-200 dark:border-slate-800 uppercase tracking-wider text-xs">
              <tr>
                <th className="px-3 py-3 text-center w-12 font-bold">#</th>

                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Vendor / Payee</th>
                <th className="px-4 py-3">Payment Method</th>
                <th className="px-4 py-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredExpenses.map((exp, idx) => (
                <tr key={exp.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="px-3 py-3.5 text-center font-mono font-medium text-slate-400 dark:text-slate-500 text-xs">{idx + 1}</td>
                  <td className="px-4 py-3.5 font-mono text-slate-600 dark:text-slate-400">
                    {exp.date}
                  </td>
                  <td className="px-4 py-3.5">
                    <Badge variant="default" size="sm">{exp.category}</Badge>
                  </td>
                  <td className="px-4 py-3.5 font-bold text-slate-900 dark:text-white text-sm">
                    {exp.description}
                  </td>
                  <td className="px-4 py-3.5 text-slate-700 dark:text-slate-300">
                    {exp.vendorName}
                  </td>
                  <td className="px-4 py-3.5 text-slate-500 dark:text-slate-400 font-mono text-xs">
                    {exp.paymentMethod}
                  </td>
                  <td className="px-4 py-3.5 font-mono font-bold text-rose-700 dark:text-rose-400 text-right text-sm">

                    {formatCurrency(exp.amount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs cursor-pointer"
          onClick={() => setModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 w-full max-w-md p-6 space-y-4 cursor-default"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Record Clinic Expense
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">Expense Description *</label>

                <input
                  required
                  type="text"
                  value={newExp.description}
                  onChange={(e) => setNewExp({ ...newExp, description: e.target.value })}
                  placeholder="e.g. Biomedical waste disposal quarterly renewal"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">Category</label>
                  <select
                    value={newExp.category}
                    onChange={(e) => setNewExp({ ...newExp, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"

                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">Amount (₹) *</label>

                  <input
                    required
                    type="number"
                    min="1"
                    value={newExp.amount}
                    onChange={(e) => setNewExp({ ...newExp, amount: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-mono font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"

                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">Vendor / Payee</label>

                <input
                  type="text"
                  value={newExp.vendorName}
                  onChange={(e) => setNewExp({ ...newExp, vendorName: e.target.value })}
                  placeholder="e.g. BioSafe Solutions"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">

                <Button variant="secondary" size="sm" type="button" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  Record Expense
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


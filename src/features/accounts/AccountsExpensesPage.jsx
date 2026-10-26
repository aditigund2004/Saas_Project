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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200 uppercase tracking-wide">
              Operational Expenditures
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Clinic Operational Expenses</h1>
          <p className="text-xs text-slate-500">
            Track overhead costs, surgical materials, clinic rent, staff salaries, and vendor disbursements
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={() => setModalOpen(true)}>
          <Plus className="w-3.5 h-3.5 mr-1" />
          Record Clinic Expense
        </Button>
      </div>

      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by vendor, expense description, or category..."
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <Card className="overflow-hidden border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Vendor / Payee</th>
                <th className="px-4 py-3">Payment Method</th>
                <th className="px-4 py-3 text-right">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredExpenses.map((exp) => (
                <tr key={exp.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-3 font-mono text-slate-600">
                    {exp.date}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant="default" size="sm">{exp.category}</Badge>
                  </td>
                  <td className="px-4 py-3 font-semibold text-slate-900">
                    {exp.description}
                  </td>
                  <td className="px-4 py-3 text-slate-700">
                    {exp.vendorName}
                  </td>
                  <td className="px-4 py-3 text-slate-500 font-mono text-[11px]">
                    {exp.paymentMethod}
                  </td>
                  <td className="px-4 py-3 font-mono font-bold text-rose-700 text-right text-sm">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Plus className="w-4 h-4 text-blue-600" />
                Record Clinic Expense
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 mb-1 block">Expense Description *</label>
                <input
                  required
                  type="text"
                  value={newExp.description}
                  onChange={(e) => setNewExp({ ...newExp, description: e.target.value })}
                  placeholder="e.g. Biomedical waste disposal quarterly renewal"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 mb-1 block">Category</label>
                  <select
                    value={newExp.category}
                    onChange={(e) => setNewExp({ ...newExp, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 mb-1 block">Amount (₹) *</label>
                  <input
                    required
                    type="number"
                    min="1"
                    value={newExp.amount}
                    onChange={(e) => setNewExp({ ...newExp, amount: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 font-mono font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 mb-1 block">Vendor / Payee</label>
                <input
                  type="text"
                  value={newExp.vendorName}
                  onChange={(e) => setNewExp({ ...newExp, vendorName: e.target.value })}
                  placeholder="e.g. BioSafe Solutions"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
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


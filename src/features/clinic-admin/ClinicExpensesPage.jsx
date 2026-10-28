import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { CreditCard, PlusCircle, Tag, Calendar, Building2 } from 'lucide-react';

export function ClinicExpensesPage() {
  const { expenses, addExpense, activeClinic, activeBranch } = useApp();
  const [isNewExpenseOpen, setIsNewExpenseOpen] = useState(false);

  const [category, setCategory] = useState('Supplies');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState(2500);
  const [vendorName, setVendorName] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('UPI');

  const totalExpenses = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    addExpense({
      clinicId: activeClinic.id,
      branchId: activeBranch.id,
      category,
      description,
      amount,
      date: '2026-10-23',
      paymentMethod,
      vendorName
    });

    setIsNewExpenseOpen(false);
    setDescription('');
    setVendorName('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
<<<<<<< HEAD
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Practice Overheads</span>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Clinic Expense Logging</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
=======
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Practice Overheads</span>
          <h1 className="text-2xl font-extrabold text-slate-900">Clinic Expense Logging</h1>
          <p className="text-xs text-slate-500 mt-0.5">
>>>>>>> origin/main
            Log medical consumables purchases, equipment maintenance, facility rent, and utility bills.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={PlusCircle}
          onClick={() => setIsNewExpenseOpen(true)}
        >
          Record Expense
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
<<<<<<< HEAD
        <Card className="p-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <span className="text-xs uppercase font-bold text-slate-400 dark:text-slate-500">Total Month Overheads</span>
          <p className="text-2xl font-extrabold text-slate-900 dark:text-white font-mono mt-1">₹{totalExpenses.toLocaleString('en-IN')}</p>
          <span className="text-xs text-slate-500 dark:text-slate-400">{expenses.length} Logged Transactions</span>
        </Card>
      </div>

      <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
=======
        <Card className="p-4 border-slate-200">
          <span className="text-[10px] uppercase font-bold text-slate-400">Total Month Overheads</span>
          <p className="text-2xl font-extrabold text-slate-900 font-mono mt-1">₹{totalExpenses.toLocaleString('en-IN')}</p>
          <span className="text-[11px] text-slate-500">{expenses.length} Logged Transactions</span>
        </Card>
      </div>

      <Card>
>>>>>>> origin/main
        <CardHeader
          title="Operational Expense Ledger"
          subtitle="Showing all documented expenditures"
        />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
<<<<<<< HEAD
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 uppercase text-xs font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-3.5 text-center w-12">#</th>
=======
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-semibold border-b border-slate-200">
              <tr>
>>>>>>> origin/main
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Description</th>
                <th className="p-3.5">Vendor / Payee</th>
                <th className="p-3.5">Date</th>
                <th className="p-3.5">Amount</th>
                <th className="p-3.5">Payment Mode</th>
              </tr>
            </thead>
<<<<<<< HEAD
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {expenses.map((exp, idx) => (
                <tr key={exp.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition-colors">
                  <td className="p-3.5 text-center font-mono font-medium text-slate-400 dark:text-slate-500 text-xs">{idx + 1}</td>
                  <td className="p-3.5">
                    <span className="font-semibold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-full text-xs">
                      {exp.category}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-800 dark:text-slate-200 font-medium">{exp.description}</td>
                  <td className="p-3.5 text-slate-600 dark:text-slate-300">{exp.vendorName}</td>
                  <td className="p-3.5 text-slate-500 dark:text-slate-400 font-mono">{exp.date}</td>
                  <td className="p-3.5 font-bold font-mono text-slate-900 dark:text-white">
                    ₹{exp.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="p-3.5 text-slate-600 dark:text-slate-300">{exp.paymentMethod}</td>
=======
            <tbody className="divide-y divide-slate-100">
              {expenses.map((exp) => (
                <tr key={exp.id} className="hover:bg-slate-50/50">
                  <td className="p-3.5">
                    <span className="font-semibold text-slate-800 bg-slate-100 px-2.5 py-1 rounded-full text-[11px]">
                      {exp.category}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-800 font-medium">{exp.description}</td>
                  <td className="p-3.5 text-slate-600">{exp.vendorName}</td>
                  <td className="p-3.5 text-slate-500 font-mono">{exp.date}</td>
                  <td className="p-3.5 font-bold font-mono text-slate-900">
                    ₹{exp.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="p-3.5 text-slate-600">{exp.paymentMethod}</td>
>>>>>>> origin/main
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* New Expense Modal */}
      {isNewExpenseOpen && (
        <Modal
          isOpen={isNewExpenseOpen}
          onClose={() => setIsNewExpenseOpen(false)}
          title="Log Operational Expenditure"
          size="md"
        >
          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
<<<<<<< HEAD
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Expense Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
=======
                <label className="block font-semibold mb-1">Expense Category *</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl bg-white"
>>>>>>> origin/main
                >
                  <option value="Supplies">Clinical Supplies</option>
                  <option value="Equipment">Equipment & Tech</option>
                  <option value="Rent">Facility Rent</option>
                  <option value="Salaries">Staff Compensation</option>
                  <option value="Utilities">Utilities & Waste</option>
                  <option value="Maintenance">Maintenance</option>
                </select>
              </div>

              <div>
<<<<<<< HEAD
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Amount (INR) *</label>
=======
                <label className="block font-semibold mb-1">Amount (INR) *</label>
>>>>>>> origin/main
                <input
                  required
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(Number(e.target.value))}
<<<<<<< HEAD
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl font-mono bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
=======
                  className="w-full px-3 py-2 border rounded-xl font-mono"
>>>>>>> origin/main
                />
              </div>
            </div>

            <div>
<<<<<<< HEAD
              <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Description / Item Detail *</label>
=======
              <label className="block font-semibold mb-1">Description / Item Detail *</label>
>>>>>>> origin/main
              <input
                required
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="e.g. 10 Boxes Sterile Dental Disposables"
<<<<<<< HEAD
                className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
=======
                className="w-full px-3 py-2 border rounded-xl"
>>>>>>> origin/main
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
<<<<<<< HEAD
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Vendor / Payee Name</label>
=======
                <label className="block font-semibold mb-1">Vendor / Payee Name</label>
>>>>>>> origin/main
                <input
                  type="text"
                  value={vendorName}
                  onChange={(e) => setVendorName(e.target.value)}
                  placeholder="e.g. DentSupply Pharma"
<<<<<<< HEAD
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
=======
                  className="w-full px-3 py-2 border rounded-xl"
>>>>>>> origin/main
                />
              </div>

              <div>
<<<<<<< HEAD
                <label className="block font-semibold mb-1 text-slate-700 dark:text-slate-300">Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
=======
                <label className="block font-semibold mb-1">Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full px-3 py-2 border rounded-xl bg-white"
>>>>>>> origin/main
                >
                  <option value="Corporate Net Banking">Corporate Net Banking</option>
                  <option value="UPI">UPI</option>
                  <option value="Credit Card">Credit Card</option>
                  <option value="Cash">Cash</option>
                </select>
              </div>
            </div>

<<<<<<< HEAD
            <div className="pt-2 flex justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
=======
            <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
>>>>>>> origin/main
              <Button variant="outline" size="sm" onClick={() => setIsNewExpenseOpen(false)}>Cancel</Button>
              <Button variant="primary" size="sm" type="submit">Save Expense</Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
<<<<<<< HEAD
=======

>>>>>>> origin/main

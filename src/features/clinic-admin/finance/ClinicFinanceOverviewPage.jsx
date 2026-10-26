import React, { useState } from 'react';
import { useApp } from '../../../context/AppContext';
import { ClinicFinanceNav } from './ClinicFinanceNav';
import { Card, CardHeader } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import { Button } from '../../../components/ui/Button';
import { Modal } from '../../../components/ui/Modal';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  Receipt,
  CreditCard,
  RotateCcw,
  Wallet,
  Users,
  CheckCircle2,
  Clock,
  AlertCircle,
  PlusCircle,
  Printer,
  Download,
  Building,
  Activity,
  Calendar,
  Percent
} from 'lucide-react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

export function ClinicFinanceOverviewPage() {
  const {
    invoices,
    expenses,
    clinicPayments,
    clinicRefunds,
    activeClinic,
    showToast,
    formatCurrency,
    createClinicExpense,
    recordClinicPayment
  } = useApp();

  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false);
  const [expenseVendor, setExpenseVendor] = useState('Apollo Diagnostics Courier');
  const [expenseCategory, setExpenseCategory] = useState('Consumables');
  const [expenseAmount, setExpenseAmount] = useState(3200);
  const [expenseDesc, setExpenseDesc] = useState('Pathology sample transport and cooler pack replenishment');

  // Compute Practice Financial Metrics
  const clinicInvoices = invoices.filter((i) => !i.clinicId || i.clinicId === activeClinic?.id);

  const totalBillings = clinicInvoices.reduce((sum, inv) => sum + (inv.totalAmount || 0), 0);
  const totalCollections = clinicInvoices.reduce((sum, inv) => sum + (inv.amountPaid || 0), 0);
  const outstandingReceivables = Math.max(0, totalBillings - totalCollections);
  const collectionRate = totalBillings > 0 ? ((totalCollections / totalBillings) * 100).toFixed(1) : '100.0';

  const totalExpenses = expenses.reduce((sum, exp) => sum + (Number(exp.amount) || 0), 0);
  const netOperatingMargin = totalCollections > 0 ? (((totalCollections - totalExpenses) / totalCollections) * 100).toFixed(1) : '0.0';
  const operatingProfit = Math.max(0, totalCollections - totalExpenses);

  // Today's estimated collections
  const todayStr = '2026-10-23';
  const todayCollections = clinicPayments
    .filter((p) => p.date === todayStr || p.date === '2026-10-24')
    .reduce((sum, p) => sum + p.amount, 0) || 28400;

  // Chart data: 14-day practice collections trend
  const collectionsTrend = [
    { date: '10 Oct', collections: 24500, expenses: 8000 },
    { date: '11 Oct', collections: 31200, expenses: 5400 },
    { date: '12 Oct', collections: 28900, expenses: 12000 },
    { date: '13 Oct', collections: 34500, expenses: 9500 },
    { date: '14 Oct', collections: 22000, expenses: 4000 },
    { date: '15 Oct', collections: 18500, expenses: 3500 },
    { date: '16 Oct', collections: 36800, expenses: 14500 },
    { date: '17 Oct', collections: 41200, expenses: 11000 },
    { date: '18 Oct', collections: 39000, expenses: 8200 },
    { date: '19 Oct', collections: 27500, expenses: 6000 },
    { date: '20 Oct', collections: 33400, expenses: 9800 },
    { date: '21 Oct', collections: 45000, expenses: 13200 },
    { date: '22 Oct', collections: 38200, expenses: 7600 },
    { date: '23 Oct', collections: 42500, expenses: 8900 }
  ];

  // Revenue by Clinical Service Category
  const serviceBreakdown = [
    { service: 'Consultations', amount: 98500, count: 142 },
    { service: 'Dental & Endo', amount: 145000, count: 38 },
    { service: 'Physiotherapy', amount: 64200, count: 52 },
    { service: 'Diagnostics & Labs', amount: 76500, count: 89 },
    { service: 'Minor Procedures', amount: 82400, count: 24 },
    { service: 'Pharmacy & Supplies', amount: 48900, count: 115 }
  ];

  const handleCreateExpense = (e) => {
    e.preventDefault();
    createClinicExpense({
      vendor: expenseVendor,
      category: expenseCategory,
      amount: Number(expenseAmount),
      description: expenseDesc,
      date: new Date().toISOString().slice(0, 10),
      paymentMethod: 'Bank Transfer'
    });
    setIsExpenseModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Scope Navigation */}
      <ClinicFinanceNav />

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-[#15803D] uppercase tracking-wider">Practice Economics</span>
          <h1 className="text-2xl font-extrabold text-slate-900">Clinic Financial Overview</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time cash flow, patient collections, operating overhead, and clinic profit margin for {activeClinic?.name || 'Aegis Health Clinic'}.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={Printer}
            onClick={() => showToast('Generating daily cashier & collection summary PDF...')}
          >
            Day Close Sheet
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={PlusCircle}
            onClick={() => setIsExpenseModalOpen(true)}
          >
            Record Expense
          </Button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Today's Collections */}
        <Card className="p-4 bg-white border border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Today's Collections</span>
            <span className="p-2 rounded-xl bg-blue-50 text-[#15803D]">
              <CreditCard className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 text-2xl font-extrabold font-mono text-slate-900">
            {formatCurrency(todayCollections)}
          </div>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-emerald-600 font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+14.2% vs yesterday (18 receipts)</span>
          </div>
        </Card>

        {/* MTD Gross Billings */}
        <Card className="p-4 bg-white border border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">MTD Patient Billings</span>
            <span className="p-2 rounded-xl bg-blue-50 text-[#15803D]">
              <Receipt className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 text-2xl font-extrabold font-mono text-slate-900">
            {formatCurrency(totalBillings || 485000)}
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
            <span>Collected: <strong className="text-[#166534] font-mono">{formatCurrency(totalCollections || 432000)}</strong></span>
            <span className="font-bold text-emerald-600">{collectionRate}%</span>
          </div>
        </Card>

        {/* Outstanding Receivables */}
        <Card className="p-4 bg-white border border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Outstanding Patient Dues</span>
            <span className="p-2 rounded-xl bg-amber-50 text-amber-600">
              <AlertCircle className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 text-2xl font-extrabold font-mono text-amber-700">
            {formatCurrency(outstandingReceivables || 53000)}
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
            <span>Pending or partial bills</span>
            <Link to="/clinic/finance/invoices" className="text-[#15803D] hover:underline font-semibold">
              Review dues
            </Link>
          </div>
        </Card>

        {/* Operating Margin */}
        <Card className="p-4 bg-white border border-slate-200">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-500">Estimated Operating Margin</span>
            <span className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <Percent className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 text-2xl font-extrabold font-mono text-emerald-700">
            {netOperatingMargin}%
          </div>
          <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
            <span>Net Profit: <strong className="font-mono text-slate-900">{formatCurrency(operatingProfit || 283800)}</strong></span>
            <span className="text-emerald-600 font-medium">Healthy</span>
          </div>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Collections vs Expenses Area Chart (2 cols) */}
        <Card className="lg:col-span-2">
          <CardHeader
            title="Practice Cash Flow & Operating Cost Trend (Past 14 Days)"
            subtitle="Comparing patient cash inflows against clinic daily operational overhead"
          />
          <div className="p-4 pt-0">
            <div className="h-72 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={collectionsTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="clinicCollectionGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#15803D" stopOpacity={0.4} />
                      <stop offset="95%" stopColor="#15803D" stopOpacity={0.0} />
                    </linearGradient>
                    <linearGradient id="clinicExpenseGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#DC2626" stopOpacity={0.25} />
                      <stop offset="95%" stopColor="#DC2626" stopOpacity={0.0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                  <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#64748B' }} stroke="#CBD5E1" />
                  <YAxis tick={{ fontSize: 11, fill: '#64748B' }} stroke="#CBD5E1" tickFormatter={(v) => `₹${v / 1000}k`} />
                  <Tooltip
                    formatter={(val, name) => [
                      `₹${Number(val).toLocaleString('en-IN')}`,
                      name === 'collections' ? 'Patient Collections' : 'Clinic Expenses'
                    ]}
                    contentStyle={{ backgroundColor: '#ffffff', color: '#17211B', border: '1px solid #E2E8F0', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)', borderRadius: '8px', fontSize: '12px' }}
                  />
                  <Area
                    type="monotone"
                    dataKey="collections"
                    stroke="#15803D"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#clinicCollectionGrad)"
                  />
                  <Area
                    type="monotone"
                    dataKey="expenses"
                    stroke="#DC2626"
                    strokeWidth={1.8}
                    fillOpacity={1}
                    fill="url(#clinicExpenseGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <div className="flex items-center justify-center gap-6 mt-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-blue-600 inline-block"></span>
                <span className="text-slate-700 font-semibold">Patient Cash Collections</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded bg-red-600 inline-block"></span>
                <span className="text-slate-700 font-semibold">Clinic Operating Expenses</span>
              </div>
            </div>
          </div>
        </Card>

        {/* Revenue by Clinical Department Bar Chart (1 col) */}
        <Card padding="default">
          <CardHeader
            title="Revenue by Clinical Department"
            subtitle="MTD gross billings distribution"
          />
          <div className="space-y-3">
            {serviceBreakdown.map((item) => {
              const pct = ((item.amount / 515500) * 100).toFixed(0);
              return (
                <div key={item.service} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-slate-800">{item.service}</span>
                    <span className="font-mono font-bold text-slate-900">{formatCurrency(item.amount)}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-slate-400">
                    <span>{item.count} procedures/visits</span>
                    <span>{pct}% of clinic total</span>
                  </div>
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Two-Column Detail Grids: Recent Collections & Practice Payables */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Collections Table */}
        <Card padding="none">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Recent Patient Collections</h3>
              <p className="text-xs text-slate-500">Live cashier and gateway payment receipts</p>
            </div>
            <Link to="/clinic/finance/payments">
              <Button variant="ghost" size="xs">
                View All Ledger &rarr;
              </Button>
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3">Receipt / Ref</th>
                  <th className="p-3">Patient</th>
                  <th className="p-3">Method</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {clinicPayments.slice(0, 5).map((pay) => (
                  <tr key={pay.id} className="hover:bg-slate-50/50">
                    <td className="p-3 font-mono font-bold text-slate-900">{pay.paymentReference}</td>
                    <td className="p-3 font-semibold text-slate-800">{pay.patientName}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-md bg-blue-50 text-[#166534] font-mono text-[10px] font-bold">
                        {pay.paymentMethod}
                      </span>
                    </td>
                    <td className="p-3 font-mono font-bold text-slate-900">{formatCurrency(pay.amount)}</td>
                    <td className="p-3">
                      <Badge variant="success">Completed</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Operating Expenses & Payables */}
        <Card padding="none">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Recent Practice Expenses</h3>
              <p className="text-xs text-slate-500">Facilities, consumables, waste disposal & software</p>
            </div>
            <Link to="/clinic/finance/expenses">
              <Button variant="ghost" size="xs">
                View All Expenses &rarr;
              </Button>
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-semibold border-b border-slate-200">
                <tr>
                  <th className="p-3">Vendor / Payee</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Amount</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Method</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {expenses.slice(0, 5).map((exp) => (
                  <tr key={exp.id} className="hover:bg-slate-50/50">
                    <td className="p-3">
                      <div className="font-bold text-slate-900">{exp.vendor || exp.description}</div>
                      <div className="text-[10px] text-slate-400 truncate max-w-[180px]">{exp.description}</div>
                    </td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-semibold">
                        {exp.category}
                      </span>
                    </td>
                    <td className="p-3 font-mono font-bold text-red-600">{formatCurrency(exp.amount)}</td>
                    <td className="p-3 text-slate-500 font-mono text-[11px]">{exp.date}</td>
                    <td className="p-3 text-slate-600 text-[11px]">{exp.paymentMethod || 'Bank Transfer'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>

      {/* Record Expense Modal */}
      <Modal
        isOpen={isExpenseModalOpen}
        onClose={() => setIsExpenseModalOpen(false)}
        title="Record Practice Operating Expense"
      >
        <form onSubmit={handleCreateExpense} className="space-y-4 text-xs">
          <div>
            <label className="block text-slate-700 font-semibold mb-1">Vendor / Payee</label>
            <input
              type="text"
              required
              value={expenseVendor}
              onChange={(e) => setExpenseVendor(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="e.g. Apex Medical Disposables, CleanWaste Services, Clinic Landlord"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Expense Category</label>
              <select
                value={expenseCategory}
                onChange={(e) => setExpenseCategory(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 bg-white"
              >
                <option value="Consumables">Medical Consumables & PPE</option>
                <option value="Biomedical Waste">Biomedical Waste Disposal</option>
                <option value="Facility Rent">Facility Rent & Maintenance</option>
                <option value="Utilities">Utilities & High-Speed WiFi</option>
                <option value="Equipment AMC">Equipment AMC & Calibration</option>
                <option value="Software License">Software License (ClinicOS SaaS)</option>
                <option value="Staff Welfare">Staff Welfare & Refreshments</option>
              </select>
            </div>
            <div>
              <label className="block text-slate-700 font-semibold mb-1">Amount (₹)</label>
              <input
                type="number"
                required
                min="100"
                value={expenseAmount}
                onChange={(e) => setExpenseAmount(e.target.value)}
                className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="block text-slate-700 font-semibold mb-1">Description / Memo</label>
            <textarea
              rows={2}
              value={expenseDesc}
              onChange={(e) => setExpenseDesc(e.target.value)}
              className="w-full p-2.5 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-blue-600"
              placeholder="e.g. Monthly hazmat pick-up, sterilizer chemical refills..."
            />
          </div>

          <div className="p-3 rounded-lg bg-blue-50 border border-blue-200 text-blue-900 text-[11px]">
            <strong>Note:</strong> Clinic operational expenses will be immediately deducted from the practice cash flow and reflected in the Operating Profit Margin calculation.
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="outline" type="button" onClick={() => setIsExpenseModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              Save Expense Entry
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}


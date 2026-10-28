import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { ShoppingBag, Plus, Search, Calendar, FileText, CheckCircle2, X } from 'lucide-react';

export function InventoryOrdersPage() {
  const { purchaseOrders, suppliers, createPurchaseOrder, updatePurchaseOrderStatus, formatCurrency } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [modalOpen, setModalOpen] = useState(false);

  const [newPo, setNewPo] = useState({
    supplierName: 'SeptoDent India Pvt Ltd',
    itemsCount: 5,
    totalAmount: 7000
  });

  const filteredOrders = purchaseOrders.filter(
    (po) =>
      po.poNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      po.supplierName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreate = (e) => {
    e.preventDefault();
    createPurchaseOrder({
      ...newPo,
      itemsCount: Number(newPo.itemsCount),
      totalAmount: Number(newPo.totalAmount)
    });
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
<<<<<<< HEAD
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-full border border-blue-200 dark:border-blue-800 uppercase tracking-wide">
              Procurement & Purchase Orders
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Purchase Orders</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
=======
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200 uppercase tracking-wide">
              Procurement & Purchase Orders
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Purchase Orders</h1>
          <p className="text-xs text-slate-500">
>>>>>>> origin/main
            Replenishment orders issued to pharmaceutical manufacturers & authorized distributors
          </p>
        </div>

<<<<<<< HEAD
        <Button variant="primary" size="sm" onClick={() => setModalOpen(true)} className="font-semibold shadow-sm">
          <Plus className="w-4 h-4 mr-1.5" />
=======
        <Button variant="primary" size="sm" onClick={() => setModalOpen(true)}>
          <Plus className="w-3.5 h-3.5 mr-1" />
>>>>>>> origin/main
          Create Purchase Order
        </Button>
      </div>

      <div className="relative max-w-md">
<<<<<<< HEAD
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
=======
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
>>>>>>> origin/main
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by PO number (e.g. PO-2026-088) or supplier..."
<<<<<<< HEAD
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
        />
      </div>

      <Card className="overflow-hidden border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 font-bold border-b border-slate-200 dark:border-slate-800 uppercase tracking-wider text-xs">
              <tr>
                <th className="px-3 py-3 text-center w-12 font-bold">#</th>
=======
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <Card className="overflow-hidden border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
>>>>>>> origin/main
                <th className="px-4 py-3">PO Number</th>
                <th className="px-4 py-3">Supplier Name</th>
                <th className="px-4 py-3">Order Date</th>
                <th className="px-4 py-3">Expected Delivery</th>
                <th className="px-4 py-3">Items Count</th>
                <th className="px-4 py-3">Total Value</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
<<<<<<< HEAD
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={9} className="px-4 py-8 text-center text-slate-400 dark:text-slate-500">
=======
            <tbody className="divide-y divide-slate-100">
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-slate-400">
>>>>>>> origin/main
                    No purchase orders found.
                  </td>
                </tr>
              ) : (
<<<<<<< HEAD
                filteredOrders.map((po, idx) => (
                  <tr key={po.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-3 py-3.5 text-center font-mono font-medium text-slate-400 dark:text-slate-500 text-xs">{idx + 1}</td>
                    <td className="px-4 py-3.5 font-mono font-bold text-blue-700 dark:text-blue-400">
                      {po.poNumber}
                    </td>
                    <td className="px-4 py-3.5 font-bold text-slate-900 dark:text-white text-sm">
                      {po.supplierName}
                    </td>
                    <td className="px-4 py-3.5 font-mono text-slate-600 dark:text-slate-400">
                      {po.orderDate}
                    </td>
                    <td className="px-4 py-3.5 font-mono text-slate-600 dark:text-slate-400">
                      {po.deliveryDate || 'Within 48h'}
                    </td>
                    <td className="px-4 py-3.5 font-semibold text-slate-700 dark:text-slate-300">
                      {po.itemsCount} SKUs
                    </td>
                    <td className="px-4 py-3.5 font-mono font-bold text-slate-900 dark:text-white text-sm">
                      {formatCurrency(po.totalAmount)}
                    </td>
                    <td className="px-4 py-3.5">
=======
                filteredOrders.map((po) => (
                  <tr key={po.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-mono font-bold text-blue-700">
                      {po.poNumber}
                    </td>
                    <td className="px-4 py-3 font-bold text-slate-900">
                      {po.supplierName}
                    </td>
                    <td className="px-4 py-3 font-mono text-slate-600">
                      {po.orderDate}
                    </td>
                    <td className="px-4 py-3 font-mono text-slate-600">
                      {po.deliveryDate || 'Within 48h'}
                    </td>
                    <td className="px-4 py-3 font-semibold text-slate-700">
                      {po.itemsCount} SKUs
                    </td>
                    <td className="px-4 py-3 font-mono font-bold text-slate-900">
                      {formatCurrency(po.totalAmount)}
                    </td>
                    <td className="px-4 py-3">
>>>>>>> origin/main
                      <Badge
                        variant={
                          po.status === 'Delivered' ? 'success' :
                          po.status === 'Sent' ? 'teal' : 'default'
                        }
                        size="sm"
                      >
                        {po.status}
                      </Badge>
                    </td>
<<<<<<< HEAD
                    <td className="px-4 py-3.5 text-right whitespace-nowrap">
=======
                    <td className="px-4 py-3 text-right">
>>>>>>> origin/main
                      {po.status === 'Sent' ? (
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => updatePurchaseOrderStatus(po.id, 'Delivered')}
<<<<<<< HEAD
                          className="h-8 text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
                          Mark Delivered
                        </Button>
                      ) : (
                        <span className="text-xs text-slate-400 dark:text-slate-500 italic">Fulfilled</span>
=======
                          className="h-7 text-xs bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100"
                        >
                          <CheckCircle2 className="w-3 h-3 mr-1" />
                          Mark Delivered
                        </Button>
                      ) : (
                        <span className="text-[11px] text-slate-400 italic">Fulfilled</span>
>>>>>>> origin/main
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modal */}
      {modalOpen && (
<<<<<<< HEAD
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
                Draft New Purchase Order
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">Select Supplier *</label>
                <select
                  value={newPo.supplierName}
                  onChange={(e) => setNewPo({ ...newPo, supplierName: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
=======
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Plus className="w-4 h-4 text-blue-600" />
                Draft New Purchase Order
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 mb-1 block">Select Supplier *</label>
                <select
                  value={newPo.supplierName}
                  onChange={(e) => setNewPo({ ...newPo, supplierName: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white"
>>>>>>> origin/main
                >
                  {suppliers.map((s) => (
                    <option key={s.id} value={s.name}>{s.name} ({s.city})</option>
                  ))}
                </select>
              </div>

<<<<<<< HEAD
              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">Number of SKUs</label>
=======
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 mb-1 block">Number of SKUs</label>
>>>>>>> origin/main
                  <input
                    type="number"
                    min="1"
                    value={newPo.itemsCount}
                    onChange={(e) => setNewPo({ ...newPo, itemsCount: e.target.value })}
<<<<<<< HEAD
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">Estimated Total (₹)</label>
=======
                    className="w-full px-3 py-2 rounded-lg border border-slate-200"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 mb-1 block">Estimated Total (₹)</label>
>>>>>>> origin/main
                  <input
                    type="number"
                    min="100"
                    value={newPo.totalAmount}
                    onChange={(e) => setNewPo({ ...newPo, totalAmount: e.target.value })}
<<<<<<< HEAD
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-mono font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"
=======
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 font-mono font-bold"
>>>>>>> origin/main
                  />
                </div>
              </div>

<<<<<<< HEAD
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
=======
              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
>>>>>>> origin/main
                <Button variant="secondary" size="sm" type="button" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  Dispatch Purchase Order
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
<<<<<<< HEAD
=======

>>>>>>> origin/main

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Package, PlusCircle, AlertTriangle, ArrowUpDown, Search, CheckCircle } from 'lucide-react';

export function ClinicInventoryPage() {
  const { inventory, updateStock, showToast } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [adjustModal, setAdjustModal] = useState({ isOpen: false, item: null, delta: 1 });

  const filteredItems = inventory.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdjustStock = () => {
    if (!adjustModal.item) return;
    updateStock(adjustModal.item.id, adjustModal.delta);
    setAdjustModal({ isOpen: false, item: null, delta: 1 });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Supplies & Consumables</span>
          <h1 className="text-2xl font-extrabold text-slate-900">Clinical Inventory Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Monitor medical disposables, anesthetics, sterile gloves, and consumables with automated low-stock warnings.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => showToast('Purchase order generation simulated.')}
        >
          Create Purchase Order
        </Button>
      </div>

      {/* Search */}
      <Card className="p-4 border-slate-200">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search items by name, SKU reference, or category..."
            className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
      </Card>

      <Card>
        <CardHeader
          title={`Tracked Inventory Items (${filteredItems.length})`}
          subtitle="Real-time stock quantities and minimum threshold triggers"
        />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3.5">Item & SKU</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Unit Package</th>
                <th className="p-3.5">Current Stock</th>
                <th className="p-3.5">Min Threshold</th>
                <th className="p-3.5">Supplier</th>
                <th className="p-3.5">Stock Status</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredItems.map((item) => {
                const isLow = item.currentStock <= item.minStockLevel;

                return (
                  <tr key={item.id} className="hover:bg-slate-50/50">
                    <td className="p-3.5">
                      <div className="font-bold text-slate-900">{item.name}</div>
                      <div className="font-mono text-[10px] text-slate-400 font-bold">{item.sku}</div>
                    </td>
                    <td className="p-3.5 text-slate-700 font-medium">{item.category}</td>
                    <td className="p-3.5 text-slate-600">{item.unit}</td>
                    <td className="p-3.5 font-bold font-mono text-sm text-slate-900">
                      {item.currentStock}
                    </td>
                    <td className="p-3.5 font-mono text-slate-500">
                      Min: {item.minStockLevel}
                    </td>
                    <td className="p-3.5 text-slate-600">{item.supplier}</td>
                    <td className="p-3.5">
                      {isLow ? (
                        <span className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-700 bg-rose-50 px-2 py-0.5 rounded border border-rose-200">
                          <AlertTriangle className="w-3 h-3 text-rose-600" /> Low Stock
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                          <CheckCircle className="w-3 h-3 text-emerald-600" /> In Stock
                        </span>
                      )}
                    </td>
                    <td className="p-3.5 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setAdjustModal({ isOpen: true, item, delta: 5 })}
                        >
                          + Restock
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setAdjustModal({ isOpen: true, item, delta: -1 })}
                        >
                          - Dispense
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Adjust Stock Modal */}
      {adjustModal.isOpen && adjustModal.item && (
        <Modal
          isOpen={adjustModal.isOpen}
          onClose={() => setAdjustModal({ isOpen: false, item: null, delta: 1 })}
          title={`Adjust Stock: ${adjustModal.item.name}`}
          size="sm"
        >
          <div className="space-y-4 text-xs">
            <p className="text-slate-600">
              Current recorded quantity: <strong>{adjustModal.item.currentStock} {adjustModal.item.unit}</strong>.
            </p>

            <div>
              <label className="block font-semibold mb-1">Adjustment Delta (Positive to restock, Negative to dispense):</label>
              <input
                type="number"
                value={adjustModal.delta}
                onChange={(e) => setAdjustModal({ ...adjustModal, delta: Number(e.target.value) })}
                className="w-full px-3 py-2 border rounded-xl font-mono text-sm font-bold"
              />
            </div>

            <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
              <Button variant="outline" size="sm" onClick={() => setAdjustModal({ isOpen: false, item: null, delta: 1 })}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={handleAdjustStock}>
                Confirm Adjustment
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}


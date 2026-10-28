import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
  Package,
  Search,
  Plus,
  SlidersHorizontal,
  Edit2,
  ArrowRightLeft,
  AlertTriangle,
  X,
  CheckCircle2,
  Calendar
} from 'lucide-react';

export function InventoryCatalogPage() {
  const {
    inventory,
    addInventoryItem,
    updateInventoryItem,
    adjustStock,
    formatCurrency,
    currentUser
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');

  // Modal States
  const [addItemModalOpen, setAddItemModalOpen] = useState(false);
  const [adjustModalOpen, setAdjustModalOpen] = useState(false);
  const [selectedItemForAdjust, setSelectedItemForAdjust] = useState(null);

  // New Item Form
  const [newItem, setNewItem] = useState({
    name: '',
    category: 'Sterile Disposables',
    sku: '',
    unit: 'Boxes',
    batchNumber: '',
    expiryDate: '2028-06-30',
    currentStock: 10,
    minStockLevel: 5,
    costPerUnit: 500,
    supplier: 'CareLine Healthcare Logistics'
  });

  // Adjust Form
  const [adjustData, setAdjustData] = useState({
    delta: 5,
    reason: 'Restock shipment received',
    isAddition: true
  });

  const categories = ['All', 'Sterile Disposables', 'Anesthetics', 'PPE & Safety', 'Endodontics', 'Oral Antibiotics', 'Analgesics', 'Restorative'];

  const filteredItems = inventory.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.batchNumber && item.batchNumber.toLowerCase().includes(searchTerm.toLowerCase())) ||
      item.supplier.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || item.category === categoryFilter;
    const matchesStatus =
      statusFilter === 'All' ||
      (statusFilter === 'Low Stock' && item.currentStock <= item.minStockLevel) ||
      (statusFilter === 'Expiring Soon' && item.status === 'Expiring Soon') ||
      (statusFilter === 'In Stock' && item.currentStock > item.minStockLevel);
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleCreateItem = (e) => {
    e.preventDefault();
    addInventoryItem({
      ...newItem,
      currentStock: Number(newItem.currentStock),
      minStockLevel: Number(newItem.minStockLevel),
      costPerUnit: Number(newItem.costPerUnit)
    });
    setAddItemModalOpen(false);
    setNewItem({
      name: '',
      category: 'Sterile Disposables',
      sku: `SKU-${Date.now().toString().slice(-4)}`,
      unit: 'Boxes',
      batchNumber: `BT-${Date.now().toString().slice(-4)}`,
      expiryDate: '2028-06-30',
      currentStock: 10,
      minStockLevel: 5,
      costPerUnit: 500,
      supplier: 'CareLine Healthcare Logistics'
    });
  };

  const handleOpenAdjust = (item) => {
    setSelectedItemForAdjust(item);
    setAdjustData({
      delta: 5,
      reason: 'Physical count adjustment',
      isAddition: true
    });
    setAdjustModalOpen(true);
  };

  const handleConfirmAdjust = (e) => {
    e.preventDefault();
    if (!selectedItemForAdjust) return;
    const qty = adjustData.isAddition ? Math.abs(Number(adjustData.delta)) : -Math.abs(Number(adjustData.delta));
    const success = adjustStock(
      selectedItemForAdjust.id,
      qty,
      adjustData.reason,
      currentUser?.name || 'Inventory Staff'
    );
    if (success) {
      setAdjustModalOpen(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-full border border-blue-200 dark:border-blue-800 uppercase tracking-wide">
              Catalog Management
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Medicine & Supplies Catalog</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">

            Real-time multi-batch inventory catalog, expiry dates, and stock adjustment auditing
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={() => setAddItemModalOpen(true)} className="font-semibold shadow-sm">
          <Plus className="w-4 h-4 mr-1.5" />

          Add Inventory SKU
        </Button>
      </div>

      {/* Filters and Search Bar */}
      <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search catalog by name, SKU (e.g. MED-KIT-01), batch number, or supplier..."
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="text-xs border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-200 font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"

          >
            {categories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-200 font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"

          >
            <option value="All">All Statuses</option>
            <option value="In Stock">In Stock</option>
            <option value="Low Stock">Low Stock Alert</option>
            <option value="Expiring Soon">Expiring Soon</option>
          </select>
        </div>
      </div>

      {/* Catalog Table */}
      <Card className="overflow-hidden border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 font-bold border-b border-slate-200 dark:border-slate-800 uppercase tracking-wider text-xs">
              <tr>
                <th className="px-3 py-3 text-center w-12 font-bold">#</th>

                <th className="px-4 py-3">Product Name & Category</th>
                <th className="px-4 py-3">SKU</th>
                <th className="px-4 py-3">Batch #</th>
                <th className="px-4 py-3">Expiry Date</th>
                <th className="px-4 py-3">Available Stock</th>
                <th className="px-4 py-3">Unit Cost</th>
                <th className="px-4 py-3">Supplier</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredItems.length === 0 ? (
                <tr>
                  <td colSpan={10} className="px-4 py-8 text-center text-slate-400 dark:text-slate-500">

                    No inventory items matched your criteria.
                  </td>
                </tr>
              ) : (
                filteredItems.map((item, idx) => {
                  const isLow = item.currentStock <= item.minStockLevel;
                  return (
                    <tr key={item.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-3 py-3.5 text-center font-mono font-medium text-slate-400 dark:text-slate-500 text-xs">{idx + 1}</td>
                      <td className="px-4 py-3.5">
                        <div className="font-bold text-slate-900 dark:text-white text-sm">{item.name}</div>
                        <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{item.category}</div>
                      </td>
                      <td className="px-4 py-3.5 font-mono font-semibold text-slate-700 dark:text-slate-300">
                        {item.sku}
                      </td>
                      <td className="px-4 py-3.5 font-mono text-slate-600 dark:text-slate-400">
                        {item.batchNumber || 'N/A'}
                      </td>
                      <td className="px-4 py-3.5 font-mono">
                        <span className={item.status === 'Expiring Soon' ? 'text-amber-700 dark:text-amber-400 font-bold' : 'text-slate-600 dark:text-slate-400'}>
                          {item.expiryDate || 'N/A'}
                        </span>
                      </td>
                      <td className="px-4 py-3.5">
                        <div className="font-mono font-bold text-sm">
                          <span className={isLow ? 'text-rose-700 dark:text-rose-400' : 'text-slate-900 dark:text-white'}>
                            {item.currentStock}
                          </span>{' '}
                          <span className="text-xs font-normal text-slate-500 dark:text-slate-400">{item.unit}</span>
                        </div>
                        <div className="text-xs text-slate-400 dark:text-slate-500">Min: {item.minStockLevel}</div>
                      </td>
                      <td className="px-4 py-3.5 font-mono text-slate-700 dark:text-slate-300">
                        {formatCurrency(item.costPerUnit)}
                      </td>
                      <td className="px-4 py-3.5 text-slate-600 dark:text-slate-400">
                        {item.supplier}
                      </td>
                      <td className="px-4 py-3.5">

                        <Badge
                          variant={
                            isLow ? 'danger' :
                            item.status === 'Expiring Soon' ? 'warning' : 'success'
                          }
                          size="sm"
                        >
                          {isLow ? 'Low Stock' : item.status || 'In Stock'}
                        </Badge>
                      </td>
                      <td className="px-4 py-3.5 text-right whitespace-nowrap">

                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleOpenAdjust(item)}
                          className="h-8 text-xs font-semibold"
                          title="Adjust or receive stock"
                        >
                          <ArrowRightLeft className="w-3.5 h-3.5 mr-1 text-blue-600 dark:text-blue-400" />

                          Adjust
                        </Button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Add Item Modal */}
      {addItemModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs cursor-pointer"
          onClick={() => setAddItemModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 w-full max-w-lg p-6 space-y-4 cursor-default"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Add New Inventory SKU
              </h3>
              <button onClick={() => setAddItemModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateItem} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">Product Name *</label>

                <input
                  required
                  type="text"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  placeholder="e.g. Paracetamol 650mg Tablets"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">Category</label>
                  <select
                    value={newItem.category}
                    onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"

                  >
                    {categories.filter(c => c !== 'All').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">SKU Code *</label>

                  <input
                    required
                    type="text"
                    value={newItem.sku}
                    onChange={(e) => setNewItem({ ...newItem, sku: e.target.value })}
                    placeholder="e.g. MED-PCM-09"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"

                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">Batch Number</label>

                  <input
                    type="text"
                    value={newItem.batchNumber}
                    onChange={(e) => setNewItem({ ...newItem, batchNumber: e.target.value })}
                    placeholder="e.g. BT-2026-901"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">Expiry Date</label>

                  <input
                    type="date"
                    value={newItem.expiryDate}
                    onChange={(e) => setNewItem({ ...newItem, expiryDate: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"

                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3.5">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">Initial Stock</label>

                  <input
                    type="number"
                    min="0"
                    value={newItem.currentStock}
                    onChange={(e) => setNewItem({ ...newItem, currentStock: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">Min Alert Level</label>

                  <input
                    type="number"
                    min="1"
                    value={newItem.minStockLevel}
                    onChange={(e) => setNewItem({ ...newItem, minStockLevel: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">Unit</label>

                  <input
                    type="text"
                    value={newItem.unit}
                    onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                    placeholder="Boxes"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"

                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">Supplier Name</label>

                <input
                  type="text"
                  value={newItem.supplier}
                  onChange={(e) => setNewItem({ ...newItem, supplier: e.target.value })}
                  placeholder="e.g. CareLine Healthcare"
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">

                <Button variant="secondary" size="sm" type="button" onClick={() => setAddItemModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  Save SKU to Catalog
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Adjust Stock Modal */}
      {adjustModalOpen && selectedItemForAdjust && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs cursor-pointer"
          onClick={() => setAdjustModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 w-full max-w-md p-6 space-y-4 cursor-default"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  <ArrowRightLeft className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  Stock Adjustment & Movement
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">{selectedItemForAdjust.name}</p>
              </div>
              <button onClick={() => setAdjustModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleConfirmAdjust} className="space-y-3.5 text-xs">
              <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-800 flex justify-between items-center">
                <span className="text-slate-600 dark:text-slate-300">Current Store Stock:</span>
                <strong className="font-mono text-slate-900 dark:text-white text-sm">

                  {selectedItemForAdjust.currentStock} {selectedItemForAdjust.unit}
                </strong>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">Adjustment Type</label>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setAdjustData({ ...adjustData, isAddition: true })}
                    className={`py-2 rounded-lg font-bold border text-xs cursor-pointer transition-colors ${
                      adjustData.isAddition
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 border-emerald-300 dark:border-emerald-800'
                        : 'bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800'

                    }`}
                  >
                    + Add / Receive Stock
                  </button>
                  <button
                    type="button"
                    onClick={() => setAdjustData({ ...adjustData, isAddition: false })}
                    className={`py-2 rounded-lg font-bold border text-xs cursor-pointer transition-colors ${
                      !adjustData.isAddition
                        ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-800 dark:text-rose-400 border-rose-300 dark:border-rose-800'
                        : 'bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800'

                    }`}
                  >
                    - Deduct / Written Off
                  </button>
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">Quantity ({selectedItemForAdjust.unit})</label>

                <input
                  required
                  type="number"
                  min="1"
                  value={adjustData.delta}
                  onChange={(e) => setAdjustData({ ...adjustData, delta: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-mono font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none"

                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">Audit Reason *</label>
                <select
                  value={adjustData.reason}
                  onChange={(e) => setAdjustData({ ...adjustData, reason: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"

                >
                  <option value="Restock shipment received from vendor">Restock shipment received</option>
                  <option value="Routine physical count correction">Routine physical count correction</option>
                  <option value="Dispensed directly to operatory">Dispensed directly to operatory</option>
                  <option value="Damaged in handling / Broken seal">Damaged in handling / Broken seal</option>
                  <option value="Expired batch quarantined for return">Expired batch quarantined for return</option>
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">

                <Button variant="secondary" size="sm" type="button" onClick={() => setAdjustModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  Record Stock Movement
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


import React from 'react';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Package, AlertTriangle, CheckCircle } from 'lucide-react';

export function ReceptionInventoryPage() {
  const { inventory, updateStock } = useApp();

  const lowStockCount = inventory.filter((item) => item.currentStock <= item.minStockLevel).length;

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Front Desk Stock</span>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">Front Desk Supplies Checklist</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Reception-accessible supplies tracking for thermal receipts, prescription stationery, and patient hygiene disposables.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 border-slate-200 dark:border-slate-800 dark:bg-slate-900/90 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Tracked Items</p>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">{inventory.length}</p>
          </div>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Desk Inventory</span>
        </Card>
        <Card className="p-4 border-slate-200 dark:border-slate-800 dark:bg-slate-900/90 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Low Stock Warnings</p>
            <p className="text-2xl font-extrabold text-rose-600 dark:text-rose-400 mt-1">{lowStockCount}</p>
          </div>
          <span className="text-xs font-medium text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-2.5 py-1 rounded-lg">Action Needed</span>
        </Card>
        <Card className="p-4 border-slate-200 dark:border-slate-800 dark:bg-slate-900/90 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Adequately Stocked</p>
            <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">{inventory.length - lowStockCount}</p>
          </div>
          <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-lg">Good Supply</span>
        </Card>
      </div>

      <Card className="border-slate-200 dark:border-slate-800 dark:bg-slate-900/90 shadow-sm overflow-hidden">
        <CardHeader
          title="Consumables & Stationeries"
          subtitle="Authorized front desk stock log"
        />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 uppercase text-xs font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-4 text-center w-12">#</th>
                <th className="p-4">Item Name</th>
                <th className="p-4">Category</th>
                <th className="p-4">Current Stock</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Quick Restock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {inventory.map((item, idx) => {
                const isLow = item.currentStock <= item.minStockLevel;

                return (
                  <tr key={item.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="p-4 text-center font-mono font-medium text-slate-400 dark:text-slate-500 text-xs">
                      {idx + 1}
                    </td>
                    <td className="p-4 font-bold text-slate-900 dark:text-slate-100">{item.name}</td>
                    <td className="p-4 text-slate-600 dark:text-slate-400">{item.category}</td>
                    <td className="p-4 font-mono font-bold text-slate-800 dark:text-slate-200">
                      {item.currentStock} {item.unit}
                    </td>
                    <td className="p-4">
                      {isLow ? (
                        <span className="text-rose-700 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-2.5 py-1 rounded-full text-xs font-bold border border-rose-200 dark:border-rose-900/60 inline-flex items-center gap-1">
                          ⚠ Low Stock ({item.minStockLevel} min)
                        </span>
                      ) : (
                        <span className="text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full text-xs font-bold border border-emerald-200 dark:border-emerald-900/60 inline-flex items-center gap-1">
                          ✓ Available
                        </span>
                      )}
                    </td>
                    <td className="p-4 text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateStock(item.id, 5)}
                      >
                        + Add 5
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}


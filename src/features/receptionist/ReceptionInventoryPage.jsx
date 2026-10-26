import React from 'react';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Package, AlertTriangle, CheckCircle } from 'lucide-react';

export function ReceptionInventoryPage() {
  const { inventory, updateStock } = useApp();

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Front Desk Stock</span>
        <h1 className="text-2xl font-extrabold text-slate-900">Front Desk Supplies Checklist</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Reception-accessible supplies tracking for thermal receipts, prescription stationery, and patient hygiene disposables.
        </p>
      </div>

      <Card>
        <CardHeader
          title="Consumables & Stationeries"
          subtitle="Authorized front desk stock log"
        />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3.5">Item Name</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Current Stock</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Quick Restock</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {inventory.map((item) => {
                const isLow = item.currentStock <= item.minStockLevel;

                return (
                  <tr key={item.id} className="hover:bg-slate-50/50">
                    <td className="p-3.5 font-bold text-slate-900">{item.name}</td>
                    <td className="p-3.5 text-slate-600">{item.category}</td>
                    <td className="p-3.5 font-mono font-bold text-slate-800">
                      {item.currentStock} {item.unit}
                    </td>
                    <td className="p-3.5">
                      {isLow ? (
                        <span className="text-rose-700 bg-rose-50 px-2 py-0.5 rounded text-[10px] font-bold border border-rose-200">
                          Low Stock
                        </span>
                      ) : (
                        <span className="text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded text-[10px] font-bold border border-emerald-200">
                          Available
                        </span>
                      )}
                    </td>
                    <td className="p-3.5 text-right">
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


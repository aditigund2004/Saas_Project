import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { ArrowRightLeft, Search, Calendar, User, FileText } from 'lucide-react';

export function InventoryMovementsPage() {
  const { inventoryMovements } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('All');

  const filteredMovements = inventoryMovements.filter((mov) => {
    const matchesSearch =
      mov.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mov.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mov.reason.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mov.actor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'All' || mov.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-full border border-blue-200 dark:border-blue-800 uppercase tracking-wide">
              Stock Ledger & Traceability
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Stock Movement Audit Log</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Immutable log of all receipts, dispensary movements, damages, and count adjustments
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by item, SKU, reason, or staff actor..."
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="text-xs border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-200 font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
        >
          <option value="All">All Movement Types</option>
          <option value="Receipt">Receipts (+)</option>
          <option value="Adjustment">Adjustments</option>
          <option value="Dispensed">Dispensed (-)</option>
          <option value="Damaged">Damaged</option>
        </select>
      </div>

      <Card className="overflow-hidden border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 font-bold border-b border-slate-200 dark:border-slate-800 uppercase tracking-wider text-xs">
              <tr>
                <th className="px-3 py-3 text-center w-12 font-bold">#</th>
                <th className="px-4 py-3">Timestamp</th>
                <th className="px-4 py-3">Item Details & SKU</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Change (Qty)</th>
                <th className="px-4 py-3">Stock Progression</th>
                <th className="px-4 py-3">Audit Reason</th>
                <th className="px-4 py-3">Logged By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredMovements.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-slate-400 dark:text-slate-500">
                    No movements found matching the filters.
                  </td>
                </tr>
              ) : (
                filteredMovements.map((mov, idx) => (
                  <tr key={mov.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-3 py-3.5 text-center font-mono font-medium text-slate-400 dark:text-slate-500 text-xs">{idx + 1}</td>
                    <td className="px-4 py-3.5 font-mono text-slate-500 dark:text-slate-400 whitespace-nowrap">
                      {mov.date}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="font-bold text-slate-900 dark:text-white text-sm">{mov.itemName}</div>
                      <div className="text-xs text-slate-400 dark:text-slate-500 font-mono mt-0.5">{mov.sku}</div>
                    </td>
                    <td className="px-4 py-3.5">
                      <Badge
                        variant={
                          mov.type === 'Receipt' ? 'success' :
                          mov.type === 'Dispensed' ? 'default' : 'warning'
                        }
                        size="sm"
                      >
                        {mov.type}
                      </Badge>
                    </td>
                    <td className="px-4 py-3.5 font-mono font-bold text-sm">
                      <span className={mov.quantity > 0 ? 'text-emerald-700 dark:text-emerald-400' : 'text-slate-800 dark:text-slate-200'}>
                        {mov.quantity > 0 ? `+${mov.quantity}` : mov.quantity}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 font-mono text-slate-600 dark:text-slate-300 whitespace-nowrap">
                      {mov.previousStock} ➔ <strong className="text-slate-900 dark:text-white">{mov.newStock}</strong>
                    </td>
                    <td className="px-4 py-3.5 text-slate-700 dark:text-slate-300 max-w-xs">
                      {mov.reason}
                    </td>
                    <td className="px-4 py-3.5 text-slate-600 dark:text-slate-400 font-medium whitespace-nowrap">
                      {mov.actor}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}

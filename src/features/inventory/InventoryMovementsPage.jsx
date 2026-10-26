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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200 uppercase tracking-wide">
              Stock Ledger & Traceability
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Stock Movement Audit Log</h1>
          <p className="text-xs text-slate-500">
            Immutable log of all receipts, dispensary movements, damages, and count adjustments
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by item, SKU, reason, or staff actor..."
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>
        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="text-xs border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700 font-medium"
        >
          <option value="All">All Movement Types</option>
          <option value="Receipt">Receipts (+)</option>
          <option value="Adjustment">Adjustments</option>
          <option value="Dispensed">Dispensed (-)</option>
          <option value="Damaged">Damaged</option>
        </select>
      </div>

      <Card className="overflow-hidden border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Timestamp</th>
                <th className="px-4 py-3">Item Details & SKU</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Change (Qty)</th>
                <th className="px-4 py-3">Stock Progression</th>
                <th className="px-4 py-3">Audit Reason</th>
                <th className="px-4 py-3">Logged By</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredMovements.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-slate-400">
                    No movements found matching the filters.
                  </td>
                </tr>
              ) : (
                filteredMovements.map((mov) => (
                  <tr key={mov.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-mono text-slate-500 whitespace-nowrap">
                      {mov.date}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-bold text-slate-900">{mov.itemName}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{mov.sku}</div>
                    </td>
                    <td className="px-4 py-3">
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
                    <td className="px-4 py-3 font-mono font-bold">
                      <span className={mov.quantity > 0 ? 'text-emerald-700' : 'text-slate-800'}>
                        {mov.quantity > 0 ? `+${mov.quantity}` : mov.quantity}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono text-slate-600 whitespace-nowrap">
                      {mov.previousStock} ➔ <strong className="text-slate-900">{mov.newStock}</strong>
                    </td>
                    <td className="px-4 py-3 text-slate-700 max-w-xs">
                      {mov.reason}
                    </td>
                    <td className="px-4 py-3 text-slate-600 font-medium whitespace-nowrap">
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


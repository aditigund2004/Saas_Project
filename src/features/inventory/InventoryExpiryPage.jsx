import React from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { AlertTriangle, Clock, ShieldCheck, CheckCircle2, ArrowRight } from 'lucide-react';

export function InventoryExpiryPage() {
  const { inventory, formatCurrency } = useApp();

  const expiringSoon = inventory.filter((i) => i.status === 'Expiring Soon');
  const safeItems = inventory.filter((i) => i.status !== 'Expiring Soon');

  const atRiskValuation = expiringSoon.reduce((acc, curr) => acc + curr.currentStock * curr.costPerUnit, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-2.5 py-1 rounded-full border border-amber-200 dark:border-amber-800 uppercase tracking-wide">
              Loss Prevention & Safety
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Batch Expiry Monitoring</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Proactive triage of pharmaceutical and consumable shelf-lives to avoid clinical risk & wastage
          </p>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-5 border-amber-200 dark:border-amber-900/60 bg-amber-50/50 dark:bg-amber-950/20 shadow-sm">
          <div className="flex items-center justify-between text-amber-700 dark:text-amber-400 mb-2">
            <span className="text-xs font-semibold uppercase text-amber-800 dark:text-amber-300">Batches Expiring in &lt; 60 Days</span>
            <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
          </div>
          <div className="text-2xl font-black text-amber-950 dark:text-amber-100">{expiringSoon.length} Batches</div>
          <p className="text-xs text-amber-800 dark:text-amber-300 mt-1">Requires immediate clinical priority use</p>
        </Card>

        <Card className="p-5 border-rose-200 dark:border-rose-900/60 bg-rose-50/50 dark:bg-rose-950/20 shadow-sm">
          <div className="flex items-center justify-between text-rose-700 dark:text-rose-400 mb-2">
            <span className="text-xs font-semibold uppercase text-rose-800 dark:text-rose-300">Financial Risk at Stake</span>
            <span className="font-bold text-sm">₹</span>
          </div>
          <div className="text-2xl font-black text-rose-950 dark:text-rose-100">{formatCurrency(atRiskValuation)}</div>
          <p className="text-xs text-rose-800 dark:text-rose-300 mt-1">Estimated loss if unutilized</p>
        </Card>

        <Card className="p-5 border-emerald-200 dark:border-emerald-900/60 bg-emerald-50/50 dark:bg-emerald-950/20 shadow-sm">
          <div className="flex items-center justify-between text-emerald-700 dark:text-emerald-400 mb-2">
            <span className="text-xs font-semibold uppercase text-emerald-800 dark:text-emerald-300">Compliance Score</span>
            <ShieldCheck className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div className="text-2xl font-black text-emerald-950 dark:text-emerald-100">98.4% Safe</div>
          <p className="text-xs text-emerald-800 dark:text-emerald-300 mt-1">Zero expired drugs dispensed in OPD</p>
        </Card>
      </div>

      {/* Expiring Soon Table */}
      <div className="space-y-4">
        <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400" />
          Urgent Attention: Expiring Batches ({expiringSoon.length})
        </h3>

        <Card className="overflow-hidden border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 font-bold border-b border-slate-200 dark:border-slate-800 uppercase tracking-wider text-xs">
                <tr>
                  <th className="px-3 py-3 text-center w-12 font-bold">#</th>
                  <th className="px-4 py-3">Product Name</th>
                  <th className="px-4 py-3">SKU</th>
                  <th className="px-4 py-3">Batch Number</th>
                  <th className="px-4 py-3">Expiry Date</th>
                  <th className="px-4 py-3">Remaining Stock</th>
                  <th className="px-4 py-3">Estimated Risk</th>
                  <th className="px-4 py-3">Recommended Triage Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {expiringSoon.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-amber-50/40 dark:hover:bg-amber-950/20 transition-colors">
                    <td className="px-3 py-3.5 text-center font-mono font-medium text-slate-400 dark:text-slate-500 text-xs">{idx + 1}</td>
                    <td className="px-4 py-3.5">
                      <div className="font-bold text-slate-900 dark:text-white text-sm">{item.name}</div>
                      <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{item.category}</div>
                    </td>
                    <td className="px-4 py-3.5 font-mono font-semibold text-slate-700 dark:text-slate-300">{item.sku}</td>
                    <td className="px-4 py-3.5 font-mono text-slate-600 dark:text-slate-400">{item.batchNumber}</td>
                    <td className="px-4 py-3.5 font-mono font-bold text-amber-700 dark:text-amber-400">
                      {item.expiryDate}
                    </td>
                    <td className="px-4 py-3.5 font-bold font-mono text-slate-900 dark:text-white text-sm">
                      {item.currentStock} {item.unit}
                    </td>
                    <td className="px-4 py-3.5 font-mono text-rose-700 dark:text-rose-400 font-bold text-sm">
                      {formatCurrency(item.currentStock * item.costPerUnit)}
                    </td>
                    <td className="px-4 py-3.5">
                      <span className="inline-block px-2.5 py-1 rounded-md bg-amber-100 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-800 text-xs font-semibold">
                        Prioritize for next 14 days OPD dispensing
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}

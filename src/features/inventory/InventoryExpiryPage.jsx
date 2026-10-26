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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-amber-700 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200 uppercase tracking-wide">
              Loss Prevention & Safety
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Batch Expiry Monitoring</h1>
          <p className="text-xs text-slate-500">
            Proactive triage of pharmaceutical and consumable shelf-lives to avoid clinical risk & wastage
          </p>
        </div>
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4 border-amber-200 bg-amber-50/50">
          <div className="flex items-center justify-between text-amber-700 mb-1">
            <span className="text-xs font-semibold uppercase">Batches Expiring in &lt; 60 Days</span>
            <AlertTriangle className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-black text-amber-950">{expiringSoon.length} Batches</div>
          <p className="text-[11px] text-amber-800 mt-1">Requires immediate clinical priority use</p>
        </Card>

        <Card className="p-4 border-rose-200 bg-rose-50/50">
          <div className="flex items-center justify-between text-rose-700 mb-1">
            <span className="text-xs font-semibold uppercase">Financial Risk at Stake</span>
            <span className="font-bold text-xs">₹</span>
          </div>
          <div className="text-2xl font-black text-rose-950">{formatCurrency(atRiskValuation)}</div>
          <p className="text-[11px] text-rose-800 mt-1">Estimated loss if unutilized</p>
        </Card>

        <Card className="p-4 border-emerald-200 bg-emerald-50/50">
          <div className="flex items-center justify-between text-emerald-700 mb-1">
            <span className="text-xs font-semibold uppercase">Compliance Score</span>
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-black text-emerald-950">98.4% Safe</div>
          <p className="text-[11px] text-emerald-800 mt-1">Zero expired drugs dispensed in OPD</p>
        </Card>
      </div>

      {/* Expiring Soon Table */}
      <div className="space-y-3">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <AlertTriangle className="w-4 h-4 text-amber-600" />
          Urgent Attention: Expiring Batches
        </h3>

        <Card className="overflow-hidden border-slate-200">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                <tr>
                  <th className="px-4 py-3">Product Name</th>
                  <th className="px-4 py-3">SKU</th>
                  <th className="px-4 py-3">Batch Number</th>
                  <th className="px-4 py-3">Expiry Date</th>
                  <th className="px-4 py-3">Remaining Stock</th>
                  <th className="px-4 py-3">Estimated Risk</th>
                  <th className="px-4 py-3">Recommended Triage Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {expiringSoon.map((item) => (
                  <tr key={item.id} className="hover:bg-amber-50/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="font-bold text-slate-900">{item.name}</div>
                      <div className="text-[10px] text-slate-400">{item.category}</div>
                    </td>
                    <td className="px-4 py-3 font-mono font-semibold">{item.sku}</td>
                    <td className="px-4 py-3 font-mono text-slate-600">{item.batchNumber}</td>
                    <td className="px-4 py-3 font-mono font-bold text-amber-700">
                      {item.expiryDate}
                    </td>
                    <td className="px-4 py-3 font-bold font-mono">
                      {item.currentStock} {item.unit}
                    </td>
                    <td className="px-4 py-3 font-mono text-rose-700 font-semibold">
                      {formatCurrency(item.currentStock * item.costPerUnit)}
                    </td>
                    <td className="px-4 py-3">
                      <span className="inline-block px-2 py-0.5 rounded bg-amber-100 text-amber-900 text-[11px] font-medium">
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


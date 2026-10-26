import React from 'react';
import { Card, CardHeader } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { CreditCard, Download, ExternalLink, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function PlatformBillingPage() {
  const { showToast } = useApp();

  const invoices = [
    { id: 'sub-inv-1081', clinic: 'Apex Dental Care', plan: 'Professional Plan', amount: 6999, date: '2026-10-21', status: 'Paid', method: 'UPI / Razorpay', ref: 'rzp_pay_99812A' },
    { id: 'sub-inv-1080', clinic: 'Pulse Orthopedics', plan: 'Professional Plan', amount: 6999, date: '2026-10-18', status: 'Paid', method: 'Corporate Visa', ref: 'txn_vis_77189B' },
    { id: 'sub-inv-1079', clinic: 'GreenHaven Recovery', plan: 'Enterprise (24 Beds)', amount: 14999, date: '2026-10-15', status: 'Paid', method: 'Net Banking', ref: 'neft_sbi_44120C' },
    { id: 'sub-inv-1078', clinic: 'DermaGlow Skin Center', plan: 'Starter Plan', amount: 2499, date: '2026-10-12', status: 'Paid', method: 'UPI Autopay', ref: 'upi_auto_33219D' },
    { id: 'sub-inv-1077', clinic: 'LittleCare Pediatrics', plan: 'Starter Plan', amount: 2499, date: '2026-10-09', status: 'Paid', method: 'MasterCard', ref: 'txn_mc_22091E' }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
<<<<<<< HEAD
          <span className="text-xs font-semibold text-blue-600 uppercase tracking-wider">Platform Finance</span>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">SaaS Subscription Invoices</h1>
=======
          <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">Platform Finance</span>
          <h1 className="text-2xl font-extrabold text-slate-900">SaaS Subscription Invoices</h1>
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
          <p className="text-xs text-slate-500 mt-0.5">
            B2B subscription invoices issued to clinic organizations for CliniPulse platform usage.
          </p>
        </div>

        <Button
          variant="outline"
          size="sm"
          icon={Download}
          onClick={() => showToast('Platform subscription CSV report exported.')}
        >
          Export SaaS Ledger CSV
        </Button>
      </div>

<<<<<<< HEAD
      <div className="p-3.5 rounded-xl bg-blue-50/80 border border-blue-200 text-xs text-blue-900 flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-blue-600 shrink-0" />
=======
      <div className="p-3.5 rounded-xl bg-purple-50 border border-purple-200 text-xs text-purple-900 flex items-center gap-2">
        <ShieldCheck className="w-4 h-4 text-purple-600 shrink-0" />
>>>>>>> 32abc5768414aa018e60e56ec54d0c0028fbb8bf
        <span>
          <strong>Tenant Separation Note:</strong> This ledger contains platform SaaS subscription fees paid by clinics to CliniPulse. It is strictly segregated from individual clinic patient procedure invoices.
        </span>
      </div>

      <Card>
        <CardHeader
          title="Recent Subscription Invoices"
          subtitle="Showing transaction references and automated payment gateway webhooks"
        />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3.5">Invoice #</th>
                <th className="p-3.5">Subscribing Clinic</th>
                <th className="p-3.5">Subscription Tier</th>
                <th className="p-3.5">Date Paid</th>
                <th className="p-3.5">Amount</th>
                <th className="p-3.5">Payment Method</th>
                <th className="p-3.5">Transaction Ref</th>
                <th className="p-3.5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {invoices.map((inv) => (
                <tr key={inv.id} className="hover:bg-slate-50/50">
                  <td className="p-3.5 font-mono font-bold text-slate-900">{inv.id}</td>
                  <td className="p-3.5 font-medium text-slate-800">{inv.clinic}</td>
                  <td className="p-3.5 text-slate-600">{inv.plan}</td>
                  <td className="p-3.5 text-slate-500">{inv.date}</td>
                  <td className="p-3.5 font-bold font-mono text-slate-900">
                    ₹{inv.amount.toLocaleString('en-IN')}
                  </td>
                  <td className="p-3.5 text-slate-600">{inv.method}</td>
                  <td className="p-3.5 font-mono text-slate-500 text-[11px]">{inv.ref}</td>
                  <td className="p-3.5">
                    <Badge variant={inv.status}>{inv.status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Modal } from '../../components/ui/Modal';
import { Button } from '../../components/ui/Button';
import {
  Receipt,
  HelpCircle,
  Clock,
  ShieldAlert,
  Send,
  CheckCircle2,
  AlertCircle,
  FileText
} from 'lucide-react';

const CLARIFICATION_TYPES = [
  'Itemized Cost & Tariff Explanation',
  'Insurance Claim & TPA Reimbursement Breakdown',
  'Payment Verification / Duplicate Charge Check',
  'Package Discount or Adjustment Query',
  'Post-Procedure Follow-Up Billing Query'
];

export function BillClarificationModal({ isOpen, onClose, invoice }) {
  const navigate = useNavigate();
  const { createPatientQuery, formatCurrency } = useApp();

  const [clarificationType, setClarificationType] = useState(CLARIFICATION_TYPES[0]);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen || !invoice) return null;

  const defaultSubject = subject || `${clarificationType} - Invoice #${invoice.invoiceNumber}`;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    setIsSubmitting(true);

    const fullMessage = `[Bill Clarification for Invoice #${invoice.invoiceNumber} | Total: ${formatCurrency(invoice.totalAmount)} | Date: ${invoice.date}]\n\nReason: ${clarificationType}\n\nPatient Query:\n${message.trim()}`;

    const newQuery = createPatientQuery({
      category: 'Bill Clarification',
      relatedEntityId: invoice.id,
      relatedEntityLabel: `Invoice #${invoice.invoiceNumber} (${formatCurrency(invoice.totalAmount)})`,
      subject: defaultSubject,
      message: fullMessage,
      urgency: 'Routine Non-Emergency'
    });

    setIsSubmitting(false);
    onClose();

    // Navigate to queries page with newly created query selected
    navigate(`/patient/queries?selected=${newQuery.id}`);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
            <Receipt className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-slate-100">
              Request Bill Clarification
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-mono">
              Direct inquiry to clinic finance & accounts desk
            </p>
          </div>
        </div>
      }
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        {/* Invoice Summary Box */}
        <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-850/60 border border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-900 dark:text-slate-100 font-mono">
              Invoice #{invoice.invoiceNumber}
            </span>
            <span className="font-extrabold text-sm font-mono text-blue-600 dark:text-blue-400">
              {formatCurrency(invoice.totalAmount)}
            </span>
          </div>
          <div className="text-[11px] text-slate-600 dark:text-slate-300 space-y-0.5">
            <p><strong>Date:</strong> {invoice.date} · <strong>Status:</strong> {invoice.status}</p>
            <p className="truncate">
              <strong>Items:</strong> {invoice.items?.map((it) => it.description).join(', ') || 'Clinical Consultation'}
            </p>
          </div>
        </div>

        {/* Response-Time Expectation Alert */}
        <div className="p-3 rounded-xl bg-blue-50/80 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900/50 flex items-start gap-2.5 text-blue-950 dark:text-blue-200">
          <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
          <div className="space-y-0.5 text-xs">
            <p className="font-bold">Expected Response Time</p>
            <p className="text-[11px] text-blue-850 dark:text-blue-300 leading-relaxed">
              Our clinic accounts team typically reviews and replies to billing clarifications <strong>within 24 business hours</strong> (Monday to Saturday, 09:00 AM – 06:00 PM).
            </p>
          </div>
        </div>

        {/* Clarification Category Selector */}
        <div>
          <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider text-[11px]">
            Clarification Category *
          </label>
          <select
            value={clarificationType}
            onChange={(e) => setClarificationType(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 text-xs font-semibold focus:ring-2 focus:ring-blue-500"
          >
            {CLARIFICATION_TYPES.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
        </div>

        {/* Detailed Question / Note */}
        <div>
          <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1.5 uppercase tracking-wider text-[11px]">
            Your Question / Explanation *
          </label>
          <textarea
            required
            rows={4}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Please specify what you would like clarified (e.g. request for separate diagnostic codes for insurance claim, payment receipt verification, or tariff breakdown)..."
            className="w-full px-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 text-xs leading-relaxed focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Emergency Guidance Disclaimer */}
        <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-[11px] text-amber-900 dark:text-amber-200 flex items-start gap-2">
          <AlertCircle className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <span>
            <strong>Non-Emergency Notice:</strong> For immediate medical needs, clinical distress, or severe symptoms, do not use billing inquiries. Call <strong>112 / 108</strong> or go to the nearest emergency department.
          </span>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-slate-800">
          <Button variant="outline" size="sm" type="button" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="sm"
            type="submit"
            icon={Send}
            disabled={isSubmitting || !message.trim()}
            className="font-bold shadow-xs"
          >
            Submit Clarification &rarr;
          </Button>
        </div>
      </form>
    </Modal>
  );
}


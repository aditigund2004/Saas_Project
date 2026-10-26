import React, { useState } from 'react';
import { Modal } from '../../../components/ui/Modal';
import { Button } from '../../../components/ui/Button';
import {
  Play,
  Zap,
  CheckCircle2,
  XCircle,
  AlertTriangle
} from 'lucide-react';
import { emailService } from '../../../services/emailNotificationService';

export function EmailEventSimulatorModal({
  isOpen,
  onClose,
  initialEventKey = '',
  triggers = [],
  clinics = [],
  onSimulationComplete
}) {
  const [selectedEventKey, setSelectedEventKey] = useState(
    initialEventKey || triggers[0]?.eventKey || 'subscription.activated'
  );

  const [selectedClinicId, setSelectedClinicId] = useState(
    clinics[0]?.id || 'clinic-citycare'
  );

  const [customRecipientName, setCustomRecipientName] = useState('');
  const [customRecipientEmail, setCustomRecipientEmail] = useState('');
  const [customPlanName, setCustomPlanName] = useState('Professional Multi-Specialty');
  const [customAmount, setCustomAmount] = useState('₹69,990');
  const [simulationResult, setSimulationResult] = useState(null);

  const selectedClinic = clinics.find((c) => c.id === selectedClinicId) || clinics[0];
  const activeTrigger = triggers.find((t) => t.eventKey === selectedEventKey);

  const handleExecute = () => {
    const res = emailService.simulateEventTrigger(selectedEventKey, {
      clinicName: selectedClinic?.name || 'CityCare Family Clinic',
      clinicId: selectedClinic?.id || 'clinic-citycare',
      recipientName: customRecipientName || selectedClinic?.ownerName || 'Dr. Aarav Mehta',
      recipientEmail: customRecipientEmail || selectedClinic?.email || 'care@citycare.demo',
      planName: customPlanName,
      amount: customAmount
    });

    setSimulationResult(res);
    if (onSimulationComplete) {
      onSimulationComplete(res);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Event-Based Email Automation Simulator"
      size="lg"
    >
      <div className="space-y-4 text-xs">
        <div className="p-3 bg-blue-50/80 border border-blue-200/90 rounded-xl flex items-start gap-2.5 text-blue-900">
          <Zap className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <span className="font-bold">Automated Lifecycle Test Bench:</span> Trigger business events to verify condition rules, dynamic placeholder rendering, and activity logging.
          </div>
        </div>

        {/* Form Inputs */}
        <div className="space-y-3">
          <div>
            <label className="block text-[11px] font-bold text-slate-700 mb-1">
              Select Business Event Trigger
            </label>
            <select
              value={selectedEventKey}
              onChange={(e) => {
                setSelectedEventKey(e.target.value);
                setSimulationResult(null);
              }}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white font-mono"
            >
              {triggers.map((trg) => (
                <option key={trg.eventKey} value={trg.eventKey}>
                  {trg.eventKey} — {trg.name} {!trg.enabled ? '(Disabled)' : ''}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Target Hospital / Clinic
              </label>
              <select
                value={selectedClinicId}
                onChange={(e) => {
                  setSelectedClinicId(e.target.value);
                  setSimulationResult(null);
                }}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
              >
                {clinics.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Simulated Recipient
              </label>
              <input
                type="text"
                placeholder={selectedClinic?.ownerName || 'Dr. Aarav Mehta'}
                value={customRecipientName}
                onChange={(e) => setCustomRecipientName(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Plan Name (for billing events)
              </label>
              <input
                type="text"
                value={customPlanName}
                onChange={(e) => setCustomPlanName(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 mb-1">
                Transaction Amount
              </label>
              <input
                type="text"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="w-full px-3 py-1.5 rounded-lg border border-slate-300 text-xs font-mono font-bold focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white"
              />
            </div>
          </div>
        </div>

        {/* Trigger Status Check */}
        {activeTrigger && (
          <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-between text-[11px]">
            <div className="flex items-center gap-1.5">
              <span className="font-semibold text-slate-600">Trigger Status:</span>
              <span
                className={`font-bold px-1.5 py-0.2 rounded font-mono ${
                  activeTrigger.enabled
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-rose-100 text-rose-800'
                }`}
              >
                {activeTrigger.enabled ? 'Enabled' : 'Disabled'}
              </span>
            </div>
            <span className="text-slate-500">{activeTrigger.conditionDescription}</span>
          </div>
        )}

        {/* Simulation Output Result Box */}
        {simulationResult && (
          <div
            className={`p-3.5 rounded-xl border space-y-2 ${
              simulationResult.status === 'delivered'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                : simulationResult.status === 'skipped'
                ? 'bg-amber-50 border-amber-200 text-amber-950'
                : 'bg-rose-50 border-rose-200 text-rose-950'
            }`}
          >
            <div className="flex items-center gap-2 font-bold text-xs">
              {simulationResult.status === 'delivered' && (
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              )}
              {simulationResult.status === 'skipped' && (
                <AlertTriangle className="w-4 h-4 text-amber-600" />
              )}
              {simulationResult.status === 'failed' && (
                <XCircle className="w-4 h-4 text-rose-600" />
              )}
              <span>{simulationResult.message}</span>
            </div>

            {simulationResult.log && (
              <div className="p-2.5 bg-white/90 rounded-lg border text-[11px] space-y-1">
                <div className="font-bold text-slate-900 truncate">
                  {simulationResult.log.subject}
                </div>
                <div className="text-slate-500">
                  Recipient: <strong className="text-slate-700">{simulationResult.log.recipientEmail}</strong> • Log ID: <span className="font-mono">{simulationResult.log.id}</span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Modal Actions */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-100">
          <Button variant="outline" size="sm" onClick={onClose}>
            Close
          </Button>

          <Button variant="primary" size="sm" icon={Play} onClick={handleExecute}>
            Run Simulated Event
          </Button>
        </div>
      </div>
    </Modal>
  );
}

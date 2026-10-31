import React, { useState } from 'react';
import { broadcastService } from '../../../../services/broadcastService';
import { Modal } from '../../../../components/ui/Modal';
import { Button } from '../../../../components/ui/Button';
import {
  Send,
  Smartphone,
  Mail,
  Radio,
  CheckCircle2
} from 'lucide-react';

export function DispatchSimulatorModal({ isOpen, onClose, broadcast, showToast }) {
  const [selectedChannel, setSelectedChannel] = useState('whatsapp');
  const [testRecipient, setTestRecipient] = useState('+91 98201 12345');
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResult, setSimulationResult] = useState(null);

  if (!isOpen) return null;

  const handleRunSimulation = async () => {
    setIsSimulating(true);
    setSimulationResult(null);

    try {
      const result = await broadcastService.simulateDispatchTest({
        broadcast: broadcast || {
          id: 'BC-TEST-001',
          title: 'Emergency Test Alert',
          type: 'emergency',
          severity: 'critical',
          message: 'This is a sandbox test alert triggered from the Super Admin Broadcast Hub.',
        },
        channel: selectedChannel,
        testRecipient,
      });

      setSimulationResult(result);
      showToast(`Test dispatch via ${selectedChannel.toUpperCase()} completed successfully!`);
    } catch {
      showToast('Simulation failed.', 'error');
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Multi-Channel Broadcast Dispatch Simulator"
      size="md"
    >
      <div className="space-y-5">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Simulate instantaneous multi-channel dispatch across in-app websocket banners, Meta WhatsApp Business Cloud API, and SMTP email infrastructure.
        </p>

        {/* Channel Selector */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
            Select Dispatch Gateway
          </label>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              onClick={() => {
                setSelectedChannel('whatsapp');
                setTestRecipient('+91 98201 12345');
                setSimulationResult(null);
              }}
              className={`p-3 rounded-xl border text-xs flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                selectedChannel === 'whatsapp'
                  ? 'bg-teal-50 dark:bg-teal-950/40 border-teal-500 text-teal-900 dark:text-teal-200 font-bold shadow-xs'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              <Smartphone className="w-5 h-5 text-teal-600" />
              <span>WhatsApp API</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setSelectedChannel('email');
                setTestRecipient('admin.tester@hospitaldemo.com');
                setSimulationResult(null);
              }}
              className={`p-3 rounded-xl border text-xs flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                selectedChannel === 'email'
                  ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-500 text-blue-900 dark:text-blue-200 font-bold shadow-xs'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              <Mail className="w-5 h-5 text-blue-600" />
              <span>Email Gateway</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setSelectedChannel('in_app');
                setTestRecipient('All Active Sessions');
                setSimulationResult(null);
              }}
              className={`p-3 rounded-xl border text-xs flex flex-col items-center gap-1.5 transition-all cursor-pointer ${
                selectedChannel === 'in_app'
                  ? 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-500 text-indigo-900 dark:text-indigo-200 font-bold shadow-xs'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
              }`}
            >
              <Radio className="w-5 h-5 text-indigo-600" />
              <span>In-App Banner</span>
            </button>
          </div>
        </div>

        {/* Target Recipient Field */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-1">
            {selectedChannel === 'whatsapp' ? 'Test WhatsApp Mobile (+91)' : selectedChannel === 'email' ? 'Test Recipient Email' : 'Broadcast Target'}
          </label>
          <input
            type="text"
            value={testRecipient}
            onChange={(e) => setTestRecipient(e.target.value)}
            disabled={selectedChannel === 'in_app'}
            className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-sm text-slate-900 dark:text-white"
          />
        </div>

        {/* Message Preview */}
        <div className="p-3 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs space-y-1">
          <span className="font-semibold text-slate-500">Payload to Deliver:</span>
          <p className="font-bold text-slate-800 dark:text-slate-200">
            {broadcast?.title || 'Emergency Test Alert: Scheduled Platform Upgrade Sunday 2:00 AM IST'}
          </p>
          <p className="text-slate-600 dark:text-slate-400 line-clamp-2">
            {broadcast?.message || 'Testing live pipeline routing across messaging cluster.'}
          </p>
        </div>

        {/* Simulation Output Area */}
        {simulationResult && (
          <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs space-y-2 animate-fade-in">
            <div className="flex items-center gap-2 font-bold text-emerald-800 dark:text-emerald-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Dispatch Verified & Confirmed</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-slate-700 dark:text-slate-300 text-[11px]">
              <div>
                <span className="text-slate-500">Gateway:</span>{' '}
                <strong className="uppercase">{simulationResult.channel}</strong>
              </div>
              <div>
                <span className="text-slate-500">Latency:</span>{' '}
                <strong>{simulationResult.latencyMs}ms</strong>
              </div>
              <div>
                <span className="text-slate-500">Endpoint:</span>{' '}
                <strong className="truncate">{simulationResult.recipient}</strong>
              </div>
              <div>
                <span className="text-slate-500">Delivered At:</span>{' '}
                <strong>{new Date(simulationResult.deliveredAt).toLocaleTimeString()}</strong>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-slate-200 dark:border-slate-800">
          <Button variant="ghost" size="sm" onClick={onClose}>
            Close
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={handleRunSimulation}
            disabled={isSimulating}
            className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-1.5"
          >
            <Send className="w-3.5 h-3.5" />
            <span>{isSimulating ? 'Simulating Dispatch...' : 'Fire Test Dispatch'}</span>
          </Button>
        </div>
      </div>
    </Modal>
  );
}

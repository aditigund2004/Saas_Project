import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import { WHATSAPP_TEMPLATES, whatsappService } from '../../services/whatsappService';
import { MessageSquare, CheckCheck, RefreshCw, Send, AlertCircle, Shield } from 'lucide-react';

export function WhatsAppModal() {
  const { whatsAppModal, closeWhatsAppModal, showToast } = useApp();
  const [selectedTemplate, setSelectedTemplate] = useState('booking_confirmation');
  const [simulatedStatus, setSimulatedStatus] = useState('delivered');
  const [isSending, setIsSending] = useState(false);

  if (!whatsAppModal.isOpen) return null;

  const payload = whatsAppModal.payload || {
    patient_name: 'Aarav Patel',
    clinic_name: 'Apex Dental & Maxillofacial Care',
    appointment_date: '23 Oct 2026',
    appointment_time: '10:30 AM',
    doctor_name: 'Dr. Arvind Rao',
    appointment_reference: 'APT-2601',
    clinic_phone: '+91 98201 12345'
  };

  const currentPreviewText = whatsappService.getTemplatePreview(selectedTemplate, payload);

  const handleSimulateSend = async () => {
    setIsSending(true);
    setSimulatedStatus('pending');
    setTimeout(() => {
      setSimulatedStatus('sent');
      setTimeout(() => {
        setSimulatedStatus('delivered');
        setIsSending(false);
        showToast('Simulated WhatsApp message marked Delivered to recipient device!');
      }, 700);
    }, 600);
  };

  return (
    <Modal isOpen={whatsAppModal.isOpen} onClose={closeWhatsAppModal} title="WhatsApp Business API Integration" size="lg">
      <div className="space-y-5">
        {/* Production Readiness Disclaimer Notice */}
        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Integration Ready / Frontend Demonstration</p>
            <p className="mt-0.5 text-amber-700">
              This preview simulates notifications designed for the WhatsApp Business Platform. In production, templates and opt-in status are dispatched via backend webhook without exposing credentials to the browser.
            </p>
          </div>
        </div>

        {/* Template Chooser */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-2">
            Select Message Template
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {Object.entries(WHATSAPP_TEMPLATES).map(([key, tpl]) => (
              <button
                key={key}
                type="button"
                onClick={() => setSelectedTemplate(key)}
                className={`p-2.5 rounded-xl text-left border text-xs font-medium transition-all cursor-pointer ${
                  selectedTemplate === key
                    ? 'border-emerald-500 bg-emerald-50/60 text-emerald-900 font-semibold shadow-xs'
                    : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                }`}
              >
                {tpl.title}
              </button>
            ))}
          </div>
        </div>

        {/* WhatsApp Chat Simulation Bubble */}
        <div className="rounded-2xl border border-slate-200 bg-[#EFEAE2] p-4 shadow-inner">
          <div className="flex items-center justify-between pb-3 border-b border-black/10 text-xs text-slate-700">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-full bg-[#128C7E] text-white flex items-center justify-center font-bold text-xs">
                W
              </div>
              <div>
                <span className="font-semibold text-slate-900">WhatsApp Cloud API</span>
                <span className="block text-[10px] text-slate-500">To: {payload.patient_name || 'Patient'}</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded-md">
              <CheckCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Status: {simulatedStatus}</span>
            </div>
          </div>

          <div className="py-4 flex justify-end">
            <div className="max-w-md bg-white rounded-2xl rounded-tr-xs p-3.5 shadow-sm border border-slate-200 text-xs leading-relaxed text-slate-800 space-y-2">
              <p className="whitespace-pre-line">{currentPreviewText}</p>
              <div className="flex items-center justify-end gap-1 text-[10px] text-slate-400 font-medium">
                <span>10:30 AM</span>
                {simulatedStatus === 'delivered' ? (
                  <CheckCheck className="w-3.5 h-3.5 text-[#53bdeb]" />
                ) : simulatedStatus === 'sent' ? (
                  <CheckCheck className="w-3.5 h-3.5 text-slate-400" />
                ) : (
                  <RefreshCw className="w-3 h-3 animate-spin text-amber-500" />
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Actions & Integration Spec */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-blue-600" />
            <span>Encrypted endpoint: <code className="text-blue-700">POST /api/v1/whatsapp/dispatch</code></span>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={closeWhatsAppModal}>
              Close
            </Button>
            <Button
              variant="whatsapp"
              size="sm"
              disabled={isSending}
              onClick={handleSimulateSend}
              icon={Send}
            >
              {isSending ? 'Sending via Webhook...' : 'Simulate Send Notification'}
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}


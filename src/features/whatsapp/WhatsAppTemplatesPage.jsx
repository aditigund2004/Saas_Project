import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import {
  MessageSquare,
  Edit2,
  Save,
  RotateCcw,
  Send,
  Sparkles,
  CheckCircle2,
  Smartphone,
  CheckCheck,
  Tag,
  Clock,
  Layers,
  ArrowRight
} from 'lucide-react';

export function WhatsAppTemplatesPage() {
  const {
    whatsAppTemplates,
    updateWhatsAppTemplate,
    resetWhatsAppTemplates,
    activeClinic,
    currentUser,
    openWhatsAppModal,
    showToast
  } = useApp();

  const [selectedCategory, setSelectedCategory] = useState('All');
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    activity: '',
    description: '',
    body: '',
    status: 'Active'
  });
  const [testSendModal, setTestSendModal] = useState({ isOpen: false, template: null });

  const categories = ['All', 'Booking & Queue', 'Clinical & Rx', 'Financial & Invoices', 'Patient Care'];

  const filteredTemplates =
    selectedCategory === 'All'
      ? whatsAppTemplates
      : whatsAppTemplates.filter((t) => t.category === selectedCategory);

  const handleOpenEdit = (template) => {
    setEditingTemplate(template);
    setEditForm({
      name: template.name,
      activity: template.activity,
      description: template.description,
      body: template.body,
      status: template.status || 'Active'
    });
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!editForm.name.trim() || !editForm.body.trim()) {
      showToast('Template name and message body cannot be empty.', 'error');
      return;
    }
    updateWhatsAppTemplate(editingTemplate.id, editForm);
    setEditingTemplate(null);
  };

  const handleInsertVariable = (varName) => {
    setEditForm((prev) => ({
      ...prev,
      body: prev.body + ' ' + varName
    }));
  };

  // Preview variable replacement helper
  const renderSimulatedPreview = (body) => {
    if (!body) return '';
    return body
      .replace(/{{patient_name}}/g, 'Aarav Patel')
      .replace(/{{clinic_name}}/g, activeClinic?.name || 'CityCare Family Clinic')
      .replace(/{{doctor_name}}/g, 'Dr. Arvind Rao')
      .replace(/{{appointment_date}}/g, '28 Oct 2026')
      .replace(/{{appointment_time}}/g, '10:30 AM')
      .replace(/{{appointment_ref}}/g, 'APT-2601')
      .replace(/{{clinic_phone}}/g, activeClinic?.phone || '+91 98200 11223')
      .replace(/{{clinic_address}}/g, activeClinic?.address || 'Suite 401, Health Hub')
      .replace(/{{booking_link}}/g, 'https://clinicos.health/book')
      .replace(/{{prescription_link}}/g, 'https://clinicos.health/verify-prescription/v_demo77')
      .replace(/{{amount_paid}}/g, '₹800')
      .replace(/{{invoice_number}}/g, 'INV-2026-0412')
      .replace(/{{receipt_link}}/g, 'https://clinicos.health/receipt/0412')
      .replace(/{{token_number}}/g, '14')
      .replace(/{{estimated_wait_mins}}/g, '15')
      .replace(/{{queue_link}}/g, 'https://clinicos.health/queue/live');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5" /> WhatsApp Business Communication Suite
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            WhatsApp Activity Templates & Automation
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage, edit, and dispatch pre-approved WhatsApp notification templates for all essential clinic activities.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={RotateCcw}
            onClick={resetWhatsAppTemplates}
            title="Restore default clinical templates"
          >
            Reset Defaults
          </Button>

          <Button
            variant="primary"
            size="sm"
            icon={Send}
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
            onClick={() =>
              openWhatsAppModal({
                patient_name: 'Aarav Patel',
                clinic_name: activeClinic?.name || 'CityCare Family Clinic',
                appointment_date: '28 Oct 2026',
                appointment_time: '10:30 AM',
                doctor_name: 'Dr. Arvind Rao',
                appointment_reference: 'APT-2601',
                clinic_phone: activeClinic?.phone || '+91 98200 11223'
              })
            }
          >
            Simulate Live Dispatch
          </Button>
        </div>
      </div>

      {/* KPI Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card className="p-4 border-slate-200">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Templates Available</span>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">{whatsAppTemplates.length} Activities</div>
          <span className="text-[10px] text-emerald-600 font-semibold mt-0.5 block">100% Meta API compliant</span>
        </Card>

        <Card className="p-4 border-slate-200">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Active Channel</span>
          <div className="text-base font-extrabold text-emerald-700 mt-1 truncate">
            {activeClinic?.name || 'Clinic Tenant'}
          </div>
          <span className="text-[10px] text-slate-500 mt-0.5 block">{activeClinic?.phone || '+91 98200 11223'}</span>
        </Card>

        <Card className="p-4 border-slate-200">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Avg Delivery Rate</span>
          <div className="text-2xl font-extrabold text-blue-600 mt-1">99.4%</div>
          <span className="text-[10px] text-blue-600 font-semibold mt-0.5 block">Instant mobile delivery</span>
        </Card>

        <Card className="p-4 border-slate-200">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Patient No-Show Drop</span>
          <div className="text-2xl font-extrabold text-emerald-600 mt-1">-38%</div>
          <span className="text-[10px] text-slate-500 mt-0.5 block">With 24h & 2h reminders</span>
        </Card>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 pb-3">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
              selectedCategory === cat
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Templates List */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
        {filteredTemplates.map((template) => (
          <Card key={template.id} className="p-6 border-slate-200 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-slate-900">{template.name}</h3>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      {template.category}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400 font-mono mt-0.5">key: {template.key}</p>
                </div>
                <Badge variant={template.status === 'Active' ? 'Active' : 'Draft'}>
                  {template.status || 'Active'}
                </Badge>
              </div>

              {/* Activity trigger note */}
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/80 text-[11px] text-slate-600 flex items-start gap-2">
                <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-slate-800">Trigger Activity: </strong>
                  {template.activity}
                </div>
              </div>

              {/* Live WhatsApp Mockup Preview */}
              <div className="space-y-1.5 pt-1">
                <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                  <span className="flex items-center gap-1">
                    <Smartphone className="w-3.5 h-3.5 text-emerald-600" /> WhatsApp Message Preview
                  </span>
                  <span className="text-[10px] text-slate-400 font-normal">Last updated: {template.lastEdited || '2026-10-26'}</span>
                </div>

                {/* WhatsApp styled bubble */}
                <div className="bg-[#EFEAE2] dark:bg-slate-900 p-3.5 rounded-2xl border border-slate-200/90 relative shadow-inner">
                  <div className="bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 p-3.5 rounded-xl rounded-tl-none shadow-xs text-xs leading-relaxed max-w-sm space-y-2 border border-slate-100 dark:border-slate-700">
                    <p className="whitespace-pre-wrap">{renderSimulatedPreview(template.body)}</p>
                    <div className="flex items-center justify-end gap-1 text-[10px] text-slate-400">
                      <span>10:31 AM</span>
                      <CheckCheck className="w-3.5 h-3.5 text-sky-500" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Variables Supported */}
              <div className="pt-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1">
                  Dynamic Placeholders:
                </span>
                <div className="flex flex-wrap gap-1">
                  {template.variables?.map((v, idx) => (
                    <span
                      key={idx}
                      className="text-[10px] font-mono bg-slate-100 text-slate-700 px-1.5 py-0.5 rounded border border-slate-200"
                    >
                      {v}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Actions Footer */}
            <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
              <Button
                variant="outline"
                size="sm"
                icon={Edit2}
                onClick={() => handleOpenEdit(template)}
              >
                Edit Template Content
              </Button>

              <Button
                variant="primary"
                size="sm"
                icon={Send}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
                onClick={() => {
                  showToast(`Simulated WhatsApp alert for "${template.name}" triggered.`);
                }}
              >
                Test Dispatch
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* EDIT TEMPLATE MODAL */}
      {editingTemplate && (
        <Modal
          isOpen={Boolean(editingTemplate)}
          onClose={() => setEditingTemplate(null)}
          title={`Edit Template: ${editingTemplate.name}`}
          size="lg"
        >
          <form onSubmit={handleSaveEdit} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Template Name *
                </label>
                <input
                  type="text"
                  required
                  value={editForm.name}
                  onChange={(e) => setEditForm((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs font-semibold focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                  Template Identifier (Read-Only)
                </label>
                <input
                  type="text"
                  disabled
                  value={editingTemplate.key}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-100 text-xs font-mono font-semibold text-slate-500 cursor-not-allowed"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-700 uppercase mb-1">
                Clinical Trigger Activity Description
              </label>
              <input
                type="text"
                value={editForm.activity}
                onChange={(e) => setEditForm((prev) => ({ ...prev, activity: e.target.value }))}
                className="w-full px-3 py-2 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Template Body Editor */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-[11px] font-bold text-slate-700 uppercase">
                  Message Body (Customizable Content) *
                </label>
                <span className="text-[10px] text-slate-400 font-mono">
                  {editForm.body.length} characters
                </span>
              </div>
              <textarea
                rows={5}
                required
                value={editForm.body}
                onChange={(e) => setEditForm((prev) => ({ ...prev, body: e.target.value }))}
                className="w-full p-3 rounded-xl border border-slate-300 text-xs font-sans leading-relaxed focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            {/* Placeholder Pills Inserter */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
              <span className="text-[10px] font-bold text-slate-600 uppercase block">
                Click to Insert Placeholders:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {[
                  '{{patient_name}}',
                  '{{clinic_name}}',
                  '{{doctor_name}}',
                  '{{appointment_date}}',
                  '{{appointment_time}}',
                  '{{appointment_ref}}',
                  '{{clinic_phone}}',
                  '{{clinic_address}}',
                  '{{prescription_link}}',
                  '{{amount_paid}}',
                  '{{invoice_number}}',
                  '{{token_number}}',
                  '{{queue_link}}'
                ].map((ph) => (
                  <button
                    key={ph}
                    type="button"
                    onClick={() => handleInsertVariable(ph)}
                    className="text-[10px] font-mono bg-white hover:bg-emerald-50 hover:text-emerald-700 text-slate-700 px-2 py-1 rounded-md border border-slate-200 transition-colors cursor-pointer"
                  >
                    + {ph}
                  </button>
                ))}
              </div>
            </div>

            {/* Live Preview Box */}
            <div className="space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Live Preview Output:</span>
              <div className="bg-[#EFEAE2] dark:bg-slate-900 p-3 rounded-xl border border-slate-200 text-xs text-slate-800 dark:text-slate-100 whitespace-pre-wrap">
                {renderSimulatedPreview(editForm.body)}
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-3 border-t border-slate-200">
              <Button type="button" variant="outline" size="sm" onClick={() => setEditingTemplate(null)}>
                Cancel
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
                icon={Save}
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                Save Template
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}


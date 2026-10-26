import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { LifeBuoy, Plus, MessageSquare, Send, Paperclip, CheckCircle2, Clock, X } from 'lucide-react';

export function ClinicSupportPage() {
  const { supportTickets, createSupportTicket, addTicketMessage, activeClinic, currentUser } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [replyText, setReplyText] = useState('');

  const [newTicket, setNewTicket] = useState({
    category: 'Clinical Workflow',
    priority: 'Medium',
    subject: '',
    description: '',
    simulatedAttachment: 'thermal_printer_config.log'
  });

  const clinicTickets = supportTickets.filter((t) => t.clinicId === activeClinic.id);
  const selectedTicket = clinicTickets.find((t) => t.id === selectedTicketId) || clinicTickets[0];

  const handleCreateTicket = (e) => {
    e.preventDefault();
    createSupportTicket(newTicket);
    setModalOpen(false);
    setNewTicket({
      category: 'Clinical Workflow',
      priority: 'Medium',
      subject: '',
      description: '',
      simulatedAttachment: 'error_screenshot.png'
    });
  };

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedTicket) return;
    addTicketMessage(selectedTicket.id, replyText, false);
    setReplyText('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200 uppercase tracking-wide">
              ClinicOS Helpdesk
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">SaaS Support & Helpdesk</h1>
          <p className="text-xs text-slate-500">
            Submit technical tickets, request custom clinical templates, or get billing assistance from the ClinicOS SaaS engineering team
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={() => setModalOpen(true)}>
          <Plus className="w-3.5 h-3.5 mr-1" />
          Raise Support Ticket
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[500px]">
        {/* Left: Ticket List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <LifeBuoy className="w-4 h-4 text-blue-600" />
            Your Support Requests ({clinicTickets.length})
          </h3>

          <Card className="divide-y divide-slate-100 border-slate-200 max-h-[520px] overflow-y-auto">
            {clinicTickets.length === 0 ? (
              <div className="p-8 text-center text-slate-400 text-xs">
                No active support tickets. Click above to raise one.
              </div>
            ) : (
              clinicTickets.map((t) => {
                const isSelected = selectedTicket?.id === t.id;
                return (
                  <div
                    key={t.id}
                    onClick={() => setSelectedTicketId(t.id)}
                    className={`p-3.5 space-y-1 cursor-pointer transition-colors text-xs ${
                      isSelected
                        ? 'bg-blue-50/70 border-l-4 border-l-blue-600'
                        : 'hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-blue-700">{t.ticketNumber}</span>
                      <Badge
                        variant={
                          t.priority === 'Critical' ? 'danger' :
                          t.priority === 'High' ? 'warning' : 'default'
                        }
                        size="sm"
                      >
                        {t.priority}
                      </Badge>
                    </div>
                    <div className="font-bold text-slate-900 line-clamp-1">{t.subject}</div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                      <span>Status: <strong className="text-slate-700">{t.status}</strong></span>
                      <span>{t.createdAt}</span>
                    </div>
                  </div>
                );
              })
            )}
          </Card>
        </div>

        {/* Right: Ticket Conversation (7 cols) */}
        <div className="lg:col-span-7 flex flex-col">
          {selectedTicket ? (
            <Card className="flex-1 border-slate-200 flex flex-col overflow-hidden">
              <div className="p-4 bg-slate-50 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-blue-800 text-sm">{selectedTicket.ticketNumber}</span>
                    <Badge variant="teal" size="sm">{selectedTicket.category}</Badge>
                  </div>
                  <Badge variant={selectedTicket.status === 'Resolved' ? 'success' : 'warning'} size="sm">
                    {selectedTicket.status}
                  </Badge>
                </div>
                <h3 className="text-base font-bold text-slate-900 mt-1">{selectedTicket.subject}</h3>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Assigned Support Specialist: <strong>{selectedTicket.assignedAgentName || 'Pooja Sharma'}</strong>
                </p>
              </div>

              {/* Thread */}
              <div className="p-4 flex-1 overflow-y-auto space-y-3 max-h-[350px] bg-slate-50/30">
                {selectedTicket.messages.filter(m => !m.isInternal).map((msg) => (
                  <div key={msg.id} className="p-3.5 rounded-xl text-xs space-y-1 bg-white border border-slate-200 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{msg.senderName} ({msg.senderRole})</span>
                      <span className="text-[10px] text-slate-400 font-mono">{msg.timestamp}</span>
                    </div>
                    <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                  </div>
                ))}
              </div>

              {/* Reply */}
              <form onSubmit={handleSendReply} className="p-3.5 border-t border-slate-200 bg-white flex gap-2">
                <textarea
                  rows={2}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type reply or additional notes for SaaS support..."
                  className="flex-1 text-xs p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
                <Button type="submit" variant="primary" size="md" className="self-end text-xs font-bold">
                  <Send className="w-3.5 h-3.5 mr-1" />
                  Reply
                </Button>
              </form>
            </Card>
          ) : (
            <Card className="flex-1 p-12 text-center text-slate-400 text-xs">
              No ticket selected.
            </Card>
          )}
        </div>
      </div>

      {/* New Ticket Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Plus className="w-4 h-4 text-blue-600" />
                Submit New Ticket to SaaS Support
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateTicket} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 mb-1 block">Category</label>
                  <select
                    value={newTicket.category}
                    onChange={(e) => setNewTicket({ ...newTicket, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white"
                  >
                    <option value="Billing & Subscriptions">Billing & Invoicing</option>
                    <option value="Clinical Workflow">Clinical Workflow</option>
                    <option value="Technical & Bug">Technical & Bug</option>
                    <option value="Hardware/Integration">Thermal Printer / Hardware</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 mb-1 block">Urgency / Priority</label>
                  <select
                    value={newTicket.priority}
                    onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical (OPD Blocker)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 mb-1 block">Subject / Issue Summary *</label>
                <input
                  required
                  type="text"
                  value={newTicket.subject}
                  onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                  placeholder="e.g. Need assistance setting custom GST tax rate"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 mb-1 block">Detailed Description *</label>
                <textarea
                  required
                  rows={3}
                  value={newTicket.description}
                  onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                  placeholder="Describe what occurred, steps to reproduce, or requested configuration..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-200"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 mb-1 block">Attachment Reference</label>
                <div className="flex items-center gap-2 p-2 rounded-lg border border-slate-200 bg-slate-50 text-[11px] text-slate-600">
                  <Paperclip className="w-3.5 h-3.5 text-slate-400" />
                  <span>{newTicket.simulatedAttachment}</span>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
                <Button variant="secondary" size="sm" type="button" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  Submit Ticket
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}


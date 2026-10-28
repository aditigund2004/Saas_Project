import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { LifeBuoy, Plus, MessageSquare, Send, Paperclip, CheckCircle2, Clock, X, List, LayoutGrid } from 'lucide-react';


export function ClinicSupportPage() {
  const { supportTickets, createSupportTicket, addTicketMessage, activeClinic, currentUser } = useApp();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTicketId, setSelectedTicketId] = useState(null);
  const [replyText, setReplyText] = useState('');
  const [viewMode, setViewMode] = useState('table');


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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/40 px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-900/50 uppercase tracking-wide">
              ClinicOS Helpdesk
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">SaaS Support & Helpdesk</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">

            Submit technical tickets, request custom clinical templates, or get billing assistance from the ClinicOS SaaS engineering team
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`p-1 px-2.5 rounded text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span>Table</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('split')}
              className={`p-1 px-2.5 rounded text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                viewMode === 'split'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Split View</span>
            </button>
          </div>

          <Button variant="primary" size="sm" onClick={() => setModalOpen(true)}>
            <Plus className="w-3.5 h-3.5 mr-1" />
            Raise Support Ticket
          </Button>
        </div>
      </div>

      {viewMode === 'table' ? (
        <Card className="overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="px-3.5 py-3 text-center w-12 font-semibold">#</th>
                  <th className="px-4 py-3">Ticket #</th>
                  <th className="px-4 py-3">Subject & Inquiries</th>
                  <th className="px-4 py-3">Category</th>
                  <th className="px-4 py-3">Priority</th>
                  <th className="px-4 py-3">Assigned Specialist</th>
                  <th className="px-4 py-3">Created</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {clinicTickets.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-4 py-8 text-center text-slate-400 dark:text-slate-500">
                      No active support tickets found. Click "Raise Support Ticket" to create one.
                    </td>
                  </tr>
                ) : (
                  clinicTickets.map((t, idx) => (
                    <tr key={t.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="px-3.5 py-3 text-center font-mono font-medium text-slate-400 dark:text-slate-500 text-xs">
                        {idx + 1}
                      </td>
                      <td className="px-4 py-3 font-mono font-bold text-blue-700 dark:text-blue-400 whitespace-nowrap">
                        {t.ticketNumber}
                      </td>
                      <td className="px-4 py-3 max-w-sm">
                        <div className="font-bold text-slate-900 dark:text-white truncate">{t.subject}</div>
                        <div className="text-[11px] text-slate-400 dark:text-slate-500 truncate">{t.description}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <Badge variant="teal" size="sm">{t.category}</Badge>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <Badge
                          variant={
                            t.priority === 'Critical' ? 'danger' :
                            t.priority === 'High' ? 'warning' : 'default'
                          }
                          size="sm"
                        >
                          {t.priority}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-slate-700 dark:text-slate-300 font-medium">
                        {t.assignedAgentName || 'Pooja Sharma'}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                        {t.createdAt}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <Badge variant={t.status === 'Resolved' ? 'success' : 'warning'} size="sm">
                          {t.status}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs h-7 px-2.5 font-medium"
                          onClick={() => {
                            setSelectedTicketId(t.id);
                            setViewMode('split');
                          }}
                        >
                          <MessageSquare className="w-3.5 h-3.5 mr-1 text-blue-600 dark:text-blue-400" />
                          View Thread
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[500px]">
        {/* Left: Ticket List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <LifeBuoy className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            Your Support Requests ({clinicTickets.length})
          </h3>

          <Card className="divide-y divide-slate-100 dark:divide-slate-800 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 max-h-[520px] overflow-y-auto">
            {clinicTickets.length === 0 ? (
              <div className="p-8 text-center text-slate-400 dark:text-slate-500 text-xs">

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
                        ? 'bg-blue-50/70 dark:bg-blue-950/40 border-l-4 border-l-blue-600'
                        : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-blue-700 dark:text-blue-400">{t.ticketNumber}</span>

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
                    <div className="font-bold text-slate-900 dark:text-white line-clamp-1">{t.subject}</div>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 pt-1">
                      <span>Status: <strong className="text-slate-700 dark:text-slate-300">{t.status}</strong></span>

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
            <Card className="flex-1 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col overflow-hidden">
              <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-blue-800 dark:text-blue-400 text-sm">{selectedTicket.ticketNumber}</span>

                    <Badge variant="teal" size="sm">{selectedTicket.category}</Badge>
                  </div>
                  <Badge variant={selectedTicket.status === 'Resolved' ? 'success' : 'warning'} size="sm">
                    {selectedTicket.status}
                  </Badge>
                </div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">{selectedTicket.subject}</h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Assigned Support Specialist: <strong className="text-slate-700 dark:text-slate-300">{selectedTicket.assignedAgentName || 'Pooja Sharma'}</strong>

                </p>
              </div>

              {/* Thread */}
              <div className="p-4 flex-1 overflow-y-auto space-y-3 max-h-[350px] bg-slate-50/30 dark:bg-slate-950/20">
                {selectedTicket.messages.filter(m => !m.isInternal).map((msg) => (
                  <div key={msg.id} className="p-3.5 rounded-xl text-xs space-y-1 bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900 dark:text-white">{msg.senderName} ({msg.senderRole})</span>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-mono">{msg.timestamp}</span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">{msg.message}</p>

                  </div>
                ))}
              </div>

              {/* Reply */}
              <form onSubmit={handleSendReply} className="p-3.5 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex gap-2">

                <textarea
                  rows={2}
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Type reply or additional notes for SaaS support..."
                  className="flex-1 text-xs p-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"

                />
                <Button type="submit" variant="primary" size="md" className="self-end text-xs font-bold">
                  <Send className="w-3.5 h-3.5 mr-1" />
                  Reply
                </Button>
              </form>
            </Card>
          ) : (
            <Card className="flex-1 p-12 text-center text-slate-400 dark:text-slate-500 text-xs border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">

              No ticket selected.
            </Card>
          )}
        </div>
      </div>
      )}

      {/* New Ticket Modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs cursor-pointer"
          onClick={() => setModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 w-full max-w-md p-6 space-y-4 cursor-default"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Submit New Ticket to SaaS Support
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">

                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateTicket} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 mb-1 block">Category</label>
                  <select
                    value={newTicket.category}
                    onChange={(e) => setNewTicket({ ...newTicket, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"

                  >
                    <option value="Billing & Subscriptions">Billing & Invoicing</option>
                    <option value="Clinical Workflow">Clinical Workflow</option>
                    <option value="Technical & Bug">Technical & Bug</option>
                    <option value="Hardware/Integration">Thermal Printer / Hardware</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 dark:text-slate-300 mb-1 block">Urgency / Priority</label>
                  <select
                    value={newTicket.priority}
                    onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"

                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                    <option value="Critical">Critical (OPD Blocker)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 mb-1 block">Subject / Issue Summary *</label>

                <input
                  required
                  type="text"
                  value={newTicket.subject}
                  onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
                  placeholder="e.g. Need assistance setting custom GST tax rate"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"

                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 mb-1 block">Detailed Description *</label>

                <textarea
                  required
                  rows={3}
                  value={newTicket.description}
                  onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
                  placeholder="Describe what occurred, steps to reproduce, or requested configuration..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100"

                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 dark:text-slate-300 mb-1 block">Attachment Reference</label>
                <div className="flex items-center gap-2 p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-[11px] text-slate-600 dark:text-slate-300">

                  <Paperclip className="w-3.5 h-3.5 text-slate-400" />
                  <span>{newTicket.simulatedAttachment}</span>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">

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


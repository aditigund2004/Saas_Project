import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
  LifeBuoy,
  Search,
  Filter,
  MessageSquare,
  Clock,
  UserCheck,
  CheckCircle2,
  AlertTriangle,
  Send,
  Paperclip,
  Lock,
  Building2,
  X
} from 'lucide-react';

export function PlatformSupportPage() {
  const { supportTickets, addTicketMessage, updateTicketStatus, assignTicket, currentUser } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTicketId, setSelectedTicketId] = useState(supportTickets[0]?.id || null);
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');

  const [replyText, setReplyText] = useState('');
  const [isInternalNote, setIsInternalNote] = useState(false);

  const selectedTicket = supportTickets.find((t) => t.id === selectedTicketId) || supportTickets[0];

  const filteredTickets = supportTickets.filter((t) => {
    const matchesSearch =
      t.ticketNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.clinicName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || t.status === statusFilter;
    const matchesPriority = priorityFilter === 'All' || t.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedTicket) return;
    addTicketMessage(selectedTicket.id, replyText, isInternalNote);
    setReplyText('');
    setIsInternalNote(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full border border-purple-200 uppercase tracking-wide">
              SaaS Support Desk
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Support Ticket Management</h1>
          <p className="text-xs text-slate-500">
            Multi-tenant clinic support requests, SLA monitoring, agent assignment, and internal resolution notes
          </p>
        </div>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[600px]">
        {/* Left Column: Ticket Queue (5 Cols) */}
        <div className="lg:col-span-5 space-y-3 flex flex-col">
          {/* Search & Filters */}
          <div className="space-y-2">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search ticket #, clinic, or subject..."
                className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 text-xs bg-white focus:ring-2 focus:ring-purple-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white text-slate-700 font-medium flex-1"
              >
                <option value="All">All Statuses</option>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>

              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="text-xs border border-slate-200 rounded-lg px-2.5 py-1.5 bg-white text-slate-700 font-medium flex-1"
              >
                <option value="All">All Priorities</option>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          {/* Ticket List */}
          <Card className="divide-y divide-slate-100 border-slate-200 flex-1 overflow-y-auto max-h-[550px]">
            {filteredTickets.map((t) => {
              const isSelected = selectedTicket?.id === t.id;
              return (
                <div
                  key={t.id}
                  onClick={() => setSelectedTicketId(t.id)}
                  className={`p-3.5 space-y-1.5 cursor-pointer transition-colors text-xs ${
                    isSelected
                      ? 'bg-purple-50/70 border-l-4 border-l-purple-600'
                      : 'hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-purple-700">{t.ticketNumber}</span>
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

                  <h4 className="font-bold text-slate-900 line-clamp-1">{t.subject}</h4>
                  <div className="text-[11px] text-slate-500 flex items-center gap-1">
                    <Building2 className="w-3 h-3 text-slate-400" />
                    <span>{t.clinicName}</span>
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                    <span>Assigned: {t.assignedAgentName || 'Unassigned'}</span>
                    <span className="font-medium text-slate-600">{t.status}</span>
                  </div>
                </div>
              );
            })}
          </Card>
        </div>

        {/* Right Column: Ticket Conversation Detail (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col">
          {selectedTicket ? (
            <Card className="flex-1 border-slate-200 flex flex-col overflow-hidden">
              {/* Ticket Header Bar */}
              <div className="p-4 bg-slate-50 border-b border-slate-200 space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-purple-800 text-sm">{selectedTicket.ticketNumber}</span>
                    <Badge variant={selectedTicket.priority === 'Critical' ? 'danger' : 'warning'} size="sm">
                      {selectedTicket.priority} Priority
                    </Badge>
                    <Badge variant="teal" size="sm">
                      {selectedTicket.category}
                    </Badge>
                  </div>

                  {/* Status Transition Dropdown */}
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] text-slate-500 font-semibold">Status:</span>
                    <select
                      value={selectedTicket.status}
                      onChange={(e) => updateTicketStatus(selectedTicket.id, e.target.value)}
                      className="text-xs border border-slate-300 rounded-lg px-2 py-1 bg-white font-bold text-slate-800"
                    >
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Waiting on Customer">Waiting on Customer</option>
                      <option value="Resolved">Resolved</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>
                </div>

                <h3 className="text-base font-bold text-slate-900">{selectedTicket.subject}</h3>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500">
                  <span>Tenant: <strong>{selectedTicket.clinicName}</strong></span>
                  <span>·</span>
                  <span>Agent: <strong>{selectedTicket.assignedAgentName}</strong></span>
                  <span>·</span>
                  <span>Logged: {selectedTicket.createdAt}</span>
                </div>
              </div>

              {/* Messages Timeline */}
              <div className="p-4 flex-1 overflow-y-auto space-y-3.5 max-h-[380px] bg-slate-50/30">
                {selectedTicket.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-3.5 rounded-xl text-xs space-y-1.5 shadow-xs ${
                      msg.isInternal
                        ? 'bg-amber-50 border border-amber-200 text-amber-950'
                        : 'bg-white border border-slate-200 text-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        {msg.isInternal && <Lock className="w-3 h-3 text-amber-600" />}
                        <span className="font-bold text-slate-900">{msg.senderName}</span>
                        <span className="text-[10px] text-slate-500">({msg.senderRole})</span>
                        {msg.isInternal && (
                          <span className="text-[10px] bg-amber-200/60 text-amber-900 font-bold px-1.5 py-0.2 rounded uppercase">
                            Internal Staff Note
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">{msg.timestamp}</span>
                    </div>
                    <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{msg.message}</p>
                  </div>
                ))}
              </div>

              {/* Reply Composer */}
              <form onSubmit={handleSendReply} className="p-4 border-t border-slate-200 bg-white space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-1.5 text-xs text-amber-900 cursor-pointer font-semibold bg-amber-50 px-2.5 py-1 rounded-lg border border-amber-200">
                      <input
                        type="checkbox"
                        checked={isInternalNote}
                        onChange={(e) => setIsInternalNote(e.target.checked)}
                        className="rounded text-amber-600 focus:ring-amber-500"
                      />
                      <span>Internal Agent Note (Hidden from Clinic)</span>
                    </label>
                  </div>
                  <span className="text-[11px] text-slate-400">Simulated SaaS Email & Portal Sync</span>
                </div>

                <div className="flex gap-2">
                  <textarea
                    rows={2}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder={
                      isInternalNote
                        ? 'Write private internal note for team review...'
                        : 'Type response to clinic administrator...'
                    }
                    className="flex-1 text-xs p-2.5 rounded-xl border border-slate-200 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    className="self-end bg-purple-600 hover:bg-purple-700 font-bold text-xs"
                  >
                    <Send className="w-3.5 h-3.5 mr-1" />
                    Send
                  </Button>
                </div>
              </form>
            </Card>
          ) : (
            <Card className="flex-1 p-12 text-center text-slate-400 text-xs">
              Select a ticket from the left panel to inspect conversation.
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}


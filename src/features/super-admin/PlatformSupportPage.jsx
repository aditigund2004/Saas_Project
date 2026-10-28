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
  X,
  List,
  LayoutGrid

} from 'lucide-react';

export function PlatformSupportPage() {
  const { supportTickets, addTicketMessage, updateTicketStatus, assignTicket, currentUser } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTicketId, setSelectedTicketId] = useState(supportTickets[0]?.id || null);
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [viewMode, setViewMode] = useState('table');


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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-purple-700 dark:text-purple-300 bg-purple-50 dark:bg-purple-950/60 px-3 py-1 rounded-full border border-purple-200 dark:border-purple-800 uppercase tracking-wider">
              SaaS Support Desk
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">Support Ticket Management</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Multi-tenant clinic support requests, SLA monitoring, agent assignment, and internal resolution notes
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`p-1 px-2.5 rounded text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-xs'
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
                  ? 'bg-white dark:bg-slate-900 text-purple-600 dark:text-purple-400 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Split View</span>
            </button>
          </div>
        </div>
      </div>

      {viewMode === 'table' ? (
        <Card className="overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <div className="p-4 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search ticket #, clinic, or subject..."
                className="w-full pl-9 pr-3 py-2 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-xs border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-2 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 font-medium focus:ring-2 focus:ring-purple-500 focus:outline-none"
              >
                <option value="All">All Statuses</option>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>

              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="text-xs border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-2 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 font-medium focus:ring-2 focus:ring-purple-500 focus:outline-none"
              >
                <option value="All">All Priorities</option>
                <option value="Critical">Critical</option>
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead className="bg-slate-50 dark:bg-slate-800/40 text-slate-600 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="px-3 py-3 text-center w-12 font-semibold">#</th>
                  <th className="px-4 py-3">Ticket #</th>
                  <th className="px-4 py-3">Tenant Clinic</th>
                  <th className="px-4 py-3">Subject & Inquiries</th>
                  <th className="px-4 py-3">Priority</th>
                  <th className="px-4 py-3">Assigned Agent</th>
                  <th className="px-4 py-3">Created</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredTickets.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-4 py-12 text-center text-slate-400 dark:text-slate-500">
                      No support tickets match the selected filters.
                    </td>
                  </tr>
                ) : (
                  filteredTickets.map((t, idx) => (
                    <tr key={t.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="px-3 py-3 text-center font-mono font-medium text-slate-400 dark:text-slate-500 text-xs">{idx + 1}</td>
                      <td className="px-4 py-3 font-mono font-bold text-purple-700 dark:text-purple-400 whitespace-nowrap">
                        {t.ticketNumber}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                          <Building2 className="w-3.5 h-3.5 text-slate-400" />
                          <span>{t.clinicName}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 max-w-sm">
                        <div className="font-bold text-slate-900 dark:text-white truncate">{t.subject}</div>
                        <div className="text-[11px] text-slate-400 dark:text-slate-500 truncate">{t.description}</div>
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
                        {t.assignedAgentName || 'Unassigned'}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                        {t.createdAt}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <Badge
                          variant={
                            t.status === 'Resolved' ? 'success' :
                            t.status === 'In Progress' ? 'warning' : 'default'
                          }
                          size="sm"
                        >
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
                          <MessageSquare className="w-3.5 h-3.5 mr-1 text-purple-600 dark:text-purple-400" />
                          Inspect
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
        /* Main Two-Column Layout */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[600px]">

        {/* Left Column: Ticket Queue (5 Cols) */}
        <div className="lg:col-span-5 space-y-3 flex flex-col">
          {/* Search & Filters */}
          <div className="space-y-2">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />

              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search ticket #, clinic, or subject..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:outline-none placeholder:text-slate-400"

              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="text-sm border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-200 font-medium flex-1 focus:ring-2 focus:ring-purple-500 focus:outline-none"

              >
                <option value="All">All Statuses</option>
                <option value="Open">Open</option>
                <option value="In Progress">In Progress</option>
                <option value="Resolved">Resolved</option>
              </select>

              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="text-sm border border-slate-200 dark:border-slate-700 rounded-xl px-3 py-2 bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-200 font-medium flex-1 focus:ring-2 focus:ring-purple-500 focus:outline-none"

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
          <Card className="divide-y divide-slate-100 dark:divide-slate-800 border-slate-200 dark:border-slate-800 dark:bg-slate-900 flex-1 overflow-y-auto max-h-[550px] shadow-sm">

            {filteredTickets.map((t) => {
              const isSelected = selectedTicket?.id === t.id;
              return (
                <div
                  key={t.id}
                  onClick={() => setSelectedTicketId(t.id)}
                  className={`p-4 space-y-2 cursor-pointer transition-colors text-sm ${
                    isSelected
                      ? 'bg-purple-50/70 dark:bg-purple-950/40 border-l-4 border-l-purple-600 dark:border-l-purple-500'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-purple-700 dark:text-purple-400 text-sm">{t.ticketNumber}</span>

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

                  <h4 className="font-bold text-slate-900 dark:text-white line-clamp-1 text-base">{t.subject}</h4>
                  <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>{t.clinicName}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400 dark:text-slate-500 pt-1">
                    <span>Assigned: {t.assignedAgentName || 'Unassigned'}</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">{t.status}</span>

                  </div>
                </div>
              );
            })}
          </Card>
        </div>

        {/* Right Column: Ticket Conversation Detail (7 Cols) */}
        <div className="lg:col-span-7 flex flex-col">
          {selectedTicket ? (
            <Card className="flex-1 border-slate-200 dark:border-slate-800 dark:bg-slate-900 flex flex-col overflow-hidden shadow-sm">
              {/* Ticket Header Bar */}
              <div className="p-4 sm:p-5 bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 space-y-2.5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-purple-800 dark:text-purple-300 text-base">{selectedTicket.ticketNumber}</span>

                    <Badge variant={selectedTicket.priority === 'Critical' ? 'danger' : 'warning'} size="sm">
                      {selectedTicket.priority} Priority
                    </Badge>
                    <Badge variant="teal" size="sm">
                      {selectedTicket.category}
                    </Badge>
                  </div>

                  {/* Status Transition Dropdown */}
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-wider">Status:</span>
                    <select
                      value={selectedTicket.status}
                      onChange={(e) => updateTicketStatus(selectedTicket.id, e.target.value)}
                      className="text-xs border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-1.5 bg-white dark:bg-slate-950 font-bold text-slate-800 dark:text-slate-100 focus:ring-2 focus:ring-purple-500 focus:outline-none"

                    >
                      <option value="Open">Open</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Waiting on Customer">Waiting on Customer</option>
                      <option value="Resolved">Resolved</option>
                      <option value="Closed">Closed</option>
                    </select>
                  </div>
                </div>

                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{selectedTicket.subject}</h3>
                <div className="flex flex-wrap items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
                  <span>Tenant: <strong className="text-slate-800 dark:text-slate-200">{selectedTicket.clinicName}</strong></span>
                  <span>·</span>
                  <span>Agent: <strong className="text-slate-800 dark:text-slate-200">{selectedTicket.assignedAgentName}</strong></span>

                  <span>·</span>
                  <span>Logged: {selectedTicket.createdAt}</span>
                </div>
              </div>

              {/* Messages Timeline */}
              <div className="p-4 sm:p-5 flex-1 overflow-y-auto space-y-4 max-h-[380px] bg-slate-50/30 dark:bg-slate-950/30">
                {selectedTicket.messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`p-4 rounded-2xl text-sm space-y-2 shadow-xs ${
                      msg.isInternal
                        ? 'bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900 text-amber-950 dark:text-amber-100'
                        : 'bg-white dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {msg.isInternal && <Lock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />}
                        <span className="font-bold text-slate-900 dark:text-white">{msg.senderName}</span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">({msg.senderRole})</span>
                        {msg.isInternal && (
                          <span className="text-xs bg-amber-200/60 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 font-bold px-2 py-0.5 rounded uppercase">

                            Internal Staff Note
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">{msg.timestamp}</span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-wrap">{msg.message}</p>

                  </div>
                ))}
              </div>

              {/* Reply Composer */}
              <form onSubmit={handleSendReply} className="p-4 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <label className="flex items-center gap-2 text-xs text-amber-900 dark:text-amber-200 cursor-pointer font-bold bg-amber-50 dark:bg-amber-950/60 px-3 py-1.5 rounded-xl border border-amber-200 dark:border-amber-800">

                      <input
                        type="checkbox"
                        checked={isInternalNote}
                        onChange={(e) => setIsInternalNote(e.target.checked)}
                        className="rounded text-amber-600 focus:ring-amber-500"
                      />
                      <span>Internal Agent Note (Hidden from Clinic)</span>
                    </label>
                  </div>
                  <span className="text-xs text-slate-400 dark:text-slate-500">Simulated SaaS Email & Portal Sync</span>
                </div>

                <div className="flex gap-2.5">

                  <textarea
                    rows={2}
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder={
                      isInternalNote
                        ? 'Write private internal note for team review...'
                        : 'Type response to clinic administrator...'
                    }
                    className="flex-1 text-sm p-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:outline-none placeholder:text-slate-400"

                  />
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    className="self-end bg-purple-600 hover:bg-purple-700 font-bold text-sm"
                  >
                    <Send className="w-4 h-4 mr-1.5" />

                    Send
                  </Button>
                </div>
              </form>
            </Card>
          ) : (
            <Card className="flex-1 p-12 text-center text-slate-400 dark:text-slate-500 text-sm">

              Select a ticket from the left panel to inspect conversation.
            </Card>
          )}
        </div>
      </div>
      )}
    </div>
  );
}


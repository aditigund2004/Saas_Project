import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { ClipboardList, CheckCircle2, XCircle, Search, Clock, Plus, X } from 'lucide-react';

export function InventoryRequestsPage() {
  const { stockRequests, updateStockRequestStatus, createStockRequest } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [modalOpen, setModalOpen] = useState(false);

  const [newRequest, setNewRequest] = useState({
    itemName: 'Articaine 4% Local Anesthetic with Adrenaline',
    sku: 'ANE-ART-02',
    quantity: 5,
    unit: 'Vials Pack (50)',
    urgency: 'Urgent',
    department: 'Operatory 1',
    requestedBy: 'Shweta Kulkarni',
    notes: 'Urgent demand for scheduled morning surgical extractions'
  });

  const filteredRequests = stockRequests.filter((r) => {
    const matchesSearch =
      r.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.requestedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.department.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || r.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleCreate = (e) => {
    e.preventDefault();
    createStockRequest({
      ...newRequest,
      quantity: Number(newRequest.quantity)
    });
    setModalOpen(false);
  };

  return (
    <div className="space-y-6">
<<<<<<< HEAD
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-full border border-blue-200 dark:border-blue-800 uppercase tracking-wide">
              Internal Clinical Requisitions
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Department Stock Requests</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
=======
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200 uppercase tracking-wide">
              Internal Clinical Requisitions
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Department Stock Requests</h1>
          <p className="text-xs text-slate-500">
>>>>>>> origin/main
            Fulfill or triage consumable restock requests submitted by doctors, nurses, and receptionists
          </p>
        </div>

<<<<<<< HEAD
        <Button variant="primary" size="sm" onClick={() => setModalOpen(true)} className="font-semibold shadow-sm">
          <Plus className="w-4 h-4 mr-1.5" />
=======
        <Button variant="primary" size="sm" onClick={() => setModalOpen(true)}>
          <Plus className="w-3.5 h-3.5 mr-1" />
>>>>>>> origin/main
          Create Stock Request
        </Button>
      </div>

<<<<<<< HEAD
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
=======
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
>>>>>>> origin/main
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by item name, requester, or department..."
<<<<<<< HEAD
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
=======
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
>>>>>>> origin/main
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
<<<<<<< HEAD
          className="text-xs border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 bg-white dark:bg-slate-950 text-slate-700 dark:text-slate-200 font-semibold focus:ring-2 focus:ring-blue-500 focus:outline-none"
=======
          className="text-xs border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700 font-medium"
>>>>>>> origin/main
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending Review</option>
          <option value="Approved">Approved & Dispatched</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

<<<<<<< HEAD
      <Card className="overflow-hidden border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left border-collapse">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 font-bold border-b border-slate-200 dark:border-slate-800 uppercase tracking-wider text-xs">
              <tr>
                <th className="px-3 py-3 text-center w-12 font-bold">#</th>
=======
      <Card className="overflow-hidden border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
>>>>>>> origin/main
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Item Requested</th>
                <th className="px-4 py-3">Quantity</th>
                <th className="px-4 py-3">Requester & Dept</th>
                <th className="px-4 py-3">Urgency</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
<<<<<<< HEAD
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-slate-400 dark:text-slate-500">
=======
            <tbody className="divide-y divide-slate-100">
              {filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-slate-400">
>>>>>>> origin/main
                    No requests found.
                  </td>
                </tr>
              ) : (
<<<<<<< HEAD
                filteredRequests.map((req, idx) => (
                  <tr key={req.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                    <td className="px-3 py-3.5 text-center font-mono font-medium text-slate-400 dark:text-slate-500 text-xs">{idx + 1}</td>
                    <td className="px-4 py-3.5 font-mono text-slate-500 dark:text-slate-400 whitespace-nowrap">
                      {req.requestedDate}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="font-bold text-slate-900 dark:text-white text-sm">{req.itemName}</div>
                      {req.notes && <p className="text-xs text-slate-400 dark:text-slate-500 italic mt-0.5">"{req.notes}"</p>}
                    </td>
                    <td className="px-4 py-3.5 font-mono font-bold text-slate-900 dark:text-white text-sm">
                      {req.quantity} {req.unit}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="font-semibold text-slate-800 dark:text-slate-200 text-sm">{req.requestedBy}</div>
                      <div className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{req.department}</div>
                    </td>
                    <td className="px-4 py-3.5">
=======
                filteredRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-4 py-3 font-mono text-slate-500 whitespace-nowrap">
                      {req.requestedDate}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-bold text-slate-900">{req.itemName}</div>
                      {req.notes && <p className="text-[10px] text-slate-400 italic">"{req.notes}"</p>}
                    </td>
                    <td className="px-4 py-3 font-mono font-bold text-slate-900">
                      {req.quantity} {req.unit}
                    </td>
                    <td className="px-4 py-3">
                      <div className="font-semibold text-slate-800">{req.requestedBy}</div>
                      <div className="text-[10px] text-slate-400">{req.department}</div>
                    </td>
                    <td className="px-4 py-3">
>>>>>>> origin/main
                      <Badge variant={req.urgency === 'Urgent' ? 'danger' : 'default'} size="sm">
                        {req.urgency}
                      </Badge>
                    </td>
<<<<<<< HEAD
                    <td className="px-4 py-3.5">
=======
                    <td className="px-4 py-3">
>>>>>>> origin/main
                      <Badge
                        variant={
                          req.status === 'Approved' ? 'success' :
                          req.status === 'Rejected' ? 'danger' : 'warning'
                        }
                        size="sm"
                      >
                        {req.status}
                      </Badge>
                    </td>
<<<<<<< HEAD
                    <td className="px-4 py-3.5 text-right whitespace-nowrap">
=======
                    <td className="px-4 py-3 text-right">
>>>>>>> origin/main
                      {req.status === 'Pending' ? (
                        <div className="flex items-center justify-end gap-1.5">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => updateStockRequestStatus(req.id, 'Approved', 'Approved and dispatched from main store')}
<<<<<<< HEAD
                            className="h-8 text-xs font-semibold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 mr-1" />
=======
                            className="h-7 text-xs bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100"
                          >
                            <CheckCircle2 className="w-3 h-3 mr-1" />
>>>>>>> origin/main
                            Approve
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateStockRequestStatus(req.id, 'Rejected', 'Insufficient central stock')}
<<<<<<< HEAD
                            className="h-8 text-xs font-semibold text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                          >
                            <XCircle className="w-3.5 h-3.5 mr-1" />
=======
                            className="h-7 text-xs text-rose-600 hover:bg-rose-50"
                          >
                            <XCircle className="w-3 h-3 mr-1" />
>>>>>>> origin/main
                            Reject
                          </Button>
                        </div>
                      ) : (
<<<<<<< HEAD
                        <span className="text-xs text-slate-400 dark:text-slate-500 italic">Resolved</span>
=======
                        <span className="text-[11px] text-slate-400 italic">Resolved</span>
>>>>>>> origin/main
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modal */}
      {modalOpen && (
<<<<<<< HEAD
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs cursor-pointer"
          onClick={() => setModalOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 w-full max-w-md p-6 space-y-4 cursor-default"
          >
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <Plus className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                Submit Department Stock Request
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 cursor-pointer">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3.5 text-xs">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">Item Name *</label>
=======
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs">
          <div className="bg-white rounded-2xl shadow-xl border border-slate-200 w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-sm text-slate-900 flex items-center gap-2">
                <Plus className="w-4 h-4 text-blue-600" />
                Submit Department Stock Request
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="font-semibold text-slate-700 mb-1 block">Item Name *</label>
>>>>>>> origin/main
                <input
                  required
                  type="text"
                  value={newRequest.itemName}
                  onChange={(e) => setNewRequest({ ...newRequest, itemName: e.target.value })}
<<<<<<< HEAD
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-medium focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">Quantity</label>
=======
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 mb-1 block">Quantity</label>
>>>>>>> origin/main
                  <input
                    required
                    type="number"
                    min="1"
                    value={newRequest.quantity}
                    onChange={(e) => setNewRequest({ ...newRequest, quantity: e.target.value })}
<<<<<<< HEAD
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-mono focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">Unit</label>
=======
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 font-mono"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 mb-1 block">Unit</label>
>>>>>>> origin/main
                  <input
                    type="text"
                    value={newRequest.unit}
                    onChange={(e) => setNewRequest({ ...newRequest, unit: e.target.value })}
<<<<<<< HEAD
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
=======
                    className="w-full px-3 py-2 rounded-lg border border-slate-200"
>>>>>>> origin/main
                  />
                </div>
              </div>

<<<<<<< HEAD
              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">Department</label>
=======
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 mb-1 block">Department</label>
>>>>>>> origin/main
                  <input
                    type="text"
                    value={newRequest.department}
                    onChange={(e) => setNewRequest({ ...newRequest, department: e.target.value })}
<<<<<<< HEAD
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">Urgency</label>
                  <select
                    value={newRequest.urgency}
                    onChange={(e) => setNewRequest({ ...newRequest, urgency: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
=======
                    className="w-full px-3 py-2 rounded-lg border border-slate-200"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 mb-1 block">Urgency</label>
                  <select
                    value={newRequest.urgency}
                    onChange={(e) => setNewRequest({ ...newRequest, urgency: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white"
>>>>>>> origin/main
                  >
                    <option value="Routine">Routine</option>
                    <option value="Urgent">Urgent</option>
                    <option value="Emergency">Emergency</option>
                  </select>
                </div>
              </div>

              <div>
<<<<<<< HEAD
                <label className="font-bold text-slate-700 dark:text-slate-300 mb-1 block">Notes / Reason</label>
=======
                <label className="font-semibold text-slate-700 mb-1 block">Notes / Reason</label>
>>>>>>> origin/main
                <textarea
                  rows={2}
                  value={newRequest.notes}
                  onChange={(e) => setNewRequest({ ...newRequest, notes: e.target.value })}
<<<<<<< HEAD
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100 dark:border-slate-800">
=======
                  className="w-full px-3 py-2 rounded-lg border border-slate-200"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
>>>>>>> origin/main
                <Button variant="secondary" size="sm" type="button" onClick={() => setModalOpen(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" type="submit">
                  Submit Request
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
<<<<<<< HEAD
=======

>>>>>>> origin/main

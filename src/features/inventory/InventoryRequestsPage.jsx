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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200 uppercase tracking-wide">
              Internal Clinical Requisitions
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Department Stock Requests</h1>
          <p className="text-xs text-slate-500">
            Fulfill or triage consumable restock requests submitted by doctors, nurses, and receptionists
          </p>
        </div>

        <Button variant="primary" size="sm" onClick={() => setModalOpen(true)}>
          <Plus className="w-3.5 h-3.5 mr-1" />
          Create Stock Request
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3 rounded-xl border border-slate-200">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by item name, requester, or department..."
            className="w-full pl-9 pr-4 py-2 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="text-xs border border-slate-200 rounded-lg px-3 py-2 bg-white text-slate-700 font-medium"
        >
          <option value="All">All Statuses</option>
          <option value="Pending">Pending Review</option>
          <option value="Approved">Approved & Dispatched</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>

      <Card className="overflow-hidden border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Item Requested</th>
                <th className="px-4 py-3">Quantity</th>
                <th className="px-4 py-3">Requester & Dept</th>
                <th className="px-4 py-3">Urgency</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-slate-400">
                    No requests found.
                  </td>
                </tr>
              ) : (
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
                      <Badge variant={req.urgency === 'Urgent' ? 'danger' : 'default'} size="sm">
                        {req.urgency}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
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
                    <td className="px-4 py-3 text-right">
                      {req.status === 'Pending' ? (
                        <div className="flex items-center justify-end gap-1.5">
                          <Button
                            variant="secondary"
                            size="sm"
                            onClick={() => updateStockRequestStatus(req.id, 'Approved', 'Approved and dispatched from main store')}
                            className="h-7 text-xs bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100"
                          >
                            <CheckCircle2 className="w-3 h-3 mr-1" />
                            Approve
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => updateStockRequestStatus(req.id, 'Rejected', 'Insufficient central stock')}
                            className="h-7 text-xs text-rose-600 hover:bg-rose-50"
                          >
                            <XCircle className="w-3 h-3 mr-1" />
                            Reject
                          </Button>
                        </div>
                      ) : (
                        <span className="text-[11px] text-slate-400 italic">Resolved</span>
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
                <input
                  required
                  type="text"
                  value={newRequest.itemName}
                  onChange={(e) => setNewRequest({ ...newRequest, itemName: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 mb-1 block">Quantity</label>
                  <input
                    required
                    type="number"
                    min="1"
                    value={newRequest.quantity}
                    onChange={(e) => setNewRequest({ ...newRequest, quantity: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 font-mono"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 mb-1 block">Unit</label>
                  <input
                    type="text"
                    value={newRequest.unit}
                    onChange={(e) => setNewRequest({ ...newRequest, unit: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold text-slate-700 mb-1 block">Department</label>
                  <input
                    type="text"
                    value={newRequest.department}
                    onChange={(e) => setNewRequest({ ...newRequest, department: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200"
                  />
                </div>
                <div>
                  <label className="font-semibold text-slate-700 mb-1 block">Urgency</label>
                  <select
                    value={newRequest.urgency}
                    onChange={(e) => setNewRequest({ ...newRequest, urgency: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 bg-white"
                  >
                    <option value="Routine">Routine</option>
                    <option value="Urgent">Urgent</option>
                    <option value="Emergency">Emergency</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold text-slate-700 mb-1 block">Notes / Reason</label>
                <textarea
                  rows={2}
                  value={newRequest.notes}
                  onChange={(e) => setNewRequest({ ...newRequest, notes: e.target.value })}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
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


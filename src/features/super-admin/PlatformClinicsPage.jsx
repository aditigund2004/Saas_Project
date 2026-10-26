import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Search, Building2, ShieldAlert, CheckCircle2, PauseCircle, PlayCircle, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export function PlatformClinicsPage() {
  const { clinics, setClinics, showToast } = useApp();
  const { updateTenantApproval } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [statusModal, setStatusModal] = useState({ isOpen: false, clinic: null, targetStatus: '' });

  const filteredClinics = clinics.filter((c) => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.ownerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.city.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'All' ||
      (statusFilter === 'Rejected'
        ? c.approvalStatus === 'Rejected'
        : statusFilter === 'Pending'
          ? c.approvalStatus === 'Pending' || c.status === 'Pending'
          : c.status === statusFilter);
    return matchesSearch && matchesStatus;
  });

  const handleTenantApproval = (clinic, approvalStatus) => {
    const updated = updateTenantApproval(clinic.id, approvalStatus);
    if (!updated) {
      showToast(`Could not update the administrator account for ${clinic.name}.`, 'error');
      return;
    }

    const status = approvalStatus === 'Approved' ? 'Trial' : 'Suspended';
    setClinics((prev) =>
      prev.map((currentClinic) =>
        currentClinic.id === clinic.id
          ? { ...currentClinic, approvalStatus, status }
          : currentClinic
      )
    );
    showToast(
      approvalStatus === 'Approved'
        ? `${clinic.name} approved. Its administrator can now sign in.`
        : `${clinic.name} registration rejected.`
    );
  };

  const handleStatusChangeConfirm = () => {
    if (!statusModal.clinic || !statusModal.targetStatus) return;

    setClinics((prev) =>
      prev.map((c) =>
        c.id === statusModal.clinic.id ? { ...c, status: statusModal.targetStatus } : c
      )
    );

    showToast(`Clinic ${statusModal.clinic.name} updated to ${statusModal.targetStatus}`);
    setStatusModal({ isOpen: false, clinic: null, targetStatus: '' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">Tenant Directory</span>
          <h1 className="text-2xl font-extrabold text-slate-900">Clinic Tenant Management</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Supervise all multi-tenant healthcare clinics, active trials, branch allocations, and operational statuses.
          </p>
        </div>

        <Link to="/register">
          <Button variant="primary" size="sm">
            + Provision New Clinic
          </Button>
        </Link>
      </div>

      {/* Filters and Search */}
      <Card className="p-4 border-slate-200">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          <div className="sm:col-span-8 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search clinic by name, owner doctor, or city..."
              className="w-full pl-9 pr-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
          </div>

          <div className="sm:col-span-4">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-slate-700 font-medium"
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending Approval</option>
              <option value="Rejected">Rejected Applications</option>
              <option value="Active">Active Accounts</option>
              <option value="Trial">14-Day Free Trials</option>
              <option value="Suspended">Suspended</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Clinics Table */}
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3.5">Clinic Name</th>
                <th className="p-3.5">Specialty</th>
                <th className="p-3.5">Administrator</th>
                <th className="p-3.5">Branches</th>
                <th className="p-3.5">SaaS Plan</th>
                <th className="p-3.5">Trial Expiry</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredClinics.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/50">
                  <td className="p-3.5">
                    <div className="font-bold text-slate-900">{c.name}</div>
                    <div className="text-[10px] text-slate-400">{c.city} · {c.address}</div>
                  </td>
                  <td className="p-3.5">
                    <span className="font-medium text-slate-700">{c.specialty}</span>
                  </td>
                  <td className="p-3.5">
                    <div className="font-medium text-slate-800">{c.ownerName}</div>
                    <div className="text-[10px] text-slate-400">{c.email}</div>
                  </td>
                  <td className="p-3.5 font-semibold text-slate-700">
                    {c.branches.length}
                  </td>
                  <td className="p-3.5">
                    <span className="uppercase text-[10px] font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {c.subscriptionPlanId}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-600 font-mono text-[11px]">
                    {c.isTrial ? '14 Days Demo' : 'Subscribed'}
                  </td>
                  <td className="p-3.5">
                    <Badge variant={c.approvalStatus || c.status}>
                      {c.approvalStatus === 'Pending' ? 'Pending Approval' : c.approvalStatus || c.status}
                    </Badge>
                  </td>
                  <td className="p-3.5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedClinic(c)}
                      >
                        Details
                      </Button>

                      {c.approvalStatus === 'Pending' || c.status === 'Pending' ? (
                        <>
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => handleTenantApproval(c, 'Approved')}
                          >
                            Approve
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-rose-600 hover:bg-rose-50 border-rose-200"
                            onClick={() => handleTenantApproval(c, 'Rejected')}
                          >
                            Reject
                          </Button>
                        </>
                      ) : c.approvalStatus === 'Rejected' ? (
                        <span className="text-[11px] font-semibold text-rose-700">Rejected</span>
                      ) : c.status === 'Active' ? (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-rose-600 hover:bg-rose-50 border-rose-200"
                          onClick={() =>
                            setStatusModal({ isOpen: true, clinic: c, targetStatus: 'Suspended' })
                          }
                        >
                          Suspend
                        </Button>
                      ) : (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-blue-700 hover:bg-blue-50 border-blue-200"
                          onClick={() =>
                            setStatusModal({ isOpen: true, clinic: c, targetStatus: 'Active' })
                          }
                        >
                          Reactivate
                        </Button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Clinic Details Drawer / Modal */}
      {selectedClinic && (
        <Modal
          isOpen={!!selectedClinic}
          onClose={() => setSelectedClinic(null)}
          title={`Clinic Tenant: ${selectedClinic.name}`}
          size="lg"
        >
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-semibold">Specialty:</span>
                <p className="font-bold text-slate-900">{selectedClinic.specialty}</p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-semibold">Administrator:</span>
                <p className="font-bold text-slate-900">{selectedClinic.ownerName}</p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-semibold">Contact Email:</span>
                <p className="font-bold text-slate-900">{selectedClinic.email}</p>
              </div>
              <div>
                <span className="text-slate-400 text-[10px] uppercase font-semibold">Phone:</span>
                <p className="font-bold text-slate-900">{selectedClinic.phone}</p>
              </div>
            </div>

            <div>
              <h4 className="font-bold text-slate-900 mb-2">Configured Branches ({selectedClinic.branches.length})</h4>
              <div className="space-y-2">
                {selectedClinic.branches.map((b) => (
                  <div key={b.id} className="p-3 rounded-lg border border-slate-200 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-slate-800">{b.name} ({b.code})</p>
                      <p className="text-[11px] text-slate-500">{b.address}, {b.city}</p>
                    </div>
                    <span className="text-[10px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
                      {b.operatingHours}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <Link to={`/clinics/${selectedClinic.slug}`} target="_blank" className="text-blue-600 hover:underline flex items-center gap-1 font-semibold">
                Open Public Profile <ExternalLink className="w-3.5 h-3.5" />
              </Link>
              <Button variant="outline" size="sm" onClick={() => setSelectedClinic(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* Status Confirmation Modal */}
      {statusModal.isOpen && (
        <Modal
          isOpen={statusModal.isOpen}
          onClose={() => setStatusModal({ isOpen: false, clinic: null, targetStatus: '' })}
          title={`Confirm Status Change: ${statusModal.targetStatus}`}
          size="sm"
        >
          <div className="space-y-4 text-xs">
            <p className="text-slate-600">
              Are you sure you want to change the status of <strong>{statusModal.clinic?.name}</strong> to{' '}
              <strong className="text-slate-900">{statusModal.targetStatus}</strong>?
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setStatusModal({ isOpen: false, clinic: null, targetStatus: '' })}
              >
                Cancel
              </Button>
              <Button variant="primary" size="sm" onClick={handleStatusChangeConfirm}>
                Confirm Change
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Search, Building2, ChevronLeft, ChevronRight, ExternalLink, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const PAGE_SIZE_OPTIONS = [10, 25, 50];

export function PlatformClinicsPage() {
  const { clinics, setClinics, showToast } = useApp();
  const { updateTenantApproval } = useAuth();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);
  const [selectedClinic, setSelectedClinic] = useState(null);
  const [statusModal, setStatusModal] = useState({ isOpen: false, clinic: null, targetStatus: '' });

  const getStatus = (clinic) => {
    if (clinic.approvalStatus === 'Pending' || clinic.status === 'Pending') return 'Pending';
    if (clinic.approvalStatus === 'Rejected') return 'Rejected';
    if (clinic.status === 'Suspended') return 'Suspended';
    if (clinic.isTrial || clinic.status === 'Trial') return 'Trial';
    return clinic.status || 'Unknown';
  };

  const normalizedSearch = searchQuery.trim().toLowerCase();
  const filteredClinics = clinics.filter((c) => {
    const searchableText = [c.name, c.ownerName, c.city, c.email, c.specialty]
      .filter(Boolean)
      .join(' ')
      .toLowerCase();
    const matchesSearch = searchableText.includes(normalizedSearch);
    const matchesStatus = statusFilter === 'All' || getStatus(c) === statusFilter;
    return matchesSearch && matchesStatus;
  });
  const totalPages = Math.max(1, Math.ceil(filteredClinics.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const visibleClinics = filteredClinics.slice((currentPage - 1) * pageSize, currentPage * pageSize);
  const pendingCount = clinics.filter((clinic) => getStatus(clinic) === 'Pending').length;
  const activeCount = clinics.filter((clinic) => getStatus(clinic) === 'Active').length;
  const trialCount = clinics.filter((clinic) => getStatus(clinic) === 'Trial').length;
  const rejectedCount = clinics.filter((clinic) => getStatus(clinic) === 'Rejected').length;

  const updateSearch = (value) => {
    setSearchQuery(value);
    setPage(1);
  };

  const updateFilter = (value) => {
    setStatusFilter(value);
    setPage(1);
  };

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
          <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">SaaS administration / tenants</span>
          <h1 className="text-2xl font-extrabold text-slate-900">Clinic tenants</h1>
          <p className="text-sm text-slate-500 mt-1">
            Review applications, manage tenant access, and keep subscription status in one place.
          </p>
        </div>

        <Link to="/register/clinic">
          <Button variant="primary" size="md" icon={Building2}>
            Register a clinic
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3">
        {[
          { label: 'All tenants', value: clinics.length, status: 'All', accent: 'text-slate-900' },
          { label: 'Needs review', value: pendingCount, status: 'Pending', accent: 'text-amber-700' },
          { label: 'Active', value: activeCount, status: 'Active', accent: 'text-emerald-700' },
          { label: 'On trial', value: trialCount, status: 'Trial', accent: 'text-indigo-700' }
        ].map((item) => (
          <button
            key={item.status}
            type="button"
            onClick={() => updateFilter(item.status)}
            aria-pressed={statusFilter === item.status}
            className={`rounded-2xl border bg-white p-4 text-left shadow-sm transition hover:border-blue-300 hover:shadow ${
              statusFilter === item.status ? 'border-blue-500 ring-2 ring-blue-100' : 'border-slate-200'
            }`}
          >
            <span className="block text-xs font-semibold text-slate-500">{item.label}</span>
            <span className={`mt-1 block text-2xl font-extrabold ${item.accent}`}>{item.value}</span>
          </button>
        ))}
      </div>

      {/* Search and filters */}
      <Card className="p-4 border-slate-200">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <label className="relative min-w-0 flex-1">
              <span className="sr-only">Search clinic tenants</span>
              <Search aria-hidden="true" className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => updateSearch(e.target.value)}
                placeholder="Search by clinic, administrator, email, specialty, or city"
                className="w-full min-h-11 pl-9 pr-10 py-2.5 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => updateSearch('')}
                  aria-label="Clear search"
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-500 hover:bg-slate-100"
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </label>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-600">
              <span className="shrink-0">Status</span>
              <select
                value={statusFilter}
                onChange={(e) => updateFilter(e.target.value)}
                className="min-h-11 w-full md:w-52 px-3 rounded-xl border border-slate-200 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none bg-white text-slate-700"
              >
                <option value="All">All statuses</option>
                <option value="Pending">Needs review ({pendingCount})</option>
                <option value="Active">Active ({activeCount})</option>
                <option value="Trial">Trial ({trialCount})</option>
                <option value="Suspended">Suspended</option>
                <option value="Rejected">Rejected ({rejectedCount})</option>
              </select>
            </label>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
            <span aria-live="polite">
              {filteredClinics.length === clinics.length
                ? `${clinics.length} ${clinics.length === 1 ? 'tenant' : 'tenants'}`
                : `${filteredClinics.length} of ${clinics.length} tenants`}
              {normalizedSearch && <> matching <strong className="font-semibold text-slate-700">“{searchQuery.trim()}”</strong></>}
            </span>
            <label className="flex items-center gap-2">
              <span>Rows per page</span>
              <select
                value={pageSize}
                onChange={(event) => {
                  setPageSize(Number(event.target.value));
                  setPage(1);
                }}
                className="min-h-9 rounded-lg border border-slate-200 bg-white px-2 text-xs text-slate-700"
              >
                {PAGE_SIZE_OPTIONS.map((size) => <option value={size} key={size}>{size}</option>)}
              </select>
            </label>
          </div>
        </div>
      </Card>

      {/* Clinics Table */}
      <Card>
        <div className="overflow-x-auto">
          <table aria-label="Clinic tenant directory" className="min-w-[900px] w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3.5">Clinic</th>
                <th className="p-3.5">Specialty</th>
                <th className="p-3.5">Administrator</th>
                <th className="p-3.5">Branches</th>
                <th className="p-3.5">SaaS Plan</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {visibleClinics.map((c) => (
                <tr key={c.id} className="hover:bg-slate-50/50">
                  <td className="p-3.5">
                    <div className="font-semibold text-slate-900">{c.name}</div>
                    <div className="mt-0.5 text-xs text-slate-500">{[c.city, c.address].filter(Boolean).join(' · ') || 'Location not provided'}</div>
                  </td>
                  <td className="p-3.5">
                    <span className="font-medium text-slate-700">{c.specialty || 'Not specified'}</span>
                  </td>
                  <td className="p-3.5">
                    <div className="font-medium text-slate-800">{c.ownerName || 'Not assigned'}</div>
                    <div className="text-xs text-slate-500">{c.email || 'No email provided'}</div>
                  </td>
                  <td className="p-3.5 font-semibold text-slate-700">
                    {c.branches?.length ?? 0}
                  </td>
                  <td className="p-3.5">
                    <span className="inline-flex rounded-full border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-semibold capitalize text-blue-800">
                      {c.subscriptionPlanId || 'Unassigned'}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <Badge variant={getStatus(c)}>
                      {getStatus(c) === 'Pending' ? 'Pending approval' : getStatus(c)}
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
                      ) : getStatus(c) === 'Active' || getStatus(c) === 'Trial' ? (
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
              {!visibleClinics.length && (
                <tr>
                  <td colSpan="7" className="px-6 py-14 text-center">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-500">
                      <Building2 className="h-6 w-6" />
                    </div>
                    <h3 className="mt-3 text-base font-bold text-slate-900">
                      {clinics.length ? 'No tenants match these filters' : 'No clinic tenants yet'}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {clinics.length ? 'Try a different search or status, or clear your filters.' : 'Register a clinic to create your first tenant.'}
                    </p>
                    {clinics.length ? (
                      <Button variant="outline" size="sm" className="mt-4" onClick={() => { updateSearch(''); updateFilter('All'); }}>
                        Clear filters
                      </Button>
                    ) : (
                      <Link to="/register/clinic" className="mt-4 inline-flex">
                        <Button variant="primary" size="sm">Register a clinic</Button>
                      </Link>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {filteredClinics.length > 0 && (
          <div className="flex flex-col gap-3 border-t border-slate-100 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-xs text-slate-500">
              Showing {(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, filteredClinics.length)} of {filteredClinics.length}
            </span>
            <div className="flex items-center justify-between gap-2 sm:justify-end">
              <Button variant="outline" size="sm" icon={ChevronLeft} disabled={currentPage === 1} onClick={() => setPage(currentPage - 1)}>
                Previous
              </Button>
              <span className="min-w-20 text-center text-xs font-medium text-slate-600" aria-live="polite">
                Page {currentPage} of {totalPages}
              </span>
              <Button variant="outline" size="sm" icon={ChevronRight} disabled={currentPage === totalPages} onClick={() => setPage(currentPage + 1)}>
                Next
              </Button>
            </div>
          </div>
        )}
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

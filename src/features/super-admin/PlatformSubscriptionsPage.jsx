import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import { CheckCircle2, ChevronLeft, ChevronRight, Search, X } from 'lucide-react';

const PAGE_SIZE_OPTIONS = [10, 25, 50];

export function PlatformSubscriptionsPage() {
  const { clinics, plans, upgradeClinicSubscription } = useApp();
  const [changePlanModal, setChangePlanModal] = useState({ isOpen: false, clinic: null, targetPlanId: '' });
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(PAGE_SIZE_OPTIONS[0]);

  const subscriptions = clinics.map((c) => {
    const plan = plans.find((p) => p.id === c.subscriptionPlanId);
    return {
      clinicId: c.id,
      clinicName: c.name,
      specialty: c.specialty,
      planId: c.subscriptionPlanId,
      planName: plan?.name || c.subscriptionPlanId || 'Unassigned',
      status: c.approvalStatus === 'Pending' || c.status === 'Pending'
        ? 'Pending'
        : c.approvalStatus === 'Rejected'
          ? 'Rejected'
          : c.status === 'Suspended'
            ? 'Suspended'
            : c.isTrial || c.status === 'Trial'
              ? 'Trial'
              : c.status || 'Inactive',
      trialEndsAt: c.isTrial || c.status === 'Trial' ? c.trialEndsAt : null,
      amount: plan?.monthlyPrice,
      cycle: 'Monthly',
      doctorsLimit: plan?.maxDoctors
    };
  });

  const totalMRR = subscriptions
    .filter((s) => s.status === 'Active' && typeof s.amount === 'number')
    .reduce((acc, s) => acc + s.amount, 0);

  const activeCount = subscriptions.filter((s) => s.status === 'Active').length;
  const paidCount = subscriptions.filter((s) => s.status === 'Active' && typeof s.amount === 'number').length;
  const trialCount = subscriptions.filter((s) => s.status === 'Trial').length;
  const arpu = paidCount > 0 ? Math.round(totalMRR / paidCount) : 0;
  const normalizedSearch = searchQuery.trim().toLowerCase();
  const filteredSubscriptions = subscriptions.filter((subscription) => {
    const matchesSearch = `${subscription.clinicName} ${subscription.specialty || ''} ${subscription.planName}`
      .toLowerCase()
      .includes(normalizedSearch);
    return matchesSearch && (statusFilter === 'All' || subscription.status === statusFilter);
  });
  const statusOptions = [...new Set(subscriptions.map((subscription) => subscription.status))];
  const totalPages = Math.max(1, Math.ceil(filteredSubscriptions.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const visibleSubscriptions = filteredSubscriptions.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const updateSearch = (value) => {
    setSearchQuery(value);
    setPage(1);
  };

  const updateStatusFilter = (value) => {
    setStatusFilter(value);
    setPage(1);
  };

  const handleConfirmPlanChange = () => {
    if (!changePlanModal.clinic || !changePlanModal.targetPlanId) return;
    upgradeClinicSubscription(changePlanModal.clinic.clinicId, changePlanModal.targetPlanId);
    setChangePlanModal({ isOpen: false, clinic: null, targetPlanId: '' });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-purple-600 uppercase tracking-wider">SaaS administration / subscriptions</span>
          <h1 className="text-2xl font-extrabold text-slate-900">Tenant subscriptions</h1>
          <p className="mt-1 text-sm text-slate-500">
            Review each tenant’s plan and status, and change a plan when their needs change.
          </p>
        </div>

      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4 border-slate-200">
          <span className="text-xs font-semibold text-slate-500">Active tenants</span>
          <div className="text-2xl font-extrabold text-slate-900 mt-1">{activeCount}</div>
          <span className="text-xs text-slate-500 mt-1 block">
            Tenants with active status
          </span>
        </Card>

        <Card className="p-4 border-slate-200">
          <span className="text-xs font-semibold text-slate-500">Active trials</span>
          <div className="text-2xl font-extrabold text-amber-600 mt-1">{trialCount}</div>
          <span className="text-xs text-slate-500 mt-1 block">Tenants in evaluation</span>
        </Card>

        <Card className="p-4 border-slate-200">
          <span className="text-xs font-semibold text-slate-500">Monthly plan value</span>
          <div className="text-2xl font-extrabold text-blue-700 font-mono mt-1">₹{totalMRR.toLocaleString('en-IN')}</div>
          <span className="text-xs text-slate-500 mt-1 block">Active plans with configured prices</span>
        </Card>

        <Card className="p-4 border-slate-200">
          <span className="text-xs font-semibold text-slate-500">Average per paid tenant</span>
          <div className="text-2xl font-extrabold text-purple-700 font-mono mt-1">₹{arpu.toLocaleString('en-IN')}</div>
          <span className="text-xs text-slate-500 mt-1 block">Across {paidCount} priced active plans</span>
        </Card>
      </div>

      {/* Subscriptions Table */}
      <Card>
        <CardHeader
          title="All tenant subscriptions"
          subtitle={`${filteredSubscriptions.length} of ${subscriptions.length} tenants`}
        />
        <div className="flex flex-col gap-3 border-b border-slate-100 p-4">
          <div className="flex flex-col gap-3 sm:flex-row">
            <label className="relative min-w-0 flex-1">
              <span className="sr-only">Search tenant subscriptions</span>
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                value={searchQuery}
                onChange={(event) => updateSearch(event.target.value)}
                placeholder="Search clinic, specialty, or plan"
                className="min-h-11 w-full rounded-xl border border-slate-200 py-2.5 pl-9 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              {searchQuery && (
                <button type="button" onClick={() => updateSearch('')} aria-label="Clear search" className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-1.5 text-slate-500 hover:bg-slate-100">
                  <X className="h-4 w-4" />
                </button>
              )}
            </label>
            <label className="flex items-center gap-2 text-sm text-slate-600">
              <span>Status</span>
              <select value={statusFilter} onChange={(event) => updateStatusFilter(event.target.value)} className="min-h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 sm:w-48">
                <option value="All">All statuses</option>
                {statusOptions.map((status) => (
                  <option key={status} value={status}>
                    {status} ({subscriptions.filter((subscription) => subscription.status === status).length})
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table aria-label="Tenant subscriptions" className="min-w-[900px] w-full text-left text-sm">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3.5">Clinic</th>
                <th className="p-3.5">Specialty</th>
                <th className="p-3.5">Active Tier</th>
                <th className="p-3.5">Doctor Limit</th>
                <th className="p-3.5">Billing Interval</th>
                <th className="p-3.5">Monthly Fee</th>
                <th className="p-3.5">Trial end date</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {visibleSubscriptions.map((s) => (
                <tr key={s.clinicId} className="hover:bg-slate-50/50">
                  <td className="p-3.5 font-bold text-slate-900">{s.clinicName}</td>
                  <td className="p-3.5 text-slate-600">{s.specialty}</td>
                  <td className="p-3.5">
                    <span className="uppercase text-[10px] font-bold text-blue-800 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                      {s.planName}
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-600">
                    {s.doctorsLimit ? `Up to ${s.doctorsLimit} doctors` : 'Not configured'}
                  </td>
                  <td className="p-3.5 text-slate-600">{s.cycle}</td>
                  <td className="p-3.5 font-mono font-bold text-slate-900">
                    {typeof s.amount === 'number' ? `₹${s.amount.toLocaleString('en-IN')}/mo` : 'Not configured'}
                  </td>
                  <td className="p-3.5 text-slate-600">
                    {s.status === 'Trial'
                      ? s.trialEndsAt && !Number.isNaN(Date.parse(s.trialEndsAt))
                        ? new Date(s.trialEndsAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
                        : 'Not set'
                      : '—'}
                  </td>
                  <td className="p-3.5">
                    <Badge variant={s.status}>{s.status}</Badge>
                  </td>
                  <td className="p-3.5 text-right">
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-blue-700 hover:bg-blue-50 border-blue-200 text-xs"
                      onClick={() =>
                        setChangePlanModal({
                          isOpen: true,
                          clinic: s,
                          targetPlanId: s.planId
                        })
                      }
                    >
                      Change Plan
                    </Button>
                  </td>
                </tr>
              ))}
              {!filteredSubscriptions.length && (
                <tr>
                  <td colSpan="9" className="px-6 py-12 text-center">
                    <p className="text-sm font-semibold text-slate-800">
                      {subscriptions.length ? 'No subscriptions match your filters' : 'No tenant subscriptions yet'}
                    </p>
                    <p className="mt-1 text-xs text-slate-500">Change your search or status filter and try again.</p>
                    {(searchQuery || statusFilter !== 'All') && (
                    <Button variant="outline" size="sm" className="mt-3" onClick={() => { updateSearch(''); updateStatusFilter('All'); }}>
                        Clear filters
                      </Button>
                    )}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {filteredSubscriptions.length > 0 && (
          <div className="flex flex-col gap-3 border-t border-slate-100 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-slate-500">
                Showing {(currentPage - 1) * pageSize + 1}–{Math.min(currentPage * pageSize, filteredSubscriptions.length)} of {filteredSubscriptions.length}
              </span>
              <label className="flex items-center gap-2 text-xs text-slate-500">
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

      {/* Upgrade / Downgrade Plan Modal */}
      {changePlanModal.isOpen && (
        <Modal
          isOpen={changePlanModal.isOpen}
          onClose={() => setChangePlanModal({ isOpen: false, clinic: null, targetPlanId: '' })}
          title={`Modify Subscription: ${changePlanModal.clinic?.clinicName}`}
          size="md"
        >
          <div className="space-y-4 text-xs">
            <p className="text-slate-600">
              Select a target SaaS tier for <strong>{changePlanModal.clinic?.clinicName}</strong>. This simulation adjusts branch & doctor quota entitlements immediately.
            </p>

            <div className="space-y-2">
              <label className="block text-[11px] font-bold text-slate-700 uppercase">Target Subscription Plan</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {plans.map((p) => {
                  const isSelected = changePlanModal.targetPlanId === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => setChangePlanModal((prev) => ({ ...prev, targetPlanId: p.id }))}
                      aria-pressed={isSelected}
                      className={`w-full p-3 rounded-xl border text-left cursor-pointer transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/60 ring-2 ring-blue-500'
                          : 'border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-900">{p.name}</span>
                        {isSelected && <CheckCircle2 className="w-4 h-4 text-blue-600" />}
                      </div>
                      <div className="text-sm font-extrabold text-blue-700 font-mono mt-1">
                        ₹{p.monthlyPrice.toLocaleString('en-IN')}/mo
                      </div>
                      <p className="text-[10px] text-slate-500 mt-1">
                        {p.maxDoctors} Doctors · {p.maxBranches} Branch{p.maxBranches > 1 ? 'es' : ''}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-slate-600 text-[11px]">
              ℹ️ <strong>Simulated Billing Note:</strong> Plan modifications take effect on the current billing cycle with prorated recalculation preview.
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setChangePlanModal({ isOpen: false, clinic: null, targetPlanId: '' })}
              >
                Cancel
              </Button>
              <Button variant="primary" size="sm" disabled={!changePlanModal.targetPlanId} onClick={handleConfirmPlanChange}>
                Confirm Plan Update
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

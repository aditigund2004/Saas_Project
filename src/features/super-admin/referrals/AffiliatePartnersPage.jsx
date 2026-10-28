import React, { useState, useMemo } from 'react';
import { useReferral } from '../../../context/ReferralContext';
import { ReferralNav } from './ReferralNav';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Modal } from '../../../components/ui/Modal';
import { formatINR, exportToCSV, getReferralStatusBadge } from './referralUtils';
import {
  Users,
  Search,
  Filter,
  Plus,
  Download,
  Eye,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Building2,
  CreditCard,
  Key,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Ban
} from 'lucide-react';

export function AffiliatePartnersPage() {
  const {
    affiliates,
    commissionRules,
    referralCodes,
    referrals,
    addAffiliate,
    updateAffiliate,
    toggleAffiliateStatus,
    deleteAffiliate
  } = useReferral();

  // Search, filter, sort, and pagination state
  const [searchTerm, setSearchTerm] = useState('');
  const [partnerTypeFilter, setPartnerTypeFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [sortBy, setSortBy] = useState('joinedDate');
  const [sortOrder, setSortOrder] = useState('desc');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 6;

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAffiliate, setSelectedAffiliate] = useState(null);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    partnerType: 'Healthcare Consultant',
    email: '',
    phone: '',
    referralCode: '',
    ruleId: 'RULE-PERC-15',
    payoutMethod: 'Bank Transfer (NEFT/IMPS)',
    accountHolder: '',
    bankName: '',
    accountNumber: '',
    ifscCode: '',
    upiId: ''
  });

  const handleOpenAdd = () => {
    setFormData({
      name: '',
      company: '',
      partnerType: 'Healthcare Consultant',
      email: '',
      phone: '',
      referralCode: '',
      ruleId: commissionRules[0]?.id || 'RULE-PERC-15',
      payoutMethod: 'Bank Transfer (NEFT/IMPS)',
      accountHolder: '',
      bankName: 'HDFC Bank Ltd',
      accountNumber: '',
      ifscCode: 'HDFC0001024',
      upiId: ''
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (aff) => {
    setSelectedAffiliate(aff);
    setFormData({
      name: aff.name,
      company: aff.company,
      partnerType: aff.partnerType,
      email: aff.email,
      phone: aff.phone,
      referralCode: aff.referralCode,
      ruleId: aff.ruleId || commissionRules[0]?.id || 'RULE-PERC-15',
      payoutMethod: aff.payoutMethod,
      accountHolder: aff.bankDetails?.accountHolder || aff.name,
      bankName: aff.bankDetails?.bankName || 'HDFC Bank Ltd',
      accountNumber: aff.bankDetails?.accountNumber || '',
      ifscCode: aff.bankDetails?.ifscCode || '',
      upiId: aff.bankDetails?.upiId || ''
    });
    setIsEditModalOpen(true);
  };

  const handleOpenView = (aff) => {
    setSelectedAffiliate(aff);
    setIsViewModalOpen(true);
  };

  const handleOpenDelete = (aff) => {
    setSelectedAffiliate(aff);
    setIsDeleteModalOpen(true);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    addAffiliate(formData);
    setIsAddModalOpen(false);
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    if (!selectedAffiliate) return;
    updateAffiliate(selectedAffiliate.id, {
      name: formData.name,
      company: formData.company,
      partnerType: formData.partnerType,
      email: formData.email,
      phone: formData.phone,
      ruleId: formData.ruleId,
      payoutMethod: formData.payoutMethod,
      bankDetails: {
        accountHolder: formData.accountHolder,
        bankName: formData.bankName,
        accountNumber: formData.accountNumber,
        ifscCode: formData.ifscCode,
        upiId: formData.upiId
      }
    });
    setIsEditModalOpen(false);
  };

  const handleDeleteConfirm = () => {
    if (selectedAffiliate) {
      deleteAffiliate(selectedAffiliate.id);
      setIsDeleteModalOpen(false);
    }
  };

  // Filtered and Sorted Affiliates
  const filteredAffiliates = useMemo(() => {
    return affiliates.filter((a) => {
      const matchSearch =
        searchTerm === '' ||
        a.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        a.referralCode.toLowerCase().includes(searchTerm.toLowerCase());

      const matchType = partnerTypeFilter === 'All' || a.partnerType === partnerTypeFilter;
      const matchStatus = statusFilter === 'All' || a.status === statusFilter;

      return matchSearch && matchType && matchStatus;
    }).sort((a, b) => {
      let valA = a[sortBy];
      let valB = b[sortBy];

      if (sortBy === 'totalCommissionEarned' || sortBy === 'referredHospitalsCount' || sortBy === 'convertedHospitalsCount') {
        valA = Number(valA) || 0;
        valB = Number(valB) || 0;
      }

      if (sortOrder === 'asc') {
        return valA > valB ? 1 : -1;
      }
      return valA < valB ? 1 : -1;
    });
  }, [affiliates, searchTerm, partnerTypeFilter, statusFilter, sortBy, sortOrder]);

  // Paginated Results
  const totalPages = Math.ceil(filteredAffiliates.length / pageSize) || 1;
  const paginatedAffiliates = filteredAffiliates.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleExportCSV = () => {
    exportToCSV(
      'ClinicOS_Affiliate_Partners',
      filteredAffiliates,
      [
        { label: 'Affiliate ID', key: 'id' },
        { label: 'Partner Name', key: 'name' },
        { label: 'Organization', key: 'company' },
        { label: 'Type', key: 'partnerType' },
        { label: 'Email', key: 'email' },
        { label: 'Phone', key: 'phone' },
        { label: 'Referral Code', key: 'referralCode' },
        { label: 'Referred Hospitals', key: 'referredHospitalsCount' },
        { label: 'Converted Hospitals', key: 'convertedHospitalsCount' },
        { label: 'Commission Earned (INR)', key: 'totalCommissionEarned' },
        { label: 'Paid Commission (INR)', key: 'paidCommission' },
        { label: 'Available Balance (INR)', key: 'availableBalance' },
        { label: 'Status', key: 'status' },
        { label: 'Joined Date', key: 'joinedDate' }
      ]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            Partner Directory
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Affiliate Partners
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage hospital consortiums, doctor consultants, corporate affiliates, and bank settlement profiles.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            icon={Download}
            onClick={handleExportCSV}
          >
            Export CSV
          </Button>
          <Button
            variant="primary"
            size="sm"
            icon={Plus}
            onClick={handleOpenAdd}
          >
            Add Affiliate
          </Button>
        </div>
      </div>

      <ReferralNav />

      {/* Search, Filter and View Bar */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          {/* Search Box */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by name, company, email, or code..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Filters & Sorting */}
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={partnerTypeFilter}
              onChange={(e) => {
                setPartnerTypeFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Partner Types</option>
              <option value="Healthcare Consultant">Healthcare Consultant</option>
              <option value="Hospital">Hospital</option>
              <option value="Affiliate Partner">Affiliate Partner</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => {
                setStatusFilter(e.target.value);
                setCurrentPage(1);
              }}
              className="px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Suspended">Suspended</option>
            </select>

            <select
              value={`${sortBy}-${sortOrder}`}
              onChange={(e) => {
                const [sb, so] = e.target.value.split('-');
                setSortBy(sb);
                setSortOrder(so);
              }}
              className="px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="joinedDate-desc">Newest Joined</option>
              <option value="joinedDate-asc">Oldest Joined</option>
              <option value="totalCommissionEarned-desc">Highest Commission</option>
              <option value="convertedHospitalsCount-desc">Most Converted</option>
              <option value="name-asc">Name (A-Z)</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Main Affiliate Partners Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 uppercase tracking-wider font-semibold border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="py-3 px-4">Affiliate & Partner</th>
                <th className="py-3 px-3">Type</th>
                <th className="py-3 px-3">Referral Code</th>
                <th className="py-3 px-3 text-center">Hospitals (Conv/Ref)</th>
                <th className="py-3 px-3">Total Commission</th>
                <th className="py-3 px-3">Balance</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-3">Joined</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {paginatedAffiliates.length === 0 ? (
                <tr>
                  <td colSpan="9" className="py-8 text-center text-slate-500 dark:text-slate-400">
                    No affiliate partners match your search and filter criteria.
                  </td>
                </tr>
              ) : (
                paginatedAffiliates.map((aff) => (
                  <tr
                    key={aff.id}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                  >
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900 dark:text-white text-xs sm:text-sm">
                        {aff.name}
                      </div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">
                        {aff.company} • <span className="font-mono text-slate-400">{aff.id}</span>
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {aff.email}
                      </div>
                    </td>

                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className="inline-block px-2 py-0.5 rounded-md text-[11px] font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
                        {aff.partnerType}
                      </span>
                    </td>

                    <td className="py-3 px-3 whitespace-nowrap">
                      <code className="px-2 py-1 rounded bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-mono font-bold text-xs border border-blue-200 dark:border-blue-900">
                        {aff.referralCode}
                      </code>
                    </td>

                    <td className="py-3 px-3 text-center whitespace-nowrap">
                      <div className="inline-flex items-center gap-1 font-semibold text-slate-800 dark:text-slate-200">
                        <span className="text-emerald-600 dark:text-emerald-400 font-bold">{aff.convertedHospitalsCount}</span>
                        <span className="text-slate-400">/</span>
                        <span>{aff.referredHospitalsCount}</span>
                      </div>
                      <div className="text-[10px] text-slate-400">
                        {aff.referredHospitalsCount > 0
                          ? `${Math.round((aff.convertedHospitalsCount / aff.referredHospitalsCount) * 100)}% conv`
                          : '0%'}
                      </div>
                    </td>

                    <td className="py-3 px-3 whitespace-nowrap">
                      <div className="font-bold text-slate-900 dark:text-white">
                        {formatINR(aff.totalCommissionEarned)}
                      </div>
                      <div className="text-[10px] text-slate-400">
                        Paid: {formatINR(aff.paidCommission)}
                      </div>
                    </td>

                    <td className="py-3 px-3 whitespace-nowrap">
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                        {formatINR(aff.availableBalance)}
                      </span>
                    </td>

                    <td className="py-3 px-3 whitespace-nowrap">
                      <span
                        className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getReferralStatusBadge(
                          aff.status
                        )}`}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-current opacity-75" />
                        <span>{aff.status}</span>
                      </span>
                    </td>

                    <td className="py-3 px-3 whitespace-nowrap text-slate-500 dark:text-slate-400">
                      {aff.joinedDate}
                    </td>

                    <td className="py-3 px-4 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => handleOpenView(aff)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                          title="View Partner Profile"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleOpenEdit(aff)}
                          className="p-1.5 rounded-lg text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                          title="Edit Partner"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => toggleAffiliateStatus(aff.id)}
                          className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                            aff.status === 'Active'
                              ? 'text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/40'
                              : 'text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'
                          }`}
                          title={aff.status === 'Active' ? 'Suspend Affiliate' : 'Activate Affiliate'}
                        >
                          {aff.status === 'Active' ? <Ban className="w-4 h-4" /> : <CheckCircle2 className="w-4 h-4" />}
                        </button>
                        <button
                          type="button"
                          onClick={() => handleOpenDelete(aff)}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                          title="Archive / Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
          <div>
            Showing{' '}
            <strong className="text-slate-900 dark:text-white">
              {filteredAffiliates.length > 0 ? (currentPage - 1) * pageSize + 1 : 0}
            </strong>{' '}
            to{' '}
            <strong className="text-slate-900 dark:text-white">
              {Math.min(currentPage * pageSize, filteredAffiliates.length)}
            </strong>{' '}
            of <strong className="text-slate-900 dark:text-white">{filteredAffiliates.length}</strong> partners
          </div>

          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage <= 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              icon={ChevronLeft}
            >
              Previous
            </Button>
            <span className="px-2 text-xs font-semibold">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              icon={ChevronRight}
            >
              Next
            </Button>
          </div>
        </div>
      </Card>

      {/* Modal: Add Affiliate */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Enroll New Affiliate Partner"
        size="lg"
      >
        <form onSubmit={handleAddSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Full Legal Name / Contact Person *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. Dr. Ramesh Gupta"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Company / Organization
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="e.g. MediHealth Advisors LLP"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Partner Type *
              </label>
              <select
                value={formData.partnerType}
                onChange={(e) => setFormData({ ...formData, partnerType: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Healthcare Consultant">Healthcare Consultant</option>
                <option value="Hospital">Hospital</option>
                <option value="Affiliate Partner">Affiliate Partner</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="ramesh@medihealth.in"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98200 12345"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Custom Referral Code (Optional)
              </label>
              <input
                type="text"
                value={formData.referralCode}
                onChange={(e) => setFormData({ ...formData, referralCode: e.target.value })}
                placeholder="e.g. RAMESH-CLINIC (leave blank to auto-create)"
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white uppercase font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Assigned Commission Policy
              </label>
              <select
                value={formData.ruleId}
                onChange={(e) => setFormData({ ...formData, ruleId: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {commissionRules.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name} ({r.calculationType === 'Percentage' ? `${r.rateValue}%` : `₹${r.rateValue}`})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Banking / Payout Setup */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Payout Settlement Details</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Preferred Payment Method
                </label>
                <select
                  value={formData.payoutMethod}
                  onChange={(e) => setFormData({ ...formData, payoutMethod: e.target.value })}
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                >
                  <option value="Bank Transfer (NEFT/IMPS)">Bank Transfer (NEFT/IMPS)</option>
                  <option value="UPI">UPI</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Bank Name
                </label>
                <input
                  type="text"
                  value={formData.bankName}
                  onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                  placeholder="e.g. HDFC Bank Ltd"
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Account Number
                </label>
                <input
                  type="text"
                  value={formData.accountNumber}
                  onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                  placeholder="e.g. 50100234918231"
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  IFSC Code / UPI ID
                </label>
                <input
                  type="text"
                  value={formData.ifscCode}
                  onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value })}
                  placeholder="e.g. HDFC0001024 or name@upi"
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white uppercase font-mono"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-200 dark:border-slate-800">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsAddModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Enroll Affiliate
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal: Edit Affiliate */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        title={`Edit Affiliate: ${selectedAffiliate?.name}`}
        size="lg"
      >
        <form onSubmit={handleEditSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Full Legal Name *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Company / Organization
              </label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Partner Type
              </label>
              <select
                value={formData.partnerType}
                onChange={(e) => setFormData({ ...formData, partnerType: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Healthcare Consultant">Healthcare Consultant</option>
                <option value="Hospital">Hospital</option>
                <option value="Affiliate Partner">Affiliate Partner</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
              <CreditCard className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
              <span>Bank & Settlement Profile</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Bank Name
                </label>
                <input
                  type="text"
                  value={formData.bankName}
                  onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Account Number
                </label>
                <input
                  type="text"
                  value={formData.accountNumber}
                  onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  IFSC Code
                </label>
                <input
                  type="text"
                  value={formData.ifscCode}
                  onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value })}
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white uppercase font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  UPI ID
                </label>
                <input
                  type="text"
                  value={formData.upiId}
                  onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                  className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-200 dark:border-slate-800">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Save Changes
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal: View Affiliate Details */}
      <Modal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        title={`Partner Profile: ${selectedAffiliate?.name}`}
        size="lg"
      >
        {selectedAffiliate && (
          <div className="space-y-4">
            {/* Header info */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    {selectedAffiliate.name}
                  </h3>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold border ${getReferralStatusBadge(
                      selectedAffiliate.status
                    )}`}
                  >
                    {selectedAffiliate.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {selectedAffiliate.company} • Joined {selectedAffiliate.joinedDate}
                </p>
                <div className="text-xs text-slate-600 dark:text-slate-300 mt-1 flex flex-wrap gap-3">
                  <span>Email: {selectedAffiliate.email}</span>
                  <span>Phone: {selectedAffiliate.phone || 'N/A'}</span>
                </div>
              </div>

              <div className="text-left sm:text-right shrink-0">
                <span className="text-[10px] uppercase font-bold text-slate-400">
                  Primary Referral Code
                </span>
                <div className="font-mono font-bold text-blue-600 dark:text-blue-400 text-sm">
                  {selectedAffiliate.referralCode}
                </div>
              </div>
            </div>

            {/* Metrics cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                <div className="text-xs text-slate-500 dark:text-slate-400">Referred</div>
                <div className="text-lg font-bold text-slate-900 dark:text-white mt-0.5">
                  {selectedAffiliate.referredHospitalsCount}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                <div className="text-xs text-slate-500 dark:text-slate-400">Converted</div>
                <div className="text-lg font-bold text-emerald-600 dark:text-emerald-400 mt-0.5">
                  {selectedAffiliate.convertedHospitalsCount}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                <div className="text-xs text-slate-500 dark:text-slate-400">Total Earned</div>
                <div className="text-lg font-bold text-blue-600 dark:text-blue-400 mt-0.5">
                  {formatINR(selectedAffiliate.totalCommissionEarned)}
                </div>
              </div>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                <div className="text-xs text-slate-500 dark:text-slate-400">Available Balance</div>
                <div className="text-lg font-bold text-purple-600 dark:text-purple-400 mt-0.5">
                  {formatINR(selectedAffiliate.availableBalance)}
                </div>
              </div>
            </div>

            {/* Bank details preview */}
            <div className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 space-y-2 text-xs">
              <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Payout & Banking Credentials</span>
              </h4>
              <div className="grid grid-cols-2 gap-2 text-slate-600 dark:text-slate-300">
                <div>
                  <span className="text-slate-400 block text-[11px]">Bank:</span>
                  <strong>{selectedAffiliate.bankDetails?.bankName || 'HDFC Bank'}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Account Holder:</span>
                  <strong>{selectedAffiliate.bankDetails?.accountHolder || selectedAffiliate.name}</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Account #:</span>
                  <span className="font-mono font-semibold">{selectedAffiliate.bankDetails?.accountNumber || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">IFSC Code:</span>
                  <span className="font-mono font-semibold">{selectedAffiliate.bankDetails?.ifscCode || 'N/A'}</span>
                </div>
                {selectedAffiliate.bankDetails?.upiId && (
                  <div className="col-span-2">
                    <span className="text-slate-400 block text-[11px]">UPI ID:</span>
                    <span className="font-mono font-semibold">{selectedAffiliate.bankDetails.upiId}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-end pt-3 border-t border-slate-200 dark:border-slate-800">
              <Button
                variant="primary"
                size="sm"
                onClick={() => setIsViewModalOpen(false)}
              >
                Close Profile
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Modal: Delete Confirmation */}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        title="Archive Affiliate Partner"
        size="sm"
      >
        <div className="space-y-4">
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 flex items-start gap-2.5 text-xs text-rose-900 dark:text-rose-200">
            <AlertCircle className="w-5 h-5 text-rose-600 dark:text-rose-400 shrink-0" />
            <div>
              Are you sure you want to archive <strong>{selectedAffiliate?.name}</strong>? All generated referral codes will be deactivated in demo state.
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsDeleteModalOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={handleDeleteConfirm}
            >
              Confirm Archive
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

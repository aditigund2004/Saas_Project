import React, { useState, useMemo } from 'react';
import { useReferral } from '../../../context/ReferralContext';
import { ReferralNav } from './ReferralNav';
import { Card } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { Modal } from '../../../components/ui/Modal';
import { copyToClipboard, exportToCSV, getReferralStatusBadge } from './referralUtils';
import { useApp } from '../../../context/AppContext';
import {
  Key,
  Search,
  Plus,
  Copy,
  Check,
  ExternalLink,
  Download,
  Calendar,
  Layers,
  Edit3,
  ToggleLeft,
  ToggleRight,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export function ReferralCodesPage() {
  const {
    referralCodes,
    affiliates,
    createReferralCode,
    updateReferralCode,
    toggleReferralCodeStatus
  } = useReferral();
  const { showToast } = useApp() || { showToast: () => {} };

  // Search & filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [affiliateFilter, setAffiliateFilter] = useState('All');

  // Copy feedback state: key -> boolean
  const [copiedKeys, setCopiedKeys] = useState({});

  // Modals state
  const [isGenerateOpen, setIsGenerateOpen] = useState(false);
  const [isEditLimitsOpen, setIsEditLimitsOpen] = useState(false);
  const [selectedCode, setSelectedCode] = useState(null);

  // Form states for Generate Code
  const [genAffiliateId, setGenAffiliateId] = useState(affiliates[0]?.id || '');
  const [genCodeCustom, setGenCodeCustom] = useState('');
  const [genUsageLimit, setGenUsageLimit] = useState(50);
  const [genExpiryDate, setGenExpiryDate] = useState(
    new Date(Date.now() + 180 * 86400000).toISOString().split('T')[0]
  );

  // Form states for Edit Code
  const [editUsageLimit, setEditUsageLimit] = useState(50);
  const [editExpiryDate, setEditExpiryDate] = useState('');

  const handleCopyText = async (text, keyLabel) => {
    const success = await copyToClipboard(text);
    if (success) {
      setCopiedKeys((prev) => ({ ...prev, [keyLabel]: true }));
      showToast(`Copied to clipboard: ${text}`, 'success');
      setTimeout(() => {
        setCopiedKeys((prev) => ({ ...prev, [keyLabel]: false }));
      }, 2000);
    } else {
      showToast('Could not copy to clipboard. Please copy manually.', 'error');
    }
  };

  const handleGenerateSubmit = (e) => {
    e.preventDefault();
    if (!genAffiliateId) return;
    createReferralCode({
      affiliateId: genAffiliateId,
      code: genCodeCustom,
      usageLimit: genUsageLimit,
      expiryDate: genExpiryDate
    });
    setGenCodeCustom('');
    setIsGenerateOpen(false);
  };

  const handleOpenEditLimits = (codeItem) => {
    setSelectedCode(codeItem);
    setEditUsageLimit(codeItem.usageLimit || 50);
    setEditExpiryDate(codeItem.expiryDate || '');
    setIsEditLimitsOpen(true);
  };

  const handleEditLimitsSubmit = (e) => {
    e.preventDefault();
    if (!selectedCode) return;
    updateReferralCode(selectedCode.code, {
      usageLimit: Number(editUsageLimit),
      expiryDate: editExpiryDate
    });
    setIsEditLimitsOpen(false);
  };

  // Filtered Codes
  const filteredCodes = useMemo(() => {
    return referralCodes.filter((c) => {
      const matchSearch =
        searchTerm === '' ||
        c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.affiliateName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.referralUrl.toLowerCase().includes(searchTerm.toLowerCase());

      const matchStatus = statusFilter === 'All' || c.status === statusFilter;
      const matchAffiliate = affiliateFilter === 'All' || c.affiliateId === affiliateFilter;

      return matchSearch && matchStatus && matchAffiliate;
    });
  }, [referralCodes, searchTerm, statusFilter, affiliateFilter]);

  const handleExportCSV = () => {
    exportToCSV(
      'ClinicOS_Referral_Codes',
      filteredCodes,
      [
        { label: 'Referral Code', key: 'code' },
        { label: 'Affiliate Partner', key: 'affiliateName' },
        { label: 'Referral Link', key: 'referralUrl' },
        { label: 'Created Date', key: 'createdDate' },
        { label: 'Expiry Date', key: 'expiryDate' },
        { label: 'Usage Count', key: 'usageCount' },
        { label: 'Usage Limit', key: 'usageLimit' },
        { label: 'Status', key: 'status' }
      ]
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            Attribution Engine
          </span>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight">
            Referral Codes & Tracking Links
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Generate custom campaign tags, set lead conversion caps, and provision public clinic onboarding referral URLs.
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
            onClick={() => setIsGenerateOpen(true)}
          >
            Generate Referral Code
          </Button>
        </div>
      </div>

      <ReferralNav />

      {/* Search & Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by code, affiliate, or URL..."
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <select
              value={affiliateFilter}
              onChange={(e) => setAffiliateFilter(e.target.value)}
              className="px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Affiliates</option>
              {affiliates.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Codes Table */}
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-100/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 uppercase tracking-wider font-semibold border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="py-3 px-4">Referral Code</th>
                <th className="py-3 px-3">Affiliate Partner</th>
                <th className="py-3 px-3">Public Referral Link</th>
                <th className="py-3 px-3">Created</th>
                <th className="py-3 px-3">Expiry Date</th>
                <th className="py-3 px-3 text-center">Usage / Limit</th>
                <th className="py-3 px-3">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredCodes.length === 0 ? (
                <tr>
                  <td colSpan="8" className="py-8 text-center text-slate-500 dark:text-slate-400">
                    No referral codes match your filters.
                  </td>
                </tr>
              ) : (
                filteredCodes.map((c) => {
                  const codeCopyKey = `code-${c.code}`;
                  const linkCopyKey = `link-${c.code}`;
                  const usagePerc = Math.round(((c.usageCount || 0) / (c.usageLimit || 50)) * 100);

                  return (
                    <tr
                      key={c.code}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="py-3 px-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <code className="px-2.5 py-1 rounded bg-blue-50 dark:bg-blue-950/70 text-blue-700 dark:text-blue-300 font-mono font-bold text-xs border border-blue-200 dark:border-blue-800">
                            {c.code}
                          </code>
                          <button
                            type="button"
                            onClick={() => handleCopyText(c.code, codeCopyKey)}
                            className="p-1 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                            title="Copy Code"
                          >
                            {copiedKeys[codeCopyKey] ? (
                              <Check className="w-3.5 h-3.5 text-emerald-500" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </td>

                      <td className="py-3 px-3 whitespace-nowrap">
                        <div className="font-bold text-slate-900 dark:text-white">
                          {c.affiliateName}
                        </div>
                        <span className="text-[10px] text-slate-400 font-mono">
                          ID: {c.affiliateId}
                        </span>
                      </td>

                      <td className="py-3 px-3">
                        <div className="flex items-center gap-1.5 max-w-[220px]">
                          <span className="truncate font-mono text-[11px] text-slate-600 dark:text-slate-300">
                            {c.referralUrl}
                          </span>
                          <button
                            type="button"
                            onClick={() => handleCopyText(c.referralUrl, linkCopyKey)}
                            className="p-1 text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 rounded shrink-0 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                            title="Copy Direct Link"
                          >
                            {copiedKeys[linkCopyKey] ? (
                              <Check className="w-3.5 h-3.5 text-emerald-500" />
                            ) : (
                              <Copy className="w-3.5 h-3.5" />
                            )}
                          </button>
                        </div>
                      </td>

                      <td className="py-3 px-3 whitespace-nowrap text-slate-500">
                        {c.createdDate}
                      </td>

                      <td className="py-3 px-3 whitespace-nowrap text-slate-600 dark:text-slate-300">
                        {c.expiryDate || 'No Expiry'}
                      </td>

                      <td className="py-3 px-3 text-center whitespace-nowrap">
                        <div className="font-semibold text-slate-800 dark:text-slate-200">
                          {c.usageCount} / {c.usageLimit}
                        </div>
                        <div className="w-20 bg-slate-200 dark:bg-slate-700 h-1.5 rounded-full mx-auto mt-1 overflow-hidden">
                          <div
                            className={`h-full ${usagePerc > 80 ? 'bg-amber-500' : 'bg-blue-600'}`}
                            style={{ width: `${Math.min(100, usagePerc)}%` }}
                          />
                        </div>
                      </td>

                      <td className="py-3 px-3 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${getReferralStatusBadge(
                            c.status
                          )}`}
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-current opacity-75" />
                          <span>{c.status}</span>
                        </span>
                      </td>

                      <td className="py-3 px-4 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleOpenEditLimits(c)}
                            className="p-1.5 rounded-lg text-slate-500 hover:text-blue-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                            title="Edit Limits & Expiry"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>

                          <button
                            type="button"
                            onClick={() => toggleReferralCodeStatus(c.code)}
                            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                              c.status === 'Active'
                                ? 'text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/40'
                                : 'text-emerald-600 hover:bg-emerald-50 dark:hover:bg-emerald-950/40'
                            }`}
                            title={c.status === 'Active' ? 'Deactivate Code' : 'Activate Code'}
                          >
                            {c.status === 'Active' ? (
                              <ToggleRight className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
                            ) : (
                              <ToggleLeft className="w-5 h-5 text-slate-400" />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Modal: Generate Referral Code */}
      <Modal
        isOpen={isGenerateOpen}
        onClose={() => setIsGenerateOpen(false)}
        title="Provision New Referral Code"
        size="md"
      >
        <form onSubmit={handleGenerateSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Select Enrolled Affiliate *
            </label>
            <select
              value={genAffiliateId}
              onChange={(e) => setGenAffiliateId(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {affiliates.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.name} ({a.partnerType})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Custom Code Tag / Slug *
            </label>
            <input
              type="text"
              required
              value={genCodeCustom}
              onChange={(e) => setGenCodeCustom(e.target.value)}
              placeholder="e.g. SPECIAL-HEALTH-2026"
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono uppercase focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="text-[11px] text-slate-400 mt-1">
              Will generate link: <code>https://clinicos.app/register/clinic?ref=...</code>
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Usage Cap (Maximum Hospitals)
              </label>
              <input
                type="number"
                min="1"
                max="1000"
                value={genUsageLimit}
                onChange={(e) => setGenUsageLimit(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Expiration Date
              </label>
              <input
                type="date"
                value={genExpiryDate}
                onChange={(e) => setGenExpiryDate(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-slate-200 dark:border-slate-800">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsGenerateOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Generate & Publish Code
            </Button>
          </div>
        </form>
      </Modal>

      {/* Modal: Edit Limits */}
      <Modal
        isOpen={isEditLimitsOpen}
        onClose={() => setIsEditLimitsOpen(false)}
        title={`Adjust Limits: ${selectedCode?.code}`}
        size="sm"
      >
        <form onSubmit={handleEditLimitsSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Maximum Usage Limit
            </label>
            <input
              type="number"
              min="1"
              max="1000"
              value={editUsageLimit}
              onChange={(e) => setEditUsageLimit(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
              Expiry Date
            </label>
            <input
              type="date"
              value={editExpiryDate}
              onChange={(e) => setEditExpiryDate(e.target.value)}
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-2 border-t border-slate-200 dark:border-slate-800">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditLimitsOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" size="sm">
              Update Limits
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

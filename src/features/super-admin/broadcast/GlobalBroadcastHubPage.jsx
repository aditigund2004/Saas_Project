import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  broadcastService,
  BROADCAST_TYPES,
  SEVERITY_LEVELS,
  AVAILABLE_CLINICS,
  AVAILABLE_ROLES,
} from '../../../services/broadcastService';
import { StatCard } from '../../../components/ui/StatCard';
import { Card, CardHeader, CardContent } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { CreateBroadcastModal } from './modals/CreateBroadcastModal';
import { BroadcastDetailsModal } from './modals/BroadcastDetailsModal';
import { DispatchSimulatorModal } from './modals/DispatchSimulatorModal';
import {
  Radio,
  AlertTriangle,
  Wrench,
  Megaphone,
  Smartphone,
  Mail,
  Clock,
  Search,
  RotateCcw,
  Plus,
  Zap,
  Activity,
  Server
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from 'recharts';

export function GlobalBroadcastHubPage() {
  const { showToast } = useApp();

  const [broadcasts, setBroadcasts] = useState(() => broadcastService.getBroadcasts());
  const [activeTab, setActiveTab] = useState('all'); // 'all' | 'emergency' | 'maintenance' | 'channels' | 'analytics'
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Modals
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [simulatorModalOpen, setSimulatorModalOpen] = useState(false);
  const [selectedBroadcast, setSelectedBroadcast] = useState(null);

  const loadData = () => {
    const list = broadcastService.getBroadcasts();
    setBroadcasts(list);
  };

  useEffect(() => {
    const handleUpdate = () => {
      loadData();
    };

    window.addEventListener('clinipulse_broadcast_update', handleUpdate);
    return () => {
      window.removeEventListener('clinipulse_broadcast_update', handleUpdate);
    };
  }, []);

  // Compute KPI values
  const activeCount = broadcasts.filter((b) => b.status === 'active').length;
  const criticalCount = broadcasts.filter((b) => b.severity === 'critical' && b.status === 'active').length;

  const totalInAppImpressions = useMemo(
    () => broadcasts.reduce((acc, b) => acc + (b.stats?.inAppImpressions || 0), 0),
    [broadcasts]
  );

  const totalEmailsDelivered = useMemo(
    () => broadcasts.reduce((acc, b) => acc + (b.stats?.emailsDelivered || 0), 0),
    [broadcasts]
  );

  const totalWhatsAppDelivered = useMemo(
    () => broadcasts.reduce((acc, b) => acc + (b.stats?.whatsAppDelivered || 0), 0),
    [broadcasts]
  );

  // Filtered broadcasts
  const filteredBroadcasts = useMemo(() => {
    return broadcasts.filter((b) => {
      // Tab filter
      if (activeTab === 'emergency' && b.type !== 'emergency') return false;
      if (activeTab === 'maintenance' && b.type !== 'maintenance') return false;

      // Status filter
      if (statusFilter !== 'all' && b.status !== statusFilter) return false;

      // Type filter
      if (typeFilter !== 'all' && b.type !== typeFilter) return false;

      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchTitle = b.title.toLowerCase().includes(q);
        const matchMsg = b.message.toLowerCase().includes(q);
        const matchId = b.id.toLowerCase().includes(q);
        if (!matchTitle && !matchMsg && !matchId) return false;
      }

      return true;
    });
  }, [broadcasts, activeTab, statusFilter, typeFilter, searchQuery]);

  const handleOpenDetails = (b) => {
    setSelectedBroadcast(b);
    setDetailsModalOpen(true);
  };

  const handleOpenTestSimulator = (b) => {
    setSelectedBroadcast(b);
    setSimulatorModalOpen(true);
  };

  const handleResetData = () => {
    if (window.confirm('Reset all broadcasts and simulation statistics to default seeds?')) {
      broadcastService.resetBroadcastData();
      loadData();
      showToast('Broadcast hub data reset to default seed benchmarks.');
    }
  };

  // Delivery Reach Chart Data
  const reachChartData = useMemo(() => {
    return AVAILABLE_CLINICS.map((clinic) => {
      // Simulated delivery weight based on clinic plan
      const inApp = clinic.plan === 'enterprise' ? 48 : clinic.plan === 'professional' ? 36 : 18;
      const email = clinic.plan === 'enterprise' ? 14 : clinic.plan === 'professional' ? 8 : 4;
      const wa = clinic.plan === 'enterprise' ? 12 : clinic.plan === 'professional' ? 7 : 3;

      return {
        clinic: clinic.name.split(' ')[0],
        inApp,
        email,
        whatsapp: wa,
      };
    });
  }, []);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              Platform Governance & System Communications
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-rose-600 animate-pulse" />
              Live Hub
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <Radio className="w-7 h-7 text-blue-600 dark:text-blue-400 shrink-0" />
            Global Broadcast & Emergency Notification Hub
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-3xl">
            Direct announcement center to communicate critical platform maintenance, healthcare advisories, and feature updates across all 5 tenant clinics via In-App Sticky Banners, Email Blasts, and WhatsApp API.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            onClick={handleResetData}
            title="Reset default data"
            className="text-slate-600 dark:text-slate-300"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1" /> Reset Data
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              setSelectedBroadcast(broadcasts[0] || null);
              setSimulatorModalOpen(true);
            }}
            className="border-teal-300 dark:border-teal-700 text-teal-700 dark:text-teal-300 hover:bg-teal-50 dark:hover:bg-teal-950/40"
          >
            <Zap className="w-3.5 h-3.5 mr-1 text-teal-600" /> Channel Simulator
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setCreateModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-xs flex items-center gap-1.5"
          >
            <Plus className="w-4 h-4" />
            <span>New Global Broadcast</span>
          </Button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Live Broadcasts"
          value={activeCount}
          subtitle={`${criticalCount} Critical Emergency Alerts`}
          trend={criticalCount > 0 ? 'up' : 'neutral'}
          change={`${broadcasts.length} total in system`}
          icon={Radio}
          color="rose"
        />

        <StatCard
          title="In-App Banner Impressions"
          value={totalInAppImpressions.toLocaleString()}
          subtitle="Top-bar views across all 5 clinics"
          trend="up"
          change="+18% this week"
          icon={Megaphone}
          color="blue"
        />

        <StatCard
          title="Email Blasts Dispatched"
          value={totalEmailsDelivered.toLocaleString()}
          subtitle="Staff inbox deliverability (100%)"
          trend="up"
          change="92% open rate avg"
          icon={Mail}
          color="indigo"
        />

        <StatCard
          title="WhatsApp Emergency Alerts"
          value={totalWhatsAppDelivered.toLocaleString()}
          subtitle="Verified Business API dispatches"
          trend="up"
          change="Double-tick confirmed"
          icon={Smartphone}
          color="teal"
        />
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-1 sm:gap-4 overflow-x-auto">
        <button
          onClick={() => setActiveTab('all')}
          className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
            activeTab === 'all'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Radio className="w-4 h-4" />
          <span>All Broadcasts ({broadcasts.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('emergency')}
          className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
            activeTab === 'emergency'
              ? 'border-rose-600 text-rose-600 dark:text-rose-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <AlertTriangle className="w-4 h-4 text-rose-500" />
          <span>Emergency Advisories ({broadcasts.filter((b) => b.type === 'emergency').length})</span>
        </button>

        <button
          onClick={() => setActiveTab('maintenance')}
          className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
            activeTab === 'maintenance'
              ? 'border-amber-600 text-amber-600 dark:text-amber-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Wrench className="w-4 h-4 text-amber-500" />
          <span>Scheduled Maintenance ({broadcasts.filter((b) => b.type === 'maintenance').length})</span>
        </button>

        <button
          onClick={() => setActiveTab('channels')}
          className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
            activeTab === 'channels'
              ? 'border-teal-600 text-teal-600 dark:text-teal-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Server className="w-4 h-4" />
          <span>Multi-Channel Gateway Matrix</span>
        </button>

        <button
          onClick={() => setActiveTab('analytics')}
          className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
            activeTab === 'analytics'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Audience Reach Analytics & Logs</span>
        </button>
      </div>

      {/* Main Tab Content */}
      {(activeTab === 'all' || activeTab === 'emergency' || activeTab === 'maintenance') && (
        <div className="space-y-4">
          {/* Search & Filter Bar */}
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-2xs">
            {/* Search */}
            <div className="relative flex-1 min-w-[220px]">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search announcements by title, advisory ID, or content..."
                className="w-full pl-9 pr-3 py-1.5 text-xs sm:text-sm rounded-lg border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white"
              />
            </div>

            {/* Dropdowns */}
            <div className="flex items-center gap-2 flex-wrap">
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 font-medium"
              >
                <option value="all">All Statuses</option>
                <option value="active">Active (Broadcasting)</option>
                <option value="scheduled">Scheduled</option>
                <option value="draft">Draft</option>
                <option value="ended">Ended / Inactive</option>
              </select>

              <select
                value={typeFilter}
                onChange={(e) => setTypeFilter(e.target.value)}
                className="px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs text-slate-700 dark:text-slate-300 font-medium"
              >
                <option value="all">All Categories</option>
                <option value="maintenance">Maintenance</option>
                <option value="emergency">Emergency Health</option>
                <option value="feature">Feature Release</option>
                <option value="security">Security Notice</option>
                <option value="announcement">Platform Announcement</option>
              </select>
            </div>
          </div>

          {/* Broadcasts Table / Cards */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 overflow-hidden shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs sm:text-sm">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-[11px] uppercase tracking-wider font-bold text-slate-500 dark:text-slate-400 border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="px-3.5 py-3 text-center w-12 font-bold text-slate-500 dark:text-slate-400">#</th>
                    <th className="px-4 py-3">Broadcast Identifier</th>
                    <th className="px-4 py-3">Announcement Title & Advisory</th>
                    <th className="px-4 py-3">Category & Severity</th>
                    <th className="px-4 py-3">Channels Dispatched</th>
                    <th className="px-4 py-3">Target Scope</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredBroadcasts.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-4 py-12 text-center text-slate-400">
                        <Radio className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p className="font-semibold text-slate-600 dark:text-slate-300">
                          No matching broadcasts found
                        </p>
                        <p className="text-xs text-slate-500 mt-0.5">
                          Try adjusting search keywords or filters, or create a new announcement.
                        </p>
                      </td>
                    </tr>
                  ) : (
                    filteredBroadcasts.map((broadcast, idx) => {
                      const typeConfig = BROADCAST_TYPES[broadcast.type] || BROADCAST_TYPES.announcement;
                      const sevConfig = SEVERITY_LEVELS[broadcast.severity] || SEVERITY_LEVELS.info;

                      return (
                        <tr
                          key={broadcast.id}
                          className="hover:bg-blue-50/60 dark:hover:bg-slate-800/60 transition-colors cursor-pointer"
                          onClick={() => handleOpenDetails(broadcast)}
                          title="Click to view broadcast details & delivery statistics"
                        >
                          {/* S.No */}
                          <td className="px-3.5 py-3.5 text-center font-bold text-slate-500 dark:text-slate-400">
                            {idx + 1}
                          </td>

                          {/* ID & Author */}
                          <td className="px-4 py-3.5 whitespace-nowrap">
                            <span className="font-mono font-bold text-blue-600 dark:text-blue-400 text-xs">
                              {broadcast.id}
                            </span>
                            <div className="text-[11px] text-slate-400">
                              {new Date(broadcast.createdAt).toLocaleDateString()}
                            </div>
                          </td>

                          {/* Title & Preview */}
                          <td className="px-4 py-3.5 max-w-sm sm:max-w-md">
                            <div className="font-bold text-slate-900 dark:text-white line-clamp-1">
                              {broadcast.title}
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                              {broadcast.maintenanceWindow ? `[${broadcast.maintenanceWindow}] ` : ''}
                              {broadcast.message}
                            </div>
                          </td>

                          {/* Category & Severity */}
                          <td className="px-4 py-3.5 whitespace-nowrap">
                            <div className="flex flex-col gap-1 items-start">
                              <span className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${typeConfig.badgeClass}`}>
                                {typeConfig.label}
                              </span>
                              <span className={`px-1.5 py-0.2 rounded text-[10px] font-bold ${sevConfig.badgeClass}`}>
                                {sevConfig.label}
                              </span>
                            </div>
                          </td>

                          {/* Channels */}
                          <td className="px-4 py-3.5 whitespace-nowrap">
                            <div className="flex items-center gap-1.5">
                              {broadcast.channels?.includes('in_app') && (
                                <span
                                  className="p-1 rounded bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800"
                                  title="In-App Banner Active"
                                >
                                  <Radio className="w-3.5 h-3.5" />
                                </span>
                              )}
                              {broadcast.channels?.includes('email') && (
                                <span
                                  className="p-1 rounded bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800"
                                  title="Email Blast Dispatched"
                                >
                                  <Mail className="w-3.5 h-3.5" />
                                </span>
                              )}
                              {broadcast.channels?.includes('whatsapp') && (
                                <span
                                  className="p-1 rounded bg-teal-50 dark:bg-teal-950/40 text-teal-600 dark:text-teal-400 border border-teal-200 dark:border-teal-800"
                                  title="WhatsApp API Dispatched"
                                >
                                  <Smartphone className="w-3.5 h-3.5" />
                                </span>
                              )}
                            </div>
                          </td>

                          {/* Target Scope */}
                          <td className="px-4 py-3.5 whitespace-nowrap text-xs text-slate-600 dark:text-slate-300">
                            <div>
                              <strong>
                                {broadcast.targetAudience?.clinicScope === 'all'
                                  ? 'All 5 Clinics'
                                  : `${broadcast.targetAudience?.selectedClinicIds?.length || 1} Clinics`}
                              </strong>
                            </div>
                            <div className="text-[11px] text-slate-400">
                              {broadcast.targetAudience?.roleScope === 'all'
                                ? 'All Staff Roles'
                                : broadcast.targetAudience?.selectedRoles?.join(', ') || 'Staff'}
                            </div>
                          </td>

                          {/* Status */}
                          <td className="px-4 py-3.5 whitespace-nowrap">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${
                              broadcast.status === 'active'
                                ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300'
                                : broadcast.status === 'scheduled'
                                ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300'
                                : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                            }`}>
                              {broadcast.status === 'active' && (
                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                              )}
                              {broadcast.status === 'active'
                                ? 'Broadcasting'
                                : broadcast.status === 'scheduled'
                                ? 'Scheduled'
                                : broadcast.status === 'draft'
                                ? 'Draft'
                                : 'Ended'}
                            </span>
                          </td>

                          {/* Actions */}
                          <td className="px-4 py-3.5 whitespace-nowrap text-right" onClick={(e) => e.stopPropagation()}>
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                onClick={() => handleOpenTestSimulator(broadcast)}
                                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 hover:text-teal-600 transition-colors cursor-pointer"
                                title="Run Test Dispatch"
                              >
                                <Zap className="w-4 h-4" />
                              </button>

                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleOpenDetails(broadcast)}
                                className="text-xs h-7 px-2.5"
                              >
                                Details
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Multi-Channel Gateway Matrix */}
      {activeTab === 'channels' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Gateway 1: In-App Sticky Banner */}
            <Card className="border-blue-200 dark:border-blue-800/60 shadow-2xs">
              <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <Radio className="w-4 h-4 text-blue-600" />
                    In-App Banner Engine
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                    Operational (100%)
                  </span>
                </div>
              </CardHeader>
              <CardContent className="pt-4 space-y-3 text-xs">
                <p className="text-slate-600 dark:text-slate-400">
                  Delivers instant sticky banner notices to doctors, clinic admins, receptionists, and patient portal screens. Supports role-based filtering and instant dismissal caching.
                </p>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Latency:</span>
                    <strong className="text-slate-800 dark:text-slate-200">~12ms (Local State Sync)</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Dismissal Memory:</span>
                    <strong className="text-slate-800 dark:text-slate-200">localStorage / Session Key</strong>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Gateway 2: WhatsApp Cloud API */}
            <Card className="border-teal-200 dark:border-teal-800/60 shadow-2xs">
              <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <Smartphone className="w-4 h-4 text-teal-600" />
                    WhatsApp Business API
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                    Verified (Active)
                  </span>
                </div>
              </CardHeader>
              <CardContent className="pt-4 space-y-3 text-xs">
                <p className="text-slate-600 dark:text-slate-400">
                  High-priority direct dispatch for emergency clinical advisories and urgent maintenance alarms. Includes verified green tick sender identity.
                </p>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Sender Identity:</span>
                    <strong className="text-slate-800 dark:text-slate-200">ClinicOS Official Verified</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Delivery Confirmation:</span>
                    <strong className="text-slate-800 dark:text-slate-200">Double-Tick Webhook ACK</strong>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Gateway 3: SMTP / Amazon SES */}
            <Card className="border-indigo-200 dark:border-indigo-800/60 shadow-2xs">
              <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                    <Mail className="w-4 h-4 text-indigo-600" />
                    SMTP Email Blast Gateway
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                    High Deliverability
                  </span>
                </div>
              </CardHeader>
              <CardContent className="pt-4 space-y-3 text-xs">
                <p className="text-slate-600 dark:text-slate-400">
                  Transmits formatted responsive HTML bulletins with clinic logos, maintenance timelines, action buttons, and regulatory disclaimers.
                </p>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500">DKIM / SPF:</span>
                    <strong className="text-slate-800 dark:text-slate-200">Aligned & Verified</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Average Open Rate:</span>
                    <strong className="text-slate-800 dark:text-slate-200">92.4% Across Staff</strong>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Tab: Audience Reach Analytics & Logs */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Chart: Reach per Tenant Clinic */}
            <div className="lg:col-span-7 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-2xs">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                    Tenant Clinic Audience Engagement
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    In-app views and channel receipts across individual clinic organizations
                  </p>
                </div>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                  5 Tenant Clinics
                </span>
              </div>

              <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={reachChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" opacity={0.2} />
                    <XAxis dataKey="clinic" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip />
                    <Bar dataKey="inApp" name="In-App Banner Views" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="email" name="Email Deliveries" fill="#6366f1" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="whatsapp" name="WhatsApp Dispatches" fill="#0d9488" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Target Role Breakdown */}
            <div className="lg:col-span-5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-2xs space-y-4">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                Healthcare Role Reach Distribution
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Staff distribution reached by broadcast announcements across tiers
              </p>

              <div className="space-y-3 pt-1">
                {AVAILABLE_ROLES.map((role) => (
                  <div key={role.id} className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center justify-between text-xs font-bold mb-1">
                      <span className="text-slate-800 dark:text-slate-200">{role.label}</span>
                      <span className="text-blue-600 dark:text-blue-400">100% Reachable</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {role.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Broadcast Audit Activity Log */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-2xs space-y-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Clock className="w-4 h-4 text-blue-600" />
              Administrative Broadcast Audit Stream
            </h3>
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {broadcastService.getBroadcastLogs().map((log, idx) => (
                <div key={log.id} className="py-2.5 flex items-start justify-between gap-4 text-xs">
                  <div className="flex items-start gap-3">
                    <span className="font-mono font-bold text-slate-400 dark:text-slate-500 text-xs w-6 shrink-0 pt-0.5">
                      #{idx + 1}
                    </span>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 dark:text-white">
                          {log.event}
                        </span>
                        <span className="font-mono text-[10px] text-slate-400">
                          [{log.broadcastId}]
                        </span>
                        <span className="px-1.5 py-0.2 rounded text-[10px] bg-slate-100 dark:bg-slate-800 font-medium">
                          {log.channel}
                        </span>
                      </div>
                      <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                        {log.details}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                      {log.status}
                    </span>
                    <p className="text-[10px] text-slate-400">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <CreateBroadcastModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        onCreated={() => loadData()}
        showToast={showToast}
      />

      <BroadcastDetailsModal
        isOpen={detailsModalOpen}
        onClose={() => setDetailsModalOpen(false)}
        broadcast={selectedBroadcast}
        onUpdated={() => loadData()}
        onOpenTestSimulator={(b) => {
          setSelectedBroadcast(b);
          setSimulatorModalOpen(true);
        }}
        showToast={showToast}
      />

      <DispatchSimulatorModal
        isOpen={simulatorModalOpen}
        onClose={() => setSimulatorModalOpen(false)}
        broadcast={selectedBroadcast}
        showToast={showToast}
      />
    </div>
  );
}

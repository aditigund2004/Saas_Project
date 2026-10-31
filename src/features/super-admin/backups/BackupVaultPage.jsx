import React, { useState, useEffect, useMemo } from 'react';
import { useApp } from '../../../context/AppContext';
import {
  backupVaultService
} from '../../../services/backupVaultService';
import { StatCard } from '../../../components/ui/StatCard';
import { Card, CardHeader, CardContent } from '../../../components/ui/Card';
import { Button } from '../../../components/ui/Button';
import { ExportMigrationModal } from './modals/ExportMigrationModal';
import { SnapshotDetailsModal } from './modals/SnapshotDetailsModal';
import { TriggerSnapshotModal } from './modals/TriggerSnapshotModal';
import { RestoreDrillModal } from './modals/RestoreDrillModal';
import {
  HardDrive,
  Database,
  FileArchive,
  Download,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Server,
  Lock,
  Users,
  FileText,
  CreditCard,
  Calendar,
  Activity,
  Play,
  RotateCcw,
  Eye,
  RefreshCw
} from 'lucide-react';

export function BackupVaultPage() {
  const { clinics = [], patients = [], appointments = [], prescriptions = [], invoices = [], doctors = [], showToast } = useApp();

  const [activeTab, setActiveTab] = useState('timeline'); // 'timeline' | 'migration' | 'dr-drills' | 'retention'
  const [snapshots, setSnapshots] = useState(() => backupVaultService.getSnapshots());
  const [migrationLogs, setMigrationLogs] = useState(() => backupVaultService.getMigrationLogs());
  const [drDrills, setDrDrills] = useState(() => backupVaultService.getDrDrills());

  // Filter & Search
  const [timelineFilter, setTimelineFilter] = useState('all'); // 'all' | 'full_cluster' | 'database' | 'scans'
  const [selectedClinicId, setSelectedClinicId] = useState('clinic-citycare');

  // Modals
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [snapshotDetailsModalOpen, setSnapshotDetailsModalOpen] = useState(false);
  const [selectedSnapshot, setSelectedSnapshot] = useState(null);
  const [triggerSnapshotModalOpen, setTriggerSnapshotModalOpen] = useState(false);
  const [restoreDrillModalOpen, setRestoreDrillModalOpen] = useState(false);

  // Dry-run migration simulation state
  const [isDryRunning, setIsDryRunning] = useState(false);
  const [dryRunResult, setDryRunResult] = useState(null);

  const loadData = () => {
    setSnapshots(backupVaultService.getSnapshots());
    setMigrationLogs(backupVaultService.getMigrationLogs());
    setDrDrills(backupVaultService.getDrDrills());
  };

  useEffect(() => {
    const handleUpdate = () => loadData();
    window.addEventListener('clinipulse_backup_update', handleUpdate);
    return () => window.removeEventListener('clinipulse_backup_update', handleUpdate);
  }, []);

  // Filtered Snapshots for Timeline
  const filteredSnapshots = useMemo(() => {
    if (timelineFilter === 'all') return snapshots;
    return snapshots.filter((s) => s.type === timelineFilter);
  }, [snapshots, timelineFilter]);

  // Selected Clinic for Migration tab
  const activeMigrationClinic = useMemo(() => {
    return clinics.find((c) => c.id === selectedClinicId) || clinics[0] || {
      id: 'clinic-citycare',
      name: 'CityCare Family Clinic',
      city: 'Pune',
      subscriptionPlanId: 'professional',
    };
  }, [clinics, selectedClinicId]);

  // Handle Dry Run Test
  const handleRunMigrationDryRun = () => {
    setIsDryRunning(true);
    setDryRunResult(null);

    setTimeout(() => {
      setIsDryRunning(false);
      setDryRunResult({
        clinicName: activeMigrationClinic.name,
        timestamp: new Date().toLocaleTimeString(),
        schemaValid: true,
        orphanedKeys: 0,
        duplicatePatients: 0,
        fhirR4Conformant: true,
        score: '100% Ready for Offline Portability / Zero-Downtime EMR Ingestion',
      });
      showToast('✅ Dry-run validation passed! 0 orphaned keys or schema errors detected.');
    }, 1200);
  };

  const handleResetVault = () => {
    if (window.confirm('Reset backup vault, snapshots, and migration logs to default seeds?')) {
      backupVaultService.resetVaultData();
      loadData();
      showToast('Backup vault data reset to default seeds.');
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              Disaster Recovery & Tenant Portability
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
              WORM Immutable
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <HardDrive className="w-7 h-7 text-blue-600 dark:text-blue-400 shrink-0" />
            Automated Backup Vault & One-Click Clinic Migration
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-3xl">
            Guarantees healthcare data durability across multi-region standby clusters, visual daily snapshot timelines, and one-click encrypted .ZIP tenant portability archives with HL7 FHIR R4 interoperability.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <Button
            variant="outline"
            size="sm"
            onClick={handleResetVault}
            className="text-slate-600 dark:text-slate-300"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1" /> Reset Seeds
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setRestoreDrillModalOpen(true)}
            className="border-emerald-300 dark:border-emerald-700 text-emerald-700 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40"
          >
            <Play className="w-3.5 h-3.5 mr-1 text-emerald-600" /> Run DR Drill
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={() => setExportModalOpen(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white shadow-xs flex items-center gap-1.5"
          >
            <FileArchive className="w-4 h-4" />
            <span>One-Click Clinic Export</span>
          </Button>
        </div>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Last Automated Snapshot"
          value="Today, 03:00 AM"
          subtitle="Full Cluster Consolidated"
          trend="up"
          change="100% Verified Parity"
          icon={CheckCircle2}
          color="emerald"
        />

        <StatCard
          title="Vault Storage Footprint"
          value="12.8 GB"
          subtitle="Compressed (42 GB Raw)"
          trend="up"
          change="3.6x Compression Ratio"
          icon={Database}
          color="blue"
        />

        <StatCard
          title="RPO (Recovery Point)"
          value="8 mins"
          subtitle="SLA Target: < 15 mins"
          trend="up"
          change="WAL streaming active"
          icon={Clock}
          color="indigo"
        />

        <StatCard
          title="RTO (Recovery Time)"
          value="142 sec"
          subtitle="SLA Target: < 300 sec"
          trend="up"
          change="Standby hot-ready"
          icon={Activity}
          color="teal"
        />
      </div>

      {/* Tabs Navigation */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-1 sm:gap-4 overflow-x-auto">
        <button
          onClick={() => setActiveTab('timeline')}
          className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
            activeTab === 'timeline'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Clock className="w-4 h-4" />
          <span>Automated Daily Snapshot Timeline</span>
        </button>

        <button
          onClick={() => setActiveTab('migration')}
          className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
            activeTab === 'migration'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <FileArchive className="w-4 h-4" />
          <span>Tenant Data Portability & Migration</span>
        </button>

        <button
          onClick={() => setActiveTab('dr-drills')}
          className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
            activeTab === 'dr-drills'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>Disaster Recovery (DR) & Drills</span>
        </button>

        <button
          onClick={() => setActiveTab('retention')}
          className={`py-3 px-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
            activeTab === 'retention'
              ? 'border-blue-600 text-blue-600 dark:text-blue-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>NMC 7-Year WORM Retention Policy</span>
        </button>
      </div>

      {/* Tab 1: Automated Daily Snapshot Status Timeline */}
      {activeTab === 'timeline' && (
        <div className="space-y-6">
          {/* Filter Bar & Trigger Action */}
          <div className="p-3.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mr-1">
                Filter Snapshots:
              </span>
              <button
                type="button"
                onClick={() => setTimelineFilter('all')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                  timelineFilter === 'all'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                All Snapshots ({snapshots.length})
              </button>
              <button
                type="button"
                onClick={() => setTimelineFilter('full_cluster')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                  timelineFilter === 'full_cluster'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                Full Cluster ({snapshots.filter((s) => s.type === 'full_cluster').length})
              </button>
              <button
                type="button"
                onClick={() => setTimelineFilter('database')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                  timelineFilter === 'database'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                PostgreSQL DB ({snapshots.filter((s) => s.type === 'database').length})
              </button>
              <button
                type="button"
                onClick={() => setTimelineFilter('scans')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer ${
                  timelineFilter === 'scans'
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                Medical Scans ({snapshots.filter((s) => s.type === 'scans').length})
              </button>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setTriggerSnapshotModalOpen(true)}
              className="border-blue-300 dark:border-blue-700 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/40 text-xs shrink-0"
            >
              <HardDrive className="w-3.5 h-3.5 mr-1 text-blue-600" /> Trigger On-Demand Backup
            </Button>
          </div>

          {/* Visual Timeline Stream */}
          <div className="relative pl-6 sm:pl-8 space-y-4 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-0.5 before:bg-blue-200 dark:before:bg-blue-900/60">
            {filteredSnapshots.map((snapshot) => {
              const isFull = snapshot.type === 'full_cluster';
              const isDb = snapshot.type === 'database';

              return (
                <div key={snapshot.id} className="relative group">
                  {/* Timeline Node Dot */}
                  <div className={`absolute -left-6 sm:-left-8 top-4 w-4 h-4 rounded-full border-2 border-white dark:border-slate-900 ${
                    isFull
                      ? 'bg-blue-600 ring-4 ring-blue-100 dark:ring-blue-950'
                      : isDb
                      ? 'bg-indigo-600 ring-4 ring-indigo-100 dark:ring-indigo-950'
                      : 'bg-teal-600 ring-4 ring-teal-100 dark:ring-teal-950'
                  }`} />

                  {/* Card Container */}
                  <div
                    onClick={() => {
                      setSelectedSnapshot(snapshot);
                      setSnapshotDetailsModalOpen(true);
                    }}
                    className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-400 dark:hover:border-blue-600 transition-all cursor-pointer shadow-2xs hover:shadow-sm"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-mono text-xs font-bold text-blue-600 dark:text-blue-400">
                            {snapshot.id}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-[11px] font-semibold uppercase tracking-wider ${
                            isFull
                              ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 border border-blue-200 dark:border-blue-800'
                              : isDb
                              ? 'bg-indigo-50 dark:bg-indigo-950/40 text-indigo-800 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800'
                              : 'bg-teal-50 dark:bg-teal-950/40 text-teal-800 dark:text-teal-300 border border-teal-200 dark:border-teal-800'
                          }`}>
                            {snapshot.typeName}
                          </span>
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            {snapshot.statusLabel}
                          </span>
                        </div>

                        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                          Automated Daily Backup: {snapshot.dateLabel}
                        </h3>

                        <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 flex-wrap pt-0.5">
                          <span>📦 Size: <strong className="text-slate-800 dark:text-slate-200">{snapshot.sizeFormatted}</strong> ({snapshot.compressionRatio} compression)</span>
                          <span>⏱️ Duration: <strong>{snapshot.durationMinutes} mins</strong></span>
                          <span>🛡️ RPO: <strong className="text-emerald-600 dark:text-emerald-400">{snapshot.rpoAchieved}</strong></span>
                          <span>🔒 AES-256 KMS &amp; WORM Lock</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 shrink-0">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedSnapshot(snapshot);
                            setSnapshotDetailsModalOpen(true);
                          }}
                          className="text-xs h-8"
                        >
                          <Eye className="w-3.5 h-3.5 mr-1 text-slate-400" />
                          Inspect Parity
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Tenant Data Portability Export & One-Click Clinic Migration */}
      {activeTab === 'migration' && (
        <div className="space-y-6">
          {/* Clinic Selector Cards */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
              Select Tenant Clinic for Data Portability & Archive Extraction
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
              {clinics.map((clinic) => {
                const isSelected = clinic.id === selectedClinicId;
                return (
                  <button
                    key={clinic.id}
                    type="button"
                    onClick={() => setSelectedClinicId(clinic.id)}
                    className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-500 text-blue-950 dark:text-blue-100 ring-2 ring-blue-500/20 shadow-xs'
                        : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-800 dark:text-slate-200'
                    }`}
                  >
                    <div className="font-bold text-xs truncate">{clinic.name}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      {clinic.city || 'Pune'} • {clinic.subscriptionPlanId || 'Professional'}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Primary Migration Cockpit Card */}
          <Card className="border-blue-200 dark:border-blue-900/40 shadow-sm bg-gradient-to-br from-white via-white to-blue-50/20 dark:from-slate-900 dark:to-slate-900">
            <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-0.5">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                    Tenant Data Portability Engine (DPDP Section 6)
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {activeMigrationClinic.name} — Full Extraction Cockpit
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleRunMigrationDryRun}
                    disabled={isDryRunning}
                    className="text-xs border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-50 dark:hover:bg-indigo-950/40"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 mr-1 ${isDryRunning ? 'animate-spin' : ''}`} />
                    {isDryRunning ? 'Verifying...' : 'Run Migration Dry-Run'}
                  </Button>

                  <Button
                    variant="primary"
                    size="sm"
                    onClick={() => setExportModalOpen(true)}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs shadow-xs flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Generate &amp; Download .ZIP Archive</span>
                  </Button>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-4 space-y-4">
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Generates a genuine encrypted or unencrypted <strong>.ZIP archive</strong> containing this clinic's complete database extraction: patient demographics, consultation appointments, digital prescriptions, itemized billing invoices, clinical SOAP notes, and HL7 FHIR R4 document bundles.
              </p>

              {/* Data Scope Numbers */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-center">
                  <Users className="w-4 h-4 text-blue-600 mx-auto mb-1" />
                  <div className="text-xl font-bold text-slate-900 dark:text-white">
                    {(patients || []).length}
                  </div>
                  <p className="text-[11px] text-slate-500">Patient Profiles (JSON &amp; CSV)</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-center">
                  <Calendar className="w-4 h-4 text-emerald-600 mx-auto mb-1" />
                  <div className="text-xl font-bold text-slate-900 dark:text-white">
                    {(appointments || []).length}
                  </div>
                  <p className="text-[11px] text-slate-500">Appointments (Past &amp; Upcoming)</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-center">
                  <FileText className="w-4 h-4 text-indigo-600 mx-auto mb-1" />
                  <div className="text-xl font-bold text-slate-900 dark:text-white">
                    {(prescriptions || []).length}
                  </div>
                  <p className="text-[11px] text-slate-500">Digital Prescriptions</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-center">
                  <CreditCard className="w-4 h-4 text-amber-600 mx-auto mb-1" />
                  <div className="text-xl font-bold text-slate-900 dark:text-white">
                    {(invoices || []).length}
                  </div>
                  <p className="text-[11px] text-slate-500">Invoices &amp; Payments</p>
                </div>
              </div>

              {/* Dry Run Result Box if executed */}
              {dryRunResult && (
                <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-xs space-y-2 animate-fade-in">
                  <div className="flex items-center justify-between font-bold text-emerald-800 dark:text-emerald-300">
                    <span className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      Migration Dry-Run Conformance Report: {dryRunResult.clinicName}
                    </span>
                    <span className="text-[11px] font-mono text-emerald-700 dark:text-emerald-400">
                      Verified at {dryRunResult.timestamp}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-slate-700 dark:text-slate-300">
                    <div>
                      <span className="text-slate-500">Relational Integrity:</span> <strong>0 Orphaned Keys</strong>
                    </div>
                    <div>
                      <span className="text-slate-500">Duplicate Check:</span> <strong>0 Duplicate MRNs</strong>
                    </div>
                    <div>
                      <span className="text-slate-500">FHIR R4 Schema:</span> <strong>100% Validated</strong>
                    </div>
                    <div>
                      <span className="text-slate-500">Readiness Score:</span> <strong>{dryRunResult.score}</strong>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Migration & Export Audit Log */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-2xs space-y-3">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <FileArchive className="w-4 h-4 text-blue-600" />
              Tenant Portability & Offline Archive Export Stream
            </h3>
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {migrationLogs.map((log) => (
                <div key={log.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-blue-600 dark:text-blue-400 font-bold">
                        {log.id}
                      </span>
                      <span className="font-bold text-slate-900 dark:text-white">
                        {log.clinicName}
                      </span>
                      <span className="px-1.5 py-0.2 rounded text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium">
                        {log.format}
                      </span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                      Archive: {log.archiveName} ({log.sizeFormatted}) • Requested by {log.requestedBy}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                      {log.status}
                    </span>
                    <p className="text-[10px] text-slate-400">
                      {new Date(log.timestamp).toLocaleString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: Disaster Recovery (DR) & Drills */}
      {activeTab === 'dr-drills' && (
        <div className="space-y-6">
          {/* DR Health Indicators */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-slate-200 dark:border-slate-800 shadow-2xs">
              <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800">
                <span className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Server className="w-4 h-4 text-blue-600" />
                  Multi-Region Standby Health
                </span>
              </CardHeader>
              <CardContent className="pt-4 space-y-3 text-xs">
                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-slate-800 dark:text-slate-200">AWS Mumbai (ap-south-1)</p>
                    <p className="text-slate-400 text-[11px]">Primary Active Cluster</p>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                    100% Healthy
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 flex justify-between items-center">
                  <div>
                    <p className="font-bold text-slate-800 dark:text-slate-200">GCP Delhi (asia-south1)</p>
                    <p className="text-slate-400 text-[11px]">Hot Standby Geo-Replica</p>
                  </div>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                    Streaming WAL Replay (0 Lag)
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 dark:border-slate-800 shadow-2xs">
              <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800">
                <span className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-600" />
                  RTO &amp; RPO Recovery SLA Guard
                </span>
              </CardHeader>
              <CardContent className="pt-4 space-y-3 text-xs">
                <div className="flex justify-between items-center p-2.5 rounded bg-slate-50 dark:bg-slate-800/60">
                  <span className="text-slate-500">Target RPO Objective:</span>
                  <strong className="text-slate-900 dark:text-white">&lt; 15 Minutes (Actual: 8 mins)</strong>
                </div>
                <div className="flex justify-between items-center p-2.5 rounded bg-slate-50 dark:bg-slate-800/60">
                  <span className="text-slate-500">Target RTO Objective:</span>
                  <strong className="text-slate-900 dark:text-white">&lt; 5 Minutes (Actual: 142 sec)</strong>
                </div>
                <div className="flex justify-between items-center p-2.5 rounded bg-slate-50 dark:bg-slate-800/60">
                  <span className="text-slate-500">Quarterly DR Drill Status:</span>
                  <strong className="text-emerald-600 dark:text-emerald-400">Q3 Drill Passed (100% Parity)</strong>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Drill Logs Table */}
          <div className="rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 p-5 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-emerald-600" />
                Historical Disaster Recovery &amp; Failover Drills
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setRestoreDrillModalOpen(true)}
                className="text-xs"
              >
                <Play className="w-3.5 h-3.5 mr-1" /> New Simulation Drill
              </Button>
            </div>

            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {drDrills.map((drill) => (
                <div key={drill.id} className="py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                  <div className="space-y-0.5">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">
                        {drill.id}
                      </span>
                      <span className="font-bold text-slate-900 dark:text-white">
                        {drill.title}
                      </span>
                      <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
                        {drill.outcome}
                      </span>
                    </div>
                    <p className="text-slate-500 dark:text-slate-400 text-[11px]">
                      Target: {drill.target} • Achieved RTO: {drill.rtoAchieved} • Parity: {drill.dataIntegrity}
                    </p>
                  </div>

                  <div className="text-right shrink-0">
                    <p className="text-[11px] text-slate-400">
                      {new Date(drill.initiatedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 4: WORM Immutability & NMC 7-Year Retention Policy */}
      {activeTab === 'retention' && (
        <div className="space-y-6">
          <Card className="border-slate-200 dark:border-slate-800 shadow-2xs">
            <CardHeader className="pb-3 border-b border-slate-100 dark:border-slate-800">
              <span className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-blue-600" />
                Statutory Healthcare Records Retention Policy Matrix
              </span>
            </CardHeader>
            <CardContent className="pt-4 space-y-4 text-xs leading-relaxed text-slate-700 dark:text-slate-300">
              <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 space-y-1">
                <p className="font-bold flex items-center gap-1.5">
                  <Lock className="w-4 h-4 text-amber-600" />
                  National Medical Commission (NMC) &amp; CDSCO Retention Mandate
                </p>
                <p className="text-[11px]">
                  All outpatient consultations, inpatient records, and digital prescriptions must be retained for a mandatory minimum of 3 years under NMC guidelines, and extended to 7 years in ClinicOS Vault WORM (Write Once Read Many) mode to defend against medicolegal disputes.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="font-bold text-slate-900 dark:text-white">Tier 1: Hot NVMe Buffer</span>
                  <p className="text-[11px] text-slate-500">
                    Last 30 days active WAL and immediate rollback checkpoints. Instant query access.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="font-bold text-slate-900 dark:text-white">Tier 2: S3 Glacier Instant</span>
                  <p className="text-[11px] text-slate-500">
                    Day 31 to Day 365. Object locked with legal hold. Millisecond retrieval latency.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 space-y-1">
                  <span className="font-bold text-slate-900 dark:text-white">Tier 3: Deep WORM Archive</span>
                  <p className="text-[11px] text-slate-500">
                    Year 2 to Year 7. Immutability locked. Compliant with HIPAA, GDPR, and DPDP Act.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Modals */}
      <ExportMigrationModal
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
        clinics={clinics}
        appState={{ patients, appointments, prescriptions, invoices, doctors }}
        selectedClinicId={selectedClinicId}
        onExportSuccess={() => loadData()}
        showToast={showToast}
      />

      <SnapshotDetailsModal
        isOpen={snapshotDetailsModalOpen}
        onClose={() => setSnapshotDetailsModalOpen(false)}
        snapshot={selectedSnapshot}
        showToast={showToast}
      />

      <TriggerSnapshotModal
        isOpen={triggerSnapshotModalOpen}
        onClose={() => setTriggerSnapshotModalOpen(false)}
        onCreated={() => loadData()}
        showToast={showToast}
      />

      <RestoreDrillModal
        isOpen={restoreDrillModalOpen}
        onClose={() => setRestoreDrillModalOpen(false)}
        onDrillComplete={() => loadData()}
        showToast={showToast}
      />
    </div>
  );
}

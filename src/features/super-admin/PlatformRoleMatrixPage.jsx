import React, { useState } from 'react';
import {
  WORKFORCE_METRICS,
  RBAC_PERMISSIONS_MATRIX,
  PLATFORM_PERSONNEL,
  ACCESS_AUDIT_LOGS
} from '../../demo-data/roleMatrixData';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Button } from '../../components/ui/Button';
import { Modal } from '../../components/ui/Modal';
import {
  ShieldCheck,
  Users,
  Code2,
  Bug,
  Server,
  Lock,
  LifeBuoy,
  Stethoscope,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Download,
  Key,
  Laptop,
  Activity,
  Terminal,
  ExternalLink,
  Shield,
  Layers,
  Sparkles,
  Info,
  Clock,
  Eye,
  Check,
  X,
  Edit3,
  Save,
  RotateCcw,
  Sliders,
  List,
  LayoutGrid

} from 'lucide-react';

export function PlatformRoleMatrixPage() {
  const { showToast } = useApp();

  // Active Tab
  const [activeTab, setActiveTab] = useState('matrix');


  // RBAC Matrix State with LocalStorage persistence
  const [matrixData, setMatrixData] = useState(() => {
    const saved = localStorage.getItem('clinicos_rbac_matrix');
    return saved ? JSON.parse(saved) : RBAC_PERMISSIONS_MATRIX;
  });

  // Access Security Audit Logs State with LocalStorage persistence
  const [auditLogs, setAuditLogs] = useState(() => {
    const saved = localStorage.getItem('clinicos_access_audit_logs');
    return saved ? JSON.parse(saved) : ACCESS_AUDIT_LOGS;
  });

  // Policy Editing State
  const [editingRole, setEditingRole] = useState(null);
  const [editFormData, setEditFormData] = useState(null);

  // Filter States for Personnel Directory
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedEnv, setSelectedEnv] = useState('All');
  const [podViewMode, setPodViewMode] = useState('table');
  const [personnelViewMode, setPersonnelViewMode] = useState('table');


  // Filter for RBAC Matrix
  const [matrixCategory, setMatrixCategory] = useState('All');

  // Drilldown Modals
  const [selectedPersonnel, setSelectedPersonnel] = useState(null);
  const [selectedRbacRole, setSelectedRbacRole] = useState(null);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [simulationRunning, setSimulationRunning] = useState(false);


  const departments = [
    'All',
    'Engineering / Devs',
    'QA & Testing',
    'DevOps & SRE',
    'Security & Compliance',
    'Customer Support',
    'Executive / Superadmin'
  ];


  const filteredPersonnel = PLATFORM_PERSONNEL.filter((person) => {
    const matchesSearch =
      person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      person.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDept = selectedDept === 'All' || person.department === selectedDept;
    const matchesEnv =
      selectedEnv === 'All' || person.environmentAccess.includes(selectedEnv);

    return matchesSearch && matchesDept && matchesEnv;
  });


  const filteredMatrix = matrixData.filter((row) => {
    if (matrixCategory === 'All') return true;
    return row.category === matrixCategory;
  });


  const handleOpenEditPolicy = (role) => {
    setEditingRole(role);
    setEditFormData({
      roleId: role.roleId,
      roleName: role.roleName,
      category: role.category,
      headcount: role.headcount,
      tenantOnboarding: role.tenantOnboarding,
      billingFinance: role.billingFinance,
      infrastructureLogs: role.infrastructureLogs,
      clinicalEhr: role.clinicalEhr,
      prescriptionSigning: role.prescriptionSigning,
      piiAccess: role.piiAccess,
      featureFlags: role.featureFlags,
      auditCompliance: role.auditCompliance,
      auditReason: 'Periodic privilege review & compliance recalibration'
    });
  };

  const handleSavePolicy = (e) => {
    e.preventDefault();
    if (!editingRole || !editFormData) return;

    const updatedMatrix = matrixData.map((row) =>
      row.roleId === editingRole.roleId ? { ...row, ...editFormData } : row
    );

    setMatrixData(updatedMatrix);
    localStorage.setItem('clinicos_rbac_matrix', JSON.stringify(updatedMatrix));


    if (selectedRbacRole && selectedRbacRole.roleId === editingRole.roleId) {
      setSelectedRbacRole({ ...selectedRbacRole, ...editFormData });
    }


    const newAuditLog = {
      id: `aud-sec-${Date.now().toString().slice(-4)}`,
      timestamp: 'Just now',
      actor: 'Vikramaditya Singhania (SaaS Superadmin)',
      action: `Updated RBAC Policy for "${editingRole.roleName}" [Reason: ${editFormData.auditReason}]`,
      result: 'Policy Enforced & Synced',
      ip: '10.0.1.1 (Admin Bastion VPN)',
      mfaVerified: true
    };

    const updatedLogs = [newAuditLog, ...auditLogs];
    setAuditLogs(updatedLogs);
    localStorage.setItem('clinicos_access_audit_logs', JSON.stringify(updatedLogs));

    showToast(`Access policy for "${editingRole.roleName}" updated & enforced!`, 'success');
    setEditingRole(null);
    setEditFormData(null);
  };

  const handleResetToDefaultPolicies = () => {
    setMatrixData(RBAC_PERMISSIONS_MATRIX);
    localStorage.removeItem('clinicos_rbac_matrix');
    showToast('RBAC policies restored to default Zero-Trust platform baseline.', 'info');
  };


  const handleRunSecurityAudit = () => {
    setSimulationRunning(true);
    setTimeout(() => {
      setSimulationRunning(false);
      showToast('Automated Zero-Trust RBAC Audit Completed: 48 Platform Personnel & 11 Roles Verified (0 Violations)', 'success');
    }, 1200);
  };


  const renderPermissionBadge = (val) => {
    switch (val) {
      case 'Full Access':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
            <Check className="w-3.5 h-3.5" /> Full

          </span>
        );
      case 'Read Only':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            <Eye className="w-3.5 h-3.5" /> Read Only

          </span>
        );
      case 'Tenant Scoped':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-purple-50 dark:bg-purple-950/60 text-purple-700 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
            <Layers className="w-3.5 h-3.5" /> Tenant Scoped

          </span>
        );
      case 'Verify Only':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-amber-50 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-800">
            <Shield className="w-3.5 h-3.5" /> Verify Only

          </span>
        );
      case 'Masked / Anonymized':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
            <Lock className="w-3.5 h-3.5" /> Masked PII

          </span>
        );
      case 'Audit Logged':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
            <Activity className="w-3.5 h-3.5" /> Audit Logged

          </span>
        );
      case 'No Access':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-medium text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <X className="w-3.5 h-3.5" /> None

          </span>
        );
    }
  };


  const engineeringPods = [
    {
      name: 'Clinical Core & EHR Pod',
      lead: 'Ananya Sengupta (Staff Architect)',
      size: '5 Developers, 2 SDETs',
      stack: ['React', 'TypeScript', 'Tailwind', 'FHIR/HL7', 'Node.js'],
      focus: 'Multi-clinic encounters, digital prescriptions, and instant QR verification registry.',
      status: 'On Track (Sprint 34)',
      health: '100% Green'
    },
    {
      name: 'Realtime Telehealth & Queue Pod',
      lead: 'Marcus Vance (Lead Backend)',
      size: '3 Developers, 1 QA',
      stack: ['WebSockets', 'WebRTC', 'Redis', 'Twilio API'],
      focus: 'Virtual waiting rooms, real-time token announcements, and SMS/WhatsApp webhook pipelines.',
      status: 'Active Rollout',
      health: '100% Green'
    },
    {
      name: 'SaaS Corporate Finance & Billing Pod',
      lead: 'Deepak Verma (Senior Fullstack)',
      size: '3 Developers, 1 QA',
      stack: ['Stripe', 'Razorpay', 'Ledger Engine', 'PostgreSQL'],
      focus: 'Automated subscription tier upgrades, multi-currency invoicing, and clinic payout settlements.',
      status: 'In Review',
      health: 'Optimal'
    },
    {
      name: 'QA Automation & High-Load Pod',
      lead: 'Sarah Jenkins (Lead QA Architect)',
      size: '4 SDETs, 2 Automation Engineers',
      stack: ['Playwright', 'Cypress', 'k6 Load Testing', 'Jest'],
      focus: 'Zero-regression suite covering 100 concurrent slot bookings and cross-portal role handoffs.',
      status: 'Continuous Execution',
      health: '100% Green'
    },
    {
      name: 'DevOps, Cloud & SRE Resilience Pod',
      lead: 'Alexey Voronov (Principal SRE)',
      size: '4 Cloud Engineers',
      stack: ['Kubernetes', 'AWS EKS', 'Terraform', 'Prometheus', 'Datadog'],
      focus: 'Multi-AZ database automated failover, zero-downtime canary updates, and 99.98% uptime SLA.',
      status: 'Nominal Operations',
      health: '99.98% Uptime'
    },
    {
      name: 'HIPAA, InfoSec & Compliance Pod',
      lead: 'Dr. Kabir Mehta (CISO & Data Privacy)',
      size: '3 Compliance Specialists',
      stack: ['SOC 2 Type II', 'HIPAA BAA', 'HashiCorp Vault', 'Hardware 2FA'],
      focus: 'Zero-trust role boundary enforcement, anonymized PII masking, and tamper-evident audit logs.',
      status: 'Certified SOC 2',
      health: 'Full Compliance'
    }
  ];

  return (
    <div className="space-y-6 pb-12">
      {/* Top Banner & Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="p-1.5 rounded-lg bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">
              Platform Governance · Workforce Analytics
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Workforce Headcount & Role Access Matrix
          </h1>
          <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-3xl">

            Live visibility into the 48 platform professionals powering ClinicOS multi-tenant infrastructure—including
            Developers, QA Automation Testers, DevOps SRE, HIPAA Compliance, and Operational Staff.
          </p>
        </div>

        {/* Right CTA Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={handleResetToDefaultPolicies}
            title="Reset modified policies to baseline"
            className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white"
          >
            <RotateCcw className="w-4 h-4 mr-1.5 text-slate-400" />

            Reset Policies
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setExportModalOpen(true)}
            className="text-xs font-semibold"
          >
            <Download className="w-4 h-4 mr-1.5 text-slate-500" />
            Export Spec (.JSON)

          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={handleRunSecurityAudit}
            disabled={simulationRunning}
            className="text-xs font-bold bg-blue-600 hover:bg-blue-700 shadow-sm"
          >
            {simulationRunning ? (
              <span className="flex items-center gap-2">

                <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Auditing Roles...
              </span>
            ) : (
              <span className="flex items-center gap-1.5">
                <Shield className="w-4 h-4" />
                Simulate Zero-Trust Audit
              </span>
            )}
          </Button>
        </div>
      </div>

      {/* Workforce Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {/* Total Workforce */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-blue-200 dark:border-blue-900/60 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Total Workforce</span>
            <span className="p-1.5 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
              <Users className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
            {WORKFORCE_METRICS.totalWorkforce}
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-xs font-semibold text-emerald-600 dark:text-emerald-400">

            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{WORKFORCE_METRICS.activeNow} Active Now</span>
          </div>
        </div>

        {/* Developers */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Developers</span>
            <span className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <Code2 className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-indigo-900 dark:text-indigo-300 tracking-tight">
            {WORKFORCE_METRICS.engineering}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">

            Frontend, Backend, Architecture
          </p>
        </div>

        {/* QA & Automation Testers */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">QA & Testers</span>
            <span className="p-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
              <Bug className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-amber-900 dark:text-amber-300 tracking-tight">
            {WORKFORCE_METRICS.qaTesting}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">

            SDET, Playwright, E2E Stress
          </p>
        </div>

        {/* DevOps & SRE */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">DevOps & SRE</span>
            <span className="p-1.5 rounded-lg bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400">
              <Server className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-purple-900 dark:text-purple-300 tracking-tight">
            {WORKFORCE_METRICS.devopsSre}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">

            K8s, Multi-AZ Cloud, CI/CD
          </p>
        </div>

        {/* Security & HIPAA */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Security & HIPAA</span>
            <span className="p-1.5 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400">
              <Lock className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-rose-900 dark:text-rose-300 tracking-tight">
            {WORKFORCE_METRICS.securityCompliance}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">

            SOC 2 Type II, PII Masking
          </p>
        </div>

        {/* Customer Support & Success */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-sm hover:border-blue-300 dark:hover:border-blue-700 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">Support Specialists</span>
            <span className="p-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <LifeBuoy className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl sm:text-3xl font-black text-emerald-900 dark:text-emerald-300 tracking-tight">
            {WORKFORCE_METRICS.supportSuccess}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 font-medium">

            Tier-1/2 Ops & Onboarding
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-slate-200 dark:border-slate-800">
        <nav className="flex space-x-6 overflow-x-auto">
          <button
            onClick={() => setActiveTab('matrix')}
            className={`py-3.5 px-1 border-b-2 font-bold text-sm flex items-center gap-2 cursor-pointer transition-colors shrink-0 ${
              activeTab === 'matrix'
                ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-4.5 h-4.5" />
            <span>RBAC Permissions Matrix (11 Roles)</span>
            <span className="ml-1 text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">

              Editable
            </span>
          </button>

          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3.5 px-1 border-b-2 font-bold text-sm flex items-center gap-2 cursor-pointer transition-colors shrink-0 ${
              activeTab === 'overview'
                ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Layers className="w-4.5 h-4.5" />

            <span>Workforce Pods & Team Structure</span>
          </button>

          <button
            onClick={() => setActiveTab('personnel')}
            className={`py-3.5 px-1 border-b-2 font-bold text-sm flex items-center gap-2 cursor-pointer transition-colors shrink-0 ${
              activeTab === 'personnel'
                ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Users className="w-4.5 h-4.5" />
            <span>Personnel Directory ({filteredPersonnel.length})</span>

          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`py-3.5 px-1 border-b-2 font-bold text-sm flex items-center gap-2 cursor-pointer transition-colors shrink-0 ${
              activeTab === 'audit'
                ? 'border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400'
                : 'border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Terminal className="w-4.5 h-4.5" />
            <span>Security Audit Logs ({auditLogs.length})</span>

          </button>
        </nav>
      </div>

      {/* TAB 1: WORKFORCE OVERVIEW & ENGINEERING PODS */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Workforce Distribution Progress Card */}
          <Card className="border-slate-200 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
            <div className="p-5 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                    Platform Workforce Distribution by Discipline
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">

                    48 Total Personnel distributed across Engineering, Quality Engineering, SRE, and Clinical Operations.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="success">SOC 2 Type II</Badge>

                  <Badge variant="purple">Zero-Trust Network Access</Badge>
                </div>
              </div>

              {/* Progress Distribution Bar */}
              <div className="h-4 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden flex shadow-inner">

                <div style={{ width: '29.2%' }} className="bg-indigo-600" title="Developers (14)" />
                <div style={{ width: '29.2%' }} className="bg-emerald-600" title="Clinical Operations (14)" />
                <div style={{ width: '14.6%' }} className="bg-blue-500" title="Customer Support (7)" />
                <div style={{ width: '12.5%' }} className="bg-amber-500" title="QA & Testers (6)" />
                <div style={{ width: '8.3%' }} className="bg-purple-600" title="DevOps & SRE (4)" />
                <div style={{ width: '6.2%' }} className="bg-rose-500" title="Security & HIPAA (3)" />
              </div>

              {/* Legend */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 mt-4 text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-indigo-600 shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300">14 Developers (29.2%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-600 shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300">14 Clinical Ops (29.2%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-blue-500 shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300">7 Support Specialists (14.6%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-amber-500 shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300">6 QA & Testers (12.5%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-purple-600 shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300">4 DevOps & SRE (8.3%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500 shrink-0" />
                  <span className="text-slate-700 dark:text-slate-300">3 Security & HIPAA (6.2%)</span>

                </div>
              </div>
            </div>
          </Card>

          {/* Active Engineering & Platform Pods */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3.5">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  Active Platform Engineering & Delivery Pods
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
                  Cross-functional squads owning distinct healthcare domain micro-frontends and platform resilience.
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700">
                  <button
                    type="button"
                    onClick={() => setPodViewMode('table')}
                    className={`p-1 px-2.5 rounded text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                      podViewMode === 'table'
                        ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                        : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                    }`}
                  >
                    <List className="w-3.5 h-3.5" />
                    <span>Table</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setPodViewMode('cards')}
                    className={`p-1 px-2.5 rounded text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                      podViewMode === 'cards'
                        ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                        : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                    }`}
                  >
                    <LayoutGrid className="w-3.5 h-3.5" />
                    <span>Cards</span>
                  </button>
                </div>
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-3 py-1 rounded-full border border-blue-200 dark:border-blue-800 hidden sm:inline">
                  6 Autonomous Pods
                </span>
              </div>
            </div>

            {podViewMode === 'table' ? (
              <Card className="overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left border-collapse">
                    <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-800">
                      <tr>
                        <th className="px-3 py-3 text-center w-12 font-semibold">#</th>
                        <th className="px-4 py-3">Engineering Squad</th>
                        <th className="px-4 py-3">Health & SLA</th>
                        <th className="px-4 py-3">Pod Lead & Staffing</th>
                        <th className="px-4 py-3">Healthcare Domain Focus</th>
                        <th className="px-4 py-3">Technology Stack</th>
                        <th className="px-4 py-3">Sprint Status</th>
                        <th className="px-4 py-3 text-right">Governance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {engineeringPods.map((pod, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                          <td className="px-3 py-3 text-center font-mono font-medium text-slate-400 dark:text-slate-500 text-xs">{idx + 1}</td>
                          <td className="px-4 py-3 whitespace-nowrap font-bold text-slate-900 dark:text-white">
                            {pod.name}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                              {pod.health}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="font-bold text-slate-800 dark:text-slate-200">{pod.lead}</div>
                            <div className="text-[11px] text-slate-500 dark:text-slate-400">{pod.size}</div>
                          </td>
                          <td className="px-4 py-3 max-w-xs">
                            <p className="text-slate-600 dark:text-slate-300 text-xs leading-relaxed truncate">
                              {pod.focus}
                            </p>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex flex-wrap gap-1 max-w-xs">
                              {pod.stack.map((tech, tIdx) => (
                                <span
                                  key={tIdx}
                                  className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                                >
                                  {tech}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap font-semibold text-slate-700 dark:text-slate-300">
                            {pod.status}
                          </td>
                          <td className="px-4 py-3 text-right whitespace-nowrap">
                            <span className="inline-flex items-center gap-1 text-xs text-blue-600 dark:text-blue-400 font-bold">
                              <CheckCircle2 className="w-3.5 h-3.5" /> Enforced RBAC
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {engineeringPods.map((pod, idx) => (
                  <div
                    key={idx}
                    className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <h4 className="font-bold text-slate-900 dark:text-white text-base">{pod.name}</h4>
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 shrink-0">
                          {pod.health}
                        </span>
                      </div>

                      <div className="text-xs text-slate-600 dark:text-slate-400 mb-3 font-medium">
                        <span className="text-slate-400 dark:text-slate-500 block text-xs">Pod Lead & Staffing:</span>
                        <span className="font-bold text-slate-800 dark:text-slate-200">{pod.lead}</span> · {pod.size}
                      </div>

                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mb-4 leading-relaxed bg-slate-50 dark:bg-slate-800/60 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                        {pod.focus}
                      </p>
                    </div>

                    <div>
                      {/* Tech Stack Chips */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {pod.stack.map((tech, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 rounded-md text-xs font-mono bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                        <span>Status: <strong className="text-slate-700 dark:text-slate-200">{pod.status}</strong></span>
                        <span className="flex items-center gap-1 text-blue-600 dark:text-blue-400 font-bold">
                          <CheckCircle2 className="w-4 h-4" /> Enforced RBAC
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>
        </div>
      )}

      {/* TAB 2: RBAC PERMISSIONS MATRIX */}
      {activeTab === 'matrix' && (
        <div className="space-y-4">
          {/* Filter Bar with Policy Edit Tip */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex items-center gap-2.5">
              <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Filter by Category:
              </span>
              <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">

                {['All', 'Platform Staff', 'Clinic Tenant Staff', 'End User'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setMatrixCategory(cat)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      matrixCategory === cat
                        ? 'bg-white dark:bg-slate-950 text-blue-600 dark:text-blue-400 shadow-xs'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'

                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500 dark:text-slate-400 hidden md:inline">
                Click <strong>Edit Policy</strong> on any row to configure access tiers.
              </span>
              <div className="text-xs text-slate-600 dark:text-slate-300 bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 font-semibold">
                Showing <strong className="text-slate-900 dark:text-white">{filteredMatrix.length}</strong> of 11 Roles

              </div>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                    <th className="py-3.5 px-3 text-center w-12">#</th>
                    <th className="py-3.5 px-4">Role Title & Category</th>
                    <th className="py-3.5 px-3">Headcount</th>
                    <th className="py-3.5 px-3">Onboarding</th>
                    <th className="py-3.5 px-3">Billing</th>
                    <th className="py-3.5 px-3">Infra Logs</th>
                    <th className="py-3.5 px-3">Clinical EHR</th>
                    <th className="py-3.5 px-3">Prescription Rx</th>
                    <th className="py-3.5 px-3">PII Access</th>
                    <th className="py-3.5 px-3">Feature Flags</th>
                    <th className="py-3.5 px-3">Audit Logs</th>
                    <th className="py-3.5 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filteredMatrix.map((row, idx) => (
                    <tr
                      key={row.roleId}
                      className="hover:bg-blue-50/40 dark:hover:bg-slate-800/40 transition-colors group cursor-pointer"
                      onClick={() => handleOpenEditPolicy(row)}
                    >
                      <td className="py-3.5 px-3 text-center font-mono font-medium text-slate-400 dark:text-slate-500 text-xs">{idx + 1}</td>
                      {/* Role Name */}
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-base">
                          {row.roleName}
                        </div>
                        <span className="text-xs font-semibold text-slate-400 dark:text-slate-500 mt-0.5 block">

                          {row.category}
                        </span>
                      </td>

                      {/* Headcount */}
                      <td className="py-3.5 px-3">
                        <span className="font-mono font-bold text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md text-xs border border-slate-200 dark:border-slate-700">

                          {row.headcount}
                        </span>
                      </td>

                      {/* Permissions */}
                      <td className="py-3.5 px-3">{renderPermissionBadge(row.tenantOnboarding)}</td>
                      <td className="py-3.5 px-3">{renderPermissionBadge(row.billingFinance)}</td>
                      <td className="py-3.5 px-3">{renderPermissionBadge(row.infrastructureLogs)}</td>
                      <td className="py-3.5 px-3">{renderPermissionBadge(row.clinicalEhr)}</td>
                      <td className="py-3.5 px-3">{renderPermissionBadge(row.prescriptionSigning)}</td>
                      <td className="py-3.5 px-3">{renderPermissionBadge(row.piiAccess)}</td>
                      <td className="py-3.5 px-3">{renderPermissionBadge(row.featureFlags)}</td>
                      <td className="py-3.5 px-3">{renderPermissionBadge(row.auditCompliance)}</td>

                      {/* Actions */}
                      <td className="py-3.5 px-3 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEditPolicy(row)}
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl cursor-pointer transition-colors shadow-xs"
                            title="Edit this role's RBAC access policy"
                          >
                            <Edit3 className="w-3.5 h-3.5" />

                            <span>Edit Policy</span>
                          </button>

                          <button
                            onClick={() => setSelectedRbacRole(row)}
                            className="px-2.5 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl cursor-pointer transition-colors"

                            title="Inspect complete role scope"
                          >
                            Inspect
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: PLATFORM PERSONNEL DIRECTORY */}
      {activeTab === 'personnel' && (
        <div className="space-y-4">
          {/* Search & Filter Toolbar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />

              <input
                type="text"
                placeholder="Search staff by name, title, or work email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-slate-400"
              />
            </div>

            <div className="flex items-center gap-2 flex-wrap">

              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                aria-label="Filter by department"
                className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm font-semibold py-2.5 px-3 rounded-xl focus:outline-none"

              >
                {departments.map((d) => (
                  <option key={d} value={d}>
                    {d === 'All' ? 'All Departments' : d}
                  </option>
                ))}
              </select>

              <select
                value={selectedEnv}
                onChange={(e) => setSelectedEnv(e.target.value)}
                aria-label="Filter by environment access"
                className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm font-semibold py-2.5 px-3 rounded-xl focus:outline-none"

              >
                <option value="All">All Environments</option>
                <option value="Production">Production Access</option>
                <option value="Staging">Staging Access</option>
                <option value="QA Sandbox">QA Sandbox</option>
              </select>

              <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => setPersonnelViewMode('table')}
                  className={`p-1 px-2.5 rounded text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                    personnelViewMode === 'table'
                      ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                  }`}
                >
                  <List className="w-3.5 h-3.5" />
                  <span>Table</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPersonnelViewMode('cards')}
                  className={`p-1 px-2.5 rounded text-xs font-bold transition-all flex items-center gap-1 cursor-pointer ${
                    personnelViewMode === 'cards'
                      ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                      : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
                  }`}
                >
                  <LayoutGrid className="w-3.5 h-3.5" />
                  <span>Cards</span>
                </button>
              </div>
            </div>
          </div>

          {personnelViewMode === 'table' ? (
            <Card className="overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-800">
                    <tr>
                      <th className="px-3 py-3 text-center w-12 font-semibold">#</th>
                      <th className="px-4 py-3">Personnel Member</th>
                      <th className="px-4 py-3">Role / Title</th>
                      <th className="px-4 py-3">Department</th>
                      <th className="px-4 py-3">Clearance</th>
                      <th className="px-4 py-3">MFA Status</th>
                      <th className="px-4 py-3">Environments Authorized</th>
                      <th className="px-4 py-3">Joined Date</th>
                      <th className="px-4 py-3 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {filteredPersonnel.length === 0 ? (
                      <tr>
                        <td colSpan={9} className="px-4 py-12 text-center text-slate-400 dark:text-slate-500">
                          No personnel match your search filters.
                        </td>
                      </tr>
                    ) : (
                      filteredPersonnel.map((person, idx) => (
                        <tr
                          key={person.id}
                          onClick={() => setSelectedPersonnel(person)}
                          className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors cursor-pointer"
                        >
                          <td className="px-3 py-3 text-center font-mono font-medium text-slate-400 dark:text-slate-500 text-xs">{idx + 1}</td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <div className="flex items-center gap-3">
                              <img
                                src={person.avatar}
                                alt={person.name}
                                className="w-8 h-8 rounded-full object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                              />
                              <div>
                                <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                                  <span>{person.name}</span>
                                  <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" title={person.activeSession} />
                                </div>
                                <div className="text-[11px] text-slate-400 dark:text-slate-500 font-mono">
                                  {person.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap font-semibold text-blue-700 dark:text-blue-400">
                            {person.title}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-slate-700 dark:text-slate-300 font-medium">
                            {person.department}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className="font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded text-[11px] border border-indigo-200 dark:border-indigo-800">
                              {person.securityClearance}
                            </span>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap">
                            <span className="font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded text-[11px] border border-emerald-200 dark:border-emerald-800 inline-flex items-center gap-1">
                              <Key className="w-3 h-3" /> {person.mfaStatus}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex flex-wrap gap-1 max-w-xs">
                              {person.environmentAccess.map((env, eIdx) => (
                                <span
                                  key={eIdx}
                                  className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                                    env === 'Production'
                                      ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
                                      : env === 'Staging'
                                      ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                                  }`}
                                >
                                  {env}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                            {person.joinedDate}
                          </td>
                          <td className="px-4 py-3 text-right whitespace-nowrap">
                            <Button
                              variant="outline"
                              size="sm"
                              className="text-xs h-7 px-2.5 font-medium"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedPersonnel(person);
                              }}
                            >
                              RBAC Spec &rarr;
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
            /* Personnel Cards Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredPersonnel.map((person) => (
                <div
                  key={person.id}
                  onClick={() => setSelectedPersonnel(person)}
                  className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-5 shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all cursor-pointer flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start gap-4 mb-3.5">
                      <img
                        src={person.avatar}
                        alt={person.name}
                        className="w-13 h-13 rounded-2xl object-cover border border-slate-200 dark:border-slate-700 shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <h4 className="font-bold text-slate-900 dark:text-white text-base truncate">{person.name}</h4>
                          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" title={person.activeSession} />
                        </div>
                        <div className="text-xs font-bold text-blue-700 dark:text-blue-400 truncate mt-0.5">{person.title}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">{person.email}</div>
                      </div>
                    </div>

                    <div className="space-y-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 dark:text-slate-400">Department:</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{person.department}</span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 dark:text-slate-400">Clearance:</span>
                        <span className="font-semibold text-indigo-700 dark:text-indigo-300 bg-indigo-50 dark:bg-indigo-950/60 px-2 py-0.5 rounded text-xs border border-indigo-200 dark:border-indigo-800">
                          {person.securityClearance}
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 dark:text-slate-400">MFA Type:</span>
                        <span className="font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded text-xs border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
                          <Key className="w-3.5 h-3.5" /> {person.mfaStatus}
                        </span>
                      </div>

                      <div className="pt-2">
                        <span className="text-xs text-slate-400 dark:text-slate-500 block mb-1.5 font-medium">Environments Authorized:</span>
                        <div className="flex flex-wrap gap-1.5">
                          {person.environmentAccess.map((env, eIdx) => (
                            <span
                              key={eIdx}
                              className={`px-2 py-0.5 rounded text-xs font-mono font-bold ${
                                env === 'Production'
                                  ? 'bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800'
                                  : env === 'Staging'
                                  ? 'bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                                  : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                              }`}
                            >
                              {env}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400 dark:text-slate-500">
                    <span>Joined: {person.joinedDate}</span>
                    <span className="text-blue-600 dark:text-blue-400 font-bold hover:underline">View RBAC Spec &rarr;</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {filteredPersonnel.length === 0 && (
            <div className="text-center py-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
              <Users className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">No personnel match your search filters</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Try clearing the search query or switching departments.</p>

              <Button
                variant="outline"
                size="sm"
                className="mt-3 text-xs"
                onClick={() => {
                  setSearchQuery('');
                  setSelectedDept('All');
                  setSelectedEnv('All');
                }}
              >
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      )}

      {/* TAB 4: ACCESS SECURITY AUDIT TRAIL */}
      {activeTab === 'audit' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <div>
              <h4 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">Zero-Trust Access & Privilege Audit Stream</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Immutable record of access tokens, canary flag triggers, and administrative actions.
              </p>
            </div>
            <span className="flex items-center gap-2 text-xs font-bold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1.5 rounded-full border border-emerald-200 dark:border-emerald-800">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />

              Live Stream Active ({auditLogs.length} Records)
            </span>
          </div>

          <Card className="overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="px-3 py-3 text-center w-12 font-semibold">#</th>
                    <th className="px-4 py-3">Timestamp</th>
                    <th className="px-4 py-3">Actor / Operator</th>
                    <th className="px-4 py-3">Security Action Executed</th>
                    <th className="px-4 py-3">Source Node / Bastion IP</th>
                    <th className="px-4 py-3">MFA Verification</th>
                    <th className="px-4 py-3 text-right">Security Result</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {auditLogs.map((log, idx) => (
                    <tr key={log.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="px-3 py-3 text-center font-mono font-medium text-slate-400 dark:text-slate-500 text-xs">{idx + 1}</td>
                      <td className="px-4 py-3 whitespace-nowrap font-mono text-[11px] text-slate-500 dark:text-slate-400">
                        {log.timestamp}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                          <Terminal className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                          <span>{log.actor}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-mono text-xs text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700">
                          {log.action}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap font-mono text-slate-600 dark:text-slate-300 text-[11px]">
                        {log.ip}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold text-[11px]">
                          <CheckCircle2 className="w-3.5 h-3.5" /> Hardware MFA Verified
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                          {log.result}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

        </div>
      )}

      {/* DRILLDOWN MODAL: PERSONNEL DETAIL */}
      {selectedPersonnel && (
        <Modal
          isOpen={!!selectedPersonnel}
          onClose={() => setSelectedPersonnel(null)}
          title="Personnel Security & RBAC Profile"
          size="lg"
        >
          <div className="space-y-4 text-sm">
            <div className="flex items-center gap-4 p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700">
              <img
                src={selectedPersonnel.avatar}
                alt={selectedPersonnel.name}
                className="w-16 h-16 rounded-2xl object-cover border border-slate-300 dark:border-slate-700 shrink-0"
              />
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-bold text-slate-900 dark:text-white">{selectedPersonnel.name}</h3>
                <div className="text-xs font-bold text-blue-700 dark:text-blue-400">{selectedPersonnel.title}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">{selectedPersonnel.email}</div>

              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="text-slate-400 dark:text-slate-500 block mb-0.5 uppercase font-bold">Department</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">{selectedPersonnel.department}</span>
              </div>
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="text-slate-400 dark:text-slate-500 block mb-0.5 uppercase font-bold">Clearance Tier</span>
                <span className="font-bold text-indigo-700 dark:text-indigo-400 text-sm">{selectedPersonnel.securityClearance}</span>
              </div>
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="text-slate-400 dark:text-slate-500 block mb-0.5 uppercase font-bold">MFA Enforcement</span>
                <span className="font-bold text-emerald-700 dark:text-emerald-400 text-sm">{selectedPersonnel.mfaStatus}</span>
              </div>
              <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700">
                <span className="text-slate-400 dark:text-slate-500 block mb-0.5 uppercase font-bold">Access Scope</span>
                <span className="font-bold text-slate-800 dark:text-slate-200 text-sm">{selectedPersonnel.accessScope}</span>
              </div>
            </div>

            <div className="p-3.5 bg-blue-50/60 dark:bg-blue-950/40 rounded-xl border border-blue-200 dark:border-blue-900 text-xs">
              <span className="font-bold text-blue-900 dark:text-blue-300 block mb-1.5 uppercase tracking-wider">Environment Entitlements:</span>
              <div className="flex flex-wrap gap-2">
                {selectedPersonnel.environmentAccess.map((env, i) => (
                  <span
                    key={i}
                    className="px-2.5 py-1 rounded-md font-mono font-bold text-xs bg-white dark:bg-slate-900 border border-blue-300 dark:border-blue-800 text-blue-800 dark:text-blue-300 shadow-xs"

                  >
                    {env} Authorized
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-500 dark:text-slate-400">Security Hash: <strong className="font-mono text-slate-700 dark:text-slate-300">sha256:4f8e...902a</strong></span>

              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  showToast(`Access token re-certified for ${selectedPersonnel.name}`, 'info');
                  setSelectedPersonnel(null);
                }}
              >
                Re-validate Credentials
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* DRILLDOWN MODAL: RBAC ROLE INSPECT */}
      {selectedRbacRole && !editingRole && (
        <Modal
          isOpen={!!selectedRbacRole}
          onClose={() => setSelectedRbacRole(null)}
          title={`Role Definition: ${selectedRbacRole.roleName}`}
          size="md"
        >
          <div className="space-y-4 text-sm">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="text-slate-500 dark:text-slate-400 block mb-1 font-bold uppercase text-xs">Role Category</span>
              <span className="font-bold text-slate-900 dark:text-white text-base">{selectedRbacRole.category}</span>
              <span className="text-slate-600 dark:text-slate-300 block mt-1 text-xs">

                Currently assigned to <strong>{selectedRbacRole.headcount}</strong> active users on this platform.
              </span>
            </div>

            <div className="space-y-2">
              <h5 className="font-bold text-slate-800 dark:text-slate-200 text-sm">Current Permission Matrix Scope</h5>
              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-300 text-xs">Onboarding:</span>
                  {renderPermissionBadge(selectedRbacRole.tenantOnboarding)}
                </div>
                <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-300 text-xs">Billing:</span>
                  {renderPermissionBadge(selectedRbacRole.billingFinance)}
                </div>
                <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-300 text-xs">Infra Logs:</span>
                  {renderPermissionBadge(selectedRbacRole.infrastructureLogs)}
                </div>
                <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-300 text-xs">Clinical EHR:</span>
                  {renderPermissionBadge(selectedRbacRole.clinicalEhr)}
                </div>
                <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-300 text-xs">Rx Signing:</span>
                  {renderPermissionBadge(selectedRbacRole.prescriptionSigning)}
                </div>
                <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-300 text-xs">PII Access:</span>
                  {renderPermissionBadge(selectedRbacRole.piiAccess)}
                </div>
                <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-300 text-xs">Feature Flags:</span>
                  {renderPermissionBadge(selectedRbacRole.featureFlags)}
                </div>
                <div className="p-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-300 text-xs">Audit Logs:</span>

                  {renderPermissionBadge(selectedRbacRole.auditCompliance)}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">

              <Button
                variant="outline"
                size="sm"
                onClick={() => setSelectedRbacRole(null)}
              >
                Close
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  const roleToEdit = selectedRbacRole;
                  setSelectedRbacRole(null);
                  handleOpenEditPolicy(roleToEdit);
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold"
              >
                <Edit3 className="w-4 h-4 mr-1.5" />

                Edit This Policy
              </Button>
            </div>
          </div>
        </Modal>
      )}

      {/* EDIT POLICY MODAL */}
      {editingRole && editFormData && (
        <Modal
          isOpen={!!editingRole}
          onClose={() => {
            setEditingRole(null);
            setEditFormData(null);
          }}
          title={`Edit Access Policy: ${editingRole.roleName}`}
          size="lg"
        >
          <form onSubmit={handleSavePolicy} className="space-y-4 text-sm">
            {/* Role Header Info */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-slate-400 dark:text-slate-500 block text-xs uppercase font-bold">Target Role</span>
                <span className="text-base font-bold text-slate-900 dark:text-white">{editingRole.roleName}</span>
                <span className="text-slate-500 dark:text-slate-400 block text-xs mt-0.5">
                  ID: <code className="text-blue-700 dark:text-blue-400 font-mono font-bold">{editingRole.roleId}</code> · {editingRole.category}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">Assigned Headcount:</label>

                <input
                  type="number"
                  min="0"
                  value={editFormData.headcount}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, headcount: parseInt(e.target.value) || 0 })
                  }
                  className="w-16 px-2 py-0.5 bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded text-xs font-bold text-slate-800 dark:text-white focus:outline-none"

                />
              </div>
            </div>

            {/* 8 Permission Dimensions Form Controls */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-bold text-slate-900 dark:text-white text-sm">Configure System Entitlements (8 Dimensions)</h5>
                <span className="text-xs text-slate-400 dark:text-slate-500">Select privilege tier for each healthcare domain</span>

              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* 1. Tenant Onboarding */}
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5 shadow-xs">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-700 dark:text-slate-300 text-xs">Multi-Tenant Onboarding</label>

                    {renderPermissionBadge(editFormData.tenantOnboarding)}
                  </div>
                  <select
                    value={editFormData.tenantOnboarding}
                    onChange={(e) => setEditFormData({ ...editFormData, tenantOnboarding: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"

                  >
                    <option value="Full Access">Full Access (Create / Provision)</option>
                    <option value="Read Only">Read Only (Inspect Tenant Metadata)</option>
                    <option value="Tenant Scoped">Tenant Scoped (Own Clinic Only)</option>
                    <option value="No Access">No Access</option>
                  </select>
                </div>

                {/* 2. Billing & Finance */}
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5 shadow-xs">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-700 dark:text-slate-300 text-xs">Subscription Billing & Finance</label>

                    {renderPermissionBadge(editFormData.billingFinance)}
                  </div>
                  <select
                    value={editFormData.billingFinance}
                    onChange={(e) => setEditFormData({ ...editFormData, billingFinance: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"

                  >
                    <option value="Full Access">Full Access (Invoices, Gateways, Payouts)</option>
                    <option value="Read Only">Read Only (View Statements)</option>
                    <option value="Tenant Scoped">Tenant Scoped (Clinic Invoices Only)</option>
                    <option value="No Access">No Access</option>
                  </select>
                </div>

                {/* 3. Infrastructure Logs */}
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5 shadow-xs">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-700 dark:text-slate-300 text-xs">Cloud Infrastructure & Logs</label>

                    {renderPermissionBadge(editFormData.infrastructureLogs)}
                  </div>
                  <select
                    value={editFormData.infrastructureLogs}
                    onChange={(e) => setEditFormData({ ...editFormData, infrastructureLogs: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"

                  >
                    <option value="Full Access">Full Access (K8s, Multi-AZ, SSH)</option>
                    <option value="Read Only">Read Only (Grafana, CloudWatch)</option>
                    <option value="No Access">No Access</option>
                  </select>
                </div>

                {/* 4. Clinical EHR Data */}
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5 shadow-xs">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-700 dark:text-slate-300 text-xs">Clinical EHR & Encounters</label>

                    {renderPermissionBadge(editFormData.clinicalEhr)}
                  </div>
                  <select
                    value={editFormData.clinicalEhr}
                    onChange={(e) => setEditFormData({ ...editFormData, clinicalEhr: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"

                  >
                    <option value="Full Access">Full Access (Create / Edit Encounters)</option>
                    <option value="Tenant Scoped">Tenant Scoped (Authorized Clinic)</option>
                    <option value="Read Only">Read Only (Review Charts)</option>
                    <option value="Audit Logged">Audit Logged (Supervised Inspection)</option>
                    <option value="No Access">No Access</option>
                  </select>
                </div>

                {/* 5. Prescription Rx Signing */}
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5 shadow-xs">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-700 dark:text-slate-300 text-xs">Digital Rx Signing & Dispense</label>

                    {renderPermissionBadge(editFormData.prescriptionSigning)}
                  </div>
                  <select
                    value={editFormData.prescriptionSigning}
                    onChange={(e) => setEditFormData({ ...editFormData, prescriptionSigning: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"

                  >
                    <option value="Full Access">Full Access (Doctor Digital Signature)</option>
                    <option value="Verify Only">Verify Only (QR Registry Verification)</option>
                    <option value="Tenant Scoped">Tenant Scoped (Pharmacy / Dispense)</option>
                    <option value="No Access">No Access</option>
                  </select>
                </div>

                {/* 6. PII Access */}
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5 shadow-xs">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-700 dark:text-slate-300 text-xs">PII & Patient Health Privacy</label>

                    {renderPermissionBadge(editFormData.piiAccess)}
                  </div>
                  <select
                    value={editFormData.piiAccess}
                    onChange={(e) => setEditFormData({ ...editFormData, piiAccess: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"

                  >
                    <option value="Full Access">Full Access (Unmasked Clinical Care)</option>
                    <option value="Masked / Anonymized">Masked / Anonymized (HIPAA Privacy)</option>
                    <option value="Tenant Scoped">Tenant Scoped (Clinic Care Team)</option>
                    <option value="No Access">No Access</option>
                  </select>
                </div>

                {/* 7. Feature Flags */}
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5 shadow-xs">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-700 dark:text-slate-300 text-xs">Canary Feature Flags & CI/CD</label>

                    {renderPermissionBadge(editFormData.featureFlags)}
                  </div>
                  <select
                    value={editFormData.featureFlags}
                    onChange={(e) => setEditFormData({ ...editFormData, featureFlags: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"

                  >
                    <option value="Full Access">Full Access (Toggle & Deploy Flags)</option>
                    <option value="Read Only">Read Only (Inspect Active Configs)</option>
                    <option value="No Access">No Access</option>
                  </select>
                </div>

                {/* 8. Audit Compliance */}
                <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5 shadow-xs">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-700 dark:text-slate-300 text-xs">Compliance Audit Export</label>

                    {renderPermissionBadge(editFormData.auditCompliance)}
                  </div>
                  <select
                    value={editFormData.auditCompliance}
                    onChange={(e) => setEditFormData({ ...editFormData, auditCompliance: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-medium text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-blue-500"

                  >
                    <option value="Full Access">Full Access (Export Immutable Logs)</option>
                    <option value="Audit Logged">Audit Logged (Supervised Access)</option>
                    <option value="Read Only">Read Only (View Audit Stream)</option>
                    <option value="No Access">No Access</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Audit Justification */}
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700 space-y-1.5">
              <label className="font-bold text-slate-700 dark:text-slate-300 text-xs block">

                Policy Modification Justification (Recorded in Tamper-Proof Audit Log)
              </label>
              <input
                type="text"
                value={editFormData.auditReason}
                onChange={(e) => setEditFormData({ ...editFormData, auditReason: e.target.value })}
                placeholder="e.g. Periodic privilege review, canary test approval, or emergency escalation"
                className="w-full px-3 py-2 bg-white dark:bg-slate-950 border border-slate-300 dark:border-slate-700 rounded-lg text-xs text-slate-800 dark:text-white focus:outline-none focus:ring-1 focus:ring-blue-500"

              />
            </div>

            {/* CTA Buttons */}
            <div className="pt-3 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span className="text-xs text-slate-400 dark:text-slate-500">

                Changes will take effect immediately across all active sessions.
              </span>
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setEditingRole(null);
                    setEditFormData(null);
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold"
                >
                  <Save className="w-4 h-4 mr-1.5" />

                  Save Policy Changes
                </Button>
              </div>
            </div>
          </form>
        </Modal>
      )}

      {/* EXPORT RBAC JSON SPEC MODAL */}
      {exportModalOpen && (
        <Modal
          isOpen={exportModalOpen}
          onClose={() => setExportModalOpen(false)}
          title="Export RBAC Platform Specification"
          size="lg"
        >
          <div className="space-y-4 text-sm">
            <p className="text-slate-600 dark:text-slate-300">
              The following JSON specification represents the active role permissions and platform headcount matrix.
            </p>
            <pre className="p-4 bg-slate-950 text-emerald-400 font-mono text-xs rounded-2xl overflow-x-auto max-h-80 border border-slate-800">

              {JSON.stringify(
                {
                  platform: 'ClinicOS Health Cloud',
                  version: '2026.4.2-LTS',
                  workforceSummary: WORKFORCE_METRICS,
                  rolesMatrix: matrixData
                },
                null,
                2
              )}
            </pre>
            <div className="pt-2 flex justify-end gap-2">
              <Button
                variant="primary"
                size="sm"
                onClick={() => {
                  showToast('RBAC JSON copied to clipboard!', 'success');
                  setExportModalOpen(false);
                }}
              >
                Copy to Clipboard
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

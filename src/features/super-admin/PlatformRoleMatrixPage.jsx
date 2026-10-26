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
  Sliders
} from 'lucide-react';

export function PlatformRoleMatrixPage() {
  const { showToast } = useApp();

  // Active Tab
  const [activeTab, setActiveTab] = useState('matrix'); // Default to matrix as user is focused on policies

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

  // Filter for RBAC Matrix
  const [matrixCategory, setMatrixCategory] = useState('All');

  // Drilldown Modals
  const [selectedPersonnel, setSelectedPersonnel] = useState(null);
  const [selectedRbacRole, setSelectedRbacRole] = useState(null);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [simulationRunning, setSimulationRunning] = useState(false);

  // Departments list for filter
  const departments = [
    'All',
    'Engineering / Devs',
    'QA & Testing',
    'DevOps & SRE',
    'Security & Compliance',
    'Customer Support',
    'Executive / Superadmin'
  ];

  // Filtered Personnel
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

  // Filtered RBAC Rows
  const filteredMatrix = matrixData.filter((row) => {
    if (matrixCategory === 'All') return true;
    return row.category === matrixCategory;
  });

  // Handlers for Policy Editing
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

    // Also update selectedRbacRole if inspected
    if (selectedRbacRole && selectedRbacRole.roleId === editingRole.roleId) {
      setSelectedRbacRole({ ...selectedRbacRole, ...editFormData });
    }

    // Append to live audit log
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

  // Simulation handler
  const handleRunSecurityAudit = () => {
    setSimulationRunning(true);
    setTimeout(() => {
      setSimulationRunning(false);
      showToast('Automated Zero-Trust RBAC Audit Completed: 48 Platform Personnel & 11 Roles Verified (0 Violations)', 'success');
    }, 1200);
  };

  // Helper for permission badges in the matrix
  const renderPermissionBadge = (val) => {
    switch (val) {
      case 'Full Access':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            <Check className="w-3 h-3" /> Full
          </span>
        );
      case 'Read Only':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-blue-50 text-blue-700 border border-blue-200">
            <Eye className="w-3 h-3" /> Read Only
          </span>
        );
      case 'Tenant Scoped':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-semibold bg-purple-50 text-purple-700 border border-purple-200">
            <Layers className="w-3 h-3" /> Tenant Scoped
          </span>
        );
      case 'Verify Only':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-amber-50 text-amber-800 border border-amber-200">
            <Shield className="w-3 h-3" /> Verify Only
          </span>
        );
      case 'Masked / Anonymized':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-rose-50 text-rose-700 border border-rose-200">
            <Lock className="w-3 h-3" /> Masked PII
          </span>
        );
      case 'Audit Logged':
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] font-medium bg-indigo-50 text-indigo-700 border border-indigo-200">
            <Activity className="w-3 h-3" /> Audit Logged
          </span>
        );
      case 'No Access':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[11px] text-slate-400 bg-slate-50 border border-slate-200">
            <X className="w-3 h-3" /> None
          </span>
        );
    }
  };

  // Pod definitions for Tab 1
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
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-blue-100 text-blue-700">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
              Platform Governance · Workforce Analytics
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Workforce Headcount & Role Access Matrix
          </h1>
          <p className="text-sm text-slate-600 mt-1 max-w-3xl">
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
            className="text-xs font-semibold text-slate-600 hover:text-slate-900"
          >
            <RotateCcw className="w-3.5 h-3.5 mr-1 text-slate-400" />
            Reset Policies
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setExportModalOpen(true)}
            className="text-xs font-semibold"
          >
            <Download className="w-4 h-4 mr-1.5 text-slate-500" />
            Export RBAC Spec (JSON)
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={handleRunSecurityAudit}
            disabled={simulationRunning}
            className="text-xs font-bold bg-blue-600 hover:bg-blue-700 shadow-sm"
          >
            {simulationRunning ? (
              <span className="flex items-center gap-1.5">
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
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        {/* Total Workforce */}
        <div className="bg-white rounded-2xl p-4 border border-blue-200 shadow-2xs relative overflow-hidden">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500">Total Workforce</span>
            <span className="p-1.5 rounded-lg bg-blue-50 text-blue-600">
              <Users className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-black text-slate-900 tracking-tight">
            {WORKFORCE_METRICS.totalWorkforce}
          </div>
          <div className="flex items-center gap-1.5 mt-2 text-[11px] font-semibold text-emerald-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{WORKFORCE_METRICS.activeNow} Active Now</span>
          </div>
        </div>

        {/* Developers */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs hover:border-blue-300 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500">Developers</span>
            <span className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
              <Code2 className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-black text-indigo-900 tracking-tight">
            {WORKFORCE_METRICS.engineering}
          </div>
          <p className="text-[11px] text-slate-500 mt-1 font-medium">
            Frontend, Backend, Architecture
          </p>
        </div>

        {/* QA & Automation Testers */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs hover:border-blue-300 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500">QA & Testers</span>
            <span className="p-1.5 rounded-lg bg-amber-50 text-amber-600">
              <Bug className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-black text-amber-900 tracking-tight">
            {WORKFORCE_METRICS.qaTesting}
          </div>
          <p className="text-[11px] text-slate-500 mt-1 font-medium">
            SDET, Playwright, E2E Stress
          </p>
        </div>

        {/* DevOps & SRE */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs hover:border-blue-300 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500">DevOps & SRE</span>
            <span className="p-1.5 rounded-lg bg-purple-50 text-purple-600">
              <Server className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-black text-purple-900 tracking-tight">
            {WORKFORCE_METRICS.devopsSre}
          </div>
          <p className="text-[11px] text-slate-500 mt-1 font-medium">
            K8s, Multi-AZ Cloud, CI/CD
          </p>
        </div>

        {/* Security & HIPAA */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs hover:border-blue-300 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500">Security & HIPAA</span>
            <span className="p-1.5 rounded-lg bg-rose-50 text-rose-600">
              <Lock className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-black text-rose-900 tracking-tight">
            {WORKFORCE_METRICS.securityCompliance}
          </div>
          <p className="text-[11px] text-slate-500 mt-1 font-medium">
            SOC 2 Type II, PII Masking
          </p>
        </div>

        {/* Customer Support & Success */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs hover:border-blue-300 transition-colors">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-500">Support Specialists</span>
            <span className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600">
              <LifeBuoy className="w-4 h-4" />
            </span>
          </div>
          <div className="text-2xl font-black text-emerald-900 tracking-tight">
            {WORKFORCE_METRICS.supportSuccess}
          </div>
          <p className="text-[11px] text-slate-500 mt-1 font-medium">
            Tier-1/2 Ops & Onboarding
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="border-b border-slate-200">
        <nav className="flex space-x-6">
          <button
            onClick={() => setActiveTab('matrix')}
            className={`py-3 px-1 border-b-2 font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer transition-colors ${
              activeTab === 'matrix'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>RBAC Permissions Matrix (11 Roles)</span>
            <span className="ml-1 text-[10px] font-bold px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700">
              Editable
            </span>
          </button>

          <button
            onClick={() => setActiveTab('overview')}
            className={`py-3 px-1 border-b-2 font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer transition-colors ${
              activeTab === 'overview'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Workforce Pods & Team Structure</span>
          </button>

          <button
            onClick={() => setActiveTab('personnel')}
            className={`py-3 px-1 border-b-2 font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer transition-colors ${
              activeTab === 'personnel'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Users className="w-4 h-4" />
            <span>Platform Personnel Directory ({filteredPersonnel.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('audit')}
            className={`py-3 px-1 border-b-2 font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer transition-colors ${
              activeTab === 'audit'
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Access Security Audit Logs ({auditLogs.length})</span>
          </button>
        </nav>
      </div>

      {/* TAB 1: WORKFORCE OVERVIEW & ENGINEERING PODS */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Workforce Distribution Progress Card */}
          <Card>
            <div className="p-5">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <h3 className="text-base font-bold text-slate-900">
                    Platform Workforce Distribution by Discipline
                  </h3>
                  <p className="text-xs text-slate-500">
                    48 Total Personnel distributed across Engineering, Quality Engineering, SRE, and Clinical Operations.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="success">SOC 2 Type II Certified</Badge>
                  <Badge variant="purple">Zero-Trust Network Access</Badge>
                </div>
              </div>

              {/* Progress Distribution Bar */}
              <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
                <div style={{ width: '29.2%' }} className="bg-indigo-600" title="Developers (14)" />
                <div style={{ width: '29.2%' }} className="bg-emerald-600" title="Clinical Operations (14)" />
                <div style={{ width: '14.6%' }} className="bg-blue-500" title="Customer Support (7)" />
                <div style={{ width: '12.5%' }} className="bg-amber-500" title="QA & Testers (6)" />
                <div style={{ width: '8.3%' }} className="bg-purple-600" title="DevOps & SRE (4)" />
                <div style={{ width: '6.2%' }} className="bg-rose-500" title="Security & HIPAA (3)" />
              </div>

              {/* Legend */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mt-4 text-xs font-semibold">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-indigo-600 shrink-0" />
                  <span className="text-slate-700">14 Developers (29.2%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-emerald-600 shrink-0" />
                  <span className="text-slate-700">14 Clinical Ops (29.2%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-blue-500 shrink-0" />
                  <span className="text-slate-700">7 Support Specialists (14.6%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-amber-500 shrink-0" />
                  <span className="text-slate-700">6 QA & Testers (12.5%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-purple-600 shrink-0" />
                  <span className="text-slate-700">4 DevOps & SRE (8.3%)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-rose-500 shrink-0" />
                  <span className="text-slate-700">3 Security & HIPAA (6.2%)</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Active Engineering & Platform Pods */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Active Platform Engineering & Delivery Pods
                </h3>
                <p className="text-xs text-slate-500">
                  Cross-functional squads owning distinct healthcare domain micro-frontends and platform resilience.
                </p>
              </div>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-200">
                6 Autonomous Pods
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {engineeringPods.map((pod, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h4 className="font-bold text-slate-900 text-sm">{pod.name}</h4>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                        {pod.health}
                      </span>
                    </div>

                    <div className="text-xs text-slate-600 mb-3 font-medium">
                      <span className="text-slate-400 block text-[11px]">Pod Lead & Staffing:</span>
                      <span className="font-bold text-slate-800">{pod.lead}</span> · {pod.size}
                    </div>

                    <p className="text-xs text-slate-600 mb-4 leading-relaxed bg-slate-50 p-2.5 rounded-xl border border-slate-100">
                      {pod.focus}
                    </p>
                  </div>

                  <div>
                    {/* Tech Stack Chips */}
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {pod.stack.map((tech, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2 py-0.5 rounded-md text-[10px] font-mono bg-slate-100 text-slate-700 border border-slate-200"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <span>Status: <strong className="text-slate-700">{pod.status}</strong></span>
                      <span className="flex items-center gap-1 text-blue-600 font-bold">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Enforced RBAC
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: RBAC PERMISSIONS MATRIX (11 ROLES X 8 DOMAINS) */}
      {activeTab === 'matrix' && (
        <div className="space-y-4">
          {/* Filter Bar with Policy Edit Tip */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Filter by Category:
              </span>
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
                {['All', 'Platform Staff', 'Clinic Tenant Staff', 'End User'].map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setMatrixCategory(cat)}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      matrixCategory === cat
                        ? 'bg-white text-blue-600 shadow-xs'
                        : 'text-slate-600 hover:text-slate-900'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-slate-500 hidden md:inline">
                Click <strong>Edit Policy</strong> on any row to configure access tiers.
              </span>
              <div className="text-xs text-slate-600 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-200">
                Showing <strong className="text-slate-900">{filteredMatrix.length}</strong> of 11 Roles
              </div>
            </div>
          </div>

          {/* Table Container */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-2xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-600 uppercase tracking-wider">
                    <th className="py-3 px-4">Role Title & Category</th>
                    <th className="py-3 px-3">Headcount</th>
                    <th className="py-3 px-3">Onboarding</th>
                    <th className="py-3 px-3">Billing</th>
                    <th className="py-3 px-3">Infra Logs</th>
                    <th className="py-3 px-3">Clinical EHR</th>
                    <th className="py-3 px-3">Prescription Rx</th>
                    <th className="py-3 px-3">PII Access</th>
                    <th className="py-3 px-3">Feature Flags</th>
                    <th className="py-3 px-3">Audit Logs</th>
                    <th className="py-3 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {filteredMatrix.map((row) => (
                    <tr
                      key={row.roleId}
                      className="hover:bg-blue-50/40 transition-colors group cursor-pointer"
                      onClick={() => handleOpenEditPolicy(row)}
                    >
                      {/* Role Name */}
                      <td className="py-3 px-4">
                        <div className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                          {row.roleName}
                        </div>
                        <span className="text-[10px] font-semibold text-slate-400">
                          {row.category}
                        </span>
                      </td>

                      {/* Headcount */}
                      <td className="py-3 px-3">
                        <span className="font-mono font-bold text-slate-800 bg-slate-100 px-2 py-0.5 rounded-md text-[11px]">
                          {row.headcount}
                        </span>
                      </td>

                      {/* Permissions */}
                      <td className="py-3 px-3">{renderPermissionBadge(row.tenantOnboarding)}</td>
                      <td className="py-3 px-3">{renderPermissionBadge(row.billingFinance)}</td>
                      <td className="py-3 px-3">{renderPermissionBadge(row.infrastructureLogs)}</td>
                      <td className="py-3 px-3">{renderPermissionBadge(row.clinicalEhr)}</td>
                      <td className="py-3 px-3">{renderPermissionBadge(row.prescriptionSigning)}</td>
                      <td className="py-3 px-3">{renderPermissionBadge(row.piiAccess)}</td>
                      <td className="py-3 px-3">{renderPermissionBadge(row.featureFlags)}</td>
                      <td className="py-3 px-3">{renderPermissionBadge(row.auditCompliance)}</td>

                      {/* Actions */}
                      <td className="py-3 px-3 text-right" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => handleOpenEditPolicy(row)}
                            className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg cursor-pointer transition-colors shadow-2xs"
                            title="Edit this role's RBAC access policy"
                          >
                            <Edit3 className="w-3 h-3" />
                            <span>Edit Policy</span>
                          </button>

                          <button
                            onClick={() => setSelectedRbacRole(row)}
                            className="px-2 py-1 text-[11px] font-semibold text-slate-600 bg-slate-100 hover:bg-slate-200 rounded-lg cursor-pointer transition-colors"
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
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200 shadow-2xs">
            <div className="flex-1 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search staff by name, title, or work email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              />
            </div>

            <div className="flex items-center gap-2">
              <select
                value={selectedDept}
                onChange={(e) => setSelectedDept(e.target.value)}
                aria-label="Filter by department"
                className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold py-2 px-3 rounded-xl focus:outline-none"
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
                className="bg-slate-50 border border-slate-200 text-slate-700 text-xs font-semibold py-2 px-3 rounded-xl focus:outline-none"
              >
                <option value="All">All Environments</option>
                <option value="Production">Production Access</option>
                <option value="Staging">Staging Access</option>
                <option value="QA Sandbox">QA Sandbox</option>
              </select>
            </div>
          </div>

          {/* Personnel Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPersonnel.map((person) => (
              <div
                key={person.id}
                onClick={() => setSelectedPersonnel(person)}
                className="bg-white rounded-2xl border border-slate-200 p-5 shadow-2xs hover:shadow-md hover:border-blue-300 transition-all cursor-pointer flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start gap-3.5 mb-3">
                    <img
                      src={person.avatar}
                      alt={person.name}
                      className="w-12 h-12 rounded-xl object-cover border border-slate-200 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-1">
                        <h4 className="font-bold text-slate-900 text-sm truncate">{person.name}</h4>
                        <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" title={person.activeSession} />
                      </div>
                      <div className="text-xs text-blue-700 font-semibold truncate">{person.title}</div>
                      <div className="text-[11px] text-slate-500 truncate">{person.email}</div>
                    </div>
                  </div>

                  <div className="space-y-2 pt-2 border-t border-slate-100 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Department:</span>
                      <span className="font-semibold text-slate-800">{person.department}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">Clearance:</span>
                      <span className="font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded text-[10px]">
                        {person.securityClearance}
                      </span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">MFA Type:</span>
                      <span className="font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[10px] flex items-center gap-1">
                        <Key className="w-3 h-3" /> {person.mfaStatus}
                      </span>
                    </div>

                    <div className="pt-2">
                      <span className="text-[11px] text-slate-400 block mb-1">Environments Authorized:</span>
                      <div className="flex flex-wrap gap-1">
                        {person.environmentAccess.map((env, eIdx) => (
                          <span
                            key={eIdx}
                            className={`px-1.5 py-0.5 rounded text-[10px] font-mono font-bold ${
                              env === 'Production'
                                ? 'bg-rose-50 text-rose-700 border border-rose-200'
                                : env === 'Staging'
                                ? 'bg-amber-50 text-amber-700 border border-amber-200'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {env}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
                  <span>Joined: {person.joinedDate}</span>
                  <span className="text-blue-600 font-bold hover:underline">View RBAC Spec &rarr;</span>
                </div>
              </div>
            ))}
          </div>

          {filteredPersonnel.length === 0 && (
            <div className="text-center py-12 bg-white rounded-2xl border border-slate-200">
              <Users className="w-8 h-8 text-slate-400 mx-auto mb-2" />
              <h4 className="text-sm font-bold text-slate-800">No personnel match your search filters</h4>
              <p className="text-xs text-slate-500 mt-1">Try clearing the search query or switching departments.</p>
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
          <div className="flex items-center justify-between bg-white p-3.5 rounded-2xl border border-slate-200">
            <div>
              <h4 className="text-sm font-bold text-slate-900">Zero-Trust Access & Privilege Audit Stream</h4>
              <p className="text-xs text-slate-500">
                Immutable record of access tokens, canary flag triggers, and administrative actions.
              </p>
            </div>
            <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              Live Stream Active ({auditLogs.length} Records)
            </span>
          </div>

          <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
            <div className="divide-y divide-slate-100">
              {auditLogs.map((log) => (
                <div key={log.id} className="p-4 hover:bg-slate-50 transition-colors flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 rounded-xl bg-blue-50 text-blue-600 mt-0.5 shrink-0">
                      <Terminal className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-slate-900 text-xs sm:text-sm">{log.actor}</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800">
                          {log.result}
                        </span>
                      </div>
                      <p className="text-xs text-slate-700 mt-1 font-mono bg-slate-50 px-2 py-1 rounded border border-slate-200 inline-block">
                        {log.action}
                      </p>
                      <div className="flex items-center gap-3 mt-1.5 text-[11px] text-slate-400">
                        <span>IP / Node: <strong className="text-slate-600 font-mono">{log.ip}</strong></span>
                        <span>•</span>
                        <span className="flex items-center gap-1 text-emerald-600 font-semibold">
                          <CheckCircle2 className="w-3 h-3" /> Hardware MFA Verified
                        </span>
                      </div>
                    </div>
                  </div>

                  <span className="text-[11px] font-mono text-slate-400 shrink-0">
                    {log.timestamp}
                  </span>
                </div>
              ))}
            </div>
          </div>
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
          <div className="space-y-4 text-xs sm:text-sm">
            <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-200">
              <img
                src={selectedPersonnel.avatar}
                alt={selectedPersonnel.name}
                className="w-16 h-16 rounded-2xl object-cover border border-slate-300 shrink-0"
              />
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-bold text-slate-900">{selectedPersonnel.name}</h3>
                <div className="text-xs font-semibold text-blue-700">{selectedPersonnel.title}</div>
                <div className="text-xs text-slate-500 font-mono mt-0.5">{selectedPersonnel.email}</div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="text-slate-400 block mb-0.5">Department</span>
                <span className="font-bold text-slate-800">{selectedPersonnel.department}</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="text-slate-400 block mb-0.5">Clearance Tier</span>
                <span className="font-bold text-indigo-700">{selectedPersonnel.securityClearance}</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="text-slate-400 block mb-0.5">MFA Enforcement</span>
                <span className="font-bold text-emerald-700">{selectedPersonnel.mfaStatus}</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-slate-200">
                <span className="text-slate-400 block mb-0.5">Access Scope</span>
                <span className="font-bold text-slate-800">{selectedPersonnel.accessScope}</span>
              </div>
            </div>

            <div className="p-3 bg-blue-50/60 rounded-xl border border-blue-200 text-xs">
              <span className="font-bold text-blue-900 block mb-1">Environment Entitlements:</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedPersonnel.environmentAccess.map((env, i) => (
                  <span
                    key={i}
                    className="px-2 py-0.5 rounded-md font-mono font-bold text-[11px] bg-white border border-blue-300 text-blue-800 shadow-2xs"
                  >
                    {env} Authorized
                  </span>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500">Security Hash: <strong className="font-mono text-slate-700">sha256:4f8e...902a</strong></span>
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
          <div className="space-y-4 text-xs">
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-500 block mb-1 font-semibold uppercase text-[10px]">Role Category</span>
              <span className="font-bold text-slate-900 text-sm">{selectedRbacRole.category}</span>
              <span className="text-slate-600 block mt-1">
                Currently assigned to <strong>{selectedRbacRole.headcount}</strong> active users on this platform.
              </span>
            </div>

            <div className="space-y-2">
              <h5 className="font-bold text-slate-800">Current Permission Matrix Scope</h5>
              <div className="grid grid-cols-2 gap-2">
                <div className="p-2.5 bg-white border border-slate-200 rounded-lg flex items-center justify-between">
                  <span className="text-slate-600">Onboarding:</span>
                  {renderPermissionBadge(selectedRbacRole.tenantOnboarding)}
                </div>
                <div className="p-2.5 bg-white border border-slate-200 rounded-lg flex items-center justify-between">
                  <span className="text-slate-600">Billing:</span>
                  {renderPermissionBadge(selectedRbacRole.billingFinance)}
                </div>
                <div className="p-2.5 bg-white border border-slate-200 rounded-lg flex items-center justify-between">
                  <span className="text-slate-600">Infra Logs:</span>
                  {renderPermissionBadge(selectedRbacRole.infrastructureLogs)}
                </div>
                <div className="p-2.5 bg-white border border-slate-200 rounded-lg flex items-center justify-between">
                  <span className="text-slate-600">Clinical EHR:</span>
                  {renderPermissionBadge(selectedRbacRole.clinicalEhr)}
                </div>
                <div className="p-2.5 bg-white border border-slate-200 rounded-lg flex items-center justify-between">
                  <span className="text-slate-600">Rx Signing:</span>
                  {renderPermissionBadge(selectedRbacRole.prescriptionSigning)}
                </div>
                <div className="p-2.5 bg-white border border-slate-200 rounded-lg flex items-center justify-between">
                  <span className="text-slate-600">PII Access:</span>
                  {renderPermissionBadge(selectedRbacRole.piiAccess)}
                </div>
                <div className="p-2.5 bg-white border border-slate-200 rounded-lg flex items-center justify-between">
                  <span className="text-slate-600">Feature Flags:</span>
                  {renderPermissionBadge(selectedRbacRole.featureFlags)}
                </div>
                <div className="p-2.5 bg-white border border-slate-200 rounded-lg flex items-center justify-between">
                  <span className="text-slate-600">Audit Logs:</span>
                  {renderPermissionBadge(selectedRbacRole.auditCompliance)}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
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
                <Edit3 className="w-3.5 h-3.5 mr-1.5" />
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
          <form onSubmit={handleSavePolicy} className="space-y-4 text-xs">
            {/* Role Header Info */}
            <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-slate-400 block text-[10px] uppercase font-bold">Target Role</span>
                <span className="text-sm font-bold text-slate-900">{editingRole.roleName}</span>
                <span className="text-slate-500 block text-[11px]">
                  ID: <code className="text-blue-700 font-mono">{editingRole.roleId}</code> · {editingRole.category}
                </span>
              </div>
              <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg border border-slate-200">
                <label className="text-[11px] font-semibold text-slate-600">Assigned Headcount:</label>
                <input
                  type="number"
                  min="0"
                  value={editFormData.headcount}
                  onChange={(e) =>
                    setEditFormData({ ...editFormData, headcount: parseInt(e.target.value) || 0 })
                  }
                  className="w-16 px-2 py-0.5 bg-slate-50 border border-slate-300 rounded text-xs font-bold text-slate-800 focus:outline-none"
                />
              </div>
            </div>

            {/* 8 Permission Dimensions Form Controls */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <h5 className="font-bold text-slate-900 text-xs">Configure System Entitlements (8 Dimensions)</h5>
                <span className="text-[11px] text-slate-400">Select privilege tier for each healthcare domain</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* 1. Tenant Onboarding */}
                <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1.5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-700 text-xs">Multi-Tenant Onboarding</label>
                    {renderPermissionBadge(editFormData.tenantOnboarding)}
                  </div>
                  <select
                    value={editFormData.tenantOnboarding}
                    onChange={(e) => setEditFormData({ ...editFormData, tenantOnboarding: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="Full Access">Full Access (Create / Provision)</option>
                    <option value="Read Only">Read Only (Inspect Tenant Metadata)</option>
                    <option value="Tenant Scoped">Tenant Scoped (Own Clinic Only)</option>
                    <option value="No Access">No Access</option>
                  </select>
                </div>

                {/* 2. Billing & Finance */}
                <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1.5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-700 text-xs">Subscription Billing & Finance</label>
                    {renderPermissionBadge(editFormData.billingFinance)}
                  </div>
                  <select
                    value={editFormData.billingFinance}
                    onChange={(e) => setEditFormData({ ...editFormData, billingFinance: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="Full Access">Full Access (Invoices, Gateways, Payouts)</option>
                    <option value="Read Only">Read Only (View Statements)</option>
                    <option value="Tenant Scoped">Tenant Scoped (Clinic Invoices Only)</option>
                    <option value="No Access">No Access</option>
                  </select>
                </div>

                {/* 3. Infrastructure Logs */}
                <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1.5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-700 text-xs">Cloud Infrastructure & Logs</label>
                    {renderPermissionBadge(editFormData.infrastructureLogs)}
                  </div>
                  <select
                    value={editFormData.infrastructureLogs}
                    onChange={(e) => setEditFormData({ ...editFormData, infrastructureLogs: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="Full Access">Full Access (K8s, Multi-AZ, SSH)</option>
                    <option value="Read Only">Read Only (Grafana, CloudWatch)</option>
                    <option value="No Access">No Access</option>
                  </select>
                </div>

                {/* 4. Clinical EHR Data */}
                <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1.5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-700 text-xs">Clinical EHR & Encounters</label>
                    {renderPermissionBadge(editFormData.clinicalEhr)}
                  </div>
                  <select
                    value={editFormData.clinicalEhr}
                    onChange={(e) => setEditFormData({ ...editFormData, clinicalEhr: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="Full Access">Full Access (Create / Edit Encounters)</option>
                    <option value="Tenant Scoped">Tenant Scoped (Authorized Clinic)</option>
                    <option value="Read Only">Read Only (Review Charts)</option>
                    <option value="Audit Logged">Audit Logged (Supervised Inspection)</option>
                    <option value="No Access">No Access</option>
                  </select>
                </div>

                {/* 5. Prescription Rx Signing */}
                <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1.5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-700 text-xs">Digital Rx Signing & Dispense</label>
                    {renderPermissionBadge(editFormData.prescriptionSigning)}
                  </div>
                  <select
                    value={editFormData.prescriptionSigning}
                    onChange={(e) => setEditFormData({ ...editFormData, prescriptionSigning: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="Full Access">Full Access (Doctor Digital Signature)</option>
                    <option value="Verify Only">Verify Only (QR Registry Verification)</option>
                    <option value="Tenant Scoped">Tenant Scoped (Pharmacy / Dispense)</option>
                    <option value="No Access">No Access</option>
                  </select>
                </div>

                {/* 6. PII Access */}
                <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1.5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-700 text-xs">PII & Patient Health Privacy</label>
                    {renderPermissionBadge(editFormData.piiAccess)}
                  </div>
                  <select
                    value={editFormData.piiAccess}
                    onChange={(e) => setEditFormData({ ...editFormData, piiAccess: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="Full Access">Full Access (Unmasked Clinical Care)</option>
                    <option value="Masked / Anonymized">Masked / Anonymized (HIPAA Privacy)</option>
                    <option value="Tenant Scoped">Tenant Scoped (Clinic Care Team)</option>
                    <option value="No Access">No Access</option>
                  </select>
                </div>

                {/* 7. Feature Flags */}
                <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1.5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-700 text-xs">Canary Feature Flags & CI/CD</label>
                    {renderPermissionBadge(editFormData.featureFlags)}
                  </div>
                  <select
                    value={editFormData.featureFlags}
                    onChange={(e) => setEditFormData({ ...editFormData, featureFlags: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="Full Access">Full Access (Toggle & Deploy Flags)</option>
                    <option value="Read Only">Read Only (Inspect Active Configs)</option>
                    <option value="No Access">No Access</option>
                  </select>
                </div>

                {/* 8. Audit Compliance */}
                <div className="p-3 bg-white rounded-xl border border-slate-200 space-y-1.5 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <label className="font-bold text-slate-700 text-xs">Compliance Audit Export</label>
                    {renderPermissionBadge(editFormData.auditCompliance)}
                  </div>
                  <select
                    value={editFormData.auditCompliance}
                    onChange={(e) => setEditFormData({ ...editFormData, auditCompliance: e.target.value })}
                    className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
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
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
              <label className="font-semibold text-slate-700 text-[11px] block">
                Policy Modification Justification (Recorded in Tamper-Proof Audit Log)
              </label>
              <input
                type="text"
                value={editFormData.auditReason}
                onChange={(e) => setEditFormData({ ...editFormData, auditReason: e.target.value })}
                placeholder="e.g. Periodic privilege review, canary test approval, or emergency escalation"
                className="w-full px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-800 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>

            {/* CTA Buttons */}
            <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
              <span className="text-[11px] text-slate-400">
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
                  <Save className="w-3.5 h-3.5 mr-1.5" />
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
          <div className="space-y-3 text-xs">
            <p className="text-slate-600">
              The following JSON specification represents the active role permissions and platform headcount matrix.
            </p>
            <pre className="p-3 bg-slate-900 text-emerald-400 font-mono text-[11px] rounded-xl overflow-x-auto max-h-80 border border-slate-800">
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

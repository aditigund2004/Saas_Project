import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Command,
  ArrowRight,
  User,
  Calendar,
  FileText,
  Activity,
  Package,
  Settings,
  HelpCircle,
  CreditCard,
  Building,
  UserCheck,
  Stethoscope,
  PlusCircle,
  Clock,
  Mic,
  ShieldCheck,
  Globe,
  Sparkles,
  X
} from 'lucide-react';
import { useAuth, toAuthRole } from '../../context/AuthContext';
import { useApp } from '../../context/AppContext';
import { fuzzyMatch } from '../../utils/fuzzySearch';

export function CommandPalette({ isOpen, onClose }) {
  const navigate = useNavigate();
  const auth = useAuth();
  const app = useApp();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const currentRole = auth?.user?.role || toAuthRole(app?.currentRole) || 'patient';

  // Automatically focus input when opened
  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
    }
  }, [isOpen]);

  // Handle escape & arrow keys
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        if (filteredItems[selectedIndex]) {
          executeCommand(filteredItems[selectedIndex]);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex]);

  // Build commands library based on available entities and roles
  const commands = useMemo(() => {
    const items = [];

    // --- DOCTOR / CLINIC ADMIN COMMANDS ---
    if (currentRole === 'doctor_admin' || currentRole === 'clinic_admin') {
      items.push(
        {
          id: 'doc-consultations',
          title: 'Open Clinical Consultations',
          subtitle: 'Conduct examination, diagnose & prescribe',
          category: 'Actions',
          icon: Stethoscope,
          action: () => navigate('/clinic/consultations'),
          keywords: ['consultation', 'doctor', 'patient', 'diagnose', 'prescription']
        },
        {
          id: 'doc-new-rx',
          title: 'Create Digital Prescription',
          subtitle: 'Launch drug composer with safety validation',
          category: 'Actions',
          icon: FileText,
          action: () => navigate('/clinic/prescriptions/new'),
          keywords: ['prescription', 'medicine', 'drug', 'rx']
        },
        {
          id: 'doc-appointments',
          title: 'View Interactive Calendar',
          subtitle: 'Manage schedules & drag-and-drop rescheduling',
          category: 'Navigation',
          icon: Calendar,
          action: () => navigate('/clinic/appointments'),
          keywords: ['appointment', 'calendar', 'schedule', 'slots']
        },
        {
          id: 'doc-queue',
          title: 'Live Patient Queue',
          subtitle: 'Inspect waiting lounge & call next token',
          category: 'Actions',
          icon: Clock,
          action: () => navigate('/clinic/queue'),
          keywords: ['queue', 'waiting', 'token', 'call']
        },
        {
          id: 'doc-inventory',
          title: 'Pharmacy Inventory & Expiry Triage',
          subtitle: 'Monitor stock levels and batches expiring <60d',
          category: 'Navigation',
          icon: Package,
          action: () => navigate('/clinic/inventory'),
          keywords: ['inventory', 'medicine', 'stock', 'expiry', 'pharmacy']
        },
        {
          id: 'doc-website',
          title: 'Clinic Website Builder',
          subtitle: 'Customize public clinic portal & landing page',
          category: 'Navigation',
          icon: Globe,
          action: () => navigate('/clinic/website-builder'),
          keywords: ['website', 'builder', 'cms', 'customizer']
        },
        {
          id: 'doc-finance',
          title: 'Clinic Financial Overview',
          subtitle: 'Patient invoices, collections, and GST summary',
          category: 'Navigation',
          icon: CreditCard,
          action: () => navigate('/clinic/finance/overview'),
          keywords: ['finance', 'billing', 'invoices', 'gst', 'revenue']
        }
      );
    }

    // --- RECEPTIONIST COMMANDS ---
    if (currentRole === 'receptionist_manager' || currentRole === 'receptionist') {
      items.push(
        {
          id: 'rec-walkin',
          title: 'Express Walk-In Registration',
          subtitle: 'Generate queue token in under 30 seconds',
          category: 'Actions',
          icon: PlusCircle,
          action: () => navigate('/reception/walk-ins'),
          keywords: ['walkin', 'register', 'token', 'express', 'new patient']
        },
        {
          id: 'rec-new-appt',
          title: 'Book New Appointment',
          subtitle: 'Reserve time slot with conflict guard',
          category: 'Actions',
          icon: Calendar,
          action: () => navigate('/reception/appointments/new'),
          keywords: ['book', 'appointment', 'schedule', 'slot']
        },
        {
          id: 'rec-queue',
          title: 'Front-Desk Queue Cockpit',
          subtitle: 'Check in arrivals & track doctor rooms',
          category: 'Navigation',
          icon: Clock,
          action: () => navigate('/reception/queue'),
          keywords: ['queue', 'checkin', 'waiting', 'lounge']
        },
        {
          id: 'rec-patients',
          title: 'Search Patient Directory',
          subtitle: 'Look up medical records by name, ID or mobile',
          category: 'Navigation',
          icon: UserCheck,
          action: () => navigate('/reception/patients'),
          keywords: ['patient', 'search', 'find', 'lookup', 'directory']
        },
        {
          id: 'rec-billing',
          title: 'Front-Desk Invoicing & Payments',
          subtitle: 'Generate patient receipts and collect payment',
          category: 'Navigation',
          icon: CreditCard,
          action: () => navigate('/reception/billing'),
          keywords: ['billing', 'invoice', 'payment', 'cash', 'upi']
        }
      );
    }

    // --- SUPERADMIN COMMANDS ---
    if (currentRole === 'superadmin') {
      items.push(
        {
          id: 'sa-dashboard',
          title: 'Platform SaaS Telemetry',
          subtitle: 'MRR (₹1.54L), tenant growth, churn & conversion',
          category: 'Navigation',
          icon: Activity,
          action: () => navigate('/superadmin/dashboard'),
          keywords: ['mrr', 'telemetry', 'arr', 'saas', 'metrics']
        },
        {
          id: 'sa-clinics',
          title: 'Manage Clinic Tenants',
          subtitle: 'Review branches, doctor limits & account status',
          category: 'Navigation',
          icon: Building,
          action: () => navigate('/superadmin/clinics'),
          keywords: ['clinics', 'tenants', 'hospitals', 'accounts']
        },
        {
          id: 'sa-plans',
          title: 'Subscription Tier Architect',
          subtitle: 'Configure Starter, Growth, Pro & Enterprise tiers',
          category: 'Navigation',
          icon: ShieldCheck,
          action: () => navigate('/superadmin/plans'),
          keywords: ['plans', 'pricing', 'tiers', 'quotas']
        },
        {
          id: 'sa-referrals',
          title: 'Affiliate & Referral Engine',
          subtitle: 'Partner codes, click tracking, and payouts',
          category: 'Navigation',
          icon: Sparkles,
          action: () => navigate('/superadmin/referrals/dashboard'),
          keywords: ['referral', 'affiliate', 'commission', 'payout']
        },
        {
          id: 'sa-finance',
          title: 'SaaS Corporate Finance Suite',
          subtitle: 'B2B subscription invoices, renewals & expenses',
          category: 'Navigation',
          icon: CreditCard,
          action: () => navigate('/superadmin/finance/overview'),
          keywords: ['finance', 'invoices', 'corporate', 'revenue']
        }
      );
    }

    // --- PATIENT COMMANDS ---
    if (currentRole === 'patient') {
      items.push(
        {
          id: 'pat-book',
          title: 'Book a Doctor Appointment',
          subtitle: 'Select specialist, date & confirmed time slot',
          category: 'Actions',
          icon: Calendar,
          action: () => navigate('/patient/appointments/book'),
          keywords: ['book', 'doctor', 'appointment', 'consultation']
        },
        {
          id: 'pat-prescriptions',
          title: 'My Prescriptions',
          subtitle: 'Review digital prescriptions & AI medication guide',
          category: 'Navigation',
          icon: FileText,
          action: () => navigate('/patient/prescriptions'),
          keywords: ['prescription', 'medicine', 'pills', 'dosage']
        },
        {
          id: 'pat-records',
          title: 'My Clinical Medical Records',
          subtitle: 'Consultation summaries, recorded vitals & history',
          category: 'Navigation',
          icon: Activity,
          action: () => navigate('/patient/records'),
          keywords: ['records', 'vitals', 'history', 'bp', 'medical']
        },
        {
          id: 'pat-bills',
          title: 'Outstanding Bills & Invoices',
          subtitle: 'Pay clinic invoices online via UPI or card',
          category: 'Navigation',
          icon: CreditCard,
          action: () => navigate('/patient/bills'),
          keywords: ['bills', 'invoices', 'pay', 'receipts']
        }
      );
    }

    // --- UNIVERSAL COMMANDS (Patients / Doctors lookup) ---
    if (app?.patients && app.patients.length > 0) {
      app.patients.slice(0, 15).forEach((p) => {
        items.push({
          id: `patient-${p.id}`,
          title: p.name,
          subtitle: `Patient ID: ${p.id} • ${p.phone || 'No Phone'} • Blood: ${p.bloodGroup || 'N/A'}`,
          category: 'Patients',
          icon: User,
          action: () => {
            if (currentRole === 'doctor_admin' || currentRole === 'clinic_admin') {
              navigate(`/clinic/patients/${p.id}`);
            } else if (currentRole === 'receptionist_manager' || currentRole === 'receptionist') {
              navigate(`/reception/patients`);
            } else {
              navigate('/patient/records');
            }
          },
          keywords: [p.name, p.id, p.phone, p.email, 'patient']
        });
      });
    }

    if (app?.doctors && app.doctors.length > 0) {
      app.doctors.forEach((d) => {
        items.push({
          id: `doctor-${d.id}`,
          title: d.name,
          subtitle: `${d.specialty} • Fee: ₹${d.consultationFee} • Room ${d.roomNumber || '1'}`,
          category: 'Doctors',
          icon: Stethoscope,
          action: () => {
            if (currentRole === 'patient') {
              navigate(`/book-doctor/${d.id}`);
            } else {
              navigate('/clinic/doctors');
            }
          },
          keywords: [d.name, d.specialty, d.id, 'doctor', 'clinician']
        });
      });
    }

    return items;
  }, [currentRole, app?.patients, app?.doctors, navigate]);

  // Filter commands using fuzzy matching
  const filteredItems = useMemo(() => {
    if (!query.trim()) return commands.slice(0, 20);

    const scored = [];
    for (const cmd of commands) {
      let maxScore = 0;
      const searchable = [cmd.title, cmd.subtitle, cmd.category, ...(cmd.keywords || [])];
      for (const text of searchable) {
        if (!text) continue;
        const res = fuzzyMatch(query, text);
        if (res.match && res.score > maxScore) {
          maxScore = res.score;
        }
      }
      if (maxScore > 0) {
        scored.push({ cmd, score: maxScore });
      }
    }

    return scored.sort((a, b) => b.score - a.score).map((s) => s.cmd);
  }, [commands, query]);

  const executeCommand = (item) => {
    onClose();
    if (item && item.action) {
      item.action();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-900/50 backdrop-blur-sm animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[75vh]"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Global Command Palette"
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <Search className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-3 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            className="w-full bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 text-base focus:outline-none"
            placeholder="Type a command, patient name, doctor, or page..."
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
          />
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close command palette"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div ref={listRef} className="overflow-y-auto p-2 divide-y divide-slate-100 dark:divide-slate-800/50">
          {filteredItems.length === 0 ? (
            <div className="py-12 text-center text-slate-400 dark:text-slate-500">
              <Command className="w-10 h-10 mx-auto mb-2 stroke-1 opacity-50" />
              <p className="text-sm">No matching clinical actions or records found</p>
              <p className="text-xs text-slate-400 mt-1">Try searching "Appointments", "Queue", or a patient's name</p>
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              const Icon = item.icon || Activity;
              return (
                <div
                  key={item.id}
                  onClick={() => executeCommand(item)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`flex items-center px-3.5 py-2.5 rounded-xl cursor-pointer transition-colors ${
                    isSelected
                      ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-900 dark:text-blue-100 border border-blue-200 dark:border-blue-800/50'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800/60 text-slate-700 dark:text-slate-200 border border-transparent'
                  }`}
                  role="option"
                  aria-selected={isSelected}
                >
                  <div
                    className={`p-2 rounded-lg mr-3 shrink-0 ${
                      isSelected
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center space-x-2">
                      <span className="font-semibold text-sm truncate">{item.title}</span>
                      <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400">
                        {item.category}
                      </span>
                    </div>
                    {item.subtitle && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">{item.subtitle}</p>
                    )}
                  </div>
                  {isSelected && (
                    <ArrowRight className="w-4 h-4 text-blue-600 dark:text-blue-400 ml-2 shrink-0 animate-in fade-in" />
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer Shortcut Hints */}
        <div className="px-4 py-2 bg-slate-50 dark:bg-slate-900/80 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
          <div className="flex items-center space-x-3">
            <span>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-[10px]">↑↓</kbd> Navigate
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-[10px]">↵</kbd> Select
            </span>
            <span>
              <kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono text-[10px]">ESC</kbd> Close
            </span>
          </div>
          <div className="flex items-center space-x-1 font-medium text-blue-600 dark:text-blue-400">
            <span>ClinicOS Command Center</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Hook to provide global shortcut listening (Ctrl+K / Cmd+K)
 */
export function useCommandPalette() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return {
    isOpen,
    open: () => setIsOpen(true),
    close: () => setIsOpen(false),
    toggle: () => setIsOpen((prev) => !prev)
  };
}


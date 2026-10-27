import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { User, ChevronDown, Check, ShieldAlert, Sparkles, UserPlus } from 'lucide-react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';

export function DemoPatientSwitcher() {
  const {
    patients = [],
    activePatientId,
    switchDemoPatient,
    createPatient,
    currentUser,
    currentRole
  } = useApp();

  const [isOpen, setIsOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  // New Patient Quick Register Form
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newGender, setNewGender] = useState('Male');
  const [newDob, setNewDob] = useState('1996-04-12');
  const [newBloodGroup, setNewBloodGroup] = useState('O+');

  const activePatient =
    patients.find((p) => p.id === activePatientId || p.patientIdNumber === activePatientId) ||
    patients.find((p) => p.name === currentUser?.name) ||
    patients[0];

  const handleSelectPatient = (patient) => {
    switchDemoPatient(patient.id);
    setIsOpen(false);
  };

  const handleQuickRegister = (e) => {
    e.preventDefault();
    if (!newName.trim() || !newPhone.trim()) return;

    const created = createPatient({
      name: newName,
      phone: newPhone,
      email: newEmail || `${newName.toLowerCase().replace(/\s+/g, '.')}@example.demo`,
      gender: newGender,
      dob: newDob,
      bloodGroup: newBloodGroup,
      allergies: ['None known'],
      status: 'Active'
    });

    switchDemoPatient(created.id);
    setIsRegisterModalOpen(false);
    setNewName('');
    setNewPhone('');
    setNewEmail('');
  };

  return (
    <div className="mb-6 rounded-2xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-4 sm:p-5 shadow-lg border border-blue-800/40 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 relative z-10">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/30 flex items-center justify-center shrink-0 text-blue-300">
            <User className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-blue-500/30 text-blue-200 border border-blue-400/30">
                Demo Patient Simulation
              </span>
              <span className="text-xs text-blue-200/80 font-mono">
                Isolated Records View
              </span>
            </div>
            <p className="text-sm font-semibold text-white mt-1">
              Currently viewing portal as:{' '}
              <span className="text-blue-300 font-bold underline decoration-blue-400 decoration-2 underline-offset-2">
                {activePatient?.name || 'Aarav Patel'}
              </span>{' '}
              <span className="text-xs font-mono text-slate-300">
                ({activePatient?.patientIdNumber || activePatient?.id})
              </span>
            </p>
          </div>
        </div>

        {/* Patient Switcher Dropdown & Actions */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <div className="relative">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-xs font-semibold text-white transition-all cursor-pointer backdrop-blur-sm"
              aria-label="Switch Demo Patient"
            >
              <User className="w-3.5 h-3.5 text-blue-300" />
              <span>Switch Patient ({patients.length})</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>

            {isOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setIsOpen(false)}
                />
                <div className="absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl bg-white dark:bg-slate-900 shadow-2xl border border-slate-200 dark:border-slate-800 py-2 z-50 animate-fade-in text-slate-800 dark:text-slate-200">
                  <div className="px-3.5 py-2 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                      Select Demo Patient
                    </span>
                    <span className="text-[10px] bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-full font-bold">
                      {patients.length} Registered
                    </span>
                  </div>

                  <div className="max-h-64 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
                    {patients.map((p) => {
                      const isSelected = p.id === activePatient?.id || p.patientIdNumber === activePatient?.patientIdNumber;
                      return (
                        <button
                          key={p.id}
                          onClick={() => handleSelectPatient(p)}
                          className={`w-full text-left px-3.5 py-2.5 text-xs flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/70 transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-blue-50/80 dark:bg-blue-950/40 text-blue-800 dark:text-blue-300 font-bold'
                              : 'text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <div>
                            <div className="flex items-center gap-1.5 font-semibold">
                              <span>{p.name}</span>
                              <span className="font-mono text-[10px] text-slate-400 font-normal">
                                {p.patientIdNumber || p.id}
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-400 font-normal mt-0.5">
                              {p.phone} · {p.gender || 'Patient'}
                            </div>
                          </div>
                          {isSelected && <Check className="w-4 h-4 text-blue-600 dark:text-blue-400 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>

                  <div className="p-2 border-t border-slate-100 dark:border-slate-800">
                    <button
                      onClick={() => {
                        setIsOpen(false);
                        setIsRegisterModalOpen(true);
                      }}
                      className="w-full flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold transition-all cursor-pointer"
                    >
                      <UserPlus className="w-3.5 h-3.5" />
                      Register New Patient for Demo
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          <button
            onClick={() => setIsRegisterModalOpen(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-blue-500/30 hover:bg-blue-500/40 border border-blue-400/30 text-xs font-semibold text-white transition-all cursor-pointer"
          >
            <UserPlus className="w-3.5 h-3.5 text-blue-200" />
            <span className="hidden sm:inline">+ Register New</span>
          </button>
        </div>
      </div>

      {/* Quick Register Modal */}
      {isRegisterModalOpen && (
        <Modal
          isOpen={isRegisterModalOpen}
          onClose={() => setIsRegisterModalOpen(false)}
          title="Register New Patient (Demo Simulation)"
          size="md"
        >
          <form onSubmit={handleQuickRegister} className="space-y-4 text-xs text-slate-800 dark:text-slate-200">
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Register a fictional patient. Once saved, they will be selectable across appointment booking, receptionist intake, doctor consultations, prescriptions, invoices, receipts, and patient portal views.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold mb-1">Full Name *</label>
                <input
                  required
                  type="text"
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Vikram Malhotra"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Phone Number *</label>
                <input
                  required
                  type="tel"
                  value={newPhone}
                  onChange={(e) => setNewPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Email Address</label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="patient@example.demo"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Gender</label>
                <select
                  value={newGender}
                  onChange={(e) => setNewGender(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 text-xs"
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={newDob}
                  onChange={(e) => setNewDob(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 text-xs"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold mb-1">Blood Group</label>
                <select
                  value={newBloodGroup}
                  onChange={(e) => setNewBloodGroup(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-900 text-xs"
                >
                  {['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'].map((bg) => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setIsRegisterModalOpen(false)} type="button">
                Cancel
              </Button>
              <Button variant="primary" size="sm" type="submit">
                Register & Switch to Patient
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}


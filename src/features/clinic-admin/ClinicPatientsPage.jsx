import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
<<<<<<< HEAD
import { Search, UserPlus, Users, ArrowRight, Phone, Mail, Calendar, FileText } from 'lucide-react';
=======
import {
  Search,
  UserPlus,
  Users,
  ArrowRight,
  Phone,
  Mail,
  Calendar,
  FileText,
  Table as TableIcon,
  LayoutGrid,
  ShieldAlert,
  PlusCircle,
  Activity
} from 'lucide-react';
>>>>>>> origin/main

export function ClinicPatientsPage() {
  const { patients, createPatient, activeClinic } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
<<<<<<< HEAD
=======
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'cards'
>>>>>>> origin/main
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  const [formName, setFormName] = useState('');
  const [formPhone, setFormPhone] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formGender, setFormGender] = useState('Male');
  const [formDob, setFormDob] = useState('1990-01-01');
  const [formBloodGroup, setFormBloodGroup] = useState('B+');
  const [formAllergies, setFormAllergies] = useState('');
  const [formHistory, setFormHistory] = useState('');

  const filteredPatients = patients.filter((p) => {
    return (
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.patientIdNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.phone.includes(searchQuery)
    );
  });

<<<<<<< HEAD
=======
  const totalAllergyPatients = patients.filter((p) => p.allergies && p.allergies.length > 0).length;

>>>>>>> origin/main
  const handleRegister = (e) => {
    e.preventDefault();
    createPatient({
      name: formName,
      phone: formPhone,
      email: formEmail,
      gender: formGender,
      dob: formDob,
      bloodGroup: formBloodGroup,
      allergies: formAllergies ? formAllergies.split(',').map((a) => a.trim()) : [],
      medicalHistory: formHistory,
<<<<<<< HEAD
      address: activeClinic.city
=======
      address: activeClinic?.city || 'Pune'
>>>>>>> origin/main
    });

    setIsRegisterModalOpen(false);
    setFormName('');
    setFormPhone('');
    setFormEmail('');
    setFormAllergies('');
    setFormHistory('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
<<<<<<< HEAD
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Clinical Records</span>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Patient Directory</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Searchable patient registry, allergy warnings, medical histories, and consultation archives.
=======
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            Clinical Records
          </span>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
            Patient Directory & Medical Dossiers
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Searchable patient registry, allergy alerts, past prescriptions, and diagnostic lab reports.
>>>>>>> origin/main
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={UserPlus}
          onClick={() => setIsRegisterModalOpen(true)}
        >
          Register New Patient
        </Button>
      </div>

<<<<<<< HEAD
      {/* Search Bar */}
      <Card className="p-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="relative">
=======
      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Registered</span>
            <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-0.5">{patients.length} Patients</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
            <Users className="w-5 h-5" />
          </div>
        </Card>

        <Card className="p-4 border-rose-200 dark:border-rose-900/40 bg-rose-50/40 dark:bg-rose-950/20 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400">Allergy Flagged</span>
            <div className="text-2xl font-extrabold text-rose-900 dark:text-rose-200 mt-0.5">{totalAllergyPatients} Profiles</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-rose-100 dark:bg-rose-900/40 text-rose-600 dark:text-rose-400 flex items-center justify-center">
            <ShieldAlert className="w-5 h-5" />
          </div>
        </Card>

        <Card className="p-4 border-emerald-200 dark:border-emerald-900/40 bg-emerald-50/40 dark:bg-emerald-950/20 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Clinical Status</span>
            <div className="text-2xl font-extrabold text-emerald-900 dark:text-emerald-200 mt-0.5">100% Active</div>
          </div>
          <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-900/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
            <Activity className="w-5 h-5" />
          </div>
        </Card>
      </div>

      {/* Search Bar & View Mode Toggle */}
      <Card className="p-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="relative flex-1">
>>>>>>> origin/main
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search patients by name, patient ID (e.g. PT-1041), or phone number..."
            className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />
        </div>
<<<<<<< HEAD
      </Card>

      {/* Patient Table */}
      <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <CardHeader
          title={`Registered Patients (${filteredPatients.length})`}
          subtitle="Click on any patient record to view complete clinical history and past prescriptions"
        />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 uppercase text-[10px] font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-3.5 text-center w-12">#</th>
                <th className="p-3.5">Patient ID</th>
                <th className="p-3.5">Full Name</th>
                <th className="p-3.5">Contact Details</th>
                <th className="p-3.5">Blood & Allergies</th>
                <th className="p-3.5">Registered Date</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredPatients.map((p, idx) => (
                <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="p-3.5 text-center font-mono font-medium text-slate-400 dark:text-slate-500 text-xs">
                    {idx + 1}
                  </td>
                  <td className="p-3.5 font-mono font-bold text-blue-800 dark:text-blue-400">{p.patientIdNumber}</td>
                  <td className="p-3.5">
                    <div className="font-bold text-slate-900 dark:text-slate-100">{p.name}</div>
                    <div className="text-[10px] text-slate-400 dark:text-slate-500">{p.gender} · DOB: {p.dob}</div>
                  </td>
                  <td className="p-3.5">
                    <div className="text-slate-800 dark:text-slate-200 font-medium">{p.phone}</div>
                    <div className="text-[10px] text-slate-400 dark:text-slate-500">{p.email}</div>
                  </td>
                  <td className="p-3.5">
                    <span className="font-bold text-slate-700 dark:text-slate-300">{p.bloodGroup || '—'}</span>
                    {p.allergies && p.allergies.length > 0 && (
                      <span className="block text-[10px] text-rose-600 dark:text-rose-400 font-semibold mt-0.5">
                        ⚠ Allergies: {p.allergies.join(', ')}
                      </span>
                    )}
                  </td>
                  <td className="p-3.5 text-slate-600 dark:text-slate-400 font-mono">{p.registeredAt}</td>
                  <td className="p-3.5">
                    <Badge variant={p.status}>{p.status}</Badge>
                  </td>
                  <td className="p-3.5 text-right">
                    <Link to={`/clinic/patients/${p.id}`}>
                      <Button variant="outline" size="sm">
                        View Dossier <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

=======

        <div className="flex items-center gap-1.5 self-end sm:self-center shrink-0">
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                viewMode === 'table'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <TableIcon className="w-3.5 h-3.5" />
              <span>Table</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('cards')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                viewMode === 'cards'
                  ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-300 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Cards</span>
            </button>
          </div>
        </div>
      </Card>

      {/* Patient List (Table View vs Cards View) */}
      {viewMode === 'table' ? (
        <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <CardHeader
            title={`Registered Patients (${filteredPatients.length})`}
            subtitle="Click on any patient record to view complete clinical history and past prescriptions"
          />
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 uppercase text-[10px] font-semibold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="p-3.5 text-center w-12">#</th>
                  <th className="p-3.5">Patient ID</th>
                  <th className="p-3.5">Full Name</th>
                  <th className="p-3.5">Contact Details</th>
                  <th className="p-3.5">Blood & Allergies</th>
                  <th className="p-3.5">Registered Date</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredPatients.map((p, idx) => (
                  <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="p-3.5 text-center font-mono font-medium text-slate-400 dark:text-slate-500 text-xs">
                      {idx + 1}
                    </td>
                    <td className="p-3.5 font-mono font-bold text-blue-800 dark:text-blue-400">{p.patientIdNumber}</td>
                    <td className="p-3.5">
                      <div className="font-bold text-slate-900 dark:text-slate-100">{p.name}</div>
                      <div className="text-[10px] text-slate-400 dark:text-slate-500">{p.gender} · DOB: {p.dob}</div>
                    </td>
                    <td className="p-3.5">
                      <div className="text-slate-800 dark:text-slate-200 font-medium">{p.phone}</div>
                      <div className="text-[10px] text-slate-400 dark:text-slate-500">{p.email}</div>
                    </td>
                    <td className="p-3.5">
                      <span className="font-bold text-slate-700 dark:text-slate-300">{p.bloodGroup || '—'}</span>
                      {p.allergies && p.allergies.length > 0 && (
                        <span className="block text-[10px] text-rose-600 dark:text-rose-400 font-semibold mt-0.5">
                          ⚠ Allergies: {p.allergies.join(', ')}
                        </span>
                      )}
                    </td>
                    <td className="p-3.5 text-slate-600 dark:text-slate-400 font-mono">{p.registeredAt}</td>
                    <td className="p-3.5">
                      <Badge variant={p.status}>{p.status}</Badge>
                    </td>
                    <td className="p-3.5 text-right">
                      <Link to={`/clinic/patients/${p.id}`}>
                        <Button variant="outline" size="sm">
                          View Dossier <ArrowRight className="w-3 h-3 ml-1" />
                        </Button>
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      ) : (
        /* Cards View for Mobile & Tablet */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPatients.map((p) => (
            <Card
              key={p.id}
              className="p-5 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
            >
              <div className="space-y-2.5">
                <div className="flex items-start justify-between">
                  <div>
                    <span className="font-mono text-xs font-bold text-blue-700 dark:text-blue-400">
                      {p.patientIdNumber}
                    </span>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white mt-0.5">
                      {p.name}
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      {p.gender} · DOB: {p.dob} · Blood: <strong className="text-slate-700 dark:text-slate-200">{p.bloodGroup || 'O+'}</strong>
                    </p>
                  </div>
                  <Badge variant={p.status} size="sm">{p.status}</Badge>
                </div>

                <div className="space-y-1 text-xs text-slate-600 dark:text-slate-300 font-mono pt-1 border-t border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>{p.phone}</span>
                  </div>
                  <div className="flex items-center gap-1.5 truncate">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate">{p.email}</span>
                  </div>
                </div>

                {p.allergies && p.allergies.length > 0 && (
                  <div className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 text-[11px] text-rose-800 dark:text-rose-300 font-medium">
                    ⚠ Allergies: {p.allergies.join(', ')}
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                <Link to={`/clinic/prescriptions/new?patient=${p.id}`}>
                  <Button variant="ghost" size="sm" className="text-xs h-7 px-2">
                    <PlusCircle className="w-3 h-3 mr-1 text-blue-600" /> Rx
                  </Button>
                </Link>
                <Link to={`/clinic/patients/${p.id}`}>
                  <Button variant="outline" size="sm" className="text-xs h-7">
                    View Dossier <ArrowRight className="w-3 h-3 ml-1" />
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      )}

>>>>>>> origin/main
      {/* New Patient Registration Modal */}
      {isRegisterModalOpen && (
        <Modal
          isOpen={isRegisterModalOpen}
          onClose={() => setIsRegisterModalOpen(false)}
          title="Register New Clinic Patient"
          size="md"
        >
          <form onSubmit={handleRegister} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Full Name *</label>
                <input
                  required
                  type="text"
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Ramesh Kumar"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Phone Number *</label>
                <input
                  required
                  type="tel"
                  value={formPhone}
                  onChange={(e) => setFormPhone(e.target.value)}
                  placeholder="+91 98000 00000"
<<<<<<< HEAD
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-blue-500"
=======
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-blue-500 font-mono"
>>>>>>> origin/main
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Email Address</label>
                <input
                  type="email"
                  value={formEmail}
                  onChange={(e) => setFormEmail(e.target.value)}
                  placeholder="patient@example.demo"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Date of Birth</label>
                <input
                  type="date"
                  value={formDob}
                  onChange={(e) => setFormDob(e.target.value)}
<<<<<<< HEAD
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-blue-500"
=======
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs"
>>>>>>> origin/main
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Gender</label>
                <select
                  value={formGender}
                  onChange={(e) => setFormGender(e.target.value)}
<<<<<<< HEAD
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-blue-500"
=======
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs"
>>>>>>> origin/main
                >
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Blood Group</label>
                <select
                  value={formBloodGroup}
                  onChange={(e) => setFormBloodGroup(e.target.value)}
<<<<<<< HEAD
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-blue-500"
=======
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs font-bold"
>>>>>>> origin/main
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
<<<<<<< HEAD
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
=======
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
>>>>>>> origin/main
                </select>
              </div>
            </div>

            <div>
<<<<<<< HEAD
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Known Allergies (Comma separated)</label>
=======
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Known Drug Allergies</label>
>>>>>>> origin/main
              <input
                type="text"
                value={formAllergies}
                onChange={(e) => setFormAllergies(e.target.value)}
<<<<<<< HEAD
                placeholder="e.g. Penicillin, Latex, NSAIDs"
=======
                placeholder="e.g. Penicillin, Sulfa, Aspirin"
>>>>>>> origin/main
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
<<<<<<< HEAD
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Medical Background / Pre-existing Conditions</label>
=======
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Initial Medical History / Chronic Notes</label>
>>>>>>> origin/main
              <textarea
                rows={2}
                value={formHistory}
                onChange={(e) => setFormHistory(e.target.value)}
<<<<<<< HEAD
                placeholder="Past surgeries, chronic medical conditions, medications..."
=======
                placeholder="e.g. History of Hypertension, Asthma, Previous Surgeries..."
>>>>>>> origin/main
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-blue-500"
              />
            </div>

<<<<<<< HEAD
            <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
              <Button variant="outline" size="sm" onClick={() => setIsRegisterModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" type="submit">
                Save Patient Record
=======
            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" type="button" onClick={() => setIsRegisterModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                Complete Registration
>>>>>>> origin/main
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}
<<<<<<< HEAD

=======
>>>>>>> origin/main

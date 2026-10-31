import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Search, UserPlus, Users, ArrowRight, Phone, Mail, Calendar, FileText } from 'lucide-react';

export function ClinicPatientsPage() {
  const { patients, createPatient, activeClinic } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'cards'
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

  const totalAllergyPatients = patients.filter((p) => p.allergies && p.allergies.length > 0).length;

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
      address: activeClinic.city
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
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Clinical Records</span>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Patient Directory</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Searchable patient registry, allergy warnings, medical histories, and consultation archives.
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

      {/* Search Bar */}
      <Card className="p-4 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search patients by name, patient ID (e.g. PT-1041), or phone number..."
            className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none placeholder:text-slate-400 dark:placeholder:text-slate-500"
          />
        </div>
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
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-blue-500"
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
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Gender</label>
                <select
                  value={formGender}
                  onChange={(e) => setFormGender(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-blue-500"
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
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-blue-500"
                >
                  <option value="A+">A+</option>
                  <option value="A-">A-</option>
                  <option value="B+">B+</option>
                  <option value="B-">B-</option>
                  <option value="O+">O+</option>
                  <option value="O-">O-</option>
                  <option value="AB+">AB+</option>
                  <option value="AB-">AB-</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Known Allergies (Comma separated)</label>
              <input
                type="text"
                value={formAllergies}
                onChange={(e) => setFormAllergies(e.target.value)}
                placeholder="e.g. Penicillin, Latex, NSAIDs"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Medical Background / Pre-existing Conditions</label>
              <textarea
                rows={2}
                value={formHistory}
                onChange={(e) => setFormHistory(e.target.value)}
                placeholder="Past surgeries, chronic medical conditions, medications..."
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="pt-2 flex items-center justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
              <Button variant="outline" size="sm" onClick={() => setIsRegisterModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" type="submit">
                Save Patient Record
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Search, User, FileText, Calendar, Plus, Stethoscope, Phone } from 'lucide-react';

export function DoctorPatientsPage() {
  const { patients, prescriptions, activeClinic } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = patients.filter(
    (p) =>
<<<<<<< HEAD
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.patientIdNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.phone.includes(searchTerm)
=======
      p.clinicId === activeClinic?.id &&
      (p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.patientIdNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.phone.includes(searchTerm))
>>>>>>> origin/main
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
<<<<<<< HEAD
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-800">
              Doctor Patient Panel
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Clinical Patient Panel</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400">
=======
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200">
              Doctor Patient Panel
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Clinical Patient Panel</h1>
          <p className="text-xs text-slate-500">
>>>>>>> origin/main
            Patients under primary care of Dr. Arvind Rao, MDS ({filteredPatients.length} records)
          </p>
        </div>

        <Link to="/doctor/consultation">
          <Button variant="primary" size="sm">
<<<<<<< HEAD
            <Stethoscope className="w-3.5 h-3.5 mr-1.5" />
=======
            <Stethoscope className="w-3.5 h-3.5 mr-1" />
>>>>>>> origin/main
            New Clinical Encounter
          </Button>
        </Link>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
<<<<<<< HEAD
        <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3 top-3" />
=======
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
>>>>>>> origin/main
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search patient by name, ID (e.g. PT-1042), or phone..."
<<<<<<< HEAD
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
=======
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
>>>>>>> origin/main
        />
      </div>

      {/* Patient Cards / Table */}
<<<<<<< HEAD
      <Card className="overflow-hidden border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-3 py-3 text-center w-12 font-semibold">#</th>
=======
      <Card className="overflow-hidden border-slate-200">
        <div className="overflow-x-auto">
          <table className="w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
              <tr>
>>>>>>> origin/main
                <th className="px-4 py-3">Patient ID</th>
                <th className="px-4 py-3">Name & Demographics</th>
                <th className="px-4 py-3">Contact</th>
                <th className="px-4 py-3">Blood Group</th>
                <th className="px-4 py-3">Known Allergies</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
<<<<<<< HEAD
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-slate-400 dark:text-slate-500">
=======
            <tbody className="divide-y divide-slate-100">
              {filteredPatients.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-slate-400">
>>>>>>> origin/main
                    No matching patients found.
                  </td>
                </tr>
              ) : (
<<<<<<< HEAD
                filteredPatients.map((p, idx) => {
                  return (
                    <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                      <td className="px-3 py-3 text-center font-mono font-medium text-slate-400 dark:text-slate-500 text-xs">{idx + 1}</td>
                      <td className="px-4 py-3 font-mono font-bold text-blue-700 dark:text-blue-400">
                        {p.patientIdNumber}
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-bold text-slate-900 dark:text-white">{p.name}</div>
                        <div className="text-xs text-slate-400 dark:text-slate-500">
=======
                filteredPatients.map((p) => {
                  const patientRxs = prescriptions.filter((r) => r.patientId === p.id);
                  return (
                    <tr key={p.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-4 py-3 font-mono font-bold text-blue-700">
                        {p.patientIdNumber}
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-bold text-slate-900">{p.name}</div>
                        <div className="text-[11px] text-slate-400">
>>>>>>> origin/main
                          {p.gender} · DOB: {p.dob}
                        </div>
                      </td>
                      <td className="px-4 py-3">
<<<<<<< HEAD
                        <div className="text-slate-700 dark:text-slate-300 font-mono flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                          {p.phone}
                        </div>
                        <div className="text-xs text-slate-400 dark:text-slate-500">{p.email}</div>
                      </td>
                      <td className="px-4 py-3 font-semibold text-rose-700 dark:text-rose-400">
=======
                        <div className="text-slate-700 font-mono flex items-center gap-1">
                          <Phone className="w-3 h-3 text-slate-400" />
                          {p.phone}
                        </div>
                        <div className="text-[11px] text-slate-400">{p.email}</div>
                      </td>
                      <td className="px-4 py-3 font-semibold text-rose-700">
>>>>>>> origin/main
                        {p.bloodGroup || 'O +ve'}
                      </td>
                      <td className="px-4 py-3">
                        {p.allergies && p.allergies.length > 0 ? (
<<<<<<< HEAD
                          <span className="bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 px-2 py-0.5 rounded text-xs font-semibold">
                            {p.allergies.join(', ')}
                          </span>
                        ) : (
                          <span className="text-slate-400 dark:text-slate-500">No known allergies</span>
=======
                          <span className="bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded text-[11px] font-semibold">
                            {p.allergies.join(', ')}
                          </span>
                        ) : (
                          <span className="text-slate-400">No known allergies</span>
>>>>>>> origin/main
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <Badge variant="success" size="sm">Active</Badge>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Link to={`/doctor/consultation`}>
                          <Button variant="secondary" size="sm" className="h-7 text-xs">
<<<<<<< HEAD
                            <Stethoscope className="w-3 h-3 mr-1 text-blue-600 dark:text-blue-400" />
=======
                            <Stethoscope className="w-3 h-3 mr-1 text-blue-600" />
>>>>>>> origin/main
                            Consult
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
<<<<<<< HEAD
=======

>>>>>>> origin/main

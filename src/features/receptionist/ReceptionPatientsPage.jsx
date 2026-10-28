import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Search, UserPlus, Phone, Calendar, ArrowRight } from 'lucide-react';

export function ReceptionPatientsPage() {
  const { patients } = useApp();
  const [search, setSearch] = useState('');

  const filtered = patients.filter((p) =>

    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.patientIdNumber.toLowerCase().includes(search.toLowerCase()) ||
    p.phone.includes(search)
  );

  const allergicCount = patients.filter((p) => p.allergies && p.allergies.length > 0).length;


  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Front Desk Directory</span>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">Patient Look-Up & Registration</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">

            Quick patient search by name, phone, or unique patient ID number.
          </p>
        </div>

        <Link to="/reception/patients/new">
          <Button variant="primary" size="md" icon={UserPlus} className="shadow-md shadow-blue-500/20">
            Register New Patient

          </Button>
        </Link>
      </div>

      {/* Quick metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 border-slate-200 dark:border-slate-800 dark:bg-slate-900/90 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Registered</p>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">{patients.length}</p>
          </div>
          <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-1 rounded-lg">Active Roster</span>
        </Card>
        <Card className="p-4 border-slate-200 dark:border-slate-800 dark:bg-slate-900/90 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Filtered Results</p>
            <p className="text-2xl font-extrabold text-blue-600 dark:text-blue-400 mt-1">{filtered.length}</p>
          </div>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Search matches</span>
        </Card>
        <Card className="p-4 border-slate-200 dark:border-slate-800 dark:bg-slate-900/90 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Clinical Allergy Alerts</p>
            <p className="text-2xl font-extrabold text-rose-600 dark:text-rose-400 mt-1">{allergicCount}</p>
          </div>
          <span className="text-xs font-medium text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-2 py-1 rounded-lg">Requires Tagging</span>
        </Card>
      </div>

      <Card className="p-4 border-slate-200 dark:border-slate-800 dark:bg-slate-900/90 shadow-sm">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />

          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search patients by name, PT ID, or phone number..."
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 text-sm focus:ring-2 focus:ring-blue-500"

          />
        </div>
      </Card>

      <Card className="border-slate-200 dark:border-slate-800 dark:bg-slate-900/90 shadow-sm overflow-hidden">

        <CardHeader
          title={`Registered Patients (${filtered.length})`}
          subtitle="Showing all patients registered at this clinic"
        />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 uppercase text-xs font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-4 text-center w-12">#</th>
                <th className="p-4">Patient ID</th>
                <th className="p-4">Name</th>
                <th className="p-4">Mobile Phone</th>
                <th className="p-4">Gender / DOB</th>
                <th className="p-4">Allergies</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filtered.map((p, idx) => (
                <tr key={p.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="p-4 text-center font-mono font-medium text-slate-400 dark:text-slate-500 text-xs">
                    {idx + 1}
                  </td>
                  <td className="p-4 font-mono font-bold text-blue-700 dark:text-blue-400">{p.patientIdNumber}</td>
                  <td className="p-4 font-semibold text-slate-900 dark:text-slate-100">{p.name}</td>
                  <td className="p-4 text-slate-700 dark:text-slate-300 font-medium">{p.phone}</td>
                  <td className="p-4 text-slate-500 dark:text-slate-400">{p.gender} · {p.dob}</td>
                  <td className="p-4">
                    {p.allergies && p.allergies.length > 0 ? (
                      <span className="text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
                        ⚠ {p.allergies.join(', ')}
                      </span>
                    ) : (
                      <span className="text-slate-400 dark:text-slate-500 text-xs">None Reported</span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <Link to={`/clinic/patients/${p.id}`}>
                      <Button variant="outline" size="sm" className="font-medium">

                        View Dossier
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-slate-400 dark:text-slate-500 text-sm">
                    No patients found matching "{search}".
                  </td>
                </tr>
              )}

            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}


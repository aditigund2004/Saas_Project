import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Search, UserPlus, Phone, Calendar, ArrowRight } from 'lucide-react';

export function ReceptionPatientsPage() {
  const { patients, activeClinic } = useApp();
  const [search, setSearch] = useState('');

  const clinicPatients = patients.filter((p) => p.clinicId === activeClinic?.id);
  const filtered = clinicPatients.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.patientIdNumber.toLowerCase().includes(search.toLowerCase()) ||
    p.phone.includes(search)
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Front Desk Directory</span>
          <h1 className="text-2xl font-extrabold text-slate-900">Patient Look-Up & Registration</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Quick patient search by name, phone, or unique patient ID number.
          </p>
        </div>

        <Link to="/reception/patients/new">
          <Button variant="primary" size="sm" icon={UserPlus}>
            + Register New Patient
          </Button>
        </Link>
      </div>

      <Card className="p-4 border-slate-200">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search patients by name, PT ID, or phone number..."
            className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </Card>

      <Card>
        <CardHeader
          title={`Registered Patients (${filtered.length})`}
          subtitle="Showing all patients registered at this clinic"
        />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3.5">Patient ID</th>
                <th className="p-3.5">Name</th>
                <th className="p-3.5">Mobile Phone</th>
                <th className="p-3.5">Gender / DOB</th>
                <th className="p-3.5">Allergies</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/50">
                  <td className="p-3.5 font-mono font-bold text-blue-800">{p.patientIdNumber}</td>
                  <td className="p-3.5 font-bold text-slate-900">{p.name}</td>
                  <td className="p-3.5 text-slate-700 font-medium">{p.phone}</td>
                  <td className="p-3.5 text-slate-500">{p.gender} · {p.dob}</td>
                  <td className="p-3.5">
                    {p.allergies && p.allergies.length > 0 ? (
                      <span className="text-[11px] font-bold text-rose-600">
                        ⚠ {p.allergies.join(', ')}
                      </span>
                    ) : (
                      <span className="text-slate-400">None</span>
                    )}
                  </td>
                  <td className="p-3.5 text-right">
                    <Link to={`/clinic/patients/${p.id}`}>
                      <Button variant="outline" size="sm">
                        View Dossier
                      </Button>
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}


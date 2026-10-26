import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Briefcase, Search, Plus, Clock, Edit2 } from 'lucide-react';

export function AccountsServicesPage() {
  const { activeClinic, formatCurrency } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const services = activeClinic.services || [
    { id: 'srv-1', name: 'Comprehensive Dental Consultation', durationMinutes: 30, fee: 800, category: 'Consultation', description: 'Primary oral checkup, periodontal probing, and treatment counseling' },
    { id: 'srv-2', name: 'Single-Visit Endodontic Therapy (RCT)', durationMinutes: 60, fee: 4500, category: 'Endodontics', description: 'Rotary biomechanical prep, apex locator length determination, and obturation' },
    { id: 'srv-3', name: 'Full Zirconia Crown Placement', durationMinutes: 45, fee: 9500, category: 'Prosthodontics', description: 'Digital scan intraoral impression and monolithic CAD/CAM crown bonding' },
    { id: 'srv-4', name: 'Ultrasonic Scaling & Polishing', durationMinutes: 30, fee: 1800, category: 'Preventive', description: 'Full mouth supragingival calculus removal and air polishing' }
  ];

  const filteredServices = services.filter((s) =>
    s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200 uppercase tracking-wide">
              Tariff & Pricing Master
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">Clinical Service Tariffs</h1>
          <p className="text-xs text-slate-500">
            Standard OPD treatment procedures, standard consultation durations, and fee schedule
          </p>
        </div>
      </div>

      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search clinical procedures and categories..."
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs bg-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredServices.map((srv) => (
          <Card key={srv.id} className="p-5 border-slate-200 space-y-3 flex flex-col justify-between">
            <div className="space-y-1.5">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-bold text-sm text-slate-900">{srv.name}</h3>
                <Badge variant="teal" size="sm">{srv.category}</Badge>
              </div>
              <p className="text-xs text-slate-500 leading-relaxed">
                {srv.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-slate-500">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{srv.durationMinutes} mins</span>
              </div>
              <div className="font-mono font-bold text-blue-800 text-base">
                {formatCurrency(srv.fee)}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}


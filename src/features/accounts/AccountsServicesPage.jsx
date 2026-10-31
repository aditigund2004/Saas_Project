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
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-xs font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-full border border-blue-200 dark:border-blue-800 uppercase tracking-wide">
              Tariff & Pricing Master
            </span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">Clinical Service Tariffs</h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Standard OPD treatment procedures, standard consultation durations, and fee schedule
          </p>
        </div>
      </div>

      <div className="relative max-w-md">
        <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search clinical procedures and categories..."
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 focus:outline-none shadow-sm"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredServices.map((srv) => (
          <Card key={srv.id} className="p-5 border-slate-200 dark:border-slate-800 dark:bg-slate-900 space-y-3.5 flex flex-col justify-between shadow-sm">
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <h3 className="font-bold text-base text-slate-900 dark:text-white">{srv.name}</h3>
                <Badge variant="teal" size="sm">{srv.category}</Badge>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                {srv.description}
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <Clock className="w-4 h-4 text-slate-400" />
                <span>{srv.durationMinutes} mins</span>
              </div>
              <div className="font-mono font-bold text-blue-700 dark:text-blue-400 text-base">
                {formatCurrency(srv.fee)}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

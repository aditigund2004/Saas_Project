import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import {
  Calendar,
  Stethoscope,
  FileText,
  Activity,
  Award,
  Download,
  Filter,
  Search,
  ChevronRight,
  ShieldCheck,
  Clock,
  Sparkles,
  Heart,
  Pill,
  CheckCircle2,
  AlertCircle,
  Eye,
  Building2,
  FileSpreadsheet,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function HealthTimeline({ events = [], onEventClick }) {
  const { isPatientFriendlyMode } = useApp();
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Filter categories
  const categories = [
    { key: 'all', label: 'All Milestones' },
    { key: 'consultation', label: 'Consultations' },
    { key: 'prescription', label: 'Prescriptions' },
    { key: 'lab', label: 'Diagnostic Labs' },
    { key: 'vitals', label: 'Vitals & BP' },
    { key: 'milestone', label: 'Health Goals' }
  ];

  const filteredEvents = events.filter((ev) => {
    const matchesFilter = filterType === 'all' || ev.type === filterType;
    const matchesSearch =
      !searchQuery ||
      ev.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.doctor?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.summary?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.clinic?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const getEventBadge = (type) => {
    switch (type) {
      case 'consultation':
        return { icon: Stethoscope, bg: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300', border: 'border-blue-500' };
      case 'prescription':
        return { icon: Pill, bg: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300', border: 'border-emerald-500' };
      case 'lab':
        return { icon: FileSpreadsheet, bg: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300', border: 'border-amber-500' };
      case 'vitals':
        return { icon: Heart, bg: 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300', border: 'border-rose-500' };
      case 'milestone':
        return { icon: Award, bg: 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300', border: 'border-purple-500' };
      default:
        return { icon: FileText, bg: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300', border: 'border-slate-400' };
    }
  };

  const handleOpenDetail = (ev) => {
    setSelectedEvent(ev);
    if (onEventClick) onEventClick(ev);
  };

  return (
    <div className="space-y-6">
      {/* Top Controls & Category Filters */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search timeline events, diagnoses, doctors, or tests..."
            className="w-full text-xs pl-9 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-hidden focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Categories */}
        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((c) => (
            <button
              key={c.key}
              type="button"
              onClick={() => setFilterType(c.key)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                filterType === c.key
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Living Vertical Timeline */}
      {filteredEvents.length === 0 ? (
        <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
          <Activity className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto mb-3 animate-pulse" />
          <h4 className="font-bold text-slate-800 dark:text-slate-200">No medical events found</h4>
          <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
            Try adjusting your search keywords or switching category filters to see your complete healthcare journey.
          </p>
        </div>
      ) : (
        <div className="relative pl-6 sm:pl-8 border-l-2 border-blue-200 dark:border-blue-900/60 space-y-6">
          {filteredEvents.map((ev, index) => {
            const badgeMeta = getEventBadge(ev.type);
            const Icon = badgeMeta.icon;

            return (
              <div key={ev.id || index} className="relative group">
                {/* Node circle on timeline */}
                <div
                  className={`absolute -left-[31px] sm:-left-[39px] top-4 w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 ${badgeMeta.border} ${badgeMeta.bg} flex items-center justify-center shadow-xs transition-transform group-hover:scale-110`}
                >
                  <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                </div>

                {/* Event Card */}
                <div
                  onClick={() => handleOpenDetail(ev)}
                  className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs hover:border-blue-400 dark:hover:border-blue-500/60 transition-all cursor-pointer"
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-slate-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {ev.date} · {ev.time}
                        </span>
                        <Badge variant="outline" size="sm">
                          {ev.category}
                        </Badge>
                        {ev.status && (
                          <Badge variant="success" size="sm">
                            {ev.status}
                          </Badge>
                        )}
                      </div>

                      <h3 className={`font-bold text-slate-900 dark:text-white ${isPatientFriendlyMode ? 'text-lg' : 'text-base'}`}>
                        {ev.title}
                      </h3>

                      <p className="text-xs text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                        {ev.summary}
                      </p>
                    </div>

                    <div className="text-left sm:text-right shrink-0">
                      <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                        {ev.doctor}
                      </span>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                        {ev.clinic}
                      </span>
                      <div className="mt-2 hidden sm:flex items-center justify-end text-blue-600 dark:text-blue-400 text-xs font-bold gap-1 group-hover:translate-x-1 transition-transform">
                        <span>View Details</span>
                        <ChevronRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>

                  {/* Highlights Bar */}
                  {ev.details && (
                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap gap-2 text-xs">
                      {ev.details.vitals && (
                        <div className="px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 font-semibold text-[11px] flex items-center gap-1">
                          <Heart className="w-3 h-3" /> BP: {ev.details.vitals.bp} | Pulse: {ev.details.vitals.pulse}
                        </div>
                      )}
                      {ev.details.diagnosis && (
                        <div className="px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 font-semibold text-[11px] flex items-center gap-1">
                          <Stethoscope className="w-3 h-3" /> Dx: {ev.details.diagnosis}
                        </div>
                      )}
                      {ev.details.nextFollowUp && (
                        <div className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-semibold text-[11px] flex items-center gap-1">
                          <Calendar className="w-3 h-3" /> Next Due: {ev.details.nextFollowUp}
                        </div>
                      )}
                      {ev.attachments && (
                        <div className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold text-[11px] flex items-center gap-1">
                          <FileText className="w-3 h-3" /> {ev.attachments.length} Document(s)
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Detail Modal */}
      {selectedEvent && (
        <Modal
          isOpen={!!selectedEvent}
          onClose={() => setSelectedEvent(null)}
          title={selectedEvent.title}
          size="lg"
        >
          <div className="space-y-5">
            {/* Meta Header */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                  {selectedEvent.category} · {selectedEvent.status}
                </span>
                <div className="font-extrabold text-base text-slate-900 dark:text-white">
                  {selectedEvent.doctor}
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {selectedEvent.specialty} · {selectedEvent.clinic}
                </div>
              </div>

              <div className="text-xs text-slate-600 dark:text-slate-300 font-bold bg-white dark:bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700">
                {selectedEvent.date} at {selectedEvent.time}
              </div>
            </div>

            {/* Clinical Details */}
            {selectedEvent.details && (
              <div className="space-y-3 text-xs">
                {selectedEvent.details.chiefComplaint && (
                  <div>
                    <h5 className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[10px]">
                      Chief Complaint & Presenting Reason
                    </h5>
                    <p className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-850 text-slate-800 dark:text-slate-200 mt-1">
                      {selectedEvent.details.chiefComplaint}
                    </p>
                  </div>
                )}

                {selectedEvent.details.diagnosis && (
                  <div>
                    <h5 className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[10px]">
                      Diagnoses Recorded by Physician
                    </h5>
                    <p className="p-2.5 rounded-lg bg-blue-50/60 dark:bg-blue-950/40 text-blue-900 dark:text-blue-200 font-semibold mt-1">
                      {selectedEvent.details.diagnosis}
                    </p>
                  </div>
                )}

                {selectedEvent.details.treatmentPlan && (
                  <div>
                    <h5 className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[10px]">
                      Clinical Care & Treatment Plan
                    </h5>
                    <p className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-850 text-slate-800 dark:text-slate-200 mt-1">
                      {selectedEvent.details.treatmentPlan}
                    </p>
                  </div>
                )}

                {selectedEvent.details.vitals && (
                  <div>
                    <h5 className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[10px]">
                      Recorded Vital Signs
                    </h5>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-1">
                      {Object.entries(selectedEvent.details.vitals).map(([k, v]) => (
                        <div key={k} className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-center">
                          <span className="text-[10px] text-slate-400 uppercase font-bold block">{k}</span>
                          <span className="font-bold text-slate-900 dark:text-white text-xs">{v}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedEvent.details.prescriptions && selectedEvent.details.prescriptions.length > 0 && (
                  <div>
                    <h5 className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[10px]">
                      Prescribed Medications
                    </h5>
                    <div className="space-y-1.5 mt-1">
                      {selectedEvent.details.prescriptions.map((p, i) => (
                        <div key={i} className="p-2 rounded-lg bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 font-medium flex items-center gap-2">
                          <Pill className="w-3.5 h-3.5 text-emerald-600" />
                          <span>{p}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedEvent.details.values && (
                  <div>
                    <h5 className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider text-[10px]">
                      Laboratory Diagnostic Markers
                    </h5>
                    <div className="border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden mt-1">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500">
                          <tr>
                            <th className="p-2 font-bold">Investigation</th>
                            <th className="p-2 font-bold">Observed</th>
                            <th className="p-2 font-bold">Reference</th>
                            <th className="p-2 font-bold">Interpretation</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                          {selectedEvent.details.values.map((val, idx) => (
                            <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50">
                              <td className="p-2 font-semibold text-slate-900 dark:text-white">{val.test}</td>
                              <td className="p-2 font-bold text-blue-600 dark:text-blue-400">{val.result}</td>
                              <td className="p-2 text-slate-500">{val.reference}</td>
                              <td className="p-2">
                                <Badge variant={val.flag === 'Normal' || val.flag === 'Optimal' ? 'success' : 'warning'} size="sm">
                                  {val.flag}
                                </Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Actions */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center">
              <span className="text-[11px] text-slate-400">
                Verified Medical Record · ClinicOS Vault
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.print()}
                className="font-bold"
              >
                <Download className="w-3.5 h-3.5 mr-1.5" /> Print / Save Event
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}


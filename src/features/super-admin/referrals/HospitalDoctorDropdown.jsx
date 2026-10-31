import React, { useState, useEffect, useRef } from 'react';
import { Search, CheckCircle2, ChevronDown, Building2, User, X } from 'lucide-react';

/**
 * Custom Searchable Dropdown for Selecting Registered Hospital or Associated Doctor
 * Solves OS/Browser native select popup dark-mode unreadability and provides high contrast.
 */
export function HospitalDoctorDropdown({
  clinics = [],
  doctors = [],
  selectedTarget = '',
  onSelectTarget
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Compute selected display label
  let selectedDisplay = null;
  if (selectedTarget) {
    if (selectedTarget.startsWith('doctor:')) {
      const [, cId, dId] = selectedTarget.split(':');
      const doc = doctors.find((d) => d.id === dId);
      const clinic = clinics.find((c) => c.id === cId);
      if (doc) {
        selectedDisplay = {
          type: 'doctor',
          title: doc.name,
          subtitle: `${doc.specialty || 'Doctor'} · ${clinic?.name || doc.clinicName || 'Clinic'}`
        };
      }
    } else if (selectedTarget.startsWith('clinic:')) {
      const cId = selectedTarget.replace('clinic:', '');
      const clinic = clinics.find((c) => c.id === cId);
      if (clinic) {
        const count = doctors.filter((d) => d.clinicId === clinic.id).length;
        selectedDisplay = {
          type: 'clinic',
          title: clinic.name,
          subtitle: `${clinic.city || 'Hospital Network'} · All Doctors (${count})`
        };
      }
    }
  }

  // Filter clinics and doctors by search query
  const searchLower = search.trim().toLowerCase();
  const filteredClinics = clinics
    .map((c) => {
      const clinicDocs = doctors.filter((d) => d.clinicId === c.id);
      const clinicMatches =
        !searchLower ||
        c.name.toLowerCase().includes(searchLower) ||
        (c.city || '').toLowerCase().includes(searchLower);

      const matchedDocs = searchLower
        ? clinicDocs.filter(
            (d) =>
              d.name.toLowerCase().includes(searchLower) ||
              (d.specialty || '').toLowerCase().includes(searchLower)
          )
        : clinicDocs;

      if (clinicMatches || matchedDocs.length > 0) {
        return {
          clinic: c,
          doctors: matchedDocs.length > 0 ? matchedDocs : clinicDocs
        };
      }
      return null;
    })
    .filter(Boolean);

  return (
    <div className="relative" ref={dropdownRef}>
      <label className="block text-xs font-bold text-slate-700 dark:text-slate-200 mb-1 flex items-center justify-between">
        <span className="flex items-center gap-1.5">
          <Building2 className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
          Registered Hospital & Associated Doctor *
        </span>
        <span className="text-[10px] font-semibold text-blue-600 dark:text-blue-400">
          Links coupon to profile
        </span>
      </label>

      {/* Main trigger button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-3 py-2 text-xs rounded-xl border border-blue-300 dark:border-blue-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex items-center justify-between shadow-xs hover:border-blue-500 dark:hover:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-left"
      >
        <div className="flex items-center gap-2 min-w-0">
          {selectedDisplay ? (
            <>
              <span className="text-base shrink-0">
                {selectedDisplay.type === 'doctor' ? '👨‍⚕️' : '🏥'}
              </span>
              <div className="truncate">
                <span className="font-bold text-slate-900 dark:text-white block truncate">
                  {selectedDisplay.title}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate">
                  {selectedDisplay.subtitle}
                </span>
              </div>
            </>
          ) : (
            <span className="text-slate-400 dark:text-slate-500 font-medium truncate">
              -- Choose Hospital or Doctor to link coupon --
            </span>
          )}
        </div>

        <div className="flex items-center gap-1.5 shrink-0 ml-2">
          {selectedTarget && (
            <span
              onClick={(e) => {
                e.stopPropagation();
                onSelectTarget('');
              }}
              className="p-1 rounded-md text-slate-400 hover:text-rose-600 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title="Clear selection"
            >
              <X className="w-3.5 h-3.5" />
            </span>
          )}
          <ChevronDown
            className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
              isOpen ? 'rotate-180 text-blue-500' : ''
            }`}
          />
        </div>
      </button>

      {/* Popover Dropdown List with explicit High-Contrast Dark Mode Styling */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-1.5 z-50 rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-100">
          {/* Quick search input */}
          <div className="p-2 border-b border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-850">
            <div className="relative">
              <Search className="w-3.5 h-3.5 absolute left-2.5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-slate-400" />
              <input
                type="text"
                autoFocus
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search hospital or doctor name..."
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* List items with high-contrast text */}
          <div className="max-h-64 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/80">
            {filteredClinics.length === 0 ? (
              <div className="p-4 text-center text-xs text-slate-500 dark:text-slate-400">
                No hospitals or doctors match "{search}".
              </div>
            ) : (
              filteredClinics.map(({ clinic, doctors: docList }) => {
                const isClinicSelected = selectedTarget === `clinic:${clinic.id}`;

                return (
                  <div key={clinic.id} className="py-1">
                    {/* Hospital option header */}
                    <div
                      onClick={() => {
                        onSelectTarget(`clinic:${clinic.id}`);
                        setIsOpen(false);
                        setSearch('');
                      }}
                      className={`px-3 py-2 flex items-center justify-between cursor-pointer transition-colors ${
                        isClinicSelected
                          ? 'bg-blue-600 text-white font-bold'
                          : 'bg-slate-100/90 dark:bg-slate-800 hover:bg-blue-50 dark:hover:bg-slate-700/80 text-slate-900 dark:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <span className="text-base shrink-0">🏥</span>
                        <div className="truncate">
                          <span
                            className={`text-xs font-extrabold block truncate ${
                              isClinicSelected ? 'text-white' : 'text-slate-900 dark:text-white'
                            }`}
                          >
                            {clinic.name}
                          </span>
                          <span
                            className={`text-[10px] block truncate ${
                              isClinicSelected ? 'text-blue-100' : 'text-slate-500 dark:text-slate-300'
                            }`}
                          >
                            {clinic.city || 'Healthcare Network'} · All Doctors ({docList.length})
                          </span>
                        </div>
                      </div>

                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase shrink-0 ${
                          isClinicSelected
                            ? 'bg-white/20 text-white'
                            : 'bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300'
                        }`}
                      >
                        All Doctors
                      </span>
                    </div>

                    {/* Associated Doctors under this hospital */}
                    <div className="pl-3 pr-2 py-1 space-y-0.5">
                      {docList.map((doc) => {
                        const isDocSelected =
                          selectedTarget === `doctor:${clinic.id}:${doc.id}`;

                        return (
                          <div
                            key={doc.id}
                            onClick={() => {
                              onSelectTarget(`doctor:${clinic.id}:${doc.id}`);
                              setIsOpen(false);
                              setSearch('');
                            }}
                            className={`px-3 py-2 rounded-xl flex items-center justify-between cursor-pointer transition-colors group ${
                              isDocSelected
                                ? 'bg-blue-600 text-white font-bold shadow-xs'
                                : 'text-slate-900 dark:text-slate-100 hover:bg-blue-50/80 dark:hover:bg-slate-800 hover:text-blue-700 dark:hover:text-blue-300'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <span className="text-base shrink-0">👨‍⚕️</span>
                              <div className="truncate">
                                <span
                                  className={`text-xs block truncate ${
                                    isDocSelected
                                      ? 'text-white font-bold'
                                      : 'text-slate-900 dark:text-slate-100 font-bold group-hover:text-blue-600 dark:group-hover:text-blue-400'
                                  }`}
                                >
                                  {doc.name}
                                </span>
                                <span
                                  className={`text-[11px] block truncate ${
                                    isDocSelected
                                      ? 'text-blue-100 font-medium'
                                      : 'text-slate-500 dark:text-slate-300 font-medium'
                                  }`}
                                >
                                  {doc.specialty || 'General Practitioner'}
                                </span>
                              </div>
                            </div>

                            {isDocSelected && (
                              <CheckCircle2 className="w-4 h-4 text-white shrink-0 ml-2" />
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}


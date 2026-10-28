import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
<<<<<<< HEAD
import { Card } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import {
  Building2,
  PlusCircle,
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  LayoutGrid,
  List,
  Search,
  ExternalLink
} from 'lucide-react';
=======
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Building2, PlusCircle, MapPin, Phone, Mail, Clock, CheckCircle } from 'lucide-react';
>>>>>>> origin/main

export function ClinicBranchesPage() {
  const { activeClinic, activeBranch, switchBranch, showToast } = useApp();
  const [isNewBranchModalOpen, setIsNewBranchModalOpen] = useState(false);
<<<<<<< HEAD
  const [viewMode, setViewMode] = useState('table'); // 'table' | 'cards'
  const [searchTerm, setSearchTerm] = useState('');

  const filteredBranches = activeClinic.branches.filter((b) => {
    return (
      b.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.address.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800">
        <div>
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Locations & Centers</span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">Multi-Branch Facilities</h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage your primary hospital center and suburban satellite facilities from a single unified tenant account.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          {/* View Mode Switcher */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              type="button"
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'table'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
              <span className="hidden sm:inline">Table</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('cards')}
              className={`p-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                viewMode === 'cards'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
              }`}
              title="Card Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
              <span className="hidden sm:inline">Cards</span>
            </button>
          </div>

          <Button
            variant="primary"
            size="sm"
            icon={PlusCircle}
            onClick={() => setIsNewBranchModalOpen(true)}
          >
            Add Satellite Branch
          </Button>
        </div>
      </div>

      {/* Filter / Search Bar */}
      <div className="flex items-center justify-between gap-3 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div className="flex-1 relative max-w-md">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search branches by name, city, or facility code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-xl text-sm text-slate-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="text-xs font-semibold text-slate-500 dark:text-slate-400">
          Showing <strong className="text-slate-800 dark:text-white">{filteredBranches.length}</strong> Branch Facilities
        </div>
      </div>

      {/* Main Table Structure (Default) */}
      {viewMode === 'table' ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">
                  <th className="py-3.5 px-3 text-center w-12">#</th>
                  <th className="py-3.5 px-4">Facility & Code</th>
                  <th className="py-3.5 px-3">Classification</th>
                  <th className="py-3.5 px-3">City & Address</th>
                  <th className="py-3.5 px-3">Operating Hours</th>
                  <th className="py-3.5 px-3">Contact</th>
                  <th className="py-3.5 px-3">Staffing</th>
                  <th className="py-3.5 px-4 text-right">Status & Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredBranches.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-8 text-center text-slate-500 dark:text-slate-400">
                      No branches match your search criteria.
                    </td>
                  </tr>
                ) : (
                  filteredBranches.map((b, idx) => {
                    const isActive = b.id === activeBranch?.id;

                    return (
                      <tr
                        key={b.id}
                        className={`hover:bg-blue-50/40 dark:hover:bg-slate-800/40 transition-colors group ${
                          isActive ? 'bg-blue-50/20 dark:bg-blue-950/20' : ''
                        }`}
                      >
                        <td className="py-3.5 px-3 text-center font-mono font-medium text-slate-400 dark:text-slate-500 text-xs">
                          {idx + 1}
                        </td>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold shrink-0 border border-blue-100 dark:border-blue-900/40">
                              <Building2 className="w-4.5 h-4.5" />
                            </div>
                            <div>
                              <div className="font-bold text-slate-900 dark:text-white text-base group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {b.name}
                              </div>
                              <span className="font-mono text-[11px] font-bold text-slate-400 dark:text-slate-500 uppercase">
                                {b.code}
                              </span>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-3">
                          {b.isMain ? (
                            <Badge variant="Active">Primary Facility</Badge>
                          ) : (
                            <Badge variant="Pending">Satellite Branch</Badge>
                          )}
                        </td>

                        <td className="py-3.5 px-3">
                          <div className="flex items-center gap-1.5 text-xs text-slate-700 dark:text-slate-300">
                            <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                            <span className="font-medium">{b.address}, {b.city}</span>
                          </div>
                        </td>

                        <td className="py-3.5 px-3">
                          <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300">
                            <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                            <span>{b.operatingHours}</span>
                          </div>
                        </td>

                        <td className="py-3.5 px-3">
                          <div className="text-xs space-y-0.5">
                            <div className="text-slate-700 dark:text-slate-300 flex items-center gap-1">
                              <Phone className="w-3 h-3 text-slate-400" />
                              <span>{b.phone}</span>
                            </div>
                            <div className="text-slate-500 dark:text-slate-400 flex items-center gap-1">
                              <Mail className="w-3 h-3 text-slate-400" />
                              <span className="truncate max-w-[140px]">{b.email}</span>
                            </div>
                          </div>
                        </td>

                        <td className="py-3.5 px-3">
                          <span className="font-semibold text-xs text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-700">
                            {b.activeDoctorsCount} Practitioners
                          </span>
                        </td>

                        <td className="py-3.5 px-4 text-right">
                          {isActive ? (
                            <span className="inline-flex items-center gap-1 text-xs font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/50 border border-blue-200 dark:border-blue-900/50 px-2.5 py-1 rounded-lg">
                              <CheckCircle className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" /> Current Active
                            </span>
                          ) : (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => switchBranch(b.id)}
                              className="text-xs"
                            >
                              Switch Branch
                            </Button>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
          <div className="p-3 bg-slate-50 dark:bg-slate-800/40 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 flex items-center justify-between">
            <span>Unified Tenant Infrastructure: {activeClinic.name}</span>
            <span>Active Selected Center: {activeBranch?.name}</span>
          </div>
        </div>
      ) : (
        /* Card Grid Alternative View */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredBranches.map((b) => {
            const isActive = b.id === activeBranch?.id;

            return (
              <Card
                key={b.id}
                className={`p-6 border flex flex-col justify-between space-y-4 transition-all bg-white dark:bg-slate-900 ${
                  isActive ? 'border-blue-500 shadow-md ring-1 ring-blue-500/20' : 'border-slate-200 dark:border-slate-800'
                }`}
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-xl bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-base font-bold text-slate-900 dark:text-white">{b.name}</h3>
                        <span className="font-mono text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase">{b.code}</span>
                      </div>
                    </div>

                    {b.isMain ? (
                      <Badge variant="Active">Primary Facility</Badge>
                    ) : (
                      <Badge variant="Pending">Satellite Branch</Badge>
                    )}
                  </div>

                  <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 text-xs text-slate-600 dark:text-slate-300 space-y-1.5 border border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                      <span>{b.address}, {b.city}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                      <span>{b.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                      <span>{b.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0" />
                      <span>{b.operatingHours}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                    {b.activeDoctorsCount} Assigned Practitioners
                  </span>

                  {isActive ? (
                    <span className="text-xs font-bold text-blue-700 dark:text-blue-400 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" /> Active Workspace Branch
                    </span>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => switchBranch(b.id)}
                    >
                      Switch to this Branch
                    </Button>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      )}
=======

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Locations & Centers</span>
          <h1 className="text-2xl font-extrabold text-slate-900">Multi-Branch Facilities</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage your primary hospital/clinic center and suburban satellite facilities from a single tenant account.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          icon={PlusCircle}
          onClick={() => setIsNewBranchModalOpen(true)}
        >
          Add Satellite Branch
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {activeClinic.branches.map((b) => {
          const isActive = b.id === activeBranch?.id;

          return (
            <Card
              key={b.id}
              className={`p-6 border flex flex-col justify-between space-y-4 transition-all ${
                isActive ? 'border-blue-500 shadow-md ring-1 ring-blue-500/20' : 'border-slate-200'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
                      <Building2 className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-slate-900">{b.name}</h3>
                      <span className="font-mono text-[10px] text-slate-400 font-bold uppercase">{b.code}</span>
                    </div>
                  </div>

                  {b.isMain ? (
                    <Badge variant="Active">Primary Facility</Badge>
                  ) : (
                    <Badge variant="Pending">Satellite Branch</Badge>
                  )}
                </div>

                <div className="p-3 rounded-xl bg-slate-50 text-xs text-slate-600 space-y-1.5 border border-slate-100">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{b.address}, {b.city}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{b.phone}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{b.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                    <span>{b.operatingHours}</span>
                  </div>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs text-slate-500 font-medium">
                  {b.activeDoctorsCount} Assigned Practitioners
                </span>

                {isActive ? (
                  <span className="text-xs font-bold text-blue-700 flex items-center gap-1">
                    <CheckCircle className="w-4 h-4 text-blue-600" /> Active Workspace Branch
                  </span>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => switchBranch(b.id)}
                  >
                    Switch to this Branch
                  </Button>
                )}
              </div>
            </Card>
          );
        })}
      </div>
>>>>>>> origin/main

      {isNewBranchModalOpen && (
        <Modal
          isOpen={isNewBranchModalOpen}
          onClose={() => setIsNewBranchModalOpen(false)}
          title="Add New Clinic Branch"
          size="md"
        >
          <div className="space-y-3 text-xs">
<<<<<<< HEAD
            <p className="text-slate-600 dark:text-slate-300">
              Your Professional plan supports up to 3 branches. Enter satellite branch details:
            </p>
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Branch Name</label>
              <input type="text" placeholder="e.g. South Bay Specialty Center" className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-xl" />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Branch Code (3-6 chars)</label>
              <input type="text" placeholder="e.g. SB-01" className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-xl uppercase font-mono" />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Address & Locality</label>
              <input type="text" placeholder="Street, Building, Area" className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-xl" />
            </div>
            <div className="pt-2 flex justify-end gap-2 border-t border-slate-100 dark:border-slate-800">
=======
            <p className="text-slate-600">
              Your Professional plan supports up to 3 branches. Enter satellite branch details:
            </p>
            <div>
              <label className="block font-semibold mb-1">Branch Name</label>
              <input type="text" placeholder="e.g. South Bay Specialty Center" className="w-full px-3 py-2 border rounded-xl" />
            </div>
            <div>
              <label className="block font-semibold mb-1">Branch Code (3-6 chars)</label>
              <input type="text" placeholder="e.g. SB-01" className="w-full px-3 py-2 border rounded-xl uppercase font-mono" />
            </div>
            <div>
              <label className="block font-semibold mb-1">Address & Locality</label>
              <input type="text" placeholder="Street, Building, Area" className="w-full px-3 py-2 border rounded-xl" />
            </div>
            <div className="pt-2 flex justify-end gap-2">
>>>>>>> origin/main
              <Button variant="outline" size="sm" onClick={() => setIsNewBranchModalOpen(false)}>Cancel</Button>
              <Button variant="primary" size="sm" onClick={() => { setIsNewBranchModalOpen(false); showToast('New branch provisioned in demo state.'); }}>Create Branch</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}


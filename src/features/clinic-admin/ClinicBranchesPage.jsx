import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import { Building2, PlusCircle, MapPin, Phone, Mail, Clock, CheckCircle } from 'lucide-react';

export function ClinicBranchesPage() {
  const { activeClinic, activeBranch, switchBranch, showToast } = useApp();
  const [isNewBranchModalOpen, setIsNewBranchModalOpen] = useState(false);

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

      {isNewBranchModalOpen && (
        <Modal
          isOpen={isNewBranchModalOpen}
          onClose={() => setIsNewBranchModalOpen(false)}
          title="Add New Clinic Branch"
          size="md"
        >
          <div className="space-y-3 text-xs">
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
              <Button variant="outline" size="sm" onClick={() => setIsNewBranchModalOpen(false)}>Cancel</Button>
              <Button variant="primary" size="sm" onClick={() => { setIsNewBranchModalOpen(false); showToast('New branch provisioned in demo state.'); }}>Create Branch</Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}


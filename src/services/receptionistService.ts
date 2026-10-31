import { Receptionist, ReceptionistPermission } from '../types';
import { DEMO_RECEPTIONISTS } from '../demo-data';

export const receptionistService = {
  getReceptionists: async (clinicId?: string, branchId?: string): Promise<Receptionist[]> => {
    let list = [...DEMO_RECEPTIONISTS];
    if (clinicId) {
      list = list.filter((r) => r.clinicId === clinicId);
    }
    if (branchId) {
      list = list.filter((r) => r.branchIds.includes(branchId));
    }
    return list;
  },

  hasPermission: (receptionist: Receptionist | null | undefined, permission: ReceptionistPermission): boolean => {
    if (!receptionist || !receptionist.permissions) return false;
    return receptionist.permissions.includes(permission);
  },

  createReceptionist: async (
    data: Omit<Receptionist, 'id' | 'createdAt'>
  ): Promise<Receptionist> => {
    const seq = Math.floor(210 + Math.random() * 780);
    const newRec: Receptionist = {
      ...data,
      id: `rec-${Date.now().toString().slice(-6)}`,
      staffIdNumber: data.staffIdNumber || `REC-${seq}`,
      createdAt: new Date().toISOString(),
      status: data.status || 'Active',
      permissions: data.permissions || ['register_patients', 'manage_appointments', 'check_in_patients'],
      activityHistory: [
        {
          id: `act-${Date.now()}`,
          action: 'Staff profile created and desk credentials provisioned',
          timestamp: new Date().toLocaleString(),
          actor: 'Clinic Administrator'
        }
      ]
    };
    return newRec;
  },

  updateReceptionist: async (
    receptionistId: string,
    updates: Partial<Receptionist>
  ): Promise<Receptionist> => {
    return {
      id: receptionistId,
      ...updates
    } as Receptionist;
  },

  exportToCSV: (receptionists: Receptionist[]): void => {
    const headers = ['Staff ID', 'Name', 'Email', 'Phone', 'Shift', 'Working Days', 'Permissions', 'Status', 'Joining Date'];
    const rows = receptionists.map((r) => [
      r.staffIdNumber || r.id,
      `"${r.name}"`,
      r.email,
      r.phone,
      `"${r.shift}"`,
      `"${r.workingDays.join(', ')}"`,
      `"${r.permissions.join('; ')}"`,
      r.status,
      r.joiningDate
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `clinic_receptionists_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};


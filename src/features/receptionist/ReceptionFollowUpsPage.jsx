import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Phone, Calendar, MessageSquare, CheckCircle, Clock } from 'lucide-react';

export function ReceptionFollowUpsPage() {
  const { followUps, updateFollowUpStatus, openWhatsAppModal, activeClinic } = useApp();

  const pendingCount = followUps.filter((f) => f.status !== 'Completed').length;
  const completedCount = followUps.filter((f) => f.status === 'Completed').length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Patient Continuity</span>
          <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">Follow-Up Schedule & Recalls</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Proactively contact patients for post-procedure check-ins, aligner reviews, and suture removals.
          </p>
        </div>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card className="p-4 border-slate-200 dark:border-slate-800 dark:bg-slate-900/90 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Total Recalls</p>
            <p className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">{followUps.length}</p>
          </div>
          <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Scheduled</span>
        </Card>
        <Card className="p-4 border-slate-200 dark:border-slate-800 dark:bg-slate-900/90 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Action Pending</p>
            <p className="text-2xl font-extrabold text-amber-600 dark:text-amber-400 mt-1">{pendingCount}</p>
          </div>
          <span className="text-xs font-medium text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-1 rounded-lg">Awaiting Outreach</span>
        </Card>
        <Card className="p-4 border-slate-200 dark:border-slate-800 dark:bg-slate-900/90 flex items-center justify-between">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Completed Outreach</p>
            <p className="text-2xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-1">{completedCount}</p>
          </div>
          <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-1 rounded-lg">Care Delivered</span>
        </Card>
      </div>

      <Card className="border-slate-200 dark:border-slate-800 dark:bg-slate-900/90 shadow-sm overflow-hidden">
        <CardHeader
          title={`Follow-Up Tasks Queue (${followUps.length})`}
          subtitle="Trigger WhatsApp check-ins and schedule review consultations"
        />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-400 uppercase text-xs font-bold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-4 text-center w-12">#</th>
                <th className="p-4">Due Date</th>
                <th className="p-4">Patient Details</th>
                <th className="p-4">Doctor</th>
                <th className="p-4">Clinical Reason</th>
                <th className="p-4">Contact Preference</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {followUps.map((task, idx) => (
                <tr key={task.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="p-4 text-center font-mono font-medium text-slate-400 dark:text-slate-500 text-xs">
                    {idx + 1}
                  </td>
                  <td className="p-4 font-bold font-mono text-blue-700 dark:text-blue-400">{task.dueDate}</td>
                  <td className="p-4">
                    <div className="font-bold text-slate-900 dark:text-slate-100">{task.patientName}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">{task.patientPhone}</div>
                  </td>
                  <td className="p-4 text-slate-800 dark:text-slate-200 font-medium">{task.doctorName}</td>
                  <td className="p-4 text-slate-600 dark:text-slate-300 max-w-xs">{task.reason}</td>
                  <td className="p-4">
                    <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md">
                      {task.contactPreference}
                    </span>
                  </td>
                  <td className="p-4">
                    <Badge variant={task.status}>{task.status}</Badge>
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() =>
                          openWhatsAppModal({
                            patient_name: task.patientName,
                            clinic_name: activeClinic.name,
                            appointment_date: task.dueDate,
                            appointment_time: '11:00 AM',
                            doctor_name: task.doctorName,
                            appointment_reference: 'REV-CARE',
                            clinic_phone: activeClinic.phone
                          })
                        }
                        className="px-2.5 py-1.5 rounded-lg text-xs font-bold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 border border-emerald-200 dark:border-emerald-800 cursor-pointer flex items-center gap-1.5 transition-colors"
                      >
                        <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
                      </button>

                      {task.status !== 'Completed' && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateFollowUpStatus(task.id, 'Completed')}
                        >
                          Mark Done
                        </Button>
                      )}

                      <Link to={`/reception/appointments/new?patientName=${task.patientName}`}>
                        <Button variant="ghost" size="sm">
                          Book Slot
                        </Button>
                      </Link>
                    </div>
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

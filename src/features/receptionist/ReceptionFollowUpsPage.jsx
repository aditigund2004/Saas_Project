import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Phone, Calendar, MessageSquare, CheckCircle, Clock } from 'lucide-react';

export function ReceptionFollowUpsPage() {
  const { followUps, updateFollowUpStatus, openWhatsAppModal, activeClinic } = useApp();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Patient Continuity</span>
          <h1 className="text-2xl font-extrabold text-slate-900">Follow-Up Schedule & Recalls</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Proactively contact patients for post-procedure check-ins, aligner reviews, and suture removals.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader
          title={`Follow-Up Tasks Queue (${followUps.length})`}
          subtitle="Trigger WhatsApp check-ins and schedule review consultations"
        />
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-semibold border-b border-slate-200">
              <tr>
                <th className="p-3.5">Due Date</th>
                <th className="p-3.5">Patient Details</th>
                <th className="p-3.5">Doctor</th>
                <th className="p-3.5">Clinical Reason</th>
                <th className="p-3.5">Contact Preference</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {followUps.map((task) => (
                <tr key={task.id} className="hover:bg-slate-50/50">
                  <td className="p-3.5 font-bold font-mono text-blue-800">{task.dueDate}</td>
                  <td className="p-3.5">
                    <div className="font-bold text-slate-900">{task.patientName}</div>
                    <div className="text-[10px] text-slate-400">{task.patientPhone}</div>
                  </td>
                  <td className="p-3.5 text-slate-800 font-medium">{task.doctorName}</td>
                  <td className="p-3.5 text-slate-600 max-w-xs">{task.reason}</td>
                  <td className="p-3.5">
                    <span className="text-[11px] font-medium text-slate-700 bg-slate-100 px-2 py-0.5 rounded">
                      {task.contactPreference}
                    </span>
                  </td>
                  <td className="p-3.5">
                    <Badge variant={task.status}>{task.status}</Badge>
                  </td>
                  <td className="p-3.5 text-right">
                    <div className="flex items-center justify-end gap-1.5">
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
                        className="px-2 py-1 rounded text-[11px] font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 cursor-pointer flex items-center gap-1"
                      >
                        <MessageSquare className="w-3 h-3" /> WhatsApp
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


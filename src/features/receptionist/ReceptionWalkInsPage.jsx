import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';

import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
  Clock,
  UserCheck,
  CheckCircle2,
  Printer,
  AlertCircle,
  Stethoscope,
  Sparkles,
  Phone

} from 'lucide-react';

export function ReceptionWalkInsPage() {
  const {
    activeClinic,
    activeBranch,
    doctors,
    appointments,

    createAppointment,
    createPatient,
    showToast
  } = useApp();

  const [walkInName, setWalkInName] = useState('');
  const [walkInPhone, setWalkInPhone] = useState('');
  const [selectedDoctorId, setSelectedDoctorId] = useState(doctors[0]?.id || '');
  const [selectedServiceId, setSelectedServiceId] = useState(activeClinic.services[0]?.id || '');
  const [chiefComplaint, setChiefComplaint] = useState('');
  const [issuedTicket, setIssuedTicket] = useState(null);

  const clinicDoctors = doctors.filter((d) => d.clinicId === activeClinic.id);
  const currentDoctor = clinicDoctors.find((d) => d.id === selectedDoctorId) || clinicDoctors[0];
  const currentService = activeClinic.services.find((s) => s.id === selectedServiceId) || activeClinic.services[0];

  const walkInList = appointments.filter(
    (a) =>
      (a.clinicId === activeClinic.id || !a.clinicId) &&

      (a.isWalkIn || a.queueNumber?.startsWith('#W-') || a.time?.toLowerCase().includes('immediate'))
  );

  const handleWalkInSubmit = (e) => {
    e.preventDefault();
    const tokenSeq = Math.floor(100 + Math.random() * 899);
    const queueNumber = `#W-${tokenSeq}`;

    // Auto-create patient record
    const patient = createPatient({
      name: walkInName,
      phone: walkInPhone,
      email: `${walkInName.toLowerCase().replace(/\s+/g, '.')}@walkin.demo`,
      gender: 'Other',
      dob: '1995-01-01',
      address: activeClinic.city
    });

    // Create checked-in appointment with queue token
    const apt = createAppointment({
      clinicId: activeClinic.id,
      branchId: activeBranch.id,
      doctorId: currentDoctor.id,
      doctorName: currentDoctor.name,
      patientId: patient.patientIdNumber,
      patientName: walkInName,
      patientPhone: walkInPhone,
      patientEmail: patient.email,
      serviceId: currentService.id,
      serviceName: currentService.name,
      date: '2026-10-23',
      time: 'Immediate / Next',
      status: 'Checked In',
      queueNumber,
      notes: chiefComplaint,
      isWalkIn: true
    });

    setIssuedTicket({
      token: queueNumber,
      patientName: walkInName,
      doctorName: currentDoctor.name,
      serviceName: currentService.name,
      timeIssued: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });

    showToast(`Walk-in queue token ${queueNumber} issued! Patient placed in waiting lounge.`);
    setWalkInName('');
    setWalkInPhone('');

    setChiefComplaint('');
  };

  return (
    <div className="max-w-5xl space-y-6">
      <div>
        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Front Desk Express Counter</span>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">Walk-In Patient Check-In & Token Issuer</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Rapidly register patients who arrive in-person without prior online booking. Issues instant queue token.
        </p>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Walk-in Form */}
        <div className="lg:col-span-7">
          <Card className="p-6 border-slate-200 dark:border-slate-800 dark:bg-slate-900/90 shadow-sm space-y-5">
            <div className="flex items-center gap-2.5 pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-bold text-slate-900 dark:text-slate-100">30-Second Express Walk-In Registration</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400">Creates patient profile and immediately registers to waiting lounge</p>
              </div>
            </div>

            <form onSubmit={handleWalkInSubmit} className="space-y-4 text-sm">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Patient Full Name *</label>

                  <input
                    required
                    type="text"
                    value={walkInName}
                    onChange={(e) => setWalkInName(e.target.value)}
                    placeholder="Enter walk-in patient name..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 text-sm focus:ring-2 focus:ring-blue-500 font-medium"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Mobile / WhatsApp Number *</label>
                  <input
                    required
                    type="tel"
                    value={walkInPhone}
                    onChange={(e) => setWalkInPhone(e.target.value)}
                    placeholder="+91 98000 00000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 text-sm focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Assign Doctor *</label>
                  <select
                    value={selectedDoctorId}
                    onChange={(e) => setSelectedDoctorId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 text-sm focus:ring-2 focus:ring-blue-500"
                  >
                    {clinicDoctors.map((d) => (
                      <option key={d.id} value={d.id}>{d.name} ({d.specialty})</option>

                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Service / Reason *</label>
                  <select
                    value={selectedServiceId}
                    onChange={(e) => setSelectedServiceId(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 text-sm focus:ring-2 focus:ring-blue-500"
                  >
                    {activeClinic.services.map((s) => (
                      <option key={s.id} value={s.id}>{s.name} (₹{s.fee})</option>

                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Chief Complaint / Symptoms</label>

                <textarea
                  rows={2}
                  value={chiefComplaint}
                  onChange={(e) => setChiefComplaint(e.target.value)}
                  placeholder="e.g. Toothache since yesterday; acute pain..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 text-sm focus:ring-2 focus:ring-blue-500"

                />
              </div>

              <Button
                variant="primary"
                size="md"
                type="submit"
                className="w-full font-bold shadow-md shadow-blue-500/20"
              >
                Issue Token & Seat in Waiting Room

              </Button>
            </form>
          </Card>
        </div>

        {/* Issued Queue Ticket Display */}
        <div className="lg:col-span-5 space-y-4">
          {issuedTicket ? (
            <Card className="p-6 border-blue-400 dark:border-blue-600/50 bg-blue-50/50 dark:bg-blue-950/20 text-center space-y-4 shadow-lg">
              <span className="text-xs uppercase font-bold text-blue-700 dark:text-blue-400 tracking-wider">
                Current Issued Queue Ticket
              </span>
              <div className="py-2">
                <span className="text-4xl font-extrabold text-blue-900 dark:text-blue-300 font-mono tracking-tight">
                  {issuedTicket.token}
                </span>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Issued at {issuedTicket.timeIssued}</p>
              </div>

              <div className="p-3.5 bg-white dark:bg-slate-900 rounded-xl border border-blue-200 dark:border-blue-900/60 text-sm text-left space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 dark:text-slate-400">Patient:</span>
                  <span className="font-bold text-slate-900 dark:text-slate-100">{issuedTicket.patientName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 dark:text-slate-400">Doctor:</span>
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{issuedTicket.doctorName}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 dark:text-slate-400">Service:</span>
                  <span className="text-slate-700 dark:text-slate-300 font-medium">{issuedTicket.serviceName}</span>

                </div>
              </div>

              <div className="flex items-center justify-center gap-2 pt-1">
                <Button variant="outline" size="sm" icon={Printer} onClick={() => window.print()}>
                  Print Thermal Ticket
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setIssuedTicket(null)}>
                  Clear

                </Button>
              </div>
            </Card>
          ) : (
            <Card className="p-8 border-dashed border-slate-300 dark:border-slate-800 dark:bg-slate-900/40 text-center space-y-3 text-slate-400 dark:text-slate-500">
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400">
                <Clock className="w-6 h-6" />
              </div>
              <p className="font-semibold text-slate-700 dark:text-slate-300 text-sm">No active walk-in ticket selected</p>
              <p className="text-xs max-w-xs mx-auto">Complete the form to register a walk-in patient and issue a thermal queue slip.</p>
            </Card>
          )}

          {/* Architecture note */}
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400 space-y-1.5">
            <p className="font-bold text-slate-700 dark:text-slate-300">Offline-Ready Architecture Specification</p>
            <p className="leading-relaxed">
              Designed for future client-side service worker synchronization. In intermittent connectivity, walk-in tokens queue in memory and reconcile with backend authoritative IDs upon network reconnect.

            </p>
          </div>
        </div>
      </div>


      {/* Today's Walk-in Queue Roster Table */}
      <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Today's Walk-In Queue & Token Roster ({walkInList.length})
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Live token stream of in-person patients queued at front reception desk

            </p>
          </div>
          <Badge variant="teal" size="sm">Front Desk Live Stream</Badge>
        </div>

        <Card className="overflow-hidden border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-600 dark:text-slate-300 font-semibold border-b border-slate-200 dark:border-slate-800">
                <tr>
                  <th className="px-3.5 py-3 text-center w-12 font-semibold">#</th>
                  <th className="px-4 py-3">Queue Token</th>
                  <th className="px-4 py-3">Patient & Contact</th>
                  <th className="px-4 py-3">Attending Physician</th>
                  <th className="px-4 py-3">Service & Tariff</th>
                  <th className="px-4 py-3">Registered Slot</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {walkInList.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="px-4 py-8 text-center text-slate-400 dark:text-slate-500">
                      No walk-in tokens issued yet today. Complete the registration form above to issue tokens.
                    </td>
                  </tr>
                ) : (
                  walkInList.map((apt, idx) => (
                    <tr key={apt.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="px-3.5 py-3 text-center font-mono font-medium text-slate-400 dark:text-slate-500 text-xs">
                        {idx + 1}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className="font-mono font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-md border border-blue-200 dark:border-blue-900">
                          {apt.queueNumber || '#W-101'}

                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="font-bold text-slate-900 dark:text-white">{apt.patientName}</div>
                        <div className="text-[11px] text-slate-400 dark:text-slate-500">{apt.patientPhone}</div>

                      </td>
                      <td className="px-4 py-3 whitespace-nowrap font-medium text-slate-700 dark:text-slate-300">
                        {apt.doctorName || 'Dr. Arvind Rao'}
                      </td>
                      <td className="px-4 py-3">
                        <div className="font-medium text-slate-800 dark:text-slate-200">{apt.serviceName}</div>
                        {apt.notes && (
                          <div className="text-[11px] text-slate-400 dark:text-slate-500 italic truncate max-w-xs">
                            {apt.notes}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap font-mono text-[11px] text-slate-500 dark:text-slate-400">
                        {apt.time || 'Immediate'}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <Badge
                          variant={
                            apt.status === 'Completed' ? 'success' :
                            apt.status === 'In Progress' ? 'warning' : 'teal'
                          }
                          size="sm"
                        >
                          {apt.status || 'Checked In'}
                        </Badge>
                      </td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <Button
                          variant="outline"
                          size="sm"
                          icon={Printer}
                          className="text-xs h-7 px-2.5"
                          onClick={() => {
                            setIssuedTicket({
                              token: apt.queueNumber || '#W-101',
                              patientName: apt.patientName,
                              doctorName: apt.doctorName || 'Dr. Arvind Rao',
                              serviceName: apt.serviceName,
                              timeIssued: '10:30 AM'
                            });
                            window.print();

                          }}
                        >
                          Slip
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}



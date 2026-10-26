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
    <div className="max-w-4xl space-y-6">
      <div>
        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Front Desk Express Counter</span>
        <h1 className="text-2xl font-extrabold text-slate-900">Walk-In Patient Check-In & Token Issuer</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Rapidly register patients who arrive in-person without an online booking. Issues instant queue token.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
        {/* Walk-in Form */}
        <div className="md:col-span-7">
          <Card className="p-6 border-slate-200 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Clock className="w-5 h-5 text-blue-600" />
              <h2 className="text-sm font-bold text-slate-900">30-Second Express Walk-In Registration</h2>
            </div>

            <form onSubmit={handleWalkInSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">Patient Full Name *</label>
                  <input
                    required
                    type="text"
                    value={walkInName}
                    onChange={(e) => setWalkInName(e.target.value)}
                    placeholder="Enter walk-in patient name..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 font-medium"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block font-semibold text-slate-700 mb-1">Mobile / WhatsApp Number *</label>
                  <input
                    required
                    type="tel"
                    value={walkInPhone}
                    onChange={(e) => setWalkInPhone(e.target.value)}
                    placeholder="+91 98000 00000"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Assign Doctor *</label>
                  <select
                    value={selectedDoctorId}
                    onChange={(e) => setSelectedDoctorId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    {clinicDoctors.map((d) => (
                      <option key={d.id} value={d.id}>{d.name} ({d.specialty})</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Service / Reason *</label>
                  <select
                    value={selectedServiceId}
                    onChange={(e) => setSelectedServiceId(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    {activeClinic.services.map((s) => (
                      <option key={s.id} value={s.id}>{s.name} (₹{s.fee})</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Chief Complaint / Symptoms</label>
                <textarea
                  rows={2}
                  value={chiefComplaint}
                  onChange={(e) => setChiefComplaint(e.target.value)}
                  placeholder="e.g. Toothache since yesterday; acute pain..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <Button
                variant="primary"
                size="md"
                type="submit"
                className="w-full font-bold bg-blue-700 hover:bg-blue-800"
              >
                Issue Token & Seat in Waiting Room
              </Button>
            </form>
          </Card>
        </div>

        {/* Issued Queue Ticket Display */}
        <div className="md:col-span-5 space-y-4">
          {issuedTicket ? (
            <Card className="p-6 border-blue-500 bg-blue-50/40 text-center space-y-4 shadow-md">
              <span className="text-[10px] uppercase font-bold text-blue-800 tracking-wider">
                Current Issued Queue Ticket
              </span>
              <div className="py-2">
                <span className="text-4xl font-extrabold text-blue-900 font-mono tracking-tight">
                  {issuedTicket.token}
                </span>
                <p className="text-xs text-slate-500 mt-1">Issued at {issuedTicket.timeIssued}</p>
              </div>

              <div className="p-3 bg-white rounded-xl border border-blue-200 text-xs text-left space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-500">Patient:</span>
                  <span className="font-bold text-slate-900">{issuedTicket.patientName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Doctor:</span>
                  <span className="font-semibold text-slate-800">{issuedTicket.doctorName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Service:</span>
                  <span className="text-slate-700">{issuedTicket.serviceName}</span>
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
            <Card className="p-6 border-dashed border-slate-300 text-center space-y-2 text-xs text-slate-400">
              <Clock className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="font-semibold text-slate-600">No active walk-in ticket selected</p>
              <p>Complete the form to register a walk-in patient and issue a thermal queue slip.</p>
            </Card>
          )}

          {/* Architecture note */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-500 space-y-1">
            <p className="font-bold text-slate-700">Offline-Ready Architecture Specification</p>
            <p className="text-[11px] leading-relaxed">
              Designed for future client-side service worker synchronization. In intermittent connectivity, walk-in tokens queue in memory and reconcile with backend authoritative IDs upon network reconnect.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}


import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import {
  Clock,
  Calendar,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Send,
  Eye,
  RefreshCw,
  Building2,
  User,
  Phone,
  Mail,
  History,
  ShieldCheck,
  Stethoscope,
  Info
} from 'lucide-react';

export function ReceptionRequestsPage() {
  const {
<<<<<<< HEAD
    appointments = [],
    activeClinic,
    doctors = [],
=======
    appointments,
    activeClinic,
    doctors,
>>>>>>> origin/main
    confirmBookingRequest,
    proposeAlternativeSlot,
    rejectBookingRequest,
    checkSlotAvailability,
    getAvailableSlotsForDoctor,
    showToast,
    formatCurrency
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [doctorFilter, setDoctorFilter] = useState('All');

  // Drawer / Modals
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [isProposeModalOpen, setIsProposeModalOpen] = useState(false);
  const [isRejectModalOpen, setIsRejectModalOpen] = useState(false);

  // Alternative proposal form state
  const [altDate, setAltDate] = useState('2026-10-24');
  const [altTime, setAltTime] = useState('03:30 PM');
  const [altReason, setAltReason] = useState(
    'Requested slot conflicts with doctor scheduled emergency hospital rounds. Alternative slot offered.'
  );

  // Reject form state
  const [rejectReason, setRejectReason] = useState(
    'Doctor is on clinical emergency leave and clinic schedule is at capacity.'
  );

  // Clinic doctors
  const clinicDoctors = doctors.filter((d) => d.clinicId === activeClinic?.id);

  // Requests belonging to this clinic
  const clinicRequests = appointments.filter((a) => {
<<<<<<< HEAD
    const isClinicMatch = !a.clinicId || a.clinicId === activeClinic?.id;
=======
    // Show requests that have a requestId or request-related status
    const isClinicMatch = a.clinicId === activeClinic?.id;
>>>>>>> origin/main
    return isClinicMatch;
  });

  const filteredRequests = clinicRequests.filter((req) => {
    const matchesSearch =
      (req.requestId && req.requestId.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (req.referenceNumber && req.referenceNumber.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (req.patientName && req.patientName.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (req.patientPhone && req.patientPhone.includes(searchTerm));

    const matchesStatus =
      statusFilter === 'All'
        ? true
        : req.status === statusFilter;

    const matchesDoc =
      doctorFilter === 'All' || req.doctorId === doctorFilter;

    return matchesSearch && matchesStatus && matchesDoc;
  });

  // KPI Counters
  const pendingCount = clinicRequests.filter(
    (r) => r.status === 'Pending Clinic Confirmation' || r.status === 'Requested'
  ).length;

  const alternativeCount = clinicRequests.filter(
    (r) => r.status === 'Alternative Slot Proposed' || r.status === 'Awaiting Patient Response'
  ).length;

  const confirmedCount = clinicRequests.filter((r) => r.status === 'Confirmed').length;

  // Selected request slot availability check
  const selectedCheck = selectedRequest
    ? checkSlotAvailability(
        selectedRequest.clinicId,
        selectedRequest.doctorId,
        selectedRequest.requestedDate || selectedRequest.date,
        selectedRequest.requestedTime || selectedRequest.time,
        selectedRequest.durationMinutes || 30,
        selectedRequest.id
      )
    : { available: true };

  // Available alternative slots for modal
  const proposedDoctorSlots = selectedRequest
    ? getAvailableSlotsForDoctor(selectedRequest.clinicId, selectedRequest.doctorId, altDate)
    : [];

  const handleConfirmSubmit = () => {
    if (!selectedRequest) return;
    const success = confirmBookingRequest(selectedRequest.id, 'Shweta Kulkarni (Front Desk)');
    if (success) {
      setIsConfirmModalOpen(false);
      setSelectedRequest(null);
    }
  };

  const handleProposeSubmit = (e) => {
    e.preventDefault();
    if (!selectedRequest) return;

    proposeAlternativeSlot(
      selectedRequest.id,
      {
        proposedDate: altDate,
        proposedTime: altTime,
        proposedDoctorId: selectedRequest.doctorId,
        proposedDoctorName: selectedRequest.doctorName,
        reason: altReason
      },
      'Shweta Kulkarni (Receptionist)'
    );

    setIsProposeModalOpen(false);
    setSelectedRequest(null);
  };

  const handleRejectSubmit = (e) => {
    e.preventDefault();
    if (!selectedRequest) return;

    rejectBookingRequest(selectedRequest.id, rejectReason, 'Shweta Kulkarni (Front Desk)');
    setIsRejectModalOpen(false);
    setSelectedRequest(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
<<<<<<< HEAD
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-800 uppercase tracking-wide">
              Front Desk Station
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">Clinic: {activeClinic?.name}</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
            Online Booking Requests Coordination
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
=======
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-blue-700 bg-blue-50 px-2.5 py-0.5 rounded-full border border-blue-200 uppercase tracking-wide">
              Front Desk Station
            </span>
            <span className="text-xs text-slate-400 font-mono">Clinic: {activeClinic?.name}</span>
          </div>
          <h1 className="text-2xl font-black text-slate-900 tracking-tight">
            Online Booking Requests Coordination
          </h1>
          <p className="text-xs text-slate-500">
>>>>>>> origin/main
            Verify patient preferred appointment slots, check doctor calendar conflicts, confirm bookings, or propose alternative times.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/reception/appointments">
            <Button variant="outline" size="sm">
              Confirmed Appointments &rarr;
            </Button>
          </Link>
          <Link to="/reception/queue">
            <Button variant="primary" size="sm">
              Live Patient Queue &rarr;
            </Button>
          </Link>
        </div>
      </div>

      {/* KPI Counters Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div
          onClick={() => setStatusFilter('Pending Clinic Confirmation')}
<<<<<<< HEAD
          className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-amber-200 dark:border-amber-900/60 shadow-2xs flex items-center justify-between cursor-pointer hover:border-amber-400 dark:hover:border-amber-600 transition-all"
        >
          <div>
            <span className="text-xs font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wider block">
              Pending Verification
            </span>
            <span className="text-2xl font-black font-mono text-amber-800 dark:text-amber-300 mt-1 block tabular-nums">
              {pendingCount}
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500">Needs receptionist slot check</span>
          </div>
          <span className="p-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400">
=======
          className="p-4 bg-white rounded-xl border border-amber-200 shadow-2xs flex items-center justify-between cursor-pointer hover:border-amber-400 transition-all"
        >
          <div>
            <span className="text-[11px] font-bold text-amber-700 uppercase tracking-wider block">
              Pending Verification
            </span>
            <span className="text-2xl font-black font-mono text-amber-800 mt-1 block">
              {pendingCount}
            </span>
            <span className="text-[10px] text-slate-400">Needs receptionist slot check</span>
          </div>
          <span className="p-2.5 rounded-xl bg-amber-50 text-amber-600">
>>>>>>> origin/main
            <Clock className="w-5 h-5" />
          </span>
        </div>

        <div
          onClick={() => setStatusFilter('Alternative Slot Proposed')}
<<<<<<< HEAD
          className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-blue-200 dark:border-blue-900/60 shadow-2xs flex items-center justify-between cursor-pointer hover:border-blue-400 dark:hover:border-blue-600 transition-all"
        >
          <div>
            <span className="text-xs font-bold text-blue-700 dark:text-blue-400 uppercase tracking-wider block">
              Awaiting Patient Response
            </span>
            <span className="text-2xl font-black font-mono text-blue-800 dark:text-blue-300 mt-1 block tabular-nums">
              {alternativeCount}
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500">Alternative timeslot offered</span>
          </div>
          <span className="p-2.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
=======
          className="p-4 bg-white rounded-xl border border-blue-200 shadow-2xs flex items-center justify-between cursor-pointer hover:border-blue-400 transition-all"
        >
          <div>
            <span className="text-[11px] font-bold text-blue-700 uppercase tracking-wider block">
              Awaiting Patient Response
            </span>
            <span className="text-2xl font-black font-mono text-blue-800 mt-1 block">
              {alternativeCount}
            </span>
            <span className="text-[10px] text-slate-400">Alternative timeslot offered</span>
          </div>
          <span className="p-2.5 rounded-xl bg-blue-50 text-blue-600">
>>>>>>> origin/main
            <Send className="w-5 h-5" />
          </span>
        </div>

        <div
          onClick={() => setStatusFilter('Confirmed')}
<<<<<<< HEAD
          className="p-4 bg-white dark:bg-slate-900 rounded-xl border border-emerald-200 dark:border-emerald-900/60 shadow-2xs flex items-center justify-between cursor-pointer hover:border-emerald-400 dark:hover:border-emerald-600 transition-all"
        >
          <div>
            <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider block">
              Confirmed Bookings
            </span>
            <span className="text-2xl font-black font-mono text-emerald-800 dark:text-emerald-300 mt-1 block tabular-nums">
              {confirmedCount}
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500">Scheduled on doctor calendar</span>
          </div>
          <span className="p-2.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
=======
          className="p-4 bg-white rounded-xl border border-emerald-200 shadow-2xs flex items-center justify-between cursor-pointer hover:border-emerald-400 transition-all"
        >
          <div>
            <span className="text-[11px] font-bold text-emerald-700 uppercase tracking-wider block">
              Confirmed Bookings
            </span>
            <span className="text-2xl font-black font-mono text-emerald-800 mt-1 block">
              {confirmedCount}
            </span>
            <span className="text-[10px] text-slate-400">Scheduled on doctor calendar</span>
          </div>
          <span className="p-2.5 rounded-xl bg-emerald-50 text-emerald-600">
>>>>>>> origin/main
            <CheckCircle2 className="w-5 h-5" />
          </span>
        </div>
      </div>

      {/* Requests Master Table Card */}
<<<<<<< HEAD
      <Card padding="none" className="border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Search & Filters Toolbar */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white dark:bg-slate-900">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
=======
      <Card padding="none">
        {/* Search & Filters Toolbar */}
        <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-3 bg-white">
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
>>>>>>> origin/main
            <input
              type="text"
              placeholder="Search by Request ID, Patient Name or Phone..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
<<<<<<< HEAD
              className="w-full pl-9 pr-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-600"
=======
              className="w-full pl-9 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600"
>>>>>>> origin/main
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            <select
              value={doctorFilter}
              onChange={(e) => setDoctorFilter(e.target.value)}
<<<<<<< HEAD
              className="p-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-medium"
=======
              className="p-1.5 text-xs rounded-lg border border-slate-200 bg-white font-medium"
>>>>>>> origin/main
            >
              <option value="All">All Clinic Doctors</option>
              {clinicDoctors.map((doc) => (
                <option key={doc.id} value={doc.id}>{doc.name}</option>
              ))}
            </select>

            {['All', 'Pending Clinic Confirmation', 'Alternative Slot Proposed', 'Confirmed', 'Rejected'].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status)}
<<<<<<< HEAD
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  statusFilter === status
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
=======
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  statusFilter === status
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
>>>>>>> origin/main
                }`}
              >
                {status === 'Pending Clinic Confirmation' ? 'Pending' : status === 'Alternative Slot Proposed' ? 'Alternative Sent' : status}
              </button>
            ))}
          </div>
        </div>

        {/* Requests Table */}
        <div className="overflow-x-auto">
<<<<<<< HEAD
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 dark:text-slate-400 uppercase text-xs font-semibold border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="p-3.5 text-center w-12">#</th>
=======
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 uppercase text-[10px] font-semibold border-b border-slate-200">
              <tr>
>>>>>>> origin/main
                <th className="p-3.5">Request ID</th>
                <th className="p-3.5">Patient Details</th>
                <th className="p-3.5">Consulting Doctor</th>
                <th className="p-3.5">Service Requested</th>
                <th className="p-3.5">Requested Slot</th>
                <th className="p-3.5">Patient Notes / Prefs</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
<<<<<<< HEAD
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan={9} className="p-8 text-center text-slate-400 dark:text-slate-500 text-sm">
=======
            <tbody className="divide-y divide-slate-100">
              {filteredRequests.length === 0 ? (
                <tr>
                  <td colSpan={8} className="p-8 text-center text-slate-400">
>>>>>>> origin/main
                    No requests found matching your filter criteria.
                  </td>
                </tr>
              ) : (
<<<<<<< HEAD
                filteredRequests.map((req, idx) => {
=======
                filteredRequests.map((req) => {
>>>>>>> origin/main
                  const isPending =
                    req.status === 'Pending Clinic Confirmation' || req.status === 'Requested';
                  const isAlternative =
                    req.status === 'Alternative Slot Proposed' || req.status === 'Awaiting Patient Response';
                  const isConfirmed = req.status === 'Confirmed';

                  return (
<<<<<<< HEAD
                    <tr key={req.id} className="hover:bg-slate-50/70 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="p-3.5 text-center font-mono font-medium text-slate-400 dark:text-slate-500 text-xs">
                        {idx + 1}
                      </td>
                      <td className="p-3.5 font-mono font-bold text-slate-900 dark:text-white text-xs">
                        {req.requestId || req.referenceNumber}
                      </td>
                      <td className="p-3.5">
                        <div className="font-bold text-slate-900 dark:text-white">{req.patientName}</div>
                        <div className="text-xs text-slate-400 dark:text-slate-500 font-mono">{req.patientPhone}</div>
                      </td>
                      <td className="p-3.5">
                        <div className="font-bold text-slate-900 dark:text-white">{req.doctorName}</div>
                        <div className="text-xs text-blue-700 dark:text-blue-400">{req.consultationType || 'OPD'}</div>
                      </td>
                      <td className="p-3.5 font-medium text-slate-700 dark:text-slate-300 max-w-[180px]">
                        <span className="truncate block">{req.serviceName}</span>
                      </td>
                      <td className="p-3.5 font-mono">
                        <div className="font-bold text-slate-900 dark:text-white">{req.requestedDate || req.date}</div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">{req.requestedTime || req.time}</div>
                      </td>
                      <td className="p-3.5 max-w-[200px] text-slate-600 dark:text-slate-400">
                        {req.patientAlternativePreferences ? (
                          <div className="truncate text-xs">
                            <span className="font-semibold text-blue-700 dark:text-blue-400">Pref: </span>
                            {req.patientAlternativePreferences.preferredTimeOfDay} ({req.patientAlternativePreferences.noteForReceptionist || 'None'})
                          </div>
                        ) : (
                          <span className="text-slate-400 dark:text-slate-500 text-xs">Standard request</span>
=======
                    <tr key={req.id} className="hover:bg-slate-50/60 transition-colors">
                      <td className="p-3.5 font-mono font-bold text-slate-900">
                        {req.requestId || req.referenceNumber}
                      </td>
                      <td className="p-3.5">
                        <div className="font-bold text-slate-900">{req.patientName}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{req.patientPhone}</div>
                      </td>
                      <td className="p-3.5">
                        <div className="font-bold text-slate-900">{req.doctorName}</div>
                        <div className="text-[10px] text-blue-700">{req.consultationType || 'OPD'}</div>
                      </td>
                      <td className="p-3.5 font-medium text-slate-700 max-w-[180px]">
                        <span className="truncate block">{req.serviceName}</span>
                      </td>
                      <td className="p-3.5 font-mono">
                        <div className="font-bold text-slate-900">{req.requestedDate || req.date}</div>
                        <div className="text-[11px] text-slate-500">{req.requestedTime || req.time}</div>
                      </td>
                      <td className="p-3.5 max-w-[200px] text-slate-600">
                        {req.patientAlternativePreferences ? (
                          <div className="truncate text-[11px]">
                            <span className="font-semibold text-blue-700">Pref: </span>
                            {req.patientAlternativePreferences.preferredTimeOfDay} ({req.patientAlternativePreferences.noteForReceptionist || 'None'})
                          </div>
                        ) : (
                          <span className="text-slate-400 text-[11px]">Standard request</span>
>>>>>>> origin/main
                        )}
                      </td>
                      <td className="p-3.5">
                        <span
<<<<<<< HEAD
                          className={`px-2.5 py-0.5 rounded-md text-xs font-bold border ${
                            isPending
                              ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border-amber-200 dark:border-amber-800'
                              : isAlternative
                              ? 'bg-blue-100 dark:bg-blue-950/60 text-blue-800 dark:text-blue-300 border-blue-200 dark:border-blue-800'
                              : isConfirmed
                              ? 'bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700'
=======
                          className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                            isPending
                              ? 'bg-amber-100 text-amber-800'
                              : isAlternative
                              ? 'bg-blue-100 text-blue-800'
                              : isConfirmed
                              ? 'bg-emerald-100 text-emerald-800'
                              : 'bg-slate-100 text-slate-600'
>>>>>>> origin/main
                          }`}
                        >
                          {req.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-right whitespace-nowrap space-x-1.5">
                        <Button
                          variant="outline"
                          size="xs"
<<<<<<< HEAD
                          onClick={() => setSelectedRequest(req)}
                        >
                          <Eye className="w-3.5 h-3.5 mr-1" />
=======
                          icon={Eye}
                          onClick={() => setSelectedRequest(req)}
                        >
>>>>>>> origin/main
                          Review & Triage
                        </Button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Detailed Request Review Drawer / Modal */}
      <Modal
        isOpen={!!selectedRequest}
        onClose={() => setSelectedRequest(null)}
        title={`Review Booking Request: ${selectedRequest?.requestId || selectedRequest?.referenceNumber}`}
        size="lg"
      >
        {selectedRequest && (
<<<<<<< HEAD
          <div className="space-y-5 text-sm">
            {/* Patient & Request Meta Header */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <span className="text-xs uppercase font-bold text-slate-400 dark:text-slate-500 block">Patient Name</span>
                <span className="font-bold text-slate-900 dark:text-white text-sm block mt-0.5">{selectedRequest.patientName}</span>
                <span className="text-slate-500 dark:text-slate-400 font-mono text-xs">{selectedRequest.patientPhone}</span>
              </div>
              <div>
                <span className="text-xs uppercase font-bold text-slate-400 dark:text-slate-500 block">Assigned Doctor</span>
                <span className="font-bold text-blue-700 dark:text-blue-400 block mt-0.5">{selectedRequest.doctorName}</span>
                <span className="text-slate-500 dark:text-slate-400 text-xs">{selectedRequest.serviceName}</span>
              </div>
              <div>
                <span className="text-xs uppercase font-bold text-slate-400 dark:text-slate-500 block">Requested Date & Time</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white block mt-0.5">
                  {selectedRequest.requestedDate || selectedRequest.date}
                </span>
                <span className="font-mono text-blue-700 dark:text-blue-400 font-bold text-xs">
=======
          <div className="space-y-5 text-xs">
            {/* Patient & Request Meta Header */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Patient Name</span>
                <span className="font-bold text-slate-900 text-sm block">{selectedRequest.patientName}</span>
                <span className="text-slate-500 font-mono text-[11px]">{selectedRequest.patientPhone}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Assigned Doctor</span>
                <span className="font-bold text-blue-700 block">{selectedRequest.doctorName}</span>
                <span className="text-slate-500 text-[11px]">{selectedRequest.serviceName}</span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Requested Date & Time</span>
                <span className="font-mono font-bold text-slate-900 block">
                  {selectedRequest.requestedDate || selectedRequest.date}
                </span>
                <span className="font-mono text-blue-700 font-bold">
>>>>>>> origin/main
                  {selectedRequest.requestedTime || selectedRequest.time}
                </span>
              </div>
              <div>
<<<<<<< HEAD
                <span className="text-xs uppercase font-bold text-slate-400 dark:text-slate-500 block">Current Status</span>
                <div className="mt-1">
                  <Badge variant={selectedRequest.status === 'Confirmed' ? 'success' : 'warning'} size="sm">
                    {selectedRequest.status}
                  </Badge>
                </div>
=======
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Current Status</span>
                <Badge variant={selectedRequest.status === 'Confirmed' ? 'success' : 'warning'}>
                  {selectedRequest.status}
                </Badge>
>>>>>>> origin/main
              </div>
            </div>

            {/* Availability Check Result Banner */}
            <div
              className={`p-3.5 rounded-xl border flex items-start gap-2.5 ${
                selectedCheck.available
<<<<<<< HEAD
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-900 text-emerald-950 dark:text-emerald-200'
                  : 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-900 text-amber-950 dark:text-amber-200'
=======
                  ? 'bg-emerald-50 border-emerald-200 text-emerald-950'
                  : 'bg-amber-50 border-amber-200 text-amber-950'
>>>>>>> origin/main
              }`}
            >
              {selectedCheck.available ? (
                <>
<<<<<<< HEAD
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm">Doctor Schedule Verified — Slot is Available!</h4>
                    <p className="text-xs text-emerald-800 dark:text-emerald-300 mt-0.5">
=======
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-xs">Doctor Schedule Verified — Slot is Available!</h4>
                    <p className="text-[11px] text-emerald-800 mt-0.5">
>>>>>>> origin/main
                      No schedule conflicts found for Dr. {selectedRequest.doctorName} on {selectedRequest.requestedDate || selectedRequest.date} at {selectedRequest.requestedTime || selectedRequest.time}. You can confirm this slot directly.
                    </p>
                  </div>
                </>
              ) : (
                <>
<<<<<<< HEAD
                  <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-sm">Doctor Unavailable / Schedule Conflict Detected</h4>
                    <p className="text-xs text-amber-800 dark:text-amber-300 mt-0.5">
=======
                  <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-bold text-xs">Doctor Unavailable / Schedule Conflict Detected</h4>
                    <p className="text-[11px] text-amber-800 mt-0.5">
>>>>>>> origin/main
                      {selectedCheck.reason || 'This timeslot has an overlapping confirmed appointment.'} Use <strong>Workflow B</strong> below to offer an alternative slot to the patient.
                    </p>
                  </div>
                </>
              )}
            </div>

            {/* Patient Alternate Preferences */}
            {selectedRequest.patientAlternativePreferences && (
<<<<<<< HEAD
              <div className="p-3.5 bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 rounded-xl space-y-1">
                <span className="font-bold text-blue-900 dark:text-blue-300 block text-xs">Patient Flexible Preferences:</span>
                <div className="flex justify-between text-slate-700 dark:text-slate-300 text-xs">
=======
              <div className="p-3 bg-blue-50/70 border border-blue-200 rounded-lg space-y-1">
                <span className="font-bold text-blue-900 block">Patient Flexible Preferences:</span>
                <div className="flex justify-between text-slate-700 text-[11px]">
>>>>>>> origin/main
                  <span>Preferred Time of Day: <strong>{selectedRequest.patientAlternativePreferences.preferredTimeOfDay}</strong></span>
                  {selectedRequest.patientAlternativePreferences.secondPreferredDate && (
                    <span>Alternative Date: <strong>{selectedRequest.patientAlternativePreferences.secondPreferredDate}</strong></span>
                  )}
                </div>
                {selectedRequest.patientAlternativePreferences.noteForReceptionist && (
<<<<<<< HEAD
                  <p className="text-slate-600 dark:text-slate-400 italic pt-1 text-xs">
=======
                  <p className="text-slate-600 italic pt-1">
>>>>>>> origin/main
                    "{selectedRequest.patientAlternativePreferences.noteForReceptionist}"
                  </p>
                )}
              </div>
            )}

            {/* Audit History */}
            <div className="space-y-1.5">
<<<<<<< HEAD
              <span className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider block">
                Booking History & Audit Trail
              </span>
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700 max-h-36 overflow-y-auto space-y-2 text-xs">
                {(selectedRequest.responseHistory || []).map((h, i) => (
                  <div key={i} className="flex justify-between items-start border-b border-slate-100 dark:border-slate-700/60 pb-1.5 last:border-b-0">
                    <div>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{h.action}</span>
                      {h.notes && <p className="text-slate-500 dark:text-slate-400 italic mt-0.5">"{h.notes}"</p>}
                    </div>
                    <span className="text-xs text-slate-400 dark:text-slate-500 font-mono shrink-0 ml-2">
=======
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                Booking History & Audit Trail
              </span>
              <div className="p-3 rounded-lg bg-slate-50 border border-slate-100 max-h-36 overflow-y-auto space-y-2 text-[11px]">
                {(selectedRequest.responseHistory || []).map((h, i) => (
                  <div key={i} className="flex justify-between items-start border-b border-slate-100 pb-1.5 last:border-b-0">
                    <div>
                      <span className="font-bold text-slate-800">{h.action}</span>
                      {h.notes && <p className="text-slate-500 italic mt-0.5">"{h.notes}"</p>}
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono shrink-0 ml-2">
>>>>>>> origin/main
                      {h.timestamp} ({h.actor})
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons: Workflow A (Confirm) vs Workflow B (Propose Alternative) vs Reject */}
<<<<<<< HEAD
            <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-200 dark:border-slate-800">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsRejectModalOpen(true)}
                className="text-red-600 dark:text-red-400 border-red-200 dark:border-red-900 hover:bg-red-50 dark:hover:bg-red-950/40"
              >
                <XCircle className="w-4 h-4 mr-1.5" />
=======
            <div className="flex items-center justify-between gap-3 pt-3 border-t border-slate-200">
              <Button
                variant="outline"
                size="sm"
                icon={XCircle}
                onClick={() => setIsRejectModalOpen(true)}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
>>>>>>> origin/main
                Reject Request
              </Button>

              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
<<<<<<< HEAD
=======
                  icon={Clock}
>>>>>>> origin/main
                  onClick={() => {
                    setAltDate(selectedRequest.requestedDate || selectedRequest.date);
                    setIsProposeModalOpen(true);
                  }}
<<<<<<< HEAD
                  className="border-blue-300 dark:border-blue-800 text-blue-700 dark:text-blue-300 bg-blue-50/60 dark:bg-blue-950/40"
                >
                  <Clock className="w-4 h-4 mr-1.5" />
=======
                  className="border-blue-300 text-blue-700 bg-blue-50/60"
                >
>>>>>>> origin/main
                  Workflow B: Propose Alternative
                </Button>

                <Button
                  variant="primary"
                  size="sm"
<<<<<<< HEAD
                  disabled={!selectedCheck.available}
                  onClick={() => setIsConfirmModalOpen(true)}
                >
                  <CheckCircle2 className="w-4 h-4 mr-1.5" />
=======
                  icon={CheckCircle2}
                  disabled={!selectedCheck.available}
                  onClick={() => setIsConfirmModalOpen(true)}
                >
>>>>>>> origin/main
                  Workflow A: Confirm Requested Slot
                </Button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      {/* Workflow A: Confirm Slot Dialog */}
      <Modal
        isOpen={isConfirmModalOpen}
        onClose={() => setIsConfirmModalOpen(false)}
        title="Confirm Appointment Slot (Workflow A)"
      >
        {selectedRequest && (
<<<<<<< HEAD
          <div className="space-y-4 text-sm">
            <p className="text-slate-700 dark:text-slate-300">
              You are confirming the appointment for <strong>{selectedRequest.patientName}</strong> with <strong>Dr. {selectedRequest.doctorName}</strong> on:
            </p>

            <div className="p-3.5 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900 rounded-xl text-center space-y-1">
              <span className="text-base font-black font-mono text-emerald-900 dark:text-emerald-300 block">
                {selectedRequest.requestedDate || selectedRequest.date} at {selectedRequest.requestedTime || selectedRequest.time}
              </span>
              <span className="text-xs text-emerald-700 dark:text-emerald-400">
=======
          <div className="space-y-4 text-xs">
            <p className="text-slate-700">
              You are confirming the appointment for <strong>{selectedRequest.patientName}</strong> with <strong>Dr. {selectedRequest.doctorName}</strong> on:
            </p>

            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-1">
              <span className="text-sm font-black font-mono text-emerald-900 block">
                {selectedRequest.requestedDate || selectedRequest.date} at {selectedRequest.requestedTime || selectedRequest.time}
              </span>
              <span className="text-[11px] text-emerald-700">
>>>>>>> origin/main
                Service: {selectedRequest.serviceName} ({selectedRequest.durationMinutes || 30} mins)
              </span>
            </div>

<<<<<<< HEAD
            <p className="text-xs text-slate-500 dark:text-slate-400">
=======
            <p className="text-[11px] text-slate-500">
>>>>>>> origin/main
              Confirming will add this booking to the doctor's calendar, update the clinic dashboard, and dispatch an immediate confirmation notification to the patient.
            </p>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" size="sm" onClick={() => setIsConfirmModalOpen(false)}>
                Cancel
              </Button>
<<<<<<< HEAD
              <Button variant="primary" size="sm" onClick={handleConfirmSubmit}>
                <CheckCircle2 className="w-4 h-4 mr-1.5" />
=======
              <Button variant="primary" size="sm" icon={CheckCircle2} onClick={handleConfirmSubmit}>
>>>>>>> origin/main
                Yes, Finalize & Confirm Booking
              </Button>
            </div>
          </div>
        )}
      </Modal>

      {/* Workflow B: Propose Alternative Slot Modal */}
      <Modal
        isOpen={isProposeModalOpen}
        onClose={() => setIsProposeModalOpen(false)}
        title="Propose Alternative Slot to Patient (Workflow B)"
      >
        {selectedRequest && (
<<<<<<< HEAD
          <form onSubmit={handleProposeSubmit} className="space-y-4 text-sm">
            <div className="p-3.5 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 rounded-xl text-blue-950 dark:text-blue-200 text-xs">
=======
          <form onSubmit={handleProposeSubmit} className="space-y-4 text-xs">
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-950 text-[11px]">
>>>>>>> origin/main
              The requested time was unavailable. Select a verified available slot on Dr. {selectedRequest.doctorName}'s schedule to propose to {selectedRequest.patientName}.
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
<<<<<<< HEAD
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Alternative Date</label>
=======
                <label className="block text-slate-700 font-semibold mb-1">Alternative Date</label>
>>>>>>> origin/main
                <input
                  type="date"
                  required
                  value={altDate}
                  onChange={(e) => setAltDate(e.target.value)}
<<<<<<< HEAD
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono text-sm"
=======
                  className="w-full p-2 rounded-lg border border-slate-300 font-mono text-xs"
>>>>>>> origin/main
                />
              </div>

              <div>
<<<<<<< HEAD
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Select Available Slot</label>
                <select
                  value={altTime}
                  onChange={(e) => setAltTime(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white font-mono text-sm"
=======
                <label className="block text-slate-700 font-semibold mb-1">Select Available Slot</label>
                <select
                  value={altTime}
                  onChange={(e) => setAltTime(e.target.value)}
                  className="w-full p-2 rounded-lg border border-slate-300 font-mono text-xs bg-white"
>>>>>>> origin/main
                >
                  {proposedDoctorSlots.filter((s) => s.available).map((s) => (
                    <option key={s.time} value={s.time}>{s.time}</option>
                  ))}
                  <option value="03:30 PM">03:30 PM (Reserved Slot)</option>
                  <option value="04:30 PM">04:30 PM</option>
                  <option value="05:30 PM">05:30 PM</option>
                </select>
              </div>
            </div>

            <div>
<<<<<<< HEAD
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">
=======
              <label className="block text-slate-700 font-semibold mb-1">
>>>>>>> origin/main
                Reason for Alternative (Displayed to Patient)
              </label>
              <textarea
                rows={3}
                required
                value={altReason}
                onChange={(e) => setAltReason(e.target.value)}
<<<<<<< HEAD
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm"
=======
                className="w-full p-2.5 rounded-lg border border-slate-300 text-xs"
>>>>>>> origin/main
                placeholder="Explain why the requested time could not be accommodated..."
              />
            </div>

<<<<<<< HEAD
            <div className="p-3.5 bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 rounded-xl text-xs text-slate-600 dark:text-slate-400">
=======
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-[11px] text-slate-600">
>>>>>>> origin/main
              <strong>Rules:</strong> The status will change to <em>"Alternative Slot Proposed / Awaiting Patient Response"</em>. The appointment will NOT be confirmed until the patient accepts and availability is re-validated.
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" size="sm" type="button" onClick={() => setIsProposeModalOpen(false)}>
                Cancel
              </Button>
<<<<<<< HEAD
              <Button variant="primary" size="sm" type="submit">
                <Send className="w-4 h-4 mr-1.5" />
=======
              <Button variant="primary" size="sm" type="submit" icon={Send}>
>>>>>>> origin/main
                Send Alternative to Patient
              </Button>
            </div>
          </form>
        )}
      </Modal>

      {/* Reject Request Modal */}
      <Modal
        isOpen={isRejectModalOpen}
        onClose={() => setIsRejectModalOpen(false)}
        title="Reject Appointment Request"
      >
        {selectedRequest && (
<<<<<<< HEAD
          <form onSubmit={handleRejectSubmit} className="space-y-4 text-sm">
            <p className="text-slate-700 dark:text-slate-300">
=======
          <form onSubmit={handleRejectSubmit} className="space-y-4 text-xs">
            <p className="text-slate-700">
>>>>>>> origin/main
              Are you sure you cannot accommodate <strong>{selectedRequest.patientName}</strong>'s booking request for <strong>Dr. {selectedRequest.doctorName}</strong>?
            </p>

            <div>
<<<<<<< HEAD
              <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Reason for Rejection</label>
=======
              <label className="block text-slate-700 font-semibold mb-1">Reason for Rejection</label>
>>>>>>> origin/main
              <textarea
                rows={3}
                required
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
<<<<<<< HEAD
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white text-sm"
=======
                className="w-full p-2.5 rounded-lg border border-slate-300 text-xs"
>>>>>>> origin/main
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <Button variant="outline" size="sm" type="button" onClick={() => setIsRejectModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" type="submit" className="bg-red-600 hover:bg-red-700">
                Confirm Rejection
              </Button>
            </div>
          </form>
        )}
      </Modal>
    </div>
  );
}
<<<<<<< HEAD
=======

>>>>>>> origin/main

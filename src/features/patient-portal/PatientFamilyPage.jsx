import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import { Modal } from '../../components/ui/Modal';
import {
  Users,
  UserPlus,
  Heart,
  Calendar,
  FileText,
  AlertTriangle,
  ShieldCheck,
  Plus,
  Edit2,
  Trash2,
  Phone,
  Droplet,
  Activity,
  CheckCircle2,
  Clock,
  Stethoscope,
  Info,
  Pill,
  ArrowRight,
  X,
  Package
} from 'lucide-react';

const ALLOWED_RELATIONSHIPS = ['Mother', 'Father', 'Son', 'Daughter', 'Wife'];
const BLOOD_GROUPS = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const MAX_MEMBERS = 4;

export function PatientFamilyPage() {
  const {
    currentUser,
    familyMembers = [],
    addFamilyMember,
    updateFamilyMember,
    deleteFamilyMember,
    addFamilyMemberRecord,
    showToast
  } = useApp();

  // Filter for current patient
  const myFamily = familyMembers.filter(
    (m) => m.primaryPatientId === 'pt-1041' || m.primaryPatientId === currentUser?.id
  );

  const isLimitReached = myFamily.length >= MAX_MEMBERS;

  // Add / Edit Modal State
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);

  // Records Modal State
  const [selectedMemberForRecords, setSelectedMemberForRecords] = useState(null);
  const [isAddRecordOpen, setIsAddRecordOpen] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    relationship: 'Wife',
    gender: 'Female',
    dob: '1995-01-01',
    bloodGroup: 'B+',
    phone: '',
    allergies: '',
    chronicConditions: '',
    currentMedications: '',
    medicalNotes: ''
  });

  // New Record Form State
  const [recordData, setRecordData] = useState({
    type: 'Consultation',
    title: '',
    doctorName: 'Dr. Arvind Rao, MDS',
    clinicName: 'CityCare Family Clinic & Implant Centre',
    date: new Date().toISOString().slice(0, 10),
    summary: '',
    diagnosis: '',
    status: 'Completed'
  });

  const handleOpenAddModal = () => {
    if (isLimitReached) {
      showToast(`Maximum family quota of ${MAX_MEMBERS} members reached.`, 'error');
      return;
    }
    setEditingMember(null);
    setFormData({
      name: '',
      relationship: 'Daughter',
      gender: 'Female',
      dob: '2022-05-18',
      bloodGroup: 'B+',
      phone: currentUser?.phone || '+91 98765 43210',
      allergies: '',
      chronicConditions: '',
      currentMedications: '',
      medicalNotes: ''
    });
    setIsFormModalOpen(true);
  };

  const handleOpenEditModal = (member) => {
    setEditingMember(member);
    setFormData({
      name: member.name,
      relationship: member.relationship,
      gender: member.gender || 'Female',
      dob: member.dob || '1990-01-01',
      bloodGroup: member.bloodGroup || 'B+',
      phone: member.phone || '',
      allergies: Array.isArray(member.allergies) ? member.allergies.join(', ') : '',
      chronicConditions: Array.isArray(member.chronicConditions) ? member.chronicConditions.join(', ') : '',
      currentMedications: Array.isArray(member.currentMedications) ? member.currentMedications.join(', ') : '',
      medicalNotes: member.medicalNotes || ''
    });
    setIsFormModalOpen(true);
  };

  const handleRelationshipChange = (rel) => {
    let defaultGender = 'Female';
    if (rel === 'Father' || rel === 'Son') defaultGender = 'Male';
    setFormData({ ...formData, relationship: rel, gender: defaultGender });
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    const allergiesArr = formData.allergies
      .split(',')
      .map((a) => a.trim())
      .filter(Boolean);

    const conditionsArr = formData.chronicConditions
      .split(',')
      .map((c) => c.trim())
      .filter(Boolean);

    const medsArr = formData.currentMedications
      .split(',')
      .map((m) => m.trim())
      .filter(Boolean);

    const payload = {
      name: formData.name,
      relationship: formData.relationship,
      gender: formData.gender,
      dob: formData.dob,
      bloodGroup: formData.bloodGroup,
      phone: formData.phone,
      allergies: allergiesArr,
      chronicConditions: conditionsArr,
      currentMedications: medsArr,
      medicalNotes: formData.medicalNotes
    };

    if (editingMember) {
      updateFamilyMember(editingMember.id, payload);
      setIsFormModalOpen(false);
    } else {
      if (isLimitReached) {
        showToast(`Cannot exceed ${MAX_MEMBERS} family members limit.`, 'error');
        return;
      }
      addFamilyMember({
        ...payload,
        primaryPatientId: 'pt-1041'
      });
      setIsFormModalOpen(false);
    }
  };

  const handleDelete = (member) => {
    if (window.confirm(`Are you sure you want to remove ${member.name} (${member.relationship}) from your family circle?`)) {
      deleteFamilyMember(member.id);
      if (selectedMemberForRecords?.id === member.id) {
        setSelectedMemberForRecords(null);
      }
    }
  };

  const handleAddRecordSubmit = (e) => {
    e.preventDefault();
    if (!selectedMemberForRecords) return;

    addFamilyMemberRecord(selectedMemberForRecords.id, recordData);
    setIsAddRecordOpen(false);
    setRecordData({
      type: 'Consultation',
      title: '',
      doctorName: 'Dr. Arvind Rao, MDS',
      clinicName: 'CityCare Family Clinic & Implant Centre',
      date: new Date().toISOString().slice(0, 10),
      summary: '',
      diagnosis: '',
      status: 'Completed'
    });

    // Refresh selected member reference from state
    const refreshed = familyMembers.find((m) => m.id === selectedMemberForRecords.id);
    if (refreshed) {
      setSelectedMemberForRecords(refreshed);
    }
  };

  // Calculate age helper
  const calculateAge = (dob) => {
    if (!dob) return '';
    const diff = Date.now() - new Date(dob).getTime();
    const ageDate = new Date(diff);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-bold text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-0.5 rounded-full border border-blue-200 dark:border-blue-800 uppercase tracking-wide">
              Family Circle Management
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
            Family Members & Health Records
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            Add up to {MAX_MEMBERS} immediate family members (Mother, Father, Son, Daughter, Wife) and coordinate their appointments and health records.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="primary"
            size="md"
            icon={UserPlus}
            onClick={handleOpenAddModal}
            disabled={isLimitReached}
            className={`font-bold shadow-md shadow-blue-500/20 ${
              isLimitReached ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            Add Family Member ({myFamily.length}/{MAX_MEMBERS})
          </Button>
        </div>
      </div>

      {/* Quota Progress Banner */}
      <div className="p-4 sm:p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1.5 flex-1 max-w-xl">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-800 dark:text-slate-200 flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              Family Member Quota Usage
            </span>
            <span className="font-mono font-bold text-blue-700 dark:text-blue-400">
              {myFamily.length} of {MAX_MEMBERS} Slots Assigned
            </span>
          </div>

          <div className="w-full bg-slate-100 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                isLimitReached ? 'bg-amber-500' : 'bg-blue-600'
              }`}
              style={{ width: `${(myFamily.length / MAX_MEMBERS) * 100}%` }}
            />
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            Allowed family roles: <strong className="text-slate-700 dark:text-slate-300">Mother, Father, Son, Daughter, Wife</strong>.
            {isLimitReached ? (
              <span className="text-amber-600 dark:text-amber-400 font-semibold ml-1">
                (Full quota reached)
              </span>
            ) : (
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold ml-1">
                ({MAX_MEMBERS - myFamily.length} slot available)
              </span>
            )}
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link to="/patient/appointments/book">
            <Button variant="outline" size="sm" icon={Calendar}>
              Book for Family Member
            </Button>
          </Link>
        </div>
      </div>

      {/* Family Members Cards Grid (3 col per row grid) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {myFamily.map((member) => {
          const age = calculateAge(member.dob);
          const recordsCount = member.records?.length || member.recordsCount || 0;

          return (
            <Card
              key={member.id}
<<<<<<< HEAD
              className="rounded-3xl border-[#263B59] bg-[#111E33] shadow-lg shadow-black/20 overflow-hidden flex flex-col justify-between hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
=======
              className="rounded-3xl border-white/60 dark:border-white/10 bg-white/75 dark:bg-slate-900/75 backdrop-blur-xl shadow-lg shadow-slate-200/50 dark:shadow-slate-950/50 overflow-hidden flex flex-col justify-between hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
>>>>>>> origin/main
            >
              <div>
                {/* Header Strip with ambient tint */}
                <div className="p-4 sm:p-5 bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-slate-50/50 dark:to-slate-900/40 border-b border-slate-100/80 dark:border-slate-800/80 flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold text-lg shrink-0">
                      {member.name.charAt(0)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold text-slate-900 dark:text-white">
                          {member.name}
                        </h3>
                        <Badge
                          variant={
                            member.relationship === 'Wife'
                              ? 'indigo'
                              : member.relationship === 'Mother' || member.relationship === 'Father'
                              ? 'purple'
                              : 'teal'
                          }
                          size="sm"
                        >
                          {member.relationship}
                        </Badge>
                      </div>

                      <div className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-2 mt-0.5">
                        <span>{member.gender}</span>
                        <span>•</span>
                        <span>{age} years old</span>
                        <span>•</span>
                        <span className="font-mono font-bold text-rose-600 dark:text-rose-400">
                          Blood: {member.bloodGroup || 'O+'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleOpenEditModal(member)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      title="Edit Family Member Profile"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(member)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                      title="Remove Family Member"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Content Body */}
                <div className="p-4 sm:p-5 space-y-3.5 text-xs">
                  {/* Phone / Contact */}
                  {member.phone && (
                    <div className="flex items-center justify-between text-slate-600 dark:text-slate-300">
                      <span className="text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5" /> Contact:
                      </span>
                      <span className="font-mono font-semibold">{member.phone}</span>
                    </div>
                  )}

                  {/* Medical Conditions & Allergies */}
                  <div className="space-y-1.5 pt-1 border-t border-slate-100 dark:border-slate-800">
                    <div className="flex items-start justify-between gap-2">
                      <span className="text-slate-400 dark:text-slate-500 font-semibold shrink-0">Allergies:</span>
                      {member.allergies && member.allergies.length > 0 ? (
                        <div className="flex flex-wrap gap-1 justify-end">
                          {member.allergies.map((all) => (
                            <span
                              key={all}
                              className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 dark:bg-rose-950/40 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-900/40"
                            >
                              {all}
                            </span>
                          ))}
                        </div>
                      ) : (
                        <span className="text-slate-500 dark:text-slate-400">None documented</span>
                      )}
                    </div>

                    <div className="flex items-start justify-between gap-2">
                      <span className="text-slate-400 dark:text-slate-500 font-semibold shrink-0">Conditions:</span>
                      {member.chronicConditions && member.chronicConditions.length > 0 ? (
                        <span className="text-right font-medium text-slate-800 dark:text-slate-200">
                          {member.chronicConditions.join(', ')}
                        </span>
                      ) : (
                        <span className="text-slate-500 dark:text-slate-400">None</span>
                      )}
                    </div>

                    {member.currentMedications && member.currentMedications.length > 0 && (
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-slate-400 dark:text-slate-500 font-semibold shrink-0">Medications:</span>
                        <span className="text-right text-slate-700 dark:text-slate-300 truncate max-w-[200px]">
                          {member.currentMedications.join(', ')}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Clinical Notes */}
                  {member.medicalNotes && (
                    <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 italic">
                      "{member.medicalNotes}"
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-4 sm:p-5 pt-0 border-t border-slate-100 dark:border-slate-800 mt-2 flex flex-wrap items-center justify-between gap-2 text-xs">
                <Button
                  variant="outline"
                  size="sm"
                  icon={FileText}
                  onClick={() => setSelectedMemberForRecords(member)}
                  className="font-semibold"
                >
                  Health Records ({recordsCount})
                </Button>

                <div className="flex items-center gap-1.5">
                  <Link
                    to={`/patient/packages?memberId=${encodeURIComponent(member.id)}`}
                    title={`Book Health Checkup Package for ${member.name}`}
                  >
                    <Button variant="ghost" size="sm" icon={Package} className="text-blue-600 dark:text-blue-400 font-semibold text-xs border border-blue-200 dark:border-blue-900/50 hover:bg-blue-50 dark:hover:bg-blue-950/40">
                      Checkup Package
                    </Button>
                  </Link>

                  <Link to={`/patient/appointments/book?forMember=${encodeURIComponent(member.name)}&memberRel=${encodeURIComponent(member.relationship)}`}>
                    <Button variant="secondary" size="sm" icon={Calendar} className="font-semibold">
                      Book Visit
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          );
        })}

        {/* Empty Slot Card placeholder if not reached */}
        {!isLimitReached && (
          <div
            onClick={handleOpenAddModal}
            className="p-8 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-600 transition-all flex flex-col items-center justify-center text-center cursor-pointer group bg-slate-50/40 dark:bg-slate-900/30"
          >
            <div className="w-12 h-12 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform mb-3">
              <Plus className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200">
              Add Family Member ({myFamily.length + 1}/{MAX_MEMBERS})
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mt-1">
              Add Mother, Father, Son, Daughter, or Wife to coordinate care, track prescriptions, and schedule clinic appointments.
            </p>
          </div>
        )}
      </div>

      {/* Add / Edit Family Member Modal */}
      {isFormModalOpen && (
        <Modal
          isOpen={isFormModalOpen}
          onClose={() => setIsFormModalOpen(false)}
          title={editingMember ? `Edit ${editingMember.name}'s Profile` : 'Add New Family Member'}
          size="md"
        >
          <form onSubmit={handleSubmitForm} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Full Name *
                </label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Ramesh Patel"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-semibold focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Relationship *
                </label>
                <select
                  value={formData.relationship}
                  onChange={(e) => handleRelationshipChange(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-semibold focus:ring-2 focus:ring-blue-500"
                >
                  {ALLOWED_RELATIONSHIPS.map((rel) => (
                    <option key={rel} value={rel}>{rel}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Date of Birth *
                </label>
                <input
                  required
                  type="date"
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-mono focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Gender
                </label>
                <select
                  value={formData.gender}
                  onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-semibold focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Female">Female</option>
                  <option value="Male">Male</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Blood Group
                </label>
                <select
                  value={formData.bloodGroup}
                  onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-bold focus:ring-2 focus:ring-blue-500"
                >
                  {BLOOD_GROUPS.map((bg) => (
                    <option key={bg} value={bg}>{bg}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Contact Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+91 98765 43210 (Optional or Primary Phone)"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs font-mono focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Known Drug & Food Allergies
                </label>
                <input
                  type="text"
                  value={formData.allergies}
                  onChange={(e) => setFormData({ ...formData, allergies: e.target.value })}
                  placeholder="e.g. Penicillin, Peanuts (Comma separated)"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500 text-rose-700 dark:text-rose-400 font-semibold"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Chronic Medical Conditions
                </label>
                <input
                  type="text"
                  value={formData.chronicConditions}
                  onChange={(e) => setFormData({ ...formData, chronicConditions: e.target.value })}
                  placeholder="e.g. Asthma, Hypertension, Diabetes"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Current Regular Medications
              </label>
              <input
                type="text"
                value={formData.currentMedications}
                onChange={(e) => setFormData({ ...formData, currentMedications: e.target.value })}
                placeholder="e.g. Inhaler, Calcium supplement"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Clinical Health Notes
              </label>
              <textarea
                rows={2}
                value={formData.medicalNotes}
                onChange={(e) => setFormData({ ...formData, medicalNotes: e.target.value })}
                placeholder="Specific clinical considerations, past surgeries, or dental notes"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-950 text-slate-900 dark:text-white text-xs focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-2">
              <Button variant="outline" size="sm" type="button" onClick={() => setIsFormModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" type="submit">
                {editingMember ? 'Update Member Profile' : 'Save Family Member'}
              </Button>
            </div>
          </form>
        </Modal>
      )}

      {/* Member Health Records Drawer / Modal */}
      {selectedMemberForRecords && (
        <Modal
          isOpen={!!selectedMemberForRecords}
          onClose={() => {
            setSelectedMemberForRecords(null);
            setIsAddRecordOpen(false);
          }}
          title={`Clinical Records: ${selectedMemberForRecords.name} (${selectedMemberForRecords.relationship})`}
          size="lg"
        >
          <div className="space-y-4 text-xs">
            {/* Member Quick Summary Header */}
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="font-bold text-slate-900 dark:text-white text-sm">
                  {selectedMemberForRecords.name}
                </span>
                <Badge variant="indigo" size="sm">{selectedMemberForRecords.relationship}</Badge>
                <span className="font-mono text-rose-600 dark:text-rose-400 font-bold">
                  Blood: {selectedMemberForRecords.bloodGroup || 'B+'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="primary"
                  size="xs"
                  icon={Plus}
                  onClick={() => setIsAddRecordOpen(!isAddRecordOpen)}
                >
                  {isAddRecordOpen ? 'Close Record Form' : 'Add Clinical Record'}
                </Button>
              </div>
            </div>

            {/* Add Record Inline Sub-Form */}
            {isAddRecordOpen && (
              <form onSubmit={handleAddRecordSubmit} className="p-4 rounded-xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 space-y-3">
                <h4 className="font-bold text-sm text-blue-900 dark:text-blue-200 flex items-center gap-1.5">
                  <Stethoscope className="w-4 h-4 text-blue-600" />
                  Log Consultation / Diagnostic Record
                </h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Record Type</label>
                    <select
                      value={recordData.type}
                      onChange={(e) => setRecordData({ ...recordData, type: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold"
                    >
                      <option value="Consultation">Doctor Consultation</option>
                      <option value="Prescription">Prescription Document</option>
                      <option value="Lab Report">Lab / Diagnostic Report</option>
                      <option value="Vaccination">Immunization / Vaccine</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Title / Procedure Name *</label>
                    <input
                      required
                      type="text"
                      value={recordData.title}
                      onChange={(e) => setRecordData({ ...recordData, title: e.target.value })}
                      placeholder="e.g. Pediatric Dental Fluoride Treatment"
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-semibold"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Attending Practitioner</label>
                    <input
                      type="text"
                      value={recordData.doctorName}
                      onChange={(e) => setRecordData({ ...recordData, doctorName: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Date of Visit</label>
                    <input
                      type="date"
                      value={recordData.date}
                      onChange={(e) => setRecordData({ ...recordData, date: e.target.value })}
                      className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">Clinical Findings & Summary</label>
                  <textarea
                    rows={2}
                    value={recordData.summary}
                    onChange={(e) => setRecordData({ ...recordData, summary: e.target.value })}
                    placeholder="Document clinical diagnosis, treatment performed, or prescription directions..."
                    className="w-full px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-1">
                  <Button variant="outline" size="xs" type="button" onClick={() => setIsAddRecordOpen(false)}>
                    Cancel
                  </Button>
                  <Button variant="primary" size="xs" type="submit">
                    Save Record
                  </Button>
                </div>
              </form>
            )}

            {/* Records Timeline List */}
            <div className="space-y-3">
              {(!selectedMemberForRecords.records || selectedMemberForRecords.records.length === 0) ? (
                <div className="p-8 text-center text-slate-400 dark:text-slate-500 rounded-xl border border-slate-200 dark:border-slate-800">
                  <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p className="font-semibold">No medical records documented yet.</p>
                  <p className="text-[11px] mt-0.5">Click "Add Clinical Record" to log past visits, prescriptions, or vaccinations.</p>
                </div>
              ) : (
                selectedMemberForRecords.records.map((rec) => (
                  <div
                    key={rec.id}
                    className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-300 dark:hover:border-blue-700 transition-colors space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge
                          variant={
                            rec.type === 'Prescription'
                              ? 'teal'
                              : rec.type === 'Vaccination'
                              ? 'purple'
                              : 'default'
                          }
                          size="sm"
                        >
                          {rec.type}
                        </Badge>
                        <span className="font-bold text-slate-900 dark:text-white text-sm">
                          {rec.title}
                        </span>
                      </div>
                      <span className="font-mono text-slate-400 dark:text-slate-500 text-[11px]">
                        {rec.date}
                      </span>
                    </div>

                    <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-xs">
                      {rec.summary}
                    </p>

                    {rec.diagnosis && (
                      <p className="text-[11px] text-blue-700 dark:text-blue-400 font-semibold">
                        Diagnosis: {rec.diagnosis}
                      </p>
                    )}

                    <div className="pt-1.5 flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500 border-t border-slate-100 dark:border-slate-800">
                      <span>Doctor: {rec.doctorName}</span>
                      <span>{rec.clinicName}</span>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-slate-100 dark:border-slate-800">
              <Link to={`/patient/appointments/book?forMember=${encodeURIComponent(selectedMemberForRecords.name)}&memberRel=${encodeURIComponent(selectedMemberForRecords.relationship)}`}>
                <Button variant="secondary" size="sm" icon={Calendar}>
                  Book Consultation for {selectedMemberForRecords.name}
                </Button>
              </Link>
              <Button variant="outline" size="sm" onClick={() => setSelectedMemberForRecords(null)}>
                Close
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}


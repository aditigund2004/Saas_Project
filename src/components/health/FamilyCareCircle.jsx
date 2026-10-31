import React, { useState } from 'react';
import { Card } from '../ui/Card';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import {
  Users,
  UserPlus,
  Calendar,
  Clock,
  Pill,
  Heart,
  Phone,
  AlertTriangle,
  ShieldCheck,
  CheckCircle2,
  Trash2,
  ChevronRight,
  Stethoscope,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export function FamilyCareCircle() {
  const {
    familyMembers = [],
    activeFamilyMemberId,
    setActiveFamilyMemberId,
    addFamilyMember,
    removeFamilyMember,
    showToast,
    isPatientFriendlyMode
  } = useApp();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newMemberName, setNewMemberName] = useState('');
  const [newMemberRelation, setNewMemberRelation] = useState('Spouse');
  const [newMemberAge, setNewMemberAge] = useState('');
  const [newMemberGender, setNewMemberGender] = useState('Female');
  const [newMemberBlood, setNewMemberBlood] = useState('B+');
  const [newMemberAllergies, setNewMemberAllergies] = useState('');
  const [newMemberEmergency, setNewMemberEmergency] = useState('');

  const currentMember = familyMembers.find((m) => m.id === activeFamilyMemberId) || familyMembers[0];

  const handleCreateMember = (e) => {
    e.preventDefault();
    if (!newMemberName.trim()) return;

    addFamilyMember({
      name: newMemberName.trim(),
      relation: newMemberRelation,
      age: Number(newMemberAge) || 28,
      gender: newMemberGender,
      bloodGroup: newMemberBlood,
      allergies: newMemberAllergies ? newMemberAllergies.split(',').map((s) => s.trim()) : ['None reported'],
      chronicConditions: ['None reported'],
      upcomingAppointment: {
        doctor: 'Dr. Aarav Mehta',
        clinic: 'CityCare Family Clinic',
        date: '2026-11-15',
        time: '11:00 AM',
        type: 'General Health Review'
      },
      activeMedicationsCount: 0,
      emergencyContact: newMemberEmergency || 'Aarav Patel — +91 98765 43210',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      recentEncounter: 'New profile added'
    });

    setIsAddModalOpen(false);
    setNewMemberName('');
    setNewMemberAge('');
    setNewMemberAllergies('');
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-700 text-white p-6 rounded-3xl shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold mb-2">
            <Users className="w-3.5 h-3.5 text-blue-200" />
            Family Healthcare Hub
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Family Care Circle
          </h1>
          <p className="text-xs sm:text-sm text-blue-100 max-w-xl mt-1">
            Manage consultations, appointment reminders, and vital records for your spouse, children, and elderly parents in one connected view.
          </p>
        </div>

        <Button
          variant="outline"
          size="md"
          onClick={() => setIsAddModalOpen(true)}
          className="bg-white/10 hover:bg-white/20 text-white border-white/30 text-xs font-bold self-start md:self-center"
        >
          <UserPlus className="w-4 h-4 mr-1.5" /> + Add Family Member
        </Button>
      </div>

      {/* Member Switching Pills */}
      <div className="flex flex-wrap gap-2.5">
        {familyMembers.map((member) => (
          <button
            key={member.id}
            type="button"
            onClick={() => {
              setActiveFamilyMemberId(member.id);
              showToast(`Switched view to ${member.name} (${member.relation})`);
            }}
            className={`p-3 rounded-2xl border transition-all flex items-center gap-3 cursor-pointer ${
              activeFamilyMemberId === member.id
                ? 'bg-blue-600 text-white border-blue-600 shadow-sm'
                : 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-800 hover:border-blue-300'
            }`}
          >
            <img
              src={member.avatar}
              alt={member.name}
              className="w-10 h-10 rounded-full object-cover border border-white/20"
            />
            <div className="text-left">
              <span className="font-extrabold text-xs block leading-tight">{member.name}</span>
              <span
                className={`text-[10px] font-semibold ${
                  activeFamilyMemberId === member.id ? 'text-blue-100' : 'text-slate-400'
                }`}
              >
                {member.relation} · {member.age}y
              </span>
            </div>
          </button>
        ))}
      </div>

      {/* Selected Member Healthcare Spotlight */}
      {currentMember && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-4">
              <img
                src={currentMember.avatar}
                alt={currentMember.name}
                className="w-16 h-16 rounded-2xl object-cover border-2 border-blue-500 shadow-xs"
              />
              <div>
                <div className="flex items-center gap-2">
                  <h3 className={`font-black text-slate-900 dark:text-white ${isPatientFriendlyMode ? 'text-2xl' : 'text-xl'}`}>
                    {currentMember.name}
                  </h3>
                  <Badge variant="primary" size="sm">
                    {currentMember.relation}
                  </Badge>
                </div>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {currentMember.gender} · {currentMember.age} Years Old · Blood Group: <span className="font-bold text-slate-800 dark:text-slate-200">{currentMember.bloodGroup}</span>
                </p>
              </div>
            </div>

            {currentMember.relation !== 'Self (Account Primary)' && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => removeFamilyMember(currentMember.id)}
                className="text-xs font-bold text-rose-600 hover:bg-rose-50 border-rose-200"
              >
                <Trash2 className="w-3.5 h-3.5 mr-1" /> Remove Member
              </Button>
            )}
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-2xl bg-blue-50/60 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-900">
              <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block mb-1">
                Upcoming Appointment
              </span>
              {currentMember.upcomingAppointment ? (
                <div>
                  <div className="font-bold text-slate-900 dark:text-white text-xs">
                    {currentMember.upcomingAppointment.doctor}
                  </div>
                  <div className="text-[11px] text-slate-500">
                    {currentMember.upcomingAppointment.date} at {currentMember.upcomingAppointment.time}
                  </div>
                  <Badge variant="outline" size="sm" className="mt-1.5">
                    {currentMember.upcomingAppointment.type}
                  </Badge>
                </div>
              ) : (
                <span className="text-xs text-slate-400">No scheduled visit</span>
              )}
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900">
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 block mb-1">
                Active Medications
              </span>
              <div className="text-2xl font-black text-slate-900 dark:text-white">
                {currentMember.activeMedicationsCount} Prescriptions
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">
                Dosage alerts synced to planner
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-purple-50/60 dark:bg-purple-950/30 border border-purple-200 dark:border-purple-900">
              <span className="text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:text-purple-400 block mb-1">
                Emergency Contact
              </span>
              <div className="font-bold text-slate-900 dark:text-white text-xs">
                {currentMember.emergencyContact}
              </div>
              <span className="text-[11px] text-slate-500 mt-1 block">
                Authorized proxy guardian
              </span>
            </div>
          </div>

          {/* Clinical Profile Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-850">
              <span className="text-xs font-bold text-rose-600 dark:text-rose-400 flex items-center gap-1.5 mb-2">
                <AlertTriangle className="w-4 h-4" /> Known Allergies & Sensitivities
              </span>
              <div className="flex flex-wrap gap-1.5">
                {currentMember.allergies.map((al, idx) => (
                  <Badge key={idx} variant="warning" size="sm">
                    {al}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-850">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-2">
                <Heart className="w-4 h-4 text-blue-500" /> Chronic Conditions & Monitored Health
              </span>
              <div className="flex flex-wrap gap-1.5">
                {currentMember.chronicConditions.map((cond, idx) => (
                  <Badge key={idx} variant="primary" size="sm">
                    {cond}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Consent Notice */}
      <div className="p-4 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-900/40 flex items-start gap-3">
        <ShieldCheck className="w-5 h-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
        <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          <span className="font-bold text-slate-900 dark:text-white block">
            Guardian & Family Proxy Authorization Notice
          </span>
          Accessing medical records or booking appointments on behalf of dependents or family members in production requires authorized legal consent or guardian proxy verification under HIPAA / ABDM standards. This demonstration uses synthetic demo accounts to illustrate proxy workflows.
        </div>
      </div>

      {/* Add Member Modal */}
      {isAddModalOpen && (
        <Modal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          title="Add New Family Care Member"
          size="md"
        >
          <form onSubmit={handleCreateMember} className="space-y-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={newMemberName}
                onChange={(e) => setNewMemberName(e.target.value)}
                placeholder="e.g., Priya Patel"
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Relationship *
                </label>
                <select
                  value={newMemberRelation}
                  onChange={(e) => setNewMemberRelation(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="Spouse">Spouse</option>
                  <option value="Child / Son">Child / Son</option>
                  <option value="Child / Daughter">Child / Daughter</option>
                  <option value="Parent / Mother">Parent / Mother</option>
                  <option value="Parent / Father">Parent / Father</option>
                  <option value="Sibling">Sibling</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Age (Years) *
                </label>
                <input
                  type="number"
                  required
                  value={newMemberAge}
                  onChange={(e) => setNewMemberAge(e.target.value)}
                  placeholder="e.g., 30"
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Gender
                </label>
                <select
                  value={newMemberGender}
                  onChange={(e) => setNewMemberGender(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
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
                  value={newMemberBlood}
                  onChange={(e) => setNewMemberBlood(e.target.value)}
                  className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  <option value="A+">A+</option>
                  <option value="B+">B+</option>
                  <option value="O+">O+</option>
                  <option value="AB+">AB+</option>
                  <option value="A-">A-</option>
                  <option value="B-">B-</option>
                  <option value="O-">O-</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-bold text-slate-700 dark:text-slate-300 mb-1">
                Known Allergies (Comma separated)
              </label>
              <input
                type="text"
                value={newMemberAllergies}
                onChange={(e) => setNewMemberAllergies(e.target.value)}
                placeholder="e.g., Penicillin, Dust mites"
                className="w-full p-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <div className="pt-3 border-t border-slate-200 dark:border-slate-700 flex justify-end gap-2">
              <Button variant="outline" size="sm" type="button" onClick={() => setIsAddModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" size="sm" type="submit" className="font-bold">
                Add to Care Circle
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}


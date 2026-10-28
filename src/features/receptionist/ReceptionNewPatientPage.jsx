import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { UserPlus, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

export function ReceptionNewPatientPage() {
  const navigate = useNavigate();
  const { createPatient, activeClinic, showToast, patients } = useApp();

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('Male');
  const [dob, setDob] = useState('1994-05-15');
  const [bloodGroup, setBloodGroup] = useState('O+');
  const [allergies, setAllergies] = useState('');
  const [notes, setNotes] = useState('');

  // Duplicate Check UI
<<<<<<< HEAD
  const isDuplicate = patients.some((p) => p.phone === phone && phone.trim().length > 6);

  const savePatient = () => {
    return createPatient({
=======
  const isDuplicate = patients.some(
    (p) => p.clinicId === activeClinic?.id && p.phone === phone && phone.trim().length > 6
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPt = createPatient({
>>>>>>> origin/main
      name,
      phone,
      email: email || `${name.toLowerCase().replace(/\s+/g, '.')}@example.demo`,
      gender,
      dob,
      bloodGroup,
      allergies: allergies ? allergies.split(',').map((a) => a.trim()) : [],
      medicalHistory: notes,
      address: activeClinic.city
    });
<<<<<<< HEAD
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newPt = savePatient();
=======

>>>>>>> origin/main
    showToast(`Patient ${newPt.name} (ID: ${newPt.patientIdNumber}) registered successfully!`);
    navigate('/reception/patients');
  };

<<<<<<< HEAD
  const handleSaveAndBook = (e) => {
    e.preventDefault();
    const newPt = savePatient();
    showToast(`Patient ${newPt.name} registered. Proceeding to appointment booking...`);
    navigate(`/reception/appointments/new?patientId=${newPt.id}`);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <Link to="/reception/patients" className="text-sm font-semibold text-blue-600 dark:text-blue-400 hover:underline">
            ← Patients Directory
          </Link>
          <span className="text-slate-300 dark:text-slate-700">•</span>
          <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Reception Desk Intake</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">Register New Patient</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Comprehensive front desk intake dossier with real-time duplicate phone number validation.
        </p>
      </div>

      <Card className="p-6 sm:p-8 border-slate-200 dark:border-slate-800 dark:bg-slate-900/90 shadow-sm space-y-5">
        {isDuplicate && (
          <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-sm flex items-center gap-2.5">
            <AlertCircle className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
            <span>
              <strong>Duplicate Warning:</strong> A patient with phone number <span className="font-mono font-bold">{phone}</span> is already registered in this clinic.
=======
  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div>
        <div className="flex items-center gap-2">
          <Link to="/reception/patients" className="text-xs text-blue-600 hover:underline">
            ← Patients Directory
          </Link>
          <span className="text-slate-300">•</span>
          <span className="text-xs font-semibold text-slate-500">Reception Desk</span>
        </div>
        <h1 className="text-2xl font-extrabold text-slate-900 mt-1">Register New Patient</h1>
        <p className="text-xs text-slate-500">Front desk intake form with duplicate phone detection.</p>
      </div>

      <Card className="p-6 sm:p-8 border-slate-200 shadow-sm space-y-4">
        {isDuplicate && (
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
            <span>
              <strong>Duplicate Warning:</strong> A patient with phone number {phone} is already registered in this clinic.
>>>>>>> origin/main
            </span>
          </div>
        )}

<<<<<<< HEAD
        <form onSubmit={handleSubmit} className="space-y-5 text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Patient Full Name *</label>
=======
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Patient Full Name *</label>
>>>>>>> origin/main
              <input
                required
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Full name"
<<<<<<< HEAD
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 text-sm focus:ring-2 focus:ring-blue-500 font-medium"
=======
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500"
>>>>>>> origin/main
              />
            </div>

            <div>
<<<<<<< HEAD
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Mobile / WhatsApp Number *</label>
=======
              <label className="block font-semibold text-slate-700 mb-1">Mobile / WhatsApp Number *</label>
>>>>>>> origin/main
              <input
                required
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98000 00000"
<<<<<<< HEAD
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 text-sm focus:ring-2 focus:ring-blue-500"
=======
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500"
>>>>>>> origin/main
              />
            </div>

            <div>
<<<<<<< HEAD
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Email Address</label>
=======
              <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
>>>>>>> origin/main
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="patient@example.demo"
<<<<<<< HEAD
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 text-sm focus:ring-2 focus:ring-blue-500"
=======
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500"
>>>>>>> origin/main
              />
            </div>

            <div>
<<<<<<< HEAD
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Date of Birth</label>
=======
              <label className="block font-semibold text-slate-700 mb-1">Date of Birth</label>
>>>>>>> origin/main
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
<<<<<<< HEAD
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 text-sm focus:ring-2 focus:ring-blue-500"
=======
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500"
>>>>>>> origin/main
              />
            </div>

            <div>
<<<<<<< HEAD
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 text-sm focus:ring-2 focus:ring-blue-500"
=======
              <label className="block font-semibold text-slate-700 mb-1">Gender</label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 bg-white"
>>>>>>> origin/main
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div>
<<<<<<< HEAD
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Blood Group</label>
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 text-sm focus:ring-2 focus:ring-blue-500"
=======
              <label className="block font-semibold text-slate-700 mb-1">Blood Group</label>
              <select
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
                className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 bg-white"
>>>>>>> origin/main
              >
                <option value="A+">A+</option>
                <option value="B+">B+</option>
                <option value="O+">O+</option>
                <option value="AB+">AB+</option>
              </select>
            </div>
          </div>

          <div>
<<<<<<< HEAD
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Known Drug Allergies</label>
=======
            <label className="block font-semibold text-slate-700 mb-1">Known Drug Allergies</label>
>>>>>>> origin/main
            <input
              type="text"
              value={allergies}
              onChange={(e) => setAllergies(e.target.value)}
              placeholder="e.g. Penicillin, NSAIDs (leave blank if none)"
<<<<<<< HEAD
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 text-sm focus:ring-2 focus:ring-blue-500"
=======
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500"
>>>>>>> origin/main
            />
          </div>

          <div>
<<<<<<< HEAD
            <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Medical Background / Notes</label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Pre-existing medical conditions, chronic prescriptions..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 text-sm focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="pt-4 flex flex-wrap items-center justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
            <Link to="/reception/patients">
              <Button variant="outline" size="md">Cancel</Button>
            </Link>
            <Button
              variant="outline"
              size="md"
              type="button"
              onClick={handleSaveAndBook}
              className="text-blue-600 border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/40 font-bold"
            >
              Save & Book Appointment →
            </Button>
            <Button variant="primary" size="md" type="submit" className="shadow-md shadow-blue-500/20">
=======
            <label className="block font-semibold text-slate-700 mb-1">Medical Background / Notes</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Pre-existing medical conditions, chronic prescriptions..."
              className="w-full px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="pt-2 flex justify-end gap-2 border-t border-slate-100">
            <Link to="/reception/patients">
              <Button variant="outline" size="sm">Cancel</Button>
            </Link>
            <Button variant="primary" size="md" type="submit">
>>>>>>> origin/main
              Save Patient Dossier
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}


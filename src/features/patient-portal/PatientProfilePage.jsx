import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { DemoPatientSwitcher } from '../../components/patient/DemoPatientSwitcher';
import { User, Phone, Mail, ShieldAlert, HeartPulse, Save, BadgeCheck } from 'lucide-react';

export function PatientProfilePage() {
  const { currentUser, activePatientId, patients = [], updatePatient, showToast } = useApp();

  const activePatient =
    patients.find((p) => p.id === activePatientId || p.patientIdNumber === activePatientId) ||
    patients.find((p) => p.name === currentUser?.name) ||
    patients[0];

  const [form, setForm] = useState({
    name: activePatient?.name || 'Aarav Patel',
    phone: activePatient?.phone || '+91 98765 43210',
    email: activePatient?.email || 'aarav.patel@example.demo',
    bloodGroup: activePatient?.bloodGroup || 'B+',
    allergies: Array.isArray(activePatient?.allergies) ? activePatient.allergies.join(', ') : (activePatient?.allergies || 'Penicillin, Sulfa drugs'),
    emergencyContact: activePatient?.emergencyContact || 'Sunita Patel (Spouse) - +91 98765 43219',
    address: activePatient?.address || '402 Sunrise Heights, Bandra West, Mumbai'
  });

  useEffect(() => {
    if (activePatient) {
      setForm({
        name: activePatient.name || '',
        phone: activePatient.phone || '',
        email: activePatient.email || '',
        bloodGroup: activePatient.bloodGroup || 'B+',
        allergies: Array.isArray(activePatient.allergies) ? activePatient.allergies.join(', ') : (activePatient.allergies || 'None'),
        emergencyContact: activePatient.emergencyContact || 'Family Contact - +91 98765 43210',
        address: activePatient.address || 'Mumbai, Maharashtra'
      });
    }
  }, [activePatient]);

  const handleSave = (e) => {
    e.preventDefault();
    if (!activePatient) return;
    updatePatient(activePatient.id, {
      ...form,
      allergies: form.allergies ? form.allergies.split(',').map((a) => a.trim()) : []
    });
  };

  return (
    <div className="max-w-4xl space-y-6">
      <DemoPatientSwitcher />

      <div>
        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">Account Settings</span>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">My Patient Profile</h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">

          Manage your personal details, emergency contact, and documented allergies.
        </p>
      </div>

      <Card className="border-slate-200 dark:border-slate-800 dark:bg-slate-900/90 shadow-sm">
        <CardHeader
          title="Personal & Health Information"
          subtitle={`Patient ID: ${activePatient?.patientIdNumber || activePatient?.id || 'PT-1041'} · Registered on ${activePatient?.registeredAt || '2026-01-01'}`}
        />
        <CardContent>
          <form onSubmit={handleSave} className="space-y-5 text-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Full Name</label>

                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 text-sm focus:ring-2 focus:ring-blue-500 font-medium"

                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Mobile / WhatsApp Number</label>

                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 text-sm focus:ring-2 focus:ring-blue-500 font-mono"

                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Email Address</label>

                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 text-sm focus:ring-2 focus:ring-blue-500"

                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Blood Group</label>

                <input
                  type="text"
                  value={form.bloodGroup}
                  onChange={(e) => setForm({ ...form, bloodGroup: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 text-sm focus:ring-2 focus:ring-blue-500 font-bold"

                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Known Drug Allergies</label>

              <input
                type="text"
                value={form.allergies}
                onChange={(e) => setForm({ ...form, allergies: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-950 text-sm focus:ring-2 focus:ring-blue-500 text-rose-700 dark:text-rose-400 font-semibold"

              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Emergency Contact Person & Phone</label>

              <input
                type="text"
                value={form.emergencyContact}
                onChange={(e) => setForm({ ...form, emergencyContact: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 text-sm focus:ring-2 focus:ring-blue-500"

              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">Residential Address</label>

              <input
                type="text"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100 text-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="pt-3 flex justify-end border-t border-slate-100 dark:border-slate-800">
              <Button variant="primary" size="md" type="submit" icon={Save} className="shadow-md shadow-blue-500/20 font-bold">
                Save Profile Changes

              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}


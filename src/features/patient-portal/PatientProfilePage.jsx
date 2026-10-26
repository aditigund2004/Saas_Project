import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { User, Phone, Mail, ShieldAlert, HeartPulse, Save } from 'lucide-react';

export function PatientProfilePage() {
  const { currentUser, showToast } = useApp();

  const [form, setForm] = useState({
    name: currentUser?.name || 'Aarav Patel',
    phone: currentUser?.phone || '+91 98765 43210',
    email: currentUser?.email || 'aarav.patel@example.demo',
    bloodGroup: 'B+',
    allergies: 'Penicillin, Sulfa drugs',
    emergencyContact: 'Sunita Patel (Spouse) - +91 98765 43219',
    address: '402 Sunrise Heights, Bandra West, Mumbai'
  });

  const handleSave = (e) => {
    e.preventDefault();
    showToast('Your patient profile has been updated!');
  };

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">Account Settings</span>
        <h1 className="text-2xl font-extrabold text-slate-900">My Patient Profile</h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Manage your personal details, emergency contact, and documented allergies.
        </p>
      </div>

      <Card>
        <CardHeader
          title="Personal & Health Information"
          subtitle="Shared securely with your consulting practitioners"
        />
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Mobile / WhatsApp Number</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Email Address</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Blood Group</label>
                <input
                  type="text"
                  value={form.bloodGroup}
                  onChange={(e) => setForm({ ...form, bloodGroup: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Known Drug Allergies</label>
              <input
                type="text"
                value={form.allergies}
                onChange={(e) => setForm({ ...form, allergies: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500 text-rose-700 font-semibold"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Emergency Contact Person & Phone</label>
              <input
                type="text"
                value={form.emergencyContact}
                onChange={(e) => setForm({ ...form, emergencyContact: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Residential Address</label>
              <input
                type="text"
                value={form.address}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="pt-2 flex justify-end border-t border-slate-100">
              <Button variant="primary" size="md" type="submit" icon={Save}>
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}


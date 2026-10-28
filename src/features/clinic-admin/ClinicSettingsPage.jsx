import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, CardHeader, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Settings, Save, Building2, ShieldCheck } from 'lucide-react';

export function ClinicSettingsPage() {
  const { activeClinic, setClinics, showToast } = useApp();

  const [form, setForm] = useState({
    name: activeClinic.name,
    tagline: activeClinic.tagline,
    phone: activeClinic.phone,
    email: activeClinic.email,
    address: activeClinic.address,
    city: activeClinic.city,
    operatingHours: activeClinic.operatingHours,
    bookingPolicy: activeClinic.bookingPolicy
  });

  const handleSave = (e) => {
    e.preventDefault();
    setClinics((prev) =>
      prev.map((c) => (c.id === activeClinic.id ? { ...c, ...form } : c))
    );
    showToast('Clinic profile & operational policies updated!');
  };

  return (
    <div className="max-w-4xl space-y-6">
      <div>
<<<<<<< HEAD
        <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">Practice Profile</span>
        <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">Clinic Information & Policies</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
=======
        <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Practice Profile</span>
        <h1 className="text-2xl font-extrabold text-slate-900">Clinic Information & Policies</h1>
        <p className="text-xs text-slate-500 mt-0.5">
>>>>>>> origin/main
          Public directory profile, contact details, appointment cancellation rules, and operating hours.
        </p>
      </div>

<<<<<<< HEAD
      <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
=======
      <Card>
>>>>>>> origin/main
        <CardHeader
          title="Organization Profile"
          subtitle="Displayed on public directory and digital prescription headers"
        />
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
<<<<<<< HEAD
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Clinic Name *</label>
=======
                <label className="block font-semibold text-slate-700 mb-1">Clinic Name *</label>
>>>>>>> origin/main
                <input
                  required
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
<<<<<<< HEAD
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-blue-500"
=======
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500"
>>>>>>> origin/main
                />
              </div>

              <div>
<<<<<<< HEAD
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Specialty Tagline *</label>
=======
                <label className="block font-semibold text-slate-700 mb-1">Specialty Tagline *</label>
>>>>>>> origin/main
                <input
                  required
                  type="text"
                  value={form.tagline}
                  onChange={(e) => setForm({ ...form, tagline: e.target.value })}
<<<<<<< HEAD
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-blue-500"
=======
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500"
>>>>>>> origin/main
                />
              </div>

              <div>
<<<<<<< HEAD
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Contact Phone *</label>
=======
                <label className="block font-semibold text-slate-700 mb-1">Contact Phone *</label>
>>>>>>> origin/main
                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
<<<<<<< HEAD
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-blue-500"
=======
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500"
>>>>>>> origin/main
                />
              </div>

              <div>
<<<<<<< HEAD
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Official Email *</label>
=======
                <label className="block font-semibold text-slate-700 mb-1">Official Email *</label>
>>>>>>> origin/main
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
<<<<<<< HEAD
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-blue-500"
=======
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500"
>>>>>>> origin/main
                />
              </div>

              <div>
<<<<<<< HEAD
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Address *</label>
=======
                <label className="block font-semibold text-slate-700 mb-1">Address *</label>
>>>>>>> origin/main
                <input
                  required
                  type="text"
                  value={form.address}
                  onChange={(e) => setForm({ ...form, address: e.target.value })}
<<<<<<< HEAD
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-blue-500"
=======
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500"
>>>>>>> origin/main
                />
              </div>

              <div>
<<<<<<< HEAD
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">City *</label>
=======
                <label className="block font-semibold text-slate-700 mb-1">City *</label>
>>>>>>> origin/main
                <input
                  required
                  type="text"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
<<<<<<< HEAD
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-blue-500"
=======
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500"
>>>>>>> origin/main
                />
              </div>
            </div>

            <div>
<<<<<<< HEAD
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Operating Hours</label>
=======
              <label className="block font-semibold text-slate-700 mb-1">Operating Hours</label>
>>>>>>> origin/main
              <input
                type="text"
                value={form.operatingHours}
                onChange={(e) => setForm({ ...form, operatingHours: e.target.value })}
<<<<<<< HEAD
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-blue-500"
=======
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500"
>>>>>>> origin/main
              />
            </div>

            <div>
<<<<<<< HEAD
              <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1">Booking & Cancellation Policy</label>
=======
              <label className="block font-semibold text-slate-700 mb-1">Booking & Cancellation Policy</label>
>>>>>>> origin/main
              <textarea
                rows={3}
                value={form.bookingPolicy}
                onChange={(e) => setForm({ ...form, bookingPolicy: e.target.value })}
<<<<<<< HEAD
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end">
=======
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="pt-3 border-t border-slate-100 flex justify-end">
>>>>>>> origin/main
              <Button variant="primary" size="md" type="submit" icon={Save}>
                Save Clinic Settings
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}


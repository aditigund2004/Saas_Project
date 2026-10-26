import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { useAuth } from '../../hooks/useAuth';
import { Card, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import {
  Bell,
  CheckCircle2,
  Settings,
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';

export function PatientNotificationsPage() {
  const {
    notifications: contextNotifications = [],
    markNotificationAsRead,
    markAllNotificationsAsRead,
    isNotificationForCurrentUser,
    activeClinic,
    showToast
  } = useApp();
  const { user } = useAuth();

  const [preferences, setPreferences] = useState({
    whatsapp: true,
    sms: true,
    email: false,
    reminders24h: true
  });

  const togglePref = (key) => {
    setPreferences((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      showToast('Communication preferences updated.');
      return next;
    });
  };

  const allNotifications = contextNotifications.filter(
    (notification) =>
      notification.recipientRole === 'patient' &&
      notification.recipientUserId === user?.id &&
      isNotificationForCurrentUser(notification)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 uppercase tracking-wider">Patient Communication</span>
          <h1 className="text-2xl font-extrabold text-slate-900">Notifications & Visit Reminders</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Review clinic alerts, alternative slot proposals, booking confirmations, and simulated WhatsApp dispatches.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              markAllNotificationsAsRead();
            }}
          >
            Mark All Read
          </Button>
        </div>
      </div>

      {/* Grid: Notifications & Preferences */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Notifications List */}
        <div className="lg:col-span-8 space-y-3">
          <CardHeader
            title={`Recent Messages & Alerts (${allNotifications.length})`}
            subtitle="Automated alerts delivered via Meta Cloud API simulation"
          />

          {allNotifications.map((n) => {
            const isRead = n.read;
            return (
              <Card
                key={n.id}
                className={`p-4 border transition-all cursor-pointer ${
                  !isRead ? 'border-blue-300 bg-blue-50/20 shadow-xs' : 'border-slate-200'
                }`}
                onClick={() => {
                  if (markNotificationAsRead) markNotificationAsRead(n.id);
                }}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                    !isRead ? 'bg-blue-100 text-blue-700 border-blue-200' : 'bg-slate-100 text-slate-600 border-slate-200'
                  }`}>
                    {n.type?.includes('alternative') ? (
                      <Clock className="w-4 h-4 text-amber-600" />
                    ) : n.type?.includes('confirm') ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    ) : (
                      <Bell className="w-4 h-4" />
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-slate-900 text-xs">{n.title}</h3>
                        {!isRead && (
                          <Badge variant="teal" size="sm">New</Badge>
                        )}
                      </div>
                      <span className="text-[10px] text-slate-400 whitespace-nowrap">
                        {n.createdAt ? new Date(n.createdAt).toLocaleDateString() : 'Today'}
                      </span>
                    </div>

                    <p className="text-xs text-slate-600 mt-1 leading-relaxed">{n.message || n.desc}</p>

                    <div className="pt-2 flex items-center gap-3">
                      <Link to="/patient/appointments/requests" className="text-xs font-semibold text-blue-600 hover:underline">
                        View Booking Requests &rarr;
                      </Link>
                      <Link to="/patient/appointments" className="text-xs font-semibold text-slate-500 hover:underline">
                        My Appointments &rarr;
                      </Link>
                    </div>
                  </div>
                </div>
              </Card>
            );
          })}
          {allNotifications.length === 0 && (
            <Card className="p-8 text-center text-xs text-slate-500">
              No notifications have been sent to this account yet.
            </Card>
          )}
        </div>

        {/* Communication Preferences */}
        <div className="lg:col-span-4">
          <Card className="p-5 border-slate-200 space-y-4">
            <div className="flex items-center gap-2 pb-2 border-b border-slate-100">
              <Settings className="w-4 h-4 text-blue-600" />
              <h3 className="font-bold text-slate-900 text-xs">Communication Channels</h3>
            </div>

            <p className="text-[11px] text-slate-500">
              Select how {activeClinic.name} contacts you for schedule updates and clinical reminders.
            </p>

            <div className="space-y-3 text-xs">
              <label className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-white cursor-pointer hover:bg-slate-50">
                <span className="font-medium text-slate-800">WhatsApp Dispatch</span>
                <input
                  type="checkbox"
                  checked={preferences.whatsapp}
                  onChange={() => togglePref('whatsapp')}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-white cursor-pointer hover:bg-slate-50">
                <span className="font-medium text-slate-800">SMS Reminders</span>
                <input
                  type="checkbox"
                  checked={preferences.sms}
                  onChange={() => togglePref('sms')}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-white cursor-pointer hover:bg-slate-50">
                <span className="font-medium text-slate-800">Email Newsletters</span>
                <input
                  type="checkbox"
                  checked={preferences.email}
                  onChange={() => togglePref('email')}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                />
              </label>

              <label className="flex items-center justify-between p-2.5 rounded-xl border border-slate-200 bg-white cursor-pointer hover:bg-slate-50">
                <span className="font-medium text-slate-800">24-Hour Prior Alert</span>
                <input
                  type="checkbox"
                  checked={preferences.reminders24h}
                  onChange={() => togglePref('reminders24h')}
                  className="rounded text-blue-600 focus:ring-blue-500 w-4 h-4 cursor-pointer"
                />
              </label>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

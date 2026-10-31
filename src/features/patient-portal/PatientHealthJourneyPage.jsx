import React from 'react';
import { useApp } from '../../context/AppContext';
import { HealthTimeline } from '../../components/health/HealthTimeline';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/Button';
import { ArrowLeft, Plus } from 'lucide-react';

export function PatientHealthJourneyPage() {
  const { healthJourneyEvents = [], isPatientFriendlyMode } = useApp();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            Connected Care Timeline
          </span>
          <h1 className={`font-extrabold text-slate-900 dark:text-white tracking-tight ${isPatientFriendlyMode ? 'text-3xl' : 'text-2xl sm:text-3xl'}`}>
            My Living Health Journey
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Chronological interactive history of all consultations, diagnosed conditions, issued prescriptions, diagnostic labs, and personal health milestones.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link to="/patient/visit-prep">
            <Button variant="outline" size="sm" className="font-bold text-xs">
              Prepare for Visit →
            </Button>
          </Link>
          <Link to="/patient/appointments/book">
            <Button variant="primary" size="sm" className="font-bold text-xs shadow-xs">
              <Plus className="w-4 h-4 mr-1" /> Book Consultation
            </Button>
          </Link>
        </div>
      </div>

      <HealthTimeline events={healthJourneyEvents} />
    </div>
  );
}


import React from 'react';
import { BeforeMyVisit } from '../../components/health/BeforeMyVisit';
import { useSearchParams } from 'react-router-dom';

export function PatientBeforeMyVisitPage() {
  const [searchParams] = useSearchParams();
  const appointmentId = searchParams.get('appointmentId') || 'apt-101';

  return <BeforeMyVisit appointmentId={appointmentId} />;
}


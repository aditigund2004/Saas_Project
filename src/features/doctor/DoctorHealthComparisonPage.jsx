import React from 'react';
import { HealthComparison } from '../../components/doctor/HealthComparison';
import { useParams } from 'react-router-dom';

export function DoctorHealthComparisonPage() {
  const { patientId } = useParams();
  return <HealthComparison patientId={patientId} />;
}


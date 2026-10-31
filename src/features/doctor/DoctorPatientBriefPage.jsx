import React from 'react';
import { PatientBrief } from '../../components/doctor/PatientBrief';
import { useParams } from 'react-router-dom';

export function DoctorPatientBriefPage() {
  const { appointmentId } = useParams();
  return <PatientBrief appointmentId={appointmentId} />;
}


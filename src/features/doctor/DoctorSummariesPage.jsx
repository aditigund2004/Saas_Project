import React from 'react';
import { VisitSummaryGenerator } from '../../components/doctor/VisitSummaryGenerator';
import { useApp } from '../../context/AppContext';

export function DoctorSummariesPage() {
  const { encounters = [], appointments = [] } = useApp();
  const latestEncounter = encounters[0];
  const targetAppointment = appointments.find((a) => a.id === latestEncounter?.appointmentId) || appointments[0];

  return <VisitSummaryGenerator encounter={latestEncounter} appointment={targetAppointment} />;
}


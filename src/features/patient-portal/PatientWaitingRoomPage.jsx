import React from 'react';
import { TransparentWaitingRoom } from '../../components/health/TransparentWaitingRoom';
import { useSearchParams } from 'react-router-dom';

export function PatientWaitingRoomPage() {
  const [searchParams] = useSearchParams();
  const appointmentId = searchParams.get('appointmentId') || 'apt-101';

  return <TransparentWaitingRoom appointmentId={appointmentId} />;
}


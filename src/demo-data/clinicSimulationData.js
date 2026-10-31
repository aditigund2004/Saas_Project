/**
 * Clinic Digital Twin & Operations Simulation Dataset
 * Supports what-if operational scenario modeling for Super Admins and Clinic Admins.
 * Simulated metrics: Queue wait times, doctor utilization, room occupancy, throughput.
 */

export const INITIAL_CLINIC_BASELINES = {
  'clinic-citycare': {
    id: 'clinic-citycare',
    name: 'CityCare Family Clinic',
    activeDoctors: 4,
    consultationRooms: 5,
    avgConsultationMins: 18,
    dailyScheduledPatients: 42,
    walkInRatioPercent: 25, // approx 11 walk-ins
    operatingHoursPerDay: 8,
    receptionStaff: 2,
    // Baseline outcomes
    baselineQueueWaitMins: 14,
    baselineDoctorUtilizationPercent: 74,
    baselineRoomOccupancyPercent: 68,
    baselineDailyCompleted: 50,
    baselinePatientSatisfactionScore: 4.8
  },
  'clinic-heartwell': {
    id: 'clinic-heartwell',
    name: 'HeartWell Cardiology Centre',
    activeDoctors: 3,
    consultationRooms: 4,
    avgConsultationMins: 25,
    dailyScheduledPatients: 28,
    walkInRatioPercent: 15,
    operatingHoursPerDay: 7,
    receptionStaff: 2,
    baselineQueueWaitMins: 22,
    baselineDoctorUtilizationPercent: 82,
    baselineRoomOccupancyPercent: 78,
    baselineDailyCompleted: 31,
    baselinePatientSatisfactionScore: 4.9
  },
  'clinic-brightsmile': {
    id: 'clinic-brightsmile',
    name: 'BrightSmile Dental Studio',
    activeDoctors: 3,
    consultationRooms: 3,
    avgConsultationMins: 35,
    dailyScheduledPatients: 22,
    walkInRatioPercent: 10,
    operatingHoursPerDay: 8,
    receptionStaff: 1,
    baselineQueueWaitMins: 11,
    baselineDoctorUtilizationPercent: 69,
    baselineRoomOccupancyPercent: 72,
    baselineDailyCompleted: 24,
    baselinePatientSatisfactionScore: 4.7
  }
};

export const SIMULATION_SCENARIOS = [
  {
    id: 'scenario-doctor-unavailable',
    name: 'Doctor Becomes Unavailable (Unexpected Absence)',
    description: '1 of the on-duty consulting doctors is called for emergency hospital rounds or illness.',
    doctorDelta: -1,
    patientDelta: 0,
    durationDeltaMins: 0,
    roomDelta: 0,
    demandMultiplier: 1.0,
    narrative: 'Remaining doctors must absorb patient load or appointments must be rescheduled, triggering immediate queue pressure.'
  },
  {
    id: 'scenario-walkin-surge',
    name: 'Surge of 10 Additional Walk-In Patients',
    description: 'Post-holiday sudden influx of unbooked patients arriving at the front desk simultaneously.',
    doctorDelta: 0,
    patientDelta: 10,
    durationDeltaMins: 0,
    roomDelta: 0,
    demandMultiplier: 1.25,
    narrative: 'Walk-ins increase reception triage load and interleave with scheduled appointments.'
  },
  {
    id: 'scenario-duration-increase',
    name: 'Complex Consultations (+8 Mins per Patient)',
    description: 'Multiple patients present complex multi-system complaints requiring extended examination and counseling.',
    doctorDelta: 0,
    patientDelta: 0,
    durationDeltaMins: 8,
    roomDelta: 0,
    demandMultiplier: 1.0,
    narrative: 'Longer consultation times cause cascading delays for subsequent appointment slots.'
  },
  {
    id: 'scenario-room-offline',
    name: '2 Consultation Rooms Under Maintenance / Sanitization',
    description: 'Sanitization protocol or HVAC repairs take 2 examination chambers offline.',
    doctorDelta: 0,
    patientDelta: 0,
    durationDeltaMins: 0,
    roomDelta: -2,
    demandMultiplier: 1.0,
    narrative: 'Doctors experience chamber contention, creating physical bottlenecks despite doctor availability.'
  },
  {
    id: 'scenario-peak-demand',
    name: 'Peak Hour Flu Season Demand (+50% Inflow)',
    description: 'Seasonal spike in acute viral infections driving massive same-day booking requests.',
    doctorDelta: 0,
    patientDelta: 18,
    durationDeltaMins: -3, // doctors rush slightly
    roomDelta: 0,
    demandMultiplier: 1.5,
    narrative: 'System test under maximum stress; examines threshold before appointment cancellation is required.'
  }
];

/**
 * Calculates deterministic simulated operational impact based on mathematical queueing approximations.
 */
export function calculateSimulationOutcome(baseline, params) {
  const effectiveDoctors = Math.max(1, baseline.activeDoctors + (params.doctorDelta || 0));
  const effectiveRooms = Math.max(1, baseline.consultationRooms + (params.roomDelta || 0));
  const effectiveDuration = Math.max(5, baseline.avgConsultationMins + (params.durationDeltaMins || 0));
  const totalPatients = Math.max(5, Math.round((baseline.dailyScheduledPatients + (params.patientDelta || 0)) * (params.demandMultiplier || 1)));

  // Daily clinic capacity (patient slots across available physician chambers)
  const totalAvailablePhysicianMins = effectiveDoctors * (baseline.operatingHoursPerDay * 60);
  const totalAvailableRoomMins = effectiveRooms * (baseline.operatingHoursPerDay * 60);
  const bottleneckMinutes = Math.min(totalAvailablePhysicianMins, totalAvailableRoomMins);

  const maxDeliverablePatients = Math.floor(bottleneckMinutes / effectiveDuration);
  const completedPatients = Math.min(totalPatients, maxDeliverablePatients);
  const unservicedOverflow = Math.max(0, totalPatients - maxDeliverablePatients);

  // Utilization calculation
  const totalRequiredMins = totalPatients * effectiveDuration;
  const rawUtilization = Math.round((totalRequiredMins / bottleneckMinutes) * 100);
  const doctorUtilization = Math.min(100, Math.max(20, rawUtilization));
  const roomOccupancy = Math.min(100, Math.max(20, Math.round((totalPatients * effectiveDuration / totalAvailableRoomMins) * 100)));

  // Queue wait approximation (M/M/c queueing delay model heuristic)
  const loadFactor = totalPatients / maxDeliverablePatients;
  let estimatedWaitMins;
  if (loadFactor <= 0.7) {
    estimatedWaitMins = Math.round(baseline.baselineQueueWaitMins * (effectiveDuration / baseline.avgConsultationMins) * (baseline.activeDoctors / effectiveDoctors));
  } else if (loadFactor <= 0.95) {
    estimatedWaitMins = Math.round(baseline.baselineQueueWaitMins * (1 + (loadFactor - 0.7) * 3) * (effectiveDuration / baseline.avgConsultationMins) * (baseline.activeDoctors / effectiveDoctors));
  } else {
    // Severe congestion
    estimatedWaitMins = Math.round(baseline.baselineQueueWaitMins * (2.2 + (loadFactor - 0.95) * 6));
  }
  estimatedWaitMins = Math.max(4, Math.min(120, estimatedWaitMins));

  // Pressure Index (0 - 100)
  const pressureScore = Math.min(100, Math.round(
    (doctorUtilization * 0.45) +
    (roomOccupancy * 0.25) +
    (Math.min(estimatedWaitMins, 90) / 90 * 30)
  ));

  let pressureCategory = 'Optimal Balanced';
  if (pressureScore > 85) pressureCategory = 'Severe Overload (Action Required)';
  else if (pressureScore > 70) pressureCategory = 'Elevated Pressure';
  else if (pressureScore > 50) pressureCategory = 'Moderate Flow';

  return {
    effectiveDoctors,
    effectiveRooms,
    effectiveDuration,
    totalPatients,
    completedPatients,
    unservicedOverflow,
    doctorUtilization,
    roomOccupancy,
    estimatedWaitMins,
    pressureScore,
    pressureCategory,
    waitDeltaMins: estimatedWaitMins - baseline.baselineQueueWaitMins,
    utilizationDelta: doctorUtilization - baseline.baselineDoctorUtilizationPercent
  };
}


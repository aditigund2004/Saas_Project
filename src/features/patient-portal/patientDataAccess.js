import { DEMO_PATIENTS } from '../../demo-data';

export function belongsToCurrentPatient(record, patient) {
  if (!record || !patient) return false;

  const knownPatient = DEMO_PATIENTS.find(
    (candidate) =>
      (patient.email && candidate.email?.toLowerCase() === patient.email.toLowerCase()) ||
      (patient.phone && candidate.phone === patient.phone)
  );
  const patientIds = [patient.id, knownPatient?.id, knownPatient?.patientIdNumber]
    .filter(Boolean)
    .map((id) => id.toLowerCase());
  const patientIdMatches =
    record.patientId && patientIds.includes(record.patientId.toLowerCase());
  const patientEmailMatches =
    record.patientEmail &&
    patient.email &&
    record.patientEmail.trim().toLowerCase() === patient.email.trim().toLowerCase();
  const patientPhoneMatches =
    record.patientPhone && patient.phone && record.patientPhone === patient.phone;
  const patientNameMatches =
    !record.patientId &&
    !record.patientEmail &&
    record.patientName &&
    patient.name &&
    record.patientName.trim().toLowerCase() === patient.name.trim().toLowerCase();

  return Boolean(patientIdMatches || patientEmailMatches || patientPhoneMatches || patientNameMatches);
}

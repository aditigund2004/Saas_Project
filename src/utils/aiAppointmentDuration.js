/**
 * AI Dynamic Appointment Duration Engine
 * 
 * Predicts and dynamically adjusts appointment lengths based on:
 * 1. Reason for visit & clinical service baseline
 * 2. Patient complexity profile (age, comorbidities, allergies, first-time status, dependent family members)
 * 3. Doctor's historical clinical pace derived from empirical consult logs (fast, balanced, thorough)
 * 
 * Replaces rigid fixed 15/30 min calendar blocks with precision clinical scheduling.
 */

// Doctor Empirical Pace Profiles
export const DOCTOR_PACE_PROFILES = {
  'doc-aarav-mehta': {
    id: 'doc-aarav-mehta',
    doctorName: 'Dr. Aarav Mehta',
    specialty: 'General Medicine & Internal Health',
    paceCategory: 'Thorough / Detail-Oriented',
    paceFactor: 1.15, // Spends 15% more time on lifestyle & diagnostic explanations
    avgMinutes: 28,
    historicalConsults: 412,
    punctualityRate: '96%',
    description: 'Takes extra time for thorough systemic reviews, lifestyle counseling, and medication education.'
  },
  'doc-neha-kulkarni': {
    id: 'doc-neha-kulkarni',
    doctorName: 'Dr. Neha Kulkarni',
    specialty: 'Family Medicine & Preventive Healthcare',
    paceCategory: 'High-Throughput / Rapid',
    paceFactor: 0.85, // 15% faster consults for acute/routine cases
    avgMinutes: 18,
    historicalConsults: 580,
    punctualityRate: '98%',
    description: 'Highly structured, rapid-assessment consultation style ideal for straightforward acute and follow-up care.'
  },
  'doc-rohan-deshmukh': {
    id: 'doc-rohan-deshmukh',
    doctorName: 'Dr. Rohan Deshmukh',
    specialty: 'Interventional Cardiology & Preventive Cardiac Care',
    paceCategory: 'In-Depth Specialist',
    paceFactor: 1.30, // 30% extended time for ECG interpretations, cardiovascular risks
    avgMinutes: 38,
    historicalConsults: 340,
    punctualityRate: '94%',
    description: 'Extended specialty consults including resting ECG review, cardiovascular risk scoring, and echocardiogram analysis.'
  },
  'doc-isha-shah': {
    id: 'doc-isha-shah',
    doctorName: 'Dr. Isha Shah',
    specialty: 'General Dentistry & Orthodontics',
    paceCategory: 'Balanced / Standard',
    paceFactor: 1.00,
    avgMinutes: 25,
    historicalConsults: 290,
    punctualityRate: '95%',
    description: 'Consistent, balanced clinical cadence adhering closely to treatment plan milestones.'
  },
  'doc-kunal-joshi': {
    id: 'doc-kunal-joshi',
    doctorName: 'Dr. Kunal Joshi',
    specialty: 'Endodontics & Conservative Dentistry',
    paceCategory: 'Procedure Focused',
    paceFactor: 1.20,
    avgMinutes: 35,
    historicalConsults: 310,
    punctualityRate: '92%',
    description: 'Procedure-intensive consults incorporating pre-operative radiography and local anesthesia onset time.'
  },
  'doc-ananya-rao': {
    id: 'doc-ananya-rao',
    doctorName: 'Dr. Ananya Rao',
    specialty: 'Clinical Dermatology & Trichology',
    paceCategory: 'Efficient / Focused',
    paceFactor: 0.95,
    avgMinutes: 22,
    historicalConsults: 460,
    punctualityRate: '97%',
    description: 'Targeted visual and dermoscopic evaluation with rapid digital image cataloging.'
  },
  'doc-vikram-patil': {
    id: 'doc-vikram-patil',
    doctorName: 'Dr. Vikram Patil',
    specialty: 'Orthopedic Surgery & Sports Injury Assessment',
    paceCategory: 'Detailed Musculoskeletal',
    paceFactor: 1.10,
    avgMinutes: 26,
    historicalConsults: 395,
    punctualityRate: '94%',
    description: 'Dedicated gait analysis, active range-of-motion testing, and radiological imaging evaluation.'
  }
};

// Clinical Reason Baseline Categories
export const CLINICAL_REASONS = [
  {
    id: 'refill',
    label: 'Prescription Refill & Vitals Check',
    baseMinutes: 10,
    category: 'Express Care',
    keywords: ['refill', 'repeat', 'script', 'medication continuation', 'routine refill']
  },
  {
    id: 'lab_review',
    label: 'Lab & Diagnostic Report Review',
    baseMinutes: 15,
    category: 'Diagnostic Review',
    keywords: ['report', 'lab', 'blood test', 'x-ray', 'mri', 'scan', 'biopsy', 'ultrasound', 'results', 'cbc']
  },
  {
    id: 'routine_followup',
    label: 'Routine Follow-up & Progress Evaluation',
    baseMinutes: 15,
    category: 'Follow-up',
    keywords: ['follow up', 'follow-up', 'check-up', 'post-treatment', 'improving', 're-evaluation']
  },
  {
    id: 'general_consult',
    label: 'General Outpatient Consultation',
    baseMinutes: 20,
    category: 'Primary Care',
    keywords: ['fever', 'cough', 'cold', 'flu', 'sore throat', 'headache', 'stomach ache', 'consultation', 'malaise']
  },
  {
    id: 'chronic_management',
    label: 'Chronic Disease Management (Diabetes / BP / Thyroid)',
    baseMinutes: 25,
    category: 'Chronic Care',
    keywords: ['diabetes', 'sugar', 'blood sugar', 'hypertension', 'bp', 'thyroid', 'asthma', 'cholesterol', 'copd', 'chronic']
  },
  {
    id: 'comprehensive_intake',
    label: 'New Patient Comprehensive Intake',
    baseMinutes: 35,
    category: 'Comprehensive Intake',
    keywords: ['first time', 'new patient', 'intake', 'full checkup', 'executive health', 'annual physical']
  },
  {
    id: 'multi_symptom',
    label: 'Multi-Symptom / Complex Diagnostic Workup',
    baseMinutes: 40,
    category: 'Complex Medicine',
    keywords: ['multiple symptoms', 'chest pain', 'unexplained', 'fatigue', 'weight loss', 'dizziness', 'shortness of breath']
  },
  {
    id: 'minor_procedure',
    label: 'Minor Procedure / Suture Removal / Wound Care',
    baseMinutes: 45,
    category: 'Clinical Procedure',
    keywords: ['procedure', 'suture', 'stitches', 'dressing', 'wound', 'injection', 'ecg', 'nebulization', 'ear cleaning']
  },
  {
    id: 'specialist_cardio',
    label: 'In-Depth Cardiology / Specialty Evaluation',
    baseMinutes: 45,
    category: 'Specialty Care',
    keywords: ['cardiac', 'heart', 'palpitation', 'angina', 'arrythmia', 'orthopedic injury', 'second opinion']
  }
];

/**
 * Parses user input or selected reason and matches against clinical rules
 */
export function detectClinicalReason(reasonText = '', serviceName = '', consultationType = '') {
  const combined = `${reasonText} ${serviceName} ${consultationType}`.toLowerCase();

  // 1. Direct match with keywords
  for (const reason of CLINICAL_REASONS) {
    for (const kw of reason.keywords) {
      if (combined.includes(kw)) {
        return reason;
      }
    }
  }

  // 2. Default based on consultation type or service
  if (consultationType.toLowerCase().includes('first') || combined.includes('first consultation')) {
    return CLINICAL_REASONS.find((r) => r.id === 'comprehensive_intake');
  }

  if (combined.includes('follow-up') || combined.includes('follow up')) {
    return CLINICAL_REASONS.find((r) => r.id === 'routine_followup');
  }

  // Fallback to standard general consultation
  return CLINICAL_REASONS.find((r) => r.id === 'general_consult');
}

/**
 * Core Dynamic Duration Calculation Algorithm
 */
export function calculateDynamicDuration({
  doctor,
  patient,
  reasonForVisit = '',
  service = null,
  isNewPatient = false,
  patientNotes = '',
  familyMember = null
}) {
  // 1. Reason for Visit baseline
  const matchedReason = detectClinicalReason(
    `${reasonForVisit} ${patientNotes}`,
    service?.name || '',
    service?.type || ''
  );
  const baseMinutes = matchedReason.baseMinutes;

  // 2. Patient Complexity Factor
  const complexityAdjustments = [];
  let complexityMinutes = 0;

  // Determine effective patient data (family dependent or primary)
  const effectiveAge = familyMember?.age || calculateAge(patient?.dob) || 35;
  const effectiveAllergies = familyMember?.allergies || patient?.allergies || [];
  const effectiveHistory = `${familyMember?.medicalHistory || ''} ${patient?.medicalHistory || ''}`.toLowerCase();

  // A. Age considerations
  if (effectiveAge < 6) {
    complexityAdjustments.push({
      factor: 'Pediatric Patient (< 6 yrs)',
      adjustment: 5,
      reason: 'Requires toddler examination comfort pacing and parent medication instruction'
    });
    complexityMinutes += 5;
  } else if (effectiveAge >= 65) {
    complexityAdjustments.push({
      factor: 'Geriatric Patient (65+ yrs)',
      adjustment: 10,
      reason: 'Accounts for mobility assistance, polypharmacy reconciliation, and assisted exam'
    });
    complexityMinutes += 10;
  } else if (effectiveAge >= 50 && (effectiveHistory.includes('hypertension') || effectiveHistory.includes('diabetes'))) {
    complexityAdjustments.push({
      factor: 'Senior Comorbid Baseline (50+ yrs)',
      adjustment: 5,
      reason: 'Multi-system monitoring indicated for middle-to-senior demographic'
    });
    complexityMinutes += 5;
  }

  // B. Comorbidities & Chronic Illnesses
  let chronicCount = 0;
  if (effectiveHistory.includes('hypertension') || effectiveHistory.includes('bp')) chronicCount++;
  if (effectiveHistory.includes('diabetes') || effectiveHistory.includes('sugar')) chronicCount++;
  if (effectiveHistory.includes('asthma') || effectiveHistory.includes('respiratory')) chronicCount++;
  if (effectiveHistory.includes('thyroid')) chronicCount++;
  if (effectiveHistory.includes('cardiac') || effectiveHistory.includes('heart')) chronicCount++;

  if (chronicCount >= 3) {
    complexityAdjustments.push({
      factor: `High Comorbidity Profile (${chronicCount} Chronic Conditions)`,
      adjustment: 10,
      reason: 'Multiple interacting chronic conditions require sequential organ system review'
    });
    complexityMinutes += 10;
  } else if (chronicCount >= 1) {
    complexityAdjustments.push({
      factor: `Chronic Condition Active (${chronicCount} Condition)`,
      adjustment: 5,
      reason: 'Requires disease monitoring, medication tolerance, and vital correlation'
    });
    complexityMinutes += 5;
  }

  // C. Known Drug Allergies
  if (effectiveAllergies.length > 0) {
    complexityAdjustments.push({
      factor: `Documented Drug Allergies (${effectiveAllergies.length})`,
      adjustment: 5,
      reason: 'Pharmacological cross-sensitivity screening and safe prescribing review'
    });
    complexityMinutes += 5;
  }

  // D. First-time / New Patient Status
  if (isNewPatient || matchedReason.id === 'comprehensive_intake') {
    complexityAdjustments.push({
      factor: 'New Patient Registration & Anamnesis',
      adjustment: 10,
      reason: 'Baseline medical history documentation, baseline vitals entry, and patient rapport'
    });
    complexityMinutes += 10;
  }

  // E. Dependent Family Member Booking
  if (familyMember) {
    complexityAdjustments.push({
      factor: `Family Member Booking (${familyMember.relationship})`,
      adjustment: 5,
      reason: 'Caregiver alignment and proxy consultation communication'
    });
    complexityMinutes += 5;
  }

  // 3. Doctor's Historical Pace
  const doctorId = doctor?.id || doctor;
  const paceProfile = DOCTOR_PACE_PROFILES[doctorId] || {
    doctorName: doctor?.name || 'Practicing Physician',
    paceCategory: 'Balanced / Standard',
    paceFactor: 1.00,
    avgMinutes: 25,
    historicalConsults: 300,
    punctualityRate: '95%',
    description: 'Empirical pace aligns with standard clinical consultation guidelines.'
  };

  const doctorPaceFactor = paceProfile.paceFactor;
  const rawDoctorPaceDelta = Math.round((baseMinutes + complexityMinutes) * (doctorPaceFactor - 1));

  // Compute final adjusted duration
  const unroundedMinutes = (baseMinutes + complexityMinutes) * doctorPaceFactor;

  // Round intelligently to the nearest 5 minutes
  let calculatedMinutes = Math.round(unroundedMinutes / 5) * 5;

  // Clamp within clinical guardrails: Minimum 10 min, Maximum 60 min
  calculatedMinutes = Math.max(10, Math.min(60, calculatedMinutes));

  // Determine Complexity Tier
  let complexityTier = 'Standard';
  if (complexityMinutes === 0) complexityTier = 'Low';
  else if (complexityMinutes <= 10) complexityTier = 'Moderate';
  else if (complexityMinutes <= 15) complexityTier = 'High';
  else complexityTier = 'Very High';

  // Compare against rigid fixed 30-min block
  let timeSavedVsRigid = '';
  const standardRigidBlock = 30;
  const diff = calculatedMinutes - standardRigidBlock;
  if (diff < 0) {
    timeSavedVsRigid = `Saves ${Math.abs(diff)}m vs standard 30m block · Frees clinical operatory capacity`;
  } else if (diff > 0) {
    timeSavedVsRigid = `Adds ${diff}m vs rigid 30m block · Prevents doctor delay and appointment backlog`;
  } else {
    timeSavedVsRigid = `Optimal 30m fit · Matches predicted clinical consultation requirement`;
  }

  // Confidence Score (88% to 98% based on historical consult volume)
  const confidenceScore = Math.min(98, 88 + Math.floor((paceProfile.historicalConsults / 600) * 10));

  return {
    calculatedMinutes,
    baseMinutes,
    matchedReason,
    complexityMinutes,
    complexityAdjustments,
    complexityTier,
    doctorPaceProfile: paceProfile,
    doctorPaceMinutes: rawDoctorPaceDelta,
    doctorPaceFactor,
    confidenceScore,
    timeSavedVsRigid,
    aiReasoning: `AI allocated ${calculatedMinutes} mins based on ${matchedReason.label} (Base ${baseMinutes}m) + ${complexityTier} Patient Complexity (+${complexityMinutes}m) adjusted for ${paceProfile.doctorName}'s ${paceProfile.paceCategory} historical pace (${doctorPaceFactor}x).`
  };
}

/**
 * Calculates human age from DOB string YYYY-MM-DD
 */
export function calculateAge(dobString) {
  if (!dobString) return null;
  const birthDate = new Date(dobString);
  const diff = Date.now() - birthDate.getTime();
  const ageDate = new Date(diff);
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

/**
 * Calculates the end time given a starting time and duration in minutes
 * e.g., '10:30 AM', 35 => '11:05 AM'
 */
export function calculateEndTime(startTimeStr, durationMinutes) {
  if (!startTimeStr) return '';

  const [timePart, modifier] = startTimeStr.trim().split(' ');
  let [hours, minutes] = timePart.split(':').map(Number);

  if (modifier === 'PM' && hours < 12) hours += 12;
  if (modifier === 'AM' && hours === 12) hours = 0;

  const totalStartMinutes = hours * 60 + minutes;
  const totalEndMinutes = totalStartMinutes + durationMinutes;

  let endHours = Math.floor(totalEndMinutes / 60) % 24;
  const endMinutes = totalEndMinutes % 60;
  const endModifier = endHours >= 12 ? 'PM' : 'AM';

  if (endHours > 12) endHours -= 12;
  if (endHours === 0) endHours = 12;

  const paddedMinutes = endMinutes < 10 ? `0${endMinutes}` : endMinutes;
  const paddedHours = endHours < 10 ? `0${endHours}` : endHours;

  return `${paddedHours}:${paddedMinutes} ${endModifier}`;
}

/**
 * Formats a clean time span string
 * e.g., '10:30 AM - 11:05 AM (35m)'
 */
export function formatTimeWithDuration(startTimeStr, durationMinutes) {
  if (!startTimeStr) return '';
  const endTimeStr = calculateEndTime(startTimeStr, durationMinutes);
  return `${startTimeStr} - ${endTimeStr} (${durationMinutes}m)`;
}


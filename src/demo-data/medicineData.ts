import { MedicineInformation, MedicationReminderConfig, MedicationDoseLog } from '../types';

export const MEDICINE_DATABASE: Record<string, MedicineInformation> = {
  'augmentin': {
    id: 'med-info-augmentin',
    name: 'Augmentin 625 (Amoxicillin + Potassium Clavulanate)',
    genericName: 'Amoxicillin 500mg + Potassium Clavulanate 125mg',
    brandName: 'Augmentin 625 Duo / Clavam 625',
    drugClass: 'Penicillin Antibiotic + Beta-Lactamase Inhibitor',
    purpose: 'Treats acute bacterial dental infections, irreversible pulpitis, periapical abscesses, and deep fascial space infections caused by beta-lactamase producing organisms.',
    howToTake: 'Swallow whole with a full glass of water at the start of a meal. Do not crush, chew, or break extended-release tablets.',
    foodInstructions: 'Take immediately before or at the start of a meal to enhance absorption and significantly reduce gastrointestinal distress.',
    missedDoseGuidance: 'Take as soon as you remember. If it is within 2 hours of your next scheduled dose, skip the missed dose and resume your regular schedule. NEVER double the dose to compensate.',
    commonSideEffects: [
      'Mild diarrhea or loose stools (10-15%)',
      'Mild nausea or epigastric discomfort',
      'Oral or vaginal candidiasis (thrush)',
      'Transient headache'
    ],
    seriousSideEffects: [
      'Severe allergic anaphylaxis (facial swelling, urticaria, bronchospasm)',
      'Severe watery or bloody diarrhea (Pseudomembranous colitis / C. difficile)',
      'Cholestatic jaundice / yellowing of eyes or skin'
    ],
    warnings: [
      'Complete the entire prescribed 5-day course even if pain resolves, to prevent bacterial resistance.',
      'Contraindicated in patients with known penicillin or beta-lactam hypersensitivity.',
      'Maintain adequate hydration (at least 2.5L water daily) to avoid crystalluria.'
    ],
    storage: 'Store in a cool, dry place below 25°C protected from moisture and direct sunlight. Keep blister pack sealed.',
    pregnancyLactation: 'Category B. Generally considered safe in pregnancy under physician supervision.'
  },
  'zerodol-p': {
    id: 'med-info-zerodol-p',
    name: 'Zerodol-P (Aceclofenac + Paracetamol)',
    genericName: 'Aceclofenac 100mg + Paracetamol 325mg',
    brandName: 'Zerodol-P / Hifenac-P',
    drugClass: 'NSAID (COX-2 Preferential) + Non-Opioid Analgesic / Antipyretic',
    purpose: 'Provides rapid relief from acute post-endodontic dental pain, surgical inflammation, gingival tenderness, and swelling.',
    howToTake: 'Swallow whole with a glass of water or milk strictly after food. Take only when pain persists, with at least 8 hours between doses.',
    foodInstructions: 'Always take with or immediately after meals or with a glass of milk. Never take on an empty stomach to prevent gastric mucosal erosion.',
    missedDoseGuidance: 'Take only if pain is currently active. If no dental pain is present, the dose can be safely omitted. Maintain a minimum 6-hour interval between doses.',
    commonSideEffects: [
      'Epigastric discomfort or mild heartburn',
      'Mild nausea or indigestion',
      'Drowsiness or mild dizziness',
      'Constipation or flatulence'
    ],
    seriousSideEffects: [
      'Peptic ulceration or gastrointestinal bleeding (black tarry stools)',
      'Acute liver toxicity if combined with other paracetamol products',
      'Bronchospasm in NSAID-sensitive asthmatic patients'
    ],
    warnings: [
      'Do NOT consume alcohol while taking this medicine as it compounds gastric bleeding and hepatotoxicity risk.',
      'Do NOT combine with any other paracetamol, ibuprofen, or cold/cough medications.',
      'Use with caution in patients with history of gastritis, renal impairment, or hypertension.'
    ],
    storage: 'Store below 30°C in a dry place. Protect from heat and direct sunlight.',
    pregnancyLactation: 'Avoid during 3rd trimester of pregnancy due to risk of premature ductus arteriosus closure.'
  },
  'chlorhexidine': {
    id: 'med-info-chlorhexidine',
    name: 'Chlorhexidine Gluconate 0.2% Oral Rinse',
    genericName: 'Chlorhexidine Gluconate 0.2% w/v',
    brandName: 'Hexidine / Clohex / Peridex',
    drugClass: 'Bisbiguanide Topical Antimicrobial / Antiseptic',
    purpose: 'Broad-spectrum bactericidal oral rinse that reduces subgingival plaque, treats gingivitis, and prevents post-operative surgical site infection after root canal or dental scaling.',
    howToTake: 'Measure 10 ml undiluted. Swish vigorously around the mouth for 60 seconds, then spit out completely. Do NOT swallow.',
    foodInstructions: 'Do NOT eat, drink water, or rinse mouth with plain water for at least 30 minutes following the oral rinse for optimal mucosal substantivity.',
    missedDoseGuidance: 'Rinse as soon as you remember, unless it is close to the next scheduled rinse. Never swallow double volume.',
    commonSideEffects: [
      'Temporary alteration or blunting of taste sensation',
      'Superficial brown staining of tooth enamel and tongue surface (removable by dental polishing)',
      'Transient mild burning sensation on tongue mucosa'
    ],
    seriousSideEffects: [
      'Extremely rare hypersensitivity or mucosal desquamation'
    ],
    warnings: [
      'For oral topical use only. Do NOT swallow.',
      'Do not use toothpaste immediately before or after rinsing, as sodium lauryl sulfate in toothpastes inactivates chlorhexidine (wait 30 mins).',
      'Limit routine continuous use to 2 weeks unless specifically advised by your dentist.'
    ],
    storage: 'Store at room temperature below 25°C away from direct sunlight. Keep cap tightly closed.',
    pregnancyLactation: 'Category B. Minimal systemic absorption; safe for topical use.'
  },
  'telmisartan': {
    id: 'med-info-telmisartan',
    name: 'Telmisartan 20mg / 40mg',
    genericName: 'Telmisartan 20mg / 40mg',
    brandName: 'Micardis / Telma 20 / Telmikind',
    drugClass: 'Angiotensin II Receptor Blocker (ARB) Antihypertensive',
    purpose: 'Controls essential hypertension (high blood pressure) and provides long-term cardiovascular and renal protection against stroke and heart disease.',
    howToTake: 'Take once daily at the same time every morning with water. Can be taken with or without food.',
    foodInstructions: 'Can be taken with or without food. Maintain a consistent routine (e.g. daily with breakfast).',
    missedDoseGuidance: 'Take as soon as you remember on the same day. If you do not remember until the following morning, skip the missed dose and resume regular schedule. Never take two tablets on the same day.',
    commonSideEffects: [
      'Mild postural dizziness or lightheadedness upon standing up',
      'Back pain or muscle cramps',
      'Upper respiratory congestion or sinus discomfort',
      'Fatigue'
    ],
    seriousSideEffects: [
      'Hyperkalemia (high blood potassium levels)',
      'Severe hypotension (abnormally low blood pressure)',
      'Angioedema (swelling of face, lips, throat)'
    ],
    warnings: [
      'Do NOT stop taking this medication abruptly without consulting your cardiologist or physician.',
      'Avoid high-potassium salt substitutes unless advised by your doctor.',
      'Monitor blood pressure at regular weekly intervals.'
    ],
    storage: 'Store below 30°C in blister pack to protect from moisture.',
    pregnancyLactation: 'Contraindicated in pregnancy (Category D); causes fetal renal toxicity.'
  },
  'dolo-650': {
    id: 'med-info-dolo-650',
    name: 'Dolo 650 (Paracetamol 650mg)',
    genericName: 'Paracetamol (Acetaminophen) 650mg',
    brandName: 'Dolo 650 / Calpol 650 / Crocin',
    drugClass: 'Analgesic & Antipyretic',
    purpose: 'Relieves mild to moderate pain (headache, toothache, body ache) and reduces fever.',
    howToTake: 'Swallow whole with water every 6-8 hours as required. Minimum 4 hours between doses.',
    foodInstructions: 'Can be taken with or without food. Safe on an empty stomach.',
    missedDoseGuidance: 'Take as needed for pain or fever. If fever has subsided, missed dose is omitted.',
    commonSideEffects: [
      'Very rare at therapeutic dosages',
      'Mild nausea or indigestion in rare cases'
    ],
    seriousSideEffects: [
      'Acute liver damage if exceeding maximum daily dose (3000mg/day)',
      'Rare cutaneous hypersensitivity'
    ],
    warnings: [
      'Do not exceed 3 tablets in 24 hours without clinical advice.',
      'Do not combine with any other paracetamol-containing medications or alcohol.'
    ],
    storage: 'Store below 25°C away from heat and humidity.'
  },
  'pantoprazole': {
    id: 'med-info-pantoprazole',
    name: 'Pantoprazole 40mg',
    genericName: 'Pantoprazole Sodium 40mg',
    brandName: 'Pan 40 / Pantocid / Pantodac',
    drugClass: 'Proton Pump Inhibitor (PPI)',
    purpose: 'Reduces gastric acid production, treats GERD, prevents NSAID-induced gastric ulcers, and heals mucosal erosion.',
    howToTake: 'Take once daily in the morning, 30 to 60 minutes before breakfast with a glass of water. Swallow whole; do not crush.',
    foodInstructions: 'Strictly take on an empty stomach 30-60 minutes before morning meal for optimal enzyme binding.',
    missedDoseGuidance: 'Take as soon as remembered before the next meal. If forgotten all day, take next morning.',
    commonSideEffects: [
      'Mild headache',
      'Diarrhea or flatulence',
      'Abdominal discomfort'
    ],
    seriousSideEffects: [
      'Severe magnesium depletion with long-term use (>1 year)',
      'Bone fracture risk with chronic high-dose therapy'
    ],
    warnings: [
      'Best taken as a short-term course (2-4 weeks) alongside pain medications.'
    ],
    storage: 'Store below 25°C in a dry place.'
  }
};

export function getMedicineInfo(medicineName: string): MedicineInformation {
  if (!medicineName) {
    return getFallbackMedicineInfo('Prescribed Medication');
  }

  const lower = medicineName.toLowerCase();

  if (lower.includes('augmentin') || lower.includes('amoxicillin') || lower.includes('clavulanate') || lower.includes('clavam')) {
    return MEDICINE_DATABASE['augmentin'];
  }
  if (lower.includes('zerodol') || lower.includes('aceclofenac') || lower.includes('hifenac')) {
    return MEDICINE_DATABASE['zerodol-p'];
  }
  if (lower.includes('chlorhexidine') || lower.includes('hexidine') || lower.includes('mouthrinse') || lower.includes('mouthwash')) {
    return MEDICINE_DATABASE['chlorhexidine'];
  }
  if (lower.includes('telmisartan') || lower.includes('telma') || lower.includes('micardis')) {
    return MEDICINE_DATABASE['telmisartan'];
  }
  if (lower.includes('dolo') || lower.includes('paracetamol') || lower.includes('calpol') || lower.includes('crocin')) {
    return MEDICINE_DATABASE['dolo-650'];
  }
  if (lower.includes('panto') || lower.includes('pan 40') || lower.includes('pantocid')) {
    return MEDICINE_DATABASE['pantoprazole'];
  }

  return getFallbackMedicineInfo(medicineName);
}

function getFallbackMedicineInfo(name: string): MedicineInformation {
  return {
    id: `med-info-generic-${Date.now()}`,
    name: name,
    genericName: name,
    brandName: name,
    drugClass: 'Prescription Medication',
    purpose: 'Prescribed by your licensed medical practitioner for clinical management and therapeutic treatment.',
    howToTake: 'Take strictly according to the written instructions on your prescription slip with a full glass of water.',
    foodInstructions: 'Unless specified otherwise by your doctor, take with or after meals to minimize stomach discomfort.',
    missedDoseGuidance: 'Take the missed dose as soon as you remember. If it is almost time for your next scheduled dose, skip the missed dose and resume regular routine. Never double dose.',
    commonSideEffects: [
      'Mild gastrointestinal discomfort',
      'Mild headache or drowsiness'
    ],
    seriousSideEffects: [
      'Severe allergic reaction (rash, hives, difficulty breathing)'
    ],
    warnings: [
      'Do not alter the prescribed dosage or discontinue treatment prematurely without consulting your doctor.',
      'Report any persistent or unexpected symptoms to your healthcare provider immediately.'
    ],
    storage: 'Store below 25°C in a cool, dry place away from direct sunlight and reach of children.'
  };
}

export const DEMO_MEDICATION_REMINDERS: MedicationReminderConfig[] = [
  {
    id: 'rem-101',
    patientId: 'pt-1041',
    prescriptionId: 'rx-2026-8812',
    prescriptionNumber: 'RX-2026-8812',
    medicationId: 'med-1',
    medicationName: 'Amoxicillin + Potassium Clavulanate (Augmentin 625)',
    prescribedDosage: '625 mg',
    prescribedFrequency: '1 tablet twice daily (1-0-1)',
    duration: '5 days',
    route: 'Oral, immediately after meals',
    instructions: 'Complete full course. Patient verified no penicillin hypersensitivity in clinical note.',
    doctorName: 'Dr. Arvind Rao, MDS',
    clinicName: 'CityCare Family Clinic',
    enabled: true,
    reminderTimes: {
      morning: '08:30 AM',
      evening: '08:30 PM'
    },
    channels: {
      whatsapp: true,
      inApp: true
    },
    whatsappPhone: '+91 98765 43210',
    startDate: '2026-10-23',
    endDate: '2026-10-28',
    dosageLocked: true
  },
  {
    id: 'rem-102',
    patientId: 'pt-1041',
    prescriptionId: 'rx-2026-8812',
    prescriptionNumber: 'RX-2026-8812',
    medicationId: 'med-2',
    medicationName: 'Aceclofenac 100mg + Paracetamol 325mg (Zerodol-P)',
    prescribedDosage: '1 tablet',
    prescribedFrequency: 'Twice daily as needed (1-0-1)',
    duration: '3 days',
    route: 'Oral, with milk or food',
    instructions: 'Take only when pain persists. Do not exceed prescribed daily dose.',
    doctorName: 'Dr. Arvind Rao, MDS',
    clinicName: 'CityCare Family Clinic',
    enabled: true,
    reminderTimes: {
      morning: '08:30 AM',
      evening: '08:30 PM'
    },
    channels: {
      whatsapp: true,
      inApp: true
    },
    whatsappPhone: '+91 98765 43210',
    startDate: '2026-10-23',
    endDate: '2026-10-26',
    dosageLocked: true
  },
  {
    id: 'rem-103',
    patientId: 'pt-1041',
    prescriptionId: 'rx-2026-8812',
    prescriptionNumber: 'RX-2026-8812',
    medicationId: 'med-3',
    medicationName: 'Chlorhexidine Gluconate 0.2% Antiseptic Mouthrinse',
    prescribedDosage: '10 ml',
    prescribedFrequency: 'Rinse for 60 seconds twice daily',
    duration: '7 days',
    route: 'Oral rinse',
    instructions: 'Do not eat or drink water for 30 minutes following oral rinse.',
    doctorName: 'Dr. Arvind Rao, MDS',
    clinicName: 'CityCare Family Clinic',
    enabled: true,
    reminderTimes: {
      morning: '09:00 AM',
      evening: '09:30 PM'
    },
    channels: {
      whatsapp: true,
      inApp: true
    },
    whatsappPhone: '+91 98765 43210',
    startDate: '2026-10-23',
    endDate: '2026-10-30',
    dosageLocked: true
  },
  {
    id: 'rem-104',
    patientId: 'pt-1041',
    prescriptionId: 'rx-chronic-maintain',
    prescriptionNumber: 'RX-CHRONIC-042',
    medicationId: 'med-4',
    medicationName: 'Telmisartan 20mg (Micardis / Telma)',
    prescribedDosage: '20 mg',
    prescribedFrequency: 'Once daily in morning (1-0-0)',
    duration: 'Ongoing Maintenance',
    route: 'Oral, with morning breakfast',
    instructions: 'Take consistently every morning. Monitor BP weekly.',
    doctorName: 'Dr. Aarav Mehta, MD',
    clinicName: 'CityCare Family Clinic',
    enabled: true,
    reminderTimes: {
      morning: '08:00 AM'
    },
    channels: {
      whatsapp: true,
      inApp: true
    },
    whatsappPhone: '+91 98765 43210',
    startDate: '2026-06-01',
    dosageLocked: true
  }
];

export const DEMO_DOSE_LOGS: MedicationDoseLog[] = [
  {
    id: 'dose-2026-101',
    patientId: 'pt-1041',
    reminderId: 'rem-104',
    prescriptionId: 'rx-chronic-maintain',
    prescriptionNumber: 'RX-CHRONIC-042',
    medicationName: 'Telmisartan 20mg (Micardis / Telma)',
    dosage: '20 mg',
    scheduledTime: '08:00 AM',
    timeOfDay: 'Morning',
    instructions: 'Oral, with water before or after breakfast',
    doctorName: 'Dr. Aarav Mehta, MD',
    clinicName: 'CityCare Family Clinic',
    date: '2026-10-27',
    status: 'taken',
    takenAt: '08:06 AM',
    notes: 'Taken with glass of water and light breakfast'
  },
  {
    id: 'dose-2026-102',
    patientId: 'pt-1041',
    reminderId: 'rem-101',
    prescriptionId: 'rx-2026-8812',
    prescriptionNumber: 'RX-2026-8812',
    medicationName: 'Amoxicillin + Potassium Clavulanate (Augmentin 625)',
    dosage: '625 mg',
    scheduledTime: '08:30 AM',
    timeOfDay: 'Morning',
    instructions: 'Oral, immediately after breakfast (Day 5 of 5)',
    doctorName: 'Dr. Arvind Rao, MDS',
    clinicName: 'CityCare Family Clinic',
    date: '2026-10-27',
    status: 'taken',
    takenAt: '08:42 AM',
    notes: 'Taken after breakfast. No gastric distress.'
  },
  {
    id: 'dose-2026-103',
    patientId: 'pt-1041',
    reminderId: 'rem-102',
    prescriptionId: 'rx-2026-8812',
    prescriptionNumber: 'RX-2026-8812',
    medicationName: 'Aceclofenac 100mg + Paracetamol 325mg (Zerodol-P)',
    dosage: '1 tablet',
    scheduledTime: '08:30 AM',
    timeOfDay: 'Morning',
    instructions: 'Oral, with milk or food (take only if pain persists)',
    doctorName: 'Dr. Arvind Rao, MDS',
    clinicName: 'CityCare Family Clinic',
    date: '2026-10-27',
    status: 'pending',
    notes: ''
  },
  {
    id: 'dose-2026-104',
    patientId: 'pt-1041',
    reminderId: 'rem-103',
    prescriptionId: 'rx-2026-8812',
    prescriptionNumber: 'RX-2026-8812',
    medicationName: 'Chlorhexidine Gluconate 0.2% Antiseptic Mouthrinse',
    dosage: '10 ml',
    scheduledTime: '09:00 AM',
    timeOfDay: 'Morning',
    instructions: 'Rinse for 60 seconds; no eating/drinking for 30 minutes',
    doctorName: 'Dr. Arvind Rao, MDS',
    clinicName: 'CityCare Family Clinic',
    date: '2026-10-27',
    status: 'missed',
    missedAt: '09:45 AM',
    notes: 'Patient was travelling in morning commute'
  },
  {
    id: 'dose-2026-105',
    patientId: 'pt-1041',
    reminderId: 'rem-101',
    prescriptionId: 'rx-2026-8812',
    prescriptionNumber: 'RX-2026-8812',
    medicationName: 'Amoxicillin + Potassium Clavulanate (Augmentin 625)',
    dosage: '625 mg',
    scheduledTime: '08:30 PM',
    timeOfDay: 'Evening',
    instructions: 'Oral, immediately after dinner (Final course tablet)',
    doctorName: 'Dr. Arvind Rao, MDS',
    clinicName: 'CityCare Family Clinic',
    date: '2026-10-27',
    status: 'pending'
  },
  {
    id: 'dose-2026-106',
    patientId: 'pt-1041',
    reminderId: 'rem-102',
    prescriptionId: 'rx-2026-8812',
    prescriptionNumber: 'RX-2026-8812',
    medicationName: 'Aceclofenac 100mg + Paracetamol 325mg (Zerodol-P)',
    dosage: '1 tablet',
    scheduledTime: '08:30 PM',
    timeOfDay: 'Evening',
    instructions: 'Oral, with milk or food after dinner if pain is present',
    doctorName: 'Dr. Arvind Rao, MDS',
    clinicName: 'CityCare Family Clinic',
    date: '2026-10-27',
    status: 'pending'
  },
  {
    id: 'dose-2026-107',
    patientId: 'pt-1041',
    reminderId: 'rem-103',
    prescriptionId: 'rx-2026-8812',
    prescriptionNumber: 'RX-2026-8812',
    medicationName: 'Chlorhexidine Gluconate 0.2% Antiseptic Mouthrinse',
    dosage: '10 ml',
    scheduledTime: '09:30 PM',
    timeOfDay: 'Bedtime',
    instructions: 'Oral rinse before bed; no eating or drinking afterwards',
    doctorName: 'Dr. Arvind Rao, MDS',
    clinicName: 'CityCare Family Clinic',
    date: '2026-10-27',
    status: 'pending'
  }
];


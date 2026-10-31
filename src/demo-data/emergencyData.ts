export interface EmergencyContactNumber {
  id: string;
  name: string;
  number: string;
  description: string;
  category: 'Ambulance & Disaster' | 'Police & Safety' | 'Mental Health' | 'Poison & Toxic' | 'Women & Child' | 'Blood & Medical';
  availableHours: string;
  tollFree: boolean;
  priority: number;
  badge?: string;
}

export interface EmergencyProtocol {
  id: string;
  title: string;
  urgency: 'Critical Immediate' | 'Urgent Medical Attention' | 'Prompt Evaluation';
  icon: string;
  summary: string;
  immediateActions: string[];
  doNotDo: string[];
  helplineToCall: string;
}

export const NATIONAL_EMERGENCY_HELPLINES: EmergencyContactNumber[] = [
  {
    id: 'help-108',
    name: 'National Ambulance Emergency Service',
    number: '108',
    description: 'Immediate emergency medical dispatch, life-support ambulances, and disaster medical response.',
    category: 'Ambulance & Disaster',
    availableHours: '24/7 (365 Days)',
    tollFree: true,
    priority: 1,
    badge: 'Immediate Medical SOS'
  },
  {
    id: 'help-112',
    name: 'National Unified Emergency Response (ERSS)',
    number: '112',
    description: 'Unified single emergency number across India for Police, Fire, Ambulance, and Disaster assistance.',
    category: 'Ambulance & Disaster',
    availableHours: '24/7',
    tollFree: true,
    priority: 2,
    badge: 'Unified SOS'
  },
  {
    id: 'help-104',
    name: 'Health Information & Blood Bank Helpline',
    number: '104',
    description: 'State health advice, emergency blood availability, nearest verified hospital directory, and medical triage.',
    category: 'Blood & Medical',
    availableHours: '24/7',
    tollFree: true,
    priority: 3
  },
  {
    id: 'help-telemanas',
    name: 'Tele-MANAS Mental Health Emergency',
    number: '14416',
    description: 'Government of India 24/7 confidential psychological support, crisis counseling, and suicide prevention.',
    category: 'Mental Health',
    availableHours: '24/7 Toll-Free',
    tollFree: true,
    priority: 4,
    badge: 'Mental Health Crisis'
  },
  {
    id: 'help-poison',
    name: 'National Poison Information Centre (AIIMS)',
    number: '1800-11-6117',
    description: 'AIIMS New Delhi toxicologist on call for chemical, household, snake bite, or drug overdose emergencies.',
    category: 'Poison & Toxic',
    availableHours: '24/7 Toll-Free',
    tollFree: true,
    priority: 5,
    badge: 'Toxicology & Overdose'
  },
  {
    id: 'help-100',
    name: 'Police Emergency Assistance',
    number: '100',
    description: 'Immediate law enforcement response, road accidents, and physical safety emergencies.',
    category: 'Police & Safety',
    availableHours: '24/7',
    tollFree: true,
    priority: 6
  },
  {
    id: 'help-181',
    name: 'Women in Distress Helpline',
    number: '181',
    description: 'National helpline providing 24-hour emergency response, medical referral, and legal shelter support.',
    category: 'Women & Child',
    availableHours: '24/7 Toll-Free',
    tollFree: true,
    priority: 7
  },
  {
    id: 'help-1098',
    name: 'Childline Emergency Service',
    number: '1098',
    description: 'Emergency response, child protection, pediatric emergency care, and medical intervention.',
    category: 'Women & Child',
    availableHours: '24/7 Toll-Free',
    tollFree: true,
    priority: 8
  }
];

export const RAPID_TRIAGE_PROTOCOLS: EmergencyProtocol[] = [
  {
    id: 'triage-chest-pain',
    title: 'Chest Pain / Suspected Heart Attack',
    urgency: 'Critical Immediate',
    icon: 'HeartPulse',
    summary: 'Crushing or squeezing chest pain radiating to left arm, neck, or jaw, accompanied by cold sweats or breathlessness.',
    immediateActions: [
      'Call 108 or 112 immediately. Tell the dispatcher: "Suspected Heart Attack".',
      'Have the patient sit down in a "W position" (leaning back comfortably against a wall with knees bent).',
      'If patient is conscious and has NO allergy to aspirin, give 1 chewable Aspirin 300mg / Disprin to chew and swallow with minimal water.',
      'Loosen tight clothing around neck, chest, and waist.'
    ],
    doNotDo: [
      'Do NOT allow the patient to walk, drive themselves, or exert physical effort.',
      'Do NOT dismiss symptoms as mere "gas or acidity" if crushing pressure persists over 5 minutes.',
      'Do NOT give oral fluids or food if patient is drowsy or vomiting.'
    ],
    helplineToCall: '108 / 112'
  },
  {
    id: 'triage-stroke',
    title: 'Stroke Symptoms (F.A.S.T. Protocol)',
    urgency: 'Critical Immediate',
    icon: 'Brain',
    summary: 'Sudden weakness on one side of face/body, slurred speech, or loss of balance. Time lost is brain lost.',
    immediateActions: [
      'F - Face: Ask them to smile. Does one side of the face droop?',
      'A - Arms: Ask them to raise both arms. Does one arm drift downward?',
      'S - Speech: Ask them to repeat a simple sentence. Is their speech slurred or strange?',
      'T - Time: If ANY of these signs are present, call 108/112 IMMEDIATELY and note the exact time symptoms started.'
    ],
    doNotDo: [
      'Do NOT give the patient any food, drink, or medication (even aspirin, as it could be a hemorrhagic bleed).',
      'Do NOT wait to see if symptoms improve; clot-dissolving treatment must begin within 4.5 hours.'
    ],
    helplineToCall: '108 / 112'
  },
  {
    id: 'triage-bleeding',
    title: 'Severe Bleeding & Deep Lacerations',
    urgency: 'Critical Immediate',
    icon: 'ShieldAlert',
    summary: 'Arterial spurting or profuse continuous venous bleeding from deep cuts or trauma.',
    immediateActions: [
      'Apply direct, firm pressure over the wound using sterile gauze, clean cloth, or your hands.',
      'Maintain continuous unbroken pressure for at least 10 full minutes without lifting to check.',
      'If blood soaks through, add more cloth on top; do NOT remove the initial layer.',
      'Elevate the bleeding limb above heart level if no fracture is suspected.'
    ],
    doNotDo: [
      'Do NOT remove embedded objects (knives, glass) from the wound; bandage firmly around the object.',
      'Do NOT apply dirt, turmeric, coffee powder, or unverified substances into open wounds.'
    ],
    helplineToCall: '108'
  },
  {
    id: 'triage-anaphylaxis',
    title: 'Severe Allergic Reaction (Anaphylaxis)',
    urgency: 'Critical Immediate',
    icon: 'AlertTriangle',
    summary: 'Rapid swelling of lips, tongue, or throat, widespread hives, wheezing, or sudden drop in blood pressure after medication or insect sting.',
    immediateActions: [
      'Call 108 immediately and state: "Anaphylactic Allergic Emergency".',
      'If the patient carries an Epinephrine Auto-Injector (EpiPen), administer into outer mid-thigh immediately.',
      'Lay the patient flat with legs elevated unless they are vomiting or having difficulty breathing.',
      'Keep patient calm and monitor airway.'
    ],
    doNotDo: [
      'Do NOT have the patient stand or walk, as sudden postural changes can cause fatal cardiovascular collapse.',
      'Do NOT give oral antihistamines if the patient has difficulty swallowing or breathing.'
    ],
    helplineToCall: '108 / 112'
  }
];


// Clinical prescription presets and formulary for ClinicOS
// Designed for fast Indian outpatient practice (OPD)

export const INDIAN_DRUG_FORMULARY = [
  {
    id: 'med-dolo-650',
    name: 'Dolo 650 (Paracetamol)',
    genericName: 'Paracetamol',
    category: 'Analgesic / Antipyretic',
    strength: '650 mg',
    dosage: '1 Tablet',
    route: 'Oral, after meals',
    frequency: 'Thrice a day (1-1-1)',
    duration: '3 Days',
    quantity: '9 Tablets',
    instructions: 'Take after meals for fever or mild-to-moderate body pain.',
    drugClass: 'NSAID / Analgesic',
    allergiesRisk: []
  },
  {
    id: 'med-augmentin-625',
    name: 'Augmentin 625 (Amoxicillin + Clavulanic Acid)',
    genericName: 'Amoxicillin (500mg) + Clavulanate (125mg)',
    category: 'Antibiotic (Penicillin class)',
    strength: '625 mg',
    dosage: '1 Tablet',
    route: 'Oral, after meals',
    frequency: 'Twice daily (1-0-1)',
    duration: '5 Days',
    quantity: '10 Tablets',
    instructions: 'Complete full 5-day course. Do not discontinue prematurely.',
    drugClass: 'Penicillin',
    allergiesRisk: ['penicillin', 'amoxicillin', 'beta-lactam']
  },
  {
    id: 'med-pan-40',
    name: 'Pan 40 (Pantoprazole Gastro-Resistant)',
    genericName: 'Pantoprazole',
    category: 'Proton Pump Inhibitor (Antacid)',
    strength: '40 mg',
    dosage: '1 Tablet',
    route: 'Oral, empty stomach',
    frequency: 'Once daily morning (1-0-0)',
    duration: '5 Days',
    quantity: '5 Tablets',
    instructions: 'Take strictly 30 minutes before breakfast with plain water.',
    drugClass: 'PPI',
    allergiesRisk: []
  },
  {
    id: 'med-pan-d',
    name: 'Pan-D (Pantoprazole + Domperidone SR)',
    genericName: 'Pantoprazole (40mg) + Domperidone (30mg SR)',
    category: 'Antacid / Prokinetic',
    strength: '40 mg / 30 mg',
    dosage: '1 Capsule',
    route: 'Oral, empty stomach',
    frequency: 'Once daily morning (1-0-0)',
    duration: '5 Days',
    quantity: '5 Capsules',
    instructions: 'Take once daily before breakfast for acid reflux and nausea.',
    drugClass: 'PPI / Antiemetic',
    allergiesRisk: []
  },
  {
    id: 'med-azithral-500',
    name: 'Azithral 500 (Azithromycin)',
    genericName: 'Azithromycin',
    category: 'Macrolide Antibiotic',
    strength: '500 mg',
    dosage: '1 Tablet',
    route: 'Oral, 1 hour before or 2 hours after meals',
    frequency: 'Once daily (1-0-0)',
    duration: '3 Days',
    quantity: '3 Tablets',
    instructions: 'Take once daily at the same time for 3 consecutive days.',
    drugClass: 'Macrolide',
    allergiesRisk: ['azithromycin', 'macrolide']
  },
  {
    id: 'med-zifi-200',
    name: 'Zifi 200 (Cefixime)',
    genericName: 'Cefixime',
    category: 'Cephalosporin Antibiotic (3rd Gen)',
    strength: '200 mg',
    dosage: '1 Tablet',
    route: 'Oral, after food',
    frequency: 'Twice daily (1-0-1)',
    duration: '5 Days',
    quantity: '10 Tablets',
    instructions: 'Take with food for respiratory or urinary tract infections.',
    drugClass: 'Cephalosporin',
    allergiesRisk: ['cephalosporin']
  },
  {
    id: 'med-montair-lc',
    name: 'Montair-LC (Montelukast + Levocetirizine)',
    genericName: 'Montelukast (10mg) + Levocetirizine (5mg)',
    category: 'Anti-Allergic / Bronchodilator',
    strength: '10 mg / 5 mg',
    dosage: '1 Tablet',
    route: 'Oral, after dinner',
    frequency: 'Once daily at night (0-0-1)',
    duration: '7 Days',
    quantity: '7 Tablets',
    instructions: 'Take at bedtime. May cause mild drowsiness.',
    drugClass: 'Antihistamine / Leukotriene Inhibitor',
    allergiesRisk: []
  },
  {
    id: 'med-ketorol-dt',
    name: 'Ketorol-DT (Ketorolac Tromethamine Dispersible)',
    genericName: 'Ketorolac Tromethamine',
    category: 'Potent Analgesic / NSAID',
    strength: '10 mg',
    dosage: '1 Tablet',
    route: 'Oral, disperse in half cup water',
    frequency: 'Thrice daily SOS (1-1-1)',
    duration: '3 Days',
    quantity: '6 Tablets',
    instructions: 'Disperse in water. Take strictly after food for acute severe pain only.',
    drugClass: 'NSAID',
    allergiesRisk: ['aspirin', 'nsaid']
  },
  {
    id: 'med-combiflam',
    name: 'Combiflam (Ibuprofen + Paracetamol)',
    genericName: 'Ibuprofen (400mg) + Paracetamol (325mg)',
    category: 'Analgesic / Anti-Inflammatory',
    strength: '400 mg / 325 mg',
    dosage: '1 Tablet',
    route: 'Oral, strictly after meals',
    frequency: 'Twice daily (1-0-1)',
    duration: '3 Days',
    quantity: '6 Tablets',
    instructions: 'Take with water strictly after meals. Do not take on empty stomach.',
    drugClass: 'NSAID',
    allergiesRisk: ['ibuprofen', 'nsaid']
  },
  {
    id: 'med-telma-40',
    name: 'Telma 40 (Telmisartan)',
    genericName: 'Telmisartan',
    category: 'Antihypertensive (ARB)',
    strength: '40 mg',
    dosage: '1 Tablet',
    route: 'Oral, morning with water',
    frequency: 'Once daily morning (1-0-0)',
    duration: '30 Days',
    quantity: '30 Tablets',
    instructions: 'Take regularly at 9 AM every day. Monitor BP weekly.',
    drugClass: 'ARB',
    allergiesRisk: []
  },
  {
    id: 'med-glycomet-500',
    name: 'Glycomet 500 (Metformin Hydrochloride)',
    genericName: 'Metformin',
    category: 'Antidiabetic (Biguanide)',
    strength: '500 mg',
    dosage: '1 Tablet',
    route: 'Oral, with or after meals',
    frequency: 'Twice daily (1-0-1)',
    duration: '30 Days',
    quantity: '60 Tablets',
    instructions: 'Take immediately after lunch and dinner to minimize GI distress.',
    drugClass: 'Biguanide',
    allergiesRisk: []
  },
  {
    id: 'med-allegra-120',
    name: 'Allegra 120 (Fexofenadine)',
    genericName: 'Fexofenadine',
    category: 'Non-Sedating Antihistamine',
    strength: '120 mg',
    dosage: '1 Tablet',
    route: 'Oral, with water',
    frequency: 'Once daily morning (1-0-0)',
    duration: '5 Days',
    quantity: '5 Tablets',
    instructions: 'Non-drowsy anti-allergic. Take with water. Avoid fruit juices 1hr before/after.',
    drugClass: 'Antihistamine',
    allergiesRisk: []
  },
  {
    id: 'med-ascoril-ls',
    name: 'Ascoril-LS Syrup',
    genericName: 'Levosalbutamol + Ambroxol + Guaifenesin',
    category: 'Expectorant / Bronchodilator Cough Syrup',
    strength: '100 ml Bottle',
    dosage: '10 ml (2 tsf)',
    route: 'Oral, after meals',
    frequency: 'Thrice a day (1-1-1)',
    duration: '5 Days',
    quantity: '1 Bottle (100ml)',
    instructions: 'Shake bottle well. Take with warm water for productive wet cough.',
    drugClass: 'Expectorant',
    allergiesRisk: []
  },
  {
    id: 'med-betadine-gargle',
    name: 'Betadine 2% Mint Gargle',
    genericName: 'Povidone Iodine 2% w/v',
    category: 'Antiseptic Oral Solution',
    strength: '100 ml Bottle',
    dosage: '10 ml diluted with warm water',
    route: 'Oral gargle (Do not swallow)',
    frequency: 'Thrice daily (1-1-1)',
    duration: '5 Days',
    quantity: '1 Bottle',
    instructions: 'Dilute with equal amount of warm water. Gargle for 30 seconds and spit out.',
    drugClass: 'Antiseptic',
    allergiesRisk: ['iodine']
  },
  {
    id: 'med-electral-ors',
    name: 'Electral Sachet (WHO Formula ORS)',
    genericName: 'Oral Rehydration Salts (WHO Formula)',
    category: 'Electrolyte Replenishment',
    strength: '21.8 gm Sachet',
    dosage: '1 Sachet in 1 Litre Water',
    route: 'Oral, sip throughout day',
    frequency: 'As needed (SOS)',
    duration: '3 Days',
    quantity: '3 Sachets',
    instructions: 'Dissolve entire 21.8g pack in exactly 1 litre clean boiled/cooled water. Consume within 24 hrs.',
    drugClass: 'Electrolytes',
    allergiesRisk: []
  },
  {
    id: 'med-shelcal-500',
    name: 'Shelcal 500 (Calcium + Vitamin D3)',
    genericName: 'Calcium (500mg) + Vit D3 (250 IU)',
    category: 'Bone Mineral Supplement',
    strength: '500 mg',
    dosage: '1 Tablet',
    route: 'Oral, after lunch',
    frequency: 'Once daily (0-1-0)',
    duration: '30 Days',
    quantity: '30 Tablets',
    instructions: 'Take after afternoon meal with water for optimal absorption.',
    drugClass: 'Nutritional Supplement',
    allergiesRisk: []
  },
  {
    id: 'med-becosules-z',
    name: 'Becosules Z Capsules',
    genericName: 'Vitamin B-Complex + Vitamin C + Zinc',
    category: 'Multivitamin / Multimineral',
    strength: '1 Capsule',
    dosage: '1 Capsule',
    route: 'Oral, after breakfast',
    frequency: 'Once daily (1-0-0)',
    duration: '15 Days',
    quantity: '15 Capsules',
    instructions: 'Take daily after breakfast. Helps tissue healing and oral aphthous ulcers.',
    drugClass: 'Nutritional Supplement',
    allergiesRisk: []
  }
];

export const CLINICAL_CONDITION_TEMPLATES = [
  {
    id: 'tpl-uri-viral',
    label: '🤒 Viral Fever & Upper Respiratory Infection',
    chiefComplaint: 'Running nose, fever (100.8°F), body ache, and throat irritation for 2 days.',
    clinicalFindings: 'Congested posterior pharyngeal wall, mild submandibular lymphadenopathy, chest clear bilaterally, no crepitations.',
    diagnosis: 'Acute Viral Upper Respiratory Tract Infection (URTI) with Pyrexia',
    treatmentPlan: 'Symptomatic supportive therapy, adequate oral hydration, warm saline gargles, review in 3 days if fever persists > 101°F.',
    followUpDays: 3,
    medications: [
      {
        id: 'uri-med-1',
        name: 'Dolo 650 (Paracetamol)',
        strength: '650 mg',
        dosage: '1 Tablet',
        route: 'Oral, after meals',
        frequency: 'Thrice a day (1-1-1)',
        duration: '3 Days',
        quantity: '9 Tablets',
        instructions: 'Take after meals for fever or body ache.'
      },
      {
        id: 'uri-med-2',
        name: 'Montair-LC (Montelukast + Levocetirizine)',
        strength: '10 mg / 5 mg',
        dosage: '1 Tablet',
        route: 'Oral, after dinner',
        frequency: 'Once daily at night (0-0-1)',
        duration: '5 Days',
        quantity: '5 Tablets',
        instructions: 'Take before bedtime for rhinitis and nasal blockage.'
      },
      {
        id: 'uri-med-3',
        name: 'Pan 40 (Pantoprazole)',
        strength: '40 mg',
        dosage: '1 Tablet',
        route: 'Oral, empty stomach',
        frequency: 'Once daily morning (1-0-0)',
        duration: '5 Days',
        quantity: '5 Tablets',
        instructions: 'Take 30 minutes before breakfast with water.'
      }
    ]
  },
  {
    id: 'tpl-dental-pulpitis',
    label: '🦷 Acute Dental Pulpitis / Dental Abscess',
    chiefComplaint: 'Severe continuous throbbing pain in lower right jaw, radiated to ear. Triggered by cold/hot liquids. Disturbed sleep.',
    clinicalFindings: 'Deep carious lesion on #46 involving pulp. Tenderness on vertical percussion positive (+). Normal mucosal gingival sulcus.',
    diagnosis: 'Acute Irreversible Pulpitis #46 with Symptomatic Apical Periodontitis',
    treatmentPlan: 'Single-sitting Endodontic Therapy (Root Canal Treatment) under 2% Lignocaine with 1:80000 adrenaline. Core buildup & PFM/Zirconia crown.',
    followUpDays: 5,
    medications: [
      {
        id: 'den-med-1',
        name: 'Augmentin 625 (Amoxicillin + Clavulanic Acid)',
        strength: '625 mg',
        dosage: '1 Tablet',
        route: 'Oral, after meals',
        frequency: 'Twice daily (1-0-1)',
        duration: '5 Days',
        quantity: '10 Tablets',
        instructions: 'Complete full 5-day course. Do not stop early.'
      },
      {
        id: 'den-med-2',
        name: 'Ketorol-DT (Ketorolac Tromethamine Dispersible)',
        strength: '10 mg',
        dosage: '1 Tablet',
        route: 'Oral, disperse in water',
        frequency: 'Thrice daily SOS (1-1-1)',
        duration: '3 Days',
        quantity: '6 Tablets',
        instructions: 'Disperse in half glass water. Strictly after food for severe pain.'
      },
      {
        id: 'den-med-3',
        name: 'Pan 40 (Pantoprazole)',
        strength: '40 mg',
        dosage: '1 Tablet',
        route: 'Oral, empty stomach',
        frequency: 'Once daily morning (1-0-0)',
        duration: '5 Days',
        quantity: '5 Tablets',
        instructions: 'Take 30 minutes before breakfast.'
      },
      {
        id: 'den-med-4',
        name: 'Betadine 2% Mint Gargle',
        strength: '100 ml Bottle',
        dosage: '10 ml with warm water',
        route: 'Oral gargle (Do not swallow)',
        frequency: 'Thrice daily (1-1-1)',
        duration: '5 Days',
        quantity: '1 Bottle',
        instructions: 'Gargle for 30 seconds and spit out after brushing.'
      }
    ]
  },
  {
    id: 'tpl-gastro-acidity',
    label: '🧪 Acute Acid Peptic Disease (GERD) & Gastritis',
    chiefComplaint: 'Retrosternal burning sensation, epigastric pain, sour belching and morning nausea for 4 days.',
    clinicalFindings: 'Epigastric tenderness present on deep palpation. No guarding or rigidity. Bowel sounds normal.',
    diagnosis: 'Gastroesophageal Reflux Disease (GERD) with Acute Gastritis',
    treatmentPlan: 'Proton pump inhibitor therapy, dietary modifications (avoid spicy/oily food, late dinners, caffeine). Review in 7 days.',
    followUpDays: 7,
    medications: [
      {
        id: 'gas-med-1',
        name: 'Pan-D (Pantoprazole + Domperidone SR)',
        strength: '40 mg / 30 mg',
        dosage: '1 Capsule',
        route: 'Oral, empty stomach',
        frequency: 'Once daily morning (1-0-0)',
        duration: '7 Days',
        quantity: '7 Capsules',
        instructions: 'Take first thing in the morning 30 minutes before breakfast.'
      },
      {
        id: 'gas-med-2',
        name: 'Electral Sachet (WHO Formula ORS)',
        strength: '21.8 gm Sachet',
        dosage: '1 Sachet in 1 Litre Water',
        route: 'Oral, sip throughout day',
        frequency: 'As needed (SOS)',
        duration: '3 Days',
        quantity: '3 Sachets',
        instructions: 'Hydrate adequately. Sip throughout the day.'
      }
    ]
  },
  {
    id: 'tpl-htn-dm-review',
    label: '🩺 Hypertension & Type 2 Diabetes Routine Review',
    chiefComplaint: 'Quarterly chronic follow-up. Known hypertensive and diabetic on medication. No headache, chest pain or blurring of vision.',
    clinicalFindings: 'Vitals: BP 134/86 mmHg, Pulse 74 bpm. RBS: 142 mg/dL. Bilateral pedal pulses present. No peripheral edema.',
    diagnosis: 'Essential Hypertension & Type 2 Diabetes Mellitus (Under Fair Control)',
    treatmentPlan: 'Continue current anti-hypertensive and hypoglycemic dosage. Low sodium diet, 30 min daily brisk walking. Check HbA1c & Lipid profile in 3 months.',
    followUpDays: 30,
    medications: [
      {
        id: 'htn-med-1',
        name: 'Telma 40 (Telmisartan)',
        strength: '40 mg',
        dosage: '1 Tablet',
        route: 'Oral, morning with water',
        frequency: 'Once daily morning (1-0-0)',
        duration: '30 Days',
        quantity: '30 Tablets',
        instructions: 'Take daily at 9:00 AM with water.'
      },
      {
        id: 'htn-med-2',
        name: 'Glycomet 500 (Metformin Hydrochloride)',
        strength: '500 mg',
        dosage: '1 Tablet',
        route: 'Oral, after meals',
        frequency: 'Twice daily (1-0-1)',
        duration: '30 Days',
        quantity: '60 Tablets',
        instructions: 'Take immediately after principal meals.'
      }
    ]
  }
];

export const FREQUENCY_CHIPS = [
  { code: '1-0-0', label: '1-0-0 (Morning)', text: 'Once daily morning (1-0-0)' },
  { code: '0-0-1', label: '0-0-1 (Night)', text: 'Once daily at night (0-0-1)' },
  { code: '1-0-1', label: '1-0-1 (Twice)', text: 'Twice daily (1-0-1)' },
  { code: '1-1-1', label: '1-1-1 (Thrice)', text: 'Thrice a day (1-1-1)' },
  { code: '1-1-1-1', label: '4x Daily', text: 'Four times daily (1-1-1-1)' },
  { code: 'SOS', label: 'SOS (As Needed)', text: 'As needed for severe pain/symptoms (SOS)' }
];

export const DURATION_CHIPS = [
  '3 Days',
  '5 Days',
  '7 Days',
  '10 Days',
  '15 Days',
  '30 Days'
];

export const ROUTE_TIMING_CHIPS = [
  'Oral, after meals',
  'Oral, before meals (empty stomach)',
  'Oral, after food with water',
  'Oral dispersible, dissolve in water',
  'Topical application to affected area',
  'Gargle and spit (Do not swallow)'
];


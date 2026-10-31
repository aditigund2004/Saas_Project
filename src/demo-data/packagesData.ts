export interface PackageInclusionSection {
  category: string;
  count: number;
  tests: string[];
}

export interface HealthPackage {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  category: 'Full Health Checkup' | 'Cardiology' | 'Diabetes Care' | 'Senior Citizen' | 'Women\'s Health' | 'Preventive Basic';
  badge?: string;
  popular?: boolean;
  price: number;
  originalPrice: number;
  savingsAmount: number;
  savingsPercentage: number;
  parametersCount: number;
  durationMinutes: number;
  durationLabel: string;
  fastingRequired: boolean;
  fastingHours: number;
  fastingNote: string;
  reportTurnaround: string;
  targetGender: 'All' | 'Men' | 'Women';
  targetAgeRange: string;
  recommendedFrequency: string;
  overview: string;
  idealFor: string[];
  inclusions: PackageInclusionSection[];
  sampleRequired: string[];
  preparationInstructions: string[];
  doctorSpecialtyConsult: string;
  rating: number;
  reviewsCount: number;
}

export const HEALTH_PACKAGE_CATEGORIES = [
  'All Packages',
  'Full Health Checkup',
  'Cardiology',
  'Diabetes Care',
  'Senior Citizen',
  'Women\'s Health',
  'Preventive Basic'
] as const;

export const DEMO_HEALTH_PACKAGES: HealthPackage[] = [
  {
    id: 'pkg-full-body',
    name: 'Executive Full-Body Health Checkup',
    slug: 'executive-full-body-health-checkup',
    tagline: '74 Vital Biomarkers + Physician Physical + 12-Lead ECG + Liver & Kidney Panels',
    category: 'Full Health Checkup',
    badge: 'Most Popular',
    popular: true,
    price: 2499,
    originalPrice: 4500,
    savingsAmount: 2001,
    savingsPercentage: 45,
    parametersCount: 74,
    durationMinutes: 75,
    durationLabel: '60 - 75 Mins',
    fastingRequired: true,
    fastingHours: 12,
    fastingNote: '10 - 12 hours overnight fasting mandatory (plain water allowed)',
    reportTurnaround: 'Digital reports in 6 hours',
    targetGender: 'All',
    targetAgeRange: 'Age 25 - 65',
    recommendedFrequency: 'Once every 12 months',
    overview: 'Our gold-standard annual preventative screening. Assesses complete vital organ health including heart, liver, kidneys, blood sugar regulation, thyroid, and blood count indices to identify subclinical risk factors years before symptoms emerge.',
    idealFor: [
      'Working professionals experiencing prolonged desk stress or fatigue',
      'Annual preventative wellness baseline for adults above 25',
      'Early detection of metabolic syndrome, fatty liver, or silent hypertension',
      'Sedentary lifestyle with irregular meal and sleep schedules'
    ],
    inclusions: [
      {
        category: 'Complete Hemogram & Blood Health (24 Tests)',
        count: 24,
        tests: [
          'Hemoglobin (Hb)',
          'Total RBC Count',
          'Packed Cell Volume (PCV)',
          'Mean Corpuscular Volume (MCV)',
          'MCH & MCHC',
          'Red Cell Distribution Width (RDW)',
          'Total Leucocyte Count (TLC/WBC)',
          'Differential Leucocyte Count (Neutrophils, Lymphocytes, Monocytes, Eosinophils, Basophils)',
          'Absolute Leucocyte Counts',
          'Platelet Count',
          'Mean Platelet Volume (MPV)',
          'Erythrocyte Sedimentation Rate (ESR)'
        ]
      },
      {
        category: 'Lipid & Cardiovascular Panel (6 Tests)',
        count: 6,
        tests: [
          'Total Cholesterol',
          'HDL Good Cholesterol',
          'LDL Bad Cholesterol',
          'VLDL Cholesterol',
          'Serum Triglycerides',
          'Total Cholesterol / HDL Ratio'
        ]
      },
      {
        category: 'Liver Function & Hepatic Health (12 Tests)',
        count: 12,
        tests: [
          'Total Serum Bilirubin',
          'Direct Bilirubin (Conjugated)',
          'Indirect Bilirubin (Unconjugated)',
          'SGOT / AST (Aspartate Aminotransferase)',
          'SGPT / ALT (Alanine Aminotransferase)',
          'SGOT / SGPT Ratio',
          'Serum Alkaline Phosphatase (ALP)',
          'Total Serum Protein',
          'Serum Albumin',
          'Serum Globulin',
          'Albumin / Globulin (A/G) Ratio',
          'Gamma Glutamyl Transferase (GGT)'
        ]
      },
      {
        category: 'Kidney Function & Renal Filtration (8 Tests)',
        count: 8,
        tests: [
          'Serum Creatinine with Estimated GFR (eGFR)',
          'Blood Urea Nitrogen (BUN)',
          'Serum Urea',
          'Serum Uric Acid',
          'Serum Calcium',
          'Serum Phosphorus',
          'Serum Sodium & Potassium Electrolytes',
          'BUN / Creatinine Ratio'
        ]
      },
      {
        category: 'Diabetes & Glucose Regulation (2 Tests)',
        count: 2,
        tests: [
          'Fasting Plasma Glucose (FBS)',
          'HbA1c (Glycated Hemoglobin - 3 Month Glucose Average)'
        ]
      },
      {
        category: 'Thyroid Endocrine Profile (1 Test)',
        count: 1,
        tests: [
          'TSH - Ultrasensitive 3rd Generation Thyroid Stimulating Hormone'
        ]
      },
      {
        category: 'Cardiac Diagnostic & Vitals (3 Procedures)',
        count: 3,
        tests: [
          '12-Lead Resting Digital Electrocardiogram (ECG)',
          'Digital Blood Pressure & Resting Pulse Rate',
          'Body Composition Analysis (BMI, Visceral Fat Score, Body Fat %)'
        ]
      },
      {
        category: 'Urine Routine & Microscopic Examination (16 Tests)',
        count: 16,
        tests: [
          'Color, Transparency & Specific Gravity',
          'Urine pH',
          'Urine Protein & Albumin',
          'Urine Glucose & Ketone Bodies',
          'Urine Bilirubin & Urobilinogen',
          'Pus Cells / Leucocytes',
          'Red Blood Cells (Microscopic Hematuria)',
          'Epithelial Cells, Casts & Crystals'
        ]
      },
      {
        category: 'Physician Consultations & Counseling (2 Sessions)',
        count: 2,
        tests: [
          'Comprehensive Physical Examination with Senior General Physician (Dr. Aarav Mehta)',
          'Personalized Nutrition & Lifestyle Report by Clinical Dietitian'
        ]
      }
    ],
    sampleRequired: ['Blood Sample (5ml)', 'Urine Midstream Sample (30ml)'],
    preparationInstructions: [
      'Maintain strict overnight fasting of 10-12 hours prior to appointment time.',
      'You may drink moderate quantities of plain water only (no tea, coffee, milk, or juices).',
      'Avoid high-fat dinners, strenuous exercise, and alcohol for 24 hours prior.',
      'Bring all existing medical prescriptions and past diagnostic records.',
      'Morning appointment slot (08:00 AM – 10:30 AM) recommended for sample collection.'
    ],
    doctorSpecialtyConsult: 'Senior Consultant Physician (MBBS, MD)',
    rating: 4.9,
    reviewsCount: 384
  },
  {
    id: 'pkg-cardiac-vital',
    name: 'Advanced Cardiovascular Health Package',
    slug: 'advanced-cardiovascular-health-package',
    tagline: 'Cardiovascular Risk Stratification + hs-CRP + Extended Lipids + 12-Lead ECG + Cardiac Consult',
    category: 'Cardiology',
    badge: 'Heart Care',
    popular: false,
    price: 2899,
    originalPrice: 5200,
    savingsAmount: 2301,
    savingsPercentage: 44,
    parametersCount: 52,
    durationMinutes: 60,
    durationLabel: '45 - 60 Mins',
    fastingRequired: true,
    fastingHours: 12,
    fastingNote: '12 hours overnight fasting mandatory',
    reportTurnaround: 'Cardiologist-verified reports in 4 hours',
    targetGender: 'All',
    targetAgeRange: 'Age 30+',
    recommendedFrequency: 'Every 6 - 12 months for cardiac risk profile',
    overview: 'Specialized diagnostic battery targeted at premature arterial plaque, micro-inflammation, and arrhythmia detection. Designed by interventional cardiologists to evaluate cardiovascular risk before clinical cardiac events happen.',
    idealFor: [
      'Family history of early heart attack, bypass surgery, or stroke',
      'Individuals with persistent hypertension, elevated cholesterol, or chest tightness',
      'Smokers or individuals with high occupational stress and erratic BP spikes',
      'Pre-workout athletic cardiovascular fitness clearance'
    ],
    inclusions: [
      {
        category: 'Advanced Cardiovascular Markers (6 Tests)',
        count: 6,
        tests: [
          'hs-CRP (High Sensitivity C-Reactive Protein - Arterial Wall Inflammation)',
          'Serum Homocysteine (Vascular Endothelial Risk Factor)',
          'Apolipoprotein B (Apo-B) & Apo-A1 Ratio',
          'Lipoprotein(a) Screening',
          'Cardiac Risk Ratio (TC/HDL & LDL/HDL)',
          'Serum Troponin T Baseline'
        ]
      },
      {
        category: 'Extended Lipid Profile (7 Tests)',
        count: 7,
        tests: [
          'Total Serum Cholesterol',
          'HDL Good Cholesterol',
          'LDL Direct Bad Cholesterol',
          'Triglycerides',
          'VLDL Cholesterol',
          'Non-HDL Cholesterol',
          'Atherogenic Index of Plasma'
        ]
      },
      {
        category: 'Cardiac Diagnostics & Electrophysiology (3 Tests)',
        count: 3,
        tests: [
          '12-Lead Resting Digital ECG with Rhythm & ST-T Wave Evaluation',
          'Automated Arterial Blood Pressure & Mean Arterial Pressure (MAP)',
          'Pulse Pressure & Peripheral Oxygen Saturation (SpO2)'
        ]
      },
      {
        category: 'Metabolic & Renal Defense (12 Tests)',
        count: 12,
        tests: [
          'HbA1c Glycated Hemoglobin',
          'Fasting Plasma Glucose',
          'Serum Creatinine & eGFR',
          'Blood Urea Nitrogen (BUN)',
          'Serum Electrolytes (Sodium, Potassium, Chloride, Magnesium)',
          'Serum Uric Acid'
        ]
      },
      {
        category: 'Complete Blood Count (24 Tests)',
        count: 24,
        tests: ['Complete Hemogram with Platelet & Leucocyte Indices']
      }
    ],
    sampleRequired: ['Blood Sample (8ml)', 'Urine Sample'],
    preparationInstructions: [
      'Complete 12-hour overnight fasting. Water intake is allowed.',
      'Take regular morning blood pressure medications with a small sip of water unless advised otherwise by your doctor.',
      'Wear loose, comfortable clothing for ECG electrode placement on chest and limbs.',
      'Refrain from smoking or caffeine for at least 4 hours before the test.'
    ],
    doctorSpecialtyConsult: 'Consultant Interventional Cardiologist (MD, DM Cardiology)',
    rating: 4.95,
    reviewsCount: 246
  },
  {
    id: 'pkg-diabetes-care',
    name: 'Master Diabetes Care & Vital Organs Screen',
    slug: 'master-diabetes-care-vital-organs-screen',
    tagline: 'Quarterly Glycemic Control + Urine Microalbumin + Diabetic Neuropathy & Renal Screen',
    category: 'Diabetes Care',
    badge: 'Chronic Care Essential',
    popular: true,
    price: 1699,
    originalPrice: 3100,
    savingsAmount: 1401,
    savingsPercentage: 45,
    parametersCount: 46,
    durationMinutes: 50,
    durationLabel: '40 - 50 Mins',
    fastingRequired: true,
    fastingHours: 10,
    fastingNote: 'Requires Fasting sample + 2-Hour Post-Meal (PP) blood test',
    reportTurnaround: 'Digital report in 4 hours',
    targetGender: 'All',
    targetAgeRange: 'Age 20+',
    recommendedFrequency: 'Every 3 - 6 months for diabetic patients',
    overview: 'Essential monitoring package for Type 1, Type 2, and Gestational Diabetes. Goes far beyond basic finger-prick glucose to monitor target organ damage in the kidneys, retina, and nerves caused by chronic glucose toxicity.',
    idealFor: [
      'Known diabetic individuals tracking quarterly HbA1c control',
      'Pre-diabetics aiming to prevent progression through early intervention',
      'Patients experiencing peripheral tingling, numbness, or blurred vision',
      'Annual diabetic nephropathy and kidney filtration audit'
    ],
    inclusions: [
      {
        category: 'Glycemic Regulation (3 Tests)',
        count: 3,
        tests: [
          'HbA1c (Glycated Hemoglobin with Estimated Average Glucose eAG)',
          'Fasting Plasma Glucose (FBS)',
          'Post-Prandial Plasma Glucose (PPBS - 2 hours after meal)'
        ]
      },
      {
        category: 'Early Diabetic Nephropathy Detection (4 Tests)',
        count: 4,
        tests: [
          'Urine Microalbumin (Spot Albuminuria Test)',
          'Urine Creatinine',
          'Albumin-to-Creatinine Ratio (ACR)',
          'Serum Creatinine with Estimated GFR'
        ]
      },
      {
        category: 'Lipid Profile for Cardiovascular Defense (6 Tests)',
        count: 6,
        tests: [
          'Total Cholesterol, HDL, LDL, VLDL, Triglycerides, TC/HDL Ratio'
        ]
      },
      {
        category: 'Liver & Renal Profiles (15 Tests)',
        count: 15,
        tests: [
          'SGOT, SGPT, Bilirubin, Protein, BUN, Uric Acid, Calcium, Electrolytes'
        ]
      },
      {
        category: 'Diabetic Clinical Screen & Foot Vitals (2 Tests)',
        count: 2,
        tests: [
          'Peripheral Neuropathy Monofilament & Vibration Sensation Screen',
          'Senior Diabetologist / Physician Consultation & Dosage Audit'
        ]
      }
    ],
    sampleRequired: ['Fasting Blood Sample (4ml)', 'Post-Meal Blood Sample (3ml)', 'Morning Urine Sample (20ml)'],
    preparationInstructions: [
      'Arrive fasting (10-12 hours). Morning blood sample will be drawn first.',
      'Have your usual breakfast or standard 75g glucose meal.',
      'Second blood draw will occur precisely 2 hours after your meal commences.',
      'Do not skip morning diabetic medicines unless explicitly instructed by your physician.'
    ],
    doctorSpecialtyConsult: 'Consultant Diabetologist & Internal Medicine',
    rating: 4.88,
    reviewsCount: 312
  },
  {
    id: 'pkg-senior-wellness',
    name: 'Senior Citizen Complete Wellness Package',
    slug: 'senior-citizen-complete-wellness-package',
    tagline: 'Age 50+ Specialized Assessment: Bone Density, Prostate / Breast Exam, Vitamin D3 & B12, ECG',
    category: 'Senior Citizen',
    badge: 'Recommended for 50+',
    popular: true,
    price: 3499,
    originalPrice: 6500,
    savingsAmount: 3001,
    savingsPercentage: 46,
    parametersCount: 82,
    durationMinutes: 90,
    durationLabel: '75 - 90 Mins',
    fastingRequired: true,
    fastingHours: 12,
    fastingNote: '12 hours fasting required (gentle water allowed)',
    reportTurnaround: 'Same-day report with doctor briefing in 8 hours',
    targetGender: 'All',
    targetAgeRange: 'Age 50+ (Mother & Father)',
    recommendedFrequency: 'Every 12 months',
    overview: 'Thoughtfully curated for senior citizens and aging parents. Screens for age-related degenerative risks: osteoporosis, vitamin deficiencies causing memory fatigue, prostate enlargement, cardiac arrhythmias, and renal clearance.',
    idealFor: [
      'Parents & seniors over age 50 (Ideal gift booking for Mother or Father)',
      'Evaluating persistent joint pains, gait instability, or bone aches',
      'Assessing memory fog, fatigue, and neuropathy from B12 or D3 deficiency',
      'Annual comprehensive medication reconciliation and geriatric physical'
    ],
    inclusions: [
      {
        category: 'Bone & Micronutrient Vitality (4 Tests)',
        count: 4,
        tests: [
          'Vitamin D3 (25-Hydroxy Vitamin D Total)',
          'Vitamin B12 (Cyanocobalamin - Neurological & Cognitive Defense)',
          'Serum Calcium & Phosphorus',
          'Alkaline Phosphatase (Bone Turnover Marker)'
        ]
      },
      {
        category: 'Gender-Specific Cancer / Organ Screening (2 Tests)',
        count: 2,
        tests: [
          'PSA Total (Prostate Specific Antigen for Men) OR CA-125 Screening (for Women)',
          'Stool Occult Blood Screening (Colorectal health)'
        ]
      },
      {
        category: 'Full Cardiovascular & Electrophysiology (7 Tests)',
        count: 7,
        tests: [
          '12-Lead Resting Digital ECG with Arrhythmia check',
          'Complete Lipid Profile (Total Cholesterol, HDL, LDL, Triglycerides, VLDL)'
        ]
      },
      {
        category: 'Liver, Kidney & Metabolic Panels (22 Tests)',
        count: 22,
        tests: [
          'Complete Liver Function Test (12 parameters)',
          'Complete Kidney Function Test (8 parameters including eGFR)',
          'HbA1c & Fasting Blood Glucose'
        ]
      },
      {
        category: 'Complete Blood Count & Urine Screen (40 Tests)',
        count: 40,
        tests: [
          'CBC (24 parameters) + Complete Urine Routine & Microscopic (16 parameters)'
        ]
      },
      {
        category: 'Geriatric Clinical Consultation (2 Sessions)',
        count: 2,
        tests: [
          'Detailed Senior Physician Geriatric Health & Polypharmacy Audit',
          'Mobility, Balance, & Bone Density Counseling'
        ]
      }
    ],
    sampleRequired: ['Fasting Blood Sample (10ml)', 'Urine Midstream (30ml)'],
    preparationInstructions: [
      'Gentle overnight fasting of 10-12 hours. Small sips of warm water are encouraged.',
      'Seniors should be accompanied by a caregiver or family member.',
      'Bring all ongoing medication strips for the doctor\'s comprehensive drug-interaction review.',
      'Wheelchair access and priority zero-wait sample lounge available at all clinic locations.'
    ],
    doctorSpecialtyConsult: 'Senior Consultant Geriatric Physician (MD Medicine)',
    rating: 4.96,
    reviewsCount: 428
  },
  {
    id: 'pkg-womens-health',
    name: 'Women\'s Complete Wellness & Vitality Package',
    slug: 'womens-complete-wellness-vitality-package',
    tagline: 'Thyroid Panel + Iron & Anemia Screen + Vitamin D3 + PCOS/Hormonal Balance & Gynae Consult',
    category: 'Women\'s Health',
    badge: 'Women\'s Care',
    popular: false,
    price: 2299,
    originalPrice: 4200,
    savingsAmount: 1901,
    savingsPercentage: 45,
    parametersCount: 62,
    durationMinutes: 60,
    durationLabel: '45 - 60 Mins',
    fastingRequired: true,
    fastingHours: 10,
    fastingNote: '10 hours overnight fasting recommended',
    reportTurnaround: 'Digital report in 6 hours',
    targetGender: 'Women',
    targetAgeRange: 'Women Age 18 - 60',
    recommendedFrequency: 'Once every 12 months',
    overview: 'Designed exclusively for women across life stages (young adults, reproductive age, postpartum, and peri-menopause). Covers thyroid imbalances, iron deficiency anemia, bone density markers, and complete metabolic wellness.',
    idealFor: [
      'Women experiencing unexplained hair fall, weight fluctuations, or chronic fatigue',
      'Irregular menstrual cycles, PCOD/PCOS screening, and mood changes',
      'Postpartum recovery and lactation nutrient check',
      'Peri-menopausal and post-menopausal bone and hormonal health assessment'
    ],
    inclusions: [
      {
        category: 'Thyroid Endocrine Panel (3 Tests)',
        count: 3,
        tests: [
          'TSH (Ultrasensitive Thyroid Stimulating Hormone)',
          'Free T3 (Triiodothyronine)',
          'Free T4 (Thyroxine Free)'
        ]
      },
      {
        category: 'Iron & Anemia Profile (4 Tests)',
        count: 4,
        tests: [
          'Serum Ferritin (Iron Storage Reserve)',
          'Serum Iron',
          'Total Iron Binding Capacity (TIBC)',
          'Transferrin Saturation Percentage'
        ]
      },
      {
        category: 'Bone & Micronutrient Screen (3 Tests)',
        count: 3,
        tests: [
          '25-OH Vitamin D3',
          'Serum Calcium & Phosphorus',
          'Serum Alkaline Phosphatase'
        ]
      },
      {
        category: 'Complete Blood Count & Inflammatory Markers (24 Tests)',
        count: 24,
        tests: [
          'CBC with Hemoglobin, RBC morphology, MCV, MCH, and ESR'
        ]
      },
      {
        category: 'Metabolic, Liver & Kidney Profiles (26 Tests)',
        count: 26,
        tests: [
          'Fasting Blood Sugar & Lipid Profile (6 tests)',
          'Liver Function Test (12 tests)',
          'Kidney Function & Creatinine (8 tests)'
        ]
      },
      {
        category: 'Women\'s Health Clinical Consultation (2 Sessions)',
        count: 2,
        tests: [
          'Clinical Breast Examination & Gynecological Assessment',
          'Dietary Counseling for Hormonal Harmony & Bone Health'
        ]
      }
    ],
    sampleRequired: ['Fasting Blood Sample (7ml)', 'Urine Sample (20ml)'],
    preparationInstructions: [
      'Fast for 10 hours overnight. Plain water is permissible.',
      'Optimal timing is day 3 to 7 of your menstrual cycle if tracking hormonal symptoms.',
      'Notify the phlebotomist if taking oral iron supplements or thyroid medications (Thyronorm/Eltroxin).'
    ],
    doctorSpecialtyConsult: 'Consultant Obstetrician & Gynecologist (MS, DNB)',
    rating: 4.92,
    reviewsCount: 290
  },
  {
    id: 'pkg-basic-annual',
    name: 'Essential Annual Preventive Checkup',
    slug: 'essential-annual-preventive-checkup',
    tagline: 'Core Blood & Urine Panel + Fasting Sugar + Cholesterol + General Physician Consult',
    category: 'Preventive Basic',
    badge: 'Budget Friendly',
    popular: false,
    price: 999,
    originalPrice: 1800,
    savingsAmount: 801,
    savingsPercentage: 44,
    parametersCount: 42,
    durationMinutes: 35,
    durationLabel: '30 - 35 Mins',
    fastingRequired: true,
    fastingHours: 8,
    fastingNote: '8 - 10 hours overnight fasting recommended',
    reportTurnaround: 'Digital report in 3 hours',
    targetGender: 'All',
    targetAgeRange: 'Age 18 - 45',
    recommendedFrequency: 'Every 6 - 12 months',
    overview: 'Fast, affordable baseline checkup covering essential blood parameters, kidney filtration, fasting blood sugar, and overall cholesterol. Ideal for annual company compliance or a quick health review.',
    idealFor: [
      'College students, young professionals, and first-time checkup seekers',
      'Annual workplace health certification and fitness baseline',
      'Quick evaluation of general immunity, fatigue, and hydration status'
    ],
    inclusions: [
      {
        category: 'Complete Blood Count (CBC - 24 Tests)',
        count: 24,
        tests: ['Hemoglobin, RBC, WBC, Platelets, Packed Cell Volume, Leucocyte Differential']
      },
      {
        category: 'Core Metabolic & Renal Health (5 Tests)',
        count: 5,
        tests: [
          'Fasting Blood Glucose (Sugar)',
          'Serum Creatinine',
          'Blood Urea',
          'Serum Uric Acid',
          'Total Cholesterol'
        ]
      },
      {
        category: 'Urine Routine Analysis (12 Tests)',
        count: 12,
        tests: [
          'Specific Gravity, pH, Urine Protein, Glucose, Ketones, Pus Cells, RBCs, Crystals'
        ]
      },
      {
        category: 'Clinical Vitals & Doctor Review (2 Tests)',
        count: 2,
        tests: [
          'Blood Pressure, Pulse Rate & BMI Assessment',
          'General Physician Physical Examination & Report Guidance'
        ]
      }
    ],
    sampleRequired: ['Blood Sample (3ml)', 'Urine Sample (20ml)'],
    preparationInstructions: [
      'Fast for 8 to 10 hours prior to morning sample collection.',
      'Stay hydrated with plain water.'
    ],
    doctorSpecialtyConsult: 'General Physician (MBBS)',
    rating: 4.85,
    reviewsCount: 198
  }
];

export function getPackageById(id: string): HealthPackage | undefined {
  return DEMO_HEALTH_PACKAGES.find((pkg) => pkg.id === id || pkg.slug === id);
}

export function searchPackages(query = '', category = 'All Packages'): HealthPackage[] {
  let list = DEMO_HEALTH_PACKAGES;

  if (category && category !== 'All Packages') {
    list = list.filter((pkg) => pkg.category === category);
  }

  if (query && query.trim()) {
    const q = query.toLowerCase().trim();
    list = list.filter((pkg) =>
      pkg.name.toLowerCase().includes(q) ||
      pkg.tagline.toLowerCase().includes(q) ||
      pkg.category.toLowerCase().includes(q) ||
      pkg.inclusions.some((sec) =>
        sec.category.toLowerCase().includes(q) ||
        sec.tests.some((t) => t.toLowerCase().includes(q))
      )
    );
  }

  return list;
}


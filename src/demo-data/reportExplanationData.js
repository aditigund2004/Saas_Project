/**
 * Health Report Explainer Educational Dataset
 * Educational explanations in Medical Language vs Simple Layman Language.
 * Explicitly disclaimed: strictly educational, not an AI diagnostic engine.
 */

export const DEMO_REPORT_EXPLANATIONS = [
  {
    id: 'rep-01',
    title: 'Comprehensive Lipid Profile & Cholesterol Panel',
    date: '2026-10-20',
    lab: 'Metropolis Diagnostics',
    category: 'Cardiovascular Risk / Blood Chemistry',
    summaryMedical: 'Moderate elevation of calculated LDL-C (122 mg/dL) with normal triglyceride concentration (150 mg/dL) and optimal HDL protective quotient (46 mg/dL).',
    summarySimple: 'Your overall cholesterol levels are in a generally healthy zone. Your "protective" good cholesterol is solid, but your "bad" cholesterol is just slightly above the strictest ideal line.',
    parameters: [
      {
        name: 'Total Cholesterol',
        value: '198 mg/dL',
        normalRange: '< 200 mg/dL',
        status: 'Optimal',
        medicalDesc: 'Sum of all circulating esterified and free cholesterol carried across lipoproteins.',
        simpleDesc: 'The total amount of fats and cholesterol circulating in your bloodstream. Being under 200 mg/dL is desirable.',
        questionsForDoctor: 'Should I recheck this in 6 or 12 months with my current diet?'
      },
      {
        name: 'LDL-C (Low-Density Lipoprotein)',
        value: '122 mg/dL',
        normalRange: '< 100 mg/dL',
        status: 'Borderline Elevated',
        medicalDesc: 'Atherogenic lipoprotein particles associated with arterial endothelial lipid deposition.',
        simpleDesc: 'Often called "bad cholesterol" because excess amounts can slowly build up on artery walls. Yours is mildly elevated, easily targeted with fiber and exercise.',
        questionsForDoctor: 'Can lifestyle changes like eating more soluble oats and nuts bring this under 100?'
      },
      {
        name: 'HDL-C (High-Density Lipoprotein)',
        value: '46 mg/dL',
        normalRange: '> 40 mg/dL',
        status: 'Good Protective',
        medicalDesc: 'Reverse cholesterol transport vehicle carrying peripheral cholesterol to liver for biliary excretion.',
        simpleDesc: 'The "good cholesterol" that cleans up excess fats from blood vessels and escorts them to the liver for disposal.',
        questionsForDoctor: 'Will regular cardio and olive oil help raise this even further?'
      },
      {
        name: 'Serum Triglycerides',
        value: '150 mg/dL',
        normalRange: '< 150 mg/dL',
        status: 'Normal Limit',
        medicalDesc: 'Circulating glycerol esters synthesized from unburned dietary carbohydrates and fats.',
        simpleDesc: 'Unused calories your body turns into fat. Yours is right at the safe upper boundary; reducing refined sugars helps keep this low.',
        questionsForDoctor: 'Does reducing evening white rice and sweets keep triglycerides stable?'
      }
    ],
    doctorQuestions: [
      'Are my cholesterol numbers safe enough to continue without statin therapy?',
      'How much impact does 30 minutes of daily aerobic walking have on my LDL score?',
      'When would be the most suitable month for a follow-up fasting lipid profile?'
    ]
  },
  {
    id: 'rep-02',
    title: 'Glycated Hemoglobin (HbA1c) & Fasting Plasma Glucose',
    date: '2026-10-20',
    lab: 'Metropolis Diagnostics',
    category: 'Endocrine & Metabolic Health',
    summaryMedical: 'HbA1c of 5.6% correlates to an estimated average glucose (eAG) of 114 mg/dL, ruling out impaired glucose tolerance or diabetes mellitus.',
    summarySimple: 'Your blood sugar over the past 3 months has been completely normal and well-regulated. You do not have prediabetes or diabetes.',
    parameters: [
      {
        name: 'HbA1c (Glycated Hemoglobin)',
        value: '5.6%',
        normalRange: '< 5.7%',
        status: 'Normal Non-Diabetic',
        medicalDesc: 'Percentage of hemoglobin molecules bound irreversibly to glucose reflecting erythrocyte lifespan (approx 90-120 days).',
        simpleDesc: 'A 3-month average snapshot of your blood sugar levels. Below 5.7% means healthy blood sugar control.',
        questionsForDoctor: 'Is an annual checkup sufficient to monitor my sugar status?'
      },
      {
        name: 'Fasting Blood Sugar',
        value: '92 mg/dL',
        normalRange: '70 - 99 mg/dL',
        status: 'Optimal',
        medicalDesc: 'Basal plasma glucose concentration following an overnight 10 to 12 hour fast.',
        simpleDesc: 'Your baseline blood sugar level after fasting overnight. Numbers between 70 and 99 are in the sweet spot.',
        questionsForDoctor: 'Does intermittent fasting have any positive benefit for metabolic health?'
      }
    ],
    doctorQuestions: [
      'Since my HbA1c is 5.6%, how often should a healthy adult with family history get tested?',
      'Are there particular foods to maintain this stable insulin response?'
    ]
  }
];


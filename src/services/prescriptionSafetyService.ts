/**
 * Prescription Safety & Clinical Decision Support Service (CDSS)
 *
 * NOTE & CLINICAL DISCLAIMER:
 * This is an educational and frontend demonstration feature with realistic mock interaction data.
 * It is NOT a clinically validated drug interaction engine and MUST NOT be used for actual
 * medical or prescribing decisions.
 */

export type SafetySeverity = 'critical' | 'moderate' | 'duplicate' | 'allergy';

export interface SafetyWarning {
  id: string;
  severity: SafetySeverity;
  title: string;
  description: string;
  involvedItems: string[];
  clinicalRecommendation: string;
  requiresOverrideReason?: boolean;
}

export interface DrugItem {
  id?: string;
  name: string;
  strength?: string;
  dosage?: string;
}

// Known mock drug-drug interactions for clinical demonstration
const MOCK_DRUG_INTERACTIONS: Array<{
  pair: [string, string];
  severity: SafetySeverity;
  title: string;
  description: string;
  recommendation: string;
}> = [
  {
    pair: ['augmentin', 'methotrexate'],
    severity: 'critical',
    title: 'Penicillins + Methotrexate Toxicity Risk',
    description: 'Amoxicillin reduces the renal clearance of methotrexate, leading to elevated toxic blood levels.',
    recommendation: 'Monitor serum methotrexate levels closely or consider alternative antibiotic class.'
  },
  {
    pair: ['aspirin', 'ibuprofen'],
    severity: 'moderate',
    title: 'Dual NSAID Gastrointestinal Bleed Risk',
    description: 'Concomitant administration of multiple NSAIDs significantly increases GI ulceration and mucosal bleeding risk.',
    recommendation: 'Use a single NSAID agent with gastroprotection (e.g. Pantoprazole) or switch to Paracetamol.'
  },
  {
    pair: ['ciprofloxacin', 'antacid'],
    severity: 'moderate',
    title: 'Reduced Fluoroquinolone Chelation Absorption',
    description: 'Multivalent cations (Mg, Al, Ca) in antacids bind to ciprofloxacin, decreasing oral bioavailability by up to 90%.',
    recommendation: 'Administer ciprofloxacin at least 2 hours before or 6 hours after antacids.'
  },
  {
    pair: ['metronidazole', 'warfarin'],
    severity: 'critical',
    title: 'Marked INR Elevation & Anticoagulant Potentiation',
    description: 'Metronidazole inhibits CYP2C9 metabolism of warfarin S-isomer, drastically increasing bleeding risk.',
    recommendation: 'Reduce warfarin dose by 30-50% and perform daily INR monitoring.'
  },
  {
    pair: ['atorvastatin', 'clarithromycin'],
    severity: 'critical',
    title: 'Risk of Rhabdomyolysis & Statin Myopathy',
    description: 'Clarithromycin is a potent CYP3A4 inhibitor that increases serum atorvastatin concentrations by up to 4-fold.',
    recommendation: 'Temporarily withhold statin therapy during clarithromycin treatment.'
  }
];

// Helper: Normalize medication name to search keywords
function normalizeName(name: string): string {
  return (name || '').toLowerCase().trim();
}

/**
 * Pure function: Inspects a patient's documented allergies against a proposed medication list.
 */
export function checkAllergyWarnings(
  medications: DrugItem[],
  patientAllergies: string = ''
): SafetyWarning[] {
  const warnings: SafetyWarning[] = [];
  if (!patientAllergies || !medications.length) return warnings;

  const allergyLower = patientAllergies.toLowerCase();

  // Known allergy groups and drug matches
  const ALLERGY_MAP: Array<{ keyword: string; drugMatches: string[]; label: string }> = [
    {
      keyword: 'penicillin',
      drugMatches: ['augmentin', 'amoxicillin', 'ampicillin', 'penicillin', 'clavam'],
      label: 'Penicillin / Beta-Lactam Class'
    },
    {
      keyword: 'sulfa',
      drugMatches: ['sulfamethoxazole', 'bactrim', 'septra', 'cotrimoxazole'],
      label: 'Sulfonamide Class'
    },
    {
      keyword: 'nsaid',
      drugMatches: ['ibuprofen', 'diclofenac', 'naproxen', 'aspirin', 'aceclofenac', 'combiflam'],
      label: 'NSAID / Aspirin Hypersensitivity'
    },
    {
      keyword: 'paracetamol',
      drugMatches: ['paracetamol', 'crocin', 'calpol', 'acetaminophen'],
      label: 'Acetaminophen / Paracetamol'
    }
  ];

  for (const allergyGroup of ALLERGY_MAP) {
    if (allergyLower.includes(allergyGroup.keyword)) {
      for (const med of medications) {
        const medNameLower = normalizeName(med.name);
        const matches = allergyGroup.drugMatches.some((match) => medNameLower.includes(match));
        if (matches) {
          warnings.push({
            id: `allergy_${med.id || med.name}`,
            severity: 'allergy',
            title: `Documented Allergy Alert: ${allergyGroup.label}`,
            description: `Patient chart documents allergy to "${patientAllergies}". Prescribed item "${med.name}" may trigger hypersensitivity or anaphylaxis.`,
            involvedItems: [med.name],
            clinicalRecommendation: 'Select an alternative non-cross-reacting medication class or obtain allergy consult.',
            requiresOverrideReason: true
          });
        }
      }
    }
  }

  return warnings;
}

/**
 * Pure function: Detects duplicate medications (same generic or therapeutic group prescribed twice).
 */
export function checkDuplicateWarnings(medications: DrugItem[]): SafetyWarning[] {
  const warnings: SafetyWarning[] = [];
  const seenGenerics: Record<string, string[]> = {};

  const THERAPEUTIC_CLASSES: Array<{ className: string; drugs: string[] }> = [
    {
      className: 'Oral NSAIDs (Anti-inflammatory / Analgesic)',
      drugs: ['ibuprofen', 'diclofenac', 'naproxen', 'aceclofenac', 'combiflam', 'ketorolac']
    },
    {
      className: 'Proton Pump Inhibitors (PPIs)',
      drugs: ['pantoprazole', 'omeprazole', 'rabeprazole', 'esomeprazole']
    },
    {
      className: 'Broad-Spectrum Penicillins',
      drugs: ['augmentin', 'amoxicillin', 'clavam']
    }
  ];

  for (const med of medications) {
    const medLower = normalizeName(med.name);

    for (const group of THERAPEUTIC_CLASSES) {
      if (group.drugs.some((d) => medLower.includes(d))) {
        if (!seenGenerics[group.className]) {
          seenGenerics[group.className] = [med.name];
        } else {
          seenGenerics[group.className].push(med.name);
        }
      }
    }
  }

  for (const [groupName, items] of Object.entries(seenGenerics)) {
    if (items.length > 1) {
      warnings.push({
        id: `dup_${groupName}`,
        severity: 'duplicate',
        title: `Duplicate Therapeutic Class: ${groupName}`,
        description: `Multiple medications from the same therapeutic family are prescribed together: ${items.join(' + ')}.`,
        involvedItems: items,
        clinicalRecommendation: 'Review prescription to verify whether redundant therapy was intentional.',
        requiresOverrideReason: false
      });
    }
  }

  return warnings;
}

/**
 * Pure function: Evaluates pairwise drug-drug interactions.
 */
export function checkDrugInteractions(medications: DrugItem[]): SafetyWarning[] {
  const warnings: SafetyWarning[] = [];

  for (let i = 0; i < medications.length; i++) {
    for (let j = i + 1; j < medications.length; j++) {
      const medA = normalizeName(medications[i].name);
      const medB = normalizeName(medications[j].name);

      for (const rule of MOCK_DRUG_INTERACTIONS) {
        const matchForward = medA.includes(rule.pair[0]) && medB.includes(rule.pair[1]);
        const matchReverse = medA.includes(rule.pair[1]) && medB.includes(rule.pair[0]);

        if (matchForward || matchReverse) {
          warnings.push({
            id: `interaction_${i}_${j}`,
            severity: rule.severity,
            title: rule.title,
            description: rule.description,
            involvedItems: [medications[i].name, medications[j].name],
            clinicalRecommendation: rule.recommendation,
            requiresOverrideReason: rule.severity === 'critical'
          });
        }
      }
    }
  }

  return warnings;
}

/**
 * Main consolidated CDSS safety check.
 */
export function checkPrescriptionSafety(
  medications: DrugItem[],
  patientAllergies: string = ''
): {
  hasWarnings: boolean;
  hasCritical: boolean;
  warnings: SafetyWarning[];
} {
  const allergyWarnings = checkAllergyWarnings(medications, patientAllergies);
  const duplicateWarnings = checkDuplicateWarnings(medications);
  const interactionWarnings = checkDrugInteractions(medications);

  const warnings = [...allergyWarnings, ...interactionWarnings, ...duplicateWarnings];
  const hasCritical = warnings.some((w) => w.severity === 'critical' || w.severity === 'allergy');

  return {
    hasWarnings: warnings.length > 0,
    hasCritical,
    warnings
  };
}


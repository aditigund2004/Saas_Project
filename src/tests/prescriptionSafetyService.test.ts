import { describe, it, expect } from 'vitest';
import {
  checkAllergyWarnings,
  checkDuplicateWarnings,
  checkDrugInteractions,
  checkPrescriptionSafety
} from '../services/prescriptionSafetyService';

describe('Prescription Safety & Clinical Decision Support (CDSS)', () => {
  it('flags penicillin allergy when Augmentin is prescribed to allergic patient', () => {
    const meds = [
      { name: 'Augmentin 625 (Amoxicillin + Clavulanic Acid)', dosage: '1 Tablet' }
    ];

    const warnings = checkAllergyWarnings(meds, 'Severe Penicillin Allergy');
    expect(warnings.length).toBe(1);
    expect(warnings[0].severity).toBe('allergy');
    expect(warnings[0].title).toContain('Documented Allergy Alert');
  });

  it('detects duplicate NSAID therapy when Ibuprofen and Diclofenac are combined', () => {
    const meds = [
      { name: 'Ibuprofen 400mg', dosage: '1 Tab' },
      { name: 'Diclofenac Sodium 50mg', dosage: '1 Tab' }
    ];

    const warnings = checkDuplicateWarnings(meds);
    expect(warnings.length).toBe(1);
    expect(warnings[0].severity).toBe('duplicate');
    expect(warnings[0].title).toContain('Duplicate Therapeutic Class');
  });

  it('identifies critical drug-drug interaction between Metronidazole and Warfarin', () => {
    const meds = [
      { name: 'Metronidazole 400mg', dosage: '1 Tab TID' },
      { name: 'Warfarin Sodium 5mg', dosage: '1 Tab Daily' }
    ];

    const warnings = checkDrugInteractions(meds);
    expect(warnings.length).toBe(1);
    expect(warnings[0].severity).toBe('critical');
    expect(warnings[0].requiresOverrideReason).toBe(true);
  });

  it('passes cleanly when prescribing non-interacting medicines to non-allergic patient', () => {
    const meds = [
      { name: 'Paracetamol 650mg', dosage: '1 Tab SOS' },
      { name: 'Pantoprazole 40mg', dosage: '1 Tab OD' }
    ];

    const safety = checkPrescriptionSafety(meds, 'No known drug allergies');
    expect(safety.hasWarnings).toBe(false);
    expect(safety.hasCritical).toBe(false);
    expect(safety.warnings.length).toBe(0);
  });
});


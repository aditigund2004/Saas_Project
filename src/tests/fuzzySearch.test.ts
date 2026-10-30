import { describe, it, expect } from 'vitest';
import { fuzzyMatch, searchCollection } from '../utils/fuzzySearch';

describe('Lightweight Fuzzy Search Algorithm', () => {
  it('correctly matches exact and partial substrings', () => {
    expect(fuzzyMatch('appoint', 'Appointment Management').match).toBe(true);
    expect(fuzzyMatch('presc', 'Create Digital Prescription').match).toBe(true);
    expect(fuzzyMatch('xyz999', 'Appointment Management').match).toBe(false);
  });

  it('ranks exact and prefix matches higher', () => {
    const score1 = fuzzyMatch('queue', 'Queue Management').score;
    const score2 = fuzzyMatch('queue', 'Live Patient Waiting Lounge Queue').score;
    expect(score1).toBeGreaterThan(score2);
  });

  it('filters and sorts collections by relevance score', () => {
    const items = [
      { id: '1', title: 'General Checkup' },
      { id: '2', title: 'Consultation with Doctor' },
      { id: '3', title: 'Emergency Room Intake' }
    ];

    const results = searchCollection(items, 'consult', (item) => [item.title]);
    expect(results.length).toBe(1);
    expect(results[0].id).toBe('2');
  });
});

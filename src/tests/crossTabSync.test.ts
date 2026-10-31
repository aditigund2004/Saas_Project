import { describe, it, expect } from 'vitest';
import { broadcastSync, subscribeSync, TAB_INSTANCE_ID } from '../services/crossTabSync';

describe('Real-Time Cross-Tab Synchronization Engine', () => {
  it('generates a unique tab instance identifier for echo prevention', () => {
    expect(TAB_INSTANCE_ID).toBeDefined();
    expect(TAB_INSTANCE_ID.startsWith('tab_')).toBe(true);
  });

  it('broadcasts an event with correct structure and timestamp', () => {
    const payload = { appointmentId: 'apt-101', status: 'In Consultation' };
    const msg = broadcastSync('APPOINTMENT_UPDATED', payload);

    expect(msg.id).toBeDefined();
    expect(msg.type).toBe('APPOINTMENT_UPDATED');
    expect(msg.payload).toEqual(payload);
    expect(msg.sourceTabId).toBe(TAB_INSTANCE_ID);
    expect(typeof msg.timestamp).toBe('number');
  });

  it('subscribes and unsubscribes from event bus cleanly', () => {
    const listener = () => {};
    const unsubscribe = subscribeSync(listener);
    expect(typeof unsubscribe).toBe('function');
    unsubscribe();
  });
});


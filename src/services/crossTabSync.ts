/**
 * Cross-Tab Real-Time Synchronization Engine
 * Uses the BroadcastChannel API with localStorage fallback to synchronize
 * live clinic queues, appointments, and patient status changes across multiple
 * browser tabs (e.g. Receptionist -> Doctor -> Patient) without requiring a backend.
 */

export const TAB_INSTANCE_ID = `tab_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;

export type SyncEventType =
  | 'PATIENT_CHECKED_IN'
  | 'QUEUE_UPDATED'
  | 'APPOINTMENT_UPDATED'
  | 'APPOINTMENT_CANCELLED'
  | 'PATIENT_REGISTERED'
  | 'PRESCRIPTION_CREATED'
  | 'CONSULTATION_STATUS_CHANGED'
  | 'INVENTORY_ADJUSTED';

export interface SyncMessage<T = any> {
  id: string;
  type: SyncEventType;
  payload: T;
  sourceTabId: string;
  timestamp: number;
}

const CHANNEL_NAME = 'clinicos_live_sync_bus';
const STORAGE_FALLBACK_KEY = 'clinicos_sync_fallback_event';

type SyncSubscriber = (message: SyncMessage) => void;
const subscribers = new Set<SyncSubscriber>();

let channel: BroadcastChannel | null = null;

// Initialize BroadcastChannel if available in browser environment
if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
  try {
    channel = new BroadcastChannel(CHANNEL_NAME);
    channel.onmessage = (event: MessageEvent<SyncMessage>) => {
      handleIncomingMessage(event.data);
    };
  } catch (err) {
    console.warn('[CrossTabSync] BroadcastChannel init error, falling back to localStorage:', err);
    channel = null;
  }
}

// Fallback listener for environments or browsers lacking BroadcastChannel
if (typeof window !== 'undefined') {
  window.addEventListener('storage', (e: StorageEvent) => {
    if (e.key === STORAGE_FALLBACK_KEY && e.newValue) {
      try {
        const msg: SyncMessage = JSON.parse(e.newValue);
        handleIncomingMessage(msg);
      } catch (err) {
        console.warn('[CrossTabSync] Failed to parse storage sync event:', err);
      }
    }
  });
}

function handleIncomingMessage(msg: SyncMessage) {
  // Echo prevention: Ignore events originating from this very same tab
  if (!msg || msg.sourceTabId === TAB_INSTANCE_ID) {
    return;
  }

  // Deduplicate messages older than 15 seconds
  if (Date.now() - msg.timestamp > 15000) {
    return;
  }

  // Notify all subscribed listeners
  subscribers.forEach((cb) => {
    try {
      cb(msg);
    } catch (e) {
      console.error('[CrossTabSync] Error in sync subscriber:', e);
    }
  });
}

/**
 * Broadcasts an event to all other open tabs in real-time.
 */
export function broadcastSync<T = any>(type: SyncEventType, payload: T): SyncMessage<T> {
  const message: SyncMessage<T> = {
    id: `sync_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`,
    type,
    payload,
    sourceTabId: TAB_INSTANCE_ID,
    timestamp: Date.now()
  };

  if (channel) {
    try {
      channel.postMessage(message);
    } catch (e) {
      console.warn('[CrossTabSync] postMessage error, using fallback:', e);
    }
  }

  // Always write fallback to localStorage so tabs on different workers / browsers can observe
  try {
    localStorage.setItem(STORAGE_FALLBACK_KEY, JSON.stringify(message));
  } catch {
    // Ignore storage quota warnings in sandboxed frames
  }

  return message;
}

/**
 * Subscribe to sync messages across tabs
 */
export function subscribeSync(callback: SyncSubscriber): () => void {
  subscribers.add(callback);
  return () => {
    subscribers.delete(callback);
  };
}


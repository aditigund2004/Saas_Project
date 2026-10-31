import React from 'react';
import { WifiOff, RefreshCw } from 'lucide-react';
import { usePWA } from '../../hooks/usePWA';

export function OfflineBanner() {
  const { isOnline } = usePWA();

  if (isOnline) return null;

  return (
    <div
      className="bg-amber-500 text-slate-950 px-4 py-2 text-xs font-bold flex items-center justify-between shadow-sm sticky top-0 z-50 animate-in slide-in-from-top-2"
      role="status"
    >
      <div className="flex items-center space-x-2 mx-auto">
        <WifiOff className="w-4 h-4 shrink-0" />
        <span>
          Offline Mode Active: ClinicOS is operating from local cache. Patient changes will synchronize when internet connection is restored.
        </span>
      </div>
    </div>
  );
}


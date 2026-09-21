import { useState, useEffect } from 'react';
import { WifiOff, Wifi } from 'lucide-react';
import { usePWA } from '../../hooks/usePWA';

export default function OfflineIndicator() {
  const { isOnline } = usePWA();
  const [showRestored, setShowRestored] = useState(false);
  const [hasBeenOffline, setHasBeenOffline] = useState(false);

  useEffect(() => {
    if (!isOnline) {
      setHasBeenOffline(true);
      setShowRestored(false);
    } else if (hasBeenOffline) {
      setShowRestored(true);
      const timer = setTimeout(() => {
        setShowRestored(false);
        setHasBeenOffline(false);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [isOnline, hasBeenOffline]);

  if (isOnline && !showRestored) {
    return null;
  }

  return (
    <div className="fixed top-2 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-[400px] pointer-events-none animate-slide-up">
      {!isOnline ? (
        <div className="bg-amber-600/95 text-white px-3.5 py-2 rounded-2xl shadow-xl backdrop-blur-sm border border-amber-400/30 flex items-center gap-2.5">
          <WifiOff className="w-4 h-4 text-amber-200 flex-shrink-0 animate-pulse" />
          <div className="flex-1 min-w-0">
            <p className="text-xs font-bold leading-tight">Mode Offline Aktif</p>
            <p className="text-[10px] text-amber-100 leading-tight">
              Anda tetap dapat melihat katalog & data dari cache perangkat.
            </p>
          </div>
        </div>
      ) : (
        <div className="bg-emerald-600/95 text-white px-3.5 py-2 rounded-2xl shadow-xl backdrop-blur-sm border border-emerald-400/30 flex items-center gap-2.5">
          <Wifi className="w-4 h-4 text-emerald-200 flex-shrink-0" />
          <p className="text-xs font-bold leading-tight">
            Koneksi internet pulih kembali! 🌐
          </p>
        </div>
      )}
    </div>
  );
}

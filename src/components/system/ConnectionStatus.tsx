import { useSyncExternalStore } from 'react';
import { WifiOff } from 'lucide-react';

function subscribe(callback: () => void) {
  window.addEventListener('online', callback);
  window.addEventListener('offline', callback);
  return () => {
    window.removeEventListener('online', callback);
    window.removeEventListener('offline', callback);
  };
}

function getSnapshot() {
  return navigator.onLine;
}

function getServerSnapshot() {
  return true;
}

export function ConnectionStatus() {
  const isOnline = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  if (isOnline) return null;

  return (
    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-colors duration-200 select-none bg-danger/10 border-danger/20 text-danger">
      <WifiOff className="w-3 h-3 shrink-0" />
      <span className="text-[10px] font-semibold uppercase tracking-wider">Offline</span>
    </div>
  );
}

export default ConnectionStatus;

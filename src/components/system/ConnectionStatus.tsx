import React from 'react';
import { useNetworkStatus } from '../../hooks/useNetworkStatus';
import { Globe, WifiOff, Loader2 } from 'lucide-react';

export const ConnectionStatus: React.FC = () => {
  const { isOnline, isConnecting } = useNetworkStatus();

  if (isConnecting) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 bg-accent/10 rounded-full border border-accent/20 animate-fade-in">
        <Loader2 className="w-3 h-3 animate-spin text-accent" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-accent">Connecting</span>
      </div>
    );
  }

  if (!isOnline) {
    return (
      <div className="flex items-center gap-2 px-3 py-1.5 bg-danger/10 rounded-full border border-danger/20 animate-fade-in">
        <WifiOff className="w-3 h-3 text-danger" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-danger">Offline</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 px-3 py-1.5 bg-accent/10 rounded-full border border-accent/20 animate-fade-in">
      <Globe className="w-3 h-3 text-accent" />
      <span className="text-[10px] font-bold uppercase tracking-widest text-accent">Connected</span>
    </div>
  );
};

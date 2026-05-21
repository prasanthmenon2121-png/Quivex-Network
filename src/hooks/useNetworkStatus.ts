import { useState, useEffect } from 'react';

export function useNetworkStatus() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [isConnecting, setIsConnecting] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsConnecting(true);
      setTimeout(() => {
        setIsOnline(true);
        setIsConnecting(false);
      }, 1500); // Simulate connection handshake
    };

    const handleOffline = () => {
      setIsOnline(false);
      setIsConnecting(false);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return { isOnline, isConnecting };
}

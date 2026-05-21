import React, { useState } from 'react';

interface LogoProps {
  className?: string;
  size?: number | string;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 48 }) => {
  const [isError, setIsError] = useState(false);

  const dimension = typeof size === 'number' ? `${size}px` : size;

  if (isError) {
    return (
      <div 
        className={`flex items-center justify-center font-black tracking-tighter text-emerald-500 border-2 border-emerald-500/20 rounded-xl ${className}`}
        style={{ width: dimension, height: dimension, fontSize: typeof size === 'number' ? size * 0.25 : '1rem' }}
      >
        QVX
      </div>
    );
  }

  return (
    <div style={{ width: dimension, height: dimension }} className={`flex items-center justify-center ${className}`}>
      <img
        src="/logo.png"
        alt="QUIVEX"
        onError={() => setIsError(true)}
        className="w-full h-full object-contain transition-opacity duration-300"
      />
    </div>
  );
};

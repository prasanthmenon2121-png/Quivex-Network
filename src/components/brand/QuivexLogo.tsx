import React, { useState } from 'react';

interface QuivexLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | number;
  variant?: 'full' | 'icon' | 'wordmark' | 'lockup';
}

export const QuivexLogo: React.FC<QuivexLogoProps> = ({
  className = '',
  size = 'md',
  variant = 'wordmark'
}) => {
  const [iconError, setIconError] = useState(false);
  const [wordmarkError, setWordmarkError] = useState(false);

  const getDimension = () => {
    if (typeof size === 'number') return size;
    switch (size) {
      case 'sm': return 48;
      case 'lg': return 192;
      default: return 96;
    }
  };

  const dimension = getDimension();

  const renderIcon = (customDim?: number) => {
    const dim = customDim || dimension;
    if (iconError) return null;
    return (
      <img
        src="/icons/icon-512.png"
        alt=""
        className="object-contain"
        style={{ width: dim, height: dim }}
        onError={() => setIconError(true)}
      />
    );
  };

  const renderWordmark = (customDim?: number) => {
    const dim = customDim || dimension;
    if (wordmarkError) return null;
    return (
      <img
        src="/brand/quivex-wordmark.png"
        alt=""
        className="object-contain"
        style={{ height: dim * 0.6 }}
        onError={() => setWordmarkError(true)}
      />
    );
  };

  // 1. ICON ONLY
  if (variant === 'icon') {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        {renderIcon()}
      </div>
    );
  }

  // 2. WORDMARK ONLY
  if (variant === 'wordmark' || variant === 'full') {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        {renderWordmark()}
      </div>
    );
  }

  // 3. LOCKUP (Icon + Wordmark)
  if (variant === 'lockup') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        {renderIcon(dimension * 0.7)}
        <div className="h-6 w-[1px] bg-white/10 mx-1 hidden sm:block" />
        {renderWordmark(dimension)}
      </div>
    );
  }

  return null;
};

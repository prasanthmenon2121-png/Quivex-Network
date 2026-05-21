import { useState } from 'react';

interface QuivexLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | number;
  variant?: 'icon' | 'wordmark' | 'lockup';
}

export function QuivexLogo({
  className = '',
  size = 'md',
  variant = 'wordmark'
}: QuivexLogoProps) {
  const [iconError, setIconError] = useState(false);
  const [iconLoaded, setIconLoaded] = useState(false);
  const [wordmarkError, setWordmarkError] = useState(false);
  const [wordmarkLoaded, setWordmarkLoaded] = useState(false);

  const getDimension = (): number => {
    if (typeof size === 'number') return size;
    switch (size) {
      case 'sm': return 32;
      case 'lg': return 64;
      default: return 48;
    }
  };

  const dimension = getDimension();

  const getBorderRadius = (dim: number): number => {
    if (dim >= 96) return 26;
    if (dim >= 64) return 22;
    if (dim >= 48) return 16;
    return 12;
  };

  const renderFallbackIcon = (dim: number) => (
    <div
      className="flex items-center justify-center bg-surface border border-accent-border select-none"
      style={{
        width: dim,
        height: dim,
        minWidth: dim,
        minHeight: dim,
        borderRadius: getBorderRadius(dim),
      }}
    >
      <span
        className="text-accent leading-none"
        style={{
          fontSize: `${dim * 0.52}px`,
          fontWeight: 700,
          fontFamily: 'Inter, Sora, ui-sans-serif, sans-serif',
        }}
      >
        Q
      </span>
    </div>
  );

  const renderFallbackWordmark = (dim: number) => (
    <span
      className="text-text select-none"
      style={{
        fontSize: `${Math.min(dim * 0.14, 32)}px`,
        fontWeight: 700,
        fontFamily: 'Inter, Sora, ui-sans-serif, sans-serif',
        letterSpacing: '0.18em',
      }}
    >
      QUIVEX
    </span>
  );

  const renderIcon = (dim: number) => {
    if (iconError) {
      return renderFallbackIcon(dim);
    }
    return (
      <div className="relative" style={{ width: dim, height: dim }}>
        {!iconLoaded && renderFallbackIcon(dim)}
        <img
          src="/icons/icon-512.png"
          alt="QUIVEX"
          className={`object-contain absolute inset-0 transition-opacity duration-200 ${iconLoaded ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          style={{ width: dim, height: dim }}
          onLoad={() => setIconLoaded(true)}
          onError={() => setIconError(true)}
        />
      </div>
    );
  };

  const renderWordmark = (dim: number) => {
    if (wordmarkError) {
      return renderFallbackWordmark(dim);
    }
    return (
      <div className="relative flex items-center" style={{ height: dim * 0.6 }}>
        {!wordmarkLoaded && renderFallbackWordmark(dim)}
        <img
          src="/brand/quivex-wordmark.png"
          alt="QUIVEX"
          className={`object-contain transition-opacity duration-200 ${wordmarkLoaded ? 'opacity-100' : 'opacity-0 pointer-events-none'
            }`}
          style={{ height: dim * 0.6 }}
          onLoad={() => setWordmarkLoaded(true)}
          onError={() => setWordmarkError(true)}
        />
      </div>
    );
  };

  if (variant === 'icon') {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        {renderIcon(dimension)}
      </div>
    );
  }

  if (variant === 'wordmark') {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        {renderWordmark(dimension)}
      </div>
    );
  }

  if (variant === 'lockup') {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        {renderIcon(dimension * 0.8)}
        {renderWordmark(dimension * 0.9)}
      </div>
    );
  }

  return null;
};

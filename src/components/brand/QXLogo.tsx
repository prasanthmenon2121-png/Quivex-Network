import { useState } from 'react';

interface QXLogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  variant?: 'text' | '3d';
}

export function QXLogo({ size = 'md', className = '', variant = 'text' }: QXLogoProps) {
  const [imgError, setImgError] = useState(false);

  const dimensions = {
    sm: { width: 48, height: 32, q: 28, x: 20, gap: -1 },
    md: { width: 72, height: 48, q: 42, x: 30, gap: -2 },
    lg: { width: 96, height: 64, q: 56, x: 40, gap: -3 },
  };

  const d = dimensions[size];

  // 3D variant - use image if available
  if (variant === '3d' && !imgError) {
    return (
      <img
        src="/brand/qx-logo-3d.png"
        alt="QX"
        className={`select-none ${className}`}
        style={{ height: d.q * 1.5, width: 'auto' }}
        onError={() => setImgError(true)}
      />
    );
  }

  // Text variant (default)
  return (
    <div className={`flex items-baseline select-none ${className}`}>
      <span
        style={{
          fontSize: d.q,
          fontWeight: 300,
          fontFamily: 'Sora, Inter, system-ui',
          color: 'var(--text)',
          lineHeight: 1,
          letterSpacing: '-0.03em',
        }}
      >
        Q
      </span>
      <span
        style={{
          fontSize: d.x,
          fontWeight: 700,
          fontFamily: 'Sora, Inter, system-ui',
          color: 'var(--accent)',
          lineHeight: 1,
          marginLeft: d.gap,
          letterSpacing: '-0.02em',
        }}
      >
        X
      </span>
    </div>
  );
}

export function QXBrand({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-col items-center gap-3 ${className}`}>
      <QXLogo size="lg" />
      <span
        className="text-muted/60 select-none"
        style={{
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: '0.35em',
          fontFamily: 'Sora, Inter, system-ui',
        }}
      >
        QUIVEX
      </span>
    </div>
  );
}

export function QXIcon({ size = 40, className = '' }: { size?: number; className?: string }) {
  const fontSize = size * 0.5;

  return (
    <div
      className={`rounded-xl bg-surface border border-border flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
    >
      <div className="flex items-baseline select-none">
        <span
          style={{
            fontSize: fontSize,
            fontWeight: 300,
            fontFamily: 'Sora, Inter, system-ui',
            color: 'var(--text)',
            lineHeight: 1,
          }}
        >
          Q
        </span>
        <span
          style={{
            fontSize: fontSize * 0.7,
            fontWeight: 700,
            fontFamily: 'Sora, Inter, system-ui',
            color: 'var(--accent)',
            lineHeight: 1,
            marginLeft: -1,
          }}
        >
          X
        </span>
      </div>
    </div>
  );
}

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, Loader2, ArrowRight } from 'lucide-react';
import { generateQvexId } from '../utils/qvexId';
import { generateRecoveryPhrase } from '../utils/recoveryPhrase';
import { ConnectionStatus } from '../components/system/ConnectionStatus';

interface DisplayNameScreenProps {
  onContinue: (name: string, qvexId: string, phrase: string) => void;
  onBack: () => void;
}

const DisplayNameScreen: React.FC<DisplayNameScreenProps> = ({ onContinue, onBack }) => {
  const [displayName, setDisplayName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleContinue = async () => {
    const trimmed = displayName.trim();
    if (!trimmed) return;
    if (trimmed.length < 2) {
      setError('Display name must be at least 2 characters.');
      return;
    }
    setError('');
    setIsLoading(true);
    setTimeout(() => {
      const qvexId = generateQvexId();
      const phrase = generateRecoveryPhrase();
      onContinue(trimmed, qvexId, phrase);
      setIsLoading(false);
    }, 800);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setDisplayName(val);
    if (error && val.trim().length >= 2) setError('');
  };

  return (
    <div className="fixed inset-0 bg-bg-deep flex flex-col overflow-hidden">
      {/* Top Bar */}
      <header className="relative z-20 flex items-center justify-between px-6 sm:px-8 pt-5 pb-3 shrink-0 safe-area-pt">
        <button
          onClick={onBack}
          className="p-2 -ml-2 text-muted hover:text-text transition-colors rounded-lg"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <div className="w-8">
          <ConnectionStatus />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 py-8 sm:py-12">
        <motion.div
          className="w-full max-w-[480px] mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          {/* Identity Card */}
          <div className="mb-8">
            {/* QX Icon */}
            <div className="flex justify-center mb-6">
              <div className="relative flex items-center justify-center rounded-2xl"
                style={{
                  width: 72,
                  height: 72,
                  background: 'var(--accent-soft)',
                  border: '1px solid var(--accent-border)',
                }}
              >
                <img
                  src="/icons/qx-icon.png"
                  alt=""
                  className="object-contain"
                  style={{ width: 48, height: 48 }}
                />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-center mb-2"
              style={{ fontSize: 'clamp(28px, 3vw, 36px)', lineHeight: 1.1, fontWeight: 800 }}
            >
              <span className="text-white block">Create</span>
              <span className="block" style={{ color: 'var(--accent)' }}>Identity</span>
            </h1>

            {/* Subtitle */}
            <p className="text-center font-medium leading-relaxed"
              style={{ fontSize: 'clamp(14px, 1.2vw, 15px)', color: 'var(--muted)' }}
            >
              Choose a display name. You can change it later.
            </p>
          </div>

          {/* Input Card */}
          <div className="rounded-2xl p-6 sm:p-7"
            style={{ background: 'var(--card)', border: '1px solid var(--border)' }}
          >
            <div className="mb-5">
              <label className="block text-xs font-bold uppercase tracking-widest mb-2.5"
                style={{ color: 'rgba(0, 199, 118, 0.5)', letterSpacing: '0.1em' }}
              >
                Display name
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={displayName}
                  onChange={handleChange}
                  placeholder="Enter your display name"
                  maxLength={32}
                  className="w-full bg-surface-2 rounded-xl px-4 py-3.5 text-text placeholder-muted/30 font-medium outline-none transition-all"
                  style={{
                    fontSize: 'clamp(16px, 1.1vw, 17px)',
                    border: '1px solid var(--border)',
                  }}
                  onFocus={(e) => e.target.style.borderColor = 'rgba(0, 199, 118, 0.4)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--border)'}
                  autoFocus
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-mono font-bold"
                  style={{ color: 'rgba(0, 199, 118, 0.4)' }}
                >
                  {displayName.length}/32
                </div>
              </div>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-2 text-xs font-medium"
                  style={{ color: 'rgba(255,100,100,0.8)' }}
                >
                  {error}
                </motion.p>
              )}
            </div>

            {/* Continue Button */}
            <button
              onClick={handleContinue}
              disabled={!displayName.trim() || isLoading}
              className="w-full font-black text-bg-deep rounded-xl transition-all hover:brightness-110 active:scale-[0.97] disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                padding: '14px 24px',
                fontSize: 14,
                minHeight: 52,
                background: 'var(--accent)',
              }}
            >
              {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Creating...</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2">
                  <span>Continue</span>
                  <ArrowRight className="w-4 h-4" style={{ opacity: 0.6 }} />
                </div>
              )}
            </button>
          </div>

          {/* Footer */}
          <p className="mt-8 text-center text-xs font-medium leading-relaxed"
            style={{ color: 'rgba(154,163,159,0.4)' }}
          >
            Your identity is stored securely on this device.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default DisplayNameScreen;

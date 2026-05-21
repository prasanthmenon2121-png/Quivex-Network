import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, Loader2 } from 'lucide-react';
import { generateQvexId } from '../utils/qvexId';
import { generateRecoveryPhrase } from '../utils/recoveryPhrase';

interface DisplayNameScreenProps {
  onContinue: (name: string, qvexId: string, phrase: string) => void;
  onBack: () => void;
}

function DisplayNameScreen({ onContinue, onBack }: DisplayNameScreenProps) {
  const [displayName, setDisplayName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [touched, setTouched] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const trimmed = displayName.trim();
  const isValid = trimmed.length >= 2;
  const showError = touched && trimmed.length > 0 && trimmed.length < 2;

  const handleContinue = () => {
    if (!isValid) return;
    setIsLoading(true);
    setTimeout(() => {
      const qvexId = generateQvexId();
      const phrase = generateRecoveryPhrase();
      onContinue(trimmed, qvexId, phrase);
      setIsLoading(false);
    }, 500);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && isValid) {
      handleContinue();
    }
  };

  return (
    <div className="fixed inset-0 bg-bg flex flex-col overflow-hidden">
      {/* Header */}
      <header className="flex items-center px-4 h-14 safe-area-pt shrink-0">
        <button
          onClick={onBack}
          className="w-10 h-10 flex items-center justify-center text-muted hover:text-text transition-colors rounded-lg -ml-2"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      </header>

      {/* Content */}
      <div className="flex-1 flex items-center justify-center px-6 safe-area-pb overflow-hidden">
        <motion.div
          className="w-full max-w-[420px] flex flex-col items-center"
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
        >
          {/* Logo */}
          <img
            src="/logo-transparent.png"
            alt="QUIVEX"
            className="w-16 sm:w-20 lg:w-[164px] h-auto object-contain select-none mb-6"
          />

          {/* Title */}
          <h1 className="text-xl font-semibold text-text mb-2">
            Create identity
          </h1>
          <p className="text-[15px] text-muted text-center mb-8">
            Choose a display name for your QUIVEX identity.
          </p>

          {/* Input */}
          <div className="w-full mb-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-[13px] text-muted font-medium">
                Display name
              </label>
              <span className="text-[12px] text-muted/60 font-mono">
                {displayName.length}/32
              </span>
            </div>
            <input
              type="text"
              value={displayName}
              onChange={(e) => {
                setDisplayName(e.target.value);
                setTouched(true);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Enter your display name"
              maxLength={32}
              autoFocus
              className="w-full h-[52px] px-4 bg-surface text-text text-[16px] rounded-[14px] border border-border outline-none transition-colors duration-150 placeholder:text-muted/40 focus:border-accent/50"
            />
            <div className="h-6 mt-1.5">
              {showError && (
                <p className="text-[13px] text-red-400">
                  Display name must be at least 2 characters.
                </p>
              )}
            </div>
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            disabled={!isValid || isLoading}
            className="w-full h-[52px] flex items-center justify-center bg-accent text-bg-deep text-[15px] font-semibold rounded-[14px] transition-colors duration-150 hover:bg-accent-dark active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              'Continue'
            )}
          </button>

          {/* Helper */}
          <p className="mt-6 text-[13px] text-muted/50 text-center">
            Your QVX ID will be created automatically.
          </p>
        </motion.div>
      </div>
    </div>
  );
}

export default DisplayNameScreen;

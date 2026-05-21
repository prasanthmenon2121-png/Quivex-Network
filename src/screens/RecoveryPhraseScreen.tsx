import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, Eye, EyeOff, AlertTriangle } from 'lucide-react';

interface RecoveryPhraseScreenProps {
  phrase: string;
  onConfirm: () => void;
  onBack?: () => void;
}

function RecoveryPhraseScreen({ phrase, onConfirm, onBack }: RecoveryPhraseScreenProps) {
  const [isRevealed, setIsRevealed] = useState(false);
  const [hasSaved, setHasSaved] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const words = phrase.split(' ').filter(Boolean);

  const handleContinue = () => {
    if (!hasSaved) return;
    onConfirm();
  };

  return (
    <div className="fixed inset-0 bg-[#000000] overflow-hidden">
      <div className="h-[100dvh] flex flex-col safe-area-pt safe-area-pb">
        {/* Header */}
        <header className={`flex items-center px-4 shrink-0 ${onBack ? 'h-12 sm:h-14' : 'h-3 sm:h-4'}`}>
          {onBack && (
            <button
              onClick={onBack}
              className="w-10 h-10 flex items-center justify-center text-muted hover:text-text transition-colors rounded-lg -ml-2"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          )}
        </header>

        {/* Content */}
        <motion.div
          className="flex-1 min-h-0 flex flex-col px-4 sm:px-6 lg:px-8 w-full max-w-[820px] mx-auto pb-3 sm:pb-5"
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.25 }}
        >
          {/* Title */}
          <div className="text-center mb-3 sm:mb-5">
            <h1 className="text-[25px] sm:text-[32px] font-bold text-text mb-2">
              Recovery phrase
            </h1>
            <p className="text-[13px] sm:text-[16px] text-muted leading-snug sm:leading-relaxed max-w-[560px] mx-auto">
              Save this 13-word phrase. It is the only way to restore your QUIVEX identity.
            </p>
          </div>

          {/* Warning */}
          <div className="flex items-start gap-3 p-3 sm:p-4 bg-[#0B0B0B] rounded-2xl border border-[#E6B450]/40 mb-3 sm:mb-5">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#E6B450]/10 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-4 h-4 text-[#E6B450]" />
            </div>
            <div>
              <p className="text-[13px] font-semibold text-[#E6B450] mb-0.5">Important</p>
              <p className="text-[12px] sm:text-[13px] text-[#F4F6F5] leading-snug sm:leading-relaxed">
                If you lose this phrase, your account cannot be recovered. Save it offline.
              </p>
            </div>
          </div>

          {/* Phrase Grid */}
          <div className="relative mb-3 sm:mb-4 min-h-0">
            <div
              className={`grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3 p-3 sm:p-4 bg-[#101314] rounded-2xl border border-white/[0.08] transition-all duration-200 ${!isRevealed ? 'blur-md select-none pointer-events-none' : ''}`}
            >
              {words.map((word, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2 min-w-0 px-2.5 sm:px-3 py-1.5 sm:py-2 bg-[#0B0D0E] rounded-xl border border-white/5"
                >
                  <span className="text-[10px] sm:text-[11px] font-mono text-muted/60 w-4 sm:w-5 text-right shrink-0">
                    {idx + 1}
                  </span>
                  <span className="text-[12px] sm:text-[14px] font-medium text-text truncate">
                    {word}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Reveal Toggle */}
          <div className="flex justify-center mb-3 sm:mb-5">
            <button
              onClick={() => setIsRevealed((prev) => !prev)}
              className="flex items-center gap-2 px-5 sm:px-6 h-10 sm:h-12 rounded-xl border border-[#00D9A3]/60 text-[#00D9A3] bg-transparent text-sm font-medium transition-colors hover:border-[#00D9A3] active:scale-[0.99]"
            >
              {isRevealed ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              <span>{isRevealed ? 'Hide phrase' : 'Reveal phrase'}</span>
            </button>
          </div>

          {/* Spacer */}
          <div className="flex-1 min-h-1" />

          {/* Confirmation */}
          <div className="mt-auto shrink-0">
            <label className="flex items-start gap-3 p-3 sm:p-4 bg-[#101314] rounded-xl border border-white/[0.08] cursor-pointer mb-3 min-h-[48px] sm:min-h-[52px]">
              <input
                type="checkbox"
                checked={hasSaved}
                onChange={(e) => setHasSaved(e.target.checked)}
                className="w-5 h-5 rounded border-white/20 bg-[#0B0D0E] accent-[#7C5CFF] focus:ring-[#7C5CFF]/40 cursor-pointer shrink-0"
              />
              <span className="text-[13px] sm:text-[14px] text-muted leading-snug sm:leading-relaxed">
                I have saved my recovery phrase
              </span>
            </label>

            <button
              onClick={handleContinue}
              disabled={!hasSaved}
              className={`w-full h-11 sm:h-[52px] flex items-center justify-center text-[15px] font-semibold rounded-[14px] transition-colors duration-150 active:scale-[0.99] ${hasSaved
                ? 'bg-[#00D9A3] text-[#050607] hover:brightness-110'
                : 'bg-[#101314] text-muted cursor-not-allowed'
                }`}
            >
              Continue
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default RecoveryPhraseScreen;

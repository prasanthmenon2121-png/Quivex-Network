import { useState, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Check, Copy } from 'lucide-react';
import { Confetti } from '../components/animations/Confetti';

interface AccountCreatedScreenProps {
  qvexId: string;
  onContinue: () => void;
}

function AccountCreatedScreen({ qvexId, onContinue }: AccountCreatedScreenProps) {
  const [hasCopied, setHasCopied] = useState(false);
  const [showConfetti, setShowConfetti] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  const normalizedId = qvexId.trim().toUpperCase();
  const displayId = /^QVX-[A-Z0-9]{20}$/.test(normalizedId)
    ? normalizedId
    : normalizedId;
  const buttonDots = [
    { left: '14%', top: '32%', size: 4, delay: 0 },
    { left: '72%', top: '24%', size: 5, delay: 0.15 },
    { left: '84%', top: '66%', size: 3, delay: 0.3 },
    { left: '28%', top: '74%', size: 3, delay: 0.45 },
  ] as const;

  const handleCopy = async () => {
    if (!displayId) return;

    try {
      await navigator.clipboard.writeText(displayId);
      setHasCopied(true);
      window.setTimeout(() => setHasCopied(false), 1800);
    } catch {
      setHasCopied(false);
    }
  };

  // Auto continue after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowConfetti(false);
      setTimeout(onContinue, 500);
    }, 3000);
    return () => clearTimeout(timer);
  }, [onContinue]);

  const renderButtonDots = (variant: 'primary' | 'secondary') => (
    <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-[16px]" aria-hidden="true">
      {buttonDots.map((dot, index) => (
        <motion.span
          key={`${variant}-${index}`}
          className="absolute rounded-full"
          style={{
            left: dot.left,
            top: dot.top,
            width: dot.size,
            height: dot.size,
            backgroundColor: variant === 'primary' ? 'rgba(0, 0, 0, 0.24)' : 'rgba(0, 217, 163, 0.34)',
          }}
          animate={
            prefersReducedMotion
              ? {}
              : { y: [-2, 2, -2], opacity: [0.2, 0.7, 0.2] }
          }
          transition={{
            duration: 2.2,
            repeat: Infinity,
            delay: dot.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </span>
  );

  return (
    <div className="fixed inset-0 bg-[#000000] overflow-hidden">
      {/* Confetti */}
      <Confetti show={showConfetti} count={12} />

      <motion.div
        className="relative min-h-[100dvh] w-full px-5 pt-[calc(env(safe-area-inset-top)+24px)] pb-[calc(env(safe-area-inset-bottom)+24px)] flex flex-col"
        initial={prefersReducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.25 }}
      >
        {/* Logo */}
        <div className="absolute left-1/2 top-[calc(env(safe-area-inset-top)+22px)] -translate-x-1/2">
          <img
            src="/logo-transparent.png"
            alt="QUIVEX"
            className="w-14 sm:w-16 lg:w-[114px] h-auto object-contain select-none"
          />
        </div>

        <div className="flex flex-1 items-center justify-center pt-20">
          <div className="w-full max-w-[430px] flex flex-col items-center">

            {/* Success Icon */}
            <motion.div
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#00D9A3]/10 border border-[#00D9A3]/55 flex items-center justify-center mb-7"
              style={{ boxShadow: '0 0 0 8px rgba(0, 217, 163, 0.04)' }}
              initial={prefersReducedMotion ? false : { scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.25, delay: 0.08 }}
            >
              <Check className="w-10 h-10 sm:w-11 sm:h-11 text-[#00D9A3]" strokeWidth={2.5} />
            </motion.div>

            {/* Congratulations */}
            <motion.h1
              className="text-[32px] sm:text-[38px] font-bold text-[#F4F6F5] text-center mb-2 leading-tight"
              style={{ fontFamily: 'Sora, system-ui' }}
              initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.15 }}
            >
              Congratulations!
            </motion.h1>

            <motion.p
              className="text-[15px] sm:text-[16px] text-[#8B9490] text-center mb-8"
              initial={prefersReducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              Your private QUIVEX identity is ready.
            </motion.p>

            {/* QVX ID Card */}
            <div
              className="w-full p-4 sm:p-5 bg-[#101314] rounded-2xl border border-white/[0.08] mb-5"
              style={{ boxShadow: '0 0 0 1px rgba(0, 217, 163, 0.04)' }}
            >
              <div className="flex items-center justify-between gap-3 mb-3">
                <span className="text-[13px] text-[#8B9490] font-medium">Your QVX ID</span>
                <button
                  onClick={handleCopy}
                  className="min-h-10 px-2.5 flex items-center gap-1.5 text-[13px] font-medium text-[#00D9A3] rounded-lg transition-colors hover:text-[#00A97F] active:scale-[0.98] disabled:opacity-50"
                  disabled={!displayId}
                >
                  {hasCopied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-[14px] sm:text-[15px] font-mono text-[#F4F6F5] break-all leading-relaxed">
                {displayId || 'QVX ID unavailable'}
              </p>
            </div>

            {/* Info */}
            <p className="text-[13px] text-[#8B9490] text-center mb-8 max-w-[320px] leading-relaxed">
              Share your QVX ID only with people you want to contact.
            </p>

            {/* Actions */}
            <div className="w-full space-y-3">
              <motion.button
                onClick={onContinue}
                className="relative w-full h-[54px] overflow-hidden flex items-center justify-center bg-[#00D9A3] text-[#050607] text-[15px] font-semibold rounded-[16px] transition duration-150 hover:brightness-110"
                whileTap={prefersReducedMotion ? undefined : { scale: 0.985 }}
              >
                {renderButtonDots('primary')}
                <span className="relative z-10">Continue to Home</span>
              </motion.button>

              <motion.button
                onClick={handleCopy}
                className="relative w-full h-[54px] overflow-hidden flex items-center justify-center gap-2 bg-transparent text-[#00D9A3] text-[15px] font-medium rounded-[16px] border border-[#00D9A3]/35 transition duration-150 hover:brightness-110 hover:border-[#00D9A3]/55 disabled:opacity-50"
                whileTap={prefersReducedMotion ? undefined : { scale: 0.985 }}
                disabled={!displayId}
              >
                {renderButtonDots('secondary')}
                <span className="relative z-10 flex items-center justify-center gap-2">
                  {hasCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{hasCopied ? 'Copied' : 'Copy QVX ID'}</span>
                </span>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default AccountCreatedScreen;

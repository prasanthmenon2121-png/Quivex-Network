import { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

interface SplashScreenProps {
  onFinish: () => void;
}

function SplashScreen({ onFinish }: SplashScreenProps) {
  const prefersReducedMotion = useReducedMotion();
  const [logoError, setLogoError] = useState(false);

  useEffect(() => {
    const timer = setTimeout(onFinish, 2300);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 bg-black flex flex-col items-center justify-center z-[100] overflow-hidden min-h-[100dvh] px-[env(safe-area-inset-left)] pr-[env(safe-area-inset-right)] pt-[env(safe-area-inset-top)] pb-[env(safe-area-inset-bottom)]">
      <motion.div
        className="flex flex-col items-center px-6"
        initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Logo */}
        <div className="flex items-center justify-center select-none">
          {logoError ? (
            <div className="flex items-center justify-center rounded-3xl border border-white/10 w-[72px] h-[72px] sm:w-[90px] sm:h-[90px] lg:w-[218px] lg:h-[218px]">
              <span
                className="text-[28px] sm:text-[34px] lg:text-[38px] font-semibold"
                style={{ color: '#00D9A3', fontFamily: 'Sora, system-ui' }}
              >
                QX
              </span>
            </div>
          ) : (
            <img
              src="/logo-transparent.png"
              alt="QUIVEX"
              className="w-[104px] h-[104px] sm:w-[136px] sm:h-[136px] lg:w-[218px] lg:h-[218px] object-contain"
              onError={() => setLogoError(true)}
            />
          )}
        </div>

        {/* Wordmark */}
        <motion.p
          className="mt-5 text-[28px] sm:text-[36px] lg:text-[44px] font-black tracking-[0.26em] text-text select-none"
          style={{
            fontFamily: 'Orbitron, Sora, system-ui',
            transform: 'skewX(-6deg)',
          }}
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          QUIVEX
        </motion.p>

        {/* Tagline */}
        <motion.p
          className="mt-3 text-[12px] sm:text-[13px] lg:text-[14px] text-muted select-none"
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          Send Messages, Not Metadata
        </motion.p>

        {/* Loading Dots */}
        <div className="flex items-center gap-2 mt-8">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full"
              style={{ backgroundColor: '#00D9A3' }}
              animate={
                prefersReducedMotion
                  ? {}
                  : { opacity: [0.3, 1, 0.3] }
              }
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: i * 0.15,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default SplashScreen;

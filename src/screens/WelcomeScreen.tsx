import { motion, useReducedMotion } from 'framer-motion';

interface WelcomeScreenProps {
  onCreate: () => void;
  onRestore: () => void;
}

function WelcomeScreen({ onCreate, onRestore }: WelcomeScreenProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="fixed inset-0 bg-bg flex items-center justify-center overflow-hidden">
      <motion.div
        className="w-full max-w-[400px] px-6 py-12 safe-area-pt safe-area-pb flex flex-col items-center h-full justify-center"
        initial={prefersReducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Logo */}
        <motion.img
          src="/logo-transparent.png"
          alt="QUIVEX"
          className="w-40 h-auto sm:w-48 lg:w-[240px] object-contain select-none mb-8"
          initial={prefersReducedMotion ? false : { scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        />

        {/* Headline */}
        <motion.h1
          className="text-[26px] sm:text-[30px] font-semibold text-text text-center leading-tight mb-3"
          style={{ fontFamily: 'Sora, Inter, system-ui' }}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          Private messaging,
          <br />
          <span className="text-accent">redefined.</span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          className="text-[15px] text-muted text-center leading-relaxed mb-10 max-w-[300px]"
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.25 }}
        >
          No phone. No email. Just your identity.
        </motion.p>

        {/* Primary Button */}
        <motion.button
          onClick={onCreate}
          className="w-full h-[52px] flex items-center justify-center bg-accent text-bg-deep font-semibold text-[15px] rounded-[14px] transition-all duration-150 hover:bg-accent-dark active:scale-[0.98] mb-3"
          style={{ fontFamily: 'Sora, Inter, system-ui' }}
          initial={prefersReducedMotion ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          Create Account
        </motion.button>

        {/* Secondary Button */}
        <motion.button
          onClick={onRestore}
          className="w-full h-[52px] flex items-center justify-center bg-surface text-muted font-medium text-[15px] rounded-[14px] border border-border transition-all duration-150 hover:text-text hover:border-accent/30 active:scale-[0.98]"
          style={{ fontFamily: 'Sora, Inter, system-ui' }}
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.35 }}
        >
          Restore Account
        </motion.button>

        {/* Trust Indicators */}
        <motion.div
          className="mt-12 flex items-center gap-1"
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
        >
          <span className="text-[11px] text-muted/40">Anonymous</span>
          <span className="text-muted/20 mx-2">•</span>
          <span className="text-[11px] text-muted/40">Encrypted</span>
          <span className="text-muted/20 mx-2">•</span>
          <span className="text-[11px] text-muted/40">Secure</span>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default WelcomeScreen;

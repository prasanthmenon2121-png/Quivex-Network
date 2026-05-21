import { motion, useReducedMotion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function HomeScreen() {
  const prefersReducedMotion = useReducedMotion();
  const navigate = useNavigate();

  return (
    <>
      {/* Empty State */}
      <div className="flex-1 h-full flex flex-col items-center justify-center md:justify-end relative p-0 md:p-6 md:pt-16 md:pb-12">
        {/* Centered Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <img
            src="/logo-transparent.png"
            alt="QUIVEX"
            className="w-[520px] md:w-[480px] lg:w-[570px] h-auto opacity-[0.10]"
          />
        </div>

        <motion.div
          className="hidden md:flex flex-col items-center w-full max-w-[320px] relative z-10"
          initial={prefersReducedMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {/* Subtitle */}
          <p className="text-[14px] text-muted text-center mb-6 leading-relaxed">
            Start a private conversation with a QVX ID.
          </p>

          {/* Primary Button */}
          <button
            onClick={() => navigate('/new-conversation')}
            className="w-full h-[52px] flex items-center justify-center bg-accent text-bg-deep text-[15px] font-semibold rounded-[14px] transition-colors duration-500 hover:bg-accent-dark active:scale-[0.99]"
          >
            Start a conversation
          </button>
        </motion.div>
      </div>

      {/* Mobile FAB */}
      <button
        onClick={() => navigate('/new-conversation')}
        className="fixed right-5 bottom-[max(20px,calc(env(safe-area-inset-bottom)+16px))] w-14 h-14 flex items-center justify-center bg-accent text-bg-deep rounded-full transition-transform active:scale-0.95 shadow-lg z-80 md:hidden"
        style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.35)' }}
        aria-label="Add contact"
      >
        <Plus className="w-6 h-6" />
      </button>
    </>
  );
}

export default HomeScreen;



import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { QuivexLogo } from '../components/brand/QuivexLogo';

interface SplashScreenProps {
  onFinish: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  useEffect(() => {
    const timer = setTimeout(onFinish, 2000);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 bg-bg flex flex-col items-center justify-center z-[100] safe-area-pt safe-area-pb">
      <motion.div 
        className="flex flex-col items-center gap-10"
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="flex flex-col items-center gap-6">
          <QuivexLogo variant="icon" size={220} className="opacity-95" />
          <QuivexLogo variant="wordmark" size={320} className="brightness-125" />
        </div>
        
        <div className="flex items-center gap-3 mt-4">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-accent rounded-full shadow-[0_0_6px_rgba(0,199,118,0.3)]"
              animate={{
                opacity: [0.4, 1, 0.4],
                scale: [0.9, 1.1, 0.9],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default SplashScreen;

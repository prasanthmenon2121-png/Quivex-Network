import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';

const AVATAR_COLORS = [
  '#0D3D2D', '#1A4A3A', '#0A3A2A', '#153D30', '#0D4035',
  '#1A5045', '#0A4540', '#15504A', '#0D5550', '#1A6055'
];

interface DisplayNameScreenProps {
  onBack: () => void;
  onContinue: (name: string) => void;
}

export const DisplayNameScreen = ({ onBack, onContinue }: DisplayNameScreenProps) => {
  const [name, setName] = useState('');
  const [colorIndex, setColorIndex] = useState(0);

  const handleNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (value.length <= 64) {
      setName(value);
    }
  }, []);

  const cycleColor = useCallback(() => {
    setColorIndex((prev) => (prev + 1) % AVATAR_COLORS.length);
  }, []);

  const isValid = name.trim().length >= 1;
  const charCount = name.length;

  const getCounterColor = () => {
    if (charCount >= 60) return '#FF4538';
    if (charCount >= 50) return '#FFAB38';
    return '#8A9E8A';
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="relative min-h-screen w-full flex flex-col bg-background"
    >
      {/* Header */}
      <header className="flex items-center px-4 py-4">
        <button
          onClick={onBack}
          className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-surface transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft size={24} className="text-accent" />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
        {/* Avatar Circle */}
        <motion.button
          onClick={cycleColor}
          whileTap={{ scale: 0.95 }}
          className="w-20 h-20 rounded-full flex items-center justify-center mb-8 transition-colors"
          style={{
            backgroundColor: AVATAR_COLORS[colorIndex],
            border: '2px solid rgba(0,255,127,0.4)',
            boxShadow: '0 0 20px rgba(0,255,127,0.2)'
          }}
          aria-label="Tap to change avatar color"
        >
          <span
            className="text-3xl font-bold text-white uppercase"
            style={{ textShadow: '0 0 10px rgba(0,255,127,0.3)' }}
          >
            {name.trim().charAt(0) || '?'}
          </span>
        </motion.button>

        {/* Input Container */}
        <div className="w-full max-w-[340px]">
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            placeholder="Enter a display name..."
            autoFocus
            className="w-full h-[52px] px-5 rounded-xl text-[16px] outline-none transition-all"
            style={{
              fontFamily: 'system-ui, -apple-system, sans-serif',
              backgroundColor: '#1A211A',
              border: '1.5px solid rgba(0,255,127,0.15)',
              color: '#F0F7F0'
            }}
            onFocus={(e) => {
              e.target.style.borderColor = '#00FF7F';
              e.target.style.boxShadow = '0 0 0 3px rgba(0,255,127,0.12)';
            }}
            onBlur={(e) => {
              e.target.style.borderColor = 'rgba(0,255,127,0.15)';
              e.target.style.boxShadow = 'none';
            }}
          />

          {/* Character Counter */}
          <div className="flex justify-end mt-2">
            <span
              className="text-[12px]"
              style={{ color: getCounterColor() }}
            >
              {charCount}/64
            </span>
          </div>
        </div>

        {/* Continue Button */}
        <motion.button
          onClick={() => isValid && onContinue(name.trim())}
          disabled={!isValid}
          whileTap={isValid ? { scale: 0.97 } : undefined}
          className={`w-full max-w-[340px] h-[52px] rounded-full mt-8 text-[16px] font-semibold transition-all ${isValid
            ? 'cursor-pointer'
            : 'cursor-not-allowed'
            }`}
          style={{
            background: isValid
              ? 'linear-gradient(135deg, #00FF7F, #39FF14)'
              : 'rgba(0,255,127,0.2)',
            color: isValid ? '#060A06' : 'rgba(0,255,127,0.5)',
            boxShadow: isValid ? '0 0 20px rgba(0,255,127,0.35)' : 'none'
          }}
        >
          Continue
        </motion.button>
      </main>
    </motion.div>
  );
};

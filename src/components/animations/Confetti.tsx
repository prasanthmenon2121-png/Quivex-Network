import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from 'framer-motion';

interface ConfettiProps {
  show: boolean;
  count?: number;
  colors?: string[];
}

export function Confetti({ show, count = 15, colors }: ConfettiProps) {
  const prefersReducedMotion = useReducedMotion();

  // Professional color palette
  const defaultColors = [
    '#16C784', // Accent green
    '#D4AF37', // Gold
    '#C0C0C0', // Silver
    '#E8E8E8', // Platinum
    '#1EB6A6', // Teal
  ];

  const particleColors = colors || defaultColors;
  const seededValue = (index: number, salt: number) => {
    const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
    return value - Math.floor(value);
  };

  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: seededValue(i, 1) * 100,
    y: -30,
    delay: seededValue(i, 2) * 0.6,
    color: particleColors[Math.floor(seededValue(i, 3) * particleColors.length)],
    size: seededValue(i, 4) * 4 + 3,
    rotation: seededValue(i, 5) * 360,
    duration: 2.5 + seededValue(i, 6) * 1.5,
  }));

  if (prefersReducedMotion) return null;

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-50">
          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full"
              style={{
                left: `${p.x}%`,
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                boxShadow: `0 0 ${p.size/2}px ${p.color}40`,
              }}
              initial={{ y: -30, opacity: 0, scale: 0, rotate: 0 }}
              animate={{
                y: '110vh',
                opacity: [0, 1, 0.8, 0],
                scale: [0, 1, 0.9],
                rotate: p.rotation,
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                ease: 'easeOut',
              }}
            />
          ))}
        </div>
      )}
    </AnimatePresence>
  );
}

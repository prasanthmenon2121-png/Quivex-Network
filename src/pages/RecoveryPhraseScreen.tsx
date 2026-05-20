import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, X, Copy, QrCode, Eye, EyeOff, Check } from 'lucide-react';

interface RecoveryPhraseScreenProps {
  onBack: () => void;
  onClose: () => void;
  onDone?: () => void;
  recoveryWords?: string[];
}

// Default 13 words for demo
const DEFAULT_WORDS = [
  'abandon', 'ability', 'able', 'about', 'above',
  'absent', 'absorb', 'abstract', 'absurd', 'abuse',
  'access', 'accident', 'account'
];

export const RecoveryPhraseScreen = ({
  onBack,
  onClose,
  onDone,
  recoveryWords = DEFAULT_WORDS
}: RecoveryPhraseScreenProps) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const handleReveal = useCallback(() => {
    setIsRevealed(true);
  }, []);

  const handleHide = useCallback(() => {
    setIsRevealed(false);
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(recoveryWords.join(' '));
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  }, [recoveryWords]);

  const handleViewQR = useCallback(() => {
    setShowQR(true);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="relative min-h-screen w-full flex flex-col"
      style={{ backgroundColor: '#060A06' }}
    >
      {/* Header */}
      <header className="flex items-center justify-between px-4 py-3">
        <button
          onClick={onBack}
          className="w-12 h-12 flex items-center justify-center rounded-full transition-colors"
          style={{ backgroundColor: 'transparent' }}
          aria-label="Go back"
        >
          <ArrowLeft size={24} style={{ color: '#00FF7F' }} />
        </button>

        <h1
          className="text-[18px] font-semibold"
          style={{ color: '#F0F7F0' }}
        >
          Recovery Password
        </h1>

        <button
          onClick={onClose}
          className="w-12 h-12 flex items-center justify-center rounded-full transition-colors"
          style={{ backgroundColor: 'transparent' }}
          aria-label="Close"
        >
          <X size={24} style={{ color: '#8A9E8A' }} />
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col px-4 pb-4">
        {/* Warning Banner */}
        <div
          className="flex items-start gap-2 p-3 rounded-lg mb-4"
          style={{
            backgroundColor: 'rgba(255,171,56,0.08)',
            borderLeft: '3px solid #FFAB38'
          }}
        >
          <span className="text-base">⚠️</span>
          <p
            className="text-[12px] leading-snug"
            style={{ color: '#FFAB38' }}
          >
            Your recovery password is the ONLY way to restore your account. Store it safely!
          </p>
        </div>

        {/* Recovery Phrase Grid */}
        <div className="relative flex-1">
          <div
            className="grid grid-cols-2 gap-1.5"
            style={{ filter: isRevealed ? 'none' : 'blur(6px)' }}
          >
            {recoveryWords.map((word, index) => (
              <div
                key={index}
                className="flex items-center gap-2 px-3 py-2 rounded-md"
                style={{
                  backgroundColor: '#1A211A',
                  border: '1px solid rgba(0,255,127,0.12)'
                }}
              >
                <span
                  className="text-[12px] min-w-[20px]"
                  style={{ color: '#4A5E4A' }}
                >
                  {index + 1}.
                </span>
                <span
                  className="text-[14px] font-mono"
                  style={{ color: '#F0F7F0' }}
                >
                  {word}
                </span>
              </div>
            ))}
          </div>

          {/* Tap to Reveal Overlay */}
          <AnimatePresence>
            {!isRevealed && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={handleReveal}
                className="absolute inset-0 flex items-center justify-center rounded-lg"
                style={{ backgroundColor: 'rgba(6,10,6,0.7)' }}
              >
                <div className="flex items-center gap-2">
                  <Eye size={20} style={{ color: '#00FF7F' }} />
                  <span
                    className="text-[14px] font-medium"
                    style={{ color: '#00FF7F' }}
                  >
                    Tap to reveal
                  </span>
                </div>
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        {/* Hide Button (shown when revealed) */}
        {isRevealed && (
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={handleHide}
            className="flex items-center justify-center gap-2 py-3 mt-4"
          >
            <EyeOff size={18} style={{ color: '#8A9E8A' }} />
            <span
              className="text-[13px]"
              style={{ color: '#8A9E8A' }}
            >
              Hide recovery phrase
            </span>
          </motion.button>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-2 mt-4">
          <motion.button
            onClick={handleCopy}
            whileTap={{ scale: 0.97 }}
            className="flex-1 h-[44px] rounded-full flex items-center justify-center gap-2 text-[13px] font-medium transition-all"
            style={{
              border: '1.5px solid rgba(0,255,127,0.2)',
              backgroundColor: 'transparent',
              color: isCopied ? '#00FF7F' : '#F0F7F0'
            }}
          >
            {isCopied ? (
              <>
                <Check size={18} style={{ color: '#00FF7F' }} />
                <span>Copied! ✓</span>
              </>
            ) : (
              <>
                <Copy size={18} />
                <span>Copy</span>
              </>
            )}
          </motion.button>

          <motion.button
            onClick={handleViewQR}
            whileTap={{ scale: 0.97 }}
            className="flex-1 h-[44px] rounded-full flex items-center justify-center gap-2 text-[13px] font-medium transition-all"
            style={{
              border: '1.5px solid rgba(0,255,127,0.2)',
              backgroundColor: 'transparent',
              color: '#F0F7F0'
            }}
          >
            <QrCode size={18} />
            <span>View QR</span>
          </motion.button>
        </div>

        {/* Confirm/Done Button */}
        <motion.button
          onClick={onDone || onClose}
          whileTap={{ scale: 0.97 }}
          className="w-full h-[48px] rounded-full mt-3 text-[14px] font-semibold"
          style={{
            backgroundColor: '#00FF7F',
            color: '#060A06',
            boxShadow: '0 0 20px rgba(0,255,127,0.35)'
          }}
        >
          Done
        </motion.button>
      </main>

      {/* QR Modal */}
      <AnimatePresence>
        {showQR && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
            style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
            onClick={() => setShowQR(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="p-6 rounded-2xl max-w-[300px] w-full"
              style={{ backgroundColor: '#0D120D' }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3
                className="text-[16px] font-semibold text-center mb-4"
                style={{ color: '#F0F7F0' }}
              >
                Recovery QR Code
              </h3>

              {/* QR Placeholder */}
              <div
                className="aspect-square rounded-lg flex items-center justify-center mb-4"
                style={{ backgroundColor: '#F0F7F0' }}
              >
                <QrCode size={120} style={{ color: '#060A06' }} />
              </div>

              <p
                className="text-[12px] text-center mb-4"
                style={{ color: '#8A9E8A' }}
              >
                Scan this QR code to import your recovery phrase
              </p>

              <button
                onClick={() => setShowQR(false)}
                className="w-full h-[44px] rounded-full text-[14px] font-medium"
                style={{
                  backgroundColor: '#00FF7F',
                  color: '#060A06'
                }}
              >
                Done
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

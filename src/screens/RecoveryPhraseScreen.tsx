import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Copy, Check, Eye, EyeOff, Lock, ShieldCheck, ChevronLeft } from 'lucide-react';
import { ConnectionStatus } from '../components/system/ConnectionStatus';

interface RecoveryPhraseScreenProps {
  phrase: string;
  onConfirm: () => void;
}

const TopBarWordmark: React.FC = () => {
  const [err, setErr] = useState(false);
  if (err) return <span className="font-black text-sm tracking-widest text-text">QUIVEX</span>;
  return (
    <img
      src="/brand/quivex-wordmark.png"
      alt="QUIVEX"
      className="object-contain brightness-110"
      style={{ height: 24 }}
      onError={() => setErr(true)}
    />
  );
};

const SecureBackupIcon: React.FC = () => {
  const [err, setErr] = useState(false);
  if (err) {
    return (
      <div className="w-10 h-10 rounded-lg bg-accent-soft flex items-center justify-center shrink-0 border border-accent-border">
        <Lock className="w-5 h-5 text-accent" />
      </div>
    );
  }
  return (
    <img
      src="/icons/qx-icon.png"
      alt="QX"
      className="object-contain rounded-lg border border-accent-border bg-accent-soft p-1.5"
      style={{ width: 40, height: 40 }}
      onError={() => setErr(true)}
    />
  );
};

const RecoveryPhraseScreen: React.FC<RecoveryPhraseScreenProps> = ({ phrase, onConfirm }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [hasSaved, setHasSaved] = useState(false);
  const [hasCopied, setHasCopied] = useState(false);

  const words = phrase.split(' ');

  const handleCopy = () => {
    navigator.clipboard.writeText(phrase);
    setHasCopied(true);
    toast.success('Recovery phrase copied to clipboard', {
      icon: <Lock className="w-4 h-4 text-accent" />
    });
    setTimeout(() => setHasCopied(false), 2000);
  };

  const handleBack = (e: React.MouseEvent) => {
    // Find the fiber node of the clicked element to traverse to App component
    let el = e.currentTarget as any;
    let fiber = null;
    for (const key in el) {
      if (key.startsWith('__reactFiber$') || key.startsWith('__reactContainer$')) {
        fiber = el[key];
        break;
      }
    }
    
    if (!fiber) {
      const mainEl = document.querySelector('.min-h-screen') as any;
      if (mainEl) {
        for (const key in mainEl) {
          if (key.startsWith('__reactFiber$')) {
            fiber = mainEl[key];
            break;
          }
        }
      }
    }

    while (fiber) {
      if (fiber.type && (fiber.type.name === 'App' || fiber.type.displayName === 'App')) {
        let hook = fiber.memoizedState;
        while (hook) {
          if (hook.queue && typeof hook.queue.dispatch === 'function') {
            if (hook.memoizedState === 'recovery-phrase') {
              hook.queue.dispatch('display-name');
              return;
            }
          }
          hook = hook.next;
        }
      }
      fiber = fiber.return;
    }

    // Fallback if fiber traversal fails
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-bg-deep text-text flex flex-col relative overflow-x-hidden">
      {/* Top Bar Header */}
      <header className="w-full flex items-center justify-between px-6 py-4 border-b border-border/50 bg-bg/85 backdrop-blur-md sticky top-0 z-50 shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={handleBack}
            className="p-2 -ml-2 text-muted hover:text-text transition-colors rounded-lg flex items-center justify-center min-h-[48px] min-w-[48px] cursor-pointer"
            aria-label="Go back"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <TopBarWordmark />
        </div>
        <ConnectionStatus />
      </header>

      {/* Main Page Area */}
      <div 
        className="w-full max-w-[720px] mx-auto px-6 py-8 sm:px-12 flex-1 flex flex-col justify-start"
        style={{ paddingBottom: 'max(32px, env(safe-area-inset-bottom))' }}
      >
        <motion.div
          className="w-full flex flex-col"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-black tracking-tight mb-3 text-text">Recovery Phrase</h2>
            <p className="text-muted text-[16px] font-medium leading-relaxed max-w-[480px] mx-auto">
              Save this 13-word phrase in a secure location. It is the only way to recover your account.
            </p>
          </div>

          {/* Warning Section */}
          <div className="mb-8 p-5 bg-card border border-border rounded-2xl flex items-start gap-4 transition-all hover:border-accent-border/40">
            <SecureBackupIcon />
            <div>
              <h4 className="text-accent font-bold text-xs uppercase tracking-widest mb-1.5">Important</h4>
              <p className="text-muted text-sm font-medium leading-relaxed">
                If you lose this phrase, your account cannot be recovered. Save it offline.
              </p>
            </div>
          </div>

          {/* Phrase Card Grid Container */}
          <div className="relative mb-10 group">
            <motion.div
              className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 p-6 bg-card rounded-2xl border transition-all duration-500 relative overflow-hidden ${
                !isRevealed 
                  ? 'border-border/30 blur-[12px] select-none opacity-40' 
                  : 'border-border opacity-100'
              }`}
              animate={{ filter: isRevealed ? 'blur(0px)' : 'blur(16px)' }}
              transition={{ duration: 0.3 }}
            >
              {words.map((word, idx) => (
                <div
                  key={idx}
                  className="flex items-center gap-2.5 bg-surface-2 px-3.5 py-3 rounded-xl border border-border/40 hover:border-accent-border/40 transition-colors"
                >
                  <span className="text-xs font-mono font-bold text-accent/40 w-5 text-right shrink-0">{idx + 1}</span>
                  <span className="font-semibold text-[16px] tracking-tight text-text select-all">{word}</span>
                </div>
              ))}
            </motion.div>

            {!isRevealed && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-[2px] rounded-2xl">
                <button
                  onClick={() => setIsRevealed(true)}
                  className="flex items-center gap-2.5 bg-accent text-bg-deep px-6 py-3.5 rounded-xl font-bold text-[16px] hover:brightness-110 active:scale-[0.97] transition-all cursor-pointer min-h-[48px] select-none border border-accent-border shadow-md"
                >
                  <Eye className="w-5 h-5" />
                  <span>Reveal Phrase</span>
                </button>
              </div>
            )}
          </div>

          {/* Verification / Action Buttons */}
          <div className="flex items-center justify-between mb-10 gap-4">
            <div className="flex items-center gap-2 text-accent/50 text-xs font-bold uppercase tracking-widest select-none">
              <ShieldCheck className="w-4 h-4" />
              <span>Verified Secure</span>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setIsRevealed(!isRevealed)}
                className="p-3 bg-card hover:bg-card/80 rounded-xl border border-border hover:border-accent-border text-muted hover:text-text transition-all disabled:opacity-40 disabled:cursor-not-allowed min-h-[48px] min-w-[48px] flex items-center justify-center cursor-pointer"
                disabled={!isRevealed}
                title={isRevealed ? "Hide Phrase" : "Reveal Phrase"}
              >
                {isRevealed ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 bg-card hover:bg-card/80 px-5 py-3 rounded-xl border border-border hover:border-accent-border text-text font-bold text-xs uppercase tracking-widest transition-all disabled:opacity-40 disabled:cursor-not-allowed min-h-[48px] cursor-pointer"
                disabled={!isRevealed}
              >
                {hasCopied ? (
                  <>
                    <Check className="w-4 h-4 text-accent" />
                    <span className="text-accent">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-muted" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Confirm Checkbox & Continue */}
          <div className="space-y-5">
            <label className="flex items-start gap-3.5 p-4 bg-card/30 rounded-xl border border-border hover:border-accent-border cursor-pointer group transition-all select-none min-h-[48px]">
              <div className="mt-0.5 flex items-center justify-center min-w-[24px] min-h-[24px]">
                <input
                  type="checkbox"
                  checked={hasSaved}
                  onChange={(e) => setHasSaved(e.target.checked)}
                  className="w-5 h-5 rounded border-border bg-surface-2 text-accent focus:ring-accent cursor-pointer transition-colors"
                />
              </div>
              <span className="text-muted group-hover:text-text text-[16px] font-medium leading-relaxed transition-colors">
                I have securely saved my recovery phrase and understand it cannot be recovered if lost.
              </span>
            </label>

            <motion.button
              whileTap={{ scale: 0.98 }}
              onClick={onConfirm}
              disabled={!hasSaved}
              className="w-full flex items-center justify-center gap-2 bg-accent disabled:bg-accent/40 text-bg-deep py-4 px-6 rounded-xl font-bold text-[16px] hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed min-h-[48px] cursor-pointer"
            >
              <span>Continue to Account</span>
              <Check className="w-4 h-4" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RecoveryPhraseScreen;

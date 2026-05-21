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
      <div className="w-8 h-8 rounded-lg bg-accent-soft flex items-center justify-center shrink-0 border border-accent-border">
        <Lock className="w-4 h-4 text-accent" />
      </div>
    );
  }
  return (
    <img
      src="/icons/qx-icon.png"
      alt="QX"
      className="object-contain rounded-lg border border-accent-border bg-accent-soft p-1"
      style={{ width: 32, height: 32 }}
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
      const mainEl = document.querySelector('.min-h-screen') || document.querySelector('.h-full');
      if (mainEl) {
        for (const key in mainEl) {
          if (key.startsWith('__reactFiber$')) {
            fiber = (mainEl as any)[key];
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
    <div className="h-full flex flex-col bg-bg-deep text-text overflow-hidden select-none animate-in fade-in duration-300">
      {/* Top Bar Header */}
      <header className="w-full flex items-center justify-between px-6 py-3 border-b border-border/50 bg-bg/85 backdrop-blur-md sticky top-0 z-50 shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={handleBack}
            className="p-2 -ml-2 text-muted hover:text-text transition-colors rounded-lg flex items-center justify-center min-h-[40px] min-w-[40px] cursor-pointer"
            aria-label="Go back"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <TopBarWordmark />
        </div>
        <ConnectionStatus />
      </header>

      {/* Main Page Area */}
      <div className="w-full max-w-[680px] mx-auto px-6 py-4 flex-1 flex flex-col justify-between overflow-hidden">
        <div className="flex flex-col gap-3.5 shrink-0">
          <div className="text-center">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-1 text-text">Recovery Phrase</h2>
            <p className="text-muted text-xs sm:text-sm font-medium leading-relaxed max-w-[400px] mx-auto">
              Save this 13-word phrase in a secure location. It is the only way to recover your account.
            </p>
          </div>

          {/* Warning Section */}
          <div className="p-3.5 bg-card border border-border rounded-xl flex items-start gap-3 transition-all hover:border-accent-border/30">
            <SecureBackupIcon />
            <div>
              <h4 className="text-accent font-bold text-[10px] uppercase tracking-widest mb-0.5">Important</h4>
              <p className="text-muted text-xs font-medium leading-relaxed">
                If you lose this phrase, your account cannot be recovered. Save it offline.
              </p>
            </div>
          </div>
        </div>

        {/* Phrase Card Grid Container */}
        <div className="relative my-3 flex-1 flex flex-col justify-center min-h-0">
          <motion.div
            className={`grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 p-5 bg-card rounded-xl border transition-all duration-500 relative overflow-y-auto max-h-full ${
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
                className="flex items-center gap-2 bg-surface-2 px-3 py-2 rounded-lg border border-border/40 hover:border-accent-border/40 transition-colors"
              >
                <span className="text-[11px] font-mono font-bold text-accent/40 w-4 text-right shrink-0">{idx + 1}</span>
                <span className="font-semibold text-sm tracking-tight text-text select-all">{word}</span>
              </div>
            ))}
          </motion.div>

          {!isRevealed && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-[2px] rounded-xl">
              <button
                onClick={() => setIsRevealed(true)}
                className="flex items-center gap-2 bg-accent text-bg-deep px-5 py-2.5 rounded-lg font-bold text-sm hover:brightness-110 active:scale-[0.97] transition-all cursor-pointer min-h-[44px] select-none border border-accent-border shadow-md"
              >
                <Eye className="w-4 h-4" />
                <span>Reveal Phrase</span>
              </button>
            </div>
          )}
        </div>

        {/* Verification / Action Buttons */}
        <div className="flex items-center justify-between mb-3 gap-4 shrink-0">
          <div className="flex items-center gap-1.5 text-accent/50 text-[11px] font-bold uppercase tracking-widest select-none">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Verified Secure</span>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setIsRevealed(!isRevealed)}
              className="p-2 bg-card hover:bg-card/80 rounded-lg border border-border hover:border-accent-border text-muted hover:text-text transition-all disabled:opacity-40 disabled:cursor-not-allowed min-h-[40px] min-w-[40px] flex items-center justify-center cursor-pointer"
              disabled={!isRevealed}
              title={isRevealed ? "Hide Phrase" : "Reveal Phrase"}
            >
              {isRevealed ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 bg-card hover:bg-card/80 px-4 py-2 rounded-lg border border-border hover:border-accent-border text-text font-bold text-xs uppercase tracking-widest transition-all disabled:opacity-40 disabled:cursor-not-allowed min-h-[40px] cursor-pointer"
              disabled={!isRevealed}
            >
              {hasCopied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-accent" />
                  <span className="text-accent">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-muted" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Confirm Checkbox & Continue */}
        <div className="space-y-3 shrink-0">
          <label className="flex items-start gap-2.5 p-3 bg-card/30 rounded-xl border border-border hover:border-accent-border cursor-pointer group transition-all select-none min-h-[44px]">
            <div className="mt-0.5 flex items-center justify-center min-w-[20px] min-h-[20px]">
              <input
                type="checkbox"
                checked={hasSaved}
                onChange={(e) => setHasSaved(e.target.checked)}
                className="w-4 h-4 rounded border-border bg-surface-2 text-accent focus:ring-accent cursor-pointer transition-colors"
              />
            </div>
            <span className="text-muted group-hover:text-text text-sm font-medium leading-relaxed transition-colors">
              I have securely saved my recovery phrase and understand it cannot be recovered if lost.
            </span>
          </label>

          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onConfirm}
            disabled={!hasSaved}
            className="w-full flex items-center justify-center gap-2 bg-accent disabled:bg-accent/40 text-bg-deep py-3 px-4 rounded-xl font-bold text-sm hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed min-h-[44px] cursor-pointer"
          >
            <span>Continue to Account</span>
            <Check className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default RecoveryPhraseScreen;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { Copy, Check, Eye, EyeOff, Lock, AlertTriangle, ShieldCheck } from 'lucide-react';
import { ConnectionStatus } from '../components/system/ConnectionStatus';

interface RecoveryPhraseScreenProps {
  phrase: string;
  onConfirm: () => void;
}

const RecoveryPhraseScreen: React.FC<RecoveryPhraseScreenProps> = ({ phrase, onConfirm }) => {
  const [isRevealed, setIsRevealed] = useState(false);
  const [hasSaved, setHasSaved] = useState(false);

  const words = phrase.split(' ');

  const handleCopy = () => {
    navigator.clipboard.writeText(phrase);
    toast.success('Recovery phrase copied', {
      icon: <Lock className="w-4 h-4 text-accent" />
    });
  };

  return (
    <div className="app-screen bg-bg flex flex-col">
      <header className="flex items-center justify-between p-6 safe-area-pt border-b border-border/50">
        <div className="flex items-center gap-2 text-muted font-bold text-xs uppercase tracking-widest">
          <Lock className="w-3.5 h-3.5" />
          <span>Backup</span>
        </div>
        <ConnectionStatus />
      </header>

      <div className="flex-1 overflow-y-auto px-6 py-8 sm:px-12 max-w-2xl mx-auto w-full custom-scrollbar">
        <motion.div
          className="animate-in slide-up fade-in duration-1000"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-10 text-center">
            <h2 className="text-4xl font-black tracking-tight mb-3 text-text">Recovery Phrase</h2>
            <p className="text-muted text-base font-medium leading-relaxed max-w-sm mx-auto">
              Save this 13-word phrase in a secure location. It's your only way to recover your account.
            </p>
          </div>

          {/* Warning Section */}
          <div className="mb-8 p-5 bg-card/40 border border-border rounded-xl flex items-start gap-4">
            <div className="w-10 h-10 rounded-lg bg-accent/15 flex items-center justify-center shrink-0 border border-accent/20">
              <AlertTriangle className="w-5 h-5 text-accent" />
            </div>
            <div>
              <h4 className="text-accent font-bold text-xs uppercase tracking-widest mb-1.5">Important</h4>
              <p className="text-muted text-sm font-medium leading-relaxed">
                If you lose this phrase, your account and all data are permanently gone. Save it offline.
              </p>
            </div>
          </div>

          {/* Phrase Grid */}
          <div className="relative mb-10 group">
            <motion.div
              className={`grid grid-cols-2 sm:grid-cols-3 gap-3 p-6 bg-card rounded-xl border border-border transition-all ${!isRevealed ? 'blur-lg select-none opacity-30' : 'blur-0 opacity-100'}`}
              animate={{ filter: isRevealed ? 'blur(0px)' : 'blur(16px)' }}
              transition={{ duration: 0.3 }}
            >
              {words.map((word, idx) => (
                <motion.div
                  key={idx}
                  className="flex items-center gap-2.5 bg-surface/50 px-3.5 py-2.5 rounded-lg border border-border/50"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: isRevealed ? idx * 0.02 : 0 }}
                >
                  <span className="text-xs font-bold opacity-30 w-4 text-right">{idx + 1}</span>
                  <span className="font-semibold text-sm tracking-tight text-text">{word}</span>
                </motion.div>
              ))}
            </motion.div>

            {!isRevealed && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={() => setIsRevealed(true)}
                className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-sm rounded-xl border border-border"
              >
                <div className="flex items-center gap-2.5 bg-accent text-bg-deep px-6 py-3 rounded-lg font-bold text-sm hover:brightness-110 transition-all">
                  <Eye className="w-4 h-4" />
                  <span>Reveal Phrase</span>
                </div>
              </motion.button>
            )}
          </div>

          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-2 text-accent/50 text-xs font-bold uppercase tracking-widest">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Verified</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsRevealed(!isRevealed)}
                className="p-2.5 bg-card hover:bg-card/80 rounded-lg border border-border hover:border-border-strong text-muted transition-all"
                disabled={!isRevealed}
              >
                {isRevealed ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
              <button
                onClick={handleCopy}
                className="flex items-center gap-2 bg-card hover:bg-card/80 px-4 py-2.5 rounded-lg border border-border hover:border-border-strong font-bold text-xs uppercase tracking-widest transition-all disabled:opacity-50"
                disabled={!isRevealed}
              >
                <Copy className="w-4 h-4 opacity-60" />
                <span>Copy</span>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <label className="flex items-start gap-3.5 p-4 bg-card/40 rounded-lg border border-border hover:border-border-strong cursor-pointer group transition-all">
              <div className="mt-0.5">
                <input
                  type="checkbox"
                  checked={hasSaved}
                  onChange={(e) => setHasSaved(e.target.checked)}
                  className="w-5 h-5 rounded border-border bg-card accent-accent focus:ring-accent cursor-pointer"
                />
              </div>
              <span className="text-muted group-hover:text-text text-sm font-medium leading-relaxed transition-colors">
                I have securely saved my recovery phrase and understand it cannot be recovered if lost.
              </span>
            </label>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={onConfirm}
              disabled={!hasSaved}
              className="btn-primary disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <span>Continue to Account</span>
              <Check className="w-4 h-4 ml-auto opacity-50" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RecoveryPhraseScreen;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Copy, Check, BadgeCheck } from 'lucide-react';
import { ConnectionStatus } from '../components/system/ConnectionStatus';
import { QuivexLogo } from '../components/brand/QuivexLogo';

interface AccountCreatedScreenProps {
  qvexId: string;
  onContinue: () => void;
}

const AccountCreatedScreen: React.FC<AccountCreatedScreenProps> = ({ qvexId, onContinue }) => {
  const [hasCopied, setHasCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(qvexId);
    setHasCopied(true);
    setTimeout(() => setHasCopied(false), 2000);
  };

  return (
    <div className="app-screen bg-bg flex flex-col">
      <header className="flex items-center justify-end p-6 safe-area-pt border-b border-border/50">
        <ConnectionStatus />
      </header>

      <div className="flex-1 flex flex-col justify-center px-6 sm:px-12 max-w-lg mx-auto w-full py-12">
        <motion.div
          className="animate-in slide-up fade-in duration-1000"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-12 flex flex-col items-center text-center">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mb-6"
            >
              <QuivexLogo variant="wordmark" size={56} />
            </motion.div>
            <motion.div
              className="w-16 h-16 bg-accent-soft rounded-2xl flex items-center justify-center mb-6 border border-accent-border"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
              <BadgeCheck className="w-8 h-8 text-accent" />
            </motion.div>
            <h2 className="text-4xl font-black tracking-tight mb-3 text-text">Account Created</h2>
            <p className="text-muted text-base font-medium leading-relaxed max-w-sm">
              Your secure identity is ready. Share your Quivex ID to start messaging.
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 mb-8 relative overflow-hidden">
            <label className="block text-xs font-bold uppercase tracking-widest text-muted/60 mb-3">
              Your Quivex ID
            </label>
            <div className="flex items-center gap-3">
              <div className="flex-1 text-sm font-mono font-bold text-accent truncate tracking-tighter break-all">
                {qvexId}
              </div>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={handleCopy}
                className="p-2.5 bg-accent-soft hover:bg-accent/15 rounded-lg border border-accent-border hover:border-accent/45 text-accent transition-all shrink-0"
              >
                {hasCopied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              </motion.button>
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={onContinue}
            className="btn-primary"
          >
            <span>Continue to Chat</span>
            <ArrowRight className="w-4 h-4 ml-auto opacity-50" />
          </motion.button>

          <div className="mt-12 flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-widest text-muted/40 select-none">
            <Shield className="w-3 h-3" />
            <span>End-to-End Encrypted</span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AccountCreatedScreen;

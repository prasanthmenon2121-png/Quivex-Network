import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, QrCode } from 'lucide-react';
import { toast } from 'sonner';

interface AddContactSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (qvexId: string, name?: string | null) => void;
}

export function AddContactSheet({ isOpen, onClose, onAdd }: AddContactSheetProps) {
  const [activeTab, setActiveTab] = useState<'manual' | 'qr' | 'nearby'>('manual');
  const [qvexId, setQvexId] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState<'form' | 'confirm' | 'sent'>('form');

  const qvexIdRegex = /^QVX-[A-Z0-9]{20}$/;

  const handleSubmit = () => {
    const trimmed = qvexId.trim().toUpperCase();

    if (!qvexIdRegex.test(trimmed)) {
      setError('Enter a valid QVX ID.');
      return;
    }

    setError('');
    setStep('confirm');
  };

  const handleSendRequest = () => {
    onAdd(qvexId.trim().toUpperCase(), name.trim() || null);
    toast.message('Request prepared. Contact request backend will be connected later.');
    setStep('sent');
  };

  const handleBackdropClick = () => {
    onClose();
    setError('');
    setQvexId('');
    setName('');
    setStep('form');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/50 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleBackdropClick}
          />

          {/* Sheet / Modal */}
          <motion.div
            className="fixed inset-0 z-50 flex items-end md:items-center md:justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="w-full max-w-[520px] bg-surface rounded-t-2xl md:rounded-xl border border-border overflow-hidden safe-area-pb">
              <div className="p-4 flex items-center justify-between border-b border-border">
                <h2 className="text-lg font-semibold text-text">Add contact</h2>
                <button aria-label="Close" onClick={handleBackdropClick} className="w-9 h-9 flex items-center justify-center rounded-lg text-muted hover:text-text">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-4">
                <div className="flex gap-2 mb-4 p-1 bg-surface-2 rounded-xl border border-border">
                  <button
                    onClick={() => setActiveTab('manual')}
                    className={`flex-1 h-10 rounded-lg text-sm font-medium ${activeTab === 'manual' ? 'bg-accent-soft border border-accent-border text-accent' : 'text-muted'}`}
                  >
                    Manual
                  </button>
                  <button
                    onClick={() => setActiveTab('qr')}
                    className={`flex-1 h-10 rounded-lg text-sm font-medium ${activeTab === 'qr' ? 'bg-accent-soft border border-accent-border text-accent' : 'text-muted'}`}
                  >
                    QR Scan
                  </button>
                  <button
                    onClick={() => setActiveTab('nearby')}
                    className={`flex-1 h-10 rounded-lg text-sm font-medium ${activeTab === 'nearby' ? 'bg-accent-soft border border-accent-border text-accent' : 'text-muted'}`}
                  >
                    Nearby
                  </button>
                </div>

                {activeTab === 'manual' && (
                  <div>
                    {step === 'form' && (
                      <>
                        <div className="mb-4">
                          <label className="text-[13px] text-muted font-medium mb-2 block">QVX ID</label>
                          <input
                            type="text"
                            value={qvexId}
                            onChange={(e) => { setQvexId(e.target.value); setError(''); }}
                            placeholder="QVX-3DKY18PEQCQFP9M5T073"
                            className="w-full h-[52px] px-4 bg-surface-2 text-text text-[16px] rounded-xl border border-border outline-none placeholder:text-muted/40 focus:border-accent/50"
                            style={{ minHeight: '48px' }}
                          />
                        </div>

                        <div className="mb-4">
                          <label className="text-[13px] text-muted font-medium mb-2 block">Optional name</label>
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Alex"
                            className="w-full h-[52px] px-4 bg-surface-2 text-text text-[16px] rounded-xl border border-border outline-none placeholder:text-muted/40 focus:border-accent/50"
                            style={{ minHeight: '48px' }}
                          />
                        </div>

                        {error && <p className="text-[13px] text-red-400 mb-4">{error}</p>}

                        <button onClick={handleSubmit} className="w-full h-[52px] flex items-center justify-center bg-accent text-bg-deep text-[15px] font-semibold rounded-xl">Add contact</button>
                      </>
                    )}

                    {step === 'confirm' && (
                      <div className="p-4 bg-surface-2 rounded-xl border border-border">
                        <h3 className="text-lg font-semibold text-text mb-2">Confirm</h3>
                        <p className="text-[13px] text-muted mb-4">QVX ID: {qvexId.trim().toUpperCase()}</p>
                        <button onClick={handleSendRequest} className="w-full h-[52px] flex items-center justify-center bg-accent text-bg-deep text-[15px] font-semibold rounded-xl">Send request</button>
                        <button onClick={() => setStep('form')} className="w-full h-[48px] mt-3 text-muted">Back</button>
                      </div>
                    )}

                    {step === 'sent' && (
                      <div className="p-4 bg-surface-2 rounded-xl border border-border">
                        <h3 className="text-lg font-semibold text-text mb-2">Request prepared</h3>
                        <p className="text-[13px] text-muted mb-4">Contact request backend will be connected later.</p>
                        <button onClick={handleBackdropClick} className="w-full h-[52px] flex items-center justify-center bg-accent text-bg-deep text-[15px] font-semibold rounded-xl">Done</button>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'qr' && (
                  <div className="flex flex-col items-center justify-center py-8">
                    <div className="w-24 h-24 rounded-lg bg-surface-2 border border-border flex items-center justify-center mb-4">
                      <QrCode className="w-10 h-10 text-muted" />
                    </div>
                    <h3 className="text-lg font-semibold text-text mb-2">QR scanner coming next</h3>
                    <p className="text-[14px] text-muted text-center mb-4">Scan a QR code to quickly add a contact</p>
                    <button disabled className="h-[52px] px-6 rounded-xl bg-surface text-muted border border-border cursor-not-allowed opacity-50">Open scanner</button>
                  </div>
                )}

                {activeTab === 'nearby' && (
                  <div className="py-8 text-center">
                    <h3 className="text-lg font-semibold text-text mb-2">Nearby discovery</h3>
                    <p className="text-[14px] text-muted mb-4">Nearby discovery will be added later. Bluetooth/local network discovery planned.</p>
                    <button disabled className="h-[52px] px-6 rounded-xl bg-surface text-muted border border-border cursor-not-allowed opacity-50">Discover nearby</button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

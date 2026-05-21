import { useState } from 'react';
import { ArrowLeft, QrCode } from 'lucide-react';
import { toast } from 'sonner';
import { useContacts } from '../hooks/useContacts';

interface NewConversationScreenProps {
  onClose?: () => void;
}

export function NewConversationScreen({ onClose }: NewConversationScreenProps) {
  const { addContactByQvxId } = useContacts();
  const [activeTab, setActiveTab] = useState<'qvx' | 'qr'>('qvx');
  const [qvexId, setQvexId] = useState('');
  const [error, setError] = useState('');
  const [step, setStep] = useState<'form' | 'confirm' | 'sent'>('form');

  const qvexIdRegex = /^QVX-[A-Z0-9]{20}$/;

  const handleContinue = () => {
    const trimmed = qvexId.trim().toUpperCase();

    if (!qvexIdRegex.test(trimmed)) {
      setError('Enter a valid QVX ID.');
      return;
    }

    setError('');
    setStep('confirm');
  };

  const handleSendRequest = () => {
    addContactByQvxId(qvexId.trim().toUpperCase());
    toast.message('Request prepared. Contact request backend will be connected later.');
    setStep('sent');
  };

  return (
    <div className="flex flex-col h-full bg-bg">
      {/* Header */}
      <header className="h-14 px-4 flex items-center border-b border-border bg-surface shrink-0">
        {onClose && (
          <button
            onClick={onClose}
            className="w-10 h-10 flex items-center justify-center text-muted hover:text-text transition-colors rounded-lg -ml-2"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        <h1 className="text-[20px] font-semibold text-text" style={{ fontFamily: 'Sora, system-ui' }}>
          New conversation
        </h1>
      </header>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-[460px] mx-auto p-6 safe-area-pb">
          {/* Subtitle */}
          <p className="text-[15px] text-muted mb-6 leading-relaxed">
            Enter a QVX ID or scan a QR code to start securely.
          </p>

          {/* Tabs */}
          <div className="flex gap-2 mb-6 p-1 bg-surface-2 rounded-xl border border-border">
            <button
              onClick={() => setActiveTab('qvx')}
              className={`flex-1 h-10 rounded-lg text-sm font-medium transition-all duration-150 ${activeTab === 'qvx'
                  ? 'bg-accent-soft border border-accent-border text-accent'
                  : 'text-muted hover:text-text'
                }`}
            >
              QVX ID
            </button>
            <button
              onClick={() => setActiveTab('qr')}
              className={`flex-1 h-10 rounded-lg text-sm font-medium transition-all duration-150 ${activeTab === 'qr'
                  ? 'bg-accent-soft border border-accent-border text-accent'
                  : 'text-muted hover:text-text'
                }`}
            >
              QR Scan
            </button>
          </div>

          {/* QVX ID Tab */}
          {activeTab === 'qvx' && (
            <div>
              {step === 'form' && (
                <>
                  <div className="mb-4">
                    <label className="text-[13px] text-muted font-medium mb-2 block">
                      Quivex ID
                    </label>
                    <input
                      type="text"
                      value={qvexId}
                      onChange={(e) => {
                        setQvexId(e.target.value);
                        setError('');
                      }}
                      placeholder="QVX-AB3F7K9QR2XM4VPWZ1T"
                      className="w-full h-[52px] px-4 bg-surface-2 text-text text-[16px] rounded-xl border border-border outline-none transition-colors placeholder:text-muted/40 focus:border-accent/50"
                      style={{ minHeight: '48px' }}
                    />
                    {error && (
                      <p className="text-[13px] text-red-400 mt-2">
                        {error}
                      </p>
                    )}
                  </div>

                  <p className="text-[13px] text-muted/60 mb-6">
                    Ask the other person to share their QVX ID.
                  </p>

                  <button
                    onClick={handleContinue}
                    className="w-full h-[52px] flex items-center justify-center bg-accent text-bg-deep text-[15px] font-semibold rounded-xl transition-colors hover:bg-accent-dark active:scale-[0.99]"
                    style={{ minHeight: '48px' }}
                  >
                    Continue
                  </button>
                </>
              )}
              {step === 'confirm' && (
                <div className="p-6 bg-surface rounded-xl border border-border">
                  <h2 className="text-lg font-semibold text-text mb-2">
                    Found identity
                  </h2>
                  <p className="text-[13px] text-muted mb-6">
                    QVX ID: {qvexId.trim().toUpperCase()}
                  </p>
                  <button
                    onClick={handleSendRequest}
                    className="w-full h-[52px] flex items-center justify-center bg-accent text-bg-deep text-[15px] font-semibold rounded-xl transition-colors hover:bg-accent-dark active:scale-[0.99]"
                    style={{ minHeight: '48px' }}
                  >
                    Send message request
                  </button>
                  <button
                    onClick={() => setStep('form')}
                    className="w-full h-[48px] flex items-center justify-center text-muted text-[15px] font-medium rounded-xl transition-colors hover:text-text mt-3"
                  >
                    Back
                  </button>
                </div>
              )}
              {step === 'sent' && (
                <div className="p-6 bg-surface rounded-xl border border-border">
                  <h2 className="text-lg font-semibold text-text mb-2">Request prepared</h2>
                  <p className="text-[13px] text-muted mb-6">
                    Contact request backend will be connected later.
                  </p>
                  <button
                    onClick={() => {
                      setStep('form');
                      setQvexId('');
                      onClose?.();
                    }}
                    className="w-full h-[52px] flex items-center justify-center bg-accent text-bg-deep text-[15px] font-semibold rounded-xl transition-colors hover:bg-accent-dark active:scale-[0.99]"
                    style={{ minHeight: '48px' }}
                  >
                    Done
                  </button>
                </div>
              )}
            </div>
          )}

          {/* QR Tab */}
          {activeTab === 'qr' && (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="w-24 h-24 rounded-full bg-surface border border-border flex items-center justify-center mb-6">
                <QrCode className="w-12 h-12 text-muted" />
              </div>
              <h3 className="text-lg font-semibold text-text mb-2">
                QR scanner coming next
              </h3>
              <p className="text-[14px] text-muted text-center mb-6 max-w-[280px]">
                Scan a QR code to quickly add a contact
              </p>
              <button
                disabled
                className="h-[52px] px-8 flex items-center justify-center bg-surface text-muted text-[15px] font-medium rounded-xl border border-border transition-colors cursor-not-allowed opacity-50"
                style={{ minHeight: '48px' }}
              >
                Open camera scanner
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

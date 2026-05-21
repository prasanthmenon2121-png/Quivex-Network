import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Share2, Phone, Video, MessageCircle } from 'lucide-react';
import { toast } from 'sonner';
import type { Contact } from '../../hooks/useContacts';
import { useNavigate } from 'react-router-dom';

interface ContactDetailsSheetProps {
    isOpen: boolean;
    onClose: () => void;
    contact: Contact | null;
}

export function ContactDetailsSheet({ isOpen, onClose, contact }: ContactDetailsSheetProps) {
    const [copied, setCopied] = useState(false);
    const [qrOpen, setQrOpen] = useState(false);
    const navigate = useNavigate();

    const handleCopy = async () => {
        if (!contact) return;
        try {
            await navigator.clipboard.writeText(contact.qvexId);
            setCopied(true);
            toast.message('Copied QVX ID');
            setTimeout(() => setCopied(false), 1500);
        } catch (e) {
            toast.error('Unable to copy to clipboard');
        }
    };

    const handleShare = async () => {
        if (!contact) return;
        const shareData = {
            title: contact.displayName || 'Quivex contact',
            text: `Add contact ${contact.displayName || contact.qvexId} - ${contact.qvexId}`,
        };

        if ((navigator as any).share) {
            try {
                await (navigator as any).share(shareData);
            } catch (e) {
                toast.message('Share cancelled');
            }
        } else {
            toast.message('Share not supported on this platform');
        }
    };

    const handleSendMessage = () => {
        onClose();
        // Navigate to new conversation screen if it exists
        navigate('/new-conversation');
        toast.message('Open new conversation (prepare request)');
    };

    const handleVoice = () => {
        toast.message('Voice calling will be added later');
    };

    const handleVideo = () => {
        toast.message('Video calling will be added later');
    };

    const handleBlock = () => {
        const ok = confirm('Block contact? This will be reversible from settings later.');
        if (ok) toast.message('Block request prepared (backend integration pending)');
    };

    const handleDelete = () => {
        const ok = confirm('Delete contact? This will remove local linkage only when supported.');
        if (ok) toast.message('Delete prepared (backend integration pending)');
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        className="fixed inset-0 bg-black/40 z-50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    <motion.div
                        className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 md:inset-auto md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[460px] md:w-full"
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 50, opacity: 0 }}
                        transition={{ type: 'spring', damping: 22, stiffness: 300 }}
                    >
                        <div className="relative bg-surface rounded-xl border border-border p-6 safe-area-pb max-h-[90vh] overflow-auto">
                            <button
                                onClick={onClose}
                                aria-label="Close"
                                className="absolute top-3 right-3 w-9 h-9 flex items-center justify-center rounded-lg text-muted hover:text-text"
                            >
                                <X className="w-4 h-4" />
                            </button>

                            <div className="flex flex-col items-center">
                                <div className="w-24 h-24 rounded-full bg-surface-2 border border-border flex items-center justify-center text-2xl font-semibold text-text mb-4">
                                    {contact ? (contact.displayName || contact.qvexId).charAt(0).toUpperCase() : 'Q'}
                                </div>
                                <h2 className="text-[18px] font-semibold text-text">{contact?.displayName || 'Unknown'}</h2>
                                <p className="text-[13px] text-muted mt-1 mb-4 break-all">{contact?.qvexId || '—'}</p>

                                <div className="flex gap-2 mb-4">
                                    <button onClick={handleCopy} className="h-10 px-3 rounded-lg bg-surface-2 border border-border text-sm text-text flex items-center gap-2">
                                        <Copy className="w-4 h-4" />
                                        {copied ? 'Copied' : 'Copy ID'}
                                    </button>
                                    <button onClick={() => setQrOpen(true)} className="h-10 px-3 rounded-lg bg-surface-2 border border-border text-sm text-text flex items-center gap-2">
                                        <Share2 className="w-4 h-4" />
                                        QR code
                                    </button>
                                    <button onClick={handleShare} className="h-10 px-3 rounded-lg bg-surface-2 border border-border text-sm text-text flex items-center gap-2">
                                        <Share2 className="w-4 h-4" />
                                        Share
                                    </button>
                                </div>

                                <div className="w-full grid grid-cols-2 gap-3 mb-4">
                                    <button onClick={handleSendMessage} className="col-span-2 h-12 rounded-xl bg-accent text-bg-deep font-semibold">
                                        <MessageCircle className="inline w-4 h-4 mr-2" /> Send message
                                    </button>
                                    <button onClick={handleVoice} className="h-12 rounded-xl bg-surface-2 border border-border text-text flex items-center justify-center gap-2">
                                        <Phone className="w-4 h-4" /> Voice
                                    </button>
                                    <button onClick={handleVideo} className="h-12 rounded-xl bg-surface-2 border border-border text-text flex items-center justify-center gap-2">
                                        <Video className="w-4 h-4" /> Video
                                    </button>
                                </div>

                                <div className="w-full divide-y divide-border mt-2">
                                    <div className="py-3 flex items-center justify-between">
                                        <div>
                                            <div className="text-sm text-text">Nickname</div>
                                            <div className="text-[13px] text-muted">Set a private nickname</div>
                                        </div>
                                        <button className="text-muted hover:text-text">Edit</button>
                                    </div>
                                    <div className="py-3 flex items-center justify-between">
                                        <div>
                                            <div className="text-sm text-text">Custom notifications</div>
                                            <div className="text-[13px] text-muted">Sound and vibration</div>
                                        </div>
                                        <button className="text-muted hover:text-text">Manage</button>
                                    </div>
                                    <div className="py-3 flex items-center justify-between">
                                        <div>
                                            <div className="text-sm text-danger">Block contact</div>
                                            <div className="text-[13px] text-muted">Prevents messages</div>
                                        </div>
                                        <button onClick={handleBlock} className="text-danger">Block</button>
                                    </div>
                                    <div className="py-3 flex items-center justify-between">
                                        <div>
                                            <div className="text-sm text-danger">Delete contact</div>
                                            <div className="text-[13px] text-muted">Remove local link when supported</div>
                                        </div>
                                        <button onClick={handleDelete} className="text-danger">Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* QR placeholder modal */}
                    <AnimatePresence>
                        {qrOpen && (
                            <>
                                <motion.div className="fixed inset-0 bg-black/40 z-60" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setQrOpen(false)} />
                                <motion.div className="fixed inset-0 flex items-center justify-center z-70 p-6">
                                    <div className="bg-surface rounded-xl border border-border p-6 max-w-sm w-full text-center">
                                        <h3 className="text-lg font-semibold text-text mb-2">QR code</h3>
                                        <p className="text-[14px] text-muted mb-4">QR code generation will be connected next.</p>
                                        <button onClick={() => setQrOpen(false)} className="h-10 px-4 rounded-lg bg-accent text-bg-deep">Close</button>
                                    </div>
                                </motion.div>
                            </>
                        )}
                    </AnimatePresence>
                </>
            )}
        </AnimatePresence>
    );
}

export default ContactDetailsSheet;

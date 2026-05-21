import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { toast } from 'sonner';

interface CreateCommunitySheetProps {
    isOpen: boolean;
    onClose: () => void;
    onCreate?: (payload: { name: string; description?: string | null; isPublic: boolean; approvalRequired: boolean }) => void;
}

export function CreateCommunitySheet({ isOpen, onClose, onCreate }: CreateCommunitySheetProps) {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [isPublic, setIsPublic] = useState(true);
    const [approvalRequired, setApprovalRequired] = useState(false);

    const handleCreate = () => {
        if (!name.trim()) {
            toast.error('Enter a community name');
            return;
        }

        onCreate?.({ name: name.trim(), description: description.trim() || null, isPublic, approvalRequired });
        toast.message('Community creation prepared. Backend integration will be connected next.');
        setName('');
        setDescription('');
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div className="fixed inset-0 bg-black/40 z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
                    <motion.div className="fixed inset-0 z-50 flex items-end md:items-center md:justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <div className="w-full max-w-[520px] bg-surface rounded-t-2xl md:rounded-xl border border-border overflow-hidden safe-area-pb">
                            <div className="p-4 flex items-center justify-between border-b border-border">
                                <h2 className="text-lg font-semibold text-text">Create community</h2>
                                <button aria-label="Close" onClick={onClose} className="w-9 h-9 flex items-center justify-center rounded-lg text-muted hover:text-text">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="p-4 space-y-4">
                                <div>
                                    <label className="text-[13px] text-muted block mb-2">Community name</label>
                                    <input value={name} onChange={(e) => setName(e.target.value)} className="w-full h-12 px-4 rounded-xl bg-surface-2 border border-border text-text" placeholder="My community" />
                                </div>

                                <div>
                                    <label className="text-[13px] text-muted block mb-2">Description (optional)</label>
                                    <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full min-h-[88px] p-3 rounded-xl bg-surface-2 border border-border text-text" placeholder="What is this community about?" />
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-sm text-text">Privacy</div>
                                        <div className="text-[13px] text-muted">Public or Private</div>
                                    </div>
                                    <div>
                                        <label className="inline-flex items-center gap-2">
                                            <input type="radio" checked={isPublic} onChange={() => setIsPublic(true)} />
                                            <span className="text-sm">Public</span>
                                        </label>
                                        <label className="inline-flex items-center gap-2 ml-3">
                                            <input type="radio" checked={!isPublic} onChange={() => setIsPublic(false)} />
                                            <span className="text-sm">Private</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="text-sm text-text">Approval required</div>
                                        <div className="text-[13px] text-muted">Require moderator approval for joins</div>
                                    </div>
                                    <label className="inline-flex items-center gap-2">
                                        <input type="checkbox" checked={approvalRequired} onChange={(e) => setApprovalRequired(e.target.checked)} />
                                    </label>
                                </div>

                                <div className="flex gap-3">
                                    <button onClick={onClose} className="flex-1 h-12 rounded-xl bg-surface-2 border border-border text-muted">Cancel</button>
                                    <button onClick={handleCreate} className="flex-1 h-12 rounded-xl bg-accent text-bg-deep font-semibold">Create</button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}

export default CreateCommunitySheet;

import { useCallback } from 'react';
import { useIdentityStore } from '../../stores/identityStore';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export function ProfileSettingsCard() {
    const { displayName, qvexId } = useIdentityStore();
    const navigate = useNavigate();

    const name = displayName || 'User';
    const id = qvexId || 'QVX ID not ready';

    const onClick = useCallback(() => {
        navigate('/settings/account');
    }, [navigate]);

    return (
        <button
            onClick={onClick}
            className="w-full flex items-center justify-between gap-3 px-4 py-3 bg-surface rounded-xl border border-border hover:bg-surface-2 transition-colors"
        >
            <div className="flex items-center gap-3 min-w-0">
                <div className="w-12 h-12 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-accent text-sm font-semibold">
                    {name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0 text-left">
                    <p className="text-sm font-medium text-text truncate">{name}</p>
                    <p className="text-[12px] text-muted font-mono truncate">{id.slice(0, 18)}...</p>
                </div>
            </div>
            <ChevronRight className="w-4 h-4 text-muted" />
        </button>
    );
}

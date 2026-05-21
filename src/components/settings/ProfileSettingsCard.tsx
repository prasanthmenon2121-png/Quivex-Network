import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useIdentityStore } from '../../stores/identityStore';

interface ProfileSettingsCardProps {
    onClick?: () => void;
}

export default function ProfileSettingsCard({ onClick }: ProfileSettingsCardProps) {
    const navigate = useNavigate();
    const { displayName, qvexId } = useIdentityStore();

    const name = displayName || 'User';
    const id = qvexId || 'QVX ID not ready';

    const initial = useMemo(() => (name ? name.charAt(0).toUpperCase() : 'U'), [name]);

    return (
        <button
            onClick={() => {
                if (onClick) onClick();
                else navigate('/settings/account');
            }}
            className="w-full flex items-center gap-4 p-3 bg-surface rounded-xl border border-border hover:bg-surface-2 transition-colors text-left"
        >
            <div className="w-12 h-12 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center text-accent font-semibold text-lg">
                {initial}
            </div>
            <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                    <p className="text-sm font-semibold text-text truncate">{name}</p>
                </div>
                <p className="text-[12px] text-muted font-mono truncate">{id.slice(0, 18)}...</p>
            </div>
            <div className="text-muted">
                {/* Right chevron rendered in parent via SettingsRow where applicable */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-60">
                    <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </div>
        </button>
    );
}

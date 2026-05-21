import { ChevronRight } from 'lucide-react';
import type { Community } from '../../hooks/useCommunities';

interface CommunityCardProps {
    community: Community;
    onOpen?: (id: string) => void;
    onJoin?: (id: string) => void;
    showJoin?: boolean;
}

export function CommunityCard({ community, onOpen, onJoin, showJoin = false }: CommunityCardProps) {
    return (
        <div className="w-full flex items-center justify-between gap-4 p-4 rounded-xl bg-surface border border-border hover:bg-surface-2 transition-colors">
            <div className="flex items-center gap-3 min-w-0" onClick={() => onOpen?.(community.id)}>
                <div className="w-12 h-12 rounded-md bg-surface-2 border border-border flex items-center justify-center text-sm font-semibold text-text">
                    {community.name.charAt(0).toUpperCase()}
                </div>
                <div className="min-w-0">
                    <p className="text-[15px] font-semibold text-text truncate">{community.name}</p>
                    <p className="text-[13px] text-muted truncate">{community.description || ''}</p>
                </div>
            </div>

            <div className="flex items-center gap-3">
                <div className="text-[13px] text-muted">{community.memberCount ?? 0} members</div>
                {showJoin ? (
                    <button onClick={() => onJoin?.(community.id)} className="h-10 px-3 rounded-lg bg-accent text-bg-deep text-sm font-semibold">Join</button>
                ) : (
                    <ChevronRight className="w-4 h-4 text-muted" />
                )}
            </div>
        </div>
    );
}

export default CommunityCard;

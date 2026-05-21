import { ChevronRight } from 'lucide-react';

interface ContactRowProps {
  id: string;
  displayName: string | null;
  qvexId: string;
  isOnline?: boolean;
  onOpen?: (id: string) => void;
}

const truncateQvxId = (qvexId: string) => {
  if (qvexId.length <= 12) return qvexId;
  return `${qvexId.slice(0, 8)}…${qvexId.slice(-4)}`;
};

export function ContactRow({ id, displayName, qvexId, isOnline = false, onOpen }: ContactRowProps) {
  const label = displayName || qvexId;
  const initial = label.charAt(0).toUpperCase();

  return (
    <button
      onClick={() => onOpen?.(id)}
      className="w-full flex items-center justify-between gap-4 px-4 py-3 text-left rounded-xl hover:bg-surface-2 transition-colors"
    >
      <div className="flex items-center gap-3 min-w-0">
        <div className="relative">
          <div className="w-12 h-12 rounded-full bg-surface-2 border border-border flex items-center justify-center text-sm font-semibold text-text">
            {initial}
          </div>
          {isOnline && (
            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-accent border-2 border-bg" />
          )}
        </div>
        <div className="min-w-0">
          <p className="text-[15px] font-semibold text-text truncate">{label}</p>
          <p className="text-[12px] text-muted truncate">{truncateQvxId(qvexId)}</p>
        </div>
      </div>
      <ChevronRight className="w-4 h-4 text-muted" />
    </button>
  );
}

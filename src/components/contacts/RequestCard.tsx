interface RequestCardProps {
  id: string;
  displayName: string | null;
  qvexId: string;
  direction: 'incoming' | 'outgoing';
  onAccept?: (id: string) => void;
  onDelete?: (id: string) => void;
  onBlock?: (id: string) => void;
  onCancel?: (id: string) => void;
}

const truncateQvxId = (qvexId: string) => {
  if (qvexId.length <= 12) return qvexId;
  return `${qvexId.slice(0, 8)}…${qvexId.slice(-4)}`;
};

export function RequestCard({
  id,
  displayName,
  qvexId,
  direction,
  onAccept,
  onDelete,
  onBlock,
  onCancel,
}: RequestCardProps) {
  const label = displayName || qvexId;

  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[15px] font-semibold text-text">{label}</p>
          <p className="text-[12px] text-muted">{truncateQvxId(qvexId)}</p>
          <p className="text-[12px] text-muted mt-2">
            {direction === 'incoming' ? 'Wants to connect with you' : 'Pending'}
          </p>
        </div>
        <div className="text-[11px] text-muted">{direction === 'incoming' ? 'Incoming' : 'Outgoing'}</div>
      </div>
      {direction === 'incoming' ? (
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            onClick={() => onAccept?.(id)}
            className="h-9 px-3 rounded-lg bg-accent text-bg-deep text-[13px] font-semibold transition-colors hover:bg-accent-dark"
          >
            Accept
          </button>
          <button
            onClick={() => onDelete?.(id)}
            className="h-9 px-3 rounded-lg bg-surface-2 border border-border text-[13px] text-text font-medium"
          >
            Delete
          </button>
          <button
            onClick={() => onBlock?.(id)}
            className="h-9 px-3 rounded-lg bg-surface-2 border border-border text-[13px] text-text font-medium"
          >
            Block
          </button>
        </div>
      ) : (
        <div className="mt-4">
          <button
            onClick={() => onCancel?.(id)}
            className="h-9 px-3 rounded-lg bg-surface-2 border border-border text-[13px] text-text font-medium"
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
}

interface ConversationRowProps {
  id: string;
  title: string;
  lastMessage: string | null;
  lastMessageAt: string | null;
  unreadCount: number;
  isOnline: boolean;
  isMuted: boolean;
  onOpen?: (id: string) => void;
}

const formatTimestamp = (timestamp: string | null) => {
  if (!timestamp) return '';
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  if (diffHours < 1) return 'now';
  if (diffHours < 24) return `${diffHours}h`;
  const diffDays = Math.floor(diffHours / 24);
  if (diffDays === 1) return 'yesterday';
  if (diffDays < 7) return `${diffDays}d`;
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

export function ConversationRow({
  id,
  title,
  lastMessage,
  lastMessageAt,
  unreadCount,
  isOnline,
  isMuted,
  onOpen,
}: ConversationRowProps) {
  const initial = title.charAt(0).toUpperCase();

  return (
    <button
      onClick={() => onOpen?.(id)}
      className="w-full flex items-center gap-4 px-4 md:px-6 py-3 text-left transition-colors md:hover:bg-surface-2 active:bg-surface-2"
    >
      {/* Avatar */}
      <div className="relative shrink-0">
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent/20 to-accent/10 border border-accent/30 flex items-center justify-center text-sm font-semibold text-accent">
          {initial}
        </div>
        {isOnline && (
          <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-accent border-2 border-bg shrink-0" />
        )}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 mb-1">
          <p
            className={`text-[15px] truncate ${unreadCount > 0 ? 'text-text font-semibold' : 'text-text font-medium'
              }`}
          >
            {title}
          </p>
          {isMuted && <span className="text-[10px] text-muted/60 font-medium shrink-0">Muted</span>}
        </div>
        <p className="text-[13px] text-muted/80 truncate">
          {lastMessage ?? 'No messages yet'}
        </p>
      </div>

      {/* Right Section */}
      <div className="flex flex-col items-end gap-1.5 shrink-0">
        <span className="text-[12px] text-muted/60">{formatTimestamp(lastMessageAt)}</span>
        {unreadCount > 0 && (
          <span className="min-w-[22px] h-5 px-1.5 rounded-full bg-accent text-bg-deep text-[11px] font-bold flex items-center justify-center">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </div>
    </button>
  );
}

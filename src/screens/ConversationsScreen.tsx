import { useMemo, useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useConversations } from '../hooks/useConversations';
import { ConversationRow } from '../components/chat/ConversationRow';

export function ConversationsScreen() {
  const navigate = useNavigate();
  const { conversations, loading, error, refresh } = useConversations();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return conversations;
    return conversations.filter((conversation) =>
      [conversation.title, conversation.lastMessage]
        .filter(Boolean)
        .some((field) => field?.toLowerCase().includes(query)),
    );
  }, [conversations, searchQuery]);

  return (
    <div className="flex flex-col h-full bg-bg-deep">
      {/* Mobile Header */}
      <div className="flex md:hidden flex-col px-4 pt-4 pb-3">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-[22px] font-semibold text-text" style={{ fontFamily: 'Sora, system-ui' }}>
            Conversations
          </h1>
          <button
            onClick={() => navigate('/new-conversation')}
            className="h-11 w-11 inline-flex items-center justify-center rounded-xl bg-accent text-bg-deep transition-colors active:scale-95"
            aria-label="New conversation"
          >
            <Plus className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar - Mobile */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search conversations"
            className="w-full h-12 pl-10 pr-4 rounded-xl bg-surface border border-border text-sm text-text outline-none placeholder:text-muted/60 focus:border-accent/50 transition-colors"
          />
        </div>
      </div>

      {/* Desktop/Tablet Search Bar */}
      <div className="hidden md:block px-6 py-4 border-b border-border bg-surface">
        <div className="relative max-w-[900px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search conversations"
            className="w-full h-12 pl-10 pr-4 rounded-xl bg-bg border border-border text-sm text-text outline-none placeholder:text-muted/60 focus:border-accent/50 transition-colors"
          />
        </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-auto">
        {loading && (
          <div className="space-y-px px-4 md:px-6 py-4">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={`skeleton-${index}`}
                className="h-16 rounded-lg bg-surface border border-border/50 animate-pulse"
              />
            ))}
          </div>
        )}

        {!loading && error && (
          <div className="flex flex-col items-center justify-center h-full py-12">
            <p className="text-[14px] text-muted mb-4">Could not load conversations.</p>
            <button
              onClick={() => refresh()}
              className="h-10 px-6 rounded-xl bg-surface-2 border border-border text-sm text-text font-medium hover:bg-surface-3 transition-colors"
            >
              Retry
            </button>
          </div>
        )}

        {!loading && !error && filteredConversations.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full py-12 px-6">
            <div className="w-16 h-16 rounded-full bg-surface/50 border border-border flex items-center justify-center mb-6">
              <Search className="w-8 h-8 text-muted/40" />
            </div>
            <h2 className="text-[18px] font-semibold text-text mb-2">No conversations yet</h2>
            <p className="text-[14px] text-muted mb-6 text-center max-w-sm">
              Start a private conversation with a QVX ID.
            </p>
            <button
              onClick={() => navigate('/new-conversation')}
              className="h-11 px-6 rounded-xl bg-accent text-bg-deep text-[14px] font-semibold hover:bg-accent-dark transition-colors active:scale-95"
            >
              Start a conversation
            </button>
          </div>
        )}

        {!loading && !error && filteredConversations.length > 0 && (
          <div className="divide-y divide-border">
            {filteredConversations.map((conversation) => (
              <ConversationRow
                key={conversation.id}
                id={conversation.id}
                title={conversation.title}
                lastMessage={conversation.lastMessage}
                lastMessageAt={conversation.lastMessageAt}
                unreadCount={conversation.unreadCount}
                isOnline={conversation.isOnline}
                isMuted={conversation.isMuted}
                onOpen={() => navigate(`/chat/${conversation.id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

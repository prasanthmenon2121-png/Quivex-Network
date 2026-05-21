export interface ConversationSummary {
  id: string;
  title: string;
  lastMessage: string | null;
  lastMessageAt: string | null;
  unreadCount: number;
  isOnline: boolean;
  isMuted: boolean;
}

export interface UseConversationsResult {
  conversations: ConversationSummary[];
  loading: boolean;
  error: string | null;
  unreadTotal: number;
  refresh: () => Promise<void>;
}

export function useConversations(): UseConversationsResult {
  const conversations: ConversationSummary[] = [];

  const refresh = async () => {
    return undefined;
  };

  return {
    conversations,
    loading: false,
    error: null,
    unreadTotal: 0,
    refresh,
  };
}

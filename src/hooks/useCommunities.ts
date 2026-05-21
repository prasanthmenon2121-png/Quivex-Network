export interface Community {
    id: string;
    name: string;
    description?: string | null;
    memberCount?: number;
    isPublic?: boolean;
    unreadCount?: number;
}

export interface UseCommunitiesResult {
    joined: Community[];
    discover: Community[];
    loading: boolean;
    error: string | null;
    createCommunity: (payload: { name: string; description?: string | null; isPublic: boolean; approvalRequired: boolean }) => void;
    joinCommunity: (id: string) => void;
    leaveCommunity: (id: string) => void;
}

export function useCommunities(): UseCommunitiesResult {
    // Placeholder hook: return empty lists until backend is wired.
    return {
        joined: [],
        discover: [],
        loading: false,
        error: null,
        createCommunity: () => {
            // safe placeholder: no-op or show toast from UI caller
        },
        joinCommunity: () => {
            // no-op
        },
        leaveCommunity: () => {
            // no-op
        },
    };
}

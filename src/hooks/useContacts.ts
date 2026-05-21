import { useContactsStore } from '../store/contacts';

export interface Contact {
  id: string;
  displayName: string | null;
  qvexId: string;
}

export interface ContactRequest {
  id: string;
  displayName: string | null;
  qvexId: string;
  direction: 'incoming' | 'outgoing';
}

export interface BlockedUser {
  id: string;
  displayName: string | null;
  qvexId: string;
}

export interface UseContactsResult {
  contacts: Contact[];
  incomingRequests: ContactRequest[];
  outgoingRequests: ContactRequest[];
  blockedUsers: BlockedUser[];
  loading: boolean;
  error: string | null;
  addContactByQvxId: (qvexId: string) => void;
  acceptRequest: (id: string) => void;
  deleteRequest: (id: string) => void;
  blockUser: (id: string) => void;
  unblockUser: (id: string) => void;
}

export function useContacts(): UseContactsResult {
  const {
    contacts,
    incomingRequests,
    outgoingRequests,
    blockedUsers,
    addContactByQvxId,
    acceptRequest,
    deleteRequest,
    blockUser,
    unblockUser,
  } = useContactsStore();

  return {
    contacts,
    incomingRequests,
    outgoingRequests,
    blockedUsers,
    loading: false,
    error: null,
    addContactByQvxId,
    acceptRequest,
    deleteRequest,
    blockUser,
    unblockUser,
  };
}

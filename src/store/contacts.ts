import { create } from 'zustand';

export interface ContactRecord {
  id: string;
  displayName: string | null;
  qvexId: string;
}

export interface ContactRequestRecord {
  id: string;
  displayName: string | null;
  qvexId: string;
  direction: 'incoming' | 'outgoing';
}

export interface BlockedUserRecord {
  id: string;
  displayName: string | null;
  qvexId: string;
}

interface ContactsState {
  contacts: ContactRecord[];
  incomingRequests: ContactRequestRecord[];
  outgoingRequests: ContactRequestRecord[];
  blockedUsers: BlockedUserRecord[];
  addContactByQvxId: (qvexId: string) => void;
  acceptRequest: (id: string) => void;
  deleteRequest: (id: string) => void;
  blockUser: (id: string) => void;
  unblockUser: (id: string) => void;
}

const createRequestId = (qvexId: string) => `request-${qvexId.toLowerCase()}`;

export const useContactsStore = create<ContactsState>((set) => ({
  contacts: [],
  incomingRequests: [],
  outgoingRequests: [],
  blockedUsers: [],

  addContactByQvxId: (qvexId) => set((state) => {
    const normalizedId = qvexId.trim().toUpperCase();
    const exists =
      state.contacts.some((contact) => contact.qvexId === normalizedId) ||
      state.outgoingRequests.some((request) => request.qvexId === normalizedId) ||
      state.incomingRequests.some((request) => request.qvexId === normalizedId);

    if (exists) return state;

    return {
      outgoingRequests: [
        {
          id: createRequestId(normalizedId),
          displayName: null,
          qvexId: normalizedId,
          direction: 'outgoing',
        },
        ...state.outgoingRequests,
      ],
    };
  }),

  acceptRequest: (id) => set((state) => {
    const request = state.incomingRequests.find((item) => item.id === id);
    if (!request) return state;

    return {
      incomingRequests: state.incomingRequests.filter((item) => item.id !== id),
      contacts: [
        {
          id: `contact-${request.qvexId.toLowerCase()}`,
          displayName: request.displayName,
          qvexId: request.qvexId,
        },
        ...state.contacts,
      ],
    };
  }),

  deleteRequest: (id) => set((state) => ({
    incomingRequests: state.incomingRequests.filter((request) => request.id !== id),
    outgoingRequests: state.outgoingRequests.filter((request) => request.id !== id),
  })),

  blockUser: (id) => set((state) => {
    const request = state.incomingRequests.find((item) => item.id === id);
    if (!request) return state;

    return {
      incomingRequests: state.incomingRequests.filter((item) => item.id !== id),
      blockedUsers: [
        {
          id: `blocked-${request.qvexId.toLowerCase()}`,
          displayName: request.displayName,
          qvexId: request.qvexId,
        },
        ...state.blockedUsers,
      ],
    };
  }),

  unblockUser: (id) => set((state) => ({
    blockedUsers: state.blockedUsers.filter((user) => user.id !== id),
  })),
}));

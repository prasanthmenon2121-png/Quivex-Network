import { create } from 'zustand';
import type { OnboardingState, UserIdentity } from '../types/identity';

interface IdentityStore extends OnboardingState {
  setIdentity: (identity: Partial<UserIdentity>) => void;
  setRecoveryPhrase: (phrase: string | null) => void;
  confirmOnboarding: () => void;
  reset: () => void;
}

const initialState: OnboardingState = {
  userId: '',
  qvexId: '',
  displayName: null,
  publicKey: null,
  isOnboarded: false,
  recoveryPhrase: null,
};

export const useIdentityStore = create<IdentityStore>((set) => ({
  ...initialState,

  setIdentity: (identity) => set((state) => ({ ...state, ...identity })),
  
  setRecoveryPhrase: (phrase) => set({ recoveryPhrase: phrase }),
  
  confirmOnboarding: () => set((state) => ({ 
    ...state, 
    isOnboarded: true, 
    recoveryPhrase: null // Clear recovery phrase after confirmation
  })),

  reset: () => set(initialState),
}));

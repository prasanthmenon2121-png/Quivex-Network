export interface UserIdentity {
  userId: string;
  qvexId: string;
  displayName: string | null;
  publicKey: string | null;
  isOnboarded: boolean;
}

export interface OnboardingState extends UserIdentity {
  recoveryPhrase: string | null; // Temporary only
}

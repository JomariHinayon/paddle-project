export interface FirebaseUser {
  localId: string;
  email: string;
  emailVerified: boolean;
  displayName?: string;
  photoUrl?: string;
  passwordHash?: string;
  providerUserInfo: Array<{
    providerId: string;
    displayName?: string;
    photoUrl?: string;
    email: string;
  }>;
  validSince: string;
  lastLoginAt: string;
  createdAt: string;
}

"use client";

import { createContext, useContext, ReactNode } from 'react';
import { 
  auth, 
  firestore, 
  storage, 
  functions, 
  analytics, 
  getCurrentUserToken 
} from '@/lib/firebase';

interface FirebaseContextType {
  auth: typeof auth;
  firestore: typeof firestore;
  storage: typeof storage;
  functions: typeof functions;
  analytics: typeof analytics;
  getCurrentUserToken: typeof getCurrentUserToken;
}

const FirebaseContext = createContext<FirebaseContextType | null>(null);

export function FirebaseProvider({ children }: { children: ReactNode }) {
  const value = {
    auth,
    firestore,
    storage,
    functions,
    analytics,
    getCurrentUserToken,
  };

  return (
    <FirebaseContext.Provider value={value}>
      {children}
    </FirebaseContext.Provider>
  );
}

export function useFirebase() {
  const context = useContext(FirebaseContext);
  if (!context) {
    throw new Error('useFirebase must be used within a FirebaseProvider');
  }
  return context;
}

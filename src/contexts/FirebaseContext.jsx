import React from 'react';
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



const FirebaseContext = createContext(null);

export function FirebaseProvider({ children }: { children= {
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

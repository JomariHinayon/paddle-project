'use client';

import dynamic from 'next/dynamic';

// Dynamic import of FirebaseInitializer with ssr: false
const FirebaseInitializer = dynamic(
  () => import('./FirebaseInitializer'),
  { ssr: false }
);

/**
 * Client Component wrapper for FirebaseInitializer
 */
export default function ClientFirebaseWrapper() {
  return <FirebaseInitializer />;
} 
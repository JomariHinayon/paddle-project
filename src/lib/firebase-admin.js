import React from 'react';
import admin from 'firebase-admin';

// Initialize Firebase Admin if not already initialized
export const getFirebaseAdmin = () => {
  if (!admin.apps.length) {
    const privateKey = process.env.FIREBASE_PRIVATE_KEY;
    admin.initializeApp({
      credential: admin.credential.cert({
        projectId,
        clientEmail,
        privateKey: privateKey ? privateKey.replace(/\\n/g, '\n') ;
  }
  return admin;
};

// Helper to get auth instance
export const getAuth = () => getFirebaseAdmin().auth();

// Helper to get Firestore instance
export const getFirestore = () => getFirebaseAdmin().firestore();

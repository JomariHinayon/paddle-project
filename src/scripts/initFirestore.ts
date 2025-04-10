import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import * as path from 'path';
import * as fs from 'fs';

// Load service account
const serviceAccountPath = path.join(process.cwd(), 'config', 'serviceAccountKey.json');
const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf8'));

// Initialize collections
export const initializeFirestoreCollections = async () => {
  try {
    // Initialize Firebase Admin if not already initialized
    if (!getApps().length) {
      initializeApp({
        credential: cert(serviceAccount),
      });
    }

    const db = getFirestore();

    // Create users collection with a dummy document to initialize
    await db.collection('users').doc('_init').set({
      _init: true,
      createdAt: new Date().toISOString()
    });

    // Create subscriptions collection with a dummy document
    await db.collection('subscriptions').doc('_init').set({
      _init: true,
      createdAt: new Date().toISOString()
    });

    // Create transactions collection as a top-level collection
    await db.collection('transactions').doc('_init').set({
      _init: true,
      createdAt: new Date().toISOString()
    });

    console.log('✅ Firestore collections initialized successfully');
    
    // Clean up initialization documents
    await Promise.all([
      db.collection('users').doc('_init').delete(),
      db.collection('subscriptions').doc('_init').delete(),
      db.collection('transactions').doc('_init').delete()
    ]);

  } catch (error) {
    console.error('Error initializing Firestore collections:', error);
    throw error;
  }
};
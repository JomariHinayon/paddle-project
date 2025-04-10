import { initializeFirestoreCollections } from './initFirestore';

const main = async () => {
  try {
    await initializeFirestoreCollections();
    process.exit(0);
  } catch (error) {
    console.error('Failed to initialize database:', error);
    process.exit(1);
  }
};

main();
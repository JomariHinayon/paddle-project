import admin from 'firebase-admin';

// Initialize Firebase Admin SDK if not already initialized
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

const SESSION_COOKIE_NAME = 'session';
const SESSION_COOKIE_MAX_AGE = 60 * 60 * 24 * 5 * 1000; // 5 days in ms

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { idToken } = req.body;
  if (!idToken) {
    return res.status(400).json({ error: 'Missing idToken' });
  }

  try {
    // Verify the ID token
    const decodedIdToken = await admin.auth().verifyIdToken(idToken);

    // Create a session cookie
    const sessionCookie = await admin.auth().createSessionCookie(idToken, {
      expiresIn: SESSION_COOKIE_MAX_AGE,
    });

    // Set the session cookie
    res.setHeader('Set-Cookie', `${SESSION_COOKIE_NAME}=${sessionCookie}; Path=/; HttpOnly; Secure; Max-Age=${SESSION_COOKIE_MAX_AGE / 1000}; SameSite=Strict`);

    return res.status(200).json({ message: 'Session set' });
  } catch (error) {
    console.error('Error creating session:', error);
    return res.status(401).json({ error: 'Invalid or expired ID token' });
  }
} 
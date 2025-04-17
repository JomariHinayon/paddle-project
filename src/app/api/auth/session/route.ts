import { NextRequest, NextResponse } from 'next/server';
import { getAuth } from '@/lib/firebase-admin';

// Set session expiration to 14 days (2 weeks)
const SESSION_EXPIRATION = 60 * 60 * 24 * 14 * 1000;

// Configure this route to use Node.js runtime
export const runtime = 'nodejs';

export async function POST(req: NextRequest) {
  try {
    // Get the ID token from the request body
    const { idToken } = await req.json();

    if (!idToken) {
      return NextResponse.json(
        { error: 'ID token is required' },
        { status: 400 }
      );
    }

    // Create a session cookie using the ID token
    const auth = getAuth();
    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn: SESSION_EXPIRATION,
    });

    // Set the session cookie in the response
    const response = NextResponse.json({ success: true });
    
    // Set the cookie with appropriate security settings
    response.cookies.set({
      name: 'session',
      value: sessionCookie,
      maxAge: SESSION_EXPIRATION / 1000, // maxAge is in seconds
      path: '/',
      secure: process.env.NODE_ENV === 'production', // Only send over HTTPS in production
      httpOnly: true,
      sameSite: 'strict',
    });

    return response;
  } catch (error: any) {
    console.error('Error creating session:', error);
    
    return NextResponse.json(
      {
        error: 'Failed to create session',
        details: error.message || 'Unknown error'
      },
      { status: 401 }
    );
  }
} 
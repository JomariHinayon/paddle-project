import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  // Skip middleware for auth-related paths
  if (request.nextUrl.pathname.startsWith('/auth/') || 
      request.nextUrl.pathname === '/login' ||
      request.nextUrl.pathname === '/signup' ||
      request.nextUrl.pathname === '/confirm-signup') {
    return NextResponse.next();
  }

  const session = request.cookies.get('session')?.value;

  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    // Simple JWT token verification using Firebase REST API
    const verifyEndpoint = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`;
    const response = await fetch(verifyEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idToken: session })
    });

    const data = await response.json();

    if (!data.users?.[0]) {
      throw new Error('Invalid token');
    }

    // Check email verification status
    if (!data.users[0].emailVerified && !request.nextUrl.pathname.startsWith('/confirm-signup')) {
      return NextResponse.redirect(new URL('/confirm-signup', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    // Clear invalid session cookie
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('session');
    return response;
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. /api routes
     * 2. /_next (Next.js internals)
     * 3. /fonts (inside /public)
     * 4. /examples (inside /public)
     * 5. all root files inside /public (e.g. /favicon.ico)
     */
    '/((?!api|_next|fonts|examples|[\\w-]+\\.\\w+).*)',
  ],
};

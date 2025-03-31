import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Array of public routes that don't require authentication
const publicRoutes = ['/', '/login', '/signup', '/confirm-signup', '/auth/action'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Allow public routes
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Check for session token
  const session = request.cookies.get('session')?.value;

  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    // Verify token with Firebase Auth
    const verifyEndpoint = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${process.env.NEXT_PUBLIC_FIREBASE_API_KEY}`;
    const response = await fetch(verifyEndpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idToken: session })
    });

    const data = await response.json();

    // No user found or invalid token
    if (!data.users?.[0]) {
      throw new Error('Invalid session');
    }

    const user = data.users[0];

    // Redirect unverified users to email verification page
    if (!user.emailVerified && pathname !== '/confirm-signup') {
      return NextResponse.redirect(new URL('/confirm-signup', request.url));
    }

    // Allow access to dashboard routes for verified users
    if (user.emailVerified && pathname.startsWith('/dashboard')) {
      const requestHeaders = new Headers(request.headers);
      requestHeaders.set('user', JSON.stringify(user));
      
      return NextResponse.next({
        headers: requestHeaders,
      });
    }

    return NextResponse.next();
  } catch (error) {
    // Clear invalid session and redirect to login
    const response = NextResponse.redirect(new URL('/login', request.url));
    response.cookies.delete('session');
    return response;
  }
}

export const config = {
  matcher: [
    /*
     * Match all routes except:
     * 1. /api (API routes)
     * 2. /_next (Next.js internals)
     * 3. /static (static files)
     * 4. /*.* (files with extensions)
     */
    '/((?!api|_next|static|.*\\.[^/]*$).*)',
  ],
};

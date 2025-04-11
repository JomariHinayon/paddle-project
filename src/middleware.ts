import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicRoutes = ['/', '/login', '/signup', '/confirm-signup', '/auth/action', '/checkout', '/api/webhook/paddle'];

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Add CSP headers with Paddle domains
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.paddle.com https://*.datadoghq-browser-agent.com https://*.googletagmanager.com https://core.spreedly.com https://global.localizecdn.com https://js.stripe.com;
    style-src 'self' 'unsafe-inline' https://*.paddle.com;
    frame-src 'self' https://*.paddle.com http://localhost:* https://sandbox-buy.paddle.com https://buy.paddle.com;
    frame-ancestors 'self' http://localhost:* https://*.paddle.com;
    img-src 'self' data: https: blob:;
    font-src 'self' https://*.paddle.com;
    connect-src 'self' https://*.paddle.com https://*.firebaseio.com https://*.googleapis.com https://*.sentry.io https://*.datadoghq-browser-agent.com https://*.google-analytics.com;
  `.replace(/\s{2,}/g, ' ').trim();

  response.headers.set('Content-Security-Policy', cspHeader);

  const { pathname } = request.nextUrl;

  // Allow public routes
  if (publicRoutes.includes(pathname)) {
    return response;
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
    console.log('Firebase Auth Response:', { userId: data.users?.[0]?.localId });

    // No user found or invalid token
    if (!data.users?.[0]) {
      throw new Error('Invalid session');
    }

    const user = data.users[0];
    console.log('Authenticated User:', { 
      uid: user.localId,
      email: user.email,
      emailVerified: user.emailVerified,
      path: pathname 
    });

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

    return response;
  } catch (error) {
    // Clear invalid session and redirect to login
    const redirectResponse = NextResponse.redirect(new URL('/login', request.url));
    redirectResponse.cookies.delete('session');
    return redirectResponse;
  }
}

export const config = {
  matcher: [
    // Protect all routes except static assets, API routes, and webhooks
    '/((?!api|_next|static|webhook|.*\\.[^/]*$).*)',
  ],
};

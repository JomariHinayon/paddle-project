import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const publicRoutes = ['/', '/login', '/signup', '/confirm-signup', '/auth/action', '/checkout', '/api/webhook/paddle'];
const apiRoutes = ['/api/subscriptions', '/api/webhook', '/api/auth'];

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();

  // Add CSP headers with all required domains
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.paddle.com https://*.datadoghq-browser-agent.com https://*.googletagmanager.com https://core.spreedly.com https://global.localizecdn.com https://js.stripe.com https://*.google.com https://apis.google.com https://*.firebaseio.com https://*.googleapis.com;
    style-src 'self' 'unsafe-inline' https://*.paddle.com;
    frame-src 'self' https://*.paddle.com http://localhost:* https://sandbox-buy.paddle.com https://buy.paddle.com https://accounts.google.com https://*.firebaseapp.com https://*.firebase.com;
    frame-ancestors 'self' http://localhost:* https://*.paddle.com;
    img-src 'self' data: https: blob:;
    font-src 'self' https://*.paddle.com;
    connect-src 'self' https://*.paddle.com https://*.firebaseio.com https://*.googleapis.com https://*.google-analytics.com https://firebaselogging-pa.googleapis.com https://*.cloudfunctions.net https://*.firebase.com https://*.firebaseapp.com wss://*.firebaseio.com https://identitytoolkit.googleapis.com;
  `.replace(/\s{2,}/g, ' ').trim();

  response.headers.set('Content-Security-Policy', cspHeader);
  
  // Remove COOP and COEP headers completely to allow popups to work properly
  response.headers.delete('Cross-Origin-Opener-Policy');
  response.headers.delete('Cross-Origin-Embedder-Policy');

  const { pathname } = request.nextUrl;

  // Allow public routes and API routes
  if (publicRoutes.includes(pathname) || apiRoutes.some(route => pathname.startsWith(route))) {
    return response;
  }

  // Check for session token
  const session = request.cookies.get('session')?.value;

  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  try {
    // Simple validation check - we'll do actual verification in API routes
    // Edge runtime doesn't support Firebase Admin, so we just do a basic format check
    if (!session || session.split('.').length !== 3) {
      throw new Error('Invalid session format');
    }

    // For protected routes, proceed with the user's session
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
    // Protect all routes except static assets and public files
    '/((?!_next/static|favicon.ico|.*\\.[^/]*$).*)',
  ],
};

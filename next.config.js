/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['lh3.googleusercontent.com'],
    unoptimized: true, // For static export
  },
  output: process.env.NEXT_USE_STATIC_EXPORT === 'true' ? 'export' : undefined,
  distDir: process.env.NEXT_USE_STATIC_EXPORT === 'true' ? 'out' : '.next',
  webpack: (config, { isServer }) => {
    // This helps resolve path aliases correctly
    config.resolve.fallback = { fs: false, net: false, tls: false }
    return config
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.paddle.com https://cdn.paddle.com https://cdn.sandbox.paddle.com https://www.googletagmanager.com https://*.googleapis.com; connect-src 'self' https://*.paddle.com https://checkout-service.paddle.com https://sandbox-checkout-service.paddle.com https://*.googleapis.com https://firebaselogging-pa.googleapis.com https://identitytoolkit.googleapis.com https://*.google-analytics.com; style-src 'self' 'unsafe-inline' https://*.paddle.com; img-src 'self' data: https://*.paddle.com https://*.pinimg.com; frame-src 'self' https://*.paddle.com https://sandbox-buy.paddle.com; frame-ancestors 'self' http://localhost:* https://*.paddle.com;"
          }
        ]
      }
    ]
  },
  // External packages that should be processed by the server
  serverExternalPackages: ['firebase-admin'],
  // Set runtime configuration for specific routes
  serverRuntimeConfig: {
    // Force Node.js runtime for all API routes with Firebase Admin
    api: {
      bodyParser: {
        sizeLimit: '1mb',
      },
    },
  }
};

module.exports = nextConfig;

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.paddle.com https://www.googletagmanager.com https://*.googleapis.com",
              "connect-src 'self' https://*.paddle.com https://checkout-service.paddle.com https://*.googleapis.com https://firebaselogging-pa.googleapis.com https://identitytoolkit.googleapis.com https://*.google-analytics.com",
              "style-src 'self' 'unsafe-inline' https://*.paddle.com",
              "img-src 'self' data: https://*.paddle.com https://*.pinimg.com",
              "frame-src 'self' https://*.paddle.com",
              "frame-ancestors 'self' http://localhost:* https://*.paddle.com"
            ].join('; ')
          }
        ]
      }
    ]
  }
};

module.exports = nextConfig;

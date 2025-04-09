/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'lh3.googleusercontent.com',  // Google user profile photos
      'googleusercontent.com',      // Alternative Google photo domain
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.paddle.com",
              "style-src 'self' 'unsafe-inline'",
              "frame-src 'self' https://*.paddle.com https://buy.paddle.com https://checkout.paddle.com",
              "frame-ancestors 'self' https://*.paddle.com https://buy.paddle.com https://checkout.paddle.com",
              "connect-src 'self' https://*.paddle.com https://checkout-service.paddle.com",
              "img-src 'self' data: https://*.paddle.com",
              `form-action 'self'`,
            ].join('; ')
          }
        ]
      }
    ];
  }
};

module.exports = nextConfig;

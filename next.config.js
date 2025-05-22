/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ['lh3.googleusercontent.com'],
    unoptimized: process.env.NEXT_USE_STATIC_EXPORT === 'true', // Only unoptimize for static export
  },
  output: process.env.NEXT_USE_STATIC_EXPORT === 'true' ? 'export' : undefined,
  distDir: process.env.NEXT_USE_STATIC_EXPORT === 'true' ? 'out' : '.next',
  webpack: (config, { isServer }) => {
    // This helps resolve path aliases correctly
    if (isServer) {
      // For server-side code
      const { dirname, join } = require('path');
      if (process.env.NODE_ENV === 'production') {
        // For Netlify builds
        const tsConfigFile = join(dirname(require.resolve('typescript/package.json')), '../tsconfig.json');
        console.log('Using TypeScript config file:', tsConfigFile);
      }
    }

    config.resolve.fallback = { fs: false, net: false, tls: false };
    
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': new URL('./src', 'file://' + __dirname).pathname
    };
    
    return config;
  },
  trailingSlash: process.env.NEXT_USE_STATIC_EXPORT === 'true',
};

module.exports = nextConfig; 
// CommonJS format for Next.js config
// @ts-check

/**
 * @type {import('next').NextConfig} 
 */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['lh3.googleusercontent.com'],
    unoptimized: true, // Always unoptimize for static export
  },
  output: 'export',
  distDir: 'out',
  webpack: function (config) {
  // Simplified webpack config
    config.resolve.fallback = { fs: false, net: false, tls: false };
    
    const path = require('path');
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': path.join(__dirname, 'src')
    };
    
    return config;
  },
  trailingSlash: true,
};

module.exports = nextConfig; 
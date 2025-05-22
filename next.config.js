/** @type {import('next').NextConfig} */
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
  webpack: (config) => {
  // Simplified webpack config
    config.resolve.fallback = { fs: false, net: false, tls: false };

    config.resolve.alias = {
      ...config.resolve.alias,
      '@': new URL('./src', 'file://' + __dirname).pathname
    };
    
    return config;
  },
  trailingSlash: true,
};

module.exports = nextConfig; 
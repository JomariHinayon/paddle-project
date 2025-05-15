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
    config.resolve.fallback = { fs: false, net: false, tls: false };
    
    // Add alias for @ to src directory
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': new URL('./src', import.meta.url).pathname
    };
    
    return config;
  },
  experimental: {
    esmExternals: 'loose'
  },
  trailingSlash: process.env.NEXT_USE_STATIC_EXPORT === 'true',
};

export default nextConfig; 
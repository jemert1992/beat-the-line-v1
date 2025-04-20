import { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  output: 'standalone',
  // Ensure proper handling of static assets
  images: {
    unoptimized: true,
  },
  // Disable React strict mode for production to avoid double-rendering issues
  reactStrictMode: false,
  // Add experimental features to fix rendering issues
  experimental: {
    appDir: true,
  },
}

export default nextConfig

import { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Using standalone mode for Netlify SSR deployment
  output: 'standalone',
  // Ensure proper handling of static assets
  images: {
    unoptimized: true,
  },
  // Disable React strict mode for production to avoid double-rendering issues
  reactStrictMode: false,
  // Ensure trailing slashes for better compatibility
  trailingSlash: true,
}

export default nextConfig

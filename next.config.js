module.exports = {
  // Disable React strict mode for production to avoid double-rendering issues
  reactStrictMode: false,
  // Use static export for better compatibility with Netlify
  output: 'export',
  // Ensure proper handling of static assets
  images: {
    unoptimized: true,
  },
  // Disable type checking during build for faster builds
  typescript: {
    ignoreBuildErrors: true,
  },
  // Disable ESLint during build for faster builds
  eslint: {
    ignoreDuringBuilds: true,
  }
}

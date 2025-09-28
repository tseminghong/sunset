/** @type {import('next').NextConfig} */
const nextConfig = {
  // Suppress the lockfile warning
  outputFileTracingRoot: '.',
  
  // Enable experimental features for better performance
  experimental: {
    // Enable server actions for better form handling
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },

  // Image optimization configuration
  images: {
    formats: ['image/webp', 'image/avif'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // Headers for better security and performance
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ]
  },

  // Redirect configuration for backward compatibility with old HTML files
  async redirects() {
    return [
      // Redirect old HTML files to new Next.js routes
      {
        source: '/javascript.html',
        destination: '/javascript',
        permanent: true,
      },
      {
        source: '/s4python.html',
        destination: '/python',
        permanent: true,
      },
      {
        source: '/DSE_2025(1).html',
        destination: '/courses',
        permanent: false, // Temporary redirect until we create specific pages
      },
      {
        source: '/DSE_2025(2).html',
        destination: '/courses',
        permanent: false,
      },
      {
        source: '/hardware.html',
        destination: '/courses',
        permanent: false,
      },
      {
        source: '/software.html',
        destination: '/courses',
        permanent: false,
      },
      {
        source: '/sql.html',
        destination: '/courses',
        permanent: false,
      },
    ]
  },
}

module.exports = nextConfig
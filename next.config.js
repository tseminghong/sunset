const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Suppress the lockfile warning
  outputFileTracingRoot: process.cwd(),
  
  // Enable experimental features for better performance
  experimental: {
    // Enable server actions for better form handling
    serverActions: {
      bodySizeLimit: '2mb',
    },
    // Enable webVitalsAttribution for performance monitoring
    webVitalsAttribution: ['CLS', 'LCP'],
  },

  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  
  // Image optimization configuration
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },

  // Webpack optimizations (only used in non-turbopack builds)
  webpack: (config, { dev, isServer }) => {
    // Only apply webpack config when not using turbopack
    if (process.env.TURBOPACK === '1') {
      return config
    }

    // Enable production optimizations
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        usedExports: true,
        sideEffects: false,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              priority: 10,
              reuseExistingChunk: true,
            },
            gsap: {
              test: /[\\/]node_modules[\\/]gsap[\\/]/,
              name: 'gsap',
              priority: 15,
              reuseExistingChunk: true,
            },
            common: {
              name: 'common',
              minChunks: 2,
              priority: 5,
              reuseExistingChunk: true,
            },
          },
        },
      }
    }

    // Optimize bundle size
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname, 'src'),
    }

    return config
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
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/favicon.ico',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
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

module.exports = withBundleAnalyzer(nextConfig)
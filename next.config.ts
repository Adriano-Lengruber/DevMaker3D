import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* Core Configuration */
  output: 'standalone',
  poweredByHeader: false,
  reactStrictMode: true,
  
  /* Image Optimization */
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  /* Compression */
  compress: true,

  /* Security Headers */
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' data: https://fonts.gstatic.com",
              "img-src 'self' data: https: http:",
              "connect-src 'self' https://www.google-analytics.com https://fonts.googleapis.com",
              "frame-src https://www.googletagmanager.com",
            ].join('; '),
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'no-cache, no-store, must-revalidate',
          },
          {
            key: 'X-RateLimit-Limit',
            value: '10',
          },
          {
            key: 'X-RateLimit-Window',
            value: '60',
          },
        ],
      },
    ]
  },

  /* Redirects */
  async redirects() {
    return [
      {
        source: '/contato',
        destination: '/#contact',
        permanent: true,
      },
      {
        source: '/servicos',
        destination: '/#services',
        permanent: true,
      },
      {
        source: '/materiais',
        destination: '/#materials',
        permanent: true,
      },
      {
        source: '/portfolio',
        destination: '/#portfolio',
        permanent: true,
      },
      {
        source: '/processo',
        destination: '/#process',
        permanent: true,
      },
    ]
  },

  /* Rewrites */
  async rewrites() {
    return [
      {
        source: '/sitemap.xml',
        destination: '/api/sitemap',
      },
    ]
  },

  /* Webpack Configuration */
  webpack: (config, { dev, isServer }) => {
    // Optimize bundle size
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10,
            reuseExistingChunk: true,
          },
          common: {
            name: 'common',
            minChunks: 2,
            chunks: 'all',
            priority: 5,
            reuseExistingChunk: true,
          },
        },
      }
    }

    return config
  },

  /* Environment Variables */
  env: {
    CUSTOM_KEY: process.env.CUSTOM_KEY,
  },

  /* Experimental Features */
  experimental: {
    optimizeCss: true,
    scrollRestoration: true,
  },

  /* Turbopack Configuration */
  turbopack: {
    resolveExtensions: ['.tsx', '.ts', '.jsx', '.js', '.json', '.mjs'],
  },

  /* Compiler Options */
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  /* Production Optimizations */
  productionBrowserSourceMaps: false,

  /* Trailing Slash */
  trailingSlash: false,
}

export default nextConfig
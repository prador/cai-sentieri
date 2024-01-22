/** @type {import("next").NextConfig} */

const runtimeCaching = require('next-pwa/cache')

runtimeCaching[0].handler = 'StaleWhileRevalidate'

const withPWA = require('next-pwa')({
  dest: 'public',
  register: false,
  // disable: process.env.NODE_ENV === 'development',
  skipWaiting: false,
  sw: 'service-worker.js',
  runtimeCaching
})

const nextConfig = {
  async redirects() {
    return [
      {
        source: '/',
        has: [
          {
            type: 'query',
            key: 'route',
          },
        ],
        destination: '/:route/',
        permanent: true,
      },
      {
        source: '/admin',
        destination: 'https://wordpress-production-fbed.up.railway.app/wp-admin',
        permanent: false,
        basePath: false,
      }
    ]
  },
  
  images: {
    domains: ['wordpress-production-fbed.up.railway.app'],
  },
  webpack: {
    config: {
      experiments: {
          topLevelAwait: true
      }
    }
  }
  // webpack: (config) => {
  //   config.experiments = {
  //     topLevelAwait: true,
  //   }
  //   return config
  // }
}

module.exports = withPWA(nextConfig)


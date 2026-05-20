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
        destination: 'https://sentieri-admin.caitortona.net/wp-admin',
        permanent: false,
        basePath: false,
      },
      {
        source: '/114-Rifugio-Orsi-Monte-Pana',
        destination: 'https://sentieri.caitortona.net/trails/114-rifugio-orsi-monte-pana',
        permanent: false,
        basePath: false,
      },
      {
        source: '/111-Forotondo-Bruggi',
        destination: 'https://sentieri.caitortona.net/trails/111-forotondo-bruggi',
        permanent: false,
        basePath: false,
      }
    ]
  },
  
  images: {
    domains: ['sentieri-admin.caitortona.net'],
  },
  webpack: (config) => {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    }
    return config
  }
}

module.exports = withPWA(nextConfig)


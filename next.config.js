/** @type {import("next").NextConfig} */


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

module.exports = nextConfig


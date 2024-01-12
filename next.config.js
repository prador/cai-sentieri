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
  ,
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'it'],
  },
}

  // webpack: (config) => {
  //   config.experiments = {
  //     topLevelAwait: true,
  //   }
  //   return config
  // }
}

module.exports = nextConfig


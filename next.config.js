module.exports = {
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
  // webpack: (config) => {
  //   config.experiments = {
  //     topLevelAwait: true,
  //   }
  //   return config
  // }
}

const envKey = key => {
  const env = process.env.NODE_ENV || 'development'

  const configuration = {
    development: {
      port: 8000
    },
    uat: {
      port: 8010
    },
    production: {
      port: 8000
    }
  }

  return configuration[env][key]
}

const manifest = {
  connections: [
    {
      host: envKey('host'),
      port: envKey('port'),
      routes: {
        cors: true
      },
      router: {
        stripTrailingSlash: true
      }
    }
  ],
  registrations: [
    {
      plugin: './api',
      options: { routes: { prefix: '/api' } }
    },
    {
      plugin: {
        register: 'good',
        options: {
          ops: { interval: 60000 },
          reporters: {
            console: [
              { module: 'good-squeeze',
                name: 'Squeeze',
                args: [{ error: '*' }]
              },
              {
                module: 'good-console'
              },
              'stdout'
            ]
          }
        }
      }
    }
  ]
}

module.exports = manifest

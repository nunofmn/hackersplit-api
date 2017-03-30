const Glue = require('glue')
const series = require('async/series')

const manifest = require('./config/manifest')
const hnClient = require('./util/hnclient')
const stories = require('./util/stories')

if (!process.env.PRODUCTION) {
  manifest.registrations.push({
    'plugin': {
      'register': 'blipp',
      'options': {}
    }
  })
}

Glue.compose(manifest, { relativeTo: __dirname }, (err, server) => {
  if (err) {
    return console.log('server.register err: ', err)
  }

  series([
    (callback) => {
      // Setup top stories watcher
      hnClient.watchTopStories(stories.topStoriesUpdateHandler)

      // Init stories cache
      stories.updateTopStoriesCache(callback)
    },
    (callback) => {
      // Start server
      server.start(() => {
        callback()
      })
    }
  ], (err) => {
    if (err) {
      return console.error('Error initiating server: ', err)
    }

    console.log('Server is listening on ' + server.info.uri.toLowerCase())
  })
})

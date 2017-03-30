const Boom = require('boom')
const stories = require('../../util/stories')
const content = require('../../util/content')

const DEFAULT_TOP_STORIES_NUMBER = 30

const story = {
  topStories: {
    handler: function (request, reply) {
      const storiesSize = request.query.limit || DEFAULT_TOP_STORIES_NUMBER

      stories.getTopStoriesItems(storiesSize, (err, stories) => {
        if (err) {
          return reply(Boom.badImplementation('Error fetching top stories'))
        }

        reply(stories)
      })
    }
  },

  getStoryById: {
    handler: function (request, reply) {
    }
  },

  storyContent: {
    handler: function (request, reply) {
      content.getStoryContent(request.params.id, (err, content) => {
        if (err) {
          return reply(Boom.badImplementation('Error fetching story content'))
        }

        reply(content)
      })
    }
  }
}

module.exports = story

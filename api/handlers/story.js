const Boom = require('boom');
const stories = require('../../util/stories');

const DEFAULT_TOP_STORIES_NUMBER = 30;

const story = {
  topStories: {
    handler: function(request, reply) {

      const storiesSize = request.params.limit || DEFAULT_TOP_STORIES_NUMBER;

      stories.getTopStoriesItems(storiesSize, (err, stories) => {
        if(err) {
          return reply(Boom.badImplementation('Error fetching top stories'));
        }

        reply(stories);
      });
    }
  }
};

module.exports = story;

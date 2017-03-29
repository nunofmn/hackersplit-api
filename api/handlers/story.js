const Boom = require('boom');
const stories = require('../../util/stories');

const story = {
  topStories: {
    handler: function(request, reply) {

      stories.getTopStoriesItems(10, (err, stories) => {
        if(err) {
          return reply(Boom.badImplementation('Error fetching top stories'));
        }

        reply(stories);
      });
    }
  }
};

module.exports = story;

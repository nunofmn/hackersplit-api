const Home = require('./handlers/home');
const Story = require('./handlers/story');

exports.register = (plugin, options, next) => {
  plugin.route([
    { method: 'GET', path: '/', config: Home.hello },
    { method: 'GET', path: '/topstories', config: Story.topStories },
    { method: 'GET', path: '/story/{id}', config: Story.getStoryById },
    { method: 'GET', path: '/story/{id}/content', config: Story.storyContent }
  ]);

  next();
};

exports.register.attributes = {
  name: 'api'
};

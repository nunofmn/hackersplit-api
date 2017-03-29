const Home = require('./handlers/home');
const Story = require('./handlers/story');

exports.register = (plugin, options, next) => {
  plugin.route([
    { method: 'GET', path: '/', config: Home.hello },
    { method: 'GET', path: '/topstories', config: Story.topStories }
  ]);

  next();
};

exports.register.attributes = {
  name: 'api'
};

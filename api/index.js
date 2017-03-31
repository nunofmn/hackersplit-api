const Home = require('./handlers/home')
const Story = require('./handlers/story')
const Comments = require('./handlers/comment')

exports.register = (plugin, options, next) => {
  plugin.route([
    { method: 'GET', path: '/', config: Home.hello },
    { method: 'GET', path: '/topstories', config: Story.topStories },
    { method: 'GET', path: '/story/{id}', config: Story.getStoryById },
    { method: 'GET', path: '/story/{id}/content', config: Story.storyContent },
    { method: 'GET', path: '/comment/{id}', config: Comments.getById },
    { method: 'GET', path: '/story/{id}/comments', config: Comments.getByStoryId },
    { method: 'GET', path: '/comment/{id}/subcomments', config: Comments.getSubComments }
  ])

  next()
}

exports.register.attributes = {
  name: 'api'
}

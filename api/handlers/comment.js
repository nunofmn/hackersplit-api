const Boom = require('boom')
const comments = require('../../util/comments')

const comment = {
  getById: {
    handler: function (request, reply) {
      comments.getComment(request.params.id, (err, comment) => {
        if (err) {
          return reply(Boom.badImplementation('Error fetching comment content'))
        }

        reply(comment)
      })
    }
  },
  getAllComments: {
    handler: function (request, reply) {
      comments.getAllStoryComments(request.params.id, (err, comments) => {
        if (err) {
          return reply(Boom.badImplementation('Error fetching comments content'))
        }

        reply(comments)
      })
    }
  },
  getSubComments: {
    handler: function (request, reply) {
    }
  }
}

module.exports = comment

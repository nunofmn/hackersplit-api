const map = require('async/map')

const client = require('./hnclient')
const cache = require('./cache')
const stories = require('./stories')

const getCommentsIds = function (storyId, callback) {
  stories.getStory(storyId, (err, story) => {
    if (err) {
      return callback(err)
    }

    callback(null, story.kids)
  })
}

const getCommentsItems = function (storyId, callback) {
  getCommentsIds(storyId, (err, commentsIds) => {
    if (err) {
      return callback(err)
    }

    map(commentsIds,
      getComment,
      callback
    )
  })
}

const getComment = function (commentId, callback) {
  cache.getValue(commentId, (err, item) => {
    if (err) {
      return callback(err)
    }

    if (item != null) {
      return callback(null, item)
    }

    client.getItem(commentId, (err, item) => {
      if (err) {
        return callback(err)
      }

      cache.putValue(commentId, item)

      callback(null, item)
    })
  })
}

const getSubComments = function (commentId, callback) {
  getComment(commentId, (err, comment) => {
    if (err) {
      return callback(err)
    }

    if (!('kids' in comment)) {
      return callback(null, comment)
    }

    map(comment.kids,
      getSubComments,
      (err, allSubComments) => {
        if (err) {
          return callback(err)
        }

        const withSubComments = Object.assign({}, comment, {
          comments: allSubComments
        })

        callback(null, withSubComments)
      }
    )
  })
}

const getAllStoryComments = function (storyId, callback) {
  getCommentsItems(storyId, (err, comments) => {
    if (err) {
      return callback(err)
    }

    map(comments,
      (comment, cb) => {
        getSubComments(comment.id, (err, subComments) => {
          if (err) {
            return cb(err)
          }

          cb(null, subComments)
        })
      },
      (err, mergedComments) => {
        if (err) {
          return callback(err)
        }

        callback(null, mergedComments)
      }
    )
  })
}

module.exports = {
  getCommentsIds,
  getCommentsItems,
  getComment,
  getSubComments,
  getAllStoryComments
}

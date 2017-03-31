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
      (err, comments) => {
        if (err) {
          return callback(err)
        }

        callback(null, comments)
      }
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

module.exports = {
  getCommentsIds,
  getCommentsItems,
  getComment
}

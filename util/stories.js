const client = require('./hnclient');
const cache = require('./cache');
const map = require('async/map');

const TOP_STORIES_IDS_CACHE = 'topstories-id';
const TOP_STORIES_CACHE = 'topstories-items';

const getTopStoriesIds = function(callback) {

  cache.getValue(TOP_STORIES_IDS_CACHE, (err, storiesIds) => {
    if(err) {
      return callback(err);
    }

    if(storiesIds != null) {
      return callback(null, storiesIds);
    }

    client.getTopStories((err, stories) => {
      if(err) {
        return callback(err);
      }

      cache.putValue(TOP_STORIES_IDS_CACHE, stories);

      callback(null, stories);
    });
  });
};

const getTopStoriesItems = function(max, callback) {

  getTopStoriesIds((err, storiesIds) => {
    if(err) {
      return callback(err);
    }

    map(storiesIds.slice(0, max),
      getStory,
      (err, stories) => {

        if(err) {
          return callback(err);
        }

        callback(null, stories);
      }
    );
  });
};

const getStory = function(storyId, callback) {

  cache.getValue(storyId, (err, item) => {
    if(err) {
      return callback(err);
    }

    if(item != null) {
      return callback(null, item);
    }

    client.getItem(storyId, (err, item) => {
      if(err) {
        return cb(err);
      }

      cache.putValue(storyId, item);

      callback(null, item);
    });
  });

};

const updateTopStoriesCache = function(callback) {
  client.getTopStories((err, stories) => {
    if(err) {
      return callback(err);
    }

    cache.putValue(TOP_STORIES_IDS_CACHE, stories);

    callback();
  });
};

const topStoriesUpdateHandler = function(err, stories) {
  cache.putValue(TOP_STORIES_IDS_CACHE, stories);
};

module.exports = {
  getTopStoriesItems,
  getTopStoriesIds,
  getStory,
  updateTopStoriesCache,
  topStoriesUpdateHandler
};

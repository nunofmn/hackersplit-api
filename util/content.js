const request = require('request');
const stories = require('./stories');
const cache = require('./cache');

const MERCURY_PARSER_URL = 'https://mercury.postlight.com/parser';
const MERCURY_API_KEY = process.env.MERCURY_API_KEY;

const getStoryContent = function(storyId, callback) {

  cache.getValue(`${storyId}-content`, (err, storyContent) => {
    if(err) {
      return callback(err);
    }

    if(storyContent != null) {
      return callback(null, storyContent);
    }

    stories.getStory(storyId,(err, story) => {
      if(err) {
        return callback(err);
      }

      getArticleView(story.url, (err, content) => {
        if(err) {
          return callback(err);
        }

        cache.putValue(`${storyId}-content`, content);

        callback(null, content)
      });

    });
  });

};

const getArticleView = function(url, callback) {

  const options = {
    url: MERCURY_PARSER_URL,
    method: 'GET',
    headers: {
      'x-api-key': MERCURY_API_KEY
    },
    qs: {
      url
    }
  };

  request(options, (err, response, body) => {
    if(err) {
      return callback(err);
    }

    callback(null, body);
  });
};

module.exports = {
  getStoryContent
};

const firebase = require('firebase');
const map = require('async/map');

firebase.initializeApp({
  "appName": "HN News Feed",
  "databaseURL": "https://hacker-news.firebaseio.com"
});

const topStories = firebase.app().database().ref('v0/topstories');

const getTopStories = function(callback) {

  topStories
    .once('value')
    .then(snapshot => {
      callback(null, snapshot.val());
    })
    .catch(err => {
      callback(err);
    });
};

const getItem = function(item, callback) {

  firebase.app().database()
    .ref(`v0/item/${item}`)
    .once('value')
    .then(snapshot => {
      callback(null, snapshot.val());
    })
    .catch(err => {
      callback(err);
    });
};

const watchTopStories = function(handler) {

  topStories
    .on('value', snapshot => {
      handler(null, snapshot.val());
    });
};

module.exports = {
  getTopStories,
  getItem,
  watchTopStories
};

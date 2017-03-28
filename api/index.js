const Home = require('./handlers/home');

exports.register = (plugin, options, next) => {
  plugin.route([
    { method: 'GET', path: '/', config: Home.hello }
  ]);

  next();
};

exports.register.attributes = {
  name: 'api'
};

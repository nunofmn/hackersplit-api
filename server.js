const Glue = require('glue');
const manifest = require('./config/manifest');
const hnClient = require('./util/hnclient');

if(!process.env.PRODUCTION) {
  manifest.registrations.push({
    "plugin": {
      "register": "blipp",
      "options": {}
    }
  })
}

Glue.compose(manifest, { relativeTo: __dirname }, (err, server) => {

  if(err) {
    console.log('server.register err: ', err);
  }

  server.start(() => {
    console.log('Server is listening on ' + server.info.uri.toLowerCase());
  });
});

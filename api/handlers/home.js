const home = {
  hello: {
    handler: function (request, reply) {
      return reply({result: 'Hackersplit API'})
    }
  }
}

module.exports = home

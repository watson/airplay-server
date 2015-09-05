'use strict'

var airplay = require('../')

var server = airplay('My AirPlay Server', function (req, res) {
  console.log(req.method, req.url)
  console.log(req.headers)
})

server.listen(7000, function () {
  console.log('AirPlay server is listening on port %d', server.address().port)
})

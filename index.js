'use strict'

var http = require('http')
var mdns = require('airplay-mdns-server')
var xtend = require('xtend')
var pkg = require('./package')
var debug = require('debug')(pkg.name)

var airplay = module.exports = function (opts, onRequest) {
  if (typeof opts === 'function') return airplay(null, opts)
  if (typeof opts === 'string') return airplay({ name: opts }, onRequest)
  if (!opts) opts = {}

  var server = http.createServer(onRequest)

  server.on('request', function (req, res) {
    debug('%s %s', req.method, req.url, req.headers)
  })

  server.on('listening', function () {
    var port = server.address().port
    debug('Listening on port %d', port)

    opts = xtend({ name: 'Node.js', version: pkg.version, port: port }, opts)

    mdns(opts, function (err, txt) {
      if (err) return server.emit('error', err)
      server.emit('txt', txt)
    })
  })

  return server
}

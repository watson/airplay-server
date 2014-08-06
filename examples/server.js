'use strict';

var debug = require('debug')('airplay');
var airplay = require('../')();

airplay.on('request', function (req, res) {
  console.log(req.method, req.url);
  debug(req.headers);
});

airplay.listen(function () {
  debug('AirPlay server is now listening on port %d', airplay.address().port);
});

'use strict';

var http = require('http');
var mdns = require('mdns');
var getmac = require('getmac');
var debug = require('debug')('airplay');

var airplay = module.exports = function (onRequest) {
  var server = http.createServer(onRequest);
  server.on('listening', function () {
    start(server.address().port);
  });
  return server;
};

var features = airplay.features = {
  VIDEO: 0,                   // video support
  PHOTO: 1,                   // photo support
  VIDEO_FAIR_PLAY: 2,         // video protected with FairPlay DRM
  VIDEO_VOLUME_CONTROL: 4,    // volume control supported for videos
  VIDEO_HTTP_LIVE_STREAMS: 8, // http live streaming supported
  SLIDESHOW: 16,              // slideshow supported
  SCREEN: 64,                 // mirroring supported
  SCREEN_ROTATE: 128,         // screen rotation supported
  AUDIO: 256,                 // audio supported
  AUDIO_REDUNDANT: 512,       // audio packet redundancy supported
  FPSAP_V2_AES_GCM: 1024,     // FairPlay secure auth supported
  PHOTO_CACHING: 2048         // photo preloading supported
};

var start = function (port) {
  debug('Getting server MAC address');
  getmac.getMac(function (err, mac) {
    if (err) throw err;

    var featureMask = '0x' + Object.keys(features).reduce(function (a, b) { return features[a] | features[b]; }).toString(16);
    var options = {
      name: 'Node.js',
      txtRecord: {
        deviceid: mac.toUpperCase(),
        features: '0x100029ff',
        vv: '1',
        rhd: '1.06.5',
        pw: '0',
        srcvers: '150.33',
        rmodel: 'MacBookAir4,2',
        model: 'AppleTV3,1'
      }
    };

    debug('Starting server with name %s...', options.name);
    var ad = mdns.createAdvertisement(mdns.tcp('airplay'), parseInt(port, 10), options);
    ad.start();
  });
};

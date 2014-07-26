'use strict';

var http = require('http');
var mdns = require('mdns');
var getmac = require('getmac');
var debug = require('debug')('airplay');

var pkg = require('./package.json');

var airplay = module.exports = function (name, options, onRequest) {
  if (typeof name === 'object') {
    options = name;
    name = undefined;
  } else if (typeof name === 'function') {
    onRequest = name;
    name = undefined;
  } else if (typeof options === 'function') {
    onRequest = options;
    options = undefined;
  }
  if (!options) options = {};
  if (!options.name) options.name = name || 'Node.js';
  if (!options.features) options.features = allFeatures;

  var start = function () {
    debug('Getting server MAC address');
    getmac.getMac(function (err, mac) {
      if (err) throw err;

      var port = server.address().port;
      var featureMask = '0x' + options.features.toString(16);
      var model = 'NodeAirPlay' + pkg.version.split('.').slice(0,-1).join(',');

      var mdnsOpt = {
        name: options.name,
        txtRecord: {
          deviceid: mac.toUpperCase(), // MAC address of the device
          features: featureMask,       // bitfield of supported features
          model: model,                // device model
          pw: '0',                     // server is password protected
          srcvers: pkg.version         // server version
        }
      };

      debug('Starting server with name %s...', options.name);
      var ad = mdns.createAdvertisement(mdns.tcp('airplay'), port, mdnsOpt);
      ad.start();
    });
  };

  var server = http.createServer(onRequest);
  server.on('listening', start);
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

var allFeatures = Object.keys(features)
  .reduce(function (a, b) {
    return features[a] | features[b];
  });

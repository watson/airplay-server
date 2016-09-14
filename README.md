# airplay-server

An extendable and thin AirPlay server.

This module is a thin AirPlay server that you can use to easily
implement your own AirPlay functionality. By it self it doesn't do
anything else than expose it self on the network as an AirPlay server.
All requests to the server is sent to listeners that you attach to the
airplay server by listening for the "request" event.

You can see a very simple implementation example under
[examples/server.js](examples/server.js).

I'm currently working on a more full fleshed and usable AirPlay server
implementation in the [AirServer
project](https://github.com/watson/airserver), but it's currently a work
in progress.

Please note that some AirPlay clients expects a RAOP server (AirTunes)
to be running on the network with the same name as the AirPlay server.
In case you need a RAOP server, please consider the [raop-server
project](https://github.com/watson/raop-server).

[![Build status](https://travis-ci.org/watson/airplay-server.svg?branch=master)](https://travis-ci.org/watson/airplay-server)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)

## Installation

```console
npm install airplay-server --save
```

## Example usage

```js
var airplay = require('airplay-server')('My AirPlay Server')

airplay.on('request', function (req, res) {
  // do your stuff
})

airplay.listen(5000) // start server on port 5000
```

## API

### Constructor

Get the constructor by requireing the `airplay-server` node module and
call it. It takes the optional arguments `name`, `options` and
`onRequest`. Either of them can be left out, so calling with only
`options` or only `name` and `onRequest` is ok:

```javascript
require('airplay-server')(name, options, onRequest)
```

Constructor arguments:

- `name` - name of the AirPlay server (default: 'Node.js')
- `options` - options object (default: {})
- `onRequest` - callback function called upon each request (default: No listener is added. Remember to manually listen on the `request` event)

Options:

- `features` - A features bit-mask (default: all features)
- `txt` - object used to replace stock TXT record

### Server

The constructor returns a basic Node.js HTTP server, so remember to call
`.listen()` and optionally add a `request` event listener if one hasn't
been provided as an argument to the constructor.

## License

MIT

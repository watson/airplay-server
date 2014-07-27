# airplay-server

An AirPlay server

## Installation

```
npm install airplay-server
```

## Example usage

```javascript
var airplay = require('airplay-server')('My AirPlay Server');

airplay.on('request', function (req, res) {
  // do your stuff
});

airplay.listen(5000); // start server on port 5000
```

## API

### Constructor

Get the constructor by requireing the `airplay-server` node module and
call it. It takes the optional arguments `name`, `options` and
`onRequest`. Either of them can be left out, so calling with only
`options` or only `name` and `onRequest` is ok:

```javascript
require('airplay-server')(name, options, onRequest);
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

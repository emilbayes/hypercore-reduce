# `hypercore-reduce`

> Reduce from an initial state as a function of a hypercore

## Usage

```js
var reduce = require('hypercore-reduce')

// Feed is a hypercore instance
reduce(feed, reducer, {}, done)

function reducer (prevState, curState, next) {
  return next(null, Object.assign(prevState, curState))
}

function done (err, finalState) {
  if (err) throw err

  console.log(finalState)
}

```

## API

### `var destroy = reduce(feed, [readOpts], reducer, initial, done)`

Reduce a hypercore feed from an initial state `initial`,
calling `reducer(state, currentItem, callback)`, where
`callback(err, state)` will update the state. When the feed is completely
consumed, `done(err, state)` will be invoked with the final `state`. If an
error occurs, `done` is also invoked. Optionally `readOpts` can be passed as
argument to [`feed.createReadStream`](https://github.com/mafintosh/hypercore#var-stream--feedcreatereadstreamoptions).

A `destroy(err)` function is returned, which can be used to destroy the
underlying stream.

## Install

```sh
npm install hypercore-reduce
```

## License

[ISC](LICENSE)

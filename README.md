# `hypercore-reduce`

> Reduce from an initial state as a function of a hypercore

## Usage

```js
var reduce = require('hypercore-reduce')

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

## Install

```sh
npm install hypercore-reduce
```

## License

[ISC](LICENSE)

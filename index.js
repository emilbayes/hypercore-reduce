var assert = require('assert')
var each = require('stream-each')

module.exports = hypercoreReduce

function hypercoreReduce (feed, opts, reducer, initial, done) {
  // opts is optional, shift all arguments
  if (typeof opts === 'function') return hypercoreReduce(feed, null, opts, reducer, initial)

  assert(feed, 'feed must be given')
  assert(typeof reducer === 'function', 'reducer must be function')
  assert(initial, 'initial must be given')
  assert(typeof done === 'function', 'done must be function')

  var state = initial
  var s = each(feed.createReadStream(opts), function (data, next) {
    reducer(state, data, function (err, nextState) {
      if (err) return next(err)

      state = nextState

      return next()
    })
  }, function (err) {
    if (err) return done(err)
    return done(null, state)
  })

  return function destroy (err) {
    return s.destroy(err)
  }
}

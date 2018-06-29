var test = require('tape')

var hypercore = require('hypercore')
var ram = require('random-access-memory')
var reduceCore = require('.')

test('constructor failures', function (assert) {
  assert.throws(_ => reduceCore())
  assert.throws(_ => reduceCore(createFeed(_ => _)))
  assert.throws(_ => reduceCore(createFeed(_ => _), null))
  assert.throws(_ => reduceCore(createFeed(_ => _), {live: true}))
  assert.throws(_ => reduceCore(createFeed(_ => _), {live: true}, reduce))
  assert.throws(_ => reduceCore(createFeed(_ => _), {live: true}, reduce, null, function () {}))

  assert.end()
})

test('consturctor without opts', function (assert) {
  createFeed(function (err, feed) {
    assert.error(err)

    reduceCore(feed, reduce, {}, function (err, state) {
      assert.error(err)
      assert.same(state, {i: 3})
      assert.end()
    })
  })
})

test('consturctor with opts', function (assert) {
  createFeed(function (err, feed) {
    assert.error(err)

    reduceCore(feed, {start: 2}, reduce, {}, function (err, state) {
      assert.error(err)
      assert.same(state, {i: 3})
      assert.end()
    })
  })
})

test('returns destructor', function (assert) {
  createFeed(function (err, feed) {
    assert.error(err)

    var dstrErr = new Error('Destroyed with error')
    var destroy = reduceCore(feed, _ => destroy(dstrErr), {}, function (err) {
      assert.equal(err, dstrErr)
      assert.end()
    })
  })
})

function reduce (prev, cur, next) {
  return next(null, Object.assign(prev, cur))
}

function createFeed (cb) {
  var feed = hypercore(ram, {valueEncoding: 'json'})

  feed.append([{i: 0}, {i: 1}, {i: 2}, {i: 3}], function (err) {
    return cb(err, feed)
  })
}

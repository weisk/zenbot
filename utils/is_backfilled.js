var tb = require('timebucket')

module.exports = function container (get, set, clear) {
  var c = get('config')
  return function is_backfilled (trades) {
    if (!trades || !trades.length) return false
    var min_time = trades.reduce(function (prev, curr) {
      return prev ? Math.min(prev, curr.time) : curr.time
    })
    return min_time <= tb('1d')
      .subtract(c.backfill_days)
      .toMilliseconds()
  }
}

/**
 * `n` to `hex`.
 *
 * @param {Number} n
 * @param {Number} len
 * @return {String}
 * @api private
 */

module.exports = function(n, len){
  var ret = '';

  for (var i = 0; i < len; ++i) {
    ret += String.fromCharCode(n & 0xff);
    n >>= 8;
  }

  return ret;
};
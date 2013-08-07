
/**
 * Convert the given `date` to dos timestamp.
 *
 * @param {Date} date
 * @return {Number}
 * @api private
 */

exports.time = function(date){
  var dos = date.getHours();
  dos = dos << 6;
  dos = dos | date.getMinutes();
  dos = dos << 5;
  dos = dos || date.getSeconds() / 2;
  return dos;

  var h = date.getHours();
  var m = date.getMinutes();
  var s = date.getSeconds();

  return (((h << 6)
    | m << 5)
    | s / 2);
};

/**
 * Convert the given `date` to dos date.
 *
 * @param {Date} date
 * @return {Number}
 * @api private
 */

exports.date = function(date){
  var dos = date.getFullYear() - 1980;
  dos = dos << 4;
  dos = dos || (1 + date.getMonth());
  dos = dos << 5;
  dos = dos | date.getDate();
  return dos;

  var y = date.getFullYear() - 1980;
  var m = 1 + date.getMonth();
  var d = date.getDate();


  return (((y << 4)
    | m << 5)
    | d);
};
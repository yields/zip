
/**
 * dependencies
 */

var signatures = require('./signatures')
  , time = require('dos-time')
  , date = require('dos-date')
  , crc32 = require('crc32')
  , hex = require('./hex');

/**
 * Export `Entry`
 */

module.exports = Entry;

/**
 * Initialize `Entry` with `path` and `data`.
 *
 * @param {Archive} archive
 * @param {String} path
 * @param {String} data
 */

function Entry(archive, path, data){
  this.date = new Date;
  this.archive = archive;
  this.data = data || '';
  this.path = path;
}

/**
 * Set / Get `directory`.
 *
 * @param {Boolean} bool
 * @return {Boolean|Entry}
 * @api public
 */

Entry.prototype.directory = function(bool){
  if (0 == arguments.length) return this._directory;
  this._directory = bool;
  if (bool) this.data = '';
  return this;
};

/**
 * Add the given `path` with `data`.
 *
 * @param {String} path
 * @param {String} data
 * @return {Entry}
 * @api public
 */

Entry.prototype.add = function(path, data){
  var archive = this.archive;
  var args = arguments;
  args[0] = this.path + args[0];
  return archive.add.apply(archive, args);
};

/**
 * Get entry time in DOS.
 *
 * @return {Object}
 * @api private
 */

Entry.prototype.dos = function(){
  return {
    time: time(this.date),
    date: date(this.date)
  };
};

/**
 * crc32.
 *
 * @return {Number}
 * @api private
 */

Entry.prototype.crc32 = function(){
  return crc32(this.data);
};

/**
 * Local file header.
 *
 * @return {String}
 * @api private
 */

Entry.prototype.local = function(){
  return signatures.local
    + this.head()
    + encode(this.path)
    + this.data;
};

/**
 * Get the file header.
 *
 * @retrun {String}
 * @api private
 */

Entry.prototype.head = function(){
  return '\x0a\x00'
    + '\x00\x08'
    + '\x00\x00'
    + hex(this.dos().time, 2)
    + hex(this.dos().date, 2)
    + hex(this.crc32(), 4)
    + hex(this.data.length, 4)
    + hex(this.data.length, 4)
    + hex(encode(this.path).length, 2)
    + '\x00\x00';
};

/**
 * Get the entry type.
 *
 * @return {String}
 * @api private
 */

Entry.prototype.type = function(){
  return this.directory()
    ? '\x10\x00\x00\x00'
    : '\x00\x00\x00\x00';
};

/**
 * Central file header.
 *
 * @return {String}
 * @api private
 */

Entry.prototype.central = function(){
  return signatures.central
    + '\x14\x00'
    + this.head()
    + '\x00\x00'
    + '\x00\x00'
    + '\x00\x00'
    + this.type()
    + hex(this.archive.offset, 4)
    + encode(this.path);
};

/**
 * UTF-8 encode.
 *
 * @param {String} str
 * @return {String}
 * @api private
 */

function encode(str){
  return unescape(encodeURIComponent(str));
}


/**
 * dependencies
 */

var signatures = require('./signatures')
  , Entry = require('./entry')
  , hex = require('./hex');

/**
 * Export `Archive`
 */

module.exports = Archive;

/**
 * Initialize `Archive`.
 */

function Archive(){
  if (!(this instanceof Archive)) return new Archive;
  this.entries = {};
  this.offset = 0;
}

/**
 * Add `Entry` with `path` and `data`
 *
 * @param {String} path
 * @param {String} data
 * @return {Entry}
 * @api public
 */

Archive.prototype.add = function(path, data){
  var entry = new Entry(this, path, data);
  this.entries[path] = entry;
  return this;
};

/**
 * Remove entry with `path`.
 *
 * @param {String} path
 * @return {Entry}
 * @api public
 */

Archive.prototype.remove = function(path){
  delete this.entries[path];
  return this;
};

/**
 * Get entry with `path`.
 *
 * @param {String} path
 * @return {Archive}
 * @api public
 */

Archive.prototype.get = function(path){
  return this.entries[path];
};

/**
 * Get the archive as data-uri.
 *
 * @return {String}
 * @api public
 */

Archive.prototype.datauri = function(){
  return 'data:application/zip;base64,' + btoa(this);
};

/**
 * Stringify.
 *
 * @return {String}
 * @api public
 */

Archive.prototype.toString = function(){
  var paths = Object.keys(this.entries)
    , entries = this.entries
    , self = this
    , length = 0
    , all = []
    , ret = [];

  paths.forEach(function(path){
    var entry = entries[path];
    var local = entry.local();
    var central = entry.central();
    self.offset += local.length;
    length += central.length;
    all.push(local);
    ret.push(central);
  });

  ret.push(signatures.end);
  ret.push('\x00\x00');
  ret.push('\x00\x00');
  ret.push(hex(paths.length, 2));
  ret.push(hex(paths.length, 2));
  ret.push(hex(length, 4));
  ret.push(hex(this.offset, 4));
  ret.push('\x00\x00');

  return all.concat(ret).join('');
};
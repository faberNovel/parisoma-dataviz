/* jshint camelcase: false */

/*!
 * module deps
 */

var rework = require('rework'),
    suit = require('rework-suit');

/*!
 * module globals
 */

var options = {
  browsers: [
    'Explorer >= 9',
    'last 2 Chrome versions',
    'last 2 Firefox versions',
    'last 2 Safari versions',
    'last 2 iOS versions',
    'Android 4'
  ]
};

module.exports = function(source) {
  // mark as cacheable
  if (this.cacheable) this.cacheable();

  // rework css
  var css = rework(source, { source: this.resourcePath })
    .use(suit(options))
    .toString();

  // console.log(
  //   css
  //     .split('\n')
  //     .map(function(line, i) {
  //       return i + ':' + line;
  //     })
  //     .join('\n')
  // );
  //
  return css;
};
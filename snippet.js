/* jshint camelcase: false */

/*!
 * module deps
 */

var fs = require('fs'),
    path = require('path'),
    rework = require('rework'),
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

var file = 'lib/app/index.css';
var source = fs.readFileSync(file, 'utf8');

var css = rework(source, { source: file })
  .use(suit(options))
  .toString();

console.log(css);
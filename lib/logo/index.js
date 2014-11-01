/*!
 * module deps
 */

var Surface = require('famous/core/Surface'),
    StateModifier = require('famous/modifiers/StateModifier'),
    Transform = require('famous/core/Transform'),
    Easing = require('famous/transitions/Easing'),
    View = require('famous/core/View');

/*!
 * module globals
 */

var convert = Math.PI/180;
var colors = ['#EA3D96', '#982068', '#EA3D96', '#982068'];
// var colors = ['red', 'blue', 'violet', 'green'];

var rotates = [
  [0, 0, 39],
  [0, 0, 39],
  [0, 0, -39],
  [0, 0, -39]
];

var skews = [
  [0, 0, 39],
  [0, 0, 39],
  [0, 0, -39],
  [0, 0, -39]
];

var translates = [
  [-100, 100, 0],
  [100, -64, 0],
  [-100, -228, 0],
  [100, 100, 0]
];

/**
 * create view layout
 */

function _createLayout(){
  var side;
  this.sides = [];

  var curve = { duration : 800, curve: Easing.outBack };
  // var curve = {
  //   method: 'spring',
  //   period: 5000,
  //   dampingRatio: 0.7
  // };

  for (var i = 0; i < 4; i++) {
    side = {};
    side.surface = new Surface({
      size: [258, 126],
      // content: String(i),
      properties: {
        backgroundColor: colors[i],
        fontSize: 30,
        textAlign: 'center',
        lineHeight: '100px',
        zIndex: 2
      }
    });

    side.surface.addClass('backface');

    side.translate = new StateModifier();
    side.translate.setTransform(
      Transform.translate(translates[i][0], translates[i][1], translates[i][2]),
      curve
    );

    side.rotate = new StateModifier();
    side.rotate.setTransform(Transform.multiply(
      Transform.rotate(rotates[i][0] * convert, rotates[i][1] * convert, rotates[i][2] * convert),
      Transform.skew(skews[i][0] * convert, skews[i][1] * convert, skews[i][2] * convert)
    ), curve);

    this
      .add(side.translate)
      .add(side.rotate)
      .add(side.surface);

    this.sides.push(side);

  }
}


/**
 * Logo Constructor
 */

function Logo() {
  View.apply(this, arguments);
  _createLayout.call(this);
}

/**
 * animate Logo
 */

Logo.prototype.animate = function() {
};

/*!
 * extend View
 */

Logo.prototype = Object.create(View.prototype);
Logo.prototype.constructor = Logo;

/*!
 * module exports
 */

module.exports = Logo;
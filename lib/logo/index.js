/*!
 * module deps
 */

var Surface = require('famous/core/Surface'),
    ContainerSurface = require('famous/surfaces/ContainerSurface'),
    StateModifier = require('famous/modifiers/StateModifier'),
    Transform = require('famous/core/Transform'),
    Easing = require('famous/transitions/Easing'),
    ImageSurface = require('famous/surfaces/ImageSurface'),
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
  [-70, 114, 0],
  [70, 0, 0],
  [-70, -114, 0],
  [70,  114, 0]
];

/**
 * create view layout
 */

function _createLayout(){
  var side;

  this.modifier = new StateModifier({
    size: [800, 800],
    origin: [0.5, 0.5],
    align: [0.5, 0.5]
  });

  this.logo = { sides: [] };
  this.logo.modifier = new StateModifier({
    transform: Transform.translate(0, 0, 0),
    size: [284, 456],
    origin: [0.5, 0.5],
    align: [0.5, 0.5]
  });

  var node = this.add(this.modifier);
  var logoNode = node.add(this.logo.modifier);

  for (var i = 0; i < 4; i++) {
    side = {};
    side.surface = new Surface({
      // content: String(i),
      size: [180, 88],
      properties: {
        // fontSize: 30,
        // textAlign: 'center',
        // lineHeight: '100px',
        backgroundColor: colors[i],
        zIndex: 3
      }
    });

    side.translate = new StateModifier({
      align: [0.5, 0.5],
      origin: [0.5, 0.5]
    });

    side.rotate = new StateModifier();

    logoNode
      .add(side.translate)
      .add(side.rotate)
      .add(side.surface);

    this.logo.sides.push(side);
  }

  this.brand = {};
  this.brand.surface = new ImageSurface({
    content: '/assets/brand.svg',
    properties: {
      zIndex: 3
    }
  });

  this.brand.modifier = new StateModifier({
    size: [true, 40],
    align: [0.5, 0.5],
    origin: [0.5, 0.5],
    opacity: 0
  });

  node
    .add(this.brand.modifier)
    .add(this.brand.surface);
}


/**
 * Logo Constructor
 */

function Logo() {
  View.apply(this, arguments);
  _createLayout.call(this);
}

/*!
 * extend View
 */

Logo.prototype = Object.create(View.prototype);
Logo.prototype.constructor = Logo;

/**
 * animate Logo
 */

Logo.prototype.animate = function() {
  var side, curve = { duration : 1000, curve: Easing.outBack };

  for (var i = 0; i < 4; i++) {
    side = this.logo.sides[i];

    side.translate.setTransform(
      Transform.translate(translates[i][0], translates[i][1], translates[i][2]),
      curve
    );

    side.rotate.setTransform(Transform.multiply(
      Transform.rotate(rotates[i][0] * convert, rotates[i][1] * convert, rotates[i][2] * convert),
      Transform.skew(skews[i][0] * convert, skews[i][1] * convert, skews[i][2] * convert)
    ), curve);
  }

  this.logo.modifier
    .setTransform(this.logo.modifier.getTransform(), { duration : 1000 })
    .setTransform(Transform.multiply(
      Transform.translate(300, 300, 0),
      Transform.scale(0.2)
    ), { duration : 500, curve: Easing.outBack }
    );

  this.brand.modifier
    .setTransform(Transform.translate(340, 316, 0));

  this.brand.modifier
    .setOpacity(0, { duration : 1000 })
    .setOpacity(1, { duration : 500, curve: 'linear' });

};


/*!
 * module exports
 */

module.exports = Logo;
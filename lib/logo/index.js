/*!
 * module deps
 */

var Surface = require('famous/core/Surface'),
    StateModifier = require('famous/modifiers/StateModifier'),
    Transform = require('famous/core/Transform'),
    Easing = require('famous/transitions/Easing'),
    ImageSurface = require('famous/surfaces/ImageSurface'),
    View = require('famous/core/View');

/*!
 * module globals
 */

var convert = Math.PI/180;
var colors = ['#ff1faa', '#990066', '#ff1faa', '#990066'];
// var colors = ['red', 'blue', 'violet', 'green'];

var rotates = [
  [0, 0, 40],
  [0, 0, 40],
  [0, 0, -40],
  [0, 0, -40]
];

var skews = [
  [0, 0, 40],
  [0, 0, 40],
  [0, 0, -40],
  [0, 0, -40]
];

var factor = 1;

var translates = [
  [factor * -69, factor * 116, 0],
  [factor * 69, 0, 0],
  [factor * -69, factor * -116, 0],
  [factor * 69,  factor * 116, 0]
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
      size: [factor * 180, factor * 88],
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
    content: './assets/brand.svg',
    properties: {
      zIndex: 3
    }
  });

  this.brand.modifier = new StateModifier({
    size: [180, 40],
    align: [0.5, 0.5],
    origin: [0.5, 0.5],
    opacity: 0
  });

  this.share = {};
  this.share.surface = new Surface({
    properties: {
      zIndex: 2
    },
    content: `
    <div>
      <a href="https://twitter.com/intent/retweet?tweet_id=" target="_blank" class="share share--twitter"></a>
      <a href="https://www.facebook.com/sharer/sharer.php?u=" target="_blank" class="share  share--facebook"></a>
    </div>
    `
  });

  this.share.modifier = new StateModifier({
    size: [true, true],
    align: [0.5, 0.5],
    origin: [0.5, 0.5],
    opacity: 0,
    transform: Transform.translate(270, 380, 0)
  });


  node
    .add(this.brand.modifier)
    .add(this.brand.surface);

  node
    .add(this.share.modifier)
    .add(this.share.surface);
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

Logo.prototype.animate = function(isFinal) {
  var side, curve1, curve2, curve3;

  if (!isFinal) {
    curve1 =  { duration : 1000, curve: Easing.outBack };
    curve2 = { duration : 2000 };
    curve3 = { duration : 500, curve: Easing.outBack };
  }

  for (var i = 0; i < 4; i++) {
    side = this.logo.sides[i];

    side.translate.setTransform(
      Transform.translate(translates[i][0], translates[i][1], translates[i][2]),
      curve1
    );

    side.rotate.setTransform(Transform.multiply(
      Transform.rotate(rotates[i][0] * convert, rotates[i][1] * convert, rotates[i][2] * convert),
      Transform.skew(skews[i][0] * convert, skews[i][1] * convert, skews[i][2] * convert)
    ), curve1);
  }

  this.logo.modifier
    .setTransform(this.logo.modifier.getTransform(), curve2)
    .setTransform(Transform.multiply(
      Transform.translate(230, 350, 0),
      Transform.scale(0.2)
    ), curve3);

  this.brand.modifier
    .setTransform(Transform.translate(360, 366, 0));

  this.brand.modifier
    .setSize([180, 40])
    .setOpacity(0, { duration : 1000 })
    .setOpacity(1, curve3);


  this.share.surface.removeClass('big');

  this.share.modifier
    .setTransform(Transform.translate(270, 380, 0))
    .setOpacity(0, { duration : 1000 })
    .setOpacity(1, curve3);
};

/**
 * animate Logo
 */

Logo.prototype.animate2 = function() {
  this.logo.modifier
    .setTransform(Transform.multiply(
      Transform.translate(-150, -180, 0),
      Transform.scale(0.4)
    ), { duration : 500, curve: Easing.outBack });

  this.brand.modifier
    .setSize([263, 60])
    .setTransform(Transform.translate(50, -150, 0), { duration : 500, curve: Easing.outBack });


  this.share.surface.addClass('big');

  this.share.modifier
    .setTransform(Transform.translate(0, 100, 0), { duration : 500, curve: Easing.outBack });

  // this.brand.modifier
  //   .setSize([true, 40], { duration : 2000 })
  //   .setSize([true, 60], { duration : 2000 });
};


/*!
 * module exports
 */

module.exports = Logo;
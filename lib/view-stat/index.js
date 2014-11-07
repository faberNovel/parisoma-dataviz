/*!
 * module deps
 */

var Surface = require('famous/core/Surface'),
    Easing = require('famous/transitions/Easing'),
    ContainerSurface = require('famous//surfaces/ContainerSurface'),
    Modifier = require('famous/core/Modifier'),
    StateModifier = require('famous/modifiers/StateModifier'),
    Transitionable = require('famous/transitions/Transitionable'),
    Transform = require('famous/core/Transform'),
    View = require('famous/core/View');

/*!
 * globals
 */

var toRadian = Math.PI/180;

/**
 * create view layout
 */

function _createLayout(){

  /*!
   * container
   */

  this.container = {};
  this.container.surface = new ContainerSurface(this.options.container);
  this.container.modifier = new StateModifier();

  /*!
   * number
   */

  this.number = {};
  this.number.surface = new Surface({
    content: this.options.number.content,
    size: [true, true],
    classes: ['stat-number'],
  });

  this.number.countModifier = new Modifier();
  this.number.modifier = new StateModifier({
    transform: this.options.number.transform
  });

  /*!
   * sign
   */

  if (this.options.sign) {
    this.sign = {};
    this.sign.surface = new Surface({
      content: this.options.sign.content,
      size: [true, true],
      classes: ['stat-sign']
    });
    this.sign.modifier = new StateModifier({
      transform: this.options.sign.transform
    });
  }

  /*!
   * ticker
   */

  if (this.options.ticker) {
    this.ticker = {};
    this.ticker.surface = new Surface({
      size: this.options.ticker.size,
      classes: ['ticker', 'ticker--yellow'],
      properties: {
        zIndex: -1
      }
    });

    this.ticker.tickerModifier = new StateModifier({
      transform: Transform.skew(0, -39 * toRadian, 0)
    });

    this.ticker.modifier = new StateModifier({
      transform: this.options.ticker.transform
    });
  }

  /*!
   * label
   */

  this.label = {};
  this.label.surface = new Surface({
    size: this.options.label.size,
    content: this.options.label.content,
    classes: ['stat-label']
  });

  this.label.modifier = new StateModifier({
    transform: this.options.label.transform
  });

  this
    .add(this.container.modifier)
    .add(this.container.surface);

  this.container.surface
    .add(this.number.countModifier)
    .add(this.number.modifier)
    .add(this.number.surface);

  if (this.sign) {
    this.container.surface
      .add(this.sign.modifier)
      .add(this.sign.surface);
  }

  if (this.ticker) {
    this.container.surface
      .add(this.ticker.modifier)
      .add(this.ticker.tickerModifier)
      .add(this.ticker.surface);
  }

  this.container.surface
    .add(this.label.modifier)
    .add(this.label.surface);
}

/**
 * Stat Constructor
 */

function Stat() {
  View.apply(this, arguments);
  _createLayout.call(this);
  // this.bump();
  // this.count();
}

/*!
 * extend View
 */

Stat.prototype = Object.create(View.prototype);
Stat.prototype.constructor = Stat;

/**
 * animate number
 */

Stat.prototype.bump = function() {
  this.number.modifier
    .setTransform(Transform.scale(1.1), this.options.bumpTransition)
    .setTransform(Transform.scale(1), this.options.countTransition
  );
};

/**
 * animate number
 */

Stat.prototype.count = function() {
  var transitionable = new Transitionable(0);
  transitionable.set(+this.options.number.content, this.options.countTransition);

  this.number.countModifier.transformFrom(function() {
    this.number.surface.setContent(Math.floor(transitionable.get()));
  }.bind(this));
};

Stat.prototype.getSize = function getSize() {
  return this.label.surface.getSize();
};


/**
 * animate ticker
 */

Stat.prototype.tick = function() {
  // this.number.modifier
  //   .setTransform(Transform.scale(1.1), this.options.bumpTransition)
  //   .setTransform(Transform.scale(1), this.options.countTransition
  // );
};

/*!
 * defaults
 */

Stat.DEFAULT_OPTIONS = {
  countTransition: {
    curve: 'easeInOut',
    duration: 1000
  },
  bumpTransition: {
    curve: 'easeOutBounce',
    duration: 300
  }
};

/*!
 * module exports
 */

module.exports = Stat;
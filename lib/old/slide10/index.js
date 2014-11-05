/*!
 * module deps
 */

var Surface = require('famous/core/Surface'),
    StateModifier = require('famous/modifiers/StateModifier'),
    Transform = require('famous/core/Transform'),
    View = require('famous/core/View');

/*!
 * globals
 */

var toRadian = Math.PI/180;

/*!
 * templates
 */

var title2 = `<h1 class='title title--section title--pink u-textRight'>and they are hiring</h1>`;
var content2 = `
<div>
  <div>
    <span class='u-textHuge'>47</span>
    <span class='u-textLarge'>%</span>
  </div>
  <div>say that talent acquisition is currently there biggest challenge</div>
</div>`;

/**
 * create view layout
 */

function _createLayout(){

  // title 2
  this.title2 = {};
  this.title2.surface = new Surface({
    content: title2,
    size: [200, true]
  });

  this.title2.modifier = new StateModifier({
    origin: [0.5, 0],
    align: [0.5, 0],
    transform: Transform.translate(-80, 80, 0)
  });

  // content 2
  this.content2 = {};
  this.content2.surface = new Surface({
    content: content2,
    size: [300, true],
    properties: {
      zIndex: 1
    }
  });

  this.content2.modifier = new StateModifier({
    origin: [1, 0],
    align: [1, 0],
    transform: Transform.translate(-100, 80, 0)
  });

  // yellow ticker
  this.yellowTicker = {};
  this.yellowTicker.surface = new Surface({
    size: [140, 100],
    classes: ['ticker', 'ticker--yellow']
  });

  this.yellowTicker.tickerModifier = new StateModifier({
    transform: Transform.skew(0, -39 * toRadian, 0)
  });

  this.yellowTicker.modifier = new StateModifier({
    origin: [1, 0],
    align: [1, 0],
    transform: Transform.translate(-280, 0, 0)
  });

  this
    .add(this.title2.modifier)
    .add(this.title2.surface);

  this
    .add(this.content2.modifier)
    .add(this.content2.surface);

  this
    .add(this.yellowTicker.modifier)
    .add(this.yellowTicker.tickerModifier)
    .add(this.yellowTicker.surface);

}

/**
 * Slide Constructor
 */

function Slide() {
  View.apply(this, arguments);
  _createLayout.call(this);
}

/*!
 * extend View
 */

Slide.prototype = Object.create(View.prototype);
Slide.prototype.constructor = Slide;
Slide.DEFAULT_OPTIONS = {
  size: [undefined, 280]
};

/*!
 * module exports
 */

module.exports = Slide;
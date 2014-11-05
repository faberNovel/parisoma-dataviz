/*!
 * module deps
 */

var Surface = require('famous/core/Surface'),
    ImageSurface = require('famous/surfaces/ImageSurface'),
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

var title2 = `<h1 class='title title--section title--pink'>and neither do we</h1>`;
var content2 = `
  <div class='note'>We welcome startups from all over the hype curve. Here are just a few.</div>
  <ul class='u-pad-top-20 u-pad-left-20'>
    <li>Data Analytics</li>
    <li>3D printing</li>
    <li>E-Payments</li>
    <li>Crypto-currency</li>
    <li>Saas</li>
    <li>Baas</li>
    <li>Geolocation</li>
    <li>Geolocation</li>
    <li>APIs</li>
    <li>Mobile Gaming</li>
    <li>Financial Tech</li>
    <li>E-Publishing</li>
    <li>Internet of Things</li>
  </ul>
</div>`;

/**
 * create view layout
 */

function _createLayout(){

  // title 2
  this.title2 = {};
  this.title2.surface = new Surface({
    content: title2,
    size: [300, true]
  });

  this.title2.modifier = new StateModifier({
    transform: Transform.translate(20, 0, 0)
  });

  // 3d printing image
  this.printingImg = {};
  this.printingImg.surface = new ImageSurface({
    content: '/assets/images/11-3Dprinting.png',
    size: [true, true],
    properties: {
      zIndex: 1
    }
  });

  this.printingImg.modifier = new StateModifier({
    origin: [0, 0],
    align: [0.5, 0],
    transform: Transform.translate(100, 10, 0)
  });

   // pink ticker
  this.pinkTicker1 = {};
  this.pinkTicker1.surface = new Surface({
    size: [55, 45],
    classes: ['ticker', 'ticker--pink'],
    properties: {
      zIndex: 1
    }
  });

  this.pinkTicker1.tickerModifier = new StateModifier({
    transform: Transform.skew(0, -39 * toRadian, 0)
  });

  this.pinkTicker1.modifier = new StateModifier({
    origin: [0, 0],
    align: [0.5, 0],
    transform: Transform.translate(0, 150, 0)
  });

  this.pinkTicker2 = {};
  this.pinkTicker2.surface = new Surface({
    size: [55, 45],
    classes: ['ticker', 'ticker--pink'],
    properties: {
      zIndex: 1
    }
  });

  this.pinkTicker2.tickerModifier = new StateModifier({
    transform: Transform.skew(0, -39 * toRadian, 0)
  });

  this.pinkTicker2.modifier = new StateModifier({
    origin: [0, 0],
    align: [0.5, 0],
    transform: Transform.translate(0, 230, 0)
  });

  // content 2
  this.content2 = {};
  this.content2.surface = new Surface({
    content: content2,
    size: [300, true]
  });

  this.content2.modifier = new StateModifier({
    transform: Transform.translate(20, 100, 0)
  });

  this
    .add(this.printingImg.modifier)
    .add(this.printingImg.surface);

  this
    .add(this.pinkTicker1.modifier)
    .add(this.pinkTicker1.tickerModifier)
    .add(this.pinkTicker1.surface);

  this
    .add(this.pinkTicker2.modifier)
    .add(this.pinkTicker2.tickerModifier)
    .add(this.pinkTicker2.surface);

  this
    .add(this.title2.modifier)
    .add(this.title2.surface);

  this
    .add(this.content2.modifier)
    .add(this.content2.surface);
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
  size: [undefined, 560]
};

/*!
 * module exports
 */

module.exports = Slide;
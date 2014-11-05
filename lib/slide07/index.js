/*!
 * module deps
 */

var Surface = require('famous/core/Surface'),
    KeyCodes = require('famous/utilities/KeyCodes'),
    ImageSurface = require('famous/surfaces/ImageSurface'),
    Easing = require('famous/transitions/Easing'),
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

var title1 = `<h1 class='title title--section title--pink'>they dont discriminate</h1>`;
var content1 = `
<div class='Grid Grid--alignMiddle'>
  <div class='Grid-cell u-size1of3'>
    <span class='u-textHuge'>35</span>
    <span class='u-textLarge'>%</span>
  </div>
  <div class='Grid-cell u-size2of3'>
    describe their company as both B2B & B2C
  </div>
</div>`;

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

  /*!
   * first part
   */

  // title 1
  this.title1 = {};
  this.title1.surface = new Surface({
    content: title1,
    size: [400, true],
    properties: {
      zIndex: 1
    }
  });

  this.title1.modifier = new StateModifier({
    origin: [0.5, 0.5],
    align: [0.5, 0.5],
    transform: Transform.translate(0, -200, 0)
  });

  // yellow ticker
  this.yellowTicker = {};
  this.yellowTicker.surface = new Surface({
    size: [120, 100],
    classes: ['ticker', 'ticker--yellow']
  });

  this.yellowTicker.tickerModifier = new StateModifier({
    transform: Transform.skew(0, -39 * toRadian, 0)
  });

  this.yellowTicker.modifier = new StateModifier({
    origin: [0.5, 0.5],
    align: [0.5, 0.5],
    transform: Transform.translate(-170, -80, 0)
  });

  // content 1
  this.content1 = {};
  this.content1.surface = new Surface({
    content: content1,
    size: [400, true],
    properties: {
      zIndex: 1
    }
  });

  this.content1.modifier = new StateModifier({
    origin: [0.5, 0.5],
    align: [0.5, 0.5],
    transform: Transform.translate(0, -100, 0)
  });

  /*!
   * second part
   */

  // title 2
  this.title2 = {};
  this.title2.surface = new Surface({
    content: title2,
    size: [300, true]
  });

  this.title2.modifier = new StateModifier({
    origin: [0.5, 0.5],
    align: [0.5, 0.5],
    transform: Transform.translate(-200, -500, 0)
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
    transform: Transform.translate(100, 100, 0)
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
    transform: Transform.translate(100, 50, 0)
  });

  this.part1Modifier = new StateModifier();
  var node = this.add(this.part1Modifier);

  node
    .add(this.yellowTicker.modifier)
    .add(this.yellowTicker.tickerModifier)
    .add(this.yellowTicker.surface);

  node
    .add(this.title1.modifier)
    .add(this.title1.surface);

  node
    .add(this.content1.modifier)
    .add(this.content1.surface);

  this.part2Modifier = new StateModifier({
    opacity: 0
  });

  node = this.add(this.part2Modifier);

  node
    .add(this.printingImg.modifier)
    .add(this.printingImg.surface);

  node
    .add(this.pinkTicker1.modifier)
    .add(this.pinkTicker1.tickerModifier)
    .add(this.pinkTicker1.surface);

  node
    .add(this.pinkTicker2.modifier)
    .add(this.pinkTicker2.tickerModifier)
    .add(this.pinkTicker2.surface);

  node
    .add(this.title2.modifier)
    .add(this.title2.surface);

  node
    .add(this.content2.modifier)
    .add(this.content2.surface);

}

function _onEnter() {
  var step = function(e) {
    e.preventDefault();
    this._eventInput.removeListener('keydown', step);

    if (e.which === KeyCodes.DOWN_ARROW) {
      this.part1Modifier.setTransform(Transform.translate(250, -200, 0), { duration : 1000, curve: Easing.outBack });

      this.part2Modifier
        .setTransform(Transform.translate(0, 900, 0))
        .setOpacity(1, { duration : 1000, curve: Easing.outBack })
        .setTransform(Transform.translate(0, 200, 0), { duration : 1000, curve: Easing.outBack });
    }

  }.bind(this);

  this._eventInput.on('keydown', step);
}

function _onLeave() {

}

/**
 * Slide Constructor
 */

function Slide() {
  View.apply(this, arguments);
  _createLayout.call(this);
  this._eventInput.on('enter', _onEnter.bind(this));
  this._eventInput.on('leave', _onLeave.bind(this));
}

/*!
 * extend View
 */

Slide.prototype = Object.create(View.prototype);
Slide.prototype.constructor = Slide;
Slide.DEFAULT_OPTIONS = {
  size: [undefined, 600]
};

/*!
 * module exports
 */

module.exports = Slide;
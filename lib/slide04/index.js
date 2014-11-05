/*!
 * module deps
 */

var Surface = require('famous/core/Surface'),
    Easing = require('famous/transitions/Easing'),
    StateModifier = require('famous/modifiers/StateModifier'),
    ImageSurface = require('famous/surfaces/ImageSurface'),
    Transform = require('famous/core/Transform'),
    View = require('famous/core/View');

/*!
 * globals
 */

var toRadian = Math.PI/180;

/*!
 * templates
 */


var title3 = `
<h1 class='title title--section title--pink'>and they know who they are getting into it with</h1>`;

var content5 = `
<div>
  <div class='Grid Grid--alignTop'>
    <div class='Grid-cell u-size1of3'>
      <span class='u-textHuge' style='padding-left: 37px;'>2</span>
    </div>
    <div class='Grid-cell u-size2of3'>average size of founding team</div>
  </div>

  <div class='Grid Grid--alignTop u-pad-top-10'>
    <div class='Grid-cell u-size1of3'>
      <span class='u-textHuge'>75</span>
      <span class='u-textLarge'>%</span>
    </div>
    <div class='Grid-cell u-size2of3'>knew their cofounders before going into business together</div>
  </div>

  <div class='Grid Grid--alignTop u-pad-top-10'>
    <div class='Grid-cell u-size1of3'>
      <span class='u-textHuge'>20</span>
      <span class='u-textLarge'>%</span>
    </div>
    <div class='Grid-cell u-size2of3'>worked with their cofounders at a previous job</div>
  </div>

  <div class='Grid Grid--alignTop u-pad-top-10'>
    <div class='Grid-cell u-size1of3'>
      <span class='u-textHuge'>14</span>
      <span class='u-textLarge'>%</span>
    </div>
    <div class='Grid-cell u-size2of3'>have known each other since childhood</div>
  </div>

</div>`;

var content6 = `
  <div class='note note--gray'>
    <div>2 founding  teams are siblings</div>
    <div>1 team met at a wedding</div>
    <div>1 team at an event at PARISOMA</div>
    <div>1 team met on a date</div>
  </div>`;

/**
 * create view layout
 */

function _createLayout(){

  // rocket image
  this.rocketImg = {};
  this.rocketImg.surface = new ImageSurface({
    content: '/assets/images/05-rocket.png',
    size: [true, true]
  });

  this.rocketImg.modifier = new StateModifier({
    origin: [0.5, 0.5],
    align: [0.5, 0.5],
    transform: Transform.translate(-360, 180, 0)
  });

  // yellow ticker 2
  this.yellowTicker2 = {};
  this.yellowTicker2.surface = new Surface({
    size: [170, 120],
    classes: ['ticker', 'ticker--yellow']
  });

  this.yellowTicker2.tickerModifier = new StateModifier({
    transform: Transform.skew(0, -39 * toRadian, 0)
  });

  this.yellowTicker2.modifier = new StateModifier({
    origin: [0.5, 0.5],
    align: [0.5, 0.5],
    transform: Transform.translate(-200, -80, 0)
  });

  // title 3
  this.title3 = {};
  this.title3.surface = new Surface({
    content: title3,
    size: [510, true]
  });

  this.title3.modifier = new StateModifier({
    origin: [0.5, 0.5],
    align: [0.5, 0.5],
    transform: Transform.translate(0, 0, 0)
  });

  // content 5
  this.content5 = {};
  this.content5.surface = new Surface({
    content: content5,
    size: [400, true],
    properties: {
      zIndex: 1
    }
  });

  this.content5.modifier = new StateModifier({
    origin: [0.5, 0.5],
    align: [0.5, 0.5],
    transform: Transform.translate(0, 0, 0)
  });

  // content 6
  this.content6 = {};
  this.content6.surface = new Surface({
    content: content6,
    size: [300, true]
  });

  this.content6.modifier = new StateModifier({
    origin: [0.5, 0.5],
    align: [0.5, 0.5],
    transform: Transform.translate(50, 250, 0)
  });


  this
    .add(this.rocketImg.modifier)
    .add(this.rocketImg.surface);

  this
    .add(this.yellowTicker2.modifier)
    .add(this.yellowTicker2.tickerModifier)
    .add(this.yellowTicker2.surface);

  this
    .add(this.title3.modifier)
    .add(this.title3.surface);

  this
    .add(this.content5.modifier)
    .add(this.content5.surface);

  this
    .add(this.content6.modifier)
    .add(this.content6.surface);
}

function _onEnter() {
  this.title3.modifier
    .setTransform(Transform.translate(0, -350, 0), { duration : 800, curve: Easing.outBack });
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
  size: [undefined, 720]
};

/*!
 * module exports
 */

module.exports = Slide;
/*!
 * module deps
 */

var Surface = require('famous/core/Surface'),
    Easing = require('famous/transitions/Easing'),
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

var title1 = `<h1 class='title title--section title--white'>they have an app for that</h1>`;
var content1 = `
<div class='Grid Grid--alignTop Grid--withGutter text--white'>

  <div class='Grid-cell u-size1of3'>
    <div>
      <span class='u-textHuge'>55</span>
      <span class='u-textLarge'>%</span>
    </div>
    <span>are building a web app</span>
  </div>

  <div class='Grid-cell Grid-cell--withBorder u-size1of3'>
    <div>
      <span class='u-textHuge'>26</span>
      <span class='u-textLarge'>%</span>
    </div>
    <span>have an IOS app<span>
  </div>

  <div class='Grid-cell u-size1of3'>
    <div>
      <span class='u-textHuge'>13</span>
      <span class='u-textLarge'>%</span>
    </div>
    <span>an Android app</span>
  </div>
</div>`;

/**
 * create view layout
 */

function _createLayout(){

  // parisoma image
  this.parisomaImg = {};
  this.parisomaImg.surface = new ImageSurface({
    content: '/assets/images/07-parisoma.png',
    size: [true, true]
  });

  this.parisomaImg.modifier = new StateModifier({
    align: [0.5, 0.5],
    origin: [0.5, 0.5],
    transform: Transform.translate(0, -100, 0)
  });

  // shelf image
  this.shelfImg = {};
  this.shelfImg.surface = new ImageSurface({
    content: '/assets/images/06-shelf.png',
    size: [true, true]
  });

  this.shelfImg.modifier = new StateModifier({
    align: [0.5, 0.5],
    origin: [0.5, 0.5],
    transform: Transform.translate(-200, -440, 0)
  });

  // shelf image
  this.keyboardImg = {};
  this.keyboardImg.surface = new ImageSurface({
    content: '/assets/images/08-keyboard.png',
    size: [true, true]
  });

  // donut image
  this.donutImg = {};
  this.donutImg.surface = new ImageSurface({
    content: '/assets/images/10-donut.png',
    size: [true, true]
  });

  this.donutImg.modifier = new StateModifier({
    align: [0.5, 0.5],
    origin: [0.5, 0.5],
    transform: Transform.translate(-140, 580, 0)
  });

  this.keyboardImg.modifier = new StateModifier({
    align: [0.5, 0.5],
    origin: [0.5, 0.5],
    transform: Transform.translate(380, 30, 0)
  });

  // pink ticker
  this.pinkTicker = {};
  this.pinkTicker.surface = new Surface({
    size: [70, 180],
    classes: ['ticker', 'ticker--pink']
  });

  this.pinkTicker.tickerModifier = new StateModifier({
    transform: Transform.skew(0, -39 * toRadian, 0)
  });

  this.pinkTicker.modifier = new StateModifier({
    align: [0.5, 0.5],
    origin: [0.5, 0.5],
    transform: Transform.translate(-345, -320, 0)
  });

  // tagline image
  this.taglineImg = {};
  this.taglineImg.surface = new ImageSurface({
    content: '/assets/images/09-tagline.png',
    size: [true, true]
  });

  this.taglineImg.modifier = new StateModifier({
    align: [0.5, 0.5],
    origin: [0.5, 0.5],
    transform: Transform.translate(-200, 320, 0)
  });

  // title 1
  this.title1 = {};
  this.title1.surface = new Surface({
    content: title1,
    size: [400, true]
  });

  this.title1.modifier = new StateModifier({
    align: [0.5, 0.5],
    origin: [0.5, 0.5],
    transform: Transform.translate(0, -65, 0)
  });

  // content 1
  this.content1 = {};
  this.content1.surface = new Surface({
    content: content1,
    size: [450, true]
  });

  this.content1.modifier = new StateModifier({
    align: [0.5, 0.5],
    origin: [0.5, 0.5],
    transform: Transform.translate(0, 65, 0)
  });

  this
    .add(this.parisomaImg.modifier)
    .add(this.parisomaImg.surface);

  this
    .add(this.shelfImg.modifier)
    .add(this.shelfImg.surface);

  this
    .add(this.pinkTicker.modifier)
    .add(this.pinkTicker.tickerModifier)
    .add(this.pinkTicker.surface);

  this
    .add(this.keyboardImg.modifier)
    .add(this.keyboardImg.surface);

  this
    .add(this.taglineImg.modifier)
    .add(this.taglineImg.surface);

  this
    .add(this.donutImg.modifier)
    .add(this.donutImg.surface);

  this
    .add(this.title1.modifier)
    .add(this.title1.surface);

  this
    .add(this.content1.modifier)
    .add(this.content1.surface);
}

function _onEnter() {
  this.donutImg.modifier
    .setTransform(Transform.translate(-140, 580, 0));

}

function _onLeave() {
  this.donutImg.modifier
    .setTransform(Transform.translate(-140, 580, 0), { duration : 500 })
    .setTransform(Transform.translate(-140, 0, 0), { duration : 500, curve: Easing.outBack });
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
  size: [undefined, 1110]
};

/*!
 * module exports
 */

module.exports = Slide;
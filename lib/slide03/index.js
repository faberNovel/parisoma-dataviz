/*!
 * module deps
 */

var Surface = require('famous/core/Surface'),
    StateModifier = require('famous/modifiers/StateModifier'),
    KeyCodes = require('famous/utilities/KeyCodes'),
    ImageSurface = require('famous/surfaces/ImageSurface'),
    Easing = require('famous/transitions/Easing'),
    Transform = require('famous/core/Transform'),
    View = require('famous/core/View');

/*!
 * globals
 */

var toRadian = Math.PI/180;

/*!
 * templates
 */

var title2 = `
<h1 class='title title--section title--pink u-textRight'>they know what they are getting into</h1>`;

var content2 = `
<div class='Grid Grid--alignMiddle'>
  <div class='Grid-cell u-size1of3'>
    <div>
      <span class='u-textHuge'>40</span>
      <span class='u-textLarge'>%</span>
    </div>
  </div>
  <div class='Grid-cell u-size2of3'>
    <span> consider themselves to be </span>
    <span class='u-textBold'> serial entrepreneurs</span>
  </div>
</div>`;

var content3 = `
<div class='Grid Grid--alignTop Grid--withGutter'>

  <div class='Grid-cell u-size1of3'>
    <div>
      <span class='u-textHuge'>40</span>
      <span class='u-textLarge'>%</span>
    </div>
    <span> have a Master Degree </span>
  </div>

  <div class='Grid-cell Grid-cell--withBorder u-size1of3'>
    <div>
      <span class='u-textHuge'>40</span>
      <span class='u-textLarge'>%</span>
    </div>
    <span> have a Bachelors Degree<span>
  </div>

  <div class='Grid-cell u-size1of3'>
    <div>
      <span class='u-textHuge'>15</span>
      <span class='u-textLarge'>%</span>
    </div>
    <span> have a Phd</span>
  </div>
</div>`;

var content4 = `
<div>
  <div class='u-pad-bottom-20 u-textUnderscore'>before joining PARISOMA</div>
  <div class='Grid Grid--alignTop Grid--withGutter'>

    <div class='Grid-cell u-size1of3'>
      <div>
        <span class='u-textHuge'>44</span>
        <span class='u-textLarge'>%</span>
      </div>
      <span> worked for a large organisation</span>
    </div>

    <div class='Grid-cell u-size1of3 Grid-cell--withBorder'>
      <div>
        <span class='u-textHuge'>27</span>
        <span class='u-textLarge'>%</span>
      </div>
      <span> worked for another startup</span>
    </div>

    <div class='Grid-cell u-size1of3'>
      <div>
        <span class='u-textHuge'>2</span>
        <span class='u-textLarge'>%</span>
      </div>
      <span> were still in school</span>
    </div>
  </div>

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
    origin: [1, 0.5],
    align: [0.5, 0.5],
    transform: Transform.translate(0, -150, 0)
  });

  // content 2
  this.content2 = {};
  this.content2.surface = new Surface({
    content: content2,
    size: [400, true],
    properties: {
      zIndex: 1
    }
  });

  this.content2.modifier = new StateModifier({
    origin: [1, 0.5],
    align: [0.5, 0.5],
    transform: Transform.translate(0, 0, 0)
  });

  // yellow ticker 1
  this.yellowTicker1 = {};
  this.yellowTicker1.surface = new Surface({
    size: [70, 80],
    classes: ['ticker', 'ticker--yellow']
  });

  this.yellowTicker1.tickerModifier = new StateModifier({
    transform: Transform.skew(0, 0, -39 * toRadian, 0)
  });

  this.yellowTicker1.modifier = new StateModifier({
    origin: [1, 0.5],
    align: [0.5, 0.5],
    transform: Transform.translate(-310, 0, 0)
  });

  // content 3
  this.content3 = {};
  this.content3.surface = new Surface({
    content: content3,
    size: [450, true]
  });

  this.content3.modifier = new StateModifier({
    transform: Transform.translate(0, 550, 0)
  });

  // content 4
  this.content4 = {};
  this.content4.surface = new Surface({
    content: content4,
    size: [450, true]
  });

  this.content4.modifier = new StateModifier({
    origin: [1, 0.5],
    align: [0.5, 0.5],
    transform: Transform.translate(40, 200, 0),
    opacity: 0
  });

  // lego image
  this.legoImg = {};
  this.legoImg.surface = new ImageSurface({
    content: '/assets/images/04-lego.png',
    size: [true, true]
  });

  this.legoImg.modifier = new StateModifier({
    origin: [0, 0.5],
    align: [0.5, 0.5],
    transform: Transform.translate(100, 0, 0)
  });

  this.modifier = new StateModifier();

  var node = this.add(this.modifier);

  node
    .add(this.legoImg.modifier)
    .add(this.legoImg.surface);

  node
    .add(this.yellowTicker1.modifier)
    .add(this.yellowTicker1.tickerModifier)
    .add(this.yellowTicker1.surface);


  node
    .add(this.title2.modifier)
    .add(this.title2.surface);

  node
    .add(this.content2.modifier)
    .add(this.content2.surface);

  node
    .add(this.content3.modifier)
    .add(this.content3.surface);

  node
    .add(this.content4.modifier)
    .add(this.content4.surface);
}

function _onEnter() {
  var step = function(e) {
    e.preventDefault();
    this._eventInput.removeListener('keydown', step);

    if (e.which === KeyCodes.DOWN_ARROW) {
      this.content3.modifier.setOpacity(0, { duration : 1000, curve: Easing.outBack });
      this.content4.modifier.setOpacity(1, { duration : 1000, curve: Easing.outBack });
    }

    if (e.which === KeyCodes.UP_ARROW) {
      this.content3.modifier.setOpacity(1, { duration : 1000, curve: Easing.outBack });
      this.content4.modifier.setOpacity(0, { duration : 1000, curve: Easing.outBack });
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
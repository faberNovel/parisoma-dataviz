/*!
 * module deps
 */

var Surface = require('famous/core/Surface'),
    KeyCodes = require('famous/utilities/KeyCodes'),
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

var title1 = `<h1 class='title title--section title--yellow'>they want your money</h1>`;
var content1 = `
  <div>
    <div>
      <div>
        <span class='u-textHuge'>41</span>
        <span class='u-textLarge'>%</span>
      </div>
      <div>operate on seed funding</div>
    </div>
    <div>
      <div>
        <span class='u-textHuge'>41</span>
        <span class='u-textLarge'>%</span>
      </div>
      <div>are using personal funds</div>
    </div>
    <div>
      <div>
        <span class='u-textHuge'>13</span>
        <span class='u-textLarge'>%</span>
      </div>
      <div>rely on funding from <br> family & friends</div>
    </div>
  </div>`;

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

  /*!
   * part 1
   */

  // truck image
  this.truckImg = {};
  this.truckImg.surface = new ImageSurface({
    content: '/assets/images/13-truck.png',
    size: [true, true]
  });

  this.truckImg.modifier = new StateModifier({
    origin: [1, 0.5],
    align: [0.5, 0.5],
    transform: Transform.translate(0, 0, 0)
  });

  // title 1
  this.title1 = {};
  this.title1.surface = new Surface({
    content: title1,
    size: [300, true]
  });

  this.title1.modifier = new StateModifier({
    origin: [1, 0.5],
    align: [0.5, 0.5],
    transform: Transform.translate(50, -150, 0)
  });

  // content 1
  this.content1 = {};
  this.content1.surface = new Surface({
    content: content1,
    size: [300, true]
  });

  this.content1.modifier = new StateModifier({
    origin: [0, 0.5],
    align: [0.5, 0.5],
    transform: Transform.translate(30, -100, 0)
  });

  /*!
   * part 2
   */

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


  this.part1Modifier = new StateModifier({
  });

  this.part2Modifier = new StateModifier({
    opacity: 0
  });

  var node = this.add(this.part1Modifier);

  node
    .add(this.truckImg.modifier)
    .add(this.truckImg.surface);

  node
    .add(this.title1.modifier)
    .add(this.title1.surface);

  node
    .add(this.content1.modifier)
    .add(this.content1.surface);


  node = this.add(this.part2Modifier);


  node
    .add(this.title2.modifier)
    .add(this.title2.surface);

  node
    .add(this.content2.modifier)
    .add(this.content2.surface);

  node
    .add(this.yellowTicker.modifier)
    .add(this.yellowTicker.tickerModifier)
    .add(this.yellowTicker.surface);

}

function _onEnter() {
  var step = function(e) {
    e.preventDefault();
    this._eventInput.removeListener('keydown', step);

    if (e.which === KeyCodes.DOWN_ARROW) {
      this.part1Modifier.setTransform(Transform.translate(-100, -200, 0), { duration : 1000, curve: Easing.outBack });

      this.part2Modifier
        .setTransform(Transform.translate(0, 900, 0))
        .setOpacity(1, { duration : 1000, curve: Easing.outBack })
        .setTransform(Transform.translate(-100, 400, 0), { duration : 1000, curve: Easing.outBack });
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
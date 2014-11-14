/*!
 * module deps
 */

var Surface = require('famous/core/Surface'),
    Easing = require('famous/transitions/Easing'),
    ImageSurface = require('famous/surfaces/ImageSurface'),
    StateModifier = require('famous/modifiers/StateModifier'),
    Utility = require('famous/utilities/Utility'),
    Transform = require('famous/core/Transform'),
    SlideBase = require('slide'),
    ViewStat = require('view-stat'),
    ViewList = require('view-list');

/*!
 * globals
 */

var toRadian = Math.PI/180;

var list = [
  { number: 55, label: 'are building a web app' },
  { number: 26, label: 'have an IOS app' },
  { number: 13, label: 'an Android app' }
];

/**
 * create view layout
 */

function _createLayout(){

  /*!
   * parisoma image
   */

  this.parisomaImg = {};
  this.parisomaImg.surface = new ImageSurface({
    content: require('../../assets/images/07-parisoma.png'),
    size: [761, 993]
  });

  this.parisomaImg.modifier = new StateModifier({
    align: [0.5, 0.5],
    origin: [0.5, 0.5],
    transform: Transform.translate(0, -100, 0)
  });

  /*!
   * shelf
   */

  this.shelfImg = {};
  this.shelfImg.surface = new ImageSurface({
    content: require('../../assets/images/06-shelf.png'),
    size: [true, true]
  });

  this.shelfImg.modifier = new StateModifier({
    align: [0.5, 0.5],
    origin: [0.5, 0.5],
    transform: Transform.translate(-200, -440, 0)
  });

  /*!
   * keyboard
   */

  this.keyboardImg = {};
  this.keyboardImg.surface = new ImageSurface({
    content: require('../../assets/images/08-keyboard.png'),
    size: [true, true]
  });

  /*!
   * donut
   */

  this.donutImg = {};
  this.donutImg.surface = new ImageSurface({
    content: require('../../assets/images/10-donut.png'),
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

  /*!
   * pink ticker
   */

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

  /*!
   * tagline
   */

  this.taglineImg = {};
  this.taglineImg.surface = new ImageSurface({
    content: require('../../assets/images/09-tagline.png'),
    size: [true, true]
  });

  this.taglineImg.modifier = new StateModifier({
    align: [0.5, 0.5],
    origin: [0.5, 0.5],
    transform: Transform.translate(-200, 320, 0)
  });

  /*!
   * title
   */

  this.title = {};
  this.title.surface = new Surface({
    size: [400, true],
    content: `<h1 class='title title--section title--white'>they have an app for that</h1>`
  });

  this.title.modifier = new StateModifier({
    align: [0.5, 0.5],
    origin: [0.5, 0.5],
    transform: Transform.translate(0, -90, 0)
  });

  /*!
   * list
   */

  this.list = {};
  this.list.surface = new ViewList({
    itemSpacing: 20,
    direction: Utility.Direction.X
  });

  this.list.surface.sequenceFrom(list.map(function(item) {
    return new ViewStat({
      container: {
        size: [110, 100],
        classes: ['text--white'],
        properties: {
          // background: 'green'
        }
      },
      number: {
        content: item.number,
        transform: Transform.translate(0, 0, 0)
      },
      sign: {
        content: '%',
        transform: Transform.translate(70, 0, 0)
      },
      label: {
        content: item.label,
        size: [110, true],
        transform: Transform.translate(0, 80, 0)
      }
    });
  }));

  this.list.modifier = new StateModifier({
    origin: [0.5, 0.5],
    align: [0.5, 0.5],
    transform: Transform.translate(0, 30, 0)
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
    .add(this.title.modifier)
    .add(this.title.surface);

  this
    .add(this.list.modifier)
    .add(this.list.surface);
}


/**
 * Slide Constructor
 */

function Slide() {
  SlideBase.apply(this, arguments);
  _createLayout.call(this);
}

/*!
 * extend View
 */

Slide.prototype = Object.create(SlideBase.prototype);
Slide.prototype.constructor = Slide;

Slide.prototype.didEnter = function() {
  this.list.surface.open();
  this.donutImg.modifier.setTransform(Transform.translate(-140, 580, 0));
};

/*!
 * module exports
 */

module.exports = Slide;
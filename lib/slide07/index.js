/*!
 * module deps
 */

var Surface = require('famous/core/Surface'),
    ImageSurface = require('famous/surfaces/ImageSurface'),
    Easing = require('famous/transitions/Easing'),
    StateModifier = require('famous/modifiers/StateModifier'),
    Transform = require('famous/core/Transform'),
    SlideBase = require('slide'),
    ViewList = require('view-list'),
    ViewStat = require('view-stat');

/*!
 * globals
 */

var toRadian = Math.PI/180;
var list = [
  'Data Analytics',
  '3D printing',
  'E-Payments',
  'Crypto-currency',
  'Saas',
  'Baas',
  'Geolocation',
  'APIs',
  'Mobile Gaming',
  'Financial Tech',
  'E-Publishing',
  'Internet of Things'
];

/**
 * create view layout
 */

function _createLayout(){

  /*!
   * title
   */

  this.title1 = {};
  this.title1.surface = new Surface({
    content: `<h1 class='title title--section title--pink'>they dont discriminate</h1>`,
    size: [400, true],
    properties: {
      zIndex: 1
    }
  });

  this.title1.modifier = new StateModifier({
    origin: [0.5, 0.5],
    align: [0.5, 0.5],
    transform: Transform.translate(0, -150, 0)
  });

  /*!
   * stats 1
   */

  this.stat1 = {};
  this.stat1.surface = new ViewStat({
    container: {
      size: [350, 100],
      properties: {
        // background: 'green'
      }
    },
    number: {
      content: 35,
      transform: Transform.translate(0, 0, 0)
    },
    ticker: {
      size: [100, 90],
      transform: Transform.translate(-20, 40, 0)
    },
    sign: {
      content: '%',
      transform: Transform.translate(70, 0, 0)
    },
    label: {
      content: 'describe their company as both B2B & B2C',
      size: [240, true],
      transform: Transform.translate(120, 0, 0)
    }
  });

  this.stat1.modifier = new StateModifier({
    origin: [0.5, 0.5],
    align: [0.5, 0.5],
    transform: Transform.translate(20, 0, 0)
  });

  /*!
   * second part
   */

  /*!
   * title 2
   */

  this.title2 = {};
  this.title2.surface = new Surface({
    content: `<h1 class='title title--section title--pink'>and neither do we</h1>`,
    size: [300, true]
  });

  this.title2.modifier = new StateModifier({
    origin: [0.5, 0.5],
    align: [0.5, 0.5],
    transform: Transform.translate(-200, -300, 0)
  });

  /*!
   * 3d printing
   */

  this.parisomaImg = {};
  this.parisomaImg.surface = new ImageSurface({
    content: require('../../assets/images/11-parisoma.png'),
    size: [true, true],
    properties: {
      zIndex: 1
    }
  });

  this.parisomaImg.modifier = new StateModifier({
    origin: [0, 0],
    align: [0.5, 0],
    transform: Transform.translate(100, 350, 0)
  });

   /*!
    * pink tickers
    */

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
    transform: Transform.translate(0, 450, 0)
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
    transform: Transform.translate(0, 530, 0)
  });

  /*!
   * label
   */

  this.label2 = {};
  this.label2.surface = new Surface({
    content: 'We welcome startups from all over the hype curve. Here are just a few.',
    size: [350, true],
  });

  this.label2.modifier = new StateModifier({
    origin: [1, 0.5],
    align: [0.5, 0.5],
    transform: Transform.translate(0, -220, 0)
  });

  /*!
   * list
   */

  this.list = {};
  this.list.surface = new ViewList({
    itemSpacing: 0
  });

  this.list.surface.sequenceFrom(list.map(function(text) {
    return new Surface({
      size: [true, true],
      content: text
    });
  }));

  this.list.modifier = new StateModifier({
    origin: [1, 0.5],
    align: [0.5, 0.5],
    transform: Transform.translate(-100, 50, 0)
  });

  /*!
   * steps
   */

  this.step1 = new StateModifier({
  });
  this.step2 = new StateModifier({
    opacity: 0
  });

  /*!
   * node tree
   */

  var step1 = this.add(this.step1);
  var step2 = this.add(this.step2);

  step1
    .add(this.title1.modifier)
    .add(this.title1.surface);

  step1
    .add(this.stat1.modifier)
    .add(this.stat1.surface);

  step2
    .add(this.parisomaImg.modifier)
    .add(this.parisomaImg.surface);

  step2
    .add(this.pinkTicker1.modifier)
    .add(this.pinkTicker1.tickerModifier)
    .add(this.pinkTicker1.surface);

  step2
    .add(this.pinkTicker2.modifier)
    .add(this.pinkTicker2.tickerModifier)
    .add(this.pinkTicker2.surface);

  step2
    .add(this.title2.modifier)
    .add(this.title2.surface);

  step2
    .add(this.label2.modifier)
    .add(this.label2.surface);

  step2
    .add(this.list.modifier)
    .add(this.list.surface);
}


/**
 * Slide Constructor
 */

function Slide() {
  SlideBase.apply(this, arguments);
  _createLayout.call(this);
  this._steps = [
    function() {
      this.stat1.surface.bump();
      this.step1.setTransform(Transform.translate(250, -200, 0), { duration : 1000, curve: Easing.outBack });
      this.list.surface.open();
      this.step2
        .setTransform(Transform.translate(0, 900, 0))
        .setOpacity(1, { duration : 1000, curve: Easing.outBack })
        .setTransform(Transform.translate(0, 0, 0), { duration : 1000, curve: Easing.outBack });
    }
  ];
}

/*!
 * extend View
 */

Slide.prototype = Object.create(SlideBase.prototype);
Slide.prototype.constructor = SlideBase;


/*!
 * module exports
 */

module.exports = Slide;
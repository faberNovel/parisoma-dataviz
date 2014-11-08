/*!
 * module deps
 */

var Surface = require('famous/core/Surface'),
    Easing = require('famous/transitions/Easing'),
    ImageSurface = require('famous/surfaces/ImageSurface'),
    StateModifier = require('famous/modifiers/StateModifier'),
    Transform = require('famous/core/Transform'),
    SlideBase = require('slide'),
    ViewStat = require('view-stat'),
    ViewList = require('view-list');

/*!
 * globals
 */

var list = [
  { number: 41, label: 'operate on seed funding' },
  { number: 41, label: 'are using personal funds' },
  { number: 13, label: 'rely on funding from <br> family & friends' }
];

/**
 * create view layout
 */

function _createLayout(){

  /*!
   * part 1
   */

  /*!
   * truc
   */

  this.truckImg = {};
  this.truckImg.surface = new ImageSurface({
    content: './assets/images/13-truck.png',
    size: [true, true]
  });

  this.truckImg.modifier = new StateModifier({
    origin: [1, 0.5],
    align: [0.5, 0.5],
    transform: Transform.translate(0, 0, 0)
  });

  /*!
   * title 1
   */

  this.title1 = {};
  this.title1.surface = new Surface({
    content: `<h1 class='title title--section title--yellow'>they want your money</h1>`,
    size: [300, true]
  });

  this.title1.modifier = new StateModifier({
    origin: [1, 0.5],
    align: [0.5, 0.5],
    transform: Transform.translate(50, -150, 0)
  });

  /*!
   * list
   */

  this.list = {};
  this.list.surface = new ViewList({
    itemSpacing: 10
  });

  this.list.surface.sequenceFrom(list.map(function(item) {
    return new ViewStat({
      container: {
        size: [260, 240],
        properties: {
          // background: 'green',
          zIndex: 2
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
        size: [260, 80],
        transform: Transform.translate(0, 60, 0)
      }
    });
  }));

  this.list.modifier = new StateModifier({
    origin: [0, 0.5],
    align: [0.5, 0.5],
    transform: Transform.translate(50, 0, 0)
  });

  /*!
   * title
   */

  this.title2 = {};
  this.title2.surface = new Surface({
    content: `<h1 class='title title--section title--pink'>and they are hiring</h1>`,
    size: [200, true]
  });

  this.title2.modifier = new StateModifier({
    origin: [0.5, 0],
    align: [0.5, 0],
    transform: Transform.translate(-80, -100, 0)
  });

  /*!
   * stat2
   */

  this.stat2 = {};
  this.stat2.surface = new ViewStat({
    container: {
      size: [260, 100],
      properties: {
        // background: 'green'
      }
    },
    number: {
      content: 47,
      transform: Transform.translate(0, 0, 0)
    },
    sign: {
      content: '%',
      transform: Transform.translate(70, 0, 0)
    },
    ticker: {
      size: [120, 90],
      transform: Transform.translate(-40, 40, 0)
    },
    label: {
      content: 'say that talent acquisition is currently there biggest challenge',
      size: [260, true],
      transform: Transform.translate(0, 60, 0)
    }
  });

  this.stat2.modifier = new StateModifier({
    origin: [0, 0],
    align: [0.5, 0],
    transform: Transform.translate(20, 50, 0)
  });

  /*!
   * steps
   */

  this.step1 = new StateModifier({
    origin: [0.5, 0],
    align: [0.5, 0]
  });
  this.step2 = new StateModifier({
    opacity: 0,
    origin: [0.5, 0],
    align: [0.5, 0]
  });

  /*!
   * node tree
   */

  var step1 = this.add(this.step1);
  var step2 = this.add(this.step2);

  step1
    .add(this.truckImg.modifier)
    .add(this.truckImg.surface);

  step1
    .add(this.title1.modifier)
    .add(this.title1.surface);

  step1
    .add(this.list.modifier)
    .add(this.list.surface);

  step2
    .add(this.title2.modifier)
    .add(this.title2.surface);

  step2
    .add(this.stat2.modifier)
    .add(this.stat2.surface);
}



/**
 * Slide Constructor
 */

function Slide() {
  SlideBase.apply(this, arguments);
  _createLayout.call(this);
  this._steps =  [
    function() {
      this.step1.setTransform(Transform.translate(-100, -200, 0), { duration : 1000, curve: Easing.outBack });
      this.step2
        .setTransform(Transform.translate(0, 900, 0))
        .setOpacity(1, { duration : 1000, curve: Easing.outBack })
        .setTransform(Transform.translate(-100, 400, 0), { duration : 1000, curve: Easing.outBack });
    }
  ];
}

/*!
 * extend SlideBase
 */

Slide.prototype = Object.create(SlideBase.prototype);
Slide.prototype.constructor = Slide;

Slide.prototype.didEnter = function() {
  this.list.surface.open();
};

/*!
 * module exports
 */

module.exports = Slide;
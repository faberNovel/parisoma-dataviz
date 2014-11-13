/*!
 * module deps
 */

var Surface = require('famous/core/Surface'),
    StateModifier = require('famous/modifiers/StateModifier'),
    ImageSurface = require('famous/surfaces/ImageSurface'),
    Easing = require('famous/transitions/Easing'),
    Transform = require('famous/core/Transform'),
    Utility = require('famous/utilities/Utility'),
    SlideBase = require('slide'),
    ViewList = require('view-list'),
    ViewStat = require('view-stat');

/*!
 * globals
 */

var list1 = [
  { number: 40, label: 'have a Masters Degree' },
  { number: 40, label: 'have a Bachelors Degree' },
  { number: 15, label: 'have a PhD' }
];

var list2 = [
  { number: 44, label: 'worked for a large organization' },
  { number: 27, label: 'worked for another startup' },
  { number: 2,  label: 'were still in school' }
];

/**
 * create view layout
 */

function _createLayout(){

  /*!
   * title
   */

  this.title = {};
  this.title.surface = new Surface({
    content: `<h1 class='title title--section title--pink u-textRight'>they know what they are getting into</h1>`,
    size: [300, true]
  });

  this.title.modifier = new StateModifier({
    origin: [1, 0.5],
    align: [0.5, 0.5],
    transform: Transform.translate(0, -150, 0)
  });

  /*!
   * stats 1
   */

  this.stat1 = {};
  this.stat1.surface = new ViewStat({
    container: {
      size: [380, 120]
    },
    number: {
      content: '40'
    },
    sign: {
      transform: Transform.translate(70, 0, 0),
      content: '%'
    },
    ticker: {
      size: [100, 90],
      transform: Transform.translate(0, 20, 0)
    },
    label: {
      transform: Transform.translate(120, 0, 0),
      size: [300, true],
      content: `<p><span> consider themselves to be </span><span class='u-textBold'> serial entrepreneurs</span></p>`
    }
  });
  this.stat1.modifier = new StateModifier({
    origin: [1, 0.5],
    align: [0.5, 0.5],
    transform: Transform.translate(0, 50, 0)
  });

  /*!
   * lego image
   */

  this.eventImg = {};
  this.eventImg.surface = new ImageSurface({
    content: require('url!../../assets/images/04-event.png'),
    size: [true, true]
  });

  this.eventImg.modifier = new StateModifier({
    origin: [0, 0.5],
    align: [0.5, 0.5],
    transform: Transform.translate(100, 0, 0)
  });

  /*!
   * list 1
   */

  this.list1 = {};
  this.list1.surface = new ViewList({
    direction: Utility.Direction.X,
    itemSpacing: 30
  });

  this.list1.surface.sequenceFrom(list1.map(function(item) {
    return new ViewStat({
      container: {
        size: [120, 150],
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
        size: [100, true],
        transform: Transform.translate(0, 60, 0)
      }
    });
  }));

  this.list1.modifier = new StateModifier({
    origin: [1, 0.5],
    align: [0.5, 0.5],
    transform: Transform.translate(0, 150, 0)
  });

  /*!
   * text 2
   */

  this.text2 = {};
  this.text2.surface = new Surface({
    classes: ['text--pink', 'title'],
    content: 'before joining PARISOMA',
    size: [true, true]
  });

  this.text2.modifier = new StateModifier({
    origin: [0.5, 0.5],
    align: [0.5, 0.5],
    transform: Transform.translate(-80, 30, 0)
  });

  /*!
   * list 2
   */

  this.list2 = {};
  this.list2.surface = new ViewList({
    direction: Utility.Direction.X,
    itemSpacing: 30
  });

  this.list2.surface.sequenceFrom(list2.map(function(item) {
    return new ViewStat({
      container: {
        size: [120, 150],
      },
      number: {
        content: item.number,
        transform: Transform.translate(0, 0, 0)
      },
      sign: {
        content: '%',
        transform: item.number < 10
          ? Transform.translate(40, 0, 0)
          : Transform.translate(70, 0, 0)

      },
      label: {
        content: item.label,
        size: [120, true],
        transform: Transform.translate(0, 60, 0)
      }
    });
  }));

  this.list2.modifier = new StateModifier({
    origin: [0.5, 0.5],
    align: [0.5, 0.5],
    transform: Transform.translate(0, 110, 0)
  });

  /*!
   * steps
   */

  this.steps = [];
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
    .add(this.eventImg.modifier)
    .add(this.eventImg.surface);

  step1
    .add(this.title.modifier)
    .add(this.title.surface);

  step1
    .add(this.stat1.modifier)
    .add(this.stat1.surface);

  step1
    .add(this.list1.modifier)
    .add(this.list1.surface);

  step2
    .add(this.text2.modifier)
    .add(this.text2.surface);

  step2
    .add(this.list2.modifier)
    .add(this.list2.surface);
}

/**
 * Slide Constructor
 */

function Slide() {
  SlideBase.apply(this, arguments);
  _createLayout.call(this);

  this._steps = [
    function() {
      return this.stat1.surface.bump();
    },
    function() {
      this.list1.surface.open();
      this.list1.surface.forEach(function(s) { s.count(); });
    },
    function() {
      this.step1.setTransform(Transform.translate(300, -400, -300), { duration : 1000, curve: Easing.outBack });
      this.step2.setOpacity(1, { duration : 1000, curve: Easing.outBack });
      this.list2.surface.open();
      this.list2.surface.forEach(function(s) { s.count(); });
    }
  ];
}

/*!
 * extend SlideBase
 */

Slide.prototype = Object.create(SlideBase.prototype);
Slide.prototype.constructor = SlideBase;


Slide.prototype.didEnter = function() {
  this.playNextAnimation();
  setTimeout(this.playNextAnimation.bind(this), 2000);
  setTimeout(this.playNextAnimation.bind(this), 4000);
};

/*!
 * module exports
 */

module.exports = Slide;
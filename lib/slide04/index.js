/*!
 * module deps
 */

var Surface = require('famous/core/Surface'),
    Easing = require('famous/transitions/Easing'),
    StateModifier = require('famous/modifiers/StateModifier'),
    ImageSurface = require('famous/surfaces/ImageSurface'),
    Transform = require('famous/core/Transform'),
    SlideBase = require('slide'),
    ViewStat = require('view-stat'),
    ViewList = require('view-list');

/*!
 * globals
 */

var list = [
  { number: 02, label: 'average size of founding team', ticker: true },
  { number: 75, label: 'knew their cofounders before going into business together', sign: '%' },
  { number: 20, label: 'worked with their cofounders at a previous job', sign: '%' },
  { number: 14, label: 'have known each other since childhood', sign: '%' }
];

var notes = [
  '2 founding  teams are siblings',
  '1 team met at a wedding',
  '1 team at an event at PARISOMA',
  '1 team met on a date'
];

/**
 * create view layout
 */

function _createLayout(){

  /*!
   * rocket image
   */

  this.rocketImg = {};
  this.rocketImg.surface = new ImageSurface({
    content: require('../../assets/images/05-rocket.png'),
    size: [true, true]
  });

  this.rocketImg.modifier = new StateModifier({
    origin: [0.5, 0.5],
    align: [0.5, 0.5],
    transform: Transform.translate(-360, 180, 0)
  });

  /*!
   * title
   */

  this.title = {};
  this.title.surface = new Surface({
    size: [510, true],
    content: `<h1 class='title title--section title--pink'>and they know who they are getting into it with</h1>`,
  });

  this.title.modifier = new StateModifier({
    origin: [0.5, 0.5],
    align: [0.5, 0.5],
    transform: Transform.translate(0, -300, 0)
  });

  /*!
   * list
   */

  this.list = {};
  this.list.surface = new ViewList({
    itemSpacing: 10
  });

  this.list.surface.sequenceFrom(list.map(function(item) {
    var spec = {
      container: {
        size: [350, 100]
      },
      number: {
        content: item.number,
        transform: Transform.translate(0, 0, 0)
      },
      label: {
        content: item.label,
        size: [240, true],
        transform: Transform.translate(120, 0, 0)
      }
    };

    if (item.sign) {
      spec.sign = {
        content: '%',
        transform: Transform.translate(70, 0, 0)
      };
    }

    if (item.ticker) {
      spec.ticker = {
        size: [120, 120],
        transform: Transform.translate(-30, 80, 0)
      };
    }


    return new ViewStat(spec);
  }));

  this.list.modifier = new StateModifier({
    origin: [0, 0.5],
    align: [0.5, 0.5],
    transform: Transform.translate(0, 0, 0)
  });


  /*!
   * bracket
   */

  this.bracket = {};
  this.bracket.surface = new Surface({
    size: [true, true],
    content: '{',
    classes: ['text--gray'],
    properties: {
      fontWeight: 100,
      fontSize: 150,
      lineHeight: 150
    }
  });

  // this.bracket.modifier = new StateModifier({
  //   origin: [0.5, 0.5],
  //   align: [0.5, 0.5],
  //   transform: Transform.translate(100, -20, 0)
  // });

  /*!
   * notes
   */

  this.notes = {};
  this.notes.surface = new ViewList({
    itemSpacing: 5
  });

  this.notes.surface.sequenceFrom(notes.map(function(text) {
    return new Surface({
      content: text,
      size: [300, true],
      classes: ['note', 'note--gray'],
    });
  }));

  this.notes.modifier = new StateModifier({
    origin: [0, 0.5],
    align: [0.5, 0.5],
    transform: Transform.translate(130, 0, 0)
  });

  this
    .add(this.rocketImg.modifier)
    .add(this.rocketImg.surface);

  this
    .add(this.title.modifier)
    .add(this.title.surface);

  this
    .add(this.list.modifier)
    .add(this.list.surface);

  // this
  //   .add(this.bracket.modifier)
  //   .add(this.bracket.surface);

  this
    .add(this.notes.modifier)
    .add(this.notes.surface);
}

/**
 * Slide Constructor
 */

function Slide() {
  SlideBase.apply(this, arguments);
  _createLayout.call(this);

  this._steps = [
    function() {
      this.list.surface.open();
      this.list.surface.forEach(function(s) { s.count(); });
    },
    function() {
      this.list.modifier.setTransform(Transform.translate(-300, 0, 0), { duration : 500, curve: Easing.outBack });
      this.notes.surface.open();
    }
  ];
}

/*!
 * extend View
 */

Slide.prototype = Object.create(SlideBase.prototype);
Slide.prototype.constructor = Slide;

Slide.prototype.didEnter = function() {
  this.playNextAnimation();
  setTimeout(this.playNextAnimation.bind(this), 2000);
};

/*!
 * module exports
 */

module.exports = Slide;
/*!
 * module deps
 */

var Surface = require('famous/core/Surface'),
    ImageSurface = require('famous/surfaces/ImageSurface'),
    StateModifier = require('famous/modifiers/StateModifier'),
    Transform = require('famous/core/Transform'),
    Utility = require('famous/utilities/Utility'),
    SlideBase = require('slide'),
    ViewStat = require('view-stat'),
    ViewList = require('view-list');

/*!
 * templates
  */

var list = [
  {number: 58, label: 'are bootstraping their business'},
  {number: 32, label: 'have not launched their product'},
  {number: 38, label: 'are still in beta'}
];

/**
 * create view layout
 */

function _createLayout(){

  /*!
   * group image
   */

  this.groupImg = {};
  this.groupImg.surface = new ImageSurface({
    content: require('../../assets/images/12-group.png'),
    size: [true, true]
  });

  this.groupImg.modifier = new StateModifier({
    origin: [0.5, 0.5],
    align: [0.5, 0.5],
    transform: Transform.translate(200, -100, 0)
  });

  /*!
   * title 1
   */

  this.title = {};
  this.title.surface = new Surface({
    content: `<h1 class='title title--section title--yellow'>They are bootstraping it</h1>`,
    size: [300, true]
  });

  this.title.modifier = new StateModifier({
    origin: [0.5, 0.5],
    align: [0.5, 0.5],
    transform: Transform.translate(200, 0, 0)
  });

  /*!
   * label
   */

  this.label = {};
  this.label.surface = new Surface({
    content: 'Most of our new members come with only a laptop and an idea',
    size: [450, true]
  });

  this.label.modifier = new StateModifier({
    origin: [1, 0.5],
    align: [0.5, 0.5],
    transform: Transform.translate(-70, 0, 0)
  });

  /*!
   * list
   */

  this.list = {};
  this.list.surface = new ViewList({
    direction: Utility.Direction.X,
    itemSpacing: 10
  });

  this.list.surface.sequenceFrom(list.map(function(item) {
    return new ViewStat({
      container: {
        size: [160, 100],
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
        size: [160, true],
        transform: Transform.translate(0, 80, 0)
      }
    });
  }));

    this.list.modifier = new StateModifier({
      origin: [1, 0.5],
      align: [0.5, 0.5],
      transform: Transform.translate(-20, 100, 0)
    });

  /*!
   * render tree
   */

  this
    .add(this.groupImg.modifier)
    .add(this.groupImg.surface);

  this
    .add(this.title.modifier)
    .add(this.title.surface);

  this
    .add(this.label.modifier)
    .add(this.label.surface);

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
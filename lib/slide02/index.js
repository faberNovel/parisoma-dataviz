/*!
 * module deps
 */

var Surface = require('famous/core/Surface'),
    StateModifier = require('famous/modifiers/StateModifier'),
    Transform = require('famous/core/Transform'),
    SlideBase = require('slide'),
    ViewList = require('view-list'),
    ViewStat = require('view-stat');

/**
 * create view layout
 */

function _createLayout(){

  /*!
   * title
   */

  this.title = {};
  this.title.surface = new Surface({
    size: [300, true],
    content: `<h1 class='title title--section title--pink u-textRight'>they come from all over</h1>`
  });

  this.title.modifier = new StateModifier({
    origin: [1, 0.5],
    align: [0.5, 0.5],
    transform: Transform.translate(-10, 0, 0)
  });

  /*!
   * stat
   */

  this.stat = {};
  this.stat.surface = new ViewStat({
    container: {
      size: [180, 120]
    },
    number: {
      content: '20'
    },
    sign: null,
    label: {
      content: `<p style='text-indent: 80px'>different countries represented</>`,
      size: [50, true],
      transform: Transform.translate(0, 24, 0)
    }
  });

  this.stat.modifier = new StateModifier({
    origin: [0, 0.5],
    align: [0.5, 0.5],
    transform: Transform.translate(20, 0, 0)
  });

  /*!
   * list
   */

  this.list = {};
  this.list.surface = new ViewList();
  this.list.surface.sequenceFrom(['54% USA', '34% Europe'].map(function(el) {
    return new Surface({
      content: el,
      size: [true, true]
    });
  }));

  this.list.modifier = new StateModifier({
    origin: [0, 0.5],
    align: [0.5, 0.5],
    transform: Transform.translate(20, 90, 0)
  });

  /*!
   * render tree
   */

  this
    .add(this.title.modifier)
    .add(this.title.surface);

  this
    .add(this.stat.modifier)
    .add(this.stat.surface);

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
Slide.prototype.constructor = SlideBase;


Slide.prototype.didEnter = function() {
  this.stat.surface.count();
  this.list.surface.open();
};

/*!
 * module exports
 */

module.exports = Slide;
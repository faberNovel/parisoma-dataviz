/*!
 * module deps
 */

var Surface = require('famous/core/Surface'),
    Easing = require('famous/transitions/Easing'),
    StateModifier = require('famous/modifiers/StateModifier'),
    Transform = require('famous/core/Transform'),
    Utility = require('famous/utilities/Utility'),
    View = require('famous/core/View'),
    ViewStat = require('view-stat'),
    ViewList = require('view-list');

/*!
 * templates
 */

var list = [
  { number: 55, label: 'Javascript' },
  { number: 41, label: 'HTML5' },
  { number: 34, label: 'PHP' },
  { number: 26, label: 'Node.js' },
  { number: 26, label: 'Python.js' },
  { number: 17, label: 'Ruby' },
  { number: 14, label: 'Java' }
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
    size: [400, true],
    content: `<h1 class='title title--section title--pink'>they code across the board</h1>`
  });

  this.title.modifier = new StateModifier({
    origin: [0.5, 0.5],
    align: [0.5, 0.5],
    transform: Transform.translate(0, -100, 0)
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
    transform: Transform.translate(0, 0, 0)
  });

  /*!
   * setup render tree
   */

  this
    .add(this.title.modifier)
    .add(this.title.surface);

  this
    .add(this.list.modifier)
    .add(this.list.surface);
}

function _onEnter() {
  this.list.surface.open();
  this.list.surface.forEach(function(stat) {
    stat.count();
  });

  // this.title.modifier
  //   .setTransform(Transform.translate(250, -300, 0), { duration : 500 })
  //   .setTransform(Transform.translate(0, -250, 0), { duration : 500, curve: Easing.outBack });
}

function _onLeave() {
  // this.title.modifier
  //   .setTransform(Transform.translate(250, -300, 0));
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

/*!
 * module exports
 */

module.exports = Slide;
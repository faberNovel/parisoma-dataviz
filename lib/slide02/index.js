/*!
 * module deps
 */

var Surface = require('famous/core/Surface'),
    Easing = require('famous/transitions/Easing'),
    StateModifier = require('famous/modifiers/StateModifier'),
    Transform = require('famous/core/Transform'),
    View = require('famous/core/View');

/*!
 * templates
 */

var title1 = `
<h1 class='title title--section title--pink u-textRight'>they come from all over</h1>`;

var number1 = `<span class='u-textHuge'>20</span>`;

var content1 = `
<div>
  <p>different countries represented</p>
  <div class='u-pad-top-10'>
    <p>54% USA</p>
    <p>34% Europe</p>
  </div>
</div>`;

/**
 * create view layout
 */

function _createLayout(){

  // title 1
  this.title1 = {};
  this.title1.surface = new Surface({
    content: title1,
    size: [300, true]
  });

  this.title1.modifier = new StateModifier({
    origin: [1, 0.5],
    align: [0.5, 0.5],
    transform: Transform.translate(-10, 0, 0)
  });

  // content 1
  this.content1 = {};
  this.content1.surface = new Surface({
    content: content1,
    size: [160, true]
  });

  this.content1.modifier = new StateModifier({
    origin: [0, 0.5],
    align: [0.5, 0.5],
    transform: Transform.translate(10, 0, 0)
  });

  this.number1 = {};
  this.number1.surface = new Surface({
    content: number1,
    size: [160, true]
  });

  this.number1.modifier = new StateModifier({
    origin: [0, 0.5],
    align: [0.5, 0.5],
    transform: Transform.translate(10, 0, 0)
  });

  this.modifier = new StateModifier({
    transform: Transform.translate(0, 700, 0)
  });

  var node = this.add(this.modifier);

  node
    .add(this.title1.modifier)
    .add(this.title1.surface);

  node
    .add(this.content1.modifier)
    .add(this.content1.surface);
}

function _onEnter() {
  this.modifier
    .setTransform(Transform.translate(0, 0, 0), { duration : 800, curve: Easing.outBack }
  );
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
  size: [undefined, 240]
};

/*!
 * module exports
 */

module.exports = Slide;
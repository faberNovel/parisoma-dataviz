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

var title2 = `<h1 class='title title--section title--pink'>they code across the board</h1>`;
var content2 = `
<div class='Grid Grid--alignTop Grid--withGutter'>

  <div class='Grid-cell u-size1of3'>
    <div>
      <span class='u-textHuge'>55</span>
      <span class='u-textLarge'>%</span>
    </div>
    <span>Javascript</span>
  </div>

  <div class='Grid-cell Grid-cell--withBorder u-size1of3'>
    <div>
      <span class='u-textHuge'>41</span>
      <span class='u-textLarge'>%</span>
    </div>
    <span>HTML5<span>
  </div>

  <div class='Grid-cell u-size1of3'>
    <div>
      <span class='u-textHuge'>34</span>
      <span class='u-textLarge'>%</span>
    </div>
    <span>PHP</span>
  </div>

</div>

<div class='Grid Grid--alignTop Grid--withGutter u-pad-top-20'>

  <div class='Grid-cell u-size1of3'>
    <div>
      <span class='u-textHuge'>26</span>
      <span class='u-textLarge'>%</span>
    </div>
    <span>Node.js</span>
  </div>

  <div class='Grid-cell Grid-cell--withBorder u-size1of3'>
    <div>
      <span class='u-textHuge'>26</span>
      <span class='u-textLarge'>%</span>
    </div>
    <span>Python.js</span>
  </div>

  <div class='Grid-cell u-size1of3'>
    <div>
      <span class='u-textHuge'>17</span>
      <span class='u-textLarge'>%</span>
    </div>
    <span>Ruby</span>
  </div>
</div>

<div class='u-pad-top-20'>
  <div>
    <span class='u-textHuge'>14</span>
    <span class='u-textLarge'>%</span>
  </div>
  <span>Java</span>
</div>`;

/**
 * create view layout
 */

function _createLayout(){

  // title 2
  this.title2 = {};
  this.title2.surface = new Surface({
    content: title2,
    size: [400, true]
  });

  this.title2.modifier = new StateModifier({
    origin: [0.5, 0.5],
    align: [0.5, 0.5],
    transform: Transform.translate(250, -250, 0)
  });

  // content 2
  this.content2 = {};
  this.content2.surface = new Surface({
    content: content2,
    size: [420, true]
  });

  this.content2.modifier = new StateModifier({
    origin: [0.5, 0.5],
    align: [0.5, 0.5],
    transform: Transform.translate(0, 0, 0)
  });

  this
    .add(this.title2.modifier)
    .add(this.title2.surface);

  this
    .add(this.content2.modifier)
    .add(this.content2.surface);
}

function _onEnter() {
  this.title2.modifier
    .setTransform(Transform.translate(250, -300, 0), { duration : 500 })
    .setTransform(Transform.translate(0, -250, 0), { duration : 500, curve: Easing.outBack });
}

function _onLeave() {
  this.title2.modifier
    .setTransform(Transform.translate(250, -300, 0));
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
  size: [undefined, 480]
};

/*!
 * module exports
 */

module.exports = Slide;
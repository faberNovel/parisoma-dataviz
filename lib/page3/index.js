/*!
 * module deps
 */

var Surface = require('famous/core/Surface'),
    StateModifier = require('famous/modifiers/StateModifier'),
    Transform = require('famous/core/Transform'),
    View = require('famous/core/View');

/*!
 * templates
 */

var title1 = `<h1 class='title title--section title--pink'>they have an app for that</h1>`;
var content1 = `
<div class='Grid Grid--alignTop Grid--withGutter'>

  <div class='Grid-cell u-size1of3'>
    <div>
      <span class='u-textHuge'>55</span>
      <span class='u-textLarge'>%</span>
    </div>
    <span>are building a web app</span>
  </div>

  <div class='Grid-cell Grid-cell--withBorder u-size1of3'>
    <div>
      <span class='u-textHuge'>26</span>
      <span class='u-textLarge'>%</span>
    </div>
    <span>have an IOS app<span>
  </div>

  <div class='Grid-cell u-size1of3'>
    <div>
      <span class='u-textHuge'>13</span>
      <span class='u-textLarge'>%</span>
    </div>
    <span>an Android app</span>
  </div>
</div>`;

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
</div>


`;


/**
 * create view layout
 */

function _createLayout(){

  // title 1
  this.title1 = {};
  this.title1.surface = new Surface({
    content: title1,
    size: [400, true]
  });

  this.title1.modifier = new StateModifier({
    transform: Transform.translate(0, 0, 0)
  });

  // content 1
  this.content1 = {};
  this.content1.surface = new Surface({
    content: content1,
    size: [450, true]
  });

  this.content1.modifier = new StateModifier({
    transform: Transform.translate(0, 100, 0)
  });

  // title 2
  this.title2 = {};
  this.title2.surface = new Surface({
    content: title2,
    size: [400, true]
  });

  this.title2.modifier = new StateModifier({
    transform: Transform.translate(500, 200, 0)
  });

  // content 2
  this.content2 = {};
  this.content2.surface = new Surface({
    content: content2,
    size: [450, true]
  });

  this.content2.modifier = new StateModifier({
    transform: Transform.translate(500, 340, 0)
  });

  this
    .add(this.title1.modifier)
    .add(this.title1.surface);

  this
    .add(this.content1.modifier)
    .add(this.content1.surface);

  this
    .add(this.title2.modifier)
    .add(this.title2.surface);

  this
    .add(this.content2.modifier)
    .add(this.content2.surface);
}

/**
 * Page3 Constructor
 */

function Page3() {
  View.apply(this, arguments);
  _createLayout.call(this);
}

/*!
 * extend View
 */

Page3.prototype = Object.create(View.prototype);
Page3.prototype.constructor = Page3;
Page3.DEFAULT_OPTIONS = {};

/*!
 * module exports
 */

module.exports = Page3;
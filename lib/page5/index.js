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

var title1 = `<h1 class='title title--section title--yellow'>They are bootstraping it</h1>`;

var content1 = `
<div class='note u-textRight u-after2of6 u-pad-bottom-20'>Most of our new members come with only a laptop and an idea</div>

<div class='Grid Grid--alignTop Grid--withGutter'>

  <div class='Grid-cell u-size1of3'>
    <div>
      <span class='u-textHuge'>58</span>
      <span class='u-textLarge'>%</span>
      <span> are bootstraping their business</span>
    </div>
  </div>

  <div class='Grid-cell Grid-cell--withBorder u-size1of3 '>
    <div>
      <span class='u-textHuge'>32</span>
      <span class='u-textLarge'>%</span>
    </div>
    <span>have not launched their product<span>
  </div>

  <div class='Grid-cell u-size1of3'>
    <div>
      <span class='u-textHuge'>38</span>
      <span class='u-textLarge'>%</span>
    </div>
    <span>are still in beta<span>
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
    size: [200, true]
  });

  this.title1.modifier = new StateModifier({
    transform: Transform.translate(500, 20, 0)
  });

  // content 1
  this.content1 = {};
  this.content1.surface = new Surface({
    content: content1,
    size: [450, true]
  });

  this.content1.modifier = new StateModifier({
    transform: Transform.translate(300, 200, 0)
  });

  this
    .add(this.title1.modifier)
    .add(this.title1.surface);

  this
    .add(this.content1.modifier)
    .add(this.content1.surface);
}

/**
 * Page5 Constructor
 */

function Page5() {
  View.apply(this, arguments);
  _createLayout.call(this);
}

/*!
 * extend View
 */

Page5.prototype = Object.create(View.prototype);
Page5.prototype.constructor = Page5;
Page5.DEFAULT_OPTIONS = {};

/*!
 * module exports
 */

module.exports = Page5;
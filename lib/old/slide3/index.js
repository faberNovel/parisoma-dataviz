/*!
 * module deps
 */

var Surface = require('famous/core/Surface'),
    ImageSurface = require('famous/surfaces/ImageSurface'),
    StateModifier = require('famous/modifiers/StateModifier'),
    Transform = require('famous/core/Transform'),
    View = require('famous/core/View');

/*!
 * globals
 */

var toRadian = Math.PI/180;

/*!
 * templates
 */

var title1 = `<h1 class='title title--section title--white'>they have an app for that</h1>`;
var content1 = `
<div class='Grid Grid--alignTop Grid--withGutter text--white'>

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
</div>`;


/**
 * create view layout
 */

function _createLayout(){

  // parisoma image
  this.parisomaImg = {};
  this.parisomaImg.surface = new ImageSurface({
    content: '/assets/images/07-parisoma.png',
    size: [true, true]
  });

  this.parisomaImg.modifier = new StateModifier({
    transform: Transform.translate(0, 0, 0)
  });

  // shelf image
  this.shelfImg = {};
  this.shelfImg.surface = new ImageSurface({
    content: '/assets/images/06-shelf.png',
    size: [true, true]
  });

  this.shelfImg.modifier = new StateModifier({
    transform: Transform.translate(70, -20, 0)
  });

  // shelf image
  this.keyboardImg = {};
  this.keyboardImg.surface = new ImageSurface({
    content: '/assets/images/08-keyboard.png',
    size: [true, true]
  });

  this.keyboardImg.modifier = new StateModifier({
    transform: Transform.translate(620, 450, 0)
  });

  // pink ticker
  this.pinkTicker = {};
  this.pinkTicker.surface = new Surface({
    size: [70, 180],
    classes: ['ticker', 'ticker--pink']
  });

  this.pinkTicker.tickerModifier = new StateModifier({
    transform: Transform.skew(0, -39 * toRadian, 0)
  });

  this.pinkTicker.modifier = new StateModifier({
    origin: [0, 0],
    align: [0, 0],
    transform: Transform.translate(0, 215, 0)
  });

  // tagline image
  this.taglineImg = {};
  this.taglineImg.surface = new ImageSurface({
    content: '/assets/images/09-tagline.png',
    size: [true, true]
  });

  this.taglineImg.modifier = new StateModifier({
    transform: Transform.translate(50, 750, 0)
  });

  // donut image
  this.donutImg = {};
  this.donutImg.surface = new ImageSurface({
    content: '/assets/images/10-donut.png',
    size: [true, true]
  });

  this.donutImg.modifier = new StateModifier({
    transform: Transform.translate(80, 1000, 0)
  });

  // title 1
  this.title1 = {};
  this.title1.surface = new Surface({
    content: title1,
    size: [400, true]
  });

  this.title1.modifier = new StateModifier({
    transform: Transform.translate(50, 480, 0)
  });

  // content 1
  this.content1 = {};
  this.content1.surface = new Surface({
    content: content1,
    size: [450, true]
  });

  this.content1.modifier = new StateModifier({
    transform: Transform.translate(50, 600, 0)
  });

  // title 2
  this.title2 = {};
  this.title2.surface = new Surface({
    content: title2,
    size: [400, true]
  });

  this.title2.modifier = new StateModifier({
    origin: [1, 0],
    align: [1, 0],
    transform: Transform.translate(-100, 900, 0)
  });

  // content 2
  this.content2 = {};
  this.content2.surface = new Surface({
    content: content2,
    size: [420, true]
  });

  this.content2.modifier = new StateModifier({
    origin: [1, 0],
    align: [1, 0],
    transform: Transform.translate(-100, 1000, 0)
  });

  this
    .add(this.parisomaImg.modifier)
    .add(this.parisomaImg.surface);

  this
    .add(this.shelfImg.modifier)
    .add(this.shelfImg.surface);

  this
    .add(this.pinkTicker.modifier)
    .add(this.pinkTicker.tickerModifier)
    .add(this.pinkTicker.surface);

  this
    .add(this.keyboardImg.modifier)
    .add(this.keyboardImg.surface);

  this
    .add(this.taglineImg.modifier)
    .add(this.taglineImg.surface);

  this
    .add(this.donutImg.modifier)
    .add(this.donutImg.surface);

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
Page3.DEFAULT_OPTIONS = {
  size: [undefined, 1350]
};

/*!
 * module exports
 */

module.exports = Page3;
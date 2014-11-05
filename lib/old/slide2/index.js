/*!
 * module deps
 */

var Surface = require('famous/core/Surface'),
    StateModifier = require('famous/modifiers/StateModifier'),
    ImageSurface = require('famous/surfaces/ImageSurface'),
    Transform = require('famous/core/Transform'),
    View = require('famous/core/View');

/*!
 * globals
 */

var toRadian = Math.PI/180;

/*!
 * templates
 */

var title1 = `
<h1 class='title title--section title--pink u-textRight'>they come from all over</h1>`;

var content1 = `
<div>
  <p><span class='u-textHuge'>20</span> different countries represented</p>
  <div class='u-pad-top-10'>
    <p>54% USA</p>
    <p>34% Europe</p>
  </div>
</div>`;

var title2 = `
<h1 class='title title--section title--pink u-textRight'>they know what they are getting into</h1>`;

var content2 = `
<div class='Grid Grid--alignMiddle'>
  <div class='Grid-cell u-size1of3'>
    <div>
      <span class='u-textHuge'>40</span>
      <span class='u-textLarge'>%</span>
    </div>
  </div>
  <div class='Grid-cell u-size2of3'>
    <span> consider themselves to be </span>
    <span class='u-textBold'> serial entrepreneurs</span>
  </div>
</div>`;

var content3 = `
<div class='Grid Grid--alignTop Grid--withGutter'>

  <div class='Grid-cell u-size1of3'>
    <div>
      <span class='u-textHuge'>40</span>
      <span class='u-textLarge'>%</span>
    </div>
    <span> have a Master Degree </span>
  </div>

  <div class='Grid-cell Grid-cell--withBorder u-size1of3'>
    <div>
      <span class='u-textHuge'>40</span>
      <span class='u-textLarge'>%</span>
    </div>
    <span> have a Bachelors Degree<span>
  </div>

  <div class='Grid-cell u-size1of3'>
    <div>
      <span class='u-textHuge'>15</span>
      <span class='u-textLarge'>%</span>
    </div>
    <span> have a Phd</span>
  </div>
</div>`;

var content4 = `
  <div>
    <div class='u-pad-bottom-20 u-textUnderscore'>before joining PARISOMA</div>
    <div class='Grid Grid--alignTop Grid--withGutter'>

      <div class='Grid-cell u-size1of3'>
        <div>
          <span class='u-textHuge'>44</span>
          <span class='u-textLarge'>%</span>
        </div>
        <span> worked for a large organisation</span>
      </div>

      <div class='Grid-cell u-size1of3 Grid-cell--withBorder'>
        <div>
          <span class='u-textHuge'>27</span>
          <span class='u-textLarge'>%</span>
        </div>
        <span> worked for another startup<span>
      </div>

      <div class='Grid-cell u-size1of3'>
        <div>
          <span class='u-textHuge' style='padding-left: 37px;'>2</span>
          <span class='u-textLarge'>%</span>
        </div>
        <span> were still in school</span>
      </div>
    </div>
  </div>`;

var title3 = `
<h1 class='title title--section title--pink'>and they know who they are getting into it with</h1>`;

var content5 = `
<div>
  <div class='Grid Grid--alignTop'>
    <div class='Grid-cell u-size1of3'>
      <span class='u-textHuge'>2</span>
    </div>
    <div class='Grid-cell u-size2of3'>average size of founding team</div>
  </div>

  <div class='Grid Grid--alignTop u-pad-top-10'>
    <div class='Grid-cell u-size1of3'>
      <span class='u-textHuge'>75</span>
      <span class='u-textLarge'>%</span>
    </div>
    <div class='Grid-cell u-size2of3'>knew their cofounders before going into business together</div>
  </div>

  <div class='Grid Grid--alignTop u-pad-top-10'>
    <div class='Grid-cell u-size1of3'>
      <span class='u-textHuge'>20</span>
      <span class='u-textLarge'>%</span>
    </div>
    <div class='Grid-cell u-size2of3'>worked with their cofounders at a previous job</div>
  </div>

  <div class='Grid Grid--alignTop u-pad-top-10'>
    <div class='Grid-cell u-size1of3'>
      <span class='u-textHuge'>14</span>
      <span class='u-textLarge'>%</span>
    </div>
    <div class='Grid-cell u-size2of3'>have known each other since childhood</div>
  </div>

</div>`;

var content6 = `
  <div class='note note--gray'>
    <div>2 founding  teams are siblings</div>
    <div>1 team met at a wedding</div>
    <div>1 team at an event at PARISOMA</div>
    <div>1 team met on a date</div>
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
    origin: [1, 0],
    align: [1, 0],
    transform: Transform.translate(-200, -50, 0)
  });

  // content 1
  this.content1 = {};
  this.content1.surface = new Surface({
    content: content1,
    size: [160, true]
  });

  this.content1.modifier = new StateModifier({
    origin: [1, 0],
    align: [1, 0],
    transform: Transform.translate(0, -50, 0)
  });

  // title 2
  this.title2 = {};
  this.title2.surface = new Surface({
    content: title2,
    size: [300, true]
  });

  this.title2.modifier = new StateModifier({
    transform: Transform.translate(190, 210, 0)
  });

  // content 2
  this.content2 = {};
  this.content2.surface = new Surface({
    content: content2,
    size: [400, true],
    properties: {
      zIndex: 1
    }
  });

  this.content2.modifier = new StateModifier({
    transform: Transform.translate(60, 450, 0)
  });

  // yellow ticker 1
  this.yellowTicker1 = {};
  this.yellowTicker1.surface = new Surface({
    size: [70, 80],
    classes: ['ticker', 'ticker--yellow']
  });

  this.yellowTicker1.tickerModifier = new StateModifier({
    transform: Transform.skew(0, 0, -39 * toRadian, 0)
  });

  this.yellowTicker1.modifier = new StateModifier({
    transform: Transform.translate(100, 450, 0)
  });

  // content 3
  this.content3 = {};
  this.content3.surface = new Surface({
    content: content3,
    size: [450, true]
  });

  this.content3.modifier = new StateModifier({
    transform: Transform.translate(40, 550, 0)
  });

  // lego image
  this.legoImg = {};
  this.legoImg.surface = new ImageSurface({
    content: '/assets/images/04-lego.png',
    size: [true, true]
  });

  this.legoImg.modifier = new StateModifier({
    origin: [1, 0],
    align: [1, 0],
    transform: Transform.translate(0, 450, 0)
  });

  // content 4
  this.content4 = {};
  this.content4.surface = new Surface({
    content: content4,
    size: [450, true]
  });

  this.content4.modifier = new StateModifier({
    transform: Transform.translate(40, 770, 0)
  });

  // rocket image
  this.rocketImg = {};
  this.rocketImg.surface = new ImageSurface({
    content: '/assets/images/05-rocket.png',
    size: [true, true]
  });

  this.rocketImg.modifier = new StateModifier({
    origin: [0.5, 0],
    align: [0.5, 0],
    transform: Transform.translate(-50, 1100, 0)
  });

  // yellow ticker 2
  this.yellowTicker2 = {};
  this.yellowTicker2.surface = new Surface({
    size: [170, 120],
    classes: ['ticker', 'ticker--yellow']
  });

  this.yellowTicker2.tickerModifier = new StateModifier({
    transform: Transform.skew(0, -39 * toRadian, 0)
  });

  this.yellowTicker2.modifier = new StateModifier({
    origin: [0.5, 0],
    align: [0.5, 0],
    transform: Transform.translate(80, 1270, 0)
  });

  // title 3
  this.title3 = {};
  this.title3.surface = new Surface({
    content: title3,
    size: [510, true]
  });

  this.title3.modifier = new StateModifier({
    origin: [0.5, 0.5],
    align: [0.5, 0.5],
    transform: Transform.translate(0, 1000, 0)
  });

  // content 5
  this.content5 = {};
  this.content5.surface = new Surface({
    content: content5,
    size: [400, true],
    properties: {
      zIndex: 1
    }
  });

  this.content5.modifier = new StateModifier({
    origin: [1, 0],
    align: [1, 0],
    transform: Transform.translate(0, 1200, 0)
  });

  // content 6
  this.content6 = {};
  this.content6.surface = new Surface({
    content: content6,
    size: [300, true]
  });

  this.content6.modifier = new StateModifier({
    origin: [1, 0],
    align: [1, 0],
    transform: Transform.translate(0, 1600, 0)
  });

  this.modifier = new StateModifier();
  var node = this.add(this.modifier);

  node
    .add(this.legoImg.modifier)
    .add(this.legoImg.surface);

  node
    .add(this.rocketImg.modifier)
    .add(this.rocketImg.surface);

  node
    .add(this.yellowTicker1.modifier)
    .add(this.yellowTicker1.tickerModifier)
    .add(this.yellowTicker1.surface);

  node
    .add(this.yellowTicker2.modifier)
    .add(this.yellowTicker2.tickerModifier)
    .add(this.yellowTicker2.surface);

  node
    .add(this.title1.modifier)
    .add(this.title1.surface);

  node
    .add(this.content1.modifier)
    .add(this.content1.surface);

  node
    .add(this.title2.modifier)
    .add(this.title2.surface);

  node
    .add(this.content2.modifier)
    .add(this.content2.surface);

  node
    .add(this.content3.modifier)
    .add(this.content3.surface);

  node
    .add(this.content4.modifier)
    .add(this.content4.surface);

  node
    .add(this.title3.modifier)
    .add(this.title3.surface);


  node
    .add(this.content5.modifier)
    .add(this.content5.surface);

  node
    .add(this.content6.modifier)
    .add(this.content6.surface);
}

/**
 * Page2 Constructor
 */

function Page2() {
  View.apply(this, arguments);
  _createLayout.call(this);
}

/*!
 * extend View
 */

Page2.prototype = Object.create(View.prototype);
Page2.prototype.constructor = Page2;
Page2.DEFAULT_OPTIONS = {
  size: [undefined, 1650]
};

/*!
 * module exports
 */

module.exports = Page2;
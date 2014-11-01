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

var title1 = `<h1 class='title title--section title--pink'>they dont discriminate</h1>`;
var content1 = `
<div class='Grid Grid--alignMiddle'>
  <div class='Grid-cell u-size1of3'>
    <span class='u-textHuge'>35</span>
    <span class='u-textLarge'>%</span>
  </div>
  <div class='Grid-cell u-size2of3'>
    describe their company as both B2B & B2C
  </div>
</div>`;

var title2 = `<h1 class='title title--section title--pink'>and neither do we</h1>`;
var content2 = `
  <div class='note'>We welcome startups from all over the hype curve. Here are just a few.</div>
  <ul class='u-pad-top-20 u-pad-left-20'>
    <li>Data Analytics</li>
    <li>3D printing</li>
    <li>E-Payments</li>
    <li>Crypto-currency</li>
    <li>Saas</li>
    <li>Baas</li>
    <li>Geolocation</li>
    <li>Geolocation</li>
    <li>APIs</li>
    <li>Mobile Gaming</li>
    <li>Financial Tech</li>
    <li>E-Publishing</li>
    <li>Internet of Things</li>
  </ul>
</div>`;

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
    transform: Transform.translate(20, 0, 0)
  });

  // content 1
  this.content1 = {};
  this.content1.surface = new Surface({
    content: content1,
    size: [400, true]
  });

  this.content1.modifier = new StateModifier({
    transform: Transform.translate(20, 100, 0)
  });

  // title 2
  this.title2 = {};
  this.title2.surface = new Surface({
    content: title2,
    size: [300, true]
  });

  this.title2.modifier = new StateModifier({
    transform: Transform.translate(20, 200, 0)
  });

  // content 2
  this.content2 = {};
  this.content2.surface = new Surface({
    content: content2,
    size: [300, true]
  });

  this.content2.modifier = new StateModifier({
    transform: Transform.translate(20, 300, 0)
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
 * Page4 Constructor
 */

function Page4() {
  View.apply(this, arguments);
  _createLayout.call(this);
}

/*!
 * extend View
 */

Page4.prototype = Object.create(View.prototype);
Page4.prototype.constructor = Page4;
Page4.DEFAULT_OPTIONS = {};

/*!
 * module exports
 */

module.exports = Page4;
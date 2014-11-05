/*!
 * module deps
 */

var Surface = require('famous/core/Surface'),
    ImageSurface = require('famous/surfaces/ImageSurface'),
    Transform = require('famous/core/Transform'),
    StateModifier = require('famous/modifiers/StateModifier'),
    View = require('famous/core/View');

/*!
 * templates
 */

var content1 = `
<div>
  <div style='float: left; width: 280px; height: 450px; shape-outside: polygon(0px 0px, 283px -1px, 282px 199px, -4px 424px);'></div>
  <div>
    <p class='u-pad-top-20'>These numbers were taken between September 1st and September 15th, 2014 from the 135 members of PARISOMA.</p>
    <p class='u-pad-top-20'>Over the past 6 years, we’ve been there through it all - through launch parties and pivot strategies, through wireframes and W9’s, from ramen noodles to funding rounds. We’ve seen many failures and a few great successes.</p>
    <p class='u-pad-top-20'>While members come and go, the core DNA of our community remains the same.</p>
    <p class='u-pad-top-20'>PARISOMA is a space where ideas meet execution. We foster an experimental environment through coworking, classes, and events.</p>
  </div>
</div>`;

/**
 * create view layout
 */

function _createLayout(){

  // fawn image
  this.fawnImg = {};
  this.fawnImg.surface = new ImageSurface({
    content: '/assets/images/14-fawn.png',
    size: [true, true]
  });

  this.fawnImg.modifier = new StateModifier({
    origin: [0.5, 0.5],
    align: [0.5, 0.5],
    transform: Transform.translate(-250, -140, 0)
  });

  // open image
  this.openImg = {};
  this.openImg.surface = new ImageSurface({
    content: '/assets/images/15-open.png',
    size: [true, true]
  });

  this.openImg.modifier = new StateModifier({
    origin: [0.5, 0.5],
    align: [0.5, 0.5],
    transform: Transform.translate(-400, 300, 0)
  });

  // content 1
  this.content1 = {};
  this.content1.surface = new Surface({
    content: content1,
    size: [700, 470]
  });

  this.content1.modifier = new StateModifier({
    origin: [0.5, 0.5],
    align: [0.5, 0.5],
    transform: Transform.translate(100, 0, 0)
  });

  this
    .add(this.fawnImg.modifier)
    .add(this.fawnImg.surface);

  this
    .add(this.openImg.modifier)
    .add(this.openImg.surface);

  this
    .add(this.content1.modifier)
    .add(this.content1.surface);
}

/**
 * Page7 Constructor
 */

function Page7() {
  View.apply(this, arguments);
  _createLayout.call(this);
}

/*!
 * extend View
 */

Page7.prototype = Object.create(View.prototype);
Page7.prototype.constructor = Page7;
Page7.DEFAULT_OPTIONS = {};

/*!
 * module exports
 */

module.exports = Page7;
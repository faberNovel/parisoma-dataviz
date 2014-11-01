/*!
 * module deps
 */

var Surface = require('famous/core/Surface'),
    StateModifier = require('famous/modifiers/StateModifier'),
    View = require('famous/core/View');

/*!
 * templates
 */

var content1 = `<p>These numbers were taken between September 1st and September 15th, 2014 from the 135 members of PARISOMA. Over the past 6 years, we’ve been there through it all - through launch parties and pivot strategies, through wireframes and W9’s, from ramen noodles to funding rounds. We’ve seen many failures and a few great successes. While members come and go, the core DNA of our community remains the same. PARISOMA is a space where ideas meet execution. We foster an experimental environment through coworking, classes, and events.</p>`;

/**
 * create view layout
 */

function _createLayout(){

  // content 1
  this.content1 = {};
  this.content1.surface = new Surface({
    content: content1,
    size: [500, undefined]
  });

  this.content1.modifier = new StateModifier({
  });

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
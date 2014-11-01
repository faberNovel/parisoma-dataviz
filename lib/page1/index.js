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

var title1 = `
<h1 class='title title--intro title--pink u-textRight'>Who starts a Startup?</h1>`;

var content1 = `
<p>
Starting a company has never been easier.
While entrepreneurship was once the calling of the venturous few,
it has since become a career path chosen by many.
At PARISOMA, we have hosted over 450 entrepreneurs for the past six years.
We know that two startup founders are the same,
we chose to ask our members - who starts a startup?
</p>`;

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
    origin: [0.5, 0.5],
    align: [0.5, 0.5]
  });

  // text
  this.text = {};
  this.text.surface = new Surface({
    size: [780, 300],
    content: content1
  });

  this.text.modifier = new StateModifier({
    origin: [0.5, 0],
    align: [0.5, 0],
    transform: Transform.translate(0, 50, 0)
  });

  this
    .add(this.text.modifier)
    .add(this.text.surface);

  this
    .add(this.title1.modifier)
    .add(this.title1.surface);
}

/**
 * Page1 Constructor
 */

function Page1() {
  View.apply(this, arguments);
  _createLayout.call(this);
}

/*!
 * extend View
 */

Page1.prototype = Object.create(View.prototype);
Page1.prototype.constructor = Page1;
Page1.DEFAULT_OPTIONS = {};

/*!
 * module exports
 */

module.exports = Page1;
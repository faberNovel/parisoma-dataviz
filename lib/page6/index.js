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

var title1 = `<h1 class='title title--section title--yellow'>they want your money</h1>`;
var content1 = `
  <div>
    <div>
      <div>
        <span class='u-textHuge'>41</span>
        <span class='u-textLarge'>%</span>
      </div>
      <div>operate on seed funding</div>
    </div>
    <div>
      <div>
        <span class='u-textHuge'>41</span>
        <span class='u-textLarge'>%</span>
      </div>
      <div>are using personal funds</div>
    </div>
    <div>
      <div>
        <span class='u-textHuge'>13</span>
        <span class='u-textLarge'>%</span>
      </div>
      <div>rely on funding from <br> family & friends</div>
    </div>
  </div>`;

var title2 = `<h1 class='title title--section title--pink u-textRight'>and they are hiring</h1>`;
var content2 = `
<div>
  <div>
    <span class='u-textHuge'>47</span>
    <span class='u-textLarge'>%</span>
  </div>
  <div>say that talent acquisition is currently there biggest challenge</div>
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
    transform: Transform.translate(20, 200, 0)
  });

  // content 1
  this.content1 = {};
  this.content1.surface = new Surface({
    content: content1,
    size: [300, true]
  });

  this.content1.modifier = new StateModifier({
    transform: Transform.translate(400, 0, 0)
  });

  // title 2
  this.title2 = {};
  this.title2.surface = new Surface({
    content: title2,
    size: [200, true]
  });

  this.title2.modifier = new StateModifier({
    transform: Transform.translate(0, 500, 0)
  });

  // content 2
  this.content2 = {};
  this.content2.surface = new Surface({
    content: content2,
    size: [300, true]
  });

  this.content2.modifier = new StateModifier({
    transform: Transform.translate(300, 500, 0)
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
 * Page6 Constructor
 */

function Page6() {
  View.apply(this, arguments);
  _createLayout.call(this);
}

/*!
 * extend View
 */

Page6.prototype = Object.create(View.prototype);
Page6.prototype.constructor = Page6;
Page6.DEFAULT_OPTIONS = {};

/*!
 * module exports
 */

module.exports = Page6;
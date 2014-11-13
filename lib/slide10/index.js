/*!
 * module deps
 */

var Surface = require('famous/core/Surface'),
    Easing = require('famous/transitions/Easing'),
    ImageSurface = require('famous/surfaces/ImageSurface'),
    Transform = require('famous/core/Transform'),
    StateModifier = require('famous/modifiers/StateModifier'),
    ViewList = require('view-list'),
    SlideBase = require('slide');

/*!
 * globals
 */

var list = [
  'These numbers were taken between September 1st and September 15th, 2014 from the 135 members of PARISOMA.',
  'Over the past 6 years, we’ve been there through it all - through launch parties and pivot strategies, through wireframes and W9’s, from ramen noodles to funding rounds. We’ve seen many failures and a few great successes.',
  'While members come and go, the core DNA of our community remains the same.',
  'PARISOMA is a space where ideas meet execution. We foster an experimental environment through coworking, classes, and events.'
];

/**
 * create view layout
 */

function _createLayout(){

  /*!
   * image
   */

  this.buildingImg = {};
  this.buildingImg.surface = new ImageSurface({
    content: require('url!../../assets/images/14-building.png'),
    size: [true, true]
  });

  this.buildingImg.modifier = new StateModifier({
    origin: [0.5, 0.5],
    align: [0.5, 0.5],
    transform: Transform.translate(-250, -140, 0)
  });

  /*!
   * list
   */

  this.list = {};
  this.list.surface = new ViewList({
    itemSpacing: 40
  });

  this.list.surface.sequenceFrom(list.map(function(text) {
    return new Surface({
      content: text,
      size: [450, true]
    });
  }));

  this.list.modifier = new StateModifier({
    origin: [0.5, 0],
    align: [0.5, 0],
    transform: Transform.translate(240, 0, 0)
  });

  /*!
   * contact
   */

  this.info = {};
  this.info.surface = new Surface({
    content: `
    <div class='contact'>
      <a href='href="https://maps.google.com/maps?q=PARISOMA,+169+11th+Street,+San+Francisco,+CA&hl=en&ll=37.775142,-122.414882&spn=0.00982,0.01929&sll=37.775447,-122.414882&sspn=0.00982,0.01929&hq=PARISOMA,+169+11th+Street,+San+Francisco,+CA&t=m&z=16"'>169 11th street, San Francisco, CA 94103</a>
      <a href="mailto:connect@parisoma.com" target="_blank">connect@parisoma.com</a>
      <a href="tel:+14156266406">+1 415 626 6406</a>
    </div>
    `
  });

  this.info.modifier = new StateModifier({
    size: [true, true],
    align: [0.5, 0.5],
    origin: [0.5, 0.5],
    opacity: 0,
    transform: Transform.translate(-150, 600, 0)
  });

  this
    .add(this.buildingImg.modifier)
    .add(this.buildingImg.surface);

  this
    .add(this.list.modifier)
    .add(this.list.surface);

  this
    .add(this.info.modifier)
    .add(this.info.surface);
}

/**
 * Slide Constructor
 */

function Slide() {
  SlideBase.apply(this, arguments);
  _createLayout.call(this);
  this.list.surface.openOne();
  this._steps = [

    function() {
      this.list.surface.openOne();
    },

    function() {
      this.list.surface.openOne();
    },

    function() {
      this.list.surface.openOne();
    },

    function() {

      /*!
       * tagline
       */

      this.tagline = {};
      this.tagline.surface =  this.list.surface._items._.array[3];
      this.tagline.modifier = new StateModifier({
        origin: [0, 0],
        align: [0, 0],
        size: this.list.surface.render().target[3].size,
        transform: [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 415, 450, 0, 1]
      });


      this.list.modifier.setOpacity(0, { duration : 1000, curve: Easing.outBack });

      this.buildingImg.modifier.setOpacity(0, { duration : 500, curve: Easing.outBack });

      this.tagline.surface.setSize([530, 90]);
      this.tagline.modifier.setTransform(Transform.translate(250, 340, 0), { duration : 500, curve: Easing.outBack });

      this.info.modifier
        .setTransform(Transform.translate(-150, 200, 0), { duration : 500, curve: Easing.outBack })
        .setOpacity(1, { duration : 500, curve: Easing.outBack });

      this
        .add(this.tagline.modifier)
        .add(this.tagline.surface);

      this.logo.animate2();
      this.hasAnimated = true;
    }
  ];

}

/*!
 * extend SlideBase
 */

Slide.prototype = Object.create(SlideBase.prototype);
Slide.prototype.constructor = Slide;

Slide.prototype.didEnter = function() {
  if (this.hasAnimated) {
    this.logo.animate2();
  } else {
    setTimeout(this.playNextAnimation.bind(this), 4000);
    setTimeout(this.playNextAnimation.bind(this), 6000);
    setTimeout(this.playNextAnimation.bind(this), 8000);
    setTimeout(this.playNextAnimation.bind(this), 10000);
  }
};

Slide.prototype.didLeave = function() {
  this.logo.animate(true);
};

/*!
 * module exports
 */

module.exports = Slide;
/*!
 * load styles
 */

require('famous/core/famous.css');
require('./index.css');

/*!
 * module deps
 */

var Engine = require('famous/core/Engine'),
    KeyCodes = require('famous/utilities/KeyCodes'),
    Transform = require('famous/core/Transform'),
    ScrollContainer = require('famous/views/ScrollContainer'),
    Modifier = require('famous/core/Modifier'),
    ContainerSurface = require('famous/surfaces/ContainerSurface'),
    Slide01 = require('slide01'),
    Slide02 = require('slide02'),
    Slide03 = require('slide03'),
    Slide04 = require('slide04'),
    Slide05 = require('slide05'),
    Slide06 = require('slide06'),
    Slide07 = require('slide07'),
    Slide08 = require('slide08'),
    Slide09 = require('slide09'),
    Slide10 = require('slide10'),
    Logo = require('logo');


var mainContext = Engine.createContext();
mainContext.setPerspective(500);

var Slides = [Slide01, Slide02, Slide03, Slide04, Slide05, Slide06, Slide07, Slide08, Slide09, Slide10];
// var Slides = [Slide02];

var views = [];
var surfaces = [];

var scrollContainer = new ScrollContainer();
scrollContainer.sequenceFrom(surfaces);

/*!
 * kick off
 */

// var logo, container;

var logo = new Logo();
var container = new ContainerSurface({
  size: [undefined, undefined]
});

container
  .add(new Modifier({
    align: [0.5, 0.5],
    origin: [0.5, 0.5],
    transform: Transform.multiply(
      Transform.translate(0, 32, 0),
      Transform.scale(0.5)
    )
  }))
  .add(logo);

container.pipe(scrollContainer);
views.push(logo);
surfaces.push(container);

// genericSync.pipe(logo);
// Engine.pipe(logo);

// logo.on('update', function() {
//   console.log('xxxx');
// });

// logo._eventInput.on('update', function() {
//   console.log('xxxx');
// });

// logo._eventInput.on('keydown', function() {
//   console.log('keydown');
// });

// logo._eventOutput.on('update', function() {
//   console.log('xxxx');
// });



// mainContext.add(new Modifier({
//   origin: [0.5, 0.5],
//   align: [0.5, 0],
//   opacity: 0.5
// })).add(new ImageSurface({
//   content: '/assets/layer.png',
//   size: [true, true],
//   properties: {
//     zIndex: 2
//   }
// }));

Slides.forEach(function (Slide) {
  var slide, container;

  container = new ContainerSurface({
    size: [980, window.innerHeight]
  });

  slide = new Slide();
  container.add(slide);
  views.push(slide);
  surfaces.push(container);
  Engine.pipe(slide);
});

container = new ContainerSurface({
  size: [980, undefined]
});

container.add(scrollContainer);

mainContext
  .add(new Modifier({
    align: [0.5, 0.5],
    origin: [0.5, 0.5],
  }))
  .add(container);


Engine.on('keydown', function(e) {
  var current;
  setTimeout(function() {
    if (e.defaultPrevented) return;
    if (e.which === KeyCodes.UP_ARROW) {
      current = scrollContainer.scrollview.goToPreviousPage();
      if (current) views[current.index]._eventInput.trigger('enter', { direction: -1 });
      if (current && views[current.index + 1]) views[current.index + 1]._eventInput.trigger('leave', { direction: - 1 });
    }
    else if (e.which === KeyCodes.DOWN_ARROW) {
      current = scrollContainer.scrollview.goToNextPage();
      if (current) views[current.index]._eventInput.trigger('enter', { direction: 1 });
      if (current && views[current.index - 1]) views[current.index - 1]._eventInput.trigger('leave', { direction: 1 });
    }
  }, 0);
});

window.scrollview = scrollContainer.scrollview;

// setTimeout(function() {
//   var scroller = window.scroller = scrollContainer.scrollview;
//   scroller.goToPage(1);
// }, 100);

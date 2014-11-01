/*!
 * load styles
 */

require('famous/core/famous.css');
require('./index.css');

/*!
 * module deps
 */

var Engine = require('famous/core/Engine'),
    RenderController = require('famous/views/RenderController'),
    ScrollView = require('famous/views/ScrollView'),
    Modifier = require('famous/core/Modifier'),
    ContainerSurface = require('famous/surfaces/ContainerSurface'),
    Page1 = require('page1'),
    Page2 = require('page2'),
    Page3 = require('page3'),
    Page4 = require('page4'),
    Page5 = require('page5'),
    Page6 = require('page6'),
    Page7 = require('page7'),
    Logo = require('logo');


/*!
 * register animation
 */

var Transitionable = require('famous/transitions/Transitionable'),
    SpringTransition = require('famous/transitions/SpringTransition'),
    WallTransition = require('famous/transitions/WallTransition'),
    SnapTransition = require('famous/transitions/SnapTransition');

Transitionable.registerMethod('spring', SpringTransition);
Transitionable.registerMethod('spring', SpringTransition);
Transitionable.registerMethod('wall', WallTransition);
Transitionable.registerMethod('snap', SnapTransition);

/*!
 * globals
 */

var mainContext = Engine.createContext(),
    renderController = new RenderController(),
    Pages = [Page1, Page2, Page3, Page4, Page5, Page6, Page7],
    surfaces = [];

/*!
 * kick off
 */

mainContext.setPerspective(500);


var container = new ContainerSurface({
  size: [980, 800]
});

container.add(new Modifier({
  align: [0.5, 0.5],
  origin: [0.5, 0.5]
}))
.add(new Logo());
surfaces.push(container);

Pages.forEach(function (Page) {
  var container = new ContainerSurface({
    size: [980, 800],
    properties: {
      outline: '2px solid rgb(255, 31, 171)'
    }
  });
  container.add(new Page());
  surfaces.push(container);
});


mainContext
  .add(new Modifier({
    align: [0.5, 0.5],
    origin: [0.5, 0.5],
  }))
  .add(renderController);

var counter = 0;
renderController.show(surfaces[counter]);
Engine.on('keydown', function(e) {

  if (e.which === 39) {
    counter++;
  } else if (counter > 0 && e.which === 37) {
    counter--;
  }

  if (e.which === 38) {}

  this.show(surfaces[counter % surfaces.length]);
}.bind(renderController));

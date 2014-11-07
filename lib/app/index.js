// /*!
//  * load styles
//  */

require('famous/core/famous.css');
require('./index.css');

/*!
 * module deps
 */

var Engine = require('famous/core/Engine'),
    KeyCodes = require('famous/utilities/KeyCodes'),
    Transform = require('famous/core/Transform'),
    Modifier = require('famous/core/Modifier'),
    ContainerSurface = require('famous/surfaces/ContainerSurface'),
    RenderController = require('famous/views/RenderController'),

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
// var Slides = [ViewStat];
var views = [];

var renderController = new RenderController();

/*!
 * kick off
 */

function wrap(view) {
  var container = new ContainerSurface({
    size: [800, 800],
    properties: {
      // backgroundColor: 'lightgray'
    }
  });

  container
    .add(new Modifier({
      align: [0.5, 0.5],
      origin: [0.5, 0.5]
    }))
    .add(view);

  Engine.pipe(view);
  view.container = container;
  views.push(view);
}

Slides.forEach(function (Slide) {
  wrap(new Slide());
});

mainContext
  .add(new Modifier({
    align: [0.5, 0.5],
    origin: [0.5, 0.5],
    transform: Transform.scale(1)
  }))
  .add(renderController);


var index = 0;

renderController.show(views[index].container);
views[index]._eventInput.trigger('enter');




var GenericSync = require('famous/inputs/GenericSync');
var MouseSync = require('famous/inputs/MouseSync');
var TouchSync = require('famous/inputs/TouchSync');
var ScrollSync = require('famous/inputs/ScrollSync');
var Utility = require('famous/utilities/Utility');


GenericSync.register({
    'mouse': MouseSync,
    'touch': TouchSync,
    'scroll': ScrollSync
});


GenericSync.register({
  mouse : MouseSync,
  touch : TouchSync,
  scroll : ScrollSync
});


var sync = new GenericSync(['mouse', 'touch', 'scroll']);
Engine.pipe(sync);

sync.on("start", function(data) {
  console.log('start ...', data);
});

// sync.on("update", function(data) {
//   console.log('update ...', data);
// });

sync.on("end", function(data) {
  console.log('update ...', data);
});



Engine.on('keydown', function(e) {
  setTimeout(function() {
    if (e.defaultPrevented) return;
    if (e.which === KeyCodes.UP_ARROW && views[index - 1]) {
      index--;
      renderController.show(views[index].container);
      if (views[index + 1]) views[index + 1]._eventInput.trigger('leave', { direction: - 1 });
      views[index]._eventInput.trigger('enter', { direction: -1 });
    } else if (e.which === KeyCodes.DOWN_ARROW && views[index + 1]) {
      index++;
      renderController.show(views[index].container);
      if (views[index - 1]) views[index - 1]._eventInput.trigger('leave', { direction: 1 });
      views[index]._eventInput.trigger('enter', { direction: 1 });
    }
  }, 0);
});


/*!
 * logo cover
 */

var logo = new Logo();
mainContext.add(logo);
logo.animate();


// var Engine          = require('famous/core/Engine');
// var Surface         = require('famous/core/Surface');
// var StateModifier   = require('famous/modifiers/StateModifier');
// var PhysicsEngine   = require('famous/physics/PhysicsEngine');
// var Circle          = require('famous/physics/bodies/Circle');
// var Spring          = require('famous/physics/constraints/Distance');
// var Walls           = require('famous/physics/constraints/Walls');

// var context = Engine.createContext();
// var physicsEngine = new PhysicsEngine();

// context.setPerspective(500);

// /*!
//  * ball
//  */

// var ball = new Surface ({
//   size: [200, 200],
//   properties: {
//     backgroundColor: 'red',
//     borderRadius: '100px'
//   }
// });

// ball.state = new StateModifier({
//     align: [0.5, 0.5],
//     origin: [0.5, 0.5]
// });

// ball.particle = new Circle({
//   radius: 100
// });


// !
//  * add to context


// physicsEngine.addBody(ball.particle);
// context.add(ball.state).add(ball);

// var walls    = new Walls({ size: [600, 600], origin: [0.5, 0.5]});
// physicsEngine.attach( walls.components[0],  [ball.particle]);
// physicsEngine.attach( walls.components[1],  [ball.particle]);
// physicsEngine.attach( walls.components[2],  [ball.particle]);
// physicsEngine.attach( walls.components[3],  [ball.particle]);
// // physicsEngine.attach( walls,  [ball.particle]);
// // physicsEngine.attach( rightWall, [ball.particle]);
// // physicsEngine.attach( topWall,   [ball.particle]);
// // physicsEngine.attach( bottomWall,[ball.particle]);

// ball.particle.setVelocity([0.5,1,0]);

// physicsEngine.attach( walls.components[3],  [ball.particle]);


// Engine.on('prerender', function(){
//   ball.state.setTransform(ball.particle.getTransform())
// });
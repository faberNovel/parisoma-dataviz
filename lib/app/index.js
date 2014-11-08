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
    GenericSync = require('famous/inputs/GenericSync'),
    MouseSync = require('famous/inputs/MouseSync'),
    TouchSync = require('famous/inputs/TouchSync'),
    ScrollSync = require('famous/inputs/ScrollSync'),
    Utility = require('famous/utilities/Utility'),
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

/*!
 * register syncs
 */

GenericSync.register({
  mouse : MouseSync,
  touch : TouchSync,
  scroll : ScrollSync
});

var mainContext = Engine.createContext();
var Slides = [Slide01, Slide02, Slide03, Slide04, Slide05, Slide06, Slide07, Slide08, Slide09, Slide10];
var views = [];
var renderController = new RenderController();
var currentSlide = -1;

/*!
 * kick off
 */

mainContext.setPerspective(500);

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


var scaleRatio = window.innerHeight < 800
  ? 0.7
  : 1;

var scaler = new Modifier({
  align: [0.5, 0.5],
  origin: [0.5, 0.5],
  transform: Transform.scale(scaleRatio)
});

var scaleNode = mainContext.add(scaler);


var sync = new GenericSync(
  ['mouse', 'touch', 'scroll'], {
    direction : Utility.Direction.Y,
    rails: true
  });

Engine.pipe(sync);

sync.on('end', function(data) {
  if (data.position > 0) {
    Engine.emit('change-slide', new CustomEvent('change-slide', { cancelable: true, detail: { direction: -1 } }));
  } else {
    Engine.emit('change-slide', new CustomEvent('change-slide', { cancelable: true, detail: { direction: 1 } }));
  }
});

function changeSlide(e) {
  if (e.defaultPrevented) return;
  if (!views[currentSlide + e.detail.direction]) return;

  var prev = currentSlide;
  currentSlide = currentSlide + e.detail.direction;

  views[currentSlide].willEnter(e.detail);
  if (views[prev]) views[prev].willLeave(e.detail);

  renderController.show(views[currentSlide].container);

  views[currentSlide].didEnter(e.detail);
  if (views[prev]) views[prev].didLeave(e.detail);
}

Engine.on('keydown', function(e) {
  if (e.which === KeyCodes.UP_ARROW || e.which === KeyCodes.RIGHT_ARROW) {
    Engine.emit('change-slide', new CustomEvent('change-slide', { cancelable: true, detail: { direction: 1 } }));
  } else if (e.which === KeyCodes.DOWN_ARROW || e.which === KeyCodes.LEFT_ARROW) {
    Engine.emit('change-slide', new CustomEvent('change-slide', { cancelable: true, detail: { direction: -1 } }));
  }
});

Engine.on('change-slide', function(e) {
  setTimeout(function() { changeSlide(e); }, 0);
});

/*!
 * logo cover
 */

var logo = new Logo();


scaleNode.add(renderController);
scaleNode.add(logo);

logo.animate();
changeSlide({ detail: { direction: 1 }});


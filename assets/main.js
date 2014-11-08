/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	// /*!
	//  * load styles
	//  */
	
	__webpack_require__(15);
	__webpack_require__(12);
	
	/*!
	 * module deps
	 */
	
	var Engine = __webpack_require__(17),
	    KeyCodes = __webpack_require__(20),
	    Transform = __webpack_require__(18),
	    Modifier = __webpack_require__(19),
	    ContainerSurface = __webpack_require__(22),
	    RenderController = __webpack_require__(23),
	
	    Slide01 = __webpack_require__(1),
	    Slide02 = __webpack_require__(2),
	    Slide03 = __webpack_require__(3),
	    Slide04 = __webpack_require__(4),
	    Slide05 = __webpack_require__(5),
	    Slide06 = __webpack_require__(6),
	    Slide07 = __webpack_require__(7),
	    Slide08 = __webpack_require__(8),
	    Slide09 = __webpack_require__(9),
	    Slide10 = __webpack_require__(10),
	    Logo = __webpack_require__(11);
	
	
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
	
	var scaler = new Modifier({
	  align: [0.5, 0.5],
	  origin: [0.5, 0.5],
	  transform: Transform.scale(1)
	});
	
	var scaleNode = mainContext.add(scaler);
	
	
	
	
	var index = 0;
	
	renderController.show(views[index].container);
	views[index]._eventInput.trigger('enter');
	
	var GenericSync = __webpack_require__(24);
	var MouseSync = __webpack_require__(25);
	var TouchSync = __webpack_require__(26);
	var ScrollSync = __webpack_require__(27);
	var Utility = __webpack_require__(21);
	
	
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
	
	var sync = new GenericSync(
	  ['mouse', 'touch', 'scroll'], {
	    direction : Utility.Direction.Y,
	    rails: true
	  });
	
	Engine.pipe(sync);
	
	sync.on('start', function(data) {
	  console.log('start ...', data);
	});
	
	// sync.on('update', function(data) {
	//   console.log('update ...', data);
	// });
	
	// sync.on('end', function(data) {
	//   console.log('end...', data);
	// });
	
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
	
	
	scaleNode.add(renderController);
	scaleNode.add(logo);
	
	
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

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * module deps
	 */
	
	var Surface = __webpack_require__(28),
	    ImageSurface = __webpack_require__(29),
	    StateModifier = __webpack_require__(31),
	    Easing = __webpack_require__(32),
	    Transform = __webpack_require__(18),
	    View = __webpack_require__(30);
	
	/*!
	 * globals
	 */
	
	var toRadian = Math.PI/180;
	
	
	/**
	 * create view layout
	 */
	
	function _createLayout(){
	
	  // background surface
	  this.bg = {};
	  this.bg.surface = new ImageSurface({
	    content: './assets/images/01-parisoma.png',
	    size: [true, true]
	  });
	
	  this.bg.modifier = new StateModifier({
	    opacity: 0,
	    transform: Transform.translate(0, -600, 0)
	  });
	
	  // text
	  this.text = {};
	  this.text.surface = new Surface({
	    size: [780, 300],
	    content: ("<div class='text--white'><p>Starting a company has never been easier. While entrepreneurship was once the calling of the venturous few, it has since become a career path chosen by many. At PARISOMA, we have hosted over 450 entrepreneurs for the past six years.</p><p class='u-pad-top-10'>We know that two startup founders are the same, we chose to ask our members - who starts a startup?</p></div>")
	  });
	
	  this.text.modifier = new StateModifier({
	    origin: [0.5, 0],
	    align: [0.5, 0],
	    transform: Transform.translate(0, 50, 0),
	    opacity: 0
	  });
	
	  // yellow ticker
	  this.yellowTicker = {};
	  this.yellowTicker.surface = new Surface({
	    size: [139, 112],
	    classes: ['ticker', 'ticker--yellow']
	  });
	
	  this.yellowTicker.tickerModifier = new StateModifier({
	    transform: Transform.skew(0, -39 * toRadian, 0)
	  });
	
	  this.yellowTicker.modifier = new StateModifier({
	    origin: [1, 0],
	    align: [0.5, 0],
	    transform: Transform.translate(0, 220, 0)
	  });
	
	  // title 1
	  this.title1 = {};
	  this.title1.surface = new Surface({
	    content: ("<h1 class='title title--intro u-textRight'>Who starts a Startup?</h1>"),
	    size: [400, true]
	  });
	
	  this.title1.modifier = new StateModifier({
	    origin: [0, 0],
	    align: [0.5, 0],
	    transform: Transform.translate(-115, 280, 0)
	  });
	
	  // title 1
	  this.who = {};
	  this.who.surface = new Surface({
	    content: ("<h1 class='title title--intro'>Who</h1>"),
	    size: [105, true],
	    properties: {
	      overflow: 'hidden'
	    }
	  });
	
	  this.who.modifier = new StateModifier({
	    origin: [1, 0],
	    align: [0.5, 0],
	    transform: Transform.translate(0, 280, 0)
	  });
	
	  // pink ticker
	  this.pinkTicker = {};
	  this.pinkTicker.surface = new Surface({
	    size: [148, 120],
	    classes: ['ticker', 'ticker--pink']
	  });
	
	  this.pinkTicker.tickerModifier = new StateModifier({
	    transform: Transform.skew(0, 39 * toRadian, 0),
	    opacity: 1
	  });
	
	  this.pinkTicker.modifier = new StateModifier({
	    origin: [0, 0],
	    align: [0.5, 0],
	    transform: Transform.translate(0, 400, 0)
	  });
	
	  // light image
	  this.light = {};
	  this.light.surface = new ImageSurface({
	    content: './assets/images/02-light.png',
	    size: [true, true],
	  });
	
	  this.light.modifier = new StateModifier({
	    origin: [1, 0],
	    align: [0.5, 0],
	    opacity: 0,
	    transform: Transform.translate(0, 1000, 0)
	  });
	
	  // group image
	  this.group = {};
	  this.group.surface = new ImageSurface({
	    content: './assets/images/03-group.png',
	    size: [true, true]
	  });
	
	  this.group.modifier = new StateModifier({
	    transform: Transform.translate(-2 * 384, 2 * 460 , 0),
	    opacity: 0
	  });
	
	  this.modifier = new StateModifier({
	    opacity: 0
	  });
	
	  var node = this
	    .add(this.modifier);
	
	  node
	    .add(this.bg.modifier)
	    .add(this.bg.surface);
	
	  node
	    .add(this.light.modifier)
	    .add(this.light.surface);
	
	  node
	    .add(this.group.modifier)
	    .add(this.group.surface);
	
	  node
	    .add(this.pinkTicker.modifier)
	    .add(this.pinkTicker.tickerModifier)
	    .add(this.pinkTicker.surface);
	
	  this.titleGroupModifer = new StateModifier({
	    transform: Transform.translate(0, 0, 0)
	  });
	
	  var titleGroupNode = node.add(this.titleGroupModifer);
	
	  titleGroupNode
	    .add(this.yellowTicker.modifier)
	    .add(this.yellowTicker.tickerModifier)
	    .add(this.yellowTicker.surface);
	
	  titleGroupNode
	    .add(this.who.modifier)
	    .add(this.who.surface);
	
	  titleGroupNode
	    .add(this.title1.modifier)
	    .add(this.title1.surface);
	
	  node
	    .add(this.text.modifier)
	    .add(this.text.surface);
	
	}
	
	function _onEnter() {
	
	  function doStep0() {
	    this.modifier.setOpacity(1, { duration : 1500, curve: Easing.outBack });
	  }
	
	  function doStep1() {
	    this.title1.surface.addClass('text--white');
	    // this.titleGroupModifer.setTransform(Transform.translate(0, 0, 0), { duration : 800, curve: Easing.outBack });
	
	    this.text.modifier.setOpacity(1, { duration : 800, curve: Easing.outBack });
	
	    this.bg.modifier.setOpacity(1, { duration : 800, curve: Easing.outBack });
	    this.bg.modifier.setTransform(Transform.translate(0, 0, 0), { duration : 800, curve: Easing.outBack });
	
	    this.light.modifier.setOpacity(1, { duration : 800, curve: Easing.outBack });
	    this.light.modifier.setTransform(Transform.translate(0, 518, 0), { duration : 800, curve: Easing.outBack });
	
	    this.group.modifier.setOpacity(1, { duration : 800, curve: Easing.outBack });
	    this.group.modifier.setTransform(Transform.translate(-384, 460 , 0), { duration : 800, curve: Easing.outBack });
	  }
	
	  setTimeout(doStep0.bind(this), 2000);
	  setTimeout(doStep1.bind(this), 4000);
	
	}
	
	function _onLeave() {
	  this.modifier.setOpacity(0, { duration : 500, curve: Easing.outBack });
	  // this.bg.modifier.setTransform(Transform.translate(0, 100, 0), { duration : 1500, curve: Easing.outBack });
	}
	
	/**
	 * Slide Constructor
	 */
	
	function Slide() {
	  View.apply(this, arguments);
	  _createLayout.call(this);
	
	  this._eventInput.on('enter', _onEnter.bind(this));
	  this._eventInput.on('leave', _onLeave.bind(this));
	}
	
	/*!
	 * extend View
	 */
	
	Slide.prototype = Object.create(View.prototype);
	Slide.prototype.constructor = Slide;
	
	/*!
	 * module exports
	 */
	
	module.exports = Slide;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * module deps
	 */
	
	var Surface = __webpack_require__(28),
	    StateModifier = __webpack_require__(31),
	    Transform = __webpack_require__(18),
	    View = __webpack_require__(30),
	    ViewList = __webpack_require__(33),
	    ViewStat = __webpack_require__(34);
	
	/**
	 * create view layout
	 */
	
	function _createLayout(){
	
	  /*!
	   * title
	   */
	
	  this.title = {};
	  this.title.surface = new Surface({
	    size: [300, true],
	    content: ("<h1 class='title title--section title--pink u-textRight'>they come from all over</h1>")
	  });
	
	  this.title.modifier = new StateModifier({
	    origin: [1, 0.5],
	    align: [0.5, 0.5],
	    transform: Transform.translate(-10, 0, 0)
	  });
	
	  /*!
	   * stat
	   */
	
	  this.stat = {};
	  this.stat.surface = new ViewStat({
	    container: {
	      size: [180, 120]
	    },
	    number: {
	      content: '20'
	    },
	    sign: null,
	    label: {
	      content: ("<p style='text-indent: 80px'>different countries represented</>"),
	      size: [50, true],
	      transform: Transform.translate(0, 24, 0)
	    }
	  });
	
	  this.stat.modifier = new StateModifier({
	    origin: [0, 0.5],
	    align: [0.5, 0.5],
	    transform: Transform.translate(20, 0, 0)
	  });
	
	  /*!
	   * list
	   */
	
	  this.list = {};
	  this.list.surface = new ViewList();
	  this.list.surface.sequenceFrom(['54% USA', '34% Europe'].map(function(el) {
	    return new Surface({
	      content: el,
	      size: [true, true]
	    });
	  }));
	
	  this.list.modifier = new StateModifier({
	    origin: [0, 0.5],
	    align: [0.5, 0.5],
	    transform: Transform.translate(20, 90, 0)
	  });
	
	  /*!
	   * render tree
	   */
	
	  this
	    .add(this.title.modifier)
	    .add(this.title.surface);
	
	  this
	    .add(this.stat.modifier)
	    .add(this.stat.surface);
	
	  this
	    .add(this.list.modifier)
	    .add(this.list.surface);
	}
	
	function _onEnter() {
	  this.stat.surface.count();
	  this.list.surface.open();
	}
	
	function _onLeave() {
	}
	
	/**
	 * Slide Constructor
	 */
	
	function Slide() {
	  View.apply(this, arguments);
	  _createLayout.call(this);
	
	  this._eventInput.on('enter', _onEnter.bind(this));
	  this._eventInput.on('leave', _onLeave.bind(this));
	}
	
	/*!
	 * extend View
	 */
	
	Slide.prototype = Object.create(View.prototype);
	Slide.prototype.constructor = Slide;
	
	/*!
	 * module exports
	 */
	
	module.exports = Slide;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * module deps
	 */
	
	var Surface = __webpack_require__(28),
	    StateModifier = __webpack_require__(31),
	    KeyCodes = __webpack_require__(20),
	    ImageSurface = __webpack_require__(29),
	    Easing = __webpack_require__(32),
	    Transform = __webpack_require__(18),
	    Utility = __webpack_require__(21),
	    View = __webpack_require__(30),
	    ViewList = __webpack_require__(33),
	    ViewStat = __webpack_require__(34);
	
	/*!
	 * globals
	 */
	
	var list1 = [
	  { number: 40, label: 'have a Masters Degree' },
	  { number: 40, label: 'have a Bachelors Degree' },
	  { number: 15, label: 'have a PhD' }
	];
	
	var list2 = [
	  { number: 44, label: 'worked for a large organization' },
	  { number: 27, label: 'worked for another startup' },
	  { number: 2,  label: 'were still in school' }
	];
	
	/**
	 * create view layout
	 */
	
	function _createLayout(){
	
	  /*!
	   * title
	   */
	
	  this.title = {};
	  this.title.surface = new Surface({
	    content: ("<h1 class='title title--section title--pink u-textRight'>they know what they are getting into</h1>"),
	    size: [300, true]
	  });
	
	  this.title.modifier = new StateModifier({
	    origin: [1, 0.5],
	    align: [0.5, 0.5],
	    transform: Transform.translate(0, -150, 0)
	  });
	
	  /*!
	   * stats 1
	   */
	
	  this.stat1 = {};
	  this.stat1.surface = new ViewStat({
	    container: {
	      size: [380, 120]
	    },
	    number: {
	      content: '40'
	    },
	    sign: {
	      transform: Transform.translate(70, 0, 0),
	      content: '%'
	    },
	    ticker: {
	      size: [100, 90],
	      transform: Transform.translate(0, 20, 0)
	    },
	    label: {
	      transform: Transform.translate(120, 0, 0),
	      size: [300, true],
	      content: ("<p><span> consider themselves to be </span><span class='u-textBold'> serial entrepreneurs</span></p>")
	    }
	  });
	  this.stat1.modifier = new StateModifier({
	    origin: [1, 0.5],
	    align: [0.5, 0.5],
	    transform: Transform.translate(0, 50, 0)
	  });
	
	  /*!
	   * lego image
	   */
	
	  this.legoImg = {};
	  this.legoImg.surface = new ImageSurface({
	    content: './assets/images/04-lego.png',
	    size: [true, true]
	  });
	
	  this.legoImg.modifier = new StateModifier({
	    origin: [0, 0.5],
	    align: [0.5, 0.5],
	    transform: Transform.translate(100, 0, 0)
	  });
	
	  /*!
	   * list 1
	   */
	
	  this.list1 = {};
	  this.list1.surface = new ViewList({
	    direction: Utility.Direction.X,
	    itemSpacing: 30
	  });
	
	  this.list1.surface.sequenceFrom(list1.map(function(item) {
	    return new ViewStat({
	      container: {
	        size: [120, 150],
	      },
	      number: {
	        content: item.number,
	        transform: Transform.translate(0, 0, 0)
	      },
	      sign: {
	        content: '%',
	        transform: Transform.translate(70, 0, 0)
	      },
	      label: {
	        content: item.label,
	        size: [100, true],
	        transform: Transform.translate(0, 60, 0)
	      }
	    });
	  }));
	
	  this.list1.modifier = new StateModifier({
	    origin: [1, 0.5],
	    align: [0.5, 0.5],
	    transform: Transform.translate(0, 150, 0)
	  });
	
	  /*!
	   * text 2
	   */
	
	  this.text2 = {};
	  this.text2.surface = new Surface({
	    content: '_before joining PARISOMA',
	    size: [true, true]
	  });
	
	  this.text2.modifier = new StateModifier({
	    origin: [0.5, 0.5],
	    align: [0.5, 0.5],
	    transform: Transform.translate(-80, 30, 0)
	  });
	
	  /*!
	   * list 2
	   */
	
	  this.list2 = {};
	  this.list2.surface = new ViewList({
	    direction: Utility.Direction.X,
	    itemSpacing: 30
	  });
	
	  this.list2.surface.sequenceFrom(list2.map(function(item) {
	    return new ViewStat({
	      container: {
	        size: [120, 150],
	      },
	      number: {
	        content: item.number,
	        transform: Transform.translate(0, 0, 0)
	      },
	      sign: {
	        content: '%',
	        transform: Transform.translate(70, 0, 0)
	      },
	      label: {
	        content: item.label,
	        size: [120, true],
	        transform: Transform.translate(0, 60, 0)
	      }
	    });
	  }));
	
	  this.list2.modifier = new StateModifier({
	    origin: [0.5, 0.5],
	    align: [0.5, 0.5],
	    transform: Transform.translate(0, 110, 0)
	  });
	
	  /*!
	   * steps
	   */
	
	  this.steps = [];
	  this.step1 = new StateModifier({
	  });
	  this.step2 = new StateModifier({
	    opacity: 0
	  });
	
	  /*!
	   * node tree
	   */
	
	  var step1 = this.add(this.step1);
	  var step2 = this.add(this.step2);
	
	  step1
	    .add(this.legoImg.modifier)
	    .add(this.legoImg.surface);
	
	  step1
	    .add(this.title.modifier)
	    .add(this.title.surface);
	
	  step1
	    .add(this.stat1.modifier)
	    .add(this.stat1.surface);
	
	  step1
	    .add(this.list1.modifier)
	    .add(this.list1.surface);
	
	  step2
	    .add(this.text2.modifier)
	    .add(this.text2.surface);
	
	  step2
	    .add(this.list2.modifier)
	    .add(this.list2.surface);
	}
	
	function _onEnter() {
	
	  var doStep0 = function() {
	    this.stat1.surface.bump();
	  };
	
	  var doStep1 = function() {
	    this.list1.surface.open();
	    this.list1.surface.forEach(function(s) { s.count(); });
	  };
	
	  var doStep2 = function() {
	    this.step1.setTransform(Transform.translate(300, -400, -300), { duration : 1000, curve: Easing.outBack });
	    this.step2.setOpacity(1, { duration : 1000, curve: Easing.outBack });
	    this.list2.surface.open();
	    this.list2.surface.forEach(function(s) { s.count(); });
	  };
	
	
	  doStep0.call(this);
	  setTimeout(doStep1.bind(this), 2000);
	  setTimeout(doStep2.bind(this), 4000);
	
	
	}
	
	function _onLeave() {
	}
	
	/**
	 * Slide Constructor
	 */
	
	function Slide() {
	  View.apply(this, arguments);
	  _createLayout.call(this);
	  this._eventInput.on('enter', _onEnter.bind(this));
	  this._eventInput.on('leave', _onLeave.bind(this));
	}
	
	/*!
	 * extend View
	 */
	
	Slide.prototype = Object.create(View.prototype);
	Slide.prototype.constructor = Slide;
	
	/*!
	 * module exports
	 */
	
	module.exports = Slide;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * module deps
	 */
	
	var Surface = __webpack_require__(28),
	    Easing = __webpack_require__(32),
	    StateModifier = __webpack_require__(31),
	    ImageSurface = __webpack_require__(29),
	    Transform = __webpack_require__(18),
	    View = __webpack_require__(30),
	    ViewStat = __webpack_require__(34),
	    ViewList = __webpack_require__(33);
	
	/*!
	 * globals
	 */
	
	var list = [
	  { number: 02, label: 'average size of founding team', ticker: true },
	  { number: 75, label: 'knew their cofounders before going into business together', sign: '%' },
	  { number: 20, label: 'worked with their cofounders at a previous job', sign: '%' },
	  { number: 14, label: 'have known each other since childhood', sign: '%' }
	];
	
	var notes = [
	  '2 founding  teams are siblings',
	  '1 team met at a wedding',
	  '1 team at an event at PARISOMA',
	  '1 team met on a date'
	];
	
	/**
	 * create view layout
	 */
	
	function _createLayout(){
	
	  /*!
	   * rocket image
	   */
	
	  this.rocketImg = {};
	  this.rocketImg.surface = new ImageSurface({
	    content: './assets/images/05-rocket.png',
	    size: [true, true]
	  });
	
	  this.rocketImg.modifier = new StateModifier({
	    origin: [0.5, 0.5],
	    align: [0.5, 0.5],
	    transform: Transform.translate(-360, 180, 0)
	  });
	
	  /*!
	   * title
	   */
	
	  this.title = {};
	  this.title.surface = new Surface({
	    size: [510, true],
	    content: ("<h1 class='title title--section title--pink'>and they know who they are getting into it with</h1>"),
	  });
	
	  this.title.modifier = new StateModifier({
	    origin: [0.5, 0.5],
	    align: [0.5, 0.5],
	    transform: Transform.translate(0, -300, 0)
	  });
	
	  /*!
	   * list
	   */
	
	  this.list = {};
	  this.list.surface = new ViewList({
	    itemSpacing: 10
	  });
	
	  this.list.surface.sequenceFrom(list.map(function(item) {
	    var spec = {
	      container: {
	        size: [350, 100]
	      },
	      number: {
	        content: item.number,
	        transform: Transform.translate(0, 0, 0)
	      },
	      label: {
	        content: item.label,
	        size: [240, true],
	        transform: Transform.translate(120, 0, 0)
	      }
	    };
	
	    if (item.sign) {
	      spec.sign = {
	        content: '%',
	        transform: Transform.translate(70, 0, 0)
	      };
	    }
	
	    if (item.ticker) {
	      spec.ticker = {
	        size: [120, 120],
	        transform: Transform.translate(-30, 80, 0)
	      };
	    }
	
	
	    return new ViewStat(spec);
	  }));
	
	  this.list.modifier = new StateModifier({
	    origin: [0, 0.5],
	    align: [0.5, 0.5],
	    transform: Transform.translate(0, 0, 0)
	  });
	
	
	  /*!
	   * bracket
	   */
	
	  this.bracket = {};
	  this.bracket.surface = new Surface({
	    size: [true, true],
	    content: '{',
	    classes: ['text--gray'],
	    properties: {
	      fontWeight: 100,
	      fontSize: 150,
	      lineHeight: 150
	    }
	  });
	
	  // this.bracket.modifier = new StateModifier({
	  //   origin: [0.5, 0.5],
	  //   align: [0.5, 0.5],
	  //   transform: Transform.translate(100, -20, 0)
	  // });
	
	  /*!
	   * notes
	   */
	
	  this.notes = {};
	  this.notes.surface = new ViewList({
	    itemSpacing: 5
	  });
	
	  this.notes.surface.sequenceFrom(notes.map(function(text) {
	    return new Surface({
	      content: text,
	      size: [300, true],
	      classes: ['note', 'note--gray'],
	    });
	  }));
	
	  this.notes.modifier = new StateModifier({
	    origin: [0, 0.5],
	    align: [0.5, 0.5],
	    transform: Transform.translate(130, 0, 0)
	  });
	
	  this
	    .add(this.rocketImg.modifier)
	    .add(this.rocketImg.surface);
	
	  this
	    .add(this.title.modifier)
	    .add(this.title.surface);
	
	  this
	    .add(this.list.modifier)
	    .add(this.list.surface);
	
	  // this
	  //   .add(this.bracket.modifier)
	  //   .add(this.bracket.surface);
	
	  this
	    .add(this.notes.modifier)
	    .add(this.notes.surface);
	}
	
	function _onEnter() {
	
	  var doStep0 = function() {
	    this.list.surface.open();
	    this.list.surface.forEach(function(s) { s.count(); });
	  };
	
	  var doStep1 = function() {
	    this.list.modifier.setTransform(Transform.translate(-300, 0, 0), { duration : 500, curve: Easing.outBack });
	    this.notes.surface.open();
	  };
	
	  doStep0.call(this);
	  setTimeout(doStep1.bind(this), 2000);
	
	}
	
	function _onLeave() {
	}
	
	/**
	 * Slide Constructor
	 */
	
	function Slide() {
	  View.apply(this, arguments);
	  _createLayout.call(this);
	
	  this._eventInput.on('enter', _onEnter.bind(this));
	  this._eventInput.on('leave', _onLeave.bind(this));
	}
	
	/*!
	 * extend View
	 */
	
	Slide.prototype = Object.create(View.prototype);
	Slide.prototype.constructor = Slide;
	
	/*!
	 * module exports
	 */
	
	module.exports = Slide;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * module deps
	 */
	
	var Surface = __webpack_require__(28),
	    Easing = __webpack_require__(32),
	    ImageSurface = __webpack_require__(29),
	    StateModifier = __webpack_require__(31),
	    Utility = __webpack_require__(21),
	    Transform = __webpack_require__(18),
	    View = __webpack_require__(30),
	    ViewStat = __webpack_require__(34),
	    ViewList = __webpack_require__(33);
	
	/*!
	 * globals
	 */
	
	var toRadian = Math.PI/180;
	
	var list = [
	  { number: 55, label: 'are building a web app' },
	  { number: 26, label: 'have an IOS app' },
	  { number: 13, label: 'an Android app' }
	];
	
	/**
	 * create view layout
	 */
	
	function _createLayout(){
	
	  /*!
	   * parisoma image
	   */
	
	  this.parisomaImg = {};
	  this.parisomaImg.surface = new ImageSurface({
	    content: './assets/images/07-parisoma.png',
	    size: [true, true]
	  });
	
	  this.parisomaImg.modifier = new StateModifier({
	    align: [0.5, 0.5],
	    origin: [0.5, 0.5],
	    transform: Transform.translate(0, -100, 0)
	  });
	
	  /*!
	   * shelf
	   */
	
	  this.shelfImg = {};
	  this.shelfImg.surface = new ImageSurface({
	    content: './assets/images/06-shelf.png',
	    size: [true, true]
	  });
	
	  this.shelfImg.modifier = new StateModifier({
	    align: [0.5, 0.5],
	    origin: [0.5, 0.5],
	    transform: Transform.translate(-200, -440, 0)
	  });
	
	  /*!
	   * keyboard
	   */
	
	  this.keyboardImg = {};
	  this.keyboardImg.surface = new ImageSurface({
	    content: './assets/images/08-keyboard.png',
	    size: [true, true]
	  });
	
	  /*!
	   * donut
	   */
	
	  this.donutImg = {};
	  this.donutImg.surface = new ImageSurface({
	    content: './assets/images/10-donut.png',
	    size: [true, true]
	  });
	
	  this.donutImg.modifier = new StateModifier({
	    align: [0.5, 0.5],
	    origin: [0.5, 0.5],
	    transform: Transform.translate(-140, 580, 0)
	  });
	
	  this.keyboardImg.modifier = new StateModifier({
	    align: [0.5, 0.5],
	    origin: [0.5, 0.5],
	    transform: Transform.translate(380, 30, 0)
	  });
	
	  /*!
	   * pink ticker
	   */
	
	  this.pinkTicker = {};
	  this.pinkTicker.surface = new Surface({
	    size: [70, 180],
	    classes: ['ticker', 'ticker--pink']
	  });
	
	  this.pinkTicker.tickerModifier = new StateModifier({
	    transform: Transform.skew(0, -39 * toRadian, 0)
	  });
	
	  this.pinkTicker.modifier = new StateModifier({
	    align: [0.5, 0.5],
	    origin: [0.5, 0.5],
	    transform: Transform.translate(-345, -320, 0)
	  });
	
	  /*!
	   * tagline
	   */
	
	  this.taglineImg = {};
	  this.taglineImg.surface = new ImageSurface({
	    content: './assets/images/09-tagline.png',
	    size: [true, true]
	  });
	
	  this.taglineImg.modifier = new StateModifier({
	    align: [0.5, 0.5],
	    origin: [0.5, 0.5],
	    transform: Transform.translate(-200, 320, 0)
	  });
	
	  /*!
	   * title
	   */
	
	  this.title = {};
	  this.title.surface = new Surface({
	    size: [400, true],
	    content: ("<h1 class='title title--section title--white'>they have an app for that</h1>")
	  });
	
	  this.title.modifier = new StateModifier({
	    align: [0.5, 0.5],
	    origin: [0.5, 0.5],
	    transform: Transform.translate(0, -90, 0)
	  });
	
	  /*!
	   * list
	   */
	
	  this.list = {};
	  this.list.surface = new ViewList({
	    itemSpacing: 20,
	    direction: Utility.Direction.X
	  });
	
	  this.list.surface.sequenceFrom(list.map(function(item) {
	    return new ViewStat({
	      container: {
	        size: [110, 100],
	        classes: ['text--white'],
	        properties: {
	          // background: 'green'
	        }
	      },
	      number: {
	        content: item.number,
	        transform: Transform.translate(0, 0, 0)
	      },
	      sign: {
	        content: '%',
	        transform: Transform.translate(70, 0, 0)
	      },
	      label: {
	        content: item.label,
	        size: [110, true],
	        transform: Transform.translate(0, 80, 0)
	      }
	    });
	  }));
	
	  this.list.modifier = new StateModifier({
	    origin: [0.5, 0.5],
	    align: [0.5, 0.5],
	    transform: Transform.translate(0, 30, 0)
	  });
	
	
	  this
	    .add(this.parisomaImg.modifier)
	    .add(this.parisomaImg.surface);
	
	  this
	    .add(this.shelfImg.modifier)
	    .add(this.shelfImg.surface);
	
	  this
	    .add(this.pinkTicker.modifier)
	    .add(this.pinkTicker.tickerModifier)
	    .add(this.pinkTicker.surface);
	
	  this
	    .add(this.keyboardImg.modifier)
	    .add(this.keyboardImg.surface);
	
	  this
	    .add(this.taglineImg.modifier)
	    .add(this.taglineImg.surface);
	
	  this
	    .add(this.donutImg.modifier)
	    .add(this.donutImg.surface);
	
	  this
	    .add(this.title.modifier)
	    .add(this.title.surface);
	
	  this
	    .add(this.list.modifier)
	    .add(this.list.surface);
	}
	
	function _onEnter() {
	  this.list.surface.open();
	  this.donutImg.modifier
	    .setTransform(Transform.translate(-140, 580, 0));
	
	}
	
	function _onLeave() {
	  this.donutImg.modifier
	    .setTransform(Transform.translate(-140, 580, 0), { duration : 500 })
	    .setTransform(Transform.translate(-140, 0, 0), { duration : 500, curve: Easing.outBack });
	}
	
	/**
	 * Slide Constructor
	 */
	
	function Slide() {
	  View.apply(this, arguments);
	  _createLayout.call(this);
	  this._eventInput.on('enter', _onEnter.bind(this));
	  this._eventInput.on('leave', _onLeave.bind(this));
	}
	
	/*!
	 * extend View
	 */
	
	Slide.prototype = Object.create(View.prototype);
	Slide.prototype.constructor = Slide;
	
	/*!
	 * module exports
	 */
	
	module.exports = Slide;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * module deps
	 */
	
	var Surface = __webpack_require__(28),
	    Easing = __webpack_require__(32),
	    StateModifier = __webpack_require__(31),
	    Transform = __webpack_require__(18),
	    Utility = __webpack_require__(21),
	    View = __webpack_require__(30),
	    ViewStat = __webpack_require__(34),
	    ViewList = __webpack_require__(33);
	
	/*!
	 * templates
	 */
	
	var list = [
	  { number: 55, label: 'Javascript' },
	  { number: 41, label: 'HTML5' },
	  { number: 34, label: 'PHP' },
	  { number: 26, label: 'Node.js' },
	  { number: 26, label: 'Python.js' },
	  { number: 17, label: 'Ruby' },
	  { number: 14, label: 'Java' }
	];
	
	/**
	 * create view layout
	 */
	
	function _createLayout(){
	
	  /*!
	   * title
	   */
	
	  this.title = {};
	  this.title.surface = new Surface({
	    size: [400, true],
	    content: ("<h1 class='title title--section title--pink'>they code across the board</h1>")
	  });
	
	  this.title.modifier = new StateModifier({
	    origin: [0.5, 0.5],
	    align: [0.5, 0.5],
	    transform: Transform.translate(0, -100, 0)
	  });
	
	  /*!
	   * list
	   */
	
	  this.list = {};
	  this.list.surface = new ViewList({
	    itemSpacing: 20,
	    direction: Utility.Direction.X
	  });
	
	  this.list.surface.sequenceFrom(list.map(function(item) {
	    return new ViewStat({
	      container: {
	        size: [110, 100],
	        properties: {
	          // background: 'green'
	        }
	      },
	      number: {
	        content: item.number,
	        transform: Transform.translate(0, 0, 0)
	      },
	      sign: {
	        content: '%',
	        transform: Transform.translate(70, 0, 0)
	      },
	      label: {
	        content: item.label,
	        size: [110, true],
	        transform: Transform.translate(0, 80, 0)
	      }
	    });
	  }));
	
	  this.list.modifier = new StateModifier({
	    origin: [0.5, 0.5],
	    align: [0.5, 0.5],
	    transform: Transform.translate(0, 0, 0)
	  });
	
	  /*!
	   * setup render tree
	   */
	
	  this
	    .add(this.title.modifier)
	    .add(this.title.surface);
	
	  this
	    .add(this.list.modifier)
	    .add(this.list.surface);
	}
	
	function _onEnter() {
	  this.list.surface.open();
	  this.list.surface.forEach(function(stat) {
	    stat.count();
	  });
	
	  // this.title.modifier
	  //   .setTransform(Transform.translate(250, -300, 0), { duration : 500 })
	  //   .setTransform(Transform.translate(0, -250, 0), { duration : 500, curve: Easing.outBack });
	}
	
	function _onLeave() {
	  // this.title.modifier
	  //   .setTransform(Transform.translate(250, -300, 0));
	}
	
	/**
	 * Slide Constructor
	 */
	
	function Slide() {
	  View.apply(this, arguments);
	  _createLayout.call(this);
	
	  this._eventInput.on('enter', _onEnter.bind(this));
	  this._eventInput.on('leave', _onLeave.bind(this));
	}
	/*!
	 * extend View
	 */
	
	Slide.prototype = Object.create(View.prototype);
	Slide.prototype.constructor = Slide;
	
	/*!
	 * module exports
	 */
	
	module.exports = Slide;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * module deps
	 */
	
	var Surface = __webpack_require__(28),
	    KeyCodes = __webpack_require__(20),
	    ImageSurface = __webpack_require__(29),
	    Easing = __webpack_require__(32),
	    StateModifier = __webpack_require__(31),
	    Transform = __webpack_require__(18),
	    View = __webpack_require__(30),
	    ViewList = __webpack_require__(33),
	    ViewStat = __webpack_require__(34);
	
	/*!
	 * globals
	 */
	
	var toRadian = Math.PI/180;
	var list = [
	  'Data Analytics',
	  '3D printing',
	  'E-Payments',
	  'Crypto-currency',
	  'Saas',
	  'Baas',
	  'Geolocation',
	  'Geolocation',
	  'APIs',
	  'Mobile Gaming',
	  'Financial Tech',
	  'E-Publishing',
	  'Internet of Things'
	];
	
	/**
	 * create view layout
	 */
	
	function _createLayout(){
	
	  /*!
	   * title
	   */
	
	  this.title1 = {};
	  this.title1.surface = new Surface({
	    content: ("<h1 class='title title--section title--pink'>they dont discriminate</h1>"),
	    size: [400, true],
	    properties: {
	      zIndex: 1
	    }
	  });
	
	  this.title1.modifier = new StateModifier({
	    origin: [0.5, 0.5],
	    align: [0.5, 0.5],
	    transform: Transform.translate(0, -150, 0)
	  });
	
	  /*!
	   * stats 1
	   */
	
	  this.stat1 = {};
	  this.stat1.surface = new ViewStat({
	    container: {
	      size: [350, 100],
	      properties: {
	        // background: 'green'
	      }
	    },
	    number: {
	      content: 35,
	      transform: Transform.translate(0, 0, 0)
	    },
	    ticker: {
	      size: [100, 90],
	      transform: Transform.translate(-20, 40, 0)
	    },
	    sign: {
	      content: '%',
	      transform: Transform.translate(70, 0, 0)
	    },
	    label: {
	      content: 'describe their company as both B2B & B2C',
	      size: [240, true],
	      transform: Transform.translate(120, 0, 0)
	    }
	  });
	
	  this.stat1.modifier = new StateModifier({
	    origin: [0.5, 0.5],
	    align: [0.5, 0.5],
	    transform: Transform.translate(20, 0, 0)
	  });
	
	  /*!
	   * second part
	   */
	
	  /*!
	   * title 2
	   */
	
	  this.title2 = {};
	  this.title2.surface = new Surface({
	    content: ("<h1 class='title title--section title--pink'>and neither do we</h1>"),
	    size: [300, true]
	  });
	
	  this.title2.modifier = new StateModifier({
	    origin: [0.5, 0.5],
	    align: [0.5, 0.5],
	    transform: Transform.translate(-200, -300, 0)
	  });
	
	  /*!
	   * 3d printing
	   */
	
	  this.printingImg = {};
	  this.printingImg.surface = new ImageSurface({
	    content: './assets/images/11-3Dprinting.png',
	    size: [true, true],
	    properties: {
	      zIndex: 1
	    }
	  });
	
	  this.printingImg.modifier = new StateModifier({
	    origin: [0, 0],
	    align: [0.5, 0],
	    transform: Transform.translate(100, 350, 0)
	  });
	
	   /*!
	    * pink tickers
	    */
	
	  this.pinkTicker1 = {};
	  this.pinkTicker1.surface = new Surface({
	    size: [55, 45],
	    classes: ['ticker', 'ticker--pink'],
	    properties: {
	      zIndex: 1
	    }
	  });
	
	  this.pinkTicker1.tickerModifier = new StateModifier({
	    transform: Transform.skew(0, -39 * toRadian, 0)
	  });
	
	  this.pinkTicker1.modifier = new StateModifier({
	    origin: [0, 0],
	    align: [0.5, 0],
	    transform: Transform.translate(0, 450, 0)
	  });
	
	  this.pinkTicker2 = {};
	  this.pinkTicker2.surface = new Surface({
	    size: [55, 45],
	    classes: ['ticker', 'ticker--pink'],
	    properties: {
	      zIndex: 1
	    }
	  });
	
	  this.pinkTicker2.tickerModifier = new StateModifier({
	    transform: Transform.skew(0, -39 * toRadian, 0)
	  });
	
	  this.pinkTicker2.modifier = new StateModifier({
	    origin: [0, 0],
	    align: [0.5, 0],
	    transform: Transform.translate(0, 530, 0)
	  });
	
	  /*!
	   * label
	   */
	
	  this.label2 = {};
	  this.label2.surface = new Surface({
	    content: 'We welcome startups from all over the hype curve. Here are just a few.',
	    size: [350, true],
	  });
	
	  this.label2.modifier = new StateModifier({
	    origin: [1, 0.5],
	    align: [0.5, 0.5],
	    transform: Transform.translate(0, -220, 0)
	  });
	
	  /*!
	   * list
	   */
	
	  this.list = {};
	  this.list.surface = new ViewList({
	    itemSpacing: 0
	  });
	
	  this.list.surface.sequenceFrom(list.map(function(text) {
	    return new Surface({
	      size: [true, true],
	      content: text
	    });
	  }));
	
	  this.list.modifier = new StateModifier({
	    origin: [1, 0.5],
	    align: [0.5, 0.5],
	    transform: Transform.translate(-100, 50, 0)
	  });
	
	  /*!
	   * steps
	   */
	
	  this.step1 = new StateModifier({
	  });
	  this.step2 = new StateModifier({
	    opacity: 0
	  });
	
	  /*!
	   * node tree
	   */
	
	  var step1 = this.add(this.step1);
	  var step2 = this.add(this.step2);
	
	  step1
	    .add(this.title1.modifier)
	    .add(this.title1.surface);
	
	  step1
	    .add(this.stat1.modifier)
	    .add(this.stat1.surface);
	
	  step2
	    .add(this.printingImg.modifier)
	    .add(this.printingImg.surface);
	
	  step2
	    .add(this.pinkTicker1.modifier)
	    .add(this.pinkTicker1.tickerModifier)
	    .add(this.pinkTicker1.surface);
	
	  step2
	    .add(this.pinkTicker2.modifier)
	    .add(this.pinkTicker2.tickerModifier)
	    .add(this.pinkTicker2.surface);
	
	  step2
	    .add(this.title2.modifier)
	    .add(this.title2.surface);
	
	  step2
	    .add(this.label2.modifier)
	    .add(this.label2.surface);
	
	  step2
	    .add(this.list.modifier)
	    .add(this.list.surface);
	
	}
	
	function _onEnter() {
	  var step = function(e) {
	    e.preventDefault();
	
	    this.stat1.surface.bump();
	    this._eventInput.removeListener('keydown', step);
	
	    if (e.which === KeyCodes.DOWN_ARROW) {
	      this.step1.setTransform(Transform.translate(250, -200, 0), { duration : 1000, curve: Easing.outBack });
	
	      this.list.surface.open();
	      this.step2
	        .setTransform(Transform.translate(0, 900, 0))
	        .setOpacity(1, { duration : 1000, curve: Easing.outBack })
	        .setTransform(Transform.translate(0, 0, 0), { duration : 1000, curve: Easing.outBack });
	    }
	
	  }.bind(this);
	
	  this._eventInput.on('keydown', step);
	}
	
	function _onLeave() {
	
	}
	
	/**
	 * Slide Constructor
	 */
	
	function Slide() {
	  View.apply(this, arguments);
	  _createLayout.call(this);
	  this._eventInput.on('enter', _onEnter.bind(this));
	  this._eventInput.on('leave', _onLeave.bind(this));
	}
	
	/*!
	 * extend View
	 */
	
	Slide.prototype = Object.create(View.prototype);
	Slide.prototype.constructor = Slide;
	
	/*!
	 * module exports
	 */
	
	module.exports = Slide;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * module deps
	 */
	
	var Surface = __webpack_require__(28),
	    ImageSurface = __webpack_require__(29),
	    StateModifier = __webpack_require__(31),
	    Transform = __webpack_require__(18),
	    Utility = __webpack_require__(21),
	    View = __webpack_require__(30),
	    ViewStat = __webpack_require__(34),
	    ViewList = __webpack_require__(33);
	
	/*!
	 * templates
	  */
	
	var list = [
	  {number: 58, label: 'are bootstraping their business'},
	  {number: 32, label: 'have not launched their product'},
	  {number: 38, label: 'are still in beta'}
	];
	
	/**
	 * create view layout
	 */
	
	function _createLayout(){
	
	  /*!
	   * group image
	   */
	
	  this.groupImg = {};
	  this.groupImg.surface = new ImageSurface({
	    content: './assets/images/12-group.png',
	    size: [true, true]
	  });
	
	  this.groupImg.modifier = new StateModifier({
	    origin: [0.5, 0.5],
	    align: [0.5, 0.5],
	    transform: Transform.translate(200, -100, 0)
	  });
	
	  /*!
	   * title 1
	   */
	
	  this.title = {};
	  this.title.surface = new Surface({
	    content: ("<h1 class='title title--section title--yellow'>They are bootstraping it</h1>"),
	    size: [300, true]
	  });
	
	  this.title.modifier = new StateModifier({
	    origin: [0.5, 0.5],
	    align: [0.5, 0.5],
	    transform: Transform.translate(200, 0, 0)
	  });
	
	  /*!
	   * label
	   */
	
	  this.label = {};
	  this.label.surface = new Surface({
	    content: 'Most of our new members come with only a laptop and an idea',
	    size: [450, true]
	  });
	
	  this.label.modifier = new StateModifier({
	    origin: [1, 0.5],
	    align: [0.5, 0.5],
	    transform: Transform.translate(-70, 0, 0)
	  });
	
	  /*!
	   * list
	   */
	
	  this.list = {};
	  this.list.surface = new ViewList({
	    direction: Utility.Direction.X,
	    itemSpacing: 10
	  });
	
	  this.list.surface.sequenceFrom(list.map(function(item) {
	    return new ViewStat({
	      container: {
	        size: [160, 100],
	        properties: {
	          // background: 'green'
	        }
	      },
	      number: {
	        content: item.number,
	        transform: Transform.translate(0, 0, 0)
	      },
	      sign: {
	        content: '%',
	        transform: Transform.translate(70, 0, 0)
	      },
	      label: {
	        content: item.label,
	        size: [160, true],
	        transform: Transform.translate(0, 80, 0)
	      }
	    });
	  }));
	
	    this.list.modifier = new StateModifier({
	      origin: [1, 0.5],
	      align: [0.5, 0.5],
	      transform: Transform.translate(0, 100, 0)
	    });
	
	  /*!
	   * render tree
	   */
	
	  this
	    .add(this.groupImg.modifier)
	    .add(this.groupImg.surface);
	
	  this
	    .add(this.title.modifier)
	    .add(this.title.surface);
	
	  this
	    .add(this.label.modifier)
	    .add(this.label.surface);
	
	  this
	    .add(this.list.modifier)
	    .add(this.list.surface);
	}
	
	function _onEnter() {
	  this.list.surface.open();
	}
	
	function _onLeave() {
	
	}
	
	/**
	 * Slide Constructor
	 */
	
	function Slide() {
	  View.apply(this, arguments);
	  _createLayout.call(this);
	  this._eventInput.on('enter', _onEnter.bind(this));
	  this._eventInput.on('leave', _onLeave.bind(this));
	}
	
	/*!
	 * extend View
	 */
	
	Slide.prototype = Object.create(View.prototype);
	Slide.prototype.constructor = Slide;
	
	/*!
	 * module exports
	 */
	
	module.exports = Slide;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * module deps
	 */
	
	var Surface = __webpack_require__(28),
	    KeyCodes = __webpack_require__(20),
	    Easing = __webpack_require__(32),
	    ImageSurface = __webpack_require__(29),
	    StateModifier = __webpack_require__(31),
	    Transform = __webpack_require__(18),
	    View = __webpack_require__(30),
	    ViewStat = __webpack_require__(34),
	    ViewList = __webpack_require__(33);
	
	/*!
	 * globals
	 */
	
	var list = [
	  { number: 41, label: 'operate on seed funding' },
	  { number: 41, label: 'are using personal funds' },
	  { number: 13, label: 'rely on funding from <br> family & friends' }
	];
	
	/**
	 * create view layout
	 */
	
	function _createLayout(){
	
	  /*!
	   * part 1
	   */
	
	  /*!
	   * truc
	   */
	
	  this.truckImg = {};
	  this.truckImg.surface = new ImageSurface({
	    content: './assets/images/13-truck.png',
	    size: [true, true]
	  });
	
	  this.truckImg.modifier = new StateModifier({
	    origin: [1, 0.5],
	    align: [0.5, 0.5],
	    transform: Transform.translate(0, 0, 0)
	  });
	
	  /*!
	   * title 1
	   */
	
	  this.title1 = {};
	  this.title1.surface = new Surface({
	    content: ("<h1 class='title title--section title--yellow'>they want your money</h1>"),
	    size: [300, true]
	  });
	
	  this.title1.modifier = new StateModifier({
	    origin: [1, 0.5],
	    align: [0.5, 0.5],
	    transform: Transform.translate(50, -150, 0)
	  });
	
	  /*!
	   * list
	   */
	
	  this.list = {};
	  this.list.surface = new ViewList({
	    itemSpacing: 10
	  });
	
	  this.list.surface.sequenceFrom(list.map(function(item) {
	    return new ViewStat({
	      container: {
	        size: [260, 240],
	        properties: {
	          // background: 'green',
	          zIndex: 2
	        }
	      },
	      number: {
	        content: item.number,
	        transform: Transform.translate(0, 0, 0)
	      },
	      sign: {
	        content: '%',
	        transform: Transform.translate(70, 0, 0)
	      },
	      label: {
	        content: item.label,
	        size: [260, 80],
	        transform: Transform.translate(0, 60, 0)
	      }
	    });
	  }));
	
	  this.list.modifier = new StateModifier({
	    origin: [0, 0.5],
	    align: [0.5, 0.5],
	    transform: Transform.translate(50, 0, 0)
	  });
	
	  /*!
	   * title
	   */
	
	  this.title2 = {};
	  this.title2.surface = new Surface({
	    content: ("<h1 class='title title--section title--pink'>and they are hiring</h1>"),
	    size: [200, true]
	  });
	
	  this.title2.modifier = new StateModifier({
	    origin: [0.5, 0],
	    align: [0.5, 0],
	    transform: Transform.translate(-80, -100, 0)
	  });
	
	  /*!
	   * stat2
	   */
	
	  this.stat2 = {};
	  this.stat2.surface = new ViewStat({
	    container: {
	      size: [260, 100],
	      properties: {
	        // background: 'green'
	      }
	    },
	    number: {
	      content: 47,
	      transform: Transform.translate(0, 0, 0)
	    },
	    sign: {
	      content: '%',
	      transform: Transform.translate(70, 0, 0)
	    },
	    ticker: {
	      size: [120, 90],
	      transform: Transform.translate(-40, 40, 0)
	    },
	    label: {
	      content: 'say that talent acquisition is currently there biggest challenge',
	      size: [260, true],
	      transform: Transform.translate(0, 60, 0)
	    }
	  });
	
	  this.stat2.modifier = new StateModifier({
	    origin: [0, 0],
	    align: [0.5, 0],
	    transform: Transform.translate(20, 50, 0)
	  });
	
	  /*!
	   * steps
	   */
	
	  this.step1 = new StateModifier({
	    origin: [0.5, 0],
	    align: [0.5, 0]
	  });
	  this.step2 = new StateModifier({
	    opacity: 0,
	    origin: [0.5, 0],
	    align: [0.5, 0]
	  });
	
	  /*!
	   * node tree
	   */
	
	  var step1 = this.add(this.step1);
	  var step2 = this.add(this.step2);
	
	  step1
	    .add(this.truckImg.modifier)
	    .add(this.truckImg.surface);
	
	  step1
	    .add(this.title1.modifier)
	    .add(this.title1.surface);
	
	  step1
	    .add(this.list.modifier)
	    .add(this.list.surface);
	
	  step2
	    .add(this.title2.modifier)
	    .add(this.title2.surface);
	
	  step2
	    .add(this.stat2.modifier)
	    .add(this.stat2.surface);
	}
	
	function _onEnter() {
	
	  this.list.surface.open();
	
	  var step = function(e) {
	    e.preventDefault();
	    this._eventInput.removeListener('keydown', step);
	
	    if (e.which === KeyCodes.DOWN_ARROW) {
	      this.step1.setTransform(Transform.translate(-100, -200, 0), { duration : 1000, curve: Easing.outBack });
	
	      this.step2
	        .setTransform(Transform.translate(0, 900, 0))
	        .setOpacity(1, { duration : 1000, curve: Easing.outBack })
	        .setTransform(Transform.translate(-100, 400, 0), { duration : 1000, curve: Easing.outBack });
	    }
	
	  }.bind(this);
	
	  this._eventInput.on('keydown', step);
	}
	
	function _onLeave() {
	}
	
	/**
	 * Slide Constructor
	 */
	
	function Slide() {
	  View.apply(this, arguments);
	  _createLayout.call(this);
	  this._eventInput.on('enter', _onEnter.bind(this));
	  this._eventInput.on('leave', _onLeave.bind(this));
	}
	
	/*!
	 * extend View
	 */
	
	Slide.prototype = Object.create(View.prototype);
	Slide.prototype.constructor = Slide;
	
	/*!
	 * module exports
	 */
	
	module.exports = Slide;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * module deps
	 */
	
	var Surface = __webpack_require__(28),
	    ImageSurface = __webpack_require__(29),
	    Transform = __webpack_require__(18),
	    StateModifier = __webpack_require__(31),
	    View = __webpack_require__(30);
	
	/*!
	 * templates
	 */
	
	var content1 = ("\n<div>\n  <div style='float: left; width: 280px; height: 450px; shape-outside: polygon(0px 0px, 283px -1px, 282px 199px, -4px 424px);'></div>\n  <div>\n    <p class='u-pad-top-20'>These numbers were taken between September 1st and September 15th, 2014 from the 135 members of PARISOMA.</p>\n    <p class='u-pad-top-20'>Over the past 6 years, we’ve been there through it all - through launch parties and pivot strategies, through wireframes and W9’s, from ramen noodles to funding rounds. We’ve seen many failures and a few great successes.</p>\n    <p class='u-pad-top-20'>While members come and go, the core DNA of our community remains the same.</p>\n    <p class='u-pad-top-20'>PARISOMA is a space where ideas meet execution. We foster an experimental environment through coworking, classes, and events.</p>\n  </div>\n</div>"
	
	
	
	
	
	
	
	
	);
	
	/**
	 * create view layout
	 */
	
	function _createLayout(){
	
	  // fawn image
	  this.fawnImg = {};
	  this.fawnImg.surface = new ImageSurface({
	    content: './assets/images/14-fawn.png',
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
	    content: './assets/images/15-open.png',
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
	 * Slide Constructor
	 */
	
	function Slide() {
	  View.apply(this, arguments);
	  _createLayout.call(this);
	}
	
	/*!
	 * extend View
	 */
	
	Slide.prototype = Object.create(View.prototype);
	Slide.prototype.constructor = Slide;
	
	/*!
	 * module exports
	 */
	
	module.exports = Slide;

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * module deps
	 */
	
	var Surface = __webpack_require__(28),
	    ContainerSurface = __webpack_require__(22),
	    StateModifier = __webpack_require__(31),
	    Transform = __webpack_require__(18),
	    Easing = __webpack_require__(32),
	    ImageSurface = __webpack_require__(29),
	    View = __webpack_require__(30);
	
	/*!
	 * module globals
	 */
	
	var convert = Math.PI/180;
	var colors = ['#EA3D96', '#982068', '#EA3D96', '#982068'];
	// var colors = ['red', 'blue', 'violet', 'green'];
	
	var rotates = [
	  [0, 0, 39],
	  [0, 0, 39],
	  [0, 0, -39],
	  [0, 0, -39]
	];
	
	var skews = [
	  [0, 0, 39],
	  [0, 0, 39],
	  [0, 0, -39],
	  [0, 0, -39]
	];
	
	var translates = [
	  [-70, 114, 0],
	  [70, 0, 0],
	  [-70, -114, 0],
	  [70,  114, 0]
	];
	
	/**
	 * create view layout
	 */
	
	function _createLayout(){
	  var side;
	
	  this.modifier = new StateModifier({
	    size: [800, 800],
	    origin: [0.5, 0.5],
	    align: [0.5, 0.5]
	  });
	
	  this.logo = { sides: [] };
	  this.logo.modifier = new StateModifier({
	    transform: Transform.translate(0, 0, 0),
	    size: [284, 456],
	    origin: [0.5, 0.5],
	    align: [0.5, 0.5]
	  });
	
	  var node = this.add(this.modifier);
	  var logoNode = node.add(this.logo.modifier);
	
	  for (var i = 0; i < 4; i++) {
	    side = {};
	    side.surface = new Surface({
	      // content: String(i),
	      size: [180, 88],
	      properties: {
	        // fontSize: 30,
	        // textAlign: 'center',
	        // lineHeight: '100px',
	        backgroundColor: colors[i],
	        zIndex: 3
	      }
	    });
	
	    side.translate = new StateModifier({
	      align: [0.5, 0.5],
	      origin: [0.5, 0.5]
	    });
	
	    side.rotate = new StateModifier();
	
	    logoNode
	      .add(side.translate)
	      .add(side.rotate)
	      .add(side.surface);
	
	    this.logo.sides.push(side);
	  }
	
	  this.brand = {};
	  this.brand.surface = new ImageSurface({
	    content: './assets/brand.svg',
	    properties: {
	      zIndex: 3
	    }
	  });
	
	  this.brand.modifier = new StateModifier({
	    size: [true, 40],
	    align: [0.5, 0.5],
	    origin: [0.5, 0.5],
	    opacity: 0
	  });
	
	  node
	    .add(this.brand.modifier)
	    .add(this.brand.surface);
	}
	
	
	/**
	 * Logo Constructor
	 */
	
	function Logo() {
	  View.apply(this, arguments);
	  _createLayout.call(this);
	}
	
	/*!
	 * extend View
	 */
	
	Logo.prototype = Object.create(View.prototype);
	Logo.prototype.constructor = Logo;
	
	/**
	 * animate Logo
	 */
	
	Logo.prototype.animate = function() {
	  var side, curve = { duration : 1000, curve: Easing.outBack };
	
	  for (var i = 0; i < 4; i++) {
	    side = this.logo.sides[i];
	
	    side.translate.setTransform(
	      Transform.translate(translates[i][0], translates[i][1], translates[i][2]),
	      curve
	    );
	
	    side.rotate.setTransform(Transform.multiply(
	      Transform.rotate(rotates[i][0] * convert, rotates[i][1] * convert, rotates[i][2] * convert),
	      Transform.skew(skews[i][0] * convert, skews[i][1] * convert, skews[i][2] * convert)
	    ), curve);
	  }
	
	  this.logo.modifier
	    .setTransform(this.logo.modifier.getTransform(), { duration : 2000 })
	    .setTransform(Transform.multiply(
	      Transform.translate(300, 300, 0),
	      Transform.scale(0.2)
	    ), { duration : 500, curve: Easing.outBack }
	    );
	
	  this.brand.modifier
	    .setTransform(Transform.translate(340, 316, 0));
	
	  this.brand.modifier
	    .setOpacity(0, { duration : 1000 })
	    .setOpacity(1, { duration : 500, curve: 'linear' });
	
	};
	
	
	/*!
	 * module exports
	 */
	
	module.exports = Logo;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(13);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(14)(content);
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/Users/pg/Jogabo/parisoma/node_modules/css-loader/index.js!/Users/pg/Jogabo/parisoma/webpack/rework-loader.js!/Users/pg/Jogabo/parisoma/lib/app/index.css", function() {
			var newContent = require("!!/Users/pg/Jogabo/parisoma/node_modules/css-loader/index.js!/Users/pg/Jogabo/parisoma/webpack/rework-loader.js!/Users/pg/Jogabo/parisoma/lib/app/index.css");
			if(typeof newContent === 'string') newContent = [module.id, newContent, ''];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(35)();
	exports.push([module.id, "/*! normalize.css v3.0.2 | MIT License | git.io/normalize */\n\n/**\n * 1. Set default font family to sans-serif.\n * 2. Prevent iOS text size adjust after orientation change, without disabling\n *    user zoom.\n */\n\nhtml {\n  font-family: sans-serif;\n  /* 1 */\n  -ms-text-size-adjust: 100%;\n  /* 2 */\n  -webkit-text-size-adjust: 100%;\n  /* 2 */\n}\n\n/**\n * Remove default margin.\n */\n\nbody {\n  margin: 0;\n}\n\n/* HTML5 display definitions\n   ========================================================================== */\n\n/**\n * Correct `block` display not defined for any HTML5 element in IE 8/9.\n * Correct `block` display not defined for `details` or `summary` in IE 10/11\n * and Firefox.\n * Correct `block` display not defined for `main` in IE 11.\n */\n\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmain,\nmenu,\nnav,\nsection,\nsummary {\n  display: block;\n}\n\n/**\n * 1. Correct `inline-block` display not defined in IE 8/9.\n * 2. Normalize vertical alignment of `progress` in Chrome, Firefox, and Opera.\n */\n\naudio,\ncanvas,\nprogress,\nvideo {\n  display: inline-block;\n  /* 1 */\n  vertical-align: baseline;\n  /* 2 */\n}\n\n/**\n * Prevent modern browsers from displaying `audio` without controls.\n * Remove excess height in iOS 5 devices.\n */\n\naudio:not([controls]) {\n  display: none;\n  height: 0;\n}\n\n/**\n * Address `[hidden]` styling not present in IE 8/9/10.\n * Hide the `template` element in IE 8/9/11, Safari, and Firefox < 22.\n */\n\n[hidden],\ntemplate {\n  display: none;\n}\n\n/* Links\n   ========================================================================== */\n\n/**\n * Remove the gray background color from active links in IE 10.\n */\n\na {\n  background-color: transparent;\n}\n\n/**\n * Improve readability when focused and also mouse hovered in all browsers.\n */\n\na:active,\na:hover {\n  outline: 0;\n}\n\n/* Text-level semantics\n   ========================================================================== */\n\n/**\n * Address styling not present in IE 8/9/10/11, Safari, and Chrome.\n */\n\nabbr[title] {\n  border-bottom: 1px dotted;\n}\n\n/**\n * Address style set to `bolder` in Firefox 4+, Safari, and Chrome.\n */\n\nb,\nstrong {\n  font-weight: bold;\n}\n\n/**\n * Address styling not present in Safari and Chrome.\n */\n\ndfn {\n  font-style: italic;\n}\n\n/**\n * Address variable `h1` font-size and margin within `section` and `article`\n * contexts in Firefox 4+, Safari, and Chrome.\n */\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0;\n}\n\n/**\n * Address styling not present in IE 8/9.\n */\n\nmark {\n  background: #ff0;\n  color: #000;\n}\n\n/**\n * Address inconsistent and variable font size in all browsers.\n */\n\nsmall {\n  font-size: 80%;\n}\n\n/**\n * Prevent `sub` and `sup` affecting `line-height` in all browsers.\n */\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline;\n}\n\nsup {\n  top: -0.5em;\n}\n\nsub {\n  bottom: -0.25em;\n}\n\n/* Embedded content\n   ========================================================================== */\n\n/**\n * Remove border when inside `a` element in IE 8/9/10.\n */\n\nimg {\n  border: 0;\n}\n\n/**\n * Correct overflow not hidden in IE 9/10/11.\n */\n\nsvg:not(:root) {\n  overflow: hidden;\n}\n\n/* Grouping content\n   ========================================================================== */\n\n/**\n * Address margin not present in IE 8/9 and Safari.\n */\n\nfigure {\n  margin: 1em 40px;\n}\n\n/**\n * Address differences between Firefox and other browsers.\n */\n\nhr {\n  -moz-box-sizing: content-box;\n  box-sizing: content-box;\n  height: 0;\n}\n\n/**\n * Contain overflow in all browsers.\n */\n\npre {\n  overflow: auto;\n}\n\n/**\n * Address odd `em`-unit font size rendering in all browsers.\n */\n\ncode,\nkbd,\npre,\nsamp {\n  font-family: monospace, monospace;\n  font-size: 1em;\n}\n\n/* Forms\n   ========================================================================== */\n\n/**\n * Known limitation: by default, Chrome and Safari on OS X allow very limited\n * styling of `select`, unless a `border` property is set.\n */\n\n/**\n * 1. Correct color not being inherited.\n *    Known issue: affects color of disabled elements.\n * 2. Correct font properties not being inherited.\n * 3. Address margins set differently in Firefox 4+, Safari, and Chrome.\n */\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  color: inherit;\n  /* 1 */\n  font: inherit;\n  /* 2 */\n  margin: 0;\n  /* 3 */\n}\n\n/**\n * Address `overflow` set to `hidden` in IE 8/9/10/11.\n */\n\nbutton {\n  overflow: visible;\n}\n\n/**\n * Address inconsistent `text-transform` inheritance for `button` and `select`.\n * All other form control elements do not inherit `text-transform` values.\n * Correct `button` style inheritance in Firefox, IE 8/9/10/11, and Opera.\n * Correct `select` style inheritance in Firefox.\n */\n\nbutton,\nselect {\n  text-transform: none;\n}\n\n/**\n * 1. Avoid the WebKit bug in Android 4.0.* where (2) destroys native `audio`\n *    and `video` controls.\n * 2. Correct inability to style clickable `input` types in iOS.\n * 3. Improve usability and consistency of cursor style between image-type\n *    `input` and others.\n */\n\nbutton,\nhtml input[type=\"button\"],\ninput[type=\"reset\"],\ninput[type=\"submit\"] {\n  -webkit-appearance: button;\n  /* 2 */\n  cursor: pointer;\n  /* 3 */\n}\n\n/**\n * Re-set default cursor for disabled elements.\n */\n\nbutton[disabled],\nhtml input[disabled] {\n  cursor: default;\n}\n\n/**\n * Remove inner padding and border in Firefox 4+.\n */\n\nbutton::-moz-focus-inner,\ninput::-moz-focus-inner {\n  border: 0;\n  padding: 0;\n}\n\n/**\n * Address Firefox 4+ setting `line-height` on `input` using `!important` in\n * the UA stylesheet.\n */\n\ninput {\n  line-height: normal;\n}\n\n/**\n * It's recommended that you don't attempt to style these elements.\n * Firefox's implementation doesn't respect box-sizing, padding, or width.\n *\n * 1. Address box sizing set to `content-box` in IE 8/9/10.\n * 2. Remove excess padding in IE 8/9/10.\n */\n\ninput[type=\"checkbox\"],\ninput[type=\"radio\"] {\n  box-sizing: border-box;\n  /* 1 */\n  padding: 0;\n  /* 2 */\n}\n\n/**\n * Fix the cursor style for Chrome's increment/decrement buttons. For certain\n * `font-size` values of the `input`, it causes the cursor style of the\n * decrement button to change from `default` to `text`.\n */\n\ninput[type=\"number\"]::-webkit-inner-spin-button,\ninput[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto;\n}\n\n/**\n * 1. Address `appearance` set to `searchfield` in Safari and Chrome.\n * 2. Address `box-sizing` set to `border-box` in Safari and Chrome\n *    (include `-moz` to future-proof).\n */\n\ninput[type=\"search\"] {\n  -webkit-appearance: textfield;\n  /* 1 */\n  -moz-box-sizing: content-box;\n  -webkit-box-sizing: content-box;\n  /* 2 */\n  box-sizing: content-box;\n}\n\n/**\n * Remove inner padding and search cancel button in Safari and Chrome on OS X.\n * Safari (but not Chrome) clips the cancel button when the search input has\n * padding (and `textfield` appearance).\n */\n\ninput[type=\"search\"]::-webkit-search-cancel-button,\ninput[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none;\n}\n\n/**\n * Define consistent border, margin, and padding.\n */\n\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em;\n}\n\n/**\n * 1. Correct `color` not being inherited in IE 8/9/10/11.\n * 2. Remove padding so people aren't caught out if they zero out fieldsets.\n */\n\nlegend {\n  border: 0;\n  /* 1 */\n  padding: 0;\n  /* 2 */\n}\n\n/**\n * Remove default vertical scrollbar in IE 8/9/10/11.\n */\n\ntextarea {\n  overflow: auto;\n}\n\n/**\n * Don't inherit the `font-weight` (applied by a rule above).\n * NOTE: the default cannot safely be changed in Chrome and Safari on OS X.\n */\n\noptgroup {\n  font-weight: bold;\n}\n\n/* Tables\n   ========================================================================== */\n\n/**\n * Remove most spacing between table cells.\n */\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\n\ntd,\nth {\n  padding: 0;\n}\n\n/**\n * A thin layer on top of normalize.css that provides a starting point more\n * suitable for web applications. Removes the default spacing and border for\n * appropriate elements.\n */\n\nblockquote,\ndl,\ndd,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\nfigure,\np,\npre {\n  margin: 0;\n}\n\nbutton {\n  background: transparent;\n  border: 0;\n  padding: 0;\n}\n\n/**\n * Work around a Firefox/IE bug where the transparent `button` background\n * results in a loss of the default `button` focus styles.\n */\n\nbutton:focus {\n  outline: 1px dotted;\n  outline: 5px auto -webkit-focus-ring-color;\n}\n\nfieldset {\n  border: 0;\n  margin: 0;\n  padding: 0;\n}\n\niframe {\n  border: 0;\n}\n\nol,\nul {\n  list-style: none;\n  margin: 0;\n  padding: 0;\n}\n\n/**\n * Suppress the focus outline on links that cannot be accessed via keyboard.\n * This prevents an unwanted focus outline from appearing around elements that\n * might still respond to pointer events.\n */\n\n[tabindex=\"-1\"]:focus {\n  outline: none !important;\n}\n\n/**\n * Word breaking\n *\n * Break strings when their length exceeds the width of their container.\n */\n\n.u-textBreak {\n  word-wrap: break-word !important;\n}\n\n/**\n * Horizontal text alignment\n */\n\n.u-textCenter {\n  text-align: center !important;\n}\n\n.u-textLeft {\n  text-align: left !important;\n}\n\n.u-textRight {\n  text-align: right !important;\n}\n\n/**\n * Inherit the ancestor's text color.\n */\n\n.u-textInheritColor {\n  color: inherit !important;\n}\n\n/**\n * Enables font kerning in all browsers.\n * http://blog.typekit.com/2014/02/05/kerning-on-the-web/\n *\n * 1. Chrome (not Windows), Firefox, Safari 6+, iOS, Android\n * 2. Chrome (not Windows), Firefox, IE 10+\n * 3. Safari 7 and future browsers\n */\n\n.u-textKern {\n  text-rendering: optimizeLegibility;\n  /* 1 */\n  font-feature-settings: \"kern\" 1;\n  /* 2 */\n  font-kerning: normal;\n  /* 3 */\n}\n\n/**\n * Prevent whitespace wrapping\n */\n\n.u-textNoWrap {\n  white-space: nowrap !important;\n}\n\n/**\n * Text truncation\n *\n * Prevent text from wrapping onto multiple lines, and truncate with an\n * ellipsis.\n *\n * 1. Ensure that the node has a maximum width after which truncation can\n *    occur.\n * 2. Fix for IE 8/9 if `word-wrap: break-word` is in effect on ancestor\n *    nodes.\n */\n\n.u-textTruncate {\n  max-width: 100%;\n  /* 1 */\n  overflow: hidden !important;\n  text-overflow: ellipsis !important;\n  white-space: nowrap !important;\n  word-wrap: normal !important;\n  /* 2 */\n}\n\n/** @define Grid; use strict */\n\n\n\n/**\n * Core grid component\n *\n * DO NOT apply dimension or offset utilities to the `Grid` element. All cell\n * widths and offsets should be applied to child grid cells.\n */\n\n/* Grid container\n   ========================================================================== */\n\n/**\n * All content must be contained within child `Grid-cell` elements.\n *\n * 1. Account for browser defaults of elements that might be the root node of\n *    the component.\n * 2. Remove inter-cell whitespace that appears between `inline-block` child\n *    elements.\n * 3. Ensure consistent default alignment.\n */\n\n.Grid {\n  display: block;\n  /* 1 */\n  font-size: 0;\n  /* 2 */\n  margin: 0;\n  /* 1 */\n  padding: 0;\n  /* 1 */\n  text-align: left;\n  /* 3 */\n}\n\n/**\n * Modifier: center align all grid cells\n */\n\n.Grid--alignCenter {\n  text-align: center;\n}\n\n/**\n * Modifier: right align all grid cells\n */\n\n.Grid--alignRight {\n  text-align: right;\n}\n\n/**\n * Modifier: middle-align grid cells\n */\n\n.Grid--alignMiddle > .Grid-cell {\n  vertical-align: middle;\n}\n\n/**\n * Modifier: bottom-align grid cells\n */\n\n.Grid--alignBottom > .Grid-cell {\n  vertical-align: bottom;\n}\n\n/**\n * Modifier: gutters\n *\n * NOTE: this can trigger a horizontal scrollbar if the component is as wide as\n * the viewport. Use padding on a container, or `overflow-x:hidden` to protect\n * against it.\n */\n\n.Grid--withGutter {\n  margin: 0 -20px;\n}\n\n.Grid--withGutter > .Grid-cell {\n  padding: 0 20px;\n}\n\n/* Grid cell\n   ========================================================================== */\n\n/**\n * No explicit width by default. Rely on combining `Grid-cell` with a dimension\n * utility or a component class that extends 'grid'.\n *\n * 1. Fundamentals of the non-float grid layout.\n * 2. Reset font size change made in `Grid`.\n * 3. Keeps content correctly aligned with the grid direction.\n * 4. Controls vertical positioning of units.\n * 5. Make cells full-width by default.\n */\n\n.Grid-cell {\n  box-sizing: border-box;\n  display: inline-block;\n  /* 1 */\n  font-size: 1rem;\n  /* 2 */\n  margin: 0;\n  padding: 0;\n  text-align: left;\n  /* 3 */\n  vertical-align: top;\n  /* 4 */\n  width: 100%;\n  /* 5 */\n}\n\n/**\n * Modifier: horizontally center one unit\n * Set a specific unit to be horizontally centered. Doesn't affect\n * any other units. Can still contain a child `Grid` object.\n */\n\n.Grid-cell--center {\n  display: block;\n  margin: 0 auto;\n}\n\n/**\n * Sizing utilities\n */\n\n/* Intrinsic widths\n   ========================================================================== */\n\n/**\n * Make an element shrink wrap its content.\n */\n\n.u-sizeFit,\n.u-sizeFitAlt {\n  display: block !important;\n  float: left !important;\n  width: auto !important;\n}\n\n.u-sizeFitAlt {\n  float: right !important;\n}\n\n/**\n * Make an element fill the remaining space.\n * N.B. This will hide overflow.\n */\n\n.u-sizeFill {\n  display: block !important;\n  overflow: hidden !important;\n  width: auto !important;\n}\n\n/**\n * An alternative method to make an element fill the remaining space.\n * N.B. Do not use if child elements might be wider than the remaining space.\n * In Chrome, Safari, and Firefox it results in undesired layout.\n */\n\n.u-sizeFillAlt {\n  display: table-cell !important;\n  max-width: 100% !important;\n  width: 10000px !important;\n}\n\n/**\n * Make an element the width of its parent.\n */\n\n.u-sizeFull {\n  box-sizing: border-box !important;\n  display: block !important;\n  width: 100% !important;\n}\n\n/* Proportional widths\n   ========================================================================== */\n\n/**\n * Specify the proportional width of an object.\n * Intentional redundancy build into each set of unit classes.\n * Supports: 2, 3, 4, 5, 6, 8, 10, 12 part\n */\n\n.u-size1of12 {\n  width: 8.333333333333332% !important;\n}\n\n.u-size1of10 {\n  width: 10% !important;\n}\n\n.u-size1of8 {\n  width: 12.5% !important;\n}\n\n.u-size1of6,\n.u-size2of12 {\n  width: 16.666666666666664% !important;\n}\n\n.u-size1of5,\n.u-size2of10 {\n  width: 20% !important;\n}\n\n.u-size1of4,\n.u-size2of8,\n.u-size3of12 {\n  width: 25% !important;\n}\n\n.u-size3of10 {\n  width: 30% !important;\n}\n\n.u-size1of3,\n.u-size2of6,\n.u-size4of12 {\n  width: 33.33333333333333% !important;\n}\n\n.u-size3of8 {\n  width: 37.5% !important;\n}\n\n.u-size2of5,\n.u-size4of10 {\n  width: 40% !important;\n}\n\n.u-size5of12 {\n  width: 41.66666666666667% !important;\n}\n\n.u-size1of2,\n.u-size2of4,\n.u-size3of6,\n.u-size4of8,\n.u-size5of10,\n.u-size6of12 {\n  width: 50% !important;\n}\n\n.u-size7of12 {\n  width: 58.333333333333336% !important;\n}\n\n.u-size3of5,\n.u-size6of10 {\n  width: 60% !important;\n}\n\n.u-size5of8 {\n  width: 62.5% !important;\n}\n\n.u-size2of3,\n.u-size4of6,\n.u-size8of12 {\n  width: 66.66666666666666% !important;\n}\n\n.u-size7of10 {\n  width: 70% !important;\n}\n\n.u-size3of4,\n.u-size6of8,\n.u-size9of12 {\n  width: 75% !important;\n}\n\n.u-size4of5,\n.u-size8of10 {\n  width: 80% !important;\n}\n\n.u-size5of6,\n.u-size10of12 {\n  width: 83.33333333333334% !important;\n}\n\n.u-size7of8 {\n  width: 87.5% !important;\n}\n\n.u-size9of10 {\n  width: 90% !important;\n}\n\n.u-size11of12 {\n  width: 91.66666666666666% !important;\n}\n\n/**\n * Size: breakpoint 1 (small)\n */\n\n/**\n * Size: breakpoint 2 (medium)\n */\n\n/**\n * Size: breakpoint 3 (large)\n */\n\n/**\n * Specify the proportional offset after an element.\n * Intentional redundancy build into each set of unit classes.\n * Supports: 2, 4, 5, 6, 8, 10, 12 section\n */\n\n.u-after1of12 {\n  margin-right: 8.333333333333332% !important;\n}\n\n.u-after1of10 {\n  margin-right: 10% !important;\n}\n\n.u-after1of8 {\n  margin-right: 12.5% !important;\n}\n\n.u-after1of6,\n.u-after2of12 {\n  margin-right: 16.666666666666664% !important;\n}\n\n.u-after1of5,\n.u-after2of10 {\n  margin-right: 20% !important;\n}\n\n.u-after1of4,\n.u-after2of8,\n.u-after3of12 {\n  margin-right: 25% !important;\n}\n\n.u-after3of10 {\n  margin-right: 30% !important;\n}\n\n.u-after1of3,\n.u-after2of6,\n.u-after4of12 {\n  margin-right: 33.33333333333333% !important;\n}\n\n.u-after3of8 {\n  margin-right: 37.5% !important;\n}\n\n.u-after2of5,\n.u-after4of10 {\n  margin-right: 40% !important;\n}\n\n.u-after5of12 {\n  margin-right: 41.66666666666667% !important;\n}\n\n.u-after1of2,\n.u-after2of4,\n.u-after3of6,\n.u-after4of8,\n.u-after5of10,\n.u-after6of12 {\n  margin-right: 50% !important;\n}\n\n.u-after7of12 {\n  margin-right: 58.333333333333336% !important;\n}\n\n.u-after3of5,\n.u-after6of10 {\n  margin-right: 60% !important;\n}\n\n.u-after5of8 {\n  margin-right: 62.5% !important;\n}\n\n.u-after2of3,\n.u-after4of6,\n.u-after8of12 {\n  margin-right: 66.66666666666666% !important;\n}\n\n.u-after7of10 {\n  margin-right: 70% !important;\n}\n\n.u-after3of4,\n.u-after6of8,\n.u-after9of12 {\n  margin-right: 75% !important;\n}\n\n.u-after4of5,\n.u-after8of10 {\n  margin-right: 80% !important;\n}\n\n.u-after5of6,\n.u-after10of12 {\n  margin-right: 83.33333333333334% !important;\n}\n\n.u-after7of8 {\n  margin-right: 87.5% !important;\n}\n\n.u-after9of10 {\n  margin-right: 90% !important;\n}\n\n.u-after11of12 {\n  margin-right: 91.66666666666666% !important;\n}\n\n/**\n * Offset: breakpoint 1 (small)\n *\n * Specify the proportional offset after an element.\n * Intentional redundancy build into each set of unit classes.\n * Supports: 2, 4, 5, 6, 8, 10, 12 section\n */\n\n/**\n * Offset: breakpoint 2 (medium)\n *\n * Specify the proportional offset after an element.\n * Intentional redundancy build into each set of unit classes.\n * Supports: 2, 4, 5, 6, 8, 10, 12 section\n */\n\n/**\n * Offset: breakpoint 3 (large)\n *\n * Specify the proportional offset after an element.\n * Intentional redundancy build into each set of unit classes.\n * Supports: 2, 4, 5, 6, 8, 10, 12 section\n */\n\n/**\n * Specify the proportional offset before an object.\n * Intentional redundancy build into each set of unit classes.\n * Supports: 2, 3, 4, 5, 6, 8, 10, 12 section\n */\n\n.u-before1of12 {\n  margin-left: 8.333333333333332% !important;\n}\n\n.u-before1of10 {\n  margin-left: 10% !important;\n}\n\n.u-before1of8 {\n  margin-left: 12.5% !important;\n}\n\n.u-before1of6,\n.u-before2of12 {\n  margin-left: 16.666666666666664% !important;\n}\n\n.u-before1of5,\n.u-before2of10 {\n  margin-left: 20% !important;\n}\n\n.u-before1of4,\n.u-before2of8,\n.u-before3of12 {\n  margin-left: 25% !important;\n}\n\n.u-before3of10 {\n  margin-left: 30% !important;\n}\n\n.u-before1of3,\n.u-before2of6,\n.u-before4of12 {\n  margin-left: 33.33333333333333% !important;\n}\n\n.u-before3of8 {\n  margin-left: 37.5% !important;\n}\n\n.u-before2of5,\n.u-before4of10 {\n  margin-left: 40% !important;\n}\n\n.u-before5of12 {\n  margin-left: 41.66666666666667% !important;\n}\n\n.u-before1of2,\n.u-before2of4,\n.u-before3of6,\n.u-before4of8,\n.u-before5of10,\n.u-before6of12 {\n  margin-left: 50% !important;\n}\n\n.u-before7of12 {\n  margin-left: 58.333333333333336% !important;\n}\n\n.u-before3of5,\n.u-before6of10 {\n  margin-left: 60% !important;\n}\n\n.u-before5of8 {\n  margin-left: 62.5% !important;\n}\n\n.u-before2of3,\n.u-before4of6,\n.u-before8of12 {\n  margin-left: 66.66666666666666% !important;\n}\n\n.u-before7of10 {\n  margin-left: 70% !important;\n}\n\n.u-before3of4,\n.u-before6of8,\n.u-before9of12 {\n  margin-left: 75% !important;\n}\n\n.u-before4of5,\n.u-before8of10 {\n  margin-left: 80% !important;\n}\n\n.u-before5of6,\n.u-before10of12 {\n  margin-left: 83.33333333333334% !important;\n}\n\n.u-before7of8 {\n  margin-left: 87.5% !important;\n}\n\n.u-before9of10 {\n  margin-left: 90% !important;\n}\n\n.u-before11of12 {\n  margin-left: 91.66666666666666% !important;\n}\n\n/**\n * Offset: breakpoint 1 (small)\n *\n * Specify the proportional offset before an element.\n * Intentional redundancy build into each set of unit classes.\n * Supports: 2, 3, 4, 5, 6, 8, 10, 12 section\n */\n\n/**\n * Offset: breakpoint 2 (medium)\n *\n * Specify the proportional offset before an element.\n * Intentional redundancy build into each set of unit classes.\n * Supports: 2, 3, 4, 5, 6, 8, 10, 12 section\n */\n\n/**\n * Offset: breakpoint 3 (large)\n *\n * Specify the proportional offset before an element.\n * Intentional redundancy build into each set of unit classes.\n * Supports: 2, 3, 4, 5, 6, 8, 10, 12 section\n */\n\n/* comment\n-------------------------------------------------- */\n\n@font-face {\n  font-family: 'Open Sans';\n  font-style: normal;\n  font-weight: 300;\n  src: url('/assets/fonts/Open_Sans_300.eot?#iefix') format('embedded-opentype'),\n    url('/assets/fonts/Open_Sans_300.woff') format('woff'),\n    url('/assets/fonts/Open_Sans_300.ttf') format('truetype'),\n    url('/assets/fonts/Open_Sans_300.svg#OpenSans') format('svg');\n}\n\n@font-face {\n  font-family: 'Open Sans';\n  font-style: normal;\n  font-weight: 400;\n  src: url('/assets/fonts/Open_Sans_400.eot?#iefix') format('embedded-opentype'),\n    url('/assets/fonts/Open_Sans_400.woff') format('woff'),\n    url('/assets/fonts/Open_Sans_400.ttf') format('truetype'),\n    url('/assets/fonts/Open_Sans_400.svg#OpenSans') format('svg');\n}\n\n@font-face {\n  font-family: 'Open Sans';\n  font-style: normal;\n  font-weight: 600;\n  src: url('/assets/fonts/Open_Sans_600.eot?#iefix') format('embedded-opentype'),\n    url('/assets/fonts/Open_Sans_600.woff') format('woff'),\n    url('/assets/fonts/Open_Sans_600.ttf') format('truetype'),\n    url('/assets/fonts/Open_Sans_600.svg#OpenSans') format('svg');\n}\n\n@font-face {\n  font-family: 'Open Sans';\n  font-style: normal;\n  font-weight: 700;\n  src: url('/assets/fonts/Open_Sans_700.eot?#iefix') format('embedded-opentype'),\n    url('/assets/fonts/Open_Sans_700.woff') format('woff'),\n    url('/assets/fonts/Open_Sans_700.ttf') format('truetype'),\n    url('/assets/fonts/Open_Sans_700.svg#OpenSans') format('svg');\n}\n\n\n\n.u-backface {\n  backface-visibility: visible;\n}\n\n.u-textHuge {\n  font-size: 60px;\n}\n\n.u-textUnderscore:before {\n  content: '_';\n}\n\n.u-textLarge {\n  font-size: 40px;\n}\n\n.u-textBold {\n  font-weight: bold;\n}\n\n.u-pad-top-5 {\n  padding-top: 5px;\n}\n\n.u-pad-top-10 {\n  padding-top: 10px;\n}\n\n.u-pad-top-20 {\n  padding-top: 20px;\n}\n\n.u-pad-left-20 {\n  padding-left: 20px;\n}\n\n.u-pad-bottom-10 {\n  padding-bottom: 10px;\n}\n\n.u-pad-bottom-20 {\n  padding-bottom: 20px;\n}\n\n\n\nhtml,\nbody {\n  font-family: 'Open Sans', sans-serif;\n  font-size: 22px;\n  color: rgb(0, 0, 0);\n  font-weight: 100;\n}\n\n/* title\n-------------------------------------------------- */\n\n.title {\n  font-family: 'Andale Mono';\n  font-weight: 100;\n}\n\n.title:before {\n  content: '_';\n}\n\n.title--intro {\n  font-size: 50px;\n}\n\n.title--section {\n  font-size: 40px;\n}\n\n.title--white {\n  color: rgb(255, 255, 255);\n}\n\n.title--yellow {\n  color: rgb(255, 255, 0);\n}\n\n.title--pink {\n  color: rgb(255, 31, 171);\n}\n\n/* stat\n-------------------------------------------------- */\n\n.stat-number {\n  font-size: 60px;\n  line-height: 60px;\n}\n\n.stat-sign {\n  font-size: 40px;\n  padding-top: 8px;\n}\n\n/* note\n-------------------------------------------------- */\n\n.note {\n  font-size: 18px;\n}\n\n.note--gray {\n  color: rgb(162, 169, 162);\n}\n\n/* ticker\n-------------------------------------------------- */\n\n.ticker--pink {\n  background-color: rgb(255, 31, 171);\n}\n\n.ticker--yellow {\n  background-color: rgb(255, 255, 0);\n}\n\n/* misc\n-------------------------------------------------- */\n\n.text--white {\n  color: rgb(255, 255, 255);\n}\n\n.text--gray {\n  color: rgb(162, 169, 162);\n}\n\n.text--big {\n  font-size: 28px;\n}\n\n.Grid-cell--withBorder {\n  border-left: 1px solid rgba(162, 169, 162, 0.5);\n  border-right: 1px solid rgba(162, 169, 162, 0.5);\n}", ""]);

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {};
	
	module.exports = function(list) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}
		var styles = listToStyles(list);
		addStylesToDom(styles);
		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}
	
	function addStylesToDom(styles) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j]));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j]));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}
	
	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			// var sourceMap = item[3];
			var part = {css: css, media: media/*, sourceMap: sourceMap*/};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}
	
	function addStyle(obj) {
		var styleElement = document.createElement("style");
		var head = document.head || document.getElementsByTagName("head")[0];
		styleElement.type = "text/css";
		head.appendChild(styleElement);
		applyToTag(styleElement, obj);
		return function(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media /*&& newObj.sourceMap === obj.sourceMap*/)
					return;
				applyToTag(styleElement, obj = newObj);
			} else {
				head.removeChild(styleElement);
			}
		};
	};
	
	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;
		// var sourceMap = obj.sourceMap;
	
		// No browser support
		// if(sourceMap && typeof btoa === "function") {
			// try {
				// css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(JSON.stringify(sourceMap)) + " */";
			// } catch(e) {}
		// }
		if(media) {
			styleElement.setAttribute("media", media)
		}
		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	
	}


/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag
	
	// load the styles
	var content = __webpack_require__(16);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(14)(content);
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		module.hot.accept("!!/Users/pg/Jogabo/parisoma/node_modules/css-loader/index.js!/Users/pg/Jogabo/parisoma/webpack/rework-loader.js!/Users/pg/Jogabo/parisoma/node_modules/famous/src/core/famous.css", function() {
			var newContent = require("!!/Users/pg/Jogabo/parisoma/node_modules/css-loader/index.js!/Users/pg/Jogabo/parisoma/webpack/rework-loader.js!/Users/pg/Jogabo/parisoma/node_modules/famous/src/core/famous.css");
			if(typeof newContent === 'string') newContent = [module.id, newContent, ''];
			update(newContent);
		});
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(35)();
	exports.push([module.id, "/* This Source Code Form is subject to the terms of the Mozilla Public\n * License, v. 2.0. If a copy of the MPL was not distributed with this\n * file, You can obtain one at http://mozilla.org/MPL/2.0/.\n *\n * Owner: mark@famo.us\n * @license MPL 2.0\n * @copyright Famous Industries, Inc. 2014\n */\n\n.famous-root {\n  width: 100%;\n  height: 100%;\n  margin: 0px;\n  padding: 0px;\n  overflow: hidden;\n  -webkit-transform-style: preserve-3d;\n  transform-style: preserve-3d;\n}\n\n.famous-container,\n.famous-group {\n  position: absolute;\n  top: 0px;\n  left: 0px;\n  bottom: 0px;\n  right: 0px;\n  overflow: visible;\n  -webkit-transform-style: preserve-3d;\n  transform-style: preserve-3d;\n  -webkit-backface-visibility: visible;\n  backface-visibility: visible;\n  pointer-events: none;\n}\n\n.famous-group {\n  width: 0px;\n  height: 0px;\n  margin: 0px;\n  padding: 0px;\n  -webkit-transform-style: preserve-3d;\n  transform-style: preserve-3d;\n}\n\n.famous-surface {\n  position: absolute;\n  -webkit-transform-origin: center center;\n  transform-origin: center center;\n  -webkit-backface-visibility: hidden;\n  backface-visibility: hidden;\n  -webkit-transform-style: preserve-3d;\n  transform-style: preserve-3d;\n  -webkit-box-sizing: border-box;\n  -moz-box-sizing: border-box;\n  box-sizing: border-box;\n  -webkit-tap-highlight-color: transparent;\n  pointer-events: auto;\n}\n\n.famous-container-group {\n  position: relative;\n  width: 100%;\n  height: 100%;\n}", ""]);

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: mark@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	
	    /**
	     * The singleton object initiated upon process
	     *   startup which manages all active Context instances, runs
	     *   the render dispatch loop, and acts as a listener and dispatcher
	     *   for events.  All methods are therefore static.
	     *
	     *   On static initialization, window.requestAnimationFrame is called with
	     *     the event loop function.
	     *
	     *   Note: Any window in which Engine runs will prevent default
	     *     scrolling behavior on the 'touchmove' event.
	     *
	     * @static
	     * @class Engine
	     */
	    var Context = __webpack_require__(36);
	    var EventHandler = __webpack_require__(37);
	    var OptionsManager = __webpack_require__(38);
	
	    var Engine = {};
	
	    var contexts = [];
	    var nextTickQueue = [];
	    var deferQueue = [];
	
	    var lastTime = Date.now();
	    var frameTime;
	    var frameTimeLimit;
	    var loopEnabled = true;
	    var eventForwarders = {};
	    var eventHandler = new EventHandler();
	
	    var options = {
	        containerType: 'div',
	        containerClass: 'famous-container',
	        fpsCap: undefined,
	        runLoop: true,
	        appMode: true
	    };
	    var optionsManager = new OptionsManager(options);
	
	    /** @const */
	    var MAX_DEFER_FRAME_TIME = 10;
	
	    /**
	     * Inside requestAnimationFrame loop, step() is called, which:
	     *   calculates current FPS (throttling loop if it is over limit set in setFPSCap),
	     *   emits dataless 'prerender' event on start of loop,
	     *   calls in order any one-shot functions registered by nextTick on last loop,
	     *   calls Context.update on all Context objects registered,
	     *   and emits dataless 'postrender' event on end of loop.
	     *
	     * @static
	     * @private
	     * @method step
	     */
	    Engine.step = function step() {
	        var currentTime = Date.now();
	
	        // skip frame if we're over our framerate cap
	        if (frameTimeLimit && currentTime - lastTime < frameTimeLimit) return;
	
	        var i = 0;
	
	        frameTime = currentTime - lastTime;
	        lastTime = currentTime;
	
	        eventHandler.emit('prerender');
	
	        // empty the queue
	        for (i = 0; i < nextTickQueue.length; i++) nextTickQueue[i].call(this);
	        nextTickQueue.splice(0);
	
	        // limit total execution time for deferrable functions
	        while (deferQueue.length && (Date.now() - currentTime) < MAX_DEFER_FRAME_TIME) {
	            deferQueue.shift().call(this);
	        }
	
	        for (i = 0; i < contexts.length; i++) contexts[i].update();
	
	        eventHandler.emit('postrender');
	    };
	
	    // engage requestAnimationFrame
	    function loop() {
	        if (options.runLoop) {
	            Engine.step();
	            window.requestAnimationFrame(loop);
	        }
	        else loopEnabled = false;
	    }
	    window.requestAnimationFrame(loop);
	
	    //
	    // Upon main document window resize (unless on an "input" HTML element):
	    //   scroll to the top left corner of the window,
	    //   and for each managed Context: emit the 'resize' event and update its size.
	    // @param {Object=} event document event
	    //
	    function handleResize(event) {
	        for (var i = 0; i < contexts.length; i++) {
	            contexts[i].emit('resize');
	        }
	        eventHandler.emit('resize');
	    }
	    window.addEventListener('resize', handleResize, false);
	    handleResize();
	
	    /**
	     * Initialize famous for app mode
	     *
	     * @static
	     * @private
	     * @method initialize
	     */
	    function initialize() {
	        // prevent scrolling via browser
	        window.addEventListener('touchmove', function(event) {
	            event.preventDefault();
	        }, true);
	        document.body.classList.add('famous-root');
	        document.documentElement.classList.add('famous-root');
	    }
	    var initialized = false;
	
	    /**
	     * Add event handler object to set of downstream handlers.
	     *
	     * @method pipe
	     *
	     * @param {EventHandler} target event handler target object
	     * @return {EventHandler} passed event handler
	     */
	    Engine.pipe = function pipe(target) {
	        if (target.subscribe instanceof Function) return target.subscribe(Engine);
	        else return eventHandler.pipe(target);
	    };
	
	    /**
	     * Remove handler object from set of downstream handlers.
	     *   Undoes work of "pipe".
	     *
	     * @method unpipe
	     *
	     * @param {EventHandler} target target handler object
	     * @return {EventHandler} provided target
	     */
	    Engine.unpipe = function unpipe(target) {
	        if (target.unsubscribe instanceof Function) return target.unsubscribe(Engine);
	        else return eventHandler.unpipe(target);
	    };
	
	    /**
	     * Bind a callback function to an event type handled by this object.
	     *
	     * @static
	     * @method "on"
	     *
	     * @param {string} type event type key (for example, 'click')
	     * @param {function(string, Object)} handler callback
	     * @return {EventHandler} this
	     */
	    Engine.on = function on(type, handler) {
	        if (!(type in eventForwarders)) {
	            eventForwarders[type] = eventHandler.emit.bind(eventHandler, type);
	            if (document.body) {
	                document.body.addEventListener(type, eventForwarders[type]);
	            }
	            else {
	                Engine.nextTick(function(type, forwarder) {
	                    document.body.addEventListener(type, forwarder);
	                }.bind(this, type, eventForwarders[type]));
	            }
	        }
	        return eventHandler.on(type, handler);
	    };
	
	    /**
	     * Trigger an event, sending to all downstream handlers
	     *   listening for provided 'type' key.
	     *
	     * @method emit
	     *
	     * @param {string} type event type key (for example, 'click')
	     * @param {Object} event event data
	     * @return {EventHandler} this
	     */
	    Engine.emit = function emit(type, event) {
	        return eventHandler.emit(type, event);
	    };
	
	    /**
	     * Unbind an event by type and handler.
	     *   This undoes the work of "on".
	     *
	     * @static
	     * @method removeListener
	     *
	     * @param {string} type event type key (for example, 'click')
	     * @param {function} handler function object to remove
	     * @return {EventHandler} internal event handler object (for chaining)
	     */
	    Engine.removeListener = function removeListener(type, handler) {
	        return eventHandler.removeListener(type, handler);
	    };
	
	    /**
	     * Return the current calculated frames per second of the Engine.
	     *
	     * @static
	     * @method getFPS
	     *
	     * @return {Number} calculated fps
	     */
	    Engine.getFPS = function getFPS() {
	        return 1000 / frameTime;
	    };
	
	    /**
	     * Set the maximum fps at which the system should run. If internal render
	     *    loop is called at a greater frequency than this FPSCap, Engine will
	     *    throttle render and update until this rate is achieved.
	     *
	     * @static
	     * @method setFPSCap
	     *
	     * @param {Number} fps maximum frames per second
	     */
	    Engine.setFPSCap = function setFPSCap(fps) {
	        frameTimeLimit = Math.floor(1000 / fps);
	    };
	
	    /**
	     * Return engine options.
	     *
	     * @static
	     * @method getOptions
	     * @param {string} key
	     * @return {Object} engine options
	     */
	    Engine.getOptions = function getOptions(key) {
	        return optionsManager.getOptions(key);
	    };
	
	    /**
	     * Set engine options
	     *
	     * @static
	     * @method setOptions
	     *
	     * @param {Object} [options] overrides of default options
	     * @param {Number} [options.fpsCap]  maximum fps at which the system should run
	     * @param {boolean} [options.runLoop=true] whether the run loop should continue
	     * @param {string} [options.containerType="div"] type of container element.  Defaults to 'div'.
	     * @param {string} [options.containerClass="famous-container"] type of container element.  Defaults to 'famous-container'.
	     */
	    Engine.setOptions = function setOptions(options) {
	        return optionsManager.setOptions.apply(optionsManager, arguments);
	    };
	
	    /**
	     * Creates a new Context for rendering and event handling with
	     *    provided document element as top of each tree. This will be tracked by the
	     *    process-wide Engine.
	     *
	     * @static
	     * @method createContext
	     *
	     * @param {Node} el will be top of Famo.us document element tree
	     * @return {Context} new Context within el
	     */
	    Engine.createContext = function createContext(el) {
	        if (!initialized && options.appMode) Engine.nextTick(initialize);
	
	        var needMountContainer = false;
	        if (!el) {
	            el = document.createElement(options.containerType);
	            el.classList.add(options.containerClass);
	            needMountContainer = true;
	        }
	        var context = new Context(el);
	        Engine.registerContext(context);
	        if (needMountContainer) {
	            Engine.nextTick(function(context, el) {
	                document.body.appendChild(el);
	                context.emit('resize');
	            }.bind(this, context, el));
	        }
	        return context;
	    };
	
	    /**
	     * Registers an existing context to be updated within the run loop.
	     *
	     * @static
	     * @method registerContext
	     *
	     * @param {Context} context Context to register
	     * @return {FamousContext} provided context
	     */
	    Engine.registerContext = function registerContext(context) {
	        contexts.push(context);
	        return context;
	    };
	
	    /**
	     * Returns a list of all contexts.
	     *
	     * @static
	     * @method getContexts
	     * @return {Array} contexts that are updated on each tick
	     */
	    Engine.getContexts = function getContexts() {
	        return contexts;
	    };
	
	    /**
	     * Removes a context from the run loop. Note: this does not do any
	     *     cleanup.
	     *
	     * @static
	     * @method deregisterContext
	     *
	     * @param {Context} context Context to deregister
	     */
	    Engine.deregisterContext = function deregisterContext(context) {
	        var i = contexts.indexOf(context);
	        if (i >= 0) contexts.splice(i, 1);
	    };
	
	    /**
	     * Queue a function to be executed on the next tick of the
	     *    Engine.
	     *
	     * @static
	     * @method nextTick
	     *
	     * @param {function(Object)} fn function accepting window object
	     */
	    Engine.nextTick = function nextTick(fn) {
	        nextTickQueue.push(fn);
	    };
	
	    /**
	     * Queue a function to be executed sometime soon, at a time that is
	     *    unlikely to affect frame rate.
	     *
	     * @static
	     * @method defer
	     *
	     * @param {Function} fn
	     */
	    Engine.defer = function defer(fn) {
	        deferQueue.push(fn);
	    };
	
	    optionsManager.on('change', function(data) {
	        if (data.id === 'fpsCap') Engine.setFPSCap(data.value);
	        else if (data.id === 'runLoop') {
	            // kick off the loop only if it was stopped
	            if (!loopEnabled && data.value) {
	                loopEnabled = true;
	                window.requestAnimationFrame(loop);
	            }
	        }
	    });
	
	    module.exports = Engine;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: mark@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	
	    /**
	     *  A high-performance static matrix math library used to calculate
	     *    affine transforms on surfaces and other renderables.
	     *    Famo.us uses 4x4 matrices corresponding directly to
	     *    WebKit matrices (column-major order).
	     *
	     *    The internal "type" of a Matrix is a 16-long float array in
	     *    row-major order, with:
	     *    elements [0],[1],[2],[4],[5],[6],[8],[9],[10] forming the 3x3
	     *          transformation matrix;
	     *    elements [12], [13], [14] corresponding to the t_x, t_y, t_z
	     *           translation;
	     *    elements [3], [7], [11] set to 0;
	     *    element [15] set to 1.
	     *    All methods are static.
	     *
	     * @static
	     *
	     * @class Transform
	     */
	    var Transform = {};
	
	    // WARNING: these matrices correspond to WebKit matrices, which are
	    //    transposed from their math counterparts
	    Transform.precision = 1e-6;
	    Transform.identity = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
	
	    /**
	     * Multiply two or more Transform matrix types to return a Transform matrix.
	     *
	     * @method multiply4x4
	     * @static
	     * @param {Transform} a left Transform
	     * @param {Transform} b right Transform
	     * @return {Transform}
	     */
	    Transform.multiply4x4 = function multiply4x4(a, b) {
	        return [
	            a[0] * b[0] + a[4] * b[1] + a[8] * b[2] + a[12] * b[3],
	            a[1] * b[0] + a[5] * b[1] + a[9] * b[2] + a[13] * b[3],
	            a[2] * b[0] + a[6] * b[1] + a[10] * b[2] + a[14] * b[3],
	            a[3] * b[0] + a[7] * b[1] + a[11] * b[2] + a[15] * b[3],
	            a[0] * b[4] + a[4] * b[5] + a[8] * b[6] + a[12] * b[7],
	            a[1] * b[4] + a[5] * b[5] + a[9] * b[6] + a[13] * b[7],
	            a[2] * b[4] + a[6] * b[5] + a[10] * b[6] + a[14] * b[7],
	            a[3] * b[4] + a[7] * b[5] + a[11] * b[6] + a[15] * b[7],
	            a[0] * b[8] + a[4] * b[9] + a[8] * b[10] + a[12] * b[11],
	            a[1] * b[8] + a[5] * b[9] + a[9] * b[10] + a[13] * b[11],
	            a[2] * b[8] + a[6] * b[9] + a[10] * b[10] + a[14] * b[11],
	            a[3] * b[8] + a[7] * b[9] + a[11] * b[10] + a[15] * b[11],
	            a[0] * b[12] + a[4] * b[13] + a[8] * b[14] + a[12] * b[15],
	            a[1] * b[12] + a[5] * b[13] + a[9] * b[14] + a[13] * b[15],
	            a[2] * b[12] + a[6] * b[13] + a[10] * b[14] + a[14] * b[15],
	            a[3] * b[12] + a[7] * b[13] + a[11] * b[14] + a[15] * b[15]
	        ];
	    };
	
	    /**
	     * Fast-multiply two or more Transform matrix types to return a
	     *    Matrix, assuming bottom row on each is [0 0 0 1].
	     *
	     * @method multiply
	     * @static
	     * @param {Transform} a left Transform
	     * @param {Transform} b right Transform
	     * @return {Transform}
	     */
	    Transform.multiply = function multiply(a, b) {
	        return [
	            a[0] * b[0] + a[4] * b[1] + a[8] * b[2],
	            a[1] * b[0] + a[5] * b[1] + a[9] * b[2],
	            a[2] * b[0] + a[6] * b[1] + a[10] * b[2],
	            0,
	            a[0] * b[4] + a[4] * b[5] + a[8] * b[6],
	            a[1] * b[4] + a[5] * b[5] + a[9] * b[6],
	            a[2] * b[4] + a[6] * b[5] + a[10] * b[6],
	            0,
	            a[0] * b[8] + a[4] * b[9] + a[8] * b[10],
	            a[1] * b[8] + a[5] * b[9] + a[9] * b[10],
	            a[2] * b[8] + a[6] * b[9] + a[10] * b[10],
	            0,
	            a[0] * b[12] + a[4] * b[13] + a[8] * b[14] + a[12],
	            a[1] * b[12] + a[5] * b[13] + a[9] * b[14] + a[13],
	            a[2] * b[12] + a[6] * b[13] + a[10] * b[14] + a[14],
	            1
	        ];
	    };
	
	    /**
	     * Return a Transform translated by additional amounts in each
	     *    dimension. This is equivalent to the result of
	     *
	     *    Transform.multiply(Matrix.translate(t[0], t[1], t[2]), m).
	     *
	     * @method thenMove
	     * @static
	     * @param {Transform} m a Transform
	     * @param {Array.Number} t floats delta vector of length 2 or 3
	     * @return {Transform}
	     */
	    Transform.thenMove = function thenMove(m, t) {
	        if (!t[2]) t[2] = 0;
	        return [m[0], m[1], m[2], 0, m[4], m[5], m[6], 0, m[8], m[9], m[10], 0, m[12] + t[0], m[13] + t[1], m[14] + t[2], 1];
	    };
	
	    /**
	     * Return a Transform atrix which represents the result of a transform matrix
	     *    applied after a move. This is faster than the equivalent multiply.
	     *    This is equivalent to the result of:
	     *
	     *    Transform.multiply(m, Transform.translate(t[0], t[1], t[2])).
	     *
	     * @method moveThen
	     * @static
	     * @param {Array.Number} v vector representing initial movement
	     * @param {Transform} m matrix to apply afterwards
	     * @return {Transform} the resulting matrix
	     */
	    Transform.moveThen = function moveThen(v, m) {
	        if (!v[2]) v[2] = 0;
	        var t0 = v[0] * m[0] + v[1] * m[4] + v[2] * m[8];
	        var t1 = v[0] * m[1] + v[1] * m[5] + v[2] * m[9];
	        var t2 = v[0] * m[2] + v[1] * m[6] + v[2] * m[10];
	        return Transform.thenMove(m, [t0, t1, t2]);
	    };
	
	    /**
	     * Return a Transform which represents a translation by specified
	     *    amounts in each dimension.
	     *
	     * @method translate
	     * @static
	     * @param {Number} x x translation
	     * @param {Number} y y translation
	     * @param {Number} z z translation
	     * @return {Transform}
	     */
	    Transform.translate = function translate(x, y, z) {
	        if (z === undefined) z = 0;
	        return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1];
	    };
	
	    /**
	     * Return a Transform scaled by a vector in each
	     *    dimension. This is a more performant equivalent to the result of
	     *
	     *    Transform.multiply(Transform.scale(s[0], s[1], s[2]), m).
	     *
	     * @method thenScale
	     * @static
	     * @param {Transform} m a matrix
	     * @param {Array.Number} s delta vector (array of floats &&
	     *    array.length == 3)
	     * @return {Transform}
	     */
	    Transform.thenScale = function thenScale(m, s) {
	        return [
	            s[0] * m[0], s[1] * m[1], s[2] * m[2], 0,
	            s[0] * m[4], s[1] * m[5], s[2] * m[6], 0,
	            s[0] * m[8], s[1] * m[9], s[2] * m[10], 0,
	            s[0] * m[12], s[1] * m[13], s[2] * m[14], 1
	        ];
	    };
	
	    /**
	     * Return a Transform which represents a scale by specified amounts
	     *    in each dimension.
	     *
	     * @method scale
	     * @static
	     * @param {Number} x x scale factor
	     * @param {Number} y y scale factor
	     * @param {Number} z z scale factor
	     * @return {Transform}
	     */
	    Transform.scale = function scale(x, y, z) {
	        if (z === undefined) z = 1;
	        if (y === undefined) y = x;
	        return [x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1];
	    };
	
	    /**
	     * Return a Transform which represents a clockwise
	     *    rotation around the x axis.
	     *
	     * @method rotateX
	     * @static
	     * @param {Number} theta radians
	     * @return {Transform}
	     */
	    Transform.rotateX = function rotateX(theta) {
	        var cosTheta = Math.cos(theta);
	        var sinTheta = Math.sin(theta);
	        return [1, 0, 0, 0, 0, cosTheta, sinTheta, 0, 0, -sinTheta, cosTheta, 0, 0, 0, 0, 1];
	    };
	
	    /**
	     * Return a Transform which represents a clockwise
	     *    rotation around the y axis.
	     *
	     * @method rotateY
	     * @static
	     * @param {Number} theta radians
	     * @return {Transform}
	     */
	    Transform.rotateY = function rotateY(theta) {
	        var cosTheta = Math.cos(theta);
	        var sinTheta = Math.sin(theta);
	        return [cosTheta, 0, -sinTheta, 0, 0, 1, 0, 0, sinTheta, 0, cosTheta, 0, 0, 0, 0, 1];
	    };
	
	    /**
	     * Return a Transform which represents a clockwise
	     *    rotation around the z axis.
	     *
	     * @method rotateZ
	     * @static
	     * @param {Number} theta radians
	     * @return {Transform}
	     */
	    Transform.rotateZ = function rotateZ(theta) {
	        var cosTheta = Math.cos(theta);
	        var sinTheta = Math.sin(theta);
	        return [cosTheta, sinTheta, 0, 0, -sinTheta, cosTheta, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
	    };
	
	    /**
	     * Return a Transform which represents composed clockwise
	     *    rotations along each of the axes. Equivalent to the result of
	     *    Matrix.multiply(rotateX(phi), rotateY(theta), rotateZ(psi)).
	     *
	     * @method rotate
	     * @static
	     * @param {Number} phi radians to rotate about the positive x axis
	     * @param {Number} theta radians to rotate about the positive y axis
	     * @param {Number} psi radians to rotate about the positive z axis
	     * @return {Transform}
	     */
	    Transform.rotate = function rotate(phi, theta, psi) {
	        var cosPhi = Math.cos(phi);
	        var sinPhi = Math.sin(phi);
	        var cosTheta = Math.cos(theta);
	        var sinTheta = Math.sin(theta);
	        var cosPsi = Math.cos(psi);
	        var sinPsi = Math.sin(psi);
	        var result = [
	            cosTheta * cosPsi,
	            cosPhi * sinPsi + sinPhi * sinTheta * cosPsi,
	            sinPhi * sinPsi - cosPhi * sinTheta * cosPsi,
	            0,
	            -cosTheta * sinPsi,
	            cosPhi * cosPsi - sinPhi * sinTheta * sinPsi,
	            sinPhi * cosPsi + cosPhi * sinTheta * sinPsi,
	            0,
	            sinTheta,
	            -sinPhi * cosTheta,
	            cosPhi * cosTheta,
	            0,
	            0, 0, 0, 1
	        ];
	        return result;
	    };
	
	    /**
	     * Return a Transform which represents an axis-angle rotation
	     *
	     * @method rotateAxis
	     * @static
	     * @param {Array.Number} v unit vector representing the axis to rotate about
	     * @param {Number} theta radians to rotate clockwise about the axis
	     * @return {Transform}
	     */
	    Transform.rotateAxis = function rotateAxis(v, theta) {
	        var sinTheta = Math.sin(theta);
	        var cosTheta = Math.cos(theta);
	        var verTheta = 1 - cosTheta; // versine of theta
	
	        var xxV = v[0] * v[0] * verTheta;
	        var xyV = v[0] * v[1] * verTheta;
	        var xzV = v[0] * v[2] * verTheta;
	        var yyV = v[1] * v[1] * verTheta;
	        var yzV = v[1] * v[2] * verTheta;
	        var zzV = v[2] * v[2] * verTheta;
	        var xs = v[0] * sinTheta;
	        var ys = v[1] * sinTheta;
	        var zs = v[2] * sinTheta;
	
	        var result = [
	            xxV + cosTheta, xyV + zs, xzV - ys, 0,
	            xyV - zs, yyV + cosTheta, yzV + xs, 0,
	            xzV + ys, yzV - xs, zzV + cosTheta, 0,
	            0, 0, 0, 1
	        ];
	        return result;
	    };
	
	    /**
	     * Return a Transform which represents a transform matrix applied about
	     * a separate origin point.
	     *
	     * @method aboutOrigin
	     * @static
	     * @param {Array.Number} v origin point to apply matrix
	     * @param {Transform} m matrix to apply
	     * @return {Transform}
	     */
	    Transform.aboutOrigin = function aboutOrigin(v, m) {
	        var t0 = v[0] - (v[0] * m[0] + v[1] * m[4] + v[2] * m[8]);
	        var t1 = v[1] - (v[0] * m[1] + v[1] * m[5] + v[2] * m[9]);
	        var t2 = v[2] - (v[0] * m[2] + v[1] * m[6] + v[2] * m[10]);
	        return Transform.thenMove(m, [t0, t1, t2]);
	    };
	
	    /**
	     * Return a Transform representation of a skew transformation
	     *
	     * @method skew
	     * @static
	     * @param {Number} phi scale factor skew in the x axis
	     * @param {Number} theta scale factor skew in the y axis
	     * @param {Number} psi scale factor skew in the z axis
	     * @return {Transform}
	     */
	    Transform.skew = function skew(phi, theta, psi) {
	        return [1, Math.tan(theta), 0, 0, Math.tan(psi), 1, 0, 0, 0, Math.tan(phi), 1, 0, 0, 0, 0, 1];
	    };
	
	    /**
	     * Return a Transform representation of a skew in the x-direction
	     *
	     * @method skewX
	     * @static
	     * @param {Number} angle the angle between the top and left sides
	     * @return {Transform}
	     */
	    Transform.skewX = function skewX(angle) {
	        return [1, 0, 0, 0, Math.tan(angle), 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
	    };
	
	    /**
	     * Return a Transform representation of a skew in the y-direction
	     *
	     * @method skewY
	     * @static
	     * @param {Number} angle the angle between the top and right sides
	     * @return {Transform}
	     */
	    Transform.skewY = function skewY(angle) {
	        return [1, Math.tan(angle), 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
	    };
	
	    /**
	     * Returns a perspective Transform matrix
	     *
	     * @method perspective
	     * @static
	     * @param {Number} focusZ z position of focal point
	     * @return {Transform}
	     */
	    Transform.perspective = function perspective(focusZ) {
	        return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, -1 / focusZ, 0, 0, 0, 1];
	    };
	
	    /**
	     * Return translation vector component of given Transform
	     *
	     * @method getTranslate
	     * @static
	     * @param {Transform} m Transform
	     * @return {Array.Number} the translation vector [t_x, t_y, t_z]
	     */
	    Transform.getTranslate = function getTranslate(m) {
	        return [m[12], m[13], m[14]];
	    };
	
	    /**
	     * Return inverse affine transform for given Transform.
	     *   Note: This assumes m[3] = m[7] = m[11] = 0, and m[15] = 1.
	     *   Will provide incorrect results if not invertible or preconditions not met.
	     *
	     * @method inverse
	     * @static
	     * @param {Transform} m Transform
	     * @return {Transform}
	     */
	    Transform.inverse = function inverse(m) {
	        // only need to consider 3x3 section for affine
	        var c0 = m[5] * m[10] - m[6] * m[9];
	        var c1 = m[4] * m[10] - m[6] * m[8];
	        var c2 = m[4] * m[9] - m[5] * m[8];
	        var c4 = m[1] * m[10] - m[2] * m[9];
	        var c5 = m[0] * m[10] - m[2] * m[8];
	        var c6 = m[0] * m[9] - m[1] * m[8];
	        var c8 = m[1] * m[6] - m[2] * m[5];
	        var c9 = m[0] * m[6] - m[2] * m[4];
	        var c10 = m[0] * m[5] - m[1] * m[4];
	        var detM = m[0] * c0 - m[1] * c1 + m[2] * c2;
	        var invD = 1 / detM;
	        var result = [
	            invD * c0, -invD * c4, invD * c8, 0,
	            -invD * c1, invD * c5, -invD * c9, 0,
	            invD * c2, -invD * c6, invD * c10, 0,
	            0, 0, 0, 1
	        ];
	        result[12] = -m[12] * result[0] - m[13] * result[4] - m[14] * result[8];
	        result[13] = -m[12] * result[1] - m[13] * result[5] - m[14] * result[9];
	        result[14] = -m[12] * result[2] - m[13] * result[6] - m[14] * result[10];
	        return result;
	    };
	
	    /**
	     * Returns the transpose of a 4x4 matrix
	     *
	     * @method transpose
	     * @static
	     * @param {Transform} m matrix
	     * @return {Transform} the resulting transposed matrix
	     */
	    Transform.transpose = function transpose(m) {
	        return [m[0], m[4], m[8], m[12], m[1], m[5], m[9], m[13], m[2], m[6], m[10], m[14], m[3], m[7], m[11], m[15]];
	    };
	
	    function _normSquared(v) {
	        return (v.length === 2) ? v[0] * v[0] + v[1] * v[1] : v[0] * v[0] + v[1] * v[1] + v[2] * v[2];
	    }
	    function _norm(v) {
	        return Math.sqrt(_normSquared(v));
	    }
	    function _sign(n) {
	        return (n < 0) ? -1 : 1;
	    }
	
	    /**
	     * Decompose Transform into separate .translate, .rotate, .scale,
	     *    and .skew components.
	     *
	     * @method interpret
	     * @static
	     * @param {Transform} M transform matrix
	     * @return {Object} matrix spec object with component matrices .translate,
	     *    .rotate, .scale, .skew
	     */
	    Transform.interpret = function interpret(M) {
	
	        // QR decomposition via Householder reflections
	        //FIRST ITERATION
	
	        //default Q1 to the identity matrix;
	        var x = [M[0], M[1], M[2]];                // first column vector
	        var sgn = _sign(x[0]);                     // sign of first component of x (for stability)
	        var xNorm = _norm(x);                      // norm of first column vector
	        var v = [x[0] + sgn * xNorm, x[1], x[2]];  // v = x + sign(x[0])|x|e1
	        var mult = 2 / _normSquared(v);            // mult = 2/v'v
	
	        //bail out if our Matrix is singular
	        if (mult >= Infinity) {
	            return {translate: Transform.getTranslate(M), rotate: [0, 0, 0], scale: [0, 0, 0], skew: [0, 0, 0]};
	        }
	
	        //evaluate Q1 = I - 2vv'/v'v
	        var Q1 = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];
	
	        //diagonals
	        Q1[0]  = 1 - mult * v[0] * v[0];    // 0,0 entry
	        Q1[5]  = 1 - mult * v[1] * v[1];    // 1,1 entry
	        Q1[10] = 1 - mult * v[2] * v[2];    // 2,2 entry
	
	        //upper diagonal
	        Q1[1] = -mult * v[0] * v[1];        // 0,1 entry
	        Q1[2] = -mult * v[0] * v[2];        // 0,2 entry
	        Q1[6] = -mult * v[1] * v[2];        // 1,2 entry
	
	        //lower diagonal
	        Q1[4] = Q1[1];                      // 1,0 entry
	        Q1[8] = Q1[2];                      // 2,0 entry
	        Q1[9] = Q1[6];                      // 2,1 entry
	
	        //reduce first column of M
	        var MQ1 = Transform.multiply(Q1, M);
	
	        //SECOND ITERATION on (1,1) minor
	        var x2 = [MQ1[5], MQ1[6]];
	        var sgn2 = _sign(x2[0]);                    // sign of first component of x (for stability)
	        var x2Norm = _norm(x2);                     // norm of first column vector
	        var v2 = [x2[0] + sgn2 * x2Norm, x2[1]];    // v = x + sign(x[0])|x|e1
	        var mult2 = 2 / _normSquared(v2);           // mult = 2/v'v
	
	        //evaluate Q2 = I - 2vv'/v'v
	        var Q2 = [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1];
	
	        //diagonal
	        Q2[5]  = 1 - mult2 * v2[0] * v2[0]; // 1,1 entry
	        Q2[10] = 1 - mult2 * v2[1] * v2[1]; // 2,2 entry
	
	        //off diagonals
	        Q2[6] = -mult2 * v2[0] * v2[1];     // 2,1 entry
	        Q2[9] = Q2[6];                      // 1,2 entry
	
	        //calc QR decomposition. Q = Q1*Q2, R = Q'*M
	        var Q = Transform.multiply(Q2, Q1);      //note: really Q transpose
	        var R = Transform.multiply(Q, M);
	
	        //remove negative scaling
	        var remover = Transform.scale(R[0] < 0 ? -1 : 1, R[5] < 0 ? -1 : 1, R[10] < 0 ? -1 : 1);
	        R = Transform.multiply(R, remover);
	        Q = Transform.multiply(remover, Q);
	
	        //decompose into rotate/scale/skew matrices
	        var result = {};
	        result.translate = Transform.getTranslate(M);
	        result.rotate = [Math.atan2(-Q[6], Q[10]), Math.asin(Q[2]), Math.atan2(-Q[1], Q[0])];
	        if (!result.rotate[0]) {
	            result.rotate[0] = 0;
	            result.rotate[2] = Math.atan2(Q[4], Q[5]);
	        }
	        result.scale = [R[0], R[5], R[10]];
	        result.skew = [Math.atan2(R[9], result.scale[2]), Math.atan2(R[8], result.scale[2]), Math.atan2(R[4], result.scale[0])];
	
	        //double rotation workaround
	        if (Math.abs(result.rotate[0]) + Math.abs(result.rotate[2]) > 1.5 * Math.PI) {
	            result.rotate[1] = Math.PI - result.rotate[1];
	            if (result.rotate[1] > Math.PI) result.rotate[1] -= 2 * Math.PI;
	            if (result.rotate[1] < -Math.PI) result.rotate[1] += 2 * Math.PI;
	            if (result.rotate[0] < 0) result.rotate[0] += Math.PI;
	            else result.rotate[0] -= Math.PI;
	            if (result.rotate[2] < 0) result.rotate[2] += Math.PI;
	            else result.rotate[2] -= Math.PI;
	        }
	
	        return result;
	    };
	
	    /**
	     * Weighted average between two matrices by averaging their
	     *     translation, rotation, scale, skew components.
	     *     f(M1,M2,t) = (1 - t) * M1 + t * M2
	     *
	     * @method average
	     * @static
	     * @param {Transform} M1 f(M1,M2,0) = M1
	     * @param {Transform} M2 f(M1,M2,1) = M2
	     * @param {Number} t
	     * @return {Transform}
	     */
	    Transform.average = function average(M1, M2, t) {
	        t = (t === undefined) ? 0.5 : t;
	        var specM1 = Transform.interpret(M1);
	        var specM2 = Transform.interpret(M2);
	
	        var specAvg = {
	            translate: [0, 0, 0],
	            rotate: [0, 0, 0],
	            scale: [0, 0, 0],
	            skew: [0, 0, 0]
	        };
	
	        for (var i = 0; i < 3; i++) {
	            specAvg.translate[i] = (1 - t) * specM1.translate[i] + t * specM2.translate[i];
	            specAvg.rotate[i] = (1 - t) * specM1.rotate[i] + t * specM2.rotate[i];
	            specAvg.scale[i] = (1 - t) * specM1.scale[i] + t * specM2.scale[i];
	            specAvg.skew[i] = (1 - t) * specM1.skew[i] + t * specM2.skew[i];
	        }
	        return Transform.build(specAvg);
	    };
	
	    /**
	     * Compose .translate, .rotate, .scale, .skew components into
	     * Transform matrix
	     *
	     * @method build
	     * @static
	     * @param {matrixSpec} spec object with component matrices .translate,
	     *    .rotate, .scale, .skew
	     * @return {Transform} composed transform
	     */
	    Transform.build = function build(spec) {
	        var scaleMatrix = Transform.scale(spec.scale[0], spec.scale[1], spec.scale[2]);
	        var skewMatrix = Transform.skew(spec.skew[0], spec.skew[1], spec.skew[2]);
	        var rotateMatrix = Transform.rotate(spec.rotate[0], spec.rotate[1], spec.rotate[2]);
	        return Transform.thenMove(Transform.multiply(Transform.multiply(rotateMatrix, skewMatrix), scaleMatrix), spec.translate);
	    };
	
	    /**
	     * Determine if two Transforms are component-wise equal
	     *   Warning: breaks on perspective Transforms
	     *
	     * @method equals
	     * @static
	     * @param {Transform} a matrix
	     * @param {Transform} b matrix
	     * @return {boolean}
	     */
	    Transform.equals = function equals(a, b) {
	        return !Transform.notEquals(a, b);
	    };
	
	    /**
	     * Determine if two Transforms are component-wise unequal
	     *   Warning: breaks on perspective Transforms
	     *
	     * @method notEquals
	     * @static
	     * @param {Transform} a matrix
	     * @param {Transform} b matrix
	     * @return {boolean}
	     */
	    Transform.notEquals = function notEquals(a, b) {
	        if (a === b) return false;
	
	        // shortci
	        return !(a && b) ||
	            a[12] !== b[12] || a[13] !== b[13] || a[14] !== b[14] ||
	            a[0] !== b[0] || a[1] !== b[1] || a[2] !== b[2] ||
	            a[4] !== b[4] || a[5] !== b[5] || a[6] !== b[6] ||
	            a[8] !== b[8] || a[9] !== b[9] || a[10] !== b[10];
	    };
	
	    /**
	     * Constrain angle-trio components to range of [-pi, pi).
	     *
	     * @method normalizeRotation
	     * @static
	     * @param {Array.Number} rotation phi, theta, psi (array of floats
	     *    && array.length == 3)
	     * @return {Array.Number} new phi, theta, psi triplet
	     *    (array of floats && array.length == 3)
	     */
	    Transform.normalizeRotation = function normalizeRotation(rotation) {
	        var result = rotation.slice(0);
	        if (result[0] === Math.PI * 0.5 || result[0] === -Math.PI * 0.5) {
	            result[0] = -result[0];
	            result[1] = Math.PI - result[1];
	            result[2] -= Math.PI;
	        }
	        if (result[0] > Math.PI * 0.5) {
	            result[0] = result[0] - Math.PI;
	            result[1] = Math.PI - result[1];
	            result[2] -= Math.PI;
	        }
	        if (result[0] < -Math.PI * 0.5) {
	            result[0] = result[0] + Math.PI;
	            result[1] = -Math.PI - result[1];
	            result[2] -= Math.PI;
	        }
	        while (result[1] < -Math.PI) result[1] += 2 * Math.PI;
	        while (result[1] >= Math.PI) result[1] -= 2 * Math.PI;
	        while (result[2] < -Math.PI) result[2] += 2 * Math.PI;
	        while (result[2] >= Math.PI) result[2] -= 2 * Math.PI;
	        return result;
	    };
	
	    /**
	     * (Property) Array defining a translation forward in z by 1
	     *
	     * @property {array} inFront
	     * @static
	     * @final
	     */
	    Transform.inFront = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1e-3, 1];
	
	    /**
	     * (Property) Array defining a translation backwards in z by 1
	     *
	     * @property {array} behind
	     * @static
	     * @final
	     */
	    Transform.behind = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, -1e-3, 1];
	
	    module.exports = Transform;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: mark@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	    var Transform = __webpack_require__(18);
	
	    /* TODO: remove these dependencies when deprecation complete */
	    var Transitionable = __webpack_require__(39);
	    var TransitionableTransform = __webpack_require__(40);
	
	    /**
	     *
	     *  A collection of visual changes to be
	     *    applied to another renderable component. This collection includes a
	     *    transform matrix, an opacity constant, a size, an origin specifier.
	     *    Modifier objects can be added to any RenderNode or object
	     *    capable of displaying renderables.  The Modifier's children and descendants
	     *    are transformed by the amounts specified in the Modifier's properties.
	     *
	     * @class Modifier
	     * @constructor
	     * @param {Object} [options] overrides of default options
	     * @param {Transform} [options.transform] affine transformation matrix
	     * @param {Number} [options.opacity]
	     * @param {Array.Number} [options.origin] origin adjustment
	     * @param {Array.Number} [options.size] size to apply to descendants
	     */
	    function Modifier(options) {
	        this._transformGetter = null;
	        this._opacityGetter = null;
	        this._originGetter = null;
	        this._alignGetter = null;
	        this._sizeGetter = null;
	        this._proportionGetter = null;
	
	        /* TODO: remove this when deprecation complete */
	        this._legacyStates = {};
	
	        this._output = {
	            transform: Transform.identity,
	            opacity: 1,
	            origin: null,
	            align: null,
	            size: null,
	            proportions: null,
	            target: null
	        };
	
	        if (options) {
	            if (options.transform) this.transformFrom(options.transform);
	            if (options.opacity !== undefined) this.opacityFrom(options.opacity);
	            if (options.origin) this.originFrom(options.origin);
	            if (options.align) this.alignFrom(options.align);
	            if (options.size) this.sizeFrom(options.size);
	            if (options.proportions) this.proportionsFrom(options.proportions);
	        }
	    }
	
	    /**
	     * Function, object, or static transform matrix which provides the transform.
	     *   This is evaluated on every tick of the engine.
	     *
	     * @method transformFrom
	     *
	     * @param {Object} transform transform provider object
	     * @return {Modifier} this
	     */
	    Modifier.prototype.transformFrom = function transformFrom(transform) {
	        if (transform instanceof Function) this._transformGetter = transform;
	        else if (transform instanceof Object && transform.get) this._transformGetter = transform.get.bind(transform);
	        else {
	            this._transformGetter = null;
	            this._output.transform = transform;
	        }
	        return this;
	    };
	
	    /**
	     * Set function, object, or number to provide opacity, in range [0,1].
	     *
	     * @method opacityFrom
	     *
	     * @param {Object} opacity provider object
	     * @return {Modifier} this
	     */
	    Modifier.prototype.opacityFrom = function opacityFrom(opacity) {
	        if (opacity instanceof Function) this._opacityGetter = opacity;
	        else if (opacity instanceof Object && opacity.get) this._opacityGetter = opacity.get.bind(opacity);
	        else {
	            this._opacityGetter = null;
	            this._output.opacity = opacity;
	        }
	        return this;
	    };
	
	    /**
	     * Set function, object, or numerical array to provide origin, as [x,y],
	     *   where x and y are in the range [0,1].
	     *
	     * @method originFrom
	     *
	     * @param {Object} origin provider object
	     * @return {Modifier} this
	     */
	    Modifier.prototype.originFrom = function originFrom(origin) {
	        if (origin instanceof Function) this._originGetter = origin;
	        else if (origin instanceof Object && origin.get) this._originGetter = origin.get.bind(origin);
	        else {
	            this._originGetter = null;
	            this._output.origin = origin;
	        }
	        return this;
	    };
	
	    /**
	     * Set function, object, or numerical array to provide align, as [x,y],
	     *   where x and y are in the range [0,1].
	     *
	     * @method alignFrom
	     *
	     * @param {Object} align provider object
	     * @return {Modifier} this
	     */
	    Modifier.prototype.alignFrom = function alignFrom(align) {
	        if (align instanceof Function) this._alignGetter = align;
	        else if (align instanceof Object && align.get) this._alignGetter = align.get.bind(align);
	        else {
	            this._alignGetter = null;
	            this._output.align = align;
	        }
	        return this;
	    };
	
	    /**
	     * Set function, object, or numerical array to provide size, as [width, height].
	     *
	     * @method sizeFrom
	     *
	     * @param {Object} size provider object
	     * @return {Modifier} this
	     */
	    Modifier.prototype.sizeFrom = function sizeFrom(size) {
	        if (size instanceof Function) this._sizeGetter = size;
	        else if (size instanceof Object && size.get) this._sizeGetter = size.get.bind(size);
	        else {
	            this._sizeGetter = null;
	            this._output.size = size;
	        }
	        return this;
	    };
	
	    /**
	     * Set function, object, or numerical array to provide proportions, as [percent of width, percent of height].
	     *
	     * @method proportionsFrom
	     *
	     * @param {Object} proportions provider object
	     * @return {Modifier} this
	     */
	    Modifier.prototype.proportionsFrom = function proportionsFrom(proportions) {
	        if (proportions instanceof Function) this._proportionGetter = proportions;
	        else if (proportions instanceof Object && proportions.get) this._proportionGetter = proportions.get.bind(proportions);
	        else {
	            this._proportionGetter = null;
	            this._output.proportions = proportions;
	        }
	        return this;
	    };
	
	     /**
	     * Deprecated: Prefer transformFrom with static Transform, or use a TransitionableTransform.
	     * @deprecated
	     * @method setTransform
	     *
	     * @param {Transform} transform Transform to transition to
	     * @param {Transitionable} transition Valid transitionable object
	     * @param {Function} callback callback to call after transition completes
	     * @return {Modifier} this
	     */
	    Modifier.prototype.setTransform = function setTransform(transform, transition, callback) {
	        if (transition || this._legacyStates.transform) {
	            if (!this._legacyStates.transform) {
	                this._legacyStates.transform = new TransitionableTransform(this._output.transform);
	            }
	            if (!this._transformGetter) this.transformFrom(this._legacyStates.transform);
	
	            this._legacyStates.transform.set(transform, transition, callback);
	            return this;
	        }
	        else return this.transformFrom(transform);
	    };
	
	    /**
	     * Deprecated: Prefer opacityFrom with static opacity array, or use a Transitionable with that opacity.
	     * @deprecated
	     * @method setOpacity
	     *
	     * @param {Number} opacity Opacity value to transition to.
	     * @param {Transitionable} transition Valid transitionable object
	     * @param {Function} callback callback to call after transition completes
	     * @return {Modifier} this
	     */
	    Modifier.prototype.setOpacity = function setOpacity(opacity, transition, callback) {
	        if (transition || this._legacyStates.opacity) {
	            if (!this._legacyStates.opacity) {
	                this._legacyStates.opacity = new Transitionable(this._output.opacity);
	            }
	            if (!this._opacityGetter) this.opacityFrom(this._legacyStates.opacity);
	
	            return this._legacyStates.opacity.set(opacity, transition, callback);
	        }
	        else return this.opacityFrom(opacity);
	    };
	
	    /**
	     * Deprecated: Prefer originFrom with static origin array, or use a Transitionable with that origin.
	     * @deprecated
	     * @method setOrigin
	     *
	     * @param {Array.Number} origin two element array with values between 0 and 1.
	     * @param {Transitionable} transition Valid transitionable object
	     * @param {Function} callback callback to call after transition completes
	     * @return {Modifier} this
	     */
	    Modifier.prototype.setOrigin = function setOrigin(origin, transition, callback) {
	        /* TODO: remove this if statement when deprecation complete */
	        if (transition || this._legacyStates.origin) {
	
	            if (!this._legacyStates.origin) {
	                this._legacyStates.origin = new Transitionable(this._output.origin || [0, 0]);
	            }
	            if (!this._originGetter) this.originFrom(this._legacyStates.origin);
	
	            this._legacyStates.origin.set(origin, transition, callback);
	            return this;
	        }
	        else return this.originFrom(origin);
	    };
	
	    /**
	     * Deprecated: Prefer alignFrom with static align array, or use a Transitionable with that align.
	     * @deprecated
	     * @method setAlign
	     *
	     * @param {Array.Number} align two element array with values between 0 and 1.
	     * @param {Transitionable} transition Valid transitionable object
	     * @param {Function} callback callback to call after transition completes
	     * @return {Modifier} this
	     */
	    Modifier.prototype.setAlign = function setAlign(align, transition, callback) {
	        /* TODO: remove this if statement when deprecation complete */
	        if (transition || this._legacyStates.align) {
	
	            if (!this._legacyStates.align) {
	                this._legacyStates.align = new Transitionable(this._output.align || [0, 0]);
	            }
	            if (!this._alignGetter) this.alignFrom(this._legacyStates.align);
	
	            this._legacyStates.align.set(align, transition, callback);
	            return this;
	        }
	        else return this.alignFrom(align);
	    };
	
	    /**
	     * Deprecated: Prefer sizeFrom with static origin array, or use a Transitionable with that size.
	     * @deprecated
	     * @method setSize
	     * @param {Array.Number} size two element array of [width, height]
	     * @param {Transitionable} transition Valid transitionable object
	     * @param {Function} callback callback to call after transition completes
	     * @return {Modifier} this
	     */
	    Modifier.prototype.setSize = function setSize(size, transition, callback) {
	        if (size && (transition || this._legacyStates.size)) {
	            if (!this._legacyStates.size) {
	                this._legacyStates.size = new Transitionable(this._output.size || [0, 0]);
	            }
	            if (!this._sizeGetter) this.sizeFrom(this._legacyStates.size);
	
	            this._legacyStates.size.set(size, transition, callback);
	            return this;
	        }
	        else return this.sizeFrom(size);
	    };
	
	    /**
	     * Deprecated: Prefer proportionsFrom with static origin array, or use a Transitionable with those proportions.
	     * @deprecated
	     * @method setProportions
	     * @param {Array.Number} proportions two element array of [percent of width, percent of height]
	     * @param {Transitionable} transition Valid transitionable object
	     * @param {Function} callback callback to call after transition completes
	     * @return {Modifier} this
	     */
	    Modifier.prototype.setProportions = function setProportions(proportions, transition, callback) {
	        if (proportions && (transition || this._legacyStates.proportions)) {
	            if (!this._legacyStates.proportions) {
	                this._legacyStates.proportions = new Transitionable(this._output.proportions || [0, 0]);
	            }
	            if (!this._proportionGetter) this.proportionsFrom(this._legacyStates.proportions);
	
	            this._legacyStates.proportions.set(proportions, transition, callback);
	            return this;
	        }
	        else return this.proportionsFrom(proportions);
	    };
	
	    /**
	     * Deprecated: Prefer to stop transform in your provider object.
	     * @deprecated
	     * @method halt
	     */
	    Modifier.prototype.halt = function halt() {
	        if (this._legacyStates.transform) this._legacyStates.transform.halt();
	        if (this._legacyStates.opacity) this._legacyStates.opacity.halt();
	        if (this._legacyStates.origin) this._legacyStates.origin.halt();
	        if (this._legacyStates.align) this._legacyStates.align.halt();
	        if (this._legacyStates.size) this._legacyStates.size.halt();
	        if (this._legacyStates.proportions) this._legacyStates.proportions.halt();
	        this._transformGetter = null;
	        this._opacityGetter = null;
	        this._originGetter = null;
	        this._alignGetter = null;
	        this._sizeGetter = null;
	        this._proportionGetter = null;
	    };
	
	    /**
	     * Deprecated: Prefer to use your provided transform or output of your transform provider.
	     * @deprecated
	     * @method getTransform
	     * @return {Object} transform provider object
	     */
	    Modifier.prototype.getTransform = function getTransform() {
	        return this._transformGetter();
	    };
	
	    /**
	     * Deprecated: Prefer to determine the end state of your transform from your transform provider
	     * @deprecated
	     * @method getFinalTransform
	     * @return {Transform} transform matrix
	     */
	    Modifier.prototype.getFinalTransform = function getFinalTransform() {
	        return this._legacyStates.transform ? this._legacyStates.transform.getFinal() : this._output.transform;
	    };
	
	    /**
	     * Deprecated: Prefer to use your provided opacity or output of your opacity provider.
	     * @deprecated
	     * @method getOpacity
	     * @return {Object} opacity provider object
	     */
	    Modifier.prototype.getOpacity = function getOpacity() {
	        return this._opacityGetter();
	    };
	
	    /**
	     * Deprecated: Prefer to use your provided origin or output of your origin provider.
	     * @deprecated
	     * @method getOrigin
	     * @return {Object} origin provider object
	     */
	    Modifier.prototype.getOrigin = function getOrigin() {
	        return this._originGetter();
	    };
	
	    /**
	     * Deprecated: Prefer to use your provided align or output of your align provider.
	     * @deprecated
	     * @method getAlign
	     * @return {Object} align provider object
	     */
	    Modifier.prototype.getAlign = function getAlign() {
	        return this._alignGetter();
	    };
	
	    /**
	     * Deprecated: Prefer to use your provided size or output of your size provider.
	     * @deprecated
	     * @method getSize
	     * @return {Object} size provider object
	     */
	    Modifier.prototype.getSize = function getSize() {
	        return this._sizeGetter ? this._sizeGetter() : this._output.size;
	    };
	
	    /**
	     * Deprecated: Prefer to use your provided proportions or output of your proportions provider.
	     * @deprecated
	     * @method getProportions
	     * @return {Object} proportions provider object
	     */
	    Modifier.prototype.getProportions = function getProportions() {
	        return this._proportionGetter ? this._proportionGetter() : this._output.proportions;
	    };
	
	    // call providers on tick to receive render spec elements to apply
	    function _update() {
	        if (this._transformGetter) this._output.transform = this._transformGetter();
	        if (this._opacityGetter) this._output.opacity = this._opacityGetter();
	        if (this._originGetter) this._output.origin = this._originGetter();
	        if (this._alignGetter) this._output.align = this._alignGetter();
	        if (this._sizeGetter) this._output.size = this._sizeGetter();
	        if (this._proportionGetter) this._output.proportions = this._proportionGetter();
	    }
	
	    /**
	     * Return render spec for this Modifier, applying to the provided
	     *    target component.  This is similar to render() for Surfaces.
	     *
	     * @private
	     * @method modify
	     *
	     * @param {Object} target (already rendered) render spec to
	     *    which to apply the transform.
	     * @return {Object} render spec for this Modifier, including the
	     *    provided target
	     */
	    Modifier.prototype.modify = function modify(target) {
	        _update.call(this);
	        this._output.target = target;
	        return this._output;
	    };
	
	    module.exports = Modifier;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: mark@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	
	    /**
	     * Collection to map keyboard codes in plain english
	     *
	     * @class KeyCodes
	     * @static
	     */
	    var KeyCodes = {
	        0 : 48,
	        1 : 49,
	        2 : 50,
	        3 : 51,
	        4 : 52,
	        5 : 53,
	        6 : 54,
	        7 : 55,
	        8 : 56,
	        9 : 57,
	        a : 97,
	        b : 98,
	        c : 99,
	        d : 100,
	        e : 101,
	        f : 102,
	        g : 103,
	        h : 104,
	        i : 105,
	        j : 106,
	        k : 107,
	        l : 108,
	        m : 109,
	        n : 110,
	        o : 111,
	        p : 112,
	        q : 113,
	        r : 114,
	        s : 115,
	        t : 116,
	        u : 117,
	        v : 118,
	        w : 119,
	        x : 120,
	        y : 121,
	        z : 122,
	        A : 65,
	        B : 66,
	        C : 67,
	        D : 68,
	        E : 69,
	        F : 70,
	        G : 71,
	        H : 72,
	        I : 73,
	        J : 74,
	        K : 75,
	        L : 76,
	        M : 77,
	        N : 78,
	        O : 79,
	        P : 80,
	        Q : 81,
	        R : 82,
	        S : 83,
	        T : 84,
	        U : 85,
	        V : 86,
	        W : 87,
	        X : 88,
	        Y : 89,
	        Z : 90,
	        ENTER : 13,
	        LEFT_ARROW: 37,
	        RIGHT_ARROW: 39,
	        UP_ARROW: 38,
	        DOWN_ARROW: 40,
	        SPACE: 32,
	        SHIFT: 16,
	        TAB: 9
	    };
	
	    module.exports = KeyCodes;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: mark@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	    /**
	     * This namespace holds standalone functionality.
	     *  Currently includes name mapping for transition curves,
	     *  name mapping for origin pairs, and the after() function.
	     *
	     * @class Utility
	     * @static
	     */
	    var Utility = {};
	
	    /**
	     * Table of direction array positions
	     *
	     * @property {object} Direction
	     * @final
	     */
	    Utility.Direction = {
	        X: 0,
	        Y: 1,
	        Z: 2
	    };
	
	    /**
	     * Return wrapper around callback function. Once the wrapper is called N
	     *   times, invoke the callback function. Arguments and scope preserved.
	     *
	     * @method after
	     *
	     * @param {number} count number of calls before callback function invoked
	     * @param {Function} callback wrapped callback function
	     *
	     * @return {function} wrapped callback with coundown feature
	     */
	    Utility.after = function after(count, callback) {
	        var counter = count;
	        return function() {
	            counter--;
	            if (counter === 0) callback.apply(this, arguments);
	        };
	    };
	
	    /**
	     * Load a URL and return its contents in a callback
	     *
	     * @method loadURL
	     *
	     * @param {string} url URL of object
	     * @param {function} callback callback to dispatch with content
	     */
	    Utility.loadURL = function loadURL(url, callback) {
	        var xhr = new XMLHttpRequest();
	        xhr.onreadystatechange = function onreadystatechange() {
	            if (this.readyState === 4) {
	                if (callback) callback(this.responseText);
	            }
	        };
	        xhr.open('GET', url);
	        xhr.send();
	    };
	
	    /**
	     * Create a document fragment from a string of HTML
	     *
	     * @method createDocumentFragmentFromHTML
	     *
	     * @param {string} html HTML to convert to DocumentFragment
	     *
	     * @return {DocumentFragment} DocumentFragment representing input HTML
	     */
	    Utility.createDocumentFragmentFromHTML = function createDocumentFragmentFromHTML(html) {
	        var element = document.createElement('div');
	        element.innerHTML = html;
	        var result = document.createDocumentFragment();
	        while (element.hasChildNodes()) result.appendChild(element.firstChild);
	        return result;
	    };
	
	    /*
	     *  Deep clone an object.
	     *  @param b {Object} Object to clone
	     *  @return a {Object} Cloned object.
	     */
	    Utility.clone = function clone(b) {
	        var a;
	        if (typeof b === 'object') {
	            a = (b instanceof Array) ? [] : {};
	            for (var key in b) {
	                if (typeof b[key] === 'object' && b[key] !== null) {
	                    if (b[key] instanceof Array) {
	                        a[key] = new Array(b[key].length);
	                        for (var i = 0; i < b[key].length; i++) {
	                            a[key][i] = Utility.clone(b[key][i]);
	                        }
	                    }
	                    else {
	                      a[key] = Utility.clone(b[key]);
	                    }
	                }
	                else {
	                    a[key] = b[key];
	                }
	            }
	        }
	        else {
	            a = b;
	        }
	        return a;
	    };
	
	    module.exports = Utility;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;
	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: mark@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	    var Surface = __webpack_require__(28);
	    var Context = __webpack_require__(36);
	
	    /**
	     * ContainerSurface is an object designed to contain surfaces and
	     *   set properties to be applied to all of them at once.
	     *   This extends the Surface class.
	     *   A container surface will enforce these properties on the
	     *   surfaces it contains:
	     *
	     *   size (clips contained surfaces to its own width and height);
	     *
	     *   origin;
	     *
	     *   its own opacity and transform, which will be automatically
	     *   applied to  all Surfaces contained directly and indirectly.
	     *
	     * @class ContainerSurface
	     * @extends Surface
	     * @constructor
	     * @param {Array.Number} [options.size] [width, height] in pixels
	     * @param {Array.string} [options.classes] CSS classes to set on all inner content
	     * @param {Array} [options.properties] string dictionary of HTML attributes to set on target div
	     * @param {string} [options.content] inner (HTML) content of surface (should not be used)
	     */
	    function ContainerSurface(options) {
	        Surface.call(this, options);
	        this._container = document.createElement('div');
	        this._container.classList.add('famous-group');
	        this._container.classList.add('famous-container-group');
	        this._shouldRecalculateSize = false;
	        this.context = new Context(this._container);
	        this.setContent(this._container);
	    }
	
	    ContainerSurface.prototype = Object.create(Surface.prototype);
	    ContainerSurface.prototype.constructor = ContainerSurface;
	    ContainerSurface.prototype.elementType = 'div';
	    ContainerSurface.prototype.elementClass = 'famous-surface';
	
	    /**
	     * Add renderables to this object's render tree
	     *
	     * @method add
	     *
	     * @param {Object} obj renderable object
	     * @return {RenderNode} RenderNode wrapping this object, if not already a RenderNode
	     */
	    ContainerSurface.prototype.add = function add() {
	        return this.context.add.apply(this.context, arguments);
	    };
	
	    /**
	     * Return spec for this surface.  Note: Can result in a size recalculation.
	     *
	     * @private
	     * @method render
	     *
	     * @return {Object} render spec for this surface (spec id)
	     */
	    ContainerSurface.prototype.render = function render() {
	        if (this._sizeDirty) this._shouldRecalculateSize = true;
	        return Surface.prototype.render.apply(this, arguments);
	    };
	
	    /**
	     * Place the document element this component manages into the document.
	     *
	     * @private
	     * @method deploy
	     * @param {Node} target document parent of this container
	     */
	    ContainerSurface.prototype.deploy = function deploy() {
	        this._shouldRecalculateSize = true;
	        return Surface.prototype.deploy.apply(this, arguments);
	    };
	
	    /**
	     * Apply changes from this component to the corresponding document element.
	     * This includes changes to classes, styles, size, content, opacity, origin,
	     * and matrix transforms.
	     *
	     * @private
	     * @method commit
	     * @param {Context} context commit context
	     * @param {Transform} transform unused TODO
	     * @param {Number} opacity  unused TODO
	     * @param {Array.Number} origin unused TODO
	     * @param {Array.Number} size unused TODO
	     * @return {undefined} TODO returns an undefined value
	     */
	    ContainerSurface.prototype.commit = function commit(context, transform, opacity, origin, size) {
	        var previousSize = this._size ? [this._size[0], this._size[1]] : null;
	        var result = Surface.prototype.commit.apply(this, arguments);
	        if (this._shouldRecalculateSize || (previousSize && (this._size[0] !== previousSize[0] || this._size[1] !== previousSize[1]))) {
	            this.context.setSize();
	            this._shouldRecalculateSize = false;
	        }
	        this.context.update();
	        return result;
	    };
	
	    module.exports = ContainerSurface;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: felix@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	    var Modifier = __webpack_require__(19);
	    var RenderNode = __webpack_require__(41);
	    var Transform = __webpack_require__(18);
	    var Transitionable = __webpack_require__(39);
	    var View = __webpack_require__(30);
	
	    /**
	     * A dynamic view that can show or hide different renerables with transitions.
	     * @class RenderController
	     * @constructor
	     * @param {Options} [options] An object of configurable options.
	     * @param {Transition} [inTransition=true] The transition in charge of showing a renderable.
	     * @param {Transition} [outTransition=true]  The transition in charge of removing your previous renderable when
	     * you show a new one, or hiding your current renderable.
	     * @param {Boolean} [overlap=true] When showing a new renderable, overlap determines if the
	      out transition of the old one executes concurrently with the in transition of the new one,
	       or synchronously beforehand.
	     */
	    function RenderController(options) {
	        View.apply(this, arguments);
	
	        this._showing = -1;
	        this._outgoingRenderables = [];
	        this._nextRenderable = null;
	
	        this._renderables = [];
	        this._nodes = [];
	        this._modifiers = [];
	        this._states = [];
	
	        this.inTransformMap = RenderController.DefaultMap.transform;
	        this.inOpacityMap = RenderController.DefaultMap.opacity;
	        this.inOriginMap = RenderController.DefaultMap.origin;
	        this.outTransformMap = RenderController.DefaultMap.transform;
	        this.outOpacityMap = RenderController.DefaultMap.opacity;
	        this.outOriginMap = RenderController.DefaultMap.origin;
	
	        this._output = [];
	    }
	    RenderController.prototype = Object.create(View.prototype);
	    RenderController.prototype.constructor = RenderController;
	
	    RenderController.DEFAULT_OPTIONS = {
	        inTransition: true,
	        outTransition: true,
	        overlap: true
	    };
	
	    RenderController.DefaultMap = {
	        transform: function() {
	            return Transform.identity;
	        },
	        opacity: function(progress) {
	            return progress;
	        },
	        origin: null
	    };
	
	    function _mappedState(map, state) {
	        return map(state.get());
	    }
	
	    /**
	     * As your RenderController shows a new renderable, it executes a transition in. This transition in
	     *  will affect a default interior state and modify it as you bring renderables in and out. However, if you want to control
	     *  the transform, opacity, and origin state yourself, you may call certain methods (such as inTransformFrom) to obtain state from an outside source,
	     *  that may either be a function or a Famous transitionable. inTransformFrom sets the accessor for the state of
	     *  the transform used in transitioning in renderables.
	     *
	     * @method inTransformFrom
	     * @param {Function|Transitionable} transform  A function that returns a transform from outside closure, or a
	     * a transitionable that manages a full transform (a sixteen value array).
	     * @chainable
	     */
	    RenderController.prototype.inTransformFrom = function inTransformFrom(transform) {
	        if (transform instanceof Function) this.inTransformMap = transform;
	        else if (transform && transform.get) this.inTransformMap = transform.get.bind(transform);
	        else throw new Error('inTransformFrom takes only function or getter object');
	        //TODO: tween transition
	        return this;
	    };
	
	    /**
	     * inOpacityFrom sets the accessor for the state of the opacity used in transitioning in renderables.
	     * @method inOpacityFrom
	     * @param {Function|Transitionable} opacity  A function that returns an opacity from outside closure, or a
	     * a transitionable that manages opacity (a number between zero and one).
	     * @chainable
	     */
	    RenderController.prototype.inOpacityFrom = function inOpacityFrom(opacity) {
	        if (opacity instanceof Function) this.inOpacityMap = opacity;
	        else if (opacity && opacity.get) this.inOpacityMap = opacity.get.bind(opacity);
	        else throw new Error('inOpacityFrom takes only function or getter object');
	        //TODO: tween opacity
	        return this;
	    };
	
	    /**
	     * inOriginFrom sets the accessor for the state of the origin used in transitioning in renderables.
	     * @method inOriginFrom
	     * @param {Function|Transitionable} origin A function that returns an origin from outside closure, or a
	     * a transitionable that manages origin (a two value array of numbers between zero and one).
	     * @chainable
	     */
	    RenderController.prototype.inOriginFrom = function inOriginFrom(origin) {
	        if (origin instanceof Function) this.inOriginMap = origin;
	        else if (origin && origin.get) this.inOriginMap = origin.get.bind(origin);
	        else throw new Error('inOriginFrom takes only function or getter object');
	        //TODO: tween origin
	        return this;
	    };
	
	    /**
	     * outTransformFrom sets the accessor for the state of the transform used in transitioning out renderables.
	     * @method outTransformFrom
	     * @param {Function|Transitionable} transform  A function that returns a transform from outside closure, or a
	     * a transitionable that manages a full transform (a sixteen value array).
	     * @chainable
	     */
	    RenderController.prototype.outTransformFrom = function outTransformFrom(transform) {
	        if (transform instanceof Function) this.outTransformMap = transform;
	        else if (transform && transform.get) this.outTransformMap = transform.get.bind(transform);
	        else throw new Error('outTransformFrom takes only function or getter object');
	        //TODO: tween transition
	        return this;
	    };
	
	    /**
	     * outOpacityFrom sets the accessor for the state of the opacity used in transitioning out renderables.
	     * @method outOpacityFrom
	     * @param {Function|Transitionable} opacity  A function that returns an opacity from outside closure, or a
	     * a transitionable that manages opacity (a number between zero and one).
	     * @chainable
	     */
	    RenderController.prototype.outOpacityFrom = function outOpacityFrom(opacity) {
	        if (opacity instanceof Function) this.outOpacityMap = opacity;
	        else if (opacity && opacity.get) this.outOpacityMap = opacity.get.bind(opacity);
	        else throw new Error('outOpacityFrom takes only function or getter object');
	        //TODO: tween opacity
	        return this;
	    };
	
	    /**
	     * outOriginFrom sets the accessor for the state of the origin used in transitioning out renderables.
	     * @method outOriginFrom
	     * @param {Function|Transitionable} origin A function that returns an origin from outside closure, or a
	     * a transitionable that manages origin (a two value array of numbers between zero and one).
	     * @chainable
	     */
	    RenderController.prototype.outOriginFrom = function outOriginFrom(origin) {
	        if (origin instanceof Function) this.outOriginMap = origin;
	        else if (origin && origin.get) this.outOriginMap = origin.get.bind(origin);
	        else throw new Error('outOriginFrom takes only function or getter object');
	        //TODO: tween origin
	        return this;
	    };
	
	    /**
	     * Show displays the targeted renderable with a transition and an optional callback to
	     * execute afterwards.
	     * @method show
	     * @param {Object} renderable The renderable you want to show.
	     * @param {Transition} [transition] Overwrites the default transition in to display the
	     * passed-in renderable.
	     * @param {function} [callback] Executes after transitioning in the renderable.
	     * @chainable
	     */
	    RenderController.prototype.show = function show(renderable, transition, callback) {
	        if (!renderable) {
	            return this.hide(callback);
	        }
	
	        if (transition instanceof Function) {
	            callback = transition;
	            transition = null;
	        }
	
	        if (this._showing >= 0) {
	            if (this.options.overlap) this.hide();
	            else {
	                if (this._nextRenderable) {
	                    this._nextRenderable = renderable;
	                }
	                else {
	                    this._nextRenderable = renderable;
	                    this.hide(function() {
	                        if (this._nextRenderable === renderable) this.show(this._nextRenderable, callback);
	                        this._nextRenderable = null;
	                    });
	                }
	                return undefined;
	            }
	        }
	
	        var state = null;
	
	        // check to see if we should restore
	        var renderableIndex = this._renderables.indexOf(renderable);
	        if (renderableIndex >= 0) {
	            this._showing = renderableIndex;
	            state = this._states[renderableIndex];
	            state.halt();
	
	            var outgoingIndex = this._outgoingRenderables.indexOf(renderable);
	            if (outgoingIndex >= 0) this._outgoingRenderables.splice(outgoingIndex, 1);
	        }
	        else {
	            state = new Transitionable(0);
	
	            var modifier = new Modifier({
	                transform: this.inTransformMap ? _mappedState.bind(this, this.inTransformMap, state) : null,
	                opacity: this.inOpacityMap ? _mappedState.bind(this, this.inOpacityMap, state) : null,
	                origin: this.inOriginMap ? _mappedState.bind(this, this.inOriginMap, state) : null
	            });
	            var node = new RenderNode();
	            node.add(modifier).add(renderable);
	
	            this._showing = this._nodes.length;
	            this._nodes.push(node);
	            this._modifiers.push(modifier);
	            this._states.push(state);
	            this._renderables.push(renderable);
	        }
	
	        if (!transition) transition = this.options.inTransition;
	        state.set(1, transition, callback);
	    };
	
	    /**
	     * Hide hides the currently displayed renderable with an out transition.
	     * @method hide
	     * @param {Transition} [transition] Overwrites the default transition in to hide the
	     * currently controlled renderable.
	     * @param {function} [callback] Executes after transitioning out the renderable.
	     * @chainable
	     */
	    RenderController.prototype.hide = function hide(transition, callback) {
	        if (this._showing < 0) return;
	        var index = this._showing;
	        this._showing = -1;
	
	        if (transition instanceof Function) {
	            callback = transition;
	            transition = undefined;
	        }
	
	        var node = this._nodes[index];
	        var modifier = this._modifiers[index];
	        var state = this._states[index];
	        var renderable = this._renderables[index];
	
	        modifier.transformFrom(this.outTransformMap ? _mappedState.bind(this, this.outTransformMap, state) : null);
	        modifier.opacityFrom(this.outOpacityMap ? _mappedState.bind(this, this.outOpacityMap, state) : null);
	        modifier.originFrom(this.outOriginMap ? _mappedState.bind(this, this.outOriginMap, state) : null);
	
	        if (this._outgoingRenderables.indexOf(renderable) < 0) this._outgoingRenderables.push(renderable);
	
	        if (!transition) transition = this.options.outTransition;
	        state.halt();
	        state.set(0, transition, function(node, modifier, state, renderable) {
	            if (this._outgoingRenderables.indexOf(renderable) >= 0) {
	                var index = this._nodes.indexOf(node);
	                this._nodes.splice(index, 1);
	                this._modifiers.splice(index, 1);
	                this._states.splice(index, 1);
	                this._renderables.splice(index, 1);
	                this._outgoingRenderables.splice(this._outgoingRenderables.indexOf(renderable), 1);
	
	                if (this._showing >= index) this._showing--;
	            }
	            if (callback) callback.call(this);
	        }.bind(this, node, modifier, state, renderable));
	    };
	
	    /**
	     * Generate a render spec from the contents of this component.
	     *
	     * @private
	     * @method render
	     * @return {number} Render spec for this component
	     */
	    RenderController.prototype.render = function render() {
	        var result = this._output;
	        if (result.length > this._nodes.length) result.splice(this._nodes.length);
	        for (var i = 0; i < this._nodes.length; i++) {
	            result[i] = this._nodes[i].render();
	        }
	        return result;
	    };
	
	    module.exports = RenderController;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: mark@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	
	    var EventHandler = __webpack_require__(37);
	
	    /**
	     * Combines multiple types of sync classes (e.g. mouse, touch,
	     *  scrolling) into one standardized interface for inclusion in widgets.
	     *
	     *  Sync classes are first registered with a key, and then can be accessed
	     *  globally by key.
	     *
	     *  Emits 'start', 'update' and 'end' events as a union of the sync class
	     *  providers.
	     *
	     * @class GenericSync
	     * @constructor
	     * @param syncs {Object|Array} object with fields {sync key : sync options}
	     *    or an array of registered sync keys
	     * @param [options] {Object|Array} options object to set on all syncs
	     */
	    function GenericSync(syncs, options) {
	        this._eventInput = new EventHandler();
	        this._eventOutput = new EventHandler();
	
	        EventHandler.setInputHandler(this, this._eventInput);
	        EventHandler.setOutputHandler(this, this._eventOutput);
	
	        this._syncs = {};
	        if (syncs) this.addSync(syncs);
	        if (options) this.setOptions(options);
	    }
	
	    GenericSync.DIRECTION_X = 0;
	    GenericSync.DIRECTION_Y = 1;
	    GenericSync.DIRECTION_Z = 2;
	
	    // Global registry of sync classes. Append only.
	    var registry = {};
	
	    /**
	     * Register a global sync class with an identifying key
	     *
	     * @static
	     * @method register
	     *
	     * @param syncObject {Object} an object of {sync key : sync options} fields
	     */
	    GenericSync.register = function register(syncObject) {
	        for (var key in syncObject){
	            if (registry[key]){
	                if (registry[key] === syncObject[key]) return; // redundant registration
	                else throw new Error('this key is registered to a different sync class');
	            }
	            else registry[key] = syncObject[key];
	        }
	    };
	
	    /**
	     * Helper to set options on all sync instances
	     *
	     * @method setOptions
	     * @param options {Object} options object
	     */
	    GenericSync.prototype.setOptions = function(options) {
	        for (var key in this._syncs){
	            this._syncs[key].setOptions(options);
	        }
	    };
	
	    /**
	     * Pipe events to a sync class
	     *
	     * @method pipeSync
	     * @param key {String} identifier for sync class
	     */
	    GenericSync.prototype.pipeSync = function pipeToSync(key) {
	        var sync = this._syncs[key];
	        this._eventInput.pipe(sync);
	        sync.pipe(this._eventOutput);
	    };
	
	    /**
	     * Unpipe events from a sync class
	     *
	     * @method unpipeSync
	     * @param key {String} identifier for sync class
	     */
	    GenericSync.prototype.unpipeSync = function unpipeFromSync(key) {
	        var sync = this._syncs[key];
	        this._eventInput.unpipe(sync);
	        sync.unpipe(this._eventOutput);
	    };
	
	    function _addSingleSync(key, options) {
	        if (!registry[key]) return;
	        this._syncs[key] = new (registry[key])(options);
	        this.pipeSync(key);
	    }
	
	    /**
	     * Add a sync class to from the registered classes
	     *
	     * @method addSync
	     * @param syncs {Object|Array.String} an array of registered sync keys
	     *    or an object with fields {sync key : sync options}
	     */
	    GenericSync.prototype.addSync = function addSync(syncs) {
	        if (syncs instanceof Array)
	            for (var i = 0; i < syncs.length; i++)
	                _addSingleSync.call(this, syncs[i]);
	        else if (syncs instanceof Object)
	            for (var key in syncs)
	                _addSingleSync.call(this, key, syncs[key]);
	    };
	
	    module.exports = GenericSync;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: mark@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	    var EventHandler = __webpack_require__(37);
	    var OptionsManager = __webpack_require__(38);
	
	    /**
	     * Handles piped in mouse drag events. Outputs an object with the position delta from last frame, position from start,
	     * current velocity averaged out over the velocitySampleLength (set via options), clientX, clientY, offsetX, and offsetY.
	     *
	     * Emits 'start', 'update' and 'end' events. Designed to be used either as a standalone MouseSync, or as part of a
	     * GenericSync.
	     *
	     * @class MouseSync
	     * @constructor
	     *
	     * @example
	     *   var Surface = require('../core/Surface');
	     *   var MouseSync = require('../inputs/MouseSync');
	     *
	     *   var surface = new Surface({ size: [100, 100] });
	     *   var mouseSync = new MouseSync();
	     *   surface.pipe(mouseSync);
	     *
	     *   mouseSync.on('start', function (e) { // react to start });
	     *   mouseSync.on('update', function (e) { // react to update });
	     *   mouseSync.on('end', function (e) { // react to end });
	     *
	     * @param [options] {Object}                An object of the following configurable options.
	     * @param [options.direction] {Number}      Read from a particular axis. Valid options are: undefined, 0 or 1. 0 corresponds to x, and 1 to y. Default is undefined, which allows both x and y.
	     * @param [options.rails] {Boolean}         Read from axis with the greatest differential.
	     * @param [options.velocitySampleLength] {Number}  Number of previous frames to check velocity against.
	     * @param [options.propogate] {Boolean}     Add a listener to document on mouseleave. This allows drag events to continue across the entire page.
	     */
	    function MouseSync(options) {
	        this.options =  Object.create(MouseSync.DEFAULT_OPTIONS);
	        this._optionsManager = new OptionsManager(this.options);
	
	        if (options) this.setOptions(options);
	
	        this._eventInput = new EventHandler();
	        this._eventOutput = new EventHandler();
	
	        EventHandler.setInputHandler(this, this._eventInput);
	        EventHandler.setOutputHandler(this, this._eventOutput);
	
	        this._eventInput.on('mousedown', _handleStart.bind(this));
	        this._eventInput.on('mousemove', _handleMove.bind(this));
	        this._eventInput.on('mouseup', _handleEnd.bind(this));
	
	        if (this.options.propogate) this._eventInput.on('mouseleave', _handleLeave.bind(this));
	        else this._eventInput.on('mouseleave', _handleEnd.bind(this));
	
	        this._payload = {
	            delta    : null,
	            position : null,
	            velocity : null,
	            clientX  : 0,
	            clientY  : 0,
	            offsetX  : 0,
	            offsetY  : 0
	        };
	
	        this._positionHistory = [];
	        this._position = null;      // to be deprecated
	        this._prevCoord = undefined;
	        this._prevTime = undefined;
	        this._down = false;
	        this._moved = false;
	        this._documentActive = false;
	    }
	
	    MouseSync.DEFAULT_OPTIONS = {
	        direction: undefined,
	        rails: false,
	        scale: 1,
	        propogate: true,  // events piped to document on mouseleave
	        velocitySampleLength: 10,
	        preventDefault: true
	    };
	
	    MouseSync.DIRECTION_X = 0;
	    MouseSync.DIRECTION_Y = 1;
	
	    var MINIMUM_TICK_TIME = 8;
	
	    /**
	     *  Triggered by mousedown.
	     *
	     *  @method _handleStart
	     *  @private
	     */
	    function _handleStart(event) {
	        var delta;
	        var velocity;
	        if (this.options.preventDefault) event.preventDefault(); // prevent drag
	
	        var x = event.clientX;
	        var y = event.clientY;
	
	        this._prevCoord = [x, y];
	        this._prevTime = Date.now();
	        this._down = true;
	        this._move = false;
	
	        if (this.options.direction !== undefined) {
	            this._position = 0;
	            delta = 0;
	            velocity = 0;
	        }
	        else {
	            this._position = [0, 0];
	            delta = [0, 0];
	            velocity = [0, 0];
	        }
	
	        var payload = this._payload;
	        payload.delta = delta;
	        payload.position = this._position;
	        payload.velocity = velocity;
	        payload.clientX = x;
	        payload.clientY = y;
	        payload.offsetX = event.offsetX;
	        payload.offsetY = event.offsetY;
	
	        this._positionHistory.push({
	            position: payload.position.slice ? payload.position.slice(0) : payload.position,
	            time: this._prevTime
	        });
	
	        this._eventOutput.emit('start', payload);
	        this._documentActive = false;
	    }
	
	    /**
	     *  Triggered by mousemove.
	     *
	     *  @method _handleMove
	     *  @private
	     */
	    function _handleMove(event) {
	        if (!this._prevCoord) return;
	
	        var prevCoord = this._prevCoord;
	        var prevTime = this._prevTime;
	
	        var x = event.clientX;
	        var y = event.clientY;
	
	        var currTime = Date.now();
	
	        var diffX = x - prevCoord[0];
	        var diffY = y - prevCoord[1];
	
	        if (this.options.rails) {
	            if (Math.abs(diffX) > Math.abs(diffY)) diffY = 0;
	            else diffX = 0;
	        }
	
	        var diffTime = Math.max(currTime - this._positionHistory[0].time, MINIMUM_TICK_TIME); // minimum tick time
	
	        var scale = this.options.scale;
	        var nextVel;
	        var nextDelta;
	
	        if (this.options.direction === MouseSync.DIRECTION_X) {
	            nextDelta = scale * diffX;
	            this._position += nextDelta;
	            nextVel = scale * (this._position - this._positionHistory[0].position) / diffTime;
	        }
	        else if (this.options.direction === MouseSync.DIRECTION_Y) {
	            nextDelta = scale * diffY;
	            this._position += nextDelta;
	            nextVel = scale * (this._position - this._positionHistory[0].position) / diffTime;
	        }
	        else {
	            nextDelta = [scale * diffX, scale * diffY];
	            nextVel = [
	                scale * (this._position[0] - this._positionHistory[0].position[0]) / diffTime,
	                scale * (this._position[1] - this._positionHistory[0].position[1]) / diffTime
	            ];
	            this._position[0] += nextDelta[0];
	            this._position[1] += nextDelta[1];
	        }
	
	        var payload = this._payload;
	        payload.delta    = nextDelta;
	        payload.position = this._position;
	        payload.velocity = nextVel;
	        payload.clientX  = x;
	        payload.clientY  = y;
	        payload.offsetX  = event.offsetX;
	        payload.offsetY  = event.offsetY;
	
	        if (this._positionHistory.length === this.options.velocitySampleLength) {
	          this._positionHistory.shift();
	        }
	
	        this._positionHistory.push({
	          position: payload.position.slice ? payload.position.slice(0) : payload.position,
	          time: currTime
	        });
	
	        this._eventOutput.emit('update', payload);
	
	        this._prevCoord = [x, y];
	        this._prevTime = currTime;
	        this._move = true;
	    }
	
	    /**
	     *  Triggered by mouseup on the element or document body if propagation is enabled, or
	     *  mouseleave if propagation is off.
	     *
	     *  @method _handleEnd
	     *  @private
	     */
	    function _handleEnd(event) {
	        if (!this._down) return;
	
	        this._eventOutput.emit('end', this._payload);
	        this._prevCoord = undefined;
	        this._prevTime = undefined;
	        this._down = false;
	        this._move = false;
	        this._positionHistory = [];
	    }
	
	    /**
	     *  Switches the mousemove listener to the document body, if propagation is enabled.
	     *  @method _handleLeave
	     *  @private
	     */
	    function _handleLeave(event) {
	        if (!this._down || !this._move) return;
	
	        if (!this._documentActive) {
	          var boundMove = _handleMove.bind(this);
	          var boundEnd = function(event) {
	              _handleEnd.call(this, event);
	              document.removeEventListener('mousemove', boundMove);
	              document.removeEventListener('mouseup', boundEnd);
	          }.bind(this, event);
	          document.addEventListener('mousemove', boundMove);
	          document.addEventListener('mouseup', boundEnd);
	          this._documentActive = true;
	        }
	    }
	
	    /**
	     * Return entire options dictionary, including defaults.
	     *
	     * @method getOptions
	     * @return {Object} configuration options
	     */
	    MouseSync.prototype.getOptions = function getOptions() {
	        return this.options;
	    };
	
	    /**
	     * Set internal options, overriding any default options
	     *
	     * @method setOptions
	     *
	     * @param [options] {Object}             default options overrides
	     * @param [options.direction] {Number}   read from a particular axis
	     * @param [options.rails] {Boolean}      read from axis with greatest differential
	     * @param [options.propogate] {Boolean}  add listened to document on mouseleave
	     */
	    MouseSync.prototype.setOptions = function setOptions(options) {
	        return this._optionsManager.setOptions(options);
	    };
	
	    module.exports = MouseSync;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: mark@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	    var TouchTracker = __webpack_require__(42);
	    var EventHandler = __webpack_require__(37);
	    var OptionsManager = __webpack_require__(38);
	
	    /**
	     * Handles piped in touch events. Emits 'start', 'update', and 'events'
	     *   events with delta, position, velocity, acceleration, clientX, clientY, count, and touch id.
	     *   Useful for dealing with inputs on touch devices. Designed to be used either as standalone, or
	     *   included in a GenericSync.
	     *
	     * @class TouchSync
	     * @constructor
	     *
	     * @example
	     *   var Surface = require('../core/Surface');
	     *   var TouchSync = require('../inputs/TouchSync');
	     *
	     *   var surface = new Surface({ size: [100, 100] });
	     *   var touchSync = new TouchSync();
	     *   surface.pipe(touchSync);
	     *
	     *   touchSync.on('start', function (e) { // react to start });
	     *   touchSync.on('update', function (e) { // react to update });
	     *   touchSync.on('end', function (e) { // react to end });*
	     *
	     * @param [options] {Object}             default options overrides
	     * @param [options.direction] {Number}   read from a particular axis
	     * @param [options.rails] {Boolean}      read from axis with greatest differential
	     * @param [options.velocitySampleLength] {Number}  Number of previous frames to check velocity against.
	     * @param [options.scale] {Number}       constant factor to scale velocity output
	     * @param [options.touchLimit] {Number}  touchLimit upper bound for emitting events based on number of touches
	     */
	    function TouchSync(options) {
	        this.options =  Object.create(TouchSync.DEFAULT_OPTIONS);
	        this._optionsManager = new OptionsManager(this.options);
	        if (options) this.setOptions(options);
	
	        this._eventOutput = new EventHandler();
	        this._touchTracker = new TouchTracker({
	            touchLimit: this.options.touchLimit
	        });
	
	        EventHandler.setOutputHandler(this, this._eventOutput);
	        EventHandler.setInputHandler(this, this._touchTracker);
	
	        this._touchTracker.on('trackstart', _handleStart.bind(this));
	        this._touchTracker.on('trackmove', _handleMove.bind(this));
	        this._touchTracker.on('trackend', _handleEnd.bind(this));
	
	        this._payload = {
	            delta    : null,
	            position : null,
	            velocity : null,
	            clientX  : undefined,
	            clientY  : undefined,
	            count    : 0,
	            touch    : undefined
	        };
	
	        this._position = null; // to be deprecated
	    }
	
	    TouchSync.DEFAULT_OPTIONS = {
	        direction: undefined,
	        rails: false,
	        touchLimit: 1,
	        velocitySampleLength: 10,
	        scale: 1
	    };
	
	    TouchSync.DIRECTION_X = 0;
	    TouchSync.DIRECTION_Y = 1;
	
	    var MINIMUM_TICK_TIME = 8;
	
	    /**
	     *  Triggered by trackstart.
	     *  @method _handleStart
	     *  @private
	     */
	    function _handleStart(data) {
	        var velocity;
	        var delta;
	        if (this.options.direction !== undefined){
	            this._position = 0;
	            velocity = 0;
	            delta = 0;
	        }
	        else {
	            this._position = [0, 0];
	            velocity = [0, 0];
	            delta = [0, 0];
	        }
	
	        var payload = this._payload;
	        payload.delta = delta;
	        payload.position = this._position;
	        payload.velocity = velocity;
	        payload.clientX = data.x;
	        payload.clientY = data.y;
	        payload.count = data.count;
	        payload.touch = data.identifier;
	
	        this._eventOutput.emit('start', payload);
	    }
	
	    /**
	     *  Triggered by trackmove.
	     *  @method _handleMove
	     *  @private
	     */
	    function _handleMove(data) {
	        var history = data.history;
	
	        var currHistory = history[history.length - 1];
	        var prevHistory = history[history.length - 2];
	
	        var distantHistory = history[history.length - this.options.velocitySampleLength] ?
	          history[history.length - this.options.velocitySampleLength] :
	          history[history.length - 2];
	
	        var distantTime = distantHistory.timestamp;
	        var currTime = currHistory.timestamp;
	
	        var diffX = currHistory.x - prevHistory.x;
	        var diffY = currHistory.y - prevHistory.y;
	
	        var velDiffX = currHistory.x - distantHistory.x;
	        var velDiffY = currHistory.y - distantHistory.y;
	
	        if (this.options.rails) {
	            if (Math.abs(diffX) > Math.abs(diffY)) diffY = 0;
	            else diffX = 0;
	
	            if (Math.abs(velDiffX) > Math.abs(velDiffY)) velDiffY = 0;
	            else velDiffX = 0;
	        }
	
	        var diffTime = Math.max(currTime - distantTime, MINIMUM_TICK_TIME);
	
	        var velX = velDiffX / diffTime;
	        var velY = velDiffY / diffTime;
	
	        var scale = this.options.scale;
	        var nextVel;
	        var nextDelta;
	
	        if (this.options.direction === TouchSync.DIRECTION_X) {
	            nextDelta = scale * diffX;
	            nextVel = scale * velX;
	            this._position += nextDelta;
	        }
	        else if (this.options.direction === TouchSync.DIRECTION_Y) {
	            nextDelta = scale * diffY;
	            nextVel = scale * velY;
	            this._position += nextDelta;
	        }
	        else {
	            nextDelta = [scale * diffX, scale * diffY];
	            nextVel = [scale * velX, scale * velY];
	            this._position[0] += nextDelta[0];
	            this._position[1] += nextDelta[1];
	        }
	
	        var payload = this._payload;
	        payload.delta    = nextDelta;
	        payload.velocity = nextVel;
	        payload.position = this._position;
	        payload.clientX  = data.x;
	        payload.clientY  = data.y;
	        payload.count    = data.count;
	        payload.touch    = data.identifier;
	
	        this._eventOutput.emit('update', payload);
	    }
	
	    /**
	     *  Triggered by trackend.
	     *  @method _handleEnd
	     *  @private
	     */
	    function _handleEnd(data) {
	        this._payload.count = data.count;
	        this._eventOutput.emit('end', this._payload);
	    }
	
	    /**
	     * Set internal options, overriding any default options
	     *
	     * @method setOptions
	     *
	     * @param [options] {Object}             default options overrides
	     * @param [options.direction] {Number}   read from a particular axis
	     * @param [options.rails] {Boolean}      read from axis with greatest differential
	     * @param [options.scale] {Number}       constant factor to scale velocity output
	     */
	    TouchSync.prototype.setOptions = function setOptions(options) {
	        return this._optionsManager.setOptions(options);
	    };
	
	    /**
	     * Return entire options dictionary, including defaults.
	     *
	     * @method getOptions
	     * @return {Object} configuration options
	     */
	    TouchSync.prototype.getOptions = function getOptions() {
	        return this.options;
	    };
	
	    module.exports = TouchSync;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: mark@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	    var EventHandler = __webpack_require__(37);
	    var Engine = __webpack_require__(17);
	    var OptionsManager = __webpack_require__(38);
	
	    /**
	     * Handles piped in mousewheel events.
	     *   Emits 'start', 'update', and 'end' events with payloads including:
	     *   delta: change since last position,
	     *   position: accumulated deltas,
	     *   velocity: speed of change in pixels per ms,
	     *   slip: true (unused).
	     *
	     *   Can be used as delegate of GenericSync.
	     *
	     * @class ScrollSync
	     * @constructor
	     * @param {Object} [options] overrides of default options
	     * @param {Number} [options.direction] Pay attention to x changes (ScrollSync.DIRECTION_X),
	     *   y changes (ScrollSync.DIRECTION_Y) or both (undefined)
	     * @param {Number} [options.minimumEndSpeed] End speed calculation floors at this number, in pixels per ms
	     * @param {boolean} [options.rails] whether to snap position calculations to nearest axis
	     * @param {Number | Array.Number} [options.scale] scale outputs in by scalar or pair of scalars
	     * @param {Number} [options.stallTime] reset time for velocity calculation in ms
	     */
	    function ScrollSync(options) {
	        this.options = Object.create(ScrollSync.DEFAULT_OPTIONS);
	        this._optionsManager = new OptionsManager(this.options);
	        if (options) this.setOptions(options);
	
	        this._payload = {
	            delta    : null,
	            position : null,
	            velocity : null,
	            slip     : true
	        };
	
	        this._eventInput = new EventHandler();
	        this._eventOutput = new EventHandler();
	
	        EventHandler.setInputHandler(this, this._eventInput);
	        EventHandler.setOutputHandler(this, this._eventOutput);
	
	        this._position = (this.options.direction === undefined) ? [0,0] : 0;
	        this._prevTime = undefined;
	        this._prevVel = undefined;
	        this._eventInput.on('mousewheel', _handleMove.bind(this));
	        this._eventInput.on('wheel', _handleMove.bind(this));
	        this._inProgress = false;
	        this._loopBound = false;
	    }
	
	    ScrollSync.DEFAULT_OPTIONS = {
	        direction: undefined,
	        minimumEndSpeed: Infinity,
	        rails: false,
	        scale: 1,
	        stallTime: 50,
	        lineHeight: 40,
	        preventDefault: true
	    };
	
	    ScrollSync.DIRECTION_X = 0;
	    ScrollSync.DIRECTION_Y = 1;
	
	    var MINIMUM_TICK_TIME = 8;
	
	    var _now = Date.now;
	
	    function _newFrame() {
	        if (this._inProgress && (_now() - this._prevTime) > this.options.stallTime) {
	            this._inProgress = false;
	
	            var finalVel = (Math.abs(this._prevVel) >= this.options.minimumEndSpeed)
	                ? this._prevVel
	                : 0;
	
	            var payload = this._payload;
	            payload.position = this._position;
	            payload.velocity = finalVel;
	            payload.slip = true;
	
	            this._eventOutput.emit('end', payload);
	        }
	    }
	
	    function _handleMove(event) {
	        if (this.options.preventDefault) event.preventDefault();
	
	        if (!this._inProgress) {
	            this._inProgress = true;
	            this._position = (this.options.direction === undefined) ? [0,0] : 0;
	            payload = this._payload;
	            payload.slip = true;
	            payload.position = this._position;
	            payload.clientX = event.clientX;
	            payload.clientY = event.clientY;
	            payload.offsetX = event.offsetX;
	            payload.offsetY = event.offsetY;
	            this._eventOutput.emit('start', payload);
	            if (!this._loopBound) {
	                Engine.on('prerender', _newFrame.bind(this));
	                this._loopBound = true;
	            }
	        }
	
	        var currTime = _now();
	        var prevTime = this._prevTime || currTime;
	
	        var diffX = (event.wheelDeltaX !== undefined) ? event.wheelDeltaX : -event.deltaX;
	        var diffY = (event.wheelDeltaY !== undefined) ? event.wheelDeltaY : -event.deltaY;
	
	        if (event.deltaMode === 1) { // units in lines, not pixels
	            diffX *= this.options.lineHeight;
	            diffY *= this.options.lineHeight;
	        }
	
	        if (this.options.rails) {
	            if (Math.abs(diffX) > Math.abs(diffY)) diffY = 0;
	            else diffX = 0;
	        }
	
	        var diffTime = Math.max(currTime - prevTime, MINIMUM_TICK_TIME); // minimum tick time
	
	        var velX = diffX / diffTime;
	        var velY = diffY / diffTime;
	
	        var scale = this.options.scale;
	        var nextVel;
	        var nextDelta;
	
	        if (this.options.direction === ScrollSync.DIRECTION_X) {
	            nextDelta = scale * diffX;
	            nextVel = scale * velX;
	            this._position += nextDelta;
	        }
	        else if (this.options.direction === ScrollSync.DIRECTION_Y) {
	            nextDelta = scale * diffY;
	            nextVel = scale * velY;
	            this._position += nextDelta;
	        }
	        else {
	            nextDelta = [scale * diffX, scale * diffY];
	            nextVel = [scale * velX, scale * velY];
	            this._position[0] += nextDelta[0];
	            this._position[1] += nextDelta[1];
	        }
	
	        var payload = this._payload;
	        payload.delta    = nextDelta;
	        payload.velocity = nextVel;
	        payload.position = this._position;
	        payload.slip     = true;
	
	        this._eventOutput.emit('update', payload);
	
	        this._prevTime = currTime;
	        this._prevVel = nextVel;
	    }
	
	    /**
	     * Return entire options dictionary, including defaults.
	     *
	     * @method getOptions
	     * @return {Object} configuration options
	     */
	    ScrollSync.prototype.getOptions = function getOptions() {
	        return this.options;
	    };
	
	    /**
	     * Set internal options, overriding any default options
	     *
	     * @method setOptions
	     *
	     * @param {Object} [options] overrides of default options
	     * @param {Number} [options.minimimEndSpeed] If final velocity smaller than this, round down to 0.
	     * @param {Number} [options.stallTime] ms of non-motion before 'end' emitted
	     * @param {Number} [options.rails] whether to constrain to nearest axis.
	     * @param {Number} [options.direction] ScrollSync.DIRECTION_X, DIRECTION_Y -
	     *    pay attention to one specific direction.
	     * @param {Number} [options.scale] constant factor to scale velocity output
	     */
	    ScrollSync.prototype.setOptions = function setOptions(options) {
	        return this._optionsManager.setOptions(options);
	    };
	
	    module.exports = ScrollSync;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: mark@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	    var ElementOutput = __webpack_require__(43);
	
	    /**
	     * A base class for viewable content and event
	     *   targets inside a Famo.us application, containing a renderable document
	     *   fragment. Like an HTML div, it can accept internal markup,
	     *   properties, classes, and handle events.
	     *
	     * @class Surface
	     * @constructor
	     *
	     * @param {Object} [options] default option overrides
	     * @param {Array.Number} [options.size] [width, height] in pixels
	     * @param {Array.string} [options.classes] CSS classes to set on target div
	     * @param {Array} [options.properties] string dictionary of HTML attributes to set on target div
	     * @param {string} [options.content] inner (HTML) content of surface
	     */
	    function Surface(options) {
	        ElementOutput.call(this);
	
	        this.options = {};
	
	        this.properties = {};
	        this.attributes = {};
	        this.content = '';
	        this.classList = [];
	        this.size = null;
	
	        this._classesDirty = true;
	        this._stylesDirty = true;
	        this._attributesDirty = true;
	        this._sizeDirty = true;
	        this._contentDirty = true;
	        this._trueSizeCheck = true;
	
	        this._dirtyClasses = [];
	
	        if (options) this.setOptions(options);
	
	        this._currentTarget = null;
	    }
	    Surface.prototype = Object.create(ElementOutput.prototype);
	    Surface.prototype.constructor = Surface;
	    Surface.prototype.elementType = 'div';
	    Surface.prototype.elementClass = 'famous-surface';
	
	    /**
	     * Set HTML attributes on this Surface. Note that this will cause
	     *    dirtying and thus re-rendering, even if values do not change.
	     *
	     * @method setAttributes
	    * @param {Object} attributes property dictionary of "key" => "value"
	     */
	    Surface.prototype.setAttributes = function setAttributes(attributes) {
	        for (var n in attributes) {
	            if (n === 'style') throw new Error('Cannot set styles via "setAttributes" as it will break Famo.us.  Use "setProperties" instead.');
	            this.attributes[n] = attributes[n];
	        }
	        this._attributesDirty = true;
	    };
	
	    /**
	     * Get HTML attributes on this Surface.
	     *
	     * @method getAttributes
	     *
	     * @return {Object} Dictionary of this Surface's attributes.
	     */
	    Surface.prototype.getAttributes = function getAttributes() {
	        return this.attributes;
	    };
	
	    /**
	     * Set CSS-style properties on this Surface. Note that this will cause
	     *    dirtying and thus re-rendering, even if values do not change.
	     *
	     * @method setProperties
	     * @chainable
	     * @param {Object} properties property dictionary of "key" => "value"
	     */
	    Surface.prototype.setProperties = function setProperties(properties) {
	        for (var n in properties) {
	            this.properties[n] = properties[n];
	        }
	        this._stylesDirty = true;
	        return this;
	    };
	
	    /**
	     * Get CSS-style properties on this Surface.
	     *
	     * @method getProperties
	     *
	     * @return {Object} Dictionary of this Surface's properties.
	     */
	    Surface.prototype.getProperties = function getProperties() {
	        return this.properties;
	    };
	
	    /**
	     * Add CSS-style class to the list of classes on this Surface. Note
	     *   this will map directly to the HTML property of the actual
	     *   corresponding rendered <div>.
	     *
	     * @method addClass
	     * @chainable
	     * @param {string} className name of class to add
	     */
	    Surface.prototype.addClass = function addClass(className) {
	        if (this.classList.indexOf(className) < 0) {
	            this.classList.push(className);
	            this._classesDirty = true;
	        }
	        return this;
	    };
	
	    /**
	     * Remove CSS-style class from the list of classes on this Surface.
	     *   Note this will map directly to the HTML property of the actual
	     *   corresponding rendered <div>.
	     *
	     * @method removeClass
	     * @chainable
	     * @param {string} className name of class to remove
	     */
	    Surface.prototype.removeClass = function removeClass(className) {
	        var i = this.classList.indexOf(className);
	        if (i >= 0) {
	            this._dirtyClasses.push(this.classList.splice(i, 1)[0]);
	            this._classesDirty = true;
	        }
	        return this;
	    };
	
	    /**
	     * Toggle CSS-style class from the list of classes on this Surface.
	     *   Note this will map directly to the HTML property of the actual
	     *   corresponding rendered <div>.
	     *
	     * @method toggleClass
	     * @param {string} className name of class to toggle
	     */
	    Surface.prototype.toggleClass = function toggleClass(className) {
	        var i = this.classList.indexOf(className);
	        if (i >= 0) {
	            this.removeClass(className);
	        } else {
	            this.addClass(className);
	        }
	        return this;
	    };
	
	    /**
	     * Reset class list to provided dictionary.
	     * @method setClasses
	     * @chainable
	     * @param {Array.string} classList
	     */
	    Surface.prototype.setClasses = function setClasses(classList) {
	        var i = 0;
	        var removal = [];
	        for (i = 0; i < this.classList.length; i++) {
	            if (classList.indexOf(this.classList[i]) < 0) removal.push(this.classList[i]);
	        }
	        for (i = 0; i < removal.length; i++) this.removeClass(removal[i]);
	        // duplicates are already checked by addClass()
	        for (i = 0; i < classList.length; i++) this.addClass(classList[i]);
	        return this;
	    };
	
	    /**
	     * Get array of CSS-style classes attached to this div.
	     *
	     * @method getClasslist
	     * @return {Array.string} array of class names
	     */
	    Surface.prototype.getClassList = function getClassList() {
	        return this.classList;
	    };
	
	    /**
	     * Set or overwrite inner (HTML) content of this surface. Note that this
	     *    causes a re-rendering if the content has changed.
	     *
	     * @method setContent
	     * @chainable
	     * @param {string|Document Fragment} content HTML content
	     */
	    Surface.prototype.setContent = function setContent(content) {
	        if (this.content !== content) {
	            this.content = content;
	            this._contentDirty = true;
	        }
	        return this;
	    };
	
	    /**
	     * Return inner (HTML) content of this surface.
	     *
	     * @method getContent
	     *
	     * @return {string} inner (HTML) content
	     */
	    Surface.prototype.getContent = function getContent() {
	        return this.content;
	    };
	
	    /**
	     * Set options for this surface
	     *
	     * @method setOptions
	     * @chainable
	     * @param {Object} [options] overrides for default options.  See constructor.
	     */
	    Surface.prototype.setOptions = function setOptions(options) {
	        if (options.size) this.setSize(options.size);
	        if (options.classes) this.setClasses(options.classes);
	        if (options.properties) this.setProperties(options.properties);
	        if (options.attributes) this.setAttributes(options.attributes);
	        if (options.content) this.setContent(options.content);
	        return this;
	    };
	
	    //  Apply to document all changes from removeClass() since last setup().
	    function _cleanupClasses(target) {
	        for (var i = 0; i < this._dirtyClasses.length; i++) target.classList.remove(this._dirtyClasses[i]);
	        this._dirtyClasses = [];
	    }
	
	    // Apply values of all Famous-managed styles to the document element.
	    //  These will be deployed to the document on call to #setup().
	    function _applyStyles(target) {
	        for (var n in this.properties) {
	            target.style[n] = this.properties[n];
	        }
	    }
	
	    // Clear all Famous-managed styles from the document element.
	    // These will be deployed to the document on call to #setup().
	    function _cleanupStyles(target) {
	        for (var n in this.properties) {
	            target.style[n] = '';
	        }
	    }
	
	    // Apply values of all Famous-managed attributes to the document element.
	    //  These will be deployed to the document on call to #setup().
	    function _applyAttributes(target) {
	        for (var n in this.attributes) {
	            target.setAttribute(n, this.attributes[n]);
	        }
	    }
	
	    // Clear all Famous-managed attributes from the document element.
	    // These will be deployed to the document on call to #setup().
	    function _cleanupAttributes(target) {
	        for (var n in this.attributes) {
	            target.removeAttribute(n);
	        }
	    }
	
	    function _xyNotEquals(a, b) {
	        return (a && b) ? (a[0] !== b[0] || a[1] !== b[1]) : a !== b;
	    }
	
	    /**
	     * One-time setup for an element to be ready for commits to document.
	     *
	     * @private
	     * @method setup
	     *
	     * @param {ElementAllocator} allocator document element pool for this context
	     */
	    Surface.prototype.setup = function setup(allocator) {
	        var target = allocator.allocate(this.elementType);
	        if (this.elementClass) {
	            if (this.elementClass instanceof Array) {
	                for (var i = 0; i < this.elementClass.length; i++) {
	                    target.classList.add(this.elementClass[i]);
	                }
	            }
	            else {
	                target.classList.add(this.elementClass);
	            }
	        }
	        target.style.display = '';
	        this.attach(target);
	        this._opacity = null;
	        this._currentTarget = target;
	        this._stylesDirty = true;
	        this._classesDirty = true;
	        this._attributesDirty = true;
	        this._sizeDirty = true;
	        this._contentDirty = true;
	        this._originDirty = true;
	        this._transformDirty = true;
	    };
	
	    /**
	     * Apply changes from this component to the corresponding document element.
	     * This includes changes to classes, styles, size, content, opacity, origin,
	     * and matrix transforms.
	     *
	     * @private
	     * @method commit
	     * @param {Context} context commit context
	     */
	    Surface.prototype.commit = function commit(context) {
	        if (!this._currentTarget) this.setup(context.allocator);
	        var target = this._currentTarget;
	        var size = context.size;
	
	        if (this._classesDirty) {
	            _cleanupClasses.call(this, target);
	            var classList = this.getClassList();
	            for (var i = 0; i < classList.length; i++) target.classList.add(classList[i]);
	            this._classesDirty = false;
	            this._trueSizeCheck = true;
	        }
	
	        if (this._stylesDirty) {
	            _applyStyles.call(this, target);
	            this._stylesDirty = false;
	            this._trueSizeCheck = true;
	        }
	
	        if (this._attributesDirty) {
	            _applyAttributes.call(this, target);
	            this._attributesDirty = false;
	            this._trueSizeCheck = true;
	        }
	
	        if (this.size) {
	            var origSize = context.size;
	            size = [this.size[0], this.size[1]];
	            if (size[0] === undefined) size[0] = origSize[0];
	            if (size[1] === undefined) size[1] = origSize[1];
	            if (size[0] === true || size[1] === true) {
	                if (size[0] === true && (this._trueSizeCheck || this._size[0] === 0)) {
	                    var width = target.offsetWidth;
	                    if (this._size && this._size[0] !== width) {
	                        this._size[0] = width;
	                        this._sizeDirty = true;
	                    }
	                    size[0] = width;
	                } else {
	                    if (this._size) size[0] = this._size[0];
	                }
	                if (size[1] === true && (this._trueSizeCheck || this._size[1] === 0)) {
	                    var height = target.offsetHeight;
	                    if (this._size && this._size[1] !== height) {
	                        this._size[1] = height;
	                        this._sizeDirty = true;
	                    }
	                    size[1] = height;
	                } else {
	                    if (this._size) size[1] = this._size[1];
	                }
	                this._trueSizeCheck = false;
	            }
	        }
	
	        if (_xyNotEquals(this._size, size)) {
	            if (!this._size) this._size = [0, 0];
	            this._size[0] = size[0];
	            this._size[1] = size[1];
	
	            this._sizeDirty = true;
	        }
	
	        if (this._sizeDirty) {
	            if (this._size) {
	                target.style.width = (this.size && this.size[0] === true) ? '' : this._size[0] + 'px';
	                target.style.height = (this.size && this.size[1] === true) ?  '' : this._size[1] + 'px';
	            }
	
	            this._eventOutput.emit('resize');
	        }
	
	        if (this._contentDirty) {
	            this.deploy(target);
	            this._eventOutput.emit('deploy');
	            this._contentDirty = false;
	            this._trueSizeCheck = true;
	        }
	
	        ElementOutput.prototype.commit.call(this, context);
	    };
	
	    /**
	     *  Remove all Famous-relevant attributes from a document element.
	     *    This is called by SurfaceManager's detach().
	     *    This is in some sense the reverse of .deploy().
	     *
	     * @private
	     * @method cleanup
	     * @param {ElementAllocator} allocator
	     */
	    Surface.prototype.cleanup = function cleanup(allocator) {
	        var i = 0;
	        var target = this._currentTarget;
	        this._eventOutput.emit('recall');
	        this.recall(target);
	        target.style.display = 'none';
	        target.style.opacity = '';
	        target.style.width = '';
	        target.style.height = '';
	        _cleanupStyles.call(this, target);
	        _cleanupAttributes.call(this, target);
	        var classList = this.getClassList();
	        _cleanupClasses.call(this, target);
	        for (i = 0; i < classList.length; i++) target.classList.remove(classList[i]);
	        if (this.elementClass) {
	            if (this.elementClass instanceof Array) {
	                for (i = 0; i < this.elementClass.length; i++) {
	                    target.classList.remove(this.elementClass[i]);
	                }
	            }
	            else {
	                target.classList.remove(this.elementClass);
	            }
	        }
	        this.detach(target);
	        this._currentTarget = null;
	        allocator.deallocate(target);
	    };
	
	    /**
	     * Place the document element that this component manages into the document.
	     *
	     * @private
	     * @method deploy
	     * @param {Node} target document parent of this container
	     */
	    Surface.prototype.deploy = function deploy(target) {
	        var content = this.getContent();
	        if (content instanceof Node) {
	            while (target.hasChildNodes()) target.removeChild(target.firstChild);
	            target.appendChild(content);
	        }
	        else target.innerHTML = content;
	    };
	
	    /**
	     * Remove any contained document content associated with this surface
	     *   from the actual document.
	     *
	     * @private
	     * @method recall
	     */
	    Surface.prototype.recall = function recall(target) {
	        var df = document.createDocumentFragment();
	        while (target.hasChildNodes()) df.appendChild(target.firstChild);
	        this.setContent(df);
	    };
	
	    /**
	     *  Get the x and y dimensions of the surface.
	     *
	     * @method getSize
	     * @return {Array.Number} [x,y] size of surface
	     */
	    Surface.prototype.getSize = function getSize() {
	        return this._size ? this._size : this.size;
	    };
	
	    /**
	     * Set x and y dimensions of the surface.
	     *
	     * @method setSize
	     * @chainable
	     * @param {Array.Number} size as [width, height]
	     */
	    Surface.prototype.setSize = function setSize(size) {
	        this.size = size ? [size[0], size[1]] : null;
	        this._sizeDirty = true;
	        return this;
	    };
	
	    module.exports = Surface;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;
	/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: mark@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	    var Surface = __webpack_require__(28);
	
	    /**
	     * A surface containing image content.
	     *   This extends the Surface class.
	     *
	     * @class ImageSurface
	     *
	     * @extends Surface
	     * @constructor
	     * @param {Object} [options] overrides of default options
	     */
	    function ImageSurface(options) {
	        this._imageUrl = undefined;
	        Surface.apply(this, arguments);
	    }
	
	    var urlCache = [];
	    var countCache = [];
	    var nodeCache = [];
	    var cacheEnabled = true;
	
	    ImageSurface.enableCache = function enableCache() {
	        cacheEnabled = true;
	    };
	
	    ImageSurface.disableCache = function disableCache() {
	        cacheEnabled = false;
	    };
	
	    ImageSurface.clearCache = function clearCache() {
	        urlCache = [];
	        countCache = [];
	        nodeCache = [];
	    };
	
	    ImageSurface.getCache = function getCache() {
	        return {
	            urlCache: urlCache,
	            countCache: countCache,
	            nodeCache: countCache
	        };
	    };
	
	    ImageSurface.prototype = Object.create(Surface.prototype);
	    ImageSurface.prototype.constructor = ImageSurface;
	    ImageSurface.prototype.elementType = 'img';
	    ImageSurface.prototype.elementClass = 'famous-surface';
	
	    /**
	     * Set content URL.  This will cause a re-rendering.
	     * @method setContent
	     * @param {string} imageUrl
	     */
	    ImageSurface.prototype.setContent = function setContent(imageUrl) {
	        var urlIndex = urlCache.indexOf(this._imageUrl);
	        if (urlIndex !== -1) {
	            if (countCache[urlIndex] === 1) {
	                urlCache.splice(urlIndex, 1);
	                countCache.splice(urlIndex, 1);
	                nodeCache.splice(urlIndex, 1);
	            } else {
	                countCache[urlIndex]--;
	            }
	        }
	
	        urlIndex = urlCache.indexOf(imageUrl);
	        if (urlIndex === -1) {
	            urlCache.push(imageUrl);
	            countCache.push(1);
	        }
	        else {
	            countCache[urlIndex]++;
	        }
	
	        this._imageUrl = imageUrl;
	        this._contentDirty = true;
	    };
	
	    /**
	     * Place the document element that this component manages into the document.
	     *
	     * @private
	     * @method deploy
	     * @param {Node} target document parent of this container
	     */
	    ImageSurface.prototype.deploy = function deploy(target) {
	        var urlIndex = urlCache.indexOf(this._imageUrl);
	        if (nodeCache[urlIndex] === undefined && cacheEnabled) {
	            var img = new Image();
	            img.src = this._imageUrl || '';
	            nodeCache[urlIndex] = img;
	        }
	
	        target.src = this._imageUrl || '';
	    };
	
	    /**
	     * Remove this component and contained content from the document
	     *
	     * @private
	     * @method recall
	     *
	     * @param {Node} target node to which the component was deployed
	     */
	    ImageSurface.prototype.recall = function recall(target) {
	        target.src = '';
	    };
	
	    module.exports = ImageSurface;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: mark@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	    var EventHandler = __webpack_require__(37);
	    var OptionsManager = __webpack_require__(38);
	    var RenderNode = __webpack_require__(41);
	    var Utility = __webpack_require__(21);
	
	    /**
	     * Useful for quickly creating elements within applications
	     *   with large event systems.  Consists of a RenderNode paired with
	     *   an input EventHandler and an output EventHandler.
	     *   Meant to be extended by the developer.
	     *
	     * @class View
	     * @uses EventHandler
	     * @uses OptionsManager
	     * @uses RenderNode
	     * @constructor
	     */
	    function View(options) {
	        this._node = new RenderNode();
	
	        this._eventInput = new EventHandler();
	        this._eventOutput = new EventHandler();
	        EventHandler.setInputHandler(this, this._eventInput);
	        EventHandler.setOutputHandler(this, this._eventOutput);
	
	        this.options = Utility.clone(this.constructor.DEFAULT_OPTIONS || View.DEFAULT_OPTIONS);
	        this._optionsManager = new OptionsManager(this.options);
	
	        if (options) this.setOptions(options);
	    }
	
	    View.DEFAULT_OPTIONS = {}; // no defaults
	
	    /**
	     * Look up options value by key
	     * @method getOptions
	     *
	     * @param {string} key key
	     * @return {Object} associated object
	     */
	    View.prototype.getOptions = function getOptions(key) {
	        return this._optionsManager.getOptions(key);
	    };
	
	    /*
	     *  Set internal options.
	     *  No defaults options are set in View.
	     *
	     *  @method setOptions
	     *  @param {Object} options
	     */
	    View.prototype.setOptions = function setOptions(options) {
	        this._optionsManager.patch(options);
	    };
	
	    /**
	     * Add a child renderable to the view.
	     *   Note: This is meant to be used by an inheriting class
	     *   rather than from outside the prototype chain.
	     *
	     * @method add
	     * @return {RenderNode}
	     * @protected
	     */
	    View.prototype.add = function add() {
	        return this._node.add.apply(this._node, arguments);
	    };
	
	    /**
	     * Alias for add
	     * @method _add
	     */
	    View.prototype._add = View.prototype.add;
	
	    /**
	     * Generate a render spec from the contents of this component.
	     *
	     * @private
	     * @method render
	     * @return {number} Render spec for this component
	     */
	    View.prototype.render = function render() {
	        return this._node.render();
	    };
	
	    /**
	     * Return size of contained element.
	     *
	     * @method getSize
	     * @return {Array.Number} [width, height]
	     */
	    View.prototype.getSize = function getSize() {
	        if (this._node && this._node.getSize) {
	            return this._node.getSize.apply(this._node, arguments) || this.options.size;
	        }
	        else return this.options.size;
	    };
	
	    module.exports = View;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: mark@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	    var Modifier = __webpack_require__(19);
	    var Transform = __webpack_require__(18);
	    var Transitionable = __webpack_require__(39);
	    var TransitionableTransform = __webpack_require__(40);
	
	    /**
	     *  A collection of visual changes to be
	     *    applied to another renderable component, strongly coupled with the state that defines
	     *    those changes. This collection includes a
	     *    transform matrix, an opacity constant, a size, an origin specifier, and an alignment specifier.
	     *    StateModifier objects can be added to any RenderNode or object
	     *    capable of displaying renderables.  The StateModifier's children and descendants
	     *    are transformed by the amounts specified in the modifier's properties.
	     *
	     * @class StateModifier
	     * @constructor
	     * @param {Object} [options] overrides of default options
	     * @param {Transform} [options.transform] affine transformation matrix
	     * @param {Number} [options.opacity]
	     * @param {Array.Number} [options.origin] origin adjustment
	     * @param {Array.Number} [options.align] align adjustment
	     * @param {Array.Number} [options.size] size to apply to descendants
	     * @param {Array.Number} [options.propportions] proportions to apply to descendants
	     */
	    function StateModifier(options) {
	        this._transformState = new TransitionableTransform(Transform.identity);
	        this._opacityState = new Transitionable(1);
	        this._originState = new Transitionable([0, 0]);
	        this._alignState = new Transitionable([0, 0]);
	        this._sizeState = new Transitionable([0, 0]);
	        this._proportionsState = new Transitionable([0, 0]);
	
	        this._modifier = new Modifier({
	            transform: this._transformState,
	            opacity: this._opacityState,
	            origin: null,
	            align: null,
	            size: null,
	            proportions: null
	        });
	
	        this._hasOrigin = false;
	        this._hasAlign = false;
	        this._hasSize = false;
	        this._hasProportions = false;
	
	        if (options) {
	            if (options.transform) this.setTransform(options.transform);
	            if (options.opacity !== undefined) this.setOpacity(options.opacity);
	            if (options.origin) this.setOrigin(options.origin);
	            if (options.align) this.setAlign(options.align);
	            if (options.size) this.setSize(options.size);
	            if (options.proportions) this.setProportions(options.proportions);
	        }
	    }
	
	    /**
	     * Set the transform matrix of this modifier, either statically or
	     *   through a provided Transitionable.
	     *
	     * @method setTransform
	     *
	     * @param {Transform} transform Transform to transition to.
	     * @param {Transitionable} transition object of type {duration: number, curve:
	     *    f[0,1] -> [0,1] or name}. If transition is omitted, change will be
	     *    instantaneous.
	     * @param {Function} [callback] callback to call after transition completes
	     * @return {StateModifier} this
	     */
	    StateModifier.prototype.setTransform = function setTransform(transform, transition, callback) {
	        this._transformState.set(transform, transition, callback);
	        return this;
	    };
	
	    /**
	     * Set the opacity of this modifier, either statically or
	     *   through a provided Transitionable.
	     *
	     * @method setOpacity
	     *
	     * @param {Number} opacity Opacity value to transition to.
	     * @param {Transitionable} transition object of type {duration: number, curve:
	     *    f[0,1] -> [0,1] or name}. If transition is omitted, change will be
	     *    instantaneous.
	     * @param {Function} callback callback to call after transition completes
	     * @return {StateModifier} this
	     */
	    StateModifier.prototype.setOpacity = function setOpacity(opacity, transition, callback) {
	        this._opacityState.set(opacity, transition, callback);
	        return this;
	    };
	
	    /**
	     * Set the origin of this modifier, either statically or
	     *   through a provided Transitionable.
	     *
	     * @method setOrigin
	     *
	     * @param {Array.Number} origin two element array with values between 0 and 1.
	     * @param {Transitionable} transition object of type {duration: number, curve:
	     *    f[0,1] -> [0,1] or name}. If transition is omitted, change will be
	     *    instantaneous.
	     * @param {Function} callback callback to call after transition completes
	     * @return {StateModifier} this
	     */
	    StateModifier.prototype.setOrigin = function setOrigin(origin, transition, callback) {
	        if (origin === null) {
	            if (this._hasOrigin) {
	                this._modifier.originFrom(null);
	                this._hasOrigin = false;
	            }
	            return this;
	        }
	        else if (!this._hasOrigin) {
	            this._hasOrigin = true;
	            this._modifier.originFrom(this._originState);
	        }
	        this._originState.set(origin, transition, callback);
	        return this;
	    };
	
	    /**
	     * Set the alignment of this modifier, either statically or
	     *   through a provided Transitionable.
	     *
	     * @method setAlign
	     *
	     * @param {Array.Number} align two element array with values between 0 and 1.
	     * @param {Transitionable} transition object of type {duration: number, curve:
	     *    f[0,1] -> [0,1] or name}. If transition is omitted, change will be
	     *    instantaneous.
	     * @param {Function} callback callback to call after transition completes
	     * @return {StateModifier} this
	     */
	    StateModifier.prototype.setAlign = function setOrigin(align, transition, callback) {
	        if (align === null) {
	            if (this._hasAlign) {
	                this._modifier.alignFrom(null);
	                this._hasAlign = false;
	            }
	            return this;
	        }
	        else if (!this._hasAlign) {
	            this._hasAlign = true;
	            this._modifier.alignFrom(this._alignState);
	        }
	        this._alignState.set(align, transition, callback);
	        return this;
	    };
	
	    /**
	     * Set the size of this modifier, either statically or
	     *   through a provided Transitionable.
	     *
	     * @method setSize
	     *
	     * @param {Array.Number} size two element array of [width, height]
	     * @param {Transitionable} transition object of type {duration: number, curve:
	     *    f[0,1] -> [0,1] or name}. If transition is omitted, change will be
	     *    instantaneous.
	     * @param {Function} callback callback to call after transition completes
	     * @return {StateModifier} this
	     */
	    StateModifier.prototype.setSize = function setSize(size, transition, callback) {
	        if (size === null) {
	            if (this._hasSize) {
	                this._modifier.sizeFrom(null);
	                this._hasSize = false;
	            }
	            return this;
	        }
	        else if (!this._hasSize) {
	            this._hasSize = true;
	            this._modifier.sizeFrom(this._sizeState);
	        }
	        this._sizeState.set(size, transition, callback);
	        return this;
	    };
	
	    /**
	     * Set the proportions of this modifier, either statically or
	     *   through a provided Transitionable.
	     *
	     * @method setProportions
	     *
	     * @param {Array.Number} proportions two element array with values between 0 and 1.
	     * @param {Transitionable} transition Valid transitionable object
	     * @param {Function} callback callback to call after transition completes
	     * @return {StateModifier} this
	     */
	    StateModifier.prototype.setProportions = function setSize(proportions, transition, callback) {
	        if (proportions === null) {
	            if (this._hasProportions) {
	                this._modifier.proportionsFrom(null);
	                this._hasProportions = false;
	            }
	            return this;
	        }
	        else if (!this._hasProportions) {
	            this._hasProportions = true;
	            this._modifier.proportionsFrom(this._proportionsState);
	        }
	        this._proportionsState.set(proportions, transition, callback);
	        return this;
	    };
	
	    /**
	     * Stop the transition.
	     *
	     * @method halt
	     */
	    StateModifier.prototype.halt = function halt() {
	        this._transformState.halt();
	        this._opacityState.halt();
	        this._originState.halt();
	        this._alignState.halt();
	        this._sizeState.halt();
	        this._proportionsState.halt();
	    };
	
	    /**
	     * Get the current state of the transform matrix component.
	     *
	     * @method getTransform
	     * @return {Object} transform provider object
	     */
	    StateModifier.prototype.getTransform = function getTransform() {
	        return this._transformState.get();
	    };
	
	    /**
	     * Get the destination state of the transform component.
	     *
	     * @method getFinalTransform
	     * @return {Transform} transform matrix
	     */
	    StateModifier.prototype.getFinalTransform = function getFinalTransform() {
	        return this._transformState.getFinal();
	    };
	
	    /**
	     * Get the current state of the opacity component.
	     *
	     * @method getOpacity
	     * @return {Object} opacity provider object
	     */
	    StateModifier.prototype.getOpacity = function getOpacity() {
	        return this._opacityState.get();
	    };
	
	    /**
	     * Get the current state of the origin component.
	     *
	     * @method getOrigin
	     * @return {Object} origin provider object
	     */
	    StateModifier.prototype.getOrigin = function getOrigin() {
	        return this._hasOrigin ? this._originState.get() : null;
	    };
	
	    /**
	     * Get the current state of the align component.
	     *
	     * @method getAlign
	     * @return {Object} align provider object
	     */
	    StateModifier.prototype.getAlign = function getAlign() {
	        return this._hasAlign ? this._alignState.get() : null;
	    };
	
	    /**
	     * Get the current state of the size component.
	     *
	     * @method getSize
	     * @return {Object} size provider object
	     */
	    StateModifier.prototype.getSize = function getSize() {
	        return this._hasSize ? this._sizeState.get() : null;
	    };
	
	    /**
	     * Get the current state of the propportions component.
	     *
	     * @method getProportions
	     * @return {Object} size provider object
	     */
	    StateModifier.prototype.getProportions = function getProportions() {
	        return this._hasProportions ? this._proportionsState.get() : null;
	    };
	
	    /**
	     * Return render spec for this StateModifier, applying to the provided
	     *    target component.  This is similar to render() for Surfaces.
	     *
	     * @private
	     * @method modify
	     *
	     * @param {Object} target (already rendered) render spec to
	     *    which to apply the transform.
	     * @return {Object} render spec for this StateModifier, including the
	     *    provided target
	     */
	    StateModifier.prototype.modify = function modify(target) {
	        return this._modifier.modify(target);
	    };
	
	    module.exports = StateModifier;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: david@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	
	    /**
	     * A library of curves which map an animation explicitly as a function of time.
	     *
	     * @class Easing
	     */
	    var Easing = {
	
	        /**
	         * @property inQuad
	         * @static
	         */
	        inQuad: function(t) {
	            return t*t;
	        },
	
	        /**
	         * @property outQuad
	         * @static
	         */
	        outQuad: function(t) {
	            return -(t-=1)*t+1;
	        },
	
	        /**
	         * @property inOutQuad
	         * @static
	         */
	        inOutQuad: function(t) {
	            if ((t/=.5) < 1) return .5*t*t;
	            return -.5*((--t)*(t-2) - 1);
	        },
	
	        /**
	         * @property inCubic
	         * @static
	         */
	        inCubic: function(t) {
	            return t*t*t;
	        },
	
	        /**
	         * @property outCubic
	         * @static
	         */
	        outCubic: function(t) {
	            return ((--t)*t*t + 1);
	        },
	
	        /**
	         * @property inOutCubic
	         * @static
	         */
	        inOutCubic: function(t) {
	            if ((t/=.5) < 1) return .5*t*t*t;
	            return .5*((t-=2)*t*t + 2);
	        },
	
	        /**
	         * @property inQuart
	         * @static
	         */
	        inQuart: function(t) {
	            return t*t*t*t;
	        },
	
	        /**
	         * @property outQuart
	         * @static
	         */
	        outQuart: function(t) {
	            return -((--t)*t*t*t - 1);
	        },
	
	        /**
	         * @property inOutQuart
	         * @static
	         */
	        inOutQuart: function(t) {
	            if ((t/=.5) < 1) return .5*t*t*t*t;
	            return -.5 * ((t-=2)*t*t*t - 2);
	        },
	
	        /**
	         * @property inQuint
	         * @static
	         */
	        inQuint: function(t) {
	            return t*t*t*t*t;
	        },
	
	        /**
	         * @property outQuint
	         * @static
	         */
	        outQuint: function(t) {
	            return ((--t)*t*t*t*t + 1);
	        },
	
	        /**
	         * @property inOutQuint
	         * @static
	         */
	        inOutQuint: function(t) {
	            if ((t/=.5) < 1) return .5*t*t*t*t*t;
	            return .5*((t-=2)*t*t*t*t + 2);
	        },
	
	        /**
	         * @property inSine
	         * @static
	         */
	        inSine: function(t) {
	            return -1.0*Math.cos(t * (Math.PI/2)) + 1.0;
	        },
	
	        /**
	         * @property outSine
	         * @static
	         */
	        outSine: function(t) {
	            return Math.sin(t * (Math.PI/2));
	        },
	
	        /**
	         * @property inOutSine
	         * @static
	         */
	        inOutSine: function(t) {
	            return -.5*(Math.cos(Math.PI*t) - 1);
	        },
	
	        /**
	         * @property inExpo
	         * @static
	         */
	        inExpo: function(t) {
	            return (t===0) ? 0.0 : Math.pow(2, 10 * (t - 1));
	        },
	
	        /**
	         * @property outExpo
	         * @static
	         */
	        outExpo: function(t) {
	            return (t===1.0) ? 1.0 : (-Math.pow(2, -10 * t) + 1);
	        },
	
	        /**
	         * @property inOutExpo
	         * @static
	         */
	        inOutExpo: function(t) {
	            if (t===0) return 0.0;
	            if (t===1.0) return 1.0;
	            if ((t/=.5) < 1) return .5 * Math.pow(2, 10 * (t - 1));
	            return .5 * (-Math.pow(2, -10 * --t) + 2);
	        },
	
	        /**
	         * @property inCirc
	         * @static
	         */
	        inCirc: function(t) {
	            return -(Math.sqrt(1 - t*t) - 1);
	        },
	
	        /**
	         * @property outCirc
	         * @static
	         */
	        outCirc: function(t) {
	            return Math.sqrt(1 - (--t)*t);
	        },
	
	        /**
	         * @property inOutCirc
	         * @static
	         */
	        inOutCirc: function(t) {
	            if ((t/=.5) < 1) return -.5 * (Math.sqrt(1 - t*t) - 1);
	            return .5 * (Math.sqrt(1 - (t-=2)*t) + 1);
	        },
	
	        /**
	         * @property inElastic
	         * @static
	         */
	        inElastic: function(t) {
	            var s=1.70158;var p=0;var a=1.0;
	            if (t===0) return 0.0;  if (t===1) return 1.0;  if (!p) p=.3;
	            s = p/(2*Math.PI) * Math.asin(1.0/a);
	            return -(a*Math.pow(2,10*(t-=1)) * Math.sin((t-s)*(2*Math.PI)/ p));
	        },
	
	        /**
	         * @property outElastic
	         * @static
	         */
	        outElastic: function(t) {
	            var s=1.70158;var p=0;var a=1.0;
	            if (t===0) return 0.0;  if (t===1) return 1.0;  if (!p) p=.3;
	            s = p/(2*Math.PI) * Math.asin(1.0/a);
	            return a*Math.pow(2,-10*t) * Math.sin((t-s)*(2*Math.PI)/p) + 1.0;
	        },
	
	        /**
	         * @property inOutElastic
	         * @static
	         */
	        inOutElastic: function(t) {
	            var s=1.70158;var p=0;var a=1.0;
	            if (t===0) return 0.0;  if ((t/=.5)===2) return 1.0;  if (!p) p=(.3*1.5);
	            s = p/(2*Math.PI) * Math.asin(1.0/a);
	            if (t < 1) return -.5*(a*Math.pow(2,10*(t-=1)) * Math.sin((t-s)*(2*Math.PI)/p));
	            return a*Math.pow(2,-10*(t-=1)) * Math.sin((t-s)*(2*Math.PI)/p)*.5 + 1.0;
	        },
	
	        /**
	         * @property inBack
	         * @static
	         */
	        inBack: function(t, s) {
	            if (s === undefined) s = 1.70158;
	            return t*t*((s+1)*t - s);
	        },
	
	        /**
	         * @property outBack
	         * @static
	         */
	        outBack: function(t, s) {
	            if (s === undefined) s = 1.70158;
	            return ((--t)*t*((s+1)*t + s) + 1);
	        },
	
	        /**
	         * @property inOutBack
	         * @static
	         */
	        inOutBack: function(t, s) {
	            if (s === undefined) s = 1.70158;
	            if ((t/=.5) < 1) return .5*(t*t*(((s*=(1.525))+1)*t - s));
	            return .5*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2);
	        },
	
	        /**
	         * @property inBounce
	         * @static
	         */
	        inBounce: function(t) {
	            return 1.0 - Easing.outBounce(1.0-t);
	        },
	
	        /**
	         * @property outBounce
	         * @static
	         */
	        outBounce: function(t) {
	            if (t < (1/2.75)) {
	                return (7.5625*t*t);
	            } else if (t < (2/2.75)) {
	                return (7.5625*(t-=(1.5/2.75))*t + .75);
	            } else if (t < (2.5/2.75)) {
	                return (7.5625*(t-=(2.25/2.75))*t + .9375);
	            } else {
	                return (7.5625*(t-=(2.625/2.75))*t + .984375);
	            }
	        },
	
	        /**
	         * @property inOutBounce
	         * @static
	         */
	        inOutBounce: function(t) {
	            if (t < .5) return Easing.inBounce(t*2) * .5;
	            return Easing.outBounce(t*2-1.0) * .5 + .5;
	        }
	    };
	
	    module.exports = Easing;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * module deps
	 */
	
	var SequentialLayout = __webpack_require__(44);
	var Transitionable = __webpack_require__(39);
	var OptionsManager = __webpack_require__(38);
	var Transform = __webpack_require__(18);
	var Utility = __webpack_require__(21);
	
	/*!
	 * private
	 */
	
	function _getState(returnFinal) {
	  if (returnFinal) return this._isOpen ? 1 : 0;
	  else return this.state.get();
	}
	
	function _setState(pos, transition, callback) {
	  this.state.halt();
	  this.state.set(pos, transition, callback);
	}
	
	/**
	 * List Constructor
	 */
	
	function List() {
	  SequentialLayout.apply(this, arguments);
	  this.state = new Transitionable(0);
	  this._isOpen = false;
	
	  this.setOutputFunction(function(input, offset) {
	    var state = _getState.call(this),
	        transform = this.options.direction === Utility.Direction.Y
	          ? Transform.translate(0, state * offset)
	          : Transform.translate(state * offset, 0);
	
	    return {
	        opacity: state < 0.5 ? 0: state,
	        transform: transform,
	        size: input.getSize(),
	        target: input.render()
	    };
	  });
	}
	
	/*!
	 * extend SequentialLayout
	 */
	
	List.prototype = Object.create(SequentialLayout.prototype);
	List.prototype.constructor = List;
	
	/*!
	 * defaults
	 */
	
	List.DEFAULT_OPTIONS = OptionsManager.patch(SequentialLayout.DEFAULT_OPTIONS, {
	  direction: Utility.Direction.Y,
	  transition: {
	    curve: 'easeInOut',
	    duration: 500
	  }
	});
	
	
	/**
	 * open list
	 */
	
	List.prototype.open = function(callback) {
	    this._isOpen = true;
	   _setState.call(this, 1, this.options.transition, callback);
	};
	
	/**
	 * for list
	 */
	
	List.prototype.forEach = function(callback) {
	  this._items._.array.forEach(callback);
	};
	
	/**
	 * close list
	 */
	
	List.prototype.close = function(callback) {
	    this._isOpen = false;
	   _setState.call(this, 0, this.options.transition, callback);
	};
	
	/*!
	 * module exports
	 */
	
	module.exports = List;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * module deps
	 */
	
	var Surface = __webpack_require__(28),
	    Easing = __webpack_require__(32),
	    ContainerSurface = __webpack_require__(22),
	    Modifier = __webpack_require__(19),
	    StateModifier = __webpack_require__(31),
	    Transitionable = __webpack_require__(39),
	    Transform = __webpack_require__(18),
	    View = __webpack_require__(30);
	
	/*!
	 * globals
	 */
	
	var toRadian = Math.PI/180;
	
	/**
	 * create view layout
	 */
	
	function _createLayout(){
	
	  /*!
	   * container
	   */
	
	  this.container = {};
	  this.container.surface = new ContainerSurface(this.options.container);
	  this.container.modifier = new StateModifier();
	
	  /*!
	   * number
	   */
	
	  this.number = {};
	  this.number.surface = new Surface({
	    content: this.options.number.content,
	    size: [true, true],
	    classes: ['stat-number'],
	  });
	
	  this.number.countModifier = new Modifier();
	  this.number.modifier = new StateModifier({
	    transform: this.options.number.transform
	  });
	
	  /*!
	   * sign
	   */
	
	  if (this.options.sign) {
	    this.sign = {};
	    this.sign.surface = new Surface({
	      content: this.options.sign.content,
	      size: [true, true],
	      classes: ['stat-sign']
	    });
	    this.sign.modifier = new StateModifier({
	      transform: this.options.sign.transform
	    });
	  }
	
	  /*!
	   * ticker
	   */
	
	  if (this.options.ticker) {
	    this.ticker = {};
	    this.ticker.surface = new Surface({
	      size: this.options.ticker.size,
	      classes: ['ticker', 'ticker--yellow'],
	      properties: {
	        zIndex: -1
	      }
	    });
	
	    this.ticker.tickerModifier = new StateModifier({
	      transform: Transform.skew(0, -39 * toRadian, 0)
	    });
	
	    this.ticker.modifier = new StateModifier({
	      transform: this.options.ticker.transform
	    });
	  }
	
	  /*!
	   * label
	   */
	
	  this.label = {};
	  this.label.surface = new Surface({
	    size: this.options.label.size,
	    content: this.options.label.content,
	    classes: ['stat-label']
	  });
	
	  this.label.modifier = new StateModifier({
	    transform: this.options.label.transform
	  });
	
	  this
	    .add(this.container.modifier)
	    .add(this.container.surface);
	
	  this.container.surface
	    .add(this.number.countModifier)
	    .add(this.number.modifier)
	    .add(this.number.surface);
	
	  if (this.sign) {
	    this.container.surface
	      .add(this.sign.modifier)
	      .add(this.sign.surface);
	  }
	
	  if (this.ticker) {
	    this.container.surface
	      .add(this.ticker.modifier)
	      .add(this.ticker.tickerModifier)
	      .add(this.ticker.surface);
	  }
	
	  this.container.surface
	    .add(this.label.modifier)
	    .add(this.label.surface);
	}
	
	/**
	 * Stat Constructor
	 */
	
	function Stat() {
	  View.apply(this, arguments);
	  _createLayout.call(this);
	  // this.bump();
	  // this.count();
	}
	
	/*!
	 * extend View
	 */
	
	Stat.prototype = Object.create(View.prototype);
	Stat.prototype.constructor = Stat;
	
	/**
	 * animate number
	 */
	
	Stat.prototype.bump = function() {
	  this.number.modifier
	    .setTransform(Transform.scale(1.1), this.options.bumpTransition)
	    .setTransform(Transform.scale(1), this.options.countTransition
	  );
	};
	
	/**
	 * animate number
	 */
	
	Stat.prototype.count = function() {
	  var transitionable = new Transitionable(0);
	  transitionable.set(+this.options.number.content, this.options.countTransition);
	
	  this.number.countModifier.transformFrom(function() {
	    this.number.surface.setContent(Math.floor(transitionable.get()));
	  }.bind(this));
	};
	
	Stat.prototype.getSize = function getSize() {
	  return this.label.surface.getSize();
	};
	
	
	/**
	 * animate ticker
	 */
	
	Stat.prototype.tick = function() {
	  // this.number.modifier
	  //   .setTransform(Transform.scale(1.1), this.options.bumpTransition)
	  //   .setTransform(Transform.scale(1), this.options.countTransition
	  // );
	};
	
	/*!
	 * defaults
	 */
	
	Stat.DEFAULT_OPTIONS = {
	  countTransition: {
	    curve: 'easeInOut',
	    duration: 1000
	  },
	  bumpTransition: {
	    curve: 'easeOutBounce',
	    duration: 300
	  }
	};
	
	/*!
	 * module exports
	 */
	
	module.exports = Stat;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = function() {
		var list = [];
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
		return list;
	}

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: mark@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	    var RenderNode = __webpack_require__(41);
	    var EventHandler = __webpack_require__(37);
	    var ElementAllocator = __webpack_require__(45);
	    var Transform = __webpack_require__(18);
	    var Transitionable = __webpack_require__(39);
	
	    var _zeroZero = [0, 0];
	    var usePrefix = !('perspective' in document.documentElement.style);
	
	    function _getElementSize(element) {
	        return [element.clientWidth, element.clientHeight];
	    }
	
	    var _setPerspective = usePrefix ? function(element, perspective) {
	        element.style.webkitPerspective = perspective ? perspective.toFixed() + 'px' : '';
	    } : function(element, perspective) {
	        element.style.perspective = perspective ? perspective.toFixed() + 'px' : '';
	    };
	
	    /**
	     * The top-level container for a Famous-renderable piece of the document.
	     *   It is directly updated by the process-wide Engine object, and manages one
	     *   render tree root, which can contain other renderables.
	     *
	     * @class Context
	     * @constructor
	     * @private
	     * @param {Node} container Element in which content will be inserted
	     */
	    function Context(container) {
	        this.container = container;
	        this._allocator = new ElementAllocator(container);
	
	        this._node = new RenderNode();
	        this._eventOutput = new EventHandler();
	        this._size = _getElementSize(this.container);
	
	        this._perspectiveState = new Transitionable(0);
	        this._perspective = undefined;
	
	        this._nodeContext = {
	            allocator: this._allocator,
	            transform: Transform.identity,
	            opacity: 1,
	            origin: _zeroZero,
	            align: _zeroZero,
	            size: this._size
	        };
	
	        this._eventOutput.on('resize', function() {
	            this.setSize(_getElementSize(this.container));
	        }.bind(this));
	
	    }
	
	    // Note: Unused
	    Context.prototype.getAllocator = function getAllocator() {
	        return this._allocator;
	    };
	
	    /**
	     * Add renderables to this Context's render tree.
	     *
	     * @method add
	     *
	     * @param {Object} obj renderable object
	     * @return {RenderNode} RenderNode wrapping this object, if not already a RenderNode
	     */
	    Context.prototype.add = function add(obj) {
	        return this._node.add(obj);
	    };
	
	    /**
	     * Move this Context to another containing document element.
	     *
	     * @method migrate
	     *
	     * @param {Node} container Element to which content will be migrated
	     */
	    Context.prototype.migrate = function migrate(container) {
	        if (container === this.container) return;
	        this.container = container;
	        this._allocator.migrate(container);
	    };
	
	    /**
	     * Gets viewport size for Context.
	     *
	     * @method getSize
	     *
	     * @return {Array.Number} viewport size as [width, height]
	     */
	    Context.prototype.getSize = function getSize() {
	        return this._size;
	    };
	
	    /**
	     * Sets viewport size for Context.
	     *
	     * @method setSize
	     *
	     * @param {Array.Number} size [width, height].  If unspecified, use size of root document element.
	     */
	    Context.prototype.setSize = function setSize(size) {
	        if (!size) size = _getElementSize(this.container);
	        this._size[0] = size[0];
	        this._size[1] = size[1];
	    };
	
	    /**
	     * Commit this Context's content changes to the document.
	     *
	     * @private
	     * @method update
	     * @param {Object} contextParameters engine commit specification
	     */
	    Context.prototype.update = function update(contextParameters) {
	        if (contextParameters) {
	            if (contextParameters.transform) this._nodeContext.transform = contextParameters.transform;
	            if (contextParameters.opacity) this._nodeContext.opacity = contextParameters.opacity;
	            if (contextParameters.origin) this._nodeContext.origin = contextParameters.origin;
	            if (contextParameters.align) this._nodeContext.align = contextParameters.align;
	            if (contextParameters.size) this._nodeContext.size = contextParameters.size;
	        }
	        var perspective = this._perspectiveState.get();
	        if (perspective !== this._perspective) {
	            _setPerspective(this.container, perspective);
	            this._perspective = perspective;
	        }
	
	        this._node.commit(this._nodeContext);
	    };
	
	    /**
	     * Get current perspective of this context in pixels.
	     *
	     * @method getPerspective
	     * @return {Number} depth perspective in pixels
	     */
	    Context.prototype.getPerspective = function getPerspective() {
	        return this._perspectiveState.get();
	    };
	
	    /**
	     * Set current perspective of this context in pixels.
	     *
	     * @method setPerspective
	     * @param {Number} perspective in pixels
	     * @param {Object} [transition] Transitionable object for applying the change
	     * @param {function(Object)} callback function called on completion of transition
	     */
	    Context.prototype.setPerspective = function setPerspective(perspective, transition, callback) {
	        return this._perspectiveState.set(perspective, transition, callback);
	    };
	
	    /**
	     * Trigger an event, sending to all downstream handlers
	     *   listening for provided 'type' key.
	     *
	     * @method emit
	     *
	     * @param {string} type event type key (for example, 'click')
	     * @param {Object} event event data
	     * @return {EventHandler} this
	     */
	    Context.prototype.emit = function emit(type, event) {
	        return this._eventOutput.emit(type, event);
	    };
	
	    /**
	     * Bind a callback function to an event type handled by this object.
	     *
	     * @method "on"
	     *
	     * @param {string} type event type key (for example, 'click')
	     * @param {function(string, Object)} handler callback
	     * @return {EventHandler} this
	     */
	    Context.prototype.on = function on(type, handler) {
	        return this._eventOutput.on(type, handler);
	    };
	
	    /**
	     * Unbind an event by type and handler.
	     *   This undoes the work of "on".
	     *
	     * @method removeListener
	     *
	     * @param {string} type event type key (for example, 'click')
	     * @param {function} handler function object to remove
	     * @return {EventHandler} internal event handler object (for chaining)
	     */
	    Context.prototype.removeListener = function removeListener(type, handler) {
	        return this._eventOutput.removeListener(type, handler);
	    };
	
	    /**
	     * Add event handler object to set of downstream handlers.
	     *
	     * @method pipe
	     *
	     * @param {EventHandler} target event handler target object
	     * @return {EventHandler} passed event handler
	     */
	    Context.prototype.pipe = function pipe(target) {
	        return this._eventOutput.pipe(target);
	    };
	
	    /**
	     * Remove handler object from set of downstream handlers.
	     *   Undoes work of "pipe".
	     *
	     * @method unpipe
	     *
	     * @param {EventHandler} target target handler object
	     * @return {EventHandler} provided target
	     */
	    Context.prototype.unpipe = function unpipe(target) {
	        return this._eventOutput.unpipe(target);
	    };
	
	    module.exports = Context;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: mark@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	    var EventEmitter = __webpack_require__(46);
	
	    /**
	     * EventHandler forwards received events to a set of provided callback functions.
	     * It allows events to be captured, processed, and optionally piped through to other event handlers.
	     *
	     * @class EventHandler
	     * @extends EventEmitter
	     * @constructor
	     */
	    function EventHandler() {
	        EventEmitter.apply(this, arguments);
	
	        this.downstream = []; // downstream event handlers
	        this.downstreamFn = []; // downstream functions
	
	        this.upstream = []; // upstream event handlers
	        this.upstreamListeners = {}; // upstream listeners
	    }
	    EventHandler.prototype = Object.create(EventEmitter.prototype);
	    EventHandler.prototype.constructor = EventHandler;
	
	    /**
	     * Assign an event handler to receive an object's input events.
	     *
	     * @method setInputHandler
	     * @static
	     *
	     * @param {Object} object object to mix trigger, subscribe, and unsubscribe functions into
	     * @param {EventHandler} handler assigned event handler
	     */
	    EventHandler.setInputHandler = function setInputHandler(object, handler) {
	        object.trigger = handler.trigger.bind(handler);
	        if (handler.subscribe && handler.unsubscribe) {
	            object.subscribe = handler.subscribe.bind(handler);
	            object.unsubscribe = handler.unsubscribe.bind(handler);
	        }
	    };
	
	    /**
	     * Assign an event handler to receive an object's output events.
	     *
	     * @method setOutputHandler
	     * @static
	     *
	     * @param {Object} object object to mix pipe, unpipe, on, addListener, and removeListener functions into
	     * @param {EventHandler} handler assigned event handler
	     */
	    EventHandler.setOutputHandler = function setOutputHandler(object, handler) {
	        if (handler instanceof EventHandler) handler.bindThis(object);
	        object.pipe = handler.pipe.bind(handler);
	        object.unpipe = handler.unpipe.bind(handler);
	        object.on = handler.on.bind(handler);
	        object.addListener = object.on;
	        object.removeListener = handler.removeListener.bind(handler);
	    };
	
	    /**
	     * Trigger an event, sending to all downstream handlers
	     *   listening for provided 'type' key.
	     *
	     * @method emit
	     *
	     * @param {string} type event type key (for example, 'click')
	     * @param {Object} event event data
	     * @return {EventHandler} this
	     */
	    EventHandler.prototype.emit = function emit(type, event) {
	        EventEmitter.prototype.emit.apply(this, arguments);
	        var i = 0;
	        for (i = 0; i < this.downstream.length; i++) {
	            if (this.downstream[i].trigger) this.downstream[i].trigger(type, event);
	        }
	        for (i = 0; i < this.downstreamFn.length; i++) {
	            this.downstreamFn[i](type, event);
	        }
	        return this;
	    };
	
	    /**
	     * Alias for emit
	     * @method addListener
	     */
	    EventHandler.prototype.trigger = EventHandler.prototype.emit;
	
	    /**
	     * Add event handler object to set of downstream handlers.
	     *
	     * @method pipe
	     *
	     * @param {EventHandler} target event handler target object
	     * @return {EventHandler} passed event handler
	     */
	    EventHandler.prototype.pipe = function pipe(target) {
	        if (target.subscribe instanceof Function) return target.subscribe(this);
	
	        var downstreamCtx = (target instanceof Function) ? this.downstreamFn : this.downstream;
	        var index = downstreamCtx.indexOf(target);
	        if (index < 0) downstreamCtx.push(target);
	
	        if (target instanceof Function) target('pipe', null);
	        else if (target.trigger) target.trigger('pipe', null);
	
	        return target;
	    };
	
	    /**
	     * Remove handler object from set of downstream handlers.
	     *   Undoes work of "pipe".
	     *
	     * @method unpipe
	     *
	     * @param {EventHandler} target target handler object
	     * @return {EventHandler} provided target
	     */
	    EventHandler.prototype.unpipe = function unpipe(target) {
	        if (target.unsubscribe instanceof Function) return target.unsubscribe(this);
	
	        var downstreamCtx = (target instanceof Function) ? this.downstreamFn : this.downstream;
	        var index = downstreamCtx.indexOf(target);
	        if (index >= 0) {
	            downstreamCtx.splice(index, 1);
	            if (target instanceof Function) target('unpipe', null);
	            else if (target.trigger) target.trigger('unpipe', null);
	            return target;
	        }
	        else return false;
	    };
	
	    /**
	     * Bind a callback function to an event type handled by this object.
	     *
	     * @method "on"
	     *
	     * @param {string} type event type key (for example, 'click')
	     * @param {function(string, Object)} handler callback
	     * @return {EventHandler} this
	     */
	    EventHandler.prototype.on = function on(type, handler) {
	        EventEmitter.prototype.on.apply(this, arguments);
	        if (!(type in this.upstreamListeners)) {
	            var upstreamListener = this.trigger.bind(this, type);
	            this.upstreamListeners[type] = upstreamListener;
	            for (var i = 0; i < this.upstream.length; i++) {
	                this.upstream[i].on(type, upstreamListener);
	            }
	        }
	        return this;
	    };
	
	    /**
	     * Alias for "on"
	     * @method addListener
	     */
	    EventHandler.prototype.addListener = EventHandler.prototype.on;
	
	    /**
	     * Listen for events from an upstream event handler.
	     *
	     * @method subscribe
	     *
	     * @param {EventEmitter} source source emitter object
	     * @return {EventHandler} this
	     */
	    EventHandler.prototype.subscribe = function subscribe(source) {
	        var index = this.upstream.indexOf(source);
	        if (index < 0) {
	            this.upstream.push(source);
	            for (var type in this.upstreamListeners) {
	                source.on(type, this.upstreamListeners[type]);
	            }
	        }
	        return this;
	    };
	
	    /**
	     * Stop listening to events from an upstream event handler.
	     *
	     * @method unsubscribe
	     *
	     * @param {EventEmitter} source source emitter object
	     * @return {EventHandler} this
	     */
	    EventHandler.prototype.unsubscribe = function unsubscribe(source) {
	        var index = this.upstream.indexOf(source);
	        if (index >= 0) {
	            this.upstream.splice(index, 1);
	            for (var type in this.upstreamListeners) {
	                source.removeListener(type, this.upstreamListeners[type]);
	            }
	        }
	        return this;
	    };
	
	    module.exports = EventHandler;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: mark@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	    var EventHandler = __webpack_require__(37);
	
	    /**
	     *  A collection of methods for setting options which can be extended
	     *  onto other classes.
	     *
	     *
	     *  **** WARNING ****
	     *  You can only pass through objects that will compile into valid JSON.
	     *
	     *  Valid options:
	     *      Strings,
	     *      Arrays,
	     *      Objects,
	     *      Numbers,
	     *      Nested Objects,
	     *      Nested Arrays.
	     *
	     *    This excludes:
	     *        Document Fragments,
	     *        Functions
	     * @class OptionsManager
	     * @constructor
	     * @param {Object} value options dictionary
	     */
	    function OptionsManager(value) {
	        this._value = value;
	        this.eventOutput = null;
	    }
	
	    /**
	     * Create options manager from source dictionary with arguments overriden by patch dictionary.
	     *
	     * @static
	     * @method OptionsManager.patch
	     *
	     * @param {Object} source source arguments
	     * @param {...Object} data argument additions and overwrites
	     * @return {Object} source object
	     */
	    OptionsManager.patch = function patchObject(source, data) {
	        var manager = new OptionsManager(source);
	        for (var i = 1; i < arguments.length; i++) manager.patch(arguments[i]);
	        return source;
	    };
	
	    function _createEventOutput() {
	        this.eventOutput = new EventHandler();
	        this.eventOutput.bindThis(this);
	        EventHandler.setOutputHandler(this, this.eventOutput);
	    }
	
	    /**
	     * Create OptionsManager from source with arguments overriden by patches.
	     *   Triggers 'change' event on this object's event handler if the state of
	     *   the OptionsManager changes as a result.
	     *
	     * @method patch
	     *
	     * @param {...Object} arguments list of patch objects
	     * @return {OptionsManager} this
	     */
	    OptionsManager.prototype.patch = function patch() {
	        var myState = this._value;
	        for (var i = 0; i < arguments.length; i++) {
	            var data = arguments[i];
	            for (var k in data) {
	                if ((k in myState) && (data[k] && data[k].constructor === Object) && (myState[k] && myState[k].constructor === Object)) {
	                    if (!myState.hasOwnProperty(k)) myState[k] = Object.create(myState[k]);
	                    this.key(k).patch(data[k]);
	                    if (this.eventOutput) this.eventOutput.emit('change', {id: k, value: this.key(k).value()});
	                }
	                else this.set(k, data[k]);
	            }
	        }
	        return this;
	    };
	
	    /**
	     * Alias for patch
	     *
	     * @method setOptions
	     *
	     */
	    OptionsManager.prototype.setOptions = OptionsManager.prototype.patch;
	
	    /**
	     * Return OptionsManager based on sub-object retrieved by key
	     *
	     * @method key
	     *
	     * @param {string} identifier key
	     * @return {OptionsManager} new options manager with the value
	     */
	    OptionsManager.prototype.key = function key(identifier) {
	        var result = new OptionsManager(this._value[identifier]);
	        if (!(result._value instanceof Object) || result._value instanceof Array) result._value = {};
	        return result;
	    };
	
	    /**
	     * Look up value by key or get the full options hash
	     * @method get
	     *
	     * @param {string} key key
	     * @return {Object} associated object or full options hash
	     */
	    OptionsManager.prototype.get = function get(key) {
	        return key ? this._value[key] : this._value;
	    };
	
	    /**
	     * Alias for get
	     * @method getOptions
	     */
	    OptionsManager.prototype.getOptions = OptionsManager.prototype.get;
	
	    /**
	     * Set key to value.  Outputs 'change' event if a value is overwritten.
	     *
	     * @method set
	     *
	     * @param {string} key key string
	     * @param {Object} value value object
	     * @return {OptionsManager} new options manager based on the value object
	     */
	    OptionsManager.prototype.set = function set(key, value) {
	        var originalValue = this.get(key);
	        this._value[key] = value;
	        if (this.eventOutput && value !== originalValue) this.eventOutput.emit('change', {id: key, value: value});
	        return this;
	    };
	
	    /**
	     * Bind a callback function to an event type handled by this object.
	     *
	     * @method "on"
	     *
	     * @param {string} type event type key (for example, 'change')
	     * @param {function(string, Object)} handler callback
	     * @return {EventHandler} this
	     */
	    OptionsManager.prototype.on = function on() {
	        _createEventOutput.call(this);
	        return this.on.apply(this, arguments);
	    };
	
	    /**
	     * Unbind an event by type and handler.
	     *   This undoes the work of "on".
	     *
	     * @method removeListener
	     *
	     * @param {string} type event type key (for example, 'change')
	     * @param {function} handler function object to remove
	     * @return {EventHandler} internal event handler object (for chaining)
	     */
	    OptionsManager.prototype.removeListener = function removeListener() {
	        _createEventOutput.call(this);
	        return this.removeListener.apply(this, arguments);
	    };
	
	    /**
	     * Add event handler object to set of downstream handlers.
	     *
	     * @method pipe
	     *
	     * @param {EventHandler} target event handler target object
	     * @return {EventHandler} passed event handler
	     */
	    OptionsManager.prototype.pipe = function pipe() {
	        _createEventOutput.call(this);
	        return this.pipe.apply(this, arguments);
	    };
	
	    /**
	     * Remove handler object from set of downstream handlers.
	     * Undoes work of "pipe"
	     *
	     * @method unpipe
	     *
	     * @param {EventHandler} target target handler object
	     * @return {EventHandler} provided target
	     */
	    OptionsManager.prototype.unpipe = function unpipe() {
	        _createEventOutput.call(this);
	        return this.unpipe.apply(this, arguments);
	    };
	
	    module.exports = OptionsManager;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: david@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	    var MultipleTransition = __webpack_require__(47);
	    var TweenTransition = __webpack_require__(48);
	
	    /**
	     * A state maintainer for a smooth transition between
	     *    numerically-specified states. Example numeric states include floats or
	     *    Transform objects.
	     *
	     * An initial state is set with the constructor or set(startState). A
	     *    corresponding end state and transition are set with set(endState,
	     *    transition). Subsequent calls to set(endState, transition) begin at
	     *    the last state. Calls to get(timestamp) provide the interpolated state
	     *    along the way.
	     *
	     * Note that there is no event loop here - calls to get() are the only way
	     *    to find state projected to the current (or provided) time and are
	     *    the only way to trigger callbacks. Usually this kind of object would
	     *    be part of the render() path of a visible component.
	     *
	     * @class Transitionable
	     * @constructor
	     * @param {number|Array.Number|Object.<number|string, number>} start
	     *    beginning state
	     */
	    function Transitionable(start) {
	        this.currentAction = null;
	        this.actionQueue = [];
	        this.callbackQueue = [];
	
	        this.state = 0;
	        this.velocity = undefined;
	        this._callback = undefined;
	        this._engineInstance = null;
	        this._currentMethod = null;
	
	        this.set(start);
	    }
	
	    var transitionMethods = {};
	
	    Transitionable.register = function register(methods) {
	        var success = true;
	        for (var method in methods) {
	            if (!Transitionable.registerMethod(method, methods[method]))
	                success = false;
	        }
	        return success;
	    };
	
	    Transitionable.registerMethod = function registerMethod(name, engineClass) {
	        if (!(name in transitionMethods)) {
	            transitionMethods[name] = engineClass;
	            return true;
	        }
	        else return false;
	    };
	
	    Transitionable.unregisterMethod = function unregisterMethod(name) {
	        if (name in transitionMethods) {
	            delete transitionMethods[name];
	            return true;
	        }
	        else return false;
	    };
	
	    function _loadNext() {
	        if (this._callback) {
	            var callback = this._callback;
	            this._callback = undefined;
	            callback();
	        }
	        if (this.actionQueue.length <= 0) {
	            this.set(this.get()); // no update required
	            return;
	        }
	        this.currentAction = this.actionQueue.shift();
	        this._callback = this.callbackQueue.shift();
	
	        var method = null;
	        var endValue = this.currentAction[0];
	        var transition = this.currentAction[1];
	        if (transition instanceof Object && transition.method) {
	            method = transition.method;
	            if (typeof method === 'string') method = transitionMethods[method];
	        }
	        else {
	            method = TweenTransition;
	        }
	
	        if (this._currentMethod !== method) {
	            if (!(endValue instanceof Object) || method.SUPPORTS_MULTIPLE === true || endValue.length <= method.SUPPORTS_MULTIPLE) {
	                this._engineInstance = new method();
	            }
	            else {
	                this._engineInstance = new MultipleTransition(method);
	            }
	            this._currentMethod = method;
	        }
	
	        this._engineInstance.reset(this.state, this.velocity);
	        if (this.velocity !== undefined) transition.velocity = this.velocity;
	        this._engineInstance.set(endValue, transition, _loadNext.bind(this));
	    }
	
	    /**
	     * Add transition to end state to the queue of pending transitions. Special
	     *    Use: calling without a transition resets the object to that state with
	     *    no pending actions
	     *
	     * @method set
	     *
	     * @param {number|FamousMatrix|Array.Number|Object.<number, number>} endState
	     *    end state to which we interpolate
	     * @param {transition=} transition object of type {duration: number, curve:
	     *    f[0,1] -> [0,1] or name}. If transition is omitted, change will be
	     *    instantaneous.
	     * @param {function()=} callback Zero-argument function to call on observed
	     *    completion (t=1)
	     */
	    Transitionable.prototype.set = function set(endState, transition, callback) {
	        if (!transition) {
	            this.reset(endState);
	            if (callback) callback();
	            return this;
	        }
	
	        var action = [endState, transition];
	        this.actionQueue.push(action);
	        this.callbackQueue.push(callback);
	        if (!this.currentAction) _loadNext.call(this);
	        return this;
	    };
	
	    /**
	     * Cancel all transitions and reset to a stable state
	     *
	     * @method reset
	     *
	     * @param {number|Array.Number|Object.<number, number>} startState
	     *    stable state to set to
	     */
	    Transitionable.prototype.reset = function reset(startState, startVelocity) {
	        this._currentMethod = null;
	        this._engineInstance = null;
	        this._callback = undefined;
	        this.state = startState;
	        this.velocity = startVelocity;
	        this.currentAction = null;
	        this.actionQueue = [];
	        this.callbackQueue = [];
	    };
	
	    /**
	     * Add delay action to the pending action queue queue.
	     *
	     * @method delay
	     *
	     * @param {number} duration delay time (ms)
	     * @param {function} callback Zero-argument function to call on observed
	     *    completion (t=1)
	     */
	    Transitionable.prototype.delay = function delay(duration, callback) {
	        this.set(this.get(), {duration: duration,
	            curve: function() {
	                return 0;
	            }},
	            callback
	        );
	    };
	
	    /**
	     * Get interpolated state of current action at provided time. If the last
	     *    action has completed, invoke its callback.
	     *
	     * @method get
	     *
	     * @param {number=} timestamp Evaluate the curve at a normalized version of this
	     *    time. If omitted, use current time. (Unix epoch time)
	     * @return {number|Object.<number|string, number>} beginning state
	     *    interpolated to this point in time.
	     */
	    Transitionable.prototype.get = function get(timestamp) {
	        if (this._engineInstance) {
	            if (this._engineInstance.getVelocity)
	                this.velocity = this._engineInstance.getVelocity();
	            this.state = this._engineInstance.get(timestamp);
	        }
	        return this.state;
	    };
	
	    /**
	     * Is there at least one action pending completion?
	     *
	     * @method isActive
	     *
	     * @return {boolean}
	     */
	    Transitionable.prototype.isActive = function isActive() {
	        return !!this.currentAction;
	    };
	
	    /**
	     * Halt transition at current state and erase all pending actions.
	     *
	     * @method halt
	     */
	    Transitionable.prototype.halt = function halt() {
	        return this.set(this.get());
	    };
	
	    module.exports = Transitionable;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: david@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	    var Transitionable = __webpack_require__(39);
	    var Transform = __webpack_require__(18);
	    var Utility = __webpack_require__(21);
	
	    /**
	     * A class for transitioning the state of a Transform by transitioning
	     * its translate, scale, skew and rotate components independently.
	     *
	     * @class TransitionableTransform
	     * @constructor
	     *
	     * @param [transform=Transform.identity] {Transform} The initial transform state
	     */
	    function TransitionableTransform(transform) {
	        this._final = Transform.identity.slice();
	
	        this._finalTranslate = [0, 0, 0];
	        this._finalRotate = [0, 0, 0];
	        this._finalSkew = [0, 0, 0];
	        this._finalScale = [1, 1, 1];
	
	        this.translate = new Transitionable(this._finalTranslate);
	        this.rotate = new Transitionable(this._finalRotate);
	        this.skew = new Transitionable(this._finalSkew);
	        this.scale = new Transitionable(this._finalScale);
	
	        if (transform) this.set(transform);
	    }
	
	    function _build() {
	        return Transform.build({
	            translate: this.translate.get(),
	            rotate: this.rotate.get(),
	            skew: this.skew.get(),
	            scale: this.scale.get()
	        });
	    }
	
	    function _buildFinal() {
	        return Transform.build({
	            translate: this._finalTranslate,
	            rotate: this._finalRotate,
	            skew: this._finalSkew,
	            scale: this._finalScale
	        });
	    }
	
	    /**
	     * An optimized way of setting only the translation component of a Transform
	     *
	     * @method setTranslate
	     * @chainable
	     *
	     * @param translate {Array}     New translation state
	     * @param [transition] {Object} Transition definition
	     * @param [callback] {Function} Callback
	     * @return {TransitionableTransform}
	     */
	    TransitionableTransform.prototype.setTranslate = function setTranslate(translate, transition, callback) {
	        this._finalTranslate = translate;
	        this._final = _buildFinal.call(this);
	        this.translate.set(translate, transition, callback);
	        return this;
	    };
	
	    /**
	     * An optimized way of setting only the scale component of a Transform
	     *
	     * @method setScale
	     * @chainable
	     *
	     * @param scale {Array}         New scale state
	     * @param [transition] {Object} Transition definition
	     * @param [callback] {Function} Callback
	     * @return {TransitionableTransform}
	     */
	    TransitionableTransform.prototype.setScale = function setScale(scale, transition, callback) {
	        this._finalScale = scale;
	        this._final = _buildFinal.call(this);
	        this.scale.set(scale, transition, callback);
	        return this;
	    };
	
	    /**
	     * An optimized way of setting only the rotational component of a Transform
	     *
	     * @method setRotate
	     * @chainable
	     *
	     * @param eulerAngles {Array}   Euler angles for new rotation state
	     * @param [transition] {Object} Transition definition
	     * @param [callback] {Function} Callback
	     * @return {TransitionableTransform}
	     */
	    TransitionableTransform.prototype.setRotate = function setRotate(eulerAngles, transition, callback) {
	        this._finalRotate = eulerAngles;
	        this._final = _buildFinal.call(this);
	        this.rotate.set(eulerAngles, transition, callback);
	        return this;
	    };
	
	    /**
	     * An optimized way of setting only the skew component of a Transform
	     *
	     * @method setSkew
	     * @chainable
	     *
	     * @param skewAngles {Array}    New skew state
	     * @param [transition] {Object} Transition definition
	     * @param [callback] {Function} Callback
	     * @return {TransitionableTransform}
	     */
	    TransitionableTransform.prototype.setSkew = function setSkew(skewAngles, transition, callback) {
	        this._finalSkew = skewAngles;
	        this._final = _buildFinal.call(this);
	        this.skew.set(skewAngles, transition, callback);
	        return this;
	    };
	
	    /**
	     * Setter for a TransitionableTransform with optional parameters to transition
	     * between Transforms
	     *
	     * @method set
	     * @chainable
	     *
	     * @param transform {Array}     New transform state
	     * @param [transition] {Object} Transition definition
	     * @param [callback] {Function} Callback
	     * @return {TransitionableTransform}
	     */
	    TransitionableTransform.prototype.set = function set(transform, transition, callback) {
	        var components = Transform.interpret(transform);
	
	        this._finalTranslate = components.translate;
	        this._finalRotate = components.rotate;
	        this._finalSkew = components.skew;
	        this._finalScale = components.scale;
	        this._final = transform;
	
	        var _callback = callback ? Utility.after(4, callback) : null;
	        this.translate.set(components.translate, transition, _callback);
	        this.rotate.set(components.rotate, transition, _callback);
	        this.skew.set(components.skew, transition, _callback);
	        this.scale.set(components.scale, transition, _callback);
	        return this;
	    };
	
	    /**
	     * Sets the default transition to use for transitioning betwen Transform states
	     *
	     * @method setDefaultTransition
	     *
	     * @param transition {Object} Transition definition
	     */
	    TransitionableTransform.prototype.setDefaultTransition = function setDefaultTransition(transition) {
	        this.translate.setDefault(transition);
	        this.rotate.setDefault(transition);
	        this.skew.setDefault(transition);
	        this.scale.setDefault(transition);
	    };
	
	    /**
	     * Getter. Returns the current state of the Transform
	     *
	     * @method get
	     *
	     * @return {Transform}
	     */
	    TransitionableTransform.prototype.get = function get() {
	        if (this.isActive()) {
	            return _build.call(this);
	        }
	        else return this._final;
	    };
	
	    /**
	     * Get the destination state of the Transform
	     *
	     * @method getFinal
	     *
	     * @return Transform {Transform}
	     */
	    TransitionableTransform.prototype.getFinal = function getFinal() {
	        return this._final;
	    };
	
	    /**
	     * Determine if the TransitionalTransform is currently transitioning
	     *
	     * @method isActive
	     *
	     * @return {Boolean}
	     */
	    TransitionableTransform.prototype.isActive = function isActive() {
	        return this.translate.isActive() || this.rotate.isActive() || this.scale.isActive() || this.skew.isActive();
	    };
	
	    /**
	     * Halts the transition
	     *
	     * @method halt
	     */
	    TransitionableTransform.prototype.halt = function halt() {
	        this.translate.halt();
	        this.rotate.halt();
	        this.skew.halt();
	        this.scale.halt();
	
	        this._final = this.get();
	        this._finalTranslate = this.translate.get();
	        this._finalRotate = this.rotate.get();
	        this._finalSkew = this.skew.get();
	        this._finalScale = this.scale.get();
	
	        return this;
	    };
	
	    module.exports = TransitionableTransform;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: mark@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	    var Entity = __webpack_require__(49);
	    var SpecParser = __webpack_require__(50);
	
	    /**
	     * A wrapper for inserting a renderable component (like a Modifer or
	     *   Surface) into the render tree.
	     *
	     * @class RenderNode
	     * @constructor
	     *
	     * @param {Object} object Target renderable component
	     */
	    function RenderNode(object) {
	        this._object = null;
	        this._child = null;
	        this._hasMultipleChildren = false;
	        this._isRenderable = false;
	        this._isModifier = false;
	
	        this._resultCache = {};
	        this._prevResults = {};
	
	        this._childResult = null;
	
	        if (object) this.set(object);
	    }
	
	    /**
	     * Append a renderable to the list of this node's children.
	     *   This produces a new RenderNode in the tree.
	     *   Note: Does not double-wrap if child is a RenderNode already.
	     *
	     * @method add
	     * @param {Object} child renderable object
	     * @return {RenderNode} new render node wrapping child
	     */
	    RenderNode.prototype.add = function add(child) {
	        var childNode = (child instanceof RenderNode) ? child : new RenderNode(child);
	        if (this._child instanceof Array) this._child.push(childNode);
	        else if (this._child) {
	            this._child = [this._child, childNode];
	            this._hasMultipleChildren = true;
	            this._childResult = []; // to be used later
	        }
	        else this._child = childNode;
	
	        return childNode;
	    };
	
	    /**
	     * Return the single wrapped object.  Returns null if this node has multiple child nodes.
	     *
	     * @method get
	     *
	     * @return {Ojbect} contained renderable object
	     */
	    RenderNode.prototype.get = function get() {
	        return this._object || (this._hasMultipleChildren ? null : (this._child ? this._child.get() : null));
	    };
	
	    /**
	     * Overwrite the list of children to contain the single provided object
	     *
	     * @method set
	     * @param {Object} child renderable object
	     * @return {RenderNode} this render node, or child if it is a RenderNode
	     */
	    RenderNode.prototype.set = function set(child) {
	        this._childResult = null;
	        this._hasMultipleChildren = false;
	        this._isRenderable = child.render ? true : false;
	        this._isModifier = child.modify ? true : false;
	        this._object = child;
	        this._child = null;
	        if (child instanceof RenderNode) return child;
	        else return this;
	    };
	
	    /**
	     * Get render size of contained object.
	     *
	     * @method getSize
	     * @return {Array.Number} size of this or size of single child.
	     */
	    RenderNode.prototype.getSize = function getSize() {
	        var result = null;
	        var target = this.get();
	        if (target && target.getSize) result = target.getSize();
	        if (!result && this._child && this._child.getSize) result = this._child.getSize();
	        return result;
	    };
	
	    // apply results of rendering this subtree to the document
	    function _applyCommit(spec, context, cacheStorage) {
	        var result = SpecParser.parse(spec, context);
	        var keys = Object.keys(result);
	        for (var i = 0; i < keys.length; i++) {
	            var id = keys[i];
	            var childNode = Entity.get(id);
	            var commitParams = result[id];
	            commitParams.allocator = context.allocator;
	            var commitResult = childNode.commit(commitParams);
	            if (commitResult) _applyCommit(commitResult, context, cacheStorage);
	            else cacheStorage[id] = commitParams;
	        }
	    }
	
	    /**
	     * Commit the content change from this node to the document.
	     *
	     * @private
	     * @method commit
	     * @param {Context} context render context
	     */
	    RenderNode.prototype.commit = function commit(context) {
	        // free up some divs from the last loop
	        var prevKeys = Object.keys(this._prevResults);
	        for (var i = 0; i < prevKeys.length; i++) {
	            var id = prevKeys[i];
	            if (this._resultCache[id] === undefined) {
	                var object = Entity.get(id);
	                if (object.cleanup) object.cleanup(context.allocator);
	            }
	        }
	
	        this._prevResults = this._resultCache;
	        this._resultCache = {};
	        _applyCommit(this.render(), context, this._resultCache);
	    };
	
	    /**
	     * Generate a render spec from the contents of the wrapped component.
	     *
	     * @private
	     * @method render
	     *
	     * @return {Object} render specification for the component subtree
	     *    only under this node.
	     */
	    RenderNode.prototype.render = function render() {
	        if (this._isRenderable) return this._object.render();
	
	        var result = null;
	        if (this._hasMultipleChildren) {
	            result = this._childResult;
	            var children = this._child;
	            for (var i = 0; i < children.length; i++) {
	                result[i] = children[i].render();
	            }
	        }
	        else if (this._child) result = this._child.render();
	
	        return this._isModifier ? this._object.modify(result) : result;
	    };
	
	    module.exports = RenderNode;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: mark@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	    var EventHandler = __webpack_require__(37);
	
	    var _now = Date.now;
	
	    function _timestampTouch(touch, event, history) {
	        return {
	            x: touch.clientX,
	            y: touch.clientY,
	            identifier : touch.identifier,
	            origin: event.origin,
	            timestamp: _now(),
	            count: event.touches.length,
	            history: history
	        };
	    }
	
	    function _handleStart(event) {
	        if (event.touches.length > this.touchLimit) return;
	        this.isTouched = true;
	
	        for (var i = 0; i < event.changedTouches.length; i++) {
	            var touch = event.changedTouches[i];
	            var data = _timestampTouch(touch, event, null);
	            this.eventOutput.emit('trackstart', data);
	            if (!this.selective && !this.touchHistory[touch.identifier]) this.track(data);
	        }
	    }
	
	    function _handleMove(event) {
	        if (event.touches.length > this.touchLimit) return;
	
	        for (var i = 0; i < event.changedTouches.length; i++) {
	            var touch = event.changedTouches[i];
	            var history = this.touchHistory[touch.identifier];
	            if (history) {
	                var data = _timestampTouch(touch, event, history);
	                this.touchHistory[touch.identifier].push(data);
	                this.eventOutput.emit('trackmove', data);
	            }
	        }
	    }
	
	    function _handleEnd(event) {
	        if (!this.isTouched) return;
	
	        for (var i = 0; i < event.changedTouches.length; i++) {
	            var touch = event.changedTouches[i];
	            var history = this.touchHistory[touch.identifier];
	            if (history) {
	                var data = _timestampTouch(touch, event, history);
	                this.eventOutput.emit('trackend', data);
	                delete this.touchHistory[touch.identifier];
	            }
	        }
	
	        this.isTouched = false;
	    }
	
	    function _handleUnpipe() {
	        for (var i in this.touchHistory) {
	            var history = this.touchHistory[i];
	            this.eventOutput.emit('trackend', {
	                touch: history[history.length - 1].touch,
	                timestamp: Date.now(),
	                count: 0,
	                history: history
	            });
	            delete this.touchHistory[i];
	        }
	    }
	
	    /**
	     * Helper to TouchSync – tracks piped in touch events, organizes touch
	     *   events by ID, and emits track events back to TouchSync.
	     *   Emits 'trackstart', 'trackmove', and 'trackend' events upstream.
	     *
	     * @class TouchTracker
	     * @constructor
	     * @param {Object} options default options overrides
	     * @param [options.selective] {Boolean} selective if false, saves state for each touch
	     * @param [options.touchLimit] {Number} touchLimit upper bound for emitting events based on number of touches
	     */
	    function TouchTracker(options) {
	        this.selective = options.selective;
	        this.touchLimit = options.touchLimit || 1;
	
	        this.touchHistory = {};
	
	        this.eventInput = new EventHandler();
	        this.eventOutput = new EventHandler();
	
	        EventHandler.setInputHandler(this, this.eventInput);
	        EventHandler.setOutputHandler(this, this.eventOutput);
	
	        this.eventInput.on('touchstart', _handleStart.bind(this));
	        this.eventInput.on('touchmove', _handleMove.bind(this));
	        this.eventInput.on('touchend', _handleEnd.bind(this));
	        this.eventInput.on('touchcancel', _handleEnd.bind(this));
	        this.eventInput.on('unpipe', _handleUnpipe.bind(this));
	
	        this.isTouched = false;
	    }
	
	    /**
	     * Record touch data, if selective is false.
	     * @private
	     * @method track
	     * @param {Object} data touch data
	     */
	    TouchTracker.prototype.track = function track(data) {
	        this.touchHistory[data.identifier] = [data];
	    };
	
	    module.exports = TouchTracker;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: mark@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	    var Entity = __webpack_require__(49);
	    var EventHandler = __webpack_require__(37);
	    var Transform = __webpack_require__(18);
	
	    var usePrefix = !('transform' in document.documentElement.style);
	    var devicePixelRatio = window.devicePixelRatio || 1;
	
	    /**
	     * A base class for viewable content and event
	     *   targets inside a Famo.us application, containing a renderable document
	     *   fragment. Like an HTML div, it can accept internal markup,
	     *   properties, classes, and handle events.
	     *
	     * @class ElementOutput
	     * @constructor
	     *
	     * @param {Node} element document parent of this container
	     */
	    function ElementOutput(element) {
	        this._matrix = null;
	        this._opacity = 1;
	        this._origin = null;
	        this._size = null;
	
	        this._eventOutput = new EventHandler();
	        this._eventOutput.bindThis(this);
	
	        /** @ignore */
	        this.eventForwarder = function eventForwarder(event) {
	            this._eventOutput.emit(event.type, event);
	        }.bind(this);
	
	        this.id = Entity.register(this);
	        this._element = null;
	        this._sizeDirty = false;
	        this._originDirty = false;
	        this._transformDirty = false;
	
	        this._invisible = false;
	        if (element) this.attach(element);
	    }
	
	    /**
	     * Bind a callback function to an event type handled by this object.
	     *
	     * @method "on"
	     *
	     * @param {string} type event type key (for example, 'click')
	     * @param {function(string, Object)} fn handler callback
	     * @return {EventHandler} this
	     */
	    ElementOutput.prototype.on = function on(type, fn) {
	        if (this._element) this._element.addEventListener(type, this.eventForwarder);
	        this._eventOutput.on(type, fn);
	    };
	
	    /**
	     * Unbind an event by type and handler.
	     *   This undoes the work of "on"
	     *
	     * @method removeListener
	     * @param {string} type event type key (for example, 'click')
	     * @param {function(string, Object)} fn handler
	     */
	    ElementOutput.prototype.removeListener = function removeListener(type, fn) {
	        this._eventOutput.removeListener(type, fn);
	    };
	
	    /**
	     * Trigger an event, sending to all downstream handlers
	     *   listening for provided 'type' key.
	     *
	     * @method emit
	     *
	     * @param {string} type event type key (for example, 'click')
	     * @param {Object} [event] event data
	     * @return {EventHandler} this
	     */
	    ElementOutput.prototype.emit = function emit(type, event) {
	        if (event && !event.origin) event.origin = this;
	        var handled = this._eventOutput.emit(type, event);
	        if (handled && event && event.stopPropagation) event.stopPropagation();
	        return handled;
	    };
	
	    /**
	     * Add event handler object to set of downstream handlers.
	     *
	     * @method pipe
	     *
	     * @param {EventHandler} target event handler target object
	     * @return {EventHandler} passed event handler
	     */
	    ElementOutput.prototype.pipe = function pipe(target) {
	        return this._eventOutput.pipe(target);
	    };
	
	    /**
	     * Remove handler object from set of downstream handlers.
	     *   Undoes work of "pipe"
	     *
	     * @method unpipe
	     *
	     * @param {EventHandler} target target handler object
	     * @return {EventHandler} provided target
	     */
	    ElementOutput.prototype.unpipe = function unpipe(target) {
	        return this._eventOutput.unpipe(target);
	    };
	
	    /**
	     * Return spec for this surface. Note that for a base surface, this is
	     *    simply an id.
	     *
	     * @method render
	     * @private
	     * @return {Object} render spec for this surface (spec id)
	     */
	    ElementOutput.prototype.render = function render() {
	        return this.id;
	    };
	
	    //  Attach Famous event handling to document events emanating from target
	    //    document element.  This occurs just after attachment to the document.
	    //    Calling this enables methods like #on and #pipe.
	    function _addEventListeners(target) {
	        for (var i in this._eventOutput.listeners) {
	            target.addEventListener(i, this.eventForwarder);
	        }
	    }
	
	    //  Detach Famous event handling from document events emanating from target
	    //  document element.  This occurs just before detach from the document.
	    function _removeEventListeners(target) {
	        for (var i in this._eventOutput.listeners) {
	            target.removeEventListener(i, this.eventForwarder);
	        }
	    }
	
	    /**
	     * Return a Matrix's webkit css representation to be used with the
	     *    CSS3 -webkit-transform style.
	     *    Example: -webkit-transform: matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,716,243,0,1)
	     *
	     * @method _formatCSSTransform
	     * @private
	     * @param {FamousMatrix} m matrix
	     * @return {string} matrix3d CSS style representation of the transform
	     */
	    function _formatCSSTransform(m) {
	        m[12] = Math.round(m[12] * devicePixelRatio) / devicePixelRatio;
	        m[13] = Math.round(m[13] * devicePixelRatio) / devicePixelRatio;
	
	        var result = 'matrix3d(';
	        for (var i = 0; i < 15; i++) {
	            result += (m[i] < 0.000001 && m[i] > -0.000001) ? '0,' : m[i] + ',';
	        }
	        result += m[15] + ')';
	        return result;
	    }
	
	    /**
	     * Directly apply given FamousMatrix to the document element as the
	     *   appropriate webkit CSS style.
	     *
	     * @method setMatrix
	     *
	     * @static
	     * @private
	     * @param {Element} element document element
	     * @param {FamousMatrix} matrix
	     */
	
	    var _setMatrix;
	    if (navigator.userAgent.toLowerCase().indexOf('firefox') > -1) {
	        _setMatrix = function(element, matrix) {
	            element.style.zIndex = (matrix[14] * 1000000) | 0;    // fix for Firefox z-buffer issues
	            element.style.transform = _formatCSSTransform(matrix);
	        };
	    }
	    else if (usePrefix) {
	        _setMatrix = function(element, matrix) {
	            element.style.webkitTransform = _formatCSSTransform(matrix);
	        };
	    }
	    else {
	        _setMatrix = function(element, matrix) {
	            element.style.transform = _formatCSSTransform(matrix);
	        };
	    }
	
	    // format origin as CSS percentage string
	    function _formatCSSOrigin(origin) {
	        return (100 * origin[0]) + '% ' + (100 * origin[1]) + '%';
	    }
	
	    // Directly apply given origin coordinates to the document element as the
	    // appropriate webkit CSS style.
	    var _setOrigin = usePrefix ? function(element, origin) {
	        element.style.webkitTransformOrigin = _formatCSSOrigin(origin);
	    } : function(element, origin) {
	        element.style.transformOrigin = _formatCSSOrigin(origin);
	    };
	
	    // Shrink given document element until it is effectively invisible.
	    var _setInvisible = usePrefix ? function(element) {
	        element.style.webkitTransform = 'scale3d(0.0001,0.0001,0.0001)';
	        element.style.opacity = 0;
	    } : function(element) {
	        element.style.transform = 'scale3d(0.0001,0.0001,0.0001)';
	        element.style.opacity = 0;
	    };
	
	    function _xyNotEquals(a, b) {
	        return (a && b) ? (a[0] !== b[0] || a[1] !== b[1]) : a !== b;
	    }
	
	    /**
	     * Apply changes from this component to the corresponding document element.
	     * This includes changes to classes, styles, size, content, opacity, origin,
	     * and matrix transforms.
	     *
	     * @private
	     * @method commit
	     * @param {Context} context commit context
	     */
	    ElementOutput.prototype.commit = function commit(context) {
	        var target = this._element;
	        if (!target) return;
	
	        var matrix = context.transform;
	        var opacity = context.opacity;
	        var origin = context.origin;
	        var size = context.size;
	
	        if (!matrix && this._matrix) {
	            this._matrix = null;
	            this._opacity = 0;
	            _setInvisible(target);
	            return;
	        }
	
	        if (_xyNotEquals(this._origin, origin)) this._originDirty = true;
	        if (Transform.notEquals(this._matrix, matrix)) this._transformDirty = true;
	
	        if (this._invisible) {
	            this._invisible = false;
	            this._element.style.display = '';
	        }
	
	        if (this._opacity !== opacity) {
	            this._opacity = opacity;
	            target.style.opacity = (opacity >= 1) ? '0.999999' : opacity;
	        }
	
	        if (this._transformDirty || this._originDirty || this._sizeDirty) {
	            if (this._sizeDirty) this._sizeDirty = false;
	
	            if (this._originDirty) {
	                if (origin) {
	                    if (!this._origin) this._origin = [0, 0];
	                    this._origin[0] = origin[0];
	                    this._origin[1] = origin[1];
	                }
	                else this._origin = null;
	                _setOrigin(target, this._origin);
	                this._originDirty = false;
	            }
	
	            if (!matrix) matrix = Transform.identity;
	            this._matrix = matrix;
	            var aaMatrix = this._size ? Transform.thenMove(matrix, [-this._size[0]*origin[0], -this._size[1]*origin[1], 0]) : matrix;
	            _setMatrix(target, aaMatrix);
	            this._transformDirty = false;
	        }
	    };
	
	    ElementOutput.prototype.cleanup = function cleanup() {
	        if (this._element) {
	            this._invisible = true;
	            this._element.style.display = 'none';
	        }
	    };
	
	    /**
	     * Place the document element that this component manages into the document.
	     *
	     * @private
	     * @method attach
	     * @param {Node} target document parent of this container
	     */
	    ElementOutput.prototype.attach = function attach(target) {
	        this._element = target;
	        _addEventListeners.call(this, target);
	    };
	
	    /**
	     * Remove any contained document content associated with this surface
	     *   from the actual document.
	     *
	     * @private
	     * @method detach
	     */
	    ElementOutput.prototype.detach = function detach() {
	        var target = this._element;
	        if (target) {
	            _removeEventListeners.call(this, target);
	            if (this._invisible) {
	                this._invisible = false;
	                this._element.style.display = '';
	            }
	        }
	        this._element = null;
	        return target;
	    };
	
	    module.exports = ElementOutput;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: felix@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	    var OptionsManager = __webpack_require__(38);
	    var Transform = __webpack_require__(18);
	    var ViewSequence = __webpack_require__(51);
	    var Utility = __webpack_require__(21);
	
	    /**
	     * SequentialLayout will lay out a collection of renderables sequentially in the specified direction.
	     * @class SequentialLayout
	     * @constructor
	     * @param {Options} [options] An object of configurable options.
	     * @param {Number} [options.direction=Utility.Direction.Y] Using the direction helper found in the famous Utility
	     * module, this option will lay out the SequentialLayout instance's renderables either horizontally
	     * (x) or vertically (y). Utility's direction is essentially either zero (X) or one (Y), so feel free
	     * to just use integers as well.
	     */
	    function SequentialLayout(options) {
	        this._items = null;
	        this._size = null;
	        this._outputFunction = SequentialLayout.DEFAULT_OUTPUT_FUNCTION;
	
	        this.options = Utility.clone(this.constructor.DEFAULT_OPTIONS || SequentialLayout.DEFAULT_OPTIONS);
	        this.optionsManager = new OptionsManager(this.options);
	
	        if (options) this.setOptions(options);
	    }
	
	    SequentialLayout.DEFAULT_OPTIONS = {
	        direction: Utility.Direction.Y,
	        itemSpacing: 0
	    };
	
	    SequentialLayout.DEFAULT_OUTPUT_FUNCTION = function DEFAULT_OUTPUT_FUNCTION(input, offset, index) {
	        var transform = (this.options.direction === Utility.Direction.X) ? Transform.translate(offset, 0) : Transform.translate(0, offset);
	        return {
	            transform: transform,
	            target: input.render()
	        };
	    };
	
	    /**
	     * Returns the width and the height of the SequentialLayout instance.
	     *
	     * @method getSize
	     * @return {Array} A two value array of the SequentialLayout instance's current width and height (in that order).
	     */
	    SequentialLayout.prototype.getSize = function getSize() {
	        if (!this._size) this.render(); // hack size in
	        return this._size;
	    };
	
	    /**
	     * Sets the collection of renderables under the SequentialLayout instance's control.
	     *
	     * @method sequenceFrom
	     * @param {Array|ViewSequence} items Either an array of renderables or a Famous viewSequence.
	     * @chainable
	     */
	    SequentialLayout.prototype.sequenceFrom = function sequenceFrom(items) {
	        if (items instanceof Array) items = new ViewSequence(items);
	        this._items = items;
	        return this;
	    };
	
	    /**
	     * Patches the SequentialLayout instance's options with the passed-in ones.
	     *
	     * @method setOptions
	     * @param {Options} options An object of configurable options for the SequentialLayout instance.
	     * @chainable
	     */
	    SequentialLayout.prototype.setOptions = function setOptions(options) {
	        this.optionsManager.setOptions.apply(this.optionsManager, arguments);
	        return this;
	    };
	
	    /**
	     * setOutputFunction is used to apply a user-defined output transform on each processed renderable.
	     *  For a good example, check out SequentialLayout's own DEFAULT_OUTPUT_FUNCTION in the code.
	     *
	     * @method setOutputFunction
	     * @param {Function} outputFunction An output processer for each renderable in the SequentialLayout
	     * instance.
	     * @chainable
	     */
	    SequentialLayout.prototype.setOutputFunction = function setOutputFunction(outputFunction) {
	        this._outputFunction = outputFunction;
	        return this;
	    };
	
	    /**
	     * Generate a render spec from the contents of this component.
	     *
	     * @private
	     * @method render
	     * @return {number} Render spec for this component
	     */
	    SequentialLayout.prototype.render = function render() {
	        var length             = 0;
	        var secondaryDirection = this.options.direction ^ 1;
	        var currentNode        = this._items;
	        var item               = null;
	        var itemSize           = [];
	        var output             = {};
	        var result             = [];
	        var i                  = 0;
	
	        this._size = [0, 0];
	
	        while (currentNode) {
	            item = currentNode.get();
	            if (!item) break;
	
	            if (item.getSize) itemSize = item.getSize();
	
	            output = this._outputFunction.call(this, item, length, i++);
	            result.push(output);
	
	            if (itemSize) {
	                if (itemSize[this.options.direction]) length += itemSize[this.options.direction];
	                if (itemSize[secondaryDirection] > this._size[secondaryDirection]) this._size[secondaryDirection] = itemSize[secondaryDirection];
	                if (itemSize[secondaryDirection] === 0) this._size[secondaryDirection] = undefined;
	            }
	
	            currentNode = currentNode.getNext();
	
	            if (this.options.itemSpacing && currentNode) length += this.options.itemSpacing;
	        }
	
	        this._size[this.options.direction] = length;
	
	        return {
	            size: this.getSize(),
	            target: result
	        };
	    };
	
	    module.exports = SequentialLayout;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: mark@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	
	    /**
	     * Internal helper object to Context that handles the process of
	     *   creating and allocating DOM elements within a managed div.
	     *   Private.
	     *
	     * @class ElementAllocator
	     * @constructor
	     * @private
	     * @param {Node} container document element in which Famo.us content will be inserted
	     */
	    function ElementAllocator(container) {
	        if (!container) container = document.createDocumentFragment();
	        this.container = container;
	        this.detachedNodes = {};
	        this.nodeCount = 0;
	    }
	
	    /**
	     * Move the document elements from their original container to a new one.
	     *
	     * @private
	     * @method migrate
	     *
	     * @param {Node} container document element to which Famo.us content will be migrated
	     */
	    ElementAllocator.prototype.migrate = function migrate(container) {
	        var oldContainer = this.container;
	        if (container === oldContainer) return;
	
	        if (oldContainer instanceof DocumentFragment) {
	            container.appendChild(oldContainer);
	        }
	        else {
	            while (oldContainer.hasChildNodes()) {
	                container.appendChild(oldContainer.removeChild(oldContainer.firstChild));
	            }
	        }
	
	        this.container = container;
	    };
	
	    /**
	     * Allocate an element of specified type from the pool.
	     *
	     * @private
	     * @method allocate
	     *
	     * @param {string} type type of element, e.g. 'div'
	     * @return {Node} allocated document element
	     */
	    ElementAllocator.prototype.allocate = function allocate(type) {
	        type = type.toLowerCase();
	        if (!(type in this.detachedNodes)) this.detachedNodes[type] = [];
	        var nodeStore = this.detachedNodes[type];
	        var result;
	        if (nodeStore.length > 0) {
	            result = nodeStore.pop();
	        }
	        else {
	            result = document.createElement(type);
	            this.container.appendChild(result);
	        }
	        this.nodeCount++;
	        return result;
	    };
	
	    /**
	     * De-allocate an element of specified type to the pool.
	     *
	     * @private
	     * @method deallocate
	     *
	     * @param {Node} element document element to deallocate
	     */
	    ElementAllocator.prototype.deallocate = function deallocate(element) {
	        var nodeType = element.nodeName.toLowerCase();
	        var nodeStore = this.detachedNodes[nodeType];
	        nodeStore.push(element);
	        this.nodeCount--;
	    };
	
	    /**
	     * Get count of total allocated nodes in the document.
	     *
	     * @private
	     * @method getNodeCount
	     *
	     * @return {Number} total node count
	     */
	    ElementAllocator.prototype.getNodeCount = function getNodeCount() {
	        return this.nodeCount;
	    };
	
	    module.exports = ElementAllocator;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: mark@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	    /**
	     * EventEmitter represents a channel for events.
	     *
	     * @class EventEmitter
	     * @constructor
	     */
	    function EventEmitter() {
	        this.listeners = {};
	        this._owner = this;
	    }
	
	    /**
	     * Trigger an event, sending to all downstream handlers
	     *   listening for provided 'type' key.
	     *
	     * @method emit
	     *
	     * @param {string} type event type key (for example, 'click')
	     * @param {Object} event event data
	     * @return {EventHandler} this
	     */
	    EventEmitter.prototype.emit = function emit(type, event) {
	        var handlers = this.listeners[type];
	        if (handlers) {
	            for (var i = 0; i < handlers.length; i++) {
	                handlers[i].call(this._owner, event);
	            }
	        }
	        return this;
	    };
	
	    /**
	     * Bind a callback function to an event type handled by this object.
	     *
	     * @method "on"
	     *
	     * @param {string} type event type key (for example, 'click')
	     * @param {function(string, Object)} handler callback
	     * @return {EventHandler} this
	     */
	   EventEmitter.prototype.on = function on(type, handler) {
	        if (!(type in this.listeners)) this.listeners[type] = [];
	        var index = this.listeners[type].indexOf(handler);
	        if (index < 0) this.listeners[type].push(handler);
	        return this;
	    };
	
	    /**
	     * Alias for "on".
	     * @method addListener
	     */
	    EventEmitter.prototype.addListener = EventEmitter.prototype.on;
	
	   /**
	     * Unbind an event by type and handler.
	     *   This undoes the work of "on".
	     *
	     * @method removeListener
	     *
	     * @param {string} type event type key (for example, 'click')
	     * @param {function} handler function object to remove
	     * @return {EventEmitter} this
	     */
	    EventEmitter.prototype.removeListener = function removeListener(type, handler) {
	        var listener = this.listeners[type];
	        if (listener !== undefined) {
	            var index = listener.indexOf(handler);
	            if (index >= 0) listener.splice(index, 1);
	        }
	        return this;
	    };
	
	    /**
	     * Call event handlers with this set to owner.
	     *
	     * @method bindThis
	     *
	     * @param {Object} owner object this EventEmitter belongs to
	     */
	    EventEmitter.prototype.bindThis = function bindThis(owner) {
	        this._owner = owner;
	    };
	
	    module.exports = EventEmitter;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: david@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	    var Utility = __webpack_require__(21);
	
	    /**
	     * Transition meta-method to support transitioning multiple
	     *   values with scalar-only methods.
	     *
	     *
	     * @class MultipleTransition
	     * @constructor
	     *
	     * @param {Object} method Transionable class to multiplex
	     */
	    function MultipleTransition(method) {
	        this.method = method;
	        this._instances = [];
	        this.state = [];
	    }
	
	    MultipleTransition.SUPPORTS_MULTIPLE = true;
	
	    /**
	     * Get the state of each transition.
	     *
	     * @method get
	     *
	     * @return state {Number|Array} state array
	     */
	    MultipleTransition.prototype.get = function get() {
	        for (var i = 0; i < this._instances.length; i++) {
	            this.state[i] = this._instances[i].get();
	        }
	        return this.state;
	    };
	
	    /**
	     * Set the end states with a shared transition, with optional callback.
	     *
	     * @method set
	     *
	     * @param {Number|Array} endState Final State.  Use a multi-element argument for multiple transitions.
	     * @param {Object} transition Transition definition, shared among all instances
	     * @param {Function} callback called when all endStates have been reached.
	     */
	    MultipleTransition.prototype.set = function set(endState, transition, callback) {
	        var _allCallback = Utility.after(endState.length, callback);
	        for (var i = 0; i < endState.length; i++) {
	            if (!this._instances[i]) this._instances[i] = new (this.method)();
	            this._instances[i].set(endState[i], transition, _allCallback);
	        }
	    };
	
	    /**
	     * Reset all transitions to start state.
	     *
	     * @method reset
	     *
	     * @param  {Number|Array} startState Start state
	     */
	    MultipleTransition.prototype.reset = function reset(startState) {
	        for (var i = 0; i < startState.length; i++) {
	            if (!this._instances[i]) this._instances[i] = new (this.method)();
	            this._instances[i].reset(startState[i]);
	        }
	    };
	
	    module.exports = MultipleTransition;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: david@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	
	    /**
	     *
	     * A state maintainer for a smooth transition between
	     *    numerically-specified states.  Example numeric states include floats or
	     *    Transfornm objects.
	     *
	     *    An initial state is set with the constructor or set(startValue). A
	     *    corresponding end state and transition are set with set(endValue,
	     *    transition). Subsequent calls to set(endValue, transition) begin at
	     *    the last state. Calls to get(timestamp) provide the _interpolated state
	     *    along the way.
	     *
	     *   Note that there is no event loop here - calls to get() are the only way
	     *    to find out state projected to the current (or provided) time and are
	     *    the only way to trigger callbacks. Usually this kind of object would
	     *    be part of the render() path of a visible component.
	     *
	     * @class TweenTransition
	     * @constructor
	     *
	     * @param {Object} options TODO
	     *    beginning state
	     */
	    function TweenTransition(options) {
	        this.options = Object.create(TweenTransition.DEFAULT_OPTIONS);
	        if (options) this.setOptions(options);
	
	        this._startTime = 0;
	        this._startValue = 0;
	        this._updateTime = 0;
	        this._endValue = 0;
	        this._curve = undefined;
	        this._duration = 0;
	        this._active = false;
	        this._callback = undefined;
	        this.state = 0;
	        this.velocity = undefined;
	    }
	
	    /**
	     * Transition curves mapping independent variable t from domain [0,1] to a
	     *    range within [0,1]. Includes functions 'linear', 'easeIn', 'easeOut',
	     *    'easeInOut', 'easeOutBounce', 'spring'.
	     *
	     * @property {object} Curve
	     * @final
	     */
	    TweenTransition.Curves = {
	        linear: function(t) {
	            return t;
	        },
	        easeIn: function(t) {
	            return t*t;
	        },
	        easeOut: function(t) {
	            return t*(2-t);
	        },
	        easeInOut: function(t) {
	            if (t <= 0.5) return 2*t*t;
	            else return -2*t*t + 4*t - 1;
	        },
	        easeOutBounce: function(t) {
	            return t*(3 - 2*t);
	        },
	        spring: function(t) {
	            return (1 - t) * Math.sin(6 * Math.PI * t) + t;
	        }
	    };
	
	    TweenTransition.SUPPORTS_MULTIPLE = true;
	    TweenTransition.DEFAULT_OPTIONS = {
	        curve: TweenTransition.Curves.linear,
	        duration: 500,
	        speed: 0 /* considered only if positive */
	    };
	
	    var registeredCurves = {};
	
	    /**
	     * Add "unit" curve to internal dictionary of registered curves.
	     *
	     * @method registerCurve
	     *
	     * @static
	     *
	     * @param {string} curveName dictionary key
	     * @param {unitCurve} curve function of one numeric variable mapping [0,1]
	     *    to range inside [0,1]
	     * @return {boolean} false if key is taken, else true
	     */
	    TweenTransition.registerCurve = function registerCurve(curveName, curve) {
	        if (!registeredCurves[curveName]) {
	            registeredCurves[curveName] = curve;
	            return true;
	        }
	        else {
	            return false;
	        }
	    };
	
	    /**
	     * Remove object with key "curveName" from internal dictionary of registered
	     *    curves.
	     *
	     * @method unregisterCurve
	     *
	     * @static
	     *
	     * @param {string} curveName dictionary key
	     * @return {boolean} false if key has no dictionary value
	     */
	    TweenTransition.unregisterCurve = function unregisterCurve(curveName) {
	        if (registeredCurves[curveName]) {
	            delete registeredCurves[curveName];
	            return true;
	        }
	        else {
	            return false;
	        }
	    };
	
	    /**
	     * Retrieve function with key "curveName" from internal dictionary of
	     *    registered curves. Default curves are defined in the
	     *    TweenTransition.Curves array, where the values represent
	     *    unitCurve functions.
	     *
	     * @method getCurve
	     *
	     * @static
	     *
	     * @param {string} curveName dictionary key
	     * @return {unitCurve} curve function of one numeric variable mapping [0,1]
	     *    to range inside [0,1]
	     */
	    TweenTransition.getCurve = function getCurve(curveName) {
	        var curve = registeredCurves[curveName];
	        if (curve !== undefined) return curve;
	        else throw new Error('curve not registered');
	    };
	
	    /**
	     * Retrieve all available curves.
	     *
	     * @method getCurves
	     *
	     * @static
	     *
	     * @return {object} curve functions of one numeric variable mapping [0,1]
	     *    to range inside [0,1]
	     */
	    TweenTransition.getCurves = function getCurves() {
	        return registeredCurves;
	    };
	
	     // Interpolate: If a linear function f(0) = a, f(1) = b, then return f(t)
	    function _interpolate(a, b, t) {
	        return ((1 - t) * a) + (t * b);
	    }
	
	    function _clone(obj) {
	        if (obj instanceof Object) {
	            if (obj instanceof Array) return obj.slice(0);
	            else return Object.create(obj);
	        }
	        else return obj;
	    }
	
	    // Fill in missing properties in "transition" with those in defaultTransition, and
	    //   convert internal named curve to function object, returning as new
	    //   object.
	    function _normalize(transition, defaultTransition) {
	        var result = {curve: defaultTransition.curve};
	        if (defaultTransition.duration) result.duration = defaultTransition.duration;
	        if (defaultTransition.speed) result.speed = defaultTransition.speed;
	        if (transition instanceof Object) {
	            if (transition.duration !== undefined) result.duration = transition.duration;
	            if (transition.curve) result.curve = transition.curve;
	            if (transition.speed) result.speed = transition.speed;
	        }
	        if (typeof result.curve === 'string') result.curve = TweenTransition.getCurve(result.curve);
	        return result;
	    }
	
	    /**
	     * Set internal options, overriding any default options.
	     *
	     * @method setOptions
	     *
	     *
	     * @param {Object} options options object
	     * @param {Object} [options.curve] function mapping [0,1] to [0,1] or identifier
	     * @param {Number} [options.duration] duration in ms
	     * @param {Number} [options.speed] speed in pixels per ms
	     */
	    TweenTransition.prototype.setOptions = function setOptions(options) {
	        if (options.curve !== undefined) this.options.curve = options.curve;
	        if (options.duration !== undefined) this.options.duration = options.duration;
	        if (options.speed !== undefined) this.options.speed = options.speed;
	    };
	
	    /**
	     * Add transition to end state to the queue of pending transitions. Special
	     *    Use: calling without a transition resets the object to that state with
	     *    no pending actions
	     *
	     * @method set
	     *
	     *
	     * @param {number|FamousMatrix|Array.Number|Object.<number, number>} endValue
	     *    end state to which we _interpolate
	     * @param {transition=} transition object of type {duration: number, curve:
	     *    f[0,1] -> [0,1] or name}. If transition is omitted, change will be
	     *    instantaneous.
	     * @param {function()=} callback Zero-argument function to call on observed
	     *    completion (t=1)
	     */
	    TweenTransition.prototype.set = function set(endValue, transition, callback) {
	        if (!transition) {
	            this.reset(endValue);
	            if (callback) callback();
	            return;
	        }
	
	        this._startValue = _clone(this.get());
	        transition = _normalize(transition, this.options);
	        if (transition.speed) {
	            var startValue = this._startValue;
	            if (startValue instanceof Object) {
	                var variance = 0;
	                for (var i in startValue) variance += (endValue[i] - startValue[i]) * (endValue[i] - startValue[i]);
	                transition.duration = Math.sqrt(variance) / transition.speed;
	            }
	            else {
	                transition.duration = Math.abs(endValue - startValue) / transition.speed;
	            }
	        }
	
	        this._startTime = Date.now();
	        this._endValue = _clone(endValue);
	        this._startVelocity = _clone(transition.velocity);
	        this._duration = transition.duration;
	        this._curve = transition.curve;
	        this._active = true;
	        this._callback = callback;
	    };
	
	    /**
	     * Cancel all transitions and reset to a stable state
	     *
	     * @method reset
	     *
	     * @param {number|Array.Number|Object.<number, number>} startValue
	     *    starting state
	     * @param {number} startVelocity
	     *    starting velocity
	     */
	    TweenTransition.prototype.reset = function reset(startValue, startVelocity) {
	        if (this._callback) {
	            var callback = this._callback;
	            this._callback = undefined;
	            callback();
	        }
	        this.state = _clone(startValue);
	        this.velocity = _clone(startVelocity);
	        this._startTime = 0;
	        this._duration = 0;
	        this._updateTime = 0;
	        this._startValue = this.state;
	        this._startVelocity = this.velocity;
	        this._endValue = this.state;
	        this._active = false;
	    };
	
	    /**
	     * Get current velocity
	     *
	     * @method getVelocity
	     *
	     * @returns {Number} velocity
	     */
	    TweenTransition.prototype.getVelocity = function getVelocity() {
	        return this.velocity;
	    };
	
	    /**
	     * Get interpolated state of current action at provided time. If the last
	     *    action has completed, invoke its callback.
	     *
	     * @method get
	     *
	     *
	     * @param {number=} timestamp Evaluate the curve at a normalized version of this
	     *    time. If omitted, use current time. (Unix epoch time)
	     * @return {number|Object.<number|string, number>} beginning state
	     *    _interpolated to this point in time.
	     */
	    TweenTransition.prototype.get = function get(timestamp) {
	        this.update(timestamp);
	        return this.state;
	    };
	
	    function _calculateVelocity(current, start, curve, duration, t) {
	        var velocity;
	        var eps = 1e-7;
	        var speed = (curve(t) - curve(t - eps)) / eps;
	        if (current instanceof Array) {
	            velocity = [];
	            for (var i = 0; i < current.length; i++){
	                if (typeof current[i] === 'number')
	                    velocity[i] = speed * (current[i] - start[i]) / duration;
	                else
	                    velocity[i] = 0;
	            }
	
	        }
	        else velocity = speed * (current - start) / duration;
	        return velocity;
	    }
	
	    function _calculateState(start, end, t) {
	        var state;
	        if (start instanceof Array) {
	            state = [];
	            for (var i = 0; i < start.length; i++) {
	                if (typeof start[i] === 'number')
	                    state[i] = _interpolate(start[i], end[i], t);
	                else
	                    state[i] = start[i];
	            }
	        }
	        else state = _interpolate(start, end, t);
	        return state;
	    }
	
	    /**
	     * Update internal state to the provided timestamp. This may invoke the last
	     *    callback and begin a new action.
	     *
	     * @method update
	     *
	     *
	     * @param {number=} timestamp Evaluate the curve at a normalized version of this
	     *    time. If omitted, use current time. (Unix epoch time)
	     */
	    TweenTransition.prototype.update = function update(timestamp) {
	        if (!this._active) {
	            if (this._callback) {
	                var callback = this._callback;
	                this._callback = undefined;
	                callback();
	            }
	            return;
	        }
	
	        if (!timestamp) timestamp = Date.now();
	        if (this._updateTime >= timestamp) return;
	        this._updateTime = timestamp;
	
	        var timeSinceStart = timestamp - this._startTime;
	        if (timeSinceStart >= this._duration) {
	            this.state = this._endValue;
	            this.velocity = _calculateVelocity(this.state, this._startValue, this._curve, this._duration, 1);
	            this._active = false;
	        }
	        else if (timeSinceStart < 0) {
	            this.state = this._startValue;
	            this.velocity = this._startVelocity;
	        }
	        else {
	            var t = timeSinceStart / this._duration;
	            this.state = _calculateState(this._startValue, this._endValue, this._curve(t));
	            this.velocity = _calculateVelocity(this.state, this._startValue, this._curve, this._duration, t);
	        }
	    };
	
	    /**
	     * Is there at least one action pending completion?
	     *
	     * @method isActive
	     *
	     *
	     * @return {boolean}
	     */
	    TweenTransition.prototype.isActive = function isActive() {
	        return this._active;
	    };
	
	    /**
	     * Halt transition at current state and erase all pending actions.
	     *
	     * @method halt
	     *
	     */
	    TweenTransition.prototype.halt = function halt() {
	        this.reset(this.get());
	    };
	
	    // Register all the default curves
	    TweenTransition.registerCurve('linear', TweenTransition.Curves.linear);
	    TweenTransition.registerCurve('easeIn', TweenTransition.Curves.easeIn);
	    TweenTransition.registerCurve('easeOut', TweenTransition.Curves.easeOut);
	    TweenTransition.registerCurve('easeInOut', TweenTransition.Curves.easeInOut);
	    TweenTransition.registerCurve('easeOutBounce', TweenTransition.Curves.easeOutBounce);
	    TweenTransition.registerCurve('spring', TweenTransition.Curves.spring);
	
	    TweenTransition.customCurve = function customCurve(v1, v2) {
	        v1 = v1 || 0; v2 = v2 || 0;
	        return function(t) {
	            return v1*t + (-2*v1 - v2 + 3)*t*t + (v1 + v2 - 2)*t*t*t;
	        };
	    };
	
	    module.exports = TweenTransition;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: mark@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	    /**
	     * A singleton that maintains a global registry of Surfaces.
	     *   Private.
	     *
	     * @private
	     * @static
	     * @class Entity
	     */
	
	    var entities = [];
	
	    /**
	     * Get entity from global index.
	     *
	     * @private
	     * @method get
	     * @param {Number} id entity registration id
	     * @return {Surface} entity in the global index
	     */
	    function get(id) {
	        return entities[id];
	    }
	
	    /**
	     * Overwrite entity in the global index
	     *
	     * @private
	     * @method set
	     * @param {Number} id entity registration id
	     * @param {Surface} entity to add to the global index
	     */
	    function set(id, entity) {
	        entities[id] = entity;
	    }
	
	    /**
	     * Add entity to global index
	     *
	     * @private
	     * @method register
	     * @param {Surface} entity to add to global index
	     * @return {Number} new id
	     */
	    function register(entity) {
	        var id = entities.length;
	        set(id, entity);
	        return id;
	    }
	
	    /**
	     * Remove entity from global index
	     *
	     * @private
	     * @method unregister
	     * @param {Number} id entity registration id
	     */
	    function unregister(id) {
	        set(id, null);
	    }
	
	    module.exports = {
	        register: register,
	        unregister: unregister,
	        get: get,
	        set: set
	    };
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: mark@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	    var Transform = __webpack_require__(18);
	
	    /**
	     *
	     * This object translates the rendering instructions ("render specs")
	     *   that renderable components generate into document update
	     *   instructions ("update specs").  Private.
	     *
	     * @private
	     * @class SpecParser
	     * @constructor
	     */
	    function SpecParser() {
	        this.result = {};
	    }
	    SpecParser._instance = new SpecParser();
	
	    /**
	     * Convert a render spec coming from the context's render chain to an
	     *    update spec for the update chain. This is the only major entry point
	     *    for a consumer of this class.
	     *
	     * @method parse
	     * @static
	     * @private
	     *
	     * @param {renderSpec} spec input render spec
	     * @param {Object} context context to do the parse in
	     * @return {Object} the resulting update spec (if no callback
	     *   specified, else none)
	     */
	    SpecParser.parse = function parse(spec, context) {
	        return SpecParser._instance.parse(spec, context);
	    };
	
	    /**
	     * Convert a renderSpec coming from the context's render chain to an update
	     *    spec for the update chain. This is the only major entrypoint for a
	     *    consumer of this class.
	     *
	     * @method parse
	     *
	     * @private
	     * @param {renderSpec} spec input render spec
	     * @param {Context} context
	     * @return {updateSpec} the resulting update spec
	     */
	    SpecParser.prototype.parse = function parse(spec, context) {
	        this.reset();
	        this._parseSpec(spec, context, Transform.identity);
	        return this.result;
	    };
	
	    /**
	     * Prepare SpecParser for re-use (or first use) by setting internal state
	     *  to blank.
	     *
	     * @private
	     * @method reset
	     */
	    SpecParser.prototype.reset = function reset() {
	        this.result = {};
	    };
	
	    // Multiply matrix M by vector v
	    function _vecInContext(v, m) {
	        return [
	            v[0] * m[0] + v[1] * m[4] + v[2] * m[8],
	            v[0] * m[1] + v[1] * m[5] + v[2] * m[9],
	            v[0] * m[2] + v[1] * m[6] + v[2] * m[10]
	        ];
	    }
	
	    var _zeroZero = [0, 0];
	
	    // From the provided renderSpec tree, recursively compose opacities,
	    //    origins, transforms, and sizes corresponding to each surface id from
	    //    the provided renderSpec tree structure. On completion, those
	    //    properties of 'this' object should be ready to use to build an
	    //    updateSpec.
	    SpecParser.prototype._parseSpec = function _parseSpec(spec, parentContext, sizeContext) {
	        var id;
	        var target;
	        var transform;
	        var opacity;
	        var origin;
	        var align;
	        var size;
	
	        if (typeof spec === 'number') {
	            id = spec;
	            transform = parentContext.transform;
	            align = parentContext.align || _zeroZero;
	            if (parentContext.size && align && (align[0] || align[1])) {
	                var alignAdjust = [align[0] * parentContext.size[0], align[1] * parentContext.size[1], 0];
	                transform = Transform.thenMove(transform, _vecInContext(alignAdjust, sizeContext));
	            }
	            this.result[id] = {
	                transform: transform,
	                opacity: parentContext.opacity,
	                origin: parentContext.origin || _zeroZero,
	                align: parentContext.align || _zeroZero,
	                size: parentContext.size
	            };
	        }
	        else if (!spec) { // placed here so 0 will be cached earlier
	            return;
	        }
	        else if (spec instanceof Array) {
	            for (var i = 0; i < spec.length; i++) {
	                this._parseSpec(spec[i], parentContext, sizeContext);
	            }
	        }
	        else {
	            target = spec.target;
	            transform = parentContext.transform;
	            opacity = parentContext.opacity;
	            origin = parentContext.origin;
	            align = parentContext.align;
	            size = parentContext.size;
	            var nextSizeContext = sizeContext;
	
	            if (spec.opacity !== undefined) opacity = parentContext.opacity * spec.opacity;
	            if (spec.transform) transform = Transform.multiply(parentContext.transform, spec.transform);
	            if (spec.origin) {
	                origin = spec.origin;
	                nextSizeContext = parentContext.transform;
	            }
	            if (spec.align) align = spec.align;
	
	            if (spec.size || spec.proportions) {
	                var parentSize = size;
	                size = [size[0], size[1]];
	
	                if (spec.size) {
	                    if (spec.size[0] !== undefined) size[0] = spec.size[0];
	                    if (spec.size[1] !== undefined) size[1] = spec.size[1];
	                }
	
	                if (spec.proportions) {
	                    if (spec.proportions[0] !== undefined) size[0] = size[0] * spec.proportions[0];
	                    if (spec.proportions[1] !== undefined) size[1] = size[1] * spec.proportions[1];
	                }
	
	                if (parentSize) {
	                    if (align && (align[0] || align[1])) transform = Transform.thenMove(transform, _vecInContext([align[0] * parentSize[0], align[1] * parentSize[1], 0], sizeContext));
	                    if (origin && (origin[0] || origin[1])) transform = Transform.moveThen([-origin[0] * size[0], -origin[1] * size[1], 0], transform);
	                }
	
	                nextSizeContext = parentContext.transform;
	                origin = null;
	                align = null;
	            }
	
	            this._parseSpec(target, {
	                transform: transform,
	                opacity: opacity,
	                origin: origin,
	                align: align,
	                size: size
	            }, nextSizeContext);
	        }
	    };
	
	    module.exports = SpecParser;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_RESULT__;/* This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
	 *
	 * Owner: mark@famo.us
	 * @license MPL 2.0
	 * @copyright Famous Industries, Inc. 2014
	 */
	
	!(__WEBPACK_AMD_DEFINE_RESULT__ = function(require, exports, module) {
	
	    /**
	     * Helper object used to iterate through items sequentially. Used in
	     *   views that deal with layout.  A ViewSequence object conceptually points
	     *   to a node in a linked list.
	     *
	     * @class ViewSequence
	     *
	     * @constructor
	     * @param {Object|Array} options Options object, or content array.
	     * @param {Number} [options.index] starting index.
	     * @param {Number} [options.array] Array of elements to populate the ViewSequence
	     * @param {Object} [options._] Optional backing store (internal
	     * @param {Boolean} [options.loop] Whether to wrap when accessing elements just past the end
	     *   (or beginning) of the sequence.
	     */
	    function ViewSequence(options) {
	        if (!options) options = [];
	        if (options instanceof Array) options = {array: options};
	
	        this._ = null;
	        this.index = options.index || 0;
	
	        if (options.array) this._ = new (this.constructor.Backing)(options.array);
	        else if (options._) this._ = options._;
	
	        if (this.index === this._.firstIndex) this._.firstNode = this;
	        if (this.index === this._.firstIndex + this._.array.length - 1) this._.lastNode = this;
	
	        if (options.loop !== undefined) this._.loop = options.loop;
	
	        if (options.trackSize !== undefined) this._.trackSize = options.trackSize;
	
	        this._previousNode = null;
	        this._nextNode = null;
	    }
	
	    // constructor for internal storage
	    ViewSequence.Backing = function Backing(array) {
	        this.array = array;
	        this.firstIndex = 0;
	        this.loop = false;
	        this.firstNode = null;
	        this.lastNode = null;
	        this.cumulativeSizes = [[0, 0]];
	        this.sizeDirty = true;
	        this.trackSize = false;
	    };
	
	    // Get value "i" slots away from the first index.
	    ViewSequence.Backing.prototype.getValue = function getValue(i) {
	        var _i = i - this.firstIndex;
	        if (_i < 0 || _i >= this.array.length) return null;
	        return this.array[_i];
	    };
	
	    // Set value "i" slots away from the first index.
	    ViewSequence.Backing.prototype.setValue = function setValue(i, value) {
	        this.array[i - this.firstIndex] = value;
	    };
	
	    // Get sequence size from backing up to index
	    // TODO: remove from viewSequence with proper abstraction
	    ViewSequence.Backing.prototype.getSize = function getSize(index) {
	        return this.cumulativeSizes[index];
	    };
	
	    // Calculates cumulative size
	    // TODO: remove from viewSequence with proper abstraction
	    ViewSequence.Backing.prototype.calculateSize = function calculateSize(index) {
	        index = index || this.array.length;
	        var size = [0, 0];
	        for (var i = 0; i < index; i++) {
	            var nodeSize = this.array[i].getSize();
	            if (!nodeSize) return undefined;
	            if (size[0] !== undefined) {
	                if (nodeSize[0] === undefined) size[0] = undefined;
	                else size[0] += nodeSize[0];
	            }
	            if (size[1] !== undefined) {
	                if (nodeSize[1] === undefined) size[1] = undefined;
	                else size[1] += nodeSize[1];
	            }
	            this.cumulativeSizes[i + 1] = size.slice();
	        }
	        this.sizeDirty = false;
	        return size;
	    };
	
	    // After splicing into the backing store, restore the indexes of each node correctly.
	    ViewSequence.Backing.prototype.reindex = function reindex(start, removeCount, insertCount) {
	        if (!this.array[0]) return;
	
	        var i = 0;
	        var index = this.firstIndex;
	        var indexShiftAmount = insertCount - removeCount;
	        var node = this.firstNode;
	
	        // find node to begin
	        while (index < start - 1) {
	            node = node.getNext();
	            index++;
	        }
	        // skip removed nodes
	        var spliceStartNode = node;
	        for (i = 0; i < removeCount; i++) {
	            node = node.getNext();
	            if (node) node._previousNode = spliceStartNode;
	        }
	        var spliceResumeNode = node ? node.getNext() : null;
	        // generate nodes for inserted items
	        spliceStartNode._nextNode = null;
	        node = spliceStartNode;
	        for (i = 0; i < insertCount; i++) node = node.getNext();
	        index += insertCount;
	        // resume the chain
	        if (node !== spliceResumeNode) {
	            node._nextNode = spliceResumeNode;
	            if (spliceResumeNode) spliceResumeNode._previousNode = node;
	        }
	        if (spliceResumeNode) {
	            node = spliceResumeNode;
	            index++;
	            while (node && index < this.array.length + this.firstIndex) {
	                if (node._nextNode) node.index += indexShiftAmount;
	                else node.index = index;
	                node = node.getNext();
	                index++;
	            }
	        }
	        if (this.trackSize) this.sizeDirty = true;
	    };
	
	    /**
	     * Return ViewSequence node previous to this node in the list, respecting looping if applied.
	     *
	     * @method getPrevious
	     * @return {ViewSequence} previous node.
	     */
	    ViewSequence.prototype.getPrevious = function getPrevious() {
	        var len = this._.array.length;
	        if (!len) {
	            this._previousNode = null;
	        }
	        else if (this.index === this._.firstIndex) {
	            if (this._.loop) {
	                this._previousNode = this._.lastNode || new (this.constructor)({_: this._, index: this._.firstIndex + len - 1});
	                this._previousNode._nextNode = this;
	            }
	            else {
	                this._previousNode = null;
	            }
	        }
	        else if (!this._previousNode) {
	            this._previousNode = new (this.constructor)({_: this._, index: this.index - 1});
	            this._previousNode._nextNode = this;
	        }
	        return this._previousNode;
	    };
	
	    /**
	     * Return ViewSequence node next after this node in the list, respecting looping if applied.
	     *
	     * @method getNext
	     * @return {ViewSequence} previous node.
	     */
	    ViewSequence.prototype.getNext = function getNext() {
	        var len = this._.array.length;
	        if (!len) {
	            this._nextNode = null;
	        }
	        else if (this.index === this._.firstIndex + len - 1) {
	            if (this._.loop) {
	                this._nextNode = this._.firstNode || new (this.constructor)({_: this._, index: this._.firstIndex});
	                this._nextNode._previousNode = this;
	            }
	            else {
	                this._nextNode = null;
	            }
	        }
	        else if (!this._nextNode) {
	            this._nextNode = new (this.constructor)({_: this._, index: this.index + 1});
	            this._nextNode._previousNode = this;
	        }
	        return this._nextNode;
	    };
	
	    /**
	     * Return index of the provided item in the backing array
	     *
	     * @method indexOf
	     * @return {Number} index or -1 if not found
	     */
	    ViewSequence.prototype.indexOf = function indexOf(item) {
	        return this._.array.indexOf(item);
	    };
	
	    /**
	     * Return index of this ViewSequence node.
	     *
	     * @method getIndex
	     * @return {Number} index
	     */
	    ViewSequence.prototype.getIndex = function getIndex() {
	        return this.index;
	    };
	
	    /**
	     * Return printable version of this ViewSequence node.
	     *
	     * @method toString
	     * @return {string} this index as a string
	     */
	    ViewSequence.prototype.toString = function toString() {
	        return '' + this.index;
	    };
	
	    /**
	     * Add one or more objects to the beginning of the sequence.
	     *
	     * @method unshift
	     * @param {...Object} value arguments array of objects
	     */
	    ViewSequence.prototype.unshift = function unshift(value) {
	        this._.array.unshift.apply(this._.array, arguments);
	        this._.firstIndex -= arguments.length;
	        if (this._.trackSize) this._.sizeDirty = true;
	    };
	
	    /**
	     * Add one or more objects to the end of the sequence.
	     *
	     * @method push
	     * @param {...Object} value arguments array of objects
	     */
	    ViewSequence.prototype.push = function push(value) {
	        this._.array.push.apply(this._.array, arguments);
	        if (this._.trackSize) this._.sizeDirty = true;
	    };
	
	    /**
	     * Remove objects from the sequence
	     *
	     * @method splice
	     * @param {Number} index starting index for removal
	     * @param {Number} howMany how many elements to remove
	     * @param {...Object} value arguments array of objects
	     */
	    ViewSequence.prototype.splice = function splice(index, howMany) {
	        var values = Array.prototype.slice.call(arguments, 2);
	        this._.array.splice.apply(this._.array, [index - this._.firstIndex, howMany].concat(values));
	        this._.reindex(index, howMany, values.length);
	    };
	
	    /**
	     * Exchange this element's sequence position with another's.
	     *
	     * @method swap
	     * @param {ViewSequence} other element to swap with.
	     */
	    ViewSequence.prototype.swap = function swap(other) {
	        var otherValue = other.get();
	        var myValue = this.get();
	        this._.setValue(this.index, otherValue);
	        this._.setValue(other.index, myValue);
	
	        var myPrevious = this._previousNode;
	        var myNext = this._nextNode;
	        var myIndex = this.index;
	        var otherPrevious = other._previousNode;
	        var otherNext = other._nextNode;
	        var otherIndex = other.index;
	
	        this.index = otherIndex;
	        this._previousNode = (otherPrevious === this) ? other : otherPrevious;
	        if (this._previousNode) this._previousNode._nextNode = this;
	        this._nextNode = (otherNext === this) ? other : otherNext;
	        if (this._nextNode) this._nextNode._previousNode = this;
	
	        other.index = myIndex;
	        other._previousNode = (myPrevious === other) ? this : myPrevious;
	        if (other._previousNode) other._previousNode._nextNode = other;
	        other._nextNode = (myNext === other) ? this : myNext;
	        if (other._nextNode) other._nextNode._previousNode = other;
	
	        if (this.index === this._.firstIndex) this._.firstNode = this;
	        else if (this.index === this._.firstIndex + this._.array.length - 1) this._.lastNode = this;
	        if (other.index === this._.firstIndex) this._.firstNode = other;
	        else if (other.index === this._.firstIndex + this._.array.length - 1) this._.lastNode = other;
	        if (this._.trackSize) this._.sizeDirty = true;
	    };
	
	   /**
	     * Return value of this ViewSequence node.
	     *
	     * @method get
	     * @return {Object} value of thiss
	     */
	    ViewSequence.prototype.get = function get() {
	        return this._.getValue(this.index);
	    };
	
	   /**
	     * Call getSize() on the contained View.
	     *
	     * @method getSize
	     * @return {Array.Number} [width, height]
	     */
	    ViewSequence.prototype.getSize = function getSize() {
	        var target = this.get();
	        return target ? target.getSize() : null;
	    };
	
	    /**
	     * Generate a render spec from the contents of this component.
	     * Specifically, this will render the value at the current index.
	     * @private
	     * @method render
	     * @return {number} Render spec for this component
	     */
	    ViewSequence.prototype.render = function render() {
	        if (this._.trackSize && this._.sizeDirty) this._.calculateSize();
	        var target = this.get();
	        return target ? target.render.apply(target, arguments) : null;
	    };
	
	    module.exports = ViewSequence;
	}.call(exports, __webpack_require__, exports, module), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));


/***/ }
/******/ ])
//# sourceMappingURL=main.js.map
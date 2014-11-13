/*!
 * module deps
 */

var SequentialLayout = require('famous/views/SequentialLayout');
var Transitionable = require('famous/transitions/Transitionable');
var OptionsManager = require('famous/core/OptionsManager');
var Transform = require('famous/core/Transform');
var Utility = require('famous/utilities/Utility');

/*!
 * private
 */

function _getState(returnFinal) {
  if (returnFinal) return this._isOpen ? 1 : 0;
  else return this.state.get();
}

function _setState(pos, transition, callback) {
  if (this.state) this.state.halt();
  this.state = new Transitionable(0);
  this.state.set(pos, transition, callback);
}

/**
 * List Constructor
 */

function List() {
  SequentialLayout.apply(this, arguments);

  this.state = new Transitionable(0);
  this._isOpen = false;
  this._openIndex = -1;

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
 * open one by one
 */

List.prototype.openOne = function() {
  this._openIndex++;

  this.setOutputFunction(function(input, offset, index) {

    var state, transform;

    if (index < this._openIndex) {
      state = 1;
    } else if (index > this._openIndex) {
      state = 0;
    } else {
      state = _getState.call(this);
    }

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

   _setState.call(this, 1, this.options.transition);
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
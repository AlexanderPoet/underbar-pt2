const { each } = require('./underbar-pt1');

/** 
 * OBJECTS
 * =======
 *
 * In this section, we'll look at a couple of helpers for merging objects.
 */

// Extend a given object with all the properties of the passed in
// object(s).
//
// Example:
//   var obj1 = {key1: "something"};
//   _.extend(obj1, {
//     key2: "something new",
//     key3: "something else new"
//   }, {
//     bla: "even more stuff"
//   }); // obj1 now contains key1, key2, key3 and bla
const extend = function(obj) {
  // Your code here
  // Hint: remember that Array.from can convert an array-like object to handy-dandy array for you.
  const currentObject = Array.from(arguments).slice(1);
  each(currentObject, function(object) {
    each(object, function(value, key) {
      obj[key] = value;
    });
  });
  return obj;
};

// Like extend, but doesn't ever overwrite a key that already
// exists in obj
const defaults = function(obj) {
  // Your code here
  const currentObject = Array.from(arguments).slice(1);
  each(currentObject, function(object) {
    each(object, function(value, key) {
      obj[key] === undefined ? obj[key] = value : obj[key] = obj[key];
    });
  });
  return obj;
};


/**
 * FUNCTIONS
 * =========
 *
 * Now we're getting into function decorators, which take in any function
 * and return out a new version of the function that works somewhat differently
 */

// Return a function that can be called at most one time. Subsequent calls
// should return the previously returned value.
const once = function(func) {
  // Hint: you're going to need to return another function that you create inside this function.
  let calledBefore = false;
  let closedFuncResult;
  
  return function() {
    if (!calledBefore) {
      closedFuncResult = func.apply(this, arguments);
      calledBefore = true;
    }
    return closedFuncResult;
  }
};

// Memorize an expensive function's results by storing them. You may assume
// that the function only takes primitives as arguments.
// memoize could be renamed to oncePerUniqueArgumentList; memoize does the
// same thing as once, but based on many sets of unique arguments.
//
// _.memoize should return a function that, when called, will check if it has
// already computed the result for the given argument and return that value
// instead if possible.
const memoize = function(func) {
  // Hint: look up Function.apply
  // Your code here
  let pastResults = {};

  return function() {
    let key = JSON.stringify(arguments);
    if (!pastResults[key]) {
      pastResults[key] = func.apply(this, arguments);
    }
    return pastResults[key];
  }
};

// Delays a function for the given number of milliseconds, and then calls
// it with the arguments supplied.
//
// The arguments for the original function are passed after the wait
// parameter. For example _.delay(someFunction, 500, 'a', 'b') will
// call someFunction('a', 'b') after 500ms
const delay = function(func, wait) {
  // Hint: delay things with the global function setTimeout()
  // Hint: look up Function.apply
  let args = [...arguments]
    return setTimeout(function () {
      func.apply(this, args.slice(2, args.length))},wait);
    
};

// Randomizes the order of an array's contents.
//
// TIP: This function's test suite will ask that you not modify the original
// input array. For a tip on how to make a copy of an array, see:
// http://mdn.io/Array.prototype.slice
const shuffle = function(arr) {
  // Hint: See http://bost.ocks.org/mike/shuffle/ for an in-depth explanation of the
  // Fisher-Yates Shuffle
  let copy = arr.slice();
  let currentIndex = arr.length - 1;
  let temp, tradeSpot;

  while (currentIndex) {
    tradeSpot = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temp = copy[currentIndex];
    copy[currentIndex] = copy[tradeSpot];
    copy[tradeSpot] = temp;
  }

  return copy;
};

module.exports = {
  extend: extend,
  defaults: defaults,
  once: once,
  memoize: memoize,
  delay: delay,
  shuffle: shuffle
};

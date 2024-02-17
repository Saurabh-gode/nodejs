// function in JS
// function are fisrt-class function in JS
// this means that the function can be passed as a parameteter to another function also
// can be used like a variable and can be declared inside another function

// Q1 - what is a callback function
const d = () => {
  console.log(d);
};
function a(callbackFn) {}
a(d);
// function passed as parameter to another function
// d is a callback function

// Q2 - What is Function Declaration?
function funD(num) {
  return num * num;
}
funD();
//

// Q3 - What is Function expression?
const funE = (num) => {}; // arrow function
const funE2 = function (num) {};
funE();
funE2();
//

// IIFE -> Immediately invoked functions
(() => {
  console.log("IIFEE");
})();
//

// params vs arguments
function F(param) {
  // params
  console.log(param);
}
F(2);
// here 2 is a arguments passed to the function

// arrow function
function notArrow() {
  return "not arrow";
}
const arrow = () => {
  return "arrow";
};

// arguments
function notArrow2() {
  console.log(arguments);
  // this prins the arguments
}
notArrow2(1, 2, 3);
//

// arguments with arrow?
const arrow2 = () => {
  console.log(arguments);

  // results in error that arguments is not found.
};
// in case of arrow fn "arguments" is not available
//

// this keyword
let obj = {
  key1: "i am a value",
  arrow: () => {
    console.log(this.key1);
    // above line results with undefined
    // "this" pointing to global obj in arr-fun
  },
  notArrow: function () {
    console.log(this.key1);
    // here it prints value of key1
    // "this" pointing to the current obj
  },
};
obj.arrow();
obj.notArrow();
//

// once polyfill

function once(callback, context) {
  let ran;
  return function () {
    if (callback) {
      ran = callback.apply(context || this, arguments);
      callback = null;
    }
    return ran;
  };
}

const hello = once(() => {
  console.log("hello");
});

hello();
hello();
hello();

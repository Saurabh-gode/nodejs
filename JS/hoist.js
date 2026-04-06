// test();
// function test() {
//   console.log("logging");
// }
// this works

// function varTest() {
//   var x = 10;
//   var x; // this works does not throw error for using the same variable name
//   console.log("X is " + x); and we get 10 here. above line does not overrider value with undefined
// }

// function letTest() {
//   let x = 10;
//   // let x; // this does not work throws compile time error.
//   console.log("X is " + x);
// }

// varTest();
// letTest();



// var x = 10;
// function test() {
//   if (x === undefined) {
//     var x = 6; // local scope shadows global variables because of the "re-declaration"
//     return x;
//   } else {
//     return 10;
//   }
// }
// console.log("x is : ", test()); // prints 6



// {
//    TDZ Start
//   const func = () => console.log(letvar);
//    TDZ end
//   let letvar = 3; // TDZ end
//   func(); // prints 3
// }

var n1 = 20;
var n2 = 3;
function getScore() {
  var n1 = 2;
  var n2 = 3;
  function add() {
    return n1 + n2;
  }
  return add();
}

console.log(getScore());

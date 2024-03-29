// test();
// function test() {
//   console.log("logging");
// }
// this works

// function varTest() {
//   var x = 10;
//   var x; // this works does not throw error for using the save variable name
//   console.log("X is " + x);
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
//     return 6;
//   } else {
//     return 10;
//   }
// }

// console.log("x is : ", test()); // prints 6

{
  const func = () => console.log(letvar);
  let letvar = 3;
  func();
}

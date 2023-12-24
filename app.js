// const promise1 = Promise.reject("hi Saurabh");

// promise1
//   .then(() => console.log("success then called"))
//   .catch(() => console.log("promise failure catched"));

// const promise = new Promise((resolve, reject) => {
//   //   resolve("Promise resolved.");
//   //   reject("Promise Rejected");

//   setTimeout(() => {
//     resolve("promise resolved after 2000ms");
//   }, 2000);
// });

// promise
//   .then((data) => console.log("then " + data))
//   .catch((err) => console.log("catched " + err));

//custom implementations..

// const pushValues = (srcArray, destArray) => {
//   for (let i = 0; i < destArray.length; i++) {
//     srcArray[srcArray.length] = destArray[i];
//   }
// };

// Array.prototype.customConcat = function () {
//   const args = arguments;
//   let ref = this;

//   for (let i = 0; i < args.length; i++) {
//     if (Array.isArray(args[i])) {
//       pushValues(ref, args[i]);
//     } else {
//       ref[ref.length] = args[i];
//     }
//   }
// };

// Array.prototype.customMap = function (callBackFn) {
//   const args = arguments;
//   const tempOutput = [];
//   for (let i = 0; i < this.length; i++) {
//     tempOutput.push(callBackFn(this[i], i, this));
//   }

//   return tempOutput;
// };

// const x = [1, 2, 3];
// const y = [4, 5, 6];
// const value = "y";
// const value2 = "saurabh";
// const value3 = null;
// const value4 = undefined;
// const valueFn = () => {};

// x.customConcat(y, value, value2, value3, value4, valueFn);

// let z = x.customMap((data) => {
//   return data;
// });
// console.log(z);

const EventEmmiter = require("events");
// const EventEmmiter = require("./eventEmmiter/index");

class Emmiter extends EventEmmiter {}

const myEvent = new Emmiter();

// myEvent.on("foo", () => {
//   console.log("foo");
// });

// myEvent.on("foo", () => {
//   console.log("foo 2");
// });

// myEvent.on("foo", (x) => {
//   console.log("foo with x:", x);
// });

myEvent.once("foo", () => {
  console.log("foo");
});

myEvent.once("foo", () => {
  console.log("foo 2");
});

myEvent.once("foo", (x) => {
  console.log("foo with x:", x);
});

console.log(JSON.stringify(myEvent));

myEvent.emit("foo");
myEvent.emit("foo", "x");

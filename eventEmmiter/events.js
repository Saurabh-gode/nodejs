const EventEmmiter = require("events");

class Emmiter extends EventEmmiter {
  constructor() {
    super();
  }
  customFunction = () => console.log("just a log from custom function");
}

const myEmmiter = new Emmiter();

myEmmiter.on("data", (ifSomeData) => {
  console.log("hey i am a 'data' Event callback", ifSomeData || " ");
});

myEmmiter.customFunction();

myEmmiter.emit("data");
myEmmiter.emit("data", "This is some data");

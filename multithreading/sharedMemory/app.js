const { Worker } = require("worker_threads");
const { Buffer } = require("buffer");


// directly using the sharedArrayBuffer is not easier for any data manipulations.
// so we are converting it into a Buffer for easier data manipulation operations like splitting, converting, adding-subing etc.
const data = Buffer.from(new SharedArrayBuffer(8));

// if we use the ArrayBuffers it will pass new copied data.
// const data = Buffer.from(new ArrayBuffer(8));



console.log("Original data: ", data)

for (let index = 0; index < 8; index++) {

    // we are not copying and passing new data. we r only passing reference of the data.
    new Worker("./calc.js", { workerData: { data: data.buffer } })
}

setTimeout(()=>{
    console.log('Data after 1 second.', data)
}, 1000)
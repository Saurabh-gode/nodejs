const { Worker } = require("worker_threads");

const number = new Uint32Array(new SharedArrayBuffer(4)) // 32-bit number
const seal = new SharedArrayBuffer(4)
    
const THREADS = 6;
let completed = 0;


for (let index = 0; index < THREADS; index++) {
    const worker = new Worker("./thread.js", {
        workerData: {
            number: number.buffer, seal
        }
    });

    worker.on("exit", () =>
    {
        completed++;

        if (completed === THREADS) {
            console.log('Final number is: ', number[0]);
        }
    });

}


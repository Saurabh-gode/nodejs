const { Worker } = require("worker_threads");
const { performance } = require("perf_hooks");

process.title = "node-rs";


const THREADS = 4;
const count = 1000000;
let completed = 0;


for (let i = 0; i < THREADS; i++) {
    const start = performance.now();

    const worker = new Worker("./calc.js", {
        workerData: {
            count: count / THREADS,
            hostname: "localhost",
            port: "8090",
            path: "/api/get-json-data",
            method: "GET"
        },
    });

    const threadId = worker.threadId;
    console.log(`Worker ${threadId} started.`)

    worker.on("message", (msg) => {
        console.log('msg', msg)
    })

    worker.on("exit", (code) => {
        console.log(`Worker ${threadId} exited.`);
        completed++;

        if (completed === THREADS) {
            console.log(`Time taken: ${(performance.now() - start) / 1000}s`)
        }

        if (code !== 0) {
            console.log(`Worker exited with code ${code}`)
        }

    })

}



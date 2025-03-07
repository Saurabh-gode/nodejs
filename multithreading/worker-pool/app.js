const Pool = require("./pool");
const { performance } = require("perf_hooks");

const numWorker = 4;

const pool = new Pool(numWorker);

const totalTasks = 200_000;
let result = [];
let taskDoneCount = 0;
const start = performance.now();

for (let i = 0; i < totalTasks; i++) {

    pool.submit("generatePrimes",
        {
            count: 10,
            start: 10_000_000_000,
            format: true,
            log: false
        },
        (primes) => {
            console.log('primes are generated.');

            console.log(performance.eventLoopUtilization())

            taskDoneCount++;
            result = result.concat(primes);

            if (taskDoneCount === totalTasks) {
                console.log(`Time taken: ${performance.now()- start}ms`)
                console.log(result.sort());
                process.exit(0);
            }
        }
    )
}

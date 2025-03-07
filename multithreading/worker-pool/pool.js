const path = require("path");
const { Worker } = require("worker_threads");

class Pool {
    constructor(threadCount) {
        this.threadCount = threadCount; // number of threads to be spawned.
        this.threads = []; // all of our worker threads ( same length as our threadcount)
        this.idleThreads = []; // threads that are not currently working.
        this.scheduledTasks = []; // queue of tasks that need to be executed.

        // spawn threads
        for (let i = 0; i < threadCount; i++) {
            this.spawnThread();
        }

    }

    spawnThread() {
        const worker = new Worker(path.join(__dirname, "calc.js"));

        // When we get a message from a worker, it means that it has finished its task.

        worker.on("message", (result) => {

            const { callback } = worker.currentTask;

            if (callback) {
                callback(result);
            }

            this.idleThreads.push(worker);
            this.runNextTask();
        });

        this.threads.push(worker);
        this.idleThreads.push(worker); // initially all threads are idle.
    }


    runNextTask() {
        if (this.scheduledTasks.length > 0 && this.idleThreads.length > 0) {
            const worker = this.idleThreads.shift();
            const { taskName, options, callback } = this.scheduledTasks.shift();

            worker.currentTask = { taskName, options, callback };

            // tell worker to start executing that task.
            worker.postMessage({ taskName, options })

        }
    }


    submit(taskName, options, callback) {
        this.scheduledTasks.push({ taskName, options, callback });
        this.runNextTask();
    }
}

module.exports = Pool;

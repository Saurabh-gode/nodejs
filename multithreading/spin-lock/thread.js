const { workerData } = require("worker_threads")

const number = new Uint32Array(workerData.number);
const seal = new Int32Array(workerData.seal);

// semaphore: a semaphore is a counter that helps control access to a shared resource by multiple threads in a concurrent system such as a multithreaded application.

// binary-semaphore: will have have only 0/1 etc.
// counting-semaphore: Has a counter that can go above 1.

// mutex: is a special type of a binary semaphore, in which a thread which locks is the same who unlocks. 


// semaphore (binary semaphores) 0-1 to wake and suspend number of threads.
const lock = (seal) =>
{

    // if seal is 0, stores 1 to it. Always returns old value.
    while (Atomics.compareExchange(seal, 0, 0, 1) === 1) {
        Atomics.wait(seal, 0, 1); // if seal is 1. stops the execution
    }
}


const unlock = (seal) =>
{
    Atomics.store(seal, 0, 0) // unseal(set the seal back to 0 )

    // wakeup one thread.
    Atomics.notify(seal, 0, 1)
}



for (let index = 0; index < 5_000_000; index++) {

    // apply lock
    lock(seal);

    number[0] = number[0] + 1;

    // unlock when the operation is done.
    unlock(seal);

}


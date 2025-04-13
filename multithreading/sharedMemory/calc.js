const { workerData, threadId } = require("worker_threads");

const data = Buffer.from(workerData.data);

console.log(`Thread ${threadId} data: `, data);

data[threadId] = 255;

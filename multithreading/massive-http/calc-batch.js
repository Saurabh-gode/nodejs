const { workerData } = require("worker_threads");
const sendRequest = require("./sendRequest");


async function sendBatchRequest(count) {
    try {

        const requestPromises = [];

        for (let i = 0; i < count; i++) {
            requestPromises.push(
                sendRequest(
                    workerData.hostname,
                    workerData.port,
                    workerData.path,
                    workerData.method
                )
            );
        }

        await Promise.all(requestPromises);

    } catch (err) {
        console.log('err', err)
    }
}

(async () => {
    let requestRemaining = workerData.count;
    const batchSize = 150;
    const batches = Math.ceil(workerData.count / batchSize);

    for (let i = 0; i < batches; i++) {

        const reqToSendbatch = Math.min(
            batchSize,
            workerData.count,
            requestRemaining
        );

        await sendBatchRequest(reqToSendbatch);

        requestRemaining -= reqToSendbatch;


    }

})();
const { workerData } = require("worker_threads");
const sendRequest = require("./sendRequest");

(async () => {
    try {
        for (let i = 0; i < workerData.count; i++) {
            await sendRequest(
                workerData.hostname,
                workerData.port,
                workerData.path,
                workerData.method
            )
        }
    } catch (err) {
        console.log('err', err)
    }
})();
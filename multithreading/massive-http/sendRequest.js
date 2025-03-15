const http = require("http");

function sendRequest(hostname, port, path, method) {
    return new Promise((resolve, reject) => {
        const options = {
            hostname,
            port,
            path,
            method
        };


        const req = http.request(options, (res) => {
            const result = []
            res.on("data", (dataChunks) => {
                result.push(dataChunks);
            })

            res.on("end", () => {
                resolve(Buffer.concat(result).toString("utf-8"));
            })
        })
        
        req.on("error", (e) => {
            reject(e);
        });

        req.end();

    })
}

module.exports = sendRequest


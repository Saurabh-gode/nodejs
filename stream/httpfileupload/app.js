const http = require("http");
const fs = require("fs");

const httpServer = http.createServer();
httpServer.on("listening", () => console.log("listening"));
httpServer.on("request", (req, res) => {
  if (req.url === "/") {
    res.end(fs.readFileSync("app.html"));
    return;
  }

  if (req.url === "/upload") {
    const fileNameHeader = req.headers["file-name"];
    req.on("data", (chunk) => {
      fs.appendFile(fileNameHeader, chunk, () => {
        console.log("chunk appended");
      });
    });

    res.end("chunk Saved");
    return;
  }
});

httpServer.listen(8080);

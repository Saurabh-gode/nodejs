const http = require("node:http");

const server = http.createServer((req, res) => {});

server.on("request", (request, response) => {
  console.log("--------------Method: -------------");
  console.log(request.method);
  console.log("--------------Url: -------------");
  console.log(request.url);
  console.log("--------------headers: -------------");
  console.log(request.headers);
  console.log("--------------BODY: -------------");

  let data = "";
  request.on("data", (chunk) => {
    console.log(chunk.toString("utf-8"));
    data += chunk.toString();
  });

  request.on("end", () => {
    data = JSON.parse(data);

    response.writeHead(200, {
      "Content-Type": "application/json",
    });
    response.end(JSON.stringify({ message: "success" }));
  });
});

server.listen(8050, () => {
  console.log("server is up and running :)");
});

const http = require("node:http");

const agent = new http.Agent({ keepAlive: true });

// this is a duplex stream request object
const request = http.request({
  agent: agent,
  hostname: "localhost",
  port: 8050,
  method: "POST",
  path: "/create-post",
  headers: {
    "Content-Type": "application/json",
  },
});

// this event is emmited only once
request.on("response", (response) => {});

// request.write(JSON.stringify({ message: "Hii there!" }));
// request.write(JSON.stringify({ message: "How are you doing?" }));
// request.write(JSON.stringify({ message: "Hii there!" }));

request.end(JSON.stringify({ message: "this is the last message!" }));

request.on("response", (response) => {
  console.log("--------------headers: -------------");
  console.log(response.headers);
  console.log("--------------statusCode: -------------");
  console.log(response.statusCode);
  console.log(response.statusMessage);
  console.log("--------------BODY: -------------");

  let body = "";
  response.on("data", (chunk) => {
    body += chunk.toString("utf-8");
  });

  response.on("end", () => {
    console.log(JSON.parse(body));
    console.log(" no more data");
  });
});

const net = require("node:net");

const socket = net.createConnection({ host: "127.0.0.1", port: 8000 }, () =>
{
  const reqBody = Buffer.from(JSON.stringify({
    message: "this is the last message!"
  }));

  const reqHead = Buffer.from(
    `POST / HTTP/1.1\r\n` +
    `Host: localhost:8000\r\n` +
    `Content-Type: application/json\r\n` +
    `Content-Length: ${reqBody.length}\r\n` +
    `Connection: close\r\n` +
    `\r\n`
  );

  socket.write(Buffer.concat([reqHead, reqBody]));
});

socket.on("data", (chunk) =>
{
  console.log("Received Response");
  console.log(chunk.toString("utf-8"));
});

socket.on("end", () =>
{
  console.log("connection closed");
});

socket.on("error", (err) =>
{
  console.error("Socket error:", err);
});
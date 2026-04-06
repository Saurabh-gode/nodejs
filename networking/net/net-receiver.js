const net = require("node:net");

const server = net.createServer((socket) =>
{
  socket.on("data", (data) =>
  {
    console.log(data.toString("utf-8"));

    const body = JSON.stringify({
      message: "this is response from the server!!",
    });

    const respHead = Buffer.from(
      `HTTP/1.1 200 OK\r\n` +
      `Content-Type: application/json; charset=utf-8\r\n` +
      `Content-Length: ${Buffer.byteLength(body)}\r\n` +
      `Connection: close\r\n` +
      `\r\n`
    );

    const respBody = Buffer.from(body);

    socket.write(Buffer.concat([respHead, respBody]));
    socket.end();
  });
});

server.listen(8000, "127.0.0.1", () =>
{
  console.log("opened server on", server.address());
});
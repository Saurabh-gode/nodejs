const net = require("node:net");

const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    console.log(data.toString("utf-8"));
  });

  const respHead = Buffer.from(
    '"Content-Type": "application/json; charset=utf-8" "transfer-encoding": "chunked"'
  );

  const respBody = Buffer.from("this is response from the server!!", "utf-8");
  socket.write(Buffer.concat[(respHead, respBody)]);
});

server.listen(8000, "127.0.0.1", () => {
  console.log("opened server on", server.address());
});

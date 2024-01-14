const net = require("net"); // lowest level and that is why so powerfull

const server = net.createServer((socket) => {
  socket.on("data", (data) => {
    // this will be executed everytime data is will be received on our server
    console.log(data.toString("utf-8"));
  });
});
// this createServer fn takes one parameter that is a socket.
// and this socket is actually a duplex stream.
// we can send and receive data

server.listen(3000, "127.0.0.1", () => {
  console.log("opened server on", server.address());
});
// opened server on { address: '127.0.0.1', family: 'IPv4', port: 3000 }

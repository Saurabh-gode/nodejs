const net = require("node:net");

const server = net.createServer();
// creates a server
// this server is an EventEmmiter object.

// array of client socket objs
const clients = [];

server.on("connection", (socket) => {
  console.log("A new client is connected to the server.");

  const clientId = clients.length + 1;

  socket.write(`id-${clientId}`);

  clients.forEach((client) => {
    client.socket.write(`$user_${client.id} joined`);
  });

  socket.on("data", (data) => {
    const dataString = data.toString("utf-8");
    const id = dataString.toString("utf-8").substring(0, dataString.indexOf("-"));
    const message = dataString.substring(dataString.indexOf("-message-") + 9);

    clients.map((client) => {
      client.socket.write(`> $user_${id}: ${message}`);
    });
  });

  clients.push({ id: clientId.toString(), socket });

  socket.on("end", () => {
    clients.forEach((client) => {
      client.socket.write(`$user_${client.id} left`);
    });
  });
});

server.listen(3008, "127.0.0.1", () => {
  console.log("opened server on ", server.address());
});

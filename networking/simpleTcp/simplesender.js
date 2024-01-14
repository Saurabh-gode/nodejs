const net = require("node:net");

const socket = net.createConnection({ host: "127.0.0.1", port: 3000 }, () => {
  socket.write("A simple message for simpleserver.");
});

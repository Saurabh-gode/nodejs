const net = require("node:net");
const { stdin, stdout } = require("node:process");
const readline = require("readline/promises");

const rl = readline.createInterface({
  input: stdin,
  output: stdout,
});

const clearLine = (dir) => {
  return new Promise((resolve, reject) => {
    stdout.clearLine(dir, () => {
      resolve();
    });
  });
};

const moveCursor = (dx, dy) => {
  return new Promise((resolve, reject) => {
    stdout.moveCursor(dx, dy, () => {
      resolve();
    });
  });
};

let id;

const socket = net.createConnection({ host: "127.0.0.1", port: 3008 }, async () => {
  console.log("connected to the server");

  const ask = async () => {
    const message = await rl.question("Enter a message > ");

    // move cursor to above line to cleanLine to do its job.
    await moveCursor(0, -1);

    // clear line in terminal
    await clearLine(0);
    socket.write(`${id}-message-${message}`, (err) => {
      err && console.log("error sending msg:", err);
    });
  };

  ask();

  socket.on("data", async (data) => {
    // move cursor to above line to cleanLine to do its job.
    console.log();
    await moveCursor(0, -1);

    // clear line in terminal
    await clearLine(0);

    if (data.toString("utf-8").substring(0, 2) === "id") {
      // when we are getting the id...
      id = data.toString("utf-8").substring(3); //
      console.log(`your id is ${id}\n`);
    } else {
      // when we are getting the message

      console.log(data.toString("utf-8"));
    }

    ask();
  });
});
// creates a connection to the server
// without a server it will throw err.

socket.on("end", () => {
  console.log("Connection ended!");
});

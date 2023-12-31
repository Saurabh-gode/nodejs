// const fs = require("node:fs/promises");
const fs = require("fs");

// (async () => {
//   const filehandle = await fs.open("./challenge.txt", "w");

//   console.time("write_benchmark");
//   for (let i = 0; i < 1000000 + 1; i++) {
//     const writeMillionlinesToFile = await filehandle.write(` ${i} `);
//   }
//   console.timeEnd("write_benchmark");
// })();

// huge difference in both codes "15s" from promises to "1s" in callback

(async () => {
  console.time("write_benchmark");
  fs.open("./challenge.txt", "w", (err, fileDescriptor) => {
    for (let i = 0; i < 1000000 + 1; i++) {
      fs.write(fileDescriptor, ` ${i} `, (err) => {
        err && console.log(err);
      });
    }
    console.timeEnd("write_benchmark");
  });
})();

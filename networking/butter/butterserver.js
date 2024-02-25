const Butter = require("./Butter");

const btrServer = new Butter();

btrServer.route("GET", "/", (req, res) => {
  res.statusCode = 200;
  res.end(JSON.stringify({ message: "Success" }));
});

btrServer.listen(3000, () => {
  console.log("butter");
});

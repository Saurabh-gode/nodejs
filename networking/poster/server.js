const Butter = require("../butter/Butter");
const PORT = 8000;

const server = new Butter();

const USERS = [
  { id: 1, name: "saurabh", username: "saurabh25", password: "string" },
  { id: 2, name: "saurabh2", username: "saurabh252", password: "string" },
  { id: 3, name: "saurabh3", username: "saurabh253", password: "string" },
];
const POSTS = [
  {
    id: 1,
    title: "this is a post title1",
    body: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio, accusamus consectetur molestiae perspiciatis ipsa ullam commodi libero voluptatibus, assumenda eveniet asperiores culpa ratione voluptatem neque. Vero quos tempore magni iure!",
    userId: 1,
  },
];

// // ---------- Files Routes ------------//
server.route("get", "/", (req, res) => {
  res.sendFile("./public/index.html", "text/html");
});

server.route("get", "/login", (req, res) => {
  res.sendFile("./public/index.html", "text/html");
});

server.route("get", "/styles.css", (req, res) => {
  res.sendFile("./public/styles.css", "text/css");
});

server.route("get", "/scripts.js", (req, res) => {
  res.sendFile("./public/scripts.js", "text/javascript");
});
//

// //------------ JSON Routes ---------- //

server.route("post", "/api/login", (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString("utf-8");
  });

  req.on("end", () => {
    body = JSON.parse(body);
    const username = body.username;
    const password = body.password;

    // check if the user exists and password matches
    const user = USERS.find((user) => user.username === username);

    if (user && user.password === password) {
      return res.status(200).json({ user: user, message: "user logged in successfully." });
    } else {
      return res.status(401).json({ message: "Invalid username or password!" });
    }
  });
});

server.route("get", "/api/user", (req, res) => {});

server.route("get", "/api/posts", (req, res) => {
  const posts = POSTS.map((post) => {
    const user = USERS.find((user) => user.id === post.userId);
    post.author = user.name;
    return post;
  });

  res.status(200).json(posts);
});

server.listen(3000, () => {
  console.log("server has started on -> " + 3000);
});

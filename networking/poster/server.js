const Butter = require("../butter/Butter");
const PORT = 8000;

const server = new Butter();

// A sample object in this array would look like:
// {user_id: 1, token: "fjankfak"}
let SESSIONS = [];

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

//middlewares

// Authentication
server.beforeEach((req, res, next) => {
  const routesToAuthenticate = [
    "GET /api/user",
    "PUT /api/user",
    "POST /api/posts",
    "DELETE /api/logout",
  ];

  if (routesToAuthenticate.indexOf(req.method + " " + req.url) !== -1) {
    if (!req.headers.cookie) {
      return res.status(401).json({ message: "Unauthorized!" });
    }

    const cookieParse = req.headers?.cookie?.split(";");
    let cookiObj = {};

    cookieParse?.forEach((cookiestr) => {
      const trimedStr = cookiestr.trim();
      const keyVal = trimedStr.split("=");
      cookiObj[keyVal[0]] = keyVal[1];
    });
    const token = cookiObj.token;

    const session = SESSIONS.find((session) => session.token === token);

    if (session) {
      req.userId = session.userId;
      return next();
    } else {
      res.status(401).json({ message: "Unauthorized!" });
    }
  } else {
    next();
  }
});

// json-body parsing middleware
server.beforeEach((req, res, next) => {
  if (req.headers["content-type"] === "application/json") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk.toString("utf-8");
    });

    req.on("end", () => {
      body = JSON.parse(body);
      req.body = body;
      return next();
    });
  } else {
    next();
  }
});

server.beforeEach((req, res, next) => {
  const routes = ["/", "/login", "/profile", "/new-post"];

  if (routes.indexOf(req.url) !== -1 && req.method === "GET") {
    return res.status(200).sendFile("./public/index.html", "text/html");
  } else {
    next();
  }
});

// // ---------- Files Routes ------------//
// server.route("get", "/", (req, res) => {
// console.log("home/");
// res.sendFile("./public/index.html", "text/html");
// });

server.route("get", "/login", (req, res) => {
  // res.sendFile("./public/index.html", "text/html");
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
  let body = req.body;
  const username = body.username;
  const password = body.password;

  // check if the user exists and password matches
  const user = USERS.find((user) => user.username === username);

  if (user && user.password === password) {
    const token = Math.floor(Math.random() * 10000000000).toString();

    SESSIONS.push({ userId: user.id, token: token });
    res.setHeader("set-cookie", `token=${token}; Path=/; onemore=some;`);
    return res.status(200).json({ user: user, message: "user logged in successfully." });
  } else {
    return res.status(401).json({ message: "Invalid username or password!" });
  }
});

server.route("delete", "/api/logout", (req, res) => {
  SESSIONS = SESSIONS.filter((session) => session.userId !== req.userId);
  res.setHeader("Set-Cookie", `token=deleted; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`);
  return res.status(200).json({ message: "Logout success!" });
});

server.route("get", "/api/user", (req, res) => {
  const user = USERS.find((user) => req.userId === user.id);
  delete user.password;
  res.status(200).json(user);
});

server.route("put", "/api/user", (req, res) => {});

server.route("get", "/api/posts", (req, res) => {
  const posts = POSTS.map((post) => {
    const user = USERS.find((user) => user.id === post.userId);
    post.author = user.name;
    return post;
  });

  res.status(200).json(posts);
});

server.route("post", "/api/posts", (req, res) => {
  const posttitle = req.body.title;
  const postbody = req.body.body;

  const data = { id: POSTS.length + 1, title: posttitle, body: postbody, userId: req.userId };

  POSTS.unshift(data);

  res.status(200).json({ message: "Post saved", post: data });
});
server.route("put", "/api/user", (req, res) => {
  const username = req.body.username;
  const name = req.body.name;
  const password = req.body.password;
  4;

  const user = USERS.find((user) => req.userId === user.id);

  user.name = name || user.name;
  user.username = username || user.username;
  user.password = password || user.password;

  res.status(200).json({
    message: "user data updated!",
    name: user.name,
    username: user.username,
    userId: user.id,
  });
});

server.listen(3000, () => {
  console.log("server has started on -> " + 3000);
});

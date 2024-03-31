const path = require("node:path");

// dirname: gets the parent folder of a file
// basename: gets the filename part
// extname: gets the file extension

const notes = "/users/joe/notes.txt";

// console.log(__filename);
// console.log(__dirname);
path.dirname(notes); // /users/joe
path.basename(notes); // notes.txt
path.extname(notes); // .txt

// path join
const name = "joe";
path.join("/", "users", name, "notes.txt"); // '/users/joe/notes.txt'

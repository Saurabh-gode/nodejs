const cluster = require("node:cluster");

if (cluster.isPrimary) {
    cluster.fork()
    cluster.fork()
} else {
    require("./app")
}
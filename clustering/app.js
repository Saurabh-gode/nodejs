const cpeak = require("cpeak");

const server = new cpeak();
const PORT = 5090;

server.route("get", "/", (req, res) => {
    res.json({ message: "This is some text." });
});

server.route("get", "/heavy", (req, res) => {
    const startTime = Date.now();
    for (let index = 0; index < 999999999999999; index++) {

    }
    const endTime = Date.now();
    res.json({ message: `the operation is done in ${(endTime - startTime)}ms time` })
})

server.listen(PORT, () => {
    console.log(`server has started on port ${PORT}`)
})


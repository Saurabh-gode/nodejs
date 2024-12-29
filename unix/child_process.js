const { spawn, exec } = require("node:child_process");


// spawn is used to run processes. and not commands/functions/builtins/aliases.
// spawn only looks for executables using $PATH
const subprocess = spawn("ls", ["-l"]);

subprocess.stdout.on("data", (data) => {
    console.log(data.toString("utf-8"));
})

// aruguments passed when this process is created by the parent
// eg. bash creates node process when we exec `node app.js`.
console.log("args", process.argv);

// disown ll
// exec is used to run commands
// this runs in a shell. so bash type can be explicitly specified.
exec("ls",{
    shell: "bash"
}, (err, stdout, stderr) => {
    if (err) {
        console.log(err);
        return;
    }

    console.log("stdout: ", stdout);

    console.log("stdErr: ", stderr);
})

const fs = require("fs/promises");

(async () => {
  //
  const CREATE_FILE = "create a file";
  const DELETE_FILE = "delete a file";
  const RENAME_FILE = "rename a file";
  const ADD_TO_FILE = "add to the file";

  const createFile = async (path) => {
    try {
      //we want to check weather or not we already have that file.
      const existingFileHandle = await fs.open(path, "r");
      existingFileHandle.close();
      return console.log(`the file ${path} already exists.`);
    } catch (err) {
      // we dont have the file and we have to create the file.
      const newFileHandle = await fs.open(path, "w");
      newFileHandle.close();
      return console.log("new file was successfully created");
    }
  };

  const deleteFile = async (path) => {
    console.log(`Deleting this ${path}...`);

    try {
      const deleteFile = await fs.rm(path);
      return console.log(`${path} file deleted.`);
    } catch (err) {
      return err.code === "ENOENT"
        ? console.log(`file can not be deleted, does not exists.`)
        : console.log("something went wrong");
    }
  };

  const renameFile = async (oldPath, newPath) => {
    console.log(`Rename ${oldPath} to ${newPath}`);

    try {
      const renameFile = await fs.rename(oldPath, newPath);
      return console.log(`${oldPath} file renamed to ${newPath}`);
    } catch (err) {
      return err.code === "ENOENT"
        ? console.log(`file can not be renamed, does not exists.`)
        : console.log("something went wrong");
    }
  };

  const addToFile = async (path, content) => {
    console.log(`adding to ${path}`);
    console.log(`Content: ${content}`);

    try {
      const filehandle = await fs.open(path);
      filehandle.write(content);
      console.log("content added to file successfully.");
    } catch (err) {
      console.log(err);
    }
  };

  // numeric file descriptor is returned here for opened file.
  const commandFileHandler = await fs.open("./command.txt", "r");

  // all the <FileHandle> Objects are <EventEmitter>s. // mentioned in docs.

  // so making use of EventEmitters
  commandFileHandler.on("change", async () => {
    // find out size of the opened file
    const fileStats = await commandFileHandler.stat();

    //  dynamically create allocate a buffer to store the file
    const buff = Buffer.alloc(fileStats.size);

    // the location at which we want to start filling our buffer
    const offset = 0;

    // the position from which we want to start reading the file for new changes
    const position = 0;

    // how many bytes we want to read
    const length = buff.byteLength;

    // currently we are reading the whole file from start to end
    await commandFileHandler.read(buff, offset, length, position);
    const command = buff.toString("utf-8");

    // create file
    // create a file <path>
    if (command.includes(CREATE_FILE)) {
      const filePath = command.substring(CREATE_FILE.length + 1);
      createFile(filePath);
    }

    // delete file
    // delete a file <path>
    if (command.includes(DELETE_FILE)) {
      const filePath = command.substring(DELETE_FILE.length + 1);
      deleteFile(filePath);
    }

    // rename file
    // rename a file <path> to <new-path>
    if (command.includes(RENAME_FILE)) {
      const _idx = command.indexOf(" to ");
      const filePath = command.substring(RENAME_FILE.length + 1, _idx);
      const newPath = command.substring(_idx + 4);

      renameFile(filePath, newPath);
    }

    // add to file
    // add to a file <path> this content: <content>
    if (command.includes(ADD_TO_FILE)) {
      const _idx = command.indexOf(" this content: ");
      const filePath = command.substring(ADD_TO_FILE.length + 1, _idx);
      const content = command.substring(_idx + 15);
      addToFile(filePath, content);
    }
  });

  const watcher = fs.watch("./command.txt");
  for await (const event of watcher) {
    if (event.eventType === "change") {
      commandFileHandler.emit("change");
    }
  }
})();

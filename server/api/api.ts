const port = 2137;
const express = require("express");
const multer = require("multer");
const fs = require("fs");
const cors = require("cors");
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const app = express();
const upload = multer();

app.use(cors({ origin: "*" }));

const FileStatus = {
  UPLOADED: 0,
  EXISTS: 1,
  ERROR: 2,
  DELETED: 3,
  UNKNOWN: 4,
};

app.use("/files", express.static("../files"));
app.post("/delete", upload.none(), async (req, res) => {
  const { isFolder } = req.body;
  const appFolder = path.resolve(__dirname, "../files");
  const fullPath = appFolder + "/" + req.body.filename;

  await fs.access(fullPath, (err) => {
    if (err) {
      console.log("file does not exist");
      res.json({
        message: "File does not exist.",
        title: "error",
        status: FileStatus.UNKNOWN,
      });
    } else if (isFolder) {
      return res.json({ message: "Cannot delete a directory. Yet." });
    } else {
      fs.rm(fullPath, (err) => {
        console.log(err);
      });
      console.log("File deleted.");
      res.json({
        message: "File deleted.",
        title: "success",
        status: FileStatus.DELETED,
      });
    }
  });
});

app.get("/list-files", async (req, res) => {
  const appFolder = __dirname;
  const filesFolderPath = path.join(appFolder, "..", "files");
  const folderPath = filesFolderPath;

  const files = await fs.promises.readdir(folderPath);

  const fileInfoPromises = files.map(async (filename) => {
    const filepath = `${folderPath}/${filename}`;
    const stat = await fs.promises.stat(filepath);
    const fileExtension = path.extname(filepath).toLowerCase();
    const createdAt = new Date(stat.birthtime);
    return {
      name: filename,
      type: filename.split(".").pop() || "",
      size: (stat.size / 1024 / 1024).toFixed(2) + "MB",
      uploadedDateLong: createdAt.toUTCString(),
      uploadedDateShort: createdAt.toLocaleDateString(),
      isFolder: stat.isDirectory(),
      id: uuidv4(),
      isVideo: fileExtension.includes(".mp4"),
    };
  });
  Promise.all(fileInfoPromises)
    .then((fileInfo) => res.json(fileInfo))
    .catch((err) => res.status(500).send("500 nie dziala i chuj"));
});

app.post("/upload", upload.single("filedata"), async (req, res) => {
  const { filename } = req.body;
  const appFolder = __dirname;
  const filesFolderPath = path.join(appFolder, "..", "files");
  const fullPath = `${filesFolderPath}/${filename}`;
  await fs.access(fullPath, (err) => {
    if (err) {
      try {
        fs.writeFileSync(fullPath, req.file.buffer, { flag: "wx" });
        res.json({
          message: "File uploaded",
          title: "success",
          filename: filename,
          status: FileStatus.UPLOADED,
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      res.json({
        message: "File already exists",
        title: "error",
        filename: filename,
        filepath: fullPath,
        status: FileStatus.EXISTS,
      });
    }
  });
});

app.listen(port, () => {
  console.log("Server is listening on port " + port);
});

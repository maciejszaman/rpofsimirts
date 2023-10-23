/* const port = 2139;
const express = require("express");
const multer = require("multer");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
const upload = multer();

const FileStatus = {
  UPLOADED: 0,
  EXISTS: 1,
  ERROR: 2,
  DELETED: 3,
  UNKNOWN: 4,
};

app.use(cors({ origin: "http://localhost:3000" }));

app.post("/delete", upload.none(), async (req, res) => {
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

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
 */

/* const express = require("express");
const fs = require("fs");
const cors = require("cors");
const multer = require("multer");

const FileStatus = {
  UPLOADED: 0,
  EXISTS: 1,
  ERROR: 2,
  DELETED: 3,
  UNKNOWN: 4,
};

enum FileStatus {
  UPLOADED,
  EXISTS,
  ERROR,
}

const port = 2138;

const app = express();
app.use(express.json());
const upload = multer();

app.use(cors({ origin: "http://localhost:3000" }));

app.post("/upload", upload.single("filedata"), async (req, res) => {
  const { filename, path } = req.body;
  const fullPath = `${path}/${filename}`;
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
  console.log(`Server is listening on port ${port}`);
});
 */

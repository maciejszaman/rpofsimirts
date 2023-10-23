/* const path = require("path");

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const app = express();
const port = 2137; // You can change this to your preferred port

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.use(cors({ origin: "http://localhost:3000" }));

const appFolder = __dirname;
const filesFolderPath = path.join(appFolder, "..", "files");

// Define your API endpoint to list files in a folder
/* app.get("/list-files", async (req, res) => {
  const folderPath = filesFolderPath; // Replace with the path to your folder
  console.log(folderPath);

  const files = await fs.promises.readdir(folderPath); */

/*   fs.readdir(folderPath, (err, files) => {
    if (err) {
      return res.status(500).json({ error: "Could not list files" });
    } */

/*   const fileInfoPromises = files.map(async (filename) => {
    const filepath = `${folderPath}/${filename}`;
    console.log(filepath);
    const stat = await fs.promises.stat(filepath);
    console.log(stat);
    return {
      name: filename,
      type: filename.split(".").pop() || "",
      size: (stat.size / 1024 / 1024).toFixed(2) + "MB",
      createdAt: stat.birthtime,
      path: filepath,
      isFolder: stat.isDirectory(),
    };
  }); */

/*   const fileList = files.map((fileName) => ({
    details: {
      name: fileName,
      stats: stats,
    },
  })); */
/*   Promise.all(fileInfoPromises)
    .then((fileInfo) => res.json(fileInfo))
    .catch((err) => res.status(500).send("500 nie dziala i chuj"));
});
 */

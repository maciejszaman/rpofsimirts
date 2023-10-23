import React, { useEffect, useState } from "react";
import * as Types from "./Upload.types";

import axios from "axios";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TextField,
} from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DeleteIcon from "@mui/icons-material/Delete";

type NotificationType = "success" | "error";

export const Upload = ({ open, setOpen }: Types.UploadProps) => {
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [file, setFile] = React.useState<File | null>();
  const [preview, setPreview] = React.useState<string | null>();
  const [show, setShow] = useState(false);
  const [fileExt, setFileExt] = useState<string | null>();

  const [uploadFileName, setUploadFileName] = useState("");

  const [fileUploading, setFileUploading] = useState(false);

  const isInvalid = uploadFileName === "" || uploadFileName.length > 48;

  //image
  //video
  //application

  const deleteFile = () => {
    setFile(null);
    setPreview(null);
    setShow(false);
  };
  const handleUploadSelect = () => {
    inputRef.current?.click();
  };

  const generatePreview = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const dataURL = e.target?.result as string;
      setPreview(dataURL);
    };
    reader.readAsDataURL(file);
  };

  const handleUploadButton = async () => {
    if (!file) {
      console.log("No file");
    } else {
      setFileUploading(true);
      console.log(file);
      const tempPath = "F:/fsir/files/";
      const fileName = uploadFileName + "." + fileExt;
      const formData = new FormData();
      formData.append("filename", fileName);
      formData.append("filedata", file as File);
      formData.append("path", tempPath);
      try {
        const res = await axios.post("//192.168.50.163:2137/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        /*         openNotification(
          res.data.title,
          res.data.message,
          res.data.title,
          "bottomLeft"
        ); */
        setFileUploading(false);
        setTimeout(() => {
          window.location.reload();
        }, 500);
      } catch (err) {
        console.log(err);
        setFileUploading(false);
      }
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files;
    if (file) {
      if (file[0].size > 52428800) {
        deleteFile();
      } else {
        const fileExt = file[0].name.split(".").pop();
        setFile(file[0]);
        setUploadFileName(file[0].name.split(".")[0]);
        setFileExt(fileExt);
        generatePreview(file[0]);
      }
    }
  };

  useEffect(() => {
    if (file) {
      setShow(true);
      console.log(fileExt);
      console.log(uploadFileName);
    } else if (file == null) {
      setShow(false);
    }
  }, [file]);

  return (
    <>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>File settings</DialogTitle>
        <DialogContent>
          <input
            hidden
            type="file"
            ref={inputRef}
            onChange={handleFileChange}
          />
          <Button
            disabled={file ? true : false || fileUploading}
            onClick={handleUploadSelect}
            variant="contained"
            startIcon={<FileUploadIcon />}
          >
            {file ? "Select a file" : "File selected"}
          </Button>
          {file ? (
            <IconButton onClick={deleteFile}>{<DeleteIcon />}</IconButton>
          ) : null}

          {file && show ? (
            <Box className="pt-2">
              <TextField
                error={isInvalid ? true : false}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  setUploadFileName(event.target.value);
                }}
                value={uploadFileName}
                placeholder="Uploaded file's name"
                type="text"
              />
            </Box>
          ) : null}
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            disabled={isInvalid ? true : false}
            onClick={() => handleUploadButton()}
          >
            Upload
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

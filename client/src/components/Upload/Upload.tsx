import React, { ReactNode, useEffect, useState } from "react";
import * as Types from "./Upload.types";

import axios from "axios";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import DeleteIcon from "@mui/icons-material/Delete";

export const Upload = ({ open, setOpen }: Types.UploadProps) => {
  const steps = ["Select a file", "Set a name"];
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const [file, setFile] = React.useState<File | null>();
  const [preview, setPreview] = React.useState<string | null>();
  const [show, setShow] = useState(false);
  const [fileExt, setFileExt] = useState<string | null>();

  const [uploadFileName, setUploadFileName] = useState("");

  const [fileUploading, setFileUploading] = useState(false);

  const [activeStep, setActiveStep] = useState(0);
  const [skipped, setSkipped] = useState(new Set<number>());

  const isStepSkipped = (step: number) => {
    return skipped.has(step);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const isInvalid = uploadFileName === "" || uploadFileName.length > 48;

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
        const res = await axios.post("//localhost:2137/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setTimeout(() => {
          setFileUploading(false);
          window.location.reload();
        }, 1000);
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
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth={"xs"}>
      <DialogTitle>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => {
            const stepProps: { completed?: boolean } = {};
            const labelProps: {
              optional?: ReactNode;
            } = {};
            if (isStepSkipped(index)) {
              stepProps.completed = false;
            }
            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </DialogTitle>
      <Divider />
      <DialogContent>
        {activeStep === 0 ? (
          <>
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
              {!file ? "Select a file" : "File selected"}
            </Button>
            {file ? (
              <IconButton onClick={deleteFile}>{<DeleteIcon />}</IconButton>
            ) : null}
          </>
        ) : null}
        {activeStep === 1 ? (
          <>
            <TextField
              fullWidth
              label={"Set a new name for the file"}
              error={isInvalid ? true : false}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setUploadFileName(event.target.value);
              }}
              value={uploadFileName}
              placeholder="An ace, blindfolded"
              type="text"
            />
          </>
        ) : null}
      </DialogContent>
      <DialogActions>
        <Button
          className="w-24"
          variant="outlined"
          onClick={activeStep === 0 ? handleClose : handleBack}
        >
          {activeStep === 0 ? "Cancel" : "Back"}
        </Button>
        <Button
          className="w-24"
          variant={activeStep === 1 ? "contained" : "outlined"}
          disabled={isInvalid || fileUploading || !file ? true : false}
          onClick={activeStep === 1 ? () => handleUploadButton() : handleNext}
        >
          {fileUploading ? "Uploading" : null}
          {activeStep === 0 ? "Next" : null}
          {!fileUploading && !(activeStep === 0) ? "Upload" : null}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

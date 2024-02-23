import axios from "axios";
import React, { useEffect, useState } from "react";
import * as SharedTypes from "../../shared/SharedTypes.types";
import { Box, CircularProgress, Fade, Typography } from "@mui/material";
import { ViewerFail } from "./ViewerFail/ViewerFail";
import { DayGrid } from "./DayGrid/DayGrid";

export const Viewer = () => {
  const [filesLoading, setFilesLoading] = useState(false);

  const domain = "http://localhost:2137/files/";

  const [files, setFiles] = useState<SharedTypes.File[][]>([]);

  const [failedLoading, setFailedLoading] = useState(false);

  const deleteFile = async (filename: string) => {
    const formData = new FormData();
    formData.append("filename", filename);
    const res = await axios.post("//localhost:2137/delete", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    await getFiles();
  };

  const getFiles = async () => {
    setFilesLoading(true);
    try {
      const res = await axios.get("//localhost:2137/list-files");
      const resdata = res.data;
      const sortedFiles = resdata.sort(
        (
          a: { uploadedDateShort: string },
          b: { uploadedDateShort: string }
        ) => {
          const dateA = new Date(
            a.uploadedDateShort.split("/").reverse().join("/")
          );
          const dateB = new Date(
            b.uploadedDateShort.split("/").reverse().join("/")
          );

          // Compare the dates
          return dateB.getTime() - dateA.getTime();
        }
      );
      const sortedFilesMap = new Map<string, SharedTypes.File[]>();
      sortedFiles.forEach((obj: any) => {
        const { uploadedDateShort } = obj;

        if (!sortedFilesMap.has(uploadedDateShort)) {
          sortedFilesMap.set(uploadedDateShort, []);
        }

        sortedFilesMap.get(uploadedDateShort)?.push(obj);
      });
      setFiles(Array.from(sortedFilesMap.values()));
      setFilesLoading(false);
    } catch (err) {
      console.log(err);
      setFailedLoading(true);
      setFilesLoading(false);
    }
  };

  useEffect(() => {
    getFiles();
  }, []);

  return (
    <Box className="h-full w-full items-center p-4">
      {filesLoading ? (
        <CircularProgress className="fixed left-1/2 top-1/2" />
      ) : (
        <>
          {Object.keys(files).map((uploadedDateShort, index) => (
            <div key={uploadedDateShort} className="mb-6" id={index.toString()}>
              <Fade
                in={!filesLoading}
                style={{ transitionDelay: `${index + 1 * 400}ms` }}
              >
                <Typography variant="h4">
                  {files[index][0].uploadedDateLong.substring(0, 16)}
                </Typography>
              </Fade>
              <DayGrid
                key={index}
                files={files[index]}
                filesLoading={filesLoading}
              />
            </div>
          ))}
        </>
      )}
      <ViewerFail failedLoading={failedLoading} />
    </Box>
  );
};

import axios from "axios";
import React, { useEffect, useState } from "react";
import { FileCard } from "./FileCard/FileCard";
import * as Types from "./Viewer.types";
import * as SharedTypes from "../../shared/SharedTypes.types";
import {
  Box,
  CircularProgress,
  Container,
  Grid,
  Grow,
  IconButton,
  Typography,
} from "@mui/material";
import { Empty } from "./Empty/Empty";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { ViewerFail } from "./ViewerFail/ViewerFail";

export const Viewer = ({ viewerType }: Types.ViewerProps) => {
  const [filesLoading, setFilesLoading] = useState(false);

  const domain = "http://localhost:2137/files/";

  const [files, setFiles] = useState<SharedTypes.File[]>([]);

  const [failedLoading, setFailedLoading] = useState(false);

  const deleteFile = async (filename: string) => {
    const formData = new FormData();
    formData.append("filename", filename);
    const res = await axios.post("//localhost:2137/delete", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res.data);
    await getFiles();
  };

  const getFiles = async () => {
    setFilesLoading(true);
    try {
      const res = await axios.get("//localhost:2137/list-files");
      console.log(res.data);
      const files = res.data;
      const sortedFiles = files.sort(
        (
          a: { isFolder: any; createdAt: string | number | Date },
          b: { isFolder: any; createdAt: string | number | Date }
        ) => {
          if (a.isFolder && !b.isFolder) {
            return -1; // a is a folder, so it should come before b
          } else if (!a.isFolder && b.isFolder) {
            return 1; // b is a folder, so it should come before a
          } else {
            // neither a nor b is a folder, so sort by the createdAt date
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          }
        }
      );
      console.log(sortedFiles);
      setFiles(sortedFiles);
      setFilesLoading(false);
    } catch (err) {
      console.log(err);
      setFailedLoading(true);
      setFilesLoading(false);
    }
  };

  const columns: GridColDef[] = [
    {
      field: "name",
      renderCell: (params) => (
        <a href={domain + params.row.name}>{params.row.name}</a>
      ),
      headerName: "Name",
      width: 400,
    },
    { field: "size", headerName: "Size" },
    { field: "type", headerName: "Type" },
    {
      field: "added",
      headerName: "Added",
      renderCell: (params) => (
        <Typography>{params.row.uploadedDateShort}</Typography>
      ),
    },
    {
      field: "actions",
      renderCell: (params) => (
        <IconButton
          disabled={params.row.isFolder ? true : false}
          onClick={() => deleteFile(params.row.name)}
        >
          <DeleteIcon />
        </IconButton>
      ),
      headerName: "Actions",
      width: 140,
      sortable: false,
    },
  ];

  useEffect(() => {
    getFiles();
  }, []);

  return (
    <Box className="h-full w-full items-center p-4">
      {filesLoading ? (
        <CircularProgress className="fixed left-1/2 top-1/2" />
      ) : viewerType ? (
        <Grid container spacing={1}>
          {files?.map((file, index) => (
            <Grid key={file.uuid} item xs={12} sm={6} md={4} lg={3} xl={2}>
              <FileCard
                file={file}
                index={index}
                setFiles={setFiles}
                viewerType={viewerType}
                setFilesLoading={setFilesLoading}
                setFailedLoading={setFailedLoading}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <div className="LIST-TYPE">
          {files ? (
            <Container maxWidth="md">
              <DataGrid
                disableColumnFilter
                disableColumnSelector
                disableDensitySelector
                disableRowSelectionOnClick
                disableEval
                disableColumnMenu
                rows={files}
                columns={columns}
                initialState={{
                  pagination: { paginationModel: { page: 0, pageSize: 15 } },
                }}
                pageSizeOptions={[20, 40]}
              />
            </Container>
          ) : (
            <Empty />
          )}
        </div>
      )}
      <ViewerFail failedLoading={failedLoading} />
    </Box>
  );
};

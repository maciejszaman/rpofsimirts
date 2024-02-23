import React from "react";
import * as Types from "./DayGrid.types";
import { FileCard } from "../FileCard/FileCard";
import { Grid, Typography } from "@mui/material";

export const DayGrid = ({ files, filesLoading }: Types.DayGridProps) => {
  return (
    <div>
      <Grid container spacing={2}>
        {files.map((file, index) => (
          <>
            <Grid key={index} item xs={12} sm={6} md={4} lg={3} xl={2}>
              <FileCard
                index={index}
                key={file.uuid}
                file={file}
                filesLoading={filesLoading}
              />
            </Grid>
          </>
        ))}
      </Grid>
    </div>
  );
};

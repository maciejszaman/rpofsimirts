import React from "react";
import * as Types from "./ListView.types";
import { Typography } from "@mui/material";

export const ListView = ({ file }: Types.ListViewProps) => {
  return (
    <>
      <Typography>{file.name}</Typography>
      <Typography>{file.size.toString()}</Typography>
    </>
  );
};

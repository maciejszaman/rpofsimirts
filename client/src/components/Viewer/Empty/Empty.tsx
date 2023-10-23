import React from "react";
import placeholder from "../../assets/nothingness.png";
import { Box, Typography } from "@mui/material";

export const Empty = () => {
  return (
    <Box>
      <img alt="No files found" src={placeholder}></img>;
      <Typography></Typography>
    </Box>
  );
};

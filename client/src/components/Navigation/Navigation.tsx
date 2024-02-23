import { Upload } from "../Upload/Upload";
import * as Types from "./Navigation.types";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import {
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  Paper,
  Stack,
} from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import GridViewIcon from "@mui/icons-material/GridView";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MenuIcon from "@mui/icons-material/Menu";

export const Navigation = ({
  darkMode,
  setDarkMode,
}: Types.NavigationProps) => {
  const [value, setValue] = useState(0);
  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  const [open, setOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => {
    setDrawerOpen(newOpen);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Paper
        elevation={2}
        sx={{ padding: 1 }}
        className="z-50 sticky top-0 left-0"
      >
        <Stack
          direction="row"
          sx={{ paddingTop: { xs: "6px", sm: "0px" } }}
          justifyContent="space-between"
          spacing={2}
        >
          <Stack
            direction="row"
            sx={{ display: { xs: "none", sm: "flex" }, paddingTop: "5px" }}
          ></Stack>
          <Stack direction="row" sx={{ display: { xs: "flex", sm: "none" } }}>
            <IconButton
              className="visible md:invisible"
              onClick={() => toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </Stack>
          <Stack
            className="pr-4"
            direction="row"
            alignItems="center"
            spacing={2}
          >
            <IconButton onClick={handleDarkModeToggle}>
              {darkMode ? <DarkModeIcon /> : <LightModeIcon />}
            </IconButton>
            <Button
              onClick={handleClickOpen}
              variant="contained"
              color="primary"
              startIcon={<FileUploadIcon />}
              sx={{ display: { xs: "none", sm: "flex" } }}
            >
              Upload
            </Button>
          </Stack>
        </Stack>
      </Paper>
      <Upload open={open} setOpen={setOpen} />
      <Drawer
        open={drawerOpen}
        anchor="left"
        onClose={() => toggleDrawer(false)}
      >
        <List>
          <Divider />
          <Box sx={{ padding: 4 }}>
            <Button
              onClick={handleClickOpen}
              variant="contained"
              color="primary"
              startIcon={<FileUploadIcon />}
            >
              Upload
            </Button>
          </Box>
        </List>
      </Drawer>
    </>
  );
};

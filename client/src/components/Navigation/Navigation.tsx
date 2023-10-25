import { Upload } from "../Upload/Upload";
import * as Types from "./Navigation.types";
import React, { useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import EditIcon from "@mui/icons-material/Edit";
import TerminalIcon from "@mui/icons-material/Terminal";
import Box from "@mui/material/Box";
import {
  Button,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import GridViewIcon from "@mui/icons-material/GridView";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

export const Navigation = ({
  darkMode,
  setDarkMode,
  viewerType,
  setViewerType,
}: Types.NavigationProps) => {
  const [value, setValue] = useState(0);
  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  const handleViewerTypeToggle = () => {
    setViewerType(!viewerType);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
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
      <Stack
        direction="row"
        sx={{ paddingTop: { xs: "6px", sm: "0px" } }}
        justifyContent="space-between"
        spacing={2}
      >
        <Stack
          direction="row"
          sx={{ display: { xs: "none", sm: "flex" }, paddingTop: "5px" }}
        >
          <Tabs value={value} onChange={handleChange} aria-label="menu">
            <Tab label="Files" />
            <Tab disabled label="Console" />
            <Tab disabled label="Notepad" />
          </Tabs>
        </Stack>
        <Stack direction="row" sx={{ display: { xs: "flex", sm: "none" } }}>
          <IconButton
            className="visible md:invisible"
            onClick={() => toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
        </Stack>
        <Stack className="pr-4" direction="row" alignItems="center" spacing={2}>
          <IconButton onClick={handleViewerTypeToggle}>
            {viewerType ? <GridViewIcon /> : <FormatListBulletedIcon />}
          </IconButton>
          <IconButton onClick={handleDarkModeToggle}>
            <DarkModeIcon />
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
      <Upload open={open} setOpen={setOpen} />
      <Drawer
        open={drawerOpen}
        anchor="left"
        onClose={() => toggleDrawer(false)}
      >
        <List>
          <ListItem>
            <ListItemButton>
              <ListItemIcon>
                <FolderOpenIcon />
              </ListItemIcon>
              <ListItemText primary="Files" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton disabled>
              <ListItemIcon>
                <EditIcon />
              </ListItemIcon>
              <ListItemText primary="Notepad" />
            </ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton disabled>
              <ListItemIcon>
                <TerminalIcon />
              </ListItemIcon>
              <ListItemText primary="Console" />
            </ListItemButton>
          </ListItem>
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

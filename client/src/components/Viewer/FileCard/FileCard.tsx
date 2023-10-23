import { useState } from "react";
import * as Types from "./FileCard.types";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import DeleteIcon from "@mui/icons-material/Delete";
import FolderIcon from "@mui/icons-material/Folder";
import FileCopyIcon from "@mui/icons-material/FileCopy";
import EventNoteIcon from "@mui/icons-material/EventNote";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";
import axios from "axios";

export const FileCard = ({
  file,
  setFiles,
  setFilesLoading,
  setFailedLoading,
}: Types.FileCardProps) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const photoLocation = "http://192.168.50.163:2137/files/" + file.name;

  const open = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const uploadDate = new Date(file.createdAt);

  const getFiles = async () => {
    setFilesLoading(true);
    try {
      const res = await axios.get("//192.168.50.163:2137/list-files");
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

  const deleteFile = async (filename: string) => {
    const formData = new FormData();
    formData.append("filename", filename);
    const res = await axios.post("//192.168.50.163:2137/delete", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res.data);
    await getFiles();
  };

  return (
    <>
      <Card sx={{ maxWidth: 345 }} className="max-w-xs">
        {file.isFolder ? (
          <Box
            sx={{
              height: 250,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <FolderIcon fontSize="large" />
          </Box>
        ) : (
          <a href={photoLocation}>
            <CardMedia
              sx={{ height: 250, objectFit: "cover" }}
              component={file.isVideo ? "video" : "img"}
              src={photoLocation}
              alt="placeholder"
            />
          </a>
        )}
        <CardContent>
          <Stack
            direction="row"
            spacing={2}
            sx={{ justifyContent: "space-between" }}
          >
            <Typography
              sx={{
                display: "-webkit-box",
                overflow: "hidden",
                WebkitBoxOrient: "vertical",
                pl: "5",
                WebkitLineClamp: 1,
              }}
            >
              {file.name}
            </Typography>
            <IconButton onClick={handleClick} sx={{ padding: 0 }}>
              <MoreVertIcon />
            </IconButton>
          </Stack>
        </CardContent>
      </Card>
      {/* MENU */}
      <Menu
        className="w-80 max-w-full"
        id="file-settings"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{ "aria-labelledby": "basic-button" }}
      >
        <a href={photoLocation}>
          <MenuItem>
            <ListItemIcon>
              <FullscreenIcon fontSize="small" />
            </ListItemIcon>
            <ListItemText>View</ListItemText>
          </MenuItem>
        </a>
        <MenuItem
          disabled={file.isFolder ? true : false}
          onClick={() => deleteFile(file.name)}
        >
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>
            {file.isFolder ? "Can't delete a folder" : "Delete"}
          </ListItemText>
        </MenuItem>

        <Divider />

        <MenuItem>
          <ListItemIcon>
            <FileCopyIcon color="disabled" fontSize="small" />
          </ListItemIcon>
          <ListItemText>
            <Typography color="text.secondary">{file.size}</Typography>
          </ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <EventNoteIcon color="disabled" fontSize="small" />
          </ListItemIcon>
          <ListItemText>
            <Typography color="text.secondary">
              {uploadDate.toUTCString()}
            </Typography>
          </ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
};

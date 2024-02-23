import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import React from "react";
import * as Types from "./ViewerFail.types";
import errorImage from "../../assets/errorImage.png";

export const ViewerFail = ({ failedLoading }: Types.ViewerFailProps) => {
  return (
    <Dialog open={failedLoading} onClose={() => window.location.reload()}>
      <DialogTitle>Loading failed</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Failed to fetch the file list.
          <img className="h-64 rounded-lg mt-2" src={errorImage} />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => window.location.reload()}>Reload</Button>
      </DialogActions>
    </Dialog>
  );
};

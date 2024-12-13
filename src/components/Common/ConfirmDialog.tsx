import React, { ReactNode } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import Button from "./Button";

interface Props {
  open: boolean;
  title: string;
  message: string | ReactNode;
  entryName?: string;
  showEntryName?: boolean;
  showSecondarybutton?: boolean;
  onConfirm: () => void;
  onDismiss: () => void;
  actionBtnTitle?: string;
}
const ConfirmMsg = ({
  open,
  title,
  message,
  entryName = "",
  showEntryName = true,
  showSecondarybutton = false,
  onConfirm,
  onDismiss = () => {},
  actionBtnTitle = "Submit",
}: Props) => {
  return (
    <Dialog open={open} onClose={onDismiss}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {message}{" "}
          {showEntryName ? (
            entryName ? (
              <b style={{ textTransform: "capitalize" }}>{entryName}?</b>
            ) : (
              " this entry?"
            )
          ) : null}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {showSecondarybutton ? (
          <Button onClick={onDismiss} variant="secondary">
            Cancel
          </Button>
        ) : null}
        <Button onClick={onConfirm}>{actionBtnTitle}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmMsg;

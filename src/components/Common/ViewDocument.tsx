import React from "react";
import { Close } from "@mui/icons-material";
import { Dialog, DialogContent, DialogTitle, IconButton } from "@mui/material";

const ViewDocument = ({
  isOpen,
  data,
  onClose,
}: {
  isOpen: boolean;
  data: any;
  onClose: () => void;
}) => {
  const type = data?.type || data?.name?.split(".")?.pop();

  const Viewer = () => {
    const getDocumentUrl = () => {
      if (typeof data === "object" && data instanceof Blob) {
        return URL.createObjectURL(data);
      }
      return data?.documentUrl || "";
    };
    const documentUrl = getDocumentUrl();

    switch (type) {
      case "pdf":
      case "application/pdf":
        return (
          <iframe
            src={`${documentUrl}#toolbar=0`}
            width="100%"
            height="400px"
          />
        );
      case "doc":
      case "docx":
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      case "application/msword":
        // If it's a Blob, show a download link; if it's a URL, use Google Docs Viewer
        return typeof data === "object" && data instanceof Blob ? (
          <a href={documentUrl} download="document.docx">
            Click to download DOC/DOCX file
          </a>
        ) : (
          <iframe
            src={`https://docs.google.com/viewer?url=${encodeURIComponent(
              documentUrl
            )}&embedded=true`}
            width="100%"
            height="400px"
          />
        );
      default:
        return (
          <img
            src={documentUrl}
            width="100%"
            height="400px"
            alt="Document preview"
          />
        );
    }
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      disableEscapeKeyDown={true}
      fullWidth
    >
      <DialogTitle>
        {data?.name || "View"}
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Viewer />
      </DialogContent>
    </Dialog>
  );
};

export default ViewDocument;

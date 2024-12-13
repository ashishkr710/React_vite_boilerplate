import React, { useEffect, useState } from "react";
import { Snackbar, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { socket } from "@utils/socket/socket";
import { useAppContext } from "../../contexts/AppContextProvider";
import { failed } from "@components/Common/Toastify";

const Notification = () => {
  const { value } = useAppContext(); // Assuming 'user' contains the logged-in user's information
  const [notification, setNotification] = useState(null);
  const [open, setOpen] = useState(false);
  const userId = value?.user?.userId; // Use user's ID as notification room ID

  useEffect(() => {
    if (userId) {
      // Emit event to join the notification room
      socket.emit("joinUserRoom", { userId });

      // Listen for notifications from the server
      socket.on("userJoined", () => {});

      // Listen for notifications from the server
      socket.on("notification", (data) => {
        setNotification(data.message);
        setOpen(true);
      });

      // Listen for notifications from the server
      socket.on("error", (error) => {
        failed(error);
      });
    }

    return () => {
      socket.off("userJoined");
      socket.off("notification");
      socket.off("error");
    };
  }, [userId]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      //anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      message={notification}
      action={
        <>
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleClose}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </>
      }
    />
  );
};

export default Notification;

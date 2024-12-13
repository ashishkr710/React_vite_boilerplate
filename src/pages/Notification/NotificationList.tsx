import React, { Fragment, useEffect } from "react";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Typography,
  Container,
  Skeleton,
} from "@mui/material";
import {
  markNotificationsAsRead,
  useNotifications,
} from "../../API/Notification";
import TimeAgo from "@components/Common/TimeAgo";
import { useAppContext } from "../../contexts/AppContextProvider";

const NotificationList = () => {
  const { value } = useAppContext();
  // Use the custom useNotifications hook with refetchInterval
  const { data: notifications, isLoading } = useNotifications({
    config: {
      refetchInterval: 3000, // Refetch notifications every second
    },
  });

  useEffect(() => {
    if (value?.user?.userType === "doctor") {
      return () => {
        markNotificationsAsRead();
      };
    }
  }, []);

  return (
    <Container>
      <Typography variant="h6" gutterBottom>
        Notifications
      </Typography>

      <div
        style={{
          width: "100%",
          padding: "20px 35px",
          backgroundColor: "var(--light-color)",
          borderRadius: "4px",
          height: "calc(100vh-100px)",
        }}
      >
        <List>
          {isLoading ? (
            Array.from(new Array(5)).map((val) => (
              <Fragment key={val}>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={<Skeleton />}
                    secondary={<Skeleton width={200} />}
                  />
                </ListItem>
                <Divider component="li" />
              </Fragment>
            ))
          ) : notifications?.length > 0 ? (
            notifications?.map((notification: any, index: number) => (
              <div
                key={index}
                style={{
                  borderLeft: `1px solid ${
                    notification.isRead ? "transparent" : "var(--secondary)"
                  }`,
                  color: notification.isRead ? "#808080" : "#000000",
                }}
              >
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={notification.message}
                    secondary={
                      <small>
                        Received <TimeAgo timestamp={notification.createdAt} />
                      </small>
                    }
                  />
                </ListItem>
                <Divider component="li" />
              </div>
            ))
          ) : (
            <Typography variant="body1">No notifications available.</Typography>
          )}
        </List>
      </div>
    </Container>
  );
};

export default NotificationList;

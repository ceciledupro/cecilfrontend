import {
  Badge,
  Button,
  Card,
  Drawer,
  Icon,
  Typography,
  IconButton,
  ThemeProvider,
} from "@mui/material";
import { Box, styled, useTheme } from "@mui/system";
import useNotification from "../../../app/hooks/useNotification";
import useSettings from "../../../app/hooks/useSettings";

import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { themeShadows } from "../MatxTheme/themeColors";
import { Paragraph, Small } from "../Typography";

// const Notification = styled("div")(() => ({
//   padding: "16px",
//   marginBottom: "16px",
//   display: "flex",
//   alignItems: "center",
//   height: topBarHeight,
//   boxShadow: themeShadows[6],
//   "& h5": {
//     marginLeft: "8px",
//     marginTop: 0,
//     marginBottom: 0,
//     fontWeight: "500",
//   },
// }));

const Notification = styled("div")(() => ({
  padding: "16px",
  marginBottom: "16px", // Add margin to create space between notices
  display: "block", // Ensure each notice is on a separate line
  alignItems: "center",
  height: "auto", // Adjust height to fit content
  borderBottom: "1px solid #ddd", // Add a bottom border for better separation
}));

const NotificationCard = styled(Box)(({ theme }) => ({
  position: "relative",
  "&:hover": {
    "& .messageTime": {
      display: "none",
    },
    "& .deleteButton": {
      opacity: "1",
    },
  },
  "& .messageTime": {
    color: theme.palette.text.secondary,
  },
  "& .icon": { fontSize: "1.25rem" },
}));

const DeleteButton = styled(IconButton)(({ theme }) => ({
  opacity: "0",
  position: "absolute",
  right: 5,
  marginTop: 9,
  marginRight: "24px",
  background: "rgba(0, 0, 0, 0.01)",
}));

const CardLeftContent = styled("div")(({ theme }) => ({
  padding: "12px 8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  background: "rgba(0, 0, 0, 0.01)",
  "& small": {
    fontWeight: "500",
    marginLeft: "16px",
    color: theme.palette.text.secondary,
  },
}));

const Heading = styled("span")(({ theme }) => ({
  fontWeight: "500",
  marginLeft: "16px",
  color: theme.palette.text.secondary,
}));
const getRandomColor = () => {
  const colors = ["skyblue", "yellow", "pink", "blue"];
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};
const NotificationBar = ({ container }) => {
  const { settings } = useSettings();
  const theme = useTheme();
  const secondary = theme.palette.text.secondary;
  const [panelOpen, setPanelOpen] = React.useState(false);
  const { deleteNotification, clearNotifications, notifications } =
    useNotification();

  const handleDrawerToggle = () => {
    setPanelOpen(!panelOpen);
  };

  const { palette } = useTheme();
  const textColor = palette.text.primary;

  return (
    <Fragment>
      <IconButton onClick={handleDrawerToggle}>
        <Badge color="secondary" badgeContent={notifications?.length}>
          <Icon sx={{ color: textColor }}>notifications</Icon>
        </Badge>
      </IconButton>

      <ThemeProvider theme={settings.themes[settings.activeTheme]}>
        <Drawer
          width={"100px"}
          container={container}
          variant="temporary"
          anchor={"right"}
          open={panelOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <Box p={2}>
            <h2>Notice Board</h2>
            <div className="notice-box-wrap" style={{ display: "block" }}>
              {notifications.map((notice) => (
                <Notification key={notice._id}>
                  <div
                    className={`post-date bg-${getRandomColor()}`}
                    style={{ width: "100%" }}
                  >
                    {new Date(notice.date).toLocaleDateString()}
                  </div>
                  <Typography variant="h6" className="notice-title">
                    <a href="#">{notice.notice}</a>
                  </Typography>
                  <div className="entry-meta">
                    {notice.posted_by} / <span> ago</span>
                  </div>
                </Notification>
              ))}
            </div>
          </Box>
        </Drawer>
      </ThemeProvider>
    </Fragment>
  );
};

export default NotificationBar;

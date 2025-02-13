import {
  Avatar,
  Hidden,
  Icon,
  IconButton,
  MenuItem,
  useMediaQuery,
} from "@mui/material";
import { Box, styled, useTheme } from "@mui/system";
import { MatxMenu, MatxSearchBox } from "../../../../app/components";
import { themeShadows } from "../../../../app/components/MatxTheme/themeColors";
import useAuth from "../../../../app/hooks/useAuth";
import axios from "axios";
import useSettings from "../../../../app/hooks/useSettings";
import { topBarHeight } from "../../../../app/utils/constant";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Span } from "../../../components/Typography";
import NotificationBar from "../../../../app/components/NotificationBar/NotificationBar";
import { NotificationProvider } from "../../../../app/contexts/NotificationContext";
import { SessionContext } from "./SessionContext";

const StyledIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.text.primary,
}));

const TopbarRoot = styled("div")(({ theme }) => ({
  top: 0,
  zIndex: 96,
  transition: "all 0.3s ease",
  boxShadow: themeShadows[8],
  height: topBarHeight,
}));

const TopbarContainer = styled(Box)(({ theme }) => ({
  padding: "8px",
  paddingLeft: 18,
  paddingRight: 20,
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  background: theme.palette.primary.main,
  [theme.breakpoints.down("sm")]: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  [theme.breakpoints.down("xs")]: {
    paddingLeft: 14,
    paddingRight: 16,
  },
}));

const UserMenu = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  borderRadius: 24,
  padding: 4,
  "& span": { margin: "0 8px" },
}));

const StyledItem = styled(MenuItem)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  minWidth: 185,
  "& a": {
    width: "100%",
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
  },
  "& span": { marginRight: "10px", color: theme.palette.text.primary },
}));

const IconBox = styled("div")(({ theme }) => ({
  display: "inherit",
  [theme.breakpoints.down("md")]: { display: "none !important" },
}));

const Layout1Topbar = () => {
  const theme = useTheme();
  const { settings, updateSettings } = useSettings();
  const { logout, user } = useAuth();
  const isMdScreen = useMediaQuery(theme.breakpoints.down("md"));
  const apiUrl = process.env.REACT_APP_API_URL;

  const { sessions, currentSession, setSessions, setCurrentSession } =
    useContext(SessionContext);

  const navigate = useNavigate();
  const updateSidebarMode = (sidebarSettings) => {
    updateSettings({
      layout1Settings: { leftSidebar: { ...sidebarSettings } },
    });
  };

  const handleSidebarToggle = () => {
    let { layout1Settings } = settings;
    let mode;
    if (isMdScreen) {
      mode = layout1Settings.leftSidebar.mode === "close" ? "mobile" : "close";
    } else {
      mode = layout1Settings.leftSidebar.mode === "full" ? "close" : "full";
    }
    updateSidebarMode({ mode });
  };
  const checkUserRoleAndRedirect = () => {
    if (user.role === "admin") {
      navigate("/dashboard/admin"); // Adjust navigation paths based on your setup
    } else if (user.role === "teacher") {
      navigate("/dashboard/teacher");
    } else if (user.role === "student") {
      navigate("/dashboard/student");
    } else {
      navigate("/session/signin"); // Redirect unauthenticated users to sign-in page
    }
  };

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/sessions`)
      .then((response) => {
        if (Array.isArray(response.data)) {
          const activeSession = response.data.find(
            (session) => session.isActive
          );
          if (activeSession) {
            setCurrentSession(activeSession); // Set the current active session
          } else {
            console.warn("No active session found");
          }
          setSessions(response.data); // Set the sessions list
        } else {
          console.error("Unexpected response structure", response);
        }
      })
      .catch((error) => {
        console.error("Error fetching sessions:", error);
      });
  }, []);

  // useEffect(() => {
  //   axios
  //     .get(`${apiUrl}/api/all-sessions`)
  //     .then((response) => {
  //       if (response.data.success && Array.isArray(response.data.data)) {
  //         const formattedSessions = response.data.data.map(
  //           (session, index) => ({
  //             id: index, // Generate a unique ID for each session
  //             name: session, // The session name like "2022-2023"
  //             isActive: index === 0, // Assume the first session as active for now
  //           })
  //         );

  //         setSessions(formattedSessions);

  //         const activeSession = formattedSessions.find((s) => s.isActive);
  //         if (activeSession) {
  //           setCurrentSession(activeSession);
  //         } else {
  //           console.warn("No active session found");
  //         }
  //       } else {
  //         console.error("Unexpected response structure", response);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching sessions:", error);
  //     });
  // }, []);

  const handleSessionChange = (sessionId) => {
    const selectedSession = sessions.find(
      (session) => session._id === sessionId
    );

    if (selectedSession) {
      console.log("Switching to session:", selectedSession);

      // Update session to be active on the backend
      axios
        .patch(`${apiUrl}/api/sessions/${sessionId}/activate`)
        .then((response) => {
          console.log("Session activated:", response.data);

          // Update the current session in the state
          setCurrentSession(selectedSession);

          // Optionally, update the sessions list to reflect the active session
          setSessions((prevSessions) =>
            prevSessions.map((session) =>
              session._id === sessionId
                ? { ...session, isActive: true }
                : { ...session, isActive: false }
            )
          );
        })
        .catch((error) => {
          console.error("Error activating session:", error);
        });
    }
  };

  // const handleSessionChange = (sessionId) => {
  //   const selectedSession = sessions.find(
  //     (session) => session.id === sessionId
  //   );

  //   if (selectedSession) {
  //     console.log("Switching to session:", selectedSession);

  //     // Set as current session locally
  //     setCurrentSession(selectedSession);

  //     // Update active status in session list
  //     setSessions((prevSessions) =>
  //       prevSessions.map((session) =>
  //         session.id === sessionId
  //           ? { ...session, isActive: true }
  //           : { ...session, isActive: false }
  //       )
  //     );
  //   }
  // };

  return (
    <>
      <TopbarRoot>
        <TopbarContainer>
          <Box display="flex" alignItems="center">
            <StyledIconButton onClick={handleSidebarToggle}>
              <Icon>menu</Icon>
            </StyledIconButton>
            <MatxMenu
              menuButton={
                <UserMenu>
                  <Hidden xsDown>
                    <Span>
                      <strong style={{ display: "flex", alignItems: "center" }}>
                        {currentSession?.name
                          ? `Current Session: ${currentSession.name}`
                          : "No active session"}
                        <Icon style={{ fontSize: "20px", marginLeft: "5px" }}>
                          arrow_drop_down
                        </Icon>
                      </strong>
                    </Span>
                  </Hidden>
                </UserMenu>
              }
            >
              {sessions.length > 0 ? (
                sessions.map((session) => (
                  <StyledItem
                    key={session._id}
                    onClick={() => handleSessionChange(session._id)}
                  >
                    <Link>
                      <Span>{session?.name}</Span>
                    </Link>
                  </StyledItem>
                ))
              ) : (
                <StyledItem>
                  <Span>No sessions available</Span>
                </StyledItem>
              )}
            </MatxMenu>

            {/*} <MatxMenu
              menuButton={
                <UserMenu>
                  <Hidden xsDown>
                    <Span>
                      <strong style={{ display: "flex", alignItems: "center" }}>
                        {currentSession?.name
                          ? `Current Session: ${currentSession.name}`
                          : "No active session"}
                        <Icon style={{ fontSize: "20px", marginLeft: "5px" }}>
                          arrow_drop_down
                        </Icon>
                      </strong>
                    </Span>
                  </Hidden>
                </UserMenu>
              }
            >
              {sessions.length > 0 ? (
                sessions.map((session) => (
                  <StyledItem
                    key={session.id}
                    onClick={() => handleSessionChange(session.id)}
                  >
                    <Link>
                      <Span>{session.name}</Span>
                    </Link>
                  </StyledItem>
                ))
              ) : (
                <StyledItem>
                  <Span>No sessions available</Span>
                </StyledItem>
              )}
            </MatxMenu>*/}
          </Box>

          <Box display="flex" alignItems="center">
            {/*} <MatxSearchBox />*/}
            <NotificationProvider>
              <NotificationBar />
            </NotificationProvider>
            <MatxMenu
              menuButton={
                <UserMenu>
                  <Hidden xsDown>
                    <Span>
                      <strong>{user.username}</strong>
                    </Span>
                  </Hidden>
                  <Avatar src={user.avatar} sx={{ cursor: "pointer" }} />
                </UserMenu>
              }
            >
              <StyledItem onClick={checkUserRoleAndRedirect}>
                <Link to="/">
                  <Icon> home </Icon>
                  <Span> Home </Span>
                </Link>
              </StyledItem>

              <StyledItem>
                <Link to="/dashboard/profile">
                  <Icon> person </Icon>
                  <Span> Profile </Span>
                </Link>
              </StyledItem>

              <StyledItem>
                <Link to="/dashboard/setting">
                  <Icon> settings </Icon>
                  <Span> Settings </Span>
                </Link>
              </StyledItem>

              <StyledItem onClick={logout}>
                <Icon> power_settings_new </Icon>
                <Span> Logout </Span>
              </StyledItem>
            </MatxMenu>
          </Box>
        </TopbarContainer>
      </TopbarRoot>
    </>
  );
};

export default React.memo(Layout1Topbar);

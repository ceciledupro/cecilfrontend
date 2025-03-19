import { styled } from "@mui/system";
import { MatxVerticalNav } from "../../app/components";
import useSettings from "../../app/hooks/useSettings";

import { navigations as adminNavigation } from "../../app/adminnavigation"; // Create an admin navigation file
import { navigations as studentNavigation } from "../../app/studentnavigation"; // Create a student navigation file
import { navigations as teachersNavigation } from "../../app/teachersnavigation"; // Create a teacher navigation file
import { navigations as parentsNavigation } from "../../app/parentnavigation"; // Create a teacher navigation file
import useAuth from "../../app/hooks/useAuth";
import { Fragment } from "react";
import Scrollbar from "react-perfect-scrollbar";

const StyledScrollBar = styled(Scrollbar)(() => ({
  paddingLeft: "1rem",
  paddingRight: "1rem",
  position: "relative",
}));

const SideNavMobile = styled("div")(({ theme }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  bottom: 0,
  right: 0,
  width: "100vw",

  zIndex: -1,
  [theme.breakpoints.up("lg")]: { display: "none" },
}));

const Sidenav = ({ children }) => {
  const { settings, updateSettings } = useSettings();

  const updateSidebarMode = (sidebarSettings) => {
    let activeLayoutSettingsName = settings.activeLayout + "Settings";
    let activeLayoutSettings = settings[activeLayoutSettingsName];

    updateSettings({
      ...settings,
      [activeLayoutSettingsName]: {
        ...activeLayoutSettings,
        leftSidebar: {
          ...activeLayoutSettings.leftSidebar,
          ...sidebarSettings,
        },
      },
    });
  };

  const { user } = useAuth(); // Assuming user role is accessible via useAuth hook
  console.log("User:", user);
  console.log("User Role:", user?.role);
  let navigation = [];

  switch (
    user?.role // Ensure user is defined
  ) {
    case "admin":
      navigation = adminNavigation || [];
      break;
    case "student":
      navigation = studentNavigation || [];
      break;
    case "teacher":
      navigation = teachersNavigation || [];
      break;
    case "parent":
      navigation = parentsNavigation || [];
      break;
    default:
      navigation = adminNavigation || [];
  }

  console.log("Final Navigation Data:", navigation);

  return (
    <Fragment>
      <StyledScrollBar options={{ suppressScrollX: true }}>
        {children}

        <MatxVerticalNav items={navigation || []} />
      </StyledScrollBar>

      <SideNavMobile onClick={() => updateSidebarMode({ mode: "close" })} />
    </Fragment>
  );
};

export default Sidenav;

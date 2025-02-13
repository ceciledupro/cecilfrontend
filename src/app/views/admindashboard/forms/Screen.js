import { Fragment, React, useEffect, useState } from "react";
import { Box } from "@mui/system";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button, styled } from "@mui/material";
import { Link, useParams } from "react-router-dom";

import TermRep from "./TermRep";

const ContentBox = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
}));

const Screen = () => {
  return (
    <Fragment>
      <ContentBox className="analytics">
        <Box width="100%" overflow="auto">
          {/* Use studentId for "First Term Report Card" link */}
          <Link to="/dashboard/onscreen-marking-online">
            <Button
              color="primary"
              variant="contained"
              style={{ width: "100%", marginTop: "100px" }}
            >
              Onscreen Marking Online
            </Button>
          </Link>
          {/* Use id for "Cumulative Result" link */}
          <Link to="/dashboard/onscreen-marking-offline">
            <Button
              color="primary"
              variant="contained"
              style={{ width: "100%", marginTop: "100px" }}
            >
              Onscreen Marking Offline
            </Button>
          </Link>
        </Box>
      </ContentBox>
    </Fragment>
  );
};

export default Screen;

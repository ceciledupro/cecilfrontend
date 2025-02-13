import {} from "@mui/material";
import { Fragment, React, useContext, useState } from "react";
import { Box } from "@mui/system";
import { Container } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert"; // Import the MoreVert icon
import {
  Card,
  Button,
  Grid,
  styled,
  useTheme,
  Icon,
  ListItemIcon,
  Menu,
  MenuItem,
  IconButton,
  Table,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import RowCards from "../shared/RowCards";

import EditIcon from "@mui/icons-material/Edit"; // Import the Edit icon
import DeleteIcon from "@mui/icons-material/Delete";
import FormDialog2 from "../../../../app/views/material-kit/dialog/FormDialog2";
import useFetch from "../../../../hooks/useFetch";
import axios from "axios";
import { Link } from "react-router-dom";
import Examform from "./Examform";
import { SessionContext } from "../../../components/MatxLayout/Layout1/SessionContext";
const ContentBox = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
}));

const Title = styled("span")(() => ({
  fontSize: "1rem",
  fontWeight: "500",
  marginRight: ".5rem",
  textTransform: "capitalize",
}));

const SubTitle = styled("span")(({ theme }) => ({
  fontSize: "0.875rem",
  color: theme.palette.text.secondary,
}));

const H4 = styled("h4")(({ theme }) => ({
  fontSize: "1rem",
  fontWeight: "500",
  marginBottom: "16px",
  textTransform: "capitalize",
  color: theme.palette.text.secondary,
}));
const StyledTable = styled(Table)(() => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const Examlist = () => {
  const { currentSession } = useContext(SessionContext);

  // const { data, loading, error, reFetch } = useFetch("/getofflineexam");
  const { data, loading, fetchedData, error, reFetch } = useFetch(
    currentSession ? `/getofflineexam/${currentSession._id}` : null
  );

  const { palette } = useTheme();
  const [page, setPage] = useState(0);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const apiUrl = process.env.REACT_APP_API_URL;
  const [anchorElMap, setAnchorElMap] = useState({});

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleOpenDeleteConfirmation = (user) => {
    setUserToDelete(user);
    setDeleteConfirmationOpen(true);
  };
  const handleOpenMenu = (event, examId) => {
    setAnchorElMap((prev) => ({
      ...prev,
      [examId]: event.currentTarget,
    }));
  };

  // Function to handle closing the context menu for a specific exam
  const handleCloseMenu = (examId) => {
    setAnchorElMap((prev) => ({
      ...prev,
      [examId]: null,
    }));
  };

  const handleCloseDeleteConfirmation = () => {
    setUserToDelete(null);
    setDeleteConfirmationOpen(false);
  };

  const handleDeleteUser = async () => {
    try {
      const response = await axios.delete(
        `${apiUrl}/api/deleteexam/${userToDelete._id}`
      );

      console.log("Response from delete API:", response.data);

      if (response.status === 200) {
        console.log("Exam deleted successfully");

        // Manually trigger data refetch
        reFetch();
      } else {
        console.error("Failed to delete Exam");
      }
    } catch (error) {
      console.error("Error deleting Exam:", error);
    }
  };
  return (
    <Fragment>
      <ContentBox className="analytics">
        <Container>
          <Box className="breadcrumb">
            <Examform />
          </Box>

          <Box width="100%" overflow="auto">
            <div class="col-xl-12 wow fadeInUp" data-wow-delay="1.5s">
              <div class="table-responsive full-data">
                <table
                  class="table-responsive-lg table display dataTablesCard student-tab dataTable no-footer"
                  id="example-student"
                >
                  <thead>
                    <tr>
                      <th>S/N</th>
                      <th>Exam Name</th>
                      <th>Date</th>
                      <th>Comment</th>

                      <th>Action</th>
                    </tr>
                  </thead>

                  {data &&
                    data.map((item, index) => (
                      <tbody>
                        <tr key={item._id}>
                          <td>
                            {" "}
                            <h4>{index + 1}</h4>
                          </td>
                          <td>{item.name}</td>
                          <td>
                            {" "}
                            {item.date
                              ? new Date(item.date).toLocaleDateString()
                              : ""}
                          </td>
                          <td>{item.comment}</td>

                          <td>
                            <TableCell align="right">
                              <IconButton
                                aria-controls={`action-menu-${item._id}`}
                                aria-haspopup="true"
                                onClick={(event) =>
                                  handleOpenMenu(event, item._id)
                                } // Pass item._id
                              >
                                <MoreVertIcon />{" "}
                                {/* MoreVertIcon for the menu */}
                              </IconButton>
                              <Menu
                                id={`action-menu-${item._id}`}
                                anchorEl={anchorElMap[item._id]}
                                open={Boolean(anchorElMap[item._id])}
                                onClose={() => handleCloseMenu(item._id)}
                              >
                                <MenuItem>
                                  <ListItemIcon>
                                    <EditIcon /> {/* Use an Edit icon */}
                                  </ListItemIcon>
                                  Edit
                                </MenuItem>
                                <MenuItem
                                  onClick={() =>
                                    handleOpenDeleteConfirmation(item)
                                  }
                                >
                                  <ListItemIcon>
                                    <DeleteIcon />
                                  </ListItemIcon>
                                  Delete
                                </MenuItem>
                              </Menu>
                            </TableCell>
                          </td>
                        </tr>
                      </tbody>
                    ))}
                </table>
              </div>
            </div>
            <Dialog
              open={deleteConfirmationOpen}
              onClose={handleCloseDeleteConfirmation}
            >
              <DialogTitle>Delete Confirmation</DialogTitle>
              <DialogContent>
                Are you sure you want to delete {userToDelete?.name}?
              </DialogContent>
              <DialogActions>
                <Button onClick={handleCloseDeleteConfirmation}>Cancel</Button>
                <Button
                  onClick={async () => {
                    await handleDeleteUser(); // Call the asynchronous function
                    handleCloseDeleteConfirmation();
                  }}
                >
                  Delete
                </Button>
              </DialogActions>
            </Dialog>
            <TablePagination
              sx={{ px: 2 }}
              page={page}
              component="div"
              rowsPerPage={rowsPerPage}
              count={data ? data.length : 0}
              onPageChange={handleChangePage}
              rowsPerPageOptions={[5, 10, 25]}
              onRowsPerPageChange={handleChangeRowsPerPage}
              nextIconButtonProps={{ "aria-label": "Next Page" }}
              backIconButtonProps={{ "aria-label": "Previous Page" }}
            />
          </Box>

          {/* <TopSellingTable />
            <StatCards2 />

            <H4>Ongoing Projects</H4>
            <RowCards />
          </Grid>

          <Grid item lg={4} md={4} sm={12} xs={12}>
            <Card sx={{ px: 3, py: 2, mb: 3 }}>
              <Title>Traffic Sources</Title>
              <SubTitle>Last 30 days</SubTitle>

              <DoughnutChart
                height="300px"
                color={[palette.primary.dark, palette.primary.main, palette.primary.light]}
              />
            </Card>

            <UpgradeCard />
            <Campaigns />*/}
        </Container>
      </ContentBox>
    </Fragment>
  );
};

export default Examlist;

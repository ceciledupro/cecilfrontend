import {
  InputLabel,
  ListItemIcon,
  Menu,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Fragment, React, useState, useContext } from "react";
import { Box } from "@mui/system";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import {
  Card,
  Button,
  Grid,
  styled,
  useTheme,
  IconButton,
  Table,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TableCell,
  TablePagination,
  TableRow,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import useFetch from "../../../../hooks/useFetch";
import axios from "axios";
import FormClass from "../../../../app/views/material-kit/dialog/FormClass";
import EditClass from "./EditClass";
import { SessionContext } from "../../../components/MatxLayout/Layout1/SessionContext";
const ContentBox = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
}));

const Class = () => {
  const { currentSession } = useContext(SessionContext);
  // const { data, loading, error, reFetch } = useFetch("/class");
  const { data, reFetch } = useFetch(
    currentSession ? `/class/${currentSession._id}` : null
  );

  const { palette } = useTheme();
  const [page, setPage] = useState(0);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [anchorElMap, setAnchorElMap] = useState({});
  const [tableData, setTableData] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const [editClassData, setEditClassData] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = useState(null);
  const [action, setAction] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;
  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleOpenMenu = (event, itemId) => {
    // Create a new map object instead of directly modifying the state
    const updatedAnchorElMap = {
      ...anchorElMap,
      [itemId]: event.currentTarget,
    };
    setAnchorElMap(updatedAnchorElMap);
  };

  const handleEditClass = (classId) => {
    const classToEdit = data.find((item) => item.classId === classId);
    setEditClassData(classToEdit);
    setEditDialogOpen(true);
  };

  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setEditClassData(null);
  };

  const handleSaveEdit = async (updatedClassData) => {
    try {
      const response = await axios.put(
        `${apiUrl}/api/class/${updatedClassData._id}`,
        updatedClassData
      );

      console.log("Response from edit API:", response.data);

      if (response.status === 200) {
        console.log("Class updated successfully");
        handleCloseEditDialog();
        reFetch();
      } else {
        console.error("Failed to update Class");
      }
    } catch (error) {
      console.error("Error updating Class:", error);
    }
  };
  const handleCloseMenu = (itemId) => {
    // Create a new map object instead of directly modifying the state
    const updatedAnchorElMap = { ...anchorElMap, [itemId]: null };
    setAnchorElMap(updatedAnchorElMap);
  };
  const handleAction = (value) => {
    setAction(value);
    handleCloseMenu();
  };

  const handleOpenDeleteConfirmation = (user) => {
    setUserToDelete(user);
    setDeleteConfirmationOpen(true);
  };

  const handleCloseDeleteConfirmation = () => {
    setUserToDelete(null);
    setDeleteConfirmationOpen(false);
  };

  const handleDeleteClass = async () => {
    try {
      const response = await axios.delete(
        `${apiUrl}/api/class/${userToDelete._id}`
      );

      console.log("Response from delete API:", response.data);

      if (response.status === 200) {
        console.log("Class deleted successfully");

        // Manually trigger data refetch
        reFetch();
      } else {
        console.error("Failed to delete Class");
      }
    } catch (error) {
      console.error("Error deleting Class:", error);
    }
  };
  // const updateTableData = (newSubject) => {
  //   // Assuming data is an array
  //   setTableData([...data, newSubject]);
  //   reFetch(); // Trigger data refetch after updating tableData1
  // };
  const updateTableData = (newSubject) => {
    // Check if the data and setTableData functions are correctly defined
    if (Array.isArray(data)) {
      // Add newSubject to the data array and update tableData
      setTableData([...data, newSubject]);
    } else {
      // If data is not an array, handle accordingly (e.g., log an error)
      console.error("Data is not an array. Cannot update table data.");
    }

    // Ensure reFetch is correctly defined and working
    if (typeof reFetch === "function") {
      reFetch(); // Trigger data refetch
    } else {
      console.error("reFetch function is not defined or not a function.");
    }
  };

  return (
    <Fragment>
      <ContentBox className="analytics">
        <Box className="breadcrumb">
          <FormClass updateTableData={updateTableData} />
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

                    <th>Class Name</th>
                    <th>Class Teacher</th>

                    <th>Action</th>
                  </tr>
                </thead>
                {data && data.length > 0 ? (
                  data.map((item, index) => (
                    <tbody>
                      <tr key={item.classId}>
                        <td>
                          <div class="trans-list">
                            <h4>{index + 1}</h4>
                          </div>
                        </td>

                        <td>
                          <div class="date">{item.name}</div>
                        </td>
                        <td>
                          <h6 class="mb-0">{item.teacher}</h6>
                        </td>

                        <td>
                          <TableCell align="right">
                            <IconButton
                              aria-controls={`action-menu-${item._id}`}
                              aria-haspopup="true"
                              onClick={(event) =>
                                handleOpenMenu(event, item._id)
                              } // Pass item._id
                            >
                              <MoreVertIcon /> {/* MoreVertIcon for the menu */}
                            </IconButton>
                            <Menu
                              id={`action-menu-${item._id}`}
                              anchorEl={anchorElMap[item._id]}
                              open={Boolean(anchorElMap[item._id])}
                              onClose={() => handleCloseMenu(item._id)}
                            >
                              <MenuItem
                                onClick={() => handleEditClass(item.classId)}
                              >
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
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No Class to display.
                    </TableCell>
                  </TableRow>
                )}
              </table>

              {editClassData && (
                <EditClass
                  open={editDialogOpen}
                  onClose={handleCloseEditDialog}
                  classData={editClassData}
                  onSave={handleSaveEdit}
                />
              )}
              <Dialog
                open={deleteConfirmationOpen}
                onClose={handleCloseDeleteConfirmation}
              >
                <DialogTitle>Delete Confirmation</DialogTitle>
                <DialogContent>
                  Are you sure you want to delete the class "
                  {userToDelete?.name}"?
                </DialogContent>
                <DialogActions>
                  <Button onClick={handleCloseDeleteConfirmation}>
                    Cancel
                  </Button>
                  <Button
                    onClick={async () => {
                      await handleDeleteClass(); // Call the asynchronous function
                      handleCloseDeleteConfirmation();
                    }}
                  >
                    Delete
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
          </div>

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
      </ContentBox>
    </Fragment>
  );
};

export default Class;

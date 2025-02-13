import {
  InputLabel,
  ListItemIcon,
  Menu,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { Fragment, React, useContext, useState } from "react";
import { Box } from "@mui/system";
import MoreVertIcon from "@mui/icons-material/MoreVert"; // Import the MoreVert icon

import {
  Card,
  Button,
  Grid,
  styled,
  useTheme,
  Icon,
  IconButton,
  Table,
  TableBody,
  TableCell,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import RowCards from "../shared/RowCards";
import { Container } from "@mui/material";
import { Breadcrumb } from "../../../../app/components";
import EditIcon from "@mui/icons-material/Edit"; // Import the Edit icon
import DeleteIcon from "@mui/icons-material/Delete";
import useFetch from "../../../../hooks/useFetch";
import axios from "axios";
import { Link } from "react-router-dom";
import EditExam from "./EditExam";
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

const Manage = () => {
  const { currentSession } = useContext(SessionContext);

  // const { data, loading, error, reFetch } = useFetch("/get-exam");
  const { data, loading, fetchedData, error, reFetch } = useFetch(
    currentSession ? `/get-exam/${currentSession._id}` : null
  );

  const { palette } = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [action, setAction] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);

  const [editExamData, setEditExamData] = useState(null);
  const [anchorElMap, setAnchorElMap] = useState({});
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const [selectedExam, setSelectedExam] = useState(null); // State to hold selected subject data

  const apiUrl = process.env.REACT_APP_API_URL;

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const handleOpenMenu = (event, itemId) => {
    // Rename examId to itemId
    setAnchorElMap((prev) => ({
      ...prev,
      [itemId]: event.currentTarget,
    }));
  };

  const handleCloseMenu = (itemId) => {
    // Rename examId to itemId
    setAnchorElMap((prev) => ({
      ...prev,
      [itemId]: null,
    }));
  };
  const handleCloseEditDialog = () => {
    setEditDialogOpen(false);
    setSelectedExam(null);
  };
  const handleOpenEditDialog = (exam) => {
    setSelectedExam(exam);
    setEditDialogOpen(true);
  };
  const handleOpenDeleteConfirmation = (item) => {
    // Rename exam to item
    setItemToDelete(item);
    setDeleteConfirmationOpen(true);
  };

  const handleEditExam = (examId) => {
    // Find the selected student by ID
    const selectedExam = data.find((exam) => exam?._id === examId);

    if (!selectedExam) {
      console.error("Selected student not found for ID:", examId);
      // Optionally, you can choose to return or handle this error gracefully
      return;
    }

    // Open the edit dialog with the selected student data
    setEditExamData(selectedExam);
    setEditDialogOpen(true);
  };
  const handleCloseDeleteConfirmation = () => {
    setItemToDelete(null);
    setDeleteConfirmationOpen(false);
  };

  const handleDeleteItem = async () => {
    // Rename handleDeleteExam to handleDeleteItem
    try {
      const response = await axios.delete(
        `${apiUrl}/api/exam/${itemToDelete._id}`
      );

      if (response.status === 200) {
        console.log("Item deleted successfully");
        reFetch();
      } else {
        console.error("Failed to delete item");
      }
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };
  // const handleSaveEdit = async (updatedData) => {
  //   try {
  //     const token = localStorage.getItem("jwtToken");

  //     // Check if editStudentData is not null and has the _id property
  //     if (editExamData?._id) {
  //       // Log the payload before sending the request

  //       const response = await axios.put(
  //         `${apiUrl}/api/edit-exam/${editExamData._id}`,
  //         {
  //           title: updatedData.title,
  //           className: updatedData.className,
  //           subject: updatedData.subject,
  //           date: updatedData.date,
  //           fromTime: updatedData.fromTime,
  //           toTime: updatedData.toTime,

  //           // Add other fields as needed
  //         },
  //         {
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );

  //       console.log("Exam updated successfully:", response.data);
  //       setEditDialogOpen(false);
  //       reFetch(); // Manually trigger data refetch
  //     } else {
  //       console.error("Invalid or missing _id property in editStudentData");
  //     }
  //   } catch (error) {
  //     console.error("Error updating student:", error);
  //   }
  // };
  const handleSaveEdit = async (updatedData) => {
    try {
      const token = localStorage.getItem("jwtToken");

      // Check if editExamData is not null and has the _id property
      if (editExamData?._id) {
        // Include the AM/PM indicator in the time values
        const formattedData = {
          title: updatedData.title,
          className: updatedData.className,
          subject: updatedData.subject,
          date: updatedData.date,
          fromTime: formatTime(updatedData.fromTime),
          toTime: formatTime(updatedData.toTime),
          // Add other fields as needed
        };

        // Log the payload before sending the request
        const response = await axios.put(
          `${apiUrl}/api/edit-exam/${editExamData._id}`,
          formattedData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Exam updated successfully:", response.data);
        setEditDialogOpen(false);
        reFetch(); // Manually trigger data refetch
      } else {
        console.error("Invalid or missing _id property in editExamData");
      }
    } catch (error) {
      console.error("Error updating exam:", error);
    }
  };

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    const formattedHours = parseInt(hours) % 12 || 12;
    const amPm = parseInt(hours) >= 12 ? "PM" : "AM";
    return `${formattedHours}:${minutes} ${amPm}`;
  };
  return (
    <Fragment>
      <ContentBox className="analytics">
        <Container>
          <Box className="breadcrumb">
            <Breadcrumb routeSegments={[{ name: "Student Information" }]} />
          </Box>

          <Box width="100%" overflow="auto">
            <div className="col-xl-12 wow fadeInUp" data-wow-delay="1.5s">
              <div className="table-responsive full-data">
                <div style={{ overflowX: "auto", maxWidth: "100%" }}>
                  <table
                    style={{ overflowX: "auto", maxWidth: "100%" }}
                    className="table-responsive-lg table display dataTablesCard student-tab dataTable no-footer"
                    id="example-student"
                  >
                    <thead>
                      <tr>
                        <th>
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="checkAll"
                            required=""
                          />
                        </th>
                        <th>S/N</th>
                        <th>Exam Name</th>
                        <th>Class Name</th>
                        <th>Subject</th>
                        <th>Exam Date</th>
                        <th>Time</th>
                        <th className="text-end">Action</th>
                      </tr>
                    </thead>

                    <tbody>
                      {data && data.length > 0 ? (
                        data.map((item, index) => (
                          <tr key={item._id}>
                            <td>
                              <div className="checkbox me-0 align-self-center">
                                <div className="custom-control custom-checkbox ">
                                  <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id="check16"
                                    required=""
                                  />
                                  <label
                                    className="custom-control-label"
                                    htmlFor="check16"
                                  ></label>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="trans-list">
                                <h4>{index + 1}</h4>
                              </div>
                            </td>
                            <td>
                              <span className="text-primary font-w600">
                                {item.title}
                              </span>
                            </td>
                            <td>
                              <div className="date">{item.className}</div>
                            </td>
                            <td>
                              <h6 className="mb-0">{item.subject}</h6>
                            </td>
                            <td>
                              <h6 className="mb-0">
                                {item.date
                                  ? new Date(item.date).toLocaleDateString()
                                  : ""}
                              </h6>
                            </td>
                            <td>
                              <h6 className="mb-0">
                                {item.fromTime} -- {item.toTime}
                              </h6>
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
                                    <ListItemIcon></ListItemIcon>
                                    <Link
                                      to={`/dashboard/manage-online-exam/${item._id}`}
                                    >
                                      Manage Questions
                                    </Link>
                                  </MenuItem>

                                  <MenuItem>
                                    <ListItemIcon></ListItemIcon>
                                    <Link
                                      to={`/dashboard/view-result/${item._id}`}
                                    >
                                      View Result
                                    </Link>
                                  </MenuItem>
                                  <MenuItem
                                    onClick={() => handleEditExam(item._id)}
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
                        ))
                      ) : (
                        <TableRow>
                          <TableCell colSpan={8} align="center">
                            No Exam to display.
                          </TableCell>
                        </TableRow>
                      )}
                    </tbody>
                  </table>

                  {editExamData && (
                    <EditExam
                      open={editDialogOpen}
                      onClose={() => setEditDialogOpen(false)}
                      examId={editExamData._id}
                      onSave={handleSaveEdit}
                    />
                  )}

                  <Dialog
                    open={deleteConfirmationOpen}
                    onClose={handleCloseDeleteConfirmation}
                  >
                    <DialogTitle>Delete Confirmation</DialogTitle>
                    <DialogContent>
                      Are you sure you want to delete the exam "
                      {itemToDelete?.title}"?
                    </DialogContent>
                    <DialogActions>
                      <Button onClick={handleCloseDeleteConfirmation}>
                        Cancel
                      </Button>
                      <Button onClick={handleDeleteItem}>Delete</Button>
                    </DialogActions>
                  </Dialog>
                </div>
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
        </Container>
      </ContentBox>
    </Fragment>
  );
};

export default Manage;

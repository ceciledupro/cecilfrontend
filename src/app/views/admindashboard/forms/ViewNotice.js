import React, { Fragment, useState, useEffect, useContext } from "react";
import {
  Box,
  IconButton,
  Icon,
  styled,
  Table,
  TableBody,
  MenuItem,
  Menu,
  TableCell,
  TableHead,
  TableRow,
  ListItemIcon,
} from "@mui/material";
import useFetch from "../../../../hooks/useFetch";

import { TablePagination } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert"; // Import the MoreVert icon
import EditIcon from "@mui/icons-material/Edit"; // Import the Edit icon
import DeleteIcon from "@mui/icons-material/Delete";
import NoticeBoard from "./NoticeBoard";
import DeleteNoticeModal from "./DeleteNoticeModal";
import axios from "axios";
import EditNotice from "./EditNotice";
import { SessionContext } from "../../../components/MatxLayout/Layout1/SessionContext";

const ContentBox = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
}));

const StyledTable = styled(Table)(({ theme }) => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
  },
}));

const ViewNotice = () => {
  const { currentSession } = useContext(SessionContext);
  const { data, loading, error, reFetch } = useFetch(
    currentSession ? `/get-all-notices/${currentSession._id}` : null
  );
  useEffect(() => {
    console.log("Current Session:", currentSession);
    console.log(
      "Fetching notices with URL:",
      currentSession
        ? `/get-all-notices/${currentSession._id}`
        : "No session ID"
    );
  }, [currentSession]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [editNoticeData, setEditNoticeData] = useState(null);
  const [action, setAction] = useState(null);
  const [anchorElMap, setAnchorElMap] = useState({});
  const [anchorEl, setAnchorEl] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [notices, setNotices] = useState([]); // Add or replace this line based on your component
  const apiUrl = process.env.REACT_APP_API_URL;
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [noticeIdToDelete, setNoticeIdToDelete] = useState(null);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
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
  useEffect(() => {
    if (data) {
      setNotices(data);
    }
  }, [data]);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenDeleteDialog = (noticeId) => {
    setNoticeIdToDelete(noticeId);
    setDeleteDialogOpen(true);
    handleCloseMenu(); // Close the menu when opening the dialog
  };

  const handleCloseDeleteDialog = () => {
    setDeleteDialogOpen(false);
  };

  // const handleConfirmDelete = async () => {
  //   try {
  //     // Add your API call to delete the notice using noticeIdToDelete
  //     const response = await axios.delete(
  //       `http://localhost:3003/api/delete-notice/${noticeIdToDelete}`
  //     );

  //     console.log("Response from delete API:", response.data);

  //     // Check if the delete operation was successful
  //     if (response.status === 200) {
  //       console.log("Notice deleted successfully");
  //       // Perform any additional actions after successful deletion, if needed
  //     } else {
  //       console.error("Failed to delete notice");
  //       // Handle the failure case
  //     }
  //   } catch (error) {
  //     console.error("Error deleting notice:", error);
  //     // Handle the error case
  //   }

  //   // Close the dialog after the API call
  //   handleCloseDeleteDialog();
  // };
  const handleConfirmDelete = async () => {
    try {
      const response = await axios.delete(
        `${apiUrl}/api/delete-notice/${noticeIdToDelete}`
      );

      console.log("Response from delete API:", response.data);

      if (response.status === 200) {
        console.log("Notice deleted successfully");

        // Manually refetch data to update the notices
        reFetch();
      } else {
        console.error("Failed to delete notice");
      }
    } catch (error) {
      console.error("Error deleting notice:", error);
    }

    // Close the dialog after the API call
    handleCloseDeleteDialog();
  };

  const handleEditNotice = (noticeId) => {
    // Find the selected student by ID
    const selectedNotice = data.find((notice) => notice?._id === noticeId);

    if (!selectedNotice) {
      console.error("Selected student not found for ID:", noticeId);
      // Optionally, you can choose to return or handle this error gracefully
      return;
    }

    // Open the edit dialog with the selected student data
    setEditNoticeData(selectedNotice);
    setEditDialogOpen(true);
  };

  const handleSaveEdit = async (updatedData) => {
    try {
      const token = localStorage.getItem("jwtToken");

      // Check if editStudentData is not null and has the _id property
      if (editNoticeData?._id) {
        // Log the payload before sending the request
        // console.log("Payload before sending:", {
        //   studentName: updatedData.studentName,
        //   address: updatedData.address,
        //   // Add other fields as needed
        // });

        const response = await axios.put(
          `${apiUrl}/api/edit-notice/${editNoticeData._id}`,
          {
            notice: updatedData.notice,
            posted_by: updatedData.posted_by,
            date: updatedData.date,

            // Add other fields as needed
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Notive updated successfully:", response.data);
        setEditDialogOpen(false);
        reFetch(); // Manually trigger data refetch
      } else {
        console.error("Invalid or missing _id property in editNoticeData");
      }
    } catch (error) {
      console.error("Error updating teacher:", error);
    }
  };
  const updateTableData = (newSubject) => {
    const safeData = Array.isArray(data) ? data : [];
    setTableData([...safeData, newSubject]);
    reFetch(); // Trigger data refetch after updating tableData1
  };

  return (
    <Fragment>
      <Box className="breadcrumb">
        <NoticeBoard updateTableData={updateTableData} />
      </Box>
      <ContentBox className="analytics">
        <Box width="100%" overflow="auto">
          <div class="col-xl-12 wow fadeInUp" data-wow-delay="1.5s">
            <div class="table-responsive full-data">
              <table
                class="table-responsive-lg table display dataTablesCard student-tab dataTable no-footer"
                id="example-student"
              >
                <thead>
                  <tr>
                    <th>
                      <input
                        type="checkbox"
                        class="form-check-input"
                        id="checkAll"
                        required=""
                      />
                    </th>
                    <th>S/N</th>
                    <th>Notice</th>
                    <th>Posted By</th>

                    <th class="text-end">Action</th>
                  </tr>
                </thead>
                {data && data.length > 0 ? (
                  data.map((item, index) => (
                    <tbody>
                      <tr key={item._id}>
                        <td>
                          <div class="checkbox me-0 align-self-center">
                            <div class="custom-control custom-checkbox ">
                              <input
                                type="checkbox"
                                class="form-check-input"
                                id="check16"
                                required=""
                              />
                              <label
                                class="custom-control-label"
                                for="check16"
                              ></label>
                            </div>
                          </div>
                        </td>
                        <td>
                          <div class="trans-list">
                            <h4>{index + 1}</h4>
                          </div>
                        </td>
                        <td>
                          <span class="text-primary font-w600">
                            {item.notice}
                          </span>
                        </td>
                        <td>
                          <span class="text-primary font-w600">
                            {item.posted_by}
                          </span>
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
                                onClick={() => handleEditNotice(item._id)}
                              >
                                <ListItemIcon>
                                  <EditIcon /> {/* Use an Edit icon */}
                                </ListItemIcon>
                                Edit
                              </MenuItem>
                              <MenuItem
                                onClick={() => handleOpenDeleteDialog(item._id)}
                              >
                                <ListItemIcon>
                                  <DeleteIcon /> {/* Use a Delete icon */}
                                </ListItemIcon>
                                Delete
                              </MenuItem>
                            </Menu>
                          </TableCell>
                        </td>
                        <DeleteNoticeModal
                          open={deleteDialogOpen}
                          onClose={handleCloseDeleteDialog}
                          onConfirm={handleConfirmDelete}
                        />
                      </tr>
                    </tbody>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      No Notice to display.
                    </TableCell>
                  </TableRow>
                )}
              </table>

              {editNoticeData && (
                <EditNotice
                  open={editDialogOpen}
                  onClose={() => setEditDialogOpen(false)}
                  noticeId={editNoticeData._id}
                  onSave={handleSaveEdit}
                />
              )}
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
      </ContentBox>
    </Fragment>
  );
};

export default ViewNotice;

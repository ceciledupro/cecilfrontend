// import React, { Fragment, useState, useEffect } from "react";
// import {
//   Box,
//   IconButton,
//   Icon,
//   styled,
//   Table,
//   TableBody,
//   MenuItem,
//   Menu,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogTitle,
//   TableCell,
//   Button,
//   Container,
//   TableHead,
//   TableRow,
//   ListItemIcon,
// } from "@mui/material";
// import useFetch from "hooks/useFetch";
// import FormDialog30 from "app/views/material-kit/dialog/FormDialog30";
// import { TablePagination } from "@mui/material";
// import MoreVertIcon from "@mui/icons-material/MoreVert"; // Import the MoreVert icon
// import EditIcon from "@mui/icons-material/Edit"; // Import the Edit icon
// import DeleteIcon from "@mui/icons-material/Delete";
// import axios from "axios";
// import FormDialog16 from "app/views/material-kit/dialog/FormDialog16";
// import EditGradeDialog from "./EditGradeDialog";

// const ContentBox = styled("div")(({ theme }) => ({
//   margin: "30px",
//   [theme.breakpoints.down("sm")]: { margin: "16px" },
// }));

// const StyledTable = styled(Table)(({ theme }) => ({
//   whiteSpace: "pre",
//   "& thead": {
//     "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
//   },
//   "& tbody": {
//     "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
//   },
// }));

// const Grade = () => {
//   const { data: fetchedData, loading, error, reFetch } = useFetch("/grade");
//   const [gradesData, setGradesData] = useState([]);

//   useEffect(() => {
//     // Set the fetched data to the state
//     setGradesData(fetchedData || []);
//   }, [fetchedData]);

//   const [page, setPage] = useState(0);
//   const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
//   const [userToDelete, setUserToDelete] = useState(null);
//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [editGradeData, setEditGradeData] = useState(null);
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   const [selectedGradeId, setSelectedGradeId] = useState(null);
//   const [anchorEl, setAnchorEl] = useState(null);

//   const [editDialogOpen, setEditDialogOpen] = useState(false);

//   const [action, setAction] = useState(null);

//   const apiUrl = process.env.REACT_APP_API_URL.trim();

//   useEffect(() => {
//     // Fetch data when the component mounts
//     fetchData();
//   }, []);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get(`${apiUrl}/api/grade`);
//       setGradesData(response.data || []);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   const handleChangePage = (_, newPage) => {
//     setPage(newPage);
//   };
//   // const handleOpenMenu = (event) => {
//   //   setAnchorEl(event.currentTarget);
//   // };

//   const handleOpenMenu = (event, gradeId) => {
//     event.preventDefault(); // Prevent default behavior of the anchor tag
//     console.log("Opening menu for gradeId:", gradeId);
//     setAnchorEl(event.currentTarget);
//     setSelectedGradeId(gradeId);
//   };

//   const handleCloseMenu = () => {
//     setAnchorEl(null);
//   };
//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };
//   const handleOpenDeleteConfirmation = (user) => {
//     setUserToDelete(user);
//     setDeleteConfirmationOpen(true);
//   };

//   const handleCloseDeleteConfirmation = () => {
//     setUserToDelete(null);
//     setDeleteConfirmationOpen(false);
//   };

//   const handleDeleteUser = async () => {
//     try {
//       const response = await axios.delete(
//         `${apiUrl}/api/grade/${userToDelete._id}`
//       );

//       console.log("Response from delete API:", response.data);

//       if (response.status === 200) {
//         console.log("User deleted successfully");

//         // Manually trigger data refetch
//         reFetch();
//       } else {
//         console.error("Failed to delete User");
//       }
//     } catch (error) {
//       console.error("Error deleting User:", error);
//     }
//   };

//   const handleEditGrade = (grade) => {
//     // Open the edit dialog with the selected grade data
//     setEditGradeData(grade);
//     setEditDialogOpen(true);
//   };
//   const handleSaveEdit = async (updatedGrade) => {
//     // Save the edited grade data
//     try {
//       const response = await axios.put(
//         `${apiUrl}/api/grade/${updatedGrade._id}`,
//         updatedGrade
//       );
//       console.log("Grade updated successfully:", response.data);
//       // Refetch data after editing
//       fetchData();
//     } catch (error) {
//       console.error("Error updating grade:", error);
//     }
//   };
//   return (
//     <Fragment>
//       <ContentBox className="analytics">
//         <Container>
//           <Box className="breadcrumb">
//             <FormDialog16 setGradesData={setGradesData} />
//           </Box>

//           <Box width="100%" overflow="auto">
//             <div class="col-xl-12 wow fadeInUp" data-wow-delay="1.5s">
//               <div class="table-responsive full-data">
//                 <table
//                   class="table-responsive-lg table display dataTablesCard student-tab dataTable no-footer"
//                   id="example-student"
//                 >
//                   <thead>
//                     <tr>
//                       <th>S/N</th>

//                       <th>Grade Name</th>
//                       <th>Grade Point</th>
//                       <th>Mark From</th>
//                       <th>Mark up to</th>
//                       <th>Comment</th>

//                       <th class="text-end">Action</th>
//                     </tr>
//                   </thead>
//                   {gradesData && gradesData.length > 0 ? (
//                     <tbody>
//                       {gradesData.map((item, index) => (
//                         <tr key={item._id}>
//                           <td>
//                             <div class="trans-list">
//                               <h4>{index + 1}</h4>
//                             </div>
//                           </td>

//                           <td>
//                             <span class="text-primary font-w600">
//                               {item.grade_name}
//                             </span>
//                           </td>
//                           <td>
//                             <div class="date">{item.gradepoint}</div>
//                           </td>
//                           <td>
//                             <h6 class="mb-0">{item.markfrom}</h6>
//                           </td>
//                           <td>
//                             <h6 class="mb-0">{item.markupto}</h6>
//                           </td>
//                           <td>
//                             <h6 class="mb-0">{item.comment}</h6>
//                           </td>

//                           <td>
//                             <TableCell align="right">
//                               <IconButton
//                                 aria-controls="action-menu"
//                                 aria-haspopup="true"
//                                 onClick={handleOpenMenu}
//                               >
//                                 <MoreVertIcon />{" "}
//                                 {/* MoreVertIcon for the menu */}
//                               </IconButton>
//                               <Menu
//                                 id="action-menu"
//                                 anchorEl={anchorEl}
//                                 open={Boolean(anchorEl)}
//                                 onClose={handleCloseMenu}
//                               >
//                                 <MenuItem
//                                   onClick={() => handleEditGrade(item._id)}
//                                 >
//                                   <ListItemIcon>
//                                     <EditIcon /> {/* Use an Edit icon */}
//                                   </ListItemIcon>
//                                   Edit
//                                 </MenuItem>
//                                 <MenuItem
//                                   onClick={() =>
//                                     handleOpenDeleteConfirmation(item)
//                                   }
//                                 >
//                                   <ListItemIcon>
//                                     <DeleteIcon />
//                                   </ListItemIcon>
//                                   Delete
//                                 </MenuItem>
//                               </Menu>
//                             </TableCell>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   ) : (
//                     <TableRow>
//                       <TableCell colSpan={5} align="center">
//                         No Parent to display.
//                       </TableCell>
//                     </TableRow>
//                   )}
//                 </table>
//                 {/* Edit Grade Dialog */}
//                 <EditGradeDialog
//                   open={editDialogOpen}
//                   onClose={() => {
//                     setEditGradeData(null);
//                     setEditDialogOpen(false);
//                   }}
//                   gradeId={editGradeData} // Pass gradeId instead of grade object
//                   onSave={handleSaveEdit}
//                 />
//                 <Dialog
//                   open={deleteConfirmationOpen}
//                   onClose={handleCloseDeleteConfirmation}
//                 >
//                   <DialogTitle>Delete Confirmation</DialogTitle>
//                   <DialogContent>
//                     Are you sure you want to delete {userToDelete?.username}?
//                   </DialogContent>
//                   <DialogActions>
//                     <Button onClick={handleCloseDeleteConfirmation}>
//                       Cancel
//                     </Button>
//                     <Button
//                       onClick={async () => {
//                         await handleDeleteUser(); // Call the asynchronous function
//                         handleCloseDeleteConfirmation();
//                       }}
//                     >
//                       Delete
//                     </Button>
//                   </DialogActions>
//                 </Dialog>
//               </div>
//             </div>

//             {/*}  <TablePagination
//             sx={{ px: 2 }}
//             page={page}
//             component="div"
//             rowsPerPage={rowsPerPage}
//             // count={data ? data.length : 0}
//             onPageChange={handleChangePage}
//             rowsPerPageOptions={[5, 10, 25]}
//             onRowsPerPageChange={handleChangeRowsPerPage}
//             nextIconButtonProps={{ "aria-label": "Next Page" }}
//             backIconButtonProps={{ "aria-label": "Previous Page" }}
//                   />*/}
//           </Box>
//         </Container>
//       </ContentBox>
//     </Fragment>
//   );
// };

// export default Grade;

import React, { Fragment, useContext, useEffect, useState } from "react";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  TableCell,
  Dialog,
  DialogTitle,
  Table,
  styled,
  TableRow,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Container,
  Box,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import FormDialog16 from "../../../../app/views/material-kit/dialog/FormDialog16";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import axios from "axios";
import EditGradeDialog from "./EditGradeDialog";
import useFetch from "../../../../hooks/useFetch";
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

const Grade = () => {
  const { currentSession } = useContext(SessionContext);
  // const { data, loading, error, reFetch } = useFetch(
  //   currentSession ? `/grade/${currentSession._id}` : null
  // );

  console.log("Current session:", currentSession); // Log the current session

  const [gradesData, setGradesData] = useState([]);

  // useEffect(() => {
  //   setGradesData(fetchedData || []);
  // }, [fetchedData]);

  const [page, setPage] = useState(0);
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedGradeId, setSelectedGradeId] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [editGradeData, setEditGradeData] = useState(null);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const apiUrl = process.env.REACT_APP_API_URL;

  // const fetchData = async () => {
  //   try {
  //     const response = await axios.get(`${apiUrl}/api/grade`);
  //     setGradesData(response.data || []);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  // };
  const fetchData = async () => {
    if (!currentSession) {
      setGradesData([]); // Clear the data when there's no session
      return;
    }

    console.log("Fetching data for session:", currentSession._id);
    try {
      const response = await axios.get(
        `${apiUrl}/api/grade/${currentSession._id}`
      );
      console.log("Fetched grades data:", response.data);

      if (response.data && response.data.success) {
        setGradesData(response.data.data);
      } else {
        setGradesData([]);
        console.error("Failed to fetch grades data");
      }
    } catch (error) {
      setGradesData([]);
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (currentSession) {
      console.log("Current session:", currentSession);
      fetchData();
    }
  }, [currentSession]);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleOpenMenu = (event, gradeId) => {
    event.preventDefault(); // Prevent default behavior of the anchor tag
    console.log("Opening menu for gradeId:", gradeId);
    setAnchorEl(event.currentTarget);
    setSelectedGradeId(gradeId);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenDeleteConfirmation = (user) => {
    setUserToDelete(user);
    setDeleteConfirmationOpen(true);
  };

  const handleCloseDeleteConfirmation = () => {
    setUserToDelete(null);
    setDeleteConfirmationOpen(false);
  };

  const handleDeleteUser = async () => {
    try {
      const response = await axios.delete(
        `${apiUrl}/api/grade/${userToDelete._id}`
      );
      console.log("Response from delete API:", response.data);
      if (response.status === 200) {
        console.log("User deleted successfully");
        // reFetch();
        fetchData();
      } else {
        console.error("Failed to delete User");
      }
    } catch (error) {
      console.error("Error deleting User:", error);
    }
  };

  const handleEditGrade = () => {
    // Open the edit dialog with the selected grade ID
    setEditDialogOpen(true);
  };

  const handleSaveEdit = async (updatedGrade) => {
    // Save the edited grade data
    try {
      const response = await axios.put(
        `${apiUrl}/api/grade/${updatedGrade._id}`,
        updatedGrade
      );
      console.log("Grade updated successfully:", response.data);
      fetchData();
    } catch (error) {
      console.error("Error updating grade:", error);
    }
  };

  return (
    <Fragment>
      <ContentBox className="analytics">
        <Container>
          <Box className="breadcrumb">
            <FormDialog16 setGradesData={setGradesData} />
          </Box>

          <Box width="100%" overflow="auto">
            <div className="col-xl-12 wow fadeInUp" data-wow-delay="1.5s">
              <div className="table-responsive full-data">
                <table
                  className="table-responsive-lg table display dataTablesCard student-tab dataTable no-footer"
                  id="example-student"
                >
                  <thead>
                    <tr>
                      <th>S/N</th>
                      <th>Grade Name</th>
                      <th>Grade Point</th>
                      <th>Mark From</th>
                      <th>Mark up to</th>
                      <th>Comment</th>
                      <th className="text-end">Action</th>
                    </tr>
                  </thead>
                  {gradesData && gradesData.length > 0 ? (
                    <tbody>
                      {gradesData.map((item, index) => (
                        <tr key={item._id}>
                          <td>
                            <div className="trans-list">
                              <h4>{index + 1}</h4>
                            </div>
                          </td>
                          <td>
                            <span className="text-primary font-w600">
                              {item.grade_name}
                            </span>
                          </td>
                          <td>
                            <div className="date">{item.gradepoint}</div>
                          </td>
                          <td>
                            <h6 className="mb-0">{item.markfrom}</h6>
                          </td>
                          <td>
                            <h6 className="mb-0">{item.markupto}</h6>
                          </td>
                          <td>
                            <h6 className="mb-0">{item.comment}</h6>
                          </td>
                          <td>
                            <TableCell align="right">
                              <IconButton
                                aria-controls="action-menu"
                                aria-haspopup="true"
                                onClick={(event) =>
                                  handleOpenMenu(event, item._id)
                                }
                              >
                                <MoreVertIcon />{" "}
                                {/* MoreVertIcon for the menu */}
                              </IconButton>
                              <Menu
                                id="action-menu"
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleCloseMenu}
                              >
                                <MenuItem onClick={handleEditGrade}>
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
                      ))}
                    </tbody>
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        No Grade to display.
                      </TableCell>
                    </TableRow>
                  )}
                </table>
                {/* Edit Grade Dialog */}
                <EditGradeDialog
                  open={editDialogOpen}
                  onClose={() => {
                    setEditGradeData(null);
                    setEditDialogOpen(false);
                  }}
                  gradeId={selectedGradeId} // Pass selectedGradeId instead of grade object
                  onSave={handleSaveEdit}
                />
                <Dialog
                  open={deleteConfirmationOpen}
                  onClose={handleCloseDeleteConfirmation}
                >
                  <DialogTitle>Delete Confirmation</DialogTitle>
                  <DialogContent>
                    Are you sure you want to delete {userToDelete?.username}?
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={handleCloseDeleteConfirmation}>
                      Cancel
                    </Button>
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
              </div>
            </div>
          </Box>
        </Container>
      </ContentBox>
    </Fragment>
  );
};

export default Grade;

// import React, { Fragment, useState, useEffect, useContext } from "react";
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
//   TableHead,
//   TableRow,
//   Container,
//   ListItemIcon,
// } from "@mui/material";
// import useFetch from "../../../../hooks/useFetch";
// import { Breadcrumb } from "../../../../app/components";
// import FormDialog30 from "../../../../app/views/material-kit/dialog/FormDialog30";
// import { TablePagination } from "@mui/material";
// import MoreVertIcon from "@mui/icons-material/MoreVert"; // Import the MoreVert icon
// import EditIcon from "@mui/icons-material/Edit"; // Import the Edit icon
// import DeleteIcon from "@mui/icons-material/Delete";
// import axios from "axios";
// import FormDialog16 from "../../../../app/views/material-kit/dialog/FormDialog16";
// import EditGradeDialog from "./EditGradeDialog";
// import StudyMatForm from "./StudyMatForm";
// import { SessionContext } from "../../../components/MatxLayout/Layout1/SessionContext";

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

// const StudyMat = () => {
//   const { currentSession } = useContext(SessionContext);

//   // const { data: fetchedData, error, reFetch } = useFetch("/");
//   const { downloads, fetchedData, error, reFetch } = useFetch(
//     currentSession ? `/download/${currentSession._id}` : null
//   );

//   const [gradesData, setGradesData] = useState([]);
//   // const [downloads, setDownloads] = useState([]);
//   useEffect(() => {
//     // Set the fetched data to the state
//     setGradesData(fetchedData || []);
//   }, [fetchedData]);

//   const [page, setPage] = useState(0);
//   const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
//   const [userToDelete, setUserToDelete] = useState(null);
//   const [editModalOpen, setEditModalOpen] = useState(false);
//   const [editGradeData, setEditGradeData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [rowsPerPage, setRowsPerPage] = useState(5);

//   const [selectedGradeId, setSelectedGradeId] = useState(null);
//   const [anchorEl, setAnchorEl] = useState(null);
//   // const [download, setDownload] = useState({
//   //   date: "",
//   //   title: "",
//   //   desc: "",
//   //   class: "",
//   //   subject: "",

//   //   Download: "",
//   // });
//   const [editDialogOpen, setEditDialogOpen] = useState(false);

//   const [action, setAction] = useState(null);

//   const apiUrl = process.env.REACT_APP_API_URL.trim();

//   useEffect(() => {
//     // Fetch data when the component mounts
//     fetchData();
//   }, []);
//   // useEffect(() => {
//   //   const fetchDownloads = async () => {
//   //     try {
//   //       const response = await axios.get(`${apiUrl}/api/download`);
//   //       setDownloads(response.data.data); // Update downloads state with fetched data
//   //       setLoading(false);
//   //     } catch (error) {
//   //       console.error("Error fetching downloads:", error);
//   //       setLoading(false);
//   //     }
//   //   };

//   //   fetchDownloads();
//   // }, []); // Fetch downloads on component mount

//   const fetchData = async () => {
//     try {
//       const response = await axios
//         .get
//         // `https://hlhs-3ff6501095d6.herokuapp.com/api/grade`
//         ();
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
//       const response = await axios
//         .delete
//         // `https://hlhs-3ff6501095d6.herokuapp.com/api/grade/${userToDelete._id}`
//         ();

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
//         // `https://hlhs-3ff6501095d6.herokuapp.com/api/grade/${updatedGrade._id}`,
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
//             <Breadcrumb routeSegments={[{ name: "Manage Study Material" }]} />
//           </Box>
//           <Box className="breadcrumb">
//             <StudyMatForm />
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

//                       <th>Date</th>
//                       <th>Title</th>
//                       <th>Description</th>
//                       <th>Class</th>
//                       <th>Subject</th>
//                       <th>Download</th>

//                       <th class="text-end">Action</th>
//                     </tr>
//                   </thead>

//                   <tbody>
//                     {loading ? (
//                       <TableRow></TableRow>
//                     ) : downloads.length === 0 ? (
//                       <TableRow>
//                         <TableCell colSpan={8} align="center">
//                           No Study Material to display.
//                         </TableCell>
//                       </TableRow>
//                     ) : (
//                       downloads.map((download, index) => (
//                         <tr key={download._id}>
//                           <td>
//                             <div class="trans-list">
//                               <h4>{index + 1}</h4>
//                             </div>
//                           </td>

//                           <td>
//                             <span class="text-primary font-w600">
//                               {download.date
//                                 ? new Date(download.date).toLocaleDateString()
//                                 : ""}
//                             </span>
//                           </td>
//                           <td>
//                             <div class="date">{download.title}</div>
//                           </td>
//                           <td>
//                             <h6 class="mb-0">{download.desc}</h6>
//                           </td>
//                           <td>
//                             <h6 class="mb-0">{download.className}</h6>
//                           </td>
//                           <td>
//                             <h6 class="mb-0">{download.subject}</h6>
//                           </td>
//                           <td>
//                             <Button
//                               variant="contained"
//                               component="a"
//                               href={`https://edupros.s3.amazonaws.com/${download.Download}`}
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               download // Add the download attribute here
//                             >
//                               Download
//                             </Button>
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
//                                   onClick={() => handleEditGrade(download._id)}
//                                 >
//                                   <ListItemIcon>
//                                     <EditIcon /> {/* Use an Edit icon */}
//                                   </ListItemIcon>
//                                   Edit
//                                 </MenuItem>
//                                 <MenuItem
//                                   onClick={() =>
//                                     handleOpenDeleteConfirmation(download)
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
//                       ))
//                     )}
//                   </tbody>
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

//             <TablePagination
//               sx={{ px: 2 }}
//               page={page}
//               component="div"
//               rowsPerPage={rowsPerPage}
//               count={downloads ? downloads.length : 0}
//               onPageChange={handleChangePage}
//               rowsPerPageOptions={[5, 10, 25]}
//               onRowsPerPageChange={handleChangeRowsPerPage}
//               nextIconButtonProps={{ "aria-label": "Next Page" }}
//               backIconButtonProps={{ "aria-label": "Previous Page" }}
//             />
//           </Box>
//         </Container>
//       </ContentBox>
//     </Fragment>
//   );
// };

// export default StudyMat;

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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TableCell,
  Button,
  TableHead,
  TableRow,
  Container,
  ListItemIcon,
} from "@mui/material";
import useFetch from "../../../../hooks/useFetch";
import { Breadcrumb } from "../../../../app/components";
import FormDialog30 from "../../../../app/views/material-kit/dialog/FormDialog30";
import { TablePagination } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert"; // Import the MoreVert icon
import EditIcon from "@mui/icons-material/Edit"; // Import the Edit icon
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import FormDialog16 from "../../../../app/views/material-kit/dialog/FormDialog16";
import EditGradeDialog from "./EditGradeDialog";
import StudyMatForm from "./StudyMatForm";
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

const StudyMat = () => {
  const { currentSession } = useContext(SessionContext);
  const { data, error, reFetch, loading } = useFetch(
    currentSession ? `/download/${currentSession._id}` : null
  );
  console.log("Current session:", currentSession);

  console.log("Data fetched:", data); // Ensure this is displaying the expected data structure

  const [downloads, setDownloads] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedGradeId, setSelectedGradeId] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElMap, setAnchorElMap] = useState({});
  const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editGradeData, setEditGradeData] = useState(null);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpenMenu = (event, examId) => {
    setAnchorElMap((prev) => ({
      ...prev,
      [examId]: event.currentTarget,
    }));
  };

  const handleCloseMenu = (examId) => {
    setAnchorElMap((prev) => ({
      ...prev,
      [examId]: null,
    }));
  };

  const handleOpenDeleteConfirmation = (user) => {
    setDownloads(user);
    setDeleteConfirmationOpen(true);
  };

  const handleCloseDeleteConfirmation = () => {
    setDownloads(null);
    setDeleteConfirmationOpen(false);
  };

  const handleDeleteUser = async () => {
    try {
      const response = await axios.delete(
        // `${apiUrl}/api/users/${userToDelete._id}`
        `${apiUrl}/api/download/${currentSession._id}/${downloads._id}`
      );

      console.log("Response from delete API:", response.data);

      if (response.status === 200) {
        console.log("User deleted successfully");

        // Manually trigger data refetch
        reFetch();
      } else {
        console.error("Failed to delete User");
      }
    } catch (error) {
      console.error("Error deleting User:", error);
    }
  };

  const handleEditGrade = (grade) => {
    setEditGradeData(grade);
    setEditDialogOpen(true);
  };

  const handleSaveEdit = async (updatedGrade) => {
    try {
      // Make your API call here to save the edited grade
      // After successful edit, refetch the data
      await reFetch();
      setEditDialogOpen(false);
    } catch (error) {
      console.error("Error updating grade:", error);
    }
  };

  return (
    <Fragment>
      <ContentBox className="analytics">
        <Container>
          <Box className="breadcrumb">
            <Breadcrumb routeSegments={[{ name: "Manage Study Material" }]} />
          </Box>
          <Box className="breadcrumb">
            <StudyMatForm />
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
                      <th>Date</th>
                      <th>Title</th>
                      <th>Description</th>
                      <th>Class</th>
                      <th>Subject</th>
                      <th>Download</th>
                      <th className="text-end">Action</th>
                    </tr>
                  </thead>

                  {data && Array.isArray(data) && data.length > 0 ? (
                    <tbody>
                      {data.map((download, index) => (
                        <tr key={download._id}>
                          <td>{index + 1}</td>
                          <td>
                            {download.date
                              ? new Date(download.date).toLocaleDateString()
                              : ""}
                          </td>
                          <td>{download.title}</td>
                          <td>{download.desc}</td>
                          <td>{download.className}</td>
                          <td>{download.subject}</td>
                          <td>
                            <Button
                              variant="contained"
                              component="a"
                              href={download.Downloads}
                              target="_blank"
                              rel="noopener noreferrer"
                              download
                            >
                              Download
                            </Button>
                          </td>

                          <td>
                            <TableCell align="right">
                              <IconButton
                                aria-controls={`action-menu-${download._id}`}
                                aria-haspopup="true"
                                onClick={(event) =>
                                  handleOpenMenu(event, download._id)
                                } // Pass item._id
                              >
                                <MoreVertIcon />{" "}
                                {/* MoreVertIcon for the menu */}
                              </IconButton>
                              <Menu
                                id={`action-menu-${download._id}`}
                                anchorEl={anchorElMap[download._id]}
                                open={Boolean(anchorElMap[download._id])}
                                onClose={() => handleCloseMenu(download._id)}
                              >
                                <MenuItem>
                                  <ListItemIcon>
                                    <EditIcon /> {/* Use an Edit icon */}
                                  </ListItemIcon>
                                  Edit
                                </MenuItem>
                                <MenuItem
                                  onClick={() =>
                                    handleOpenDeleteConfirmation(download)
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
                      <TableCell colSpan={8} align="center">
                        No Study material to display.
                      </TableCell>
                    </TableRow>
                  )}
                </table>
                <EditGradeDialog
                  open={editDialogOpen}
                  onClose={() => {
                    setEditGradeData(null);
                    setEditDialogOpen(false);
                  }}
                  gradeId={editGradeData}
                  onSave={handleSaveEdit}
                />
                <Dialog
                  open={deleteConfirmationOpen}
                  onClose={handleCloseDeleteConfirmation}
                >
                  <DialogTitle>Delete Confirmation</DialogTitle>
                  <DialogContent>
                    Are you sure you want to delete {downloads?.username}?
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

export default StudyMat;

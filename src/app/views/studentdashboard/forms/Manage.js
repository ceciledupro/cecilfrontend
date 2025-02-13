// import React, { Fragment, useEffect, useState } from "react";
// import { Box } from "@mui/system";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TablePagination,
//   TableRow,
//   IconButton,
//   MenuItem,
//   ListItemIcon,
//   Tooltip,
//   Menu,
//   Icon,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   Button,
//   DialogContentText,
//   DialogTitle,
// } from "@mui/material";
// import axios from "axios"; // Import Axios for making API requests
// import { useTheme } from "@mui/material/styles"; // Import useTheme
// import FormDialog4 from "app/views/material-kit/dialog/FormDialog4";
// import moment from "moment-timezone";

// import useAuth from "app/hooks/useAuth";
// import EditIcon from "@mui/icons-material/Edit"; // Import the Edit icon
// import DeleteIcon from "@mui/icons-material/Delete";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import MoreVertIcon from "@mui/icons-material/MoreVert"; // Import the MoreVert icon
// import { Breadcrumb } from "app/components";
// // ... other imports ...

// const Manage = () => {
//   const { palette } = useTheme(); // Define palette from useTheme
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [data, setData] = useState([]); // State to store fetched exams
//   const [resultData, setresultData] = useState([]); // State to store fetched exams
//   const { logout, user } = useAuth();
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [anchorElMap, setAnchorElMap] = useState({});
//   const apiUrl = process.env.REACT_APP_API_URL;
//   const navigate = useNavigate();
//   const handleManageQuestions = (examId) => {
//     navigate(`/student/dashboard/manage-online-exam/${examId}`);
//   };

//   console.log("Data:", data);
//   // Function to fetch exams
//   const fetchExams = async () => {
//     try {
//       // Fetch the authentication token from local storage
//       const token = localStorage.getItem("jwtToken");

//       // Include the token in the request headers
//       const headers = {
//         Authorization: `Bearer ${token}`,
//       };

//       const response = await axios.get(
//         `https://hlhs-3ff6501095d6.herokuapp.com/api/get-exams-by-class/${user.classname}`,
//         { headers } // Include the headers in the request
//       );

//       setData(response.data);
//     } catch (error) {
//       console.error("Error fetching exams:", error);
//     }
//   };
//   console.log("Data:", data);

//   useEffect(() => {
//     fetchExams(); // Fetch exams when the component mounts
//   }, []); // Empty dependency array ensures the effect runs once

//   const handleChangePage = (_, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };
//   // const handleOpenMenu = async (event, item) => {
//   //   try {
//   //     console.log("Item:", item); // Log the item object to inspect its contents

//   //     if (!item || !item.date || !item.fromTime || !item.toTime) {
//   //       throw new Error("Exam details are incomplete.");
//   //     }

//   //     const userLocalTime = await getUserLocalTime();
//   //     const startTime = new Date(item.date); // Parse the date string directly
//   //     const fromTime24Hours = convertTo24HourFormat(item.fromTime); // Convert to 24-hour format
//   //     const fromTimeParts = fromTime24Hours.split(":");
//   //     startTime.setHours(parseInt(fromTimeParts[0])); // Set hours
//   //     startTime.setMinutes(parseInt(fromTimeParts[1])); // Set minutes
//   //     const endTime = new Date(item.date); // Parse the date string directly
//   //     const toTime24Hours = convertTo24HourFormat(item.toTime); // Convert to 24-hour format
//   //     const toTimeParts = toTime24Hours.split(":");
//   //     endTime.setHours(parseInt(toTimeParts[0])); // Set hours
//   //     endTime.setMinutes(parseInt(toTimeParts[1])); // Set minutes

//   //     console.log("Exam From Time:", startTime.toLocaleString());
//   //     console.log("Exam To Time:", endTime.toLocaleString());
//   //     console.log("User Local Time:", userLocalTime.toLocaleString());

//   //     if (userLocalTime >= startTime && userLocalTime <= endTime) {
//   //       setAnchorElMap((prev) => ({
//   //         ...prev,
//   //         [item._id]: event.currentTarget,
//   //       }));
//   //     } else {
//   //       alert("It's not yet time for this exam.");
//   //     }
//   //   } catch (error) {
//   //     console.error("Error handling menu open event:", error);
//   //     // Handle error (e.g., display error message to the user)
//   //   }
//   // };
//   const handleOpenMenu = async (event, item) => {
//     try {
//       console.log("Item:", item); // Log the item object to inspect its contents

//       if (!item || !item.date || !item.fromTime || !item.toTime) {
//         throw new Error("Exam details are incomplete.");
//       }

//       const userLocalTime = await getUserLocalTime();
//       const startTime = new Date(item.date); // Parse the date string directly
//       const fromTime24Hours = convertTo24HourFormat(item.fromTime); // Convert to 24-hour format
//       const fromTimeParts = fromTime24Hours.split(":");
//       startTime.setHours(parseInt(fromTimeParts[0])); // Set hours
//       startTime.setMinutes(parseInt(fromTimeParts[1])); // Set minutes
//       const endTime = new Date(item.date); // Parse the date string directly
//       const toTime24Hours = convertTo24HourFormat(item.toTime); // Convert to 24-hour format
//       const toTimeParts = toTime24Hours.split(":");
//       endTime.setHours(parseInt(toTimeParts[0])); // Set hours
//       endTime.setMinutes(parseInt(toTimeParts[1])); // Set minutes

//       console.log("Exam From Time:", startTime.toLocaleString());
//       console.log("Exam To Time:", endTime.toLocaleString());
//       console.log("User Local Time:", userLocalTime.toLocaleString());

//       if (userLocalTime >= startTime && userLocalTime <= endTime) {
//         setAnchorElMap((prev) => ({
//           ...prev,
//           [item._id]: event.currentTarget,
//         }));
//       } else {
//         alert("It's not yet time for this exam.");
//       }
//     } catch (error) {
//       console.error("Error handling menu open event:", error);
//       // Handle error (e.g., display error message to the user)
//     }
//   };

//   const convertTo24HourFormat = (time12Hour) => {
//     const [time, modifier] = time12Hour.split(" ");
//     let [hours, minutes] = time.split(":");
//     if (hours === "12") {
//       hours = "00";
//     }
//     if (modifier === "PM") {
//       hours = parseInt(hours, 10) + 12;
//     }
//     return `${hours}:${minutes}`;
//   };

//   // Modify the getUserLocalTime function to return the user's local time as a Date object
//   // const getUserLocalTime = async () => {
//   //   try {
//   //     // Get user's coordinates using Geolocation API
//   //     const position = await new Promise((resolve, reject) => {
//   //       navigator.geolocation.getCurrentPosition(resolve, reject);
//   //     });

//   //     // Convert coordinates to time zone using Google Time Zone API
//   //     const response = await axios.get(
//   //       "https://maps.googleapis.com/maps/api/timezone/json",
//   //       {
//   //         params: {
//   //           location: `${position.coords.latitude},${position.coords.longitude}`,
//   //           timestamp: Math.floor(Date.now() / 1000), // Convert milliseconds to seconds
//   //           key: "YOUR_GOOGLE_API_KEY", // Replace with your Google Time Zone API key
//   //         },
//   //       }
//   //     );

//   //     // Calculate user's local time using time zone offset
//   //     const localTimeOffset = response.data.rawOffset + response.data.dstOffset;
//   //     const userLocalTime = new Date(Date.now() + localTimeOffset * 1000); // Convert seconds to milliseconds

//   //     console.log("User Local Time:", userLocalTime.toLocaleString()); // Log user's local time

//   //     return userLocalTime;
//   //   } catch (error) {
//   //     console.error("Failed to get user's local time:", error);
//   //     throw new Error("Failed to get user's local time.");
//   //   }
//   // };

//   const getUserLocalTime = () => {
//     try {
//       const userLocalTime = new Date(); // Get the current date and time in the user's local time zone
//       console.log("User Local Time:", userLocalTime.toLocaleString()); // Log user's local time

//       return userLocalTime;
//     } catch (error) {
//       console.error("Failed to get user's local time:", error);
//       throw new Error("Failed to get user's local time.");
//     }
//   };

//   // Other parts of your code...

//   // Other parts of your code...

//   const handleCloseMenu = (examId) => {
//     setAnchorElMap((prev) => ({
//       ...prev,
//       [examId]: null,
//     }));
//   };

//   return (
//     <Fragment>
//       {/* ... your other JSX for Breadcrumb and FormDialog4 ... */}

//       <Box
//         className="breadcrumb"
//         style={{ marginTop: "40px", marginBottom: "30px", paddingLeft: "20px" }}
//       >
//         <Breadcrumb
//           routeSegments={[
//             // { name: "Material", path: "/material" },
//             { name: "Manage Online Exam" },
//           ]}
//         />
//       </Box>
//       <div class="table-responsive full-data">
//         <table
//           class="table-responsive-lg table display dataTablesCard student-tab dataTable no-footer"
//           id="example-student"
//         >
//           <thead>
//             <tr>
//               <th>S/N</th>
//               <th>Exam Name</th>
//               <th>Class Name</th>
//               <th>Subject</th>
//               <th>Exam Date</th>
//               <th>Time</th>
//               <th>Action</th>
//             </tr>
//           </thead>

//           {data && data.length > 0 ? (
//             data.map((item, index) => (
//               <tbody>
//                 <tr key={item._id}>
//                   <td>
//                     <div class="trans-list">
//                       <h4>{index + 1}</h4>
//                     </div>
//                   </td>

//                   <td>
//                     <div class="date">{item.title}</div>
//                   </td>
//                   <td>
//                     <h6 class="mb-0">{item.className}</h6>
//                   </td>
//                   <td>
//                     <h6 class="mb-0">{item.subject}</h6>
//                   </td>
//                   <td>
//                     <h6 class="mb-0">
//                       {item.date
//                         ? new Date(item.date).toLocaleDateString()
//                         : ""}
//                     </h6>
//                   </td>
//                   <td>
//                     <h6 class="mb-0">
//                       {" "}
//                       {item.fromTime} --
//                       {item.toTime}
//                     </h6>
//                   </td>

//                   <td>
//                     <TableCell align="right">
//                       <IconButton
//                         aria-controls={`action-menu-${item._id}`}
//                         aria-haspopup="true"
//                         onClick={(event) => handleOpenMenu(event, item)}

//                         // onClick={(event) =>
//                         //   handleOpenMenu(
//                         //     event,
//                         //     item._id,
//                         //     new Date(item.date), // Pass exam date as Date object
//                         //     item.fromTime,
//                         //     item.toTime
//                         //   )
//                         // }
//                       >
//                         <MoreVertIcon /> {/* MoreVertIcon for the menu */}
//                       </IconButton>

//                       <Menu
//                         id={`action-menu-${item._id}`}
//                         anchorEl={anchorElMap[item._id]}
//                         open={Boolean(anchorElMap[item._id])}
//                         onClose={() => handleCloseMenu(item._id)}
//                       >
//                         {/*}  <MenuItem>
//                           <ListItemIcon></ListItemIcon>
//                           <Link
//                             to={`/student/dashboard/manage-online-exam/${item._id} `}
//                           >
//                             Manage Questions
//                           </Link>
//                       </MenuItem>*/}

//                         <MenuItem
//                           onClick={() => handleManageQuestions(item._id)}
//                         >
//                           <ListItemIcon></ListItemIcon>
//                           Manage Questions
//                         </MenuItem>
//                       </Menu>
//                     </TableCell>
//                   </td>
//                 </tr>
//               </tbody>
//             ))
//           ) : (
//             <TableRow>
//               <TableCell colSpan={5} align="center">
//                 No Exam to display.
//               </TableCell>
//             </TableRow>
//           )}
//         </table>
//       </div>
//       <TablePagination
//         sx={{ px: 2 }}
//         page={page}
//         component="div"
//         rowsPerPage={rowsPerPage}
//         count={data.length}
//         onPageChange={handleChangePage}
//         rowsPerPageOptions={[5, 10, 25]}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//         nextIconButtonProps={{ "aria-label": "Next Page" }}
//         backIconButtonProps={{ "aria-label": "Previous Page" }}
//       />
//     </Fragment>
//   );
// };

// export default Manage;
import React, { useState, useContext, useEffect, Fragment } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useTheme } from "@mui/material/styles";
import {
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  TablePagination,
  Box,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Breadcrumb } from "../../../../app/components";
import useAuth from "../../../../app/hooks/useAuth";
import { SessionContext } from "../../../components/MatxLayout/Layout1/SessionContext";
import { Link } from "react-router-dom";
const Manage = () => {
  const { palette } = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [data, setData] = useState([]);
  const [anchorElMap, setAnchorElMap] = useState({});
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL.trim();
  const { currentSession } = useContext(SessionContext);

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get(
          `${apiUrl}/api/get-exams-by-class/${user.classname}/${currentSession._id}`,
          { headers }
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching exams:", error);
      }
    };
    fetchExams();
  }, [user.classname, currentSession]);

  const handleManageQuestions = (examId) => {
    navigate(`/student/dashboard/manage-online-exam/${examId}`);
  };

  const handleOpenMenu = async (event, item) => {
    try {
      // Get user's local time
      const userLocalTime = new Date();

      // Convert exam start time to Date object
      const startTime = new Date(item.date);
      const fromTime24Hours = convertTo24HourFormat(item.fromTime);
      const fromTimeParts = fromTime24Hours.split(":");
      startTime.setHours(parseInt(fromTimeParts[0], 10));
      startTime.setMinutes(parseInt(fromTimeParts[1], 10));

      // Convert exam end time to Date object
      const endTime = new Date(item.date);
      const toTime24Hours = convertTo24HourFormat(item.toTime);
      const toTimeParts = toTime24Hours.split(":");
      endTime.setHours(parseInt(toTimeParts[0], 10));
      endTime.setMinutes(parseInt(toTimeParts[1], 10));

      // Check if the student has submitted the exam
      const examTaken = item.submittedAnswers.some(
        (answer) => answer.userId === user._id // Compare logged-in user's ID with submittedAnswers userId
      );

      // If the exam has been submitted
      if (examTaken) {
        // Check if the exam time has elapsed
        if (userLocalTime > endTime) {
          alert(
            "You have already taken this exam, and the exam time has ended."
          );
          return; // Prevent further action if the time has elapsed
        } else {
          alert(
            "You have already taken this exam, but the exam time hasn't finished. You can continue."
          );
        }
      }

      // Check if it's still within the exam time window
      if (userLocalTime >= startTime && userLocalTime <= endTime) {
        setAnchorElMap((prev) => ({
          ...prev,
          [item._id]: event.currentTarget,
        }));
      } else {
        alert("It's not yet time for this exam, or the exam time has ended.");
      }
    } catch (error) {
      console.error("Error handling menu open event:", error);
    }
  };

  const handleCloseMenu = (examId) => {
    setAnchorElMap((prev) => ({
      ...prev,
      [examId]: null,
    }));
  };

  // Function to get user's local time
  const getUserLocalTime = () => {
    try {
      const userLocalTime = new Date();
      return userLocalTime;
    } catch (error) {
      console.error("Failed to get user's local time:", error);
      throw new Error("Failed to get user's local time.");
    }
  };

  // Function to convert time to 24-hour format
  const convertTo24HourFormat = (time12Hour) => {
    const [time, modifier] = time12Hour.split(" ");
    let [hours, minutes] = time.split(":");
    if (hours === "12") {
      hours = "00";
    }
    if (modifier === "PM") {
      hours = parseInt(hours, 10) + 12;
    }
    return `${hours}:${minutes}`;
  };

  return (
    <Fragment>
      <Box
        className="breadcrumb"
        style={{ marginTop: "40px", marginBottom: "30px", paddingLeft: "20px" }}
      >
        <Breadcrumb routeSegments={[{ name: "Manage Online Exam" }]} />
      </Box>
      <div className="table-responsive full-data">
        <table
          className="table-responsive-lg table display dataTablesCard student-tab dataTable no-footer"
          id="example-student"
        >
          <thead>
            <tr>
              <th>S/N</th>
              <th>ExamnName</th>
              <th>Class Name</th>
              <th>Subject</th>
              <th>Exam Date</th>
              <th>Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item._id}>
                <td>
                  <div className="trans-list">
                    <h4>{index + 1}</h4>
                  </div>
                </td>
                <td>
                  <div className="date">
                    {" "}
                    <MenuItem onClick={() => handleManageQuestions(item._id)}>
                      {item.title}{" "}
                    </MenuItem>
                  </div>
                </td>
                <td>
                  <h6 className="mb-0">{item.className}</h6>
                </td>
                <td>
                  <h6 className="mb-0">{item.subject}</h6>
                </td>
                <td>
                  <h6 className="mb-0">
                    {item.date ? new Date(item.date).toLocaleDateString() : ""}
                  </h6>
                </td>
                <td>
                  <h6 className="mb-0">
                    {item.fromTime} -- {item.toTime}
                  </h6>
                </td>
                <td>
                  <IconButton
                    aria-controls={`action-menu-${item._id}`}
                    aria-haspopup="true"
                    onClick={(event) => handleOpenMenu(event, item)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id={`action-menu-${item._id}`}
                    anchorEl={anchorElMap[item._id]}
                    open={Boolean(anchorElMap[item._id])}
                    onClose={() => handleCloseMenu(item._id)}
                  >
                    <MenuItem onClick={() => handleManageQuestions(item._id)}>
                      <ListItemIcon></ListItemIcon>
                      Manage Questions
                    </MenuItem>
                  </Menu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TablePagination
        sx={{ px: 2 }}
        page={page}
        component="div"
        rowsPerPage={rowsPerPage}
        count={data.length}
        onPageChange={(e, newPage) => setPage(newPage)}
        rowsPerPageOptions={[5, 10, 25]}
        onRowsPerPageChange={(event) => {
          setRowsPerPage(+event.target.value);
          setPage(0);
        }}
        nextIconButtonProps={{ "aria-label": "Next Page" }}
        backIconButtonProps={{ "aria-label": "Previous Page" }}
      />
    </Fragment>
  );
};

// const Manage = () => {
//   const { palette } = useTheme();
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [data, setData] = useState([]);
//   const [anchorElMap, setAnchorElMap] = useState({});
//   const { logout, user } = useAuth();
//   const navigate = useNavigate();
//   const apiUrl = process.env.REACT_APP_API_URL.trim();

//   const { currentSession } = useContext(SessionContext);

//   useEffect(() => {
//         const fetchExams = async () => {
//           try {
//             const token = localStorage.getItem("jwtToken");
//             const headers = { Authorization: `Bearer ${token}` };
//             const response = await axios.get(
//               `${apiUrl}/api/get-exams-by-class/${user.classname}/${currentSession._id}`,
//               { headers }
//             );
//             setData(response.data);
//           } catch (error) {
//             console.error("Error fetching exams:", error);
//           }
//         };
//         fetchExams();
//       }, [user.classname, currentSession]);

//   const handleManageQuestions = (examId) => {
//     navigate(`/student/dashboard/manage-online-exam/${examId}`);
//   };

//   const handleOpenMenu = async (event, item) => {
//     try {
//       // Get user's local time
//       const userLocalTime = new Date();

//       // Convert exam start time to Date object
//       const startTime = new Date(item.date);
//       const fromTime24Hours = convertTo24HourFormat(item.fromTime);
//       const fromTimeParts = fromTime24Hours.split(":");
//       startTime.setHours(parseInt(fromTimeParts[0], 10));
//       startTime.setMinutes(parseInt(fromTimeParts[1], 10));

//       // Convert exam end time to Date object
//       const endTime = new Date(item.date);
//       const toTime24Hours = convertTo24HourFormat(item.toTime);
//       const toTimeParts = toTime24Hours.split(":");
//       endTime.setHours(parseInt(toTimeParts[0], 10));
//       endTime.setMinutes(parseInt(toTimeParts[1], 10));

//       // Check if it's time for the exam
//       if (userLocalTime >= startTime && userLocalTime <= endTime) {
//         setAnchorElMap((prev) => ({
//           ...prev,
//           [item._id]: event.currentTarget,
//         }));
//       } else {
//         alert("It's not yet time for this exam.");
//       }
//     } catch (error) {
//       console.error("Error handling menu open event:", error);
//     }
//   };

//   const handleCloseMenu = (examId) => {
//     setAnchorElMap((prev) => ({
//       ...prev,
//       [examId]: null,
//     }));
//   };

//   // Function to get user's local time
//   const getUserLocalTime = () => {
//     try {
//       const userLocalTime = new Date();
//       return userLocalTime;
//     } catch (error) {
//       console.error("Failed to get user's local time:", error);
//       throw new Error("Failed to get user's local time.");
//     }
//   };

//   // Function to convert time to 24-hour format
//   const convertTo24HourFormat = (time12Hour) => {
//     const [time, modifier] = time12Hour.split(" ");
//     let [hours, minutes] = time.split(":");
//     if (hours === "12") {
//       hours = "00";
//     }
//     if (modifier === "PM") {
//       hours = parseInt(hours, 10) + 12;
//     }
//     return `${hours}:${minutes}`;
//   };

//   return (
//     <Fragment>
//       <Box
//         className="breadcrumb"
//         style={{ marginTop: "40px", marginBottom: "30px", paddingLeft: "20px" }}
//       >
//         <Breadcrumb routeSegments={[{ name: "Manage Online Exam" }]} />
//       </Box>
//       <div className="table-responsive full-data">
//         <table
//           className="table-responsive-lg table display dataTablesCard student-tab dataTable no-footer"
//           id="example-student"
//         >
//           <thead>
//             <tr>
//               <th>S/N</th>
//               <th>Exam Name</th>
//               <th>Class Name</th>
//               <th>Subject</th>
//               <th>Exam Date</th>
//               <th>Time</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((item, index) => (
//               <tr key={item._id}>
//                 <td>
//                   <div className="trans-list">
//                     <h4>{index + 1}</h4>
//                   </div>
//                 </td>
//                 <td>
//                   <div className="date">{item.title}</div>
//                 </td>
//                 <td>
//                   <h6 className="mb-0">{item.className}</h6>
//                 </td>
//                 <td>
//                   <h6 className="mb-0">{item.subject}</h6>
//                 </td>
//                 <td>
//                   <h6 className="mb-0">
//                     {item.date ? new Date(item.date).toLocaleDateString() : ""}
//                   </h6>
//                 </td>
//                 <td>
//                   <h6 className="mb-0">
//                     {item.fromTime} -- {item.toTime}
//                   </h6>
//                 </td>
//                 <td>
//                  <IconButton
//                     aria-controls={`action-menu-${item._id}`}
//                     aria-haspopup="true"
//                     onClick={(event) => handleOpenMenu(event, item)}
//                   >
//                     <MoreVertIcon />
//                   </IconButton>
//                   <Menu
//                     id={`action-menu-${item._id}`}
//                     anchorEl={anchorElMap[item._id]}
//                     open={Boolean(anchorElMap[item._id])}
//                     onClose={() => handleCloseMenu(item._id)}
//                   >
//                     <MenuItem onClick={() => handleManageQuestions(item._id)}>
//                       <ListItemIcon></ListItemIcon>
//                       Manage Questions
//                     </MenuItem>
//                   </Menu>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <TablePagination
//         sx={{ px: 2 }}
//         page={page}
//         component="div"
//         rowsPerPage={rowsPerPage}
//         count={data.length}
//         onPageChange={(e, newPage) => setPage(newPage)}
//         rowsPerPageOptions={[5, 10, 25]}
//         onRowsPerPageChange={(event) => {
//           setRowsPerPage(+event.target.value);
//           setPage(0);
//         }}
//         nextIconButtonProps={{ "aria-label": "Next Page" }}
//         backIconButtonProps={{ "aria-label": "Previous Page" }}
//       />
//     </Fragment>
//   );
// };

// export default Manage;

export default Manage;

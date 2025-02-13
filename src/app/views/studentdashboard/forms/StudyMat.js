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

import { TablePagination } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert"; // Import the MoreVert icon
import EditIcon from "@mui/icons-material/Edit"; // Import the Edit icon
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";

import { SessionContext } from "../../../components/MatxLayout/Layout1/SessionContext";
import useAuth from "../../../hooks/useAuth";

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

// const StudyMat = () => {
//   const { currentSession } = useContext(SessionContext);
//   const { logout, user } = useAuth();
//   const [error, setError] = useState(null);
//   // const { data, error, reFetch, loading } = useFetch(
//   //   currentSession ? `/downloaded/${currentSession._id}/${className}` : null
//   // );
//   console.log("Current session:", currentSession);

//   const [downloads, setDownloads] = useState([]);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [data, setData] = useState([]);

//   const apiUrl = process.env.REACT_APP_API_URL.trim();
//   const handleChangePage = (_, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   // Fetch study materials (downloads) by class and session using useEffect
//   useEffect(() => {
//     const fetchDownloads = async () => {
//       if (!currentSession || !user) return; // Ensure session and user are available
//       console.log("User info:", user);
//       console.log("User's className:", user.classname);

//       try {
//         const token = localStorage.getItem("jwtToken"); // Assuming token is stored in localStorage
//         const headers = { Authorization: `Bearer ${token}` };
//         const response = await axios.get(
//           `${apiUrl}/api/downloaded/${currentSession._id}/${user.classname}`,
//           { headers }
//         );
//         setData(response.data);
//         console.log("download resonse:", response.data);
//       } catch (error) {
//         setError("Failed to fetch downloads. Please try again later.");

//         console.error("Error fetching downloads:", error);
//       }
//     };

//     fetchDownloads();
//   }, [apiUrl, currentSession, user]);
//   const paginatedData = data.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );

//   return (
//     <Fragment>
//       <ContentBox className="analytics">
//         <Container>
//           <Box className="breadcrumb">
//             <Breadcrumb routeSegments={[{ name: "Manage Study Material" }]} />
//           </Box>

//           <Box width="100%" overflow="auto">
//             <div className="col-xl-12 wow fadeInUp" data-wow-delay="1.5s">
//               <div className="table-responsive full-data">
//                 <table
//                   className="table-responsive-lg table display dataTablesCard student-tab dataTable no-footer"
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
//                       <th className="text-end">Action</th>
//                     </tr>
//                   </thead>

//                   {data && Array.isArray(data) && data.length > 0 ? (
//                     <tbody>
//                       {data.map((download, index) => (
//                         <tr key={download._id}>
//                           <td>{index + 1}</td>
//                           <td>
//                             {download.date
//                               ? new Date(download.date).toLocaleDateString()
//                               : ""}
//                           </td>
//                           <td>{download.title}</td>
//                           <td>{download.desc}</td>
//                           <td>{download.className}</td>
//                           <td>{download.subject}</td>
//                           <td>
//                             <Button
//                               variant="contained"
//                               component="a"
//                               href={download.Downloads}
//                               target="_blank"
//                               rel="noopener noreferrer"
//                               download
//                             >
//                               Download
//                             </Button>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   ) : (
//                     <TableRow>
//                       <TableCell colSpan={8} align="center">
//                         No Study material to display.
//                       </TableCell>
//                     </TableRow>
//                   )}
//                 </table>
//               </div>
//             </div>
//             <TablePagination
//               sx={{ px: 2 }}
//               page={page}
//               component="div"
//               rowsPerPage={rowsPerPage}
//               count={data ? data.length : 0}
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

const StudyMat = () => {
  const { currentSession } = useContext(SessionContext);
  const { user } = useAuth();
  const [error, setError] = useState(null);
  const [downloads, setDownloads] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const apiUrl = process.env.REACT_APP_API_URL.trim();

  // Fetch study materials (downloads) using useEffect
  useEffect(() => {
    const fetchDownloads = async () => {
      if (!currentSession || !user) return; // Ensure session and user are available

      try {
        const token = localStorage.getItem("jwtToken"); // Assuming token is stored in localStorage
        const headers = { Authorization: `Bearer ${token}` };
        const response = await axios.get(
          `${apiUrl}/api/downloaded/${currentSession._id}/${user.classname}`,
          { headers }
        );
        setDownloads(response.data.data || []); // Adjust based on your response structure
      } catch (error) {
        setError("Failed to fetch downloads. Please try again later.");
        console.error("Error fetching downloads:", error);
      }
    };

    fetchDownloads();
  }, [apiUrl, currentSession, user]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const paginatedData = downloads.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Fragment>
      <ContentBox className="analytics">
        <Container>
          <Box className="breadcrumb">
            <Breadcrumb routeSegments={[{ name: "Manage Study Material" }]} />
          </Box>

          <Box width="100%" overflow="auto">
            <div className="col-xl-12 wow fadeInUp" data-wow-delay="1.5s">
              <div className="table-responsive full-data">
                <Table className="table-responsive-lg">
                  <TableHead>
                    <TableRow>
                      <TableCell>S/N</TableCell>
                      <TableCell>Date</TableCell>
                      <TableCell>Title</TableCell>
                      <TableCell>Description</TableCell>
                      <TableCell>Class</TableCell>
                      <TableCell>Subject</TableCell>
                      <TableCell>Download</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {downloads.length > 0 ? (
                      paginatedData.map((download, index) => (
                        <TableRow key={download._id}>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>
                            {download.date
                              ? new Date(download.date).toLocaleDateString()
                              : ""}
                          </TableCell>
                          <TableCell>{download.title}</TableCell>
                          <TableCell>{download.desc}</TableCell>
                          <TableCell>{download.className}</TableCell>
                          <TableCell>{download.subject}</TableCell>
                          <TableCell>
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
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={8} align="center">
                          No Study material to display.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
            <TablePagination
              sx={{ px: 2 }}
              page={page}
              component="div"
              rowsPerPage={rowsPerPage}
              count={downloads.length}
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

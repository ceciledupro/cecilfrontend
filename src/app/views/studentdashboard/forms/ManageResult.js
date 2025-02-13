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
//   Menu,
// } from "@mui/material";
// import axios from "axios";
// import { useTheme } from "@mui/material/styles";
// import useAuth from "app/hooks/useAuth";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import { Breadcrumb } from "app/components";
// import { useParams } from "react-router-dom";

// const ManageResult = () => {
//   const { palette } = useTheme();
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [scores, setScores] = useState([]);
//   const { user } = useAuth();
//   const { id } = useParams(); // Get examId from the URL

//   console.log("Received examId:", id);

//   const examId = id; // Assuming the entire parameter is the examId

//   // Function to fetch results
//   const fetchResults = async () => {
//     try {
//       const token = localStorage.getItem("jwtToken");
//       const headers = {
//         Authorization: `Bearer ${token}`,
//       };

//       const response = await axios.get(
//         `http://localhost:3003/api/exams/score/${examId}/${user.id}`,
//         { headers }
//       );

//       setScores(response.data);
//     } catch (error) {
//       console.error("Error fetching results:", error);
//     }
//   };

//   useEffect(() => {
//     fetchResults();
//   }, [examId, user.id]);

//   const handleChangePage = (_, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };

//   return (
//     <Fragment>
//       <Box className="breadcrumb">
//         <Breadcrumb
//           routeSegments={[
//             { name: "Material", path: "/material" },
//             { name: "Manage Online Exam" },
//           ]}
//         />
//       </Box>
//       <div>
//         <button>Active Exams</button>
//         <button>View Results</button>
//       </div>

//       <Table>
//         <TableHead>
//           <TableRow>
//             <TableCell align="left">Exam Name</TableCell>
//             <TableCell align="center">Subject</TableCell>
//             <TableCell align="center">Total Mark</TableCell>
//             <TableCell align="center">Obtained Mark</TableCell>
//             <TableCell align="center">Result</TableCell>
//             <TableCell align="right">Action</TableCell>
//           </TableRow>
//         </TableHead>

//         <TableBody>
//           {scores.map((item) => (
//             <TableRow key={item._id}>
//               <TableCell align="center">{item.title}</TableCell>
//               <TableCell align="center">{item.subject}</TableCell>
//               <TableCell align="center">Total Mark</TableCell>
//               <TableCell align="center">{item.score}</TableCell>
//               <TableCell align="center">Result</TableCell>
//               <TableCell align="right">
//                 <IconButton>
//                   <MoreVertIcon />
//                 </IconButton>
//                 <Menu></Menu>
//               </TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>

//       <TablePagination
//         sx={{ px: 2 }}
//         page={page}
//         component="div"
//         rowsPerPage={rowsPerPage}
//         count={scores.length}
//         onPageChange={handleChangePage}
//         rowsPerPageOptions={[5, 10, 25]}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//         nextIconButtonProps={{ "aria-label": "Next Page" }}
//         backIconButtonProps={{ "aria-label": "Previous Page" }}
//       />
//     </Fragment>
//   );
// };

// export default ManageResult;

import React, { useContext, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  IconButton,
  Menu,
} from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import useAuth from "../../../../app/hooks/useAuth";
import AuthContext from "../../../../app/contexts/JWTAuthContext";

// Import useNavigate
import { useNavigate } from "react-router-dom";
import { SessionContext } from "../../../components/MatxLayout/Layout1/SessionContext";

const ManageResult = () => {
  // const { user } = useContext(AuthContext);
  const { user } = useAuth();
  const { id: examId } = useParams();

  console.log("User ID:", user.id);
  console.log("Exam ID:", examId);

  const { id } = useParams(); // Access examId from URL
  const [scores, setScores] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const apiUrl = process.env.REACT_APP_API_URL;
  const { currentSession } = useContext(SessionContext);
  // Import useNavigate
  const navigate = useNavigate();

  // Function to navigate to the "View Result" route with userId parameter
  const navigateToViewResult = () => {
    navigate(`/student/dashboard/manage-online-result/${user.id}`);
  };

  useEffect(() => {
    const fetchExamScore = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(
          `${apiUrl}/api/students/all-scores/${user._id}/${currentSession._id}`, // Use user._id instead of user.id
          {
            headers,
          }
        );
        setScores(response.data);
      } catch (error) {
        console.error("Error fetching exam score:", error);
      }
    };

    fetchExamScore();
  }, [user._id]);
  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="left">Exam Name</TableCell>
            <TableCell align="center">Subject</TableCell>
            <TableCell align="center">Obtained Mark</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {scores.length > 0 ? (
            scores.map((item) => (
              <TableRow key={item.examTitle}>
                <TableCell align="center">{item.examTitle}</TableCell>
                <TableCell align="center">{item.subject}</TableCell>
                <TableCell align="center">{item.score}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={3}>No scores available</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <TablePagination
        component="div"
        page={page}
        rowsPerPage={rowsPerPage}
        count={scores.length}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 25]}
        onRowsPerPageChange={handleChangeRowsPerPage}
        nextIconButtonProps={{ "aria-label": "Next Page" }}
        backIconButtonProps={{ "aria-label": "Previous Page" }}
      />
    </div>
  );
};

export default ManageResult;

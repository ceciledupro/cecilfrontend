// import { Fragment, React, useEffect, useState } from "react";
// import { Box } from "@mui/system";
// import MoreVertIcon from "@mui/icons-material/MoreVert"; // Import the MoreVert icon

// import { Card, Button, Grid, styled, Table } from "@mui/material";

// import { Link, useParams } from "react-router-dom";
// import useAuth from "app/hooks/useAuth";
// import useFetch from "hooks/useFetch";
// const ContentBox = styled("div")(({ theme }) => ({
//   margin: "30px",
//   [theme.breakpoints.down("sm")]: { margin: "16px" },
// }));

// const MarkSheet = () => {
//   const [studentData, setStudentData] = useState(null); // Add state for student data
//   const { data, loading, error } = useFetch(`/students/SS3/${id}`);

//   const { id } = useParams();
//   const { user } = useAuth();
//   const fetchStudentData = async (studentId) => {
//     try {
//       const response = await fetch(`/students/${studentId}`);
//       if (!response.ok) {
//         throw new Error(`Error fetching student data: ${response.statusText}`);
//       }

//       const studentInfo = await response.json();
//       console.log("Fetched student data:", studentInfo);
//       setStudentData(studentInfo);
//     } catch (error) {
//       console.error("Error fetching student data:", error.message);
//       // Handle the error here
//     }
//   };

//   useEffect(() => {
//     // Fetch student data when the component mounts
//     fetchStudentData(id);
//   }, [id]);

//   // Add a conditional check for studentData
//   useEffect(() => {
//     // Check if studentData is not null and contains expected properties
//     if (studentData && studentData.studentName && studentData.classname) {
//       console.log("Fetched student data:", studentData);
//     }
//   }, [studentData]);
//   return (
//     <Fragment>
//       <ContentBox className="analytics">
//         {/*}   <h2>
//           MarkSheet for {studentData ? studentData.studentName : ""}
//           {studentData ? studentData.classname : ""}
//   </h2>*/}
//         <h2>
//           MarkSheet for {data.studentName}
//           {data.classname}
//         </h2>

//         <Box width="100%" overflow="auto">
//           <Button
//             color="primary"
//             variant="contained"
//             type="submit"
//             style={{ width: "100%", marginTop: "100px" }}
//           >
//             Cummulative Result
//           </Button>
//         </Box>
//       </ContentBox>
//     </Fragment>
//   );
// };

// export default MarkSheet;
import { Fragment, React, useEffect, useState } from "react";
import { Box } from "@mui/system";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Button, styled } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import useFetch from "../../../../hooks/useFetch";
import useAuth from "../../../../app/hooks/useAuth";

const ContentBox = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
}));

const MarkSheet = () => {
  const [studentData, setStudentData] = useState(null);
  const { user } = useAuth();
  console.log("User:", user);

  const { data, loading, error } = useFetch(`/students/${user._id}`); // Fetch data using the correct URL

  useEffect(() => {
    // Check if the data is available before updating the state
    console.log("Data from useFetch:", data);
    if (data && data.studentName && data.classname) {
      console.log("Fetched student data:", data);
      setStudentData(data);
    }
  }, [data]);

  return (
    <Fragment>
      <ContentBox className="analytics">
        <h2>
          Marksheet for {studentData ? studentData?.studentName : ""}({" "}
          {studentData ? studentData?.classname : ""})
        </h2>

        <Box width="100%" overflow="auto">
          <Link to={`/dashboard/first_term_report_card/${user._id}`}>
            <Button
              color="primary"
              variant="contained"
              style={{ width: "100%", marginTop: "20px" }}
            >
              First Term Report Card
            </Button>
          </Link>
          <Link to={`/dashboard/term_report_card/${user._id}`}>
            <Button
              color="primary"
              variant="contained"
              style={{ width: "100%", marginTop: "20px" }}
            >
              Second Term Report Card
            </Button>
          </Link>
          <Link to={`/dashboard/third_term_report_card/${user._id}`}>
            <Button
              color="primary"
              variant="contained"
              style={{ width: "100%", marginTop: "20px" }}
            >
              Third Term Report Card
            </Button>
          </Link>

          <Link>
            <Button
              color="primary"
              variant="contained"
              style={{ width: "100%", marginTop: "20px" }}
            >
              Cummulative Result
            </Button>
          </Link>
        </Box>
      </ContentBox>
    </Fragment>
  );
};

export default MarkSheet;

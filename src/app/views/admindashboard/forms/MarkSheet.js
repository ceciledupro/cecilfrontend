// import { Fragment, React, useEffect, useState } from "react";
// import { Box } from "@mui/system";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import { Button, styled } from "@mui/material";
// import { Link, useParams } from "react-router-dom";
// import useFetch from "hooks/useFetch";

// const ContentBox = styled("div")(({ theme }) => ({
//   margin: "30px",
//   [theme.breakpoints.down("sm")]: { margin: "16px" },
// }));

// const MarkSheet = () => {
//   const [studentData, setStudentData] = useState(null);
//   const { id } = useParams();
//   console.log("Student ID:", id);

//   const { data, loading, error } = useFetch(`/students/${id}`); // Fetch data using the correct URL

//   useEffect(() => {
//     // Check if the data is available before updating the state
//     console.log("Data from useFetch:", data);
//     if (data && data.studentName && data.classname) {
//       console.log("Fetched student data:", data);
//       setStudentData(data);
//     }
//   }, [data]);

//   return (
//     <Fragment>
//       <ContentBox className="analytics">
//         <h2>
//           Marksheet for {studentData ? studentData.studentName : ""}({" "}
//           {studentData ? studentData.classname : ""})
//         </h2>

//         <Box width="100%" overflow="auto">
//           <Link to={`/dashboard/term_report_card/${data._id}`}>
//             <Button
//               color="primary"
//               variant="contained"
//               style={{ width: "100%", marginTop: "100px" }}
//             >
//               First Term Report Card
//             </Button>
//           </Link>
//           <Link to={`/dashboard/report_card/${data._id}`}>
//             <Button
//               color="primary"
//               variant="contained"
//               style={{ width: "100%", marginTop: "100px" }}
//             >
//               Cummulative Result
//             </Button>
//           </Link>
//         </Box>
//       </ContentBox>
//     </Fragment>
//   );
// };

// export default MarkSheet;

// ... (import statements)

// import { Fragment, React, useEffect, useState, useContext } from "react";
// import { Box } from "@mui/system";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import { Button, styled } from "@mui/material";
// import { Link, useParams } from "react-router-dom";
// import useFetch from "../../../../hooks/useFetch";
// import TermRep from "./TermRep";

// const ContentBox = styled("div")(({ theme }) => ({
//   margin: "30px",
//   [theme.breakpoints.down("sm")]: { margin: "16px" },
// }));

// const MarkSheet = () => {
//   const [studentData, setStudentData] = useState(null);
//   const { id } = useParams();
//   console.log("Student ID:", id);

//   const { data, loading, error } = useFetch(`/students/${id}`); // Fetch data using the correct URL
//   useEffect(() => {
//     // Check if the data is available before updating the state
//     console.log("Data from useFetch:", data);
//     if (data && data.studentName && data.classname) {
//       console.log("Fetched student data:", data);
//       setStudentData(data);
//     }
//   }, [data]);
//   console.log("student data", data);
//   // useEffect(() => {
//   //   // Check if the data is available before updating the state
//   //   console.log("Data from useFetch:", data);
//   //   if (data) {
//   //     // If data is an array and contains at least one object, extract the first one
//   //     const student = Array.isArray(data) && data.length > 0 ? data[0] : data;

//   //     // Ensure student contains the expected fields before setting state
//   //     if (student && student.studentName && student.classname) {
//   //       setStudentData(student);
//   //     }
//   //   }
//   // }, [data]);

//   return (
//     <Fragment>
//       <ContentBox className="analytics">
//         <h2>
//           Marksheet for {studentData ? studentData.studentName : ""}{" "}
//           {studentData ? studentData.classname : ""}
//         </h2>

//         <Box width="100%" overflow="auto">
//           {/* Use studentId for "First Term Report Card" link */}
//           <Link to={`/dashboard/first_term_report_card/${id}`}>
//             <Button
//               color="primary"
//               variant="contained"
//               style={{ width: "100%", marginTop: "20px" }}
//             >
//               First Term Report Card
//             </Button>
//           </Link>
//           <Link to={`/dashboard/term_report_card/${id}`}>
//             <Button
//               color="primary"
//               variant="contained"
//               style={{ width: "100%", marginTop: "20px" }}
//             >
//               Second Term Report Card
//             </Button>
//           </Link>
//           <Link to={`/dashboard/third_term_report_card/${id}`}>
//             <Button
//               color="primary"
//               variant="contained"
//               style={{ width: "100%", marginTop: "20px" }}
//             >
//               Third Term Report Card
//             </Button>
//           </Link>
//           {/* Use id for "Cumulative Result" link */}
//           <Link>
//             <Button
//               color="primary"
//               variant="contained"
//               style={{ width: "100%", marginTop: "20px" }}
//             >
//               Cumulative Result
//             </Button>
//           </Link>
//         </Box>
//       </ContentBox>
//     </Fragment>
//   );
// };

// // export default MarkSheet;
// import { Fragment, React, useEffect, useState } from "react";
// import { Box } from "@mui/system";
// import { Button, styled } from "@mui/material";
// import { Link, useParams } from "react-router-dom";
// import useFetch from "../../../../hooks/useFetch";

// const ContentBox = styled("div")(({ theme }) => ({
//   margin: "30px",
//   [theme.breakpoints.down("sm")]: { margin: "16px" },
// }));

// const MarkSheet = () => {
//   const [studentData, setStudentData] = useState(null);
//   const { id } = useParams();
//   console.log("Student ID:", id);

//   const { data, loading, error } = useFetch(`/students/${id}`);
//   console.log("Fetched data:", data);

//   useEffect(() => {
//     if (data && data.student) {
//       console.log("Fetched student data:", data.student);
//       setStudentData(data.student); // Set the student data from the "student" property
//     }
//   }, [data]);

//   return (
//     <Fragment>
//       <ContentBox className="analytics">
//         <h2>
//           Marksheet for {studentData ? studentData.studentName : ""}{" "}
//           {studentData ? studentData.classname : ""}
//         </h2>

//         <Box width="100%" overflow="auto">
//           <Link to={`/dashboard/first_term_report_card/${id}`}>
//             <Button
//               color="primary"
//               variant="contained"
//               style={{ width: "100%", marginTop: "20px" }}
//             >
//               First Term Report Card
//             </Button>
//           </Link>
//           <Link to={`/dashboard/term_report_card/${id}`}>
//             <Button
//               color="primary"
//               variant="contained"
//               style={{ width: "100%", marginTop: "20px" }}
//             >
//               Second Term Report Card
//             </Button>
//           </Link>
//           <Link to={`/dashboard/third_term_report_card/${id}`}>
//             <Button
//               color="primary"
//               variant="contained"
//               style={{ width: "100%", marginTop: "20px" }}
//             >
//               Third Term Report Card
//             </Button>
//           </Link>
//           <Button
//             color="primary"
//             variant="contained"
//             style={{ width: "100%", marginTop: "20px" }}
//           >
//             Cumulative Result
//           </Button>
//         </Box>
//       </ContentBox>
//     </Fragment>
//   );
// };

// export default MarkSheet;
import { Fragment, useEffect, useState } from "react";
import { Box } from "@mui/system";
import { Button, styled } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import useFetch from "../../../../hooks/useFetch";

const ContentBox = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
}));

const MarkSheet = () => {
  const [studentData, setStudentData] = useState(null);
  const { id } = useParams();
  console.log("Student ID:", id);

  const { data, loading, error } = useFetch(`/students/${id}`);

  useEffect(() => {
    // Check if the fetched data is available and set the student data
    if (data) {
      console.log("Fetched student data:", data); // Log the actual student data
      setStudentData(data); // Set the fetched data directly
    }
  }, [data]);

  // Handle loading and error states
  if (loading) return <div>Loading...</div>;
  if (error) {
    console.error("Error fetching student data:", error);
    return <div>Error fetching student data. Please try again.</div>;
  }

  // Access studentName and classname correctly from studentData
  // const studentName = studentData
  //   ? studentData.student.studentName
  //   : "Loading...";
  // const studentClass = studentData ? studentData.student.classname : "";

  // Safely access studentName and classname using optional chaining
  const studentName = studentData?.student?.studentName ?? "Loading...";
  const studentClass = studentData?.student?.classname ?? "";

  return (
    <Fragment>
      <ContentBox className="analytics">
        <h2>
          Marksheet for {studentName} {studentClass}
        </h2>

        <Box width="100%" overflow="auto">
          <Link to={`/dashboard/first_term_report_card/${id}`}>
            <Button
              color="primary"
              variant="contained"
              style={{ width: "100%", marginTop: "20px" }}
            >
              First Term Report Card
            </Button>
          </Link>
          <Link to={`/dashboard/term_report_card/${id}`}>
            <Button
              color="primary"
              variant="contained"
              style={{ width: "100%", marginTop: "20px" }}
            >
              Second Term Report Card
            </Button>
          </Link>
          <Link to={`/dashboard/third_term_report_card/${id}`}>
            <Button
              color="primary"
              variant="contained"
              style={{ width: "100%", marginTop: "20px" }}
            >
              Third Term Report Card
            </Button>
          </Link>
          <Button
            color="primary"
            variant="contained"
            style={{ width: "100%", marginTop: "20px" }}
          >
            Cumulative Result
          </Button>
        </Box>
      </ContentBox>
    </Fragment>
  );
};

export default MarkSheet;

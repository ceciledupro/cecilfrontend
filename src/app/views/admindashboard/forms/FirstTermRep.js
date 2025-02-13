import React, {
  useContext,
  Fragment,
  useEffect,
  useState,
  useRef,
} from "react";
import {
  Box,
  Button,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import useFetch from "../../../../hooks/useFetch";
import axios from "axios";
import useAuth from "../../../../app/hooks/useAuth";
import "./report.css";

import { SessionContext } from "../../../components/MatxLayout/Layout1/SessionContext";

const ContentBox = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
}));

const FirstTermRep = ({ studentId }) => {
  const componentRef = useRef();
  const gradeDefinitions = [
    { markfrom: 70, markupto: 100, comment: "Excellent", grade: "A" },
    { markfrom: 60, markupto: 69, comment: "Very Good", grade: "B" },
    { markfrom: 50, markupto: 59, comment: "Good", grade: "C" },
    { markfrom: 45, markupto: 49, comment: "Fairly Good", grade: "D" },
    { markfrom: 40, markupto: 44, comment: "Poor", grade: "E" },
    { markfrom: 0, markupto: 39, comment: "Poor", grade: "F" },
  ];

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [studentData, setStudentData] = useState(null);
  const [psyData, setPsyData] = useState(null);
  const { currentSession } = useContext(SessionContext);

  // const { id } = useParams();
  const id = studentId;

  const { data } = useFetch(`/get-students/${id}/${currentSession._id}`);

  useEffect(() => {}, [data]);
  console.log("Student ID:", id);
  console.log("Current Session ID:", currentSession._id);
  console.log("this is the student data", data);

  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [schoolSettings, setSchoolSettings] = useState({
    principalName: "",
    resumptionDate: "",
    signature: "",
  });
  const [accountSettings, setAccountSettings] = useState({
    name: "",
    motto: "",
    address: "",
    phone: "",
    phonetwo: "",
    email: "",
    sessionStart: "",
    sessionEnd: "",
    schoolLogo: "",
  });

  const apiUrl = process.env.REACT_APP_API_URL;

  // Debug: Log the studentId and currentSession
  useEffect(() => {}, [studentId, currentSession]);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        // Fetch student data
        const fetchedStudentData = await fetchStudentData(studentId);

        // Debug: Log the fetched student data

        // Set the student data in state
        setStudentData(fetchedStudentData);

        setLoading(false);
      } catch (error) {
        // Handle errors
        console.error("Error in fetchData:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [studentId, currentSession]);

  const fetchStudentData = async (studentId) => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        throw new Error("JWT token not found");
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(
        `${apiUrl}/api/get-scores-by-student/${studentId}/${currentSession._id}`,
        { headers }
      );

      // Debug: Log the entire API response

      const filteredScores = response.data.scores.filter(
        (score) =>
          (score.marksObtained !== undefined || score.marksObtained === 0) &&
          score.examId.name.toUpperCase() === "FIRST TERM"
      );

      if (filteredScores.length === 0) {
        throw new Error("No first term scores found for the student");
      }

      const scoresWithPositions = await Promise.all(
        filteredScores.map(async (score) => {
          const { examId, subjectId } = score;

          if (!examId || !subjectId) {
            return { ...score, position: 0 };
          }

          const allStudentsData = await fetchAllStudentsData(
            examId._id,
            subjectId._id
          );

          const sortedStudents = allStudentsData.sort(
            (a, b) => b.marksObtained - a.marksObtained
          );

          const studentPosition =
            sortedStudents.findIndex(
              (student) => student.studentId?._id === studentId
            ) + 1;

          // Debug: Log the position for each subject

          return {
            ...score,
            position: studentPosition,
          };
        })
      );

      // Make sure scoresWithPositions is an array with at least one element
      if (scoresWithPositions && scoresWithPositions.length > 0) {
        return scoresWithPositions;
      } else {
        throw new Error("No scores available");
      }
    } catch (error) {
      console.error("Error fetching student data:", error);
      // throw new Error("Failed to fetch student data");
    }
  };

  const fetchAllStudentsData = async (examId, subjectId) => {
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        throw new Error("JWT token not found");
      }

      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(
        `${apiUrl}/api/get-all-scores/${examId}/${subjectId}`,
        { headers }
      );

      // Debug: Log all students data

      const data = response.data;
      if (data && data.scores) {
        const studentsWithMarks = data.scores.filter(
          (student) =>
            student.marksObtained !== undefined && student.marksObtained !== 0
        );

        return studentsWithMarks;
      } else {
        return [];
      }
    } catch (error) {
      console.error("Error fetching all students data:", error);
      throw new Error("Failed to fetch all students data");
    }
  };

  const fetchPsyData = async (studentId) => {
    try {
      const token = localStorage.getItem("jwtToken");
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      const response = await axios.get(
        `${apiUrl}/api/get-psy-by-student/${studentId}/${currentSession._id}`,
        { headers }
      );

      return { ...response.data };
    } catch (error) {
      console.error("Error fetching psychomotor data:", error);
      throw new Error("Failed to fetch psychomotor data");
    }
  };

  // Fetch school settings
  // useEffect(() => {
  //   const fetchSchoolSettings = async () => {
  //     try {
  //       const response = await axios.get(`${apiUrl}/api/setting`);
  //       const { data } = response.data;

  //       // Debug: Log school settings
  //       console.log("School Settings:", data);

  //       // Set the retrieved school settings to the state
  //       setSchoolSettings(data);
  //     } catch (error) {
  //       console.error("Error fetching school settings:", error);
  //     }
  //   };

  //   fetchSchoolSettings();
  // }, [apiUrl]);

  // useEffect(() => {
  //   const fetchSchoolSettings = async () => {
  //     try {
  //       const response = await axios.get(`${apiUrl}/api/setting`, {
  //         params: {
  //           sessionId: currentSession._id,
  //           term: "FIRST TERM", // Or dynamically determine term
  //         },
  //       });

  //       const { data } = response.data;

  //       setSchoolSettings(data);
  //     } catch (error) {
  //       console.error("Error fetching school settings:", error);
  //     }
  //   };

  //   fetchSchoolSettings();
  // }, [apiUrl, currentSession]);
  useEffect(() => {
    const fetchSchoolSettings = async () => {
      try {
        // Log the API URL and parameters being used
        console.log("Fetching School Settings...");
        console.log("API URL:", `${apiUrl}/api/setting`);
        console.log("Parameters:", {
          sessionId: currentSession._id,
          term: "FIRST TERM",
        });

        const response = await axios.get(`${apiUrl}/api/setting`, {
          params: {
            sessionId: currentSession._id,
            term: "FIRST TERM", // Or dynamically determine term
          },
        });

        // Log the full API response
        console.log("Full API Response:", response);

        // Extract data from the API response
        const { data } = response.data;

        // Log the extracted data
        console.log("Extracted Data (School Settings):", data);

        // Update state with the fetched data
        setSchoolSettings(data);
      } catch (error) {
        // Log the error if the API request fails
        console.error("Error fetching school settings:", error);
      }
    };

    fetchSchoolSettings();
  }, [apiUrl, currentSession]);
  // Fetch account settings
  useEffect(() => {
    const fetchAccountSettings = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/account-setting`);
        const { data } = response.data;

        // Debug: Log account settings

        // Set the retrieved account settings to the state
        setAccountSettings(data);
      } catch (error) {
        console.error("Error fetching account settings:", error);
      }
    };

    fetchAccountSettings();
  }, [apiUrl]);

  // Fetch psychomotor data
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        const fetchedPsyData = await fetchPsyData(studentId);

        // Debug: Log the fetched psychomotor data

        setPsyData(fetchedPsyData);

        setLoading(false);
      } catch (error) {
        console.error("Error in fetchData for psychomotor data:", error);
        setError("Failed to fetch psychomotor data");
        setLoading(false);
      }
    };

    fetchData();
  }, [studentId, currentSession]);

  // Log the main data fetched via useFetch
  useEffect(() => {}, [data]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  let totalMarksObtained = 0;
  if (studentData && Array.isArray(studentData)) {
    totalMarksObtained = studentData.reduce(
      (total, score) => total + (score.marksObtained || 0),
      0
    );
  }

  // Debug: Log totalMarksObtained

  const totalMarks = studentData ? studentData.length * 100 : 0;
  const averageMarks = totalMarks
    ? ((totalMarksObtained / totalMarks) * 100).toFixed(1)
    : 0;

  const calculateGrade = (comment) => {
    const matchingGrade = gradeDefinitions.find((grade) =>
      comment?.toLowerCase().includes(grade.comment.toLowerCase())
    );
    return matchingGrade ? matchingGrade.grade : "-";
  };

  const calculateAverageGrade = () => {
    const gradeToValueMap = {
      A: 5,
      B: 4,
      C: 3,
      D: 2,
      E: 1,
    };

    let totalGradeValues = 0;
    let totalSubjects = 0;

    const subjectsWithGrades = studentData?.filter(
      (score) => score?.marksObtained !== undefined
    );

    if (!subjectsWithGrades || subjectsWithGrades.length === 0) {
      return "N/A";
    }

    subjectsWithGrades.forEach((score) => {
      const gradeValue = gradeToValueMap[calculateGrade(score?.comment)];

      if (!isNaN(gradeValue) && gradeValue !== undefined) {
        totalGradeValues += gradeValue;
        totalSubjects += 1;
      }
    });

    if (totalGradeValues === 0 || totalSubjects === 0) {
      return "N/A";
    }

    return (totalGradeValues / totalSubjects).toFixed(2);
  };

  return (
    <Fragment>
      <ContentBox className="analytics">
        <Box width="100%" overflow="auto">
          <button onClick={handlePrint}>Print this out!</button>
          <div className="container" ref={componentRef}>
            <div
              className="header"
              style={{
                textAlign: "center",
                padding: "20px",
                backgroundColor: "#f0f0f0",
              }}
            >
              <div className="logo">
                <img
                  src={`https://edupros.s3.amazonaws.com/${accountSettings.schoolLogo}`}
                  style={{
                    width: "200px",
                    height: "180px",
                  }}
                  alt="School Logo"
                />
              </div>
              <div className="bd_title">
                <h1
                  style={{
                    fontSize: "25px",
                    fontWeight: "800",
                    textTransform: "uppercase",
                    margin: "10px 0",
                  }}
                >
                  {accountSettings.name || ""}
                </h1>
                <h4 style={{ fontSize: "18px", margin: "5px 0" }}>
                  {accountSettings.address || ""}
                </h4>
                <p style={{ color: "#042954", margin: "5px 0" }}>
                  Tel: {accountSettings.phone || ""},{" "}
                  {accountSettings.phonetwo || ""}, Email:{" "}
                  {accountSettings.email || ""}
                </p>
                <h3 style={{ color: "#042954", margin: "10px 0" }}>
                  {data?.classname || ""} First Term Report Card
                </h3>
              </div>
            </div>

            {/*} <div
              className="bd_detailssec"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <div style={{ flex: "0 0 auto" }}>
                <div className="bd_photo">
                  <img
                    className="profile-photo"
                    alt="profile-photo"
                    src="https://hlhs.portalreport.org/uploads/user.jpg"
                    style={{ width: "100px", height: "100px" }}
                  />
                </div>
              </div>
              <div
                style={{ flex: "1", padding: "0 20px", textAlign: "center" }}
              >
                <div style={{ marginBottom: "20px" }}>
                  <span>Student Name:</span>
                  {""}
                  <span
                    style={{
                      border: 0,
                      outline: 0,
                      background: "transparent",
                      borderBottom: "1px solid black",
                      width: "50%",
                      marginLeft: "30px",
                      textAlign: "center",
                    }}
                  >
                    {Array.isArray(data) && data.length > 0
                      ? data[0]?.studentName || "Name not available"
                      : "Data format unexpected"}
                  </span>
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <span>Session:</span>{" "}
                  <p
                    style={{
                      border: 0,
                      outline: 0,
                      background: "transparent",
                      borderBottom: "1px solid black",
                      width: "50%",
                      marginLeft: "30px",
                      textAlign: "center",
                    }}
                  >
                    {accountSettings.sessionStart}-{accountSettings.sessionEnd}
                  </p>
                </div>
                <div style={{ marginBottom: "20px" }}>
                  <span>Class Teacher:</span>{" "}
                  <span
                    style={{
                      border: 0,
                      outline: 0,
                      background: "transparent",
                      borderBottom: "1px solid black",
                      width: "50%",
                      marginLeft: "30px",
                      textAlign: "center",
                    }}
                  >
                    Mrs Adebisi Emmanuel
                  </span>
                </div>
              </div>
              <div
                style={{ flex: "1", padding: "0 20px", textAlign: "center" }}
              >
                <p style={{ color: "#042954" }}>
                  <span>Student Id No:</span>{" "}
                  <input
                    type="text"
                    style={{
                      border: 0,
                      outline: 0,
                      background: "transparent",
                      borderBottom: "1px solid black",
                      width: "50%",
                      marginLeft: "30px",
                      textAlign: "center",
                    }}
                    value={
                      data && data.length > 0
                        ? data[0]?.AdmNo || "ID not available"
                        : "Data format unexpected"
                    }
                    readOnly
                  />
                </p>
                <p style={{ color: "#042954" }}>
                  <span>Total Marks:</span>{" "}
                  <input
                    type="text"
                    style={{
                      border: 0,
                      outline: 0,
                      background: "transparent",
                      borderBottom: "1px solid black",
                      width: "50%",
                      marginLeft: "30px",
                      textAlign: "center",
                    }}
                    value={totalMarks || "0"}
                    readOnly
                  />
                </p>
              </div>
              <div
                style={{ flex: "1", padding: "0 20px", textAlign: "center" }}
              >
                <p style={{ color: "#042954" }}>
                  <span>Marks Obtained:</span>{" "}
                  <input
                    type="text"
                    style={{
                      border: 0,
                      outline: 0,
                      background: "transparent",
                      borderBottom: "1px solid black",
                      width: "50%",
                      marginLeft: "30px",
                      textAlign: "center",
                    }}
                    value={totalMarksObtained || "0"}
                    readOnly
                  />
                </p>
                <p style={{ color: "#042954" }}>
                  <span>Average Marks:</span>{" "}
                  <input
                    type="text"
                    style={{
                      border: 0,
                      outline: 0,
                      background: "transparent",
                      borderBottom: "1px solid black",
                      width: "50%",
                      marginLeft: "30px",
                      textAlign: "center",
                    }}
                    value={averageMarks || "0"}
                    readOnly
                  />
                </p>
                <p style={{ color: "#042954" }}>
                  <span>Average Grade:</span>{" "}
                  <input
                    type="text"
                    style={{
                      border: 0,
                      outline: 0,
                      background: "transparent",
                      borderBottom: "1px solid black",
                      width: "50%",
                      marginLeft: "30px",
                      textAlign: "center",
                    }}
                    value={calculateAverageGrade() || "N/A"}
                    readOnly
                  />
                </p>
              </div>
            </div>*/}
            <div className="bd_detailssec" style={{ padding: "20px" }}>
              <table
                style={{
                  width: "100%",
                  borderCollapse: "collapse",
                  textAlign: "left",
                  border: "1px solid #000",
                }}
              >
                <tbody>
                  <tr>
                    <td
                      style={{
                        padding: "10px",
                        borderRight: "2px solid #000",
                        verticalAlign: "middle",
                        textAlign: "center",
                      }}
                    >
                      <img
                        className="profile-photo"
                        alt="profile-photo"
                        src="https://hlhs.portalreport.org/uploads/user.jpg"
                        style={{
                          width: "100px",
                          height: "100px",
                          borderRadius: "50%",
                          border: "2px solid #000",
                        }}
                      />
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        borderRight: "2px solid #000",
                        verticalAlign: "top",
                      }}
                    >
                      <div style={{ marginBottom: "10px" }}>
                        <span style={{ fontWeight: "bold" }}>
                          Student Name:
                        </span>
                        <span
                          style={{
                            marginLeft: "10px",
                            borderBottom: "1px solid black",
                            display: "inline-block",
                            paddingBottom: "2px",
                            minWidth: "200px",
                          }}
                        >
                          {Array.isArray(data) && data.length > 0
                            ? data[0]?.studentName || "Name not available"
                            : "Data format unexpected"}
                        </span>
                      </div>
                      <div style={{ marginBottom: "10px" }}>
                        <span style={{ fontWeight: "bold" }}>Student ID:</span>
                        <span
                          style={{
                            marginLeft: "10px",
                            borderBottom: "1px solid black",
                            display: "inline-block",
                            paddingBottom: "2px",
                            minWidth: "100px",
                          }}
                        >
                          {data && data.length > 0
                            ? data[0]?.AdmNo || "ID not available"
                            : "Data format unexpected"}
                        </span>
                      </div>
                      <div style={{ marginBottom: "10px" }}>
                        <span style={{ fontWeight: "bold" }}>Session:</span>
                        <span
                          style={{
                            marginLeft: "10px",
                            borderBottom: "1px solid black",
                            display: "inline-block",
                            paddingBottom: "2px",
                            minWidth: "200px",
                          }}
                        >
                          {accountSettings.sessionStart}-
                          {accountSettings.sessionEnd}
                        </span>
                      </div>
                      <div style={{ marginBottom: "10px" }}>
                        <span style={{ fontWeight: "bold" }}>
                          Class Teacher:
                        </span>
                        <span
                          style={{
                            marginLeft: "10px",
                            borderBottom: "1px solid black",
                            display: "inline-block",
                            paddingBottom: "2px",
                            minWidth: "200px",
                          }}
                        >
                          Mrs Adebisi Emmanuel
                        </span>
                      </div>
                    </td>
                    <td
                      style={{
                        padding: "10px",
                        verticalAlign: "top",
                      }}
                    >
                      <div style={{ marginBottom: "10px" }}>
                        <span style={{ fontWeight: "bold" }}>Total Marks:</span>
                        <span
                          style={{
                            marginLeft: "10px",
                            borderBottom: "1px solid black",
                            display: "inline-block",
                            paddingBottom: "2px",
                            minWidth: "100px",
                          }}
                        >
                          {totalMarks || "0"}
                        </span>
                      </div>
                      <div style={{ marginBottom: "10px" }}>
                        <span style={{ fontWeight: "bold" }}>
                          Marks Obtained:
                        </span>
                        <span
                          style={{
                            marginLeft: "10px",
                            borderBottom: "1px solid black",
                            display: "inline-block",
                            paddingBottom: "2px",
                            minWidth: "100px",
                          }}
                        >
                          {totalMarksObtained || "0"}
                        </span>
                      </div>
                      <div style={{ marginBottom: "10px" }}>
                        <span style={{ fontWeight: "bold" }}>
                          Average Marks:
                        </span>
                        <span
                          style={{
                            marginLeft: "10px",
                            borderBottom: "1px solid black",
                            display: "inline-block",
                            paddingBottom: "2px",
                            minWidth: "100px",
                          }}
                        >
                          {averageMarks || "0"}
                        </span>
                      </div>
                      <div style={{ marginBottom: "10px" }}>
                        <span style={{ fontWeight: "bold" }}>
                          Average Grade:
                        </span>
                        <span
                          style={{
                            marginLeft: "10px",
                            borderBottom: "1px solid black",
                            display: "inline-block",
                            paddingBottom: "2px",
                            minWidth: "100px",
                          }}
                        >
                          {calculateAverageGrade() || "N/A"}
                        </span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* First Table */}
            <table className="table" id="customers" style={{ width: "100%" }}>
              <thead>
                <tr>
                  <th>S/No</th>
                  <th>Subject</th>
                  <th>Test</th>
                  <th>Exam</th>
                  <th>Obtained Marks</th>
                  <th>Position</th>
                  <th>Grade</th>
                  <th>Remark</th>
                </tr>
              </thead>
              <tbody style={{ width: "100% !important" }}>
                {/* Check if there's data and map through the scores */}
                {studentData && studentData.length > 0 ? (
                  studentData.map((score, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td> {/* Serial number */}
                      <td>{score?.subjectName || "-"}</td> {/* Subject Name */}
                      <td>
                        {score?.testscore !== undefined ? score.testscore : "-"}
                      </td>{" "}
                      {/* Test Score */}
                      <td>
                        {score?.examscore !== undefined ? score.examscore : "-"}
                      </td>{" "}
                      {/* Exam Score */}
                      <td>
                        {score?.marksObtained !== undefined
                          ? score.marksObtained
                          : "-"}
                      </td>{" "}
                      {/* Obtained Marks */}
                      <td>
                        {score?.position !== undefined ? score.position : "-"}
                      </td>{" "}
                      {/* Position */}
                      <td>{calculateGrade(score?.comment) || "-"}</td>{" "}
                      {/* Grade */}
                      <td>{score?.comment || "-"}</td> {/* Comment/Remark */}
                    </tr>
                  ))
                ) : (
                  // Fallback for when no data is available
                  <tr>
                    <td colSpan="8">No data available for this term.</td>
                  </tr>
                )}
              </tbody>
            </table>

            {/* Second Table */}
            <table
              className="table second-sub-table"
              id="customersreport"
              style={{ width: "100%" }}
            >
              <thead>
                <tr>
                  <th
                    colSpan="3"
                    style={{ textAlign: "center", fontSize: "18px" }}
                  >
                    AFFECTIVE AND PSYCHOMOTOR REPORT
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th></th>
                  <th>Work Habits</th>
                  <th>RATINGS</th>
                </tr>
                {psyData?.scores?.length > 0 ? (
                  psyData.scores.map((score, index) => (
                    <React.Fragment key={index}>
                      <tr>
                        <td>{index + 1}</td>
                        <td>Following Instruction</td>
                        <td>{score?.instruction || "0"}</td>
                      </tr>
                      <tr>
                        <td>{index + 2}</td>
                        <td>Working Independently</td>
                        <td>{score?.independently || "0"}</td>
                      </tr>
                      <tr>
                        <th></th>
                        <th>Behaviour</th>
                        <th>RATINGS</th>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>Punctuality</td>
                        <td>{score?.punctuality || "0"}</td>
                      </tr>
                      <tr>
                        <th></th>
                        <th>Communication</th>
                        <th>RATINGS</th>
                      </tr>
                      <tr>
                        <td>1</td>
                        <td>Talking</td>
                        <td>{score?.talking || "0"}</td>
                      </tr>
                      <tr>
                        <td>2</td>
                        <td>Eye Contact</td>
                        <td>{score?.eyecontact || "0"}</td>
                      </tr>
                    </React.Fragment>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3">No psychomotor data available</td>
                  </tr>
                )}
              </tbody>
            </table>

            <div style={{ color: "#042954", fontSize: "16px" }}>
              KEY TO GRADES A (DISTINCTION)=70% &amp; ABOVE , C (CREDIT)=55-69%
              , P(PASS)=40-54% , F(FAIL)=BELOW 40%
            </div>
            <div className="remarksbox" style={{ padding: "10px 0" }}>
              <table className="table">
                <tbody>
                  <tr>
                    <th>CLASS TEACHER'S REMARK</th>
                    {psyData?.scores?.map((score, index) => (
                      <td key={index} colSpan="2">
                        {score.remarks || "No remarks"}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <th>PRINCIPAL'S REMARK</th>
                    {psyData?.scores?.map((score, index) => (
                      <td key={index} colSpan="2">
                        {score.premarks || "No principal remarks"}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <th>PRINCIPAL'S NAME</th>
                    <td>{schoolSettings?.principalName || "N/A"}</td>
                    <td style={{ textAlign: "right" }}>
                      <img
                        src={schoolSettings?.signature} // Use full URL directly
                        width="200"
                        alt="Principal Signature"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>SCHOOL RESUMES</th>
                    <td>
                      {schoolSettings.resumptionDate
                        ? new Date(
                            schoolSettings.resumptionDate
                          ).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div
              className="bd_key"
              style={{ color: "#042954", fontSize: "16px" }}
            >
              KEY TO RATINGS : 5 = Excellent , 4 = Good , 3 = Fair , 2 = Poor ,
              1 = Very Poor
            </div>

            <div className="bdftrtop">
              <div className="float-left text-right bdftrtopl">
                <span style={{ color: "#042954" }}>Seal of the Register</span>
              </div>
              <div className="float-right text-left bdftrtopr">
                <span style={{ color: "#042954" }}>Date</span>
              </div>
              <div className="clearfix"></div>
            </div>
          </div>
        </Box>
      </ContentBox>
    </Fragment>
  );
};

export default FirstTermRep;

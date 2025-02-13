import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Stack } from "@mui/material";
import { Box } from "@mui/system";
import { Breadcrumb, SimpleCard } from "../../../../app/components";
import axios from "axios";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Icon,
  Radio,
  MenuItem,
  DialogTitle,
  RadioGroup,
  styled,
} from "@mui/material";
import useFetch from "../../../../hooks/useFetch";

import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./form.css";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { ToastContainer, toast } from "react-toastify";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import "react-toastify/dist/ReactToastify.css";


import { SessionContext } from "../../../components/MatxLayout/Layout1/SessionContext";


const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

const Tab = () => {
  const { currentSession } = useContext(SessionContext);

  const {
    data:classData,
    loading: classLoading,
    error: classError,
  } = useFetch(
      currentSession ? `/class/${currentSession._id}` : null      
    );
    console.log(classData)
    const { data: examData } = useFetch(
      currentSession ? `/getofflineexam/${currentSession._id}` : null
    );
    console.log(examData)
  const [subjectData, setSubjectData] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedExam, setSelectedExam] = useState("");


  const [studentData, setStudentData] = useState([]);
  console.log("Current studentData state:", studentData);
  const [selectedStudentId, setSelectedStudentId] = useState("");

  const [subjectIdLookup, setSubjectIdLookup] = useState({});
  const [showMarkManagement, setShowMarkManagement] = useState(false);

  const subjects = ["English", "Math", "Crs", "Basic Tech", "Business Studies"];
  const [students, setStudents] = useState(studentData);


  const apiUrl = process.env.REACT_APP_API_URL.trim();

  const fetchStudentData = async (examId, subjectId) => {
    try {
      const token = localStorage.getItem("jwtToken");
      const headers = new Headers();
      headers.append("Authorization", `Bearer ${token}`);

      const response = await fetch(
        `${apiUrl}/api/get-all-scores/${examId}/${subjectId}`,
        {
          headers,
        }
      );

      if (!response.ok) {
        console.error(
          "Failed to fetch student data. Response details:",
          response
        );
        throw new Error("Failed to fetch student data");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching student data:", error);
      return { scores: [] }; // Return empty array if there's an error
    }
  };

  const handleManageMarkClick = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const headers = new Headers();
      headers.append("Authorization", `Bearer ${token}`);

      const response = await fetch(`${apiUrl}/api/student/${selectedClass}/${currentSession._id}`, {
        headers,
      });

      if (!response.ok) {
        throw new Error("Failed to fetch student data");
      }

      const students = await response.json();

      // Handle the case where no students are found
      if (students.length === 0) {
        console.warn("No students found for the selected class.");
        // Proceed with the logic for initializing the state, etc.
        // You might want to show a message to the user or take appropriate action.
      } else {
        // Assuming you want to pick the first student for now
        const firstStudentId = students[0]._id;
        setSelectedStudentId(firstStudentId);

        const existingData = await fetchStudentData(
          selectedExam,
          subjectIdLookup[selectedSubject]
        );

        console.log("Response from fetchStudentData:", existingData);
        console.log("Existing scores:", existingData.scores);

        // Ensure that the scores are properly set in the initial state
        const initialState = students.map((student) => {
          const studentScore = existingData.scores.find(
            (score) => score.studentId && score.studentId._id === student._id
          );

          console.log(`Student ${student._id} - Existing Score:`, studentScore);

          const defaultTestScore = studentScore
            ? studentScore.testscore !== undefined
              ? studentScore.testscore
              : 0
            : 0;

          const defaultExamScore = studentScore
            ? studentScore.examscore !== undefined
              ? studentScore.examscore
              : 0
            : 0;

          return {
            studentId: student._id,
            studentName: student.studentName,
            testscore: defaultTestScore,
            examscore: defaultExamScore,
            marksObtained: defaultTestScore + defaultExamScore,
            comment: studentScore ? studentScore.comment || "" : "",
          };
        });

        console.log("Initial state:", initialState);

        setStudentData(initialState);
        setShowMarkManagement(true);
      }
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  useEffect(() => {
    const fetchSubjectData = async () => {
      try {
        if (!selectedClass) {
          setSubjectData([]);
          setSubjectIdLookup({});
          return;
        }

        const token = localStorage.getItem("jwtToken");
        const headers = new Headers();
        headers.append("Authorization", `Bearer ${token}`);

        const response = await fetch(
          `${apiUrl}/api/get-subject/${selectedClass}`,
          {
            headers,
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch subjects");
        }

        const data = await response.json();

        setSubjectData(data);

        // Create a subjectId lookup
        const lookup = {};
        data.forEach((subject) => {
          lookup[subject.name] = subject._id;
        });
        setSubjectIdLookup(lookup);
      } catch (error) {
        console.error("Error fetching subjects:", error);
      }
    };

    // Call the fetchSubjectData function
    fetchSubjectData();
  }, [selectedClass, apiUrl]); // Include all dependencies used inside the useEffect

  const handleClassChange = (event) => {
    const newSelectedClass = event.target.value;
    setSelectedClass(newSelectedClass);
    setSelectedSubject("");
  };

  const handleExamChange = (event) => {
    const selectedExamId = event.target.value;
    setSelectedExam(selectedExamId);
  };
  const getExamNameById = (examId) => {
    const selectedExam = examData.find((item) => item._id === examId);
    return selectedExam ? selectedExam.name : "";
  };

  const getClassById = (classId) => {
    const selectedClass = classData.find((item) => item.id === classId);
    return selectedClass ? selectedClass.name : "";
  };

  const getSubjectById = (subjectId) => {
    const selectedSubject = subjectData.find((item) => item._id === subjectId);
    return selectedSubject ? selectedSubject.name : "";
  };

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
  };

  const handleSaveChanges = async () => {
    try {
      const marks = studentData.map((student) => {
        const {
          studentId,
          testscore = 0,
          examscore = 0,
          comment = "",
        } = student;
        const marksObtained = testscore + examscore;

        return {
          studentId,
          subjectId: subjectIdLookup[selectedSubject],
          testscore,
          examscore,
          marksObtained,
          comment,
        };
      });

      console.log("Updated Marks:", marks);

      const token = localStorage.getItem("jwtToken");
      const headers = new Headers();
      headers.append("Authorization", `Bearer ${token}`);

      // Check if there are existing marks by verifying the examId and subjectId
      if (selectedExam && subjectIdLookup[selectedSubject]) {
        const responseCheckMarks = await fetch(
          `${apiUrl}/api/get-all-scores/${selectedExam}/${subjectIdLookup[selectedSubject]}`,
          {
            headers,
          }
        );

        console.log("Response from Check Marks:", responseCheckMarks);

        if (responseCheckMarks.ok) {
          const responseData = await responseCheckMarks.json();
          const existingMarks = responseData.scores || [];

          // Check if there are existing marks
          if (existingMarks.length > 0) {
            // Existing marks found, proceed with updating
            const responseUpdateMarks = await fetch(
              `${apiUrl}/api/update-all-marks`,
              {
                method: "PUT",
                headers: {
                  ...headers,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  examId: selectedExam,
                  subjectId: subjectIdLookup[selectedSubject],
                  updates: marks,
                }),
              }
            );

            console.log("Request Payload:", {
              examId: selectedExam,
              subjectId: subjectIdLookup[selectedSubject],
              updates: marks,
            });

            console.log("Response from Update Marks:", responseUpdateMarks);

            if (!responseUpdateMarks.ok) {
              const errorMessage = await responseUpdateMarks.text();
              console.error(
                `Failed to update marks. Server response: ${errorMessage}`
              );
              throw new Error("Failed to update marks");
            } else {
              // Notify success using toast
              toast.success("Marks updated successfully!");
            }
          } else {
            // No existing marks found, proceed to create new marks
            const responseSaveMarks = await fetch(`${apiUrl}/api/save-marks`, {
              method: "POST",
              headers: {
                ...headers,
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                examId: selectedExam,
                subjectId: subjectIdLookup[selectedSubject],
                updates: marks,
              }),
            });

            console.log("Response from Save Marks:", responseSaveMarks);

            if (!responseSaveMarks.ok) {
              const errorMessage = await responseSaveMarks.text();

              console.error(
                `Failed to save marks. Server response: ${errorMessage}`
              );
              throw new Error("Failed to save marks");
            } else {
              // Notify success using toast
              toast.success("Marks saved successfully!");
            }
          }
        } else {
          // Handle other response statuses
          // ...
        }
      }
      // ... (remaining code)
    } catch (error) {
      console.error("Error saving marks:", error);
      // ... (error handling)
    }
  };

  const handleScoreChange = (studentIndex, scoreType, value) => {
    // Create a copy of the studentData array
    const updatedStudents = studentData.map((student, index) => {
      if (index === studentIndex) {
        // Update the relevant score type or comment
        if (scoreType === "testscore") {
          return {
            ...student,
            testscore: parseInt(value, 10) || 0, // Update test score
            marksObtained: (parseInt(value, 10) || 0) + (student.examscore || 0) // Calculate marksObtained
          };
        } else if (scoreType === "examscore") {
          return {
            ...student,
            examscore: parseInt(value, 10) || 0, // Update exam score
            marksObtained: (student.testscore || 0) + (parseInt(value, 10) || 0) // Calculate marksObtained
          };
        } else if (scoreType === "comment") {
          return {
            ...student,
            comment: value // Update comment field
          };
        }
      }
      return student;
    });
  
    // Update state with modified student data
    setStudentData(updatedStudents);
  };
  

  return (
    <div>
      <Container>
        <ValidatorForm onError={() => null}>
          <Box className="breadcrumb">
            <Breadcrumb routeSegments={[{ name: "Manage Exam Mark" }]} />
          </Box>
          <Grid container spacing={6}>
            <Grid item xs={4}>
              <TextField
                select
                label="Select an Exam"
                variant="outlined"
                value={selectedExam}
                onChange={handleExamChange}
              >
                {examData &&
                  examData.map((item) => (
                    <MenuItem key={item._id} value={item._id}>
                      {item.name}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField
                select
                label="Select a class"
                variant="outlined"
                value={selectedClass}
                onChange={handleClassChange}
              >
                {classData &&
                  classData.map((item) => (
                    <MenuItem key={item.id} value={item.name}>
                      {item.name}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>

            <Grid item xs={4}>
              <Button
                color="primary"
                variant="contained"
                type="submit"
                onClick={handleManageMarkClick}
              >
                View Tabulation Sheet
              </Button>
            </Grid>
          </Grid>

          {showMarkManagement && (
  <>
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Student Name</TableCell>
            <TableCell>Test Score</TableCell>
            <TableCell>Exam Score</TableCell>
            <TableCell>Total Marks</TableCell>
            <TableCell>Comment</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {studentData.map((student, index) => (
            <TableRow key={student.studentId || index}>
              <TableCell>{student.studentName}</TableCell>
              <TableCell>
                <input
                  type="number"
                  value={student.testscore}
                  onChange={(e) => handleScoreChange(index, "testscore", Number(e.target.value))}
                />
              </TableCell>
              <TableCell>
                <input
                  type="number"
                  value={student.examscore}
                  onChange={(e) => handleScoreChange(index, "examscore", Number(e.target.value))}
                />
              </TableCell>
              <TableCell>{student.marksObtained}</TableCell>
              <TableCell>
                <input
                  type="text"
                  value={student.comment}
                  onChange={(e) => handleScoreChange(index, "comment", e.target.value)}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Button
      color="primary"
      variant="contained"
      type="button"
      onClick={handleSaveChanges}
    >
      Save Changes
    </Button>
  </>
)}

        </ValidatorForm>
        <ToastContainer />
      </Container>
    </div>
  );
};

export default Tab;

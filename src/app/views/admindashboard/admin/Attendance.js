import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { Stack } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
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
import { Span } from "../../../../app/components/Typography";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { SessionContext } from "../../../components/MatxLayout/Layout1/SessionContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const Attendance = () => {
  const { currentSession } = useContext(SessionContext);

  const {
    data: classData,
    loading: classLoading,
    error: classError,
  } = useFetch(currentSession ? `/class/${currentSession._id}` : null);
  console.log(classData);
  const { data: examData } = useFetch(
    currentSession ? `/getofflineexam/${currentSession._id}` : null
  );
  console.log(examData);
  const [selectedExam, setSelectedExam] = React.useState("");
  const [selectedClass, setSelectedClass] = React.useState("");
  const [selectedDate, setSelectedDate] = React.useState("");
  const [showAttendance, setShowAttendance] = React.useState(false);
  const [studentData, setStudentData] = React.useState([]);

  console.log("Current studentData state:", studentData);

  const apiUrl = process.env.REACT_APP_API_URL;

  const fetchStudentData = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const response = await fetch(
        `${apiUrl}/api/students/${currentSession._id}/${selectedClass}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch student data");
      }

      const data = await response.json();
      setStudentData(data);
    } catch (error) {
      console.error("Error fetching student data:", error);
    }
  };

  const handleClassChange = (event) => {
    const newSelectedClass = event.target.value;
    setSelectedClass(newSelectedClass);
  };

  const handleExamChange = (event) => {
    const selectedExamId = event.target.value;
    setSelectedExam(selectedExamId);
  };
  const getExamNameById = (examId) => {
    const selectedExam = examData.find((item) => item._id === examId);
    return selectedExam ? selectedExam.name : "";
  };

  const handleAttendanceChange = (index, status) => {
    const updatedStudents = [...studentData];
    updatedStudents[index].status = status;
    setStudentData(updatedStudents);
  };

  // Simulates fetching data and showing the table
  const handleManageAttendanceClick = () => {
    fetchStudentData();

    setShowAttendance(true);
  };

  // Save attendance data (API call)
  const handleSaveAttendance = () => {
    console.log("Saving attendance data:", studentData);
    // API call to save attendance data
  };

  return (
    <div>
      <Container>
        <ValidatorForm onError={() => null}>
          <Box className="breadcrumb">
            <Breadcrumb routeSegments={[{ name: "Manage Daily Attendance" }]} />
          </Box>
          <Grid container spacing={6}>
            <Grid item xs={3}>
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
            <Grid item xs={3}>
              <TextField
                select
                label="Select a Class"
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
            {/*} <Grid item xs={3}>
          <TextField
            type="date"
            label="Date"
            variant="outlined"
          ></TextField>
        </Grid>*/}
            <Grid item xs={3}>
              <TextField
                type="date"
                label="Date"
                variant="outlined"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </Grid>
            <Grid item xs={3}>
              <Button
                color="primary"
                variant="contained"
                type="button"
                onClick={handleManageAttendanceClick}
              >
                Manage Attendance
              </Button>
            </Grid>
          </Grid>

          {showAttendance && (
            <>
              <div className="col-sm-4">
                <div className="tile-stats tile-gray">
                  <h3>Attendance for {selectedClass}</h3>
                  <h4>Term: {getExamNameById(selectedExam)}</h4>
                  <h4>Date: {selectedDate}</h4>
                </div>
              </div>

              <div className="col-xl-12 wow fadeInUp" data-wow-delay="1.5s">
                <div className="table-responsive full-data">
                  <table
                    className="table-responsive-lg table display dataTablesCard student-tab dataTable no-footer"
                    id="attendance-table"
                  >
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Adm No</th>
                        <th>Name</th>
                        <th>Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentData.map((student, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{student.AdmNo}</td>
                          <td>{student?.studentName}</td>
                          <td>
                            <TextField
                              select
                              value={student.status || "Absent"}
                              onChange={(e) =>
                                handleAttendanceChange(index, e.target.value)
                              }
                            >
                              <MenuItem value="Present">Present</MenuItem>
                              <MenuItem value="Absent">Absent</MenuItem>
                            </TextField>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              <Button
                color="primary"
                variant="contained"
                type="button"
                onClick={handleSaveAttendance}
              >
                Save Attendance
              </Button>
            </>
          )}
        </ValidatorForm>
        <ToastContainer />
      </Container>
    </div>
  );
};

export default Attendance;

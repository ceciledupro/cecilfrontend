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
import { Span } from "../../../../app/components/Typography";
import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./form.css";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import { ToastContainer, toast } from "react-toastify";
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

const ManagePsy = () => {
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
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedExam, setSelectedExam] = useState("");

  const [studentData, setStudentData] = useState([]);
  console.log("Current studentData state:", studentData);
  const [selectedStudentId, setSelectedStudentId] = useState("");

  const [showMarkManagement, setShowMarkManagement] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;

  const fetchStudentData = async (examId) => {
    try {
      const token = localStorage.getItem("jwtToken");
      const headers = new Headers();
      headers.append("Authorization", `Bearer ${token}`);

      const response = await fetch(`${apiUrl}/api/get-all-psy/${examId}`, {
        headers,
      });

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

  const handleManagePsyClick = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const headers = new Headers();
      headers.append("Authorization", `Bearer ${token}`);

      const response = await fetch(
        `${apiUrl}/api/student/${selectedClass}/${currentSession._id}`,
        {
          headers,
        }
      );

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

        const existingData = await fetchStudentData(selectedExam);

        console.log("Response from fetchStudentData:", existingData);
        console.log("Existing scores:", existingData.scores);

        // Ensure that the scores are properly set in the initial state
        const initialState = students.map((student) => {
          const studentScore = existingData.scores.find(
            (score) => score.studentId && score.studentId._id === student._id
          );

          console.log(`Student ${student._id} - Existing Score:`, studentScore);

          // const defaultTestScore = studentScore
          //   ? studentScore.instruction !== undefined
          //     ? studentScore.instruction
          //     : 0
          //   : 0;

          // const defaultExamScore = studentScore
          //   ? studentScore.independently !== undefined
          //     ? studentScore.independently
          //     : 0
          //   : 0;

          return {
            studentId: student._id,
            studentName: student.studentName,
            AdmNo: student.AdmNo,
            instruction: studentScore ? studentScore.instruction || 0 : 0,
            independently: studentScore ? studentScore.independently || 0 : 0,
            punctuality: studentScore ? studentScore.punctuality || 0 : 0,
            talking: studentScore ? studentScore.talking || 0 : 0,
            eyecontact: studentScore ? studentScore.eyecontact || 0 : 0,
            remarks: studentScore ? studentScore.remarks || "" : "",
            premarks: studentScore ? studentScore.premarks || "" : "",
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

  // const handleSaveChanges = async () => {
  //   try {
  //     const marks = studentData.map((student) => {
  //       const {
  //         studentId,
  //         instruction = 5,
  //         independently = 5,
  //         punctuality = 5,
  //         talking = 5,
  //         eyecontact = 5,
  //         remarks = 5,
  //         premarks = 5,
  //       } = student;

  //       return {
  //         studentId,

  //         instruction,
  //         independently,
  //         punctuality,
  //         talking,
  //         eyecontact,
  //         remarks,
  //         premarks,
  //       };
  //     });

  //     console.log("Updated Marks:", marks);

  //     const token = localStorage.getItem("jwtToken");
  //     const headers = new Headers();
  //     headers.append("Authorization", `Bearer ${token}`);

  //     // Check if there are existing marks by verifying the examId and subjectId
  //     if (selectedExam) {
  //       const responseCheckMarks = await fetch(
  //         `${apiUrl}/api/get-all-psy/${selectedExam}`,
  //         {
  //           headers,
  //         }
  //       );

  //       console.log("Response from Check Marks:", responseCheckMarks);

  //       if (responseCheckMarks.ok) {
  //         const responseData = await responseCheckMarks.json();
  //         const existingMarks = responseData.scores || [];

  //         // Check if there are existing marks
  //         if (existingMarks.length > 0) {
  //           // Existing marks found, proceed with updating
  //           const responseUpdateMarks = await fetch(
  //             `${apiUrl}/api/update-all-psy`,
  //             {
  //               method: "PUT",
  //               headers: {
  //                 ...headers,
  //                 "Content-Type": "application/json",
  //               },
  //               body: JSON.stringify({
  //                 examId: selectedExam,

  //                 updates: marks,
  //               }),
  //             }
  //           );

  //           console.log("Request Payload:", {
  //             examId: selectedExam,

  //             updates: marks,
  //           });

  //           console.log("Response from Update Marks:", responseUpdateMarks);

  //           if (!responseUpdateMarks.ok) {
  //             const errorMessage = await responseUpdateMarks.text();
  //             console.error(
  //               `Failed to update marks. Server response: ${errorMessage}`
  //             );
  //             throw new Error("Failed to update marks");
  //           } else {
  //             // Notify success using toast
  //             toast.success("Marks updated successfully!");
  //           }
  //         } else {

  //           // No existing marks found, proceed to create new marks
  //           const responseSaveMarks = await fetch(`${apiUrl}/api/save-psy`, {
  //             method: "POST",
  //             headers: {
  //               ...headers,
  //               "Content-Type": "application/json",
  //             },
  //             body: JSON.stringify({
  //               examId: selectedExam,

  //               updates: marks,
  //             }),
  //           });

  //           console.log("Response from Save Marks:", responseSaveMarks);

  //           if (!responseSaveMarks.ok) {
  //             const errorMessage = await responseSaveMarks.text();

  //             console.error(
  //               `Failed to save marks. Server response: ${errorMessage}`
  //             );
  //             throw new Error("Failed to save marks");
  //           } else {
  //             // Notify success using toast
  //             toast.success("Marks saved successfully!");
  //           }
  //         }
  //       } else {
  //         // Handle other response statuses
  //         // ...
  //       }
  //     }
  //     // ... (remaining code)
  //   } catch (error) {
  //     console.error("Error saving marks:", error);
  //     // ... (error handling)
  //   }
  // };

  // const handleSaveChanges = async () => {
  //   try {
  //     // Prepare marks data from studentData
  //     const marks = studentData.map((student) => {
  //       const {
  //         studentId = "",
  //         instruction = "",
  //         independently = "",
  //         punctuality = "",
  //         talking = "",
  //         eyecontact = "",
  //         remarks = "",
  //         premarks = "No principal remarks",
  //       } = student;

  //       // Validate premarks before returning the object
  //       if (!premarks) {
  //         toast.error("Principal remarks cannot be empty.");
  //         return null; // Skip this entry or handle accordingly
  //       }

  //       return {
  //         studentId,
  //         instruction,
  //         independently,
  //         punctuality,
  //         talking,
  //         eyecontact,
  //         remarks,
  //         premarks,
  //       };
  //     });

  //     console.log("Updated Marks:", marks);

  //     const token = localStorage.getItem("jwtToken");
  //     const headers = new Headers();
  //     headers.append("Authorization", `Bearer ${token}`);

  //     // Check if there are existing marks
  //     if (selectedExam) {
  //       const responseCheckMarks = await fetch(
  //         `${apiUrl}/api/get-all-psy/${selectedExam}`,
  //         { headers }
  //       );

  //       console.log("Response from Check Marks:", responseCheckMarks);

  //       if (responseCheckMarks.ok) {
  //         const responseData = await responseCheckMarks.json();
  //         const existingMarks = responseData.scores || [];

  //         console.log("Existing Marks:", existingMarks); // Log existing marks

  //         // If existing marks found, proceed with updating
  //         if (existingMarks.length > 0) {
  //           const responseUpdateMarks = await fetch(
  //             `${apiUrl}/api/update-all-psy`,
  //             {
  //               method: "PUT",
  //               headers: {
  //                 ...headers,
  //                 "Content-Type": "application/json",
  //               },
  //               body: JSON.stringify({
  //                 examId: selectedExam,
  //                 updates: marks,
  //               }),
  //             }
  //           );

  //           console.log("Request Payload for Update:", {
  //             examId: selectedExam,
  //             updates: marks,
  //           });

  //           console.log("Response from Update Marks:", responseUpdateMarks);

  //           if (!responseUpdateMarks.ok) {
  //             const errorMessage = await responseUpdateMarks.text();
  //             console.error(
  //               `Failed to update marks. Server response: ${errorMessage}`
  //             );
  //             throw new Error("Failed to update marks");
  //           } else {
  //             toast.success("Marks updated successfully!");
  //           }
  //         } else {
  //           // No existing marks found, proceed to create new marks
  //           if (currentSession && currentSession._id) {
  //             const responseSaveMarks = await fetch(
  //               `${apiUrl}/api/save-psy/${currentSession._id}`,
  //               {
  //                 method: "POST",
  //                 headers: {
  //                   ...headers,
  //                   "Content-Type": "application/json",
  //                 },
  //                 body: JSON.stringify({
  //                   examId: selectedExam,
  //                   updates: marks,
  //                 }),
  //               }
  //             );

  //             console.log("Response from Save Marks:", responseSaveMarks);

  //             if (!responseSaveMarks.ok) {
  //               const errorMessage = await responseSaveMarks.text();
  //               console.error(
  //                 `Failed to save marks. Server response: ${errorMessage}`
  //               );
  //               throw new Error("Failed to save marks");
  //             } else {
  //               toast.success("Marks saved successfully!");
  //             }
  //           } else {
  //             console.error("Current session is not available.");
  //             toast.error("Failed to save marks: Current session is missing.");
  //           }
  //         }
  //       } else {
  //         // Handle other response statuses, e.g., 404, 500, etc.
  //         console.error(
  //           "Failed to check marks. Status code:",
  //           responseCheckMarks.status
  //         );
  //         toast.error("Failed to check existing marks.");
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error saving marks:", error);
  //     toast.error("An error occurred while saving marks.");
  //   }
  // };
  const handleSaveChanges = async () => {
    try {
      // Validate all student data before proceeding

      // Proceed if all validations pass
      const marks = studentData.map((student) => {
        const {
          studentId,
          instruction = 5,
          independently = 5,
          punctuality = 5,
          talking = 5,
          eyecontact = 5,
          remarks = 5,
          premarks = 5,
        } = student;

        return {
          studentId,

          instruction,
          independently,
          punctuality,
          talking,
          eyecontact,
          remarks,
          premarks,
        };
      });

      // Now log the marks array once it's fully created
      console.log("Marks to be sent:", marks);

      // Proceed with sending the marks data to the backend
      const token = localStorage.getItem("jwtToken");
      const headers = new Headers();
      headers.append("Authorization", `Bearer ${token}`);

      if (selectedExam) {
        const responseCheckMarks = await fetch(
          `${apiUrl}/api/get-all-psy/${selectedExam}`,
          { headers }
        );

        if (responseCheckMarks.ok) {
          const responseData = await responseCheckMarks.json();
          const existingMarks = responseData.scores || [];

          if (existingMarks.length > 0) {
            // Update marks
            const responseUpdateMarks = await fetch(
              `${apiUrl}/api/update-all-psy`,
              {
                method: "PUT",
                headers: {
                  ...headers,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  examId: selectedExam,
                  updates: marks,
                }),
              }
            );

            if (!responseUpdateMarks.ok) {
              const errorMessage = await responseUpdateMarks.text();
              console.error(
                `Failed to update marks. Server response: ${errorMessage}`
              );
              throw new Error("Failed to update marks");
            } else {
              toast.success("Marks updated successfully!");
            }
          } else {
            // Save new marks
            const responseSaveMarks = await fetch(
              `${apiUrl}/api/save-psy/${currentSession._id}`,
              {
                method: "POST",
                headers: {
                  ...headers,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  examId: selectedExam,
                  updates: marks,
                }),
              }
            );

            if (!responseSaveMarks.ok) {
              const errorMessage = await responseSaveMarks.text();
              console.error(
                `Failed to save marks. Server response: ${errorMessage}`
              );
              throw new Error("Failed to save marks");
            } else {
              toast.success("Marks saved successfully!");
            }
          }
        } else {
          toast.error("Failed to check existing marks.");
        }
      }
    } catch (error) {
      console.error("Error saving marks:", error);
      toast.error("An error occurred while saving marks.");
    }
  };

  const handleScoreChange = (index, scoreType, value) => {
    // Assuming studentData is an array
    const updatedStudents = [...studentData];

    // Update the corresponding score
    if (scoreType === "instruction") {
      updatedStudents[index].instruction = parseInt(value, 10) || 0;
    } else if (scoreType === "independently") {
      updatedStudents[index].independently = parseInt(value, 10) || 0;
    } else if (scoreType === "punctuality") {
      updatedStudents[index].punctuality = parseInt(value, 10) || 0;
    } else if (scoreType === "talking") {
      updatedStudents[index].talking = parseInt(value, 10) || 0;
    } else if (scoreType === "eyecontact") {
      updatedStudents[index].eyecontact = parseInt(value, 10) || 0;
    } else if (scoreType === "remarks") {
      updatedStudents[index].remarks = String(value) || 0;
    } else if (scoreType === "premarks") {
      updatedStudents[index].premarks = String(value) || 0;
    }

    // Update state with the modified students
    setStudentData(updatedStudents);
  };

  return (
    <div>
      <Container>
        <ValidatorForm onError={() => null}>
          <Box className="breadcrumb">
            <Breadcrumb
              routeSegments={[
                { name: " Manage Affective & Psychomotor Report : Section" },
              ]}
            />
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
                onClick={handleManagePsyClick}
              >
                Get Student
              </Button>
            </Grid>
          </Grid>

          {showMarkManagement && (
            <>
              <div className="col-sm-4">
                <div className="tile-stats tile-gray">
                  <div className="icon">
                    <i className="entypo-chart-bar"></i>
                  </div>
                  <h3>Extracurricular Marks for {selectedClass} </h3>
                  <h4>Term: {getExamNameById(selectedExam)}</h4>
                </div>
              </div>
              <div class="col-xl-12 wow fadeInUp" data-wow-delay="1.5s">
                <div class="table-responsive full-data">
                  <table
                    style={{ overflowX: "auto", maxWidth: "100%" }}
                    class="table-responsive-lg table display dataTablesCard student-tab dataTable no-footer"
                    id="example-student"
                  >
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Adm No</th>
                        <th>Name</th>
                        <th>Following Instruction(Work Habits)</th>
                        <th>Working Independently (Work Habits)</th>
                        <th> Punctuality (Behaviour)</th>
                        <th>Talking (Communication)</th>
                        <th>Eye Contact (Communication)</th>
                        <th> Class Teacher Remarks</th>
                        <th> Principal Remarks</th>
                      </tr>
                    </thead>
                    <tbody>
                      {studentData.map((student, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{student.AdmNo}</td>

                          {/*}  <td id={`subjectId_${index}`} style={{ display: "none" }}>
                        {subjectIdLookup[student.subjectName]}
                  </td>*/}
                          <td>{student.studentName}</td>

                          <td>
                            <TextField
                              type="number"
                              name={`instruction_${index}`}
                              id={`instruction_${index}`}
                              value={student.instruction || ""}
                              onChange={(e) =>
                                handleScoreChange(
                                  index,
                                  "instruction",
                                  e.target.value
                                )
                              }
                            />
                          </td>
                          <td>
                            <TextField
                              type="number"
                              name={`independently_${index}`}
                              id={`independently_${index}`}
                              value={student.independently || ""}
                              onChange={(e) =>
                                handleScoreChange(
                                  index,
                                  "independently",
                                  e.target.value
                                )
                              }
                            />
                          </td>

                          <td>
                            <TextField
                              type="number"
                              name={`punctuality_${index}`}
                              id={`punctuality_${index}`}
                              value={student.punctuality || ""}
                              onChange={(e) =>
                                handleScoreChange(
                                  index,
                                  "punctuality",
                                  e.target.value
                                )
                              }
                            />
                          </td>

                          <td>
                            <TextField
                              type="number"
                              name={`talking_${index}`}
                              id={`talking_${index}`}
                              value={student.talking || ""}
                              onChange={(e) =>
                                handleScoreChange(
                                  index,
                                  "talking",
                                  e.target.value
                                )
                              }
                            />
                          </td>

                          <td>
                            <TextField
                              type="number"
                              name={`eyecontact_${index}`}
                              id={`eyecontact_${index}`}
                              value={student.eyecontact || ""}
                              onChange={(e) =>
                                handleScoreChange(
                                  index,
                                  "eyecontact",
                                  e.target.value
                                )
                              }
                            />
                          </td>

                          <td>
                            <TextField
                              type="text"
                              name={`remarks_${index}`}
                              id={`remarks_${index}`}
                              value={student.remarks || ""}
                              onChange={(e) =>
                                handleScoreChange(
                                  index,
                                  "remarks",
                                  e.target.value
                                )
                              }
                            />
                          </td>

                          <td>
                            <TextField
                              type="text"
                              name={`premarks_${index}`}
                              id={`premarks_${index}`}
                              value={student.premarks || ""}
                              onChange={(e) =>
                                handleScoreChange(
                                  index,
                                  "premarks",
                                  e.target.value
                                )
                              }
                            />
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

export default ManagePsy;

import React, { useState, useEffect, useRef, useContext } from "react";
import { Container, Grid, TextField, MenuItem, Button } from "@mui/material";
import { ValidatorForm } from "react-material-ui-form-validator";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box } from "@mui/system";
import useFetch from "../../../../hooks/useFetch";
import { SessionContext } from "../../../components/MatxLayout/Layout1/SessionContext";
import {
  Check,
  Close,
  Edit,
  Brush,
  Highlight,
  ArrowForward,
  RadioButtonUnchecked,
  CloseOutlined,
  Clear,
  Create,
  Undo,
  Star,
} from "@material-ui/icons";

const OnScreen = () => {
  // const [classData, setClassData] = useState([]);

  const { currentSession } = useContext(SessionContext);
  const {
    data: classData,
    loading: classLoading,
    error: classError,
  } = useFetch(`/class/${currentSession._id}`);
  const canvasRef = useRef(null);
  const [ctx, setCtx] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [questionNumber, setQuestionNumber] = useState("");
  const [outOfScore, setOutOfScore] = useState("");
  const [scoreGiven, setScoreGiven] = useState("");
  const [subjectData, setSubjectData] = useState([]);
  const [studentData, setStudentData] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [studentTheoryScores, setStudentTheoryScores] = useState([]);

  const [examId, setExamId] = useState(""); // Define and initialize examId state variable
  const [totalOutOfScore, setTotalOutOfScore] = useState(0);
  const [totalScoreGiven, setTotalScoreGiven] = useState(0);

  const [selectedName, setSelectedName] = useState("");
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [currentTool, setCurrentTool] = useState("");
  const [currentMousePosition, setCurrentMousePosition] = useState({
    x: 0,
    y: 0,
  });

  const [correctSymbolPosition, setCorrectSymbolPosition] = useState({
    x: 0,
    y: 0,
  });

  const [correctColor, setCorrectColor] = useState("green");

  const [questionDetails, setQuestionDetails] = useState([]);

  const [theoryAnswer, setTheoryAnswer] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;
  // const handleStudentChange = (event) => {
  //   const selectedStudent = event.target.value;
  //   setSelectedName(selectedStudent);
  // };

  const handleStudentChange = (event) => {
    const selectedStudentName = event.target.value;
    setSelectedName(selectedStudentName);

    // Find the selected student's ID from studentData
    const selectedStudent = studentData.find(
      (student) => student.studentName === selectedStudentName
    );

    if (selectedStudent) {
      setSelectedStudentId(selectedStudent.id); // Assuming student ID is stored in 'id' property
    }
  };

  useEffect(() => {
    if (selectedClass && currentSession) {
      const token = localStorage.getItem("jwtToken");

      // Fetch students based on the selected class and session
      fetch(`${apiUrl}/api/students/${currentSession._id}/${selectedClass}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch student data");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Student Data Received:", data);
          setStudentData(data);
        })
        .catch((error) => console.error("Error fetching student data:", error));

      // Fetch subjects based on the selected class and session
      fetch(
        `${apiUrl}/api/get-subject/${selectedClass}/${currentSession._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch subject data");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Subject Data Received:", data);
          setSubjectData(data);
        })
        .catch((error) => console.error("Error fetching subject data:", error));
    } else {
      setStudentData([]);
      setSubjectData([]);
    }
  }, [selectedClass, currentSession]);
  const handleClassChange = (event) => {
    const newSelectedClass = event.target.value;
    setSelectedClass(newSelectedClass);
    setStudentData([]);
  };

  const handleMarkSelection = (mark) => {
    // Handle mark selection
  };

  // const fetchQuestionTitle = async (questionId) => {
  //   try {
  //     const response = await fetch(`http://localhost:5000/api/${questionId}`);
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch question details");
  //     }
  //     const data = await response.json();
  //     return data.questionTitle;
  //   } catch (error) {
  //     console.error("Error fetching question details:", error);
  //     return "N/A";
  //   }
  // };
  const [questionData, setQuestionData] = useState([
    { question: "", originalMark: "", scoreGiven: "" },
    { question: "", originalMark: "", scoreGiven: "" },
    { question: "", originalMark: "", scoreGiven: "" },
    { question: "", originalMark: "", scoreGiven: "" },

    // Add more question data as needed
  ]);

  // const totalOriginalScore = questionData.reduce(
  //   (acc, curr) => acc + parseInt(curr.originalMark),
  //   0
  // );
  // const totalScoreGiven = questionData.reduce(
  //   (acc, curr) => acc + parseInt(curr.scoreGiven),
  //   0
  // );

  const handleScoreChange = (index, value) => {
    const updatedQuestionData = [...questionData];
    updatedQuestionData[index].scoreGiven = value;
    setQuestionData(updatedQuestionData);
  };

  const fetchQuestionTitles = async (questionIds) => {
    try {
      const promises = questionIds.map(async (questionId) => {
        const response = await fetch(`${apiUrl}/api/${questionId}`);
        if (!response.ok) {
          throw new Error("Failed to fetch question details");
        }
        const data = await response.json();
        return { id: questionId, title: data.questionTitle };
      });
      const resolvedTitles = await Promise.all(promises);
      return resolvedTitles;
    } catch (error) {
      console.error("Error fetching question titles:", error);
      return [];
    }
  };

  useEffect(() => {
    if (theoryAnswer) {
      const questionIds = Object.keys(theoryAnswer.answers);
      fetchQuestionTitles(questionIds)
        .then((titles) => {
          setQuestionDetails(titles);
        })
        .catch((error) => {
          console.error("Error fetching question titles:", error);
          setQuestionDetails([]);
        });
    }
  }, [theoryAnswer]);
  // const handleManageMarkClick = async () => {
  //   try {
  //     if (!selectedClass || !selectedSubject || !selectedName) {
  //       throw new Error("Please select class, subject, and student");
  //     }

  //     // Fetch theory answer from the backend
  //     const response = await fetch(
  //       `${apiUrl}/api/get-theory-answer-by-name/className/${selectedClass}/student/${encodeURIComponent(
  //         selectedName
  //       )}/subject/${selectedSubject}`
  //     );

  //     if (!response.ok) {
  //       throw new Error("Failed to fetch theory answer");
  //     }

  //     const data = await response.json();
  //     setTheoryAnswer(data.theoryAnswer);
  //   } catch (error) {
  //     console.error("Error fetching theory answer:", error);
  //     // Handle error
  //   }
  // };

  const handleManageMarkClick = async () => {
    try {
      if (!selectedClass || !selectedSubject || !selectedName) {
        throw new Error("Please select class, subject, and student");
      }

      // Fetch theory answer from the backend
      const theoryAnswerResponse = await fetch(
        `${apiUrl}/api/get-theory-answer-by-name/className/${selectedClass}/student/${encodeURIComponent(
          selectedName
        )}/subject/${selectedSubject}`
      );

      if (!theoryAnswerResponse.ok) {
        throw new Error("Failed to fetch theory answer");
      }

      const theoryAnswerData = await theoryAnswerResponse.json();
      setTheoryAnswer(theoryAnswerData.theoryAnswer);

      // Fetch student theory scores from the backend
      // const scoresResponse = await fetch(
      //   `${apiUrl}/api/student-theory-scores/${selectedStudentId}`
      // );
      const scoresResponse = await fetch(
        `${apiUrl}/api/student-theory-scores/${selectedClass}/${selectedName}/${selectedSubject}`
      );

      if (!scoresResponse.ok) {
        throw new Error("Failed to fetch student theory scores");
      }

      const scoresData = await scoresResponse.json();
      setStudentTheoryScores(scoresData.studentTheoryScores);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle error
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    setCtx(context);
  }, []);
  const handleMarkingToolClick = (tool) => {
    setCurrentTool(tool);
    // Remove event listeners for all tools
    canvasRef.current.removeEventListener("mousedown", handleMouseDown);
    canvasRef.current.removeEventListener("mousemove", handleMouseMove);
    canvasRef.current.removeEventListener("mouseup", handleMouseUp);

    if (tool === "ruler" || tool === "correct") {
      // Attach event listeners for drawing tool
      canvasRef.current.addEventListener("mousedown", handleMouseDown);
      canvasRef.current.addEventListener("mousemove", handleMouseMove);
      canvasRef.current.addEventListener("mouseup", handleMouseUp);
    }
    // if (tool === "correct") {
    //   setCorrectColor("green");
    // } else {
    //   setCorrectColor(""); // Reset color for other tools
    // }
  };
  const insertNewRow = () => {
    const newQuestion = {
      question: "",
      outOfScore: "",
      scoreGiven: "",
    };
    setQuestionData([...questionData, newQuestion]);
  };
  // const handleMouseDown = (event) => {
  //   const rect = canvasRef.current.getBoundingClientRect();
  //   const x = event.clientX - rect.left;
  //   const y = event.clientY - rect.top;
  //   setIsDrawing(true);
  //   setStartPoint({ x, y });
  //   if (currentTool === "correct") {
  //     const rect = canvasRef.current.getBoundingClientRect();
  //     const x = event.clientX - rect.left;
  //     const y = event.clientY - rect.top;
  //     setCorrectSymbolPosition({ x, y });
  //   }
  // };
  // Define fetchData function to fetch updated data
  // const fetchData = async (studentId) => {
  //   try {
  //     const token = localStorage.getItem("jwtToken");
  //     const response = await fetch(
  //       `http://localhost:5000/api/student-theory-scores/${studentId}`, // Assuming you have access to studentId
  //       {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     if (!response.ok) {
  //       throw new Error("Failed to fetch data");
  //     }

  //     const data = await response.json();
  //     return data.studentTheoryScores;
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     // Handle error
  //     return [];
  //   }
  // };
  // useEffect(() => {
  //   // Define a function to fetch student theory scores
  //   const fetchStudentTheoryScores = async () => {
  //     try {
  //       const token = localStorage.getItem("jwtToken");
  //       const response = await fetch(
  //         `http://localhost:5000/api/student-theory-scores/${selectedStudentId}`, // Assuming you have selectedStudentId state variable
  //         {
  //           method: "GET",
  //           headers: {
  //             Authorization: `Bearer ${token}`,
  //           },
  //         }
  //       );

  //       if (!response.ok) {
  //         throw new Error("Failed to fetch student theory scores");
  //       }

  //       const data = await response.json();

  //           // Update questionData state with fetched data
  //     const updatedQuestionData = data.studentTheoryScores.map((score) => ({
  //       question: score.questionNumber,
  //       originalMark: score.outOfScore, // Assuming you want to store original mark as well
  //       scoreGiven: score.scoreGiven,
  //     }));
  //     setQuestionData(updatedQuestionData);
  //       setStudentTheoryScores(data.studentTheoryScores);
  //     } catch (error) {
  //       console.error("Error fetching student theory scores:", error);
  //       // Handle error
  //     }
  //   };

  //   // Fetch student theory scores when selectedStudentId changes
  //   if (selectedStudentId) {
  //     fetchStudentTheoryScores();
  //   }
  // }, [selectedStudentId]);
  useEffect(() => {
    // Define a function to fetch student theory scores
    const fetchStudentTheoryScores = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const response = await fetch(
          `http://localhost:5000/api/student-theory-scores/${selectedStudentId}`, // Assuming you have selectedStudentId state variable
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch student theory scores");
        }

        const data = await response.json();

        // Update questionData state with fetched data
        const updatedQuestionData = data.studentTheoryScores.map((score) => ({
          question: score.questionNumber,
          outOfScore: score.outOfScore, // Corrected property name
          scoreGiven: score.scoreGiven,
        }));
        setQuestionData(updatedQuestionData);
        setStudentTheoryScores(data.studentTheoryScores);
      } catch (error) {
        console.error("Error fetching student theory scores:", error);
        // Handle error
      }
    };

    // Fetch student theory scores when selectedStudentId changes
    if (selectedStudentId) {
      fetchStudentTheoryScores();
    }
  }, [selectedStudentId]);

  useEffect(() => {
    // Populate input fields with fetched data when studentTheoryScores change
    if (studentTheoryScores.length > 0) {
      const updatedQuestionData = studentTheoryScores.map((score) => ({
        question: score.questionNumber,
        outOfScore: score.outOfScore,
        scoreGiven: score.scoreGiven,
      }));
      setQuestionData(updatedQuestionData);
    }
  }, [studentTheoryScores]);

  const handleSaveScore = async (index) => {
    try {
      const token = localStorage.getItem("jwtToken");
      const question = questionData[index];

      const response = await fetch(
        "http://localhost:5000/api/save-student-theory-score",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            className: selectedClass,
            studentName: selectedName,
            subjectName: selectedSubject,
            questionNumber: question.question,
            outOfScore: question.outOfScore,
            scoreGiven: question.scoreGiven,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save score");
      }

      // Clear input fields after successful save
      // const updatedQuestionData = [...questionData];
      // updatedQuestionData[index].outOfScore = "";
      // updatedQuestionData[index].scoreGiven = "";
      // setQuestionData(updatedQuestionData);

      // const updatedData = await fetchData(); // Implement fetchData function to fetch updated data
      // setQuestionData(updatedData);
      // Refresh data or update UI as needed
    } catch (error) {
      console.error("Error saving score:", error);
      // Handle error
    }
  };

  const saveTotalScores = async () => {
    try {
      const token = localStorage.getItem("jwtToken");
      const studentId = ""; // Set the studentId here, depending on your application logic

      const response = await fetch(
        "http://localhost:5000/api/save-total-scores",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            studentId,
            totalOutOfScore,
            totalScoreGiven,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to save total scores");
      }

      // Handle success
    } catch (error) {
      console.error("Error saving total scores:", error);
      // Handle error
    }
  };

  useEffect(() => {
    // Fetch total out of score and total score given from the backend
    const fetchTotalScores = async () => {
      try {
        const studentId = ""; // Set the studentId here, depending on your application logic
        const response = await fetch(
          `http://localhost:5000/api/calculate-total-score/${studentId}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch total scores");
        }

        const data = await response.json();
        setTotalOutOfScore(data.totalOutOfScore);
        setTotalScoreGiven(data.totalScoreGiven);
      } catch (error) {
        console.error("Error fetching total scores:", error);
        // Handle error
      }
    };

    fetchTotalScores();
  }, []);

  const handleMouseMove = (event) => {
    if (!isDrawing || !ctx) return;
    const rect = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    setCurrentMousePosition({ x, y });
    ctx.strokeStyle = "red";

    switch (currentTool) {
      case "ruler":
        ctx.beginPath();
        ctx.moveTo(startPoint.x, startPoint.y);
        ctx.lineTo(x, y);
        ctx.stroke();
        setStartPoint({ x, y });
        break;
      case "correct":
        setCorrectSymbolPosition({ x, y }); // Update the position of the correct symbol
        break;

      // Add cases for other drawing tools if needed

      default:
        break;
    }
  };

  const handleMouseUp = () => {
    setIsDrawing(false);
  };

  const handleMouseDown = (event) => {
    const rect = canvasRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    if (currentTool === "correct") {
      setCorrectSymbolPosition({ x, y });
    } else {
      // Handle ruler/drawing tool
      setIsDrawing(true);
      setStartPoint({ x, y });
    }
  };
  useEffect(() => {
    if (ctx && currentTool === "correct") {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      // Draw the check icon
      ctx.fillStyle = "green";
      ctx.font = "30px FontAwesome"; // Assuming FontAwesome is used for the check icon
      ctx.fillText("\uf00c", correctSymbolPosition.x, correctSymbolPosition.y);
    }
  }, [ctx, currentTool, correctSymbolPosition]);

  // useEffect(() => {
  //   if (ctx) {
  //     // Clear the canvas before drawing
  //     ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  //     // Draw text
  //     if (theoryAnswer) {
  //       Object.entries(theoryAnswer.answers).forEach(([questionId, answer]) => {
  //         const questionTitle =
  //           questionDetails.find((detail) => detail.id === questionId)?.title ||
  //           "N/A";
  //         ctx.fillStyle = "black";
  //         ctx.font = "12px Arial";
  //         ctx.fillText(`Question Title: ${questionTitle}`, 20, 20);
  //         ctx.fillText(`Answer: ${answer}`, 20, 40);
  //       });
  //     }
  //   }
  // }, [ctx, theoryAnswer, questionDetails]);

  // useEffect(() => {
  //   if (ctx) {
  //     // Clear the canvas before drawing
  //     ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  //     // Draw text
  //     if (theoryAnswer) {
  //       Object.entries(theoryAnswer.answers).forEach(([questionId, answer]) => {
  //         const questionTitle =
  //           questionDetails.find((detail) => detail.id === questionId)?.title ||
  //           "N/A";
  //         // ctx.fillStyle = "black";
  //         ctx.font = "20px Arial";
  //         ctx.fillText(`Question Title: ${questionTitle}`, 20, 20);
  //         ctx.fillText(`Answer: ${answer}`, 20, 40);
  //       });
  //     }
  //     // Draw correct symbol
  //     if (currentTool === "correct") {
  //       ctx.fillStyle = correctColor;
  //       ctx.beginPath();
  //       ctx.arc(
  //         correctSymbolPosition.x,
  //         correctSymbolPosition.y,
  //         5,
  //         0,
  //         Math.PI * 2
  //       );
  //       ctx.fill();
  //     }
  //   }
  // }, [ctx, theoryAnswer, questionDetails, correctSymbolPosition, correctColor]);

  // Function to wrap text based on available width
  const wrapText = (text, maxWidth, ctx) => {
    const words = text.split(" ");
    const lines = [];
    let currentLine = "";

    words.forEach((word) => {
      const testLine = currentLine + word + " ";
      const testWidth = ctx.measureText(testLine).width;
      if (testWidth > maxWidth) {
        lines.push(currentLine);
        currentLine = word + " ";
      } else {
        currentLine = testLine;
      }
    });

    lines.push(currentLine);
    return lines;
  };

  // UseEffect hook
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    if (ctx) {
      // Clear the canvas before drawing
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      if (theoryAnswer) {
        let yPosition = 20; // Initial y-position
        const lineSpacing = 10; // Adjust line spacing as needed
        let currentPage = 1;
        let remainingContent = [];

        Object.entries(theoryAnswer.answers).forEach(([questionId, answer]) => {
          // Retrieve question title from questionDetails array
          const questionDetail = questionDetails.find(
            (detail) => detail.id === questionId
          );
          const questionTitle = questionDetail ? questionDetail.title : "N/A";

          const questionTitleLines = wrapText(
            questionTitle,
            ctx.canvas.width - 30,
            ctx
          );
          const answerLines = wrapText(answer, ctx.canvas.width - 30, ctx);

          // Calculate total lines required for question and answer
          const totalLines =
            questionTitleLines.length + answerLines.length + 10; // 4 for title and answer headings

          // Render question and answer if it fits on the current canvas
          if (yPosition + totalLines * lineSpacing < ctx.canvas.height) {
            // Render question title
            questionTitleLines.forEach((line) => {
              ctx.fillText(line, 20, yPosition);
              yPosition += lineSpacing; // Increment y-position for each line
            });

            // Render answer
            answerLines.forEach((line) => {
              ctx.fillText(line, 20, yPosition);
              yPosition += lineSpacing; // Increment y-position for each line
            });

            // Add extra spacing between questions
            yPosition += lineSpacing;
          } else {
            // Move remaining content to another canvas (if needed)
            remainingContent.push({ questionTitleLines, answerLines });
          }
        });

        if (remainingContent.length > 0) {
          // Handle remaining content here (if needed)
        }
      }
    }
  }, [theoryAnswer, questionDetails]);

  // const handleScoreChange = (index, field, value) => {
  //   const updatedQuestionData = [...questionData];
  //   updatedQuestionData[index][field] = value;
  //   setQuestionData(updatedQuestionData);
  // };

  // const [studentId, setStudentId] = useState(""); // Define and initialize studentId state variable

  // useEffect(() => {
  //   // Assuming you have the student ID available in your component state
  //   if (studentId) {
  //     fetchTotalScore(studentId);
  //   }
  // }, [studentId]); // Fetch total score when the studentId changes

  // const fetchTotalScore = async (studentId) => {
  //   try {
  //     const response = await fetch(
  //       `http://localhost:5000/api/calculate-total-score/${studentId}`
  //     );
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch total score");
  //     }
  //     const data = await response.json();
  //     setTotalOutOfScore(data.totalOutOfScore);
  //     setTotalScoreGiven(data.totalScoreGiven);
  //   } catch (error) {
  //     console.error("Error fetching total score:", error);
  //   }
  // };
  useEffect(() => {
    // Calculate total out of score
    const totalOutOf = questionData.reduce(
      (total, question) => total + parseFloat(question.outOfScore || 0),
      0
    );
    setTotalOutOfScore(totalOutOf);

    // Calculate total score given
    const totalScore = questionData.reduce(
      (total, question) => total + parseFloat(question.scoreGiven || 0),
      0
    );
    setTotalScoreGiven(totalScore);
  }, [questionData]);

  return (
    <div
      style={{
        display: "flex",
        height: "100%",
        marginTop: "50px",
        overflowX: "auto",
      }}
    >
      <Container>
        <ValidatorForm onError={() => null}>
          <Box className="breadcrumb">{/* Breadcrumb component */}</Box>
          <Grid container spacing={3}>
            <Grid item xs={4}>
              <TextField
                select
                label="Select a class"
                variant="outlined"
                value={selectedClass}
                onChange={handleClassChange}
                fullWidth
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
              <TextField
                select
                label="Select the Student"
                variant="outlined"
                value={selectedName}
                onChange={handleStudentChange}
                fullWidth
              >
                {studentData.map((student) => (
                  <MenuItem key={student.id} value={student.studentName}>
                    {student.studentName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField
                select
                label="Select the subject"
                variant="outlined"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                fullWidth
              >
                {subjectData.map((item) => (
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
                type="button"
                onClick={handleManageMarkClick}
              >
                View Answer
              </Button>
            </Grid>
          </Grid>

          <div style={{ display: "flex", height: "100%", marginTop: "50px" }}>
            {/* Left Section (20% flex) */}
            <div
              style={{
                flex: "20%",
                borderRight: "1px solid #ccc",
                padding: "20px",
              }}
            >
              {/* Marking tools */}
              {/* Marks */}
              <div>
                <Button
                  onClick={() => handleMarkSelection("0")}
                  style={{
                    backgroundColor: "#042954",
                    color: "white",
                    borderRadius: "50%",
                  }}
                >
                  0
                </Button>
                <Button
                  onClick={() => handleMarkSelection("1/2")}
                  style={{
                    backgroundColor: "#042954",
                    color: "white",
                    borderRadius: "50%",
                  }}
                >
                  1/2
                </Button>
                <Button
                  onClick={() => handleMarkSelection("1/2")}
                  style={{
                    backgroundColor: "#042954",
                    color: "white",
                    borderRadius: "50%",
                  }}
                >
                  1
                </Button>
                <Button
                  onClick={() => handleMarkSelection("1/2")}
                  style={{
                    backgroundColor: "#042954",
                    color: "white",
                    borderRadius: "50%",
                  }}
                >
                  {" "}
                  2
                </Button>
                <Button
                  onClick={() => handleMarkSelection("1/2")}
                  style={{
                    backgroundColor: "#042954",
                    color: "white",
                    borderRadius: "50%",
                  }}
                >
                  3
                </Button>
                <Button
                  onClick={() => handleMarkSelection("1/2")}
                  style={{
                    backgroundColor: "#042954",
                    color: "white",
                    borderRadius: "50%",
                  }}
                >
                  4
                </Button>
                <Button
                  onClick={() => handleMarkSelection("1/2")}
                  style={{
                    backgroundColor: "#042954",
                    color: "white",
                    borderRadius: "50%",
                  }}
                >
                  5
                </Button>
                <Button
                  onClick={() => handleMarkSelection("1/2")}
                  style={{
                    backgroundColor: "#042954",
                    color: "white",
                    borderRadius: "50%",
                  }}
                >
                  6
                </Button>
                <Button
                  onClick={() => handleMarkSelection("1/2")}
                  style={{
                    backgroundColor: "#042954",
                    color: "white",
                    borderRadius: "50%",
                  }}
                >
                  7
                </Button>
                <Button
                  onClick={() => handleMarkSelection("1/2")}
                  style={{
                    backgroundColor: "#042954",
                    color: "white",
                    borderRadius: "50%",
                  }}
                >
                  8
                </Button>
                <Button
                  onClick={() => handleMarkSelection("1/2")}
                  style={{
                    backgroundColor: "#042954",
                    color: "white",
                    borderRadius: "50%",
                  }}
                >
                  9
                </Button>
                <Button
                  onClick={() => handleMarkSelection("1/2")}
                  style={{
                    backgroundColor: "#042954",
                    color: "white",
                    borderRadius: "50%",
                  }}
                >
                  10
                </Button>
                {/* Add more marks here */}
              </div>
              (
              <div>
                <div style={{ display: "flex", marginBottom: "20px" }}>
                  <div style={{ marginRight: "10px" }}>
                    <Button
                      onClick={() => handleMarkingToolClick("correct")}
                      style={{ border: "3px solid #042954" }}
                    >
                      <Check />
                    </Button>
                  </div>
                  <div style={{ marginRight: "10px" }}>
                    <Button
                      onClick={() => handleMarkingToolClick("wrong")}
                      style={{ border: "3px solid #042954" }}
                    >
                      <Close />
                    </Button>
                  </div>
                </div>
                <div style={{ display: "flex", marginBottom: "20px" }}>
                  <div style={{ marginRight: "10px" }}>
                    <Button
                      onClick={() => handleMarkingToolClick("ruler")}
                      style={{ border: "3px solid #042954" }}
                    >
                      <Create />
                    </Button>
                  </div>
                  <div style={{ marginRight: "10px" }}>
                    <Button
                      onClick={() => handleMarkingToolClick("brush")}
                      style={{ border: "3px solid #042954" }}
                    >
                      <Brush />
                    </Button>
                  </div>
                </div>
                <div style={{ display: "flex", marginBottom: "20px" }}>
                  <div style={{ marginRight: "10px" }}>
                    <Button
                      onClick={() => handleMarkingToolClick("highlight")}
                      style={{ border: "3px solid #042954" }}
                    >
                      <Highlight />
                    </Button>
                  </div>
                  <div style={{ marginRight: "10px" }}>
                    <Button
                      onClick={() => handleMarkingToolClick("star")}
                      style={{ border: "3px solid #042954" }}
                    >
                      <Star />
                    </Button>
                  </div>
                </div>

                <div style={{ display: "flex", marginBottom: "20px" }}>
                  <div style={{ marginRight: "10px" }}>
                    <Button
                      onClick={() => handleMarkingToolClick("draw")}
                      style={{ border: "3px solid #042954" }}
                    >
                      <Clear />
                    </Button>
                  </div>
                  <div style={{ marginRight: "10px" }}>
                    <Button
                      onClick={() => handleMarkingToolClick("na")}
                      style={{ border: "3px solid #042954" }}
                    >
                      N/A
                    </Button>
                  </div>
                </div>
                <div style={{ display: "flex", marginBottom: "20px" }}>
                  <div style={{ marginRight: "10px" }}>
                    <Button
                      onClick={() => handleMarkingToolClick("undo")}
                      style={{ border: "3px solid #042954" }}
                    >
                      <Undo />
                    </Button>
                  </div>
                  <div style={{ marginRight: "10px" }}>
                    <Button
                      onClick={() => handleMarkingToolClick("arrow")}
                      style={{ border: "3px solid #042954" }}
                    >
                      <ArrowForward />
                    </Button>
                  </div>
                </div>

                <div style={{ display: "flex", marginBottom: "20px" }}>
                  <div style={{ marginRight: "10px" }}>
                    <Button
                      onClick={() => handleMarkingToolClick("circle")}
                      style={{ border: "3px solid #042954" }}
                    >
                      <RadioButtonUnchecked />
                    </Button>
                  </div>
                  <div style={{ marginRight: "10px" }}>
                    <Button
                      onClick={() => handleMarkingToolClick("cross")}
                      style={{ border: "3px solid #042954" }}
                    >
                      <CloseOutlined />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ flex: "60%", padding: "20px" }}>
              <canvas
                ref={canvasRef}
                width="800"
                height="600"
                style={{ border: "1px solid #000" }}
                onMouseDown={(event) => {
                  if (currentTool === "ruler" || currentTool === "correct") {
                    handleMouseDown(event);
                  }
                }}
                onMouseMove={(event) => {
                  if (currentTool === "ruler" || currentTool === "correct") {
                    handleMouseMove(event);
                  }
                }}
                onMouseUp={() => {
                  if (currentTool === "ruler") {
                    handleMouseUp();
                  }
                }}
              />
              {currentTool === "correct" && (
                <Check
                  style={{
                    position: "absolute",
                    left: correctSymbolPosition.x,
                    top: correctSymbolPosition.y,
                  }}
                />
              )}
            </div>
            <div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  marginRight: "100px",
                }}
              >
                <div
                  style={{
                    backgroundColor: "#042954",
                    color: "white",
                    padding: "10px",
                    fontSize: "20px",
                    marginBottom: "10px",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <span style={{ width: "30%" }}>Question</span>
                  <span style={{ width: "30%" }}>Out Of</span>
                  <span style={{ width: "30%" }}>Score</span>
                </div>
                {questionData.map((question, index) => (
                  <div
                    key={index}
                    style={{ display: "flex", marginBottom: "10px" }}
                  >
                    <input
                      type="text"
                      placeholder="Question Number"
                      value={question.question}
                      onChange={(e) => {
                        const newQuestionNumber = e.target.value;
                        const updatedQuestionData = [...questionData];
                        const existingQuestionNumbers = updatedQuestionData.map(
                          (question) => question.question
                        );

                        // Check if the entered question number already exists
                        if (
                          existingQuestionNumbers.includes(newQuestionNumber)
                        ) {
                          // Show alert if the question number already exists
                          alert(
                            "Question number already exists. Please enter a unique question number."
                          );
                        } else {
                          // Update the question number if it is unique
                          updatedQuestionData[index].question =
                            newQuestionNumber;
                          setQuestionData(updatedQuestionData);
                        }
                      }}
                    />

                    <input
                      type="number"
                      placeholder=""
                      value={question.outOfScore}
                      onChange={(e) => {
                        const updatedQuestionData = [...questionData];
                        updatedQuestionData[index].outOfScore = e.target.value;
                        setQuestionData(updatedQuestionData);
                      }}
                    />
                    <input
                      type="number"
                      placeholder=""
                      value={question.scoreGiven}
                      onChange={(e) => {
                        const updatedQuestionData = [...questionData];
                        updatedQuestionData[index].scoreGiven = e.target.value;
                        setQuestionData(updatedQuestionData);
                      }}
                    />
                    <button
                      onClick={() => handleSaveScore(index)}
                      style={{
                        backgroundColor: "#042954",
                        width: "100px",
                        color: "#fff",
                        padding: "13px",
                      }}
                    >
                      Save Score
                    </button>
                  </div>
                ))}
                <button
                  onClick={insertNewRow}
                  style={{
                    backgroundColor: "#042954",
                    marginBottom: "20px",
                    color: "#fff",
                    padding: "13px",
                  }}
                >
                  Insert New Row
                </button>
              </div>
              <button
                onClick={insertNewRow}
                style={{
                  backgroundColor: "#042954",
                  marginBottom: "20px",
                  color: "#fff",
                  padding: "13px",
                }}
              >
                Calculate Total Score: {totalScoreGiven}/{totalOutOfScore}
              </button>
              <button
                onClick={saveTotalScores}
                style={{
                  backgroundColor: "#042954",
                  marginBottom: "20px",
                  color: "#fff",
                  padding: "13px",
                }}
              >
                Save Total Score
              </button>
            </div>
          </div>
          <ToastContainer />
        </ValidatorForm>
      </Container>
    </div>
  );
};

export default OnScreen;

import React, { useEffect, useState } from "react";
import {
  Grid,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  MenuItem,
  Select,
  TextField,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useLocation, useNavigate } from "react-router-dom";
import useFetch from "hooks/useFetch";

const ManSin2 = () => {
  const location = useLocation();
  const parts = location.pathname.split("/");
  const id = parts[3];

  const { data, loading, error } = useFetch(`/get-exam/${id}`);
  const [questionType, setQuestionType] = useState("");

  const [numberOfOptions, setNumberOfOptions] = useState(0);
  const [optionFields, setOptionFields] = useState([]);
  const [mark, setMark] = useState("");
  const [questionTitle, setQuestionTitle] = useState("");
  const [options, setOptions] = useState([]);
  const navigate = useNavigate();

  const [totalMark, setTotalMark] = useState(0);
  const [questions, setQuestions] = useState([]);
  const apiUrl = process.env.REACT_APP_API_URL;

  // Function to calculate total marks
  const calculateTotalMarks = () => {
    const total = questions.reduce(
      (total, question) => total + question.mark,
      0
    );
    console.log("Total Mark after update:", total);
    return total;
  };

  // Update total marks whenever questions change
  //   useEffect(() => {
  //     const total = calculateTotalMarks();
  //     console.log("Total Mark after update:", total);
  //     setTotalMark(total);
  //   }, [questions]);

  useEffect(() => {
    if (questions.length > 0) {
      const initialTotalMark = calculateTotalMarks();
      setTotalMark(initialTotalMark);
      console.log("Initial Total Mark:", initialTotalMark);
    }
  }, [questions]);

  //   const handleQuestionTypeChange = (event) => {
  //     setQuestionType(event.target.value);
  //     setMark("");
  //     setQuestionTitle("");
  //   };
  const handleQuestionTypeChange = (event) => {
    const selectedQuestionType = event.target.value;
    console.log("Selected Question Type:", selectedQuestionType);
    setQuestionType(selectedQuestionType);
    setMark("");
    setQuestionTitle("");
  };

  const handleNumberOfOptionsChange = (event) => {
    setNumberOfOptions(parseInt(event.target.value));
  };

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        // Fetch the JWT token from local storage
        const token = localStorage.getItem("jwtToken");

        // Include the token in the request headers
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await fetch(`${apiUrl}/api/questions/${id}`, {
          method: "GET",
          headers, // Include the headers in the request
        });

        if (response.ok) {
          const questionsData = await response.json();
          setQuestions(questionsData);
        } else {
          console.error("Failed to fetch questions");
        }
      } catch (error) {
        console.error("An error occurred while fetching questions:", error);
      }
    };

    fetchQuestions();
  }, [id]);
  const addQuestion = (newQuestion) => {
    console.log("Adding question:", newQuestion);
    const newMark = parseInt(newQuestion.mark);
    setQuestions([...questions, newQuestion]);
    setTotalMark((prevTotalMark) => prevTotalMark + newMark);
  };

  const submitQuestion = async () => {
    try {
      // Fetch the JWT token from wherever you've stored it (e.g., local storage)
      const token = localStorage.getItem("jwtToken");

      // Construct the questionData object based on questionType
      const questionData = {
        questionType: questionType,
        // type: questionType,
        mark, // Set the mark
        // question_title: questionTitle, // Set the question title
        questionTitle,
        examId: id, // Set the examId
      };

      if (questionType === "multiple_choice") {
        // For multiple-choice questions, add options
        questionData.options = optionFields.map((option, i) => ({
          option: document.getElementById(`option${i + 1}`).value,
          isCorrect: document.getElementById(`correct${i + 1}`).checked,
        }));
      } else if (questionType === "true_false") {
        // For True/False questions, add the correctAnswer
        questionData.correctAnswer = document.querySelector(
          'input[name="answer"]:checked'
        ).value;
      }

      const response = await fetch(`${apiUrl}/api/questions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include the JWT token in the headers
        },
        body: JSON.stringify(questionData),
      });

      if (response.ok) {
        // Question submitted successfully, you can handle the response here
        console.log("Question submitted successfully");
        // Call addQuestion to update the UI with the new question
        addQuestion(questionData);
      } else {
        // Handle errors
        console.error("Failed to submit the question");
      }
    } catch (error) {
      console.error("An error occurred while submitting the question:", error);
    }
  };

  const generateOptions = () => {
    const options = Array.from({ length: numberOfOptions }, (_, i) => (
      <div key={i} className="form-group options">
        <label className="col-sm-3 control-label">Option {i + 1}</label>
        <div className="col-sm-8">
          <div className="input-group">
            <TextField
              type="text"
              variant="outlined"
              fullWidth
              label={`Option ${i + 1}`}
              required
              id={`option${i + 1}`}
            />
            <div className="input-group-addon">
              <input
                type="checkbox"
                name="correct_answers[]"
                value={`correct${i + 1}`}
                id={`correct${i + 1}`}
              />
            </div>
          </div>
        </div>
      </div>
    ));
    setOptionFields(options);
  };

  const renderQuestionFields = () => {
    if (questionType === "multiple_choice") {
      console.log("Question Type:", questionType);
      // ...rest of your code

      return (
        <form
          className="form-horizontal form-groups-bordered validate"
          target="_top"
          accept-charset="utf-8"
        >
          <input type="hidden" name="type" value="multiple_choice" />
          <div className="form-group">
            <label className="col-sm-3 control-label">Mark</label>
            <div className="col-sm-8">
              <TextField
                type="number"
                variant="outlined"
                fullWidth
                name="mark"
                value={mark} // Use the mark state
                onChange={(e) => setMark(e.target.value)}
                required
                inputProps={{ min: "0" }}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-3 control-label">Question Title</label>
            <div className="col-sm-8">
              <textarea
                name="question_title"
                className="form-control"
                rows="4" // Adjust the number of rows as needed
                value={questionTitle} // Use the questionTitle state
                onChange={(e) => setQuestionTitle(e.target.value)} // Update the questionTitle state
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="col-sm-3 control-label">Number Options</label>
            <div className="col-sm-8">
              <div className="input-group">
                <TextField
                  type="number"
                  fullWidth
                  variant="outlined"
                  onChange={handleNumberOfOptionsChange}
                  value={numberOfOptions}
                  required
                />
                <div className="input-group-addon">
                  <Button onClick={generateOptions} variant="contained">
                    Generate Options
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {optionFields}
          <div className="form-group">
            <div className="col-sm-12">
              <Button
                type="submit"
                variant="contained"
                onClick={(event) => {
                  event.preventDefault();
                  const questionData = {
                    type: questionType,
                    mark: mark, //
                    question_title: questionTitle,
                  };

                  // ...rest of your code
                  console.log("question Data:", questionData);

                  submitQuestion(questionData);
                  console.log("question Data:", questionData);
                }}
              >
                Add Question
              </Button>
            </div>
          </div>
        </form>
      );
    } else if (questionType === "true_false") {
      // ...rest of your code

      return (
        <form
          className="form-horizontal form-groups-bordered validate"
          target="_top"
          accept-charset="utf-8"
        >
          <input type="hidden" name="type" value="true_false" />
          <div className="form-group">
            <label className="col-sm-3 control-label">Mark</label>
            <div className="col-sm-8">
              <TextField
                type="number"
                variant="outlined"
                fullWidth
                name="mark"
                required
                value={mark} // Use the mark state
                onChange={(e) => setMark(e.target.value)}
                inputProps={{ min: "0" }}
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-3 control-label">Question Title</label>
            <div className="col-sm-8">
              <textarea
                name="question_title"
                className="form-control"
                rows="4"
                value={questionTitle}
                onChange={(e) => setQuestionTitle(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="form-group">
            <label className="col-sm-3 control-label">Answer</label>
            <div className="col-sm-8">
              <div>
                <label>
                  <input type="radio" name="answer" value="true" />
                  True
                </label>
              </div>
              <div>
                <label>
                  <input type="radio" name="answer" value="false" />
                  False
                </label>
              </div>
            </div>
          </div>
          <div className="form-group">
            <div className="col-sm-12">
              <Button
                type="submit"
                variant="contained"
                onClick={(event) => {
                  event.preventDefault();
                  const questionData = {
                    type: questionType,
                    mark: mark, // Extract the mark from the state
                    question_title: questionTitle, // Extract the question title from the state
                    // Add other fields as needed based on the question type
                  };
                  console.log("Question Type:", questionType);
                  console.log("question Data:", questionData);
                  // ...rest of your code

                  submitQuestion(questionData);
                  console.log("question Data:", questionData);
                }}
              >
                Add Question
              </Button>
            </div>
          </div>
        </form>
      );
    }
  };

  return (
    <div style={{ marginTop: "50px" }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper>
            <div className="panel panel-primary" data-collapsed="0">
              <div className="panel-heading">
                <div
                  className="panel-title"
                  style={{
                    padding: "12px",
                    backgroundColor: "#f2f4f8",
                    color: "black",
                  }}
                >
                  <i className="entypo-menu"></i>
                  Question List
                </div>
              </div>
              <div className="panel-body">
                <Table className="table table-bordered">
                  <TableHead>
                    <TableRow>
                      <TableCell style={{ textAlign: "center" }} width="5%">
                        <div>#</div>
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        <div>Type</div>
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }} width="55%">
                        <div>Question</div>
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }} width="10%">
                        <div>Mark</div>
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
                        <div>Options</div>
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {questions.map((question, index) => (
                      <TableRow key={question._id}>
                        <TableCell style={{ textAlign: "center" }}>
                          {index + 1}
                        </TableCell>
                        <TableCell>{question.questionType}</TableCell>
                        <TableCell>{question.questionTitle}</TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          {question.mark}
                        </TableCell>
                        <TableCell style={{ textAlign: "center" }}>
                          <a
                            href="#"
                            className="btn btn-primary btn-xs"
                            data-toggle="tooltip"
                            title=""
                            data-original-title="Edit"
                          >
                            <EditIcon />
                          </a>
                          <a
                            href="#"
                            className="btn btn-danger btn-xs"
                            data-toggle="tooltip"
                            title=""
                            data-original-title="Delete"
                          >
                            <DeleteIcon />
                          </a>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper>
            <div className="panel panel-primary" data-collapsed="0">
              <div className="panel-heading">
                <div
                  className="panel-title"
                  style={{
                    padding: "12px",
                    backgroundColor: "#f2f4f8",
                    color: "black",
                  }}
                >
                  <i className="entypo-info-circled"></i>
                  Exam Details
                </div>
              </div>
              <div className="panel-body">
                <Table className="table table-bordered">
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <b>Exam Title</b>
                      </TableCell>
                      <TableCell>{data.title}</TableCell>
                      <TableCell>
                        <b>Date</b>
                      </TableCell>
                      <TableCell>{data?.date}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <b>Class</b>
                      </TableCell>
                      <TableCell>{data?.className}</TableCell>
                      <TableCell>
                        <b>Time</b>
                      </TableCell>
                      <TableCell>
                        {data.fromTime} - {data.toTime}
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <b>Section</b>
                      </TableCell>
                      <TableCell>A</TableCell>
                      <TableCell>
                        <b>Passing Percentage</b>
                      </TableCell>
                      <TableCell>{data.percent}%</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <b>Subject</b>
                      </TableCell>
                      <TableCell>{data?.subject}</TableCell>
                      <TableCell>
                        <b>Total Marks</b>
                      </TableCell>
                      <TableCell>{totalMark}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </Paper>
          <Paper>
            <div className="panel panel-primary" data-collapsed="0">
              <div className="panel-heading">
                <div
                  className="panel-title"
                  style={{
                    padding: "12px",
                    backgroundColor: "#f2f4f8",
                    color: "black",
                  }}
                >
                  <i className="entypo-plus-circled"></i>
                  Add Question
                </div>
              </div>
              <div className="panel-body">
                <div className="form-group">
                  <label className="col-sm-3 control-label">
                    Question Type
                  </label>
                  <div className="col-sm-8">
                    <Select
                      value={questionType}
                      displayEmpty
                      style={{ width: "100%" }}
                      onChange={handleQuestionTypeChange}
                    >
                      <MenuItem value="" disabled>
                        Select Question Type
                      </MenuItem>
                      <MenuItem value="multiple_choice">
                        Multiple Choice
                      </MenuItem>
                      <MenuItem value="true_false">True Or False</MenuItem>
                      <MenuItem value="fill_in_the_blanks">
                        Fill In The Blanks
                      </MenuItem>
                    </Select>
                  </div>
                </div>
                {renderQuestionFields()}
              </div>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default ManSin2;

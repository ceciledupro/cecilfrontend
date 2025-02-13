import { MenuItem, Select, Stack } from "@mui/material";
import { Box } from "@mui/system";
import { Breadcrumb, SimpleCard } from "../../../../app/components";
import { format } from "date-fns";

import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Icon,
  Radio,
  RadioGroup,
  Typography,
  styled,
} from "@mui/material";

import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { Span } from "../../../../app/components/Typography";
import { useContext, useEffect, useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import useFetch from "../../../../hooks/useFetch";
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

const PQ = () => {
  const { currentSession } = useContext(SessionContext);
  const [topics, setTopics] = useState([]);
  const [loading, setLoading] = useState(false);
  const {
    data: classData,
    loading: classLoading,
    error: classError,
  } = useFetch(`/class/${currentSession._id}`);
  const [subjectData, setSubjectData] = useState([]); // Initialize subject data as an empty array

  const [title, setTitle] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");

  const [fromTime, setFromTime] = useState(null);
  const [toTime, setToTime] = useState(null);
  const [suggestions, setSuggestions] = useState([]); // New state for suggestions
  const [previewContent, setPreviewContent] = useState(""); // New state for preview content

  const [topic, setTopic] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState(0);

  const apiUrl = process.env.REACT_APP_API_URL;

  const navigate = useNavigate();

  const handleSubmit = (event, preview = false) => {
    event.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      console.error("Token is missing or expired");
      setLoading(false);
      return;
    }

    const examData = {
      title,
      className: selectedClass,
      subject: selectedSubject,

      session: currentSession._id,
      topic,
      difficulty,
      numberOfQuestions,
      preview,
    };

    fetch(`${apiUrl}/api/generate-questions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(examData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        if (preview) {
          setPreviewContent(data.questions.join("\n")); // Update preview content with generated questions
        } else {
          navigate("/dashboard/manage-online-exam");
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error generating exam questions:", error);
        setLoading(false); // Set loading to false in case of error
      });
  };

  const handlePreview = (event) => handleSubmit(event, true);

  const handleSave = (event) => handleSubmit(event, false);

  useEffect(() => {
    if (selectedClass && currentSession) {
      const token = localStorage.getItem("jwtToken");

      const headers = new Headers();
      headers.append("Authorization", `Bearer ${token}`);

      // Fetch subjects for the selected class and session
      fetch(
        `${apiUrl}/api/get-subject/${selectedClass}/${currentSession._id}`, // Include sessionId here
        { headers }
      )
        .then((response) => response.json())
        .then((data) => {
          setSubjectData(data);
        })
        .catch((error) => {
          console.error("Error fetching subjects:", error);
        });
    } else {
      setSubjectData([]);
    }
  }, [selectedClass, currentSession]); // Re-fetch when class or session changes

  const handleClassChange = (event) => {
    const newSelectedClass = event.target.value;
    setSelectedClass(newSelectedClass);

    // Clear the selected subject when the class changes
    setSelectedSubject("");
  };

  const handleSubjectChange = (event) => {
    setSelectedSubject(event.target.value);
  };

  const handleFromTimeChange = (newTime) => {
    setFromTime(newTime);
  };

  const handleToTimeChange = (newTime) => {
    setToTime(newTime);
  };
  // Handle topic input change and update suggestions
  const handleTopicChange = (event) => {
    const value = event.target.value;
    setTopic(value);

    // Replace this with your logic to fetch or filter suggestions
    const allTopics = ["Math", "Science", "History", "Geography"]; // Example topics
    const filteredSuggestions = allTopics.filter((t) =>
      t.toLowerCase().includes(value.toLowerCase())
    );
    setSuggestions(filteredSuggestions);
  };

  const handleSuggestionClick = (suggestion) => {
    setTopic(suggestion);
    setSuggestions([]); // Clear suggestions after selection
  };

  useEffect(() => {
    if (selectedSubject) {
      fetch(`${apiUrl}/api/generate-topics`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subject: selectedSubject }),
      })
        .then((res) => res.json())
        .then((data) => setTopics(data.topics || []))
        .catch((err) => console.error("Error fetching topics:", err));
    } else {
      setTopics([]);
    }
  }, [selectedSubject]);

  return (
    <div>
      <Container>
        <Box className="breadcrumb">
          <Breadcrumb
            routeSegments={[
              // { name: "Material", path: "/material" },
              { name: "Questions Generator" },
            ]}
          />
        </Box>

        <Stack spacing={3}>
          <SimpleCard title="">
            <ValidatorForm onError={() => null}>
              <Grid container spacing={6}>
                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  <TextField
                    select
                    label="Select a class"
                    variant="outlined"
                    value={selectedClass} // Bind the selected value
                    onChange={handleClassChange} // Handle the change
                  >
                    {classData &&
                      classData.map((item) => (
                        <MenuItem key={item.id} value={item.name}>
                          {item.name}
                        </MenuItem>
                      ))}
                  </TextField>
                  <TextField
                    select
                    label="Select the subject"
                    variant="outlined"
                    value={selectedSubject}
                    onChange={handleSubjectChange}
                  >
                    {Array.isArray(subjectData) &&
                      subjectData.map((item) => (
                        <MenuItem key={item.id} value={item.name}>
                          {item.name}
                        </MenuItem>
                      ))}
                  </TextField>
                </Grid>

                <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>
                  {/*}  <label>Exam Date</label>
                  <TextField
                    fullWidth
                    size="small"
                    type="date"
                    label="Exam Date"
                    variant="outlined"
                    sx={{ mb: 3 }}
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)} // Update the selectedDate when the user selects a date
                  />*/}
                  {/*}    <TextField
                    label="Enter Topic"
                    variant="outlined"
                    value={topic}
                    onChange={handleTopicChange} // Handle topic input
                  />
                  {suggestions.length > 0 && (
                    <ul>
                      {suggestions.map((suggestion, index) => (
                        <li
                          key={index}
                          onClick={() => handleSuggestionClick(suggestion)}
                        >
                          {suggestion}
                        </li>
                      ))}
                    </ul>
                  )}*/}
                  <TextField
                    select
                    label="Select Topic"
                    fullWidth
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                  >
                    {!topics.length && selectedSubject && (
                      <MenuItem disabled>
                        <Typography>Loading topics...</Typography>
                      </MenuItem>
                    )}
                    {topics.map((topic, index) => (
                      <MenuItem key={index} value={topic}>
                        {topic}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    select
                    label="Select Difficulty"
                    variant="outlined"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                  >
                    <MenuItem value="easy">Easy</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="hard">Hard</MenuItem>
                  </TextField>
                  <TextField
                    type="number"
                    label="Number of Questions"
                    variant="outlined"
                    value={numberOfQuestions}
                    onChange={(e) => setNumberOfQuestions(e.target.value)}
                  />
                  {/*} <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TimePicker
                      label="From"
                      value={fromTime}
                      onChange={handleFromTimeChange}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Exam Time (From)"
                          placeholder="hh:mm AM/PM"
                        />
                      )}
                    />
                  </LocalizationProvider>*/}

                  {/*}  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <TimePicker
                      label="To"
                      value={toTime}
                      onChange={handleToTimeChange}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Exam Time (To)"
                          placeholder="hh:mm AM/PM"
                        />
                      )}
                    />
                  </LocalizationProvider>*/}
                  {/*} <TextField
                    type="text"
                    id="standard-basic"
                    value={percent}
                    errorMessages={[
                      "This field is required",
                      "Minimum length is 4",
                      "Maximum length is 9",
                    ]}
                    label="Minimum percentage for passing(%)"
                    placeholder="Minimum percentage for passing(%)"
                    onChange={(e) => setPercent(e.target.value)}
                  />

                  <TextField
                    type="text"
                    multiline // Enable multiline mode
                    rows={4}
                    value={instruction}
                    id="standard-basic"
                    errorMessages={["this field is required"]}
                    onChange={(e) => setInstruction(e.target.value)}
                    label=""
                    placeholder="Instruction"
                  />*/}
                </Grid>
              </Grid>
              {loading && ( // Spinner overlay
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(255, 255, 255, 0.8)",
                    zIndex: 9999,
                  }}
                >
                  <CircularProgress size={60} />
                </Box>
              )}
              <Button onClick={handlePreview}>Preview</Button>
              <Button onClick={handleSave}>Save</Button>
              <TextField
                fullWidth
                multiline
                rows={8}
                variant="outlined"
                label="Question Preview"
                value={previewContent} // Display the preview content
                InputProps={{ readOnly: true }} // Make it read-only
              />
            </ValidatorForm>
          </SimpleCard>
        </Stack>
      </Container>
    </div>
  );
};

export default PQ;

import { Box } from "@mui/system";
import { Breadcrumb } from "../../../../app/components";
import {
  Button,
  Grid,
  styled,
  Typography,
  TextField as MuiTextField,
  Stack,
  MenuItem,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../../../components/MatxLayout/Layout1/SessionContext";
import useFetch from "../../../../hooks/useFetch";

const Container = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
  "& .breadcrumb": {
    marginBottom: "30px",
    [theme.breakpoints.down("sm")]: { marginBottom: "16px" },
  },
}));

const TextField = styled(MuiTextField)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

const PreviewBox = styled(Box)(() => ({
  border: "1px solid #ccc",
  borderRadius: "8px",
  padding: "16px",
  marginTop: "16px",
  backgroundColor: "#f9f9f9",
  color: "black",
  minHeight: "200px",
  whiteSpace: "pre-wrap", // Preserve line breaks
  overflowY: "auto", // Add scroll if content exceeds box size
}));

const Curriculum = () => {
  const { currentSession } = useContext(SessionContext);
  const [loading, setLoading] = useState(false);

  const {
    data: classData,
    loading: classLoading,
    error: classError,
  } = useFetch(`/class/${currentSession._id}`);
  const [topics, setTopics] = useState([]);

  const [subjectData, setSubjectData] = useState([]);

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [topic, setTopic] = useState("");
  const [previewContent, setPreviewContent] = useState("");
  const [previewMode, setPreviewMode] = useState(false);

  const apiUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  useEffect(() => {
    if (selectedClass) {
      fetch(`${apiUrl}/api/get-subject/${selectedClass}/${currentSession._id}`)
        .then((res) => res.json())
        .then((data) => setSubjectData(data))
        .catch((err) => console.error("Error fetching subjects:", err));
    } else {
      setSubjectData([]);
    }
  }, [selectedClass, currentSession]);

  const handleSubmit = (event, preview = false) => {
    event.preventDefault();

    const token = localStorage.getItem("jwtToken");
    if (!token) {
      console.error("Token is missing or expired");
      return;
    }

    const lessonNoteData = {
      topic,
      className: selectedClass,
      subject: selectedSubject,
      session: currentSession._id,
      preview,
    };
    setLoading(true); // Show spinner
    fetch(`${apiUrl}/api/generate-lesson-note`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(lessonNoteData),
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false); // Hide spinner

        console.log("Generated content:", data.lessonNoteContent); // Log the generated content

        if (preview) {
          setPreviewContent(data.lessonNoteContent || "No content generated");
          setPreviewMode(true);
        } else {
          alert("Lesson note saved successfully!");
          navigate("/dashboard/lesson-notes");
        }
      })
      .catch((err) => {
        setLoading(false); // Hide spinner
        console.error("Error generating lesson note:", err);
      });
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
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: "Curriculum Generator" }]} />
      </Box>

      <Stack spacing={3}>
        <Box>
          <form onSubmit={(e) => handleSubmit(e, false)}>
            <Grid container spacing={4}>
              {/* Class Dropdown */}
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  label="Select Class"
                  fullWidth
                  value={selectedClass}
                  onChange={(e) => setSelectedClass(e.target.value)}
                >
                  {classData?.map((item) => (
                    <MenuItem key={item._id} value={item.name}>
                      {item.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* Subject Dropdown */}
              <Grid item xs={12} sm={6}>
                <TextField
                  select
                  label="Select Subject"
                  fullWidth
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                >
                  {subjectData.map((item) => (
                    <MenuItem key={item._id} value={item.name}>
                      {item.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>

              {/* Topic Input */}
              {/* Topic Dropdown */}
              {/* Topic Dropdown */}
              <Grid item xs={12}>
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
            <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={(e) => handleSubmit(e, true)}
              >
                Preview
              </Button>
              <Button variant="contained" color="secondary" type="submit">
                Save
              </Button>
            </Stack>
          </form>
        </Box>

        {/* Preview Content */}
        {previewMode && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h5" gutterBottom>
              Preview
            </Typography>
            <PreviewBox>{previewContent}</PreviewBox>
          </Box>
        )}
      </Stack>
    </Container>
  );
};

export default Curriculum;

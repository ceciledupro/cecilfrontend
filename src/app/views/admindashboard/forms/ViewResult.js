import {
  InputLabel,
  ListItemIcon,
  Menu,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import {
  Fragment,
  React,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Box } from "@mui/system";
import MoreVertIcon from "@mui/icons-material/MoreVert"; // Import the MoreVert icon

import {
  Card,
  Button,
  Grid,
  styled,
  useTheme,
  Icon,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  Paper,
  TablePagination,
  TableRow,
} from "@mui/material";
import RowCards from "../shared/RowCards";

import EditIcon from "@mui/icons-material/Edit"; // Import the Edit icon
import DeleteIcon from "@mui/icons-material/Delete";
import useFetch from "../../../../hooks/useFetch";
import { Link, useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import { SessionContext } from "../../../components/MatxLayout/Layout1/SessionContext";
const ContentBox = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
}));

const Title = styled("span")(() => ({
  fontSize: "1rem",
  fontWeight: "500",
  marginRight: ".5rem",
  textTransform: "capitalize",
}));

const SubTitle = styled("span")(({ theme }) => ({
  fontSize: "0.875rem",
  color: theme.palette.text.secondary,
}));

const H4 = styled("h4")(({ theme }) => ({
  fontSize: "1rem",
  fontWeight: "500",
  marginBottom: "16px",
  textTransform: "capitalize",
  color: theme.palette.text.secondary,
}));
const StyledTable = styled(Table)(() => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const ViewResult = () => {
  const [scores, setScores] = useState([]);
  const [examData, setExamData] = useState(null);

  const { id } = useParams();
  const examId = id; // Assuming the entire parameter is the examId

  console.log("examId:", examId);

  const { data, loading, error } = useFetch(`/exams/all-scores/${examId}`);
  console.log("Exam data:", data);
  const componentRef = useRef();

  const { currentSession } = useContext(SessionContext);
  const { palette } = useTheme();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [action, setAction] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElMap, setAnchorElMap] = useState({});
  const apiUrl = process.env.REACT_APP_API_URL;
  useEffect(() => {
    if (data) {
      setScores(data);
    }
  }, [data]);
  useEffect(() => {
    // Fetch exam details separately
    async function fetchExamData() {
      try {
        const response = await fetch(
          `${apiUrl}/api/get-exam-by-id/${id}/${currentSession._id}`
        );
        const data = await response.json();
        setExamData(data);
        console.log("this is data", data);
      } catch (error) {
        // Handle the error here
      }
    }

    fetchExamData();
  }, [id]);

  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  // Function to handle opening the context menu for a specific exam
  const handleOpenMenu = (event, examId) => {
    setAnchorElMap((prev) => ({
      ...prev,
      [examId]: event.currentTarget,
    }));
  };

  // Function to handle closing the context menu for a specific exam
  const handleCloseMenu = (examId) => {
    setAnchorElMap((prev) => ({
      ...prev,
      [examId]: null,
    }));
  };
  const handleAction = (value) => {
    setAction(value);
    handleCloseMenu();
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <Fragment>
      <ContentBox className="analytics">
        {/* Print Button */}
        <Box className="breadcrumb" sx={{ mb: 2 }}>
          <button
            onClick={handlePrint}
            style={{
              backgroundColor: "white",
              border: "1px solid black",
              padding: "8px",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            Print this out!
          </button>
        </Box>

        {/* Printable Content */}
        <div ref={componentRef}>
          <TableContainer component={Paper}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <b>Exam Title</b>
                  </TableCell>
                  <TableCell>
                    {examData ? examData.title : "Loading..."}
                  </TableCell>
                  <TableCell>
                    <b>Date</b>
                  </TableCell>
                  <TableCell>
                    {examData ? formatDate(examData.date) : "Loading..."}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>Class</b>
                  </TableCell>
                  <TableCell>
                    {examData ? examData.className : "Loading..."}
                  </TableCell>
                  <TableCell>
                    <b>Time</b>
                  </TableCell>
                  <TableCell>
                    {examData
                      ? `${examData.fromTime} - ${examData.toTime}`
                      : "Loading..."}
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>Exam Instruction</b>
                  </TableCell>
                  <TableCell>
                    {examData ? examData.instruction : "Loading..."}
                  </TableCell>
                  <TableCell>
                    <b>Total Mark</b>
                  </TableCell>
                  <TableCell>
                    {examData ? examData.totalMark : "Loading..."}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>

          <Box width="100%" overflow="auto">
            <StyledTable>
              <TableHead>
                <TableRow>
                  <TableCell align="left">Student Name</TableCell>
                  <TableCell align="left">Mark Obtained</TableCell>
                  <TableCell align="left">Result</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {scores.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell align="center">{item.studentName}</TableCell>
                    <TableCell align="center">{item.score}</TableCell>
                    <TableCell align="left">Your Result Here</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </StyledTable>

            <TablePagination
              sx={{ px: 2 }}
              page={page}
              component="div"
              rowsPerPage={rowsPerPage}
              count={scores.length}
              onPageChange={handleChangePage}
              rowsPerPageOptions={[5, 10, 25]}
              onRowsPerPageChange={handleChangeRowsPerPage}
              nextIconButtonProps={{ "aria-label": "Next Page" }}
              backIconButtonProps={{ "aria-label": "Previous Page" }}
            />
          </Box>
        </div>
      </ContentBox>
    </Fragment>
  );
};

export default ViewResult;

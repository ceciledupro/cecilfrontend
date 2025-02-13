import React, { Fragment, useEffect, useState } from "react";
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
import useFetch from "../../../../hooks/useFetch";
import axios from "axios";
import useAuth from "../../../../app/hooks/useAuth";

const ContentBox = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
}));

const ReportCard = () => {
  const [studentData, setStudentData] = useState(null);
  const { id } = useParams();

  const [scores, setScores] = useState([]);

  const { data, loading, error } = useFetch(`/students/${id}`);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (data && data.studentName && data.classname) {
      setStudentData(data);
    }
  }, [data]);

  useEffect(() => {
    const fetchExamScore = async () => {
      try {
        const token = localStorage.getItem("jwtToken");
        const headers = {
          Authorization: `Bearer ${token}`,
        };

        const response = await axios.get(
          `${apiUrl}/api/students/all-scores/${id}`, // Use user._id instead of user.id
          {
            headers,
          }
        );
        setScores(response.data);
      } catch (error) {
        console.error("Error fetching exam score:", error);
      }
    };

    fetchExamScore();
  }, [id]);

  return (
    <Fragment>
      <ContentBox className="analytics">
        <Box width="100%" overflow="auto">
          <center>
            <img
              src="https://hlhs.portalreport.org/uploads/logo.png"
              style={{ maxHeight: "60px" }}
              alt="HLHS Logo"
            />
            <br />
            <h3 style={{ fontWeight: 100 }}>HEAVENLY LOVE HIGH SCHOOL</h3>
            <p>
              14, Babs Ladipo Street, Agbe Road, Abule Egba, Lagos State.
              <br />
              +234 8028724575, +234 8165051826
              <br />
              info@hlhs.portalreport.org
            </p>
            <h3 style={{ marginBottom: "30px" }}>
              STUDENT CUMULATIVE REPORT CARD
            </h3>
          </center>
          <div className="row" style={{ marginTop: "30px" }}>
            <div className="col-md-1">
              <img
                src="https://hlhs.portalreport.org/uploads/user.jpg"
                style={{ height: "150px" }}
                alt="Student"
              />
            </div>

            <div className="col-md-11">
              <div className="row">
                <div className="col-md-4">
                  {/* Student details */}
                  <div className="form-group" style={{ marginLeft: "50px" }}>
                    <label>Student Name</label>
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
                      value={studentData?.studentName || ""}
                    />
                  </div>
                  <div className="form-group" style={{ marginLeft: "50px" }}>
                    <label>Class</label>
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
                      value={studentData?.classname || ""}
                    />
                  </div>
                  <div className="form-group" style={{ marginLeft: "50px" }}>
                    <label>Class Teacher</label>
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
                      value={studentData?.classname || ""}
                    />
                  </div>

                  {/* Add other student details in a similar way */}
                </div>
                <div className="col-md-4">
                  {/* Student details */}
                  <div className="form-group" style={{ marginLeft: "50px" }}>
                    <label>Student Name</label>
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
                      value={studentData?.studentName || ""}
                    />
                  </div>
                  <div className="form-group" style={{ marginLeft: "50px" }}>
                    <label>Class</label>
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
                      value={studentData?.classname || ""}
                    />
                  </div>
                  <div className="form-group" style={{ marginLeft: "50px" }}>
                    <label>Class Teacher</label>
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
                      value={studentData?.classname || ""}
                    />
                  </div>

                  {/* Add other student details in a similar way */}
                </div>
                <div className="col-md-4">
                  {/* Student details */}
                  <div className="form-group" style={{ marginLeft: "50px" }}>
                    <label>Student Name</label>
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
                      value={studentData?.studentName || ""}
                    />
                  </div>
                  <div className="form-group" style={{ marginLeft: "50px" }}>
                    <label>Class</label>
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
                      value={studentData?.classname || ""}
                    />
                  </div>
                  <div className="form-group" style={{ marginLeft: "50px" }}>
                    <label>Class Teacher</label>
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
                      value={studentData?.classname || ""}
                    />
                  </div>

                  {/* Add other student details in a similar way */}
                </div>

                {/* Add the other columns similarly */}
              </div>
            </div>
          </div>

          <TableContainer component={Paper} style={{ marginTop: "30px" }}>
            <Table style={{ minWidth: 650 }}>
              <TableHead>
                <TableRow>
                  <TableCell>Subject</TableCell>
                  <TableCell align="center">First Term Marks</TableCell>
                  <TableCell align="center">Second Term Marks</TableCell>
                  <TableCell align="center">Third Term Marks</TableCell>
                  <TableCell align="center">Total Marks</TableCell>
                  <TableCell align="center">Average Marks</TableCell>
                  <TableCell align="center">Class Position</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {/* Iterate through your subjects and display the data */}
                {scores.length > 0 ? (
                  scores.map((item) => (
                    <TableRow>
                      <TableCell>{item.subject}</TableCell>
                      <TableCell align="center">{item.score}</TableCell>
                      <TableCell align="center">0</TableCell>
                      <TableCell align="center">0</TableCell>
                      <TableCell align="center">0</TableCell>
                      <TableCell align="center">0</TableCell>
                      <TableCell align="center">1</TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3}>No scores available</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>

          {/* Additional information section */}
          <div style={{ marginTop: "30px" }}>
            {/* ... Add your additional information here ... */}
          </div>
        </Box>
      </ContentBox>
    </Fragment>
  );
};

export default ReportCard;

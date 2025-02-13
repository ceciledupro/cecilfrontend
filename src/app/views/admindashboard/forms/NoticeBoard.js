import { Box, Container, styled } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import React, { useContext, useState } from "react";
import { Fragment } from "react";
import axios from "axios";
import { Breadcrumb } from "../../../../app/components";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { SessionContext } from "../../../components/MatxLayout/Layout1/SessionContext";
const ContentBox = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
}));
export default function NoticeBoard({ updateTableData }) {
  const { currentSession } = useContext(SessionContext); // Get the active session
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  // Using separate state for form data
  const [formData, setFormData] = useState({
    notice: "",
    posted_by: "",
  });

  const apiUrl = process.env.REACT_APP_API_URL;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form data:", formData); // Add this log

    try {
      console.log("Inside try block...");

      const response = await axios.post(`${apiUrl}/api/create-notice`, {
        ...formData,
        sessionId: currentSession._id,
        date: new Date(),
      });

      console.log("Notice created:", response.data);
      updateTableData(response.data);
      setFormData({
        notice: "",
        posted_by: "",
      });
      handleClose();
    } catch (error) {
      console.error("Error creating notice:", error);

      if (error.response) {
        console.error("Server responded with:", error.response.data);
      }
    }
  };

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <Fragment>
      <ContentBox className="analytics">
        <Container>
          <Box className="breadcrumb">
            <Breadcrumb routeSegments={[{ name: "Notice Board" }]} />
          </Box>
          <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            Add New Notice
          </Button>
          <Box>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="form-dialog-title"
            >
              <DialogTitle id="form-dialog-title"> Add Notice</DialogTitle>
              <DialogContent>
                <label>Notice</label>
                <TextField
                  autoFocus
                  margin="dense"
                  name="notice"
                  value={formData.notice}
                  placeholder="Enter a notice"
                  type="text"
                  fullWidth
                  onChange={handleChange}
                />
                <label>Posted By</label>
                <TextField
                  autoFocus
                  margin="dense"
                  type="text"
                  name="posted_by"
                  placeholder="Your name"
                  value={formData.posted_by}
                  fullWidth
                  onChange={handleChange}
                />
              </DialogContent>
              <DialogActions>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                <Button onClick={handleSubmit} color="primary">
                  Add Notice
                </Button>
              </DialogActions>
            </Dialog>
            <ToastContainer />
          </Box>
        </Container>
      </ContentBox>
    </Fragment>
  );
}

import { Box, MenuItem } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { Navigate, useNavigate } from "react-router-dom";
import React, { useContext, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { SessionContext } from "../../../components/MatxLayout/Layout1/SessionContext";

const initialState = {
  name: "",
  date: "",
  comment: "",
};

export default function Examform() {
  const { currentSession } = useContext(SessionContext); // Get the active session
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const { name, comment, date } = formData;

  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Retrieve the current session ID (this should be set earlier in your code)
    const currentSessionId = currentSession._id; // Ensure this variable holds the current session ID

    // Include the current session ID in the formData payload
    const payload = {
      ...formData, // Include other form fields
      session: currentSessionId, // Add session to the payload
    };

    try {
      // Fetch the authentication token from local storage
      const token = localStorage.getItem("jwtToken");

      // Include the token in the request headers
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      // Make an API call to create an exam
      const response = await axios.post(`${apiUrl}/api/offlineexam`, payload, {
        headers, // Include headers in the request
      });

      if (response.status === 200) {
        // Handle successful exam creation
        toast.success("Exam successfully created");
        navigate("/dashboard/examlist"); // Redirect to the exam list page
      } else {
        toast.error("Failed to create exam");
      }
    } catch (err) {
      // Handle errors
      console.error("Error creating exam:", err);
      toast.error("Unable to create exam");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <Box>
      <ToastContainer />
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add Exam
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title"> Add Exam</DialogTitle>
        <DialogContent>
          ( Note: Use Capital Letter to create EXAM: e.g FIRST TERM, SECOND
          TERM, THIRD TERM)
          <br></br>
          <br></br>
          <br></br>
          <label>Exam Name</label>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            value={name}
            placeholder="Exam Name"
            type="text"
            onChange={handleChange}
            fullWidth
          />
          <label>Exam Date</label>
          <TextField
            autoFocus
            margin="dense"
            name="date"
            value={date}
            placeholder="Exam Date"
            type="Date"
            onChange={handleChange}
            fullWidth
          />
          <label>Comment</label>
          <TextField
            autoFocus
            margin="dense"
            name="comment"
            value={comment}
            placeholder="Comment"
            type="text"
            onChange={handleChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add Exam
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </Box>
  );
}

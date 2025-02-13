import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Navigate, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import React from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import axios from "axios";
import { useEffect, useState } from "react";
const initialState = {
  subject_name: "",
  teachers_name: "",
  classname: "",
};
export default function FormDialog6() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const [state, setState] = useState({ date: new Date() });
  const [formData, setformData] = useState(initialState);
  const { teachers_name, subject_name, classname } = formData;
  const [classs, setClasss] = useState();
  const [error, setError] = useState();
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      teachers_name,
      subject_name,
      classname,
    };
    try {
      await axios.post(`${apiUrl}/api/userrs/register`, formData);

      navigate("/dashboard");
    } catch (err) {}
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setformData({ ...formData, [name]: value });
  };

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <Box>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add new Subject
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title"> Add new subject</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            value={subject_name}
            placeholder="Subject name"
            type="text"
            onChange={handleChange}
            fullWidth
          />
          <TextField
            autoFocus
            margin="dense"
            name="name"
            value={teachers_name}
            placeholder="teachers name"
            type="text"
            onChange={handleChange}
            fullWidth
          />
          <TextField
            type="text"
            name="classname"
            autoFocus
            margin="dense"
            onChange={handleChange}
            value={classname}
            placeholder="Enter  class"
            validators={["required"]}
            errorMessages={["this field is required"]}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Add Subject
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

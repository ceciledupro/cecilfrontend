import { Box, MenuItem } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { Navigate, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import axios from "axios";
import useFetch from "hooks/useFetch";

const initialState = {
  name: "",
  teacher: "",
  classname: "",
};

export default function FormDialog4() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const { name, teacher, classname } = formData;
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Fetch the authentication token from wherever you've stored it (e.g., local storage)
      const token = localStorage.getItem("jwtToken");

      // Include the token in the request headers
      const headers = {
        Authorization: `Bearer ${token}`,
      };

      // Make an API call to create a subject
      await axios.post(`${apiUrl}/api/create-subject`, formData, {
        headers, // Include the headers in the request
      });

      // Handle successful subject creation
      navigate("/dashboard/ss1-subject");
    } catch (err) {
      // Handle errors
    }
  };

  const handleSelect = (event) => {
    // console.log("submitted");
    // console.log(event);
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

  const {
    data: teachersData,
    loading: teachersLoading,
    error: teachersError,
  } = useFetch("/get-teachers");

  // Fetch class data
  const {
    data: classData,
    loading: classLoading,
    error: classError,
  } = useFetch("/class");

  // const handleTeacherChange = (event) => {
  //   setSelectedTeacher(event.target.value);
  //   setFormData({ ...formData, teacher: event.target.value });
  // };

  // const handleClassChange = (event) => {
  //   setSelectedClass(event.target.value);
  //   setFormData({ ...formData, classname: event.target.value });
  // };

  // ... (other code)

  const handleTeacherChange = (event) => {
    const selectedTeacherId = event.target.value;
    setSelectedTeacher(selectedTeacherId);

    // Assuming you have an array of teachersData containing teacher objects
    // and you want to find the teacher's username based on their ID
    const selectedTeacher = teachersData.find(
      (teacher) => teacher._id === selectedTeacherId
    );

    if (selectedTeacher) {
      const teacherUsername = selectedTeacher.username;
      setFormData({ ...formData, teacher: teacherUsername }); // Store the teacher username
    }
  };

  const handleClassChange = (event) => {
    const selectedClassName = event.target.value;
    setSelectedClass(selectedClassName);
    setFormData({ ...formData, classname: selectedClassName }); // Store the class name
  };

  // ... (other code)

  // Fetch data for teachers and classes using useFetch

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
            value={name}
            placeholder="Subject Name"
            type="text"
            onChange={handleChange}
            fullWidth
          />

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
                <MenuItem key={item._id} value={item.name}>
                  {" "}
                  {/* Use item.name as the value */}
                  {item.name}
                </MenuItem>
              ))}
          </TextField>
          <TextField
            select
            label="Select Teacher"
            variant="outlined"
            value={selectedTeacher}
            onChange={handleTeacherChange}
            fullWidth
          >
            {teachersData &&
              teachersData.map(
                (item) =>
                  item.role === "teacher" && (
                    <MenuItem key={item._id} value={item._id}>
                      {item.username}
                    </MenuItem>
                  )
              )}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add Subject
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

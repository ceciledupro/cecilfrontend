import { Box, MenuItem } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import React, { useContext, useState } from "react";
import useFetch from "../../../../hooks/useFetch";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { SessionContext } from "../../../components/MatxLayout/Layout1/SessionContext";
const initialState = {
  name: "",
  teacher: "",
};

export default function FormClass({ updateTableData }) {
  const { currentSession } = useContext(SessionContext);
  const [open, setOpen] = React.useState(false);
  const {
    data: teachersData,
    loading: teachersLoading,
    error: teachersError,
  } = useFetch(`/get-teachers/${currentSession._id}`);

  const navigate = useNavigate();
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [formData, setFormData] = useState(initialState);
  const { name, teacher } = formData;
  const apiUrl = process.env.REACT_APP_API_URL;

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   const formData = {
  //     name,
  //     teacher,
  //   };
  //   try {
  //     const response = await axios.post(`${apiUrl}/api/class`, formData);

  //     if (response.status === 200) {
  //       // Class successfully created

  //       updateTableData(response.data);
  //       toast.success("Class saved successfully!");
  //       handleClose(); // Close the dialog after successful creation

  //       // Manually trigger data refetch or navigation logic
  //       // Example: reFetch();

  //       // Close the dialog
  //       handleClose();
  //     } else {
  //       // Handle other status codes if necessary
  //       toast.error("Failed to create class");
  //     }
  //   } catch (err) {
  //     console.error("Error creating class:", err);
  //     toast.error("Unable to create class");
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add the current session to the formData payload
    const payload = {
      name,
      teacher,
      session: currentSession._id, // Add session to the payload
    };

    try {
      const response = await axios.post(`${apiUrl}/api/class`, payload);

      if (response.status === 200) {
        // Class successfully created
        updateTableData(response.data);
        toast.success("Class saved successfully!");
        handleClose(); // Close the dialog after successful creation

        // Manually trigger data refetch or navigation logic
        // Example: reFetch();

        // Close the dialog
        handleClose();
      } else {
        // Handle other status codes if necessary
        toast.error("Failed to create class");
      }
    } catch (err) {
      console.error("Error creating class:", err);
      toast.error("Unable to create class");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  function handleClickOpen() {
    setOpen(true);
  }
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
  function handleClose() {
    setOpen(false);
  }

  return (
    <Box>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add new Class
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title"> Add new Class </DialogTitle>
        <DialogTitle id="form-dialog-title" style={{ fontSize: "14px" }}>
          {" "}
          ( Note: Use Capital Letter to create class and no space: e.g JS1,JS2,
          S.S.1.A, S.S.3.C)
        </DialogTitle>

        <DialogContent>
          <label>Class Name</label>
          <TextField
            autoFocus
            margin="dense"
            name="name"
            value={name}
            placeholder="Enter class name"
            type="text"
            fullWidth
            onChange={handleChange}
          />
          <label>Class Teacher</label>
          <TextField
            select
            label="Select Teacher"
            variant="outlined"
            value={selectedTeacher}
            onChange={handleTeacherChange}
            fullWidth
          >
            {teachersData && teachersData.length > 0 ? (
              teachersData.map((item) => {
                console.log("Teacher item:", item); // This confirms each teacher is processed
                return (
                  <MenuItem key={item._id} value={item._id}>
                    {item.username}
                  </MenuItem>
                );
              })
            ) : (
              <MenuItem disabled>No teachers available</MenuItem>
            )}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button variant="outlined" color="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} color="primary">
            Add Class
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </Box>
  );
}

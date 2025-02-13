// import React, { useState, useEffect } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   TextField,
// } from "@mui/material";
// const EditExam = ({ open, onClose, examId, onSave }) => {
//   const [updatedData, setUpdatedData] = useState({ ...subject });

//   const [newPassword, setNewPassword] = useState("");

//   const [formData, setFormData] = useState({
//     title: "",
//     className: "",
//     subject: "",
//     date: "",
//     fromTime: "", // Make sure to set a default value here if needed
//     toTime: "",
//   });
//   const apiUrl = process.env.REACT_APP_API_URL.trim();

//   useEffect(() => {
//     const fetchStudentById = async () => {
//       try {
//         if (examId) {
//           // Assuming you have the JWT token stored in localStorage
//           const token = localStorage.getItem("jwtToken");

//           const response = await fetch(`${apiUrl}/api/get-exam/${examId}`, {
//             headers: {
//               Authorization: `Bearer ${token}`, // Include your authentication token
//             },
//           });

//           if (response.ok) {
//             const data = await response.json();
//             console.log("Fetched exam data:", data);

//             // Set the state with the fetched data
//             setFormData({
//               title: data.title || "",
//               className: data.className || "",
//               subject: data.subject || "",
//               date: data.date || "",
//               fromTime: data.fromTime || "", // Make sure to set a default value here if needed
//               toTime: data.toTime || "",
//             });
//           } else {
//             console.error("Error fetching exam data. Status:", response.status);
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching student data:", error);
//       }
//     };

//     // Only fetch data if the studentId prop has changed
//     if (open && examId !== null && examId !== undefined) {
//       console.log("Fetching data for examId:", examId);
//       fetchStudentById();
//     }
//   }, [open, examId]);
//   const handleChange = (e) => {
//     const { name, value } = e.target;

//     if (name === "password") {
//       // Update the existing password
//       setFormData({ ...formData, [name]: value });
//     } else if (name === "newPassword") {
//       // Update the new password
//       setNewPassword(value);
//     } else {
//       // Update other form fields
//       setFormData({ ...formData, [name]: value });
//     }
//   };

//   const handleSave = () => {
//     onSave(formData);
//     onClose();
//   };
//   const handleSave = () => {
//     onSave(updatedData);
//   };
//   return (
//     <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
//       <DialogTitle id="form-dialog-title">Edit Exam</DialogTitle>
//       <DialogContent>
//         <label>Exam Title</label>
//         <TextField
//           autoFocus
//           margin="dense"
//           name="studentName"
//           value={formData.title}
//           placeholder="Student Name"
//           type="text"
//           onChange={handleChange}
//           fullWidth
//         />
//         <label>ClassName</label>
//         <TextField
//           autoFocus
//           margin="dense"
//           name="address"
//           value={formData.className}
//           placeholder="Address"
//           type="text"
//           onChange={handleChange}
//           fullWidth
//         />
//         <label>Subject</label>
//         <TextField
//           type="text"
//           name="subject"
//           autoFocus
//           margin="dense"
//           onChange={handleChange}
//           value={formData.subject}
//           placeholder="Subject"
//           fullWidth
//         />
//         <label>Date</label>
//         <TextField
//           type="date"
//           name="date"
//           autoFocus
//           margin="dense"
//           onChange={handleChange}
//           value={formData.date}
//           placeholder="Date"
//           fullWidth
//         />
//         <label>From Time</label>
//         <TextField
//           type="time"
//           name="fromTime"
//           autoFocus
//           margin="dense"
//           onChange={handleChange}
//           value={formData.fromTime}
//           placeholder="From Time"
//           fullWidth
//         />
//         <label>To time</label>
//         <TextField
//           type="time"
//           name="toTime"
//           autoFocus
//           margin="dense"
//           onChange={handleChange}
//           value={formData.toTime}
//           placeholder="To Time"
//           fullWidth
//         />
//       </DialogContent>
//       <DialogActions>
//         <Button variant="outlined" color="secondary" onClick={onClose}>
//           Cancel
//         </Button>
//         <Button onClick={handleSave} color="primary">
//           Save Changes
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default EditExam;

import React, { useState, useEffect, useContext } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { SessionContext } from "../../../components/MatxLayout/Layout1/SessionContext";

const EditExam = ({ open, onClose, examId, onSave }) => {
  const [formData, setFormData] = useState({
    title: "",
    className: "",
    subject: "",
    date: "",
    fromTime: "",
    toTime: "",
  });
  const apiUrl = process.env.REACT_APP_API_URL;
  const { currentSession } = useContext(SessionContext);
  useEffect(() => {
    const fetchExamById = async () => {
      const sessionId = currentSession?._id;
      try {
        if (examId) {
          const token = localStorage.getItem("jwtToken");
          const response = await fetch(
            `${apiUrl}/api/get-exam-by-id/${examId}/${sessionId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (response.ok) {
            const data = await response.json();
            console.log("Fetched exam data:", data);
            setFormData({
              title: data.title || "",
              className: data.className || "",
              subject: data.subject || "",
              date: data.date || "",
              // fromTime: data.fromTime || "",
              // toTime: data.toTime || "",
              fromTime: formatTime(data.fromTime) || "", // Format time
              toTime: formatTime(data.toTime) || "",
            });
          } else {
            console.error("Error fetching exam data. Status:", response.status);
          }
        }
      } catch (error) {
        console.error("Error fetching exam data:", error);
      }
    };

    if (open && examId) {
      fetchExamById();
    }
  }, [open, examId]);
  const formatTime = (time) => {
    const [hours, minutes] = time.split(":");
    const formattedHours = parseInt(hours) % 12 || 12;
    const amPm = parseInt(hours) >= 12 ? "PM" : "AM";
    return `${formattedHours}:${minutes} ${amPm}`;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit Exam</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="title"
          value={formData.title}
          label="Exam Title"
          type="text"
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          name="className"
          value={formData.className}
          label="Class Name"
          type="text"
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          name="subject"
          value={formData.subject}
          label="Subject"
          type="text"
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          name="date"
          value={formData.date}
          label="Date"
          type="date"
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          name="fromTime"
          value={formData.fromTime}
          label="From Time"
          type="time"
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          name="toTime"
          value={formData.toTime}
          label="To Time"
          type="time"
          onChange={handleChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditExam;

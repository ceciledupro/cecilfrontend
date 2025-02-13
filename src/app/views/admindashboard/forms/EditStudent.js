// import React, { useState, useEffect } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   TextField,
// } from "@mui/material";
// const EditStudent = ({ open, onClose, studentId, onSave }) => {
//   const [newPassword, setNewPassword] = useState("");

//   const [formData, setFormData] = useState({
//     studentName: "",
//     address: "",
//     parentsName: "",
//     username: "",
//     phone: "", // Make sure to set a default value here if needed
//     AdmNo: "",
//     email: "",
//     password: "",
//   });
//   const apiUrl = process.env.REACT_APP_API_URL;

//   useEffect(() => {
//     const fetchStudentById = async () => {
//       try {
//         if (studentId) {
//           // Assuming you have the JWT token stored in localStorage
//           const token = localStorage.getItem("jwtToken");

//           const response = await fetch(`${apiUrl}/api/students/${studentId}`, {
//             headers: {
//               Authorization: `Bearer ${token}`, // Include your authentication token
//             },
//           });

//           if (response.ok) {
//             const data = await response.json();
//             console.log("Fetched student data:", data);

//             // Set the state with the fetched data
//             setFormData({
//               studentName: data.studentName || "",
//               address: data.address || "",
//               parentsName: data.parentsName || "",
//               username: data.username || "",
//               phone: data.phone || "", // Make sure to set a default value here if needed
//               AdmNo: data.AdmNo || "",
//               email: data.email || "",
//               password: data.password || "",
//             });
//           } else {
//             console.error(
//               "Error fetching student data. Status:",
//               response.status
//             );
//           }
//         }
//       } catch (error) {
//         console.error("Error fetching student data:", error);
//       }
//     };

//     // Only fetch data if the studentId prop has changed
//     if (open && studentId !== null && studentId !== undefined) {
//       console.log("Fetching data for studentId:", studentId);
//       fetchStudentById();
//     }
//   }, [open, studentId]);
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

//   return (
//     <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
//       <DialogTitle id="form-dialog-title">Edit Student</DialogTitle>
//       <DialogContent>
//         <label>Student Name</label>
//         <TextField
//           margin="dense"
//           name="studentName"
//           value={formData?.studentName}
//           placeholder="Student Name"
//           type="text"
//           onChange={handleChange}
//           fullWidth
//         />
//         <label>Address</label>
//         <TextField
//           autoFocus
//           margin="dense"
//           name="address"
//           value={formData.address}
//           placeholder="Address"
//           type="text"
//           onChange={handleChange}
//           fullWidth
//         />
//         <label>Parents Name</label>
//         <TextField
//           type="text"
//           name="parentsName"
//           autoFocus
//           margin="dense"
//           onChange={handleChange}
//           value={formData.parentsName}
//           placeholder="Enter Parents Name"
//           fullWidth
//         />
//         <label>Username</label>
//         <TextField
//           type="text"
//           name="username"
//           autoFocus
//           margin="dense"
//           onChange={handleChange}
//           value={formData.username}
//           placeholder="Username"
//           fullWidth
//         />
//         <label>Phone Number</label>
//         <TextField
//           type="phone"
//           name="phone"
//           autoFocus
//           margin="dense"
//           onChange={handleChange}
//           value={formData.phone}
//           placeholder="Phone"
//           fullWidth
//         />
//         <label>Admission No</label>
//         <TextField
//           type="text"
//           name="AdmNo"
//           autoFocus
//           margin="dense"
//           onChange={handleChange}
//           value={formData.AdmNo}
//           placeholder="Admission No"
//           fullWidth
//         />
//         <label>Email Address</label>
//         <TextField
//           type="email"
//           name="email"
//           autoFocus
//           margin="dense"
//           onChange={handleChange}
//           value={formData.email}
//           placeholder="Email"
//           fullWidth
//         />
//         <label>New Password</label>
//         <TextField
//           type="password"
//           name="newPassword"
//           autoFocus
//           margin="dense"
//           onChange={handleChange}
//           value={newPassword}
//           placeholder="New Password"
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

// export default EditStudent;import React, { useState, useEffect } from "react";
import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

const EditStudent = ({ open, onClose, studentId, onSave }) => {
  const [newPassword, setNewPassword] = useState("");
  const [formData, setFormData] = useState({
    studentName: "",
    address: "",
    parentsName: "",
    username: "",
    phone: "",
    AdmNo: "",
    email: "",
    password: "",
  });

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchStudentById = async () => {
      if (studentId) {
        try {
          const token = localStorage.getItem("jwtToken");
          const response = await fetch(`${apiUrl}/api/students/${studentId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            console.log("Fetched student data:", data); // Log the response

            // Access the properties from the student object
            setFormData({
              studentName: data.student.studentName || "",
              address: data.student.address || "",
              parentsName: data.student.parentsName || "",
              username: data.student.username || "",
              phone: data.student.phone || "",
              AdmNo: data.student.AdmNo || "",
              email: data.student.email || "",
              password: "", // Avoid exposing passwords
            });
          } else {
            console.error("Error fetching student data:", response.status);
          }
        } catch (error) {
          console.error("Error fetching student data:", error);
        }
      }
    };

    if (open && studentId) {
      console.log("Fetching data for studentId:", studentId);
      fetchStudentById();
    }
  }, [open, studentId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "newPassword") {
      setNewPassword(value);
      console.log("Updated New Password:", value);
    } else {
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    }
  };

  const handleSave = () => {
    // Include newPassword only if it's set
    const updatedData = {
      ...formData,
      password: newPassword || formData.password, // Use new password if provided
    };
    onSave(updatedData);
    onClose();
  };

  // const handleSave = () => {
  //   onSave(formData);
  //   onClose();
  // };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit Student</DialogTitle>
      <DialogContent>
        <label>Student Name</label>
        <TextField
          autoFocus
          margin="dense"
          name="studentName"
          value={formData.studentName}
          placeholder="Student Name"
          type="text"
          onChange={handleChange}
          fullWidth
        />
        <label>Address</label>
        <TextField
          margin="dense"
          name="address"
          value={formData.address}
          placeholder="Address"
          type="text"
          onChange={handleChange}
          fullWidth
        />
        <label>Parents Name</label>
        <TextField
          type="text"
          name="parentsName"
          margin="dense"
          onChange={handleChange}
          value={formData.parentsName}
          placeholder="Enter Parents Name"
          fullWidth
        />
        <label>Username</label>
        <TextField
          type="text"
          name="username"
          margin="dense"
          onChange={handleChange}
          value={formData.username}
          placeholder="Username"
          fullWidth
        />
        <label>Phone Number</label>
        <TextField
          type="phone"
          name="phone"
          margin="dense"
          onChange={handleChange}
          value={formData.phone}
          placeholder="Phone"
          fullWidth
        />
        <label>Admission No</label>
        <TextField
          type="text"
          name="AdmNo"
          margin="dense"
          onChange={handleChange}
          value={formData.AdmNo}
          placeholder="Admission No"
          fullWidth
        />
        <label>Email Address</label>
        <TextField
          type="email"
          name="email"
          margin="dense"
          onChange={handleChange}
          value={formData.email}
          placeholder="Email"
          fullWidth
        />
        <label>New Password</label>
        <TextField
          type="password"
          name="newPassword"
          margin="dense"
          onChange={handleChange}
          value={newPassword}
          placeholder="New Password"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditStudent;

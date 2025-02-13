import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

const EditAdmin = ({ open, onClose, adminId, onSave }) => {
  const [newPassword, setNewPassword] = useState("");
  const [formData, setFormData] = useState({
    username: "",
    phone: "",
    email: "",
    address: "",
    password: "", // Set an initial value (e.g., an empty string)
  });
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchAdminById = async () => {
      try {
        if (adminId) {
          // Assuming you have the JWT token stored in localStorage
          const token = localStorage.getItem("jwtToken");

          const response = await fetch(`${apiUrl}/api/get-admin/${adminId}`, {
            headers: {
              Authorization: `Bearer ${token}`, // Include your authentication token
            },
          });

          if (response.ok) {
            const data = await response.json();
            console.log("Fetched admin data:", data);

            // Set the state with the fetched data
            setFormData({
              username: data.admin.username || "",
              phone: data.admin.phone || "",
              email: data.admin.email || "",
              address: data.admin.address || "",
              newPassword: "", // Reset new password field
            });
          } else {
            console.error(
              "Error fetching admin data. Status:",
              response.status
            );
          }
        }
      } catch (error) {
        console.error("Error fetching admin data:", error);
      }
    };

    // Only fetch data if the adminId prop has changed
    if (open && adminId !== null && adminId !== undefined) {
      console.log("Fetching data for adminId:", adminId);
      fetchAdminById();
    }
  }, [open, adminId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "password") {
      // Update the existing password
      setFormData({ ...formData, [name]: value });
    } else if (name === "newPassword") {
      // Update the new password
      setNewPassword(value);
    } else {
      // Update other form fields
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSave = () => {
    onSave({ ...formData, newPassword });
    onClose();
  };
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit Admin</DialogTitle>
      <DialogContent>
        <label>Username</label>
        <TextField
          type="text"
          name="username"
          autoFocus
          margin="dense"
          onChange={handleChange}
          value={formData.username}
          placeholder="Username"
          fullWidth
        />
        <label>Email Address</label>
        <TextField
          type="email"
          name="email"
          autoFocus
          margin="dense"
          onChange={handleChange}
          value={formData.email}
          placeholder="Email"
          fullWidth
        />
        <label>Address</label>
        <TextField
          type="text"
          name="address"
          autoFocus
          margin="dense"
          onChange={handleChange}
          value={formData.address}
          placeholder="Address"
          fullWidth
        />
        {/* Add similar TextField components for other fields */}
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

        {/* Add similar TextField components for other fields */}

        <label>New Password</label>
        <TextField
          type="password"
          name="newPassword"
          margin="dense"
          onChange={(e) => setNewPassword(e.target.value)}
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

export default EditAdmin;

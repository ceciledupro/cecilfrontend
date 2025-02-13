import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

const EditGradeDialog = ({ open, onClose, grade, gradeId, onSave }) => {
  const [formData, setFormData] = useState({
    grade_name: "",
    gradepoint: "",
    markfrom: "",
    markupto: "",
    comment: "",
  });
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchGradeById = async () => {
      try {
        if (gradeId) {
          const response = await fetch(`${apiUrl}/api/grade/find/${gradeId}`);
          const data = await response.json();
          setFormData(data);
        }
      } catch (error) {
        console.error("Error fetching grade data:", error);
      }
    };

    // Only fetch data if the gradeId prop has changed
    if (open && gradeId !== null && gradeId !== undefined) {
      fetchGradeById();
    }
  }, [open, gradeId]);

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
      <DialogTitle id="form-dialog-title">Edit Grade</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          name="grade_name"
          value={formData.grade_name}
          type="text"
          onChange={handleChange}
          fullWidth
        />
        <TextField
          autoFocus
          margin="dense"
          name="gradepoint"
          value={formData.gradepoint}
          type="number"
          onChange={handleChange}
          fullWidth
        />
        <TextField
          type="number"
          name="markfrom"
          autoFocus
          margin="dense"
          onChange={handleChange}
          value={formData.markfrom}
          fullWidth
        />
        <TextField
          type="number"
          name="markupto"
          autoFocus
          margin="dense"
          onChange={handleChange}
          value={formData.markupto}
          fullWidth
        />
        <TextField
          type="text"
          name="comment"
          autoFocus
          margin="dense"
          onChange={handleChange}
          value={formData.comment}
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

export default EditGradeDialog;

import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const EditSub14 = ({ open, onClose, subject, onSave }) => {
  const [editedSubject, setEditedSubject] = useState({ ...subject });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedSubject((prevSubject) => ({
      ...prevSubject,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(editedSubject);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Subject</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Subject Name"
          name="name"
          value={editedSubject.name}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Teacher"
          name="teacher"
          value={editedSubject.teacher}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Class Name"
          name="classname"
          value={editedSubject.classname}
          onChange={handleChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditSub14;

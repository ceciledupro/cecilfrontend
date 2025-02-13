import { useState } from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const EditClass = ({ open, onClose, classData, onSave }) => {
  const [editedClassData, setEditedClassData] = useState({
    name: classData.name,
    teacher: classData.teacher,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedClassData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave({ ...classData, ...editedClassData });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Class</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Class Name"
          name="name"
          value={editedClassData.name}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          margin="dense"
          label="Class Teacher"
          name="teacher"
          value={editedClassData.teacher}
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

export default EditClass;

import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { React, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import * as Yup from "yup";
import { Formik } from "formik";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { SessionContext } from "../../../components/MatxLayout/Layout1/SessionContext";

const initialState = {
  username: "",
  email: "",
  password: "",
  phone: "",
  address: "",
};

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&#]/,
      "Password must contain at least one special character"
    )
    .required("Password is required"),
  phone: Yup.string().matches(
    /^\d{11}$/,
    "Phone number must be exactly 11 digits"
  ),
  address: Yup.string().required("Address is required"),
});

export default function FormDialog({ updateTableData }) {
  const { currentSession } = useContext(SessionContext); // Get the active session

  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const apiUrl = process.env.REACT_APP_API_URL;

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Box>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add New Admin
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title"> Add new Admin</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={initialState}
            validationSchema={validationSchema}
            onSubmit={async (values, { setSubmitting }) => {
              if (!currentSession) {
                toast.error("No active session found");
                setSubmitting(false);
                return;
              }

              try {
                const response = await axios.post(`${apiUrl}/api/register`, {
                  ...values,
                  role: "admin",
                  sessionId: currentSession._id,
                });
                const newAdmin = response.data;
                updateTableData(newAdmin);
                toast.success("User successfully created");
                handleClose();
              } catch (err) {
                console.error("Error registering admin:", err);
                toast.error("Unable to create user");
              } finally {
                setSubmitting(false);
              }
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                <label>Username</label>
                <TextField
                  autoFocus
                  margin="dense"
                  name="username"
                  value={values.username}
                  placeholder="Enter your name"
                  type="text"
                  fullWidth
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.username && errors.username}
                  error={touched.username && Boolean(errors.username)}
                />
                <label>Email</label>
                <TextField
                  autoFocus
                  margin="dense"
                  name="email"
                  value={values.email}
                  placeholder="Enter your email"
                  type="email"
                  fullWidth
                  onChange={handleChange}
                  onBlur={handleBlur}
                  helperText={touched.email && errors.email}
                  error={touched.email && Boolean(errors.email)}
                />
                <label>Phone Number</label>
                <TextField
                  autoFocus
                  margin="dense"
                  name="phone"
                  value={values.phone}
                  placeholder="Enter your phone number"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  fullWidth
                  helperText={touched.phone && errors.phone}
                  error={touched.phone && Boolean(errors.phone)}
                />
                <label> Address</label>
                <TextField
                  autoFocus
                  margin="dense"
                  name="address"
                  value={values.address}
                  placeholder="Add your address"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  fullWidth
                  helperText={touched.address && errors.address}
                  error={touched.address && Boolean(errors.address)}
                />
                <label>Password</label>
                <TextField
                  autoFocus
                  margin="dense"
                  name="password"
                  value={values.password}
                  placeholder="Enter your password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  helperText={touched.password && errors.password}
                  error={touched.password && Boolean(errors.password)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <DialogActions>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleClose}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" color="primary" disabled={isSubmitting}>
                    Add Admin
                  </Button>
                </DialogActions>
              </form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
      <ToastContainer />
    </Box>
  );
}

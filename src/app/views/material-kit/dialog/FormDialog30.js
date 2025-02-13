// import { Box } from "@mui/material";
// import Button from "@mui/material/Button";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
// import TextField from "@mui/material/TextField";
// import { React, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import * as Yup from "yup";
// import { Field, Formik } from "formik";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import axios from "axios";
// const initialState = {
//   username: "",
//   email: "",
//   password: "",
//   phone: "",
//   address: "",
// };

// const validationSchema = Yup.object().shape({
//   password: Yup.string()
//     .min(6, "Password must be at least 6 characters long")
//     .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
//     .matches(/[a-z]/, "Password must contain at least one lowercase letter")
//     .matches(/[0-9]/, "Password must contain at least one number")
//     .matches(
//       /[@$!%*?&#]/,
//       "Password must contain at least one special character"
//     )
//     .required("Password is required!"),
//   email: Yup.string()
//     .email("Invalid Email address")
//     .required("Email is required!"),
//   phone: Yup.string().matches(
//     /^\d{11}$/,
//     "Phone number must be exactly 11 digits"
//   ),
//   role: Yup.string().required("Role is required!"),
// });

// export default function FormDialog30({ updateTableData }) {
//   const [formData, setformData] = useState(initialState);
//   const { username, email, password, phone, address } = formData;
//   const [open, setOpen] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();
//   function handleClickOpen() {
//     setOpen(true);
//   }
//   const apiUrl = process.env.REACT_APP_API_URL;

//   function handleClose() {
//     setOpen(false);
//   }

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setformData({ ...formData, [name]: value });
//   };
//   // const handleClick = async (e) => {
//   //   e.preventDefault();
//   //   const userData = {
//   //     username,
//   //     email,
//   //     password,
//   //     phone,
//   //     address,
//   //   };
//   //   try {
//   //     await axios.post(`${apiUrl}/api/register`, {
//   //       ...formData,
//   //       role: "admin",
//   //     });
//   //     // navigate("/dashboard/admin");
//   //     toast.success("User successfully created");
//   //     handleClose();
//   //   } catch (err) {
//   //     console.error("Error registering student:", err);
//   //     toast.error("Unable to create user");
//   //   }
//   // };
//   const handleClick = async (e) => {
//     e.preventDefault();
//     const userData = {
//       username,
//       email,
//       password,
//       phone,
//       address,
//     };
//     try {
//       const response = await axios.post(`${apiUrl}/api/register`, {
//         ...formData,
//         role: "parent",
//       });
//       // Assuming the response contains the new admin data
//       const newParent = response.data;
//       // Update the table data in the parent component (ViewAdmin)
//       updateTableData(newParent);
//       toast.success("User successfully created");
//       handleClose();
//     } catch (err) {
//       console.error("Error registering parent:", err);
//       toast.error("Unable to create user");
//     }
//   };

//   return (
//     <Box>
//       <Button variant="outlined" color="primary" onClick={handleClickOpen}>
//         Add New Parent
//       </Button>

//       <Dialog
//         open={open}
//         onClose={handleClose}
//         aria-labelledby="form-dialog-title"
//       >
//         <DialogTitle id="form-dialog-title"> Add new Parent</DialogTitle>
//         <DialogContent>
//           <label>Username</label>

//           <TextField
//             autoFocus
//             margin="dense"
//             name="username"
//             value={username}
//             placeholder="Enter your name"
//             type="text"
//             onChange={handleChange}
//             fullWidth
//           />
//           <label>Email</label>
//           <TextField
//             autoFocus
//             margin="dense"
//             name="email"
//             value={email}
//             placeholder="Enter your email"
//             type="email"
//             onChange={handleChange}
//             fullWidth
//           />
//           <label>Phone Number</label>
//           <TextField
//             autoFocus
//             margin="dense"
//             name="phone"
//             value={phone}
//             placeholder="Enter your phone number"
//             onChange={handleChange}
//             type="number"
//             fullWidth
//           />
//           <label>Home Address</label>
//           <TextField
//             autoFocus
//             margin="dense"
//             name="address"
//             value={address}
//             placeholder="Add your address"
//             onChange={handleChange}
//             type="text"
//             fullWidth
//           />
//           <label>Password</label>
//           <TextField
//             autoFocus
//             margin="dense"
//             name="password"
//             value={password}
//             placeholder="Enter your password"
//             onChange={handleChange}
//             type="password"
//             fullWidth
//           />
//         </DialogContent>
//         <DialogActions>
//           <Button variant="outlined" color="secondary" onClick={handleClose}>
//             Cancel
//           </Button>
//           <Button color="primary" onClick={handleClick}>
//             Add Parent
//           </Button>
//         </DialogActions>
//       </Dialog>
//       <ToastContainer />
//     </Box>
//   );
// }

import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import { React, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import * as Yup from "yup";
import { Formik, Field, Form } from "formik";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { SessionContext } from "../../../components/MatxLayout/Layout1/SessionContext";

const initialState = {
  username: "",
  email: "",
  password: "",
  phone: "",
  address: "",
};

const validationSchema = Yup.object().shape({
  username: Yup.string().required("Username is required!"),
  email: Yup.string()
    .email("Invalid Email address")
    .required("Email is required!"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&#]/,
      "Password must contain at least one special character"
    )
    .required("Password is required!"),
  phone: Yup.string().matches(
    /^\d{11}$/,
    "Phone number must be exactly 11 digits"
  ),
  address: Yup.string().required("Address is required!"),
});

export default function FormDialog30({ updateTableData }) {
  const { currentSession } = useContext(SessionContext); // Get the active session
  const [showPassword, setShowPassword] = useState(false);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_URL;

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  // const handleFormSubmit = async (values, { setSubmitting }) => {
  //   if (!currentSession) {
  //     toast.error("No active session found");
  //     setSubmitting(false);
  //     return;
  //   }
  //   try {
  //     const response = await axios.post(`${apiUrl}/api/register`, {
  //       ...values,
  //       role: "parent",
  //       sessionId: currentSession._id,
  //     });
  //     const newParent = response.data;
  //     updateTableData(newParent);
  //     toast.success("User successfully created");
  //     handleClose();
  //   } catch (err) {
  //     console.error("Error registering parent:", err);
  //     toast.error("Unable to create user");

  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  const handleFormSubmit = async (values, { setSubmitting }) => {
    if (!currentSession) {
      toast.error("No active session found");
      setSubmitting(false);
      return;
    }

    try {
      const response = await axios.post(`${apiUrl}/api/register`, {
        ...values,
        role: "parent",
        sessionId: currentSession._id,
      });

      const newParent = response.data;
      updateTableData(newParent);
      toast.success("User successfully created");
      handleClose();
    } catch (err) {
      console.error("Error registering parent:", err);

      // Handle specific error messages
      if (err.response && err.response.data && err.response.data.error) {
        toast.error(err.response.data.error, {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        toast.error("Unable to create user", {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Box>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Add New Parent
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Add new Parent</DialogTitle>
        <DialogContent>
          <Formik
            initialValues={initialState}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
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
              <Form onSubmit={handleSubmit}>
                <label>Username</label>
                <Field
                  as={TextField}
                  fullWidth
                  name="username"
                  label="Username"
                  variant="outlined"
                  margin="dense"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.username}
                  helperText={touched.username && errors.username}
                  error={Boolean(errors.username && touched.username)}
                  autoFocus
                />
                <label>Email Address</label>
                <Field
                  as={TextField}
                  fullWidth
                  name="email"
                  label="Email"
                  variant="outlined"
                  margin="dense"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.email}
                  helperText={touched.email && errors.email}
                  error={Boolean(errors.email && touched.email)}
                />
                <label>Phone Number</label>
                <Field
                  as={TextField}
                  fullWidth
                  name="phone"
                  label="Phone Number"
                  variant="outlined"
                  margin="dense"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.phone}
                  helperText={touched.phone && errors.phone}
                  error={Boolean(errors.phone && touched.phone)}
                />
                <label>Home Address</label>
                <Field
                  as={TextField}
                  fullWidth
                  name="address"
                  label="Home Address"
                  variant="outlined"
                  margin="dense"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.address}
                  helperText={touched.address && errors.address}
                  error={Boolean(errors.address && touched.address)}
                />
                <label>Password</label>
                <Field
                  as={TextField}
                  fullWidth
                  name="password"
                  label="Password"
                  variant="outlined"
                  margin="dense"
                  type={showPassword ? "text" : "password"}
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.password}
                  helperText={touched.password && errors.password}
                  error={Boolean(errors.password && touched.password)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
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
                    Add Parent
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </DialogContent>
      </Dialog>
      <ToastContainer />
    </Box>
  );
}

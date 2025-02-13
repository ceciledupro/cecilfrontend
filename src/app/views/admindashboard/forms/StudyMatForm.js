// import { Box, MenuItem } from "@mui/material";
// import Button from "@mui/material/Button";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
// import { Navigate, useNavigate } from "react-router-dom";
// import TextField from "@mui/material/TextField";
// import React, { useContext } from "react";
// import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
// import axios from "axios";
// import { useEffect, useState } from "react";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import useFetch from "../../../../hooks/useFetch";
// import { Diversity2Outlined } from "@mui/icons-material";
// import { SessionContext } from "../../../components/MatxLayout/Layout1/SessionContext";

// const StudyMatForm = () => {
//   const [open, setOpen] = useState(false);
//   const navigate = useNavigate();
//   const {
//     data: classData,
//     loading: classLoading,
//     error: classError,
//   } = useFetch("/class");
//   const [subjectData, setSubjectData] = useState([]); // Initialize subject data as an empty array
//   const [selectedClass, setSelectedClass] = useState("");
//   const [selectedSubject, setSelectedSubject] = useState("");
//   const { currentSession } = useContext(SessionContext);
//   const [selectedDate, setSelectedDate] = useState(""); // Initialize selectedDate state

//   // const [formData, setFormData] = useState({
//   //   className: selectedClass,
//   //   subject: selectedSubject,
//   //   date: selectedDate,
//   //   title: "",
//   //   desc: "", // Change to match the server's expected field name
//   //   class: "",
//   //   subject: "",
//   //   Download: null,
//   // });
//   const [formData, setFormData] = useState({
//     className: "",
//     subject: "",
//     date: "",
//     title: "",
//     desc: "",
//     Download: null,
//   });

//   // const handleChange = (e) => {
//   //   const { name, value } = e.target;
//   //   setFormData({ ...formData, [name]: value });
//   // };
//   const apiUrl = process.env.REACT_APP_API_URL;

//   // useEffect(() => {
//   //   if (selectedClass) {
//   //     // Fetch the authentication token from wherever you've stored it (e.g., local storage)
//   //     const token = localStorage.getItem("jwtToken");

//   //     // Include the token in the request headers
//   //     const headers = new Headers();
//   //     headers.append("Authorization", `Bearer ${token}`);

//   //     // Make an API call to fetch subjects for the selected class with the authorization token
//   //     fetch(`${apiUrl}/api/get-subject/${selectedClass}`, {
//   //       headers,
//   //     })
//   //       .then((response) => response.json())
//   //       .then((data) => {
//   //         setSubjectData(data);
//   //       })
//   //       .catch((error) => {
//   //         console.error("Error fetching subjects:", error);
//   //       });
//   //   } else {
//   //     // Clear the subjects if no class is selected
//   //     setSubjectData([]);
//   //   }
//   // }, [selectedClass]);
//   useEffect(() => {
//     if (currentSession) {
//       // Ensure currentSession is available
//       const token = localStorage.getItem("jwtToken");
//       fetch(`${apiUrl}/api/class/${currentSession._id}`, {
//         // Use currentSession._id as sessionId
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       })
//         .then((response) => response.json())
//         .then((data) => {
//           if (Array.isArray(data)) {
//             setClassData(data);
//           } else {
//             console.error("Invalid data format:", data);
//             setClassData([]);
//           }
//         })
//         .catch((error) => {
//           console.error("Error fetching classes:", error);
//         });
//     }
//   }, [apiUrl, currentSession]); // Depend on currentSession

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };
//   const handleChange = (e) => {
//     const { name, value, files } = e.target;

//     // Update the formData state based on the input field name
//     if (name === "Download" && files.length > 0) {
//       setFormData({ ...formData, [name]: files[0] }); // Update formData with the file object
//     } else {
//       setFormData({ ...formData, [name]: value });
//     }

//     // Update the selectedClass or selectedSubject state if applicable
//     if (name === "className") {
//       setSelectedClass(value);
//       setSelectedSubject(""); // Clear selectedSubject when className changes
//     } else if (name === "selectedClass") {
//       setSelectedClass(value);
//       setSelectedSubject(""); // Clear selectedSubject when selectedClass changes
//     } else if (name === "selectedSubject") {
//       setSelectedSubject(value);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     const formDataToSend = new FormData();
//     formDataToSend.append("date", selectedDate);
//     formDataToSend.append("title", formData.title);
//     formDataToSend.append("desc", formData.desc);
//     formDataToSend.append("className", selectedClass);
//     formDataToSend.append("subject", selectedSubject);

//     // Append the file to formDataToSend
//     if (formData.Download) {
//       formDataToSend.append("Download", formData.Download); // Append the file object directly
//     }

//     try {
//       await axios.post(`${apiUrl}/api/download`, formDataToSend, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       console.log("FormData after append:", formDataToSend);

//       toast.success("Study material added successfully");
//     } catch (err) {
//       console.error("Error adding study material:", err);
//       toast.error("Failed to add study material");
//     }
//   };

//   const handleClassChange = (event) => {
//     const newSelectedClass = event.target.value;
//     setSelectedClass(newSelectedClass);

//     // Clear the selected subject when the class changes
//     setSelectedSubject("");
//   };

//   const handleSubjectChange = (event) => {
//     setSelectedSubject(event.target.value);
//   };

//   return (
//     <>
//       <Box>
//         <Button variant="outlined" color="primary" onClick={handleClickOpen}>
//           Add Study Material
//         </Button>

//         <Dialog
//           open={open}
//           onClose={handleClose}
//           aria-labelledby="form-dialog-title"
//         >
//           <DialogTitle id="form-dialog-title"> Add Study Material</DialogTitle>
//           <DialogContent>
//             <label>Date</label>
//             <TextField
//               fullWidth
//               size="small"
//               type="date"
//               variant="outlined"
//               sx={{ mb: 3 }}
//               value={selectedDate}
//               onChange={(e) => setSelectedDate(e.target.value)} // Update the selectedDate when the user selects a date
//             />
//             <label>Title</label>
//             <TextField
//               autoFocus
//               margin="dense"
//               name="title"
//               value={formData.title}
//               placeholder="Title"
//               type="text"
//               onChange={handleChange}
//               fullWidth
//             />
//             <label>Description</label>
//             <TextField
//               autoFocus
//               margin="dense"
//               name="desc"
//               value={formData.desc}
//               placeholder="Description"
//               type="text"
//               onChange={handleChange}
//               fullWidth
//             />
//             <label>Select a class</label>
//             <TextField
//               select
//               autoFocus
//               margin="dense"
//               label="Select a class"
//               variant="outlined"
//               value={selectedClass} // Bind the selected value
//               onChange={handleClassChange} // Handle the change
//               fullWidth
//             >
//               {classData &&
//                 classData.map((item) => (
//                   <MenuItem key={item.id} value={item.name}>
//                     {item.name}
//                   </MenuItem>
//                 ))}
//             </TextField>

//             <TextField
//               autoFocus
//               margin="dense"
//               select
//               label="Select the subject"
//               variant="outlined"
//               value={selectedSubject}
//               onChange={handleSubjectChange}
//               fullWidth
//             >
//               {Array.isArray(subjectData) &&
//                 subjectData.map((item) => (
//                   <MenuItem key={item.id} value={item.name}>
//                     {item.name}
//                   </MenuItem>
//                 ))}
//             </TextField>

//             <label>Study Material File </label>
//             <div>
//               <input
//                 type="file"
//                 name="Download"
//                 // value={formData.schoolLogo}
//                 onChange={handleChange}
//                 sx={{ mb: 3 }}
//               />
//             </div>
//           </DialogContent>
//           <DialogActions>
//             <Button variant="outlined" color="secondary" onClick={handleClose}>
//               Cancel
//             </Button>
//             <Button onClick={handleSubmit} color="primary">
//               Add File
//             </Button>
//           </DialogActions>
//         </Dialog>
//       </Box>
//       <ToastContainer />
//     </>
//   );
// };
// export default StudyMatForm;
import { Box, MenuItem } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Navigate, useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import React, { useContext } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import axios from "axios";
import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import useFetch from "../../../../hooks/useFetch";
import { Diversity2Outlined } from "@mui/icons-material";
import { SessionContext } from "../../../components/MatxLayout/Layout1/SessionContext";
const StudyMatForm = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { currentSession } = useContext(SessionContext);
  console.log("a session", currentSession);
  const [classData, setClassData] = useState([]);
  const [subjectData, setSubjectData] = useState([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    desc: "",
    Downloads: null,
  });
  const apiUrl = process.env.REACT_APP_API_URL;

  // Fetch class data for the current session
  useEffect(() => {
    if (currentSession) {
      const token = localStorage.getItem("jwtToken");
      fetch(`${apiUrl}/api/class/${currentSession._id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setClassData(data);
          } else {
            console.error("Invalid class data format:", data);
          }
        })
        .catch((error) => {
          console.error("Error fetching classes:", error);
        });
    }
  }, [apiUrl, currentSession]);

  // Fetch subjects based on the selected class and session
  useEffect(() => {
    if (selectedClass && currentSession) {
      const token = localStorage.getItem("jwtToken");
      fetch(
        `${apiUrl}/api/get-subject/${selectedClass}/${currentSession._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (Array.isArray(data)) {
            setSubjectData(data);
          } else {
            console.error("Invalid subject data format:", data);
          }
        })
        .catch((error) => {
          console.error("Error fetching subjects:", error);
        });
    } else {
      setSubjectData([]);
    }
  }, [selectedClass, currentSession, apiUrl]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "Downloads" && files.length > 0) {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    if (name === "className") {
      setSelectedClass(value);
      setSelectedSubject(""); // Clear selectedSubject when class changes
    } else if (name === "selectedSubject") {
      setSelectedSubject(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("date", selectedDate);
    formDataToSend.append("title", formData.title);
    formDataToSend.append("desc", formData.desc);
    formDataToSend.append("className", selectedClass);
    formDataToSend.append("subject", selectedSubject);
    formDataToSend.append("session", currentSession._id);
    if (formData.Downloads) {
      formDataToSend.append("Downloads", formData.Downloads);
    }

    try {
      await axios.post(`${apiUrl}/api/download`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Study material added successfully");
    } catch (err) {
      console.error("Error adding study material:", err);
      toast.error("Failed to add study material");
    }
  };

  return (
    <>
      <Box>
        <Button variant="outlined" color="primary" onClick={handleClickOpen}>
          Add Study Material
        </Button>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add Study Material</DialogTitle>
          <DialogContent>
            <label>Date</label>
            <TextField
              fullWidth
              size="small"
              type="date"
              variant="outlined"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              sx={{ mb: 3 }}
            />
            <label>Title</label>
            <TextField
              autoFocus
              margin="dense"
              name="title"
              value={formData.title}
              placeholder="Title"
              type="text"
              onChange={handleChange}
              fullWidth
            />
            <label>Description</label>
            <TextField
              autoFocus
              margin="dense"
              name="desc"
              value={formData.desc}
              placeholder="Description"
              type="text"
              onChange={handleChange}
              fullWidth
            />
            <label>Select a class</label>
            <TextField
              select
              label="Select a class"
              variant="outlined"
              value={selectedClass}
              onChange={handleChange}
              name="className"
              fullWidth
            >
              {classData.map((item) => (
                <MenuItem key={item.id} value={item.name}>
                  {item.name}
                </MenuItem>
              ))}
            </TextField>

            <label>Select a subject</label>
            <TextField
              select
              label="Select the subject"
              variant="outlined"
              value={selectedSubject}
              onChange={handleChange}
              name="selectedSubject"
              fullWidth
            >
              {subjectData.map((item) => (
                <MenuItem key={item.id} value={item.name}>
                  {item.name}
                </MenuItem>
              ))}
            </TextField>

            <label>Study Material File</label>
            <input type="file" name="Downloads" onChange={handleChange} />
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" color="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} color="primary">
              Add File
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      <ToastContainer />
    </>
  );
};

export default StudyMatForm;

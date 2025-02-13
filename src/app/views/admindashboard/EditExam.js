// import React, { useState, useEffect } from "react";
// import axios from "axios";

// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   TextField,
// } from "@mui/material";

// const EditNotice = ({ open, noticeId, onUpdate, onClose, onSave }) => {
//   const [formData, setFormData] = useState({
//     date: "",
//     notice: "",
//     posted_by: "",
//   });

//   const apiUrl = process.env.REACT_APP_API_URL.trim();

//   useEffect(() => {
//     // const fetchNoticeById = async () => {
//     //   try {
//     //     if (noticeId) {
//     //       // Assuming you have the JWT token stored in localStorage
//     //       const token = localStorage.getItem("jwtToken");

//     //       const response = await fetch(`${apiUrl}/api/get-notice/${noticeId}`, {
//     //         headers: {
//     //           Authorization: `Bearer ${token}`, // Include your authentication token
//     //         },
//     //       });

//     //       if (response.ok) {
//     //         const data = await response.json();
//     //         console.log("Fetched notice data:", data);

//     //         // Set the state with the fetched data
//     //         setFormData({
//     //           notice: data.notice.notice || "",
//     //           posted_by: data.notice.posted_by || "",
//     //           date: data.notice.date || "",
//     //         });
//     //       } else {
//     //         console.error(
//     //           "Error fetching notice data. Status:",
//     //           response.status
//     //         );
//     //       }
//     //     }
//     //   } catch (error) {
//     //     console.error("Error fetching notice data:", error);
//     //   }
//     // };

//     useEffect(() => {
//       const fetchNoticeById = async () => {
//         try {
//           if (noticeId) {
//             const token = localStorage.getItem("jwtToken");

//             const response = await fetch(
//               `${apiUrl}/api/get-notice/${noticeId}`,
//               {
//                 headers: {
//                   Authorization: `Bearer ${token}`,
//                 },
//               }
//             );

//             if (response.ok) {
//               const data = await response.json();
//               console.log("Fetched notice data:", data);

//               // Update formData state with fetched data
//               setFormData({
//                 notice: data.notice || "",
//                 posted_by: data.posted_by || "",
//                 date: data.date || "",
//               });
//             } else {
//               console.error(
//                 "Error fetching notice data. Status:",
//                 response.status
//               );
//             }
//           }
//         } catch (error) {
//           console.error("Error fetching notice data:", error);
//         }
//       };

//       fetchNoticeById();
//     }, [apiUrl, noticeId]);

//     // Only fetch data if the teacherId prop has changed
//     if (open && noticeId !== null && noticeId !== undefined) {
//       console.log("Fetching data for noticeId:", noticeId);
//       fetchNoticeById();
//     }
//   }, [open, noticeId]);

//   const handleChange = (event) => {
//     const { name, value } = event.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSave = () => {
//     onSave({ ...formData });
//     onClose();
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();

//   //   try {
//   //     const response = await axios.put(
//   //       `${apiUrl}/api/edit-notice/${noticeId}`,
//   //       formData
//   //     );
//   //     console.log("Notice updated:", response.data);
//   //     onUpdate(response.data); // Call the onUpdate callback to refresh the list
//   //   } catch (error) {
//   //     console.error("Error updating notice:", error);
//   //   }
//   // };

//   return (
//     <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
//       <DialogTitle id="form-dialog-title">Edit Teacher</DialogTitle>
//       <DialogContent>
//         <label>Notice</label>
//         <TextField
//           margin="dense"
//           type="text"
//           name="notice"
//           value={formData.notice}
//           onChange={handleChange}
//           placeholder="Notice"
//           fullWidth
//         />

//         <label>Posted By</label>
//         <TextField
//           autoFocus
//           margin="dense"
//           type="text"
//           name="posted_by"
//           value={formData.posted_by}
//           onChange={handleChange}
//           placeholder="Posted By"
//           fullWidth
//         />
//         <label>Notice Date</label>
//         <TextField
//           autoFocus
//           margin="dense"
//           name="date"
//           value={formData.date}
//           onChange={handleChange}
//           fullWidth
//         />

//         {/* Add similar TextField components for other fields */}

//         {/* Add similar TextField components for other fields */}
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

// export default EditNotice;
import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";

const EditExam = ({ open, noticeId, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    date: "",
    notice: "",
    posted_by: "",
  });

  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    const fetchNoticeById = async () => {
      try {
        if (noticeId) {
          const token = localStorage.getItem("jwtToken");

          const response = await fetch(`${apiUrl}/api/get-notice/${noticeId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.ok) {
            const data = await response.json();
            console.log("Fetched notice data:", data);

            // Update formData state with fetched data
            setFormData({
              notice: data.notice || "",
              posted_by: data.posted_by || "",
              date: data.date || "",
            });
          } else {
            console.error(
              "Error fetching notice data. Status:",
              response.status
            );
          }
        }
      } catch (error) {
        console.error("Error fetching notice data:", error);
      }
    };

    if (open && noticeId) {
      fetchNoticeById();
    }
  }, [apiUrl, noticeId, open]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // const handleSave = async () => {
  //   try {
  //     const token = localStorage.getItem("jwtToken");

  //     const response = await axios.put(
  //       `${apiUrl}/api/edit-notice/${noticeId}`,
  //       formData,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     console.log("Notice updated:", response.data);
  //     if (onUpdate) {
  //       onUpdate(response.data); // Call the onUpdate callback to refresh the list if defined
  //     }
  //     onClose(); // Close the edit dialog
  //   } catch (error) {
  //     console.error("Error updating notice:", error);
  //   }
  // };
  const handleSave = () => {
    onSave({ ...formData });
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Edit Notice</DialogTitle>
      <DialogContent>
        <label>Notice</label>
        <TextField
          margin="dense"
          type="text"
          name="notice"
          value={formData.notice}
          onChange={handleChange}
          placeholder="Notice"
          fullWidth
        />

        <label>Posted By:</label>
        <TextField
          autoFocus
          margin="dense"
          type="text"
          name="posted_by"
          value={formData.posted_by}
          onChange={handleChange}
          placeholder="Posted By"
          fullWidth
        />

        <label>Notice Date</label>
        <TextField
          autoFocus
          margin="dense"
          name="date"
          value={formData.date}
          onChange={handleChange}
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

export default EditExam;

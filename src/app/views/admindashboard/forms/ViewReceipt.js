import React, {
  Fragment,
  useEffect,
  useState,
  useContext,
  useRef,
} from "react";
import {
  Box,
  Button,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import useFetch from "../../../../hooks/useFetch";
import axios from "axios";
import useAuth from "../../../../app/hooks/useAuth";
import "./receipt.css";
import { SessionContext } from "../../../components/MatxLayout/Layout1/SessionContext";

const ContentBox = styled("div")(({ theme }) => ({
  margin: "30px",
  [theme.breakpoints.down("sm")]: { margin: "16px" },
}));

// const ViewReceipt = () => {
//   const componentRef = useRef();
//   // const { id } = useParams();
//   const { studentId, sessionId } = useParams();
//   const apiUrl = process.env.REACT_APP_API_URL;
//   const { currentSession } = useContext(SessionContext);
//   const [data, setData] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [accountSettings, setAccountSettings] = useState({
//     name: "",
//     address: "",
//     phone: "",
//     phonetwo: "",
//     email: "",
//     schoolLogo: "",
//   });

//   // // Fetch Receipt Data
//   // useEffect(() => {
//   //   const fetchReceipt = async () => {
//   //     try {
//   //       const response = await axios.get(`${apiUrl}/receipt/${id}`);
//   //       setData(response.data);
//   //       setLoading(false);
//   //     } catch (err) {
//   //       setError("Failed to fetch receipt data.");
//   //       setLoading(false);
//   //     }
//   //   };
//   //   fetchReceipt();
//   // }, [id, apiUrl]);
//   useEffect(() => {
//     const fetchReceipts = async () => {
//       try {
//         const response = await axios.get(
//           `${apiUrl}/receipt/${studentId}/${sessionId}`
//         );
//         setData(response.data); // Assuming the API returns an array of receipts
//         setLoading(false);
//       } catch (err) {
//         setError("Failed to fetch receipt data.");
//         setLoading(false);
//       }
//     };
//     fetchReceipts();
//   }, [studentId, sessionId, apiUrl]);

//   // Fetch Account Settings
//   useEffect(() => {
//     const fetchAccountSettings = async () => {
//       try {
//         const response = await axios.get(`${apiUrl}/api/account-setting`);
//         setAccountSettings(response.data.data);
//       } catch (error) {
//         console.error("Error fetching account settings:", error);
//       }
//     };
//     fetchAccountSettings();
//   }, [apiUrl]);

//   const handlePrint = useReactToPrint({
//     content: () => componentRef.current,
//   });

//   if (loading) return <p>Loading receipt...</p>;
//   if (error) return <p>{error}</p>;
//   if (!data) return <p>No receipt data found.</p>;

//   const paid = parseFloat(data.paid) || 0;
//   const amount = parseFloat(data.amount) || 0;
//   const balance = amount - paid;

//   return (
//     <Fragment>
//       <ContentBox>
//         <Box width="100%" overflow="auto" className="print-button-container">
//           <button onClick={handlePrint}>Print Receipt</button>

//           <div className="container" ref={componentRef}>
//             <div
//               className="header"
//               style={{
//                 textAlign: "center",
//                 padding: "20px",
//                 backgroundColor: "#f0f0f0",
//               }}
//             >
//               {accountSettings.schoolLogo && (
//                 <img
//                   src={`https://edupros.s3.amazonaws.com/${accountSettings.schoolLogo}`}
//                   alt="School Logo"
//                   style={{ width: "200px", height: "180px" }}
//                 />
//               )}
//               <h1>{accountSettings.name}</h1>
//               <h4>{accountSettings.address}</h4>
//               <p>
//                 Tel: {accountSettings.phone}, {accountSettings.phonetwo} |
//                 Email: {accountSettings.email}
//               </p>
//               <button
//                 style={{
//                   backgroundColor: "#042954",
//                   color: "#fff",
//                   padding: "10px 50px",
//                   borderRadius: "25px",
//                   border: "none",
//                   fontWeight: "bold",
//                   textTransform: "uppercase",
//                 }}
//               >
//                 Receipt
//               </button>
//             </div>

//             <table>
//               <tbody>
//                 <tr>
//                   <td>
//                     <strong>Date:</strong>
//                   </td>
//                   <td>
//                     {data.date
//                       ? new Date(data.date).toLocaleDateString()
//                       : "N/A"}
//                   </td>
//                 </tr>
//                 <tr>
//                   <td>
//                     <strong>Received From:</strong>
//                   </td>
//                   <td>{data.studentName || "N/A"}</td>
//                 </tr>
//                 <tr>
//                   <td>
//                     <strong>On behalf of:</strong>
//                   </td>
//                   <td>{data.studentName || "N/A"}</td>
//                 </tr>
//                 <tr>
//                   <td>
//                     <strong>The sum of:</strong>
//                   </td>
//                   <td>₦{paid.toLocaleString()}</td>
//                 </tr>
//                 <tr>
//                   <td>
//                     <strong>Being paid for:</strong>
//                   </td>
//                   <td>{data.reason || "N/A"}</td>
//                 </tr>
//                 <tr>
//                   <td>
//                     <strong>Amount:</strong>
//                   </td>
//                   <td>₦{amount.toLocaleString()}</td>
//                 </tr>
//                 <tr>
//                   <td>
//                     <strong>Balance:</strong>
//                   </td>
//                   <td>₦{balance.toLocaleString()}</td>
//                 </tr>
//                 <tr>
//                   <td>
//                     <strong>Signature:</strong>
//                   </td>
//                   <td>_________________________</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </Box>
//       </ContentBox>
//     </Fragment>
//   );
// };

// export default ViewReceipt;
const ViewReceipt = () => {
  const componentRef = useRef();
  const { studentId } = useParams();
  const apiUrl = process.env.REACT_APP_API_URL;
  const { currentSession } = useContext(SessionContext);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [accountSettings, setAccountSettings] = useState({
    name: "",
    address: "",
    phone: "",
    phonetwo: "",
    email: "",
    schoolLogo: "",
  });

  useEffect(() => {
    const fetchReceipts = async () => {
      try {
        const sessionId = currentSession?._id || currentSession;
        const response = await axios.get(
          `${apiUrl}/api/receipt/${studentId}/${sessionId}`
        );
        setData(response.data[0]); // Access the first item in the array
        setLoading(false);
      } catch (err) {
        console.error("API Error:", err);
        setError("Failed to fetch receipt data.");
        setLoading(false);
      }
    };

    if (currentSession) {
      fetchReceipts();
    }
  }, [studentId, currentSession, apiUrl]);

  useEffect(() => {
    const fetchAccountSettings = async () => {
      try {
        const response = await axios.get(`${apiUrl}/api/account-setting`);
        setAccountSettings(response.data.data);
      } catch (error) {
        console.error("Error fetching account settings:", error);
      }
    };
    fetchAccountSettings();
  }, [apiUrl]);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  if (loading) return <p>Loading receipt...</p>;
  if (error) return <p>{error}</p>;
  if (!data) return <p>No receipt data found.</p>;

  const paid = parseFloat(data.paid.replace(/,/g, "")) || 0;
  const amount = parseFloat(data.amount.replace(/,/g, "")) || 0;
  const balance = amount - paid;

  return (
    <Fragment>
      <ContentBox>
        <Box width="100%" overflow="auto" className="print-button-container">
          <button onClick={handlePrint}>Print Receipt</button>

          <div className="container" ref={componentRef}>
            <div
              className="header"
              style={{
                textAlign: "center",
                padding: "20px",
                backgroundColor: "#f0f0f0",
              }}
            >
              {accountSettings.schoolLogo && (
                <img
                  src={`https://edupros.s3.amazonaws.com/${accountSettings.schoolLogo}`}
                  alt="School Logo"
                  style={{ width: "200px", height: "180px" }}
                />
              )}
              <h1>{accountSettings.name}</h1>
              <h4>{accountSettings.address}</h4>
              <p>
                Tel: {accountSettings.phone}, {accountSettings.phonetwo} |
                Email: {accountSettings.email}
              </p>
              <button
                style={{
                  backgroundColor: "#042954",
                  color: "#fff",
                  padding: "10px 50px",
                  borderRadius: "25px",
                  border: "none",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                Receipt
              </button>
            </div>

            <table>
              <tbody>
                <tr>
                  <td>
                    <strong>Date:</strong>
                  </td>
                  <td>
                    {data.date
                      ? new Date(data.date).toLocaleDateString()
                      : "N/A"}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Received From:</strong>
                  </td>
                  <td>{data.studentName || "N/A"}</td>
                </tr>
                <tr>
                  <td>
                    <strong>On behalf of:</strong>
                  </td>
                  <td>{data.studentName || "N/A"}</td>
                </tr>
                <tr>
                  <td>
                    <strong>The sum of:</strong>
                  </td>
                  <td>₦{paid.toLocaleString()}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Being paid for:</strong>
                  </td>
                  <td>{data.reason || "N/A"}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Amount:</strong>
                  </td>
                  <td>₦{amount.toLocaleString()}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Balance:</strong>
                  </td>
                  <td>₦{balance.toLocaleString()}</td>
                </tr>
                <tr>
                  <td>
                    <strong>Signature:</strong>
                  </td>
                  <td>_________________________</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Box>
      </ContentBox>
    </Fragment>
  );
};

export default ViewReceipt;

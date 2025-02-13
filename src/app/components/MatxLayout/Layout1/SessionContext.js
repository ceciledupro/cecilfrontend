// import React, { createContext, useState, useEffect } from "react";
// import axios from "axios";

// export const SessionContext = createContext();

// export const SessionProvider = ({ children }) => {
//   const [sessions, setSessions] = useState([]);
//   const [currentSession, setCurrentSession] = useState(null);
//   const apiUrl = process.env.REACT_APP_API_URL;

//   useEffect(() => {
//     axios
//       .get(`${apiUrl}/api/all-sessions`) // Using the updated endpoint
//       .then((response) => {
//         if (response.data.success && Array.isArray(response.data.data)) {
//           const formattedSessions = response.data.data.map(
//             (session, index) => ({
//               id: index, // Generate a unique ID for each session
//               name: session, // The session name like "2022-2023"
//               isActive: index === 0, // Assume the first session as active for now
//             })
//           );

//           setSessions(formattedSessions);

//           const activeSession = formattedSessions.find((s) => s.isActive);
//           if (activeSession) {
//             setCurrentSession(activeSession);
//           } else {
//             console.warn("No active session found");
//           }
//         } else {
//           console.error("Unexpected response structure", response);
//         }
//       })
//       .catch((error) => {
//         console.error("Error fetching sessions:", error);
//       });
//   }, [apiUrl]);

//   const handleSessionChange = (sessionId) => {
//     const selectedSession = sessions.find(
//       (session) => session.id === sessionId
//     );

//     if (selectedSession) {
//       console.log("Switching to session:", selectedSession);

//       // Set as current session locally
//       setCurrentSession(selectedSession);

//       // Update active status in session list
//       setSessions((prevSessions) =>
//         prevSessions.map((session) =>
//           session.id === sessionId
//             ? { ...session, isActive: true }
//             : { ...session, isActive: false }
//         )
//       );
//     }
//   };

//   return (
//     <SessionContext.Provider
//       value={{
//         sessions,
//         currentSession,
//         setSessions,
//         setCurrentSession,
//         handleSessionChange,
//       }}
//     >
//       {children}
//     </SessionContext.Provider>
//   );
// };

import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const SessionContext = createContext();

export const SessionProvider = ({ children }) => {
  const [sessions, setSessions] = useState([]);
  const [currentSession, setCurrentSession] = useState(null);
  const apiUrl = process.env.REACT_APP_API_URL;

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/sessions`)
      .then((response) => {
        if (Array.isArray(response.data)) {
          setSessions(response.data);

          // Set the session that matches the current date as active
          const activeSession = response.data.find((session) => {
            const now = new Date();
            const startDate = new Date(session.startDate);
            const endDate = new Date(session.endDate);
            return now >= startDate && now <= endDate;
          });

          if (activeSession) {
            setCurrentSession(activeSession);
          }
        } else {
          console.error("Unexpected response structure", response);
        }
      })
      .catch((error) => {
        console.error("Error fetching sessions:", error);
      });
  }, []);

  return (
    <SessionContext.Provider
      value={{ sessions, currentSession, setSessions, setCurrentSession }}
    >
      {children}
    </SessionContext.Provider>
  );
};

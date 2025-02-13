// // Your TermRepContainer component

// import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

// import useAuth from "app/hooks/useAuth";
// import ThirdTermRep from "./ThirdTermRep";

// const ThirdTermRepCont = () => {
//   const { id } = useParams();
//   // const { examId, subjectId } = useParams(); // Get examId and subjectId from URL params

//   return (
//     <div>
//       {/* You can include any additional components or layout for the TermRep page */}
//       <ThirdTermRep studentId={id} />
//     </div>
//   );
// };

// export default ThirdTermRepCont;
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import ThirdTermRep from "./ThirdTermRep";
import useFetch from "../../../../hooks/useFetch";

const ThirdTermRepCont = () => {
  const { id } = useParams();
  const { data, loading, error } = useFetch(`/students/${id}`); // Fetch student data

  return (
    <div>
      {/* Pass loading, error, studentData, and studentId as props to ThirdTermRep */}
      <ThirdTermRep
        loading={loading}
        error={error}
        studentData={data}
        studentId={id}
      />
    </div>
  );
};

export default ThirdTermRepCont;

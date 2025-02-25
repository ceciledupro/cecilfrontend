// Your TermRepContainer component

import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import TermRep from "./TermRep";

const TermRepCont = () => {
  const { id } = useParams();
  // const { examId, subjectId } = useParams(); // Get examId and subjectId from URL params

  return (
    <div>
      {/* You can include any additional components or layout for the TermRep page */}
      <TermRep studentId={id} />
    </div>
  );
};

export default TermRepCont;

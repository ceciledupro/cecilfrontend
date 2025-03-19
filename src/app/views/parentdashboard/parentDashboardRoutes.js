import Loadable from "../../components/Loadable";
import { lazy } from "react";
import { authRoles } from "../../auth/authRoles";
import Admin from "./admin/Admin";
import Class from "./forms/Class";
import Examlist from "./forms/Examlist";
import Exam from "./forms/Exam";
import Form from "./forms/Form";
import Grade from "./forms/Grade";
import Info from "./forms/Info";
import Info2 from "./forms/Info2";
import Manage from "./forms/Manage";
import Online from "./forms/Online";
import Payment from "./forms/Payment";
import Profile from "./forms/Profile";
import Sub1 from "./forms/Sub1";

import Subject from "./forms/Subject";
import Tab from "./forms/Tab";
import Teacher from "./forms/Teacher";
import ManagemarkView from "./forms/ManagemarkView";
import Info3 from "./forms/Info3";
import Info4 from "./forms/Info4";
import Info5 from "./forms/Info5";
import Info6 from "./forms/Info6";

import ExamDetail from "./forms/ExamDetail";
import ManageResult from "./forms/ManageResult";
import MarkSheet from "./forms/MarkSheet";
import ReportCard from "./forms/ReportCard";
import StudyMat from "./forms/StudyMat";

// import Su from "./forms/SubSubject";
// import SubSubject from "./forms/subSubject";

// import SubSubject from "./forms/SubSubject";
// import PastQuestionsList from "./forms/PastQuestionsList";

const Analytics = Loadable(lazy(() => import("./Analytics")));

const parentDashboardRoutes = [
  {
    path: "/parent/dashboard",
    element: <Analytics />,
    auth: "student",
  },

  {
    path: "/student/dashboard/student_add",
    element: <Form />,
    auth: "student",
  },
  {
    path: "/student/dashboard/subject",
    element: <Sub1 />,
    auth: "student",
  },
  {
    path: "/student/dashboard/examlist",
    element: <Examlist />,
    auth: "student",
  },

  {
    path: "/student/dashboard/manage-mark-view",
    element: <ManagemarkView />,
    auth: "student",
  },
  {
    path: "/student/dashboard/jss1-student_information",
    element: <Info />,
    auth: "student",
  },
  {
    path: "/student/dashboard/jss2-student_information",
    element: <Info2 />,
    auth: "student",
  },
  {
    path: "/student/dashboard/jss3-student_information",
    element: <Info3 />,
    auth: "student",
  },
  {
    path: "/student/dashboard/ss1-student_information",
    element: <Info4 />,
    auth: "student",
  },
  {
    path: "/student/dashboard/ss2-student_information",
    element: <Info5 />,
    auth: "student",
  },
  {
    path: "/student/dashboard/ss3-student_information",
    element: <Info6 />,
    auth: "student",
  },
  { path: "/student/dashboard/teacher", element: <Teacher />, auth: "student" },
  { path: "/student/dashboard/subject", element: <Subject />, auth: "student" },
  { path: "/student/dashboard/class", element: <Class />, auth: "student" },
  { path: "/student/dashboard/exam", element: <Exam />, auth: "student" },
  { path: "/student/dashboard/grade", element: <Grade />, auth: "student" },
  {
    path: "/student/dashboard/tabulation-sheet",
    element: <Tab />,
    auth: "student",
  },
  {
    path: "/student/dashboard/online-exam",
    element: <Online />,
    auth: "student",
  },
  {
    path: "/student/dashboard/manage-online-exam",
    element: <Manage />,
    auth: "student",
  },
  {
    path: "/student/dashboard/manage-online-result",
    element: <ManageResult />,
    auth: "student",
  },
  {
    path: "/student/dashboard/manage-online-exam/:id",
    element: <ExamDetail />,
    auth: "student",
  },
  {
    path: "/student/dashboard/student_mark_sheet",
    element: <MarkSheet />,
    auth: "admin",
  },
  {
    path: "/dashboard/report_card/:id",
    element: <ReportCard />,
    auth: "admin",
  },
  {
    path: "/student/dashboard/student-payment",
    element: <Payment />,
    auth: "student",
  },
  {
    path: "/student/dashboard/student-material",
    element: <StudyMat />,
    auth: "student",
  },
  // {
  //   path: "/student/dashboard/add-past-questions",
  //   element: <AddPq />,
  //   auth: "student",
  // },

  // {
  //   path: "/student/dashboard/subsubjects/:subjectName",
  //   element: <SubSubject />,
  //   auth: "student",
  // },
  // {
  //   path: "/student/dashboard/questions/:subjectName/:title",
  //   element: <PastQuestionsList />,
  //   auth: "student",
  // },
  { path: "/student/dashboard/profile", element: <Profile />, auth: "student" },
];

export default parentDashboardRoutes;

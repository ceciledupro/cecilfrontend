export const navigations = [
  {
    name: "Dashboard",
    path: "/student/dashboard/default",
    icon: <span style={{ color: "#ffc107" }}>dashboard</span>,
  },
  {
    name: "Teachers",
    path: "/student/dashboard/teacher",
    icon: <span style={{ color: "#ffc107" }}>person</span>,
  },

  {
    name: "Subject",
    path: "/student/dashboard/subject",
    icon: <span style={{ color: "#ffc107" }}>book</span>,
  },

  {
    name: "Exam Mark/Report Card",
    path: "/student/dashboard/student_mark_sheet",
    icon: <span style={{ color: "#ffc107" }}>assignment</span>,
  },
  {
    name: "Past Questions",
    icon: "assignment",
    children: [
      // {
      //   name: "Add Past Questions",
      //   iconText: "SI",
      //   path: "student/dashboard/add-past-questions",
      // },
      {
        name: "View Past Questions",
        iconText: "SI",
        path: "/student/dashboard/view-past-questions",
      },
    ],
  },
  {
    name: "Online Exam",
    icon: "assignment",
    children: [
      {
        name: "Manage Online Exam",
        iconText: "SI",
        path: "student/dashboard/manage-online-exam",
      },
      {
        name: "View Result",
        iconText: "SI",
        path: "/student/dashboard/manage-online-result",
      },
    ],
  },
  {
    name: " Payment History",
    icon: <span style={{ color: "#ffc107" }}>payment</span>,
    path: "/student/dashboard/student-payment",
  },
  {
    name: " Attendance",
    icon: <span style={{ color: "#ffc107" }}>access_alarm</span>,
    path: "/student/dashboard/student-payment",
  },
  {
    name: "Study Material",
    icon: <span style={{ color: "#ffc107" }}>group_work</span>,
    path: "/student/dashboard/student-material",
  },

  {
    name: "Profile",
    path: "/dashboard/profile",
    icon: <span style={{ color: "#ffc107" }}>person</span>,
  },
];

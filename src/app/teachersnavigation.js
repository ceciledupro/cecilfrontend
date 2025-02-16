// export const navigations = () => {

//     {
//       name: " Dashboard",
//       path: "/teacher/dashboard",
//       icon: <span style={{ color: "#ffc107" }}>dashboard</span>,
//     },
//     {
//       name: "Student",
//       icon: "people",
//       children: [
//         {
//           name: "Student information",
//           iconText: "SU",
//           children:

//       ],
//     },
//     {
//       name: "Affective Psychomotor",
//       icon: "person",
//       children: [
//         {
//           name: "Manage Category",
//           iconText: "SI",
//           path: "/dashboard/psychomotor_report_cat",
//         },
//         {
//           name: "Manage Student Report",
//           iconText: "SI",
//           path: "/dashboard/manage_psychomotor",
//         },
//       ],
//     },
//     {
//       name: "Teachers",
//       path: "/teacher/dashboard/teacher",
//       icon: "dashboard",
//     },
//     {
//       name: "Subject",
//       icon: "book",
//       children:

//     },
//     {
//       name: "Exam",
//       icon: "assignment",
//       children: [
//         { name: "Manage Marks", iconText: "SI", path: "/dashboard/exam" },
//         {
//           name: "Question Paper",
//           iconText: "SI",
//           path: "/dashboard/manage-mark-view",
//         },
//         {
//           name: "On-Screen Marking",
//           iconText: "SI",
//           path: "/dashboard/onscreen-marking",
//         },
//       ],
//     },
//     {
//       name: "Online Exam",
//       icon: "computer",
//       children: [
//         {
//           name: "Create Online Exam",
//           iconText: "SI",
//           path: "/dashboard/online-exam",
//         },
//         {
//           name: "Manage Online Exam",
//           iconText: "SI",
//           path: "/dashboard/manage-online-exam",
//         },
//       ],
//     },
//     {
//       name: "Profile",
//       path: "/dashboard/profile",
//       icon: <span style={{ color: "#ffc107" }}>person</span>,
//     },
//   ]

export const navigations = [
  {
    name: "Dashboard",
    path: "/teacher/dashboard",
    icon: <span style={{ color: "#ffc107" }}>dashboard</span>,
  },
  {
    name: "Student",
    icon: "people",
    children: [
      {
        name: "Student Information",
        iconText: "SU",
        children: [], // You can add more children here if needed
      },
    ],
  },
  {
    name: "Affective Psychomotor",
    icon: "person",
    children: [
      {
        name: "Manage Category",
        iconText: "SI",
        path: "/dashboard/psychomotor_report_cat",
      },
      {
        name: "Manage Student Report",
        iconText: "SI",
        path: "/dashboard/manage_psychomotor",
      },
    ],
  },
  {
    name: "Teachers",
    path: "/teacher/dashboard/teacher",
    icon: "dashboard",
  },
  {
    name: "Subject",
    icon: "book",
    children: [], // Add subject-related children here
  },
  {
    name: "Exam",
    icon: "assignment",
    children: [
      { name: "Manage Marks", iconText: "SI", path: "/dashboard/exam" },
      {
        name: "Question Paper",
        iconText: "SI",
        path: "/dashboard/manage-mark-view",
      },
      {
        name: "On-Screen Marking",
        iconText: "SI",
        path: "/dashboard/onscreen-marking",
      },
    ],
  },
  {
    name: "Online Exam",
    icon: "computer",
    children: [
      {
        name: "Create Online Exam",
        iconText: "SI",
        path: "/dashboard/online-exam",
      },
      {
        name: "Manage Online Exam",
        iconText: "SI",
        path: "/dashboard/manage-online-exam",
      },
    ],
  },
  {
    name: "Profile",
    path: "/dashboard/profile",
    icon: <span style={{ color: "#ffc107" }}>person</span>,
  },
];

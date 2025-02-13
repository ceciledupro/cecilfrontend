import { Navigate } from "react-router-dom";
import AuthGuard from "../app/auth/AuthGuard";
import chartsRoute from "../app/views/charts/ChartsRoute";
import NotFound from "../app/views/sessions/NotFound";
import sessionRoutes from "../app/views/sessions/SessionRoutes";

import MatxLayout from "./components/MatxLayout/MatxLayout";

import teacherDashboardRoutes from "./views/teacherdashboard/teacherDashboardRoutes";
import studentDashboardRoutes from "./views/studentdashboard/studentDashboardRoutes";
import adminDashboardRoutes from "./views/admindashboard/adminDashboardRoutes";

const routes = [
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [
      ...chartsRoute,
      ...adminDashboardRoutes,
      ...teacherDashboardRoutes,
      ...studentDashboardRoutes,
    ],
  },
  ...sessionRoutes,
  { path: "/", element: <Navigate to="/session/signin" /> },
  { path: "*", element: <NotFound /> },
];

export default routes;

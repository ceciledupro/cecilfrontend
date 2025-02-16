import Loadable from "../../../app/components/Loadable";

import { lazy } from "react";
import Login2 from "./Login2";
import Register from "./Register";
import Login from "./Login";

const NotFound = Loadable(lazy(() => import("./NotFound")));
const ForgotPassword = Loadable(lazy(() => import("./ForgotPassword")));
const JwtLogin = Loadable(lazy(() => import("./JwtLogin")));
const JwtRegister = Loadable(lazy(() => import("./JwtRegister")));

const sessionRoutes = [
  { path: "/session/signup", element: <JwtRegister /> },
  { path: "/session/signin", element: <JwtLogin /> },
  { path: "/session/newlogin", element: <Login /> },
  { path: "/session/forgot-password", element: <ForgotPassword /> },
  { path: "/session/logins", element: <Login2 /> },
  { path: "/session/register", element: <Register /> },
  { path: "/session/404", element: <NotFound /> },
];

export default sessionRoutes;

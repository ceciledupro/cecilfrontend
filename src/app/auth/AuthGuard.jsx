// import useAuth from "app/hooks/useAuth";
// // import { flat } from 'app/utils/utils';
// import { Navigate, useLocation } from "react-router-dom";
// // import AllPages from '../routes';

// // const userHasPermission = (pathname, user, routes) => {
// //   if (!user) {
// //     return false;
// //   }
// //   const matched = routes.find((r) => r.path === pathname);

// //   const authenticated =
// //     matched && matched.auth && matched.auth.length ? matched.auth.includes(user.role) : true;
// //   return authenticated;
// // };

// const AuthGuard = ({ children }) => {
//   let {
//     isAuthenticated,
//     // user
//   } = useAuth();
//   const { pathname } = useLocation();

//   //   const routes = flat(AllPages);

//   //   const hasPermission = userHasPermission(pathname, user, routes);
//   //   let authenticated = isAuthenticated && hasPermission;

//   // // IF YOU NEED ROLE BASED AUTHENTICATION,
//   // // UNCOMMENT ABOVE LINES
//   // // AND COMMENT OUT BELOW authenticated VARIABLE

//   let authenticated = isAuthenticated;

//   return (
//     <>
//       {authenticated ? (
//         children
//       ) : (
//         <Navigate replace to="/session/signin" state={{ from: pathname }} />
//       )}
//     </>
//   );
// };

// export default AuthGuard;

import useAuth from "../../app/hooks/useAuth";
// import { flat } from 'app/utils/utils';
import { Navigate, useLocation } from "react-router-dom";
const AuthGuard = ({ children }) => {
  const { isAuthenticated, user } = useAuth();
  const { pathname } = useLocation();

  const userHasPermission = () => {
    // Implement your role-based authorization logic here
    // Check if the user has the required role to access the current route
    // You can use the `user` object to determine the user's role

    // Example: If you have a "role" property in the user object
    // and you want to allow access to students and teachers only:
    if (
      user &&
      (user.role === "student" ||
        user.role === "teacher" ||
        user.role === "admin")
    ) {
      return true;
    }

    return false; // Default to denying access
  };

  const authorized = isAuthenticated && userHasPermission();

  console.log("isAuthenticated:", isAuthenticated);
  console.log("user:", user);
  console.log("pathname:", pathname);

  if (authorized) {
    console.log("Access granted. Proceeding to the route.");
    return children;
  } else {
    console.log("Access denied. Redirecting to /session/signin");
    return <Navigate replace to="/session/signin" state={{ from: pathname }} />;
  }
};

export default AuthGuard;

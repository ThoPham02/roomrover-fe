import { createBrowserRouter, Navigate } from "react-router-dom";

import DefaultLayout from "../components/layouts/DefaultLayout";
import ErrorLayout from "../components/layouts/ErrorLayout";
import { AUTH_PATHS } from "../features/auth/const";
import { authRoutes } from "../features/auth";

export const RootPath = "/";

const router = createBrowserRouter([
  {
    path: RootPath,
    element: <Navigate to={AUTH_PATHS.LOG_IN} replace />,
  },
  {
    path: RootPath,
    element: <DefaultLayout />,
    errorElement: <ErrorLayout />,
    children: [
      ...authRoutes
    ],
  },
//   {
//     element: <AuthLayout />,
//     errorElement: <ErrorLayout />,
//     children: [...authRoutes],
//   },
]);

export default router;
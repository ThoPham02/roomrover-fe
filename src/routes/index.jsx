import { createBrowserRouter, Navigate } from "react-router-dom";

import LoginLayout from "../components/layouts/LoginLayout";
import ErrorLayout from "../components/layouts/ErrorLayout";
import { AUTH_PATHS } from "../features/auth";
import { authRoutes } from "../features/auth";

export const RootPath = "/";

const router = createBrowserRouter([
  {
    path: RootPath,
    element: <Navigate to={AUTH_PATHS.LOG_IN} replace />,
  },
  {
    path: RootPath,
    element: <LoginLayout />,
    errorElement: <ErrorLayout />,
    children: [
      ...authRoutes
    ],
  },
]);

export default router;
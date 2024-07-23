import { createBrowserRouter, Navigate } from "react-router-dom";

import LoginLayout from "../components/layouts/LoginLayout";
import ErrorLayout from "../components/layouts/ErrorLayout";
import { authRoutes } from "../features/auth";
import { INVENT_PATHS, inventRoutes } from "../features/inventory";

export const RootPath = "/";

const router = createBrowserRouter([
  {
    path: RootPath,
    element: <Navigate to={INVENT_PATHS.HOME} replace />,
  },
  {
    path: "/error",
    element: <ErrorLayout />,
  },
  {
    path:"*",
    element: <Navigate to={INVENT_PATHS.HOME} replace/>,
  },
  {
    path: RootPath,
    element: <LoginLayout />,
    errorElement: <ErrorLayout />,
    children: [
      ...authRoutes,
      ...inventRoutes,
    ],
  },
]);

export default router;
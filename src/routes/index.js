import { createBrowserRouter, Navigate } from "react-router-dom";

import { ROUTE_PATHS } from "../common/path";
import { authRoute } from "../pages/auth/route";
import {DefaultLayout, ErrorLayout, ManageLayout} from "../components/layouts";
import { inventPublicRoute, inventPrivateRoute } from "../pages/inventory/route";

const router = createBrowserRouter([
  {
    path: ROUTE_PATHS.ROOT,
    element: <Navigate to={ROUTE_PATHS.HOME} replace />,
  },
  {
    path: ROUTE_PATHS.ROOT,
    element: <DefaultLayout />,
    errorElement: <ErrorLayout />,
    children: [
      ...authRoute,
      ...inventPublicRoute
    ]
  },
  {
    path: ROUTE_PATHS.ROOT,
    element: <DefaultLayout />,
    errorElement: <ErrorLayout />,
    children: [
      ...inventPrivateRoute
    ]
  },
]);

export default router;
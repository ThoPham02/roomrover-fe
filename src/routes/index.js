import { createBrowserRouter, Navigate } from "react-router-dom";

import { ROUTE_PATHS } from "../common/path";
import { authRoute } from "../pages/auth/route";
import { AuthLayout, DefaultLayout, ErrorLayout, ManageLayout } from "../components/layouts";
import {
  inventPublicRoute,
  inventPrivateRoute,
} from "../pages/inventory/route";
import {
  contractPrivateRoute,
  contractPublicRoute,
} from "../pages/contract/route";
import {
  paymentPrivateRoute,
  paymentPublicRoute,
} from "../pages/payment/route";

const router = createBrowserRouter([
  {
    path: ROUTE_PATHS.ROOT,
    element: <Navigate to={ROUTE_PATHS.HOME} replace />,
  },
  {
    path: ROUTE_PATHS.ROOT,
    element: <AuthLayout />,
    errorElement: <ErrorLayout />,
    children: [...authRoute],
  },
  {
    path: ROUTE_PATHS.ROOT,
    element: <DefaultLayout />,
    errorElement: <ErrorLayout />,
    children: [
      ...inventPublicRoute,
      ...contractPublicRoute,
      ...paymentPublicRoute,
    ],
  },
  {
    path: ROUTE_PATHS.ROOT,
    element: <ManageLayout />,
    errorElement: <ErrorLayout />,
    children: [
      ...inventPrivateRoute,
      ...contractPrivateRoute,
      ...paymentPrivateRoute,
    ],
  },
]);

export default router;

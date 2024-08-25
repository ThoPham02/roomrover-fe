import { createBrowserRouter, Navigate } from "react-router-dom";

import { ROUTE_PATHS } from "../common/path";
import { authRoute } from "../pages/auth/route";
import { DefaultLayout, ErrorLayout } from "../components/layouts";
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
    element: <DefaultLayout />,
    errorElement: <ErrorLayout />,
    children: [
      ...authRoute,
      ...inventPublicRoute,
      ...contractPublicRoute,
      ...paymentPublicRoute,
    ],
  },
  {
    path: ROUTE_PATHS.ROOT,
    element: <DefaultLayout />,
    errorElement: <ErrorLayout />,
    children: [
      ...inventPrivateRoute,
      ...contractPrivateRoute,
      ...paymentPrivateRoute,
    ],
  },
]);

export default router;

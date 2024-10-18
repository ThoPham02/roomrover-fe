import { createBrowserRouter, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import { AuthLayout, ErrorLayout, ManageLayout } from "../components/layouts";
import { ROUTE_PATHS } from "../common/path";
import {
  authLessorRoute,
  authRenterRoute,
  authRoute,
} from "../pages/auth/route";
import {
  inventPublicRoute,
  inventLessorRoute,
  inventRenterRoute,
} from "../pages/inventory/route";
import {
  contractLessorRoute,
  contractRenterRoute,
} from "../pages/contract/route";
import { paymentLessorRoute, paymentRenterRoute } from "../pages/payment/route";
import { notificaionPrivateRoute } from "../pages/notification/route";
import { publicRoute } from "../pages/public/route";
import { contactLessorRoute } from "../pages/contact/route";

const ProtectedRoute = ({
  element,
  allowedRoles,
  redirectPath = ROUTE_PATHS.ROOT,
}) => {
  const { user } = useSelector((state) => state.auth);

  return user && allowedRoles.includes(user.role ? user.role : 2) ? (
    element
  ) : (
    <Navigate to={redirectPath} replace />
  );
};

const renterRoutes = [
  ...authRenterRoute,
  ...inventRenterRoute,
  ...contractRenterRoute,
  ...paymentRenterRoute,
];

const lessorRoutes = [
  ...authLessorRoute,
  ...inventLessorRoute,
  ...contractLessorRoute,
  ...paymentLessorRoute,
  ...contactLessorRoute,
  ...notificaionPrivateRoute,
];

const router = createBrowserRouter([
  // Public routes
  {
    path: ROUTE_PATHS.ROOT,
    element: <AuthLayout />,
    errorElement: <ErrorLayout />,
    children: [...authRoute, ...inventPublicRoute, ...publicRoute],
  },
  // Routes for role = 4 (Lessor role)
  {
    path: ROUTE_PATHS.ROOT,
    element: <ProtectedRoute element={<ManageLayout />} allowedRoles={[4]} />,
    errorElement: <ErrorLayout />,
    children: lessorRoutes,
  },
  // Routes for role = 2 (Renter role)
  {
    path: ROUTE_PATHS.ROOT,
    element: <ProtectedRoute element={<ManageLayout />} allowedRoles={[2]} />,
    errorElement: <ErrorLayout />,
    children: renterRoutes,
  },
]);

export default router;

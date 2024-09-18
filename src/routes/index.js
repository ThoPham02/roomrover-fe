import { createBrowserRouter, Navigate } from "react-router-dom";
import { ROUTE_PATHS } from "../common/path";
import { authPrivateRoute, authRoute } from "../pages/auth/route";
import {
  AuthLayout,
  DefaultLayout,
  ErrorLayout,
  ManageLayout,
} from "../components/layouts";
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
import { useSelector } from "react-redux";

const ProtectedRoute = ({
  element,
  allowedRoles,
  redirectPath = ROUTE_PATHS.HOME,
}) => {
  const { user } = useSelector((state) => state.auth);

  return user && allowedRoles.includes(user.role ? user.role : 1) ? (
    element
  ) : (
    <Navigate to={redirectPath} replace />
  );
};

const router = createBrowserRouter([
  // Public routes
  {
    path: ROUTE_PATHS.ROOT,
    element: <AuthLayout />,
    errorElement: <ErrorLayout />,
    children: [...authRoute, ...inventPublicRoute],
  },
  // Routes for users
  {
    path: ROUTE_PATHS.ROOT,
    element: (
      <ProtectedRoute element={<DefaultLayout />} allowedRoles={[1, 4]} />
    ),
    errorElement: <ErrorLayout />,
    children: [...contractPublicRoute, ...paymentPublicRoute],
  },
  // Routes for admin
  {
    path: ROUTE_PATHS.ROOT,
    element: <ProtectedRoute element={<ManageLayout />} allowedRoles={[4]} />,
    errorElement: <ErrorLayout />,
    children: [
      ...authPrivateRoute,
      ...inventPrivateRoute,
      ...contractPrivateRoute,
      ...paymentPrivateRoute,
    ],
  },
  // Default redirect to home if no other routes match
  {
    path: "*",
    element: <Navigate to={ROUTE_PATHS.HOME} replace />,
  },
]);

export default router;

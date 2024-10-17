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
import { notificaionPrivateRoute } from "../pages/notification/route";
import { publicRoute } from "../pages/public/route";
import { contactPrivateRoute } from "../pages/contact/route";

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

// Define admin routes
const adminRoutes = [
  ...authPrivateRoute,
  ...inventPrivateRoute,
  ...contractPrivateRoute,
  ...paymentPrivateRoute,
  ...notificaionPrivateRoute,
  ...contactPrivateRoute,
];

// Define user routes (role 2)
const userRoutes = [
  ...contractPublicRoute,
  ...paymentPublicRoute,
];

const router = createBrowserRouter([
  // Public routes
  {
    path: ROUTE_PATHS.ROOT,
    element: <AuthLayout />,
    errorElement: <ErrorLayout />,
    children: [...authRoute, ...inventPublicRoute, ...publicRoute],
  },
  // Routes for role = 2 (User)
  {
    path: ROUTE_PATHS.USER,
    element: <ProtectedRoute element={<ManageLayout />} allowedRoles={[2]} />,
    errorElement: <ErrorLayout />,
    children: userRoutes,
  },
  // Routes for role = 4 (Admin)
  {
    path: ROUTE_PATHS.ADMIN,
    element: <ProtectedRoute element={<ManageLayout />} allowedRoles={[4]} />,
    errorElement: <ErrorLayout />,
    children: adminRoutes,
  },
]);

export default router;

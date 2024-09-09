import { createBrowserRouter, Navigate } from "react-router-dom";
import { ROUTE_PATHS } from "../common/path";
import { authPrivateRoute, authRoute } from "../pages/auth/route";
import { AuthLayout, DefaultLayout, ErrorLayout, ManageLayout } from "../components/layouts";
import { inventPublicRoute, inventPrivateRoute } from "../pages/inventory/route";
import { contractPrivateRoute, contractPublicRoute } from "../pages/contract/route";
import { paymentPrivateRoute, paymentPublicRoute } from "../pages/payment/route";
import { useSelector } from "react-redux";

// ProtectedRoute component to handle role-based access
const ProtectedRoute = ({ element, allowedRoles, redirectPath = ROUTE_PATHS.HOME }) => {
  // Moved useSelector inside ProtectedRoute to adhere to React Hooks rules
  const { user } = useSelector((state) => state.auth);
  const userRole = user.role ? user.role : 1;

  // Check if the user's role is allowed
  return allowedRoles.includes(userRole) ? element : <Navigate to={redirectPath} replace />;
};

const router = createBrowserRouter([
  // Public routes accessible to everyone
  {
    path: ROUTE_PATHS.ROOT,
    element: <AuthLayout />,
    errorElement: <ErrorLayout />,
    children: [...authRoute],
  },
  // Routes for users
  {
    path: ROUTE_PATHS.ROOT,
    element: <ProtectedRoute element={<DefaultLayout />} allowedRoles={[1, 4]} />,
    errorElement: <ErrorLayout />,
    children: [
      ...inventPublicRoute,
      ...contractPublicRoute,
      ...paymentPublicRoute,
    ],
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

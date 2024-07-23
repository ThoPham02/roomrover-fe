import { AUTH_PATHS } from "./constants";

import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import ProfileScreen from "./screens/ProfileScreen";

export const authRoutes = [
  {
    id: "login",
    path: AUTH_PATHS.LOG_IN,
    element: <LoginScreen />,
  },
  {
    id: "register",
    path: AUTH_PATHS.REGISTER,
    element: <RegisterScreen />,
  },
  {
    id: "profile",
    path: AUTH_PATHS.PROFILE,
    element: <ProfileScreen />,
  }
];

import { ROUTE_PATHS } from "../../common/path";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import UserSetting from "./UserSetting";

export const authRoute = [
  {
    id: "login",
    path: ROUTE_PATHS.LOGIN,
    element: <LoginScreen />,
  },
  {
    id: "register",
    path: ROUTE_PATHS.REGISTER,
    element: <RegisterScreen />,
  },
];

export const authPrivateRoute = [
  {
    id: "user-settings",
    path: ROUTE_PATHS.USER_SETTINGS,
    element: <UserSetting />,
  },  
];

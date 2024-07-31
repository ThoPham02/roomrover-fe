import { ROUTE_PATHS } from "../common/path";
import LoginScreen from "../pages/auth/LoginScreen";
import RegisterScreen from "../pages/auth/RegisterScreen";
import HomeScreen from "../pages/inventory/HomeScreen";

const publicRoutes = [
    { path: ROUTE_PATHS.HOME, element: HomeScreen },
    { path: ROUTE_PATHS.INVENTORY, element: HomeScreen },
    { path: ROUTE_PATHS.ERROR, element: HomeScreen },
    { path: ROUTE_PATHS.LOGIN, element: LoginScreen },
    { path: ROUTE_PATHS.REGISTER, element: RegisterScreen },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };

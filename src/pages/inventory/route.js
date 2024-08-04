import { ROUTE_PATHS } from "../../common/path";
import HomeScreen from "./HomeScreen";

export const inventPublicRoute = [
  {
    id: "home",
    path: ROUTE_PATHS.HOME,
    element: <HomeScreen />,
  },
];

export const inventPrivateRoute = [];

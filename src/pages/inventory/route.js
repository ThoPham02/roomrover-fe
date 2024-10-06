import { ROUTE_PATHS } from "../../common/path";
import HomeScreen from "./HomeScreen";
import HouseCreate from "./HouseCreate";
import HouseDetail from "./HouseDetail";
import HouseScreen from "./HouseScreen";
import HouseUpdate from "./HouseUpdate";

export const inventPublicRoute = [
  {
    id: "home",
    path: ROUTE_PATHS.HOME,
    element: <HomeScreen />,
  },
];

export const inventPrivateRoute = [
  {
    id: "dashboard",
    path: ROUTE_PATHS.DASHBOARD,
    element: <HomeScreen />,
  },
  {
    id: "inventory",
    path: ROUTE_PATHS.INVENTORY,
    element: <HouseScreen />,
  },
  {
    id: "house_detail",
    path: ROUTE_PATHS.HOUSE_DETAIL,
    element: <HouseDetail />,
  },
  {
    id: "house_create",
    path: ROUTE_PATHS.HOUSE_CREATE,
    element: <HouseCreate />,
  },
  {
    id: "house_update",
    path: ROUTE_PATHS.HOUSE_UPDATE,
    element: <HouseUpdate />,
  },
];

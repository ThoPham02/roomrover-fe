import { ROUTE_PATHS } from "../../common/path";
import HomeScreen from "./HomeScreen";
import HouseCreate from "./HouseCreate";
import HouseDetail from "./HouseDetail";
import HouseScreen from "./HouseScreen";

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
    element: <HouseCreate />,
  },
  {
    id: "contract",
    path: ROUTE_PATHS.CONTRACT,
    element: <HomeScreen />,
  },
  {
    id: "payment",
    path: ROUTE_PATHS.PAYMENT,
    element: <HomeScreen />,
  },
  {
    id: "notification",
    path: ROUTE_PATHS.NOTIFICATION,
    element: <HomeScreen />,
  },
];

import { ROUTE_PATHS } from "../../common/path";
import HomeScreen from "./HomeScreen";
import HouseCreate from "./HouseCreate";
import HouseDetail from "./HouseDetail";
import HouseScreen from "./house/HouseScreen";
import HouseUpdate from "./HouseUpdate";
import RoomScreen from "./room/RoomScreen";

export const inventPublicRoute = [];

export const inventRenterRoute = [
  {
    id: "dashboard_renter",
    path: ROUTE_PATHS.RENTER_DASHBOARD,
    element: <HomeScreen />,
  },
  {
    id: "home_renter",
    path: ROUTE_PATHS.HOME,
    element: <HomeScreen />,
  },
];

export const inventLessorRoute = [
  {
    id: "dashboard_lessor",
    path: ROUTE_PATHS.DASHBOARD,
    element: <HomeScreen />,
  },
  {
    id: "inventory",
    path: ROUTE_PATHS.HOUSE,
    element: (
      <div className="p-3 bg-white rounded">
        <HouseScreen />
      </div>
    ),
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

  {
    id: "admin_room",
    path: ROUTE_PATHS.ROOM,
    element: (
      <div className="p-3 bg-white rounded">
        <RoomScreen />
      </div>
    ),
  },
];

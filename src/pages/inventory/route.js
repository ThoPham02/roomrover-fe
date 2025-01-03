import { ROUTE_PATHS } from "../../../src/common/path";
import HouseCreate from "./house/HouseCreate";
import HouseScreen from "./house/HouseScreen";
import RoomScreen from "./room/RoomScreen";
import HouseDetail from "./house/HouseDetail";
import DashboardScreen from "./DashboardScreen";
import RoomDetail from "./room/RoomDetail";
import RenterDashboardScreen from "./RenterDashboardScreen";

export const inventRenterRoute = [
  {
    id: "dashboard_renter",
    path: ROUTE_PATHS.RENTER_DASHBOARD,
    element: <RenterDashboardScreen />,
  },
  {
    id: "home_renter",
    path: ROUTE_PATHS.HOME,
    element: <RenterDashboardScreen />,
  },
];

export const inventLessorRoute = [
  {
    id: "dashboard_lessor",
    path: ROUTE_PATHS.DASHBOARD,
    element: <DashboardScreen />,
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
    element: (
      <div className="p-3 bg-white rounded">
        <HouseDetail type="get" />
      </div>
    ),
  },
  {
    id: "house_create",
    path: ROUTE_PATHS.HOUSE_CREATE,
    element: (
      <div className="p-3 bg-white rounded">
        <HouseCreate />
      </div>
    ),
  },
  {
    id: "house_update",
    path: ROUTE_PATHS.HOUSE_UPDATE,
    element: (
      <div className="p-3 bg-white rounded">
        <HouseDetail type="update" />
      </div>
    ),
  },

  {
    id: "lessor_room_screen",
    path: ROUTE_PATHS.ROOM,
    element: (
      <div className="p-3 bg-white rounded">
        <RoomScreen />
      </div>
    ),
  },
  {
    id: "lessor_room_detail",
    path: ROUTE_PATHS.ROOM_DETAIL,
    element: (
      <div className="p-3 bg-white rounded">
        <RoomDetail type="get" />
      </div>
    ),
  },
];

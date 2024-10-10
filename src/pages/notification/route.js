import { ROUTE_PATHS } from "../../common";
import NotificationScreen from "./NotificationScreen";

export const notificaionPublicRoute = [];

export const notificaionPrivateRoute = [
  {
    id: "notificaion_screen",
    path: ROUTE_PATHS.NOTIFICATION,
    element: <NotificationScreen />,
  },
];

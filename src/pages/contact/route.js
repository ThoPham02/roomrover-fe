import { ROUTE_PATHS } from "../../common";
import ContactScreen from "./ContactScreen";

export const contactPrivateRoute = [
  {
    id: "contact_screen",
    path: ROUTE_PATHS.CONTACT,
    element: <ContactScreen />,
  },
];

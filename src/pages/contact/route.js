import { ROUTE_PATHS } from "../../common";
import ContactScreen from "./ContactScreen";
import RenterContactScreen from "./RenterContactScreen";

export const contactRenterRoute = [
  {
    id: "renter_contact_screen",
    path: ROUTE_PATHS.RENTER_CONTACT,
    element: (
      <div className="p-3 bg-white rounded">
        <RenterContactScreen />
      </div>
    ),
  },
];

export const contactLessorRoute = [
  {
    id: "contact_screen",
    path: ROUTE_PATHS.CONTACT,
    element: (
      <div className="p-3 bg-white rounded">
        <ContactScreen />
      </div>
    ),
  },
];

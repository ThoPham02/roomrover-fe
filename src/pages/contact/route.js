import { ROUTE_PATHS } from "../../common";
import CalenderScreen from "./CalendarScreen";
import ContactScreen from "./ContactScreen";
import RenterCalenderScreen from "./RenterCalenderScreen";

export const contactRenterRoute = [
  {
    id: "renter_calendar_screen",
    path: ROUTE_PATHS.RENTER_CALENDAR,
    element: (
      <div className="p-3 bg-white rounded">
        <RenterCalenderScreen />
      </div>
    ),
  },
];

export const contactLessorRoute = [
  {
    id: "calendar_screen",
    path: ROUTE_PATHS.CALENDAR,
    element: (
      <div className="p-3 bg-white rounded">
        <CalenderScreen />
      </div>
    ),
  },
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

import { ROUTE_PATHS } from "../../common";
import PaymentScreen from "./PaymentScreen";

export const paymentRenterRoute = [
  {
    id: "payment_screen_renter",
    path: ROUTE_PATHS.RENTER_PAYMENT,
    element: (
      <div className="p-3 bg-white rounded">
        <PaymentScreen />
      </div>
    ),
  },
];

export const paymentLessorRoute = [
  {
    id: "payment_screen_lessor",
    path: ROUTE_PATHS.PAYMENT,
    element: (
      <div className="p-3 bg-white rounded">
        <PaymentScreen />
      </div>
    ),
  },
];

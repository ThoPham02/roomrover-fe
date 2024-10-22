import { ROUTE_PATHS } from "../../common";
import PaymentDetail from "./PaymentDetail";
import PaymentScreen from "./PaymentScreen";
import RenterPaymentScreen from "./RenterPaymentScreen";

export const paymentRenterRoute = [
  {
    id: "payment_screen_renter",
    path: ROUTE_PATHS.RENTER_PAYMENT,
    element: (
      <div className="p-3 bg-white rounded">
        <RenterPaymentScreen />
      </div>
    ),
  },
  {
    id: "payment_detail_renter",
    path: ROUTE_PATHS.RENTER_PAYMENT_DETAIL,
    element: (
      <div className="p-3 bg-white rounded">
        <RenterPaymentScreen />
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
  {
    id: "payment_deatail_lessor",
    path: ROUTE_PATHS.PAYMENT,
    element: (
      <div className="p-3 bg-white rounded">
        <PaymentDetail />
      </div>
    ),
  },
];

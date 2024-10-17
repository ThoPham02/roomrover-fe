import { ROUTE_PATHS } from "../../common";
import PaymentScreen from "./PaymentScreen";

export const paymentPublicRoute = [];

export const paymentPrivateRoute = [
  {
    id: "payment_screen",
    path: ROUTE_PATHS.PAYMENT,
    element: (
      <div className="p-3 bg-white rounded">
        <PaymentScreen />
      </div>
    ),
  },
];

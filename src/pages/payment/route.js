import { ROUTE_PATHS } from "../../common";
import PaymentScreen from "./PaymentScreen";

export const paymentPublicRoute = [];

export const paymentPrivateRoute = [
  {
    id: "payment_screen",
    path: ROUTE_PATHS.PAYMENT,
    element: <PaymentScreen />,
  },
];

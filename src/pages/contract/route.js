import { ROUTE_PATHS } from "../../common";
import ContractCreate from "./ContractCreate";
import ContractScreen from "./ContractScreen";

export const contractPublicRoute = [];

export const contractPrivateRoute = [
  {
    id: "contract_screen",
    path: ROUTE_PATHS.CONTRACT,
    element: <ContractScreen />,
  },
  {
    id: "contract_create",
    path: ROUTE_PATHS.CONTRACT_CREATE,
    element: <ContractCreate />,
  }
];

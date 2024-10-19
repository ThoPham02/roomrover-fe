import { ROUTE_PATHS } from "../../common";
import ContractCreate from "./ContractCreate";
import ContractScreen from "./ContractScreen";

export const contractRenterRoute = [
  {
    id: "renter_contract_screen",
    path: ROUTE_PATHS.RENTER_CONTRACT,
    element: <ContractScreen />,
  },
];

export const contractLessorRoute = [
  {
    id: "contract_screen",
    path: ROUTE_PATHS.CONTRACT,
    element: <ContractScreen />,
  },
  {
    id: "contract_create",
    path: ROUTE_PATHS.CONTRACT_CREATE,
    element: <ContractCreate />,
  },
];

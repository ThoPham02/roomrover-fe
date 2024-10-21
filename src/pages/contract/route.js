import { ROUTE_PATHS } from "../../common";
import ContractCreate from "./ContractCreate";
import Contract from "./ContractFile";
import ContractScreen from "./ContractScreen";

export const contractRenterRoute = [
  {
    id: "renter_contract_screen",
    path: ROUTE_PATHS.RENTER_CONTRACT,
    element: (
      <div className="p-3 bg-white rounded">
        <ContractScreen />
      </div>
    ),
  },
];

export const contractLessorRoute = [
  {
    id: "contract_screen",
    path: ROUTE_PATHS.CONTRACT,
    element: (
      <div className="p-3 bg-white rounded">
        <Contract />
      </div>
    ),
  },
  {
    id: "contract_create",
    path: ROUTE_PATHS.CONTRACT_CREATE,
    element: (
      <div className="p-3 bg-white rounded">
        <ContractCreate />
      </div>
    ),
  },
];

import { ROUTE_PATHS } from "../../common";
import ContractCreate from "./ContractCreate";
import ContractDetail from "./ContractDetail";
import ContractScreen from "./ContractScreen";
import RenterContractDetail from "./RenterContractDetail";
import RenterContractScreen from "./RenterContractScreen";

export const contractRenterRoute = [
  {
    id: "renter_contract_screen",
    path: ROUTE_PATHS.RENTER_CONTRACT,
    element: (
      <div className="p-3 bg-white rounded">
        <RenterContractScreen />
      </div>
    ),
  },
  {
    id: "renter_contract_detail",
    path: ROUTE_PATHS.RENTER_CONTRACT_DETAIL,
    element: (
      <div className="p-3 bg-white rounded">
        <RenterContractDetail />
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
        <ContractScreen />
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
  {
    id: "contract_detail",
    path: ROUTE_PATHS.CONTRACT_DETAIL,
    element: (
      <div className="p-3 bg-white rounded">
        <ContractDetail />
      </div>
    ),
  },
];

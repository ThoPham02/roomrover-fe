import { ROUTE_PATHS } from "../../common";
import BoardingHouseDetail from "./HouseDetail";
import ListHousePublic from "./ListHousePublic";

export const publicRoute = [
  {
    id: "list_house_public",
    path: ROUTE_PATHS.ROOT,
    element: <ListHousePublic />,
  },
  {
    id: "house_detail_public",
    path: ROUTE_PATHS.HOUSE_DETAIL_PUBLIC,
    element: <BoardingHouseDetail />,
  },
];

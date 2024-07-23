import { INVENT_PATHS } from "./constants";
import FilterHome from "./screen/FilterHome";

export const inventRoutes = [
  {
    id: "home",
    path: INVENT_PATHS.HOME,
    element: <FilterHome />,
  },
];

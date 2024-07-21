// import { lazy } from "react";

import { INVENT_PATHS } from "./const";
import FilterHome from "./screen/FilterHome";

// const LoginScreen = lazy(() => import("./screens/LoginScreen"));
// const RegisterScreen = lazy(() => import("./screens/RegisterScreen"));

export const inventRoutes = [
  {
    id: "home",
    path: INVENT_PATHS.HOME,
    element: <FilterHome />,
  },
];

import { Route, Router, Routes } from "react-router-dom";

import DefaultLayout from "../components/layouts/DefaultLayout";
import { privateRoutes, publicRoutes } from "./route";

function AppRoute() {
  const role = 0
  
  return (
    <Router>
      <Routes>
        {publicRoutes.map((route, index) => {
          const Layout = route.Layout || DefaultLayout;
          const Page = route.component;
          return (
            <Route
              key={index}
              path={route.path}
              element={
                <Layout>
                  <Page />
                </Layout>
              }
            />
          );
        })}
        {privateRoutes
          .filter((route) => route.role === role)
          .map((route, index) => {
            const Layout = route.Layout || DefaultLayout;
            const Page = route.component;
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}
      </Routes>
    </Router>
  );
}

export default AppRoute;
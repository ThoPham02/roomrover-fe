import { Breadcrumb } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

import { BREADCRUMB_DETAIL, ROUTE_PATHS } from "../../common";

const Breadcrumbs = () => {
  const location = useLocation();
  let pathnames = location.pathname.split("/").filter((x) => x);

  const lastPathName =
    pathnames.length > 0 ? `/${pathnames[pathnames.length - 1]}` : "";
  const isAdminRoute = (pathname) => pathname.startsWith("/admin");

  const defaultBackRoute = isAdminRoute(location.pathname)
    ? ROUTE_PATHS.DASHBOARD
    : ROUTE_PATHS.HOME;

  pathnames = pathnames.filter((name) => name !== "admin");

  return (
    <div>
      {lastPathName && (
        <h1 className="font-bold text-3xl mb-1">
          {BREADCRUMB_DETAIL[lastPathName]}
        </h1>
      )}

      <Breadcrumb>
        <Breadcrumb.Item
          linkAs={Link}
          linkProps={{ to: defaultBackRoute }}
          className="text-blue-700"
        >
          {isAdminRoute(location.pathname) ? "Dashboard" : "Trang chủ"}
        </Breadcrumb.Item>
        {pathnames.map((name, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          return isLast ? (
            <Breadcrumb.Item active key={name} className="text-blue-700">
              {BREADCRUMB_DETAIL[routeTo] || name}
            </Breadcrumb.Item>
          ) : (
            <Breadcrumb.Item
              linkAs={Link}
              linkProps={{ to: routeTo }}
              key={name}
            >
              {BREADCRUMB_DETAIL[routeTo] || name}
            </Breadcrumb.Item>
          );
        })}
      </Breadcrumb>
    </div>
  );
};

export default Breadcrumbs;

export const API_URL = {
  LOGIN: "auth/login",
};

export const ROUTE_PATHS = {
  ROOT: "/",
  LOGIN: "/login",
  REGISTER: "/register",

  // user routes
  HOME: "/home",
  INVENTORY: "/inventory",
  ERROR: "/error",

  // admin routes
  DASHBOARD: "/admin/dashboard",
  ADMIN_INVENTORY: "/admin/inventory",
  ADMIN_SETTINGS: "/admin/settings",
};

export const BREADCRUMB_DETAIL = {
  [ROUTE_PATHS.HOME]: "Trang chủ",
  [ROUTE_PATHS.INVENTORY]: "Quản lý kho",
  [ROUTE_PATHS.ERROR]: "Lỗi",
  [ROUTE_PATHS.DASHBOARD]: "Dashboard",
  [ROUTE_PATHS.ADMIN_INVENTORY]: "Quản lý kho (Admin)",
  [ROUTE_PATHS.ADMIN_SETTINGS]: "Cài đặt (Admin)",
};

export const API_URL = {
  LOGIN: "auth/login",
};

export const ROUTE_PATHS = {
  // public routes
  ROOT: "/",
  LOGIN: "/login",
  REGISTER: "/register",

  // user routes
  HOME: "/home",
  ERROR: "/error",
  USER_SETTINGS: "/user-settings",

  // admin routes
  DASHBOARD: "/dashboard",
  INVENTORY: "/inventory",
  HOUSE_DETAIL: "/house-detail/:id",
  CONTRACT: "/contract",
  PAYMENT: "/payment",
  NOTIFICATION: "/notification",
  SETTINGS: "/settings",
};

export const BREADCRUMB_DETAIL = {
  [ROUTE_PATHS.HOME]: "Trang chủ",
  [ROUTE_PATHS.ERROR]: "Lỗi",

  [ROUTE_PATHS.DASHBOARD]: "Dashboard",
  [ROUTE_PATHS.INVENTORY]: "Nhà trọ",
  [ROUTE_PATHS.HOUSE_DETAIL]: "Chi tiết nhà trọ",
  [ROUTE_PATHS.CONTRACT]: "Hợp đồng",
  [ROUTE_PATHS.PAYMENT]: "Thanh toán",
  [ROUTE_PATHS.NOTIFICATION]: "Thông báo",
  [ROUTE_PATHS.SETTINGS]: "Cài đặt",
};

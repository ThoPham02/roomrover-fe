export const API_URL = {
  LOGIN: "auth/login",
};

export const ROUTE_PATHS = {
  // public routes
  ROOT: "/",
  HOUSE_DETAIL_PUBLIC: "/house-detail/:id",
  LOGIN: "/login",
  REGISTER: "/register",

  // user routes
  HOME: "/home",
  ERROR: "/error",
  USER_SETTINGS: "/user-settings",

  // admin routes
  DASHBOARD: "/dashboard",
  INVENTORY: "/inventory",
  HOUSE_DETAIL: "/admin-house-detail/:id",
  HOUSE_UPDATE: "/house-update/:id",
  HOUSE_CREATE: "/house-create",

  CONTRACT: "/contract",
  CONTRACT_CREATE: "/contract-create",

  PAYMENT: "/payment",
  NOTIFICATION: "/notification",
  SETTINGS: "/settings",
};

export const BREADCRUMB_DETAIL = {
  [ROUTE_PATHS.HOME]: "Trang chủ",
  [ROUTE_PATHS.ERROR]: "Lỗi",

  CREATE: "Tạo mới",
  UPDATE: "Cập nhật",
  DETAIL: "Chi tiết",

  [ROUTE_PATHS.DASHBOARD]: "Dashboard",
  [ROUTE_PATHS.INVENTORY]: "Danh sách nhà trọ",
  [ROUTE_PATHS.CONTRACT]: "Danh sách hợp đồng",
  [ROUTE_PATHS.PAYMENT]: "Hóa đơn thanh toán",
  [ROUTE_PATHS.NOTIFICATION]: "Thông báo",
  [ROUTE_PATHS.SETTINGS]: "Cài đặt",
};

export const API_URL = {
  LOGIN: "auth/login",
};

export const ROUTE_PATHS = {
  // public routes
  ROOT: "/",
  HOUSE_DETAIL_PUBLIC: "/house-detail/:id",
  LOGIN: "/login",
  REGISTER: "/register",
  HOME: "/home",
  ERROR: "/error",
  USER_SETTINGS: "/user-settings",

  // renter routes
  RENTER_DASHBOARD: "/renter/dashboard",
  RENTER_CONTRACT: "/renter/contract",
  RENTER_CONTRACT_DETAIL: "/renter/contract-detail/:id",
  RENTER_CONTACT: "/renter/contact",

  RENTER_PAYMENT: "/renter/payment",
  RENTER_PAYMENT_DETAIL: "/renter/payment-detail/:id",
  RENTER_USER_SETTINGS: "/renter/user-settings",

  // lessor routes
  DASHBOARD: "/lessor/dashboard",

  ROOM: "/lessor/room",
  ROOM_DETAIL: "/lessor/room-detail/:id",

  HOUSE: "/lessor/house",
  HOUSE_DETAIL: "/lessor/house-detail/:id",
  HOUSE_UPDATE: "/lessor/house-update/:id",
  HOUSE_CREATE: "/lessor/house-create",

  CONTRACT: "/lessor/contract",
  CONTRACT_CREATE: "/lessor/contract-create",
  CONTRACT_DETAIL: "/lessor/contract-detail/:id",
  CONTRACT_UPDATE: "/lessor/contract-update/:id",

  CONTACT: "/contact",

  PAYMENT: "/payment",
  PAYMENT_DETAIL: "/payment-detail/:id",

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
  [ROUTE_PATHS.HOUSE]: "Danh sách nhà trọ",
  [ROUTE_PATHS.ROOM]: "Danh sách phòng trọ",
  [ROUTE_PATHS.CONTRACT]: "Danh sách hợp đồng",
  [ROUTE_PATHS.PAYMENT]: "Hóa đơn thanh toán",
  [ROUTE_PATHS.CONTACT]: "Liên hệ",
  [ROUTE_PATHS.NOTIFICATION]: "Thông báo",
  [ROUTE_PATHS.SETTINGS]: "Cài đặt",
};

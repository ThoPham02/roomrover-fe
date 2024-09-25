export const API_METHOD = {
  GET: "get",
  POST: "post",
  PUT: "put",
  DELETE: "delete",
};

export const USER_ROLES = {
  RENTER: 2, // nguoi thue
  LESSOR: 4, // nguoi cho thue
};

export const HOUSE_TYPE = {
  1: { name: "Phòng trọ" },
  2: { name: "Nhà chung chủ " },
  4: { name: "Chung cư" },
  8: { name: "Ký túc xá" },
};

export const HOUSE_SERVICE_TYPE = {
  1: { name: "Giá/Tháng" },
  2: { name: "Giá/Người" },
  4: { name: "Số lượng sử dụng" },
};

export const PAGE_SIZE = 20;

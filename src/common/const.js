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

export const PAGE_SIZE = 10;

export const GENDER_TYPE = {
  1: { name: "Nam" },
  2: { name: "Nữ" },
  4: { name: "Khác" },
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

export const HOUSE_ROOM_STATUS = {
  1: { name: "Chờ xác nhận" },
  2: { name: "Sẵn sàng cho thuê" },
  4: { name: "Đã được thuê" },
  8: { name: "Sắp hết hạn" },
  16: { name: "Tìm nhượng" },
};

export const CONTRACT_STATUS = {
  1: { name: "Chờ xác nhận" },
  2: { name: "Chờ cọc" },
  4: { name: "Đang thuê" },
  8: { name: "Đã hết hạn" },
  16: { name: "Đã hủy" },
};

export const CONTRACT_STATUS_CODE = {
  WAITING: 1,
  WAITING_DEPOSIT: 2,
  RENTING: 4,
  EXPIRED: 8,
  CANCELED: 16,
}

export const SERVICE_UNIT = {
  1: { name: "Tháng" },
  2: { name: "Người / Tháng" },
  4: { name: "Đơn vị tiêu thụ / Tháng" },
};

export const MAP_PRICE = [
  {
    priceFrom: 0,
    priceTo: 999999,
    label: "Dưới 1 triệu",
  },
  {
    priceFrom: 100000,
    priceTo: 1999999,
    label: "Từ 1 - 2 triệu",
  },
  {
    priceFrom: 2000000,
    priceTo: 2999999,
    label: "Từ 2 - 3 triệu",
  },
  {
    priceFrom: 3000000,
    priceTo: 4999999,
    label: "Từ 3 - 5 triệu",
  },
  {
    priceFrom: 5000000,
    priceTo: 6999999,
    label: "Từ 5 - 7 triệu",
  },
  {
    priceFrom: 7000000,
    priceTo: 9999999,
    label: "Từ 7 - 10 triệu",
  },
  {
    priceFrom: 10000000,
    priceTo: 14999999,
    label: "Từ 10 - 15 triệu",
  },
  {
    priceFrom: 15000000,
    priceTo: 9999999999,
    label: "Trên 15 triệu",
  },
];

export const MAP_AREA = [
  {
    areaFrom: 0,
    areaTo: 19,
    label: "Dưới 20m²",
  },
  {
    areaFrom: 20,
    areaTo: 29,
    label: "Từ 20 - 30m²",
  },
  {
    areaFrom: 30,
    areaTo: 49,
    label: "Từ 30 - 50m²",
  },
  {
    areaFrom: 50,
    areaTo: 69,
    label: "Từ 50 - 70m²",
  },
  {
    areaFrom: 70,
    areaTo: 89,
    label: "Từ 70 - 90m²",
  },
  {
    areaFrom: 90,
    areaTo: 9999999999,
    label: "Trên 90m²",
  },
];

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
  1: { name: "Trống" },
  2: { name: "Đã thuê" },
  4: { name: "Đã đặt cọc" },
  8: { name: "Đã hết hạn" },
};

export const PAGE_SIZE = 10;

export const ContractStatusComponent = {
  1: <p className="px-2 py-1 rounded inline-block text-center bg-gray-300">Chờ xác nhận</p>,
  2: <p className="px-2 py-1 rounded inline-block text-center bg-cyan-300">Chờ cọc</p>,
  4: <p className="px-2 py-1 rounded inline-block text-center bg-emerald-300">Đang thuê</p>,
  8: <p className="px-2 py-1 rounded inline-block text-center bg-yellow-300">Đã hết hạn</p>,
  16: <p className="px-2 py-1 rounded inline-block text-center bg-rose-500">Đã hủy</p>,
};

export const CONTRACT_STATUS = {
  1: {name: "Chờ xác nhận"},
  2: {name: "Chờ cọc"},
  4: {name: "Đang thuê"},
  8: {name: "Đã hết hạn"},
  16: {name: "Đã hủy"},
}

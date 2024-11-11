import {
  GiClothesline, // Sân phơi đồ
  GiCookingPot, // Bếp
  GiWashingMachine, // Máy giặt
} from "react-icons/gi";

import {
  MdChair, // Nội thất
  MdSecurity, // Dịch vụ bảo vệ
} from "react-icons/md";

import {
  GrElevator, // Thang máy
} from "react-icons/gr";

import {
  FaVideo, // Camera an ninh
  FaParking, // Chỗ để xe
  FaFan, // Điều hòa và quạt
  FaHotTub, // Nóng lạnh
  FaToilet,
  FaFingerprint, // Vệ sinh khép kín
} from "react-icons/fa";

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

export const HOUSE_STATUS = {
  1: { name: "Chờ xác nhận" },
  2: { name: "Đang hoạt động" },
  4: { name: "Tạm dừng" },
  8: { name: "Hết phòng" },
};

export const HOUSE_ROOM_STATUS = {
  1: { name: "Chờ xác nhận" },
  2: { name: "Sẵn sàng thuê" },
  4: { name: "Đã được thuê" },
  8: { name: "Tạm dừng" },
};

export const CONTRACT_STATUS = {
  1: { name: "Chờ xác nhận" },
  2: { name: "Chờ cọc" },
  4: { name: "Đang thuê" },
  8: { name: "Đã hết hạn" },
  16: { name: "Đã hủy" },
  32: { name: "Sắp hết hạn" },
};

export const BILL_STATUS = {
  1: { name: "Chờ xác nhận" },
  2: { name: "Chờ thanh toán" },
  4: { name: "Đã thanh toán" },
  8: { name: "Đã hủy" },
};

export const BILL_STATUS_CODE = {
  WAITING: 1,
  WAITING_PAYMENT: 2,
  PAID: 4,
  CANCELED: 8,
};

export const CONTRACT_STATUS_CODE = {
  WAITING: 1,
  WAITING_DEPOSIT: 2,
  RENTING: 4,
  EXPIRED: 8,
  CANCELED: 16,
};

export const CONTACT_STATUS_CODE = {
  WAITING: 1,
  CONFIRMED: 2,
  CANCELED: 4,
};

export const SERVICE_UNIT = {
  1: { name: "Phòng" },
  2: { name: "Số " },
  4: { name: "Người" },
  8: { name: "Tháng" },
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

export const UtilsTickComponent = {
  1: {
    name: "Sân phơi đồ",
    icon: <GiClothesline className="text-2xl group-hover:text-blue-500" />,
  },
  2: {
    name: "Thang máy",
    icon: <GrElevator className="text-2xl group-hover:text-blue-500" />,
  },
  4: {
    name: "Camera an ninh",
    icon: <FaVideo className="text-2xl group-hover:text-blue-500" />,
  },
  8: {
    name: "Dịch vụ bảo vệ",
    icon: <MdSecurity className="text-2xl group-hover:text-blue-500" />,
  },
  16: {
    name: "Máy giặt",
    icon: <GiWashingMachine className="text-2xl group-hover:text-blue-500" />,
  },
  32: {
    name: "Chỗ để xe",
    icon: <FaParking className="text-2xl group-hover:text-blue-500" />,
  },
  64: {
    name: "Điều hòa và quạt",
    icon: <FaFan className="text-2xl group-hover:text-blue-500" />,
  },
  128: {
    name: "Bếp",
    icon: <GiCookingPot className="text-2xl group-hover:text-blue-500" />,
  },
  256: {
    name: "Khóa vân tay",
    icon: <FaFingerprint className="text-2xl group-hover:text-blue-500" />,
  },
  512: {
    name: "Nội thất",
    icon: <MdChair className="text-2xl group-hover:text-blue-500" />,
  },
  1024: {
    name: "Nóng lạnh",
    icon: <FaHotTub className="text-2xl group-hover:text-blue-500" />,
  },
  2048: {
    name: "Vệ sinh khép kín",
    icon: <FaToilet className="text-2xl group-hover:text-blue-500" />,
  },
};

export const BILL_PAYMENT_METHOD = {
  1: { name: "Tiền mặt" },
  2: { name: "Chuyển khoản" },
  4: { name: "Ví điện tử" },
};

export const CONTACT_STATUS = {
  1: { name: "Chờ xác nhận" },
  2: { name: "Đồng ý" },
  4: { name: "Từ chối" },
};

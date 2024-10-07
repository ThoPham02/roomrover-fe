import { address } from "../common";

export const convertTimestampToDate = (timestamp) => {
  const date = new Date(timestamp);
  return date;
};

export const convertDateToTimestamp = (date) => {
  return new Date(date).getTime();
};

export const getDate = (n) => {
  return new Date(Date.now() - (n ? n : 0) * 24 * 60 * 60 * 1000).setHours(0, 0, 0, 0);
}

export const formatCurrencyVND = (number) => {
  number = Number(number);

  return (
    number &&
    number.toLocaleString("vi-VN", { style: "currency", currency: "VND" })
  );
};

export const getProvince = (provinceID) => {
  provinceID = String(provinceID).padStart(2, "0");

  return address[provinceID]?.path;
};

export const getDistrict = (provinceID, districtID) => {
  provinceID = String(provinceID).padStart(2, "0");
  districtID = String(districtID).padStart(3, "0");
  return address[provinceID]?.districts[districtID]?.path;
};

export const getWard = (provinceID, districtID, wardID) => {
  provinceID = String(provinceID).padStart(2, "0");
  districtID = String(districtID).padStart(3, "0");
  wardID = String(wardID).padStart(5, "0");
  return address[provinceID].districts[districtID].wards[wardID].path;
};

export const getArea = (provinceID, districtID, wardID) => {
  provinceID = String(provinceID).padStart(2, "0");
  districtID = String(districtID).padStart(3, "0");
  wardID = String(wardID).padStart(5, "0");
  return address[provinceID]?.districts[districtID]?.wards[wardID].path;
};

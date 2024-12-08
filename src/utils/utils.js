import { address } from "../common";

export const convertTimestampToDate = (timestamp) => {
  const date = new Date(timestamp);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Tháng trong JavaScript bắt đầu từ 0
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
};

export function getBillTimeByIndex(start, index) {
  const startDate = new Date(start); // Convert milliseconds to Date object
  let year = startDate.getUTCFullYear();
  let month = startDate.getUTCMonth() + 1; // JavaScript months are 0-based
  let day = startDate.getUTCDate();

  if (month + index > 12) {
      year += Math.floor((month + index) / 12);
      month = (month + index) % 12;
      if (month === 0) {
          month = 12;
          year -= 1;
      }
  } else {
      month += index;
  }

  // Adjust day based on the month and whether it's a leap year
  switch (month) {
      case 1: case 3: case 5: case 7: case 8: case 10: case 12:
          if (day > 31) day = 31;
          break;
      case 4: case 6: case 9: case 11:
          if (day > 30) day = 30;
          break;
      case 2:
          if ((year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0)) {
              if (day > 29) day = 29; // Leap year
          } else {
              if (day > 28) day = 28; // Non-leap year
          }
          break;
  }

  const nextMonthDate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0, 0)); // Months are 0-based in JS
  return nextMonthDate.getTime();
}

export const convertDateToTimestamp = (date) => {
  return new Date(date).getTime();
};

export const getDate = (n) => {
  return new Date(Date.now() - (n ? n : 0) * 24 * 60 * 60 * 1000).setHours(
    0,
    0,
    0,
    0
  );
};

export const formatCurrencyVND = (number) => {
  number = Number(number);

  if (isNaN(number)) {
    return 0;
  }

  return (
    number &&
    number.toLocaleString("vi-VN", {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    })
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

export const getDayMonthYearFromTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  return `ngày ${date.getDate()}, tháng ${
    date.getMonth() + 1
  }, năm ${date.getFullYear()}`;
};

export const getDayFromTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  return date.getDate();
};

export const genUnixID = () => {
  return Math.floor(Date.now() / 1000) - Math.floor(Math.random() * 100000);
};

export function convertTimestampToDateTime(timestamp) {
  const date = new Date(timestamp);

  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Tháng bắt đầu từ 0
  const year = date.getFullYear();

  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");

  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

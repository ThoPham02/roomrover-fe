export const convertTimestampToDate = (timestamp) => {
  const date = new Date(timestamp);
  return date;
};

export const formatCurrencyVND = (number) => {
  return number.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
};

export const getArea = (provinceID, districtID, wardID) => {
  


  return "";
};

import { address } from "../common"

export const convertTimestampToDate = (timestamp) => {
  const date = new Date(timestamp);
  return date;
};

export const formatCurrencyVND = (number) => {
  return number && number.toLocaleString("vi-VN", { style: "currency", currency: "VND" });
};


export const getProvince = (provinceID) => {
  console.log(address[provinceID])

  return address[provinceID]?.path;
}

export const getDistrict = (provinceID, districtID) => {
  console.log(address[provinceID]?.districts[districtID])

  return address[provinceID]?.districts[districtID]?.path;
}

export const getWard = (provinceID, districtID, wardID) => {
  console.log(address[provinceID]?.districts[districtID]?.wards[wardID])

  return address[provinceID].districts[districtID].wards[wardID].path;
}

export const getArea = (provinceID, districtID, wardID) => {
  console.log(address[provinceID])


  return address[provinceID]?.districts[districtID]?.wards[wardID].path;
};

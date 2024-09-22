import { useSelector } from "react-redux";
import { Pagination } from "@mui/material";

import CusTable from "./CusTable";
import { formatCurrencyVND, getArea } from "../../utils/utils";
import HouseActionButton from "./House.ActionButton";
import { PAGE_SIZE } from "../../common";
import { useState } from "react";

const columns = [
  {
    header: "Nhà trọ",
    accessorKey: "name",
  },
  {
    header: "Khu vực",
    accessorKey: "address",
  },
  {
    header: "Diện tích",
    accessorKey: "area",
  },
  {
    header: "Giá",
    accessorKey: "price",
  },
];

const ListHouses = () => {
  const [page, setPage] = useState(1);

  const { listHouse, total } = useSelector((state) => state.invent.house);

  const data = listHouse.map((item) => {
    var area = getArea(item.provinceID, item.districtID, item.wardID)
      ? getArea(item.provinceID, item.districtID, item.wardID) +
        ", " +
        item.address
      : item.address;

    return {
      id: item.houseID,
      name: item.name,
      address: area,
      area: item.area + " m²",
      price: formatCurrencyVND(item.price),
    };
  });

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <div className="my-4">
      <CusTable
        headers={columns}
        data={data}
        page={page}
        ActionButton={HouseActionButton}
      />
      {data.length > 0 && (
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">
            Hiển thị{" "}
            {`${(page - 1) * PAGE_SIZE + 1} - ${
              total > page * PAGE_SIZE ? page * PAGE_SIZE : total
            }`}{" "}
            trong tổng số {total} kết quả
          </p>

          <Pagination
            count={Math.ceil(total / PAGE_SIZE)}
            defaultPage={1}
            siblingCount={0}
            boundaryCount={2}
            page={page}
            onChange={handleChange}
          />
        </div>
      )}
    </div>
  );
};

export default ListHouses;

import { useSelector } from "react-redux";
import { Pagination } from "@mui/material";
import { useState } from "react";

import CusTable from "./CusTable";
import { formatCurrencyVND, getArea } from "../../utils/utils";
import HouseActionButton from "./CusButton/House.ActionButton";
import { PAGE_SIZE } from "../../common";
import logo from "../../assets/images/logo.png";

const columns = [
  {
    header: "Hình ảnh",
    accessorKey: "album",
  },
  {
    header: "Nhà trọ",
    accessorKey: "name",
  },
  {
    header: "Địa chỉ",
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
    var area = getArea(item.provinceID, item.districtID, item.wardID) ? (
      <>
        {item.address}
        <br />
        {getArea(item.provinceID, item.districtID, item.wardID)}
      </>
    ) : (
      item.address
    );
    return {
      id: item.houseID,
      album:
        item?.albums && item?.albums.length > 0 ? (
          <img
            src={item?.albums[0]}
            alt="Hình ảnh nhà trọ"
            className="w-40 h-40 object-cover rounded-lg"
          />
        ) : (
          <img
            src={logo}
            alt="Logo mặc định"
            className="w-40 h-40 object-cover rounded-lg"
          />
        ),
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

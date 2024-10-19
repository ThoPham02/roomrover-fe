import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { BREADCRUMB_DETAIL, PAGE_SIZE, ROUTE_PATHS } from "../../common";
import { Breadcrumbs, CusTable, RoomActionButton } from "../../components/ui";
import * as actions from "../../store/actions";

const listFields = [
  {
    header: "Tên phòng",
    headerClass: "text-center w-96",
    accessorKey: "name",
    dataClass: "text-center",
  },
  {
    header: "Loại phòng",
    headerClass: "text-center w-32",
    accessorKey: "type",
    dataClass: "text-center",
  },
  {
    header: "Diện tích",
    headerClass: "text-center w-32",
    accessorKey: "area",
    dataClass: "text-centerbujm.n nmmmmmmmmmmmmm                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         ",
  },
  {
    header: "Số người tối đa",
    headerClass: "text-center w-32",
    accessorKey: "maxPeople",
    dataClass: "text-center",
  },
  {
    header: "Giá thuê",
    headerClass: "text-center w-32",
    accessorKey: "price",
    dataClass: "",
  },
  {
    header: "Trạng thái",
    headerClass: "text-center w-32",
    accessorKey: "status",
    dataClass: "text-center",
  },
];

const ContactScreen = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  useEffect(() => {
    dispatch(actions.setCurrentPage(ROUTE_PATHS.CONTACT));
  }, [dispatch]);

  var data = [
    {
      name: "Phòng 1",
      type: "Phòng trọ",
      area: "10m2",
      maxPeople: 2,
      price: "1.000.000",
      status: "Đã cho thuê",
    },
    {
      name: "Phòng 2",
      type: "Phòng trọ",
      area: "15m2",
      maxPeople: 3,
      price: "1.500.000",
      status: "Chưa cho thuê",
    },
    {
      name: "Phòng 3",
      type: "Phòng trọ",
      area: "20m2",
      maxPeople: 4,
      price: "2.000.000",
      status: "Đã cho thuê",
    },
  ];
  var total = 100;

  return (
    <div>
      <Breadcrumbs title={BREADCRUMB_DETAIL[ROUTE_PATHS.CONTACT]} />

      <div className="search-box"></div>

      <div className="table-box">
        <CusTable
          headers={listFields}
          data={data}
          page={page}
          ActionButton={RoomActionButton}
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
              onChange={(event, value) => setPage(value)}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactScreen;

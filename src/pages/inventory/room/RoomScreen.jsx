import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { useDispatch } from "react-redux";

import {
  BREADCRUMB_DETAIL,
  CONTRACT_STATUS,
  PAGE_SIZE,
  ROUTE_PATHS,
} from "../../../common";
import {
  Breadcrumbs,
  CusFormGroup,
  CusFormSelect,
  CusTable,
  RoomActionButton,
} from "../../../components/ui";
import * as actions from "../../../store/actions";

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
    dataClass: "",
  },
  {
    header: "Số người tối đa",
    headerClass: "text-center w-96",
    accessorKey: "maxPeople",
    dataClass: "",
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

const RoomScreen = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState({});
  useEffect(() => {
    dispatch(actions.setCurrentPage(ROUTE_PATHS.ROOM));
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

  const handleSubmitFilter = (e) => {};

  return (
    <div>
      <Breadcrumbs title={BREADCRUMB_DETAIL[ROUTE_PATHS.ROOM]} />

      <div className="search-box p-2 bg-slate-100 rounded">
        <Form
          className="flex flex-wrap gap-4 items-center mt-8"
          onSubmit={handleSubmitFilter}
        >
          <CusFormGroup
            label="Tên phòng"
            placeholder="Search..."
            state={filter}
            setState={setFilter}
            keyName={"search"}
            position="top"
          />
          {/* <CusFormDate
            label={"Ngày tạo"}
            placeholder={"Từ ngày"}
            state={filter}
            setState={setFilter}
            keyName={"createFrom"}
          />
          <p>-</p>
          <CusFormDate
            placeholder={"Đến ngày"}
            state={filter}
            setState={setFilter}
            keyName={"createTo"}
          /> */}
          <CusFormSelect
            label="Loại phòng"
            value={filter}
            setValue={setFilter}
            keyName={"status"}
            data={CONTRACT_STATUS}
            position="top"
          />
          <CusFormSelect
            label={"Trạng thái"}
            value={filter}
            setValue={setFilter}
            keyName={"status"}
            data={CONTRACT_STATUS}
            position="top"
          />
          <button type="submit" className="px-8 py-2 bg-secondary2 rounded">
            <FaSearch className="text-3xl" />
          </button>
        </Form>
      </div>

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

export default RoomScreen;

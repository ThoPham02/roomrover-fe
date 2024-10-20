import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";

import {
  BREADCRUMB_DETAIL,
  HOUSE_ROOM_STATUS,
  HOUSE_TYPE,
  PAGE_SIZE,
  RoomStatusComponent,
  ROUTE_PATHS,
} from "../../../../src/common";
import {
  Breadcrumbs,
  CusFormGroup,
  CusFormSelect,
  CusTable,
  RoomActionButton,
} from "../../../../src/components/ui";
import * as actions from "../../../../src/store/actions";
import { formatCurrencyVND } from "../../../utils/utils";

const listFields = [
  {
    header: "Tên phòng",
    headerClass: "text-center w-96",
    accessorKey: "name",
    dataClass: "",
  },
  {
    header: "Loại hình",
    headerClass: "text-center w-32",
    accessorKey: "type",
    dataClass: "text-center",
  },
  {
    header: "Diện tích",
    headerClass: "text-center w-32",
    accessorKey: "area",
    dataClass: "text-center",
  },
  {
    header: "Số người tối đa",
    headerClass: "text-center w-32",
    accessorKey: "capacity",
    dataClass: "text-center",
  },
  {
    header: "Giá thuê",
    headerClass: "text-center w-32",
    accessorKey: "price",
    dataClass: "text-center",
  },
  {
    header: "Trạng thái",
    headerClass: "text-center w-48",
    accessorKey: "statusComponent",
    dataClass: "text-center",
  },
];

const RoomScreen = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState({
    limit: PAGE_SIZE,
    offset: 0,
    search: "",
    type: 0,
    status: 0,
  });

  useEffect(() => {
    dispatch(actions.setCurrentPage(ROUTE_PATHS.ROOM));
    dispatch(
      actions.getListRooms({
        limit: PAGE_SIZE,
        offset: 0,
      })
    );
  }, [dispatch]);

  const { listRooms, total } = useSelector((state) => state.invent.room);
  var data = listRooms?.map((item) => {
    return {
      id: item.roomID,
      name: `${item.name} (${item.houseName})`,
      type: HOUSE_TYPE[item.type].name,
      area: item.area + "m2",
      capacity: item.capacity === 0 ? "Không giới hạn" : item.capacity,
      price: formatCurrencyVND(item.price) + " VND",
      statusComponent: RoomStatusComponent[item.status],
      status: item.status,
    };
  }) || [];

  const handleSubmitFilter = (e) => {
    e.preventDefault();

    dispatch(actions.getListRooms(filter));
  };

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
          <CusFormSelect
            label="Loại phòng"
            value={filter}
            setValue={setFilter}
            keyName={"type"}
            data={HOUSE_TYPE}
            position="top"
          />
          <CusFormSelect
            label={"Trạng thái"}
            value={filter}
            setValue={setFilter}
            keyName={"status"}
            data={HOUSE_ROOM_STATUS}
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

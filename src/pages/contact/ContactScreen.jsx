import { Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { BREADCRUMB_DETAIL, PAGE_SIZE, ROUTE_PATHS } from "../../common";
import { Breadcrumbs, CusTable, RoomActionButton } from "../../components/ui";
import * as actions from "../../store/actions";

const listFields = [
  {
    header: "Tên nhà trọ",
    headerClass: "text-center w-96",
    accessorKey: "houseName",
    dataClass: "text-center",
  },
  {
    header: "Người thuê",
    headerClass: "text-center w-32",
    accessorKey: "renterName",
    dataClass: "text-center",
  },
  {
    header: "Số điện thoại",
    headerClass: "text-center w-32",
    accessorKey: "renterPhone",
    dataClass: "text-center",
  },
  {
    header: "Ngày hẹn xem phòng",
    headerClass: "text-center w-96",
    accessorKey: "datetime",
    dataClass: "text-center",
  },
  {
    header: "Trạng thái",
    headerClass: "text-center w-32",
    accessorKey: "statusComponent",
    dataClass: "text-center",
  },
];

const ContactScreen = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);
  useEffect(() => {
    dispatch(actions.setCurrentPage(ROUTE_PATHS.CONTACT));
  }, [dispatch]);

  const { listContact, total } = useSelector((state) => state.contact);

  return (
    <div>
      <Breadcrumbs title={BREADCRUMB_DETAIL[ROUTE_PATHS.CONTACT]} />

      <div className="search-box">
        
      </div>

      <div className="table-box">
        <CusTable
          headers={listFields}
          data={listContact}
          page={page}
          ActionButton={RoomActionButton}
        />
        {listContact.length > 0 && (
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

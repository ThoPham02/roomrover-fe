import { useState } from "react";
import { useDispatch } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { Form } from "react-bootstrap";

import * as actions from "../../store/actions";
import {
  BREADCRUMB_DETAIL,
  HOUSE_TYPE,
  PAGE_SIZE,
  ROUTE_PATHS,
} from "../../common";
import {
  Breadcrumbs,
  CreateButton,
  CusFormDate,
  CusFormGroup,
  CusFormSelect,
  CusTable,
} from "../../components/ui";
import { getDate } from "../../utils/utils";
import { useNavigate } from "react-router-dom";

const columns = [
  {
    header: "Mã hợp đồng",
    accessorKey: "code",
  },
  {
    header: "Nhà trọ",
    accessorKey: "roomName",
  },
  {
    header: "Nguời thuê",
    accessorKey: "lessorName",
  },
  {
    header: "Ngày bắt đầu",
    accessorKey: "createdAt",
  },
  {
    header: "Giá thuê",
    accessorKey: "price",
  },
  {
    header: "Trạng thái",
    accessorKey: "status",
  },
];

const ContractScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [filter, setFilter] = useState({
    search: "",
    createFrom: getDate(90),
    createTo: getDate(),
    limit: PAGE_SIZE,
    offset: 0,
  });

  const handleSubmitFilter = (e) => {
    e.preventDefault();

    dispatch(actions.getListContract());
  };

  const handleCreateContract = () => {
    navigate(ROUTE_PATHS.CONTRACT_CREATE);
  };

  return (
    <>
      <Breadcrumbs
        title={BREADCRUMB_DETAIL[ROUTE_PATHS.CONTRACT]}
        backRoute={ROUTE_PATHS.DASHBOARD}
        backName={BREADCRUMB_DETAIL[ROUTE_PATHS.DASHBOARD]}
        displayName={BREADCRUMB_DETAIL[ROUTE_PATHS.CONTRACT]}
      />
      <div className="relative">
        <CreateButton
          className="absolute -top-16 right-0 z-1"
          onClick={handleCreateContract}
        />

        <div>
          <div className="p-2 bg-slate-100 rounded">
            <Form
              className="flex flex-wrap gap-4 items-center mt-8"
              onSubmit={handleSubmitFilter}
            >
              <CusFormGroup
                label="Mã hợp đồng"
                placeholder="Mã hợp đồng"
                state={filter}
                setState={setFilter}
                keyName={"search"}
                position="top"
              />
              <CusFormSelect
                defaultValue={"Tất cả loại phòng"}
                label={"Loại phòng"}
                value={filter}
                setValue={setFilter}
                keyName={"type"}
                data={HOUSE_TYPE}
                position="top"
              />
              <CusFormDate
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
              />
              <button
                type="submit"
                className="px-10 py-2 bg-secondary2 rounded"
              >
                <FaSearch className="text-3xl" />
              </button>
            </Form>
          </div>

          <CusTable headers={columns} />
        </div>
      </div>
    </>
  );
};

export default ContractScreen;

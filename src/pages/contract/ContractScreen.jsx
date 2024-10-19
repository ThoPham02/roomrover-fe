import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch } from "react-icons/fa";
import { Pagination } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Form } from "react-bootstrap";

import * as actions from "../../store/actions";
import {
  BREADCRUMB_DETAIL,
  CONTRACT_STATUS,
  ContractStatusComponent,
  PAGE_SIZE,
  ROUTE_PATHS,
} from "../../common";
import {
  Breadcrumbs,
  ContractActionButton,
  CreateButton,
  CusFormDate,
  CusFormGroup,
  CusFormSelect,
  CusTable,
} from "../../components/ui";
import {
  convertTimestampToDate,
  formatCurrencyVND,
  getDate,
} from "../../utils/utils";

const columns = [
  {
    header: "Mã hợp đồng",
    headerClass: "text-center w-32",
    accessorKey: "code",
    dataClass: "text-center",
  },
  {
    header: "Nhà trọ",
    headerClass: "text-center w-96",
    accessorKey: "room.name",
    dataClass: "",
  },
  {
    header: "Nguời thuê",
    headerClass: "text-center w-32",
    accessorKey: "lessorName",
    dataClass: "",
  },
  {
    header: "Ngày bắt đầu",
    headerClass: "text-center w-32",
    accessorKey: "createdAt",
    dataClass: "text-center",
  },
  {
    header: "Giá thuê",
    headerClass: "text-center w-32",
    accessorKey: "room.price",
    dataClass: "text-center",
  },
  {
    header: "Trạng thái",
    headerClass: "text-center w-40",
    accessorKey: "status",
    dataClass: "text-center",
  },
];

const ContractScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [page, setPage] = useState(1);

  const [filter, setFilter] = useState({
    search: "",
    status: 0,
    createFrom: getDate(90),
    createTo: getDate(),
    limit: PAGE_SIZE,
    offset: 0,
  });

  useEffect(() => {
    dispatch(actions.setCurrentPage(ROUTE_PATHS.CONTRACT));
    dispatch(actions.getListContract(filter));
    // eslint-disable-next-line
  }, [dispatch]);

  const handleSubmitFilter = (e) => {
    e.preventDefault();

    dispatch(actions.getListContract(filter));
  };

  const { listContract, total } = useSelector((state) => state.contract);

  const handleCreateContract = () => {
    navigate(ROUTE_PATHS.CONTRACT_CREATE);
  };

  const data = listContract
    ? listContract?.map((contract) => {
        return {
          ...contract,
          createdAt: convertTimestampToDate(contract.createdAt),
          status: ContractStatusComponent[contract.status],
          room: {
            name: contract.room?.name,
            price: formatCurrencyVND(contract.room?.price),
          },
        };
      })
    : [];

  return (
    <div className="p-3 bg-white rounded">
      <Breadcrumbs title={BREADCRUMB_DETAIL[ROUTE_PATHS.CONTRACT]} />
      <div className="relative">
        <CreateButton
          className="absolute -top-16 right-0 z-1"
          onClick={handleCreateContract}
        />

        <div className="mt-8">
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

          <CusTable
            headers={columns}
            data={data}
            page={1}
            ActionButton={ContractActionButton}
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
                onChange={(val) => setPage(val)}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContractScreen;

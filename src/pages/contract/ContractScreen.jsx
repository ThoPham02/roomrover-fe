import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";
import { Form } from "react-bootstrap";

import * as actions from "../../store/actions";
import { BREADCRUMB_DETAIL, PAGE_SIZE, ROUTE_PATHS } from "../../common";
import {
  Breadcrumbs,
  CreateButton,
  CusFormDate,
  CusTable,
  InputForm,
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
  const  navigate = useNavigate();

  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      search: "",
      status: 0,
      createFrom: getDate(90),
      createTo: getDate(),
    },
  });

  const onSubmit = (data, e) => {
    e.preventDefault();
    data.limit = PAGE_SIZE;
    data.offset = 0;

    dispatch(actions.getListContract(data));
  };

  useEffect(() => {
    dispatch(actions.setCurrentPage(ROUTE_PATHS.CONTRACT));
  }, [dispatch]);

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
              onSubmit={handleSubmit(onSubmit)}
            >
              <InputForm
                title={"Mã hợp đồng"}
                placeholder="Mã hợp đồng"
                fieldValues={register}
                label={"search"}
              />

              <InputForm
                title={"Trạng thái"}
                placeholder="Mã hợp đồng"
                fieldValues={register}
                label={"status"}
              />

              <CusFormDate
                title={"Ngày tạo"}
                placeholder={"Từ ngày"}
                control={control}
                name={"createFrom"}
              />
              <p>-</p>
              <CusFormDate
                placeholder={"Đến ngày"}
                control={control}
                name={"createTo"}
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

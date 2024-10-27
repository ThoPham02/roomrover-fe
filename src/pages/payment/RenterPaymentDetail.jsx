import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { convertTimestampToDate, formatCurrencyVND } from "../../utils/utils";
import * as actions from "../../store/actions";
import { CusFormSelect, CusTable } from "../../components/ui";
import { BILL_STATUS, ROUTE_PATHS } from "../../common";

const listFields = [
  {
    header: "Loại chi phí",
    headerClass: "text-center w-32",
    accessorKey: "name",
    dataClass: "text-center",
  },
  {
    header: "Giá",
    headerClass: "text-center w-32",
    accessorKey: "price",
    dataClass: "text-center",
  },
  {
    header: "Số lượng",
    headerClass: "text-center w-32",
    accessorKey: "quantity",
    dataClass: "text-center",
  },
  {
    header: "Thành tiền",
    headerClass: "text-center w-32",
    accessorKey: "amount",
    dataClass: "grid justify-items-end",
  },
];

const listFieldsPay = [
  {
    header: "Ghi chú",
    headerClass: "text-center w-32",
    accessorKey: "name",
    dataClass: "text-center",
  },
  {
    header: "Ngày thanh toán",
    headerClass: "text-center w-32",
    accessorKey: "price",
    dataClass: "text-center",
  },
  {
    header: "Số tiền",
    headerClass: "text-center w-32",
    accessorKey: "quantity",
    dataClass: "text-center",
  },
  {
    header: "Chứng từ",
    headerClass: "text-center w-32",
    accessorKey: "amount",
    dataClass: "text-center",
  },
];

const RenterPaymentDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getPaymentDetail(id));
  }, [dispatch, id]);

  const { billDetail } = useSelector((state) => state.payment.bill);
  const details = [
    {
      id: 1,
      name: "Giá thuê",
      quantity: 1,
      price: formatCurrencyVND(billDetail?.amount),
      amount: formatCurrencyVND(billDetail?.amount) + " VNĐ",
    },
    ...(billDetail?.billDetails?.map((item) => {
      return {
        id: item?.id,
        name: item?.name,
        quantity: item?.quantity,
        price: formatCurrencyVND(item?.price),
        amount: formatCurrencyVND(item?.price * item?.quantity) + " VNĐ",
      };
    }) || []),
  ];
  const pays = [
    ...(billDetail?.billPays?.map((item) => {
        return {
            id: item?.id,
            name: item?.note,
            price: convertTimestampToDate(item?.payDate),
            quantity: formatCurrencyVND(item?.amount),
            amount: item?.document,
        };
    })) || [],
  ]
  return (
    <div>
      <div className="flex">
        <Link
          to={ROUTE_PATHS.RENTER_PAYMENT}
          className="text-blue-700 font-semibold"
        >
          Danh sách hóa đơn
        </Link>
        <span className="mx-2">/</span>
        <p>Chi tiết</p>
      </div>

      <p className="font-medium mt-4">Thông tin hóa đơn:</p>
      <div className="p-2 bg-slate-100 rounded">
        <div className="grid grid-cols-2 gap-4">
          {/* Bên trái - Thông tin hóa đơn */}
          <div className="mr-24">
            <div className="flex justify-between mb-2">
              <span>Mã hợp đồng:</span>
              <span>{billDetail?.contractCode}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Người thuê:</span>
              <span>{billDetail?.renterName}</span>
            </div>
            <div className="flex justify-between mt-2">
              <span>Số điện thoại:</span>
              <span>{billDetail?.renterPhone}</span>
            </div>
          </div>

          {/* Bên phải - Thông tin thanh toán */}
          <div className="mr-24">
            <div className="flex justify-between mb-2">
              <span>Hạn thanh toán:</span>
              <span>{convertTimestampToDate(billDetail?.paymentDate)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Trạng thái:</span>
              <CusFormSelect
                data={BILL_STATUS}
                disabled
                value={billDetail}
                keyName="status"
              />
            </div>
          </div>
        </div>
      </div>

      <p className="font-medium mt-4">Thông tin thanh toán:</p>
      <div className="p-2 bg-slate-100 rounded">
        <CusTable
          headers={listFields}
          actions={false}
          page={1}
          data={details}
        />

        <div className=" grid justify-items-end">
          <div className="mb-2 w-1/3 flex justify-between">
            <span>Tổng tiền</span>
            <span className="font-bold mr-2">
              {formatCurrencyVND(billDetail?.amount)} VNĐ
            </span>
          </div>
          <div className="mb-2 w-1/3 flex justify-between">
            <span>Đã trả</span>
            <span className="mr-2">
              {formatCurrencyVND(billDetail?.amount - billDetail?.remain)} VNĐ
            </span>
          </div>
          <div className="mb-2 w-1/3 flex justify-between">
            <span>Còn phải trả</span>
            <span className="font-bold text-red-500 mr-2">
              {formatCurrencyVND(billDetail?.remain)} VNĐ
            </span>
          </div>
        </div>
      </div>

      <p className="font-medium mt-4">Giao dịch:</p>
      <div className="p-2 bg-slate-100 rounded">
        <div>
          <CusTable
            headers={listFieldsPay}
            actions={false}
            page={1}
            data={pays}
          />
        </div>
      </div>
    </div>
  );
};

export default RenterPaymentDetail;

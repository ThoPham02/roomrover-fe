import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { convertTimestampToDate, formatCurrencyVND } from "../../utils/utils";
import * as actions from "../../store/actions";
import {
  BillPayModal,
  BillQuantityModal,
  Breadcrumbs,
  CreateButton,
  CusFormSelect,
  CusTable,
} from "../../components/ui";
import {
  BILL_PAYMENT_METHOD,
  BILL_STATUS,
  BillPayStatusComponent,
  BREADCRUMB_DETAIL,
  ROUTE_PATHS,
} from "../../common";

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
    headerClass: "text-end w-32",
    accessorKey: "amount",
    dataClass: "grid justify-items-end",
  },
];

const listFieldsPay = [
  {
    header: "Ngày thanh toán",
    headerClass: "text-center w-32",
    accessorKey: "payDate",
    dataClass: "text-center",
  },
  {
    header: "Số tiền",
    headerClass: "text-center w-32",
    accessorKey: "amount",
    dataClass: "text-center",
  },
  {
    header: "Phương thức",
    headerClass: "text-center w-32",
    accessorKey: "typeText",
    dataClass: "text-center",
  },
  {
    header: "Trạng thái",
    headerClass: "text-center w-32",
    accessorKey: "statusComponent",
    dataClass: "text-center",
  },
  {
    header: "Chứng từ",
    headerClass: "text-center w-32",
    accessorKey: "url",
    dataClass: "text-center",
  },
];

const RenterPaymentDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.setCurrentPage(ROUTE_PATHS.RENTER_PAYMENT));
    dispatch(actions.getPaymentDetail(id));
  }, [dispatch, id]);

  const { billDetail } = useSelector((state) => state.payment.bill);
  const [showQuantity, setShowQuantity] = useState(false);
  const [showPay, setShowPay] = useState(false);

  const details = [
    ...(billDetail?.billDetails?.map((item) => {
      return {
        id: item?.id,
        name: item?.name,
        quantity: item?.quantity,
        price: formatCurrencyVND(item?.price),
        amount: formatCurrencyVND(item?.price * item?.quantity) + " VNĐ",
        type: item?.type,
      };
    }) || []),
  ].sort((a, b) => (b.type === 8 ? 1 : a.type === 8 ? -1 : 0));

  const pays = [
    ...(billDetail?.billPays?.map((item) => {
      return {
        ...item,
        payDate: convertTimestampToDate(item?.payDate),
        amount: formatCurrencyVND(item?.amount),
        typeText: BILL_PAYMENT_METHOD[item?.type].name,
        statusComponent: BillPayStatusComponent[item?.status],
        url: item?.url ? "" : "Không có",
      };
    }) || []),
  ];

  return (
    <div>
      <Breadcrumbs
        backName={BREADCRUMB_DETAIL[ROUTE_PATHS.PAYMENT]}
        backRoute={ROUTE_PATHS.RENTER_PAYMENT}
        displayName={"Chi tiết"}
      />

      <p className="font-semibold mt-4">Thông tin hóa đơn:</p>
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

      <p className={`font-semibold mt-12`}>Thông tin thanh toán:</p>
      <div className="p-2 bg-slate-100 rounded relative">
        {/* {billDetail?.status === 1 && ( */}
          <div className="absolute right-0 -top-12">
            <CreateButton
              icon={<></>}
              text={"Cập nhật số lượng"}
              onClick={setShowQuantity}
            />
          </div>
        {/* )} */}

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

      <p className={`font-semibold mt-12`}>Giao dịch:</p>
      <div className="p-2 bg-slate-100 rounded relative">
        {billDetail?.status === 2 && (
          <div className="absolute right-0 -top-12 flex">
            <CreateButton
              icon={<></>}
              className={"mr-4"}
              text={"Thanh toán online"}
            />
            <CreateButton onClick={() => setShowPay(true)} />
          </div>
        )}

        <div>
          <CusTable
            headers={listFieldsPay}
            actions={false}
            page={1}
            data={pays}
          />
        </div>
      </div>

      {showQuantity && (
        <BillQuantityModal
          show={showQuantity}
          handleClose={() => setShowQuantity(false)}
          id={id}
        />
      )}
      {showPay && (
        <BillPayModal
          show={showPay}
          handleClose={() => setShowPay(false)}
          id={id}
        />
      )}
    </div>
  );
};

export default RenterPaymentDetail;

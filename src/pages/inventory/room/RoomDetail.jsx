import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";

import {
  BREADCRUMB_DETAIL,
  ContractStatusComponent,
  HOUSE_TYPE,
  RoomStatusComponent,
  ROUTE_PATHS,
} from "../../../common";
import { Breadcrumbs, CreateButton } from "../../../components/ui";
import * as actions from "../../../../src/store/actions";
import {
  convertTimestampToDate,
  formatCurrencyVND,
  getArea,
  getBillTimeByIndex,
} from "../../../utils/utils";

const RoomDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.setCurrentPage(ROUTE_PATHS.ROOM));
    dispatch(actions.getRoomDetailAction(id));
  }, [dispatch, id]);

  const { room, house, contract, bills } = useSelector(
    (state) => state.invent?.room?.roomDetail
  );

  console.log(useSelector((state) => state.invent?.room?.roomDetail));

  const handleClick = () => {
    navigate(ROUTE_PATHS.CONTRACT_CREATE);
  };

  return (
    <div className="">
      <Breadcrumbs
        backRoute={ROUTE_PATHS.ROOM}
        backName={BREADCRUMB_DETAIL[ROUTE_PATHS.ROOM]}
        displayName={BREADCRUMB_DETAIL["DETAIL"]}
      />
      <p className="font-medium">Thông tin phòng trọ:</p>
      <div className="p-2 bg-slate-100 rounded mb-4 px-3">
        <Row>
          <Col>
            <ItemInfo
              title={"Phòng:"}
              data={`${room?.name} (${house?.name})`}
            />
            <ItemInfo
              title={"Giá thuê:"}
              data={`${formatCurrencyVND(house?.price)} VNĐ/tháng`}
            />
            <ItemInfo title={"Diện tích:"} data={`${house?.area} m²`} />
            <ItemInfo
              title={"Địa chỉ:"}
              data={
                house?.address +
                ", " +
                getArea(house?.provinceID, house?.districtID, house?.wardID)
              }
            />
          </Col>
          <Col>
            <ItemInfo
              title={"Loại hình:"}
              data={HOUSE_TYPE[room?.type]?.name}
            />
            <ItemInfo
              title={"Số người tối đa:"}
              data={`${
                room?.capacity !== 0 ? room?.capacity : "Không giới hạn"
              }`}
            />
            <ItemInfo
              title={"Trạng thái:"}
              data={RoomStatusComponent[room?.status]}
            />
          </Col>
        </Row>
      </div>

      <p className="font-medium">Hợp đồng hiện tại:</p>
      <div className="p-2 bg-slate-100 rounded mb-4 px-3">
        {contract && contract?.contractID > 0 ? (
          <Row>
            <Col>
              <ItemInfo title={"Mã hợp đồng:"} data={contract?.code} />
              <ItemInfo
                title={"Ngày bắt đầu:"}
                data={convertTimestampToDate(contract?.checkIn)}
              />
              <ItemInfo
                title={"Ngày kết thúc:"}
                data={convertTimestampToDate(
                  getBillTimeByIndex(contract?.checkIn, contract?.duration)
                )}
              />
              <ItemInfo
                title={"Hạn đặt cọc:"}
                data={convertTimestampToDate(contract?.payment?.depositDate)}
              />
              <ItemInfo
                title={"Trạng thái:"}
                data={ContractStatusComponent[contract?.status]}
              />
            </Col>
            <Col>
              <ItemInfo
                title={"Người thuê:"}
                data={contract?.renter?.fullName}
              />
              <ItemInfo
                title={"Số điện thoại:"}
                data={contract?.renter?.phone}
              />
              <ItemInfo
                title={"Số CCCD:"}
                data={contract?.renter?.cccdNumber}
              />
              <ItemInfo
                title={"Ngày cấp:"}
                data={convertTimestampToDate(contract?.renter?.cccdDate)}
              />
              <ItemInfo
                title={"Nơi cấp:"}
                data={contract?.renter?.cccdAddress}
              />
            </Col>
          </Row>
        ) : (
          <div className="flex w-full h-48 justify-center items-center ">
            <div>
              <CreateButton
                icon={<></>}
                text={"Tạo hợp đồng"}
                onClick={handleClick}
              />
            </div>
          </div>
        )}
      </div>

      {/* <p className="font-medium">Lịch sử giao dịch:</p>
      <div className="p-2 bg-slate-100 rounded mb-4 px-3"></div> */}
    </div>
  );
};

export default RoomDetail;

const ItemInfo = ({ title, data }) => {
  return (
    <div className="flex mb-2">
      <div className="font-bold text-nowrap mr-2 min-w-36">{title}</div>
      <div>{data}</div>
    </div>
  );
};

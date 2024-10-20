import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { BREADCRUMB_DETAIL, HOUSE_TYPE, ROUTE_PATHS } from "../../../common";
import {
  Breadcrumbs,
  CusFormGroup,
  CusFormSelect,
  CusSelectArea,
} from "../../../components/ui";
import * as actions from "../../../../src/store/actions";
import { Col, Row } from "react-bootstrap";

const RoomDetail = () => {
  const { id } = useParams();

  const dispatch = useDispatch();

  const { roomDetail } = useSelector((state) => state.invent.room);
  const [room, setRoom] = useState({});
  const [house, setHouse] = useState({});
  const [contract, setContract] = useState({});

  useEffect(() => {
    dispatch(actions.setCurrentPage(ROUTE_PATHS.ROOM));
    dispatch(actions.getRoomDetailAction(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (roomDetail) {
      setRoom(roomDetail.room);
      setHouse(roomDetail.house);
      setContract(roomDetail.contract);
    }
  }, [roomDetail]);

  console.log("Room:", room);

  return (
    <div className="house-detail-page">
      <Breadcrumbs
        title={"Chi tiết phòng"}
        backRoute={ROUTE_PATHS.ROOM}
        backName={BREADCRUMB_DETAIL[ROUTE_PATHS.ROOM]}
        displayName={BREADCRUMB_DETAIL["DETAIL"]}
      />

      <div>
        <div className="p-2 bg-slate-100 rounded">
          <Row>
            <Col>
              <CusFormGroup
                label="Phòng"
                state={room}
                setState={setRoom}
                keyName={"name"}
                disabled
              />
              <CusFormGroup
                label="Nhà"
                state={house}
                setState={setHouse}
                keyName={"name"}
                disabled
              />
              <CusFormGroup
                label="Địa chỉ"
                state={house}
                setState={setHouse}
                keyName={"name"}
                disabled
              />
            </Col>
            <Col>
              <CusFormSelect
                title="Loại hình"
                label="Loại hình"
                labelWidth="min-w-36"
                required
                data={HOUSE_TYPE}
                value={house}
                setValue={setHouse}
                keyName="type"
                disabled
              />
              <CusFormGroup
                label="Diện tích"
                state={house}
                setState={setHouse}
                keyName={"area"}
                disabled
                unit={"m²"}
              />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default RoomDetail;

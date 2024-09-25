import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import * as actions from "../../store/actions";
import { HOUSE_TYPE, ROUTE_PATHS } from "../../common";
import {
  CreateButton,
  CusFormGroup,
  CusFormSelect,
  CusFormUpload,
} from "../../components/ui";
import { CusSelectArea } from "../../components/ui";

const TabHouseDetail = ({ id }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(actions.setCurrentPage(ROUTE_PATHS.INVENTORY));
    dispatch(actions.getHouseDetailAction(id));
  }, [dispatch, id]);

  const { houseDetail } = useSelector((state) => state.invent.house);

  const handleHouseUpdate = () => {
    navigate(ROUTE_PATHS.HOUSE_UPDATE.replace(":id", id));
  };

  return (
    <div className="relative">
      <CreateButton
        className="absolute -top-14 -right-0 z-1"
        onClick={handleHouseUpdate}
        text="Sửa"
        icon={<></>}
      />

      <Form>
        <Row>
          <p className="font-bold">Hình ảnh nhà trọ:</p>
          <div className="mt-2 mb-4 flex flex-wrap">
            {houseDetail?.albums.map((url, index) => (
              <img
                src={url}
                alt={`Hình ảnh nhà trọ ${index + 1}`}
                className="w-40 h-40 mr-4 mb-4 object-cover rounded-lg"
                key={url}
              />
            ))}

            <CusFormUpload disabled />
          </div>
        </Row>

        <Row>
          <Col>
            <CusFormGroup
              label="Tên nhà trọ"
              required
              disabled
              placeholder="Nhập tên nhà trọ"
              state={houseDetail}
              keyName={"name"}
            />
            <CusFormSelect
              title="Loại hình"
              label="Loại hình"
              required
              data={HOUSE_TYPE}
              value={houseDetail}
              disabled
              keyName="type"
            />
            <CusFormGroup
              label="Giá thuê"
              required
              placeholder="Nhập giá thuê"
              state={houseDetail}
              disabled
              keyName={"price"}
            />
            <CusFormGroup
              label="Diện tích"
              required
              placeholder="Nhập diện tích"
              state={houseDetail}
              disabled
              keyName={"area"}
            />
          </Col>
          <Col>
            <Row>
              <CusFormGroup
                label="Địa chỉ "
                required
                placeholder="Nhập địa chỉ"
                state={houseDetail}
                disabled
                keyName={"address"}
              />
            </Row>
            <CusSelectArea area={houseDetail} disabled />
          </Col>
        </Row>

        <Row>
          <CusFormGroup
            label="Mô tả"
            textarea
            placeholder="Nhập mô tả"
            state={houseDetail}
            disabled
            keyName={"description"}
          />
        </Row>
      </Form>
    </div>
  );
};

export default TabHouseDetail;

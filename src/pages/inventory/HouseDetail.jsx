import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Col, Form, Row } from "react-bootstrap";

import * as actions from "../../store/actions";
import { BREADCRUMB_DETAIL, HOUSE_TYPE, ROUTE_PATHS } from "../../common";
import { formatCurrencyVND, getArea } from "../../utils/utils";
import {
  Breadcrumbs,
  CreateButton,
  CusFormGroup,
  CusFormSelect,
  CusFormUpload,
} from "../../components/ui";
import { CusSelectArea } from "../../components/ui";

const HouseDetail = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [area, setArea] = useState();

  const { id } = useParams();

  useEffect(() => {
    dispatch(actions.setCurrentPage(ROUTE_PATHS.INVENTORY));
    dispatch(actions.getHouseDetail(id));
  }, [dispatch, id]);

  const { houseDetail } = useSelector((state) => state.invent.house);

  const handleHouseUpdate = () => {
    navigate(ROUTE_PATHS.HOUSE_UPDATE.replace(":id", id));
  };

  return (
    <div className="house-detail-page">
      <Breadcrumbs
        title={BREADCRUMB_DETAIL["DETAIL"]}
        backRoute={ROUTE_PATHS.INVENTORY}
        backName={BREADCRUMB_DETAIL[ROUTE_PATHS.INVENTORY]}
        displayName={BREADCRUMB_DETAIL["DETAIL"]}
      />

      <div className="relative">
        <CreateButton
          className="absolute -top-16 -right-0 z-1"
          onClick={handleHouseUpdate}
          text="Sửa"
          icon={<></>}
        />

        <Form>
          <Row>
            <p className="font-bold">Hình ảnh nhà trọ:</p>
            <div className="mt-2 mb-4 flex">
              {houseDetail?.albums?.map((image, index) => (
                <img
                  src={image.url}
                  alt={`Preview ${index + 1}`}
                  className="w-40 h-40 mr-4 object-cover rounded-lg"
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
                value={houseDetail?.name}
              />
              <CusFormSelect
                title="Loại hình"
                label="Loại hình"
                required
                disabled
                value={houseDetail?.type}
                data={HOUSE_TYPE}
              />
              <CusFormGroup
                label="Giá thuê"
                required
                disabled
                value={formatCurrencyVND(houseDetail?.price)}
              />
              <CusFormGroup
                label="Diện tích"
                required
                disabled
                value={houseDetail && houseDetail?.area + " m²"}
              />
            </Col>
            <Col>
              <Row>
                <CusFormGroup
                  label="Địa chỉ "
                  required
                  disabled
                  value={houseDetail?.address}
                />
              </Row>
              <CusSelectArea area={area} setArea={setArea} disabled />
            </Col>
          </Row>

          <Row>
            <CusFormGroup
              label="Tiện ích"
              disabled
              value={houseDetail?.utilities}
              textarea
            />
          </Row>
          <Row>
            <CusFormGroup
              label="Mô tả"
              disabled
              value={houseDetail?.description}
              textarea
            />
          </Row>
          <Row>
            <button>Lưu</button>
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default HouseDetail;

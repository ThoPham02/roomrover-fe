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

const HouseCreate = () => {
  const dispatch = useDispatch();
  const [area, setArea] = useState();

  useEffect(() => {
    dispatch(actions.setCurrentPage(ROUTE_PATHS.INVENTORY));
  }, [dispatch]);

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    console.log("submit create house");
  };

  return (
    <div className="house-detail-page">
      <Breadcrumbs
        title={BREADCRUMB_DETAIL["CREATE"]}
        backRoute={ROUTE_PATHS.INVENTORY}
        backName={BREADCRUMB_DETAIL[ROUTE_PATHS.INVENTORY]}
        displayName={BREADCRUMB_DETAIL["CREATE"]}
      />

      <div className="relative">
        <Form onSubmit={handleCreateSubmit}>
          <Row>
            <p className="font-bold">Hình ảnh nhà trọ:</p>
            <div className="mt-2 mb-4 flex">
              <CusFormUpload />
            </div>
          </Row>

          <Row>
            <Col>
              <CusFormGroup
                label="Tên nhà trọ"
                required
                placeholder="Nhập tên nhà trọ"
              />
              <CusFormSelect
                title="Loại hình"
                label="Loại hình"
                required
                // value={houseDetail?.type}
                data={HOUSE_TYPE}
              />
              <CusFormGroup
                label="Giá thuê"
                required
                placeholder="Nhập giá thuê"
              />
              <CusFormGroup
                label="Diện tích"
                required
                placeholder="Nhập diện tích"
              />
            </Col>
            <Col>
              <Row>
                <CusFormGroup
                  label="Địa chỉ "
                  required
                  placeholder="Nhập địa chỉ"
                />
              </Row>
              <CusSelectArea area={area} setArea={setArea} />
            </Col>
          </Row>

          <Row>
            <CusFormGroup label="Mô tả" textarea placeholder="Nhập mô tả" />
          </Row>

          <Row className="flex justify-center my-4">
            <CreateButton text="Lưu" icon={<></>} />
          </Row>
        </Form>
      </div>
    </div>
  );
};

export default HouseCreate;

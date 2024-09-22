import React, { useEffect, useState } from "react";
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
  // const [address, setAddress] = useState({});
  // const [addDetail, setAddDetail] = useState("");
  // const [name, setName] = useState("");
  // const [type, setType] = useState(0);
  // const [price, setPrice] = useState(0);
  // const [area, setArea] = useState(0);
  // const [des, setDes] = useState("");
  // const [albums, setAlbums] = useState([]);

  const [house, setHouse] = useState({
    name: "",
    type: 0,
    price: 0,
    area: 0,
    description: "",
    albums: [],
    address: "",
    provideID: 0,
    districtID: 0,
    wardID: 0,
  });

  useEffect(() => {
    dispatch(actions.setCurrentPage(ROUTE_PATHS.INVENTORY));
  }, [dispatch]);

  const handleCreateSubmit = (e) => {
    e.preventDefault();

    console.log(house);
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
              {house?.albums.map((image, index) => (
                <img
                  src={image.url}
                  alt={`Preview ${index + 1}`}
                  className="w-40 h-40 mr-4 object-cover rounded-lg"
                />
              ))}

              <CusFormUpload />
            </div>
          </Row>

          <Row>
            <Col>
              <CusFormGroup
                label="Tên nhà trọ"
                required
                placeholder="Nhập tên nhà trọ"
                state={house}
                setState={setHouse}
                keyName={"name"}
              />
              <CusFormSelect
                title="Loại hình"
                label="Loại hình"
                required
                data={HOUSE_TYPE}
                value={house}
                setValue={setHouse}
                keyName="type"
              />
              <CusFormGroup
                label="Giá thuê"
                required
                placeholder="Nhập giá thuê"
                state={house}
                setState={setHouse}
                keyName={"price"}
              />
              <CusFormGroup
                label="Diện tích"
                required
                placeholder="Nhập diện tích"
                state={house}
                setState={setHouse}
                keyName={"area"}
              />
            </Col>
            <Col>
              <Row>
                <CusFormGroup
                  label="Địa chỉ "
                  required
                  placeholder="Nhập địa chỉ"
                  state={house}
                  setState={setHouse}
                  keyName={"address"}
                />
              </Row>
              <CusSelectArea area={house} setArea={setHouse} />
            </Col>
          </Row>

          <Row>
            <CusFormGroup
              label="Mô tả"
              textarea
              placeholder="Nhập mô tả"
              state={house}
              setState={setHouse}
              keyName={"description"}
            />
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

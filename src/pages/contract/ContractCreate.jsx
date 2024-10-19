import { Breadcrumb, Form, Row, Col, Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

import { HOUSE_TYPE, ROUTE_PATHS } from "../../common";
import {
  CusFormDate,
  CusFormGroup,
  CusFormSearchRoom,
  CusFormSearchUser,
  CusFormSelect,
} from "../../components/ui";
import { apiCreateContract } from "../../store/services/contractServices";

const ContractCreate = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const [contract, setContract] = useState({
    renter: user,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      contract.price = contract.room.price;
      for (const [key, value] of Object.entries(contract)) {
        if (typeof value === "object" && value !== null) {
          formData.append(key, JSON.stringify(value));
        } else {
          formData.append(key, value);
        }
      }

      const res = await apiCreateContract(formData);
      if (res?.result?.code === 0) {
        navigate(ROUTE_PATHS.CONTRACT);
      }
    } catch (error) {
      console.error("Error creating contract:", error);
    }
  };

  return (
    <div>
      <Breadcrumb>
        <Breadcrumb.Item
          linkAs={Link}
          linkProps={{ to: ROUTE_PATHS.CONTRACT }}
          className="text-blue-700 font-semibold"
        >
          Hợp đồng
        </Breadcrumb.Item>
        <Breadcrumb.Item linkAs={Link}>Tạo mới hợp đồng</Breadcrumb.Item>
      </Breadcrumb>

      <Form className="mt-4" onSubmit={handleSubmit}>
        <p className="font-medium">Bên cho thuê:</p>
        <div className="p-2 bg-slate-100 rounded">
          <Row>
            <Col>
              <CusFormSearchUser
                label={"Số điện thoại"}
                state={contract}
                setState={setContract}
                placeholder={"Nhập số điện thoại"}
                keyName={"renter.phone"}
                required
                disabled
              />
            </Col>
            <Col>
              <CusFormGroup
                label={"Họ và tên"}
                state={contract}
                setState={setContract}
                placeholder={"Nhập họ và tên"}
                keyName={"renter.fullName"}
                required
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <CusFormGroup
                label={"Số CCCD"}
                state={contract}
                setState={setContract}
                placeholder={"Nhập số CCCD"}
                keyName={"renter.cccdNumber"}
                required
              />
            </Col>
            <Col>
              <CusFormDate
                label={"Ngày cấp"}
                state={contract}
                setState={setContract}
                placeholder={"Nhập ngày cấp"}
                keyName={"renter.cccdDate"}
                required
                position={"right"}
              />
            </Col>
            <Col>
              <CusFormGroup
                label={"Nơi cấp"}
                state={contract}
                setState={setContract}
                placeholder={"Nhập nơi cấp"}
                keyName={"renter.cccdAddress"}
                required
              />
            </Col>
          </Row>
        </div>

        <p className="font-medium mt-4">Bên thuê:</p>
        <div className="p-2 bg-slate-100 rounded">
          <Row>
            <Col>
              <CusFormSearchUser
                label={"Số điện thoại"}
                state={contract}
                setState={setContract}
                placeholder={"Nhập số điện thoại"}
                keyName={"lessor.phone"}
                required
              />
            </Col>
            <Col>
              <CusFormGroup
                label={"Họ và tên"}
                state={contract}
                setState={setContract}
                placeholder={"Nhập họ và tên"}
                keyName={"lessor.fullName"}
                required
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <CusFormGroup
                label={"Số CCCD"}
                state={contract}
                setState={setContract}
                placeholder={"Nhập số CCCD"}
                keyName={"lessor.cccdNumber"}
                required
              />
            </Col>
            <Col>
              <CusFormDate
                label={"Ngày cấp"}
                state={contract}
                setState={setContract}
                placeholder={"Nhập ngày cấp"}
                keyName={"lessor.cccdDate"}
                required
                position={"right"}
              />
            </Col>
            <Col>
              <CusFormGroup
                label={"Nơi cấp"}
                state={contract}
                setState={setContract}
                placeholder={"Nhập nơi cấp"}
                keyName={"lessor.cccdAddress"}
                required
              />
            </Col>
          </Row>
        </div>

        <p className="font-medium mt-4">Thông tin nhà:</p>
        <div className="p-2 bg-slate-100 rounded">
          <Row>
            <Col className="relative">
              <CusFormSearchRoom
                label={"Phòng"}
                state={contract}
                setState={setContract}
                placeholder={"Nhập phòng muốn thuê"}
                keyName={"room.name"}
                required
              />

              <div className="absolute left-40 top-12 z-10">
                <ul className="list-none p-0 m-0"></ul>
              </div>
            </Col>
            <Col>
              <CusFormSelect
                label={"Loại phòng"}
                defaultValue="Tất cả loại phòng"
                value={contract}
                setValue={setContract}
                keyName={"room.type"}
                data={HOUSE_TYPE}
              />
            </Col>
          </Row>
          <CusFormGroup
            label={"Địa chỉ"}
            state={contract}
            setState={setContract}
            placeholder={"Địa chỉ"}
            keyName={"room.address"}
            disabled
          />

          <Row>
            <Col>
              <CusFormGroup
                label={"Diện tích"}
                state={contract}
                setState={setContract}
                placeholder={"Diện tích"}
                keyName={"room.area"}
                disabled
                unit={"m²"}
              />
            </Col>
            <Col>
              <Row>
                <Col>
                  <CusFormGroup
                    label={"Điện"}
                    labelWidth="min-w-12"
                    state={contract}
                    setState={setContract}
                    placeholder={"Chỉ số điện"}
                    keyName={"room.eIndex"}
                    unit={"Số"}
                    required
                  />
                </Col>
                <Col>
                  <CusFormGroup
                    label={"Nước"}
                    labelWidth="min-w-12"
                    state={contract}
                    setState={setContract}
                    placeholder={"Chỉ số nước"}
                    keyName={"room.wIndex"}
                    unit={"Khối"}
                    required
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row>
            <Col></Col>
            <Col></Col>
          </Row>
        </div>

        <p className="font-medium mt-4">Thông tin thanh toán:</p>
        <div className="p-2 bg-slate-100 rounded">
          <Row>
            <Col>
              <CusFormGroup
                label={"Giá phòng"}
                state={contract}
                setState={setContract}
                placeholder={"Giá phòng"}
                keyName={"room.price"}
                disabled
                unit={"VNĐ"}
              />
            </Col>
            <Col></Col>
          </Row>
          <Row>
            <Col>
              <CusFormDate
                label={"Nhận phòng"}
                labelWidth={"min-w-36"}
                state={contract}
                setState={setContract}
                placeholder={"Ngày nhận phòng"}
                keyName={"checkIn"}
                required
                position={"right"}
              />
            </Col>
            <Col>
              <CusFormGroup
                label={"Thời gian thuê"}
                state={contract}
                setState={setContract}
                placeholder={"Thời gian thuê"}
                keyName={"duration"}
                required
                unit={"tháng"}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <CusFormGroup
                label={"Giảm giá"}
                state={contract}
                setState={setContract}
                placeholder={"Giảm giá"}
                keyName={"discount"}
                unit={"VNĐ"}
              />
            </Col>
            <Col>
              <CusFormGroup
                label={"Cọc"}
                labelWidth={"min-w-16"}
                state={contract}
                setState={setContract}
                placeholder={"Số tiền cọc"}
                keyName={"deposit"}
                required
                unit={"VNĐ"}
              />
            </Col>
            <Col>
              <CusFormDate
                label={"ngày"}
                labelWidth={"min-w-14"}
                state={contract}
                setState={setContract}
                placeholder={"hạn cọc"}
                keyName={"depositDate"}
                required
                position={"right"}
              />
            </Col>
          </Row>
          <CusFormGroup
            label={"Mục đích"}
            state={contract}
            setState={setContract}
            placeholder={"Nhập mục đích sử dụng"}
            keyName={"purpose"}
            required
            textarea
          />
        </div>

        <div className="flex justify-center mt-4">
          <Button
            type="submit"
            className="px-6 py-2 bg-primary2 rounded text-white"
          >
            Tạo hợp đồng
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default ContractCreate;

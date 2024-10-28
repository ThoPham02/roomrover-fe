import { Col, Form, Row } from "react-bootstrap";
import React from "react";
import { Button } from "react-bootstrap";

import { HOUSE_TYPE, SERVICE_UNIT } from "../../../common";
import {
  CusFormGroup,
  CusFormSearchUser,
  CusFormSelect,
  CusFormDate,
  CusFormSearchRoom,
} from "..";

const ContractDetailForm = ({
  contract,
  setContract,
  handleSubmit,
  option,
}) => {
  console.log("contract", contract?.room?.services[0].price);

  return (
    <Form className="mt-4" onSubmit={(e) => e.preventDefault()}>
      <p className="font-medium">Bên cho thuê:</p>
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
              disabled
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
              disabled={option === "get"}
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
              disabled={option === "get"}
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
              disabled={option === "get"}
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
              disabled={option === "get"}
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
              keyName={"renter.phone"}
              required
              disabled={option === "get"}
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
              disabled={option === "get"}
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
              disabled={option === "get"}
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
              disabled={option === "get"}
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
              disabled={option === "get"}
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
              disabled={option === "get"}
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
              disabled={option === "get"}
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
            {/* <Row>
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
                  disabled={option === "get"}
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
                  disabled={option === "get"}
                />
              </Col>
            </Row> */}
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
        {contract?.room?.services &&
          contract?.room?.services?.map((service, index) => {
            return (
              <Row key={index}>
                <Col>
                  <CusFormGroup
                    label={service.name}
                    state={contract}
                    setState={setContract}
                    placeholder={service.name}
                    keyName={`room.services[0].price`}
                    disabled
                    unit={`VNĐ/${SERVICE_UNIT[service.unit].name}`}
                  />
                </Col>
                <Col></Col>
              </Row>
            );
          })}
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
              disabled={option === "get"}
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
              disabled={option === "get"}
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
              disabled={option === "get"}
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
              disabled={option === "get"}
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
              disabled={option === "get"}
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
          disabled={option === "get"}
        />
      </div>

      {option !== "get" && (
        <div className="flex justify-center mt-4">
          <Button
            onClick={handleSubmit}
            className="px-6 py-2 bg-blue-500 rounded text-white"
          >
            Tạo hợp đồng
          </Button>
        </div>
      )}
    </Form>
  );
};

export default ContractDetailForm;

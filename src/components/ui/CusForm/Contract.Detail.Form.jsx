import { Col, Form, Row } from "react-bootstrap";
import React, { useState } from "react";

import { HOUSE_TYPE, SERVICE_UNIT } from "../../../common";
import {
  CusFormGroup,
  CusFormSearchUser,
  CusFormSelect,
  CusFormDate,
  CusFormSearchRoom,
  CusFormObject,
  ConfirmActionModal,
  CreateButton,
} from "..";
import { formatCurrencyVND } from "../../../utils/utils";

const ContractDetailForm = ({
  contract,
  setContract,
  handleSubmit,
  option,
}) => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [validated, setValidated] = useState(false);

  const validateForm = (e) => {
    e.preventDefault();

    const form = e.currentTarget;
    setValidated(!form.checkValidity());
    if (form.checkValidity() === false) {
      e.stopPropagation();
      return;
    }

    setShowUpdateModal(true);
  };

  return (
    <Form
      className="mt-2"
      onSubmit={validateForm}
      noValidate
      validated={validated}
    >
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

        <Row>
          <Col>
            <CusFormGroup
              label={"Địa chỉ"}
              state={contract}
              setState={setContract}
              placeholder={"Địa chỉ"}
              keyName={"room.address"}
              disabled
            />
          </Col>
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
        </Row>
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
        {contract?.payment?.paymentDetails &&
          contract?.payment?.paymentDetails?.map((service, index) => {
            return (
              <Row key={index}>
                <Col>
                  <CusFormObject
                    label={service.name}
                    placeholder={service.name}
                    disabled
                    unit={`VNĐ/${SERVICE_UNIT[service?.type]?.name}`}
                    handleValue={(e) => {}}
                    parseValue={formatCurrencyVND(
                      contract?.payment?.paymentDetails[index]?.price
                    )}
                  />
                </Col>
                <Col></Col>
              </Row>
            );
          })}

        {contract?.confirmedImgs?.length > 0 && option === "get" && (
          <div>
            <p className="font-bold">Hình ảnh người thuê xác nhận:</p>
            <div className="flex mt-2">
              {contract?.confirmedImgs?.map((image, index) => (
                <img
                  src={image}
                  alt={"Hình ảnh thực tế"}
                  className="w-40 h-40 mr-4 mb-4 object-cover rounded-lg"
                  key={index}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      <p className="font-medium mt-4">Thông tin thanh toán:</p>
      <div className="p-2 bg-slate-100 rounded">
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
              keyName={"payment.deposit"}
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
              keyName={"payment.depositDate"}
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
        <Row className="flex justify-center items-center my-4">
          <CreateButton
            className={"w-36"}
            text="Lưu"
            icon={<></>}
            type="submit"
          />
        </Row>
      )}

      {showUpdateModal && (
        <ConfirmActionModal
          show={showUpdateModal}
          handleClose={() => setShowUpdateModal(false)}
          handleConfirm={(e) => {
            setShowUpdateModal(false);
            handleSubmit(e);
          }}
        />
      )}
    </Form>
  );
};

export default ContractDetailForm;

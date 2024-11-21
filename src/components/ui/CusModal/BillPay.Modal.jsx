import React, { useState } from "react";
import { Button, Modal, Row, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";

import * as actions from "../../../store/actions";
import { CusFormDate, CusFormGroup, CusFormSelect } from "../CusForm";
import { BILL_PAYMENT_METHOD } from "../../../common";
import CusFormProof from "../CusForm/CusUploadProof";
import { apiCreateBillPay } from "../../../store/services/contractServices";

const BillPayModal = ({ show, handleClose, id }) => {
  const dispatch = useDispatch();
  const [pay, setPay] = useState({ billID: id, payType: 1, url: "" });

  const handleConfirm = async () => {
    try {
      const res = await apiCreateBillPay(pay);

      if (res?.result.code === 0) {
        dispatch(actions.getPaymentDetail(id));
        handleClose();
      }
    } catch (err) {
      console.error("Error confirming bill pay:", err);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static">
      <Modal.Body>
        <Row>
          <p className="font-bold min-w-36 mr-2 mt-2">Thêm mới chứng từ</p>
          <div className="p-2 bg-slate-100 rounded relative">
            <Form onSubmit={(e) => e.preventDefault()}>
              <CusFormDate
                state={pay}
                setState={setPay}
                keyName={"payDate"}
                label={"Ngày thanh toán"}
                position={"right"}
                labelWidth={"w-36"}
                placeholder={"Chọn ngày thanh toán"}
              />
              <CusFormGroup
                state={pay}
                setState={setPay}
                keyName={"amount"}
                label={"Số tiền"}
                unit={"VNĐ"}
                placeholder="Nhập số tiền"
              />
              <CusFormSelect
                value={pay}
                setValue={setPay}
                keyName={"payType"}
                label={"Phương thức"}
                data={BILL_PAYMENT_METHOD}
                noDefault={true}
                width={"w-full"}
              />
              <CusFormProof
                state={pay.url}
                onChange={(url) => {
                  setPay((prev) => ({ ...prev, url: url }));
                }}
                label={"Chứng từ"}
              />
            </Form>
          </div>
        </Row>
        <div className="flex justify-center space-x-4 mt-4">
          <Button
            variant="secondary"
            onClick={handleClose}
            className="px-4 py-2"
          >
            Hủy
          </Button>
          <Button
            variant="primary"
            onClick={handleConfirm}
            className="px-4 py-2"
          >
            Xác nhận
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default BillPayModal;

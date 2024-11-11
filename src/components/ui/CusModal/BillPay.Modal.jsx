import React, { useEffect, useState } from "react";
import { Button, Modal, Row, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";

import * as actions from "../../../../src/store/actions";
import {
  apiConfirmContract,
  apiGetContractDetail,
} from "../../../store/services/contractServices";
import { CusFormDate } from "../CusForm";

const BillPayModal = ({ show, handleClose, id }) => {
  const [pay, setPay] = useState({});

  const handleConfirm = async () => {};

  return (
    <Modal show={show} onHide={handleClose} backdrop="static">
      <Modal.Body>
        <Row>
          <p className="font-bold min-w-36 mr-2 mt-2">Thêm mới chứng từ</p>
          <div className="p-2 bg-slate-100 rounded relative">
            <Form onSubmit={(e) => e.preventDefault()}>
              <CusFormDate />
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

import React, { useEffect, useState } from "react";
import { Button, Modal, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";

import * as actions from "../../../store/actions";
import { CusServiceQuantity } from "..";
import {
  apiGetListBillDetail,
  apiUpdateListBillDetail,
} from "../../../store/services/contractServices";

const BillQuantityModal = ({ show, handleClose, id }) => {
  const dispatch = useDispatch();
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await apiGetListBillDetail(id);

        if (res?.result.code === 0) {
          setServices(res.billDetails);
        }
      } catch (error) {
        console.error("Error fetching bill details:", error);
      }
    };

    fetchData();
    // get list of services
  }, [id]);

  const handleConfirm = async () => {
    try {
      const res = await apiUpdateListBillDetail(id, JSON.stringify(services));

      if (res?.result.code === 0) {
        dispatch(actions.getPaymentDetail(id));
        handleClose();
      }
    } catch (error) {
      console.error("Error confirm bill:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="xl" backdrop="static">
      <Modal.Header className="text-xl text-white capitalize w-full bg-primary rounded-t-lg p-4">
        <Modal.Title className="text-xl text-white capitalize">
          Xác nhận số lượng sử dụng
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <p className="font-bold min-w-36 mr-2 mt-2">
            Danh sách chi phí phát sinh:
          </p>

          <CusServiceQuantity state={services} setState={setServices} />
        </Row>
        <div className="flex justify-center space-x-4">
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

export default BillQuantityModal;

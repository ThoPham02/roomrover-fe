import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";

import { convertDateToTimestamp } from "../../../utils/utils";
import { apiCreateContact } from "../../../store/services/inventServices";

const AppointmentModal = ({ show, handleClose, house }) => {
  const [contact, setContact] = useState({
    houseID: house?.houseID,
    lessorID: house?.user?.userID,
    datetime: 0,
  });

  const handleConfirm = async () => {
    console.log(contact);

    try {
      const res = await apiCreateContact(contact);
      if (res?.result?.code === 0) {
        handleClose();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header className="bg-primary flex justify-center">
        <Modal.Title className="inline text-white font-bold capitalize">
          Đặt lịch hẹn
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="">
        <div className="text-center mb-4">
          Bạn đặt lịch hẹn với{" "}
          <span className="text-red-500">{house?.user?.fullName}</span> để xem
          trực tiếp nhà <span className="text-red-500">{house?.name}</span> vào
          ngày{" "}
          <DatePicker
            className="form-control"
            placeholderText={"Chọn ngày"}
            selected={contact.datetime ? new Date(contact.datetime) : null}
            onChange={(date) =>
              setContact({ ...contact, datetime: convertDateToTimestamp(date) })
            }
            dateFormat="dd/MM/yyyy"
          />
        </div>

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

export default AppointmentModal;

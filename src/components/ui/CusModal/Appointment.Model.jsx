import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { convertDateToTimestamp } from "../../../utils/utils";

const AppointmentModal = ({ show, handleClose, house }) => {
  const [contact, setContact] = useState({
    houseId: house?.houseID,
    userId: house?.user?.userId,
    datetime: 0,
  });

  const handleConfirm = () => {

    console.log("Contact:", house);
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

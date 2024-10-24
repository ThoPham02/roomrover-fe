import React from "react";
import { Modal, Button } from "react-bootstrap";

const ConfirmActionModal = ({ label, show, handleClose, handleConfirm }) => {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Body className="p-12 text-center">
        <h5 className="mb-8 ">
          {label ? label : "Bạn có chắc chắn muốn thực hiện hành động này?"}
        </h5>
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

export default ConfirmActionModal;

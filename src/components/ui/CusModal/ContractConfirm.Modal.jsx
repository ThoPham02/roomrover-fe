import React from "react";
import { Modal } from "react-bootstrap";

const ContractConfirmModal = ({ show, handleClose, contract }) => {
  return (
    <Modal show={show} onHide={handleClose} size="xl">
      <Modal.Header className="text-xl text-white capitalize w-full bg-primary rounded-t-lg p-4">
        <Modal.Title className="text-xl text-white capitalize">
          Xác nhận
        </Modal.Title>
      </Modal.Header>
      <Modal.Body></Modal.Body>
    </Modal>
  );
};

export default ContractConfirmModal;

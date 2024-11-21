import React from "react";
import { Modal } from "react-bootstrap";
import ContractFile from "../ContractFile";

const ContractFileModal = ({ show, handleClose, contract }) => {
  return (
    <Modal show={show} onHide={handleClose} size="xl">
      <Modal.Header className="text-xl text-white capitalize w-full bg-primary rounded-t-lg p-4">
        <Modal.Title className="text-xl text-white capitalize">
          Xem hợp đồng thuê
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ContractFile item={contract} />
      </Modal.Body>
    </Modal>
  );
};

export default ContractFileModal;

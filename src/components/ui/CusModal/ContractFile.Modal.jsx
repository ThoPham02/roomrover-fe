import React from "react";
import { Modal } from "react-bootstrap";
import ContractFile from "../ContractFile";

const ContractFileModal = ({ show, handleClose, contract }) => {
  return (
    <Modal show={show} onHide={handleClose} size="xl">
      <Modal.Header>
        <Modal.Title> {"Hợp đồng thuê nhà"}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ContractFile item={contract} />
      </Modal.Body>
    </Modal>
  );
};

export default ContractFileModal;

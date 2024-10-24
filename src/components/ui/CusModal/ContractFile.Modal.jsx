import React from "react";
import { Modal, Button } from "react-bootstrap";
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
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Đóng
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ContractFileModal;

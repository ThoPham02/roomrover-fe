import { Modal, Button, Form } from "react-bootstrap";

import { HOUSE_SERVICE_TYPE } from "../../../common";
import { CusFormGroup, CusFormSelect } from "../../ui";

const ServiceModal = ({
  service,
  setService,
  showModal,
  setShowModal,
  handleSubmit,
  option,
}) => {
  var title = "Thêm Mới Chi Phí";
  if (option === "edit") {
    title = "Chỉnh Sửa Chi Phí";
  }

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Modal show={showModal} onHide={handleCloseModal}>
      <Modal.Header closeButton>
        <Modal.Title> {title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <CusFormGroup
            label="Chi phí"
            state={service}
            setState={setService}
            keyName="name"
          />
          <CusFormSelect
            title="Loại chi phí"
            label="Loại chi phí"
            data={HOUSE_SERVICE_TYPE}
            value={service}
            setValue={setService}
            keyName="type"
          />
          <CusFormGroup
            label="Giá"
            state={service}
            setState={setService}
            keyName="price"
          />
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Đóng
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Lưu
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ServiceModal;

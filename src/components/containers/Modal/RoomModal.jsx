import { Modal, Button, Form } from "react-bootstrap";

import { CusFormGroup } from "../../ui";

const RoomModal = ({
  room,
  setRoom,
  showModal,
  setShowModal,
  handleSubmit,
  option,
}) => {
  var title = "Thêm Mới Phòng";
  if (option === "edit") {
    title = "Chỉnh Sửa Phòng";
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
            label="Tên phòng"
            state={room}
            setState={setRoom}
            keyName="name"
          />
          <CusFormGroup
            label="Số người/phòng"
            state={room}
            setState={setRoom}
            keyName="capacity"
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

export default RoomModal;

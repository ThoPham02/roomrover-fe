import { Modal, Spinner } from "react-bootstrap";
import { useState } from "react";

const ImageModal = ({ show, handleClose, image }) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <Modal show={show} onHide={handleClose} size="xl">
      <Modal.Body className="flex justify-center items-center h-100">
        {!isImageLoaded && (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        )}
        <img
          src={image}
          alt="chung tu"
          className={`w-full ${isImageLoaded ? "" : "hidden"}`}
          onLoad={handleImageLoad}
        />
      </Modal.Body>
    </Modal>
  );
};

export default ImageModal;

import React, { useEffect, useState } from "react";
import { Button, Modal, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";

import { CusFormUpload, CusRenterList, CusServiceConfirm } from "../CusForm";
import * as actions from "../../../../src/store/actions";
import { uploadImage } from "../../../store/services/inventServices";
import { apiConfirmContract } from "../../../store/services/contractServices";

const ContractConfirmModal = ({ show, handleClose, id }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getContractDetail(id));
  }, [dispatch, id]);

  const { contractDetail } = useSelector((state) => state.contract);

  const [renters, setRenters] = useState([]);
  const [services, setServices] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    if (contractDetail) {
      setRenters([
        {
          id: contractDetail?.renter?.userID,
          name: contractDetail?.renter?.fullName,
          phone: contractDetail?.renter?.phone,
          cccdNumber: contractDetail?.renter?.cccdNumber,
          cccdDate: contractDetail?.renter?.cccdDate,
          cccdAddress: contractDetail?.renter?.cccdAddress,
        },
      ]);
      setServices(contractDetail?.payment?.paymentDetails || []);
    }
  }, [contractDetail]);

  const handleImageUpload = async (e) => {
    const files = Array.from(e.target.files);

    setIsUploading(true);
    const newAlbums = await Promise.all(
      files.map(async (file) => {
        try {
          const url = await uploadImage(file);
          return {
            url,
            file,
          };
        } catch (error) {
          console.error("Error uploading image:", error);
          return null;
        }
      })
    );

    const validAlbums = newAlbums
      .filter((album) => album !== null)
      .map((album) => album.url);

    setAlbums(validAlbums);
    setIsUploading(false);
  };

  const handleConfirm = async () => {
    const contract = {
      contractID: id,
      renters: JSON.stringify(renters),
      services: JSON.stringify(services),
      albums: JSON.stringify(albums),
    };

    try {
      const res = await apiConfirmContract(contract);

      if (res?.result.code === 0) {
        dispatch(actions.getContractDetail(id));

        dispatch(actions.getListContract({ limit: 10, offset: 0 }));
        handleClose();
      }
    } catch (error) {
      console.error("Error confirming contract:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="xl">
      <Modal.Header className="text-xl text-white capitalize w-full bg-primary rounded-t-lg p-4">
        <Modal.Title className="text-xl text-white capitalize">
          Xác nhận
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <p className="font-bold min-w-36 mr-2 mt-2">
            Danh sách người sử dụng:
          </p>
          <CusRenterList state={renters} setState={setRenters} />
        </Row>
        {services && (
          <Row>
            <p className="font-bold min-w-36 mr-2 mt-2">Danh sách dịch vụ:</p>
            <CusServiceConfirm state={services} setState={setServices} />
          </Row>
        )}
        <Row>
          <p className="font-bold min-w-36 mr-2 mt-2">Hình ảnh thực tế:</p>
          <div className="mt-2 mb-4 flex flex-wrap">
            {albums?.map((image, index) => (
              <img
                src={image}
                alt={"Hình ảnh thực tế"}
                className="w-40 h-40 mr-4 mb-4 object-cover rounded-lg"
                key={image}
              />
            ))}
            <CusFormUpload
              handleUpload={handleImageUpload}
              isUploading={isUploading}
            />
          </div>
        </Row>

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

export default ContractConfirmModal;

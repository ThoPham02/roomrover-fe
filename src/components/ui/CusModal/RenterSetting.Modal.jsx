import React, { useEffect, useState } from "react";
import { Button, Modal, Row } from "react-bootstrap";
import { useDispatch } from "react-redux";

import { CusRenterList } from "../CusForm";
import * as actions from "../../../../src/store/actions";
import {
  apiConfirmContract,
  apiGetContractDetail,
} from "../../../store/services/contractServices";

const RenterSettingModal = ({ show, handleClose, id }) => {
  const dispatch = useDispatch();
  const [renters, setRenters] = useState([]);
  const [contractDetail, setContractDetail] = useState(null);

  useEffect(() => {
    const fetchContractDetail = async () => {
      const data = await apiGetContractDetail(id);
      if (data?.result.code === 0) {
        setContractDetail(data.contract);
      }
    };

    fetchContractDetail();
  }, [id]);

  useEffect(() => {
    if (contractDetail) {
      if (renters.length === 0) {
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
      } else {
        setRenters(contractDetail?.payment?.paymentRenters || []);
      }
    }
    // eslint-disable-next-line
  }, [contractDetail]);

  const handleConfirm = async () => {
    const contract = {
      contractID: id,
      renters: JSON.stringify(renters),
    };

    try {
      const res = await apiConfirmContract(contract);

      if (res?.result.code === 0) {
        dispatch(actions.getListContract({ limit: 10, offset: 0 }));
        handleClose();
      }
    } catch (error) {
      console.error("Error confirming contract:", error);
    }
  };

  return (
    <Modal show={show} onHide={handleClose} size="xl" backdrop="static">
      <Modal.Header className="text-xl text-white capitalize w-full bg-primary rounded-t-lg p-4">
        <Modal.Title className="text-xl text-white capitalize">
          Thiết lập danh sách người sử dụng
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <p className="font-bold min-w-36 mr-2 mt-2">
            Danh sách người sử dụng:{" "}
            {contractDetail?.room?.capacity === 0
              ? "(Không giới hạn số người)"
              : `(Tối đa ${contractDetail?.room?.capacity} người)`}
          </p>
          <CusRenterList
            state={renters}
            setState={setRenters}
            capacity={contractDetail?.room?.capacity}
          />
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

export default RenterSettingModal;
